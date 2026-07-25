import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { Stat } from "@/components/Stat";
import { DataTable, SpecTable } from "@/components/SpecTable";
import { CTABand } from "@/components/CTABand";
import { SectionNav } from "@/components/SectionNav";
import { Photo } from "@/components/Photo";
import { site, offices, stats } from "@/lib/site";
import { companyValues } from "@/lib/content";

export const metadata: Metadata = {
  title: "Company",
  description:
    "Ostenmark Group B.V. — founded 2004, six owned sites across Europe, South Asia, Southeast Asia and North America, 1,960 employees, governed by ISO 9001 and SMETA audit.",
  alternates: { canonical: "/about" },
};

const corporateRecord = [
  { term: "Legal entity", value: site.legalEntity },
  { term: "Incorporated", value: `${site.founded}, Netherlands` },
  { term: "Registration", value: site.registration },
  { term: "D-U-N-S number", value: site.duns.replace("D-U-N-S ", "") },
  { term: "Registered office", value: "Rotterdam, Netherlands" },
  { term: "Ownership", value: "Privately held, founder and management" },
];

const leadership = [
  {
    name: "Daniel Okonkwo",
    role: "Chief Executive Officer",
    detail: "Group strategy and commercial",
    initials: "DO",
  },
  {
    name: "Sofia Marchetti",
    role: "Chief Operating Officer",
    detail: "Production across four sites",
    initials: "SM",
  },
  {
    name: "Raj Patel",
    role: "Director, Quality & Compliance",
    detail: "Audit, certification, non-conformance",
    initials: "RP",
  },
  {
    name: "Mei Lin Chen",
    role: "Director, Sourcing",
    detail: "Vendor qualification and materials",
    initials: "MC",
  },
];

const milestones = [
  { year: "2004", event: "Incorporated in Rotterdam as a leather goods workshop" },
  { year: "2009", event: "Porto site acquired; footwear capability added" },
  { year: "2013", event: "ISO 9001 certification; İzmir textile site opened" },
  { year: "2017", event: "Chennai site commissioned; LWG Gold rating achieved" },
  { year: "2021", event: "Ho Chi Minh City site opened; SMETA 4-Pillar adopted" },
  { year: "2024", event: "Managed vendor network formalised at 220+ suppliers" },
];

const pageSections = [
  { id: "position", label: "Position" },
  { id: "history", label: "Operating history" },
  { id: "sites", label: "Sites" },
  { id: "principles", label: "Principles" },
  { id: "leadership", label: "Leadership" },
];

export default function CompanyPage() {
  return (
    <>
      <PageHero
        eyebrow="Company"
        title="Corporate record"
        lead={`${site.legalEntity} has manufactured under contract since ${site.founded}. The entity you contract with is the entity that operates the floors — there is no intermediary in the structure.`}
        facts={[
          { value: String(site.founded), label: "Incorporated" },
          { value: "6", label: "Sites" },
          { value: "1,960", label: "Employees" },
          { value: "120+", label: "Export markets" },
        ]}
        image="/photos/trade-yard.jpg"
        imageAlt="Container yard handling Ostenmark export volume"
      />

      <SectionNav sections={pageSections} />

      {/* Record + position */}
      <Section id="position" background="default" divider={false}>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Position"
              index="§ 01"
              title="Manufacturer, not intermediary"
            />
            <Reveal
              delay={60}
              className="mt-8 space-y-5 text-[0.9375rem] leading-relaxed text-ink-muted"
            >
              <p>
                Ostenmark was incorporated in 2004 as a single leather workshop in
                Rotterdam. The operating premise has not changed since: the party
                a brand contracts with should be the party that runs the line,
                because that is the only party that can be held to a
                specification.
              </p>
              <p>
                Twenty years on the group operates four production sites and two
                commercial offices, employing 1,960 people directly. Where a
                programme falls outside our own capability, we appoint and manage
                a third-party vendor under our contract and our quality protocol
                — we do not introduce clients to suppliers and step back from the
                liability.
              </p>
              <p>
                The company is privately held by its founder and management. It
                carries no external investment mandate, which is why capacity
                decisions are made against programme commitments rather than
                against a growth target.
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
            <SectionHeading
              eyebrow="History"
              index="§ 02"
              title="Operating history"
              lead="Capability has been added by acquiring and commissioning sites, not by subcontracting under the group name."
            />
            <Reveal delay={120} className="mt-10">
              <Photo
                src="/photos/leather-boots.jpg"
                alt="Welted leather boots, finished"
                sizes="(max-width: 1024px) 90vw, 30vw"
                className="aspect-4/3 rounded-brand border border-line"
              />
              <p className="label-mono mt-3 text-ink-faint">
                Fig. 01 — Welted construction, Porto
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
                  <span className="font-mono text-sm text-accent sm:w-16 sm:shrink-0">
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
        <SectionHeading
          eyebrow="Footprint"
          index="§ 03"
          title="Sites and functions"
          lead="Production sits close to material supply; commercial and distribution sit close to market. Every site is Ostenmark-owned and Ostenmark-staffed."
        />
        <Reveal delay={80} className="mt-12">
          <DataTable
            caption="Ostenmark sites and functions"
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
        <SectionHeading
          eyebrow="Principles"
          index="§ 04"
          title="How the company is run"
        />
        <Stagger className="mt-12 grid gap-x-12 gap-y-10 border-t border-line pt-10 sm:grid-cols-2">
          {companyValues.map((value, i) => (
            <StaggerItem key={value.title} className="flex gap-5">
              <span className="label-mono pt-1 text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-lg font-medium tracking-[-0.02em] text-ink">
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
        <SectionHeading
          eyebrow="Leadership"
          index="§ 05"
          title="Accountable officers"
          lead="Named leads for the functions a client escalates to. Direct contact details are issued with the vendor onboarding pack."
        />
        <Stagger className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {leadership.map((person) => (
            <StaggerItem key={person.name} className="bg-bg">
              <div className="flex h-full flex-col p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center border border-line font-mono text-sm text-ink">
                  {person.initials}
                </span>
                <h3 className="mt-6 text-base font-medium tracking-[-0.015em] text-ink">
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
        title="Begin vendor qualification"
        lead="We issue a full onboarding pack — certificates, audit reports, insurance, banking and references — on request, ahead of any commercial discussion."
        primaryLabel="Request the vendor pack"
        secondaryLabel="Production protocol"
        secondaryHref="/manufacturing"
      />
    </>
  );
}
