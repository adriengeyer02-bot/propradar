import type { Tone } from '../../lib/riskTone';

type RiskPipProps = {
  label: string;
  value: string;
  tone: Tone;
  compact?: boolean;
};

/** A labelled coloured dot: "Payout · Low". Colour carries the risk, text keeps it readable without colour. */
export default function RiskPip({ label, value, tone, compact = false }: RiskPipProps) {
  return (
    <span className={`pr-pip pr-tone-${tone} ${compact ? 'pr-pip-compact' : ''}`}>
      <span className="pr-pip-dot" aria-hidden="true" />
      <span className="pr-pip-label">{label}</span>
      <span className="pr-pip-value">{value}</span>
    </span>
  );
}
