import "server-only";
import { unstable_cache } from "next/cache";
import { db } from "@/server/db";
import { tags } from "@/server/cache";

export type PostSummary = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  category: string | null;
  /** ISO string: cached results are JSON, so Dates do not survive. */
  publishedAt: string;
  likeCount: number;
};

export type PostDetail = PostSummary & { content: string };

export const getPublishedPosts = unstable_cache(
  async (): Promise<PostSummary[]> => {
    // Status is checked in code: old-admin documents lack the field (see seminars.ts).
    const rows = await db.blogPost.findMany({
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        category: true,
        publishedAt: true,
        likeCount: true,
        status: true,
      },
    });
    return rows
      .filter((r) => r.status !== "DRAFT")
      .map(({ status: _s, ...r }) => ({ ...r, publishedAt: r.publishedAt.toISOString() }));
  },
  ["blog:list:v2"],
  { tags: [tags.blog] },
);

export const getPostBySlug = (slug: string) =>
  unstable_cache(
    async (): Promise<PostDetail | null> => {
      const row = await db.blogPost.findFirst({ where: { slug } });
      if (!row || row.status === "DRAFT") return null;
      return { ...row, publishedAt: row.publishedAt.toISOString() };
    },
    ["blog:post:v2", slug],
    { tags: [tags.blog] },
  )();
