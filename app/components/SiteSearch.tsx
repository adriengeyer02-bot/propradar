'use client';

import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import { propFirms } from '../lib/propFirms';
import { promoDeals } from '../lib/promoResearch';
import { getSeoGuideDisplay, seoGuides } from '../lib/seoGuides';
import { toEnglishText } from '../lib/i18n';

type SearchResult = {
  type: 'Firm' | 'Guide' | 'Deal';
  title: string;
  description: string;
  href: string;
  score: number;
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function scoreResult(query: string, title: string, description: string) {
  const normalizedTitle = normalize(title);
  const normalizedDescription = normalize(description);
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) return 0;
  if (normalizedTitle === normalizedQuery) return 120;
  if (normalizedTitle.startsWith(normalizedQuery)) return 95;
  if (normalizedTitle.includes(normalizedQuery)) return 80;
  if (normalizedDescription.includes(normalizedQuery)) return 42;

  return normalizedQuery
    .split(/\s+/)
    .filter(Boolean)
    .reduce((score, part) => score + (normalizedTitle.includes(part) ? 18 : normalizedDescription.includes(part) ? 9 : 0), 0);
}

export default function SiteSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const results = useMemo(() => {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length < 2) return [];

    const firmResults: SearchResult[] = propFirms.map((firm) => ({
      type: 'Firm',
      title: firm.name,
      description: toEnglishText(`${firm.bestFor} ${firm.verdict} ${firm.styles.join(' ')} ${firm.reviewSignals.payoutRisk}`),
      href: `/firm/${firm.slug}`,
      score: scoreResult(trimmedQuery, firm.name, `${firm.bestFor} ${firm.verdict} ${firm.styles.join(' ')}`) + Math.round(firm.score / 10),
    }));

    const guideResults: SearchResult[] = seoGuides.map((guide) => {
      const displayGuide = getSeoGuideDisplay(guide);

      return {
        type: 'Guide',
        title: displayGuide.title,
        description: `${displayGuide.primaryKeywords.join(' ')} ${displayGuide.secondaryKeywords.join(' ')} ${displayGuide.answer}`,
        href: `/guides/${guide.slug}`,
        score: scoreResult(trimmedQuery, displayGuide.title, `${displayGuide.primaryKeywords.join(' ')} ${displayGuide.secondaryKeywords.join(' ')} ${displayGuide.answer}`),
      };
    });

    const promoResults: SearchResult[] = promoDeals.map((deal) => ({
      type: 'Deal',
      title: toEnglishText(`${deal.title} - ${deal.code}`),
      description: toEnglishText(`${deal.slug} ${deal.value} ${deal.bestFor.join(' ')} ${deal.consumerVerdict}`),
      href: '/promos',
      score: scoreResult(trimmedQuery, `${deal.title} ${deal.code}`, `${deal.slug} ${deal.value} ${deal.bestFor.join(' ')}`),
    }));

    return [...firmResults, ...guideResults, ...promoResults]
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }, [query]);

  function closeLater() {
    blurTimer.current = setTimeout(() => setIsOpen(false), 140);
  }

  function cancelClose() {
    if (blurTimer.current) clearTimeout(blurTimer.current);
  }

  return (
    <div className="site-search" onMouseDown={cancelClose}>
      <label className="site-search-label" htmlFor="site-search-input">Search</label>
      <input
        id="site-search-input"
        type="search"
        role="combobox"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={closeLater}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setIsOpen(false);
            event.currentTarget.blur();
          }
        }}
        aria-expanded={isOpen && query.trim().length >= 2}
        aria-controls="site-search-results"
        aria-autocomplete="list"
        placeholder="FXIFY, payout, SMC..."
        className="site-search-input"
      />
      {isOpen && query.trim().length >= 2 ? (
        <div className="site-search-results" id="site-search-results" role="list" aria-live="polite">
          {results.length ? (
            results.map((result) => (
              <Link href={result.href} className="site-search-result" role="listitem" key={`${result.type}-${result.href}-${result.title}`} onClick={() => setIsOpen(false)}>
                <span>{result.type}</span>
                <strong>{result.title}</strong>
                <small>{result.description}</small>
              </Link>
            ))
          ) : (
            <div className="site-search-empty">
              <strong>No direct result</strong>
              <small>Try a firm name, payout, futures, SMC, news or consistency.</small>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
