import en, { type RulesMessages } from './en';
/** The main rule interface is localized; sourced product-level audit findings retain their original text. */
const messages: RulesMessages = {
  ...en,
  ...{
  "metaTitle": "Sheria za prop firm: drawdown, malipo na hatari za biashara",
  "metaDescription": "Linganisha masharti nyeti kuhusu drawdown, habari, malipo, consistency, EA, copy trading na mikakati iliyokatazwa.",
  "schemaName": "Ukaguzi wa sheria za prop firm",
  "breadcrumb": "Sheria za biashara",
  "eyebrow": "Ukaguzi wa kina wa sheria",
  "h1": "Masharti yanayoweza kusababisha kupoteza akaunti au malipo.",
  "lead": "PropRadar hukagua kurasa za sheria, vituo vya msaada na masharti ya programu ili kubaini drawdown, rollover, habari, EA, copy trading, consistency na vizuizi vya malipo.",
  "reviewed": "Ukurasa ulikaguliwa {date}. Kila faili ina tarehe yake ya ukaguzi wa vyanzo.",
  "statDeep": "Ukaguzi wa kina",
  "statClauses": "Masharti yaliyopatikana ({critical} ya hatari sana)",
  "statCompact": "Kampuni za kati/ndogo ({critical} za hatari sana)",
  "statTracked": "Kampuni zinazofuatiliwa",
  "coverageAria": "Wigo wa ukaguzi wa sheria",
  "statRuleFiles": "Faili za sheria",
  "statPayoutSensitive": "Faili nyeti kwa malipo",
  "statLegalWatch": "Ufuatiliaji wa kisheria",
  "statDeepSources": "Vyanzo 5+",
  "related": "Miongozo inayohusiana:",
  "relatedConsistency": "Sheria za consistency",
  "relatedNews": "Biashara wakati wa habari",
  "statsAria": "Takwimu za sheria",
  "alertsEyebrow": "Tahadhari kwa wanunuzi",
  "alertsTitle": "Mambo ambayo kurasa za matangazo hazisemi wazi.",
  "viewAudit": "Angalia ukaguzi wa vyanzo",
  "proofAria": "Ushahidi wa ukaguzi wa sheria wa {name}",
  "payoutChip": "Malipo {level}",
  "legalChip": "Sheria {level}",
  "sourceDeep": "Vyanzo vingi",
  "sourceUsable": "Vyanzo vya kutosha",
  "sourceThin": "Vyanzo vichache",
  "sourceNone": "Hakuna vyanzo",
  "sourceChecked": "Chanzo kimekaguliwa {date}",
  "compactEyebrow": "Kampuni za kati na ndogo",
  "compactTitle": "Kampuni ndogo zinachunguzwa moja baada ya nyingine.",
  "compactNote": "Tahadhari hizi zinatokana na vyanzo rasmi au kurasa za bidhaa. Faili zisizokamilika zinawekewa alama.",
  "fullEyebrow": "Wigo kamili",
  "fullTitle": "Prop firm nyingine ziko kwenye foleni ya ukaguzi.",
  "fullNote": "PropRadar huonyesha pia kampuni ndogo: chanzo kilichotambuliwa, kumbukumbu ya hatari au faili inayohitaji vyanzo.",
  "showQueue": "Onyesha kampuni {count} zinazongoja ukaguzi",
  "productToIdentify": "Bidhaa ya kutambua",
  "mainProductToIdentify": "Bidhaa kuu ya kutambua",
  "coverageArchive": "Kumbukumbu ya hatari",
  "coverageMulti": "Faili ya vyanzo vingi",
  "coverageSpotted": "Chanzo kimetambuliwa",
  "coverageToSource": "Inahitaji chanzo",
  "nextEyebrow": "Ukaguzi unaofuata",
  "nextTitle": "Programu kuu zinazofuata kuchambuliwa.",
  "colDrawdown": "Drawdown",
  "colNews": "Habari",
  "colEa": "EA",
  "colPayout": "Malipo",
  "colScore": "Alama",
  "scoreAria": "Alama ya PropRadar {score} kati ya 100",
  "matrixEyebrow": "Jedwali la haraka",
  "matrixTitle": "Kampuni hai kwa hatari ya malipo.",
  "showMatrix": "Onyesha kampuni hai {count} kwa hatari ya malipo",
  "scoreLine": "alama {score}/100"
},
  families: [
  {
    "label": "Akaunti imefungwa",
    "title": "Drawdown na equity",
    "text": "Hatari kuu ni equity ya nafasi zilizo wazi, rollover, swaps na wakati wa reset ya seva."
  },
  {
    "label": "Faida imeondolewa",
    "title": "Habari na rollover",
    "text": "Baadhi ya mifumo inaruhusu biashara lakini huondoa faida au kuihesabu kama ukiukaji."
  },
  {
    "label": "Akaunti imezuiwa",
    "title": "EA, HFT, copy trading",
    "text": "EA ya kudhibiti hatari inaweza kukatazwa inapofanya biashara kiotomatiki, kunakili akaunti au kuilemea seva."
  },
  {
    "label": "Malipo yamecheleweshwa",
    "title": "Malipo na consistency",
    "text": "Sheria za siku bora, mipaka ya malipo na siku za faida zinaweza kuwa muhimu kuliko mgao wa faida unaotangazwa."
  }
],
  severity: { ...en.severity, ...{"Faible":"Ndogo","Moyen":"Wastani","Élevé":"Kubwa","Critique":"Hatari sana"} },
  proof: { ...en.proof, ...{"Source officielle lue":"Chanzo rasmi kimesomwa","Source officielle partielle":"Chanzo rasmi cha sehemu","Source commerciale repérée":"Ukurasa wa mauzo umetambuliwa"} },
};
export default messages;
