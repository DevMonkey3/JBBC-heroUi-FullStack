import { NoticeListPage } from "@/components/admin/notice-admin";

export const metadata = { title: "ニュースレター" };
export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  return <NoticeListPage kind="newsletter" searchParams={await searchParams} />;
}
