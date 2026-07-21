"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/**
 * Animates a numeric value up from zero when scrolled into view.
 * Preserves any prefix/suffix and decimal precision from the target
 * string, e.g. "120+", "1.2M", "99.4%", "1,400+".
 */
export function CountUp({
  value,
  duration = 1.9,
  className = "",
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  const match = value.match(/^(\D*)([\d.,]+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const numStr = match?.[2] ?? value;
  const suffix = match?.[3] ?? "";
  const hasComma = numStr.includes(",");
  const clean = numStr.replace(/,/g, "");
  const target = Number.parseFloat(clean) || 0;
  const decimals = clean.includes(".") ? clean.split(".")[1].length : 0;

  const format = (n: number) => {
    const fixed = n.toFixed(decimals);
    const withGroups = hasComma
      ? Number(fixed).toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : fixed;
    return `${prefix}${withGroups}${suffix}`;
  };

  const [display, setDisplay] = useState(() =>
    reduce ? format(target) : format(0),
  );

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(format(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, target, duration]);

  return (
    <span ref={ref} className={`tnum ${className}`}>
      {display}
    </span>
  );
}
