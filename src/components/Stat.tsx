/**
 * Big number + label (BUILD_BRIEF §5). e.g. "120+ / Countries served".
 */
export function Stat({
  value,
  label,
  onDeep = false,
}: {
  value: string;
  label: string;
  onDeep?: boolean;
}) {
  return (
    <div>
      <div
        className={`font-display text-4xl sm:text-5xl leading-none ${
          onDeep ? "text-on-deep" : "text-ink"
        }`}
      >
        {value}
      </div>
      <div
        className={`mt-2.5 text-sm font-medium tracking-wide ${
          onDeep ? "text-on-deep-muted" : "text-muted"
        }`}
      >
        {label}
      </div>
    </div>
  );
}
