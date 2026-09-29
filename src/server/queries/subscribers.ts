import "server-only";
import { db } from "@/server/db";
import { pageArgs } from "@/server/queries/admin";

export async function listSubscribersAdmin(searchParams: {
  page?: string;
  q?: string;
  filter?: string;
}) {
  const { page, pageSize, skip, take, q } = pageArgs(searchParams, 50);
  const filter = searchParams.filter === "unsubscribed" ? "unsubscribed" : "active";
  const where = {
    ...(q ? { email: { contains: q, mode: "insensitive" as const } } : {}),
    unsubscribedAt: filter === "active" ? null : { not: null },
  };
  const [rows, total, active, unsubscribed] = await Promise.all([
    db.subscription.findMany({ where, orderBy: { createdAt: "desc" }, skip, take }),
    db.subscription.count({ where }),
    db.subscription.count({ where: { unsubscribedAt: null } }),
    db.subscription.count({ where: { unsubscribedAt: { not: null } } }),
  ]);
  return { rows, total, page, pageSize, q, filter, active, unsubscribed };
}

export function listActiveSubscriberEmails() {
  return db.subscription.findMany({
    where: { unsubscribedAt: null },
    orderBy: { createdAt: "desc" },
    select: { email: true, createdAt: true },
  });
}

export function listAdminUsers() {
  return db.adminUser.findMany({
    orderBy: { createdAt: "asc" },
    select: { id: true, email: true, name: true, role: true, lastLoginAt: true, createdAt: true },
  });
}

export function getAdminUser(id: string) {
  return db.adminUser.findUnique({
    where: { id },
    select: { id: true, email: true, name: true, role: true, lastLoginAt: true, createdAt: true },
  });
}
