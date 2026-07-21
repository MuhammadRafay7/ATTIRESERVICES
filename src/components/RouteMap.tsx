"use client";

import { motion, useReducedMotion } from "motion/react";

/* ------------------------------------------------------------------
   Deterministic dotted world map + animated shipping lanes.
   Coordinates use a rough equirectangular projection on a 1000×500
   canvas so hub placement reads as a real world map. Generated with a
   fixed seed → identical output on server and client (no hydration drift).
------------------------------------------------------------------- */

const W = 1000;
const H = 500;

// Simple deterministic LCG so the dot field is stable across renders.
function makeRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

type Ellipse = { cx: number; cy: number; rx: number; ry: number; n: number };

// Loose continent blobs (not exact — an editorial impression of landmasses).
const landmasses: Ellipse[] = [
  { cx: 235, cy: 150, rx: 92, ry: 62, n: 46 }, // North America
  { cx: 250, cy: 108, rx: 85, ry: 34, n: 26 }, // Canada / Arctic
  { cx: 300, cy: 210, rx: 26, ry: 24, n: 8 }, // Central America
  { cx: 378, cy: 300, rx: 46, ry: 78, n: 40 }, // South America
  { cx: 515, cy: 112, rx: 46, ry: 34, n: 24 }, // Europe
  { cx: 560, cy: 245, rx: 56, ry: 86, n: 44 }, // Africa
  { cx: 705, cy: 150, rx: 128, ry: 78, n: 60 }, // Asia
  { cx: 690, cy: 210, rx: 30, ry: 34, n: 12 }, // India
  { cx: 792, cy: 238, rx: 40, ry: 28, n: 14 }, // SE Asia
  { cx: 865, cy: 332, rx: 46, ry: 30, n: 16 }, // Oceania
];

const dots: Array<[number, number]> = (() => {
  const rng = makeRng(20040517);
  const out: Array<[number, number]> = [];
  for (const m of landmasses) {
    let placed = 0;
    let guard = 0;
    while (placed < m.n && guard < m.n * 40) {
      guard++;
      const a = rng() * Math.PI * 2;
      const r = Math.sqrt(rng());
      const x = m.cx + Math.cos(a) * r * m.rx;
      const y = m.cy + Math.sin(a) * r * m.ry;
      out.push([Math.round(x), Math.round(y)]);
      placed++;
    }
  }
  return out;
})();

type Hub = { name: string; x: number; y: number };

// Meridian's six regional hubs, positioned by lon/lat.
const hubs: Hub[] = [
  { name: "New York", x: 294, y: 137 },
  { name: "Rotterdam", x: 512, y: 106 },
  { name: "Dubai", x: 654, y: 180 },
  { name: "Singapore", x: 788, y: 246 },
  { name: "Shanghai", x: 838, y: 163 },
  { name: "São Paulo", x: 371, y: 315 },
];

const H_NY = 0;
const H_ROT = 1;
const H_DXB = 2;
const H_SIN = 3;
const H_SHA = 4;
const H_SAO = 5;

// Arc between two hubs, lifted vertically for a great-circle feel.
function arc(a: Hub, b: Hub, lift = 0.2) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dist = Math.hypot(b.x - a.x, b.y - a.y);
  const cx = mx;
  const cy = my - dist * lift;
  return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`;
}

const lanes: Array<{ d: string; delay: number }> = [
  { d: arc(hubs[H_NY], hubs[H_ROT], 0.24), delay: 0 },
  { d: arc(hubs[H_ROT], hubs[H_DXB], 0.28), delay: 0.4 },
  { d: arc(hubs[H_DXB], hubs[H_SIN], 0.26), delay: 0.8 },
  { d: arc(hubs[H_SIN], hubs[H_SHA], 0.34), delay: 1.2 },
  { d: arc(hubs[H_NY], hubs[H_SAO], 0.2), delay: 0.6 },
  { d: arc(hubs[H_ROT], hubs[H_SHA], 0.16), delay: 1.0 },
  { d: arc(hubs[H_DXB], hubs[H_SHA], 0.3), delay: 1.6 },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function RouteMap({
  className = "",
  showLabels = false,
}: {
  className?: string;
  showLabels?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      role="img"
      aria-label="Meridian global shipping network across six continents"
      className={className}
    >
      {/* Continent dot field */}
      <g fill="currentColor">
        {dots.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={2.2} opacity={0.5} />
        ))}
      </g>

      {/* Shipping lanes */}
      <g>
        {lanes.map((lane, i) => (
          <g key={i}>
            {/* base lane draws in on view */}
            <motion.path
              d={lane.d}
              stroke="var(--gold)"
              strokeWidth={1.2}
              strokeLinecap="round"
              opacity={0.32}
              initial={reduce ? undefined : { pathLength: 0 }}
              whileInView={reduce ? undefined : { pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: EASE, delay: lane.delay * 0.3 }}
            />
            {/* traveling shipment streak */}
            {!reduce && (
              <motion.path
                d={lane.d}
                pathLength={1}
                stroke="var(--gold-bright)"
                strokeWidth={2}
                strokeLinecap="round"
                strokeDasharray="0.05 1"
                initial={{ strokeDashoffset: 1 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{
                  duration: 3.6,
                  repeat: Infinity,
                  ease: "linear",
                  delay: lane.delay,
                }}
              />
            )}
          </g>
        ))}
      </g>

      {/* Hub markers */}
      <g>
        {hubs.map((hub) => (
          <g key={hub.name} className="group">
            {!reduce && (
              <motion.circle
                cx={hub.x}
                cy={hub.y}
                r={5}
                fill="none"
                stroke="var(--gold-bright)"
                strokeWidth={1.5}
                initial={{ scale: 1, opacity: 0.7 }}
                animate={{ scale: [1, 3.2], opacity: [0.7, 0] }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                style={{ transformOrigin: `${hub.x}px ${hub.y}px` }}
              />
            )}
            <circle cx={hub.x} cy={hub.y} r={4} fill="var(--gold-bright)" />
            <circle cx={hub.x} cy={hub.y} r={8} fill="var(--gold-bright)" opacity={0.16} />
            {showLabels && (
              <text
                x={hub.x + 12}
                y={hub.y + 4}
                fontSize={15}
                fill="var(--ink)"
                opacity={0.7}
                className="font-sans"
              >
                {hub.name}
              </text>
            )}
          </g>
        ))}
      </g>
    </svg>
  );
}
