import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getNoticeBySlug } from "@/server/queries/notices";
import { NoticeArticle } from "@/components/site/notices/notice-article";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 3600;

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

export default async function NoticeDetailPage({ params }: Props) {
  const { slug } = await params;
  const n = await getNoticeBySlug(decodeURIComponent(slug));
  if (!n) notFound();
  return <NoticeArticle notice={n} />;
}
