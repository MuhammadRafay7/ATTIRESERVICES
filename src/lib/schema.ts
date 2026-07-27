/**
 * JSON-LD builders. Everything here is derived from `site.ts` / `content.tsx`
 * so the structured data cannot drift from what the pages actually say —
 * rebranding or restating a figure updates the markup with it.
 *
 * Validate changes with https://search.google.com/test/rich-results.
 */

import { site, offices, credentials } from "@/lib/site";

const abs = (path: string) => new URL(path, site.url).toString();

/** Stable @id so other nodes can reference the organisation rather than repeat it. */
export const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;

/**
 * The published contact address. Parsed from the single string in site.ts so
 * there is still one place to edit it.
 * "1 Harbor Point, Suite 2400, New York, NY 10004, USA"
 */
const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: "1 Harbor Point, Suite 2400",
  addressLocality: "New York",
  addressRegion: "NY",
  postalCode: "10004",
  addressCountry: "US",
};

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalEntity,
    url: site.url,
    logo: abs("/icon.svg"),
    image: abs("/opengraph-image"),
    description: site.description,
    slogan: site.shortTagline,
    foundingDate: String(site.founded),
    email: site.contact.email,
    address: postalAddress,
    identifier: [
      {
        "@type": "PropertyValue",
        name: "D-U-N-S",
        value: site.duns.replace("D-U-N-S ", ""),
      },
      {
        "@type": "PropertyValue",
        name: "Company registration",
        value: site.registration,
      },
    ],
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: offices.reduce((total, office) => total + office.headcount, 0),
    },
    // Operating footprint — locality and country only, which is all we publish.
    location: offices.map((office) => ({
      "@type": "Place",
      name: `${site.name} ${office.city}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: office.city,
        addressCountry: office.country,
      },
      description: office.role,
    })),
    hasCredential: credentials.map((credential) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: credential.code,
      description: credential.scope,
      recognizedBy: { "@type": "Organization", name: credential.body },
    })),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: site.contact.email,
        availableLanguage: "English",
        areaServed: "Worldwide",
      },
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
  };
}

export function faqSchema(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/**
 * Breadcrumb trail. Home is prepended automatically, so callers pass only the
 * segments below it, e.g. `[{ name: "Company", href: "/about" }]`.
 */
export function breadcrumbSchema(trail: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", href: "/" }, ...trail].map(
      (crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: abs(crumb.href),
      }),
    ),
  };
}
