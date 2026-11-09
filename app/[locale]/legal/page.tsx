import type { Metadata } from 'next';
import Link from 'next/link';
import { FOUNDER, SITE_NAME, SITE_URL } from '../../lib/site';
import { isLocale, localePath, type Locale } from '../../lib/locales';

const PATH = '/legal';
const UPDATED = '2026-11-09';
const AFFILIATES = ['FTMO', 'The5ers', 'FunderPro', 'GOAT Funded Trader', 'Blue Guardian'];

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const raw = (await params).locale;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  return {
    title: 'Legal notice and privacy',
    description: `Publisher, host, affiliate disclosure and privacy policy of ${SITE_NAME}.`,
    alternates: { canonical: PATH },
    robots: locale === 'en' ? undefined : { index: false, follow: true },
  };
}

/** Legal notice (publisher, host), affiliate disclosure and privacy policy. English only. */
export default async function LegalPage({ params }: Props) {
  const raw = (await params).locale;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  return (
    <main className="container pr-section pr-legal" id="main" lang="en">
      <div className="eyebrow">Legal</div>
      <h1>Legal notice and privacy</h1>
      <p className="muted">Last updated {UPDATED}.</p>

      <section aria-labelledby="publisher">
        <h2 id="publisher">Publisher</h2>
        <p>
          {SITE_NAME} ({SITE_URL.replace('https://', '')}) is published by <strong>{FOUNDER.legalName}</strong>, an individual publisher, who is also
          the director of publication.
        </p>
        <p>
          Contact: <a href="mailto:contact@propradar.tech">contact@propradar.tech</a>
        </p>
      </section>

      <section aria-labelledby="host">
        <h2 id="host">Host</h2>
        <p>Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, United States (vercel.com).</p>
      </section>

      <section aria-labelledby="affiliates">
        <h2 id="affiliates">Affiliate links</h2>
        <p>
          {SITE_NAME} earns a commission when someone buys through some of its links. Today that is the case for {AFFILIATES.join(', ')}. These
          links are labelled on every page and marked as sponsored for search engines. Affiliation never changes a score, a warning or a ranking:
          see <Link href={`${localePath(locale, '/about')}#score`}>how the score is set</Link>.
        </p>
      </section>

      <section aria-labelledby="not-advice">
        <h2 id="not-advice">Not financial advice</h2>
        <p>
          {SITE_NAME} is not a broker, not a prop firm and not an investment adviser. Pages describe what firms, regulators, courts and review sites
          published, with the date it was read. Rules and prices change: confirm them on the firm&apos;s own site before buying. Trading with leverage
          can lose money.
        </p>
      </section>

      <section aria-labelledby="privacy">
        <h2 id="privacy">Privacy</h2>
        <ul>
          <li>{SITE_NAME} has no user accounts and runs no advertising or analytics trackers.</li>
          <li>
            One functional cookie, <code>NEXT_LOCALE</code>, stores the language you pick in the language menu. It holds no personal data and is
            only set when you choose a language.
          </li>
          <li>The host, Vercel, processes technical request data (such as IP address and browser) to deliver and secure the site.</li>
          <li>
            If you email us, your address and message are used only to answer you and to keep a record of corrections. You can ask for access to,
            or deletion of, this data at <a href="mailto:contact@propradar.tech">contact@propradar.tech</a>.
          </li>
          <li>Affiliate partners may set their own cookies once you leave {SITE_NAME} for their site; their own privacy policies apply there.</li>
        </ul>
      </section>

      <section aria-labelledby="corrections">
        <h2 id="corrections">Corrections</h2>
        <p>
          Send the page and a public source to <a href="mailto:contact@propradar.tech">contact@propradar.tech</a>. The full{' '}
          <Link href={`${localePath(locale, '/about')}#corrections`}>corrections policy</Link> is on the About page.
        </p>
      </section>
    </main>
  );
}
