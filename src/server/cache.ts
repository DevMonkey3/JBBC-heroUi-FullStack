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

/**
 * Drop tagged content so the very next request rebuilds it. Admin saves are
 * rare, and an editor who just published expects to see it immediately, so
 * we do not use the stale-while-revalidate profile here.
 */
export function invalidate(...list: CacheTag[]) {
  for (const tag of list) revalidateTag(tag, { expire: 0 });
}
