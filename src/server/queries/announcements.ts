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
      // Status checked in code: old-admin documents lack the field (see seminars.ts).
      const rows = await db.announcement.findMany({
        orderBy: { publishedAt: "desc" },
        take: limit * 2,
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          publishedAt: true,
          status: true,
        },
      });
      return rows
        .filter((r) => r.status !== "DRAFT")
        .slice(0, limit)
        .map(({ status: _s, ...r }) => ({ ...r, publishedAt: r.publishedAt.toISOString() }));
    },
    ["announcements:latest:v2", String(limit)],
    { tags: [tags.announcements] },
  )();
