import Link from 'next/link';
import FirmLogo from '../FirmLogo';
import RiskPip from './RiskPip';
import ScoreRing from './ScoreRing';
import type { PropFirm } from '../../lib/propFirms';
import { drawdownLabel, priceLabel, profitSplitLabel } from '../../lib/propFirms';
import { toEnglishText } from '../../lib/i18n';
import { legalTone, payoutTone, statusTone, trustpilotPip } from '../../lib/riskTone';
import { localePath, type Locale } from '../../lib/locales';

/** Interface strings of the table (English by default; pages pass their own language). */
export type CompareTableLabels = {
  criterion: string;
  openProfile: string;
  propradarScore: string;
  highest: string;
  best: string;
  status: string;
  from: string;
  split: string;
  drawdown: string;
  news: string;
  ea: string;
  payoutRisk: string;
  legalRisk: string;
  trustpilot: string;
  proof: string;
  affiliate: string;
  affiliateYes: string;
  affiliateNo: string;
};

const EN_LABELS: CompareTableLabels = {
  criterion: 'Criterion',
  openProfile: 'Open profile →',
  propradarScore: 'PropRadar score',
  highest: 'Highest',
  best: 'Best',
  status: 'Status',
  from: 'From',
  split: 'Profit split',
  drawdown: 'Drawdown',
  news: 'News trading',
  ea: 'EA / bots',
  payoutRisk: 'Payout risk',
  legalRisk: 'Legal risk',
  trustpilot: 'Trustpilot',
  proof: 'Proof level',
  affiliate: 'Affiliate link',
  affiliateYes: 'Yes, disclosed',
  affiliateNo: 'No',
};

type Row = {
  label: string;
  render: (firm: PropFirm) => React.ReactNode;
  /** Returns the index of the best firm for this row, if one stands out. */
  best?: (firms: PropFirm[]) => number | undefined;
};

function indexOfBest(firms: PropFirm[], value: (firm: PropFirm) => number | undefined, mode: 'max' | 'min') {
  const values = firms.map(value);
  const valid = values.filter((v): v is number => typeof v === 'number');
  if (valid.length < 2) return undefined;
  const target = mode === 'max' ? Math.max(...valid) : Math.min(...valid);
  const winners = values.filter((v) => v === target).length;
  return winners === 1 ? values.indexOf(target) : undefined;
}

function buildRows(l: CompareTableLabels, v: (value: string) => string): Row[] {
  return [
    {
      label: l.status,
      render: (firm) => <RiskPip compact label="" value={v(toEnglishText(firm.status))} tone={statusTone(firm.status)} />,
    },
    {
      label: l.from,
      render: (firm) => v(priceLabel(firm)),
      best: (firms) => indexOfBest(firms, (firm) => (firm.priceFrom > 0 ? firm.priceFrom : undefined), 'min'),
    },
    { label: l.split, render: (firm) => v(profitSplitLabel(firm)) },
    { label: l.drawdown, render: (firm) => v(drawdownLabel(firm, toEnglishText)) },
    { label: l.news, render: (firm) => v(toEnglishText(firm.newsTrading)) },
    { label: l.ea, render: (firm) => v(toEnglishText(firm.eaAllowed)) },
    {
      label: l.payoutRisk,
      render: (firm) => <RiskPip compact label="" value={v(toEnglishText(firm.reviewSignals.payoutRisk))} tone={payoutTone(firm.reviewSignals.payoutRisk)} />,
    },
    {
      label: l.legalRisk,
      render: (firm) => <RiskPip compact label="" value={v(firm.regulatoryAudit.riskLevel)} tone={legalTone(firm.regulatoryAudit.riskLevel)} />,
    },
    {
      label: l.trustpilot,
      render: (firm) => <RiskPip compact label="" value={v(trustpilotPip(firm).value)} tone={trustpilotPip(firm).tone} />,
      best: (firms) => indexOfBest(firms, (firm) => (firm.reviewSignals.trustpilotRatingWithheld ? 0 : firm.trustpilotRating ?? 0), 'max'),
    },
    { label: l.proof, render: (firm) => v(toEnglishText(firm.auditStatus)) },
    { label: l.affiliate, render: (firm) => (firm.commercialRelationship === 'Affiliation transparente' ? l.affiliateYes : l.affiliateNo) },
  ];
}

type CompareTableProps = {
  firms: PropFirm[];
  labels?: CompareTableLabels;
  /** Translations of short data values (risk levels, Yes/No...), keyed by their English text. */
  values?: Record<string, string>;
  locale?: Locale;
};

/** Criterion-by-criterion table for 2-3 firms. "Best" marks only a single clear winner. */
export default function CompareTable({ firms, labels = EN_LABELS, values, locale = 'en' }: CompareTableProps) {
  const shown = firms.slice(0, 3);
  const scoreBest = indexOfBest(shown, (firm) => firm.score, 'max');
  const v = (value: string) => values?.[value] ?? value;
  const rows = buildRows(labels, v);

  return (
    <div className="pr-compare-wrap">
      <table className="pr-compare" style={{ ['--cols' as string]: shown.length }}>
        <thead>
          <tr>
            <th scope="col"><span className="sr-only">{labels.criterion}</span></th>
            {shown.map((firm, index) => (
              <th scope="col" key={firm.slug} className={`pr-series-${index + 1}`}>
                <Link href={localePath(locale, `/firm/${firm.slug}`)} className="pr-compare-firm">
                  <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="md" />
                  <span>
                    <strong>{firm.name}</strong>
                    <small>{labels.openProfile}</small>
                  </span>
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{labels.propradarScore}</th>
            {shown.map((firm, index) => (
              <td key={firm.slug} className={scoreBest === index ? 'is-best' : undefined}>
                <ScoreRing score={firm.score} size="sm" label={labels.propradarScore} />
                {scoreBest === index ? <em className="pr-best">{labels.highest}</em> : null}
              </td>
            ))}
          </tr>
          {rows.map((row) => {
            const best = row.best?.(shown);
            return (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                {shown.map((firm, index) => (
                  <td key={firm.slug} className={best === index ? 'is-best' : undefined}>
                    {row.render(firm)}
                    {best === index ? <em className="pr-best">{labels.best}</em> : null}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
