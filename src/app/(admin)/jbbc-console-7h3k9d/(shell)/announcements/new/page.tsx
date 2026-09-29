import { NoticeNewPage } from "@/components/admin/notice-admin";

export const metadata = { title: "お知らせ作成" };

export default function Page() {
  return <NoticeNewPage kind="announcement" />;
}
