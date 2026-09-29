import { auth, requireRole } from "@/server/auth";
import { listAdminUsers } from "@/server/queries/subscribers";
import { formatDateTime } from "@/lib/dates";
import { PageTitle } from "@/components/admin/page-title";
import { DataTable, type Column } from "@/components/admin/data-table";
import { CreateUserButton, UserRowActions } from "@/components/admin/user-admin";

export const metadata = { title: "ユーザー" };
export const dynamic = "force-dynamic";

type Row = Awaited<ReturnType<typeof listAdminUsers>>[number];

export default async function UsersPage() {
  await requireRole("ADMIN");
  const [session, rows] = await Promise.all([auth(), listAdminUsers()]);
  const myId = session?.user?.id;

  const columns: Column<Row>[] = [
    {
      key: "user",
      header: "ユーザー",
      cell: (r) => (
        <div>
          <p className="font-medium">
            {r.name ?? "（名前なし）"}
            {r.id === myId && <span className="text-muted-foreground ml-2 text-xs">あなた</span>}
          </p>
          <p className="text-muted-foreground text-xs">{r.email}</p>
        </div>
      ),
    },
    {
      key: "role",
      header: "権限",
      cell: (r) => (
        <span
          className={
            r.role === "ADMIN"
              ? "bg-brand-soft text-brand-dark rounded-full px-2 py-0.5 text-xs font-semibold"
              : "rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-700"
          }
        >
          {r.role === "ADMIN" ? "管理者" : "編集者"}
        </span>
      ),
    },
    {
      key: "login",
      header: "最終ログイン",
      cell: (r) => (
        <span className="text-muted-foreground text-xs whitespace-nowrap">
          {r.lastLoginAt ? formatDateTime(r.lastLoginAt) : "―"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "text-right",
      cell: (r) => (
        <UserRowActions id={r.id} email={r.email} role={r.role} isSelf={r.id === myId} />
      ),
    },
  ];

  return (
    <div>
      <PageTitle
        title="ユーザー"
        description="管理画面にログインできるスタッフ"
        actions={<CreateUserButton />}
      />
      <DataTable rows={rows} columns={columns} empty="ユーザーがいません" />
    </div>
  );
}
