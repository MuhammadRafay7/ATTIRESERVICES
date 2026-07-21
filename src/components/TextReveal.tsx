"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { Fragment } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Segment = { text: string; accent?: boolean };

/**
 * Editorial headline that rises word-by-word from behind a mask.
 * Accepts plain text or accent segments (e.g. gold-highlighted words).
 * Renders an accessible full-text label; the animated pieces are hidden
 * from assistive tech.
 */
export function TextReveal({
  text,
  segments,
  className = "",
  as = "h1",
  stagger = 0.055,
  delay = 0,
}: {
  text?: string;
  segments?: Segment[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  stagger?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const parts: Segment[] = segments ?? [{ text: text ?? "" }];
  const label = parts.map((p) => p.text).join(" ");
  const Tag = as;

  if (reduce) {
    return (
      <Tag className={className}>
        {parts.map((p, i) => (
          <span key={i} className={p.accent ? "text-gold-bright" : undefined}>
            {p.text}
            {i < parts.length - 1 ? " " : ""}
          </span>
        ))}
      </Tag>
    );
  }

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const word: Variants = {
    hidden: { y: "115%" },
    show: { y: 0, transition: { duration: 0.8, ease: EASE } },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      aria-label={label}
    >
      {parts.map((part, pi) => {
        const words = part.text.split(" ");
        return (
          <Fragment key={pi}>
            {words.map((w, wi) => (
              <span
                key={`${pi}-${wi}`}
                aria-hidden
                className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom"
              >
                <motion.span
                  variants={word}
                  className={`inline-block ${part.accent ? "text-gold-bright" : ""}`}
                >
                  {w}
                  {" "}
                </motion.span>
              </span>
            ))}
          </Fragment>
        );
      })}
    </MotionTag>
  );
}
