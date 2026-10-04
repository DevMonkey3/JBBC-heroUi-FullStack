/**
 * Render every photo the site uses at each width in VARIANT_WIDTHS as WebP and
 * upload the results to the Space under `_opt/`, so the server never resizes
 * images at request time (see src/config/cdn.ts).
 *
 *   npm run images:build             render + upload what is missing
 *   npm run images:build -- --force  re-render everything
 *   npm run images:build -- --check  only report which variants are missing
 *
 * Sources: every quoted "*.avif|webp|jpg|jpeg|png" path in src/content,
 * src/components/site and src/app/(site), plus every object under uploads/
 * (admin uploads made before variants existed). Run it again whenever a new
 * photo path is added to the content files.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { CDN_BASE_URL, VARIANT_WIDTHS, cdn, variantKey } from "../src/config/cdn";
import { renderVariants, uploadVariants, variantsExist } from "../src/server/image-variants";

const force = process.argv.includes("--force");
const checkOnly = process.argv.includes("--check");
const CONCURRENCY = 4;

const client = new S3Client({
  endpoint: process.env.SPACES_ENDPOINT ?? "https://sgp1.digitaloceanspaces.com",
  region: process.env.SPACES_REGION ?? "sgp1",
  credentials: {
    accessKeyId: process.env.SPACES_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.SPACES_SECRET_KEY ?? "",
  },
});
const bucket = process.env.SPACES_BUCKET ?? "bbc-images";
const target = { client, bucket };

function* walk(dir: string): Generator<string> {
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (/\.(ts|tsx)$/.test(name)) yield p;
  }
}

function pathsFromSource(): Set<string> {
  const root = path.resolve(__dirname, "..");
  const dirs = ["src/content", "src/components/site", "src/app/(site)"].map((d) =>
    path.join(root, d),
  );
  const re = /"([A-Za-z0-9 _/().-]+\.(?:avif|webp|jpe?g|png))"/g;
  const found = new Set<string>();
  for (const dir of dirs) {
    for (const file of walk(dir)) {
      for (const line of readFileSync(file, "utf8").split("\n")) {
        if (/^\s*(\/\/|\/?\*)/.test(line)) continue; // comments: doc examples, not real paths
        for (const m of line.matchAll(re)) if (m[1].includes("/")) found.add(m[1]);
      }
    }
  }
  return found;
}

async function pathsFromUploads(): Promise<Set<string>> {
  const found = new Set<string>();
  let token: string | undefined;
  do {
    const r = await client.send(
      new ListObjectsV2Command({ Bucket: bucket, Prefix: "uploads/", ContinuationToken: token }),
    );
    for (const o of r.Contents ?? []) {
      if (o.Key && /\.(avif|webp|jpe?g|png)$/i.test(o.Key)) found.add(o.Key);
    }
    token = r.NextContinuationToken;
  } while (token);
  return found;
}

async function missingOnCdn(p: string): Promise<number[]> {
  const missing: number[] = [];
  await Promise.all(
    VARIANT_WIDTHS.map(async (w) => {
      const res = await fetch(cdn(variantKey(p, w)), { method: "HEAD" });
      if (!res.ok) missing.push(w);
    }),
  );
  return missing.sort((a, b) => a - b);
}

async function process1(p: string): Promise<"done" | "skipped" | "failed"> {
  try {
    if (!force && (await variantsExist(target, p))) return "skipped";
    const res = await fetch(cdn(p));
    if (!res.ok) throw new Error(`original ${res.status}`);
    const original = Buffer.from(await res.arrayBuffer());
    const variants = await renderVariants(original);
    await uploadVariants(target, p, variants);
    const kb = Math.round(variants.reduce((a, v) => a + v.buffer.length, 0) / 1024);
    console.log(`done    ${p} (${kb} KB over ${variants.length} sizes)`);
    return "done";
  } catch (err) {
    console.error(`FAILED  ${p}: ${err instanceof Error ? err.message : err}`);
    return "failed";
  }
}

async function main() {
  const paths = [...new Set([...pathsFromSource(), ...(await pathsFromUploads())])].sort();
  console.log(
    `${paths.length} images → ${VARIANT_WIDTHS.length} widths each, CDN ${CDN_BASE_URL}\n`,
  );

  if (checkOnly) {
    let missing = 0;
    for (const p of paths) {
      const m = await missingOnCdn(p);
      if (m.length) {
        missing++;
        console.log(`missing ${p}: ${m.join(", ")}`);
      }
    }
    console.log(`\n${missing} of ${paths.length} images have missing variants`);
    process.exitCode = missing ? 1 : 0;
    return;
  }

  const counts = { done: 0, skipped: 0, failed: 0 };
  const queue = [...paths];
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      for (let p = queue.shift(); p; p = queue.shift()) counts[await process1(p)]++;
    }),
  );
  console.log(
    `\n${counts.done} rendered, ${counts.skipped} already present, ${counts.failed} failed`,
  );
  if (counts.failed) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
