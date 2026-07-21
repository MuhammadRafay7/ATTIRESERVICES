import type { ComponentType, SVGProps } from "react";
import {
  ShipIcon,
  PlaneIcon,
  TruckIcon,
  ClipboardIcon,
  WarehouseIcon,
  ShieldIcon,
  LayersIcon,
  WheatIcon,
  CogIcon,
  ShirtIcon,
  CpuIcon,
  BeakerIcon,
  CarIcon,
  CartIcon,
  RouteIcon,
  EyeIcon,
  UsersIcon,
  GlobeIcon,
  LeafIcon,
} from "@/components/icons";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

/** Manufacturing-led capability signals under the hero. */
export const heroCapabilities: { icon: Icon; label: string }[] = [
  { icon: CogIcon, label: "Made to spec" },
  { icon: ShieldIcon, label: "Quality controlled" },
  { icon: WarehouseIcon, label: "Order fulfillment" },
  { icon: GlobeIcon, label: "Shipped worldwide" },
];

/** The four transport modes — supporting logistics signals. */
export const freightModes: { icon: Icon; label: string }[] = [
  { icon: ShipIcon, label: "Ocean" },
  { icon: PlaneIcon, label: "Air" },
  { icon: TruckIcon, label: "Land & Rail" },
  { icon: ClipboardIcon, label: "Customs" },
];

export type Pillar = {
  icon: Icon;
  title: string;
  blurb: string;
  points: string[];
};

/**
 * The three ways Meridian works — the core business model:
 * manufacturing/fulfillment, sourcing/matchmaking, and import/export.
 */
export const pillars: Pillar[] = [
  {
    icon: CogIcon,
    title: "Manufacture & Fulfill",
    blurb:
      "We produce to your specification and fulfill orders at scale — from first sample to full production run, quality-controlled and ship-ready.",
    points: ["Made-to-spec production", "Quality control & inspection", "Order fulfillment at scale"],
  },
  {
    icon: UsersIcon,
    title: "Source & Connect",
    blurb:
      "Need a maker instead? We connect you with vetted manufacturers worldwide — matched on capability, price, and compliance, then managed end to end.",
    points: ["Vetted manufacturer network", "Capability & price matching", "Managed on your behalf"],
  },
  {
    icon: GlobeIcon,
    title: "Import & Export",
    blurb:
      "And we move it. Ocean, air, land, customs, and warehousing — every category of goods delivered across borders with full trade compliance.",
    points: ["Multi-modal freight", "Customs & compliance", "Warehousing & delivery"],
  },
];

export type Service = {
  slug: string;
  icon: Icon;
  title: string;
  summary: string;
  points: string[];
};

/** Full service catalogue (BUILD_BRIEF §6 /services). */
export const services: Service[] = [
  {
    slug: "manufacturing-fulfillment",
    icon: CogIcon,
    title: "Manufacturing & Order Fulfillment",
    summary:
      "We manufacture to your specification and fulfill orders at scale — managing production, quality, and dispatch so you receive finished goods ready to sell.",
    points: [
      "Made-to-spec production runs",
      "Prototyping & sampling",
      "In-line quality control",
      "Packaging, labeling & dispatch",
    ],
  },
  {
    slug: "sourcing-matchmaking",
    icon: UsersIcon,
    title: "Sourcing & Manufacturer Matchmaking",
    summary:
      "When you'd rather work with a maker directly, we connect you with vetted manufacturers worldwide — matched on capability, price, and compliance, then managed end to end.",
    points: [
      "Vetted manufacturer network",
      "Capability & price matching",
      "Contract & PO management",
      "Quality inspection & QC",
    ],
  },
  {
    slug: "ocean-freight",
    icon: ShipIcon,
    title: "Ocean Freight",
    summary:
      "Full-container (FCL) and less-than-container (LCL) ocean movements on every major trade lane, with reliable space on premium carriers.",
    points: [
      "FCL, LCL & breakbulk options",
      "Direct and consolidated sailings",
      "Reefer and out-of-gauge cargo",
      "Port-to-port and door-to-door",
    ],
  },
  {
    slug: "air-freight",
    icon: PlaneIcon,
    title: "Air Freight",
    summary:
      "Time-critical airfreight with guaranteed capacity, express consolidations, and charter solutions when the deadline can't move.",
    points: [
      "Next-flight-out & express",
      "Consolidated economy airfreight",
      "Charter & on-board courier",
      "Temperature-controlled uplift",
    ],
  },
  {
    slug: "land-rail",
    icon: TruckIcon,
    title: "Land & Rail",
    summary:
      "Road and rail linehaul that bridges ports to inland destinations, including cross-border trucking and intermodal rail corridors.",
    points: [
      "FTL & LTL trucking",
      "Intermodal rail freight",
      "Cross-border customs transit",
      "First & last-mile delivery",
    ],
  },
  {
    slug: "customs-compliance",
    icon: ClipboardIcon,
    title: "Customs Brokerage & Compliance",
    summary:
      "Licensed brokerage that keeps shipments moving through customs — accurate classification, duty optimization, and clean audit trails.",
    points: [
      "HS classification & valuation",
      "Duty, tariff & FTA optimization",
      "Import/export licensing",
      "Denied-party & sanctions screening",
    ],
  },
  {
    slug: "warehousing-fulfillment",
    icon: WarehouseIcon,
    title: "Warehousing & Fulfillment",
    summary:
      "Bonded and general warehousing at strategic hubs, with pick-and-pack, kitting, and distribution close to your end markets.",
    points: [
      "Bonded & general storage",
      "Pick, pack & kitting",
      "Inventory management",
      "Regional distribution",
    ],
  },
  {
    slug: "insurance-risk",
    icon: ShieldIcon,
    title: "Insurance & Risk",
    summary:
      "Cargo insurance and proactive risk management that protect the value of every shipment, from warehouse to final delivery.",
    points: [
      "All-risk cargo cover",
      "Claims handling & recovery",
      "Route & carrier risk scoring",
      "Trade credit guidance",
    ],
  },
  {
    slug: "supply-chain",
    icon: LayersIcon,
    title: "End-to-end Supply Chain",
    summary:
      "One accountable partner across the whole chain — planning, orchestration, and visibility that turn logistics into an advantage.",
    points: [
      "Network design & planning",
      "Multi-modal orchestration",
      "Real-time tracking & analytics",
      "Dedicated account teams",
    ],
  },
];

/** Home page shows a focused preview of four representative services. */
export const featuredServiceSlugs = [
  "manufacturing-fulfillment",
  "sourcing-matchmaking",
  "ocean-freight",
  "customs-compliance",
];

export type Industry = {
  icon: Icon;
  title: string;
  blurb: string;
};

/** Industries / "what we trade" (BUILD_BRIEF §6 /industries). */
export const industries: Industry[] = [
  {
    icon: WheatIcon,
    title: "Agriculture & Food",
    blurb:
      "Grains, produce, and perishables moved under strict cold-chain and phytosanitary controls.",
  },
  {
    icon: CogIcon,
    title: "Machinery & Equipment",
    blurb:
      "Heavy plant, industrial machinery, and oversized cargo with specialized rigging and handling.",
  },
  {
    icon: ShirtIcon,
    title: "Textiles & Apparel",
    blurb:
      "Fabrics, garments, and finished apparel with fast, consolidated seasonal replenishment.",
  },
  {
    icon: CpuIcon,
    title: "Electronics",
    blurb:
      "High-value electronics and components with secure, insured, temperature-aware transit.",
  },
  {
    icon: LayersIcon,
    title: "Raw Materials & Metals",
    blurb:
      "Ores, metals, and bulk commodities via breakbulk and dry-bulk carriers at scale.",
  },
  {
    icon: BeakerIcon,
    title: "Chemicals",
    blurb:
      "Hazardous and non-hazardous chemicals handled to full IMDG and dangerous-goods standards.",
  },
  {
    icon: CarIcon,
    title: "Automotive",
    blurb:
      "Vehicles, parts, and just-in-time components synchronized to production schedules.",
  },
  {
    icon: CartIcon,
    title: "Consumer Goods",
    blurb:
      "Retail and e-commerce goods with fulfillment and distribution close to end markets.",
  },
];

export type Value = {
  icon: Icon;
  title: string;
  blurb: string;
};

/** "Why Meridian" value props (BUILD_BRIEF §6 home). */
export const whyMeridian: Value[] = [
  {
    icon: CogIcon,
    title: "We make it ourselves",
    blurb:
      "Meridian is a manufacturer first — we produce to spec and control quality from the production line up, not just move what others build.",
  },
  {
    icon: RouteIcon,
    title: "One partner, end to end",
    blurb:
      "Make, source, or ship — it's all under one roof, with no handoffs, no gaps, and no finger-pointing between vendors.",
  },
  {
    icon: ShieldIcon,
    title: "Quality & compliance",
    blurb:
      "In-line quality control and licensed trade specialists who get products built right and cleared cleanly, the first time.",
  },
  {
    icon: EyeIcon,
    title: "Real-time visibility",
    blurb:
      "Live milestones from factory floor to final delivery, so you always know where your order stands.",
  },
];

/** Company values (BUILD_BRIEF §6 /about). */
export const companyValues: Value[] = [
  {
    icon: ShieldIcon,
    title: "Integrity",
    blurb:
      "We do what we say, disclose what we find, and price honestly — trust is the cargo we can't afford to damage.",
  },
  {
    icon: RouteIcon,
    title: "Reliability",
    blurb:
      "Deadlines are commitments. We plan for contingencies so your supply chain holds under pressure.",
  },
  {
    icon: GlobeIcon,
    title: "Global mindset",
    blurb:
      "Local knowledge in every market we serve, connected by one accountable global network.",
  },
  {
    icon: LeafIcon,
    title: "Sustainability",
    blurb:
      "Smarter routing, fuller loads, and lower-carbon modes — efficiency that's good for cost and climate.",
  },
];
