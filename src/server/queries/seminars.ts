import "server-only";
import { unstable_cache } from "next/cache";
import { db } from "@/server/db";
import { tags } from "@/server/cache";

export type SeminarSummary = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  location: string;
  /** ISO strings: cached results are JSON, so Dates do not survive. */
  startsAt: string;
  endsAt: string;
  thumbnail: string | null;
  speakerName: string | null;
  speakerTitle: string | null;
};

export const getUpcomingSeminars = unstable_cache(
  async (): Promise<SeminarSummary[]> => {
    const rows = await db.seminar.findMany({
      where: { status: "PUBLISHED", endsAt: { gte: new Date() } },
      orderBy: { startsAt: "asc" },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        location: true,
        startsAt: true,
        endsAt: true,
        thumbnail: true,
        speakerName: true,
        speakerTitle: true,
      },
    });
    return rows.map((r) => ({
      ...r,
      startsAt: r.startsAt.toISOString(),
      endsAt: r.endsAt.toISOString(),
    }));
  },
  ["seminars:upcoming"],
  { tags: [tags.seminars], revalidate: 60 * 60 },
);

export const getSeminarBySlug = (slug: string) =>
  unstable_cache(
    async () => {
      const row = await db.seminar.findFirst({ where: { slug, status: "PUBLISHED" } });
      if (!row) return null;
      return {
        ...row,
        startsAt: row.startsAt.toISOString(),
        endsAt: row.endsAt.toISOString(),
        publishedAt: row.publishedAt.toISOString(),
        updatedAt: row.updatedAt?.toISOString() ?? null,
      };
    },
    ["seminars:detail", slug],
    { tags: [tags.seminars] },
  )();
