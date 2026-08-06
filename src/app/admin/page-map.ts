/**
 * What lives on each public page.
 *
 * The admin used to be organised by content type — one tab per collection —
 * which meant editing the company page took you to four different screens and
 * required knowing that "the four figures" are a collection called `stats`.
 * This maps the other way round: pick the page you want to change, and
 * everything on it is in one place, in the order it appears.
 *
 * Collections are still shared where the site shares them (certifications
 * appear on three pages), so editing one here updates every page that uses it.
 * Each entry says so.
 */
export type PageBlock = {
  /** A `content_items` collection key. */
  collection: string;
  /** Where on the page this block appears. */
  where: string;
  /** Set when the same collection also drives another page. */
  sharedWith?: string;
};

export type AdminPageDef = {
  slug: string;
  label: string;
  /** What the visitor sees this page as. */
  summary: string;
  blocks: PageBlock[];
};

export const adminPages: AdminPageDef[] = [
  {
    slug: "/",
    label: "Home",
    summary: "The landing page — hero, capability cards, portfolio preview and FAQ.",
    blocks: [
      { collection: "hero_facts", where: "Figure strip beneath the headline" },
      { collection: "credentials", where: "Certification strip", sharedWith: "Manufacturing, Footer" },
      { collection: "divisions", where: "“What we do” — three cards" },
      { collection: "why_points", where: "“Why us” argument block" },
      { collection: "product_categories", where: "Portfolio preview (first four)", sharedWith: "Portfolio" },
      { collection: "market_regions", where: "Footprint — market list" },
      { collection: "trade_lanes", where: "Footprint — routes on the map" },
      { collection: "offices", where: "Footprint — map markers", sharedWith: "Company, Manufacturing" },
      { collection: "faqs", where: "FAQ accordion" },
    ],
  },
  {
    slug: "/services",
    label: "Trade services",
    summary: "The capability schedule and how clients contract.",
    blocks: [
      { collection: "services", where: "Capability schedule" },
      { collection: "pillars", where: "Engagement models" },
      { collection: "commercial_terms", where: "Standard terms table", sharedWith: "Contact" },
    ],
  },
  {
    slug: "/manufacturing",
    label: "Manufacturing",
    summary: "Production protocol, capacity, inspection and escalation.",
    blocks: [
      { collection: "process_steps", where: "Order lifecycle — six stages" },
      { collection: "capacity_figures", where: "Capacity figures" },
      { collection: "offices", where: "Capacity by site table", sharedWith: "Home, Company" },
      { collection: "quality_controls", where: "Inspection regime checklist" },
      { collection: "escalation_terms", where: "Non-conformance commitments" },
      { collection: "credentials", where: "Certification register", sharedWith: "Home, Footer" },
    ],
  },
  {
    slug: "/industries",
    label: "Portfolio",
    summary: "Product categories, material standards and declared constraints.",
    blocks: [
      { collection: "product_categories", where: "Category grid", sharedWith: "Home" },
      { collection: "material_standards", where: "Material standards table" },
      { collection: "compliance_constraints", where: "Declared constraints" },
    ],
  },
  {
    slug: "/about",
    label: "Company",
    summary: "Corporate record, history, sites, principles and leadership.",
    blocks: [
      { collection: "corporate_record", where: "Registration table" },
      { collection: "stats", where: "Headline figures" },
      { collection: "milestones", where: "Operating history" },
      { collection: "offices", where: "Sites and functions table", sharedWith: "Home, Manufacturing" },
      { collection: "company_values", where: "Principles" },
      { collection: "leadership", where: "Accountable officers" },
    ],
  },
  {
    slug: "/contact",
    label: "Contact",
    summary: "The enquiry form, direct routes and the terms reminder.",
    blocks: [
      { collection: "contact_routes", where: "Direct routes table" },
      { collection: "offices", where: "Network list", sharedWith: "Home, Company" },
      { collection: "commercial_terms", where: "Terms reminder", sharedWith: "Trade services" },
    ],
  },
];

export const adminPageBySlug = Object.fromEntries(
  adminPages.map((p) => [p.slug, p]),
);

/** Route segment for a page tab — `/` becomes `home`. */
export const pageKey = (slug: string) =>
  slug === "/" ? "home" : slug.replace(/^\//, "");

export const slugFromKey = (key: string) => (key === "home" ? "/" : `/${key}`);
