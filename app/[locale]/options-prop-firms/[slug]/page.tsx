import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getOptionsFirm, optionsFirms } from '../../../lib/optionsFirms';
import { optionsAuditFor } from '../../../lib/optionsAudits';
import { optionsAuditCopy } from '../../../lib/optionsAuditI18n';
import { optionsCopy } from '../../../lib/optionsI18n';
import { isLocale, localeAlternates, localePath, type Locale } from '../../../lib/locales';
import { SITE_URL } from '../../../lib/site';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return optionsFirms.map((firm) => ({ locale: 'en', slug: firm.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const firm = getOptionsFirm(slug);
  if (!firm) return { title: 'Not found', robots: { index: false } };
  const audit = optionsAuditFor(slug)!;
  const path = `/options-prop-firms/${slug}`;
  const a = optionsAuditCopy(locale);
  // The audit summary exists in English and French only; other languages get a
  // description built from their translated audit labels instead of English text.
  const stop = locale === 'zh' || locale === 'ja' ? '。' : locale === 'hi' ? '। ' : locale === 'am' ? '። ' : '. ';
  const summary = locale === 'en' ? audit.summary : locale === 'fr' ? audit.summaryFr : `${a.explained}${stop}${a.notice.split(/(?<=[.。।።])\s*/)[0]}`;
  return {
    // The layout template adds "| PropRadar".
    title: `${firm.name} — ${a.initial} ${audit.score}/100 | Options`,
    description: `${firm.name}: ${summary}`,
    alternates: localeAlternates(locale, path),
    openGraph: { title: `${firm.name} — ${audit.score}/100`, url: `${SITE_URL}${localePath(locale, path)}`, type: 'article' },
  };
}

export default async function OptionsFirmPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const firm = getOptionsFirm(slug);
  if (!firm) notFound();
  const c = optionsCopy(locale);
  const a = optionsAuditCopy(locale);
  const audit = optionsAuditFor(slug)!;
  const L = (path: string) => localePath(locale, path);
  const pageSchema = {
    '@context': 'https://schema.org', '@type': 'WebPage', name: `${firm.name} — ${audit.score}/100`,
    url: `${SITE_URL}${L(`/options-prop-firms/${firm.slug}`)}`, dateModified: audit.reviewedAt,
    about: { '@type': 'Organization', name: firm.name, url: firm.website },
  };
  return (
    <main className="container options-page options-detail">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema).replace(/</g, '\\u003c') }} />
      <nav className="options-breadcrumb"><Link href={L('/options-prop-firms')}>← {c.returnHub}</Link></nav>
      <header className="options-hero options-detail-hero">
        <span className="eyebrow">{firm.kind === 'evaluation' ? c.evaluation : c.professional}</span>
        <div className="options-detail-heading"><Image src={audit.logo} alt="" width={86} height={86} className="options-company-logo" /><h1>{firm.name}</h1></div>
        <div className="options-detail-identity"><span className={`options-audit-score ${audit.score < 50 ? 'is-low' : audit.score >= 75 ? 'is-high' : ''}`}>{audit.score}<small>/100</small></span><span>{a.initial} · {a.explained}</span><time dateTime={audit.reviewedAt}>{c.updated}: {audit.reviewedAt}</time></div>
        <p className="pr-lead">{locale === 'fr' ? audit.summaryFr : audit.summary}</p>
        <a className="btn" href={firm.website} target="_blank" rel="noopener noreferrer">{c.officialSite} ↗</a>
      </header>
      <dl className="options-detail-facts"><div><dt>{c.instruments}</dt><dd>{firm.instruments}</dd></div><div><dt>{c.programme}</dt><dd>{firm.programme}</dd></div></dl>
      <section className="options-editorial options-detail-warning"><h2>{a.methodTitle}</h2><p>{a.notice}</p></section>
      {audit.trustpilot ? <div className="options-trustpilot"><strong>{a.trustpilot}</strong> <span>{audit.trustpilot.withheld ? a.ratingUnavailable : `${audit.trustpilot.rating}/5 · ${audit.trustpilot.count}`}</span><a target="_blank" rel="noopener noreferrer" href={audit.trustpilot.url}>{a.source} ↗</a></div> : null}
      {audit.beforeTrustpilotPenalty != null ? <p className="options-penalty">{a.penalty} ({audit.beforeTrustpilotPenalty} → {audit.score}/100)</p> : null}
      <section className="options-catalogue" aria-labelledby="options-audit-findings-title">
        <div className="options-section-heading"><span className="options-section-number">01</span><h2 id="options-audit-findings-title">{a.findings}</h2></div>
        <ol className="options-audit-findings">{audit.findings.map((finding) => <li key={finding.title} className={`options-finding-${finding.tone}`}><h3>{finding.title}</h3><p>{finding.detail}</p><a href={finding.source} target="_blank" rel="noopener noreferrer">{a.source} ↗</a></li>)}</ol>
      </section>
      {slug === 'tradefundrr' ? <p className="options-main-profile"><Link href={L('/firm/tradefundrr')}>{a.mainProfile} →</Link></p> : null}
      <section className="options-catalogue" aria-labelledby="options-rules-title">
        <div className="options-section-heading"><span className="options-section-number">02</span><h2 id="options-rules-title">{c.rules}</h2></div>
        <ol className="options-rules">
          {firm.facts.map((fact, index) => <li key={fact.source + index}><p>{fact.text}</p><a href={fact.source} target="_blank" rel="noopener noreferrer">{c.officialSource} ↗</a></li>)}
        </ol>
      </section>
      <section className="options-editorial options-method"><div><span className="options-section-number">03</span><h2>{c.caution}</h2><p>{firm.caution}</p></div><Link href={L('/audit')} className="btn">{a.methodTitle} →</Link></section>
      <p className="options-back"><Link href={L('/options-prop-firms')}>← {c.returnHub}</Link></p>
    </main>
  );
}
