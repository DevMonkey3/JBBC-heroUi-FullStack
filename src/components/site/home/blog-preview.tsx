import Link from "next/link";
import Image from "next/image";
import { getPublishedPosts } from "@/server/queries/blog";
import { blogPreview } from "@/content/home";
import { cdn } from "@/config/cdn";
import { CtaButton } from "@/components/site/cta-button";

export async function BlogPreview() {
  const posts = (await getPublishedPosts()).slice(0, 3);

  return (
    <div>
      <div className="mb-8 text-center">
        <p className="mb-1 text-base md:text-lg">{blogPreview.kicker}</p>
        <h2 className="text-xl font-bold md:text-2xl">{blogPreview.title}</h2>
        <p className="text-brand text-xl font-bold md:text-2xl">{blogPreview.highlight}</p>
        <p className="text-muted-foreground mx-auto mt-3 max-w-3xl text-sm md:text-base">
          {blogPreview.lead}
        </p>
      </div>

      <div className="bg-brand-soft/60 rounded-2xl px-4 py-8 md:px-8">
        {posts.length === 0 ? (
          <p className="text-muted-foreground py-6 text-center">ブログ投稿はまだありません</p>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex h-full flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={post.coverImage || cdn(blogPreview.fallbackImage)}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                    {post.category && (
                      <span className="bg-brand-bright absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-medium text-white">
                        {post.category}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="mb-2 line-clamp-2 text-base font-bold md:text-lg">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-3 flex-1 text-sm">
                      {post.excerpt}
                    </p>
                    <span className="text-brand mt-3 self-end text-sm">続きを読む</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6 text-center">
          <CtaButton href={blogPreview.cta.href} size="lg">
            {blogPreview.cta.label}
          </CtaButton>
        </div>
      </div>
    </div>
  );
}
