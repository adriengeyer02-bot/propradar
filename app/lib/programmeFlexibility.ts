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

// Batch 4: independent exact-product records, source-checked on 27 November.
Object.assign(evidence, {
  "apex-trader-funding": {
    "apex-eod-current": {
      "checkedOn": "2026-11-27",
      "scope": "New-product PA, not Legacy or limited Instant funding. Purchases under March 2026 rules.",
      "scopeFr": "PA nouvelle génération, hors Legacy et Instant promotionnel. Règles depuis mars 2026.",
      "assessments": {
        "drawdown": {
          "points": 0.5,
          "source": "https://apextraderfunding.com/help-center/eod-trailing-drawdown-accounts/eod-performance-accounts-pa/",
          "reason": "EOD balance high sets next session threshold; real-time breach enforcement."
        },
        "payout": {
          "points": 0,
          "source": "https://apextraderfunding.com/help-center/eod-payouts/eod-payouts/",
          "reason": "Five qualifying profitable days, permanent drawdown+$100 reserve, size/cycle caps, maximum six approved payouts followed by closure."
        },
        "consistency": {
          "points": 0.5,
          "source": "https://apextraderfunding.com/help-center/eod-payouts/eod-payouts/",
          "reason": "Largest positive day must be strictly below 50% of profit since previous approved payout; noncompliance delays request."
        },
        "trading": {
          "points": 0,
          "source": "https://apextraderfunding.com/help-center/uncategorized/prohibited-activities/",
          "reason": "Automation forbidden; discretionary strategy and risk-management limits, no hedging, daily close; ordinary directional news trading allowed."
        },
        "funded": {
          "points": 0.5,
          "source": "https://apextraderfunding.com/help-center/billing/inactivity-policy-on-performance-accounts-pa/",
          "reason": "Two days of at least $50 net profit every rolling 30 days or closure; tier-based position limits and soft daily loss stop. Six-payout closure counted under payout."
        }
      },
      "preset": {
        "drawdown": "eod",
        "profitSplit": 100,
        "source": "https://apextraderfunding.com/help-center/eod-trailing-drawdown-accounts/eod-performance-accounts-pa/"
      }
    },
    "apex-intraday-current": {
      "checkedOn": "2026-11-27",
      "scope": "New-product PA, not Legacy or limited Instant funding. Purchases under March 2026 rules.",
      "scopeFr": "PA nouvelle génération, hors Legacy et Instant promotionnel. Règles depuis mars 2026.",
      "assessments": {
        "drawdown": {
          "points": 0,
          "source": "https://apextraderfunding.com/help-center/intraday-trailing-drawdown-accounts/intraday-trailing-drawdown-performance-accounts-pa/",
          "reason": "Trailing high-water equity includes open profit; touching floor closes PA."
        },
        "payout": {
          "points": 0,
          "source": "https://apextraderfunding.com/help-center/intraday-trailing-drawdown-accounts/intraday-trailing-drawdown-payouts/",
          "reason": "Five qualifying profitable days, permanent drawdown+$100 reserve, size/cycle caps, maximum six approved payouts followed by closure."
        },
        "consistency": {
          "points": 0.5,
          "source": "https://apextraderfunding.com/help-center/intraday-trailing-drawdown-accounts/intraday-trailing-drawdown-payouts/",
          "reason": "Largest positive day must be strictly below 50% of profit since previous approved payout; noncompliance delays request."
        },
        "trading": {
          "points": 0,
          "source": "https://apextraderfunding.com/help-center/uncategorized/prohibited-activities/",
          "reason": "Automation forbidden; discretionary strategy and risk-management limits, no hedging, daily close; ordinary directional news trading allowed."
        },
        "funded": {
          "points": 0.5,
          "source": "https://apextraderfunding.com/help-center/billing/inactivity-policy-on-performance-accounts-pa/",
          "reason": "Two days of at least $50 net profit every rolling 30 days or closure; tier-based position limits and soft daily loss stop. Six-payout closure counted under payout."
        }
      },
      "preset": {
        "drawdown": "intraday",
        "profitSplit": 100,
        "source": "https://apextraderfunding.com/help-center/intraday-trailing-drawdown-accounts/intraday-trailing-drawdown-performance-accounts-pa/"
      }
    }
  },
  "earn2trade": {
    "e2t-tcp": {
      "checkedOn": "2026-11-27",
      "scope": "TCP 25/50/100K, first LiveSim stage; subscriptions after 2 November 2026.",
      "scopeFr": "TCP 25/50/100K, première phase LiveSim ; souscriptions après le 2 novembre 2026.",
      "assessments": {
        "drawdown": {
          "points": 0.5,
          "source": "https://help.earn2trade.com/en/articles/8117088-drawdown-types",
          "reason": "LiveSim EOD; ordinary live accounts use real-time trailing instead; larger TCP fixed-floor stages are separate."
        },
        "payout": {
          "points": 0.5,
          "source": "https://help.earn2trade.com/en/articles/5452472-what-is-the-withdrawal-policy",
          "reason": "Five new qualifying days per withdrawal, weekly processing, reduced 50% share below size-dependent thresholds; LiveSim cumulative limit triggers live transition."
        },
        "consistency": {
          "points": 1,
          "source": "https://help.earn2trade.com/en/articles/3849975-what-is-the-maintain-consistency-rule",
          "reason": "30% best-day threshold only in evaluation, absent from LiveSim and Live."
        },
        "trading": {
          "points": 0.5,
          "source": "https://help.earn2trade.com/en/articles/6877364-what-happens-when-i-complete-my-evaluation",
          "reason": "Trade copying forbidden, prescribed close times and prohibited instruments including BTC and ETH futures."
        },
        "funded": {
          "points": 0.5,
          "source": "https://help.earn2trade.com/en/articles/6877364-what-happens-when-i-complete-my-evaluation",
          "reason": "Hard daily loss limit and fixed contract count for current cohort; later progression to live. Withdrawal share and transition thresholds assessed under payouts."
        }
      },
      "preset": {
        "drawdown": "eod",
        "source": "https://help.earn2trade.com/en/articles/8117088-drawdown-types"
      }
    },
    "e2t-gauntlet": {
      "checkedOn": "2026-11-27",
      "scope": "Gauntlet Mini 50–200K, initial LiveSim path; subscriptions after 2 November 2026.",
      "scopeFr": "Gauntlet Mini 50–200K, première phase LiveSim ; souscriptions après le 2 novembre 2026.",
      "assessments": {
        "drawdown": {
          "points": 0.5,
          "source": "https://help.earn2trade.com/en/articles/8117088-drawdown-types",
          "reason": "LiveSim EOD; ordinary live accounts use real-time trailing instead; larger TCP fixed-floor stages are separate."
        },
        "payout": {
          "points": 0.5,
          "source": "https://help.earn2trade.com/en/articles/5452472-what-is-the-withdrawal-policy",
          "reason": "Five new qualifying days per withdrawal, weekly processing, reduced 50% share below size-dependent thresholds; LiveSim cumulative limit triggers live transition."
        },
        "consistency": {
          "points": 1,
          "source": "https://help.earn2trade.com/en/articles/3849975-what-is-the-maintain-consistency-rule",
          "reason": "30% best-day threshold only in evaluation, absent from LiveSim and Live."
        },
        "trading": {
          "points": 0.5,
          "source": "https://help.earn2trade.com/en/articles/6877364-what-happens-when-i-complete-my-evaluation",
          "reason": "Trade copying forbidden, prescribed close times and prohibited instruments including BTC and ETH futures."
        },
        "funded": {
          "points": 0.5,
          "source": "https://help.earn2trade.com/en/articles/6877364-what-happens-when-i-complete-my-evaluation",
          "reason": "Hard daily loss limit and fixed contract count for current cohort; later progression to live. Withdrawal share and transition thresholds assessed under payouts."
        }
      },
      "preset": {
        "drawdown": "eod",
        "source": "https://help.earn2trade.com/en/articles/8117088-drawdown-types"
      }
    },
    "e2t-tcp-large-fixed": {
      "checkedOn": "2026-11-27",
      "scope": "Earned TCP 200K/400K live progression stage, not a separately purchasable evaluation; current policy.",
      "scopeFr": "Phase live TCP 200K/400K obtenue par progression, pas un challenge achetable séparément.",
      "assessments": {
        "drawdown": {
          "points": 1,
          "source": "https://help.earn2trade.com/en/articles/8117088-drawdown-types",
          "reason": "Fixed loss floor exclusive to TCP 200K/400K funded stages."
        },
        "payout": {
          "points": 0.5,
          "source": "https://help.earn2trade.com/en/articles/5452472-what-is-the-withdrawal-policy",
          "reason": "Five new qualifying days per withdrawal; TCP200 share 50% below $5K, 80% above; TCP400 fixed 60/40."
        },
        "consistency": {
          "points": 1,
          "source": "https://help.earn2trade.com/en/articles/3849975-what-is-the-maintain-consistency-rule",
          "reason": "No funded best-day percentage."
        },
        "trading": {
          "points": 0.5,
          "source": "https://help.earn2trade.com/en/articles/6877364-what-happens-when-i-complete-my-evaluation",
          "reason": "No trade copying; close-time and instrument restrictions."
        },
        "funded": {
          "points": 0.5,
          "source": "https://help.earn2trade.com/en/articles/6877364-what-happens-when-i-complete-my-evaluation",
          "reason": "Hard daily loss limit and one live account maximum."
        }
      },
      "preset": {
        "drawdown": "static",
        "source": "https://help.earn2trade.com/en/articles/8117088-drawdown-types"
      }
    }
  },
  "myfundedfutures": {
    "mffu-builder": {
      "checkedOn": "2026-11-27",
      "scope": "Current Builder 50K default loss budget ($2K); other sizes and checkout alternatives require exact mapping.",
      "scopeFr": "Builder 50K standard (perte max 2 000 $) ; autres tailles et options à distinguer.",
      "assessments": {
        "drawdown": {
          "points": 0.5,
          "source": "https://help.myfundedfutures.com/en/articles/14290805-builder-plan-50k-a-comprehensive-guide",
          "reason": "EOD high-water floor; locks $100 above starting balance."
        },
        "payout": {
          "points": 0.5,
          "source": "https://help.myfundedfutures.com/en/articles/14290805-builder-plan-50k-a-comprehensive-guide",
          "reason": "Buffer $2,100, min $500 additional net profit; max $2K per cycle; five sim payouts lead to live."
        },
        "consistency": {
          "points": 0.5,
          "source": "https://help.myfundedfutures.com/en/articles/14290805-builder-plan-50k-a-comprehensive-guide",
          "reason": "50% of cycle net profits in funded stage; resets on approved payout; no evaluation rule."
        },
        "trading": {
          "points": 1,
          "source": "https://help.myfundedfutures.com/en/articles/14290805-builder-plan-50k-a-comprehensive-guide",
          "reason": "News unrestricted; session closing required, ordinary futures market conduct rules."
        },
        "funded": {
          "points": 0.5,
          "source": "https://help.myfundedfutures.com/en/articles/14290805-builder-plan-50k-a-comprehensive-guide",
          "reason": "Soft daily loss pause, seven-day inactivity closure, 21-day cooldown on live breach; only one active Builder 50K sim account."
        }
      },
      "preset": {
        "drawdown": "eod",
        "consistency": 50,
        "consistencyBasis": "net",
        "profitSplit": 80,
        "source": "https://help.myfundedfutures.com/en/articles/14290805-builder-plan-50k-a-comprehensive-guide"
      }
    },
    "mffu-rapid-intraday": {
      "checkedOn": "2026-11-27",
      "scope": "Rapid Intraday 50K baseline, funded phase.",
      "scopeFr": "Rapid Intraday 50K standard, phase financée.",
      "assessments": {
        "drawdown": {
          "points": 0,
          "source": "https://help.myfundedfutures.com/en/articles/13134709-rapid-plan-50k-a-comprehensive-look",
          "reason": "Funded intraday equity high-water trail, $100 lock; evaluation is EOD."
        },
        "payout": {
          "points": 0.5,
          "source": "https://help.myfundedfutures.com/en/articles/13134709-rapid-plan-50k-a-comprehensive-look",
          "reason": "Initial buffer (50K $2,100), daily withdrawal cycle, minimum net profit required; no normal per-request cap on Rapid EOD."
        },
        "consistency": {
          "points": 1,
          "source": "https://help.myfundedfutures.com/en/articles/11994562-consistency-rule-at-my-fundedfutures",
          "reason": "Percentage consistency is evaluation-only, no funded best-day restriction."
        },
        "trading": {
          "points": 0.5,
          "source": "https://help.myfundedfutures.com/en/articles/13134709-rapid-plan-50k-a-comprehensive-look",
          "reason": "Top-tier economic releases restricted in simulated funded stage."
        },
        "funded": {
          "points": 0,
          "source": "https://help.myfundedfutures.com/en/articles/13134718-understanding-rapid-live",
          "reason": "Automatic live transition on $10K single-day net profit, excess that day forfeited; up to $5K reserved, other sim accounts/purchases suspended."
        }
      },
      "preset": {
        "drawdown": "intraday",
        "profitSplit": 90,
        "source": "https://help.myfundedfutures.com/en/articles/13134709-rapid-plan-50k-a-comprehensive-look"
      }
    },
    "mffu-rapid-eod": {
      "checkedOn": "2026-11-27",
      "scope": "Rapid EOD 25K/50K, default no DLL; add-on is separate.",
      "scopeFr": "Rapid EOD 25K/50K, standard sans DLL ; option distincte.",
      "assessments": {
        "drawdown": {
          "points": 0.5,
          "source": "https://help.myfundedfutures.com/en/articles/18337038-rapid-eod-with-dll-a-detailed-look",
          "reason": "Funded EOD trailing, $100 lock."
        },
        "payout": {
          "points": 0.5,
          "source": "https://help.myfundedfutures.com/en/articles/18337038-rapid-eod-with-dll-a-detailed-look",
          "reason": "Initial buffer (50K $2,100), daily withdrawal cycle, minimum net profit required; no normal per-request cap on Rapid EOD."
        },
        "consistency": {
          "points": 1,
          "source": "https://help.myfundedfutures.com/en/articles/11994562-consistency-rule-at-my-fundedfutures",
          "reason": "Percentage consistency is evaluation-only, no funded best-day restriction."
        },
        "trading": {
          "points": 0.5,
          "source": "https://help.myfundedfutures.com/en/articles/18337038-rapid-eod-with-dll-a-detailed-look",
          "reason": "Top-tier economic releases restricted in simulated funded stage."
        },
        "funded": {
          "points": 0,
          "source": "https://help.myfundedfutures.com/en/articles/13134718-understanding-rapid-live",
          "reason": "Automatic live transition on $10K single-day net profit, excess that day forfeited; up to $5K reserved, other sim accounts/purchases suspended."
        }
      },
      "preset": {
        "drawdown": "eod",
        "profitSplit": 90,
        "source": "https://help.myfundedfutures.com/en/articles/18337038-rapid-eod-with-dll-a-detailed-look"
      }
    },
    "mffu-pro": {
      "checkedOn": "2026-11-27",
      "scope": "Redesigned Pro, purchases after 23 November 2026; standard 50/100/150K. One-day evaluation option shares funded rules.",
      "scopeFr": "Pro remanié, achats après le 23 novembre 2026 ; 50/100/150K standard.",
      "assessments": {
        "drawdown": {
          "points": 0.5,
          "source": "https://help.myfundedfutures.com/en/articles/17573707-comprehensive-look-into-redesigned-pro-plan",
          "reason": "Funded EOD drawdown by size, no DLL."
        },
        "payout": {
          "points": 0.5,
          "source": "https://help.myfundedfutures.com/en/articles/17573707-comprehensive-look-into-redesigned-pro-plan",
          "reason": "14-day cycle, buffer and $1K minimum; cap $100K per user in simulated stage."
        },
        "consistency": {
          "points": 1,
          "source": "https://help.myfundedfutures.com/en/articles/17573707-comprehensive-look-into-redesigned-pro-plan",
          "reason": "No funded best-day restriction; 50% evaluation only except One-Day option."
        },
        "trading": {
          "points": 0.5,
          "source": "https://help.myfundedfutures.com/en/articles/17573707-comprehensive-look-into-redesigned-pro-plan",
          "reason": "Top-tier news prohibited in simulated funded stage."
        },
        "funded": {
          "points": 0.5,
          "source": "https://help.myfundedfutures.com/en/articles/17573707-comprehensive-look-into-redesigned-pro-plan",
          "reason": "One active funded Pro per size for new cohort; live review after qualifying performance, separate reserve terms."
        }
      },
      "preset": {
        "drawdown": "eod",
        "profitSplit": 80,
        "source": "https://help.myfundedfutures.com/en/articles/17573707-comprehensive-look-into-redesigned-pro-plan"
      }
    }
  }
});
addVariant('myfundedfutures','mffu-rapid-eod','dll','Rapid EOD — DLL','Rapid EOD — DLL','Current 25K/50K with optional soft daily loss stop.','25K/50K actuels avec pause journalière optionnelle.',{funded:{points:0,source:'https://help.myfundedfutures.com/en/articles/13134718-understanding-rapid-live',reason:'Same forfeiture and reserve at live transition; additional soft daily pause of $500/$1,000, not account termination.'},drawdown:{points:.5,source:'https://help.myfundedfutures.com/en/articles/18337038-rapid-eod-with-dll-a-detailed-look',reason:'EOD trailing and soft daily loss pause selected at checkout; funded loss distance unchanged.'}});
evidence.myfundedfutures['mffu-signature-current'] = {
  "checkedOn": "2026-11-27",
  "scope": "Current permanent Signature 5K/10K/20K, formerly Studio; simulated funded stage.",
  "scopeFr": "Signature permanent 5K/10K/20K, anciennement Studio ; phase financée simulée.",
  "assessments": {
    "drawdown": {
      "points": 1,
      "source": "https://help.myfundedfutures.com/en/articles/18543937-signature-plans-a-comprehensive-guide",
      "reason": "Static loss floor throughout evaluation and sim funded, no daily loss stop."
    },
    "payout": {
      "points": 1,
      "source": "https://help.myfundedfutures.com/en/articles/18543937-signature-plans-a-comprehensive-guide",
      "reason": "Anytime after positions closed; no buffer, waiting period or qualifying days, ordinary $100/$250 minimum."
    },
    "consistency": {
      "points": 1,
      "source": "https://help.myfundedfutures.com/en/articles/18543937-signature-plans-a-comprehensive-guide",
      "reason": "No best-day ratio in evaluation or simulated funded."
    },
    "trading": {
      "points": 0.5,
      "source": "https://help.myfundedfutures.com/en/articles/18543937-signature-plans-a-comprehensive-guide",
      "reason": "News allowed; micro contracts only, Hyperprop-only platform."
    },
    "funded": {
      "points": 0.5,
      "source": "https://help.myfundedfutures.com/en/articles/18543937-signature-plans-a-comprehensive-guide",
      "reason": "Daily profit caps $2,500/$5,000/$10,000, one account, live transition after five approved payouts or $5,000 total requested; live starts with limited allocation."
    }
  },
  "preset": {
    "drawdown": "static",
    "lossPercent": 5,
    "profitSplit": 80,
    "source": "https://help.myfundedfutures.com/en/articles/18543937-signature-plans-a-comprehensive-guide"
  }
};

// Batch 5 — scoped Futures funded-stage product evidence.
Object.assign(evidence, {
  "e8-futures": {
    "e8-signature-futures": {
      "checkedOn": "2026-11-27",
      "scope": "Current Signature Futures performance account.",
      "scopeFr": "Signature Futures actuel, phase Performance.",
      "assessments": {
        "drawdown": {
          "points": 0.5,
          "source": "https://e8futures.com/e8-signature-futures",
          "reason": "EOD trailing 2.66–4%, locks at initial balance."
        },
        "payout": {
          "points": 0,
          "source": "https://e8futures.com/e8-signature-futures",
          "reason": "Permanent reserve equal to drawdown, tier and sequence caps, five new days earning at least 0.3% between withdrawals."
        },
        "consistency": {
          "points": 0.5,
          "source": "https://e8futures.com/e8-signature-futures",
          "reason": "35% best-day limit in performance stage."
        },
        "trading": {
          "points": 1,
          "source": "https://e8futures.com/e8-signature-futures",
          "reason": "News and own-account copying allowed; ordinary futures session and contract limits."
        },
        "funded": {
          "points": 0,
          "source": "https://e8futures.com/e8-signature-futures",
          "reason": "Account ends after four payouts; replacement is a new challenge, not uninterrupted funding."
        }
      },
      "preset": {
        "drawdown": "eod",
        "profitSplit": 80,
        "source": "https://e8futures.com/e8-signature-futures"
      }
    },
    "e8-zero-max": {
      "checkedOn": "2026-11-27",
      "scope": "Current Zero MAX Futures, default 80% split, performance stage. Official FAQ and cycle diagram say four payouts; one marketing line mentions a fifth.",
      "scopeFr": "Zero MAX Futures actuel, partage standard 80 %, phase Performance. FAQ et schéma : quatre retraits ; une phrase commerciale évoque un cinquième.",
      "assessments": {
        "drawdown": {
          "points": 0.5,
          "source": "https://e8futures.com/e8-zero",
          "reason": "3% EOD dynamic loss limit, locks at initial balance on first payout or sufficient closed profit."
        },
        "payout": {
          "points": 0,
          "source": "https://e8futures.com/e8-zero",
          "reason": "Daily access but caps $1,500–$7,000; leftover profit in each cycle becomes permanently non-withdrawable buffer."
        },
        "consistency": {
          "points": 1,
          "source": "https://e8futures.com/e8-zero",
          "reason": "40% applies only to evaluation; no funded best-day requirement."
        },
        "trading": {
          "points": 0.5,
          "source": "https://e8futures.com/e8-zero",
          "reason": "Futures performance contract scaling; narrower initial contract allocation than challenge."
        },
        "funded": {
          "points": 0,
          "source": "https://e8futures.com/e8-zero",
          "reason": "FAQ says the account is deactivated after four payouts, regardless of remaining reserve; new challenge issued."
        }
      },
      "preset": {
        "drawdown": "eod",
        "lossPercent": 3,
        "profitSplit": 80,
        "source": "https://e8futures.com/e8-zero"
      }
    }
  },
  "top-one-futures": {
    "top-one-elite-daily": {
      "checkedOn": "2026-11-27",
      "scope": "Elite DAILY V2 purchased from May 11, 2026; sim-funded stage.",
      "scopeFr": "Elite DAILY V2 à partir du 11 mai 2026 ; phase financée simulée.",
      "assessments": {
        "drawdown": {
          "points": 0.5,
          "source": "https://help.toponefutures.com/en/articles/15056075-elite-daily-v2-overview",
          "reason": "EOD trailing $1,000–$3,500 in funded stage; daily loss pause."
        },
        "payout": {
          "points": 0,
          "source": "https://help.toponefutures.com/en/articles/15056446-elite-daily-v2-daily-payout-rules",
          "reason": "Permanent $1,500–$4,500 buffer, $750–$2,250 request caps; after first payout 50% of each request must be newly generated profits."
        },
        "consistency": {
          "points": 1,
          "source": "https://help.toponefutures.com/en/articles/15056446-elite-daily-v2-daily-payout-rules",
          "reason": "No funded best-day rule; progression relates to new payout profits, not concentration."
        },
        "trading": {
          "points": 0.5,
          "source": "https://help.toponefutures.com/en/articles/15056075-elite-daily-v2-overview",
          "reason": "Funded orders cannot execute or close within two minutes either side of designated news; contract scaling."
        },
        "funded": {
          "points": 0.5,
          "source": "https://help.toponefutures.com/en/articles/11003130-path-to-trading-live",
          "reason": "Risk review after three payouts or earlier; other sim accounts disabled during transition."
        }
      },
      "preset": {
        "drawdown": "eod",
        "profitSplit": 90,
        "source": "https://help.toponefutures.com/en/articles/15056075-elite-daily-v2-overview"
      }
    },
    "top-one-instant-sim-funded": {
      "checkedOn": "2026-11-27",
      "scope": "Instant Sim Funded 2.0 purchased on or after July 27, 2026.",
      "scopeFr": "Instant Sim Funded 2.0 acheté à partir du 27 juillet 2026.",
      "assessments": {
        "drawdown": {
          "points": 0.5,
          "source": "https://help.toponefutures.com/en/articles/11020805-overview-of-the-instant-sim-funded-program",
          "reason": "EOD trailing $1,000–$5,250, locks at initial balance plus $100; soft daily loss limit."
        },
        "payout": {
          "points": 0,
          "source": "https://help.toponefutures.com/en/articles/12718038-instant-sim-funded-account-payout-requirements",
          "reason": "New-cycle profit targets of 6%, 5% and 4% for the first three payouts; size-specific $1,000–$3,000 caps."
        },
        "consistency": {
          "points": 0,
          "source": "https://help.toponefutures.com/en/articles/11020805-overview-of-the-instant-sim-funded-program",
          "reason": "20% funded best-day concentration limit, resets on payout."
        },
        "trading": {
          "points": 0.5,
          "source": "https://help.toponefutures.com/en/articles/11680891-copy-trading-policy",
          "reason": "Copy trading restricted to matching programme and account size; no contract scaling on Instant."
        },
        "funded": {
          "points": 0.5,
          "source": "https://help.toponefutures.com/en/articles/11003130-path-to-trading-live",
          "reason": "Risk review at three payouts or earlier; other sim accounts disabled during transition."
        }
      },
      "preset": {
        "drawdown": "eod",
        "profitSplit": 90,
        "source": "https://help.toponefutures.com/en/articles/11020805-overview-of-the-instant-sim-funded-program"
      }
    },
    "top-one-ignite": {
      "checkedOn": "2026-11-27",
      "scope": "Current Ignite instant simulated funded programme.",
      "scopeFr": "Ignite actuel, financement simulé immédiat.",
      "assessments": {
        "drawdown": {
          "points": 0.5,
          "source": "https://help.toponefutures.com/en/articles/12671168-ignite-accounts-overview",
          "reason": "EOD trailing 4% maximum loss and 2% soft daily stop."
        },
        "payout": {
          "points": 0,
          "source": "https://help.toponefutures.com/en/articles/12671168-ignite-accounts-overview",
          "reason": "New 5% target every payout, $250 minimum and $500–$2,000 maximum per request."
        },
        "consistency": {
          "points": 0,
          "source": "https://help.toponefutures.com/en/articles/12671168-ignite-accounts-overview",
          "reason": "15% maximum best-day concentration."
        },
        "trading": {
          "points": 0.5,
          "source": "https://help.toponefutures.com/en/articles/12671168-ignite-accounts-overview",
          "reason": "No bots or overnight trading, minimum ten-second hold; copying restricted to matching Ignite sizes."
        },
        "funded": {
          "points": 0.5,
          "source": "https://help.toponefutures.com/en/articles/11003130-path-to-trading-live",
          "reason": "Risk review after three payouts or earlier; additional sim accounts disabled during transition."
        }
      },
      "preset": {
        "drawdown": "eod",
        "lossPercent": 4,
        "profitSplit": 90,
        "source": "https://help.toponefutures.com/en/articles/12671168-ignite-accounts-overview"
      }
    }
  }
});
export const CRITERIA
:Criterion[]=['drawdown','payout','consistency','trading','funded'];
export function getProgrammeEvidence(slug:string,id:string,variant?:string){return variant?getProgrammeVariants(slug,id).find(x=>x.id===variant)?.evidence:evidence[slug]?.[id]}
export function programmeFlexibility(item:ProgrammeEvidence|undefined){
  const valid=CRITERIA.flatMap(key=>{const a=item?.assessments[key];return a&&[0,.5,1].includes(a.points)&&a.reason.trim()&&a.source.startsWith('https://')?[a]:[]});
  return {verified:valid.length,stars:valid.length===5?valid.reduce((sum,a)=>sum+a.points,0):null};
}
