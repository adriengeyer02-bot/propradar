import { scoreTone } from '../lib/tx';

export function TxArrow() {
  return (
    <svg className="tx-arrow" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function TxScore({ score }: { score: number }) {
  const value = Math.max(0, Math.min(100, score));
  return (
    <span className={`tx-score ${scoreTone(value)}`} aria-label={`PropRadar score ${value} out of 100`}>
      <strong>{value}</strong>
      <span className="tx-score-bar" aria-hidden="true">
        <i style={{ width: `${value}%` }} />
      </span>
    </span>
  );
}
