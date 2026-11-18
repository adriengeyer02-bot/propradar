/**
 * Translation regression checks for the six newer locales. A localized route
 * must not silently render whole sections from the English dictionary.
 * Proper names, technical acronyms and numerical placeholders can stay shared.
 *
 * Run with: npx tsx scripts/check-interface-i18n.ts
 */
import { LOCALES, isTranslatedPath, type Locale } from '../app/lib/locales';
import { getMessages } from '../app/lib/messages';
import { getToolsMessages } from '../app/lib/messages/pages/tools';
import { optionsCopy } from '../app/lib/optionsI18n';
import { optionsAuditCopy } from '../app/lib/optionsAuditI18n';

type Flat = Record<string, string>;
const EXPANDED: Locale[] = ['tr', 'ar', 'ko', 'sw', 'ha', 'am'];
const MAX_ENGLISH_EQUALS: Record<string, number> = {
  'core.home': 12, 'core.radar': 10, 'core.radarPage': 2,
  'core.compare': 8, 'core.firm': 5, 'core.chrome': 3,
  'core.newsletter': 0, 'core.notice': 0,
  tools: 12, options: 2, 'optionsAudit': 0,
};

function flatten(value: unknown, path = '', result: Flat = {}): Flat {
  if (typeof value === 'string') {
    result[path] = value;
  } else if (Array.isArray(value)) {
    value.forEach((entry, i) => flatten(entry, `${path}[${i}]`, result));
  } else if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, entry]) => flatten(entry, path ? `${path}.${key}` : key, result));
  }
  return result;
}

const placeholders = (value: string) => [...value.matchAll(/\{([\w]+)\}/g)].map((match) => match[1]).sort().join(',');
const catalogues = {
  core: getMessages,
  tools: getToolsMessages,
  options: optionsCopy,
  optionsAudit: optionsAuditCopy,
};
const errors: string[] = [];

for (const [catalogue, get] of Object.entries(catalogues)) {
  const source = flatten(get('en'));
  for (const locale of LOCALES) {
    const target = flatten(get(locale));
    for (const [key, english] of Object.entries(source)) {
      const translation = target[key];
      if (translation === undefined) {
        errors.push(`${catalogue}.${locale}.${key}: missing`);
      } else if (placeholders(english) !== placeholders(translation)) {
        errors.push(`${catalogue}.${locale}.${key}: placeholders differ from English`);
      }
    }
    if (!EXPANDED.includes(locale)) continue;
    for (const [section, max] of Object.entries(MAX_ENGLISH_EQUALS)) {
      const [scope, prefix] = section.split('.');
      if (scope !== catalogue) continue;
      const keys = Object.keys(source).filter((key) => !prefix || key.startsWith(`${prefix}.`));
      const shared = keys.filter((key) => source[key] === target[key]);
      if (shared.length > max) {
        errors.push(`${catalogue}.${locale}${prefix ? `.${prefix}` : ''}: ${shared.length} untranslated strings (limit ${max}); e.g. ${shared.slice(0, 5).join(', ')}`);
      }
    }
  }
}

for (const locale of EXPANDED) {
  for (const path of ['/', '/prop-firm-radar', '/prop-firm-comparison', '/firm/ftmo', '/options-prop-firms', '/tools']) {
    if (!isTranslatedPath(path, locale)) errors.push(`${locale}${path}: primary localized route unexpectedly disabled`);
  }
  if (isTranslatedPath('/audit', locale)) errors.push(`${locale}/audit: English-only article wrongly advertised as translated`);
}

if (errors.length) {
  console.error(`Translation checks failed (${errors.length}):\n- ${errors.join('\n- ')}`);
  process.exitCode = 1;
} else {
  console.log(`Translation checks passed: ${LOCALES.length} locales, placeholders aligned, six new-language interfaces checked.`);
}
