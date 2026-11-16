import { createHash, randomUUID } from 'node:crypto';
import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
import { getFirmBySlug } from '../../lib/propFirms';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: { 'Cache-Control': 'private, no-store, max-age=0' } });
}

async function rateLimited(request: NextRequest, slug: string) {
  const redisUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!redisUrl || !token) return false;
  const ip = request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const key = `source-submission-rate:${createHash('sha256').update(`${ip}:${slug}`).digest('hex')}`;
  const response = await fetch(redisUrl.replace(/\/$/, ''), {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(['SET', key, '1', 'EX', 120, 'NX']),
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('Source submission rate limiter unavailable');
  const data = await response.json() as { result?: 'OK' | null; error?: string };
  if (data.error) throw new Error('Source submission rate limiter unavailable');
  return data.result !== 'OK';
}

export async function POST(request: NextRequest) {
  if (!request.headers.get('content-type')?.includes('application/json')) return json({ ok: false }, 415);
  if (Number(request.headers.get('content-length')) > 6000) return json({ ok: false }, 413);
  let body: unknown;
  try { body = await request.json(); } catch { return json({ ok: false }, 400); }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return json({ ok: false }, 400);
  const { slug, url, detail, website } = body as Record<string, unknown>;
  // Honeypot: don't store automated submissions.
  if (typeof website === 'string' && website.length > 0) return json({ ok: true });
  if (typeof slug !== 'string' || typeof url !== 'string' || typeof detail !== 'string' || slug.length > 120 || url.length > 2048 || detail.length > 1500 || !getFirmBySlug(slug)) {
    return json({ ok: false }, 400);
  }
  let parsed: URL;
  try { parsed = new URL(url); } catch { return json({ ok: false }, 400); }
  if (!['http:', 'https:'].includes(parsed.protocol) || !parsed.hostname.includes('.')) return json({ ok: false }, 400);
  try {
    if (await rateLimited(request, slug)) return json({ ok: false, error: 'Too many submissions' }, 429);
    const filename = `source-submissions/${new Date().toISOString().slice(0, 10)}/${randomUUID()}.json`;
    await put(filename, JSON.stringify({
      firmSlug: slug,
      firmName: getFirmBySlug(slug)?.name,
      sourceUrl: parsed.toString(),
      details: detail.trim(),
      submittedAt: new Date().toISOString(),
      reviewed: false,
    }), { access: 'private', addRandomSuffix: false, contentType: 'application/json' });
    return json({ ok: true });
  } catch (error) {
    console.error('Source submission storage failed', error instanceof Error ? error.name : 'Unknown error');
    return json({ ok: false }, 503);
  }
}
