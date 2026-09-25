/**
 * Verifies every external service configured in .env.local.
 *   npm run check:services
 *
 * Read-only except Google Sheets, where it appends one timestamped test row
 * to each configured sheet so you can confirm the connection end to end.
 */
import { PrismaClient } from "@prisma/client";
import { google } from "googleapis";
import { Resend } from "resend";
import { S3Client, HeadBucketCommand } from "@aws-sdk/client-s3";

type Result = { name: string; ok: boolean; detail: string };
const results: Result[] = [];

function env(key: string): string | undefined {
  const v = process.env[key];
  return v && v.trim() !== "" ? v : undefined;
}

async function run(name: string, fn: () => Promise<string>) {
  try {
    results.push({ name, ok: true, detail: await fn() });
  } catch (err) {
    results.push({ name, ok: false, detail: err instanceof Error ? err.message : String(err) });
  }
}

async function skip(name: string, reason: string) {
  results.push({ name, ok: false, detail: `skipped: ${reason}` });
}

async function main() {
  // --- Required ---
  const authSecret = env("AUTH_SECRET");
  results.push({
    name: "AUTH_SECRET",
    ok: Boolean(authSecret && authSecret.length >= 16),
    detail: authSecret ? `${authSecret.length} chars` : "missing",
  });

  if (env("DATABASE_URL")) {
    await run("MongoDB", async () => {
      const db = new PrismaClient();
      try {
        const [admins, posts, seminars, subs] = await Promise.all([
          db.adminUser.count(),
          db.blogPost.count(),
          db.seminar.count(),
          db.subscription.count(),
        ]);
        return `connected. admins=${admins} posts=${posts} seminars=${seminars} subscribers=${subs}`;
      } finally {
        await db.$disconnect();
      }
    });
  } else {
    await skip("MongoDB", "DATABASE_URL not set");
  }

  // --- Resend (read-only) ---
  if (env("RESEND_API_KEY")) {
    await run("Resend", async () => {
      const resend = new Resend(env("RESEND_API_KEY"));
      const { data, error } = await resend.domains.list();
      if (error) throw new Error(error.message);
      const domains = data?.data ?? [];
      if (domains.length === 0) return "key valid, no domains verified yet";
      return `key valid. domains: ${domains.map((d) => `${d.name} (${d.status})`).join(", ")}`;
    });
  } else {
    await skip("Resend", "RESEND_API_KEY not set");
  }

  // --- Google Sheets (writes one test row per sheet) ---
  const saEmail = env("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  const saKey = env("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY");
  if (saEmail && saKey) {
    const auth = new google.auth.GoogleAuth({
      credentials: { client_email: saEmail, private_key: saKey.replace(/\\n/g, "\n") },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });
    const stamp = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });

    for (const target of ["INQUIRY", "SEMINAR", "DOWNLOAD"] as const) {
      const id = env(`GOOGLE_SHEET_ID_${target}`);
      const name = `Sheet ${target}`;
      if (!id) {
        await skip(name, `GOOGLE_SHEET_ID_${target} not set`);
        continue;
      }
      await run(name, async () => {
        const meta = await sheets.spreadsheets.get({ spreadsheetId: id });
        const title = meta.data.properties?.title ?? "(untitled)";
        await sheets.spreadsheets.values.append({
          spreadsheetId: id,
          range: "Sheet1!A:Z",
          valueInputOption: "USER_ENTERED",
          requestBody: { values: [[stamp, "check-services", "test row, safe to delete"]] },
        });
        return `"${title}" reachable, test row appended`;
      });
    }
  } else {
    await skip("Google Sheets", "service account email or private key not set");
  }

  // --- DigitalOcean Spaces (read-only) ---
  if (env("SPACES_ACCESS_KEY_ID") && env("SPACES_SECRET_KEY")) {
    await run("Spaces", async () => {
      const client = new S3Client({
        endpoint: env("SPACES_ENDPOINT") ?? "https://sgp1.digitaloceanspaces.com",
        region: env("SPACES_REGION") ?? "sgp1",
        credentials: {
          accessKeyId: env("SPACES_ACCESS_KEY_ID")!,
          secretAccessKey: env("SPACES_SECRET_KEY")!,
        },
      });
      const bucket = env("SPACES_BUCKET") ?? "bbc-images";
      await client.send(new HeadBucketCommand({ Bucket: bucket }));
      return `bucket "${bucket}" reachable`;
    });
  } else {
    await skip("Spaces", "SPACES_ACCESS_KEY_ID or SPACES_SECRET_KEY not set");
  }

  // --- Report ---
  console.log("");
  for (const r of results) {
    const mark = r.ok ? "PASS" : r.detail.startsWith("skipped") ? "SKIP" : "FAIL";
    console.log(`${mark.padEnd(5)} ${r.name.padEnd(16)} ${r.detail}`);
  }
  console.log("");
  const failed = results.filter((r) => !r.ok && !r.detail.startsWith("skipped"));
  if (failed.length > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
