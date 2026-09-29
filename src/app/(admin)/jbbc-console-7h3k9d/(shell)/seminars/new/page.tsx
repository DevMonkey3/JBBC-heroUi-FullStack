import Link from "next/link";
import { adminUrl } from "@/config/admin";
import { PageTitle } from "@/components/admin/page-title";
import { SeminarForm } from "@/components/admin/seminar-form";

export const metadata = { title: "セミナー作成" };

export default function NewSeminarPage() {
  return (
    <div>
      <PageTitle
        title="セミナーを作成"
        description="下書きとして保存し、確認してから公開できます"
        actions={
          <Link
            href={adminUrl("seminars")}
            className="text-muted-foreground text-sm hover:underline"
          >
            一覧に戻る
          </Link>
        }
      />
      <SeminarForm />
    </div>
  );
}
