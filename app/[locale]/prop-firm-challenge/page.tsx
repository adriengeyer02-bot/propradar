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
import { getSeoGuidePath } from '../../lib/seoGuides';
import { SITE_NAME, SITE_URL } from '../../lib/site';

const PATH = '/prop-firm-challenge';
const TITLE = 'Prop Firm Challenge 2026: Rules, Prices & Models Compared';
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

const DESCRIPTION = `How a prop firm challenge works: 1-step, 2-step, instant and futures models, the rules that end an account, and ${rows.length} programs compared by fee and drawdown.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['prop firm challenge', 'prop firm challenge rules', 'prop firm challenge cost', 'cheapest prop firm challenge', '1-step vs 2-step challenge', 'futures prop firm evaluation'],
  authors: [{ name: 'PropRadar Research', url: '/audit' }],
  publisher: SITE_NAME,
  category: 'Prop firm research',
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    type: 'article',
    siteName: SITE_NAME,
    modifiedTime: updatedAt,
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: 'PropRadar: prop firm challenges compared' }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, '\\u003c') };
}

/** "variable by program" style values are shown as a pointer to the firm file, not as a rule. */
function ruleCell(value: string | undefined) {
  const text = (value ?? '').trim();
  if (!text || /^(variable|varies|program-specific|depends on the selected plan|account-specific|specific futures rules|futures-specific)/i.test(text)) {
    return <span className="pr-muted">Varies by plan</span>;
  }
  return text;
}

function accountRange(product: Product) {
  const fmt = (n: number) =>
    n >= 1_000_000 ? `$${+(n / 1_000_000).toFixed(1)}M` : n >= 1000 ? `$${Math.round(n / 1000)}K` : `$${n}`;
  if (!product.accountSizeMin && !product.accountSizeMax) return <span className="pr-muted">To verify</span>;
  return product.accountSizeMin === product.accountSizeMax ? fmt(product.accountSizeMin) : `${fmt(product.accountSizeMin)}–${fmt(product.accountSizeMax)}`;
}

/** "FTMO Challenge" under "FTMO" reads twice: drop the firm name from the program label. */
function programName(firm: PropFirm, product: Product) {
  const name = product.name.startsWith(`${firm.name} `) ? product.name.slice(firm.name.length + 1) : product.name;
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function ChallengeTable({ model, caption }: { model: Model; caption: string }) {
  const list = byModel(model);
  if (!list.length) return null;
  return (
    <div className="guide-rule-table-wrap">
      <table className="guide-rule-table pr-challenge-table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Firm and program</th>
            <th scope="col">Fee from</th>
            <th scope="col">Accounts</th>
            <th scope="col">Profit target</th>
            <th scope="col">Daily loss</th>
            <th scope="col">Max loss</th>
            <th scope="col">Checked</th>
          </tr>
        </thead>
        <tbody>
          {list.map(({ firm, product }) => (
            <tr key={`${firm.slug}-${product.id}`}>
              <th scope="row">
                <Link href={`/firm/${firm.slug}`} className="pr-challenge-firm">
                  <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                  <span>
                    <strong>{firm.name}</strong>
                    <small>
                      {programName(firm, product)}
                      {firm.status === 'À surveiller' ? <em className="pr-challenge-watch">Watchlist</em> : null}
                    </small>
                  </span>
                </Link>
              </th>
              <td className="pr-num">{formatUsd(product.entryFeeMin as number)}</td>
              <td className="pr-nowrap">{accountRange(product)}</td>
              <td>{ruleCell(product.profitTarget)}</td>
              <td>{ruleCell(product.maxDailyLoss)}</td>
              <td>{ruleCell(product.maxDrawdown)}</td>
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

export default function PropFirmChallengePage() {
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
    {
      question: 'What is a prop firm challenge?',
      answer:
        'A prop firm challenge (also called an evaluation) is a paid test on a simulated or demo account. You must reach a profit target without breaking the loss limits and other rules. If you pass, the firm offers a funded or simulated-funded account and shares part of the profits you make on it.',
    },
    {
      question: 'How much does a prop firm challenge cost?',
      answer: fees.length
        ? `Across the ${rows.length} programs with a listed entry fee in PropRadar's sourced firm files, the lowest starting fee is ${formatUsd(fees[0])}${cheapest ? ` (${cheapest.firm.name})` : ''} and the median starting fee is ${formatUsd(medianFee)}. These are the smallest accounts before discounts; larger accounts cost more, and resets, monthly subscriptions or activation fees can add to the total.`
        : 'Fees depend on the firm and account size; check each firm file for the listed entry fee.',
    },
    {
      question: 'What is the difference between a 1-step and a 2-step challenge?',
      answer:
        'A 1-step challenge has a single phase to pass, usually with a tighter loss limit. A 2-step challenge splits the test into two phases, typically a higher target first and a lower one second, often with a wider loss limit. Instant-funding accounts skip the test but usually cost more and carry tighter rules.',
    },
    {
      question: 'What happens if I break the daily loss limit?',
      answer:
        'On most programs a breach of the daily or maximum loss limit ends the account immediately, even if you were close to the target. You then need a reset or a new purchase. Check whether the limit is measured on balance or equity and when the trading day resets.',
    },
    {
      question: 'Is the challenge fee refundable?',
      answer:
        'It depends on the firm. Some firms state that the evaluation fee is refunded with the first payout from the funded account; others never refund it. The rule is in the firm terms and FAQ, which PropRadar links from each firm file.',
    },
    {
      question: 'Do prop firms actually pay out after you pass?',
      answer: `Payout reliability is the main risk after the challenge. PropRadar shows a payout-risk level only when it is backed by sources: ${assessedPayoutCount} open firms have one today, and ${closedCount} firms in the database are recorded as closed. Read the payout section of a firm file before paying for its challenge.`,
    },
  ];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SITE_URL}${PATH}#article`,
    headline: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    inLanguage: 'en',
    isAccessibleForFree: true,
    datePublished: PUBLISHED_AT,
    dateModified: updatedAt,
    author: { '@type': 'Organization', '@id': `${SITE_URL}/audit#research`, name: 'PropRadar Research', url: `${SITE_URL}/audit` },
    publisher: { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${PATH}` },
  };
  const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Prop firm challenges compared by PropRadar',
    numberOfItems: rows.length,
    itemListElement: [...byModel('Challenge'), ...byModel('Futures evaluation'), ...byModel('Instant funding')].map((row, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${row.firm.name} ${row.product.name}`,
      url: `${SITE_URL}/firm/${row.firm.slug}`,
    })),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Prop firm challenge', item: `${SITE_URL}${PATH}` },
    ],
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
  };

  return (
    <main className="container guide-page pr-challenge-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(listSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />

      <section className="guide-hero pr-challenge-hero">
        <div>
          <div className="eyebrow">Prop firm challenge guide</div>
          <h1>Prop firm challenge: how it works, what it costs and {rows.length} programs compared</h1>
          <p className="lead">
            A challenge is the paid test you take before a prop firm funds you. This page explains the models and the rules that end
            an account, then compares the programs PropRadar has read on the firms&apos; own pages, with the date each file was checked.
          </p>
          <div className="guide-byline" aria-label="Article provenance">
            <span className="guide-byline-mark" aria-hidden="true">PR</span>
            <div>
              <strong>Reviewed by <Link href="/audit">PropRadar Research</Link></strong>
              <small>Numbers come from sourced firm files only. Nothing is estimated.</small>
            </div>
            <time dateTime={updatedAt}>Updated {updatedAt}</time>
          </div>
          <div className="actions">
            <a href="#compare" className="btn btn-primary">Compare challenges</a>
            <Link prefetch={false} href="/prop-firm-comparison" className="btn">Full comparison table</Link>
          </div>
        </div>
        <dl className="pr-challenge-facts">
          <div><dt>Programs compared</dt><dd>{rows.length}</dd></div>
          <div><dt>Firms</dt><dd>{firmCount}</dd></div>
          <div><dt>Lowest entry fee</dt><dd>{fees.length ? formatUsd(fees[0]) : '—'}</dd></div>
          <div><dt>Median entry fee</dt><dd>{medianFee ? formatUsd(medianFee) : '—'}</dd></div>
        </dl>
      </section>

      <article className="pr-prose">
        <section aria-labelledby="what-title">
          <h2 id="what-title">What a prop firm challenge is</h2>
          <p>
            A proprietary trading firm (prop firm) sells you a test on a demo or simulated account. You pay an entry fee, trade under
            fixed rules and, if you reach the profit target without breaking a loss limit, you get a funded account. On that account
            you keep a share of the profits, the <em>profit split</em>, and the firm keeps the rest.
          </p>
          <p>
            The fee is the firm&apos;s main revenue when traders fail, so the rules matter more than the headline account size.
            Two challenges with the same price can be very different once you read how the drawdown is measured, whether there is a
            consistency rule, and what the firm requires before the first payout.
          </p>
        </section>

        <section aria-labelledby="models-title">
          <h2 id="models-title">The four challenge models</h2>
          <h3>Two-step (and three-step) challenges</h3>
          <p>
            The classic format: a first phase with a higher target, then a second phase with a lower one, under the same loss limits.
            {twoStepExamples.length ? (
              <>
                {' '}For example,{' '}
                {twoStepExamples.map(({ firm, product }, index) => (
                  <span key={firm.slug}>
                    {index ? ' and ' : ''}
                    <Link href={`/firm/${firm.slug}`}>{firm.name} {programName(firm, product)}</Link> lists {product.profitTarget}
                    {' '}with a {product.maxDailyLoss} daily and {product.maxDrawdown} maximum loss limit
                  </span>
                ))}
                .
              </>
            ) : null}
          </p>
          <h3>One-step challenges</h3>
          <p>
            A single phase, faster to pass on paper, usually with a tighter maximum loss.
            {cti1 ? (
              <>
                {' '}<Link href={`/firm/${cti1.firm.slug}`}>{cti1.firm.name}&apos;s {programName(cti1.firm, cti1.product)}</Link>, for instance, lists a profit target of {cti1.product.profitTarget}
                and a maximum loss of {cti1.product.maxDrawdown}.
              </>
            ) : null}
          </p>
          <h3>Instant funding</h3>
          <p>
            No test: you pay more for an account that is funded from day one, but rules are often stricter and the payout conditions
            carry the risk. PropRadar tracks {counts.instant} instant-funding program{counts.instant === 1 ? '' : 's'} with a listed fee below.{' '}
            <Link href={getSeoGuidePath('prop-firm-instant-funding')}>Read the instant-funding guide</Link>.
          </p>
          <h3>Futures evaluations</h3>
          <p>
            Futures firms run evaluations on CME products, usually with a trailing or end-of-day drawdown in dollars rather than a
            percentage, and sometimes a monthly fee and an activation fee for the funded account.{' '}
            <Link href={getSeoGuidePath('meilleure-prop-firm-futures')}>Compare futures prop firms</Link>.
          </p>
        </section>

        <section aria-labelledby="rules-title">
          <h2 id="rules-title">The rules that end a challenge</h2>
          <ul className="pr-rule-list">
            <li>
              <strong>Daily loss limit.</strong> A cap on what you can lose in one trading day. Check whether it counts open
              (floating) losses and at what time the day resets.
            </li>
            <li>
              <strong>Maximum loss (drawdown).</strong> Static drawdown stays fixed at the starting balance; trailing drawdown follows
              your highest balance or equity; end-of-day (EOD) drawdown only moves at the close. The same percentage can be much
              harder on a trailing account. <Link href={getSeoGuidePath('prop-firm-drawdown')}>How each drawdown type works</Link>.
            </li>
            <li>
              <strong>Profit target and minimum days.</strong> Some firms require a minimum number of trading days before you can
              pass, even if the target is reached on day one.
            </li>
            <li>
              <strong>Consistency rules.</strong> A cap on how much of your profit can come from one day. They often apply at payout
              time rather than during the test. <Link href={getSeoGuidePath('prop-firm-sans-consistency-rule')}>Firms without a consistency rule</Link>.
            </li>
            <li>
              <strong>News, EAs and copy trading.</strong> Trading around high-impact news, using expert advisors or copying trades
              can be restricted on one stage and allowed on another.{' '}
              <Link href={getSeoGuidePath('prop-firm-news-trading')}>News trading rules</Link> ·{' '}
              <Link href={getSeoGuidePath('prop-firm-ea-algo')}>EA and algo rules</Link>.
            </li>
          </ul>
        </section>

        <section aria-labelledby="checks-title">
          <h2 id="checks-title">Five checks before you pay for a challenge</h2>
          <ol className="pr-rule-list">
            <li>
              <strong>Who you are paying.</strong> Find the legal entity and its country. PropRadar maps the companies behind each
              firm on its <Link href="/audit#jurisdictions">legal map</Link>.
            </li>
            <li>
              <strong>Payout evidence.</strong> A challenge is worth nothing if payouts stall. See the{' '}
              <Link href="/prop-firm-payout-risk">sourced payout incidents</Link>.
            </li>
            <li>
              <strong>Review status.</strong> Trustpilot sometimes withholds a firm&apos;s rating after removing fake reviews.{' '}
              <Link href="/trustpilot-prop-firms">Which firms are affected</Link>.
            </li>
            <li>
              <strong>Recent rule changes.</strong> Every firm file has a dated update history; rules often change for new orders only.
            </li>
            <li>
              <strong>Discounts and affiliates.</strong> A code lowers the fee, not the risk. <Link href="/promos">Current codes</Link>{' '}
              stay attached to each firm&apos;s risk file, and affiliate links are disclosed.
            </li>
          </ol>
        </section>
      </article>

      <section className="section" id="compare" aria-labelledby="compare-title">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Compared from sourced firm files</div>
            <h2 id="compare-title">Prop firm challenges compared</h2>
          </div>
          <p className="section-note">
            &quot;Fee from&quot; is the smallest account before discounts, as listed in the firm file on the date shown. Confirm the price
            and rules on the firm&apos;s site before buying. Sorted by PropRadar score.
          </p>
        </div>

        <h3 className="pr-challenge-subhead" id="forex">Forex and CFD challenges ({counts.challenge})</h3>
        <ChallengeTable model="Challenge" caption="Forex and CFD prop firm challenges" />

        <h3 className="pr-challenge-subhead" id="futures">Futures evaluations ({counts.futures})</h3>
        <ChallengeTable model="Futures evaluation" caption="Futures prop firm evaluations" />

        <h3 className="pr-challenge-subhead" id="instant">Instant funding ({counts.instant})</h3>
        <ChallengeTable model="Instant funding" caption="Instant funding prop firm accounts" />

        <p className="pr-table-more">
          <Link className="pr-link" href="/prop-firm-comparison">
            Filter all {propFirms.length} firms by price, rules and legal country <span aria-hidden="true">→</span>
          </Link>
        </p>
      </section>

      <section className="section" aria-labelledby="challenge-faq-title">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Direct answers</div>
            <h2 id="challenge-faq-title">Prop firm challenge FAQ</h2>
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
            <div className="eyebrow">Keep reading</div>
            <h2 id="next-title">Related guides</h2>
          </div>
        </div>
        <ul className="pr-related-links">
          <li><Link href={getSeoGuidePath('prop-firm-pas-cher')}>Cheapest prop firms</Link></li>
          <li><Link href={getSeoGuidePath('prop-firm-sans-challenge')}>Prop firms with no challenge</Link></li>
          <li><Link href={getSeoGuidePath('prop-firm-pour-debutant')}>Prop firms for beginners</Link></li>
          <li><Link href={getSeoGuidePath('prop-firm-payout-rapide')}>Fast-payout prop firms</Link></li>
          <li><Link href="/best-prop-firms">Best prop firms right now</Link></li>
          <li><Link href={getSeoGuidePath('meilleure-prop-firm-forex')}>Best forex prop firms</Link></li>
        </ul>
        <p className="pr-chain-note">
          Legal entities recorded for these firms sit in{' '}
          {[...new Set(rows.flatMap((row) => entityCountries(row.firm.regulatoryAudit.entities).map((c) => c.name)))].length} countries.
          PropRadar is a research filter, not financial advice.
        </p>
      </section>
    </main>
  );
}
