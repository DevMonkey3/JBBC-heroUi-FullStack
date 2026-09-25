/**
 * Create or reset an admin user.
 *   npm run admin:create
 * Reads DATABASE_URL from .env.local (loaded by the npm script).
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

const db = new PrismaClient();
const rl = createInterface({ input: stdin, output: stdout });

async function main() {
  const email = (await rl.question("Email: ")).trim().toLowerCase();
  if (!email.includes("@")) throw new Error("Invalid email");

  const name = (await rl.question("Name (optional): ")).trim() || null;
  const password = await rl.question("Password (min 12 chars): ");
  if (password.length < 12) throw new Error("Password too short");

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await db.adminUser.upsert({
    where: { email },
    update: { passwordHash, ...(name ? { name } : {}) },
    create: { email, name, passwordHash, role: "ADMIN" },
  });

  console.log(`\nAdmin ready: ${user.email} (${user.id})`);
}

main()
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exitCode = 1;
  })
  .finally(async () => {
    rl.close();
    await db.$disconnect();
  });
