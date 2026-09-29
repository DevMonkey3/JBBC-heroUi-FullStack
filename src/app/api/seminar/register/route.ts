import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { db } from "@/server/db";
import { seminarRegistrationSchema } from "@/lib/validation";
import { prefectureName } from "@/lib/prefectures";
import { rateLimit, clientIp } from "@/server/ratelimit";
import { verifyTurnstile } from "@/server/turnstile";
import { appendRow, tokyoTimestamp } from "@/server/sheets";
import { sendRegistrationConfirmation, sendRegistrationNotice } from "@/server/email/seminar";

/**
 * Public seminar registration.
 * 1. Save to the database (source of truth, rejects duplicates).
 * 2. Mirror the row to the Google Sheet the staff use.
 * 3. Email the registrant and the inquiry inbox.
 * Steps 2 and 3 are best effort: their failure is logged, not shown.
 */
export async function POST(req: Request) {
  const ip = clientIp(req.headers);
  if (!rateLimit(`seminar-register:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 }).ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const parsed = seminarRegistrationSchema.safeParse(await req.json().catch(() => null));
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

  // Status checked in code: old-admin documents lack the field.
  const seminar = await db.seminar.findUnique({ where: { id: v.seminarId } }).catch(() => null);
  if (!seminar || seminar.status === "DRAFT") {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  if (seminar.endsAt.getTime() < Date.now()) {
    return NextResponse.json({ error: "ended" }, { status: 400 });
  }

  const email = v.email.toLowerCase();
  let registration;
  try {
    registration = await db.seminarRegistration.create({
      data: {
        seminarId: seminar.id,
        name: v.name,
        companyName: v.companyName || null,
        phone: v.phone,
        prefecture: v.prefecture,
        email,
        consentPI: true,
        ip,
        userAgent: req.headers.get("user-agent")?.slice(0, 300) ?? null,
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return NextResponse.json({ error: "duplicate" }, { status: 409 });
    }
    console.error("Registration save failed:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  const registrant = { ...registration, companyName: registration.companyName };

  const sideEffects = await Promise.allSettled([
    appendRow("seminar", [
      tokyoTimestamp(registration.createdAt),
      seminar.title,
      seminar.id,
      registration.name,
      registration.companyName ?? "",
      registration.phone,
      prefectureName(registration.prefecture),
      registration.email,
      "同意",
    ]),
    sendRegistrationConfirmation(seminar, registrant),
    sendRegistrationNotice(seminar, registrant),
  ]);
  sideEffects.forEach((r, i) => {
    const label = ["sheet", "confirmation", "notice"][i];
    if (r.status === "rejected") console.error(`Registration ${label} failed:`, r.reason);
    else if (r.value && typeof r.value === "object" && "ok" in r.value && !r.value.ok) {
      console.error(`Registration ${label} failed:`, r.value.error);
    }
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
