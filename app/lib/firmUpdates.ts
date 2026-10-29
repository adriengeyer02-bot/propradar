import type { Product, PropFirm, RegulatoryEntity, SourceLink } from './propFirms';
import updatesFile from '../data/firm-updates.json';

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

export type FirmUpdate = {
  reviewedAt: string;
  set?: Partial<{
    status: PropFirm['status'];
    score: number;
    priceFrom: number;
    profitSplit: number;
    payoutDelay: string;
    trustpilotRating: number;
    trustpilotReviewCount: number;
    trustpilotSourceUrl: string;
    listedDomainWarning: string | null;
    /** Corrects the listed official site (the base profile pointed to the wrong domain). */
    officialWebsite: string;
    drawdownType: PropFirm['drawdownType'];
    newsTrading: 'Allowed' | 'Restricted' | 'Not recommended' | 'Variable';
    eaAllowed: 'Yes' | 'No' | 'On request' | 'Variable';
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
  changelog: FirmChangelogEntry[];
};

type UpdatesFile = {
  version: number;
  firms: Record<string, FirmUpdate>;
};

const updates = (updatesFile as UpdatesFile).firms ?? {};

export function getFirmUpdate(slug: string): FirmUpdate | undefined {
  return updates[slug];
}

export function getFirmChangelog(slug: string): FirmChangelogEntry[] {
  return [...(updates[slug]?.changelog ?? [])].sort((a, b) => b.date.localeCompare(a.date));
}

export function applyFirmUpdates(firms: PropFirm[]): PropFirm[] {
  return firms.map((firm) => {
    const update = updates[firm.slug];
    if (!update) return firm;

    const set = update.set ?? {};
    const next: PropFirm = {
      ...firm,
      lastReviewed: update.reviewedAt > firm.lastReviewed ? update.reviewedAt : firm.lastReviewed,
      reviewSignals: { ...firm.reviewSignals },
    };

    if (set.status) next.status = set.status;
    if (typeof set.score === 'number') next.score = set.score;
    if (typeof set.priceFrom === 'number') next.priceFrom = set.priceFrom;
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
    if (typeof set.trustpilotRating === 'number') next.trustpilotRating = set.trustpilotRating;
    if (typeof set.trustpilotReviewCount === 'number') next.reviewSignals.trustpilotReviewCount = set.trustpilotReviewCount;
    if (set.trustpilotSourceUrl) next.reviewSignals.trustpilotSourceUrl = set.trustpilotSourceUrl;
    if (typeof set.trustpilotRating === 'number') refreshTrustpilotText(next, update.reviewedAt);
    if (set.officialWebsite) {
      const newUrl = set.officialWebsite;
      const newDomain = new URL(newUrl).hostname.replace(/^www\./, '');
      const oldDomain = firm.logoDomain;
      const isOld = (url?: string) => {
        if (!url || !oldDomain) return false;
        try {
          return new URL(url).hostname.replace(/^www\./, '') === oldDomain;
        } catch {
          return false;
        }
      };
      next.logoDomain = newDomain;
      const official = next.sources.findIndex((source) => isOld(source.url));
      const officialSource = { label: `Official ${firm.name} site`, url: newUrl };
      next.sources = official >= 0
        ? next.sources.map((source, index) => (index === official ? officialSource : source))
        : [officialSource, ...next.sources];
      next.products = next.products.map((product) => (isOld(product.linkToStart) ? { ...product, linkToStart: newUrl } : product));
    }

    if (set.listedDomainWarning !== undefined) {
      next.listedDomainWarning = set.listedDomainWarning ?? undefined;
      if (set.listedDomainWarning) {
        next.logoDomain = undefined;
        next.verdict = set.listedDomainWarning;
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
        update.setEntities.some((entity) => Boolean(entity.jurisdiction) && !/to verify|international|unknown|unconfirmed/i.test(entity.jurisdiction));
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
