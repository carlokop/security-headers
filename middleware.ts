import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const pathLangMap: Record<string, string> = {
  '/': 'nl',
  '/index.html': 'nl',
  '/eng': 'en',
  '/de': 'de',
  '/fr': 'fr',
  '/sp': 'es',
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Find the language corresponding to the requested public path
  const lang = pathLangMap[pathname];

  if (lang) {
    // Rewrite the URL to the internal `/[lang]` structure
    const url = request.nextUrl.clone();
    url.pathname = `/${lang}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  // Run middleware on all paths except for static assets and API routes
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ],
};