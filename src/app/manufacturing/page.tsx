import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { CountUp } from "@/components/CountUp";
import { Photo } from "@/components/Photo";
import { CTABand } from "@/components/CTABand";
import { CheckIcon } from "@/components/icons";
import { manufacturingProcess, certifications } from "@/lib/content";

export const metadata: Metadata = {
  title: "How We Make It",
  description:
    "Inside Meridian's leather and textile production — design and sampling, material sourcing, cutting and sewing, AQL quality control, and export, all under one roof.",
  alternates: { canonical: "/manufacturing" },
};

const capacity = [
  { value: "12M+", label: "Units produced yearly" },
  { value: "40+", label: "Production lines" },
  { value: "1,400+", label: "Skilled makers" },
  { value: "6", label: "Production sites" },
];

const quality = [
  "AQL 2.5 in-line & final inspection",
  "Full material traceability",
  "Metal & needle detection",
  "Pull, rub & colorfastness testing",
  "Third-party audit ready",
  "Pre-shipment sample approval",
];

export default function ManufacturingPage() {
  return (
    <>
      <PageHero
        eyebrow="How we make it"
        title="Inside the Meridian floor"
        lead="We don't broker your production from a distance — we run it. Here's the disciplined path every order takes, from first sample to sealed export carton."
        image="/photos/hero.jpg"
        imageAlt="Artisan hand-tooling leather on the Meridian production floor"
      />

      {/* Process */}
      <Section background="soft">
        <SectionHeading
          eyebrow="The process"
          title="Five gates, fully managed"
          lead="Consistent, transparent, and traceable — you always know which stage your order is at and what happens next."
        />
        <Stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {manufacturingProcess.map((step) => (
            <StaggerItem key={step.step} className="h-full">
              <div className="card flex h-full flex-col p-7">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-tint text-gold">
                    <step.icon width={24} height={24} />
                  </span>
                  <span className="tnum font-display text-3xl text-border-strong">
                    {step.step}
                  </span>
                </div>
                <h3 className="mt-6 text-lg text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.blurb}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Capacity */}
      <Section background="default">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Photo
              src="/photos/textile-mill.jpg"
              alt="Fabric being produced on a Meridian textile line"
              duotone
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="aspect-[4/3] rounded-brand"
            />
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Capacity"
              title="Scale without losing the craft"
              lead="From 100-unit sampling runs to bulk programs, our floors flex to your volume — without handing your product to a stranger."
            />
            <Reveal delay={120} className="mt-10">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-10">
                {capacity.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd>
                      <CountUp value={s.value} className="display block text-4xl text-ink sm:text-5xl" />
                      <span className="mt-2 block text-sm font-medium text-muted">{s.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Quality */}
      <Section background="sand">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Quality & compliance"
              title="Nothing ships until it passes"
              lead="Quality isn't a final step — it's a gate at every stage, backed by traceability and independent standards."
            />
            <Reveal delay={160} className="mt-8">
              <ul className="flex flex-wrap gap-x-8 gap-y-3">
                {certifications.map((c) => (
                  <li
                    key={c}
                    className="text-sm font-semibold uppercase tracking-[0.12em] text-ink-soft/70"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Stagger className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
            {quality.map((q) => (
              <StaggerItem key={q}>
                <div className="flex items-start gap-3 rounded-brand border border-border bg-bg p-5">
                  <CheckIcon width={18} height={18} className="mt-0.5 shrink-0 text-gold" />
                  <span className="text-sm font-medium text-ink-soft">{q}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <CTABand
        title="Ready to see a sample?"
        lead="Send your design and we'll build a production-ready sample — the fastest way to judge our craft for yourself."
        primaryLabel="Request a sample"
        secondaryLabel="What we make"
        secondaryHref="/industries"
      />
    </>
  );
}
