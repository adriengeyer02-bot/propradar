/**
 * Site languages. English stays at the root (no prefix, existing URLs);
 * the other languages live under /fr, /de, /it and /zh.
 */
export const LOCALES = ['en', 'fr', 'de', 'it', 'es', 'pt', 'zh', 'ja'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';
export const PREFIXED_LOCALES = LOCALES.filter((locale) => locale !== DEFAULT_LOCALE);

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  es: 'Español',
  pt: 'Português',
  zh: '中文',
  ja: '日本語',
};

export const LOCALE_SHORT: Record<Locale, string> = { en: 'EN', fr: 'FR', de: 'DE', it: 'IT', es: 'ES', pt: 'PT', zh: '中文', ja: '日本語' };

/** BCP 47 tags for <html lang> and hreflang. */
export const HTML_LANG: Record<Locale, string> = { en: 'en', fr: 'fr', de: 'de', it: 'it', es: 'es', pt: 'pt', zh: 'zh-Hans', ja: 'ja' };
export const OG_LOCALE: Record<Locale, string> = { en: 'en_US', fr: 'fr_FR', de: 'de_DE', it: 'it_IT', es: 'es_ES', pt: 'pt_BR', zh: 'zh_CN', ja: 'ja_JP' };

export const LOCALE_COOKIE = 'NEXT_LOCALE';

export function isLocale(value: string | undefined): value is Locale {
  return Boolean(value) && (LOCALES as readonly string[]).includes(value as string);
}

/** Path of `path` (an English path such as /firm/ftmo) in `locale`. */
export function localePath(locale: Locale, path: string) {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return clean;
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`;
}

/** Split a pathname into its locale and the English path. */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const [, first, ...rest] = pathname.split('/');
  // English pages are served from an internal /en rewrite, which the client router can report.
  if (isLocale(first)) return { locale: first, path: `/${rest.join('/')}` };
  return { locale: DEFAULT_LOCALE, path: pathname || '/' };
}

/**
 * Pages whose interface is translated. Other pages still exist under every
 * prefix (so navigation never breaks) but show their English content with a
 * notice, point their canonical to English and are kept out of the index.
 */
const TRANSLATED = [
  /^\/$/,
  /^\/prop-firm-radar$/,
  /^\/prop-firm-comparison$/,
  /^\/firm\/[^/]+$/,
  /^\/about$/,
  /^\/guides$/,
  /^\/guides\/[^/]+$/,
  /^\/best-prop-firms$/,
  /^\/prop-firm-challenge$/,
  /^\/prop-firm-statistics$/,
  /^\/trustpilot-prop-firms$/,
];

export function isTranslatedPath(path: string) {
  const clean = path.replace(/\/+$/, '') || '/';
  return TRANSLATED.some((pattern) => pattern.test(clean));
}

/** canonical + hreflang alternates for a translated page (English path in). */
export function localeAlternates(locale: Locale, path: string) {
  const languages: Record<string, string> = {};
  for (const item of LOCALES) languages[HTML_LANG[item]] = localePath(item, path);
  languages['x-default'] = path;
  return { canonical: localePath(locale, path), languages };
}

/** Country name in the page language (ISO 3166 code), falling back to the English name. */
export function countryLabel(locale: Locale, code: string, fallback: string) {
  if (locale === DEFAULT_LOCALE) return fallback;
  try {
    const iso = code === 'UK' ? 'GB' : code;
    return new Intl.DisplayNames([HTML_LANG[locale]], { type: 'region' }).of(iso) ?? fallback;
  } catch {
    return fallback;
  }
}
