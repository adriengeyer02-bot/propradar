import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { optionsFirms } from '../../lib/optionsFirms';
import { optionsAuditFor } from '../../lib/optionsAudits';
import { optionsAuditCopy } from '../../lib/optionsAuditI18n';
import { optionsCopy } from '../../lib/optionsI18n';
import { HTML_LANG, isLocale, localeAlternates, localePath, type Locale } from '../../lib/locales';
import { SITE_URL } from '../../lib/site';

const PATH = '/options-prop-firms';
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const c = optionsCopy(locale);
  return {
    title: c.title,
    description: c.subtitle,
    keywords: ['options prop firms', 'funded options trading', 'options trading challenge', 'options funded account', 'stock options prop firm'],
    alternates: localeAlternates(locale, PATH),
    openGraph: { title: c.title, description: c.subtitle, url: `${SITE_URL}${localePath(locale, PATH)}`, type: 'website' },
  };
}

export default async function OptionsPropFirmsPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const c = optionsCopy(locale);
  const a = optionsAuditCopy(locale);
  const L = (path: string) => localePath(locale, path);
  const group = (kind: 'evaluation' | 'professional') => optionsFirms.filter((firm) => firm.kind === kind)
    .sort((left, right) => (optionsAuditFor(right.slug)?.score ?? 0) - (optionsAuditFor(left.slug)?.score ?? 0));
  const listingSchema = {
    '@context': 'https://schema.org', '@type': 'CollectionPage',
    name: c.title, description: c.subtitle, url: `${SITE_URL}${L(PATH)}`, inLanguage: HTML_LANG[locale],
    dateModified: '2026-11-18',
    mainEntity: { '@type': 'ItemList', numberOfItems: optionsFirms.length,
      itemListElement: optionsFirms.map((firm, index) => ({ '@type': 'ListItem', position: index + 1, name: firm.name, url: `${SITE_URL}${L(`${PATH}/${firm.slug}`)}` })) },
  };

  return (
    <main className="container options-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listingSchema).replace(/</g, '\\u003c') }} />
      <header className="options-hero">
        <span className="eyebrow">{c.eyebrow}</span>
        <h1>{c.title}</h1>
        <p className="pr-lead">{c.subtitle}</p>
        <div className="options-hero-actions">
          <Link href={`${L('/prop-firm-radar')}#options-sector`} className="btn btn-primary">{c.radarLink} <span aria-hidden="true">↗</span></Link>
          <Link href={L('/prop-firm-comparison')} className="btn">{c.compareLink}</Link>
        </div>
        <div className="options-counter" aria-label={`${optionsFirms.length} ${c.nav}`}>
          <strong>{group('evaluation').length}</strong><span>{c.evaluation}</span>
          <strong>{group('professional').length}</strong><span>{c.professional}</span>
          <strong>{optionsFirms.length}</strong><span>{a.initial}</span>
        </div>
      </header>

      <section className="options-editorial" aria-labelledby="options-intro-title">
        <div><span className="options-section-number">01</span><h2 id="options-intro-title">{c.introTitle}</h2><p>{c.intro}</p></div>
        <aside className="options-pending"><strong>{a.initial}</strong><p>{a.notice}</p></aside>
      </section>

      {(['evaluation', 'professional'] as const).map((kind, groupIndex) => (
        <section key={kind} className="options-catalogue" aria-labelledby={`options-${kind}`}>
          <div className="options-section-heading"><span className="options-section-number">0{groupIndex + 2}</span><h2 id={`options-${kind}`}>{kind === 'evaluation' ? c.evaluation : c.professional}</h2><span>{group(kind).length}</span></div>
          <div className="options-cards">
            {group(kind).map((firm) => {
              const audit = optionsAuditFor(firm.slug)!;
              return (
              <article key={firm.slug} className="options-card">
                <div className="options-card-top"><Image className="options-company-logo" src={audit.logo} alt="" width={52} height={52} /><span className={`options-audit-score ${audit.score < 50 ? 'is-low' : audit.score >= 75 ? 'is-high' : ''}`}>{audit.score}<small>/100</small></span></div>
                <h3><Link href={L(`${PATH}/${firm.slug}`)}>{firm.name}</Link></h3>
                <p className="options-card-market">{firm.instruments}</p>
                <p>{locale === 'fr' ? audit.summaryFr : audit.summary}</p>
                <div className="options-card-footer"><time dateTime={firm.checkedAt}>{firm.checkedAt}</time><Link href={L(`${PATH}/${firm.slug}`)}>{c.dossier} →</Link></div>
              </article>
            ); })}
          </div>
        </section>
      ))}

      <section className="options-editorial options-method" aria-labelledby="options-method-title">
        <div><span className="options-section-number">04</span><h2 id="options-method-title">{a.methodTitle}</h2><p>{a.notice}</p></div>
        <Link href={L('/audit')} className="btn">{a.methodTitle} →</Link>
      </section>
    </main>
  );
}
