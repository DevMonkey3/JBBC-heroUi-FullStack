import { NextResponse } from "next/server";
import { downloadRequestSchema } from "@/lib/validation";
import { downloadMaterial } from "@/content/download";
import { rateLimit, clientIp } from "@/server/ratelimit";
import { sendFailure } from "@/server/email/resend";
import { verifyTurnstile } from "@/server/turnstile";
import { appendRow, tokyoTimestamp } from "@/server/sheets";
import { sendDownloadAcknowledgement, sendDownloadNotice } from "@/server/email/inquiry";

/**
 * Material request (lead) form.
 * Recorded in the staff Google Sheet and emailed to the inquiry inbox; the
 * requester gets an acknowledgement with the file link once one is configured.
 */
export async function POST(req: Request) {
  const ip = clientIp(req.headers);
  if (!rateLimit(`download:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 }).ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const parsed = downloadRequestSchema.safeParse(await req.json().catch(() => null));
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
    appendRow("download", [tokyoTimestamp(), v.name, v.email, v.phone]),
    sendDownloadNotice(v),
    sendDownloadAcknowledgement(v),
  ]);

  const sheetOk = sheet.status === "fulfilled";
  const noticeError = sendFailure(notice);
  const ackError = sendFailure(ack);
  if (!sheetOk) console.error("Download sheet failed:", sheet.reason);
  if (noticeError) console.error("Download notice failed:", noticeError);
  if (ackError) console.error("Download acknowledgement failed:", ackError);
  const noticeOk = noticeError === null;

  if (!sheetOk && !noticeOk) {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
  return NextResponse.json({ ok: true, file: downloadMaterial.file }, { status: 201 });
}
