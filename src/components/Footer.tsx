import Link from "next/link";
import { Logo } from "./Logo";
import { site, nav, offices, credentials } from "@/lib/site";
import { services } from "@/lib/content";
import { MailIcon, PinIcon } from "./icons";
// phone — commented out: restore PhoneIcon to the import above

/**
 * Dark corporate footer. Carries the legal entity, registration numbers
 * and certification register — the closing block of a company document
 * rather than a sitemap with a sign-off.
 */
export function Footer() {
  return (
    <footer className="border-t border-line bg-deep text-on-deep">
      <div className="container-x py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Entity */}
          <div className="lg:col-span-4">
            <span className="text-on-deep">
              <Logo showDescriptor />
            </span>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-on-deep-muted">
              Tier-one contract manufacturer of leather goods, footwear, apparel
              and textiles. Six owned production sites, audited supply chain,
              export to more than 120 markets.
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
            <h3 className="label-mono text-on-deep">Capabilities</h3>
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
                <MailIcon width={16} height={16} className="mt-0.5 shrink-0 text-accent-soft" />
                <a
                  href={`mailto:${site.contact.email}`}
                  className="link-underline break-all transition-colors hover:text-on-deep"
                >
                  {site.contact.email}
                </a>
              </li>
              {/* phone — commented out
              <li className="flex gap-3">
                <PhoneIcon width={16} height={16} className="mt-0.5 shrink-0 text-accent-soft" />
                <a
                  href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`}
                  className="link-underline transition-colors hover:text-on-deep"
                >
                  {site.contact.phone}
                </a>
              </li>
              */}
              <li className="flex gap-3">
                <PinIcon width={16} height={16} className="mt-0.5 shrink-0 text-accent-soft" />
                <span>{site.contact.address}</span>
              </li>
            </ul>

            <h3 className="label-mono mt-8 text-on-deep">Sites</h3>
            <p className="mt-4 text-sm leading-relaxed text-on-deep-muted">
              {offices.map((o) => o.city).join(" · ")}
            </p>
          </div>
        </div>

        {/* Certification register */}
        <div className="mt-14 border-t border-white/10 pt-8">
          <h3 className="label-mono text-on-deep">Certification register</h3>
          <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
            {credentials.map((c) => (
              <li key={c.code} className="text-xs text-on-deep-muted">
                <span className="font-mono text-on-deep">{c.code}</span>
                <span className="mt-0.5 block opacity-70">
                  {c.body} · valid {c.valid}
                </span>
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
            <span className="transition-colors hover:text-on-deep">Privacy notice</span>
            <span className="transition-colors hover:text-on-deep">Terms of trade</span>
            <span className="transition-colors hover:text-on-deep">Supplier code of conduct</span>
            <span className="transition-colors hover:text-on-deep">Modern slavery statement</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
