import "server-only";
import { unstable_cache } from "next/cache";
import { db } from "@/server/db";
import { tags } from "@/server/cache";
import { pageArgs } from "@/server/queries/admin";

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

const select = {
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  publishedAt: true,
  status: true,
} as const;

const live = <T extends { status: string }>(rows: T[]) => rows.filter((r) => r.status !== "DRAFT");

/**
 * Unified feed of announcements, newsletters and seminars for the /notices page.
 * Status is checked in code because old-admin documents lack the field.
 */
export const getNotices = unstable_cache(
  async (): Promise<Notice[]> => {
    const [announcements, newsletters, seminars] = (
      await Promise.all([
        db.announcement.findMany({ select }),
        db.newsletter.findMany({ select }),
        db.seminar.findMany({ select }),
      ])
    ).map(live);

    return [
      ...announcements.map((n) => ({ ...n, type: "announcement" as const })),
      ...newsletters.map((n) => ({ ...n, type: "newsletter" as const })),
      ...seminars.map((n) => ({ ...n, type: "seminar" as const })),
    ]
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
      .map(({ status: _s, ...n }) => ({ ...n, publishedAt: n.publishedAt.toISOString() }));
  },
  ["notices:list:v3"],
  { tags: [tags.notices, tags.announcements, tags.newsletters, tags.seminars] },
);

export type NoticeDetail = {
  type: "announcement" | "newsletter";
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string;
  publishedAt: string;
};

/** An announcement or newsletter by slug. Seminars link to their own page. */
export const getNoticeBySlug = (slug: string) =>
  unstable_cache(
    async (): Promise<NoticeDetail | null> => {
      const a = await db.announcement.findFirst({ where: { slug } });
      if (a && a.status !== "DRAFT") {
        return {
          type: "announcement",
          id: a.id,
          title: a.title,
          slug: a.slug,
          excerpt: a.excerpt,
          body: a.body,
          publishedAt: a.publishedAt.toISOString(),
        };
      }
      const n = await db.newsletter.findFirst({ where: { slug } });
      if (n && n.status !== "DRAFT") {
        return {
          type: "newsletter",
          id: n.id,
          title: n.title,
          slug: n.slug,
          excerpt: n.excerpt,
          body: n.body,
          publishedAt: n.publishedAt.toISOString(),
        };
      }
      return null;
    },
    ["notices:detail:v3", slug],
    { tags: [tags.announcements, tags.newsletters] },
  )();

// ---------------------------------------------------------------- admin

export type NoticeKind = "announcement" | "newsletter";

const adminSelect = {
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  status: true,
  publishedAt: true,
  sentAt: true,
  sentCount: true,
  updatedBy: true,
} as const;

export async function listNoticesAdmin(
  kind: NoticeKind,
  searchParams: { page?: string; q?: string },
) {
  const { page, pageSize, skip, take, q } = pageArgs(searchParams);
  const where = q ? { title: { contains: q, mode: "insensitive" as const } } : {};
  const [rows, total] =
    kind === "announcement"
      ? await Promise.all([
          db.announcement.findMany({
            where,
            orderBy: { publishedAt: "desc" },
            skip,
            take,
            select: adminSelect,
          }),
          db.announcement.count({ where }),
        ])
      : await Promise.all([
          db.newsletter.findMany({
            where,
            orderBy: { publishedAt: "desc" },
            skip,
            take,
            select: adminSelect,
          }),
          db.newsletter.count({ where }),
        ]);
  return { rows, total, page, pageSize, q };
}

export function getNoticeAdmin(kind: NoticeKind, id: string) {
  return kind === "announcement"
    ? db.announcement.findUnique({ where: { id } })
    : db.newsletter.findUnique({ where: { id } });
}
