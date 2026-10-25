// Small presentation helpers for the "terminal" (tx-) components.

/** Maps the legacy badge colour classes to the tx- risk dot tones. */
export function riskTone(badgeClass: string) {
  if (badgeClass.includes('green')) return 'tx-risk-pos';
  if (badgeClass.includes('amber')) return 'tx-risk-warn';
  if (badgeClass.includes('red')) return 'tx-risk-neg';
  if (badgeClass.includes('blue')) return 'tx-risk-info';
  return '';
}

/** Score bar colour: same thresholds as the legacy score badges. */
export function scoreTone(score: number) {
  if (score >= 70) return '';
  if (score >= 55) return 'tx-score-mid';
  return 'tx-score-low';
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value.length === 10 ? `${value}T00:00:00Z` : value));
}
