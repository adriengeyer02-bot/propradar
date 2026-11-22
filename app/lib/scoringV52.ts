/**
 * Canonical V5.2 assessor for NEW fully sourced audits.
 * Unlike computeV52Candidate (mechanical legacy V5 conversion), this accepts
 * V5.2 A2/B1 and 3/4-point B2 clauses natively.
 */
import { V5_CRITERIA, V5_BLOCKS, V5_MAXIMA, type V5Block, type V5Criterion, type V5Confidence, type V5Assessment } from './scoringV5';
import type { V52Rule } from './scoringV52Candidate';

export type V52Scorecard = {
  slug: string;
  checkedOn: string;
  status: 'proposition'|'approuvee';
  confidence: V5Confidence;
  previousDisplayedScore: number;
  criteria: Record<V5Criterion,V5Assessment>;
  ruleDeductions: V52Rule[];
  trustpilotActiveNotice: boolean;
  contractingEntityMissing: boolean;
  activeUnsuspendedStrikeOff: boolean;
  closed: boolean;
};
export type V52ScoreResult = {
  blocks: Record<V5Block,number>;
  editorialGross: number;
  rulesPenalty: number;
  afterRules: number;
  trustpilotPenalty: 0|6;
  adjusted: number;
  payoutEvidenceCap: 64|69|79|null;
  safetyCap:55|null;
  final:number|null;
  confidence:V5Confidence;
  criteriaPoints:Record<V5Criterion,number>;
  ruleDeductions:V52Rule[];
};
const allowed:Partial<Record<V5Criterion,readonly number[]>>={
  A2:[0,2,4,6,9,10], B1:[0,3,6,9,12,15],
  C1:[0,4,7,10], C2:[0,2,3,4,6], C3:[0,2,4], E1:[0,1,2,4,6]
};
const b2Cost={contradiction:3,ambiguite:3,retroactivite:4,asymetrie:3} as const;
export function computeV52Scorecard(card:V52Scorecard):V52ScoreResult {
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(card.slug)) throw Error('V5.2 invalid slug');
  if(!/^\d{4}-\d{2}-\d{2}$/.test(card.checkedOn)||!Number.isFinite(Date.parse(card.checkedOn))) throw Error(card.slug+': invalid checkedOn');
  if(!['proposition','approuvee'].includes(card.status)||!['elevee','moyenne','faible'].includes(card.confidence)) throw Error(card.slug+': invalid status/confidence');
  if(!Number.isInteger(card.previousDisplayedScore)||card.previousDisplayedScore<0||card.previousDisplayedScore>100) throw Error(card.slug+': invalid previous score');
  const keys=Object.keys(V5_CRITERIA) as V5Criterion[];
  if(Object.keys(card.criteria).length!==keys.length||keys.some(k=>!card.criteria[k])) throw Error(card.slug+': exactly 13 criteria required');
  const negatives=new Set<string>();
  for(const k of keys){
    const item=card.criteria[k];
    if(!Number.isInteger(item.points)||item.points<0||item.points>V5_CRITERIA[k]||(allowed[k]&&!allowed[k]!.includes(item.points))) throw Error(card.slug+'/'+k+': invalid score');
    if(!item.reason||item.reason.length<40||!item.sources?.length||item.sources.some(url=>!/^https:\/\/\S+$/.test(url))) throw Error(card.slug+'/'+k+': missing rationale/source');
    for(const id of item.negativeFactIds??[]){
      if(!id.trim()||negatives.has(id)) throw Error(card.slug+': duplicate negative fact '+id);
      negatives.add(id);
    }
  }
  const rules=card.ruleDeductions??[];
  const ruleIds=new Set<string>();
  let rawRulesPenalty=0;
  for(const rule of rules){
    if(ruleIds.has(rule.factId)||rule.points!==b2Cost[rule.kind]||!rule.program?.trim()||!rule.phase?.trim()||!rule.clause?.trim()||!rule.consequence?.trim()||!/^https:\/\/\S+$/.test(rule.source)||!card.criteria.B2.sources.includes(rule.source)||!card.criteria.B2.negativeFactIds?.includes(rule.factId)) throw Error(card.slug+': invalid B2 source or duplicate rule '+rule.factId);
    ruleIds.add(rule.factId);rawRulesPenalty+=rule.points;
  }
  if(rawRulesPenalty>10||rawRulesPenalty!==10-card.criteria.B2.points||rules.length!==(card.criteria.B2.negativeFactIds??[]).length) throw Error(card.slug+': B2 must match the exact single-use deductions');
  if(card.contractingEntityMissing&&card.criteria.C1.points!==0) throw Error(card.slug+': C1=0 required for unknown entity');
  if(card.activeUnsuspendedStrikeOff&&card.criteria.C2.points!==2) throw Error(card.slug+': C2=2 required for strike-off cap');
  const criteriaPoints=Object.fromEntries(keys.map(k=>[k,card.criteria[k].points])) as Record<V5Criterion,number>;
  const blocks={} as Record<V5Block,number>;
  for(const b of Object.keys(V5_BLOCKS) as V5Block[]){
    blocks[b]=V5_BLOCKS[b].reduce((sum,k)=>sum+card.criteria[k].points,0);
    if(blocks[b]>V5_MAXIMA[b]) throw Error(card.slug+': '+b+' exceeds V5.2 maximum');
  }
  const afterRules=Object.values(blocks).reduce((sum,x)=>sum+x,0);
  const editorialGross=afterRules+rawRulesPenalty;
  const trustpilotPenalty:0|6=card.trustpilotActiveNotice?6:0;
  const adjusted=Math.max(0,afterRules-trustpilotPenalty);
  const A3=card.criteria.A3.points;
  const payoutEvidenceCap:64|69|79|null=A3<=1?64:A3===2?69:A3===3?79:null;
  const safetyCap:55|null=card.contractingEntityMissing||card.activeUnsuspendedStrikeOff?55:null;
  const final=card.closed?null:Math.min(adjusted,payoutEvidenceCap??100,safetyCap??100);
  return {blocks,editorialGross,rulesPenalty:rawRulesPenalty,afterRules,trustpilotPenalty,adjusted,payoutEvidenceCap,safetyCap,final,confidence:card.confidence,criteriaPoints,ruleDeductions:rules};
}
