import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Wordmark + meridian/globe line mark (BUILD_BRIEF §3), inline SVG so it
 * inherits color from context (dark footer vs. light/over-hero header).
 */
export function Logo({
  className = "",
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      aria-label={`${site.name} — home`}
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="13" cy="13" r="11.25" stroke="var(--gold)" strokeWidth="1.5" />
        <path
          d="M1.75 13h22.5M13 1.75c3.2 3 4.9 7.1 4.9 11.25S16.2 21.25 13 24.25c-3.2-3-4.9-7.1-4.9-11.25S9.8 4.75 13 1.75Z"
          stroke="var(--gold)"
          strokeWidth="1.5"
        />
        <circle cx="13" cy="13" r="2" fill="var(--gold)" />
      </svg>
      <span className="font-display text-xl tracking-[0.14em]">
        {site.wordmark}
      </span>
    </Link>
  );
}
