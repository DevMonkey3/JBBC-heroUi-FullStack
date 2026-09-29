import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { pageSeo } from "@/config/seo";
import { getPublishedSeminarSlugs } from "@/server/queries/seminars";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = Object.values(pageSeo).map((page) => ({
    url: `${siteConfig.url}${page.path}`,
    lastModified: now,
    changeFrequency: page.path === "/" ? "weekly" : "monthly",
    priority: page.path === "/" ? 1 : page.path === "/privacy" ? 0.3 : 0.7,
  }));

  const seminars = await getPublishedSeminarSlugs().catch(() => []);
  const seminarPages: MetadataRoute.Sitemap = seminars.map((s) => ({
    url: `${siteConfig.url}/seminar/${encodeURIComponent(s.slug)}`,
    lastModified: s.updatedAt ?? s.publishedAt,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticPages, ...seminarPages];
}
