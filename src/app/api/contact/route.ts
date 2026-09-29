import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { prefectureName } from "@/lib/prefectures";
import { rateLimit, clientIp } from "@/server/ratelimit";
import { sendFailure } from "@/server/email/resend";
import { verifyTurnstile } from "@/server/turnstile";
import { appendRow, tokyoTimestamp } from "@/server/sheets";
import { sendInquiryAcknowledgement, sendInquiryNotice } from "@/server/email/inquiry";

/**
 * Contact form.
 * The inquiry is written to the staff Google Sheet and emailed to the inquiry
 * inbox (reply-to the sender); the sender gets an acknowledgement. The request
 * only fails when neither the sheet nor the staff email could be delivered,
 * because then nobody would ever see the inquiry.
 */
export async function POST(req: Request) {
  const ip = clientIp(req.headers);
  if (!rateLimit(`contact:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 }).ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const parsed = contactSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { error: "invalid", field: String(first?.path[0] ?? ""), message: first?.message },
      { status: 400 },
    );
  }
  const v = parsed.data;

  if (!(await verifyTurnstile(v.turnstileToken, ip))) {
    return NextResponse.json({ error: "captcha_failed" }, { status: 400 });
  }

  const [sheet, notice, ack] = await Promise.allSettled([
    appendRow("inquiry", [
      tokyoTimestamp(),
      v.type,
      v.inquiryType.join(", "),
      v.type === "法人" ? v.companyName || "" : "",
      v.name,
      v.email,
      v.phone,
      v.postalCode,
      prefectureName(v.prefecture),
      v.address,
      v.type === "法人" ? v.businessContent || "" : "",
      v.inquiryContent,
    ]),
    sendInquiryNotice(v),
    sendInquiryAcknowledgement(v),
  ]);

  const sheetOk = sheet.status === "fulfilled";
  const noticeError = sendFailure(notice);
  const ackError = sendFailure(ack);
  if (!sheetOk) console.error("Contact sheet failed:", sheet.reason);
  if (noticeError) console.error("Contact notice failed:", noticeError);
  if (ackError) console.error("Contact acknowledgement failed:", ackError);
  const noticeOk = noticeError === null;

  if (!sheetOk && !noticeOk) {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
  return NextResponse.json({ ok: true }, { status: 201 });
}
