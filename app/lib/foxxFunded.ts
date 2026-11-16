import type { PropFirm } from './propFirms';

/** Initial sourced review, 2026-11-15. Zero founded / USD price means unconfirmed, not a claimed year or converted fee. */
export const foxxFunded: PropFirm = {
  "id": 198,
  "slug": "foxx-funded",
  "name": "FOXX Funded",
  "status": "À surveiller",
  "score": 49,
  "founded": 0,
  "headquarters": "Saint Lucia / United Arab Emirates (site disclosures)",
  "bestFor": "Forex / CFD programmes with strict payout conditions",
  "verdict": "49/100: published rules and fees are identifiable, but the withheld TrustScore, illustrative payout showcase and discretionary reward clauses justify high vigilance. This first review does not authenticate customer transfers or determine individual disputes.",
  "priceFrom": 0,
  "nativePriceFrom": {
    "amount": 109,
    "currency": "EUR"
  },
  "profitSplit": 70,
  "drawdownType": "Static",
  "newsTrading": "Restricted",
  "eaAllowed": "Variable",
  "payoutDelay": "1-Step: first after 14 trading days, then every 7; Instant: first after 4 weeks, then every 2 weeks; account review applies.",
  "incidents": 3,
  "incidentsDetails": [
    "2026-11-15: Trustpilot withholds the rating for foxx-funded.com after a guideline breach and reports removing fake reviews. The linked profile is currently named Ponjas Marketing.",
    "2026-11-15: Official terms, sections 22.3–22.4, give the firm discretion over account approval and payout eligibility, including refusal of rewards. This is a contractual risk, not proof of a particular unpaid withdrawal.",
    "2026-11-15: The official payout page labels its cards as examples and says the leaderboard is not verified client payouts. These displays are excluded from PropRadar's payout proof."
  ],
  "styles": [
    "Forex",
    "CFD",
    "Indices",
    "Metals",
    "Crypto",
    "Day trading",
    "Swing"
  ],
  "legalVerified": false,
  "transparencyScore": 8,
  "payoutProof": false,
  "recentRuleChange": false,
  "lastReviewed": "2026-11-15",
  "logoDomain": "foxx-funded.com",
  "communitySignal": "The domain-linked Trustpilot profile contains both payout praise and refusal complaints. Company replies attribute refusals to rule breaches. Neither side's account has been independently verified here.",
  "products": [
    {
      "id": "foxx-1-step",
      "name": "1-Step Evaluation",
      "type": "Challenge",
      "description": "One simulated MT5 evaluation, with published fees from €109 (10K) to €1,990 (500K), before codes. Fees are in euros; account sizes are in US dollars. The first payout share is 70%, not the advertised maximum of 90%.",
      "accountSizeMin": 10000,
      "accountSizeMax": 500000,
      "profitTarget": "7%",
      "maxDailyLoss": "4%",
      "maxDrawdown": "8% static, based on initial capital",
      "profitSplit": "70% first payout; 80% second; 90% from the third",
      "platforms": [
        "MetaTrader 5"
      ],
      "tradableAssets": [
        "Forex",
        "Indices",
        "Metals",
        "Crypto"
      ],
      "minTradingDays": "5 trading days; no evaluation time limit",
      "hasConsistencyRule": true,
      "consistencyRule": "25% maximum profit per trade idea; 2% maximum risk per trade. Stop-loss required on every funded trade. Check the contractual strategy restrictions.",
      "linkToStart": "https://www.foxx-funded.com/#funding-programs",
      "isPopular": true
    },
    {
      "id": "foxx-instant",
      "name": "Instant Funding — documented 100K example",
      "type": "Instant funding",
      "description": "Direct simulated access without an evaluation target. The FAQ documents a 100K example; a complete current fee and size list was not confirmed. Its 50%–80% payout ladder conflicts with the separate landing page's up-to-90% wording.",
      "accountSizeMin": 100000,
      "accountSizeMax": 100000,
      "profitTarget": "No evaluation target",
      "maxDailyLoss": "4% of each day's starting balance, including floating losses and costs",
      "maxDrawdown": "8% static, based on initial capital",
      "profitSplit": "50%, 55%, 60%, 65%, 70%, then 80% across successive withdrawals",
      "platforms": [
        "MetaTrader 5"
      ],
      "tradableAssets": [
        "Forex",
        "Indices",
        "Metals",
        "Crypto"
      ],
      "minTradingDays": "5 days shown in the Instant Funding risk overview",
      "hasConsistencyRule": true,
      "consistencyRule": "25% maximum profit per trade idea. Instant Funding also applies lot-size consistency (0.25× to 2× the historical average) and a 15% initial-balance profit cap per payout cycle.",
      "linkToStart": "https://www.foxx-funded.com/instant-funding/"
    }
  ],
  "strengths": [
    "Named companies, accessible terms and published programme limits.",
    "MT5 access to forex, indices, metals and crypto.",
    "One-step fee schedule captured in its original euro currency."
  ],
  "weaknesses": [
    "Trustpilot rating withheld; the domain-linked profile uses a different company name.",
    "No independently authenticated payout trail established in this review.",
    "The guide permits copy software, while terms section 22.4 lists trade copiers among possible payout refusal grounds.",
    "Instant profit-share figures differ between the landing page and the payout FAQ."
  ],
  "sources": [
    {
      "label": "FOXX Funded — official programmes, euro fees and company disclosures",
      "url": "https://www.foxx-funded.com/"
    },
    {
      "label": "FOXX Funded — rules and interactive FAQ (both programmes)",
      "url": "https://www.foxx-funded.com/faqs/"
    },
    {
      "label": "FOXX Funded — payout schedule and illustrative showcase",
      "url": "https://www.foxx-funded.com/payout/"
    },
    {
      "label": "FOXX Funded — terms, especially sections 1.1, 14 and 22",
      "url": "https://www.foxx-funded.com/terms-and-conditions/"
    },
    {
      "label": "Trustpilot — foxx-funded.com (profile named Ponjas Marketing)",
      "url": "https://www.trustpilot.com/review/foxx-funded.com"
    },
    {
      "label": "FOXX Funded — Instant Funding marketing page",
      "url": "https://www.foxx-funded.com/instant-funding/"
    },
    {
      "label": "FOXX Funded — AML/KYC policy, dated 26 October 2024",
      "url": "https://www.foxx-funded.com/assets/amlPolicy-BCJe7msf.pdf"
    },
    {
      "label": "Trustpilot — company replies explaining disputed payout refusals",
      "url": "https://fr.trustpilot.com/review/foxx-funded.com?page=2"
    }
  ],
  "commercialRelationship": "Aucune",
  "auditStatus": "Partiellement vérifié",
  "auditSummary": "Initial editorial review dated 15 November 2026. Score 49/100 reflects clear basic programme data but weak review reliability, unverified payout displays and contractual discretion. Legal registrations, customer transfers and individual complaint outcomes were not independently authenticated. The brand's founding year is unconfirmed.",
  "auditSourcesChecked": [
    "Official programme/pricing page",
    "Interactive rules and payout FAQ",
    "Official payout page",
    "Terms and conditions",
    "AML/KYC document",
    "Domain-linked Trustpilot profile and company replies"
  ],
  "regulatoryAudit": {
    "riskLevel": "High",
    "lastChecked": "2026-11-15",
    "summary": "High contractual risk assessment: the site discloses Foxx Limited in Saint Lucia, but the terms contract with Semizu in Dubai. Registration details are site-reported. Sections 14 and 22 warrant particular attention before purchase.",
    "entities": [
      {
        "name": "Foxx Limited",
        "jurisdiction": "Saint Lucia",
        "registrationNumber": "2026-00126",
        "registeredAddress": "Ground Floor, The Sotheby Building, Rodney Village, Rodney Bay, Gros-Islet, Saint Lucia",
        "role": "MT5 service entity named in the official footer; registration not independently verified."
      },
      {
        "name": "Semizu L.L.C.-FZ",
        "jurisdiction": "United Arab Emirates",
        "registrationNumber": "2423826",
        "registeredAddress": "Meydan Grandstand, 6th Floor, Nad Al Sheba, Dubai, UAE",
        "role": "Counterparty named in terms section 1.1; registration number disclosed in the footer."
      }
    ],
    "regulatoryStatus": [
      "The firm describes a simulated evaluation service, not a broker or deposit-taking institution.",
      "Terms section 14 provides for Dubai law and DIAC arbitration.",
      "Company disclosures do not establish regulatory authorization; registry checks remain incomplete."
    ],
    "complaintsAndDisputes": [
      "Trustpilot customers report rejected withdrawals; company replies cite missing stop-losses and other rule breaches. These accounts are disputed and are not treated as adjudicated payment failures.",
      "Positive payout testimonials also exist, without an independently verified transaction trail in this file."
    ],
    "redFlags": [
      "Broad manual approval and payout discretion.",
      "Different entities named in the footer and contract.",
      "Contradictions in copy-trading permissions and Instant reward percentages."
    ],
    "sources": [
      {
        "label": "FOXX Funded — official programmes, euro fees and company disclosures",
        "url": "https://www.foxx-funded.com/"
      },
      {
        "label": "FOXX Funded — terms, especially sections 1.1, 14 and 22",
        "url": "https://www.foxx-funded.com/terms-and-conditions/"
      },
      {
        "label": "FOXX Funded — AML/KYC policy, dated 26 October 2024",
        "url": "https://www.foxx-funded.com/assets/amlPolicy-BCJe7msf.pdf"
      },
      {
        "label": "Trustpilot — company replies explaining disputed payout refusals",
        "url": "https://fr.trustpilot.com/review/foxx-funded.com?page=2"
      }
    ]
  },
  "reviewSignals": {
    "redditScore": 0,
    "redditMentions": "No representative Reddit sample audited for this first review.",
    "redditSignal": "Faible volume",
    "xScore": 0,
    "xMentions": "No representative X sample audited for this first review.",
    "xSignal": "Faible volume",
    "trustpilotReliabilityScore": 15,
    "trustpilotReliability": "Faible",
    "trustpilotNote": "No TrustScore is displayed for foxx-funded.com. Trustpilot posts a guideline-breach and fake-review-removal notice; the profile is currently labelled Ponjas Marketing. No old numeric rating is reused.",
    "trustpilotRatingWithheld": true,
    "trustpilotSourceUrl": "https://www.trustpilot.com/review/foxx-funded.com",
    "trustpilotFlags": [
      "TrustScore unavailable",
      "Fake-review-removal notice",
      "Domain/profile name mismatch"
    ],
    "trustpilotFlaggedReviewNote": "Trustpilot reports removals without stating the total; PropRadar does not invent a count.",
    "manipulationRiskScore": 85,
    "manipulationRisk": "Élevé",
    "payoutRiskScore": 70,
    "payoutRisk": "Élevé",
    "payoutIncidentCount": 1,
    "payoutIncidentStatus": "À surveiller",
    "payoutIssues": [
      "2026-11-15: Official terms, sections 22.3–22.4, give the firm discretion over account approval and payout eligibility, including refusal of rewards. This is a contractual risk, not proof of a particular unpaid withdrawal."
    ],
    "confidenceDrivers": [
      "Positive weight: programmes, fees and contracting entities are publicly identifiable.",
      "Negative weight: Trustpilot notice, payout-proof gap and discretionary clauses."
    ],
    "radarVerdict": "49/100, high vigilance. This is PropRadar's initial editorial assessment, independent of affiliation; it can change when stronger payout and contractual evidence becomes available.",
    "lastSignalCheck": "2026-11-15"
  }
};

/** French copy for the initial review; other locales retain the sourced English text. */
export const foxxFundedFrench: Record<string, string> = {
  "2026-11-15: Trustpilot withholds the rating for foxx-funded.com after a guideline breach and reports removing fake reviews. The linked profile is currently named Ponjas Marketing.": "15/11/2026 : Trustpilot masque la note du domaine foxx-funded.com pour manquement à ses règles et indique avoir retiré de faux avis. La fiche liée au domaine porte actuellement le nom Ponjas Marketing.",
  "2026-11-15: Official terms, sections 22.3–22.4, give the firm discretion over account approval and payout eligibility, including refusal of rewards. This is a contractual risk, not proof of a particular unpaid withdrawal.": "15/11/2026 : les sections 22.3–22.4 des conditions officielles laissent à la firme l'appréciation de la validation des comptes et des paiements, dont le refus de récompenses. Il s'agit d'un risque contractuel, pas de la preuve d'un retrait particulier impayé.",
  "2026-11-15: The official payout page labels its cards as examples and says the leaderboard is not verified client payouts. These displays are excluded from PropRadar's payout proof.": "15/11/2026 : la page officielle des paiements présente ses cartes comme des exemples et précise que son classement ne constitue pas des paiements clients vérifiés. Ces éléments sont exclus des preuves de payout de PropRadar.",
  "25% maximum profit per trade idea. Instant Funding also applies lot-size consistency (0.25× to 2× the historical average) and a 15% initial-balance profit cap per payout cycle.": "Une idée de trading ne doit pas dépasser 25 % des profits. En Instant Funding, s'ajoutent une cohérence des lots (0,25 à 2 fois la moyenne historique) et un plafond de gains de 15 % du capital initial par cycle de retrait.",
  "Saint Lucia / United Arab Emirates (site disclosures)": "Sainte-Lucie / Émirats arabes unis (mentions du site)",
  "Forex / CFD programmes with strict payout conditions": "Programmes Forex / CFD avec conditions de retrait strictes",
  "49/100: published rules and fees are identifiable, but the withheld TrustScore, illustrative payout showcase and discretionary reward clauses justify high vigilance. This first review does not authenticate customer transfers or determine individual disputes.": "49/100 : les règles et les tarifs sont identifiables, mais la note Trustpilot masquée, les exemples de payouts et les clauses de paiement discrétionnaire justifient une vigilance élevée. Ce premier examen n'authentifie pas les virements clients et ne tranche pas les litiges individuels.",
  "1-Step: first after 14 trading days, then every 7; Instant: first after 4 weeks, then every 2 weeks; account review applies.": "1-Step : premier retrait après 14 jours de trading, puis tous les 7 ; Instant : après 4 semaines, puis toutes les 2 semaines ; sous réserve de contrôle du compte.",
  "The domain-linked Trustpilot profile contains both payout praise and refusal complaints. Company replies attribute refusals to rule breaches. Neither side's account has been independently verified here.": "La fiche Trustpilot du domaine contient des retours positifs sur les paiements et des plaintes pour refus. Les réponses de la firme invoquent des infractions aux règles. Les versions des parties n'ont pas été vérifiées indépendamment ici.",
  "One simulated MT5 evaluation, with published fees from €109 (10K) to €1,990 (500K), before codes. Fees are in euros; account sizes are in US dollars. The first payout share is 70%, not the advertised maximum of 90%.": "Évaluation en une phase sur MT5 simulé, de 109 € (10K) à 1 990 € (500K), avant codes. Les frais sont en euros et les tailles de compte en dollars. Le premier partage des gains est de 70 %, et non le maximum annoncé de 90 %.",
  "8% static, based on initial capital": "8 % statique, sur le capital initial",
  "70% first payout; 80% second; 90% from the third": "70 % au premier retrait ; 80 % au deuxième ; 90 % à partir du troisième",
  "5 trading days; no evaluation time limit": "5 jours de trading ; pas de limite de durée pour l'évaluation",
  "25% maximum profit per trade idea; 2% maximum risk per trade. Stop-loss required on every funded trade. Check the contractual strategy restrictions.": "25 % des profits maximum par idée de trading ; 2 % de risque maximum par position. Stop-loss obligatoire sur chaque trade financé. Vérifier les stratégies interdites dans le contrat.",
  "Instant Funding — documented 100K example": "Instant Funding — exemple 100K documenté",
  "Direct simulated access without an evaluation target. The FAQ documents a 100K example; a complete current fee and size list was not confirmed. Its 50%–80% payout ladder conflicts with the separate landing page's up-to-90% wording.": "Accès simulé direct sans objectif d'évaluation. La FAQ documente un exemple 100K ; la liste complète des tailles et des frais actuels n'a pas été confirmée. Le barème de retraits de 50 à 80 % diffère de la promesse de 90 % sur la page dédiée.",
  "No evaluation target": "Pas d'objectif d'évaluation",
  "4% of each day's starting balance, including floating losses and costs": "4 % du solde au début de chaque journée, pertes latentes et frais inclus",
  "50%, 55%, 60%, 65%, 70%, then 80% across successive withdrawals": "50 %, 55 %, 60 %, 65 %, 70 %, puis 80 % au fil des retraits",
  "5 days shown in the Instant Funding risk overview": "5 jours indiqués dans l'aperçu des risques Instant Funding",
  "Named companies, accessible terms and published programme limits.": "Sociétés nommées, conditions accessibles et limites des programmes publiées.",
  "MT5 access to forex, indices, metals and crypto.": "Accès MT5 au forex, aux indices, aux métaux et aux cryptos.",
  "One-step fee schedule captured in its original euro currency.": "Barème de l'évaluation en une phase relevé en euros, sa devise d'origine.",
  "Trustpilot rating withheld; the domain-linked profile uses a different company name.": "Note Trustpilot masquée ; la fiche liée au domaine porte un autre nom de société.",
  "No independently authenticated payout trail established in this review.": "Aucun historique de virements authentifié indépendamment lors de cet examen.",
  "The guide permits copy software, while terms section 22.4 lists trade copiers among possible payout refusal grounds.": "Le guide autorise les logiciels de copie, alors que la section 22.4 du contrat cite les copieurs parmi les motifs possibles de refus de paiement.",
  "Instant profit-share figures differ between the landing page and the payout FAQ.": "Les taux de partage Instant diffèrent entre la page commerciale et la FAQ des retraits.",
  "Initial editorial review dated 15 November 2026. Score 49/100 reflects clear basic programme data but weak review reliability, unverified payout displays and contractual discretion. Legal registrations, customer transfers and individual complaint outcomes were not independently authenticated. The brand's founding year is unconfirmed.": "Premier examen éditorial du 15 novembre 2026. La note de 49/100 tient compte de règles de base identifiables, mais d'avis peu fiables, de payouts illustratifs et d'un pouvoir discrétionnaire contractuel. Les immatriculations, virements clients et issues des plaintes n'ont pas été authentifiés indépendamment. L'année de création de la marque n'est pas confirmée.",
  "High contractual risk assessment: the site discloses Foxx Limited in Saint Lucia, but the terms contract with Semizu in Dubai. Registration details are site-reported. Sections 14 and 22 warrant particular attention before purchase.": "Appréciation du risque contractuel : élevé. Le site mentionne Foxx Limited à Sainte-Lucie, tandis que le contrat désigne Semizu à Dubaï. Les immatriculations sont déclarées par le site. Les sections 14 et 22 méritent une attention particulière avant tout achat.",
  "MT5 service entity named in the official footer; registration not independently verified.": "Entité des services MT5 indiquée dans le pied de page officiel ; immatriculation non vérifiée indépendamment.",
  "Counterparty named in terms section 1.1; registration number disclosed in the footer.": "Cocontractant désigné à la section 1.1 des conditions ; numéro d'immatriculation indiqué dans le pied de page.",
  "The firm describes a simulated evaluation service, not a broker or deposit-taking institution.": "La firme décrit un service d'évaluation simulée, sans activité de courtier ni collecte de dépôts.",
  "Terms section 14 provides for Dubai law and DIAC arbitration.": "La section 14 prévoit le droit de Dubaï et un arbitrage DIAC.",
  "Company disclosures do not establish regulatory authorization; registry checks remain incomplete.": "Les mentions légales ne prouvent pas un agrément réglementaire ; la vérification des registres reste incomplète.",
  "Trustpilot customers report rejected withdrawals; company replies cite missing stop-losses and other rule breaches. These accounts are disputed and are not treated as adjudicated payment failures.": "Des clients Trustpilot rapportent des retraits refusés ; la firme invoque notamment l'absence de stop-loss et d'autres infractions. Ces récits sont contestés et ne sont pas présentés comme des défauts de paiement établis.",
  "Positive payout testimonials also exist, without an independently verified transaction trail in this file.": "Des témoignages positifs sur les paiements existent également, sans trace de virement vérifiée indépendamment dans cette fiche.",
  "Broad manual approval and payout discretion.": "Pouvoir d'appréciation étendu sur la validation manuelle et les paiements.",
  "Different entities named in the footer and contract.": "Entités différentes désignées dans le pied de page et le contrat.",
  "Contradictions in copy-trading permissions and Instant reward percentages.": "Contradictions sur les autorisations de copie et les taux de rémunération Instant.",
  "No representative Reddit sample audited for this first review.": "Aucun échantillon représentatif de Reddit audité pour ce premier examen.",
  "No representative X sample audited for this first review.": "Aucun échantillon représentatif de X audité pour ce premier examen.",
  "No TrustScore is displayed for foxx-funded.com. Trustpilot posts a guideline-breach and fake-review-removal notice; the profile is currently labelled Ponjas Marketing. No old numeric rating is reused.": "Aucun TrustScore n'est affiché pour foxx-funded.com. Trustpilot signale un manquement à ses règles et le retrait de faux avis ; la fiche est actuellement nommée Ponjas Marketing. Aucune ancienne note chiffrée n'est réutilisée.",
  "TrustScore unavailable": "TrustScore indisponible",
  "Fake-review-removal notice": "Avis de retrait de faux avis",
  "Domain/profile name mismatch": "Décalage entre le domaine et le nom de la fiche",
  "Trustpilot reports removals without stating the total; PropRadar does not invent a count.": "Trustpilot indique des suppressions sans en donner le total ; PropRadar n'invente pas de nombre.",
  "Positive weight: programmes, fees and contracting entities are publicly identifiable.": "Point favorable : les programmes, les frais et les entités contractantes sont identifiables publiquement.",
  "Negative weight: Trustpilot notice, payout-proof gap and discretionary clauses.": "Points défavorables : alerte Trustpilot, absence de virements authentifiés et clauses discrétionnaires.",
  "49/100, high vigilance. This is PropRadar's initial editorial assessment, independent of affiliation; it can change when stronger payout and contractual evidence becomes available.": "49/100, vigilance élevée. Il s'agit d'une première appréciation éditoriale de PropRadar, indépendante de toute affiliation ; elle pourra évoluer avec de meilleures preuves de paiement et des clarifications contractuelles."
};
