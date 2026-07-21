"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Fade + rise on scroll (Motion-powered). Keeps the original API
 * (`delay` in ms) so existing call sites keep working.
 */
export function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 26,
  className = "",
}: {
  children: ReactNode;
  as?: keyof typeof motion;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionTag = (motion as any)[as] ?? motion.div;

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.75, delay: delay / 1000, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}
