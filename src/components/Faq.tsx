"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/**
 * Ruled disclosure list. Rows are numbered and separated by hairlines so
 * the block reads as a reference section, not a widget.
 */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-b border-line">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                className="group flex w-full items-start gap-5 py-6 text-left"
              >
                <span className="label-mono mt-1.5 shrink-0 text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-base font-medium tracking-[-0.01em] text-ink sm:text-lg">
                  {item.q}
                </span>
                <span
                  className={`relative mt-1 flex h-6 w-6 shrink-0 items-center justify-center border transition-colors ${
                    isOpen
                      ? "border-ink bg-ink text-bg"
                      : "border-line-strong text-ink group-hover:border-ink"
                  }`}
                >
                  <span className="absolute h-px w-3 bg-current" />
                  <span
                    className={`absolute h-3 w-px bg-current transition-transform duration-300 ${
                      isOpen ? "scale-y-0" : ""
                    }`}
                  />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${i}`}
                  initial={reduce ? undefined : { height: 0, opacity: 0 }}
                  animate={reduce ? undefined : { height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-7 pl-11 text-[0.9375rem] leading-relaxed text-ink-muted">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
