/**
 * Precomputes the globe's land-dot field from real coastline data.
 *
 * Sampling Natural Earth polygons in the browser would mean shipping the
 * TopoJSON and running tens of thousands of point-in-polygon tests on load,
 * so it happens here instead. The output is a base64-packed Int16Array —
 * latitude and longitude at 1/100th of a degree, which is far finer than a
 * dot two pixels wide can express.
 *
 *   node scripts/gen-land.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { feature } from "topojson-client";

// 110m is the coarsest Natural Earth tier — right for a field of dots, and a
// fraction of the size of the detailed sets.
const topology = JSON.parse(
  readFileSync("node_modules/world-atlas/land-110m.json", "utf8"),
);
const land = feature(topology, topology.objects.land);

/** Rings arrive as [lon, lat] pairs; flatten every polygon into one list. */
const rings = [];
for (const geom of land.features) {
  const polygons =
    geom.geometry.type === "Polygon"
      ? [geom.geometry.coordinates]
      : geom.geometry.coordinates;
  for (const polygon of polygons) {
    // Index 0 is the outer ring; the rest are holes (lakes), which we keep so
    // the Caspian and the Great Lakes read as water.
    rings.push(...polygon);
  }
}

/** Standard ray-casting test. */
function inRing(lon, lat, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

/** Bounding boxes make the sweep tractable — most rings reject instantly. */
const boxes = rings.map((ring) => {
  let minX = 180, maxX = -180, minY = 90, maxY = -90;
  for (const [x, y] of ring) {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  return { minX, maxX, minY, maxY };
});

function isLand(lon, lat) {
  let crossings = 0;
  for (let i = 0; i < rings.length; i++) {
    const b = boxes[i];
    if (lon < b.minX || lon > b.maxX || lat < b.minY || lat > b.maxY) continue;
    if (inRing(lon, lat, rings[i])) crossings++;
  }
  // Odd crossings = inside an odd number of rings = land (a hole flips it back).
  return crossings % 2 === 1;
}

const STEP = 1.6; // degrees
const points = [];

// Longitude spacing widens toward the poles so dots stay evenly spread on the
// sphere rather than crowding into a bright ring at the top and bottom.
for (let lat = -84; lat <= 84; lat += STEP) {
  const spacing = STEP / Math.max(Math.cos((lat * Math.PI) / 180), 0.15);
  for (let lon = -180; lon < 180; lon += spacing) {
    if (isLand(lon, lat)) points.push([lat, lon]);
  }
}

const packed = new Int16Array(points.length * 2);
points.forEach(([lat, lon], i) => {
  packed[i * 2] = Math.round(lat * 100);
  packed[i * 2 + 1] = Math.round(lon * 100);
});

const base64 = Buffer.from(packed.buffer).toString("base64");

writeFileSync(
  "src/lib/land-points.ts",
  `/**
 * Land sample points for the globe — generated, do not edit by hand.
 * Run \`node scripts/gen-land.mjs\` to regenerate.
 *
 * Natural Earth 110m land polygons, sampled on a ${STEP}° grid with longitude
 * spacing widened by latitude so the dots stay evenly spaced on the sphere.
 * Packed as Int16 hundredths of a degree to keep the payload small.
 */
const PACKED =
  "${base64}";

let cache: { lat: number; lon: number }[] | null = null;

/** Decodes once, then returns the same array on every call. */
export function landPoints(): { lat: number; lon: number }[] {
  if (cache) return cache;

  const binary = atob(PACKED);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

  const view = new Int16Array(bytes.buffer);
  const out: { lat: number; lon: number }[] = [];
  for (let i = 0; i < view.length; i += 2) {
    out.push({ lat: view[i] / 100, lon: view[i + 1] / 100 });
  }

  cache = out;
  return out;
}

export const LAND_POINT_COUNT = ${points.length};
`,
);

console.log(
  `${points.length} land points · ${(base64.length / 1024).toFixed(1)} KB base64`,
);
