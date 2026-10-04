import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { PostDetail, PostSummary } from "@/server/queries/blog";
import { formatDate } from "@/lib/dates";
import { Container } from "@/components/site/container";
import { PageHeader } from "@/components/site/page-header";
import { RemoteImage } from "@/components/site/remote-image";
import { PostCard } from "@/components/site/blog/post-card";
import { LikeButton } from "@/components/site/blog/like-button";

/** Show "最終更新" only when the post was edited at least a day after publishing. */
function wasUpdated(post: PostDetail) {
  return new Date(post.updatedAt).getTime() - new Date(post.publishedAt).getTime() > 86_400_000;
}

/** Article body shared by the public page and the admin preview. */
export const articleProse =
  "prose prose-neutral prose-lg prose-headings:font-bold prose-h2:border-b-2 prose-h2:border-brand/30 prose-h2:pb-2 prose-a:text-brand prose-img:rounded-xl prose-figcaption:text-center max-w-none";

export function PostArticle({
  post,
  related,
  preview = false,
}: {
  post: PostDetail;
  related: PostSummary[];
  preview?: boolean;
}) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    image: post.coverImage ? [post.coverImage] : undefined,
    author: { "@type": "Organization", name: siteConfig.legalName },
    publisher: { "@type": "Organization", name: siteConfig.legalName, url: siteConfig.url },
    mainEntityOfPage: `${siteConfig.url}/blog/${encodeURIComponent(post.slug)}`,
  };

  return (
    <Container className="pb-12 md:pb-16">
      {!preview && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
      {preview && (
        <p className="mt-4 rounded-md border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-900">
          プレビュー表示です。管理者のみ閲覧でき、公開ページには表示されていません。
        </p>
      )}
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
          {wasUpdated(post) && (
            <span>
              最終更新 <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
            </span>
          )}
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

        <article className={articleProse} dangerouslySetInnerHTML={{ __html: post.content }} />

        {!preview && (
          <div className="mt-12">
            <LikeButton slug={post.slug} initialCount={post.likeCount} />
          </div>
        )}

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
