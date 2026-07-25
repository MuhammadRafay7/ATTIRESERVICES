"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { MailIcon } from "./icons";
// phone — commented out: restore PhoneIcon to the import above
import { nav, site } from "@/lib/site";

/**
 * Sticky masthead with a utility bar above the primary navigation.
 * The bar carries the direct contact route and headline credentials —
 * the details a corporate buyer looks for before they look at nav.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-bg">
      {/* Utility bar */}
      <div className="hidden border-b border-line bg-deep text-on-deep lg:block">
        <div className="container-x flex h-9 items-center justify-between">
          <p className="label-mono text-on-deep-muted">
            {site.legalEntity} · {site.duns}
          </p>
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
              href={`mailto:${site.contact.email}`}
              className="flex items-center gap-2 text-xs text-on-deep-muted transition-colors hover:text-on-deep"
            >
              <MailIcon width={13} height={13} />
              {site.contact.email}
            </a>
          </div>
        </div>
      </div>

      {/* Primary navigation */}
      <div className="border-b border-line bg-bg/95 backdrop-blur-sm">
        <div className="container-x flex h-16 items-center justify-between gap-8 lg:h-[4.5rem]">
          <span className="text-ink">
            <Logo showDescriptor />
          </span>

          <nav
            aria-label="Primary"
            className="hidden items-center lg:flex"
          >
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
                  {active && (
                    <span className="absolute inset-x-4 bottom-0 h-0.5 bg-accent" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Button href="/contact" size="sm" variant="primary">
              Request a quotation
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-50 -mr-2 flex h-11 w-11 items-center justify-center text-ink lg:hidden"
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
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-line bg-bg lg:hidden"
          >
            <nav aria-label="Mobile" className="container-x flex flex-col pb-10 pt-2">
              {nav.map((item, i) => {
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className="flex items-baseline gap-4 border-b border-line py-5"
                  >
                    <span className="label-mono text-ink-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-xl font-medium tracking-[-0.02em] ${
                        active ? "text-accent" : "text-ink"
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
                </Button>
              </div>

              <div className="mt-8 space-y-3 border-t border-line pt-6">
                {/* phone — commented out
                <a
                  href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`}
                  className="flex items-center gap-3 text-sm text-ink-muted"
                >
                  <PhoneIcon width={16} height={16} className="text-accent" />
                  {site.contact.phone}
                </a>
                */}
                <a
                  href={`mailto:${site.contact.email}`}
                  className="flex items-center gap-3 text-sm text-ink-muted"
                >
                  <MailIcon width={16} height={16} className="text-accent" />
                  {site.contact.email}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
