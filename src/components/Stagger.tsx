"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Container that reveals its <StaggerItem> children in sequence on scroll.
 */
export function Stagger({
  children,
  className = "",
  stagger = 0.09,
  delayChildren = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  as?: keyof typeof motion;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionTag = (motion as any)[as] ?? motion.div;
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren } },
  };
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({
  children,
  className = "",
  y = 26,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: keyof typeof motion;
}) {
  const reduce = useReducedMotion();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionTag = (motion as any)[as] ?? motion.div;
  const variants: Variants = reduce
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
      };
  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  );
}
