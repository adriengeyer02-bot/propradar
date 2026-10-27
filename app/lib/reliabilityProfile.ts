import type { PropFirm } from './propFirms';
import { toEnglishText } from './i18n';

/**
 * Five-axis reliability profile drawn as a radar. Every axis is read from a
 * field PropRadar already publishes on the firm page; nothing here feeds the
 * score. Reddit and X/Twitter are left out on purpose: for most firms they are
 * editorial estimates, not counted mentions.
 *
 * Axis values run 0-100, higher = safer. Categorical fields (legal risk,
 * proof level) are placed on the scale by rank only, and the chart labels show
 * the category, never the number.
 */
export type ReliabilityAxis = {
  key: 'payout' | 'legal' | 'reviews' | 'authenticity' | 'proof';
  label: string;
  value: number;
  display: string;
  /** True when the underlying field is provisional for this firm. */
  estimated: boolean;
};

const LEGAL_RANK: Record<PropFirm['regulatoryAudit']['riskLevel'], number> = {
  Low: 92,
  'Low to medium': 76,
  Medium: 58,
  'Medium to high': 42,
  'To audit': 30,
  High: 24,
  Critical: 8,
};

const PROOF_RANK: Record<PropFirm['auditStatus'], number> = {
  'Vérifié multi-source': 90,
  'Partiellement vérifié': 58,
  'À auditer': 25,
};

const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

export function reliabilityAxes(firm: PropFirm): ReliabilityAxis[] {
  const signals = firm.reviewSignals;
  return [
    {
      key: 'payout',
      label: 'Payout',
      value: clamp(100 - signals.payoutRiskScore),
      display: `${toEnglishText(signals.payoutRisk)} risk`,
      estimated: false,
    },
    {
      key: 'legal',
      label: 'Legal',
      value: LEGAL_RANK[firm.regulatoryAudit.riskLevel] ?? 30,
      display: `${firm.regulatoryAudit.riskLevel} risk`,
      estimated: false,
    },
    {
      key: 'reviews',
      label: 'Review reliability',
      value: clamp(signals.trustpilotReliabilityScore),
      display: toEnglishText(signals.trustpilotReliability),
      estimated: !firm.trustpilotRating,
    },
    {
      key: 'authenticity',
      label: 'Review authenticity',
      value: clamp(100 - (signals.manipulationRiskScore ?? 50)),
      display: `${toEnglishText(signals.manipulationRisk ?? 'Moyen')} manipulation risk`,
      estimated: signals.manipulationRiskScore === undefined,
    },
    {
      key: 'proof',
      label: 'Proof level',
      value: PROOF_RANK[firm.auditStatus] ?? 25,
      display: toEnglishText(firm.auditStatus),
      estimated: false,
    },
  ];
}
