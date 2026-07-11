import type { Metadata } from 'next';
import Link from 'next/link';
import { propFirms } from '../lib/propFirms';
import {
  SEO_RESEARCH_DATE,
  getSeoGuideDisplay,
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
  title: 'Prop firm guides: trader searches and SEO',
  description: GUIDES_DESCRIPTION,
  alternates: {
    canonical: '/guides',
  },
};

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
      url: `${SITE_URL}/guides/${guide.slug}`,
      description: getSeoGuideDisplay(guide).metaDescription,
    })),
  };

  return (
    <main className="container guide-page seo-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(collectionSchema)} />

      <section className="guide-hero">
        <div>
          <div className="eyebrow">SEO Radar</div>
          <h1>Prop firm guides based on what traders actually search.</h1>
          <p className="lead">
            PropRadar turns major search intents into useful pages: choosing a firm, rules, payout, trading style,
            futures, discount codes and brand-vs-brand comparisons.
          </p>
          <div className="actions">
            <Link href="/guides/meilleure-prop-firm-2026" className="btn btn-primary">Read the main guide</Link>
            <Link href="/outils" className="btn">Use the tools</Link>
          </div>
        </div>
        <div className="guide-proof-panel">
          <div><strong>{searchClusters.length}</strong><span>search clusters</span></div>
          <div><strong>{seoGuides.length}</strong><span>indexable guide pages</span></div>
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

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Intent Map</div>
            <h2>Searches to capture first.</h2>
          </div>
          <p className="section-note">Research structured on {SEO_RESEARCH_DATE}. Pages recalculate from the PropRadar database.</p>
        </div>
        <div className="search-intent-grid">
          {searchClusters.map((cluster) => (
            <Link href={`/guides/${cluster.pageSlug}`} className={`search-intent-card search-intent-card-${cluster.intent}`} key={cluster.label}>
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
            <div className="eyebrow">SEO Pages</div>
            <h2>Guides created for long-tail searches.</h2>
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
              <Link href={`/guides/${guide.slug}`} className={`guide-entry-card seo-guide-card seo-guide-card-${guide.intent}`} key={guide.slug}>
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
            <div className="eyebrow">Updates</div>
            <h2>SEO follows the PropRadar database.</h2>
            <p className="lead">
              Each guide uses firm profiles, products, rules, payout signals and existing sources. Adding or correcting
              a firm updates the related guides and sitemap.
            </p>
          </div>
          <div className="api-chip-list">
            <code>/api/seo/keywords</code>
            <code>/guides/meilleure-prop-firm-futures</code>
            <code>/guides/prop-firm-news-trading</code>
            <code>/guides/topstep-vs-apex</code>
          </div>
        </div>
      </section>
    </main>
  );
}
