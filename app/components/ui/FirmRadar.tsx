import Link from 'next/link';
import type { PropFirm } from '../../lib/propFirms';
import { scoreTone } from '../../lib/riskTone';

type FirmRadarProps = {
  firms: PropFirm[];
  highlighted: PropFirm[];
};

const SIZE = 400;
const CENTER = SIZE / 2;
const RINGS = [90, 75, 55];

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
 * Every tracked firm on one radar: the closer to the centre, the higher the
 * PropRadar score. Colour follows the shared risk scale.
 */
export default function FirmRadar({ firms, highlighted }: FirmRadarProps) {
  const highlightSlugs = new Set(highlighted.map((firm) => firm.slug));
  const counts = { good: 0, watch: 0, risk: 0 };
  firms.forEach((firm) => {
    counts[firm.status === 'Fermée' ? 'risk' : scoreTone(firm.score)] += 1;
  });

  return (
    <figure className="pr-radar">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label={`${firms.length} prop firms placed by PropRadar score: ${counts.good} low risk, ${counts.watch} to watch, ${counts.risk} high risk or closed.`}>
        <defs>
          <radialGradient id="pr-radar-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" className="pr-radar-bg-center" />
            <stop offset="100%" className="pr-radar-bg-edge" />
          </radialGradient>
          <linearGradient id="pr-radar-sweep" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" className="pr-radar-sweep-start" />
            <stop offset="100%" className="pr-radar-sweep-end" />
          </linearGradient>
        </defs>

        <circle cx={CENTER} cy={CENTER} r={190} fill="url(#pr-radar-bg)" className="pr-radar-disc" />
        {RINGS.map((score) => (
          <g key={score}>
            <circle cx={CENTER} cy={CENTER} r={radiusFor(score)} className="pr-radar-ring" />
            <text x={CENTER + 4} y={CENTER - radiusFor(score) + 13} className="pr-radar-ring-label">{score}</text>
          </g>
        ))}
        <circle cx={CENTER} cy={CENTER} r={190} className="pr-radar-ring pr-radar-ring-outer" />
        <line x1={CENTER} y1={10} x2={CENTER} y2={SIZE - 10} className="pr-radar-axis" />
        <line x1={10} y1={CENTER} x2={SIZE - 10} y2={CENTER} className="pr-radar-axis" />

        <g className="pr-radar-sweep" aria-hidden="true">
          <path d={`M${CENTER},${CENTER} L${CENTER},${CENTER - 190} A190,190 0 0,1 ${point(190, 38).x},${point(190, 38).y} Z`} fill="url(#pr-radar-sweep)" />
        </g>

        {firms
          .filter((firm) => !highlightSlugs.has(firm.slug))
          .map((firm) => {
            const { x, y } = point(radiusFor(firm.score), angleFor(firm.slug));
            const tone = firm.status === 'Fermée' ? 'risk' : scoreTone(firm.score);
            return <circle key={firm.slug} cx={x} cy={y} r={3.2} className={`pr-radar-dot pr-tone-${tone}`} />;
          })}

        {highlighted.map((firm, index) => {
          const { x, y } = point(radiusFor(firm.score), HIGHLIGHT_ANGLES[index % HIGHLIGHT_ANGLES.length]);
          return (
            <Link href={`/firm/${firm.slug}`} key={firm.slug} aria-label={`${firm.name}, score ${firm.score}`}>
              <g className={`pr-radar-pin pr-tone-${scoreTone(firm.score)}`}>
                <circle cx={x} cy={y} r={13} className="pr-radar-pin-halo" />
                <circle cx={x} cy={y} r={10} className="pr-radar-pin-dot" />
                <text x={x} y={y + 4} textAnchor="middle">{index + 1}</text>
              </g>
            </Link>
          );
        })}
      </svg>
      <figcaption className="pr-radar-legend">
        <span><i className="pr-pip-dot pr-tone-good" aria-hidden="true" />{counts.good} low risk</span>
        <span><i className="pr-pip-dot pr-tone-watch" aria-hidden="true" />{counts.watch} to watch</span>
        <span><i className="pr-pip-dot pr-tone-risk" aria-hidden="true" />{counts.risk} high risk or closed</span>
        <small>Closer to the centre = higher score</small>
      </figcaption>
    </figure>
  );
}
