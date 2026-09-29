import { NoticeEditPage } from "@/components/admin/notice-admin";

export const metadata = { title: "ニュースレター編集" };
export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <NoticeEditPage kind="newsletter" id={id} />;
}
