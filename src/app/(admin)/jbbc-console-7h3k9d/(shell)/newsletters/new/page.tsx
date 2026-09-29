import { NoticeNewPage } from "@/components/admin/notice-admin";

export const metadata = { title: "ニュースレター作成" };

export default function Page() {
  return <NoticeNewPage kind="newsletter" />;
}
