import { NextResponse, type NextRequest } from 'next/server';
import { DEFAULT_LOCALE, LOCALE_COOKIE, PREFIXED_LOCALES, isLocale, isTranslatedPath } from './app/lib/locales';

/**
 * English is served at the root (internally rewritten to /en/...), the other
 * languages under their prefix. A visitor who picked a language in the
 * selector (cookie) is sent to that language when following an English link.
 * Crawlers carry no cookie, so they always see stable URLs.
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const first = pathname.split('/')[1];

  // /en/... is never a public URL: send it to the unprefixed English path.
  if (first === DEFAULT_LOCALE) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || '/';
    return NextResponse.redirect(url, 308);
  }

  if ((PREFIXED_LOCALES as readonly string[]).includes(first)) {
    const response = NextResponse.next();
    // Pages still in English under a language prefix: kept out of the index
    // (their canonical already points to the English URL).
    const path = pathname.slice(first.length + 1) || '/';
    if (!path.includes('/opengraph-image') && !isTranslatedPath(path)) response.headers.set('X-Robots-Tag', 'noindex, follow');
    return response;
  }

  const chosen = request.cookies.get(LOCALE_COOKIE)?.value;
  const isPageRequest = request.method === 'GET' && !pathname.includes('/opengraph-image');
  if (isPageRequest && isLocale(chosen) && chosen !== DEFAULT_LOCALE) {
    const url = request.nextUrl.clone();
    url.pathname = pathname === '/' ? `/${chosen}` : `/${chosen}${pathname}`;
    return NextResponse.redirect(url, 307);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  url.search = search;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, API routes and any path with a file extension
  // (sitemap.xml, robots.txt, feed.xml, data.csv, logos, icons...).
  matcher: ['/((?!_next/|api/|.*\\.[a-zA-Z0-9]+$).*)'],
};
