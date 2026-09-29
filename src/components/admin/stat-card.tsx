import Link from "next/link";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  hint,
  href,
  tone = "default",
}: {
  label: string;
  value: number | string;
  hint?: string;
  href?: string;
  tone?: "default" | "brand" | "accent";
}) {
  const body = (
    <div
      className={cn("rounded-xl border bg-white p-4 transition-shadow", href && "hover:shadow-md")}
    >
      <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">{label}</p>
      <p
        className={cn(
          "mt-1 text-3xl font-bold tabular-nums",
          tone === "brand" && "text-brand",
          tone === "accent" && "text-accent-brand",
        )}
      >
        {value}
      </p>
      {hint && <p className="text-muted-foreground mt-1 text-xs">{hint}</p>}
    </div>
  );
  return href ? <Link href={href}>{body}</Link> : body;
}
