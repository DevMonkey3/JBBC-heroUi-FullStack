import Link from "next/link";
import { Plus } from "lucide-react";
import { listSeminarsAdmin } from "@/server/queries/seminars";
import { adminUrl } from "@/config/admin";
import { formatDateTime, hasEnded } from "@/lib/dates";
import { PageTitle } from "@/components/admin/page-title";
import { DataTable, type Column } from "@/components/admin/data-table";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";

export const metadata = { title: "セミナー" };
export const dynamic = "force-dynamic";

type Row = Awaited<ReturnType<typeof listSeminarsAdmin>>["rows"][number];

export default async function SeminarsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const params = await searchParams;
  const { rows, total, page, pageSize, q } = await listSeminarsAdmin(params);
  const base = adminUrl("seminars");

  const columns: Column<Row>[] = [
    {
      key: "title",
      header: "タイトル",
      cell: (r) => (
        <div className="min-w-[16rem]">
          <Link href={`${base}/${r.id}`} className="font-medium hover:underline">
            {r.title}
          </Link>
          <p className="text-muted-foreground text-xs">{r.location}</p>
        </div>
      ),
    },
    {
      key: "when",
      header: "開催日時",
      cell: (r) => (
        <span className="whitespace-nowrap">
          {formatDateTime(r.startsAt)}
          {hasEnded(r.endsAt) && (
            <span className="ml-2 rounded bg-gray-200 px-1.5 py-0.5 text-[10px] font-semibold text-gray-700">
              終了
            </span>
          )}
        </span>
      ),
    },
    { key: "status", header: "状態", cell: (r) => <StatusBadge status={r.status} /> },
    {
      key: "regs",
      header: "申込",
      className: "text-right",
      cell: (r) => (
        <Link href={`${base}/${r.id}/registrations`} className="tabular-nums hover:underline">
          {r._count.registrations}
        </Link>
      ),
    },
    {
      key: "sent",
      header: "メール",
      cell: (r) =>
        r.sentAt ? (
          <span className="text-muted-foreground text-xs">{r.sentCount ?? 0}件送信済</span>
        ) : (
          <span className="text-muted-foreground text-xs">未送信</span>
        ),
    },
  ];

  return (
    <div>
      <PageTitle
        title="セミナー"
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
        empty="セミナーはまだありません。「新規作成」から追加してください。"
        search={{ placeholder: "タイトル・場所で検索", value: q, basePath: base }}
        pagination={{ page, pageSize, total, basePath: base, q }}
      />
    </div>
  );
}
