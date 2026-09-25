import "server-only";
import { unstable_cache } from "next/cache";
import { db } from "@/server/db";
import { tags } from "@/server/cache";

export type NoticeType = "announcement" | "newsletter" | "seminar";

export type Notice = {
  id: string;
  type: NoticeType;
  title: string;
  slug: string;
  excerpt: string | null;
  /** ISO string: cached results are JSON, so Dates do not survive. */
  publishedAt: string;
};

const select = { id: true, title: true, slug: true, excerpt: true, publishedAt: true } as const;

/**
 * Unified feed of announcements, newsletters and seminars for the /notices page.
 */
export const getNotices = unstable_cache(
  async (): Promise<Notice[]> => {
    const where = { status: "PUBLISHED" as const };
    const [announcements, newsletters, seminars] = await Promise.all([
      db.announcement.findMany({ where, select }),
      db.newsletter.findMany({ where, select }),
      db.seminar.findMany({ where, select }),
    ]);

    return [
      ...announcements.map((n) => ({ ...n, type: "announcement" as const })),
      ...newsletters.map((n) => ({ ...n, type: "newsletter" as const })),
      ...seminars.map((n) => ({ ...n, type: "seminar" as const })),
    ]
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
      .map((n) => ({ ...n, publishedAt: n.publishedAt.toISOString() }));
  },
  ["notices:list"],
  { tags: [tags.notices, tags.announcements, tags.newsletters, tags.seminars] },
);
