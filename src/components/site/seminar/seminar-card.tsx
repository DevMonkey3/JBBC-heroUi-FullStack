import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import type { SeminarSummary } from "@/server/queries/seminars";
import { formatDateWeekday, formatTime } from "@/lib/dates";
import { cn } from "@/lib/utils";

export function SeminarCard({
  seminar,
  ended = false,
}: {
  seminar: SeminarSummary;
  ended?: boolean;
}) {
  const href = `/seminar/${encodeURIComponent(seminar.slug)}`;
  return (
    <article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-black/5",
        ended && "opacity-80",
      )}
    >
      <Link
        href={href}
        className="relative block aspect-[16/9] bg-gradient-to-br from-[#1AA4DD] to-[#0c7ba8]"
      >
        {seminar.thumbnail ? (
          <Image
            src={seminar.thumbnail}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className={cn("object-cover", ended && "grayscale")}
          />
        ) : (
          <CalendarDays className="absolute inset-0 m-auto size-16 text-white/30" aria-hidden />
        )}
        <span
          className={cn(
            "absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold text-white shadow",
            ended ? "bg-gray-600" : "bg-[#FF6F00]",
          )}
        >
          {ended ? "終了" : formatDateWeekday(seminar.startsAt)}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 line-clamp-2 text-lg font-bold">
          <Link href={href} className="hover:text-brand">
            {seminar.title}
          </Link>
        </h3>
        {seminar.excerpt && (
          <p className="text-muted-foreground mb-3 line-clamp-3 text-sm">{seminar.excerpt}</p>
        )}
        <dl className="text-muted-foreground mb-4 space-y-1 text-sm">
          <div className="flex items-center gap-2">
            <CalendarDays className="size-4 shrink-0" aria-hidden />
            <span>{formatDateWeekday(seminar.startsAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-4 shrink-0" aria-hidden />
            <span>
              {formatTime(seminar.startsAt)}〜{formatTime(seminar.endsAt)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0" aria-hidden />
            <span>{seminar.location}</span>
          </div>
        </dl>
        {seminar.speakerName && (
          <div className="mb-4 rounded-lg bg-gray-50 p-3 text-sm">
            <p className="text-xs font-semibold text-gray-500">登壇者</p>
            <p>{seminar.speakerName}</p>
            {seminar.speakerTitle && (
              <p className="text-xs text-gray-500">{seminar.speakerTitle}</p>
            )}
          </div>
        )}
        <Link
          href={href}
          className={cn(
            "mt-auto block rounded-full py-2.5 text-center text-sm font-bold text-white transition-colors",
            ended ? "bg-gray-500 hover:bg-gray-600" : "bg-[#FF6F00] hover:bg-[#e56300]",
          )}
        >
          {ended ? "内容を見る" : "詳細を見る・申し込む"}
        </Link>
      </div>
    </article>
  );
}
