import { getTheme } from "@/lib/cms";

/**
 * Emits the admin-managed design tokens as a `:root` override.
 *
 * globals.css already declares every colour, radius and width as a CSS custom
 * property, and Tailwind reads those same properties through `@theme inline`.
 * So overriding them here re-themes the entire site — utilities included —
 * without shipping a second stylesheet or rebuilding.
 *
 * Values are strictly filtered: only known-safe characters survive, so a
 * token can never break out of the declaration and inject arbitrary CSS.
 */

// Hex, rgb()/hsl(), plain lengths and keywords. Deliberately narrow.
const SAFE_VALUE = /^[#a-zA-Z0-9\s.,%()/-]+$/;
const SAFE_NAME = /^[a-zA-Z0-9-]+$/;

export async function ThemeTokens() {
  const tokens = await getTheme();

  const declarations = Object.entries(tokens)
    .filter(
      ([name, value]) =>
        SAFE_NAME.test(name) &&
        typeof value === "string" &&
        value.length > 0 &&
        value.length < 120 &&
        SAFE_VALUE.test(value),
    )
    .map(([name, value]) => `--${name}:${value};`)
    .join("");

  if (!declarations) return null;

  return (
    <style
      // Values are validated above; this is the only way to reach :root from
      // a server component without a client-side flash of the default theme.
      dangerouslySetInnerHTML={{ __html: `:root{${declarations}}` }}
    />
  );
}
