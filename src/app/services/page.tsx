import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { SpecTable } from "@/components/SpecTable";
import { CTABand } from "@/components/CTABand";
import { SectionNav } from "@/components/SectionNav";
import { Photo } from "@/components/Photo";
import { CheckIcon } from "@/components/icons";
import { services, pillars, divisions, divisionLabels } from "@/lib/content";
import type { Division } from "@/lib/content";
import { commercialTerms } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Capabilities",
  description:
    "Ostenmark capability schedule across three divisions — garment manufacturing, leather manufacturing, and import & export — with stated minimum orders, lead times and producing sites.",
  path: "/services",
});

/** Three frames per division, so the schedule shows as well as tells. */
const divisionGallery: Record<Division, { src: string; alt: string }[]> = {
  garment: [
    { src: "/photos/apparel-line.jpg", alt: "Machinist at an industrial sewing line" },
    { src: "/photos/apparel-pressing.jpg", alt: "Pressing and finishing a garment" },
    { src: "/photos/apparel-hangers.jpg", alt: "Finished garments on hangers" },
  ],
  leather: [
    { src: "/photos/leather-line.jpg", alt: "Leather goods stacked on the production floor" },
    { src: "/photos/leather-bag.jpg", alt: "Full-grain leather satchel" },
    { src: "/photos/leather-shoes.jpg", alt: "Finished derby shoes" },
  ],
  trade: [
    { src: "/photos/trade-port.jpg", alt: "Container vessel alongside quay cranes" },
    { src: "/photos/trade-warehouse.jpg", alt: "Distribution warehouse racking" },
    { src: "/photos/trade-packing.jpg", alt: "Cartons staged for despatch" },
  ],
};

const pageSections = [
  { id: "schedule", label: "Capability schedule" },
  { id: "contracting", label: "Contracting" },
  { id: "terms", label: "Commercial terms" },
];

export default function CapabilitiesPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: "Capabilities", href: "/services" }])} />

      <PageHero
        eyebrow="Capabilities"
        title="Capability schedule"
        lead="Twelve capability lines across three divisions — garment, leather, and import & export. Each states its minimum order, lead time and producing site, so a programme can be scoped before a call is booked."
        facts={[
          { value: "12", label: "Capability lines" },
          { value: "49", label: "Production lines" },
          { value: "3", label: "Divisions" },
          { value: "220+", label: "Qualified vendors" },
        ]}
        image="/photos/leather-line.jpg"
        imageAlt="Finished leather goods stacked on the production floor"
      />

      <SectionNav sections={pageSections} />

      {/* Capability schedule */}
      <Section id="schedule" background="default" divider={false}>
        <SectionHeading
          eyebrow="Schedule"
          index="§ 01"
          title="Manufacturing and service lines"
          lead="Specifications shown are standard. Programme-specific terms are confirmed against the bill of materials at quotation."
        />

        {(Object.keys(divisionLabels) as Division[]).map((div) => {
          const lines = services.filter((x) => x.division === div);
          const meta = divisions.find((d) => d.key === div);
          return (
            <div key={div} className="mt-16 first:mt-14">
              <Reveal>
                <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-ink pb-4">
                  <h3 className="text-lg font-medium tracking-[-0.02em] text-ink">
                    {divisionLabels[div]}
                  </h3>
                  {meta && (
                    <p className="label-mono text-ink-faint">
                      {meta.facts.map((f) => `${f.value} ${f.label}`).join("  ·  ")}
                    </p>
                  )}
                </div>
              </Reveal>

              {meta && (
                <Reveal delay={60}>
                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    {divisionGallery[div].map((img) => (
                      <Photo
                        key={img.src}
                        src={img.src}
                        alt={img.alt}
                        sizes="(max-width: 640px) 90vw, 30vw"
                        className="aspect-4/3 rounded-brand border border-line"
                      />
                    ))}
                  </div>
                </Reveal>
              )}

              <Stagger>
                {lines.map((service) => (
                  <StaggerItem key={service.slug}>
                    <article className="grid gap-8 border-b border-line py-10 lg:grid-cols-12 lg:gap-10 lg:py-12">
                      {/* Identity */}
                      <div className="lg:col-span-4">
                        <div className="flex items-center gap-4">
                          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-line text-accent">
                            <service.icon width={22} height={22} />
                          </span>
                          <span className="label-mono text-ink-faint">
                            {service.code}
                          </span>
                        </div>
                        <h2 className="mt-6 text-xl font-medium tracking-[-0.02em] text-ink">
                          {service.title}
                        </h2>
                        <p className="mt-3.5 max-w-md text-sm leading-relaxed text-ink-muted">
                          {service.summary}
                        </p>
                      </div>

                      {/* Scope */}
                      <div className="lg:col-span-4">
                        <p className="label-mono">Scope of work</p>
                        <ul className="mt-5 space-y-3">
                          {service.points.map((point) => (
                            <li key={point} className="flex items-start gap-3">
                              <CheckIcon
                                width={15}
                                height={15}
                                className="mt-1 shrink-0 text-accent"
                              />
                              <span className="text-sm text-ink-body">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Specification */}
                      <div className="lg:col-span-4">
                        <p className="label-mono">Specification</p>
                        <SpecTable
                          dense
                          className="mt-5"
                          rows={service.specs.map((sp) => ({
                            term: sp.key,
                            value: sp.value,
                          }))}
                        />
                      </div>
                    </article>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          );
        })}
      </Section>

      {/* Engagement models */}
      <Section id="contracting" background="subtle">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Contracting"
              index="§ 02"
              title="How capability is contracted"
              lead="The capability lines above are delivered under one of three arrangements. The difference is material nomination and where liability sits."
            />
            <Reveal delay={120} className="mt-10">
              <Photo
                src="/photos/leather-components.jpg"
                alt="Cut leather components staged for closing"
                sizes="(max-width: 1024px) 90vw, 30vw"
                className="aspect-4/3 rounded-brand border border-line"
              />
              <p className="label-mono mt-3 text-ink-faint">
                Fig. 01 — Cut components, Porto
              </p>
            </Reveal>
          </div>
          <Stagger className="lg:col-span-8">
            <div className="border-t border-line">
              {pillars.map((pillar) => (
                <StaggerItem key={pillar.title}>
                  <div className="grid gap-x-8 gap-y-4 border-b border-line py-8 sm:grid-cols-[3rem_1fr]">
                    <span className="label-mono pt-1 text-accent">
                      {pillar.code}
                    </span>
                    <div>
                      <h3 className="text-lg font-medium tracking-[-0.02em] text-ink">
                        {pillar.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
                        {pillar.blurb}
                      </p>
                      <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                        {pillar.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-center gap-2 text-xs text-ink-body"
                          >
                            <span className="h-1 w-1 shrink-0 bg-accent" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </Stagger>
        </div>
      </Section>

      {/* Commercial terms */}
      <Section id="terms" background="default">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Commercial terms"
              index="§ 03"
              title="Standard terms of trade"
              lead="Published so a first enquiry can be qualified without a discovery call. Volume tiering and extended terms are available subject to credit review."
            />
          </div>
          <Reveal delay={80} className="lg:col-span-7">
            <SpecTable rows={commercialTerms} />
          </Reveal>
        </div>
      </Section>

      <CTABand
        title="Scope a programme"
        lead="Send a specification and indicative volumes. We return a costed bill of materials, a firm production window and the applicable Incoterms."
        secondaryLabel="Production protocol"
        secondaryHref="/manufacturing"
      />
    </>
  );
}
