import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { TextReveal } from "./TextReveal";
import { Photo } from "./Photo";

/**
 * Compact, airy hero for inner pages — light surface, navy ink, gold accent.
 * Optionally shows a duotone image on the right for an editorial split.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-bg-soft to-bg">
      <div className="mesh opacity-80" />
      <div className="grid-lines pointer-events-none absolute inset-0" />

      <div
        className={`container-x relative pb-16 pt-36 sm:pb-20 sm:pt-44 ${
          image ? "grid items-center gap-12 lg:grid-cols-12" : ""
        }`}
      >
        <div className={image ? "lg:col-span-7" : ""}>
          <Reveal delay={80}>
            <p className="eyebrow">{eyebrow}</p>
          </Reveal>
          <TextReveal
            as="h1"
            className="display display-lg mt-6 max-w-3xl text-ink"
            text={title}
            delay={0.12}
          />
          {lead && (
            <Reveal delay={400}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">{lead}</p>
            </Reveal>
          )}
          {children && (
            <Reveal delay={520}>
              <div className="mt-9">{children}</div>
            </Reveal>
          )}
        </div>

        {image && (
          <Reveal delay={220} className="lg:col-span-5">
            <Photo
              src={image}
              alt={imageAlt ?? ""}
              duotone
              priority
              sizes="(max-width: 1024px) 90vw, 42vw"
              className="aspect-[4/3] rounded-brand shadow-[0_40px_80px_-44px_rgba(11,27,43,0.5)]"
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}
