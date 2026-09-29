import "server-only";
import { db } from "@/server/db";

/** Counts and recent activity for the dashboard. Not cached: admins want live numbers. */
export async function getDashboardData() {
  const now = new Date();
  const [
    admins,
    subscribersTotal,
    subscribersActive,
    posts,
    postsDraft,
    seminars,
    seminarsUpcoming,
    announcements,
    newsletters,
    registrations,
    emailsSent,
    recentRegistrations,
    recentSubscribers,
    recentPosts,
  ] = await Promise.all([
    db.adminUser.count(),
    db.subscription.count(),
    db.subscription.count({ where: { unsubscribedAt: null } }),
    db.blogPost.count(),
    db.blogPost.count({ where: { status: "DRAFT" } }),
    db.seminar.count(),
    db.seminar.count({ where: { startsAt: { gte: now } } }),
    db.announcement.count(),
    db.newsletter.count(),
    db.seminarRegistration.count(),
    db.notification.count(),
    db.seminarRegistration.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        seminar: { select: { title: true } },
      },
    }),
    db.subscription.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      where: { unsubscribedAt: null },
      select: { id: true, email: true, createdAt: true },
    }),
    db.blogPost.findMany({
      take: 5,
      orderBy: { publishedAt: "desc" },
      select: { id: true, title: true, slug: true, status: true, publishedAt: true },
    }),
  ]);

  return {
    counts: {
      admins,
      subscribersTotal,
      subscribersActive,
      posts,
      postsDraft,
      seminars,
      seminarsUpcoming,
      announcements,
      newsletters,
      registrations,
      emailsSent,
    },
    recentRegistrations,
    recentSubscribers,
    recentPosts,
  };
}

/** Shared pagination helper for admin list pages. */
export function pageArgs(searchParams: { page?: string; q?: string }, pageSize = 20) {
  const page = Math.max(1, Number(searchParams.page) || 1);
  return {
    page,
    pageSize,
    skip: (page - 1) * pageSize,
    take: pageSize,
    q: searchParams.q?.trim() ?? "",
  };
}
