import sharp from "sharp";
import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { VARIANT_WIDTHS, variantKey } from "@/config/cdn";

// No "server-only" here: scripts/build-image-variants.ts uses this too.

export const VARIANT_QUALITY = 78;

export type Variant = { width: number; buffer: Buffer };

/**
 * Render every configured width as WebP. Widths above the original are still
 * produced (at the original size) so a request for any width finds a file.
 */
export async function renderVariants(original: Buffer): Promise<Variant[]> {
  const out: Variant[] = [];
  for (const width of VARIANT_WIDTHS) {
    const buffer = await sharp(original)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: VARIANT_QUALITY, effort: 4 })
      .toBuffer();
    out.push({ width, buffer });
  }
  return out;
}

type Target = { client: S3Client; bucket: string };

/** Upload one variant set for the object at `path` ("home/hero.avif"). */
export async function uploadVariants(
  { client, bucket }: Target,
  path: string,
  variants: Variant[],
): Promise<void> {
  await Promise.all(
    variants.map(({ width, buffer }) =>
      client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: variantKey(path, width),
          Body: buffer,
          ACL: "public-read",
          ContentType: "image/webp",
          CacheControl: "public, max-age=31536000, immutable",
        }),
      ),
    ),
  );
}

/** True when every width already exists in the bucket. */
export async function variantsExist({ client, bucket }: Target, path: string): Promise<boolean> {
  const checks = await Promise.all(
    VARIANT_WIDTHS.map((w) =>
      client
        .send(new HeadObjectCommand({ Bucket: bucket, Key: variantKey(path, w) }))
        .then(() => true)
        .catch(() => false),
    ),
  );
  return checks.every(Boolean);
}
