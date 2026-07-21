import type { MetadataRoute } from "next";
import { site, nav } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return nav.map((item) => ({
    url: new URL(item.href, site.url).toString(),
    lastModified: now,
    changeFrequency: item.href === "/" ? "weekly" : "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
