import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { QuoteForm } from "@/components/QuoteForm";
import { RouteMap } from "@/components/RouteMap";
import { Photo } from "@/components/Photo";
import { SpecTable } from "@/components/SpecTable";
import { MailIcon, PinIcon } from "@/components/icons";
// phone — commented out: restore PhoneIcon to the import above
import { site, offices, commercialTerms } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Open a production enquiry with Ostenmark. Acknowledged within one business day with a costed bill of materials, production window and applicable Incoterms.",
  path: "/contact",
});

const routes = [
  {
    term: "New enquiries",
    value: "mrtrades2005@gmail.com",
  },
  { term: "Existing programmes", value: "Via your named client services lead" },
  { term: "Quality escalation", value: "quality@ostenmark.com" },
  { term: "Vendor pack requests", value: "compliance@ostenmark.com" },
  { term: "Press and corporate", value: "press@ostenmark.com" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: "Contact", href: "/contact" }])} />

      <PageHero
        eyebrow="Contact"
        title="Open a production enquiry"
        lead="Send a specification, tech pack or reference sample. A client services lead acknowledges within one business day and returns a costed bill of materials, a firm production window and the applicable Incoterms."
        facts={[
          { value: "1 day", label: "Acknowledgement" },
          { value: "3–5 d", label: "Costed BOM" },
          { value: "10–15 d", label: "First sample" },
          { value: "6", label: "Contact offices" },
        ]}
      />

      <Section background="default" divider={false}>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Enquiry form */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">Enquiry form</p>
              <h2 className="display display-md mt-5 text-ink">
                Production enquiry
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">
                Fields marked <span className="text-accent">*</span> are required.
                The more specification you provide, the closer the first response
                will be to a firm quotation rather than a request for more detail.
              </p>
            </Reveal>
            <Reveal delay={80} className="mt-10">
              <QuoteForm />
            </Reveal>
          </div>

          {/* Direct routes */}
          <aside className="lg:col-span-5">
            <Reveal delay={100}>
              <p className="eyebrow">Direct routes</p>
              <SpecTable className="mt-6" dense rows={routes} />
            </Reveal>

            <Reveal delay={140} className="mt-12">
              <p className="eyebrow">Head office</p>
              <ul className="mt-6 space-y-5 text-sm">
                {/* phone — commented out
                <li className="flex gap-4">
                  <PhoneIcon
                    width={17}
                    height={17}
                    className="mt-0.5 shrink-0 text-accent"
                  />
                  <span>
                    <span className="label-mono block">Telephone</span>
                    <a
                      href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`}
                      className="link-underline mt-1.5 inline-block font-medium text-ink"
                    >
                      {site.contact.phone}
                    </a>
                  </span>
                </li>
                */}
                <li className="flex gap-4">
                  <MailIcon
                    width={17}
                    height={17}
                    className="mt-0.5 shrink-0 text-accent"
                  />
                  <span>
                    <span className="label-mono block">Email</span>
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="link-underline mt-1.5 inline-block break-all font-medium text-ink"
                    >
                      {site.contact.email}
                    </a>
                  </span>
                </li>
                <li className="flex gap-4">
                  <PinIcon
                    width={17}
                    height={17}
                    className="mt-0.5 shrink-0 text-accent"
                  />
                  <span>
                    <span className="label-mono block">Registered address</span>
                    <span className="mt-1.5 inline-block font-medium text-ink">
                      {site.contact.address}
                    </span>
                  </span>
                </li>
              </ul>
            </Reveal>

            {/* Network */}
            <Reveal delay={180} className="mt-12">
              <p className="eyebrow">Network</p>
              <div className="relative mt-6 overflow-hidden rounded-brand border border-line bg-bg-subtle p-5">
                <RouteMap className="w-full text-ink/25" />
              </div>
              <Photo
                src="/photos/trade-port.jpg"
                alt="Container vessel loading alongside quay cranes"
                sizes="(max-width: 1024px) 90vw, 34vw"
                className="mt-4 aspect-16/9 rounded-brand border border-line"
              />
              <ul className="mt-6 border-t border-line">
                {offices.map((office) => (
                  <li
                    key={office.city}
                    className="flex items-baseline justify-between gap-4 border-b border-line py-3"
                  >
                    <span className="text-sm text-ink">
                      {office.city}
                      <span className="text-ink-faint">, {office.country}</span>
                    </span>
                    <span className="label-mono shrink-0">
                      {office.lines > 0 ? `${office.lines} lines` : "Commercial"}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </aside>
        </div>
      </Section>

      {/* Terms reminder */}
      <Section background="subtle">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Before you write</p>
            <h2 className="display display-md mt-5 text-ink">
              Standard terms, published
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-muted">
              Most first enquiries can be qualified against these without a call.
              If your requirement sits outside them, say so in the enquiry — we
              will tell you plainly whether it is workable.
            </p>
          </div>
          <Reveal delay={80} className="lg:col-span-7">
            <SpecTable rows={commercialTerms} />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
