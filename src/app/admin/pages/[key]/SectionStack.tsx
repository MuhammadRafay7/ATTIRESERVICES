"use client";

import { ChevronDown, ChevronUp, Eye, EyeOff, Trash2 } from "lucide-react";
import { addSection, deleteSection, moveSection, toggleSection } from "../../actions";
import { AdminCard } from "../../ui";
import { SECTION_TYPES } from "../section-types";

type Section = {
  id: string;
  page_slug: string;
  type: string;
  position: number;
  published: boolean;
};

/**
 * The blocks this page is built from, top to bottom.
 *
 * Types come from a fixed list because the renderer maps each one to a
 * component — free text would let someone add a block that renders nothing.
 */
export function SectionStack({
  pageSlug,
  sections,
}: {
  pageSlug: string;
  sections: Section[];
}) {
  return (
    <AdminCard
      title="Sections"
      description="The blocks stacked down this page, in order."
      footer={
        <form action={addSection} className="flex flex-wrap items-center gap-2">
          <input type="hidden" name="page_slug" value={pageSlug} />
          <select
            name="type"
            aria-label="Section to add"
            className="h-9 min-w-56 rounded-md border border-line-strong bg-surface-raised px-3 text-sm text-fg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-ring"
          >
            {Object.entries(SECTION_TYPES).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="h-9 cursor-pointer rounded-md border border-line-strong px-3 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
          >
            Add section
          </button>
        </form>
      }
    >
      {sections.length === 0 ? (
        <p className="py-6 text-center text-sm text-fg-muted">
          No sections yet — add one below.
        </p>
      ) : (
        <ul className="-mx-5 -my-5 divide-y divide-line">
          {sections.map((section, i) => (
            <li key={section.id} className="flex items-center gap-3 px-5 py-2.5">
              <span className="w-6 shrink-0 font-mono text-xs text-fg-subtle">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm text-fg">
                  {SECTION_TYPES[section.type] ?? section.type}
                </span>
                {!section.published && (
                  <span className="text-xs text-brass">Hidden from the site</span>
                )}
              </span>

              <div className="flex shrink-0 items-center gap-1">
                {(["up", "down"] as const).map((direction) => (
                  <form key={direction} action={moveSection}>
                    <input type="hidden" name="id" value={section.id} />
                    <input type="hidden" name="page_slug" value={pageSlug} />
                    <input type="hidden" name="direction" value={direction} />
                    <button
                      type="submit"
                      title={direction === "up" ? "Move up" : "Move down"}
                      disabled={direction === "up" ? i === 0 : i === sections.length - 1}
                      className="grid h-7 w-7 cursor-pointer place-items-center rounded-md text-fg-subtle transition-colors hover:bg-surface-sunken hover:text-fg disabled:cursor-not-allowed disabled:opacity-25"
                    >
                      {direction === "up" ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </form>
                ))}
                <form action={toggleSection}>
                  <input type="hidden" name="id" value={section.id} />
                  <input type="hidden" name="published" value={String(section.published)} />
                  <button
                    type="submit"
                    title={section.published ? "Hide" : "Show"}
                    className="grid h-7 w-7 cursor-pointer place-items-center rounded-md text-fg-subtle transition-colors hover:bg-surface-sunken hover:text-fg"
                  >
                    {section.published ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                </form>
                <form action={deleteSection}>
                  <input type="hidden" name="id" value={section.id} />
                  <button
                    type="submit"
                    title="Remove section"
                    className="grid h-7 w-7 cursor-pointer place-items-center rounded-md text-fg-subtle transition-colors hover:bg-critical/10 hover:text-critical"
                  >
                    <Trash2 size={14} />
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </AdminCard>
  );
}
