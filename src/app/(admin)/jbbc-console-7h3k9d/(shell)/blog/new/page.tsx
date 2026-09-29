import Link from "next/link";
import { adminUrl } from "@/config/admin";
import { PageTitle } from "@/components/admin/page-title";
import { PostForm } from "@/components/admin/post-form";

export const metadata = { title: "記事作成" };

export default function NewPostPage() {
  return (
    <div>
      <PageTitle
        title="記事を作成"
        description="下書きとして保存し、公開ページで確認してから公開できます"
        actions={
          <Link href={adminUrl("blog")} className="text-muted-foreground text-sm hover:underline">
            一覧に戻る
          </Link>
        }
      />
      <PostForm />
    </div>
  );
}
