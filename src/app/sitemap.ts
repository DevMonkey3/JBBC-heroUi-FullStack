import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { pageSeo } from "@/config/seo";
import { getPublishedSeminarSlugs } from "@/server/queries/seminars";
import { getPublishedPosts } from "@/server/queries/blog";
import { getNotices } from "@/server/queries/notices";
import { caseCards } from "@/content/cases";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = Object.values(pageSeo).map((page) => ({
    url: `${siteConfig.url}${page.path}`,
    lastModified: now,
    changeFrequency: page.path === "/" ? "weekly" : "monthly",
    priority: page.path === "/" ? 1 : page.path === "/privacy" ? 0.3 : 0.7,
  }));

  const [seminars, posts, notices] = await Promise.all([
    getPublishedSeminarSlugs().catch(() => []),
    getPublishedPosts().catch(() => []),
    getNotices().catch(() => []),
  ]);
  const seminarPages: MetadataRoute.Sitemap = seminars.map((s) => ({
    url: `${siteConfig.url}/seminar/${encodeURIComponent(s.slug)}`,
    lastModified: s.updatedAt ?? s.publishedAt,
    changeFrequency: "weekly",
    priority: 0.6,
  }));
  const postPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${siteConfig.url}/blog/${encodeURIComponent(p.slug)}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));
  const noticePages: MetadataRoute.Sitemap = notices
    .filter((n) => n.type !== "seminar")
    .map((n) => ({
      url: `${siteConfig.url}/notices/${encodeURIComponent(n.slug)}`,
      lastModified: new Date(n.publishedAt),
      changeFrequency: "monthly",
      priority: 0.5,
    }));

  const casePages: MetadataRoute.Sitemap = caseCards.map((c) => ({
    url: `${siteConfig.url}/cases/${c.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticPages, ...casePages, ...seminarPages, ...postPages, ...noticePages];
}
