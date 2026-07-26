/**
 * Central place for all placeholder brand data.
 * Swap these values to rebrand — name, contact, figures, nav and credentials
 * are all defined here so there is one file to find-and-replace.
 */

export const site = {
  name: "Ostenmark",
  wordmark: "OSTENMARK",
  descriptor: "Garments · Leather · Import & Export",
  tagline:
    "Garment manufacturing, leather manufacturing, and import & export.",
  shortTagline: "Owned production. Audited supply chain. Global export.",
  description:
    "Ostenmark operates three divisions: garment manufacturing, leather manufacturing, and import & export. Six owned sites, 49 production lines, 18.6M units of annual capacity, and trade into 120+ markets under Incoterms 2020. ISO 9001 and SMETA-audited throughout.",
  url: "https://www.ostenmark.com",
  founded: 2004,
  legalEntity: "Ostenmark Group B.V.",
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
  { label: "Capabilities", href: "/services" },
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "Portfolio", href: "/industries" },
  { label: "Company", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/** Headline operating figures reused on the home + about pages. */
export const stats = [
  { value: "12.1M", label: "Garment units / year", note: "30 lines · İzmir, HCMC" },
  { value: "6.5M", label: "Leather units / year", note: "19 lines · Porto, Chennai" },
  { value: "120+", label: "Markets traded", note: "2,400 TEU exported" },
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
    code: "LWG Gold",
    scope: "Tannery environmental rating",
    body: "Leather Working Group",
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
  { term: "Minimum order", value: "150 units / style / colourway" },
  { term: "Sampling lead time", value: "10–15 working days" },
  { term: "Bulk lead time", value: "35–60 working days" },
  { term: "Payment terms", value: "30% deposit · 70% against B/L" },
  { term: "Settlement currencies", value: "USD · EUR · GBP" },
] as const;

/** Production and commercial sites — the operating footprint. */
export const offices = [
  {
    city: "Rotterdam",
    country: "Netherlands",
    region: "Europe",
    role: "Group headquarters · EU distribution",
    lines: 0,
    headcount: 90,
  },
  {
    city: "Porto",
    country: "Portugal",
    region: "Europe",
    role: "Leather goods · Footwear",
    lines: 11,
    headcount: 340,
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
    city: "Chennai",
    country: "India",
    region: "South Asia",
    role: "Leather goods · Tannery-adjacent",
    lines: 8,
    headcount: 310,
  },
  {
    city: "Ho Chi Minh City",
    country: "Vietnam",
    region: "Southeast Asia",
    role: "Garment · Outerwear · Footwear",
    lines: 16,
    headcount: 710,
  },
  {
    city: "New York",
    country: "United States",
    region: "North America",
    role: "Commercial · Client services",
    lines: 0,
    headcount: 40,
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
