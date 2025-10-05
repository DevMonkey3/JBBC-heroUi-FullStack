import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Build connection URL with optimization parameters for MongoDB Atlas
const getDatabaseUrl = () => {
  const baseUrl = process.env.DATABASE_URL || '';
  if (!baseUrl) return baseUrl;

  // Check if optimization params already exist
  if (baseUrl.includes('maxPoolSize')) return baseUrl;

  const separator = baseUrl.includes('?') ? '&' : '?';
  // Conservative optimization - works with MongoDB Atlas SSL/TLS
  return `${baseUrl}${separator}maxPoolSize=10`;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["warn", "error"],
    datasources: {
      db: {
        url: getDatabaseUrl(),
      },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
