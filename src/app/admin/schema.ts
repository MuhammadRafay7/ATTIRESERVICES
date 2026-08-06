/**
 * Field definitions for every collection.
 *
 * The first version of this panel edited each row as raw JSON. That works for
 * a developer and is hostile to anyone else — so each collection now declares
 * its fields, and the editor renders a real control per type: an upload box
 * for images, a picker for icons, one-per-line inputs for bullet lists.
 *
 * Anything present in the stored row but absent from the schema is preserved
 * untouched and shown under "Other fields", so an unmodelled key is never
 * silently dropped.
 */

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "image"
  | "icon"
  | "list"
  | "pairs"
  | "select";

export type FieldDef = {
  name: string;
  label: string;
  type: FieldType;
  hint?: string;
  /** `pairs` renders two columns; these name them. */
  pairKeys?: [string, string];
  /** `select` options. */
  options?: string[];
  /** Rows for a textarea. */
  rows?: number;
};

export type CollectionSchema = {
  label: string;
  hint: string;
  /** Which field to show as the row's title in the list. */
  titleField: string;
  /** Optional second line, so a list row carries information not just a name. */
  subtitleField?: string;
  fields: FieldDef[];
};

const ICON = (name = "icon"): FieldDef => ({
  name,
  label: "Icon",
  type: "icon",
  hint: "Shown in the coloured square.",
});

export const schemas: Record<string, CollectionSchema> = {
  nav: {
    label: "Header menu",
    hint: "The links across the top of every page, in order.",
    titleField: "label",
    subtitleField: "href",
    fields: [
      { name: "label", label: "Menu label", type: "text" },
      { name: "href", label: "Links to", type: "text", hint: "A path such as /services" },
    ],
  },

  hero_facts: {
    label: "Hero figures",
    hint: "The four-figure strip beneath the homepage headline.",
    titleField: "label",
    subtitleField: "value",
    fields: [
      { name: "value", label: "Figure", type: "text", hint: "e.g. 120+ or 2,400" },
      { name: "label", label: "Caption", type: "text" },
    ],
  },

  stats: {
    label: "Headline figures",
    hint: "Operating numbers used on the company page.",
    titleField: "label",
    subtitleField: "note",
    fields: [
      { name: "value", label: "Figure", type: "text" },
      { name: "label", label: "Caption", type: "text" },
      { name: "note", label: "Supporting note", type: "text" },
    ],
  },

  credentials: {
    label: "Certifications",
    hint: "The register shown in the footer, the credential strip and the due-diligence table.",
    titleField: "code",
    subtitleField: "scope",
    fields: [
      { name: "code", label: "Standard", type: "text", hint: "e.g. ISO 9001:2015" },
      { name: "scope", label: "Scope", type: "text" },
      { name: "body", label: "Certifying body", type: "text" },
      { name: "valid", label: "Valid to", type: "text", hint: "A year, or Annual / Continuous" },
    ],
  },

  commercial_terms: {
    label: "Commercial terms",
    hint: "The standard terms table.",
    titleField: "term",
    subtitleField: "value",
    fields: [
      { name: "term", label: "Term", type: "text" },
      { name: "value", label: "Value", type: "text" },
    ],
  },

  market_regions: {
    label: "Export markets",
    hint: "Regions listed beside the footprint map.",
    titleField: "region",
    subtitleField: "detail",
    fields: [
      { name: "region", label: "Region", type: "text" },
      { name: "detail", label: "Detail", type: "text" },
    ],
  },

  trade_lanes: {
    label: "Trade lanes",
    hint: "Routes drawn on the footprint map. Both names must match an office exactly.",
    titleField: "from",
    subtitleField: "to",
    fields: [
      { name: "from", label: "From", type: "text" },
      { name: "to", label: "To", type: "text" },
    ],
  },

  quality_controls: {
    label: "Quality controls",
    hint: "The inspection checklist on the manufacturing page.",
    titleField: "text",
    fields: [{ name: "text", label: "Control", type: "textarea", rows: 2 }],
  },

  faqs: {
    label: "FAQ",
    hint: "Shown on the homepage and published as structured data for search engines.",
    titleField: "q",
    subtitleField: "a",
    fields: [
      { name: "q", label: "Question", type: "textarea", rows: 2 },
      { name: "a", label: "Answer", type: "textarea", rows: 6 },
    ],
  },

  offices: {
    label: "Offices & sites",
    hint: "Coordinates position the marker on the map and the globe.",
    titleField: "city",
    subtitleField: "role",
    fields: [
      { name: "city", label: "City", type: "text" },
      { name: "country", label: "Country", type: "text" },
      { name: "region", label: "Region", type: "text" },
      { name: "role", label: "Function", type: "text" },
      { name: "lines", label: "Production lines", type: "number", hint: "0 for a non-production office." },
      { name: "headcount", label: "Headcount", type: "number" },
      { name: "lat", label: "Latitude", type: "number" },
      { name: "lon", label: "Longitude", type: "number" },
    ],
  },

  pillars: {
    label: "Engagement models",
    hint: "The three ways a client can contract.",
    titleField: "title",
    subtitleField: "blurb",
    fields: [
      ICON(),
      { name: "code", label: "Reference", type: "text", hint: "e.g. 01" },
      { name: "title", label: "Title", type: "text" },
      { name: "blurb", label: "Description", type: "textarea", rows: 4 },
      { name: "points", label: "Bullet points", type: "list", hint: "One per line." },
    ],
  },

  divisions: {
    label: "What we do",
    hint: "The three cards on the homepage.",
    titleField: "title",
    subtitleField: "blurb",
    fields: [
      ICON(),
      { name: "code", label: "Reference", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "blurb", label: "Description", type: "textarea", rows: 4 },
      { name: "image", label: "Photograph", type: "image" },
      { name: "imageAlt", label: "Image description", type: "text", hint: "Read aloud by screen readers." },
      { name: "caption", label: "Caption", type: "text", hint: "Shown top-right of the card." },
      { name: "facts", label: "Figures", type: "pairs", pairKeys: ["value", "label"], hint: "Figure and its caption." },
      { name: "points", label: "Bullet points", type: "list" },
    ],
  },

  services: {
    label: "Capability schedule",
    hint: "Each line on the trade services page.",
    titleField: "title",
    subtitleField: "summary",
    fields: [
      ICON(),
      { name: "code", label: "Reference", type: "text", hint: "e.g. TRD-01" },
      { name: "title", label: "Title", type: "text" },
      { name: "slug", label: "Slug", type: "text", hint: "Lowercase, hyphenated. Used as a stable key." },
      { name: "division", label: "Group", type: "select", options: ["trade", "garment"] },
      { name: "summary", label: "Summary", type: "textarea", rows: 4 },
      { name: "points", label: "Scope of work", type: "list" },
      { name: "specs", label: "Specification", type: "pairs", pairKeys: ["key", "value"] },
    ],
  },

  product_categories: {
    label: "Portfolio",
    hint: "Product categories on the portfolio page and the homepage preview.",
    titleField: "title",
    subtitleField: "detail",
    fields: [
      ICON(),
      { name: "code", label: "Reference", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "blurb", label: "Description", type: "textarea", rows: 3 },
      { name: "detail", label: "Detail line", type: "text", hint: "Minimum order, finish, etc." },
      { name: "image", label: "Photograph", type: "image", hint: "Leave empty to draw a technical plate instead." },
      { name: "plate", label: "Technical plate", type: "select", options: ["", "fabric", "apparel", "workwear", "upholstery", "trims"], hint: "Used only when there is no photograph." },
    ],
  },

  process_steps: {
    label: "Order lifecycle",
    hint: "The six stages, each with an owner and a duration.",
    titleField: "title",
    subtitleField: "owner",
    fields: [
      ICON(),
      { name: "step", label: "Number", type: "text", hint: "e.g. 01" },
      { name: "title", label: "Title", type: "text" },
      { name: "blurb", label: "Description", type: "textarea", rows: 4 },
      { name: "duration", label: "Duration", type: "text" },
      { name: "owner", label: "Owner", type: "text" },
    ],
  },

  why_points: {
    label: "Why us",
    hint: "The argument block on the homepage.",
    titleField: "title",
    subtitleField: "blurb",
    fields: [
      ICON(),
      { name: "title", label: "Title", type: "text" },
      { name: "blurb", label: "Description", type: "textarea", rows: 5 },
    ],
  },

  company_values: {
    label: "Principles",
    hint: "How the company is run, on the company page.",
    titleField: "title",
    subtitleField: "blurb",
    fields: [
      ICON(),
      { name: "title", label: "Title", type: "text" },
      { name: "blurb", label: "Description", type: "textarea", rows: 4 },
    ],
  },

  legal_documents: {
    label: "Legal pages",
    hint: "Each becomes a page at /legal/<slug> and a link in the footer.",
    titleField: "title",
    subtitleField: "summary",
    fields: [
      { name: "title", label: "Page title", type: "text" },
      { name: "slug", label: "Web address", type: "text", hint: "Lowercase and hyphenated, e.g. privacy-notice" },
      { name: "summary", label: "Summary", type: "textarea", rows: 2, hint: "Shown under the heading and in search results." },
      { name: "body", label: "Body", type: "textarea", rows: 18, hint: "Separate paragraphs with a blank line. A paragraph starting “Label. ” gets a run-in heading." },
    ],
  },
  // --- previously hardcoded on the pages themselves ------------------------
  capacity_figures: {
    label: "Capacity figures",
    hint: "The four figures on the manufacturing page.",
    titleField: "label",
    subtitleField: "note",
    fields: [
      { name: "value", label: "Figure", type: "text" },
      { name: "label", label: "Caption", type: "text" },
      { name: "note", label: "Supporting note", type: "text" },
    ],
  },

  escalation_terms: {
    label: "Non-conformance terms",
    hint: "What happens, and how fast, when a lot fails inspection.",
    titleField: "term",
    subtitleField: "value",
    fields: [
      { name: "term", label: "Stage", type: "text" },
      { name: "value", label: "Commitment", type: "text" },
    ],
  },

  corporate_record: {
    label: "Corporate record",
    hint: "The registration table on the company page.",
    titleField: "term",
    subtitleField: "value",
    fields: [
      { name: "term", label: "Field", type: "text" },
      { name: "value", label: "Value", type: "text" },
    ],
  },

  leadership: {
    label: "Leadership",
    hint: "Named officers a client escalates to.",
    titleField: "name",
    subtitleField: "role",
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "role", label: "Role", type: "text" },
      { name: "detail", label: "Responsibility", type: "text" },
      { name: "initials", label: "Initials", type: "text", hint: "Two letters, shown in the avatar tile." },
    ],
  },

  milestones: {
    label: "Operating history",
    hint: "The dated timeline on the company page.",
    titleField: "year",
    subtitleField: "event",
    fields: [
      { name: "year", label: "Year", type: "text" },
      { name: "event", label: "What happened", type: "textarea", rows: 2 },
    ],
  },

  contact_routes: {
    label: "Direct routes",
    hint: "Where different kinds of enquiry should go.",
    titleField: "term",
    subtitleField: "value",
    fields: [
      { name: "term", label: "Enquiry type", type: "text" },
      { name: "value", label: "Route", type: "text" },
    ],
  },

  material_standards: {
    label: "Material standards",
    hint: "The testing regime table on the portfolio page.",
    titleField: "material",
    subtitleField: "standard",
    fields: [
      { name: "material", label: "Material", type: "text" },
      { name: "grades", label: "Grades handled", type: "text" },
      { name: "standard", label: "Standard", type: "text" },
      { name: "testing", label: "Testing applied", type: "text" },
    ],
  },

  compliance_constraints: {
    label: "Declared constraints",
    hint: "What is screened, declared and refused.",
    titleField: "term",
    subtitleField: "value",
    fields: [
      { name: "term", label: "Constraint", type: "text" },
      { name: "value", label: "Detail", type: "text" },
    ],
  },

  page_copy: {
    label: "Section copy",
    hint: "The eyebrow, heading and lead paragraph above each block on a page.",
    titleField: "title",
    subtitleField: "key",
    fields: [
      { name: "key", label: "Section", type: "text", hint: "page.section — do not change unless you know the renderer." },
      { name: "eyebrow", label: "Eyebrow", type: "text", hint: "The small monospaced label above the heading." },
      { name: "title", label: "Heading", type: "textarea", rows: 2 },
      { name: "lead", label: "Lead paragraph", type: "textarea", rows: 4 },
    ],
  },
};
