import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * Eyebrow + h2 + optional lead paragraph.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  onDeep = false,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  onDeep?: boolean;
  className?: string;
}) {
  const centered = align === "center";
  return (
    <Reveal
      className={`${centered ? "mx-auto text-center" : ""} max-w-2xl ${className}`}
    >
      {eyebrow && (
        <p
          className={`eyebrow ${centered ? "eyebrow--center justify-center" : ""} ${
            onDeep ? "eyebrow--on-deep" : ""
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`display display-md mt-6 ${
          onDeep ? "text-on-deep" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-6 text-lg leading-relaxed ${
            onDeep ? "text-on-deep-muted" : "text-muted"
          }`}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}
