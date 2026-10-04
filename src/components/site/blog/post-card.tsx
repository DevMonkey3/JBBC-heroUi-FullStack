import Link from "next/link";
import { Heart } from "lucide-react";
import type { PostSummary } from "@/server/queries/blog";
import { formatDate } from "@/lib/dates";
import { RemoteImage } from "@/components/site/remote-image";
import { cdn } from "@/config/cdn";

export function PostCard({ post, priority = false }: { post: PostSummary; priority?: boolean }) {
  const href = `/blog/${encodeURIComponent(post.slug)}`;
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link href={href} className="relative block aspect-[16/10]">
        <RemoteImage
          src={post.coverImage || cdn("home/blogPosts.avif")}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
        {post.category && (
          <span className="bg-brand absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold text-white shadow">
            {post.category}
          </span>
        )}
        <span
          className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-xs font-semibold text-red-500"
          aria-label={`いいね ${post.likeCount}件`}
        >
          <Heart className="size-3" aria-hidden />
          <span className="sr-only">いいね </span>
          {post.likeCount}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 line-clamp-2 font-bold">
          <Link href={href} className="hover:text-brand">
            {post.title}
          </Link>
        </h3>
        {post.excerpt && (
          <p className="text-muted-foreground mb-3 line-clamp-3 text-sm">{post.excerpt}</p>
        )}
        <div className="text-muted-foreground mt-auto flex items-center justify-between text-xs">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <Link href={href} className="text-brand">
            続きを読む →
          </Link>
        </div>
      </div>
    </article>
  );
}
