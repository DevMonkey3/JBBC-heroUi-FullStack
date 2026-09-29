import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { db } from "@/server/db";
import { invalidate, tags } from "@/server/cache";
import { rateLimit, clientIp } from "@/server/ratelimit";

type Ctx = { params: Promise<{ slug: string }> };

/** One like per visitor, identified by a hash of IP and user agent. */
function visitorKey(req: Request): string {
  const ip = clientIp(req.headers);
  const ua = req.headers.get("user-agent") ?? "";
  return createHash("sha256").update(`${ip}|${ua}`).digest("hex").slice(0, 40);
}

async function findPost(slug: string) {
  const post = await db.blogPost.findFirst({ where: { slug }, select: { id: true, status: true } });
  return post && post.status !== "DRAFT" ? post : null;
}

export async function GET(req: Request, { params }: Ctx) {
  const { slug } = await params;
  const post = await findPost(decodeURIComponent(slug));
  if (!post) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const like = await db.like.findUnique({
    where: { postId_userKey: { postId: post.id, userKey: visitorKey(req) } },
    select: { id: true },
  });
  return NextResponse.json({ liked: Boolean(like) });
}

export async function POST(req: Request, { params }: Ctx) {
  const ip = clientIp(req.headers);
  if (!rateLimit(`like:${ip}`, { limit: 30, windowMs: 10 * 60 * 1000 }).ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }
  const { slug } = await params;
  const post = await findPost(decodeURIComponent(slug));
  if (!post) return NextResponse.json({ error: "not_found" }, { status: 404 });

  const userKey = visitorKey(req);
  const existing = await db.like.findUnique({
    where: { postId_userKey: { postId: post.id, userKey } },
    select: { id: true },
  });

  const [, updated] = existing
    ? await db.$transaction([
        db.like.delete({ where: { id: existing.id } }),
        db.blogPost.update({ where: { id: post.id }, data: { likeCount: { decrement: 1 } } }),
      ])
    : await db.$transaction([
        db.like.create({ data: { postId: post.id, userKey } }),
        db.blogPost.update({ where: { id: post.id }, data: { likeCount: { increment: 1 } } }),
      ]);

  invalidate(tags.blog);
  return NextResponse.json({ liked: !existing, likeCount: Math.max(0, updated.likeCount) });
}
