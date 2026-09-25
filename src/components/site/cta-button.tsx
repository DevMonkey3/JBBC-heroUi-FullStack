import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "accent" | "brand" | "outline";
  size?: "md" | "lg";
  arrow?: boolean;
  className?: string;
};

const variants = {
  accent: "bg-accent-brand text-white hover:bg-accent-brand-dark",
  brand: "bg-brand text-white hover:bg-brand-dark",
  outline: "border-brand text-brand hover:bg-brand-soft border bg-white",
};

const sizes = {
  md: "h-10 px-6 text-sm",
  lg: "h-12 px-8 text-base",
};

/** Pill call-to-action used across the marketing site. */
export function CtaButton({
  href,
  children,
  variant = "accent",
  size = "md",
  arrow = true,
  className,
}: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-1 rounded-full font-semibold shadow-sm transition-colors",
        "focus-visible:ring-ring/50 outline-none focus-visible:ring-3",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
      {arrow && <ChevronRight className="size-4" aria-hidden />}
    </Link>
  );
}
