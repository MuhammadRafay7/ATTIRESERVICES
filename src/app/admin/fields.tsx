"use client";

import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import { iconMap } from "@/components/icons";
import { uploadMedia } from "./actions";
import type { FieldDef } from "./schema";

/**
 * Typed field controls for the collection editor.
 *
 * Each control writes a plain form value; the server action reassembles the
 * row from the type map it is sent. Lists and pairs are edited as one entry
 * per line, which is quicker to work with than a stack of add/remove buttons
 * and survives copy-paste from a document.
 */

function Label({ def }: { def: FieldDef }) {
  return (
    <>
      <span className="text-sm font-medium text-ink">{def.label}</span>
      {def.hint && (
        <span className="mt-0.5 block text-xs leading-relaxed text-ink-faint">
          {def.hint}
        </span>
      )}
    </>
  );
}

/* ---------------------------------------------------------------- image --- */

export function ImageField({
  def,
  value,
  library,
}: {
  def: FieldDef;
  value: string;
  library: { name: string; url: string }[];
}) {
  const [current, setCurrent] = useState(value ?? "");
  const [picking, setPicking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);

  function onFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    const body = new FormData();
    body.set("file", file);
    startTransition(async () => {
      const result = await uploadMedia(null, body);
      if (result.ok && result.url) {
        setCurrent(result.url);
        setPicking(false);
      } else {
        setError(result.message);
      }
    });
  }

  return (
    <div>
      <Label def={def} />
      <input type="hidden" name={`field.${def.name}`} value={current} />

      <div className="mt-2 flex flex-wrap items-start gap-4">
        <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-brand-sm border border-line bg-bg-muted">
          {current ? (
            <Image
              src={current}
              alt=""
              fill
              sizes="128px"
              className="object-cover"
              unoptimized={current.startsWith("http")}
            />
          ) : (
            <span className="flex h-full items-center justify-center text-xs text-ink-faint">
              None
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={pending}
              className="cursor-pointer rounded-brand-sm bg-accent px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-accent-strong disabled:opacity-60"
            >
              {pending ? "Uploading…" : "Upload from device"}
            </button>
            <button
              type="button"
              onClick={() => setPicking((v) => !v)}
              className="cursor-pointer rounded-brand-sm border border-line-strong px-3 py-2 text-xs font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              {picking ? "Close library" : "Choose from library"}
            </button>
            {current && (
              <button
                type="button"
                onClick={() => setCurrent("")}
                className="cursor-pointer px-2 py-2 text-xs text-ink-faint transition-colors hover:text-danger"
              >
                Remove
              </button>
            )}
          </div>

          {/* Drag-and-drop target doubles as the manual path input. */}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onFile(e.target.files?.[0])}
          />
          <input
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            placeholder="/photos/example.jpg or https://…"
            className="field font-mono text-xs"
            aria-label={`${def.label} path`}
          />
          {error && <p className="text-xs text-danger">{error}</p>}
        </div>
      </div>

      {picking && (
        <div className="mt-3 grid max-h-64 grid-cols-3 gap-2 overflow-y-auto rounded-brand border border-line p-2 sm:grid-cols-5">
          {library.length === 0 && (
            <p className="col-span-full p-3 text-xs text-ink-faint">
              Nothing uploaded yet. Use “Upload from device”.
            </p>
          )}
          {library.map((item) => (
            <button
              key={item.url}
              type="button"
              onClick={() => {
                setCurrent(item.url);
                setPicking(false);
              }}
              title={item.name}
              className="relative aspect-4/3 cursor-pointer overflow-hidden rounded-brand-sm border border-line hover:border-accent"
            >
              <Image
                src={item.url}
                alt={item.name}
                fill
                sizes="120px"
                className="object-cover"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------- icon --- */

export function IconField({ def, value }: { def: FieldDef; value: string }) {
  const [current, setCurrent] = useState(value ?? "");
  const names = Object.keys(iconMap) as (keyof typeof iconMap)[];

  return (
    <div>
      <Label def={def} />
      <input type="hidden" name={`field.${def.name}`} value={current} />
      <div className="mt-2 grid grid-cols-8 gap-1.5 rounded-brand border border-line p-2 sm:grid-cols-12">
        {names.map((name) => {
          const Icon = iconMap[name];
          const active = current === name;
          return (
            <button
              key={name}
              type="button"
              title={name.replace("Icon", "")}
              onClick={() => setCurrent(name)}
              aria-pressed={active}
              className={`flex aspect-square cursor-pointer items-center justify-center rounded-brand-sm border transition-colors ${
                active
                  ? "border-accent bg-accent-wash text-accent"
                  : "border-transparent text-ink-muted hover:border-line hover:text-ink"
              }`}
            >
              <Icon width={18} height={18} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- list --- */

export function ListField({ def, value }: { def: FieldDef; value: string[] }) {
  return (
    <label className="block">
      <Label def={def} />
      <textarea
        name={`field.${def.name}`}
        rows={Math.min(Math.max(value.length + 2, 4), 12)}
        defaultValue={value.join("\n")}
        placeholder="One per line"
        className="field mt-2 text-sm leading-relaxed"
      />
    </label>
  );
}

/* ---------------------------------------------------------------- pairs --- */

export function PairsField({
  def,
  value,
}: {
  def: FieldDef;
  value: Record<string, unknown>[];
}) {
  const [a, b] = def.pairKeys ?? ["key", "value"];
  const lines = value
    .map((row) => `${String(row[a] ?? "")} | ${String(row[b] ?? "")}`)
    .join("\n");

  return (
    <label className="block">
      <Label def={def} />
      <span className="mt-0.5 block text-xs text-ink-faint">
        One per line, as <code className="font-mono">{a} | {b}</code>
      </span>
      <textarea
        name={`field.${def.name}`}
        rows={Math.min(Math.max(value.length + 2, 3), 10)}
        defaultValue={lines}
        className="field mt-2 font-mono text-[0.8125rem] leading-relaxed"
      />
    </label>
  );
}

/* --------------------------------------------------------------- simple --- */

export function SimpleField({
  def,
  value,
}: {
  def: FieldDef;
  value: string | number;
}) {
  const name = `field.${def.name}`;

  if (def.type === "select") {
    return (
      <label className="block">
        <Label def={def} />
        <select name={name} defaultValue={String(value ?? "")} className="field mt-2">
          {(def.options ?? []).map((option) => (
            <option key={option} value={option}>
              {option === "" ? "— none —" : option}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (def.type === "textarea") {
    return (
      <label className="block">
        <Label def={def} />
        <textarea
          name={name}
          rows={def.rows ?? 4}
          defaultValue={String(value ?? "")}
          className="field mt-2 text-sm leading-relaxed"
        />
      </label>
    );
  }

  return (
    <label className="block">
      <Label def={def} />
      <input
        name={name}
        type={def.type === "number" ? "number" : "text"}
        step={def.type === "number" ? "any" : undefined}
        defaultValue={String(value ?? "")}
        className="field mt-2"
      />
    </label>
  );
}
