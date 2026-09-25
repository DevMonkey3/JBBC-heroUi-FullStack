import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { getLatestAnnouncements } from "@/server/queries/announcements";
import { newsSection } from "@/content/home";
import { formatDate } from "@/lib/dates";
import { CtaButton } from "@/components/site/cta-button";

export async function NewsSection() {
  const items = await getLatestAnnouncements(3);
  if (items.length === 0) return null;

  return (
    <div className="from-brand-soft rounded-2xl bg-gradient-to-br to-cyan-50 p-5 shadow-sm md:p-8">
      <div className="mb-6 text-center">
        <h2 className="text-brand text-2xl font-bold md:text-3xl">{newsSection.title}</h2>
        <p className="text-muted-foreground mt-1">{newsSection.lead}</p>
      </div>

      <ul className="grid gap-4 md:grid-cols-3">
        {items.map((a) => (
          <li key={a.id}>
            <Link
              href={`/notices/${a.slug}`}
              className="flex h-full flex-col rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
                <CalendarDays className="size-4" aria-hidden />
                <time dateTime={a.publishedAt}>
                  {formatDate(a.publishedAt, { month: "2-digit", day: "2-digit" })}
                </time>
              </span>
              <h3 className="mb-2 line-clamp-2 font-semibold">{a.title}</h3>
              {a.excerpt && (
                <p className="text-muted-foreground line-clamp-3 text-sm">{a.excerpt}</p>
              )}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-center">
        <CtaButton href={newsSection.cta.href} variant="brand">
          {newsSection.cta.label}
        </CtaButton>
      </div>
    </div>
  );
}
