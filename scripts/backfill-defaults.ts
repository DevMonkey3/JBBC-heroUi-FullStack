/**
 * One-time backfill for fields added by the rewrite.
 *   npm run db:backfill
 *
 * Existing documents predate the `status` and `role` fields. Prisma fills
 * defaults on read, but MongoDB filters like `status = PUBLISHED` skip
 * documents that lack the field entirely. This stamps the default value onto
 * every document that is missing it. Idempotent and safe to rerun.
 */
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const content = ["BlogPost", "Announcement", "Newsletter", "Seminar"] as const;

async function main() {
  for (const model of content) {
    const res = (await db.$runCommandRaw({
      update: model,
      updates: [
        {
          q: { status: { $exists: false } },
          u: { $set: { status: "PUBLISHED" } },
          multi: true,
        },
      ],
    })) as { nModified?: number; n?: number };
    console.log(`${model.padEnd(13)} matched=${res.n ?? 0} updated=${res.nModified ?? 0}`);
  }

  const admins = (await db.$runCommandRaw({
    update: "AdminUser",
    updates: [{ q: { role: { $exists: false } }, u: { $set: { role: "ADMIN" } }, multi: true }],
  })) as { nModified?: number; n?: number };
  console.log(
    `${"AdminUser".padEnd(13)} matched=${admins.n ?? 0} updated=${admins.nModified ?? 0}`,
  );

  // Verify the app-level query now sees everything.
  const [posts, published] = await Promise.all([
    db.blogPost.count(),
    db.blogPost.count({ where: { status: "PUBLISHED" } }),
  ]);
  console.log(`\nblog posts: ${published}/${posts} visible to published filter`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
