import { findFirmSearchMatch, normalizeFirmSearch } from './firmSearch';
import { propFirms } from './propFirms';
import { promoDeals } from './promoResearch';
import { getSeoGuideDisplay, getSeoGuidePath, seoGuides } from './seoGuides';
import { toEnglishText } from './i18n';
import { editorialBriefs, getEditorialBriefPath } from './editorialBriefs';

export type SiteSearchResult = {
  type: 'Firm' | 'Guide' | 'Brief' | 'Deal';
  title: string;
  description: string;
  matchLabel: string;
  href: string;
};

type RankedSearchResult = SiteSearchResult & {
  score: number;
};

function compactText(value: string, maxLength = 150) {
  const cleanValue = value.replace(/\s+/g, ' ').trim();
  if (cleanValue.length <= maxLength) return cleanValue;
  const shortened = cleanValue.slice(0, maxLength + 1);
  const lastSpace = shortened.lastIndexOf(' ');
  return `${shortened.slice(0, lastSpace > maxLength * 0.7 ? lastSpace : maxLength).trim()}...`;
}

function scoreContentResult(query: string, title: string, description: string) {
  const normalizedTitle = normalizeFirmSearch(title);
  const normalizedDescription = normalizeFirmSearch(description);
  const normalizedQuery = normalizeFirmSearch(query);

  if (!normalizedQuery) return 0;
  if (normalizedTitle === normalizedQuery) return 230;
  if (normalizedTitle.startsWith(normalizedQuery)) return 210;
  if (normalizedTitle.includes(normalizedQuery)) return 190;

  const queryWords = normalizedQuery.split(' ').filter(Boolean);
  if (queryWords.length >= 2 && normalizedDescription.includes(normalizedQuery)) return 220;
  if (normalizedDescription.includes(normalizedQuery)) return 96;

  const titleWords = normalizedTitle.split(' ').filter(Boolean);
  const descriptionWords = normalizedDescription.split(' ').filter(Boolean);
  let matchedWords = 0;
  let score = 0;

  queryWords.forEach((word) => {
    if (titleWords.includes(word)) {
      matchedWords += 1;
      score += 32;
    } else if (titleWords.some((candidate) => word.length >= 3 && candidate.startsWith(word))) {
      matchedWords += 1;
      score += 24;
    } else if (descriptionWords.includes(word)) {
      matchedWords += 1;
      score += 16;
    } else if (descriptionWords.some((candidate) => word.length >= 3 && candidate.startsWith(word))) {
      matchedWords += 1;
      score += 10;
    }
  });

  if (!matchedWords) return 0;
  const coverage = matchedWords / queryWords.length;
  return score + Math.round(coverage * 42) - (queryWords.length - matchedWords) * 12;
}

function scoreGuideResult(
  query: string,
  title: string,
  searchDocument: string,
  primaryKeywords: string[],
  secondaryKeywords: string[],
) {
  const normalizedQuery = normalizeFirmSearch(query);
  const normalizedTitle = normalizeFirmSearch(title);
  const queryWordCount = normalizedQuery.split(' ').filter(Boolean).length;
  let intentScore = 0;

  if (queryWordCount >= 2 && normalizedTitle.startsWith(normalizedQuery)) {
    intentScore = 300;
  }

  primaryKeywords.forEach((keyword) => {
    const normalizedKeyword = normalizeFirmSearch(keyword);
    if (normalizedKeyword === normalizedQuery) {
      intentScore = Math.max(intentScore, 290);
    } else if (
      queryWordCount >= 2 &&
      (normalizedKeyword.includes(normalizedQuery) || normalizedQuery.includes(normalizedKeyword))
    ) {
      intentScore = Math.max(intentScore, 270);
    }
  });

  secondaryKeywords.forEach((keyword) => {
    const normalizedKeyword = normalizeFirmSearch(keyword);
    if (normalizedKeyword === normalizedQuery) {
      intentScore = Math.max(intentScore, 245);
    } else if (
      queryWordCount >= 2 &&
      (normalizedKeyword.includes(normalizedQuery) || normalizedQuery.includes(normalizedKeyword))
    ) {
      intentScore = Math.max(intentScore, 230);
    }
  });

  return Math.max(intentScore, scoreContentResult(query, title, searchDocument));
}

export function searchSite(rawQuery: string, requestedLimit = 10): SiteSearchResult[] {
  const query = rawQuery.trim().slice(0, 80);
  if (query.length < 2) return [];
  const normalizedQuery = normalizeFirmSearch(query);

  const firmResults = propFirms
    .map((firm): RankedSearchResult | null => {
      const match = findFirmSearchMatch(firm, query);
      if (!match) return null;
      const normalizedName = normalizeFirmSearch(firm.name);
      const brandBoost = normalizedName === normalizedQuery
        ? 90
        : normalizedName.startsWith(normalizedQuery) && normalizedQuery.length >= 3
          ? 24
          : 0;

      return {
        type: 'Firm',
        title: firm.name,
        description: compactText(`${match.label}: ${toEnglishText(match.display)}`),
        matchLabel: `${firm.score}/100`,
        href: `/firm/${firm.slug}`,
        score: match.score + Math.round(firm.score / 8) + brandBoost,
      };
    })
    .filter((result): result is RankedSearchResult => Boolean(result));

  const guideResults: RankedSearchResult[] = seoGuides.map((guide) => {
    const displayGuide = getSeoGuideDisplay(guide);
    const searchDocument = `${displayGuide.primaryKeywords.join(' ')} ${displayGuide.secondaryKeywords.join(' ')} ${displayGuide.answer}`;

    return {
      type: 'Guide',
      title: displayGuide.title,
      description: compactText(toEnglishText(displayGuide.answer)),
      matchLabel: 'Research guide',
      href: getSeoGuidePath(guide),
      score: scoreGuideResult(
        query,
        displayGuide.title,
        searchDocument,
        displayGuide.primaryKeywords,
        displayGuide.secondaryKeywords,
      ),
    };
  });

  const promoResults: RankedSearchResult[] = promoDeals.map((deal) => ({
    type: 'Deal',
    title: toEnglishText(`${deal.title} - ${deal.code}`),
    description: compactText(toEnglishText(`${deal.value}. ${deal.availability}. ${deal.consumerVerdict}`)),
    matchLabel: 'Risk-aware deal',
    href: '/promos',
    score: scoreContentResult(
      query,
      `${deal.title} ${deal.code}`,
      `${deal.slug} ${deal.value} ${deal.availability} ${deal.eligibility} ${deal.bestFor.join(' ')} ${deal.consumerVerdict}`,
    ),
  }));

  const briefResults: RankedSearchResult[] = editorialBriefs.map((brief) => {
    const searchDocument = [
      brief.description,
      brief.dek,
      ...brief.keywords,
      ...brief.sections.flatMap((section) => [
        section.eyebrow,
        section.title,
        section.summary,
        section.finding,
      ]),
    ].join(' ');

    const relevanceScore = scoreContentResult(query, brief.title, searchDocument);

    return {
      type: 'Brief',
      title: brief.title,
      description: compactText(brief.description),
      matchLabel: `Risk Brief ${String(brief.issueNumber).padStart(2, '0')}`,
      href: getEditorialBriefPath(brief),
      score: relevanceScore > 0 ? relevanceScore + 12 : 0,
    };
  });

  const limit = Math.max(1, Math.min(20, Math.floor(requestedLimit) || 10));
  return [...firmResults, ...guideResults, ...briefResults, ...promoResults]
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, limit)
    .map((result) => ({
      type: result.type,
      title: result.title,
      description: result.description,
      matchLabel: result.matchLabel,
      href: result.href,
    }));
}
