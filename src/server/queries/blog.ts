import "server-only";
import { unstable_cache } from "next/cache";
import { db } from "@/server/db";
import { tags } from "@/server/cache";
import { pageArgs } from "@/server/queries/admin";

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

export type PostDetail = PostSummary & { content: string; updatedAt: string };

const summarySelect = {
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  coverImage: true,
  category: true,
  publishedAt: true,
  likeCount: true,
  status: true,
} as const;

// Status is checked in code: documents written by the old admin lack the
// field and MongoDB would skip them. Prisma fills the default on read.
export const getPublishedPosts = unstable_cache(
  async (): Promise<PostSummary[]> => {
    const rows = await db.blogPost.findMany({
      orderBy: { publishedAt: "desc" },
      select: summarySelect,
    });
    return rows
      .filter((r) => r.status !== "DRAFT")
      .map(({ status: _s, ...r }) => ({ ...r, publishedAt: r.publishedAt.toISOString() }));
  },
  ["blog:list:v3"],
  { tags: [tags.blog] },
);

export const getPostBySlug = (slug: string) =>
  unstable_cache(
    async (): Promise<PostDetail | null> => {
      const row = await db.blogPost.findFirst({ where: { slug } });
      if (!row || row.status === "DRAFT") return null;
      return {
        id: row.id,
        title: row.title,
        slug: row.slug,
        excerpt: row.excerpt,
        coverImage: row.coverImage,
        category: row.category,
        publishedAt: row.publishedAt.toISOString(),
        likeCount: row.likeCount,
        content: row.content,
        updatedAt: (row.updatedAt ?? row.publishedAt).toISOString(),
      };
    },
    ["blog:post:v4", slug],
    { tags: [tags.blog] },
  )();

/** Up to three other published posts, same category first. */
export async function getRelatedPosts(post: PostSummary, limit = 3): Promise<PostSummary[]> {
  const all = (await getPublishedPosts()).filter((p) => p.id !== post.id);
  const same = all.filter((p) => p.category && p.category === post.category);
  const rest = all.filter((p) => !same.includes(p));
  return [...same, ...rest].slice(0, limit);
}

// ---------------------------------------------------------------- admin

export async function listPostsAdmin(searchParams: { page?: string; q?: string }) {
  const { page, pageSize, skip, take, q } = pageArgs(searchParams);
  const where = q ? { title: { contains: q, mode: "insensitive" as const } } : {};
  const [rows, total] = await Promise.all([
    db.blogPost.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      skip,
      take,
      select: { ...summarySelect, sentAt: true, sentCount: true, updatedBy: true },
    }),
    db.blogPost.count({ where }),
  ]);
  return { rows, total, page, pageSize, q };
}

export function getPostAdmin(id: string) {
  return db.blogPost.findUnique({ where: { id } });
}
