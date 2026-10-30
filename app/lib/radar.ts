import type { PropFirm } from './propFirms';
import { firmLogoFor } from './firmLogos';
import { getClosureRecord } from './closures';

/**
 * Geometry for the PropRadar radar: every tracked firm on one disc.
 * - Angle = market. Each slice is as wide as the number of open firms in it
 *   (with a floor so a small market stays visible).
 * - Distance from the centre = PropRadar score (closer = higher).
 * - Dot size = Trustpilot review count (log scale), only when it was read.
 * - Closed firms sit on an outer orbit, in closure-date order.
 * Everything is computed server side; the client only receives plain data.
 */

export const RADAR_SIZE = 640;
export const RADAR_CENTER = RADAR_SIZE / 2;
export const RADAR_OUTER = 250;
export const RADAR_ORBIT = 292;
export const RADAR_RINGS = [90, 75, 55] as const;

export const SECTORS = ['Forex & CFD', 'Multi-asset', 'Futures', 'Crypto', 'Stocks'] as const;
export type Sector = (typeof SECTORS)[number];
export type RadarTone = 'good' | 'watch' | 'none';

export type RadarDot = {
  slug: string;
  name: string;
  score: number;
  status: 'Active' | 'Watchlist';
  sector: Sector;
  tone: RadarTone;
  angle: number;
  radius: number;
  x: number;
  y: number;
  size: number;
  reviewed: string;
  trustpilot: string;
  withheld: boolean;
  logo?: string;
};

export type RadarClosed = {
  slug: string;
  name: string;
  score: number;
  closed?: string;
  x: number;
  y: number;
  angle: number;
};

export type RadarSector = {
  key: Sector;
  start: number;
  end: number;
  count: number;
  average: number;
  top: { slug: string; name: string; score: number; tone: RadarTone }[];
};

export type RadarData = {
  dots: RadarDot[];
  closed: RadarClosed[];
  sectors: RadarSector[];
  counts: Record<RadarTone | 'closed', number>;
  latest: string;
  total: number;
};

/** Main market of a firm, from the markets listed on its file. */
export function radarSector(firm: Pick<PropFirm, 'styles'>): Sector {
  const text = firm.styles.join(' ').toLowerCase();
  const futures = text.includes('futures');
  const fx = /forex|cfd|indices/.test(text);
  const crypto = text.includes('crypto');
  const stocks = /stock|actions|equit/.test(text);
  if (futures && !fx) return 'Futures';
  if (crypto && !fx && !futures) return 'Crypto';
  if (stocks && !fx && !futures) return 'Stocks';
  if (futures && fx) return 'Multi-asset';
  return 'Forex & CFD';
}

export function radarTone(score: number): RadarTone {
  if (score >= 75) return 'good';
  if (score >= 55) return 'watch';
  return 'none';
}

/** Distance from the centre for a score: 100 sits near the middle, 0 on the rim. */
export function radarRadius(score: number) {
  return 16 + (100 - Math.max(0, Math.min(100, score))) * 2.34;
}

export function radarPoint(radius: number, angle: number) {
  const t = ((angle - 90) * Math.PI) / 180;
  return { x: RADAR_CENTER + radius * Math.cos(t), y: RADAR_CENTER + radius * Math.sin(t) };
}

/** Stable 0-1 value per string, so the radar does not reshuffle between builds. */
function unit(seed: string) {
  let h = 2166136261;
  for (const char of seed) {
    h ^= char.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

const round = (value: number) => Math.round(value * 10) / 10;

function trustpilotText(firm: PropFirm) {
  if (firm.reviewSignals.trustpilotRatingWithheld) return 'Withheld';
  if (!firm.trustpilotRating) return 'Not checked';
  const count = firm.reviewSignals.trustpilotReviewCount;
  return `${firm.trustpilotRating}/5${count ? ` · ${count.toLocaleString('en-US')} reviews` : ''}`;
}

export function buildRadar(firms: PropFirm[]): RadarData {
  const open = firms.filter((firm) => firm.status !== 'Fermée');
  const closed = firms.filter((firm) => firm.status === 'Fermée');

  const GAP = 2.5;
  const MIN = 16;
  const available = 360 - GAP * SECTORS.length;
  const counts = SECTORS.map((key) => open.filter((firm) => radarSector(firm) === key).length);
  const spans = counts.map((count) => Math.max(MIN, (count / Math.max(1, open.length)) * available));
  const largest = spans.indexOf(Math.max(...spans));
  spans[largest] -= spans.reduce((sum, span) => sum + span, 0) - available;

  let cursor = -spans[0] / 2;
  const sectors: RadarSector[] = SECTORS.map((key, index) => {
    const members = open.filter((firm) => radarSector(firm) === key);
    const sector: RadarSector = {
      key,
      start: round(cursor),
      end: round(cursor + spans[index]),
      count: members.length,
      average: Math.round(members.reduce((sum, firm) => sum + firm.score, 0) / Math.max(1, members.length)),
      top: [...members]
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map((firm) => ({ slug: firm.slug, name: firm.name, score: firm.score, tone: radarTone(firm.score) })),
    };
    cursor += spans[index] + GAP;
    return sector;
  });

  const dots: RadarDot[] = open.map((firm) => {
    const sectorKey = radarSector(firm);
    const sector = sectors.find((item) => item.key === sectorKey) as RadarSector;
    const span = sector.end - sector.start;
    const angle = (((sector.start + span * (0.07 + 0.86 * unit(firm.slug))) % 360) + 360) % 360;
    const radius = radarRadius(firm.score) + (unit(`${firm.slug}:r`) - 0.5) * 6;
    const count = firm.reviewSignals.trustpilotReviewCount;
    const size = count && firm.trustpilotRating ? Math.min(8, 2.8 + Math.log10(count) * 1.25) : 2.8;
    const { x, y } = radarPoint(radius, angle);
    return {
      slug: firm.slug,
      name: firm.name,
      score: firm.score,
      status: firm.status === 'Active' ? 'Active' : 'Watchlist',
      sector: sectorKey,
      tone: radarTone(firm.score),
      angle: round(angle),
      radius: round(radius),
      x: round(x),
      y: round(y),
      size: round(size),
      reviewed: firm.lastReviewed,
      trustpilot: trustpilotText(firm),
      withheld: Boolean(firm.reviewSignals.trustpilotRatingWithheld),
      logo: firmLogoFor(firm.logoDomain)?.src,
    };
  });

  const closedSorted = closed
    .map((firm) => ({ firm, date: getClosureRecord(firm.slug)?.date }))
    .sort((a, b) => (a.date ?? '9999').localeCompare(b.date ?? '9999') || a.firm.name.localeCompare(b.firm.name));
  const closedDots: RadarClosed[] = closedSorted.map(({ firm, date }, index) => {
    const angle = 20 + index * (320 / Math.max(1, closedSorted.length - 1));
    const { x, y } = radarPoint(RADAR_ORBIT, angle);
    return { slug: firm.slug, name: firm.name, score: firm.score, closed: date, x: round(x), y: round(y), angle: round(angle) };
  });

  return {
    dots,
    closed: closedDots,
    sectors,
    counts: {
      good: dots.filter((dot) => dot.tone === 'good').length,
      watch: dots.filter((dot) => dot.tone === 'watch').length,
      none: dots.filter((dot) => dot.tone === 'none').length,
      closed: closedDots.length,
    },
    latest: firms.reduce((latest, firm) => (firm.lastReviewed > latest ? firm.lastReviewed : latest), ''),
    total: firms.length,
  };
}
