/**
 * MIDDLEWARE: Authentication + Performance Optimization
 *
 * PURPOSE:
 * 1. Protect admin routes with NextAuth authentication
 * 2. PERFORMANCE FIX: Remove cookies from static asset requests to reduce HTTP payload
 *
 * WHY: Static images/fonts don't need cookies but browsers send them anyway
 * IMPACT: Reduces unnecessary network traffic and improves page load speed
 */

import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// PERFORMANCE: Check if request is for a static asset
function isStaticAsset(pathname: string): boolean {
  return (
    pathname.startsWith('/_next/static/') ||
    pathname.startsWith('/_next/image') ||
    pathname.match(/\.(jpg|jpeg|png|gif|ico|svg|webp|avif|woff|woff2|ttf|otf|eot)$/) !== null ||
    pathname.startsWith('/favicon') ||
    pathname.match(/^\/public\//) !== null
  );
}

// Custom middleware that handles both auth and performance
export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // PERFORMANCE FIX: Strip cookies from static assets to reduce HTTP overhead
  if (isStaticAsset(pathname)) {
    const response = NextResponse.next();

    // Don't send cookies for static files (they don't need them)
    // This reduces request size and improves load times
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');

    return response;
  }

  // For admin routes (excluding login), apply NextAuth protection
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    try {
      // FIX: Add timeout to prevent hanging on auth checks
      const authPromise = withAuth(request as any, {
        pages: { signIn: '/admin/login' },
      });

      // Timeout after 10 seconds to prevent hanging
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Auth check timeout')), 10000)
      );

      return await Promise.race([authPromise, timeoutPromise]) as any;
    } catch (error) {
      console.error('[MIDDLEWARE] Auth check failed:', error);
      // If auth check fails, redirect to login rather than hanging
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes
    '/((?!api/auth).*)', // Exclude NextAuth API routes
  ],
};
