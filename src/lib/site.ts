/**
 * Central place for all placeholder brand data (BUILD_BRIEF §3).
 * Swap these values to rebrand — name, contact, stats, nav, and content
 * are all defined here so there's one file to find-and-replace.
 */

export const site = {
  name: "Meridian Global Trade",
  wordmark: "MERIDIAN",
  tagline: "We make it, source it, and move it — worldwide.",
  shortTagline: "Make it. Source it. Move it.",
  description:
    "Meridian Global Trade is your end-to-end trade partner: we manufacture and fulfill orders, connect you with vetted manufacturers worldwide, and handle the import & export of every category of goods — ocean, air, land, customs, and warehousing.",
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
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/** Headline trust stats reused on the home + about pages. Manufacturing-led. */
export const stats = [
  { value: "8M+", label: "Units produced yearly" },
  { value: "350+", label: "Manufacturing partners" },
  { value: "120+", label: "Countries served" },
  { value: "99.4%", label: "On-time fulfillment" },
] as const;

export const partners = [
  "ISO 9001",
  "WCO SAFE",
  "IATA",
  "AEO",
  "C-TPAT",
  "FIATA",
] as const;

/** Trade lanes scrolled in the marquee ticker — reinforces the freight story. */
export const tradeLanes = [
  "Shanghai → Rotterdam",
  "New York → Singapore",
  "Dubai → São Paulo",
  "Hamburg → Los Angeles",
  "Busan → Antwerp",
  "Santos → Shenzhen",
  "Mumbai → New York",
  "Jebel Ali → Felixstowe",
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
