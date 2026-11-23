/**
 * V5.2 publication gate: owner-reviewed, evidence-dated 13-criterion cards.
 * 58 previously released + 32 explicitly approved 23 Nov 2026.
 * CK Capital is expressly rejected; the old live score stays untouched.
 * Mechanical source migrations remain distinct from newer native reaudits.
 */
import whitelist from '../data/scoring-v52-published.json';
import oldWhitelist from '../data/scoring-v5-published.json';
import c01 from '../data/scoring-v5-proposals-c01.json';
import n01 from '../data/scoring-v5-proposals-n01.json';
import type { PropFirm } from './propFirms';
import type { V5Scorecard } from './scoringV5';
import { computeV5Scorecard } from './scoringV5';
import { computeV52Candidate } from './scoringV52Candidate';
import freshAudits from '../data/scoring-v52-new-audits.json';
import ownerRelease from '../data/scoring-v52-owner-approved-2026-11-23.json';
import { computeV52Scorecard, type V52Scorecard } from './scoringV52';

type AuditOrigin = {kind:'migration';card:V5Scorecard}|{kind:'native';card:V52Scorecard};
const source = new Map<string,V5Scorecard>();
for(const card of [...c01.firms,...n01.firms] as V5Scorecard[]) {
  if (source.has(card.slug)) throw Error('V5.2 duplicate source '+card.slug);
  source.set(card.slug,card);
}
const newCards=new Map<string,V52Scorecard>();
for(const card of freshAudits.audits as V52Scorecard[]){
  if(newCards.has(card.slug)||source.has(card.slug)) throw Error('V5.2 duplicate new audit '+card.slug);
  // Full 13-criterion and unique B2 fact check, even when not yet approved.
  computeV52Scorecard({...card,status:'proposition'});
  newCards.set(card.slug,card);
}
const ownerCards=new Map<string,V52Scorecard>();
for(const card of ownerRelease.reviewedAudits as V52Scorecard[]){
  if(ownerCards.has(card.slug)||newCards.has(card.slug)) throw Error('V5.2 owner release duplicate '+card.slug);
  computeV52Scorecard({...card,status:'proposition'});
  ownerCards.set(card.slug,card);
}
const ownerMigrated=new Set(ownerRelease.migrationSlugs);
const ownerApprovedSlugs=new Set([...ownerMigrated,...ownerCards.keys()]);
if(ownerApprovedSlugs.size!==32||ownerMigrated.size!==25||ownerCards.size!==7||!ownerRelease.excludedSlugs.includes('ck-capital')||ownerApprovedSlugs.has('ck-capital')) throw Error('V5.2 owner release CK veto/count mismatch');
const approved = new Map<string,AuditOrigin>();
const publishedPreviously = new Set(oldWhitelist.approvals.map(x=>x.slug));
if(whitelist.approvals.length<oldWhitelist.approvals.length) throw Error('V5.2: previously approved firm missing');
for(const entry of whitelist.approvals) {
  if(approved.has(entry.slug)) throw Error('V5.2: duplicate approval '+entry.slug);
  const original=oldWhitelist.approvals.find(a=>a.slug===entry.slug);
  if(original) {
    const card=source.get(entry.slug);
    if(!card||!publishedPreviously.has(entry.slug)||card.checkedOn!==entry.checkedOn||original.checkedOn!==entry.checkedOn||entry.sourceV5Final!==original.expectedFinal) throw Error('V5.2: prior V5 audit source changed '+entry.slug);
    if(computeV5Scorecard({...card,status:'approuvee'}).final!==original.expectedFinal) throw Error('V5.2: prior audit arithmetic changed '+entry.slug);
    if(computeV52Candidate({...card,status:'approuvee'}).final!==entry.expectedFinal) throw Error('V5.2: converted score changed '+entry.slug);
    approved.set(entry.slug,{kind:'migration',card:{...card,status:'approuvee'}});
  } else {
    const card=newCards.get(entry.slug)??ownerCards.get(entry.slug);
    if(card){
      if(card.checkedOn!==entry.checkedOn||computeV52Scorecard({...card,status:'approuvee'}).final!==entry.expectedFinal) throw Error('V5.2: new/reaudited card lacks matched approval '+entry.slug);
      approved.set(entry.slug,{kind:'native',card:{...card,status:'approuvee'}});
    } else {
      const sourceCard=source.get(entry.slug);
      if(!ownerMigrated.has(entry.slug)||!sourceCard||sourceCard.checkedOn!==entry.checkedOn||computeV52Candidate({...sourceCard,status:'approuvee'}).final!==entry.expectedFinal) throw Error('V5.2: owner-approved migrated card does not match 13-criterion source '+entry.slug);
      approved.set(entry.slug,{kind:'migration',card:{...sourceCard,status:'approuvee'}});
    }
  }
}
for(const name of publishedPreviously)if(!approved.has(name))throw Error('V5.2: approved V5 firm was lost '+name);
if(approved.has('ck-capital')||approved.size!==90||[...ownerApprovedSlugs].some(s=>!approved.has(s))) throw Error('V5.2: CK veto or 90-score release not enforced');

export function isPublishedV52(slug:string,latestScoreReview?:string):boolean {
  const source=approved.get(slug);
  // Owner approved the 32 candidate snapshots on 23 Nov after reviewing the score movements.
  // Keep the original evidence date for source traceability; only use the decision date
  // when deciding whether this approval supersedes earlier website score edits.
  if(!source) return false;
  const gatingDate=ownerApprovedSlugs.has(slug)?ownerRelease.approvedOn:source.card.checkedOn;
  return !latestScoreReview||latestScoreReview<=gatingDate;
}
export function getPublishedV52Score(firm:PropFirm,latestScoreReview?:string) {
  if(!isPublishedV52(firm.slug,latestScoreReview)) return undefined;
  const origin=approved.get(firm.slug)!;
  const card=origin.card;
  // A native audit explicitly examined the Trustpilot withholding notice at its
  // checkedOn date. Earlier site metadata can be stale: use the newer audited
  // snapshot unless an even newer public-signal check supersedes it.
  const nativeNoticeCurrent=origin.kind==='native' && !(firm.reviewSignals.lastSignalCheck>card.checkedOn);
  const currentFlag=origin.kind==='native' && nativeNoticeCurrent
    ?origin.card.trustpilotActiveNotice:Boolean(firm.reviewSignals.trustpilotRatingWithheld);
  const result=origin.kind==='migration'
    ?computeV52Candidate({...origin.card,closed:firm.status==='Fermée',trustpilotActiveNotice:currentFlag})
    :computeV52Scorecard({...origin.card,closed:firm.status==='Fermée',trustpilotActiveNotice:currentFlag});
  return {...result,
    checkedOn:card.checkedOn,
    nativeAudit:origin.kind==='native'?{
      A3:card.criteria.A3.points,
      B1:card.criteria.B1.points,
      C1:card.criteria.C1.points,
      trustpilotNotice:nativeNoticeCurrent?origin.card.trustpilotActiveNotice:undefined,
    }:undefined,
    independentPayoutProofLimited:card.criteria.A3.points<3,
    contractProtection:{points:result.criteriaPoints.B1,reason:card.criteria.B1.reason,source:card.criteria.B1.sources[0]},
    contractingEntityVerified:card.criteria.C1.points>=7,
    positivePayoutEvidence:card.criteria.A3.points>=3?{
      reason:card.criteria.A3.reason,
      source:card.criteria.A3.sources.find(u=>u.includes('payoutjunction.com/firms/'))??card.criteria.A3.sources[0]
    }:undefined
  };
}
