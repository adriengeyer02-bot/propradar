import { priceLabel, profitSplitLabel, propFirms, type PropFirm } from './propFirms';
import { buildRadar, radarTone, RADAR_CENTER, type RadarTone } from './radar';
import { selectGuideFirms, type SeoGuide } from './seoGuides';
import { firmLogoFor } from './firmLogos';

/**
 * Data for the guide covers (cards, guide heroes, home). Everything shown is
 * read from the firm files at build time; schematic covers carry no numbers.
 * The output is plain data so client components can render it too.
 */

export type CoverDot = { slug: string; name: string; score: number; tone: RadarTone; x: number; y: number };

export type CoverFirm = {
  slug: string;
  name: string;
  score: number;
  tone: RadarTone;
  logo?: string;
  price: string;
  split: string;
  trustpilot: string;
};

export type CoverBin = { label: string; count: number; tone?: 'risk' };

export type SchematicCover = 'drawdown' | 'consistency' | 'news' | 'payout' | 'proof' | 'legal' | 'lanes';

export type GuideCoverData =
  | { kind: 'radar'; id: string; background: string; dividers: string; rings: number[]; highlights: CoverDot[]; labelled: CoverDot[]; total: number; linked: number }
  | { kind: 'versus'; id: string; firms: CoverFirm[] }
  | { kind: 'histogram'; id: string; title: string; bins: CoverBin[]; total: number }
  | { kind: SchematicCover; id: string };

/** Mini radar: the 640 px radar scaled into a 400 x 220 frame. */
const MINI = { cx: 200, cy: 112, scale: 100 / 250 };
const mini = (value: number, centre: number) => Math.round((centre + (value - RADAR_CENTER) * MINI.scale) * 10) / 10;

let radarCache: ReturnType<typeof buildRadar> | undefined;
function radar() {
  radarCache ??= buildRadar(propFirms);
  return radarCache;
}

const SCHEMATIC: Record<string, SchematicCover> = {
  'prop-firm-drawdown': 'drawdown',
  'prop-firm-sans-consistency-rule': 'consistency',
  'prop-firm-news-trading': 'news',
  'prop-firm-payout-rapide': 'payout',
  'prop-firm-payout-proof': 'proof',
  'prop-firm-legal-check': 'legal',
  'prop-firm-sans-challenge': 'lanes',
};

const PROFILE: Record<string, string> = {
  'topstep-review': 'topstep',
  'leveraged-prop-firm-avis': 'get-leveraged',
  'goat-funded-trader-avis': 'goat-funded-trader',
};

function trustpilotShort(firm: PropFirm) {
  if (firm.reviewSignals.trustpilotRatingWithheld) return 'Withheld';
  return firm.trustpilotRating ? `${firm.trustpilotRating}/5` : 'Not read';
}

function coverFirm(firm: PropFirm): CoverFirm {
  return {
    slug: firm.slug,
    name: firm.name,
    score: firm.score,
    tone: radarTone(firm.score),
    logo: firmLogoFor(firm.logoDomain)?.src,
    price: priceLabel(firm),
    split: profitSplitLabel(firm),
    trustpilot: trustpilotShort(firm),
  };
}

const isOpen = (firm: PropFirm) => firm.status !== 'Fermée';

function priceBins(): { bins: CoverBin[]; total: number } {
  const prices = propFirms.filter((firm) => isOpen(firm) && firm.priceFrom > 0).map((firm) => firm.priceFrom);
  const edges: [string, number, number][] = [
    ['≤ $50', 0, 50],
    ['$51–100', 50, 100],
    ['$101–200', 100, 200],
    ['$201–300', 200, 300],
    ['$301–500', 300, 500],
    ['> $500', 500, Infinity],
  ];
  return {
    bins: edges.map(([label, low, high]) => ({ label, count: prices.filter((price) => price > low && price <= high).length })),
    total: prices.length,
  };
}

function trustBins(): { bins: CoverBin[]; total: number } {
  const open = propFirms.filter(isOpen);
  const rated = open
    .filter((firm) => firm.trustpilotRating && !firm.reviewSignals.trustpilotRatingWithheld)
    .map((firm) => firm.trustpilotRating as number);
  const withheld = open.filter((firm) => firm.reviewSignals.trustpilotRatingWithheld).length;
  const edges: [string, number, number][] = [
    ['< 3.5', 0, 3.5],
    ['3.5–3.9', 3.5, 4],
    ['4.0–4.4', 4, 4.5],
    ['4.5–5', 4.5, 5.01],
  ];
  return {
    bins: [
      ...edges.map(([label, low, high]) => ({ label, count: rated.filter((rating) => rating >= low && rating < high).length })),
      { label: 'Withheld', count: withheld, tone: 'risk' as const },
    ],
    total: rated.length + withheld,
  };
}

function volumeBins(): { bins: CoverBin[]; total: number } {
  const counts = propFirms
    .filter((firm) => isOpen(firm) && firm.trustpilotRating && !firm.reviewSignals.trustpilotRatingWithheld)
    .map((firm) => firm.reviewSignals.trustpilotReviewCount)
    .filter((count): count is number => typeof count === 'number' && count > 0);
  const edges: [string, number, number][] = [
    ['< 100', 0, 100],
    ['100–999', 100, 1000],
    ['1k–9.9k', 1000, 10000],
    ['10k+', 10000, Infinity],
  ];
  return {
    bins: edges.map(([label, low, high]) => ({ label, count: counts.filter((count) => count >= low && count < high).length })),
    total: counts.length,
  };
}

const MAX_HIGHLIGHTS = 20;

export function buildGuideCover(guide: SeoGuide): GuideCoverData {
  const id = `gc-${guide.slug}`;

  const schematic = SCHEMATIC[guide.slug];
  if (schematic) return { kind: schematic, id };

  if (guide.slug === 'prop-firm-pas-cher') {
    const { bins, total } = priceBins();
    return { kind: 'histogram', id, title: 'Lowest listed entry price', bins, total };
  }
  if (guide.slug === 'prop-firm-avis-reddit-trustpilot') {
    const { bins, total } = volumeBins();
    return { kind: 'histogram', id, title: 'Trustpilot review volume, open firms', bins, total };
  }
  if (guide.slug === 'prop-firm-fiable-trustpilot') {
    const { bins, total } = trustBins();
    return { kind: 'histogram', id, title: 'Trustpilot rating, open firms', bins, total };
  }

  const profileSlug = PROFILE[guide.slug];
  if (profileSlug) {
    const firm = propFirms.find((candidate) => candidate.slug === profileSlug);
    if (firm) return { kind: 'versus', id, firms: [coverFirm(firm)] };
  }

  const firms = selectGuideFirms(guide, propFirms.length);
  if (guide.intent === 'comparer' && firms.length === 2) {
    return { kind: 'versus', id, firms: firms.map(coverFirm) };
  }

  const data = radar();
  const linked = new Set(firms.map((firm) => firm.slug));
  const wanted = new Set(
    data.dots
      .filter((dot) => linked.has(dot.slug))
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_HIGHLIGHTS)
      .map((dot) => dot.slug),
  );
  const toCover = (dot: { slug: string; name: string; score: number; tone: RadarTone; x: number; y: number }): CoverDot => ({
    slug: dot.slug,
    name: dot.name,
    score: dot.score,
    tone: dot.tone,
    x: mini(dot.x, MINI.cx),
    y: mini(dot.y, MINI.cy),
  });
  const highlights = data.dots.filter((dot) => wanted.has(dot.slug)).map(toCover);
  const background = data.dots
    .filter((dot) => !wanted.has(dot.slug))
    .map((dot) => `M${mini(dot.x, MINI.cx)} ${mini(dot.y, MINI.cy)}h0`)
    .join('');
  const dividers = data.sectors
    .map((sector) => {
      const t = ((sector.start - 90) * Math.PI) / 180;
      const x = MINI.cx + 100 * Math.cos(t);
      const y = MINI.cy + 100 * Math.sin(t);
      return `M${MINI.cx} ${MINI.cy}L${Math.round(x * 10) / 10} ${Math.round(y * 10) / 10}`;
    })
    .join('');
  const labelled = [...highlights].sort((a, b) => b.score - a.score).slice(0, 4);

  return {
    kind: 'radar',
    id,
    background,
    dividers,
    rings: [90, 75, 55].map((score) => Math.round((16 + (100 - score) * 2.34) * MINI.scale * 10) / 10),
    highlights,
    labelled,
    total: data.dots.length,
    linked: data.dots.filter((dot) => linked.has(dot.slug)).length,
  };
}
