import "server-only";
import { PrismaClient } from "@prisma/client";
import { env, isProduction } from "@/config/env";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function withPoolSettings(url: string): string {
  // Empty during `next build` without secrets; Prisma then only fails if a
  // query actually runs, and build-time queries are wrapped in catch().
  if (!url || url.includes("maxPoolSize")) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}maxPoolSize=10&maxIdleTimeMS=60000&serverSelectionTimeoutMS=15000`;
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: { db: { url: withPoolSettings(env.DATABASE_URL) } },
    log: isProduction ? ["error"] : ["warn", "error"],
  });

if (!isProduction) globalForPrisma.prisma = db;
