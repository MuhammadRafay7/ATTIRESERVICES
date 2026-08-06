import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { adminClient } from "@/lib/supabase";
import { resolveMedia } from "@/lib/cms";
import { adminPageBySlug, slugFromKey } from "../../page-map";
import { schemas } from "../../schema";
import { listMedia } from "../../actions";
import { AdminPage } from "../../ui";
import { PageWorkspace } from "./PageWorkspace";

export const dynamic = "force-dynamic";

/**
 * Everything on one public page, in one place.
 *
 * Page settings, the section stack, and every block of content the page
 * renders — so changing the company page never means visiting six screens and
 * knowing which collection each table came from.
 */
export default async function PageTab({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  const slug = slugFromKey(key);
  const def = adminPageBySlug[slug];
  if (!def) notFound();

  const supabase = adminClient();
  if (!supabase) notFound();

  const collections = [...new Set(def.blocks.map((b) => b.collection))];

  const [{ data: page }, { data: sections }, { data: items }, library] =
    await Promise.all([
      supabase.from("pages").select("*").eq("slug", slug).maybeSingle(),
      supabase
        .from("sections")
        .select("*")
        .eq("page_slug", slug)
        .order("position", { ascending: true }),
      supabase
        .from("content_items")
        .select("id, collection, position, published, data")
        .in("collection", [...collections, "page_copy"])
        .order("position", { ascending: true }),
      listMedia(),
    ]);

  // Thumbnails resolve server-side so bundled paths still preview correctly.
  const rows = await Promise.all(
    (items ?? []).map(async (r) => {
      const data = r.data as Record<string, unknown>;
      return {
        id: r.id as string,
        collection: r.collection as string,
        published: r.published as boolean,
        data,
        thumb: typeof data.image === "string" ? await resolveMedia(data.image) : "",
      };
    }),
  );

  // Copy is scoped to this page by the `page.section` key convention.
  const copyRows = rows.filter(
    (r) =>
      r.collection === "page_copy" &&
      typeof r.data.key === "string" &&
      r.data.key.startsWith(`${key}.`),
  );

  return (
    <AdminPage
      title={def.label}
      description={def.summary}
      actions={
        <a
          href={slug}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center gap-2 rounded-md border border-line-strong bg-surface-raised px-4 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
        >
          View page
          <ExternalLink size={14} aria-hidden />
        </a>
      }
    >
      <PageWorkspace
        def={def}
        page={page}
        sections={sections ?? []}
        rows={rows.filter((r) => r.collection !== "page_copy")}
        copyRows={copyRows}
        copySchema={schemas.page_copy}
        schemas={Object.fromEntries(
          collections.map((c) => [c, schemas[c]]).filter(([, s]) => s),
        )}
        library={library.map((m) => ({ name: m.name, url: m.url }))}
      />
    </AdminPage>
  );
}
