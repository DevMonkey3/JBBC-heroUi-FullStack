"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { prefectures } from "@/lib/prefectures";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { FormField, inputCls, textareaCls } from "@/components/site/form-field";

type Kind = "法人" | "個人";

type Status =
  | { kind: "idle" }
  | { kind: "busy" }
  | { kind: "done" }
  | { kind: "error"; message: string; field?: string };

const inquiryTypes: Record<Kind, string[]> = {
  法人: ["人材のご相談", "資料請求", "その他"],
  個人: ["お仕事探しについて", "その他"],
};

const errorMessages: Record<string, string> = {
  rate_limited: "送信回数が多すぎます。しばらくしてから再度お試しください。",
  captcha_failed: "確認に失敗しました。ページを再読み込みしてお試しください。",
  server_error: "送信に失敗しました。お手数ですがお電話でお問い合わせください。",
};

const privacyText = `【個人情報の取り扱いについて】
情報をご送信いただく前に、下記の内容を必ずお読みいただき、ご同意いただける場合は「同意する」にチェックを入れて「送信する」ボタンをクリックしてください。
当社はお預かりした皆様の個人情報について、以下の通り適切に管理・保護に努めます。

1. 個人情報保護管理者の氏名または職名、所属および連絡先
当社は、以下の者を個人情報保護管理者として任命し、個人情報を適切かつ安全に管理するとともに、漏えい・滅失・き損の防止に必要な保護策を講じています。
ジャパンバングラブリッジ株式会社
個人情報保護管理者：管理部　管理部長（個人情報保護マネジメントシステム管理者）
所在地：〒160-0023 東京都新宿区西新宿7丁目22-39 興亜第二ビル703
電話：${siteConfig.contact.phoneJp}
FAX：${siteConfig.contact.faxJp}
E-Mail：${siteConfig.contact.email}
URL：jbbc.co.jp`;

export function ContactForm() {
  const [kind, setKind] = useState<Kind>("法人");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [types, setTypes] = useState<string[]>([]);

  function switchKind(next: Kind) {
    if (next === kind) return;
    setKind(next);
    setTypes([]);
    setStatus({ kind: "idle" });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (types.length === 0) {
      setStatus({
        kind: "error",
        field: "inquiryType",
        message: "お問い合わせ内容種別を選択してください",
      });
      return;
    }
    const payload = {
      type: kind,
      inquiryType: types,
      companyName: data.get("companyName") ?? "",
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      postalCode: String(data.get("postalCode") ?? "").replace(/[^\d]/g, ""),
      prefecture: data.get("prefecture"),
      address: data.get("address"),
      businessContent: data.get("businessContent") ?? "",
      inquiryContent: data.get("inquiryContent"),
      agreedToTerms: data.get("agreedToTerms") === "on",
    };
    setStatus({ kind: "busy" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => ({}))) as {
        error?: string;
        field?: string;
        message?: string;
      };
      if (res.ok) {
        setStatus({ kind: "done" });
        window.scrollTo({ top: 0, behavior: "smooth" });
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
      <div className="py-10 text-center">
        <CheckCircle2 className="mx-auto mb-4 size-14 text-green-600" aria-hidden />
        <p className="text-2xl font-bold text-green-700">お問い合わせを受け付けました</p>
        <p className="mt-4 leading-relaxed text-gray-700">
          お問い合わせいただきありがとうございます。
          <br />
          ご入力いただいたメールアドレスに受付確認メールをお送りしました。
          <br />
          担当者より折り返しご連絡させていただきます。
        </p>
        <Link
          href="/"
          className="bg-brand hover:bg-brand-dark mt-8 inline-flex h-11 items-center rounded-full px-8 font-semibold text-white"
        >
          ホームに戻る
        </Link>
      </div>
    );
  }

  const busy = status.kind === "busy";
  const err = (field: string) =>
    status.kind === "error" && status.field === field ? status.message : undefined;
  const corporate = kind === "法人";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <fieldset className="text-center">
        <legend className="mb-3 w-full text-lg font-bold">法人・個人区分</legend>
        <div
          role="radiogroup"
          aria-label="法人・個人区分"
          className="inline-flex rounded-full bg-gray-100 p-1"
        >
          {(["法人", "個人"] as const).map((k) => (
            <button
              key={k}
              type="button"
              role="radio"
              aria-checked={kind === k}
              onClick={() => switchKind(k)}
              className={cn(
                "rounded-full px-8 py-2 text-base font-semibold transition-colors",
                kind === k ? "bg-brand text-white shadow" : "text-gray-600 hover:text-gray-900",
              )}
            >
              {k}
            </button>
          ))}
        </div>
      </fieldset>

      <FormField label="お問い合わせ内容種別" required error={err("inquiryType")}>
        <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1">
          {inquiryTypes[kind].map((t) => (
            <label key={t} className="flex items-center gap-2 text-base font-medium">
              <input
                type="checkbox"
                className="accent-brand size-4"
                checked={types.includes(t)}
                onChange={(e) =>
                  setTypes((prev) =>
                    e.target.checked ? [...prev, t] : prev.filter((x) => x !== t),
                  )
                }
              />
              {t}
            </label>
          ))}
        </div>
      </FormField>

      {corporate && (
        <FormField label="会社名" required htmlFor="companyName" error={err("companyName")}>
          <input
            id="companyName"
            name="companyName"
            required
            placeholder="ジャパンバングラデシュブリッジ株式会社"
            className={inputCls}
            aria-invalid={Boolean(err("companyName"))}
          />
        </FormField>
      )}

      <FormField label="お名前（漢字）" required htmlFor="name" error={err("name")}>
        <input
          id="name"
          name="name"
          required
          minLength={2}
          autoComplete="name"
          placeholder="山田 太郎"
          className={inputCls}
          aria-invalid={Boolean(err("name"))}
        />
      </FormField>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="メールアドレス" required htmlFor="email" error={err("email")}>
          <input
            id="email"
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
        <FormField label="電話番号" required htmlFor="phone" error={err("phone")}>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            placeholder="03-1234-5678"
            className={inputCls}
            aria-invalid={Boolean(err("phone"))}
          />
        </FormField>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          label="郵便番号"
          required
          htmlFor="postalCode"
          error={err("postalCode")}
          hint="ハイフンなし7桁"
        >
          <input
            id="postalCode"
            name="postalCode"
            required
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="1600023"
            className={inputCls}
            aria-invalid={Boolean(err("postalCode"))}
          />
        </FormField>
        <FormField label="都道府県" required htmlFor="prefecture" error={err("prefecture")}>
          <select
            id="prefecture"
            name="prefecture"
            required
            defaultValue=""
            className={inputCls}
            aria-invalid={Boolean(err("prefecture"))}
          >
            <option value="" disabled>
              選択してください
            </option>
            {prefectures.map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <FormField label="市区町村/番地" required htmlFor="address" error={err("address")}>
        <input
          id="address"
          name="address"
          required
          autoComplete="street-address"
          placeholder="新宿区西新宿7丁目22-39 興亜第二ビル703"
          className={inputCls}
          aria-invalid={Boolean(err("address"))}
        />
      </FormField>

      {corporate && (
        <FormField
          label="事業内容"
          required
          htmlFor="businessContent"
          error={err("businessContent")}
        >
          <input
            id="businessContent"
            name="businessContent"
            required
            placeholder="例：ITコンサルティング"
            className={inputCls}
            aria-invalid={Boolean(err("businessContent"))}
          />
        </FormField>
      )}

      <FormField
        label="お問い合わせ内容"
        required
        htmlFor="inquiryContent"
        error={err("inquiryContent")}
      >
        <textarea
          id="inquiryContent"
          name="inquiryContent"
          required
          rows={6}
          className={textareaCls}
          aria-invalid={Boolean(err("inquiryContent"))}
        />
      </FormField>

      <div>
        <textarea
          readOnly
          value={privacyText}
          rows={8}
          aria-label="個人情報の取り扱いについて"
          className="w-full rounded-md border bg-gray-50 px-3 py-2 text-sm leading-relaxed text-gray-700"
        />
        <p className="mt-2 text-xs text-gray-600">
          全文は
          <Link href="/privacy" className="text-brand mx-1 underline">
            個人情報保護方針
          </Link>
          をご覧ください。
        </p>
        <label className="mt-3 flex items-start gap-2 text-base">
          <input
            type="checkbox"
            name="agreedToTerms"
            required
            className="accent-brand mt-1 size-4"
          />
          個人情報の取り扱いについて同意する
        </label>
        {err("agreedToTerms") && (
          <p role="alert" className="mt-1 text-xs font-medium text-red-600">
            {err("agreedToTerms")}
          </p>
        )}
      </div>

      {status.kind === "error" && !status.field && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {status.message}
        </p>
      )}

      <div className="text-center">
        <button
          type="submit"
          disabled={busy}
          className={cn(
            "bg-brand hover:bg-brand-dark inline-flex h-12 w-full items-center justify-center gap-1 rounded-full px-12 text-base font-bold text-white shadow-sm transition-colors md:w-auto",
            busy && "opacity-60",
          )}
        >
          {busy ? "送信中..." : "送信する"}
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>
    </form>
  );
}
