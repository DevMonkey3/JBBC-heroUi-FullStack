import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Build connection URL with optimization parameters for MongoDB Atlas
const getDatabaseUrl = () => {
  const baseUrl = process.env.DATABASE_URL || '';
  if (!baseUrl) return baseUrl;

  // Check if optimization params already exist
  if (baseUrl.includes('maxPoolSize')) return baseUrl;

  const separator = baseUrl.includes('?') ? '&' : '?';
  // Optimized connection settings for reduced RAM usage:
  // - maxPoolSize=10: Limit connection pool to 10 connections
  // - maxIdleTimeMS=30000: Close idle connections after 30 seconds
  // - serverSelectionTimeoutMS=5000: Fail fast if server unreachable (5 seconds)
  // - connectTimeoutMS=10000: Connection timeout of 10 seconds
  return `${baseUrl}${separator}maxPoolSize=10&maxIdleTimeMS=30000&serverSelectionTimeoutMS=5000&connectTimeoutMS=10000`;
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
