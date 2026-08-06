"use client";

import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { CollectionSchema } from "../../schema";
import { AdminButton, AdminCard, AdminEmptyState, AdminPage } from "../../ui";
import { ItemEditor, NewItem } from "./ItemEditor";

type Row = {
  id: string;
  published: boolean;
  data: Record<string, unknown>;
  thumb: string;
};
type Media = { name: string; url: string };

/**
 * A collection rendered as a console table.
 *
 * The list is the screen someone spends most of their time on, so it carries
 * real information: a second line drawn from the collection's own schema, a
 * visibility state, and a filter once the list is long enough to need one.
 * Editing happens inline rather than on a separate route — the surrounding
 * order is usually the reason you are editing at all.
 */
export function CollectionEditor({
  collection,
  schema,
  rows,
  library,
}: {
  collection: string;
  schema: CollectionSchema;
  rows: Row[];
  library: Media[];
}) {
  const [adding, setAdding] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) =>
      JSON.stringify(row.data).toLowerCase().includes(q),
    );
  }, [rows, query]);

  const hidden = rows.filter((r) => !r.published).length;

  return (
    <AdminPage
      title={schema.label}
      description={schema.hint}
      actions={
        <AdminButton onClick={() => setAdding(true)}>
          <Plus size={15} aria-hidden />
          Add item
        </AdminButton>
      }
    >
      {adding && (
        <NewItem
          collection={collection}
          schema={schema}
          position={rows.length}
          library={library}
          onCancel={() => setAdding(false)}
        />
      )}

      <AdminCard
        className="overflow-hidden"
        footer={
          <>
            <p className="text-xs text-fg-subtle">
              Use the arrows to reorder. Unticking “Visible” hides an item
              without deleting it.
            </p>
            {hidden > 0 && (
              <p className="text-xs text-brass">
                {hidden} hidden from the site
              </p>
            )}
          </>
        }
      >
        {/* Toolbar */}
        <div className="-mx-6 -mt-6 mb-0 flex flex-wrap items-center justify-between gap-3 border-b border-line px-6 py-3">
          <p className="text-sm font-medium text-fg">
            {filtered.length === rows.length
              ? `${rows.length} item${rows.length === 1 ? "" : "s"}`
              : `${filtered.length} of ${rows.length}`}
          </p>

          {rows.length > 5 && (
            <div className="relative">
              <Search
                size={14}
                aria-hidden
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg-subtle"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter…"
                aria-label={`Filter ${schema.label}`}
                className="w-48 rounded-md border border-line-strong bg-canvas py-1.5 pl-8 pr-3 text-sm text-fg placeholder:text-fg-subtle/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-ring"
              />
            </div>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="-mx-6 -mb-6 px-6 py-6">
            <AdminEmptyState
              title={query ? "Nothing matches that filter" : "Nothing here yet"}
              description={query ? undefined : schema.hint}
              action={
                query ? (
                  <AdminButton variant="secondary" onClick={() => setQuery("")}>
                    Clear filter
                  </AdminButton>
                ) : (
                  <AdminButton onClick={() => setAdding(true)}>
                    Add the first item
                  </AdminButton>
                )
              }
            />
          </div>
        ) : (
          <ul className="-mx-6 -mb-6 divide-y divide-line">
            {filtered.map((row) => {
              const index = rows.findIndex((r) => r.id === row.id);
              return (
                <ItemEditor
                  key={row.id}
                  id={row.id}
                  collection={collection}
                  schema={schema}
                  data={row.data}
                  published={row.published}
                  thumb={row.thumb}
                  index={index}
                  isFirst={index === 0}
                  isLast={index === rows.length - 1}
                  library={library}
                />
              );
            })}
          </ul>
        )}
      </AdminCard>
    </AdminPage>
  );
}
