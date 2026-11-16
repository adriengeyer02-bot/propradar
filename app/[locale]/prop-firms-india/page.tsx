import type { Metadata } from 'next';
import Link from 'next/link';
import india from '../../data/india.json';
import { listedFirms } from '../../lib/propFirms';
import { eligibilityFor } from '../../lib/countryEligibility';
import { SITE_NAME, SITE_URL } from '../../lib/site';
import { isLocale, type Locale } from '../../lib/locales';

const PATH = '/prop-firms-india';
const TITLE = 'Prop Firms in India (2026): RBI Rules, Alert List and Which Firms Accept Indian Traders';
const DESCRIPTION =
  'Official India eligibility policies for 26 prop firms, trading-country restrictions, payout methods where documented, RBI rules and the RBI Alert List. Every decision linked and dated.';

type Props = { params: Promise<{ locale: string }> };

type IndiaFirm = {
  slug: string;
  restrictedListUrl: string;
  payouts: string;
  payoutsUrl: string;
  note?: string;
  rbiAlert?: { date: string; url: string; entry: string };
};

const RBI = {
  faq: 'https://www.rbi.org.in/Scripts/FAQDisplay.aspx?Id=146',
  alertListPage: 'https://rbi.org.in/scripts/bs_viewcontent.aspx?Id=4235',
  caution2022: 'https://www.rbi.org.in/commonman/Upload/English/PressRelease/PDFs/PR166003022022.pdf',
  alertUpdate2024: 'https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=58949',
  lrsFaq: 'https://www.rbi.org.in/commonman/english/scripts/FAQs.aspx?Id=1834',
  sebiAdvisory: 'https://www.sebi.gov.in/media/press-releases/oct-2018/advisory-in-respect-of-foreign-trading-portals_40848.html',
};

const FAQ = [
  {
    q: 'Is prop firm trading legal in India?',
    a: 'PropRadar found no RBI, SEBI or government statement about prop firms or funded-trader programs as of 9 November 2026, and it does not give legal advice. What the RBI does say: residents may undertake forex transactions only with authorised persons and for permitted purposes, electronically only on RBI-authorised platforms or recognised Indian exchanges, and LRS remittances for margins to overseas counterparties are not allowed. Ask a qualified adviser how this applies to you.',
  },
  {
    q: 'Is any prop firm on the RBI Alert List?',
    a: 'Yes. The RBI press release of 22 October 2024 added "FundedNext | https://fundednext.com" to the Alert List of unauthorised forex trading platforms, together with "Smart Prop Trader". RBI says the list is not exhaustive and that an entity not on it should not be assumed to be authorised.',
  },
  {
    q: 'Do FTMO and The5ers accept traders from India?',
    a: 'Their official admission policies indicated that Indian traders could apply when reviewed on 16 November 2026, subject to KYC and program restrictions. This is not a statement that the activity is legally permitted in India.',
  },
  {
    q: 'How do prop firms pay traders in India?',
    a: 'On the firms checked, payouts go through Rise, crypto (USDT or USDC), bank transfer, Wise, Skrill or card, depending on the firm. None of the official pages read showed INR pricing.',
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const raw = (await params).locale;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: PATH },
    robots: locale === 'en' ? undefined : { index: false, follow: true },
    openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}${PATH}`, type: 'article', siteName: SITE_NAME },
  };
}

export default async function IndiaPage() {
  const payoutBySlug = new Map((india.firms as IndiaFirm[]).map((row) => [row.slug, row]));
  // A company appears only when we have read an official geographic policy.
  // Unreviewed firms must never inherit an optimistic "available" verdict.
  const firms = listedFirms
    .map((firm) => ({ firm, eligibility: eligibilityFor(firm.slug, 'IN'), payout: payoutBySlug.get(firm.slug) }))
    .filter((item) => Boolean(item.eligibility.source))
    .sort((a, b) => {
      const priority = { available: 0, restricted: 1, unknown: 2 };
      return priority[a.eligibility.status] - priority[b.eligibility.status] || b.firm.score - a.firm.score;
    });

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })),
  };

  return (
    <main className="container pr-section pr-legal pr-india" id="main" lang="en">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <div className="eyebrow">Traders in India</div>
      <h1>Prop firms in India: what the RBI says, and which firms accept Indian traders</h1>
      <p className="lead">
        Facts only, each linked to its source and dated. PropRadar is not a lawyer and this is not legal or tax advice. Read on{' '}
        {india.checkedOn}.
      </p>

      <section aria-labelledby="short">
        <h2 id="short">The short version</h2>
        <ul>
          <li>The RBI says residents may deal in forex only with authorised persons, for permitted purposes, and electronically only on RBI-authorised platforms or recognised Indian exchanges.</li>
          <li>LRS remittances for margins to overseas exchanges or counterparties are not allowed, according to the RBI.</li>
          <li>No RBI, SEBI or government statement about prop firms or funded-trader programs was found.</li>
          <li>One prop firm, FundedNext, was added to the RBI Alert List of unauthorised forex trading platforms on 22 October 2024.</li>
          <li>Published admission policies differ: some firms explicitly exclude India, while others accept Indian applications subject to product restrictions, KYC and payout checks.</li>
        </ul>
      </section>

      <section aria-labelledby="rbi">
        <h2 id="rbi">What the RBI says</h2>
        <p>
          RBI FAQ on forex transactions (28 August 2024):{' '}
          <q>Resident persons are permitted to undertake forex transactions only with authorised persons and for permitted purposes</q>, in terms of the
          Foreign Exchange Management Act, 1999 (FEMA).{' '}
          <q>Permitted forex transactions executed electronically should be undertaken only on electronic trading platforms (ETPs) authorised for the purpose by the Reserve Bank of India (RBI) or on recognized stock exchanges</q>{' '}
          (NSE, BSE and MSE). <a href={RBI.faq} target="_blank" rel="noopener noreferrer">Read the RBI FAQ</a>.
        </p>
        <p>
          On the Liberalised Remittance Scheme, the same FAQ says remittances <q>for margins or margin calls to overseas exchanges / overseas counterparty are not allowed under the Scheme</q>. The RBI LRS
          FAQ also lists remittance <q>for trading in foreign exchange abroad</q> among prohibited items.{' '}
          <a href={RBI.lrsFaq} target="_blank" rel="noopener noreferrer">Read the LRS FAQ</a>.
        </p>
        <p>
          On 3 February 2022 the RBI cautioned the public against unauthorised electronic trading platforms advertised on social media, search engines and apps.{' '}
          <a href={RBI.caution2022} target="_blank" rel="noopener noreferrer">Read the press release</a>. SEBI cautioned investors in 2018 against unregulated foreign
          trading portals, saying they are not supervised by any regulator in India.{' '}
          <a href={RBI.sebiAdvisory} target="_blank" rel="noopener noreferrer">Read the SEBI advisory</a>.
        </p>
        <p className="muted">
          Prop firms sell evaluations on simulated accounts and pay a share of simulated profits. PropRadar found no official Indian statement on how these programs fit
          the rules above, and no official guidance on how their payouts are taxed.
        </p>
      </section>

      <section aria-labelledby="alert">
        <h2 id="alert">The RBI Alert List</h2>
        <p>
          The RBI keeps an <a href={RBI.alertListPage} target="_blank" rel="noopener noreferrer">Alert List</a> of entities that are not authorised to deal in forex
          or to operate electronic trading platforms for forex. The RBI says the list is not exhaustive and that an entity not on it should not be assumed to be authorised.
        </p>
        <p>
          The RBI press release of 22 October 2024 added 13 entries, including <strong>FundedNext</strong> (https://fundednext.com) and Smart Prop Trader.{' '}
          <a href={RBI.alertUpdate2024} target="_blank" rel="noopener noreferrer">Read the press release</a>. PropRadar could not read the full current list (a PDF
          behind a verification page), so a firm missing from this page is not a sign that it is absent from the list.
        </p>
      </section>

      <section aria-labelledby="firms">
        <h2 id="firms">Which firms accept traders from India?</h2>
        <p>
          {firms.length} firm-level admission policies checked against the companies&apos; own published rules by {india.checkedOn}.
          &quot;Available&quot; means the company&apos;s published rules admit applications from India for at least one relevant program, not that a trader is guaranteed KYC,
          payments or permission under Indian law. &quot;Unverified / conditional&quot; means a meaningful program, citizenship or jurisdiction exception prevents a reliable answer.
          Firms without a readable official country policy are not given a country verdict here.
        </p>
        <div className="pr-india-table" role="table" aria-label="Prop firms and India">
          <div className="pr-india-row pr-india-head" role="row">
            <span role="columnheader">Firm</span>
            <span role="columnheader">India: official admission policy</span>
            <span role="columnheader">Payout evidence &amp; program limitations</span>
            <span role="columnheader">RBI Alert List</span>
          </div>
          {firms.map(({ firm, eligibility, payout }) => (
            <div className="pr-india-row" role="row" key={firm.slug}>
              <span role="cell">
                <Link href={`/firm/${firm.slug}`}>{firm.name}</Link>
                <small>Score {firm.score}/100</small>
              </span>
              <span role="cell">
                <a href={eligibility.source} target="_blank" rel="noopener noreferrer">
                  {eligibility.status === 'available' ? 'Available under published terms' : eligibility.status === 'restricted' ? 'Restricted' : 'Unverified / conditional'} ↗
                </a>
                <small>Official policy checked {eligibility.checked}</small>
              </span>
              <span role="cell">
                {payout ? <a href={payout.payoutsUrl} target="_blank" rel="noopener noreferrer">{payout.payouts}</a> : <small>Payout methods not yet checked for India</small>}
                {payout?.note ? <small>{payout.note}</small> : null}
                {eligibility.scope ? <small>{eligibility.scope}</small> : null}
              </span>
              <span role="cell">
                {payout?.rbiAlert ? (
                  <a href={payout.rbiAlert.url} target="_blank" rel="noopener noreferrer">Added {payout.rbiAlert.date}</a>
                ) : (
                  <small>No entry found in the press releases read</small>
                )}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="india-watchlist">
        <h2 id="india-watchlist">India-focused firms awaiting a full PropRadar audit</h2>
        <p>
          More firms are appearing in India-focused searches. We do not assign them a score or an eligibility badge until the operator, contract,
          KYC, customer restrictions and payout evidence have been checked. Three research leads as of {india.checkedOn}:
        </p>
        <ul>
          <li>
            <a href="https://indifunded.com/" target="_blank" rel="noopener noreferrer">IndiFunded</a> markets trading challenges in INR on Indian indices.
            Its <a href="https://indifunded.com/rules" target="_blank" rel="noopener noreferrer">published rules</a> specify a 15-day window for one challenge,
            whereas the same page also advertises no time limits. Operator identity, external review counts and the site&apos;s payout examples require independent corroboration.
          </li>
          <li>
            <a href="https://www.indiefunded.in/about" target="_blank" rel="noopener noreferrer">IndieFunded</a> is a different Indian brand despite the similar name.
            Its <a href="https://www.indiefunded.in/rules" target="_blank" rel="noopener noreferrer">simulated Indian-index options rules</a> and
            <a href="https://www.indiefunded.in/payouts" target="_blank" rel="noopener noreferrer"> company-published payout claims</a> still need registry and independent transfer checks.
            We do not treat the two brands as a single firm.
          </li>
          <li>
            <a href="https://futureselite.com/" target="_blank" rel="noopener noreferrer">FuturesElite</a> offers futures evaluations, but its
            <a href="https://futureselite.com/terms-and-conditions" target="_blank" rel="noopener noreferrer"> terms</a> identify an Italian operator.
            India-specific residency and reward-provider eligibility have not been established; geographical marketing alone is not an admission policy.
          </li>
        </ul>
        <p className="muted">None of these firms has been endorsed or ranked by PropRadar. This research queue is deliberately separate from the verified table above.</p>
      </section>

      <section aria-labelledby="checklist">
        <h2 id="checklist">Before paying for a challenge from India</h2>
        <ol>
          <li>Read the RBI pages linked above, and ask a qualified adviser how they apply to you.</li>
          <li>Check the firm&apos;s own restricted-countries page on the day you buy: lists change.</li>
          <li>Check how you would be paid (Rise, crypto, Wise, bank) and whether that works for you in India.</li>
          <li>Keep records of every fee paid and every payout received, for your own tax filing.</li>
          <li>Open the firm&apos;s PropRadar page for its rules, Trustpilot status and sourced incidents.</li>
        </ol>
      </section>

      <section aria-labelledby="faq">
        <h2 id="faq">FAQ</h2>
        {FAQ.map((item) => (
          <details key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </section>
    </main>
  );
}
