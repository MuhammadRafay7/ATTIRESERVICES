"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminClient, sessionClient } from "@/lib/supabase";

/**
 * Every write the admin panel performs.
 *
 * All of them go through `adminClient()` (the secret key), and every one calls
 * `requireUser()` first. RLS grants no write path to anonymous or authenticated
 * roles, so this module is the only way to change site content — which is what
 * keeps the surface small enough to reason about.
 */

async function requireUser() {
  const supabase = await sessionClient();
  if (!supabase) throw new Error("Supabase is not configured.");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");
  return user;
}

function db() {
  const client = adminClient();
  if (!client) throw new Error("SUPABASE_SECRET_KEY is not set.");
  return client;
}

/** Content changes can appear on any route, so refresh the whole tree. */
function refreshSite() {
  revalidatePath("/", "layout");
}

export type ActionResult = { ok: boolean; message: string };

// --- auth ------------------------------------------------------------------
export async function signIn(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const supabase = await sessionClient();
  if (!supabase) return { ok: false, message: "Supabase is not configured." };

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { ok: false, message: "Enter your email and password." };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, message: "Those details were not recognised." };

  // "Keep me signed in" off → rewrite the auth cookies without an expiry so
  // they become session cookies and die with the browser. Supabase always
  // writes persistent ones, so this is the only place the choice can be
  // honoured; without it the checkbox would be decoration.
  if (formData.get("remember") !== "on") {
    const store = await cookies();
    for (const cookie of store.getAll()) {
      if (cookie.name.startsWith("sb-")) {
        store.set(cookie.name, cookie.value, {
          maxAge: undefined,
          expires: undefined,
          path: "/",
          sameSite: "lax",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        });
      }
    }
  }

  redirect("/admin");
}

export async function signOut() {
  const supabase = await sessionClient();
  await supabase?.auth.signOut();
  redirect("/admin/login");
}


// --- media -----------------------------------------------------------------
const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/svg+xml",
];

/** Public URL for a stored object. */
function mediaUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media/${path}`;
}

export type UploadResult = { ok: boolean; message: string; url?: string };

/**
 * Uploads a file chosen on the admin's device to the `media` bucket.
 *
 * The bucket is public-read, so anything uploaded is world-readable by URL —
 * appropriate for site imagery, and the reason type and size are checked here
 * rather than trusted from the browser.
 */
export async function uploadMedia(
  _prev: UploadResult | null,
  formData: FormData,
): Promise<UploadResult> {
  await requireUser();
  const supabase = db();

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, message: "Choose a file first." };
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { ok: false, message: "Images only — JPEG, PNG, WebP, AVIF or SVG." };
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return { ok: false, message: "That file is over 8 MB. Please compress it first." };
  }

  // Keep a readable name but guarantee uniqueness, so re-uploading never
  // silently replaces an image another page is using.
  const safe = file.name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(-60);
  const path = `${Date.now().toString(36)}-${safe}`;

  const { error } = await supabase.storage
    .from("media")
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) return { ok: false, message: error.message };

  revalidatePath("/admin/media");
  return { ok: true, message: "Uploaded.", url: mediaUrl(path) };
}

export async function deleteMedia(formData: FormData) {
  await requireUser();
  const path = String(formData.get("path") ?? "");
  if (!path) return;

  await db().storage.from("media").remove([path]);
  revalidatePath("/admin/media");
}

/** Everything in the bucket, newest first. */
export async function listMedia() {
  const supabase = adminClient();
  if (!supabase) return [];

  const { data } = await supabase.storage.from("media").list("", {
    limit: 200,
    sortBy: { column: "created_at", order: "desc" },
  });

  return (data ?? [])
    .filter((f) => f.id)
    .map((f) => ({
      name: f.name,
      url: mediaUrl(f.name),
      size: (f.metadata as { size?: number } | null)?.size ?? 0,
      created: f.created_at ?? "",
    }));
}

// --- settings --------------------------------------------------------------
/**
 * Merges a flat form into `settings.data`. Dotted names address nested keys,
 * so `contact.email` writes to `data.contact.email` and the rest of the
 * object is left alone.
 */
export async function saveSettings(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  await requireUser();
  const supabase = db();

  const { data: current } = await supabase
    .from("settings")
    .select("data")
    .eq("id", true)
    .maybeSingle();

  const next: Record<string, unknown> = { ...((current?.data as object) ?? {}) };

  for (const [key, raw] of formData.entries()) {
    if (typeof raw !== "string") continue;
    const value = raw.trim();
    const path = key.split(".");

    let cursor = next;
    for (const segment of path.slice(0, -1)) {
      const existing = cursor[segment];
      cursor[segment] =
        existing && typeof existing === "object" ? { ...existing } : {};
      cursor = cursor[segment] as Record<string, unknown>;
    }
    const leaf = path[path.length - 1];
    // `founded` is the one numeric field; everything else is free text.
    cursor[leaf] = leaf === "founded" ? Number(value) || value : value;
  }

  const { error } = await supabase
    .from("settings")
    .upsert({ id: true, data: next });

  if (error) return { ok: false, message: error.message };
  refreshSite();
  return { ok: true, message: "Saved." };
}

// --- theme -----------------------------------------------------------------
export async function saveTheme(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  await requireUser();
  const supabase = db();

  const tokens: Record<string, string> = {};
  for (const [key, raw] of formData.entries()) {
    if (typeof raw !== "string") continue;
    const value = raw.trim();
    if (value) tokens[key] = value;
  }

  const { error } = await supabase.from("theme").upsert({ id: true, tokens });
  if (error) return { ok: false, message: error.message };

  refreshSite();
  return { ok: true, message: "Theme saved." };
}

// --- content items ---------------------------------------------------------
/**
 * Rebuilds a row from the typed field inputs.
 *
 * The form sends `field.<name>` values plus a `__types` map describing how to
 * read each one. Anything the schema does not model is carried through from
 * `__rest`, so unmodelled keys survive an edit rather than being dropped.
 */
function buildData(formData: FormData): Record<string, unknown> | null {
  let types: Record<string, string>;
  let rest: Record<string, unknown>;

  try {
    types = JSON.parse(String(formData.get("__types") ?? "{}"));
    rest = JSON.parse(String(formData.get("__rest") ?? "{}"));
  } catch {
    return null;
  }

  const data: Record<string, unknown> = { ...rest };

  for (const [name, type] of Object.entries(types)) {
    const raw = formData.get(`field.${name}`);
    const text = typeof raw === "string" ? raw : "";

    switch (type) {
      case "number": {
        const n = Number(text);
        data[name] = text === "" ? null : Number.isNaN(n) ? text : n;
        break;
      }
      case "list":
        data[name] = text
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean);
        break;
      case "pairs": {
        const [a, b] = (
          String(formData.get(`pairkeys.${name}`) ?? "key|value")
        ).split("|");
        data[name] = text
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => {
            const i = line.indexOf("|");
            return i === -1
              ? { [a]: line, [b]: "" }
              : { [a]: line.slice(0, i).trim(), [b]: line.slice(i + 1).trim() };
          });
        break;
      }
      default:
        data[name] = text;
    }
  }

  return data;
}

export async function saveContentItem(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  await requireUser();
  const supabase = db();

  const id = String(formData.get("id") ?? "");
  const collection = String(formData.get("collection") ?? "");
  const data = buildData(formData);
  const published = formData.get("published") === "on";

  if (!collection) return { ok: false, message: "Missing collection." };
  if (!data) return { ok: false, message: "Could not read the form. Reload and try again." };

  const { error } = id
    ? await supabase.from("content_items").update({ data, published }).eq("id", id)
    : await supabase.from("content_items").insert({
        collection,
        data,
        published,
        position: Number(formData.get("position") ?? 0),
      });

  if (error) return { ok: false, message: error.message };
  revalidatePath(`/admin/content/${collection}`);
  refreshSite();
  return { ok: true, message: id ? "Saved." : "Added." };
}

export async function deleteContentItem(formData: FormData) {
  await requireUser();
  const id = String(formData.get("id") ?? "");
  const collection = String(formData.get("collection") ?? "");
  if (!id) return;

  await db().from("content_items").delete().eq("id", id);
  revalidatePath(`/admin/content/${collection}`);
  refreshSite();
}

/** Swaps a row with its neighbour so the admin can reorder without drag-and-drop. */
export async function moveContentItem(formData: FormData) {
  await requireUser();
  const supabase = db();

  const id = String(formData.get("id") ?? "");
  const collection = String(formData.get("collection") ?? "");
  const direction = String(formData.get("direction") ?? "");
  if (!id || !collection) return;

  const { data: items } = await supabase
    .from("content_items")
    .select("id, position")
    .eq("collection", collection)
    .order("position", { ascending: true });

  if (!items) return;

  const index = items.findIndex((i) => i.id === id);
  const target = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || target < 0 || target >= items.length) return;

  await supabase
    .from("content_items")
    .update({ position: items[target].position })
    .eq("id", items[index].id);
  await supabase
    .from("content_items")
    .update({ position: items[index].position })
    .eq("id", items[target].id);

  revalidatePath(`/admin/content/${collection}`);
  refreshSite();
}

// --- pages -----------------------------------------------------------------
export async function savePage(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  await requireUser();

  const slug = String(formData.get("slug") ?? "");
  if (!slug) return { ok: false, message: "Missing page." };

  const { error } = await db()
    .from("pages")
    .update({
      title: String(formData.get("title") ?? ""),
      description: String(formData.get("description") ?? ""),
      nav_label: String(formData.get("nav_label") ?? ""),
      nav_order: Number(formData.get("nav_order") ?? 0),
      in_nav: formData.get("in_nav") === "on",
      published: formData.get("published") === "on",
    })
    .eq("slug", slug);

  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin/pages");
  refreshSite();
  return { ok: true, message: "Page saved." };
}

// --- sections --------------------------------------------------------------
export async function addSection(formData: FormData) {
  await requireUser();
  const supabase = db();

  const page_slug = String(formData.get("page_slug") ?? "");
  const type = String(formData.get("type") ?? "");
  if (!page_slug || !type) return;

  const { data: existing } = await supabase
    .from("sections")
    .select("position")
    .eq("page_slug", page_slug)
    .order("position", { ascending: false })
    .limit(1);

  await supabase.from("sections").insert({
    page_slug,
    type,
    position: (existing?.[0]?.position ?? -1) + 1,
  });

  revalidatePath("/admin/pages");
  refreshSite();
}

export async function deleteSection(formData: FormData) {
  await requireUser();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await db().from("sections").delete().eq("id", id);
  revalidatePath("/admin/pages");
  refreshSite();
}

export async function toggleSection(formData: FormData) {
  await requireUser();
  const id = String(formData.get("id") ?? "");
  const published = formData.get("published") === "true";
  if (!id) return;

  await db().from("sections").update({ published: !published }).eq("id", id);
  revalidatePath("/admin/pages");
  refreshSite();
}

export async function moveSection(formData: FormData) {
  await requireUser();
  const supabase = db();

  const id = String(formData.get("id") ?? "");
  const page_slug = String(formData.get("page_slug") ?? "");
  const direction = String(formData.get("direction") ?? "");
  if (!id || !page_slug) return;

  const { data: sections } = await supabase
    .from("sections")
    .select("id, position")
    .eq("page_slug", page_slug)
    .order("position", { ascending: true });

  if (!sections) return;

  const index = sections.findIndex((s) => s.id === id);
  const target = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || target < 0 || target >= sections.length) return;

  await supabase
    .from("sections")
    .update({ position: sections[target].position })
    .eq("id", sections[index].id);
  await supabase
    .from("sections")
    .update({ position: sections[index].position })
    .eq("id", sections[target].id);

  revalidatePath("/admin/pages");
  refreshSite();
}
