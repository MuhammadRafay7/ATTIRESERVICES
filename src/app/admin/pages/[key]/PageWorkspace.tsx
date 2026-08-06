"use client";

import { Layers, Link2, Settings2, Type } from "lucide-react";
import { useState } from "react";
import type { AdminPageDef } from "../../page-map";
import type { CollectionSchema } from "../../schema";
import { AdminCard, AdminEmptyState } from "../../ui";
import { ItemEditor, NewItem } from "../../content/[collection]/ItemEditor";
import { PageSettings } from "./PageSettings";
import { SectionStack } from "./SectionStack";

type Row = {
  id: string;
  collection: string;
  published: boolean;
  data: Record<string, unknown>;
  thumb: string;
};

type Page = {
  slug: string;
  title: string;
  description: string | null;
  nav_label: string | null;
  nav_order: number;
  in_nav: boolean;
  published: boolean;
} | null;

type Section = {
  id: string;
  page_slug: string;
  type: string;
  position: number;
  published: boolean;
};

/** One content block: the rows of a collection, in the context of this page. */
function Block({
  collection,
  where,
  sharedWith,
  schema,
  rows,
  library,
}: {
  collection: string;
  where: string;
  sharedWith?: string;
  schema: CollectionSchema;
  rows: Row[];
  library: { name: string; url: string }[];
}) {
  const [adding, setAdding] = useState(false);
  const mine = rows.filter((r) => r.collection === collection);

  return (
    <AdminCard
      title={schema.label}
      description={where}
      footer={
        <>
          <button
            type="button"
            onClick={() => setAdding((v) => !v)}
            className="cursor-pointer text-sm font-medium text-accent hover:underline"
          >
            {adding ? "Cancel" : `Add to ${schema.label.toLowerCase()}`}
          </button>
          {sharedWith && (
            <p className="text-xs text-fg-subtle">
              Also used on {sharedWith} — edits apply there too.
            </p>
          )}
        </>
      }
    >
      {adding && (
        <div className="mb-4">
          <NewItem
            collection={collection}
            schema={schema}
            position={mine.length}
            library={library}
            onCancel={() => setAdding(false)}
          />
        </div>
      )}

      {mine.length === 0 ? (
        <AdminEmptyState title="Nothing here yet" description={schema.hint} />
      ) : (
        <ul className="-mx-5 -my-5 divide-y divide-line">
          {mine.map((row, i) => (
            <ItemEditor
              key={row.id}
              id={row.id}
              collection={collection}
              schema={schema}
              data={row.data}
              published={row.published}
              thumb={row.thumb}
              index={i}
              isFirst={i === 0}
              isLast={i === mine.length - 1}
              library={library}
            />
          ))}
        </ul>
      )}
    </AdminCard>
  );
}

export function PageWorkspace({
  def,
  page,
  sections,
  rows,
  copyRows,
  copySchema,
  schemas,
  library,
}: {
  def: AdminPageDef;
  page: Page;
  sections: Section[];
  rows: Row[];
  /** `page_copy` entries scoped to this page. */
  copyRows: Row[];
  copySchema: CollectionSchema;
  schemas: Record<string, CollectionSchema>;
  library: { name: string; url: string }[];
}) {
  const [tab, setTab] = useState<
    "content" | "copy" | "sections" | "settings"
  >("content");

  const tabs = [
    { id: "content" as const, label: "Content", icon: Layers, count: def.blocks.length },
    { id: "copy" as const, label: "Headings", icon: Type, count: copyRows.length },
    { id: "sections" as const, label: "Sections", icon: Link2, count: sections.length },
    { id: "settings" as const, label: "Page settings", icon: Settings2 },
  ];

  return (
    <>
      {/* Sub-tabs: content is what changes most, so it leads. */}
      <div className="flex flex-wrap gap-1 border-b border-line">
        {tabs.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              aria-current={active ? "true" : undefined}
              className={`-mb-px flex cursor-pointer items-center gap-2 border-b-2 px-3.5 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "border-accent text-accent"
                  : "border-transparent text-fg-muted hover:text-fg"
              }`}
            >
              <t.icon size={15} aria-hidden />
              {t.label}
              {typeof t.count === "number" && (
                <span
                  className={`rounded px-1.5 py-0.5 text-[0.6875rem] ${
                    active ? "bg-accent-wash text-accent" : "bg-surface-sunken text-fg-subtle"
                  }`}
                >
                  {t.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {tab === "content" &&
        def.blocks.map((block) => {
          const schema = schemas[block.collection];
          if (!schema) return null;
          return (
            <Block
              key={`${block.collection}-${block.where}`}
              collection={block.collection}
              where={block.where}
              sharedWith={block.sharedWith}
              schema={schema}
              rows={rows}
              library={library}
            />
          );
        })}

      {tab === "copy" && (
        <AdminCard
          title="Section headings"
          description="The eyebrow, heading and lead paragraph above each block on this page. Clearing a heading removes it from the page."
        >
          {copyRows.length === 0 ? (
            <AdminEmptyState title="No headings recorded for this page" />
          ) : (
            <ul className="-mx-5 -my-5 divide-y divide-line">
              {copyRows.map((row, i) => (
                <ItemEditor
                  key={row.id}
                  id={row.id}
                  collection="page_copy"
                  schema={copySchema}
                  data={row.data}
                  published={row.published}
                  thumb=""
                  index={i}
                  isFirst
                  isLast
                  library={library}
                />
              ))}
            </ul>
          )}
        </AdminCard>
      )}

      {tab === "sections" && (
        <SectionStack pageSlug={def.slug} sections={sections} />
      )}

      {tab === "settings" && page && <PageSettings page={page} />}
    </>
  );
}
