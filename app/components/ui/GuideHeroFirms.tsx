import Link from 'next/link';
import FirmLogo from '../FirmLogo';
import RiskPip from './RiskPip';
import ScoreRing from './ScoreRing';
import type { PropFirm } from '../../lib/propFirms';
import { priceLabel } from '../../lib/propFirms';
import { toEnglishText } from '../../lib/i18n';
import { payoutTone } from '../../lib/riskTone';
import { localePath, type Locale } from '../../lib/locales';

type GuideHeroFirmsProps = {
  title: string;
  firms: PropFirm[];
  /** Small facts under the list, e.g. "4 legal files mapped". */
  facts: string[];
  limit?: number;
  moreHref?: string;
  moreLabel?: string;
  /** Page language: firm links get its prefix, labels come from `labels`. */
  locale?: Locale;
  labels?: { payout: string; risk: (value: string) => string; from: (price: string) => string; count: (count: number) => string };
};

const EN_LABELS: NonNullable<GuideHeroFirmsProps['labels']> = {
  payout: 'Payout',
  risk: (value) => value,
  from: (price) => `From ${price}`,
  count: (count) => `${count} firm${count > 1 ? 's' : ''}`,
};

/**
 * Hero panel for guides and rankings: the firms the page is about, with the
 * same score ring and payout dot as the comparator, instead of a stock image.
 */
export default function GuideHeroFirms({ title, firms, facts, limit = 5, moreHref = '#comparison', moreLabel = 'See the full comparison', locale = 'en', labels = EN_LABELS }: GuideHeroFirmsProps) {
  const shown = firms.slice(0, limit);
  if (!shown.length) return null;

  return (
    <aside className="pr-guide-firms" aria-label={title}>
      <div className="pr-guide-firms-head">
        <strong>{title}</strong>
        <span>{labels.count(firms.length)}</span>
      </div>
      <ol>
        {shown.map((firm, index) => (
          <li key={firm.slug}>
            <Link href={localePath(locale, `/firm/${firm.slug}`)}>
              <span className="pr-guide-firms-rank" aria-hidden="true">{index + 1}</span>
              <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
              <span className="pr-guide-firms-name">
                <strong>{firm.name}</strong>
                <span>
                  <RiskPip compact label={labels.payout} value={labels.risk(toEnglishText(firm.reviewSignals.payoutRisk))} tone={payoutTone(firm.reviewSignals.payoutRisk)} />
                  <em>{labels.from(priceLabel(firm))}</em>
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
