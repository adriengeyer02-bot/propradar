import { scoreTone } from '../../lib/riskTone';

type ScoreRingProps = {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
};

const SIZES = { sm: 44, md: 64, lg: 112 } as const;

/** Circular score gauge. Colour follows the shared risk scale. */
export default function ScoreRing({ score, size = 'md', label }: ScoreRingProps) {
  const px = SIZES[size];
  const stroke = size === 'lg' ? 8 : size === 'md' ? 5 : 4;
  const radius = (px - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, score));
  const dash = (clamped / 100) * circumference;

  return (
    <span
      className={`pr-ring pr-ring-${size} pr-tone-${scoreTone(score)}`}
      role="img"
      aria-label={`${label ?? 'PropRadar score'} ${score} out of 100`}
    >
      <svg width={px} height={px} viewBox={`0 0 ${px} ${px}`} aria-hidden="true">
        <circle className="pr-ring-track" cx={px / 2} cy={px / 2} r={radius} strokeWidth={stroke} fill="none" />
        <circle
          className="pr-ring-value"
          cx={px / 2}
          cy={px / 2}
          r={radius}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          transform={`rotate(-90 ${px / 2} ${px / 2})`}
        />
      </svg>
      <span className="pr-ring-figure" aria-hidden="true">
        <strong>{score}</strong>
        {size === 'lg' ? <small>/100</small> : null}
      </span>
    </span>
  );
}
