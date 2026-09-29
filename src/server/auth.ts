import "server-only";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/server/db";
import { authConfig } from "@/server/auth.config";

const credentialsSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(raw) {
        const parsed = credentialsSchema.safeParse(raw);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const user = await db.adminUser.findUnique({ where: { email: email.toLowerCase() } });
        if (!user) return null;

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;

        await db.adminUser.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });

        return { id: user.id, email: user.email, name: user.name ?? "Admin", role: user.role };
      },
    }),
  ],
});

export type AdminRole = "ADMIN" | "EDITOR";

export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

/**
 * Call at the top of every admin server action and admin route handler.
 * Proxy protects the pages; this protects the mutations.
 */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) throw new UnauthorizedError();
  return session.user;
}

/** Like requireAdmin, but only the given roles may continue. */
export async function requireRole(...roles: AdminRole[]) {
  const user = await requireAdmin();
  if (!roles.includes(user.role)) throw new UnauthorizedError("Forbidden");
  return user;
}

export const isAdmin = (role: AdminRole | undefined) => role === "ADMIN";
