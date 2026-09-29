import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/server/auth.config";
import { ADMIN_PATH, ADMIN_LOGIN_PATH } from "@/config/admin";

/**
 * Gate for the admin area plus a login rate limit. Uses the database-free
 * auth config so this stays small. Every admin mutation still calls
 * requireAdmin() itself.
 */
const { auth } = NextAuth(authConfig);

// In-memory sliding window for login attempts, per IP. Fine for one instance.
const attempts = new Map<string, number[]>();
const LOGIN_LIMIT = 10;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

function loginRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((t) => now - t < LOGIN_WINDOW_MS);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > LOGIN_LIMIT;
}

export default auth((request) => {
  const { pathname } = request.nextUrl;

  if (pathname === "/api/auth/callback/credentials" && request.method === "POST") {
    const ip =
      request.headers.get("cf-connecting-ip") ??
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";
    if (loginRateLimited(ip)) {
      return NextResponse.redirect(
        new URL(`${ADMIN_LOGIN_PATH}?error=RateLimited`, request.nextUrl),
      );
    }
    return NextResponse.next();
  }

  const isProtected = pathname.startsWith(ADMIN_PATH) && pathname !== ADMIN_LOGIN_PATH;

  if (isProtected && !request.auth?.user) {
    const login = new URL(ADMIN_LOGIN_PATH, request.nextUrl);
    login.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(login);
  }

  if (pathname === ADMIN_LOGIN_PATH && request.auth?.user) {
    return NextResponse.redirect(new URL(ADMIN_PATH, request.nextUrl));
  }

  return NextResponse.next();
});

// Must be string literals: Next.js reads them at build time. Keep the first
// entry equal to ADMIN_PATH in src/config/admin.ts (a test enforces this).
export const config = {
  matcher: ["/jbbc-console-7h3k9d/:path*", "/api/auth/callback/credentials"],
};
