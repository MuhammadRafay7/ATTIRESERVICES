"use client";

import { useEffect, useState } from "react";

export type NavSection = { id: string; label: string };

/**
 * In-page index that sticks under the masthead.
 *
 * These pages are long by design — a procurement reader wants the detail.
 * A senior reader does not, and should never have to scroll to find out
 * whether the page holds what they came for. The index makes the whole
 * document legible at a glance and reachable in one click.
 */
export function SectionNav({ sections }: { sections: NavSection[] }) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // Band just below the sticky masthead, so "active" tracks what is
      // actually being read rather than what is merely on screen.
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="sticky top-16 z-40 border-b border-line bg-bg/95 backdrop-blur-sm lg:top-27">
      <div className="container-x">
        <nav
          aria-label="On this page"
          className="-mx-1 flex items-center gap-1 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <span className="label-mono mr-3 hidden shrink-0 pl-1 text-ink-faint lg:block">
            On this page
          </span>
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`shrink-0 whitespace-nowrap rounded-brand px-3 py-1.5 text-[0.8125rem] transition-colors ${
                  isActive
                    ? "bg-ink text-bg"
                    : "text-ink-muted hover:bg-bg-muted hover:text-ink"
                }`}
              >
                {s.label}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
