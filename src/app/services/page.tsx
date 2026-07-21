import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { CTABand } from "@/components/CTABand";
import { CheckIcon } from "@/components/icons";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Ocean, air, and land freight, customs brokerage, warehousing, sourcing, insurance, and end-to-end supply chain management — the full trade toolkit from Meridian Global Trade.",
  alternates: { canonical: "/services" },
};

const process = [
  { step: "01", title: "Consult", blurb: "We learn your cargo, lanes, timelines, and constraints." },
  { step: "02", title: "Plan", blurb: "We design the optimal route, mode, and compliance path." },
  { step: "03", title: "Move", blurb: "We book capacity and execute the shipment across modes." },
  { step: "04", title: "Clear", blurb: "We handle customs, duties, and documentation cleanly." },
  { step: "05", title: "Deliver", blurb: "We complete last-mile delivery and confirm receipt." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="From production line to final mile"
        lead="We manufacture and fulfill orders, connect you with vetted makers, and move goods worldwide — a complete set of services under one accountable partner."
      />

      {/* Detailed service blocks */}
      <Section background="soft">
        <Stagger className="grid gap-5 lg:grid-cols-2">
          {services.map((service, i) => (
            <StaggerItem key={service.slug}>
              <article className="card flex h-full flex-col p-8 sm:p-10">
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold-tint text-gold">
                    <service.icon width={28} height={28} />
                  </span>
                  <span className="tnum font-display text-3xl text-border">
                    0{i + 1}
                  </span>
                </div>
                <h2 className="mt-6 text-2xl text-ink">{service.title}</h2>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  {service.summary}
                </p>
                <ul className="mt-6 grid gap-x-6 gap-y-2.5 border-t border-border pt-6 sm:grid-cols-2">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <CheckIcon
                        width={17}
                        height={17}
                        className="mt-0.5 shrink-0 text-gold"
                      />
                      <span className="text-sm text-ink-soft">{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* How we work */}
      <Section background="default">
        <SectionHeading
          eyebrow="How we work"
          title="Five steps, fully managed"
          lead="A consistent, transparent process behind every shipment — you always know what happens next."
        />
        <Stagger className="mt-16 grid gap-px overflow-hidden rounded-brand border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {process.map((p) => (
            <StaggerItem key={p.step} className="h-full">
              <div className="flex h-full flex-col bg-bg p-7">
                <span className="tnum font-display text-4xl text-gold">
                  {p.step}
                </span>
                <h3 className="mt-5 text-lg text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {p.blurb}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <CTABand
        title="Need a specific lane priced?"
        lead="Send us the origin, destination, and cargo details — we'll come back with a mode-by-mode recommendation and quote."
        secondaryLabel="What we trade"
        secondaryHref="/industries"
      />
    </>
  );
}
