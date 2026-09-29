"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { prefectures } from "@/lib/prefectures";
import { cn } from "@/lib/utils";

type Status =
  { kind: "idle" } | { kind: "busy" } | { kind: "done" } | { kind: "error"; message: string };

const errorMessages: Record<string, string> = {
  duplicate: "このメールアドレスと電話番号ではすでにお申し込み済みです。",
  ended: "このセミナーの受付は終了しました。",
  rate_limited: "送信回数が多すぎます。しばらくしてから再度お試しください。",
  captcha_failed: "確認に失敗しました。ページを再読み込みしてお試しください。",
  not_found: "セミナーが見つかりません。",
};

export function RegistrationForm({ seminarId }: { seminarId: string }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus({ kind: "busy" });
    try {
      const res = await fetch("/api/seminar/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, seminarId, consentPI: data.consentPI === "on" }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string; message?: string };
      if (res.ok) {
        setStatus({ kind: "done" });
        return;
      }
      setStatus({
        kind: "error",
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
        <p className="text-lg font-bold text-green-700">お申し込みありがとうございます</p>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          セミナーへのお申し込みを受け付けました。
          <br />
          ご登録いただいたメールアドレスに確認メールをお送りしました。
          <br />
          当日お会いできることを楽しみにしております。
        </p>
        <Link href="/seminar" className="text-brand mt-5 inline-block text-sm underline">
          セミナー一覧に戻る
        </Link>
      </div>
    );
  }

  const busy = status.kind === "busy";

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <Field label="お名前" required>
        <input name="name" required minLength={2} placeholder="山田 太郎" className={inputCls} />
      </Field>
      <Field label="会社名">
        <input name="companyName" placeholder="株式会社〇〇" className={inputCls} />
      </Field>
      <Field label="電話番号" required>
        <input
          name="phone"
          type="tel"
          required
          inputMode="tel"
          placeholder="090-1234-5678"
          className={inputCls}
        />
      </Field>
      <Field label="都道府県" required>
        <select name="prefecture" required defaultValue="" className={inputCls}>
          <option value="" disabled>
            選択してください
          </option>
          {prefectures.map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
      </Field>
      <Field label="メールアドレス" required>
        <input
          name="email"
          type="email"
          required
          inputMode="email"
          placeholder="example@email.com"
          className={inputCls}
        />
      </Field>

      <p className="text-xs text-gray-600">
        個人情報の取り扱いについては
        <Link href="/privacy" className="text-brand mx-1 underline">
          こちら
        </Link>
        をご覧ください
      </p>
      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" name="consentPI" required className="mt-1 size-4" />
        個人情報の取り扱いについて同意する
      </label>

      {status.kind === "error" && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {status.message}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className={cn(
          "w-full rounded-full bg-[#FF6F00] py-3 font-bold text-white transition-colors hover:bg-[#e56300]",
          busy && "opacity-60",
        )}
      >
        {busy ? "送信中..." : "申し込む"}
      </button>
    </form>
  );
}

const inputCls =
  "h-11 w-full rounded-md border bg-white px-3 text-base outline-none focus-visible:ring-3 focus-visible:ring-brand/30";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label className="flex items-center gap-2 text-sm font-medium">
        {label}
        {required && (
          <span className="rounded bg-red-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
            必須
          </span>
        )}
      </label>
      {children}
    </div>
  );
}
