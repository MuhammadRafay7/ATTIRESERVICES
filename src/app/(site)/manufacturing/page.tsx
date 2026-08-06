import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { Stat } from "@/components/Stat";
import { Photo } from "@/components/Photo";
import { DataTable, SpecTable } from "@/components/SpecTable";
import { CTABand } from "@/components/CTABand";
import { CheckIcon } from "@/components/icons";
import { manufacturingProcess, qualityControls } from "@/lib/content";
import { credentials, offices } from "@/lib/site";
import { getCollection, getCopy, getSettings } from "@/lib/cms";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Manufacturing",
  description:
    "Attire Services production and quality protocol — six order-lifecycle stages with named owners, AQL 2.5 inspection, lot-level traceability, capacity by site, and unannounced audit access.",
  path: "/manufacturing",
});

const productionSites = offices.filter((o) => o.lines > 0);


export default async function ManufacturingPage() {
  const copy = await getCopy("manufacturing");
  const settings = await getSettings();
  // Editable under Pages → Manufacturing in the admin.
  const capacity = await getCollection<{ value: string; label: string; note: string }>(
    "capacity_figures",
  );
  const escalation = await getCollection<{ term: string; value: string }>(
    "escalation_terms",
  );

  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: "Manufacturing", href: "/manufacturing" }])} />

      <PageHero
        {...copy("page-hero")}
        facts={[
          { value: "AQL 2.5", label: "Inspection standard" },
          { value: "99.4%", label: "Pass rate, 12 mo" },
          { value: "97.8%", label: "On-time shipment" },
          { value: "7 yr", label: "Traceability held" },
        ]}
        image="/photos/textile-mill.jpg"
        imageAlt="Fabric production line at an Attire Services textile site"
      />


      {/* Workflow */}
      <Section id="workflow" background="default" divider={false}>
        <SectionHeading {...copy("workflow")} />
        <Reveal delay={80} className="mt-14">
          <ol className="border-t border-line">
            {manufacturingProcess.map((step) => (
              <li
                key={step.step}
                className="grid gap-x-8 gap-y-3 border-b border-line py-7 sm:grid-cols-[3rem_3rem_1fr_10rem]"
              >
                <span className="label-mono pt-1.5 text-brass">{step.step}</span>
                <span className="hidden pt-0.5 text-accent sm:block">
                  <step.icon width={22} height={22} />
                </span>
                <div>
                  <h2 className="font-display text-base font-semibold tracking-[-0.018em] text-ink">
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
            <SectionHeading {...copy("capacity")} />
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
              src="/photos/apparel-pressing.jpg"
              alt="Pressing and finishing a garment before final inspection"
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="mt-10 aspect-16/9 rounded-brand border border-line"
            />
            <p className="label-mono mt-3 text-ink-faint">
              Fig. 02 — Pressing and finishing, İzmir
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Quality */}
      <Section id="quality" background="default">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeading {...copy("quality")} />
          </div>
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {qualityControls.map((q) => (
              <StaggerItem key={q}>
                <div className="card flex h-full items-start gap-3 p-6">
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
            <SectionHeading {...copy("escalation")} onDeep />
          </div>
          <Reveal delay={80} className="lg:col-span-7">
            <SpecTable onDeep rows={escalation} />
            <p className="mt-7 max-w-xl text-sm leading-relaxed text-on-deep-muted">
              Attire Services carries the liability in every engagement model,
              including goods bought from a partner mill — because in that model
              we hold the vendor contract as principal rather than introducing
              you to it.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Export */}
      <Section id="export" background="default">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading {...copy("export")} />
            <Reveal delay={120} className="mt-9">
              <SpecTable
                dense
                rows={[
                  { term: "Incoterms", value: "EXW · FOB · CIF · DDP" },
                  { term: "Modes", value: "FCL, LCL, air and rail" },
                  { term: "Volume", value: "2,400 TEU / year" },
                  { term: "Documentation", value: "Issued by Attire Services" },
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
        <SectionHeading {...copy("certification")} />
        <Reveal delay={80} className="mt-12">
          <DataTable
            caption="Attire Services certification register"
            columns={["Standard", "Scope", "Certification body", "Valid to"]}
            rows={credentials.map((c) => [c.code, c.scope, c.body, c.valid])}
          />
        </Reveal>
      </Section>

      <CTABand
        {...copy("cta")}
        responseSla={settings.responseSla}
        email={settings.contact.email}
        primaryLabel="Request a sample"
        secondaryLabel="Product portfolio"
        secondaryHref="/industries"
      />
    </>
  );
}
