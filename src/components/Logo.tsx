import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Wordmark + meridian mark. Squared rather than circular, drawn on a
 * hairline weight to sit alongside the rest of the ruled interface.
 * Inline SVG so it inherits colour from context (light header, dark footer).
 */
export function Logo({
  className = "",
  onNavigate,
  showDescriptor = false,
}: {
  className?: string;
  onNavigate?: () => void;
  showDescriptor?: boolean;
}) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      aria-label={`${site.name} — home`}
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect x="0.6" y="0.6" width="22.8" height="22.8" stroke="currentColor" strokeWidth="1.2" />
        <path d="M0.6 12h22.8" stroke="currentColor" strokeWidth="1.2" />
        <path
          d="M12 0.6c2.9 3.1 4.4 7.2 4.4 11.4S14.9 20.3 12 23.4c-2.9-3.1-4.4-7.2-4.4-11.4S9.1 3.7 12 0.6Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <rect x="10.4" y="10.4" width="3.2" height="3.2" fill="var(--accent)" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-[0.9375rem] font-semibold tracking-[0.2em]">
          {site.wordmark}
        </span>
        {showDescriptor && (
          <span className="label-mono mt-1.5 hidden whitespace-nowrap text-[0.5625rem] tracking-[0.14em] opacity-70 sm:block">
            {site.descriptor}
          </span>
        )}
      </span>
    </Link>
  );
}
