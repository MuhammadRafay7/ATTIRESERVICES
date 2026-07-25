import type { ReactNode } from "react";

/**
 * Ruled key/value list. The workhorse of the enterprise layout — it turns
 * claims into specification, and it is what a sourcing lead actually reads.
 */
export function SpecTable({
  rows,
  onDeep = false,
  dense = false,
  className = "",
}: {
  rows: readonly { term: string; value: ReactNode }[];
  onDeep?: boolean;
  dense?: boolean;
  className?: string;
}) {
  return (
    <dl
      className={`border-t ${onDeep ? "border-white/12" : "border-line"} ${className}`}
    >
      {rows.map((row) => (
        <div
          key={row.term}
          className={`flex flex-col gap-1 border-b sm:flex-row sm:items-baseline sm:gap-6 ${
            onDeep ? "border-white/12" : "border-line"
          } ${dense ? "py-3" : "py-4"}`}
        >
          <dt
            className={`label-mono sm:w-52 sm:shrink-0 ${
              onDeep ? "text-on-deep-muted" : "text-ink-muted"
            }`}
          >
            {row.term}
          </dt>
          {/* Values include long unbroken tokens (emails, references) that
              would otherwise push the column past its container. */}
          <dd
            className={`min-w-0 text-sm break-words [overflow-wrap:anywhere] ${
              onDeep ? "text-on-deep" : "text-ink"
            }`}
          >
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Full data table for the certification register — four columns of
 * verifiable record. Scrolls horizontally on narrow screens rather than
 * wrapping into illegibility.
 */
export function DataTable({
  columns,
  rows,
  caption,
}: {
  columns: string[];
  rows: readonly (readonly ReactNode[])[];
  caption?: string;
}) {
  // `min-w-0` matters: as a grid/flex child this wrapper would otherwise take
  // its min-content width from the wide table and push the whole page sideways
  // instead of scrolling internally.
  return (
    <div className="min-w-0 max-w-full overflow-x-auto">
      <table className="w-full min-w-[42rem] border-collapse text-left">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="border-y border-line">
            {columns.map((col) => (
              <th
                key={col}
                scope="col"
                className="label-mono py-3.5 pr-6 font-medium last:pr-0"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-line">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`py-4 pr-6 align-top text-sm last:pr-0 ${
                    j === 0 ? "font-mono text-ink" : "text-ink-muted"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
