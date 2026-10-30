import type { ReactNode } from 'react';
import type { CoverDot, CoverFirm, GuideCoverData } from '../../lib/guideCovers';

/**
 * Guide cover in the radar visual language. Pure SVG, no hooks: it renders on
 * the server and inside client components alike. Radar, versus and histogram
 * covers are drawn from the firm files; schematic covers carry no numbers.
 */

const W = 400;
const H = 220;

function truncate(text: string, max = 15) {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

function Frame({ id, children, label }: { id: string; children: ReactNode; label: string }) {
  return (
    <svg className="gc-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0b1626" />
          <stop offset="1" stopColor="#10263a" />
        </linearGradient>
        <pattern id={`${id}-grid`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="rgba(54,214,231,0.07)" strokeWidth="1" />
        </pattern>
        <radialGradient id={`${id}-glow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="rgba(54,214,231,0.16)" />
          <stop offset="1" stopColor="rgba(54,214,231,0)" />
        </radialGradient>
        <linearGradient id={`${id}-sweep`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="rgba(54,214,231,0)" />
          <stop offset="1" stopColor="rgba(54,214,231,0.28)" />
        </linearGradient>
        <linearGradient id={`${id}-bar`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#36d6e7" />
          <stop offset="1" stopColor="#0b7285" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-bg)`} />
      <rect width={W} height={H} fill={`url(#${id}-grid)`} />
      {children}
    </svg>
  );
}

/* ---------------------------------------------------------------- radar */

function placeLabels(dots: CoverDot[]) {
  const sides = { left: [] as CoverDot[], right: [] as CoverDot[] };
  for (const dot of dots) (dot.x < 200 ? sides.left : sides.right).push(dot);
  // Balance the two columns so labels never pile up on one side.
  while (sides.left.length - sides.right.length > 1) sides.right.push(sides.left.pop() as CoverDot);
  while (sides.right.length - sides.left.length > 1) sides.left.push(sides.right.pop() as CoverDot);
  const place = (list: CoverDot[]) => {
    const sorted = [...list].sort((a, b) => a.y - b.y);
    let last = 34;
    return sorted.map((dot) => {
      const y = Math.min(200, Math.max(last + 40, dot.y, 56));
      last = y;
      return { dot, y };
    });
  };
  return { left: place(sides.left), right: place(sides.right) };
}

function RadarCover({ data }: { data: Extract<GuideCoverData, { kind: 'radar' }> }) {
  const { id } = data;
  const cx = 200;
  const cy = 112;
  const labels = placeLabels(data.labelled);
  const sweep = (from: number, to: number) => {
    const p = (deg: number) => {
      const t = ((deg - 90) * Math.PI) / 180;
      return `${(cx + 100 * Math.cos(t)).toFixed(1)} ${(cy + 100 * Math.sin(t)).toFixed(1)}`;
    };
    return `M${cx} ${cy}L${p(from)}A100 100 0 0 1 ${p(to)}Z`;
  };
  return (
    <Frame id={id} label={`Radar view: ${data.highlights.length} firms from this guide highlighted among ${data.total} open firms. Closer to the centre means a higher PropRadar score.`}>
      <circle cx={cx} cy={cy} r="128" fill={`url(#${id}-glow)`} />
      <circle cx={cx} cy={cy} r="100" fill="rgba(54,214,231,0.035)" stroke="rgba(54,214,231,0.42)" strokeWidth="1" />
      {data.rings.map((r) => (
        <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke="rgba(54,214,231,0.2)" strokeDasharray="2 4" />
      ))}
      <path d={data.dividers} stroke="rgba(54,214,231,0.13)" strokeWidth="1" />
      <path d={sweep(18, 62)} fill={`url(#${id}-sweep)`} />
      <path d={sweep(61.5, 62)} stroke="rgba(54,214,231,0.7)" strokeWidth="1.2" />
      <path d={data.background} stroke="#7f94ad" strokeOpacity="0.5" strokeWidth="2.6" strokeLinecap="round" />
      {data.highlights.map((dot) => (
        <g key={dot.slug}>
          <circle cx={dot.x} cy={dot.y} r="7.5" className={`gc-tone-${dot.tone}`} fillOpacity="0.18" />
          <circle cx={dot.x} cy={dot.y} r="3.6" className={`gc-tone-${dot.tone}`} stroke="#0b1626" strokeWidth="1" />
        </g>
      ))}
      {(['left', 'right'] as const).map((side) =>
        labels[side].map(({ dot, y }) => {
          const tx = side === 'left' ? 92 : 308;
          const anchor = side === 'left' ? 'end' : 'start';
          const edge = side === 'left' ? 96 : 304;
          return (
            <g key={dot.slug}>
              <path d={`M${dot.x} ${dot.y}L${edge} ${y - 4}`} stroke="rgba(234,240,247,0.32)" strokeWidth="0.8" fill="none" />
              <text x={tx} y={y - 7} textAnchor={anchor} className="gc-label">{truncate(dot.name, side === 'left' ? 14 : 12)}</text>
              <text x={tx} y={y + 7} textAnchor={anchor} className="gc-small">
                <tspan className={`gc-text-${dot.tone}`} fontWeight="700">{dot.score}</tspan>
                <tspan>/100</tspan>
              </text>
            </g>
          );
        }),
      )}
      <text x="14" y="20" className="gc-hud">
        {data.linked > data.highlights.length ? `top ${data.highlights.length} of ${data.linked} in this guide` : `${data.highlights.length} of ${data.total} firms`}
      </text>
      <text x="386" y="20" textAnchor="end" className="gc-hud">closer = higher score</text>
    </Frame>
  );
}

/* --------------------------------------------------------------- versus */

function ScoreRing({ firm, x, y, r, logo, id }: { firm: CoverFirm; x: number; y: number; r: number; logo: number; id: string }) {
  const clip = `${id}-clip-${firm.slug}`;
  return (
    <g>
      <circle cx={x} cy={y} r={r + 14} fill="rgba(54,214,231,0.06)" />
      <circle cx={x} cy={y} r={r} fill="none" stroke="rgba(234,240,247,0.1)" strokeWidth="5" />
      <circle
        cx={x}
        cy={y}
        r={r}
        fill="none"
        className={`gc-stroke-${firm.tone}`}
        strokeWidth="5"
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray={`${firm.score} 100`}
        transform={`rotate(-90 ${x} ${y})`}
      />
      <clipPath id={clip}>
        <rect x={x - logo / 2} y={y - logo / 2} width={logo} height={logo} rx={logo * 0.22} />
      </clipPath>
      <rect x={x - logo / 2} y={y - logo / 2} width={logo} height={logo} rx={logo * 0.22} fill="#ffffff" />
      {firm.logo ? (
        <image href={firm.logo} x={x - logo / 2} y={y - logo / 2} width={logo} height={logo} clipPath={`url(#${clip})`} preserveAspectRatio="xMidYMid slice" />
      ) : (
        <text x={x} y={y + logo * 0.14} textAnchor="middle" className="gc-mono" fontSize={logo * 0.4}>
          {firm.name.slice(0, 2).toUpperCase()}
        </text>
      )}
    </g>
  );
}

function VersusCover({ data }: { data: Extract<GuideCoverData, { kind: 'versus' }> }) {
  const { id, firms } = data;
  if (firms.length === 1) {
    const [firm] = firms;
    const facts: [string, string][] = [
      ['From', firm.price],
      ['Profit split', firm.split],
      ['Trustpilot', firm.trustpilot],
    ];
    return (
      <Frame id={id} label={`${firm.name}: PropRadar score ${firm.score}/100, from ${firm.price}, profit split ${firm.split}, Trustpilot ${firm.trustpilot}.`}>
        <ScoreRing firm={firm} x={104} y={112} r={58} logo={58} id={id} />
        <text x="196" y="58" className="gc-title">{truncate(firm.name, 20)}</text>
        <text x="196" y="80" className="gc-small">PropRadar score</text>
        <text x="196" y="112" className={`gc-big gc-text-${firm.tone}`}>
          {firm.score}
          <tspan className="gc-small" dx="4">/100</tspan>
        </text>
        {facts.map(([label, value], index) => (
          <g key={label}>
            <line x1="196" x2="380" y1={130 + index * 24} y2={130 + index * 24} stroke="rgba(234,240,247,0.1)" />
            <text x="196" y={146 + index * 24} className="gc-small">{label}</text>
            <text x="380" y={146 + index * 24} textAnchor="end" className="gc-value">{value}</text>
          </g>
        ))}
      </Frame>
    );
  }
  const [a, b] = firms;
  const lead = a.score === b.score ? null : a.score > b.score ? a.slug : b.slug;
  return (
    <Frame id={id} label={`${a.name} ${a.score}/100 versus ${b.name} ${b.score}/100.`}>
      <path d="M200 30V196" stroke="rgba(54,214,231,0.22)" strokeDasharray="3 5" />
      {[
        { firm: a, x: 104 },
        { firm: b, x: 296 },
      ].map(({ firm, x }) => (
        <g key={firm.slug}>
          <ScoreRing firm={firm} x={x} y={84} r={42} logo={44} id={id} />
          <text x={x} y={156} textAnchor="middle" className="gc-title">{truncate(firm.name, 16)}</text>
          <text x={x} y={178} textAnchor="middle" className="gc-small">
            <tspan className={`gc-text-${firm.tone}`} fontWeight="700" fontSize="15">{firm.score}</tspan>
            <tspan dx="2">/100{lead === firm.slug ? ' · higher' : ''}</tspan>
          </text>
          <text x={x} y={202} textAnchor="middle" className="gc-small">{`From ${firm.price} · split ${firm.split}`}</text>
        </g>
      ))}
      <circle cx="200" cy="84" r="17" fill="#0b1626" stroke="#36d6e7" strokeWidth="1.2" />
      <text x="200" y="89" textAnchor="middle" className="gc-vs">VS</text>
    </Frame>
  );
}

/* ------------------------------------------------------------ histogram */

function HistogramCover({ data }: { data: Extract<GuideCoverData, { kind: 'histogram' }> }) {
  const { id, bins } = data;
  const max = Math.max(1, ...bins.map((bin) => bin.count));
  const left = 24;
  const width = 352;
  const slot = width / bins.length;
  const barW = Math.min(44, slot - 14);
  const base = 182;
  const top = 70;
  return (
    <Frame id={id} label={`${data.title}: ${bins.map((bin) => `${bin.label} ${bin.count}`).join(', ')}. ${data.total} firms.`}>
      <text x="24" y="30" className="gc-title">{data.title}</text>
      <text x="24" y="48" className="gc-small">{`${data.total} firms with a value read on PropRadar`}</text>
      <line x1={left} x2={left + width} y1={base} y2={base} stroke="rgba(234,240,247,0.25)" />
      {bins.map((bin, index) => {
        const h = Math.max(2, ((base - top) * bin.count) / max);
        const x = left + slot * index + (slot - barW) / 2;
        return (
          <g key={bin.label}>
            <rect
              x={x}
              y={base - h}
              width={barW}
              height={h}
              rx="3"
              fill={bin.tone === 'risk' ? '#f87171' : `url(#${id}-bar)`}
              fillOpacity={bin.count === max || bin.tone === 'risk' ? 1 : 0.62}
            />
            <text x={x + barW / 2} y={base - h - 7} textAnchor="middle" className="gc-value">{bin.count}</text>
            <text x={x + barW / 2} y={base + 18} textAnchor="middle" className="gc-small">{bin.label}</text>
          </g>
        );
      })}
    </Frame>
  );
}

/* ------------------------------------------------------------ schematic */

function Legend({ items, y = 24 }: { items: { label: string; color: string; dash?: boolean }[]; y?: number }) {
  let x = 24;
  return (
    <g>
      {items.map((item) => {
        const start = x;
        x += 30 + item.label.length * 6.2;
        return (
          <g key={item.label}>
            <line x1={start} x2={start + 16} y1={y - 4} y2={y - 4} stroke={item.color} strokeWidth="2.4" strokeDasharray={item.dash ? '4 3' : undefined} />
            <text x={start + 22} y={y} className="gc-small">{item.label}</text>
          </g>
        );
      })}
    </g>
  );
}

function DrawdownCover({ id }: { id: string }) {
  const pts: [number, number][] = [[24, 140], [64, 122], [100, 130], [140, 98], [182, 70], [216, 82], [252, 110], [292, 126], [334, 116], [376, 104]];
  const equity = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join('');
  let peak = Infinity;
  const trailing = pts
    .map(([x, y], i) => {
      peak = Math.min(peak, y);
      const floor = Math.min(peak + 40, 180);
      return `${i ? 'L' : 'M'}${x} ${floor}`;
    })
    .join('');
  return (
    <Frame id={id} label="Schematic: the same balance path against a trailing floor, which rises with the peak and is hit, and a static floor, which stays put.">
      <Legend items={[{ label: 'Balance', color: '#36d6e7' }, { label: 'Trailing floor', color: '#fbbf24' }, { label: 'Static floor', color: '#8da3bd', dash: true }]} />
      <line x1="24" x2="376" y1="180" y2="180" stroke="#8da3bd" strokeWidth="2" strokeDasharray="5 4" />
      <path d={trailing} fill="none" stroke="#fbbf24" strokeWidth="2.2" strokeLinejoin="round" />
      <path d={equity} fill="none" stroke="#36d6e7" strokeWidth="2.8" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="182" cy="70" r="4" fill="#36d6e7" />
      <text x="182" y="58" textAnchor="middle" className="gc-small">peak</text>
      <circle cx="252" cy="110" r="9" fill="rgba(248,113,113,0.2)" />
      <circle cx="252" cy="110" r="4.2" fill="#f87171" />
      <text x="262" y="96" className="gc-value gc-text-risk">trailing floor hit</text>
      <text x="376" y="200" textAnchor="end" className="gc-small">static floor not reached</text>
    </Frame>
  );
}

function ConsistencyCover({ id }: { id: string }) {
  const days = [34, 52, 28, 104, 40, 22, 46, 36, 30];
  const base = 190;
  const cap = 72;
  return (
    <Frame id={id} label="Schematic: daily profits as bars with a cap line; one best day rises above the cap.">
      <Legend items={[{ label: 'Daily profit', color: '#36d6e7' }, { label: 'Consistency cap', color: '#fbbf24', dash: true }]} />
      <line x1="24" x2="376" y1={base} y2={base} stroke="rgba(234,240,247,0.25)" />
      {days.map((h, i) => {
        const over = h > cap;
        const x = 34 + i * 38;
        return (
          <g key={i}>
            <rect x={x} y={base - h} width="24" height={h} rx="3" fill={over ? '#fbbf24' : `url(#${id}-bar)`} fillOpacity={over ? 1 : 0.7} />
            {over ? <rect x={x - 3} y={base - h - 3} width="30" height={h - cap + 3} rx="4" fill="none" stroke="#fbbf24" strokeDasharray="3 3" /> : null}
          </g>
        );
      })}
      <line x1="24" x2="376" y1={base - cap} y2={base - cap} stroke="#fbbf24" strokeWidth="1.6" strokeDasharray="5 4" />
      <text x="174" y={base - 112} className="gc-value gc-text-watch">best day above the cap</text>
    </Frame>
  );
}

function NewsCover({ id }: { id: string }) {
  const pts: [number, number][] = [[24, 128], [52, 122], [80, 132], [108, 118], [136, 126], [164, 116], [184, 120], [196, 74], [206, 160], [218, 92], [232, 134], [252, 104], [280, 112], [308, 100], [336, 108], [376, 96]];
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join('');
  return (
    <Frame id={id} label="Schematic: a price line spikes around a high-impact news release, inside a shaded window where some firms restrict trading.">
      <rect x="170" y="38" width="76" height="152" rx="6" fill="rgba(248,113,113,0.12)" stroke="rgba(248,113,113,0.45)" strokeDasharray="4 4" />
      <line x1="208" x2="208" y1="38" y2="190" stroke="#f87171" strokeWidth="1.2" />
      <path d={line} fill="none" stroke="#36d6e7" strokeWidth="2.6" strokeLinejoin="round" />
      <circle cx="208" cy="30" r="9" fill="#f87171" />
      <text x="208" y="34" textAnchor="middle" className="gc-mono" fontSize="11" fill="#0b1626">!</text>
      <text x="24" y="28" className="gc-title">News release</text>
      <text x="208" y="208" textAnchor="middle" className="gc-small">restricted window (rule varies)</text>
    </Frame>
  );
}

function Node({ x, y, label, sub, tone = 'muted', icon }: { x: number; y: number; label: string; sub?: string; tone?: 'muted' | 'accent' | 'good'; icon?: ReactNode }) {
  const stroke = tone === 'good' ? '#34d399' : tone === 'accent' ? '#36d6e7' : 'rgba(234,240,247,0.4)';
  return (
    <g>
      <circle cx={x} cy={y} r="20" fill="#0b1626" stroke={stroke} strokeWidth="1.6" />
      {tone === 'good' ? <circle cx={x} cy={y} r="26" fill="none" stroke="rgba(52,211,153,0.25)" /> : null}
      <g transform={`translate(${x} ${y})`} stroke={stroke} fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{icon}</g>
      <text x={x} y={y + 40} textAnchor="middle" className="gc-label">{label}</text>
      {sub ? <text x={x} y={y + 54} textAnchor="middle" className="gc-small">{sub}</text> : null}
    </g>
  );
}

const ICONS = {
  send: <path d="M-7 6L7 0L-7-6V-1L2 0L-7 1Z" />,
  search: <><circle cx="-2" cy="-2" r="5" /><path d="M2 2L7 7" /></>,
  check: <path d="M-6 0L-2 4L6-5" />,
  coin: <><circle r="7" /><path d="M0-4V4M-2.5-2H1.5A1.5 1.5 0 0 1 1.5 1H-1.5A1.5 1.5 0 0 0-1.5 4H2.5" /></>,
  radar: <><circle r="7" /><circle r="2" /><path d="M0 0L5-5" /></>,
  building: <path d="M-7 7H7M-5 7V-3L0-7L5-3V7M-2 7V2H2V7" />,
  doc: <path d="M-5-7H3L6-4V7H-5ZM-2-2H3M-2 1H3M-2 4H1" />,
  columns: <path d="M-7 7H7M-6-3H6L0-7ZM-4-2V5M0-2V5M4-2V5" />,
  flag: <path d="M-5 7V-7M-5-6H5L2-2L5 2H-5" />,
};

function Connector({ x1, x2, y, dashed }: { x1: number; x2: number; y: number; dashed?: boolean }) {
  return (
    <g stroke="rgba(54,214,231,0.55)" strokeWidth="1.4" fill="none">
      <path d={`M${x1} ${y}H${x2}`} strokeDasharray={dashed ? '4 4' : undefined} />
      <path d={`M${x2 - 5} ${y - 4}L${x2} ${y}L${x2 - 5} ${y + 4}`} />
    </g>
  );
}

function PayoutCover({ id }: { id: string }) {
  const xs = [56, 152, 248, 344];
  return (
    <Frame id={id} label="Schematic: a payout moves from request to review, approval and payment, then a new cycle starts.">
      <text x="24" y="28" className="gc-title">Payout cycle</text>
      <path d="M344 78C330 34 70 34 56 78" fill="none" stroke="rgba(54,214,231,0.35)" strokeDasharray="4 5" />
      <text x="200" y="52" textAnchor="middle" className="gc-small">next cycle</text>
      {xs.slice(0, -1).map((x, i) => <Connector key={x} x1={x + 24} x2={xs[i + 1] - 24} y={104} />)}
      <Node x={xs[0]} y={104} label="Request" icon={ICONS.send} />
      <Node x={xs[1]} y={104} label="Review" sub="rules checked" icon={ICONS.search} />
      <Node x={xs[2]} y={104} label="Approved" tone="accent" icon={ICONS.check} />
      <Node x={xs[3]} y={104} label="Paid" sub="the proof to look for" tone="good" icon={ICONS.coin} />
    </Frame>
  );
}

function ProofCover({ id }: { id: string }) {
  const cards = [
    { x: 24, y: 64, label: 'Official terms' },
    { x: 48, y: 52, label: 'Independent review' },
    { x: 72, y: 40, label: 'Payout record' },
  ];
  return (
    <Frame id={id} label="Schematic: three kinds of evidence stacked together: official terms, independent reviews and a dated payout record.">
      {cards.map((card, i) => (
        <g key={card.label}>
          <rect x={card.x} y={card.y} width="160" height="120" rx="8" fill={i === 2 ? '#13293f' : '#0f2033'} stroke="rgba(234,240,247,0.18)" />
          <rect x={card.x + 14} y={card.y + 16} width="78" height="7" rx="3.5" fill="rgba(234,240,247,0.55)" />
          {[0, 1, 2].map((line) => (
            <rect key={line} x={card.x + 14} y={card.y + 38 + line * 16} width={120 - line * 22} height="5" rx="2.5" fill="rgba(234,240,247,0.18)" />
          ))}
        </g>
      ))}
      <circle cx="228" cy="46" r="15" fill="#34d399" />
      <path d="M221 46L226 51L235 41" stroke="#0b1626" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {cards
        .slice()
        .reverse()
        .map((card, i) => (
          <g key={card.label}>
            <circle cx="262" cy={100 + i * 30} r="3.5" fill="#36d6e7" />
            <text x="272" y={104 + i * 30} className="gc-label">{card.label}</text>
          </g>
        ))}
    </Frame>
  );
}

function LegalCover({ id }: { id: string }) {
  const xs = [56, 152, 248, 344];
  return (
    <Frame id={id} label="Schematic: the legal chain to trace, from the brand to the operating entity, the company registry and regulator lists.">
      <text x="24" y="28" className="gc-title">Trace the chain</text>
      {xs.slice(0, -1).map((x, i) => <Connector key={x} x1={x + 24} x2={xs[i + 1] - 24} y={100} dashed={i === 2} />)}
      <Node x={xs[0]} y={100} label="Brand" sub="website" tone="accent" icon={ICONS.radar} />
      <Node x={xs[1]} y={100} label="Entity" sub="in the terms" icon={ICONS.building} />
      <Node x={xs[2]} y={100} label="Registry" sub="company record" icon={ICONS.doc} />
      <Node x={xs[3]} y={100} label="Regulators" sub="warning lists" icon={ICONS.columns} />
    </Frame>
  );
}

function LanesCover({ id }: { id: string }) {
  const challenge = [44, 128, 212, 340];
  return (
    <Frame id={id} label="Schematic: a classic challenge goes from payment through two phases to a funded account; direct funding goes from payment straight to a funded account.">
      <text x="24" y="28" className="gc-small">CLASSIC CHALLENGE</text>
      {challenge.slice(0, -1).map((x, i) => <Connector key={x} x1={x + 26} x2={challenge[i + 1] - 26} y={66} />)}
      {[
        ['Pay', challenge[0]],
        ['Phase 1', challenge[1]],
        ['Phase 2', challenge[2]],
      ].map(([label, x]) => (
        <g key={label as string}>
          <rect x={(x as number) - 24} y="52" width="48" height="28" rx="14" fill="#0f2033" stroke="rgba(234,240,247,0.3)" />
          <text x={x as number} y="70" textAnchor="middle" className="gc-small" fill="#eaf0f7">{label}</text>
        </g>
      ))}
      <text x="24" y="128" className="gc-small">DIRECT FUNDING</text>
      <Connector x1={70} x2={314} y={160} />
      <rect x="20" y="146" width="48" height="28" rx="14" fill="#0f2033" stroke="#36d6e7" />
      <text x="44" y="164" textAnchor="middle" className="gc-small" fill="#eaf0f7">Pay</text>
      <text x="190" y="152" textAnchor="middle" className="gc-small">no phases, higher entry price</text>
      {[66, 160].map((y) => (
        <g key={y}>
          <rect x="316" y={y - 14} width="62" height="28" rx="14" fill="rgba(52,211,153,0.16)" stroke="#34d399" />
          <text x="347" y={y + 4} textAnchor="middle" className="gc-value gc-text-good">Funded</text>
        </g>
      ))}
    </Frame>
  );
}

/** `uid` keeps SVG ids unique when the same cover appears twice on a page. */
export default function GuideCover({ data: raw, className, uid }: { data: GuideCoverData; className?: string; uid?: string }) {
  const data = uid ? { ...raw, id: `${raw.id}-${uid}` } : raw;
  let body: ReactNode;
  switch (data.kind) {
    case 'radar':
      body = <RadarCover data={data} />;
      break;
    case 'versus':
      body = <VersusCover data={data} />;
      break;
    case 'histogram':
      body = <HistogramCover data={data} />;
      break;
    case 'drawdown':
      body = <DrawdownCover id={data.id} />;
      break;
    case 'consistency':
      body = <ConsistencyCover id={data.id} />;
      break;
    case 'news':
      body = <NewsCover id={data.id} />;
      break;
    case 'payout':
      body = <PayoutCover id={data.id} />;
      break;
    case 'proof':
      body = <ProofCover id={data.id} />;
      break;
    case 'legal':
      body = <LegalCover id={data.id} />;
      break;
    default:
      body = <LanesCover id={data.id} />;
  }
  return <span className={`gc${className ? ` ${className}` : ''}`}>{body}</span>;
}
