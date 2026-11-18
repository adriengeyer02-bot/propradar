'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { LOCALES, LOCALE_LABELS, LOCALE_SHORT, HTML_LANG, splitLocale } from '../lib/locales';
import { languageSwitchPath } from '../lib/articlePaths';
import LanguageLink from './LanguageLink';

/**
 * Compact, searchable language picker. Current locale comes first; the two-column
 * list scrolls inside the popover rather than covering the entire viewport.
 */
export default function LanguageSwitcher({ label }: { label: string }) {
  const pathname = usePathname() || '/';
  const { locale, path } = splitLocale(pathname);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const languages = useMemo(
    () => [locale, ...LOCALES.filter((item) => item !== locale)]
      .filter((item) => (LOCALE_LABELS[item] + ' ' + LOCALE_SHORT[item]).toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())),
    [locale, query],
  );

  useEffect(() => {
    if (!open) return;
    searchRef.current?.focus();
    const close = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', escape);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`lang-switch${open ? ' is-open' : ''}`}>
      <button
        type="button"
        className="lang-switch-button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`${label}: ${LOCALE_LABELS[locale]}`}
        onClick={() => {
          setQuery('');
          setOpen((current) => !current);
        }}
      >
        <svg viewBox="0 0 20 20" aria-hidden="true" width="16" height="16">
          <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M2.5 10h15M10 2.5c2.2 2.1 3.2 4.6 3.2 7.5s-1 5.4-3.2 7.5c-2.2-2.1-3.2-4.6-3.2-7.5Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span>{LOCALE_SHORT[locale]}</span>
      </button>
      <div className="lang-switch-menu" role="dialog" aria-label={label} hidden={!open}>
        <input
          ref={searchRef}
          className="lang-switch-search"
          type="search"
          autoComplete="off"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={label}
          aria-label={label}
        />
        <ul className="lang-switch-list">
          {languages.map((item) => (
            <li key={item}>
              <LanguageLink
                href={languageSwitchPath(item, path)}
                locale={item}
                lang={HTML_LANG[item]}
                aria-current={item === locale ? 'true' : undefined}
                onClick={() => setOpen(false)}
              >
                <span>{LOCALE_LABELS[item]}</span>
                <small>{LOCALE_SHORT[item]}</small>
              </LanguageLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
