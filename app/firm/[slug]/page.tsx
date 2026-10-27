import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { firmMetaOverrides } from '../../lib/firmMetaOverrides';
import { getFirmChangelog } from '../../lib/firmUpdates';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import FirmLogo from '../../components/FirmLogo';
import ChallengePath from '../../components/ui/ChallengePath';
import RiskPip from '../../components/ui/RiskPip';
import ScoreRing from '../../components/ui/ScoreRing';
import ReviewFreshness from '../../components/ui/ReviewFreshness';
import RevealOnView from '../../components/ui/RevealOnView';
import { legalTone, payoutTone, reviewTone, scoreTone, statusTone, type Tone } from '../../lib/riskTone';
import {
  BLUE_GUARDIAN_AFFILIATE_URL,
  FTMO_AFFILIATE_URL,
  GOAT_FUNDED_TRADER_AFFILIATE_URL,
  THE5ERS_AFFILIATE_URL,
  THE5ERS_PROMO_CODE,
  auditStatusClass,
  formatUsd,
  getFirmBySlug,
  manipulationRiskClass,
  payoutRiskClass,
  propFirms,
  regulatoryRiskClass,
  relationshipClass,
  reviewReliabilityClass,
  scoreClass,
  type PropFirm,
  hasMeasuredMentions,
} from '../../lib/propFirms';
import { SITE_NAME, SITE_URL } from '../../lib/site';
import { getFirmRelatedGuides, getSeoGuideDisplay, getSeoGuidePath } from '../../lib/seoGuides';
import { getManualCommunityReview, manualCoverageClass } from '../../lib/manualCommunityReviews';
import { getFirmContentLastModified, getFirmSearchProfile } from '../../lib/firmSearchProfiles';
import { toEnglishText } from '../../lib/i18n';
import { editorialBriefs, getEditorialBriefPath } from '../../lib/editorialBriefs';
import { getAuditCaseFile } from '../../lib/auditCaseFiles';

type Props = {
  params: Promise<{ slug: string }>;
};

const FIRM_LIBRARY_PUBLISHED_AT = '2026-06-29T08:00:00.000Z';
export const revalidate = 86400;
export const dynamicParams = false;

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
  if (isWatchlistFirm(firm) || firm.score < 70 || firm.reviewSignals.payoutRiskScore >= 40) return 'Watchlist';
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
  const placeholderPattern = /rev.rifier|conditions commerciales|statuts/i;
  return firm.reviewSignals.payoutIssues.some((issue) => !placeholderPattern.test(issue));
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

function scoreProofRows(firm: PropFirm, kind: 'reddit' | 'x' | 'trustpilot' | 'payout' | 'manipulation'): ScoreProofRow[] {
  if (kind === 'reddit') {
    return [
      { label: 'Source', value: firm.reviewSignals.redditSource === 'Estimation PropRadar' ? 'PropRadar raw score, manual review to complete' : toEnglishText(firm.reviewSignals.redditSource ?? 'À documenter') },
      { label: 'Raw volume', value: hasMeasuredMentions(firm.reviewSignals.redditSource) ? `${firm.reviewSignals.redditSampleSize ?? 0} review(s) / mention(s)` : 'Not counted yet' },
      { label: 'Confidence', value: hasMeasuredMentions(firm.reviewSignals.redditSource) ? toEnglishText(firm.reviewSignals.redditConfidence ?? 'Faible') : 'Editorial estimate' },
    ];
  }

  if (kind === 'x') {
    return [
      { label: 'Source', value: firm.reviewSignals.xSource === 'Estimation PropRadar' ? 'PropRadar raw score, manual review to complete' : toEnglishText(firm.reviewSignals.xSource ?? 'À documenter') },
      { label: 'Raw volume', value: hasMeasuredMentions(firm.reviewSignals.xSource) ? `${firm.reviewSignals.xSampleSize ?? 0} review(s) / mention(s)` : 'Not counted yet' },
      { label: 'Confidence', value: hasMeasuredMentions(firm.reviewSignals.xSource) ? toEnglishText(firm.reviewSignals.xConfidence ?? 'Faible') : 'Editorial estimate' },
    ];
  }

  if (kind === 'trustpilot') {
    const trustpilotUrl = firm.reviewSignals.trustpilotSourceUrl ?? sourceUrl(firm, /trustpilot/i);

    return [
      { label: 'Raw rating', value: firm.trustpilotRating ? `${firm.trustpilotRating}/5` : 'Not filled in PropRadar' },
      { label: 'Source', value: trustpilotUrl ? 'Listed Trustpilot page' : 'Link or review to complete', href: trustpilotUrl },
      { label: 'Status', value: firm.trustpilotRating ? 'Weighted score' : 'Provisional score' },
    ];
  }

  if (kind === 'payout') {
    const payoutUrl = sourceUrl(firm, /payout|fast/i);

    return [
      { label: 'Visible proof', value: firm.payoutProof && payoutUrl ? 'Official payout page listed' : firm.payoutProof ? 'Tracked signal, independent proof to publish' : 'Insufficient', href: firm.payoutProof ? payoutUrl : undefined },
      { label: 'Incidents', value: hasConcretePayoutIssues(firm) ? `${firm.reviewSignals.payoutIncidentCount ?? firm.incidents} documented signal(s)` : 'No detailed incident in PropRadar' },
      { label: 'Last check', value: firm.reviewSignals.lastSignalCheck },
    ];
  }

  return [
    { label: 'Base', value: 'Trustpilot + incidents + marketing signals' },
    { label: 'Review alert', value: firm.reviewSignals.trustpilotRatingWithheld ? 'Trustpilot rating withheld (guideline breach)' : `${firm.reviewSignals.trustpilotFlaggedReviewCount ?? 0} tracked alert(s)` },
    { label: 'Status', value: toEnglishText(firm.reviewSignals.trustpilotReliability) },
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
    firm.reviewSignals.payoutRiskScore >= 40 ||
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const firm = getFirmBySlug(slug);

  if (!firm) {
    return {
      title: 'Firm not found - PropRadar',
      robots: { index: false, follow: false },
    };
  }

  const searchProfile = getFirmSearchProfile(firm.slug);
  const auditCaseFile = getAuditCaseFile(firm.slug);
  const metaOverride = firmMetaOverrides[firm.slug];
  const title = metaOverride?.title(firm) ?? searchProfile?.metaTitle ?? `${firm.name} Review: Payout & Risk`;
  const description = metaOverride?.description(firm) ?? searchProfile?.metaDescription ??
    `${firm.name} review: score ${firm.score}/100, payout risk ${toEnglishText(firm.reviewSignals.payoutRisk)}, legal risk ${firm.regulatoryAudit.riskLevel}. ${toEnglishText(firm.verdict)}`;
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
    alternates: {
      canonical: `/firm/${firm.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/firm/${firm.slug}`,
      type: 'article',
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
  const { slug } = await params;
  const firm = getFirmBySlug(slug);

  if (!firm) {
    notFound();
  }

  const isFtmo = firm.slug === 'ftmo';
  const isThe5ers = firm.slug === 'the5ers';
  const isBlueGuardian = firm.slug === 'blue-guardian';
  const isGoatFundedTrader = firm.slug === 'goat-funded-trader';
  const searchProfile = getFirmSearchProfile(firm.slug);
  const auditCaseFile = getAuditCaseFile(firm.slug);
  const relatedGuides = getFirmRelatedGuides(firm, 4);
  const editorialMentions = editorialBriefs.flatMap((brief) => brief.sections
    .filter((section) => section.firmSlugs.includes(firm.slug))
    .map((section) => ({ brief, section })))
    .slice(0, 2);
  const manualReview = getManualCommunityReview(firm);
  const regulatoryAudit = firm.regulatoryAudit;
  const pageUrl = `${SITE_URL}/firm/${firm.slug}`;
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
    `Legal file: ${regulatoryAudit.riskLevel} risk, checked ${regulatoryAudit.lastChecked}, with ${sourceCount} source link(s) saved.`,
    `Payout file: ${toEnglishText(firm.reviewSignals.payoutRisk)} risk, ${firm.reviewSignals.payoutIncidentCount ?? firm.incidents} tracked signal(s), advertised timing ${toEnglishText(firm.payoutDelay)}.`,
    `Trading rules: ${toEnglishText(firm.drawdownType)} drawdown, news trading ${toEnglishText(firm.newsTrading).toLowerCase()}, ${firm.products.length} tracked product(s).`,
  ];
  const topRiskPoints = uniqueProfilePoints([
    ...specificRiskPoints,
    ...evidenceFallbackPoints,
  ]).slice(0, 4);
  const firmSpecificSignals = uniqueProfilePoints([
    ...(firmDecision === 'Shortlist candidate' ? specificStrengthPoints : specificRiskPoints),
    ...(firmDecision === 'Shortlist candidate' ? specificRiskPoints : specificStrengthPoints),
    ...evidenceFallbackPoints,
  ]).slice(0, 4);
  const decisionChecklist = [
    firm.sources.length ? 'Open the official source links saved by PropRadar.' : 'Find and save official source links before relying on this profile.',
    firm.reviewSignals.payoutRiskScore >= 40
      ? 'Look for recent payout proof, denials and KYC complaints.'
      : 'Confirm payout calendar, minimum withdrawal and KYC timing.',
    firm.regulatoryAudit.riskLevel === 'High' || firm.regulatoryAudit.riskLevel === 'Critical'
      ? 'Read the regulatory section before any checkout.'
      : 'Check the legal entity and terms page still match this profile.',
    'Match the exact product rules with your strategy before scaling size.',
  ];
  const communitySignalScore = Math.round(
    (
      firm.reviewSignals.redditScore +
      firm.reviewSignals.xScore +
      firm.reviewSignals.trustpilotReliabilityScore +
      Math.max(0, 100 - firm.reviewSignals.payoutRiskScore)
    ) / 4
  );
  const communityOverview = [
    {
      label: 'Reddit',
      score: firm.reviewSignals.redditScore,
      estimated: !hasMeasuredMentions(firm.reviewSignals.redditSource),
      volume: hasMeasuredMentions(firm.reviewSignals.redditSource) ? `${firm.reviewSignals.redditSampleSize ?? 0} public mention(s)` : 'Editorial estimate',
      detail: hasMeasuredMentions(firm.reviewSignals.redditSource) ? `+${firm.reviewSignals.redditPositiveMentions ?? 0} / -${firm.reviewSignals.redditNegativeMentions ?? 0}` : 'mentions not counted yet',
    },
    {
      label: 'X/Twitter',
      score: firm.reviewSignals.xScore,
      estimated: !hasMeasuredMentions(firm.reviewSignals.xSource),
      volume: hasMeasuredMentions(firm.reviewSignals.xSource) ? `${firm.reviewSignals.xSampleSize ?? 0} public mention(s)` : 'Editorial estimate',
      detail: hasMeasuredMentions(firm.reviewSignals.xSource) ? `+${firm.reviewSignals.xPositiveMentions ?? 0} / -${firm.reviewSignals.xNegativeMentions ?? 0}` : 'mentions not counted yet',
    },
    {
      label: 'Trustpilot',
      score: firm.reviewSignals.trustpilotReliabilityScore,
      estimated: !firm.trustpilotRating,
      volume: firm.trustpilotRating ? `${firm.trustpilotRating}/5 raw rating` : 'Raw rating not filled',
      detail: toEnglishText(firm.reviewSignals.trustpilotReliability),
    },
  ];
  const dueDiligenceChecks = [
    {
      label: 'Legal entity',
      value: legalVerificationLabel(firm),
      detail: firm.legalVerified
        ? 'The profile has a mapped legal entity or official operating structure.'
        : 'The legal entity is not strong enough to treat this as fully verified.',
      className: legalVerificationClass(firm),
    },
    {
      label: 'Regulatory risk',
      value: regulatoryAudit.riskLevel,
      detail: `${sourceCount} source link(s) saved for the legal and operating file.`,
      className: regulatoryRiskClass(regulatoryAudit.riskLevel),
    },
    {
      label: 'Payout proof',
      value: payoutProofLabel(firm),
      detail: `Payout risk is ${toEnglishText(firm.reviewSignals.payoutRisk).toLowerCase()} with ${firm.reviewSignals.payoutIncidentCount ?? firm.incidents} tracked signal(s).`,
      className: payoutProofClass(firm),
    },
    {
      label: 'Source depth',
      value: sourceDepthLabel(sourceCount),
      detail: firm.auditSourcesChecked.length
        ? `${firm.auditSourcesChecked.length} audit channel(s) checked by PropRadar.`
        : 'Audit channels still need to be expanded.',
      className: sourceDepthClass(sourceCount),
    },
  ];
  const faqTopChecks = topRiskPoints.length
    ? topRiskPoints.slice(0, 2).join(' ')
    : 'Check the legal entity, payout rules, current terms and recent public complaints before paying.';
  const firmFaq = [
    ...(searchProfile?.faq ?? []),
    {
      question: `Is ${firm.name} a safe prop firm?`,
      answer: `${firm.name} is classified by PropRadar as "${firmDecision}" with a ${firm.score}/100 score and ${firmRiskLabel(firm).toLowerCase()} risk posture. This is not a guarantee: read the legal file, payout rules and official terms before paying.`,
    },
    {
      question: `Is ${firm.name} legally verified?`,
      answer: `${legalVerificationLabel(firm)}. The current regulatory file is rated ${regulatoryAudit.riskLevel}, with ${sourceCount} saved source link(s) and a last legal check dated ${regulatoryAudit.lastChecked}.`,
    },
    {
      question: `Does ${firm.name} have payout risk?`,
      answer: `PropRadar rates payout risk as ${toEnglishText(firm.reviewSignals.payoutRisk).toLowerCase()} with ${firm.reviewSignals.payoutIncidentCount ?? firm.incidents} tracked signal(s). Visible payout proof is classified as ${payoutProofLabel(firm).toLowerCase()}.`,
    },
    {
      question: `What should I check before buying ${firm.name}?`,
      answer: faqTopChecks,
    },
    {
      question: `Does PropRadar have an affiliate relationship with ${firm.name}?`,
      answer: `Commercial status: ${relationshipLabel(firm.commercialRelationship)}. Affiliate status never protects a firm from score penalties, watchlist status or payout-risk warnings.`,
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
    inLanguage: 'en',
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
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Comparator',
        item: `${SITE_URL}/comparateur`,
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
        <Link href="/comparateur" className="firm-back-link">
          <span aria-hidden="true">&larr;</span>
          All firms
        </Link>

        <div className="pr-firm-hero">
          <div className="pr-firm-identity">
            <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="lg" />
            <div>
              <div className="eyebrow">{toEnglishText(firm.headquarters)} · founded {firm.founded}</div>
              <h1 className={firmTitleClass}>{firm.name}</h1>
              <div className="pr-firm-tags">
                <span className={`pr-tag pr-tone-${statusTone(firm.status)}`}>{operationalStatusLabel(firm)}</span>
                <span className={`pr-tag pr-tone-${firmRiskTone(firm)}`}>{firmRiskLabel(firm)}</span>
                {firm.commercialRelationship === 'Affiliation transparente' ? (
                  <span className="pr-tag pr-tag-affiliate" title="PropRadar may earn a commission. The score is not affected.">Affiliate link disclosed</span>
                ) : null}
              </div>
            </div>
          </div>

          {firm.listedDomainWarning ? (
            <p className="firm-domain-warning pr-firm-verdict" role="note">
              <strong>Domain warning.</strong> {firm.listedDomainWarning}
            </p>
          ) : (
            <p className="pr-firm-verdict">{toEnglishText(firm.verdict)}</p>
          )}

          <aside className="pr-firm-scorecard" aria-label={`${firm.name} PropRadar score`}>
            <ScoreRing score={firm.score} size="lg" animate />
            <div className="pr-firm-scorecard-body">
              <span className="pr-firm-scorecard-label">PropRadar score</span>
              <strong className={`pr-firm-decision pr-tone-${decisionTone(firmDecision)}`}>{firmDecision}</strong>
              <div className="pr-scorecard-pips">
                <RiskPip label="Payout" value={toEnglishText(firm.reviewSignals.payoutRisk)} tone={payoutTone(firm.reviewSignals.payoutRisk)} />
                <RiskPip label="Legal" value={regulatoryAudit.riskLevel} tone={legalTone(regulatoryAudit.riskLevel)} />
                <RiskPip label="Reviews" value={toEnglishText(firm.reviewSignals.manipulationRisk ?? 'Moyen')} tone={reviewTone(firm.reviewSignals.manipulationRisk)} />
              </div>
              <div className="pr-firm-actions">
                <Link href="/comparateur" className="btn">Compare</Link>
                <Link href="/#radar-weekly" className="pr-link">Set an alert</Link>
              </div>
            </div>
          </aside>
        </div>

        <dl className="pr-key-facts">
          <div><dt>From</dt><dd>{formatUsd(firm.priceFrom)}</dd></div>
          <div><dt>Profit split</dt><dd>{firm.profitSplit > 0 ? `${firm.profitSplit}%` : 'N/A'}</dd></div>
          <div><dt>Drawdown</dt><dd>{toEnglishText(firm.drawdownType)}</dd></div>
          <div><dt>News trading</dt><dd>{toEnglishText(firm.newsTrading)}</dd></div>
          <div><dt>Proof level</dt><dd>{toEnglishText(firm.auditStatus)}</dd></div>
          <div><dt>Last review</dt><dd><ReviewFreshness date={firm.lastReviewed} /></dd></div>
          <div className="pr-key-facts-wide"><dt>Payout</dt><dd>{toEnglishText(firm.payoutDelay)}</dd></div>
        </dl>

        {searchProfile ? (
          <article className="firm-search-answer" aria-labelledby={`search-answer-${firm.slug}`}>
            <div className="firm-search-answer-copy">
              <div className="firm-search-answer-heading">
                <div>
                  <div className="eyebrow">{searchProfile.eyebrow}</div>
                  <h2 id={`search-answer-${firm.slug}`}>{searchProfile.heading}</h2>
                </div>
                <span className={`badge ${firmRiskClass(firm)}`}>{firmRiskLabel(firm)} risk</span>
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
                <div className="eyebrow">Dated audit case</div>
                <h2 id={`case-timeline-${firm.slug}`}>{auditCaseFile.question}</h2>
                <p>{auditCaseFile.answer}</p>
              </div>
              <div className="firm-case-file-status">
                <span>{auditCaseFile.status}</span>
                <time dateTime={auditCaseFile.lastChecked}>Checked {auditCaseFile.lastChecked}</time>
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
                Platform access, broker routing, payment verification and legal continuity are separate dependencies. One failure can change the whole firm status.
              </figcaption>
            </figure>

            <ol className="firm-case-timeline">
              {auditCaseFile.events.map((event) => (
                <li key={`${event.date}-${event.label}`}>
                  <time dateTime={event.date}>{event.date}</time>
                  <div>
                    <strong>{event.label}</strong>
                    <p>{event.detail}</p>
                    <a href={event.sourceUrl} target="_blank" rel="noopener noreferrer">Open dated source</a>
                  </div>
                </li>
              ))}
            </ol>

            <div className="firm-case-open-points">
              <div>
                <span className="eyebrow">Still unresolved</span>
                <h3>What the public record does not prove.</h3>
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

        <section className="pr-firm-checks" id="decision" aria-label="Decision checks">
          <div className="pr-firm-proof">
            <h2>What the file proves</h2>
            <ul>
              {dueDiligenceChecks.map((check) => (
                <li key={check.label}>
                  <RiskPip label={check.label} value={check.value} tone={badgeTone(check.className)} />
                  <small>{check.detail}</small>
                </li>
              ))}
            </ul>
            <Link href="#regulatory" className="pr-link">Open the legal file <span aria-hidden="true">→</span></Link>
          </div>
          <div>
            <h2>Strengths on file</h2>
            <ul className="pr-check-list pr-check-good">
              {firmSpecificSignals.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </div>
          <div>
            <h2>Before you pay</h2>
            <ol className="pr-check-list pr-check-steps">
              {decisionChecklist.map((item) => <li key={item}>{item}</li>)}
            </ol>
          </div>
        </section>
        {firm.commercialNote ? (
          <p className="pr-firm-disclosure">
            <strong>Commercial transparency.</strong> {toEnglishText(firm.commercialNote)}
          </p>
        ) : null}

        {isBlueGuardian ? (
          <div className="panel blue-guardian-affiliate-panel">
            <div className="blue-guardian-affiliate-copy">
              <div className="eyebrow">Blue Guardian offer</div>
              <h2>Current checkout code: LAUNCH</h2>
              <p className="muted">
                Blue Guardian displayed a 40% checkout reduction with LAUNCH on 13 July 2026. The link below is affiliate-based,
                but the PropRadar score, payout risk, public signals and rule analysis remain independent from that relationship.
              </p>
              <div className="promo-proof-row">
                <span>Code LAUNCH</span>
                <span>40% shown at checkout</span>
                <span>Declared affiliate link</span>
              </div>
              <a href={BLUE_GUARDIAN_AFFILIATE_URL} target="_blank" rel="noreferrer sponsored" className="btn btn-primary">
                Open Blue Guardian and test LAUNCH
              </a>
            </div>
            <div className="blue-guardian-offer-card">
              <span>Official checkout code</span>
              <strong>LAUNCH</strong>
              <small>Confirm the 40% reduction on the selected program before payment.</small>
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

        <nav className="firm-tabs pr-subnav" aria-label="Firm page navigation">
          <a href="#decision">Decision</a>
          {auditCaseFile ? <a href="#case-timeline">Timeline</a> : null}
          <a href="#regulatory">Legal file</a>
          <a href="#audit">Reviews &amp; payouts</a>
          <a href="#produits">Products</a>
          <a href="#guides">Guides</a>
          <a href="#faq">FAQ</a>
          <a href="#sources">Sources</a>
        </nav>
      </section>

      <section className="container pr-section" id="regulatory" aria-labelledby={`legal-${firm.slug}`}>
        <header className="pr-section-head">
          <div>
            <div className="eyebrow">Legal file</div>
            <h2 id={`legal-${firm.slug}`}>Who you pay, and under which rules</h2>
          </div>
          <div className="pr-section-meta">
            <RiskPip label="Legal risk" value={regulatoryAudit.riskLevel} tone={legalTone(regulatoryAudit.riskLevel)} />
            <span>Checked <time dateTime={regulatoryAudit.lastChecked}>{regulatoryAudit.lastChecked}</time></span>
          </div>
        </header>
        <p className="pr-section-lead">{toEnglishText(regulatoryAudit.summary)}</p>

        {regulatoryAudit.entities.length ? (
          <div className="pr-entity-table" role="table" aria-label={`${firm.name} legal entities`}>
            <div className="pr-entity-head" role="row">
              <span role="columnheader">Entity</span>
              <span role="columnheader">Jurisdiction</span>
              <span role="columnheader">Role</span>
            </div>
            {regulatoryAudit.entities.map((entity) => (
              <div className="pr-entity-row" role="row" key={`${entity.name}-${entity.jurisdiction}`}>
                <span role="cell" className="pr-entity-name">
                  <strong>{toEnglishText(entity.name)}</strong>
                  {entity.registrationNumber ? <small>Registration {entity.registrationNumber}</small> : null}
                  {entity.registeredAddress ? <small>{toEnglishText(entity.registeredAddress)}</small> : null}
                </span>
                <span role="cell" className="pr-entity-place">{toEnglishText(entity.jurisdiction)}</span>
                <span role="cell" className="pr-entity-role">{entity.role ? toEnglishText(entity.role) : '—'}</span>
              </div>
            ))}
          </div>
        ) : null}

        <div className="pr-dossier">
          <DossierGroup title="Red flags" items={regulatoryAudit.redFlags} tone={regulatoryAudit.redFlags.length ? 'risk' : 'good'} open />
          <DossierGroup title="Regulator status" items={regulatoryAudit.regulatoryStatus} />
          <DossierGroup title="Complaints and disputes" items={regulatoryAudit.complaintsAndDisputes} />
          <details className="pr-dossier-group">
            <summary>
              <span className="pr-dossier-count">{(regulatoryAudit.sources.length ? regulatoryAudit.sources : firm.sources).length}</span>
              <strong>Legal sources</strong>
            </summary>
            {(regulatoryAudit.sources.length ? regulatoryAudit.sources : firm.sources).length > 0 ? (
              <ul className="pr-source-list">
                {(regulatoryAudit.sources.length ? regulatoryAudit.sources : firm.sources).map((source) => (
                  <li key={source.url}>
                    {isBlockedFirmUrl(firm, source.url)
                      ? <span>{toEnglishText(source.label)} (not linked)</span>
                      : <a href={source.url} target="_blank" rel="noreferrer">{toEnglishText(source.label)} <span>{sourceDomain(source.url)}</span></a>}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="pr-fineprint">Source links still need to be added for this legal file.</p>
            )}
          </details>
        </div>
      </section>

      <section className="container pr-section" id="audit" aria-labelledby={`reviews-${firm.slug}`}>
        <header className="pr-section-head">
          <div>
            <div className="eyebrow">Reviews and payouts</div>
            <h2 id={`reviews-${firm.slug}`}>What traders report</h2>
          </div>
          <div className="pr-section-meta">
            <RiskPip label="Payout risk" value={toEnglishText(firm.reviewSignals.payoutRisk)} tone={payoutTone(firm.reviewSignals.payoutRisk)} />
            <span>Payout check <time dateTime={firm.reviewSignals.lastSignalCheck}>{firm.reviewSignals.lastSignalCheck}</time></span>
          </div>
        </header>

        <div className="pr-signal-board">
          <div className="pr-signal-total">
            <span>Combined signal</span>
            <strong>{communityOverview.some((item) => item.estimated) ? '≈' : ''}{communitySignalScore}<small>/100</small></strong>
            <small>
              Reddit, X/Twitter, Trustpilot and payout risk.
              {communityOverview.some((item) => item.estimated) ? ' Includes editorial estimates.' : ''}
            </small>
          </div>
          <ul className="pr-signal-bars">
            {communityOverview.map((item) => (
              <li key={item.label} className={`pr-tone-${scoreTone(item.score)}${item.estimated ? ' is-estimate' : ''}`}>
                <span className="pr-signal-bar-label">
                  <strong>{item.label}</strong>
                  {item.estimated ? <em className="pr-tag" title="Editorial estimate: public mentions have not been counted yet.">Estimate</em> : null}
                </span>
                <span className="pr-signal-bar-track" aria-hidden="true">
                  <span style={{ width: `${Math.max(0, Math.min(100, item.score))}%` }} />
                </span>
                <span className="pr-signal-bar-value">{item.estimated ? '≈' : ''}{item.score}</span>
                <small>{item.volume} · {item.detail}</small>
              </li>
            ))}
          </ul>
          <p className="pr-signal-payout">
            <span className={`pr-pip-dot pr-tone-${payoutTone(firm.reviewSignals.payoutRisk)}`} aria-hidden="true" />
            Payout: {toEnglishText(firm.reviewSignals.payoutIncidentStatus)} · {firm.reviewSignals.payoutIncidentCount ?? firm.incidents} tracked signal(s)
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
            <span>Score breakdown</span>
            <small>Reddit, X/Twitter, Trustpilot and payout scores, with the flags behind them</small>
          </summary>
          <div className="grid-3">
            <div className="card">
              <div className="muted">Raw Reddit score</div>
              <div className="score">{firm.reviewSignals.redditScore}/100</div>
              <span className={`badge ${scoreClass(firm.reviewSignals.redditScore)}`}>{toEnglishText(firm.reviewSignals.redditSignal)}</span>
              {firm.reviewSignals.redditSource === 'Estimation PropRadar' ? <span className="badge badge-amber">Editorial estimate</span> : null}
              {hasMeasuredMentions(firm.reviewSignals.redditSource) ? (
                <div className="sentiment-breakdown">
                  <span><strong>{firm.reviewSignals.redditPositiveMentions ?? 0}</strong> positive</span>
                  <span><strong>{firm.reviewSignals.redditNegativeMentions ?? 0}</strong> negative</span>
                  <span><strong>{firm.reviewSignals.redditNeutralMentions ?? 0}</strong> neutral</span>
                </div>
              ) : null}
              <p className="muted" style={{ marginTop: 12, marginBottom: 0 }}>{toEnglishText(firm.reviewSignals.redditMentions)}</p>
              <div className="score-proof">
                {scoreProofRows(firm, 'reddit').map((row) => (
                  <div key={row.label}><span>{row.label}</span>{proofValue(row)}</div>
                ))}
              </div>
            </div>
            <div className="card">
              <div className="muted">Raw X/Twitter score</div>
              <div className="score">{firm.reviewSignals.xScore}/100</div>
              <span className={`badge ${scoreClass(firm.reviewSignals.xScore)}`}>{toEnglishText(firm.reviewSignals.xSignal)}</span>
              {firm.reviewSignals.xSource === 'Estimation PropRadar' ? <span className="badge badge-amber">Editorial estimate</span> : null}
              {hasMeasuredMentions(firm.reviewSignals.xSource) ? (
                <div className="sentiment-breakdown">
                  <span><strong>{firm.reviewSignals.xPositiveMentions ?? 0}</strong> positive</span>
                  <span><strong>{firm.reviewSignals.xNegativeMentions ?? 0}</strong> negative</span>
                  <span><strong>{firm.reviewSignals.xNeutralMentions ?? 0}</strong> neutral</span>
                </div>
              ) : null}
              <p className="muted" style={{ marginTop: 12, marginBottom: 0 }}>{toEnglishText(firm.reviewSignals.xMentions)}</p>
              <div className="score-proof">
                {scoreProofRows(firm, 'x').map((row) => (
                  <div key={row.label}><span>{row.label}</span>{proofValue(row)}</div>
                ))}
              </div>
            </div>
            <div className="card">
              <div className="muted">Trustpilot review reliability</div>
              <div className="score">{firm.reviewSignals.trustpilotReliabilityScore}/100</div>
              <span className={`badge ${reviewReliabilityClass(firm.reviewSignals.trustpilotReliability)}`}>{toEnglishText(firm.reviewSignals.trustpilotReliability)}</span>
              {!firm.trustpilotRating ? <span className="badge badge-amber">Provisional score</span> : null}
              <div className="sentiment-breakdown">
                {firm.trustpilotRating ? <span><strong>{firm.trustpilotRating}/5</strong> raw rating</span> : null}
                {firm.reviewSignals.trustpilotReviewCount ? <span><strong>{firm.reviewSignals.trustpilotReviewCount.toLocaleString('en-US')}</strong> reviews</span> : null}
                {firm.reviewSignals.trustpilotRatingWithheld
                  ? <span><strong>Rating withheld</strong> by Trustpilot</span>
                  : <span><strong>{firm.reviewSignals.trustpilotFlaggedReviewCount ?? 0}</strong> tracked review alert(s)</span>}
              </div>
              <p className="muted" style={{ marginTop: 12, marginBottom: 0 }}>{toEnglishText(firm.reviewSignals.trustpilotNote)}</p>
              {firm.reviewSignals.trustpilotSourceUrl ? (
                <a href={firm.reviewSignals.trustpilotSourceUrl} target="_blank" rel="noreferrer" className="quality-tag">
                  View Trustpilot page
                </a>
              ) : null}
              <div className="score-proof">
                {scoreProofRows(firm, 'trustpilot').map((row) => (
                  <div key={row.label}><span>{row.label}</span>{proofValue(row)}</div>
                ))}
              </div>
            </div>
            <div className="card">
              <div className="muted">Payout risk</div>
              <div className="score">{firm.reviewSignals.payoutRiskScore}/100</div>
              <span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{toEnglishText(firm.reviewSignals.payoutRisk)}</span>
              <p className="muted" style={{ marginTop: 12, marginBottom: 0 }}>
                {toEnglishText(firm.reviewSignals.payoutIncidentStatus)} · {firm.reviewSignals.payoutIncidentCount ?? firm.incidents} tracked signal(s)
              </p>
              <div className="score-proof">
                {scoreProofRows(firm, 'payout').map((row) => (
                  <div key={row.label}><span>{row.label}</span>{proofValue(row)}</div>
                ))}
              </div>
            </div>
          </div>
          {typeof manualReview.reddit.sampleSize === 'number' || typeof manualReview.x.sampleSize === 'number' ? (
          <div className="panel manual-review-panel">
            <div className="manual-review-header">
              <div>
                <div className="eyebrow">Manual Reddit/X Review</div>
                <h3>Manual collection queue</h3>
              </div>
              <span className={`badge ${manualCoverageClass(manualReview.coverage)}`}>{toEnglishText(manualReview.coverage)}</span>
            </div>
            <p className="muted">{toEnglishText(manualReview.summary)}</p>
            <div className="manual-review-grid">
              <ManualReviewChannel title="Reddit" channel={manualReview.reddit} />
              <ManualReviewChannel title="X/Twitter" channel={manualReview.x} />
            </div>
          </div>
          ) : null}
          <div className="signal-explain-grid">
            <div className="signal-explain-card">
              <div className="eyebrow">Reddit flags</div>
              <ul className="risk-list">
                {(firm.reviewSignals.redditFlags ?? []).map((flag) => <li key={flag}>{toEnglishText(flag)}</li>)}
              </ul>
            </div>
            <div className="signal-explain-card">
              <div className="eyebrow">X/Twitter watch</div>
              <ul className="risk-list">
                {(firm.reviewSignals.xFlags ?? []).map((flag) => <li key={flag}>{toEnglishText(flag)}</li>)}
              </ul>
            </div>
            <div className="signal-explain-card">
              <div className="eyebrow">Filtered Trustpilot</div>
              <p className="muted">
                {toEnglishText(firm.reviewSignals.trustpilotFlaggedReviewNote)}
              </p>
              <ul className="risk-list">
                {(firm.reviewSignals.trustpilotFlags ?? []).map((flag) => <li key={flag}>{toEnglishText(flag)}</li>)}
              </ul>
            </div>
            <div className="signal-explain-card">
              <div className="eyebrow">Manipulable Reviews</div>
              <div className="score">{firm.reviewSignals.manipulationRiskScore ?? 50}/100</div>
              <span className={`badge ${manipulationRiskClass(firm.reviewSignals.manipulationRisk ?? 'Moyen')}`}>
                {toEnglishText(firm.reviewSignals.manipulationRisk ?? 'Moyen')}
              </span>
              <div className="score-proof">
                {scoreProofRows(firm, 'manipulation').map((row) => (
                  <div key={row.label}><span>{row.label}</span>{proofValue(row)}</div>
                ))}
              </div>
            </div>
          </div>
        </details>
      </section>

      <section className="container section" id="produits">
        <div className="eyebrow">Products</div>
        <h2>Tracked offers</h2>
        {firm.products.length > 0 ? (
          <div className="grid-2">
            {firm.products.map((product) => (
              <article className="card product-card pr-product" key={product.id}>
                <div className="pr-product-tags">
                  <span className="pr-tag">{product.type}</span>
                  {product.isPopular ? <span className="pr-tag">Popular</span> : null}
                </div>
                <h3>{toEnglishText(product.name)}</h3>
                <p className="muted">{toEnglishText(product.description)}</p>
                <ChallengePath product={product} />
                <dl className="pr-product-meta">
                  <div><dt>Platforms</dt><dd>{product.platforms.map((platform) => toEnglishText(platform)).join(' · ')}</dd></div>
                  <div><dt>Assets</dt><dd>{product.tradableAssets.map((asset) => toEnglishText(asset)).join(' · ')}</dd></div>
                </dl>
                {product.hasConsistencyRule ? (
                  <p className="pr-product-rule pr-tone-watch">
                    <span className="pr-pip-dot" aria-hidden="true" />
                    {toEnglishText(product.consistencyRule ?? 'Règle de cohérence à vérifier')}
                  </p>
                ) : (
                  <p className="pr-product-rule pr-tone-good">
                    <span className="pr-pip-dot" aria-hidden="true" />
                    No major consistency rule flagged
                  </p>
                )}
                {product.linkToStart ? (
                  <a
                    href={product.linkToStart}
                    target="_blank"
                    rel={firm.commercialRelationship === 'Affiliation transparente' ? 'noreferrer sponsored' : 'noreferrer'}
                    className="btn btn-primary"
                  >
                    {firm.commercialRelationship === 'Affiliation transparente' ? 'Open through affiliate link' : 'Open official offer'}
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        ) : (
          <div className="panel">
            <h3>No active product recommended</h3>
            <p className="muted" style={{ marginBottom: 0 }}>
              This firm remains in the radar as a historical risk signal, but should not be considered a buying option.
            </p>
          </div>
        )}
      </section>

      <section className="container pr-section" id="guides" aria-labelledby={`guides-${firm.slug}`}>
        <header className="pr-section-head">
          <div>
            <div className="eyebrow">Related research</div>
            <h2 id={`guides-${firm.slug}`}>Guides that cover {firm.name}</h2>
          </div>
        </header>
        <ul className="pr-link-list">
          {editorialMentions.map(({ brief, section }) => (
            <li key={`${brief.slug}-${section.id}`}>
              <Link href={`${getEditorialBriefPath(brief)}#${section.id}`} className="pr-link-row">
                <span className="pr-link-row-tag">Risk Brief {String(brief.issueNumber).padStart(2, '0')}</span>
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
                <Link href={getSeoGuidePath(guide)} className="pr-link-row">
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
            <div className="eyebrow">Before paying</div>
            <h2 id={`faq-${firm.slug}`}>{firm.name}: common questions</h2>
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
            <div className="eyebrow">Sources</div>
            <h2 id={`sources-${firm.slug}`}>Proof and update history</h2>
          </div>
          <div className="pr-section-meta">
            <span className={`pr-tag pr-tone-${badgeTone(auditStatusClass(firm.auditStatus))}`}>{toEnglishText(firm.auditStatus)}</span>
          </div>
        </header>
        <div className="pr-sources-grid">
          <div className="pr-sources-main">
            <p className="pr-section-lead">{toEnglishText(firm.auditSummary)}</p>
            {firm.auditSourcesChecked.length ? (
              <p className="pr-checked-channels">
                <span>Checked</span>
                {firm.auditSourcesChecked.map((source) => <span className="pr-tag" key={source}>{toEnglishText(source)}</span>)}
              </p>
            ) : null}

            <h3>Incidents on file</h3>
            {hasConcretePayoutIssues(firm) ? (
              <ul className="pr-check-list pr-incident-list">
                {firm.reviewSignals.payoutIssues.map((incident) => <li key={incident}>{toEnglishText(incident)}</li>)}
              </ul>
            ) : (
              <p className="pr-fineprint">No detailed independent incident recorded. The profile stays cautious until rules, payouts and recent reviews are sourced more precisely.</p>
            )}
            <p className="pr-fineprint">{toEnglishText(firm.communitySignal)}</p>

            <h3>Sources to check</h3>
            <ul className="pr-source-list">
              {firm.sources.map((source) => (
                <li key={source.url}>
                  {isBlockedFirmUrl(firm, source.url)
                    ? <span>{toEnglishText(source.label)}</span>
                    : <a href={source.url} target="_blank" rel="noreferrer">{toEnglishText(source.label)} <span>{sourceDomain(source.url)}</span></a>}
                </li>
              ))}
            </ul>
            <p className="pr-fineprint">Last review {firm.lastReviewed}. Prices and rules can change: recheck the official sources before any decision.</p>
          </div>

          {firmChangelog.length ? (
            <RevealOnView className="firm-changelog pr-timeline">
              <h3 id="update-history">Update history</h3>
              <ol>
                {firmChangelog.map((entry, index) => (
                  <li key={`${entry.date}-${entry.summary.slice(0, 24)}`} style={{ '--i': index } as CSSProperties}>
                    <time dateTime={entry.date}>{entry.date}</time>
                    <p>{entry.summary}</p>
                    <a href={entry.source} target="_blank" rel="noopener noreferrer">
                      Source <span className="pr-timeline-domain">{sourceDomain(entry.source)}</span>
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
  items,
  tone,
  open = false,
}: {
  title: string;
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
        <p className="pr-fineprint">Nothing recorded at this check.</p>
      )}
    </details>
  );
}

function ManualReviewChannel({
  title,
  channel,
}: {
  title: string;
  channel: ReturnType<typeof getManualCommunityReview>['reddit'];
}) {
  return (
    <article className="manual-review-card">
      <div className="manual-review-card-top">
        <strong>{title}</strong>
        <span className={`badge ${manualCoverageClass(channel.coverage)}`}>{toEnglishText(channel.coverage)}</span>
      </div>
      {typeof channel.sampleSize === 'number' ? (
        <div className="sentiment-breakdown">
          <span><strong>{channel.positive ?? 0}</strong> positive</span>
          <span><strong>{channel.negative ?? 0}</strong> negative</span>
          <span><strong>{channel.neutral ?? 0}</strong> neutral</span>
          <span><strong>{channel.sampleSize}</strong> total</span>
        </div>
      ) : null}
      <p className="muted">{toEnglishText(channel.note)}</p>
      <ul className="source-list compact-source-list">
        {channel.sources.map((source) => (
          <li key={source.url}>
            <a href={source.url} target="_blank" rel="noreferrer">{toEnglishText(source.label)}</a>
          </li>
        ))}
      </ul>
    </article>
  );
}

function sourceDomain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}
