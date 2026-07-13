import { propFirms, type PropFirm } from './propFirms';
import { toEnglishText } from './i18n';

type FirmSearchField = {
  label: string;
  searchable: string;
  display: string;
  weight: number;
};

export type FirmSearchMatch = {
  score: number;
  label: string;
  display: string;
};

type IndexedFirmSearchField = FirmSearchField & {
  normalized: string;
  compact: string;
  words: string[];
};

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

export function normalizeFirmSearch(value: string) {
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

function legalSourceCount(firm: PropFirm) {
  return firm.regulatoryAudit.sources.length || firm.sources.length;
}

function isLegalWatchFirm(firm: PropFirm) {
  const risk = firm.regulatoryAudit.riskLevel;
  return !firm.legalVerified || risk === 'High' || risk === 'Critical' || risk === 'To audit';
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

export function findFirmSearchMatch(firm: PropFirm, query: string): FirmSearchMatch | null {
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
