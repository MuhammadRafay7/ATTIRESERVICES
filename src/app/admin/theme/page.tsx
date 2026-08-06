import { getTheme } from "@/lib/cms";
import { AdminPage } from "../ui";
import { ThemeForm } from "./ThemeForm";

export const dynamic = "force-dynamic";

/**
 * Theme editor.
 *
 * These are the CSS custom properties globals.css declares, and Tailwind reads
 * them through `@theme inline` — so changing one here re-themes every utility
 * on the site, and the admin with it. Grouped by where the colour is actually
 * seen, since "--on-deep-muted" means nothing to someone who just wants the
 * footer text lighter.
 */
export const groups: { title: string; hint: string; tokens: string[] }[] = [
  {
    title: "Brand colours",
    hint: "Marine blue drives every button and link. Brass is used for figures, ticks and map lanes.",
    tokens: ["accent", "accent-strong", "accent-soft", "accent-wash", "brass", "brass-soft", "brass-wash"],
  },
  {
    title: "Dark sections",
    hint: "The hero, the footprint band, the footer and the closing call to action.",
    tokens: ["deep", "deep-2", "deep-3", "on-deep", "on-deep-muted"],
  },
  {
    title: "Page backgrounds",
    hint: "Alternating section backgrounds on the light part of the site.",
    tokens: ["bg", "bg-subtle", "bg-muted", "bg-inset"],
  },
  {
    title: "Text",
    hint: "Headings use the darkest; body, muted and faint step down from there.",
    tokens: ["ink", "ink-body", "ink-muted", "ink-faint"],
  },
  {
    title: "Lines and status",
    hint: "Card borders, rules, and the success/error colours in forms.",
    tokens: ["line", "line-strong", "positive", "danger"],
  },
  {
    title: "Shape",
    hint: "Corner rounding and maximum content width. Use CSS units, e.g. 8px or 1240px.",
    tokens: ["radius", "radius-sm", "container"],
  },
];

export default async function ThemePage() {
  const tokens = await getTheme();

  return (
    <AdminPage
      title="Theme & colours"
      description="Every colour on the public site. Changes apply everywhere at once — buttons, cards, borders, the globe and this admin all read from these values."
    >
      <ThemeForm groups={groups} tokens={tokens} />
    </AdminPage>
  );
}
