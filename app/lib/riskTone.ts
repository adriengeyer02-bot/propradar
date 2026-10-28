import type { PropFirm, RegulatoryRiskLevel, ReviewSignals } from './propFirms';

/**
 * One risk scale for the whole site.
 * good = green, watch = amber, risk = red. Nothing else uses these colours.
 */
/** 'none' = no assessment on file (grey): never read as a risk. */
export type Tone = 'good' | 'watch' | 'risk' | 'none';

export function scoreTone(score: number): Tone {
  if (score >= 75) return 'good';
  if (score >= 55) return 'watch';
  return 'risk';
}

export function payoutTone(risk: ReviewSignals['payoutRisk']): Tone {
  if (risk === 'Non évalué') return 'none';
  if (risk === 'Faible') return 'good';
  if (risk === 'Moyen') return 'watch';
  return 'risk';
}

export function legalTone(level: RegulatoryRiskLevel): Tone {
  if (level === 'Low' || level === 'Low to medium') return 'good';
  if (level === 'Medium' || level === 'Medium to high' || level === 'To audit') return 'watch';
  return 'risk';
}

export function reviewTone(risk: ReviewSignals['manipulationRisk']): Tone {
  if (risk === 'Faible') return 'good';
  if (risk === 'Élevé') return 'risk';
  return 'watch';
}

export function statusTone(status: PropFirm['status']): Tone {
  if (status === 'Active') return 'good';
  if (status === 'À surveiller') return 'watch';
  return 'risk';
}

/** Latest date at which any firm profile or legal file was reviewed. */
export function latestReviewDate(firms: PropFirm[]): string {
  return firms.reduce((latest, firm) => {
    const firmDate = firm.regulatoryAudit.lastChecked > firm.lastReviewed ? firm.regulatoryAudit.lastChecked : firm.lastReviewed;
    return firmDate > latest ? firmDate : latest;
  }, '');
}
