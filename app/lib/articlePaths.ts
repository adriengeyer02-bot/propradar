import { localePath, type Locale } from './locales';

/** Public French article URLs paired with their canonical English guide. */
export const frenchArticlePaths: Record<string, string> = {
  '/best-prop-firms': '/meilleures-prop-firms-2026',
  '/guides/prop-firm-no-challenge': '/prop-firm-sans-challenge',
  '/guides/prop-firm-no-consistency-rule': '/regle-de-consistance-prop-firm',
  '/guides/prop-firm-drawdown': '/drawdown-prop-firm',
  '/guides/topstep-review': '/avis-topstep',
  '/guides/ftmo-vs-the5ers': '/ftmo-vs-the5ers',
};

/** Changing language must translate the page identity, not just its prefix. */
export function languageSwitchPath(locale: Locale, path: string) {
  if (path === '/articles') return localePath(locale, locale === 'fr' ? path : '/guides');
  const englishPath = Object.entries(frenchArticlePaths).find(([, french]) => french === path)?.[0] ?? path;
  return localePath(locale, locale === 'fr' ? frenchArticlePaths[englishPath] ?? englishPath : englishPath);
}
