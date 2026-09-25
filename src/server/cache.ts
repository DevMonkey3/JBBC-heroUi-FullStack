import "server-only";
import { revalidateTag } from "next/cache";

/**
 * Cache tags used by queries and invalidated by actions.
 * Keep every tag here so a rename cannot silently desync the two sides.
 */
export const tags = {
  blog: "blog",
  seminars: "seminars",
  announcements: "announcements",
  newsletters: "newsletters",
  notices: "notices",
} as const;

export type CacheTag = (typeof tags)[keyof typeof tags];

/** Mark tagged content stale; visitors keep getting cached pages while it refreshes. */
export function invalidate(...list: CacheTag[]) {
  for (const tag of list) revalidateTag(tag, "max");
}
