import type { PropFirm } from './propFirms';

export type CommunityProvider = 'reddit' | 'x';
export type CommunitySentiment = 'positive' | 'negative' | 'neutral';
export type CommunitySignalLabel = 'Positif' | 'Mixte' | 'Négatif' | 'Faible volume';
export type CommunityConfidence = 'Faible' | 'Moyenne' | 'Forte';
export type CommunitySignalStatus = 'live' | 'fallback' | 'error';

export type CommunitySignalItem = {
  id: string;
  provider: CommunityProvider;
  title: string;
  text: string;
  url: string;
  createdAt: string | null;
  sentiment: CommunitySentiment;
  score?: number;
  context?: string;
  metrics?: Record<string, number>;
};

export type CommunitySignalSummary = {
  provider: CommunityProvider;
  label: string;
  configured: boolean;
  status: CommunitySignalStatus;
  query: string;
  score: number;
  signal: CommunitySignalLabel;
  positive: number;
  negative: number;
  neutral: number;
  sampleSize: number;
  confidence: CommunityConfidence;
  source: string;
  updatedAt: string;
  items: CommunitySignalItem[];
  error?: string;
};

type RedditTokenCache = {
  token: string;
  expiresAt: number;
};

type RedditSearchResponse = {
  data?: {
    children?: Array<{
      data?: RedditPost;
    }>;
  };
};

type RedditPost = {
  id?: string;
  title?: string;
  selftext?: string;
  permalink?: string;
  created_utc?: number;
  score?: number;
  num_comments?: number;
  subreddit?: string;
  author?: string;
};

type XRecentSearchResponse = {
  data?: XPost[];
  meta?: {
    result_count?: number;
  };
  errors?: Array<{
    title?: string;
    detail?: string;
  }>;
};

type XPost = {
  id?: string;
  text?: string;
  created_at?: string;
  author_id?: string;
  lang?: string;
  public_metrics?: {
    retweet_count?: number;
    reply_count?: number;
    like_count?: number;
    quote_count?: number;
    impression_count?: number;
  };
};

const REQUEST_TIMEOUT_MS = 9000;
const DEFAULT_LIMIT = 25;
const REDDIT_TOKEN_SAFETY_WINDOW_MS = 60_000;

const positiveKeywords = [
  'approved',
  'fast payout',
  'fiable',
  'good support',
  'great support',
  'legit',
  'paid',
  'paid out',
  'payout proof',
  'reliable',
  'retrait reçu',
  'solide',
  'withdrawal approved',
];

const negativeKeywords = [
  'ban',
  'banned',
  'blocked',
  'breach',
  'breached',
  'complaint',
  'delayed',
  'denied',
  'fermé',
  'not paid',
  'no payout',
  'payout denied',
  'problem',
  'refus',
  'scam',
  'slippage',
  'warning',
  'withdrawal problem',
];

let redditTokenCache: RedditTokenCache | null = null;

export function parseSignalLimit(value: string | null, fallback = DEFAULT_LIMIT) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return Math.min(Math.floor(parsed), 100);
}

export function isRedditConfigured() {
  return Boolean(process.env.REDDIT_CLIENT_ID && process.env.REDDIT_CLIENT_SECRET);
}

export function isXConfigured() {
  return Boolean(process.env.X_BEARER_TOKEN || process.env.TWITTER_BEARER_TOKEN);
}

export function buildRedditQuery(firm: PropFirm) {
  return `"${sanitizeQueryTerm(firm.name)}" payout OR withdrawal OR funded OR review OR scam OR complaint OR rules`;
}

export function buildXQuery(firm: PropFirm) {
  return `"${sanitizeQueryTerm(firm.name)}" (payout OR withdrawal OR funded OR review OR scam OR complaint OR rules) -is:retweet`;
}

export async function fetchRedditSignals(firm: PropFirm, limit = DEFAULT_LIMIT): Promise<CommunitySignalSummary> {
  const query = buildRedditQuery(firm);

  if (!isRedditConfigured()) {
    return fallbackSummary('reddit', firm, query, false, 'Clés Reddit absentes');
  }

  try {
    const token = await getRedditAccessToken();
    const url = new URL('https://oauth.reddit.com/search');
    url.searchParams.set('q', query);
    url.searchParams.set('sort', 'new');
    url.searchParams.set('limit', String(Math.min(limit, 100)));
    url.searchParams.set('raw_json', '1');
    url.searchParams.set('type', 'link');

    const payload = await fetchJson<RedditSearchResponse>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Agent': redditUserAgent(),
      },
    });

    const items = (payload.data?.children ?? [])
      .map((child) => child.data)
      .filter((post): post is RedditPost => Boolean(post?.id))
      .map((post) => redditPostToSignalItem(post))
      .slice(0, limit);

    return summaryFromItems('reddit', firm, query, true, items);
  } catch (error) {
    return fallbackSummary('reddit', firm, query, true, errorMessage(error));
  }
}

export async function fetchXSignals(firm: PropFirm, limit = DEFAULT_LIMIT): Promise<CommunitySignalSummary> {
  const query = buildXQuery(firm);
  const bearerToken = process.env.X_BEARER_TOKEN || process.env.TWITTER_BEARER_TOKEN;

  if (!bearerToken) {
    return fallbackSummary('x', firm, query, false, 'Clé X/Twitter absente');
  }

  try {
    const url = new URL('https://api.x.com/2/tweets/search/recent');
    url.searchParams.set('query', query);
    url.searchParams.set('tweet.fields', 'created_at,public_metrics,lang,author_id');
    url.searchParams.set('max_results', String(Math.max(10, Math.min(limit, 100))));

    const payload = await fetchJson<XRecentSearchResponse>(url, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    const apiError = payload.errors?.[0]?.detail ?? payload.errors?.[0]?.title;
    if (apiError && !payload.data?.length) {
      throw new Error(apiError);
    }

    const items = (payload.data ?? []).map((post) => xPostToSignalItem(post)).slice(0, limit);
    return summaryFromItems('x', firm, query, true, items);
  } catch (error) {
    return fallbackSummary('x', firm, query, true, errorMessage(error));
  }
}

function redditUserAgent() {
  return process.env.REDDIT_USER_AGENT || 'PropRadar/1.0 community-signal-monitor';
}

async function getRedditAccessToken() {
  if (redditTokenCache && redditTokenCache.expiresAt > Date.now() + REDDIT_TOKEN_SAFETY_WINDOW_MS) {
    return redditTokenCache.token;
  }

  const clientId = process.env.REDDIT_CLIENT_ID;
  const clientSecret = process.env.REDDIT_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Configuration Reddit incomplète');
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const body = new URLSearchParams({ grant_type: 'client_credentials' });

  const payload = await fetchJson<{ access_token?: string; expires_in?: number }>('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': redditUserAgent(),
    },
    body,
  });

  if (!payload.access_token) {
    throw new Error('Token Reddit absent dans la réponse API');
  }

  redditTokenCache = {
    token: payload.access_token,
    expiresAt: Date.now() + (payload.expires_in ?? 3600) * 1000,
  };

  return redditTokenCache.token;
}

async function fetchJson<T>(url: string | URL, init: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      ...init,
      cache: 'no-store',
      signal: controller.signal,
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      throw new Error(`${response.status} ${response.statusText}${detail ? ` - ${detail.slice(0, 220)}` : ''}`);
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

function redditPostToSignalItem(post: RedditPost): CommunitySignalItem {
  const title = post.title ?? 'Post Reddit';
  const text = [title, post.selftext].filter(Boolean).join(' ');

  return {
    id: post.id ?? title,
    provider: 'reddit',
    title,
    text: post.selftext ?? '',
    url: post.permalink ? `https://www.reddit.com${post.permalink}` : 'https://www.reddit.com/search/',
    createdAt: typeof post.created_utc === 'number' ? new Date(post.created_utc * 1000).toISOString() : null,
    sentiment: sentimentForText(text),
    score: post.score,
    context: post.subreddit ? `r/${post.subreddit}` : post.author,
    metrics: {
      comments: post.num_comments ?? 0,
      upvotes: post.score ?? 0,
    },
  };
}

function xPostToSignalItem(post: XPost): CommunitySignalItem {
  const text = post.text ?? '';

  return {
    id: post.id ?? text.slice(0, 32),
    provider: 'x',
    title: text.slice(0, 96) || 'Post X/Twitter',
    text,
    url: post.id ? `https://x.com/i/web/status/${post.id}` : 'https://x.com/search',
    createdAt: post.created_at ?? null,
    sentiment: sentimentForText(text),
    context: post.lang ? `lang:${post.lang}` : post.author_id,
    metrics: {
      likes: post.public_metrics?.like_count ?? 0,
      replies: post.public_metrics?.reply_count ?? 0,
      reposts: post.public_metrics?.retweet_count ?? 0,
      quotes: post.public_metrics?.quote_count ?? 0,
    },
  };
}

function summaryFromItems(
  provider: CommunityProvider,
  firm: PropFirm,
  query: string,
  configured: boolean,
  items: CommunitySignalItem[],
): CommunitySignalSummary {
  if (!items.length) {
    return fallbackSummary(provider, firm, query, configured, 'Aucun résultat API exploitable pour cette requête');
  }

  const positive = items.filter((item) => item.sentiment === 'positive').length;
  const negative = items.filter((item) => item.sentiment === 'negative').length;
  const neutral = items.length - positive - negative;
  const score = scoreFromCounts(positive, negative, items.length);

  return {
    provider,
    label: providerLabel(provider),
    configured,
    status: 'live',
    query,
    score,
    signal: signalFromScore(score, items.length),
    positive,
    negative,
    neutral,
    sampleSize: items.length,
    confidence: confidenceFromSample(items.length),
    source: provider === 'reddit' ? 'API Reddit OAuth' : 'API X recent search',
    updatedAt: new Date().toISOString(),
    items,
  };
}

function fallbackSummary(
  provider: CommunityProvider,
  firm: PropFirm,
  query: string,
  configured: boolean,
  reason: string,
): CommunitySignalSummary {
  const isReddit = provider === 'reddit';
  const positive = isReddit ? firm.reviewSignals.redditPositiveMentions ?? 0 : firm.reviewSignals.xPositiveMentions ?? 0;
  const negative = isReddit ? firm.reviewSignals.redditNegativeMentions ?? 0 : firm.reviewSignals.xNegativeMentions ?? 0;
  const neutral = isReddit ? firm.reviewSignals.redditNeutralMentions ?? 0 : firm.reviewSignals.xNeutralMentions ?? 0;
  const sampleSize = isReddit ? firm.reviewSignals.redditSampleSize ?? 0 : firm.reviewSignals.xSampleSize ?? 0;
  const score = isReddit ? firm.reviewSignals.redditScore : firm.reviewSignals.xScore;

  return {
    provider,
    label: providerLabel(provider),
    configured,
    status: configured ? 'error' : 'fallback',
    query,
    score,
    signal: isReddit ? firm.reviewSignals.redditSignal : firm.reviewSignals.xSignal,
    positive,
    negative,
    neutral,
    sampleSize,
    confidence: isReddit ? firm.reviewSignals.redditConfidence ?? 'Faible' : firm.reviewSignals.xConfidence ?? 'Faible',
    source: configured ? 'Fallback PropRadar après erreur API' : 'Fallback PropRadar estimé',
    updatedAt: new Date().toISOString(),
    items: [],
    error: reason,
  };
}

function sentimentForText(value: string): CommunitySentiment {
  const text = normalizeForSearch(value);
  const positive = positiveKeywords.reduce((count, keyword) => count + countKeyword(text, keyword), 0);
  const negative = negativeKeywords.reduce((count, keyword) => count + countKeyword(text, keyword), 0);

  if (positive > negative) return 'positive';
  if (negative > positive) return 'negative';
  return 'neutral';
}

function scoreFromCounts(positive: number, negative: number, sampleSize: number) {
  if (sampleSize <= 0) return 50;
  const directionalScore = 50 + ((positive - negative) / sampleSize) * 45;
  return Math.max(5, Math.min(95, Math.round(directionalScore)));
}

function signalFromScore(score: number, sampleSize: number): CommunitySignalLabel {
  if (sampleSize < 5) return 'Faible volume';
  if (score >= 75) return 'Positif';
  if (score >= 55) return 'Mixte';
  return 'Négatif';
}

function confidenceFromSample(sampleSize: number): CommunityConfidence {
  if (sampleSize >= 60) return 'Forte';
  if (sampleSize >= 20) return 'Moyenne';
  return 'Faible';
}

function providerLabel(provider: CommunityProvider) {
  return provider === 'reddit' ? 'Reddit' : 'X/Twitter';
}

function sanitizeQueryTerm(value: string) {
  return value.replace(/["“”]/g, '').trim();
}

function normalizeForSearch(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function countKeyword(text: string, keyword: string) {
  const normalizedKeyword = normalizeForSearch(keyword);
  if (!normalizedKeyword) return 0;
  return text.includes(normalizedKeyword) ? 1 : 0;
}

function errorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return 'Erreur API inconnue';
}
