import { z } from "zod";

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

export const inquirySchema = z.object({
  type: z.enum(["法人", "個人"]),
  inquiryType: z.array(z.string()).default([]),
  companyName: z.string().trim().max(200).optional(),
  name: fields.name,
  email: fields.email,
  phone: fields.phoneJp,
  postalCode: z.string().trim().max(10).optional(),
  prefecture: z.string().trim().max(20).optional(),
  address: z.string().trim().max(300).optional(),
  businessContent: z.string().trim().max(1000).optional(),
  inquiryContent: z.string().trim().min(1).max(4000),
  agreedToTerms: z.literal(true),
  turnstileToken: fields.turnstileToken,
});

export const seminarRegistrationSchema = z.object({
  seminarId: z.string().min(1),
  name: fields.name,
  companyName: z.string().trim().max(200).optional(),
  phone: fields.phoneJp,
  prefecture: z.string().min(1),
  email: fields.email,
  consentPI: z.literal(true),
  turnstileToken: fields.turnstileToken,
});

export type SubscribeInput = z.infer<typeof subscribeSchema>;
export type DownloadRequestInput = z.infer<typeof downloadRequestSchema>;
export type InquiryInput = z.infer<typeof inquirySchema>;
export type SeminarRegistrationInput = z.infer<typeof seminarRegistrationSchema>;
