import type { ComponentType, SVGProps } from "react";
import {
  ShipIcon,
  ShieldIcon,
  CogIcon,
  ShirtIcon,
  RouteIcon,
  EyeIcon,
  UsersIcon,
  GlobeIcon,
  LeafIcon,
  ScissorsIcon,
  SpoolIcon,
  BagIcon,
  ShoeIcon,
  HangerIcon,
  SofaIcon,
  SearchIcon,
} from "@/components/icons";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

/** Manufacturing-led capability signals under the hero. */
export const heroCapabilities: { icon: Icon; label: string }[] = [
  { icon: ScissorsIcon, label: "Cut & sewn to spec" },
  { icon: LeafIcon, label: "Full-grain leather" },
  { icon: ShieldIcon, label: "Quality inspected" },
  { icon: GlobeIcon, label: "Shipped worldwide" },
];

export type Pillar = {
  icon: Icon;
  title: string;
  blurb: string;
  points: string[];
};

/**
 * The three ways Meridian works — the core business model:
 * in-house manufacturing, sourcing/matchmaking, and export logistics.
 */
export const pillars: Pillar[] = [
  {
    icon: CogIcon,
    title: "Manufacture & Fulfill",
    blurb:
      "Our own leather and textile floors produce to your specification — from first sample to full production run, quality-controlled and ready to ship.",
    points: ["Made-to-spec production", "Prototyping & sampling", "In-line quality control"],
  },
  {
    icon: UsersIcon,
    title: "Source & Connect",
    blurb:
      "Need a specific mill, tannery, or trim? We connect you with vetted partners worldwide — matched on capability, price, and compliance, then managed for you.",
    points: ["Vetted mill & tannery network", "Material & price matching", "Managed on your behalf"],
  },
  {
    icon: GlobeIcon,
    title: "Export & Deliver",
    blurb:
      "Then we ship it. Customs, documentation, and freight across ocean and air — finished goods delivered to your markets with full trade compliance.",
    points: ["Export documentation", "Customs & compliance", "Ocean & air freight"],
  },
];

export type Service = {
  slug: string;
  icon: Icon;
  title: string;
  summary: string;
  points: string[];
};

/** Full service catalogue — textiles & leather manufacturing led. */
export const services: Service[] = [
  {
    slug: "leather-goods",
    icon: BagIcon,
    title: "Leather Goods Manufacturing",
    summary:
      "Bags, wallets, belts, and accessories crafted from full-grain and top-grain leather — cut, skived, and hand-finished to luxury standards.",
    points: [
      "Full-grain & top-grain leather",
      "Hand-stitched & machine-sewn",
      "Hardware & lining to spec",
      "Small-batch to bulk runs",
    ],
  },
  {
    slug: "footwear",
    icon: ShoeIcon,
    title: "Footwear Manufacturing",
    summary:
      "Leather shoes, boots, and sandals built on lasted construction — from pattern and last development through finishing and boxing.",
    points: [
      "Goodyear & cemented construction",
      "Last & pattern development",
      "Leather & textile uppers",
      "Sizing runs & grading",
    ],
  },
  {
    slug: "apparel",
    icon: HangerIcon,
    title: "Apparel & Garment Production",
    summary:
      "Cut-and-sew garment manufacturing across woven and knit fabrics — jackets, outerwear, and everyday apparel, private-label ready.",
    points: [
      "Cut, sew & finish",
      "Woven & knit fabrics",
      "Leather & shearling outerwear",
      "Private label & OEM",
    ],
  },
  {
    slug: "textiles",
    icon: SpoolIcon,
    title: "Textile & Fabric Production",
    summary:
      "Woven and knitted fabrics produced to your weight, weave, and color — with dyeing, printing, and finishing under one roof.",
    points: [
      "Weaving & knitting",
      "Dyeing & printing",
      "Custom weights & finishes",
      "Home & apparel textiles",
    ],
  },
  {
    slug: "sourcing-matchmaking",
    icon: UsersIcon,
    title: "Sourcing & Mill Matchmaking",
    summary:
      "When you need a specific material or partner, we connect you with vetted mills, tanneries, and trim suppliers — then manage the relationship.",
    points: [
      "Vetted mill & tannery network",
      "Material & price matching",
      "Contract & PO management",
      "On-site quality inspection",
    ],
  },
  {
    slug: "quality-compliance",
    icon: ShieldIcon,
    title: "Quality Control & Compliance",
    summary:
      "In-line and final inspection with full material traceability — meeting OEKO-TEX, Leather Working Group, and social-compliance standards.",
    points: [
      "AQL inspection standards",
      "Material traceability",
      "OEKO-TEX & LWG aligned",
      "Ethical & social audits",
    ],
  },
  {
    slug: "private-label",
    icon: ScissorsIcon,
    title: "Private Label & OEM",
    summary:
      "Your brand, our factory floor. Full private-label and OEM production with custom labeling, packaging, and retail-ready presentation.",
    points: [
      "Custom labels & branding",
      "Retail-ready packaging",
      "Tech-pack development",
      "Confidential production",
    ],
  },
  {
    slug: "export-logistics",
    icon: ShipIcon,
    title: "Export & Global Logistics",
    summary:
      "Finished goods handled end to end — export documentation, customs clearance, and ocean or air freight to your markets worldwide.",
    points: [
      "Export documentation",
      "Customs & compliance",
      "Ocean & air freight",
      "Door-to-door delivery",
    ],
  },
];

/** Home page shows a focused preview of representative services. */
export const featuredServiceSlugs = [
  "leather-goods",
  "footwear",
  "apparel",
  "textiles",
];

export type ProductCategory = {
  icon: Icon;
  title: string;
  blurb: string;
  image?: string;
};

/** What we make — textiles & leather product categories. */
export const productCategories: ProductCategory[] = [
  {
    icon: BagIcon,
    title: "Leather Goods",
    blurb: "Bags, wallets, belts, and small leather accessories in full-grain leather.",
    image: "/photos/bags.jpg",
  },
  {
    icon: ShoeIcon,
    title: "Footwear",
    blurb: "Leather shoes, boots, and sandals on quality lasted construction.",
    image: "/photos/footwear.jpg",
  },
  {
    icon: SpoolIcon,
    title: "Woven & Knit Textiles",
    blurb: "Fabrics produced to your weight, weave, and finish — dyed and printed in-house.",
    image: "/photos/textile-mill.jpg",
  },
  {
    icon: HangerIcon,
    title: "Apparel & Garments",
    blurb: "Cut-and-sew outerwear and everyday apparel across woven and knit fabric.",
  },
  {
    icon: ShirtIcon,
    title: "Workwear & Uniforms",
    blurb: "Durable workwear and branded uniforms built for daily wear and washing.",
  },
  {
    icon: SofaIcon,
    title: "Home & Upholstery Textiles",
    blurb: "Home linens, throws, and upholstery-grade leather and fabric.",
  },
  {
    icon: LeafIcon,
    title: "Finished Leather & Hides",
    blurb: "Responsibly tanned finished leather and hides, cut and graded to order.",
  },
  {
    icon: BagIcon,
    title: "Accessories & Trims",
    blurb: "Straps, gloves, hardware, and trims to complete any collection.",
  },
];

/** Manufacturing process — the "how we make it" showcase. */
export type Step = { icon: Icon; step: string; title: string; blurb: string };
export const manufacturingProcess: Step[] = [
  {
    icon: SearchIcon,
    step: "01",
    title: "Design & Sample",
    blurb: "We turn your tech pack or sketch into a production-ready sample and confirm every detail.",
  },
  {
    icon: LeafIcon,
    step: "02",
    title: "Source Materials",
    blurb: "We select and test leather, fabric, and trims — from our stock or vetted partner mills.",
  },
  {
    icon: ScissorsIcon,
    step: "03",
    title: "Cut & Make",
    blurb: "Skilled cutters and machinists produce your run on our own leather and textile floors.",
  },
  {
    icon: ShieldIcon,
    step: "04",
    title: "Quality Control",
    blurb: "In-line and final AQL inspection with full material traceability before anything ships.",
  },
  {
    icon: ShipIcon,
    step: "05",
    title: "Pack & Export",
    blurb: "Retail-ready packing, export documentation, and freight to your markets worldwide.",
  },
];

export type Value = { icon: Icon; title: string; blurb: string };

/** "Why Meridian" value props. */
export const whyMeridian: Value[] = [
  {
    icon: CogIcon,
    title: "We own the factory floor",
    blurb:
      "Meridian is a manufacturer first — leather and textile production is done in-house, so we control craft and quality from cutting table to carton.",
  },
  {
    icon: LeafIcon,
    title: "Material expertise",
    blurb:
      "Decades working full-grain leather and technical textiles means we get weight, hand-feel, and durability right the first time.",
  },
  {
    icon: RouteIcon,
    title: "One partner, end to end",
    blurb:
      "Make, source, or ship — it's all under one roof, with no handoffs and no finger-pointing between vendors.",
  },
  {
    icon: EyeIcon,
    title: "Real-time visibility",
    blurb:
      "Live milestones from cutting floor to final delivery, so you always know exactly where your order stands.",
  },
];

/** Company values. */
export const companyValues: Value[] = [
  {
    icon: ShieldIcon,
    title: "Craftsmanship",
    blurb:
      "Every stitch is a signature. Our makers treat your product like their own — because our name travels with it.",
  },
  {
    icon: RouteIcon,
    title: "Reliability",
    blurb:
      "Deadlines are commitments. We plan capacity and materials so your drops land on time, run after run.",
  },
  {
    icon: GlobeIcon,
    title: "Global mindset",
    blurb:
      "Local material knowledge in every market we serve, connected by one accountable production network.",
  },
  {
    icon: LeafIcon,
    title: "Responsible making",
    blurb:
      "Leather Working Group tanneries, OEKO-TEX textiles, and audited, ethical labor across every floor.",
  },
];

/** Trust / quality certifications (leather & textile relevant). */
export const certifications = [
  "ISO 9001",
  "OEKO-TEX",
  "Leather Working Group",
  "GOTS",
  "SEDEX / SMETA",
  "BSCI",
];

/** FAQ — proof & objection handling. */
export const faqs = [
  {
    q: "What's your minimum order quantity?",
    a: "It depends on the product — leather goods and footwear typically start around 100–300 units per style, textiles by fabric run. We also take on small-batch and sampling work for new brands scaling up.",
  },
  {
    q: "Can you produce under our own private label?",
    a: "Yes. The majority of our work is private-label and OEM — your brand, labels, packaging, and retail presentation, produced confidentially on our floors.",
  },
  {
    q: "Do you supply the materials or do we?",
    a: "Either. We stock full-grain leathers and core fabrics, and we'll source specific materials from our vetted mill and tannery network. You can also nominate your own suppliers.",
  },
  {
    q: "How do you handle quality and compliance?",
    a: "Every run passes in-line and final AQL inspection with full material traceability. Our partners align to OEKO-TEX, Leather Working Group, and social-compliance (SEDEX/BSCI) standards.",
  },
  {
    q: "Can you ship finished goods to our country?",
    a: "Yes — we handle export documentation, customs, and ocean or air freight door-to-door to more than 120 countries.",
  },
  {
    q: "How long does sampling and production take?",
    a: "Samples typically take 2–3 weeks; bulk production runs 4–8 weeks depending on volume, materials, and finishing. We confirm a firm timeline with every quote.",
  },
];
