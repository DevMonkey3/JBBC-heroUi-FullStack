import { z } from "zod";
import { prefectureCodes } from "@/lib/prefectures";
import { blogCategories } from "@/lib/blog-categories";

/** Shared field rules used by both client forms and server handlers. */
export const fields = {
  email: z.email({ message: "有効なメールアドレスを入力してください" }),
  phoneJp: z.string().regex(/^[\d-]{10,13}$/, { message: "有効な電話番号を入力してください" }),
  name: z.string().trim().min(2, { message: "名前は2文字以上で入力してください" }).max(100),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(120)
    .regex(/^[\p{L}\p{N}-]+$/u, { message: "スラッグに使用できない文字が含まれています" }),
  turnstileToken: z.string().optional(),
};

export const subscribeSchema = z.object({
  email: fields.email,
  turnstileToken: fields.turnstileToken,
});

export const downloadRequestSchema = z.object({
  name: fields.name,
  email: fields.email,
  phone: fields.phoneJp,
  turnstileToken: fields.turnstileToken,
});

export const seminarRegistrationSchema = z.object({
  seminarId: z.string().min(1),
  name: fields.name,
  companyName: z.string().trim().max(200).optional(),
  phone: fields.phoneJp,
  prefecture: z.enum(prefectureCodes, { message: "都道府県を選択してください" }),
  email: fields.email,
  consentPI: z.literal(true, { message: "個人情報の取り扱いに同意してください" }),
  turnstileToken: fields.turnstileToken,
});

const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));
const datetimeLocal = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, { message: "日時を入力してください" });

/** Admin seminar form. Dates are `datetime-local` strings interpreted as JST. */
export const seminarSchema = z
  .object({
    title: z.string().trim().min(1, { message: "タイトルは必須です" }).max(200),
    slug: fields.slug,
    excerpt: optionalText(300),
    description: z.string().trim().min(1, { message: "概要は必須です" }).max(20000),
    location: z.string().trim().min(1, { message: "開催場所は必須です" }).max(200),
    startsAt: datetimeLocal,
    endsAt: datetimeLocal,
    registrationUrl: z.url({ message: "URLの形式が正しくありません" }).optional().or(z.literal("")),
    heroImage: optionalText(500),
    thumbnail: optionalText(500),
    speakerName: optionalText(100),
    speakerTitle: optionalText(100),
    speakerOrg: optionalText(100),
    status: z.enum(["DRAFT", "PUBLISHED"]),
    publishedAt: datetimeLocal.optional().or(z.literal("")),
  })
  .refine((v) => v.endsAt > v.startsAt, {
    message: "終了日時は開始日時より後にしてください",
    path: ["endsAt"],
  });

export type SeminarInput = z.infer<typeof seminarSchema>;

const status = z.enum(["DRAFT", "PUBLISHED"]);

/** Admin blog post form. `content` is editor HTML, sanitized server side. */
export const postSchema = z.object({
  title: z.string().trim().min(1, { message: "タイトルは必須です" }).max(200),
  slug: fields.slug,
  category: z.enum(blogCategories, { message: "カテゴリを選択してください" }),
  excerpt: z.string().trim().max(300).optional().or(z.literal("")),
  coverImage: z.string().trim().max(500).optional().or(z.literal("")),
  content: z.string().trim().min(1, { message: "本文は必須です" }).max(200_000),
  status,
  /** Shown as the article date; empty keeps the existing value (or now on create). */
  publishedAt: datetimeLocal.optional().or(z.literal("")),
});
export type PostInput = z.infer<typeof postSchema>;

/** Announcements and newsletters share one form. */
export const noticeSchema = z.object({
  title: z.string().trim().min(1, { message: "タイトルは必須です" }).max(200),
  slug: fields.slug,
  excerpt: z.string().trim().max(300).optional().or(z.literal("")),
  body: z.string().trim().min(1, { message: "本文は必須です" }).max(200_000),
  status,
  /** Shown as the article date; empty keeps the existing value (or now on create). */
  publishedAt: datetimeLocal.optional().or(z.literal("")),
});
export type NoticeInput = z.infer<typeof noticeSchema>;

/** Contact form, both 法人 and 個人 variants. */
export const contactSchema = z
  .object({
    type: z.enum(["法人", "個人"], { message: "区分を選択してください" }),
    inquiryType: z
      .array(z.string().max(50))
      .min(1, { message: "お問い合わせ内容種別を選択してください" }),
    companyName: z.string().trim().max(200).optional().or(z.literal("")),
    name: fields.name,
    email: fields.email,
    phone: fields.phoneJp,
    postalCode: z
      .string()
      .trim()
      .regex(/^\d{7}$/, { message: "7桁の郵便番号を入力してください" }),
    prefecture: z.enum(prefectureCodes, { message: "都道府県を選択してください" }),
    address: z.string().trim().min(1, { message: "市区町村/番地を入力してください" }).max(300),
    businessContent: z.string().trim().max(500).optional().or(z.literal("")),
    inquiryContent: z
      .string()
      .trim()
      .min(1, { message: "お問い合わせ内容を入力してください" })
      .max(4000),
    agreedToTerms: z.literal(true, { message: "個人情報の取り扱いに同意してください" }),
    turnstileToken: fields.turnstileToken,
  })
  .refine((v) => v.type === "個人" || Boolean(v.companyName), {
    message: "会社名を入力してください",
    path: ["companyName"],
  })
  .refine((v) => v.type === "個人" || Boolean(v.businessContent), {
    message: "事業内容を入力してください",
    path: ["businessContent"],
  });
export type ContactInput = z.infer<typeof contactSchema>;

export type SubscribeInput = z.infer<typeof subscribeSchema>;
export type DownloadRequestInput = z.infer<typeof downloadRequestSchema>;
export type SeminarRegistrationInput = z.infer<typeof seminarRegistrationSchema>;
