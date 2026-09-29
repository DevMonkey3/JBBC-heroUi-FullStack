import { notFound } from "next/navigation";
import { requireAdmin } from "@/server/auth";
import { getNoticeAdmin, type NoticeKind } from "@/server/queries/notices";
import { NoticeArticle } from "@/components/site/notices/notice-article";

/** Renders an announcement or newsletter, draft or not. Admins only. */
export const metadata = { title: "プレビュー", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function NoticePreviewPage({
  params,
}: {
  params: Promise<{ kind: string; id: string }>;
}) {
  await requireAdmin().catch(() => notFound());
  const { kind, id } = await params;
  if (kind !== "announcement" && kind !== "newsletter") notFound();
  const row = await getNoticeAdmin(kind as NoticeKind, id).catch(() => null);
  if (!row) notFound();
  return (
    <NoticeArticle
      preview
      notice={{
        type: kind as NoticeKind,
        id: row.id,
        title: row.title,
        slug: row.slug,
        excerpt: row.excerpt,
        body: row.body,
        publishedAt: row.publishedAt.toISOString(),
      }}
    />
  );
}
