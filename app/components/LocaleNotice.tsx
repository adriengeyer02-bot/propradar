'use client';

import { usePathname } from 'next/navigation';
import { LOCALE_COOKIE, isTranslatedPath, splitLocale } from '../lib/locales';

/** Banner on pages whose content is still English only, outside English. */
export default function LocaleNotice({ title, body, english }: { title: string; body: string; english: string }) {
  const { locale, path } = splitLocale(usePathname() || '/');
  if (locale === 'en' || isTranslatedPath(path)) return null;
  return (
    <div className="locale-notice" role="note">
      <div className="container">
        <strong>{title}</strong>
        <span>{body}</span>
        <a
          href={path}
          hrefLang="en"
          onClick={() => {
            document.cookie = `${LOCALE_COOKIE}=en; path=/; max-age=31536000; samesite=lax`;
          }}
        >
          {english}
        </a>
      </div>
    </div>
  );
}
