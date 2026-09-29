import Link from "next/link";
import { auth } from "@/server/auth";
import { adminUrl } from "@/config/admin";
import { getDashboardData } from "@/server/queries/admin";
import { formatDate } from "@/lib/dates";
import { PageTitle } from "@/components/admin/page-title";
import { StatCard } from "@/components/admin/stat-card";
import { StatusBadge } from "@/components/admin/status-badge";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [session, data] = await Promise.all([auth(), getDashboardData()]);
  const c = data.counts;

  return (
    <div>
      <PageTitle
        title="ダッシュボード"
        description={`ようこそ、${session?.user?.name ?? session?.user?.email} さん`}
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="ブログ記事"
          value={c.posts}
          hint={`下書き ${c.postsDraft}`}
          href={adminUrl("blog")}
          tone="brand"
        />
        <StatCard
          label="セミナー"
          value={c.seminars}
          hint={`開催予定 ${c.seminarsUpcoming}`}
          href={adminUrl("seminars")}
          tone="brand"
        />
        <StatCard
          label="お知らせ"
          value={c.announcements}
          href={adminUrl("announcements")}
          tone="brand"
        />
        <StatCard
          label="ニュースレター"
          value={c.newsletters}
          href={adminUrl("newsletters")}
          tone="brand"
        />
        <StatCard
          label="購読者"
          value={c.subscribersActive}
          hint={`登録合計 ${c.subscribersTotal}`}
          href={adminUrl("subscribers")}
          tone="accent"
        />
        <StatCard
          label="セミナー申込"
          value={c.registrations}
          href={adminUrl("seminars")}
          tone="accent"
        />
        <StatCard label="送信済みメール" value={c.emailsSent} />
        <StatCard label="管理ユーザー" value={c.admins} href={adminUrl("users")} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Panel title="最近の記事" href={adminUrl("blog")}>
          {data.recentPosts.length === 0 ? (
            <Empty />
          ) : (
            <ul className="divide-y">
              {data.recentPosts.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-3 py-2 text-sm">
                  <Link
                    href={`/admin/blog/${p.id}`}
                    className="min-w-0 flex-1 truncate hover:underline"
                  >
                    {p.title}
                  </Link>
                  <StatusBadge status={p.status} />
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title="最近のセミナー申込" href={adminUrl("seminars")}>
          {data.recentRegistrations.length === 0 ? (
            <Empty />
          ) : (
            <ul className="divide-y">
              {data.recentRegistrations.map((r) => (
                <li key={r.id} className="py-2 text-sm">
                  <p className="font-medium">{r.name}</p>
                  <p className="text-muted-foreground truncate text-xs">
                    {r.seminar.title} ・ {formatDate(r.createdAt)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title="最近の購読者" href={adminUrl("subscribers")}>
          {data.recentSubscribers.length === 0 ? (
            <Empty />
          ) : (
            <ul className="divide-y">
              {data.recentSubscribers.map((s) => (
                <li key={s.id} className="flex items-center justify-between gap-3 py-2 text-sm">
                  <span className="truncate">{s.email}</span>
                  <span className="text-muted-foreground shrink-0 text-xs">
                    {formatDate(s.createdAt)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </div>
  );
}

function Panel({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border bg-white p-4">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="font-semibold">{title}</h2>
        <Link href={href} className="text-brand text-xs hover:underline">
          すべて見る
        </Link>
      </div>
      {children}
    </section>
  );
}

function Empty() {
  return <p className="text-muted-foreground py-4 text-center text-sm">まだありません</p>;
}
