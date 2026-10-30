import type { Metadata } from 'next';
import Link from 'next/link';
import FirmLogo from '../../components/FirmLogo';
import {
  formatUsd,
  hasPayoutRiskSignal,
  isProvisional,
  propFirms,
  type Product,
  type PropFirm,
} from '../../lib/propFirms';
import { entityCountries } from '../../lib/jurisdictions';
import { SITE_NAME, SITE_URL } from '../../lib/site';
import { HTML_LANG, OG_LOCALE, isLocale, localeAlternates, localePath, type Locale } from '../../lib/locales';
import { fmt, getMessages, tv, type Messages } from '../../lib/messages';
import { localizedGuidePath } from '../../lib/guideI18n';
import { rich } from '../../lib/rich';

const PATH = '/prop-firm-challenge';
const PUBLISHED_AT = '2026-10-29';

type ChallengeRow = { firm: PropFirm; product: Product };
type Model = 'Challenge' | 'Futures evaluation' | 'Instant funding';

/**
 * Only firm files whose split and account sizes were read on a source, and
 * only programs with a listed entry fee: every number on this page comes from
 * those files, nothing is estimated.
 */
const rows: ChallengeRow[] = propFirms
  .filter((firm) => firm.status !== 'Fermée' && !isProvisional(firm, 'profitSplit') && !isProvisional(firm, 'accountSize'))
  .flatMap((firm) => firm.products.map((product) => ({ firm, product })))
  .filter(({ product }) => (product.entryFeeMin ?? 0) > 0 && product.type !== 'Scaling');

const byModel = (model: Model) =>
  rows.filter((row) => row.product.type === model).sort((a, b) => b.firm.score - a.firm.score || a.firm.name.localeCompare(b.firm.name));

const fees = rows.map((row) => row.product.entryFeeMin as number).sort((a, b) => a - b);
const medianFee = fees.length ? fees[Math.floor(fees.length / 2)] : 0;
const cheapest = [...rows].sort((a, b) => (a.product.entryFeeMin as number) - (b.product.entryFeeMin as number))[0];
const firmCount = new Set(rows.map((row) => row.firm.slug)).size;
const updatedAt = rows.reduce((latest, row) => (row.firm.lastReviewed > latest ? row.firm.lastReviewed : latest), PUBLISHED_AT);
const assessedPayoutCount = propFirms.filter((firm) => firm.status !== 'Fermée' && hasPayoutRiskSignal(firm)).length;
const closedCount = propFirms.filter((firm) => firm.status === 'Fermée').length;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const c = getMessages(locale).challenge;
  const description = fmt(c.metaDescription, { count: rows.length });
  return {
    title: c.metaTitle,
    description,
    ...(locale === 'en'
      ? { keywords: ['prop firm challenge', 'prop firm challenge rules', 'prop firm challenge cost', 'cheapest prop firm challenge', '1-step vs 2-step challenge', 'futures prop firm evaluation'] }
      : {}),
    authors: [{ name: 'PropRadar Research', url: localePath(locale, '/audit') }],
    publisher: SITE_NAME,
    category: 'Prop firm research',
    alternates: localeAlternates(locale, PATH),
    openGraph: {
      title: c.metaTitle,
      description,
      url: `${SITE_URL}${localePath(locale, PATH)}`,
      type: 'article',
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      modifiedTime: updatedAt,
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: c.compareTitle }],
    },
    twitter: { card: 'summary_large_image', title: c.metaTitle, description },
  };
}

function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, '\\u003c') };
}

/** "variable by program" style values are shown as a pointer to the firm file, not as a rule. */
function ruleCell(value: string | undefined, t: Messages) {
  const text = (value ?? '').trim();
  if (!text || /^(variable|varies|program-specific|depends on the selected plan|account-specific|specific futures rules|futures-specific)/i.test(text)) {
    return <span className="pr-muted">{t.challenge.varies}</span>;
  }
  return tv(t, text);
}

function accountRange(product: Product, t: Messages) {
  const fmt = (n: number) =>
    n >= 1_000_000 ? `$${+(n / 1_000_000).toFixed(1)}M` : n >= 1000 ? `$${Math.round(n / 1000)}K` : `$${n}`;
  if (!product.accountSizeMin && !product.accountSizeMax) return <span className="pr-muted">{tv(t, 'To verify')}</span>;
  return product.accountSizeMin === product.accountSizeMax ? fmt(product.accountSizeMin) : `${fmt(product.accountSizeMin)}–${fmt(product.accountSizeMax)}`;
}

/** "FTMO Challenge" under "FTMO" reads twice: drop the firm name from the program label. */
function programName(firm: PropFirm, product: Product) {
  const name = product.name.startsWith(`${firm.name} `) ? product.name.slice(firm.name.length + 1) : product.name;
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function ChallengeTable({ model, caption, t, locale }: { model: Model; caption: string; t: Messages; locale: Locale }) {
  const c = t.challenge;
  const list = byModel(model);
  if (!list.length) return null;
  return (
    <div className="guide-rule-table-wrap">
      <table className="guide-rule-table pr-challenge-table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            <th scope="col">{c.thFirm}</th>
            <th scope="col">{c.thFee}</th>
            <th scope="col">{c.thAccounts}</th>
            <th scope="col">{c.thTarget}</th>
            <th scope="col">{c.thDaily}</th>
            <th scope="col">{c.thMax}</th>
            <th scope="col">{c.thChecked}</th>
          </tr>
        </thead>
        <tbody>
          {list.map(({ firm, product }) => (
            <tr key={`${firm.slug}-${product.id}`}>
              <th scope="row">
                <Link href={localePath(locale, `/firm/${firm.slug}`)} className="pr-challenge-firm">
                  <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                  <span>
                    <strong>{firm.name}</strong>
                    <small>
                      {programName(firm, product)}
                      {firm.status === 'À surveiller' ? <em className="pr-challenge-watch">{c.watchlist}</em> : null}
                    </small>
                  </span>
                </Link>
              </th>
              <td className="pr-num">{formatUsd(product.entryFeeMin as number)}</td>
              <td className="pr-nowrap">{accountRange(product, t)}</td>
              <td>{ruleCell(product.profitTarget, t)}</td>
              <td>{ruleCell(product.maxDailyLoss, t)}</td>
              <td>{ruleCell(product.maxDrawdown, t)}</td>
              <td><time dateTime={firm.lastReviewed}>{firm.lastReviewed}</time></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function example(slug: string, productId?: string) {
  const firm = propFirms.find((f) => f.slug === slug);
  const product = firm?.products.find((p) => !productId || p.id === productId);
  return firm && product ? { firm, product } : undefined;
}

export default async function PropFirmChallengePage({ params }: Props) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const t = getMessages(locale);
  const c = t.challenge;
  const L = (path: string) => localePath(locale, path);
  const G = (slug: string) => localizedGuidePath(locale, slug);
  const pageUrl = `${SITE_URL}${L(PATH)}`;
  const ftmo = example('ftmo');
  const fivers = example('the5ers');
  const cti1 = example('city-traders-imperium', 'cti-one-step');
  const twoStepExamples = [ftmo, fivers].filter(Boolean) as ChallengeRow[];
  const counts = {
    challenge: byModel('Challenge').length,
    futures: byModel('Futures evaluation').length,
    instant: byModel('Instant funding').length,
  };

  const faq = [
    { question: c.faq1Q, answer: c.faq1A },
    {
      question: c.faq2Q,
      answer: fees.length
        ? fmt(c.faq2A, { count: rows.length, lowest: formatUsd(fees[0]), firm: cheapest?.firm.name ?? '', median: formatUsd(medianFee) }).replace(' ()', '').replace('（）', '')
        : c.faq2None,
    },
    { question: c.faq3Q, answer: c.faq3A },
    { question: c.faq4Q, answer: c.faq4A },
    { question: c.faq5Q, answer: c.faq5A },
    { question: c.faq6Q, answer: fmt(c.faq6A, { assessed: assessedPayoutCount, closed: closedCount }) },
  ];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${pageUrl}#article`,
    headline: c.metaTitle,
    description: fmt(c.metaDescription, { count: rows.length }),
    url: pageUrl,
    inLanguage: HTML_LANG[locale],
    isAccessibleForFree: true,
    datePublished: PUBLISHED_AT,
    dateModified: updatedAt,
    author: { '@type': 'Organization', '@id': `${SITE_URL}/audit#research`, name: 'PropRadar Research', url: `${SITE_URL}/audit` },
    publisher: { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
  };
  const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: c.compareTitle,
    numberOfItems: rows.length,
    itemListElement: [...byModel('Challenge'), ...byModel('Futures evaluation'), ...byModel('Instant funding')].map((row, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${row.firm.name} ${row.product.name}`,
      url: `${SITE_URL}${L(`/firm/${row.firm.slug}`)}`,
    })),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.guide.breadcrumbHome, item: `${SITE_URL}${L('/')}` },
      { '@type': 'ListItem', position: 2, name: c.breadcrumb, item: pageUrl },
    ],
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
  };

  const [reviewedBefore, reviewedAfter = ''] = t.guide.reviewedBy.split('{name}');
  const exampleLink = ({ firm, product }: ChallengeRow) => (
    <Link href={L(`/firm/${firm.slug}`)}>{firm.name} {programName(firm, product)}</Link>
  );

  return (
    <main className="container guide-page pr-challenge-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(listSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />

      <section className="guide-hero pr-challenge-hero">
        <div>
          <div className="eyebrow">{c.eyebrow}</div>
          <h1>{fmt(c.h1, { count: rows.length })}</h1>
          <p className="lead">{c.lead}</p>
          <div className="guide-byline">
            <span className="guide-byline-mark" aria-hidden="true">PR</span>
            <div>
              <strong>{reviewedBefore}<Link href={L('/audit')}>PropRadar Research</Link>{reviewedAfter}</strong>
              <small>{c.bylineNote}</small>
            </div>
            <time dateTime={updatedAt}>{fmt(t.guide.updated, { date: updatedAt })}</time>
          </div>
          <div className="actions">
            <a href="#compare" className="btn btn-primary">{c.ctaCompare}</a>
            <Link prefetch={false} href={L('/prop-firm-comparison')} className="btn">{c.ctaTable}</Link>
          </div>
        </div>
        <dl className="pr-challenge-facts">
          <div><dt>{c.factPrograms}</dt><dd>{rows.length}</dd></div>
          <div><dt>{c.factFirms}</dt><dd>{firmCount}</dd></div>
          <div><dt>{c.factLowest}</dt><dd>{fees.length ? formatUsd(fees[0]) : '—'}</dd></div>
          <div><dt>{c.factMedian}</dt><dd>{medianFee ? formatUsd(medianFee) : '—'}</dd></div>
        </dl>
      </section>

      <article className="pr-prose">
        <section aria-labelledby="what-title">
          <h2 id="what-title">{c.whatTitle}</h2>
          <p>{c.whatP1}</p>
          <p>{c.whatP2}</p>
        </section>

        <section aria-labelledby="models-title">
          <h2 id="models-title">{c.modelsTitle}</h2>
          <h3>{c.twoTitle}</h3>
          <p>
            {c.twoText}
            {twoStepExamples.length ? (
              <>
                {' '}
                {rich(c.twoExamples, {
                  examples: twoStepExamples.map((row, index) => (
                    <span key={row.firm.slug}>
                      {index ? c.and : ''}
                      {rich(c.twoExample, {
                        link: exampleLink(row),
                        target: tv(t, row.product.profitTarget),
                        daily: tv(t, row.product.maxDailyLoss),
                        max: tv(t, row.product.maxDrawdown),
                      })}
                    </span>
                  )),
                })}
              </>
            ) : null}
          </p>
          <h3>{c.oneTitle}</h3>
          <p>
            {c.oneText}
            {cti1 ? (
              <>
                {' '}
                {rich(c.oneExample, { link: exampleLink(cti1), target: tv(t, cti1.product.profitTarget), max: tv(t, cti1.product.maxDrawdown) })}
              </>
            ) : null}
          </p>
          <h3>{c.instantTitle}</h3>
          <p>
            {counts.instant === 1 ? c.instantTextOne : fmt(c.instantText, { count: counts.instant })}{' '}
            <Link href={G('prop-firm-instant-funding')}>{c.instantLink}</Link>.
          </p>
          <h3>{c.futuresTitle}</h3>
          <p>
            {c.futuresText}{' '}
            <Link href={G('meilleure-prop-firm-futures')}>{c.futuresLink}</Link>.
          </p>
        </section>

        <section aria-labelledby="rules-title">
          <h2 id="rules-title">{c.rulesTitle}</h2>
          <ul className="pr-rule-list">
            <li><strong>{c.ruleDailyTitle}</strong> {c.ruleDailyText}</li>
            <li>
              <strong>{c.ruleMaxTitle}</strong> {c.ruleMaxText} <Link href={G('prop-firm-drawdown')}>{c.ruleMaxLink}</Link>.
            </li>
            <li><strong>{c.ruleTargetTitle}</strong> {c.ruleTargetText}</li>
            <li>
              <strong>{c.ruleConsistencyTitle}</strong> {c.ruleConsistencyText}{' '}
              <Link href={G('prop-firm-sans-consistency-rule')}>{c.ruleConsistencyLink}</Link>.
            </li>
            <li>
              <strong>{c.ruleNewsTitle}</strong> {c.ruleNewsText}{' '}
              <Link href={G('prop-firm-news-trading')}>{c.ruleNewsLink}</Link> ·{' '}
              <Link href={G('prop-firm-ea-algo')}>{c.ruleEaLink}</Link>.
            </li>
          </ul>
        </section>

        <section aria-labelledby="checks-title">
          <h2 id="checks-title">{c.checksTitle}</h2>
          <ol className="pr-rule-list">
            <li><strong>{c.checkWhoTitle}</strong> {rich(c.checkWhoText, { link: <Link href={`${L('/audit')}#jurisdictions`}>{c.checkWhoLink}</Link> })}</li>
            <li><strong>{c.checkPayoutTitle}</strong> {rich(c.checkPayoutText, { link: <Link href={L('/prop-firm-payout-risk')}>{c.checkPayoutLink}</Link> })}</li>
            <li><strong>{c.checkReviewTitle}</strong> {rich(c.checkReviewText, { link: <Link href={L('/trustpilot-prop-firms')}>{c.checkReviewLink}</Link> })}</li>
            <li><strong>{c.checkRulesTitle}</strong> {c.checkRulesText}</li>
            <li><strong>{c.checkDealsTitle}</strong> {rich(c.checkDealsText, { link: <Link href={L('/promos')}>{c.checkDealsLink}</Link> })}</li>
          </ol>
        </section>
      </article>

      <section className="section" id="compare" aria-labelledby="compare-title">
        <div className="section-heading">
          <div>
            <div className="eyebrow">{c.compareEyebrow}</div>
            <h2 id="compare-title">{c.compareTitle}</h2>
          </div>
          <p className="section-note">{c.compareNote}</p>
        </div>

        <h3 className="pr-challenge-subhead" id="forex">{fmt(c.forexHead, { count: counts.challenge })}</h3>
        <ChallengeTable model="Challenge" caption={c.forexCaption} t={t} locale={locale} />

        <h3 className="pr-challenge-subhead" id="futures">{fmt(c.futuresHead, { count: counts.futures })}</h3>
        <ChallengeTable model="Futures evaluation" caption={c.futuresCaption} t={t} locale={locale} />

        <h3 className="pr-challenge-subhead" id="instant">{fmt(c.instantHead, { count: counts.instant })}</h3>
        <ChallengeTable model="Instant funding" caption={c.instantCaption} t={t} locale={locale} />

        <p className="pr-table-more">
          <Link prefetch={false} className="pr-link" href={L('/prop-firm-comparison')}>
            {fmt(c.filterAll, { count: propFirms.length })} <span aria-hidden="true">→</span>
          </Link>
        </p>
      </section>

      <section className="section" aria-labelledby="challenge-faq-title">
        <div className="section-heading">
          <div>
            <div className="eyebrow">{c.faqEyebrow}</div>
            <h2 id="challenge-faq-title">{c.faqTitle}</h2>
          </div>
        </div>
        <div className="firm-faq-grid">
          {faq.map((item) => (
            <article className="firm-faq-card" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="next-title">
        <div className="section-heading">
          <div>
            <div className="eyebrow">{c.nextEyebrow}</div>
            <h2 id="next-title">{c.nextTitle}</h2>
          </div>
        </div>
        <ul className="pr-related-links">
          <li><Link href={G('prop-firm-pas-cher')}>{c.linkCheap}</Link></li>
          <li><Link href={G('prop-firm-sans-challenge')}>{c.linkNoChallenge}</Link></li>
          <li><Link href={G('prop-firm-pour-debutant')}>{c.linkBeginner}</Link></li>
          <li><Link href={G('prop-firm-payout-rapide')}>{c.linkFast}</Link></li>
          <li><Link href={G('meilleure-prop-firm-2026')}>{c.linkBest}</Link></li>
          <li><Link href={G('meilleure-prop-firm-forex')}>{c.linkForex}</Link></li>
        </ul>
        <p className="pr-chain-note">
          {fmt(c.chainNote, {
            count: [...new Set(rows.flatMap((row) => entityCountries(row.firm.regulatoryAudit.entities).map((country) => country.name)))].length,
          })}
        </p>
      </section>
    </main>
  );
}
