import type { MetadataRoute } from "next";
import { site, nav } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { href: string; priority: number }[] = [
    { href: "/", priority: 1 },
    ...nav.map((item) => ({ href: item.href as string, priority: 0.8 })),
  ];

  return routes.map((route) => ({
    url: new URL(route.href, site.url).toString(),
    lastModified: now,
    changeFrequency: route.href === "/" ? "weekly" : "monthly",
    priority: route.priority,
  }));
}
