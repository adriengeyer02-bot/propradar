import en, { type RulesMessages } from './en';
/** The main rule interface is localized; sourced product-level audit findings retain their original text. */
const messages: RulesMessages = {
  ...en,
  ...{
  "metaTitle": "የprop firm ህጎች፦ drawdown፣ ክፍያ እና የግብይት አደጋ",
  "metaDescription": "የdrawdown፣ በዜና ጊዜ ግብይት፣ ክፍያ፣ consistency፣ EA እና copy trading ገደቦችን ያነፃፅሩ።",
  "schemaName": "የprop firm ህግ ኦዲት",
  "breadcrumb": "የግብይት ህጎች",
  "eyebrow": "ጥልቅ የህግ ምርመራ",
  "h1": "አካውንትን ወይም ክፍያን ሊያሳጡ የሚችሉ ውሎች።",
  "lead": "PropRadar የdrawdown፣ rollover፣ ዜና፣ EA፣ copy trading፣ consistency፣ የክፍያ ገደቦችና ቅጣቶች ምርመራ ያደርጋል።",
  "reviewed": "ገጹ በ{date} ተመርምሯል። እያንዳንዱ ኦዲት የምንጭ ምርመራ ቀን አለው።",
  "statDeep": "ጥልቅ ኦዲቶች",
  "statClauses": "የተገኙ ውሎች ({critical} እጅግ አደገኛ)",
  "statCompact": "መካከለኛ/ትንሽ ኩባንያዎች ({critical} እጅግ አደገኛ)",
  "statTracked": "በክትትል ላይ ያሉ",
  "coverageAria": "የህግ ኦዲት ሽፋን",
  "statRuleFiles": "የህግ ፋይሎች",
  "statPayoutSensitive": "በክፍያ ላይ ተፅዕኖ ያላቸው",
  "statLegalWatch": "የህግ ክትትል",
  "statDeepSources": "5+ ምንጮች",
  "related": "ተዛማጅ መመሪያዎች፦",
  "relatedConsistency": "የconsistency ህግ",
  "relatedNews": "በዜና ጊዜ ግብይት",
  "statsAria": "የህግ ስታቲስቲክስ",
  "alertsEyebrow": "የገዢ ማስጠንቀቂያዎች",
  "alertsTitle": "በማስታወቂያ ላይ በቂ የማይገለጹ ነገሮች።",
  "viewAudit": "የምንጭ ኦዲት ተመልከት",
  "proofAria": "የ{name} ህግ ኦዲት ማስረጃ",
  "payoutChip": "ክፍያ {level}",
  "legalChip": "ህግ {level}",
  "sourceDeep": "ብዙ ምንጮች",
  "sourceUsable": "በቂ ምንጮች",
  "sourceThin": "ጥቂት ምንጮች",
  "sourceNone": "ምንጭ የለም",
  "sourceChecked": "ምንጩ በ{date} ተፈትሿል",
  "compactEyebrow": "መካከለኛ እና ትንሽ ኩባንያዎች",
  "compactTitle": "ትንንሽ ኩባንያዎች አንድ በአንድ ይመረመራሉ።",
  "compactNote": "እነዚህ ማስጠንቀቂያዎች ከኦፊሴላዊ ምንጮች ወይም ከታወቁ የምርት ገጾች የመጡ ናቸው።",
  "fullEyebrow": "ሙሉ ሽፋን",
  "fullTitle": "ሌሎች prop firm በኦዲት ወረፋ ላይ ናቸው።",
  "fullNote": "እንዳይዘነጉ ትንሽ ኩባንያዎችም ይታያሉ።",
  "showQueue": "ገና ለኦዲት የሚጠብቁ {count} ኩባንያዎችን አሳይ",
  "productToIdentify": "ሊታወቅ የሚገባ ምርት",
  "mainProductToIdentify": "ሊታወቅ የሚገባ ዋና ምርት",
  "coverageArchive": "የአደጋ መዝገብ",
  "coverageMulti": "ብዙ ምንጮች ያለው",
  "coverageSpotted": "ምንጭ ተገኝቷል",
  "coverageToSource": "ምንጭ ያስፈልጋል",
  "nextEyebrow": "ቀጣይ ጥልቅ ምርመራ",
  "nextTitle": "ቀጥሎ የሚመረመሩ ዋና ፕሮግራሞች።",
  "colDrawdown": "Drawdown",
  "colNews": "ዜና",
  "colEa": "EA",
  "colPayout": "ክፍያ",
  "colScore": "ውጤት",
  "scoreAria": "የPropRadar ውጤት {score} ከ100",
  "matrixEyebrow": "አጭር ሰንጠረዥ",
  "matrixTitle": "በክፍያ አደጋ የተመደቡ ንቁ ኩባንያዎች።",
  "showMatrix": "{count} ንቁ ኩባንያዎችን በክፍያ አደጋ አሳይ",
  "scoreLine": "ውጤት {score}/100"
},
  families: [
  {
    "label": "አካውንት ተዘግቷል",
    "title": "Drawdown እና equity",
    "text": "ዋና አደጋው ክፍት equity፣ rollover፣ swaps እና የserver reset ጊዜ ነው።"
  },
  {
    "label": "ትርፍ ተሰርዟል",
    "title": "ዜና እና rollover",
    "text": "አንዳንድ መድረኮች ግብይቱን ቢፈቅዱም ትርፉን ይሰርዛሉ ወይም ህግ ጥሰት ብለው ይመድባሉ።"
  },
  {
    "label": "አካውንት ታግዷል",
    "title": "EA፣ HFT፣ copy trading",
    "text": "ለአደጋ አስተዳደር የተፈቀደ EA በራሱ ሲገበያይ፣ አካውንቶችን ሲቀዳ ወይም server ሲጫን ሊከለከል ይችላል።"
  },
  {
    "label": "ክፍያ ዘግይቷል",
    "title": "ክፍያ እና consistency",
    "text": "የbest-day፣ የክፍያ ገደብ እና የትርፍ ቀናት ህጎች ከተነገረው profit split ይልቅ አስፈላጊ ሊሆኑ ይችላሉ።"
  }
],
  severity: { ...en.severity, ...{"Faible":"ዝቅተኛ","Moyen":"መካከለኛ","Élevé":"ከፍተኛ","Critique":"እጅግ ከፍተኛ"} },
  proof: { ...en.proof, ...{"Source officielle lue":"ኦፊሴላዊ ምንጭ ተነብቧል","Source officielle partielle":"ኦፊሴላዊ ምንጭ በከፊል","Source commerciale repérée":"የንግድ ገጽ ታውቋል"} },
};
export default messages;
