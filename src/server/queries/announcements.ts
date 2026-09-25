import "server-only";
import { unstable_cache } from "next/cache";
import { db } from "@/server/db";
import { tags } from "@/server/cache";

export type AnnouncementSummary = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  /** ISO string: cached results are JSON, so Dates do not survive. */
  publishedAt: string;
};

export const getLatestAnnouncements = (limit: number) =>
  unstable_cache(
    async (): Promise<AnnouncementSummary[]> => {
      const rows = await db.announcement.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
        take: limit,
        select: { id: true, title: true, slug: true, excerpt: true, publishedAt: true },
      });
      return rows.map((r) => ({ ...r, publishedAt: r.publishedAt.toISOString() }));
    },
    ["announcements:latest", String(limit)],
    { tags: [tags.announcements] },
  )();
