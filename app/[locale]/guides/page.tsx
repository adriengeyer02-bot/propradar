import type { Metadata } from 'next';
import Link from 'next/link';
import GuideLibrary, {
  type GuideFocus,
  type GuideLevel,
  type GuideLibraryItem,
  type GuideType,
  GuideLogoStrip,
} from './GuideLibrary';
import { payoutRiskClass, propFirms, regulatoryRiskClass, hasPayoutRiskSignal } from '../../lib/propFirms';
import {
  getGuideLastModified,
  getSeoGuideDisplay,
  getSeoGuidePath,
  seoGuides,
  selectGuideFirms,
  type SeoGuide,
  guideUrlSlug,
} from '../../lib/seoGuides';
import { SITE_NAME, SITE_URL } from '../../lib/site';
import { toEnglishText } from '../../lib/i18n';
import { getEditorialBriefPath, latestEditorialBrief } from '../../lib/editorialBriefs';
import { GUIDE_EDITORIAL_REFRESH_DATE } from '../../lib/guideVisuals';
import { buildGuideCover } from '../../lib/guideCovers';
import GuideCover, { type CoverLabels } from '../../components/guide-visuals/GuideCover';
import { HTML_LANG, OG_LOCALE, isLocale, localeAlternates, localePath, type Locale } from '../../lib/locales';
import { fmt, formatDateLong, getMessages } from '../../lib/messages';
import { getGuideTranslation, guideLocales, localizedGuidePath } from '../../lib/guideI18n';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  if (locale === 'en') return EN_METADATA;
  const h = getMessages(locale).guide.hub;
  return {
    title: h.metaTitle,
    description: h.metaDescription,
    alternates: localeAlternates(locale, '/guides'),
    openGraph: {
      title: h.metaTitle,
      description: h.metaDescription,
      url: `${SITE_URL}${localePath(locale, '/guides')}`,
      type: 'website',
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      images: [{ url: `${SITE_URL}/guides/meilleure-prop-firm-2026/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: h.metaTitle, description: h.metaDescription },
  };
}

export const revalidate = 86400;

const GUIDES_DESCRIPTION =
  'PropRadar guides built around real trader searches: best prop firm, futures, news trading, SMC, payout, consistency rule, deals and brand comparisons.';

const EN_METADATA: Metadata = {
  title: 'Prop Firm Guides: Rules, Payouts & Comparisons',
  description: GUIDES_DESCRIPTION,
  authors: [{ name: 'PropRadar Research', url: '/audit' }],
  creator: 'PropRadar Research',
  publisher: SITE_NAME,
  alternates: localeAlternates('en', '/guides'),
  openGraph: {
    title: 'Prop Firm Guides: Rules, Payouts & Comparisons',
    description: GUIDES_DESCRIPTION,
    url: `${SITE_URL}/guides`,
    type: 'website',
    siteName: SITE_NAME,
    images: [{ url: `${SITE_URL}/guides/meilleure-prop-firm-2026/opengraph-image`, width: 1200, height: 630, alt: 'PropRadar guides: firms compared by reliability score' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prop Firm Guides: Rules, Payouts & Comparisons',
    description: GUIDES_DESCRIPTION,
    images: [`${SITE_URL}/guides/meilleure-prop-firm-2026/opengraph-image`],
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
    anchor: 'Skilled Funded Traders closure timeline',
    note: 'March 2024 shutdown notice, Easton context, payout complaints and archived trader obligations.',
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
    anchor: 'RZR Funded (ex-Hantec Trader) legal review',
    note: 'Mauritius entity, simulated accounts and the difference from Hantec Markets regulation.',
  },
];

const decisionPaths = [
  {
    number: '01',
    label: 'Choose',
    title: 'Build a reliable shortlist',
    text: 'Start with payout risk, rule clarity and source depth before comparing price.',
    href: '/best-prop-firms',
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
    href: '/guides/prop-firm-no-consistency-rule',
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
  selection: 'Top',
  comparison: 'VS',
  rules: '§',
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

function buildGuideCard(guide: SeoGuide, locale: Locale = 'en'): GuideLibraryItem {
  const display = getSeoGuideDisplay(guide);
  const tr = getGuideTranslation(locale, guide.slug);
  const types = getMessages(locale).guide.types;
  const linkedFirms = selectGuideFirms(guide, propFirms.length);
  const type = guideType(guide);
  const modifiedDate = getGuideLastModified(guide);

  return {
    path: localizedGuidePath(locale, guide),
    title: tr?.title ?? display.title,
    description: tr?.metaDescription ?? display.metaDescription,
    eyebrow: tr?.eyebrow ?? display.eyebrow,
    type,
    typeLabel: locale === 'en' ? guideTypeLabels[type] : types[type],
    level: guideLevel(guide),
    focuses: guideFocuses(guide),
    firmCount: linkedFirms.length,
    deepSourceCount: linkedFirms.filter((firm) => legalSourceCount(firm) >= 5).length,
    payoutWatchCount: linkedFirms.filter((firm) => hasPayoutRiskSignal(firm)).length,
    updatedIso: modifiedDate.toISOString().slice(0, 10),
    updatedLabel: locale === 'en' ? formatGuideDate(modifiedDate) : formatDateLong(locale, modifiedDate.toISOString()),
    recentlyUpdated: recentlyUpdatedSlugs.has(guide.slug),
    mark: guideMarks[type],
    firms: linkedFirms.slice(0, 4).map((firm) => ({ slug: firm.slug, name: firm.name, logoDomain: firm.logoDomain })),
    keywords: tr ? [tr.h1, tr.answer, ...display.primaryKeywords] : [...display.primaryKeywords, ...display.secondaryKeywords],
    cover: buildGuideCover(guide),
  };
}

const EN_CARD = { recentlyUpdated: 'Recently updated', linkedFirms: '{count} linked firms', updated: 'Updated {date}' };

function FeaturedGuideCard({ guide, labels = EN_CARD, coverLabels }: { guide: GuideLibraryItem; labels?: typeof EN_CARD; coverLabels?: CoverLabels }) {
  return (
    <Link href={guide.path} className={`guide-featured-card guide-theme-${guide.type}`}>
      <GuideCover data={guide.cover} uid="feat" className="guide-card-cover" labels={coverLabels} />
      <div className="guide-featured-card-top">
        <span>{guide.typeLabel}</span>
        {guide.recentlyUpdated ? <strong>{labels.recentlyUpdated}</strong> : null}
      </div>
      <GuideLogoStrip firms={guide.firms} total={guide.firmCount} />
      <h3>{guide.title}</h3>
      <p>{guide.description}</p>
      <div className="guide-featured-card-foot">
        <span>{fmt(labels.linkedFirms, { count: guide.firmCount })}</span>
        <span>{fmt(labels.updated, { date: guide.updatedLabel })}</span>
        <strong aria-hidden="true">&#8594;</strong>
      </div>
    </Link>
  );
}

function libraryLabels(locale: Locale) {
  const g = getMessages(locale).guide;
  return { ...g.library, levels: g.levels, recentlyUpdated: g.hub.recentlyUpdated };
}

/** Hub in another language: translated hero, featured guides and library. */
function LocalizedGuidesHub({ locale }: { locale: Locale }) {
  const g = getMessages(locale).guide;
  const h = g.hub;
  const translated = seoGuides.filter((guide) => guideLocales(guide).includes(locale));
  const cards = translated.map((guide) => buildGuideCard(guide, locale));
  const featured = featuredGuideSlugs
    .map((slug) => translated.find((guide) => guide.slug === slug))
    .filter((guide): guide is SeoGuide => Boolean(guide))
    .map((guide) => buildGuideCard(guide, locale));
  const legalMappedCount = propFirms.filter((firm) => firm.legalVerified).length;
  const legalWatchCount = propFirms.filter(isLegalWatchFirm).length;
  const latest = translated.map((guide) => getGuideLastModified(guide).toISOString().slice(0, 10)).sort().at(-1) ?? GUIDE_EDITORIAL_REFRESH_DATE;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: h.metaTitle,
    description: h.metaDescription,
    url: `${SITE_URL}${localePath(locale, '/guides')}`,
    inLanguage: HTML_LANG[locale],
    hasPart: cards.map((card) => ({ '@type': 'Article', headline: card.title, url: `${SITE_URL}${card.path}`, inLanguage: HTML_LANG[locale] })),
  };
  const cardLabels = { recentlyUpdated: h.recentlyUpdated, linkedFirms: h.linkedFirms, updated: g.updated };

  return (
    <main className="container guide-page guide-hub-page seo-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <section className="guide-hero guide-hub-hero">
        <div>
          <div className="eyebrow">{h.eyebrow}</div>
          <h1>{h.h1}</h1>
          <p className="lead">{h.lead}</p>
          <div className="actions">
            <a href="#all-guides" className="btn btn-primary">{h.ctaFind}</a>
            <Link href={localizedGuidePath(locale, 'meilleure-prop-firm-2026')} className="btn">{h.ctaRanking}</Link>
          </div>
        </div>
        <dl className="pr-hero-stats">
          <div><dt>{h.statGuides}</dt><dd>{translated.length}</dd></div>
          <div><dt>{h.statFirms}</dt><dd>{propFirms.length}</dd></div>
          <div><dt>{h.statLegal}</dt><dd>{legalMappedCount}</dd></div>
          <div><dt>{h.statUpdate}</dt><dd><time dateTime={latest}>{formatDateLong(locale, latest)}</time></dd></div>
        </dl>
      </section>

      <section className="section guide-featured-section" aria-labelledby="featured-guides-title">
        <div className="section-heading">
          <div>
            <div className="eyebrow">{h.featuredEyebrow}</div>
            <h2 id="featured-guides-title">{h.featuredTitle}</h2>
          </div>
          <p className="section-note">{h.featuredNote}</p>
        </div>
        <div className="guide-featured-grid">
          {featured.map((guide) => <FeaturedGuideCard guide={guide} labels={cardLabels} coverLabels={getMessages(locale).cover} key={guide.path} />)}
        </div>
      </section>

      <GuideLibrary guides={cards} labels={libraryLabels(locale)} coverLabels={getMessages(locale).cover} />

      <section className="section">
        <div className="guide-living-panel">
          <div>
            <div className="eyebrow">{h.livingEyebrow}</div>
            <h2>{h.livingTitle}</h2>
            <p>{h.livingText}</p>
          </div>
          <div className="guide-living-stats">
            <span>{fmt(h.livingLegal, { count: legalWatchCount })}</span>
            <span>{fmt(h.livingGuides, { count: translated.length })}</span>
          </div>
          <Link href={localePath(locale, '/audit')} className="btn">{h.openAudit}</Link>
        </div>
      </section>
    </main>
  );
}

export default async function GuidesHubPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  if (locale !== 'en') return <LocalizedGuidesHub locale={locale} />;
  const legalMappedCount = propFirms.filter((firm) => firm.legalVerified).length;
  const legalWatchCount = propFirms.filter(isLegalWatchFirm).length;
  const guideCards = seoGuides.map((guide) => buildGuideCard(guide));
  const latestGuideUpdate = seoGuides.map((guide) => getGuideLastModified(guide).toISOString().slice(0, 10)).sort().at(-1) ?? GUIDE_EDITORIAL_REFRESH_DATE;
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
  const latestBriefPath = getEditorialBriefPath(latestEditorialBrief);
  const latestBriefSourceCount = latestEditorialBrief.sections.reduce(
    (sum, section) => sum + section.sources.length,
    0,
  );

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/guides#collection`,
    name: 'PropRadar prop firm guides',
    description: GUIDES_DESCRIPTION,
    url: `${SITE_URL}/guides`,
    inLanguage: 'en',
    dateModified: GUIDE_EDITORIAL_REFRESH_DATE,
    primaryImageOfPage: `${SITE_URL}/opengraph-image`,
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
      image: `${SITE_URL}/guides/${guideUrlSlug(guide)}/opengraph-image`,
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
            <Link href="/best-prop-firms" className="btn">View the current ranking</Link>
          </div>
        </div>
        <dl className="pr-hero-stats">
          <div><dt>Decision guides</dt><dd>{seoGuides.length}</dd></div>
          <div><dt>Firm profiles connected</dt><dd>{propFirms.length}</dd></div>
          <div><dt>Legal files mapped</dt><dd>{legalMappedCount}</dd></div>
          <div><dt>Latest guide update</dt><dd><time dateTime={latestGuideUpdate}>{latestGuideUpdate}</time></dd></div>
        </dl>
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

      <section className="guide-brief-strip" aria-labelledby="guide-brief-title">
        <div className="guide-brief-heading">
          <div>
            <div className="eyebrow">Latest Risk Brief</div>
            <h2 id="guide-brief-title">{latestEditorialBrief.shortTitle}</h2>
          </div>
          <div className="guide-brief-meta">
            <span>Issue {String(latestEditorialBrief.issueNumber).padStart(2, '0')}</span>
            <span>{latestEditorialBrief.readMinutes} min</span>
            <span>{latestBriefSourceCount} primary sources</span>
          </div>
        </div>
        <div className="guide-brief-topics">
          {latestEditorialBrief.sections.map((section) => (
            <Link href={`${latestBriefPath}#${section.id}`} key={section.id}>
              <small>{section.eyebrow}</small>
              <strong>{section.title}</strong>
              <span aria-hidden="true">&#8594;</span>
            </Link>
          ))}
        </div>
        <div className="guide-brief-actions">
          <Link href={latestBriefPath} className="btn btn-primary">Read this issue</Link>
          <Link href="/radar-brief" className="btn">Browse the archive</Link>
        </div>
      </section>

      <GuideLibrary guides={guideCards} labels={libraryLabels('en')} />

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
