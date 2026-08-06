import Link from "next/link";


/**
 * Wordmark + lane mark.
 *
 * The mark encodes the two halves of the business literally: three weft
 * threads for the cloth, and a single lane lifting off across them to a
 * brass node — the shipment leaving the mill. Drawn on a hairline weight
 * so it reads at 24px in the masthead and at 96px on the OG card.
 *
 * Inline SVG so it inherits colour from context (light header, dark footer);
 * only the destination node is fixed brass.
 */
export function LogoMark({
  size = 26,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      <rect
        x="1"
        y="1"
        width="26"
        height="26"
        rx="6"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* weft — the cloth */}
      <g stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.42">
        <path d="M7 10.5h14" />
        <path d="M7 14h14" />
        <path d="M7 17.5h14" />
      </g>
      {/* lane — the shipment leaving it */}
      <path
        d="M6.6 20.6C12 20.6 15.2 16.4 20.2 8.4"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <circle cx="20.9" cy="7.4" r="2.4" fill="var(--brass)" />
    </svg>
  );
}

/**
 * Brand fields are passed in rather than fetched here: the header is a client
 * component and cannot await, so the server layout resolves them once and hands
 * them down to both header and footer.
 */
export type LogoBrand = {
  name: string;
  wordmark: string;
  descriptor: string;
  logoUrl?: string;
};

export function Logo({
  brand,
  className = "",
  onNavigate,
  showDescriptor = false,
}: {
  brand: LogoBrand;
  className?: string;
  onNavigate?: () => void;
  showDescriptor?: boolean;
}) {
  const { logoUrl } = brand;
  const [first, ...rest] = brand.wordmark.split(" ");

  return (
    <Link
      href="/"
      onClick={onNavigate}
      aria-label={`${brand.name} — home`}
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      {logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element -- arbitrary CMS host
        <img src={logoUrl} alt="" className="h-7 w-auto max-w-[10rem] shrink-0 object-contain" />
      ) : (
        <LogoMark />
      )}
      <span className={`flex flex-col leading-none ${logoUrl ? "sr-only" : ""}`}>
        <span className="font-display text-[0.9375rem] tracking-[0.14em]">
          <span className="font-bold">{first}</span>{" "}
          <span className="font-normal opacity-75">{rest.join(" ")}</span>
        </span>
        {showDescriptor && (
          <span className="label-mono mt-1.5 hidden whitespace-nowrap text-[0.5625rem] tracking-[0.14em] opacity-70 sm:block">
            {brand.descriptor}
          </span>
        )}
      </span>
    </Link>
  );
}
