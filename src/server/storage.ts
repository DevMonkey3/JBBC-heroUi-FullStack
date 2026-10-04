import "server-only";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { env } from "@/config/env";
import { CDN_BASE_URL } from "@/config/cdn";
import { renderVariants, uploadVariants } from "@/server/image-variants";

let client: S3Client | null = null;

function getClient(): S3Client {
  if (!env.SPACES_ACCESS_KEY_ID || !env.SPACES_SECRET_KEY) {
    throw new Error("Spaces credentials are not set");
  }
  client ??= new S3Client({
    endpoint: env.SPACES_ENDPOINT,
    region: env.SPACES_REGION,
    credentials: {
      accessKeyId: env.SPACES_ACCESS_KEY_ID,
      secretAccessKey: env.SPACES_SECRET_KEY,
    },
    forcePathStyle: false,
  });
  return client;
}

/** Upload a public image and return its CDN URL. */
export async function uploadImage(buffer: Buffer, filename: string, mimeType: string) {
  const safe = filename.replace(/[^a-zA-Z0-9.-]/g, "_");
  const key = `uploads/${Date.now()}-${safe}`;

  await getClient().send(
    new PutObjectCommand({
      Bucket: env.SPACES_BUCKET,
      Key: key,
      Body: buffer,
      ACL: "public-read",
      ContentType: mimeType,
      CacheControl: "public, max-age=31536000, immutable",
    }),
  );

  // Pre-resized WebP variants so the public site never resizes on the server.
  // Best effort: the original is already stored if this fails.
  try {
    await uploadVariants(
      { client: getClient(), bucket: env.SPACES_BUCKET },
      key,
      await renderVariants(buffer),
    );
  } catch (err) {
    console.error("Variant generation failed for", key, err);
  }

  return `${CDN_BASE_URL}/${key}`;
}

export async function deleteImage(url: string) {
  const key = url.startsWith(CDN_BASE_URL) ? url.slice(CDN_BASE_URL.length + 1) : null;
  if (!key) throw new Error("URL is not on the configured CDN");
  await getClient().send(new DeleteObjectCommand({ Bucket: env.SPACES_BUCKET, Key: key }));
}
