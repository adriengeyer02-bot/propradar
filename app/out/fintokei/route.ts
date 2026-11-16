import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Country-specific links supplied by PropRadar's owner on 16 November 2026.
// All six locales preserve the same Fintokei affiliate identifier.
const BASE = 'https://www.fintokei.com/';
const AFFILIATE = '?affiliate=2534';
const LOCALIZED_PATHS: Record<string, string> = {
  CZ: 'cz/',
  JP: 'jp/',
  IT: 'it/',
  PL: 'pl/',
  SK: 'sk/',
};

// Fintokei's official eligibility FAQ, checked on 16 November 2026.
// IP geolocation is only a convenience; eligibility also depends on
// residence/citizenship and must be determined by Fintokei at checkout.
const RESTRICTED_COUNTRIES = new Set([
  // Countries not currently served, including temporarily restricted.
  'AF', 'BY', 'CU', 'IN', 'IR', 'IQ', 'MM', 'KP', 'RU', 'SO', 'SS', 'SD', 'SY', 'US', 'VE', 'YE',
  'BD', 'CN', 'PK', 'VN',
  // Countries where Fintokei currently disallows new purchases.
  'KH', 'ET', 'GH', 'ID', 'KE', 'MY', 'MA', 'NG', 'PH', 'SA', 'SN', 'ZA', 'TH', 'TR', 'UA', 'AE',
]);

const ELIGIBILITY_URL = 'https://support.fintokei.com/en/articles/6538820-who-can-join-fintokei';

export function GET(request: NextRequest) {
  const country = (request.headers.get('x-vercel-ip-country') ?? '').trim().toUpperCase();
  const destination = RESTRICTED_COUNTRIES.has(country)
    ? ELIGIBILITY_URL
    : `${BASE}${LOCALIZED_PATHS[country] ?? ''}${AFFILIATE}`;

  const response = NextResponse.redirect(destination, { status: 307 });
  response.headers.set('Cache-Control', 'private, no-store, max-age=0');
  response.headers.set('Vary', 'x-vercel-ip-country');
  return response;
}
