/** Product evidence is independent from Scale C. Exact product IDs only. */
export type Criterion = 'drawdown'|'payout'|'consistency'|'trading'|'funded';
export type Assessment = {points:0|0.5|1;source:string;reason:string};
export type ProgrammeEvidence = {
  checkedOn:string; scope:string; scopeFr?:string; assessments:Partial<Record<Criterion,Assessment>>;
  /** Editorial disposition, never a verified criterion or a simulator input. */
  reviewOutcome?:{kind:'estimated'|'legacy'; reason:string; reasonFr:string; source:string; estimate?:number};
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
    'the5ers-high-stakes-current':{checkedOn:'2026-11-27',scope:'High Stakes, general FAQ updated 3 November and loss FAQ updated 16 November; precise tier/cohort mapping still required.',assessments:{
      drawdown:{points:1,source:'https://the5ers.com/faqs/what-is-the-drawdown-rule-for-high-stakes/',reason:'Absolute maximum loss 8–10%; daily loss 3–5% depending on plan. Exact tier required.'},
      payout:{points:0.5,source:'https://the5ers.com/faqs/payout-policy-and-hub-credit-in-the-high-stakes-program/',reason:'14-day cycle; November 24 FAQ confirms caps of $3,000 on $50K and $4,000 on $100K, minimum P&L $300/$500. Other variants still to verify.'},
      trading:{points:0.5,source:'https://www.the5ers.com/faqs/is-news-trading-allowed-in-the-high-stakes-program2024/',reason:'Opening around high-impact releases is a soft breach; profits removed while losses retained.'}
    },preset:{drawdown:'static',source:'https://the5ers.com/faqs/what-is-the-drawdown-rule-for-high-stakes/'}},
    'the5ers-bootcamp-current':{checkedOn:'2026-11-27',scope:'Three-phase Bootcamp, Pro account. Official sources conflict about static vs trailing loss floor; no drawdown preset until resolved.',scopeFr:'Bootcamp trois phases, compte Pro. Sources officielles contradictoires sur le seuil de perte ; mécanisme à confirmer.',assessments:{
      consistency:{points:1,source:'https://www.the5ers.com/fixed-vs-dynamic-profit-targets/',reason:'Official educational guide explicitly says Bootcamp has no published percentage-based consistency rule; other risk rules remain.'},
      trading:{points:1,source:'https://the5ers.com/faqs/how-does-the-bootcamp-program-work/',reason:'News, overnight and weekend holding allowed except news bracketing; different strategies per active account.'},
      funded:{points:0.5,source:'https://the5ers.com/faqs/how-does-the-bootcamp-program-work/',reason:'3% daily pause on Pro only and account closure after 30 days inactivity; next day trading resumes after pause.'},
      payout:{points:0.5,source:'https://the5ers.com/faqs/how-does-the-bootcamp-program-work/',reason:'First reward after 14 days; cycle restarts each scaling event. Additional payout caps and exact contract version to confirm.'}
    },preset:{lossPercent:4,source:'https://www.the5ers.com/bootcamp/'}}
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
evidence.tradeday = {
  "tradeday-quick-pay": {
    "checkedOn": "2026-11-28",
    "scope": "TradeDay 2.0 Quick Pay, new purchases; Funded Sim baseline, live transition included. Both evaluation drawdown options converge to intraday funded.",
    "scopeFr": "Quick Pay 2.0, nouveaux achats ; compte simulé financé et transition live. Les deux modes d'évaluation deviennent intraday en phase financée.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://tradeday.freshdesk.com/en/support/solutions/articles/103000405228-what-is-quick-pay-",
        "reason": "Intraday trailing in Funded Sim for both evaluation types; gross profits include prior payouts."
      },
      "payout": {
        "points": 0.5,
        "source": "https://tradeday.freshdesk.com/en/support/solutions/articles/103000405228-what-is-quick-pay-",
        "reason": "Day-one eligibility, $250 minimum and no payout buffer; tiered share 50% below $4,000 retained profit and 80% above, split proportionally."
      },
      "consistency": {
        "points": 1,
        "source": "https://tradeday.freshdesk.com/en/support/solutions/articles/103000405228-what-is-quick-pay-",
        "reason": "30% evaluation consistency only; explicitly absent in Funded Sim."
      },
      "trading": {
        "points": 0.5,
        "source": "https://tradeday.freshdesk.com/en/support/solutions/articles/103000008889-what-are-the-rules-for-funded-funded-sim-and-funded-live-traders-",
        "reason": "Permitted trading hours, products and position limits; tier-one news profits excluded under the published funded rules."
      },
      "funded": {
        "points": 0,
        "source": "https://tradeday.freshdesk.com/en/support/solutions/articles/103000353468-quick-pay-funded-sim-path-to-live-trading",
        "reason": "Mandatory review and trading pause at $10,000 gross profit; excess profit forfeited. Three-month cooling-off after loss of live account."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "source": "https://tradeday.freshdesk.com/en/support/solutions/articles/103000405228-what-is-quick-pay-"
    }
  },
  "tradeday-fast-pass": {
    "checkedOn": "2026-11-28",
    "scope": "TradeDay 2.0 Fast Pass, opened on or after 26 July 2026; Funded Sim baseline, live transition included.",
    "scopeFr": "Fast Pass 2.0, comptes ouverts à partir du 26 juillet 2026 ; compte simulé financé et transition live.",
    "assessments": {
      "drawdown": {
        "points": 0.5,
        "source": "https://tradeday.freshdesk.com/en/support/solutions/articles/103000008889-what-are-the-rules-for-funded-funded-sim-and-funded-live-traders-",
        "reason": "EOD trailing in Funded Sim; locks at initial balance, including on first payout request per payout policy."
      },
      "payout": {
        "points": 0.5,
        "source": "https://tradeday.freshdesk.com/en/support/solutions/articles/103000404096-fast-pass-funded-sim-payout-policy",
        "reason": "Five qualifying winning days ($100–250 by tier), fresh net profit and $250 minimum; 50% maximum withdrawal with $750–2,250 tier caps. 80% share."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://tradeday.freshdesk.com/en/support/solutions/articles/103000404096-fast-pass-funded-sim-payout-policy",
        "reason": "45% best day divided by cumulative gross profits including prior payouts; not a per-cycle net denominator."
      },
      "trading": {
        "points": 0.5,
        "source": "https://tradeday.freshdesk.com/en/support/solutions/articles/103000008889-what-are-the-rules-for-funded-funded-sim-and-funded-live-traders-",
        "reason": "Permitted trading hours, products and position limits; tier-one news profits excluded under published funded rules."
      },
      "funded": {
        "points": 0,
        "source": "https://tradeday.freshdesk.com/en/support/solutions/articles/103000404097-fast-pass-funded-sim-route-to-funded-live",
        "reason": "Mandatory live transition at fifth payout request or earlier; simulated account closes and new live account starts at zero with buffer and position limits. Three-month cooling-off after live loss."
      }
    },
    "preset": {
      "drawdown": "eod",
      "profitSplit": 80,
      "source": "https://tradeday.freshdesk.com/en/support/solutions/articles/103000404096-fast-pass-funded-sim-payout-policy"
    }
  }
};
evidence["earn2trade"] = {
  "e2t-tcp": {
    "checkedOn": "2026-11-28",
    "scope": "TCP 25K–100K LiveSim; purchases from 2 November 2026; partner funding terms apply.",
    "scopeFr": "TCP 25K–100K LiveSim ; achats à partir du 2 novembre 2026 ; conditions du partenaire de financement.",
    "assessments": {
      "drawdown": {
        "points": 0.5,
        "source": "https://help.earn2trade.com/en/articles/6877364-what-happens-when-i-complete-my-evaluation",
        "reason": "LiveSim uses end-of-day drawdown; Live generally trails intraday, except large TCP."
      },
      "payout": {
        "points": 0.5,
        "source": "https://help.earn2trade.com/en/articles/5452472-what-is-the-withdrawal-policy",
        "reason": "Five qualifying profitable days per request, size-specific daily profit minima; $100 minimum and tier-dependent 50%/80% split or 60% TCP400."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.earn2trade.com/en/articles/3849975-what-is-the-maintain-consistency-rule",
        "reason": "30% concentration applies only to evaluation; explicitly absent in funded LiveSim/Live."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.earn2trade.com/en/articles/6877364-what-happens-when-i-complete-my-evaluation",
        "reason": "News trading permitted; mandatory session closure, restricted instruments and trade copier ban."
      },
      "funded": {
        "points": 0.5,
        "source": "https://help.earn2trade.com/en/articles/5452472-what-is-the-withdrawal-policy",
        "reason": "LiveSim total withdrawal thresholds trigger automatic Live transition; daily loss limit and funded account limits."
      }
    },
    "preset": {
      "drawdown": "eod",
      "source": "https://help.earn2trade.com/en/articles/6877364-what-happens-when-i-complete-my-evaluation"
    }
  },
  "e2t-gauntlet": {
    "checkedOn": "2026-11-28",
    "scope": "Gauntlet Mini LiveSim; purchases from 2 November 2026; partner funding terms apply.",
    "scopeFr": "Gauntlet Mini LiveSim ; achats à partir du 2 novembre 2026 ; conditions du partenaire de financement.",
    "assessments": {
      "drawdown": {
        "points": 0.5,
        "source": "https://help.earn2trade.com/en/articles/6877364-what-happens-when-i-complete-my-evaluation",
        "reason": "LiveSim uses end-of-day drawdown; Live generally trails intraday, except large TCP."
      },
      "payout": {
        "points": 0.5,
        "source": "https://help.earn2trade.com/en/articles/5452472-what-is-the-withdrawal-policy",
        "reason": "Five qualifying profitable days per request, size-specific daily profit minima; $100 minimum and tier-dependent 50%/80% split or 60% TCP400."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.earn2trade.com/en/articles/3849975-what-is-the-maintain-consistency-rule",
        "reason": "30% concentration applies only to evaluation; explicitly absent in funded LiveSim/Live."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.earn2trade.com/en/articles/6877364-what-happens-when-i-complete-my-evaluation",
        "reason": "News trading permitted; mandatory session closure, restricted instruments and trade copier ban."
      },
      "funded": {
        "points": 0.5,
        "source": "https://help.earn2trade.com/en/articles/5452472-what-is-the-withdrawal-policy",
        "reason": "LiveSim total withdrawal thresholds trigger automatic Live transition; daily loss limit and funded account limits."
      }
    },
    "preset": {
      "drawdown": "eod",
      "source": "https://help.earn2trade.com/en/articles/6877364-what-happens-when-i-complete-my-evaluation"
    }
  },
  "e2t-livesim": {
    "checkedOn": "2026-11-28",
    "scope": "Generic LiveSim (TCP 25K–100K or GM); purchases from 2 November 2026; partner funding terms apply.",
    "scopeFr": "Generic LiveSim (TCP 25K–100K or GM) ; achats à partir du 2 novembre 2026 ; conditions du partenaire de financement.",
    "assessments": {
      "drawdown": {
        "points": 0.5,
        "source": "https://help.earn2trade.com/en/articles/6877364-what-happens-when-i-complete-my-evaluation",
        "reason": "LiveSim uses end-of-day drawdown; Live generally trails intraday, except large TCP."
      },
      "payout": {
        "points": 0.5,
        "source": "https://help.earn2trade.com/en/articles/5452472-what-is-the-withdrawal-policy",
        "reason": "Five qualifying profitable days per request, size-specific daily profit minima; $100 minimum and tier-dependent 50%/80% split or 60% TCP400."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.earn2trade.com/en/articles/3849975-what-is-the-maintain-consistency-rule",
        "reason": "30% concentration applies only to evaluation; explicitly absent in funded LiveSim/Live."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.earn2trade.com/en/articles/6877364-what-happens-when-i-complete-my-evaluation",
        "reason": "News trading permitted; mandatory session closure, restricted instruments and trade copier ban."
      },
      "funded": {
        "points": 0.5,
        "source": "https://help.earn2trade.com/en/articles/5452472-what-is-the-withdrawal-policy",
        "reason": "LiveSim total withdrawal thresholds trigger automatic Live transition; daily loss limit and funded account limits."
      }
    },
    "preset": {
      "drawdown": "eod",
      "source": "https://help.earn2trade.com/en/articles/6877364-what-happens-when-i-complete-my-evaluation"
    }
  },
  "e2t-tcp-large-fixed": {
    "checkedOn": "2026-11-28",
    "scope": "TCP 200K/400K Live; purchases from 2 November 2026; partner funding terms apply.",
    "scopeFr": "TCP 200K/400K Live ; achats à partir du 2 novembre 2026 ; conditions du partenaire de financement.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://help.earn2trade.com/en/articles/6877364-what-happens-when-i-complete-my-evaluation",
        "reason": "TCP 200K/400K fixed maximum drawdown."
      },
      "payout": {
        "points": 0.5,
        "source": "https://help.earn2trade.com/en/articles/5452472-what-is-the-withdrawal-policy",
        "reason": "Five qualifying profitable days per request, size-specific daily profit minima; $100 minimum and tier-dependent 50%/80% split or 60% TCP400."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.earn2trade.com/en/articles/3849975-what-is-the-maintain-consistency-rule",
        "reason": "30% concentration applies only to evaluation; explicitly absent in funded LiveSim/Live."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.earn2trade.com/en/articles/6877364-what-happens-when-i-complete-my-evaluation",
        "reason": "News trading permitted; mandatory session closure, restricted instruments and trade copier ban."
      },
      "funded": {
        "points": 0.5,
        "source": "https://help.earn2trade.com/en/articles/5452472-what-is-the-withdrawal-policy",
        "reason": "Daily loss limit, funded account limits and payout-provider charges; no LiveSim cap at these sizes."
      }
    },
    "preset": {
      "drawdown": "static",
      "source": "https://help.earn2trade.com/en/articles/6877364-what-happens-when-i-complete-my-evaluation"
    }
  }
};
evidence["the-trading-pit"] = {
  "ttp-futures-prime": {
    "checkedOn": "2026-11-28",
    "scope": "Current Futures Prime earning phase, not evaluation.",
    "scopeFr": "Futures Prime actuel en phase financée, hors évaluation.",
    "assessments": {
      "drawdown": {
        "points": 0.5,
        "source": "https://www.thetradingpit.com/futures",
        "reason": "EOD trailing floor locks at starting balance."
      },
      "payout": {
        "points": 0.5,
        "source": "https://www.thetradingpit.com/futures",
        "reason": "Five $150 profitable days and seven-day requests; 50% realized profit with caps $2,500/$3,500/$5,000; new profit required."
      },
      "consistency": {
        "points": 1,
        "source": "https://www.thetradingpit.com/futures",
        "reason": "Prime funded payout conditions list profitable days and caps, no funded best-day percentage; evaluation rule separate."
      },
      "trading": {
        "points": 0.5,
        "source": "https://www.thetradingpit.com/trading-rules",
        "reason": "News allowed in earning phase; daily forced position closure and cross-account hedging ban."
      },
      "funded": {
        "points": 0.5,
        "source": "https://www.thetradingpit.com/futures",
        "reason": "Funded contract limits increase by EOD profit brackets; no additional funded target required to retain account."
      }
    },
    "preset": {
      "drawdown": "eod",
      "profitSplit": 80,
      "source": "https://www.thetradingpit.com/futures"
    }
  },
  "ttp-futures-instant": {
    "checkedOn": "2026-11-28",
    "scope": "Current Futures Instant 50K/100K, funded from inception.",
    "scopeFr": "Futures Instant 50K/100K actuel, financé dès l'ouverture.",
    "assessments": {
      "drawdown": {
        "points": 0.5,
        "source": "https://www.thetradingpit.com/futures",
        "reason": "EOD trailing floor locks at starting balance."
      },
      "payout": {
        "points": 0,
        "source": "https://www.thetradingpit.com/futures",
        "reason": "New profit goal required each cycle; five traded days, $500 minimum and sequential payout caps."
      },
      "consistency": {
        "points": 0,
        "source": "https://www.thetradingpit.com/futures",
        "reason": "20% best-day threshold before each payout."
      },
      "trading": {
        "points": 0.5,
        "source": "https://www.thetradingpit.com/futures",
        "reason": "Intraday futures; no overnight/weekend positions; programme news trading permitted."
      },
      "funded": {
        "points": 0.5,
        "source": "https://www.thetradingpit.com/futures",
        "reason": "Dynamic daily pause tied to 60% of peak accumulated EOD profit; maximum two Instant accounts."
      }
    },
    "preset": {
      "drawdown": "eod",
      "profitSplit": 90,
      "source": "https://www.thetradingpit.com/futures"
    }
  }
};
evidence["trade-the-pool"] = {
  "ttp-day-max": {
    "checkedOn": "2026-11-28",
    "scope": "Current Day MAX Professional account. Tier floor can reset upward.",
    "scopeFr": "Compte Professional Day MAX actuel. Seuil ajustable par palier.",
    "assessments": {
      "drawdown": {
        "points": 0.5,
        "source": "https://tradethepool.com/program-terms/",
        "reason": "Overall loss floor starts from tier balance minus maximum loss, resets to tier balance at 3× daily limit profit; not a standard continuous trail."
      },
      "payout": {
        "points": 0.5,
        "source": "https://tradethepool.com/the-program/",
        "reason": "14-day withdrawals, minimum profit $300 ($150 on 5K), at least 20 positions; scaling restarts the withdrawal clock."
      },
      "consistency": {
        "points": 1,
        "source": "https://tradethepool.com/program-terms/",
        "reason": "30% best-position requirement evaluation only."
      },
      "trading": {
        "points": 0.5,
        "source": "https://tradethepool.com/program-terms/",
        "reason": "Minimum 30 seconds and $0.10 price movement for valid trades; day-session restrictions apply."
      },
      "funded": {
        "points": 0.5,
        "source": "https://tradethepool.com/program-terms/",
        "reason": "14-day inactivity timeout and mandatory risk management; scaling creates replacement account and can delay withdrawals."
      }
    },
    "preset": {
      "source": "https://tradethepool.com/program-terms/"
    }
  },
  "ttp-day-flex": {
    "checkedOn": "2026-11-28",
    "scope": "Current Day FLEX Professional account. Tier floor can reset upward.",
    "scopeFr": "Compte Professional Day FLEX actuel. Seuil ajustable par palier.",
    "assessments": {
      "drawdown": {
        "points": 0.5,
        "source": "https://tradethepool.com/program-terms/",
        "reason": "Overall loss floor starts from tier balance minus maximum loss, resets to tier balance at 3× daily limit profit; not a standard continuous trail."
      },
      "payout": {
        "points": 0.5,
        "source": "https://tradethepool.com/the-program/",
        "reason": "14-day withdrawals, minimum profit $300 ($150 on 5K), at least 10 positions; three 0.5% profit days per cycle."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://tradethepool.com/program-terms/",
        "reason": "50% maximum single-position share of valid profit in funded phase; position-based, not best-day."
      },
      "trading": {
        "points": 0.5,
        "source": "https://tradethepool.com/program-terms/",
        "reason": "Minimum 30 seconds and $0.10 price movement for valid trades; day-session restrictions apply."
      },
      "funded": {
        "points": 0.5,
        "source": "https://tradethepool.com/program-terms/",
        "reason": "14-day inactivity timeout and mandatory risk management; scaling creates replacement account and can delay withdrawals."
      }
    },
    "preset": {
      "source": "https://tradethepool.com/program-terms/"
    }
  },
  "ttp-swing-max": {
    "checkedOn": "2026-11-28",
    "scope": "Current Swing MAX Professional account. Funded swing drawdown formula not confirmed.",
    "scopeFr": "Compte Professional Swing MAX actuel. Formule de drawdown financé swing à confirmer.",
    "assessments": {
      "payout": {
        "points": 0.5,
        "source": "https://tradethepool.com/the-program/",
        "reason": "14-day withdrawals, minimum profit $300 ($150 on 5K), at least 5 positions; scaling restarts the withdrawal clock."
      },
      "consistency": {
        "points": 1,
        "source": "https://tradethepool.com/program-terms/",
        "reason": "70% maximum single-position share of valid profit in funded phase; position-based, not best-day."
      },
      "trading": {
        "points": 0.5,
        "source": "https://tradethepool.com/program-terms/",
        "reason": "Minimum 30 seconds and $0.10 price movement for valid trades; earnings holding prohibited."
      },
      "funded": {
        "points": 0.5,
        "source": "https://tradethepool.com/program-terms/",
        "reason": "14-day inactivity timeout and mandatory risk management; scaling creates replacement account and can delay withdrawals."
      }
    },
    "preset": {
      "source": "https://tradethepool.com/program-terms/"
    }
  },
  "ttp-swing-flex": {
    "checkedOn": "2026-11-28",
    "scope": "Current Swing FLEX Professional account. Funded swing drawdown formula not confirmed.",
    "scopeFr": "Compte Professional Swing FLEX actuel. Formule de drawdown financé swing à confirmer.",
    "assessments": {
      "payout": {
        "points": 0.5,
        "source": "https://tradethepool.com/the-program/",
        "reason": "14-day withdrawals, minimum profit $300 ($150 on 5K), at least 5 positions; three 0.5% profit days per cycle."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://tradethepool.com/program-terms/",
        "reason": "50% maximum single-position share of valid profit in funded phase; position-based, not best-day."
      },
      "trading": {
        "points": 0.5,
        "source": "https://tradethepool.com/program-terms/",
        "reason": "Minimum 30 seconds and $0.10 price movement for valid trades; earnings holding prohibited."
      },
      "funded": {
        "points": 0.5,
        "source": "https://tradethepool.com/program-terms/",
        "reason": "14-day inactivity timeout and mandatory risk management; scaling creates replacement account and can delay withdrawals."
      }
    },
    "preset": {
      "source": "https://tradethepool.com/program-terms/"
    }
  },
  "ttp-edge": {
    "checkedOn": "2026-11-28",
    "scope": "Edge Professional 50K/100K; funded drawdown measured EOD; exact lock mechanics not confirmed.",
    "scopeFr": "Edge Professional 50K/100K ; drawdown financé calculé en fin de journée, mécanisme de verrouillage à confirmer.",
    "assessments": {
      "payout": {
        "points": 0,
        "source": "https://tradethepool.com/the-program/",
        "reason": "First profit goal 4%, subsequent 1%/1.5%; $500 minimum and $1,500/$2,000 cap."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://tradethepool.com/the-program/",
        "reason": "40% funded consistency."
      },
      "trading": {
        "points": 0.5,
        "source": "https://tradethepool.com/the-program/",
        "reason": "Minimum 30-second hold and $0.10 movement; position limited to 5% prior-minute stock volume."
      },
      "funded": {
        "points": 0.5,
        "source": "https://tradethepool.com/the-program/",
        "reason": "Hard daily loss 2.5%/1.8%; no Pro scaling."
      }
    },
    "preset": {
      "profitSplit": 80,
      "source": "https://tradethepool.com/the-program/"
    }
  }
};
evidence["funded-futures-network"] = {
  "funded-futures-network-max-standard": {
    "checkedOn": "2026-11-28",
    "scope": "Current 50K MAX Standard funded baseline; source terms from account card.",
    "scopeFr": "MAX Standard 50K financé actuel ; fiche officielle.",
    "assessments": {
      "drawdown": {
        "points": 0.5,
        "source": "https://fundedfuturesnetwork.com/competition",
        "reason": "$2,000 EOD trailing floor locks at starting balance plus $100."
      },
      "payout": {
        "points": 0.5,
        "source": "https://fundedfuturesnetwork.com/competition",
        "reason": "Same-day eligibility, $2,000 buffer, $500 minimum; first 3 caps $1,000 then $1,250, $10K aggregate per withdrawal."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://fundedfuturesnetwork.com/competition",
        "reason": "40% funded best-day concentration."
      },
      "trading": {
        "points": 0.5,
        "source": "https://fundedfuturesnetwork.com/faq",
        "reason": "Maximum five copy-traded accounts; daily session restrictions and funded news restrictions per existing audit."
      },
      "funded": {
        "points": 0.5,
        "source": "https://fundedfuturesnetwork.com/competition",
        "reason": "Live review after four payouts on one account or ten since last review; $1,250 daily loss limit."
      }
    },
    "preset": {
      "drawdown": "eod",
      "profitSplit": 80,
      "source": "https://fundedfuturesnetwork.com/competition"
    }
  },
  "funded-futures-network-steady": {
    "checkedOn": "2026-11-28",
    "scope": "Current STEADY; unresolved conflict between general and dedicated news/automation rules.",
    "scopeFr": "STEADY actuel ; contradiction sur les annonces et l'automatisation entre FAQ générale et fiche dédiée.",
    "assessments": {
      "drawdown": {
        "points": 0.5,
        "source": "https://steady.fundedfuturesnetwork.com/",
        "reason": "EOD trailing drawdown, tier-dependent; no daily loss limit."
      },
      "payout": {
        "points": 0.5,
        "source": "https://steady.fundedfuturesnetwork.com/",
        "reason": "Buffer equal to drawdown and sequential caps $1K–3K initially; $10K aggregate cap."
      },
      "consistency": {
        "points": 1,
        "source": "https://steady.fundedfuturesnetwork.com/",
        "reason": "52% evaluation only; no funded consistency."
      },
      "funded": {
        "points": 0.5,
        "source": "https://steady.fundedfuturesnetwork.com/",
        "reason": "Live review after five payouts; exact live transition conditions require clarification."
      }
    },
    "preset": {
      "drawdown": "eod",
      "source": "https://steady.fundedfuturesnetwork.com/"
    }
  }
};
evidence["maven-trading"] = {
  "maven-standard-one-step": {
    "checkedOn": "2026-11-28",
    "scope": "Current Standard Forex simulated funded, no paid add-ons; trailing formula for 1-Step not fixed-dollar.",
    "scopeFr": "Forex Standard financé simulé actuel, sans option payante ; seuil suiveur du 1-Step proportionnel au pic d'équité.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://maventrading.crisp.help/en/article/what-are-the-drawdown-limits-ddpi2b/",
        "reason": "5% of peak real-time equity, never locks before payout; resets after payout."
      },
      "payout": {
        "points": 0.5,
        "source": "https://maventrading.crisp.help/en/article/payout-requirements-for-funded-trading-accounts-14yu6of/",
        "reason": "Ten business days from first trade per cycle, $20 minimum, $10K rolling 30-day cap per trader. 80% default split."
      },
      "consistency": {
        "points": 1,
        "source": "https://maventrading.crisp.help/en/article/what-is-the-consistency-rule-and-how-does-it-work-6n4p3r/",
        "reason": "No percentage consistency rule during challenge or funded stage."
      },
      "trading": {
        "points": 0.5,
        "source": "https://maventrading.com/faqs",
        "reason": "At least half trades held 60 seconds; restricted red-folder news window includes pending orders and SL/TP."
      },
      "funded": {
        "points": 0.5,
        "source": "https://maventrading.com/faqs",
        "reason": "One trade per 30 days required to maintain account; general risk and trading restrictions."
      }
    },
    "preset": {
      "profitSplit": 80,
      "source": "https://maventrading.crisp.help/en/article/what-are-the-drawdown-limits-ddpi2b/"
    }
  },
  "maven-standard-two-step": {
    "checkedOn": "2026-11-28",
    "scope": "Current Standard Forex simulated funded, no paid add-ons; trailing formula for 1-Step not fixed-dollar.",
    "scopeFr": "Forex Standard financé simulé actuel, sans option payante ; seuil suiveur du 1-Step proportionnel au pic d'équité.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://maventrading.crisp.help/en/article/what-are-the-drawdown-limits-ddpi2b/",
        "reason": "8% fixed below initial balance."
      },
      "payout": {
        "points": 0.5,
        "source": "https://maventrading.crisp.help/en/article/payout-requirements-for-funded-trading-accounts-14yu6of/",
        "reason": "Ten business days from first trade per cycle, $20 minimum, $10K rolling 30-day cap per trader; three fresh profitable days at 0.5% each. 80% default split."
      },
      "consistency": {
        "points": 1,
        "source": "https://maventrading.crisp.help/en/article/what-is-the-consistency-rule-and-how-does-it-work-6n4p3r/",
        "reason": "No percentage consistency rule during challenge or funded stage."
      },
      "trading": {
        "points": 0.5,
        "source": "https://maventrading.com/faqs",
        "reason": "At least half trades held 60 seconds; restricted red-folder news window includes pending orders and SL/TP."
      },
      "funded": {
        "points": 0.5,
        "source": "https://maventrading.com/faqs",
        "reason": "One trade per 30 days required to maintain account; general risk and trading restrictions."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 8,
      "profitSplit": 80,
      "source": "https://maventrading.crisp.help/en/article/what-are-the-drawdown-limits-ddpi2b/"
    }
  },
  "maven-standard-three-step": {
    "checkedOn": "2026-11-28",
    "scope": "Current Standard Forex simulated funded, no paid add-ons; trailing formula for 1-Step not fixed-dollar.",
    "scopeFr": "Forex Standard financé simulé actuel, sans option payante ; seuil suiveur du 1-Step proportionnel au pic d'équité.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://maventrading.crisp.help/en/article/what-are-the-drawdown-limits-ddpi2b/",
        "reason": "3% fixed below initial balance."
      },
      "payout": {
        "points": 0.5,
        "source": "https://maventrading.crisp.help/en/article/payout-requirements-for-funded-trading-accounts-14yu6of/",
        "reason": "Ten business days from first trade per cycle, $20 minimum, $10K rolling 30-day cap per trader. 80% default split."
      },
      "consistency": {
        "points": 1,
        "source": "https://maventrading.crisp.help/en/article/what-is-the-consistency-rule-and-how-does-it-work-6n4p3r/",
        "reason": "No percentage consistency rule during challenge or funded stage."
      },
      "trading": {
        "points": 0.5,
        "source": "https://maventrading.com/faqs",
        "reason": "At least half trades held 60 seconds; restricted red-folder news window includes pending orders and SL/TP."
      },
      "funded": {
        "points": 0.5,
        "source": "https://maventrading.com/faqs",
        "reason": "One trade per 30 days required to maintain account; general risk and trading restrictions."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 3,
      "profitSplit": 80,
      "source": "https://maventrading.crisp.help/en/article/what-are-the-drawdown-limits-ddpi2b/"
    }
  },
  "maven-static-one-step": {
    "checkedOn": "2026-11-28",
    "scope": "Current Static 1-Step, M2 Account Saver applies; no paid add-ons.",
    "scopeFr": "Static 1-Step actuel, dispositif M2 Account Saver ; sans option payante.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://maventrading.com/static-1-step",
        "reason": "5% fixed below starting balance; same evaluation and funded."
      },
      "payout": {
        "points": 0.5,
        "source": "https://maventrading.crisp.help/en/article/payout-requirements-for-funded-trading-accounts-14yu6of/",
        "reason": "Ten business days and four fresh 0.5%-profit days; first two withdrawals capped at 6% and 8%; $10K aggregate rolling 30-day cap."
      },
      "consistency": {
        "points": 1,
        "source": "https://maventrading.com/faqs",
        "reason": "No percentage consistency score in funded phase."
      },
      "trading": {
        "points": 0.5,
        "source": "https://maventrading.com/faqs",
        "reason": "News-window restriction includes automatic orders in FAQ; another payout article instead describes 0.5% event profit cap. Both materially restrict news profits; confirm exact rule before purchase."
      },
      "funded": {
        "points": 0,
        "source": "https://maventrading.com/faqs",
        "reason": "M2 2% trigger closes positions, permanently reduces reward share to 50% on first breach, deactivates account on second."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 5,
      "source": "https://maventrading.com/static-1-step"
    }
  },
  "maven-instant": {
    "checkedOn": "2026-11-28",
    "scope": "Current Instant Forex; official FAQ conflicts with help-centre timing (10 business days versus on-demand); conservative gate score.",
    "scopeFr": "Forex Instant actuel ; divergence FAQ et centre d'aide sur délai de retrait (10 jours ouvrés ou à la demande).",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://maventrading.crisp.help/en/article/what-are-the-drawdown-limits-ddpi2b/",
        "reason": "3% of highest equity including floating gains; dynamic high-water drawdown."
      },
      "payout": {
        "points": 0,
        "source": "https://maventrading.com/faqs",
        "reason": "At least 3% profit before payout; $10K rolling cap; website FAQ says 10 business days, help centre says immediate once conditions met. Both require the growth threshold."
      },
      "consistency": {
        "points": 0,
        "source": "https://maventrading.crisp.help/en/article/instant-funded-account-rules-1k2ozdo/",
        "reason": "20% best day over total profit required at payout."
      },
      "trading": {
        "points": 0.5,
        "source": "https://maventrading.crisp.help/en/article/instant-funded-account-rules-1k2ozdo/",
        "reason": "News and overnight/weekend trading allowed; at least half trades held 60 seconds, EAs prohibited."
      },
      "funded": {
        "points": 0,
        "source": "https://maventrading.crisp.help/en/article/what-are-the-drawdown-limits-ddpi2b/",
        "reason": "1% total floating loss hard breach, separate from 2% daily and 3% trailing maximum."
      }
    },
    "preset": {
      "profitSplit": 80,
      "source": "https://maventrading.crisp.help/en/article/instant-funded-account-rules-1k2ozdo/"
    }
  }
};
evidence["lux-trading-firm"] = {
  "lux-1-step-evaluation": {
    "checkedOn": "2026-11-28",
    "scope": "Partial; current Rules of Engagement 80% instant-withdrawal career stages versus another public 75% monthly rule set; checkout applicability not established.",
    "scopeFr": "Partiel : règlement actuel 80 % et retraits à la demande, autre règlement public à 75 % mensuel ; contrat applicable à confirmer.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://luxtradingfirm.com/rules-of-engagement-3/",
        "reason": "6% static loss from initial capital in current 1-Step career stage tables."
      },
      "consistency": {
        "points": 0,
        "source": "https://luxtradingfirm.com/rules-of-engagement-3/",
        "reason": "Uniform chosen risk percentage of remaining risk capital must be applied across trades; combined concurrent exposure restricted."
      },
      "trading": {
        "points": 0.5,
        "source": "https://luxtradingfirm.com/rules-of-engagement-3/",
        "reason": "Stop loss required before entering; stop-loss adjustment restricted near news, news bracketing forbidden."
      },
      "funded": {
        "points": 0,
        "source": "https://luxtradingfirm.com/t_c-2/",
        "reason": "Personalized risk-manager requirements and expulsion clause; existing public rules allow account removal for serious or repeated risk-management failures."
      }
    }
  }
};
evidence["blueberry-funded"] = {
  "blueberry-prime-2-step": {
    "checkedOn": "2026-11-28",
    "scope": "Prime only, purchases from 17 August 2026; distinct from withdrawn 2-Step.",
    "scopeFr": "Prime uniquement, achats depuis le 17 août 2026 ; distinct de l'ancien 2-Step.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://help.blueberryfunded.com/en/articles/12136509-what-is-the-prime-challenge",
        "reason": "10% static total loss and fixed 4% daily allowance."
      },
      "payout": {
        "points": 0.5,
        "source": "https://help.blueberryfunded.com/en/articles/12136624-prime-reward-structure",
        "reason": "14-day cycle, three fresh active days each earning 0.5%, 80% share."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.blueberryfunded.com/en/articles/12136624-prime-reward-structure",
        "reason": "No percentage profit concentration rule."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.blueberryfunded.com/en/articles/12140938-news-trading-policy-for-prime-challenge",
        "reason": "No opening new positions two minutes before or after high-impact news; closing and managing permitted."
      },
      "funded": {
        "points": 1,
        "source": "https://help.blueberryfunded.com/en/articles/12136509-what-is-the-prime-challenge",
        "reason": "No special funded trade-idea risk cap or lot-size cap; ordinary prohibited strategies apply."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 10,
      "profitSplit": 80,
      "source": "https://help.blueberryfunded.com/en/articles/12136509-what-is-the-prime-challenge"
    }
  }
};
evidence["breakout-prop"] = {
  "breakout-classic": {
    "checkedOn": "2026-11-28",
    "scope": "Current Classic/Pro/Turbo funded rules, standard 80% split; not Spark. Account activation and withdrawals require approval.",
    "scopeFr": "Règles financées Classic/Pro/Turbo actuelles, partage 80 %, hors Spark ; activation et retraits soumis à approbation.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://www.breakoutprop.com/program-rules/",
        "reason": "6% static overall loss, 3% daily; funded stage retains evaluation loss limits per official how-it-works page."
      },
      "payout": {
        "points": 1,
        "source": "https://intercom.help/breakoutprop/en/articles/11647224-when-can-i-request-a-payout-from-my-funded-account",
        "reason": "On-demand, $50 net minimum, flat positions required, no scheduled cycle; USDC ERC-20 and approval may take 12–24 hours."
      },
      "consistency": {
        "points": 1,
        "source": "https://www.breakoutprop.com/how-it-works/",
        "reason": "Explicitly no funded consistency requirement."
      },
      "trading": {
        "points": 1,
        "source": "https://www.breakoutprop.com/program-rules/",
        "reason": "News permitted and trading available around the clock subject to maintenance; general prohibited trading rules remain."
      },
      "funded": {
        "points": 0.5,
        "source": "https://www.breakoutprop.com/funded-trader-agreement/",
        "reason": "90-day inactivity suspension, reactivation by request. Company has contractual discretion to terminate access without notice; broader reliability is evaluated separately."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 6,
      "profitSplit": 80,
      "source": "https://www.breakoutprop.com/how-it-works/"
    }
  },
  "breakout-pro": {
    "checkedOn": "2026-11-28",
    "scope": "Current Classic/Pro/Turbo funded rules, standard 80% split; not Spark. Account activation and withdrawals require approval.",
    "scopeFr": "Règles financées Classic/Pro/Turbo actuelles, partage 80 %, hors Spark ; activation et retraits soumis à approbation.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://www.breakoutprop.com/program-rules/",
        "reason": "5% static overall loss, 3% daily; funded stage retains evaluation loss limits per official how-it-works page."
      },
      "payout": {
        "points": 1,
        "source": "https://intercom.help/breakoutprop/en/articles/11647224-when-can-i-request-a-payout-from-my-funded-account",
        "reason": "On-demand, $50 net minimum, flat positions required, no scheduled cycle; USDC ERC-20 and approval may take 12–24 hours."
      },
      "consistency": {
        "points": 1,
        "source": "https://www.breakoutprop.com/how-it-works/",
        "reason": "Explicitly no funded consistency requirement."
      },
      "trading": {
        "points": 1,
        "source": "https://www.breakoutprop.com/program-rules/",
        "reason": "News permitted and trading available around the clock subject to maintenance; general prohibited trading rules remain."
      },
      "funded": {
        "points": 0.5,
        "source": "https://www.breakoutprop.com/funded-trader-agreement/",
        "reason": "90-day inactivity suspension, reactivation by request. Company has contractual discretion to terminate access without notice; broader reliability is evaluated separately."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 5,
      "profitSplit": 80,
      "source": "https://www.breakoutprop.com/how-it-works/"
    }
  },
  "breakout-turbo": {
    "checkedOn": "2026-11-28",
    "scope": "Current Classic/Pro/Turbo funded rules, standard 80% split; not Spark. Account activation and withdrawals require approval.",
    "scopeFr": "Règles financées Classic/Pro/Turbo actuelles, partage 80 %, hors Spark ; activation et retraits soumis à approbation.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://www.breakoutprop.com/program-rules/",
        "reason": "3% static overall loss, 3% daily; funded stage retains evaluation loss limits per official how-it-works page."
      },
      "payout": {
        "points": 1,
        "source": "https://intercom.help/breakoutprop/en/articles/11647224-when-can-i-request-a-payout-from-my-funded-account",
        "reason": "On-demand, $50 net minimum, flat positions required, no scheduled cycle; USDC ERC-20 and approval may take 12–24 hours."
      },
      "consistency": {
        "points": 1,
        "source": "https://www.breakoutprop.com/how-it-works/",
        "reason": "Explicitly no funded consistency requirement."
      },
      "trading": {
        "points": 1,
        "source": "https://www.breakoutprop.com/program-rules/",
        "reason": "News permitted and trading available around the clock subject to maintenance; general prohibited trading rules remain."
      },
      "funded": {
        "points": 0.5,
        "source": "https://www.breakoutprop.com/funded-trader-agreement/",
        "reason": "90-day inactivity suspension, reactivation by request. Company has contractual discretion to terminate access without notice; broader reliability is evaluated separately."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 3,
      "profitSplit": 80,
      "source": "https://www.breakoutprop.com/how-it-works/"
    }
  }
};
evidence["funderpro"] = {
  "funderpro-one-phase": {
    "checkedOn": "2026-11-28",
    "scope": "Standard fortnightly route, no Swing or other paid add-ons.",
    "scopeFr": "Retrait tous les 14 jours, sans Swing ni autre option payante.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://support.funderpro.com/en/articles/377860-what-is-the-drawdown-rule-and-how-does-it-apply-to-funded-account-challenges",
        "reason": "6% static maximum loss based on initial capital; equity triggers breach."
      },
      "payout": {
        "points": 1,
        "source": "https://support.funderpro.com/en/articles/419844-how-does-reward-frequency-and-eligibility-work-for-funderpro-challenges",
        "reason": "14-day cycle and $100 minimum profit, 80% standard split."
      },
      "consistency": {
        "points": 1,
        "source": "https://support.funderpro.com/en/articles/377852-what-is-the-consistency-rule-and-how-does-it-affect-my-challenge",
        "reason": "No percentage consistency in funded stage; evaluation conditions are separate."
      },
      "trading": {
        "points": 0.5,
        "source": "https://support.funderpro.com/en/articles/378023-are-news-holding-and-news-trading-allowed",
        "reason": "News holding and trading on funded account require Swing add-on; weekend holding also requires Swing."
      },
      "funded": {
        "points": 0,
        "source": "https://support.funderpro.com/en/articles/421458-is-there-a-margin-rule-on-funded-accounts",
        "reason": "Margin cap of 20% initial balance per asset class; first violation deducts profits, second closes account and declines remaining payout."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 6,
      "profitSplit": 80,
      "source": "https://support.funderpro.com/en/articles/377860-what-is-the-drawdown-rule-and-how-does-it-apply-to-funded-account-challenges"
    }
  },
  "funderpro-classic": {
    "checkedOn": "2026-11-28",
    "scope": "Standard fortnightly route, no Swing or other paid add-ons.",
    "scopeFr": "Retrait tous les 14 jours, sans Swing ni autre option payante.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://support.funderpro.com/en/articles/377860-what-is-the-drawdown-rule-and-how-does-it-apply-to-funded-account-challenges",
        "reason": "10% static maximum loss based on initial capital; equity triggers breach."
      },
      "payout": {
        "points": 1,
        "source": "https://support.funderpro.com/en/articles/419844-how-does-reward-frequency-and-eligibility-work-for-funderpro-challenges",
        "reason": "14-day cycle and $100 minimum profit, 80% standard split."
      },
      "consistency": {
        "points": 1,
        "source": "https://support.funderpro.com/en/articles/377852-what-is-the-consistency-rule-and-how-does-it-affect-my-challenge",
        "reason": "No percentage consistency in funded stage; evaluation conditions are separate."
      },
      "trading": {
        "points": 0.5,
        "source": "https://support.funderpro.com/en/articles/378023-are-news-holding-and-news-trading-allowed",
        "reason": "News holding and trading on funded account require Swing add-on; weekend holding also requires Swing."
      },
      "funded": {
        "points": 0,
        "source": "https://support.funderpro.com/en/articles/421458-is-there-a-margin-rule-on-funded-accounts",
        "reason": "Margin cap of 20% initial balance per asset class; first violation deducts profits, second closes account and declines remaining payout."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 10,
      "profitSplit": 80,
      "source": "https://support.funderpro.com/en/articles/377860-what-is-the-drawdown-rule-and-how-does-it-apply-to-funded-account-challenges"
    }
  },
  "funderpro-pro": {
    "checkedOn": "2026-11-28",
    "scope": "Pro weekly 90% route, no Swing or other paid add-ons.",
    "scopeFr": "Pro hebdomadaire 90 %, sans Swing ni autre option payante.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://support.funderpro.com/en/articles/377860-what-is-the-drawdown-rule-and-how-does-it-apply-to-funded-account-challenges",
        "reason": "10% static maximum loss based on initial capital; equity triggers breach."
      },
      "payout": {
        "points": 0.5,
        "source": "https://support.funderpro.com/en/articles/419844-how-does-reward-frequency-and-eligibility-work-for-funderpro-challenges",
        "reason": "Weekly request and minimum 1% of initial account balance profit; 90% share."
      },
      "consistency": {
        "points": 1,
        "source": "https://support.funderpro.com/en/articles/377852-what-is-the-consistency-rule-and-how-does-it-affect-my-challenge",
        "reason": "No percentage consistency in funded stage; evaluation conditions are separate."
      },
      "trading": {
        "points": 0.5,
        "source": "https://support.funderpro.com/en/articles/378023-are-news-holding-and-news-trading-allowed",
        "reason": "News holding and trading on funded account require Swing add-on; weekend holding also requires Swing."
      },
      "funded": {
        "points": 0,
        "source": "https://support.funderpro.com/en/articles/421458-is-there-a-margin-rule-on-funded-accounts",
        "reason": "Margin cap of 20% initial balance per asset class; first violation deducts profits, second closes account and declines remaining payout."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 10,
      "profitSplit": 90,
      "source": "https://support.funderpro.com/en/articles/377860-what-is-the-drawdown-rule-and-how-does-it-apply-to-funded-account-challenges"
    }
  }
};
evidence["ftuk"] = {
  "ftuk-flex-challenge": {
    "checkedOn": "2026-11-28",
    "scope": "FLEX Forex funded level 1; later levels change split and consistency.",
    "scopeFr": "FLEX Forex financé niveau 1 ; partage et consistency évoluent aux niveaux supérieurs.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://faq.ftuk.com/en/articles/14322511-flex-challenge-explained",
        "reason": "6% trailing highest closing balance, locks at initial balance."
      },
      "payout": {
        "points": 0.5,
        "source": "https://faq.ftuk.com/en/articles/14322511-flex-challenge-explained",
        "reason": "On-demand after meeting eligibility; 60% share at level 1; higher-level small withdrawals may retain 60% share."
      },
      "consistency": {
        "points": 0,
        "source": "https://faq.ftuk.com/en/articles/14322511-flex-challenge-explained",
        "reason": "Best day strictly below 20% of profit requested at level 1; rises to 40% at higher levels."
      },
      "trading": {
        "points": 0.5,
        "source": "https://faq.ftuk.com/en/articles/14492295-is-there-a-minimum-trade-duration",
        "reason": "Minimum 30 seconds per trade; automatic SL/TP before 30 seconds is also a violation. News allowed; other account-specific restrictions apply."
      },
      "funded": {
        "points": 0,
        "source": "https://faq.ftuk.com/en/articles/14322511-flex-challenge-explained",
        "reason": "2% combined floating loss closes all positions; second trigger hard breach."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 6,
      "source": "https://faq.ftuk.com/en/articles/14322511-flex-challenge-explained"
    }
  },
  "ftuk-instant-funding": {
    "checkedOn": "2026-11-28",
    "scope": "Forex Instant Funding level 1, not Instant Funding PRO.",
    "scopeFr": "Forex Instant Funding niveau 1, hors nouveau Instant Funding PRO.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://faq.ftuk.com/en/articles/12333289-what-are-the-drawdown-limits",
        "reason": "6% balance-high trailing, locks at initial balance."
      },
      "payout": {
        "points": 0.5,
        "source": "https://faq.ftuk.com/en/articles/12339852-how-do-i-request-a-profit-payout",
        "reason": "On-demand subject to level target; reward at current target rather than excess profit beyond 10% at levels through six. Account is view-only pending approval."
      },
      "consistency": {
        "points": 0,
        "source": "https://faq.ftuk.com/en/articles/12310214-instant-funding-program-forex",
        "reason": "Best day strictly below 20% initially, thresholds increase to 40% at level six."
      },
      "trading": {
        "points": 0.5,
        "source": "https://faq.ftuk.com/en/articles/14492295-is-there-a-minimum-trade-duration",
        "reason": "Minimum 30 seconds per trade; automatic SL/TP before 30 seconds is also a violation. News allowed; other account-specific restrictions apply."
      },
      "funded": {
        "points": 0,
        "source": "https://faq.ftuk.com/en/articles/12339790-what-are-account-breaches",
        "reason": "Second 2% Account Protector trigger terminates account; 30-day inactivity hard breach."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 6,
      "source": "https://faq.ftuk.com/en/articles/12310214-instant-funding-program-forex"
    }
  },
  "ftuk-flex-futures": {
    "checkedOn": "2026-11-28",
    "scope": "Current FLEX Futures funded account; all size tiers.",
    "scopeFr": "FLEX Futures financé actuel, toutes tailles.",
    "assessments": {
      "drawdown": {
        "points": 0.5,
        "source": "https://faq.ftuk.com/en/articles/17563548-flex-futures-account-rules-overview",
        "reason": "EOD trailing limit by size; daily limit is soft breach."
      },
      "payout": {
        "points": 0.5,
        "source": "https://faq.ftuk.com/en/articles/17563548-flex-futures-account-rules-overview",
        "reason": "Five qualifying winning days, buffer $1.5K–$4.5K, $500 minimum, caps $1K–$2.5K; second payout onward at least 50% new profit."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://faq.ftuk.com/en/articles/17589500-flex-futures-funded-consistency-rule",
        "reason": "40% best day over current cycle total profit, resets after approval."
      },
      "trading": {
        "points": 0.5,
        "source": "https://faq.ftuk.com/en/articles/14492295-is-there-a-minimum-trade-duration",
        "reason": "Minimum 30 seconds per trade; automatic SL/TP before 30 seconds is also a violation. News allowed; other account-specific restrictions apply."
      },
      "funded": {
        "points": 0.5,
        "source": "https://faq.ftuk.com/en/articles/17563548-flex-futures-account-rules-overview",
        "reason": "Funded daily loss pause and maximum five accounts; contract limits apply."
      }
    },
    "preset": {
      "drawdown": "eod",
      "profitSplit": 90,
      "source": "https://faq.ftuk.com/en/articles/17563548-flex-futures-account-rules-overview"
    }
  },
  "ftuk-instant-sim-futures": {
    "checkedOn": "2026-11-28",
    "scope": "Current Instant Sim Funding Futures; all size tiers.",
    "scopeFr": "Instant Sim Funding Futures actuel, toutes tailles.",
    "assessments": {
      "drawdown": {
        "points": 0.5,
        "source": "https://faq.ftuk.com/en/articles/12355700-instant-sim-funding-futures-account-rules-overview",
        "reason": "EOD trailing loss; daily loss pauses trading."
      },
      "payout": {
        "points": 0,
        "source": "https://faq.ftuk.com/en/articles/12354244-instant-sim-funding-payout-rules-caps-progression",
        "reason": "6% payout target, five qualifying days, retained buffer and size-dependent cap; subsequent requests require 50% fresh profit."
      },
      "consistency": {
        "points": 0,
        "source": "https://faq.ftuk.com/en/articles/12354244-instant-sim-funding-payout-rules-caps-progression",
        "reason": "20% best day in current cycle; resets after approved payout."
      },
      "trading": {
        "points": 0.5,
        "source": "https://faq.ftuk.com/en/articles/14492295-is-there-a-minimum-trade-duration",
        "reason": "Minimum 30 seconds per trade; automatic SL/TP before 30 seconds is also a violation. News allowed; other account-specific restrictions apply."
      },
      "funded": {
        "points": 0.5,
        "source": "https://faq.ftuk.com/en/articles/12355700-instant-sim-funding-futures-account-rules-overview",
        "reason": "Daily loss pause, position scaling and copy trading between own FTUK accounts forbidden."
      }
    },
    "preset": {
      "drawdown": "eod",
      "profitSplit": 90,
      "source": "https://faq.ftuk.com/en/articles/12355700-instant-sim-funding-futures-account-rules-overview"
    }
  }
};
evidence["oneup-trader"] = {
  "oneup-standard-current": {
    "checkedOn": "2026-11-28",
    "scope": "Standard/Pro route, published partner funded rules; evaluation length differs.",
    "scopeFr": "Règles financées du partenaire ; durée d'évaluation différente selon Standard/Pro.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://help.oneuptrader.com/article/468-most-popular-questions",
        "reason": "Real-time balance trailing, stops at original balance; no daily loss limit."
      },
      "payout": {
        "points": 0.5,
        "source": "https://help.oneuptrader.com/article/376-profit-info",
        "reason": "Day-one eligibility above $1.5K–$5.5K withdrawal threshold by tier; $1K minimum, first $10K profits 100% then 90%."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.oneuptrader.com/article/468-most-popular-questions",
        "reason": "Evaluation consistency explicitly does not apply after funding."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.oneuptrader.com/article/372-funded-trader-rules",
        "reason": "All positions closed for major news and daily session closure; sub-10-second trading prohibited."
      },
      "funded": {
        "points": 0,
        "source": "https://help.oneuptrader.com/article/372-funded-trader-rules",
        "reason": "Weekly executions must reach half the evaluation weekly average; positive net PnL above original balance every 15 days during first 90 days, warnings at discretion."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "source": "https://help.oneuptrader.com/article/468-most-popular-questions"
    }
  },
  "oneup-pro-current": {
    "checkedOn": "2026-11-28",
    "scope": "Standard/Pro route, published partner funded rules; evaluation length differs.",
    "scopeFr": "Règles financées du partenaire ; durée d'évaluation différente selon Standard/Pro.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://help.oneuptrader.com/article/468-most-popular-questions",
        "reason": "Real-time balance trailing, stops at original balance; no daily loss limit."
      },
      "payout": {
        "points": 0.5,
        "source": "https://help.oneuptrader.com/article/376-profit-info",
        "reason": "Day-one eligibility above $1.5K–$5.5K withdrawal threshold by tier; $1K minimum, first $10K profits 100% then 90%."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.oneuptrader.com/article/468-most-popular-questions",
        "reason": "Evaluation consistency explicitly does not apply after funding."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.oneuptrader.com/article/372-funded-trader-rules",
        "reason": "All positions closed for major news and daily session closure; sub-10-second trading prohibited."
      },
      "funded": {
        "points": 0,
        "source": "https://help.oneuptrader.com/article/372-funded-trader-rules",
        "reason": "Weekly executions must reach half the evaluation weekly average; positive net PnL above original balance every 15 days during first 90 days, warnings at discretion."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "source": "https://help.oneuptrader.com/article/468-most-popular-questions"
    }
  },
  "oneup-express-return": {
    "checkedOn": "2026-11-28",
    "scope": "Express requalification restricted to previously funded traders; partner funded rules.",
    "scopeFr": "Règles financées du partenaire ; Express réservé aux anciens financés.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://help.oneuptrader.com/article/468-most-popular-questions",
        "reason": "Real-time balance trailing, stops at original balance; no daily loss limit."
      },
      "payout": {
        "points": 0.5,
        "source": "https://help.oneuptrader.com/article/376-profit-info",
        "reason": "Day-one eligibility above $1.5K–$5.5K withdrawal threshold by tier; $1K minimum, first $10K profits 100% then 90%."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.oneuptrader.com/article/468-most-popular-questions",
        "reason": "Evaluation consistency explicitly does not apply after funding."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.oneuptrader.com/article/372-funded-trader-rules",
        "reason": "All positions closed for major news and daily session closure; sub-10-second trading prohibited."
      },
      "funded": {
        "points": 0,
        "source": "https://help.oneuptrader.com/article/372-funded-trader-rules",
        "reason": "Weekly executions must reach half the evaluation weekly average; positive net PnL above original balance every 15 days during first 90 days, warnings at discretion."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "source": "https://help.oneuptrader.com/article/468-most-popular-questions"
    }
  }
};
// Remaining ChatGPT catalogue IDs, 2026-11-28.
evidence["rebelsfunding"] = {
  "rebelsfunding-gold-1-phase": {
    "checkedOn": "2026-11-28",
    "scope": "Gold RCF public rules v3.2 (11 November 2026), public score only; separate RCF contract and subsequent reward cadence unavailable, no guarantee of eligibility. Official comparison explicitly states no consistency rule.",
    "scopeFr": "Gold RCF, règlement public v3.2 du 11 novembre 2026 ; note des règles publiées, contrat RCF séparé et cadence suivante non accessibles.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://www.rebelsfunding.com/all-the-rules/",
        "reason": "6% fixed total loss from initial size, applies to RCF."
      },
      "payout": {
        "points": 0.5,
        "source": "https://www.rebelsfunding.com/all-the-rules/",
        "reason": "First request after 14 days, minimum $50; separate RCF contract and subsequent cycle to confirm."
      },
      "trading": {
        "points": 0.5,
        "source": "https://www.rebelsfunding.com/all-the-rules/",
        "reason": "RCF trades must last 60 seconds; new entries banned in five minutes before red news; holding/closing existing positions permitted."
      },
      "funded": {
        "points": 0,
        "source": "https://www.rebelsfunding.com/all-the-rules/",
        "reason": "Passing evaluation does not automatically grant RCF account; separate approval and contract required. 1.5% risk per related trade idea and 4% daily loss. Ordinary identity checks not penalised."
      },
      "consistency": {
        "points": 1,
        "source": "https://www.rebelsfunding.com/best-crypto-prop-firms/",
        "reason": "Official comparison explicitly lists no consistency rule; Gold RCF rulebook has no minimum number of trades before reward request. Individual trade-risk restrictions assessed separately."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 6,
      "source": "https://www.rebelsfunding.com/all-the-rules/"
    }
  }
};
evidence["sabiotrade"] = {
  "sabiotrade-evaluation": {
    "checkedOn": "2026-11-28",
    "scope": "Current CFD Single/Intraday reward accounts, .com and .us public rules, purchases from 2 February 2026. Score reflects common trailing mechanism and material concentration restrictions; percentages and post-reward protections vary by plan/domain. No options account or numerical preset.",
    "scopeFr": "Comptes CFD Single/Intraday, règles publiques .com et .us, achats depuis le 2 février 2026. Mécanisme trailing commun ; ratios et protection après retrait variables selon le plan/domaine. Hors options, sans préréglage numérique.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://sabiotrade.com/trading-rules",
        "reason": "Highest closed-balance trailing floor, 6% initial balance Single or 5% Intraday; US terms section 3 confirms the same trailing mechanism (plan percentages vary)."
      },
      "payout": {
        "points": 0.5,
        "source": "https://sabiotrade.com/performance-rewards",
        "reason": "First request when profitable, subsequent requests seven days apart, all positions closed. General terms also require 5–7 comparable trades; full withdrawal leaves no buffer against the initial-balance floor under .com rules."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://sabiotrade.us/terms",
        "reason": "US sections 5/7 specify 40% best-day and/or single-trade concentration and separately 55% single-trade eligibility. .com terms sections 6/9 specify 55% individual trade for payouts despite the public summary omitting funded consistency. No net-cycle preset."
      },
      "trading": {
        "points": 0.5,
        "source": "https://sabiotrade.com/terms",
        "reason": "Scalping, hedging and unapproved automation prohibited; equivalent US restrictions."
      },
      "funded": {
        "points": 0,
        "source": "https://sabiotrade.us/terms",
        "reason": "Discretionary reward denial/adjustment and funded breach forfeiture; .com sections 6/9/10 also permit discretionary refusal and forfeiture for applicable purchase cohorts. Ordinary KYC not penalised."
      }
    }
  }
};
evidence["sure-leverage"] = {
  "slf-instant-zero": {
    "checkedOn": "2026-11-28",
    "scope": "Default trailing Zero; optional static variant separate, daily loss retained. Payout buffer/reset wording ambiguous; score reflects confirmed gate.",
    "scopeFr": "Zero trailing par défaut ; variante statique séparée, perte journalière maintenue. Formulation du buffer/reset ambiguë.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://help.sureleveragefunding.com/en/articles/16546983-instant-funding-zero-no-consistency-rule",
        "reason": "4% of initial size below highest balance/equity; never trails down."
      },
      "payout": {
        "points": 0.5,
        "source": "https://help.sureleveragefunding.com/en/articles/16546983-instant-funding-zero-no-consistency-rule",
        "reason": "14-day cycle, first 3% profit not withdrawable, no profitable-day requirement; reset wording may affect remaining loss cushion."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.sureleveragefunding.com/en/articles/16546983-instant-funding-zero-no-consistency-rule",
        "reason": "Explicitly no consistency requirement."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.sureleveragefunding.com/en/articles/16546983-instant-funding-zero-no-consistency-rule",
        "reason": "No opening/closing ±5 minutes around news, no EAs, minimum two-minute hold."
      },
      "funded": {
        "points": 0,
        "source": "https://help.sureleveragefunding.com/en/articles/16546983-instant-funding-zero-no-consistency-rule",
        "reason": "At first payout denial split halved; second denial closes account; 20 soft breaches or ≥50% of trades in breach trigger penalties."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 4,
      "source": "https://help.sureleveragefunding.com/en/articles/16546983-instant-funding-zero-no-consistency-rule"
    }
  }
};
evidence["willis-capital"] = {
  "wfunded-skillcheck": {
    "checkedOn": "2026-11-28",
    "scope": "Generic SkillCheck ID combines Standard and Expedited. Common funded FAQ says balance-based overall calculation analogous to daily recalculation but gives no high-water-mark or reset rule. Marketing now says simulated while FAQ retains live wording. Separate model mapping and exact overall floor required. Official FAQ confirms intraday upward recalculation of daily loss, and says overall loss follows the same concept without a day boundary. No explicit overall floor or high-water-mark formula; secondary review supplies percentages but not the funded mechanism. Current Standard and Expedited pages both show 6% maximum loss and 4% daily in their rendered one-phase tables, while Standard prose says 5% daily funded. No exact preset.",
    "scopeFr": "SkillCheck générique Standard/Expedited ; référence du seuil global et réinitialisation non explicites, discours live/simulé contradictoire. FAQ : recalcul journalier à la hausse, concept global analogue ; formule exacte du seuil non publiée. Tableaux Standard/Expedited : 6 % global et 4 % journalier ; texte Standard indique 5 % journalier. Pas de préréglage.",
    "assessments": {
      "consistency": {
        "points": 0.5,
        "source": "https://www.wfunded.io/en/faq",
        "reason": "Qualitative consistency of strategy across trades stated, not a confirmed numerical threshold."
      },
      "funded": {
        "points": 0,
        "source": "https://www.wfunded.io/en/terms-and-conditions",
        "reason": "Company reserves broad termination discretion; FAQ states all prior profits forfeited for missing mandatory stop loss."
      },
      "payout": {
        "points": 0.5,
        "source": "https://www.wfunded.io/en/faq",
        "reason": "First withdrawal monthly, later biweekly, $100 minimum and 70% split in general FAQ."
      },
      "trading": {
        "points": 0.5,
        "source": "https://www.wfunded.io/en/faq",
        "reason": "News and weekend holding allowed with mandatory funded stop loss placed at least 15 minutes before major news; copy trading prohibited."
      }
    },
    "reviewOutcome": {
      "kind": "estimated",
      "reason": "Official FAQ says overall loss follows the balance-based daily concept without a day boundary, and the daily calculation rises with balance. This suggests trailing rather than static, but exact floor/reset is not published. Use conservative zero contribution to estimated drawdown; no simulator preset.",
      "reasonFr": "FAQ : recalcul du drawdown journalier à la hausse, concept global analogue sans limite de jour. Trailing probable mais formule inconnue ; estimation prudente à 0/1 sur cet axe, sans préréglage.",
      "source": "https://www.wfunded.io/en/faq",
      "estimate": 1.5
    }
  }
};
evidence["superfunded"] = {
  "superfunded-one-phase": {
    "checkedOn": "2026-11-28",
    "scope": "Legacy SuperFunded offer. Archive index (25 November) confirms home, FAQ and old V2 PDF all redirect to Eightcap Challenges Japanese home; actual archived replacement rulebook belongs to Eightcap. No contractual succession or exact programme equivalence verified. Prior figures historical only. JoinProp 26 November and Prop Up 19 November independently report rebrand to Eightcap Challenges. Mark legacy for catalogue reconciliation; current Eightcap rules separately identifiable, but existing customer migration terms not verified.",
    "scopeFr": "Ancienne offre SuperFunded ; archives du 25 novembre : accueil, FAQ et PDF V2 redirigent vers Eightcap Challenges. Correspondance contractuelle non démontrée ; données historiques. Changement de marque corroboré les 19 et 26 novembre ; ancienne fiche à rapprocher du successeur, sans supposer la migration des contrats.",
    "assessments": {
      "payout": {
        "points": 0,
        "source": "https://superfunded.com/wp-content/uploads/2026/10/SuperFunded-Rules-and-Conditions-V2-22.10.26.pdf",
        "reason": "Prior V2 audit: first three payouts capped at 5% of account and excess may be removed; 14-day cycle."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://superfunded.com/wp-content/uploads/2026/10/SuperFunded-Rules-and-Conditions-V2-22.10.26.pdf",
        "reason": "Prior V2 audit records 40%/30% profit distribution by size."
      }
    },
    "reviewOutcome": {
      "kind": "legacy",
      "reason": "SuperFunded rebrand to Eightcap Challenges confirmed by partner newsletter reporting on 26 Nov and archive redirect on 25 Nov. Prior contract migration is not established, so this legacy offer is not an active-product rating. New Eightcap rules must not be used for existing SuperFunded accounts.",
      "reasonFr": "Ancienne offre SuperFunded : changement de marque confirmé ; migration des contrats non établie. Ne pas noter cette ancienne offre comme un produit Eightcap actuel.",
      "source": "https://joinprop.com/blog/prop-news/superfunded-becomes-eightcap-challenges/"
    }
  },
  "superfunded-two-phase": {
    "checkedOn": "2026-11-28",
    "scope": "Legacy SuperFunded offer. Archive index (25 November) confirms home, FAQ and old V2 PDF all redirect to Eightcap Challenges Japanese home; actual archived replacement rulebook belongs to Eightcap. No contractual succession or exact programme equivalence verified. Prior figures historical only. JoinProp 26 November and Prop Up 19 November independently report rebrand to Eightcap Challenges. Mark legacy for catalogue reconciliation; current Eightcap rules separately identifiable, but existing customer migration terms not verified.",
    "scopeFr": "Ancienne offre SuperFunded ; archives du 25 novembre : accueil, FAQ et PDF V2 redirigent vers Eightcap Challenges. Correspondance contractuelle non démontrée ; données historiques. Changement de marque corroboré les 19 et 26 novembre ; ancienne fiche à rapprocher du successeur, sans supposer la migration des contrats.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://superfunded.com/wp-content/uploads/2026/10/SuperFunded-Rules-and-Conditions-V2-22.10.26.pdf",
        "reason": "Prior archived audit records 10% static total loss; not freshly verified."
      },
      "payout": {
        "points": 0,
        "source": "https://superfunded.com/wp-content/uploads/2026/10/SuperFunded-Rules-and-Conditions-V2-22.10.26.pdf",
        "reason": "Prior V2 audit: first three payouts capped at 5% of account and excess may be removed; 14-day cycle."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://superfunded.com/wp-content/uploads/2026/10/SuperFunded-Rules-and-Conditions-V2-22.10.26.pdf",
        "reason": "Prior V2 audit records 40%/30% profit distribution by size."
      }
    },
    "reviewOutcome": {
      "kind": "legacy",
      "reason": "SuperFunded rebrand to Eightcap Challenges confirmed by partner newsletter reporting on 26 Nov and archive redirect on 25 Nov. Prior contract migration is not established, so this legacy offer is not an active-product rating. New Eightcap rules must not be used for existing SuperFunded accounts.",
      "reasonFr": "Ancienne offre SuperFunded : changement de marque confirmé ; migration des contrats non établie. Ne pas noter cette ancienne offre comme un produit Eightcap actuel.",
      "source": "https://joinprop.com/blog/prop-news/superfunded-becomes-eightcap-challenges/"
    }
  }
};
evidence["sfx-funded"] = {
  "sfx-2-step": {
    "checkedOn": "2026-11-28",
    "scope": "Current Ascend standard 85% payout route; Ignite not assumed equivalent.",
    "scopeFr": "Ascend actuel, retrait standard 85 % ; Ignite non assimilé.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://sfxfunded.com/help/ascend-challenge",
        "reason": "8% static funded maximum loss."
      },
      "payout": {
        "points": 0.5,
        "source": "https://sfxfunded.com/help/payout-timing-ascend",
        "reason": "14-day cycle, five trading days and minimum 2% profit; separate early route at 40% split."
      },
      "consistency": {
        "points": 0,
        "source": "https://sfxfunded.com/help/ascend-challenge",
        "reason": "25% funded Stability Index."
      },
      "trading": {
        "points": 0.5,
        "source": "https://sfxfunded.com/help/news-trading-ascend",
        "reason": "±2 minutes red news all instruments, including SL/TP, profits deducted; third violation account closure."
      },
      "funded": {
        "points": 0,
        "source": "https://sfxfunded.com/docs/terms-of-service",
        "reason": "Terms reserve payout discretion and risk-based deductions/reduction of share."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 8,
      "source": "https://sfxfunded.com/help/ascend-challenge"
    }
  },
  "sfx-1-step-pro": {
    "checkedOn": "2026-11-28",
    "scope": "Current 1-Step Pro; proportional trailing not represented by fixed-dollar simulator.",
    "scopeFr": "1-Step Pro actuel ; trailing proportionnel non représenté par simulateur à distance fixe.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://sfxfunded.com/help/1-step-pro",
        "reason": "6% of highest recorded account value, proportional trailing, never decreases."
      },
      "payout": {
        "points": 0,
        "source": "https://sfxfunded.com/help/payout-timing-1-step-pro",
        "reason": "Seven qualifying days per payout and 3% minimum profit."
      },
      "consistency": {
        "points": 0,
        "source": "https://sfxfunded.com/help/1-step-pro",
        "reason": "20% funded Stability Index."
      },
      "trading": {
        "points": 0.5,
        "source": "https://sfxfunded.com/help/news-trading-1-step-pro",
        "reason": "Funded news execution and automatic exits restricted ±2 minutes."
      },
      "funded": {
        "points": 0,
        "source": "https://sfxfunded.com/help/1-step-pro",
        "reason": "1% combined floating loss: first breach cuts share to 40%, second permanently closes account."
      }
    }
  },
  "sfx-instant": {
    "checkedOn": "2026-11-28",
    "scope": "Instant Standard purchased from 19 October 2026; default cheapest current model. Pro and Flex are separate selectable rule variants pending catalogue price mapping. Not the older Instant or giveaway cohort.",
    "scopeFr": "Instant Standard depuis le 19 octobre 2026 ; Pro et Flex évalués séparément. Ancienne offre et concours exclus. Tarifs distincts à rattacher.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://intercom.help/sfx-15a6836318fd/en/articles/17653905-instant-standard-how-it-works",
        "reason": "5% of peak account value, proportional trailing, not a fixed-dollar trail."
      },
      "payout": {
        "points": 0,
        "source": "https://intercom.help/sfx-15a6836318fd/en/articles/17653904-when-can-i-get-paid-in-the-instant-standard-program",
        "reason": "Five qualifying days at 0.75% each and 4% profit per cycle; on demand, nominal 85% share."
      },
      "consistency": {
        "points": 0,
        "source": "https://intercom.help/sfx-15a6836318fd/en/articles/17653905-instant-standard-how-it-works",
        "reason": "15% SFX Stability Index for payout."
      },
      "trading": {
        "points": 0.5,
        "source": "https://intercom.help/sfx-15a6836318fd/en/articles/17653912-can-i-trade-during-news-in-the-instant-standard-program",
        "reason": "Restricted red-folder window ±2 minutes, including automatic executions; first violation removes affected profit, second closes account."
      },
      "funded": {
        "points": 0,
        "source": "https://intercom.help/sfx-15a6836318fd/en/articles/17653905-instant-standard-how-it-works",
        "reason": "1% combined floating loss triggers permanent split reductions to 50% and 25%, then account closure on third violation."
      }
    }
  }
};
evidence["tx3-funding"] = {
  "tx3-instant": {
    "checkedOn": "2026-11-28",
    "scope": "Instant Standard only, rules updated 17 November; no paid options.",
    "scopeFr": "Instant Standard uniquement ; règles du 17 novembre, sans option.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://faq.tx3funding.com/trading-rules-for-instant-standard-accounts",
        "reason": "5% fixed-distance balance trail, never moves down."
      },
      "payout": {
        "points": 0,
        "source": "https://faq.tx3funding.com/how-payouts-work-instant-standard",
        "reason": "Seven profitable days at 0.25%, 14-day cycle, 3% permanent buffer and 1% minimum payout."
      },
      "consistency": {
        "points": 0,
        "source": "https://faq.tx3funding.com/trading-rules-for-instant-standard-accounts",
        "reason": "15% best-day ratio delays payout."
      },
      "trading": {
        "points": 0,
        "source": "https://faq.tx3funding.com/trading-rules-for-instant-standard-accounts",
        "reason": "News and weekend trading prohibited; any rule breach terminates account."
      },
      "funded": {
        "points": 0,
        "source": "https://faq.tx3funding.com/trading-rules-for-instant-standard-accounts",
        "reason": "1% combined risk across all active trades; hard breach."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 5,
      "profitSplit": 80,
      "source": "https://faq.tx3funding.com/trading-rules-for-instant-standard-accounts"
    }
  },
  "tx3-flex": {
    "checkedOn": "2026-11-28",
    "scope": "Post-24 August 2026 Flex only, dedicated rules updated 17 November override generic older payout guide; no add-ons.",
    "scopeFr": "Flex depuis le 24 août 2026 ; règlement dédié du 17 novembre prévaut sur ancien guide générique ; sans option.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://faq.tx3funding.com/challenge-rules-objectives-flex-challenge",
        "reason": "5% static funded maximum loss."
      },
      "payout": {
        "points": 0.5,
        "source": "https://faq.tx3funding.com/challenge-rules-objectives-flex-challenge",
        "reason": "Biweekly, five 0.5%-profit days, minimum 2%, cap 5% of initial balance per cycle."
      },
      "consistency": {
        "points": 0,
        "source": "https://faq.tx3funding.com/challenge-rules-objectives-flex-challenge",
        "reason": "20% best day, delays payout."
      },
      "trading": {
        "points": 0.5,
        "source": "https://faq.tx3funding.com/help/tx3-funding/comparing-tx3-funding-forex-challenges",
        "reason": "News only with add-on; weekend holding allowed."
      },
      "funded": {
        "points": 0,
        "source": "https://faq.tx3funding.com/challenge-rules-objectives-flex-challenge",
        "reason": "0.5% combined floating loss hard limit measured live; 2.5% daily funded loss."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 5,
      "profitSplit": 80,
      "source": "https://faq.tx3funding.com/challenge-rules-objectives-flex-challenge"
    }
  }
};
evidence["now-trade-funded"] = {
  "ntf-standard-two-step": {
    "checkedOn": "2026-11-28",
    "scope": "Standard Two-Step, funded phase, Schedule of Assessment Programs dated 16 November 2026, archived 25 November (terms-archive/now-trade-funded/1473efab9f19.txt). Specific programme table prevails over general consistency wording; public old URL exposes a different older schedule. Current checkout availability not established.",
    "scopeFr": "Standard Two-Step, phase financée, règlement du 16 novembre 2026 archivé le 25 novembre ; tableau spécifique retenu malgré la formulation générale. Disponibilité à la commande non confirmée.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://nowtradefunded.com/legal/soa.pdf",
        "reason": "10% static total loss and 5% start-of-day balance daily loss, explicitly stated in funded column."
      },
      "payout": {
        "points": 0,
        "source": "https://nowtradefunded.com/legal/soa.pdf",
        "reason": "Ten funded trading days, first request after 30 days with 50% share and cap 2.5% starting balance, subsequent 14-day cycles with 80% share and 5% cap; notes 6, 8, 10."
      },
      "consistency": {
        "points": 1,
        "source": "https://nowtradefunded.com/legal/soa.pdf",
        "reason": "Specific funded table explicitly says No for profit and volume consistency; general notes 3–4 describe rules where applicable, conflicting if read universally. No universal consistency assertion."
      },
      "trading": {
        "points": 0.5,
        "source": "https://nowtradefunded.com/legal/soa.pdf",
        "reason": "Funded weekend and high-impact news trading prohibited, EA allowed except enumerated prohibited practices in note 13."
      },
      "funded": {
        "points": 0,
        "source": "https://nowtradefunded.com/terms-and-conditions",
        "reason": "Terms clauses 10, 12.3 and 18.2: discretionary funded selection, forfeiture of payments on prohibited-use violation, termination without cause. 30-day inactivity; ordinary KYC excluded."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 10,
      "source": "https://nowtradefunded.com/legal/soa.pdf"
    }
  },
  "ntf-progressive-one-step": {
    "checkedOn": "2026-11-28",
    "scope": "Progressive One-Step, funded phase, Schedule of Assessment Programs dated 16 November 2026, archived 25 November (terms-archive/now-trade-funded/1473efab9f19.txt). Specific programme table prevails over general consistency wording; public old URL exposes a different older schedule. Current checkout availability not established.",
    "scopeFr": "Progressive One-Step, phase financée, règlement du 16 novembre 2026 archivé le 25 novembre ; tableau spécifique retenu malgré la formulation générale. Disponibilité à la commande non confirmée.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://nowtradefunded.com/legal/soa.pdf",
        "reason": "6% trailing from highest equity, never moves down; note 14 confirms intraday high watermark. No daily loss."
      },
      "payout": {
        "points": 0,
        "source": "https://nowtradefunded.com/legal/soa.pdf",
        "reason": "Ten funded trading days, first request after 30 days with 50% share and cap 2.5% starting balance, subsequent 14-day cycles with 80% share and 5% cap; notes 6, 8, 10."
      },
      "consistency": {
        "points": 1,
        "source": "https://nowtradefunded.com/legal/soa.pdf",
        "reason": "Specific funded table explicitly says No for profit and volume consistency; general notes 3–4 describe rules where applicable, conflicting if read universally. No universal consistency assertion."
      },
      "trading": {
        "points": 0.5,
        "source": "https://nowtradefunded.com/legal/soa.pdf",
        "reason": "Funded weekend and high-impact news trading prohibited, EA allowed except enumerated prohibited practices in note 13."
      },
      "funded": {
        "points": 0,
        "source": "https://nowtradefunded.com/terms-and-conditions",
        "reason": "Terms clauses 10, 12.3 and 18.2: discretionary funded selection, forfeiture of payments on prohibited-use violation, termination without cause. 30-day inactivity; ordinary KYC excluded."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 6,
      "source": "https://nowtradefunded.com/legal/soa.pdf"
    }
  },
  "ntf-1k-starter": {
    "checkedOn": "2026-11-28",
    "scope": "1K Starter Three-Step, funded phase, Schedule of Assessment Programs dated 16 November 2026, archived 25 November (terms-archive/now-trade-funded/1473efab9f19.txt). Specific programme table prevails over general consistency wording; public old URL exposes a different older schedule. Current checkout availability not established.",
    "scopeFr": "1K Starter Three-Step, phase financée, règlement du 16 novembre 2026 archivé le 25 novembre ; tableau spécifique retenu malgré la formulation générale. Disponibilité à la commande non confirmée.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://nowtradefunded.com/legal/soa.pdf",
        "reason": "10% static total loss and 5% start-of-day balance daily loss, explicitly stated in funded column."
      },
      "payout": {
        "points": 0,
        "source": "https://nowtradefunded.com/legal/soa.pdf",
        "reason": "Ten funded trading days, first request after 30 days with 50% share and cap 2.5% starting balance, subsequent 14-day cycles with 80% share and 5% cap; notes 6, 8, 10."
      },
      "consistency": {
        "points": 1,
        "source": "https://nowtradefunded.com/legal/soa.pdf",
        "reason": "Specific funded table explicitly says No for profit and volume consistency; general notes 3–4 describe rules where applicable, conflicting if read universally. No universal consistency assertion."
      },
      "trading": {
        "points": 0.5,
        "source": "https://nowtradefunded.com/legal/soa.pdf",
        "reason": "Funded weekend and high-impact news trading prohibited, EA allowed except enumerated prohibited practices in note 13."
      },
      "funded": {
        "points": 0,
        "source": "https://nowtradefunded.com/terms-and-conditions",
        "reason": "Terms clauses 10, 12.3 and 18.2: discretionary funded selection, forfeiture of payments on prohibited-use violation, termination without cause. 30-day inactivity; ordinary KYC excluded."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 10,
      "source": "https://nowtradefunded.com/legal/soa.pdf"
    }
  }
};
evidence["directfundedtrader"] = {
  "directfundedtrader-evaluation": {
    "checkedOn": "2026-11-28",
    "scope": "Evaluation two-phase funded baseline, standard public rules. FAQ has a 100% typo contradicted by its 90K worked example; checkout confirms 10% maximum loss. Payout options vary.",
    "scopeFr": "Evaluation deux phases, phase financée ; exemple de FAQ et commande confirment 10 % de perte maximale malgré une coquille dans le texte.",
    "assessments": {
      "payout": {
        "points": 0.5,
        "source": "https://directfundedtrader.com/",
        "reason": "Checkout lists monthly 100%, biweekly 80% and weekly 70% choices. General FAQ lists first payout after four trading weeks and later 14 days; minimum $100. Exact schedule precedence unresolved."
      },
      "consistency": {
        "points": 1,
        "source": "https://directfundedtrader.com/faq-rules",
        "reason": "FAQ states consistency applies only to Instant Funded plans."
      },
      "trading": {
        "points": 0,
        "source": "https://directfundedtrader.com/faq-rules",
        "reason": "Any trade under 60 seconds immediately disables account. Funded positions must be closed before major news; weekend holding allowed on Evaluation."
      },
      "funded": {
        "points": 0,
        "source": "https://directfundedtrader.com/faq-rules",
        "reason": "Mandatory stop loss within 30 seconds or account disabled; three trades weekly on distinct days. No double penalty for news or holding limits."
      },
      "drawdown": {
        "points": 1,
        "source": "https://directfundedtrader.com/faq-rules",
        "reason": "General FAQ example: $100K account floor $90K, confirmed by the funded checkout 10% maximum loss. Static reference despite erroneous 100% wording."
      }
    }
  },
  "directfundedtrader-turbo": {
    "checkedOn": "2026-11-28",
    "scope": "Turbo pay-after-pass funded route; public checkout shows 8% maximum loss and 3% daily, but general FAQ uses 10% example and does not specify Turbo's funded floor formula. Partial pending model-specific confirmation. General FAQ expressly describes Evaluation and Fast Funding, not Turbo; contract archive does not establish Turbo-specific funded floor. JoinProp's September Turbo review explicitly confirms the 8% funded loss basis was not published. No static/trailing assumption. Checkout confirms funded 8% maximum and 3% daily; displayed dollar example is inconsistent with 8%, so percent not auto-applied.",
    "scopeFr": "Turbo, paiement après réussite ; 8 % de perte globale et 3 % journalière à la commande ; formule exacte financée à confirmer. FAQ générale limitée à Evaluation/Fast Funding ; contrat Turbo non identifié. JoinProp confirme que le type de drawdown financé de 8 % n'est pas publié. Commande : 8 % global et 3 % journalier ; exemple en dollars incohérent, aucun préréglage.",
    "assessments": {
      "payout": {
        "points": 0.5,
        "source": "https://directfundedtrader.com/turbo",
        "reason": "Monthly 100%, biweekly 80%, weekly 70% payout choices; activation fee due after passing. Exact first payout eligibility not specified on Turbo page."
      },
      "consistency": {
        "points": 1,
        "source": "https://directfundedtrader.com/faq-rules",
        "reason": "FAQ states consistency applies only to Instant Funded plans."
      },
      "trading": {
        "points": 0,
        "source": "https://directfundedtrader.com/faq-rules",
        "reason": "Any trade closed in under 60 seconds disables account; funded stop loss and news closing rules."
      },
      "funded": {
        "points": 0,
        "source": "https://directfundedtrader.com/faq-rules",
        "reason": "Funded stop-loss within 30 seconds and three trades per week; violations can disable account."
      }
    },
    "reviewOutcome": {
      "kind": "estimated",
      "reason": "Forex Prop Reviews (27 Nov 2026) describes Turbo's drawdown as static, consistent with the company's general initial-balance calculation. The official Turbo checkout confirms 8% but does not state the reference; the secondary article is indexed but direct retrieval blocked. Estimate assumes static, not verified; no simulator preset.",
      "reasonFr": "Forex Prop Reviews (27 nov.) qualifie le drawdown de statique ; commande officielle 8 % mais référence non précisée. Hypothèse statique pour l'estimation, non confirmée ; sans préréglage.",
      "source": "https://forexpropreviews.com/direct-funded-trader-turbo-challenge-new-promotion/",
      "estimate": 2.5
    }
  },
  "directfundedtrader-fastfunding": {
    "checkedOn": "2026-11-28",
    "scope": "Fast Funding Standard funded phase; public checkout 10% maximum loss versus older 7% description. General FAQ confirms initial-balance static method. No numerical preset because product limits conflict.",
    "scopeFr": "Fast Funding Standard financé ; limite de 10 % à la commande contre 7 % dans une autre description. Méthode statique selon FAQ ; sans préréglage numérique.",
    "assessments": {
      "payout": {
        "points": 0.5,
        "source": "https://directfundedtrader.com/",
        "reason": "Checkout lists monthly 100%, biweekly 80% and weekly 70% choices. General FAQ lists first payout after four trading weeks and later 14 days; minimum $100. Exact schedule precedence unresolved."
      },
      "consistency": {
        "points": 1,
        "source": "https://directfundedtrader.com/faq-rules",
        "reason": "FAQ states consistency applies only to Instant Funded plans."
      },
      "trading": {
        "points": 0,
        "source": "https://directfundedtrader.com/faq-rules",
        "reason": "Any trade under 60 seconds immediately disables account. Funded positions must be closed before major news; no weekend holding on Fast Funding Standard."
      },
      "funded": {
        "points": 0,
        "source": "https://directfundedtrader.com/faq-rules",
        "reason": "Mandatory stop loss within 30 seconds or account disabled; three trades weekly on distinct days. No double penalty for news or holding limits."
      },
      "drawdown": {
        "points": 1,
        "source": "https://directfundedtrader.com/faq-rules",
        "reason": "General rule uses an initial-balance floor throughout the trading journey; current checkout and older model descriptions differ on amount (10% versus 7%), not the stated fixed reference."
      }
    }
  }
};
evidence["tradersedgefx"] = {
  "tradersedgefx-2-step": {
    "checkedOn": "2026-11-28",
    "scope": "2-Step funded-specific FAQ and general rules. Numerical best-day consistency is not explicitly confirmed or excluded. General terms and FAQ conflict on news trading; more restrictive funded FAQ displayed. Rechecked model FAQ, Overall Rules and archived Common Terms (25 Nov); no explicit confirmation of numerical consistency absence. No imputed point. Secondary checks: FundedChecker, PropFirmMap and Prop Firm Arena each mark funded consistency as unknown/not reported, not absent.",
    "scopeFr": "FAQ financée 2-Step et règlement général. Consistency numérique non confirmée ; contradiction sur les annonces, règle financée restrictive retenue. FAQ par modèle et règles communes revérifiées ; absence de ratio non démontrée. Trois comparateurs indiquent que la consistency n'est pas renseignée ; ce n'est pas une confirmation d'absence.",
    "assessments": {
      "payout": {
        "points": 0.5,
        "source": "https://tradersedgefx.com/2-Step-Simulated-TEFX-FAQs/",
        "reason": "5 trading days, 15-day cycle, 70% share. General rules cap each request at 6% initial balance until trade-copy approval, not guaranteed after three months."
      },
      "trading": {
        "points": 0.5,
        "source": "https://tradersedgefx.com/Overall-Rules-and-Conditions/",
        "reason": "Minimum 60-second holding; news and NYSE opening windows restrict execution. HFT bots forbidden even for HFT-labelled evaluation. Weekend holding permitted. Terms say news permitted, contrary to account-specific rules."
      },
      "funded": {
        "points": 0,
        "source": "https://tradersedgefx.com/terms-of-services/",
        "reason": "Broad discretion to block participants; general rules impose payout denial and profit removal for short trades, repeated violation closes account; inactivity breach absent advance support request."
      },
      "drawdown": {
        "points": 1,
        "source": "https://tradersedgefx.com/2-Step-Simulated-TEFX-FAQs/",
        "reason": "Funded-specific FAQ expresses total loss as 12% of initial balance; general guidelines define the overall floor relative to initial capital, not a trailing peak."
      }
    },
    "reviewOutcome": {
      "kind": "estimated",
      "reason": "No funded numerical consistency disclosed in the account-specific FAQ, general rules or independent comparators FundedChecker and PropFirmMap; midpoint .5 assigned to the unknown axis for editorial estimate only. No statement that the rule is absent.",
      "reasonFr": "Ratio de consistency non publié ; estimation avec 0,5/1 sur le seul critère inconnu, sans affirmer l'absence de règle.",
      "source": "https://fundedchecker.com/reviews/tradersedgefx/",
      "estimate": 2.5
    }
  },
  "tradersedgefx-1-step": {
    "checkedOn": "2026-11-28",
    "scope": "1-Step funded-specific FAQ and general rules. Numerical best-day consistency is not explicitly confirmed or excluded. General terms and FAQ conflict on news trading; more restrictive funded FAQ displayed. Rechecked model FAQ, Overall Rules and archived Common Terms (25 Nov); no explicit confirmation of numerical consistency absence. No imputed point. Secondary checks: FundedChecker, PropFirmMap and Prop Firm Arena each mark funded consistency as unknown/not reported, not absent.",
    "scopeFr": "FAQ financée 1-Step et règlement général. Consistency numérique non confirmée ; contradiction sur les annonces, règle financée restrictive retenue. FAQ par modèle et règles communes revérifiées ; absence de ratio non démontrée. Trois comparateurs indiquent que la consistency n'est pas renseignée ; ce n'est pas une confirmation d'absence.",
    "assessments": {
      "payout": {
        "points": 0.5,
        "source": "https://tradersedgefx.com/1-step-simulated-tefx-faqs/",
        "reason": "5 trading days, 15-day cycle, 70% share. General rules cap each request at 6% initial balance until trade-copy approval, not guaranteed after three months."
      },
      "trading": {
        "points": 0.5,
        "source": "https://tradersedgefx.com/Overall-Rules-and-Conditions/",
        "reason": "Minimum 60-second holding; news and NYSE opening windows restrict execution. HFT bots forbidden even for HFT-labelled evaluation. Weekend holding permitted. Terms say news permitted, contrary to account-specific rules."
      },
      "funded": {
        "points": 0,
        "source": "https://tradersedgefx.com/terms-of-services/",
        "reason": "Broad discretion to block participants; general rules impose payout denial and profit removal for short trades, repeated violation closes account; inactivity breach absent advance support request."
      },
      "drawdown": {
        "points": 1,
        "source": "https://tradersedgefx.com/1-step-simulated-tefx-faqs/",
        "reason": "Funded-specific FAQ expresses total loss as 12% of initial balance; general guidelines define the overall floor relative to initial capital, not a trailing peak."
      }
    },
    "reviewOutcome": {
      "kind": "estimated",
      "reason": "No funded numerical consistency disclosed in the account-specific FAQ, general rules or independent comparators FundedChecker and PropFirmMap; midpoint .5 assigned to the unknown axis for editorial estimate only. No statement that the rule is absent.",
      "reasonFr": "Ratio de consistency non publié ; estimation avec 0,5/1 sur le seul critère inconnu, sans affirmer l'absence de règle.",
      "source": "https://fundedchecker.com/reviews/tradersedgefx/",
      "estimate": 2.5
    }
  },
  "tradersedgefx-hft": {
    "checkedOn": "2026-11-28",
    "scope": "HFT funded-specific FAQ and general rules. Numerical best-day consistency is not explicitly confirmed or excluded. General terms and FAQ conflict on news trading; more restrictive funded FAQ displayed. Rechecked model FAQ, Overall Rules and archived Common Terms (25 Nov); no explicit confirmation of numerical consistency absence. No imputed point. Secondary checks: FundedChecker, PropFirmMap and Prop Firm Arena each mark funded consistency as unknown/not reported, not absent.",
    "scopeFr": "FAQ financée HFT et règlement général. Consistency numérique non confirmée ; contradiction sur les annonces, règle financée restrictive retenue. FAQ par modèle et règles communes revérifiées ; absence de ratio non démontrée. Trois comparateurs indiquent que la consistency n'est pas renseignée ; ce n'est pas une confirmation d'absence.",
    "assessments": {
      "payout": {
        "points": 0,
        "source": "https://tradersedgefx.com/HFT-Simulated-TEFX-FAQs/",
        "reason": "10 trading days, 30-day cycle, 50% share. General rules cap each request at 6% initial balance until trade-copy approval, not guaranteed after three months."
      },
      "trading": {
        "points": 0,
        "source": "https://tradersedgefx.com/Overall-Rules-and-Conditions/",
        "reason": "Minimum 60-second holding; news and NYSE opening windows restrict execution. HFT bots forbidden even for HFT-labelled evaluation. Weekend holding prohibited. Terms say news permitted, contrary to account-specific rules."
      },
      "funded": {
        "points": 0,
        "source": "https://tradersedgefx.com/terms-of-services/",
        "reason": "Broad discretion to block participants; general rules impose payout denial and profit removal for short trades, repeated violation closes account; inactivity breach absent advance support request."
      },
      "drawdown": {
        "points": 1,
        "source": "https://tradersedgefx.com/HFT-Simulated-TEFX-FAQs/",
        "reason": "Funded-specific FAQ expresses total loss as 10% of initial balance; general guidelines define the overall floor relative to initial capital, not a trailing peak."
      }
    },
    "reviewOutcome": {
      "kind": "estimated",
      "reason": "No funded numerical consistency disclosed in the account-specific FAQ, general rules or independent comparators FundedChecker and PropFirmMap; midpoint .5 assigned to the unknown axis for editorial estimate only. No statement that the rule is absent.",
      "reasonFr": "Ratio de consistency non publié ; estimation avec 0,5/1 sur le seul critère inconnu, sans affirmer l'absence de règle.",
      "source": "https://fundedchecker.com/reviews/tradersedgefx/",
      "estimate": 1.5
    }
  }
};
evidence["monevis"] = {
  "monevis-instant": {
    "checkedOn": "2026-11-28",
    "scope": "Current Instant sales rules, 30-day target deadline despite unlimited-time marketing.",
    "scopeFr": "Instant actuel ; cible sous 30 jours malgré marketing sans limite.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://monevis.com/instant-funding",
        "reason": "8% static total loss."
      },
      "payout": {
        "points": 0,
        "source": "https://monevis.com/instant-funding",
        "reason": "6% profit target; biweekly payout, 50% share."
      },
      "consistency": {
        "points": 1,
        "source": "https://monevis.com/instant-funding",
        "reason": "Explicit no consistency rule."
      },
      "trading": {
        "points": 0.5,
        "source": "https://monevis.com/instant-funding",
        "reason": "No overnight/weekend holding; ±5-minute major news restriction may deduct profits."
      },
      "funded": {
        "points": 0.5,
        "source": "https://monevis.com/instant-funding",
        "reason": "30-day deadline to meet target; fee-based reactivation if profitable but below 6%."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 8,
      "profitSplit": 50,
      "source": "https://monevis.com/instant-funding"
    }
  }
};
evidence["titan-capital-markets"] = {
  "titan-instant": {
    "checkedOn": "2026-11-28",
    "scope": "Instant Pro documentary rating; indexed official rules corroborated by PropFirmTier and PickMyFirm. Direct support previously returned 503; existing purchase block remains. Overnight/weekend permission not stated; news unrestricted per model-specific rule, EAs subject to approval.",
    "scopeFr": "Instant Pro, note documentaire corroborée par deux comparateurs ; achat bloqué. Overnight/week-end non précisés, annonces autorisées selon règle spécifique ; robots soumis à accord.",
    "assessments": {
      "payout": {
        "points": 0,
        "source": "https://support.tgmarkets.com/articles/instant-pro-rules/",
        "reason": "Cached article: four profitable days, 2% minimum withdrawal; general policy biweekly assigned day only, 70% starting share."
      },
      "drawdown": {
        "points": 0,
        "source": "https://support.tgmarkets.com/articles/instant-pro-rules/",
        "reason": "Cached Instant Pro article states 6% trailing HWM maximum loss, 3% daily trailing."
      },
      "consistency": {
        "points": 0,
        "source": "https://support.tgmarkets.com/articles/instant-pro-rules/",
        "reason": "Cached article states 20% best-day maximum."
      },
      "funded": {
        "points": 0,
        "source": "https://support.tgmarkets.com/articles/instant-pro-rules/",
        "reason": "Cached article: 2% floating loss hard breach, maximum 3 positions per instrument, 2% exposure, mandatory stop loss within 60 seconds."
      },
      "trading": {
        "points": 0.5,
        "source": "https://support.tgmarkets.com/articles/expert-advisors-eas-trade-copiers-policy",
        "reason": "Model-specific article allows news; general EA/copier rules require prior approval, independently corroborated. No claim about weekend holding."
      }
    }
  },
  "titan-1step": {
    "checkedOn": "2026-11-28",
    "scope": "Published 1-Step rule article and fee policy retrieved 28 Nov; several support URLs return 503, archive also shows suspended service. Checkout blocked. Funded concentration and trading freedoms not explicitly verified. PropFirmTier and PickMyFirm independently corroborate drawdown and minimum days; their published consistency detail only specifies Instant Pro and does not explicitly exclude the rule on other plans.",
    "scopeFr": "Règlement 1-Step retrouvé ; certaines pages du support renvoient 503, achat bloqué. Consistency et libertés financées à confirmer. Deux comparateurs corroborent le drawdown ; consistency non exclue explicitement pour ces offres.",
    "assessments": {
      "payout": {
        "points": 0.5,
        "source": "https://support.tgmarkets.com/articles/performance-fee-policy/",
        "reason": "Biweekly on assigned request day only, no soft breaches; funded minimum 5 trading days in model article, starting split 90%."
      },
      "drawdown": {
        "points": 0,
        "source": "https://support.tgmarkets.com/articles/1-step-evaluation-rules/",
        "reason": "6% trailing from highest equity or balance over entire history."
      },
      "funded": {
        "points": 0,
        "source": "https://support.tgmarkets.com/articles/1-step-evaluation-rules/",
        "reason": "Excessive margin subject to Risk Team assessment and hard breach on evaluation and simulated funded accounts; for 1/2-Step stop loss mandatory within 60 seconds."
      },
      "trading": {
        "points": 0.5,
        "source": "https://propfirmtier.com/en/firms/titan-capital-markets",
        "reason": "Funded news execution/modification restricted ±3 minutes; EAs and trade copiers need approval. Weekend holding unreported."
      }
    },
    "reviewOutcome": {
      "kind": "estimated",
      "reason": "Official model pages and PickMyFirm describe the other axes; 20% consistency is specifically reported for Instant Pro, not these plans. Unknown funded consistency gets midpoint .5 for estimate only. Purchase remains blocked.",
      "reasonFr": "Le ratio de 20 % est documenté pour Instant Pro, pas ces offres ; consistency inconnue notée 0,5/1 uniquement pour l'estimation. Achat toujours bloqué.",
      "source": "https://pickmyfirm.com/firms/titan-capital-markets/rules",
      "estimate": 1.5
    }
  },
  "titan-2step": {
    "checkedOn": "2026-11-28",
    "scope": "Published 2-Step rule article and fee policy retrieved 28 Nov; several support URLs return 503, archive also shows suspended service. Checkout blocked. Funded concentration and trading freedoms not explicitly verified. PropFirmTier and PickMyFirm independently corroborate drawdown and minimum days; their published consistency detail only specifies Instant Pro and does not explicitly exclude the rule on other plans.",
    "scopeFr": "Règlement 2-Step retrouvé ; certaines pages du support renvoient 503, achat bloqué. Consistency et libertés financées à confirmer. Deux comparateurs corroborent le drawdown ; consistency non exclue explicitement pour ces offres.",
    "assessments": {
      "payout": {
        "points": 0.5,
        "source": "https://support.tgmarkets.com/articles/performance-fee-policy/",
        "reason": "Biweekly on assigned request day only, no soft breaches; funded minimum 3 trading days in model article, starting split 90%."
      },
      "drawdown": {
        "points": 1,
        "source": "https://support.tgmarkets.com/articles/2-step-evaluation-rules/",
        "reason": "10% maximum loss from initial balance; 4% daily loss."
      },
      "funded": {
        "points": 0,
        "source": "https://support.tgmarkets.com/articles/2-step-evaluation-rules/",
        "reason": "Excessive margin subject to Risk Team assessment and hard breach on evaluation and simulated funded accounts; for 1/2-Step stop loss mandatory within 60 seconds."
      },
      "trading": {
        "points": 0.5,
        "source": "https://propfirmtier.com/en/firms/titan-capital-markets",
        "reason": "Funded news execution/modification restricted ±3 minutes; EAs and trade copiers need approval. Weekend holding unreported."
      }
    },
    "reviewOutcome": {
      "kind": "estimated",
      "reason": "Official model pages and PickMyFirm describe the other axes; 20% consistency is specifically reported for Instant Pro, not these plans. Unknown funded consistency gets midpoint .5 for estimate only. Purchase remains blocked.",
      "reasonFr": "Le ratio de 20 % est documenté pour Instant Pro, pas ces offres ; consistency inconnue notée 0,5/1 uniquement pour l'estimation. Achat toujours bloqué.",
      "source": "https://pickmyfirm.com/firms/titan-capital-markets/rules",
      "estimate": 2.5
    }
  },
  "titan-3step": {
    "checkedOn": "2026-11-28",
    "scope": "Published 3-Step rule article and fee policy retrieved 28 Nov; several support URLs return 503, archive also shows suspended service. Checkout blocked. Funded concentration and trading freedoms not explicitly verified. PropFirmTier and PickMyFirm independently corroborate drawdown and minimum days; their published consistency detail only specifies Instant Pro and does not explicitly exclude the rule on other plans.",
    "scopeFr": "Règlement 3-Step retrouvé ; certaines pages du support renvoient 503, achat bloqué. Consistency et libertés financées à confirmer. Deux comparateurs corroborent le drawdown ; consistency non exclue explicitement pour ces offres.",
    "assessments": {
      "payout": {
        "points": 0.5,
        "source": "https://support.tgmarkets.com/articles/performance-fee-policy/",
        "reason": "Biweekly on assigned request day only, no soft breaches; funded minimum 3 trading days in model article, starting split 95%."
      },
      "drawdown": {
        "points": 1,
        "source": "https://support.tgmarkets.com/articles/3-step-evaluation-rules/",
        "reason": "10% maximum loss from initial balance; 4% daily loss."
      },
      "funded": {
        "points": 0,
        "source": "https://support.tgmarkets.com/articles/3-step-evaluation-rules/",
        "reason": "Excessive margin subject to Risk Team assessment and hard breach on evaluation and simulated funded accounts; for 1/2-Step stop loss mandatory within 60 seconds."
      },
      "trading": {
        "points": 0.5,
        "source": "https://propfirmtier.com/en/firms/titan-capital-markets",
        "reason": "Funded news execution/modification restricted ±3 minutes; EAs and trade copiers need approval. Weekend holding unreported."
      }
    },
    "reviewOutcome": {
      "kind": "estimated",
      "reason": "Official model pages and PickMyFirm describe the other axes; 20% consistency is specifically reported for Instant Pro, not these plans. Unknown funded consistency gets midpoint .5 for estimate only. Purchase remains blocked.",
      "reasonFr": "Le ratio de 20 % est documenté pour Instant Pro, pas ces offres ; consistency inconnue notée 0,5/1 uniquement pour l'estimation. Achat toujours bloqué.",
      "source": "https://pickmyfirm.com/firms/titan-capital-markets/rules",
      "estimate": 2.5
    }
  }
};
evidence["exfunded"] = {
  "exfunded-1step": {
    "checkedOn": "2026-11-28",
    "scope": "1-Step published CFD rules on alternate branded domain, USD accounts. Existing purchase block unchanged; not confirmation of current sale or payout reliability. Product page 14-calendar-day cadence vs FAQ 10 traded days; size-dependent caps, no fixed split or loss amount preset.",
    "scopeFr": "1-Step CFD, règles publiées sur domaine alternatif, comptes USD ; achat toujours bloqué. 14 jours calendaires contre 10 jours tradés selon FAQ ; plafonds selon taille.",
    "assessments": {
      "consistency": {
        "points": 0,
        "source": "https://exfunded.sandai-investment.com/faq/",
        "reason": "Eligible lot sizes between half and twice average; profits from trades outside range ineligible."
      },
      "trading": {
        "points": 0.5,
        "source": "https://exfunded.sandai-investment.com/faq/",
        "reason": "News and weekend holding permitted, but five-minute minimum holding and funded five-minute spacing between new positions, no EAs."
      },
      "funded": {
        "points": 0,
        "source": "https://exfunded.sandai-investment.com/faq/",
        "reason": "First funded daily lot-volume violation returns account to phase 1 and forfeits profits; second terminates. Account review and discretionary profit removal also stated."
      },
      "drawdown": {
        "points": 1,
        "source": "https://exfunded.sandai-investment.com/faq/",
        "reason": "FAQ breach calculation explicitly refers to active equity below initial balance, rather than a rising peak. Programme pages give evaluation amounts; funded percentage not assumed."
      },
      "payout": {
        "points": 0.5,
        "source": "https://exfunded.sandai-investment.com/exfunded-step-1-challenge/",
        "reason": "Product page 14 calendar days; FAQ requires 10 traded days, qualifying profitable days, $50/$100 minimum and caps through $25K; $50K+ uncapped. Initial 70% share scales with withdrawals."
      }
    }
  },
  "exfunded-2step": {
    "checkedOn": "2026-11-28",
    "scope": "2-Step published CFD rules on alternate branded domain, USD accounts. Existing purchase block unchanged; not confirmation of current sale or payout reliability. Product page 14-calendar-day cadence vs FAQ 10 traded days; size-dependent caps, no fixed split or loss amount preset.",
    "scopeFr": "2-Step CFD, règles publiées sur domaine alternatif, comptes USD ; achat toujours bloqué. 14 jours calendaires contre 10 jours tradés selon FAQ ; plafonds selon taille.",
    "assessments": {
      "consistency": {
        "points": 0,
        "source": "https://exfunded.sandai-investment.com/faq/",
        "reason": "Eligible lot sizes between half and twice average; profits from trades outside range ineligible."
      },
      "trading": {
        "points": 0.5,
        "source": "https://exfunded.sandai-investment.com/faq/",
        "reason": "News and weekend holding permitted, but five-minute minimum holding and funded five-minute spacing between new positions, no EAs."
      },
      "funded": {
        "points": 0,
        "source": "https://exfunded.sandai-investment.com/faq/",
        "reason": "First funded daily lot-volume violation returns account to phase 1 and forfeits profits; second terminates. Account review and discretionary profit removal also stated."
      },
      "drawdown": {
        "points": 1,
        "source": "https://exfunded.sandai-investment.com/faq/",
        "reason": "FAQ breach calculation explicitly refers to active equity below initial balance, rather than a rising peak. Programme pages give evaluation amounts; funded percentage not assumed."
      },
      "payout": {
        "points": 0.5,
        "source": "https://exfunded.sandai-investment.com/exfunded-2-step-challenge/",
        "reason": "Product page 14 calendar days; FAQ requires 10 traded days, qualifying profitable days, $50/$100 minimum and caps through $25K; $50K+ uncapped. Initial 70% share scales with withdrawals."
      }
    }
  }
};
// RZR / For Traders / Lark / OFP / ThinkCapital / Equity Edge / Atlas / FundedBull batch, 2026-11-28.
evidence["hantec-trader"] = {
  "rzr-instant24": {
    "checkedOn": "2026-11-28",
    "scope": "RZR (formerly Hantec Trader) current Instant24, no add-ons; short-duration account.",
    "scopeFr": "RZR (ancien Hantec Trader) Instant24 actuel, sans option ; compte de courte durée.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://help.rzrfunded.com/en/support/solutions/articles/158000470348-instant24",
        "reason": "3% starting-balance distance trailing closed balance."
      },
      "payout": {
        "points": 0,
        "source": "https://help.rzrfunded.com/en/support/solutions/articles/158000470348-instant24",
        "reason": "3% minimum profit and full withdrawal only; eligibility after 24 hours within limited-time product."
      },
      "consistency": {
        "points": 0,
        "source": "https://help.rzrfunded.com/en/support/solutions/articles/158000470348-instant24",
        "reason": "15% best individual trade divided by accumulated profits; partial exits and linked trade ideas aggregated."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.rzrfunded.com/en/support/solutions/articles/158000470348-instant24",
        "reason": "News allowed, no EAs, Friday positions closed."
      },
      "funded": {
        "points": 0,
        "source": "https://help.rzrfunded.com/en/support/solutions/articles/158000470348-instant24",
        "reason": "1% combined floating-loss hard breach and prohibited trade-idea splitting; no scaling."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 3,
      "profitSplit": 80,
      "source": "https://help.rzrfunded.com/en/support/solutions/articles/158000470348-instant24"
    }
  },
  "rzr-instant-lite": {
    "checkedOn": "2026-11-28",
    "scope": "Current RZR Instant Lite no add-ons.",
    "scopeFr": "RZR Instant Lite actuel sans option.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://help.rzrfunded.com/en/support/solutions/articles/158000470347-instant-lite",
        "reason": "5% closed-balance trailing, locks at initial balance at +5% or first payout."
      },
      "payout": {
        "points": 0,
        "source": "https://help.rzrfunded.com/en/support/solutions/articles/158000470347-instant-lite",
        "reason": "First payout after 14 days; five days at least 0.5%, permanent 3% profit buffer, $20 minimum."
      },
      "consistency": {
        "points": 0,
        "source": "https://help.rzrfunded.com/en/support/solutions/articles/158000470347-instant-lite",
        "reason": "20% best day, buffer counts in denominator."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.rzrfunded.com/en/support/solutions/articles/158000470347-instant-lite",
        "reason": "No opening or closing within three minutes either side of red-folder news, no EAs or weekend holding."
      },
      "funded": {
        "points": 0,
        "source": "https://help.rzrfunded.com/en/support/solutions/articles/158000470347-instant-lite",
        "reason": "1% combined floating loss hard breach."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 5,
      "profitSplit": 80,
      "source": "https://help.rzrfunded.com/en/support/solutions/articles/158000470347-instant-lite"
    }
  },
  "rzr-instant-funding": {
    "checkedOn": "2026-11-28",
    "scope": "Current RZR Instant standard, no add-ons; consistency absence must be explicitly confirmed in latest rules.",
    "scopeFr": "RZR Instant standard actuel sans option ; absence de consistency à confirmer explicitement.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://help.rzrfunded.com/en/support/solutions/articles/158000470345-instant-funding",
        "reason": "6% trailing maximum loss, locks at starting balance after 6% profit."
      },
      "payout": {
        "points": 0.5,
        "source": "https://help.rzrfunded.com/en/support/solutions/articles/158000470345-instant-funding",
        "reason": "14-day default payout; lock on withdrawal can require retained buffer."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.rzrfunded.com/en/support/solutions/articles/158000470345-instant-funding",
        "reason": "News and weekend holding restricted without add-on."
      },
      "funded": {
        "points": 0,
        "source": "https://help.rzrfunded.com/en/support/solutions/articles/158000470345-instant-funding",
        "reason": "3% combined open floating-loss hard breach."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 6,
      "profitSplit": 80,
      "source": "https://help.rzrfunded.com/en/support/solutions/articles/158000470345-instant-funding"
    }
  }
};
evidence["for-traders"] = {
  "fortraders-1-step": {
    "checkedOn": "2026-11-28",
    "scope": "Current Forex Fast trailing, purchases from 8 June 2026; separate Fast Static choice.",
    "scopeFr": "Forex Fast trailing depuis le 8 juin 2026 ; option Fast Static distincte.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://help.fortraders.com/en/articles/15360683-fast-account-forex",
        "reason": "6% trailing max loss, including Master stage."
      },
      "payout": {
        "points": 0.5,
        "source": "https://help.fortraders.com/en/articles/15360683-fast-account-forex",
        "reason": "14-day cycle, three 0.5% profitable days, $100 minimum and $15K cap."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.fortraders.com/en/articles/15360683-fast-account-forex",
        "reason": "No funded consistency score."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.fortraders.com/en/articles/15360683-fast-account-forex",
        "reason": "No new trades within five minutes either side of major news; overnight and weekend holding allowed."
      },
      "funded": {
        "points": 0,
        "source": "https://help.fortraders.com/en/articles/14652456-how-does-drawdown-protection-work",
        "reason": "At 2% combined floating loss all positions closed; first trigger permanently cuts split to 50%, second closes account."
      }
    },
    "preset": {
      "source": "https://help.fortraders.com/en/articles/15360683-fast-account-forex"
    }
  }
};
evidence["lark-funding"] = {
  "lark-1-step-career": {
    "checkedOn": "2026-11-28",
    "scope": "Career Master performance reward; separate monthly data fee is not ordinary payout; funded drawdown applicability not explicit in evaluation article.",
    "scopeFr": "Performance du compte Master Career ; prime mensuelle de données distincte ; seuil financé non explicite dans article d'évaluation.",
    "assessments": {
      "payout": {
        "points": 0.5,
        "source": "https://helpdesk.larkfunding.com/en/articles/12853883-1-step-career-evaluation-details",
        "reason": "14-day ordinary rewards, 80% share, $40 fee; separate conditional monthly data reward."
      }
    }
  },
  "lark-3-step": {
    "checkedOn": "2026-11-28",
    "scope": "Partial; official programme describes evaluation loss limit but not explicitly the funded loss rules.",
    "scopeFr": "Partiel : article décrit le seuil d'évaluation, pas explicitement celui financé.",
    "assessments": {
      "payout": {
        "points": 0.5,
        "source": "https://helpdesk.larkfunding.com/en/articles/8251071-3-step-evaluation-details",
        "reason": "14-day Master rewards, $40 fee and 80% standard split."
      }
    }
  }
};
evidence["ofp-funding"] = {
  "ofp-instant-95": {
    "checkedOn": "2026-11-28",
    "scope": "Legacy generic 95% catalogue ID not mapped to current Lite, Classic or Plus; do not infer a current purchase rating.",
    "scopeFr": "Ancien identifiant générique 95 %, non associé aux modèles actuels Lite, Classic ou Plus.",
    "assessments": {
      "trading": {
        "points": 0.5,
        "source": "https://help.ofpfunding.com/what-are-the-trading-rules-every-ofp-trader-must-follow/",
        "reason": "General prohibited strategies include gap exploitation, HFT and abnormal lot sizes."
      }
    }
  },
  "ofp-challenge-8-5": {
    "checkedOn": "2026-11-28",
    "scope": "Old 8%/5% targets conflict with current 8%/4% marketing; exact funded contract pending.",
    "scopeFr": "Anciennes cibles 8 %/5 % divergentes des 8 %/4 % actuelles ; contrat financé à confirmer.",
    "assessments": {
      "trading": {
        "points": 0.5,
        "source": "https://help.ofpfunding.com/what-are-the-trading-rules-every-ofp-trader-must-follow/",
        "reason": "General strategy restrictions documented; programme-specific application pending."
      }
    }
  }
};
evidence["thinkcapital"] = {
  "thinkcapital-bolt": {
    "checkedOn": "2026-11-28",
    "scope": "Standard current Bolt route, no paid options; first reward target only.",
    "scopeFr": "Bolt actuel standard, sans option ; cible au premier retrait uniquement.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://www.thinkcapital.com/terms-of-services/",
        "reason": "6% trailing from highest equity, locks at initial capital."
      },
      "payout": {
        "points": 0.5,
        "source": "https://www.thinkcapital.com/tc-faqs/funded-accounts/how-often-are-payouts-offered-for-simulated-funded-accounts/",
        "reason": "First payout requires 6% profit; 14-day cycle, $100 minimum, no minimum profitable days."
      },
      "consistency": {
        "points": 0,
        "source": "https://www.thinkcapital.com/tc-faqs/funded-accounts/how-often-are-payouts-offered-for-simulated-funded-accounts/",
        "reason": "20% best day against net closed cycle profit."
      },
      "trading": {
        "points": 0,
        "source": "https://www.thinkcapital.com/tc-faqs/penalties-faq-section/penalties-faq-section/",
        "reason": "No opening, closing or automatic execution within five minutes either side of red-folder news; holding over weekend without option causes hard breach."
      },
      "funded": {
        "points": 0.5,
        "source": "https://www.thinkcapital.com/terms-of-services/",
        "reason": "30-day inactivity hard breach, risk-team permission for automation, forbidden-trading review."
      }
    },
    "preset": {
      "consistency": 20,
      "consistencyBasis": "net",
      "profitSplit": 80,
      "source": "https://www.thinkcapital.com/thinkcapital-instant-funding-update/"
    }
  },
  "thinkcapital-bolt-flex": {
    "checkedOn": "2026-11-28",
    "scope": "Standard current Bolt route, no paid options; first reward target only.",
    "scopeFr": "Bolt actuel standard, sans option ; cible au premier retrait uniquement.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://www.thinkcapital.com/tc-faqs/introduction-to-thinkcapital-programs/bolt-flex-plan/",
        "reason": "7% trailing from highest closed balance, locks at initial capital."
      },
      "payout": {
        "points": 0.5,
        "source": "https://www.thinkcapital.com/tc-faqs/funded-accounts/how-often-are-payouts-offered-for-simulated-funded-accounts/",
        "reason": "First payout requires 7% profit; 14-day cycle, $100 minimum, no minimum profitable days."
      },
      "consistency": {
        "points": 0,
        "source": "https://www.thinkcapital.com/tc-faqs/funded-accounts/how-often-are-payouts-offered-for-simulated-funded-accounts/",
        "reason": "25% best day against net closed cycle profit."
      },
      "trading": {
        "points": 0,
        "source": "https://www.thinkcapital.com/tc-faqs/penalties-faq-section/penalties-faq-section/",
        "reason": "No opening, closing or automatic execution within five minutes either side of red-folder news; holding over weekend without option causes hard breach."
      },
      "funded": {
        "points": 0.5,
        "source": "https://www.thinkcapital.com/terms-of-services/",
        "reason": "30-day inactivity hard breach, risk-team permission for automation, forbidden-trading review."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 7,
      "consistency": 25,
      "consistencyBasis": "net",
      "profitSplit": 80,
      "source": "https://www.thinkcapital.com/tc-faqs/introduction-to-thinkcapital-programs/bolt-flex-plan/"
    }
  }
};
evidence["equity-edge"] = {
  "equity-edge-1-step-legacy": {
    "checkedOn": "2026-11-28",
    "scope": "Current 1-Step baseline; funded-trader FAQ describes trailing floor; exact consistency and additional risk gates not fully verified.",
    "scopeFr": "1-Step actuel ; FAQ traders financés décrit le seuil suiveur ; consistency et autres restrictions à vérifier.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://equityedge.io/funded-traders/maximum-daily-loss-and-total-loss-for-1-step-accounts",
        "reason": "6% proportional trail from highest balance or equity, no fixed-dollar preset."
      },
      "payout": {
        "points": 0.5,
        "source": "https://equityedge.io/funded-traders/payout-process",
        "reason": "14-day standard funded reward eligibility and manual review."
      },
      "trading": {
        "points": 0.5,
        "source": "https://equityedge.io/evaluation-questions/2-minute-average-trade-duration-rule",
        "reason": "Two-minute average trade-duration rule applies in funded phase; news profit review."
      }
    }
  },
  "equity-edge-1-step-swift": {
    "checkedOn": "2026-11-28",
    "scope": "Current 1-Step baseline; funded-trader FAQ describes trailing floor; exact consistency and additional risk gates not fully verified.",
    "scopeFr": "1-Step actuel ; FAQ traders financés décrit le seuil suiveur ; consistency et autres restrictions à vérifier.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://equityedge.io/funded-traders/maximum-daily-loss-and-total-loss-for-1-step-accounts",
        "reason": "5% proportional trail from highest balance or equity, no fixed-dollar preset."
      },
      "payout": {
        "points": 0.5,
        "source": "https://equityedge.io/funded-traders/payout-process",
        "reason": "14-day standard funded reward eligibility and manual review."
      },
      "trading": {
        "points": 0.5,
        "source": "https://equityedge.io/evaluation-questions/2-minute-average-trade-duration-rule",
        "reason": "Two-minute average trade-duration rule applies in funded phase; news profit review."
      }
    }
  },
  "equity-edge-instant": {
    "checkedOn": "2026-11-28",
    "scope": "Current Instant; exact consistency and other payout conditions require additional reading.",
    "scopeFr": "Instant actuel ; consistency exacte et autres conditions de retrait à vérifier.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://equityedge.io/instant-accounts/maximum-daily-loss-and-total-loss-for-instant-accounts",
        "reason": "5% proportional trail from balance/equity high, resets to initial balance at payout; resumes trailing at +5%."
      },
      "payout": {
        "points": 0.5,
        "source": "https://equityedge.io/instant-accounts/performance-consistency-rules",
        "reason": "First 3% of profits retained as safety buffer."
      },
      "trading": {
        "points": 0.5,
        "source": "https://equityedge.io/evaluation-questions/2-minute-average-trade-duration-rule",
        "reason": "Two-minute average duration applies to Instant; news restrictions also apply."
      }
    }
  }
};
evidence["atlas-funded"] = {
  "atlas-1-step": {
    "checkedOn": "2026-11-28",
    "scope": "Current risk-engine plan settings dated 26 October 2026; no paid add-ons; older general terms differ.",
    "scopeFr": "Paramètres du moteur de risque du 26 octobre 2026 ; sans option ; ancien contrat divergent.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://help.atlasfunded.com/one-step",
        "reason": "7% static max loss."
      },
      "payout": {
        "points": 0.5,
        "source": "https://help.atlasfunded.com/one-step",
        "reason": "Five days each at least 0.5% per cycle, first and subsequent 14-day payouts, $100 minimum, 90% standard split."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.atlasfunded.com/one-step",
        "reason": "No consistency rule."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.atlasfunded.com/one-step",
        "reason": "Profit removed from trades inside five-minute news window or shorter than three minutes."
      },
      "funded": {
        "points": 0,
        "source": "https://help.atlasfunded.com/one-step",
        "reason": "Atlas Protector 2% floating loss closes all positions, reduces split to 50% first time, second hard breach; 80% margin usage triggers closure of trades and profit deduction."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 7,
      "source": "https://help.atlasfunded.com/one-step"
    }
  },
  "atlas-2-step": {
    "checkedOn": "2026-11-28",
    "scope": "Current risk-engine plan settings dated 26 October 2026; no paid add-ons; older general terms differ.",
    "scopeFr": "Paramètres du moteur de risque du 26 octobre 2026 ; sans option ; ancien contrat divergent.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://help.atlasfunded.com/two-step",
        "reason": "10% static max loss."
      },
      "payout": {
        "points": 0.5,
        "source": "https://help.atlasfunded.com/two-step",
        "reason": "Five days each at least 0.5% per cycle, first and subsequent 14-day payouts, $100 minimum, 90% standard split."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.atlasfunded.com/two-step",
        "reason": "No consistency rule."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.atlasfunded.com/two-step",
        "reason": "Profit removed from trades inside five-minute news window or shorter than three minutes."
      },
      "funded": {
        "points": 0,
        "source": "https://help.atlasfunded.com/two-step",
        "reason": "Atlas Protector 2% floating loss closes all positions, reduces split to 50% first time, second hard breach; 80% margin usage triggers closure of trades and profit deduction."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 10,
      "source": "https://help.atlasfunded.com/two-step"
    }
  }
};
evidence["funded-bull"] = {
  "funded-bull-1-step": {
    "checkedOn": "2026-11-28",
    "scope": "Current contract §4.1 evaluation thresholds; only 2-Step funded floor corroborated in prior product audit; strategy replicability distinct from numerical consistency.",
    "scopeFr": "Contrat actuel §4.1 pour l'évaluation ; seul seuil financé 2-Step corroboré par audit antérieur ; régularité de stratégie distincte d'un ratio.",
    "assessments": {
      "payout": {
        "points": 0.5,
        "source": "https://fundedbull.com/terms/",
        "reason": "14-day initial payout then seven days; size-dependent minimum threshold, payout schedule may be adjusted; 90% share."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://fundedbull.com/trading-rules/",
        "reason": "Strategy and risk sizing must remain consistent with evaluation; no numerical best-day threshold specified."
      },
      "trading": {
        "points": 0.5,
        "source": "https://fundedbull.com/trading-rules/",
        "reason": "News permitted funded; AI, HFT and unauthorized copying restricted."
      },
      "funded": {
        "points": 0.5,
        "source": "https://fundedbull.com/terms/",
        "reason": "2% per-trade risk expected, inactivity after 15 days; contract permits termination and forfeiture for violations."
      }
    }
  },
  "funded-bull-2-step": {
    "checkedOn": "2026-11-28",
    "scope": "Current contract §4.1 evaluation thresholds; only 2-Step funded floor corroborated in prior product audit; strategy replicability distinct from numerical consistency.",
    "scopeFr": "Contrat actuel §4.1 pour l'évaluation ; seul seuil financé 2-Step corroboré par audit antérieur ; régularité de stratégie distincte d'un ratio.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://fundedbull.com/terms/",
        "reason": "8% static total loss in 2-Step; prior official programme card confirms funded limits."
      },
      "payout": {
        "points": 0.5,
        "source": "https://fundedbull.com/terms/",
        "reason": "14-day initial payout then seven days; size-dependent minimum threshold, payout schedule may be adjusted; 90% share."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://fundedbull.com/trading-rules/",
        "reason": "Strategy and risk sizing must remain consistent with evaluation; no numerical best-day threshold specified."
      },
      "trading": {
        "points": 0.5,
        "source": "https://fundedbull.com/trading-rules/",
        "reason": "News permitted funded; AI, HFT and unauthorized copying restricted."
      },
      "funded": {
        "points": 0.5,
        "source": "https://fundedbull.com/terms/",
        "reason": "2% per-trade risk expected, inactivity after 15 days; contract permits termination and forfeiture for violations."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 8,
      "source": "https://fundedbull.com/terms/"
    }
  },
  "funded-bull-3-step": {
    "checkedOn": "2026-11-28",
    "scope": "Current contract §4.1 evaluation thresholds; only 2-Step funded floor corroborated in prior product audit; strategy replicability distinct from numerical consistency.",
    "scopeFr": "Contrat actuel §4.1 pour l'évaluation ; seul seuil financé 2-Step corroboré par audit antérieur ; régularité de stratégie distincte d'un ratio.",
    "assessments": {
      "payout": {
        "points": 0.5,
        "source": "https://fundedbull.com/terms/",
        "reason": "14-day initial payout then seven days; size-dependent minimum threshold, payout schedule may be adjusted; 90% share."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://fundedbull.com/trading-rules/",
        "reason": "Strategy and risk sizing must remain consistent with evaluation; no numerical best-day threshold specified."
      },
      "trading": {
        "points": 0.5,
        "source": "https://fundedbull.com/trading-rules/",
        "reason": "News permitted funded; AI, HFT and unauthorized copying restricted."
      },
      "funded": {
        "points": 0.5,
        "source": "https://fundedbull.com/terms/",
        "reason": "2% per-trade risk expected, inactivity after 15 days; contract permits termination and forfeiture for violations."
      }
    }
  }
};
// TradeXProp / Atmos / Clarity / FTM / Traders Launch / DayTraders batch, 2026-11-28.
evidence["tradexprop"] = {
  "tradexprop-x-1-step": {
    "checkedOn": "2026-11-28",
    "scope": "Forex plans purchased from 16 April 2025, no add-ons; current funded FAQ.",
    "scopeFr": "Forex acheté depuis le 16 avril 2025, sans option ; FAQ financée actuelle.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://tradexprop.com/forex-faq/",
        "reason": "6% fixed loss from initial balance; funded rules same as evaluation."
      },
      "payout": {
        "points": 1,
        "source": "https://tradexprop.com/forex-faq/",
        "reason": "14-calendar-day cycle from activation or previous processed payout; net profit required."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://tradexprop.com/forex-faq/",
        "reason": "45% best day calculated from daily equity snapshots; resets after payout, not closed balance-only."
      },
      "trading": {
        "points": 0.5,
        "source": "https://tradexprop.com/forex-faq/",
        "reason": "Restricted news window; prohibited strategies and trading-style review."
      },
      "funded": {
        "points": 0.5,
        "source": "https://tradexprop.com/forex-faq/",
        "reason": "30-day inactivity hard breach; hard breach forfeits gains unless eligible paid Payout Protector."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 6,
      "source": "https://tradexprop.com/forex-faq/"
    }
  },
  "tradexprop-x-2-step": {
    "checkedOn": "2026-11-28",
    "scope": "Forex plans purchased from 16 April 2025, no add-ons; current funded FAQ.",
    "scopeFr": "Forex acheté depuis le 16 avril 2025, sans option ; FAQ financée actuelle.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://tradexprop.com/forex-faq/",
        "reason": "8% fixed loss from initial balance; funded rules same as evaluation."
      },
      "payout": {
        "points": 1,
        "source": "https://tradexprop.com/forex-faq/",
        "reason": "14-calendar-day cycle from activation or previous processed payout; net profit required."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://tradexprop.com/forex-faq/",
        "reason": "45% best day calculated from daily equity snapshots; resets after payout, not closed balance-only."
      },
      "trading": {
        "points": 0.5,
        "source": "https://tradexprop.com/forex-faq/",
        "reason": "Restricted news window; prohibited strategies and trading-style review."
      },
      "funded": {
        "points": 0.5,
        "source": "https://tradexprop.com/forex-faq/",
        "reason": "30-day inactivity hard breach; hard breach forfeits gains unless eligible paid Payout Protector."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 8,
      "source": "https://tradexprop.com/forex-faq/"
    }
  },
  "tradexprop-instant-funded-x": {
    "checkedOn": "2026-11-28",
    "scope": "Current sales grid shows 8% trailing and lock at payout; exact trail timing and subsequent withdrawal cycle unresolved.",
    "scopeFr": "Grille actuelle : trailing 8 % et verrouillage au retrait ; fréquence du seuil et retraits suivants à confirmer.",
    "assessments": {
      "payout": {
        "points": 0.5,
        "source": "https://tradexprop.com/instantfunding/",
        "reason": "First payout available immediately; floor locks on payout."
      },
      "consistency": {
        "points": 1,
        "source": "https://tradexprop.com/instantfunding/",
        "reason": "Product page states no consistency rule."
      },
      "trading": {
        "points": 0.5,
        "source": "https://tradexprop.com/instantfunding/",
        "reason": "EAs permitted; weekend holding requires add-on."
      },
      "funded": {
        "points": 0.5,
        "source": "https://tradexprop.com/instantfunding/",
        "reason": "30-day inactivity requirement."
      }
    }
  },
  "tradexprop-crypto-x-1-step": {
    "checkedOn": "2026-11-28",
    "scope": "Current crypto-only plan; no percentage consistency explicitly confirmed; split varies by source.",
    "scopeFr": "Crypto uniquement ; absence de confirmation de la consistency ; partage contradictoire.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://tradexprop.com/crypto-faq/",
        "reason": "6% static max loss."
      },
      "payout": {
        "points": 0.5,
        "source": "https://tradexprop.com/crypto-faq/",
        "reason": "First request at any time, thereafter every 30 days; account drawdown does not reset."
      },
      "funded": {
        "points": 0.5,
        "source": "https://tradexprop.com/crypto-faq/",
        "reason": "Daily cap of 3% in either direction closes positions and pauses trading until next day."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 6,
      "source": "https://tradexprop.com/crypto-faq/"
    }
  },
  "tradexprop-crypto-x-2-step": {
    "checkedOn": "2026-11-28",
    "scope": "Current crypto-only plan; no percentage consistency explicitly confirmed; split varies by source.",
    "scopeFr": "Crypto uniquement ; absence de confirmation de la consistency ; partage contradictoire.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://tradexprop.com/crypto-faq/",
        "reason": "9% static max loss."
      },
      "payout": {
        "points": 0.5,
        "source": "https://tradexprop.com/crypto-faq/",
        "reason": "First request at any time, thereafter every 30 days; account drawdown does not reset."
      },
      "funded": {
        "points": 0.5,
        "source": "https://tradexprop.com/crypto-faq/",
        "reason": "Daily cap of 3% in either direction closes positions and pauses trading until next day."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 9,
      "source": "https://tradexprop.com/crypto-faq/"
    }
  }
};
evidence["atmos-funded"] = {
  "atmos-nova": {
    "checkedOn": "2026-11-28",
    "scope": "Current published funded FAQ, no add-ons; exact trailing formula not preset.",
    "scopeFr": "FAQ financée actuelle, sans option ; pas de préremplissage du seuil suiveur sans formule exacte.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://help.atmosfunded.com/en/articles/12381211-drawdowns-loss-limits-how-they-work",
        "reason": "8% trailing with equity, locks at initial balance on payout."
      },
      "payout": {
        "points": 0,
        "source": "https://help.atmosfunded.com/en/articles/13959447-nova-challenge",
        "reason": "Seven days at 0.5% each, $100 minimum; full payout leaves no loss allowance after lock."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.atmosfunded.com/en/articles/12381353-what-is-the-consistency-rule",
        "reason": "No percentage consistency."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.atmosfunded.com/en/articles/13959447-nova-challenge",
        "reason": "High-impact news restriction ±2 minutes per FAQ; archived agreement says five minutes."
      },
      "funded": {
        "points": 0,
        "source": "https://help.atmosfunded.com/en/articles/13959447-nova-challenge",
        "reason": "1% daily aggregate risk per symbol, including closed and floating risk."
      }
    }
  },
  "atmos-2-step-standard": {
    "checkedOn": "2026-11-28",
    "scope": "Current FAQ baseline, no paid add-ons; archived agreement conflicts on news window.",
    "scopeFr": "FAQ actuelle standard, sans option ; ancien contrat contradictoire sur annonces.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://help.atmosfunded.com/en/articles/12380559-2-step-standard-challenge",
        "reason": "10% static total loss in both evaluation and funded phases."
      },
      "payout": {
        "points": 1,
        "source": "https://help.atmosfunded.com/en/articles/12380559-2-step-standard-challenge",
        "reason": "Standard 14-day cycle."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.atmosfunded.com/en/articles/12381353-what-is-the-consistency-rule",
        "reason": "No percentage consistency."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.atmosfunded.com/en/articles/12380559-2-step-standard-challenge",
        "reason": "News restricted ±2 minutes in funded FAQ; EA permission subject to strategy rules."
      },
      "funded": {
        "points": 0.5,
        "source": "https://help.atmosfunded.com/en/articles/12380559-2-step-standard-challenge",
        "reason": "Allocation cap $400K; archived contract includes additional risk restrictions."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 10,
      "source": "https://help.atmosfunded.com/en/articles/12380559-2-step-standard-challenge"
    }
  },
  "atmos-instant-funding": {
    "checkedOn": "2026-11-28",
    "scope": "Current FAQ 14-day payout; archived agreement says five days, confirm applicable contract.",
    "scopeFr": "FAQ actuelle 14 jours ; ancien contrat cinq jours, à confirmer.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://help.atmosfunded.com/en/articles/12381211-drawdowns-loss-limits-how-they-work",
        "reason": "5% trailing loss locks at initial balance when payout requested."
      },
      "payout": {
        "points": 0,
        "source": "https://help.atmosfunded.com/en/articles/12380563-instant-funding",
        "reason": "Full withdrawal leaves no loss allowance after floor lock; buffer must remain."
      },
      "consistency": {
        "points": 0,
        "source": "https://help.atmosfunded.com/en/articles/12381353-what-is-the-consistency-rule",
        "reason": "20% equity-based best day."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.atmosfunded.com/en/articles/12380563-instant-funding",
        "reason": "Restricted news, EA allowed; archived contract differs on window."
      },
      "funded": {
        "points": 0.5,
        "source": "https://help.atmosfunded.com/en/articles/12380563-instant-funding",
        "reason": "3% daily loss hard breach and maximum allocation $200K."
      }
    }
  }
};
evidence["clarity-traders"] = {
  "clarity-instant": {
    "checkedOn": "2026-11-28",
    "scope": "Current published Terms §§6–8; unfilled placeholders and add-on conflicts remain. No add-ons.",
    "scopeFr": "CG actuelles §§6–8 ; champs non remplis et contradictions sur options. Sans option.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://www.claritytraders.com/terms-and-conditions",
        "reason": "5% overall fixed floor from initial balance; Instant daily loss trails separately with formula placeholder."
      },
      "payout": {
        "points": 0.5,
        "source": "https://www.claritytraders.com/terms-and-conditions",
        "reason": "Seven trading days and 14-day cycle; 70/80/90% staged split; USDT only."
      },
      "consistency": {
        "points": 0,
        "source": "https://www.claritytraders.com/terms-and-conditions",
        "reason": "10% of requested profit, not necessarily cycle net P&L."
      },
      "trading": {
        "points": 0.5,
        "source": "https://www.claritytraders.com/terms-and-conditions",
        "reason": "Trades shorter than 60 seconds prohibited; automation requires add-on; weekend trading versus holding distinction unclear."
      },
      "funded": {
        "points": 0.5,
        "source": "https://www.claritytraders.com/terms-and-conditions",
        "reason": "60-day inactivity and unresolved review can prevent payout; ordinary KYC not penalized."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 5,
      "source": "https://www.claritytraders.com/terms-and-conditions"
    }
  },
  "clarity-1step": {
    "checkedOn": "2026-11-28",
    "scope": "Current published Terms §§6–8; unfilled placeholders and add-on conflicts remain. No add-ons.",
    "scopeFr": "CG actuelles §§6–8 ; champs non remplis et contradictions sur options. Sans option.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://www.claritytraders.com/terms-and-conditions",
        "reason": "10% overall fixed floor from initial balance; Instant daily loss trails separately with formula placeholder."
      },
      "payout": {
        "points": 0.5,
        "source": "https://www.claritytraders.com/terms-and-conditions",
        "reason": "Seven trading days and 14-day cycle; 70/80/90% staged split; USDT only."
      },
      "consistency": {
        "points": 0,
        "source": "https://www.claritytraders.com/terms-and-conditions",
        "reason": "20% of requested profit, not necessarily cycle net P&L."
      },
      "trading": {
        "points": 0.5,
        "source": "https://www.claritytraders.com/terms-and-conditions",
        "reason": "Trades shorter than 60 seconds prohibited; automation requires add-on; weekend trading versus holding distinction unclear."
      },
      "funded": {
        "points": 0.5,
        "source": "https://www.claritytraders.com/terms-and-conditions",
        "reason": "60-day inactivity and unresolved review can prevent payout; ordinary KYC not penalized."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 10,
      "source": "https://www.claritytraders.com/terms-and-conditions"
    }
  },
  "clarity-2step": {
    "checkedOn": "2026-11-28",
    "scope": "Current published Terms §§6–8; unfilled placeholders and add-on conflicts remain. No add-ons.",
    "scopeFr": "CG actuelles §§6–8 ; champs non remplis et contradictions sur options. Sans option.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://www.claritytraders.com/terms-and-conditions",
        "reason": "10% overall fixed floor from initial balance; Instant daily loss trails separately with formula placeholder."
      },
      "payout": {
        "points": 0.5,
        "source": "https://www.claritytraders.com/terms-and-conditions",
        "reason": "Seven trading days and 14-day cycle; 70/80/90% staged split; USDT only."
      },
      "consistency": {
        "points": 0,
        "source": "https://www.claritytraders.com/terms-and-conditions",
        "reason": "20% of requested profit, not necessarily cycle net P&L."
      },
      "trading": {
        "points": 0.5,
        "source": "https://www.claritytraders.com/terms-and-conditions",
        "reason": "Trades shorter than 60 seconds prohibited; automation requires add-on; weekend trading versus holding distinction unclear."
      },
      "funded": {
        "points": 0.5,
        "source": "https://www.claritytraders.com/terms-and-conditions",
        "reason": "60-day inactivity and unresolved review can prevent payout; ordinary KYC not penalized."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 10,
      "source": "https://www.claritytraders.com/terms-and-conditions"
    }
  }
};
evidence["funded-trader-markets"] = {
  "ftm-1step-nitro": {
    "checkedOn": "2026-11-28",
    "scope": "Partial: funded floor continuity and split discrepancy need verification.",
    "scopeFr": "Partiel : seuil financé et partage à vérifier.",
    "assessments": {
      "payout": {
        "points": 0.5,
        "source": "https://fundedtradermarkets.com/faq/is-there-a-requirement-for-a-minimum-number-of-trading-days",
        "reason": "Five funded days at 0.5% each."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://fundedtradermarkets.com/faq/category/1-step-nitro-evaluation",
        "reason": "45% funded best day based on daily balance difference."
      },
      "trading": {
        "points": 0.5,
        "source": "https://fundedtradermarkets.com/faq/category/general-trading-rules",
        "reason": "Overnight/weekend allowed, restrictions on rapid trading and strategies."
      }
    }
  },
  "ftm-2step-plus": {
    "checkedOn": "2026-11-28",
    "scope": "Current FAQ 10% static and 70% starting share; sales landing page differs. Omit percentage preset.",
    "scopeFr": "FAQ : 10 % statique et partage 70 % ; page commerciale divergente. Sans taux prérempli.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://fundedtradermarkets.com/faq/category/2-step-plus-evaluation",
        "reason": "Static overall drawdown in programme FAQ."
      },
      "payout": {
        "points": 0.5,
        "source": "https://fundedtradermarkets.com/faq/is-there-a-requirement-for-a-minimum-number-of-trading-days",
        "reason": "Five qualifying funded days at 0.5% each."
      },
      "trading": {
        "points": 0.5,
        "source": "https://fundedtradermarkets.com/faq/category/general-trading-rules",
        "reason": "Overnight/weekend allowed, restrictions on rapid trading."
      },
      "funded": {
        "points": 0,
        "source": "https://fundedtradermarkets.com/faq/category/2-step-plus-evaluation",
        "reason": "1% floating loss auto-closes all positions and progressively reduces share to permanent 20% after fourth violation."
      }
    },
    "preset": {
      "drawdown": "static",
      "source": "https://fundedtradermarkets.com/faq/category/2-step-plus-evaluation"
    }
  },
  "ftm-instant-standard": {
    "checkedOn": "2026-11-28",
    "scope": "Partial: archived plan rules but current detailed Standard FAQ not verified.",
    "scopeFr": "Partiel : anciennes règles disponibles, FAQ Standard détaillée non vérifiée.",
    "assessments": {
      "payout": {
        "points": 0.5,
        "source": "https://fundedtradermarkets.com/faq/is-there-a-requirement-for-a-minimum-number-of-trading-days",
        "reason": "Five funded profitable days at 0.5%."
      },
      "trading": {
        "points": 0.5,
        "source": "https://fundedtradermarkets.com/faq/category/general-trading-rules",
        "reason": "Weekend holding allowed; strategy and rapid trading restrictions."
      }
    }
  },
  "ftm-instant-pro": {
    "checkedOn": "2026-11-28",
    "scope": "Current model-specific FAQ; internal daily loss contradiction, no universal split preset.",
    "scopeFr": "FAQ actuelle spécifique ; contradiction interne sur perte journalière, pas de partage fixe.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://fundedtradermarkets.com/faq/category/instant-funding-pro",
        "reason": "3% fixed-dollar trail from highest balance, never locks."
      },
      "payout": {
        "points": 0,
        "source": "https://fundedtradermarkets.com/faq/category/instant-funding-pro",
        "reason": "Full withdrawals only, staged split, five qualifying days per general FAQ."
      },
      "consistency": {
        "points": 0,
        "source": "https://fundedtradermarkets.com/faq/category/instant-funding-pro",
        "reason": "15% best-day share of overall profit."
      },
      "trading": {
        "points": 0.5,
        "source": "https://fundedtradermarkets.com/faq/category/general-trading-rules",
        "reason": "Overnight/weekend allowed; strategy and rapid trading restrictions."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 3,
      "source": "https://fundedtradermarkets.com/faq/category/instant-funding-pro"
    }
  },
  "ftm-instant-plus": {
    "checkedOn": "2026-11-28",
    "scope": "Current Instant Plus model-specific FAQ; baseline 80% subject to Shield.",
    "scopeFr": "Instant Plus FAQ actuelle ; partage 80 % soumis au Shield.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://fundedtradermarkets.com/faq/category/instant-funding-plus",
        "reason": "6% trail from highest balance, locks at initial balance after +6%."
      },
      "payout": {
        "points": 0,
        "source": "https://fundedtradermarkets.com/faq/category/instant-funding-plus",
        "reason": "Full withdrawal after floor lock leaves no loss allowance; five qualifying days per general FAQ."
      },
      "consistency": {
        "points": 0,
        "source": "https://fundedtradermarkets.com/faq/category/instant-funding-plus",
        "reason": "15% best-day share of overall profit."
      },
      "trading": {
        "points": 0.5,
        "source": "https://fundedtradermarkets.com/faq/category/general-trading-rules",
        "reason": "Overnight/weekend holding allowed; strategy and rapid trading restrictions."
      },
      "funded": {
        "points": 0,
        "source": "https://fundedtradermarkets.com/faq/category/instant-funding-plus",
        "reason": "1% floating loss Shield auto-closes positions and reduces reward share, down to permanent 20%."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 6,
      "source": "https://fundedtradermarkets.com/faq/category/instant-funding-plus"
    }
  }
};
evidence["traders-launch"] = {
  "traders-launch-futures-standard": {
    "checkedOn": "2026-11-28",
    "scope": "Premium 80% baseline; current general funded rules.",
    "scopeFr": "Premium 80% baseline ; règles financées générales actuelles.",
    "assessments": {
      "drawdown": {
        "points": 0.5,
        "source": "https://www.traderslaunch.com/faq",
        "reason": "EOD trailing floor locks permanently at starting balance."
      },
      "payout": {
        "points": 0.5,
        "source": "https://traderslaunch.com/payout-rules",
        "reason": "Daily requests above +1% profit, no minimum days; review at $100K total payouts."
      },
      "consistency": {
        "points": 1,
        "source": "https://traderslaunch.com/futures/rules",
        "reason": "No funded consistency."
      },
      "trading": {
        "points": 0.5,
        "source": "https://traderslaunch.com/futures/rules",
        "reason": "Session and price-limit zone restrictions; hedging prohibition per FAQ."
      },
      "funded": {
        "points": 0.5,
        "source": "https://www.traderslaunch.com/faq",
        "reason": "Seven-day inactivity pauses funded account (reactivation possible); fixed contract limit."
      }
    },
    "preset": {
      "drawdown": "eod",
      "profitSplit": 80,
      "source": "https://www.traderslaunch.com/faq"
    }
  },
  "traders-launch-futures-legacy-nyc": {
    "checkedOn": "2026-11-28",
    "scope": "Legacy NYC 80% route; sale availability unconfirmed; current general funded rules.",
    "scopeFr": "Legacy NYC 80% route; sale availability unconfirmed ; règles financées générales actuelles.",
    "assessments": {
      "drawdown": {
        "points": 0.5,
        "source": "https://www.traderslaunch.com/faq",
        "reason": "EOD trailing floor locks permanently at starting balance."
      },
      "payout": {
        "points": 0.5,
        "source": "https://traderslaunch.com/payout-rules",
        "reason": "Daily requests above +1% profit, no minimum days; review at $100K total payouts."
      },
      "consistency": {
        "points": 1,
        "source": "https://traderslaunch.com/futures/rules",
        "reason": "No funded consistency."
      },
      "trading": {
        "points": 0.5,
        "source": "https://traderslaunch.com/futures/rules",
        "reason": "Session and price-limit zone restrictions; hedging prohibition per FAQ."
      },
      "funded": {
        "points": 0.5,
        "source": "https://www.traderslaunch.com/faq",
        "reason": "Seven-day inactivity pauses funded account (reactivation possible); fixed contract limit."
      }
    },
    "preset": {
      "drawdown": "eod",
      "profitSplit": 80,
      "source": "https://www.traderslaunch.com/faq"
    }
  },
  "traders-launch-static-25k": {
    "checkedOn": "2026-11-28",
    "scope": "Static 25K 90% route only; verify exact funded floor and lower split variants separately.",
    "scopeFr": "Static 25K à 90 % uniquement ; seuil exact et autres partages à confirmer.",
    "assessments": {
      "payout": {
        "points": 0.5,
        "source": "https://traderslaunch.com/",
        "reason": "Static 90% advertised without per-payout cap; general +1% eligibility applies subject to programme rules."
      },
      "consistency": {
        "points": 1,
        "source": "https://traderslaunch.com/",
        "reason": "No funded consistency."
      },
      "trading": {
        "points": 0.5,
        "source": "https://traderslaunch.com/futures/rules",
        "reason": "Futures session and price-limit restrictions."
      },
      "funded": {
        "points": 0.5,
        "source": "https://www.traderslaunch.com/faq",
        "reason": "Seven-day funded inactivity pause; reactivation possible."
      }
    }
  }
};
evidence["daytraders-com"] = {
  "daytraders-trailing": {
    "checkedOn": "2026-11-28",
    "scope": "Current Pro funded plan, comparison published October 2026; no add-ons.",
    "scopeFr": "Compte Pro financé actuel, comparatif octobre 2026 ; sans option.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://daytraders.com/help/articles/17704132-plan-comparison-overview",
        "reason": "intraday overall drawdown; Static fixed for evaluation and funded."
      },
      "payout": {
        "points": 0.5,
        "source": "https://daytraders.com/help/articles/17684700-trail-payouts",
        "reason": "Eight qualifying days each payout; $500 minimum; tier-specific minimum remaining balance and maximum request."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://daytraders.com/help/articles/17704132-plan-comparison-overview",
        "reason": "30% funded best-day consistency on all three plans, including Static."
      },
      "trading": {
        "points": 0.5,
        "source": "https://daytraders.com/help/articles/17704089-trading-hours-holidays-and-overnight-positions",
        "reason": "Published close-by-session guidance coexists with overnight/weekend permission; no automatic liquidation at session close. Other trading restrictions apply."
      },
      "funded": {
        "points": 0,
        "source": "https://daytraders.com/help/articles/17697925-moving-from-pro-or-s2f-to-live",
        "reason": "Discretionary live invitation closes sim accounts; excess simulated balances generally forfeited, possible discretionary live performance rewards."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "profitSplit": 100,
      "source": "https://daytraders.com/help/articles/17704132-plan-comparison-overview"
    }
  },
  "daytraders-eod": {
    "checkedOn": "2026-11-28",
    "scope": "Current Pro funded plan, comparison published October 2026; no add-ons.",
    "scopeFr": "Compte Pro financé actuel, comparatif octobre 2026 ; sans option.",
    "assessments": {
      "drawdown": {
        "points": 0.5,
        "source": "https://daytraders.com/help/articles/17704132-plan-comparison-overview",
        "reason": "eod overall drawdown; Static fixed for evaluation and funded."
      },
      "payout": {
        "points": 0.5,
        "source": "https://daytraders.com/help/articles/17684739-eod-payouts",
        "reason": "Eight qualifying days each payout; $500 minimum; tier-specific minimum remaining balance and maximum request."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://daytraders.com/help/articles/17704132-plan-comparison-overview",
        "reason": "30% funded best-day consistency on all three plans, including Static."
      },
      "trading": {
        "points": 0.5,
        "source": "https://daytraders.com/help/articles/17704089-trading-hours-holidays-and-overnight-positions",
        "reason": "Published close-by-session guidance coexists with overnight/weekend permission; no automatic liquidation at session close. Other trading restrictions apply."
      },
      "funded": {
        "points": 0,
        "source": "https://daytraders.com/help/articles/17697925-moving-from-pro-or-s2f-to-live",
        "reason": "Discretionary live invitation closes sim accounts; excess simulated balances generally forfeited, possible discretionary live performance rewards."
      }
    },
    "preset": {
      "drawdown": "eod",
      "profitSplit": 100,
      "source": "https://daytraders.com/help/articles/17704132-plan-comparison-overview"
    }
  },
  "daytraders-static": {
    "checkedOn": "2026-11-28",
    "scope": "Current Pro funded plan, comparison published October 2026; no add-ons.",
    "scopeFr": "Compte Pro financé actuel, comparatif octobre 2026 ; sans option.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://daytraders.com/help/articles/17704132-plan-comparison-overview",
        "reason": "static overall drawdown; Static fixed for evaluation and funded."
      },
      "payout": {
        "points": 0.5,
        "source": "https://daytraders.com/help/articles/17684719-static-payouts",
        "reason": "Eight qualifying days each payout; $500 minimum; tier-specific minimum remaining balance and maximum request."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://daytraders.com/help/articles/17704132-plan-comparison-overview",
        "reason": "30% funded best-day consistency on all three plans, including Static."
      },
      "trading": {
        "points": 0.5,
        "source": "https://daytraders.com/help/articles/17704089-trading-hours-holidays-and-overnight-positions",
        "reason": "Published close-by-session guidance coexists with overnight/weekend permission; no automatic liquidation at session close. Other trading restrictions apply."
      },
      "funded": {
        "points": 0,
        "source": "https://daytraders.com/help/articles/17697925-moving-from-pro-or-s2f-to-live",
        "reason": "Discretionary live invitation closes sim accounts; excess simulated balances generally forfeited, possible discretionary live performance rewards."
      }
    },
    "preset": {
      "drawdown": "static",
      "profitSplit": 100,
      "source": "https://daytraders.com/help/articles/17704132-plan-comparison-overview"
    }
  }
};
// Orion / WSFunded / Ment / CFT / Funded7 / DNA batch, 2026-11-28.
evidence["orion-funded"] = {
  "orion-standard-2-step": {
    "checkedOn": "2026-11-28",
    "scope": "Current funded help-centre rules; no add-ons. Older contractual overnight wording conflicts for Standard.",
    "scopeFr": "Règles financées actuelles du centre d'aide, sans option. Contradiction ancienne sur le port de positions Standard.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://www.orionfunded.com/faq/programs/max-drawdown",
        "reason": "6% fixed below initial balance."
      },
      "payout": {
        "points": 1,
        "source": "https://www.orionfunded.com/faq/payouts/payout-request",
        "reason": "14-day cycle and ordinary review; $100 minimum."
      },
      "consistency": {
        "points": 1,
        "source": "https://www.orionfunded.com/faq/programs/consistency-rule",
        "reason": "Explicitly no best-day ratio."
      },
      "trading": {
        "points": 0.5,
        "source": "https://www.orionfunded.com/faq/programs/news-trading",
        "reason": "No order execution or modification within two minutes either side of major news."
      },
      "funded": {
        "points": 0.5,
        "source": "https://www.orionfunded.com/faq/programs/prohibited-practices",
        "reason": "Risk-pattern restrictions include unusually large positions and cumulative exposure; grid and other prohibited strategies reviewed."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 6,
      "source": "https://www.orionfunded.com/faq/programs/max-drawdown"
    }
  },
  "orion-select-3-step": {
    "checkedOn": "2026-11-28",
    "scope": "Current funded help-centre rules; no add-ons. Older contractual overnight wording conflicts for Standard.",
    "scopeFr": "Règles financées actuelles du centre d'aide, sans option. Contradiction ancienne sur le port de positions Standard.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://www.orionfunded.com/faq/programs/max-drawdown",
        "reason": "5% fixed below initial balance."
      },
      "payout": {
        "points": 1,
        "source": "https://www.orionfunded.com/faq/payouts/payout-request",
        "reason": "14-day cycle and ordinary review; $100 minimum."
      },
      "consistency": {
        "points": 1,
        "source": "https://www.orionfunded.com/faq/programs/consistency-rule",
        "reason": "Explicitly no best-day ratio."
      },
      "trading": {
        "points": 0.5,
        "source": "https://www.orionfunded.com/faq/programs/news-trading",
        "reason": "No order execution or modification within two minutes either side of major news."
      },
      "funded": {
        "points": 0.5,
        "source": "https://www.orionfunded.com/faq/programs/prohibited-practices",
        "reason": "Risk-pattern restrictions include unusually large positions and cumulative exposure; grid and other prohibited strategies reviewed."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 5,
      "source": "https://www.orionfunded.com/faq/programs/max-drawdown"
    }
  },
  "orion-nova-1-step": {
    "checkedOn": "2026-11-28",
    "scope": "Current funded help-centre rules; no add-ons. Older contractual overnight wording conflicts for Standard.",
    "scopeFr": "Règles financées actuelles du centre d'aide, sans option. Contradiction ancienne sur le port de positions Standard.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://www.orionfunded.com/faq/programs/max-drawdown",
        "reason": "5% proportional equity high-water trail, locks at initial balance."
      },
      "payout": {
        "points": 0.5,
        "source": "https://www.orionfunded.com/faq/payouts/payout-request",
        "reason": "14-day cycle; first 3% profit ineligible for withdrawal; $100 minimum."
      },
      "consistency": {
        "points": 0,
        "source": "https://www.orionfunded.com/faq/programs/consistency-rule",
        "reason": "20% best-day limit in funded reward cycle."
      },
      "trading": {
        "points": 0.5,
        "source": "https://www.orionfunded.com/faq/programs/news-trading",
        "reason": "No order execution or modification within two minutes either side of major news."
      },
      "funded": {
        "points": 0.5,
        "source": "https://www.orionfunded.com/faq/programs/prohibited-practices",
        "reason": "Risk-pattern restrictions include unusually large positions and cumulative exposure; grid and other prohibited strategies reviewed."
      }
    },
    "preset": {
      "source": "https://www.orionfunded.com/faq/programs/max-drawdown"
    }
  },
  "orion-zero-instant": {
    "checkedOn": "2026-11-28",
    "scope": "Current funded help-centre rules; no add-ons. Older contractual overnight wording conflicts for Standard.",
    "scopeFr": "Règles financées actuelles du centre d'aide, sans option. Contradiction ancienne sur le port de positions Standard.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://www.orionfunded.com/faq/programs/max-drawdown",
        "reason": "6% proportional closed-balance high-water trail, locks at initial balance."
      },
      "payout": {
        "points": 0.5,
        "source": "https://www.orionfunded.com/faq/payouts/payout-request",
        "reason": "14-day cycle; first 3% profit ineligible for withdrawal; $100 minimum."
      },
      "consistency": {
        "points": 0,
        "source": "https://www.orionfunded.com/faq/programs/consistency-rule",
        "reason": "20% best-day limit in funded reward cycle."
      },
      "trading": {
        "points": 0.5,
        "source": "https://www.orionfunded.com/faq/programs/news-trading",
        "reason": "50% share on trades opened/closed within five minutes of high-impact news."
      },
      "funded": {
        "points": 0.5,
        "source": "https://www.orionfunded.com/faq/programs/prohibited-practices",
        "reason": "Risk-pattern restrictions include unusually large positions and cumulative exposure; grid and other prohibited strategies reviewed."
      }
    },
    "preset": {
      "source": "https://www.orionfunded.com/faq/programs/max-drawdown"
    }
  }
};
evidence["wsfunded"] = {
  "wsfunded-instant-pro": {
    "checkedOn": "2026-11-28",
    "scope": "Current Instant rules; profit split and exact trailing formula inconsistent across examples, no preset.",
    "scopeFr": "Règles Instant actuelles ; partage et formule du trailing contradictoires, pas de préremplissage.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://faq.wsfunded.com/en/articles/10719208-instant-pro",
        "reason": "5% peak-balance trailing, no downward reset or lock after withdrawal."
      },
      "payout": {
        "points": 0,
        "source": "https://faq.wsfunded.com/en/articles/10719208-instant-pro",
        "reason": "Four 0.5%-profitable days and non-resetting loss floor may cause breach at withdrawal or next trade."
      },
      "consistency": {
        "points": 0,
        "source": "https://faq.wsfunded.com/en/articles/10719208-instant-pro",
        "reason": "15% best-day share of net total profit."
      },
      "trading": {
        "points": 0.5,
        "source": "https://faq.wsfunded.com/en/articles/10719208-instant-pro",
        "reason": "Stop loss required within two minutes; special SL/TP requirement on news trades, general funded news restriction documented separately."
      },
      "funded": {
        "points": 0,
        "source": "https://faq.wsfunded.com/en/articles/13609936-new-dashboard-update-softbreach-suspensions-and-breach",
        "reason": "First direct 1% risk-per-idea violation can cancel both funded account and payout."
      }
    }
  },
  "wsfunded-instant-standard": {
    "checkedOn": "2026-11-28",
    "scope": "Current Instant rules; profit split and exact trailing formula inconsistent across examples, no preset.",
    "scopeFr": "Règles Instant actuelles ; partage et formule du trailing contradictoires, pas de préremplissage.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://faq.wsfunded.com/en/articles/10719192-instant-standard",
        "reason": "6% peak-balance trailing, no downward reset or lock after withdrawal."
      },
      "payout": {
        "points": 0,
        "source": "https://faq.wsfunded.com/en/articles/10719192-instant-standard",
        "reason": "Four 0.5%-profitable days and non-resetting loss floor may cause breach at withdrawal or next trade."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://faq.wsfunded.com/en/articles/10719192-instant-standard",
        "reason": "30% best-day share of net total profit."
      },
      "trading": {
        "points": 0.5,
        "source": "https://faq.wsfunded.com/en/articles/10719192-instant-standard",
        "reason": "Stop loss required within two minutes; special SL/TP requirement on news trades, general funded news restriction documented separately."
      },
      "funded": {
        "points": 0,
        "source": "https://faq.wsfunded.com/en/articles/13609936-new-dashboard-update-softbreach-suspensions-and-breach",
        "reason": "First direct 1% risk-per-idea violation can cancel both funded account and payout."
      }
    }
  },
  "wsfunded-classic-2phase": {
    "checkedOn": "2026-11-28",
    "scope": "Partial: exact funded consistency not explicitly confirmed; programme-specific September rules.",
    "scopeFr": "Partiel : consistency financée non explicitement confirmée ; règles spécifiques de septembre.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://faq.wsfunded.com/en/articles/8717270-2-phases-wall-street-classic",
        "reason": "8% static max loss."
      },
      "payout": {
        "points": 0.5,
        "source": "https://faq.wsfunded.com/en/articles/8717270-2-phases-wall-street-classic",
        "reason": "First payout 15 days then every ten days."
      },
      "trading": {
        "points": 0.5,
        "source": "https://faq.wsfunded.com/en/articles/8717270-2-phases-wall-street-classic",
        "reason": "Stop loss within two minutes; EA permission subject to contractual third-party restrictions."
      },
      "funded": {
        "points": 0,
        "source": "https://faq.wsfunded.com/en/articles/13609936-new-dashboard-update-softbreach-suspensions-and-breach",
        "reason": "First direct breach of risk per idea (50% daily drawdown) cancels funded account and payout."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 8,
      "profitSplit": 80,
      "source": "https://faq.wsfunded.com/en/articles/8717270-2-phases-wall-street-classic"
    }
  },
  "wsfunded-ultra-2phase": {
    "checkedOn": "2026-11-28",
    "scope": "Partial: exact funded consistency not explicitly confirmed; programme-specific September rules.",
    "scopeFr": "Partiel : consistency financée non explicitement confirmée ; règles spécifiques de septembre.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://faq.wsfunded.com/en/articles/8717276-2-phases-wall-street-ultra",
        "reason": "10% static max loss."
      },
      "payout": {
        "points": 0.5,
        "source": "https://faq.wsfunded.com/en/articles/8717276-2-phases-wall-street-ultra",
        "reason": "First payout 15 days then every ten days."
      },
      "trading": {
        "points": 0.5,
        "source": "https://faq.wsfunded.com/en/articles/8717276-2-phases-wall-street-ultra",
        "reason": "Stop loss within two minutes; EA permission subject to contractual third-party restrictions."
      },
      "funded": {
        "points": 0,
        "source": "https://faq.wsfunded.com/en/articles/13609936-new-dashboard-update-softbreach-suspensions-and-breach",
        "reason": "First direct breach of risk per idea (50% daily drawdown) cancels funded account and payout."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 10,
      "profitSplit": 80,
      "source": "https://faq.wsfunded.com/en/articles/8717276-2-phases-wall-street-ultra"
    }
  },
  "wsfunded-rapid-1phase": {
    "checkedOn": "2026-11-28",
    "scope": "Partial: exact funded consistency not explicitly confirmed; programme-specific September rules.",
    "scopeFr": "Partiel : consistency financée non explicitement confirmée ; règles spécifiques de septembre.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://faq.wsfunded.com/en/articles/8717253-1-phase-wall-street-rapid",
        "reason": "6% static max loss."
      },
      "payout": {
        "points": 0.5,
        "source": "https://faq.wsfunded.com/en/articles/8717253-1-phase-wall-street-rapid",
        "reason": "First payout 30 days then every ten days."
      },
      "trading": {
        "points": 0.5,
        "source": "https://faq.wsfunded.com/en/articles/8717253-1-phase-wall-street-rapid",
        "reason": "Stop loss within two minutes; EA permission subject to contractual third-party restrictions."
      },
      "funded": {
        "points": 0,
        "source": "https://faq.wsfunded.com/en/articles/13609936-new-dashboard-update-softbreach-suspensions-and-breach",
        "reason": "First direct breach of risk per idea (50% daily drawdown) cancels funded account and payout."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 6,
      "profitSplit": 80,
      "source": "https://faq.wsfunded.com/en/articles/8717253-1-phase-wall-street-rapid"
    }
  },
  "wsfunded-power-1phase": {
    "checkedOn": "2026-11-28",
    "scope": "Partial: published 6% initial floor and previous funded trailing wording require reconciliation.",
    "scopeFr": "Partiel : seuil initial de 6 % et ancien seuil suiveur financé à réconcilier.",
    "assessments": {
      "payout": {
        "points": 1,
        "source": "https://faq.wsfunded.com/en/articles/16859382-1-phase-wall-street-power",
        "reason": "14-day first and subsequent payout interval."
      },
      "consistency": {
        "points": 0,
        "source": "https://faq.wsfunded.com/en/articles/16859382-1-phase-wall-street-power",
        "reason": "20% best-day limit."
      },
      "funded": {
        "points": 0,
        "source": "https://faq.wsfunded.com/en/articles/11142820-trading-idea",
        "reason": "1% risk per trading idea."
      }
    }
  },
  "wsfunded-prime-1phase": {
    "checkedOn": "2026-11-28",
    "scope": "Partial: exact funded loss formula and payout eligibility pending.",
    "scopeFr": "Partiel : seuil financé et éligibilité aux retraits à confirmer.",
    "assessments": {
      "payout": {
        "points": 1,
        "source": "https://faq.wsfunded.com/en/articles/17660303-1-phase-wall-street-prime",
        "reason": "Official article advertises instant payout and 90% split."
      },
      "consistency": {
        "points": 1,
        "source": "https://faq.wsfunded.com/en/articles/17660303-1-phase-wall-street-prime",
        "reason": "No consistency rule stated."
      },
      "funded": {
        "points": 0,
        "source": "https://faq.wsfunded.com/en/articles/11142820-trading-idea",
        "reason": "1% maximum risk per trading idea."
      }
    }
  }
};
evidence["ment-funding"] = {
  "ment-forex-1-step": {
    "checkedOn": "2026-11-28",
    "scope": "25K–1M Forex, no paid add-ons; >1M tiers have separate rules.",
    "scopeFr": "Forex 25K à 1M, sans option ; au-delà de 1M règles distinctes.",
    "assessments": {
      "drawdown": {
        "points": 0.5,
        "source": "https://mentfunding.com/",
        "reason": "6% static initial loss, floor rises to initial balance after first withdrawal."
      },
      "payout": {
        "points": 0.5,
        "source": "https://mentfunding.com/",
        "reason": "First payout day one; withdrawing can remove loss cushion after first payout floor locks; 75% standard share."
      },
      "consistency": {
        "points": 1,
        "source": "https://mentfunding.com/",
        "reason": "No best-day rule on 25K–1M."
      },
      "trading": {
        "points": 0.5,
        "source": "https://mentfunding.com/",
        "reason": "No entries within three minutes either side of news, weekend holding requires add-on."
      },
      "funded": {
        "points": 0.5,
        "source": "https://mentfunding.com/",
        "reason": "30-day activity requirement; ordinary account limits."
      }
    },
    "preset": {
      "profitSplit": 75,
      "source": "https://mentfunding.com/"
    }
  },
  "ment-futures": {
    "checkedOn": "2026-11-28",
    "scope": "Current CME Futures standard funded, no add-ons.",
    "scopeFr": "CME Futures financé standard actuel, sans option.",
    "assessments": {
      "drawdown": {
        "points": 0.5,
        "source": "https://mentfunding.com/",
        "reason": "6% initial fixed loss, raised to starting balance after first payout."
      },
      "payout": {
        "points": 0.5,
        "source": "https://mentfunding.com/",
        "reason": "First payout then 30-day cadence; first payout raises floor to starting balance."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://mentfunding.com/",
        "reason": "33% best-day limit at each payout."
      },
      "trading": {
        "points": 0.5,
        "source": "https://mentfunding.com/",
        "reason": "News allowed; front-month contracts only, exchange margin limits."
      },
      "funded": {
        "points": 0.5,
        "source": "https://mentfunding.com/",
        "reason": "Daily loss 3% of prior closing balance, hard breach."
      }
    },
    "preset": {
      "profitSplit": 75,
      "source": "https://mentfunding.com/"
    }
  },
  "ment-equities": {
    "checkedOn": "2026-11-28",
    "scope": "Equities Static baseline; Trailing rated separately.",
    "scopeFr": "Actions Static de référence ; variante Trailing notée séparément.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://mentfunding.com/",
        "reason": "6% static maximum loss."
      },
      "payout": {
        "points": 0.5,
        "source": "https://mentfunding.com/",
        "reason": "14-day cycle, $100 minimum and three 0.5% profitable days."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://mentfunding.com/",
        "reason": "33% funded best-day limit for Static."
      },
      "funded": {
        "points": 0.5,
        "source": "https://mentfunding.com/",
        "reason": "3% daily profit cap pauses trading; 4% daily intraday loss hard breach."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 6,
      "profitSplit": 80,
      "source": "https://mentfunding.com/"
    }
  }
};
evidence["crypto-fund-trader"] = {
  "cft-break": {
    "checkedOn": "2026-11-28",
    "scope": "Current Break Final Stage, no add-ons; size-dependent proportional trail.",
    "scopeFr": "Break Final Stage actuel, sans option ; trailing proportionnel selon taille.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://cryptofundtrader.com/faq/",
        "reason": "4% of highest balance on 25K/50K; 3% on 100K."
      },
      "payout": {
        "points": 1,
        "source": "https://cryptofundtrader.com/faq/",
        "reason": "On-demand after evaluation and activation fee; no minimum traded days, all positions closed."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://cryptofundtrader.com/faq/",
        "reason": "40% best-day share of total profits to date; not established as cycle reset."
      },
      "trading": {
        "points": 0.5,
        "source": "https://cryptofundtrader.com/faq/",
        "reason": "News and overnight/weekend positions generally allowed; no funded copy trading even between own Break accounts."
      },
      "funded": {
        "points": 0.5,
        "source": "https://cryptofundtrader.com/faq/",
        "reason": "Maximum five Final Stage accounts; funded compliance review and general restrictions."
      }
    }
  },
  "cft-evaluation": {
    "checkedOn": "2026-11-28",
    "scope": "Partial: generic legacy catalogue ID does not uniquely identify current 1-Phase or 2-Phase.",
    "scopeFr": "Partiel : identifiant générique ancien, ne distingue pas les 1-Phase et 2-Phase actuels.",
    "assessments": {
      "payout": {
        "points": 0.5,
        "source": "https://cryptofundtrader.com/faq/",
        "reason": "Current 2-Phase standard 15 traded days or 30 calendar days; 1-Phase seven traded days; map exact offer."
      },
      "trading": {
        "points": 1,
        "source": "https://cryptofundtrader.com/faq/",
        "reason": "General news and overnight/weekend holding allowed, subject to model-specific exceptions."
      }
    }
  },
  "cft-accelerated": {
    "checkedOn": "2026-11-28",
    "scope": "Partial: current Classic/Pro/Turbo mapping unresolved.",
    "scopeFr": "Partiel : correspondance Classic/Pro/Turbo à confirmer.",
    "assessments": {
      "payout": {
        "points": 0.5,
        "source": "https://cryptofundtrader.com/faq/",
        "reason": "Current 1-Phase reward seven traded days, optional two-day paid add-on."
      },
      "trading": {
        "points": 1,
        "source": "https://cryptofundtrader.com/faq/",
        "reason": "General news and overnight/weekend holding allowed."
      }
    }
  },
  "cft-instant": {
    "checkedOn": "2026-11-28",
    "scope": "Legacy only: official FAQ says no longer available for purchase.",
    "scopeFr": "Ancien programme : la FAQ confirme la fin des nouveaux achats.",
    "assessments": {
      "payout": {
        "points": 0.5,
        "source": "https://cryptofundtrader.com/faq/",
        "reason": "Existing accounts may request Withdrawal & Upgrade at 10% profit or ordinary reward under other evaluation conditions."
      }
    }
  }
};
evidence["funded7"] = {
  "funded7-two-phase": {
    "checkedOn": "2026-11-28",
    "scope": "Published comparison and general OREF framework; standard Pro tier, no promotional accounts.",
    "scopeFr": "Comparatif et règlement OREF ; niveau Pro standard, hors comptes promotionnels.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://funded7.com/challenge-comparison/",
        "reason": "10% static total loss."
      },
      "payout": {
        "points": 0.5,
        "source": "https://funded7.com/challenge-comparison/",
        "reason": "Seven-day payout cycle; $100 minimum, quality and activity requirements; contractual monthly cap."
      },
      "consistency": {
        "points": 0,
        "source": "https://funded7.com/faq/rule-1-payout-criteria/",
        "reason": "Dynamic trade-size outlier rule, at least ten closed trades and three active days; (second + third largest trade profit) / largest trade profit >=0.90. Failure defers payout."
      },
      "trading": {
        "points": 0.5,
        "source": "https://funded7.com/faq/rule-2-3-position-risk-execution/",
        "reason": "Fast-trade frequency limits: more than 2% of trades under 15s or 3% under 30s triggers restricted tier."
      },
      "funded": {
        "points": 0,
        "source": "https://funded7.com/faq/rule-2-3-position-risk-execution/",
        "reason": "Portfolio, correlation-bucket and single-position risk limits; 3% standard, 2% Silver, 1% Bronze; restricted tier and profit nullification rules."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 10,
      "profitSplit": 80,
      "source": "https://funded7.com/challenge-comparison/"
    }
  },
  "funded7-one-phase": {
    "checkedOn": "2026-11-28",
    "scope": "Published comparison and general OREF framework; standard Pro tier, no promotional accounts.",
    "scopeFr": "Comparatif et règlement OREF ; niveau Pro standard, hors comptes promotionnels.",
    "assessments": {
      "payout": {
        "points": 0.5,
        "source": "https://funded7.com/challenge-comparison/",
        "reason": "Seven-day payout cycle; $100 minimum, quality and activity requirements; contractual monthly cap."
      },
      "consistency": {
        "points": 0,
        "source": "https://funded7.com/faq/rule-1-payout-criteria/",
        "reason": "Dynamic trade-size outlier rule, at least ten closed trades and three active days; (second + third largest trade profit) / largest trade profit >=0.90. Failure defers payout."
      },
      "trading": {
        "points": 0.5,
        "source": "https://funded7.com/faq/rule-2-3-position-risk-execution/",
        "reason": "Fast-trade frequency limits: more than 2% of trades under 15s or 3% under 30s triggers restricted tier."
      },
      "funded": {
        "points": 0,
        "source": "https://funded7.com/faq/rule-2-3-position-risk-execution/",
        "reason": "Portfolio, correlation-bucket and single-position risk limits; 3% standard, 2% Silver, 1% Bronze; restricted tier and profit nullification rules."
      }
    }
  },
  "funded7-instant": {
    "checkedOn": "2026-11-28",
    "scope": "Published comparison and general OREF framework; standard Pro tier, no promotional accounts.",
    "scopeFr": "Comparatif et règlement OREF ; niveau Pro standard, hors comptes promotionnels.",
    "assessments": {
      "payout": {
        "points": 0.5,
        "source": "https://funded7.com/challenge-comparison/",
        "reason": "Seven-day payout cycle; $100 minimum, quality and activity requirements; contractual monthly cap."
      },
      "consistency": {
        "points": 0,
        "source": "https://funded7.com/faq/rule-1-payout-criteria/",
        "reason": "Dynamic trade-size outlier rule, at least ten closed trades and three active days; (second + third largest trade profit) / largest trade profit >=0.90. Failure defers payout."
      },
      "trading": {
        "points": 0.5,
        "source": "https://funded7.com/faq/rule-2-3-position-risk-execution/",
        "reason": "Fast-trade frequency limits: more than 2% of trades under 15s or 3% under 30s triggers restricted tier."
      },
      "funded": {
        "points": 0,
        "source": "https://funded7.com/faq/rule-2-3-position-risk-execution/",
        "reason": "Portfolio, correlation-bucket and single-position risk limits; 3% standard, 2% Silver, 1% Bronze; restricted tier and profit nullification rules."
      }
    }
  }
};
evidence["dna-funded"] = {
  "dna-1-phase-march-2026": {
    "checkedOn": "2026-11-28",
    "scope": "Historical March 2026 cohort only; new orders reportedly paused, official site unavailable at review. No current purchase score.",
    "scopeFr": "Ancienne version de mars 2026 ; commandes signalées suspendues, site officiel inaccessible. Pas de note commerciale actuelle.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://dnafunded.com/faqs/",
        "reason": "Prior archived review: 6% static limit; not freshly verified."
      }
    }
  },
  "dna-2-phase-march-2026": {
    "checkedOn": "2026-11-28",
    "scope": "Historical March 2026 cohort only; new orders reportedly paused, official site unavailable at review. No current purchase score.",
    "scopeFr": "Ancienne version de mars 2026 ; commandes signalées suspendues, site officiel inaccessible. Pas de note commerciale actuelle.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://dnafunded.com/faqs/",
        "reason": "Prior archived review: 8% static limit; not freshly verified."
      }
    }
  },
  "dna-rapid-march-2026": {
    "checkedOn": "2026-11-28",
    "scope": "Historical March 2026 cohort only; new orders reportedly paused, official site unavailable at review. No current purchase score.",
    "scopeFr": "Ancienne version de mars 2026 ; commandes signalées suspendues, site officiel inaccessible. Pas de note commerciale actuelle.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://dnafunded.com/faqs/",
        "reason": "Prior archived review: 5% static limit; not freshly verified."
      }
    }
  },
  "dna-instant-march-2026": {
    "checkedOn": "2026-11-28",
    "scope": "Historical March 2026 cohort only; new orders reportedly paused, official site unavailable at review. No current purchase score.",
    "scopeFr": "Ancienne version de mars 2026 ; commandes signalées suspendues, site officiel inaccessible. Pas de note commerciale actuelle.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://dnafunded.com/faqs/",
        "reason": "Prior archived review: 4% equity trailing limit; not freshly verified."
      }
    }
  }
};
// Top One / Instant Funding / Funding Traders / QT batch, 2026-11-28.
evidence["top-one-trader"] = {
  "top-one-trader-flash": {
    "checkedOn": "2026-11-28",
    "scope": "Current funded FLASH standard, no add-ons.",
    "scopeFr": "FLASH financé standard actuel, sans option.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://help.toponetrader.com/en/articles/10912482-comparison-of-account-types",
        "reason": "7% trailing maximum loss, locks at starting balance upon payout or sufficient profit."
      },
      "payout": {
        "points": 0.5,
        "source": "https://help.toponetrader.com/en/articles/10912482-comparison-of-account-types",
        "reason": "14-day cycle, 2% minimum payout, $25K monthly cap; 80% default split."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.toponetrader.com/en/articles/10912482-comparison-of-account-types",
        "reason": "No best-day consistency or ESS."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.toponetrader.com/en/articles/12458632-minimum-hold-time-rule-for-trades",
        "reason": "Profitable trades require five full minutes, including automatic TP or profitable SL; news/EA restrictions vary by account."
      },
      "funded": {
        "points": 0,
        "source": "https://help.toponetrader.com/en/articles/8318230-what-are-the-rules-for-the-1-step-flash-challenge-account",
        "reason": "Funded 3% daily profit cap; excess profits voided and trading paused for day."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 7,
      "profitSplit": 80,
      "source": "https://help.toponetrader.com/en/articles/10912482-comparison-of-account-types"
    }
  },
  "top-one-trader-2-step-pro": {
    "checkedOn": "2026-11-28",
    "scope": "2-Step PRO v2 after May 18, standard funded route.",
    "scopeFr": "2-Step PRO v2 depuis le 18 mai, retrait standard.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://help.toponetrader.com/en/articles/15164777-2-step-pro-v2-overview",
        "reason": "9% static overall maximum loss."
      },
      "payout": {
        "points": 0,
        "source": "https://help.toponetrader.com/en/articles/15164777-2-step-pro-v2-overview",
        "reason": "14-day cycle, 3% minimum, three 0.5% profitable days, 6% or $15K cap per payout."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.toponetrader.com/en/articles/15164777-2-step-pro-v2-overview",
        "reason": "No best-day consistency."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.toponetrader.com/en/articles/12458632-minimum-hold-time-rule-for-trades",
        "reason": "Profitable trades require five full minutes, including automatic TP or profitable SL; news/EA restrictions vary by account."
      },
      "funded": {
        "points": 0,
        "source": "https://help.toponetrader.com/en/articles/15164923-2-step-pro-v2-equity-shield",
        "reason": "EquityShield closes positions at 2.5% aggregate floating loss; soft-breach limit, daily profit cap $3K/$4K also apply."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 9,
      "profitSplit": 85,
      "source": "https://help.toponetrader.com/en/articles/15164777-2-step-pro-v2-overview"
    }
  },
  "top-one-trader-2-step-plus": {
    "checkedOn": "2026-11-28",
    "scope": "Discontinued offer per official help collection; legacy rules documented, not a current purchase rating.",
    "scopeFr": "Offre arrêtée selon le centre d'aide ; règles des anciens comptes, pas de note commerciale actuelle.",
    "assessments": {
      "drawdown": {
        "points": 0.5,
        "source": "https://help.toponetrader.com/en/articles/15303179-2-step-plus-lock-upon-payout-lup",
        "reason": "8% standard static initial loss limit (10% launch); locks at starting balance after first withdrawal."
      },
      "payout": {
        "points": 0,
        "source": "https://help.toponetrader.com/en/articles/13391994-2-step-plus-overview",
        "reason": "Five 0.5% days, 14-day cycle, 2% minimum and per-cycle cap."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.toponetrader.com/en/articles/13391994-2-step-plus-overview",
        "reason": "No numerical consistency."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.toponetrader.com/en/articles/12458632-minimum-hold-time-rule-for-trades",
        "reason": "Profitable trades require five full minutes, including automatic TP or profitable SL; news/EA restrictions vary by account."
      }
    }
  },
  "top-one-trader-instant-funding": {
    "checkedOn": "2026-11-28",
    "scope": "Current Instant Funding, no paid add-ons.",
    "scopeFr": "Instant Funding actuel, sans option payante.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://help.toponetrader.com/en/articles/12575317-what-are-the-rules-for-the-instant-funding-account",
        "reason": "6% trailing maximum loss locks at initial balance."
      },
      "payout": {
        "points": 0.5,
        "source": "https://help.toponetrader.com/en/articles/10912482-comparison-of-account-types",
        "reason": "30-day standard cycle, 2% minimum, $25K monthly cap; 60% initial share rising to 90%."
      },
      "consistency": {
        "points": 0,
        "source": "https://help.toponetrader.com/en/articles/13021467-understanding-the-difference-between-consistency-and-ess-requirements",
        "reason": "15% best-day ratio, resets after payout."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.toponetrader.com/en/articles/12458632-minimum-hold-time-rule-for-trades",
        "reason": "Profitable trades require five full minutes, including automatic TP or profitable SL; news/EA restrictions vary by account."
      },
      "funded": {
        "points": 0.5,
        "source": "https://help.toponetrader.com/en/articles/12575317-what-are-the-rules-for-the-instant-funding-account",
        "reason": "Ten soft breaches allowed, 30-day inactivity hard breach; stop loss required."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 6,
      "source": "https://help.toponetrader.com/en/articles/12575317-what-are-the-rules-for-the-instant-funding-account"
    }
  },
  "top-one-trader-instant-prime": {
    "checkedOn": "2026-11-28",
    "scope": "Current Instant Prime post-Oct 25 2025, no add-ons.",
    "scopeFr": "Instant Prime actuel après le 25 octobre 2025, sans option.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://help.toponetrader.com/en/articles/12132613-prime-accounts-overview",
        "reason": "5% trailing maximum loss."
      },
      "payout": {
        "points": 0.5,
        "source": "https://help.toponetrader.com/en/articles/10912482-comparison-of-account-types",
        "reason": "14-day cycle, 2% minimum, $25K monthly cap; share 80/90/100% over successive payouts."
      },
      "consistency": {
        "points": 0,
        "source": "https://help.toponetrader.com/en/articles/13021467-understanding-the-difference-between-consistency-and-ess-requirements",
        "reason": "ESS <=20% includes largest winning day plus absolute largest losing day divided by net profit; stricter than ordinary best-day rule."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.toponetrader.com/en/articles/12458632-minimum-hold-time-rule-for-trades",
        "reason": "Profitable trades require five full minutes, including automatic TP or profitable SL; news/EA restrictions vary by account."
      },
      "funded": {
        "points": 0.5,
        "source": "https://help.toponetrader.com/en/articles/12132613-prime-accounts-overview",
        "reason": "Five soft breaches, mandatory stop loss, 30-day inactivity, lot limits."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 5,
      "source": "https://help.toponetrader.com/en/articles/12132613-prime-accounts-overview"
    }
  },
  "top-one-trader-magnum": {
    "checkedOn": "2026-11-28",
    "scope": "500K Magnum only, limited offer; 1M marketing variant not covered.",
    "scopeFr": "Magnum 500K uniquement, offre limitée ; variante 1M non couverte.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://help.toponetrader.com/en/articles/17032981-magnum-500k-account-limited-time",
        "reason": "4% closing-balance trailing, locks at initial balance."
      },
      "payout": {
        "points": 0,
        "source": "https://help.toponetrader.com/en/articles/17032981-magnum-500k-account-limited-time",
        "reason": "14-day cycle, $10K minimum profit/withdrawal, $25K per rolling 30 days; staged split."
      },
      "consistency": {
        "points": 0,
        "source": "https://help.toponetrader.com/en/articles/17032981-magnum-500k-account-limited-time",
        "reason": "15% ESS, not a simple best-day rule."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.toponetrader.com/en/articles/12458632-minimum-hold-time-rule-for-trades",
        "reason": "Profitable trades require five full minutes, including automatic TP or profitable SL; news/EA restrictions vary by account."
      },
      "funded": {
        "points": 0.5,
        "source": "https://help.toponetrader.com/en/articles/17032981-magnum-500k-account-limited-time",
        "reason": "Five soft breaches, mandatory stop loss, 20 open lots maximum, inactivity hard breach after 30 days."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 4,
      "source": "https://help.toponetrader.com/en/articles/17032981-magnum-500k-account-limited-time"
    }
  },
  "top-one-trader-nova": {
    "checkedOn": "2026-11-28",
    "scope": "Current NOVA funded standard, no paid upgrades.",
    "scopeFr": "NOVA financé actuel standard, sans option.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://help.toponetrader.com/en/articles/13832165-nova-account-overview",
        "reason": "Funded 5% equity trailing, locks at starting balance."
      },
      "payout": {
        "points": 0.5,
        "source": "https://help.toponetrader.com/en/articles/13833385-nova-payout-rules",
        "reason": "14-day cycle, 2% minimum, $25K rolling 30-day cap, 90% default share."
      },
      "consistency": {
        "points": 0,
        "source": "https://help.toponetrader.com/en/articles/13021467-understanding-the-difference-between-consistency-and-ess-requirements",
        "reason": "20% ESS includes largest profitable day plus absolute largest losing day over net profit."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.toponetrader.com/en/articles/12458632-minimum-hold-time-rule-for-trades",
        "reason": "Profitable trades require five full minutes, including automatic TP or profitable SL; news/EA restrictions vary by account."
      },
      "funded": {
        "points": 0.5,
        "source": "https://help.toponetrader.com/en/articles/13832165-nova-account-overview",
        "reason": "2% per symbol/2.5% combined EquityShield soft breaches and 30-day inactivity; funded daily 3%."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 5,
      "profitSplit": 90,
      "source": "https://help.toponetrader.com/en/articles/13832165-nova-account-overview"
    }
  }
};
evidence["top-one-futures"] = {
  "top-one-elite-evaluation": {
    "checkedOn": "2026-11-28",
    "scope": "Elite Sim Funded legacy evaluation route; current purchase availability unconfirmed.",
    "scopeFr": "Elite Sim Funded issu de l'évaluation ; disponibilité à l'achat à confirmer.",
    "assessments": {
      "drawdown": {
        "points": 0.5,
        "source": "https://help.toponefutures.com/en/articles/14617600-differences-between-elite-elite-access-and-elite-daily-accounts",
        "reason": "EOD trailing drawdown."
      },
      "payout": {
        "points": 0,
        "source": "https://help.toponefutures.com/en/articles/12717928-elite-sim-funded-account-payout-requirements",
        "reason": "Fresh 6% / 5% / 4% profit target in successive cycles and per-request caps."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://help.toponefutures.com/en/articles/12717928-elite-sim-funded-account-payout-requirements",
        "reason": "25% best-day limit."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.toponefutures.com/en/articles/10908016-minimum-trade-time-rule-explained",
        "reason": "Ten-second minimum trade duration; excessive rapid trades may have profits removed. Session closing and programme-specific news restrictions apply."
      },
      "funded": {
        "points": 0.5,
        "source": "https://help.toponefutures.com/en/articles/11003130-path-to-trading-live",
        "reason": "Risk review can transition trader to pre-live/live; sim account rules and contract limits differ from live. Current live accounts start at zero rather than carrying all sim profits."
      }
    },
    "preset": {
      "drawdown": "eod",
      "profitSplit": 90,
      "source": "https://help.toponefutures.com/en/articles/14617600-differences-between-elite-elite-access-and-elite-daily-accounts"
    }
  },
  "top-one-elite-daily": {
    "checkedOn": "2026-11-28",
    "scope": "Elite Daily V2 current, EOD variant.",
    "scopeFr": "Elite Daily V2 actuel, variante EOD.",
    "assessments": {
      "drawdown": {
        "points": 0.5,
        "source": "https://help.toponefutures.com/en/articles/15056075-elite-daily-v2-overview",
        "reason": "End-of-day trailing drawdown."
      },
      "payout": {
        "points": 0.5,
        "source": "https://help.toponefutures.com/en/articles/15056446-elite-daily-v2-daily-payout-rules",
        "reason": "Daily eligibility above buffer plus $500, capped withdrawals, 50% fresh profit from second payout."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.toponefutures.com/en/articles/15056446-elite-daily-v2-daily-payout-rules",
        "reason": "No funded consistency target; 40% applies only to evaluation."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.toponefutures.com/en/articles/10908016-minimum-trade-time-rule-explained",
        "reason": "Ten-second minimum trade duration; excessive rapid trades may have profits removed. Session closing and programme-specific news restrictions apply."
      },
      "funded": {
        "points": 0.5,
        "source": "https://help.toponefutures.com/en/articles/11003130-path-to-trading-live",
        "reason": "Risk review can transition trader to pre-live/live; sim account rules and contract limits differ from live. Current live accounts start at zero rather than carrying all sim profits."
      }
    },
    "preset": {
      "drawdown": "eod",
      "profitSplit": 90,
      "source": "https://help.toponefutures.com/en/articles/15056075-elite-daily-v2-overview"
    }
  },
  "top-one-elite-access": {
    "checkedOn": "2026-11-28",
    "scope": "Elite Access EOD only; Intraday and Static variants excluded.",
    "scopeFr": "Elite Access EOD seulement ; variantes Intraday et Static exclues.",
    "assessments": {
      "drawdown": {
        "points": 0.5,
        "source": "https://help.toponefutures.com/en/articles/14617600-differences-between-elite-elite-access-and-elite-daily-accounts",
        "reason": "EOD trailing drawdown."
      },
      "payout": {
        "points": 0.5,
        "source": "https://help.toponefutures.com/en/articles/14595161-elite-access-payout-requirements",
        "reason": "Five profitable days, buffer plus $500, caps $1K–$2.5K, 50% fresh-profit progression."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://help.toponefutures.com/en/articles/14595161-elite-access-payout-requirements",
        "reason": "40% funded best-day requirement."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.toponefutures.com/en/articles/10908016-minimum-trade-time-rule-explained",
        "reason": "Ten-second minimum trade duration; excessive rapid trades may have profits removed. Session closing and programme-specific news restrictions apply."
      },
      "funded": {
        "points": 0.5,
        "source": "https://help.toponefutures.com/en/articles/11003130-path-to-trading-live",
        "reason": "Risk review can transition trader to pre-live/live; sim account rules and contract limits differ from live. Current live accounts start at zero rather than carrying all sim profits."
      }
    },
    "preset": {
      "drawdown": "eod",
      "profitSplit": 90,
      "source": "https://help.toponefutures.com/en/articles/14595161-elite-access-payout-requirements"
    }
  },
  "top-one-instant-sim-funded": {
    "checkedOn": "2026-11-28",
    "scope": "Instant Sim Funded 2.0 purchased from 27 July 2026.",
    "scopeFr": "Instant Sim Funded 2.0 acheté depuis le 27 juillet 2026.",
    "assessments": {
      "drawdown": {
        "points": 0.5,
        "source": "https://help.toponefutures.com/en/articles/11020805-overview-of-the-instant-sim-funded-program",
        "reason": "EOD trailing maximum loss by size, $1K–$5,250."
      },
      "payout": {
        "points": 0.5,
        "source": "https://help.toponefutures.com/en/articles/11020805-overview-of-the-instant-sim-funded-program",
        "reason": "Size-dependent payout caps $1K–$3K and profit eligibility per payout."
      },
      "consistency": {
        "points": 0,
        "source": "https://help.toponefutures.com/en/articles/11020805-overview-of-the-instant-sim-funded-program",
        "reason": "20% funded best-day ratio."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.toponefutures.com/en/articles/10908016-minimum-trade-time-rule-explained",
        "reason": "Ten-second minimum trade duration; excessive rapid trades may have profits removed. Session closing and programme-specific news restrictions apply."
      },
      "funded": {
        "points": 0.5,
        "source": "https://help.toponefutures.com/en/articles/11003130-path-to-trading-live",
        "reason": "Risk review can transition trader to pre-live/live; sim account rules and contract limits differ from live. Current live accounts start at zero rather than carrying all sim profits."
      }
    },
    "preset": {
      "drawdown": "eod",
      "profitSplit": 90,
      "source": "https://help.toponefutures.com/en/articles/11020805-overview-of-the-instant-sim-funded-program"
    }
  },
  "top-one-ignite": {
    "checkedOn": "2026-11-28",
    "scope": "Current Ignite instant funded.",
    "scopeFr": "Ignite financé instantané actuel.",
    "assessments": {
      "drawdown": {
        "points": 0.5,
        "source": "https://help.toponefutures.com/en/articles/12671168-ignite-accounts-overview",
        "reason": "EOD trailing maximum loss."
      },
      "payout": {
        "points": 0,
        "source": "https://help.toponefutures.com/en/articles/12707415-ignite-accounts-payout-requirements",
        "reason": "5% profit target each payout, recalculated on post-withdrawal balance; $250 minimum and $500–$2K cap."
      },
      "consistency": {
        "points": 0,
        "source": "https://help.toponefutures.com/en/articles/12707415-ignite-accounts-payout-requirements",
        "reason": "15% best-day consistency."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.toponefutures.com/en/articles/10908016-minimum-trade-time-rule-explained",
        "reason": "Ten-second minimum trade duration; excessive rapid trades may have profits removed. Session closing and programme-specific news restrictions apply."
      },
      "funded": {
        "points": 0.5,
        "source": "https://help.toponefutures.com/en/articles/11003130-path-to-trading-live",
        "reason": "Risk review can transition trader to pre-live/live; sim account rules and contract limits differ from live. Current live accounts start at zero rather than carrying all sim profits."
      }
    },
    "preset": {
      "drawdown": "eod",
      "profitSplit": 90,
      "source": "https://help.toponefutures.com/en/articles/12671168-ignite-accounts-overview"
    }
  }
};
evidence["instant-funding"] = {
  "instant-funding-pro": {
    "checkedOn": "2026-11-28",
    "scope": "Current Instant Funding Pro formerly Smart, no Swing add-on; no explicit percentage consistency located.",
    "scopeFr": "Instant Funding Pro actuel ancien Smart, sans Swing ; absence de confirmation explicite sur la consistency.",
    "assessments": {
      "drawdown": {
        "points": 0.5,
        "source": "https://instantfunding.com/help/instant-funding-program/",
        "reason": "Hybrid loss limit: initial 10% below starting balance, raised once to 5% below starting balance after +5% closed gain."
      },
      "payout": {
        "points": 0.5,
        "source": "https://instantfunding.com/help/instant-funding-program/",
        "reason": "First 14 days after initial trade, then seven days after next trade; $25 minimum and mandatory Smart Drawdown lock."
      },
      "trading": {
        "points": 0.5,
        "source": "https://instantfunding.com/help/instant-funding-program/",
        "reason": "News restriction ±4 minutes and weekend holding requires Swing."
      },
      "funded": {
        "points": 0.5,
        "source": "https://instantfunding.com/help/instant-funding-program/",
        "reason": "3% risk per trade idea; other prohibited trading practices."
      }
    }
  },
  "instant-funding-one-phase-pro": {
    "checkedOn": "2026-11-28",
    "scope": "Standard funded, without news/weekend add-ons.",
    "scopeFr": "Compte financé standard, sans options annonces/week-end.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://instantfunding.com/help/one-phase/",
        "reason": "8% static maximum loss."
      },
      "payout": {
        "points": 0.5,
        "source": "https://instantfunding.com/help/payout-on-demand/",
        "reason": "On-demand after 1.5% net profit or $25, whichever is greater."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://instantfunding.com/help/payout-on-demand/",
        "reason": "40% best-day share of total profit."
      },
      "trading": {
        "points": 0.5,
        "source": "https://instantfunding.com/help/one-phase/",
        "reason": "High-impact news restriction ±4 minutes; funded weekend holding requires add-on."
      },
      "funded": {
        "points": 0,
        "source": "https://instantfunding.com/help/one-phase/",
        "reason": "Risk per trade idea limited to half initial daily loss allowance, aggregates re-entry within ten minutes; hard breach. Maximum lot breach resets account."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 8,
      "source": "https://instantfunding.com/help/one-phase/"
    }
  },
  "instant-funding-two-phase": {
    "checkedOn": "2026-11-28",
    "scope": "Standard funded, without news/weekend add-ons.",
    "scopeFr": "Compte financé standard, sans options annonces/week-end.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://instantfunding.com/help/two-phase/",
        "reason": "10% static maximum loss."
      },
      "payout": {
        "points": 0.5,
        "source": "https://instantfunding.com/help/payout-on-demand/",
        "reason": "On-demand after 1.5% net profit or $25, whichever is greater."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://instantfunding.com/help/payout-on-demand/",
        "reason": "40% best-day share of total profit."
      },
      "trading": {
        "points": 0.5,
        "source": "https://instantfunding.com/help/two-phase/",
        "reason": "High-impact news restriction ±4 minutes; funded weekend holding requires add-on."
      },
      "funded": {
        "points": 0,
        "source": "https://instantfunding.com/help/two-phase/",
        "reason": "Risk per trade idea limited to half initial daily loss allowance, aggregates re-entry within ten minutes; hard breach. Maximum lot breach resets account."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 10,
      "source": "https://instantfunding.com/help/two-phase/"
    }
  }
};
evidence["funding-traders"] = {
  "funding-traders-pro6": {
    "checkedOn": "2026-11-28",
    "scope": "Current programme-specific help rules; standard 21-day schedule without add-ons. Generic withdrawal policy differs; confirm purchase contract.",
    "scopeFr": "FAQ du programme actuel ; cycle standard 21 jours sans option. Politique générale différente ; contrat applicable à confirmer.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://fundingtraders.com/help/en/articles/13399206-2-step-pro",
        "reason": "6% fixed maximum loss."
      },
      "payout": {
        "points": 0.5,
        "source": "https://fundingtraders.com/help/en/articles/13399206-2-step-pro",
        "reason": "Default 21-day cycle; paid 14-day option; generic withdrawal policy uses other thresholds, verify applicable terms."
      },
      "consistency": {
        "points": 1,
        "source": "https://fundingtraders.com/blog/prop-firm-consistency-rules/",
        "reason": "No best-day rule on current PRO6/PRO10 product-specific FAQ."
      },
      "trading": {
        "points": 0.5,
        "source": "https://fundingtraders.com/help/en/articles/13399206-2-step-pro",
        "reason": "High-impact news-influenced trades may not exceed 30% of total profits; five-hour exception for qualifying holdings."
      },
      "funded": {
        "points": 0,
        "source": "https://fundingtraders.com/help/en/articles/13399206-2-step-pro",
        "reason": "Trade-idea risk cap with aggregate floating/closed losses, including same-direction re-entry; separate risk violation from overall drawdown."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 6,
      "profitSplit": 80,
      "source": "https://fundingtraders.com/help/en/articles/13399206-2-step-pro"
    }
  },
  "funding-traders-pro10": {
    "checkedOn": "2026-11-28",
    "scope": "Current programme-specific help rules; standard 21-day schedule without add-ons. Generic withdrawal policy differs; confirm purchase contract.",
    "scopeFr": "FAQ du programme actuel ; cycle standard 21 jours sans option. Politique générale différente ; contrat applicable à confirmer.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://fundingtraders.com/help/en/articles/13399206-2-step-pro",
        "reason": "10% fixed maximum loss."
      },
      "payout": {
        "points": 0.5,
        "source": "https://fundingtraders.com/help/en/articles/13399206-2-step-pro",
        "reason": "Default 21-day cycle; paid 14-day option; generic withdrawal policy uses other thresholds, verify applicable terms."
      },
      "consistency": {
        "points": 1,
        "source": "https://fundingtraders.com/blog/prop-firm-consistency-rules/",
        "reason": "No best-day rule on current PRO6/PRO10 product-specific FAQ."
      },
      "trading": {
        "points": 0.5,
        "source": "https://fundingtraders.com/help/en/articles/13399206-2-step-pro",
        "reason": "High-impact news-influenced trades may not exceed 30% of total profits; five-hour exception for qualifying holdings."
      },
      "funded": {
        "points": 0,
        "source": "https://fundingtraders.com/help/en/articles/13399206-2-step-pro",
        "reason": "Trade-idea risk cap with aggregate floating/closed losses, including same-direction re-entry; separate risk violation from overall drawdown."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 10,
      "profitSplit": 80,
      "source": "https://fundingtraders.com/help/en/articles/13399206-2-step-pro"
    }
  },
  "funding-traders-1-step-pro": {
    "checkedOn": "2026-11-28",
    "scope": "Current programme-specific help rules; standard 21-day schedule without add-ons. Generic withdrawal policy differs; confirm purchase contract.",
    "scopeFr": "FAQ du programme actuel ; cycle standard 21 jours sans option. Politique générale différente ; contrat applicable à confirmer.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://fundingtraders.com/help/en/articles/13615032-1-step-pro",
        "reason": "10% highest recorded balance trailing maximum loss."
      },
      "payout": {
        "points": 0.5,
        "source": "https://fundingtraders.com/help/en/articles/13615032-1-step-pro",
        "reason": "Default 21-day cycle; paid 14-day option; generic withdrawal policy uses other thresholds, verify applicable terms."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://fundingtraders.com/blog/prop-firm-consistency-rules/",
        "reason": "50% funded best-day ratio according to current product-specific FAQ."
      },
      "trading": {
        "points": 0.5,
        "source": "https://fundingtraders.com/help/en/articles/13615032-1-step-pro",
        "reason": "High-impact news-influenced trades may not exceed 30% of total profits; five-hour exception for qualifying holdings."
      },
      "funded": {
        "points": 0,
        "source": "https://fundingtraders.com/help/en/articles/13615032-1-step-pro",
        "reason": "Trade-idea risk cap with aggregate floating/closed losses, including same-direction re-entry; separate risk violation from overall drawdown."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 10,
      "profitSplit": 90,
      "source": "https://fundingtraders.com/help/en/articles/13615032-1-step-pro"
    }
  },
  "funding-traders-instant": {
    "checkedOn": "2026-11-28",
    "scope": "New Instant-Funded FAQ; general withdrawal policy still describes 14-day cycle and other conditions. Payout cadence unresolved.",
    "scopeFr": "Nouvelle FAQ Instant-Funded ; politique générale encore à 14 jours et conditions différentes. Retrait à confirmer.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://fundingtraders.com/help/en/articles/17459915-instant-funded",
        "reason": "6% highest-balance trailing; locks at initial balance after +3% gain."
      },
      "consistency": {
        "points": 0,
        "source": "https://fundingtraders.com/help/en/articles/17459915-instant-funded",
        "reason": "15% best-day consistency."
      },
      "trading": {
        "points": 0.5,
        "source": "https://fundingtraders.com/withdrawal-policy",
        "reason": "General withdrawal policy lists news and weekend holding restrictions; exact new-cohort details to reconcile."
      },
      "funded": {
        "points": 0,
        "source": "https://fundingtraders.com/help/en/articles/17459915-instant-funded",
        "reason": "1% combined floating loss limit across all open trades."
      }
    },
    "preset": {
      "source": "https://fundingtraders.com/help/en/articles/17459915-instant-funded"
    }
  }
};
evidence["quant-tekel"] = {
  "qt-one": {
    "checkedOn": "2026-11-28",
    "scope": "Current help article says static 6% in evaluation; funded floor versus prior marketing needs confirmation.",
    "scopeFr": "FAQ actuelle : 6 % statique en évaluation ; seuil financé à réconcilier avec l'ancien marketing.",
    "assessments": {
      "payout": {
        "points": 0.5,
        "source": "https://support.qtfunded.com/support/articles/9000000000001-qt-one",
        "reason": "Four trading-day cycle and minimum four days, 70% share."
      },
      "consistency": {
        "points": 1,
        "source": "https://support.qtfunded.com/support/articles/9000000000001-qt-one",
        "reason": "No consistency requirement in funded account."
      },
      "funded": {
        "points": 0,
        "source": "https://support.qtfunded.com/support/articles/9000000000001-qt-one",
        "reason": "1% aggregate floating loss hard breach."
      }
    }
  },
  "qt-two": {
    "checkedOn": "2026-11-28",
    "scope": "Current QT TWO; exact funded consistency and trading policy not confirmed.",
    "scopeFr": "QT TWO actuel ; consistency financée et liberté de trading à confirmer.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://support.qtfunded.com/support/articles/9000000000002-qt-two",
        "reason": "8% static maximum in programme rules."
      },
      "payout": {
        "points": 0,
        "source": "https://support.qtfunded.com/support/articles/9000000000002-qt-two",
        "reason": "14-day cycle, four 0.5% profitable days, 5% cap per cycle and excess removed before next cycle."
      },
      "funded": {
        "points": 0,
        "source": "https://support.qtfunded.com/support/articles/9000000000002-qt-two",
        "reason": "1% aggregate floating loss first soft, second hard; SL within 60 seconds or hard breach."
      }
    }
  },
  "qt-instant": {
    "checkedOn": "2026-11-28",
    "scope": "New Instant accounts purchased from 11 August 2026; older model excluded; legacy contract to reconcile.",
    "scopeFr": "Instant acheté depuis le 11 août 2026 ; anciens comptes exclus ; contrat antérieur à réconcilier.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://support.qtfunded.com/support/articles/9000000000003-qt-instant-funded-new",
        "reason": "6% peak balance/equity trailing, locks at starting balance upon withdrawal."
      },
      "payout": {
        "points": 0,
        "source": "https://support.qtfunded.com/support/articles/9000000000003-qt-instant-funded-new",
        "reason": "14-day cycle, four +1% profitable days, 5% minimum withdrawal and 3% retained buffer (8% initial profit required); 100% split."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://support.qtfunded.com/support/articles/9000000000003-qt-instant-funded-new",
        "reason": "30% best-day share at withdrawal, new cohort only."
      },
      "trading": {
        "points": 0.5,
        "source": "https://support.qtfunded.com/support/articles/9000000000003-qt-instant-funded-new",
        "reason": "No news restriction; mandatory stop loss within 60 seconds."
      },
      "funded": {
        "points": 0,
        "source": "https://support.qtfunded.com/support/articles/9000000000003-qt-instant-funded-new",
        "reason": "1% floating loss per instrument hard breach; missing stop loss after 60 seconds hard breach."
      }
    },
    "preset": {
      "profitSplit": 100,
      "source": "https://support.qtfunded.com/support/articles/9000000000003-qt-instant-funded-new"
    }
  },
  "qt-power": {
    "checkedOn": "2026-11-28",
    "scope": "Power purchases from 11 August; 14-day cycle; funded floor and full trading freedoms still to verify.",
    "scopeFr": "Power depuis le 11 août ; cycle 14 jours ; seuil financé et liberté de trading à confirmer.",
    "assessments": {
      "payout": {
        "points": 0.5,
        "source": "https://support.qtfunded.com/support/articles/5744325221663-qt-power",
        "reason": "14-day cycle, four trading days, 80% share."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://support.qtfunded.com/support/articles/5744325221663-qt-power",
        "reason": "35% best-day ratio in both phases and funded."
      },
      "funded": {
        "points": 0.5,
        "source": "https://support.qtfunded.com/support/articles/5744325221663-qt-power",
        "reason": "14-day inactivity rule; generic prohibited strategies."
      }
    }
  }
};
// Reviewed six additional firms, 2026-11-28.
evidence["audacity-capital"] = {
  "audacity-ability-challenge": {
    "checkedOn": "2026-11-28",
    "scope": "Funded baseline, post-2 November rules. Ability One evaluation day requirements conflict; funded rules agreed.",
    "scopeFr": "Phase financée, règles après le 2 novembre. Contradiction sur les jours d'évaluation Ability One, pas sur la phase financée.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://audacity.capital/en/terms-and-conditions/",
        "reason": "10% absolute max loss in funded stage."
      },
      "payout": {
        "points": 1,
        "source": "https://audacity.capital/knowledge-center/ability-challenge/",
        "reason": "First request after 14 days, then fortnightly; no funded minimum days, nominal split starts at 75%."
      },
      "consistency": {
        "points": 1,
        "source": "https://audacity.capital/knowledge-center/trading-guidelines/",
        "reason": "No default best-day concentration rule."
      },
      "trading": {
        "points": 0.5,
        "source": "https://audacity.capital/knowledge-center/trading-guidelines/",
        "reason": "All programmes: weekend/overnight holding permitted; opening, closing (including TP/SL) or adding within three minutes either side of major news is discouraged as excessive risk."
      },
      "funded": {
        "points": 1,
        "source": "https://audacity.capital/en/terms-and-conditions/",
        "reason": "No separate funded profit target or minimum days; ordinary verification and documented risk limits."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 10,
      "source": "https://audacity.capital/en/terms-and-conditions/"
    }
  },
  "audacity-ability-one": {
    "checkedOn": "2026-11-28",
    "scope": "Funded baseline, post-2 November rules. Ability One evaluation day requirements conflict; funded rules agreed.",
    "scopeFr": "Phase financée, règles après le 2 novembre. Contradiction sur les jours d'évaluation Ability One, pas sur la phase financée.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://audacity.capital/en/terms-and-conditions/",
        "reason": "6% absolute max loss in funded stage."
      },
      "payout": {
        "points": 1,
        "source": "https://audacity.capital/knowledge-center/ability-one/",
        "reason": "First request after 14 days, then fortnightly; no funded minimum days, nominal split starts at 75%."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://audacity.capital/knowledge-center/trading-guidelines/",
        "reason": "50% funded net best day, resets after payout."
      },
      "trading": {
        "points": 0.5,
        "source": "https://audacity.capital/knowledge-center/trading-guidelines/",
        "reason": "All programmes: weekend/overnight holding permitted; opening, closing (including TP/SL) or adding within three minutes either side of major news is discouraged as excessive risk."
      },
      "funded": {
        "points": 1,
        "source": "https://audacity.capital/en/terms-and-conditions/",
        "reason": "No separate funded profit target or minimum days; ordinary verification and documented risk limits."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 6,
      "source": "https://audacity.capital/en/terms-and-conditions/",
      "consistency": 50,
      "consistencyBasis": "net"
    }
  },
  "audacity-ftp-instant": {
    "checkedOn": "2026-11-28",
    "scope": "New FTP purchases from 2 November 2026; no scaling. Overall floor moves once, separate daily equity trail.",
    "scopeFr": "FTP depuis le 2 novembre 2026 ; sans scaling. Seuil global ajusté une fois, seuil journalier suiveur.",
    "assessments": {
      "drawdown": {
        "points": 0.5,
        "source": "https://audacity.capital/knowledge-center/ftp/",
        "reason": "10% maximum loss from initial capital, raises to starting balance after 10% profit; distinct 5% intraday equity daily trail."
      },
      "payout": {
        "points": 0.5,
        "source": "https://audacity.capital/knowledge-center/ftp/",
        "reason": "14-day payouts, tiered 75/80/85% share; risk review pauses trading 1–3 working days; method-specific minimum $20 or $1,000."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://audacity.capital/knowledge-center/ftp/",
        "reason": "35% net best day, resets at payout."
      },
      "trading": {
        "points": 0.5,
        "source": "https://audacity.capital/knowledge-center/trading-guidelines/",
        "reason": "All programmes: weekend/overnight holding permitted; opening, closing (including TP/SL) or adding within three minutes either side of major news is discouraged as excessive risk."
      },
      "funded": {
        "points": 0.5,
        "source": "https://audacity.capital/knowledge-center/trading-guidelines/",
        "reason": "One FTP account at a time; intraday equity daily trail imposes extra constraint beyond total loss floor."
      }
    },
    "preset": {
      "consistency": 35,
      "consistencyBasis": "net",
      "lossPercent": 10,
      "source": "https://audacity.capital/knowledge-center/ftp/"
    }
  }
};
evidence["city-traders-imperium"] = {
  "cti-one-current": {
    "checkedOn": "2026-11-28",
    "scope": "Standard funded terms, no VIP enhancements. Direct schedule conflicts between official comparison and product page.",
    "scopeFr": "Phase financée standard, sans avantages VIP. Calendrier Direct contradictoire entre comparatif et fiche.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://citytradersimperium.com/choosing-your-funding-program/",
        "reason": "5% balance-high trailing loss limit; no daily limit."
      },
      "payout": {
        "points": 0.5,
        "source": "https://citytradersimperium.com/choosing-your-funding-program/",
        "reason": "First payout after seven days, then monthly; early withdrawal at 10% net profit."
      },
      "consistency": {
        "points": 1,
        "source": "https://citytradersimperium.com/choosing-your-funding-program/",
        "reason": "No best-day consistency for payout; 20% for scaling on direct routes only."
      },
      "trading": {
        "points": 1,
        "source": "https://citytradersimperium.com/choosing-your-funding-program/",
        "reason": "News/weekend holding and third-party EAs allowed; Martingale allowed on this model."
      },
      "funded": {
        "points": 1,
        "source": "https://citytradersimperium.com/choosing-your-funding-program/",
        "reason": "No additional funded target required to retain account; optional scaling conditions separate."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 5,
      "source": "https://citytradersimperium.com/choosing-your-funding-program/"
    }
  },
  "cti-two-current": {
    "checkedOn": "2026-11-28",
    "scope": "Standard funded terms, no VIP enhancements. Direct schedule conflicts between official comparison and product page.",
    "scopeFr": "Phase financée standard, sans avantages VIP. Calendrier Direct contradictoire entre comparatif et fiche.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://citytradersimperium.com/choosing-your-funding-program/",
        "reason": "10% static loss limit; 5% daily limit."
      },
      "payout": {
        "points": 0.5,
        "source": "https://citytradersimperium.com/choosing-your-funding-program/",
        "reason": "First payout after seven days, then monthly; early withdrawal at 10% net profit."
      },
      "consistency": {
        "points": 1,
        "source": "https://citytradersimperium.com/choosing-your-funding-program/",
        "reason": "No best-day consistency for payout; 20% for scaling on direct routes only."
      },
      "trading": {
        "points": 0.5,
        "source": "https://citytradersimperium.com/choosing-your-funding-program/",
        "reason": "News/weekend holding allowed; own EAs only and no Martingale."
      },
      "funded": {
        "points": 1,
        "source": "https://citytradersimperium.com/choosing-your-funding-program/",
        "reason": "No additional funded target required to retain account; optional scaling conditions separate."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 10,
      "source": "https://citytradersimperium.com/choosing-your-funding-program/"
    }
  },
  "cti-instant-current": {
    "checkedOn": "2026-11-28",
    "scope": "Standard funded terms, no VIP enhancements. Direct schedule conflicts between official comparison and product page.",
    "scopeFr": "Phase financée standard, sans avantages VIP. Calendrier Direct contradictoire entre comparatif et fiche.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://citytradersimperium.com/choosing-your-funding-program/",
        "reason": "6% static loss limit; no daily limit."
      },
      "payout": {
        "points": 0,
        "source": "https://citytradersimperium.com/choosing-your-funding-program/",
        "reason": "Only after reaching 10% to unlock full allocation, then five days; later twice monthly."
      },
      "consistency": {
        "points": 1,
        "source": "https://citytradersimperium.com/choosing-your-funding-program/",
        "reason": "No best-day consistency for payout; 20% for scaling on direct routes only."
      },
      "trading": {
        "points": 0.5,
        "source": "https://citytradersimperium.com/choosing-your-funding-program/",
        "reason": "News/weekend holding allowed; own EAs only and no Martingale."
      },
      "funded": {
        "points": 0.5,
        "source": "https://citytradersimperium.com/choosing-your-funding-program/",
        "reason": "Starts at half nominal allocation; full balance unlocked at 10% profit, already counted as payout gate; scaling limited by 20% rule."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 6,
      "source": "https://citytradersimperium.com/choosing-your-funding-program/"
    }
  },
  "cti-direct-current": {
    "checkedOn": "2026-11-28",
    "scope": "Standard funded terms, no VIP enhancements. Direct schedule conflicts between official comparison and product page.",
    "scopeFr": "Phase financée standard, sans avantages VIP. Calendrier Direct contradictoire entre comparatif et fiche.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://citytradersimperium.com/choosing-your-funding-program/",
        "reason": "6% static loss limit; no daily limit."
      },
      "payout": {
        "points": 0.5,
        "source": "https://citytradersimperium.com/direct-funding/",
        "reason": "Day-five first on-demand request; product page says no fixed schedule, comparison says twice monthly thereafter; conservative rating."
      },
      "consistency": {
        "points": 1,
        "source": "https://citytradersimperium.com/choosing-your-funding-program/",
        "reason": "No best-day consistency for payout; 20% for scaling on direct routes only."
      },
      "trading": {
        "points": 0.5,
        "source": "https://citytradersimperium.com/choosing-your-funding-program/",
        "reason": "News/weekend holding allowed; own EAs only and no Martingale."
      },
      "funded": {
        "points": 1,
        "source": "https://citytradersimperium.com/choosing-your-funding-program/",
        "reason": "No additional funded target required to retain account; optional scaling conditions separate."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 6,
      "source": "https://citytradersimperium.com/choosing-your-funding-program/"
    }
  }
};
evidence["alpha-capital-group"] = {
  "alpha-pro": {
    "checkedOn": "2026-11-28",
    "scope": "Pro 8/10 baseline, biweekly reward; Pro 6 separate loss tier, same published news restrictions.",
    "scopeFr": "Pro 8/10, retrait bimensuel ; Pro 6 avec seuil différent.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://help.alphacapitalgroup.uk/en/articles/8420429-alpha-pro-8-10",
        "reason": "8% or 10% static total loss; Pro 6 is static 6%."
      },
      "payout": {
        "points": 0.5,
        "source": "https://help.alphacapitalgroup.uk/en/articles/10570531-bi-weekly-performance-fee",
        "reason": "14-day cycle; first withdrawal requires five strategy-consistent trading days, $100 minimum."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.alphacapitalgroup.uk/en/articles/10570531-bi-weekly-performance-fee",
        "reason": "Biweekly route has five strategy-consistent days initially, not a numerical best-day percentage."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.alphacapitalgroup.uk/en/articles/8420429-alpha-pro-8-10",
        "reason": "No execution on targeted instruments five minutes either side of major news; no funded weekend hold."
      },
      "funded": {
        "points": 0,
        "source": "https://help.alphacapitalgroup.uk/en/articles/15888623-what-is-the-max-risk-rule-and-how-does-it-work",
        "reason": "Funded max-risk-per-asset hard closure, includes losing positions and linked trades; lot-limit violations may forfeit profits or deactivate account."
      }
    },
    "preset": {
      "drawdown": "static",
      "source": "https://help.alphacapitalgroup.uk/en/articles/8420429-alpha-pro-8-10"
    }
  },
  "alpha-one": {
    "checkedOn": "2026-11-28",
    "scope": "Alpha One 6/10/12, on-demand only.",
    "scopeFr": "Alpha One 6/10/12, retrait à la demande.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://help.alphacapitalgroup.uk/en/articles/10097421-alpha-one-6-10-12",
        "reason": "4/6/8% highest-balance trailing, locks at initial balance."
      },
      "payout": {
        "points": 0.5,
        "source": "https://help.alphacapitalgroup.uk/en/articles/10102634-on-demand-performance-fee",
        "reason": "2% new profit and best-day eligibility; withdrawing all after drawdown lock closes account."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://help.alphacapitalgroup.uk/en/articles/10102634-on-demand-performance-fee",
        "reason": "40% funded net best day per cycle."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.alphacapitalgroup.uk/en/articles/10097421-alpha-one-6-10-12",
        "reason": "No execution on targeted instruments five minutes either side of major news; weekend holding allowed."
      },
      "funded": {
        "points": 0,
        "source": "https://help.alphacapitalgroup.uk/en/articles/15888623-what-is-the-max-risk-rule-and-how-does-it-work",
        "reason": "Funded max-risk-per-asset hard closure, includes losing positions and linked trades; lot-limit violations may forfeit profits or deactivate account."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "source": "https://help.alphacapitalgroup.uk/en/articles/10097421-alpha-one-6-10-12",
      "consistency": 40,
      "consistencyBasis": "net"
    }
  },
  "alpha-direct": {
    "checkedOn": "2026-11-28",
    "scope": "Current Instant-Qualified, on-demand only.",
    "scopeFr": "Instant-Qualified actuel, retrait à la demande.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://help.alphacapitalgroup.uk/en/articles/16003693-alpha-direct",
        "reason": "5% high-water balance trail until initial balance."
      },
      "payout": {
        "points": 0,
        "source": "https://help.alphacapitalgroup.uk/en/articles/10102634-on-demand-performance-fee",
        "reason": "3% permanently retained buffer, then minimum 1% new profit."
      },
      "consistency": {
        "points": 0,
        "source": "https://help.alphacapitalgroup.uk/en/articles/10102634-on-demand-performance-fee",
        "reason": "15% best-day share of net profit."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.alphacapitalgroup.uk/en/articles/16003693-alpha-direct",
        "reason": "No funded weekend holding, no EAs, targeted news window five minutes either side."
      },
      "funded": {
        "points": 0,
        "source": "https://help.alphacapitalgroup.uk/en/articles/15888623-what-is-the-max-risk-rule-and-how-does-it-work",
        "reason": "1% maximum per asset, including linked same-direction losses within ten minutes; hard closure."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 5,
      "consistency": 15,
      "consistencyBasis": "net",
      "profitSplit": 90,
      "source": "https://help.alphacapitalgroup.uk/en/articles/16003693-alpha-direct"
    }
  }
};
evidence["fintokei"] = {
  "finto-start-new": {
    "checkedOn": "2026-11-28",
    "scope": "New StartTrader from 21 October 2026; standard unmodified account.",
    "scopeFr": "StartTrader depuis le 21 octobre 2026 ; compte standard sans restriction individuelle.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://support.fintokei.com/en/articles/17677670-what-s-new-on-starttrader-from-october-21-2026-soft-breach-payouts-and-purchase-rules",
        "reason": "8% static total loss; first 2% daily hit soft breach, second hard."
      },
      "payout": {
        "points": 0,
        "source": "https://support.fintokei.com/en/articles/17677670-what-s-new-on-starttrader-from-october-21-2026-soft-breach-payouts-and-purchase-rules",
        "reason": "14-day cycle, 2% minimum gross profit, lifetime cap $400 over at most two requests."
      },
      "consistency": {
        "points": 1,
        "source": "https://support.fintokei.com/en/articles/17677670-what-s-new-on-starttrader-from-october-21-2026-soft-breach-payouts-and-purchase-rules",
        "reason": "No default percentage consistency; individually imposed restrictions possible."
      },
      "trading": {
        "points": 1,
        "source": "https://support.fintokei.com/en/articles/6538843-can-trade-any-time-hold-positions-over-weekends-and-trade-during-news",
        "reason": "News and overnight/weekend holding allowed."
      },
      "funded": {
        "points": 0,
        "source": "https://support.fintokei.com/en/articles/17677670-what-s-new-on-starttrader-from-october-21-2026-soft-breach-payouts-and-purchase-rules",
        "reason": "Account closes at lifetime payout cap; only eligible first/second lifetime purchases."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 8,
      "profitSplit": 80,
      "source": "https://support.fintokei.com/en/articles/17677670-what-s-new-on-starttrader-from-october-21-2026-soft-breach-payouts-and-purchase-rules"
    }
  },
  "finto-swift-new": {
    "checkedOn": "2026-11-28",
    "scope": "SwiftTrader purchases after 15 July 2026; default account, no individual restrictions.",
    "scopeFr": "SwiftTrader après le 15 juillet 2026 ; compte standard, sans restrictions individuelles.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://support.fintokei.com/en/articles/8409176-what-rules-do-i-have-to-follow-to-keep-my-swifttrader-account",
        "reason": "3% fixed total loss."
      },
      "payout": {
        "points": 0,
        "source": "https://support.fintokei.com/en/articles/8408430-what-is-the-performance-reward-ratio-on-swifttrader-accounts",
        "reason": "Minimum 3% profit every payout; at least three trading days under current model FAQ; 90% split."
      },
      "consistency": {
        "points": 1,
        "source": "https://support.fintokei.com/en/articles/8409176-what-rules-do-i-have-to-follow-to-keep-my-swifttrader-account",
        "reason": "Default 3% daily profit cap applies in evaluation only, no funded best-day percentage stated by model rules."
      },
      "trading": {
        "points": 1,
        "source": "https://support.fintokei.com/en/articles/6538843-can-trade-any-time-hold-positions-over-weekends-and-trade-during-news",
        "reason": "News and overnight/weekend holding allowed."
      },
      "funded": {
        "points": 0.5,
        "source": "https://support.fintokei.com/en/articles/11315957-overview-of-our-risk-management-process-what-will-happen-if-we-identify-any-of-the-prohibited-gambling-or-unsustainable-practices",
        "reason": "Risk warnings may lead to individual restrictions on existing/future accounts; inactivity closure after 30 days."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 3,
      "profitSplit": 90,
      "source": "https://support.fintokei.com/en/articles/8409176-what-rules-do-i-have-to-follow-to-keep-my-swifttrader-account"
    }
  },
  "finto-pro-two": {
    "checkedOn": "2026-11-28",
    "scope": "Current standard ProTrader regular, no individually imposed restrictions.",
    "scopeFr": "ProTrader classique actuel, sans restriction individuelle.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://support.fintokei.com/en/articles/6538826-how-are-the-daily-loss-limit-and-maximum-loss-limit-calculated",
        "reason": "10% static loss, 5% daily reset on EOD equity, monitored on equity."
      },
      "payout": {
        "points": 1,
        "source": "https://support.fintokei.com/en/articles/6538884-how-and-how-often-can-i-withdraw-my-performance-rewards-and-what-is-the-minimum-amount",
        "reason": "14-day standard rewards, ordinary minimums; minimum three trading days under programme rules."
      },
      "consistency": {
        "points": 1,
        "source": "https://support.fintokei.com/en/articles/6538878-what-rules-do-i-have-to-follow-to-keep-my-protrader-account",
        "reason": "No default funded best-day ratio; specific risk-triggered consistency can be imposed."
      },
      "trading": {
        "points": 1,
        "source": "https://support.fintokei.com/en/articles/6538843-can-trade-any-time-hold-positions-over-weekends-and-trade-during-news",
        "reason": "News, overnight and weekend holding allowed."
      },
      "funded": {
        "points": 0.5,
        "source": "https://support.fintokei.com/en/articles/11315957-overview-of-our-risk-management-process-what-will-happen-if-we-identify-any-of-the-prohibited-gambling-or-unsustainable-practices",
        "reason": "Risk warnings can impose additional rules across current/future accounts; inactivity closure after 30 days."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 10,
      "source": "https://support.fintokei.com/en/articles/6538826-how-are-the-daily-loss-limit-and-maximum-loss-limit-calculated"
    }
  },
  "finto-swing-two": {
    "checkedOn": "2026-11-28",
    "scope": "Current standard ProTrader Swing, no individually imposed restrictions.",
    "scopeFr": "ProTrader Swing actuel, sans restriction individuelle.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://support.fintokei.com/en/articles/6538826-how-are-the-daily-loss-limit-and-maximum-loss-limit-calculated",
        "reason": "10% static loss, 5% daily reset on closed balance, monitored on equity."
      },
      "payout": {
        "points": 1,
        "source": "https://support.fintokei.com/en/articles/6538884-how-and-how-often-can-i-withdraw-my-performance-rewards-and-what-is-the-minimum-amount",
        "reason": "14-day standard rewards, ordinary minimums; minimum three trading days under programme rules."
      },
      "consistency": {
        "points": 1,
        "source": "https://support.fintokei.com/en/articles/6538878-what-rules-do-i-have-to-follow-to-keep-my-protrader-account",
        "reason": "No default funded best-day ratio; specific risk-triggered consistency can be imposed."
      },
      "trading": {
        "points": 1,
        "source": "https://support.fintokei.com/en/articles/6538843-can-trade-any-time-hold-positions-over-weekends-and-trade-during-news",
        "reason": "News, overnight and weekend holding allowed."
      },
      "funded": {
        "points": 0.5,
        "source": "https://support.fintokei.com/en/articles/11315957-overview-of-our-risk-management-process-what-will-happen-if-we-identify-any-of-the-prohibited-gambling-or-unsustainable-practices",
        "reason": "Risk warnings can impose additional rules across current/future accounts; inactivity closure after 30 days."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 10,
      "source": "https://support.fintokei.com/en/articles/6538826-how-are-the-daily-loss-limit-and-maximum-loss-limit-calculated"
    }
  }
};
evidence["myfundedfutures"] = {
  "mffu-rapid-intraday": {
    "checkedOn": "2026-11-28",
    "scope": "Sim funded, 50K representative, no optional daily loss limit; live transition included.",
    "scopeFr": "Compte simulé financé 50K représentatif, sans limite journalière optionnelle ; transition live comprise.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://help.myfundedfutures.com/en/articles/13134709-rapid-plan-50k-a-comprehensive-look",
        "reason": "Funded intraday trailing, locks at $100."
      },
      "payout": {
        "points": 0.5,
        "source": "https://help.myfundedfutures.com/en/articles/13134709-rapid-plan-50k-a-comprehensive-look",
        "reason": "Daily withdrawals after buffer $2,100 at 50K; $500 minimum; EOD subsequent fresh-profit requirement."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.myfundedfutures.com/en/articles/13134709-rapid-plan-50k-a-comprehensive-look",
        "reason": "No funded percentage consistency."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.myfundedfutures.com/en/articles/8230009-news-trading-policy",
        "reason": "Tier-one news restrictions and intraday futures closure."
      },
      "funded": {
        "points": 0,
        "source": "https://help.myfundedfutures.com/en/articles/13134718-understanding-rapid-live",
        "reason": "Automatic live transition at $10K net in one day, excess profit forfeited; up to $5K reserve, conditional access."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "profitSplit": 90,
      "source": "https://help.myfundedfutures.com/en/articles/13134709-rapid-plan-50k-a-comprehensive-look"
    }
  },
  "mffu-rapid-eod": {
    "checkedOn": "2026-11-28",
    "scope": "Sim funded, 50K representative, no optional daily loss limit; live transition included.",
    "scopeFr": "Compte simulé financé 50K représentatif, sans limite journalière optionnelle ; transition live comprise.",
    "assessments": {
      "drawdown": {
        "points": 0.5,
        "source": "https://help.myfundedfutures.com/en/articles/16158363-rapid-eod-50k-a-comprehensive-look",
        "reason": "Funded eod trailing, locks at $100."
      },
      "payout": {
        "points": 0.5,
        "source": "https://help.myfundedfutures.com/en/articles/16158363-rapid-eod-50k-a-comprehensive-look",
        "reason": "Daily withdrawals after buffer $2,100 at 50K; $500 minimum; EOD subsequent fresh-profit requirement."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.myfundedfutures.com/en/articles/16158363-rapid-eod-50k-a-comprehensive-look",
        "reason": "No funded percentage consistency."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.myfundedfutures.com/en/articles/8230009-news-trading-policy",
        "reason": "Tier-one news restrictions and intraday futures closure."
      },
      "funded": {
        "points": 0,
        "source": "https://help.myfundedfutures.com/en/articles/13134718-understanding-rapid-live",
        "reason": "Automatic live transition at $10K net in one day, excess profit forfeited; up to $5K reserve, conditional access."
      }
    },
    "preset": {
      "drawdown": "eod",
      "profitSplit": 90,
      "source": "https://help.myfundedfutures.com/en/articles/16158363-rapid-eod-50k-a-comprehensive-look"
    }
  },
  "mffu-pro": {
    "checkedOn": "2026-11-28",
    "scope": "Redesigned Pro from 23 November 2026; older accounts excluded; one-day evaluation add-on shares funded terms.",
    "scopeFr": "Pro refondu à partir du 23 novembre 2026 ; anciens comptes exclus ; option 1 jour mêmes règles financées.",
    "assessments": {
      "drawdown": {
        "points": 0.5,
        "source": "https://help.myfundedfutures.com/en/articles/17573707-comprehensive-look-into-redesigned-pro-plan",
        "reason": "EOD trailing, after first withdrawal locks at nominal account + $100."
      },
      "payout": {
        "points": 0.5,
        "source": "https://help.myfundedfutures.com/en/articles/13745661-payout-policy-overview-best-and-fastest-prop-firm-payouts",
        "reason": "14-day cycle, $1K minimum, buffer requirements with partial withdrawals possible; $100K simulated cap."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.myfundedfutures.com/en/articles/17573707-comprehensive-look-into-redesigned-pro-plan",
        "reason": "No funded best-day percentage rule."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.myfundedfutures.com/en/articles/17573707-comprehensive-look-into-redesigned-pro-plan",
        "reason": "Tier-one news prohibited funded, position limits and session closure."
      },
      "funded": {
        "points": 0,
        "source": "https://help.myfundedfutures.com/en/articles/17573707-comprehensive-look-into-redesigned-pro-plan",
        "reason": "Live transition review after three consecutive payouts, $20K profit or at risk invitation; above $100K forfeited, reserve up to $5K conditional bonus and 21-day cooldown after live breach."
      }
    },
    "preset": {
      "drawdown": "eod",
      "profitSplit": 80,
      "source": "https://help.myfundedfutures.com/en/articles/17573707-comprehensive-look-into-redesigned-pro-plan"
    }
  },
  "mffu-builder": {
    "checkedOn": "2026-11-28",
    "scope": "Partial: existing 25K no-DLL guide now explicitly legacy; need map new Builder purchase cohort.",
    "scopeFr": "Partiel : guide 25K sans DLL désormais Legacy ; nouveau catalogue à réconcilier.",
    "assessments": {
      "drawdown": {
        "points": 0.5,
        "source": "https://help.myfundedfutures.com/en/articles/15862870-builder-plan-25k-legacy-no-dll",
        "reason": "Legacy 25K: EOD trailing."
      },
      "payout": {
        "points": 0.5,
        "source": "https://help.myfundedfutures.com/en/articles/13745661-payout-policy-overview-best-and-fastest-prop-firm-payouts",
        "reason": "Builder overview describes buffer and $1K/$2K caps on 25K/50K."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://help.myfundedfutures.com/en/articles/13745661-payout-policy-overview-best-and-fastest-prop-firm-payouts",
        "reason": "50% funded best-day condition."
      }
    }
  }
};
evidence["fxify"] = {
  "fxi-two-pro": {
    "checkedOn": "2026-11-28",
    "scope": "Current 2-Phase Pro, standard funded account.",
    "scopeFr": "2-Phase Pro actuel, compte financé standard.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://fxify.com/blog/introducing-fxify-2-phase-pro/",
        "reason": "8% fixed overall max loss."
      },
      "payout": {
        "points": 0,
        "source": "https://fxify.com/faqs/all-faqs/two-phase-pro/2-phase-pro-what-is-the-max-profit-on-my-account/",
        "reason": "First two withdrawal caps 5% or $8K on 200K/250K; excess deducted, plus three 0.5% days and ten-day cycle."
      },
      "consistency": {
        "points": 1,
        "source": "https://fxify.com/blog/introducing-fxify-2-phase-pro/",
        "reason": "Comparison says no consistency rule."
      },
      "trading": {
        "points": 1,
        "source": "https://fxify.com/faqs/all-faqs/two-phase-pro/2-phase-pro-can-i-trade-news-on-2-phase-pro/",
        "reason": "News trading permitted, subject to risk guidance; no special news window."
      },
      "funded": {
        "points": 0.5,
        "source": "https://fxify.com/faqs/all-faqs/two-phase-pro/2-phase-pro-whats-the-max-and-minimum-trading-days-is-there-a-specific-time-window-to-complete-the-profit-targets/",
        "reason": "60-day inactivity hard breach; ordinary rules otherwise."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 8,
      "profitSplit": 80,
      "source": "https://fxify.com/blog/introducing-fxify-2-phase-pro/"
    }
  },
  "fxi-instant-lite": {
    "checkedOn": "2026-11-28",
    "scope": "Current Instant Lite, baseline 80% split.",
    "scopeFr": "Instant Lite actuel, partage standard 80 %.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://fxify.com/newsroom/introducing-fxify-instant-funding-lite/",
        "reason": "4% trailing high closed balance."
      },
      "payout": {
        "points": 0.5,
        "source": "https://fxify.com/blog/prop-firm-payout-process/",
        "reason": "First reward after ten calendar days, five traded days, $50 minimum; subsequent schedule to verify."
      },
      "consistency": {
        "points": 0,
        "source": "https://fxify.com/faqs/all-faqs/instant-funding-lite-how-does-the-20-consistency-rule-work/",
        "reason": "20% funded best-day threshold."
      },
      "trading": {
        "points": 0.5,
        "source": "https://fxify.com/faqs/all-faqs/instant-funding-lite-faq/instant-funding-lite-can-i-trade-news-on-instant-funding-lite/",
        "reason": "High-impact window includes automatic TP/SL; gains ineligible, losses retained."
      },
      "funded": {
        "points": 0.5,
        "source": "https://fxify.com/faqs/all-faqs/instant-funding-lite-how-does-the-20-consistency-rule-work/",
        "reason": "60-day inactivity breach."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 4,
      "profitSplit": 80,
      "source": "https://fxify.com/newsroom/introducing-fxify-instant-funding-lite/"
    }
  },
  "fxi-one": {
    "checkedOn": "2026-11-28",
    "scope": "Partial: drawdown and payout evidence, funded news/weekend and remaining rules require exact programme verification.",
    "scopeFr": "Partiel : drawdown et retraits documentés ; règles financées annonces/week-end et autres conditions à confirmer.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://fxify.com/faqs/all-faqs/what-are-the-rules-for-the-assessment-account/",
        "reason": "6% trailing max loss per programme documentation."
      },
      "payout": {
        "points": 0.5,
        "source": "https://fxify.com/faqs/all-faqs/how-do-i-withdraw-my-profits/",
        "reason": "First withdrawal on demand, then 30 days default; 14 days paid add-on."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 6,
      "source": "https://fxify.com/faqs/all-faqs/what-are-the-rules-for-the-assessment-account/"
    }
  },
  "fxi-two-std": {
    "checkedOn": "2026-11-28",
    "scope": "Partial: drawdown and payout evidence, funded news/weekend and remaining rules require exact programme verification.",
    "scopeFr": "Partiel : drawdown et retraits documentés ; règles financées annonces/week-end et autres conditions à confirmer.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://fxify.com/faqs/all-faqs/what-are-the-rules-for-the-assessment-account/",
        "reason": "10% trailing max loss per programme documentation."
      },
      "payout": {
        "points": 0.5,
        "source": "https://fxify.com/faqs/all-faqs/how-do-i-withdraw-my-profits/",
        "reason": "First withdrawal on demand, then 30 days default; 14 days paid add-on."
      },
      "consistency": {
        "points": 1,
        "source": "https://fxify.com/blog/introducing-fxify-2-phase-pro/",
        "reason": "Comparison lists no consistency."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 10,
      "source": "https://fxify.com/faqs/all-faqs/what-are-the-rules-for-the-assessment-account/"
    }
  },
  "fxi-two-classic": {
    "checkedOn": "2026-11-28",
    "scope": "Partial: drawdown and payout evidence, funded news/weekend and remaining rules require exact programme verification.",
    "scopeFr": "Partiel : drawdown et retraits documentés ; règles financées annonces/week-end et autres conditions à confirmer.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://fxify.com/faqs/all-faqs/what-are-the-rules-for-the-assessment-account/",
        "reason": "10% static max loss per programme documentation."
      },
      "payout": {
        "points": 0.5,
        "source": "https://fxify.com/faqs/all-faqs/how-do-i-withdraw-my-profits/",
        "reason": "Classic choice of 14-day 80% or 30-day 100% as detailed in payout overview."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://fxify.com/blog/introducing-fxify-2-phase-pro/",
        "reason": "25% funded best-day rule."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 10,
      "source": "https://fxify.com/faqs/all-faqs/what-are-the-rules-for-the-assessment-account/"
    }
  },
  "fxi-three": {
    "checkedOn": "2026-11-28",
    "scope": "Partial: drawdown and payout evidence, funded news/weekend and remaining rules require exact programme verification.",
    "scopeFr": "Partiel : drawdown et retraits documentés ; règles financées annonces/week-end et autres conditions à confirmer.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://fxify.com/faqs/all-faqs/what-are-the-rules-for-the-assessment-account/",
        "reason": "5% static max loss per programme documentation."
      },
      "payout": {
        "points": 0.5,
        "source": "https://fxify.com/faqs/all-faqs/how-do-i-withdraw-my-profits/",
        "reason": "First withdrawal on demand, then 30 days default; 14 days paid add-on."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 5,
      "source": "https://fxify.com/faqs/all-faqs/what-are-the-rules-for-the-assessment-account/"
    }
  }
};
// Reviewed CFD models, 2026-11-28.
evidence["blue-guardian"] = {
  "bg-one-standard-current": {
    "checkedOn": "2026-11-28",
    "scope": "Current CFD Standard funded, representative 100K; ordinary payout route, no add-ons.",
    "scopeFr": "CFD Standard financé actuel, compte 100K représentatif ; retrait standard, sans option.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://blueguardian.com/faq/articles/18426782-1-step-standard-rules",
        "reason": "6% trail below highest closed balance, locks at initial balance."
      },
      "payout": {
        "points": 0.5,
        "source": "https://blueguardian.com/faq/articles/18426782-1-step-standard-rules",
        "reason": "14-day cycle, three days at 0.5% profit each; 85% nominal share; after drawdown locks, 1% retained buffer."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.blueguardian.com/en/articles/18426605-how-payouts-work",
        "reason": "Published Standard payout conditions do not impose percentage best-day consistency; profitable days counted under payout."
      },
      "trading": {
        "points": 0.5,
        "source": "https://blueguardian.com/faq/articles/18426782-1-step-standard-rules",
        "reason": "Two-minute funded hold, restricted news execution; overnight and weekends allowed."
      },
      "funded": {
        "points": 0,
        "source": "https://blueguardian.com/faq/articles/18426782-1-step-standard-rules",
        "reason": "Guardian Shield at 2% aggregate floating loss: permanent split reduction to 50% on first trigger, termination on second."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 6,
      "source": "https://blueguardian.com/faq/articles/18426782-1-step-standard-rules"
    }
  },
  "bg-two-standard-current": {
    "checkedOn": "2026-11-28",
    "scope": "Current CFD Standard funded, representative 100K; ordinary payout route, no add-ons.",
    "scopeFr": "CFD Standard financé actuel, compte 100K représentatif ; retrait standard, sans option.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://blueguardian.com/faq/articles/18426783-2-step-standard-rules",
        "reason": "8% static loss floor."
      },
      "payout": {
        "points": 0.5,
        "source": "https://blueguardian.com/faq/articles/18426783-2-step-standard-rules",
        "reason": "14-day cycle, three days at 0.5% profit each; 85% nominal share."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.blueguardian.com/en/articles/18426605-how-payouts-work",
        "reason": "Published Standard payout conditions do not impose percentage best-day consistency; profitable days counted under payout."
      },
      "trading": {
        "points": 0.5,
        "source": "https://blueguardian.com/faq/articles/18426783-2-step-standard-rules",
        "reason": "Two-minute funded hold, restricted news execution; overnight and weekends allowed."
      },
      "funded": {
        "points": 0,
        "source": "https://blueguardian.com/faq/articles/18426783-2-step-standard-rules",
        "reason": "Guardian Shield at 2% aggregate floating loss: permanent split reduction to 50% on first trigger, termination on second."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 8,
      "source": "https://blueguardian.com/faq/articles/18426783-2-step-standard-rules"
    }
  },
  "bg-two-nano-current": {
    "checkedOn": "2026-11-28",
    "scope": "Current CFD Nano funded, no add-ons.",
    "scopeFr": "CFD Nano financé actuel, sans option.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://blueguardian.com/faq/articles/18426785-2-step-nano-rules",
        "reason": "10% static max loss."
      },
      "payout": {
        "points": 0.5,
        "source": "https://blueguardian.com/faq/articles/18426785-2-step-nano-rules",
        "reason": "14-day withdrawals limited to 2% of initial account size each cycle; excess stays in account."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://blueguardian.com/faq/articles/18426785-2-step-nano-rules",
        "reason": "Funded best day strictly below 50% of total profit."
      },
      "trading": {
        "points": 0.5,
        "source": "https://blueguardian.com/faq/articles/18426785-2-step-nano-rules",
        "reason": "Two-minute funded holding period; news execution window restricted."
      },
      "funded": {
        "points": 1,
        "source": "https://blueguardian.com/faq/articles/18426785-2-step-nano-rules",
        "reason": "No Guardian Shield or funded minimum trading days; ordinary loss limits and review."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 10,
      "profitSplit": 80,
      "source": "https://blueguardian.com/faq/articles/18426785-2-step-nano-rules"
    }
  },
  "bg-instant-standard-current": {
    "checkedOn": "2026-11-28",
    "scope": "Current CFD Instant Standard 100K baseline; 300K/400K have 15% consistency and 200K+ initial caps.",
    "scopeFr": "CFD Instant Standard 100K ; consistency à 15 % sur 300K/400K et plafonds initiaux dès 200K.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://blueguardian.com/faq/articles/18426779-instant-standard-account-rules",
        "reason": "6% highest closed-balance trailing, locks at initial balance."
      },
      "payout": {
        "points": 0.5,
        "source": "https://blueguardian.com/faq/articles/18426779-instant-standard-account-rules",
        "reason": "Five profitable days at 0.5% each, 1% buffer after drawdown lock; larger tiers have first-two-payout caps."
      },
      "consistency": {
        "points": 0,
        "source": "https://blueguardian.com/faq/articles/18426779-instant-standard-account-rules",
        "reason": "20% funded best day (15% on 300K/400K), strict below threshold."
      },
      "trading": {
        "points": 0.5,
        "source": "https://blueguardian.com/faq/articles/18426779-instant-standard-account-rules",
        "reason": "Two-minute minimum hold and news window restriction; overnight/weekend allowed."
      },
      "funded": {
        "points": 0,
        "source": "https://blueguardian.com/faq/articles/18426779-instant-standard-account-rules",
        "reason": "1% combined floating loss triggers permanent split reduction to 50%, second trigger permanently closes account."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 6,
      "source": "https://blueguardian.com/faq/articles/18426779-instant-standard-account-rules"
    }
  },
  "bg-instant-starter-current": {
    "checkedOn": "2026-11-28",
    "scope": "Single-use 5K CFD Instant Starter, checkout only; current rules.",
    "scopeFr": "CFD Instant Starter 5K à usage unique ; offre accessible par lien de commande.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://blueguardian.com/faq/articles/18426780-instant-starter-account-rules",
        "reason": "5% highest closed-balance trailing."
      },
      "payout": {
        "points": 0,
        "source": "https://blueguardian.com/faq/articles/18426780-instant-starter-account-rules",
        "reason": "Five 0.5% days; one crypto-only request from $100 to $250 gross, at 90% share maximum $225 net before external fees."
      },
      "consistency": {
        "points": 0,
        "source": "https://blueguardian.com/faq/articles/18426780-instant-starter-account-rules",
        "reason": "Best day strictly below 15% of total profit."
      },
      "trading": {
        "points": 0.5,
        "source": "https://blueguardian.com/faq/articles/18426780-instant-starter-account-rules",
        "reason": "Two-minute minimum hold; news, overnight and weekend trading allowed."
      },
      "funded": {
        "points": 0,
        "source": "https://blueguardian.com/faq/articles/18426780-instant-starter-account-rules",
        "reason": "1% floating Shield, permanent split reduction then closure on second trigger; one withdrawal closes the account."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 5,
      "source": "https://blueguardian.com/faq/articles/18426780-instant-starter-account-rules"
    }
  }
};
evidence["brightfunded"] = {
  "bf-one-step-daily-current": {
    "checkedOn": "2026-11-28",
    "scope": "CFD purchased on or after 16 November 2026; no add-ons, standard funded reward.",
    "scopeFr": "CFD acheté à partir du 16 novembre 2026 ; sans option, retrait standard.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://help.brightfunded.com/en/articles/18450305-which-model-is-right-for-me",
        "reason": "6% real-time equity trailing maximum loss."
      },
      "payout": {
        "points": 0.5,
        "source": "https://help.brightfunded.com/en/articles/18457136-how-can-i-request-my-payout",
        "reason": "Daily payout after first funded trade; mandatory 1% retained buffer."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.brightfunded.com/en/articles/18457247-does-brightfunded-have-a-consistency-rule",
        "reason": "No percentage consistency or requirement to keep position size fixed."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.brightfunded.com/en/articles/9241694-can-i-trade-news",
        "reason": "Funded news execution within five minutes either side can invalidate profits; qualifying 48h take-profit exception."
      },
      "funded": {
        "points": 0.5,
        "source": "https://help.brightfunded.com/en/articles/11774572-inactivity-rule-policy",
        "reason": "Hard breach after 30 calendar days inactive; reactivation ending 1 December."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 6,
      "profitSplit": 80,
      "source": "https://help.brightfunded.com/en/articles/18450305-which-model-is-right-for-me"
    }
  },
  "bf-two-step-bright-current": {
    "checkedOn": "2026-11-28",
    "scope": "CFD purchased on or after 16 November 2026; no add-ons, standard funded reward.",
    "scopeFr": "CFD acheté à partir du 16 novembre 2026 ; sans option, retrait standard.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://help.brightfunded.com/en/articles/18450305-which-model-is-right-for-me",
        "reason": "8% static maximum loss."
      },
      "payout": {
        "points": 1,
        "source": "https://help.brightfunded.com/en/articles/18457136-how-can-i-request-my-payout",
        "reason": "14-day payout, no mandatory buffer or minimum withdrawal."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.brightfunded.com/en/articles/18457247-does-brightfunded-have-a-consistency-rule",
        "reason": "No percentage consistency or requirement to keep position size fixed."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.brightfunded.com/en/articles/9241694-can-i-trade-news",
        "reason": "Funded news execution within five minutes either side can invalidate profits; qualifying 48h take-profit exception."
      },
      "funded": {
        "points": 0.5,
        "source": "https://help.brightfunded.com/en/articles/11774572-inactivity-rule-policy",
        "reason": "Hard breach after 30 calendar days inactive; reactivation ending 1 December."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 8,
      "profitSplit": 80,
      "source": "https://help.brightfunded.com/en/articles/18450305-which-model-is-right-for-me"
    }
  },
  "bf-instant-current": {
    "checkedOn": "2026-11-28",
    "scope": "Current CFD Instant from 16 November, no add-ons.",
    "scopeFr": "CFD Instant actuel depuis le 16 novembre, sans option.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://help.brightfunded.com/en/articles/18450305-which-model-is-right-for-me",
        "reason": "5% real-time trailing loss."
      },
      "payout": {
        "points": 0,
        "source": "https://help.brightfunded.com/en/articles/18450315-how-do-payouts-work-on-instant",
        "reason": "Mandatory 3% buffer, 1% minimum payout, five days at 0.5% profit each and largest loss no larger than largest win."
      },
      "consistency": {
        "points": 0,
        "source": "https://help.brightfunded.com/en/articles/18450315-how-do-payouts-work-on-instant",
        "reason": "15% best-day rule resets at payout request."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.brightfunded.com/en/articles/18450305-which-model-is-right-for-me",
        "reason": "Restricted funded news; no weekend holding, auto-close Friday."
      },
      "funded": {
        "points": 0,
        "source": "https://help.brightfunded.com/en/articles/18450321-instant-account-rules",
        "reason": "1% combined floating loss hard breach plus 30-day inactivity hard breach."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 5,
      "profitSplit": 90,
      "source": "https://help.brightfunded.com/en/articles/18450305-which-model-is-right-for-me"
    }
  }
};
evidence["goat-funded-trader"] = {
  "goat-one-new": {
    "checkedOn": "2026-11-28",
    "scope": "Current 1-Step purchased from 10 November 2026, 3% daily loss option, regular 80% reward.",
    "scopeFr": "1-Step actuel acheté à partir du 10 novembre 2026, perte journalière 3 %, retrait standard à 80 %.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://help.goatfundedtrader.com/1-step.html",
        "reason": "6% static loss."
      },
      "payout": {
        "points": 0,
        "source": "https://help.goatfundedtrader.com/1-step.html",
        "reason": "Four 0.5% days per reward; 14-day cycle and first two payouts capped, excess profit deducted; global best-trade vs worst-trade gate and processing fee also apply."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.goatfundedtrader.com/1-step.html",
        "reason": "No percentage best-day consistency; trade-size outcome gate counted under payout."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.goatfundedtrader.com/en/articles/12849041-what-is-the-minimum-holding-time-for-trades",
        "reason": "Funded trades shorter than 60 seconds lose profits but retain losses for purchases from 6 October; news-profit cap applies per release from 24 November (3% current purchases)."
      },
      "funded": {
        "points": 0,
        "source": "https://help.goatfundedtrader.com/en/articles/10742107-what-is-goat-guard",
        "reason": "2% aggregate floating loss triggers reduction to 50%; second trigger closes account. Daily profit cap $3,000 applies."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 6,
      "source": "https://help.goatfundedtrader.com/1-step.html"
    }
  },
  "goat-two-standard-new": {
    "checkedOn": "2026-11-28",
    "scope": "Legacy 2-Step Standard, closed to new purchases; rating deliberately withheld from current product comparison.",
    "scopeFr": "Ancien 2-Step Standard, fermé aux nouveaux achats ; aucune note pour une offre actuelle.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://help.goatfundedtrader.com/2-step-standard.html",
        "reason": "10% static on existing accounts; current FAQ explicitly says this model is no longer available for purchase."
      }
    }
  },
  "goat-instant-goat": {
    "checkedOn": "2026-11-28",
    "scope": "Current purchase from 10 November 2026, ordinary 80% reward route.",
    "scopeFr": "Achat actuel à partir du 10 novembre 2026 ; retrait standard à 80 %.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://help.goatfundedtrader.com/instant-goat.html",
        "reason": "6% real-time equity trailing, reset following payout."
      },
      "payout": {
        "points": 0,
        "source": "https://help.goatfundedtrader.com/en/articles/10742264-how-payouts-work-eligibility-request-processing-and-arrival",
        "reason": "Model requires five days at 0.5% each and 14-day reward cycle; initial caps, best-win vs worst-loss gate and 3% processing fee."
      },
      "consistency": {
        "points": 0,
        "source": "https://help.goatfundedtrader.com/instant-goat.html",
        "reason": "15% best-day consistency."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.goatfundedtrader.com/en/articles/12849041-what-is-the-minimum-holding-time-for-trades",
        "reason": "Funded trades shorter than 60 seconds lose profits but retain losses for purchases from 6 October; news-profit cap applies per release from 24 November (3% current purchases)."
      },
      "funded": {
        "points": 0,
        "source": "https://help.goatfundedtrader.com/instant-goat.html",
        "reason": "2% aggregate open floating loss hard breach; daily profit cap and payout review also apply."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 6,
      "profitSplit": 80,
      "source": "https://help.goatfundedtrader.com/instant-goat.html"
    }
  },
  "goat-instant-premium": {
    "checkedOn": "2026-11-28",
    "scope": "Current purchase from 10 November 2026, ordinary 80% reward route.",
    "scopeFr": "Achat actuel à partir du 10 novembre 2026 ; retrait standard à 80 %.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://help.goatfundedtrader.com/instant-premium.html",
        "reason": "6% real-time equity trailing, reset following payout."
      },
      "payout": {
        "points": 0,
        "source": "https://help.goatfundedtrader.com/en/articles/10742264-how-payouts-work-eligibility-request-processing-and-arrival",
        "reason": "Model requires five days at 0.5% each and 14-day reward cycle; initial caps, best-win vs worst-loss gate and 3% processing fee."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.goatfundedtrader.com/instant-premium.html",
        "reason": "No percentage best-day consistency."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.goatfundedtrader.com/en/articles/12849041-what-is-the-minimum-holding-time-for-trades",
        "reason": "Funded trades shorter than 60 seconds lose profits but retain losses for purchases from 6 October; news-profit cap applies per release from 24 November (3% current purchases)."
      },
      "funded": {
        "points": 0,
        "source": "https://help.goatfundedtrader.com/instant-premium.html",
        "reason": "1% aggregate open floating loss hard breach; daily profit cap and payout review also apply."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 6,
      "profitSplit": 80,
      "source": "https://help.goatfundedtrader.com/instant-premium.html"
    }
  },
  "goat-instant-daily": {
    "checkedOn": "2026-11-28",
    "scope": "Trailing option only, current purchases; newly mentioned static option requires distinct review.",
    "scopeFr": "Option trailing uniquement ; option fixe récemment mentionnée à auditer séparément.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://help.goatfundedtrader.com/instant-daily.html",
        "reason": "3% real-time trailing; first withdrawal locks the floor at initial balance."
      },
      "payout": {
        "points": 0,
        "source": "https://help.goatfundedtrader.com/instant-daily.html",
        "reason": "Daily requests of 1%–3%; withdrawing all profit can close account; best-win vs worst-loss gate, tiered split, processing fee."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.goatfundedtrader.com/instant-daily.html",
        "reason": "No percentage best-day consistency."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.goatfundedtrader.com/en/articles/12849041-what-is-the-minimum-holding-time-for-trades",
        "reason": "Funded trades shorter than 60 seconds lose profits but retain losses for purchases from 6 October; news-profit cap applies per release from 24 November (3% current purchases)."
      },
      "funded": {
        "points": 0,
        "source": "https://help.goatfundedtrader.com/instant-daily.html",
        "reason": "1% aggregate floating loss closes account; account expires after 30 days."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 3,
      "source": "https://help.goatfundedtrader.com/instant-daily.html"
    }
  }
};
// Consolidated programme audit, 2026-11-28.
evidence["apex-trader-funding"] = {
  "apex-eod-current": {
    "checkedOn": "2026-11-28",
    "scope": "Current non-legacy PA, simulated funded stage.",
    "scopeFr": "Compte PA actuel, hors Legacy ; phase financée simulée.",
    "assessments": {
      "drawdown": {
        "points": 0.5,
        "source": "https://apextraderfunding.com/help-center/eod-trailing-drawdown-accounts/eod-performance-accounts-pa/",
        "reason": "End-of-day trailing maximum loss, enforced continuously."
      },
      "payout": {
        "points": 0.5,
        "source": "https://apextraderfunding.com/help-center/eod-payouts/eod-payouts/",
        "reason": "Five qualifying days ($250/day on 50K), payout caps, $500 minimum and safety net; 100% split."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://apextraderfunding.com/help-center/eod-payouts/eod-payouts/",
        "reason": "Best day must be strictly below 50% of profit since last approved payout."
      },
      "trading": {
        "points": 0.5,
        "source": "https://apextraderfunding.com/help-center/uncategorized/prohibited-activities/",
        "reason": "No automation or overnight market-close positions; ordinary news trading allowed, news-chasing prohibited."
      },
      "funded": {
        "points": 0,
        "source": "https://apextraderfunding.com/help-center/eod-payouts/eod-payouts/",
        "reason": "PA closes after six payouts; tier-based position limits and daily loss pauses apply."
      }
    },
    "preset": {
      "drawdown": "eod",
      "profitSplit": 100,
      "source": "https://apextraderfunding.com/help-center/eod-trailing-drawdown-accounts/eod-performance-accounts-pa/"
    }
  },
  "apex-intraday-current": {
    "checkedOn": "2026-11-28",
    "scope": "Current non-legacy PA, simulated funded stage.",
    "scopeFr": "Compte PA actuel, hors Legacy ; phase financée simulée.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://apextraderfunding.com/help-center/intraday-trailing-drawdown-accounts/intraday-trailing-drawdown-performance-accounts-pa/",
        "reason": "Intraday trailing maximum loss."
      },
      "payout": {
        "points": 0.5,
        "source": "https://apextraderfunding.com/help-center/intraday-trailing-drawdown-accounts/intraday-trailing-drawdown-payouts/",
        "reason": "Five qualifying days ($200/day on 50K), payout caps, $500 minimum and safety net; 100% split."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://apextraderfunding.com/help-center/intraday-trailing-drawdown-accounts/intraday-trailing-drawdown-payouts/",
        "reason": "Best day must be strictly below 50% of profit since last approved payout."
      },
      "trading": {
        "points": 0.5,
        "source": "https://apextraderfunding.com/help-center/uncategorized/prohibited-activities/",
        "reason": "No automation or overnight market-close positions; ordinary news trading allowed, news-chasing prohibited."
      },
      "funded": {
        "points": 0,
        "source": "https://apextraderfunding.com/help-center/intraday-trailing-drawdown-accounts/intraday-trailing-drawdown-payouts/",
        "reason": "PA closes after six payouts; tier-based position limits and daily loss pauses apply."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "profitSplit": 100,
      "source": "https://apextraderfunding.com/help-center/intraday-trailing-drawdown-accounts/intraday-trailing-drawdown-performance-accounts-pa/"
    }
  }
};
evidence["e8-markets"] = {
  "e8-one-current": {
    "checkedOn": "2026-11-28",
    "scope": "Classic/perpetual, current funded rules; conflicting 4% vs 6% preset left unselected.",
    "scopeFr": "Classic/perpetual, phase financée ; valeur de drawdown par défaut contradictoire (4 % ou 6 %).",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://help.e8markets.com/en/articles/11775980-e8-one",
        "reason": "Dynamic maximum loss moves with each higher closed balance, not end-of-day; locks at initial balance."
      },
      "payout": {
        "points": 0.5,
        "source": "https://help.e8markets.com/en/articles/9323884-payout-request-on-e8-one",
        "reason": "No per-request cap; non-resetting loss floor and minimum payout above half daily drawdown; may need to leave a buffer."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://help.e8markets.com/en/articles/10450125-40-best-day-rule",
        "reason": "40% funded best day; reset on payout request."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.e8markets.com/en/articles/9185497-can-i-trade-news",
        "reason": "Funded news execution restriction; gains can be deducted."
      },
      "funded": {
        "points": 0.5,
        "source": "https://help.e8markets.com/en/articles/11775980-e8-one",
        "reason": "Account activity required every 60 days; ordinary verification not penalized."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "source": "https://help.e8markets.com/en/articles/11775980-e8-one"
    }
  },
  "e8-pro-current": {
    "checkedOn": "2026-11-28",
    "scope": "Current Classic/perpetual funded account; 8% documented example, customizable.",
    "scopeFr": "Compte financé Classic/perpetual ; exemple à 8 %, personnalisable.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://help.e8markets.com/en/articles/15274219-e8-pro",
        "reason": "Static loss limit until first payout, then raised to initial balance; payout effect assessed under payout."
      },
      "payout": {
        "points": 0,
        "source": "https://help.e8markets.com/en/articles/13653464-payout-request-from-e8-pro",
        "reason": "Daily requests only after 1% new profit; only half the profit is requestable and the other half retained as buffer."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.e8markets.com/en/articles/15274219-e8-pro",
        "reason": "No funded best-day consistency rule."
      },
      "trading": {
        "points": 1,
        "source": "https://help.e8markets.com/en/articles/9185497-can-i-trade-news",
        "reason": "No specific news restrictions; overnight and weekend holding allowed according to official comparison."
      },
      "funded": {
        "points": 0.5,
        "source": "https://help.e8markets.com/en/articles/15274219-e8-pro",
        "reason": "Only 2% of initial account value per day counts as profit; inactivity limit 60 days."
      }
    },
    "preset": {
      "drawdown": "static",
      "source": "https://help.e8markets.com/en/articles/15274219-e8-pro"
    }
  },
  "e8-zero-current": {
    "checkedOn": "2026-11-28",
    "scope": "E8 Zero Starter/Max shared rule rating; purchases from 1 October 2026 19:00 UTC+2; older five-payout cohort excluded.",
    "scopeFr": "E8 Zero Starter/Max shared rule rating; achats à partir du 1er octobre 2026 ; anciens comptes exclus.",
    "assessments": {
      "drawdown": {
        "points": 0.5,
        "source": "https://helpfutures.e8markets.com/en/articles/11864596-eod-dynamic-drawdown",
        "reason": "EOD dynamic loss floor; locks at initial balance on reaching threshold or first withdrawal."
      },
      "payout": {
        "points": 0,
        "source": "https://helpfutures.e8markets.com/en/articles/15935817-e8-zero-starter-and-max",
        "reason": "Daily $100 minimum; size-dependent caps, unused cycle profits cannot be requested later."
      },
      "consistency": {
        "points": 1,
        "source": "https://helpfutures.e8markets.com/en/articles/15935817-e8-zero-starter-and-max",
        "reason": "40% best-day rule in evaluation only, no funded consistency."
      },
      "trading": {
        "points": 0.5,
        "source": "https://helpfutures.e8markets.com/en/articles/15935817-e8-zero-starter-and-max",
        "reason": "News allowed; mandatory daily close and position limits."
      },
      "funded": {
        "points": 0,
        "source": "https://helpfutures.e8markets.com/en/articles/15935817-e8-zero-starter-and-max",
        "reason": "Four payouts then account closed; free new challenge is not replacement funded account. Seven-day activity rule."
      }
    },
    "preset": {
      "drawdown": "eod",
      "source": "https://helpfutures.e8markets.com/en/articles/15935817-e8-zero-starter-and-max"
    }
  },
  "e8-signature-current": {
    "checkedOn": "2026-11-28",
    "scope": "Current Signature Futures, four-payout funded model.",
    "scopeFr": "Signature Futures actuel ; quatre retraits en phase financée.",
    "assessments": {
      "drawdown": {
        "points": 0.5,
        "source": "https://helpfutures.e8markets.com/en/articles/11864596-eod-dynamic-drawdown",
        "reason": "EOD dynamic loss floor, locks at initial balance."
      },
      "payout": {
        "points": 0,
        "source": "https://helpfutures.e8markets.com/en/articles/11940573-payout-caps-and-buffers-for-e8-signature-explained",
        "reason": "Mandatory drawdown-sized buffer, tier/sequence caps; only new cycle profit eligible, no access to retained buffer."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://helpfutures.e8markets.com/en/articles/11755943-e8-signature",
        "reason": "35% funded best-day criterion."
      },
      "trading": {
        "points": 0.5,
        "source": "https://helpfutures.e8markets.com/en/articles/11755943-e8-signature",
        "reason": "News allowed, daily closure and contract limits."
      },
      "funded": {
        "points": 0,
        "source": "https://helpfutures.e8markets.com/en/articles/11940573-payout-caps-and-buffers-for-e8-signature-explained",
        "reason": "Four payouts then funded account closed, regardless of remaining buffer; new challenge offered."
      }
    },
    "preset": {
      "drawdown": "eod",
      "profitSplit": 80,
      "source": "https://helpfutures.e8markets.com/en/articles/11755943-e8-signature"
    }
  }
};
evidence["e8-futures"] = {
  "e8-zero-max": {
    "checkedOn": "2026-11-28",
    "scope": "E8 Zero Max; purchases from 1 October 2026 19:00 UTC+2; older five-payout cohort excluded.",
    "scopeFr": "E8 Zero Max; achats à partir du 1er octobre 2026 ; anciens comptes exclus.",
    "assessments": {
      "drawdown": {
        "points": 0.5,
        "source": "https://helpfutures.e8markets.com/en/articles/11864596-eod-dynamic-drawdown",
        "reason": "EOD dynamic loss floor; locks at initial balance on reaching threshold or first withdrawal."
      },
      "payout": {
        "points": 0,
        "source": "https://helpfutures.e8markets.com/en/articles/15935817-e8-zero-starter-and-max",
        "reason": "Daily $100 minimum; size-dependent caps, unused cycle profits cannot be requested later."
      },
      "consistency": {
        "points": 1,
        "source": "https://helpfutures.e8markets.com/en/articles/15935817-e8-zero-starter-and-max",
        "reason": "40% best-day rule in evaluation only, no funded consistency."
      },
      "trading": {
        "points": 0.5,
        "source": "https://helpfutures.e8markets.com/en/articles/15935817-e8-zero-starter-and-max",
        "reason": "News allowed; mandatory daily close and position limits."
      },
      "funded": {
        "points": 0,
        "source": "https://helpfutures.e8markets.com/en/articles/15935817-e8-zero-starter-and-max",
        "reason": "Four payouts then account closed; free new challenge is not replacement funded account. Seven-day activity rule."
      }
    },
    "preset": {
      "drawdown": "eod",
      "source": "https://helpfutures.e8markets.com/en/articles/15935817-e8-zero-starter-and-max"
    }
  },
  "e8-zero-starter": {
    "checkedOn": "2026-11-28",
    "scope": "E8 Zero Starter; purchases from 1 October 2026 19:00 UTC+2; older five-payout cohort excluded.",
    "scopeFr": "E8 Zero Starter; achats à partir du 1er octobre 2026 ; anciens comptes exclus.",
    "assessments": {
      "drawdown": {
        "points": 0.5,
        "source": "https://helpfutures.e8markets.com/en/articles/11864596-eod-dynamic-drawdown",
        "reason": "EOD dynamic loss floor; locks at initial balance on reaching threshold or first withdrawal."
      },
      "payout": {
        "points": 0,
        "source": "https://helpfutures.e8markets.com/en/articles/15935817-e8-zero-starter-and-max",
        "reason": "Daily $100 minimum; size-dependent caps, unused cycle profits cannot be requested later."
      },
      "consistency": {
        "points": 1,
        "source": "https://helpfutures.e8markets.com/en/articles/15935817-e8-zero-starter-and-max",
        "reason": "40% best-day rule in evaluation only, no funded consistency."
      },
      "trading": {
        "points": 0.5,
        "source": "https://helpfutures.e8markets.com/en/articles/15935817-e8-zero-starter-and-max",
        "reason": "News allowed; mandatory daily close and position limits."
      },
      "funded": {
        "points": 0,
        "source": "https://helpfutures.e8markets.com/en/articles/15935817-e8-zero-starter-and-max",
        "reason": "Four payouts then account closed; free new challenge is not replacement funded account. Seven-day activity rule."
      }
    },
    "preset": {
      "drawdown": "eod",
      "source": "https://helpfutures.e8markets.com/en/articles/15935817-e8-zero-starter-and-max"
    }
  },
  "e8-signature-futures": {
    "checkedOn": "2026-11-28",
    "scope": "Current Signature Futures, four-payout funded model.",
    "scopeFr": "Signature Futures actuel ; quatre retraits en phase financée.",
    "assessments": {
      "drawdown": {
        "points": 0.5,
        "source": "https://helpfutures.e8markets.com/en/articles/11864596-eod-dynamic-drawdown",
        "reason": "EOD dynamic loss floor, locks at initial balance."
      },
      "payout": {
        "points": 0,
        "source": "https://helpfutures.e8markets.com/en/articles/11940573-payout-caps-and-buffers-for-e8-signature-explained",
        "reason": "Mandatory drawdown-sized buffer, tier/sequence caps; only new cycle profit eligible, no access to retained buffer."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://helpfutures.e8markets.com/en/articles/11755943-e8-signature",
        "reason": "35% funded best-day criterion."
      },
      "trading": {
        "points": 0.5,
        "source": "https://helpfutures.e8markets.com/en/articles/11755943-e8-signature",
        "reason": "News allowed, daily closure and contract limits."
      },
      "funded": {
        "points": 0,
        "source": "https://helpfutures.e8markets.com/en/articles/11940573-payout-caps-and-buffers-for-e8-signature-explained",
        "reason": "Four payouts then funded account closed, regardless of remaining buffer; new challenge offered."
      }
    },
    "preset": {
      "drawdown": "eod",
      "profitSplit": 80,
      "source": "https://helpfutures.e8markets.com/en/articles/11755943-e8-signature"
    }
  }
};
evidence["funding-pips"] = {
  "pips-one-step-flex": {
    "checkedOn": "2026-11-28",
    "scope": "Current non-legacy Master; 14-day 80% reward route; no add-ons; published temporary trading restrictions included.",
    "scopeFr": "Master actuel hors anciens comptes ; retrait à 14 jours (80 %), sans option ; restrictions temporaires comprises.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://help.fundingpips.com/hc/en-us/articles/34501697434385-1-Step-Flex",
        "reason": "12% fixed maximum loss from initial capital."
      },
      "payout": {
        "points": 0.5,
        "source": "https://help.fundingpips.com/hc/en-us/articles/34501697434385-1-Step-Flex",
        "reason": "14 calendar days after first executed trade; 1% minimum reward request; 80% nominal share."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.fundingpips.com/hc/en-us/articles/34501697434385-1-Step-Flex",
        "reason": "Percentage best-day requirement is listed for On Demand, not this scheduled reward route."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.fundingpips.com/hc/en-us/articles/34501697434385-1-Step-Flex",
        "reason": "Master news profit restrictions and temporary position closure rules; no swing add-on assumed."
      },
      "funded": {
        "points": 0.5,
        "source": "https://help.fundingpips.com/hc/en-us/articles/34501697434385-1-Step-Flex",
        "reason": "30-day inactivity hard breach; general Master risk requirements. Special On Demand strikes are assessed in its own variant."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 12,
      "profitSplit": 80,
      "source": "https://help.fundingpips.com/hc/en-us/articles/34501697434385-1-Step-Flex"
    }
  },
  "pips-two-step-standard": {
    "checkedOn": "2026-11-28",
    "scope": "Current non-legacy Master; 14-day 80% reward route; no add-ons; published temporary trading restrictions included.",
    "scopeFr": "Master actuel hors anciens comptes ; retrait à 14 jours (80 %), sans option ; restrictions temporaires comprises.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://help.fundingpips.com/hc/en-us/articles/34501809112081-2-Step-Standard",
        "reason": "10% fixed maximum loss from initial capital."
      },
      "payout": {
        "points": 0.5,
        "source": "https://help.fundingpips.com/hc/en-us/articles/34501809112081-2-Step-Standard",
        "reason": "14 calendar days after first executed trade; 1% minimum reward request; 80% nominal share."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.fundingpips.com/hc/en-us/articles/34501809112081-2-Step-Standard",
        "reason": "Percentage best-day requirement is listed for On Demand, not this scheduled reward route."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.fundingpips.com/hc/en-us/articles/34501809112081-2-Step-Standard",
        "reason": "Master news profit restrictions and temporary position closure rules; no swing add-on assumed."
      },
      "funded": {
        "points": 0.5,
        "source": "https://help.fundingpips.com/hc/en-us/articles/34501809112081-2-Step-Standard",
        "reason": "30-day inactivity hard breach; general Master risk requirements. Special On Demand strikes are assessed in its own variant."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 10,
      "profitSplit": 80,
      "source": "https://help.fundingpips.com/hc/en-us/articles/34501809112081-2-Step-Standard"
    }
  },
  "pips-two-step-pro": {
    "checkedOn": "2026-11-28",
    "scope": "Current non-legacy Master; 7-day 80% reward route; no add-ons; published temporary trading restrictions included.",
    "scopeFr": "Master actuel hors anciens comptes ; retrait à 7 jours (80 %), sans option ; restrictions temporaires comprises.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://help.fundingpips.com/hc/en-us/articles/34502027344017-2-Step-Pro-Model",
        "reason": "6% fixed maximum loss from initial capital."
      },
      "payout": {
        "points": 0.5,
        "source": "https://help.fundingpips.com/hc/en-us/articles/34502027344017-2-Step-Pro-Model",
        "reason": "7 calendar days after first executed trade; 1% minimum reward request; 80% nominal share."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.fundingpips.com/hc/en-us/articles/34502027344017-2-Step-Pro-Model",
        "reason": "Percentage best-day requirement is listed for On Demand, not this scheduled reward route."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.fundingpips.com/hc/en-us/articles/34502027344017-2-Step-Pro-Model",
        "reason": "Master news profit restrictions and temporary position closure rules; no swing add-on assumed."
      },
      "funded": {
        "points": 0.5,
        "source": "https://help.fundingpips.com/hc/en-us/articles/34502027344017-2-Step-Pro-Model",
        "reason": "30-day inactivity hard breach; general Master risk requirements. Special On Demand strikes are assessed in its own variant."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 6,
      "profitSplit": 80,
      "source": "https://help.fundingpips.com/hc/en-us/articles/34502027344017-2-Step-Pro-Model"
    }
  },
  "pips-zero-direct": {
    "checkedOn": "2026-11-28",
    "scope": "Current Zero Instant Master, no evaluation.",
    "scopeFr": "Zero Instant Master actuel, sans challenge.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://help.fundingpips.com/hc/en-us/articles/34502157694865-FundingPips-Zero",
        "reason": "5% intraday equity-high trailing loss, locks at initial balance after 5% profit."
      },
      "payout": {
        "points": 0,
        "source": "https://help.fundingpips.com/hc/en-us/articles/34502157694865-FundingPips-Zero",
        "reason": "95% bi-weekly subject to 15% consistency, seven qualified days and additional reward eligibility gates; no ordinary payout access."
      },
      "consistency": {
        "points": 0,
        "source": "https://help.fundingpips.com/hc/en-us/articles/34502157694865-FundingPips-Zero",
        "reason": "15% maximum best-day ratio; delays payout until compliant."
      },
      "trading": {
        "points": 0,
        "source": "https://help.fundingpips.com/hc/en-us/articles/34502157694865-FundingPips-Zero",
        "reason": "Opening or holding through restricted news and holding over weekends cause hard breach."
      },
      "funded": {
        "points": 0,
        "source": "https://help.fundingpips.com/hc/en-us/articles/34502157694865-FundingPips-Zero",
        "reason": "1% maximum aggregate floating loss; seven 0.25% profitable days every rolling 30 days or account closes."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 5,
      "source": "https://help.fundingpips.com/hc/en-us/articles/34502157694865-FundingPips-Zero"
    }
  }
};
evidence["funded-trading-plus"] = {
  "ftp-pnpl-current": {
    "checkedOn": "2026-11-28",
    "scope": "Published Pass Now Pay Later funded rules; activation-account naming and cohort still to reconcile.",
    "scopeFr": "Règles financées Pass Now Pay Later ; appellation Activation Accounts et périmètre à confirmer.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://help.fundedtradingplus.com/pass-now-pay-later-program-information/",
        "reason": "6% intraday equity trailing loss locks at initial balance."
      },
      "payout": {
        "points": 0,
        "source": "https://help.fundedtradingplus.com/pass-now-pay-later-program-information/",
        "reason": "Ten traded days per cycle, minimum 3% withdrawal and 80% share."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://help.fundedtradingplus.com/pass-now-pay-later-program-information/",
        "reason": "25% funded best-day limit."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.fundedtradingplus.com/pass-now-pay-later-program-information/",
        "reason": "Weekend holding allowed; news subject to separate policy."
      },
      "funded": {
        "points": 0.5,
        "source": "https://help.fundedtradingplus.com/pass-now-pay-later-program-information/",
        "reason": "Activation fee after passing and 3% funded daily hard loss limit."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 6,
      "profitSplit": 80,
      "source": "https://help.fundedtradingplus.com/pass-now-pay-later-program-information/"
    }
  },
  "ftp-express-current": {
    "checkedOn": "2026-11-28",
    "scope": "Partial: existing 18 November audit; current help page version/date and funded-specific rules require confirmation.",
    "scopeFr": "Partiel : audit du 18 novembre ; version datée et règles financées à confirmer.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://help.fundedtradingplus.com/1-step-express-program-information/",
        "reason": "6% relative closed-balance trailing maximum loss in prior product audit; exact funded version pending."
      }
    }
  },
  "ftp-classic-current": {
    "checkedOn": "2026-11-28",
    "scope": "Partial: existing 18 November audit; current help page version/date and funded-specific rules require confirmation.",
    "scopeFr": "Partiel : audit du 18 novembre ; version datée et règles financées à confirmer.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://help.fundedtradingplus.com/2-step-classic-program-information/",
        "reason": "8% static maximum loss in prior product audit; exact funded version pending."
      }
    }
  },
  "ftp-instant-current": {
    "checkedOn": "2026-11-28",
    "scope": "Partial: existing 18 November audit; current help page version/date and funded-specific rules require confirmation.",
    "scopeFr": "Partiel : audit du 18 novembre ; version datée et règles financées à confirmer.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://help.fundedtradingplus.com/instant-program-information/",
        "reason": "6% relative closed-balance trailing maximum loss in prior product audit; exact funded version pending."
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

/** Checkout choices with a distinct funded ruleset, not additional purchased products. */
addVariant('ftmo','ftmo-two-step-current','swing-account','Swing account','Compte Swing',
  'CFD 2-Step Swing selected at checkout; 1:30 base leverage, cannot switch from Standard to Swing later.',
  'CFD 2-Step Swing choisi à la commande ; levier de base 1:30, passage de Standard vers Swing impossible.',
  {trading:{points:1,source:'https://ftmo.com/faq/what-is-the-swing-account-type-and-how-does-it-work/',reason:'No special news or market-close holding restrictions; reduced base leverage 1:30, general forbidden practices still apply.'}});
const fnPayoutOptions='https://help.fundednext.com/en/articles/10701585-how-often-will-i-receive-my-performance-reward';
const fnOnDemand=fnPayoutOptions;
for(const [id,loss,cohort,cohortFr] of [
  ['fundednext-stellar-two-current',10,'Current 2-Step checkout','2-Step actuel à la commande'],
  ['fundednext-stellar-lite-current',8,'Lite purchase/reset from 12 October 2026','Lite acheté/réinitialisé à partir du 12 octobre 2026']
] as const){
  addVariant('fundednext',id,'three-day-reward','3 Day Reward','Retrait 3 jours',
    cohort+'; 3-day payout option, no paid add-ons.',cohortFr+' ; retrait 3 jours, sans option payante.',{
      payout:{points:0,source:fnPayoutOptions,reason:'Requires three profitable trading days of at least 1% each per cycle; 60% reward share. Cycle extends until conditions are met.'},
      consistency:{points:1,source:fnPayoutOptions,reason:'No separate percentage best-day rule listed for this option; the three 1% winning-day requirements are counted under payout.'}
    },{drawdown:'static',lossPercent:loss,profitSplit:60,source:fnPayoutOptions});
  addVariant('fundednext',id,'on-demand-reward','On-Demand Reward','Retrait à la demande',
    cohort+'; on-demand payout option, no paid add-ons.',cohortFr+' ; retrait à la demande, sans option payante.',{
      payout:{points:0.5,source:fnOnDemand,reason:'Eligibility at end of day requires at least 2% account growth; 90% reward share, no fixed cycle end. Wallet transfer and compliance review apply.'},
      consistency:{points:0.5,source:fnOnDemand,reason:'Best trading day must not exceed 40% of total generated profit when requesting a reward; eligibility condition, not a daily trading cap.'}
    },{drawdown:'static',lossPercent:loss,profitSplit:90,source:fnOnDemand});
}

// Only this batch's newly reviewed choices receive the new review date.
for(const [slug,id] of [['ftmo','ftmo-two-step-current'],['fundednext','fundednext-stellar-two-current'],['fundednext','fundednext-stellar-lite-current']]){
  for(const item of variants[slug]?.[id]??[]) item.evidence.checkedOn='2026-11-28';
}
addVariant("funding-pips","pips-one-step-flex","on-demand","On Demand 100%","Retrait à la demande 100%","Current Master, on-demand reward route, no add-ons.","Master actuel, retrait à la demande, sans option.",{"payout":{"points":0,"source":"https://help.fundingpips.com/hc/en-us/articles/34501697434385-1-Step-Flex","reason":"Seven qualifying days of at least 0.5% each, 1% minimum reward; 100% nominal share subject to strike reductions."},"consistency":{"points":0.5,"source":"https://help.fundingpips.com/hc/en-us/articles/34501697434385-1-Step-Flex","reason":"35% best day, reset after each processed reward."},"funded":{"points":0,"source":"https://help.fundingpips.com/hc/en-us/articles/34501697434385-1-Step-Flex","reason":"1% loss per aggregated trade idea triggers cumulative strikes: second halves split, third reduces to 20%, fourth closes account; profits from warned ideas deducted."}},{"drawdown":"static","lossPercent":12,"consistency":35,"consistencyBasis":"net","source":"https://help.fundingpips.com/hc/en-us/articles/34501697434385-1-Step-Flex"});
addVariant("funding-pips","pips-two-step-standard","on-demand","On Demand 100%","Retrait à la demande 100%","Current Master, on-demand reward route, no add-ons.","Master actuel, retrait à la demande, sans option.",{"payout":{"points":0,"source":"https://help.fundingpips.com/hc/en-us/articles/34501809112081-2-Step-Standard","reason":"Seven qualifying days of at least 0.5% each, 1% minimum reward; 100% nominal share subject to strike reductions."},"consistency":{"points":0.5,"source":"https://help.fundingpips.com/hc/en-us/articles/34501809112081-2-Step-Standard","reason":"35% best day, reset after each processed reward."},"funded":{"points":0,"source":"https://help.fundingpips.com/hc/en-us/articles/34501809112081-2-Step-Standard","reason":"1% loss per aggregated trade idea triggers cumulative strikes: second halves split, third reduces to 20%, fourth closes account; profits from warned ideas deducted."}},{"drawdown":"static","lossPercent":10,"consistency":35,"consistencyBasis":"net","source":"https://help.fundingpips.com/hc/en-us/articles/34501809112081-2-Step-Standard"});
addVariant("funding-pips","pips-two-step-standard","weekly-60","Weekly 60%","Retrait hebdomadaire 60%","Current Master weekly 60% option, no add-ons.","Master actuel, retrait hebdomadaire 60 %, sans option.",{"payout":{"points":0.5,"source":"https://help.fundingpips.com/hc/en-us/articles/34501809112081-2-Step-Standard","reason":"Seven-day withdrawal schedule; minimum request 1%; 60% share."}},{"drawdown":"static","lossPercent":10,"profitSplit":60,"source":"https://help.fundingpips.com/hc/en-us/articles/34501809112081-2-Step-Standard"});
addVariant("funding-pips","pips-two-step-pro","on-demand","On Demand 100%","Retrait à la demande 100%","Current Master, on-demand reward route, no add-ons.","Master actuel, retrait à la demande, sans option.",{"payout":{"points":0,"source":"https://help.fundingpips.com/hc/en-us/articles/34502027344017-2-Step-Pro-Model","reason":"Seven qualifying days of at least 0.5% each, 1% minimum reward; 100% nominal share subject to strike reductions."},"consistency":{"points":0.5,"source":"https://help.fundingpips.com/hc/en-us/articles/34502027344017-2-Step-Pro-Model","reason":"35% best day, reset after each processed reward."},"funded":{"points":0,"source":"https://help.fundingpips.com/hc/en-us/articles/34502027344017-2-Step-Pro-Model","reason":"1% loss per aggregated trade idea triggers cumulative strikes: second halves split, third reduces to 20%, fourth closes account; profits from warned ideas deducted."}},{"drawdown":"static","lossPercent":6,"consistency":35,"consistencyBasis":"net","source":"https://help.fundingpips.com/hc/en-us/articles/34502027344017-2-Step-Pro-Model"});
addVariant('alpha-capital-group','alpha-pro','on-demand','On-Demand','Retrait à la demande','Pro 8/10, on-demand reward.','Pro 8/10, retrait à la demande.',{payout:{points:.5,source:"https://help.alphacapitalgroup.uk/en/articles/10102634-on-demand-performance-fee",reason:'Minimum 2% gross profit; request on demand once eligible.'},consistency:{points:.5,source:"https://help.alphacapitalgroup.uk/en/articles/10102634-on-demand-performance-fee",reason:'40% net best-day share per payout window.'}},{drawdown:'static',consistency:40,consistencyBasis:'net',source:"https://help.alphacapitalgroup.uk/en/articles/10102634-on-demand-performance-fee"});
// Complete previously partial FXIFY entries without replacing the other verified offers.
Object.assign(evidence.fxify,{
  "fxi-one": {
    "checkedOn": "2026-11-28",
    "scope": "Current standard funded, no paid add-ons.",
    "scopeFr": "Compte financé standard actuel, sans option payante.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://fxify.com/blog/why-most-traders-never-get-a-payout/",
        "reason": "6% highest closed-balance trailing maximum loss."
      },
      "payout": {
        "points": 0.5,
        "source": "https://fxify.com/blog/why-most-traders-never-get-a-payout/",
        "reason": "First profitable funded trade eligible, then 30 days standard; full withdrawal leaves no risk room after floor locks."
      },
      "consistency": {
        "points": 1,
        "source": "https://fxify.com/blog/why-most-traders-never-get-a-payout/",
        "reason": "No consistency at either stage."
      },
      "trading": {
        "points": 1,
        "source": "https://fxify.com/blog/why-most-traders-never-get-a-payout/",
        "reason": "News and weekend holding allowed; EAs permitted on these challenge programmes, subject to general rules."
      },
      "funded": {
        "points": 0.5,
        "source": "https://fxify.com/faqs/all-faqs/what-are-the-rules-for-the-assessment-account/",
        "reason": "60-day inactivity breach; no ongoing funded target, standard account rules apply."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 6,
      "source": "https://fxify.com/faqs/all-faqs/what-are-the-rules-for-the-funded-account/"
    }
  },
  "fxi-two-std": {
    "checkedOn": "2026-11-28",
    "scope": "Current standard funded, no paid add-ons.",
    "scopeFr": "Compte financé standard actuel, sans option payante.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://fxify.com/blog/why-most-traders-never-get-a-payout/",
        "reason": "10% highest closed-balance trailing maximum loss."
      },
      "payout": {
        "points": 0.5,
        "source": "https://fxify.com/blog/why-most-traders-never-get-a-payout/",
        "reason": "First profitable funded trade eligible, then 30 days standard; full withdrawal leaves no risk room after floor locks."
      },
      "consistency": {
        "points": 1,
        "source": "https://fxify.com/blog/why-most-traders-never-get-a-payout/",
        "reason": "No consistency at either stage."
      },
      "trading": {
        "points": 1,
        "source": "https://fxify.com/blog/why-most-traders-never-get-a-payout/",
        "reason": "News and weekend holding allowed; EAs permitted on these challenge programmes, subject to general rules."
      },
      "funded": {
        "points": 0.5,
        "source": "https://fxify.com/faqs/all-faqs/what-are-the-rules-for-the-assessment-account/",
        "reason": "60-day inactivity breach; no ongoing funded target, standard account rules apply."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 10,
      "source": "https://fxify.com/faqs/all-faqs/what-are-the-rules-for-the-funded-account/"
    }
  },
  "fxi-two-classic": {
    "checkedOn": "2026-11-28",
    "scope": "Classic 14-day 80% default; 30-day 100% alternative.",
    "scopeFr": "Classic 14 jours à 80 % ; option 30 jours à 100 %.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://fxify.com/blog/why-most-traders-never-get-a-payout/",
        "reason": "10% static maximum loss."
      },
      "payout": {
        "points": 0.5,
        "source": "https://fxify.com/blog/top-prop-firms-with-two-phase-challenges/",
        "reason": "14-day 80% or 30-day 100% choice; consistency gate counted separately."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://fxify.com/blog/why-most-traders-never-get-a-payout/",
        "reason": "25% best day, historical highest daily profit persists after payout; not a simple net-cycle rule."
      },
      "trading": {
        "points": 1,
        "source": "https://fxify.com/blog/why-most-traders-never-get-a-payout/",
        "reason": "News and weekend holding allowed; EAs permitted on these challenge programmes, subject to general rules."
      },
      "funded": {
        "points": 0.5,
        "source": "https://fxify.com/faqs/all-faqs/what-are-the-rules-for-the-assessment-account/",
        "reason": "60-day inactivity breach; no ongoing funded target, standard account rules apply."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 10,
      "source": "https://fxify.com/blog/top-prop-firms-with-two-phase-challenges/",
      "profitSplit": 80
    }
  },
  "fxi-three": {
    "checkedOn": "2026-11-28",
    "scope": "Current standard funded, no paid add-ons.",
    "scopeFr": "Compte financé standard actuel, sans option payante.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://fxify.com/blog/why-most-traders-never-get-a-payout/",
        "reason": "5% static maximum loss."
      },
      "payout": {
        "points": 1,
        "source": "https://fxify.com/blog/why-most-traders-never-get-a-payout/",
        "reason": "First profitable funded trade eligible, then 30 days standard; no trailing lock."
      },
      "consistency": {
        "points": 1,
        "source": "https://fxify.com/blog/why-most-traders-never-get-a-payout/",
        "reason": "No consistency at either stage."
      },
      "trading": {
        "points": 1,
        "source": "https://fxify.com/blog/why-most-traders-never-get-a-payout/",
        "reason": "News and weekend holding allowed; EAs permitted on these challenge programmes, subject to general rules."
      },
      "funded": {
        "points": 0.5,
        "source": "https://fxify.com/faqs/all-faqs/what-are-the-rules-for-the-assessment-account/",
        "reason": "60-day inactivity breach; no ongoing funded target, standard account rules apply."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 5,
      "source": "https://fxify.com/faqs/all-faqs/what-are-the-rules-for-the-funded-account/"
    }
  }
});
addVariant('fxify','fxi-two-classic','monthly-100','Monthly 100%','Mensuel 100%','Classic 30-day cycle, 100% share.','Classic cycle de 30 jours, partage 100 %.',{payout:{points:.5,source:"https://fxify.com/blog/top-prop-firms-with-two-phase-challenges/",reason:'30-day payout cycle; 100% share.'}},{drawdown:'static',lossPercent:10,profitSplit:100,source:"https://fxify.com/blog/top-prop-firms-with-two-phase-challenges/"});
Object.assign(evidence.fundednext,{
  "fundednext-stellar-instant-current": {
    "checkedOn": "2026-11-28",
    "scope": "Current CFD Stellar Instant, direct simulated, no add-ons; loss floor not reset following payout.",
    "scopeFr": "CFD Stellar Instant actuel, financement simulé direct, sans option ; seuil de perte non réinitialisé après retrait.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://help.fundednext.com/en/articles/17253243-stellar-instant-account",
        "reason": "6% trailing highest closed balance, locks at initial balance; highest floor preserved after withdrawals, remaining gap trails in next cycle."
      },
      "payout": {
        "points": 0,
        "source": "https://help.fundednext.com/en/articles/15586820-does-fundednext-cfds-offer-on-demand-performance-rewards",
        "reason": "5% initial-balance growth threshold checked EOD; placing another trade disables transfer until next check. Starting reward share 70%, later 80%."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.fundednext.com/en/articles/17253243-stellar-instant-account",
        "reason": "Explicitly no percentage best-day consistency; Quick Strike is separate trading-style metric."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.fundednext.com/en/articles/14702484-understanding-the-quick-strike-parameter-on-fundednext",
        "reason": "Quick Strike: profit from trades under 30s monitored per cycle; warning at 20%, forfeiture and possible termination at 30% after warning. High-impact news profit allocation 40% per Stellar Instant rules."
      },
      "funded": {
        "points": 0.5,
        "source": "https://help.fundednext.com/en/articles/17253243-stellar-instant-account",
        "reason": "3% maximum combined risk at any time, including realized and floating losses; no daily loss limit or funded target for retaining account."
      }
    }
  }
});
addVariant('funderpro','funderpro-pro','daily-60','Daily 60%','Quotidien 60%','Pro daily route; no paid add-ons.','Pro quotidien, sans option payante.',{payout:{points:.5,source:"https://support.funderpro.com/en/articles/419844-how-does-reward-frequency-and-eligibility-work-for-funderpro-challenges",reason:'Daily reward requests require profit of at least 1% of initial balance; 60% share.'}},{drawdown:'static',lossPercent:10,profitSplit:60,source:"https://support.funderpro.com/en/articles/377860-what-is-the-drawdown-rule-and-how-does-it-apply-to-funded-account-challenges"});
// Reviewed Claude PR #318: only mapped catalogue IDs; original proposal retained in audits.
Object.assign(evidence["the5ers"],{
  "the5ers-high-stakes-current": {
    "checkedOn": "2026-11-28",
    "scope": "High Stakes Pro stage after the New (10%/5%) or Classic (8%/5%) evaluation; product page read 28 Nov 2026 (New tab displayed; Classic tab not rendered in the capture). Funded rules are shared by both entry tiers. Exact funded tier loss percentage and consistency remain unconfirmed.",
    "scopeFr": "Compte Pro High Stakes après l'évaluation New (10 %/5 %) ou Classic (8 %/5 %) ; règles financées communes.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://the5ers.com/faqs/what-is-drawdown-and-how-is-it-calculated/",
        "reason": "10% maximum loss from the initial balance; the drawdown FAQ example fixes the equity stop-out at $4,500 on a $5,000 account while the allowance grows with retained profit (absolute floor, not trailing)."
      },
      "payout": {
        "points": 0.5,
        "source": "https://the5ers.com/faqs/payout-policy-and-hub-credit-in-the-high-stakes-program/",
        "reason": "Bi-weekly payouts on the Pro account, capped at $3,000 (50K) and $4,000 (100K) per payout with minimum P&L of $300/$500; crypto withdrawals limited to $1,500 per transaction (FAQ updated 24 Nov 2026)."
      },
      "trading": {
        "points": 0.5,
        "source": "https://the5ers.com/faqs/what-are-the-general-rules-for-the-high-stakes-program/",
        "reason": "Executing any order from 2 minutes before to 2 minutes after high-impact news is prohibited; profits are deducted and losses kept. Overnight and weekend holding allowed."
      },
      "funded": {
        "points": 0.5,
        "source": "https://the5ers.com/high-stakes/",
        "reason": "Pro account keeps the 5% maximum daily loss; three profitable days (>=0.5% of initial balance) are required for each scale-up; Pro accounts expire after 60 consecutive days of inactivity."
      }
    },
    "preset": {
      "drawdown": "static",
      "source": "https://the5ers.com/high-stakes/"
    }
  },
  "the5ers-bootcamp-current": {
    "checkedOn": "2026-11-28",
    "scope": "Bootcamp Pro stage ($20K/$100K/$250K start); programme FAQ updated 2 Nov 2026; product page read 28 Nov 2026.",
    "scopeFr": "Compte Pro Bootcamp (départ 20K/100K/250K) ; FAQ du 2 novembre 2026.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://the5ers.com/faqs/what-is-drawdown-and-how-is-it-calculated/",
        "reason": "Pro maximum loss 4% of the account balance at each level (scaling table). The drawdown FAQ (22 Jul 2026) defines the equity stop-out as a fixed floor from the initial balance whose allowance grows with retained profit (Bootcamp example: floor $9,500 stays while profit rises). The dedicated FAQ's fixed floor example prevails over inconsistent educational blog wording; Pro scaling table gives 4%."
      },
      "payout": {
        "points": 0.5,
        "source": "https://the5ers.com/faqs/how-does-the-bootcamp-program-work/",
        "reason": "First payout 14 days after receiving the Pro account, then every 2 weeks; the 14-day cycle restarts every time the account scales."
      },
      "consistency": {
        "points": 1,
        "source": "https://www.the5ers.com/fixed-vs-dynamic-profit-targets/",
        "reason": "Official article states Bootcamp has no published percentage-based consistency rule; programme FAQ and product page list none."
      },
      "trading": {
        "points": 1,
        "source": "https://the5ers.com/faqs/how-does-the-bootcamp-program-work/",
        "reason": "News trading allowed except bracketing strategies; overnight and weekend holding allowed (index swaps high). No mandatory stop loss on any The5ers programme, Bootcamp included."
      },
      "funded": {
        "points": 0.5,
        "source": "https://the5ers.com/faqs/how-does-the-bootcamp-program-work/",
        "reason": "Remaining fee paid to activate the Pro account; 3% daily pause on Pro (trading resumes next day); each active account must use a different trading method; closure after 30 days of inactivity."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 4,
      "source": "https://the5ers.com/bootcamp/"
    }
  },
  "the5ers-hyper-growth-current": {
    "checkedOn": "2026-11-28",
    "scope": "Hyper Growth Pro stages; programme FAQ updated 2 Nov 2026; Growth product page read 28 Nov 2026 (Hyper Growth tab).",
    "scopeFr": "Comptes Pro Hyper Growth ; FAQ du 2 novembre 2026.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://the5ers.com/faqs/how-does-the-hyper-growth-program-work/",
        "reason": "Accounts that hit the stop-out are terminated; the stop-out is 6% below the initial account size. The drawdown FAQ example keeps the floor at $9,400 on a $10,000 account as profit grows."
      },
      "payout": {
        "points": 0.5,
        "source": "https://the5ers.com/faqs/how-does-the-hyper-growth-program-work/",
        "reason": "First payout 14 days after receiving a Pro account, then every 2 weeks; the cycle resets each time the account scales."
      },
      "consistency": {
        "points": 1,
        "source": "https://www.the5ers.com/fixed-vs-dynamic-profit-targets/",
        "reason": "Official article states Hyper Growth has no published percentage-based consistency rule; programme FAQ and product page list none."
      },
      "trading": {
        "points": 1,
        "source": "https://the5ers.com/faqs/how-does-the-hyper-growth-program-work/",
        "reason": "News trading allowed except bracket strategies; weekend holding allowed; leverage 1:30."
      },
      "funded": {
        "points": 0.5,
        "source": "https://the5ers.com/faqs/how-does-the-hyper-growth-program-work/",
        "reason": "3% daily pause disables the account for the rest of the day without termination; same target and loss rules at each Pro stage; accounts inactive for more than 30 consecutive days expire; $40,000 evaluation capital cap per trader."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 6,
      "source": "https://the5ers.com/faqs/how-does-the-hyper-growth-program-work/"
    }
  }
});
Object.assign(evidence["funded-trading-plus"],{
  "ftp-express-current": {
    "checkedOn": "2026-11-28",
    "scope": "Help article last updated 12 August 2026 (MM.DD.YYYY help-centre format) (format of the help centre); funded FT+ Trader simulated live account.",
    "scopeFr": "Compte FT+ Trader du 1-Step Express ; article mis à jour le 12 août 2026.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://help.fundedtradingplus.com/1-step-express-program-information/",
        "reason": "6% maximum loss trailing the closed-balance high watermark until it reaches the initial balance (balance-based relative trailing)."
      },
      "payout": {
        "points": 1,
        "source": "https://help.fundedtradingplus.com/1-step-express-program-information/",
        "reason": "Withdrawal as soon as the account is in profit, from day 1, minimum $50, then every 7 days; 80% split."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.fundedtradingplus.com/consistency-rule/",
        "reason": "The dedicated Consistency Rule article lists only the 2-Step Classic (35% evaluation / 50% funded); the Express article lists its rules without any consistency requirement."
      },
      "trading": {
        "points": 1,
        "source": "https://help.fundedtradingplus.com/1-step-express-program-information/",
        "reason": "Overnight and weekend holding allowed; no stop-loss requirement; news trading allowed (Risk Review Policy), with margin-utilisation review triggers rather than hard limits."
      },
      "funded": {
        "points": 0.5,
        "source": "https://help.fundedtradingplus.com/1-step-express-program-information/",
        "reason": "4% daily drawdown on the prior closed balance remains a hard limit; 30-day inactivity is a hard breach; scale requests need a flat account and risk review."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 6,
      "profitSplit": 80,
      "source": "https://help.fundedtradingplus.com/1-step-express-program-information/"
    }
  },
  "ftp-classic-current": {
    "checkedOn": "2026-11-28",
    "scope": "Help article last updated 07.02.2026; funded FT+ Trader simulated live account.",
    "scopeFr": "Compte FT+ Trader du 2-Step Classic ; article du 07.02.2026.",
    "assessments": {
      "drawdown": {
        "points": 1,
        "source": "https://help.fundedtradingplus.com/2-step-classic-program-information/",
        "reason": "8% static maximum drawdown fixed on the initial balance, unaffected by profits."
      },
      "payout": {
        "points": 0.5,
        "source": "https://help.fundedtradingplus.com/2-step-classic-program-information/",
        "reason": "First withdrawal 10 calendar days after account creation, then every 10 days; minimum 1% of the initial balance; 80% split. The 50% consistency gate is counted under consistency. 1% minimum is a material gate."
      },
      "consistency": {
        "points": 0.5,
        "source": "https://help.fundedtradingplus.com/consistency-rule/",
        "reason": "Funded 50% best-day limit over the payout period; payout is blocked until met, not forfeited; resets after each payout. The programme worked example includes retained pre-withdrawal profit in denominator, so no standard net-cycle preset."
      },
      "trading": {
        "points": 1,
        "source": "https://help.fundedtradingplus.com/risk-review-policy/",
        "reason": "News and scalping allowed subject to risk review; weekend holding permitted per programme page. The 3% symbol hard breach is counted under funded instead."
      },
      "funded": {
        "points": 0,
        "source": "https://help.fundedtradingplus.com/2-step-classic-program-information/",
        "reason": "3% per-symbol equity loss hard breach in funded phase; inactivity also applies."
      }
    },
    "preset": {
      "drawdown": "static",
      "lossPercent": 8,
      "profitSplit": 80,
      "source": "https://help.fundedtradingplus.com/2-step-classic-program-information/"
    }
  },
  "ftp-instant-current": {
    "checkedOn": "2026-11-28",
    "scope": "Help article last updated 12 August 2026 (MM.DD.YYYY help-centre format); no evaluation.",
    "scopeFr": "Compte Instant ; article du 12 août 2026.",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://help.fundedtradingplus.com/instant-program-information/",
        "reason": "6% maximum loss trailing the balance high watermark until it reaches the initial balance."
      },
      "payout": {
        "points": 1,
        "source": "https://help.fundedtradingplus.com/instant-program-information/",
        "reason": "Withdrawal from day 1 once in profit, minimum $50, then every 7 days; researcher contract and KYC required (ordinary)."
      },
      "consistency": {
        "points": 1,
        "source": "https://help.fundedtradingplus.com/consistency-rule/",
        "reason": "Consistency Rule article lists only the 2-Step Classic; the Instant article lists its rules without any consistency requirement."
      },
      "trading": {
        "points": 0.5,
        "source": "https://help.fundedtradingplus.com/instant-program-information/",
        "reason": "No weekend holding: all trades must be closed by 4:30 pm EST on Friday or are closed by the system. News allowed per Risk Review Policy; no stop-loss requirement."
      },
      "funded": {
        "points": 0.5,
        "source": "https://help.fundedtradingplus.com/instant-program-information/",
        "reason": "6% daily drawdown on the higher of prior balance or equity remains a hard limit; 30-day inactivity hard breach; scale requests need a flat account and risk review."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 6,
      "profitSplit": 80,
      "source": "https://help.fundedtradingplus.com/instant-program-information/"
    }
  },
  "ftp-pnpl-current": {
    "checkedOn": "2026-11-28",
    "scope": "PNPL article updated 09.24.2026; the Activation Accounts funded-rules article (09.18.2026) describes the same structure (fee to start, activation fee after passing, 6% equity trailing, 3% daily, 25% consistency). Payout minimum differs from generic Activation FAQ; specific PNPL 3% withdrawal threshold used.",
    "scopeFr": "PNPL, phase financée ; article du 24.09.2026, cohérent avec « Activation Accounts » (18.09.2026).",
    "assessments": {
      "drawdown": {
        "points": 0,
        "source": "https://help.fundedtradingplus.com/pass-now-pay-later-program-information/",
        "reason": "Funded 6% trailing on equity, following the equity high until it locks at the starting balance."
      },
      "payout": {
        "points": 0.5,
        "source": "https://help.fundedtradingplus.com/pass-now-pay-later-program-information/",
        "reason": "First payout after 10 trading days and at least 10 trading days between payouts; 3% minimum (PNPL page: minimum withdrawal 3% of balance; Activation page: 3% profit threshold, withdrawal from $50); 80% split. Moderate gate, no cap."
      },
      "consistency": {
        "points": 0,
        "source": "https://help.fundedtradingplus.com/pass-now-pay-later-program-information/",
        "reason": "25% best-day limit at payout request (delays, does not cancel); below the 30% threshold of the rubric."
      },
      "trading": {
        "points": 1,
        "source": "https://help.fundedtradingplus.com/pass-now-pay-later-program-information/",
        "reason": "News trading, weekend holding and weekend trading allowed on the funded stage (subject to the FT+ news policy; the policy link on the page is a placeholder, and the Risk Review Policy states news trading is allowed)."
      },
      "funded": {
        "points": 0.5,
        "source": "https://help.fundedtradingplus.com/pass-now-pay-later-program-information/",
        "reason": "Activation fee due after passing; 3% balance-based daily loss is a hard breach; no scaling."
      }
    },
    "preset": {
      "drawdown": "intraday",
      "lossPercent": 6,
      "profitSplit": 80,
      "source": "https://help.fundedtradingplus.com/pass-now-pay-later-program-information/"
    }
  }
});
addVariant('for-traders','fortraders-1-step','fast-static','Fast Static','Fast Static','Current Forex Fast Static, from 8 June 2026.','Forex Fast Static actuel depuis le 8 juin 2026.',{drawdown:{points:1,source:"https://help.fortraders.com/en/articles/15376206-fast-static-account-forex",reason:'6% fixed floor, unchanged by profits and withdrawals.'},payout:{points:.5,source:"https://help.fortraders.com/en/articles/15376206-fast-static-account-forex",reason:'14-day rewards; three qualifying days, $100 minimum and $15K cap.'}},{drawdown:'static',lossPercent:6,source:"https://help.fortraders.com/en/articles/15376206-fast-static-account-forex"});
addVariant('sure-leverage','slf-instant-zero','static','Static loss limit','Perte maximale statique','Zero with optional static 4% floor.','Zero avec option seuil statique 4 %.',{drawdown:{points:1,source:"https://help.sureleveragefunding.com/en/articles/16546983-instant-funding-zero-no-consistency-rule",reason:'4% fixed below initial balance, not trailing.'}},{drawdown:'static',lossPercent:4,source:"https://help.sureleveragefunding.com/en/articles/16546983-instant-funding-zero-no-consistency-rule"});

// Current distinct SFX Instant purchases: shared catalogue ID until pricing remap; no inherited numeric preset.
addVariant('sfx-funded','sfx-instant','instant-pro','Instant Pro','Instant Pro','Current Pro from 19 October 2026; separate purchase, not a paid add-on.','Pro depuis le 19 octobre 2026 ; offre distincte.',{"drawdown":{"points":0,"source":"https://intercom.help/sfx-15a6836318fd/en/articles/17653907-instant-pro-how-it-works","reason":"6% proportional trailing from peak account value, explicitly resets after payout."},"payout":{"points":0,"source":"https://intercom.help/sfx-15a6836318fd/en/articles/17653903-when-can-i-get-paid-in-the-instant-pro-program","reason":"Five qualifying days at 0.75% each and 4% profit per cycle; on demand, nominal 85% share."},"consistency":{"points":0,"source":"https://intercom.help/sfx-15a6836318fd/en/articles/17653907-instant-pro-how-it-works","reason":"20% SSI."},"trading":{"points":0.5,"source":"https://intercom.help/sfx-15a6836318fd/en/articles/17653913-can-i-trade-during-news-in-the-instant-pro-program","reason":"Restricted red-folder window ±2 minutes, including automatic executions; first violation removes affected profit, second closes account."},"funded":{"points":0,"source":"https://intercom.help/sfx-15a6836318fd/en/articles/17653907-instant-pro-how-it-works","reason":"2% combined floating loss closes account immediately; 1% on 300K/400K."}});
addVariant('sfx-funded','sfx-instant','instant-flex','Instant Flex','Instant Flex','Current Flex from 19 October 2026; separate purchase, not a paid add-on.','Flex depuis le 19 octobre 2026 ; offre distincte.',{"drawdown":{"points":0,"source":"https://intercom.help/sfx-15a6836318fd/en/articles/17305154-instant-flex-how-it-works","reason":"5% proportional trailing from peak account value, not fixed-dollar."},"payout":{"points":0,"source":"https://intercom.help/sfx-15a6836318fd/en/articles/17653861-when-can-i-get-paid-in-the-instant-flex-program","reason":"Five qualifying days at 0.75% each and 4% profit per cycle; biweekly, nominal 85% share."},"consistency":{"points":1,"source":"https://intercom.help/sfx-15a6836318fd/en/articles/17305154-instant-flex-how-it-works","reason":"Explicitly no consistency rule."},"trading":{"points":0.5,"source":"https://intercom.help/sfx-15a6836318fd/en/articles/17305210-can-i-trade-during-news-in-the-instant-flex-program","reason":"Restricted red-folder window ±2 minutes, including automatic executions; first violation removes affected profit, second closes account."},"funded":{"points":0,"source":"https://intercom.help/sfx-15a6836318fd/en/articles/17305154-instant-flex-how-it-works","reason":"1% combined floating loss first reduces split to 40%, second closes account."}});
export function getProgrammeVariants(slug:string,id:string):ProgrammeVariant[]{return variants[slug]?.[id]??[]}

export const CRITERIA
:Criterion[]=['drawdown','payout','consistency','trading','funded'];
export function getProgrammeEvidence(slug:string,id:string,variant?:string){return variant?getProgrammeVariants(slug,id).find(x=>x.id===variant)?.evidence:evidence[slug]?.[id]}
export function programmeFlexibility(item:ProgrammeEvidence|undefined){
  const valid=CRITERIA.flatMap(key=>{const a=item?.assessments[key];return a&&[0,.5,1].includes(a.points)&&a.reason.trim()&&a.source.startsWith('https://')?[a]:[]});
  const known=valid.reduce((sum,a)=>sum+a.points,0);
  const disposition=item?.reviewOutcome;
  const status=disposition?.kind??(valid.length===5?'verified':'partial');
  const range: [number,number]|null=status==='estimated'?[known,known+5-valid.length]:null;
  const estimate=disposition?.estimate;
  const estimatedStars=range&&typeof estimate==='number'&&Number.isFinite(estimate)&&estimate>=range[0]&&estimate<=range[1]?estimate:null;
  return {verified:valid.length,stars:!disposition&&valid.length===5?known:null,status,estimatedStars,range};
}
