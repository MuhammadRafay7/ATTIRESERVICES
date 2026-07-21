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
    "Founded in 2004, Meridian Global Trade is a leather and textile goods manufacturer — producing bags, footwear, apparel, and fabric to spec for brands across six continents.",
  alternates: { canonical: "/about" },
};

const aboutStats = [
  { value: "2004", label: "Founded" },
  { value: "6", label: "Production sites" },
  { value: "1,400+", label: "Skilled makers" },
  { value: "120+", label: "Countries shipped" },
];

const leadership = [
  { name: "Daniel Okonkwo", role: "Chief Executive Officer", initials: "DO" },
  { name: "Sofia Marchetti", role: "Head of Production", initials: "SM" },
  { name: "Raj Patel", role: "Head of Quality & Compliance", initials: "RP" },
  { name: "Mei Lin Chen", role: "Head of Sourcing", initials: "MC" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Twenty years at the cutting table"
        lead={`Since ${site.founded}, ${site.name} has grown from a single leather workshop into a multi-site manufacturer — but the promise hasn't changed: make it well, and stand behind every stitch.`}
        image="/photos/footwear.jpg"
        imageAlt="A master craftsman inspecting a handmade leather boot"
      />

      {/* Story */}
      <Section background="default">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
          <SectionHeading
            eyebrow="Our story"
            title="Makers, not middlemen"
          />
          <Reveal className="space-y-5 text-base leading-relaxed text-muted lg:pt-2">
            <p>
              Meridian began in 2004 as a small leather workshop with a stubborn
              belief: the companies that <em>make</em> the product should be the
              ones you can call. Too much of the industry hides behind brokers
              and agents who never touch the material.
            </p>
            <p>
              Two decades later we run our own leather and textile floors,
              producing bags, footwear, apparel, and fabric for brands on six
              continents — while sourcing specialist materials from a vetted
              network of mills and tanneries when a project calls for it.
            </p>
            <p>
              We&apos;re still makers first. Every order is cut, sewn, inspected,
              and shipped by people who put their name on the work — because ours
              travels with it.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-16">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-border pt-12 sm:grid-cols-4">
            {aboutStats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <CountUp value={s.value} className="display block text-4xl text-ink sm:text-5xl" />
                  <span className="mt-2.5 block text-sm font-medium text-muted">{s.label}</span>
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
          title="Values stitched into every run"
        />
        <Stagger className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {companyValues.map((value) => (
            <StaggerItem key={value.title} className="flex h-full flex-col">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-bg text-gold">
                <value.icon width={26} height={26} />
              </span>
              <h3 className="mt-6 text-xl text-ink">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{value.blurb}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Network */}
      <Section background="default">
        <SectionHeading
          eyebrow="Production & offices"
          title="Regional hubs, worldwide reach"
          lead="Our production sites and offices sit close to materials and markets alike — anchoring a network that spans every continent."
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
          title="The people accountable for your product"
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
        title="Let's make something together"
        lead="Whether you're launching a first collection or moving production to a partner who actually makes it, our team is ready."
        primaryLabel="Talk to us"
        secondaryLabel="How we make it"
        secondaryHref="/manufacturing"
      />
    </>
  );
}
