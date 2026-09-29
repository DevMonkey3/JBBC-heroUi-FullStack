"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormField, inputCls } from "@/components/site/form-field";

type Status =
  | { kind: "idle" }
  | { kind: "busy" }
  | { kind: "done"; file: string | null }
  | { kind: "error"; message: string; field?: string };

const errorMessages: Record<string, string> = {
  rate_limited: "送信回数が多すぎます。しばらくしてから再度お試しください。",
  captcha_failed: "確認に失敗しました。ページを再読み込みしてお試しください。",
  server_error: "送信に失敗しました。お手数ですがお問い合わせフォームよりご連絡ください。",
};

export function DownloadForm({ fileLabel }: { fileLabel: string }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setStatus({ kind: "busy" });
    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as {
        error?: string;
        field?: string;
        message?: string;
        file?: string | null;
      };
      if (res.ok) {
        setStatus({ kind: "done", file: body.file ?? null });
        return;
      }
      setStatus({
        kind: "error",
        field: body.field,
        message:
          body.message ??
          errorMessages[body.error ?? ""] ??
          "送信に失敗しました。もう一度お試しください。",
      });
    } catch {
      setStatus({ kind: "error", message: "ネットワークエラーが発生しました。" });
    }
  }

  if (status.kind === "done") {
    return (
      <div className="py-6 text-center">
        <CheckCircle2 className="mx-auto mb-3 size-12 text-green-600" aria-hidden />
        <p className="text-xl font-bold text-green-700">送信完了</p>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          ありがとうございます！
          <br />
          ご入力いただいたメールアドレスに受付確認メールをお送りしました。
        </p>
        {status.file ? (
          <a
            href={status.file}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent-brand hover:bg-accent-brand-dark mt-6 inline-flex h-12 items-center gap-2 rounded-full px-8 font-bold text-white"
          >
            <Download className="size-5" aria-hidden />
            {fileLabel}
          </a>
        ) : (
          <p className="mt-4 text-sm leading-relaxed text-gray-700">
            ご入力いただいた情報を確認次第、
            <br />
            担当者より資料をお送りいたします。
          </p>
        )}
        <div className="mt-6 border-t pt-4 text-sm text-gray-600">
          今後ともよろしくお願いいたします。
        </div>
        <Link href="/" className="text-brand mt-4 inline-block text-sm underline">
          ホームに戻る
        </Link>
      </div>
    );
  }

  const busy = status.kind === "busy";
  const err = (field: string) =>
    status.kind === "error" && status.field === field ? status.message : undefined;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <FormField label="お名前" required htmlFor="dl-name" error={err("name")}>
        <input
          id="dl-name"
          name="name"
          required
          minLength={2}
          autoComplete="name"
          placeholder="山田 太郎"
          className={inputCls}
          aria-invalid={Boolean(err("name"))}
        />
      </FormField>
      <FormField label="メールアドレス" required htmlFor="dl-email" error={err("email")}>
        <input
          id="dl-email"
          name="email"
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          placeholder="example@email.com"
          className={inputCls}
          aria-invalid={Boolean(err("email"))}
        />
      </FormField>
      <FormField label="電話番号" required htmlFor="dl-phone" error={err("phone")}>
        <input
          id="dl-phone"
          name="phone"
          type="tel"
          required
          inputMode="tel"
          autoComplete="tel"
          placeholder="090-1234-5678"
          className={inputCls}
          aria-invalid={Boolean(err("phone"))}
        />
      </FormField>

      <p className="text-xs text-gray-600">
        ご入力いただいた個人情報は、資料の送付およびご連絡のためにのみ使用します。詳しくは
        <Link href="/privacy" className="text-brand mx-1 underline">
          個人情報保護方針
        </Link>
        をご覧ください。
      </p>

      {status.kind === "error" && !status.field && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {status.message}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className={cn(
          "bg-accent-brand hover:bg-accent-brand-dark h-12 w-full rounded-full font-bold text-white transition-colors",
          busy && "opacity-60",
        )}
      >
        {busy ? "送信中..." : "送信する"}
      </button>
    </form>
  );
}
