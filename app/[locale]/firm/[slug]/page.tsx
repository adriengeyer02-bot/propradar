import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { firmMetaOverrides } from '../../../lib/firmMetaOverrides';
import { getFirmChangelog, getFirmUpdate } from '../../../lib/firmUpdates';
import Link from 'next/link';
import FirmSectionNav from '../../../components/ui/FirmSectionNav';
import { notFound } from 'next/navigation';
import FirmLogo from '../../../components/FirmLogo';
import PartnerCodeOffer from '../../../components/PartnerCodeOffer';
import ProgrammeFlexibility from '../../../components/ProgrammeFlexibility';
import FoldBody from '../../../components/firm/FoldBody';
import { challengeExplorerCopy } from '../../../lib/challengeExplorerI18n';
import SourceSubmission from '../../../components/SourceSubmission';
import ClosedFirmNotice, { ClosedFirmArchiveLabel } from '../../../components/ClosedFirmNotice';
import { firmLogoFor } from '../../../lib/firmLogos';
import ChallengePath from '../../../components/ui/ChallengePath';
import EntityChain from '../../../components/ui/EntityChain';
import ReliabilityRadar from '../../../components/ui/ReliabilityRadar';
import RiskPip from '../../../components/ui/RiskPip';
import ScoreRing from '../../../components/ui/ScoreRing';
import ScoreBreakdownDialog, { type ScoreBreakdownView, type ScoreStep } from '../../../components/ui/ScoreBreakdownDialog';
import { getScoreBreakdown } from '../../../lib/scoreBreakdown';
import { scoreV4Copy } from '../../../lib/scoreV4I18n';
import { scoreV5Copy, scoreV5EvidenceCopy, scoreV5LegalCapCopy } from '../../../lib/scoreV5I18n';
import { ruleKind } from '../../../lib/restrictiveRules';
import { scoreMethodCopy } from '../../../lib/scoreMethodI18n';
import { localizeScaleCEvidence } from '../../../lib/dataI18n/scaleCEvidence';
import { localizeScoreEvidence, localizeContractProtection } from '../../../lib/dataI18n/scoreEvidence';
import { scaleCCopy } from '../../../lib/scaleCI18n';
import { SCALE_C_CONTRACT_CODES } from '../../../lib/scaleC';
import ReviewFreshness from '../../../components/ui/ReviewFreshness';
import RevealOnView from '../../../components/ui/RevealOnView';
import { legalTone, payoutTone, reviewTone, scoreTone, statusTone, trustpilotPip, type Tone } from '../../../lib/riskTone';
import {
  FTMO_AFFILIATE_URL,
  GOAT_FUNDED_TRADER_AFFILIATE_URL,
  THE5ERS_AFFILIATE_URL,
  THE5ERS_PROMO_CODE,
  isAffiliateUrl,
  auditStatusClass,
  formatUsd,
  priceLabel,
  linkRel,
  getFirmBySlug,
  manipulationRiskClass,
  payoutRiskClass,
  propFirms,
  regulatoryRiskClass,
  relationshipClass,
  reviewReliabilityClass,
  type PropFirm,
  documentedIncidents,
  drawdownLabel,
  hasPayoutRiskSignal,
  isPayoutRiskAssessed,
  firmGaps,
  isPayoutDelayUnknown,
  isProvisional,
  isReviewRiskAssessed,
  payoutEvidence,
  profitSplitLabel,
} from '../../../lib/propFirms';
import { SITE_NAME, SITE_URL } from '../../../lib/site';
import { getFirmRelatedGuides, getSeoGuideDisplay, getSeoGuidePath } from '../../../lib/seoGuides';
import { guideCardText, localizedGuidePath } from '../../../lib/guideI18n';
import { getManualCommunityReview } from '../../../lib/manualCommunityReviews';
import { getFirmContentLastModified, getFirmSearchProfile } from '../../../lib/firmSearchProfiles';
import { td } from '../../../lib/dataI18n';
import { toEnglishText } from '../../../lib/i18n';
import { editorialBriefs, getEditorialBriefPath } from '../../../lib/editorialBriefs';
import GuideCover from '../../../components/guide-visuals/GuideCover';
import { DEPENDENCY_COVER } from '../../../lib/guideCovers';
import { formatAccountSize, formatListPrice, getPriceTable, pricePreviewRows } from '../../../lib/priceTables';
import { getProgramPromotions } from '../../../lib/programPromotions';
import { getAuditCaseFile } from '../../../lib/auditCaseFiles';
import { entityCountries } from '../../../lib/jurisdictions';
import { getClosureRecord } from '../../../lib/closures';
import { isFirmIndexable } from '../../../lib/firmIndexing';
import { feeStats } from '../../../lib/industryStats';
import { HTML_LANG, OG_LOCALE, countryLabel, isLocale, localeAlternates, localePath, type Locale } from '../../../lib/locales';
import { fmt, formatDateLong, getMessages, numberLocale, tv, type Messages } from '../../../lib/messages';
import IntentLink from '../../../components/IntentLink';
import ContractAuditSection from '../../../components/ContractAuditSection';
import ContractRedFlags from '../../../components/ContractRedFlags';
import { promoSale, publishedPairs } from '../../../lib/promoPricing';
import FirmAtAGlance, { GLANCE_COPY } from '../../../components/FirmAtAGlance';
import { getContractAudit } from '../../../lib/contractAudits';
import { contractAuditCopy } from '../../../lib/contractAuditI18n';

type FirmT = Messages['firm'];

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

async function readParams(params: Props['params']): Promise<{ locale: Locale; slug: string }> {
  const { locale, slug } = await params;
  return { locale: isLocale(locale) ? locale : 'en', slug };
}

const FIRM_LIBRARY_PUBLISHED_AT = '2026-06-29T08:00:00.000Z';

function firmPublishedAt(slug: string) {
  return getFirmChangelog(slug).filter((entry) => entry.fields?.includes('initialReview'))
    .map((entry) => entry.date).sort()[0] ?? FIRM_LIBRARY_PUBLISHED_AT;
}
export const revalidate = 86400;

export function generateStaticParams() {
  return propFirms.map((firm) => ({ slug: firm.slug }));
}

function jsonLd(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, '\\u003c'),
  };
}

function relationshipLabel(relationship: PropFirm['commercialRelationship']) {
  return relationship === 'Aucune' ? 'No affiliate link' : 'Transparent affiliate link';
}

function isClosedFirm(firm: PropFirm) {
  return toEnglishText(firm.status) === 'Closed';
}

function isWatchlistFirm(firm: PropFirm) {
  return toEnglishText(firm.status) === 'Watchlist';
}

function operationalStatusLabel(firm: PropFirm) {
  if (isClosedFirm(firm)) return 'Closed';
  if (isWatchlistFirm(firm)) return 'Watchlist';
  return 'Active';
}

function operationalStatusClass(firm: PropFirm) {
  if (isClosedFirm(firm)) return 'badge-red';
  if (isWatchlistFirm(firm)) return 'badge-amber';
  return 'badge-green';
}

function firmRiskLabel(firm: PropFirm) {
  if (isClosedFirm(firm) || firm.score < 40 || firm.reviewSignals.payoutRisk === 'Critique') return 'Critical';
  if (isWatchlistFirm(firm) || firm.score < 70 || hasPayoutRiskSignal(firm)) return 'Watchlist';
  return 'Reliable';
}

function firmRiskClass(firm: PropFirm) {
  const risk = firmRiskLabel(firm);
  if (risk === 'Reliable') return 'badge-green';
  if (risk === 'Watchlist') return 'badge-amber';
  return 'badge-red';
}

type ScoreProofRow = {
  label: string;
  value: string;
  href?: string;
};

function firmRiskTone(firm: PropFirm): Tone {
  const cls = firmRiskClass(firm);
  return badgeTone(cls);
}

function badgeTone(className: string): Tone {
  if (className.includes('green')) return 'good';
  if (className.includes('red')) return 'risk';
  return 'watch';
}

function decisionTone(label: string): Tone {
  const cls = decisionClass(label);
  if (cls === 'decision-good') return 'good';
  if (cls === 'decision-watch') return 'watch';
  return 'risk';
}

function sourceUrl(firm: PropFirm, match: RegExp) {
  return firm.sources.find((source) => match.test(`${source.label} ${source.url}`))?.url;
}

function hasConcretePayoutIssues(firm: PropFirm) {
  return documentedIncidents(firm).length > 0;
}

function proofValue(row: ScoreProofRow) {
  if (row.href) {
    return (
      <a href={row.href} target="_blank" rel="noreferrer">
        {row.value}
      </a>
    );
  }

  return <strong>{row.value}</strong>;
}

function urlHost(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

// When the listed official domain now serves unrelated content, never send
// visitors there (it can be a casino, a parked page or a compromised site).
function isBlockedFirmUrl(firm: PropFirm, url: string) {
  if (!firm.listedDomainWarning) return false;
  const listedHost = urlHost(firm.sources[0]?.url ?? '');
  return Boolean(listedHost) && urlHost(url) === listedHost;
}

function scoreProofRows(firm: PropFirm, kind: 'trustpilot' | 'payout' | 'manipulation', t: Messages): ScoreProofRow[] {
  const P = t.firm.proof;
  if (kind === 'trustpilot') {
    const trustpilotUrl = firm.reviewSignals.trustpilotSourceUrl ?? sourceUrl(firm, /trustpilot/i);

    return [
      { label: P.rawRating, value: firm.trustpilotRating ? `${firm.trustpilotRating}/5` : P.notFilled },
      { label: P.source, value: trustpilotUrl ? P.listedPage : P.toComplete, href: trustpilotUrl },
      { label: P.status, value: firm.reviewSignals.trustpilotRatingWithheld ? P.withheld : firm.trustpilotRating ? P.read : t.firm.notAssessed },
    ];
  }

  if (kind === 'payout') {
    const payoutUrl = sourceUrl(firm, /payout|fast/i);

    return [
      { label: P.visible, value: firm.payoutProof && payoutUrl ? P.officialPage : firm.payoutProof ? P.tracked : P.insufficient, href: firm.payoutProof ? payoutUrl : undefined },
      { label: P.incidents, value: hasConcretePayoutIssues(firm) ? fmt(P.documented, { n: documentedIncidents(firm).length }) : P.noIncident },
      { label: P.lastCheck, value: firm.reviewSignals.lastSignalCheck },
    ];
  }

  return [
    { label: P.base, value: P.baseValue },
    { label: P.alert, value: firm.reviewSignals.trustpilotRatingWithheld ? P.alertWithheld : typeof firm.reviewSignals.trustpilotFlaggedReviewCount === 'number' ? fmt(P.counted, { n: firm.reviewSignals.trustpilotFlaggedReviewCount }) : P.notCounted },
    { label: P.status, value: tv(t, toEnglishText(firm.reviewSignals.trustpilotReliability)) },
  ];
}

function scoreColor(score: number) {
  if (score >= 80) return '#047857';
  if (score >= 70) return '#12b76a';
  if (score >= 50) return '#d97706';
  return '#dc2626';
}

function scoreRingStyle(score: number) {
  const safeScore = Math.max(0, Math.min(100, score));
  return {
    background: `conic-gradient(${scoreColor(score)} ${safeScore * 3.6}deg, var(--score-ring-track) 0deg)`,
  };
}

function signalToneClass(score: number) {
  if (score >= 75) return 'community-overview-good';
  if (score >= 50) return 'community-overview-watch';
  return 'community-overview-risk';
}

function decisionLabel(firm: PropFirm) {
  if (isClosedFirm(firm) || firm.score < 45 || firm.reviewSignals.payoutRisk === 'Critique') return 'Avoid for now';
  if (
    isWatchlistFirm(firm) ||
    firm.score < 72 ||
    hasPayoutRiskSignal(firm) ||
    firm.regulatoryAudit.riskLevel === 'High' ||
    firm.regulatoryAudit.riskLevel === 'Critical'
  ) {
    return 'Proceed carefully';
  }

  return 'Shortlist candidate';
}

function decisionClass(label: string) {
  if (label === 'Shortlist candidate') return 'decision-good';
  if (label === 'Proceed carefully') return 'decision-watch';
  return 'decision-risk';
}

function decisionDetail(firm: PropFirm, label: string) {
  if (label === 'Shortlist candidate') {
    return 'Strong enough to compare, but still verify the exact program rules and payout steps before checkout.';
  }

  if (label === 'Proceed carefully') {
    return 'Interesting enough to read, but not clean enough to buy from score alone. Recheck rules, payouts and public complaints first.';
  }

  return 'The current signals are too weak or risky for a fresh purchase. Treat the page as due diligence, not a buying recommendation.';
}

function isPartiallyAudited(firm: PropFirm) {
  const auditLabel = toEnglishText(firm.auditStatus).toLowerCase();
  return auditLabel.includes('partial') || auditLabel.includes('partiellement');
}

function legalVerificationLabel(firm: PropFirm) {
  if (firm.legalVerified) return 'Entity mapped';
  if (isPartiallyAudited(firm)) return 'Partial file';
  return 'Not confirmed';
}

function legalVerificationClass(firm: PropFirm) {
  if (firm.legalVerified) return 'badge-green';
  if (isPartiallyAudited(firm)) return 'badge-amber';
  return 'badge-red';
}

function sourceDepthLabel(count: number) {
  if (count >= 5) return 'Deep source stack';
  if (count >= 3) return 'Usable source stack';
  if (count >= 1) return 'Thin source stack';
  return 'No source stack';
}

function sourceDepthClass(count: number) {
  if (count >= 5) return 'badge-green';
  if (count >= 2) return 'badge-amber';
  return 'badge-red';
}

function payoutProofLabel(firm: PropFirm) {
  if (firm.payoutProof && firm.reviewSignals.payoutRiskScore < 40) return 'Tracked signal';
  if (firm.payoutProof) return 'Needs context';
  return 'Insufficient';
}

function payoutProofClass(firm: PropFirm) {
  if (firm.payoutProof && firm.reviewSignals.payoutRiskScore < 40) return 'badge-green';
  if (firm.payoutProof) return 'badge-amber';
  return 'badge-red';
}

const genericProfilePoints = new Set([
  'clear offer',
  'official source available',
  'official sources available',
  'name added to broad coverage',
  'profile needs more detail',
  'payout data and reviews must be rechecked',
  'not a strong recommendation by default',
  'rules may change',
  'data must be rechecked before buying',
  'useful prevention archive',
  'none for a current purchase',
]);

function uniqueProfilePoints(points: string[]) {
  const seen = new Set<string>();

  return points
    .map((point) => toEnglishText(point).trim())
    .filter(Boolean)
    .filter((point) => {
      const normalized = point.toLowerCase().replace(/[.!]+$/, '');
      const isGeneric = genericProfilePoints.has(normalized) ||
        /must be rechecked before buying$/i.test(normalized);

      if (isGeneric || seen.has(normalized)) return false;
      seen.add(normalized);
      return true;
    });
}

/** Default search title: the query people type ("<firm> review", "is <firm> legit"), facts only. */
const MODEL_ANCHOR: Record<string, string> = { Challenge: 'forex', 'Futures evaluation': 'futures', 'Instant funding': 'instant' };

/** Fills the empty column next to a single program with context computed from the other sourced firm files. */
/** Shortest readable version of a payout sentence: the first clause, capitalised. */
function payoutShort(text: string) {
  let short = text.split(';')[0].trim();
  if (short.length > 90 && short.includes(' (')) short = short.slice(0, short.indexOf(' (')).trim();
  return short.charAt(0).toUpperCase() + short.slice(1);
}

function PayoutFact({ text, label = 'Details' }: { text: string; label?: string }) {
  const short = payoutShort(text);
  const full = text.charAt(0).toUpperCase() + text.slice(1);
  if (short === full) return <>{full}</>;
  return (
    <details className="pr-payout-fact">
      <summary>{short}<span className="pr-payout-more">{label}</span></summary>
      <p>{full}</p>
    </details>
  );
}

function ProductContext({ firm, product, f, locale }: { firm: PropFirm; product: PropFirm['products'][number]; f: FirmT; locale: Locale }) {
  const L = (path: string) => localePath(locale, path);
  const programs = (f.models as Record<string, string>)[product.type] ?? f.models.other;
  const stats = feeStats(product.type);
  const fee = product.entryFeeMin ?? 0;
  const comparable = fee > 0 && stats.count >= 3 && !isProvisional(firm, 'accountSize');
  const countries = entityCountries(firm.regulatoryAudit.entities);
  const anchor = MODEL_ANCHOR[product.type];
  return (
    <aside className="card pr-product-context" aria-label={fmt(f.ctxAria, { name: firm.name })}>
      <div className="eyebrow">{f.ctxEyebrow}</div>
      {comparable ? (
        <>
          <p className="pr-product-context-figure">
            <strong>{formatUsd(fee)}</strong>
            <span>{f.ctxFee}</span>
          </p>
          <p>
            {fmt(f.ctxMedian, { count: stats.count, programs, median: formatUsd(stats.median), q1: formatUsd(stats.q1), q3: formatUsd(stats.q3) })}
          </p>
        </>
      ) : (
        <p>{f.ctxNotEnough}</p>
      )}
      <ul className="pr-product-context-links">
        {anchor ? <li><Link href={`${L('/prop-firm-challenge')}#${anchor}`}>{fmt(f.ctxAll, { programs })}</Link></li> : null}
        {countries[0] ? (
          <li><IntentLink href={`${L('/prop-firm-comparison')}?country=${countries[0].code}`}>{fmt(f.ctxCountry, { country: countryLabel(locale, countries[0].code, countries[0].name) })}</IntentLink></li>
        ) : null}
        <li><Link href={`${L('/prop-firm-statistics')}#fees`}>{f.ctxStats}</Link></li>
      </ul>
    </aside>
  );
}

/** What the payout level rests on, in words (never "0 sourced signals"). */
function payoutBasis(firm: PropFirm, f: FirmT) {
  const count = payoutEvidence(firm).length;
  if (count) return count === 1 ? f.basis.signal : fmt(f.basis.signals, { n: count });
  return firm.payoutProof ? f.basis.proof : f.basis.none;
}

function genericFirmTitle(firm: PropFirm, f: FirmT) {
  if (firm.status === 'Fermée') return fmt(f.metaTitleClosed, { name: firm.name });
  const year = (firm.lastReviewed || '').slice(0, 4) || '2026';
  return fmt(f.metaTitle, { name: firm.name, year });
}

/** Default search snippet built only from fields read on a source (provisional values are left out). */
function genericFirmDescription(firm: PropFirm, f: FirmT) {
  if (firm.status === 'Fermée') return fmt(f.metaClosed, { name: firm.name });
  const facts: string[] = [fmt(f.metaScore, { score: firm.score })];
  if (firm.priceFrom > 0) facts.push(fmt(f.metaFrom, { price: firm.priceFrom }));
  if (!isProvisional(firm, 'profitSplit') && firm.profitSplit > 0) facts.push(fmt(f.metaSplit, { split: firm.profitSplit }));
  if (firm.trustpilotRating) facts.push(fmt(f.metaTrustpilot, { rating: firm.trustpilotRating }));
  const countries = entityCountries(firm.regulatoryAudit.entities);
  if (countries.length) {
    const names = countries.map((c) => c.name);
    facts.push(fmt(f.metaEntity, { countries: names.length > 1 ? `${names.slice(0, -1).join(', ')} ${f.and} ${names[names.length - 1]}` : names[0] }));
  }
  const base = fmt(f.metaBase, { name: firm.name, facts: facts.join(', ') });
  const tail = f.metaTail;
  return (base + tail).length <= 160 ? base + tail : base;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await readParams(params);
  const firm = getFirmBySlug(slug);
  const f = getMessages(locale).firm;

  if (!firm) {
    return {
      title: 'Firm not found - PropRadar',
      robots: { index: false, follow: false },
    };
  }

  const searchProfile = getFirmSearchProfile(firm.slug);
  const auditCaseFile = getAuditCaseFile(firm.slug);
  const metaOverride = firmMetaOverrides[firm.slug];
  // Hand-written search titles are English: other languages use the generated, translated ones.
  const english = locale === 'en';
  const title = (english ? metaOverride?.title(firm) ?? searchProfile?.metaTitle : undefined) ?? genericFirmTitle(firm, f);
  const description = (english ? metaOverride?.description(firm) ?? searchProfile?.metaDescription : undefined) ?? genericFirmDescription(firm, f);
  const modifiedTime = new Date(getFirmContentLastModified(
    firm.slug,
    firm.lastReviewed,
    firm.regulatoryAudit.lastChecked,
    auditCaseFile?.lastChecked,
  )).toISOString();

  return {
    title,
    description,
    keywords: [
      `${firm.name} review`,
      `${firm.name} payout`,
      `${firm.name} rules`,
      `${firm.name} prop firm`,
      'prop firm legal audit',
      ...(firm.slug === 'skilled-funded-traders'
        ? ['skilled funded trader', 'skilled funded trader funding', 'skilled funded trader stocks']
        : []),
    ],
    authors: [{ name: 'PropRadar Research', url: '/audit' }],
    creator: 'PropRadar Research',
    publisher: SITE_NAME,
    category: 'Prop firm due diligence',
    alternates: localeAlternates(locale, `/firm/${firm.slug}`),
    ...(isFirmIndexable(firm) ? {} : { robots: { index: false, follow: true } }),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${localePath(locale, `/firm/${firm.slug}`)}`,
      type: 'article',
      locale: OG_LOCALE[locale],
      siteName: SITE_NAME,
      publishedTime: firmPublishedAt(firm.slug),
      modifiedTime,
      authors: [`${SITE_URL}/audit`],
      tags: [firm.name, 'prop firm review', 'payout risk', 'legal audit'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

function glanceShort(text: string): string {
  const first = text.split(/[.;](?:\s|$)/)[0].trim();
  return first.length > 64 ? `${first.slice(0, 63).replace(/\s+\S*$/, '')}…` : first;
}

/** First sentence of the verdict, the rest behind "Read more" (Geyer, 2026-11-26). */
function splitVerdict(text: string): [string, string] {
  if (text.length <= 200) return [text, ''];
  const m = /^([\s\S]{60,}?[.。!?])\s+([\s\S]+)$/.exec(text);
  return m ? [m[1], m[2]] : [text, ''];
}

export default async function FirmPage({ params }: Props) {
  const { locale, slug } = await readParams(params);
  const firm = getFirmBySlug(slug);
  const t = getMessages(locale);
  const priceTable = getPriceTable(slug);
  /** Displayed firm data: English text, then its translation when the data dictionary has one. */
  const tx = (text?: string | null) => td(locale, toEnglishText(text ?? ''));
  const ruleTx = (text: string) => td(locale, text);
  const f = t.firm;
  const x = challengeExplorerCopy(locale);
  const v = (value: string) => tv(t, value);
  const L = (path: string) => localePath(locale, path);
  const lower = (value: string) => (locale === 'de' ? value : value.toLowerCase());

  if (!firm) {
    notFound();
  }


  const isFtmo = firm.slug === 'ftmo';
  const isThe5ers = firm.slug === 'the5ers';
  const isGoatFundedTrader = firm.slug === 'goat-funded-trader';
  const partnerView = (() => {
    const offer = firm.partnerOffer;
    if (!offer) return undefined;
    const po = f.partnerOffer;
    const pct = offer.percent;
    const title = pct
      ? offer.scope === 'selected'
        ? `${fmt(po.titleCode, { code: offer.code ?? '' })} · ${pct}%`
        : fmt(offer.scope === 'first' ? po.titleFirst : offer.scope === 'new' ? po.titleNew : po.titleAll, { pct })
      : offer.code
        ? fmt(po.titleCode, { code: offer.code })
        : fmt(po.titleLink, { name: firm.name });
    const body = offer.code ? (pct ? fmt(po.bodyCode, { code: offer.code, name: firm.name }) : po.bodyCodeNoPct) : po.bodyLink;
    const facts = [
      firm.priceFrom > 0 ? fmt(po.factFrom, { price: formatUsd(firm.priceFrom) }) : '',
      firm.profitSplit > 0 ? fmt(po.factSplit, { split: firm.profitSplit }) : '',
    ].filter(Boolean);
    const fine = [
      offer.code && offer.codeSource === 'firm' ? fmt(po.discFirmCode, { name: firm.name }) : '',
      offer.code && offer.codeSource === 'site' && offer.checkedOn ? fmt(po.discSiteCode, { name: firm.name, date: formatDateLong(locale, offer.checkedOn) }) : '',
      offer.href ? po.discAffiliate : '',
      offer.code ? po.compare : '',
    ].filter(Boolean).join(' ');
    const officialLink = firm.products.find((product) => product.linkToStart)?.linkToStart ?? `https://${firm.logoDomain}/`;
    return {
      eyebrow: po.eyebrow,
      title,
      body,
      code: offer.code,
      facts,
      cta: fmt(pct ? po.ctaDeal : po.ctaOpen, { name: firm.name }),
      href: offer.href ?? officialLink,
      sponsored: Boolean(offer.href),
      fine,
      copy: po.copy,
      copied: po.copied,
      close: po.close,
    };
  })();
  const gaps = firmGaps(firm);
  const closure = firm.status === 'Fermée' ? getClosureRecord(firm.slug) : undefined;
  const searchProfile = getFirmSearchProfile(firm.slug);
  const auditCaseFile = getAuditCaseFile(firm.slug);
  const relatedGuides = getFirmRelatedGuides(firm, 4);
  const editorialMentions = editorialBriefs.flatMap((brief) => brief.sections
    .filter((section) => section.firmSlugs.includes(firm.slug))
    .map((section) => ({ brief, section })))
    .slice(0, 2);
  const manualReview = getManualCommunityReview(firm);
  const regulatoryAudit = firm.regulatoryAudit;
  const pageUrl = `${SITE_URL}${L(`/firm/${firm.slug}`)}`;
  const contentLastModified = getFirmContentLastModified(
    firm.slug,
    firm.lastReviewed,
    regulatoryAudit.lastChecked,
    auditCaseFile?.lastChecked,
  );
  const evidenceSourceUrls = Array.from(new Set([
    ...regulatoryAudit.sources.map((source) => source.url),
    ...firm.sources.map((source) => source.url),
    ...(auditCaseFile?.sources.map((source) => source.url) ?? []),
  ])).filter((url) => !isBlockedFirmUrl(firm, url)).slice(0, 10);
  const firmPublicUrl = firm.listedDomainWarning ? pageUrl : firm.sources[0]?.url ?? pageUrl;
  const firmChangelog = getFirmChangelog(firm.slug);
  const firmRules = getFirmUpdate(firm.slug)?.restrictiveRules ?? [];
  // Rules and constraints (Geyer, 2026-11-20): one closed menu per programme,
  // specific restrictions separated from contractual risks; classic offer
  // mechanics (minimum days, funded drawdown) stay with the offer.
  const classicRules = firmRules.filter((rule) => ruleKind(rule) === 'classic');
  const constraintRules = firmRules.filter((rule) => ruleKind(rule) !== 'classic');
  const auditedPrograms = getFirmUpdate(firm.slug)?.auditedPrograms ?? [];
  const severityRank = (rule: (typeof firmRules)[number]) => (rule.severity === 'blocking' ? 0 : rule.severity === 'major' ? 1 : 2);
  // A rule is firm-wide when it says '*', names every audited programme, or is
  // not classified yet (no programme scope recorded).
  const isFirmWide = (rule: (typeof firmRules)[number]) => !rule.appliesTo?.length
    || rule.appliesTo.includes('*')
    || (auditedPrograms.length > 1 && auditedPrograms.every(({ key }) => rule.appliesTo!.includes(key)));
  const rulesByProgram = (auditedPrograms.length
    ? [
        { key: '*', program: f.rulesUi.all, rules: constraintRules.filter(isFirmWide) },
        ...auditedPrograms.map(({ key, name }) => ({
          key,
          program: ruleTx(name),
          rules: constraintRules.filter((rule) => !isFirmWide(rule) && rule.appliesTo!.includes(key)),
        })),
      ]
    : [...new Set(constraintRules.map((rule) => rule.program))].map((program) => ({
        key: program,
        program: ruleTx(program),
        rules: constraintRules.filter((rule) => rule.program === program),
      })))
    .filter((group) => group.rules.length)
    .map((group) => {
      const sorted = [...group.rules].sort((a, b) => severityRank(a) - severityRank(b));
      return {
        ...group,
        restrictions: sorted.filter((rule) => ruleKind(rule) === 'restriction'),
        risks: sorted.filter((rule) => ruleKind(rule) === 'risk'),
        strong: sorted.some((rule) => rule.severity === 'blocking'),
      };
    });
  const scoreCopy = scoreMethodCopy(locale);
  const breakdown = getScoreBreakdown(firm);
  const scoreSteps: ScoreStep[] = [{ kind: 'editorial', label: scoreCopy.editorial, detail: breakdown.v5 ? scoreV5Copy(locale).method : breakdown.v4 ? scoreV4Copy(locale).method : scoreCopy.editorialDetail, value: breakdown.editorial, delta: 0 }];
  if (!breakdown.v4) {
    const rules = breakdown.rules;
    const applied = Boolean(rules?.applied && rules.penalty);
    scoreSteps.push({
      kind: 'rules',
      label: scoreCopy.rules,
      detail: breakdown.v5 ? scoreV5Copy(locale).restriction : rules
        ? fmt(scoreCopy.rulesDetail, { counted: rules.counted, programs: rules.programs.length, load: rules.rawLoad })
        : breakdown.unclassifiedOnly ? fmt(scoreCopy.rulesUnclassified, { n: breakdown.unclassifiedOnly }) : scoreCopy.rulesNone,
      value: applied ? breakdown.editorial - rules!.penalty : breakdown.editorial,
      delta: applied ? rules!.penalty : 0,
      note: rules && rules.penalty && !applied ? scoreCopy.rulesNotApplied : undefined,
    });
  }
  if (breakdown.trustpilot) scoreSteps.push({
    kind: 'trustpilot',
    label: scoreCopy.trustpilotCap,
    detail: breakdown.trustpilot.included ? scoreCopy.trustpilotIncluded : fmt(scoreCopy.trustpilotCapDetail, { penalty: breakdown.trustpilot.penalty }),
    value: breakdown.trustpilot.before - breakdown.trustpilot.penalty,
    delta: breakdown.trustpilot.penalty,
  });
  if (breakdown.safetyCap) {
    const safety = scoreV5LegalCapCopy(locale, breakdown.safetyCap.cap);
    scoreSteps.push({ kind: 'safety', label: safety.label, detail: safety.detail,
      value: breakdown.safetyCap.cap, delta: breakdown.safetyCap.before - breakdown.safetyCap.cap });
  }
  if (firm.unauditedCap && !breakdown.scaleC) {
    const cc = scaleCCopy(locale);
    scoreSteps.push({ kind: 'unaudited', label: cc.unauditedCap, detail: fmt(cc.unauditedCapDetail, { before: firm.unauditedCap.before }),
      value: firm.unauditedCap.cap, delta: firm.unauditedCap.before - firm.unauditedCap.cap });
  }
  if (breakdown.closedCap) scoreSteps.push({ kind: 'closed', label: scoreCopy.closedCap, detail: fmt(scoreCopy.closedCapDetail, { cap: breakdown.closedCap.cap }), value: breakdown.closedCap.cap, delta: breakdown.closedCap.before - breakdown.closedCap.cap });
  const scoreView: ScoreBreakdownView = {
    name: firm.name,
    score: firm.score,
    pillars: breakdown.v5 ? {
      version: 5,
      values: [breakdown.v5.blocks.A, breakdown.v5.blocks.B, breakdown.v5.blocks.C, breakdown.v5.blocks.D, breakdown.v5.blocks.E],
      maxima: [25, 25, 20, 20, 10],
      copy: scoreV5Copy(locale),
    } : breakdown.v4 ? {
      version: 4,
      values: [breakdown.v4.blocks.A, breakdown.v4.blocks.B, breakdown.v4.blocks.C, breakdown.v4.blocks.D, breakdown.v4.blocks.E],
      maxima: [25, 35, 15, 15, 10],
      copy: scoreV4Copy(locale),
    } : undefined,
    tone: scoreTone(firm.score),
    steps: scoreSteps,
    signals: [
      { label: f.legal, value: v(regulatoryAudit.riskLevel), tone: legalTone(regulatoryAudit.riskLevel) },
      { label: f.payout, value: v(toEnglishText(firm.reviewSignals.payoutRisk)), tone: payoutTone(firm.reviewSignals.payoutRisk) },
      { label: f.trustpilot, value: v(trustpilotPip(firm).value), tone: trustpilotPip(firm).tone },
      { label: scoreCopy.reviewed, value: formatDateLong(locale, firm.lastReviewed), tone: 'none' },
    ],
    programs: breakdown.rules?.programs.map(({ name, load }) => ({ name: tx(name), load })) ?? [],
    heaviest: breakdown.rules?.heaviest.map(({ rule, points }) => {
      const text = ruleTx(rule.rule);
      return {
        text: text.length > 130 ? `${text.slice(0, 127).trimEnd()}…` : text,
        program: ruleTx(rule.program),
        severity: f.rulesSeverity[rule.severity!],
        severityKey: rule.severity!,
        clarity: f.rulesClarity[rule.status === 'conflicting' ? 'vague' : rule.clarity!],
        points: Math.round(points * 10) / 10,
        kind: ruleKind(rule),
      };
    }) ?? [],
    rulesNotes: breakdown.rules?.uncounted ? [fmt(scoreCopy.rulesUncounted, { n: breakdown.rules.uncounted })] : [],
    v5Evidence: breakdown.v5 ? {
      deductions: breakdown.v5.ruleDeductions.map(item => localizeScoreEvidence(locale, item)),
      contractProtection: localizeContractProtection(locale, firm.slug, breakdown.v5.contractProtection),
      checkedOn: breakdown.v5.checkedOn,
      limitedPayoutProof: breakdown.v5.independentPayoutProofLimited,
      copy: scoreV5EvidenceCopy(locale),
    } : undefined,
    scaleC: breakdown.scaleC ? (() => {
      const c = breakdown.scaleC!;
      const cc = scaleCCopy(locale);
      const nf = (n: number) => new Intl.NumberFormat(numberLocale(locale)).format(n);
      const age = c.founded ? Number(c.checkedOn.slice(0, 4)) - c.founded : 0;
      const contractTotal = c.penalties.filter((p) => SCALE_C_CONTRACT_CODES.includes(p.code)).reduce((sum, p) => sum + p.points, 0);
      const lostTotal = Math.max(0, c.ceiling - firm.score);
      const notes = [
        c.contractCap && contractTotal > c.contractCap ? fmt(cc.contractCap, { cap: c.contractCap }) : '',
        c.score !== c.raw && c.score > c.raw ? cc.fallCap : '',
        fmt(c.reading === 'full' ? cc.readingFull : cc.readingExcerpts, { date: formatDateLong(locale, c.checkedOn) }),
        firm.unauditedCap ? fmt(cc.unauditedCapDetail, { before: firm.unauditedCap.before }) : '',
        c.previous !== firm.score ? fmt(cc.previous, { n: c.previous }) : '',
      ].filter(Boolean);
      return {
        ceiling: c.ceiling,
        ceilingLabel: fmt(cc.tiers[c.tier], { age }),
        evidence: c.ceilingEvidence.map((e) => e.kind === 'tracker'
          ? fmt(cc.tracker, { amount: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 0 }).format(e.amountUSD) })
          : e.kind === 'trustpilot' ? fmt(cc.trustpilot, { rating: e.rating, count: nf(e.count) }) : cc.stats),
        items: c.penalties.map((p) => ({
          label: cc.codes[p.code] ?? p.code,
          points: p.points,
          text: p.code === 'TPW' ? cc.tpwText : (p.code === 'TPMID' || p.code === 'TPR') ? fmt(cc.tpmidText, { detail: p.locator }) : localizeScaleCEvidence(locale, firm.slug, p),
          source: p.source || ((p.code === 'TPW' || p.code === 'TPMID' || p.code === 'TPR') ? firm.reviewSignals.trustpilotSourceUrl : undefined),
          locator: (p.code === 'TPMID' || p.code === 'TPR') ? undefined : p.locator,
        })),
        lostTotal,
        notes,
        copy: { ceiling: cc.ceiling, lost: cc.lost, none: cc.none, source: cc.source, method: cc.method },
      };
    })() : undefined,
    pendingNote: breakdown.scaleC || firm.status === 'Fermée' || firm.unauditedCap ? undefined : scaleCCopy(locale).pending,
    methodHref: L('/audit'),
    rulesHref: '#rules',
  };
  const isClosedOrParked = firm.status === 'Fermée'
    || /\b(?:domain.sale|for sale|parked|listed for sale|domain sold|acquired|acquisition)\b/i.test(firm.listedDomainWarning ?? '');
  const firmDecision = decisionLabel(firm);
  const firmDecisionClass = decisionClass(firmDecision);
  const longestFirmNameToken = Math.max(
    ...firm.name.split(/\s+/).map((token) => token.length),
  );
  const firmTitleClass = firm.name.length >= 32 || longestFirmNameToken >= 20
    ? 'firm-title firm-title-xlong'
    : firm.name.length >= 22 || longestFirmNameToken >= 14
      ? 'firm-title firm-title-long'
      : 'firm-title';
  const sourceCount = regulatoryAudit.sources.length || firm.sources.length;
  const specificStrengthPoints = uniqueProfilePoints(firm.strengths);
  const specificRiskPoints = uniqueProfilePoints([
    ...regulatoryAudit.redFlags,
    ...firm.reviewSignals.payoutIssues,
    ...firm.weaknesses,
  ]);
  const evidenceFallbackPoints = [
    fmt(f.fallback.legal, { level: lower(v(regulatoryAudit.riskLevel)), date: regulatoryAudit.lastChecked, count: sourceCount }),
    isPayoutRiskAssessed(firm)
      ? fmt(f.fallback.payout, { level: lower(v(toEnglishText(firm.reviewSignals.payoutRisk))), basis: payoutBasis(firm, f), timing: tx(firm.payoutDelay) })
      : fmt(f.fallback.payoutNone, { timing: tx(firm.payoutDelay) }),
    fmt(f.fallback.rules, {
      drawdown: isProvisional(firm, 'drawdownType') ? f.fallback.drawdownVerify : fmt(f.fallback.drawdown, { type: v(toEnglishText(firm.drawdownType) === 'Hybride' ? 'Hybrid' : tx(firm.drawdownType)) }),
      news: lower(v(toEnglishText(firm.newsTrading))),
      count: firm.products.length,
    }),
  ];
  const topRiskPoints = uniqueProfilePoints([
    ...specificRiskPoints,
    ...evidenceFallbackPoints,
  ]).slice(0, 4);
  // Never show a risk under a "strengths" heading: the list and its title follow the decision.
  const showStrengths = firmDecision === 'Shortlist candidate' && specificStrengthPoints.length > 0;
  const firmSpecificSignals = uniqueProfilePoints([
    ...(showStrengths ? specificStrengthPoints : specificRiskPoints),
    ...evidenceFallbackPoints,
  ]).slice(0, 4);
  const decisionChecklist = [
    firm.sources.length ? f.checklist.sources : f.checklist.noSources,
    hasPayoutRiskSignal(firm) || !isPayoutRiskAssessed(firm) ? f.checklist.payoutProof : f.checklist.payoutCalendar,
    firm.regulatoryAudit.riskLevel === 'High' || firm.regulatoryAudit.riskLevel === 'Critical' ? f.checklist.regulatory : f.checklist.entity,
    f.checklist.match,
  ];
  const reviewOverview = [
    {
      label: f.overview.trustpilot,
      score: firm.reviewSignals.trustpilotReliabilityScore,
      provisional: !firm.trustpilotRating && !firm.reviewSignals.trustpilotRatingWithheld,
      risk: Boolean(firm.reviewSignals.trustpilotRatingWithheld),
      valueLabel: firm.reviewSignals.trustpilotRatingWithheld ? f.withheld : firm.trustpilotRating ? `${firm.trustpilotRating}/5` : undefined,
      detail: firm.reviewSignals.trustpilotRatingWithheld
        ? f.overviewDetail.withheld
        : firm.trustpilotRating
          ? firm.reviewSignals.trustpilotReviewCount
            ? fmt(f.overviewDetail.ratingCount, { rating: firm.trustpilotRating, count: firm.reviewSignals.trustpilotReviewCount.toLocaleString('en-US') })
            : fmt(f.overviewDetail.rating, { rating: firm.trustpilotRating })
          : f.overviewDetail.noRating,
    },
    {
      label: f.overview.authenticity,
      score: Math.max(0, 100 - (firm.reviewSignals.manipulationRiskScore ?? 50)),
      provisional: !isReviewRiskAssessed(firm),
      risk: isReviewRiskAssessed(firm),
      valueLabel: isReviewRiskAssessed(firm) ? f.alert : undefined,
      detail: isReviewRiskAssessed(firm) ? f.overviewDetail.alert : f.overviewDetail.noAlert,
    },
    {
      label: f.overview.payout,
      score: Math.max(0, 100 - firm.reviewSignals.payoutRiskScore),
      provisional: !isPayoutRiskAssessed(firm),
      risk: false,
      valueLabel: undefined as string | undefined,
      detail: isPayoutRiskAssessed(firm) ? payoutBasis(firm, f) : f.overviewDetail.noPayout,
    },
  ];
  const communitySearchLinks = [
    ...manualReview.reddit.sources.slice(0, 2).map((source) => ({ ...source, network: 'Reddit' })),
    ...manualReview.x.sources.slice(0, 2).map((source) => ({ ...source, network: 'X' })),
  ];
  const dueDiligenceChecks = [
    {
      label: f.checks.entity,
      value: f.legalVerification[legalVerificationLabel(firm)],
      detail: firm.legalVerified ? f.checkDetail.entityYes : f.checkDetail.entityNo,
      className: legalVerificationClass(firm),
    },
    {
      label: f.checks.regulatory,
      value: v(regulatoryAudit.riskLevel),
      detail: fmt(f.checkDetail.sources, { count: sourceCount }),
      className: regulatoryRiskClass(regulatoryAudit.riskLevel),
    },
    {
      label: f.checks.payoutProof,
      value: f.payoutProof[payoutProofLabel(firm)],
      detail: isPayoutRiskAssessed(firm)
        ? fmt(f.checkDetail.payout, { level: lower(v(toEnglishText(firm.reviewSignals.payoutRisk))), basis: payoutBasis(firm, f) })
        : f.checkDetail.payoutNone,
      className: payoutProofClass(firm),
    },
    {
      label: f.checks.depth,
      value: f.sourceDepth[sourceDepthLabel(sourceCount)],
      detail: firm.auditSourcesChecked.length
        ? fmt(f.checkDetail.channels, { count: firm.auditSourcesChecked.length })
        : f.checkDetail.channelsNone,
      className: sourceDepthClass(sourceCount),
    },
  ];
  // Risk points are sourced data (English); other languages use the translated default answer.
  const faqTopChecks = topRiskPoints.length && locale === 'en' ? topRiskPoints.slice(0, 2).join(' ') : f.faq.checkDefault;
  const firmFaq = [
    ...(locale === 'en' ? searchProfile?.faq ?? [] : []),
    {
      question: fmt(f.faq.safeQ, { name: firm.name }),
      answer: fmt(f.faq.safeA, { name: firm.name, decision: f.decision[firmDecision], score: firm.score, risk: lower(f.risk[firmRiskLabel(firm)]) }),
    },
    {
      question: fmt(f.faq.legalQ, { name: firm.name }),
      answer: fmt(f.faq.legalA, { status: f.legalVerification[legalVerificationLabel(firm)], level: v(regulatoryAudit.riskLevel), count: sourceCount, date: regulatoryAudit.lastChecked }),
    },
    {
      question: fmt(f.faq.payoutQ, { name: firm.name }),
      answer: isPayoutRiskAssessed(firm)
        ? fmt(f.faq.payoutA, { level: lower(v(toEnglishText(firm.reviewSignals.payoutRisk))), basis: payoutBasis(firm, f), proof: lower(f.payoutProof[payoutProofLabel(firm)]) })
        : fmt(f.faq.payoutNoneA, { name: firm.name }),
    },
    {
      question: fmt(f.faq.checkQ, { name: firm.name }),
      answer: faqTopChecks,
    },
    {
      question: fmt(f.faq.affiliateQ, { name: firm.name }),
      answer: fmt(f.faq.affiliateA, { status: firm.commercialRelationship === 'Aucune' ? f.faq.noAffiliate : f.faq.affiliate }),
    },
  ];
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: searchProfile?.heading ?? `${firm.name} PropRadar review`,
    description: searchProfile?.summary ?? tx(firm.verdict),
    datePublished: firmPublishedAt(firm.slug),
    dateModified: contentLastModified,
    image: `${SITE_URL}/firm/${firm.slug}/opengraph-image`,
    inLanguage: HTML_LANG[locale],
    mainEntityOfPage: pageUrl,
    citation: evidenceSourceUrls,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      '@type': 'Organization',
      name: firm.name,
      url: firmPublicUrl,
    },
  };
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Organization',
      name: firm.name,
      url: firmPublicUrl,
    },
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    datePublished: firmPublishedAt(firm.slug),
    dateModified: contentLastModified,
    reviewBody: tx(firm.verdict),
    inLanguage: HTML_LANG[locale],
    citation: evidenceSourceUrls,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: firm.score,
      bestRating: 100,
      worstRating: 0,
    },
  };
  const primaryProduct = firm.products[0];
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: primaryProduct ? `${firm.name} - ${primaryProduct.name}` : `${firm.name} prop firm program`,
    description: tx(primaryProduct?.description ?? firm.verdict),
    category: `${firm.styles.map((style) => tx(style)).join(', ')} prop firm program`,
    brand: {
      '@type': 'Brand',
      name: firm.name,
    },
    url: pageUrl,
    offers: firm.priceFrom > 0 && !isClosedFirm(firm) && !isWatchlistFirm(firm) ? {
      '@type': 'Offer',
      url: primaryProduct?.linkToStart ?? pageUrl,
      priceCurrency: 'USD',
      price: firm.priceFrom,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: firm.name,
      },
    } : undefined,
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: f.breadcrumbHome,
        item: `${SITE_URL}${L('/')}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: f.breadcrumbComparator,
        item: `${SITE_URL}${L('/prop-firm-comparison')}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: firm.name,
        item: pageUrl,
      },
    ],
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: firmFaq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <main>
      {isClosedOrParked ? <ClosedFirmNotice slug={firm.slug} name={firm.name} locale={locale} /> : null}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(reviewSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(productSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />

      <section className="container detail-header firm-profile-header">
        <IntentLink href={L('/prop-firm-comparison')} className="firm-back-link">
          <span aria-hidden="true">&larr;</span>
          {f.allFirms}
        </IntentLink>

        <div className="pr-firm-hero">
          <div className="pr-firm-identity">
            <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="lg" />
            <div>
              <div className="eyebrow">{tx(firm.headquarters)}{firm.founded > 0 ? ` · ${fmt(f.founded, { year: firm.founded })}` : ''}</div>
              <h1 className={firmTitleClass}>{firm.name}</h1>
              <div className="pr-firm-tags">
                <span className={`pr-tag pr-tone-${statusTone(firm.status)}`}>{v(operationalStatusLabel(firm))}</span>
                {firmRiskLabel(firm) !== operationalStatusLabel(firm) ? (
                  <span className={`pr-tag pr-tone-${firmRiskTone(firm)}`}>{f.risk[firmRiskLabel(firm)]}</span>
                ) : null}
                {firm.commercialRelationship === 'Affiliation transparente' ? (
                  <span className="pr-tag pr-tag-affiliate" title={f.affiliateTitle}>{f.affiliateDisclosed}</span>
                ) : null}
              </div>
            </div>
          </div>

          {firm.listedDomainWarning ? (
            <p className="firm-domain-warning pr-firm-verdict" role="note">
              <strong>{f.domainWarning}</strong> {tx(firm.listedDomainWarning)}
            </p>
          ) : (
            (() => {
              const [lead, rest] = splitVerdict(tx(firm.verdict));
              return (
                <div className="pr-firm-verdict">
                  <p>{lead}</p>
                  {rest ? (
                    <details className="pr-verdict-more">
                      <summary>{(GLANCE_COPY[locale] ?? GLANCE_COPY.en).readMore}</summary>
                      <p>{rest}</p>
                    </details>
                  ) : null}
                </div>
              );
            })()
          )}

          <aside className="pr-firm-scorecard" aria-label={fmt(f.scoreAria, { name: firm.name })}>
            <ScoreBreakdownDialog view={scoreView} copy={scoreCopy}>
              <ScoreRing score={firm.score} size="lg" animate />
            </ScoreBreakdownDialog>
            <div className="pr-firm-scorecard-body">
              <span className="pr-firm-scorecard-label">{f.propradarScore}</span>
              {isClosedOrParked ? <ClosedFirmArchiveLabel locale={locale} /> : null}
              <strong className={`pr-firm-decision pr-tone-${decisionTone(firmDecision)}`}>{f.decision[firmDecision]}</strong>
              {firm.rulesPenalty ? <p className="pr-score-cap"><a href="#rules">{fmt(f.rulesPenaltyNote, { penalty: firm.rulesPenalty.penalty, before: firm.rulesPenalty.before })}</a></p> : null}
              {firm.trustpilotPenalty?.penalty ? <p className="pr-score-cap">{fmt(scoreCopy.trustpilotNote, { penalty: firm.trustpilotPenalty.penalty, before: firm.trustpilotPenalty.before })}</p> : null}
              <div className="pr-scorecard-pips">
                <RiskPip label={f.payout} value={v(toEnglishText(firm.reviewSignals.payoutRisk))} tone={payoutTone(firm.reviewSignals.payoutRisk)} />
                <RiskPip label={f.legal} value={v(regulatoryAudit.riskLevel)} tone={legalTone(regulatoryAudit.riskLevel)} />
                <RiskPip label={f.trustpilot} value={v(trustpilotPip(firm).value)} tone={trustpilotPip(firm).tone} />
              </div>
              <div className="pr-firm-actions">
                <IntentLink href={L('/prop-firm-comparison')} className="btn">{f.compare}</IntentLink>
                <Link href={`${L('/')}#radar-weekly`} className="pr-link">{f.setAlert}</Link>
              </div>
            </div>
          </aside>
        </div>

        {/* "At a glance" card (Geyer, 2026-11-26): replaces the key-facts grid. */}
        <FirmAtAGlance
          slug={firm.slug}
          locale={locale}
          products={firm.products}
          facts={[
            { label: f.facts.from, value: v(priceLabel(firm)) },
            { label: f.facts.split, value: v(profitSplitLabel(firm)) },
            ...(isPayoutDelayUnknown(firm) ? [] : [{ label: f.facts.payout, value: glanceShort(tx(firm.payoutDelay)) }]),
            { label: f.facts.drawdown, value: v(drawdownLabel(firm, toEnglishText)) },
          ]}
        />

        {locale !== 'en' ? <p className="pr-fineprint pr-data-note">{f.dataNote}</p> : null}

        {closure ? (
          <aside className="pr-gaps pr-closure" aria-labelledby={`closure-${firm.slug}`}>
            <div>
              <h2 id={`closure-${firm.slug}`}>
                {f.closed}{closure.date ? <> · <time dateTime={closure.date}>{closure.date}</time>{closure.dateKind === 'reported' ? ` ${f.reported}` : ''}</> : null}
              </h2>
              <p>{closure.summary}</p>
            </div>
            <a className="pr-link" href={closure.source.url} target="_blank" rel="noreferrer">
              {fmt(f.source, { label: closure.source.label })}
            </a>
            <Link className="pr-link" href={`${L('/prop-firm-statistics')}#closures`}>{f.allClosures}</Link>
          </aside>
        ) : null}

        {gaps.length ? (
          <aside className="pr-gaps" aria-labelledby={`gaps-${firm.slug}`}>
            <div>
              <h2 id={`gaps-${firm.slug}`}>{f.gapsTitle}</h2>
              <p>{fmt(f.gapsText, { name: firm.name })}</p>
            </div>
            <ul>
              {gaps.map((gap) => <li key={gap}>{(f.gaps as Record<string, string>)[gap] ?? gap}</li>)}
            </ul>
            <SourceSubmission firm={firm.name} slug={firm.slug} copy={f} />
          </aside>
        ) : null}

        <FirmSectionNav
          label={f.navLabel}
          items={[
            ...(firm.products.length ? [{ id: 'produits', label: f.nav.offers }] : []),
            { id: 'rules', label: f.rulesUi.nav },
            ...(getContractAudit(firm.slug) ? [{ id: 'contract-audit', label: contractAuditCopy(locale).nav }] : []),
            { id: 'decision', label: f.nav.decision },
            ...(auditCaseFile ? [{ id: 'case-timeline', label: f.nav.timeline }] : []),
            { id: 'regulatory', label: f.nav.legal },
            { id: 'audit', label: f.nav.reviews },
            { id: 'guides', label: f.nav.guides },
            { id: 'faq', label: f.nav.faq },
            { id: 'sources', label: f.nav.sources },
          ]}
        />
      </section>

      <ContractRedFlags slug={firm.slug} locale={locale} />

      <section className="container pr-section pr-offers" id="produits" aria-labelledby={`offers-${firm.slug}`}>
        <header className="pr-section-head">
          <div>
            <div className="eyebrow">{f.offersEyebrow}</div>
            <h2 id={`offers-${firm.slug}`}>{fmt(f.offersTitle, { name: firm.name })}</h2>
          </div>
          <div className="pr-section-meta">
            <span>{firm.products.length === 1 ? f.programOne : fmt(f.programs, { n: firm.products.length })}</span>
          </div>
        </header>
        {firm.products.length > 0 ? (
          <div className={firm.products.length >= 3 ? 'grid-2 pr-offers-grid-3' : 'grid-2'}>
            {firm.products.map((product) => (
              <article className="card product-card pr-product pr-product-compact" key={product.id}>
                <div className="pr-product-tags">
                  <span className="pr-tag">{v(product.type)}</span>
                  {product.isPopular ? <span className="pr-tag">{f.popular}</span> : null}
                </div>
                <h3>{tx(product.name)}</h3>
                {firm.status !== 'Fermée' ? <ProgrammeFlexibility locale={locale} slug={firm.slug} productId={product.id} /> : null}
                {(() => {
                  const rows = (priceTable?.programs ?? []).filter((program) => program.productId === product.id).flatMap((program) => program.rows.map((row) => ({ price: row.price, size: row.size, currency: program.currency })));
                  const cheapest = rows.length ? rows.reduce((low, row) => (row.price < low.price ? row : low)) : undefined;
                  const from = cheapest ? formatListPrice(cheapest.price, cheapest.currency) : product.entryFeeMin ? formatUsd(product.entryFeeMin) : '—';
                  const split = /(\d{2,3})\s?%/.exec(product.profitSplit ?? '')?.[1];
                  const ddText = `${product.drawdownType ?? ''} ${product.maxDrawdown ?? ''}`;
                  const dd = product.drawdownType ?? (/end.of.day|\bEOD\b|fin de journée/i.test(ddText) ? 'EOD' : /trail|suiveur/i.test(ddText) ? 'Trailing' : /static|fixed|fixe|statique/i.test(ddText) ? 'Static' : undefined);
                  const promos = firm.status !== 'Fermée' ? getProgramPromotions(firm.slug, product.id) : [];
                  const offerHref = firm.partnerOffer?.href || product.linkToStart;
                  // Sale "from" price: published amount, or list price minus the advertised percentage (flagged as computed).
                  const fromSale = cheapest ? promos.map((promo) => promoSale(promo.offer, cheapest.size, cheapest.price)).filter((x): x is NonNullable<typeof x> => Boolean(x)).sort((x, y) => x.sale - y.sale)[0] : undefined;
                  const anyComputed = Boolean(cheapest) && promos.some((promo) => promoSale(promo.offer, cheapest!.size, cheapest!.price)?.computed);
                  return (
                    <>
                      <dl className="pr-offer-key">
                        <div><dt>{f.facts.from}</dt><dd>{fromSale && cheapest ? <><s>{from}</s> <span className="pr-offer-key-sale">{formatListPrice(fromSale.sale, cheapest.currency)}{fromSale.computed ? '*' : ''}</span></> : from}</dd></div>
                        <div><dt>{f.facts.split}</dt><dd>{split ? `${split}%` : '—'}</dd></div>
                        <div><dt>{f.facts.drawdown}</dt><dd>{dd ? v(dd) : '—'}</dd></div>
                      </dl>
                      {promos.map((promo) => {
                        // Published before/after amounts only ("100K · €432 / €540"); a headline percentage is never turned into a price.
                        const pair = publishedPairs(promo.offer)[0];
                        const shown = !pair && cheapest ? promoSale(promo.offer, cheapest.size, cheapest.price) : undefined;
                        const pct = shown ? String(shown.pct) : pair ? String(Math.round((1 - pair.sale / pair.regular) * 100)) : /(\d{1,2})\s?%/.exec(promo.offer)?.[1];
                        const extra = pair ? '' : promo.offer;
                        return (
                          <div className="pr-offer-now" key={promo.id}>
                            <div className="pr-offer-now-line">
                              {pct ? <span className="pr-offer-badge">−{pct}%</span> : null}
                              <span className="pr-offer-now-label">{f.promoNow}</span>
                              {pair ? (
                                <span className="pr-offer-now-price"><span>{formatAccountSize(pair.size)}</span> <s>{pair.symbol}{pair.regular.toLocaleString('en-US')}</s> <strong>{pair.symbol}{pair.sale.toLocaleString('en-US')}</strong></span>
                              ) : shown && cheapest ? (
                                <span className="pr-offer-now-price"><span>{formatAccountSize(cheapest.size)}</span> <s>{formatListPrice(cheapest.price, cheapest.currency)}</s> <strong>{formatListPrice(shown.sale, cheapest.currency)}*</strong></span>
                              ) : null}
                              {!pair && extra ? <span className="pr-offer-now-extra">{extra}</span> : null}
                            </div>
                            <div className="pr-offer-now-line">
                              {promo.code ? <span className="pr-offer-code">{f.pricePromoCode} <code>{promo.code}</code></span> : offerHref ? (
                                <a className="pr-offer-direct" href={offerHref} target="_blank" rel={firm.partnerOffer?.href || isAffiliateUrl(offerHref) ? 'noreferrer sponsored' : 'noreferrer'}>{f.promoDirectLink} ↗</a>
                              ) : null}
                              <details className="pr-offer-terms">
                                <summary>{f.pricePromoTermsLabel}</summary>
                                <p lang="en">{promo.terms}</p>
                                <p>{f.pricePromoCheckout}</p>
                                <small>{f.checkedLabel} · {formatDateLong(locale, promo.checkedOn)}{promo.endsOn ? ` · ${f.pricePromoExpires} ${formatDateLong(locale, promo.endsOn)}` : ''} · <a href={promo.sourceUrl} target="_blank" rel="noopener noreferrer">{f.historySource} ↗</a></small>
                              </details>
                            </div>
                          </div>
                        );
                      })}
                      {anyComputed ? <p className="pr-offer-computed">{f.promoComputed}</p> : null}
                    </>
                  );
                })()}
                <details className="pr-product-details">
                  <summary>{f.programDetails}</summary>
                  <div className="pr-product-details-content">
                  <dl className="pr-product-highlights">
                    <div><dt>{f.path.pass}</dt><dd>{tx(product.profitTarget)}</dd></div>
                    <div><dt>{f.path.stay}</dt><dd>{tx(product.maxDrawdown)}</dd></div>
                    <div><dt>{f.path.paid}</dt><dd>{tx(product.profitSplit)}</dd></div>
                  </dl>
                  {product.hasConsistencyRule ? (
                    <p className="pr-product-rule pr-tone-watch">
                      <span className="pr-pip-dot" aria-hidden="true" />
                      {tx(product.consistencyRule ?? 'Règle de cohérence à vérifier')}
                    </p>
                  ) : (
                    <p className="pr-product-rule pr-tone-good">
                      <span className="pr-pip-dot" aria-hidden="true" />
                      {f.noConsistency}
                    </p>
                  )}
                    {product.description ? <p className="muted pr-product-intro">{tx(product.description)}</p> : null}
                    <ChallengePath product={product} labels={f.path} translate={(text) => td(locale, text)} />
                    <dl className="pr-product-meta">
                      <div>
                        <dt>{f.gaps['Drawdown type']}</dt>
                        <dd>
                          <strong>{product.drawdownType ? tx(product.drawdownType) : f.rulesEmptyTag}</strong>
                          {product.drawdownDetails ? <span className="pr-product-dd-detail">{tx(product.drawdownDetails)}</span> : null}
                          {product.drawdownSource ? <a className="pr-product-dd-source" href={product.drawdownSource} target="_blank" rel="noopener noreferrer">{f.historySource} ↗</a> : null}
                        </dd>
                      </div>
                      <div><dt>{f.platforms}</dt><dd>{product.platforms.map((platform) => tx(platform)).join(' · ')}</dd></div>
                      <div><dt>{f.assets}</dt><dd>{product.tradableAssets.map((asset) => tx(asset)).join(' · ')}</dd></div>
                    </dl>
                    {product.hasConsistencyRule ? <p className="pr-product-rule pr-tone-watch">{tx(product.consistencyRule ?? 'Règle de cohérence à vérifier')}</p> : null}
                  </div>
                </details>
                {firm.status !== 'Fermée' ? (() => {
                  const programs = priceTable?.programs.filter((program) => program.productId === product.id) ?? [];
                  if (!programs.length) return null;
                  const highlighted = getProgramPromotions(firm.slug, product.id).flatMap((promo) => promo.highlightedSizes ?? []);
                  const sizes = [...new Set(programs.flatMap((program) => pricePreviewRows(program, highlighted).map((row) => row.size)))].sort((x, y) => x - y).slice(0, 4);
                  const variantLabel = (name: string) => (name.includes(' — ') ? name.slice(name.indexOf(' — ') + 3) : name);
                  const monthly = programs.some((program) => program.billing === 'monthly');
                  return (
                    <details className="pr-product-details pr-price-dropdown">
                      <summary>{f.priceTableTitle}</summary>
                    <div className="pr-price-matrix">
                      <table>
                        <thead>
                          <tr>
                            <th scope="col">{f.priceList}{monthly ? ` ${f.perMonth}` : ''}</th>
                            {sizes.map((size) => <th scope="col" key={size}>{formatAccountSize(size)}</th>)}
                          </tr>
                        </thead>
                        <tbody>
                          {programs.map((program) => (
                            <tr key={program.name}>
                              <th scope="row">{programs.length > 1 ? tx(variantLabel(program.name)) : tx(program.name)}</th>
                              {sizes.map((size) => {
                                const row = program.rows.find((item) => item.size === size);
                                return (
                                  <td key={size}>
                                    {row ? formatListPrice(row.price, program.currency) : '—'}
                                    {row && row.upfrontPrice != null && row.completionFee != null ? <small>{formatListPrice(row.upfrontPrice, program.currency)} + {formatListPrice(row.completionFee, program.currency)}*</small> : null}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="pr-product-prices-links">
                        <a href={programs[0].sourceUrl} target="_blank" rel="noopener noreferrer">{f.priceSource} ↗</a>
                      </div>
                    </div>
                    </details>
                  );
                })() : null}
                {firm.status !== 'Fermée' && (firm.partnerOffer?.href || product.linkToStart) ? (
                  <a
                    href={firm.partnerOffer?.href || product.linkToStart}
                    target="_blank"
                    rel={firm.partnerOffer?.href || isAffiliateUrl(product.linkToStart ?? '') ? 'noreferrer sponsored' : 'noreferrer'}
                    className="btn btn-primary"
                  >
                    {firm.partnerOffer?.href || isAffiliateUrl(product.linkToStart ?? '') ? f.openAffiliate : f.openOfficial}
                  </a>
                ) : null}
                {firm.status !== 'Fermée' && firm.partnerOffer?.href ? <small className="pr-program-affiliate-note">{f.partnerOffer.discAffiliate}</small> : null}
                {firm.status !== 'Fermée' && product.type !== 'Scaling' ? (
                  <Link className="pr-link pr-program-compare" href={`${L('/prop-firm-challenge')}?${new URLSearchParams({ compare: `${firm.slug}:${product.id}` }).toString()}#explorer`}>
                    {x.compareLink} <span aria-hidden="true">→</span>
                  </Link>
                ) : null}
              </article>
            ))}
            {firm.products.length === 1 && firm.status !== 'Fermée' ? <ProductContext firm={firm} product={firm.products[0]} f={f} locale={locale} /> : null}
          </div>
        ) : (
          <div className="panel">
            <h3>{f.noProductTitle}</h3>
            <p className="muted" style={{ marginBottom: 0 }}>{f.noProductText}</p>
          </div>
        )}
        {priceTable && firm.status !== 'Fermée' ? (
          <details className="pr-price-tables pr-price-tables-dropdown" id="prices">
            <summary><h3>{f.priceTableTitle}</h3></summary>
            <p className="muted">{fmt(f.priceTableLead, { name: firm.name, date: formatDateLong(locale, priceTable.checkedOn) })}</p>
            {(() => {
              const sizes = [...new Set(priceTable.programs.flatMap((program) => program.rows.map((row) => row.size)))].sort((x, y) => x - y);
              const noted = priceTable.programs.filter((program) => program.note);
              return (
                <>
                  <div className="pr-price-all">
                    <table>
                      <thead>
                        <tr>
                          <th scope="col">{f.priceList}</th>
                          {sizes.map((size) => <th scope="col" key={size}>{formatAccountSize(size)}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {priceTable.programs.map((program) => (
                          <tr key={program.name}>
                            <th scope="row">
                              <a href={program.sourceUrl} target="_blank" rel="noopener noreferrer">{tx(program.name)}</a>
                              <small>{program.billing === 'monthly' ? f.perMonth : f.oneTime}</small>
                            </th>
                            {sizes.map((size) => {
                              const row = program.rows.find((item) => item.size === size);
                              return (
                                <td key={size}>
                                  {row ? formatListPrice(row.price, program.currency) : '—'}
                                  {row && row.upfrontPrice != null && row.completionFee != null ? <small>{formatListPrice(row.upfrontPrice, program.currency)} + {formatListPrice(row.completionFee, program.currency)}*</small> : null}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {noted.length ? (
                    <ul className="pr-price-notes" lang="en">
                      {noted.map((program) => <li key={program.name}><strong>{program.name}</strong> {program.note}</li>)}
                    </ul>
                  ) : null}
                </>
              );
            })()}
          </details>
        ) : null}
        {classicRules.length ? (
          <div className="pr-classic-rules">
            <details className="pr-rules-menu">
              <summary><span className="pr-rules-menu-name">{f.rulesUi.classicTitle}</span><span className="pr-rules-menu-counts"><b>{classicRules.length}</b></span></summary>
              <div className="pr-rules-menu-body">
                <p className="pr-rules-block-hint">{f.rulesUi.classicNote}</p>
                <ul className="pr-rules-list">
                  {classicRules.map((rule, index) => (
                    <li key={`${rule.source}-${index}`}>
                      <span className="pr-rules-stage">{ruleTx(rule.program)}</span>
                      <p>{ruleTx(rule.rule)}</p>
                      <a href={rule.source} target="_blank" rel="noopener noreferrer">{f.historySource} ↗ <span>{sourceDomain(rule.source)}</span></a>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          </div>
        ) : null}
      </section>

      <section className="container pr-section pr-restrictive-rules" id="rules" aria-labelledby={`rules-${firm.slug}`}>
        <header className="pr-section-head">
          <div>
            <div className="eyebrow">{f.checkedLabel} · {firmRules.length ? <time dateTime={getFirmUpdate(firm.slug)?.reviewedAt}>{getFirmUpdate(firm.slug)?.reviewedAt}</time> : f.rulesEmptyTag}</div>
            <h2 id={`rules-${firm.slug}`}>{f.rulesUi.title}</h2>
          </div>
          {constraintRules.length ? (
            <div className="pr-section-meta">
              <span>{f.rulesUi.restrictionsShort} <b>{constraintRules.filter((rule) => ruleKind(rule) === 'restriction').length}</b></span>
              <span>{f.rulesUi.risksShort} <b>{constraintRules.filter((rule) => ruleKind(rule) === 'risk').length}</b></span>
            </div>
          ) : null}
        </header>
        <p className="pr-section-lead">{f.rulesUi.intro}</p>
        {rulesByProgram.length ? (
          <div className="pr-rules-menus">
            {rulesByProgram.map((group) => (
              <details className="pr-rules-menu" key={group.key}>
                <summary>
                  <span className="pr-rules-menu-name">{group.program}</span>
                  <span className="pr-rules-menu-counts">
                    {group.restrictions.length ? <span>{f.rulesUi.restrictionsShort} <b>{group.restrictions.length}</b></span> : null}
                    {group.risks.length ? <span className="pr-rules-menu-risk">{f.rulesUi.risksShort} <b>{group.risks.length}</b></span> : null}
                    {group.strong ? <span className="pr-rules-strong-dot" title={f.rulesUi.strong} aria-label={f.rulesUi.strong} /> : null}
                  </span>
                </summary>
                <div className="pr-rules-menu-body">
                  {([['restriction', group.restrictions, f.rulesUi.restrictions, f.rulesUi.restrictionsHint], ['risk', group.risks, f.rulesUi.risks, f.rulesUi.risksHint]] as const).map(([kind, list, title, hint]) => list.length ? (
                    <div className={`pr-rules-block pr-rules-block-${kind}`} key={kind}>
                      <h3>{title}</h3>
                      <p className="pr-rules-block-hint">{hint}</p>
                      <ul className="pr-rules-list">
                        {list.map((rule, index) => (
                          <li key={`${rule.source}-${index}`} className={rule.status === 'conflicting' ? 'pr-rules-conflict' : ''}>
                            <span className="pr-rules-stage">{ruleTx(rule.program)}</span>
                            <p>
                              {rule.severity === 'blocking' ? <span className="pr-rules-strong" title={f.rulesUi.strong}><span className="pr-rules-strong-dot" aria-hidden="true" />{f.rulesUi.strong}</span> : null}
                              {ruleTx(rule.rule)}
                            </p>
                            <p className="pr-rules-impact"><strong>{f.rulesImpact}:</strong> {ruleTx(rule.impact)}</p>
                            {rule.status === 'conflicting' ? <span className="pr-tag pr-tone-watch">{f.rulesConflict}</span> : null}
                            <a href={rule.source} target="_blank" rel="noopener noreferrer">{f.historySource} ↗ <span>{sourceDomain(rule.source)}</span></a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null)}
                </div>
              </details>
            ))}
          </div>
        ) : (
          <div className="pr-rules-empty" role="note">{f.rulesEmpty}</div>
        )}
      </section>

      <ContractAuditSection slug={firm.slug} firmName={firm.name} locale={locale} />

      <section className="container pr-section pr-decision" id="decision" aria-label={fmt(f.decisionAria, { name: firm.name })}>

        {searchProfile && locale === 'en' ? (
          <article className="firm-search-answer" aria-labelledby={`search-answer-${firm.slug}`}>
            <div className="firm-search-answer-copy">
              <div className="firm-search-answer-heading">
                <div>
                  <div className="eyebrow">{searchProfile.eyebrow}</div>
                  <h2 id={`search-answer-${firm.slug}`}>{searchProfile.heading}</h2>
                </div>
                <span className={`badge ${firmRiskClass(firm)}`}>{fmt(f.riskSuffix, { label: f.risk[firmRiskLabel(firm)] })}</span>
              </div>
              <p>{searchProfile.summary}</p>
            </div>
            <ul className="firm-search-answer-facts">
              {searchProfile.facts.map((fact) => <li key={fact}>{fact}</li>)}
            </ul>
            <nav className="firm-search-answer-links" aria-label={`${firm.name} related research`}>
              {searchProfile.links.map((link) => (
                <Link href={link.href} key={`${link.href}-${link.label}`}>{link.label}</Link>
              ))}
            </nav>
          </article>
        ) : null}

        {auditCaseFile ? (
          <section className="firm-case-file" id="case-timeline" aria-labelledby={`case-timeline-${firm.slug}`}>
            <div className="firm-case-file-heading">
              <div>
                <div className="eyebrow">{f.caseEyebrow}</div>
                <h2 id={`case-timeline-${firm.slug}`}>{auditCaseFile.question}</h2>
                <p>{auditCaseFile.answer}</p>
              </div>
              <div className="firm-case-file-status">
                <span>{auditCaseFile.status}</span>
                <time dateTime={auditCaseFile.lastChecked}>{fmt(f.checked, { date: auditCaseFile.lastChecked })}</time>
              </div>
            </div>

            <figure className="firm-case-file-visual">
              <GuideCover data={DEPENDENCY_COVER} className="brief-cover" labels={t.cover} />
              <figcaption>
                {f.caseCaption}
              </figcaption>
            </figure>

            <ol className="firm-case-timeline">
              {auditCaseFile.events.map((event) => (
                <li key={`${event.date}-${event.label}`}>
                  <time dateTime={event.date}>{event.date}</time>
                  <div>
                    <strong>{event.label}</strong>
                    <p>{event.detail}</p>
                    <a href={event.sourceUrl} target="_blank" rel="noopener noreferrer">{f.openDatedSource}</a>
                  </div>
                </li>
              ))}
            </ol>

            <div className="firm-case-open-points">
              <div>
                <span className="eyebrow">{f.unresolvedEyebrow}</span>
                <h3>{f.unresolvedTitle}</h3>
              </div>
              <ul>
                {auditCaseFile.unresolved.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </div>

            <div className="firm-case-source-row" aria-label={`${firm.name} case-file sources`}>
              {auditCaseFile.sources.map((source) => (
                <a href={source.url} target="_blank" rel="noopener noreferrer" key={source.url}>
                  <span>{source.type}</span>
                  <strong>{source.label}</strong>
                </a>
              ))}
            </div>
          </section>
        ) : null}

        <section className="pr-firm-profile" aria-labelledby={`profile-${firm.slug}`}>
          <div className="pr-firm-profile-chart">
            <h2 id={`profile-${firm.slug}`}>{f.profileTitle}</h2>
            <ReliabilityRadar firms={[firm]} showValues labels={{ ...f.relradar, values: t.values }} />
          </div>
          <div className="pr-firm-proof">
            <h2>{f.proofTitle}</h2>
            <ul>
              {dueDiligenceChecks.map((check) => (
                <li key={check.label}>
                  <RiskPip label={check.label} value={check.value} tone={badgeTone(check.className)} />
                  <small>{check.detail}</small>
                </li>
              ))}
            </ul>
            <Link href="#regulatory" className="pr-link">{f.openLegal} <span aria-hidden="true">→</span></Link>
          </div>
        </section>

        <section className="pr-firm-checks" aria-label={f.checksAria}>
          <div>
            <h2>{showStrengths ? f.strengths : f.pointsToCheck}</h2>
            <ul className={`pr-check-list ${showStrengths ? 'pr-check-good' : 'pr-check-watch'}`}>
              {firmSpecificSignals.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </div>
        </section>
        {partnerView ? (
          <PartnerCodeOffer
            slug={firm.slug}
            name={firm.name}
            logo={firmLogoFor(firm.logoDomain)?.src}
            view={partnerView}
            showCard={!isFtmo && !isThe5ers && !isGoatFundedTrader}
          />
        ) : null}
        {firm.commercialNote ? (
          <p className="pr-firm-disclosure">
            <strong>{f.commercial}</strong> {tx(firm.commercialNote)}
          </p>
        ) : null}

        {isThe5ers ? (
          <div className="panel the5ers-affiliate-panel">
            <div className="the5ers-affiliate-copy">
              <div className="eyebrow">{f.partner.fiversEyebrow}</div>
              <h2>{fmt(f.partner.fiversTitle, { code: THE5ERS_PROMO_CODE })}</h2>
              <p className="muted">{f.partner.fiversText}</p>
              <div className="promo-proof-row">
                <span>{fmt(f.partner.fiversCoupon, { code: THE5ERS_PROMO_CODE })}</span>
                <span>{f.partner.affiliateLink}</span>
                <span>{f.partner.fiversNoPct}</span>
              </div>
              <a href={THE5ERS_AFFILIATE_URL} target="_blank" rel="noreferrer sponsored" className="btn btn-primary">
                {f.partner.fiversCta}
              </a>
            </div>
          </div>
        ) : null}

        {isGoatFundedTrader ? (
          <div className="panel goat-affiliate-panel">
            <div className="goat-affiliate-copy">
              <div className="eyebrow">{f.partner.goatEyebrow}</div>
              <h2>{f.partner.goatTitle}</h2>
              <p className="muted">{f.partner.goatText}</p>
              <div className="promo-proof-row">
                <span>{f.partner.goatProof1}</span>
                <span>{f.partner.goatProof2}</span>
                <span>{f.partner.goatProof3}</span>
              </div>
              <a href={GOAT_FUNDED_TRADER_AFFILIATE_URL} target="_blank" rel="noreferrer sponsored" className="btn btn-primary">
                {f.partner.goatCta}
              </a>
            </div>
            <div className="goat-offer-card">
              <span>{f.partner.goatCardLabel}</span>
              <strong>FIRSTGFT / BOGO40</strong>
              <small>{f.partner.goatCardNote}</small>
            </div>
          </div>
        ) : null}

        {isFtmo ? (
          <div className="panel ftmo-affiliate-panel">
            <div>
              <div className="eyebrow">{f.partner.ftmoEyebrow}</div>
              <h2>{f.partner.ftmoTitle}</h2>
              <p className="muted">{f.partner.ftmoText}</p>
              <a href={FTMO_AFFILIATE_URL} target="_blank" rel="noreferrer sponsored" className="btn btn-primary">
                {f.partner.ftmoCta}
              </a>
            </div>
          </div>
        ) : null}

      </section>

      <p className="container pr-fineprint pr-technical-lead"><strong>{x.firmPageTitle}</strong> · {x.firmPageLead}</p>
      <section className="container pr-section" id="regulatory" aria-labelledby={`legal-${firm.slug}`}>
        <header className="pr-section-head">
          <div>
            <div className="eyebrow">{f.legalEyebrow}</div>
            <h2 id={`legal-${firm.slug}`}>{f.legalTitle}</h2>
          </div>
          <div className="pr-section-meta">
            <RiskPip label={f.legalRisk} value={v(regulatoryAudit.riskLevel)} tone={legalTone(regulatoryAudit.riskLevel)} />
            <span>{f.checkedLabel} <time dateTime={regulatoryAudit.lastChecked}>{regulatoryAudit.lastChecked}</time></span>
          </div>
        </header>
        <FoldBody sectionId="regulatory" more={x.firmPageMore} less={x.firmPageLess}>
        <p className="pr-section-lead">{tx(regulatoryAudit.summary)}</p>

        <EntityChain firmName={firm.name} entities={regulatoryAudit.entities} labels={f.chain} auditHref={`${L('/audit')}#jurisdictions`} locale={locale} />

        <div className="pr-dossier">
          <DossierGroup translate={tx} title={f.redFlags} empty={f.nothingRecorded} items={regulatoryAudit.redFlags} tone={regulatoryAudit.redFlags.length ? 'risk' : 'good'} open />
          <DossierGroup translate={tx} title={f.regulatorStatus} empty={f.nothingRecorded} items={regulatoryAudit.regulatoryStatus} />
          <DossierGroup translate={tx} title={f.complaints} empty={f.nothingRecorded} items={regulatoryAudit.complaintsAndDisputes} />
          <details className="pr-dossier-group">
            <summary>
              <span className="pr-dossier-count">{(regulatoryAudit.sources.length ? regulatoryAudit.sources : firm.sources).length}</span>
              <strong>{f.legalSources}</strong>
            </summary>
            {(regulatoryAudit.sources.length ? regulatoryAudit.sources : firm.sources).length > 0 ? (
              <ul className="pr-source-list">
                {(regulatoryAudit.sources.length ? regulatoryAudit.sources : firm.sources).map((source) => (
                  <li key={source.url}>
                    {isBlockedFirmUrl(firm, source.url)
                      ? <span>{tx(source.label)} {f.notLinked}</span>
                      : <a href={source.url} target="_blank" rel={linkRel(source.url)}>{tx(source.label)} <span>{sourceDomain(source.url)}</span></a>}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="pr-fineprint">{f.noLegalSources}</p>
            )}
          </details>
        </div>
        </FoldBody>
      </section>

      <section className="container pr-section" id="audit" aria-labelledby={`reviews-${firm.slug}`}>
        <header className="pr-section-head">
          <div>
            <div className="eyebrow">{f.reviewsEyebrow}</div>
            <h2 id={`reviews-${firm.slug}`}>{f.reviewsTitle}</h2>
          </div>
          <div className="pr-section-meta">
            <RiskPip label={f.payoutRisk} value={v(toEnglishText(firm.reviewSignals.payoutRisk))} tone={payoutTone(firm.reviewSignals.payoutRisk)} />
            <span>{f.payoutCheck} <time dateTime={firm.reviewSignals.lastSignalCheck}>{firm.reviewSignals.lastSignalCheck}</time></span>
          </div>
        </header>
        <FoldBody sectionId="audit" more={x.firmPageMore} less={x.firmPageLess}>

        {firm.payoutProofs?.length ? (
          <div className="pr-payout-proofs" aria-labelledby={`payout-proofs-${firm.slug}`}>
            <h3 id={`payout-proofs-${firm.slug}`}>{f.payoutProofs.title}</h3>
            <p className="pr-payout-proofs-intro">{f.payoutProofs.intro}</p>
            <ol>
              {firm.payoutProofs.map((proof) => (
                <li key={proof.url + proof.quote}>
                  <div className="pr-payout-proof-meta">
                    <time dateTime={proof.date}>{proof.date}</time>
                    <span className={`pr-payout-proof-kind is-${proof.kind}`}>{f.payoutProofs[proof.kind]}</span>
                    <span className={proof.firmReported ? 'pr-payout-proof-tag is-firm' : 'pr-payout-proof-tag is-independent'}>
                      {proof.firmReported ? f.payoutProofs.firmReported : f.payoutProofs.independent}
                    </span>
                  </div>
                  <p className="pr-payout-proof-text">{proof.quote}</p>
                  <a href={proof.url} target="_blank" rel="noopener noreferrer">{proof.publisher} <span aria-hidden="true">↗</span></a>
                </li>
              ))}
            </ol>
          </div>
        ) : null}

        <div className="pr-signal-board">
          <div className="pr-signal-total">
            <span>Trustpilot</span>
            {firm.trustpilotRating ? (
              <strong>{firm.trustpilotRating.toFixed(1)}<small>/5</small></strong>
            ) : (
              <strong className="is-empty">—</strong>
            )}
            <small>
              {firm.reviewSignals.trustpilotRatingWithheld
                ? f.withheldShort
                : firm.reviewSignals.trustpilotReviewCount
                  ? fmt(f.reviewsCount, { n: firm.reviewSignals.trustpilotReviewCount.toLocaleString('en-US') })
                  : firm.trustpilotRating
                    ? f.countMissing
                    : f.noRating}
              {firm.reviewSignals.trustpilotSourceUrl ? <> <a href={firm.reviewSignals.trustpilotSourceUrl} target="_blank" rel="noreferrer">{f.openPage}</a></> : null}
            </small>
          </div>
          <ul className="pr-signal-bars">
            {reviewOverview.map((item) => (
              <li key={item.label} className={`pr-tone-${item.provisional ? 'none' : item.risk ? 'risk' : scoreTone(item.score)}${item.provisional ? ' is-estimate' : ''}`}>
                <span className="pr-signal-bar-label">
                  <strong>{item.label}</strong>
                  {item.provisional ? <em className="pr-tag" title={f.notAssessedTitle}>{f.notAssessed}</em> : null}
                </span>
                <span className="pr-signal-bar-track" aria-hidden="true">
                  <span style={{ width: item.provisional ? '0%' : `${Math.max(0, Math.min(100, item.score))}%` }} />
                </span>
                <span className="pr-signal-bar-value">{item.provisional ? '—' : item.valueLabel ?? item.score}</span>
                <small>{item.detail}</small>
              </li>
            ))}
          </ul>
          <p className="pr-signal-payout">
            <span className={`pr-pip-dot pr-tone-${payoutTone(firm.reviewSignals.payoutRisk)}`} aria-hidden="true" />
            {f.payoutLine} {v(toEnglishText(firm.reviewSignals.payoutIncidentStatus))}
            {communitySearchLinks.length ? (
              <span className="pr-community-links">
                {f.readYourself}
                {communitySearchLinks.map((link) => (
                  <a key={link.url} href={link.url} target="_blank" rel="noreferrer" title={tx(link.label)}>
                    {link.network} {/payout/i.test(link.label) ? f.payouts : f.reviews}
                  </a>
                ))}
              </span>
            ) : null}
          </p>
        </div>

        <blockquote className="pr-verdict">
          <p>{tx(firm.reviewSignals.radarVerdict)}</p>
          {(firm.reviewSignals.confidenceDrivers ?? []).length ? (
            <footer>
              {(firm.reviewSignals.confidenceDrivers ?? []).map((driver) => <span className="pr-tag" key={driver}>{tx(driver)}</span>)}
            </footer>
          ) : null}
        </blockquote>
        <details className="firm-details">
          <summary>
            <span>{f.breakdown}</span>
            <small>{f.breakdownSub}</small>
          </summary>
          <div className="grid-2">
            <div className="card">
              <div className="muted">{f.tpReliability}</div>
              <div className="score">{firm.reviewSignals.trustpilotReliabilityScore}/100</div>
              <span className={`badge ${reviewReliabilityClass(firm.reviewSignals.trustpilotReliability)}`}>{v(toEnglishText(firm.reviewSignals.trustpilotReliability))}</span>
              {!firm.trustpilotRating ? <span className="badge badge-amber">{f.provisional}</span> : null}
              <div className="sentiment-breakdown">
                {firm.trustpilotRating ? <span><strong>{firm.trustpilotRating}/5</strong> {f.rawRating}</span> : null}
                {firm.reviewSignals.trustpilotReviewCount ? <span><strong>{firm.reviewSignals.trustpilotReviewCount.toLocaleString('en-US')}</strong> {f.reviews}</span> : null}
                {firm.reviewSignals.trustpilotRatingWithheld
                  ? <span><strong>{f.ratingWithheld}</strong> {f.byTrustpilot}</span>
                  : typeof firm.reviewSignals.trustpilotFlaggedReviewCount === 'number'
                    ? <span><strong>{firm.reviewSignals.trustpilotFlaggedReviewCount}</strong> {f.countedAlerts}</span>
                    : <span>{f.alertsNotCounted}</span>}
              </div>
              <p className="muted" style={{ marginTop: 12, marginBottom: 0 }}>{tx(firm.reviewSignals.trustpilotNote)}</p>
              {firm.reviewSignals.trustpilotSourceUrl ? (
                <a href={firm.reviewSignals.trustpilotSourceUrl} target="_blank" rel="noreferrer" className="quality-tag">
                  {f.viewTrustpilot}
                </a>
              ) : null}
              <div className="score-proof">
                {scoreProofRows(firm, 'trustpilot', t).map((row) => (
                  <div key={row.label}><span>{row.label}</span>{proofValue(row)}</div>
                ))}
              </div>
            </div>
            <div className="card">
              <div className="muted">{f.payoutRisk}</div>
              <div className="score">{isPayoutRiskAssessed(firm) ? `${firm.reviewSignals.payoutRiskScore}/100` : '—'}</div>
              <span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{v(toEnglishText(firm.reviewSignals.payoutRisk))}</span>
              <p className="muted" style={{ marginTop: 12, marginBottom: 0 }}>
                {isClosedFirm(firm)
                  ? f.closedNote
                  : isPayoutRiskAssessed(firm)
                  ? `${v(toEnglishText(firm.reviewSignals.payoutIncidentStatus))} · ${payoutBasis(firm, f)}`
                  : f.payoutNotAssessed}
              </p>
              <div className="score-proof">
                {scoreProofRows(firm, 'payout', t).map((row) => (
                  <div key={row.label}><span>{row.label}</span>{proofValue(row)}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="signal-explain-grid">
            <div className="signal-explain-card">
              <div className="eyebrow">{f.filteredTrustpilot}</div>
              <p className="muted">
                {tx(firm.reviewSignals.trustpilotFlaggedReviewNote)}
              </p>
              <ul className="risk-list">
                {(firm.reviewSignals.trustpilotFlags ?? []).map((flag) => <li key={flag}>{tx(flag)}</li>)}
              </ul>
            </div>
            <div className="signal-explain-card">
              <div className="eyebrow">{f.manipulable}</div>
              <div className="score">{isReviewRiskAssessed(firm) ? `${firm.reviewSignals.manipulationRiskScore}/100` : '—'}</div>
              <span className={`badge ${manipulationRiskClass(firm.reviewSignals.manipulationRisk ?? 'Non évalué')}`}>
                {v(toEnglishText(firm.reviewSignals.manipulationRisk ?? 'Non évalué'))}
              </span>
              <div className="score-proof">
                {scoreProofRows(firm, 'manipulation', t).map((row) => (
                  <div key={row.label}><span>{row.label}</span>{proofValue(row)}</div>
                ))}
              </div>
            </div>
          </div>
        </details>
        </FoldBody>
      </section>

      <section className="container pr-section" id="guides" aria-labelledby={`guides-${firm.slug}`}>
        <header className="pr-section-head">
          <div>
            <div className="eyebrow">{f.guidesEyebrow}</div>
            <h2 id={`guides-${firm.slug}`}>{fmt(f.guidesTitle, { name: firm.name })}</h2>
          </div>
        </header>
        <FoldBody sectionId="guides" more={x.firmPageMore} less={x.firmPageLess}>
        {locale !== 'en' ? <p className="pr-fineprint">{f.guidesNote}</p> : null}
        <ul className="pr-link-list">
          {editorialMentions.map(({ brief, section }) => (
            <li key={`${brief.slug}-${section.id}`}>
              <Link href={`${L(getEditorialBriefPath(brief))}#${section.id}`} className="pr-link-row">
                <span className="pr-link-row-tag">{fmt(f.riskBrief, { n: String(brief.issueNumber).padStart(2, '0') })}</span>
                <strong>{section.title}</strong>
                <small>{section.summary}</small>
                <span className="pr-link-row-go" aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
          {relatedGuides.map((guide) => {
            const display = getSeoGuideDisplay(guide);
            const text = guideCardText(locale, guide);
            return (
              <li key={guide.slug}>
                <Link href={localizedGuidePath(locale, guide)} className="pr-link-row">
                  <span className="pr-link-row-tag">{text?.eyebrow ?? display.eyebrow}</span>
                  <strong>{text?.title ?? display.title}</strong>
                  <small>{text?.answer ?? display.answer}</small>
                  <span className="pr-link-row-go" aria-hidden="true">→</span>
                </Link>
              </li>
            );
          })}
        </ul>
        </FoldBody>
      </section>

      <section className="container pr-section" id="faq" aria-labelledby={`faq-${firm.slug}`}>
        <header className="pr-section-head">
          <div>
            <div className="eyebrow">{f.faqEyebrow}</div>
            <h2 id={`faq-${firm.slug}`}>{fmt(f.faqTitle, { name: firm.name })}</h2>
          </div>
        </header>
        <div className="pr-faq">
          {firmFaq.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="container pr-section" id="sources" aria-labelledby={`sources-${firm.slug}`}>
        <header className="pr-section-head">
          <div>
            <div className="eyebrow">{f.sourcesEyebrow}</div>
            <h2 id={`sources-${firm.slug}`}>{f.sourcesTitle}</h2>
          </div>
          <div className="pr-section-meta">
            <span className={`pr-tag pr-tone-${badgeTone(auditStatusClass(firm.auditStatus))}`}>{v(toEnglishText(firm.auditStatus))}</span>
          </div>
        </header>
        <FoldBody sectionId="sources" more={x.firmPageMore} less={x.firmPageLess}>
        <div className="pr-sources-grid">
          <div className="pr-sources-main">
            <p className="pr-section-lead">{tx(firm.auditSummary)}</p>
            {firm.auditSourcesChecked.length ? (
              <p className="pr-checked-channels">
                <span>{f.checkedLabel}</span>
                {firm.auditSourcesChecked.map((source) => <span className="pr-tag" key={source}>{tx(source)}</span>)}
              </p>
            ) : null}

            <h3>{f.incidentsTitle}</h3>
            {hasConcretePayoutIssues(firm) ? (
              <ul className="pr-check-list pr-incident-list">
                {documentedIncidents(firm).map((incident) => <li key={incident}>{tx(incident)}</li>)}
              </ul>
            ) : (
              <p className="pr-fineprint">{f.noIncidents}</p>
            )}
            <p className="pr-fineprint">{tx(firm.communitySignal)}</p>

            <h3>{f.sourcesToCheck}</h3>
            <ul className="pr-source-list">
              {firm.sources.map((source) => (
                <li key={source.url}>
                  {isBlockedFirmUrl(firm, source.url)
                    ? <span>{tx(source.label)}</span>
                    : <a href={source.url} target="_blank" rel={linkRel(source.url)}>{tx(source.label)} <span>{sourceDomain(source.url)}</span></a>}
                </li>
              ))}
            </ul>
            <p className="pr-fineprint">{fmt(f.lastReviewNote, { date: firm.lastReviewed })}</p>
          </div>

          {firmChangelog.length ? (
            <RevealOnView className="firm-changelog pr-timeline">
              <h3 id="update-history">{f.history}</h3>
              <ol>
                {firmChangelog.map((entry, index) => (
                  <li key={`${entry.date}-${entry.summary.slice(0, 24)}`} style={{ '--i': index } as CSSProperties}>
                    <time dateTime={entry.date}>{entry.date}</time>
                    <p>{tx(entry.summary)}</p>
                    <a href={entry.source} target="_blank" rel="noopener noreferrer">
                      {f.historySource} <span className="pr-timeline-domain">{sourceDomain(entry.source)}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </RevealOnView>
          ) : null}
        </div>
        </FoldBody>
      </section>
    </main>
  );
}

function DossierGroup({
  title,
  empty,
  items,
  tone,
  open = false,
  translate,
}: {
  title: string;
  empty: string;
  items: string[];
  tone?: Tone;
  open?: boolean;
  translate?: (text: string) => string;
}) {
  return (
    <details className={`pr-dossier-group${tone ? ` pr-tone-${tone}` : ''}`} open={open && items.length > 0}>
      <summary>
        <span className="pr-dossier-count">{items.length}</span>
        <strong>{title}</strong>
      </summary>
      {items.length ? (
        <ul>
          {items.map((item) => <li key={item}>{translate ? translate(item) : toEnglishText(item)}</li>)}
        </ul>
      ) : (
        <p className="pr-fineprint">{empty}</p>
      )}
    </details>
  );
}

function sourceDomain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}
