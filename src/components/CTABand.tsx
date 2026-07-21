import { Button } from "./Button";
import { Reveal } from "./Reveal";
import { Magnetic } from "./Magnetic";
import { RouteMap } from "./RouteMap";
import { ArrowIcon } from "./icons";

/**
 * Light, atmospheric call-to-action band reused at the foot of most pages.
 */
export function CTABand({
  title = "Ready to build your next order?",
  lead = "Tell us what you need made, sourced, or shipped — we'll scope it and send a tailored quote within one business day.",
  primaryLabel = "Get a quote",
  primaryHref = "/contact",
  secondaryLabel = "Explore services",
  secondaryHref = "/services",
}: {
  title?: string;
  lead?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-bg-sand">
      <div className="mesh opacity-90" />
      <RouteMap className="pointer-events-none absolute inset-0 h-full w-full text-ink/[0.06]" />
      <div className="container-x relative py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow eyebrow--center mx-auto justify-center">
              Get started
            </p>
            <h2 className="display display-lg mt-6 text-ink">{title}</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {lead}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Magnetic>
                <Button href={primaryHref} variant="primary">
                  {primaryLabel}
                  <ArrowIcon
                    width={18}
                    height={18}
                    className="transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </Button>
              </Magnetic>
              <Button href={secondaryHref} variant="outline">
                {secondaryLabel}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
