import Link from 'next/link';
import type { ReactNode } from 'react';
import FirmLogo from '../FirmLogo';
import RiskPip from './RiskPip';
import ScoreRing from './ScoreRing';
import type { PropFirm } from '../../lib/propFirms';
import { drawdownLabel, formatUsd } from '../../lib/propFirms';
import { toEnglishText } from '../../lib/i18n';
import { legalTone, payoutTone, reviewTone, scoreTone, statusTone } from '../../lib/riskTone';

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

export function FirmTableHead() {
  return (
    <div className="pr-firm-head" role="row">
      <span role="columnheader">Firm</span>
      <span role="columnheader">Score</span>
      <span role="columnheader">From</span>
      <span role="columnheader">Drawdown</span>
      <span role="columnheader">Risk signals</span>
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
          <span>{subline ?? `${marketLabel(firm)}${tags.length ? ` · ${tags.join(' · ')}` : ''}`}</span>
          {children}
        </span>
      </span>
      <span className="pr-firm-score" role="cell"><ScoreRing score={firm.score} size="sm" /></span>
      <span className="pr-firm-fig pr-firm-price" role="cell"><small>From</small>{formatUsd(firm.priceFrom)}</span>
      <span className="pr-firm-fig pr-firm-dd" role="cell"><small>Drawdown</small>{drawdownLabel(firm, toEnglishText)}</span>
      <span className="pr-firm-pips" role="cell">
        <RiskPip compact label="Payout" value={toEnglishText(firm.reviewSignals.payoutRisk)} tone={payoutTone(firm.reviewSignals.payoutRisk)} />
        <RiskPip compact label="Legal" value={shortLegal(firm.regulatoryAudit.riskLevel)} tone={legalTone(firm.regulatoryAudit.riskLevel)} />
        <RiskPip compact label="Reviews" value={toEnglishText(firm.reviewSignals.manipulationRisk ?? 'Moyen')} tone={reviewTone(firm.reviewSignals.manipulationRisk)} />
      </span>
      <span className="pr-firm-go" role="cell" aria-hidden="true">›</span>
    </Link>
  );
}
