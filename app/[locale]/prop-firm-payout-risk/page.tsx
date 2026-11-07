import type { Metadata } from 'next';
import FirmRow, { FirmTableHead } from '../../components/ui/FirmRow';
import Link from 'next/link';
import PageStructuredData from '../../components/PageStructuredData';
import { createPageMetadata } from '../../lib/pageMetadata';
import type { PropFirm } from '../../lib/propFirms';
import {
  documentedIncidents,
  payoutEvidence,
  payoutRiskClass,
  propFirms,
  hasPayoutRiskSignal,
} from '../../lib/propFirms';
import { toEnglishText } from '../../lib/i18n';
import IntentLink from '../../components/IntentLink';
import { HTML_LANG, OG_LOCALE, isLocale, localeAlternates, localePath, type Locale } from '../../lib/locales';
import { fmt, getMessages, tv } from '../../lib/messages';
import { getPageMessages } from '../../lib/messages/pages/payout-risk';
import { SITE_URL } from '../../lib/site';

const PATH = '/prop-firm-payout-risk';
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const p = getPageMessages(locale);
  const base = createPageMetadata({
    title: p.metaTitle,
    description: p.metaDescription,
    path: PATH,
    keywords: locale === 'en' ? ['prop firm payout problem', 'prop firm payout denial', 'prop firm payout risk', 'prop firm withdrawal'] : [],
    category: 'Prop firm payout risk',
  });
  return {
    ...base,
    alternates: localeAlternates(locale, PATH),
    openGraph: { ...base.openGraph, url: `${SITE_URL}${localePath(locale, PATH)}`, locale: OG_LOCALE[locale] },
  };
}

function legalSourceCount(firm: PropFirm) {
  return firm.regulatoryAudit.sources.length || firm.sources.length;
}

function isLegalWatchFirm(firm: PropFirm) {
  const risk = firm.regulatoryAudit.riskLevel;
  return !firm.legalVerified || risk === 'High' || risk === 'Critical' || risk === 'To audit';
}

export default async function PayoutRiskPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const t = getMessages(locale);
  const p = getPageMessages(locale);
  const L = (path: string) => localePath(locale, path);
  const v = (value: string | undefined | null) => tv(t, toEnglishText(value ?? ''));

  const risky = [...propFirms]
    .filter((firm) => hasPayoutRiskSignal(firm))
    .sort((a, b) => b.reviewSignals.payoutRiskScore - a.reviewSignals.payoutRiskScore)
    .slice(0, 24);
  const criticalCount = propFirms.filter((firm) => firm.reviewSignals.payoutRisk === 'Critique').length;
  const aboveLowCount = propFirms.filter((firm) => hasPayoutRiskSignal(firm)).length;
  const elevatedCount = propFirms.filter((firm) => firm.reviewSignals.payoutRisk === 'Élevé').length;
  const legalWatchCount = risky.filter(isLegalWatchFirm).length;
  const deepSourceRiskCount = risky.filter((firm) => legalSourceCount(firm) >= 5).length;
  const articleNewsCheckedCount = risky.filter((firm) => firm.auditSourcesChecked.some((source) => /article|news|press/i.test(source))).length;
  const payoutLegalWatch = risky.filter(isLegalWatchFirm).slice(0, 8);

  return (
    <main className="container guide-page">
      <PageStructuredData
        name={p.schemaName}
        description={p.metaDescription}
        path={L(PATH)}
        breadcrumbLabel={p.breadcrumb}
        dateModified="2026-07-13"
        inLanguage={HTML_LANG[locale]}
        home={{ label: t.guide.breadcrumbHome, url: `${SITE_URL}${L('/')}` }}
        items={risky.map((firm) => ({
          name: firm.name,
          path: L(`/firm/${firm.slug}`),
          description:
            locale === 'en'
              ? `Payout risk ${toEnglishText(firm.reviewSignals.payoutRisk).toLowerCase()}. ${toEnglishText(firm.verdict)}`
              : fmt(p.schemaItem, { level: v(firm.reviewSignals.payoutRisk) }),
        }))}
      />
      <section className="guide-hero">
        <div>
          <div className="eyebrow">{p.eyebrow}</div>
          <h1>{p.h1}</h1>
          <p className="lead">{p.lead}</p>
          <div className="actions">
            <IntentLink href={L('/prop-firm-comparison')} className="btn btn-primary">{p.ctaCompare}</IntentLink>
            <Link href={L('/prop-firm-rules')} className="btn">{p.ctaClauses}</Link>
            <Link href={L('/audit')} className="btn">{p.ctaSources}</Link>
          </div>
        </div>
        <dl className="pr-hero-stats">
          <div><dt>{p.statAbove}</dt><dd>{aboveLowCount}</dd></div>
          <div><dt>{p.statCritical}</dt><dd>{criticalCount}</dd></div>
          <div><dt>{p.statHigh}</dt><dd>{elevatedCount}</dd></div>
          <div><dt>{p.statShown}</dt><dd>{risky.length}</dd></div>
        </dl>
      </section>

      <section className="pr-stat-line" aria-label={p.summaryAria}>
        <dl>
          <div><dt>{p.statLegal}</dt><dd>{legalWatchCount}</dd></div>
          <div><dt>{p.statDeep}</dt><dd>{deepSourceRiskCount}</dd></div>
          <div><dt>{p.statPress}</dt><dd>{articleNewsCheckedCount}</dd></div>
        </dl>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">{p.methodEyebrow}</div>
            <h2>{p.methodTitle}</h2>
          </div>
        </div>
        <ul className="pr-decision-notes pr-decision-notes-4">
          {p.notes.map((note) => (
            <li key={note.title}><strong>{note.title}</strong><span>{note.text}</span></li>
          ))}
        </ul>
      </section>

      <section className="section" id="priority-alerts">
        <div className="section-heading">
          <div>
            <div className="eyebrow">{p.alertsEyebrow}</div>
            <h2>{p.alertsTitle}</h2>
          </div>
          {p.dataNote ? <p className="section-note">{p.dataNote}</p> : null}
        </div>
        <div className="pr-firm-table" role="table" aria-label={p.tableAria}>
          <FirmTableHead ui={t} />
          {risky.map((firm) => (
            <FirmRow
              key={firm.slug}
              firm={firm}
              locale={locale}
              ui={t}
              subline={toEnglishText(payoutEvidence(firm)[0] ?? documentedIncidents(firm)[0] ?? firm.verdict)}
            />
          ))}
        </div>
      </section>

      <section className="section guide-card-grid">
        <article className="panel">
          <div className="eyebrow">{p.badMixEyebrow}</div>
          <h2>{p.badMixTitle}</h2>
          <div className="guide-signal-stack">
            {(payoutLegalWatch.length ? payoutLegalWatch : risky.slice(0, 8)).map((firm) => (
              <Link href={`${L(`/firm/${firm.slug}`)}#regulatory`} key={firm.slug}>
                <span>{firm.name}</span>
                <span className="guide-signal-stack-meta">
                  <strong className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>
                    {v(firm.reviewSignals.payoutRisk)}
                  </strong>
                  <small>{v(firm.regulatoryAudit.riskLevel)}</small>
                </span>
              </Link>
            ))}
          </div>
        </article>
        <article className="panel">
          <div className="eyebrow">{p.beforeEyebrow}</div>
          <h2>{p.beforeTitle}</h2>
          <ul className="risk-list">
            {p.clauses.map((clause) => <li key={clause}>{clause}</li>)}
          </ul>
        </article>
      </section>
    </main>
  );
}
