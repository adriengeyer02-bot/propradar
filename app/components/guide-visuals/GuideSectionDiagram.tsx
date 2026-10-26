import type { GuideSectionVisual } from '../../lib/guideArticles';

/**
 * Diagrams for guide sections. Every number here is taken from the worked
 * example written in the same section of guideArticles.ts: keep them in sync.
 */
export default function GuideSectionDiagram({ visual }: { visual: GuideSectionVisual }) {
  if (visual === 'challenge-vs-direct') return <ChallengeVsDirect />;
  if (visual === 'no-challenge-cost') return <NoChallengeCost />;
  if (visual === 'consistency-example') return <ConsistencyExample />;
  return <TrailingVsStatic />;
}

/* ---------------------------------------------------------------------- */

function Lane({ title, steps, tone }: { title: string; steps: { label: string; note: string; strong?: boolean }[]; tone: 'classic' | 'direct' }) {
  return (
    <div className={`pr-dg-lane pr-dg-lane-${tone}`}>
      <span className="pr-dg-lane-title">{title}</span>
      <ol>
        {steps.map((step) => (
          <li key={step.label} className={step.strong ? 'is-strong' : undefined}>
            <strong>{step.label}</strong>
            <small>{step.note}</small>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ChallengeVsDirect() {
  return (
    <figure className="pr-diagram">
      <div className="pr-dg-lanes">
        <Lane
          tone="classic"
          title="Classic challenge"
          steps={[
            { label: 'Pay a fee', note: 'Lower entry price' },
            { label: 'Hit the target', note: 'Under daily loss and max drawdown' },
            { label: 'Funded account', note: 'Rules continue' },
            { label: 'Payout', note: 'Once conditions are met', strong: true },
          ]}
        />
        <Lane
          tone="direct"
          title="No challenge (direct funding)"
          steps={[
            { label: 'Pay more', note: 'Several times a challenge of the same size' },
            { label: 'Funded account', note: 'Drawdown, consistency and minimum days from day one' },
            { label: 'Payout', note: 'Once conditions are met', strong: true },
          ]}
        />
      </div>
      <figcaption>The profit target disappears. Risk control does not: it moves into the account you already paid for.</figcaption>
    </figure>
  );
}

/* ---------------------------------------------------------------------- */

function NoChallengeCost() {
  const rows = [
    { label: 'Classic challenge', detail: '$100 fee × about 3 attempts (1 in 3 passes)', value: 300, tone: 'classic' },
    { label: 'Direct account, first try', detail: 'One $350 account', value: 350, tone: 'direct' },
    { label: 'Direct, one account lost', detail: '2 × $350', value: 700, tone: 'direct' },
    { label: 'Direct, two accounts lost', detail: '3 × $350', value: 1050, tone: 'direct' },
  ] as const;
  const max = 1050;

  return (
    <figure className="pr-diagram">
      <div className="pr-dg-title">Average cost to reach a funded account <span>Illustration with round numbers</span></div>
      <ul className="pr-dg-bars">
        {rows.map((row) => (
          <li key={row.label}>
            <span className="pr-dg-bar-label">
              <strong>{row.label}</strong>
              <small>{row.detail}</small>
            </span>
            <span className="pr-dg-bar-track">
              <span className={`pr-dg-bar pr-dg-bar-${row.tone}`} style={{ width: `${(row.value / max) * 82}%` }} />
              <em>${row.value.toLocaleString('en-US')}</em>
            </span>
          </li>
        ))}
      </ul>
      <figcaption>The cheaper option depends on how often your strategy survives the funded rules, not on the sticker price.</figcaption>
    </figure>
  );
}

/* ---------------------------------------------------------------------- */

function ConsistencyExample() {
  const days = [
    { day: 'Mon', value: 1200 },
    { day: 'Tue', value: 300 },
    { day: 'Wed', value: 500 },
  ];
  const max = 1200;
  const chartH = 150;

  return (
    <figure className="pr-diagram">
      <div className="pr-dg-title">Best day ÷ total profit, with a 50% limit <span>Worked example from the text</span></div>
      <div className="pr-dg-consistency">
        <svg viewBox="0 0 300 200" role="img" aria-label="Daily profit: Monday 1,200 dollars, Tuesday 300, Wednesday 500. Total 2,000. Best day is 60 percent of the total, above the 50 percent limit.">
          {days.map((d, i) => {
            const h = (d.value / max) * chartH;
            const x = 30 + i * 90;
            const best = d.value === max;
            return (
              <g key={d.day}>
                <rect x={x} y={170 - h} width="60" height={h} rx="6" className={best ? 'pr-dg-fill-risk' : 'pr-dg-fill-muted'} />
                <text x={x + 30} y={162 - h} textAnchor="middle" className="pr-dg-svg-value">${d.value.toLocaleString('en-US')}</text>
                <text x={x + 30} y="190" textAnchor="middle" className="pr-dg-svg-label">{d.day}</text>
              </g>
            );
          })}
        </svg>
        <div className="pr-dg-ratio">
          <div className="pr-dg-ratio-row">
            <span>Best day</span><strong>$1,200</strong>
          </div>
          <div className="pr-dg-ratio-row">
            <span>Total profit</span><strong>$2,000</strong>
          </div>
          <div className="pr-dg-gauge" aria-hidden="true">
            <span className="pr-dg-gauge-fill" style={{ width: '60%' }} />
            <span className="pr-dg-gauge-limit" style={{ left: '50%' }} />
          </div>
          <div className="pr-dg-ratio-row pr-dg-ratio-result">
            <span>Ratio</span><strong className="pr-tone-risk">60% — above the 50% limit</strong>
          </div>
          <p className="pr-dg-fix"><span className="pr-pip-dot pr-tone-good" aria-hidden="true" /> Fix: keep trading until total profit reaches <strong>$2,400</strong>. No loss needed.</p>
        </div>
      </div>
    </figure>
  );
}

/* ---------------------------------------------------------------------- */

function TrailingVsStatic() {
  // $50,000 account, $2,500 limit. Trade runs to +$1,500 unrealized, closed at breakeven.
  const y = (v: number) => 20 + ((52000 - v) / (52000 - 47000)) * 150;
  const xs = [40, 170, 300, 420];
  const equity = [50000, 51500, 50000, 50000];
  const trailing = [47500, 49000, 49000, 49000];
  const path = (vals: number[]) => vals.map((v, i) => `${i ? 'L' : 'M'}${xs[i]},${y(v)}`).join(' ');

  return (
    <figure className="pr-diagram">
      <div className="pr-dg-title">Same trade, two drawdown models <span>$50,000 account, $2,500 limit</span></div>
      <svg className="pr-dg-line" viewBox="0 0 460 210" role="img" aria-label="Equity rises to 51,500 dollars unrealized, then the trade closes at breakeven at 50,000. The static floor stays at 47,500, leaving 2,500 dollars of room. The intraday trailing floor rises to 49,000, leaving only 1,000 dollars of room.">
        {[47500, 49000, 50000, 51500].map((v) => (
          <g key={v}>
            <line x1="30" x2="440" y1={y(v)} y2={y(v)} className="pr-dg-grid" />
            <text x="26" y={y(v) + 4} textAnchor="end" className="pr-dg-svg-label">{`$${(v / 1000).toFixed(1)}k`}</text>
          </g>
        ))}
        <line x1={xs[0]} x2={xs[3]} y1={y(47500)} y2={y(47500)} className="pr-dg-floor-static" />
        <path d={path(trailing)} className="pr-dg-floor-trailing" />
        <path d={path(equity)} className="pr-dg-equity" />
        <circle cx={xs[1]} cy={y(51500)} r="4" className="pr-dg-dot" />
        <text x={xs[1]} y={y(51500) - 10} textAnchor="middle" className="pr-dg-svg-value">+$1,500 unrealized</text>
        <text x={xs[2]} y={y(50000) - 10} textAnchor="middle" className="pr-dg-svg-label">closed at breakeven</text>

        <line x1="436" x2="436" y1={y(50000)} y2={y(49000)} className="pr-dg-room-risk" />
        <line x1="446" x2="446" y1={y(50000)} y2={y(47500)} className="pr-dg-room-good" />
      </svg>
      <ul className="pr-dg-legend">
        <li><span className="pr-dg-key pr-dg-key-equity" />Equity</li>
        <li><span className="pr-dg-key pr-dg-key-static" />Static floor stays at $47,500 → <strong className="pr-tone-good">$2,500 room</strong></li>
        <li><span className="pr-dg-key pr-dg-key-trailing" />Trailing floor moves to $49,000 → <strong className="pr-tone-risk">$1,000 room</strong></li>
      </ul>
    </figure>
  );
}
