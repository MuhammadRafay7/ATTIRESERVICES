import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { Photo } from "@/components/Photo";
import { ProductPlate } from "@/components/ProductPlate";
import { Faq } from "@/components/Faq";
import { CTABand } from "@/components/CTABand";
import { RouteMap } from "@/components/RouteMap";
import { Globe } from "@/components/Globe";
import { SpecTable } from "@/components/SpecTable";
import { ArrowIcon } from "@/components/icons";
import { resolveIcon } from "@/components/icons";
import { getCollection, getCopy, getSectionOrder, getSettings } from "@/lib/cms";
import { faqSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ path: "/" });

/** Used when the database has nothing to say about section order. */
const DEFAULT_SECTIONS = [
  "hero",
  "credential-strip",
  "divisions",
  "why",
  "portfolio",
  "footprint",
  "reference",
  "faq",
  "cta",
];

type Fact = { value: string; label: string };
type Credential = { code: string };
type Division = {
  key?: string;
  icon?: string;
  title: string;
  blurb: string;
  caption?: string;
  image?: string;
  imageAlt?: string;
  facts?: Fact[];
};
type WhyPoint = { icon?: string; title: string; blurb: string };
type Category = {
  code?: string;
  title: string;
  blurb: string;
  detail?: string;
  image?: string;
  plate?: string;
};
type Region = { region: string; detail: string };
type Faqs = { q: string; a: string };

/**
 * The homepage.
 *
 * Every block below is keyed by the section type the admin adds, hides and
 * reorders, and the page renders those blocks in the order the database gives.
 * Copy comes from the `page_copy` collection, so headings are editable too —
 * nothing on this page is written into the component.
 */
export default async function Home() {
  const [
    copy,
    order,
    settings,
    heroFacts,
    credentials,
    divisions,
    whyPoints,
    categories,
    regions,
    faqs,
  ] = await Promise.all([
    getCopy("home"),
    getSectionOrder("/", DEFAULT_SECTIONS),
    getSettings(),
    getCollection<Fact>("hero_facts"),
    getCollection<Credential>("credentials"),
    getCollection<Division>("divisions"),
    getCollection<WhyPoint>("why_points"),
    getCollection<Category>("product_categories"),
    getCollection<Region>("market_regions"),
    getCollection<Faqs>("faqs"),
  ]);

  const hero = copy("hero");
  const reference = copy("reference");
  const cta = copy("cta");

  const blocks: Record<string, React.ReactNode> = {
    /* Masthead. The chart is the thesis: this business moves cloth between
       ports, so the first thing on the page is the lanes it runs. Two real
       columns rather than a bleed, so the sphere is never clipped. */
    hero: (
      <section className="deep-field relative overflow-hidden text-on-deep">
        <div className="container-x relative py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="relative z-10 lg:col-span-7">
              {hero.eyebrow && (
                <Reveal>
                  <p className="eyebrow eyebrow--on-deep">{hero.eyebrow}</p>
                </Reveal>
              )}
              <Reveal delay={60}>
                <h1 className="display display-xl mt-6 text-on-deep">
                  {hero.title}
                </h1>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-on-deep-muted sm:text-lg">
                  {hero.lead}
                </p>
              </Reveal>
              <Reveal delay={180}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button href="/contact" variant="inverse">
                    Request a quotation
                    <ArrowIcon
                      width={16}
                      height={16}
                      className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
                    />
                  </Button>
                  <Button href="/services" variant="on-deep">
                    Trade services
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* Below lg the chart is pulled out of flow and sits behind the
                copy, so it costs no vertical space and nothing is clipped. */}
            <div className="pointer-events-none absolute right-0 top-1/2 w-[62%] max-w-[17rem] -translate-y-1/2 opacity-20 lg:pointer-events-auto lg:relative lg:top-auto lg:col-span-5 lg:w-full lg:max-w-none lg:translate-y-0 lg:opacity-100">
              <Globe className="aspect-square w-full" />
            </div>
          </div>

          <Reveal delay={240}>
            <dl className="mt-14 grid grid-cols-2 border-t border-white/12 sm:grid-cols-4 lg:mt-16">
              {heroFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="border-b border-white/12 py-6 sm:border-b-0 sm:border-r sm:border-white/12 sm:px-8 sm:first:pl-0 sm:last:border-r-0"
                >
                  <dd className="figure text-3xl text-on-deep sm:text-[2.125rem]">
                    {fact.value}
                  </dd>
                  <dt className="label-mono mt-2.5 text-on-deep-muted">
                    {fact.label}
                  </dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>
    ),

    "credential-strip": (
      <section className="border-b border-line bg-bg py-7">
        <div className="container-x flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-10">
          <p className="label-mono shrink-0 text-ink-faint">
            {copy("credential-strip").eyebrow}
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
    ),

    divisions: (
      <Section id="divisions" background="default" divider={false}>
        <SectionHeading {...copy("divisions")} />

        <Stagger className="mt-14 grid gap-6 lg:grid-cols-3">
          {divisions.map((d) => {
            const Icon = resolveIcon(d.icon, "ShipIcon");
            return (
              <StaggerItem key={d.title}>
                <article className="card flex h-full flex-col overflow-hidden">
                  {d.image && (
                    <Photo
                      src={d.image}
                      alt={d.imageAlt ?? ""}
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="aspect-16/10 w-full"
                    />
                  )}
                  <div className="flex flex-1 flex-col p-7 lg:p-8">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-brand-sm bg-accent-wash text-accent">
                        <Icon width={21} height={21} />
                      </span>
                      <span className="label-mono text-ink-faint">{d.caption}</span>
                    </div>

                    <h3 className="mt-6 font-display text-xl font-semibold tracking-[-0.022em] text-ink">
                      {d.title}
                    </h3>
                    <p className="mt-3.5 flex-1 text-sm leading-relaxed text-ink-muted">
                      {d.blurb}
                    </p>

                    {d.facts && d.facts.length > 0 && (
                      <dl className="mt-7 flex gap-8 border-t border-line pt-6">
                        {d.facts.map((f) => (
                          <div key={f.label}>
                            <dd className="figure text-2xl">{f.value}</dd>
                            <dt className="label-mono mt-1.5">{f.label}</dt>
                          </div>
                        ))}
                      </dl>
                    )}
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={140} className="mt-10">
          <Button href="/services" variant="outline">
            Full capability schedule
            <ArrowIcon width={15} height={15} />
          </Button>
        </Reveal>
      </Section>
    ),

    why: (
      <Section id="why" background="subtle">
        <SectionHeading {...copy("why")} />
        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2">
          {whyPoints.map((value) => {
            const Icon = resolveIcon(value.icon, "RouteIcon");
            return (
              <StaggerItem key={value.title}>
                <div className="card flex h-full gap-5 p-7 lg:p-8">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-brand-sm bg-accent-wash text-accent">
                    <Icon width={21} height={21} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-[-0.022em] text-ink">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                      {value.blurb}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>
    ),

    portfolio: (
      <Section id="portfolio" background="default">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading {...copy("portfolio")} />
          <Reveal>
            <Link
              href="/industries"
              className="link-underline inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium text-accent"
            >
              Full portfolio <ArrowIcon width={15} height={15} />
            </Link>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.slice(0, 4).map((cat) => (
            <StaggerItem key={cat.title}>
              <Link
                href="/industries"
                className="card group flex h-full flex-col overflow-hidden"
              >
                {cat.image ? (
                  <Photo
                    src={cat.image}
                    alt={cat.title}
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="aspect-4/3 w-full"
                    imageClassName="transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <ProductPlate
                    plate={
                      (cat.plate as "fabric" | undefined) ?? "fabric"
                    }
                    label={cat.code}
                    className="aspect-4/3 w-full"
                  />
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-base font-semibold tracking-[-0.018em] text-ink">
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
    ),

    footprint: (
      <Section id="footprint" background="deep">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading {...copy("footprint")} onDeep />
            <Reveal delay={100} className="mt-10">
              <SpecTable
                onDeep
                dense
                rows={regions.map((m) => ({ term: m.region, value: m.detail }))}
              />
            </Reveal>
          </div>

          <Reveal delay={80} className="lg:col-span-7">
            <RouteMap showLabels className="w-full text-on-deep" />
            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/12 pt-5">
              <span className="flex items-center gap-2.5 text-xs text-on-deep-muted">
                <span className="h-2 w-2 bg-brass-soft" />
                Production site
              </span>
              <span className="flex items-center gap-2.5 text-xs text-on-deep-muted">
                <span className="h-2 w-2 border border-brass-soft" />
                Sourcing or commercial office
              </span>
              <span className="flex items-center gap-2.5 text-xs text-on-deep-muted">
                <span className="h-px w-6 bg-brass-soft" />
                Primary export lane
              </span>
            </div>
          </Reveal>
        </div>
      </Section>
    ),

    reference: (
      <Section id="reference" background="default">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Photo
              src="/photos/trade-packing.jpg"
              alt="Retail-ready cartons being packed for export"
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="aspect-5/4 rounded-brand border border-line"
            />
          </Reveal>
          <Reveal delay={80} className="lg:col-span-7">
            <p className="eyebrow">{reference.eyebrow}</p>
            <blockquote className="mt-7">
              <p className="display display-md text-ink">{reference.title}</p>
            </blockquote>
            <footer className="mt-9 border-t border-line pt-6 text-sm text-ink-muted">
              {reference.lead}
            </footer>
          </Reveal>
        </div>
      </Section>
    ),

    faq: (
      <Section id="faq" background="subtle">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading {...copy("faq")} />
          </div>
          <div className="lg:col-span-8">
            <Faq items={faqs} />
          </div>
        </div>
      </Section>
    ),

    cta: (
      <CTABand
        eyebrow={cta.eyebrow}
        title={cta.title}
        lead={cta.lead}
        responseSla={settings.responseSla}
        email={settings.contact.email}
      />
    ),
  };

  return (
    <>
      <JsonLd schema={faqSchema(faqs)} />
      {order.map((type) => (
        <Fragment key={type}>{blocks[type] ?? null}</Fragment>
      ))}
    </>
  );
}
