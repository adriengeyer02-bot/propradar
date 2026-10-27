import Link from 'next/link';
import FirmLogo from '../FirmLogo';
import RiskPip from './RiskPip';
import ScoreRing from './ScoreRing';
import type { PropFirm } from '../../lib/propFirms';
import { formatUsd } from '../../lib/propFirms';
import { toEnglishText } from '../../lib/i18n';
import { payoutTone } from '../../lib/riskTone';

type GuideHeroFirmsProps = {
  title: string;
  firms: PropFirm[];
  /** Small facts under the list, e.g. "4 legal files mapped". */
  facts: string[];
  limit?: number;
  moreHref?: string;
  moreLabel?: string;
};

/**
 * Hero panel for guides and rankings: the firms the page is about, with the
 * same score ring and payout dot as the comparator, instead of a stock image.
 */
export default function GuideHeroFirms({ title, firms, facts, limit = 5, moreHref = '#comparison', moreLabel = 'See the full comparison' }: GuideHeroFirmsProps) {
  const shown = firms.slice(0, limit);
  if (!shown.length) return null;

  return (
    <aside className="pr-guide-firms" aria-label={title}>
      <div className="pr-guide-firms-head">
        <strong>{title}</strong>
        <span>{firms.length} firm{firms.length > 1 ? 's' : ''}</span>
      </div>
      <ol>
        {shown.map((firm, index) => (
          <li key={firm.slug}>
            <Link href={`/firm/${firm.slug}`}>
              <span className="pr-guide-firms-rank" aria-hidden="true">{index + 1}</span>
              <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
              <span className="pr-guide-firms-name">
                <strong>{firm.name}</strong>
                <span>
                  <RiskPip compact label="Payout" value={toEnglishText(firm.reviewSignals.payoutRisk)} tone={payoutTone(firm.reviewSignals.payoutRisk)} />
                  <em>From {formatUsd(firm.priceFrom)}</em>
                </span>
              </span>
              <ScoreRing score={firm.score} size="sm" />
            </Link>
          </li>
        ))}
      </ol>
      <div className="pr-guide-firms-foot">
        {facts.length ? <p>{facts.join(' · ')}</p> : null}
        <a href={moreHref} className="pr-link">{moreLabel} <span aria-hidden="true">↓</span></a>
      </div>
    </aside>
  );
}
