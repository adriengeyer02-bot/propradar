import type { Metadata } from 'next';
import Link from 'next/link';
import { payoutRiskClass, propFirms, regulatoryRiskClass } from '../lib/propFirms';
import {
  SEO_RESEARCH_DATE,
  getSeoGuideDisplay,
  getSeoGuidePath,
  searchClusters,
  seoGuides,
  selectGuideFirms,
} from '../lib/seoGuides';
import { SITE_NAME, SITE_URL } from '../lib/site';
import { toEnglishText } from '../lib/i18n';

export const revalidate = 86400;

const GUIDES_DESCRIPTION =
  'PropRadar guides built around real trader searches: best prop firm, futures, news trading, SMC, payout, consistency rule, deals and brand comparisons.';

export const metadata: Metadata = {
  title: 'Prop Firm Guides: Rules, Payouts & Comparisons',
  description: GUIDES_DESCRIPTION,
  alternates: {
    canonical: '/guides',
  },
};

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
    anchor: 'My Forex Funds payout and review history',
    note: 'Closure context, historical payouts and why old ratings are not a current buying signal.',
  },
  {
    slug: 'fortunes-funding',
    anchor: 'Fortunes Funding accounts and payouts',
    note: 'Account sizes, payout review clauses and the legal entity still to verify.',
  },
  {
    slug: 'aeon-funded',
    anchor: 'Aeon Funded status and Quantx redirect',
    note: 'Brand transition, simulated-account wording and current legal clarity.',
  },
  {
    slug: 'hantec-trader',
    anchor: 'Hantec Trader legal review',
    note: 'Mauritius entity, simulated accounts and the difference from Hantec Markets regulation.',
  },
];

function jsonLd(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, '\\u003c'),
  };
}

const intentLabels: Record<string, string> = {
  choisir: 'Choose',
  comparer: 'Compare',
  regles: 'Rules',
  risque: 'Risk',
  style: 'Style',
  promo: 'Deals',
};

function legalSourceCount(firm: (typeof propFirms)[number]) {
  return firm.regulatoryAudit.sources.length || firm.sources.length;
}

function isLegalWatchFirm(firm: (typeof propFirms)[number]) {
  const risk = firm.regulatoryAudit.riskLevel;
  return !firm.legalVerified || risk === 'High' || risk === 'Critical' || risk === 'To audit';
}

export default function GuidesHubPage() {
  const legalMappedCount = propFirms.filter((firm) => firm.legalVerified).length;
  const legalWatchCount = propFirms.filter(isLegalWatchFirm).length;
  const deepSourceCount = propFirms.filter((firm) => legalSourceCount(firm) >= 5).length;
  const payoutWatchCount = propFirms.filter((firm) => firm.reviewSignals.payoutRisk !== 'Faible').length;
  const featuredProfiles = featuredFirmResearch.flatMap((item) => {
    const firm = propFirms.find((candidate) => candidate.slug === item.slug);
    return firm ? [{ ...item, firm }] : [];
  });

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'PropRadar prop firm guides',
    description: GUIDES_DESCRIPTION,
    url: `${SITE_URL}/guides`,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    hasPart: seoGuides.map((guide) => ({
      '@type': 'Article',
      headline: getSeoGuideDisplay(guide).title,
      url: `${SITE_URL}${getSeoGuidePath(guide)}`,
      description: getSeoGuideDisplay(guide).metaDescription,
    })),
  };

  return (
    <main className="container guide-page seo-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(collectionSchema)} />

      <section className="guide-hero">
        <div>
          <div className="eyebrow">Research library</div>
          <h1>Prop firm guides for rules, payouts and comparisons.</h1>
          <p className="lead">
            Start with the question you need to solve: choosing a firm, understanding a rule, checking payout risk,
            matching a trading style or comparing two brands side by side.
          </p>
          <div className="actions">
            <Link href="/meilleures-prop-firms" className="btn btn-primary">View the current ranking</Link>
            <Link href="/outils" className="btn">Use the tools</Link>
          </div>
        </div>
        <div className="guide-proof-panel">
          <div><strong>{searchClusters.length}</strong><span>search clusters</span></div>
          <div><strong>{seoGuides.length}</strong><span>published guides</span></div>
          <div><strong>{legalMappedCount}</strong><span>legal files mapped</span></div>
          <div><strong>{deepSourceCount}</strong><span>deep source files</span></div>
        </div>
      </section>

      <section className="page-insight-strip" aria-label="Guides proof coverage">
        <Link href="/audit">
          <span>Tracked firms</span>
          <strong>{propFirms.length}</strong>
          <small>Prop firm profiles feeding the guide pages.</small>
        </Link>
        <Link href="/audit">
          <span>Legal watch</span>
          <strong>{legalWatchCount}</strong>
          <small>Profiles where the legal/source file still needs extra caution.</small>
        </Link>
        <Link href="/risques-payout">
          <span>Payout watch</span>
          <strong>{payoutWatchCount}</strong>
          <small>Profiles where payout risk is above low.</small>
        </Link>
        <Link href="/trustpilot-prop-firms">
          <span>Review filter</span>
          <strong>Active</strong>
          <small>Trustpilot is weighted against Reddit, payout and source context.</small>
        </Link>
      </section>

      <section className="section search-demand-section" aria-labelledby="firm-research-title">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Firm research</div>
            <h2 id="firm-research-title">Firm reviews traders are checking now.</h2>
          </div>
          <p className="section-note">Direct answers with operating status, payout context and legal evidence kept together.</p>
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

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Decision paths</div>
            <h2>Start with the question behind the purchase.</h2>
          </div>
          <p className="section-note">Guide structure reviewed on {SEO_RESEARCH_DATE}. Firm data stays tied to each source file.</p>
        </div>
        <div className="search-intent-grid">
          {searchClusters.map((cluster) => (
            <Link href={getSeoGuidePath(cluster.pageSlug)} className={`search-intent-card search-intent-card-${cluster.intent}`} key={cluster.label}>
              <span className="intent-pill">{intentLabels[cluster.intent] ?? toEnglishText(cluster.intent)}</span>
              <strong>{toEnglishText(cluster.label)}</strong>
              <div className="keyword-chip-grid">
                {cluster.queries.slice(0, 4).map((query) => <small key={query}>{toEnglishText(query)}</small>)}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Guide library</div>
            <h2>Detailed research by rule, market and firm.</h2>
          </div>
        </div>
        <div className="guide-entry-grid seo-guide-grid">
          {seoGuides.map((guide) => {
            const selectedFirms = selectGuideFirms(guide, 12);
            const firmCount = selectedFirms.length;
            const guideDeepSourceCount = selectedFirms.filter((firm) => legalSourceCount(firm) >= 5).length;
            const guidePayoutWatchCount = selectedFirms.filter((firm) => firm.reviewSignals.payoutRisk !== 'Faible').length;
            const displayGuide = getSeoGuideDisplay(guide);

            return (
              <Link href={getSeoGuidePath(guide)} className={`guide-entry-card seo-guide-card seo-guide-card-${guide.intent}`} key={guide.slug}>
                <span className="guide-card-eyebrow">{displayGuide.eyebrow}</span>
                <strong>{displayGuide.title}</strong>
                <small>{displayGuide.answer}</small>
                <div className="ranking-proof-chips" aria-label={`${displayGuide.title} proof coverage`}>
                  <span className="badge badge-green">{guideDeepSourceCount} deep source</span>
                  <span className={guidePayoutWatchCount > 0 ? 'badge badge-amber' : 'badge badge-green'}>
                    {guidePayoutWatchCount} payout watch
                  </span>
                </div>
                <div className="guide-card-foot">
                  <span>{firmCount} linked firm(s)</span>
                  <em>Open</em>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="panel seo-update-panel">
          <div>
            <div className="eyebrow">Living research</div>
            <h2>Guides stay tied to the source files.</h2>
            <p className="lead">
              Each guide uses firm profiles, products, rules, payout signals and saved sources. Correcting a firm also
              improves the related comparisons and decision tables.
            </p>
          </div>
          <nav className="guide-hub-links" aria-label="Popular research guides">
            <Link href="/guides/meilleure-prop-firm-futures">Best futures prop firms</Link>
            <Link href="/guides/prop-firm-news-trading">News trading rules</Link>
            <Link href="/guides/topstep-vs-apex">Topstep vs Apex</Link>
          </nav>
        </div>
      </section>
    </main>
  );
}
