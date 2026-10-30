import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { closedFirms, documentedClosures, openFirms, payoutStats, statsUpdatedAt, trustpilotStats } from '../../lib/industryStats';
import { propFirms } from '../../lib/propFirms';
import { getFirmChangelog } from '../../lib/firmUpdates';
import { FOUNDER, SITE_NAME, SITE_URL } from '../../lib/site';
import { HTML_LANG, OG_LOCALE, isLocale, localeAlternates, localePath, type Locale } from '../../lib/locales';
import { fmt, getMessages, numberLocale } from '../../lib/messages';

const PATH = '/about';
const AFFILIATES = ['FTMO', 'The5ers', 'FunderPro', 'GOAT Funded Trader', 'Blue Guardian'];

type Props = { params: Promise<{ locale: string }> };

function pageLocale(raw: string): Locale {
  return isLocale(raw) ? raw : 'en';
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = pageLocale((await params).locale);
  const a = getMessages(locale).about;
  const description = fmt(a.metaDescription, { handle: FOUNDER.handle });
  return {
    title: a.metaTitle,
    description,
    alternates: localeAlternates(locale, PATH),
    authors: [{ name: FOUNDER.handle, url: localePath(locale, PATH) }],
    openGraph: {
      title: a.metaTitle,
      description,
      url: `${SITE_URL}${localePath(locale, PATH)}`,
      type: 'profile',
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
    },
    twitter: { card: 'summary_large_image', title: a.metaTitle, description },
  };
}

function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, '\\u003c') };
}

/** Fill a template whose {placeholders} are React nodes (links, bold handle). */
function rich(template: string, values: Record<string, ReactNode>) {
  return template.split(/(\{\w+\})/g).map((part, index) => {
    const key = part.match(/^\{(\w+)\}$/)?.[1];
    return key && key in values ? <span key={index}>{values[key]}</span> : part;
  });
}

export default async function AboutPage({ params }: Props) {
  const locale = pageLocale((await params).locale);
  const a = getMessages(locale).about;
  const n = (value: number) => value.toLocaleString(numberLocale(locale));
  const L = (path: string) => localePath(locale, path);
  const handle = <strong>{FOUNDER.handle}</strong>;
  const sourcedUpdates = propFirms.reduce((sum, firm) => sum + getFirmChangelog(firm.slug).length, 0);
  const facts = [
    { value: propFirms.length, label: a.factFirms, href: L('/prop-firm-radar') },
    { value: documentedClosures.length, label: a.factClosures, href: `${L('/prop-firm-statistics')}#closures` },
    { value: trustpilotStats.withheld, label: a.factWithheld, href: L('/trustpilot-prop-firms') },
    { value: sourcedUpdates, label: a.factUpdates, href: L('/audit') },
  ];
  const affiliates = new Intl.ListFormat(HTML_LANG[locale], { style: 'long', type: 'conjunction' }).format(AFFILIATES);
  const pageUrl = `${SITE_URL}${L(PATH)}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${pageUrl}#page`,
    url: pageUrl,
    name: a.metaTitle,
    description: fmt(a.metaDescription, { handle: FOUNDER.handle }),
    inLanguage: HTML_LANG[locale],
    dateModified: statsUpdatedAt,
    mainEntity: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      founder: { '@id': `${SITE_URL}${PATH}#founder` },
    },
    about: {
      '@type': 'Person',
      '@id': `${SITE_URL}${PATH}#founder`,
      name: FOUNDER.handle,
      jobTitle: 'Founder of PropRadar',
      description: FOUNDER.bio,
      knowsAbout: ['Proprietary trading firms', 'Forex trading', 'Commodities trading', 'Crypto trading', 'Prop firm challenges'],
      ...(FOUNDER.sameAs.length ? { sameAs: FOUNDER.sameAs } : {}),
    },
  };

  return (
    <main className="container seo-page pr-about">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />

      <header className="pr-about-hero">
        <div className="eyebrow">{a.eyebrow}</div>
        <h1>{a.h1}</h1>
        <p className="lead">{rich(a.lead, { handle })}</p>
      </header>

      <section className="pr-about-facts" aria-label={a.factsAria}>
        {facts.map((fact) => (
          <Link href={fact.href} key={fact.label}>
            <strong>{n(fact.value)}</strong>
            <span>{fact.label}</span>
          </Link>
        ))}
      </section>

      <section className="pr-about-block" aria-labelledby="why-title">
        <div className="eyebrow">{a.whyEyebrow}</div>
        <h2 id="why-title">{a.whyTitle}</h2>
        <div className="pr-about-prose">
          <p>{a.whyP1}</p>
          <p>
            {fmt(a.whyP2, {
              closures: n(documentedClosures.length),
              withheld: n(trustpilotStats.withheld),
              payout: n(payoutStats.sourcedSignal),
            })}
          </p>
        </div>
      </section>

      <section className="pr-about-block" aria-labelledby="rules-title">
        <div className="eyebrow">{a.rulesEyebrow}</div>
        <h2 id="rules-title">{a.rulesTitle}</h2>
        <ol className="pr-about-rules">
          {a.rules.map((rule, index) => (
            <li key={rule.title}>
              <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <strong>{rule.title}</strong>
                <p>{rule.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="pr-about-note">{rich(a.rulesNote, { link: <Link href={L('/audit')}>{a.rulesLink}</Link> })}</p>
      </section>

      <section className="pr-about-block" aria-labelledby="work-title">
        <div className="eyebrow">{a.workEyebrow}</div>
        <h2 id="work-title">{a.workTitle}</h2>
        <div className="pr-about-prose">
          <p>{rich(a.workP1, { open: n(openFirms.length), handle: FOUNDER.handle })}</p>
          <p>{fmt(a.workP2, { closed: n(closedFirms.length) })}</p>
        </div>
      </section>

      <section className="pr-about-block" aria-labelledby="money-title">
        <div className="eyebrow">{a.moneyEyebrow}</div>
        <h2 id="money-title">{a.moneyTitle}</h2>
        <div className="pr-about-prose">
          <p>{fmt(a.moneyP1, { firms: affiliates })}</p>
          <p>{rich(a.moneyP2, { link: <Link href={L('/promos')}>{a.moneyLink}</Link> })}</p>
          <p>{a.moneyP3}</p>
        </div>
      </section>

      <section className="pr-about-block pr-about-contact" aria-labelledby="contact-title">
        <div>
          <div className="eyebrow">{a.contactEyebrow}</div>
          <h2 id="contact-title">{a.contactTitle}</h2>
          <p>{a.contactText}</p>
        </div>
        <a className="btn btn-primary" href="mailto:contact@propradar.tech?subject=PropRadar%20correction">contact@propradar.tech</a>
      </section>
    </main>
  );
}
