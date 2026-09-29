import "server-only";
import { db } from "@/server/db";
import type { SendResult } from "@/server/email/resend";

/**
 * Send one email to every active subscriber, five at a time, and log each
 * success as a Notification row. Returns counts for the admin toast.
 */
export async function broadcast(
  type: "blog" | "announcement" | "newsletter" | "seminar",
  refId: string,
  send: (to: string) => Promise<SendResult>,
): Promise<{ sent: number; failed: string[] }> {
  const subscribers = await db.subscription.findMany({
    where: { unsubscribedAt: null },
    select: { email: true },
  });

  let sent = 0;
  const failed: string[] = [];
  for (let i = 0; i < subscribers.length; i += 5) {
    const batch = subscribers.slice(i, i + 5);
    const results = await Promise.all(batch.map((s) => send(s.email)));
    const ok = batch.filter((_, j) => results[j].ok).map((s) => s.email);
    failed.push(...batch.filter((_, j) => !results[j].ok).map((s) => s.email));
    sent += ok.length;
    if (ok.length) {
      await db.notification.createMany({ data: ok.map((email) => ({ type, refId, email })) });
    }
  }
  if (failed.length) console.error(`Broadcast ${type}/${refId} failures:`, failed);
  return { sent, failed };
}

export function broadcastMessage(r: { sent: number; failed: string[] }): string {
  return r.failed.length
    ? `${r.sent}件送信、${r.failed.length}件失敗しました`
    : `${r.sent}件の購読者に送信しました`;
}
