import Link from "next/link";
import { notFound } from "next/navigation";
import { Plus } from "lucide-react";
import { auth, isAdmin } from "@/server/auth";
import { listNoticesAdmin, getNoticeAdmin, type NoticeKind } from "@/server/queries/notices";
import { countActiveSubscribers } from "@/server/queries/seminars";
import {
  deleteNotice,
  sendNoticeTest,
  sendNoticeToSubscribers,
  setNoticeStatus,
} from "@/server/actions/notices";
import { adminUrl } from "@/config/admin";
import { formatDate } from "@/lib/dates";
import { PageTitle } from "@/components/admin/page-title";
import { DataTable, type Column } from "@/components/admin/data-table";
import { StatusBadge } from "@/components/admin/status-badge";
import { NoticeForm } from "@/components/admin/notice-form";
import { ContentActions } from "@/components/admin/content-actions";
import { Button } from "@/components/ui/button";

export const noticeMeta = {
  announcement: { label: "お知らせ", section: "announcements" },
  newsletter: { label: "ニュースレター", section: "newsletters" },
} as const;

type Row = Awaited<ReturnType<typeof listNoticesAdmin>>["rows"][number];

/** Shared list page for announcements and newsletters. */
export async function NoticeListPage({
  kind,
  searchParams,
}: {
  kind: NoticeKind;
  searchParams: { page?: string; q?: string };
}) {
  const { label, section } = noticeMeta[kind];
  const { rows, total, page, pageSize, q } = await listNoticesAdmin(kind, searchParams);
  const base = adminUrl(section);

  const columns: Column<Row>[] = [
    {
      key: "title",
      header: "タイトル",
      cell: (r) => (
        <div className="min-w-[18rem]">
          <Link href={`${base}/${r.id}`} className="font-medium hover:underline">
            {r.title}
          </Link>
          <p className="text-muted-foreground line-clamp-1 text-xs">{r.excerpt}</p>
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
        title={label}
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
        empty={`${label}はまだありません`}
        search={{ placeholder: "タイトルで検索", value: q, basePath: base }}
        pagination={{ page, pageSize, total, basePath: base, q }}
      />
    </div>
  );
}

export function NoticeNewPage({ kind }: { kind: NoticeKind }) {
  const { label, section } = noticeMeta[kind];
  return (
    <div>
      <PageTitle
        title={`${label}を作成`}
        description="下書きとして保存し、確認してから公開できます"
        actions={
          <Link href={adminUrl(section)} className="text-muted-foreground text-sm hover:underline">
            一覧に戻る
          </Link>
        }
      />
      <NoticeForm kind={kind} />
    </div>
  );
}

export async function NoticeEditPage({ kind, id }: { kind: NoticeKind; id: string }) {
  const { section } = noticeMeta[kind];
  const [session, item, subscriberCount] = await Promise.all([
    auth(),
    getNoticeAdmin(kind, id).catch(() => null),
    countActiveSubscribers(),
  ]);
  if (!item) notFound();

  return (
    <div>
      <PageTitle
        title={item.title}
        description={
          <span className="flex items-center gap-2">
            <StatusBadge status={item.status} />
            {item.updatedBy && <span>最終更新: {item.updatedBy}</span>}
          </span>
        }
        actions={
          <Link href={adminUrl(section)} className="text-muted-foreground text-sm hover:underline">
            一覧に戻る
          </Link>
        }
      />
      <div className="mb-6 rounded-lg border bg-white p-3">
        <ContentActions
          status={item.status}
          publicUrl={`/notices/${encodeURIComponent(item.slug)}`}
          isAdmin={isAdmin(session?.user?.role)}
          subscriberCount={subscriberCount}
          sentAt={item.sentAt?.toISOString() ?? null}
          sentCount={item.sentCount}
          adminEmail={session?.user?.email ?? undefined}
          listUrl={adminUrl(section)}
          actions={{
            setStatus: setNoticeStatus.bind(null, kind, item.id),
            remove: deleteNotice.bind(null, kind, item.id),
            send: sendNoticeToSubscribers.bind(null, kind, item.id),
            test: sendNoticeTest.bind(null, kind, item.id),
          }}
        />
      </div>
      <NoticeForm kind={kind} notice={item} />
    </div>
  );
}
