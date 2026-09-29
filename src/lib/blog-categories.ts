/** Blog categories shown on the list page and chosen in the admin. */
export const blogCategories = [
  "ライフスタイル",
  "取り組み",
  "在留資格",
  "外国人採用",
  "実績 / ノウハウ",
] as const;

export type BlogCategory = (typeof blogCategories)[number];

export function isBlogCategory(v: unknown): v is BlogCategory {
  return typeof v === "string" && (blogCategories as readonly string[]).includes(v);
}
