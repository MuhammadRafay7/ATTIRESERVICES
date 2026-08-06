/**
 * Central place for all brand data.
 * Swap these values to rebrand — name, contact, figures, nav and credentials
 * are all defined here so there is one file to find-and-replace.
 */

export const site = {
  name: "Attire Services",
  wordmark: "ATTIRE SERVICES",
  descriptor: "Apparel Import · Export · Sourcing",
  tagline:
    "Apparel and textile import, export and sourcing, with owned production behind it.",
  shortTagline: "One counterparty from mill to port of destination.",
  description:
    "Attire Services is an apparel and textile trading house. We source, import and export finished garments, fabric and trim into 120+ markets under Incoterms 2020, backed by 30 owned production lines and a qualified mill network. ISO 9001, AEO-F and SMETA-audited throughout.",
  url: "https://www.attireservices.com",
  founded: 2004,
  legalEntity: "Attire Services B.V.",
  registration: "NL 8234 51 097",
  duns: "D-U-N-S 41-882-6103",
  contact: {
    email: "mrtrades2005@gmail.com",
    // Telephone withheld for now. Restore the line below and uncomment the
    // blocks marked "phone — commented out" in Header, Footer, CTABand and
    // the contact page to bring it back.
    // phone: "+1 (212) 555-0148",
    address: "1 Harbor Point, Suite 2400, New York, NY 10004, USA",
  },
  responseSla: "One business day",
  social: {
    linkedin: "#",
    x: "#",
  },
} as const;

export const nav = [
  { label: "Trade services", href: "/services" },
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "Portfolio", href: "/industries" },
  { label: "Company", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/** Headline operating figures reused on the home + about pages. Trade first. */
export const stats = [
  { value: "120+", label: "Markets served", note: "Six continents, DDP capable" },
  { value: "2,400", label: "TEU shipped / year", note: "Ocean, air and rail" },
  { value: "12.1M", label: "Units handled / year", note: "Own lines and partner mills" },
  { value: "97.8%", label: "On-time shipment", note: "Against confirmed ETD" },
] as const;

/** Formal credentials with scope and validity — procurement due-diligence facing. */
export const credentials = [
  {
    code: "ISO 9001:2015",
    scope: "Quality management system",
    body: "SGS",
    valid: "2027",
  },
  {
    code: "ISO 14001:2015",
    scope: "Environmental management",
    body: "SGS",
    valid: "2027",
  },
  {
    code: "AEO-F",
    scope: "Authorised Economic Operator",
    body: "Dutch Customs",
    valid: "Continuous",
  },
  {
    code: "SMETA 4-Pillar",
    scope: "Ethical trade audit",
    body: "Sedex",
    valid: "Annual",
  },
  {
    code: "OEKO-TEX 100",
    scope: "Textile substance testing",
    body: "Hohenstein",
    valid: "2026",
  },
  {
    code: "GOTS 7.0",
    scope: "Organic chain of custody",
    body: "Control Union",
    valid: "2026",
  },
  {
    code: "amfori BSCI",
    scope: "Social compliance",
    body: "amfori",
    valid: "Annual",
  },
  {
    code: "REACH / SVHC",
    scope: "EU chemical compliance",
    body: "Intertek",
    valid: "Continuous",
  },
] as const;

/** Commercial terms surfaced early — the questions procurement asks first. */
export const commercialTerms = [
  { term: "Incoterms 2020", value: "EXW · FOB · CIF · DDP" },
  { term: "Consolidation", value: "FCL · LCL · air · rail" },
  { term: "Minimum order", value: "200 units / style / colourway" },
  { term: "Sampling lead time", value: "10–15 working days" },
  { term: "Bulk lead time", value: "35–60 working days" },
  { term: "Payment terms", value: "30% deposit · 70% against B/L" },
  { term: "Settlement currencies", value: "USD · EUR · GBP" },
] as const;

/** Trade, sourcing and production sites — the operating footprint. */
export const offices = [
  {
    city: "Rotterdam",
    country: "Netherlands",
    region: "Europe",
    role: "Group headquarters · EU customs and distribution",
    lines: 0,
    headcount: 90,
  },
  {
    city: "New York",
    country: "United States",
    region: "North America",
    role: "Commercial · Americas client services",
    lines: 0,
    headcount: 40,
  },
  {
    city: "İzmir",
    country: "Türkiye",
    region: "EMEA",
    role: "Garment · Knitwear · Woven textiles",
    lines: 14,
    headcount: 470,
  },
  {
    city: "Ho Chi Minh City",
    country: "Vietnam",
    region: "Southeast Asia",
    role: "Garment · Outerwear · Workwear",
    lines: 16,
    headcount: 710,
  },
  {
    city: "Dhaka",
    country: "Bangladesh",
    region: "South Asia",
    role: "Sourcing office · Vendor qualification and QA",
    lines: 0,
    headcount: 140,
  },
  {
    city: "Chennai",
    country: "India",
    region: "South Asia",
    role: "Sourcing office · Consolidation and export",
    lines: 0,
    headcount: 120,
  },
] as const;

/** Named export markets — reach stated concretely rather than as a slogan. */
export const marketRegions = [
  { region: "European Union", detail: "27 markets · DDP, EORI registered" },
  { region: "United Kingdom", detail: "UKCA marking · customs handled in full" },
  { region: "North America", detail: "USA, Canada, Mexico · CTPAT-aligned" },
  { region: "Middle East", detail: "GCC · SASO and G-Mark conformity" },
  { region: "Asia Pacific", detail: "Japan, Korea, Australia, Singapore" },
  { region: "Latin America", detail: "Brazil, Chile, Colombia · consolidated freight" },
] as const;

/**
 * Trade lanes drawn on the globe. Coordinates are real port/city positions —
 * the arcs animate origin → destination in the hero.
 */
export const tradeLanes = [
  { from: "İzmir", to: "Rotterdam" },
  { from: "Dhaka", to: "Rotterdam" },
  { from: "Chennai", to: "Rotterdam" },
  { from: "Ho Chi Minh City", to: "Rotterdam" },
  { from: "Rotterdam", to: "New York" },
] as const;

/** Latitude / longitude for every node the globe renders. */
export const geo: Record<string, { lat: number; lon: number }> = {
  Rotterdam: { lat: 51.92, lon: 4.48 },
  "New York": { lat: 40.71, lon: -74.01 },
  "İzmir": { lat: 38.42, lon: 27.14 },
  "Ho Chi Minh City": { lat: 10.82, lon: 106.63 },
  Dhaka: { lat: 23.81, lon: 90.41 },
  Chennai: { lat: 13.08, lon: 80.27 },
};
