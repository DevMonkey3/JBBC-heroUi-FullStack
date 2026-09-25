import { cn } from "@/lib/utils";
import { Container } from "@/components/site/container";

type SectionProps = React.ComponentProps<"section"> & {
  /** Full-bleed background; content stays inside the container. */
  bleed?: string;
  /** Extra classes for the inner container. */
  inner?: string;
};

/** Full-width band with a tight, wide inner container. */
export function Section({ bleed, inner, className, children, ...props }: SectionProps) {
  return (
    <section className={cn("w-full", bleed, className)} {...props}>
      <Container className={inner}>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  kicker,
  title,
  lead,
  className,
  align = "center",
}: {
  kicker?: string;
  title: React.ReactNode;
  lead?: string;
  className?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={cn(align === "center" ? "text-center" : "text-left", className)}>
      {kicker && <p className="text-muted-foreground mb-1 text-sm md:text-base">{kicker}</p>}
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
      {lead && (
        <p className="text-muted-foreground mx-auto mt-3 max-w-3xl text-sm leading-relaxed md:text-base">
          {lead}
        </p>
      )}
    </div>
  );
}
