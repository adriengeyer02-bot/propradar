import type { ReactNode } from 'react';
import type { GuideSectionVisual } from '../../lib/guideArticles';

/** English diagram text -> translation. */
export type DiagramLabels = Record<string, string>;
type T = (text: string) => string;

/** Fill {placeholders} with React nodes. */
function rich(template: string, values: Record<string, ReactNode>) {
  return template.split(/(\{\w+\})/g).map((part, index) => {
    const key = part.match(/^\{(\w+)\}$/)?.[1];
    return key && key in values ? <span key={index}>{values[key]}</span> : part;
  });
}

/**
 * Diagrams for guide sections. Every number here is taken from the worked
 * example written in the same section of guideArticles.ts: keep them in sync.
 */
export default function GuideSectionDiagram({ visual, labels }: { visual: GuideSectionVisual; labels?: DiagramLabels }) {
  const t: T = (text) => labels?.[text] ?? text;
  if (visual === 'challenge-vs-direct') return <ChallengeVsDirect t={t} />;
  if (visual === 'no-challenge-cost') return <NoChallengeCost t={t} />;
  if (visual === 'consistency-example') return <ConsistencyExample t={t} />;
  return <TrailingVsStatic t={t} />;
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

function ChallengeVsDirect({ t }: { t: T }) {
  return (
    <figure className="pr-diagram">
      <div className="pr-dg-lanes">
        <Lane
          tone="classic"
          title={t('Classic challenge')}
          steps={[
            { label: t('Pay a fee'), note: t('Lower entry price') },
            { label: t('Hit the target'), note: t('Under daily loss and max drawdown') },
            { label: t('Funded account'), note: t('Rules continue') },
            { label: t('Payout'), note: t('Once conditions are met'), strong: true },
          ]}
        />
        <Lane
          tone="direct"
          title={t('No challenge (direct funding)')}
          steps={[
            { label: t('Pay more'), note: t('Several times a challenge of the same size') },
            { label: t('Funded account'), note: t('Drawdown, consistency and minimum days from day one') },
            { label: t('Payout'), note: t('Once conditions are met'), strong: true },
          ]}
        />
      </div>
      <figcaption>{t('The profit target disappears. Risk control does not: it moves into the account you already paid for.')}</figcaption>
    </figure>
  );
}

/* ---------------------------------------------------------------------- */

function NoChallengeCost({ t }: { t: T }) {
  const rows = [
    { label: t('Classic challenge'), detail: t('$100 fee × about 3 attempts (1 in 3 passes)'), value: 300, tone: 'classic' },
    { label: t('Direct account, first try'), detail: t('One $350 account'), value: 350, tone: 'direct' },
    { label: t('Direct, one account lost'), detail: '2 × $350', value: 700, tone: 'direct' },
    { label: t('Direct, two accounts lost'), detail: '3 × $350', value: 1050, tone: 'direct' },
  ] as const;
  const max = 1050;

  return (
    <figure className="pr-diagram">
      <div className="pr-dg-title">{t('Average cost to reach a funded account')} <span>{t('Illustration with round numbers')}</span></div>
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
      <figcaption>{t('The cheaper option depends on how often your strategy survives the funded rules, not on the sticker price.')}</figcaption>
    </figure>
  );
}

/* ---------------------------------------------------------------------- */

function ConsistencyExample({ t }: { t: T }) {
  const days = [
    { day: t('Mon'), value: 1200 },
    { day: t('Tue'), value: 300 },
    { day: t('Wed'), value: 500 },
  ];
  const max = 1200;
  const chartH = 150;

  return (
    <figure className="pr-diagram">
      <div className="pr-dg-title">{t('Best day ÷ total profit, with a 50% limit')} <span>{t('Worked example from the text')}</span></div>
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
            <span>{t('Best day')}</span><strong>$1,200</strong>
          </div>
          <div className="pr-dg-ratio-row">
            <span>{t('Total profit')}</span><strong>$2,000</strong>
          </div>
          <div className="pr-dg-gauge" aria-hidden="true">
            <span className="pr-dg-gauge-fill" style={{ width: '60%' }} />
            <span className="pr-dg-gauge-limit" style={{ left: '50%' }} />
          </div>
          <div className="pr-dg-ratio-row pr-dg-ratio-result">
            <span>{t('Ratio')}</span><strong className="pr-tone-risk">{t('60% — above the 50% limit')}</strong>
          </div>
          <p className="pr-dg-fix"><span className="pr-pip-dot pr-tone-good" aria-hidden="true" /> {rich(t('Fix: keep trading until total profit reaches {amount}. No loss needed.'), { amount: <strong>$2,400</strong> })}</p>
        </div>
      </div>
    </figure>
  );
}

/* ---------------------------------------------------------------------- */

function TrailingVsStatic({ t }: { t: T }) {
  // $50,000 account, $2,500 limit. Trade runs to +$1,500 unrealized, closed at breakeven.
  const y = (v: number) => 20 + ((52000 - v) / (52000 - 47000)) * 150;
  const xs = [70, 190, 310, 420];
  const equity = [50000, 51500, 50000, 50000];
  const trailing = [47500, 49000, 49000, 49000];
  const path = (vals: number[]) => vals.map((v, i) => `${i ? 'L' : 'M'}${xs[i]},${y(v)}`).join(' ');

  return (
    <figure className="pr-diagram">
      <div className="pr-dg-title">{t('Same trade, two drawdown models')} <span>{t('$50,000 account, $2,500 limit')}</span></div>
      <svg className="pr-dg-line" viewBox="0 0 460 210" role="img" aria-label="Equity rises to 51,500 dollars unrealized, then the trade closes at breakeven at 50,000. The static floor stays at 47,500, leaving 2,500 dollars of room. The intraday trailing floor rises to 49,000, leaving only 1,000 dollars of room.">
        {[47500, 49000, 50000, 51500].map((v) => (
          <g key={v}>
            <line x1="60" x2="440" y1={y(v)} y2={y(v)} className="pr-dg-grid" />
            <text x="54" y={y(v) + 4} textAnchor="end" className="pr-dg-svg-label">{`$${(v / 1000).toFixed(1)}k`}</text>
          </g>
        ))}
        <line x1={xs[0]} x2={xs[3]} y1={y(47500)} y2={y(47500)} className="pr-dg-floor-static" />
        <path d={path(trailing)} className="pr-dg-floor-trailing" />
        <path d={path(equity)} className="pr-dg-equity" />
        <circle cx={xs[1]} cy={y(51500)} r="4" className="pr-dg-dot" />
        <text x={xs[1]} y={y(51500) - 10} textAnchor="middle" className="pr-dg-svg-value">{t('+$1,500 unrealized')}</text>
        <text x={(xs[2] + xs[3]) / 2} y={y(50000) - 10} textAnchor="middle" className="pr-dg-svg-label">{t('closed at breakeven')}</text>

        <line x1="436" x2="436" y1={y(50000)} y2={y(49000)} className="pr-dg-room-risk" />
        <line x1="446" x2="446" y1={y(50000)} y2={y(47500)} className="pr-dg-room-good" />
      </svg>
      <ul className="pr-dg-legend">
        <li><span className="pr-dg-key pr-dg-key-equity" />{t('Equity')}</li>
        <li><span className="pr-dg-key pr-dg-key-static" />{rich(t('Static floor stays at $47,500 → {room}'), { room: <strong className="pr-tone-good">{t('$2,500 room')}</strong> })}</li>
        <li><span className="pr-dg-key pr-dg-key-trailing" />{rich(t('Trailing floor moves to $49,000 → {room}'), { room: <strong className="pr-tone-risk">{t('$1,000 room')}</strong> })}</li>
      </ul>
    </figure>
  );
}
