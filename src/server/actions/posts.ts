"use server";

import { db } from "@/server/db";
import { requireAdmin, requireRole, UnauthorizedError } from "@/server/auth";
import { invalidate, tags } from "@/server/cache";
import { postSchema } from "@/lib/validation";
import { sanitizeContent, textExcerpt } from "@/server/sanitize";
import { parsePublishedAt } from "@/server/actions/published-at";
import { sendBlogAnnouncement } from "@/server/email/content";
import { broadcast, broadcastMessage } from "@/server/broadcast";
import { isProduction } from "@/config/env";
import type { ActionResult } from "@/components/admin/confirm-button";

export type SaveState = {
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

export async function savePost(
  id: string | null,
  _prev: SaveState,
  formData: FormData,
): Promise<SaveState> {
  try {
    const user = await requireAdmin();
    const parsed = postSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const i of parsed.error.issues) fieldErrors[String(i.path[0] ?? "form")] ??= i.message;
      return { ok: false, error: "入力内容を確認してください", fieldErrors };
    }
    const v = parsed.data;
    const publishedAt = parsePublishedAt(v.publishedAt);
    if (publishedAt === false)
      return {
        ok: false,
        error: "公開日時が不正です",
        fieldErrors: { publishedAt: "日時を確認してください" },
      };

    const duplicate = await db.blogPost.findFirst({
      where: { slug: v.slug, ...(id ? { NOT: { id } } : {}) },
      select: { id: true },
    });
    if (duplicate)
      return {
        ok: false,
        error: "このスラッグは既に使われています",
        fieldErrors: { slug: "既に使われています" },
      };

    const content = sanitizeContent(v.content);
    const data = {
      title: v.title,
      slug: v.slug,
      category: v.category,
      excerpt: v.excerpt || textExcerpt(content),
      coverImage: v.coverImage || null,
      content,
      status: v.status,
      updatedBy: user.email ?? null,
      ...(publishedAt ? { publishedAt } : {}),
    };

    const row = id
      ? await db.blogPost.update({ where: { id }, data })
      : await db.blogPost.create({ data: { ...data, createdBy: user.email ?? null } });

    invalidate(tags.blog);
    return { ok: true, id: row.id };
  } catch (error) {
    const r = fail(error);
    return { ok: false, error: r.ok ? undefined : r.error };
  }
}

export async function setPostStatus(
  id: string,
  status: "DRAFT" | "PUBLISHED",
): Promise<ActionResult> {
  try {
    const user = await requireAdmin();
    await db.blogPost.update({ where: { id }, data: { status, updatedBy: user.email ?? null } });
    invalidate(tags.blog);
    return { ok: true, message: status === "PUBLISHED" ? "公開しました" : "下書きに戻しました" };
  } catch (error) {
    return fail(error);
  }
}

export async function deletePost(id: string): Promise<ActionResult> {
  try {
    await requireRole("ADMIN");
    await db.$transaction([
      db.like.deleteMany({ where: { postId: id } }),
      db.notification.deleteMany({ where: { type: "blog", refId: id } }),
      db.blogPost.delete({ where: { id } }),
    ]);
    invalidate(tags.blog);
    return { ok: true, message: "削除しました" };
  } catch (error) {
    return fail(error);
  }
}

export async function sendPostToSubscribers(id: string): Promise<ActionResult> {
  try {
    await requireRole("ADMIN");
    const post = await db.blogPost.findUnique({ where: { id } });
    if (!post) return { ok: false, error: "記事が見つかりません" };
    if (post.status === "DRAFT") return { ok: false, error: "公開してから送信してください" };
    const r = await broadcast("blog", post.id, (to) => sendBlogAnnouncement(post, to));
    if (r.sent === 0 && r.failed.length === 0) return { ok: false, error: "購読者がいません" };
    await db.blogPost.update({
      where: { id },
      data: { sentAt: new Date(), sentCount: (post.sentCount ?? 0) + r.sent },
    });
    return { ok: true, message: broadcastMessage(r) };
  } catch (error) {
    return fail(error);
  }
}

export async function sendPostTest(id: string, to: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    const address = to.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address))
      return { ok: false, error: "メールアドレスの形式が正しくありません" };
    const post = await db.blogPost.findUnique({ where: { id } });
    if (!post) return { ok: false, error: "記事が見つかりません" };
    const r = await sendBlogAnnouncement(post, address);
    return r.ok
      ? { ok: true, message: `${address} にテスト送信しました` }
      : { ok: false, error: `送信に失敗しました: ${r.error}` };
  } catch (error) {
    return fail(error);
  }
}
