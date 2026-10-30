import type { Metadata } from 'next';
import Image from 'next/image';
import FirmRow, { FirmTableHead } from '../../components/ui/FirmRow';
import GuideHeroFirms from '../../components/ui/GuideHeroFirms';
import Link from 'next/link';
import FirmLogo from '../../components/FirmLogo';
import GuideArticleBody from '../../components/GuideArticleBody';
import GuideHelpfulness from '../../components/GuideHelpfulness';
import { getGuideArticle } from '../../lib/guideArticles';
import { getGuideEditorial } from '../../lib/guideEditorial';
import type { PropFirm } from '../../lib/propFirms';
import {
  auditStatusClass,
  formatUsd,
  payoutRiskClass,
  propFirms,
  regulatoryRiskClass,
  relationshipClass,
  reviewReliabilityClass,
  scoreClass,
  topFirms,
} from '../../lib/propFirms';
import { toEnglishText } from '../../lib/i18n';
import { GUIDE_EDITORIAL_REFRESH_DATE } from '../../lib/guideVisuals';
import { SITE_NAME, SITE_URL } from '../../lib/site';

const BEST_PROP_FIRMS_DESCRIPTION =
  'What are the best prop firms right now? Compare current leaders by payout reliability, legal proof, rule clarity, source depth and community signals.';
/** Generated share card (logos + scores of the top firms), see app/guides/[slug]/opengraph-image.tsx. */
const BEST_PROP_FIRMS_CARD = `${SITE_URL}/guides/meilleure-prop-firm-2026/opengraph-image`;
const BEST_PROP_FIRMS_PUBLISHED_AT = '2026-06-29T08:00:00.000Z';
const BEST_PROP_FIRMS_UPDATED_AT = propFirms.reduce(
  (latest, firm) => (firm.lastReviewed > latest ? firm.lastReviewed : latest),
  GUIDE_EDITORIAL_REFRESH_DATE
);

export const metadata: Metadata = {
  title: 'Best Prop Firms Right Now: Risk-First Ranking (2026)',
  description: BEST_PROP_FIRMS_DESCRIPTION,
  authors: [{ name: 'PropRadar Research', url: '/audit' }],
  creator: 'PropRadar Research',
  publisher: SITE_NAME,
  category: 'Prop firm due diligence',
  alternates: {
    canonical: '/best-prop-firms',
    languages: { en: '/best-prop-firms', fr: '/fr/meilleures-prop-firms-2026', 'x-default': '/best-prop-firms' },
  },
  openGraph: {
    title: 'Best Prop Firms Right Now: Risk-First Ranking (2026)',
    description:
      'Compare the strongest current prop-firm profiles by payout risk, legal proof, rules and source depth.',
    url: `${SITE_URL}/best-prop-firms`,
    type: 'article',
    siteName: SITE_NAME,
    modifiedTime: BEST_PROP_FIRMS_UPDATED_AT,
    authors: [`${SITE_URL}/audit`],
    tags: ['best prop firms right now', 'prop firm ranking', 'prop firm payout reliability'],
    images: [{ url: BEST_PROP_FIRMS_CARD, width: 1200, height: 630, alt: 'PropRadar ranking: top prop firms by score' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Prop Firms Right Now: Risk-First Ranking (2026)',
    description: BEST_PROP_FIRMS_DESCRIPTION,
    images: [BEST_PROP_FIRMS_CARD],
  },
};

function jsonLd(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, '\\u003c'),
  };
}

function legalSourceCount(firm: PropFirm) {
  return firm.regulatoryAudit.sources.length || firm.sources.length;
}

function sourceDepthLabel(firm: PropFirm) {
  const count = legalSourceCount(firm);
  if (count >= 5) return 'Deep sources';
  if (count >= 3) return 'Usable sources';
  if (count >= 1) return 'Thin sources';
  return 'No sources';
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

function legalRiskWeight(firm: PropFirm) {
  const risk = firm.regulatoryAudit.riskLevel;
  const riskScore =
    risk === 'Critical' ? 100 :
    risk === 'High' ? 86 :
    risk === 'To audit' ? 74 :
    risk === 'Medium to high' ? 64 :
    risk === 'Medium' ? 48 :
    24;

  return riskScore + (firm.legalVerified ? 0 : 18) + (legalSourceCount(firm) < 2 ? 10 : 0);
}

export default function BestPropFirmsPage() {
  const bestArticle = getGuideArticle('meilleure-prop-firm-2026');
  const editorial = getGuideEditorial('meilleure-prop-firm-2026');
  const shortlist = topFirms
    .filter((firm) => firm.reviewSignals.payoutRisk !== 'Critique' && firm.regulatoryAudit.riskLevel !== 'Critical')
    .slice(0, 12);
  const legalMappedCount = propFirms.filter((firm) => firm.legalVerified).length;
  const deepSourceCount = propFirms.filter((firm) => legalSourceCount(firm) >= 5).length;
  const articleNewsCheckedCount = propFirms.filter((firm) => firm.auditSourcesChecked.some((source) => /article|news|press/i.test(source))).length;
  const lowPayoutShortlistCount = shortlist.filter((firm) => payoutRiskClass(firm.reviewSignals.payoutRisk) === 'badge-green').length;
  const noConflictCount = propFirms.filter((firm) => firm.commercialRelationship === 'Aucune').length;
  const legalWatchShortlist = shortlist
    .filter(isLegalWatchFirm)
    .sort((a, b) => legalRiskWeight(b) - legalRiskWeight(a))
    .slice(0, 6);
  const rankingUpdatedAt = BEST_PROP_FIRMS_UPDATED_AT;
  const rankingFaq = [
    {
      question: 'What are the best prop firms right now?',
      answer: `Based on the PropRadar dataset updated ${rankingUpdatedAt}, the first profiles to compare are ${shortlist.slice(0, 3).map((firm) => firm.name).join(', ')}. This is a research shortlist, not a universal winner: market, platform, drawdown and payout rules still decide the best fit.`,
    },
    {
      question: 'How does PropRadar rank prop firms?',
      answer:
        'The ranking starts with payout reliability, legal and source proof, rule clarity and community consistency. Challenge price, account size and discounts are considered only after those risk checks.',
    },
    {
      question: 'Can the cheapest prop firm be the best choice?',
      answer:
        'Sometimes, but price alone is not enough. A cheap evaluation can become expensive through resets, subscriptions, strict drawdown or payout rules that do not fit the trader strategy.',
    },
  ];
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SITE_URL}/best-prop-firms#article`,
    headline: 'Best prop firms right now: PropRadar risk-first ranking',
    description: BEST_PROP_FIRMS_DESCRIPTION,
    url: `${SITE_URL}/best-prop-firms`,
    inLanguage: 'en',
    isAccessibleForFree: true,
    datePublished: BEST_PROP_FIRMS_PUBLISHED_AT,
    dateModified: rankingUpdatedAt,
    primaryImageOfPage: BEST_PROP_FIRMS_CARD,
    image: [BEST_PROP_FIRMS_CARD],
    author: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/audit#research`,
      name: 'PropRadar Research',
      url: `${SITE_URL}/audit`,
    },
    reviewedBy: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/audit#research`,
      name: 'PropRadar Research',
      url: `${SITE_URL}/audit`,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon.svg`,
      },
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: shortlist.map((firm, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: firm.name,
        url: `${SITE_URL}/firm/${firm.slug}`,
      })),
    },
    isPartOf: {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/guides#collection`,
      name: 'PropRadar prop firm guides',
      url: `${SITE_URL}/guides`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/best-prop-firms`,
    },
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Best prop firms right now', item: `${SITE_URL}/best-prop-firms` },
    ],
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: rankingFaq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <main className="container guide-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />
      <section className="guide-hero">
        <div>
          <div className="eyebrow">Current risk-first ranking</div>
          <h1>Best prop firms right now according to PropRadar</h1>
          <p className="lead">
            Updated <time dateTime={rankingUpdatedAt}>{rankingUpdatedAt}</time>. The right choice is not just about challenge price.
            This ranking starts with payout risk, legal files, filtered reviews, source depth and commercial transparency.
          </p>
          <div className="guide-byline" aria-label="Article provenance">
            <span className="guide-byline-mark" aria-hidden="true">PR</span>
            <div>
              <strong>Reviewed by <Link href="/audit">PropRadar Research</Link></strong>
              <small>Official terms, legal files, payout signals and independent community sources.</small>
            </div>
            <time dateTime={rankingUpdatedAt}>Updated {rankingUpdatedAt}</time>
          </div>
          <div className="actions">
            <Link prefetch={false} href="/prop-firm-comparison" className="btn btn-primary">Open full comparator</Link>
            <Link href="/prop-firm-payout-risk" className="btn">View payout risks</Link>
            <Link href="/audit" className="btn">Read source audit</Link>
          </div>
        </div>
        <GuideHeroFirms
          title="Top of the ranking"
          firms={shortlist}
          limit={5}
          moreHref="#ranking"
          moreLabel="See the full ranking"
          facts={[`${propFirms.length} firms tracked`, `${legalMappedCount} legal files mapped`, `${deepSourceCount} deep source files`]}
        />
      </section>

      {bestArticle ? (
        <GuideArticleBody
          article={bestArticle}
          label="Best prop firms 2026 - full guide"
          langSwitch={{ href: '/fr/meilleures-prop-firms-2026', hrefLang: 'fr', label: 'Lire ce classement en français' }}
        />
      ) : null}

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Ranking Method</div>
            <h2>Proof comes before promotion.</h2>
          </div>
        </div>
        <div className="best-method-grid">
          <article className="panel best-method-card">
            <span>Legal entity</span>
            <strong>{legalMappedCount}</strong>
            <p>Profiles are stronger when the public file names an operator, jurisdiction, registration trail or legal footer.</p>
          </article>
          <article className="panel best-method-card">
            <span>Payout risk</span>
            <strong>{lowPayoutShortlistCount}</strong>
            <p>The shortlist excludes critical payout risk and keeps the remaining risk level visible on every row.</p>
          </article>
          <article className="panel best-method-card">
            <span>Source depth</span>
            <strong>{deepSourceCount}</strong>
            <p>Deep files combine official pages, legal documents, review signals, regulator checks or independent context.</p>
          </article>
          <article className="panel best-method-card">
            <span>Conflict control</span>
            <strong>{noConflictCount}</strong>
            <p>Affiliate status stays visible and does not hide payout, legal or rule-risk warnings.</p>
          </article>
        </div>
      </section>

      <section className="section" id="ranking">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Cautious Ranking</div>
            <h2>Top firms to compare first</h2>
          </div>
        </div>

        <div className="pr-firm-table" role="table" aria-label="Top prop firms ranked by PropRadar score">
          <FirmTableHead />
          {shortlist.map((firm, index) => (
            <FirmRow
              key={firm.slug}
              firm={firm}
              rank={index + 1}
              subline={`${toEnglishText(firm.bestFor)} · ${toEnglishText(firm.auditStatus)} · ${legalSourceCount(firm)} source link(s)`}
            />
          ))}
        </div>
      </section>

      <section className="section guide-card-grid">
        <article className="panel">
          <div className="eyebrow">Why this ranking</div>
          <h2>A useful score must punish vague zones.</h2>
          <ul className="risk-list">
            <li>A good public rating is not enough if payouts are disputed.</li>
            <li>A strong price is ignored until the legal operator and contract language are readable.</li>
            <li>A discount does not offset a dangerous drawdown or consistency rule.</li>
            <li>Affiliate status stays visible and does not protect the score.</li>
            <li>Closed or watchlist firms remain in the radar to avoid blind spots.</li>
          </ul>
        </article>
        <article className="panel">
          <div className="eyebrow">Before Checkout</div>
          <h2>Shortlist files to reread carefully</h2>
          <div className="guide-signal-stack">
            {(legalWatchShortlist.length ? legalWatchShortlist : shortlist.slice(0, 6)).map((firm) => (
              <Link href={`/firm/${firm.slug}#regulatory`} key={firm.slug}>
                <span>{firm.name}</span>
                <span className="guide-signal-stack-meta">
                  <strong className={`badge ${regulatoryRiskClass(firm.regulatoryAudit.riskLevel)}`}>
                    {firm.regulatoryAudit.riskLevel}
                  </strong>
                  <small>{sourceDepthLabel(firm)}</small>
                </span>
              </Link>
            ))}
          </div>
        </article>
      </section>

      <section className="section" aria-labelledby="ranking-faq-title">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Direct answers</div>
            <h2 id="ranking-faq-title">Questions traders ask before choosing a prop firm</h2>
          </div>
        </div>
        <div className="firm-faq-grid">
          {rankingFaq.map((item) => (
            <article className="firm-faq-card" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <GuideHelpfulness slug="meilleure-prop-firm-2026" prompt={editorial.feedbackPrompt} />
    </main>
  );
}
