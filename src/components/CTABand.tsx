import { Button } from "./Button";
import { Reveal } from "./Reveal";
import { ArrowIcon } from "./icons";
import { site } from "@/lib/site";

/**
 * Closing action band. Dark, left-aligned and paired with the response
 * commitment — a stated SLA converts better with corporate buyers than
 * an exhortation does.
 */
export function CTABand({
  title = "Open a production enquiry",
  lead = "Send a tech pack, specification or reference sample. We return a costed bill of materials, a firm production window and applicable Incoterms.",
  primaryLabel = "Request a quotation",
  primaryHref = "/contact",
  secondaryLabel = "Review capabilities",
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
    <section className="relative overflow-hidden border-t border-line bg-deep text-on-deep">
      <div className="grid-lines grid-lines--deep pointer-events-none absolute inset-0" />
      <div className="container-x relative py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow eyebrow--on-deep">Next step</p>
            <h2 className="display display-lg mt-5 text-on-deep">{title}</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-on-deep-muted">
              {lead}
            </p>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-5">
            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <Button href={primaryHref} variant="inverse">
                {primaryLabel}
                <ArrowIcon
                  width={16}
                  height={16}
                  className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
                />
              </Button>
              <Button href={secondaryHref} variant="on-deep">
                {secondaryLabel}
              </Button>
            </div>
            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-6 lg:justify-end">
              <div>
                <dt className="label-mono text-on-deep-muted">Response time</dt>
                <dd className="mt-1.5 text-sm text-on-deep">{site.responseSla}</dd>
              </div>
              <div>
                <dt className="label-mono text-on-deep-muted">Enquiries</dt>
                <dd className="mt-1.5 text-sm break-all text-on-deep">
                  {site.contact.email}
                </dd>
              </div>
              {/* phone — commented out
              <div>
                <dt className="label-mono text-on-deep-muted">Direct line</dt>
                <dd className="mt-1.5 text-sm text-on-deep">{site.contact.phone}</dd>
              </div>
              */}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
