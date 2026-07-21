/**
 * Central place for all placeholder brand data (BUILD_BRIEF §3).
 * Swap these values to rebrand — name, contact, stats, nav, and content
 * are all defined here so there's one file to find-and-replace.
 */

export const site = {
  name: "Meridian Global Trade",
  wordmark: "MERIDIAN",
  tagline: "Leather & textile manufacturing, made to your spec.",
  shortTagline: "We make it. We ship it.",
  description:
    "Meridian Global Trade is a textiles and leather goods manufacturer. We produce bags, footwear, apparel, and fabrics to your specification on our own floors, source materials from vetted mills and tanneries, and export finished goods worldwide.",
  url: "https://meridianglobaltrade.example.com",
  founded: 2004,
  contact: {
    email: "hello@meridianglobaltrade.com",
    phone: "+1 (212) 555-0148",
    address: "1 Harbor Point, Suite 2400, New York, NY 10004, USA",
  },
  social: {
    linkedin: "#",
    x: "#",
  },
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "Products", href: "/industries" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/** Headline trust stats reused on the home + about pages. Manufacturing-led. */
export const stats = [
  { value: "12M+", label: "Units produced yearly" },
  { value: "40+", label: "Production lines" },
  { value: "220+", label: "Material partners" },
  { value: "99.4%", label: "QC pass rate" },
] as const;

export const partners = [
  "ISO 9001",
  "WCO SAFE",
  "IATA",
  "AEO",
  "C-TPAT",
  "FIATA",
] as const;

/** Capability / material terms scrolled in the marquee ticker. */
export const tradeLanes = [
  "Full-grain leather",
  "Vegetable-tanned hides",
  "Cut & sew",
  "OEKO-TEX cotton",
  "Goodyear welt",
  "Private label & OEM",
  "Woven & knit textiles",
  "Hand-finished",
  "Small-batch to bulk",
] as const;

/** Office hubs used on About + Contact. */
export const offices = [
  { city: "Rotterdam", region: "Europe" },
  { city: "Singapore", region: "Asia Pacific" },
  { city: "Dubai", region: "Middle East" },
  { city: "Shanghai", region: "East Asia" },
  { city: "New York", region: "North America" },
  { city: "São Paulo", region: "South America" },
] as const;
