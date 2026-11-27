import type { Locale } from './locales';
const copy:Record<Locale, [string,string,string,string,string,string]> = {
 en:['Simulators','Simulate constraints','Programme flexibility','Not evaluated','Programme evidence incomplete','Programme rating is separate from firm reliability.'],
 fr:['Simulateurs','Simuler les contraintes','Flexibilité du programme','Non évalué','Données du programme incomplètes','Cette évaluation est distincte de la fiabilité de la société.'],
 de:['Simulatoren','Regeln simulieren','Programmflexibilität','Nicht bewertet','Programmdaten unvollständig','Die Programmbewertung ist von der Firmenzuverlässigkeit getrennt.'],
 it:['Simulatori','Simula i vincoli','Flessibilità del programma','Non valutato','Dati del programma incompleti','La valutazione del programma è distinta dall’affidabilità della società.'],
 es:['Simuladores','Simular restricciones','Flexibilidad del programa','Sin evaluar','Datos del programa incompletos','La evaluación del programa es independiente de la fiabilidad de la firma.'],
 pt:['Simuladores','Simular restrições','Flexibilidade do programa','Não avaliado','Dados do programa incompletos','A avaliação do programa é distinta da fiabilidade da empresa.'],
 zh:['模拟器','模拟交易限制','项目灵活性','未评估','项目资料不完整','项目评价与公司可靠性评分独立。'],
 ja:['シミュレーター','制約をシミュレート','プログラムの柔軟性','未評価','プログラム資料が不完全','プログラム評価は会社の信頼性と別です。'],
 hi:['सिम्युलेटर','नियमों का अनुकरण','प्रोग्राम का लचीलापन','मूल्यांकन नहीं हुआ','प्रोग्राम की जानकारी अधूरी','प्रोग्राम की रेटिंग कंपनी की विश्वसनीयता से अलग है।'],
 tr:['Simülatörler','Kısıtları simüle et','Program esnekliği','Değerlendirilmedi','Program verileri eksik','Program puanı şirket güvenilirliğinden ayrıdır.'],
 ar:['المحاكيات','حاكِ القيود','مرونة البرنامج','لم يقيّم','بيانات البرنامج غير مكتملة','تقييم البرنامج منفصل عن موثوقية الشركة.'],
 ko:['시뮬레이터','제약 조건 시뮬레이션','프로그램 유연성','미평가','프로그램 정보 불완전','프로그램 평가는 회사 신뢰도와 별개입니다.'],
 sw:['Viigaji','Igiza masharti','Unyumbufu wa programu','Haijatathminiwa','Taarifa za programu hazijakamilika','Tathmini ya programu ni tofauti na uaminifu wa kampuni.'],
 ha:['Na’urorin kwaikwayo','Kwaikwayi ƙuntatawa','Sassaucin shirin','Ba a tantance ba','Bayanan shirin ba su cika ba','Makin shirin ya bambanta da amincin kamfani.'],
 am:['አስመሳዮች','ገደቦችን አስመስል','የፕሮግራም ተለዋዋጭነት','አልተገመገመም','የፕሮግራም መረጃ ያልተሟላ','የፕሮግራም ደረጃ ከኩባንያው አስተማማኝነት የተለየ ነው።']
};
export function simulatorLabel(locale:Locale){return copy[locale][0]}
export function simulatorCopy(locale:Locale){return copy[locale]}
