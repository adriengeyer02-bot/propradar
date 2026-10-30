import type { PropFirm } from '../../lib/propFirms';
import { scoreTone, type Tone } from '../../lib/riskTone';
import FirmRadarLive, { type RadarDot } from './FirmRadarLive';

type FirmRadarProps = {
  firms: PropFirm[];
  highlighted: PropFirm[];
};

const SIZE = 400;
const CENTER = SIZE / 2;

/** Distance from the centre: the higher the score, the closer to the centre. */
function radiusFor(score: number) {
  return Math.min(184, 14 + (100 - Math.max(0, score)) * 2.5);
}

/** Stable pseudo-random angle per firm so the radar does not reshuffle between builds. */
function angleFor(slug: string) {
  let hash = 0;
  for (const char of slug) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return (hash % 3600) / 10;
}

const HIGHLIGHT_ANGLES = [305, 65, 185];

function point(radius: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CENTER + radius * Math.cos(rad), y: CENTER + radius * Math.sin(rad) };
}

/**
 * Red is kept for closed firms. An open firm under 55 is grey: a low score
 * means the file is thin or weak, not that a failure is documented.
 */
function toneFor(firm: PropFirm): Tone {
  if (firm.status === 'Fermée') return 'risk';
  const tone = scoreTone(firm.score);
  return tone === 'risk' ? 'none' : tone;
}

const STATUS_LABEL: Record<PropFirm['status'], string> = {
  Active: 'Active',
  'À surveiller': 'Watchlist',
  Fermée: 'Closed',
};

/**
 * Every tracked firm on one radar: the closer to the centre, the higher the
 * PropRadar score. Colour follows the shared risk scale. Geometry is computed
 * here (server side) so the client component only receives plain data.
 */
export default function FirmRadar({ firms, highlighted }: FirmRadarProps) {
  const highlightSlugs = highlighted.map((firm) => firm.slug);
  const dots: RadarDot[] = firms.map((firm) => {
    const pinIndex = highlightSlugs.indexOf(firm.slug);
    const angle = pinIndex >= 0 ? HIGHLIGHT_ANGLES[pinIndex % HIGHLIGHT_ANGLES.length] : angleFor(firm.slug);
    const radius = radiusFor(firm.score);
    const { x, y } = point(radius, angle);
    return {
      slug: firm.slug,
      name: firm.name,
      score: firm.score,
      status: STATUS_LABEL[firm.status] ?? firm.status,
      reviewed: firm.lastReviewed,
      tone: toneFor(firm),
      angle,
      radius,
      x: Math.round(x * 10) / 10,
      y: Math.round(y * 10) / 10,
      pin: pinIndex >= 0 ? pinIndex + 1 : 0,
    };
  });

  return <FirmRadarLive dots={dots} />;
}
