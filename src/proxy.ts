import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/server/auth.config";

/**
 * Gate for /admin pages plus a login rate limit. Uses the database-free auth
 * config so this stays small. Every admin mutation still calls requireAdmin().
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
      return NextResponse.redirect(new URL("/admin/login?error=RateLimited", request.nextUrl));
    }
    return NextResponse.next();
  }

  const isProtected = pathname.startsWith("/admin") && pathname !== "/admin/login";

  if (isProtected && !request.auth?.user) {
    const login = new URL("/admin/login", request.nextUrl);
    login.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(login);
  }

  if (pathname === "/admin/login" && request.auth?.user) {
    return NextResponse.redirect(new URL("/admin", request.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/api/auth/callback/credentials"],
};
