import type { ReactNode } from "react";

type Background = "default" | "subtle" | "muted" | "deep";

const backgrounds: Record<Background, string> = {
  default: "bg-bg text-ink-body",
  subtle: "bg-bg-subtle text-ink-body",
  muted: "bg-bg-muted text-ink-body",
  deep: "bg-deep text-on-deep",
};

/**
 * Vertical rhythm wrapper. Sections are separated by a hairline rather
 * than by colour alone, which is what gives the page its ruled,
 * document-like structure.
 */
export function Section({
  children,
  background = "default",
  divider = true,
  className = "",
  containerClassName = "",
  id,
}: {
  children: ReactNode;
  background?: Background;
  divider?: boolean;
  className?: string;
  containerClassName?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`relative py-20 sm:py-24 lg:py-28 ${backgrounds[background]} ${
        divider ? "border-t border-line" : ""
      } ${background === "deep" ? "border-white/10" : ""} ${className}`}
    >
      <div className={`container-x relative ${containerClassName}`}>{children}</div>
    </section>
  );
}
