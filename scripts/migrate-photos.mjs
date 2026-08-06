/**
 * Moves the bundled photographs into Supabase Storage and records where each
 * one went, so the repository no longer has to carry them.
 *
 * Nothing in the source has to change: the manifest is keyed by the original
 * `/photos/<name>` path, and `Photo` resolves through it at render time. Any
 * path with no entry is served as-is, so a half-finished migration degrades to
 * the old behaviour rather than to broken images.
 *
 *   node scripts/migrate-photos.mjs
 */
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import pg from "pg";

function loadEnv(file) {
  return Object.fromEntries(
    readFileSync(file, "utf8")
      .split("\n")
      .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
      .map((l) => {
        const i = l.indexOf("=");
        return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, "")];
      }),
  );
}

const env = { ...loadEnv(".env.local"), ...process.env };
const BASE = env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = env.SUPABASE_SECRET_KEY;

const MIME = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };

const dir = "public/photos";
const files = readdirSync(dir).filter((f) => MIME[path.extname(f).toLowerCase()]);

const manifest = {};

for (const file of files) {
  const body = readFileSync(path.join(dir, file));
  const target = `photos/${file}`;

  const res = await fetch(`${BASE}/storage/v1/object/${encodeURI(`media/${target}`)}`, {
    method: "POST",
    headers: {
      apikey: KEY,
      Authorization: `Bearer ${KEY}`,
      "Content-Type": MIME[path.extname(file).toLowerCase()],
      "x-upsert": "true",
    },
    body,
  });

  if (!res.ok) {
    console.error(`FAILED ${file}: ${res.status} ${await res.text()}`);
    process.exit(1);
  }

  manifest[`/photos/${file}`] = `${BASE}/storage/v1/object/public/media/${target}`;
  console.log(`uploaded ${file} (${(body.length / 1024).toFixed(0)} KB)`);
}

// Store the manifest alongside the other settings so the site can read it with
// the same query it already makes, rather than adding a round-trip.
const client = new pg.Client({
  connectionString: env.DIRECT_URL,
  ssl: { rejectUnauthorized: false },
});
await client.connect();
try {
  await client.query(
    `update settings set data = jsonb_set(data, '{mediaMap}', $1::jsonb, true) where id = true`,
    [JSON.stringify(manifest)],
  );
  console.log(`\nmanifest saved: ${Object.keys(manifest).length} images`);
} finally {
  await client.end();
}
