import "server-only";

/**
 * In-memory sliding window limiter. Good enough for a single-instance
 * deployment; swap the store for Redis if the app is ever scaled out.
 */
const buckets = new Map<string, number[]>();

type Options = { limit: number; windowMs: number };

export function rateLimit(key: string, { limit, windowMs }: Options): { ok: boolean } {
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) {
    buckets.set(key, hits);
    return { ok: false };
  }
  hits.push(now);
  buckets.set(key, hits);
  return { ok: true };
}

export function clientIp(headers: Headers): string {
  return (
    headers.get("cf-connecting-ip") ??
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}
