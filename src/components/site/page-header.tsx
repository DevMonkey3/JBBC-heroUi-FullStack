import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string };

/**
 * Inner-page header matching the old site: small blue pill with the English
 * section name, the Japanese title, then a breadcrumb trail.
 */
export function PageHeader({
  pill,
  title,
  crumbs,
}: {
  pill: string;
  title: string;
  crumbs: Crumb[];
}) {
  const trail: Crumb[] = [{ label: "top", href: "/" }, ...crumbs];

  return (
    <div className="py-4 md:py-6">
      <span className="bg-brand-dark inline-block rounded-tl-[10px] rounded-br-[10px] px-2 py-1 text-xs font-bold text-white sm:text-sm">
        {pill}
      </span>
      <h1 className="mt-2 text-2xl leading-tight font-bold sm:mt-4 sm:text-3xl md:text-4xl">
        {title}
      </h1>
      <nav aria-label="パンくずリスト" className="mt-2 sm:mt-3">
        <ol className="text-muted-foreground flex flex-wrap items-center gap-1 text-xs sm:text-sm">
          {trail.map((c, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={`${c.label}-${i}`} className="flex items-center gap-1">
                {c.href && !last ? (
                  <Link href={c.href} className="hover:text-brand">
                    {c.label}
                  </Link>
                ) : (
                  <span
                    aria-current={last ? "page" : undefined}
                    className={last ? "text-foreground" : ""}
                  >
                    {c.label}
                  </span>
                )}
                {!last && <ChevronRight className="size-3.5" aria-hidden />}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
