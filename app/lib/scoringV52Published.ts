/**
 * Controlled V5.2 rollout: ONLY the same 11 V5 scorecards already approved,
 * recalculated on the frozen, source-linked corpus. Other V5.2 candidates are
 * strictly NOT public until their individual proof and contract audit passes.
 */
import whitelist from '../data/scoring-v52-published.json';
import oldWhitelist from '../data/scoring-v5-published.json';
import c01 from '../data/scoring-v5-proposals-c01.json';
import n01 from '../data/scoring-v5-proposals-n01.json';
import type { PropFirm } from './propFirms';
import type { V5Scorecard } from './scoringV5';
import { computeV5Scorecard } from './scoringV5';
import { computeV52Candidate } from './scoringV52Candidate';

const source = new Map<string,V5Scorecard>();
for(const card of [...c01.firms,...n01.firms] as V5Scorecard[]) {
  if (source.has(card.slug)) throw Error('V5.2 duplicate source '+card.slug);
  source.set(card.slug,card);
}
const approved = new Map<string,V5Scorecard>();
const publishedPreviously = new Set(oldWhitelist.approvals.map(x=>x.slug));
if(whitelist.approvals.length!==oldWhitelist.approvals.length) throw Error('V5.2: scope of approved V5 firms changed');
for(const entry of whitelist.approvals) {
  const card=source.get(entry.slug);
  const original=oldWhitelist.approvals.find(a=>a.slug===entry.slug);
  if (!card||!original||!publishedPreviously.has(entry.slug)||approved.has(entry.slug)) throw Error('V5.2: unknown or duplicate approved slug '+entry.slug);
  if(card.checkedOn!==entry.checkedOn||original.checkedOn!==entry.checkedOn||entry.sourceV5Final!==original.expectedFinal) throw Error('V5.2: source version changed '+entry.slug);
  const old=computeV5Scorecard({...card,status:'approuvee'});
  if(old.final!==original.expectedFinal) throw Error('V5.2: prior evidence changed '+entry.slug);
  const next=computeV52Candidate({...card,status:'approuvee'});
  if(next.final!==entry.expectedFinal) throw Error('V5.2: candidate score changed without reapproval '+entry.slug);
  approved.set(entry.slug,{...card,status:'approuvee'});
}

export function isPublishedV52(slug:string,latestScoreReview?:string):boolean {
  const card=approved.get(slug);
  return Boolean(card&&(!latestScoreReview||latestScoreReview<=card.checkedOn));
}
export function getPublishedV52Score(firm:PropFirm,latestScoreReview?:string) {
  if(!isPublishedV52(firm.slug,latestScoreReview)) return undefined;
  const card=approved.get(firm.slug)!;
  const result=computeV52Candidate({...card,closed:firm.status==='Fermée',trustpilotActiveNotice:Boolean(firm.reviewSignals.trustpilotRatingWithheld)});
  return {...result,
    checkedOn:card.checkedOn,
    independentPayoutProofLimited:card.criteria.A3.points<3,
    contractProtection:{points:result.criteriaPoints.B1,reason:card.criteria.B1.reason,source:card.criteria.B1.sources[0]},
    contractingEntityVerified:card.criteria.C1.points>=7,
    positivePayoutEvidence:card.criteria.A3.points>=3?{
      reason:card.criteria.A3.reason,
      source:card.criteria.A3.sources.find(u=>u.includes('payoutjunction.com/firms/'))??card.criteria.A3.sources[0]
    }:undefined
  };
}
