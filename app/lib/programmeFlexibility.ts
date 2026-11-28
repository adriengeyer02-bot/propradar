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
export function getProgrammeVariants(slug:string,id:string):ProgrammeVariant[]{return variants[slug]?.[id]??[]}

export const CRITERIA
:Criterion[]=['drawdown','payout','consistency','trading','funded'];
export function getProgrammeEvidence(slug:string,id:string,variant?:string){return variant?getProgrammeVariants(slug,id).find(x=>x.id===variant)?.evidence:evidence[slug]?.[id]}
export function programmeFlexibility(item:ProgrammeEvidence|undefined){
  const valid=CRITERIA.flatMap(key=>{const a=item?.assessments[key];return a&&[0,.5,1].includes(a.points)&&a.reason.trim()&&a.source.startsWith('https://')?[a]:[]});
  return {verified:valid.length,stars:valid.length===5?valid.reduce((sum,a)=>sum+a.points,0):null};
}
