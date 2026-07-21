import type { ReactNode } from "react";

type Background = "default" | "soft" | "sand" | "deep" | "abyss";

const backgrounds: Record<Background, string> = {
  default: "bg-bg text-ink-soft",
  soft: "bg-bg-soft text-ink-soft",
  sand: "bg-bg-sand text-ink-soft",
  deep: "bg-deep text-on-deep",
  abyss: "bg-abyss text-on-deep",
};

/**
 * Vertical rhythm wrapper with optional background variant.
 */
export function Section({
  children,
  background = "default",
  className = "",
  containerClassName = "",
  id,
}: {
  children: ReactNode;
  background?: Background;
  className?: string;
  containerClassName?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`relative py-24 sm:py-28 lg:py-32 ${backgrounds[background]} ${className}`}
    >
      <div className={`container-x relative ${containerClassName}`}>{children}</div>
    </section>
  );
}
