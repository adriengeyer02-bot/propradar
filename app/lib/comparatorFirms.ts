/**
 * The slice of each firm profile the comparator needs in the browser.
 *
 * The full profiles (programs, sources, audit notes, review texts) weigh about
 * 1.3 MB of JSON. The comparator page builds this projection on the server and
 * hands it to the client component, so the browser no longer downloads the
 * whole firm database to draw a sortable table. Full-text search loads the
 * complete search index on demand (see ComparatorClient).
 */
import type { PropFirm, RegulatoryAudit, RegulatoryEntity, ReviewSignals } from './propFirms';

export type ComparatorFirm = Pick<
  PropFirm,
  | 'slug'
  | 'name'
  | 'status'
  | 'score'
  | 'bestFor'
  | 'priceFrom'
  | 'noEntryFee'
  | 'profitSplit'
  | 'drawdownType'
  | 'newsTrading'
  | 'eaAllowed'
  | 'styles'
  | 'legalVerified'
  | 'lastReviewed'
  | 'trustpilotRating'
  | 'logoDomain'
  | 'commercialRelationship'
  | 'provisional'
> & {
  regulatoryAudit: Pick<RegulatoryAudit, 'riskLevel' | 'lastChecked'> & { entities: Pick<RegulatoryEntity, 'jurisdiction'>[] };
  reviewSignals: Pick<ReviewSignals, 'payoutRisk' | 'payoutRiskScore' | 'trustpilotRatingWithheld' | 'trustpilotReliability'>;
  /** Legal sources on file (regulatory sources, else profile sources). */
  legalSourceCount: number;
};

export function toComparatorFirm(firm: PropFirm): ComparatorFirm {
  const { regulatoryAudit: audit, reviewSignals: signals } = firm;
  const slim: ComparatorFirm = {
    slug: firm.slug,
    name: firm.name,
    status: firm.status,
    score: firm.score,
    bestFor: firm.bestFor,
    priceFrom: firm.priceFrom,
    noEntryFee: firm.noEntryFee,
    profitSplit: firm.profitSplit,
    drawdownType: firm.drawdownType,
    newsTrading: firm.newsTrading,
    eaAllowed: firm.eaAllowed,
    styles: firm.styles,
    legalVerified: firm.legalVerified,
    lastReviewed: firm.lastReviewed,
    trustpilotRating: firm.trustpilotRating,
    logoDomain: firm.logoDomain,
    commercialRelationship: firm.commercialRelationship,
    provisional: firm.provisional,
    regulatoryAudit: {
      riskLevel: audit.riskLevel,
      lastChecked: audit.lastChecked,
      entities: audit.entities.map((entity) => ({ jurisdiction: entity.jurisdiction })),
    },
    reviewSignals: {
      payoutRisk: signals.payoutRisk,
      payoutRiskScore: signals.payoutRiskScore,
      trustpilotRatingWithheld: signals.trustpilotRatingWithheld,
      trustpilotReliability: signals.trustpilotReliability,
    },
    legalSourceCount: audit.sources.length || firm.sources.length,
  };
  // Drop undefined keys so they are not serialised into the page payload.
  return JSON.parse(JSON.stringify(slim)) as ComparatorFirm;
}
