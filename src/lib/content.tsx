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
  ClipboardIcon,
  LayersIcon,
} from "@/components/icons";
import type { PlateKey } from "@/components/ProductPlate";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

/**
 * Hero fact strip — hard operating figures rather than adjectives.
 * These are the four numbers a sourcing lead scans for first.
 */
export const heroFacts: { value: string; label: string }[] = [
  { value: "3", label: "Divisions" },
  { value: "18.6M", label: "Units / year" },
  { value: "49", label: "Production lines" },
  { value: "120+", label: "Markets traded" },
];

export type Pillar = {
  icon: Icon;
  code: string;
  title: string;
  blurb: string;
  points: string[];
};

/**
 * The three contracting models Ostenmark operates under. Framed as
 * engagement types a procurement team can actually select between.
 */
export const pillars: Pillar[] = [
  {
    icon: CogIcon,
    code: "01",
    title: "Full-package production",
    blurb:
      "We take the specification and return finished, packed, inspected goods. Ostenmark holds responsibility for materials, labour, quality and export documentation under a single purchase order.",
    points: [
      "Tech pack to bulk delivery",
      "Materials nominated or sourced by us",
      "Single point of contractual liability",
      "FOB or DDP at your election",
    ],
  },
  {
    icon: UsersIcon,
    code: "02",
    title: "Cut, make and trim",
    blurb:
      "You nominate and consign the materials; we provide the line, the labour and the quality system. Suited to brands with established mill relationships that need capacity, not sourcing.",
    points: [
      "Client-consigned materials",
      "Dedicated or shared line allocation",
      "Bonded warehousing for inputs",
      "Per-unit conversion pricing",
    ],
  },
  {
    icon: GlobeIcon,
    code: "03",
    title: "Managed supplier network",
    blurb:
      "For categories outside our own floors, we appoint, audit and manage third-party vendors on your behalf — under Ostenmark's quality protocol and our contract, not yours.",
    points: [
      "Vendor qualification and audit",
      "On-site Ostenmark QA presence",
      "Consolidated invoicing and freight",
      "Ostenmark retains liability",
    ],
  },
];

export type Division = "garment" | "leather" | "trade";

export type Service = {
  slug: string;
  division: Division;
  icon: Icon;
  code: string;
  title: string;
  summary: string;
  points: string[];
  specs: { key: string; value: string }[];
};

/**
 * The three divisions. Deliberately equal in weight: the business is a
 * garment maker, a leather maker and a trading house, and a visitor should
 * be able to tell which one they need within a few seconds.
 */
export type DivisionEntry = {
  key: Division;
  icon: Icon;
  code: string;
  title: string;
  blurb: string;
  points: string[];
  facts: { value: string; label: string }[];
  image: string;
  imageAlt: string;
  caption: string;
};

export const divisions: DivisionEntry[] = [
  {
    key: "garment",
    icon: HangerIcon,
    code: "D-01",
    title: "Garment manufacturing",
    blurb:
      "Woven and knit cut-and-sew across apparel, knitwear, outerwear and workwear — from tech pack to packed carton, full package or CMT.",
    points: [
      "Apparel, shirting and tailoring",
      "Knitwear and jersey, 3–14 gauge",
      "Outerwear and uniform programmes",
      "Woven and knit fabric production",
    ],
    facts: [
      { value: "12.1M", label: "Units / year" },
      { value: "30", label: "Lines" },
    ],
    image: "/photos/apparel-line.jpg",
    imageAlt: "Machinist working a garment on an industrial sewing line",
    caption: "İzmir · Ho Chi Minh City",
  },
  {
    key: "leather",
    icon: BagIcon,
    code: "D-02",
    title: "Leather manufacturing",
    blurb:
      "Bags, footwear and small leather goods cut and closed on our own floors, from LWG Gold tanned hides through hand and machine finishing.",
    points: [
      "Bags, luggage and small leather goods",
      "Lasted footwear, three constructions",
      "Finished leather and hides by the panel",
      "Hand closing, edge paint, skiving",
    ],
    facts: [
      { value: "6.5M", label: "Units / year" },
      { value: "19", label: "Lines" },
    ],
    image: "/photos/leather-line.jpg",
    imageAlt: "Finished leather goods stacked on the production floor",
    caption: "Porto · Chennai",
  },
  {
    key: "trade",
    icon: ShipIcon,
    code: "D-03",
    title: "Import and export",
    blurb:
      "A trading arm in its own right. We source and import materials and finished goods, and we export under Incoterms 2020 with documentation issued in-house.",
    points: [
      "Import sourcing and vendor management",
      "Export documentation and origin certification",
      "Customs clearance and HS classification",
      "Ocean, air and rail consolidation",
    ],
    facts: [
      { value: "120+", label: "Markets served" },
      { value: "2,400", label: "TEU / year" },
    ],
    image: "/photos/trade-port.jpg",
    imageAlt: "Container vessel loading alongside quay cranes",
    caption: "Rotterdam · New York",
  },
];

/** Full capability catalogue, each with hard specification data. */
export const services: Service[] = [
  // ---- Garment division -----------------------------------------------
  {
    slug: "apparel",
    division: "garment",
    icon: HangerIcon,
    code: "GMT-01",
    title: "Apparel and shirting",
    summary:
      "Woven cut-and-sew across shirting, trousers, dresses and tailoring, produced full-package or CMT from your tech pack.",
    points: [
      "Woven cut-and-sew",
      "Tech pack to bulk, full package or CMT",
      "Grading across full size curves",
      "Private label and OEM under NDA",
    ],
    specs: [
      { key: "Minimum order", value: "200 units / style" },
      { key: "Lead time", value: "35–50 working days" },
      { key: "Sites", value: "İzmir · Ho Chi Minh City" },
    ],
  },
  {
    slug: "knitwear",
    division: "garment",
    icon: SpoolIcon,
    code: "GMT-02",
    title: "Knitwear and jersey",
    summary:
      "Circular and flat-knit production from yarn to finished garment — jersey basics, fine-gauge knitwear, fleece and heavyweight sweats.",
    points: [
      "Circular and flat knitting, 3–14 gauge",
      "Fully fashioned and cut-and-sew jersey",
      "Garment dye, wash and enzyme finishing",
      "Pilling and spirality tested",
    ],
    specs: [
      { key: "Minimum order", value: "250 units / style" },
      { key: "Lead time", value: "35–45 working days" },
      { key: "Sites", value: "İzmir" },
    ],
  },
  {
    slug: "outerwear",
    division: "garment",
    icon: ShirtIcon,
    code: "GMT-03",
    title: "Outerwear and workwear",
    summary:
      "Technical and insulated outerwear alongside industrial workwear and uniform programmes built for multi-year contracts.",
    points: [
      "Seam sealing and taped construction",
      "Down and synthetic insulation, RDS certified",
      "ISO 15797 industrial-laundry tested",
      "Multi-year uniform contracts",
    ],
    specs: [
      { key: "Minimum order", value: "300 units / style" },
      { key: "Lead time", value: "45–60 working days" },
      { key: "Sites", value: "Ho Chi Minh City · İzmir" },
    ],
  },
  {
    slug: "textiles",
    division: "garment",
    icon: LayersIcon,
    code: "GMT-04",
    title: "Textile and fabric production",
    summary:
      "Woven and knitted fabric to nominated weight, construction and colour, with dyeing, printing and finishing held in-house for shade continuity.",
    points: [
      "Weaving, circular and flat knitting",
      "Reactive and pigment dyeing",
      "Lab dips within five working days",
      "Shade banding and continuity control",
    ],
    specs: [
      { key: "Minimum order", value: "500 m / colourway" },
      { key: "Lead time", value: "25–40 working days" },
      { key: "Sites", value: "İzmir" },
    ],
  },

  // ---- Leather division ------------------------------------------------
  {
    slug: "leather-goods",
    division: "leather",
    icon: BagIcon,
    code: "LTH-01",
    title: "Leather goods",
    summary:
      "Bags, luggage, wallets, belts and small leather accessories in full-grain, top-grain and suede, cut and closed to luxury standards.",
    points: [
      "Hand and machine closing",
      "Edge painting, skiving, creasing",
      "Client-nominated or sourced hardware",
      "Serialised authentication available",
    ],
    specs: [
      { key: "Minimum order", value: "150 units / style" },
      { key: "Lead time", value: "40–55 working days" },
      { key: "Sites", value: "Porto · Chennai" },
    ],
  },
  {
    slug: "footwear",
    division: "leather",
    icon: ShoeIcon,
    code: "LTH-02",
    title: "Footwear",
    summary:
      "Lasted footwear across cemented, Goodyear-welted and vulcanised constructions, from last and pattern development through boxing.",
    points: [
      "Last and pattern development",
      "Cemented, welted, vulcanised",
      "Full size grading and fit trials",
      "SATRA-referenced wear testing",
    ],
    specs: [
      { key: "Minimum order", value: "300 pairs / style" },
      { key: "Lead time", value: "50–60 working days" },
      { key: "Sites", value: "Porto · Ho Chi Minh City" },
    ],
  },
  {
    slug: "finished-leather",
    division: "leather",
    icon: LeafIcon,
    code: "LTH-03",
    title: "Finished leather and hides",
    summary:
      "Tanned, finished and graded leather supplied by the hide or cut panel, from Leather Working Group Gold-rated tanneries.",
    points: [
      "Full-grain, top-grain, split and suede",
      "Vegetable and chrome tanned",
      "Cut to panel or supplied by the hide",
      "Chrome VI and rub tested",
    ],
    specs: [
      { key: "Minimum order", value: "200 sq ft" },
      { key: "Lead time", value: "20–30 working days" },
      { key: "Sites", value: "Chennai" },
    ],
  },

  // ---- Import & export division ---------------------------------------
  {
    slug: "import-sourcing",
    division: "trade",
    icon: SearchIcon,
    code: "TRD-01",
    title: "Import and material sourcing",
    summary:
      "We buy and import on your behalf — qualifying mills, tanneries and trim suppliers, holding the vendor contract and the quality liability ourselves.",
    points: [
      "Vendor qualification and audit",
      "Cost breakdown transparency",
      "Purchase order administration",
      "Resident QA at partner sites",
    ],
    specs: [
      { key: "Network", value: "220+ qualified vendors" },
      { key: "Audit cycle", value: "12 months, or on change" },
      { key: "Liability", value: "Held by Ostenmark" },
    ],
  },
  {
    slug: "export-logistics",
    division: "trade",
    icon: ShipIcon,
    code: "TRD-02",
    title: "Export and freight",
    summary:
      "Finished goods delivered under Incoterms 2020, with ocean, air and rail consolidation across our own and third-party production.",
    points: [
      "EXW, FOB, CIF and DDP",
      "FCL, LCL, air and rail",
      "Consolidated multi-site shipments",
      "Tracking issued at departure",
    ],
    specs: [
      { key: "Markets", value: "120+ served" },
      { key: "Volume", value: "2,400 TEU / year" },
      { key: "Sites", value: "Rotterdam · New York" },
    ],
  },
  {
    slug: "trade-compliance",
    division: "trade",
    icon: ClipboardIcon,
    code: "TRD-03",
    title: "Customs and trade compliance",
    summary:
      "Export documentation, origin certification, HS classification and destination clearance, issued in-house rather than brokered out.",
    points: [
      "Certificates of origin and EUR.1",
      "HS classification and duty planning",
      "Destination customs clearance",
      "UKCA, SASO and G-Mark conformity",
    ],
    specs: [
      { key: "Documentation", value: "Issued by Ostenmark" },
      { key: "DDP markets", value: "EU, UK, North America" },
      { key: "Registrations", value: "EORI · CTPAT-aligned" },
    ],
  },

  // ---- Cross-division --------------------------------------------------
  {
    slug: "quality-compliance",
    division: "garment",
    icon: ShieldIcon,
    code: "QA-01",
    title: "Quality and compliance",
    summary:
      "An inspection regime governed by AQL 2.5 across in-line and final stages, applied identically to all three divisions.",
    points: [
      "AQL 2.5 in-line and final",
      "Needle and metal detection",
      "Physical and chemical testing",
      "Audit-ready documentation pack",
    ],
    specs: [
      { key: "Standard", value: "ISO 2859-1 / AQL 2.5" },
      { key: "Traceability", value: "Lot-level, 7 years" },
      { key: "Audit access", value: "Unannounced permitted" },
    ],
  },
  {
    slug: "private-label",
    division: "garment",
    icon: ScissorsIcon,
    code: "OEM-01",
    title: "Private label and OEM",
    summary:
      "Confidential production under your marks across every division, with branded labelling, packaging and retail presentation.",
    points: [
      "Brand book adherence",
      "Retail-ready and e-commerce packing",
      "Tech pack development support",
      "NDA-governed segregated production",
    ],
    specs: [
      { key: "Confidentiality", value: "Mutual NDA, standard" },
      { key: "Tooling", value: "Client-owned, held by us" },
      { key: "Exclusivity", value: "Available by category" },
    ],
  },
];

/** Home page shows a focused preview of representative capabilities. */
export const featuredServiceSlugs = [
  "apparel",
  "leather-goods",
  "export-logistics",
  "knitwear",
];

/** Human labels for the three divisions, used to group the schedule. */
export const divisionLabels: Record<Division, string> = {
  garment: "Garment division",
  leather: "Leather division",
  trade: "Import & export division",
};

export type ProductCategory = {
  icon: Icon;
  code: string;
  title: string;
  blurb: string;
  detail: string;
  /** Photography, where we hold it. */
  image?: string;
  /** Otherwise the category is drawn as a dimensioned technical plate. */
  plate?: PlateKey;
};

/** Product portfolio — what the floors actually produce. */
export const productCategories: ProductCategory[] = [
  {
    icon: HangerIcon,
    code: "P-01",
    title: "Apparel and shirting",
    blurb: "Woven cut-and-sew — shirting, trousers, dresses and tailoring.",
    detail: "Full package or CMT · MOQ 200 units",
    image: "/photos/shirt.jpg",
  },
  {
    icon: SpoolIcon,
    code: "P-02",
    title: "Knitwear and jersey",
    blurb: "Jersey basics, fine-gauge knitwear, fleece and heavyweight sweats.",
    detail: "3–14 gauge · MOQ 250 units",
    image: "/photos/knitwear.jpg",
  },
  {
    icon: ShirtIcon,
    code: "P-03",
    title: "Outerwear",
    blurb: "Technical and insulated outerwear, seam-sealed and taped.",
    detail: "RDS-certified fill · MOQ 300 units",
    image: "/photos/outerwear.jpg",
  },
  {
    icon: LayersIcon,
    code: "P-04",
    title: "Denim and casual",
    blurb: "Denim bottoms and casualwear with garment wash and finishing.",
    detail: "Laser and enzyme finish · MOQ 300 units",
    image: "/photos/apparel-denim.jpg",
  },
  {
    icon: ShirtIcon,
    code: "P-05",
    title: "Workwear and uniform",
    blurb: "Programme wear built for repeat ordering and industrial laundering.",
    detail: "ISO 15797 wash-tested · MOQ 500 units",
    image: "/photos/workwear.jpg",
  },
  {
    icon: HangerIcon,
    code: "P-06",
    title: "Tailoring and formalwear",
    blurb: "Structured jackets, suiting and formal separates.",
    detail: "Fused and half-canvas · MOQ 150 units",
    image: "/photos/tailoring.jpg",
  },
  {
    icon: BagIcon,
    code: "P-07",
    title: "Leather goods",
    blurb: "Bags, luggage, wallets, belts and small leather accessories.",
    detail: "Full-grain and top-grain · MOQ 150 units",
    image: "/photos/leather-handbags.jpg",
  },
  {
    icon: ShoeIcon,
    code: "P-08",
    title: "Footwear",
    blurb: "Lasted shoes, boots and sandals across three constructions.",
    detail: "Cemented, welted, vulcanised · MOQ 300 pairs",
    image: "/photos/leather-boots.jpg",
  },
  {
    icon: SpoolIcon,
    code: "P-09",
    title: "Woven and knit fabric",
    blurb: "Fabric to nominated weight, construction and colour.",
    detail: "Dyed and finished in-house · MOQ 500 m",
    image: "/photos/textile-mill.jpg",
  },
  {
    icon: SofaIcon,
    code: "P-10",
    title: "Home and upholstery",
    blurb: "Linens, throws and upholstery-grade leather and fabric.",
    detail: "Martindale-rated to 40,000 rubs · MOQ 300 units",
    image: "/photos/upholstery.jpg",
  },
  {
    icon: LeafIcon,
    code: "P-11",
    title: "Finished leather and hides",
    blurb: "Tanned, finished and graded leather supplied by the hide or panel.",
    detail: "LWG Gold tanneries · MOQ 200 sq ft",
    plate: "hide",
  },
  {
    icon: LayersIcon,
    code: "P-12",
    title: "Components and trims",
    blurb: "Straps, hardware, labels and branded trim components.",
    detail: "Nickel-free tested · MOQ by component",
    image: "/photos/leather-components.jpg",
  },
];

/** Production workflow — the contractual sequence, with owners and durations. */
export type Step = {
  icon: Icon;
  step: string;
  title: string;
  blurb: string;
  duration: string;
  owner: string;
};

export const manufacturingProcess: Step[] = [
  {
    icon: ClipboardIcon,
    step: "01",
    title: "Specification and costing",
    blurb:
      "We review the tech pack, resolve open construction questions and return a costed bill of materials with a firm production window.",
    duration: "3–5 days",
    owner: "Client services",
  },
  {
    icon: SearchIcon,
    step: "02",
    title: "Material qualification",
    blurb:
      "Leather, fabric and trim are selected and physically tested — or your nominated supplier is audited and approved before any order is placed.",
    duration: "5–10 days",
    owner: "Sourcing · QA",
  },
  {
    icon: ScissorsIcon,
    step: "03",
    title: "Sampling and approval",
    blurb:
      "Proto, fit and pre-production samples are produced and signed off in sequence. Bulk does not start until the PP sample is approved in writing.",
    duration: "10–15 days",
    owner: "Product development",
  },
  {
    icon: CogIcon,
    step: "04",
    title: "Bulk production",
    blurb:
      "The run is scheduled against a named line with weekly output reporting and in-line inspection at defined checkpoints.",
    duration: "25–45 days",
    owner: "Production",
  },
  {
    icon: ShieldIcon,
    step: "05",
    title: "Final inspection",
    blurb:
      "Final random inspection to AQL 2.5. Third-party inspectors may attend unannounced. Non-conforming lots are reworked, not shipped.",
    duration: "2–4 days",
    owner: "Quality assurance",
  },
  {
    icon: ShipIcon,
    step: "06",
    title: "Export and delivery",
    blurb:
      "Packing, export documentation, customs clearance and freight under your elected Incoterm, with tracking issued at departure.",
    duration: "Per Incoterm",
    owner: "Trade compliance",
  },
];

export type Value = { icon: Icon; title: string; blurb: string };

/** Differentiators, argued with evidence rather than adjectives. */
export const whyOstenmark: Value[] = [
  {
    icon: CogIcon,
    title: "Owned production, not brokerage",
    blurb:
      "Six sites and 49 lines are Ostenmark-owned and Ostenmark-staffed across garment and leather production, and the trading arm is ours too. When a specification is missed, the accountable party is a company you hold a contract with — not an agent's undisclosed subcontractor.",
  },
  {
    icon: ShieldIcon,
    title: "Auditable at any time",
    blurb:
      "ISO 9001 and 14001 certified, SMETA 4-Pillar audited annually, with lot-level traceability retained for seven years. Unannounced client and third-party audits are permitted by contract.",
  },
  {
    icon: RouteIcon,
    title: "Single contractual counterparty",
    blurb:
      "Materials, conversion, inspection, documentation and freight sit under one purchase order and one liable entity, whether the work runs on our floors or a managed partner's.",
  },
  {
    icon: EyeIcon,
    title: "Reported, not promised",
    blurb:
      "Weekly output against plan, inspection results by lot, and shipment milestones are issued as standard — so schedule risk surfaces early enough to act on.",
  },
];

/** Company principles. */
export const companyValues: Value[] = [
  {
    icon: ShieldIcon,
    title: "Accountability",
    blurb:
      "We hold the liability we ask clients to rely on. No undisclosed subcontracting, and no deflection when a lot fails.",
  },
  {
    icon: RouteIcon,
    title: "Schedule integrity",
    blurb:
      "Capacity is committed against a named line before a date is confirmed. 97.8% of shipments departed on or before the confirmed ETD in the last twelve months.",
  },
  {
    icon: GlobeIcon,
    title: "Jurisdictional fluency",
    blurb:
      "Customs, conformity marking and chemical regulation differ by market. We administer those obligations rather than passing them back to the client.",
  },
  {
    icon: LeafIcon,
    title: "Verified responsibility",
    blurb:
      "LWG Gold tanneries, OEKO-TEX and GOTS certified textiles, and audited labour standards — evidenced by certificate, not by claim.",
  },
];

/** Quality controls, stated as testable measures. */
export const qualityControls = [
  "AQL 2.5 in-line and final random inspection",
  "Lot-level material traceability, retained 7 years",
  "Needle and broken-metal detection, 100% of output",
  "Tensile, rub, seam-slippage and colourfastness testing",
  "Restricted substance testing against REACH SVHC",
  "Pre-production sample approval in writing before bulk",
  "Unannounced third-party audit access by contract",
  "Non-conformance reporting within 24 hours",
];

/** FAQ — the objections a procurement team raises before onboarding a vendor. */
export const faqs = [
  {
    q: "What is your minimum order quantity?",
    a: "150 units per style and colourway for leather goods and apparel, 300 pairs for footwear, and 500 metres per colourway for fabric. Lower quantities are accepted for sampling and for first production runs where a scaling commitment is agreed.",
  },
  {
    q: "Who holds liability if a shipment fails inspection?",
    a: "Ostenmark does. That applies equally to work produced on our own floors and to work placed with a managed partner, because in the managed model we hold the vendor contract rather than introducing you to it. Non-conforming lots are reworked or replaced at our cost.",
  },
  {
    q: "Can we nominate our own mills and tanneries?",
    a: "Yes. Under a cut-make-trim arrangement you consign the materials directly. Under full-package production you may nominate suppliers and we will audit and administer them, or we will source against your specification from our qualified network.",
  },
  {
    q: "What audit access do we get?",
    a: "Unannounced access to any Ostenmark site during production hours is written into our standard terms, for your staff and for third-party inspection bodies. Current ISO, SMETA, OEKO-TEX, LWG and GOTS certificates are issued on request with the vendor pack.",
  },
  {
    q: "Which Incoterms do you trade on?",
    a: "EXW, FOB, CIF and DDP under Incoterms 2020. We issue export documentation, certificates of origin and EUR.1 movement certificates directly, and we handle destination customs clearance under DDP in the EU, UK and North America.",
  },
  {
    q: "How is intellectual property protected?",
    a: "Production runs under a mutual NDA as standard. Client-owned lasts, dies and tooling are held segregated and returned on request, patterns are not reused across accounts, and category exclusivity is available contractually.",
  },
];
