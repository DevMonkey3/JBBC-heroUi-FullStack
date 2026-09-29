"use client";

import { useActionState, useState } from "react";
import { saveSeminar, type SaveSeminarState } from "@/server/actions/seminars";
import { useSaveForm } from "@/components/admin/use-save-form";
import { adminUrl } from "@/config/admin";
import { slugify } from "@/lib/slug";
import { dateToJstInput } from "@/lib/dates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "@/components/admin/image-upload";

export type SeminarFormValues = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string | null;
  description: string;
  location: string;
  startsAt: Date | string;
  endsAt: Date | string;
  registrationUrl: string | null;
  heroImage: string | null;
  thumbnail: string | null;
  speakerName: string | null;
  speakerTitle: string | null;
  speakerOrg: string | null;
  status: "DRAFT" | "PUBLISHED";
};

const initial: SaveSeminarState = { ok: false };

function fallbackSlug(title: string, startsAt: string) {
  const s = slugify(title);
  if (s) return s;
  const d = startsAt.slice(0, 10).replace(/-/g, "");
  return d ? `seminar-${d}` : "";
}

export function SeminarForm({ seminar }: { seminar?: SeminarFormValues }) {
  const [state, action, pending] = useActionState(
    saveSeminar.bind(null, seminar?.id ?? null),
    initial,
  );
  const [title, setTitle] = useState(seminar?.title ?? "");
  const [manualSlug, setManualSlug] = useState<string | null>(seminar?.slug ?? null);
  const [startsAt, setStartsAt] = useState(dateToJstInput(seminar?.startsAt));
  const [published, setPublished] = useState(seminar?.status === "PUBLISHED");

  // The slug follows the title until the admin edits it by hand.
  const slug = manualSlug ?? fallbackSlug(title, startsAt);

  const { onSubmit } = useSaveForm({
    state,
    action,
    isEdit: Boolean(seminar),
    redirect: (id) => adminUrl(`seminars/${id}`),
  });

  const err = (k: string) => state.fieldErrors?.[k];

  return (
    <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-5 lg:col-span-2">
        <Field label="タイトル" required error={err("title")}>
          <Input name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </Field>

        <Field
          label="スラッグ（URL）"
          required
          error={err("slug")}
          hint={`公開URL: /seminar/${slug || "…"}`}
        >
          <Input
            name="slug"
            value={slug}
            onChange={(e) => setManualSlug(e.target.value)}
            required
          />
        </Field>

        <Field
          label="一覧用の短い説明"
          error={err("excerpt")}
          hint="カードに表示されます。300文字まで"
        >
          <Textarea name="excerpt" defaultValue={seminar?.excerpt ?? ""} rows={2} />
        </Field>

        <Field
          label="セミナー概要"
          required
          error={err("description")}
          hint="改行はそのまま表示されます"
        >
          <Textarea
            name="description"
            defaultValue={seminar?.description ?? ""}
            rows={10}
            required
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="開始日時（日本時間）" required error={err("startsAt")}>
            <Input
              type="datetime-local"
              name="startsAt"
              value={startsAt}
              onChange={(e) => setStartsAt(e.target.value)}
              required
            />
          </Field>
          <Field label="終了日時（日本時間）" required error={err("endsAt")}>
            <Input
              type="datetime-local"
              name="endsAt"
              defaultValue={dateToJstInput(seminar?.endsAt)}
              required
            />
          </Field>
        </div>

        <Field
          label="開催場所"
          required
          error={err("location")}
          hint="例：東京本社 / オンライン（Zoom）"
        >
          <Input name="location" defaultValue={seminar?.location ?? ""} required />
        </Field>

        <Field
          label="外部申込URL（任意）"
          error={err("registrationUrl")}
          hint="Peatixなど外部サイトで受け付ける場合。設定すると詳細ページに外部申込ボタンも表示されます。サイト内の申込フォームは常に表示されます。"
        >
          <Input
            type="url"
            name="registrationUrl"
            defaultValue={seminar?.registrationUrl ?? ""}
            placeholder="https://"
          />
        </Field>

        <fieldset className="grid gap-5 rounded-lg border p-4 sm:grid-cols-3">
          <legend className="px-1 text-sm font-medium">登壇者（任意）</legend>
          <Field label="氏名">
            <Input name="speakerName" defaultValue={seminar?.speakerName ?? ""} />
          </Field>
          <Field label="肩書">
            <Input name="speakerTitle" defaultValue={seminar?.speakerTitle ?? ""} />
          </Field>
          <Field label="所属">
            <Input name="speakerOrg" defaultValue={seminar?.speakerOrg ?? ""} />
          </Field>
        </fieldset>
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
              : seminar
                ? "保存"
                : published
                  ? "作成して公開"
                  : "下書きとして作成"}
          </Button>
        </div>

        <div className="space-y-5 rounded-lg border bg-white p-4">
          <ImageUpload
            name="thumbnail"
            label="サムネイル（一覧用）"
            defaultValue={seminar?.thumbnail}
            hint="横長の写真が最適です"
          />
          <ImageUpload
            name="heroImage"
            label="メイン画像（詳細ページ用）"
            defaultValue={seminar?.heroImage}
          />
        </div>
      </aside>
    </form>
  );
}

function Field({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="flex items-center gap-2">
        {label}
        {required && (
          <span className="bg-accent-brand rounded px-1.5 py-0.5 text-[10px] font-bold text-white">
            必須
          </span>
        )}
      </Label>
      {children}
      {error ? (
        <p className="text-destructive text-xs">{error}</p>
      ) : hint ? (
        <p className="text-muted-foreground text-xs">{hint}</p>
      ) : null}
    </div>
  );
}
