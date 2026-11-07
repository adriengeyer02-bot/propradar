import Link from 'next/link';
import type { Metadata } from 'next';
import FirmRow, { FirmTableHead } from '../../components/ui/FirmRow';
import { latestReviewDate } from '../../lib/riskTone';
import JurisdictionBoard from '../../components/ui/JurisdictionBoard';
import FirmLogo from '../../components/FirmLogo';
import PageStructuredData from '../../components/PageStructuredData';
import { createPageMetadata } from '../../lib/pageMetadata';
import {
  auditStatusClass,
  firmsToAudit,
  partiallyVerifiedFirms,
  propFirms,
  regulatoryRiskClass,
  verifiedFirms,
  documentedIncidents,
} from '../../lib/propFirms';
import { toEnglishText } from '../../lib/i18n';
import { auditCaseFiles } from '../../lib/auditCaseFiles';
import { getEditorialBriefPath, latestEditorialBrief } from '../../lib/editorialBriefs';
import IntentLink from '../../components/IntentLink';
import { HTML_LANG, OG_LOCALE, isLocale, localeAlternates, localePath, type Locale } from '../../lib/locales';
import { fmt, getMessages, tv } from '../../lib/messages';
import { getAuditMessages } from '../../lib/messages/pages/audit';
import { localizedGuidePath } from '../../lib/guideI18n';
import { SITE_URL } from '../../lib/site';

const PATH = '/audit';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const m = getAuditMessages(locale);
  const base = createPageMetadata({
    title: m.metaTitle,
    description: m.metaDescription,
    path: PATH,
    keywords: locale === 'en' ? ['prop firm audit', 'prop firm legal entity', 'prop firm regulation', 'prop firm sources'] : [],
    category: 'Prop firm due diligence',
  });
  return {
    ...base,
    alternates: localeAlternates(locale, PATH),
    openGraph: { ...base.openGraph, url: `${SITE_URL}${localePath(locale, PATH)}`, locale: OG_LOCALE[locale] },
  };
}

type Firm = (typeof propFirms)[number];

const priorityAudit = [...propFirms]
  .sort((a, b) => {
    const riskA =
      (a.auditStatus === 'À auditer' ? 90 : a.auditStatus === 'Partiellement vérifié' ? 40 : 0) +
      a.reviewSignals.payoutRiskScore +
      (100 - a.reviewSignals.trustpilotReliabilityScore) +
      (a.status === 'À surveiller' ? 20 : 0) +
      (a.status === 'Fermée' ? 30 : 0);
    const riskB =
      (b.auditStatus === 'À auditer' ? 90 : b.auditStatus === 'Partiellement vérifié' ? 40 : 0) +
      b.reviewSignals.payoutRiskScore +
      (100 - b.reviewSignals.trustpilotReliabilityScore) +
      (b.status === 'À surveiller' ? 20 : 0) +
      (b.status === 'Fermée' ? 30 : 0);

    return riskB - riskA;
  })
  .slice(0, 10);

const trustpilotCovered = propFirms.filter(
  (firm) => firm.trustpilotRating || firm.sources.some((source) => /trustpilot/i.test(`${source.label} ${source.url}`))
);

const officialCovered = propFirms.filter((firm) => firm.sources.some((source) => /site officiel|official|help|faq|programmes/i.test(source.label)));

function legalSourceCount(firm: Firm) {
  return firm.regulatoryAudit.sources.length || firm.sources.length;
}

function isLegalWatchFirm(firm: Firm) {
  const risk = firm.regulatoryAudit.riskLevel;
  return !firm.legalVerified || risk === 'High' || risk === 'Critical' || risk === 'To audit';
}

function legalRiskWeight(firm: Firm) {
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

const legalVerifiedFirms = propFirms.filter((firm) => firm.legalVerified);
const legalWatchFirms = [...propFirms].filter(isLegalWatchFirm).sort((a, b) => legalRiskWeight(b) - legalRiskWeight(a));
const deepSourceFirms = propFirms.filter((firm) => legalSourceCount(firm) >= 5);
const regulatorCheckedFirms = propFirms.filter((firm) =>
  [...firm.auditSourcesChecked, ...firm.regulatoryAudit.regulatoryStatus, ...firm.regulatoryAudit.sources.map((source) => `${source.label} ${source.url}`)].some((item) =>
    /regulator|regulatory|fca|cftc|nfa|cysec|asic|sec|fsa|companies house|warning/i.test(item)
  )
);
const articleNewsCheckedFirms = propFirms.filter((firm) => firm.auditSourcesChecked.some((source) => (
  /article|news|press|finance magnates|fx news|bloomberg/i.test(source)
)));
const operationalCaseFiles = auditCaseFiles.flatMap((caseFile) => {
  const firm = propFirms.find((candidate) => candidate.slug === caseFile.firmSlug);
  return firm ? [{ caseFile, firm }] : [];
});

export default async function AuditPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const t = getMessages(locale);
  const m = getAuditMessages(locale);
  const L = (path: string) => localePath(locale, path);
  const v = (value: string) => tv(t, toEnglishText(value));
  const brief = m.briefs[latestEditorialBrief.slug] ?? { shortTitle: latestEditorialBrief.shortTitle, dek: latestEditorialBrief.dek };
  const latest = latestReviewDate(propFirms);

  return (
    <main className="container audit-page">
      <PageStructuredData
        name={m.schemaName}
        description={m.metaDescription}
        path={L(PATH)}
        breadcrumbLabel={m.breadcrumb}
        dateModified="2026-07-19"
        inLanguage={HTML_LANG[locale]}
        home={{ label: t.guide.breadcrumbHome, url: `${SITE_URL}${L('/')}` }}
        items={priorityAudit.map((firm) => ({
          name: firm.name,
          path: L(`/firm/${firm.slug}`),
          description: toEnglishText(firm.verdict),
        }))}
      />
      <section className="audit-hero">
        <div>
          <div className="eyebrow">{m.eyebrow}</div>
          <h1>{m.h1}</h1>
          <p className="lead">{m.lead}</p>
          <div className="actions">
            <IntentLink href={L('/prop-firm-comparison')} className="btn btn-primary">{m.ctaCompare}</IntentLink>
            <Link href={L('/prop-firm-rules')} className="btn">{m.ctaRules}</Link>
          </div>
        </div>
        <div className="panel audit-method-panel">
          <div className="eyebrow">{m.methodEyebrow}</div>
          <ol>
            {m.method.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pr-stat-line" aria-label={m.coverageAria}>
        <dl>
          <div><dt>{m.statTracked}</dt><dd>{propFirms.length}</dd></div>
          <div><dt>{m.statMulti}</dt><dd>{verifiedFirms.length}</dd></div>
          <div><dt>{m.statPartial}</dt><dd>{partiallyVerifiedFirms.length}</dd></div>
          <div><dt>{m.statToAudit}</dt><dd>{firmsToAudit.length}</dd></div>
          <div><dt>{m.statEntity}</dt><dd>{legalVerifiedFirms.length}</dd></div>
          <div><dt>{m.statLegalWatch}</dt><dd>{legalWatchFirms.length}</dd></div>
          <div><dt>{m.statDeep}</dt><dd>{deepSourceFirms.length}</dd></div>
          <div><dt>{m.statRegulator}</dt><dd>{regulatorCheckedFirms.length}</dd></div>
          <div><dt>{m.statPress}</dt><dd>{articleNewsCheckedFirms.length}</dd></div>
        </dl>
        <Link href={localizedGuidePath(locale, 'prop-firm-legal-check')} className="pr-link">{m.legalCheckLink} <span aria-hidden="true">→</span></Link>
      </section>

      <section className="section audit-case-index" aria-labelledby="audit-case-index-title">
        <div className="section-heading">
          <div>
            <div className="eyebrow">{m.casesEyebrow}</div>
            <h2 id="audit-case-index-title">{m.casesTitle}</h2>
          </div>
          <p className="section-note">{fmt(m.casesNote, { count: operationalCaseFiles.length })}</p>
        </div>

        <div className="audit-case-index-grid">
          {operationalCaseFiles.map(({ caseFile, firm }) => {
            const text = m.caseFiles[caseFile.firmSlug] ?? caseFile;
            return (
              <Link href={L(`/firm/${firm.slug}#case-timeline`)} className="audit-case-index-card" key={firm.slug}>
                <div className="audit-case-index-card-top">
                  <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                  <span>{text.status}</span>
                </div>
                <strong>{firm.name}</strong>
                <h3>{text.question}</h3>
                <p>{text.answer}</p>
                <div>
                  <span><b>{caseFile.events.length}</b> {m.datedEvents}</span>
                  <span><b>{caseFile.sources.length}</b> {m.sources}</span>
                  <time dateTime={caseFile.lastChecked}>{fmt(m.checked, { date: caseFile.lastChecked })}</time>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="audit-case-brief-link">
          <div>
            <span>{m.latestBrief}</span>
            <strong>{brief.shortTitle}</strong>
            <p>{brief.dek}</p>
          </div>
          <Link href={L(getEditorialBriefPath(latestEditorialBrief))} className="btn btn-primary">{m.readBrief}</Link>
        </div>
      </section>

      <section className="section audit-grid">
        <article className="panel">
          <div className="eyebrow">{m.coverageEyebrow}</div>
          <h2>{m.coverageTitle}</h2>
          <ul className="pr-coverage">
            {[
              { label: m.covOfficial, value: officialCovered.length },
              { label: m.covTrustpilot, value: trustpilotCovered.length },
              { label: m.covEntity, value: legalVerifiedFirms.length },
              { label: m.covPress, value: articleNewsCheckedFirms.length },
              { label: m.covIncidents, value: propFirms.filter((firm) => documentedIncidents(firm).length > 0).length },
            ].map((item) => (
              <li key={item.label}>
                <span className="pr-coverage-label">{item.label}</span>
                <span className="pr-coverage-track" aria-hidden="true"><span style={{ width: `${Math.round((item.value / propFirms.length) * 100)}%` }} /></span>
                <strong>{item.value}<small>/{propFirms.length}</small></strong>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <div className="eyebrow">{m.priorityEyebrow}</div>
          <h2>{m.priorityTitle}</h2>
          <ul className="audit-priority-list">
            {priorityAudit.map((firm) => (
              <li key={firm.slug}>
                <Link href={L(`/firm/${firm.slug}`)} className="signal-firm-link">
                  <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                  <span>{firm.name}</span>
                </Link>
                <span className={`badge ${auditStatusClass(firm.auditStatus)}`}>{v(firm.auditStatus)}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="section" id="jurisdictions" aria-labelledby="jurisdictions-title">
        <div className="section-heading">
          <div>
            <div className="eyebrow">{m.legalMapEyebrow}</div>
            <h2 id="jurisdictions-title">{m.legalMapTitle}</h2>
          </div>
          <p className="section-note">{m.legalMapNote}</p>
        </div>
        <JurisdictionBoard firms={propFirms} labels={m.juris} values={t.values} locale={locale} />
      </section>

      <section className="section audit-grid audit-legal-grid">
        <article className="panel">
          <div className="eyebrow">{m.legalPriorityEyebrow}</div>
          <h2>{m.legalPriorityTitle}</h2>
          <ul className="audit-priority-list">
            {legalWatchFirms.slice(0, 10).map((firm) => (
              <li key={firm.slug}>
                <Link href={L(`/firm/${firm.slug}#regulatory`)} className="signal-firm-link">
                  <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                  <span>{firm.name}</span>
                </Link>
                <span className={`badge ${regulatoryRiskClass(firm.regulatoryAudit.riskLevel)}`}>{v(firm.regulatoryAudit.riskLevel)}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel audit-legal-method-panel">
          <div className="eyebrow">{m.readingEyebrow}</div>
          <h2>{m.readingTitle}</h2>
          <div className="legal-method-grid">
            {m.reading.map((step, index) => (
              <div key={step.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{step.title}</strong>
                <small>{step.text}</small>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="section">
        <div className="panel audit-list-panel">
          <div className="panel-title-row">
            <div>
              <div className="eyebrow">{m.baseEyebrow}</div>
              <h2>{fmt(m.baseTitle, { count: propFirms.length })}</h2>
            </div>
            <span>{m.latestReview} <time dateTime={latest}>{latest}</time></span>
          </div>

          <div className="pr-firm-table" role="table" aria-label={fmt(m.tableAria, { count: propFirms.length })}>
            <FirmTableHead ui={t} />
            {propFirms.slice(0, 40).map((firm) => (
              <FirmRow
                key={firm.slug}
                firm={firm}
                locale={locale}
                ui={t}
                subline={fmt(m.subline, {
                  status: v(firm.auditStatus),
                  entity: firm.legalVerified ? m.entityMapped : m.entityMissing,
                  count: legalSourceCount(firm),
                })}
              />
            ))}
          </div>
          {propFirms.length > 40 ? (
            <p className="pr-table-more">
              <Link className="pr-link" href={L('/prop-firm-comparison')}>
                {fmt(m.seeOthers, { count: propFirms.length - 40 })} <span aria-hidden="true">→</span>
              </Link>
            </p>
          ) : null}
        </div>
      </section>
    </main>
  );
}
