import { notFound } from "next/navigation";
import { requireAdmin } from "@/server/auth";
import { getPostAdmin, getRelatedPosts } from "@/server/queries/blog";
import { PostArticle } from "@/components/site/blog/post-article";

/** Renders any post, draft or not, exactly as the public page would. Admins only. */
export const metadata = { title: "プレビュー", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BlogPreviewPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin().catch(() => notFound());
  const { id } = await params;
  const row = await getPostAdmin(id).catch(() => null);
  if (!row) notFound();
  const post = {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    coverImage: row.coverImage,
    category: row.category,
    publishedAt: row.publishedAt.toISOString(),
    likeCount: row.likeCount,
    content: row.content,
  };
  const related = await getRelatedPosts(post).catch(() => []);
  return <PostArticle post={post} related={related} preview />;
}
