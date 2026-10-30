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
import { localePath, type Locale } from '../../lib/locales';
import en, { type Messages } from '../../lib/messages/en';

/** Interface strings a firm row needs (plain data, so client tables can pass it). */
export type RowUi = Pick<Messages, 'table' | 'values' | 'styles'>;
export const EN_ROW_UI: RowUi = { table: en.table, values: en.values, styles: en.styles };

const pick = (map: Record<string, string>, value: string) => map[value] ?? value;

/** Short, informative trading tags only: no tag that would appear on every firm. */
export function firmTags(firm: PropFirm, ui: RowUi = EN_ROW_UI) {
  const tags: string[] = [];
  const text = `${firm.styles.join(' ')} ${firm.bestFor}`.toLowerCase();

  if (text.includes('scalping')) tags.push(ui.table.tagScalping);
  if (firm.newsTrading === 'Autorisé' || firm.newsTrading === 'Allowed') tags.push(ui.table.tagNews);
  if (firm.eaAllowed === 'Oui' || firm.eaAllowed === 'Yes') tags.push(ui.table.tagEa);

  return tags.slice(0, 2);
}

export function marketLabel(firm: PropFirm, ui: RowUi = EN_ROW_UI) {
  return firm.styles.slice(0, 2).map((style) => pick(ui.styles, toEnglishText(style))).join(' / ');
}

export function shortLegal(level: PropFirm['regulatoryAudit']['riskLevel']) {
  if (level === 'Low to medium') return 'Low–med';
  if (level === 'Medium to high') return 'Med–high';
  return level;
}

export type FirmSortKey = 'score' | 'price' | 'split' | 'payout' | 'legal' | 'trustpilot';
export type FirmSort = { key: FirmSortKey; dir: 'asc' | 'desc' };

function columns(t: RowUi['table']): { key: FirmSortKey | null; id: string; label: string; className?: string; title?: string }[] {
  return [
    { key: null, id: 'firm', label: t.firm },
    { key: 'score', id: 'score', label: t.score },
    { key: 'price', id: 'price', label: t.from_ },
    { key: 'split', id: 'split', label: t.split, className: 'pr-col-split' },
    { key: null, id: 'drawdown', label: t.drawdown },
    { key: 'payout', id: 'payout', label: t.payout, title: t.payoutTitle },
    { key: 'legal', id: 'legal', label: t.legal, title: t.legalTitle },
    { key: 'trustpilot', id: 'trustpilot', label: t.trustpilot, title: t.trustpilotTitle },
  ];
}

/**
 * Column headers. With onSort (comparator), the sortable columns are buttons;
 * without it (home, guides) they are plain labels.
 */
export function FirmTableHead({ sort, onSort, ui = EN_ROW_UI }: { sort?: FirmSort | null; onSort?: (key: FirmSortKey) => void; ui?: RowUi } = {}) {
  return (
    <div className="pr-firm-head" role="row">
      {columns(ui.table).map((column) => {
        const active = column.key && sort?.key === column.key;
        return (
          <span
            key={column.id}
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
      <span role="columnheader"><span className="sr-only">{ui.table.profile}</span></span>
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
  locale?: Locale;
  ui?: RowUi;
};

/** One firm as a compact ranked row: the comparator layout, reused everywhere firms are listed. */
export default function FirmRow({ firm, rank, children, subline, href, locale = 'en', ui = EN_ROW_UI }: FirmRowProps) {
  const tags = firmTags(firm, ui);
  const t = ui.table;
  const v = (value: string) => pick(ui.values, value);
  const tp = trustpilotPip(firm);
  const countries = entityCountries(firm.regulatoryAudit.entities);
  return (
    <Link href={href ?? localePath(locale, `/firm/${firm.slug}`)} className={`pr-firm-row pr-edge-${scoreTone(firm.score)}`} role="row">
      <span className="pr-firm-id" role="cell">
        {typeof rank === 'number' ? <span className="pr-firm-rank" aria-hidden="true">{rank}</span> : null}
        <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
        <span className="pr-firm-name">
          <strong>
            {firm.name}
            {firm.status !== 'Active' ? <em className={`pr-tag pr-tone-${statusTone(firm.status)}`}>{v(toEnglishText(firm.status))}</em> : null}
            {firm.commercialRelationship === 'Affiliation transparente' ? (
              <em className="pr-tag pr-tag-affiliate" title={t.affiliateTitle}>{t.affiliate}</em>
            ) : null}
          </strong>
          <span className="pr-firm-sub">
            {countries.length ? (
              <span className="pr-firm-flags" aria-label={t.registeredIn.replace('{countries}', countries.map((c) => c.name).join(', '))}>
                {countries.slice(0, 3).map((c) => <FlagImg key={c.code} code={c.code} name={c.name} />)}
                {countries.length > 3 ? <small>+{countries.length - 3}</small> : null}
              </span>
            ) : null}
            {subline ?? `${marketLabel(firm, ui)}${tags.length ? ` · ${tags.join(' · ')}` : ''}`}
          </span>
          {children}
        </span>
      </span>
      <span className="pr-firm-score" role="cell"><ScoreRing score={firm.score} size="sm" /></span>
      <span className="pr-firm-fig pr-firm-price" role="cell"><small>{t.from_}</small>{v(priceLabel(firm))}</span>
      <span className="pr-firm-fig pr-firm-split pr-col-split" role="cell"><small>{t.split}</small>{v(profitSplitLabel(firm))}</span>
      <span className="pr-firm-fig pr-firm-dd" role="cell"><small>{t.drawdown}</small>{v(drawdownLabel(firm, toEnglishText))}</span>
      <span className="pr-firm-pips">
        <span className="pr-firm-sig" role="cell"><RiskPip compact label={t.payout} value={v(toEnglishText(firm.reviewSignals.payoutRisk))} tone={payoutTone(firm.reviewSignals.payoutRisk)} /></span>
        <span className="pr-firm-sig" role="cell"><RiskPip compact label={t.legal} value={v(shortLegal(firm.regulatoryAudit.riskLevel))} tone={legalTone(firm.regulatoryAudit.riskLevel)} /></span>
        <span className="pr-firm-sig" role="cell"><RiskPip compact label={t.trustpilot} value={v(tp.value)} tone={tp.tone} /></span>
      </span>
      <span className="pr-firm-go" role="cell" aria-hidden="true">›</span>
    </Link>
  );
}
