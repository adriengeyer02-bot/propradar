'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { LOCALES, LOCALE_COOKIE, LOCALE_LABELS, LOCALE_SHORT, HTML_LANG, localePath, splitLocale, type Locale } from '../lib/locales';

/**
 * Language menu in the top bar. Picking a language stores it in a cookie
 * (one year) so English links lead back to that language, then loads the
 * same page in the chosen language.
 */
export default function LanguageSwitcher({ label }: { label: string }) {
  const pathname = usePathname() || '/';
  const { locale, path } = splitLocale(pathname);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
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

  function remember(next: Locale) {
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
  }

  return (
    <div ref={rootRef} className={`lang-switch${open ? ' is-open' : ''}`}>
      <button
        type="button"
        className="lang-switch-button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`${label}: ${LOCALE_LABELS[locale]}`}
        onClick={() => setOpen((current) => !current)}
      >
        <svg viewBox="0 0 20 20" aria-hidden="true" width="16" height="16">
          <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M2.5 10h15M10 2.5c2.2 2.1 3.2 4.6 3.2 7.5s-1 5.4-3.2 7.5c-2.2-2.1-3.2-4.6-3.2-7.5s1-5.4 3.2-7.5Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span>{LOCALE_SHORT[locale]}</span>
      </button>
      <ul className="lang-switch-menu" role="list" hidden={!open}>
        {LOCALES.map((item) => (
          <li key={item}>
            <a
              href={localePath(item, path)}
              hrefLang={HTML_LANG[item]}
              lang={HTML_LANG[item]}
              aria-current={item === locale ? 'true' : undefined}
              onClick={() => remember(item)}
            >
              <span>{LOCALE_LABELS[item]}</span>
              <small>{LOCALE_SHORT[item]}</small>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
