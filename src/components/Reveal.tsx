"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.32, 0.72, 0, 1] as const;

/**
 * Restrained entrance: a short fade and rise, nothing more. Distance and
 * duration are deliberately small — motion should register as the page
 * settling, not as an effect.
 */
export function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 12,
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
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.5, delay: delay / 1000, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}
