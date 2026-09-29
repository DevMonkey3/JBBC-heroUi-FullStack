"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export function LikeButton({ slug, initialCount }: { slug: string; initialCount: number }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [busy, setBusy] = useState(false);
  const url = `/api/blog/${encodeURIComponent(slug)}/like`;

  useEffect(() => {
    fetch(url)
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { liked?: boolean } | null) => d && setLiked(Boolean(d.liked)))
      .catch(() => {});
  }, [url]);

  async function toggle() {
    setBusy(true);
    try {
      const res = await fetch(url, { method: "POST" });
      if (!res.ok) return;
      const d = (await res.json()) as { liked: boolean; likeCount: number };
      setLiked(d.liked);
      setCount(d.likeCount);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-2xl bg-white p-8 text-center shadow-md ring-1 ring-black/5">
      <p className="mb-4 text-lg font-medium text-gray-700 md:text-xl">
        この記事は役に立ちましたか？
      </p>
      <button
        type="button"
        onClick={toggle}
        disabled={busy}
        aria-pressed={liked}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border-2 px-8 py-3 text-lg font-semibold transition-colors",
          liked
            ? "border-red-500 bg-red-500 text-white"
            : "border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-500",
        )}
      >
        <Heart className={cn("size-5", liked && "fill-current")} aria-hidden />
        {liked ? "いいね済み" : "いいね"}（{count}）
      </button>
    </div>
  );
}
