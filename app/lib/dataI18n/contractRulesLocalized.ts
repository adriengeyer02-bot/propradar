import type { Locale } from '../locales';
import localizedRules from './contractRulesLocalized.json';

type RuleTranslation = { source: string[]; localized: string[] };
const records = localizedRules as Partial<Record<Locale, Record<string, RuleTranslation[]>>>;
const cache: Partial<Record<Locale, Map<string, string>>> = {};

/** Exact original text keys. Changing an English clause never reuses its old translation. */
export function translatedContractRule(locale: Locale, original: string): string | undefined {
  const firms = records[locale];
  if (!firms) return undefined;
  let dictionary = cache[locale];
  if (!dictionary) {
    dictionary = new Map<string, string>();
    for (const rows of Object.values(firms)) {
      for (const row of rows) {
        row.source.forEach((value, i) => {
          const translation = row.localized[i];
          if (value && translation) dictionary!.set(value.trim(), translation);
        });
      }
    }
    cache[locale] = dictionary;
  }
  return dictionary.get(original.trim());
}
