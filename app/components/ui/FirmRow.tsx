import Link from 'next/link';
import type { ReactNode } from 'react';
import FirmLogo from '../FirmLogo';
import FlagImg from './FlagImg';
import RiskPip from './RiskPip';
import { entityCountries } from '../../lib/jurisdictions';
import ScoreRing from './ScoreRing';
import type { PropFirm } from '../../lib/propFirms';
import { drawdownLabel, priceLabel, profitSplitLabel } from '../../lib/propFirms';
import { toEnglishText } from '../../lib/i18n';
import { legalTone, payoutTone, scoreTone, statusTone, trustpilotPip } from '../../lib/riskTone';

/** Short, informative trading tags only: no tag that would appear on every firm. */
export function firmTags(firm: PropFirm) {
  const tags: string[] = [];
  const text = `${firm.styles.join(' ')} ${firm.bestFor}`.toLowerCase();

  if (text.includes('scalping')) tags.push('Scalping');
  if (firm.newsTrading === 'Autorisé' || firm.newsTrading === 'Allowed') tags.push('News allowed');
  if (firm.eaAllowed === 'Oui' || firm.eaAllowed === 'Yes') tags.push('EA allowed');

  return tags.slice(0, 2);
}

export function marketLabel(firm: PropFirm) {
  return firm.styles.slice(0, 2).map((style) => toEnglishText(style)).join(' / ');
}

export function shortLegal(level: PropFirm['regulatoryAudit']['riskLevel']) {
  if (level === 'Low to medium') return 'Low–med';
  if (level === 'Medium to high') return 'Med–high';
  return level;
}

export type FirmSortKey = 'score' | 'price' | 'split' | 'payout' | 'legal' | 'trustpilot';
export type FirmSort = { key: FirmSortKey; dir: 'asc' | 'desc' };

const COLUMNS: { key: FirmSortKey | null; label: string; className?: string; title?: string }[] = [
  { key: null, label: 'Firm' },
  { key: 'score', label: 'Score' },
  { key: 'price', label: 'From' },
  { key: 'split', label: 'Split', className: 'pr-col-split' },
  { key: null, label: 'Drawdown' },
  { key: 'payout', label: 'Payout', title: 'Payout risk from sourced incidents or proof' },
  { key: 'legal', label: 'Legal', title: 'Legal file risk level' },
  { key: 'trustpilot', label: 'Trustpilot', title: 'Public Trustpilot rating, or Withheld' },
];

/**
 * Column headers. With onSort (comparator), the sortable columns are buttons;
 * without it (home, guides) they are plain labels.
 */
export function FirmTableHead({ sort, onSort }: { sort?: FirmSort | null; onSort?: (key: FirmSortKey) => void } = {}) {
  return (
    <div className="pr-firm-head" role="row">
      {COLUMNS.map((column) => {
        const active = column.key && sort?.key === column.key;
        return (
          <span
            key={column.label}
            role="columnheader"
            className={column.className}
            title={column.title}
            aria-sort={active ? (sort?.dir === 'asc' ? 'ascending' : 'descending') : undefined}
          >
            {column.key && onSort ? (
              <button type="button" className={`pr-sort${active ? ' is-active' : ''}`} onClick={() => onSort(column.key as FirmSortKey)}>
                {column.label}
                <span aria-hidden="true" className="pr-sort-arrow">{active ? (sort?.dir === 'asc' ? '↑' : '↓') : '↕'}</span>
              </button>
            ) : (
              column.label
            )}
          </span>
        );
      })}
      <span role="columnheader"><span className="sr-only">Profile</span></span>
    </div>
  );
}

type FirmRowProps = {
  firm: PropFirm;
  rank?: number;
  /** Extra line under the firm name (search match, proof level...). */
  children?: ReactNode;
  /** Replaces the default "market · tags" subline. */
  subline?: ReactNode;
  href?: string;
};

/** One firm as a compact ranked row: the comparator layout, reused everywhere firms are listed. */
export default function FirmRow({ firm, rank, children, subline, href }: FirmRowProps) {
  const tags = firmTags(firm);
  const countries = entityCountries(firm.regulatoryAudit.entities);
  return (
    <Link href={href ?? `/firm/${firm.slug}`} className={`pr-firm-row pr-edge-${scoreTone(firm.score)}`} role="row">
      <span className="pr-firm-id" role="cell">
        {typeof rank === 'number' ? <span className="pr-firm-rank" aria-hidden="true">{rank}</span> : null}
        <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
        <span className="pr-firm-name">
          <strong>
            {firm.name}
            {firm.status !== 'Active' ? <em className={`pr-tag pr-tone-${statusTone(firm.status)}`}>{toEnglishText(firm.status)}</em> : null}
            {firm.commercialRelationship === 'Affiliation transparente' ? (
              <em className="pr-tag pr-tag-affiliate" title="PropRadar may earn a commission. The score is not affected.">Affiliate</em>
            ) : null}
          </strong>
          <span className="pr-firm-sub">
            {countries.length ? (
              <span className="pr-firm-flags" aria-label={`Registered in ${countries.map((c) => c.name).join(', ')}`}>
                {countries.slice(0, 3).map((c) => <FlagImg key={c.code} code={c.code} name={c.name} />)}
                {countries.length > 3 ? <small>+{countries.length - 3}</small> : null}
              </span>
            ) : null}
            {subline ?? `${marketLabel(firm)}${tags.length ? ` · ${tags.join(' · ')}` : ''}`}
          </span>
          {children}
        </span>
      </span>
      <span className="pr-firm-score" role="cell"><ScoreRing score={firm.score} size="sm" /></span>
      <span className="pr-firm-fig pr-firm-price" role="cell"><small>From</small>{priceLabel(firm)}</span>
      <span className="pr-firm-fig pr-firm-split pr-col-split" role="cell"><small>Split</small>{profitSplitLabel(firm)}</span>
      <span className="pr-firm-fig pr-firm-dd" role="cell"><small>Drawdown</small>{drawdownLabel(firm, toEnglishText)}</span>
      <span className="pr-firm-pips">
        <span className="pr-firm-sig" role="cell"><RiskPip compact label="Payout" value={toEnglishText(firm.reviewSignals.payoutRisk)} tone={payoutTone(firm.reviewSignals.payoutRisk)} /></span>
        <span className="pr-firm-sig" role="cell"><RiskPip compact label="Legal" value={shortLegal(firm.regulatoryAudit.riskLevel)} tone={legalTone(firm.regulatoryAudit.riskLevel)} /></span>
        <span className="pr-firm-sig" role="cell"><RiskPip compact label="Trustpilot" value={trustpilotPip(firm).value} tone={trustpilotPip(firm).tone} /></span>
      </span>
      <span className="pr-firm-go" role="cell" aria-hidden="true">›</span>
    </Link>
  );
}
