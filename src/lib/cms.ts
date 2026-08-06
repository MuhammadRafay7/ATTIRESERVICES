import { cache } from "react";
import { publicClient } from "@/lib/supabase";
import {
  site as staticSite,
  nav as staticNav,
  stats as staticStats,
  credentials as staticCredentials,
  commercialTerms as staticTerms,
  offices as staticOffices,
  marketRegions as staticRegions,
  tradeLanes as staticLanes,
  geo as staticGeo,
} from "@/lib/site";
import {
  heroFacts as staticHeroFacts,
  pillars as staticPillars,
  divisions as staticDivisions,
  services as staticServices,
  productCategories as staticCategories,
  manufacturingProcess as staticProcess,
  whyAttireServices as staticWhy,
  companyValues as staticValues,
  qualityControls as staticQuality,
  faqs as staticFaqs,
} from "@/lib/content";

/**
 * The site's read path.
 *
 * Every getter returns database content when it is available and the content
 * committed in `src/lib` when it is not. That fallback is deliberate: a
 * marketing site going blank because a database is unreachable is a far worse
 * failure than serving slightly stale copy, and it also means the project runs
 * with no Supabase credentials at all.
 *
 * `cache()` dedupes within a single render, so a page that reads settings in
 * three places still issues one query.
 */

export type Json = Record<string, unknown>;

/** A footer policy page, rendered at /legal/<slug>. */
export type LegalDocument = {
  slug: string;
  title: string;
  summary?: string;
  body: string;
};

export type PageRecord = {
  slug: string;
  title: string;
  description: string | null;
  nav_label: string | null;
  nav_order: number;
  in_nav: boolean;
  hero: Json;
};

export type SectionRecord = {
  id: string;
  page_slug: string;
  type: string;
  position: number;
  data: Json;
};

/** Everything the seed writes into `settings.data`. */
type Settings = typeof staticSite & { nav: readonly { label: string; href: string }[] };

const fallbackSettings = { ...staticSite, nav: staticNav } as unknown as Settings;

export const getSettings = cache(async (): Promise<Settings> => {
  const supabase = publicClient();
  if (!supabase) return fallbackSettings;

  const { data, error } = await supabase
    .from("settings")
    .select("data")
    .eq("id", true)
    .maybeSingle();

  if (error || !data?.data) return fallbackSettings;
  // Merge over the defaults so a partially-filled row can never blank a field.
  return { ...fallbackSettings, ...(data.data as Partial<Settings>) };
});

/**
 * Maps a bundled `/photos/…` path to wherever that image now lives.
 *
 * The photographs were moved into Supabase Storage so the repository need not
 * carry them; the manifest records where each went. Anything already absolute,
 * and anything with no manifest entry, is returned unchanged — so this is safe
 * before, during and after the migration.
 */
export async function resolveMedia(src: string): Promise<string> {
  if (!src || /^https?:\/\//.test(src)) return src;

  const settings = await getSettings();
  const map = (settings as { mediaMap?: Record<string, string> }).mediaMap;
  return map?.[src] ?? src;
}

export const getNav = cache(async () => {
  const settings = await getSettings();
  return settings.nav?.length ? settings.nav : staticNav;
});

export const getTheme = cache(async (): Promise<Record<string, string>> => {
  const supabase = publicClient();
  if (!supabase) return {};

  const { data, error } = await supabase
    .from("theme")
    .select("tokens")
    .eq("id", true)
    .maybeSingle();

  if (error || !data?.tokens) return {};
  return data.tokens as Record<string, string>;
});

/** Static defaults, keyed by the same collection names the seed writes. */
const fallbackCollections: Record<string, readonly unknown[]> = {
  nav: staticNav,
  hero_facts: staticHeroFacts,
  stats: staticStats,
  credentials: staticCredentials,
  commercial_terms: staticTerms,
  market_regions: staticRegions,
  trade_lanes: staticLanes,
  quality_controls: staticQuality.map((text) => ({ text })),
  faqs: staticFaqs,
  offices: staticOffices.map((o) => ({ ...o, ...(staticGeo[o.city] ?? {}) })),
  pillars: staticPillars,
  divisions: staticDivisions,
  services: staticServices,
  product_categories: staticCategories,
  process_steps: staticProcess,
  why_points: staticWhy,
  company_values: staticValues,
};

/**
 * One published collection, ordered. `T` is the caller's expected item shape —
 * rows are jsonb, so this is an assertion the renderer is responsible for
 * tolerating (every consumer uses optional access and falls back on missing
 * fields).
 */
export const getCollection = cache(
  async <T = Json>(collection: string): Promise<T[]> => {
    const supabase = publicClient();
    const fallback = (fallbackCollections[collection] ?? []) as T[];
    if (!supabase) return fallback;

    const { data, error } = await supabase
      .from("content_items")
      .select("data")
      .eq("collection", collection)
      .eq("published", true)
      .order("position", { ascending: true });

    if (error || !data?.length) return fallback;
    return data.map((row) => row.data as T);
  },
);

export type SectionCopy = {
  key: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
};

/**
 * Section headings, keyed `page.section`.
 *
 * Returns a lookup rather than a list so a page resolves all of its copy in
 * one query. Missing keys yield empty strings, which render as nothing — a
 * heading someone deleted disappears rather than crashing the page.
 */
export const getCopy = cache(async (page: string) => {
  const all = await getCollection<SectionCopy>("page_copy");
  const scoped = all.filter((c) => c.key?.startsWith(`${page}.`));
  const map = new Map(scoped.map((c) => [c.key, c]));

  return (section: string): SectionCopy => {
    return (
      map.get(`${page}.${section}`) ?? { key: `${page}.${section}` }
    );
  };
});

export const getPage = cache(async (slug: string): Promise<PageRecord | null> => {
  const supabase = publicClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("pages")
    .select("slug, title, description, nav_label, nav_order, in_nav, hero")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error || !data) return null;
  return data as PageRecord;
});

/**
 * A page's published sections in order. An empty result means "render the
 * page's built-in section order" rather than "render nothing" — otherwise an
 * unreachable database would serve blank pages.
 */
export const getSections = cache(async (slug: string): Promise<SectionRecord[]> => {
  const supabase = publicClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("sections")
    .select("id, page_slug, type, position, data")
    .eq("page_slug", slug)
    .eq("published", true)
    .order("position", { ascending: true });

  if (error || !data) return [];
  return data as SectionRecord[];
});

/**
 * Section types a page should render, in admin-defined order. Falls back to
 * the page's own default list when the database has nothing to say.
 */
export async function getSectionOrder(
  slug: string,
  defaults: string[],
): Promise<string[]> {
  const sections = await getSections(slug);
  return sections.length ? sections.map((s) => s.type) : defaults;
}
