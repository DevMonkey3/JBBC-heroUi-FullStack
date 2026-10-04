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

/**
 * Pre-resized variants. `npm run images:build` renders every photo the site
 * uses at each of these widths as WebP and uploads them next to the originals
 * under `_opt/`, so the server never resizes anything at request time.
 * Admin uploads get the same variants when they are uploaded.
 */
export const VARIANT_WIDTHS = [160, 320, 480, 640, 828, 1080, 1440, 1920] as const;
export const VARIANT_PREFIX = "_opt";

/** The smallest generated width that is at least the requested one. */
export function variantWidth(width: number): number {
  return VARIANT_WIDTHS.find((w) => w >= width) ?? VARIANT_WIDTHS[VARIANT_WIDTHS.length - 1];
}

/** Object key (unencoded) of one variant: "_opt/home/hero/640.webp". */
export function variantKey(path: string, width: number): string {
  const clean = path.replace(/^\/+/, "").replace(/\.[a-z0-9]+$/i, "");
  return `${VARIANT_PREFIX}/${clean}/${width}.webp`;
}

/** Public CDN URL of the variant that best fits `width`. */
export function variantUrl(path: string, width: number): string {
  return cdn(variantKey(path, variantWidth(width)));
}

/** "home/hero.avif" for a URL on our CDN, null for any other host. */
export function cdnPathFromUrl(url: string): string | null {
  if (!url.startsWith(`${CDN_BASE_URL}/`)) return null;
  try {
    return decodeURIComponent(url.slice(CDN_BASE_URL.length + 1));
  } catch {
    return null;
  }
}
