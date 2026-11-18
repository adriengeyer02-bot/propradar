import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getOptionsFirm, optionsFirms } from '../../../lib/optionsFirms';
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
  const c = optionsCopy(locale);
  const path = `/options-prop-firms/${slug}`;
  return {
    title: `${firm.name} — ${c.noScore} | ${c.nav}`,
    description: `${firm.name}: ${firm.instruments}. ${firm.programme}. ${c.noScoreNotice}`,
    alternates: localeAlternates(locale, path),
    openGraph: { title: `${firm.name} — ${c.noScore}`, url: `${SITE_URL}${localePath(locale, path)}`, type: 'article' },
  };
}

export default async function OptionsFirmPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const firm = getOptionsFirm(slug);
  if (!firm) notFound();
  const c = optionsCopy(locale);
  const L = (path: string) => localePath(locale, path);
  const pageSchema = {
    '@context': 'https://schema.org', '@type': 'WebPage', name: `${firm.name} — ${c.noScore}`,
    url: `${SITE_URL}${L(`/options-prop-firms/${firm.slug}`)}`, dateModified: firm.checkedAt,
    about: { '@type': 'Organization', name: firm.name, url: firm.website },
  };
  return (
    <main className="container options-page options-detail">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema).replace(/</g, '\\u003c') }} />
      <nav className="options-breadcrumb"><Link href={L('/options-prop-firms')}>← {c.returnHub}</Link></nav>
      <header className="options-hero options-detail-hero">
        <span className="eyebrow">{firm.kind === 'evaluation' ? c.evaluation : c.professional}</span>
        <h1>{firm.name}</h1>
        <div className="options-detail-identity"><span className="options-unrated">{c.noScore}</span><time dateTime={firm.checkedAt}>{c.updated}: {firm.checkedAt}</time></div>
        <p className="pr-lead">{firm.programme}</p>
        <a className="btn" href={firm.website} target="_blank" rel="noopener noreferrer">{c.officialSite} ↗</a>
      </header>
      <dl className="options-detail-facts"><div><dt>{c.instruments}</dt><dd>{firm.instruments}</dd></div><div><dt>{c.programme}</dt><dd>{firm.programme}</dd></div></dl>
      <section className="options-editorial options-detail-warning"><h2>{c.noScore}</h2><p>{c.noScoreNotice}</p></section>
      <section className="options-catalogue" aria-labelledby="options-rules-title">
        <div className="options-section-heading"><span className="options-section-number">01 / SOURCES</span><h2 id="options-rules-title">{c.rules}</h2></div>
        <ol className="options-rules">
          {firm.facts.map((fact, index) => <li key={fact.source + index}><p>{fact.text}</p><a href={fact.source} target="_blank" rel="noopener noreferrer">{c.officialSource} ↗</a></li>)}
        </ol>
      </section>
      <section className="options-editorial options-method"><div><span className="options-section-number">02 / DUE DILIGENCE</span><h2>{c.caution}</h2><p>{firm.caution}</p></div><Link href={L('/audit')} className="btn">{c.methodTitle} →</Link></section>
      <p className="options-back"><Link href={L('/options-prop-firms')}>← {c.returnHub}</Link></p>
    </main>
  );
}
