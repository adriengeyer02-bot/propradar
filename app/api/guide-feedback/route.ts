import { createHash } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { getSeoGuideBySlug } from '../../lib/seoGuides';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MINIMUM_PUBLIC_VOTES = 10;
const VOTE_TTL_SECONDS = 365 * 24 * 60 * 60;
const validVotes = new Set(['helpful', 'needs-work']);
const validReasons = new Set(['missing-detail', 'hard-to-scan', 'outdated']);

type RedisResult<T> = {
  result?: T;
  error?: string;
};

type FeedbackCounts = {
  helpful: number;
  needsWork: number;
  missingDetail: number;
  hardToScan: number;
  outdated: number;
};

const recordVoteScript = `
local inserted = redis.call('SET', KEYS[1], '1', 'EX', ARGV[3], 'NX')
if not inserted then
  return 0
end
redis.call('HINCRBY', KEYS[2], ARGV[1], 1)
if ARGV[2] ~= '' then
  redis.call('HINCRBY', KEYS[2], 'reason:' .. ARGV[2], 1)
end
return 1
`;

function feedbackStorage() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) return null;
  return { url: url.replace(/\/$/, ''), token };
}

async function redisCommand<T>(command: Array<string | number>) {
  const storage = feedbackStorage();
  if (!storage) throw new Error('Feedback storage is not configured');

  const response = await fetch(storage.url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${storage.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
    cache: 'no-store',
  });

  if (!response.ok) throw new Error(`Feedback storage returned ${response.status}`);
  const data = await response.json() as RedisResult<T>;
  if (data.error) throw new Error(data.error);
  return data.result;
}

function numeric(value: string | number | null | undefined) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

async function readCounts(slug: string): Promise<FeedbackCounts> {
  const values = await redisCommand<Array<string | number | null>>([
    'HMGET',
    `guide-feedback:${slug}`,
    'helpful',
    'needs-work',
    'reason:missing-detail',
    'reason:hard-to-scan',
    'reason:outdated',
  ]);

  return {
    helpful: numeric(values?.[0]),
    needsWork: numeric(values?.[1]),
    missingDetail: numeric(values?.[2]),
    hardToScan: numeric(values?.[3]),
    outdated: numeric(values?.[4]),
  };
}

function publicPayload(counts: FeedbackCounts) {
  const total = counts.helpful + counts.needsWork;
  return {
    configured: true,
    helpful: counts.helpful,
    needsWork: counts.needsWork,
    total,
    helpfulPercent: total >= MINIMUM_PUBLIC_VOTES ? Math.round((counts.helpful / total) * 100) : null,
    minimumPublicVotes: MINIMUM_PUBLIC_VOTES,
  };
}

function noStoreJson(data: unknown, init?: ResponseInit) {
  const response = NextResponse.json(data, init);
  response.headers.set('Cache-Control', 'private, no-store, max-age=0');
  return response;
}

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug')?.trim() ?? '';

  if (!getSeoGuideBySlug(slug)) {
    return noStoreJson({ error: 'Unknown guide' }, { status: 404 });
  }

  if (!feedbackStorage()) {
    return noStoreJson({
      configured: false,
      helpful: 0,
      needsWork: 0,
      total: 0,
      helpfulPercent: null,
      minimumPublicVotes: MINIMUM_PUBLIC_VOTES,
    });
  }

  try {
    return noStoreJson(publicPayload(await readCounts(slug)));
  } catch {
    return noStoreJson({ error: 'Feedback is temporarily unavailable' }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  if (!feedbackStorage()) {
    return noStoreJson({ error: 'Feedback storage is not configured' }, { status: 503 });
  }

  let body: { slug?: unknown; vote?: unknown; reason?: unknown; voterId?: unknown };
  try {
    body = await request.json();
  } catch {
    return noStoreJson({ error: 'Invalid request' }, { status: 400 });
  }

  const slug = typeof body.slug === 'string' ? body.slug.trim() : '';
  const vote = typeof body.vote === 'string' ? body.vote : '';
  const reason = typeof body.reason === 'string' ? body.reason : '';
  const voterId = typeof body.voterId === 'string' ? body.voterId.trim() : '';

  if (!getSeoGuideBySlug(slug) || !validVotes.has(vote) || voterId.length < 12 || voterId.length > 100) {
    return noStoreJson({ error: 'Invalid feedback' }, { status: 400 });
  }

  if (reason && (vote !== 'needs-work' || !validReasons.has(reason))) {
    return noStoreJson({ error: 'Invalid feedback reason' }, { status: 400 });
  }

  const voterHash = createHash('sha256').update(`${slug}:${voterId}`).digest('hex');
  const voterKey = `guide-feedback-voter:${slug}:${voterHash}`;
  const totalsKey = `guide-feedback:${slug}`;

  try {
    const accepted = await redisCommand<number>([
      'EVAL',
      recordVoteScript,
      2,
      voterKey,
      totalsKey,
      vote,
      reason,
      VOTE_TTL_SECONDS,
    ]);
    const counts = await readCounts(slug);

    return noStoreJson({
      ...publicPayload(counts),
      accepted: accepted === 1,
    });
  } catch {
    return noStoreJson({ error: 'Feedback is temporarily unavailable' }, { status: 503 });
  }
}
