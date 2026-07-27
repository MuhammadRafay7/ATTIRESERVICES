import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * Per-page metadata. Canonical and og:url are set from a single `path` because
 * Next derives neither from the other — stating the path twice by hand is how
 * they drift apart. Paths are relative; `metadataBase` in the root layout
 * resolves them.
 *
 * The OG title is composed explicitly rather than leaning on the root layout's
 * title template, which governs <title> only.
 *
 * The image is restated too: metadata is shallow-merged, so a page that
 * declares `openGraph` at all replaces the layout's object entirely and would
 * otherwise lose the image the root `opengraph-image` file convention supplies.
 */

/** Single source of truth for the OG card — `app/opengraph-image.tsx` reads it too. */
export const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.name} — Contract Manufacturing & Export`,
  type: "image/png",
} as const;
export function pageMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description?: string;
  path: string;
}): Metadata {
  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_US",
      url: path,
      images: [ogImage],
      ...(title ? { title: `${title} | ${site.name}` } : {}),
      ...(description ? { description } : {}),
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImage],
      ...(title ? { title: `${title} | ${site.name}` } : {}),
      ...(description ? { description } : {}),
    },
  };
}
