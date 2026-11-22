import type { Product, PropFirm, RegulatoryAudit, RegulatoryEntity, SourceLink, PayoutProof } from './propFirms';
import { firmLogoFor } from './firmLogos';
import updatesFile from '../data/firm-updates.json';
import { getPublishedV4Score, isPublishedV4 } from './scoringV4Published';
import { getPublishedV5Score, isPublishedV5 } from './scoringV5Published';
import { getPublishedV52Score, isPublishedV52 } from './scoringV52Published';

/**
 * Data updates layer.
 *
 * `app/data/firm-updates.json` holds dated, sourced corrections written by the
 * weekly research agent (or by hand). They are applied on top of the base
 * profiles in `propFirms.ts`, so automated updates never rewrite the large
 * TypeScript file and every change stays reviewable in a small JSON diff.
 *
 * Rules (enforced by `scripts/validate-firm-updates.mjs`):
 * - every update carries `reviewedAt` and at least one changelog entry;
 * - every changelog entry cites a public source URL;
 * - status, score drops, domain warnings and new incidents are "sensitive"
 *   and must be approved by a human before merge.
 */

export type FirmChangelogEntry = {
  date: string;
  summary: string;
  source: string;
  fields?: string[];
};

/** A sourced restriction with explicit programme/stage scope; never infer firm-wide applicability. */
export type RestrictiveRule = {
  program: string;
  rule: string;
  impact: string;
  source: string;
  /** For conflicting official documents, say so instead of choosing a rule. */
  status?: 'conflicting';
  /** Scoring fields (SCORING.md section 2). Rules without them are shown but not counted. */
  appliesTo?: string[];
  category?: RestrictiveRuleCategory;
  severity?: 'minor' | 'major' | 'blocking';
  clarity?: 'clear' | 'buried' | 'vague';
};

export const RESTRICTIVE_RULE_CATEGORIES = [
  'vpn-ip-device', 'min-hold-time', 'consistency', 'payout-cap', 'account-ends-after-payouts',
  'min-trading-days', 'news', 'weekend-overnight', 'ea-copy-hft', 'lot-risk-limit',
  'discretionary-clause', 'funded-trailing-drawdown', 'inactivity', 'country-kyc',
  'split-reduction', 'payout-conditions', 'other',
] as const;
export type RestrictiveRuleCategory = (typeof RESTRICTIVE_RULE_CATEGORIES)[number];

/** Main programmes sold on the official pricing page (SCORING.md 2.3). */
export type AuditedProgram = { key: string; name: string };

export type FirmUpdate = {
  reviewedAt: string;
  /** Published, independently approved audit gate; not in raw Claude JSON. */
  scoringVersion?: 4 | 5 | 5.2;
  restrictiveRules?: RestrictiveRule[];
  auditedPrograms?: AuditedProgram[];
  set?: Partial<{
    status: PropFirm['status'];
    /** Sourced editorial correction; does not change the audit level or score. */
    verdict: PropFirm['verdict'];
    /** Dated, sourced substantive dossier; retains its actual review maturity. */
    auditSummary: PropFirm['auditSummary'];
    score: number;
    priceFrom: number;
    /** Official non-USD list price; preserve source currency rather than pretending USD equivalence. */
    nativePriceFrom: NonNullable<PropFirm['nativePriceFrom']>;
    profitSplit: number;
    payoutDelay: string;
    trustpilotRating: number;
    trustpilotReviewCount: number;
    trustpilotSourceUrl: string;
    listedDomainWarning: string | null;
    /**
     * Date on which Trustpilot was seen showing a rating again after a
     * guideline-breach notice recorded in addIncidents. The dated incident
     * stays on the page for the record; the rating in `trustpilotRating` is
     * shown again. Needs Geyer's approval (the validator flags it).
     */
    trustpilotNoticeLifted: string;
    /**
     * Date of the dated editorial review whose `score` already includes the
     * single Trustpilot −6 (SCORING.md 1): the pipeline then does not deduct
     * it again. Absent = the −6 is applied automatically while the notice is current.
     */
    trustpilotPenaltyIncluded: string;
    /** Corrects the listed official site (the base profile pointed to the wrong domain). */
    officialWebsite: string;
    /** Verified locally stored historical brand logo. Never used as a purchase link. */
    historicLogoDomain: string;
    drawdownType: PropFirm['drawdownType'];
    newsTrading: 'Allowed' | 'Restricted' | 'Not recommended' | 'Variable';
    eaAllowed: 'Yes' | 'No' | 'On request' | 'Variable';
    /** The official site states there is no entry fee. */
    noEntryFee: boolean;
  }>;
  /**
   * Replaces the tracked programs with ones read on the official site. Start
   * links are carried over from the existing profile (affiliate or official
   * URLs are never changed by an update).
   */
  setProducts?: Omit<Product, 'linkToStart'>[];
  addSources?: SourceLink[];
  addIncidents?: string[];
  /** Replaces the legal entities of the profile (name, jurisdiction, role...), read on a public source. */
  setEntities?: RegulatoryEntity[];
  /** Refreshes the written legal file without changing the risk level or identified entities. */
  setLegalReview?: Pick<RegulatoryAudit, 'summary' | 'complaintsAndDisputes' | 'redFlags' | 'sources'> &
    Partial<Pick<RegulatoryAudit, 'regulatoryStatus'>>;
  /** Public payout proof to append (never replaces earlier items). */
  addPayoutProofs?: PayoutProof[];
  changelog: FirmChangelogEntry[];
};

type UpdatesFile = {
  version: number;
  firms: Record<string, FirmUpdate>;
};

const updates = (updatesFile as UpdatesFile).firms ?? {};

export function getFirmUpdate(slug: string): FirmUpdate | undefined {
  const update = updates[slug];
  if (!update) return undefined;
  const latestScoreReview = update.changelog.filter((entry) => entry.fields?.includes('score')).map((entry) => entry.date).sort().pop();
  if (isPublishedV52(slug, latestScoreReview)) {
    return { ...update, scoringVersion: 5.2, set: update.set ? { ...update.set, trustpilotPenaltyIncluded: undefined } : undefined };
  }
  if (isPublishedV5(slug, latestScoreReview)) {
    return { ...update, scoringVersion: 5, set: update.set ? { ...update.set, trustpilotPenaltyIncluded: undefined } : undefined };
  }
  if (!isPublishedV4(slug, latestScoreReview)) return update;
  // V4 uses a fresh editorial score; any legacy notice-included marker must
  // not suppress the one operational −6 required by the new V4 contract.
  return { ...update, scoringVersion: 4, set: update.set ? { ...update.set, trustpilotPenaltyIncluded: undefined } : undefined };
}

/** Align the entire public profile with the dated V5 evidence, not just the score ring. */
function applyPublishedV5Evidence(firm: PropFirm, audit: NonNullable<ReturnType<typeof getPublishedV5Score>>): PropFirm {
  const independent = audit.positivePayoutEvidence;
  const proof: PayoutProof | undefined = independent ? {
    date: audit.checkedOn,
    kind: independent.source.includes('payoutjunction.com/') ? 'onchain' : 'press',
    publisher: independent.source.includes('payoutjunction.com/') ? 'Payout Junction' : 'Source indépendante citée dans l’audit V5',
    quote: independent.reason,
    url: independent.source,
    firmReported: false,
  } : undefined;
  const payoutProofs = [...(firm.payoutProofs ?? [])];
  if (proof && !payoutProofs.some((item) => item.url === proof.url)) payoutProofs.unshift(proof);
  return {
    ...firm,
    score: audit.afterRules,
    lastReviewed: firm.lastReviewed > audit.checkedOn ? firm.lastReviewed : audit.checkedOn,
    payoutProof: Boolean(independent),
    payoutProofs,
    legalVerified: audit.contractingEntityVerified,
  };
}

export function getFirmChangelog(slug: string): FirmChangelogEntry[] {
  return [...(updates[slug]?.changelog ?? [])].sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * Firms with a dated, sourced changelog entry in the latest review window:
 * the `days` days up to the most recent entry in the file. Keyed by slug,
 * value = date of that firm's latest entry. Anchored on the file, not on the
 * clock, so a static page never claims "this week" for an old run.
 */
export function recentFirmUpdates(days = 7): { since: string; latest: string; bySlug: Map<string, string>; allBySlug: Map<string, string> } {
  const latestBySlug = new Map<string, string>();
  for (const [slug, update] of Object.entries(updates)) {
    const latest = update.changelog.reduce((max, entry) => (entry.date > max ? entry.date : max), '');
    if (latest) latestBySlug.set(slug, latest);
  }
  const latest = [...latestBySlug.values()].reduce((max, date) => (date > max ? date : max), '');
  if (!latest) return { since: '', latest: '', bySlug: new Map(), allBySlug: latestBySlug };
  const since = new Date(Date.parse(`${latest}T12:00:00Z`) - (days - 1) * 86_400_000).toISOString().slice(0, 10);
  return { since, latest, bySlug: new Map([...latestBySlug].filter(([, date]) => date >= since)), allBySlug: latestBySlug };
}

export function applyFirmUpdates(firms: PropFirm[]): PropFirm[] {
  return firms.map((firm) => {
    const update = updates[firm.slug];
    if (!update) {
      const v52 = getPublishedV52Score(firm);
      if (v52 && v52.final !== null) return applyPublishedV5Evidence(firm, v52);
      const v5 = getPublishedV5Score(firm);
      if (v5 && v5.final !== null) return applyPublishedV5Evidence(firm, v5);
      const v4 = getPublishedV4Score(firm);
      return v4 ? { ...firm, score: v4.editorial, lastReviewed: firm.lastReviewed > v4.checkedOn ? firm.lastReviewed : v4.checkedOn } : firm;
    }

    const set = update.set ?? {};
    const next: PropFirm = {
      ...firm,
      lastReviewed: update.reviewedAt > firm.lastReviewed ? update.reviewedAt : firm.lastReviewed,
      reviewSignals: { ...firm.reviewSignals },
    };

    if (update.setLegalReview) {
      const sources = [...firm.regulatoryAudit.sources];
      const known = new Set(sources.map((source) => source.url));
      for (const source of update.setLegalReview.sources) {
        if (!known.has(source.url)) { sources.push(source); known.add(source.url); }
      }
      next.regulatoryAudit = { ...firm.regulatoryAudit, ...update.setLegalReview, lastChecked: update.reviewedAt, sources };
    }

    if (set.status) next.status = set.status;
    if (set.verdict !== undefined) next.verdict = set.verdict;
    if (set.auditSummary !== undefined) next.auditSummary = set.auditSummary;
    if (typeof set.score === 'number') next.score = set.score;
    if (typeof set.priceFrom === 'number') next.priceFrom = set.priceFrom;
    if (set.nativePriceFrom) next.nativePriceFrom = set.nativePriceFrom;
    if (typeof set.profitSplit === 'number') {
      next.profitSplit = set.profitSplit;
      next.provisional = next.provisional?.filter((field) => field !== 'profitSplit');
    }
    if (set.payoutDelay) next.payoutDelay = set.payoutDelay;
    if (set.drawdownType) {
      next.drawdownType = set.drawdownType;
      next.provisional = next.provisional?.filter((field) => field !== 'drawdownType');
    }
    if (set.newsTrading) next.newsTrading = set.newsTrading;
    if (set.eaAllowed) next.eaAllowed = set.eaAllowed;
    if (typeof set.noEntryFee === 'boolean') next.noEntryFee = set.noEntryFee;
    if (typeof set.trustpilotRating === 'number') next.trustpilotRating = set.trustpilotRating;
    if (typeof set.trustpilotReviewCount === 'number') next.reviewSignals.trustpilotReviewCount = set.trustpilotReviewCount;
    if (set.trustpilotSourceUrl) next.reviewSignals.trustpilotSourceUrl = set.trustpilotSourceUrl;
    const trustpilotCheckedOn = update.changelog
      .filter((entry) => entry.fields?.some((field) => field.startsWith('trustpilot')) || /^https:\/\/(?:[a-z]+\.)?trustpilot\.com\//i.test(entry.source))
      .map((entry) => entry.date).sort().pop() ?? update.reviewedAt;
    if (typeof set.trustpilotRating === 'number') refreshTrustpilotText(next, trustpilotCheckedOn);
    if (set.officialWebsite) {
      const newUrl = set.officialWebsite;
      const newDomain = new URL(newUrl).hostname.replace(/^www\./, '');
      // Some imported firms have no local logo, so `logoDomain` is absent even
      // when their original official URL is known. Use that URL to remove
      // unrelated/stale links when correcting the official website (e.g.
      // levels.com, a health company, versus the prop firm's lv.ls domain).
      const oldDomain = (() => {
        try {
          return new URL(firm.sources[0]?.url ?? '').hostname.replace(/^www\./, '') || firm.logoDomain;
        } catch {
          return firm.logoDomain;
        }
      })();
      const isOld = (url?: string) => {
        if (!url || !oldDomain) return false;
        try {
          return new URL(url).hostname.replace(/^www\./, '') === oldDomain;
        } catch {
          return false;
        }
      };
      next.logoDomain = newDomain;
      const officialSource = { label: `Official ${firm.name} site`, url: newUrl };
      // Remove *every* old-domain link, including obsolete terms URLs. A
      // correction can be an identity collision, not merely a domain change.
      next.sources = [officialSource, ...next.sources.filter((source) => !isOld(source.url))];
      next.regulatoryAudit = {
        ...next.regulatoryAudit,
        sources: next.regulatoryAudit.sources.filter((source) => !isOld(source.url)),
      };
      next.products = next.products.map((product) => (isOld(product.linkToStart) ? { ...product, linkToStart: newUrl } : product));
    }

    if (set.historicLogoDomain && firmLogoFor(set.historicLogoDomain)) {
      next.logoDomain = set.historicLogoDomain;
    }
    if (set.listedDomainWarning !== undefined) {
      next.listedDomainWarning = set.listedDomainWarning ?? undefined;
      if (set.listedDomainWarning) {
        // A warning invalidates checkout, not a separately sourced local brand
        // mark. Only keep the logo if an image is actually stored in our repo.
        if (!firmLogoFor(next.logoDomain)) next.logoDomain = undefined;
        if (set.verdict === undefined) next.verdict = set.listedDomainWarning;
        next.products = next.products.map((product) => ({ ...product, linkToStart: undefined }));
      }
    }

    if (update.addSources?.length) {
      const known = new Set(next.sources.map((source) => source.url));
      next.sources = [...next.sources, ...update.addSources.filter((source) => !known.has(source.url))];
    }

    if (update.setProducts?.length) {
      const startLink = next.products.find((product) => product.linkToStart)?.linkToStart;
      next.products = update.setProducts.map((product) => ({ ...product, linkToStart: next.listedDomainWarning ? undefined : startLink }));
      next.provisional = next.provisional?.filter((field) => field !== 'accountSize');
      const fees = update.setProducts.map((product) => product.entryFeeMin ?? 0).filter((fee) => fee > 0);
      if (typeof set.priceFrom !== 'number' && fees.length) next.priceFrom = Math.min(...fees);
      // The watchlist boilerplate says rules were never read: no longer true.
      const readOn = update.changelog.filter((entry) => entry.fields?.includes('products')).map((entry) => entry.date).sort().pop() ?? update.reviewedAt;
      if (/has not been audited in depth yet/.test(next.verdict)) {
        next.verdict = `${next.name}'s programs, prices and rules were read on its official site on ${readOn}. Payout evidence and the legal file have not been audited in depth, so treat this profile as a starting point, not a recommendation.`;
      }
      if (/^Watchlist profile: an official site or monitoring source is identified/.test(next.auditSummary)) {
        next.auditSummary = `Programs and rules read on the official site on ${readOn}. Reviews, payouts and the legal file still need deeper checks before any recommendation.`;
      }
      if (next.auditStatus === 'À auditer') next.auditStatus = 'Partiellement vérifié';
    }

    // A closed firm is never a purchase option: no start link survives.
    if (next.status === 'Fermée') next.products = next.products.map((product) => ({ ...product, linkToStart: undefined }));

    if (update.setEntities?.length) {
      next.regulatoryAudit = { ...next.regulatoryAudit, entities: update.setEntities };
      // Same rule as the base profile: "entity mapped" needs a known jurisdiction.
      next.legalVerified =
        next.status !== 'Fermée' &&
        !next.listedDomainWarning &&
        update.setEntities.some((entity) => Boolean(entity.jurisdiction) && !/to verify|international|unknown|unconfirmed/i.test(entity.jurisdiction));
    }

    if (update.addPayoutProofs?.length) {
      const seen = new Set((next.payoutProofs ?? []).map((proof) => proof.url + proof.quote));
      next.payoutProofs = [...(next.payoutProofs ?? []), ...update.addPayoutProofs.filter((proof) => !seen.has(proof.url + proof.quote))]
        .sort((a, b) => b.date.localeCompare(a.date));
    }

    if (update.addIncidents?.length) {
      next.incidentsDetails = [...update.addIncidents, ...next.incidentsDetails];
      next.incidents = next.incidents + update.addIncidents.length;

      // Keep the Trustpilot panel consistent with a recorded guideline-breach notice.
      const trustpilotNotice = update.addIncidents.find((item) => /trustpilot/i.test(item) && /(breach of our guidelines|fake reviews)/i.test(item));
      if (trustpilotNotice) {
        next.reviewSignals.trustpilotRatingWithheld = true;
        next.trustpilotRating = undefined;
        next.reviewSignals.trustpilotFlaggedReviewNote = trustpilotNotice;
        next.reviewSignals.trustpilotFlags = ['Trustpilot rating withheld for a guideline breach', ...(next.reviewSignals.trustpilotFlags ?? [])];
      }
    }

    // A later check found the rating shown again: lift the withheld state, keep the dated incident.
    if (set.trustpilotNoticeLifted && typeof set.trustpilotRating === 'number') {
      next.reviewSignals.trustpilotRatingWithheld = false;
      next.trustpilotRating = set.trustpilotRating;
      next.reviewSignals.trustpilotFlags = (next.reviewSignals.trustpilotFlags ?? [])
        .filter((flag) => !/^(?:Trustpilot rating withheld for a guideline breach|Unavailable Trustpilot rating|Public guideline-violation alert)$/.test(flag));
      next.reviewSignals.trustpilotFlags.unshift(`Rating visible again on ${set.trustpilotNoticeLifted}; earlier guideline notice remains historical evidence`);
      next.reviewSignals.trustpilotFlaggedReviewNote = `Trustpilot showed a rating again on ${set.trustpilotNoticeLifted}, without the guideline-breach notice. The earlier notice stays listed under incidents with its date.`;
      refreshTrustpilotText(next, trustpilotCheckedOn);
      // A firm's original hand-written note may have stated "rating unavailable";
      // unlike generic number-only notes, it must be replaced on restoration.
      if (/rating (?:is )?unavailable|unavailable rating|rating signal is unavailable/i.test(next.reviewSignals.trustpilotNote ?? '')) {
        next.reviewSignals.trustpilotNote = `Trustpilot displayed ${set.trustpilotRating.toFixed(1)}/5 across ${(next.reviewSignals.trustpilotReviewCount ?? 0).toLocaleString('en-US')} reviews on ${set.trustpilotNoticeLifted}. An earlier guideline-breach/removed-review notice remains in the incident history. This public review score is not independently verified payout evidence.`;
      }
    }

    const latestScoreReview = update.changelog.filter((entry) => entry.fields?.includes('score')).map((entry) => entry.date).sort().pop();
    const v52 = getPublishedV52Score(next, latestScoreReview);
    if (v52 && v52.final !== null) return applyPublishedV5Evidence(next, v52);
    const v5 = getPublishedV5Score(next, latestScoreReview);
    if (v5 && v5.final !== null) return applyPublishedV5Evidence(next, v5);
    const v4 = getPublishedV4Score(next, latestScoreReview);
    if (v4) {
      next.score = v4.editorial;
      next.lastReviewed = next.lastReviewed > v4.checkedOn ? next.lastReviewed : v4.checkedOn;
    }
    return next;
  });
}

const GENERATED_NOTE = /^(Raw Trustpilot rating [\d.]+\/5\.|Trustpilot rating is not filled in PropRadar)/;
const HAND_WRITTEN_FIGURE = /^Trustpilot \d(?:\.\d)?\/5 with [^.]*\./;

/**
 * Keep the Trustpilot wording in line with an updated rating. The base
 * profiles write the rating into `trustpilotNote` and `trustpilotFlags`, so a
 * refreshed number would otherwise sit next to the old figure (or next to
 * "not filled"). Only the stated figures change; editorial commentary after
 * the first sentence of a hand-written note is kept.
 */
function refreshTrustpilotText(firm: PropFirm, checkedOn: string) {
  const signals = firm.reviewSignals;
  const count = signals.trustpilotReviewCount;
  const figure = `${firm.trustpilotRating?.toFixed(1)}/5${count ? ` across ${count.toLocaleString('en-US')} reviews` : ''} (checked ${checkedOn})`;
  if (GENERATED_NOTE.test(signals.trustpilotNote ?? '')) {
    signals.trustpilotNote = `Raw Trustpilot rating ${figure}. The reliability score above is weighted with transparency, payout incidents and proof level.`;
  } else if (HAND_WRITTEN_FIGURE.test(signals.trustpilotNote ?? '')) {
    signals.trustpilotNote = signals.trustpilotNote.replace(HAND_WRITTEN_FIGURE, `Trustpilot ${figure}.`);
  }
  if (signals.trustpilotFlags?.includes('Raw rating not filled')) {
    signals.trustpilotFlags = signals.trustpilotFlags.map((flag) => (flag === 'Raw rating not filled' ? 'Raw rating available' : flag));
  }
}
