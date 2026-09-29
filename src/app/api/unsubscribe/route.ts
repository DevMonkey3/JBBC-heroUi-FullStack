import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { subscribeSchema } from "@/lib/validation";
import { rateLimit, clientIp } from "@/server/ratelimit";

/** Public: stop all newsletter, announcement and seminar emails for one address. */
export async function POST(req: Request) {
  const ip = clientIp(req.headers);
  if (!rateLimit(`unsubscribe:${ip}`, { limit: 10, windowMs: 10 * 60 * 1000 }).ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const parsed = subscribeSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const email = parsed.data.email.toLowerCase();
  const existing = await db.subscription.findUnique({ where: { email } });
  if (!existing) return NextResponse.json({ error: "not_found" }, { status: 404 });
  if (existing.unsubscribedAt) {
    return NextResponse.json({ error: "already_unsubscribed" }, { status: 409 });
  }

  await db.subscription.update({ where: { email }, data: { unsubscribedAt: new Date() } });
  return NextResponse.json({ ok: true });
}
