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
import { Photo } from "@/components/Photo";
import { Faq } from "@/components/Faq";
import { CTABand } from "@/components/CTABand";
import { ArrowIcon, CheckIcon } from "@/components/icons";
import { site, stats, tradeLanes } from "@/lib/site";
import {
  productCategories,
  whyMeridian,
  heroCapabilities,
  pillars,
  manufacturingProcess,
  certifications,
  faqs,
} from "@/lib/content";

export default function Home() {
  return (
    <>
      {/* 1. Hero — split, image-driven */}
      <section className="relative overflow-hidden bg-gradient-to-b from-bg-soft to-bg">
        <div className="mesh" />
        <div className="grid-lines pointer-events-none absolute inset-0" />
        <div className="container-x relative grid items-center gap-12 pb-20 pt-32 sm:pt-40 lg:grid-cols-12 lg:gap-10 lg:pb-28">
          {/* Copy */}
          <div className="lg:col-span-6">
            <Reveal delay={100}>
              <p className="eyebrow">
                Textile &amp; leather manufacturing · Est. {site.founded}
              </p>
            </Reveal>
            <TextReveal
              as="h1"
              className="display display-xl mt-6 text-ink"
              delay={0.15}
              segments={[
                { text: "We craft leather &" },
                { text: "textile goods.", accent: true },
              ]}
            />
            <Reveal delay={520}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
                Meridian is a manufacturer of bags, footwear, apparel, and
                fabrics — made to your spec on our own floors. We source the
                materials, control the quality, and export the finished goods
                worldwide.
              </p>
            </Reveal>
            <Reveal delay={640}>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Magnetic>
                  <Button href="/contact" variant="primary">
                    Start a production run
                    <ArrowIcon
                      width={18}
                      height={18}
                      className="transition-transform duration-300 group-hover/btn:translate-x-1"
                    />
                  </Button>
                </Magnetic>
                <Button href="/manufacturing" variant="outline">
                  See how we make it
                </Button>
              </div>
            </Reveal>
            <Stagger className="mt-12 flex flex-wrap gap-x-7 gap-y-4" delayChildren={0.8}>
              {heroCapabilities.map((cap) => (
                <StaggerItem key={cap.label} className="flex items-center gap-2.5 text-ink-soft">
                  <cap.icon width={20} height={20} className="text-gold" />
                  <span className="text-sm font-medium tracking-wide">{cap.label}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* Image cluster */}
          <Reveal delay={200} className="lg:col-span-6">
            <div className="relative mx-auto max-w-md lg:mr-0 lg:max-w-none">
              <Photo
                src="/photos/hero.jpg"
                alt="Artisan hand-tooling a leather strap in the Meridian workshop"
                duotone
                priority
                sizes="(max-width: 1024px) 90vw, 48vw"
                className="aspect-[4/5] rounded-brand shadow-[0_40px_80px_-40px_rgba(11,27,43,0.5)]"
              />
              {/* overlapping product shot */}
              <div className="absolute -bottom-8 -left-6 hidden w-40 sm:block lg:-left-10 lg:w-48">
                <Photo
                  src="/photos/bags.jpg"
                  alt="Finished full-grain leather handbag"
                  sizes="200px"
                  className="aspect-square rounded-brand border-4 border-bg shadow-xl"
                />
              </div>
              {/* floating stat */}
              <div className="absolute -right-3 -top-5 rounded-brand border border-border bg-bg/95 px-5 py-4 shadow-lg backdrop-blur sm:-right-6">
                <CountUp value="12M+" className="display block text-2xl text-ink" />
                <span className="text-xs font-medium text-muted">units made / year</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Capability marquee */}
      <section className="border-y border-border bg-bg-soft py-6">
        <div className="flex items-center gap-6">
          <span className="hidden shrink-0 pl-6 text-xs font-semibold uppercase tracking-[0.2em] text-gold sm:block">
            Capabilities
          </span>
          <Marquee duration={40} className="flex-1">
            {[...tradeLanes, ...certifications].map((item, i) => (
              <span key={i} className="mx-7 flex items-center gap-7 text-sm font-medium text-muted">
                {item}
                <span className="h-1 w-1 rounded-full bg-gold/60" />
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* 3. Three pillars */}
      <Section background="default">
        <SectionHeading
          eyebrow="What we do"
          title="Made in-house, sourced smart, shipped worldwide"
          lead="We're a manufacturer first — but when you need a specific material or partner, we source it, and we handle the export either way."
        />
        <Stagger className="mt-16 grid gap-5 lg:grid-cols-3">
          {pillars.map((pillar, i) => {
            const featured = i === 0;
            return (
              <StaggerItem key={pillar.title}>
                <div
                  className={`card flex h-full flex-col p-8 sm:p-9 ${
                    featured
                      ? "border-gold/40 bg-gold-tint/30 shadow-[0_26px_60px_-34px_rgba(176,128,58,0.55)]"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex h-14 w-14 items-center justify-center rounded-full ${
                        featured ? "bg-gold text-white" : "bg-gold-tint text-gold"
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
                        <CheckIcon width={17} height={17} className="mt-0.5 shrink-0 text-gold" />
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

      {/* 4. What we make — product categories */}
      <Section background="soft">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="What we make"
            title="From full-grain leather to finished fabric"
            lead="Bags, footwear, apparel, and textiles — produced to your specification and finished to a standard that carries your brand."
          />
          <Reveal>
            <Link
              href="/industries"
              className="link-underline inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium text-ink"
            >
              All categories <ArrowIcon width={16} height={16} />
            </Link>
          </Reveal>
        </div>
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {productCategories.slice(0, 4).map((cat) => (
            <StaggerItem key={cat.title}>
              <Link
                href="/industries"
                className="card group block h-full overflow-hidden"
              >
                {cat.image ? (
                  <Photo
                    src={cat.image}
                    alt={cat.title}
                    duotone
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-bg-sand to-gold-tint/50">
                    <cat.icon width={40} height={40} className="text-gold" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2.5">
                    <cat.icon width={20} height={20} className="text-gold" />
                    <h3 className="text-lg text-ink">{cat.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{cat.blurb}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* 5. How we make it — process showcase with imagery */}
      <Section background="default">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="How we make it"
              title="A production line you can see into"
              lead="Every order runs the same disciplined path — from sample to export — with quality gates you can trace at each step."
            />
            <Reveal delay={120} className="mt-8">
              <Photo
                src="/photos/textile-mill.jpg"
                alt="Fabric being woven on a Meridian production line"
                duotone
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="aspect-[4/3] rounded-brand"
              />
            </Reveal>
            <Reveal delay={200} className="mt-8">
              <Button href="/manufacturing" variant="outline">
                Explore our process
                <ArrowIcon width={17} height={17} />
              </Button>
            </Reveal>
          </div>
          <Stagger className="lg:col-span-7 lg:pt-4">
            {manufacturingProcess.map((step, i) => (
              <StaggerItem key={step.step}>
                <div
                  className={`flex gap-5 py-6 ${
                    i < manufacturingProcess.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <span className="tnum font-display text-2xl text-gold">{step.step}</span>
                  <span className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-gold">
                    <step.icon width={22} height={22} />
                  </span>
                  <div>
                    <h3 className="text-xl text-ink">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.blurb}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* 6. Why Meridian */}
      <Section background="soft">
        <SectionHeading
          eyebrow="Why Meridian"
          title="The advantages of a real maker"
          lead="Plenty of firms broker production. Few own the floor. That difference shows up in your product."
        />
        <Stagger className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {whyMeridian.map((value) => (
            <StaggerItem key={value.title} className="flex h-full flex-col">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-border bg-bg text-gold">
                <value.icon width={26} height={26} />
              </span>
              <h3 className="mt-6 text-xl text-ink">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{value.blurb}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* 7. Proof band — stats + certifications */}
      <Section background="default">
        <Reveal>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {stats.map((s) => (
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
        <Reveal delay={120} className="mt-14 border-t border-border pt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Standards &amp; certifications
          </p>
          <ul className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3">
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
      </Section>

      {/* 8. Case study / testimonial */}
      <Section background="sand">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Photo
              src="/photos/bags.jpg"
              alt="A finished leather handbag from a Meridian private-label run"
              duotone
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="aspect-[5/4] rounded-brand"
            />
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Client story</p>
            <blockquote className="mt-6">
              <p className="display display-md text-ink">
                &ldquo;Meridian produced our entire leather accessories line to
                spec, sourced the hardware we couldn&apos;t, and shipped to
                fourteen markets — one partner, from cutting table to shelf.&rdquo;
              </p>
            </blockquote>
            <footer className="mt-8 flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-tint font-display text-lg text-gold">
                EA
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink">Elena Almeida</span>
                <span className="block text-sm text-muted">
                  Head of Product, Northwind Leather Co.
                </span>
              </span>
            </footer>
          </Reveal>
        </div>
      </Section>

      {/* 9. FAQ */}
      <Section background="default">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="FAQ"
              title="Questions, answered"
              lead="The things brands ask us most before their first run."
            />
          </div>
          <div className="lg:col-span-8">
            <Faq items={faqs} />
          </div>
        </div>
      </Section>

      {/* 10. CTA */}
      <CTABand />
    </>
  );
}
