import data from '../data/contract-audits.json';

/**
 * Contract audit dossiers (terms, FAQ, funded/live agreements, Trustpilot,
 * payout evidence). Documentary layer ONLY: nothing here is read by the score
 * pipeline in propFirms.ts / firmUpdates.ts. Every dossier is partial until
 * the audit register marks it validated; never present it as complete.
 *
 * Built by the normaliser from the audit branch files in `audits/` (see
 * audits/CONTRACT_AUDIT_INTEGRATION_2026-11-25.md).
 */
export type ContractFindingGroup = 'rule' | 'discretion' | 'contradiction' | 'version' | 'payout' | 'safeguard' | 'legal' | 'history' | 'gap';

export type ContractFinding = {
  group: ContractFindingGroup;
  scope: string;
  text: string;
  source: string;
  locator: string;
  checkedOn: string;
  hidden?: boolean;
  sourceType?: string;
  verification?: string;
  /** false = kept in the data for Geyer's review, never rendered. */
  publish?: boolean;
};

export type PayoutEvidence = {
  url: string;
  grade: string;
  reliability: 'tracker' | 'firm' | 'unclassified';
  method?: string;
  amountUSD?: number;
  amountUSDLowerBound?: number;
  count?: number;
  period?: string;
  checkedOn?: string;
  trackerLabel?: string;
  note?: string;
  fundedParticipantsPaidPct?: number;
  xfaParticipantsLivePct?: number;
};

export type ContractAudit = {
  slug: string;
  name: string;
  level: 'counter-audit' | 'first-file';
  status: 'partial';
  checkedOn: string | null;
  programs: string[];
  findings: ContractFinding[];
  payoutEvidence: PayoutEvidence[];
  payoutNote: string | null;
  trustpilot: { url?: string; checkedOn?: string; status?: string; rating?: number; count?: number; publish?: boolean } | null;
  registry: string | null;
  openItems: string[];
  sourceFiles: string[];
  counts: Record<ContractFindingGroup, number>;
};

const BY_SLUG = new Map<string, ContractAudit>((data.firms as unknown as ContractAudit[]).map((firm) => [firm.slug, firm]));

export const CONTRACT_AUDITS_GENERATED_ON = data.generatedOn;

/** Public view: findings held back for owner review are removed. */
export function getContractAudit(slug: string): ContractAudit | undefined {
  const audit = BY_SLUG.get(slug);
  if (!audit) return undefined;
  return { ...audit, findings: audit.findings.filter((finding) => finding.publish !== false) };
}

export function contractAuditSlugs(): string[] {
  return [...BY_SLUG.keys()];
}
