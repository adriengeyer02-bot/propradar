'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { findFirmSearchMatch, normalizeFirmSearch } from '../lib/firmSearch';
import { propFirms } from '../lib/propFirms';
import { promoDeals } from '../lib/promoResearch';
import { getSeoGuideDisplay, getSeoGuidePath, seoGuides } from '../lib/seoGuides';
import { toEnglishText } from '../lib/i18n';

type SearchResult = {
  type: 'Firm' | 'Guide' | 'Deal';
  title: string;
  description: string;
  matchLabel: string;
  href: string;
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
  if (normalizedTitle === normalizedQuery) return 190;
  if (normalizedTitle.startsWith(normalizedQuery)) return 160;
  if (normalizedTitle.includes(normalizedQuery)) return 140;
  if (normalizedDescription.includes(normalizedQuery)) return 96;

  const queryWords = normalizedQuery.split(' ').filter(Boolean);
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

export default function SiteSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const results = useMemo(() => {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length < 2) return [];

    const firmResults = propFirms
      .map((firm): SearchResult | null => {
        const match = findFirmSearchMatch(firm, trimmedQuery);
        if (!match) return null;

        return {
          type: 'Firm',
          title: firm.name,
          description: compactText(`${match.label}: ${toEnglishText(match.display)}`),
          matchLabel: `${firm.score}/100`,
          href: `/firm/${firm.slug}`,
          score: match.score + Math.round(firm.score / 8),
        };
      })
      .filter((result): result is SearchResult => Boolean(result));

    const guideResults: SearchResult[] = seoGuides.map((guide) => {
      const displayGuide = getSeoGuideDisplay(guide);
      const searchDocument = `${displayGuide.primaryKeywords.join(' ')} ${displayGuide.secondaryKeywords.join(' ')} ${displayGuide.answer}`;

      return {
        type: 'Guide',
        title: displayGuide.title,
        description: compactText(toEnglishText(displayGuide.answer)),
        matchLabel: 'Research guide',
        href: getSeoGuidePath(guide),
        score: scoreContentResult(trimmedQuery, displayGuide.title, searchDocument),
      };
    });

    const promoResults: SearchResult[] = promoDeals.map((deal) => ({
      type: 'Deal',
      title: toEnglishText(`${deal.title} - ${deal.code}`),
      description: compactText(toEnglishText(`${deal.value}. ${deal.consumerVerdict}`)),
      matchLabel: 'Risk-aware deal',
      href: '/promos',
      score: scoreContentResult(trimmedQuery, `${deal.title} ${deal.code}`, `${deal.slug} ${deal.value} ${deal.bestFor.join(' ')} ${deal.consumerVerdict}`),
    }));

    return [...firmResults, ...guideResults, ...promoResults]
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
      .slice(0, 10);
  }, [query]);

  const showResults = isOpen && query.trim().length >= 2;
  const selectedIndex = activeIndex >= 0 && activeIndex < results.length ? activeIndex : -1;

  useEffect(() => {
    if (!showResults || selectedIndex < 0) return;
    document.getElementById(`site-search-result-${selectedIndex}`)?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex, showResults]);

  function closeLater() {
    blurTimer.current = setTimeout(() => setIsOpen(false), 140);
  }

  function cancelClose() {
    if (blurTimer.current) clearTimeout(blurTimer.current);
  }

  function resetSearch() {
    setQuery('');
    setIsOpen(false);
    setActiveIndex(-1);
  }

  function openResult(index: number) {
    const result = results[index];
    if (!result) return;
    resetSearch();
    router.push(result.href);
  }

  return (
    <div className="site-search" onMouseDown={cancelClose}>
      <label className="site-search-label" htmlFor="site-search-input">Search PropRadar</label>
      <input
        id="site-search-input"
        type="search"
        role="combobox"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setIsOpen(true);
          setActiveIndex(0);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={closeLater}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            setIsOpen(true);
            setActiveIndex((current) => results.length ? (Math.max(current, -1) + 1) % results.length : -1);
          } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setIsOpen(true);
            setActiveIndex((current) => results.length ? (current <= 0 ? results.length - 1 : current - 1) : -1);
          } else if (event.key === 'Enter' && showResults && selectedIndex >= 0) {
            event.preventDefault();
            openResult(selectedIndex);
          } else if (event.key === 'Escape') {
            setIsOpen(false);
            setActiveIndex(-1);
            event.currentTarget.blur();
          }
        }}
        aria-expanded={showResults}
        aria-controls="site-search-results"
        aria-autocomplete="list"
        aria-haspopup="listbox"
        aria-activedescendant={showResults && selectedIndex >= 0 ? `site-search-result-${selectedIndex}` : undefined}
        autoComplete="off"
        spellCheck={false}
        placeholder="Search PropRadar"
        className="site-search-input"
      />
      {query ? (
        <button
          type="button"
          className="site-search-clear"
          aria-label="Clear search"
          title="Clear search"
          onMouseDown={(event) => event.preventDefault()}
          onClick={resetSearch}
        >
          &times;
        </button>
      ) : null}
      <span className="site-search-status" role="status" aria-live="polite">
        {showResults ? `${results.length} result${results.length === 1 ? '' : 's'}` : ''}
      </span>
      {showResults ? (
        <div className="site-search-results" id="site-search-results" role="listbox" aria-label="Search results">
          {results.length ? (
            results.map((result, index) => (
              <Link
                href={result.href}
                id={`site-search-result-${index}`}
                className={`site-search-result${selectedIndex === index ? ' site-search-result-active' : ''}`}
                role="option"
                aria-selected={selectedIndex === index}
                tabIndex={-1}
                key={`${result.type}-${result.href}-${result.title}`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={resetSearch}
              >
                <span className="site-search-result-meta">
                  <span>{result.type}</span>
                  <em>{result.matchLabel}</em>
                </span>
                <strong>{result.title}</strong>
                <small>{result.description}</small>
              </Link>
            ))
          ) : (
            <div className="site-search-empty">
              <strong>No direct result</strong>
              <small>No matching firm, guide or deal in the current index.</small>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
