import Link from 'next/link';
import FirmLogo from '../../components/FirmLogo';
import PageStructuredData from '../../components/PageStructuredData';
import { createPageMetadata } from '../../lib/pageMetadata';
import type { PropFirm } from '../../lib/propFirms';
import {
  auditStatusClass,
  hasReviewEvidence,
  payoutRiskClass,
  propFirms,
  regulatoryRiskClass,
  reviewReliabilityClass,
  scoreClass,
  hasPayoutRiskSignal,
} from '../../lib/propFirms';
import { toEnglishText } from '../../lib/i18n';
import { HTML_LANG, OG_LOCALE, isLocale, localeAlternates, localePath, type Locale } from '../../lib/locales';
import { fmt, getMessages, numberLocale, tv, type Messages } from '../../lib/messages';
import { SITE_URL } from '../../lib/site';
import type { Metadata } from 'next';

const TRUSTPILOT_DESCRIPTION =
  'Which prop firms have their Trustpilot rating withheld for a guideline breach, with the dated notice for each, and how raw ratings compare with payout and legal evidence.';

/** Trustpilot's own page on what happens when a business breaches its guidelines. */
const TRUSTPILOT_ACTION_URL = 'https://corporate.trustpilot.com/legal/for-everyone/action-we-take';

type WithheldRow = { firm: PropFirm; checked?: string; url?: string; fakeReviews: boolean };

function withheldRows(): WithheldRow[] {
  return propFirms
    .filter((firm) => firm.reviewSignals.trustpilotRatingWithheld)
    .map((firm) => {
      const note = firm.reviewSignals.trustpilotFlaggedReviewNote ?? '';
      const checked = note.match(/\d{4}-\d{2}-\d{2}/)?.[0];
      const url =
        note.match(/https:\/\/[^\s)]+/)?.[0]?.replace(/[.,]$/, '') ??
        firm.reviewSignals.trustpilotSourceUrl ??
        firm.sources.find((source) => /trustpilot\./i.test(source.url))?.url;
      return { firm, checked, url, fakeReviews: /fake reviews|reviews were removed/i.test(note) };
    })
    .sort((a, b) => b.firm.score - a.firm.score);
}

const PATH = '/trustpilot-prop-firms';
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const base = createPageMetadata({
    title: 'Prop Firm Trustpilot Reviews: Ratings, Withheld Scores & Evidence',
    description: TRUSTPILOT_DESCRIPTION,
    path: PATH,
    keywords: ['prop firm Trustpilot', 'prop firm reviews', 'fake Trustpilot reviews', 'Trustpilot rating withheld', 'Trustpilot rating unavailable breach of guidelines', 'reliable prop firm'],
    category: 'Prop firm review research',
  });
  if (locale === 'en') return { ...base, alternates: localeAlternates('en', PATH) };
  const tr = getMessages(locale).trust;
  return {
    ...base,
    title: tr.metaTitle,
    description: tr.metaDescription,
    keywords: undefined,
    alternates: localeAlternates(locale, PATH),
    openGraph: { ...base.openGraph, title: tr.metaTitle, description: tr.metaDescription, url: `${SITE_URL}${localePath(locale, PATH)}`, locale: OG_LOCALE[locale] },
    twitter: { ...base.twitter, title: tr.metaTitle, description: tr.metaDescription },
  };
}

function legalSourceCount(firm: PropFirm) {
  return firm.regulatoryAudit.sources.length || firm.sources.length;
}

function sourceDepthLabel(firm: PropFirm, tr: Messages['trust']) {
  const count = legalSourceCount(firm);
  if (count >= 5) return tr.sourcesDeep;
  if (count >= 3) return tr.sourcesUsable;
  if (count >= 1) return tr.sourcesThin;
  return tr.sourcesNone;
}

function sourceDepthClass(firm: PropFirm) {
  const count = legalSourceCount(firm);
  if (count >= 5) return 'badge-green';
  if (count >= 2) return 'badge-amber';
  return 'badge-red';
}

function isLegalWatchFirm(firm: PropFirm) {
  const risk = firm.regulatoryAudit.riskLevel;
  return !firm.legalVerified || risk === 'High' || risk === 'Critical' || risk === 'To audit';
}

export default async function TrustpilotGuidePage({ params }: Props) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const t = getMessages(locale);
  const tr = t.trust;
  const L = (path: string) => localePath(locale, path);
  const v = (value: string | undefined | null) => tv(t, toEnglishText(value ?? ''));
  const withheld = withheldRows();
  const withheldOpen = withheld.filter((row) => row.firm.status !== 'Fermée');
  const withheldActive = withheld.filter((row) => row.firm.status === 'Active');
  const withheldFake = withheld.filter((row) => row.fakeReviews);
  const latestCheck = withheld.map((row) => row.checked ?? '').sort().at(-1) || '2026-10-30';
  const trustpilotFaq = [
    { question: tr.faq1Q, answer: tr.faq1A },
    { question: tr.faq2Q, answer: fmt(tr.faq2A, { count: withheldOpen.length, date: latestCheck, fake: withheldFake.length }) },
    { question: tr.faq3Q, answer: tr.faq3A },
    { question: tr.faq4Q, answer: tr.faq4A },
  ];
  const watchList = [...propFirms]
    // Only firms with a review alert on file or a public rating below 4.0.
    .filter((firm) => firm.status !== 'Fermée' && (hasReviewEvidence(firm) || firm.reviewSignals.trustpilotReliability === 'Faible'))
    .sort((a, b) => Number(hasReviewEvidence(b)) - Number(hasReviewEvidence(a)) || (a.trustpilotRating ?? 0) - (b.trustpilotRating ?? 0))
    .slice(0, 24);
  const strongReliabilityCount = propFirms.filter((firm) => firm.reviewSignals.trustpilotReliability === 'Forte').length;
  const reviewAlertCount = propFirms.filter((firm) => hasReviewEvidence(firm)).length;
  const deepSourceCount = propFirms.filter((firm) => legalSourceCount(firm) >= 5).length;
  const legalWatchReviewCount = watchList.filter(isLegalWatchFirm).length;
  const payoutWatchReviewCount = watchList.filter((firm) => hasPayoutRiskSignal(firm)).length;
  const highRatingNeedsContext = [...propFirms]
    .filter((firm) => (firm.trustpilotRating ?? 0) >= 4.5 && (hasPayoutRiskSignal(firm) || isLegalWatchFirm(firm)))
    .sort((a, b) => (b.trustpilotRating ?? 0) - (a.trustpilotRating ?? 0))
    .slice(0, 8);

  return (
    <main className="container guide-page">
      <PageStructuredData
        name={locale === 'en' ? 'Prop firm Trustpilot review research' : tr.schemaName}
        description={locale === 'en' ? TRUSTPILOT_DESCRIPTION : tr.metaDescription}
        path={L(PATH)}
        breadcrumbLabel={tr.breadcrumb}
        dateModified={latestCheck}
        faq={trustpilotFaq}
        inLanguage={HTML_LANG[locale]}
        home={{ label: t.guide.breadcrumbHome, url: `${SITE_URL}${L('/')}` }}
        items={watchList.map((firm) => ({
          name: firm.name,
          path: L(`/firm/${firm.slug}`),
          description:
            locale === 'en'
              ? `Trustpilot reliability ${toEnglishText(firm.reviewSignals.trustpilotReliability).toLowerCase()}. ${toEnglishText(firm.verdict)}`
              : fmt(tr.schemaItem, { level: v(firm.reviewSignals.trustpilotReliability) }),
        }))}
      />
      <section className="guide-hero">
        <div>
          <div className="eyebrow">{tr.eyebrow}</div>
          <h1>{tr.h1}</h1>
          <p className="lead">{tr.lead}</p>
          <div className="actions">
            <a href="#rating-withheld" className="btn btn-primary">{fmt(tr.ctaWithheld, { count: withheldOpen.length })}</a>
            <Link prefetch={false} href={L('/prop-firm-comparison')} className="btn">{tr.ctaComparator}</Link>
            <Link href={L('/audit')} className="btn">{tr.ctaProof}</Link>
            <Link href={L('/prop-firm-payout-risk')} className="btn">{tr.ctaPayout}</Link>
          </div>
        </div>
        <dl className="pr-hero-stats">
          <div><dt>{tr.statTracked}</dt><dd>{propFirms.length}</dd></div>
          <div><dt>{tr.statWithheld}</dt><dd>{withheldOpen.length}</dd></div>
          <div><dt>{tr.statStrong}</dt><dd>{strongReliabilityCount}</dd></div>
          <div><dt>{tr.statDeep}</dt><dd>{deepSourceCount}</dd></div>
        </dl>
      </section>

      <section className="section" id="rating-withheld" aria-labelledby="withheld-title">
        <div className="section-heading">
          <div>
            <div className="eyebrow">{tr.withheldEyebrow}</div>
            <h2 id="withheld-title">{fmt(tr.withheldTitle, { count: withheldOpen.length })}</h2>
          </div>
          <p className="section-note">{tr.withheldNote}</p>
        </div>
        <div className="pr-withheld-facts">
          <p>
            <strong>{tr.meansTitle}</strong> {tr.meansText} <a href={TRUSTPILOT_ACTION_URL} target="_blank" rel="noreferrer">{tr.meansLink}</a>
          </p>
          <p>
            <strong>{tr.notTitle}</strong> {fmt(tr.notText, { count: withheldActive.length })}
          </p>
        </div>
        <div className="pr-table-wrap">
          <table className="pr-withheld-table">
            <thead>
              <tr>
                <th scope="col">{tr.thFirm}</th>
                <th scope="col">{tr.thScore}</th>
                <th scope="col">{tr.thStatus}</th>
                <th scope="col">{tr.thFake}</th>
                <th scope="col">{tr.thChecked}</th>
                <th scope="col">{tr.thPage}</th>
              </tr>
            </thead>
            <tbody>
              {withheldOpen.map(({ firm, checked, url, fakeReviews }) => (
                <tr key={firm.slug}>
                  <th scope="row">
                    <Link href={L(`/firm/${firm.slug}`)}>
                      <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                      {firm.name}
                    </Link>
                  </th>
                  <td>{firm.score}/100</td>
                  <td>{v(firm.status)}</td>
                  <td>{fakeReviews ? tr.noticeShown : tr.notStated}</td>
                  <td>{checked ? <time dateTime={checked}>{checked}</time> : tr.notDated}</td>
                  <td>{url ? <a href={url} target="_blank" rel="noreferrer">{tr.open}</a> : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section" aria-labelledby="trustpilot-faq-title">
        <h2 id="trustpilot-faq-title">{tr.faqTitle}</h2>
        <div className="firm-faq-grid">
          {trustpilotFaq.map((item) => (
            <article className="firm-faq-card" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pr-stat-line" aria-label={tr.summaryAria}>
        <dl>
          <div><dt>{tr.statAlerts}</dt><dd>{reviewAlertCount}</dd></div>
          <div><dt>{tr.statPayoutOverlap}</dt><dd>{payoutWatchReviewCount}</dd></div>
          <div><dt>{tr.statLegalOverlap}</dt><dd>{legalWatchReviewCount}</dd></div>
        </dl>
      </section>

      <section className="section guide-card-grid">
        <article className="panel">
          <div className="eyebrow">{tr.methodEyebrow}</div>
          <h2>{tr.methodTitle}</h2>
          <ul className="risk-list">
            <li>{tr.method1}</li>
            <li>{tr.method2}</li>
            <li>{tr.method3}</li>
            <li>{tr.method4}</li>
          </ul>
        </article>
        <article className="panel">
          <div className="eyebrow">{tr.ruleEyebrow}</div>
          <h2>{tr.ruleTitle}</h2>
          <p className="lead">{tr.ruleText}</p>
        </article>
        <article className="panel">
          <div className="eyebrow">{tr.highEyebrow}</div>
          <h2>{tr.highTitle}</h2>
          <div className="guide-signal-stack">
            {(highRatingNeedsContext.length ? highRatingNeedsContext : watchList.slice(0, 8)).map((firm) => (
              <Link href={L(`/firm/${firm.slug}`)} key={firm.slug}>
                <span>{firm.name}</span>
                <span className="guide-signal-stack-meta">
                  <strong>{firm.trustpilotRating ? `${firm.trustpilotRating}/5` : tr.na}</strong>
                  <small>
                    {hasPayoutRiskSignal(firm)
                      ? fmt(tr.payout, { level: v(firm.reviewSignals.payoutRisk) })
                      : v(firm.regulatoryAudit.riskLevel)}
                  </small>
                </span>
              </Link>
            ))}
          </div>
        </article>
      </section>

      <section className="section" id="review-watchlist">
        <div className="section-heading">
          <div>
            <div className="eyebrow">{tr.watchEyebrow}</div>
            <h2>{tr.watchTitle}</h2>
          </div>
        </div>
        <div className="guide-ranking-list">
          {watchList.map((firm) => (
            <Link href={L(`/firm/${firm.slug}`)} className="guide-ranking-row trust-row" key={firm.slug}>
              <div className="firm-result-main">
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} />
                <div>
                  <strong>{firm.name}</strong>
                  {(() => {
                    const note = toEnglishText(firm.reviewSignals.trustpilotNote);
                    return note === t.trustNotes.notFilled || note === getMessages('en').trustNotes.notFilled ? (
                      <span>{t.trustNotes.notFilled}</span>
                    ) : (
                      <span lang={locale !== 'en' ? 'en' : undefined}>{note}</span>
                    );
                  })()}
                  <div className="ranking-proof-chips" aria-label={fmt(tr.proofAria, { name: firm.name })}>
                    <span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>
                      {fmt(tr.payout, { level: v(firm.reviewSignals.payoutRisk) })}
                    </span>
                    <span className={`badge ${regulatoryRiskClass(firm.regulatoryAudit.riskLevel)}`}>
                      {fmt(tr.legal, { level: v(firm.regulatoryAudit.riskLevel) })}
                    </span>
                    <span className={`badge ${sourceDepthClass(firm)}`}>
                      {sourceDepthLabel(firm, tr)}
                    </span>
                  </div>
                </div>
              </div>
              <div><span>{tr.rawRating}</span><strong>{firm.trustpilotRating ? `${firm.trustpilotRating}/5` : v('To verify')}</strong></div>
              <div><span>{tr.reviews}</span><strong>{firm.reviewSignals.trustpilotReviewCount?.toLocaleString(numberLocale(locale)) ?? tr.na}</strong></div>
              <div><span>{tr.countedAlerts}</span><strong>{typeof firm.reviewSignals.trustpilotFlaggedReviewCount === 'number' ? firm.reviewSignals.trustpilotFlaggedReviewCount : '—'}</strong></div>
              <div>
                <span>{tr.reliability}</span>
                <strong className={`badge ${reviewReliabilityClass(firm.reviewSignals.trustpilotReliability)}`}>{v(firm.reviewSignals.trustpilotReliability)}</strong>
                <small>{fmt(tr.sourceLinks, { count: legalSourceCount(firm) })}</small>
                <span className={`badge ${auditStatusClass(firm.auditStatus)}`}>{v(firm.auditStatus)}</span>
              </div>
              <span className={`badge ${scoreClass(firm.reviewSignals.trustpilotReliabilityScore)}`}>
                {firm.reviewSignals.trustpilotReliabilityScore}/100
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
