import { localePath, type Locale } from './locales';

/** Public French article URLs paired with their canonical English guide. */
export const frenchArticlePaths: Record<string, string> = {
  '/best-prop-firms': '/meilleures-prop-firms-2026',
  '/guides/prop-firm-no-challenge': '/prop-firm-sans-challenge',
  '/guides/prop-firm-no-consistency-rule': '/regle-de-consistance-prop-firm',
  '/guides/prop-firm-drawdown': '/drawdown-prop-firm',
  '/guides/topstep-review': '/avis-topstep',
  '/guides/ftmo-vs-the5ers': '/ftmo-vs-the5ers',
  '/guides/prop-firm-hidden-rules': '/regles-cachees-prop-firm',
};

/** French articles with no English counterpart: other languages land on their guide library. */
export const frenchOnlyPaths = ['/prop-firms-fermees'];

/** Pages published in English and French only: other languages get the English page. */
export const englishFrenchOnlyPaths = ['/guides/futures-cfd-options'];

/**
 * Where an English path lives in `locale`, without going through a redirect
 * (French article pairs) or a missing page. Used for navigation links.
 */
export function localizedPagePath(locale: Locale, englishPath: string) {
  if (locale === 'fr') return localePath(locale, frenchArticlePaths[englishPath] ?? englishPath);
  if (englishFrenchOnlyPaths.includes(englishPath)) return englishPath;
  return localePath(locale, englishPath);
}

/** Changing language must translate the page identity, not just its prefix. */
export function languageSwitchPath(locale: Locale, path: string) {
  if (path === '/articles') return localePath(locale, locale === 'fr' ? path : '/guides');
  if (frenchOnlyPaths.includes(path)) return localePath(locale, locale === 'fr' ? path : '/guides');
  const englishPath = Object.entries(frenchArticlePaths).find(([, french]) => french === path)?.[0] ?? path;
  return localizedPagePath(locale, englishPath);
}
