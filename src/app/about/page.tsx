import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { CountUp } from "@/components/CountUp";
import { CTABand } from "@/components/CTABand";
import { PinIcon } from "@/components/icons";
import { site, offices } from "@/lib/site";
import { companyValues } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Founded in 2004, Meridian Global Trade connects buyers and sellers across six continents with a single, accountable trade network built on integrity and reliability.",
  alternates: { canonical: "/about" },
};

const aboutStats = [
  { value: "2004", label: "Founded" },
  { value: "18", label: "Global offices" },
  { value: "1,400+", label: "Team members" },
  { value: "120+", label: "Countries served" },
];

const leadership = [
  { name: "Daniel Okonkwo", role: "Chief Executive Officer", initials: "DO" },
  { name: "Sofia Marchetti", role: "Chief Operating Officer", initials: "SM" },
  { name: "Raj Patel", role: "VP, Customs & Compliance", initials: "RP" },
  { name: "Mei Lin Chen", role: "VP, Global Network", initials: "MC" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Twenty years of moving trust across borders"
        lead={`Since ${site.founded}, ${site.name} has grown from a single freight desk into a worldwide trade network — but the promise hasn't changed: move goods reliably, and be honest at every step.`}
      />

      {/* Story / mission */}
      <Section background="default">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
          <SectionHeading
            eyebrow="Our story"
            title="Built for a world that never stops trading"
          />
          <Reveal className="space-y-5 text-base leading-relaxed text-muted lg:pt-2">
            <p>
              Meridian began in 2004 with a simple frustration: global trade was
              too fragmented. Shippers juggled a broker here, a forwarder there,
              a warehouse somewhere else — and no one owned the outcome.
            </p>
            <p>
              We set out to be the single point of accountability across the
              whole journey — not just moving goods, but making them and sourcing
              them too. Today Meridian manufactures and fulfills orders, connects
              buyers with vetted manufacturers worldwide, and ships over a million
              TEUs a year across every major trade lane.
            </p>
            <p>
              That means one relationship from maker to market: produce it,
              source it, or move it — clearing customs in more than 120 countries
              and handling everything from perishables to project freight.
            </p>
            <p>
              Our mission is unchanged: make international trade feel local —
              simple, visible, and dependable — for every business that relies
              on it.
            </p>
          </Reveal>
        </div>

        {/* Stats row */}
        <Reveal className="mt-16">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-border pt-12 sm:grid-cols-4">
            {aboutStats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <CountUp
                    value={s.value}
                    className="display block text-4xl text-ink sm:text-5xl"
                  />
                  <span className="mt-2.5 block text-sm font-medium text-muted">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Section>

      {/* Values */}
      <Section background="soft">
        <SectionHeading
          eyebrow="What we stand for"
          title="Values that travel with every shipment"
        />
        <Stagger className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {companyValues.map((value) => (
            <StaggerItem key={value.title} className="flex h-full flex-col">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-border bg-bg text-gold">
                <value.icon width={26} height={26} />
              </span>
              <h3 className="mt-6 text-xl text-ink">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {value.blurb}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Global network / offices */}
      <Section background="default">
        <SectionHeading
          eyebrow="Global network"
          title="Regional hubs, worldwide reach"
          lead="Our people live in the markets they serve. These regional hubs anchor a partner network that spans every continent."
        />
        <Stagger className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {offices.map((office) => (
            <StaggerItem key={office.city}>
              <div className="card flex items-center gap-4 p-6">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-tint text-gold">
                  <PinIcon width={22} height={22} />
                </span>
                <div>
                  <h3 className="text-lg text-ink">{office.city}</h3>
                  <p className="text-sm text-muted">{office.region}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Leadership */}
      <Section background="soft">
        <SectionHeading
          eyebrow="Leadership"
          title="The people accountable for your cargo"
        />
        <Stagger className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {leadership.map((person) => (
            <StaggerItem key={person.name} className="flex flex-col items-start">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold-tint font-display text-xl text-gold">
                {person.initials}
              </span>
              <h3 className="mt-5 text-lg text-ink">{person.name}</h3>
              <p className="mt-1 text-sm text-muted">{person.role}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <CTABand
        title="Let's build something dependable"
        lead="Whether you're scaling into new markets or consolidating a tangled supply chain, our team is ready to help."
        primaryLabel="Talk to us"
        secondaryLabel="Our services"
        secondaryHref="/services"
      />
    </>
  );
}
