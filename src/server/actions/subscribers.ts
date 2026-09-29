"use server";

import { db } from "@/server/db";
import { requireRole, UnauthorizedError } from "@/server/auth";
import { isProduction } from "@/config/env";
import type { ActionResult } from "@/components/admin/confirm-button";

function fail(error: unknown): ActionResult {
  if (error instanceof UnauthorizedError) return { ok: false, error: "権限がありません" };
  console.error(error);
  const detail = error instanceof Error ? error.message : String(error);
  return {
    ok: false,
    error: isProduction ? "エラーが発生しました" : `エラー: ${detail.slice(0, 300)}`,
  };
}

/** Manual add, e.g. a client who asked by phone. */
export async function addSubscriber(email: string): Promise<ActionResult> {
  try {
    await requireRole("ADMIN");
    const address = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address))
      return { ok: false, error: "メールアドレスの形式が正しくありません" };
    const existing = await db.subscription.findUnique({ where: { email: address } });
    if (existing && !existing.unsubscribedAt) return { ok: false, error: "すでに登録されています" };
    if (existing) {
      await db.subscription.update({ where: { email: address }, data: { unsubscribedAt: null } });
    } else {
      await db.subscription.create({ data: { email: address, verifiedAt: new Date() } });
    }
    return { ok: true, message: `${address} を登録しました` };
  } catch (error) {
    return fail(error);
  }
}

export async function setSubscriberActive(id: string, active: boolean): Promise<ActionResult> {
  try {
    await requireRole("ADMIN");
    await db.subscription.update({
      where: { id },
      data: { unsubscribedAt: active ? null : new Date() },
    });
    return { ok: true, message: active ? "配信を再開しました" : "配信を停止しました" };
  } catch (error) {
    return fail(error);
  }
}

export async function deleteSubscriber(id: string): Promise<ActionResult> {
  try {
    await requireRole("ADMIN");
    await db.$transaction([
      db.notification.deleteMany({ where: { subscriptionId: id } }),
      db.subscription.delete({ where: { id } }),
    ]);
    return { ok: true, message: "削除しました" };
  } catch (error) {
    return fail(error);
  }
}
