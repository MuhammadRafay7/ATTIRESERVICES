import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { TextReveal } from "./TextReveal";
import { RouteMap } from "./RouteMap";

/**
 * Compact, airy hero for inner pages — light surface, navy ink, gold accent,
 * with a faint animated route map for atmosphere.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-bg-soft to-bg">
      <div className="mesh opacity-80" />
      <div className="grid-lines pointer-events-none absolute inset-0" />
      <RouteMap className="pointer-events-none absolute -right-[10%] top-1/2 hidden w-[58%] -translate-y-1/2 text-ink/[0.09] md:block" />

      <div className="container-x relative pb-20 pt-36 sm:pb-24 sm:pt-44">
        <Reveal delay={80}>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
        <TextReveal
          as="h1"
          className="display display-lg mt-6 max-w-4xl text-ink"
          text={title}
          delay={0.12}
        />
        {lead && (
          <Reveal delay={400}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
              {lead}
            </p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={520}>
            <div className="mt-9">{children}</div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
