import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { Stat } from "@/components/Stat";
import { Photo } from "@/components/Photo";
import { DataTable, SpecTable } from "@/components/SpecTable";
import { CTABand } from "@/components/CTABand";
import { SectionNav } from "@/components/SectionNav";
import { CheckIcon } from "@/components/icons";
import { manufacturingProcess, qualityControls } from "@/lib/content";
import { credentials, offices } from "@/lib/site";

export const metadata: Metadata = {
  title: "Manufacturing",
  description:
    "Ostenmark's production and quality protocol — six workflow stages with named owners, AQL 2.5 inspection, lot-level traceability, capacity by site, and unannounced audit access.",
  alternates: { canonical: "/manufacturing" },
};

const capacity = [
  { value: "18.6M", label: "Annual unit capacity", note: "FY2025 · all sites" },
  { value: "49", label: "Production lines", note: "30 garment, 19 other" },
  { value: "1,960", label: "Direct employees", note: "Production and QA" },
  { value: "82%", label: "Capacity utilisation", note: "Rolling quarter" },
];

const escalation = [
  { term: "Non-conformance report", value: "Issued within 24 hours of detection" },
  { term: "Corrective action plan", value: "Within 3 working days, client-approved" },
  { term: "Rework or replacement", value: "At Ostenmark cost, schedule protected" },
  { term: "Root cause review", value: "8D methodology, closed in writing" },
];

const productionSites = offices.filter((o) => o.lines > 0);

const pageSections = [
  { id: "workflow", label: "Workflow" },
  { id: "capacity", label: "Capacity" },
  { id: "quality", label: "Inspection regime" },
  { id: "escalation", label: "Non-conformance" },
  { id: "export", label: "Export" },
  { id: "audit", label: "Audit access" },
];

export default function ManufacturingPage() {
  return (
    <>
      <PageHero
        eyebrow="Manufacturing"
        title="Production and quality protocol"
        lead="Ostenmark runs its own floors. This is the sequence every order follows, the inspection regime applied to it, and what happens contractually when a lot does not conform."
        facts={[
          { value: "AQL 2.5", label: "Inspection standard" },
          { value: "99.4%", label: "Pass rate, 12 mo" },
          { value: "97.8%", label: "On-time shipment" },
          { value: "7 yr", label: "Traceability held" },
        ]}
        image="/photos/textile-mill.jpg"
        imageAlt="Fabric production line at an Ostenmark textile site"
      />

      <SectionNav sections={pageSections} />

      {/* Workflow */}
      <Section id="workflow" background="default" divider={false}>
        <SectionHeading
          eyebrow="Workflow"
          index="§ 01"
          title="Six stages, each with a named owner"
          lead="Durations are working days and are confirmed per programme at quotation. Bulk production does not begin until the pre-production sample is approved in writing."
        />
        <Reveal delay={80} className="mt-14">
          <ol className="border-t border-line">
            {manufacturingProcess.map((step) => (
              <li
                key={step.step}
                className="grid gap-x-8 gap-y-3 border-b border-line py-7 sm:grid-cols-[3rem_3rem_1fr_10rem]"
              >
                <span className="label-mono pt-1.5 text-accent">{step.step}</span>
                <span className="hidden pt-0.5 text-accent sm:block">
                  <step.icon width={22} height={22} />
                </span>
                <div>
                  <h2 className="text-base font-medium tracking-[-0.015em] text-ink">
                    {step.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
                    {step.blurb}
                  </p>
                </div>
                <div className="sm:text-right">
                  <p className="font-mono text-xs text-ink">{step.duration}</p>
                  <p className="mt-1 text-xs text-ink-faint">{step.owner}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </Section>

      {/* Capacity */}
      <Section id="capacity" background="subtle">
        {/* [&>*]:min-w-0 — grid children default to min-content width, which
            would let the wide capacity table stretch the column. */}
        <div className="grid items-start gap-14 [&>*]:min-w-0 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Capacity"
              index="§ 02"
              title="Capacity by site"
              lead="Allocation is committed against a named line before a delivery date is confirmed. Utilisation is reported so schedule risk surfaces before it becomes a delay."
            />
            <Reveal delay={80}>
              <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10">
                {capacity.map((s) => (
                  <Stat key={s.label} value={s.value} label={s.label} note={s.note} />
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={100} className="lg:col-span-6">
            <DataTable
              caption="Production capacity by site"
              columns={["Site", "Output", "Lines", "Headcount"]}
              rows={productionSites.map((o) => [
                `${o.city}, ${o.country}`,
                o.role,
                String(o.lines),
                String(o.headcount),
              ])}
            />
            <Photo
              src="/photos/leather-shoes.jpg"
              alt="Finished derby shoes from the leather division"
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="mt-10 aspect-16/9 rounded-brand border border-line"
            />
            <p className="label-mono mt-3 text-ink-faint">
              Fig. 02 — Footwear finishing, Porto
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Quality */}
      <Section id="quality" background="default">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Quality"
              index="§ 03"
              title="Inspection regime"
              lead="Inspection is a gate at each stage, governed by ISO 2859-1 at AQL 2.5. Non-conforming lots are reworked or replaced — they are not shipped and discounted."
            />
          </div>
          <Stagger className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:col-span-8">
            {qualityControls.map((q) => (
              <StaggerItem key={q} className="bg-bg">
                <div className="flex h-full items-start gap-3 p-6">
                  <CheckIcon
                    width={16}
                    height={16}
                    className="mt-0.5 shrink-0 text-accent"
                  />
                  <span className="text-sm leading-relaxed text-ink-body">{q}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* Escalation */}
      <Section id="escalation" background="deep">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Non-conformance"
              index="§ 04"
              onDeep
              title="What happens when a lot fails"
              lead="The measure of a manufacturer is not the pass rate. It is the documented, time-bound sequence that runs when the pass rate is missed."
            />
          </div>
          <Reveal delay={80} className="lg:col-span-7">
            <SpecTable onDeep rows={escalation} />
            <p className="mt-7 max-w-xl text-sm leading-relaxed text-on-deep-muted">
              Ostenmark carries the liability in every engagement model, including
              work placed with managed third-party vendors — because in that
              model we hold the vendor contract rather than introducing you to it.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Export */}
      <Section id="export" background="default">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Export"
              index="§ 05"
              title="Out of the factory, into the market"
              lead="Finished goods are packed, documented and shipped by our own trade division — the same entity that made them, so the paperwork matches the carton."
            />
            <Reveal delay={120} className="mt-9">
              <SpecTable
                dense
                rows={[
                  { term: "Incoterms", value: "EXW · FOB · CIF · DDP" },
                  { term: "Modes", value: "FCL, LCL, air and rail" },
                  { term: "Volume", value: "2,400 TEU / year" },
                  { term: "Documentation", value: "Issued by Ostenmark" },
                ]}
              />
            </Reveal>
          </div>
          <Reveal delay={80} className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              <Photo
                src="/photos/trade-packing.jpg"
                alt="Cartons staged for despatch after final inspection"
                sizes="(max-width: 1024px) 45vw, 28vw"
                className="aspect-4/3 rounded-brand border border-line"
              />
              <Photo
                src="/photos/trade-warehouse.jpg"
                alt="Distribution warehouse racking"
                sizes="(max-width: 1024px) 45vw, 28vw"
                className="aspect-4/3 rounded-brand border border-line"
              />
              <Photo
                src="/photos/trade-containers.jpg"
                alt="Container terminal handling export volume"
                sizes="(max-width: 1024px) 45vw, 28vw"
                className="aspect-4/3 rounded-brand border border-line"
              />
              <Photo
                src="/photos/trade-vessel.jpg"
                alt="Loaded container vessel under way"
                sizes="(max-width: 1024px) 45vw, 28vw"
                className="aspect-4/3 rounded-brand border border-line"
              />
            </div>
            <p className="label-mono mt-3 text-ink-faint">
              Fig. 03 — Packing, consolidation and despatch
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Certification */}
      <Section id="audit" background="subtle">
        <SectionHeading
          eyebrow="Audit"
          index="§ 06"
          title="Certification and audit access"
          lead="Unannounced access to any Ostenmark site during production hours is written into our standard terms, for your staff and for third-party inspection bodies."
        />
        <Reveal delay={80} className="mt-12">
          <DataTable
            caption="Ostenmark certification register"
            columns={["Standard", "Scope", "Certification body", "Valid to"]}
            rows={credentials.map((c) => [c.code, c.scope, c.body, c.valid])}
          />
        </Reveal>
      </Section>

      <CTABand
        title="Request a sample run"
        lead="A pre-production sample is the fastest way to assess construction quality against your own standard. Send the specification and we will schedule it."
        primaryLabel="Request a sample"
        secondaryLabel="Product portfolio"
        secondaryHref="/industries"
      />
    </>
  );
}
