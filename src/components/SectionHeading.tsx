import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * Eyebrow + h2 + optional lead. The eyebrow is monospaced and carries an
 * optional section index, which is what makes a long page read as a
 * structured document rather than a sequence of marketing blocks.
 */
export function SectionHeading({
  eyebrow,
  index,
  title,
  lead,
  align = "left",
  onDeep = false,
  className = "",
}: {
  eyebrow?: string;
  index?: string;
  /** Present when a copy record is spread in; not rendered. */
  key?: string;
  title?: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  onDeep?: boolean;
  className?: string;
}) {
  const centered = align === "center";
  return (
    <Reveal
      className={`${centered ? "mx-auto text-center" : ""} max-w-3xl ${className}`}
    >
      {eyebrow && (
        <div
          className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}
        >
          <p
            className={`eyebrow ${centered ? "eyebrow--center" : ""} ${
              onDeep ? "eyebrow--on-deep" : ""
            }`}
          >
            {eyebrow}
          </p>
          {index && (
            <span
              className={`label-mono ${
                onDeep ? "text-on-deep-muted/60" : "text-ink-faint"
              }`}
            >
              {index}
            </span>
          )}
        </div>
      )}
      {title ? (
        <h2
          className={`display display-md mt-5 ${
            onDeep ? "text-on-deep" : "text-ink"
          }`}
        >
          {title}
        </h2>
      ) : null}
      {lead && (
        <p
          className={`mt-5 max-w-2xl text-base leading-relaxed sm:text-[1.0625rem] ${
            onDeep ? "text-on-deep-muted" : "text-ink-muted"
          } ${centered ? "mx-auto" : ""}`}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}
