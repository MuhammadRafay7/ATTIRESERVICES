import Link from "next/link";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { Stat } from "@/components/Stat";
import { Photo } from "@/components/Photo";
import { ProductPlate } from "@/components/ProductPlate";
import { Faq } from "@/components/Faq";
import { CTABand } from "@/components/CTABand";
import { SectionNav } from "@/components/SectionNav";
import { ExecutiveSummary } from "@/components/ExecutiveSummary";
import { RouteMap } from "@/components/RouteMap";
import { SpecTable, DataTable } from "@/components/SpecTable";
import { ArrowIcon, CheckIcon } from "@/components/icons";
import { site, stats, credentials, commercialTerms, marketRegions } from "@/lib/site";
import {
  divisions,
  productCategories,
  whyOstenmark,
  heroFacts,
  pillars,
  manufacturingProcess,
  faqs,
} from "@/lib/content";

const pageSections = [
  { id: "summary", label: "Summary" },
  { id: "divisions", label: "Divisions" },
  { id: "models", label: "Engagement models" },
  { id: "portfolio", label: "Portfolio" },
  { id: "record", label: "Operating record" },
  { id: "workflow", label: "Workflow" },
  { id: "footprint", label: "Footprint" },
  { id: "certification", label: "Certification" },
  { id: "faq", label: "FAQ" },
];

export default function Home() {
  return (
    <>
      {/* 01 — Masthead */}
      <section className="relative overflow-hidden border-b border-line bg-bg-subtle">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-70" />

        <div className="container-x relative pb-0 pt-14 sm:pt-20">
          <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Statement */}
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow">Est. {site.founded} · Rotterdam</p>
              </Reveal>
              <Reveal delay={60}>
                <h1 className="display display-xl mt-7 text-ink">
                  Global Commerce in High-Quality Garments and Leather.
                </h1>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={120}>
                <p className="max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
                  Three divisions under one contracting entity: garment
                  manufacturing across 30 lines, leather goods and footwear
                  across 19, and an import &amp; export arm that sources the
                  materials and clears the finished goods into 120+ markets.
                </p>
              </Reveal>
              <Reveal delay={180}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button href="/contact" variant="primary">
                    Request a quotation
                    <ArrowIcon
                      width={16}
                      height={16}
                      className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
                    />
                  </Button>
                  <Button href="/services" variant="outline">
                    Our divisions
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Division triptych — all three visible before any scrolling */}
          <Stagger className="mt-14 grid gap-4 sm:grid-cols-3" delayChildren={0.15}>
            {divisions.map((d, i) => (
              <StaggerItem key={d.key}>
                <figure>
                  <Photo
                    src={d.image}
                    alt={d.imageAlt}
                    priority={i === 0}
                    sizes="(max-width: 640px) 90vw, 30vw"
                    className="aspect-4/3 rounded-brand border border-line"
                  />
                  <figcaption className="mt-3 flex items-baseline justify-between gap-3 border-t border-line pt-3">
                    <span className="label-mono text-ink">{d.title}</span>
                    <span className="label-mono text-ink-faint">{d.code}</span>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Fact strip */}
          <Reveal delay={220}>
            <dl className="mt-14 grid grid-cols-2 border-t border-line sm:grid-cols-4">
              {heroFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="border-b border-line py-6 sm:border-b-0 sm:border-r sm:px-8 sm:first:pl-0 sm:last:border-r-0"
                >
                  <dt className="label-mono">{fact.label}</dt>
                  <dd className="figure mt-2.5 text-3xl sm:text-[2rem]">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* In-page index — sticks for the remainder of the document */}
      <SectionNav sections={pageSections} />

      {/* 02 — Executive summary (the 60-second read) */}
      <ExecutiveSummary />

      {/* 03 — Credential strip */}
      <section className="border-b border-line bg-bg py-7">
        <div className="container-x flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-10">
          <p className="label-mono shrink-0 text-ink-faint">
            Certified and audited to
          </p>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-2.5">
            {credentials.map((c) => (
              <li
                key={c.code}
                className="font-mono text-xs tracking-[0.06em] text-ink-muted"
              >
                {c.code}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 04 — The three divisions, given equal weight */}
      <Section id="divisions" background="default" divider={false}>
        <SectionHeading
          eyebrow="Divisions"
          index="§ 01"
          title="Three divisions, one contracting entity"
          lead="Ostenmark makes garments, makes leather goods, and trades. Each division stands on its own — and any combination of them can sit under a single purchase order."
        />

        <Stagger className="mt-14 grid gap-px border-y border-line bg-line lg:grid-cols-3">
          {divisions.map((d) => (
            <StaggerItem key={d.key} className="bg-bg">
              <article className="flex h-full flex-col">
                <Photo
                  src={d.image}
                  alt={d.imageAlt}
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="aspect-16/10 w-full"
                />
                <div className="flex flex-1 flex-col p-8 lg:p-9">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center border border-line text-accent">
                      <d.icon width={22} height={22} />
                    </span>
                    <span className="label-mono text-ink-faint">{d.code}</span>
                  </div>

                  <h3 className="mt-7 text-xl font-medium tracking-[-0.02em] text-ink">
                    {d.title}
                  </h3>
                  <p className="mt-3.5 text-sm leading-relaxed text-ink-muted">
                    {d.blurb}
                  </p>

                  <dl className="mt-7 flex gap-8 border-t border-line pt-6">
                    {d.facts.map((f) => (
                      <div key={f.label}>
                        <dt className="label-mono">{f.label}</dt>
                        <dd className="figure mt-2 text-2xl">{f.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <ul className="mt-6 flex-1 space-y-2.5 border-t border-line pt-6">
                    {d.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <CheckIcon
                          width={15}
                          height={15}
                          className="mt-1 shrink-0 text-accent"
                        />
                        <span className="text-sm text-ink-body">{point}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="label-mono mt-6 border-t border-line pt-5 text-ink-faint">
                    {d.caption}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={140} className="mt-10">
          <Button href="/services" variant="outline">
            Full capability schedule
            <ArrowIcon width={15} height={15} />
          </Button>
        </Reveal>
      </Section>

      {/* 05 — Engagement models */}
      <Section id="models" background="subtle">
        <SectionHeading
          eyebrow="Engagement models"
          index="§ 02"
          title="Three ways to contract with us"
          lead="Most enquiries resolve to one of three arrangements. The difference is who nominates the materials and who carries the quality liability — the rest is scheduling."
        />
        <Stagger className="mt-14 grid gap-px border-y border-line bg-line lg:grid-cols-3">
          {pillars.map((pillar) => (
            <StaggerItem key={pillar.title} className="bg-bg">
              <div className="flex h-full flex-col p-8 lg:p-10">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center border border-line text-accent">
                    <pillar.icon width={22} height={22} />
                  </span>
                  <span className="label-mono text-ink-faint">{pillar.code}</span>
                </div>
                <h3 className="mt-7 text-xl font-medium tracking-[-0.02em] text-ink">
                  {pillar.title}
                </h3>
                <p className="mt-3.5 flex-1 text-sm leading-relaxed text-ink-muted">
                  {pillar.blurb}
                </p>
                <ul className="mt-7 space-y-2.5 border-t border-line pt-6">
                  {pillar.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
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
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* 06 — Portfolio preview */}
      <Section id="portfolio" background="default">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Product portfolio"
            index="§ 03"
            title="What the floors produce"
            lead="Twelve categories in continuous production across the three divisions, each with a defined minimum order and lead time."
          />
          <Reveal>
            <Link
              href="/industries"
              className="link-underline inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium text-ink"
            >
              Full portfolio <ArrowIcon width={15} height={15} />
            </Link>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {productCategories.slice(0, 4).map((cat) => (
            <StaggerItem key={cat.title} className="bg-bg">
              <Link href="/industries" className="group flex h-full flex-col">
                {cat.image ? (
                  <Photo
                    src={cat.image}
                    alt={cat.title}
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="aspect-4/3 w-full"
                    imageClassName="transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                ) : (
                  <ProductPlate
                    plate={cat.plate ?? "fabric"}
                    label={cat.code}
                    className="aspect-4/3 w-full"
                  />
                )}
                <div className="flex flex-1 flex-col p-6">
                  <span className="label-mono text-ink-faint">{cat.code}</span>
                  <h3 className="mt-2.5 text-base font-medium tracking-[-0.015em] text-ink">
                    {cat.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                    {cat.blurb}
                  </p>
                  <p className="label-mono mt-5 border-t border-line pt-4 text-ink-faint">
                    {cat.detail}
                  </p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* 06 — Operating figures + commercial terms */}
      <Section id="record" background="default">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Operating record"
              index="§ 04"
              title="The figures, qualified"
              lead="Performance data for the trailing twelve months, measured against confirmed commitments rather than internal targets."
            />
            <Reveal delay={80}>
              <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10">
                {stats.map((s) => (
                  <Stat
                    key={s.label}
                    value={s.value}
                    label={s.label}
                    note={s.note}
                  />
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={120}>
              <p className="eyebrow">Standard commercial terms</p>
              <SpecTable className="mt-6" rows={commercialTerms} />
              <p className="mt-6 text-xs leading-relaxed text-ink-faint">
                Terms shown are standard and are confirmed per programme. Volume
                tiering, consignment stock and extended payment terms are
                available subject to credit review.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 07 — Production workflow */}
      <Section id="workflow" background="subtle">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Production workflow"
              index="§ 05"
              title="Six stages, each with an owner"
              lead="Every order follows the same sequence. Bulk does not begin until the pre-production sample is approved in writing."
            />
            <Reveal delay={100} className="mt-9">
              <Button href="/manufacturing" variant="outline">
                Full production protocol
                <ArrowIcon width={15} height={15} />
              </Button>
            </Reveal>
            <Reveal delay={140} className="mt-10">
              <Photo
                src="/photos/loom-detail.jpg"
                alt="Warp threads running through a loom on an Ostenmark textile line"
                sizes="(max-width: 1024px) 90vw, 30vw"
                className="aspect-4/5 rounded-brand border border-line"
              />
              <p className="label-mono mt-3 text-ink-faint">
                Fig. 02 — Warp feed, İzmir
              </p>
            </Reveal>
          </div>

          <Reveal delay={80} className="lg:col-span-8">
            <ol className="border-t border-line">
              {manufacturingProcess.map((step) => (
                <li
                  key={step.step}
                  className="grid gap-x-6 gap-y-2 border-b border-line py-6 sm:grid-cols-[3rem_1fr_9rem]"
                >
                  <span className="label-mono pt-1 text-accent">{step.step}</span>
                  <div>
                    <h3 className="text-base font-medium tracking-[-0.015em] text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted">
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
        </div>
      </Section>

      {/* 08 — Differentiators */}
      <Section id="why" background="default">
        <SectionHeading
          eyebrow="Why Ostenmark"
          index="§ 06"
          title="What separates an owned floor from an agent"
          lead="The distinction is not craft language. It is who you hold a contract with when a lot fails inspection three weeks before a launch."
        />
        <Stagger className="mt-14 grid gap-x-12 gap-y-10 border-t border-line pt-10 sm:grid-cols-2">
          {whyOstenmark.map((value, i) => (
            <StaggerItem key={value.title} className="flex gap-5">
              <span className="label-mono pt-1 text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-lg font-medium tracking-[-0.02em] text-ink">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {value.blurb}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* 09 — Network */}
      <Section id="footprint" background="deep">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Footprint"
              index="§ 07"
              onDeep
              title="Production close to material, distribution close to market"
              lead="Four production sites and two commercial offices, exporting to more than 120 markets under EXW, FOB, CIF and DDP."
            />
            <Reveal delay={100} className="mt-10">
              <SpecTable
                onDeep
                dense
                rows={marketRegions.map((m) => ({
                  term: m.region,
                  value: m.detail,
                }))}
              />
            </Reveal>
          </div>

          <Reveal delay={80} className="lg:col-span-7">
            <RouteMap showLabels className="w-full text-on-deep-muted/50" />
            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/12 pt-5">
              <span className="flex items-center gap-2.5 text-xs text-on-deep-muted">
                <span className="h-2 w-2 bg-accent-soft" />
                Production site
              </span>
              <span className="flex items-center gap-2.5 text-xs text-on-deep-muted">
                <span className="h-2 w-2 border border-accent-soft" />
                Commercial office
              </span>
              <span className="flex items-center gap-2.5 text-xs text-on-deep-muted">
                <span className="h-px w-6 bg-accent-soft" />
                Primary export lane
              </span>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 10 — Certification register */}
      <Section id="certification" background="default">
        <SectionHeading
          eyebrow="Due diligence"
          index="§ 08"
          title="Certification register"
          lead="Current certificates are issued with the vendor onboarding pack on request. Unannounced audit access to any Ostenmark site is written into our standard terms."
        />
        <Reveal delay={80} className="mt-12">
          <DataTable
            caption="Ostenmark certification register"
            columns={["Standard", "Scope", "Certification body", "Valid to"]}
            rows={credentials.map((c) => [c.code, c.scope, c.body, c.valid])}
          />
        </Reveal>
      </Section>

      {/* 11 — Client reference */}
      <Section id="reference" background="subtle">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Photo
              src="/photos/leather-bag.jpg"
              alt="Full-grain leather satchel from a private-label programme"
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="aspect-5/4 rounded-brand border border-line"
            />
          </Reveal>
          <Reveal delay={80} className="lg:col-span-7">
            <p className="eyebrow">Client reference</p>
            <blockquote className="mt-7">
              <p className="display display-md text-ink">
                &ldquo;We moved four categories to Ostenmark after an agent
                subcontracted a run without disclosure. Two years on, the
                material declarations reconcile, the audit access is real, and
                we have one counterparty instead of nine.&rdquo;
              </p>
            </blockquote>
            <footer className="mt-9 flex items-center gap-4 border-t border-line pt-6">
              <span className="inline-flex h-11 w-11 items-center justify-center border border-line font-mono text-sm text-ink">
                EA
              </span>
              <span>
                <span className="block text-sm font-medium text-ink">
                  Elena Almeida
                </span>
                <span className="block text-sm text-ink-muted">
                  Group Sourcing Director, Northwind Leather Co.
                </span>
              </span>
            </footer>
          </Reveal>
        </div>
      </Section>

      {/* 12 — FAQ */}
      <Section id="faq" background="default">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Enquiries"
              index="§ 09"
              title="Questions raised before onboarding"
              lead="The points procurement teams raise most often during vendor qualification."
            />
          </div>
          <div className="lg:col-span-8">
            <Faq items={faqs} />
          </div>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
