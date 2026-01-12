import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Build connection URL with optimization parameters for MongoDB Atlas
const getDatabaseUrl = () => {
  const baseUrl = process.env.DATABASE_URL || '';
  if (!baseUrl) return baseUrl;

  // Check if optimization params already exist
  if (baseUrl.includes('maxPoolSize')) return baseUrl;

  const separator = baseUrl.includes('?') ? '&' : '?';
  // Optimized connection settings for production stability:
  // - maxPoolSize=10: Limit connection pool to 10 connections
  // - maxIdleTimeMS=60000: Close idle connections after 60 seconds
  // - serverSelectionTimeoutMS=30000: More generous timeout for MongoDB Atlas (30 seconds)
  // - connectTimeoutMS=30000: Connection timeout of 30 seconds
  // - socketTimeoutMS=45000: Socket timeout of 45 seconds
  return `${baseUrl}${separator}maxPoolSize=10&maxIdleTimeMS=60000&serverSelectionTimeoutMS=30000&connectTimeoutMS=30000&socketTimeoutMS=45000`;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "production" ? ["error"] : ["warn", "error"],
    datasources: {
      db: {
        url: getDatabaseUrl(),
      },
    },
  });

// FIX: Add connection error handler to prevent app crash on DB issues
prisma.$connect().catch((error) => {
  console.error('[PRISMA] Failed to connect to database:', error.message);
  console.error('[PRISMA] App will continue running but database operations may fail');
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
