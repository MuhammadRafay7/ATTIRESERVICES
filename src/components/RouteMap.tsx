"use client";

import { motion, useReducedMotion } from "motion/react";

/* ------------------------------------------------------------------
   Deterministic dotted world map + export lanes between Ostenmark sites.
   Coordinates use a rough equirectangular projection on a 1000×500
   canvas so placement reads as a real world map. Generated with a fixed
   seed → identical output on server and client (no hydration drift).

   Motion is limited to a single draw-in on view. Nothing loops: an
   endlessly animating map reads as a screensaver, not as infrastructure.
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

// Loose continent blobs — an impression of landmass, not a survey.
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

type Hub = { name: string; x: number; y: number; production: boolean };

// Ostenmark's operating sites, positioned by lon/lat.
const hubs: Hub[] = [
  { name: "New York", x: 294, y: 137, production: false },
  { name: "Porto", x: 476, y: 136, production: true },
  { name: "Rotterdam", x: 512, y: 106, production: false },
  { name: "İzmir", x: 575, y: 143, production: true },
  { name: "Chennai", x: 723, y: 214, production: true },
  { name: "Ho Chi Minh City", x: 796, y: 220, production: true },
];

const H_NY = 0;
const H_POR = 1;
const H_ROT = 2;
const H_IZM = 3;
const H_CHE = 4;
const H_HCM = 5;

// Arc between two sites, lifted vertically for a great-circle feel.
function arc(a: Hub, b: Hub, lift = 0.2) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dist = Math.hypot(b.x - a.x, b.y - a.y);
  return `M ${a.x} ${a.y} Q ${mx} ${my - dist * lift} ${b.x} ${b.y}`;
}

const lanes: string[] = [
  arc(hubs[H_POR], hubs[H_ROT], 0.3),
  arc(hubs[H_IZM], hubs[H_ROT], 0.28),
  arc(hubs[H_CHE], hubs[H_ROT], 0.22),
  arc(hubs[H_HCM], hubs[H_ROT], 0.2),
  arc(hubs[H_ROT], hubs[H_NY], 0.24),
  arc(hubs[H_POR], hubs[H_NY], 0.22),
  arc(hubs[H_HCM], hubs[H_NY], 0.14),
];

const EASE = [0.32, 0.72, 0, 1] as const;

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
      aria-label="Ostenmark production sites and export lanes across Europe, South Asia, Southeast Asia and North America"
      className={className}
    >
      {/* Continent dot field */}
      <g fill="currentColor">
        {dots.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={2} opacity={0.45} />
        ))}
      </g>

      {/* Export lanes */}
      <g>
        {lanes.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="var(--accent)"
            strokeWidth={1}
            strokeLinecap="round"
            opacity={0.55}
            initial={reduce ? undefined : { pathLength: 0 }}
            whileInView={reduce ? undefined : { pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE, delay: i * 0.08 }}
          />
        ))}
      </g>

      {/* Site markers — filled squares for production, hollow for commercial */}
      <g>
        {hubs.map((hub) => (
          <g key={hub.name}>
            <rect
              x={hub.x - 3.5}
              y={hub.y - 3.5}
              width={7}
              height={7}
              fill={hub.production ? "var(--accent)" : "none"}
              stroke="var(--accent)"
              strokeWidth={1.5}
            />
            {showLabels && (
              <text
                x={hub.x + 12}
                y={hub.y + 4}
                fontSize={14}
                fill="currentColor"
                opacity={0.75}
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
