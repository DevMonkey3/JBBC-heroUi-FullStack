/**
 * Pre-request every optimized image on every public page so the first visitor
 * never waits for the optimizer. Run after deploy, or locally after `next dev`.
 *   npm run warm            (defaults to http://localhost:3000)
 *   npm run warm -- https://jbbc.co.jp
 */
const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");

async function pagePaths(): Promise<string[]> {
  const xml = await (await fetch(`${base}/sitemap.xml`)).text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  return urls.length ? urls : ["/"];
}

function imageUrls(html: string): string[] {
  const set = new Set<string>();
  for (const m of html.matchAll(/\/_next\/image\?[^"'\s>]+/g)) {
    set.add(m[0].replace(/&amp;/g, "&"));
  }
  return [...set];
}

async function warm(url: string) {
  const started = Date.now();
  const res = await fetch(`${base}${url}`, { headers: { Accept: "image/avif,image/webp" } });
  return { ok: res.ok, ms: Date.now() - started };
}

async function main() {
  const paths = await pagePaths();
  let total = 0;
  let failed = 0;
  for (const path of paths) {
    const html = await (await fetch(`${base}${path}`)).text();
    const urls = imageUrls(html);
    let slow = 0;
    // A few at a time so the server is not flooded.
    for (let i = 0; i < urls.length; i += 4) {
      const results = await Promise.all(urls.slice(i, i + 4).map(warm));
      for (const r of results) {
        if (!r.ok) failed++;
        if (r.ms > 500) slow++;
      }
    }
    total += urls.length;
    console.log(
      `${path.padEnd(12)} ${String(urls.length).padStart(3)} images, ${slow} resized now`,
    );
  }
  console.log(`\n${total} image variants warm, ${failed} failed`);
  if (failed) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
