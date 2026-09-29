import "server-only";
import { unstable_cache } from "next/cache";
import { db } from "@/server/db";
import { tags } from "@/server/cache";
import { pageArgs } from "@/server/queries/admin";

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

const summarySelect = {
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
} as const;

const toSummary = (r: {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  location: string;
  startsAt: Date;
  endsAt: Date;
  thumbnail: string | null;
  speakerName: string | null;
  speakerTitle: string | null;
}): SeminarSummary => ({
  ...r,
  startsAt: r.startsAt.toISOString(),
  endsAt: r.endsAt.toISOString(),
});

/**
 * All published seminars, split by whether they have ended. Cached one hour
 * so the split moves forward on its own, and invalidated on every admin save.
 */
export const getPublicSeminars = unstable_cache(
  async (): Promise<{ upcoming: SeminarSummary[]; past: SeminarSummary[] }> => {
    const rows = await db.seminar.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { startsAt: "asc" },
      select: summarySelect,
    });
    const now = Date.now();
    const upcoming = rows.filter((r) => r.endsAt.getTime() >= now).map(toSummary);
    const past = rows
      .filter((r) => r.endsAt.getTime() < now)
      .reverse()
      .map(toSummary);
    return { upcoming, past };
  },
  ["seminars:public"],
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
        sentAt: row.sentAt?.toISOString() ?? null,
      };
    },
    ["seminars:detail", slug],
    { tags: [tags.seminars] },
  )();

export const getPublishedSeminarSlugs = unstable_cache(
  async () =>
    db.seminar.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true, publishedAt: true },
    }),
  ["seminars:slugs"],
  { tags: [tags.seminars] },
);

// ---------------------------------------------------------------- admin

export async function listSeminarsAdmin(searchParams: { page?: string; q?: string }) {
  const { page, pageSize, skip, take, q } = pageArgs(searchParams);
  const where = q
    ? {
        OR: [
          { title: { contains: q, mode: "insensitive" as const } },
          { location: { contains: q, mode: "insensitive" as const } },
        ],
      }
    : {};
  const [rows, total] = await Promise.all([
    db.seminar.findMany({
      where,
      orderBy: { startsAt: "desc" },
      skip,
      take,
      select: {
        id: true,
        title: true,
        slug: true,
        location: true,
        startsAt: true,
        endsAt: true,
        status: true,
        sentAt: true,
        sentCount: true,
        _count: { select: { registrations: true } },
      },
    }),
    db.seminar.count({ where }),
  ]);
  return { rows, total, page, pageSize, q };
}

export function getSeminarAdmin(id: string) {
  return db.seminar.findUnique({
    where: { id },
    include: { _count: { select: { registrations: true } } },
  });
}

export function listRegistrations(seminarId: string) {
  return db.seminarRegistration.findMany({
    where: { seminarId },
    orderBy: { createdAt: "desc" },
  });
}

export function countActiveSubscribers() {
  return db.subscription.count({ where: { unsubscribedAt: null } });
}
