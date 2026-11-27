import { guideScore } from '../guideScore';
import type { Locale } from '../locales';
import type { GuideTranslation } from './types';

const RANK: Record<string, string> = {
  "en": "Three established operators to compare are FTMO (91/100), The5ers (85/100) and Topstep (84/100). These are examples, not a fixed podium. Use the live ranking and each firm's current score breakdown for the latest order.",
  "fr": "Trois opérateurs établis à comparer : FTMO (91/100), The5ers (85/100) et Topstep (84/100). Ce sont des exemples, pas un podium figé. Consultez le classement et le détail des notes actualisés.",
  "de": "Drei etablierte Anbieter zum Vergleich sind FTMO (91/100), The5ers (85/100) und Topstep (84/100). Das sind Beispiele, keine feste Rangfolge. Maßgeblich sind die aktuelle Rangliste und die jeweilige Punkteaufschlüsselung.",
  "es": "Tres operadores consolidados para comparar son FTMO (91/100), The5ers (85/100) y Topstep (84/100). Son ejemplos, no un podio fijo. Consulta la clasificación actual y el desglose de cada puntuación.",
  "it": "Tre operatori consolidati da confrontare sono FTMO (91/100), The5ers (85/100) e Topstep (84/100). Sono esempi, non un podio fisso. Consulta la classifica aggiornata e il dettaglio dei punteggi.",
  "pt": "Três operadores consolidados para comparar são FTMO (91/100), The5ers (85/100) e Topstep (84/100). São exemplos, não um pódio fixo. Consulte a classificação atual e o detalhamento das notas.",
  "zh": "值得比较的三家成熟运营商是 FTMO（91/100）、The5ers（85/100）和 Topstep（84/100）。这些只是示例，并非固定前三名。最新排名请查看实时榜单和各公司的评分明细。",
  "ja": "比較対象となる実績のある3社はFTMO（91/100）、The5ers（85/100）、Topstep（84/100）です。固定の上位3社ではありません。最新の順位は現在のランキングと各社のスコア内訳を確認してください。",
  "hi": "तुलना करने योग्य तीन स्थापित संचालक हैं FTMO (91/100), The5ers (85/100) और Topstep (84/100)। ये उदाहरण हैं, कोई स्थायी शीर्ष तीन नहीं। नवीनतम क्रम के लिए मौजूदा रैंकिंग और स्कोर का विवरण देखें।",
  "tr": "Karşılaştırılabilecek üç yerleşik operatör FTMO (91/100), The5ers (85/100) ve Topstep (84/100). Bunlar örnektir, sabit bir ilk üç değildir. Güncel sıralama ve puan dökümüne bakın.",
  "ar": "من الشركات الراسخة التي يمكن مقارنتها FTMO (91/100) وThe5ers (85/100) وTopstep (84/100). هذه أمثلة وليست ترتيبًا ثابتًا للمراكز الثلاثة الأولى. راجع الترتيب الحالي وتفاصيل كل تقييم.",
  "ko": "비교할 만한 세 운영사는 FTMO(91/100), The5ers(85/100), Topstep(84/100)입니다. 고정된 상위 3곳이 아닌 사례입니다. 최신 순위와 각 회사의 점수 내역을 확인하세요.",
  "sw": "Kampuni tatu zilizodumu zinazofaa kulinganishwa ni FTMO (91/100), The5ers (85/100) na Topstep (84/100). Hii ni mifano, si nafasi tatu za kudumu. Angalia orodha ya sasa na maelezo ya alama za kila kampuni.",
  "ha": "Kamfanoni uku da suka daɗe da za a iya kwatantawa su ne FTMO (91/100), The5ers (85/100) da Topstep (84/100). Waɗannan misalai ne, ba matsayi uku na dindindin ba. Duba jerin yanzu da bayanin maki na kowane kamfani.",
  "am": "ለማነፃፀር ሦስት የቆዩ ድርጅቶች FTMO (91/100)፣ The5ers (85/100) እና Topstep (84/100) ናቸው። እነዚህ ምሳሌዎች እንጂ ቋሚ የመጀመሪያ ሦስት ደረጃዎች አይደሉም። የአሁኑን ደረጃና የውጤት ዝርዝር ይመልከቱ።"
};
const GOAT_CAP: Record<string, [string,string]> = {
  "en": [
    ", below the 64-point maximum permitted while Trustpilot withholds its rating",
    ""
  ],
  "ar": [
    "، وهو أقل من الحد الأقصى المسموح به البالغ 64 نقطة ما دام Trustpilot يحجب تقييمها",
    ""
  ],
  "ko": [
    "이는 Trustpilot이 평점을 보류하는 동안 허용되는 최대 64점보다 낮으며, 회사는",
    "회사는"
  ],
  "tr": [
    ", bu, Trustpilot puanını gösterilmez tuttuğu sürece izin verilen 64 puanlık azaminin altında ve firma izleme listesinde.",
    ". Firma izleme listesinde."
  ],
  "sw": [
    ", chini ya kikomo cha 64 kilichotumika wakati huo kwa alama iliyozuiwa na Trustpilot",
    ""
  ],
  "ha": [
    ", ƙasa da iyakar 64 da ake amfani da ita a lokacin da Trustpilot ya ɓoye maki",
    ""
  ],
  "am": [
    "፣ በወቅቱ Trustpilot ውጤቱን ሲያግድ ከተጠቀመበት 64 ገደብ በታች",
    ""
  ]
};
const AFRICAN: Record<string, [string,string][]> = {
  "sw": [
    [
      "Tarehe 12 Novemba 2026 PropRadar iliipa",
      "Kwa sasa PropRadar inaipa"
    ],
    [
      "Katika mapitio ya 12 Novemba 2026 ilikuwa kwenye orodha ya uangalizi na",
      "Kwa sasa iko kwenye orodha ya uangalizi na"
    ],
    [
      "Katika mapitio ya 12 Novemba 2026 PropRadar iliipa",
      "Kwa sasa PropRadar inaipa"
    ]
  ],
  "ha": [
    [
      "A 12 Nuwamba 2026 PropRadar ya ba shi",
      "A halin yanzu PropRadar ya ba shi"
    ],
    [
      "A bitar 12 Nuwamba 2026 yana cikin",
      "A halin yanzu yana cikin"
    ],
    [
      "A bitar 12 Nuwamba 2026 PropRadar ya ba shi",
      "A halin yanzu PropRadar ya ba shi"
    ]
  ],
  "am": [
    [
      "በ12 ኖቬምበር 2026 PropRadar",
      "በአሁኑ ጊዜ PropRadar"
    ],
    [
      "በ12 ኖቬምበር 2026 ግምገማ 58/100 እና የክትትል ዝርዝር ላይ ነበር",
      "በአሁኑ ጊዜ 58/100 እና የክትትል ዝርዝር ላይ ነው"
    ],
    [
      "በ12 ኖቬምበር 2026 ግምገማ PropRadar",
      "በአሁኑ ጊዜ PropRadar"
    ]
  ]
};
const SCORE_SLUGS: Record<string,string> = {
  "91/100": "ftmo",
  "85/100": "the5ers",
  "84/100": "topstep",
  "58/100": "goat-funded-trader"
};

/** The older translated editorial strings are normalized at the guide boundary.
 * Only four audited score claims are matched, never account sizes or review ratings.
 * A historical Trustpilot observation date is not a current score date.
 */
export function syncGuideScoreCopy(locale: Locale, slug: string, guide: GuideTranslation): GuideTranslation {
  function text(value: string): string {
    if (!/\b(?:91|85|84|58)\/100\b/.test(value)) return value;
    let s = value;
    if (s.includes('91/100') && s.includes('84/100') && RANK[locale]) s = RANK[locale];
    if (slug === 'goat-funded-trader-avis' && GOAT_CAP[locale]) s = s.replace(...GOAT_CAP[locale]);
    for (const [from,to] of AFRICAN[locale] ?? []) s = s.replace(from,to);
    return s.replace(/\b(?:91|85|84|58)\/100\b/g, score => guideScore(SCORE_SLUGS[score]));
  }
  function visit(value: unknown): unknown {
    if (typeof value === 'string') return text(value);
    if (Array.isArray(value)) return value.map(visit);
    if (value !== null && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,visit(v)]));
    return value;
  }
  if (!['meilleure-prop-firm-2026','topstep-review','goat-funded-trader-avis','ftmo-vs-the5ers'].includes(slug)) return guide;
  return visit(guide) as GuideTranslation;
}
