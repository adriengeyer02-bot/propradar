'use client';

import { useId, useState } from 'react';

/**
 * Consistency rule calculator: best day share of total profit, pass/fail
 * against a limit, and the total profit needed to pass. Plain arithmetic,
 * runs in the browser, stores nothing.
 */
export default function ConsistencyCalculator() {
  const id = useId();
  const [best, setBest] = useState('1200');
  const [total, setTotal] = useState('2500');
  const [limit, setLimit] = useState('40');

  const b = Number(best);
  const t = Number(total);
  const l = Number(limit);
  const valid = b > 0 && t > 0 && l > 0 && l <= 100 && b <= t;
  const share = valid ? (b / t) * 100 : 0;
  const passes = valid && share <= l;
  const needed = valid ? b / (l / 100) : 0;
  const usd = (value: number) => `$${Math.ceil(value).toLocaleString('en-US')}`;

  return (
    <div className="pr-calc" aria-labelledby={`${id}-title`}>
      <h3 id={`${id}-title`}>Consistency rule calculator</h3>
      <div className="pr-calc-fields">
        <label>
          <span>Best trading day profit ($)</span>
          <input inputMode="decimal" value={best} onChange={(e) => setBest(e.target.value)} />
        </label>
        <label>
          <span>Total net profit ($)</span>
          <input inputMode="decimal" value={total} onChange={(e) => setTotal(e.target.value)} />
        </label>
        <label>
          <span>Rule limit (%)</span>
          <input inputMode="decimal" value={limit} onChange={(e) => setLimit(e.target.value)} />
        </label>
      </div>
      <output className={`pr-calc-result ${valid ? (passes ? 'is-pass' : 'is-fail') : ''}`} aria-live="polite">
        {valid ? (
          <>
            <strong>
              Best day = {share.toFixed(1)}% of total profit: {passes ? `within the ${l}% limit` : `above the ${l}% limit`}.
            </strong>
            <span>
              {passes
                ? `Your total could fall to ${usd(needed)} before this best day breaks the rule.`
                : `You need about ${usd(needed)} of total net profit (${usd(needed - t)} more) for this best day to fit the rule.`}
            </span>
          </>
        ) : (
          <span>Enter a best day no larger than the total profit, and a limit between 1 and 100%.</span>
        )}
      </output>
      <p className="pr-fineprint">
        Firms define the rule differently (best day vs total, per payout cycle, evaluation or funded stage). Read the exact rule of your program.
      </p>
    </div>
  );
}
