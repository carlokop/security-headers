import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware is disabled because the application is configured for static export (`output: 'export'`).
// Middleware is not supported in a static build. Routing is now handled by Next.js's static generation of pages.
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    // No paths matched, effectively disabling the middleware.
  ],
};
