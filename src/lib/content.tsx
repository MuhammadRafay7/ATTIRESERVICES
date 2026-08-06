import type { ComponentType, SVGProps } from "react";
import {
  ShipIcon,
  ShieldIcon,
  CogIcon,
  ShirtIcon,
  RouteIcon,
  EyeIcon,
  GlobeIcon,
  LeafIcon,
  ScissorsIcon,
  SpoolIcon,
  HangerIcon,
  SofaIcon,
  SearchIcon,
  ClipboardIcon,
  LayersIcon,
  WarehouseIcon,
} from "@/components/icons";
import type { PlateKey } from "@/components/ProductPlate";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

/**
 * Hero fact strip — hard operating figures rather than adjectives.
 * These are the four numbers a sourcing lead scans for first, and for a
 * trading house the trade figures lead.
 */
export const heroFacts: { value: string; label: string }[] = [
  { value: "120+", label: "Markets served" },
  { value: "2,400", label: "TEU / year" },
  { value: "220+", label: "Qualified mills" },
  { value: "97.8%", label: "On-time shipment" },
];

export type Pillar = {
  icon: Icon;
  code: string;
  title: string;
  blurb: string;
  points: string[];
};

/**
 * The three contracting models Attire Services operates under. Framed as
 * engagement types a procurement team can actually select between, and
 * ordered the way the business is weighted — trade first.
 */
export const pillars: Pillar[] = [
  {
    icon: SearchIcon,
    code: "01",
    title: "Buying and import agency",
    blurb:
      "You give us the specification and the market; we qualify the mills, place and administer the orders, inspect the output and import it. Attire Services holds the vendor contract, so you hold one contract instead of nine.",
    points: [
      "Vendor qualification and audit",
      "Purchase order administration",
      "Resident QA at partner sites",
      "Cost breakdown disclosed in full",
    ],
  },
  {
    icon: ShipIcon,
    code: "02",
    title: "Export and delivered trade",
    blurb:
      "Finished goods moved under Incoterms 2020 with documentation issued in-house rather than brokered out — through to destination clearance and delivery under DDP where you want it.",
    points: [
      "EXW, FOB, CIF and DDP",
      "Certificates of origin and EUR.1",
      "Consolidated multi-origin shipments",
      "Destination customs handled by us",
    ],
  },
  {
    icon: CogIcon,
    code: "03",
    title: "Owned production",
    blurb:
      "Where a programme needs capacity we control rather than capacity we book, it runs on our own floors — 30 lines across İzmir and Ho Chi Minh City, full package or CMT.",
    points: [
      "Tech pack to packed carton",
      "Full package or cut-make-trim",
      "Named line allocation",
      "Single point of quality liability",
    ],
  },
];

export type Division = "trade" | "garment";

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
 * The headline capability blocks. Two are trade, one is production —
 * which is the actual shape of the business and should be the shape of
 * the page a visitor lands on.
 */
export type DivisionEntry = {
  key: string;
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
    key: "import",
    icon: SearchIcon,
    code: "D-01",
    title: "Import and sourcing",
    blurb:
      "We buy on your behalf across a network of 220+ qualified mills and factories — appointing, auditing and administering the vendors, and carrying the quality liability ourselves.",
    points: [
      "Mill and factory qualification",
      "Order placement and administration",
      "In-line and final inspection",
      "Material and trim consolidation",
    ],
    facts: [
      { value: "220+", label: "Qualified vendors" },
      { value: "12", label: "Sourcing countries" },
    ],
    image: "/photos/trade-warehouse.jpg",
    imageAlt: "Palletised apparel cartons staged in a consolidation warehouse",
    caption: "Dhaka · Chennai",
  },
  {
    key: "export",
    icon: ShipIcon,
    code: "D-02",
    title: "Export, freight and customs",
    blurb:
      "A trading arm in its own right. We export under Incoterms 2020 with origin certification, HS classification and destination clearance issued in-house, not subcontracted to a broker.",
    points: [
      "Export documentation and origin certification",
      "HS classification and duty planning",
      "Ocean, air and rail consolidation",
      "Destination customs clearance under DDP",
    ],
    facts: [
      { value: "120+", label: "Markets served" },
      { value: "2,400", label: "TEU / year" },
    ],
    image: "/photos/trade-port.jpg",
    imageAlt: "Container vessel loading alongside quay cranes",
    caption: "Rotterdam · New York",
  },
  {
    key: "garment",
    icon: HangerIcon,
    code: "D-03",
    title: "Owned garment production",
    blurb:
      "Thirty lines under our own roof for the programmes that need controlled capacity — woven and knit cut-and-sew across apparel, knitwear, outerwear and workwear.",
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
];

/** Full capability catalogue, each with hard specification data. */
export const services: Service[] = [
  // ---- Import & export ---------------------------------------------------
  {
    slug: "import-sourcing",
    division: "trade",
    icon: SearchIcon,
    code: "TRD-01",
    title: "Import and material sourcing",
    summary:
      "We buy and import on your behalf — qualifying mills, factories and trim suppliers, holding the vendor contract and the quality liability ourselves.",
    points: [
      "Vendor qualification and audit",
      "Cost breakdown transparency",
      "Purchase order administration",
      "Resident QA at partner sites",
    ],
    specs: [
      { key: "Network", value: "220+ qualified vendors" },
      { key: "Audit cycle", value: "12 months, or on change" },
      { key: "Liability", value: "Held by Attire Services" },
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
      { key: "Documentation", value: "Issued by Attire Services" },
      { key: "DDP markets", value: "EU, UK, North America" },
      { key: "Registrations", value: "AEO-F · EORI · CTPAT-aligned" },
    ],
  },
  {
    slug: "warehousing",
    division: "trade",
    icon: WarehouseIcon,
    code: "TRD-04",
    title: "Warehousing and distribution",
    summary:
      "Bonded and general storage at origin and destination, with pick, pack and retail-ready distribution into your channel or your customer's.",
    points: [
      "Bonded warehousing at origin",
      "EU distribution from Rotterdam",
      "Pick, pack and retail-ready presentation",
      "Consignment and call-off stock",
    ],
    specs: [
      { key: "Capacity", value: "34,000 pallet positions" },
      { key: "Bonded", value: "Rotterdam · Chennai" },
      { key: "Dispatch", value: "Same-day to 48 hours" },
    ],
  },

  // ---- Garment production ------------------------------------------------
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

  // ---- Cross-division ----------------------------------------------------
  {
    slug: "quality-compliance",
    division: "trade",
    icon: ShieldIcon,
    code: "QA-01",
    title: "Quality and compliance",
    summary:
      "An inspection regime governed by AQL 2.5 across in-line and final stages, applied identically to our own lines and to every partner mill.",
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
      "Confidential production under your marks, with branded labelling, packaging and retail presentation ready for the shelf on arrival.",
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
  "import-sourcing",
  "export-logistics",
  "trade-compliance",
  "apparel",
];

/** Human labels for the two divisions, used to group the schedule. */
export const divisionLabels: Record<Division, string> = {
  trade: "Import & export",
  garment: "Garment production",
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

/** Product portfolio — what we trade and what the floors produce. */
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
    detail: "Fused and half-canvas · MOQ 200 units",
    image: "/photos/tailoring.jpg",
  },
  {
    icon: SpoolIcon,
    code: "P-07",
    title: "Woven and knit fabric",
    blurb: "Fabric to nominated weight, construction and colour.",
    detail: "Dyed and finished in-house · MOQ 500 m",
    image: "/photos/textile-mill.jpg",
  },
  {
    icon: SofaIcon,
    code: "P-08",
    title: "Home and soft furnishing",
    blurb: "Linens, throws, curtaining and upholstery-grade fabric.",
    detail: "Martindale-rated to 40,000 rubs · MOQ 300 units",
    image: "/photos/upholstery.jpg",
  },
  {
    icon: LayersIcon,
    code: "P-09",
    title: "Trims, labels and packaging",
    blurb: "Hardware, labels, hangtags and retail-ready packaging components.",
    detail: "Nickel-free tested · MOQ by component",
    plate: "trims",
  },
];

/** Order lifecycle — the contractual sequence, with owners and durations. */
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
    title: "Enquiry and costing",
    blurb:
      "We review the tech pack, resolve open construction questions and return a costed bill of materials with a firm production and shipping window.",
    duration: "3–5 days",
    owner: "Client services",
  },
  {
    icon: SearchIcon,
    step: "02",
    title: "Vendor and material qualification",
    blurb:
      "Fabric, yarn and trim are selected and physically tested — or your nominated supplier is audited and approved before any order is placed.",
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
    title: "Production and in-line inspection",
    blurb:
      "The run is scheduled against a named line — ours or a qualified partner's — with weekly output reporting and inspection at defined checkpoints.",
    duration: "25–45 days",
    owner: "Production",
  },
  {
    icon: ShieldIcon,
    step: "05",
    title: "Final inspection and documentation",
    blurb:
      "Final random inspection to AQL 2.5, then the export pack: invoice, packing list, origin certificate and any conformity documentation the market needs.",
    duration: "2–4 days",
    owner: "Quality · Trade compliance",
  },
  {
    icon: ShipIcon,
    step: "06",
    title: "Export, customs and delivery",
    blurb:
      "Consolidation, booking, customs clearance and freight under your elected Incoterm, with tracking issued at departure and clearance handled at destination under DDP.",
    duration: "Per Incoterm",
    owner: "Trade compliance",
  },
];

export type Value = { icon: Icon; title: string; blurb: string };

/** Differentiators, argued with evidence rather than adjectives. */
export const whyAttireServices: Value[] = [
  {
    icon: RouteIcon,
    title: "A principal, not an introducer",
    blurb:
      "We buy and sell on our own account. When we place an order with a mill, the contract is ours — so if a lot fails, you claim against Attire Services, not against a factory in another jurisdiction you have never met.",
  },
  {
    icon: GlobeIcon,
    title: "Documentation issued in-house",
    blurb:
      "Origin certification, HS classification, EUR.1 and destination clearance are handled by our own AEO-F registered team. Nothing about your shipment depends on a broker's queue.",
  },
  {
    icon: CogIcon,
    title: "Owned capacity behind the trade",
    blurb:
      "Thirty lines across İzmir and Ho Chi Minh City mean we are not only as good as the vendors we can book. Programmes that need controlled capacity move onto our own floors.",
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
      "OEKO-TEX and GOTS certified textiles, amfori BSCI social compliance and audited labour standards — evidenced by certificate, not by claim.",
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
    q: "Are you a trading house or a manufacturer?",
    a: "Both, weighted toward trade. The majority of what we ship is sourced, inspected and exported by us from a network of 220+ qualified mills and factories. Behind that we hold 30 owned garment lines in İzmir and Ho Chi Minh City for programmes that need capacity we control directly. You contract with one entity either way.",
  },
  {
    q: "What is your minimum order quantity?",
    a: "200 units per style and colourway for apparel, 250 for knitwear, 300 for outerwear and workwear, and 500 metres per colourway for fabric. Lower quantities are accepted for sampling and for first production runs where a scaling commitment is agreed.",
  },
  {
    q: "Who holds liability if a shipment fails inspection?",
    a: "Attire Services does. That applies equally to goods produced on our own lines and to goods bought from a partner mill, because we hold the vendor contract as principal rather than introducing you to it. Non-conforming lots are reworked or replaced at our cost.",
  },
  {
    q: "Can we nominate our own mills and factories?",
    a: "Yes. You may nominate suppliers and we will audit, appoint and administer them under our protocol, or we will source against your specification from our qualified network. Under a cut-make-trim arrangement on our own lines you consign the materials directly.",
  },
  {
    q: "Which Incoterms do you trade on?",
    a: "EXW, FOB, CIF and DDP under Incoterms 2020. We issue export documentation, certificates of origin and EUR.1 movement certificates directly as an AEO-F registered operator, and we handle destination customs clearance under DDP in the EU, UK and North America.",
  },
  {
    q: "What audit access do we get?",
    a: "Unannounced access to any Attire Services site during production hours is written into our standard terms, for your staff and for third-party inspection bodies. The same access is contracted into our partner mill agreements. Current ISO, AEO, SMETA, OEKO-TEX and GOTS certificates are issued on request with the vendor pack.",
  },
];
