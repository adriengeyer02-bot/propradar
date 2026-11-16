import { createHash } from 'node:crypto';
import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
import { isLocale } from '../../lib/locales';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'private, no-store, max-age=0' } });
}

export async function POST(request: NextRequest) {
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return json({ ok: false, error: 'Invalid request' }, 415);
  }

  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid JSON' }, 400);
  }

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return json({ ok: false, error: 'Invalid request' }, 400);
  }

  const input = data as Record<string, unknown>;
  // Honeypot: bots filling the hidden field receive a harmless success response.
  if (typeof input.website === 'string' && input.website.length > 0) return json({ ok: true });
  if (input.consent !== true || typeof input.email !== 'string' || typeof input.locale !== 'string' || !isLocale(input.locale)) {
    return json({ ok: false, error: 'Email, language and explicit consent are required' }, 400);
  }

  const email = input.email.trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: 'Invalid email address' }, 400);
  }

  const digest = createHash('sha256').update(email).digest('hex');
  const pathname = `newsletter/subscribers/${digest}.json`;

  try {
    await put(pathname, JSON.stringify({
      email,
      locale: input.locale,
      consentedAt: new Date().toISOString(),
      consentSource: 'propradar-footer-newsletter',
    }), {
      access: 'private',
      addRandomSuffix: false,
      allowOverwrite: false,
      contentType: 'application/json',
    });
    return json({ ok: true });
  } catch (error) {
    // Do not reveal whether an address is already on the mailing list.
    if (error instanceof Error && /already exist|conflict|409/i.test(error.message)) return json({ ok: true });
    console.error('Newsletter subscription storage failed', error instanceof Error ? error.name : 'Unknown error');
    return json({ ok: false, error: 'Newsletter is temporarily unavailable' }, 503);
  }
}
