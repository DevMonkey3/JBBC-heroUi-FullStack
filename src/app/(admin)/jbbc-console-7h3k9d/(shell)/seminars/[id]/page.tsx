import Link from "next/link";
import { notFound } from "next/navigation";
import { auth, isAdmin } from "@/server/auth";
import { getSeminarAdmin, countActiveSubscribers } from "@/server/queries/seminars";
import { adminUrl } from "@/config/admin";
import { PageTitle } from "@/components/admin/page-title";
import { StatusBadge } from "@/components/admin/status-badge";
import { SeminarForm } from "@/components/admin/seminar-form";
import { SeminarActions } from "@/components/admin/seminar-actions";

export const metadata = { title: "セミナー編集" };
export const dynamic = "force-dynamic";

export default async function EditSeminarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [session, seminar, subscriberCount] = await Promise.all([
    auth(),
    getSeminarAdmin(id).catch(() => null),
    countActiveSubscribers(),
  ]);
  if (!seminar) notFound();

  return (
    <div>
      <PageTitle
        title={seminar.title}
        description={
          <span className="flex items-center gap-2">
            <StatusBadge status={seminar.status} />
            {seminar.updatedBy && <span>最終更新: {seminar.updatedBy}</span>}
          </span>
        }
        actions={
          <Link
            href={adminUrl("seminars")}
            className="text-muted-foreground text-sm hover:underline"
          >
            一覧に戻る
          </Link>
        }
      />

      <div className="mb-6 rounded-lg border bg-white p-3">
        <SeminarActions
          id={seminar.id}
          slug={seminar.slug}
          status={seminar.status}
          isAdmin={isAdmin(session?.user?.role)}
          registrationCount={seminar._count.registrations}
          subscriberCount={subscriberCount}
          sentAt={seminar.sentAt?.toISOString() ?? null}
          sentCount={seminar.sentCount}
        />
      </div>

      <SeminarForm seminar={seminar} />
    </div>
  );
}
