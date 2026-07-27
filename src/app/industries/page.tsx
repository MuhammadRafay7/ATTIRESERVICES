import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { Photo } from "@/components/Photo";
import { ProductPlate } from "@/components/ProductPlate";
import { DataTable, SpecTable } from "@/components/SpecTable";
import { CTABand } from "@/components/CTABand";
import { SectionNav } from "@/components/SectionNav";
import { ArrowIcon, ShieldIcon } from "@/components/icons";
import { productCategories } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Product Portfolio",
  description:
    "Ostenmark's product portfolio across leather goods, footwear, apparel, textiles, workwear, upholstery, finished leather and components — with minimum orders and material standards stated.",
  path: "/industries",
});

const materialStandards = [
  {
    material: "Leather and hides",
    grades: "Full-grain, top-grain, split, suede",
    standard: "LWG Gold tanneries",
    testing: "Tensile, tear, rub, chrome VI",
  },
  {
    material: "Woven textiles",
    grades: "Cotton, linen, wool, technical blends",
    standard: "OEKO-TEX 100 · GOTS 7.0",
    testing: "Seam slippage, shrinkage, shade",
  },
  {
    material: "Knit textiles",
    grades: "Single jersey, interlock, rib, fleece",
    standard: "OEKO-TEX 100",
    testing: "Pilling, spirality, colourfastness",
  },
  {
    material: "Trims and hardware",
    grades: "Zips, buckles, rivets, branded furniture",
    standard: "Nickel release EN 1811",
    testing: "Pull, corrosion, cycle testing",
  },
  {
    material: "Insulation and lining",
    grades: "Down, synthetic loft, bemberg, mesh",
    standard: "RDS certified down",
    testing: "Fill power, migration, wash",
  },
];

const constraints = [
  { term: "Restricted substances", value: "REACH SVHC, CPSIA and Prop 65 screened" },
  { term: "Animal-derived inputs", value: "CITES checked; exotic skins not handled" },
  { term: "Country of origin", value: "Declared per line item on the packing list" },
  { term: "Recycled content", value: "GRS-certified inputs available on request" },
];

const pageSections = [
  { id: "categories", label: "Categories" },
  { id: "materials", label: "Material standards" },
  { id: "compliance", label: "Compliance" },
];

export default function PortfolioPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: "Product Portfolio", href: "/industries" }])} />

      <PageHero
        eyebrow="Portfolio"
        title="Product portfolio and material standards"
        lead="Twelve categories across garment, leather and traded goods. Each entry states its minimum order and the standard its materials are held to — the two facts that determine whether a programme is viable."
        facts={[
          { value: "12", label: "Categories" },
          { value: "150", label: "Lowest MOQ (units)" },
          { value: "220+", label: "Qualified vendors" },
          { value: "7 yr", label: "Traceability retained" },
        ]}
        image="/photos/leather-line.jpg"
        imageAlt="Finished leather goods stacked on the production floor"
      />

      <SectionNav sections={pageSections} />

      {/* Category schedule */}
      <Section id="categories" background="default" divider={false}>
        <SectionHeading
          eyebrow="Categories"
          index="§ 01"
          title="Production categories"
          lead="Minimum orders are stated per style and colourway. Lower quantities are accepted for sampling and for first runs where a scaling commitment is agreed."
        />
        <Stagger className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {productCategories.map((cat) => (
            <StaggerItem key={cat.title} className="bg-bg">
              <div className="flex h-full flex-col">
                {cat.image ? (
                  <Photo
                    src={cat.image}
                    alt={cat.title}
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="aspect-4/3 w-full"
                  />
                ) : (
                  <ProductPlate
                    plate={cat.plate ?? "fabric"}
                    label={cat.code}
                    className="aspect-4/3 w-full"
                  />
                )}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between">
                    <span className="label-mono text-ink-faint">{cat.code}</span>
                    <cat.icon width={17} height={17} className="text-accent" />
                  </div>
                  <h2 className="mt-3 text-base font-medium tracking-[-0.015em] text-ink">
                    {cat.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                    {cat.blurb}
                  </p>
                  <p className="label-mono mt-5 border-t border-line pt-4 text-ink-faint">
                    {cat.detail}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Material standards */}
      <Section id="materials" background="subtle">
        <SectionHeading
          eyebrow="Materials"
          index="§ 02"
          title="Material standards and testing"
          lead="Every input is qualified against a named standard and physically tested before it reaches a production line, whether we source it or you nominate it."
        />
        <Reveal delay={80} className="mt-12">
          <DataTable
            caption="Material standards and testing regime"
            columns={["Material", "Grades handled", "Standard", "Testing applied"]}
            rows={materialStandards.map((m) => [
              m.material,
              m.grades,
              m.standard,
              m.testing,
            ])}
          />
        </Reveal>
      </Section>

      {/* Constraints */}
      <Section id="compliance" background="default">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Compliance"
              index="§ 03"
              title="Declared constraints"
              lead="What we screen for, what we decline, and what is declared on your documentation. Stated up front because it is cheaper to know now."
            />
            <Reveal delay={120} className="mt-9">
              <div className="flex items-start gap-4 rounded-brand border border-line bg-bg-subtle p-6">
                <ShieldIcon
                  width={20}
                  height={20}
                  className="mt-0.5 shrink-0 text-accent"
                />
                <p className="text-sm leading-relaxed text-ink-body">
                  <span className="font-medium text-ink">
                    Exotic skins are not handled.
                  </span>{" "}
                  Ostenmark does not process CITES Appendix I or II hides in any
                  category, and will not broker them through the managed vendor
                  network.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={80} className="lg:col-span-7">
            <SpecTable rows={constraints} />
            <Link
              href="/manufacturing"
              className="link-underline mt-9 inline-flex items-center gap-2 text-sm font-medium text-ink"
            >
              Quality and inspection protocol <ArrowIcon width={15} height={15} />
            </Link>
          </Reveal>
        </div>
      </Section>

      <CTABand
        title="Qualify a category"
        lead="Tell us the category, the indicative volume and the destination markets. We confirm feasibility, minimum order and lead time against the current production schedule."
        secondaryLabel="Capability schedule"
        secondaryHref="/services"
      />
    </>
  );
}
