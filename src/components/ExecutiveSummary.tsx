import { Button } from "./Button";
import { Reveal } from "./Reveal";
import { ArrowIcon, CheckIcon, ClipboardIcon } from "./icons";
import { site } from "@/lib/site";

/**
 * The 60-second read.
 *
 * Placed immediately under the masthead so a senior reader gets the entire
 * proposition — what we make, how we contract, what it costs, what happens
 * next — without scrolling into the detail. Everything below this block is
 * substantiation for the people who need it.
 */
const columns = [
  {
    heading: "What we do",
    body: "Three divisions: garment manufacturing, leather manufacturing, and import & export — under one contracting entity.",
    points: [
      "12.1M garment units / yr",
      "6.5M leather units / yr",
      "120+ markets traded",
      "6 owned sites, 49 lines",
    ],
  },
  {
    heading: "How you contract",
    body: "One entity holds materials, conversion, inspection, documentation — and the liability, including on managed vendors.",
    points: ["Full-package, CMT or managed", "EXW · FOB · CIF · DDP", "Single purchase order"],
  },
  {
    heading: "What it commits you to",
    body: "Published minimums and lead times, so a programme can be qualified before anyone books a call.",
    points: ["From 150 units / style", "Sample in 10–15 days", "Bulk in 35–60 days"],
  },
];

export function ExecutiveSummary() {
  return (
    <section
      id="summary"
      aria-labelledby="summary-heading"
      className="border-b border-line bg-bg"
    >
      <div className="container-x py-14 lg:py-16">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-5">
            <h2 id="summary-heading" className="eyebrow">
              Executive summary
            </h2>
            <span className="label-mono text-ink-faint">60-second read</span>
          </div>
        </Reveal>

        <div className="grid gap-px bg-line lg:grid-cols-3">
          {columns.map((col, i) => (
            <Reveal key={col.heading} delay={60 + i * 60} className="bg-bg">
              <div className="flex h-full flex-col py-8 lg:px-8 lg:py-9 lg:first:pl-0">
                <h3 className="text-base font-medium tracking-[-0.015em] text-ink">
                  {col.heading}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                  {col.body}
                </p>
                <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                  {col.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5">
                      <CheckIcon
                        width={15}
                        height={15}
                        className="mt-0.5 shrink-0 text-accent"
                      />
                      <span className="font-mono text-xs text-ink">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Decision row */}
        <Reveal delay={240}>
          <div className="mt-10 flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm leading-relaxed text-ink-muted">
              If this fits, the fastest next step is a specification and an
              indicative volume. Acknowledged in{" "}
              <span className="text-ink">{site.responseSla.toLowerCase()}</span>.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:shrink-0">
              <Button href="/contact" variant="primary">
                Request a quotation
                <ArrowIcon
                  width={16}
                  height={16}
                  className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
                />
              </Button>
              <Button href="/contact" variant="outline">
                <ClipboardIcon width={16} height={16} />
                Request capability deck
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
