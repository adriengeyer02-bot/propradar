import { firmGaps, type PropFirm } from './propFirms';
import { getFirmSearchProfile } from './firmSearchProfiles';
import { firmMetaOverrides } from './firmMetaOverrides';
import { getAuditCaseFile } from './auditCaseFiles';

/**
 * Firm pages that still say almost nothing verified are kept out of Google's
 * index (noindex, follow) and out of the sitemaps, so thin files do not weigh
 * on the rest of the site. The rule is automatic: as soon as the weekly run
 * fills a file below the threshold, the page is indexed again.
 *
 * Always indexed: closed firms (sourced closure record), affiliates, firms
 * with a recorded incident or a Trustpilot withheld notice, a listed-domain
 * warning, an audit case file, or a page tuned for search.
 */
export const THIN_GAP_THRESHOLD = 5;

/** Watchlist placeholder text, not a recorded incident. */
const BOILERPLATE = /not audited in depth yet/i;

export function isThinFirmPage(firm: PropFirm) {
  if (firm.status === 'Fermée') return false;
  if (firm.commercialRelationship === 'Affiliation transparente') return false;
  if (firm.incidentsDetails.some((item) => !BOILERPLATE.test(item))) return false;
  if (firm.reviewSignals.trustpilotRatingWithheld || firm.listedDomainWarning) return false;
  if (getAuditCaseFile(firm.slug) || getFirmSearchProfile(firm.slug) || firmMetaOverrides[firm.slug]) return false;
  return firmGaps(firm).length >= THIN_GAP_THRESHOLD;
}

export const isFirmIndexable = (firm: PropFirm) => !isThinFirmPage(firm);
