import type { Criterion, ProgrammeEvidence } from './programmeFlexibility';
import { CRITERIA, programmeFlexibility } from './programmeFlexibility';

/** Category V2: funded-stage quality, not success probability or company reliability.
 * Original absolute assessment stays intact. Fixed category thresholds, never percentiles.
 * Specific refinements match the exact reviewed reason; changed evidence cannot silently inherit them.
 */
export type ProgrammeCategory = 'one'|'two'|'three'|'challenge'|'instant'|'futures'|'futuresInstant'|'scaling'|'futuresScaling'|'crypto'|'cryptoInstant'|'equities'|'options';
export type CategoryProduct = { id:string; name:string; type:string; tradableAssets?:string[] };
const phaseOverrides:Record<string,ProgrammeCategory> = {'fundednext-stellar-lite-current':'two','qt-one':'one','qt-two':'two','qt-power':'two','e8-one-current':'one','e8-classic-v2-current':'one','bg-bnpl-current':'one'};
export function programmeCategory(p:CategoryProduct):ProgrammeCategory {
 const assets=p.tradableAssets??[];
 const futures=p.type==='Futures evaluation'||assets.some(a=>/^futures$/i.test(a.trim()));
 const crypto=assets.length>0&&assets.every(a=>/^crypto(?:currencies)?$/i.test(a.trim()));
 const options=assets.some(a=>/\boptions\b/i.test(a))||/\boptions\b/i.test(p.name);
 if(options)return 'options';
 if(p.type==='Scaling')return futures?'futuresScaling':'scaling';
 if(p.type==='Instant funding')return futures?'futuresInstant':crypto?'cryptoInstant':'instant';
 if(futures)return 'futures';
 if(crypto)return 'crypto';
 if(assets.length>0&&assets.every(a=>/^(?:US )?(?:stocks|equities)$/i.test(a.trim())))return 'equities';
 if(phaseOverrides[p.id])return phaseOverrides[p.id];
 const m=p.name.match(/\b(1|2|3|one|two|three)[\s-]*(?:step|phase|stage)s?\b/i)??p.name.match(/\bstep\s*([123])\b/i);
 return m?(['1','one'].includes(m[1].toLowerCase())?'one':['2','two'].includes(m[1].toLowerCase())?'two':'three'):'challenge';
}
export function isInstantCategory(c:ProgrammeCategory){return c==='instant'||c==='futuresInstant'||c==='cryptoInstant'}
const isFuturesCategory=(c:ProgrammeCategory)=>c==='futures'||c==='futuresInstant'||c==='futuresScaling';
const reviewedFacts:{drawdown:Record<string,string>;consistency:Record<string,number>;trading:Record<string,number>}={
  "drawdown": {
    "6% trailing below the highest closed balance, locking at the starting balance once reached.": "balance-lock",
    "8% trailing below the highest closed balance, locking at the starting balance once reached.": "balance-lock",
    "$2K intraday trailing, locks at $51K after balance exceeds $53K; $1K daily loss limit.": "lock-basis-unknown",
    "Live intraday trailing with daily loss stop; lock at starting balance.": "lock-basis-unknown",
    "6% trailing highest closed balance, locks at initial balance; highest floor preserved after withdrawals, remaining gap trails in next cycle.": "balance-lock",
    "6% trailing highest closing balance, locks at initial balance.": "balance-lock",
    "6% balance-high trailing, locks at initial balance.": "balance-lock",
    "Real-time balance trailing, stops at original balance; no daily loss limit.": "balance-lock",
    "5% closed-balance trailing, locks at initial balance at +5% or first payout.": "balance-lock",
    "7% trailing from highest closed balance, locks at initial capital.": "balance-lock",
    "8% maximum trailing drawdown on closed balance (not equity) until an 8% return, then permanently locked at the starting balance; sales grid also locks it at payout; it does not reset on withdrawal.": "balance-lock",
    "6% overall drawdown trails the highest recorded balance and locks at the initial balance once the account is up 6%.": "balance-lock",
    "6% trail from highest balance, locks at initial balance after +6%.": "balance-lock",
    "6% proportional closed-balance high-water trail, locks at initial balance.": "balance-lock",
    "4% closing-balance trailing, locks at initial balance.": "balance-lock",
    "6% highest-balance trailing; locks at initial balance after +3% gain.": "balance-lock",
    "4/6/8% highest-balance trailing, locks at initial balance.": "balance-lock",
    "5% high-water balance trail until initial balance.": "balance-lock",
    "6% trail below highest closed balance, locks at initial balance.": "balance-lock",
    "6% highest closed-balance trailing, locks at initial balance.": "balance-lock",
    "Dynamic maximum loss moves with each higher closed balance, not end-of-day; locks at initial balance.": "balance-lock",
    "6% maximum loss trailing the closed-balance high watermark until it reaches the initial balance (balance-based relative trailing).": "balance-lock",
    "6% maximum loss trailing the balance high watermark until it reaches the initial balance.": "balance-lock",
    "10% intraday trailing on highest closed-position balance; equity enforced. Withdrawal effect is assessed separately under payout.": "balance-trail",
    "Highest closed-balance trailing floor, 6% initial balance Single or 5% Intraday; US terms section 3 confirms the same trailing mechanism (plan percentages vary).": "balance-trail",
    "5% fixed-distance balance trail, never moves down.": "balance-trail",
    "3% starting-balance distance trailing closed balance.": "balance-trail",
    "5% of initial balance trailing from the highest balance, never locks; resets to the initial level only after a full withdrawal.": "balance-trail",
    "3% fixed-dollar trail from highest balance, never locks.": "balance-trail",
    "5% peak-balance trailing, no downward reset or lock after withdrawal.": "balance-trail",
    "6% peak-balance trailing, no downward reset or lock after withdrawal.": "balance-trail",
    "4% of highest balance on 25K/50K; 3% on 100K.": "balance-trail",
    "10% highest recorded balance trailing maximum loss.": "balance-trail",
    "5% balance-high trailing loss limit; no daily limit.": "balance-trail",
    "4% trailing high closed balance.": "balance-trail",
    "6% highest closed-balance trailing maximum loss.": "balance-trail",
    "10% highest closed-balance trailing maximum loss.": "balance-trail",
    "5% highest closed-balance trailing.": "balance-trail",
    "Intraday equity including unrealized gains; locks at initial balance.": "equity-lock",
    "6% trailing from highest equity, locks at initial capital.": "equity-lock",
    "8% trailing with equity, locks at initial balance on payout.": "equity-lock",
    "5% proportional equity high-water trail, locks at initial balance.": "equity-lock",
    "Funded 5% equity trailing, locks at starting balance.": "equity-lock",
    "6% peak balance/equity trailing, locks at starting balance upon withdrawal.": "equity-lock",
    "5% intraday equity-high trailing loss, locks at initial balance after 5% profit.": "equity-lock",
    "Funded 6% trailing on equity, following the equity high until it locks at the starting balance.": "equity-lock",
    "6% trailing maximum loss, locks at starting balance after 6% profit.": "lock-basis-unknown",
    "5% trailing loss locks at initial balance when payout requested.": "lock-basis-unknown",
    "7% trailing maximum loss, locks at starting balance upon payout or sufficient profit.": "lock-basis-unknown",
    "6% trailing maximum loss locks at initial balance.": "lock-basis-unknown",
    "Funded intraday trailing, locks at $100.": "lock-basis-unknown",
    "3% real-time trailing; first withdrawal locks the floor at initial balance.": "lock-basis-unknown"
  },
  "consistency": {
    "40% funded consistency; none in evaluation.": 40,
    "40% best day / net total profit; exceeding delays payout, not account failure.": 40,
    "21% best day / net total profit at payout eligibility.": 21,
    "21% net profit best-day ratio.": 21,
    "20% best-day share of current cycle profit.": 20,
    "Best trading day must be strictly below 40% of cycle profits; resets on each request.": 40,
    "40% of accumulated profit checked at payout; failure delays eligibility.": 40,
    "Best day below 50% of total profit, in evaluation and funded; not met means the payout stays unavailable, no breach.": 50,
    "Funded best day below 20% of profit in the payout period.": 20,
    "50% best closed day divided by total closed net trading profit; post-12 October cohort. Exceeding it delays eligibility, not termination.": 50,
    "50% funded best-day condition.": 50,
    "50% funded best-day ratio according to current product-specific FAQ.": 50,
    "50% funded net best day, resets after payout.": 50,
    "Funded best day strictly below 50% of total profit.": 50,
    "Best day must be strictly below 50% of profit since last approved payout.": 50,
    "Funded 50% best-day limit over the payout period; payout is blocked until met, not forfeited; resets after each payout. The programme worked example includes retained pre-withdrawal profit in denominator, so no standard net-cycle preset.": 50,
    "Best trading day must not exceed 40% of total generated profit when requesting a reward; eligibility condition, not a daily trading cap.": 40,
    "40% funded best day; eligibility delayed until compliant.": 40,
    "40% of net profit per cycle; reset after payout.": 40,
    "40% funded best-day concentration.": 40,
    "40% best day over current cycle total profit, resets after approval.": 40,
    "40% funded best-day requirement.": 40,
    "40% best-day share of total profit.": 40,
    "40% net best-day share per payout window.": 40,
    "40% funded net best day per cycle.": 40,
    "40% funded best day; reset on payout request.": 40,
    "40% best-day share of total profits to date; not established as cycle reset.": 40,
    "35% funded best-day ratio; none on Growth evaluation.": 35,
    "35% best-day ratio in both phases and funded.": 35,
    "35% net best day, resets at payout.": 35,
    "35% funded best-day criterion.": 35,
    "35% best day, reset after each processed reward.": 35,
    "45% best day divided by cumulative gross profits including prior payouts; not a per-cycle net denominator.": 45,
    "45% best day calculated from daily equity snapshots; resets after payout, not closed balance-only.": 45,
    "45% funded best day based on daily balance difference.": 45,
    "30% best closed day / total net closed P&L. Exceeding it delays reward eligibility; denominator resets after reward.": 30,
    "30% funded best-day consistency on all three plans, including Static.": 30,
    "30% best-day share of net total profit.": 30,
    "30% best-day share at withdrawal, new cohort only.": 30,
    "33% best-day limit at each payout.": 33,
    "33% funded best-day limit for Static.": 33,
    "20% funded best day; eligibility delayed until compliant.": 20,
    "20% first payout, 25% second, 30% subsequent.": 20,
    "20% best-day threshold before each payout.": 20,
    "20% best day over total profit required at payout.": 20,
    "Best day strictly below 20% initially, thresholds increase to 40% at level six.": 20,
    "Best day strictly below 20% of profit requested at level 1; rises to 40% at higher levels.": 20,
    "20% best day in current cycle; resets after approved payout.": 20,
    "20% best day, delays payout.": 20,
    "Cached article states 20% best-day maximum.": 20,
    "20% best day, buffer counts in denominator.": 20,
    "20% best day against net closed cycle profit.": 20,
    "20% equity-based best day.": 20,
    "20% best-day limit in funded reward cycle.": 20,
    "20% best-day limit.": 20,
    "20% funded best-day ratio.": 20,
    "20% funded best-day threshold.": 20,
    "25% best-day limit.": 25,
    "25% best day against net closed cycle profit.": 25,
    "25% best-day limit at payout request (delays, does not cancel); below the 30% threshold of the rubric.": 25,
    "15% best-day ratio delays payout.": 15,
    "15% consistency score: the largest winning day cannot exceed 15% of net profits since the last payout request.": 15,
    "No single day may exceed 15% of total profit before a payout.": 15,
    "15% best-day share of overall profit.": 15,
    "15% best-day share of net total profit.": 15,
    "15% best-day ratio, resets after payout.": 15,
    "15% best-day consistency.": 15,
    "15% best-day share of net profit.": 15,
    "20% funded best day (15% on 300K/400K), strict below threshold.": 15,
    "Best day strictly below 15% of total profit.": 15,
    "15% best-day rule resets at payout request.": 15,
    "15% maximum best-day ratio; delays payout until compliant.": 15
  },
  "trading": {
    "Scaled contract allocation and no swing holding across sessions.": 1,
    "News, own-account copying and no minimum trade duration allowed; no overnight/weekend holding and contract limits.": 1,
    "Intraday-only CME futures; prescribed daily closing times and conduct restrictions.": 1,
    "Product-specific contract limits and daily session restrictions.": 1,
    "Intraday futures; no overnight/weekend positions; programme news trading permitted.": 1,
    "News trading unrestricted; positions cannot be held overnight (auto-closed at session close); soft daily loss limit pauses the session.": 1,
    "News allowed; front-month contracts only, exchange margin limits.": 1,
    "News allowed; mandatory daily close and position limits.": 1,
    "News allowed, daily closure and contract limits.": 1,
    "Futures session and price-limit restrictions.": 1
  }
};
const normalHalf:Record<Criterion,number>={drawdown:.75,payout:.75,consistency:.5,trading:.75,funded:.75};
export function categoryAxis(c:ProgrammeCategory,k:Criterion,a:ProgrammeEvidence['assessments'][Criterion]):number|null{
 if(!a||![0,.5,1].includes(a.points)||!a.reason.trim()||!a.source.startsWith('https://'))return null;
 const instant=isInstantCategory(c),future=isFuturesCategory(c);
 if(k==='drawdown'&&a.points===0){
   const kind=reviewedFacts.drawdown[a.reason];
   if(kind==='balance-lock')return (instant||future) ? .75 : .5;
   if(kind==='balance-trail')return (instant||future) ? .25 : 0;
   if(kind==='equity-lock'||kind==='lock-basis-unknown')return (instant||future) ? .25 : 0;
 }
 if(k==='consistency'&&a.points!==1){
   const threshold=reviewedFacts.consistency[a.reason];
   if(threshold!==undefined){
     if(threshold>=50)return 1;
     if(threshold>=30)return .75;
     if(threshold>=20)return (instant||future) ? .5 : .25;
     if(threshold>=15)return (instant||future) ? .25 : 0;
   }
 }
 if(k==='trading'&&a.points===.5&&future&&reviewedFacts.trading[a.reason]===1)return 1;
 return a.points===.5?normalHalf[k]:a.points;
}
export function programmeCategoryRating(item:ProgrammeEvidence|undefined,c:ProgrammeCategory){
 const absolute=programmeFlexibility(item);
 const axes=Object.fromEntries(CRITERIA.map(k=>[k,categoryAxis(c,k,item?.assessments[k])])) as Record<Criterion,number|null>;
 const known=Object.values(axes).reduce<number>((sum,a)=>sum+(a??0),0);
 const missing=5-absolute.verified;
 // Preserve documentary estimates as estimates; missing axes keep the original assumption
 // rather than being upgraded by category without evidence.
 const oldKnown=CRITERIA.reduce((sum,k)=>sum+(axes[k]===null?0:item!.assessments[k]!.points),0);
 const estimate=absolute.estimatedStars===null?null:Math.min(known+missing,Math.max(known,known+absolute.estimatedStars-oldKnown));
 const range:[number,number]|null=estimate===null?null:[known,known+missing];
 const constraints=absolute.stars===null?null:5-absolute.stars;
 const constraintRange:[number,number]|null=absolute.range?[5-absolute.range[1],5-absolute.range[0]]:null;
 return {stars:absolute.stars===null?null:known,estimatedStars:estimate,range,axes,absolute,constraints,constraintRange};
}
export function constraintLevel(n:number):0|1|2|3{return n<=1?0:n<=2?1:n<=3?2:3}
