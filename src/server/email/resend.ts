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
