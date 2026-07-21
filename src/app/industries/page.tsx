import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { Photo } from "@/components/Photo";
import { CTABand } from "@/components/CTABand";
import { ShieldIcon, LeafIcon, ScissorsIcon, ArrowIcon } from "@/components/icons";
import { productCategories } from "@/lib/content";

export const metadata: Metadata = {
  title: "What We Make",
  description:
    "Leather goods, footwear, apparel, and textiles — Meridian Global Trade manufactures across every soft-goods category, from full-grain leather to finished fabric.",
  alternates: { canonical: "/industries" },
};

const materials = [
  {
    icon: LeafIcon,
    title: "Leather & hides",
    blurb:
      "Full-grain, top-grain, and suede from Leather Working Group tanneries — vegetable and chrome tanned, cut and graded to order.",
  },
  {
    icon: ScissorsIcon,
    title: "Woven & knit textiles",
    blurb:
      "Cotton, linen, wool, and technical blends — OEKO-TEX certified, dyed and finished to your weight and hand-feel.",
  },
  {
    icon: ShieldIcon,
    title: "Trims & hardware",
    blurb:
      "Zippers, buckles, thread, and branded hardware sourced and quality-matched to complete every product.",
  },
];

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="What we make"
        title="Every soft good, made to your spec"
        lead="Meridian's promise is breadth without compromise. Across leather and textiles, our floors and vetted partners produce the full range — finished to carry your brand."
        image="/photos/bags.jpg"
        imageAlt="A finished full-grain leather handbag"
      />

      {/* Category grid */}
      <Section background="soft">
        <SectionHeading
          eyebrow="Product categories"
          title="From cutting table to finished piece"
          lead="Eight core categories, each with dedicated craft and quality standards — and the flexibility to take on whatever falls in between."
        />
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {productCategories.map((cat) => (
            <StaggerItem key={cat.title}>
              <div className="card group flex h-full flex-col overflow-hidden">
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
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2.5">
                    <cat.icon width={20} height={20} className="text-gold" />
                    <h3 className="text-lg text-ink">{cat.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{cat.blurb}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Materials */}
      <Section background="default">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Materials"
              title="Great products start with great materials"
              lead="We stock core leathers and fabrics and source specialist materials from a vetted global network — all quality-tested before they hit the floor."
            />
          </div>
          <Stagger className="grid gap-5 sm:grid-cols-3 lg:col-span-8">
            {materials.map((item) => (
              <StaggerItem key={item.title}>
                <div className="card flex h-full flex-col p-7">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-tint text-gold">
                    <item.icon width={24} height={24} />
                  </span>
                  <h3 className="mt-6 text-lg text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.blurb}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal className="mt-10">
          <div className="flex items-start gap-4 rounded-brand border border-gold/30 bg-gold-tint/40 p-6">
            <ShieldIcon width={24} height={24} className="mt-0.5 shrink-0 text-gold" />
            <p className="text-sm leading-relaxed text-ink-soft">
              <span className="font-semibold text-ink">
                Responsible making, built in.
              </span>{" "}
              Every material is traceable and tested — Leather Working Group
              tanneries, OEKO-TEX textiles, and audited, ethical labor across
              every floor we run.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-10">
          <Link
            href="/manufacturing"
            className="link-underline inline-flex items-center gap-2 text-sm font-medium text-ink"
          >
            See how it&apos;s made <ArrowIcon width={16} height={16} />
          </Link>
        </Reveal>
      </Section>

      <CTABand
        title="Have a product in mind?"
        lead="From a single leather bag to a full apparel range, tell us what you want made and we'll scope it."
        secondaryLabel="Our services"
        secondaryHref="/services"
      />
    </>
  );
}
