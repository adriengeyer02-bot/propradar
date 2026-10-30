import type { Metadata } from 'next';
import Link from 'next/link';
import { closedFirms, documentedClosures, openFirms, payoutStats, statsUpdatedAt, trustpilotStats } from '../lib/industryStats';
import { propFirms } from '../lib/propFirms';
import { getFirmChangelog } from '../lib/firmUpdates';
import { FOUNDER, SITE_NAME, SITE_URL } from '../lib/site';

const PATH = '/about';
const TITLE = `About PropRadar: who runs it, how firms are checked, how it is funded`;
const DESCRIPTION = `PropRadar is run by ${FOUNDER.handle}, a trader who has been through many prop firms. Why the site exists, the rules every fact follows, and how affiliate links are kept away from the scores.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  authors: [{ name: FOUNDER.handle, url: PATH }],
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}${PATH}`, type: 'profile', siteName: SITE_NAME },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

const AFFILIATES = ['FTMO', 'The5ers', 'FunderPro', 'GOAT Funded Trader', 'Blue Guardian'];

const RULES = [
  {
    title: 'Every fact has a public source',
    text: 'A price, a rule, a payout delay or a closure is shown with the page it was read on and the date it was read. No source, no change.',
  },
  {
    title: 'Facts, not verdicts',
    text: 'We write what a regulator, a court, Trustpilot or the firm itself published, and link it. We do not put labels on firms in our own voice.',
  },
  {
    title: 'No invented numbers',
    text: 'If a figure could not be read on a source, the page says "not stated" or "to verify". Estimates are never shown as measurements.',
  },
  {
    title: 'Every update is dated and kept',
    text: 'Each firm page has an update history. Earlier entries are never deleted, so you can see what changed and when.',
  },
  {
    title: 'Money never moves a score',
    text: 'Affiliate firms are held to the same rules as every other firm. A firm cannot pay to raise its score or to remove a sourced warning.',
  },
];

function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, '\\u003c') };
}

export default function AboutPage() {
  const sourcedUpdates = propFirms.reduce((sum, firm) => sum + getFirmChangelog(firm.slug).length, 0);
  const facts = [
    { value: propFirms.length, label: 'prop firms tracked', href: '/prop-firm-radar' },
    { value: documentedClosures.length, label: 'closures documented with a dated source', href: '/prop-firm-statistics#closures' },
    { value: trustpilotStats.withheld, label: 'firms whose Trustpilot rating is withheld', href: '/trustpilot-prop-firms' },
    { value: sourcedUpdates, label: 'dated, sourced updates on firm pages', href: '/audit' },
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${SITE_URL}${PATH}#page`,
    url: `${SITE_URL}${PATH}`,
    name: TITLE,
    description: DESCRIPTION,
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
        <div className="eyebrow">About PropRadar</div>
        <h1>Built by a trader who has been through many prop firms.</h1>
        <p className="lead">
          PropRadar is run by <strong>{FOUNDER.handle}</strong>. {FOUNDER.bio} The site exists for one reason: so that
          the next trader can check a firm properly before paying for a challenge.
        </p>
      </header>

      <section className="pr-about-facts" aria-label="PropRadar in numbers">
        {facts.map((fact) => (
          <Link href={fact.href} key={fact.label}>
            <strong>{fact.value.toLocaleString('en-US')}</strong>
            <span>{fact.label}</span>
          </Link>
        ))}
      </section>

      <section className="pr-about-block" aria-labelledby="why-title">
        <div className="eyebrow">Why it exists</div>
        <h2 id="why-title">Buying a challenge should not be a leap of faith.</h2>
        <div className="pr-about-prose">
          <p>
            Anyone who has traded with several prop firms knows the pattern. The marketing is loud, the rules are spread
            across a pricing page, a help centre and terms of service, and they change. Some firms have closed after
            losing their trading platform or announcing insolvency. Some have had their Trustpilot rating withheld after
            fake reviews were removed. Some contract through companies registered in several countries.
          </p>
          <p>
            None of this is hidden, but it is scattered. PropRadar puts it in one place, firm by firm, with the source
            next to every line: {documentedClosures.length} documented closures, {trustpilotStats.withheld} withheld
            Trustpilot ratings and {payoutStats.sourcedSignal} open firms with a sourced payout-risk signal, at the
            last count. The goal is not to tell you which firm to buy. It is to make sure you know what you are buying.
          </p>
        </div>
      </section>

      <section className="pr-about-block" aria-labelledby="rules-title">
        <div className="eyebrow">How firms are checked</div>
        <h2 id="rules-title">Five rules every page follows.</h2>
        <ol className="pr-about-rules">
          {RULES.map((rule, index) => (
            <li key={rule.title}>
              <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <strong>{rule.title}</strong>
                <p>{rule.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="pr-about-note">
          The full method, with the sources used for each check, is on the <Link href="/audit">method and sources</Link> page.
        </p>
      </section>

      <section className="pr-about-block" aria-labelledby="work-title">
        <div className="eyebrow">How the research is done</div>
        <h2 id="work-title">Software does the reading. Every change has a source.</h2>
        <div className="pr-about-prose">
          <p>
            Keeping {openFirms.length} open firms current by hand is not realistic, so PropRadar uses software and AI
            tools to read official pages, Trustpilot and regulator lists, and to watch every official domain daily.
            Each change is written with its source and date, and passes an automatic validator. Changes that could
            hurt a firm, such as a new incident, a status change or a large score move, are approved by {FOUNDER.handle}{' '}
            before they go live.
          </p>
          <p>
            {closedFirms.length} closed firms stay on the site on purpose: their closure record is part of the history
            traders need.
          </p>
        </div>
      </section>

      <section className="pr-about-block" aria-labelledby="money-title">
        <div className="eyebrow">How PropRadar is funded</div>
        <h2 id="money-title">Affiliate links, kept away from the scores.</h2>
        <div className="pr-about-prose">
          <p>
            PropRadar earns a commission when someone buys through some of its links. Today that is the case for{' '}
            {AFFILIATES.slice(0, -1).join(', ')} and {AFFILIATES.at(-1)}. Those links are labelled on every page and marked as sponsored for search engines.
          </p>
          <p>
            Affiliation never changes a score, a warning or the order of a ranking. If an affiliate firm has a sourced
            problem, it is shown exactly like it would be for any other firm. Discount codes are listed with the firm&apos;s
            score next to them, on the <Link href="/promos">deals page</Link>.
          </p>
          <p>PropRadar is not a broker, not a prop firm and not financial advice. Trading with leverage can lose money.</p>
        </div>
      </section>

      <section className="pr-about-block pr-about-contact" aria-labelledby="contact-title">
        <div>
          <div className="eyebrow">Corrections</div>
          <h2 id="contact-title">Found something wrong or out of date?</h2>
          <p>Send the page and a public link. Every correction is dated in the firm&apos;s update history.</p>
        </div>
        <a className="btn btn-primary" href="mailto:contact@propradar.tech?subject=PropRadar%20correction">contact@propradar.tech</a>
      </section>
    </main>
  );
}
