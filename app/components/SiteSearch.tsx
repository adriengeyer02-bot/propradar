'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type SearchResult = {
  type: 'Firm' | 'Guide' | 'Brief' | 'Deal';
  title: string;
  description: string;
  matchLabel: string;
  href: string;
};

type SearchStatus = 'idle' | 'loading' | 'ready' | 'error';

export default function SiteSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searchStatus, setSearchStatus] = useState<SearchStatus>('idle');
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length < 2) return;

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(trimmedQuery)}`, {
          signal: controller.signal,
          headers: { Accept: 'application/json' },
        });
        if (!response.ok) throw new Error(`Search failed with ${response.status}`);
        const payload = await response.json() as { results?: SearchResult[] };
        const nextResults = Array.isArray(payload.results) ? payload.results : [];
        setResults(nextResults);
        setActiveIndex(nextResults.length ? 0 : -1);
        setSearchStatus('ready');
      } catch {
        if (controller.signal.aborted) return;
        setResults([]);
        setActiveIndex(-1);
        setSearchStatus('error');
      }
    }, 140);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
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
    setResults([]);
    setSearchStatus('idle');
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
          const nextQuery = event.target.value;
          setQuery(nextQuery);
          setIsOpen(true);
          setActiveIndex(-1);
          setResults([]);
          setSearchStatus(nextQuery.trim().length >= 2 ? 'loading' : 'idle');
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
        {showResults
          ? searchStatus === 'loading'
            ? 'Searching'
            : searchStatus === 'error'
              ? 'Search unavailable'
            : `${results.length} result${results.length === 1 ? '' : 's'}`
          : ''}
      </span>
      {showResults ? (
        <div
          className="site-search-results"
          id="site-search-results"
          role="listbox"
          aria-label="Search results"
          aria-busy={searchStatus === 'loading'}
        >
          {searchStatus === 'loading' ? (
            <div className="site-search-empty" role="option" aria-disabled="true">
              <strong>Searching PropRadar</strong>
              <small>Checking firms, legal entities, guides, risk briefs and current deals.</small>
            </div>
          ) : searchStatus === 'error' ? (
            <div className="site-search-empty" role="option" aria-disabled="true">
              <strong>Search temporarily unavailable</strong>
              <small>Retry in a moment or open the comparator directly.</small>
            </div>
          ) : results.length ? (
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
            <div className="site-search-empty" role="option" aria-disabled="true">
              <strong>No direct result</strong>
              <small>No matching firm, guide, risk brief or deal in the current index.</small>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
