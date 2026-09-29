"use client";

import { useActionState, useState } from "react";
import { savePost, type SaveState } from "@/server/actions/posts";
import { useSaveForm } from "@/components/admin/use-save-form";
import { adminUrl } from "@/config/admin";
import { slugify } from "@/lib/slug";
import { blogCategories } from "@/lib/blog-categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Field } from "@/components/admin/field";
import { ImageUpload } from "@/components/admin/image-upload";
import { RichTextEditor } from "@/components/admin/rich-text-editor";

export type PostFormValues = {
  id?: string;
  title: string;
  slug: string;
  category: string | null;
  excerpt: string | null;
  coverImage: string | null;
  content: string;
  status: "DRAFT" | "PUBLISHED";
};

const initial: SaveState = { ok: false };

function fallbackSlug(title: string) {
  return slugify(title) || `post-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}`;
}

export function PostForm({ post }: { post?: PostFormValues }) {
  const [state, action, pending] = useActionState(savePost.bind(null, post?.id ?? null), initial);
  const [title, setTitle] = useState(post?.title ?? "");
  const [manualSlug, setManualSlug] = useState<string | null>(post?.slug ?? null);
  const [published, setPublished] = useState(post?.status === "PUBLISHED");
  const slug = manualSlug ?? (title ? fallbackSlug(title) : "");

  const { onSubmit } = useSaveForm({
    state,
    action,
    isEdit: Boolean(post),
    redirect: (id) => adminUrl(`blog/${id}`),
  });

  const err = (k: string) => state.fieldErrors?.[k];

  return (
    <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-5 lg:col-span-2">
        <Field label="タイトル" required error={err("title")}>
          <Input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="text-lg"
          />
        </Field>

        <Field
          label="本文"
          required
          error={err("content")}
          hint="見出し・リスト・リンク・画像はツールバーから。貼り付けた文章の書式もそのまま使えます。"
        >
          <RichTextEditor name="content" defaultValue={post?.content ?? ""} />
        </Field>

        <Field
          label="抜粋（一覧・SEO用）"
          error={err("excerpt")}
          hint="空欄なら本文の冒頭から自動で作られます。300文字まで"
        >
          <Textarea name="excerpt" defaultValue={post?.excerpt ?? ""} rows={3} />
        </Field>
      </div>

      <aside className="space-y-5">
        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">公開する</p>
              <p className="text-muted-foreground text-xs">オフのときは下書きとして保存されます</p>
            </div>
            <Switch checked={published} onCheckedChange={setPublished} aria-label="公開する" />
          </div>
          <input type="hidden" name="status" value={published ? "PUBLISHED" : "DRAFT"} />
          <Button type="submit" className="mt-4 w-full" disabled={pending}>
            {pending
              ? "保存中..."
              : post
                ? "保存"
                : published
                  ? "作成して公開"
                  : "下書きとして作成"}
          </Button>
        </div>

        <div className="space-y-5 rounded-lg border bg-white p-4">
          <Field label="カテゴリ" required error={err("category")}>
            <select
              name="category"
              defaultValue={post?.category ?? ""}
              required
              className="focus-visible:ring-ring/50 h-9 w-full rounded-md border bg-white px-3 text-sm outline-none focus-visible:ring-3"
            >
              <option value="" disabled>
                選択してください
              </option>
              {blogCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>

          <Field
            label="スラッグ（URL）"
            required
            error={err("slug")}
            hint={`公開URL: /blog/${slug || "…"}`}
          >
            <Input
              name="slug"
              value={slug}
              onChange={(e) => setManualSlug(e.target.value)}
              required
            />
          </Field>

          <ImageUpload
            name="coverImage"
            label="カバー画像"
            defaultValue={post?.coverImage}
            hint="一覧カードと記事の先頭に表示されます"
          />
        </div>
      </aside>
    </form>
  );
}
