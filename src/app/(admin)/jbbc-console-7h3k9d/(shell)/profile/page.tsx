import { requireAdmin } from "@/server/auth";
import { getAdminUser } from "@/server/queries/subscribers";
import { formatDateTime } from "@/lib/dates";
import { PageTitle } from "@/components/admin/page-title";
import { ProfileForm, PasswordForm } from "@/components/admin/profile-forms";

export const metadata = { title: "プロフィール" };
export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const me = await requireAdmin();
  const user = await getAdminUser(me.id);

  return (
    <div>
      <PageTitle
        title="プロフィール"
        description={
          <span>
            {user?.email} ・ {user?.role === "ADMIN" ? "管理者" : "編集者"}
            {user?.lastLoginAt && <> ・ 最終ログイン {formatDateTime(user.lastLoginAt)}</>}
          </span>
        }
      />
      <div className="grid max-w-3xl gap-6 md:grid-cols-2">
        <ProfileForm name={user?.name ?? ""} />
        <PasswordForm />
      </div>
    </div>
  );
}
