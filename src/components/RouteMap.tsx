"use client";

import { motion, useReducedMotion } from "motion/react";

/* ------------------------------------------------------------------
   Deterministic dotted world map + export lanes between Attire Services sites.
   Coordinates use a rough equirectangular projection on a 1000×500
   canvas so placement reads as a real world map. Generated with a fixed
   seed → identical output on server and client (no hydration drift).

   Motion is limited to a single draw-in on view. Nothing loops: an
   endlessly animating map reads as a screensaver, not as infrastructure.
------------------------------------------------------------------- */

import { landPoints } from "@/lib/land-points";
import { geo, tradeLanes } from "@/lib/site";

const W = 1000;
const H = 500;

/** Equirectangular projection — the same one the hub coordinates assume. */
function project(lat: number, lon: number) {
  return {
    x: ((lon + 180) / 360) * W,
    y: ((90 - lat) / 180) * H,
  };
}

/**
 * Land drawn from the same Natural Earth coastlines as the globe, so the two
 * views of the network never disagree.
 *
 * Every third sample is enough at this size, and the whole field is emitted as
 * a single <path> of zero-length round-capped strokes rather than ~1,500
 * <circle> elements — one DOM node instead of fifteen hundred.
 */
const LAND_PATH = landPoints()
  .filter((_, i) => i % 3 === 0)
  .map(({ lat, lon }) => {
    const { x, y } = project(lat, lon);
    return `M${x.toFixed(1)} ${y.toFixed(1)}h.01`;
  })
  .join("");

type Hub = { name: string; x: number; y: number; production: boolean };

// Attire Services operating sites, positioned by lon/lat.
/** Sites with production lines render filled; offices render hollow. */
const PRODUCTION = new Set(["İzmir", "Ho Chi Minh City"]);

const hubs: Hub[] = Object.entries(geo).map(([name, { lat, lon }]) => ({
  name,
  ...project(lat, lon),
  production: PRODUCTION.has(name),
}));

const hubAt = (name: string) => hubs.find((h) => h.name === name);

// Arc between two sites, lifted vertically for a great-circle feel.
function arc(a: Hub, b: Hub, lift = 0.2) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dist = Math.hypot(b.x - a.x, b.y - a.y);
  return `M ${a.x} ${a.y} Q ${mx} ${my - dist * lift} ${b.x} ${b.y}`;
}

const lanes: string[] = tradeLanes
  .map(({ from, to }) => {
    const a = hubAt(from);
    const b = hubAt(to);
    return a && b ? arc(a, b, 0.24) : null;
  })
  .filter((d): d is string => d !== null);

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
      aria-label="Attire Services sites and export lanes across Europe, South Asia, Southeast Asia and North America"
      className={className}
    >
      {/* Continent dot field */}
      <path
        d={LAND_PATH}
        stroke="currentColor"
        strokeWidth={3.2}
        strokeLinecap="round"
        opacity={0.85}
      />

      {/* Export lanes */}
      <g>
        {lanes.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="var(--brass-soft)"
            strokeWidth={1.8}
            strokeLinecap="round"
            opacity={0.95}
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
              x={hub.x - 4}
              y={hub.y - 4}
              width={8}
              height={8}
              fill={hub.production ? "var(--brass-soft)" : "var(--deep)"}
              stroke="var(--brass-soft)"
              strokeWidth={1.8}
            />
            {showLabels && (
              <text
                x={hub.x + 12}
                y={hub.y + 4}
                fontSize={15}
                fill="currentColor"
                opacity={1}
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
