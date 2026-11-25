import type { FirmUpdate, RestrictiveRule } from './firmUpdates';
import type { Product } from './propFirms';
import type { Locale } from './locales';
import registry from '../data/program-scores-v31.json';

export type ProgrammeDeduction = {family:string;points:number;reason:string;source?:string};
export type ProgrammeScore = {score:number;scope:string;checkedOn:string;method:'reviewed-simulation'|'scoped-rules';deductions:ProgrammeDeduction[];sources:string[]};
const data = registry as unknown as {version:string;bindings:Record<string,Record<string,string>>;scores:Record<string,Record<string,ProgrammeScore[]>>};
const norm = (s:string) => s.normalize('NFKC').trim().toLowerCase();
export const programmeScopeKeys = (slug:string,p:Product,u?:FirmUpdate) => {
 const key = data.bindings[slug]?.[p.id];
 const names = (u?.auditedPrograms??[]).filter(a=>a.key===p.id||norm(a.name)===norm(p.name)).map(a=>a.key);
 return new Set([p.id,...names,...(key?[key]:[])]);
};
function classify(r:RestrictiveRule):{family:string;points:number}|undefined {
 if(r.status==='conflicting'||!r.source?.startsWith('https://')||!r.category)return;
 const s=(r.rule+' '+r.impact).toLowerCase();
 const reward=/payout|reward|payment|performance fee|profit share|withdrawal/.test(s);
 const loss=/forfeit|void|deduct|remove|confiscat|delet|not paid|not payable|cancel|eliminat/.test(s);
 const discretion=/discretion|final decision|final assessment|subjective|unilateral|without (?:stated )?reason|any reason|no reason|undefined|qualitative/.test(s);
 const closure=/terminat|clos(?:e|ed|ure)|hard breach|deactivat/.test(s);
 const denial=/deny|denial|denied|refus|reject|revoke|withhold|withheld|declin|forfeit|cancel/.test(s);
 const points=(family:string,points:number)=>({family,points});
 switch(r.category){
  case 'discretionary-clause':
   if(/all accounts, including|accounts purchased before|earlier purchases|existing accounts|previously purchased|retroactiv/.test(s)&&/change|amend|modif|revis/.test(s)&&!/(?:not|never) apply retroactiv|non-retroactiv|grandfather/.test(s))return points('retroactive-change',7);
   if(reward&&denial&&/(?:any or no reason|without (?:any |a stated )?reason|for no reason)/.test(s))return points('discretionary-denial',25);
   if(reward&&denial&&discretion)return points('discretionary-denial',r.severity==='blocking'?16:8);
   if(discretion&&closure&&r.clarity==='vague')return points('qualitative-restriction',4);
   return;
  case 'consistency': {
   // Single numerical percentage only; combined tiers or ratios require manual reading.
   if(r.clarity!=='clear'||!/(best.day|winning day|single day|single trade|trade idea|consistency)/.test(s))return;
   if(/no (?:funded |evaluation |default )?consistency|without (?:a )?consistency|consistency (?:is )?not (?:required|applied)/.test(r.rule.toLowerCase()))return;
   if(!/(?:best.day|winning day|single day|single trade|trade idea|consistency)[^.;]{0,80}\d+(?:\.\d+)?\s*%|\d+(?:\.\d+)?\s*%[^.;]{0,80}(?:best.day|winning day|single day|single trade|trade idea|consistency)/i.test(r.rule))return;
   const vals=[...new Set(Array.from(r.rule.matchAll(/(\d+(?:\.\d+)?)\s*%/g),m=>Number(m[1])))];
   if(vals.length!==1||vals[0]<=0||vals[0]>100)return;
   const n=vals[0];return n>=40?undefined:points('consistency',n>=30?1:n>=20?3:n>=15?5:7);
  }
  case 'payout-cap':
   if(!/cap|limit|excess|maximum/.test(s))return;
   if(/excess|above|surplus|exceed/.test(s)&&loss&&!/remain(?:s|ing)? in the account|later requests|not (?:deleted|deducted|removed)|carried forward/.test(s))return points('profit-deletion',10);
   if(/per.request|per payout|each payout|each request|first (?:two|three)|50% of (?:profit|balance|gains)/.test(s))return points('liquidity-limit',r.severity==='blocking'?4:2);
   return;
  case 'account-ends-after-payouts':
   if(/one payout|single payout|only one (?:reward|withdrawal)/.test(s)&&closure)return points('finite-payout-path',10);
   if(/(?:after|following) (?:the )?(?:\d+|two|three|four|five|six)(?:\s+\w+){0,3} (?:payout|withdrawal|reward)/.test(s)&&closure)return points('finite-payout-path',7);
   if(closure&&discretion&&reward&&denial)return points('discretionary-denial',16);
   return;
  case 'min-hold-time':
   if(reward&&loss&&/losses (?:remain|count|retained)|losses are (?:retained|kept)|losses kept/.test(s))return points('asymmetric-profit-removal',8);
   if(loss&&/profit|gain/.test(s)&&/second|minute|duration|held/.test(s))return points('asymmetric-profit-removal',5);
   if(/minimum hold|hold every trade|must hold|at least \d+ (?:second|minute)/.test(s))return points('minimum-hold',3);
   return;
  case 'news':
   if(loss&&/profit|gain/.test(s))return points('news-restriction',/losses (?:remain|count|retained)|losses are (?:retained|kept)|losses kept/.test(s)?8:5);
   if(/prohibit|restrict|forbid|blackout|not allowed|must be flat/.test(s))return points('news-restriction',closure?5:1);
   return;
  case 'weekend-overnight':
   if(/prohibit|restrict|forbid|not allowed|must close|auto.close/.test(s))return points('holding-restriction',closure?3:2);
   return;
  case 'split-reduction':
   if(/reduc|cut|drops|falls/.test(s)&&/first (?:breach|violation|trigger|occurrence)|strike|second (?:breach|violation|trigger|occurrence)/.test(s))return points('risk-sanction',/\b10\s*%/.test(s)?15:11);
   return;
  case 'lot-risk-limit':
   if(/first (?:breach|violation|trigger|occurrence)|strike/.test(s)&&/split|reward|payout/.test(s)&&/reduc|cut|drops|falls/.test(s))return points('risk-sanction',/\b10\s*%/.test(s)?15:11);
   if(/floating (?:loss|drawdown|pnl|p&l)|per trade idea|per position|per trade loss/.test(s)&&closure)return points('risk-sanction',/\b1(?:\.0)?\s*%/.test(s)?7:5);
   return;
  case 'funded-trailing-drawdown':
   if(/intraday|unrealized equity|unrealised equity/.test(s)&&/trail|highest/.test(s))return points('drawdown',3);
   if(/end.of.day|eod|daily reset|closed daily/.test(s)&&/trail|highest/.test(s))return points('drawdown',1);
   return;
  default:return;
 }
}
export function getProgrammeScores(slug:string,p:Product,u:FirmUpdate|undefined):ProgrammeScore[]{
 const seeded=data.scores[slug]?.[p.id];
 if(seeded)return seeded;
 if(!u?.restrictiveRules?.length)return [];
 const scope=programmeScopeKeys(slug,p,u);
 const selected=u.restrictiveRules.filter(r=>r.appliesTo?.length&&r.appliesTo.some(k=>scope.has(k)));
 // Do not rate a generic family or umbrella product using firm-wide rules alone.
 if(!selected.length||!selected.some(r=>classify(r)))return [];
 const common=u.restrictiveRules.filter(r=>r.appliesTo?.includes('*'));
 const deductions=new Map<string,ProgrammeDeduction>();
 for(const r of [...selected,...common]){
   const item=classify(r);if(!item)continue;
   const entry={...item,reason:r.rule,source:r.source};
   if((deductions.get(entry.family)?.points??0)<entry.points)deductions.set(entry.family,entry);
 }
 // Related punitive mechanisms must not stack: a discretionary denial and a
 // qualitative restriction describing the same risk decision count once.
 if(deductions.has('discretionary-denial'))deductions.delete('qualitative-restriction');
 // A hard risk/strike rule can already subsume confiscation for that trigger.
 // Do not combine a duplicate cross-category rule if identical evidence wording.
 const list=[...deductions.values()].filter((d,i,a)=>!a.some((o,j)=>j!==i&&o.source===d.source&&o.reason===d.reason&&(o.points>d.points||(o.points===d.points&&j<i))));
 // Numeric split in product inventory is an explicitly labelled baseline; it is not inferred from the firm's headline. The rest of the score remains provisional.
 const match=p.profitSplit.match(/^(\d+(?:\.\d+)?)\s*%(?:\s*(?:initial(?:ly)?|base|default|standard|from the start|first payout))?(?:\s*[,;]|\s*$)/i);
 if(match){const n=Number(match[1]);if(n>=50&&n<80)list.push({family:'initial-split',points:n>=70?1:n>=60?2:4,reason:p.profitSplit});}
 // No 100-point placeholder and no grade based on one thin fact alone.
 if(list.length<2||!list.some(d=>d.source))return [];
 return [{score:Math.max(0,100-list.reduce((sum,d)=>sum+d.points,0)),scope:p.name,checkedOn:u.reviewedAt,method:'scoped-rules',deductions:list,sources:[...new Set(list.flatMap(d=>d.source?[d.source]:[]))]}];
}

const labels:Record<Locale,readonly string[]> = {
 en:['At a glance','Markets / models','Strength','Watch out','Programmes assessed','Provisional','Audit to complete','Score details','Known deductions only; incomplete audit. Not a final rating.','Firm review','Full profile','No comparable grade yet'],
 fr:['En un coup d’œil','Marchés / modèles','Point fort','Point de vigilance','Programmes évalués','Provisoire','Audit à compléter','Détail de la note','Déductions documentées uniquement ; audit incomplet. Note non définitive.','Revue société','Profil détaillé','Pas encore de note comparable'],
 de:['Auf einen Blick','Märkte / Modelle','Stärke','Achtung','Programme bewertet','Vorläufig','Audit offen','Bewertungsdetails','Nur belegte Abzüge; Audit unvollständig. Keine endgültige Bewertung.','Firmenprüfung','Vollständiges Profil','Noch keine vergleichbare Note'],
 it:['In sintesi','Mercati / modelli','Punto di forza','Attenzione','Programmi valutati','Provvisorio','Audit da completare','Dettaglio del voto','Solo detrazioni documentate; audit incompleto. Voto non definitivo.','Revisione società','Profilo completo','Nessun voto comparabile'],
 es:['De un vistazo','Mercados / modelos','Fortaleza','Precaución','Programas evaluados','Provisional','Auditoría pendiente','Detalle de nota','Solo deducciones documentadas; auditoría incompleta. Nota no definitiva.','Revisión de empresa','Perfil completo','Sin nota comparable'],
 pt:['Resumo','Mercados / modelos','Ponto forte','Atenção','Programas avaliados','Provisório','Auditoria pendente','Detalhes da nota','Apenas deduções documentadas; auditoria incompleta. Nota não definitiva.','Revisão da empresa','Perfil completo','Sem nota comparável'],
 zh:['概览','市场 / 模式','优势','注意事项','已评估计划','暂定','待完成审核','评分详情','仅扣除已记录限制；审核未完成。非最终评分。','公司审核','完整资料','暂无可比评分'],
 ja:['概要','市場 / モデル','強み','注意点','評価済みプログラム','暫定','監査未完了','評価詳細','確認済みの減点のみ。監査未完了のため最終評価ではありません。','会社レビュー','詳細プロフィール','比較可能な評価なし'],
 hi:['एक नज़र में','बाज़ार / मॉडल','मज़बूती','सावधानी','मूल्यांकित प्रोग्राम','अस्थायी','ऑडिट अधूरा','स्कोर विवरण','केवल दस्तावेज़ित कटौतियां; अधूरा ऑडिट। अंतिम स्कोर नहीं।','कंपनी समीक्षा','पूरा प्रोफ़ाइल','तुलनीय स्कोर नहीं'],
 tr:['Bir bakışta','Piyasalar / modeller','Güçlü yön','Dikkat','Değerlendirilen programlar','Geçici','Denetim eksik','Puan ayrıntısı','Yalnızca belgelenen kesintiler; denetim eksik. Nihai puan değil.','Şirket incelemesi','Tam profil','Karşılaştırılabilir puan yok'],
 ar:['نظرة سريعة','الأسواق / النماذج','نقطة قوة','تنبيه','برامج مقيمة','مؤقت','تدقيق غير مكتمل','تفاصيل التقييم','خصومات موثقة فقط؛ التدقيق غير مكتمل. ليس تقييماً نهائياً.','مراجعة الشركة','الملف الكامل','لا تقييم قابل للمقارنة'],
 ko:['한눈에 보기','시장 / 모델','강점','주의점','평가된 프로그램','잠정','감사 미완료','점수 세부사항','확인된 감점만 반영; 감사 미완료. 최종 평가 아님.','회사 검토','전체 프로필','비교 가능한 점수 없음'],
 sw:['Muhtasari','Masoko / mifumo','Nguvu','Tahadhari','Programu zilizotathminiwa','Ya muda','Ukaguzi haujakamilika','Maelezo ya alama','Makato yaliyothibitishwa pekee; ukaguzi haujakamilika. Si alama ya mwisho.','Mapitio ya kampuni','Wasifu kamili','Hakuna alama linganishi'],
 ha:['A taƙaice','Kasuwanni / tsare-tsare','Ƙarfi','Lura','Shirye-shiryen da aka tantance','Na wucin gadi','Bincike bai cika ba','Bayanin maki','Ragi bisa takardu kawai; bincike bai cika ba. Ba maki na ƙarshe ba.','Binciken kamfani','Cikakken bayani','Babu maki mai kwatanci'],
 am:['በአጭሩ','ገበያዎች / ሞዴሎች','ጥንካሬ','ማስጠንቀቂያ','የተገመገሙ ፕሮግራሞች','ጊዜያዊ','ኦዲት ያልተጠናቀቀ','የነጥብ ዝርዝር','የተመዘገቡ ቅናሾች ብቻ፤ ኦዲት ያልተጠናቀቀ። የመጨረሻ ነጥብ አይደለም።','የኩባንያ ግምገማ','ሙሉ መገለጫ','የሚነጻጸር ነጥብ የለም']
};
const scoreBasis:Record<Locale,string> = {
  "en": "Score based on documented programme rules; distinct from the firm reliability score.",
  "fr": "Note fondée sur les règles documentées du programme, distincte de la note de fiabilité de la société.",
  "de": "Bewertung anhand dokumentierter Programmregeln, getrennt von der Unternehmenszuverlässigkeit.",
  "it": "Voto basato sulle regole documentate del programma, distinto dall'affidabilità della società.",
  "es": "Nota basada en las reglas documentadas del programa, distinta de la fiabilidad de la empresa.",
  "pt": "Nota baseada nas regras documentadas do programa, distinta da fiabilidade da empresa.",
  "zh": "评分依据已记录的计划规则，与公司可靠性评分不同。",
  "ja": "文書で確認したプログラム規則に基づく評価で、会社の信頼性評価とは異なります。",
  "hi": "स्कोर प्रोग्राम के दस्तावेज़ित नियमों पर आधारित है, कंपनी की विश्वसनीयता से अलग।",
  "tr": "Belgelenen program kurallarına dayalı puan; şirket güvenilirlik puanından ayrıdır.",
  "ar": "درجة تستند إلى قواعد البرنامج الموثقة، وهي منفصلة عن درجة موثوقية الشركة.",
  "ko": "문서화된 프로그램 규칙에 따른 점수이며 회사 신뢰도 점수와는 별개입니다.",
  "sw": "Alama inategemea kanuni za programu zilizoandikwa, tofauti na alama ya uaminifu wa kampuni.",
  "ha": "Maki bisa ka'idojin shirin da aka rubuta, daban da amincin kamfani.",
  "am": "ነጥቡ በተመዘገቡ የፕሮግራም ደንቦች ላይ የተመሠረተ ሲሆን ከኩባንያው አስተማማኝነት ደረጃ የተለየ ነው።"
};
export function programmeScoreCopy(locale:Locale){
 const [snapshot,market,strength,watch,assessed,provisional,pending,detail,warning,firmReview,fullProfile,noGrade]=labels[locale]??labels.en;
 return {snapshot,market,strength,watch,assessed,provisional,pending,detail,warning,firmReview,fullProfile,noGrade,basis:scoreBasis[locale]??scoreBasis.en};
}
