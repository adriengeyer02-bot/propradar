'use client';

import { useEffect, useState } from 'react';

/**
 * "Last review" date with a breathing dot: green under 14 days, cyan under
 * 60, amber beyond. Age is computed in the browser so a static page never
 * shows a stale "3 days ago".
 */
export default function ReviewFreshness({ date }: { date: string }) {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const value = Math.round((Date.now() - new Date(`${date}T12:00:00Z`).getTime()) / 86_400_000);
    if (Number.isFinite(value)) setDays(Math.max(0, value));
  }, [date]);

  const state = days === null ? 'unknown' : days <= 14 ? 'fresh' : days <= 60 ? 'recent' : 'stale';
  const ago = days === null ? null : days === 0 ? 'today' : days === 1 ? 'yesterday' : `${days} days ago`;

  return (
    <span className={`pr-fresh pr-fresh-${state}`}>
      <i className="pr-fresh-dot" aria-hidden="true" />
      <time dateTime={date}>{date}</time>
      {ago ? <span className="pr-fresh-ago">({ago})</span> : null}
    </span>
  );
}
