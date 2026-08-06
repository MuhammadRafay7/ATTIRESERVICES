/**
 * Admin navigation, grouped so each job has an obvious home.
 *
 * The groups matter more than the routes: someone editing the footer should
 * not have to know that "certification codes" happen to live in a collection
 * called `credentials`. Anything that appears in the footer is reachable from
 * the Footer tab, even where the underlying row is shared with a page.
 */
import type { LucideIcon } from "lucide-react";
import {
  Award,
  Banknote,
  Building2,
  Fingerprint,
  Globe2,
  Home,
  Layers,
  Link2,
  ListChecks,
  Mail,
  Map,
  Package,
  Palette,
  ScrollText,
  Workflow,
} from "lucide-react";

export type AdminLink = {
  href: string;
  label: string;
  hint?: string;
  icon?: LucideIcon;
};

export type AdminGroup = {
  title: string;
  links: AdminLink[];
};

export const adminNav: AdminGroup[] = [
  {
    title: "Pages",
    links: [
      { href: "/admin/pages/home", label: "Home", hint: "Hero, capability cards, portfolio preview, FAQ", icon: Home },
      { href: "/admin/pages/services", label: "Trade services", hint: "Capability schedule and engagement models", icon: ListChecks },
      { href: "/admin/pages/manufacturing", label: "Manufacturing", hint: "Order lifecycle, capacity, inspection", icon: Workflow },
      { href: "/admin/pages/industries", label: "Portfolio", hint: "Categories, material standards, constraints", icon: Package },
      { href: "/admin/pages/about", label: "Company", hint: "Record, history, sites, principles, leadership", icon: Building2 },
      { href: "/admin/pages/contact", label: "Contact", hint: "Enquiry routes and terms reminder", icon: Mail },
      { href: "/admin/content/legal_documents", label: "Legal pages", hint: "Privacy, terms, supplier code, modern slavery", icon: ScrollText },
    ],
  },
  {
    title: "Site-wide",
    links: [
      { href: "/admin/brand", label: "Name & positioning", hint: "Company name, wordmark, logo, tagline", icon: Fingerprint },
      { href: "/admin/contact", label: "Contact details", hint: "Email, address, response time, legal entity", icon: Mail },
      { href: "/admin/theme", label: "Theme & colours", hint: "Every colour, radius and width on the site", icon: Palette },
      { href: "/admin/navigation", label: "Header menu", hint: "Menu items and their order", icon: Link2 },
      { href: "/admin/footer", label: "Footer", hint: "Footer blurb, links, certifications, policies", icon: Layers },
    ],
  },
  {
    title: "Shared content",
    links: [
      { href: "/admin/content/offices", label: "Offices & sites", hint: "Used on Home, Company and Manufacturing", icon: Building2 },
      { href: "/admin/content/credentials", label: "Certifications", hint: "Used on Home, Manufacturing and the footer", icon: Award },
      { href: "/admin/content/commercial_terms", label: "Commercial terms", hint: "Used on Trade services and Contact", icon: Banknote },
      { href: "/admin/content/trade_lanes", label: "Trade lanes", hint: "Routes drawn on the footprint map", icon: Map },
      { href: "/admin/content/market_regions", label: "Export markets", hint: "Listed beside the footprint map", icon: Globe2 },
    ],
  },
];
