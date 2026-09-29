import { NoticeListPage } from "@/components/admin/notice-admin";

export const metadata = { title: "お知らせ" };
export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  return <NoticeListPage kind="announcement" searchParams={await searchParams} />;
}
