import type { PropFirm, SourceLink } from './propFirms';
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
  }>;
  addSources?: SourceLink[];
  addIncidents?: string[];
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
    if (typeof set.profitSplit === 'number') next.profitSplit = set.profitSplit;
    if (set.payoutDelay) next.payoutDelay = set.payoutDelay;
    if (typeof set.trustpilotRating === 'number') next.trustpilotRating = set.trustpilotRating;
    if (typeof set.trustpilotReviewCount === 'number') next.reviewSignals.trustpilotReviewCount = set.trustpilotReviewCount;
    if (set.trustpilotSourceUrl) next.reviewSignals.trustpilotSourceUrl = set.trustpilotSourceUrl;
    if (typeof set.trustpilotRating === 'number') refreshTrustpilotText(next, update.reviewedAt);
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
