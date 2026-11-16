/**
 * Residence-based program eligibility, NOT the firm's incorporation country.
 * A green status requires an explicit official worldwide-except policy (or
 * named country). An unreviewed firm/country is ALWAYS unknown, not eligible.
 * A firm may sell multiple products with different territorial rules.
 * Recheck the linked primary source before purchase, KYC or reward requests.
 */
export type EligibilityStatus = 'available' | 'restricted' | 'unknown';

export const ELIGIBILITY_COUNTRIES = [
  'US', 'FR', 'CN', 'IN', 'SG', 'GB', 'DE', 'CA', 'AU', 'JP',
  'BR', 'AE', 'ES', 'IT', 'PT', 'NL', 'CH', 'HK', 'KR', 'ID',
  'PK', 'MY', 'PH', 'VN', 'TH', 'TR', 'ZA', 'NG', 'MX', 'AR',
  'BE', 'PL', 'RO', 'UA', 'RU', 'NZ', 'BD', 'SA', 'IL', 'EG',
] as const;

type Rule = {
  /** Some program is explicitly offered to this country, subject to KYC. */
  available?: readonly string[];
  /** No program is offered to this country, per the cited policy. */
  restricted?: readonly string[];
  /** The published general admission policy accepts countries outside its exclusion list. */
  worldwideExceptListed?: boolean;
  /** A region, citizenship or product-specific limitation prevents a simple country verdict. */
  conditional?: readonly string[];
  source: string;
  /** Product or regional limitations not captured by a single badge. */
  scope: string;
  checked: string;
};

const rules: Record<string, Rule> = {
  ftmo: {
    available: ['US', 'FR', 'CN', 'IN', 'SG', 'GB', 'DE', 'CA', 'JP', 'BR', 'ES', 'IT', 'PT', 'NL', 'CH', 'HK', 'KR', 'PH', 'TH', 'ZA', 'MX', 'AR', 'BE', 'PL', 'RO', 'NZ', 'BD', 'SA', 'IL', 'EG'],
    restricted: ['RU', 'ID'],
    source: 'https://ftmo.com/en/faq/who-can-join-ftmo/',
    scope: 'FTMO CFD Challenge: United States via FTMO US (OANDA); Futures access is separate and excludes mainland China. Jurisdiction, nationality and sanctions checks still apply.',
    checked: '2026-11-16',
  },
  the5ers: {
    worldwideExceptListed: true,
    restricted: ['IL', 'RU'],
    conditional: ['UA'],
    source: 'https://the5ers.com/faqs/who-can-join-the5ers/',
    scope: 'The5ers accepts international applicants outside its excluded list. Some Ukrainian territories are excluded; US residents must use a supported non-MetaQuotes platform. Citizenship, sanctions and KYC remain relevant.',
    checked: '2026-11-16',
  },
  topstep: {
    available: ['US', 'FR', 'IN', 'SG', 'GB', 'CA', 'AU', 'JP', 'BR', 'ES', 'IT', 'PT', 'NL', 'CH', 'KR', 'ID', 'MY', 'PH', 'TH', 'MX', 'AR', 'BE', 'PL', 'RO', 'NZ', 'BD', 'SA', 'IL', 'EG'],
    restricted: ['PK', 'TR', 'NG', 'UA', 'RU'],
    source: 'https://help.topstep.com/en/articles/8284116-am-i-eligible-to-trade-with-topstep',
    scope: 'Topstep eligibility depends on citizenship AND permanent residence; some countries are Express Funded Account only. China requires individual verification (specific restricted entities).',
    checked: '2026-11-16',
  },
  myfundedfutures: {
    available: ['US', 'IN', 'SG', 'GB', 'DE', 'CA', 'AU', 'JP', 'BR', 'ES', 'IT', 'PT', 'NL', 'CH', 'KR', 'TH', 'MX', 'AR', 'PL', 'NZ', 'BD', 'SA', 'IL', 'EG'],
    restricted: ['CN', 'HK', 'ID', 'PK', 'MY', 'PH', 'VN', 'TR', 'ZA', 'NG', 'RO', 'UA', 'RU', 'AE'],
    source: 'https://help.myfundedfutures.com/en/articles/8229993-restricted-countries-policy',
    scope: 'My Funded Futures: France is region-dependent (Corsica and non-mainland islands excluded), so France is unverified here rather than marked universally available.',
    checked: '2026-11-16',
  },
  'apex-trader-funding': {
    worldwideExceptListed: true,
    restricted: ['CN', 'BD', 'EG', 'NG', 'PK', 'RU', 'SA', 'ZA', 'TR', 'UA', 'VN'],
    source: 'https://apextraderfunding.com/help-center/getting-started/restricted-countries/',
    scope: 'Apex evaluates residency, government ID, bank/payment origin and physical location. The list refers to new/additional accounts; eligibility for Apex Live is separately decided by a brokerage partner.',
    checked: '2026-11-16',
  },
  'take-profit-trader': {
    worldwideExceptListed: true,
    restricted: ['NG', 'PK', 'PH', 'RO', 'RU', 'TR', 'UA', 'VN', 'ZA'],
    source: 'https://takeprofittraderhelp.zendesk.com/hc/en-us/articles/22447557656477-Restricted-Countries',
    scope: 'Take Profit Trader restricts all account access and market-data connections from banned locations, including while travelling. The policy may change due to data/brokerage access.',
    checked: '2026-11-16',
  },
  tradeify: {
    worldwideExceptListed: true,
    restricted: ['ID', 'IL', 'MY', 'PK', 'RU', 'TR', 'UA', 'VN'],
    source: 'https://help.tradeify.co/en/articles/10495888-rules-restricted-countries',
    scope: 'Tradeify Futures residency policy (65 excluded countries). Travel does not change residence eligibility. Individual competitions can impose extra territorial restrictions.',
    checked: '2026-11-16',
  },
  funderpro: {
    worldwideExceptListed: true,
    restricted: ['RU'],
    conditional: ['US', 'UA'],
    source: 'https://support.funderpro.com/en/articles/376945-sign-up-age-limits-and-country-restrictions',
    scope: 'FunderPro challenge policy. US MetaTrader access is restricted and some Ukrainian regions are excluded. FunderPro Futures is a separate program with separate terms.',
    checked: '2026-11-16',
  },
  'e8-markets': {
    worldwideExceptListed: true,
    restricted: ['AE', 'PK', 'RU', 'UA'],
    source: 'https://help.e8markets.com/en/articles/5514278-accepted-countries',
    scope: 'At least one E8 Classic/Perpetuals product may be offered. Futures has a separate, longer exclusion list including China; E8 One in India has a $200k allocation limit. KYC and payout providers still decide.',
    checked: '2026-11-16',
  },
  'funding-pips': {
    worldwideExceptListed: true,
    restricted: ['AE', 'VN'],
    conditional: ['RU', 'UA'],
    source: 'https://help.fundingpips.com/hc/en-us/articles/44390730743825-Get-Started',
    scope: 'FundingPips registration excludes Iran, Vietnam and UAE, plus sanctions. MT5 and cTrader exclude US users, but Match-Trader is explicitly offered to US and Canadian residents; confirm product and payout provider.',
    checked: '2026-11-16',
  },
  'goat-funded-trader': {
    worldwideExceptListed: true,
    restricted: ['HK', 'IL', 'KR', 'RU', 'SG', 'UA'],
    source: 'https://help.goatfundedtrader.com/en/articles/10742187-which-countries-are-restricted-at-goat-funded-trader',
    scope: 'GOAT Funded Trader states that Singapore, Hong Kong and South Korea are excluded. Other countries are subject to KYC and payout methods; US platform availability differs.',
    checked: '2026-11-16',
  },
  'blue-guardian': {
    worldwideExceptListed: true,
    restricted: ['VN'],
    conditional: ['PH'],
    source: 'https://help.blueguardian.com/en/articles/18426607-who-can-sign-up-age-and-restricted-countries',
    scope: 'Blue Guardian CFD and Futures have different lists. Philippines is excluded for CFD; Futures might differ. Indonesia, Malaysia and Turkey are excluded for Futures but not generally for CFD. Citizenship and partner restrictions also apply.',
    checked: '2026-11-16',
  },
  'city-traders-imperium': {
    worldwideExceptListed: true,
    restricted: ['RU'],
    source: 'https://citytradersimperium.com/',
    scope: 'CTI lists Russia, Iran, North Korea, Syria and Cuba as excluded and says it serves 178+ countries. US clients use Match-Trader, not MT5; local law and sanctions can still override.',
    checked: '2026-11-16',
  },
  onefunded: {
    available: ['IN'],
    restricted: ['AE', 'RU'],
    source: 'https://help.onefunded.com/eligibility/',
    scope: 'OneFunded explicitly offers an Entry Challenge to Indian traders; its general restricted-jurisdiction list says it is NOT exhaustive. All other countries therefore remain unverified rather than automatically approved.',
    checked: '2026-11-16',
  },
  'bullwaves-prime': {
    restricted: ['US', 'CN', 'BE'],
    source: 'https://prime.bullwaves.com/legal',
    scope: 'Bullwaves Prime lists other excluded jurisdictions and broad sanctions/local-law conditions; other countries remain unverified pending individual assessment.',
    checked: '2026-11-16',
  },
  fundednext: {
    worldwideExceptListed: true,
    restricted: ['BD', 'MY', 'VN'],
    conditional: ['US'],
    source: 'https://help.fundednext.com/en/articles/8020080-are-any-countries-restricted-on-fundednext-cfds',
    scope: 'FundedNext CFD only, not FundedNext Futures. The official exclusions apply to both residents and citizens. US residents face MT4/MT5 and product-specific restrictions; a US badge cannot cover every CFD product. VPN circumvention of geographic rules is prohibited.',
    checked: '2026-11-16',
  },
  'alpha-capital-group': {
    worldwideExceptListed: true,
    restricted: ['RU', 'VN'],
    conditional: ['UA'],
    source: 'https://help.alphacapitalgroup.uk/en/articles/8775575-countries-with-limitations',
    scope: 'Alpha Capital Group accepts residents and nationals outside its published exclusions, except sanctioned Ukrainian regions. Both nationality and residence matter. Platform, KYC and payment-provider eligibility still need confirmation.',
    checked: '2026-11-16',
  },
  'funded-trading-plus': {
    worldwideExceptListed: true,
    restricted: ['RU', 'VN'],
    conditional: ['UA'],
    source: 'https://help.fundedtradingplus.com/prohibited-countries/',
    scope: 'Funded Trading Plus says it cannot serve traders from listed sanctions jurisdictions, with Ukrainian exclusions restricted to named regions. Its help center warns purchases and performance payments may not be refunded/paid if ineligible; check the actual purchase and payout location.',
    checked: '2026-11-16',
  },
  fxify: {
    worldwideExceptListed: true,
    restricted: ['RU', 'VN'],
    conditional: ['US'],
    source: 'https://fxify.com/faqs/all-faqs/what-countries-are-accepted/',
    scope: 'FXIFY FAQ lists excluded countries but the main website also contains a US-specific exclusion disclosure: US access is unverified pending firm clarification. Other countries may face platform, identity and local-law limits.',
    checked: '2026-11-16',
  },
  fintokei: {
    worldwideExceptListed: true,
    restricted: ['US', 'IN', 'CN', 'BD', 'PK', 'VN', 'RU', 'ID', 'MY', 'PH', 'TH', 'SA', 'NG', 'ZA', 'TR', 'UA', 'AE'],
    source: 'https://support.fintokei.com/en/articles/6538820-who-can-join-fintokei',
    scope: 'Fintokei distinguishes a resident/citizen ban (including India and US), temporary bans (including China, Pakistan and Bangladesh) and countries where NEW purchases are suspended (including Indonesia, Malaysia, Philippines and Thailand). Crypto payouts are only available in a narrower subset; other eligible residents may use different payment methods.',
    checked: '2026-11-16',
  },
  hyrotrader: {
    worldwideExceptListed: true,
    restricted: ['RU'],
    conditional: ['UA'],
    source: 'https://www.hyrotrader.com/faq/platform/which-countries-are-allowed-to-join-hyrotrader-can-i-join-from-the-usuk/',
    scope: 'HyroTrader simulated crypto evaluations accept most countries including US and UK, except its Terms section 12.1 list and specific Ukrainian regions. Third-party Bybit/BloFin and Tealstreet/Tiger platform access is country-dependent; US traders may need the proprietary Hyro platform.',
    checked: '2026-11-16',
  },
  'alpha-futures': {
    worldwideExceptListed: true,
    restricted: ['CN', 'MY', 'NG', 'PK', 'PH', 'RO', 'RU', 'TR', 'UA', 'VN'],
    source: 'https://help.alpha-futures.com/en/articles/9523389-countries-with-limitations',
    scope: 'Alpha Futures Futures evaluations: eligibility requires an acceptable residence OR nationality under its published rule; trading while travelling through an excluded country is also forbidden. Exclusions include China, Malaysia, Pakistan and Philippines.',
    checked: '2026-11-16',
  },
  pipfarm: {
    worldwideExceptListed: true,
    restricted: ['US'],
    source: 'https://help.pipfarm.com/en/articles/4318163-prohibited-country-list',
    scope: 'PipFarm exclusions use TAX RESIDENCE, not simply present location. US citizenship is independently prohibited regardless of residence (as are a few other nationalities); verify tax status and payment processor before buying.',
    checked: '2026-11-16',
  },
  'lucid-trading': {
    worldwideExceptListed: true,
    restricted: ['ID', 'NG', 'PK', 'PH', 'RU', 'ZA', 'TR', 'UA', 'VN'],
    source: 'https://support.lucidtrading.com/en/articles/11404636-restricted-countries',
    scope: 'Lucid Trading Futures: ineligibility if either citizen OR resident of listed countries. A geographic admission badge does not verify access to every trading platform or payout provider.',
    checked: '2026-11-16',
  },
  brightfunded: {
    worldwideExceptListed: true,
    restricted: ['PK', 'VN'],
    source: 'https://help.brightfunded.com/en/articles/9286630-what-countries-are-restricted-at-brightfunded',
    scope: 'BrightFunded CFD: new registrations and challenge purchases are barred for nationals and residents of the official exclusion list. Existing Pakistan accounts may continue trading, but new purchases are excluded. Verify payment-provider eligibility and product requirements separately.',
    checked: '2026-11-16',
  },
  upcomers: {
    worldwideExceptListed: true,
    restricted: ['RU'],
    conditional: ['UA', 'AE'],
    source: 'https://help.upcomers.com/en/articles/8703655-are-there-any-prohibited-countries',
    scope: 'Upcomers general challenge eligibility admits over 180 countries including India; specified Ukrainian territories are excluded. The separate Breakout products additionally exclude UAE citizens/residents, so UAE is unverified at firm level. Program, KYC and payment access must still be checked.',
    checked: '2026-11-16',
  },
};

export function eligibilityFor(slug: string, country: string): {
  status: EligibilityStatus;
  source?: string;
  scope?: string;
  checked?: string;
} {
  const rule = rules[slug];
  if (!rule) return { status: 'unknown' };
  if (rule.restricted?.includes(country)) return { status: 'restricted', source: rule.source, scope: rule.scope, checked: rule.checked };
  if (rule.conditional?.includes(country)) return { status: 'unknown', source: rule.source, scope: rule.scope, checked: rule.checked };
  if (rule.worldwideExceptListed || rule.available?.includes(country)) return { status: 'available', source: rule.source, scope: rule.scope, checked: rule.checked };
  return { status: 'unknown', source: rule.source, scope: rule.scope, checked: rule.checked };
}
