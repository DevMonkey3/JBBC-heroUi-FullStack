import { requireRole } from "@/server/auth";
import { listActiveSubscriberEmails } from "@/server/queries/subscribers";
import { formatDateTime } from "@/lib/dates";

/** CSV of active subscribers. BOM so Excel opens it as UTF-8. */
export async function GET() {
  try {
    await requireRole("ADMIN");
  } catch {
    return new Response("Unauthorized", { status: 401 });
  }
  const rows = await listActiveSubscriberEmails();
  const lines = rows.map((r) => `${r.email},${formatDateTime(r.createdAt)}`);
  const csv = "﻿" + ["メールアドレス,登録日時", ...lines].join("\r\n");
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="subscribers.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
