import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

/**
 * Three clients, three trust levels.
 *
 *  - `publicClient`  anonymous reads for page rendering. No cookies, so pages
 *                    using it stay cacheable.
 *  - `sessionClient` carries the admin's auth cookie; used to check who is
 *                    signed in and to run the sign-in/out flow.
 *  - `adminClient`   the secret key. Service role, bypasses RLS, server-only.
 *                    Never import this into anything that reaches the browser.
 */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/** False when the project has no Supabase configured — the site falls back to its built-in content. */
export const supabaseConfigured = Boolean(url && publishableKey);

export function publicClient() {
  if (!url || !publishableKey) return null;
  return createClient(url, publishableKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function sessionClient() {
  if (!url || !publishableKey) return null;
  const store = await cookies();
  return createServerClient(url, publishableKey, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        try {
          for (const { name, value, options } of list) {
            store.set(name, value, options);
          }
        } catch {
          // Called from a Server Component, where cookies are read-only.
          // Middleware refreshes the session instead, so this is safe to skip.
        }
      },
    },
  });
}

export function adminClient() {
  const secret = process.env.SUPABASE_SECRET_KEY;
  if (!url || !secret) return null;
  return createClient(url, secret, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
