import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/server/auth.config";

/**
 * Gate for /admin pages. Uses the database-free auth config so this stays
 * small. Every admin mutation still calls requireAdmin() itself.
 */
const { auth } = NextAuth(authConfig);

export default auth((request) => {
  const { pathname } = request.nextUrl;
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
  matcher: ["/admin/:path*"],
};
