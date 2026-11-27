/** Product evidence is independent from Scale C. Exact product IDs only. */
export type Criterion = 'drawdown'|'payout'|'consistency'|'trading'|'funded';
export type Assessment = {points:0|0.5|1;source:string;reason:string};
export type ProgrammeEvidence = {
  checkedOn:string; scope:string; assessments:Partial<Record<Criterion,Assessment>>;
  /** Only explicitly verified facts. No assumption that a missing rule is absent. */
  preset?:{consistency?:number; consistencyBasis?:'net'; drawdown?:'static'|'eod'|'intraday'; lossPercent?:number; profitSplit?:number; source:string};
};
const objectives='https://ftmo.com/en/trading-objectives/';
const comparison='https://ftmo.com/en/comparison-table/';
const rewards='https://ftmo.com/faq/how-do-i-withdraw-my-profits/';
const news='https://ftmo.com/faq/can-i-trade-news/';
const swing='https://ftmo.com/en/faq/what-is-the-swing-account-type-and-how-does-it-work/';
const evidence:Record<string,Record<string,ProgrammeEvidence>>={
  ftmo:{
    'ftmo-one-step-current':{checkedOn:'2026-11-27',scope:'CFD Standard, orders created on or after 2026-10-12; funded-stage rules',assessments:{
      drawdown:{points:0.5,source:objectives,reason:'10% end-of-day trailing loss limit; reset on reward/new account.'},
      consistency:{points:0.5,source:objectives,reason:'50% best closed day divided by total closed net trading profit; post-12 October cohort. Exceeding it delays eligibility, not termination.'},
      payout:{points:1,source:rewards,reason:'Reward request from day 14; ordinary transaction minimums and 90% split.'},
      trading:{points:0.5,source:news,reason:'Funded Standard restricts order execution around selected news, including stop and target execution; Swing not offered.'},
      funded:{points:1,source:objectives,reason:'Funded-stage objectives, ordinary verification and no new profit target; drawdown and consistency already counted separately.'}
    },preset:{consistency:50,consistencyBasis:'net',drawdown:'eod',lossPercent:10,profitSplit:90,source:objectives}},
    'ftmo-two-step-current':{checkedOn:'2026-11-27',scope:'CFD 2-Step Standard baseline; Swing removes news and holding restrictions and merits +0.5 stars on the trading axis if chosen. Other axes unchanged.',assessments:{
      drawdown:{points:1,source:comparison,reason:'Static maximum loss 10%.'},
      consistency:{points:1,source:comparison,reason:'No percentage consistency rule on the 2-Step comparison table.'},
      payout:{points:1,source:rewards,reason:'Reward request from day 14, ordinary minimums, 80% default split and optional rollover.'},
      trading:{points:0.5,source:swing,reason:'Standard funded accounts restrict selected news and longer market closures. Swing permits both; rating uses Standard as baseline.'},
      funded:{points:1,source:objectives,reason:'No funded profit target or minimum trading days. Ordinary drawdown and verification requirements are not counted twice.'}
    },preset:{drawdown:'static',lossPercent:10,profitSplit:80,source:comparison}},
    'ftmo-instant-current':{checkedOn:'2026-11-27',scope:'CFD Instant, Standard; current offer',assessments:{
      drawdown:{points:0,source:objectives,reason:'10% intraday trailing on highest closed-position balance; equity enforced. Withdrawal effect is assessed separately under payout.'},
      consistency:{points:0.5,source:comparison,reason:'30% best closed day / total net closed P&L. Exceeding it delays reward eligibility; denominator resets after reward.'},
      payout:{points:0,source:rewards,reason:'Maximum loss floor does not reset at withdrawal. Official objectives warn that once balance exceeds 110% of initial capital, a withdrawal would breach the limit; material access restriction beyond ordinary timing.'},
      trading:{points:0.5,source:news,reason:'Selected news restrictions apply from the funded start; Swing is unavailable.'},
      funded:{points:1,source:objectives,reason:'No separate funded profit target; ordinary verification is not penalised. Non-reset payout effect is already counted under payout.'}
    },preset:{consistency:30,consistencyBasis:'net',drawdown:'intraday',lossPercent:10,profitSplit:90,source:objectives}}
  }
};
export const CRITERIA:Criterion[]=['drawdown','payout','consistency','trading','funded'];
export function getProgrammeEvidence(slug:string,id:string){return evidence[slug]?.[id]}
export function programmeFlexibility(item:ProgrammeEvidence|undefined){
  const valid=CRITERIA.flatMap(key=>{const a=item?.assessments[key];return a&&[0,.5,1].includes(a.points)&&a.reason.trim()&&a.source.startsWith('https://')?[a]:[]});
  return {verified:valid.length,stars:valid.length===5?valid.reduce((sum,a)=>sum+a.points,0):null};
}
