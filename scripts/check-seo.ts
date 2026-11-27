/**
 * Static SEO consistency checks (no server needed):
 *   npx tsx scripts/check-seo.ts
 *
 * 1. Every hand-written French article is indexable in French (isTranslatedPath).
 * 2. The French article pairs used by navigation match frArticles.enPath.
 * 3. Hard-coded /guides/... links in the guide registry use current URL slugs,
 *    not old slugs that only answer with a redirect.
 * 4. No sitemap URL is outside the indexable set (noindex or English-only under a prefix).
 * 5. Long titles drop the brand suffix (brandedTitle) instead of being cut.
 */
import { frArticles } from '../app/lib/frArticles';
import { frenchArticlePaths, frenchOnlyPaths } from '../app/lib/articlePaths';
import { isTranslatedPath, LOCALES, type Locale } from '../app/lib/locales';
import { GUIDE_URL_SLUGS, getSeoGuidePath, seoGuides } from '../app/lib/seoGuides';
import sitemap from '../app/sitemap';
import { SITE_URL } from '../app/lib/site';
import { brandedTitle, SEARCH_TITLE_MAX } from '../app/lib/seoTitle';
import { readFileSync } from 'node:fs';

const errors: string[] = [];

for (const article of frArticles) {
  if (!isTranslatedPath(`/${article.slug}`, 'fr')) errors.push(`French article /fr/${article.slug} is not indexable (add it to TRANSLATED in app/lib/locales.ts)`);
  if (article.enPath && frenchArticlePaths[article.enPath] !== `/${article.slug}`) {
    errors.push(`frenchArticlePaths['${article.enPath}'] should be '/${article.slug}' (app/lib/articlePaths.ts)`);
  }
  if (!article.enPath && !frenchOnlyPaths.includes(`/${article.slug}`)) {
    errors.push(`French-only article /${article.slug} missing from frenchOnlyPaths (language switcher would 404)`);
  }
}

const currentGuidePaths = new Set(seoGuides.map((guide) => getSeoGuidePath(guide)));
const oldSlugs = new Set(Object.keys(GUIDE_URL_SLUGS).filter((slug) => GUIDE_URL_SLUGS[slug] !== slug));
const registry = readFileSync('app/lib/seoGuides.ts', 'utf8');
for (const match of registry.matchAll(/href: '(\/guides\/[a-z0-9-]+)'/g)) {
  const slug = match[1].slice('/guides/'.length);
  if (oldSlugs.has(slug)) errors.push(`seoGuides.ts links to old slug ${match[1]} (redirects)`);
  else if (!currentGuidePaths.has(match[1]) && match[1] !== '/guides/futures-cfd-options') errors.push(`seoGuides.ts links to unknown guide ${match[1]}`);
}

const prefixes = new Set<string>(LOCALES.filter((locale) => locale !== 'en'));
for (const entry of sitemap()) {
  const path = entry.url.slice(SITE_URL.length) || '/';
  const [, first, ...rest] = path.split('/');
  const locale = (prefixes.has(first) ? first : 'en') as Locale;
  const englishPath = locale === 'en' ? path : `/${rest.join('/')}`;
  const special = englishPath === '/guides/futures-cfd-options';
  if (!special && locale !== 'en' && !isTranslatedPath(englishPath, locale)) errors.push(`sitemap lists non-indexable ${entry.url}`);
}

const sample = 'A'.repeat(SEARCH_TITLE_MAX);
if (typeof brandedTitle(sample) === 'string') errors.push('brandedTitle should drop the suffix on long titles');

if (errors.length) {
  console.error(`SEO check: ${errors.length} problem(s)`);
  for (const error of errors) console.error(` - ${error}`);
  process.exit(1);
}
console.log(`SEO check OK: ${frArticles.length} French articles, ${currentGuidePaths.size} guides, sitemap consistent.`);
