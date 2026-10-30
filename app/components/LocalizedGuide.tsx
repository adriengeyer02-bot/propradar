import type { Metadata } from 'next';
import Link from 'next/link';
import GuideArticleBody from './GuideArticleBody';
import GuideCover from './guide-visuals/GuideCover';
import GuideHeroFirms from './ui/GuideHeroFirms';
import FirmRow, { FirmTableHead } from './ui/FirmRow';
import { buildGuideCover } from '../lib/guideCovers';
import { getGuideArticle, type GuideArticle } from '../lib/guideArticles';
import { guideLanguageAlternates, localizedGuidePath, getGuideTranslation, type GuideTranslation } from '../lib/guideI18n';
import { HTML_LANG, OG_LOCALE, localePath, type Locale } from '../lib/locales';
import { fmt, formatDateLong, getMessages, tv } from '../lib/messages';
import { getFirmBySlug, hasPayoutRiskSignal, type PropFirm } from '../lib/propFirms';
import { getGuideLastModified, getRelatedGuides, getSeoGuidePath, selectGuideFirms, type SeoGuide } from '../lib/seoGuides';
import { SITE_NAME, SITE_URL } from '../lib/site';

const GUIDE_LIBRARY_PUBLISHED_AT = '2026-06-29T08:00:00.000Z';
const TABLE_ROWS = 25;

/** Guides comparing two named firms (same map as the English page). */
const HEAD_TO_HEAD: Record<string, string[]> = {
  'ftmo-vs-the5ers': ['ftmo', 'the5ers'],
  'topstep-vs-apex': ['topstep', 'apex-trader-funding'],
  'funderpro-vs-the5ers': ['funderpro', 'the5ers'],
};

function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, '\\u003c') };
}

/** Metadata for a translated guide (canonical in its own language, hreflang to every version). */
export function localizedGuideMetadata(locale: Locale, guide: SeoGuide, translation: GuideTranslation): Metadata {
  const path = localizedGuidePath(locale, guide);
  return {
    title: translation.title,
    description: translation.metaDescription,
    authors: [{ name: 'PropRadar Research', url: localePath(locale, '/audit') }],
    creator: 'PropRadar Research',
    publisher: SITE_NAME,
    alternates: { canonical: path, languages: guideLanguageAlternates(guide) },
    openGraph: {
      title: translation.title,
      description: translation.metaDescription,
      url: `${SITE_URL}${path}`,
      type: 'article',
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      publishedTime: GUIDE_LIBRARY_PUBLISHED_AT,
      modifiedTime: getGuideLastModified(guide).toISOString(),
    },
    twitter: { card: 'summary_large_image', title: translation.title, description: translation.metaDescription },
  };
}

/** Translated article body, keeping the English dates, sources and diagrams. */
function mergeArticle(english: GuideArticle | undefined, translated: GuideTranslation['article']): GuideArticle | undefined {
  if (!english || !translated) return undefined;
  return {
    updated: english.updated,
    sources: english.sources,
    intro: translated.intro,
    sections: translated.sections.map((section, index) => ({ ...section, visual: english.sections[index]?.visual })),
  };
}

export default function LocalizedGuide({ locale, guide, translation }: { locale: Locale; guide: SeoGuide; translation: GuideTranslation }) {
  const t = getMessages(locale);
  const g = t.guide;
  const path = localizedGuidePath(locale, guide);
  const pageUrl = `${SITE_URL}${path}`;
  const englishPath = getSeoGuidePath(guide);
  const firms = selectGuideFirms(guide, TABLE_ROWS);
  const headToHead = (HEAD_TO_HEAD[guide.slug] ?? [])
    .map((slug) => getFirmBySlug(slug))
    .filter((firm): firm is PropFirm => Boolean(firm));
  const modified = getGuideLastModified(guide);
  const modifiedIso = modified.toISOString().slice(0, 10);
  const modifiedLabel = formatDateLong(locale, modifiedIso);
  const article = mergeArticle(getGuideArticle(guide.slug), translation.article);
  const legalMapped = firms.filter((firm) => firm.legalVerified).length;
  const payoutWatch = firms.filter((firm) => hasPayoutRiskSignal(firm)).length;
  const faq = [...translation.faq, { question: g.faqAffiliateQ, answer: g.faqAffiliateA }];
  const related = getRelatedGuides(guide.slug, 6)
    .map((item) => ({ item, tr: getGuideTranslation(locale, item.slug) }))
    .filter((entry): entry is { item: SeoGuide; tr: GuideTranslation } => Boolean(entry.tr))
    .slice(0, 3);
  const [reviewedBefore, reviewedAfter = ''] = g.reviewedBy.split('{name}');
  const count = (n: number) => (n === 1 ? g.firmCountOne : fmt(g.firmCountMany, { count: n }));
  const heroLabels = {
    payout: g.payout,
    risk: (value: string) => tv(t, value),
    from: (price: string) => (/^\$/.test(price) ? fmt(g.from, { price }) : tv(t, price)),
    count,
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: translation.h1,
    description: translation.metaDescription,
    inLanguage: HTML_LANG[locale],
    url: pageUrl,
    datePublished: GUIDE_LIBRARY_PUBLISHED_AT,
    dateModified: modified.toISOString(),
    image: `${SITE_URL}${englishPath === '/best-prop-firms' ? '/guides/meilleure-prop-firm-2026' : englishPath}/opengraph-image`,
    author: { '@type': 'Organization', '@id': `${SITE_URL}/audit#research`, name: 'PropRadar Research', url: `${SITE_URL}/audit` },
    publisher: { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    translationOfWork: { '@type': 'Article', url: `${SITE_URL}${englishPath}`, inLanguage: 'en' },
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: g.breadcrumbHome, item: `${SITE_URL}${localePath(locale, '/')}` },
      { '@type': 'ListItem', position: 2, name: g.breadcrumbGuides, item: `${SITE_URL}${localePath(locale, '/guides')}` },
      { '@type': 'ListItem', position: 3, name: translation.title, item: pageUrl },
    ],
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: HTML_LANG[locale],
    mainEntity: faq.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
  };

  return (
    <main className="container guide-page seo-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />

      <section className="guide-hero">
        <div>
          <Link href={localePath(locale, '/guides')} className="btn" style={{ marginBottom: 18 }}>{g.allGuides}</Link>
          <div className="eyebrow">{translation.eyebrow}</div>
          <h1>{translation.h1}</h1>
          <p className="lead">{translation.answer}</p>
          <div className="guide-byline">
            <span className="guide-byline-mark" aria-hidden="true">PR</span>
            <div>
              <strong>{reviewedBefore}<Link href={localePath(locale, '/audit')}>PropRadar Research</Link>{reviewedAfter}</strong>
              <small>{g.reviewedNote}</small>
            </div>
            <time dateTime={modified.toISOString()}>{fmt(g.updated, { date: modifiedLabel })}</time>
          </div>
          <div className="actions">
            <Link prefetch={false} href={localePath(locale, '/prop-firm-comparison')} className="btn btn-primary">{g.compareFirms}</Link>
            <Link href={localePath(locale, '/prop-firm-radar')} className="btn">{g.openRadar}</Link>
          </div>
        </div>
        <div className="guide-hero-side">
          <GuideCover data={buildGuideCover(guide)} className="guide-hero-cover" labels={t.cover} />
          <GuideHeroFirms
            title={headToHead.length >= 2 ? g.comparedInGuide : g.firmsInGuide}
            firms={headToHead.length >= 2 ? headToHead : firms}
            limit={headToHead.length >= 2 ? headToHead.length : 5}
            moreHref="#comparison"
            moreLabel={g.seeComparison}
            locale={locale}
            labels={heroLabels}
            facts={[fmt(g.legalMapped, { count: legalMapped }), fmt(g.payoutWatch, { count: payoutWatch }), fmt(g.updated, { date: modifiedLabel })]}
          />
        </div>
      </section>

      <nav className="guide-toc" aria-label={g.onPage}>
        <div className="guide-toc-heading">
          <span>{g.onPage}</span>
          <strong>{fmt(g.updated, { date: modifiedLabel })}</strong>
        </div>
        <div className="guide-toc-links">
          <a href="#checks">{g.tocChecks}</a>
          {article ? <a href="#guide-article">{g.tocArticle}</a> : null}
          <a href="#comparison">{g.tocTable}</a>
          <a href="#faq">{g.tocFaq}</a>
        </div>
      </nav>

      <section className="section" id="checks">
        <article className="panel">
          <div className="eyebrow">{g.checksEyebrow}</div>
          <h2>{g.checksTitle}</h2>
          <ul className="risk-list">
            {translation.checks.map((check) => <li key={check}>{check}</li>)}
          </ul>
        </article>
      </section>

      {article ? (
        <section className="section">
          <GuideArticleBody
            article={article}
            label={translation.title}
            updatedLabel={fmt(g.updated, { date: '' }).trim()}
            sourcesLabel={g.sources}
          />
        </section>
      ) : null}

      <section className="section" id="comparison">
        <div className="section-heading">
          <div>
            <div className="eyebrow">{g.tableEyebrow}</div>
            <h2>{g.tableTitle}</h2>
          </div>
          <p className="section-note">{g.tableNote}</p>
        </div>
        <div className="pr-firm-table" role="table" aria-label={g.tableTitle}>
          <FirmTableHead ui={t} />
          {firms.map((firm, index) => (
            <FirmRow key={firm.slug} firm={firm} rank={index + 1} locale={locale} ui={t} />
          ))}
        </div>
        <p className="pr-table-more">
          <Link prefetch={false} className="pr-link" href={localePath(locale, '/prop-firm-comparison')}>
            {g.compareFirms} <span aria-hidden="true">→</span>
          </Link>
        </p>
      </section>

      <section className="section pr-guide-end" id="faq">
        <div>
          <div className="eyebrow">{g.tocFaq}</div>
          <h2>{g.faqTitle}</h2>
          <div className="pr-faq">
            {faq.map((item, index) => (
              <details key={item.question} open={index === 0}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
        <aside>
          <div className="eyebrow">{g.englishEyebrow}</div>
          <h2>{g.englishTitle}</h2>
          <p className="section-note">{g.englishText}</p>
          <ul className="pr-quick-links">
            <li>
              <Link href={englishPath} hrefLang="en">{g.englishLink} <span aria-hidden="true">→</span></Link>
            </li>
          </ul>
        </aside>
      </section>

      <aside className="guide-inline-cta guide-inline-cta-final">
        <div>
          <span>{g.nextEyebrow}</span>
          <strong>{g.nextTitle}</strong>
          <p>{g.nextText}</p>
        </div>
        <div className="guide-inline-cta-actions">
          <Link prefetch={false} href={localePath(locale, '/prop-firm-comparison')} className="btn btn-primary">{g.compareFirms}</Link>
          <Link href={localePath(locale, '/prop-firm-radar')} className="btn">{g.openRadar}</Link>
        </div>
      </aside>

      {related.length ? (
        <section className="section" id="related-guides">
          <div className="section-heading">
            <div>
              <div className="eyebrow">{g.relatedTitle}</div>
            </div>
          </div>
          <ul className="pr-link-list">
            {related.map(({ item, tr }) => (
              <li key={item.slug}>
                <Link href={localizedGuidePath(locale, item)} className="pr-link-row">
                  <span className="pr-link-row-tag">{tr.eyebrow}</span>
                  <strong>{tr.title}</strong>
                  <small>{tr.answer}</small>
                  <span className="pr-link-row-go" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
