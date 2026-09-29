import type { NextAuthConfig } from "next-auth";

/**
 * Auth.js config that is safe to load in proxy.ts: no database, no bcrypt.
 * The credentials provider itself is added in auth.ts.
 */
export const authConfig = {
  // Required off Vercel: the app runs behind DigitalOcean's proxy and locally.
  trustHost: true,
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (token.id) session.user.id = token.id as string;
      if (token.role) session.user.role = token.role as "ADMIN" | "EDITOR";
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
