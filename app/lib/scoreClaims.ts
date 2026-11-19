/**
 * Narrative texts (verdict, audit summary) must not state the PropRadar score:
 * the score is computed (editorial score, restrictive-rules penalty, caps) and
 * explained in the score dialog, so a number written into prose goes stale as
 * soon as the pipeline moves it (FTMO said "89/100" while showing 90).
 *
 * `stripScoreClaims` removes the sentences that state or move a score, in any
 * site language. propFirms.ts applies it to the English data and registers
 * the original text, so `td()` can still find the reviewed translation of the
 * original and strip the same sentences from it.
 */

const SCORE_WORDS =
  /\b(?:score[ds]?|scoring|note|notée?|noté|Wertung|Bewertung|punteggio|puntuación|pontuação|puan|alama|maki)\b|评分|分数|スコア|評価|स्कोर|अंक|تقييم|점수|ውጤት/i;
/** "/100" or "N/100" anywhere marks a PropRadar score statement. */
const OUT_OF_100 = /\b\d{1,3}\s*\/\s*100\b|\b\d{1,3}\s*sur\s*100\b/i;
/** A bare 2-digit number that is not a percentage, price, size or rating out of 5. */
const SCORE_NUMBER = /(?<![\d.,$€£])\b\d{2}\b(?!\s*(?:%|\/\s*5\b|[.,]\d|\s*(?:K|k|USD|EUR|GBP|days?|jours?|minutes?|seconds?|hours?|reviews?|avis)\b))/;

/** Firm-defined metrics that use the word "score" (not PropRadar's score). */
const OTHER_SCORES = /\b(?:Profit|Trust|Consistency|Edge|Stability|Risk|Credit|Performance)\s*Score\b/gi;

function isScoreClaim(raw: string) {
  const sentence = raw.replace(OTHER_SCORES, '');
  if (OUT_OF_100.test(sentence)) return true;
  return SCORE_WORDS.test(sentence) && SCORE_NUMBER.test(sentence) && /(?:\bto\b|\bà\b|→|->|\bfrom\b|\bde\b|\bauf\b|\bvon\b|\bda\b|\ba\b|\bpara\b|\bdan\b|から|至|से|إلى|에서|\blowered\b|\braised\b|\breduced\b|\bcapped\b|\bkept\b|\bheld\b|\bat\b|\bretained\b|\bunchanged\b|\bstays\b|\bremains\b|\bmaintained\b)/i.test(sentence);
}

/** Sentence breaks: Latin punctuation followed by a space, or CJK full stops. */
const SENTENCE_BREAK = /(?<=[.!?])\s+(?=\S)|(?<=[。！？])/;

export function stripScoreClaims(text: string): string {
  if (!text || (!OUT_OF_100.test(text) && !SCORE_WORDS.test(text))) return text;
  const sentences = text.trim().split(SENTENCE_BREAK);
  let changed = false;
  const kept = sentences.flatMap((sentence) => {
    // "53/100: transparent pricing…" keeps the statement, drops the figure.
    const prefixed = sentence.match(/^(\s*)\d{1,3}\s*\/\s*100\s*[:—–-]\s*([\s\S]+)$/);
    if (prefixed && !isScoreClaim(prefixed[2])) {
      changed = true;
      return [prefixed[2].charAt(0).toUpperCase() + prefixed[2].slice(1)];
    }
    if (!isScoreClaim(sentence)) return [sentence];
    changed = true;
    // "Rules are public; score 89/100 after…" keeps the clauses without a score.
    const clauses = sentence.split(/\s*[;；]\s*/);
    const rest = clauses.filter((clause) => !isScoreClaim(clause));
    if (!rest.length || rest.length === clauses.length) return [];
    const end = sentence.trimEnd().match(/[.!?。！？]+$/)?.[0] ?? '.';
    const joined = rest.join('; ').trim().replace(/[.!?。！？]+$/, '');
    return [joined.charAt(0).toUpperCase() + joined.slice(1) + end];
  });
  if (!changed) return text;
  const result = kept.join(/[。！？]$/.test(kept[0] ?? '') ? '' : ' ').replace(/\s{2,}/g, ' ').trim();
  // Never blank a text: if every sentence is a score statement, keep the original.
  return result.length >= 40 ? result : text;
}

/** Stripped English text -> original English text (for translation lookups). */
export const narrativeOriginals = new Map<string, string>();
