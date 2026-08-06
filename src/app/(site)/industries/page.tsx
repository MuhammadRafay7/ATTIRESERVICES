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
import { ArrowIcon, ShieldIcon } from "@/components/icons";
import { productCategories } from "@/lib/content";
import { getCollection, getCopy, getSettings } from "@/lib/cms";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Product Portfolio",
  description:
    "Attire Services product portfolio across apparel, knitwear, outerwear, denim, workwear, tailoring, fabric, home textiles and trims — with minimum orders and material standards stated.",
  path: "/industries",
});


export default async function PortfolioPage() {
  const copy = await getCopy("industries");
  const settings = await getSettings();
  // Editable under Pages → Portfolio in the admin.
  const materialStandards = await getCollection<{
    material: string;
    grades: string;
    standard: string;
    testing: string;
  }>("material_standards");
  const constraints = await getCollection<{ term: string; value: string }>(
    "compliance_constraints",
  );

  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: "Product Portfolio", href: "/industries" }])} />

      <PageHero
        {...copy("page-hero")}
        facts={[
          { value: "9", label: "Categories" },
          { value: "200", label: "Lowest MOQ (units)" },
          { value: "220+", label: "Qualified mills" },
          { value: "7 yr", label: "Traceability retained" },
        ]}
        image="/photos/apparel-hangers.jpg"
        imageAlt="Finished garments on hangers awaiting final inspection"
      />


      {/* Category schedule */}
      <Section id="categories" background="default" divider={false}>
        <SectionHeading {...copy("categories")} />
        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productCategories.map((cat) => (
            <StaggerItem key={cat.title}>
              <div className="card flex h-full flex-col overflow-hidden">
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
                  <h2 className="mt-3 font-display text-base font-semibold tracking-[-0.018em] text-ink">
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
        <SectionHeading {...copy("materials")} />
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
            <SectionHeading {...copy("compliance")} />
            <Reveal delay={120} className="mt-9">
              <div className="flex items-start gap-4 rounded-brand border border-line bg-bg-subtle p-6">
                <ShieldIcon
                  width={20}
                  height={20}
                  className="mt-0.5 shrink-0 text-accent"
                />
                <p className="text-sm leading-relaxed text-ink-body">
                  <span className="font-medium text-ink">
                    Origin is declared, never optimised.
                  </span>{" "}
                  Attire Services states the true country of origin on every line
                  item and will not transship to alter it — including where a
                  duty preference would otherwise apply.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={80} className="lg:col-span-7">
            <SpecTable rows={constraints} />
            <Link
              href="/manufacturing"
              className="link-underline mt-9 inline-flex items-center gap-2 text-sm font-medium text-accent"
            >
              Quality and inspection protocol <ArrowIcon width={15} height={15} />
            </Link>
          </Reveal>
        </div>
      </Section>

      <CTABand
        {...copy("cta")}
        responseSla={settings.responseSla}
        email={settings.contact.email}
        secondaryLabel="Capability schedule"
        secondaryHref="/services"
      />
    </>
  );
}
