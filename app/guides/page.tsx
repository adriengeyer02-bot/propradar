import type { Metadata } from 'next';
import Link from 'next/link';
import GuideLibrary, {
  type GuideFocus,
  type GuideLevel,
  type GuideLibraryItem,
  type GuideType,
} from './GuideLibrary';
import { payoutRiskClass, propFirms, regulatoryRiskClass } from '../lib/propFirms';
import {
  SEO_RESEARCH_DATE,
  getGuideLastModified,
  getSeoGuideDisplay,
  getSeoGuidePath,
  seoGuides,
  selectGuideFirms,
  type SeoGuide,
} from '../lib/seoGuides';
import { SITE_NAME, SITE_URL } from '../lib/site';
import { toEnglishText } from '../lib/i18n';

export const revalidate = 86400;

const GUIDES_DESCRIPTION =
  'PropRadar guides built around real trader searches: best prop firm, futures, news trading, SMC, payout, consistency rule, deals and brand comparisons.';

export const metadata: Metadata = {
  title: 'Prop Firm Guides: Rules, Payouts & Comparisons',
  description: GUIDES_DESCRIPTION,
  authors: [{ name: 'PropRadar Research', url: '/audit' }],
  creator: 'PropRadar Research',
  publisher: SITE_NAME,
  alternates: {
    canonical: '/guides',
  },
  openGraph: {
    title: 'Prop Firm Guides: Rules, Payouts & Comparisons',
    description: GUIDES_DESCRIPTION,
    url: `${SITE_URL}/guides`,
    type: 'website',
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary',
    title: 'Prop Firm Guides: Rules, Payouts & Comparisons',
    description: GUIDES_DESCRIPTION,
  },
};

const featuredGuideSlugs = [
  'meilleure-prop-firm-2026',
  'prop-firm-sans-challenge',
  'prop-firm-sans-consistency-rule',
  'topstep-vs-apex',
  'prop-firm-news-trading',
  'meilleure-prop-firm-futures',
];

const recentlyUpdatedSlugs = new Set([
  ...featuredGuideSlugs,
  'prop-firm-instant-funding',
]);

const featuredFirmResearch = [
  {
    slug: 'skilled-funded-traders',
    anchor: 'Skilled Funded Traders review',
    note: 'Current status, payout evidence and whether older forex or stocks offers remain valid.',
  },
  {
    slug: 'e8-futures',
    anchor: 'E8 Futures review',
    note: 'Futures-specific rules, legal entity and the relationship with E8 Markets.',
  },
  {
    slug: 'myforexfunds',
    anchor: 'My Forex Funds payout history',
    note: 'Closure context, historical payouts and why old ratings are not a current buying signal.',
  },
  {
    slug: 'fortunes-funding',
    anchor: 'Fortunes Funding accounts',
    note: 'Account sizes, payout-review clauses and the legal entity still to verify.',
  },
  {
    slug: 'aeon-funded',
    anchor: 'Aeon Funded status',
    note: 'Brand transition, simulated-account wording and the current Quantx redirect.',
  },
  {
    slug: 'hantec-trader',
    anchor: 'Hantec Trader legal review',
    note: 'Mauritius entity, simulated accounts and the difference from Hantec Markets regulation.',
  },
];

const decisionPaths = [
  {
    number: '01',
    label: 'Choose',
    title: 'Build a reliable shortlist',
    text: 'Start with payout risk, rule clarity and source depth before comparing price.',
    href: '/meilleures-prop-firms',
    tone: 'blue',
  },
  {
    number: '02',
    label: 'Compare',
    title: 'Put two firms side by side',
    text: 'See how costs, drawdown and payout conditions change the decision.',
    href: '/guides/topstep-vs-apex',
    tone: 'cyan',
  },
  {
    number: '03',
    label: 'Understand',
    title: 'Read the rule before checkout',
    text: 'Decode consistency, news windows and funded-stage restrictions.',
    href: '/guides/prop-firm-sans-consistency-rule',
    tone: 'amber',
  },
  {
    number: '04',
    label: 'Verify',
    title: 'Check legal and payout proof',
    text: 'Trace the entity, official terms and independent community signals.',
    href: '/guides/prop-firm-legal-check',
    tone: 'green',
  },
];

const guideTypeLabels: Record<GuideType, string> = {
  selection: 'Selection',
  comparison: 'Comparison',
  rules: 'Rules',
  risk: 'Risk and proof',
  style: 'Trading style',
  deals: 'Deals and cost',
};

const guideMarks: Record<GuideType, string> = {
  selection: '01',
  comparison: 'VS',
  rules: 'R',
  risk: '!',
  style: 'FX',
  deals: '%',
};

function jsonLd(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, '\\u003c'),
  };
}

function legalSourceCount(firm: (typeof propFirms)[number]) {
  return firm.regulatoryAudit.sources.length || firm.sources.length;
}

function isLegalWatchFirm(firm: (typeof propFirms)[number]) {
  const risk = firm.regulatoryAudit.riskLevel;
  return !firm.legalVerified || risk === 'High' || risk === 'Critical' || risk === 'To audit';
}

function guideType(guide: SeoGuide): GuideType {
  if (guide.intent === 'comparer') return 'comparison';
  if (guide.intent === 'regles') return 'rules';
  if (guide.intent === 'risque') return 'risk';
  if (guide.intent === 'style') return 'style';
  if (guide.intent === 'promo') return 'deals';
  return 'selection';
}

function guideLevel(guide: SeoGuide): GuideLevel {
  if (/debutant|meilleure-prop-firm-(2026|forex|futures)|pas-cher/.test(guide.slug)) return 'Beginner';
  if (/legal|payout-proof|avis-reddit|fiable-trustpilot|ea-algo|news-trading|consistency|leveraged/.test(guide.slug)) return 'Advanced';
  return 'Intermediate';
}

function guideFocuses(guide: SeoGuide): GuideFocus[] {
  const text = [guide.slug, ...guide.primaryKeywords, ...guide.secondaryKeywords].join(' ').toLowerCase();
  const focuses: GuideFocus[] = [];

  if (/payout|withdraw|no.challenge|instant|fast|topstep|apex|ftmo|the5ers/.test(text)) focuses.push('Payout');
  if (/legal|regulat|entity|scam|reliable|fiable|leveraged/.test(text)) focuses.push('Legal');
  if (/review|reddit|trustpilot|community|scam|goat|leveraged/.test(text)) focuses.push('Community');
  if (!focuses.length && guide.intent === 'risque') focuses.push('Payout', 'Legal');

  return focuses;
}

function formatGuideDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

function buildGuideCard(guide: SeoGuide): GuideLibraryItem {
  const display = getSeoGuideDisplay(guide);
  const linkedFirms = selectGuideFirms(guide, propFirms.length);
  const type = guideType(guide);
  const modifiedDate = getGuideLastModified(guide);

  return {
    path: getSeoGuidePath(guide),
    title: display.title,
    description: display.metaDescription,
    eyebrow: display.eyebrow,
    type,
    typeLabel: guideTypeLabels[type],
    level: guideLevel(guide),
    focuses: guideFocuses(guide),
    firmCount: linkedFirms.length,
    deepSourceCount: linkedFirms.filter((firm) => legalSourceCount(firm) >= 5).length,
    payoutWatchCount: linkedFirms.filter((firm) => firm.reviewSignals.payoutRisk !== 'Faible').length,
    updatedIso: modifiedDate.toISOString().slice(0, 10),
    updatedLabel: formatGuideDate(modifiedDate),
    recentlyUpdated: recentlyUpdatedSlugs.has(guide.slug),
    mark: guideMarks[type],
    keywords: [...display.primaryKeywords, ...display.secondaryKeywords],
  };
}

function FeaturedGuideCard({ guide }: { guide: GuideLibraryItem }) {
  return (
    <Link href={guide.path} className={`guide-featured-card guide-theme-${guide.type}`}>
      <div className="guide-featured-card-top">
        <span className="guide-topic-mark" aria-hidden="true">{guide.mark}</span>
        <span>{guide.typeLabel}</span>
        {guide.recentlyUpdated ? <strong>Recently updated</strong> : null}
      </div>
      <h3>{guide.title}</h3>
      <p>{guide.description}</p>
      <div className="guide-featured-card-foot">
        <span>{guide.firmCount} linked firms</span>
        <span>Updated {guide.updatedLabel}</span>
        <strong aria-hidden="true">&#8594;</strong>
      </div>
    </Link>
  );
}

export default function GuidesHubPage() {
  const legalMappedCount = propFirms.filter((firm) => firm.legalVerified).length;
  const legalWatchCount = propFirms.filter(isLegalWatchFirm).length;
  const guideCards = seoGuides.map(buildGuideCard);
  const featuredGuides = featuredGuideSlugs
    .map((slug) => {
      const guide = seoGuides.find((candidate) => candidate.slug === slug);
      return guide ? buildGuideCard(guide) : undefined;
    })
    .filter((guide): guide is GuideLibraryItem => Boolean(guide));
  const featuredProfiles = featuredFirmResearch.flatMap((item) => {
    const firm = propFirms.find((candidate) => candidate.slug === item.slug);
    return firm ? [{ ...item, firm }] : [];
  });
  const recentGuides = guideCards.filter((guide) => guide.recentlyUpdated).slice(0, 4);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'PropRadar prop firm guides',
    description: GUIDES_DESCRIPTION,
    url: `${SITE_URL}/guides`,
    inLanguage: 'en',
    dateModified: SEO_RESEARCH_DATE,
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
    hasPart: seoGuides.map((guide) => ({
      '@type': 'Article',
      headline: getSeoGuideDisplay(guide).title,
      url: `${SITE_URL}${getSeoGuidePath(guide)}`,
      description: getSeoGuideDisplay(guide).metaDescription,
      dateModified: getGuideLastModified(guide).toISOString(),
      author: {
        '@type': 'Organization',
        name: 'PropRadar Research',
        url: `${SITE_URL}/audit`,
      },
    })),
  };

  return (
    <main className="container guide-page guide-hub-page seo-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(collectionSchema)} />

      <section className="guide-hero guide-hub-hero">
        <div>
          <div className="eyebrow">Prop firm research hub</div>
          <h1>Research the rule, risk or firm before you pay.</h1>
          <p className="lead">
            Find a direct answer, compare the firms concerned and move from a trading question to a source-backed shortlist.
          </p>
          <div className="actions">
            <a href="#all-guides" className="btn btn-primary">Find a guide</a>
            <Link href="/meilleures-prop-firms" className="btn">View the current ranking</Link>
          </div>
        </div>
        <div className="guide-proof-panel guide-hub-proof-panel">
          <div><strong>{seoGuides.length}</strong><span>decision guides</span></div>
          <div><strong>{propFirms.length}</strong><span>firm profiles connected</span></div>
          <div><strong>{legalMappedCount}</strong><span>legal files mapped</span></div>
          <div><strong>{SEO_RESEARCH_DATE}</strong><span>library reviewed</span></div>
        </div>
      </section>

      <section className="section guide-featured-section" aria-labelledby="featured-guides-title">
        <div className="section-heading">
          <div>
            <div className="eyebrow">High-demand guides</div>
            <h2 id="featured-guides-title">Start with the questions traders search most.</h2>
          </div>
          <p className="section-note">Six fast entry points based on current search demand and the decisions that most often block a purchase.</p>
        </div>
        <div className="guide-featured-grid">
          {featuredGuides.map((guide) => <FeaturedGuideCard guide={guide} key={guide.path} />)}
        </div>
      </section>

      <section className="section guide-path-section" aria-labelledby="decision-paths-title">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Decision paths</div>
            <h2 id="decision-paths-title">Choose the route that matches your decision.</h2>
          </div>
          <p className="section-note">Each path starts with a question and ends with firms, rules and evidence to verify.</p>
        </div>
        <div className="guide-path-grid">
          {decisionPaths.map((path) => (
            <Link href={path.href} className={`guide-path-card guide-path-${path.tone}`} key={path.number}>
              <div><span>{path.number}</span><small>{path.label}</small></div>
              <strong>{path.title}</strong>
              <p>{path.text}</p>
              <span className="guide-path-action">Open path <span aria-hidden="true">&#8594;</span></span>
            </Link>
          ))}
        </div>
      </section>

      <GuideLibrary guides={guideCards} />

      <section className="section search-demand-section" aria-labelledby="firm-research-title">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Recently researched</div>
            <h2 id="firm-research-title">Firm files connected to current searches.</h2>
          </div>
          <p className="section-note">Operating status, payout context and legal evidence kept on one profile.</p>
        </div>
        <div className="search-demand-grid">
          {featuredProfiles.map(({ firm, anchor, note }) => (
            <Link href={`/firm/${firm.slug}`} className="search-demand-card" key={firm.slug}>
              <strong>{anchor}</strong>
              <small>{note}</small>
              <span className="search-demand-badges">
                <span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>
                  Payout {toEnglishText(firm.reviewSignals.payoutRisk)}
                </span>
                <span className={`badge ${regulatoryRiskClass(firm.regulatoryAudit.riskLevel)}`}>
                  Legal {firm.regulatoryAudit.riskLevel}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section guide-recent-section" aria-labelledby="recent-guides-title">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Recently updated</div>
            <h2 id="recent-guides-title">Fresh decisions, with the review date visible.</h2>
          </div>
          <p className="section-note">These guides received a meaningful content or evidence update in the latest research pass.</p>
        </div>
        <div className="guide-recent-list">
          {recentGuides.map((guide, index) => (
            <Link href={guide.path} className={`guide-recent-row guide-theme-${guide.type}`} key={guide.path}>
              <span className="guide-recent-index">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <small>{guide.typeLabel}</small>
                <strong>{guide.title}</strong>
              </div>
              <span>{guide.firmCount} linked firms</span>
              <time dateTime={guide.updatedIso}>{guide.updatedLabel}</time>
              <b aria-hidden="true">&#8594;</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="guide-living-panel">
          <div>
            <div className="eyebrow">Living research</div>
            <h2>Every guide stays connected to the underlying firm files.</h2>
            <p>
              A rule change, payout incident or legal-source update can flow into the guide selection and comparison tables.
            </p>
          </div>
          <div className="guide-living-stats">
            <span><strong>{legalWatchCount}</strong> legal watch profiles</span>
            <span><strong>{seoGuides.length}</strong> maintained guides</span>
          </div>
          <Link href="/audit" className="btn">Open the evidence audit</Link>
        </div>
      </section>
    </main>
  );
}
