import en, { type RulesMessages } from './en';
/** The main rule interface is localized; sourced product-level audit findings retain their original text. */
const messages: RulesMessages = {
  ...en,
  ...{
  "metaTitle": "Dokokin prop firm: drawdown, biyan riba da haɗarin ciniki",
  "metaDescription": "Kwatanta dokokin drawdown, labarai, biyan riba, consistency, EA, copy trading da dabarun da aka hana.",
  "schemaName": "Binciken dokokin prop firm",
  "breadcrumb": "Dokokin ciniki",
  "eyebrow": "Cikakken binciken dokoki",
  "h1": "Sharuddan da za su iya sa ka rasa asusu ko biyan riba.",
  "lead": "PropRadar yana duba dokoki da sharuɗɗan shirye-shirye don gano haɗarin drawdown, rollover, labarai, EA, copy trading, consistency da iyakokin biyan riba.",
  "reviewed": "An bincika shafin {date}. Kowane bincike yana da ranar duba tushe.",
  "statDeep": "Cikakkun bincike",
  "statClauses": "Sharuddan da aka gano ({critical} masu tsanani)",
  "statCompact": "Matsakaita/ƙananan kamfanoni ({critical} masu tsanani)",
  "statTracked": "Kamfanoni da ake bi",
  "coverageAria": "Faɗin binciken dokoki",
  "statRuleFiles": "Bayanan dokoki",
  "statPayoutSensitive": "Bayanan da suka shafi biyan riba",
  "statLegalWatch": "Sa ido kan doka",
  "statDeepSources": "Tushe 5+",
  "related": "Jagororin da suka shafi:",
  "relatedConsistency": "Dokar consistency",
  "relatedNews": "Ciniki lokacin labarai",
  "statsAria": "Ƙididdigar dokoki",
  "alertsEyebrow": "Gargaɗi ga masu saya",
  "alertsTitle": "Abin da tallace-tallace ba sa faɗi a fili.",
  "viewAudit": "Duba binciken tushe",
  "proofAria": "Hujjar binciken dokokin {name}",
  "payoutChip": "Biyan riba {level}",
  "legalChip": "Doka {level}",
  "sourceDeep": "Tushe masu yawa",
  "sourceUsable": "Tushe masu amfani",
  "sourceThin": "Tushe kaɗan",
  "sourceNone": "Babu tushe",
  "sourceChecked": "An duba tushe {date}",
  "compactEyebrow": "Matsakaita da ƙananan kamfanoni",
  "compactTitle": "Ana duba ƙananan kamfanoni ɗaya bayan ɗaya.",
  "compactNote": "Waɗannan gargaɗin daga tushe na hukuma ko shafukan kayayyaki suke. An nuna inda bayanai ba su cika ba.",
  "fullEyebrow": "Duk bayanai",
  "fullTitle": "Sauran prop firm suna jiran bincike.",
  "fullNote": "Ana nuna ƙananan kamfanoni ma: tushe, tarihin haɗari ko bayanai da ke bukatar ƙarin tushe.",
  "showQueue": "Nuna kamfanoni {count} masu jiran bincike",
  "productToIdentify": "Shirin da za a tantance",
  "mainProductToIdentify": "Babban shirin da za a tantance",
  "coverageArchive": "Tarihin haɗari",
  "coverageMulti": "Bayanan tushe da yawa",
  "coverageSpotted": "An gano tushe",
  "coverageToSource": "Ana buƙatar tushe",
  "nextEyebrow": "Bincike na gaba",
  "nextTitle": "Manyan shirye-shiryen da za a bincika.",
  "colDrawdown": "Drawdown",
  "colNews": "Labarai",
  "colEa": "EA",
  "colPayout": "Biyan riba",
  "colScore": "Maki",
  "scoreAria": "Makin PropRadar {score} daga 100",
  "matrixEyebrow": "Jadawalin gaggawa",
  "matrixTitle": "Kamfanoni masu aiki bisa haɗarin biyan riba.",
  "showMatrix": "Nuna kamfanoni {count} masu aiki bisa haɗarin biyan riba",
  "scoreLine": "maki {score}/100"
},
  families: [
  {
    "label": "An rufe asusu",
    "title": "Drawdown da equity",
    "text": "Babban haɗarin yakan shafi equity na buɗaɗɗen ciniki, rollover, swaps da lokacin sake saita sabar."
  },
  {
    "label": "An cire riba",
    "title": "Labarai da rollover",
    "text": "Wasu dandali suna yarda da ciniki amma su cire ribarsa ko su ce an karya doka."
  },
  {
    "label": "An toshe asusu",
    "title": "EA, HFT, copy trading",
    "text": "EA na sarrafa haɗari na iya zama haram idan yana ciniki da kansa, kwafin asusu ko nauyin sabar."
  },
  {
    "label": "Biyan riba ya jinkirta",
    "title": "Biyan riba da consistency",
    "text": "Dokokin rana mafi riba, iyakar biya da kwanakin riba na iya fi rabon riba da aka tallata muhimmanci."
  }
],
  severity: { ...en.severity, ...{"Faible":"Ƙasa","Moyen":"Matsakaici","Élevé":"Babba","Critique":"Mai tsanani"} },
  proof: { ...en.proof, ...{"Source officielle lue":"An karanta tushe na hukuma","Source officielle partielle":"Tushe na hukuma bai cika ba","Source commerciale repérée":"An gano shafin talla"} },
};
export default messages;
