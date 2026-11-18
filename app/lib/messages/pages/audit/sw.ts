import en, { type AuditMessages } from './en';
const m: AuditMessages = {
 ...en,
 ...{
  "metaTitle": "Ukaguzi wa prop firm: kampuni za kisheria, maonyo ya wadhibiti na kufungwa",
  "metaDescription": "Kagua kampuni iliyo nyuma ya prop firm kabla ya kulipa: nchi, maonyo ya wadhibiti, Trustpilot na matukio ya kufungwa yenye tarehe na vyanzo.",
  "schemaName": "Ukaguzi wa vyanzo vya prop firm",
  "breadcrumb": "Ukaguzi wa vyanzo",
  "eyebrow": "Ukaguzi wa umma",
  "h1": "Vyanzo, mipaka na uaminifu",
  "lead": "PropRadar haitoi kiwango sawa kwa kampuni iliyothibitishwa kikamilifu na iliyoongezwa kwa ufuatiliaji. Kila faili inaonyesha kiwango cha ukaguzi, vyanzo na mambo yanayohitaji uthibitisho.",
  "ctaCompare": "Linganisha kampuni",
  "ctaRules": "Angalia sheria",
  "methodEyebrow": "Mbinu ya PropRadar",
  "coverageAria": "Wigo wa ukaguzi",
  "statTracked": "Kampuni zinazofuatiliwa",
  "statMulti": "Faili za vyanzo vingi",
  "statPartial": "Faili za sehemu",
  "statToAudit": "Za kukaguliwa",
  "statEntity": "Kampuni ya kisheria imebainishwa",
  "statLegalWatch": "Ufuatiliaji wa kisheria",
  "statDeep": "Vyanzo 5+",
  "statRegulator": "Ukaguzi wa wadhibiti",
  "statPress": "Ukaguzi wa habari",
  "legalCheckLink": "Jinsi faili ya kisheria hukaguliwa",
  "casesEyebrow": "Faili zenye tarehe",
  "casesTitle": "Matatizo ya uendeshaji yanahitaji mlolongo wa matukio, si nyota.",
  "casesNote": "Faili {count} zinaonyesha kilichobadilika, chanzo chake na mambo ambayo hayajathibitishwa kabla ya chapa ya zamani kuchukuliwa kuwa hai tena.",
  "datedEvents": "matukio yenye tarehe",
  "sources": "vyanzo",
  "checked": "Imekaguliwa {date}",
  "latestBrief": "Muhtasari wa hivi karibuni",
  "readBrief": "Soma taarifa yenye vyanzo",
  "coverageEyebrow": "Wigo wa utafiti",
  "coverageTitle": "Mambo yaliyothibitishwa kwa vyanzo",
  "covOfficial": "Tovuti rasmi au chanzo cha msingi",
  "covTrustpilot": "Ukurasa wa Trustpilot umetambuliwa",
  "covEntity": "Kampuni ya kisheria imebainishwa",
  "covPress": "Ukaguzi wa habari kwa jina halisi",
  "covIncidents": "Matukio ya malipo yaliyorekodiwa",
  "priorityEyebrow": "Kipaumbele",
  "priorityTitle": "Kampuni zinazofuata kuchunguzwa",
  "legalMapEyebrow": "Ramani ya kisheria",
  "legalMapTitle": "Nchi ambazo kampuni zimesajiliwa.",
  "legalMapNote": "Kila nchi yenye kampuni iliyobainishwa. Mchoro unaonyesha kiwango cha ukaguzi wa kisheria kwa kampuni husika; alama za nchi hutoka kwenye orodha rasmi.",
  "legalPriorityEyebrow": "Kipaumbele cha kisheria",
  "legalPriorityTitle": "Faili za kisheria zenye hatari kubwa zaidi",
  "readingEyebrow": "Mpangilio wa ukaguzi wa kisheria",
  "readingTitle": "Jinsi PropRadar husoma faili ya kampuni",
  "baseEyebrow": "Orodha kamili",
  "baseTitle": "Wasifu {count}, kiwango cha ushahidi kinaonekana",
  "latestReview": "Ukaguzi wa mwisho",
  "tableAria": "Wasifu {count} wa prop firm na kiwango cha ushahidi",
  "subline": "{status} · {entity} · viungo {count} vya kisheria/vyanzo",
  "entityMapped": "Kampuni imebainishwa",
  "entityMissing": "Kampuni haijabainishwa",
  "seeOthers": "Angalia wasifu wengine {count} kwenye kilinganishi"
},
 method: [
  "Vyanzo rasmi vya bei, sheria na bidhaa.",
  "Trustpilot hutenganishwa na alama za biashara; taarifa zisizothibitishwa hutazamwa kwa tahadhari.",
  "Malalamiko na matukio ya malipo huhesabiwa ikiwa tu yana chanzo cha umma chenye tarehe.",
  "Kampuni ya kisheria, hali ya mdhibiti na habari hukaguliwa tofauti na madai ya matangazo.",
  "Faili zisizokaguliwa zinaonekana lakini hazipendekezwi moja kwa moja."
],
 reading: [
  {
    "title": "Kampuni",
    "text": "Chapa, kampuni inayoendesha, anwani, nchi na namba ya usajili."
  },
  {
    "title": "Mdhibiti",
    "text": "Hali ya broker, onyo la biashara ya majaribio, orodha za tahadhari na rejista za kampuni."
  },
  {
    "title": "Masharti",
    "text": "Marejesho ya fedha, chargeback, kupoteza malipo, usuluhishi, nchi zilizozuiwa na KYC."
  },
  {
    "title": "Ukaguzi wa nje",
    "text": "Vyombo vya habari huru, wadhibiti, matangazo ya kufungwa, kesi na utafutaji kwa jina."
  }
],
 caseFiles: { ...en.caseFiles, ...{
  "myforexfunds": {
    "status": "Haifanyi kazi / ufuatiliaji wa kufunguliwa tena",
    "question": "Je, My Forex Funds inaweza kufunguliwa tena baada ya kesi ya CFTC?",
    "answer": "Kufunguliwa tena kunawezekana, lakini bado si huduma ya kununua iliyothibitishwa. Kesi ya Marekani ilifutwa kabisa Mei 2025 kama adhabu dhidi ya CFTC, na baadaye mahakama ya Ontario ikarudisha ufikiaji wa mali nyingi na data za wateja. Haya hayachukui nafasi ya masharti ya sasa, ukaguzi wa nchi, mfumo wa malipo au ukaguzi wa malipo wakati wa kununua."
  },
  "the-funded-trader": {
    "status": "Tovuti hai / ufuatiliaji wa madeni ya zamani",
    "question": "Je, The Funded Trader ilitatua kikamilifu kusimama kwake kwa 2024?",
    "answer": "Tovuti imeanza kufanya kazi tena, lakini sehemu ya kununua hai haifuti kusimama kwa awali wala kuthibitisha kwamba majukumu yote ya zamani yalitimia. Vyombo vya habari vya fedha viliripoti kusimama kwa Machi 2024, kurejea kusikokamilika, malipo yaliyobaki na ahadi za kurudisha akaunti. Masharti ya sasa yanaeleza huduma ya majaribio na mamlaka pana ya kutekeleza sheria. Ofa mpya na madai ya zamani vinahitaji ukaguzi tofauti."
  },
  "funded-engineer": {
    "status": "Imefungwa / kumbukumbu ya ufilisi",
    "question": "Kwa nini Funded Engineer ilifungwa?",
    "answer": "Funded Engineer ilisitisha shughuli kabisa Julai 15, 2024 na kusema ingeomba kufilisika baada ya kushindwa kwa juhudi za kurekebisha kampuni, kupunguza gharama na kupata uwekezaji. Kabla ya kufungwa, kulikuwa na matatizo ya teknolojia na broker. Tangazo la umma halikueleza namna kila malipo au marejesho yaliyosalia yangeshughulikiwa."
  },
  "surgetrader": {
    "status": "Imefungwa / kumbukumbu ya tovuti inayouzwa",
    "question": "Je, SurgeTrader bado inafanya kazi?",
    "answer": "Hakuna shughuli za sasa zilizothibitishwa. SurgeTrader ilitangaza kufungwa na kusimamisha shughuli zote Mei 24, 2024, wiki moja baada ya habari kuhusu kupoteza leseni ya Match-Trader. Domaine ya zamani sasa inawekwa kwa mauzo; maoni ya zamani na ofa mpya zinazotumia jina hili zinahitaji ukaguzi mpya wa mmiliki."
  },
  "true-forex-funds": {
    "status": "Imefungwa / kumbukumbu ya ukosefu wa fedha",
    "question": "Nini kilitokea kwa True Forex Funds?",
    "answer": "True Forex Funds ilifungwa kabisa Mei 2024 ikitaja ukosefu wa uwezo wa kulipa madeni. Ilifuata kusimamishwa kwa leseni ya jukwaa Februari na jaribio la kuanza upya kwa cTrader. Kampuni pia ilionekana kwenye orodha ya CFTC RED; orodha hiyo inaonyesha wasiwasi wa usajili, lakini si hukumu ya mahakama ya uvunjaji wa sheria."
  },
  "skilled-funded-traders": {
    "status": "Imefungwa / majukumu yasiyotatuliwa",
    "question": "Je, Skilled Funded Traders bado inafanya kazi?",
    "answer": "Hakuna sababu ya kudhani kuwa kampuni inafanya kazi sasa. Finance Magnates na FX News Group ziliripoti kusimamishwa mara moja kwa shughuli na ununuzi mpya tarehe 28 Machi 2024. Muundo halisi unaohusishwa na Easton na hatima ya malipo au marejesho yote ya zamani havijawekwa wazi kikamilifu kwenye vyanzo vya umma."
  }
} },
 briefs: { ...en.briefs, ...{
  "prop-firm-risk-brief-july-19-2026": {
    "shortTitle": "Madai ya kufunguliwa tena, matatizo ya jukwaa na malipo ya zamani",
    "dek": "Toleo hili linatenganisha maendeleo ya kisheria na utayari wa uendeshaji, na kuchunguza jinsi utegemezi wa jukwaa, broker na teknolojia ulivyochangia hatari ya kufungwa kwa prop firm."
  }
} },
 juris: { ...en.juris, ...{
  "firm": "kampuni",
  "firms": "kampuni",
  "entity": "kampuni ya kisheria",
  "entities": "kampuni za kisheria",
  "barAria": "Faili za kisheria za kampuni hizi: {list}",
  "heavy": "{count} zenye hatari kubwa au kubwa sana",
  "noHeavy": "Hakuna faili yenye hatari kubwa",
  "noRegulator": "Hakuna mdhibiti aliyeorodheshwa",
  "seeFirms": "Angalia kampuni",
  "compareFirms": "Linganisha kampuni hizi →",
  "legendLow": "Hatari ndogo ya kisheria",
  "legendMedium": "Wastani au bado kukaguliwa",
  "legendHigh": "Hatari kubwa au kubwa sana",
  "showMore": "Onyesha nchi nyingine {count}",
  "noteUnknownOne": "Kampuni nyingine {count} kati ya {firms} haina nchi iliyobainishwa.",
  "noteUnknown": "Kampuni nyingine {count} kati ya {firms} hazina nchi iliyobainishwa.",
  "noteBar": "Mchoro unaonyesha kiwango cha faili za kisheria kwa kila kampuni iliyosajiliwa hapo, si alama ya nchi.",
  "noteMarkers": "Alama za orodha rasmi: {list}.",
  "noteNone": "Hakuna nchi hizi kwenye orodha ya {fatf} ({fatfDate}) wala {eu} ({euDate})."
} },
};
export default m;
