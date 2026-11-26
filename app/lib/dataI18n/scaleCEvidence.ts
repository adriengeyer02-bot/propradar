import type { Locale } from '../locales';
import type { ScaleCPenalty } from '../scaleC';
import raw from './scaleCEvidence.json';
type Entry = {slug:string;code:string;source:string;translations:Partial<Record<Locale,string>>};
const bySource = new Map((raw as Entry[]).map(row => [JSON.stringify([row.slug,row.code,row.source]),row.translations]));
/** Only exact source matches; scoring, sources and original evidence remain unchanged. */
export function localizeScaleCEvidence(locale: Locale, slug: string, penalty: ScaleCPenalty): string {
  return bySource.get(JSON.stringify([slug,penalty.code,penalty.text]))?.[locale] ?? penalty.text;
}
