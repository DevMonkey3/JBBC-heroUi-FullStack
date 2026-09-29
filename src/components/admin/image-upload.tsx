"use client";

import { useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

/**
 * Uploads to /api/upload and keeps the CDN URL in a hidden input so the
 * surrounding form submits it like any other field.
 */
export function ImageUpload({
  name,
  label,
  defaultValue,
  hint,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  hint?: string;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function onFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        toast.error(
          data.error === "unsupported_type"
            ? "JPEG / PNG / WebP / AVIF のみアップロードできます"
            : data.error === "too_large"
              ? "12MB以下の画像を選んでください"
              : "アップロードに失敗しました",
        );
        return;
      }
      setUrl(data.url);
      toast.success("アップロードしました");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <input type="hidden" name={name} value={url} />
      {url ? (
        <div className="relative w-full max-w-sm overflow-hidden rounded-lg border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="" className="aspect-[16/10] w-full object-cover" />
          <button
            type="button"
            onClick={() => setUrl("")}
            className="absolute top-2 right-2 grid size-7 place-items-center rounded-full bg-black/60 text-white hover:bg-black/80"
            aria-label="画像を削除"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : (
        <label className="hover:bg-muted flex aspect-[16/10] w-full max-w-sm cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed text-sm text-gray-500">
          <ImagePlus className="size-6" aria-hidden />
          {busy ? "アップロード中..." : "クリックして画像を選択"}
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="sr-only"
            disabled={busy}
            onChange={(e) => onFile(e.target.files?.[0])}
          />
        </label>
      )}
      {url && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={busy}
          onClick={() => fileRef.current?.click()}
        >
          別の画像に変更
        </Button>
      )}
      {url && (
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="sr-only"
          onChange={(e) => onFile(e.target.files?.[0])}
        />
      )}
      {hint && <p className="text-muted-foreground text-xs">{hint}</p>}
    </div>
  );
}
