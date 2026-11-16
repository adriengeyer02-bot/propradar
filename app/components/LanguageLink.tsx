'use client';

import type { AnchorHTMLAttributes } from 'react';
import { HTML_LANG, LOCALE_COOKIE, type Locale } from '../lib/locales';

/** Explicit language links override the remembered browsing preference. */
export default function LanguageLink({ locale, onClick, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { locale: Locale }) {
  return (
    <a
      {...props}
      hrefLang={HTML_LANG[locale]}
      onClick={(event) => {
        document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
        onClick?.(event);
      }}
    />
  );
}
