import Link from "next/link";
import { pageMetadata } from "@/config/seo";
import { getPublishedPosts } from "@/server/queries/blog";
import { blogCategories, isBlogCategory } from "@/lib/blog-categories";
import { Container } from "@/components/site/container";
import { PageHeader } from "@/components/site/page-header";
import { BgTitle } from "@/components/site/bg-title";
import { PostCard } from "@/components/site/blog/post-card";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata("blog");

export default async function BlogListPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active = isBlogCategory(category) ? category : null;
  const all = await getPublishedPosts();
  const posts = active ? all.filter((p) => p.category === active) : all;

  return (
    <Container className="pb-12 md:pb-16">
      <PageHeader pill="blog" title="ブログ" crumbs={[{ label: "ブログ" }]} />
      <BgTitle word="Blog" title="ブログ" />

      <nav aria-label="カテゴリ" className="my-6 flex flex-wrap justify-center gap-2">
        {[null, ...blogCategories].map((c) => {
          const on = c === active;
          return (
            <Link
              key={c ?? "all"}
              href={c ? `/blog?category=${encodeURIComponent(c)}` : "/blog"}
              aria-current={on ? "page" : undefined}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                on
                  ? "border-brand bg-brand text-white"
                  : "border-brand text-brand hover:bg-brand-soft bg-white",
              )}
            >
              {c ?? "すべて"}
            </Link>
          );
        })}
      </nav>

      {posts.length === 0 ? (
        <p className="text-muted-foreground py-20 text-center">
          {active ? "このカテゴリの記事はまだありません" : "まだブログ投稿がありません"}
        </p>
      ) : (
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <li key={p.id}>
              <PostCard post={p} priority={i < 3} />
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
