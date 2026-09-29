"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, MailX } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormField, inputCls } from "@/components/site/form-field";

type Status =
  { kind: "idle" } | { kind: "busy" } | { kind: "done" } | { kind: "error"; message: string };

const messages: Record<string, string> = {
  not_found: "このメールアドレスは登録されていません。",
  already_unsubscribed: "このメールアドレスはすでに配信停止済みです。",
  invalid_email: "有効なメールアドレスを入力してください。",
  rate_limited: "送信回数が多すぎます。しばらくしてから再度お試しください。",
};

export function UnsubscribeForm({ initialEmail = "" }: { initialEmail?: string }) {
  const [email, setEmail] = useState(initialEmail);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ kind: "busy" });
    try {
      const res = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus({ kind: "done" });
        return;
      }
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      setStatus({
        kind: "error",
        message: messages[body.error ?? ""] ?? "配信停止に失敗しました。もう一度お試しください。",
      });
    } catch {
      setStatus({ kind: "error", message: "ネットワークエラーが発生しました。" });
    }
  }

  if (status.kind === "done") {
    return (
      <div className="py-6 text-center">
        <CheckCircle2 className="mx-auto mb-3 size-12 text-green-600" aria-hidden />
        <p className="text-xl font-bold text-green-700">配信停止が完了しました</p>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          ニュースレターの配信を停止しました。ご利用ありがとうございました。
        </p>
        <Link
          href="/"
          className="bg-brand hover:bg-brand-dark mt-6 inline-flex h-11 items-center rounded-full px-8 font-semibold text-white"
        >
          ホームに戻る
        </Link>
      </div>
    );
  }

  const busy = status.kind === "busy";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="text-center">
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-orange-100">
          <MailX className="size-7 text-orange-600" aria-hidden />
        </span>
      </div>
      <FormField label="登録されているメールアドレス" required htmlFor="unsub-email">
        <input
          id="unsub-email"
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          className={inputCls}
        />
      </FormField>
      <p className="rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-gray-700">
        <strong>ご注意:</strong>{" "}
        配信を停止すると、JBBCからのすべてのニュースレター、お知らせ、セミナー情報が届かなくなります。
      </p>
      {status.kind === "error" && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {status.message}
        </p>
      )}
      <button
        type="submit"
        disabled={busy || !email}
        className={cn(
          "bg-brand hover:bg-brand-dark h-12 w-full rounded-full font-bold text-white transition-colors",
          (busy || !email) && "opacity-60",
        )}
      >
        {busy ? "処理中..." : "配信停止"}
      </button>
      <p className="text-center text-sm">
        <Link href="/" className="text-brand underline">
          ホームに戻る
        </Link>
      </p>
    </form>
  );
}
