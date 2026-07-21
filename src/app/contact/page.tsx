import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { QuoteForm } from "@/components/QuoteForm";
import { RouteMap } from "@/components/RouteMap";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { site, offices } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Get a Quote",
  description:
    "Request a tailored import/export quote from Meridian Global Trade, or reach our team directly. Offices in Rotterdam, Singapore, Dubai, Shanghai, New York, and São Paulo.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's build and move your goods"
        lead="Tell us what you need made, sourced, or shipped. A Meridian specialist will respond within one business day with a tailored quote."
      />

      <Section background="default">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="text-2xl text-ink sm:text-3xl">Request a quote</h2>
              <p className="mt-3 text-base text-muted">
                Fields marked with <span className="text-gold">*</span> are
                required.
              </p>
              <div className="mt-8">
                <QuoteForm />
              </div>
            </Reveal>
          </div>

          {/* Contact details */}
          <aside className="lg:col-span-5">
            <Reveal delay={120}>
              <div className="rounded-brand border border-border bg-bg-soft p-8">
                <h2 className="text-xl text-ink">Talk to us directly</h2>
                <ul className="mt-6 space-y-5 text-sm">
                  <li className="flex gap-4">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-brand bg-gold-tint text-gold">
                      <MailIcon width={20} height={20} />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                        Email
                      </span>
                      <a
                        href={`mailto:${site.contact.email}`}
                        className="link-underline mt-1 inline-block font-medium text-ink"
                      >
                        {site.contact.email}
                      </a>
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-brand bg-gold-tint text-gold">
                      <PhoneIcon width={20} height={20} />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                        Phone
                      </span>
                      <a
                        href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`}
                        className="link-underline mt-1 inline-block font-medium text-ink"
                      >
                        {site.contact.phone}
                      </a>
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-brand bg-gold-tint text-gold">
                      <PinIcon width={20} height={20} />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                        Headquarters
                      </span>
                      <span className="mt-1 inline-block font-medium text-ink">
                        {site.contact.address}
                      </span>
                    </span>
                  </li>
                </ul>

                {/* Map placeholder (styled box, no external key) */}
                <div className="relative mt-8 overflow-hidden rounded-brand border border-border bg-bg">
                  <div className="grid-lines pointer-events-none absolute inset-0" />
                  <RouteMap className="relative mx-auto w-full max-w-sm p-6 text-ink/15" />
                  <span className="absolute bottom-3 left-4 text-xs text-muted">
                    Global coverage · 120+ countries
                  </span>
                </div>

                {/* Office hubs */}
                <div className="mt-8">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    Office hubs
                  </span>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {offices.map((office) => (
                      <li
                        key={office.city}
                        className="rounded-full border border-border bg-bg px-3 py-1 text-xs font-medium text-ink-soft"
                      >
                        {office.city}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </Section>
    </>
  );
}
