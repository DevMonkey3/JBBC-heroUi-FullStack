"use client";

import { useActionState, useState } from "react";
import { saveNotice } from "@/server/actions/notices";
import { useSaveForm } from "@/components/admin/use-save-form";
import type { SaveState } from "@/server/actions/posts";
import type { NoticeKind } from "@/server/queries/notices";
import { adminUrl } from "@/config/admin";
import { slugify } from "@/lib/slug";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Field } from "@/components/admin/field";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { PublishedAtField } from "@/components/admin/published-at-field";

export type NoticeFormValues = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string;
  status: "DRAFT" | "PUBLISHED";
  publishedAt?: Date | string | null;
};

const initial: SaveState = { ok: false };
const section = { announcement: "announcements", newsletter: "newsletters" } as const;

export function NoticeForm({ kind, notice }: { kind: NoticeKind; notice?: NoticeFormValues }) {
  const [state, action, pending] = useActionState(
    saveNotice.bind(null, kind, notice?.id ?? null),
    initial,
  );
  const [title, setTitle] = useState(notice?.title ?? "");
  const [manualSlug, setManualSlug] = useState<string | null>(notice?.slug ?? null);
  const [published, setPublished] = useState(notice?.status === "PUBLISHED");
  const slug =
    manualSlug ??
    (title
      ? slugify(title) || `${kind}-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}`
      : "");

  const { onSubmit } = useSaveForm({
    state,
    action,
    isEdit: Boolean(notice),
    redirect: (id) => adminUrl(`${section[kind]}/${id}`),
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
        <Field label="本文" required error={err("body")}>
          <RichTextEditor name="body" defaultValue={notice?.body ?? ""} />
        </Field>
        <Field
          label="抜粋（一覧・メール用）"
          error={err("excerpt")}
          hint="空欄なら本文の冒頭から自動で作られます"
        >
          <Textarea name="excerpt" defaultValue={notice?.excerpt ?? ""} rows={3} />
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
          <div className="mt-4">
            <PublishedAtField defaultValue={notice?.publishedAt} error={err("publishedAt")} />
          </div>
          <Button type="submit" className="mt-4 w-full" disabled={pending}>
            {pending
              ? "保存中..."
              : notice
                ? "保存"
                : published
                  ? "作成して公開"
                  : "下書きとして作成"}
          </Button>
        </div>
        <div className="rounded-lg border bg-white p-4">
          <Field
            label="スラッグ（URL）"
            required
            error={err("slug")}
            hint={`公開URL: /notices/${slug || "…"}`}
          >
            <Input
              name="slug"
              value={slug}
              onChange={(e) => setManualSlug(e.target.value)}
              required
            />
          </Field>
        </div>
      </aside>
    </form>
  );
}
