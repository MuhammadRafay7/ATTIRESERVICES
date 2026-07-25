import { CountUp } from "./CountUp";

/**
 * A single operating figure: monospaced value, label above, optional
 * qualifying note beneath. The note matters — an unqualified number is a
 * claim, a qualified one is data.
 */
export function Stat({
  value,
  label,
  note,
  onDeep = false,
  animate = true,
  size = "md",
}: {
  value: string;
  label: string;
  note?: string;
  onDeep?: boolean;
  animate?: boolean;
  size?: "md" | "lg";
}) {
  const valueClass = `figure block ${
    size === "lg" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"
  } ${onDeep ? "text-on-deep" : "text-ink"}`;

  return (
    <div>
      <span
        className={`label-mono ${onDeep ? "text-on-deep-muted" : "text-ink-muted"}`}
      >
        {label}
      </span>
      <div className="mt-3">
        {animate ? (
          <CountUp value={value} className={valueClass} />
        ) : (
          <span className={valueClass}>{value}</span>
        )}
      </div>
      {note && (
        <p
          className={`mt-2 text-xs ${
            onDeep ? "text-on-deep-muted/70" : "text-ink-faint"
          }`}
        >
          {note}
        </p>
      )}
    </div>
  );
}
