import Link from "next/link";
import { ctaNav } from "@/config/nav";
import { cn } from "@/lib/utils";

/** The two header buttons, matching the old site: orange outline and orange fill. */
export function HeaderCta({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Link
        href={ctaNav.inquiry.href}
        onClick={onNavigate}
        className="border-accent-soft text-accent-soft hover:bg-accent-soft/10 inline-flex h-10 items-center rounded-full border-2 px-5 text-sm font-bold transition-colors"
      >
        {ctaNav.inquiry.label}
      </Link>
      <Link
        href={ctaNav.download.href}
        onClick={onNavigate}
        className="bg-accent-soft hover:bg-accent-soft-dark inline-flex h-10 items-center rounded-full px-5 text-sm font-bold text-white transition-colors"
      >
        {ctaNav.download.label}
      </Link>
    </div>
  );
}
