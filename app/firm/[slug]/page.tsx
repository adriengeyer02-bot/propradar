import Link from 'next/link';
import { notFound } from 'next/navigation';
import FirmLogo from '../../components/FirmLogo';
import {
  BLUE_GUARDIAN_AFFILIATE_URL,
  FTMO_AFFILIATE_URL,
  GOAT_FUNDED_TRADER_AFFILIATE_URL,
  PROPRADAR_PROMO_CODE,
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
} from '../../lib/propFirms';
import { SITE_NAME, SITE_URL } from '../../lib/site';
import { getFirmRelatedGuides, getSeoGuideDisplay, getSeoGuidePath } from '../../lib/seoGuides';
import { getManualCommunityReview, manualCoverageClass } from '../../lib/manualCommunityReviews';
import { FIRM_SEARCH_CONTENT_UPDATED_AT, getFirmSearchProfile } from '../../lib/firmSearchProfiles';
import { toEnglishText } from '../../lib/i18n';

type Props = {
  params: Promise<{ slug: string }>;
};

const FTMO_BANNER_URL = 'https://cdn.ftmo.com/aff-banner.160x600';
const THE5ERS_BANNER_URL = '/affiliates/the5ers-banner-passion-b.png';
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
  return isClosedFirm(firm) ? 'Closed' : 'Active';
}

function operationalStatusClass(firm: PropFirm) {
  return isClosedFirm(firm) ? 'badge-red' : 'badge-green';
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

function scoreProofRows(firm: PropFirm, kind: 'reddit' | 'x' | 'trustpilot' | 'payout' | 'manipulation'): ScoreProofRow[] {
  if (kind === 'reddit') {
    return [
      { label: 'Source', value: firm.reviewSignals.redditSource === 'Estimation PropRadar' ? 'PropRadar raw score, manual review to complete' : toEnglishText(firm.reviewSignals.redditSource ?? 'À documenter') },
      { label: 'Raw volume', value: `${firm.reviewSignals.redditSampleSize ?? 0} review(s) / mention(s)` },
      { label: 'Confidence', value: toEnglishText(firm.reviewSignals.redditConfidence ?? 'Faible') },
    ];
  }

  if (kind === 'x') {
    return [
      { label: 'Source', value: firm.reviewSignals.xSource === 'Estimation PropRadar' ? 'PropRadar raw score, manual review to complete' : toEnglishText(firm.reviewSignals.xSource ?? 'À documenter') },
      { label: 'Raw volume', value: `${firm.reviewSignals.xSampleSize ?? 0} review(s) / mention(s)` },
      { label: 'Confidence', value: toEnglishText(firm.reviewSignals.xConfidence ?? 'Faible') },
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
    { label: 'Review alert', value: `${firm.reviewSignals.trustpilotFlaggedReviewCount ?? 0} tracked alert(s)` },
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

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const firm = getFirmBySlug(slug);

  if (!firm) {
    return { title: 'Firm not found - PropRadar' };
  }

  const searchProfile = getFirmSearchProfile(firm.slug);
  const title = searchProfile?.metaTitle ?? `${firm.name} Review: Payout & Risk`;
  const description = searchProfile?.metaDescription ??
    `${firm.name} review: score ${firm.score}/100, payout risk ${toEnglishText(firm.reviewSignals.payoutRisk)}, legal risk ${firm.regulatoryAudit.riskLevel}. ${toEnglishText(firm.verdict)}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/firm/${firm.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/firm/${firm.slug}`,
      type: 'article',
      siteName: SITE_NAME,
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
  const relatedGuides = getFirmRelatedGuides(firm, 4);
  const manualReview = getManualCommunityReview(firm);
  const regulatoryAudit = firm.regulatoryAudit;
  const pageUrl = `${SITE_URL}/firm/${firm.slug}`;
  const firmDecision = decisionLabel(firm);
  const firmDecisionClass = decisionClass(firmDecision);
  const topRiskPoints = [
    ...regulatoryAudit.redFlags,
    ...firm.weaknesses,
    ...firm.reviewSignals.payoutIssues,
  ].slice(0, 4);
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
      volume: `${firm.reviewSignals.redditSampleSize ?? 0} public mention(s)`,
      detail: `+${firm.reviewSignals.redditPositiveMentions ?? 0} / -${firm.reviewSignals.redditNegativeMentions ?? 0}`,
    },
    {
      label: 'X/Twitter',
      score: firm.reviewSignals.xScore,
      volume: `${firm.reviewSignals.xSampleSize ?? 0} public mention(s)`,
      detail: `+${firm.reviewSignals.xPositiveMentions ?? 0} / -${firm.reviewSignals.xNegativeMentions ?? 0}`,
    },
    {
      label: 'Trustpilot',
      score: firm.reviewSignals.trustpilotReliabilityScore,
      volume: firm.trustpilotRating ? `${firm.trustpilotRating}/5 raw rating` : 'Raw rating not filled',
      detail: toEnglishText(firm.reviewSignals.trustpilotReliability),
    },
  ];
  const sourceCount = regulatoryAudit.sources.length || firm.sources.length;
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
  const weaknessMitigations = [
    'Read the exact official rules for the selected program before checkout.',
    firm.reviewSignals.payoutRiskScore >= 40
      ? 'Check recent payout proof and incident signals before paying.'
      : 'Still verify payout frequency, minimum withdrawal and KYC steps.',
    firm.newsTrading === 'Variable'
      ? 'Confirm news-trading restrictions on the exact account type.'
      : 'Confirm that your strategy is allowed before scaling size.',
  ];
  const faqTopChecks = topRiskPoints.length
    ? topRiskPoints.slice(0, 2).map((point) => toEnglishText(point)).join(' ')
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
    dateModified: searchProfile ? FIRM_SEARCH_CONTENT_UPDATED_AT : firm.lastReviewed,
    mainEntityOfPage: pageUrl,
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
      url: firm.sources[0]?.url ?? pageUrl,
    },
  };
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Organization',
      name: firm.name,
      url: firm.sources[0]?.url ?? pageUrl,
    },
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    datePublished: firm.lastReviewed,
    dateModified: firm.lastReviewed,
    reviewBody: toEnglishText(firm.verdict),
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

        <div className="panel firm-hero firm-hero-compact">
          <div className="firm-hero-copy">
            <div className="firm-cell firm-identity">
              <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="lg" />
              <div className="firm-identity-copy">
                <div className="eyebrow">{toEnglishText(firm.headquarters)} - Founded {firm.founded}</div>
                <h1 className="firm-title">{firm.name}</h1>
                <div className="firm-hero-badges">
                  <span className={`badge ${operationalStatusClass(firm)}`}>Status - {operationalStatusLabel(firm)}</span>
                  <span className={`badge ${firmRiskClass(firm)}`}>Risk - {firmRiskLabel(firm)}</span>
                </div>
              </div>
            </div>
            <p className="lead">{toEnglishText(firm.verdict)}</p>
          </div>
          <div className="card firm-score-ring-card">
            <div className="muted">PropRadar score</div>
            <div className="firm-score-ring" style={scoreRingStyle(firm.score)} aria-label={`PropRadar score ${firm.score} out of 100`}>
              <div className="firm-score-ring-core">
                <strong>{firm.score}</strong>
                <span>/100</span>
              </div>
            </div>
            <p>Weighted from rules, payouts, public reviews and proof level.</p>
            <div style={{ marginTop: 12 }}>
              <span className={`badge ${relationshipClass(firm.commercialRelationship)}`}>{relationshipLabel(firm.commercialRelationship)}</span>
            </div>
            <div className="firm-score-actions">
              <Link href="/#radar-weekly" className="btn btn-primary">Set alert</Link>
              <Link href="/comparateur" className="btn">Compare</Link>
            </div>
          </div>
        </div>

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

        <div className="stat-strip">
          <div className="stat firm-metric-card" title="Entry fee or lowest visible program price tracked by PropRadar.">
            <span className="metric-icon" aria-hidden="true">$</span>
            <span>Minimum price</span><strong>{formatUsd(firm.priceFrom)}</strong>
          </div>
          <div className="stat firm-metric-card" title="Advertised trader profit split, weighted separately from payout reliability.">
            <span className="metric-icon" aria-hidden="true">%</span>
            <span>Profit split</span><strong>{firm.profitSplit > 0 ? `${firm.profitSplit}%` : 'N/A'}</strong>
          </div>
          <div className="stat firm-metric-card" title="Drawdown model to verify before choosing a program.">
            <span className="metric-icon" aria-hidden="true">DD</span>
            <span>Drawdown</span><strong>{toEnglishText(firm.drawdownType)}</strong>
          </div>
          <div className="stat firm-metric-card" title="News trading status can differ between challenge and funded accounts.">
            <span className="metric-icon" aria-hidden="true">N</span>
            <span>News trading</span><strong>{toEnglishText(firm.newsTrading)}</strong>
          </div>
          <div className="stat firm-metric-card" title="Advertised payout delay or payout rule summary to verify in official conditions.">
            <span className="metric-icon" aria-hidden="true">P</span>
            <span>Payout</span><strong>{toEnglishText(firm.payoutDelay)}</strong>
          </div>
        </div>

        <div className="firm-proof-snapshot">
          <div>
            <span>Proof level</span>
            <strong>{toEnglishText(firm.auditStatus)}</strong>
          </div>
          <div>
            <span>Last review</span>
            <strong>{firm.lastReviewed}</strong>
          </div>
          <div>
            <span>Payout risk</span>
            <strong className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{toEnglishText(firm.reviewSignals.payoutRisk)}</strong>
          </div>
          <div>
            <span>Trustpilot reliability</span>
            <strong className={`badge ${reviewReliabilityClass(firm.reviewSignals.trustpilotReliability)}`}>{toEnglishText(firm.reviewSignals.trustpilotReliability)}</strong>
          </div>
        </div>
        <div className={`panel firm-decision-panel ${firmDecisionClass}`}>
          <div className="firm-decision-main">
            <span>PropRadar action</span>
            <strong>{firmDecision}</strong>
            <p>{decisionDetail(firm, firmDecision)}</p>
          </div>
          <div className="firm-decision-grid">
            <div>
              <span>Risk posture</span>
              <strong>{firmRiskLabel(firm)}</strong>
              <small>Score {firm.score}/100, payout risk {toEnglishText(firm.reviewSignals.payoutRisk).toLowerCase()}.</small>
            </div>
            <div>
              <span>Regulatory file</span>
              <strong>{regulatoryAudit.riskLevel}</strong>
              <small>{regulatoryAudit.sources.length || firm.sources.length} source link(s) available.</small>
            </div>
            <div>
              <span>Community signal</span>
              <strong>{communitySignalScore}/100</strong>
              <small>Reddit, X/Twitter, Trustpilot and payout signals combined.</small>
            </div>
          </div>
          <div className="firm-decision-lists">
            <div>
              <span>Top points to verify</span>
              <ul>
                {topRiskPoints.map((point) => <li key={point}>{toEnglishText(point)}</li>)}
              </ul>
            </div>
            <div>
              <span>Before paying</span>
              <ul>
                {decisionChecklist.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
        <div className="panel firm-due-diligence-panel">
          <div className="firm-due-diligence-head">
            <div>
              <div className="eyebrow">Due Diligence Snapshot</div>
              <h2>What the profile proves before checkout</h2>
            </div>
            <Link href="#regulatory" className="btn">Open legal file</Link>
          </div>
          <div className="firm-due-diligence-grid">
            {dueDiligenceChecks.map((check) => (
              <article className="firm-due-diligence-item" key={check.label}>
                <span>{check.label}</span>
                <strong className={`badge ${check.className}`}>{check.value}</strong>
                <small>{check.detail}</small>
              </article>
            ))}
          </div>
          <p>
            PropRadar separates operating status, legal entity mapping, payout evidence and commercial conflicts so a high discount or public rating does not hide purchase risk.
          </p>
        </div>
        {firm.commercialNote ? (
          <div className="panel" style={{ marginTop: 18 }}>
            <div className="eyebrow">Commercial transparency</div>
            <p className="muted" style={{ marginBottom: 0 }}>{toEnglishText(firm.commercialNote)}</p>
          </div>
        ) : null}

        {isBlueGuardian ? (
          <div className="panel blue-guardian-affiliate-panel">
            <div className="blue-guardian-affiliate-copy">
              <div className="eyebrow">Blue Guardian Partner</div>
              <h2>PropRadar Blue Guardian code: {PROPRADAR_PROMO_CODE}</h2>
              <p className="muted">
                Use the PropRadar affiliate link, then verify the code at checkout. Blue Guardian is still evaluated separately:
                score, payout risk, Reddit/X signals, Trustpilot and trading rules are not changed by the affiliate relationship.
              </p>
              <div className="promo-proof-row">
                <span>Code {PROPRADAR_PROMO_CODE}</span>
                <span>Declared affiliate link</span>
                <span>Verify at checkout</span>
              </div>
              <a href={BLUE_GUARDIAN_AFFILIATE_URL} target="_blank" rel="noreferrer sponsored" className="btn btn-primary">
                Open Blue Guardian with the code
              </a>
            </div>
            <div className="blue-guardian-offer-card">
              <span>PropRadar offer</span>
              <strong>{PROPRADAR_PROMO_CODE}</strong>
              <small>Forex, Futures and Blue Guardian programs depending on checkout availability.</small>
            </div>
          </div>
        ) : null}

        {isThe5ers ? (
          <div className="panel the5ers-affiliate-panel">
            <div className="the5ers-affiliate-copy">
              <div className="eyebrow">The5ers Partner</div>
              <h2>PropRadar The5ers discount code: {THE5ERS_PROMO_CODE}</h2>
              <p className="muted">
                The link is affiliate-based and the coupon must be verified at checkout. The PropRadar score remains independent:
                rules, payout, Trustpilot, Reddit/X and proof level are read separately from the commercial relationship.
              </p>
              <div className="promo-proof-row">
                <span>Coupon {THE5ERS_PROMO_CODE}</span>
                <span>Declared affiliate link</span>
                <span>Independent score</span>
              </div>
              <a href={THE5ERS_AFFILIATE_URL} target="_blank" rel="noreferrer sponsored" className="btn btn-primary">
                Open The5ers with the coupon
              </a>
            </div>
            <a href={THE5ERS_AFFILIATE_URL} target="_blank" rel="noreferrer sponsored" className="the5ers-banner-link">
              <img src={THE5ERS_BANNER_URL} alt="The5ers Affiliate - Turn your passion into a trading career" />
            </a>
          </div>
        ) : null}

        {isGoatFundedTrader ? (
          <div className="panel goat-affiliate-panel">
            <div className="goat-affiliate-copy">
              <div className="eyebrow">GOAT Funded Trader Partner</div>
              <h2>PropRadar GFT code: {PROPRADAR_PROMO_CODE}</h2>
              <p className="muted">
                Use the PropRadar signup link, then test the code at checkout. GOAT Funded Trader is still evaluated separately:
                score, payout risk, Trustpilot, Reddit/X, news rules and weekend holding are not changed by the affiliate relationship.
              </p>
              <div className="promo-proof-row">
                <span>Code {PROPRADAR_PROMO_CODE}</span>
                <span>Affiliate signup link</span>
                <span>Verify at checkout</span>
              </div>
              <a href={GOAT_FUNDED_TRADER_AFFILIATE_URL} target="_blank" rel="noreferrer sponsored" className="btn btn-primary">
                Open GFT with the code
              </a>
            </div>
            <div className="goat-offer-card">
              <span>PropRadar code</span>
              <strong>{PROPRADAR_PROMO_CODE}</strong>
              <small>1 step, 2 step, 3 step and Instant depending on checkout availability.</small>
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
            <a href={FTMO_AFFILIATE_URL} target="_blank" rel="noreferrer sponsored" className="ftmo-banner-link">
              <img src={FTMO_BANNER_URL} alt="FTMO.com - For serious traders" />
            </a>
          </div>
        ) : null}

        <nav className="firm-tabs" aria-label="Firm page navigation">
          <a href="#lecture">Quick read</a>
          <a href="#regulatory">Regulatory check</a>
          <a href="#audit">Reviews & payouts</a>
          <a href="#produits">Products</a>
          <a href="#guides">Related guides</a>
          <a href="#faq">FAQ</a>
          <a href="#sources">Sources & proof</a>
        </nav>
      </section>

      <section className="container section quick-read-section" id="lecture">
        <div className="grid-2">
          <div className="panel quick-read-card quick-read-strong">
            <div className="eyebrow">Quick Read</div>
            <h2>Strengths</h2>
            <ul className="risk-list">
              {firm.strengths.map((item) => <li key={item}>{toEnglishText(item)}</li>)}
            </ul>
          </div>
          <div className="panel quick-read-card quick-read-watch">
            <div className="eyebrow">Watch Points</div>
            <h2>Weaknesses</h2>
            <ul className="risk-list">
              {firm.weaknesses.map((item) => <li key={item}>{toEnglishText(item)}</li>)}
            </ul>
            <div className="risk-mitigation">
              <span>How to reduce this risk</span>
              <ul>
                {weaknessMitigations.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container section regulatory-section" id="regulatory">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Regulatory Check</div>
            <h2>Legal entities, regulator status and red flags</h2>
          </div>
          <span className={`badge ${regulatoryRiskClass(regulatoryAudit.riskLevel)}`}>
            Regulatory risk - {regulatoryAudit.riskLevel}
          </span>
        </div>
        <div className="regulatory-grid">
          <article className="panel regulatory-summary-card">
            <div className="regulatory-summary-top">
              <div>
                <span>Last checked</span>
                <strong>{regulatoryAudit.lastChecked}</strong>
              </div>
              <span className={`badge ${regulatoryRiskClass(regulatoryAudit.riskLevel)}`}>{regulatoryAudit.riskLevel}</span>
            </div>
            <p>{toEnglishText(regulatoryAudit.summary)}</p>
            <div className="regulatory-source-strip">
              <span>Audit sources</span>
              <strong>{regulatoryAudit.sources.length || firm.sources.length}</strong>
            </div>
          </article>

          <article className="panel regulatory-entity-card">
            <div className="eyebrow">Identified Legal Entities</div>
            <div className="regulatory-entity-list">
              {regulatoryAudit.entities.map((entity) => (
                <div className="regulatory-entity-item" key={`${entity.name}-${entity.jurisdiction}`}>
                  <div>
                    <strong>{toEnglishText(entity.name)}</strong>
                    <span>{toEnglishText(entity.jurisdiction)}</span>
                  </div>
                  {entity.registrationNumber ? <small>Registration: {entity.registrationNumber}</small> : null}
                  {entity.registeredAddress ? <small>{toEnglishText(entity.registeredAddress)}</small> : null}
                  {entity.role ? <p>{toEnglishText(entity.role)}</p> : null}
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="regulatory-detail-grid">
          <article className="regulatory-detail-card">
            <div className="eyebrow">Regulator Status</div>
            <ul className="risk-list">
              {regulatoryAudit.regulatoryStatus.map((item) => <li key={item}>{toEnglishText(item)}</li>)}
            </ul>
          </article>
          <article className="regulatory-detail-card">
            <div className="eyebrow">Complaints & Disputes</div>
            <ul className="risk-list">
              {regulatoryAudit.complaintsAndDisputes.map((item) => <li key={item}>{toEnglishText(item)}</li>)}
            </ul>
          </article>
          <article className="regulatory-detail-card regulatory-red-card">
            <div className="eyebrow">Red Flags</div>
            <ul className="risk-list">
              {regulatoryAudit.redFlags.map((item) => <li key={item}>{toEnglishText(item)}</li>)}
            </ul>
          </article>
          <article className="regulatory-detail-card">
            <div className="eyebrow">Source Links</div>
            {(regulatoryAudit.sources.length ? regulatoryAudit.sources : firm.sources).length > 0 ? (
              <ul className="source-list compact-source-list">
                {(regulatoryAudit.sources.length ? regulatoryAudit.sources : firm.sources).map((source) => (
                  <li key={source.url}>
                    <a href={source.url} target="_blank" rel="noreferrer">{toEnglishText(source.label)}</a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted">Source links still need to be added for this regulatory file.</p>
            )}
          </article>
        </div>
      </section>

      <section className="container section" id="audit">
        <div className="eyebrow">Reviews, Reddit and payouts</div>
        <h2>Filtered community signal</h2>
        <div className="community-overview-panel">
          <div className="community-overview-main">
            <span>Aggregated signal</span>
            <strong>{communitySignalScore}/100</strong>
            <small>Reddit, X/Twitter, Trustpilot reliability and payout risk combined.</small>
          </div>
          <div className="community-overview-grid">
            {communityOverview.map((item) => (
              <article className={`community-overview-card ${signalToneClass(item.score)}`} key={item.label}>
                <div>
                  <span>{item.label}</span>
                  <strong>{item.score}/100</strong>
                </div>
                <div className="signal-meter" aria-hidden="true">
                  <span style={{ width: `${Math.max(0, Math.min(100, item.score))}%` }} />
                </div>
                <small>{item.volume} · {item.detail}</small>
              </article>
            ))}
          </div>
          <div className="payout-timeline">
            <span>Last payout check</span>
            <strong>{firm.reviewSignals.lastSignalCheck}</strong>
            <small>{toEnglishText(firm.reviewSignals.payoutIncidentStatus)} · {firm.reviewSignals.payoutIncidentCount ?? firm.incidents} tracked signal(s)</small>
          </div>
        </div>
        <div className="grid-3">
          <div className="card">
            <div className="muted">Raw Reddit score</div>
            <div className="score">{firm.reviewSignals.redditScore}/100</div>
            <span className={`badge ${scoreClass(firm.reviewSignals.redditScore)}`}>{toEnglishText(firm.reviewSignals.redditSignal)}</span>
            {firm.reviewSignals.redditSource === 'Estimation PropRadar' ? <span className="badge badge-amber">Manual raw score</span> : null}
            <div className="sentiment-breakdown">
              <span><strong>{firm.reviewSignals.redditPositiveMentions ?? 0}</strong> positive</span>
              <span><strong>{firm.reviewSignals.redditNegativeMentions ?? 0}</strong> negative</span>
              <span><strong>{firm.reviewSignals.redditNeutralMentions ?? 0}</strong> neutral</span>
            </div>
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
            {firm.reviewSignals.xSource === 'Estimation PropRadar' ? <span className="badge badge-amber">Manual raw score</span> : null}
            <div className="sentiment-breakdown">
              <span><strong>{firm.reviewSignals.xPositiveMentions ?? 0}</strong> positive</span>
              <span><strong>{firm.reviewSignals.xNegativeMentions ?? 0}</strong> negative</span>
              <span><strong>{firm.reviewSignals.xNeutralMentions ?? 0}</strong> neutral</span>
            </div>
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
              <span><strong>{firm.reviewSignals.trustpilotFlaggedReviewCount ?? 0}</strong> tracked review alert(s)</span>
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
        <div className="panel radar-verdict">
          <div>
            <div className="eyebrow">Radar Verdict</div>
            <p className="lead">{toEnglishText(firm.reviewSignals.radarVerdict)}</p>
          </div>
          <ul className="mini-list">
            {(firm.reviewSignals.confidenceDrivers ?? []).map((driver) => <li key={driver}>{toEnglishText(driver)}</li>)}
          </ul>
        </div>
      </section>

      <section className="container section" id="produits">
        <div className="eyebrow">Products</div>
        <h2>Tracked offers</h2>
        {firm.products.length > 0 ? (
          <div className="grid-2">
            {firm.products.map((product) => (
              <article className="card product-card" key={product.id}>
                <div>
                  <span className="badge badge-green">{product.type}</span>
                  {product.isPopular ? <span className="badge badge-amber" style={{ marginLeft: 8 }}>Popular</span> : null}
                </div>
                <h3>{toEnglishText(product.name)}</h3>
                <p className="muted">{toEnglishText(product.description)}</p>
                <div className="stat-strip" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
                  <div className="stat"><span>Account</span><strong>{formatUsd(product.accountSizeMin)} - {formatUsd(product.accountSizeMax)}</strong></div>
                  <div className="stat"><span>Fee</span><strong>{product.entryFeeMin ? `${formatUsd(product.entryFeeMin)}+` : 'By size / checkout'}</strong></div>
                  <div className="stat"><span>Target</span><strong>{toEnglishText(product.profitTarget)}</strong></div>
                  <div className="stat"><span>Max drawdown</span><strong>{toEnglishText(product.maxDrawdown)}</strong></div>
                  <div className="stat"><span>Daily loss</span><strong>{toEnglishText(product.maxDailyLoss)}</strong></div>
                  <div className="stat"><span>Split</span><strong>{toEnglishText(product.profitSplit)}</strong></div>
                </div>
                <div>
                  <strong>Platforms</strong>
                  <ul className="mini-list" style={{ marginTop: 8 }}>
                    {product.platforms.map((platform) => <li key={platform}>{toEnglishText(platform)}</li>)}
                  </ul>
                </div>
                <div>
                  <strong>Assets</strong>
                  <ul className="mini-list" style={{ marginTop: 8 }}>
                    {product.tradableAssets.map((asset) => <li key={asset}>{toEnglishText(asset)}</li>)}
                  </ul>
                </div>
                <div className={`badge ${product.hasConsistencyRule ? 'badge-amber' : 'badge-green'}`}>
                  {product.hasConsistencyRule ? toEnglishText(product.consistencyRule ?? 'Règle de cohérence à vérifier') : 'No major consistency rule flagged'}
                </div>
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

      <section className="container section" id="guides">
        <div className="section-heading">
          <div>
            <div className="eyebrow">SEO Internal Links</div>
            <h2>PropRadar guides related to {firm.name}</h2>
          </div>
          <p className="section-note">
            These links connect the firm page to the searches traders actually type before choosing.
          </p>
        </div>
        <div className="guide-entry-grid firm-guide-grid">
          {relatedGuides.map((guide) => (
            <Link href={getSeoGuidePath(guide)} className="guide-entry-card" key={guide.slug}>
              <span>{getSeoGuideDisplay(guide).eyebrow}</span>
              <strong>{getSeoGuideDisplay(guide).title}</strong>
              <small>{getSeoGuideDisplay(guide).answer}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section firm-faq-section" id="faq">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Decision FAQ</div>
            <h2>{firm.name} questions before paying</h2>
          </div>
          <p className="section-note">
            Short answers built from the current PropRadar score, regulatory file, payout risk and source stack.
          </p>
        </div>
        <div className="firm-faq-grid">
          {firmFaq.map((item) => (
            <article className="firm-faq-card" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container section" id="sources">
        <div className="grid-2">
          <div className="panel">
            <div className="eyebrow">Operational Risk</div>
            <h2>Incidents and signals</h2>
            {hasConcretePayoutIssues(firm) ? (
              <ul className="risk-list">
                {firm.reviewSignals.payoutIssues.map((incident) => <li key={incident}>{toEnglishText(incident)}</li>)}
              </ul>
            ) : (
              <div className="evidence-empty">
                <strong>No detailed independent incident in PropRadar.</strong>
                <span>The profile stays cautious until rules, payouts and recent reviews are sourced more precisely.</span>
              </div>
            )}
            <p className="muted" style={{ marginTop: 18, marginBottom: 0 }}>{toEnglishText(firm.communitySignal)}</p>
          </div>
          <div className="panel">
            <div className="eyebrow">Sources</div>
            <h2>Proof level</h2>
            <div className="audit-source-summary">
              <span className={`badge ${auditStatusClass(firm.auditStatus)}`}>{toEnglishText(firm.auditStatus)}</span>
              <p className="muted">{toEnglishText(firm.auditSummary)}</p>
              <div className="audit-source-chips">
                {firm.auditSourcesChecked.map((source) => <span key={source}>{toEnglishText(source)}</span>)}
              </div>
            </div>
            <h3>Sources to check</h3>
            <ul className="source-list">
              {firm.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noreferrer">{toEnglishText(source.label)}</a>
                </li>
              ))}
            </ul>
            <p className="muted" style={{ marginTop: 18, marginBottom: 0 }}>
              Last review: {firm.lastReviewed}. Prices and rules should be rechecked on official sources before any decision.
            </p>
          </div>
        </div>
      </section>
    </main>
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
