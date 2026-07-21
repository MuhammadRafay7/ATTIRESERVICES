# Meridian Global Trade — Website Build Brief

> **For the coding agent working in this folder.** This document is the single
> source of truth for what to build. Follow it end to end. Before writing any
> Next.js code, also read `AGENTS.md` in this folder — this is **Next.js 16**
> and its APIs may differ from older training data (check `node_modules/next/dist/docs/`).

---

## 1. The project in one line

A **professional, clean, minimal marketing website** for **Meridian Global Trade**,
an international **import & export** company that handles the trade of essentially
**every category of goods** worldwide. Premium, corporate, high-trust feel.

- **Client budget context:** treated as a premium ($1M-tier) engagement — polish,
  spacing, typography, and motion must all feel high-end. No template-y look.
- **Scope:** **frontend only.** No backend, no database, no real API.
- **Deliverable:** a fully responsive, multi-page site that builds and runs clean.

## 2. Tech stack (decided)

- **Next.js 16** (App Router, `src/` dir, TypeScript) — already scaffolded.
- **Tailwind CSS v4** (CSS-based config via `globals.css`, no `tailwind.config.js`).
- **React 19.**
- `next/font/google` for fonts (self-hosted, no layout shift).
- No extra UI/animation libraries required. Scroll reveals via a small
  IntersectionObserver client component. Keep dependencies minimal.

> Note: the user originally said "Nest.js" — that is a **backend** framework and
> is **not** used here. Frontend-only ⇒ **Next.js**. This was clarified and agreed.

## 3. Branding (placeholder — swappable later)

- **Name:** Meridian Global Trade
- **Short name / wordmark:** MERIDIAN
- **Tagline options:** "Moving the world's goods." / "Trade without borders."
- **Logo:** simple wordmark + a small mark (e.g. a meridian/globe line motif in
  gold). No raster logo needed; do it in inline SVG/CSS.
- **Everything here is placeholder** and must be easy to find & replace (keep the
  brand name, contact details, and stats in one place where practical).

## 4. Design system

**Mood:** airy, editorial, corporate-premium. Navy ink + refined gold accent on
warm off-white neutrals. Generous whitespace. Restrained, confident.

**Palette (CSS variables in `globals.css`):**

| Token           | Value     | Use                                   |
| --------------- | --------- | ------------------------------------- |
| `--bg`          | `#ffffff` | page background                       |
| `--bg-soft`     | `#f7f6f2` | warm off-white sections               |
| `--bg-sand`     | `#f1efe8` | alternating section band              |
| `--border`      | `#e6e3da` | hairlines / card borders              |
| `--ink`         | `#0b1b2b` | headings (near-black navy)            |
| `--ink-soft`    | `#223a4f` | body text                             |
| `--muted`       | `#5c6b78` | secondary text                        |
| `--gold`        | `#b8863b` | accent (primary)                      |
| `--gold-soft`   | `#c8a24b` | accent (lighter)                      |
| `--gold-tint`   | `#f3ead6` | accent wash / selection               |
| `--deep`        | `#081521` | dark panels (footer, CTA, hero base)  |
| `--deep-2`      | `#0d2233` | dark panel gradient stop              |
| `--on-deep`     | `#e9edf1` | text on dark                          |
| `--on-deep-muted`| `#9fb2c0`| secondary text on dark                |

**Typography:**

- **Display / headings:** `Fraunces` (variable serif) via `next/font/google`,
  weight 400, tight leading (~1.08), slight negative letter-spacing. Elegant,
  editorial. CSS var `--font-fraunces` / theme `--font-display`.
- **Body / UI:** `Inter` via `next/font/google`. CSS var `--font-inter` /
  theme `--font-sans`.
- Wire both fonts as `variable` fonts in the root layout and expose them as
  CSS variables on `<html>`.

**Reusable primitives / utilities:**

- `.container` — max-width 1200px, centered, 24px inline padding.
- `.eyebrow` — uppercase, letter-spaced, gold, with a short leading rule. Used
  above section headings.
- `.reveal` / `.is-visible` — scroll-in fade+rise (respect
  `prefers-reduced-motion`).
- `.link-underline` — animated hairline underline on hover.
- `.grid-lines` — faint grid overlay for dark hero.
- Radius ~14px, hairline (1px) borders, soft shadows only where needed.

**Motion:** subtle. Fade/rise on scroll, gentle hover states, smooth in-page
scroll. Nothing flashy. Everything must degrade gracefully with reduced motion.

## 5. Shared components (`src/components/`)

- `Header` — sticky, transparent-over-hero then solid on scroll. Wordmark left,
  nav center/right (Home, Services, Industries, About, Contact), a gold
  "Get a Quote" button. Mobile: hamburger → slide-in menu.
- `Footer` — dark (`--deep`) panel: wordmark + blurb, quick links, services list,
  contact block, "© 2026 Meridian Global Trade", subtle legal row.
- `Section` — vertical rhythm wrapper (large padding), optional background variant
  (`default | soft | sand | deep`).
- `Button` — variants: `primary` (gold), `outline` (ink), `ghost`. Sizes sm/md.
  Supports rendering as `Link`.
- `Reveal` — client component wrapping children, adds `.is-visible` via
  IntersectionObserver.
- `Stat` — big number + label (e.g. "120+ / Countries served").
- `SectionHeading` — eyebrow + h2 + optional lead paragraph.

## 6. Pages & content (multi-page, App Router routes)

Use realistic placeholder copy — no lorem ipsum. Keep it credible for a global
freight/trade company.

### `/` — Home
1. **Hero** (dark, `--deep` gradient + faint grid): eyebrow "Global import & export",
   large serif headline (e.g. "Moving the world's goods, without borders."),
   supporting line, two CTAs ("Get a quote" + "Our services"), and a row of
   trust stats. Optional subtle world-map / route-line SVG motif.
2. **Trust bar** — "Trusted by importers and exporters in 120+ countries" + a row
   of muted placeholder partner/certification wordmarks (ISO, WCO, IATA, etc. as
   plain text logos).
3. **Services preview** — 3–4 cards (Ocean & Air Freight, Customs & Compliance,
   Warehousing & Distribution, Sourcing & Procurement) linking to `/services`.
4. **"Everything, everywhere" / Industries** — grid showing the breadth of goods:
   Agriculture & Food, Machinery & Equipment, Textiles & Apparel, Electronics,
   Raw Materials & Metals, Chemicals, Automotive, Consumer Goods. Links to
   `/industries`.
5. **Global presence** — split section: stats + short copy about worldwide network,
   with a simple stylized map or route lines. Stats: countries, ports, annual
   TEUs/tonnage, on-time rate.
6. **Why Meridian** — 3–4 value props (End-to-end logistics, Regulatory expertise,
   Real-time visibility, Dedicated account teams).
7. **Testimonial / quote** — one strong placeholder client quote.
8. **CTA band** (dark) — "Ready to move your goods?" + Get a quote button.

### `/services` — Services
- Page hero (compact).
- Detailed service blocks (alternating image/text or icon + text):
  Ocean Freight, Air Freight, Land & Rail, Customs Brokerage & Compliance,
  Warehousing & Fulfillment, Sourcing & Procurement, Insurance & Risk,
  End-to-end Supply Chain Management. Each: short description + 3–4 bullet points.
- Process/"How we work" horizontal steps (Consult → Plan → Move → Clear → Deliver).
- CTA band.

### `/industries` — Industries / What we trade
- Hero.
- The breadth story: grid of sectors, each a card with a short line on what's
  handled (the "each and everything" concept made concrete).
- Compliance note (dangerous goods, perishables, oversized cargo handled).
- CTA band.

### `/about` — About
- Hero.
- Company story / mission (placeholder, credible).
- Stats row (founded, offices, employees, countries).
- Values (Integrity, Reliability, Global mindset, Sustainability).
- Global network / offices list (a few placeholder city hubs: Rotterdam,
  Singapore, Dubai, Shanghai, New York, São Paulo).
- Leadership (optional, placeholder names + roles, initials avatars).
- CTA band.

### `/contact` — Contact / Get a Quote
- Hero.
- **Quote/contact form** (frontend only): name, company, email, phone,
  origin, destination, cargo type, message. Client-side validation + a fake
  success state on submit (no real backend — `onSubmit` prevents default, shows
  a "Thanks, we'll be in touch" confirmation). Clearly a non-wired demo but
  behaves convincingly.
- Contact details block (placeholder email, phone, HQ address) + office hubs.
- Optional embedded-map placeholder (styled box, no external key).

## 7. SEO, metadata, a11y, quality bar

- Per-route `metadata` (title template `%s | Meridian Global Trade`, descriptions,
  Open Graph). Root layout sets `metadataBase`, default title/description, and a
  themed OG. Add `robots`, and a `sitemap.ts`.
- Favicon / app icon via metadata file conventions (a simple gold "M" mark is fine).
- Semantic HTML, proper heading order, `alt` text, focus-visible states, adequate
  color contrast, keyboard-navigable menu and form.
- Fully responsive: mobile-first, test ~360px, 768px, 1024px, 1280px+.
- Lighthouse-friendly: no CLS from fonts, lazy where sensible, minimal JS.

## 8. Definition of done

- [ ] `npm run build` completes with no errors and no type errors.
- [ ] `npm run lint` passes.
- [ ] All 5 routes render and are linked from the header/footer.
- [ ] Header scroll behavior + mobile menu work.
- [ ] Contact form validates and shows the fake success state.
- [ ] Responsive from 360px up, no horizontal overflow.
- [ ] Consistent use of the design tokens above; no stray default Next.js styles.
- [ ] All brand text/contact/stats are placeholders and easy to swap.

## 9. Notes / constraints

- Frontend only — do **not** add API routes, server actions that hit external
  services, databases, or auth.
- Keep third-party dependencies to a minimum (ideally none beyond the scaffold).
- Prefer inline SVG for icons and the map/route motifs (no icon-font/CDN).
- Everything self-contained and offline-buildable.
