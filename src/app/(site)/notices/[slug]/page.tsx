import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getNoticeBySlug } from "@/server/queries/notices";
import { formatDate } from "@/lib/dates";
import { Container } from "@/components/site/container";
import { PageHeader } from "@/components/site/page-header";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 3600;

const labels = { announcement: "お知らせ", newsletter: "ニュースレター" } as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const n = await getNoticeBySlug(decodeURIComponent(slug));
  if (!n) return { title: "お知らせ" };
  const url = `${siteConfig.url}/notices/${encodeURIComponent(n.slug)}`;
  return {
    title: n.title,
    description: n.excerpt ?? undefined,
    alternates: { canonical: url },
    openGraph: {
      title: n.title,
      description: n.excerpt ?? undefined,
      url,
      type: "article",
      publishedTime: n.publishedAt,
    },
  };
}

/** Bodies written in the old admin are plain text; new ones are editor HTML. */
function isHtml(s: string) {
  return /<[a-z][^>]*>/i.test(s);
}

export default async function NoticeDetailPage({ params }: Props) {
  const { slug } = await params;
  const n = await getNoticeBySlug(decodeURIComponent(slug));
  if (!n) notFound();

  return (
    <Container className="pb-12 md:pb-16">
      <PageHeader
        pill="news"
        title={n.title}
        crumbs={[{ label: "お知らせ", href: "/notices" }, { label: n.title }]}
      />

      <div className="mx-auto max-w-3xl">
        <div className="text-muted-foreground mb-6 flex items-center gap-3 text-sm">
          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold",
              n.type === "announcement"
                ? "bg-orange-100 text-orange-800"
                : "bg-blue-100 text-blue-800",
            )}
          >
            {labels[n.type]}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-4" aria-hidden />
            <time dateTime={n.publishedAt}>{formatDate(n.publishedAt)}</time>
          </span>
        </div>

        {n.excerpt && n.excerpt !== n.body.slice(0, n.excerpt.length) && (
          <p className="border-brand bg-brand-soft/60 mb-6 rounded-r-lg border-l-4 px-5 py-4 text-lg leading-relaxed text-gray-700">
            {n.excerpt}
          </p>
        )}

        {isHtml(n.body) ? (
          <article
            className="prose prose-neutral prose-lg prose-a:text-brand prose-img:rounded-xl max-w-none"
            dangerouslySetInnerHTML={{ __html: n.body }}
          />
        ) : (
          <article className="text-lg leading-relaxed whitespace-pre-wrap text-gray-800">
            {n.body}
          </article>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/notices"
            className="border-brand text-brand hover:bg-brand-soft inline-flex items-center gap-2 rounded-full border-2 px-6 py-2.5 font-semibold"
          >
            <ArrowLeft className="size-4" aria-hidden />
            お知らせ一覧に戻る
          </Link>
        </div>
      </div>
    </Container>
  );
}
