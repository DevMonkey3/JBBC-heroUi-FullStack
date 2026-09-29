import { requireAdmin } from "@/server/auth";
import { getSeminarAdmin, listRegistrations } from "@/server/queries/seminars";
import { prefectureName } from "@/lib/prefectures";
import { formatDateTime } from "@/lib/dates";

const statusJa = { SUBMITTED: "受付", CONFIRMED: "確定", CANCELLED: "キャンセル" } as const;

function csvCell(v: string): string {
  return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

/** CSV export of one seminar's registrations. BOM so Excel opens it as UTF-8. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
  } catch {
    return new Response("Unauthorized", { status: 401 });
  }
  const { id } = await params;
  const seminar = await getSeminarAdmin(id).catch(() => null);
  if (!seminar) return new Response("Not found", { status: 404 });

  const rows = await listRegistrations(id);
  const header = ["申込日時", "お名前", "会社名", "電話", "都道府県", "メール", "状態"];
  const lines = rows.map((r) =>
    [
      formatDateTime(r.createdAt),
      r.name,
      r.companyName ?? "",
      r.phone,
      prefectureName(r.prefecture),
      r.email,
      statusJa[r.status],
    ]
      .map(csvCell)
      .join(","),
  );
  const csv = "﻿" + [header.join(","), ...lines].join("\r\n");
  const filename = `registrations-${seminar.slug}.csv`;

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
      "Cache-Control": "no-store",
    },
  });
}
