import Link from "next/link";
import { Download } from "lucide-react";
import { requireRole } from "@/server/auth";
import { listSubscribersAdmin } from "@/server/queries/subscribers";
import { adminUrl } from "@/config/admin";
import { formatDateTime } from "@/lib/dates";
import { cn } from "@/lib/utils";
import { PageTitle } from "@/components/admin/page-title";
import { DataTable, type Column } from "@/components/admin/data-table";
import { AddSubscriberButton, SubscriberRowActions } from "@/components/admin/subscriber-actions";
import { Button } from "@/components/ui/button";

export const metadata = { title: "購読者" };
export const dynamic = "force-dynamic";

type Row = Awaited<ReturnType<typeof listSubscribersAdmin>>["rows"][number];

export default async function SubscribersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; filter?: string }>;
}) {
  await requireRole("ADMIN");
  const params = await searchParams;
  const { rows, total, page, pageSize, q, filter, active, unsubscribed } =
    await listSubscribersAdmin(params);
  const base = adminUrl("subscribers");
  const listPath = filter === "unsubscribed" ? `${base}?filter=unsubscribed` : base;

  const columns: Column<Row>[] = [
    {
      key: "email",
      header: "メールアドレス",
      cell: (r) => <span className="font-medium">{r.email}</span>,
    },
    {
      key: "since",
      header: "登録日",
      cell: (r) => <span className="whitespace-nowrap">{formatDateTime(r.createdAt)}</span>,
    },
    {
      key: "state",
      header: "状態",
      cell: (r) =>
        r.unsubscribedAt ? (
          <span className="text-muted-foreground text-xs">
            停止 {formatDateTime(r.unsubscribedAt)}
          </span>
        ) : (
          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800">
            配信中
          </span>
        ),
    },
    {
      key: "actions",
      header: "",
      className: "text-right",
      cell: (r) => <SubscriberRowActions id={r.id} active={!r.unsubscribedAt} />,
    },
  ];

  return (
    <div>
      <PageTitle
        title="購読者"
        description={`配信中 ${active}名 ・ 停止 ${unsubscribed}名`}
        actions={
          <>
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={<a href={`${base}/export`} />}
            >
              <Download className="size-4" aria-hidden />
              CSV
            </Button>
            <AddSubscriberButton />
          </>
        }
      />
      <div className="mb-3 flex gap-2 text-sm">
        {[
          { key: "active", label: `配信中 (${active})`, href: base },
          {
            key: "unsubscribed",
            label: `停止 (${unsubscribed})`,
            href: `${base}?filter=unsubscribed`,
          },
        ].map((t) => (
          <Link
            key={t.key}
            href={t.href}
            className={cn(
              "rounded-full border px-3 py-1",
              filter === t.key ? "bg-brand border-brand text-white" : "bg-white hover:bg-gray-50",
            )}
          >
            {t.label}
          </Link>
        ))}
      </div>
      <DataTable
        rows={rows}
        columns={columns}
        empty="購読者はいません"
        search={{ placeholder: "メールアドレスで検索", value: q, basePath: listPath }}
        pagination={{ page, pageSize, total, basePath: listPath, q }}
      />
    </div>
  );
}
