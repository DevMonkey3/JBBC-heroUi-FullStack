import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getPostBySlug, getPublishedPosts, getRelatedPosts } from "@/server/queries/blog";
import { PostArticle } from "@/components/site/blog/post-article";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getPublishedPosts().catch(() => []);
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(decodeURIComponent(slug));
  if (!post) return { title: "ブログ" };
  const url = `${siteConfig.url}/blog/${encodeURIComponent(post.slug)}`;
  const description = post.excerpt ?? undefined;
  return {
    title: post.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      ...(post.coverImage ? { images: [{ url: post.coverImage }] } : {}),
    },
    twitter: { card: "summary_large_image", title: post.title, description },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(decodeURIComponent(slug));
  if (!post) notFound();
  const related = await getRelatedPosts(post);
  return <PostArticle post={post} related={related} />;
}
