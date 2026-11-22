/** V5.2 candidate calculation. Not wired to public scores until source review and approval. */
import { V5_CRITERIA, V5_BLOCKS, V5_MAXIMA, type V5Scorecard, type V5Block, type V5Criterion } from './scoringV5';

export type V52Rule = { factId: string; kind: 'contradiction'|'ambiguite'|'retroactivite'|'asymetrie'; points: 3|4; program: string; phase: string; clause: string; consequence: string; source: string };
export type V52Result = {
  blocks: Record<V5Block, number>;
  editorialGross: number;
  rulesPenalty: number;
  afterRules: number;
  trustpilotPenalty: 0|6;
  adjusted: number;
  payoutEvidenceCap: 64|69|79|null;
  safetyCap: 55|null;
  final: number|null;
  confidence: V5Scorecard['confidence'];
  criteriaPoints: Record<V5Criterion,number>;
  ruleDeductions: V52Rule[];
};

const a2Map: Record<number,number> = {0:0,2:2,4:4,6:6,8:6,9:9,10:10};
const b1Map: Record<number,number> = {0:0,2:0,5:3,8:6,11:9,13:12,15:15};
const ruleCost = {contradiction:3,ambiguite:3,retroactivite:4,asymetrie:3} as const;

/** Migrates existing sourced V5 card to V5.2; DOES NOT replace independent evidence review. */
export function computeV52Candidate(card: V5Scorecard): V52Result {
  const keys = Object.keys(V5_CRITERIA) as V5Criterion[];
  if (keys.some(k=>!card.criteria[k] || !Number.isInteger(card.criteria[k].points))) throw Error(card.slug+': incomplete 13-criterion audit');
  const a2 = a2Map[card.criteria.A2.points], b1=b1Map[card.criteria.B1.points];
  if (a2===undefined || b1===undefined) throw Error(card.slug+': unsupported legacy A2/B1 value');
  const ruleDeductions: V52Rule[] = [];
  const seen=new Set<string>();
  for (const rule of card.ruleDeductions??[]) {
    if (seen.has(rule.factId) || !rule.source?.startsWith('https://') || !rule.program || !rule.phase || !rule.consequence) throw Error(card.slug+': duplicate or incomplete rule');
    if (!card.criteria.B2.negativeFactIds?.includes(rule.factId)) throw Error(card.slug+': missing B2 source linkage');
    seen.add(rule.factId);
    ruleDeductions.push({...rule,points:ruleCost[rule.kind]});
  }
  const rulesPenalty=Math.min(10,ruleDeductions.reduce((n,r)=>n+r.points,0));
  const criteriaPoints={...Object.fromEntries(keys.map(k=>[k,card.criteria[k].points])),A2:a2,B1:b1,B2:10-rulesPenalty} as Record<V5Criterion,number>;
  const blocks={} as Record<V5Block,number>;
  for(const block of Object.keys(V5_BLOCKS) as V5Block[]) {
    blocks[block]=V5_BLOCKS[block].reduce((n,k)=>n+criteriaPoints[k],0);
    if(blocks[block]>V5_MAXIMA[block]) throw Error(card.slug+': invalid block '+block);
  }
  const afterRules=Object.values(blocks).reduce((n,x)=>n+x,0);
  const editorialGross=afterRules+rulesPenalty;
  const trustpilotPenalty:0|6=card.trustpilotActiveNotice?6:0;
  const adjusted=Math.max(0,afterRules-trustpilotPenalty);
  const a3=criteriaPoints.A3;
  const payoutEvidenceCap:64|69|79|null=a3<=1?64:a3===2?69:a3===3?79:null;
  if(card.contractingEntityMissing&&criteriaPoints.C1!==0) throw Error(card.slug+': C1 must be zero');
  if(card.activeUnsuspendedStrikeOff&&criteriaPoints.C2!==2) throw Error(card.slug+': C2 must be two');
  const safetyCap:55|null=card.contractingEntityMissing||card.activeUnsuspendedStrikeOff?55:null;
  return {blocks,editorialGross,rulesPenalty,afterRules,trustpilotPenalty,adjusted,payoutEvidenceCap,safetyCap,
    final:card.closed?null:Math.min(adjusted,payoutEvidenceCap??100,safetyCap??100),
    confidence:card.confidence,criteriaPoints,ruleDeductions};
}
