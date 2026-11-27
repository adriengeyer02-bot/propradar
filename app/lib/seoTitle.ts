/**
 * Search titles: the layout template appends " | PropRadar". When that would
 * push the title past what Google shows (about 60-65 characters), the title
 * is kept on its own so the words that match the query are not the ones cut.
 * Social titles (Open Graph, X) are unaffected.
 */
const BRAND_SUFFIX = ' | PropRadar';
export const SEARCH_TITLE_MAX = 65;

export function brandedTitle(title: string): string | { absolute: string } {
  return title.length + BRAND_SUFFIX.length <= SEARCH_TITLE_MAX ? title : { absolute: title };
}
