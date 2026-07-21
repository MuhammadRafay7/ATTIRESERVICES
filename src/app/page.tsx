import Link from "next/link";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { TextReveal } from "@/components/TextReveal";
import { CountUp } from "@/components/CountUp";
import { Marquee } from "@/components/Marquee";
import { Magnetic } from "@/components/Magnetic";
import { RouteMap } from "@/components/RouteMap";
import { CTABand } from "@/components/CTABand";
import { ArrowIcon, CheckIcon } from "@/components/icons";
import { site, stats, partners, tradeLanes } from "@/lib/site";
import {
  services,
  featuredServiceSlugs,
  industries,
  whyMeridian,
  heroCapabilities,
  pillars,
} from "@/lib/content";

const featuredServices = featuredServiceSlugs
  .map((slug) => services.find((s) => s.slug === slug))
  .filter((s): s is (typeof services)[number] => Boolean(s));

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-gradient-to-b from-bg-soft to-bg">
        <div className="mesh" />
        <div className="grid-lines pointer-events-none absolute inset-0" />
        <RouteMap className="pointer-events-none absolute -right-[14%] top-1/2 hidden w-[70%] -translate-y-1/2 text-ink/[0.09] lg:block" />

        <div className="container-x relative w-full pb-16 pt-32 sm:pt-40">
          <div className="max-w-3xl">
            <Reveal delay={100}>
              <p className="eyebrow">
                Manufacturing &amp; global trade · Est. {site.founded}
              </p>
            </Reveal>

            <TextReveal
              as="h1"
              className="display display-xl mt-7 text-ink"
              delay={0.15}
              segments={[
                { text: "We manufacture" },
                { text: "the world's goods.", accent: true },
              ]}
            />

            <Reveal delay={550}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
                From first sample to full production run, {site.name} makes and
                fulfills your orders to spec. Need a maker instead? We connect you
                with vetted factories worldwide — then handle the import, export,
                and delivery, end to end.
              </p>
            </Reveal>

            <Reveal delay={680}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Magnetic>
                  <Button href="/contact" variant="primary">
                    Get a quote
                    <ArrowIcon
                      width={18}
                      height={18}
                      className="transition-transform duration-300 group-hover/btn:translate-x-1"
                    />
                  </Button>
                </Magnetic>
                <Button href="/services" variant="outline">
                  Our services
                </Button>
              </div>
            </Reveal>

            {/* Manufacturing-led capabilities */}
            <Stagger
              className="mt-14 flex flex-wrap gap-x-8 gap-y-4"
              delayChildren={0.8}
            >
              {heroCapabilities.map((cap) => (
                <StaggerItem
                  key={cap.label}
                  className="flex items-center gap-2.5 text-ink-soft"
                >
                  <cap.icon width={22} height={22} className="text-gold" />
                  <span className="text-sm font-medium tracking-wide">
                    {cap.label}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* Trust stats */}
          <Reveal delay={200}>
            <dl className="mt-20 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-10 border-t border-border pt-10 sm:grid-cols-4">
              {stats.map((s) => (
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
        </div>
      </section>

      {/* 2. Trade-lane marquee */}
      <section className="border-y border-border bg-bg-soft py-6">
        <div className="flex items-center gap-6">
          <span className="hidden shrink-0 pl-6 text-xs font-semibold uppercase tracking-[0.2em] text-gold sm:block">
            Live lanes
          </span>
          <Marquee duration={38} className="flex-1">
            {[...tradeLanes, ...partners].map((item, i) => (
              <span
                key={i}
                className="mx-8 flex items-center gap-8 text-sm font-medium text-muted"
              >
                {item}
                <span className="h-1 w-1 rounded-full bg-gold/60" />
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* 3. Three pillars — the business model */}
      <Section background="default">
        <SectionHeading
          eyebrow="What we do"
          title="Three ways we get your goods made and moved"
          lead="Whether you need something built, a manufacturer to build it, or the logistics to ship it — Meridian is the single partner across all three."
        />
        <Stagger className="mt-16 grid gap-5 lg:grid-cols-3">
          {pillars.map((pillar, i) => {
            const featured = i === 0;
            return (
            <StaggerItem key={pillar.title}>
              <div
                className={`card flex h-full flex-col p-8 sm:p-9 ${
                  featured ? "border-gold/40 bg-gold-tint/30 shadow-[0_26px_60px_-34px_rgba(176,128,58,0.55)]" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex h-14 w-14 items-center justify-center rounded-full text-gold ${
                      featured ? "bg-gold text-white" : "bg-gold-tint"
                    }`}
                  >
                    <pillar.icon width={28} height={28} />
                  </span>
                  {featured ? (
                    <span className="rounded-full border border-gold/40 bg-bg px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                      What we&apos;re built on
                    </span>
                  ) : (
                    <span className="tnum font-display text-3xl text-border-strong">
                      0{i + 1}
                    </span>
                  )}
                </div>
                <h3 className="mt-6 text-2xl text-ink">{pillar.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {pillar.blurb}
                </p>
                <ul className="mt-6 space-y-2.5 border-t border-border pt-6">
                  {pillar.points.map((point) => (
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
              </div>
            </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      {/* 4. Services — editorial numbered list */}
      <Section background="soft">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Services"
            title="The full operational toolkit"
            lead="Beneath the three pillars sits a complete set of services — from production and freight to customs, warehousing, and supply-chain management."
          />
          <Reveal>
            <Link
              href="/services"
              className="link-underline inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium text-gold"
            >
              All services <ArrowIcon width={16} height={16} />
            </Link>
          </Reveal>
        </div>

        <Stagger className="mt-16 border-t border-border">
          {featuredServices.map((service, i) => (
            <StaggerItem key={service.slug}>
              <Link
                href="/services"
                className="group grid grid-cols-1 items-center gap-4 border-b border-border px-4 py-8 transition-colors hover:bg-bg sm:grid-cols-12 sm:gap-8"
              >
                <span className="tnum font-display text-2xl text-gold sm:col-span-1">
                  0{i + 1}
                </span>
                <span className="flex items-center gap-4 sm:col-span-4">
                  <service.icon
                    width={26}
                    height={26}
                    className="text-muted transition-colors group-hover:text-gold"
                  />
                  <h3 className="text-2xl text-ink">{service.title}</h3>
                </span>
                <p className="text-sm leading-relaxed text-muted sm:col-span-6">
                  {service.summary}
                </p>
                <ArrowIcon
                  width={22}
                  height={22}
                  className="hidden text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold sm:col-span-1 sm:ml-auto sm:block"
                />
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* 4. Industries */}
      <Section background="soft">
        <SectionHeading
          eyebrow="Everything, everywhere"
          title="If it can be traded, we move it"
          lead="From perishables to heavy machinery, our teams handle the full breadth of global goods — each with its own compliance, handling, and routing needs."
        />
        <Stagger className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry) => (
            <StaggerItem key={industry.title}>
              <div className="card flex h-full items-start gap-4 p-6">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-tint text-gold">
                  <industry.icon width={22} height={22} />
                </span>
                <div>
                  <h3 className="text-base text-ink">{industry.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {industry.blurb}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-10">
          <Link
            href="/industries"
            className="link-underline inline-flex items-center gap-2 text-sm font-medium text-ink"
          >
            Explore all industries <ArrowIcon width={16} height={16} />
          </Link>
        </Reveal>
      </Section>

      {/* 5. Global presence — the signature map moment */}
      <Section background="default">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Global presence"
              title="A production network that never sleeps"
              lead="Regional manufacturing partners and hundreds of ports keep your goods being made and moving across every time zone — with local expertise wherever your products come from."
            />
            <Reveal className="mt-12">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-10">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd>
                      <CountUp
                        value={s.value}
                        className="display block text-4xl text-ink sm:text-5xl"
                      />
                      <span className="mt-2 block text-sm font-medium text-muted">
                        {s.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
          <Reveal delay={120} className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-brand border border-border bg-bg-soft p-4 sm:p-8">
              <div className="grid-lines pointer-events-none absolute inset-0" />
              <RouteMap showLabels className="relative w-full text-ink/15" />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 6. Why Meridian */}
      <Section background="soft">
        <SectionHeading
          eyebrow="Why Meridian"
          title="The advantages that compound"
          lead="Global trade is unforgiving of weak links. These are the reasons shippers consolidate their business with us."
        />
        <Stagger className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {whyMeridian.map((value) => (
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

      {/* 7. Testimonial */}
      <Section background="sand">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="eyebrow eyebrow--center mx-auto justify-center">
            Client story
          </p>
          <blockquote className="mt-10">
            <p className="display display-md text-ink">
              &ldquo;Meridian manufactured our new product line to spec, sourced
              the components we didn&apos;t make in-house, and shipped the finished
              goods to fourteen markets. One partner, from the factory floor to
              our shelves.&rdquo;
            </p>
          </blockquote>
          <footer className="mt-10 flex items-center justify-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-tint font-display text-lg text-gold">
              EA
            </span>
            <span className="text-left">
              <span className="block text-sm font-semibold text-ink">
                Elena Almeida
              </span>
              <span className="block text-sm text-muted">
                Head of Product, Northwind Consumer Brands
              </span>
            </span>
          </footer>
        </Reveal>
      </Section>

      {/* 8. CTA */}
      <CTABand />
    </>
  );
}
