import Link from 'next/link';
import FirmLogo from '../components/FirmLogo';
import HomeGlobe from '../components/ui/HomeGlobe';
import { buildRadar } from '../lib/radar';
import { recentFirmUpdates } from '../lib/firmUpdates';
import RiskPip from '../components/ui/RiskPip';
import ScoreRing from '../components/ui/ScoreRing';
import { legalTone, payoutTone } from '../lib/riskTone';
import { getEditorialBriefPath, latestEditorialBrief } from '../lib/editorialBriefs';
import {
  partiallyVerifiedFirms,
  propFirms,
  topFirms,
  verifiedFirms,
} from '../lib/propFirms';
import { getSeoGuideDisplay, getSeoGuidePath, selectGuideFirms, seoGuides } from '../lib/seoGuides';
import { buildGuideCover } from '../lib/guideCovers';
import { guideCardText, localizedGuidePath } from '../lib/guideI18n';
import GuideCover from '../components/guide-visuals/GuideCover';
import { GuideLogoStrip } from './guides/GuideLibrary';
import { toEnglishText } from '../lib/i18n';
import { td } from '../lib/dataI18n';
import FirmRow, { FirmTableHead } from '../components/ui/FirmRow';
import { SITE_NAME, SITE_URL } from '../lib/site';
import { countryCounts, documentedClosures, firmsWithCountry, withheldFirms } from '../lib/industryStats';
import type { Metadata } from 'next';
import { isLocale, localeAlternates, localePath, type Locale } from '../lib/locales';
import { fmt, formatDateLong, getMessages, tv } from '../lib/messages';
import IntentLink from '../components/IntentLink';

type Props = { params: Promise<{ locale: string }> };

async function pageLocale(params: Props['params']): Promise<Locale> {
  const { locale } = await params;
  return isLocale(locale) ? locale : 'en';
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await pageLocale(params);
  return { alternates: { ...localeAlternates(locale, '/'), types: { 'application/rss+xml': '/feed.xml' } } };
}

export default async function HomePage({ params }: Props) {
  const locale = await pageLocale(params);
  const t = getMessages(locale);
  const h = t.home;
  const L = (path: string) => localePath(locale, path);
  const noConflictFirms = propFirms.filter((firm) => firm.commercialRelationship === 'Aucune').length;
  const officialSourceCount = propFirms.reduce((sum, firm) => sum + firm.sources.length, 0);
  const legalMappedCount = propFirms.filter((firm) => firm.legalVerified).length;
  const sourcedFirms = verifiedFirms.length + partiallyVerifiedFirms.length;
  const homeRadar = buildRadar(propFirms, recentFirmUpdates(1));
  const homepageGuides = [
    'prop-firm-sans-challenge',
    'prop-firm-sans-consistency-rule',
    'topstep-vs-apex',
  ].flatMap((slug) => {
    const guide = seoGuides.find((candidate) => candidate.slug === slug);
    if (!guide) return [];
    const display = getSeoGuideDisplay(guide);
    const text = guideCardText(locale, guide);
    return [{ guide, displayGuide: text ? { ...display, title: text.title, metaDescription: text.description, eyebrow: text.eyebrow } : display }];
  });
  const latestBriefPath = getEditorialBriefPath(latestEditorialBrief);
  const latestBriefSourceCount = latestEditorialBrief.sections.reduce(
    (sum, section) => sum + section.sources.length,
    0,
  );
  const dataUpdatedAt = propFirms.reduce((latest, firm) => {
    const firmLatestDate = firm.regulatoryAudit.lastChecked > firm.lastReviewed
      ? firm.regulatoryAudit.lastChecked
      : firm.lastReviewed;
    return firmLatestDate > latest ? firmLatestDate : latest;
  }, '2026-01-01');
  const dataUpdatedLabel = formatDateLong(locale, dataUpdatedAt);

  const homeRanking = topFirms
    .filter((firm) => firm.reviewSignals.payoutRisk !== 'Critique' && firm.regulatoryAudit.riskLevel !== 'Critical')
    .slice(0, 10);
  const closedCount = propFirms.filter((firm) => firm.status === 'Fermée').length;
  const homeFaq = h.faq.map((item) => ({ question: item.q, answer: fmt(item.a, { count: closedCount }) }));
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homeFaq.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
  };
  const rankingSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${SITE_NAME}: top prop firms by score`,
    itemListElement: homeRanking.map((firm, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: firm.name,
      url: `${SITE_URL}${L(`/firm/${firm.slug}`)}`,
    })),
  };

  return (
    <main className="home-v2">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(rankingSchema).replace(/</g, '\\u003c') }} />
      <section className="container home-v2-hero" aria-labelledby="home-title">
        <div className="home-v2-hero-copy">
          <div className="home-v2-kicker">
            <span aria-hidden="true" />
            {h.kicker}
          </div>
          <h1 id="home-title">{h.h1}</h1>
          <p className="home-v2-lead">
            {fmt(h.lead, { count: propFirms.length })}
          </p>
          <div className="home-v2-proofline" aria-label={h.coverageAria}>
            <span><strong>{propFirms.length}</strong> {h.firmsCompared}</span>
            <span><strong>{noConflictFirms}</strong> {h.noRelationship}</span>
            <span>{h.latestReview} <time dateTime={dataUpdatedAt}>{dataUpdatedLabel}</time></span>
          </div>
          <div className="home-v2-actions">
            <IntentLink href={L('/prop-firm-comparison')} className="btn btn-primary home-v2-primary-action">
              {h.openComparator}
            </IntentLink>
            <Link href={L('/promos')} className="btn home-v2-secondary-action">
              {h.viewDeals}
            </Link>
          </div>
          <Link href={L('/guides')} className="home-v2-guide-link">
            {h.exploreGuides}
            <span aria-hidden="true"> →</span>
          </Link>
          <div className="home-v2-trust-line">
            <span>{h.trust1}</span>
            <span>{h.trust2}</span>
            <span>{h.trust3}</span>
          </div>
          <section className="home-v2-datastrip" aria-labelledby="home-data-title">
            <h2 id="home-data-title">{h.dataTitle}</h2>
            <dl>
              <div><dt>{h.dataClosures}</dt><dd>{documentedClosures.length}</dd></div>
              <div><dt>{h.dataWithheld}</dt><dd>{withheldFirms.length}</dd></div>
              <div><dt>{fmt(h.dataCountries, { count: firmsWithCountry.length })}</dt><dd>{countryCounts.length}</dd></div>
            </dl>
            <Link href={L('/prop-firm-statistics')} className="pr-link">{h.seeStats} <span aria-hidden="true">→</span></Link>
          </section>
        </div>

        <div className="home-preview pr-home-radar pr-home-globe" aria-label={h.radarAria}>
          <h2 className="sr-only">{h.radarToday}</h2>
          <HomeGlobe data={homeRadar} locale={locale} labels={t.radar} sectorNames={t.sectors} valueNames={t.values} tableLabels={t.table} radarCta={h.openRadar} />
        </div>
      </section>

      <section className="container home-v2-section" aria-labelledby="home-reviews-title">
        <div className="home-v2-section-heading">
          <div>
            <div className="eyebrow">{h.reviewsEyebrow}</div>
            <h2 id="home-reviews-title">{h.reviewsTitle}</h2>
          </div>
          <Link href={L('/best-prop-firms')} className="home-v2-heading-link">{h.fullRanking}</Link>
        </div>
        <div className="pr-firm-table" role="table" aria-label={h.rankingAria}>
          <FirmTableHead ui={t} />
          {homeRanking.map((firm, index) => (
            <FirmRow key={firm.slug} firm={firm} rank={index + 1} subline={td(locale, toEnglishText(firm.bestFor))} locale={locale} ui={t} />
          ))}
        </div>
        <p className="pr-table-more">
          <IntentLink className="pr-link" href={L('/prop-firm-comparison')}>
            {fmt(h.compareAll, { count: propFirms.length })} <span aria-hidden="true">→</span>
          </IntentLink>
        </p>
      </section>

      <section className="home-v2-band home-tools-band" aria-labelledby="tools-title">
        <div className="container">
          <div className="home-v2-section-heading">
            <div>
              <div className="eyebrow">{h.toolsEyebrow}</div>
              <h2 id="tools-title">{h.toolsTitle}</h2>
            </div>
          </div>

          <div className="home-tools-grid">
            {h.tools.map((tool, index) => (
              <Link
                key={tool.label}
                prefetch={index === 0 ? false : undefined}
                href={L(['/prop-firm-comparison', '/prop-firm-challenge', '/promos', '/guides'][index])}
                className={`home-tool-card${index === 0 ? ' home-tool-card-primary' : ''}`}
              >
                <span className="home-tool-label">{tool.label}</span>
                <strong>{fmt(tool.title, { count: propFirms.length })}</strong>
                <small>{tool.text}</small>
                <span className="home-tool-action">{tool.action} <b aria-hidden="true">→</b></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container home-v2-section home-guides-section" aria-labelledby="guides-title">
        <div className="home-v2-section-heading">
          <div>
            <div className="eyebrow">{h.guidesEyebrow}</div>
            <h2 id="guides-title">{h.guidesTitle}</h2>
            {locale !== 'en' && homepageGuides.some(({ guide }) => !guideCardText(locale, guide)) ? <p className="home-guides-lang">{h.guidesInEnglish}</p> : null}
          </div>
          <Link href={L('/guides')} className="home-v2-heading-link">{h.allGuides}</Link>
        </div>

        <div className="home-guide-grid">
          {homepageGuides.map(({ guide, displayGuide }) => (
            <Link href={localizedGuidePath(locale, guide)} className="home-guide-card" key={guide.slug}>
              <GuideCover data={buildGuideCover(guide)} className="home-guide-cover" labels={t.cover} />
              <span className="home-guide-content">
                <small>{displayGuide.eyebrow}</small>
                <strong>{displayGuide.title}</strong>
                <span className="home-guide-summary">{displayGuide.metaDescription}</span>
                <GuideLogoStrip
                  firms={selectGuideFirms(guide, 4).map((firm) => ({ slug: firm.slug, name: firm.name, logoDomain: firm.logoDomain }))}
                  total={selectGuideFirms(guide, propFirms.length).length}
                />
              </span>
              <b aria-hidden="true">→</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="container home-v2-section home-faq" aria-labelledby="home-faq-title">
        <h2 id="home-faq-title">{h.faqTitle}</h2>
        <div className="firm-faq-grid">
          {homeFaq.map((item) => (
            <article className="firm-faq-card" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-v2-band home-brief-band" aria-labelledby="home-brief-title">
        <div className="container">
          <div className="home-v2-section-heading">
            <div>
              <div className="eyebrow">{h.briefEyebrow}</div>
              <h2 id="home-brief-title">{h.briefTitle}</h2>
            </div>
          </div>

          <div className="home-brief-layout">
            <div className="home-brief-intro">
              <span className="home-brief-issue">{fmt(h.issue, { n: String(latestEditorialBrief.issueNumber).padStart(2, '0') })}</span>
              <h3>{latestEditorialBrief.shortTitle}</h3>
              <p>{latestEditorialBrief.dek}</p>
              <div className="home-brief-meta">
                <span>{fmt(h.readMinutes, { n: latestEditorialBrief.readMinutes })}</span>
                <span>{fmt(h.primarySources, { n: latestBriefSourceCount })}</span>
                <time dateTime={latestEditorialBrief.publishedAt}>{formatDateLong(locale, latestEditorialBrief.publishedAt)}</time>
              </div>
              <Link href={L(latestBriefPath)} className="btn btn-primary">{h.readIssue}</Link>
            </div>

            <div className="home-brief-list">
              {latestEditorialBrief.sections.map((section, index) => (
                <Link href={`${L(latestBriefPath)}#${section.id}`} className="home-brief-item" key={section.id}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <small>{section.eyebrow}</small>
                    <strong>{section.title}</strong>
                  </div>
                  <b aria-hidden="true">&#8594;</b>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="home-proof-band" id="methodologie" aria-labelledby="proof-title">
        <div className="container">
          <div className="home-proof-heading">
            <div>
              <div className="eyebrow">{h.proofEyebrow}</div>
              <h2 id="proof-title">{h.proofTitle}</h2>
            </div>
            <p>{h.datasetUpdated} <time dateTime={dataUpdatedAt}>{dataUpdatedLabel}</time>.</p>
          </div>

          <div className="home-proof-stats">
            <div><strong>{propFirms.length}</strong><span>{h.statFirms}</span></div>
            <div><strong>{officialSourceCount}</strong><span>{h.statSources}</span></div>
            <div><strong>{legalMappedCount}</strong><span>{h.statLegal}</span></div>
            <div><strong>{sourcedFirms}</strong><span>{h.statSourced}</span></div>
          </div>

          <div className="home-proof-bottom">
            <div className="home-method-copy">
              <span>{h.scoreEyebrow}</span>
              <h3>{h.scoreTitle}</h3>
              <p>{h.scoreText}</p>
              <div>
                <Link href={`${L('/about')}#score`}>{t.about.scoreEyebrow}</Link>
                <Link href={L('/audit')}>{h.evidenceLog}</Link>
                <Link href={L('/prop-firm-rules')}>{h.ruleAudits}</Link>
                <Link href={L('/prop-firm-statistics')}>{h.industryStats}</Link>
              </div>
            </div>

            <div
              className="home-alert-form"
              id="radar-weekly"
              aria-labelledby="home-alert-title"
            >
              <span>{h.digestEyebrow}</span>
              <h3 id="home-alert-title">{h.digestTitle}</h3>
              <p>{h.digestText}</p>
              <div className="home-alert-form-actions">
                <Link className="btn" href={L('/radar-brief')}>{h.archive}</Link>
                <a
                  className="btn btn-primary"
                  href="mailto:contact@propradar.tech?subject=PropRadar%20research%20digest&body=Please%20add%20me%20to%20the%20PropRadar%20research%20digest."
                >
                  {h.requestEmail}
                </a>
              </div>
              <small>{h.emailNote}</small>
            </div>
          </div>

          <p className="home-disclaimer" id="risques">
            {h.disclaimer}
          </p>
        </div>
      </section>
    </main>
  );
}
