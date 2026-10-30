import { HTML_LANG, LOCALES, localePath, type Locale } from '../locales';
import { getFrArticleByEnPath } from '../frArticles';
import { getSeoGuidePath, type SeoGuide } from '../seoGuides';
import type { GuideTranslation, GuideTranslations } from './types';
import fr from './fr';
import de from './de';
import it from './it';
import es from './es';
import pt from './pt';
import zh from './zh';
import ja from './ja';

export type { GuideTranslation };

const ALL: Partial<Record<Locale, GuideTranslations>> = { fr, de, it, es, pt, zh, ja };

/** Translated summary of a guide (internal slug), or undefined in English / when missing. */
export function getGuideTranslation(locale: Locale, slug: string): GuideTranslation | undefined {
  if (locale === 'en') return undefined;
  return ALL[locale]?.[slug];
}

/** Hand-written French article that replaces the translated summary, if any. */
export function frGuidePairPath(guide: SeoGuide | string) {
  const article = getFrArticleByEnPath(getSeoGuidePath(guide));
  return article ? `/fr/${article.slug}` : undefined;
}

/** Where a guide lives in a given language (falls back to the English page). */
export function localizedGuidePath(locale: Locale, guide: SeoGuide | string) {
  const path = getSeoGuidePath(guide);
  if (locale === 'en') return path;
  const slug = typeof guide === 'string' ? guide : guide.slug;
  if (locale === 'fr') {
    const pair = frGuidePairPath(slug);
    if (pair) return pair;
  }
  return getGuideTranslation(locale, slug) ? localePath(locale, path) : path;
}

/** Languages a guide is readable in (English always). */
export function guideLocales(guide: SeoGuide | string): Locale[] {
  const slug = typeof guide === 'string' ? guide : guide.slug;
  return LOCALES.filter((locale) => locale === 'en' || (locale === 'fr' && frGuidePairPath(slug)) || getGuideTranslation(locale, slug));
}

/** hreflang map (relative paths) for a guide, x-default = English. */
export function guideLanguageAlternates(guide: SeoGuide | string) {
  const languages: Record<string, string> = {};
  for (const locale of guideLocales(guide)) languages[HTML_LANG[locale]] = localizedGuidePath(locale, guide);
  languages['x-default'] = getSeoGuidePath(guide);
  return languages;
}
