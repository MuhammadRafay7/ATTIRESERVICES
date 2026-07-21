import Link from "next/link";
import { Logo } from "./Logo";
import { site, nav } from "@/lib/site";
import { MailIcon, PhoneIcon, PinIcon } from "./icons";

const servicesLinks = [
  "Manufacturing & Fulfillment",
  "Sourcing & Matchmaking",
  "Ocean & Air Freight",
  "Customs & Compliance",
  "Warehousing & Fulfillment",
  "Supply Chain Management",
];

export function Footer() {
  return (
    <footer className="bg-deep text-on-deep">
      <div className="container-x py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand + blurb */}
          <div className="lg:col-span-4">
            <span className="text-on-deep">
              <Logo />
            </span>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-on-deep-muted">
              {site.name} makes it, sources it, and moves it — manufacturing,
              manufacturer matchmaking, and the import & export of every category
              of goods, worldwide.
            </p>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-on-deep">
              Company
            </h3>
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

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-on-deep">
              Services
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {servicesLinks.map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="link-underline text-on-deep-muted transition-colors hover:text-on-deep"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-on-deep">
              Contact
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-on-deep-muted">
              <li className="flex gap-3">
                <MailIcon width={18} height={18} className="mt-0.5 shrink-0 text-gold-soft" />
                <a
                  href={`mailto:${site.contact.email}`}
                  className="link-underline transition-colors hover:text-on-deep"
                >
                  {site.contact.email}
                </a>
              </li>
              <li className="flex gap-3">
                <PhoneIcon width={18} height={18} className="mt-0.5 shrink-0 text-gold-soft" />
                <a
                  href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`}
                  className="link-underline transition-colors hover:text-on-deep"
                >
                  {site.contact.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <PinIcon width={18} height={18} className="mt-0.5 shrink-0 text-gold-soft" />
                <span>{site.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal row */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-on-deep-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="transition-colors hover:text-on-deep">Privacy Policy</span>
            <span className="transition-colors hover:text-on-deep">Terms of Service</span>
            <span className="transition-colors hover:text-on-deep">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
