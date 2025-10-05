import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["warn", "error"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    // Connection pool optimization for serverless
    datasourceUrl: process.env.DATABASE_URL +
      (process.env.DATABASE_URL?.includes('?') ? '&' : '?') +
      'connection_limit=10&pool_timeout=20&connect_timeout=30',
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
