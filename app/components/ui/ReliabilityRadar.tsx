import type { PropFirm } from '../../lib/propFirms';
import { reliabilityAxes } from '../../lib/reliabilityProfile';
import type { Messages } from '../../lib/messages/en';

type RadarLabels = Messages['firm']['relradar'] & { values: Record<string, string> };

function localize(display: string, labels?: RadarLabels) {
  if (!labels) return display;
  if (display === 'Not assessed') return labels.notAssessed;
  if (display === 'Rating withheld') return labels.withheld;
  if (display === 'Review alert on file') return labels.alert;
  const risk = display.match(/^(.*) risk$/);
  if (risk) return labels.riskSuffix.replace('{level}', labels.values[risk[1]] ?? risk[1]);
  return labels.values[display] ?? display;
}

type ReliabilityRadarProps = {
  firms: PropFirm[];
  /** Show the category under each axis label (single-firm view). */
  showValues?: boolean;
  size?: number;
  caption?: string;
  labels?: RadarLabels;
};

const SERIES = ['pr-series-1', 'pr-series-2', 'pr-series-3'];

function point(cx: number, cy: number, radius: number, index: number, count: number) {
  const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
  return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
}

/**
 * Reliability profile as a radar: one shape per firm, the bigger the safer.
 * Up to three firms can be overlaid for a side-by-side reading.
 */
export default function ReliabilityRadar({ firms, showValues = false, size = 320, caption, labels }: ReliabilityRadarProps) {
  const shown = firms.slice(0, 3);
  if (!shown.length) return null;
  const axesByFirm = shown.map((firm) =>
    reliabilityAxes(firm).map((axis) => ({
      ...axis,
      label: labels ? (labels.axes as Record<string, string>)[axis.label] ?? axis.label : axis.label,
      display: localize(axis.display, labels),
    })),
  );
  const axes = axesByFirm[0];
  const count = axes.length;
  const pad = showValues ? 104 : 112;
  const box = size + pad * 2;
  const cx = box / 2;
  const cy = box / 2;
  const radius = size / 2;
  const rings = [0.25, 0.5, 0.75, 1];

  const summary = shown
    .map((firm, index) => `${firm.name}: ${axesByFirm[index].map((axis) => `${axis.label} ${axis.display}`).join(', ')}`)
    .join('. ');

  return (
    <figure className="pr-relradar">
      <svg viewBox={`0 0 ${box} ${box}`} role="img" aria-label={`${labels?.aria ?? 'Reliability profile.'} ${summary}.`}>
        {rings.map((ring) => (
          <polygon
            key={ring}
            className="pr-relradar-ring"
            points={axes.map((_, index) => {
              const { x, y } = point(cx, cy, radius * ring, index, count);
              return `${x},${y}`;
            }).join(' ')}
          />
        ))}
        {axes.map((axis, index) => {
          const end = point(cx, cy, radius, index, count);
          return <line key={axis.key} className="pr-relradar-axis" x1={cx} y1={cy} x2={end.x} y2={end.y} />;
        })}

        {axesByFirm.map((firmAxes, seriesIndex) => (
          <g key={shown[seriesIndex].slug} className={`pr-relradar-series ${SERIES[seriesIndex]}`}>
            <polygon
              className="pr-relradar-shape"
              points={firmAxes.map((axis, index) => {
                const { x, y } = point(cx, cy, radius * (axis.value / 100), index, count);
                return `${x},${y}`;
              }).join(' ')}
            />
            {firmAxes.map((axis, index) => {
              const { x, y } = point(cx, cy, radius * (axis.value / 100), index, count);
              return <circle key={axis.key} className={`pr-relradar-dot${axis.estimated ? ' is-estimate' : ''}`} cx={x} cy={y} r={axis.estimated ? 4.5 : 4} />;
            })}
          </g>
        ))}

        {axes.map((axis, index) => {
          const label = point(cx, cy, radius + 22, index, count);
          const anchor = Math.abs(label.x - cx) < 6 ? 'middle' : label.x > cx ? 'start' : 'end';
          const dy = label.y < cy - radius * 0.5 ? -4 : label.y > cy + radius * 0.5 ? 14 : 4;
          const single = axesByFirm[0][index];
          return (
            <text key={axis.key} x={label.x} y={label.y + dy} textAnchor={anchor} className="pr-relradar-label">
              {axis.label}
              {showValues ? (
                <tspan x={label.x} dy="17" className="pr-relradar-value">
                  {single.estimated ? '≈ ' : ''}
                  {single.display}
                </tspan>
              ) : null}
            </text>
          );
        })}
      </svg>
      {shown.length > 1 ? (
        <figcaption className="pr-relradar-legend">
          {shown.map((firm, index) => (
            <span key={firm.slug} className={SERIES[index]}>
              <i aria-hidden="true" />
              {firm.name} · {firm.score}/100
            </span>
          ))}
        </figcaption>
      ) : null}
      <p className="pr-relradar-note">
        {caption ?? labels?.caption ?? 'Bigger shape = safer on that axis.'}
        {axesByFirm.some((firmAxes) => firmAxes.some((axis) => axis.estimated)) ? labels?.hollow ?? ' Hollow dot = provisional value.' : ''}
      </p>
    </figure>
  );
}
