/** Product evidence is independent from Scale C. Exact product IDs only. */
export type Criterion = 'drawdown'|'payout'|'consistency'|'trading'|'funded';
export type Assessment = {points:0|0.5|1;source:string;reason:string};
export type ProgrammeEvidence = {
  checkedOn:string; scope:string; scopeFr?:string; assessments:Partial<Record<Criterion,Assessment>>;
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
    'ftmo-one-step-current':{checkedOn:'2026-11-27',scope:'CFD Standard, orders created on or after 2026-10-12; funded-stage rules',scopeFr:'CFD Standard, commandes à partir du 12 octobre 2026 ; phase financée.',assessments:{
      drawdown:{points:0.5,source:objectives,reason:'10% end-of-day trailing loss limit; reset on reward/new account.'},
      consistency:{points:0.5,source:objectives,reason:'50% best closed day divided by total closed net trading profit; post-12 October cohort. Exceeding it delays eligibility, not termination.'},
      payout:{points:1,source:rewards,reason:'Reward request from day 14; ordinary transaction minimums and 90% split.'},
      trading:{points:0.5,source:news,reason:'Funded Standard restricts order execution around selected news, including stop and target execution; Swing not offered.'},
      funded:{points:1,source:objectives,reason:'Funded-stage objectives, ordinary verification and no new profit target; drawdown and consistency already counted separately.'}
    },preset:{consistency:50,consistencyBasis:'net',drawdown:'eod',lossPercent:10,profitSplit:90,source:objectives}},
    'ftmo-two-step-current':{checkedOn:'2026-11-27',scope:'CFD 2-Step Standard baseline; Swing removes news and holding restrictions and merits +0.5 stars on the trading axis if chosen. Other axes unchanged.',scopeFr:'CFD 2-Step Standard. La variante Swing permet les annonces et les positions de nuit/week-end : +0,5 étoile sur la liberté de trading.',assessments:{
      drawdown:{points:1,source:comparison,reason:'Static maximum loss 10%.'},
      consistency:{points:1,source:comparison,reason:'No percentage consistency rule on the 2-Step comparison table.'},
      payout:{points:1,source:rewards,reason:'Reward request from day 14, ordinary minimums, 80% default split and optional rollover.'},
      trading:{points:0.5,source:swing,reason:'Standard funded accounts restrict selected news and longer market closures. Swing permits both; rating uses Standard as baseline.'},
      funded:{points:1,source:objectives,reason:'No funded profit target or minimum trading days. Ordinary drawdown and verification requirements are not counted twice.'}
    },preset:{drawdown:'static',lossPercent:10,profitSplit:80,source:comparison}},
    'ftmo-instant-current':{checkedOn:'2026-11-27',scope:'CFD Instant, Standard; current offer',scopeFr:'CFD Instant Standard, offre actuelle.',assessments:{
      drawdown:{points:0,source:objectives,reason:'10% intraday trailing on highest closed-position balance; equity enforced. Withdrawal effect is assessed separately under payout.'},
      consistency:{points:0.5,source:comparison,reason:'30% best closed day / total net closed P&L. Exceeding it delays reward eligibility; denominator resets after reward.'},
      payout:{points:0,source:rewards,reason:'Maximum loss floor does not reset at withdrawal. Official objectives warn that once balance exceeds 110% of initial capital, a withdrawal would breach the limit; material access restriction beyond ordinary timing.'},
      trading:{points:0.5,source:news,reason:'Selected news restrictions apply from the funded start; Swing is unavailable.'},
      funded:{points:1,source:objectives,reason:'No separate funded profit target; ordinary verification is not penalised. Non-reset payout effect is already counted under payout.'}
    },preset:{consistency:30,consistencyBasis:'net',drawdown:'intraday',lossPercent:10,profitSplit:90,source:objectives}}
  },
  the5ers:{
    'the5ers-high-stakes-current':{checkedOn:'2026-11-27',scope:'High Stakes, general FAQ updated 3 November and loss FAQ updated 16 November. Two current versions (New: 10%/5% targets; Classic: 8%/5%) and a 2-Step FAQ of 2 November listing a 50% Pro consistency rule and a $2,000 cap that the 24 November payout FAQ does not mention; unrated until reconciled.',scopeFr:'High Stakes : deux versions actuelles (New : objectifs 10 %/5 % ; Classic : 8 %/5 %). La FAQ 2-Step du 2 novembre mentionne une consistency de 50 % en Pro et un plafond de 2 000 $, absents de la FAQ retraits du 24 novembre ; non noté tant que ce n’est pas résolu.',assessments:{
      drawdown:{points:1,source:'https://the5ers.com/faqs/what-is-the-drawdown-rule-for-high-stakes/',reason:'Absolute maximum loss 8–10%; daily loss 3–5% depending on plan. Exact tier required.'},
      payout:{points:0.5,source:'https://the5ers.com/faqs/payout-policy-and-hub-credit-in-the-high-stakes-program/',reason:'14-day cycle; November 24 FAQ confirms caps of $3,000 on $50K and $4,000 on $100K, minimum P&L $300/$500. Other variants still to verify.'},
      trading:{points:0.5,source:'https://www.the5ers.com/faqs/is-news-trading-allowed-in-the-high-stakes-program2024/',reason:'Opening around high-impact releases is a soft breach; profits removed while losses retained.'}
    },preset:{drawdown:'static',source:'https://the5ers.com/faqs/what-is-the-drawdown-rule-for-high-stakes/'}},
    'the5ers-bootcamp-current':{checkedOn:'2026-11-27',scope:'Three-phase Bootcamp, Pro account. Official sources conflict about static vs trailing loss floor; no drawdown preset until resolved.',scopeFr:'Bootcamp trois phases, compte Pro. Sources officielles contradictoires sur le seuil de perte ; mécanisme à confirmer.',assessments:{
      consistency:{points:1,source:'https://www.the5ers.com/fixed-vs-dynamic-profit-targets/',reason:'Official educational guide explicitly says Bootcamp has no published percentage-based consistency rule; other risk rules remain.'},
      trading:{points:1,source:'https://the5ers.com/faqs/how-does-the-bootcamp-program-work/',reason:'News, overnight and weekend holding allowed except news bracketing; different strategies per active account.'},
      funded:{points:0.5,source:'https://the5ers.com/faqs/how-does-the-bootcamp-program-work/',reason:'3% daily pause on Pro only and account closure after 30 days inactivity; next day trading resumes after pause.'},
      payout:{points:0.5,source:'https://the5ers.com/faqs/how-does-the-bootcamp-program-work/',reason:'First reward after 14 days; cycle restarts each scaling event. Additional payout caps and exact contract version to confirm.'}
    },preset:{lossPercent:4,source:'https://www.the5ers.com/bootcamp/'}},
    'the5ers-hyper-growth-current':{checkedOn:'2026-11-27',scope:'Hyper Growth (1-Step), programme FAQ updated 2 November 2026. Consistency not assessed: the official specification list neither states nor excludes a rule, so no rating is published.',scopeFr:'Hyper Growth (1 étape), FAQ du programme mise à jour le 2 novembre 2026. Consistency non évaluée : la liste officielle ne mentionne ni n’exclut de règle ; aucune note publiée.',assessments:{
      drawdown:{points:1,source:'https://the5ers.com/faqs/how-does-the-hyper-growth-program-work/',reason:'Programme FAQ: accounts that hit the stop-out level are terminated; it is 6% below the initial account size. Some education articles call it trailing; the programme rules govern.'},
      payout:{points:0.5,source:'https://the5ers.com/faqs/how-does-the-hyper-growth-program-work/',reason:'First payout 14 days after receiving the Pro account, then every 2 weeks; the 14-day cycle restarts each time the account is scaled. Same treatment as Bootcamp.'},
      trading:{points:1,source:'https://the5ers.com/faqs/how-does-the-hyper-growth-program-work/',reason:'News trading allowed except bracketing strategies and practices listed in the T&C; weekend holding allowed (indices carry high swaps); leverage 1:30.'},
      funded:{points:0.5,source:'https://the5ers.com/faqs/how-does-the-hyper-growth-program-work/',reason:'3% daily pause disables the account for the rest of the day without termination; profit target and loss rules stay the same at each Pro stage; accounts inactive for more than 30 consecutive days expire.'}
    },preset:{drawdown:'static',lossPercent:6,source:'https://the5ers.com/faqs/how-does-the-hyper-growth-program-work/'}}
  },
  fundednext: {
  "fundednext-stellar-one-current": {
    "checkedOn": "2026-11-27",
    "scope": "Current CFD baseline, purchased/reset after 12 January 2026; no add-ons.","scopeFr": "CFD standard, achat ou reset à partir du 12 janvier 2026, sans option.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://fundednext.com/cfds/stellar-1-step",
        "reason": "Static 6% maximum loss from initial account balance."
      },
      "payout": {
        "points": 1,
        "source": "https://help.fundednext.com/en/articles/10701585-how-often-will-i-receive-my-performance-reward",
        "reason": "5 business days; fee refund at third reward."
      },
      "consistency": {
        "points": 1,
        "source": "https://fundednext.com/cfds/stellar-1-step",
        "reason": "Standard funded reward conditions and consistency explicitly listed as N/A. Not applicable to optional on-demand payout."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.fundednext.com/en/articles/10701447-is-news-trading-allowed-at-fundednext",
        "reason": "Funded high-impact news execution counts only 40% of winning profit in the affected window; losses remain in full. Other restrictions and add-ons apply."
      },
      "funded": {
        "points": 0.5,
        "source": "https://help.fundednext.com/en/articles/17252927-stellar-1-step-account",
        "reason": "3% maximum aggregate risk at any time on funded account; no funded profit target or minimum days."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 6,
      "profitSplit": 80,
      "source": "https://fundednext.com/cfds/stellar-1-step"
    }
  },
  "fundednext-stellar-two-current": {
    "checkedOn": "2026-11-27",
    "scope": "Current CFD Standard payout option only; 3-day and on-demand options differ.","scopeFr": "CFD, retrait Standard uniquement ; les options 3 jours et à la demande diffèrent.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://fundednext.com/cfds/stellar-2-step",
        "reason": "Static 10% maximum loss from initial account balance."
      },
      "payout": {
        "points": 0.5,
        "source": "https://help.fundednext.com/en/articles/10701585-how-often-will-i-receive-my-performance-reward",
        "reason": "First reward after 21 days, then every 14 days; standard option. Optional faster plans have extra conditions."
      },
      "consistency": {
        "points": 1,
        "source": "https://fundednext.com/cfds/stellar-2-step",
        "reason": "Standard funded reward conditions and consistency explicitly listed as N/A. Not applicable to optional on-demand payout."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.fundednext.com/en/articles/10701447-is-news-trading-allowed-at-fundednext",
        "reason": "Funded high-impact news execution counts only 40% of winning profit in the affected window; losses remain in full. Other restrictions and add-ons apply."
      },
      "funded": {
        "points": 0.5,
        "source": "https://help.fundednext.com/en/articles/17255124-stellar-2-step-challenge",
        "reason": "3% maximum aggregate risk at any time on funded account; no funded profit target or minimum days."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 10,
      "profitSplit": 80,
      "source": "https://fundednext.com/cfds/stellar-2-step"
    }
  },
  "fundednext-stellar-lite-current": {
    "checkedOn": "2026-11-27",
    "scope": "Current CFD Standard payout option, purchased/reset on or after 12 October 2026; no add-ons.","scopeFr": "CFD, retrait Standard, achat ou reset à partir du 12 octobre 2026, sans option.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://fundednext.com/cfds/stellar-lite",
        "reason": "Static 8% maximum loss from initial account balance."
      },
      "payout": {
        "points": 1,
        "source": "https://help.fundednext.com/en/articles/10701585-how-often-will-i-receive-my-performance-reward",
        "reason": "First and subsequent rewards every 10 business days; standard option, fee refund at third reward."
      },
      "consistency": {
        "points": 1,
        "source": "https://fundednext.com/cfds/stellar-lite",
        "reason": "Standard funded reward conditions and consistency explicitly listed as N/A. Not applicable to optional on-demand payout."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.fundednext.com/en/articles/10701447-is-news-trading-allowed-at-fundednext",
        "reason": "Funded high-impact news execution counts only 40% of winning profit in the affected window; losses remain in full. Other restrictions and add-ons apply."
      },
      "funded": {
        "points": 0.5,
        "source": "https://help.fundednext.com/en/articles/17253939-stellar-lite-account",
        "reason": "3% maximum aggregate risk at any time on funded account; no funded profit target or minimum days."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 8,
      "profitSplit": 80,
      "source": "https://fundednext.com/cfds/stellar-lite"
    }
  },
  "fundednext-stellar-instant-current": {
    "checkedOn": "2026-11-27",
    "scope": "Stellar Instant, help-center version dated 2 October 2026 (archived 25 November 2026); no add-ons. Tier 1–2 split.",
    "scopeFr": "Stellar Instant, article du centre d'aide daté du 2 octobre 2026 (archivé le 25 novembre 2026), sans option ; partage des paliers 1 et 2.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://help.fundednext.com/en/articles/17253243-stellar-instant-account",
        "reason": "6% trailing maximum loss on the highest recorded balance, breached when equity falls below it at any time; it stops rising once it reaches the initial balance."
      },
      "payout": {
        "points": 0.5,
        "source": "https://help.fundednext.com/en/articles/17253243-stellar-instant-account",
        "reason": "On demand at 5% growth (checked at end of day, disabled once a new trade is placed that day) or every 14 days with at least 1% growth. The loss limit is never reset after a withdrawal, so each reward reduces the remaining buffer; unlike an uncapped trailing floor, profit above the initial balance stays withdrawable."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.fundednext.com/en/articles/17253243-stellar-instant-account",
        "reason": "Account rules table: 'None. No consistency rules apply.' Quick Strike is assessed under trading, not here."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.fundednext.com/en/articles/17253243-stellar-instant-account",
        "reason": "Overnight and weekend allowed; only 40% of profits from trades within 5 minutes of high-impact news count, losses count in full; Quick Strike rule on trades closed within 30 seconds; copy trading only between the trader's own accounts."
      },
      "funded": {
        "points": 0.5,
        "source": "https://help.fundednext.com/en/articles/17253243-stellar-instant-account",
        "reason": "3% maximum risk at any time (stop-loss exposure and floating losses against the initial balance), as on the other Stellar accounts; no daily loss limit, target or minimum days."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 6,
      "profitSplit": 70,
      "source": "https://help.fundednext.com/en/articles/17253243-stellar-instant-account"
    }
  }
},

  "take-profit-trader": {
    "tpt-intraday-2026": {
      "checkedOn": "2026-11-27",
      "scope": "New purchases since 23 November 2026; PRO phase (legacy accounts excluded).",
      "scopeFr": "Achats depuis le 23 novembre 2026 ; phase PRO, anciens comptes exclus.",
      "assessments": {
        "drawdown": {
          "points": 0,
          "source": "https://takeprofittraderhelp.zendesk.com/hc/en-us/articles/15171769361053-PRO-Account-Rules",
          "reason": "Intraday equity including unrealized gains; locks at initial balance."
        },
        "payout": {
          "points": 0.5,
          "source": "https://takeprofittraderhelp.zendesk.com/hc/en-us/articles/15172219527581-PRO-Account-Profit-Split-Withdrawal-Rules",
          "reason": "Daily withdrawals above a mandatory buffer equal to maximum drawdown. No per-request cap; withdrawing half of buffer requires account closure."
        },
        "consistency": {
          "points": 1,
          "source": "https://takeprofittraderhelp.zendesk.com/hc/en-us/articles/40739474201501-Classic-vs-EOD-vs-Intraday-Which-Plan-Is-Right-for-You",
          "reason": "50% best-day rule in Test only, no funded consistency."
        },
        "trading": {
          "points": 0.5,
          "source": "https://takeprofittraderhelp.zendesk.com/hc/en-us/articles/15171769361053-PRO-Account-Rules",
          "reason": "Flat positions and orders around specified releases; intraday-only futures, no opposing positions."
        },
        "funded": {
          "points": 0.5,
          "source": "https://takeprofittraderhelp.zendesk.com/hc/en-us/articles/15171978600349-PRO-Account-Upgrade-Process-Overview-and-Guidelines",
          "reason": "Selected PRO+ transition freezes $5,000 of PRO profits; separate live balance. PRO daily profit stop $10,000."
        }
      },
      "preset": {
        "drawdown": "intraday",
        "profitSplit": 80,
        "source": "https://takeprofittraderhelp.zendesk.com/hc/en-us/articles/15171769361053-PRO-Account-Rules"
      }
    },
    "tpt-classic-2026": {
      "checkedOn": "2026-11-27",
      "scope": "New purchases since 23 November 2026; PRO phase (legacy accounts excluded).",
      "scopeFr": "Achats depuis le 23 novembre 2026 ; phase PRO, anciens comptes exclus.",
      "assessments": {
        "drawdown": {
          "points": 0,
          "source": "https://takeprofittraderhelp.zendesk.com/hc/en-us/articles/15171769361053-PRO-Account-Rules",
          "reason": "Intraday equity including unrealized gains; locks at initial balance."
        },
        "payout": {
          "points": 0.5,
          "source": "https://takeprofittraderhelp.zendesk.com/hc/en-us/articles/15172219527581-PRO-Account-Profit-Split-Withdrawal-Rules",
          "reason": "Daily withdrawals above a mandatory buffer equal to maximum drawdown. No per-request cap; withdrawing half of buffer requires account closure."
        },
        "consistency": {
          "points": 1,
          "source": "https://takeprofittraderhelp.zendesk.com/hc/en-us/articles/40739474201501-Classic-vs-EOD-vs-Intraday-Which-Plan-Is-Right-for-You",
          "reason": "50% best-day rule in Test only, no funded consistency."
        },
        "trading": {
          "points": 0.5,
          "source": "https://takeprofittraderhelp.zendesk.com/hc/en-us/articles/15171769361053-PRO-Account-Rules",
          "reason": "Flat positions and orders around specified releases; intraday-only futures, no opposing positions."
        },
        "funded": {
          "points": 0.5,
          "source": "https://takeprofittraderhelp.zendesk.com/hc/en-us/articles/15171978600349-PRO-Account-Upgrade-Process-Overview-and-Guidelines",
          "reason": "Selected PRO+ transition freezes $5,000 of PRO profits; separate live balance. PRO daily profit stop $10,000."
        }
      },
      "preset": {
        "drawdown": "intraday",
        "profitSplit": 80,
        "source": "https://takeprofittraderhelp.zendesk.com/hc/en-us/articles/15171769361053-PRO-Account-Rules"
      }
    },
    "tpt-eod-2026": {
      "checkedOn": "2026-11-27",
      "scope": "New purchases since 23 November 2026; PRO phase (legacy accounts excluded).",
      "scopeFr": "Achats depuis le 23 novembre 2026 ; phase PRO, anciens comptes exclus.",
      "assessments": {
        "drawdown": {
          "points": 0.5,
          "source": "https://takeprofittraderhelp.zendesk.com/hc/en-us/articles/15171769361053-PRO-Account-Rules",
          "reason": "EOD balance high, locked at initial balance."
        },
        "payout": {
          "points": 0.5,
          "source": "https://takeprofittraderhelp.zendesk.com/hc/en-us/articles/15172219527581-PRO-Account-Profit-Split-Withdrawal-Rules",
          "reason": "Daily withdrawals above a mandatory buffer equal to maximum drawdown. No per-request cap; withdrawing half of buffer requires account closure."
        },
        "consistency": {
          "points": 1,
          "source": "https://takeprofittraderhelp.zendesk.com/hc/en-us/articles/40739474201501-Classic-vs-EOD-vs-Intraday-Which-Plan-Is-Right-for-You",
          "reason": "50% best-day rule in Test only, no funded consistency."
        },
        "trading": {
          "points": 0.5,
          "source": "https://takeprofittraderhelp.zendesk.com/hc/en-us/articles/15171769361053-PRO-Account-Rules",
          "reason": "Flat positions and orders around specified releases; intraday-only futures, no opposing positions."
        },
        "funded": {
          "points": 0.5,
          "source": "https://takeprofittraderhelp.zendesk.com/hc/en-us/articles/15171978600349-PRO-Account-Upgrade-Process-Overview-and-Guidelines",
          "reason": "Selected PRO+ transition freezes $5,000 of PRO profits; separate live balance. PRO daily profit stop $5,000; daily loss can hard-breach below initial balance."
        }
      },
      "preset": {
        "drawdown": "eod",
        "profitSplit": 80,
        "source": "https://takeprofittraderhelp.zendesk.com/hc/en-us/articles/15171769361053-PRO-Account-Rules"
      }
    }
  },
  "alpha-futures": {
    "alpha-futures-zero": {
      "checkedOn": "2026-11-27",
      "scope": "Current Qualified account; not the historical Premium programme. Live transition treatment is included.",
      "scopeFr": "Compte Qualified actuel ; hors ancien Premium. Transition live prise en compte.",
      "assessments": {
        "drawdown": {
          "points": 0.5,
          "source": "https://help.alpha-futures.com/en/articles/9491999-maximum-loss-limit-mll",
          "reason": "EOD trailing, locks at initial balance; equity monitored continuously."
        },
        "payout": {
          "points": 0.5,
          "source": "https://help.alpha-futures.com/en/articles/9492051-payout-policy",
          "reason": "5 days with at least $200 net profit; max 50% of profit and cap $1,000–$2,500."
        },
        "consistency": {
          "points": 0.5,
          "source": "https://help.alpha-futures.com/en/articles/9492048-consistency-rule",
          "reason": "40% funded best day; eligibility delayed until compliant."
        },
        "trading": {
          "points": 0.5,
          "source": "https://help.alpha-futures.com/en/articles/9492063-news-trading-policy",
          "reason": "Qualified major-news restriction; profit voided, payout denied and repeated breach can close account."
        },
        "funded": {
          "points": 0,
          "source": "https://help.alpha-futures.com/en/articles/10743344-path-to-live-structure",
          "reason": "At selected live transition all Qualified accounts close; standard live route sacrifices remaining simulated profit; Prime alternative pays conditional deferred bonus rather than preserving all profit."
        }
      },
      "preset": {
        "drawdown": "eod",
        "consistency": 40,
        "consistencyBasis": "net",
        "profitSplit": 90,
        "source": "https://help.alpha-futures.com/en/articles/9491999-maximum-loss-limit-mll"
      }
    },
    "alpha-futures-standard": {
      "checkedOn": "2026-11-27",
      "scope": "Current Qualified account; not the historical Premium programme. Live transition treatment is included.",
      "scopeFr": "Compte Qualified actuel ; hors ancien Premium. Transition live prise en compte.",
      "assessments": {
        "drawdown": {
          "points": 0.5,
          "source": "https://help.alpha-futures.com/en/articles/9491999-maximum-loss-limit-mll",
          "reason": "EOD trailing, locks at initial balance; equity monitored continuously."
        },
        "payout": {
          "points": 0.5,
          "source": "https://help.alpha-futures.com/en/articles/9492051-payout-policy",
          "reason": "5 days with at least $200 net profit; max 50% of profit and cap $3,000–$5,000."
        },
        "consistency": {
          "points": 0.5,
          "source": "https://help.alpha-futures.com/en/articles/9492048-consistency-rule",
          "reason": "40% funded best day; eligibility delayed until compliant."
        },
        "trading": {
          "points": 0.5,
          "source": "https://help.alpha-futures.com/en/articles/9492063-news-trading-policy",
          "reason": "Qualified major-news restriction; profit voided, payout denied and repeated breach can close account."
        },
        "funded": {
          "points": 0,
          "source": "https://help.alpha-futures.com/en/articles/10743344-path-to-live-structure",
          "reason": "At selected live transition all Qualified accounts close; standard live route sacrifices remaining simulated profit; Prime alternative pays conditional deferred bonus rather than preserving all profit."
        }
      },
      "preset": {
        "drawdown": "eod",
        "consistency": 40,
        "consistencyBasis": "net",
        "profitSplit": 90,
        "source": "https://help.alpha-futures.com/en/articles/9491999-maximum-loss-limit-mll"
      }
    },
    "alpha-futures-advanced": {
      "checkedOn": "2026-11-27",
      "scope": "Current Qualified account; not the historical Premium programme. Live transition treatment is included.",
      "scopeFr": "Compte Qualified actuel ; hors ancien Premium. Transition live prise en compte.",
      "assessments": {
        "drawdown": {
          "points": 0.5,
          "source": "https://help.alpha-futures.com/en/articles/9491999-maximum-loss-limit-mll",
          "reason": "EOD trailing, locks at initial balance; equity monitored continuously."
        },
        "payout": {
          "points": 0.5,
          "source": "https://help.alpha-futures.com/en/articles/9492051-payout-policy",
          "reason": "5 days with at least $200 net profit; max 50% of profit and cap $15,000."
        },
        "consistency": {
          "points": 1,
          "source": "https://help.alpha-futures.com/en/articles/9492048-consistency-rule",
          "reason": "40% evaluation only; no Qualified consistency."
        },
        "trading": {
          "points": 1,
          "source": "https://help.alpha-futures.com/en/articles/9492063-news-trading-policy",
          "reason": "No special Qualified news window; standard prohibited practices still apply."
        },
        "funded": {
          "points": 0,
          "source": "https://help.alpha-futures.com/en/articles/10743344-path-to-live-structure",
          "reason": "At selected live transition all Qualified accounts close; standard live route sacrifices remaining simulated profit; Prime alternative pays conditional deferred bonus rather than preserving all profit."
        }
      },
      "preset": {
        "drawdown": "eod",
        "profitSplit": 90,
        "source": "https://help.alpha-futures.com/en/articles/9491999-maximum-loss-limit-mll"
      }
    },
    "alpha-futures-direct": {
      "checkedOn": "2026-11-27",
      "scope": "Current Qualified account; not the historical Premium programme. Live transition treatment is included.",
      "scopeFr": "Compte Qualified actuel ; hors ancien Premium. Transition live prise en compte.",
      "assessments": {
        "drawdown": {
          "points": 0.5,
          "source": "https://help.alpha-futures.com/en/articles/9491999-maximum-loss-limit-mll",
          "reason": "EOD trailing, locks at initial balance; equity monitored continuously."
        },
        "payout": {
          "points": 0,
          "source": "https://help.alpha-futures.com/en/articles/9492051-payout-policy",
          "reason": "Fresh withdrawal profit target every cycle; unused prior-cycle gains do not count toward next target; caps $1,000–$3,000."
        },
        "consistency": {
          "points": 0,
          "source": "https://help.alpha-futures.com/en/articles/9492048-consistency-rule",
          "reason": "20% funded best day; eligibility delayed until compliant."
        },
        "trading": {
          "points": 0.5,
          "source": "https://help.alpha-futures.com/en/articles/9492063-news-trading-policy",
          "reason": "Qualified major-news restriction; profit voided, payout denied and repeated breach can close account."
        },
        "funded": {
          "points": 0,
          "source": "https://help.alpha-futures.com/en/articles/10743344-path-to-live-structure",
          "reason": "At selected live transition all Qualified accounts close; standard live route sacrifices remaining simulated profit; Prime alternative pays conditional deferred bonus rather than preserving all profit."
        }
      },
      "preset": {
        "drawdown": "eod",
        "consistency": 20,
        "consistencyBasis": "net",
        "profitSplit": 90,
        "source": "https://help.alpha-futures.com/en/articles/9491999-maximum-loss-limit-mll"
      }
    }
  },
  "topstep": {
    "topstep-trading-combine-current": {
      "checkedOn": "2026-11-27",
      "scope": "Original trailing Trading Combine → XFA Standard, without optional DLL; XFA Consistency and static/limited products are separate.",
      "scopeFr": "Trading Combine trailing classique → XFA Standard, sans DLL optionnelle ; autres variantes exclues.",
      "assessments": {
        "drawdown": {
          "points": 0.5,
          "source": "https://help.topstep.com/en/articles/8284204-what-is-the-maximum-loss-limit",
          "reason": "EOD trail; XFA starts at $0, loss floor locks at $0 after first withdrawal."
        },
        "payout": {
          "points": 0.5,
          "source": "https://help.topstep.com/en/articles/8284233-topstep-payout-policy",
          "reason": "Five winning $150+ days; withdraw max 50% of XFA balance, capped $2,000/$3,000/$5,000. Optional DLL changes caps."
        },
        "consistency": {
          "points": 1,
          "source": "https://help.topstep.com/en/articles/8284215-express-funded-account-parameters",
          "reason": "XFA Standard has no best-day ratio; evaluation has consistency objective; optional XFA Consistency has 40%."
        },
        "trading": {
          "points": 0.5,
          "source": "https://help.topstep.com/en/articles/8284206-when-and-what-products-can-i-trade",
          "reason": "Intraday-only CME futures; prescribed daily closing times and conduct restrictions."
        },
        "funded": {
          "points": 0.5,
          "source": "https://help.topstep.com/en/articles/8284215-express-funded-account-parameters",
          "reason": "Position scaling in XFA; no funded profit target. Other live-stage conditions separate."
        }
      },
      "preset": {
        "drawdown": "eod",
        "profitSplit": 90,
        "source": "https://help.topstep.com/en/articles/8284204-what-is-the-maximum-loss-limit"
      }
    }
  },
  "tradeify": {
    "tradeify-growth-eval": {
      "checkedOn": "2026-11-27",
      "scope": "Current Growth Sim Funded; purchases after 12 September 2025.",
      "scopeFr": "Growth Sim Funded actuel ; achat après le 12 septembre 2025.",
      "assessments": {
        "drawdown": {
          "points": 0.5,
          "source": "https://help.tradeify.co/en/articles/10495897-rules-trailing-max-drawdowns",
          "reason": "EOD trail, lock at starting balance + $100 or at first payout request; monitored in real time."
        },
        "payout": {
          "points": 0.5,
          "source": "https://help.tradeify.co/en/articles/11083796-growth-funded-account-payout-policy",
          "reason": "5 winning days, funded balance requirement, per-request caps $1,000–$5,000 depending on size/cycle."
        },
        "consistency": {
          "points": 0.5,
          "source": "https://help.tradeify.co/en/articles/11083796-growth-funded-account-payout-policy",
          "reason": "35% funded best-day ratio; none on Growth evaluation."
        },
        "trading": {
          "points": 0.5,
          "source": "https://help.tradeify.co/en/articles/10468318-guidelines-for-traders",
          "reason": "Microscalping rule: majority of trades and profit must be held over 10 seconds; intraday closure. News trading allowed."
        },
        "funded": {
          "points": 0,
          "source": "https://help.tradeify.co/en/articles/12969284-tradeify-elite-program",
          "reason": "Selected Elite Live transition closes all simulated and evaluation accounts; only accounts with an approved payout qualify, and post-last-payout progress is not carried forward."
        }
      },
      "preset": {
        "drawdown": "eod",
        "consistency": 35,
        "consistencyBasis": "net",
        "profitSplit": 90,
        "source": "https://help.tradeify.co/en/articles/10495897-rules-trailing-max-drawdowns"
      }
    },
    "tradeify-lightning": {
      "checkedOn": "2026-11-27",
      "scope": "Current Lightning Sim Funded; purchases after 12 September 2025.",
      "scopeFr": "Lightning Sim Funded actuel ; achat après le 12 septembre 2025.",
      "assessments": {
        "drawdown": {
          "points": 0.5,
          "source": "https://help.tradeify.co/en/articles/10495897-rules-trailing-max-drawdowns",
          "reason": "EOD trail, lock at starting balance + $100 or at first payout request; monitored in real time."
        },
        "payout": {
          "points": 0,
          "source": "https://help.tradeify.co/en/articles/10495932-lightning-funded-account-payout-policy",
          "reason": "Fresh profit targets each cycle and hard per-request caps $1,000–$3,500; unused previous-cycle profit does not count."
        },
        "consistency": {
          "points": 0,
          "source": "https://help.tradeify.co/en/articles/10495932-lightning-funded-account-payout-policy",
          "reason": "20% first payout, 25% second, 30% subsequent."
        },
        "trading": {
          "points": 0.5,
          "source": "https://help.tradeify.co/en/articles/10468318-guidelines-for-traders",
          "reason": "Microscalping rule: majority of trades and profit must be held over 10 seconds; intraday closure. News trading allowed."
        },
        "funded": {
          "points": 0,
          "source": "https://help.tradeify.co/en/articles/12969284-tradeify-elite-program",
          "reason": "Selected Elite Live transition closes all simulated and evaluation accounts; only accounts with an approved payout qualify, and post-last-payout progress is not carried forward."
        }
      },
      "preset": {
        "drawdown": "eod",
        "profitSplit": 90,
        "source": "https://help.tradeify.co/en/articles/10495897-rules-trailing-max-drawdowns"
      }
    },
    "tradeify-select-eval": {
      "checkedOn": "2026-11-27",
      "scope": "Select Flex standard, bought after 1 September 2026; 25–150K only, no add-on. Daily option differs.",
      "scopeFr": "Select Flex standard, achat après le 1er septembre 2026 ; 25–150K, sans option. Daily distinct.",
      "assessments": {
        "drawdown": {
          "points": 0.5,
          "source": "https://help.tradeify.co/en/articles/10495897-rules-trailing-max-drawdowns",
          "reason": "EOD trail, lock at starting balance + $100 or at first payout request; monitored in real time."
        },
        "payout": {
          "points": 0.5,
          "source": "https://help.tradeify.co/en/articles/12853966-select-flex-and-select-daily-payout-policies",
          "reason": "5 winning days, up to 50% of total profit with caps $1,250/$2,500/$3,500/$4,500; no separate minimum balance."
        },
        "consistency": {
          "points": 1,
          "source": "https://help.tradeify.co/en/articles/12853966-select-flex-and-select-daily-payout-policies",
          "reason": "No funded consistency in Select Flex; evaluation consistency remains."
        },
        "trading": {
          "points": 0.5,
          "source": "https://help.tradeify.co/en/articles/10468318-guidelines-for-traders",
          "reason": "Microscalping rule: majority of trades and profit must be held over 10 seconds; intraday closure. News trading allowed."
        },
        "funded": {
          "points": 0,
          "source": "https://help.tradeify.co/en/articles/12969284-tradeify-elite-program",
          "reason": "Selected Elite Live transition closes all simulated and evaluation accounts; only accounts with an approved payout qualify, and post-last-payout progress is not carried forward."
        }
      },
      "preset": {
        "drawdown": "eod",
        "profitSplit": 90,
        "source": "https://help.tradeify.co/en/articles/10495897-rules-trailing-max-drawdowns"
      }
    }
  }
};
// New catalogue entries, verified against current official plan documentation.
evidence.topstep['topstep-static-combine-current'] = {
  "checkedOn": "2026-11-27",
  "scope": "Permanent Static Combine, 25K–150K; XFA Standard route.",
  "scopeFr": "Static Combine permanent, 25K–150K ; retrait XFA Standard.",
  "assessments": {
    "drawdown": {
      "points": 1,
      "source": "https://help.topstep.com/en/articles/15520357-topstep-labs",
      "reason": "Fixed floor throughout evaluation and XFA until first withdrawal; then sets to zero. No trailing."
    },
    "payout": {
      "points": 0.5,
      "source": "https://help.topstep.com/en/articles/15520357-topstep-labs",
      "reason": "Standard requires five winning days; caps by tier $4K/$8K/$10K/$12K. Loss floor changes after first withdrawal."
    },
    "consistency": {
      "points": 1,
      "source": "https://help.topstep.com/en/articles/8284215-express-funded-account-parameters",
      "reason": "No funded best-day objective on Standard; 55% evaluation objective is separate."
    },
    "trading": {
      "points": 0.5,
      "source": "https://help.topstep.com/en/articles/15520357-topstep-labs",
      "reason": "Product-specific contract limits and high-volatility risk restrictions."
    },
    "funded": {
      "points": 0.5,
      "source": "https://help.topstep.com/en/articles/15520357-topstep-labs",
      "reason": "Mandatory daily loss limit and tier-specific scaling; no Back2Funded."
    }
  },
  "preset": {
    "drawdown": "static",
    "profitSplit": 90,
    "source": "https://help.topstep.com/en/articles/15520357-topstep-labs"
  }
};
evidence.topstep['topstep-freedom-250k-current'] = {
  "checkedOn": "2026-11-27",
  "scope": "Permanent 250K Freedom Combine; XFA Standard only.",
  "scopeFr": "Freedom Combine 250K permanent ; XFA Standard uniquement.",
  "assessments": {
    "drawdown": {
      "points": 0.5,
      "source": "https://help.topstep.com/en/articles/15520357-topstep-labs",
      "reason": "Structured like the standard EOD Combine; $10K MLL, sets to zero after first withdrawal."
    },
    "payout": {
      "points": 0.5,
      "source": "https://help.topstep.com/en/articles/15520357-topstep-labs",
      "reason": "Standard route, $25K cap and standard winning-day conditions."
    },
    "consistency": {
      "points": 1,
      "source": "https://help.topstep.com/en/articles/8284215-express-funded-account-parameters",
      "reason": "No funded best-day objective; 55% evaluation target remains."
    },
    "trading": {
      "points": 0.5,
      "source": "https://help.topstep.com/en/articles/15520357-topstep-labs",
      "reason": "Product-specific contract limits and daily session restrictions."
    },
    "funded": {
      "points": 0.5,
      "source": "https://help.topstep.com/en/articles/15520357-topstep-labs",
      "reason": "Funded contract scaling, mandatory DLL in evaluation/live and no Back2Funded."
    }
  },
  "preset": {
    "drawdown": "eod",
    "profitSplit": 90,
    "source": "https://help.topstep.com/en/articles/15520357-topstep-labs"
  }
};
evidence.tradeify['tradeify-select-300k-current'] = {
  "checkedOn": "2026-11-27",
  "scope": "Permanent Select 300K, V2, Flex payout route.",
  "scopeFr": "Select 300K permanent, V2, retrait Flex.",
  "assessments": {
    "drawdown": {
      "points": 0.5,
      "source": "https://help.tradeify.co/en/articles/17845238-300k-select-account-permanent-plan",
      "reason": "EOD trailing, $8K maximum drawdown, locks at $300,100."
    },
    "payout": {
      "points": 0.5,
      "source": "https://help.tradeify.co/en/articles/17845238-300k-select-account-permanent-plan",
      "reason": "5 winning days of $750+, up to 50% of profit capped at $10K."
    },
    "consistency": {
      "points": 1,
      "source": "https://help.tradeify.co/en/articles/17845238-300k-select-account-permanent-plan",
      "reason": "No funded percentage consistency; evaluation 40%."
    },
    "trading": {
      "points": 0.5,
      "source": "https://help.tradeify.co/en/articles/10468318-guidelines-for-traders",
      "reason": "Microscalping restrictions and intraday closure; major news allowed."
    },
    "funded": {
      "points": 0,
      "source": "https://help.tradeify.co/en/articles/12969284-tradeify-elite-program",
      "reason": "Live transition may discard progress since last approved payout; $4K daily loss limit and scaling in Flex 300K."
    }
  },
  "preset": {
    "drawdown": "eod",
    "profitSplit": 90,
    "source": "https://help.tradeify.co/en/articles/17845238-300k-select-account-permanent-plan"
  }
};

// Funded route variants are not separate purchases. Preserve the parent product ID for pricing.
export type ProgrammeVariant = { id:string; label:string; labelFr:string; evidence:ProgrammeEvidence };
const variants:Record<string,Record<string,ProgrammeVariant[]>> = {};
function addVariant(slug:string,productId:string,id:string,label:string,labelFr:string,scope:string,scopeFr:string,overrides:Partial<Record<Criterion,Assessment>>,preset?:ProgrammeEvidence['preset']){
  const parent=evidence[slug]?.[productId];
  if(!parent) throw new Error('Unknown parent programme '+productId);
  const items=(variants[slug]??={})[productId]??=[];
  items.push({id,label,labelFr,evidence:{...parent,scope,scopeFr,assessments:{...parent.assessments,...overrides},preset:preset??parent.preset}});
}
addVariant('topstep','topstep-trading-combine-current','xfa-consistency','XFA Consistency','XFA Consistency','Original trailing Combine, XFA Consistency, without optional DLL.','Combine trailing classique, XFA Consistency, sans DLL optionnelle.',{
  payout:{points:.5,source:"https://help.topstep.com/en/articles/8284233-topstep-payout-policy",reason:'Three traded days and 40% consistency; up to 50% of balance, tier caps $3K/$4K/$6K without DLL.'},
  consistency:{points:.5,source:"https://help.topstep.com/en/articles/8284215-express-funded-account-parameters",reason:'40% of net profit per cycle; reset after payout.'}
},{drawdown:'eod',consistency:40,consistencyBasis:'net',profitSplit:90,source:"https://help.topstep.com/en/articles/8284215-express-funded-account-parameters"});
addVariant('topstep','topstep-static-combine-current','xfa-consistency','XFA Consistency','XFA Consistency','Permanent Static Combine, XFA Consistency.','Static Combine permanent, XFA Consistency.',{
  payout:{points:.5,source:"https://help.topstep.com/en/articles/15520357-topstep-labs",reason:'Three traded days and 40% consistency; tier caps $4K/$8K/$10K/$12K.'},
  consistency:{points:.5,source:"https://help.topstep.com/en/articles/8284215-express-funded-account-parameters",reason:'40% of net profit per cycle; reset after payout.'}
},{drawdown:'static',consistency:40,consistencyBasis:'net',profitSplit:90,source:"https://help.topstep.com/en/articles/8284215-express-funded-account-parameters"});
addVariant('tradeify','tradeify-select-eval','daily','Select Daily','Select Daily','25K–150K, purchased on or after 1 September 2026; Daily funded route.','25K–150K, achat à partir du 1er septembre 2026 ; retrait Daily.',{
  drawdown:{points:.5,source:"https://help.tradeify.co/en/articles/12853966-select-flex-and-select-daily-payout-policies",reason:'EOD trailing, $1K/$2K/$2.5K/$3.5K maximum loss; narrower than Flex.'},
  payout:{points:.5,source:"https://help.tradeify.co/en/articles/12853966-select-flex-and-select-daily-payout-policies",reason:'Daily withdrawals above $1.1K/$2.1K/$2.6K/$3.6K buffer, max twice cycle profit and $600/$1,250/$1,750/$2,500 cap.'},
  funded:{points:0,source:"https://help.tradeify.co/en/articles/12969284-tradeify-elite-program",reason:'Same live-transition restrictions as Flex; mandatory funded daily loss limit $500/$1K/$1.25K/$1.75K.'}
},{drawdown:'eod',profitSplit:90,source:"https://help.tradeify.co/en/articles/12853966-select-flex-and-select-daily-payout-policies"});
addVariant('tradeify','tradeify-select-300k-current','daily','Select 300K Daily','Select 300K Daily','Permanent 300K V2, Daily funded route.','300K permanent V2, retrait Daily.',{
  drawdown:{points:.5,source:"https://help.tradeify.co/en/articles/17845238-300k-select-account-permanent-plan",reason:'EOD trailing, $6K maximum loss; lock at $300,100.'},
  payout:{points:.5,source:"https://help.tradeify.co/en/articles/17845238-300k-select-account-permanent-plan",reason:'Daily above $6,100 buffer, cap $4,000, at least half the withdrawal from new profit.'},
  funded:{points:0,source:"https://help.tradeify.co/en/articles/12969284-tradeify-elite-program",reason:'Same live-transition restrictions; mandatory $3K daily loss limit and funded scaling.'}
},{drawdown:'eod',profitSplit:90,source:"https://help.tradeify.co/en/articles/17845238-300k-select-account-permanent-plan"});
export function getProgrammeVariants(slug:string,id:string):ProgrammeVariant[]{return variants[slug]?.[id]??[]}

export const CRITERIA
:Criterion[]=['drawdown','payout','consistency','trading','funded'];
export function getProgrammeEvidence(slug:string,id:string,variant?:string){return variant?getProgrammeVariants(slug,id).find(x=>x.id===variant)?.evidence:evidence[slug]?.[id]}
export function programmeFlexibility(item:ProgrammeEvidence|undefined){
  const valid=CRITERIA.flatMap(key=>{const a=item?.assessments[key];return a&&[0,.5,1].includes(a.points)&&a.reason.trim()&&a.source.startsWith('https://')?[a]:[]});
  return {verified:valid.length,stars:valid.length===5?valid.reduce((sum,a)=>sum+a.points,0):null};
}
