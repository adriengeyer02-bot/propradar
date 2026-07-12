'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import FirmLogo from '../components/FirmLogo';
import type { PropFirm } from '../lib/propFirms';
import {
  activeFirms,
  auditStatusClass,
  formatUsd,
  manipulationRiskClass,
  payoutRiskClass,
  propFirms,
  regulatoryRiskClass,
  relationshipClass,
  reviewReliabilityClass,
  riskyFirms,
  scoreClass,
  statusClass,
} from '../lib/propFirms';
import { toEnglishText } from '../lib/i18n';
import { SITE_URL } from '../lib/site';

type StatusFilter = 'Tous' | 'Active' | 'À surveiller' | 'Fermée';
type MarketFilter = 'Tous' | 'Forex' | 'Futures' | 'Actions' | 'Crypto';
type ScoreFilter = 'Tous' | '70' | '80' | '90';
type PriceFilter = 'Tous' | '50' | '100' | '200';
type DrawdownFilter = 'Tous' | 'EOD' | 'Trailing' | 'Static' | 'Hybride';
type LegalFilter = 'Tous' | 'verified' | 'watch' | 'deep';

const statusFilters: StatusFilter[] = ['Tous', 'Active', 'À surveiller', 'Fermée'];
const PAGE_SIZE = 20;
const DATA_UPDATED_AT = '2026-07-12';

const QUICK_SEARCHES = [
  { label: 'Futures', query: 'futures' },
  { label: 'No consistency rule', query: 'no consistency rule' },
  { label: 'News allowed', query: 'news allowed' },
  { label: 'Instant funding', query: 'instant funding' },
  { label: 'MT5', query: 'mt5' },
  { label: 'Legal watch', query: 'legal watch' },
] as const;

const FIRM_SEARCH_ALIASES: Record<string, string[]> = {
  myfundedfutures: ['MFFU', 'MFF Futures'],
  myforexfunds: ['MFF', 'MyForexFunds'],
  'the-funded-trader': ['TFT'],
  'goat-funded-trader': ['GFT'],
  'funded-trading-plus': ['FTP'],
  'take-profit-trader': ['TPT'],
  'alpha-capital-group': ['ACG'],
  'city-traders-imperium': ['CTI'],
};

function jsonLd(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, '\\u003c'),
  };
}

function SignalDots({ score, tone = 'blue' }: { score: number; tone?: 'blue' | 'orange' | 'green' | 'red' }) {
  const filled = Math.max(1, Math.min(5, Math.round(score / 20)));

  return (
    <span className="dot-rating" aria-label={`${score}/100`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className={`dot ${index < filled ? `dot-${tone}` : ''}`} />
      ))}
    </span>
  );
}

function tradingStyleTags(firm: PropFirm) {
  const tags = new Set<string>();
  const text = `${firm.styles.join(' ')} ${firm.bestFor}`.toLowerCase();

  if (text.includes('swing')) tags.add('Swing');
  if (text.includes('scalping')) tags.add('Scalping');
  if (text.includes('intraday')) tags.add('Intraday');
  if (text.includes('formation')) tags.add('Formation');
  if (text.includes('futures')) tags.add('Futures');
  if (text.includes('crypto')) tags.add('Crypto');
  if (!tags.has('Swing') && firm.drawdownType !== 'Trailing') tags.add('Swing to confirm');
  tags.add('Manual SMC');

  if (firm.newsTrading === 'Autorisé' || firm.newsTrading === 'Allowed') tags.add('News');
  if (firm.newsTrading === 'Restreint' || firm.newsTrading === 'Restricted') tags.add('Restricted news');
  if (firm.newsTrading === 'Non recommandé' || firm.newsTrading === 'Not recommended') tags.add('News blocked');
  if (firm.newsTrading === 'Variable') tags.add('News to verify');

  if (firm.eaAllowed === 'Oui' || firm.eaAllowed === 'Yes') tags.add('EA');
  if (firm.eaAllowed === 'Sur demande' || firm.eaAllowed === 'On request') tags.add('EA on request');
  if (firm.eaAllowed === 'Variable') tags.add('EA to verify');

  return Array.from(tags).slice(0, 6);
}

function scoreToneClass(score: number) {
  if (score >= 75) return 'signal-chip-good';
  if (score >= 55) return 'signal-chip-watch';
  return 'signal-chip-risk';
}

function riskToneClass(score: number) {
  if (score >= 65) return 'signal-chip-risk';
  if (score >= 40) return 'signal-chip-watch';
  return 'signal-chip-good';
}

function rowToneClass(firm: PropFirm) {
  if (firm.score >= 80 && firm.reviewSignals.payoutRiskScore < 40) return 'firm-result-strong';
  if (firm.score < 55 || firm.reviewSignals.payoutRiskScore >= 65) return 'firm-result-risk';
  if (firm.score < 70 || firm.reviewSignals.payoutRiskScore >= 40 || firm.status !== 'Active') return 'firm-result-watch';
  return 'firm-result-neutral';
}

function legalSourceCount(firm: PropFirm) {
  return firm.regulatoryAudit.sources.length || firm.sources.length;
}

function isLegalWatchFirm(firm: PropFirm) {
  const risk = firm.regulatoryAudit.riskLevel;
  return !firm.legalVerified || risk === 'High' || risk === 'Critical' || risk === 'To audit';
}

function legalRiskWeight(firm: PropFirm) {
  const risk = firm.regulatoryAudit.riskLevel;
  const riskScore =
    risk === 'Critical' ? 100 :
    risk === 'High' ? 85 :
    risk === 'To audit' ? 72 :
    risk === 'Medium to high' ? 62 :
    risk === 'Medium' ? 48 :
    24;

  return riskScore + (firm.legalVerified ? 0 : 18) + (legalSourceCount(firm) < 2 ? 10 : 0);
}

function sourceDepthLabel(firm: PropFirm) {
  const count = legalSourceCount(firm);
  if (count >= 5) return 'Deep sources';
  if (count >= 3) return 'Usable sources';
  if (count >= 1) return 'Thin sources';
  return 'No sources';
}

function sourceDepthClass(firm: PropFirm) {
  const count = legalSourceCount(firm);
  if (count >= 5) return 'badge-green';
  if (count >= 2) return 'badge-amber';
  return 'badge-red';
}

type FirmSearchField = {
  label: string;
  searchable: string;
  display: string;
  weight: number;
};

type FirmSearchMatch = {
  score: number;
  label: string;
  display: string;
};

type IndexedFirmSearchField = FirmSearchField & {
  normalized: string;
  compact: string;
  words: string[];
};

function normalizeFirmSearch(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function uniqueSearchValues(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function generatedFirmAliases(firm: PropFirm) {
  const wordInitials = normalizeFirmSearch(firm.name)
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .join('');
  const camelInitials = (firm.name.match(/[A-Z0-9][a-z0-9]*/g) ?? [])
    .map((word) => word[0])
    .join('');

  return uniqueSearchValues([
    firm.slug.replace(/-/g, ' '),
    wordInitials,
    camelInitials,
    firm.logoDomain ?? '',
    ...(FIRM_SEARCH_ALIASES[firm.slug] ?? []),
  ]);
}

function platformSearchValue(platform: string) {
  const normalized = normalizeFirmSearch(platform);
  const aliases = [platform];

  if (normalized.includes('metatrader 5')) aliases.push('MT5');
  if (normalized.includes('metatrader 4')) aliases.push('MT4');
  if (normalized.includes('ctrader')) aliases.push('cTrader');
  if (normalized.includes('tradelocker')) aliases.push('TradeLocker');
  if (normalized.includes('tradovate')) aliases.push('Tradovate');
  if (normalized.includes('ninjatrader')) aliases.push('NinjaTrader');

  return uniqueSearchValues(aliases).join(' ');
}

function buildFirmSearchFields(firm: PropFirm): FirmSearchField[] {
  const fields: FirmSearchField[] = [
    {
      label: 'Firm name',
      searchable: `${firm.name} ${generatedFirmAliases(firm).join(' ')}`,
      display: firm.name,
      weight: 120,
    },
    {
      label: 'Trading fit',
      searchable: `${firm.styles.join(' ')} ${firm.styles.map((style) => toEnglishText(style)).join(' ')} ${firm.bestFor}`,
      display: `${firm.styles.map((style) => toEnglishText(style)).join(' / ')} - ${toEnglishText(firm.bestFor)}`,
      weight: 78,
    },
    {
      label: 'Location',
      searchable: firm.headquarters,
      display: firm.headquarters,
      weight: 72,
    },
    {
      label: 'Status',
      searchable: `${firm.status} ${toEnglishText(firm.status)} ${firm.status === 'Active' ? 'operating current' : ''}`,
      display: toEnglishText(firm.status),
      weight: 72,
    },
    {
      label: 'Core rules',
      searchable: [
        `drawdown ${firm.drawdownType}`,
        `news trading ${firm.newsTrading} ${toEnglishText(firm.newsTrading)}`,
        `EA algo bot ${firm.eaAllowed} ${toEnglishText(firm.eaAllowed)}`,
        `payout delay ${firm.payoutDelay}`,
      ].join(' '),
      display: `${toEnglishText(firm.drawdownType)} drawdown - News ${toEnglishText(firm.newsTrading)} - EA ${toEnglishText(firm.eaAllowed)}`,
      weight: 76,
    },
    {
      label: 'Legal file',
      searchable: isLegalWatchFirm(firm)
        ? `legal watch entity unverified entity not confirmed ${firm.regulatoryAudit.riskLevel}`
        : `legal verified entity mapped legal file ${firm.regulatoryAudit.riskLevel}`,
      display: `${isLegalWatchFirm(firm) ? 'Legal watch' : 'Entity mapped'} - ${firm.regulatoryAudit.riskLevel} - ${legalSourceCount(firm)} source(s)`,
      weight: 84,
    },
    {
      label: 'Payout signal',
      searchable: `${firm.reviewSignals.payoutRisk} ${toEnglishText(firm.reviewSignals.payoutRisk)} payout ${firm.reviewSignals.payoutRisk === 'Faible' ? 'low reliable' : 'watch risk incident'}`,
      display: `${toEnglishText(firm.reviewSignals.payoutRisk)} payout risk - ${firm.reviewSignals.payoutIncidentCount ?? 0} incident signal(s)`,
      weight: 72,
    },
  ];

  firm.regulatoryAudit.entities.forEach((entity) => {
    fields.push({
      label: 'Legal entity',
      searchable: [entity.name, entity.jurisdiction, entity.registrationNumber, entity.registeredAddress, entity.role].filter(Boolean).join(' '),
      display: `${entity.name}${entity.registrationNumber ? ` - ${entity.registrationNumber}` : ''} - ${entity.jurisdiction}`,
      weight: 110,
    });
  });

  firm.products.forEach((item) => {
    const noChallengeTags = item.type === 'Instant funding'
      ? 'instant funding direct funding no challenge prop firm without challenge'
      : '';
    const consistencyTags = item.hasConsistencyRule
      ? `consistency rule ${item.consistencyRule ?? ''}`
      : 'no consistency rule without consistency rule';

    fields.push(
      {
        label: 'Program',
        searchable: `${item.name} ${item.type} ${item.description} ${noChallengeTags} ${item.accountSizeMin} ${item.accountSizeMax}`,
        display: `${item.name} - ${item.type}`,
        weight: 96,
      },
      {
        label: 'Program rules',
        searchable: `${item.name} ${consistencyTags} target ${item.profitTarget} daily loss ${item.maxDailyLoss} drawdown ${item.maxDrawdown} split ${item.profitSplit} minimum days ${item.minTradingDays ?? ''}`,
        display: `${item.name} - ${item.hasConsistencyRule ? item.consistencyRule ?? 'Consistency rule applies' : 'No consistency rule'}`,
        weight: 86,
      }
    );
  });

  const platforms = uniqueSearchValues(firm.products.flatMap((item) => item.platforms));
  platforms.forEach((platform) => fields.push({
    label: 'Platform',
    searchable: platformSearchValue(platform),
    display: platform,
    weight: 90,
  }));

  const assets = uniqueSearchValues(firm.products.flatMap((item) => item.tradableAssets));
  assets.forEach((asset) => fields.push({
    label: 'Tradable asset',
    searchable: `${asset} ${toEnglishText(asset)}`,
    display: toEnglishText(asset),
    weight: 74,
  }));

  firm.regulatoryAudit.regulatoryStatus.forEach((status) => fields.push({
    label: 'Regulatory status',
    searchable: status,
    display: status,
    weight: 70,
  }));

  [...firm.regulatoryAudit.complaintsAndDisputes, ...firm.regulatoryAudit.redFlags].forEach((signal) => fields.push({
    label: 'Risk research',
    searchable: signal,
    display: signal,
    weight: 62,
  }));

  [...firm.regulatoryAudit.sources, ...firm.sources].forEach((source) => fields.push({
    label: 'Evidence source',
    searchable: `${source.label} ${source.url}`,
    display: source.label,
    weight: 58,
  }));

  return fields;
}

function isNearSearchWord(queryWord: string, candidateWord: string) {
  if (queryWord === candidateWord) return true;
  if (queryWord.length < 4 || candidateWord.length < 4) return false;
  if (Math.abs(queryWord.length - candidateWord.length) > 1) return false;

  if (queryWord.length === candidateWord.length) {
    const differences: number[] = [];
    for (let index = 0; index < queryWord.length; index += 1) {
      if (queryWord[index] !== candidateWord[index]) differences.push(index);
      if (differences.length > 2) return false;
    }
    if (differences.length <= 1) return true;
    const [first, second] = differences;
    return second === first + 1 && queryWord[first] === candidateWord[second] && queryWord[second] === candidateWord[first];
  }

  const [shorter, longer] = queryWord.length < candidateWord.length
    ? [queryWord, candidateWord]
    : [candidateWord, queryWord];
  let shortIndex = 0;
  let longIndex = 0;
  let skipped = false;

  while (shortIndex < shorter.length && longIndex < longer.length) {
    if (shorter[shortIndex] === longer[longIndex]) {
      shortIndex += 1;
      longIndex += 1;
    } else if (!skipped) {
      skipped = true;
      longIndex += 1;
    } else {
      return false;
    }
  }

  return true;
}

function scoreFirmSearchField(field: IndexedFirmSearchField, normalizedQuery: string) {
  const searchable = field.normalized;
  if (!searchable) return 0;

  const compactQuery = normalizedQuery.replace(/ /g, '');
  const compactSearchable = field.compact;
  if (searchable === normalizedQuery || compactSearchable === compactQuery) return field.weight + 90;
  if (searchable.startsWith(normalizedQuery)) return field.weight + 68;
  if (searchable.includes(normalizedQuery) || (compactQuery.length >= 3 && compactSearchable.includes(compactQuery))) {
    return field.weight + 54;
  }

  const queryWords = normalizedQuery.split(' ').filter(Boolean);
  const searchableWords = field.words;
  let matchedWords = 0;
  let matchQuality = 0;

  queryWords.forEach((queryWord) => {
    if (searchableWords.includes(queryWord)) {
      matchedWords += 1;
      matchQuality += 3;
      return;
    }
    if (queryWord.length >= 3 && searchableWords.some((word) => word.startsWith(queryWord))) {
      matchedWords += 1;
      matchQuality += 2;
      return;
    }
    if (searchableWords.some((word) => isNearSearchWord(queryWord, word))) {
      matchedWords += 1;
      matchQuality += 1;
    }
  });

  if (!matchedWords) return 0;
  const coverage = matchedWords / Math.max(queryWords.length, 1);
  return field.weight + matchedWords * 12 + matchQuality * 4 + Math.round(coverage * 32) - (queryWords.length - matchedWords) * 7;
}

const FIRM_SEARCH_INDEX = new Map(
  propFirms.map((firm) => [
    firm.slug,
    buildFirmSearchFields(firm).map((field): IndexedFirmSearchField => {
      const normalized = normalizeFirmSearch(field.searchable);
      return {
        ...field,
        normalized,
        compact: normalized.replace(/ /g, ''),
        words: normalized.split(' ').filter(Boolean),
      };
    }),
  ])
);

function findFirmSearchMatch(firm: PropFirm, query: string): FirmSearchMatch | null {
  const normalizedQuery = normalizeFirmSearch(query);
  if (!normalizedQuery) return null;

  let bestMatch: FirmSearchMatch | null = null;
  (FIRM_SEARCH_INDEX.get(firm.slug) ?? []).forEach((field) => {
    const score = scoreFirmSearchField(field, normalizedQuery);
    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { score, label: field.label, display: field.display };
    }
  });

  return bestMatch;
}

function FirmSearchContext({ firm, query }: { firm: PropFirm; query: string }) {
  const match = findFirmSearchMatch(firm, query);
  if (!match) return null;

  return (
    <div className="firm-search-match">
      <span>Matched by {match.label}</span>
      <strong>{match.display}</strong>
    </div>
  );
}

export default function Comparateur() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<StatusFilter>('Tous');
  const [market, setMarket] = useState<MarketFilter>('Tous');
  const [scoreMin, setScoreMin] = useState<ScoreFilter>('Tous');
  const [priceMax, setPriceMax] = useState<PriceFilter>('Tous');
  const [drawdown, setDrawdown] = useState<DrawdownFilter>('Tous');
  const [legalFilter, setLegalFilter] = useState<LegalFilter>('Tous');
  const [page, setPage] = useState(1);

  const filteredFirms = useMemo(() => {
    const normalizedSearch = normalizeFirmSearch(search);

    return propFirms
      .map((firm) => ({
        firm,
        searchMatch: normalizedSearch ? findFirmSearchMatch(firm, normalizedSearch) : null,
      }))
      .filter(({ firm, searchMatch }) => {
        const matchesSearch = !normalizedSearch || Boolean(searchMatch);
        const matchesStatus = status === 'Tous' || firm.status === status;
        const matchesMarket = market === 'Tous' || firm.styles.some((style) => style.toLowerCase().includes(market.toLowerCase()));
        const matchesScore = scoreMin === 'Tous' || firm.score >= Number(scoreMin);
        const matchesPrice = priceMax === 'Tous' || (firm.priceFrom > 0 && firm.priceFrom <= Number(priceMax));
        const matchesDrawdown = drawdown === 'Tous' || firm.drawdownType === drawdown;
        const matchesLegal =
          legalFilter === 'Tous' ||
          (legalFilter === 'verified' && firm.legalVerified && !isLegalWatchFirm(firm)) ||
          (legalFilter === 'watch' && isLegalWatchFirm(firm)) ||
          (legalFilter === 'deep' && legalSourceCount(firm) >= 5);
        return matchesSearch && matchesStatus && matchesMarket && matchesScore && matchesPrice && matchesDrawdown && matchesLegal;
      })
      .sort((a, b) => {
        if (normalizedSearch) {
          const relevanceDifference = (b.searchMatch?.score ?? 0) - (a.searchMatch?.score ?? 0);
          if (relevanceDifference) return relevanceDifference;
        }
        return b.firm.score - a.firm.score;
      })
      .map(({ firm }) => firm);
  }, [drawdown, legalFilter, market, priceMax, scoreMin, search, status]);

  useEffect(() => {
    setPage(1);
  }, [drawdown, legalFilter, market, priceMax, scoreMin, search, status]);

  const totalPages = Math.max(1, Math.ceil(filteredFirms.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visibleFirms = filteredFirms.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const visibleStart = filteredFirms.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0;
  const visibleEnd = Math.min(currentPage * PAGE_SIZE, filteredFirms.length);
  const comparatorSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'PropRadar Prop Firm Comparator',
      description: 'Independent prop firm comparison using rules, payout risk, legal evidence and public review signals.',
      url: `${SITE_URL}/comparateur`,
      dateModified: DATA_UPDATED_AT,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: propFirms.length,
        itemListElement: propFirms.map((firm, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Product',
            name: `${firm.name} prop firm program`,
            description: toEnglishText(firm.verdict),
            url: `${SITE_URL}/firm/${firm.slug}`,
            category: `${firm.styles.map((style) => toEnglishText(style)).join(', ')} prop firm`,
            brand: {
              '@type': 'Brand',
              name: firm.name,
            },
          },
        })),
      },
    }),
    []
  );

  const averageScore = Math.round(filteredFirms.reduce((sum, firm) => sum + firm.score, 0) / Math.max(filteredFirms.length, 1));
  const archivedFirmsCount = propFirms.length - activeFirms.length - riskyFirms.length;
  const activeFilterCount = [normalizeFirmSearch(search), status !== 'Tous', market !== 'Tous', scoreMin !== 'Tous', priceMax !== 'Tous', drawdown !== 'Tous', legalFilter !== 'Tous'].filter(Boolean).length;
  const searchCoverage = useMemo(
    () => ({
      entityRecords: propFirms.reduce((sum, firm) => sum + firm.regulatoryAudit.entities.length, 0),
      programs: propFirms.reduce((sum, firm) => sum + firm.products.length, 0),
      sources: new Set(propFirms.flatMap((firm) => [...firm.regulatoryAudit.sources, ...firm.sources].map((source) => source.url))).size,
    }),
    []
  );
  const payoutAlerts = useMemo(
    () => [...propFirms].filter((firm) => firm.reviewSignals.payoutRisk !== 'Faible').sort((a, b) => b.reviewSignals.payoutRiskScore - a.reviewSignals.payoutRiskScore).slice(0, 3),
    []
  );
  const reviewWatch = useMemo(
    () =>
      [...propFirms]
        .filter((firm) => firm.reviewSignals.manipulationRiskScore && firm.reviewSignals.manipulationRiskScore >= 70)
        .sort((a, b) => (b.reviewSignals.manipulationRiskScore ?? 0) - (a.reviewSignals.manipulationRiskScore ?? 0))
        .slice(0, 3),
    []
  );
  const strongSignals = useMemo(
    () =>
      [...propFirms]
        .filter((firm) => firm.reviewSignals.redditScore >= 75 && firm.reviewSignals.xScore >= 65 && firm.reviewSignals.trustpilotReliability === 'Forte' && firm.reviewSignals.payoutRisk === 'Faible')
        .sort((a, b) => b.score - a.score)
        .slice(0, 3),
    []
  );
  const legalWatch = useMemo(
    () =>
      [...propFirms]
        .filter(isLegalWatchFirm)
        .sort((a, b) => legalRiskWeight(b) - legalRiskWeight(a))
        .slice(0, 3),
    []
  );

  function resetFilters() {
    setSearch('');
    setStatus('Tous');
    setMarket('Tous');
    setScoreMin('Tous');
    setPriceMax('Tous');
    setDrawdown('Tous');
    setLegalFilter('Tous');
  }

  function goToPage(nextPage: number) {
    setPage(Math.max(1, Math.min(totalPages, nextPage)));
    document.getElementById('tableau')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <main className="container comparator-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(comparatorSchema)} />
      <section className="comparator-hero">
          <div className="comparator-title">
          <div className="eyebrow">Independent Radar</div>
          <h1>Prop Firm Comparator</h1>
          <p className="lead">Products, risks, Reddit signals, X/Twitter, Trustpilot reliability and payout incidents.</p>
          <div className="comparator-freshness">
            <span>Data updated</span>
            <strong>{DATA_UPDATED_AT}</strong>
          </div>
        </div>

        <div className="comparator-stats">
          <div className="summary-stat">
            <span>Firms tracked</span>
            <strong>{propFirms.length}</strong>
            <small>Core + universe + {archivedFirmsCount} archives</small>
          </div>
          <div className="summary-stat">
            <span>Active</span>
            <strong>{activeFirms.length}</strong>
            <small>Open market</small>
          </div>
          <div className="summary-stat">
            <span>Watchlist</span>
            <strong>{riskyFirms.length}</strong>
            <small>Cautious radar</small>
          </div>
          <div className="summary-score">
            <span>Average reliability of results</span>
            <strong>{averageScore}/100</strong>
            <small>Calculated from displayed firms</small>
            <a href="#tableau" className="btn btn-primary">View table</a>
          </div>
        </div>
      </section>

      <section className="page-insight-strip" aria-label="Comparator reading guide">
        <a href="#tableau">
          <span>Displayed firms</span>
          <strong>{filteredFirms.length}</strong>
          <small>Average score {averageScore}/100 after filters.</small>
        </a>
        <a href="#tableau">
          <span>Active filters</span>
          <strong>{activeFilterCount}</strong>
          <small>Search, price, market, score and drawdown combined.</small>
        </a>
        <Link href="/risques-payout">
          <span>Payout watch</span>
          <strong>{payoutAlerts.length} priority</strong>
          <small>Read withdrawal risk before comparing discounts.</small>
        </Link>
        <Link href="/trustpilot-prop-firms">
          <span>Review context</span>
          <strong>{reviewWatch.length} alerts</strong>
          <small>Trustpilot is weighted against incidents and social feedback.</small>
        </Link>
        <Link href="/guides/prop-firm-legal-check">
          <span>Legal files</span>
          <strong>{legalWatch.length} priority</strong>
          <small>Entity mapping, regulator status and source depth before checkout.</small>
        </Link>
      </section>

      <section className="signal-dashboard" aria-label="Priority signals">
        <article className="signal-dashboard-card signal-card-alert">
          <div className="signal-card-header">
            <div>
              <div className="eyebrow">Payout Watch</div>
              <h3>Incidents to watch</h3>
            </div>
            <span className="signal-card-count">Top 3</span>
          </div>
          <ul className="compact-signal-list">
            {payoutAlerts.map((firm) => (
              <li key={firm.slug}>
                <Link href={`/firm/${firm.slug}`} className="signal-firm-link">
                  <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                  <span>{firm.name}</span>
                </Link>
                <span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{toEnglishText(firm.reviewSignals.payoutRisk)}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="signal-dashboard-card signal-card-warning">
          <div className="signal-card-header">
            <div>
              <div className="eyebrow">Filtered Reviews</div>
              <h3>Signal marketing</h3>
            </div>
            <span className="signal-card-count">Reviews</span>
          </div>
          <ul className="compact-signal-list">
            {reviewWatch.map((firm) => (
              <li key={firm.slug}>
                <Link href={`/firm/${firm.slug}`} className="signal-firm-link">
                  <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                  <span>{firm.name}</span>
                </Link>
                <span className={`badge ${manipulationRiskClass(firm.reviewSignals.manipulationRisk ?? 'Moyen')}`}>{toEnglishText(firm.reviewSignals.manipulationRisk ?? 'Moyen')}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="signal-dashboard-card signal-card-positive">
          <div className="signal-card-header">
            <div>
              <div className="eyebrow">Clean Signal</div>
              <h3>Multi-source trust</h3>
            </div>
            <span className="signal-card-count">Trust</span>
          </div>
          <ul className="compact-signal-list">
            {strongSignals.map((firm) => (
              <li key={firm.slug}>
                <Link href={`/firm/${firm.slug}`} className="signal-firm-link">
                  <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                  <span>{firm.name}</span>
                </Link>
                <span className="badge badge-green">{firm.score}/100</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="signal-dashboard-card signal-card-legal">
          <div className="signal-card-header">
            <div>
              <div className="eyebrow">Legal Watch</div>
              <h3>Entity risk</h3>
            </div>
            <span className="signal-card-count">Legal</span>
          </div>
          <ul className="compact-signal-list">
            {legalWatch.map((firm) => (
              <li key={firm.slug}>
                <Link href={`/firm/${firm.slug}#regulatory`} className="signal-firm-link">
                  <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                  <span>{firm.name}</span>
                </Link>
                <span className={`badge ${regulatoryRiskClass(firm.regulatoryAudit.riskLevel)}`}>{firm.regulatoryAudit.riskLevel}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="signal-trustbar" aria-label="PropRadar signal reading">
        <div>
          <span>Net Reddit</span>
          <strong>positive vs negative</strong>
          <small>The table shows positive and negative mentions, not just an abstract score.</small>
        </div>
        <div>
          <span>X/Twitter Watch</span>
          <strong>fast signal</strong>
          <small>Viral complaints and recent feedback are separated from slower community noise.</small>
        </div>
        <div>
          <span>Filtered Trustpilot</span>
          <strong>suspicious reviews separated</strong>
          <small>Review alerts stay visible next to estimated reliability.</small>
        </div>
        <div>
          <span>Payout Watch</span>
          <strong>operational risk</strong>
          <small>Delays, denials, withdrawal thresholds and closures affect ranking.</small>
        </div>
        <div>
          <span>Commercial conflict</span>
          <strong>affiliate status shown</strong>
          <small>An affiliate firm is not protected by the PropRadar score.</small>
        </div>
      </section>

      <section className="panel comparator-panel" id="tableau">
        <div className="panel-title-row">
          <div>
            <div className="eyebrow">Search</div>
            <h2>Filter the radar</h2>
          </div>
          <span>{activeFilterCount > 0 ? `${activeFilterCount} active filter(s)` : 'Full view'}</span>
        </div>

        <div className="score-legend" aria-label="Score color legend">
          <div className="score-legend-item score-legend-good">
            <strong>Reliable</strong>
            <span>High score, low payout risk, cleaner review profile.</span>
          </div>
          <div className="score-legend-item score-legend-watch">
            <strong>Watchlist</strong>
            <span>Readable, but one or more signals need checking.</span>
          </div>
          <div className="score-legend-item score-legend-risk">
            <strong>High risk</strong>
            <span>Payout, status, review or proof signals require caution.</span>
          </div>
        </div>

        <div className="comparator-upgrade-callout">
          <div>
            <strong>Need a side-by-side decision?</strong>
            <span>Select 2 or 3 firms in the tools page to compare rules, payout, price and trading style without reading every row.</span>
          </div>
          <Link href="/outils#comparatif" className="btn btn-primary">Open side-by-side tool</Link>
        </div>

        <div className="comparator-smart-search">
          <div className="comparator-smart-search-heading">
            <div>
              <span>Indexed research</span>
              <strong>Search firms, legal entities, programs, platforms or rules</strong>
            </div>
            <small>
              {propFirms.length} firms - {searchCoverage.entityRecords} entity records - {searchCoverage.programs} programs - {searchCoverage.sources} evidence links
            </small>
          </div>

          <div className="comparator-smart-search-input">
            <label className="sr-only" htmlFor="comparator-search">Search indexed prop firm research</label>
            <input
              id="comparator-search"
              type="search"
              placeholder="Name, acronym, entity, jurisdiction, MT5, payout rule..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="field"
              autoComplete="off"
            />
            {search ? (
              <button type="button" onClick={() => setSearch('')} aria-label="Clear search" title="Clear search">
                <span aria-hidden="true">&#215;</span>
              </button>
            ) : null}
          </div>

          <div className="comparator-quick-searches" aria-label="Quick firm research searches">
            <span>Quick searches</span>
            {QUICK_SEARCHES.map((item) => (
              <button
                key={item.query}
                type="button"
                className={normalizeFirmSearch(search) === normalizeFirmSearch(item.query) ? 'is-active' : ''}
                onClick={() => setSearch(item.query)}
                aria-pressed={normalizeFirmSearch(search) === normalizeFirmSearch(item.query)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {normalizeFirmSearch(search) ? (
            <div className="comparator-search-mode" aria-live="polite">
              <strong>Relevance mode</strong>
              <span>{filteredFirms.length} match{filteredFirms.length === 1 ? '' : 'es'} for &quot;{search.trim()}&quot;</span>
            </div>
          ) : null}
        </div>

        <div className="filter-bar">
          <div className="filter-pills" aria-label="Filter by status">
            {statusFilters.map((item) => (
              <button
                key={item}
                type="button"
                className={`filter-pill ${status === item ? 'filter-pill-active' : ''} ${item === 'Active' ? 'pill-green' : item === 'À surveiller' ? 'pill-amber' : item === 'Fermée' ? 'pill-red' : ''}`}
                onClick={() => setStatus(item)}
                aria-pressed={status === item}
              >
                {toEnglishText(item)}
              </button>
            ))}
          </div>

          <select value={scoreMin} onChange={(event) => setScoreMin(event.target.value as ScoreFilter)} className="field compact-field" aria-label="Minimum score">
            <option value="Tous">Score min.</option>
            <option value="70">70+</option>
            <option value="80">80+</option>
            <option value="90">90+</option>
          </select>

          <select value={priceMax} onChange={(event) => setPriceMax(event.target.value as PriceFilter)} className="field compact-field" aria-label="Maximum price">
            <option value="Tous">Max price</option>
            <option value="50">50$</option>
            <option value="100">100$</option>
            <option value="200">200$</option>
          </select>

          <select value={drawdown} onChange={(event) => setDrawdown(event.target.value as DrawdownFilter)} className="field compact-field" aria-label="Drawdown">
            <option value="Tous">Max drawdown</option>
            <option value="EOD">EOD</option>
            <option value="Trailing">Trailing</option>
            <option value="Static">Static</option>
            <option value="Hybride">Hybrid</option>
          </select>

          <select value={market} onChange={(event) => setMarket(event.target.value as MarketFilter)} className="field compact-field market-field" aria-label="Market">
            <option value="Tous">All</option>
            <option>Forex</option>
            <option>Futures</option>
            <option value="Actions">Stocks</option>
            <option>Crypto</option>
          </select>

          <select value={legalFilter} onChange={(event) => setLegalFilter(event.target.value as LegalFilter)} className="field compact-field legal-field" aria-label="Legal proof">
            <option value="Tous">Legal proof</option>
            <option value="verified">Entity mapped</option>
            <option value="watch">Legal watch</option>
            <option value="deep">Deep sources</option>
          </select>
        </div>

        <div className="table-actions" aria-live="polite">
          <div>
            <strong>{filteredFirms.length} prop firms</strong>
            <span>
              {activeFilterCount > 0 ? `${activeFilterCount} active filter(s). ` : ''}
              Showing {visibleStart}-{visibleEnd}.{normalizeFirmSearch(search) ? ' Ranked by search relevance.' : ' Filters update instantly.'}
            </span>
          </div>
          <button type="button" className="btn table-reset-button" onClick={resetFilters}>Reset</button>
        </div>

        <div className="firm-results-list">
          {filteredFirms.length === 0 ? (
            <div className="empty-state">
              <strong>No prop firm matches this research query and these filters.</strong>
              <span>Check the name or acronym, or broaden the status, price, score, market and legal filters.</span>
              <button type="button" className="btn" onClick={resetFilters}>Reset</button>
            </div>
          ) : visibleFirms.map((firm, index) => (
            <article key={firm.slug} className={`firm-result-card ${rowToneClass(firm)} ${index === 0 ? 'firm-result-featured' : ''}`}>
              <div className="firm-result-main">
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} />
                <div>
                  <Link href={`/firm/${firm.slug}`} className="firm-result-name">{firm.name}</Link>
                  <div className="firm-subline">{firm.styles.slice(0, 2).map((style) => toEnglishText(style)).join(' / ')} - {toEnglishText(firm.bestFor)}</div>
                  {normalizeFirmSearch(search) ? <FirmSearchContext firm={firm} query={search} /> : null}
                  <div className="strategy-chip-list" aria-label={`Trading styles for ${firm.name}`}>
                    {tradingStyleTags(firm).map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
              </div>

              <div className="firm-result-score">
                <div className={`score-tile ${scoreClass(firm.score)}`} aria-label={`PropRadar score ${firm.score} out of 100`}>
                  <span>Score</span>
                  <strong>{firm.score}</strong>
                  <small>/100</small>
                </div>
                <span className={`badge ${statusClass(firm.status)}`}>{toEnglishText(firm.status)}</span>
              </div>

              <div className="firm-result-metrics">
                <div className="result-metric"><span>Min. price</span><strong>{formatUsd(firm.priceFrom)}</strong></div>
                <div className="result-metric"><span>Drawdown</span><strong>{toEnglishText(firm.drawdownType)}</strong></div>
                <div className="result-metric result-metric-wide"><span>Main product</span><strong>{toEnglishText(firm.products[0]?.name ?? 'Aucun produit actif')}</strong></div>
              </div>

              <div className="firm-result-signals">
                <div className={`signal-chip ${scoreToneClass(firm.reviewSignals.redditScore)}`}>
                  <span>Reddit</span>
                  <SignalDots score={firm.reviewSignals.redditScore} tone={firm.reviewSignals.redditScore >= 75 ? 'green' : firm.reviewSignals.redditScore >= 55 ? 'orange' : 'red'} />
                  <small>+{firm.reviewSignals.redditPositiveMentions ?? 0} / -{firm.reviewSignals.redditNegativeMentions ?? 0}</small>
                </div>
                <div className={`signal-chip ${scoreToneClass(firm.reviewSignals.xScore)}`}>
                  <span>X/Twitter</span>
                  <SignalDots score={firm.reviewSignals.xScore} tone={firm.reviewSignals.xScore >= 75 ? 'green' : firm.reviewSignals.xScore >= 55 ? 'orange' : 'red'} />
                  <small>+{firm.reviewSignals.xPositiveMentions ?? 0} / -{firm.reviewSignals.xNegativeMentions ?? 0}</small>
                </div>
                <div className={`signal-chip ${scoreToneClass(firm.reviewSignals.trustpilotReliabilityScore)}`}>
                  <span>Trustpilot</span>
                  <SignalDots score={firm.reviewSignals.trustpilotReliabilityScore} tone={firm.reviewSignals.trustpilotReliabilityScore >= 75 ? 'green' : firm.reviewSignals.trustpilotReliabilityScore >= 55 ? 'orange' : 'red'} />
                  <span className={`badge ${reviewReliabilityClass(firm.reviewSignals.trustpilotReliability)}`}>{toEnglishText(firm.reviewSignals.trustpilotReliability)}</span>
                  <small>
                    {firm.trustpilotRating ? `${firm.trustpilotRating}/5 raw - ` : ''}
                    {firm.reviewSignals.trustpilotFlaggedReviewCount ?? 0} review alert(s)
                  </small>
                </div>
                <div className={`signal-chip ${riskToneClass(firm.reviewSignals.payoutRiskScore)}`}>
                  <span>Payout</span>
                  <span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{toEnglishText(firm.reviewSignals.payoutRisk)}</span>
                </div>
                <div className={`signal-chip ${riskToneClass(firm.reviewSignals.manipulationRiskScore ?? 50)}`}>
                  <span>Reviews</span>
                  <span className={`badge ${manipulationRiskClass(firm.reviewSignals.manipulationRisk ?? 'Moyen')}`}>{toEnglishText(firm.reviewSignals.manipulationRisk ?? 'Moyen')}</span>
                </div>
                <div className={`signal-chip ${isLegalWatchFirm(firm) ? 'signal-chip-watch' : 'signal-chip-good'}`}>
                  <span>Legal</span>
                  <span className={`badge ${regulatoryRiskClass(firm.regulatoryAudit.riskLevel)}`}>{firm.regulatoryAudit.riskLevel}</span>
                  <small>{firm.legalVerified ? 'Entity mapped' : 'Entity not confirmed'} - {legalSourceCount(firm)} source(s)</small>
                </div>
              </div>

              <div className="firm-result-action">
                <span className={`badge ${relationshipClass(firm.commercialRelationship)}`}>
                  {firm.commercialRelationship === 'Affiliation transparente' ? 'Affiliate' : 'No conflict'}
                </span>
                <span className={`badge ${auditStatusClass(firm.auditStatus)}`}>{toEnglishText(firm.auditStatus)}</span>
                <span className={`badge ${sourceDepthClass(firm)}`}>{sourceDepthLabel(firm)}</span>
                <Link href={`/firm/${firm.slug}`} className="btn btn-primary">Open profile</Link>
              </div>

              <div className="firm-mobile-summary" aria-label={`Mobile summary for ${firm.name}`}>
                <div>
                  <span>Score</span>
                  <strong>{firm.score}/100</strong>
                </div>
                <div>
                  <span>Status</span>
                  <strong>{toEnglishText(firm.status)}</strong>
                </div>
                <div>
                  <span>Payout</span>
                  <strong>{toEnglishText(firm.reviewSignals.payoutRisk)}</strong>
                </div>
                <div>
                  <span>Trustpilot</span>
                  <strong>{toEnglishText(firm.reviewSignals.trustpilotReliability)}</strong>
                </div>
                <div>
                  <span>Legal</span>
                  <strong>{firm.regulatoryAudit.riskLevel}</strong>
                </div>
                <div>
                  <span>Sources</span>
                  <strong>{legalSourceCount(firm)} link(s)</strong>
                </div>
                <div>
                  <span>Social signal</span>
                  <strong>Reddit {firm.reviewSignals.redditScore}/100</strong>
                </div>
                <div>
                  <span>From</span>
                  <strong>{formatUsd(firm.priceFrom)}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredFirms.length > PAGE_SIZE ? (
          <nav className="comparator-pagination" aria-label="Comparator result pages">
            <button type="button" className="btn" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
            <span aria-current="page">Page <strong>{currentPage}</strong> of {totalPages}</span>
            <button type="button" className="btn" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </button>
          </nav>
        ) : null}

        <div className="table-footer">
          <span>{visibleStart}-{visibleEnd} of {filteredFirms.length} result(s) displayed</span>
          <span>{riskyFirms.length} watchlist firm(s) remain visible in the radar.</span>
        </div>
      </section>
    </main>
  );
}
