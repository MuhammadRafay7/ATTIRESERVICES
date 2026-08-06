/**
 * Seeds the CMS tables from the content currently committed in `src/lib`.
 *
 * It imports those modules rather than restating them, so there is no second
 * copy of the content to drift. Icons arrive here as React components; only
 * their function name is stored, and `resolveIcon` turns it back into a
 * component at render time.
 *
 * Safe to re-run: every table is upserted on a natural key, so re-seeding
 * refreshes the defaults without duplicating rows. It will overwrite edits
 * made in the admin panel, so treat it as "reset to defaults".
 *
 *   npx tsx scripts/db-seed.mts
 */
import { readFileSync } from "node:fs";
import pg from "pg";

import {
  site,
  nav,
  stats,
  credentials,
  commercialTerms,
  offices,
  marketRegions,
  tradeLanes,
  geo,
} from "../src/lib/site";
import {
  heroFacts,
  pillars,
  divisions,
  services,
  productCategories,
  manufacturingProcess,
  whyAttireServices,
  companyValues,
  qualityControls,
  faqs,
} from "../src/lib/content";

// --- env -------------------------------------------------------------------
function loadEnv(file: string): Record<string, string> {
  try {
    return Object.fromEntries(
      readFileSync(file, "utf8")
        .split("\n")
        .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
        .map((l) => {
          const i = l.indexOf("=");
          return [
            l.slice(0, i).trim(),
            l.slice(i + 1).trim().replace(/^"|"$/g, ""),
          ];
        }),
    );
  } catch {
    return {};
  }
}

const env = { ...loadEnv(".env.local"), ...process.env };
if (!env.DIRECT_URL) {
  console.error("DIRECT_URL is not set.");
  process.exit(1);
}

/** Icons come in as components; the database only ever holds the name. */
const named = <T extends { icon?: unknown }>(item: T) => ({
  ...item,
  icon:
    typeof item.icon === "function"
      ? ((item.icon as { name?: string }).name ?? null)
      : null,
});

// --- theme -----------------------------------------------------------------
// Mirrors the `:root` block in globals.css. These are injected back as CSS
// custom properties at runtime, which is what makes the theme admin-editable
// without touching a stylesheet.
const themeTokens = {
  bg: "#ffffff",
  "bg-subtle": "#f5f7f9",
  "bg-muted": "#e9eef2",
  "bg-inset": "#fafbfc",
  line: "#dde4ea",
  "line-strong": "#bfcad4",
  ink: "#0b1b2b",
  "ink-body": "#3a4854",
  "ink-muted": "#5c6b78",
  "ink-faint": "#8695a2",
  accent: "#0e5c8c",
  "accent-strong": "#0a4568",
  "accent-soft": "#3a8dc0",
  "accent-wash": "#eaf2f8",
  brass: "#a97430",
  "brass-soft": "#d2a462",
  "brass-wash": "#f7f1e7",
  deep: "#061727",
  "deep-2": "#0b2438",
  "deep-3": "#123049",
  "on-deep": "#e4ecf3",
  "on-deep-muted": "#8da2b4",
  positive: "#1a6b4f",
  danger: "#b3261e",
  radius: "8px",
  "radius-sm": "5px",
  container: "1240px",
};


// --- legal documents -------------------------------------------------------
// Footer policies. Held as content so the admin edits them like any other
// list; each renders at /legal/<slug>. Bodies are plain paragraphs separated
// by a blank line.
const legalDocuments = [
  {
    slug: "privacy-notice",
    title: "Privacy notice",
    summary: "What we collect when you contact us, why, and how long we keep it.",
    body: [
      "This notice explains how Attire Services B.V. handles personal data collected through this website and in the course of a commercial relationship.",
      "When you submit an enquiry we collect the name, company, email address, country and any details you choose to include. We use them solely to respond to the enquiry and to administer any resulting order. We do not sell personal data and we do not use it for advertising.",
      "Enquiry records are retained for 24 months from last contact. Records connected to a placed order are retained for seven years, in line with the traceability and customs obligations described in our terms of trade.",
      "You may request access to, correction of, or deletion of your personal data at any time by writing to the contact address published on this site. Where processing is governed by the GDPR you also have the right to lodge a complaint with your national supervisory authority.",
      "This site sets no advertising or tracking cookies.",
    ].join("\n\n"),
  },
  {
    slug: "terms-of-trade",
    title: "Terms of trade",
    summary: "Standard commercial terms governing quotation, order and delivery.",
    body: [
      "These terms govern all quotations, order confirmations and deliveries made by Attire Services B.V. unless varied in writing in a signed programme agreement.",
      "Quotation and order. Quotations are valid for 30 days and are based on the specification supplied. Bulk production does not begin until a pre-production sample has been approved in writing. Changes to specification after PP approval are re-quoted.",
      "Delivery and risk. Goods are supplied under Incoterms 2020 on the term stated in the order confirmation — EXW, FOB, CIF or DDP. Risk and cost transfer at the point defined by the elected term.",
      "Inspection and non-conformance. Final random inspection is performed to ISO 2859-1 at AQL 2.5. Non-conforming lots are reworked or replaced at our cost. A non-conformance report is issued within 24 hours of detection and a corrective action plan within three working days.",
      "Payment. Standard terms are 30% deposit against order confirmation and 70% against bill of lading, settled in USD, EUR or GBP. Extended terms are available subject to credit review.",
      "Liability. Attire Services acts as principal on every order, including goods bought from a partner mill. Liability for a defective lot rests with us and is not passed through to the producing supplier.",
      "Governing law. These terms are governed by the laws of the Netherlands, with exclusive jurisdiction in the courts of Rotterdam.",
    ].join("\n\n"),
  },
  {
    slug: "supplier-code-of-conduct",
    title: "Supplier code of conduct",
    summary: "The standards every mill and factory in our network agrees to.",
    body: [
      "Every supplier in the Attire Services network accepts this code as a condition of appointment. It is verified by audit, not by declaration.",
      "Labour. No forced, bonded or involuntary labour. No child labour: the minimum age is 15, or the local statutory minimum where it is higher. Workers are free to associate and to bargain collectively. Wages meet or exceed the legal minimum and are paid on time and in full.",
      "Working hours. Regular hours do not exceed 48 per week. Overtime is voluntary, paid at a premium, and does not exceed 12 hours per week other than in exceptional, documented circumstances.",
      "Health and safety. Suppliers provide a safe workplace, functioning fire detection and unobstructed emergency egress, appropriate protective equipment, and potable water and sanitation.",
      "Environment. Suppliers hold current discharge and emissions permits, manage chemical inventories against our restricted substances list, and treat effluent before discharge.",
      "Subcontracting. Undisclosed subcontracting is a terminating breach. Any production placed outside the audited site requires our written approval in advance.",
      "Audit. Suppliers grant unannounced access during production hours to our staff and to third-party inspection bodies. Findings are subject to a time-bound corrective action plan; unresolved critical findings end the relationship.",
    ].join("\n\n"),
  },
  {
    slug: "modern-slavery-statement",
    title: "Modern slavery statement",
    summary: "Steps taken to identify and prevent forced labour in our supply chain.",
    body: [
      "This statement sets out the steps Attire Services B.V. takes to identify, prevent and address forced labour and human trafficking in its operations and supply chain.",
      "Our structure. We operate two owned production sites, two sourcing offices and two commercial offices, and we buy from a network of qualified mills and factories. We contract as principal with every supplier, which means we hold the relationship and the responsibility directly rather than through an agent.",
      "Due diligence. Suppliers are qualified before appointment and re-audited every 12 months, or immediately on any change of site or ownership. Audits are conducted against SMETA 4-Pillar and our supplier code of conduct, and include worker interviews conducted without management present.",
      "Risk areas. We treat recruitment fees, retained identity documents, unexplained wage deductions, and undisclosed subcontracting as the highest-risk indicators. Any of these triggers immediate escalation and suspension of new order placement pending resolution.",
      "Training. Sourcing and quality staff receive annual training on identifying indicators of forced labour during site visits.",
      "Reporting. Concerns may be raised confidentially through the contact address published on this site. Reports are investigated and reporters are protected from retaliation by policy.",
    ].join("\n\n"),
  },
];

// --- collections -----------------------------------------------------------
const collections: Record<string, unknown[]> = {
  nav: nav.map((n) => ({ ...n })),
  hero_facts: heroFacts.map((f) => ({ ...f })),
  stats: stats.map((s) => ({ ...s })),
  credentials: credentials.map((c) => ({ ...c })),
  commercial_terms: commercialTerms.map((t) => ({ ...t })),
  market_regions: marketRegions.map((m) => ({ ...m })),
  trade_lanes: tradeLanes.map((l) => ({ ...l })),
  quality_controls: qualityControls.map((text) => ({ text })),
  faqs: faqs.map((f) => ({ ...f })),
  // Offices carry their coordinates so the globe and the flat map read from
  // one record rather than a separate lookup table.
  offices: offices.map((o) => ({ ...o, ...(geo[o.city] ?? {}) })),
  pillars: pillars.map(named),
  divisions: divisions.map(named),
  services: services.map(named),
  product_categories: productCategories.map(named),
  process_steps: manufacturingProcess.map(named),
  why_points: whyAttireServices.map(named),
  company_values: companyValues.map(named),
  legal_documents: legalDocuments,
};

// --- pages and their sections ---------------------------------------------
// `type` selects a renderer; the admin adds a block by picking a type and
// removes one by deleting the row.
const pages = [
  {
    slug: "/",
    title: `${site.name} — Apparel & Textile Import, Export and Sourcing`,
    description: site.description,
    nav_label: "Home",
    nav_order: 0,
    in_nav: false,
    sections: [
      "hero",
      "credential-strip",
      "divisions",
      "why",
      "portfolio",
      "footprint",
      "reference",
      "faq",
      "cta",
    ],
  },
  {
    slug: "/services",
    title: "Trade services",
    description:
      "Attire Services capability schedule across import & export and garment production — with stated minimum orders, lead times and producing sites.",
    nav_label: "Trade services",
    nav_order: 1,
    in_nav: true,
    sections: ["page-hero", "capability-schedule", "contracting", "commercial-terms", "cta"],
  },
  {
    slug: "/manufacturing",
    title: "Manufacturing",
    description:
      "Attire Services production and quality protocol — six order-lifecycle stages with named owners, AQL 2.5 inspection, lot-level traceability, capacity by site, and unannounced audit access.",
    nav_label: "Manufacturing",
    nav_order: 2,
    in_nav: true,
    sections: [
      "page-hero",
      "workflow",
      "capacity",
      "quality",
      "escalation",
      "export",
      "certification",
      "cta",
    ],
  },
  {
    slug: "/industries",
    title: "Product Portfolio",
    description:
      "Attire Services product portfolio across apparel, knitwear, outerwear, denim, workwear, tailoring, fabric, home textiles and trims — with minimum orders and material standards stated.",
    nav_label: "Portfolio",
    nav_order: 3,
    in_nav: true,
    sections: ["page-hero", "categories", "materials", "compliance", "cta"],
  },
  {
    slug: "/about",
    title: "Company",
    description:
      "Attire Services B.V. — founded 2004, six offices and sites across Europe, South Asia, Southeast Asia and North America, 1,570 employees, governed by ISO 9001, AEO-F and SMETA audit.",
    nav_label: "Company",
    nav_order: 4,
    in_nav: true,
    sections: ["page-hero", "position", "history", "sites", "principles", "leadership", "cta"],
  },
  {
    slug: "/contact",
    title: "Contact",
    description:
      "Open a sourcing enquiry with Attire Services. Acknowledged within one business day with a costed bill of materials, a shipping window and the applicable Incoterms.",
    nav_label: "Contact",
    nav_order: 5,
    in_nav: true,
    sections: ["page-hero", "enquiry-form", "terms-reminder"],
  },
];

// --- run -------------------------------------------------------------------
const client = new pg.Client({
  connectionString: env.DIRECT_URL,
  ssl: { rejectUnauthorized: false },
});

await client.connect();
try {
  await client.query("begin");

  await client.query(
    `insert into settings (id, data) values (true, $1)
     on conflict (id) do update set data = excluded.data`,
    [JSON.stringify({ ...site, nav })],
  );

  await client.query(
    `insert into theme (id, tokens) values (true, $1)
     on conflict (id) do update set tokens = excluded.tokens`,
    [JSON.stringify(themeTokens)],
  );

  // Replace each collection wholesale so removed defaults don't linger.
  let itemCount = 0;
  for (const [collection, items] of Object.entries(collections)) {
    await client.query("delete from content_items where collection = $1", [collection]);
    for (const [i, data] of items.entries()) {
      await client.query(
        `insert into content_items (collection, position, data) values ($1, $2, $3)`,
        [collection, i, JSON.stringify(data)],
      );
      itemCount++;
    }
  }

  let sectionCount = 0;
  for (const page of pages) {
    const { sections, ...row } = page;
    await client.query(
      `insert into pages (slug, title, description, nav_label, nav_order, in_nav)
       values ($1, $2, $3, $4, $5, $6)
       on conflict (slug) do update set
         title = excluded.title,
         description = excluded.description,
         nav_label = excluded.nav_label,
         nav_order = excluded.nav_order,
         in_nav = excluded.in_nav`,
      [row.slug, row.title, row.description, row.nav_label, row.nav_order, row.in_nav],
    );

    await client.query("delete from sections where page_slug = $1", [row.slug]);
    for (const [i, type] of sections.entries()) {
      await client.query(
        `insert into sections (page_slug, type, position) values ($1, $2, $3)`,
        [row.slug, type, i],
      );
      sectionCount++;
    }
  }

  await client.query("commit");
  console.log(
    `seeded: 1 settings, 1 theme, ${itemCount} content items across ` +
      `${Object.keys(collections).length} collections, ${pages.length} pages, ` +
      `${sectionCount} sections`,
  );
} catch (err) {
  await client.query("rollback");
  throw err;
} finally {
  await client.end();
}
