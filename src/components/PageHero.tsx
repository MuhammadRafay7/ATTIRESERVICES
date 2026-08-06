import type { ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "./Reveal";
import { Photo } from "./Photo";

export type HeroFact = { value: string; label: string };

/**
 * Inner-page masthead. Breadcrumb, document-style eyebrow, title and lead,
 * closed by an optional ruled fact strip. Structure carries the weight —
 * there is no background treatment beyond a faint measured grid.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  facts,
  image,
  imageAlt,
  children,
}: {
  /** Optional so a copy record can be spread in directly. */
  eyebrow?: string;
  title?: string;
  lead?: ReactNode;
  /** Present when a copy record is spread in; not rendered. */
  key?: string;
  facts?: HeroFact[];
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-bg-subtle">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" />

      <div className="container-x relative pb-14 pt-12 sm:pb-16 sm:pt-16">
        {/* Breadcrumb */}
        <Reveal>
          <nav aria-label="Breadcrumb" className="label-mono flex items-center gap-2">
            <Link href="/" className="transition-colors hover:text-ink">
              Home
            </Link>
            <span aria-hidden className="text-ink-faint">
              /
            </span>
            <span className="text-ink">{eyebrow}</span>
          </nav>
        </Reveal>

        <div
          className={
            image ? "mt-8 grid items-end gap-10 lg:grid-cols-12 lg:gap-12" : "mt-8"
          }
        >
          <div className={image ? "lg:col-span-7" : ""}>
            <Reveal delay={60}>
              <div className="rule-accent" />
              <h1 className="display display-lg mt-6 max-w-3xl text-ink">{title}</h1>
            </Reveal>
            {lead && (
              <Reveal delay={120}>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
                  {lead}
                </p>
              </Reveal>
            )}
            {children && (
              <Reveal delay={180}>
                <div className="mt-8">{children}</div>
              </Reveal>
            )}
          </div>

          {image && (
            <Reveal delay={140} className="lg:col-span-5">
              <Photo
                src={image}
                alt={imageAlt ?? ""}
                priority
                sizes="(max-width: 1024px) 90vw, 42vw"
                className="aspect-4/3 rounded-brand border border-line"
              />
            </Reveal>
          )}
        </div>

        {/* Fact strip */}
        {facts && facts.length > 0 && (
          <Reveal delay={200}>
            <dl className="mt-12 grid grid-cols-2 border-t border-line sm:grid-cols-4">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="border-b border-line px-0 py-5 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0"
                >
                  <dd className="figure text-2xl sm:text-[1.75rem]">
                    {fact.value}
                  </dd>
                  <dt className="label-mono mt-2">{fact.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </div>
    </section>
  );
}
