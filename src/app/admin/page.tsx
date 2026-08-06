import Link from "next/link";
import { EyeOff, FileStack, Layers, LibraryBig } from "lucide-react";
import { adminClient } from "@/lib/supabase";
import { adminNav } from "./nav";
import { AdminCard, AdminPage } from "./ui";

export const dynamic = "force-dynamic";

/**
 * Landing screen. Answers the two questions someone opening the panel actually
 * has: what can I change, and is anything currently hidden from the site.
 */
export default async function AdminHome() {
  const supabase = adminClient();

  const [items, sections, pages] = await Promise.all([
    supabase?.from("content_items").select("published"),
    supabase?.from("sections").select("published"),
    supabase?.from("pages").select("published"),
  ]);

  const hidden =
    (items?.data?.filter((i) => !i.published).length ?? 0) +
    (sections?.data?.filter((s) => !s.published).length ?? 0) +
    (pages?.data?.filter((p) => !p.published).length ?? 0);

  const counts = [
    { label: "Pages", value: pages?.data?.length ?? 0, icon: FileStack },
    { label: "Sections", value: sections?.data?.length ?? 0, icon: Layers },
    { label: "Content items", value: items?.data?.length ?? 0, icon: LibraryBig },
    { label: "Hidden", value: hidden, icon: EyeOff },
  ];

  return (
    <AdminPage
      title="Site management"
      description="Pick the page you want to change — everything on it is in one place. Site-wide settings and shared content are below."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {counts.map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-line bg-surface-raised px-5 py-4 shadow-sm"
          >
            <c.icon size={16} aria-hidden className="text-accent" />
            <p className="mt-3 font-display text-2xl font-semibold text-fg">
              {c.value}
            </p>
            <p className="mt-0.5 text-xs text-fg-subtle">{c.label}</p>
          </div>
        ))}
      </div>

      {hidden > 0 && (
        <p className="rounded-lg border border-line bg-brass-wash px-4 py-3 text-sm text-fg">
          {hidden} item{hidden === 1 ? " is" : "s are"} hidden and will not
          appear on the public site.
        </p>
      )}

      {adminNav.map((group) => (
        <AdminCard key={group.title} title={group.title}>
          <ul className="grid gap-3 sm:grid-cols-2">
            {group.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex h-full items-start gap-3 rounded-lg border border-line bg-canvas p-4 transition-colors hover:border-accent"
                >
                  {link.icon ? (
                    <link.icon size={16} aria-hidden className="mt-0.5 shrink-0 text-accent" />
                  ) : null}
                  <span>
                    <span className="block text-sm font-medium text-fg">
                      {link.label}
                    </span>
                    {link.hint && (
                      <span className="mt-0.5 block text-xs leading-relaxed text-fg-muted">
                        {link.hint}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </AdminCard>
      ))}
    </AdminPage>
  );
}
