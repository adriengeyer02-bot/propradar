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
  if (visual === 'rule-stages') return <RuleStages t={t} />;
  if (visual === 'daily-vs-max') return <DailyVsMax t={t} />;
  if (visual === 'topstep-path') return <TopstepPath t={t} />;
  if (visual === 'static-floor') return <StaticFloor t={t} />;
  if (visual === 'eod-vs-intraday') return <EodVsIntraday t={t} />;
  if (visual === 'trailing-lock') return <TrailingLock t={t} />;
  if (visual === 'balance-vs-equity') return <BalanceVsEquity t={t} />;
  if (visual === 'real-cost-stack') return <RealCostStack t={t} />;
  return <TrailingVsStatic t={t} />;
}

/* ---------------------------------------------------------------------- */

function RuleStages({ t }: { t: T }) {
  return (
    <figure className="pr-diagram">
      <div className="pr-dg-lanes">
        <Lane
          tone="classic"
          title={t('Where a consistency rule can apply')}
          steps={[
            { label: t('Evaluation'), note: t('A rule here only delays your pass') },
            { label: t('Funded account'), note: t('The limit can differ from the evaluation') },
            { label: t('Payout request'), note: t('A rule here can block a withdrawal'), strong: true },
          ]}
        />
      </div>
      <figcaption>{t('Check the stage, the product and the order date of your own program.')}</figcaption>
    </figure>
  );
}

function DailyVsMax({ t }: { t: T }) {
  // Schematic equity curve over three days: the daily limit restarts each day, the maximum drawdown does not.
  const curve = 'M20 92 L60 80 L100 96 L120 88 L160 70 L200 84 L220 76 L260 58 L300 74';
  const days = [20, 120, 220];
  const starts = [92, 88, 76];
  return (
    <figure className="pr-diagram">
      <div className="pr-dg-title">{t('Two limits at once')} <span>{t('Schematic, no real account')}</span></div>
      <svg viewBox="0 0 320 170" role="img" aria-label="Schematic: the daily loss limit restarts below each day's starting balance, while the maximum drawdown is one floor for the whole account.">
        <line x1="20" y1="146" x2="300" y2="146" className="pr-dg-line-risk" strokeDasharray="5 4" />
        {days.map((x, i) => (
          <g key={x}>
            <line x1={x} y1={starts[i] + 26} x2={x + 96} y2={starts[i] + 26} className="pr-dg-line-watch" />
            <line x1={x} y1="20" x2={x} y2="150" className="pr-dg-line-grid" />
            <text x={x + 4} y="164" className="pr-dg-svg-label">{t('Day {n}').replace('{n}', String(i + 1))}</text>
          </g>
        ))}
        <path d={curve} className="pr-dg-line-curve" />
      </svg>
      <ul className="pr-dg-keys">
        <li><i className="pr-dg-key-watch" aria-hidden="true" />{t('Daily loss limit: restarts every day')}</li>
        <li><i className="pr-dg-key-risk" aria-hidden="true" />{t('Maximum drawdown: one floor for the whole account')}</li>
      </ul>
    </figure>
  );
}

function TopstepPath({ t }: { t: T }) {
  return (
    <figure className="pr-diagram">
      <div className="pr-dg-lanes">
        <Lane
          tone="direct"
          title={t('The Topstep path')}
          steps={[
            { label: 'Trading Combine', note: t('Evaluation: profit target, no time limit') },
            { label: 'Express Funded Account', note: t('Still simulated: payouts begin here') },
            { label: 'Live Funded Account', note: t('By invitation, real capital'), strong: true },
          ]}
        />
      </div>
    </figure>
  );
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

/* ---------------------------------------------------------------------- */

function StaticFloor({ t }: { t: T }) {
  // $100,000 account, 10% static limit: floor $90,000; account grown to $108,000 -> $18,000 of room.
  const x = (v: number) => 30 + ((v - 86000) / (112000 - 86000)) * 400;
  const marks = [
    { v: 90000, label: t('Floor'), cls: 'pr-dg-svg-risk' },
    { v: 100000, label: t('Start'), cls: 'pr-dg-svg-label' },
    { v: 108000, label: t('Today'), cls: 'pr-dg-svg-value' },
  ];
  return (
    <figure className="pr-diagram">
      <div className="pr-dg-title">{t('Static drawdown: the floor never moves')} <span>{t('$100,000 account, 10% static limit')}</span></div>
      <svg className="pr-dg-line" viewBox="0 0 460 150" role="img" aria-label="The floor stays at 90,000 dollars. The account has grown to 108,000 dollars, so 18,000 dollars of room remain.">
        <rect x={x(90000)} y="46" width={x(108000) - x(90000)} height="26" rx="6" className="pr-dg-fill-good-soft" />
        <line x1="30" x2="430" y1="59" y2="59" className="pr-dg-grid" />
        <line x1={x(90000)} x2={x(90000)} y1="30" y2="88" className="pr-dg-line-risk" strokeDasharray="5 4" />
        {marks.map((m) => (
          <g key={m.v}>
            {m.v === 90000 ? null : <circle cx={x(m.v)} cy="59" r="6" className="pr-dg-dot" />}
            <text x={x(m.v)} y="22" textAnchor="middle" className={m.cls}>{m.label}</text>
            <text x={x(m.v)} y="138" textAnchor="middle" className="pr-dg-svg-label">{`$${(m.v / 1000).toFixed(0)}k`}</text>
          </g>
        ))}
        <text x={(x(90000) + x(108000)) / 2} y="100" textAnchor="middle" className="pr-dg-svg-good">{'\u2190 '}{t('Room: $18,000')}{' \u2192'}</text>
      </svg>
      <figcaption>{t('Every profit you bank widens the gap to the floor.')}</figcaption>
    </figure>
  );
}

/** Schematic equity path over two days (index = time step). */
const EQ = [50, 53, 58, 55, 52, 54, 57, 61, 56, 55];
const CLOSES = [4, 9]; // last step of day 1 and day 2

function EodVsIntraday({ t }: { t: T }) {
  const D = 8;
  const x = (i: number) => 30 + i * 44;
  const y = (v: number) => 20 + ((66 - v) / (66 - 38)) * 140;
  const line = (vals: number[]) => vals.map((v, i) => `${i ? 'L' : 'M'}${x(i)},${y(v)}`).join(' ');
  let peak = -Infinity;
  const intraday = EQ.map((v) => ((peak = Math.max(peak, v)), peak - D));
  // End of day: the floor only moves at each close, from the closing value.
  let eodFloor = EQ[0] - D;
  const eod = EQ.map((v, i) => {
    if (CLOSES.includes(i)) eodFloor = Math.max(eodFloor, v - D);
    return eodFloor;
  });
  const eodPath = eod.map((v, i) => `${i ? 'H' + x(i) + ' V' : 'M' + x(i) + ','}${y(v)}`).join(' ');
  return (
    <figure className="pr-diagram">
      <div className="pr-dg-title">{t('Intraday trailing vs end of day')} <span>{t('Schematic, no real account')}</span></div>
      <svg className="pr-dg-line" viewBox="0 0 460 200" role="img" aria-label="The intraday trailing floor rises with every new high during the day. The end-of-day floor only moves at each close.">
        {CLOSES.map((i) => (
          <g key={i}>
            <line x1={x(i)} x2={x(i)} y1="14" y2="172" className="pr-dg-line-grid" strokeDasharray="3 4" />
            <text x={x(i)} y="190" textAnchor="middle" className="pr-dg-svg-label">{t('Close')}</text>
          </g>
        ))}
        <path d={eodPath} className="pr-dg-floor-eod" />
        <path d={line(intraday)} className="pr-dg-floor-trailing" />
        <path d={line(EQ)} className="pr-dg-equity" />
      </svg>
      <ul className="pr-dg-legend">
        <li><span className="pr-dg-key pr-dg-key-equity" />{t('Equity')}</li>
        <li><span className="pr-dg-key pr-dg-key-trailing" />{t('Intraday trailing: rises with every new high, open profit included')}</li>
        <li><span className="pr-dg-key pr-dg-key-eod" />{t('End of day: moves only at the close')}</li>
      </ul>
    </figure>
  );
}

function TrailingLock({ t }: { t: T }) {
  // Schematic: start 50, trailing distance 5, lock at the starting balance.
  const eq = [50, 51.5, 51, 53, 54.5, 55.5, 56, 58, 57, 59.5];
  const start = 50;
  const D = 5;
  const x = (i: number) => 30 + i * 44;
  const y = (v: number) => 20 + ((61 - v) / (61 - 43)) * 140;
  let peak = -Infinity;
  const floor = eq.map((v) => ((peak = Math.max(peak, v)), Math.min(start, peak - D)));
  const lockAt = floor.findIndex((v) => v >= start);
  const line = (vals: number[]) => vals.map((v, i) => `${i ? 'L' : 'M'}${x(i)},${y(v)}`).join(' ');
  return (
    <figure className="pr-diagram">
      <div className="pr-dg-title">{t('The lock: where the trailing stops')} <span>{t('Schematic, no real account')}</span></div>
      <svg className="pr-dg-line" viewBox="0 0 460 200" role="img" aria-label="The floor follows the account's high until it reaches the starting balance, then stays there like a static limit.">
        <rect x={x(0)} y="14" width={x(lockAt) - x(0)} height="158" className="pr-dg-zone-risk" />
        <text x={(x(0) + x(lockAt)) / 2} y="30" textAnchor="middle" className="pr-dg-svg-risk">{t('Most dangerous days')}</text>
        <line x1={x(0)} x2={x(9)} y1={y(start)} y2={y(start)} className="pr-dg-line-grid" strokeDasharray="5 4" />
        <text x={x(9)} y={y(start) - 6} textAnchor="end" className="pr-dg-svg-label">{t('Starting balance')}</text>
        <path d={line(floor)} className="pr-dg-floor-trailing" />
        <path d={line(eq)} className="pr-dg-equity" />
        <circle cx={x(lockAt)} cy={y(start)} r="5" className="pr-dg-dot-risk" />
        <text x="440" y={y(start) + 22} textAnchor="end" className="pr-dg-svg-strong">{t('Locked: now a fixed floor')}</text>
      </svg>
      <ul className="pr-dg-legend">
        <li><span className="pr-dg-key pr-dg-key-equity" />{t('Equity')}</li>
        <li><span className="pr-dg-key pr-dg-key-trailing" />{t('Floor: trails your high, then locks')}</li>
      </ul>
    </figure>
  );
}

function BalanceVsEquity({ t }: { t: T }) {
  // Schematic: one open trade dips through the floor, then closes in profit.
  const pnl = [50, 48.5, 46, 44.2, 45.5, 48, 51, 53];
  const floor = 45;
  const x = (i: number) => 40 + i * 54;
  const y = (v: number) => 20 + ((55 - v) / (55 - 42)) * 140;
  const line = pnl.map((v, i) => `${i ? 'L' : 'M'}${x(i)},${y(v)}`).join(' ');
  return (
    <figure className="pr-diagram">
      <div className="pr-dg-title">{t('Balance vs equity')} <span>{t('Schematic, no real account')}</span></div>
      <svg className="pr-dg-line" viewBox="0 0 460 190" role="img" aria-label="An open trade's floating loss crosses the floor before the trade closes in profit. An equity-based limit is breached at that moment; a balance-based limit only sees the profitable close.">
        <line x1="30" x2="430" y1={y(floor)} y2={y(floor)} className="pr-dg-line-risk" strokeDasharray="6 5" />
        <text x="430" y={y(floor) + 16} textAnchor="end" className="pr-dg-svg-risk">{t('Floor')}</text>
        <path d={line} className="pr-dg-equity" />
        <circle cx={x(3)} cy={y(44.2)} r="6" className="pr-dg-dot-risk" />
        <text x={x(3)} y={y(44.2) + 22} textAnchor="middle" className="pr-dg-svg-risk">{t('Equity-based: breached here')}</text>
        <circle cx={x(7)} cy={y(53)} r="6" className="pr-dg-dot-good" />
        <text x={x(7) - 8} y={y(53) - 12} textAnchor="end" className="pr-dg-svg-good">{t('Trade closed in profit')}</text>
      </svg>
      <figcaption>{t('A balance-based limit only sees the closed result. An equity-based limit also counts the open loss, so the account can be lost before the trade ends.')}</figcaption>
    </figure>
  );
}

function RealCostStack({ t }: { t: T }) {
  const parts = [
    { label: t('Challenge fee'), w: 34, cls: 'is-a' },
    { label: t('Resets'), w: 22, cls: 'is-b' },
    { label: t('Activation fee'), w: 16, cls: 'is-c' },
    { label: t('Replacement accounts'), w: 28, cls: 'is-d' },
  ];
  return (
    <figure className="pr-diagram">
      <div className="pr-dg-title">{t('What a firm really costs you')} <span>{t('Schematic, no real prices')}</span></div>
      <div className="pr-dg-stack" role="img" aria-label="Real cost = challenge fee + resets + activation fee + replacement accounts, minus any refund, all paid before the first payout.">
        {parts.map((part, index) => (
          <span key={part.label} className={`pr-dg-stack-part ${part.cls}`} style={{ flexBasis: `${part.w}%` }}>
            {index ? <em aria-hidden="true">+</em> : null}
            {part.label}
          </span>
        ))}
      </div>
      <div className="pr-dg-stack-result">
        <span>− {t('Refund, if any')}</span>
        <strong>= {t('Real cost before your first payout')}</strong>
      </div>
      <figcaption>{t('Discount codes come last: they mostly cut the challenge fee.')}</figcaption>
    </figure>
  );
}
