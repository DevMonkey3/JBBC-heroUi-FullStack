"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/server/db";
import { requireAdmin, requireRole, UnauthorizedError, type AdminRole } from "@/server/auth";
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

const password = z
  .string()
  .min(12, { message: "パスワードは12文字以上にしてください" })
  .max(200)
  .refine((p) => /[a-zA-Z]/.test(p) && /\d/.test(p), {
    message: "パスワードには英字と数字の両方を含めてください",
  });

const createSchema = z.object({
  email: z.email({ message: "メールアドレスの形式が正しくありません" }),
  name: z.string().trim().max(100).optional().or(z.literal("")),
  role: z.enum(["ADMIN", "EDITOR"]),
  password,
});

export type UserFormState = { ok: boolean; error?: string; fieldErrors?: Record<string, string> };

function fieldErrors(issues: z.ZodError["issues"]) {
  const out: Record<string, string> = {};
  for (const i of issues) out[String(i.path[0] ?? "form")] ??= i.message;
  return out;
}

/** ADMIN only: add a colleague. */
export async function createUser(_prev: UserFormState, formData: FormData): Promise<UserFormState> {
  try {
    await requireRole("ADMIN");
    const parsed = createSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!parsed.success)
      return {
        ok: false,
        error: "入力内容を確認してください",
        fieldErrors: fieldErrors(parsed.error.issues),
      };
    const v = parsed.data;
    const email = v.email.toLowerCase();
    if (await db.adminUser.findUnique({ where: { email } }))
      return {
        ok: false,
        error: "このメールアドレスは既に登録されています",
        fieldErrors: { email: "既に登録されています" },
      };
    await db.adminUser.create({
      data: {
        email,
        name: v.name || null,
        role: v.role,
        passwordHash: await bcrypt.hash(v.password, 12),
      },
    });
    return { ok: true };
  } catch (error) {
    const r = fail(error);
    return { ok: false, error: r.ok ? undefined : r.error };
  }
}

export async function setUserRole(id: string, role: AdminRole): Promise<ActionResult> {
  try {
    const me = await requireRole("ADMIN");
    if (me.id === id) return { ok: false, error: "自分自身の権限は変更できません" };
    await db.adminUser.update({ where: { id }, data: { role } });
    return { ok: true, message: role === "ADMIN" ? "管理者にしました" : "編集者にしました" };
  } catch (error) {
    return fail(error);
  }
}

/** ADMIN only: set a new password for someone who forgot theirs. */
export async function resetUserPassword(id: string, newPassword: string): Promise<ActionResult> {
  try {
    await requireRole("ADMIN");
    const parsed = password.safeParse(newPassword);
    if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "無効です" };
    await db.adminUser.update({
      where: { id },
      data: { passwordHash: await bcrypt.hash(parsed.data, 12) },
    });
    return { ok: true, message: "パスワードを変更しました" };
  } catch (error) {
    return fail(error);
  }
}

export async function deleteUser(id: string): Promise<ActionResult> {
  try {
    const me = await requireRole("ADMIN");
    if (me.id === id) return { ok: false, error: "自分自身は削除できません" };
    const admins = await db.adminUser.count({ where: { role: "ADMIN" } });
    const target = await db.adminUser.findUnique({ where: { id }, select: { role: true } });
    if (!target) return { ok: false, error: "ユーザーが見つかりません" };
    if (target.role === "ADMIN" && admins <= 1)
      return { ok: false, error: "最後の管理者は削除できません" };
    await db.adminUser.delete({ where: { id } });
    return { ok: true, message: "削除しました" };
  } catch (error) {
    return fail(error);
  }
}

// ---------------------------------------------------------------- own profile

const profileSchema = z.object({
  name: z.string().trim().min(1, { message: "名前を入力してください" }).max(100),
});

export async function updateProfile(
  _prev: UserFormState,
  formData: FormData,
): Promise<UserFormState> {
  try {
    const me = await requireAdmin();
    const parsed = profileSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!parsed.success)
      return {
        ok: false,
        error: "入力内容を確認してください",
        fieldErrors: fieldErrors(parsed.error.issues),
      };
    await db.adminUser.update({ where: { id: me.id }, data: { name: parsed.data.name } });
    return { ok: true };
  } catch (error) {
    const r = fail(error);
    return { ok: false, error: r.ok ? undefined : r.error };
  }
}

const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, { message: "現在のパスワードを入力してください" }),
    newPassword: password,
    confirmPassword: z.string(),
  })
  .refine((v) => v.newPassword === v.confirmPassword, {
    message: "新しいパスワードが一致しません",
    path: ["confirmPassword"],
  });

export async function changeOwnPassword(
  _prev: UserFormState,
  formData: FormData,
): Promise<UserFormState> {
  try {
    const me = await requireAdmin();
    const parsed = passwordChangeSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!parsed.success)
      return {
        ok: false,
        error: "入力内容を確認してください",
        fieldErrors: fieldErrors(parsed.error.issues),
      };
    const user = await db.adminUser.findUnique({ where: { id: me.id } });
    if (!user || !(await bcrypt.compare(parsed.data.currentPassword, user.passwordHash)))
      return {
        ok: false,
        error: "現在のパスワードが正しくありません",
        fieldErrors: { currentPassword: "正しくありません" },
      };
    await db.adminUser.update({
      where: { id: me.id },
      data: { passwordHash: await bcrypt.hash(parsed.data.newPassword, 12) },
    });
    return { ok: true };
  } catch (error) {
    const r = fail(error);
    return { ok: false, error: r.ok ? undefined : r.error };
  }
}
