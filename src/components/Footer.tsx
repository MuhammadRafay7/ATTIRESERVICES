import Link from "next/link";
import { Logo, type LogoBrand } from "./Logo";
import { site, nav, offices, credentials } from "@/lib/site";
import { services } from "@/lib/content";
import { getCollection, getSettings, type LegalDocument } from "@/lib/cms";
import { MailIcon, PinIcon } from "./icons";
// phone — commented out: restore PhoneIcon to the import above

/**
 * Dark corporate footer. Carries the legal entity, registration numbers
 * and certification register — the closing block of a company document
 * rather than a sitemap with a sign-off.
 */
export async function Footer({ brand }: { brand: LogoBrand }) {
  const legal = await getCollection<LegalDocument>("legal_documents");
  const settings = await getSettings();
  const blurb =
    (settings as { footerBlurb?: string }).footerBlurb ??
    "Apparel and textile import, export and sourcing. A qualified mill network, 30 owned production lines, and documentation issued in-house into more than 120 markets.";

  return (
    <footer className="deep-field text-on-deep">
      <div className="container-x py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Entity */}
          <div className="lg:col-span-4">
            <span className="text-on-deep">
              <Logo brand={brand} showDescriptor />
            </span>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-on-deep-muted">
              {blurb}
            </p>
            <dl className="mt-7 space-y-2 text-xs text-on-deep-muted">
              <div className="flex gap-3">
                <dt className="w-28 shrink-0 font-mono uppercase tracking-[0.1em] opacity-70">
                  Entity
                </dt>
                <dd>{site.legalEntity}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-28 shrink-0 font-mono uppercase tracking-[0.1em] opacity-70">
                  Reg. no.
                </dt>
                <dd>{site.registration}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-28 shrink-0 font-mono uppercase tracking-[0.1em] opacity-70">
                  D-U-N-S
                </dt>
                <dd>{site.duns.replace("D-U-N-S ", "")}</dd>
              </div>
            </dl>
          </div>

          {/* Capabilities */}
          <div className="lg:col-span-3">
            <h3 className="label-mono text-on-deep">Trade services</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    href="/services"
                    className="link-underline text-on-deep-muted transition-colors hover:text-on-deep"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + sites */}
          <div className="lg:col-span-2">
            <h3 className="label-mono text-on-deep">Company</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline text-on-deep-muted transition-colors hover:text-on-deep"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="label-mono text-on-deep">Contact</h3>
            <ul className="mt-5 space-y-4 text-sm text-on-deep-muted">
              <li className="flex gap-3">
                <MailIcon width={16} height={16} className="mt-0.5 shrink-0 text-brass-soft" />
                <a
                  href={`mailto:${site.contact.email}`}
                  className="link-underline break-all transition-colors hover:text-on-deep"
                >
                  {site.contact.email}
                </a>
              </li>
              {/* phone — commented out
              <li className="flex gap-3">
                <PhoneIcon width={16} height={16} className="mt-0.5 shrink-0 text-brass-soft" />
                <a
                  href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`}
                  className="link-underline transition-colors hover:text-on-deep"
                >
                  {site.contact.phone}
                </a>
              </li>
              */}
              <li className="flex gap-3">
                <PinIcon width={16} height={16} className="mt-0.5 shrink-0 text-brass-soft" />
                <span>{site.contact.address}</span>
              </li>
            </ul>

            <h3 className="label-mono mt-8 text-on-deep">Sites</h3>
            <p className="mt-4 text-sm leading-relaxed text-on-deep-muted">
              {offices.map((o) => o.city).join(" · ")}
            </p>
          </div>
        </div>

        {/* Certification — codes only; the full register with bodies and
            validity lives on the manufacturing page. */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 lg:flex-row lg:items-center lg:gap-8">
          <h3 className="label-mono shrink-0 text-on-deep">Certified to</h3>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {credentials.map((c) => (
              <li
                key={c.code}
                className="font-mono text-xs tracking-[0.06em] text-on-deep-muted"
              >
                {c.code}
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-on-deep-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalEntity}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {legal.map((doc) => (
              <Link
                key={doc.slug}
                href={`/legal/${doc.slug}`}
                className="link-underline transition-colors hover:text-on-deep"
              >
                {doc.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
