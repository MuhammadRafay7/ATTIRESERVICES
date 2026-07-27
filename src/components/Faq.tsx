"use client";

import { useState } from "react";

/**
 * Ruled disclosure list. Rows are numbered and separated by hairlines so
 * the block reads as a reference section, not a widget.
 *
 * Every answer stays mounted and is collapsed with a grid-rows transition
 * rather than being unmounted — closed answers must still be present in the
 * prerendered HTML for crawlers, which a mount/unmount animation would hide.
 */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

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
            <div
              id={`faq-panel-${i}`}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-7 pl-11 text-[0.9375rem] leading-relaxed text-ink-muted">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
