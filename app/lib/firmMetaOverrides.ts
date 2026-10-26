import type { PropFirm } from './propFirms';

type FirmMetaOverride = {
  title: (firm: PropFirm) => string;
  description: (firm: PropFirm) => string;
};

// Title/description overrides for firm pages that already rank on page 1-2
// (Search Console, 22 Jul - 21 Oct 2026) but get no clicks with the generic
// "<Firm> Review: Payout & Risk" title. Each title mirrors the query people
// actually type and only states facts shown on the page. Scores stay dynamic.
export const firmMetaOverrides: Partial<Record<string, FirmMetaOverride>> = {
  // "deifunded legit" (pos ~5.5), "deifunded review" (pos ~7.3)
  'dei-funded': {
    title: (firm) => `Is Dei Funded Legit? Review & Risk Score ${firm.score}/100`,
    description: (firm) =>
      `Is Dei Funded legit? PropRadar keeps it on the watchlist with a ${firm.score}/100 score: legal entity checks, payout signals, rules and red flags to verify before buying.`,
  },
  // "breakout prop payout proof" (pos ~9.8)
  'breakout-prop': {
    title: (firm) => `Breakout Prop Payout Proof, Rules & Review (${firm.score}/100)`,
    description: () =>
      'Breakout Prop payouts: USDC payout rails, what payout evidence exists, crypto-only rules, consistency terms and the risk signals PropRadar tracks.',
  },
  // "maven prop firm consistency rule" (pos ~8.5)
  'maven-trading': {
    title: () => 'Maven Trading Consistency Rule, Payouts & Review',
    description: () =>
      'Does Maven Trading have a consistency rule? Standard 1-, 2- and 3-Step challenges show none; Instant and Buy Now Pay Later can. Payouts, drawdown and risk score.',
  },
  // Firm page and /guides/goat-funded-trader-avis competed for the same
  // queries (positions 46 and 26). The guide targets "review / legit"; the
  // profile targets the data itself.
  'goat-funded-trader': {
    title: (firm) => `GOAT Funded Trader: Score ${firm.score}/100, Rules & Payout Data`,
    description: () =>
      'GOAT Funded Trader data file: legal entities, funded-account rules, payout terms, Trustpilot status and dated updates. Full review in the PropRadar guide.',
  },
  // Same split as GOAT: /firm/topstep (pos ~48) and /guides/topstep-review
  // both answered "topstep review" (pos ~59) and "is topstep legit" (pos ~66).
  // The guide targets review / legit; the profile targets the data.
  topstep: {
    title: (firm) => `Topstep: Score ${firm.score}/100, Rules & Payout Data`,
    description: () =>
      'Topstep data file: Trading Combine rules, consistency target, Maximum Loss Limit, payout paths, Trustpilot signals and dated updates. Full review in the PropRadar guide.',
  },
  // "brightfunded review" (pos ~20), "brightfunded review 2026" (pos ~14)
  brightfunded: {
    title: (firm) => `BrightFunded Review 2026: Payouts & Score ${firm.score}/100`,
    description: () =>
      'BrightFunded review 2026: evaluation rules, fast-payout claims, payout evidence, Trustpilot signals and the cautions behind the PropRadar score.',
  },
};
