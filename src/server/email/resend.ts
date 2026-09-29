import "server-only";
import { Resend } from "resend";
import { env } from "@/config/env";

let client: Resend | null = null;

/** Lazily created so a missing key only fails when an email is actually sent. */
export function getResend(): Resend {
  if (!env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set");
  }
  client ??= new Resend(env.RESEND_API_KEY);
  return client;
}

export const emailDefaults = {
  from: env.EMAIL_FROM,
  inquiryTo: env.EMAIL_INQUIRY_TO,
} as const;

export type SendResult = { ok: true; id: string | null } | { ok: false; error: string };

/** Send one email. Never throws; callers decide whether a failure matters. */
export async function sendEmail(input: {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<SendResult> {
  try {
    const { data, error } = await getResend().emails.send({
      from: emailDefaults.from,
      to: input.to,
      subject: input.subject,
      html: input.html,
      replyTo: input.replyTo,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true, id: data?.id ?? null };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
