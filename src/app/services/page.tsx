import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { CTABand } from "@/components/CTABand";
import { CheckIcon } from "@/components/icons";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Leather goods, footwear, apparel, and textile manufacturing, plus sourcing, quality control, private label, and global export — the full toolkit from Meridian Global Trade.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything it takes to make and ship your product"
        lead="We manufacture on our own floors, source what we don't stock, control quality at every gate, and export the finished goods — a complete toolkit under one partner."
        image="/photos/hero.jpg"
        imageAlt="Leatherworker cutting a strap in the Meridian workshop"
      />

      <Section background="soft">
        <Stagger className="grid gap-5 lg:grid-cols-2">
          {services.map((service, i) => (
            <StaggerItem key={service.slug}>
              <article className="card flex h-full flex-col p-8 sm:p-10">
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold-tint text-gold">
                    <service.icon width={28} height={28} />
                  </span>
                  <span className="tnum font-display text-3xl text-border-strong">
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
                      <CheckIcon width={17} height={17} className="mt-0.5 shrink-0 text-gold" />
                      <span className="text-sm text-ink-soft">{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <CTABand
        title="Need a specific product quoted?"
        lead="Send us your tech pack, sketch, or reference sample — we'll come back with materials, timeline, and price."
        secondaryLabel="What we make"
        secondaryHref="/industries"
      />
    </>
  );
}
