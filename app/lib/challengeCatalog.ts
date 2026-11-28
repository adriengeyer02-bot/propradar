/**
 * Challenge catalogue for the buyer-facing explorer (Geyer, 2026-11-28).
 *
 * Read-only view over the existing sourced files: firm profiles and their
 * dated updates (propFirms), list prices read by account size
 * (price-tables.json), current programme promotions, programme flexibility
 * evidence and the contractual red flags. Nothing is estimated here:
 * - a price is "verified" only when it comes from a price table row;
 *   a firm-file entry fee is shown as "listed", anything else as unknown;
 * - steps, drawdown, consistency and payout frequency are read from the
 *   programme's own fields; when the text does not say it, the value is null
 *   ("not documented") and never a default;
 * - the firm reliability score (/100) and the programme flexibility stars (/5)
 *   stay two separate fields;
 * - affiliation is exposed only as a disclosure flag and is never used to
 *   order or filter offers.
 */
import { td } from './dataI18n';
import { getContractAudit } from './contractAudits';
import { getPriceTable, type PriceProgram } from './priceTables';
import { getProgramPromotions } from './programPromotions';
import { publishedPairs } from './promoPricing';
import { getProgrammeEvidence, programmeFlexibility } from './programmeFlexibility';
import { isAffiliateUrl, isProvisional, propFirms, type Product, type PropFirm } from './propFirms';
import { getScaleC, SCALE_C_CONTRACT_CODES, type ScaleCCode } from './scaleC';
import { scaleCCopy } from './scaleCI18n';
import type { Locale } from './locales';

export type ChallengeMarket = 'forex' | 'futures' | 'crypto' | 'stocks';
export type ChallengeSteps = 0 | 1 | 2 | 3;
export type ChallengeDrawdown = 'Static' | 'EOD' | 'Trailing' | 'Hybride';

export type ChallengePrice = { size: number; price: number; currency: 'USD' | 'EUR' | 'GBP'; billing: 'one-time' | 'monthly'; upfront?: number; completion?: number };
export type ChallengePromo = {
  id: string;
  offer: string;
  code?: string;
  terms: string;
  sourceUrl: string;
  checkedOn: string;
  endsOn?: string;
  expiresAt?: string;
  /** Published before/after amounts only (never computed from a headline percentage). */
  examples: { size: number; regular: number; sale: number; currency: 'USD' | 'EUR' | 'GBP' }[];
};

export type ChallengeOffer = {
  key: string;
  slug: string;
  productId: string;
  firm: string;
  logoDomain?: string;
  name: string;
  type: Product['type'];
  status: PropFirm['status'];
  /** Firm reliability score, out of 100. Not a programme rating. */
  reliability: number;
  /** Programme flexibility stars, out of 5; null when fewer than 5 axes are sourced. */
  stars: number | null;
  starsVerified: number;
  sizeMin: number | null;
  sizeMax: number | null;
  markets: ChallengeMarket[];
  steps: ChallengeSteps | null;
  drawdown: ChallengeDrawdown | null;
  /** True when the drawdown type is set on the programme itself, false when read from its max-loss text. */
  drawdownVerified: boolean;
  consistency: boolean;
  consistencyText?: string;
  /** Fastest stated payout rhythm in days (1 = daily or on demand); null when not stated. */
  payoutDays: number | null;
  payoutScope: 'programme' | 'firm' | null;
  split: number | null;
  splitUpTo: boolean;
  target: string;
  dailyLoss: string;
  maxLoss: string;
  platforms: string[];
  /** Verified list prices by account size (price table), sorted by size. */
  prices: ChallengePrice[];
  priceCheckedOn?: string;
  priceSource?: string;
  /** Entry fee from the firm file when no price table exists ("listed", not checked by size). */
  listedFrom: number | null;
  promos: ChallengePromo[];
  offerUrl: string | null;
  affiliate: boolean;
  /** Labels of the contractual points to read before buying (localized), at most three. */
  alerts: string[];
  alertCount: number;
  domainWarning: boolean;
  lastReviewed: string;
};

const RED: ScaleCCode[] = [...SCALE_C_CONTRACT_CODES, 'E_HARSH', 'CONS'];

function markets(product: Product): ChallengeMarket[] {
  const text = `${product.type} ${product.name} ${product.tradableAssets.join(' ')}`.toLowerCase();
  const out = new Set<ChallengeMarket>();
  if (product.type === 'Futures evaluation' || /futures|\bcme\b/.test(text)) out.add('futures');
  if (/forex|\bfx\b|cfd|indices|metal|gold|commodit|energ/.test(text)) out.add('forex');
  if (/crypto|bitcoin|btc|perp/.test(text)) out.add('crypto');
  if (/stock|equit|share|actions/.test(text)) out.add('stocks');
  return [...out];
}

function steps(product: Product): ChallengeSteps | null {
  if (product.type === 'Instant funding') return 0;
  const text = `${product.name} ${product.profitTarget}`.toLowerCase();
  if (/\b(3|three)[- ]?(step|phase|stage)|phase 3|step 3/.test(text)) return 3;
  if (/\b(2|two)[- ]?(step|phase|stage)|phase 2|step 2/.test(text)) return 2;
  if (/\b(1|one)[- ]?(step|phase|stage)|single[- ](evaluation|phase|stage|step)|single-stage|one evaluation/.test(text)) return 1;
  return null;
}

function drawdown(product: Product): { value: ChallengeDrawdown | null; verified: boolean } {
  if (product.drawdownType) return { value: product.drawdownType, verified: true };
  const text = product.maxDrawdown ?? '';
  if (/end.of.day|\bEOD\b/i.test(text)) return { value: 'EOD', verified: false };
  if (/trail/i.test(text)) return { value: 'Trailing', verified: false };
  if (/\bstatic\b|\bfixed\b/i.test(text)) return { value: 'Static', verified: false };
  return { value: null, verified: false };
}

/**
 * Payout rhythms a text states explicitly ("daily", "on demand", "weekly",
 * "every 14 days"...). Processing times ("paid within 2 business days") and
 * first-payout delays are not rhythms and are ignored.
 */
function rhythms(raw: string): number[] {
  const text = raw.toLowerCase();
  const found = new Set<number>();
  if (/\bdaily\b|on.demand|any ?time|day-one payout/.test(text)) found.add(1);
  const noBi = text.replace(/bi-?weekly/g, ' ');
  if (/\bweekly\b|per calendar week|once (a|per) week/.test(noBi)) found.add(7);
  if (/bi-?weekly|every (2|two) weeks|fortnight/.test(text)) found.add(14);
  if (/\bmonthly\b/.test(text)) found.add(30);
  for (const m of text.matchAll(/every (\d{1,2}|seven|fourteen|thirty) (?:completed )?(?:calendar |trading |business )?days|(\d{1,2})-day (?:reward|payout|withdrawal) cycle|(\d{1,2}) days between payout/g)) {
    const word = m[1] ?? m[2] ?? m[3];
    const n = word === 'seven' ? 7 : word === 'fourteen' ? 14 : word === 'thirty' ? 30 : Number(word);
    if (n > 0) found.add(n);
  }
  return [...found].sort((a, b) => a - b);
}

/**
 * Fastest payout rhythm for the programme. The programme's own payout text
 * wins; the firm-level text is used only when it states a single rhythm, and is
 * then flagged as firm-level.
 */
function payout(product: Product, firm: PropFirm): { days: number | null; scope: 'programme' | 'firm' | null } {
  const own = rhythms(product.profitSplit);
  if (own.length) return { days: own[0], scope: 'programme' };
  const firmLevel = rhythms(firm.payoutDelay ?? '');
  if (firmLevel.length === 1) return { days: firmLevel[0], scope: 'firm' };
  return { days: null, scope: null };
}

function split(product: Product): number | null {
  const values = [...product.profitSplit.matchAll(/(\d{2,3})\s?%/g)].map((m) => Number(m[1])).filter((n) => n >= 50 && n <= 100);
  if (values.length) return Math.max(...values);
  return null;
}

function priceRows(programs: PriceProgram[]): ChallengePrice[] {
  return programs
    .flatMap((program) =>
      program.rows.map((row) => ({
        size: row.size,
        price: row.price,
        currency: program.currency,
        billing: program.billing,
        ...(row.upfrontPrice != null ? { upfront: row.upfrontPrice } : {}),
        ...(row.completionFee != null ? { completion: row.completionFee } : {}),
      }))
    )
    .sort((a, b) => a.size - b.size || a.price - b.price);
}

function alerts(firm: PropFirm, locale: Locale): string[] {
  const labels: string[] = [];
  const entry = getScaleC(firm.slug);
  if (entry) {
    const codes = scaleCCopy(locale).codes;
    entry.penalties
      .filter((p) => RED.includes(p.code) && p.text)
      .sort((a, b) => b.points - a.points)
      .forEach((p) => {
        const label = codes[p.code];
        if (label && !labels.includes(label)) labels.push(label);
      });
  }
  if (!labels.length) {
    const audit = getContractAudit(firm.slug);
    const count = (audit?.findings ?? []).filter(
      (x) => (x.group === 'discretion' || x.group === 'contradiction') && x.publish !== false && !x.hidden && x.source.startsWith('https://')
    ).length;
    for (let i = 0; i < Math.min(count, 4); i += 1) labels.push('');
  }
  return labels;
}

/** Card text stays short; the full wording is on the firm page. */
function clip(text: string, n: number) {
  const t = text.replace(/\s+/g, ' ').trim();
  return t.length > n ? `${t.slice(0, n - 1).replace(/\s+\S*$/, '')}…` : t;
}

const CURRENCY: Record<string, 'USD' | 'EUR' | 'GBP'> = { $: 'USD', '€': 'EUR', '£': 'GBP' };

let cache: { locale: Locale; offers: ChallengeOffer[] } | undefined;

export function challengeCatalog(locale: Locale): ChallengeOffer[] {
  if (cache?.locale === locale) return cache.offers;
  const tx = (text: string | undefined) => td(locale, text ?? '');
  const offers = propFirms
    .filter((firm) => firm.status !== 'Fermée')
    .flatMap((firm) => {
      const table = getPriceTable(firm.slug);
      const firmAlerts = alerts(firm, locale);
      const sizesKnown = !isProvisional(firm, 'accountSize');
      return firm.products
        .filter((product) => product.type !== 'Scaling')
        .map((product): ChallengeOffer => {
          const programs = (table?.programs ?? []).filter((program) => program.productId === product.id);
          const prices = priceRows(programs);
          const flex = programmeFlexibility(getProgrammeEvidence(firm.slug, product.id));
          const dd = drawdown(product);
          const pay = payout(product, firm);
          const promos = getProgramPromotions(firm.slug, product.id, new Date(), product.type).map((promo) => ({
            id: promo.id,
            offer: promo.offer,
            ...(promo.code ? { code: promo.code } : {}),
            terms: clip(promo.terms, 320),
            sourceUrl: promo.sourceUrl,
            checkedOn: promo.checkedOn,
            ...(promo.endsOn ? { endsOn: promo.endsOn } : {}),
            ...(promo.expiresAt ? { expiresAt: promo.expiresAt } : {}),
            examples: promo.priceExamples?.length
              ? promo.priceExamples
              : publishedPairs(promo.offer).map((pair) => ({ size: pair.size, regular: pair.regular, sale: pair.sale, currency: CURRENCY[pair.symbol] ?? 'USD' })),
          }));
          const rawUrl = firm.listedDomainWarning ? undefined : firm.partnerOffer?.href || product.linkToStart;
          const knownSizes = sizesKnown && (product.accountSizeMin > 0 || product.accountSizeMax > 0);
          const tableSizes = prices.map((row) => row.size);
          return {
            key: `${firm.slug}:${product.id}`,
            slug: firm.slug,
            productId: product.id,
            firm: firm.name,
            ...(firm.logoDomain ? { logoDomain: firm.logoDomain } : {}),
            name: tx(product.name.startsWith(`${firm.name} `) ? product.name.slice(firm.name.length + 1) : product.name),
            type: product.type,
            status: firm.status,
            reliability: firm.score,
            stars: flex.stars,
            starsVerified: flex.verified,
            sizeMin: tableSizes.length ? tableSizes[0] : knownSizes ? product.accountSizeMin || product.accountSizeMax : null,
            sizeMax: tableSizes.length ? tableSizes[tableSizes.length - 1] : knownSizes ? product.accountSizeMax || product.accountSizeMin : null,
            markets: markets(product),
            steps: steps(product),
            drawdown: dd.value,
            drawdownVerified: dd.verified,
            consistency: product.hasConsistencyRule,
            ...(product.hasConsistencyRule && product.consistencyRule ? { consistencyText: clip(tx(product.consistencyRule), 160) } : {}),
            payoutDays: pay.days,
            payoutScope: pay.scope,
            split: isProvisional(firm, 'profitSplit') ? null : split(product),
            splitUpTo: /up to|jusqu/i.test(product.profitSplit),
            target: clip(tx(product.profitTarget), 90),
            dailyLoss: clip(tx(product.maxDailyLoss), 90),
            maxLoss: clip(tx(product.maxDrawdown), 90),
            platforms: product.platforms.filter((p) => !/not verified/i.test(p)),
            prices,
            ...(prices.length && table ? { priceCheckedOn: table.checkedOn, priceSource: programs[0].sourceUrl } : {}),
            listedFrom: !prices.length && (product.entryFeeMin ?? 0) > 0 ? (product.entryFeeMin as number) : null,
            promos,
            offerUrl: firm.status === 'Fermée' ? null : rawUrl ?? null,
            affiliate: Boolean(firm.partnerOffer?.href) || isAffiliateUrl(rawUrl ?? ''),
            alerts: firmAlerts.filter(Boolean).slice(0, 3),
            alertCount: firmAlerts.length,
            domainWarning: Boolean(firm.listedDomainWarning),
            lastReviewed: firm.lastReviewed,
          };
        });
    });
  cache = { locale, offers };
  return offers;
}
