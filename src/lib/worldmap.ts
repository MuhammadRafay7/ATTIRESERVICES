/**
 * Shared land geometry for the flat route map and the 3D globe.
 *
 * Continents are loose ellipses on a 1000×500 equirectangular canvas — an
 * impression of landmass, not a survey. Both renderers read from here so the
 * two views of the network always agree, and both generate their dots from a
 * fixed seed so server and client produce identical output (no hydration
 * drift, no shifting speckle between renders).
 */

export const MAP_W = 1000;
export const MAP_H = 500;

type Ellipse = { cx: number; cy: number; rx: number; ry: number; n: number };

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

/** Deterministic LCG — a fixed seed keeps the dot field stable. */
function makeRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/**
 * Land dots in map space. `density` multiplies each landmass's dot count —
 * the globe wraps its dots around a sphere and needs far more of them than
 * the flat map to read as solid.
 */
export function landDots(density = 1): Array<[number, number]> {
  const rng = makeRng(20040517);
  const out: Array<[number, number]> = [];

  for (const m of landmasses) {
    const target = Math.round(m.n * density);
    for (let placed = 0; placed < target; placed++) {
      const a = rng() * Math.PI * 2;
      const r = Math.sqrt(rng());
      out.push([
        Math.round(m.cx + Math.cos(a) * r * m.rx),
        Math.round(m.cy + Math.sin(a) * r * m.ry),
      ]);
    }
  }
  return out;
}

/** The same field, converted to latitude/longitude for the globe. */
export function landLatLon(density = 1): Array<{ lat: number; lon: number }> {
  return landDots(density).map(([x, y]) => ({
    lon: (x / MAP_W) * 360 - 180,
    lat: 90 - (y / MAP_H) * 180,
  }));
}
