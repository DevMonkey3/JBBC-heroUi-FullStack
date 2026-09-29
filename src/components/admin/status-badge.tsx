import { cn } from "@/lib/utils";

const styles = {
  PUBLISHED: "bg-green-100 text-green-800",
  DRAFT: "bg-amber-100 text-amber-800",
  SUBMITTED: "bg-blue-100 text-blue-800",
  CONFIRMED: "bg-green-100 text-green-800",
  CANCELLED: "bg-gray-200 text-gray-700",
} as const;

const labels = {
  PUBLISHED: "公開",
  DRAFT: "下書き",
  SUBMITTED: "受付",
  CONFIRMED: "確定",
  CANCELLED: "キャンセル",
} as const;

export function StatusBadge({ status }: { status: keyof typeof styles }) {
  return (
    <span
      className={cn("inline-block rounded-full px-2 py-0.5 text-xs font-semibold", styles[status])}
    >
      {labels[status]}
    </span>
  );
}
