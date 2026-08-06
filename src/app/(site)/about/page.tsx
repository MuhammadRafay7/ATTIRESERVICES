import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { Stat } from "@/components/Stat";
import { DataTable, SpecTable } from "@/components/SpecTable";
import { CTABand } from "@/components/CTABand";
import { Photo } from "@/components/Photo";
import { site, offices, stats } from "@/lib/site";
import { getCollection, getCopy, getSettings } from "@/lib/cms";
import { companyValues } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Company",
  description:
    "Attire Services B.V. — founded 2004, six offices and sites across Europe, South Asia, Southeast Asia and North America, 1,570 employees, governed by ISO 9001, AEO-F and SMETA audit.",
  path: "/about",
});


export default async function CompanyPage() {
  const copy = await getCopy("about");
  const settings = await getSettings();
  // Editable under Pages → Company in the admin.
  const corporateRecord = await getCollection<{ term: string; value: string }>(
    "corporate_record",
  );
  const milestones = await getCollection<{ year: string; event: string }>("milestones");
  const leadership = await getCollection<{
    name: string;
    role: string;
    detail: string;
    initials: string;
  }>("leadership");

  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: "Company", href: "/about" }])} />

      <PageHero
        {...copy("page-hero")}
        facts={[
          { value: String(site.founded), label: "Incorporated" },
          { value: "6", label: "Offices and sites" },
          { value: "1,570", label: "Employees" },
          { value: "120+", label: "Export markets" },
        ]}
        image="/photos/trade-vessel.jpg"
        imageAlt="Loaded container vessel carrying Attire Services export volume"
      />


      {/* Record + position */}
      <Section id="position" background="default" divider={false}>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <SectionHeading {...copy("position")} />
            <Reveal
              delay={60}
              className="mt-8 space-y-5 text-[0.9375rem] leading-relaxed text-ink-muted"
            >
              <p>
                Attire Services was incorporated in 2004 as an apparel buying
                agency in Rotterdam. The operating premise has not changed since:
                the party a brand contracts with should be the party that buys
                the goods, because that is the only party that can be held to a
                specification.
              </p>
              <p>
                Twenty years on the group runs two production sites, two sourcing
                offices and two commercial offices, employing 1,570 people
                directly. We buy as principal across a network of 220+ qualified
                mills — we do not introduce clients to suppliers and step back
                from the liability. Where a programme needs capacity we control
                outright, it runs on our own thirty lines.
              </p>
              <p>
                The company is privately held by its founder and management. It
                carries no external investment mandate, which is why capacity and
                vendor decisions are made against programme commitments rather
                than against a growth target.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={100}>
              <p className="eyebrow">Corporate record</p>
              <SpecTable className="mt-6" rows={corporateRecord} />
            </Reveal>
            <Reveal delay={140}>
              <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-line pt-10">
                {stats.map((s) => (
                  <Stat key={s.label} value={s.value} label={s.label} note={s.note} />
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Milestones */}
      <Section id="history" background="subtle">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeading {...copy("history")} />
            <Reveal delay={120} className="mt-10">
              <Photo
                src="/photos/trade-port.jpg"
                alt="Container vessel loading alongside quay cranes"
                sizes="(max-width: 1024px) 90vw, 30vw"
                className="aspect-4/3 rounded-brand border border-line"
              />
              <p className="label-mono mt-3 text-ink-faint">
                Fig. 01 — Export berth, Rotterdam
              </p>
            </Reveal>
          </div>
          <Reveal delay={80} className="lg:col-span-8">
            <ol className="border-t border-line">
              {milestones.map((m) => (
                <li
                  key={m.year}
                  className="flex flex-col gap-1.5 border-b border-line py-5 sm:flex-row sm:gap-8"
                >
                  <span className="font-mono text-sm text-brass sm:w-16 sm:shrink-0">
                    {m.year}
                  </span>
                  <span className="text-sm text-ink-body">{m.event}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      {/* Sites */}
      <Section id="sites" background="default">
        <SectionHeading {...copy("sites")} />
        <Reveal delay={80} className="mt-12">
          <DataTable
            caption="Attire Services sites and functions"
            columns={["Site", "Region", "Function", "Lines", "Headcount"]}
            rows={offices.map((o) => [
              `${o.city}, ${o.country}`,
              o.region,
              o.role,
              o.lines > 0 ? String(o.lines) : "—",
              String(o.headcount),
            ])}
          />
        </Reveal>
      </Section>

      {/* Principles */}
      <Section id="principles" background="subtle">
        <SectionHeading {...copy("principles")} />
        <Stagger className="mt-12 grid gap-x-12 gap-y-10 border-t border-line pt-10 sm:grid-cols-2">
          {companyValues.map((value, i) => (
            <StaggerItem key={value.title} className="flex gap-5">
              <span className="label-mono pt-1 text-brass">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold tracking-[-0.022em] text-ink">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {value.blurb}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Leadership */}
      <Section id="leadership" background="default">
        <SectionHeading {...copy("leadership")} />
        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {leadership.map((person) => (
            <StaggerItem key={person.name}>
              <div className="card flex h-full flex-col p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-brand-sm bg-accent-wash font-mono text-sm text-accent">
                  {person.initials}
                </span>
                <h3 className="mt-6 font-display text-base font-semibold tracking-[-0.018em] text-ink">
                  {person.name}
                </h3>
                <p className="mt-1.5 text-sm text-ink-muted">{person.role}</p>
                <p className="label-mono mt-5 border-t border-line pt-4 text-ink-faint">
                  {person.detail}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <CTABand
        {...copy("cta")}
        responseSla={settings.responseSla}
        email={settings.contact.email}
        primaryLabel="Request the vendor pack"
        secondaryLabel="Production protocol"
        secondaryHref="/manufacturing"
      />
    </>
  );
}
