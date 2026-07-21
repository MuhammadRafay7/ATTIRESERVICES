import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { CTABand } from "@/components/CTABand";
import { ShieldIcon, BeakerIcon, LeafIcon, LayersIcon } from "@/components/icons";
import { industries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Agriculture, machinery, textiles, electronics, raw materials, chemicals, automotive, and consumer goods — Meridian Global Trade moves every category of cargo worldwide.",
  alternates: { canonical: "/industries" },
};

const compliance = [
  {
    icon: BeakerIcon,
    title: "Dangerous goods",
    blurb:
      "Full IMDG, IATA DGR, and ADR handling for hazardous cargo — correct classification, packing, and declarations end to end.",
  },
  {
    icon: LeafIcon,
    title: "Perishables & cold chain",
    blurb:
      "Reefer containers, temperature monitoring, and phytosanitary compliance keep food and pharma within spec, port to door.",
  },
  {
    icon: LayersIcon,
    title: "Oversized & project cargo",
    blurb:
      "Breakbulk, flat-rack, and out-of-gauge movements with route surveys, rigging, and permits for heavy or awkward loads.",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Each and everything, made and moved"
        lead="Meridian's promise is breadth without compromise. Across every sector we manufacture, source, and ship — with the specialists who know the handling, compliance, and routing that keep your goods whole."
      />

      {/* Breadth grid */}
      <Section background="soft">
        <SectionHeading
          eyebrow="What we handle"
          title="Sector expertise across the board"
          lead="Eight core sectors, each with dedicated manufacturing, sourcing, and handling standards — and the flexibility to take on whatever falls in between."
        />
        <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry) => (
            <StaggerItem key={industry.title}>
              <div className="card flex h-full flex-col p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-tint text-gold">
                  <industry.icon width={24} height={24} />
                </span>
                <h3 className="mt-6 text-lg text-ink">{industry.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {industry.blurb}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Specialized cargo */}
      <Section background="default">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Specialized cargo"
              title="The hard-to-handle, handled"
              lead="Some cargo demands more than a container and a booking. These are the capabilities that let us say yes when others can't."
            />
          </div>
          <Stagger className="grid gap-5 sm:grid-cols-3 lg:col-span-8">
            {compliance.map((item) => (
              <StaggerItem key={item.title}>
                <div className="card flex h-full flex-col p-7">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-tint text-gold">
                    <item.icon width={24} height={24} />
                  </span>
                  <h3 className="mt-6 text-lg text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.blurb}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal className="mt-10">
          <div className="flex items-start gap-4 rounded-brand border border-gold/30 bg-gold-tint/40 p-6">
            <ShieldIcon
              width={24}
              height={24}
              className="mt-0.5 shrink-0 text-gold"
            />
            <p className="text-sm leading-relaxed text-ink-soft">
              <span className="font-semibold text-ink">
                Compliance is built in, not bolted on.
              </span>{" "}
              Every commodity we move is screened against sanctions, licensing,
              and dangerous-goods rules before it ships — so surprises stay out
              of your supply chain.
            </p>
          </div>
        </Reveal>
      </Section>

      <CTABand
        title="Have unusual cargo?"
        lead="If it's legal to trade, chances are we've moved something like it. Tell us what you need shipped and we'll scope it."
        secondaryLabel="See our services"
        secondaryHref="/services"
      />
    </>
  );
}
