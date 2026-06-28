export type PropFirm = {
  id: number;
  slug: string;
  name: string;
  status: 'Active' | 'Risque' | 'Fermée';
  score: number;
  anneeCreation: number;
  prixChallenge: number;
  profitSplit: number;
  drawdownType: 'EOD' | 'Trailing' | 'Static' | 'Hybride';
  newsTrading: boolean;
  smcAllowed: boolean;
  eaAllowed: boolean;
  payoutDelay: number;
  incidents: number;
  incidentsDetails?: string[];
  style: string[];
  legalVerified: boolean;
  transparencyScore: number;
  payoutProof: boolean;
  recentRuleChange: boolean;
  lastPayoutVerified?: string;
  trustpilotRating?: number;
  trustpilotReviews?: number;
  trustpilotLink?: string;
  logoDomain?: string;
};

export const propFirms: PropFirm[] = [
  { id: 1, slug: 'ftmo', name: 'FTMO', status: 'Active', score: 87, anneeCreation: 2015, prixChallenge: 155, profitSplit: 80, drawdownType: 'EOD', newsTrading: true, smcAllowed: true, eaAllowed: true, payoutDelay: 1, incidents: 2, incidentsDetails: ['Plainte sur délai payout 2023 (résolu)'], style: ['SMC', 'Scalp', 'Swing', 'EA'], legalVerified: true, transparencyScore: 18, payoutProof: true, recentRuleChange: false, lastPayoutVerified: '2026-06-20', trustpilotRating: 4.6, trustpilotReviews: 12400, trustpilotLink: 'https://www.trustpilot.com/review/ftmo.com', logoDomain: 'ftmo.com' },
  { id: 2, slug: 'the5ers', name: 'The5ers', status: 'Active', score: 82, anneeCreation: 2016, prixChallenge: 95, profitSplit: 80, drawdownType: 'Static', newsTrading: false, smcAllowed: true, eaAllowed: false, payoutDelay: 2, incidents: 1, incidentsDetails: ['Changement profit split 2024'], style: ['Swing', 'SMC'], legalVerified: true, transparencyScore: 17, payoutProof: true, recentRuleChange: true, lastPayoutVerified: '2026-06-15', trustpilotRating: 4.4, trustpilotReviews: 8700, trustpilotLink: 'https://www.trustpilot.com/review/the5ers.com', logoDomain: 'the5ers.com' },
  { id: 3, slug: 'blue-guardian', name: 'Blue Guardian', status: 'Active', score: 79, anneeCreation: 2022, prixChallenge: 85, profitSplit: 85, drawdownType: 'Trailing', newsTrading: true, smcAllowed: true, eaAllowed: true, payoutDelay: 2, incidents: 1, incidentsDetails: ['Incident scaling isolé'], style: ['SMC', 'Scalp', 'Swing'], legalVerified: true, transparencyScore: 16, payoutProof: true, recentRuleChange: false, lastPayoutVerified: '2026-06-10', trustpilotRating: 4.3, trustpilotReviews: 3100, trustpilotLink: 'https://www.trustpilot.com/review/blueguardian.com', logoDomain: 'blueguardian.com' },
  { id: 4, slug: 'e8-markets', name: 'E8 Markets', status: 'Active', score: 76, anneeCreation: 2021, prixChallenge: 78, profitSplit: 80, drawdownType: 'Trailing', newsTrading: true, smcAllowed: true, eaAllowed: true, payoutDelay: 2, incidents: 2, incidentsDetails: ['Changement drawdown 2024'], style: ['SMC', 'Scalp', 'EA'], legalVerified: true, transparencyScore: 15, payoutProof: true, recentRuleChange: false, lastPayoutVerified: '2026-06-18', trustpilotRating: 4.1, trustpilotReviews: 5400, trustpilotLink: 'https://www.trustpilot.com/review/e8markets.com', logoDomain: 'e8markets.com' },
  { id: 5, slug: 'funded-trading-plus', name: 'Funded Trading Plus', status: 'Active', score: 73, anneeCreation: 2022, prixChallenge: 69, profitSplit: 80, drawdownType: 'EOD', newsTrading: true, smcAllowed: true, eaAllowed: true, payoutDelay: 3, incidents: 3, incidentsDetails: ['Retards payout occasionnels'], style: ['SMC', 'Scalp', 'Swing'], legalVerified: true, transparencyScore: 14, payoutProof: true, recentRuleChange: false, lastPayoutVerified: '2026-06-05', trustpilotRating: 4.0, trustpilotReviews: 2800, trustpilotLink: 'https://www.trustpilot.com/review/fundedtradingplus.com', logoDomain: 'fundedtradingplus.com' },
  { id: 6, slug: 'true-forex-funds', name: 'True Forex Funds', status: 'Active', score: 68, anneeCreation: 2023, prixChallenge: 49, profitSplit: 75, drawdownType: 'Static', newsTrading: true, smcAllowed: true, eaAllowed: true, payoutDelay: 4, incidents: 2, incidentsDetails: ['Changement scaling 2025'], style: ['SMC', 'Scalp'], legalVerified: false, transparencyScore: 12, payoutProof: false, recentRuleChange: true, lastPayoutVerified: '2026-05-28', trustpilotRating: 3.8, trustpilotReviews: 1900, trustpilotLink: 'https://www.trustpilot.com/review/trueforexfunds.com', logoDomain: 'trueforexfunds.com' },
  { id: 7, slug: 'goat-funded-trader', name: 'Goat Funded Trader', status: 'Active', score: 74, anneeCreation: 2023, prixChallenge: 65, profitSplit: 80, drawdownType: 'EOD', newsTrading: false, smcAllowed: true, eaAllowed: true, payoutDelay: 4, incidents: 2, incidentsDetails: ['Support lent'], style: ['SMC', 'Scalp'], legalVerified: false, transparencyScore: 13, payoutProof: true, recentRuleChange: false, lastPayoutVerified: '2026-06-12', trustpilotRating: 4.2, trustpilotReviews: 1500, trustpilotLink: 'https://www.trustpilot.com/review/goatfundedtrader.com', logoDomain: 'goatfundedtrader.com' },
  { id: 8, slug: 'fundedbyme', name: 'FundedByMe', status: 'Active', score: 71, anneeCreation: 2023, prixChallenge: 59, profitSplit: 80, drawdownType: 'EOD', newsTrading: true, smcAllowed: true, eaAllowed: true, payoutDelay: 3, incidents: 2, incidentsDetails: ['Quelques retards payout'], style: ['SMC', 'Scalp', 'Swing'], legalVerified: true, transparencyScore: 13, payoutProof: true, recentRuleChange: false, lastPayoutVerified: '2026-06-08', trustpilotRating: 4.1, trustpilotReviews: 2200, trustpilotLink: 'https://www.trustpilot.com/review/fundedbyme.com', logoDomain: 'fundedbyme.com' },
  { id: 9, slug: 'ment-funding', name: 'Ment Funding', status: 'Active', score: 69, anneeCreation: 2022, prixChallenge: 55, profitSplit: 75, drawdownType: 'Trailing', newsTrading: true, smcAllowed: true, eaAllowed: true, payoutDelay: 4, incidents: 3, incidentsDetails: ['Changement règles récent'], style: ['SMC', 'Scalp'], legalVerified: false, transparencyScore: 11, payoutProof: false, recentRuleChange: true, lastPayoutVerified: '2026-05-30', trustpilotRating: 3.7, trustpilotReviews: 980, trustpilotLink: 'https://www.trustpilot.com/review/mentfunding.com', logoDomain: 'mentfunding.com' },
  { id: 10, slug: 'fundednext', name: 'FundedNext', status: 'Risque', score: 58, anneeCreation: 2022, prixChallenge: 49, profitSplit: 80, drawdownType: 'EOD', newsTrading: true, smcAllowed: true, eaAllowed: true, payoutDelay: 5, incidents: 6, incidentsDetails: ['Retards payout massifs 2024-2025'], style: ['SMC', 'Scalp', 'EA', 'Copy'], legalVerified: false, transparencyScore: 9, payoutProof: false, recentRuleChange: true, lastPayoutVerified: '2026-04-10', trustpilotRating: 3.2, trustpilotReviews: 6500, trustpilotLink: 'https://www.trustpilot.com/review/fundednext.com', logoDomain: 'fundednext.com' },
  { id: 11, slug: 'wegetfunded', name: 'WeGetFunded', status: 'Risque', score: 52, anneeCreation: 2023, prixChallenge: 39, profitSplit: 70, drawdownType: 'EOD', newsTrading: true, smcAllowed: true, eaAllowed: true, payoutDelay: 8, incidents: 5, incidentsDetails: ['Non-paiements signalés'], style: ['SMC', 'Scalp', 'Copy'], legalVerified: false, transparencyScore: 7, payoutProof: false, recentRuleChange: true, lastPayoutVerified: '2026-03-22', trustpilotRating: 2.9, trustpilotReviews: 1200, trustpilotLink: 'https://www.trustpilot.com/review/wegetfunded.com', logoDomain: 'wegetfunded.com' },
  { id: 12, slug: 'myfundedfx', name: 'MyFundedFX', status: 'Active', score: 65, anneeCreation: 2022, prixChallenge: 45, profitSplit: 75, drawdownType: 'Static', newsTrading: false, smcAllowed: true, eaAllowed: true, payoutDelay: 5, incidents: 3, incidentsDetails: ['Retards payout'], style: ['SMC', 'Scalp'], legalVerified: true, transparencyScore: 10, payoutProof: false, recentRuleChange: false, lastPayoutVerified: '2026-05-15', trustpilotRating: 3.5, trustpilotReviews: 1800, trustpilotLink: 'https://www.trustpilot.com/review/myfundedfx.com', logoDomain: 'myfundedfx.com' },
  { id: 13, slug: 'funderpro', name: 'FunderPro', status: 'Active', score: 68, anneeCreation: 2022, prixChallenge: 55, profitSplit: 75, drawdownType: 'Static', newsTrading: true, smcAllowed: true, eaAllowed: false, payoutDelay: 7, incidents: 3, incidentsDetails: ['Retards payout récurrents'], style: ['Swing', 'SMC'], legalVerified: true, transparencyScore: 11, payoutProof: false, recentRuleChange: true, lastPayoutVerified: '2026-05-20', trustpilotRating: 3.6, trustpilotReviews: 1400, trustpilotLink: 'https://www.trustpilot.com/review/funderpro.com', logoDomain: 'funderpro.com' },
  { id: 14, slug: 'apex-trader-funding', name: 'Apex Trader Funding', status: 'Active', score: 71, anneeCreation: 2021, prixChallenge: 147, profitSplit: 90, drawdownType: 'Trailing', newsTrading: true, smcAllowed: true, eaAllowed: true, payoutDelay: 3, incidents: 4, incidentsDetails: ['Plaintes payout >7 jours'], style: ['Scalp', 'SMC', 'EA'], legalVerified: false, transparencyScore: 12, payoutProof: false, recentRuleChange: true, lastPayoutVerified: '2026-06-01', trustpilotRating: 3.9, trustpilotReviews: 9200, trustpilotLink: 'https://www.trustpilot.com/review/apextraderfunding.com', logoDomain: 'apextraderfunding.com' },
  { id: 15, slug: 'my-forex-funds', name: 'My Forex Funds', status: 'Fermée', score: 12, anneeCreation: 2020, prixChallenge: 49, profitSplit: 85, drawdownType: 'Trailing', newsTrading: true, smcAllowed: true, eaAllowed: true, payoutDelay: 14, incidents: 12, incidentsDetails: ['Faillite brutale 2023', 'Non-paiement massif'], style: ['SMC', 'Scalp', 'EA'], legalVerified: false, transparencyScore: 3, payoutProof: false, recentRuleChange: true, trustpilotRating: 1.8, trustpilotReviews: 18500, trustpilotLink: 'https://www.trustpilot.com/review/myforexfunds.com', logoDomain: 'myforexfunds.com' },
  { id: 16, slug: 'the-funded-trader', name: 'The Funded Trader', status: 'Fermée', score: 8, anneeCreation: 2021, prixChallenge: 59, profitSplit: 80, drawdownType: 'EOD', newsTrading: true, smcAllowed: true, eaAllowed: true, payoutDelay: 10, incidents: 9, incidentsDetails: ['Fermeture soudaine 2024', 'Non-paiement massif'], style: ['SMC', 'Scalp', 'EA', 'Copy'], legalVerified: false, transparencyScore: 2, payoutProof: false, recentRuleChange: true, trustpilotRating: 1.4, trustpilotReviews: 9200, trustpilotLink: 'https://www.trustpilot.com/review/thefundedtrader.com', logoDomain: 'thefundedtrader.com' },
  { id: 17, slug: 'fidelcrest', name: 'Fidelcrest', status: 'Fermée', score: 19, anneeCreation: 2018, prixChallenge: 89, profitSplit: 80, drawdownType: 'Static', newsTrading: false, smcAllowed: false, eaAllowed: true, payoutDelay: 21, incidents: 7, incidentsDetails: ['Problèmes paiement chroniques', 'Fermeture 2025'], style: ['Swing'], legalVerified: true, transparencyScore: 5, payoutProof: false, recentRuleChange: true, trustpilotRating: 2.1, trustpilotReviews: 3400, trustpilotLink: 'https://www.trustpilot.com/review/fidelcrest.com', logoDomain: 'fidelcrest.com' },
  { id: 18, slug: 'surgetrader', name: 'SurgeTrader', status: 'Fermée', score: 14, anneeCreation: 2020, prixChallenge: 75, profitSplit: 75, drawdownType: 'Trailing', newsTrading: true, smcAllowed: true, eaAllowed: true, payoutDelay: 12, incidents: 8, incidentsDetails: ['Faillite 2025', 'Traders bloqués'], style: ['SMC', 'Scalp', 'EA'], legalVerified: false, transparencyScore: 4, payoutProof: false, recentRuleChange: true, trustpilotRating: 1.6, trustpilotReviews: 4100, trustpilotLink: 'https://www.trustpilot.com/review/surgetrader.com', logoDomain: 'surgetrader.com' },
];

export function calculatePropRadarScore(firm: Omit<PropFirm, 'score'>): number {
  let score = 0;
  const years = 2026 - firm.anneeCreation;
  if (years >= 2) score += 20;
  else if (years >= 1) score += 10;
  score += firm.transparencyScore || 0;
  if (firm.payoutProof) score += 20;
  score -= firm.incidents * 15;
  if (firm.recentRuleChange) score -= 25;
  if (firm.legalVerified) score += 10;
  if (firm.payoutDelay <= 2) score += 10;
  else if (firm.payoutDelay <= 4) score += 5;
  return Math.max(0, Math.min(100, Math.round(score)));
}