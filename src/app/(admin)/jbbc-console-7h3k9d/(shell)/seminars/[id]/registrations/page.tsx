import Link from "next/link";
import { notFound } from "next/navigation";
import { Download } from "lucide-react";
import { getSeminarAdmin, listRegistrations } from "@/server/queries/seminars";
import { adminUrl } from "@/config/admin";
import { formatDateTime } from "@/lib/dates";
import { prefectureName } from "@/lib/prefectures";
import { PageTitle } from "@/components/admin/page-title";
import { DataTable, type Column } from "@/components/admin/data-table";
import { StatusBadge } from "@/components/admin/status-badge";
import { RegistrationStatusButtons } from "@/components/admin/registration-status";
import { Button } from "@/components/ui/button";

export const metadata = { title: "申込一覧" };
export const dynamic = "force-dynamic";

type Row = Awaited<ReturnType<typeof listRegistrations>>[number];

export default async function RegistrationsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const seminar = await getSeminarAdmin(id).catch(() => null);
  if (!seminar) notFound();
  const rows = await listRegistrations(id);

  const columns: Column<Row>[] = [
    {
      key: "name",
      header: "お名前",
      cell: (r) => (
        <div>
          <p className="font-medium">{r.name}</p>
          {r.companyName && <p className="text-muted-foreground text-xs">{r.companyName}</p>}
        </div>
      ),
    },
    {
      key: "contact",
      header: "連絡先",
      cell: (r) => (
        <div className="text-sm">
          <a href={`mailto:${r.email}`} className="hover:underline">
            {r.email}
          </a>
          <p className="text-muted-foreground text-xs">{r.phone}</p>
        </div>
      ),
    },
    { key: "pref", header: "都道府県", cell: (r) => prefectureName(r.prefecture) },
    {
      key: "at",
      header: "申込日時",
      cell: (r) => <span className="whitespace-nowrap">{formatDateTime(r.createdAt)}</span>,
    },
    { key: "status", header: "状態", cell: (r) => <StatusBadge status={r.status} /> },
    {
      key: "actions",
      header: "",
      cell: (r) => <RegistrationStatusButtons id={r.id} status={r.status} />,
    },
  ];

  return (
    <div>
      <PageTitle
        title={`申込一覧: ${seminar.title}`}
        description={`${rows.length}件 ・ ${formatDateTime(seminar.startsAt)} ・ ${seminar.location}`}
        actions={
          <>
            <Link
              href={adminUrl(`seminars/${id}`)}
              className="text-muted-foreground text-sm hover:underline"
            >
              セミナーに戻る
            </Link>
            <Button
              variant="outline"
              nativeButton={false}
              render={<a href={adminUrl(`seminars/${id}/registrations/export`)} />}
            >
              <Download className="size-4" aria-hidden />
              CSVダウンロード
            </Button>
          </>
        }
      />
      <DataTable rows={rows} columns={columns} empty="まだ申込はありません" />
    </div>
  );
}
