import Link from "next/link";
import { notFound } from "next/navigation";
import { auth, isAdmin } from "@/server/auth";
import { getPostAdmin } from "@/server/queries/blog";
import { countActiveSubscribers } from "@/server/queries/seminars";
import {
  deletePost,
  sendPostTest,
  sendPostToSubscribers,
  setPostStatus,
} from "@/server/actions/posts";
import { adminUrl } from "@/config/admin";
import { PageTitle } from "@/components/admin/page-title";
import { StatusBadge } from "@/components/admin/status-badge";
import { PostForm } from "@/components/admin/post-form";
import { ContentActions } from "@/components/admin/content-actions";

export const metadata = { title: "記事編集" };
export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [session, post, subscriberCount] = await Promise.all([
    auth(),
    getPostAdmin(id).catch(() => null),
    countActiveSubscribers(),
  ]);
  if (!post) notFound();

  return (
    <div>
      <PageTitle
        title={post.title}
        description={
          <span className="flex items-center gap-2">
            <StatusBadge status={post.status} />
            {post.updatedBy && <span>最終更新: {post.updatedBy}</span>}
          </span>
        }
        actions={
          <Link href={adminUrl("blog")} className="text-muted-foreground text-sm hover:underline">
            一覧に戻る
          </Link>
        }
      />

      <div className="mb-6 rounded-lg border bg-white p-3">
        <ContentActions
          status={post.status}
          publicUrl={`/blog/${encodeURIComponent(post.slug)}`}
          isAdmin={isAdmin(session?.user?.role)}
          subscriberCount={subscriberCount}
          sentAt={post.sentAt?.toISOString() ?? null}
          sentCount={post.sentCount}
          adminEmail={session?.user?.email ?? undefined}
          listUrl={adminUrl("blog")}
          deleteWarning="記事といいねのデータが削除されます。元に戻せません。"
          actions={{
            setStatus: setPostStatus.bind(null, post.id),
            remove: deletePost.bind(null, post.id),
            send: sendPostToSubscribers.bind(null, post.id),
            test: sendPostTest.bind(null, post.id),
          }}
        />
      </div>

      <PostForm post={post} />
    </div>
  );
}
