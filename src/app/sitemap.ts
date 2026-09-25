import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { pageSeo } from "@/config/seo";

// Content routes (blog, seminars, notices) are appended here once their
// queries exist, so the sitemap only ever lists published slugs.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return Object.values(pageSeo).map((page) => ({
    url: `${siteConfig.url}${page.path}`,
    lastModified: now,
    changeFrequency: page.path === "/" ? "weekly" : "monthly",
    priority: page.path === "/" ? 1 : page.path === "/privacy" ? 0.3 : 0.7,
  }));
}
