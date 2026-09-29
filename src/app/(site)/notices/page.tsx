import Link from "next/link";
import { Mail, CalendarDays, Megaphone } from "lucide-react";
import { pageMetadata } from "@/config/seo";
import { getNotices, type NoticeType } from "@/server/queries/notices";
import { formatDate } from "@/lib/dates";
import { Container } from "@/components/site/container";
import { PageHeader } from "@/components/site/page-header";
import { BgTitle } from "@/components/site/bg-title";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata("notices");

const types: { key: NoticeType; label: string; icon: typeof Mail; color: string }[] = [
  {
    key: "announcement",
    label: "お知らせ",
    icon: Megaphone,
    color: "bg-orange-100 text-orange-800",
  },
  { key: "seminar", label: "セミナー", icon: CalendarDays, color: "bg-green-100 text-green-800" },
  { key: "newsletter", label: "ニュースレター", icon: Mail, color: "bg-blue-100 text-blue-800" },
];

const hrefFor = (n: { type: NoticeType; slug: string }) =>
  n.type === "seminar"
    ? `/seminar/${encodeURIComponent(n.slug)}`
    : `/notices/${encodeURIComponent(n.slug)}`;

export default async function NoticesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const active = types.find((t) => t.key === type)?.key ?? null;
  const all = await getNotices();
  const notices = active ? all.filter((n) => n.type === active) : all;

  return (
    <Container className="pb-12 md:pb-16">
      <PageHeader pill="news" title="お知らせ・ニュース" crumbs={[{ label: "お知らせ" }]} />
      <BgTitle word="News" title="お知らせ・ニュース" />
      <p className="text-muted-foreground mb-6 text-center">
        JBBCの最新情報、セミナー、ニュースレターをご覧ください
      </p>

      <nav aria-label="種類" className="mb-8 flex flex-wrap justify-center gap-2">
        {[{ key: null, label: "すべて" }, ...types].map((t) => {
          const on = t.key === active;
          return (
            <Link
              key={t.key ?? "all"}
              href={t.key ? `/notices?type=${t.key}` : "/notices"}
              aria-current={on ? "page" : undefined}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                on
                  ? "border-brand bg-brand text-white"
                  : "border-brand text-brand hover:bg-brand-soft bg-white",
              )}
            >
              {t.label}
            </Link>
          );
        })}
      </nav>

      {notices.length === 0 ? (
        <p className="text-muted-foreground py-20 text-center">該当するお知らせはありません</p>
      ) : (
        <ul className="mx-auto max-w-4xl divide-y rounded-xl border bg-white">
          {notices.map((n) => {
            const t = types.find((x) => x.key === n.type)!;
            const Icon = t.icon;
            return (
              <li key={`${n.type}-${n.id}`}>
                <Link
                  href={hrefFor(n)}
                  className="hover:bg-muted/50 flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-start sm:gap-5"
                >
                  <div className="flex shrink-0 items-center gap-3 sm:w-52">
                    <time
                      dateTime={n.publishedAt}
                      className="text-muted-foreground text-sm tabular-nums"
                    >
                      {formatDate(n.publishedAt, { month: "2-digit", day: "2-digit" })}
                    </time>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
                        t.color,
                      )}
                    >
                      <Icon className="size-3" aria-hidden />
                      {t.label}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold">{n.title}</p>
                    {n.excerpt && (
                      <p className="text-muted-foreground mt-0.5 line-clamp-2 text-sm">
                        {n.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </Container>
  );
}
