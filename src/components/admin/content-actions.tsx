"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, Send, Trash2, Eye, EyeOff } from "lucide-react";
import { ConfirmButton, type ActionResult } from "@/components/admin/confirm-button";
import { TestSendButton } from "@/components/admin/test-send";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/dates";

/**
 * Publish, unpublish, send, test-send and delete for any content type.
 * The server actions are passed in so this stays generic.
 */
export function ContentActions({
  status,
  publicUrl,
  previewUrl,
  isAdmin,
  subscriberCount,
  sentAt,
  sentCount,
  adminEmail,
  listUrl,
  actions,
  deleteWarning,
}: {
  status: "DRAFT" | "PUBLISHED";
  publicUrl: string;
  /** Admin-only page that renders the item as it will look, drafts included. */
  previewUrl?: string;
  isAdmin: boolean;
  subscriberCount: number;
  sentAt: string | null;
  sentCount: number | null;
  adminEmail?: string;
  listUrl: string;
  actions: {
    setStatus: (status: "DRAFT" | "PUBLISHED") => Promise<ActionResult>;
    remove: () => Promise<ActionResult>;
    send: () => Promise<ActionResult>;
    test: (to: string) => Promise<ActionResult>;
  };
  deleteWarning?: string;
}) {
  const router = useRouter();
  const wrap = (fn: () => Promise<ActionResult>) => async () => {
    const r = await fn();
    if (r.ok) router.refresh();
    return r;
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {status === "PUBLISHED" ? (
        <Button
          variant="outline"
          size="sm"
          nativeButton={false}
          render={<Link href={publicUrl} target="_blank" />}
        >
          <ExternalLink className="size-4" aria-hidden />
          公開ページ
        </Button>
      ) : (
        previewUrl && (
          <Button
            variant="outline"
            size="sm"
            nativeButton={false}
            render={<Link href={previewUrl} target="_blank" />}
          >
            <ExternalLink className="size-4" aria-hidden />
            プレビュー
          </Button>
        )
      )}

      {status === "PUBLISHED" ? (
        <ConfirmButton
          variant="outline"
          action={wrap(() => actions.setStatus("DRAFT"))}
          title="下書きに戻しますか？"
          description="公開ページからすぐに消えます。"
          confirmLabel="下書きに戻す"
        >
          <EyeOff className="size-4" aria-hidden />
          非公開にする
        </ConfirmButton>
      ) : (
        <ConfirmButton
          variant="default"
          action={wrap(() => actions.setStatus("PUBLISHED"))}
          title="公開しますか？"
          description="公開ページに表示されます。購読者へのメールは送られません。"
          confirmLabel="公開する"
        >
          <Eye className="size-4" aria-hidden />
          公開する
        </ConfirmButton>
      )}

      <TestSendButton action={actions.test} defaultEmail={adminEmail} />

      {isAdmin && status === "PUBLISHED" && (
        <ConfirmButton
          variant="default"
          action={wrap(actions.send)}
          title={`${subscriberCount}名の購読者にメールを送信しますか？`}
          description={
            sentAt
              ? `${formatDateTime(sentAt)} に ${sentCount ?? 0}件送信済みです。もう一度送ると同じ人に再送されます。`
              : "送信は取り消せません。テスト送信で内容を確認してから送ってください。"
          }
          confirmLabel="送信する"
        >
          <Send className="size-4" aria-hidden />
          {sentAt ? "購読者に再送信" : "購読者に送信"}
        </ConfirmButton>
      )}

      {isAdmin && (
        <ConfirmButton
          variant="destructive"
          action={async () => {
            const r = await actions.remove();
            if (r.ok) router.push(listUrl);
            return r;
          }}
          title="削除しますか？"
          description={deleteWarning ?? "元に戻せません。"}
          confirmLabel="削除する"
        >
          <Trash2 className="size-4" aria-hidden />
          削除
        </ConfirmButton>
      )}
    </div>
  );
}
