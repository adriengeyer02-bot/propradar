import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { firmMetaOverrides } from '../../../lib/firmMetaOverrides';
import { getFirmChangelog } from '../../../lib/firmUpdates';
import Image from 'next/image';
import Link from 'next/link';
import FirmSectionNav from '../../../components/ui/FirmSectionNav';
import { notFound } from 'next/navigation';
import FirmLogo from '../../../components/FirmLogo';
import ChallengePath from '../../../components/ui/ChallengePath';
import EntityChain from '../../../components/ui/EntityChain';
import ReliabilityRadar from '../../../components/ui/ReliabilityRadar';
import RiskPip from '../../../components/ui/RiskPip';
import ScoreRing from '../../../components/ui/ScoreRing';
import ReviewFreshness from '../../../components/ui/ReviewFreshness';
import RevealOnView from '../../../components/ui/RevealOnView';
import { legalTone, payoutTone, reviewTone, scoreTone, statusTone, trustpilotPip, type Tone } from '../../../lib/riskTone';
import {
  BLUE_GUARDIAN_AFFILIATE_URL,
  FTMO_AFFILIATE_URL,
  GOAT_FUNDED_TRADER_AFFILIATE_URL,
  THE5ERS_AFFILIATE_URL,
  THE5ERS_PROMO_CODE,
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
import { getManualCommunityReview } from '../../../lib/manualCommunityReviews';
import { getFirmContentLastModified, getFirmSearchProfile } from '../../../lib/firmSearchProfiles';
import { toEnglishText } from '../../../lib/i18n';
import { editorialBriefs, getEditorialBriefPath } from '../../../lib/editorialBriefs';
import { getAuditCaseFile } from '../../../lib/auditCaseFiles';
import { entityCountries } from '../../../lib/jurisdictions';
import { getClosureRecord } from '../../../lib/closures';
import { isFirmIndexable } from '../../../lib/firmIndexing';
import { feeStats } from '../../../lib/industryStats';
import { HTML_LANG, OG_LOCALE, countryLabel, isLocale, localeAlternates, localePath, type Locale } from '../../../lib/locales';
import { fmt, getMessages, tv, type Messages } from '../../../lib/messages';

type FirmT = Messages['firm'];

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

async function readParams(params: Props['params']): Promise<{ locale: Locale; slug: string }> {
  const { locale, slug } = await params;
  return { locale: isLocale(locale) ? locale : 'en', slug };
}

const FIRM_LIBRARY_PUBLISHED_AT = '2026-06-29T08:00:00.000Z';
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
  if (score >= 55) return '#d97706';
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
  if (score >= 55) return 'community-overview-watch';
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
          <li><Link href={`${L('/prop-firm-comparison')}?country=${countries[0].code}`}>{fmt(f.ctxCountry, { country: countryLabel(locale, countries[0].code, countries[0].name) })}</Link></li>
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

  const socialImage = auditCaseFile
    ? `${SITE_URL}/editorial/prop-firm-operational-dependency-risk-16x9.jpg`
    : `${SITE_URL}/opengraph-image`;

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
      publishedTime: FIRM_LIBRARY_PUBLISHED_AT,
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

export default async function FirmPage({ params }: Props) {
  const { locale, slug } = await readParams(params);
  const firm = getFirmBySlug(slug);
  const t = getMessages(locale);
  const f = t.firm;
  const v = (value: string) => tv(t, value);
  const L = (path: string) => localePath(locale, path);
  const lower = (value: string) => (locale === 'de' ? value : value.toLowerCase());

  if (!firm) {
    notFound();
  }

  const isFtmo = firm.slug === 'ftmo';
  const isThe5ers = firm.slug === 'the5ers';
  const isBlueGuardian = firm.slug === 'blue-guardian';
  const isGoatFundedTrader = firm.slug === 'goat-funded-trader';
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
      ? fmt(f.fallback.payout, { level: lower(v(toEnglishText(firm.reviewSignals.payoutRisk))), basis: payoutBasis(firm, f), timing: toEnglishText(firm.payoutDelay) })
      : fmt(f.fallback.payoutNone, { timing: toEnglishText(firm.payoutDelay) }),
    fmt(f.fallback.rules, {
      drawdown: isProvisional(firm, 'drawdownType') ? f.fallback.drawdownVerify : fmt(f.fallback.drawdown, { type: v(toEnglishText(firm.drawdownType) === 'Hybride' ? 'Hybrid' : toEnglishText(firm.drawdownType)) }),
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
    description: searchProfile?.summary ?? toEnglishText(firm.verdict),
    datePublished: FIRM_LIBRARY_PUBLISHED_AT,
    dateModified: contentLastModified,
    image: auditCaseFile
      ? `${SITE_URL}/editorial/prop-firm-operational-dependency-risk-16x9.jpg`
      : `${SITE_URL}/opengraph-image`,
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
    datePublished: FIRM_LIBRARY_PUBLISHED_AT,
    dateModified: contentLastModified,
    reviewBody: toEnglishText(firm.verdict),
    inLanguage: 'en',
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
    description: toEnglishText(primaryProduct?.description ?? firm.verdict),
    category: `${firm.styles.map((style) => toEnglishText(style)).join(', ')} prop firm program`,
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
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(reviewSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(productSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />

      <section className="container detail-header firm-profile-header">
        <Link href={L('/prop-firm-comparison')} className="firm-back-link">
          <span aria-hidden="true">&larr;</span>
          {f.allFirms}
        </Link>

        <div className="pr-firm-hero">
          <div className="pr-firm-identity">
            <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="lg" />
            <div>
              <div className="eyebrow">{toEnglishText(firm.headquarters)} · {fmt(f.founded, { year: firm.founded })}</div>
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
              <strong>{f.domainWarning}</strong> {firm.listedDomainWarning}
            </p>
          ) : (
            <p className="pr-firm-verdict">{toEnglishText(firm.verdict)}</p>
          )}

          <aside className="pr-firm-scorecard" aria-label={fmt(f.scoreAria, { name: firm.name })}>
            <ScoreRing score={firm.score} size="lg" animate />
            <div className="pr-firm-scorecard-body">
              <span className="pr-firm-scorecard-label">{f.propradarScore}</span>
              <strong className={`pr-firm-decision pr-tone-${decisionTone(firmDecision)}`}>{f.decision[firmDecision]}</strong>
              <div className="pr-scorecard-pips">
                <RiskPip label={f.payout} value={v(toEnglishText(firm.reviewSignals.payoutRisk))} tone={payoutTone(firm.reviewSignals.payoutRisk)} />
                <RiskPip label={f.legal} value={v(regulatoryAudit.riskLevel)} tone={legalTone(regulatoryAudit.riskLevel)} />
                <RiskPip label={f.trustpilot} value={v(trustpilotPip(firm).value)} tone={trustpilotPip(firm).tone} />
              </div>
              <div className="pr-firm-actions">
                <Link href={L('/prop-firm-comparison')} className="btn">{f.compare}</Link>
                <Link href={`${L('/')}#radar-weekly`} className="pr-link">{f.setAlert}</Link>
              </div>
            </div>
          </aside>
        </div>

        <dl className="pr-key-facts">
          <div><dt>{f.facts.from}</dt><dd>{v(priceLabel(firm))}</dd></div>
          <div><dt>{f.facts.split}</dt><dd>{v(profitSplitLabel(firm))}</dd></div>
          <div><dt>{f.facts.drawdown}</dt><dd>{v(drawdownLabel(firm, toEnglishText))}</dd></div>
          <div><dt>{f.facts.news}</dt><dd>{v(toEnglishText(firm.newsTrading))}</dd></div>
          <div><dt>{f.facts.proof}</dt><dd>{v(toEnglishText(firm.auditStatus))}</dd></div>
          <div><dt>{f.facts.lastReview}</dt><dd><ReviewFreshness date={firm.lastReviewed} labels={{ today: t.radar.today, yesterday: t.radar.yesterday, daysAgo: t.radar.daysAgo }} /></dd></div>
          {isPayoutDelayUnknown(firm) ? null : (
            <div className="pr-key-facts-wide"><dt>{f.facts.payout}</dt><dd><PayoutFact text={toEnglishText(firm.payoutDelay)} label={f.details} /></dd></div>
          )}
        </dl>

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
            <a
              className="pr-link"
              href={`mailto:contact@propradar.tech?subject=${encodeURIComponent(`Source for ${firm.name}`)}&body=${encodeURIComponent(`Item and public link: `)}`}
            >
              {f.sendSource}
            </a>
          </aside>
        ) : null}

        <FirmSectionNav
          label={f.navLabel}
          items={[
            ...(firm.products.length ? [{ id: 'produits', label: f.nav.offers }] : []),
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
          <div className="grid-2">
            {firm.products.map((product) => (
              <article className="card product-card pr-product" key={product.id}>
                <div className="pr-product-tags">
                  <span className="pr-tag">{v(product.type)}</span>
                  {product.isPopular ? <span className="pr-tag">{f.popular}</span> : null}
                </div>
                <h3>{toEnglishText(product.name)}</h3>
                <p className="muted">{toEnglishText(product.description)}</p>
                <ChallengePath product={product} labels={f.path} />
                <dl className="pr-product-meta">
                  <div><dt>{f.platforms}</dt><dd>{product.platforms.map((platform) => toEnglishText(platform)).join(' · ')}</dd></div>
                  <div><dt>{f.assets}</dt><dd>{product.tradableAssets.map((asset) => toEnglishText(asset)).join(' · ')}</dd></div>
                </dl>
                {product.hasConsistencyRule ? (
                  <p className="pr-product-rule pr-tone-watch">
                    <span className="pr-pip-dot" aria-hidden="true" />
                    {toEnglishText(product.consistencyRule ?? 'Règle de cohérence à vérifier')}
                  </p>
                ) : (
                  <p className="pr-product-rule pr-tone-good">
                    <span className="pr-pip-dot" aria-hidden="true" />
                    {f.noConsistency}
                  </p>
                )}
                {product.linkToStart ? (
                  <a
                    href={product.linkToStart}
                    target="_blank"
                    rel={firm.commercialRelationship === 'Affiliation transparente' ? 'noreferrer sponsored' : 'noreferrer'}
                    className="btn btn-primary"
                  >
                    {firm.commercialRelationship === 'Affiliation transparente' ? f.openAffiliate : f.openOfficial}
                  </a>
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
      </section>

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
              <Image
                src="/editorial/prop-firm-operational-dependency-risk-16x9.jpg"
                alt="Operational dependency chain linking a prop firm to its platform, broker, payment and legal providers"
                width={1536}
                height={864}
                sizes="(max-width: 760px) 100vw, 1180px"
                quality={86}
              />
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
          <div>
            <h2>{f.beforePay}</h2>
            <ol className="pr-check-list pr-check-steps">
              {decisionChecklist.map((item) => <li key={item}>{item}</li>)}
            </ol>
          </div>
        </section>
        {firm.commercialNote ? (
          <p className="pr-firm-disclosure">
            <strong>{f.commercial}</strong> {toEnglishText(firm.commercialNote)}
          </p>
        ) : null}

        {isBlueGuardian ? (
          <div className="panel blue-guardian-affiliate-panel">
            <div className="blue-guardian-affiliate-copy">
              <div className="eyebrow">Blue Guardian offer</div>
              <h2>Current checkout code: HALLOWEEN</h2>
              <p className="muted">
                Blue Guardian&apos;s official checkout showed &quot;SAVE 35% WITH CODE HALLOWEEN&quot; on 28 October 2026 (seasonal offer, no end date shown).
                The link below is affiliate-based, but the PropRadar score, payout risk, public signals and rule analysis remain independent from that relationship.
              </p>
              <div className="promo-proof-row">
                <span>Code HALLOWEEN</span>
                <span>35% shown at checkout</span>
                <span>Declared affiliate link</span>
              </div>
              <a href={BLUE_GUARDIAN_AFFILIATE_URL} target="_blank" rel="noreferrer sponsored" className="btn btn-primary">
                Open Blue Guardian and test HALLOWEEN
              </a>
            </div>
            <div className="blue-guardian-offer-card">
              <span>Official checkout code</span>
              <strong>HALLOWEEN</strong>
              <small>Seasonal code: confirm the 35% reduction on the selected program before payment.</small>
            </div>
          </div>
        ) : null}

        {isThe5ers ? (
          <div className="panel the5ers-affiliate-panel">
            <div className="the5ers-affiliate-copy">
              <div className="eyebrow">The5ers Partner</div>
              <h2>Partner code to verify: {THE5ERS_PROMO_CODE}</h2>
              <p className="muted">
                No public discount percentage was confirmed for this partner code on 13 July 2026. The official Hyper Growth 5K
                price was $74; any extra coupon benefit must appear in the checkout subtotal. The PropRadar score remains independent.
              </p>
              <div className="promo-proof-row">
                <span>Coupon {THE5ERS_PROMO_CODE}</span>
                <span>Declared affiliate link</span>
                <span>No guaranteed percentage</span>
              </div>
              <a href={THE5ERS_AFFILIATE_URL} target="_blank" rel="noreferrer sponsored" className="btn btn-primary">
                Open The5ers and test the code
              </a>
            </div>
          </div>
        ) : null}

        {isGoatFundedTrader ? (
          <div className="panel goat-affiliate-panel">
            <div className="goat-affiliate-copy">
              <div className="eyebrow">GOAT Funded Trader offers</div>
              <h2>Current codes: FIRSTGFT or BOGO40</h2>
              <p className="muted">
                FIRSTGFT offers new customers up to 50% off eligible plans. BOGO40 gives 40% off, but the same-size bonus account
                becomes claimable only after a first successful payout and a support request. The signup link remains affiliate-based.
              </p>
              <div className="promo-proof-row">
                <span>FIRSTGFT: up to 50%</span>
                <span>BOGO40: 40% + conditional account</span>
                <span>Affiliate signup link</span>
              </div>
              <a href={GOAT_FUNDED_TRADER_AFFILIATE_URL} target="_blank" rel="noreferrer sponsored" className="btn btn-primary">
                Open GFT and compare both codes
              </a>
            </div>
            <div className="goat-offer-card">
              <span>Official codes</span>
              <strong>FIRSTGFT / BOGO40</strong>
              <small>Use only the option that produces the better checkout result for the selected plan.</small>
            </div>
          </div>
        ) : null}

        {isFtmo ? (
          <div className="panel ftmo-affiliate-panel">
            <div>
              <div className="eyebrow">FTMO Partner</div>
              <h2>Access the challenge through the PropRadar link</h2>
              <p className="muted">
                This link is affiliate-based and does not influence the PropRadar score. FTMO is ranked with the same criteria as other firms: rules, payouts, public signals and operational risk.
              </p>
              <a href={FTMO_AFFILIATE_URL} target="_blank" rel="noreferrer sponsored" className="btn btn-primary">
                Open FTMO
              </a>
            </div>
          </div>
        ) : null}

      </section>

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
        <p className="pr-section-lead">{toEnglishText(regulatoryAudit.summary)}</p>

        <EntityChain firmName={firm.name} entities={regulatoryAudit.entities} labels={f.chain} auditHref={`${L('/audit')}#jurisdictions`} locale={locale} />

        <div className="pr-dossier">
          <DossierGroup title={f.redFlags} empty={f.nothingRecorded} items={regulatoryAudit.redFlags} tone={regulatoryAudit.redFlags.length ? 'risk' : 'good'} open />
          <DossierGroup title={f.regulatorStatus} empty={f.nothingRecorded} items={regulatoryAudit.regulatoryStatus} />
          <DossierGroup title={f.complaints} empty={f.nothingRecorded} items={regulatoryAudit.complaintsAndDisputes} />
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
                      ? <span>{toEnglishText(source.label)} {f.notLinked}</span>
                      : <a href={source.url} target="_blank" rel={linkRel(source.url)}>{toEnglishText(source.label)} <span>{sourceDomain(source.url)}</span></a>}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="pr-fineprint">{f.noLegalSources}</p>
            )}
          </details>
        </div>
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
                  <a key={link.url} href={link.url} target="_blank" rel="noreferrer" title={toEnglishText(link.label)}>
                    {link.network} {/payout/i.test(link.label) ? f.payouts : f.reviews}
                  </a>
                ))}
              </span>
            ) : null}
          </p>
        </div>

        <blockquote className="pr-verdict">
          <p>{toEnglishText(firm.reviewSignals.radarVerdict)}</p>
          {(firm.reviewSignals.confidenceDrivers ?? []).length ? (
            <footer>
              {(firm.reviewSignals.confidenceDrivers ?? []).map((driver) => <span className="pr-tag" key={driver}>{toEnglishText(driver)}</span>)}
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
              <p className="muted" style={{ marginTop: 12, marginBottom: 0 }}>{toEnglishText(firm.reviewSignals.trustpilotNote)}</p>
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
                {toEnglishText(firm.reviewSignals.trustpilotFlaggedReviewNote)}
              </p>
              <ul className="risk-list">
                {(firm.reviewSignals.trustpilotFlags ?? []).map((flag) => <li key={flag}>{toEnglishText(flag)}</li>)}
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
      </section>

      <section className="container pr-section" id="guides" aria-labelledby={`guides-${firm.slug}`}>
        <header className="pr-section-head">
          <div>
            <div className="eyebrow">{f.guidesEyebrow}</div>
            <h2 id={`guides-${firm.slug}`}>{fmt(f.guidesTitle, { name: firm.name })}</h2>
          </div>
        </header>
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
            return (
              <li key={guide.slug}>
                <Link href={L(getSeoGuidePath(guide))} className="pr-link-row">
                  <span className="pr-link-row-tag">{display.eyebrow}</span>
                  <strong>{display.title}</strong>
                  <small>{display.answer}</small>
                  <span className="pr-link-row-go" aria-hidden="true">→</span>
                </Link>
              </li>
            );
          })}
        </ul>
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
        <div className="pr-sources-grid">
          <div className="pr-sources-main">
            <p className="pr-section-lead">{toEnglishText(firm.auditSummary)}</p>
            {firm.auditSourcesChecked.length ? (
              <p className="pr-checked-channels">
                <span>{f.checkedLabel}</span>
                {firm.auditSourcesChecked.map((source) => <span className="pr-tag" key={source}>{toEnglishText(source)}</span>)}
              </p>
            ) : null}

            <h3>{f.incidentsTitle}</h3>
            {hasConcretePayoutIssues(firm) ? (
              <ul className="pr-check-list pr-incident-list">
                {documentedIncidents(firm).map((incident) => <li key={incident}>{toEnglishText(incident)}</li>)}
              </ul>
            ) : (
              <p className="pr-fineprint">{f.noIncidents}</p>
            )}
            <p className="pr-fineprint">{toEnglishText(firm.communitySignal)}</p>

            <h3>{f.sourcesToCheck}</h3>
            <ul className="pr-source-list">
              {firm.sources.map((source) => (
                <li key={source.url}>
                  {isBlockedFirmUrl(firm, source.url)
                    ? <span>{toEnglishText(source.label)}</span>
                    : <a href={source.url} target="_blank" rel={linkRel(source.url)}>{toEnglishText(source.label)} <span>{sourceDomain(source.url)}</span></a>}
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
                    <p>{entry.summary}</p>
                    <a href={entry.source} target="_blank" rel="noopener noreferrer">
                      {f.historySource} <span className="pr-timeline-domain">{sourceDomain(entry.source)}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </RevealOnView>
          ) : null}
        </div>
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
}: {
  title: string;
  empty: string;
  items: string[];
  tone?: Tone;
  open?: boolean;
}) {
  return (
    <details className={`pr-dossier-group${tone ? ` pr-tone-${tone}` : ''}`} open={open && items.length > 0}>
      <summary>
        <span className="pr-dossier-count">{items.length}</span>
        <strong>{title}</strong>
      </summary>
      {items.length ? (
        <ul>
          {items.map((item) => <li key={item}>{toEnglishText(item)}</li>)}
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
