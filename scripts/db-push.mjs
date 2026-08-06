/**
 * Applies supabase/schema.sql to the database in DIRECT_URL.
 *
 * The schema is written to be idempotent (create if not exists / drop policy
 * if exists), so running this repeatedly is safe and is the intended way to
 * roll a change forward.
 *
 *   node scripts/db-push.mjs
 */
import { readFileSync } from "node:fs";
import pg from "pg";

function loadEnv(file) {
  try {
    return Object.fromEntries(
      readFileSync(file, "utf8")
        .split("\n")
        .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
        .map((l) => {
          const i = l.indexOf("=");
          return [
            l.slice(0, i).trim(),
            l.slice(i + 1).trim().replace(/^"|"$/g, ""),
          ];
        }),
    );
  } catch {
    return {};
  }
}

const env = { ...loadEnv(".env.local"), ...process.env };
const connectionString = env.DIRECT_URL;

if (!connectionString) {
  console.error("DIRECT_URL is not set (looked in .env.local and the environment).");
  process.exit(1);
}

const sql = readFileSync("supabase/schema.sql", "utf8");
const client = new pg.Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

await client.connect();
try {
  await client.query(sql);
  const { rows } = await client.query(`
    select table_name from information_schema.tables
    where table_schema = 'public' order by table_name
  `);
  console.log("schema applied. tables:", rows.map((r) => r.table_name).join(", "));
} finally {
  await client.end();
}
