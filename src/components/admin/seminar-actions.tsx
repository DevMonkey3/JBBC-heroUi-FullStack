"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ExternalLink, Send, Trash2, Eye, EyeOff, Users } from "lucide-react";
import { ConfirmButton } from "@/components/admin/confirm-button";
import { Button } from "@/components/ui/button";
import {
  deleteSeminar,
  sendSeminarTest,
  sendSeminarToSubscribers,
  setSeminarStatus,
} from "@/server/actions/seminars";
import { TestSendButton } from "@/components/admin/test-send";
import { adminUrl } from "@/config/admin";
import { formatDateTime } from "@/lib/dates";

export function SeminarActions({
  id,
  slug,
  status,
  isAdmin,
  registrationCount,
  subscriberCount,
  sentAt,
  sentCount,
  adminEmail,
}: {
  id: string;
  slug: string;
  status: "DRAFT" | "PUBLISHED";
  isAdmin: boolean;
  registrationCount: number;
  subscriberCount: number;
  sentAt: string | null;
  sentCount: number | null;
  adminEmail?: string;
}) {
  const router = useRouter();
  const refresh = () => router.refresh();
  const wrap =
    (fn: () => Promise<{ ok: boolean; message?: string; error?: string }>) => async () => {
      const r = await fn();
      if (r.ok) refresh();
      return r as { ok: true; message?: string } | { ok: false; error: string };
    };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        nativeButton={false}
        render={<Link href={adminUrl(`seminars/${id}/registrations`)} />}
      >
        <Users className="size-4" aria-hidden />
        申込一覧（{registrationCount}）
      </Button>

      {status === "PUBLISHED" && (
        <Button
          variant="outline"
          size="sm"
          nativeButton={false}
          render={<Link href={`/seminar/${encodeURIComponent(slug)}`} target="_blank" />}
        >
          <ExternalLink className="size-4" aria-hidden />
          公開ページ
        </Button>
      )}

      {status === "PUBLISHED" ? (
        <ConfirmButton
          variant="outline"
          action={wrap(() => setSeminarStatus(id, "DRAFT"))}
          title="下書きに戻しますか？"
          description="公開ページからすぐに消えます。申込データは残ります。"
          confirmLabel="下書きに戻す"
        >
          <EyeOff className="size-4" aria-hidden />
          非公開にする
        </ConfirmButton>
      ) : (
        <ConfirmButton
          variant="default"
          action={wrap(() => setSeminarStatus(id, "PUBLISHED"))}
          title="公開しますか？"
          description="公開ページに表示され、申込を受け付けられるようになります。"
          confirmLabel="公開する"
        >
          <Eye className="size-4" aria-hidden />
          公開する
        </ConfirmButton>
      )}

      <TestSendButton action={(to) => sendSeminarTest(id, to)} defaultEmail={adminEmail} />

      {isAdmin && status === "PUBLISHED" && (
        <ConfirmButton
          variant="default"
          action={wrap(() => sendSeminarToSubscribers(id))}
          title={`${subscriberCount}名の購読者にメールを送信しますか？`}
          description={
            sentAt
              ? `このセミナーは ${formatDateTime(sentAt)} に ${sentCount ?? 0}件送信済みです。もう一度送ると同じ人に再送されます。`
              : "送信は取り消せません。内容を公開ページで確認してから送ってください。"
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
            const r = await deleteSeminar(id);
            if (r.ok) router.push(adminUrl("seminars"));
            return r;
          }}
          title="このセミナーを削除しますか？"
          description={
            registrationCount > 0
              ? `${registrationCount}件の申込データも一緒に削除されます。元に戻せません。`
              : "元に戻せません。"
          }
          confirmLabel="削除する"
        >
          <Trash2 className="size-4" aria-hidden />
          削除
        </ConfirmButton>
      )}
    </div>
  );
}
