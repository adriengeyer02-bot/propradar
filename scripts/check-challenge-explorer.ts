/*
 * Checks for the challenge explorer (run: npx tsx scripts/check-challenge-explorer.ts).
 * - every locale defines every interface string, with the same placeholders as English;
 * - a price is "verified" only when it comes from a price-table row of that exact product;
 * - stars exist only when the five flexibility axes are sourced;
 * - closed firms are excluded and flagged domains never get an offer link;
 * - filters never let an unknown value pass;
 * - the order does not change when affiliation flags or links change.
 */
import assert from 'node:assert/strict';
import { challengeCatalog, type ChallengeOffer } from '../app/lib/challengeCatalog';
import { CHALLENGE_EXPLORER_COPY } from '../app/lib/challengeExplorerI18n';
import { EMPTY, matches, sortOffers, type Sort } from '../app/lib/challengeFilters';
import { LOCALES } from '../app/lib/locales';
import { getPriceTable } from '../app/lib/priceTables';
import { getProgrammeEvidence, programmeFlexibility } from '../app/lib/programmeFlexibility';
import { propFirms } from '../app/lib/propFirms';

let checks = 0;
const ok = (value: unknown, message: string) => {
  assert.ok(value, message);
  checks += 1;
};

// 1. Translations
const en = CHALLENGE_EXPLORER_COPY.en;
const placeholders = (text: string) => [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(',');
for (const locale of LOCALES) {
  const copy = CHALLENGE_EXPLORER_COPY[locale];
  ok(copy, `${locale}: missing challenge explorer copy`);
  for (const key of Object.keys(en) as (keyof typeof en)[]) {
    ok(typeof copy[key] === 'string' && copy[key].trim().length > 0, `${locale}.${key}: empty`);
    ok(placeholders(copy[key]) === placeholders(en[key]), `${locale}.${key}: placeholders differ from English`);
  }
  if (locale !== 'en') {
    // Interface sentences must be translated (short technical labels may stay identical).
    for (const key of ['title', 'lead', 'finderCta', 'method', 'q1', 'q5', 'rNone', 'alertsMany', 'ratingNote'] as const) {
      ok(copy[key] !== en[key], `${locale}.${key}: still in English`);
    }
  }
}

// 2. Data honesty
const offers = challengeCatalog('en');
ok(offers.length > 100, 'catalogue unexpectedly small');
const firms = new Map(propFirms.map((firm) => [firm.slug, firm]));
for (const offer of offers) {
  const firm = firms.get(offer.slug)!;
  ok(firm && firm.status !== 'Fermée', `${offer.key}: closed or unknown firm listed`);
  const rows = (getPriceTable(offer.slug)?.programs ?? []).filter((p) => p.productId === offer.productId).flatMap((p) => p.rows);
  ok(offer.prices.length === rows.length, `${offer.key}: verified prices must be exactly the price-table rows`);
  ok(!(offer.prices.length && offer.listedFrom !== null), `${offer.key}: listed fee shown next to verified prices`);
  const flex = programmeFlexibility(getProgrammeEvidence(offer.slug, offer.productId));
  ok(offer.stars === flex.stars && (offer.stars === null || flex.verified === 5), `${offer.key}: stars differ from sourced evidence`);
  ok(!(offer.domainWarning && offer.offerUrl), `${offer.key}: offer link shown despite a domain warning`);
  ok(offer.reliability === firm.score, `${offer.key}: reliability must be the firm score, untouched`);
}

// 3. Unknown values never pass a filter
const unknownSteps = offers.filter((o) => o.steps === null);
const unknownDrawdown = offers.filter((o) => o.drawdown === null);
const unknownPayout = offers.filter((o) => o.payoutDays === null);
const noPrice = offers.filter((o) => !o.prices.length && o.listedFrom === null);
ok(unknownSteps.every((o) => !matches(o, { ...EMPTY, steps: [0, 1, 2, 3] })), 'unknown steps pass the steps filter');
ok(unknownDrawdown.every((o) => !matches(o, { ...EMPTY, drawdown: ['Static', 'EOD', 'Trailing'] })), 'unknown drawdown passes the drawdown filter');
ok(unknownPayout.every((o) => !matches(o, { ...EMPTY, payout: 14 })), 'unknown payout rhythm passes the payout filter');
ok(noPrice.every((o) => !matches(o, { ...EMPTY, budget: 1000 })), 'unknown price passes the budget filter');
ok(offers.filter((o) => o.stars === null).every((o) => !matches(o, { ...EMPTY, flex: 'rated' })), 'unrated programme passes the rated filter');
const withCapital = offers.filter((o) => matches(o, { ...EMPTY, capital: 100000, budget: 600 }));
ok(withCapital.every((o) => o.prices.some((row) => row.size === 100000 && row.price <= 600)), 'capital + budget must use the verified price of that size');

// 4. Affiliation never moves the order
const flipped: ChallengeOffer[] = offers.map((o) => ({ ...o, affiliate: !o.affiliate, offerUrl: o.offerUrl ? null : 'https://example.com/' }));
for (const sort of ['reliability', 'flex', 'price', 'capital'] as Sort[]) {
  for (const capital of [null, 100000]) {
    const a = sortOffers(offers, sort, capital).map((o) => o.key).join('|');
    const b = sortOffers(flipped, sort, capital).map((o) => o.key).join('|');
    ok(a === b, `order changes with affiliation (${sort}, ${capital})`);
  }
}

console.log(`Challenge explorer: ${checks} checks OK (${offers.length} programmes, ${LOCALES.length} languages)`);
