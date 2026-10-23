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
    }

    return next;
  });
}
