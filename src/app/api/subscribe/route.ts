import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { subscribeSchema } from "@/lib/validation";
import { rateLimit, clientIp } from "@/server/ratelimit";
import { verifyTurnstile } from "@/server/turnstile";

export async function POST(req: Request) {
  const ip = clientIp(req.headers);
  if (!rateLimit(`subscribe:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 }).ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const parsed = subscribeSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  if (!(await verifyTurnstile(parsed.data.turnstileToken, ip))) {
    return NextResponse.json({ error: "captcha_failed" }, { status: 400 });
  }

  const email = parsed.data.email.toLowerCase();
  const existing = await db.subscription.findUnique({ where: { email } });

  if (existing && !existing.unsubscribedAt) {
    return NextResponse.json({ error: "already_subscribed" }, { status: 409 });
  }

  if (existing) {
    await db.subscription.update({ where: { email }, data: { unsubscribedAt: null } });
  } else {
    await db.subscription.create({ data: { email } });
  }

  return NextResponse.json({ ok: true }, { status: existing ? 200 : 201 });
}
