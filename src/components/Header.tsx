"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Logo, type LogoBrand } from "./Logo";
import { Button } from "./Button";
import { ArrowIcon, MailIcon, ShieldIcon } from "./icons";
// phone — commented out: restore PhoneIcon to the import above


/**
 * Sticky masthead with a utility bar above the primary navigation.
 * The bar carries the legal entity, the customs registration and the direct
 * contact route — the details a corporate buyer checks before they read nav.
 *
 * The bar drops away on scroll so the navigation tightens to a single row,
 * and the mobile menu opens onto the deep marine ground rather than white,
 * which keeps it in the same world as the hero.
 */
export function Header({
  brand,
  nav,
  contactEmail,
  legalEntity,
  duns,
}: {
  brand: LogoBrand;
  nav: readonly { label: string; href: string }[];
  contactEmail: string;
  legalEntity: string;
  duns: string;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar — collapses once the reader has committed to scrolling */}
      <div
        className={`hidden overflow-hidden bg-deep text-on-deep transition-[height] duration-300 lg:block ${
          scrolled ? "h-0" : "h-9"
        }`}
      >
        <div className="container-x flex h-9 items-center justify-between">
          <div className="flex items-center gap-6">
            <p className="label-mono text-on-deep-muted">
              {legalEntity} · {duns}
            </p>
            <span className="flex items-center gap-2 text-[0.6875rem] tracking-[0.08em] text-brass-soft">
              <ShieldIcon width={12} height={12} />
              AEO-F CERTIFIED
            </span>
          </div>
          <div className="flex items-center gap-7">
            {/* phone — commented out
            <a
              href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`}
              className="flex items-center gap-2 text-xs text-on-deep-muted transition-colors hover:text-on-deep"
            >
              <PhoneIcon width={13} height={13} />
              {site.contact.phone}
            </a>
            */}
            <a
              href={`mailto:${contactEmail}`}
              className="flex items-center gap-2 text-xs text-on-deep-muted transition-colors hover:text-on-deep"
            >
              <MailIcon width={13} height={13} />
              {contactEmail}
            </a>
          </div>
        </div>
      </div>

      {/* Primary navigation */}
      <div
        className={`border-b bg-bg/90 backdrop-blur-md transition-shadow duration-300 ${
          scrolled
            ? "border-line shadow-[0_1px_24px_-12px_rgba(11,27,43,0.4)]"
            : "border-line"
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between gap-8 lg:h-[4.5rem]">
          <span className="text-ink">
            <Logo brand={brand} showDescriptor />
          </span>

          <nav aria-label="Primary" className="hidden items-center lg:flex">
            {nav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative px-4 py-6 text-[0.8125rem] font-medium tracking-[0.01em] transition-colors ${
                    active ? "text-ink" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-4 bottom-0 h-0.5 origin-left bg-accent transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Button href="/contact" size="sm" variant="primary">
              Request a quotation
              <ArrowIcon
                width={14}
                height={14}
                className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
              />
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`relative z-50 -mr-2 flex h-11 w-11 cursor-pointer items-center justify-center transition-colors lg:hidden ${
              open ? "text-on-deep" : "text-ink"
            }`}
          >
            <span className="flex w-5 flex-col gap-1.5">
              <span
                className={`h-px w-full bg-current transition-transform duration-300 ${
                  open ? "translate-y-[6.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-full bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-px w-full bg-current transition-transform duration-300 ${
                  open ? "-translate-y-[6.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="deep-field fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto text-on-deep lg:hidden"
          >
            <nav aria-label="Mobile" className="container-x flex flex-col pb-10 pt-4">
              {nav.map((item, i) => {
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className="flex items-baseline gap-4 border-b border-white/10 py-5"
                  >
                    <span className="label-mono text-brass-soft">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-display text-xl font-semibold tracking-[-0.02em] ${
                        active ? "text-brass-soft" : "text-on-deep"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}

              <div className="mt-8">
                <Button
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="w-full"
                >
                  Request a quotation
                  <ArrowIcon width={16} height={16} />
                </Button>
              </div>

              <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
                {/* phone — commented out
                <a
                  href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`}
                  className="flex items-center gap-3 text-sm text-on-deep-muted"
                >
                  <PhoneIcon width={16} height={16} className="text-brass-soft" />
                  {site.contact.phone}
                </a>
                */}
                <a
                  href={`mailto:${contactEmail}`}
                  className="flex items-center gap-3 text-sm text-on-deep-muted"
                >
                  <MailIcon width={16} height={16} className="text-brass-soft" />
                  {contactEmail}
                </a>
                <p className="label-mono pt-2 text-on-deep-muted/70">
                  {legalEntity} · {duns}
                </p>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
