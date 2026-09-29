/**
 * Images live on the DigitalOcean Spaces CDN. Safe for client components.
 */
export const CDN_BASE_URL =
  process.env.NEXT_PUBLIC_CDN_URL ?? "https://bbc-images.sgp1.cdn.digitaloceanspaces.com";

/**
 * Hosts the image optimizer may fetch from. Must match `images.remotePatterns`
 * in next.config.ts. Anything else is rendered with a plain <img>.
 */
export const ALLOWED_IMAGE_HOSTS = [
  "bbc-images.sgp1.cdn.digitaloceanspaces.com",
  "jbbra.com",
  "jbbc.co.jp",
] as const;

export function isOptimizableImage(url: string): boolean {
  try {
    const { protocol, hostname } = new URL(url);
    return protocol === "https:" && (ALLOWED_IMAGE_HOSTS as readonly string[]).includes(hostname);
  } catch {
    return false;
  }
}

/**
 * Build a CDN URL from a path such as "home/hero.avif". Each segment is
 * encoded separately so spaces and parentheses in legacy filenames work.
 */
export function cdn(path: string): string {
  const clean = path.replace(/^\/+/, "");
  const encoded = clean.split("/").map(encodeURIComponent).join("/");
  return `${CDN_BASE_URL}/${encoded}`;
}
