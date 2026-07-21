"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { Magnetic } from "./Magnetic";
import { nav } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid
          ? "border-b border-border bg-bg/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      {/* Scroll progress rule */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-gold via-gold-bright to-gold"
      />

      <div className="container-x flex h-16 items-center justify-between sm:h-20">
        <span className="text-ink">
          <Logo />
        </span>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`link-underline text-sm font-medium transition-colors ${
                  active ? "text-gold" : "text-ink-soft hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Magnetic>
            <Button href="/contact" size="sm" variant="primary">
              Get a Quote
            </Button>
          </Magnetic>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative z-50 flex h-11 w-11 items-center justify-center text-ink lg:hidden"
        >
          <div className="flex w-6 flex-col gap-[5px]">
            <span
              className={`h-0.5 w-full bg-current transition-transform duration-300 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-current transition-opacity duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-current transition-transform duration-300 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile slide-in menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-16 z-40 bg-bg/98 backdrop-blur-xl sm:top-20 lg:hidden"
          >
            <div className="mesh opacity-70" />
            <nav
              aria-label="Mobile"
              className="container-x relative flex h-full flex-col gap-1 pt-8"
            >
              {nav.map((item, i) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.4 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-baseline gap-3 border-b border-border py-4 font-display text-3xl transition-colors ${
                        active ? "text-gold" : "text-ink hover:text-gold"
                      }`}
                    >
                      <span className="font-sans text-xs text-muted tnum">
                        0{i + 1}
                      </span>
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-8"
              >
                <Button href="/contact" onClick={() => setOpen(false)} className="w-full">
                  Get a Quote
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
