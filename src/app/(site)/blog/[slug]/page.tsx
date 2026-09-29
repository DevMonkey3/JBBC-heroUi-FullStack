import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getPostBySlug, getPublishedPosts, getRelatedPosts } from "@/server/queries/blog";
import { formatDate } from "@/lib/dates";
import { Container } from "@/components/site/container";
import { PageHeader } from "@/components/site/page-header";
import { RemoteImage } from "@/components/site/remote-image";
import { PostCard } from "@/components/site/blog/post-card";
import { LikeButton } from "@/components/site/blog/like-button";

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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? undefined,
    datePublished: post.publishedAt,
    image: post.coverImage ? [post.coverImage] : undefined,
    author: { "@type": "Organization", name: siteConfig.legalName },
    publisher: { "@type": "Organization", name: siteConfig.legalName, url: siteConfig.url },
    mainEntityOfPage: `${siteConfig.url}/blog/${encodeURIComponent(post.slug)}`,
  };

  return (
    <Container className="pb-12 md:pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <PageHeader
        pill="blog"
        title={post.title}
        crumbs={[{ label: "ブログ", href: "/blog" }, { label: post.title }]}
      />

      <div className="mx-auto max-w-4xl">
        <div className="text-muted-foreground mb-6 flex flex-wrap items-center gap-4 text-sm">
          {post.category && (
            <Link
              href={`/blog?category=${encodeURIComponent(post.category)}`}
              className="bg-brand rounded-full px-3 py-1 text-xs font-semibold text-white"
            >
              {post.category}
            </Link>
          )}
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-4" aria-hidden />
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          </span>
        </div>

        {post.coverImage && (
          <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl shadow-md">
            <RemoteImage
              src={post.coverImage}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 896px, 100vw"
              className="object-cover"
            />
          </div>
        )}

        {post.excerpt && (
          <p className="border-brand bg-brand-soft/60 mb-8 rounded-r-lg border-l-4 px-5 py-4 text-lg leading-relaxed text-gray-700">
            {post.excerpt}
          </p>
        )}

        <article
          className="prose prose-neutral prose-lg prose-headings:font-bold prose-h2:border-b-2 prose-h2:border-brand/30 prose-h2:pb-2 prose-a:text-brand prose-img:rounded-xl max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-12">
          <LikeButton slug={post.slug} initialCount={post.likeCount} />
        </div>

        {related.length > 0 && (
          <section className="mt-14" aria-labelledby="related-heading">
            <h2 id="related-heading" className="mb-5 text-xl font-bold">
              関連記事
            </h2>
            <ul className="grid gap-5 md:grid-cols-3">
              {related.map((p) => (
                <li key={p.id}>
                  <PostCard post={p} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="border-brand text-brand hover:bg-brand-soft inline-flex items-center gap-2 rounded-full border-2 px-6 py-2.5 font-semibold"
          >
            <ArrowLeft className="size-4" aria-hidden />
            ブログ一覧に戻る
          </Link>
        </div>
      </div>
    </Container>
  );
}
