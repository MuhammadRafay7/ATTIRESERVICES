import type { ReactNode, CSSProperties } from "react";

/**
 * Infinite horizontal ticker — used for the freight/route/commodity strip.
 * Pure CSS animation (pauses on hover, disabled under reduced-motion).
 */
export function Marquee({
  children,
  duration = 42,
  className = "",
}: {
  children: ReactNode;
  duration?: number;
  className?: string;
}) {
  return (
    <div
      className={`marquee-group relative flex overflow-hidden ${className}`}
      style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
    >
      <div className="marquee">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
