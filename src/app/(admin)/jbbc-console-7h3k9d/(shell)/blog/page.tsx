import Link from "next/link";
import { Plus, Heart } from "lucide-react";
import { listPostsAdmin } from "@/server/queries/blog";
import { adminUrl } from "@/config/admin";
import { formatDate } from "@/lib/dates";
import { PageTitle } from "@/components/admin/page-title";
import { DataTable, type Column } from "@/components/admin/data-table";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";

export const metadata = { title: "ブログ" };
export const dynamic = "force-dynamic";

type Row = Awaited<ReturnType<typeof listPostsAdmin>>["rows"][number];

export default async function BlogAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const { rows, total, page, pageSize, q } = await listPostsAdmin(await searchParams);
  const base = adminUrl("blog");

  const columns: Column<Row>[] = [
    {
      key: "cover",
      header: "",
      className: "w-20",
      cell: (r) =>
        r.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={r.coverImage} alt="" className="aspect-[16/10] w-16 rounded object-cover" />
        ) : (
          <div className="bg-muted aspect-[16/10] w-16 rounded" />
        ),
    },
    {
      key: "title",
      header: "タイトル",
      cell: (r) => (
        <div className="min-w-[18rem]">
          <Link href={`${base}/${r.id}`} className="font-medium hover:underline">
            {r.title}
          </Link>
          <p className="text-muted-foreground text-xs">
            {r.category ?? "カテゴリ未設定"} ・ /blog/{r.slug}
          </p>
        </div>
      ),
    },
    { key: "status", header: "状態", cell: (r) => <StatusBadge status={r.status} /> },
    {
      key: "date",
      header: "公開日",
      cell: (r) => <span className="whitespace-nowrap">{formatDate(r.publishedAt)}</span>,
    },
    {
      key: "likes",
      header: "いいね",
      className: "text-right",
      cell: (r) => (
        <span className="inline-flex items-center gap-1 tabular-nums">
          <Heart className="size-3.5 text-red-500" aria-hidden />
          {r.likeCount}
        </span>
      ),
    },
    {
      key: "sent",
      header: "メール",
      cell: (r) => (
        <span className="text-muted-foreground text-xs">
          {r.sentAt ? `${r.sentCount ?? 0}件送信済` : "未送信"}
        </span>
      ),
    },
  ];

  return (
    <div>
      <PageTitle
        title="ブログ"
        description={`${total}件`}
        actions={
          <Button nativeButton={false} render={<Link href={`${base}/new`} />}>
            <Plus className="size-4" aria-hidden />
            新規作成
          </Button>
        }
      />
      <DataTable
        rows={rows}
        columns={columns}
        empty="記事はまだありません"
        search={{ placeholder: "タイトルで検索", value: q, basePath: base }}
        pagination={{ page, pageSize, total, basePath: base, q }}
      />
    </div>
  );
}
