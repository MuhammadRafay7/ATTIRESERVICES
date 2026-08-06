import { Fingerprint, Image as ImageIcon, Quote } from "lucide-react";
import { getSettings } from "@/lib/cms";
import { listMedia } from "../actions";
import { SettingsForm } from "../SettingsForm";
import { LogoPicker } from "./LogoPicker";
import { AdminCard, AdminGrid, AdminInput, AdminPage, AdminTextarea } from "../ui";

export const dynamic = "force-dynamic";

/** Who the company says it is. Every field here reaches the page head too. */
export default async function BrandPage() {
  const s = await getSettings();
  const library = await listMedia();
  const logoUrl = (s as { logoUrl?: string }).logoUrl ?? "";

  return (
    <AdminPage
      title="Name & positioning"
      description="The company name, how it is written in the masthead, and the sentences used across the site and in search results."
      aside={
        <AdminCard title="Where this appears">
          <div className="deep-field rounded-lg px-4 py-3.5">
            <div className="flex items-center gap-2.5">
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- CMS host
                <img src={logoUrl} alt="" className="h-6 w-auto max-w-24 object-contain" />
              ) : (
                <span className="grid h-6 w-6 place-items-center rounded bg-brass-soft text-[0.625rem] font-bold text-deep">
                  {s.name.charAt(0)}
                </span>
              )}
              <span className="font-display text-[0.8125rem] tracking-[0.12em] text-on-deep">
                <span className="font-bold">{s.wordmark.split(" ")[0]}</span>{" "}
                <span className="opacity-70">
                  {s.wordmark.split(" ").slice(1).join(" ")}
                </span>
              </span>
            </div>
            <p className="mt-2 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-on-deep-muted">
              {s.descriptor}
            </p>
          </div>

          <dl className="mt-4 space-y-3 text-xs">
            <div>
              <dt className="font-medium text-fg">Masthead &amp; footer</dt>
              <dd className="text-fg-muted">Logo, wordmark and descriptor.</dd>
            </div>
            <div>
              <dt className="font-medium text-fg">Browser tab &amp; search</dt>
              <dd className="text-fg-muted">
                Company name and description, on every page.
              </dd>
            </div>
            <div>
              <dt className="font-medium text-fg">Structured data</dt>
              <dd className="text-fg-muted">
                Name, URL and founding year, read by search engines.
              </dd>
            </div>
          </dl>
        </AdminCard>
      }
    >
      <SettingsForm>
        <AdminCard
          title="Logo"
          description="Replaces the built-in mark in the header, the footer and this admin. Leave it empty to keep the drawn mark."
          icon={<ImageIcon size={17} />}
        >
          <LogoPicker value={logoUrl} library={library} />
        </AdminCard>

        <AdminCard title="Identity" icon={<Fingerprint size={17} />}>
          <AdminGrid>
            <AdminInput label="Company name" name="name" defaultValue={s.name} required
              hint="Used in body copy, page titles and structured data." />
            <AdminInput label="Wordmark" name="wordmark" defaultValue={s.wordmark}
              hint="As it appears in the header. The first word is set bold." />
            <AdminInput label="Descriptor" name="descriptor" defaultValue={s.descriptor} wide
              hint="The small line under the wordmark." />
            <AdminInput label="Site URL" name="url" defaultValue={s.url}
              hint="Used for canonical links. Include https://" />
            <AdminInput label="Founded" name="founded" type="number" defaultValue={s.founded} />
          </AdminGrid>
        </AdminCard>

        <AdminCard title="Positioning" icon={<Quote size={17} />}>
          <AdminGrid>
            <AdminInput label="Short tagline" name="shortTagline" defaultValue={s.shortTagline} wide />
            <AdminTextarea label="Tagline" name="tagline" defaultValue={s.tagline} rows={2} />
            <AdminTextarea label="Description" name="description" defaultValue={s.description} rows={5}
              hint="The meta description and the sentence search engines show." />
          </AdminGrid>
        </AdminCard>
      </SettingsForm>
    </AdminPage>
  );
}
