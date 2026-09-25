/**
 * Images live on the DigitalOcean Spaces CDN. Safe for client components.
 */
export const CDN_BASE_URL =
  process.env.NEXT_PUBLIC_CDN_URL ?? "https://bbc-images.sgp1.cdn.digitaloceanspaces.com";

/**
 * Build a CDN URL from a path such as "home/hero.avif". Each segment is
 * encoded separately so spaces and parentheses in legacy filenames work.
 */
export function cdn(path: string): string {
  const clean = path.replace(/^\/+/, "");
  const encoded = clean.split("/").map(encodeURIComponent).join("/");
  return `${CDN_BASE_URL}/${encoded}`;
}
