import Link from 'next/link';
import FirmLogo from '../FirmLogo';
import RiskPip from './RiskPip';
import ScoreRing from './ScoreRing';
import type { PropFirm } from '../../lib/propFirms';
import { drawdownLabel, formatUsd, profitSplitLabel } from '../../lib/propFirms';
import { toEnglishText } from '../../lib/i18n';
import { legalTone, payoutTone, reviewTone, statusTone } from '../../lib/riskTone';

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

const reviewRank = { Forte: 3, Moyenne: 2, Faible: 1, 'Non évalué': 0 } as const;

const ROWS: Row[] = [
  {
    label: 'Status',
    render: (firm) => <RiskPip compact label="" value={toEnglishText(firm.status)} tone={statusTone(firm.status)} />,
  },
  {
    label: 'From',
    render: (firm) => formatUsd(firm.priceFrom),
    best: (firms) => indexOfBest(firms, (firm) => (firm.priceFrom > 0 ? firm.priceFrom : undefined), 'min'),
  },
  { label: 'Profit split', render: (firm) => profitSplitLabel(firm) },
  { label: 'Drawdown', render: (firm) => drawdownLabel(firm, toEnglishText) },
  { label: 'News trading', render: (firm) => toEnglishText(firm.newsTrading) },
  { label: 'EA / bots', render: (firm) => toEnglishText(firm.eaAllowed) },
  {
    label: 'Payout risk',
    render: (firm) => <RiskPip compact label="" value={toEnglishText(firm.reviewSignals.payoutRisk)} tone={payoutTone(firm.reviewSignals.payoutRisk)} />,
  },
  {
    label: 'Legal risk',
    render: (firm) => <RiskPip compact label="" value={firm.regulatoryAudit.riskLevel} tone={legalTone(firm.regulatoryAudit.riskLevel)} />,
  },
  {
    label: 'Trustpilot reliability',
    render: (firm) => toEnglishText(firm.reviewSignals.trustpilotReliability),
    best: (firms) => indexOfBest(firms, (firm) => reviewRank[firm.reviewSignals.trustpilotReliability], 'max'),
  },
  {
    label: 'Review manipulation',
    render: (firm) => <RiskPip compact label="" value={toEnglishText(firm.reviewSignals.manipulationRisk ?? 'Non évalué')} tone={reviewTone(firm.reviewSignals.manipulationRisk)} />,
  },
  { label: 'Proof level', render: (firm) => toEnglishText(firm.auditStatus) },
  { label: 'Affiliate link', render: (firm) => (firm.commercialRelationship === 'Affiliation transparente' ? 'Yes, disclosed' : 'No') },
];

/** Criterion-by-criterion table for 2-3 firms. "Best" marks only a single clear winner. */
export default function CompareTable({ firms }: { firms: PropFirm[] }) {
  const shown = firms.slice(0, 3);
  const scoreBest = indexOfBest(shown, (firm) => firm.score, 'max');

  return (
    <div className="pr-compare-wrap">
      <table className="pr-compare" style={{ ['--cols' as string]: shown.length }}>
        <thead>
          <tr>
            <th scope="col"><span className="sr-only">Criterion</span></th>
            {shown.map((firm, index) => (
              <th scope="col" key={firm.slug} className={`pr-series-${index + 1}`}>
                <Link href={`/firm/${firm.slug}`} className="pr-compare-firm">
                  <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="md" />
                  <span>
                    <strong>{firm.name}</strong>
                    <small>Open profile →</small>
                  </span>
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">PropRadar score</th>
            {shown.map((firm, index) => (
              <td key={firm.slug} className={scoreBest === index ? 'is-best' : undefined}>
                <ScoreRing score={firm.score} size="sm" />
                {scoreBest === index ? <em className="pr-best">Highest</em> : null}
              </td>
            ))}
          </tr>
          {ROWS.map((row) => {
            const best = row.best?.(shown);
            return (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                {shown.map((firm, index) => (
                  <td key={firm.slug} className={best === index ? 'is-best' : undefined}>
                    {row.render(firm)}
                    {best === index ? <em className="pr-best">Best</em> : null}
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
