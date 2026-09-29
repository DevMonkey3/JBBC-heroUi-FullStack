import "server-only";
import { z } from "zod";

/**
 * Validated server environment. Import this instead of reading process.env
 * directly so a missing secret fails at startup with a clear message,
 * not at 2am inside a request.
 */
const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  AUTH_SECRET: z.string().min(16, "AUTH_SECRET must be at least 16 characters"),

  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().default("JBBC <noreply@jbbc.co.jp>"),
  EMAIL_INQUIRY_TO: z.string().default("info@jbbc.co.jp"),

  GOOGLE_SERVICE_ACCOUNT_EMAIL: z.string().optional(),
  GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: z.string().optional(),
  GOOGLE_SHEET_ID_INQUIRY: z.string().optional(),
  GOOGLE_SHEET_ID_SEMINAR: z.string().optional(),
  GOOGLE_SHEET_ID_DOWNLOAD: z.string().optional(),

  SPACES_ENDPOINT: z.string().default("https://sgp1.digitaloceanspaces.com"),
  SPACES_REGION: z.string().default("sgp1"),
  SPACES_BUCKET: z.string().default("bbc-images"),
  SPACES_ACCESS_KEY_ID: z.string().optional(),
  SPACES_SECRET_KEY: z.string().optional(),

  TURNSTILE_SECRET_KEY: z.string().optional(),
});

// `next build` imports every route to collect page data. That must succeed
// on a build machine that has no secrets (CI, or a hosting build step), so
// during the build the required values fall back to empty strings. At
// runtime the strict schema applies and the server refuses to start.
const isBuild = process.env.NEXT_PHASE === "phase-production-build";
const buildSchema = schema.extend({
  DATABASE_URL: z.string().default(""),
  AUTH_SECRET: z.string().default(""),
});

const parsed = (isBuild ? buildSchema : schema).safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`);
  throw new Error(`Invalid environment variables:\n${issues.join("\n")}`);
}

export const env = parsed.data;

export const isProduction = env.NODE_ENV === "production";
