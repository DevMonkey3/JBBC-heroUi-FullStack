"use server";

import { db } from "@/server/db";
import { requireAdmin, requireRole, UnauthorizedError } from "@/server/auth";
import { invalidate, tags } from "@/server/cache";
import { noticeSchema } from "@/lib/validation";
import { sanitizeContent, textExcerpt } from "@/server/sanitize";
import { parsePublishedAt } from "@/server/actions/published-at";
import { sendAnnouncementEmail, sendNewsletterEmail } from "@/server/email/content";
import { broadcast, broadcastMessage } from "@/server/broadcast";
import { isProduction } from "@/config/env";
import type { NoticeKind } from "@/server/queries/notices";
import type { ActionResult } from "@/components/admin/confirm-button";
import type { SaveState } from "@/server/actions/posts";

function fail(error: unknown): ActionResult {
  if (error instanceof UnauthorizedError) return { ok: false, error: "権限がありません" };
  console.error(error);
  const detail = error instanceof Error ? error.message : String(error);
  return {
    ok: false,
    error: isProduction ? "エラーが発生しました" : `エラー: ${detail.slice(0, 300)}`,
  };
}

type NoticeData = {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  status: "DRAFT" | "PUBLISHED";
  updatedBy: string | null;
  createdBy?: string | null;
  publishedAt?: Date;
};

// The two Prisma delegates share a shape but TypeScript cannot call a union of
// generic methods, so each operation branches on the kind explicitly.
const model = (kind: NoticeKind) =>
  kind === "announcement"
    ? {
        findSlug: (where: { slug: string; NOT?: { id: string } }) =>
          db.announcement.findFirst({ where, select: { id: true } }),
        findUnique: (id: string) => db.announcement.findUnique({ where: { id } }),
        create: (data: NoticeData) => db.announcement.create({ data }),
        update: (id: string, data: Partial<NoticeData> & { sentAt?: Date; sentCount?: number }) =>
          db.announcement.update({ where: { id }, data }),
        delete: (id: string) => db.announcement.delete({ where: { id } }),
      }
    : {
        findSlug: (where: { slug: string; NOT?: { id: string } }) =>
          db.newsletter.findFirst({ where, select: { id: true } }),
        findUnique: (id: string) => db.newsletter.findUnique({ where: { id } }),
        create: (data: NoticeData) => db.newsletter.create({ data }),
        update: (id: string, data: Partial<NoticeData> & { sentAt?: Date; sentCount?: number }) =>
          db.newsletter.update({ where: { id }, data }),
        delete: (id: string) => db.newsletter.delete({ where: { id } }),
      };
const tagFor = (kind: NoticeKind) =>
  kind === "announcement" ? tags.announcements : tags.newsletters;
const label = (kind: NoticeKind) => (kind === "announcement" ? "お知らせ" : "ニュースレター");

export async function saveNotice(
  kind: NoticeKind,
  id: string | null,
  _prev: SaveState,
  formData: FormData,
): Promise<SaveState> {
  try {
    const user = await requireAdmin();
    const parsed = noticeSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const i of parsed.error.issues) fieldErrors[String(i.path[0] ?? "form")] ??= i.message;
      return { ok: false, error: "入力内容を確認してください", fieldErrors };
    }
    const v = parsed.data;
    const m = model(kind);
    const publishedAt = parsePublishedAt(v.publishedAt);
    if (publishedAt === false)
      return {
        ok: false,
        error: "公開日時が不正です",
        fieldErrors: { publishedAt: "日時を確認してください" },
      };

    const duplicate = await m.findSlug({ slug: v.slug, ...(id ? { NOT: { id } } : {}) });
    if (duplicate)
      return {
        ok: false,
        error: "このスラッグは既に使われています",
        fieldErrors: { slug: "既に使われています" },
      };

    const body = sanitizeContent(v.body);
    const data = {
      title: v.title,
      slug: v.slug,
      excerpt: v.excerpt || textExcerpt(body),
      body,
      status: v.status,
      updatedBy: user.email ?? null,
      ...(publishedAt ? { publishedAt } : {}),
    };
    const row = id
      ? await m.update(id, data)
      : await m.create({ ...data, createdBy: user.email ?? null });

    invalidate(tagFor(kind), tags.notices);
    return { ok: true, id: row.id };
  } catch (error) {
    const r = fail(error);
    return { ok: false, error: r.ok ? undefined : r.error };
  }
}

export async function setNoticeStatus(
  kind: NoticeKind,
  id: string,
  status: "DRAFT" | "PUBLISHED",
): Promise<ActionResult> {
  try {
    const user = await requireAdmin();
    await model(kind).update(id, { status, updatedBy: user.email ?? null });
    invalidate(tagFor(kind), tags.notices);
    return { ok: true, message: status === "PUBLISHED" ? "公開しました" : "下書きに戻しました" };
  } catch (error) {
    return fail(error);
  }
}

export async function deleteNotice(kind: NoticeKind, id: string): Promise<ActionResult> {
  try {
    await requireRole("ADMIN");
    await db.notification.deleteMany({ where: { type: kind, refId: id } });
    await model(kind).delete(id);
    invalidate(tagFor(kind), tags.notices);
    return { ok: true, message: "削除しました" };
  } catch (error) {
    return fail(error);
  }
}

export async function sendNoticeToSubscribers(kind: NoticeKind, id: string): Promise<ActionResult> {
  try {
    await requireRole("ADMIN");
    const item = await model(kind).findUnique(id);
    if (!item) return { ok: false, error: `${label(kind)}が見つかりません` };
    if (item.status === "DRAFT") return { ok: false, error: "公開してから送信してください" };
    const send = kind === "announcement" ? sendAnnouncementEmail : sendNewsletterEmail;
    const r = await broadcast(kind, item.id, (to) => send(item, to));
    if (r.sent === 0 && r.failed.length === 0) return { ok: false, error: "購読者がいません" };
    await model(kind).update(id, {
      sentAt: new Date(),
      sentCount: (item.sentCount ?? 0) + r.sent,
    });
    return { ok: true, message: broadcastMessage(r) };
  } catch (error) {
    return fail(error);
  }
}

export async function sendNoticeTest(
  kind: NoticeKind,
  id: string,
  to: string,
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const address = to.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address))
      return { ok: false, error: "メールアドレスの形式が正しくありません" };
    const item = await model(kind).findUnique(id);
    if (!item) return { ok: false, error: `${label(kind)}が見つかりません` };
    const send = kind === "announcement" ? sendAnnouncementEmail : sendNewsletterEmail;
    const r = await send(item, address);
    return r.ok
      ? { ok: true, message: `${address} にテスト送信しました` }
      : { ok: false, error: `送信に失敗しました: ${r.error}` };
  } catch (error) {
    return fail(error);
  }
}
