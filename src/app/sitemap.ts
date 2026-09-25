import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { mainNav } from "@/config/nav";

// Content routes (blog, seminars, notices) are appended here once their
// queries exist, so the sitemap only ever lists published slugs.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return mainNav.map((item) => ({
    url: `${siteConfig.url}${item.href}`,
    lastModified: now,
    changeFrequency: item.href === "/" ? "weekly" : "monthly",
    priority: item.href === "/" ? 1 : 0.7,
  }));
}
