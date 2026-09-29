"use server";

import { Prisma } from "@prisma/client";
import { db } from "@/server/db";
import { requireAdmin, requireRole, UnauthorizedError } from "@/server/auth";
import { invalidate, tags } from "@/server/cache";
import { seminarSchema } from "@/lib/validation";
import { jstInputToDate } from "@/lib/dates";
import { sendSeminarAnnouncement } from "@/server/email/seminar";
import type { ActionResult } from "@/components/admin/confirm-button";
import { isProduction } from "@/config/env";

export type SaveSeminarState = {
  ok: boolean;
  id?: string;
  error?: string;
  fieldErrors?: Record<string, string>;
};

function fail(error: unknown): ActionResult {
  if (error instanceof UnauthorizedError) return { ok: false, error: "権限がありません" };
  console.error(error);
  const detail = error instanceof Error ? error.message : String(error);
  return {
    ok: false,
    error: isProduction ? "エラーが発生しました" : `エラー: ${detail.slice(0, 300)}`,
  };
}

/** Create (id null) or update a seminar from the admin form. */
export async function saveSeminar(
  id: string | null,
  _prev: SaveSeminarState,
  formData: FormData,
): Promise<SaveSeminarState> {
  try {
    const user = await requireAdmin();
    const raw = Object.fromEntries(formData.entries());
    const parsed = seminarSchema.safeParse(raw);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        fieldErrors[key] ??= issue.message;
      }
      return { ok: false, error: "入力内容を確認してください", fieldErrors };
    }
    const v = parsed.data;
    const startsAt = jstInputToDate(v.startsAt);
    const endsAt = jstInputToDate(v.endsAt);
    if (!startsAt || !endsAt) return { ok: false, error: "日時が不正です" };

    const duplicate = await db.seminar.findFirst({
      where: { slug: v.slug, ...(id ? { NOT: { id } } : {}) },
      select: { id: true },
    });
    if (duplicate) {
      return {
        ok: false,
        error: "このスラッグは既に使われています",
        fieldErrors: { slug: "既に使われています" },
      };
    }

    const data = {
      title: v.title,
      slug: v.slug,
      excerpt: v.excerpt || null,
      description: v.description,
      location: v.location,
      startsAt,
      endsAt,
      registrationUrl: v.registrationUrl || null,
      heroImage: v.heroImage || null,
      thumbnail: v.thumbnail || null,
      speakerName: v.speakerName || null,
      speakerTitle: v.speakerTitle || null,
      speakerOrg: v.speakerOrg || null,
      status: v.status,
      updatedBy: user.email ?? null,
    };

    const row = id
      ? await db.seminar.update({ where: { id }, data })
      : await db.seminar.create({ data: { ...data, createdBy: user.email ?? null } });

    invalidate(tags.seminars, tags.notices);
    return { ok: true, id: row.id };
  } catch (error) {
    const r = fail(error);
    return { ok: false, error: r.ok ? undefined : r.error };
  }
}

export async function setSeminarStatus(
  id: string,
  status: "DRAFT" | "PUBLISHED",
): Promise<ActionResult> {
  try {
    const user = await requireAdmin();
    await db.seminar.update({ where: { id }, data: { status, updatedBy: user.email ?? null } });
    invalidate(tags.seminars, tags.notices);
    return { ok: true, message: status === "PUBLISHED" ? "公開しました" : "下書きに戻しました" };
  } catch (error) {
    return fail(error);
  }
}

export async function deleteSeminar(id: string): Promise<ActionResult> {
  try {
    await requireRole("ADMIN");
    await db.$transaction([
      db.seminarRegistration.deleteMany({ where: { seminarId: id } }),
      db.notification.deleteMany({ where: { type: "seminar", refId: id } }),
      db.seminar.delete({ where: { id } }),
    ]);
    invalidate(tags.seminars, tags.notices);
    return { ok: true, message: "削除しました" };
  } catch (error) {
    return fail(error);
  }
}

/**
 * Email every active subscriber about a published seminar. Explicit, once
 * per click, never automatic. Records each send so it can be audited.
 */
export async function sendSeminarToSubscribers(id: string): Promise<ActionResult> {
  try {
    await requireRole("ADMIN");
    const seminar = await db.seminar.findUnique({ where: { id } });
    if (!seminar) return { ok: false, error: "セミナーが見つかりません" };
    if (seminar.status !== "PUBLISHED") return { ok: false, error: "公開してから送信してください" };

    const subscribers = await db.subscription.findMany({
      where: { unsubscribedAt: null },
      select: { email: true },
    });
    if (subscribers.length === 0) return { ok: false, error: "購読者がいません" };

    let sent = 0;
    const failed: string[] = [];
    // Small concurrency so Resend's rate limit is respected.
    for (let i = 0; i < subscribers.length; i += 5) {
      const batch = subscribers.slice(i, i + 5);
      const results = await Promise.all(
        batch.map((s) => sendSeminarAnnouncement(seminar, s.email)),
      );
      const okEmails = batch.filter((_, j) => results[j].ok).map((s) => s.email);
      failed.push(...batch.filter((_, j) => !results[j].ok).map((s) => s.email));
      sent += okEmails.length;
      if (okEmails.length) {
        await db.notification.createMany({
          data: okEmails.map((email) => ({ type: "seminar", refId: seminar.id, email })),
        });
      }
    }

    await db.seminar.update({
      where: { id },
      data: { sentAt: new Date(), sentCount: (seminar.sentCount ?? 0) + sent },
    });

    if (failed.length) console.error("Seminar announcement failures:", failed);
    return {
      ok: true,
      message: failed.length
        ? `${sent}件送信、${failed.length}件失敗しました`
        : `${sent}件の購読者に送信しました`,
    };
  } catch (error) {
    return fail(error);
  }
}

export async function setRegistrationStatus(
  id: string,
  status: "SUBMITTED" | "CONFIRMED" | "CANCELLED",
): Promise<ActionResult> {
  try {
    await requireAdmin();
    await db.seminarRegistration.update({ where: { id }, data: { status } });
    return { ok: true, message: "更新しました" };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return { ok: false, error: "申込が見つかりません" };
    }
    return fail(error);
  }
}
