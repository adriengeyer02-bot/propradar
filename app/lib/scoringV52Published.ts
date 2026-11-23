/**
 * V5.2 publication gate: owner-reviewed, evidence-dated 13-criterion cards.
 * 90 previously released + 31 additionally approved 23 Nov 2026 = 121.
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
import latestRelease from '../data/scoring-v52-31-owner-release-2026-11-23.json';
import migratedEvidence from '../data/scoring-v52-all-existing-audits-2026-11-21.json';
import { computeV52Scorecard, type V52Scorecard } from './scoringV52';

type AuditOrigin = {kind:'migration';card:V5Scorecard}|{kind:'native'|'reviewedMigration';card:V52Scorecard};
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
// The 25 owner-approved conversions are in the Nov 21 41-row evidence matrix,
// NOT in the 11 previously-published V5 card files. Preserve all 13 source links.
const ownerCards=new Map<string,{card:V52Scorecard,kind:'native'|'reviewedMigration'}>();
for(const card of ownerRelease.reviewedAudits as V52Scorecard[]){
  if(ownerCards.has(card.slug)||newCards.has(card.slug)) throw Error('V5.2 reviewed duplicate '+card.slug);
  computeV52Scorecard({...card,status:'proposition'});
  ownerCards.set(card.slug,{card,kind:'native'});
}
const migratedRows=new Map(migratedEvidence.rows.map(row=>[row.slug,row]));
for(const slug of ownerRelease.migrationSlugs){
  const row=migratedRows.get(slug);
  if(!row||ownerCards.has(slug)||newCards.has(slug)||source.has(slug)) throw Error('V5.2 owner approved migration missing/duplicate '+slug);
  const criteria=Object.fromEntries((Object.keys(row.criteriaV52) as Array<keyof typeof row.criteriaV52>).map(k=>{
    const original=row.sourceCriteria[k];
    const points=row.criteriaV52[k];
    // Old V5 rationales sometimes explicitly cite the former scale; make the
    // V5.2 conversion explicit, without pretending a fresh evidence check.
    const reason=['A2','B1','B2'].includes(k)
      ? 'V5.2 conversion from a dated source-backed V5 audit (old '+original.points+', new '+points+'). Original evidence: '+original.reason
      : original.reason;
    return [k,{...original,points,reason}];
  })) as V52Scorecard['criteria'];
  const card:V52Scorecard={
    slug:row.slug,checkedOn:row.checkedOn,status:'proposition',
    confidence:row.confidence as V52Scorecard['confidence'],previousDisplayedScore:row.oldDisplayed,
    criteria,ruleDeductions:row.ruleDeductions as V52Scorecard['ruleDeductions'],
    trustpilotActiveNotice:row.trustpilotPenalty===6,
    contractingEntityMissing:row.legalCap===55&&row.criteriaV52.C1===0,
    activeUnsuspendedStrikeOff:row.legalCap===55&&row.criteriaV52.C2===2,
    closed:false,
  };
  if(computeV52Scorecard(card).final!==row.v52) throw Error('V5.2 approved migration score mismatch '+slug);
  ownerCards.set(slug,{card,kind:'reviewedMigration'});
}
// The 31 newly authorized full V5.2 scorecards were kept OUT of the active
// publication gate while being researched; their low confidence survives publication.
const latestCards=new Map<string,V52Scorecard>();
for(const card of latestRelease.newCards as V52Scorecard[]){
  if(latestCards.has(card.slug)||source.has(card.slug)||newCards.has(card.slug)||ownerCards.has(card.slug)||card.slug==='ck-capital') throw Error('V5.2 latest release duplicate / CK veto '+card.slug);
  computeV52Scorecard({...card,status:'proposition'});
  latestCards.set(card.slug,card);
}
if(latestRelease.newCards.length!==31||latestRelease.approvals.length!==31||latestCards.size!==31||!latestRelease.ckCapitalExplicitlyExcluded) throw Error('V5.2 latest 31 manifest invalid');
const latestApprovals=new Set(latestRelease.approvals.map(entry=>entry.slug));
if(latestApprovals.size!==31||[...latestApprovals].some(slug=>!latestCards.has(slug))) throw Error('V5.2 latest approved list not matched to cards');
const ownerMigrated=new Set(ownerRelease.migrationSlugs);
const ownerApprovedSlugs=new Set([...ownerMigrated,...ownerRelease.reviewedAudits.map(card=>card.slug)]);
if(ownerApprovedSlugs.size!==32||ownerMigrated.size!==25||ownerCards.size!==32||!ownerRelease.excludedSlugs.includes('ck-capital')||ownerApprovedSlugs.has('ck-capital')) throw Error('V5.2 owner release CK veto/count mismatch');
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
    const reviewed=ownerCards.get(entry.slug);
    const card=newCards.get(entry.slug)??reviewed?.card??latestCards.get(entry.slug);
    if(!card||card.checkedOn!==entry.checkedOn||computeV52Scorecard({...card,status:'approuvee'}).final!==entry.expectedFinal) throw Error('V5.2: new/reaudited/migrated card lacks matched evidence '+entry.slug);
    approved.set(entry.slug,{kind:reviewed?.kind??'native',card:{...card,status:'approuvee'}});
  }
}
for(const name of publishedPreviously)if(!approved.has(name))throw Error('V5.2: approved V5 firm was lost '+name);
if(approved.has('ck-capital')||approved.size!==121||[...ownerApprovedSlugs].some(s=>!approved.has(s))||[...latestApprovals].some(s=>!approved.has(s))) throw Error('V5.2: CK veto or 121-score release not enforced');
for(const entry of latestRelease.approvals){
  const got=approved.get(entry.slug);
  if(!got||got.kind!=='native'||got.card.checkedOn!==entry.checkedOn||computeV52Scorecard(got.card).final!==entry.expectedFinal||got.card.confidence!=='faible') throw Error('V5.2 latest approval drift '+entry.slug);
}

export function isPublishedV52(slug:string,latestScoreReview?:string):boolean {
  const source=approved.get(slug);
  // Owner approved the 32 candidate snapshots on 23 Nov after reviewing the score movements.
  // Keep the original evidence date for source traceability; only use the decision date
  // when deciding whether this approval supersedes earlier website score edits.
  if(!source) return false;
  const gatingDate=ownerApprovedSlugs.has(slug)?ownerRelease.approvedOn:latestApprovals.has(slug)?latestRelease.approvedOn:source.card.checkedOn;
  return !latestScoreReview||latestScoreReview<=gatingDate;
}
export function getPublishedV52Score(firm:PropFirm,latestScoreReview?:string) {
  if(!isPublishedV52(firm.slug,latestScoreReview)) return undefined;
  const origin=approved.get(firm.slug)!;
  const card=origin.card;
  // A native audit explicitly examined the Trustpilot withholding notice at its
  // checkedOn date. Earlier site metadata can be stale: use the newer audited
  // snapshot unless an even newer public-signal check supersedes it.
  const nativeNoticeCurrent=origin.kind!=='migration' && !(firm.reviewSignals.lastSignalCheck>card.checkedOn);
  const currentFlag=origin.kind!=='migration' && nativeNoticeCurrent
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
