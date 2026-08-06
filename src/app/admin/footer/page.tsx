import Link from "next/link";
import { ExternalLink, Layers, ScrollText } from "lucide-react";
import { getCollection, getSettings, type LegalDocument } from "@/lib/cms";
import { SettingsForm } from "../SettingsForm";
import { AdminCard, AdminPage, AdminTextarea } from "../ui";

export const dynamic = "force-dynamic";

/**
 * Footer tab.
 *
 * The footer draws on collections that also feed other pages, so rather than
 * duplicate those editors this page edits what is footer-specific and links
 * straight to the rest — someone asked to "change something in the footer"
 * never has to work out which collection it lives in.
 */
export default async function FooterPage() {
  const s = await getSettings();
  const legal = await getCollection<LegalDocument>("legal_documents");
  const credentials = await getCollection<{ code: string }>("credentials");
  const offices = await getCollection<{ city: string }>("offices");

  const elsewhere = [
    { href: "/admin/content/services", label: "Trade services column", detail: "The first six capability lines are listed." },
    { href: "/admin/navigation", label: "Company column", detail: "Mirrors the header menu." },
    { href: "/admin/content/credentials", label: "Certification row", detail: `${credentials.length} codes, starting ${credentials.slice(0, 3).map((c) => c.code).join(", ")}` },
    { href: "/admin/content/offices", label: "Sites line", detail: offices.map((o) => o.city).join(" · ") },
    { href: "/admin/contact", label: "Contact block & identifiers", detail: "Email, address, entity, registration, D-U-N-S." },
  ];

  return (
    <AdminPage
      title="Footer"
      description="Everything in the dark band at the bottom of every page."
    >
      <SettingsForm>
        <AdminCard title="Footer blurb" icon={<Layers size={17} />}>
          <AdminTextarea
            label="Description under the logo"
            name="footerBlurb"
            rows={4}
            defaultValue={
              (s as { footerBlurb?: string }).footerBlurb ??
              "Apparel and textile import, export and sourcing. A qualified mill network, 30 owned production lines, and documentation issued in-house into more than 120 markets."
            }
            hint="Three lines of copy sitting under the wordmark."
          />
        </AdminCard>
      </SettingsForm>

      <AdminCard
        title="Legal pages"
        description="These links run along the bottom row. Each is a real page."
        icon={<ScrollText size={17} />}
        footer={
          <Link href="/admin/content/legal_documents" className="text-sm font-medium text-accent">
            Add, edit or remove a legal page
          </Link>
        }
      >
        <ul className="divide-y divide-line">
          {legal.map((doc) => (
            <li key={doc.slug} className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0">
              <div className="min-w-0">
                <p className="text-sm text-fg">{doc.title}</p>
                <p className="truncate font-mono text-xs text-fg-subtle">/legal/{doc.slug}</p>
              </div>
              <a href={`/legal/${doc.slug}`} target="_blank" rel="noopener noreferrer"
                className="flex shrink-0 items-center gap-1.5 text-xs text-fg-muted hover:text-accent">
                View <ExternalLink size={12} aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </AdminCard>

      <AdminCard
        title="Other footer content"
        description="These columns are shared with other parts of the site, so they are edited once in the place they belong."
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {elsewhere.map((item) => (
            <li key={item.href}>
              <Link href={item.href}
                className="block h-full rounded-lg border border-line bg-canvas p-4 transition-colors hover:border-accent">
                <span className="block text-sm font-medium text-fg">{item.label}</span>
                <span className="mt-0.5 block truncate text-xs text-fg-muted">{item.detail}</span>
              </Link>
            </li>
          ))}
        </ul>
      </AdminCard>
    </AdminPage>
  );
}
