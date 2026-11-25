import type { GuideArticle } from './guideArticles';

/**
 * French articles served under /fr/[slug].
 *
 * Written in French for French-speaking traders, not machine-translated.
 * `enPath` links each article to its English counterpart (hreflang pair).
 * Firm-specific facts must stay dated and sourced, like the English guides.
 */

export type FrArticle = GuideArticle & {
  slug: string;
  enPath?: string;
  title: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  answer: string;
  keywords: string[];
  faq: { question: string; answer: string }[];
  firmSlugs: string[];
  related: string[];
};

export const frArticles: FrArticle[] = [
  {
    "slug": "prop-firms-fermees",
    "title": "Prop firms fermées : 24 cas recensés, les causes et les risques (2026)",
    "metaDescription": "80 à 100 prop firms auraient cessé leur activité depuis 2024. Découvrez 17 cas datés, 7 marques signalées inactives, leurs causes et les précautions avant un challenge.",
    "eyebrow": "Enquête PropRadar · 25 novembre 2026",
    "h1": "Pourquoi les prop firms ferment-elles ? Les chiffres, la liste et les causes",
    "answer": "Finance Magnates Intelligence estime à 80–100 le nombre de prop firms ayant cessé leur activité entre janvier 2024 et le premier trimestre 2026. Notre enquête rassemble 24 marques ou activités : 17 événements datés (cessation, suspension, procédure ou retrait stratégique) et 7 signalements d’inactivité sans date de fermeture confirmée. Ces chiffres ne s’additionnent pas.",
    "keywords": [
      "prop firms fermées",
      "liste prop firms fermées",
      "faillite prop firm",
      "pourquoi les prop firms ferment",
      "prop firm fermeture 2026",
      "risques prop firm"
    ],
    "published": "2026-11-25",
    "updated": "2026-11-25",
    "intro": "Un challenge à prix réduit ne vaut que si l’opérateur peut assurer les services promis. Les cessations d’activité montrent un autre risque que celui du trading : celui de la contrepartie commerciale. Cette enquête porte sur les offres de prop trading destinées aux particuliers, souvent en environnement simulé, et non sur l’ensemble des sociétés traditionnelles de trading pour compte propre.",
    "keyPoints": [
      "**80 à 100** cessations estimées à l’échelle du secteur entre janvier 2024 et le T1 2026 (Finance Magnates Intelligence). Ce n’est pas un chiffre officiel ni le total à novembre 2026.",
      "**24 cas nominatifs** dans cet article, dont 17 événements datés et 7 signalements d’inactivité. Certains événements sont des suspensions, des rachats ou des retraits d’activité, pas des faillites.",
      "Une fermeture n’établit ni fraude, ni insolvabilité, ni perte de l’ensemble des fonds des clients.",
      "La dépendance technologique, la trésorerie, la concurrence et les choix stratégiques ressortent de plusieurs cas documentés."
    ],
    "sections": [
      {
        "heading": "Combien de prop firms ont fermé depuis 2024 ?",
        "paragraphs": [
          "En février 2025, Finance Magnates Intelligence évoquait déjà une fourchette de 80 à 100 marques disparues en 2024. Son analyse publiée en 2026 retient un ordre de grandeur similaire pour janvier 2024–T1 2026. Ces estimations de périmètres différents ne constituent pas deux séries cumulables. Les cessations intervenues plus tard en 2026 ne permettent pas de recalculer un total mondial fiable.",
          "Le registre statistique PropRadar comprend 17 entrées documentaires à la date de consultation du code source. Nous reprenons ces 17 marques et ajoutons sept cas de presse spécialisée dans cet article. Les sept ajouts ne constituent pas automatiquement de nouveaux profils dans le radar."
        ],
        "stats": [
          {
            "value": "80–100",
            "label": "Estimation sectorielle, janvier 2024–T1 2026"
          },
          {
            "value": "17",
            "label": "Événements datés dans l’enquête"
          },
          {
            "value": "7",
            "label": "Signalements sans date confirmée"
          }
        ],
        "callout": {
          "kind": "warning",
          "text": "Il n’existe pas ici de dénominateur mondial vérifié ni de cohorte suivie dans le temps. Diviser les fermetures historiques par le nombre de firmes actuellement listées ne donnerait pas un taux de faillite valide."
        }
      },
      {
        "heading": "Liste chronologique : 17 arrêts ou événements datés",
        "paragraphs": [
          "La date correspond à une annonce, une échéance d’arrêt ou une procédure, selon le cas. Les motifs sont ceux rapportés par les sources et ne constituent pas une expertise comptable indépendante. Une fermeture historique peut être suivie d’une relance."
        ],
        "compare": {
          "columns": [
            "Date",
            "Nature de l’événement",
            "Motif ou contexte documenté"
          ],
          "rows": [
            {
              "label": "Skilled Funded Trader",
              "values": [
                "28 mars 2024",
                "Suspension annoncée",
                "Raison précise non établie dans l'annonce initiale ; ne pas assimiler à une faillite."
              ],
              "sourceUrl": "https://www.financemagnates.com/forex/easton-controlled-skilled-funded-trader-suspends-prop-trading-operations/"
            },
            {
              "label": "True Forex Funds",
              "values": [
                "14 mai 2024",
                "Fermeture définitive annoncée",
                "Insolvabilité déclarée après la perte d'accès à MetaTrader en février."
              ],
              "sourceUrl": "https://fxnewsgroup.com/forex-news/retail-forex/prop-firm-true-forex-funds-folds/"
            },
            {
              "label": "SurgeTrader",
              "values": [
                "24 mai 2024",
                "Cessation annoncée",
                "Perte de la licence Match-Trader quelques jours auparavant ; désaccord avec le prestataire."
              ],
              "sourceUrl": "https://www.financemagnates.com/forex/prop-firm-surgetrader-shuts-down-a-week-after-losing-match-trader-license/"
            },
            {
              "label": "Funded Engineer",
              "values": [
                "15 juillet 2024",
                "Fermeture définitive annoncée",
                "Tentatives de restructuration infructueuses et intention de déposer le bilan ; jugement non établi par cette source."
              ],
              "sourceUrl": "https://www.financemagnates.com/forex/breaking-prop-trading-firm-funded-engineer-shuts-down/"
            },
            {
              "label": "Karma Prop Traders",
              "values": [
                "Août 2024",
                "Suspension puis acquisition",
                "Le fondateur a invoqué des difficultés de trésorerie liées à des abus présumés ; acquisition ultérieure par Sway Funded. Pas de conclusion de fraude."
              ],
              "sourceUrl": "https://www.financemagnates.com/forex/another-prop-firm-shuts-down-founder-blames-cheaters-for-liquidity-issues/"
            },
            {
              "label": "Funds For Traders",
              "values": [
                "Août 2024",
                "Cessation annoncée",
                "Arrêt du support MT4/MT5 d'Eightcap pour le prop trading, selon la société."
              ],
              "sourceUrl": "https://www.financemagnates.com/forex/prop-trading-funds-for-traders-closes-operations/"
            },
            {
              "label": "Indigo Trader Funding",
              "values": [
                "Août 2024",
                "Cessation confirmée",
                "Échec commercial reconnu ; demande de radiation au Royaume-Uni. Remboursements annoncés, exécution non établie."
              ],
              "sourceUrl": "https://www.financemagnates.com/forex/prop-trading-firm-indigo-trader-funding-confirms-shutdown/"
            },
            {
              "label": "MPFunds",
              "values": [
                "Septembre 2024",
                "Cessation annoncée",
                "Le dirigeant a attribué l'arrêt à la perte des services bancaires."
              ],
              "sourceUrl": "https://www.financemagnates.com/forex/prop-trading-prop-firm-match-users-left-in-limbo-after-affiliated-company-shuts-down/"
            },
            {
              "label": "Ascetic Capital",
              "values": [
                "3 décembre 2024",
                "Cessation annoncée",
                "Quatre ventes la première semaine, retrait des investisseurs selon la société ; remboursement annoncé."
              ],
              "sourceUrl": "https://www.financemagnates.com/forex/prop-firm-shuts-down-after-one-week-we-only-made-four-sales/"
            },
            {
              "label": "Smart Prop Trader",
              "values": [
                "29 décembre 2024",
                "Date d'arrêt annoncée",
                "Arrêt programmé ; motif financier précis non établi."
              ],
              "sourceUrl": "https://www.financemagnates.com/forex/another-prop-firm-announces-closure-in-year-that-saw-50-companies-shutter/"
            },
            {
              "label": "Fast Track Trading",
              "values": [
                "16 janvier 2025",
                "Procédure Chapter 7",
                "Date de dépôt de la procédure de faillite aux États-Unis, pas nécessairement dernier jour d'activité."
              ],
              "sourceUrl": "https://www.bkalerts.com/recent-bankruptcy-cases/new-jersey-bankruptcy-court/3:25-bk-10470/bankruptcy-case-fast-track-trading-llc"
            },
            {
              "label": "Funded Unicorn",
              "values": [
                "Juillet 2025",
                "Cessation annoncée",
                "Pertes importantes et obstacles administratifs invoqués par la firme."
              ],
              "sourceUrl": "https://www.financemagnates.com/forex/prop-trading-germanys-funded-unicorn-fails-raising-questions-on-risk-models/"
            },
            {
              "label": "Propel Capital",
              "values": [
                "2025",
                "Cessation annoncée",
                "Concurrence jugée insoutenable par le dirigeant ; comptes antérieurs montrant des dettes supérieures aux actifs."
              ],
              "sourceUrl": "https://www.financemagnates.com/forex/prop-firm-propel-capital-folds-after-14-months-ceo-blames-fierce-competition/"
            },
            {
              "label": "FundingTicks",
              "values": [
                "Janvier 2026",
                "Liquidation progressive de l'activité annoncée",
                "Arrêt engagé après modifications des règles et rémunérations ; causalité précise non établie."
              ],
              "sourceUrl": "https://www.financemagnates.com/forex/following-profit-cuts-and-trading-limits-prop-firm-fundingticks-begins-winding-down/"
            },
            {
              "label": "MyFundedFX / SeacrestFunded",
              "values": [
                "6 février 2026",
                "Arrêt de l'activité prop trading",
                "Recentrage stratégique de Seacrest sur le courtage CFD ; ne signifie pas faillite de l'entreprise."
              ],
              "sourceUrl": "https://www.financemagnates.com/forex/seacrest-ends-prop-trading-after-integrating-myfundedfx-shifts-focus-to-cfds/"
            },
            {
              "label": "Rev One Trading",
              "values": [
                "Août 2026",
                "Fermeture annoncée",
                "Le fondateur a expliqué que le manque de plateforme adaptée limitait le développement."
              ],
              "sourceUrl": "https://www.financemagnates.com/forex/tft-founder-closes-futures-prop-firm-turns-to-prediction-markets/"
            },
            {
              "label": "FundedSeat",
              "values": [
                "Septembre 2026",
                "Fermeture annoncée",
                "La firme a invoqué les limitations des grandes plateformes et un développement insuffisant."
              ],
              "sourceUrl": "https://www.financemagnates.com/forex/futures-prop-firm-fundedseat-closes-due-to-limitations-from-big-trading-platforms/"
            }
          ],
          "note": "Les lignes Karma et Skilled Funded Trader concernent des suspensions historiques ; MyFundedFX et SeacrestFunded sont comptés ensemble. La source Fast Track Trading est un miroir du dossier judiciaire, pas la décision de clôture de la procédure."
        }
      },
      {
        "heading": "Sept autres marques signalées inactives : preuves plus limitées",
        "paragraphs": [
          "Les entrées suivantes proviennent du registre PropRadar, dont les contrôles antérieurs remontent à octobre ou novembre 2026. Elles n’ont pas toutes fait l’objet d’une nouvelle vérification directe dans cette enquête. Elles restent distinctes des arrêts confirmés par un communiqué ou une procédure judiciaire."
        ],
        "compare": {
          "columns": [
            "Indice conservé dans le registre"
          ],
          "rows": [
            {
              "label": "Trade Amber",
              "values": [
                "Domaine indisponible et signalement de site fermé sur Trustpilot. Motif de cessation non établi."
              ],
              "sourceUrl": "https://www.trustpilot.com/review/tradeamber.com"
            },
            {
              "label": "Limitless Funding",
              "values": [
                "Anciens domaines parqués ou redirigés vers d'autres activités. Motif de cessation non établi."
              ],
              "sourceUrl": "https://shortlist.trading/firma/"
            },
            {
              "label": "Fortunes Funding",
              "values": [
                "Hébergement suspendu lors du contrôle de novembre ; historique d'activité discontinu. Motif de cessation non établi."
              ],
              "sourceUrl": "https://propfirmreviews.net/unlisted-prop-firms/"
            },
            {
              "label": "Syndicate Funded",
              "values": [
                "Signalement de cessation et redirection vers un site sans rapport. Motif de cessation non établi."
              ],
              "sourceUrl": "https://thetrustedprop.com/prop-firms/syndicate-funded/news"
            },
            {
              "label": "Inspire Funding",
              "values": [
                "Signalements de cessation et site fermé. Motif de cessation non établi."
              ],
              "sourceUrl": "https://thetrustedprop.com/prop-firms/inspire-funding/news"
            },
            {
              "label": "ForFX",
              "values": [
                "Signalement d'inactivité par un comparateur tiers. Motif de cessation non établi."
              ],
              "sourceUrl": "https://thetrustedprop.com/prop-firms/for-fx/news"
            },
            {
              "label": "Alpicap",
              "values": [
                "Signalement d'inactivité par un comparateur tiers. Motif de cessation non établi."
              ],
              "sourceUrl": "https://thetrustedprop.com/prop-firms/alpicap/news"
            }
          ],
          "note": "Un domaine hors ligne, un site parqué ou un annuaire tiers ne démontre pas à lui seul une dissolution légale."
        }
      },
      {
        "heading": "Pourquoi les prop firms ferment : cinq mécanismes de risque",
        "paragraphs": [
          "**1. Dépendance à une plateforme ou un intermédiaire.** SurgeTrader et Funds For Traders illustrent la fragilité d’un modèle dépendant d’une licence ou d’un prestataire. Une solution de secours doit être opérationnelle, pas seulement annoncée.",
          "**2. Trésorerie et solvabilité.** Les frais de challenges, les coûts d’acquisition, les dépenses techniques et les récompenses doivent rester compatibles avec les ressources disponibles. True Forex Funds a explicitement cité son insolvabilité ; Karma a invoqué des tensions de trésorerie. Sans comptes audités, impossible de quantifier les réserves de la majorité des opérateurs.",
          "**3. Concurrence et acquisition de clients.** Ascetic Capital a expliqué avoir réalisé quatre ventes en une semaine. Propel Capital a cité la pression concurrentielle. Une croissance rapide des inscriptions n’est pas non plus une preuve de rentabilité.",
          "**4. Services bancaires et réglementation.** MPFunds a attribué son arrêt à la perte de services bancaires. Un gel d’avoirs, un changement de prestataire ou une restriction géographique peuvent perturber les opérations. Une action réglementaire n’est pas une condamnation.",
          "**5. Retrait stratégique ou changement de propriétaire.** Seacrest a choisi de quitter le prop trading au profit des CFD. Une cessation de service n’implique donc pas toujours la faillite du groupe."
        ],
        "callout": {
          "kind": "tip",
          "text": "Ces mécanismes sont des explications illustrées par des dossiers, pas un classement statistique des causes mondiales. Plusieurs causes peuvent se cumuler."
        }
      },
      {
        "heading": "My Forex Funds : pourquoi nous le traitons à part",
        "paragraphs": [
          "L’arrêt de My Forex Funds en août 2023 a suivi une action de la CFTC et un gel d’avoirs. La plainte américaine a été rejetée définitivement en mai 2025. En septembre 2026, la presse a annoncé la cession d’actifs de marque à Global Solutions, puis un lancement prévu le 23 novembre 2026 sous un nouveau propriétaire. Nous n’avons pas confirmé ici le démarrage effectif ni le règlement de toutes les créances historiques.",
          "Ce dossier est antérieur au périmètre statistique de janvier 2024 et n’entre pas dans les 24 cas du tableau. Une relance annoncée ne prouve ni continuité juridique ni remboursement de tous les anciens clients."
        ]
      },
      {
        "heading": "Comment réduire le risque avant d’acheter un challenge ?",
        "paragraphs": [
          "La notation d’un challenge doit être séparée de l’évaluation de l’entreprise qui le vend. Un programme souple peut être proposé par une contrepartie fragile. Une note élevée ne constitue ni assurance, ni garantie de payout, ni garantie de pérennité."
        ],
        "bullets": [
          "Identifier l’entité qui facture et signe le contrat ; vérifier le registre officiel et les conditions de remboursement.",
          "Lire les clauses de suspension, de résiliation, de modifications et de refus de récompense.",
          "Distinguer les paiements annoncés par la firme des preuves indépendantes ; un historique de payouts ne garantit pas ses réserves.",
          "Vérifier les coûts complets et limiter les sommes engagées sur plusieurs challenges auprès du même opérateur.",
          "Conserver les CGU acceptées, les factures, les règles du produit et les justificatifs de retrait."
        ],
        "bulletStyle": "check"
      },
      {
        "heading": "Si votre prop firm cesse son activité",
        "paragraphs": [
          "Conservez vos documents, captures de compte et échanges. Identifiez le cocontractant, contactez les canaux officiels et vérifiez les annonces du liquidateur ou du repreneur, le cas échéant. Interrogez votre prestataire de paiement sur les recours éventuels et leurs délais ; un remboursement n’est pas automatique. Ne versez pas de frais supplémentaires à un prétendu récupérateur de fonds."
        ]
      }
    ],
    "sources": [
      {
        "label": "Finance Magnates Intelligence — estimation 2024",
        "url": "https://www.financemagnates.com/forex/exclusive-80-100-prop-firms-wiped-out-in-2024s-industry-collapse/"
      },
      {
        "label": "Finance Magnates Intelligence — analyse T1 2026",
        "url": "https://datalab.financemagnates.com/market-insights/tracked-prop-firm-crypto-payouts-doubled-to-115m-in-q1-2026"
      },
      {
        "label": "Finance Magnates — économie des offres futures, novembre 2026",
        "url": "https://www.financemagnates.com/forex/the-49-challenge-problem-are-futures-prop-margins-meeting-the-exit-door/"
      },
      {
        "label": "Finance Magnates — acquisition de Karma par Sway Funded",
        "url": "https://www.financemagnates.com/forex/offshore-cfds-broker-axe-enters-prop-trading-acquires-the-forex-funder/"
      },
      {
        "label": "Finance Magnates — rejet du dossier CFTC et contexte sectoriel",
        "url": "https://www.financemagnates.com/forex/analysis/prop-firm-crypto-payouts-doubled-to-115-million-in-q1-2026-but-growth-has-stalled-since-december/"
      },
      {
        "label": "Finance Magnates — vente des actifs MyForexFunds",
        "url": "https://www.financemagnates.com/forex/breaking-myforexfunds-brand-assets-sold-to-dubai-based-firm/"
      },
      {
        "label": "Finance Magnates — relance annoncée",
        "url": "https://www.financemagnates.com/forex/myforexfunds-unveils-evolution-hitting-2-drawdown-gets-you-demoted-to-intern/"
      },
      {
        "label": "PropRadar — registre et statistiques",
        "url": "https://propradar.tech/fr/prop-firm-statistics"
      },
      {
        "label": "Skilled Funded Trader",
        "url": "https://www.financemagnates.com/forex/easton-controlled-skilled-funded-trader-suspends-prop-trading-operations/"
      },
      {
        "label": "True Forex Funds",
        "url": "https://fxnewsgroup.com/forex-news/retail-forex/prop-firm-true-forex-funds-folds/"
      },
      {
        "label": "SurgeTrader",
        "url": "https://www.financemagnates.com/forex/prop-firm-surgetrader-shuts-down-a-week-after-losing-match-trader-license/"
      },
      {
        "label": "Funded Engineer",
        "url": "https://www.financemagnates.com/forex/breaking-prop-trading-firm-funded-engineer-shuts-down/"
      },
      {
        "label": "Karma Prop Traders",
        "url": "https://www.financemagnates.com/forex/another-prop-firm-shuts-down-founder-blames-cheaters-for-liquidity-issues/"
      },
      {
        "label": "Funds For Traders",
        "url": "https://www.financemagnates.com/forex/prop-trading-funds-for-traders-closes-operations/"
      },
      {
        "label": "Indigo Trader Funding",
        "url": "https://www.financemagnates.com/forex/prop-trading-firm-indigo-trader-funding-confirms-shutdown/"
      },
      {
        "label": "MPFunds",
        "url": "https://www.financemagnates.com/forex/prop-trading-prop-firm-match-users-left-in-limbo-after-affiliated-company-shuts-down/"
      },
      {
        "label": "Ascetic Capital",
        "url": "https://www.financemagnates.com/forex/prop-firm-shuts-down-after-one-week-we-only-made-four-sales/"
      },
      {
        "label": "Smart Prop Trader",
        "url": "https://www.financemagnates.com/forex/another-prop-firm-announces-closure-in-year-that-saw-50-companies-shutter/"
      },
      {
        "label": "Fast Track Trading",
        "url": "https://www.bkalerts.com/recent-bankruptcy-cases/new-jersey-bankruptcy-court/3:25-bk-10470/bankruptcy-case-fast-track-trading-llc"
      },
      {
        "label": "Funded Unicorn",
        "url": "https://www.financemagnates.com/forex/prop-trading-germanys-funded-unicorn-fails-raising-questions-on-risk-models/"
      },
      {
        "label": "Propel Capital",
        "url": "https://www.financemagnates.com/forex/prop-firm-propel-capital-folds-after-14-months-ceo-blames-fierce-competition/"
      },
      {
        "label": "FundingTicks",
        "url": "https://www.financemagnates.com/forex/following-profit-cuts-and-trading-limits-prop-firm-fundingticks-begins-winding-down/"
      },
      {
        "label": "MyFundedFX / SeacrestFunded",
        "url": "https://www.financemagnates.com/forex/seacrest-ends-prop-trading-after-integrating-myfundedfx-shifts-focus-to-cfds/"
      },
      {
        "label": "Rev One Trading",
        "url": "https://www.financemagnates.com/forex/tft-founder-closes-futures-prop-firm-turns-to-prediction-markets/"
      },
      {
        "label": "FundedSeat",
        "url": "https://www.financemagnates.com/forex/futures-prop-firm-fundedseat-closes-due-to-limitations-from-big-trading-platforms/"
      },
      {
        "label": "Trade Amber — signal d’inactivité conservé",
        "url": "https://www.trustpilot.com/review/tradeamber.com"
      },
      {
        "label": "Limitless Funding — signal d’inactivité conservé",
        "url": "https://shortlist.trading/firma/"
      },
      {
        "label": "Fortunes Funding — signal d’inactivité conservé",
        "url": "https://propfirmreviews.net/unlisted-prop-firms/"
      },
      {
        "label": "Syndicate Funded — signal d’inactivité conservé",
        "url": "https://thetrustedprop.com/prop-firms/syndicate-funded/news"
      },
      {
        "label": "Inspire Funding — signal d’inactivité conservé",
        "url": "https://thetrustedprop.com/prop-firms/inspire-funding/news"
      },
      {
        "label": "ForFX — signal d’inactivité conservé",
        "url": "https://thetrustedprop.com/prop-firms/for-fx/news"
      },
      {
        "label": "Alpicap — signal d’inactivité conservé",
        "url": "https://thetrustedprop.com/prop-firms/alpicap/news"
      }
    ],
    "faq": [
      {
        "question": "Combien de prop firms ont fermé depuis 2024 ?",
        "answer": "Selon Finance Magnates Intelligence, environ 80 à 100 entre janvier 2024 et le premier trimestre 2026. Aucun total mondial exhaustif à novembre 2026 n’est établi ici."
      },
      {
        "question": "Pourquoi les prop firms font-elles faillite ?",
        "answer": "Les dossiers montrent notamment des problèmes de solvabilité, de financement, de concurrence ou de dépendance aux prestataires. Une fermeture n’est pas forcément une faillite."
      },
      {
        "question": "Peut-on récupérer son argent après une fermeture ?",
        "answer": "Cela dépend de l’entité, du contrat, du paiement, de la situation juridique et des fonds disponibles. Conservez les justificatifs et renseignez-vous sur les recours applicables."
      },
      {
        "question": "Une prop firm avec beaucoup de payouts peut-elle fermer ?",
        "answer": "Oui. Les récompenses passées ne démontrent ni la solvabilité actuelle, ni la continuité des licences et des services nécessaires."
      }
    ],
    "firmSlugs": [],
    "related": [
      "regles-cachees-prop-firm",
      "drawdown-prop-firm",
      "meilleures-prop-firms-2026"
    ]
  },
  {
    slug: 'regles-cachees-prop-firm',
    enPath: '/guides/prop-firm-hidden-rules',
    title: 'Prop firms : 9 règles cachées à vérifier avant de payer (2026)',
    metaDescription: 'Règles cachées des prop firms : comparatif sourcé des interdictions VPN/VPS et du news trading en challenge et au payout (FTMO, GFT, Topstep…).',
    eyebrow: 'Enquête indépendante · 16 novembre 2026',
    h1: 'Règles cachées des prop firms : ce que la publicité ne dit pas',
    answer: 'Avant de payer un challenge, vérifiez les conditions du compte financé et du premier retrait : trading pendant les annonces, règle de consistance, VPN, scalping, pays acceptés et pouvoirs contractuels de la firme. Les exemples ci-dessous proviennent des propres conditions publiées par les entreprises, y compris nos partenaires affiliés.',
    keywords: ['règles cachées prop firm', 'prop firm sans règles cachées', 'règles payout prop firm', 'consistency rule', 'payout refusé'],
    published: '2026-11-16',
    updated: '2026-11-16',
    intro: 'Une société peut annoncer un gros profit split et un challenge simple, puis appliquer au compte financé des conditions plus complexes. Nous parlons ici de **règles faciles à manquer**, et non nécessairement de règles volontairement dissimulées. Chaque exemple renvoie aux **conditions publiées par la firme elle-même**. Et oui, PropRadar examine aussi les sociétés avec lesquelles il a une affiliation.',
    keyPoints: [
      'Les règles du **challenge** ne sont pas forcément celles du **compte financé**.',
      'Un gain affiché ne constitue pas nécessairement un **payout éligible**.',
      'Le **pays de résidence**, la plateforme, l’identité et le prestataire de paiement peuvent entraîner des restrictions différentes.',
      'Sources officielles consultées le **16 novembre 2026** ; les contrats peuvent évoluer.',
    ],
    sections: [
      {
        heading: '1. News trading : autorisé pendant le challenge, limité ensuite',
        paragraphs: [
          'Chez **E8 Markets**, le programme Classic autorise les annonces pendant l’évaluation. Mais sur un compte SimFi Performance Classic, seulement **40 % du profit réalisé pendant la fenêtre d’annonce est éligible**. E8 One applique encore une autre règle, tandis qu’E8 Pro autorise le news trading : une seule marque, trois traitements différents.',
          '**FundingPips** distingue aussi ses comptes. Sur plusieurs modèles Master, un profit réalisé dans la fenêtre d’annonces peut être **déduit** ; une exception existe pour certains trades ouverts au moins cinq heures avant. FundingPips Zero impose des conditions plus strictes. Lisez les règles du **programme exact**, pas seulement la promesse de la page commerciale.',
        ],
        callout: { kind: 'warning', text: 'Le fait que la plateforme laisse ouvrir ou fermer un trade **ne prouve pas que ce trade est autorisé contractuellement**.' },
      },
      {
        heading: 'Comparatif des règles de news : évaluation contre compte financé',
        paragraphs: [
          'Voici **dix groupes de programmes dont les conditions officielles ont été contrôlées**, y compris celles de sociétés affiliées. Il ne s’agit pas d’une liste noire mondiale. **Conserver une position pendant une annonce** ne signifie pas que l’on peut spéculer volontairement sur sa publication.',
        ],
        compare: {
          columns: ['Challenge / évaluation', 'Compte financé / qualifié'],
          rows: [
            { label: 'E8 Classic', values: ['News sans restriction', '**40 % seulement du profit de la fenêtre éligible**'], sourceUrl: 'https://help.e8markets.com/en/articles/9185497-can-i-trade-news' },
            { label: 'E8 One', values: ['News sans restriction', '**Aucun trade ±5 min** autour d’une annonce majeure ; profit susceptible d’être retiré'], sourceUrl: 'https://help.e8markets.com/en/articles/9185497-can-i-trade-news' },
            { label: 'E8 Pro', values: ['Sans restriction', 'Sans restriction particulière liée aux news'], sourceUrl: 'https://help.e8markets.com/en/articles/9185497-can-i-trade-news' },
            { label: 'FundingPips Flex / Standard / Pro', values: ['Conserver une position permis ; exploitation volontaire du pic interdite', '**Profits Master concernés déduits** ; exception swing de 5 heures'], sourceUrl: 'https://help.fundingpips.com/hc/en-us/articles/34504137479441-News-Trading-Weekend-Holding' },
            { label: 'FundingPips Zero', values: ['Vérifier le contrat du programme', '**Ouverture, clôture et maintien interdits** autour des news au stade Master (±10 min)'], sourceUrl: 'https://help.fundingpips.com/hc/en-us/articles/34504137479441-News-Trading-Weekend-Holding' },
            { label: 'Blue Guardian CFD 1-Step Standard', values: ['News autorisées', '**Pas d’ouverture ni de clôture ±5 min** sur les instruments concernés'], sourceUrl: 'https://help.blueguardian.com/en/articles/18426782-1-step-standard-rules' },
            { label: 'BrightFunded CFD Phase 1 / 2', values: ['News sans restriction', '**Profits déduits si exécution ±5 min** ; Instant limité dès le départ'], sourceUrl: 'https://help.brightfunded.com/en/articles/9241694-can-i-trade-news' },
            { label: 'Alpha Futures Standard / Zero / Direct', values: ['Évaluation Standard / Zero libre ; Direct sans évaluation', '**Aucun ordre ±2 min** sur ces comptes qualifiés ; Advanced différent'], sourceUrl: 'https://help.alpha-futures.com/en/articles/9492063-news-trading-policy' },
            { label: 'Alpha Capital Pro / One / Three / Direct', values: ['Évaluation libre ; Direct sans évaluation', '**Aucune exécution ±5 min** ; même un TP déclenché peut annuler le profit'], sourceUrl: 'https://help.alphacapitalgroup.uk/en/articles/9293522-can-i-trade-news' },
            { label: 'Tradeify Futures', values: ['News autorisées', 'News autorisées selon sa FAQ générale'], sourceUrl: 'https://help.tradeify.co/en/articles/12268494-common-faqs' },
          ],
          note: 'Vérification du 16 novembre 2026. Le ↗ ouvre la source officielle de la ligne. La règle varie selon le programme et la date du contrat.',
        },
      },
      {
        heading: '2. VPN et VPS : un profit peut devenir non éligible',
        paragraphs: [
          'Depuis le **6 octobre 2026**, **GOAT Funded Trader** indique interdire le trading via VPN, VPS, proxy ou environnement hébergé. Selon sa FAQ, cela peut entraîner un manquement immédiat et rendre les gains concernés **non éligibles au paiement**. Une exception très limitée existe pour la première connexion au serveur et une autre pour son copieur interne.',
          'Cette clause écrite ne démontre **pas** que GFT refuse abusivement les paiements. Elle doit toutefois être visible par les traders qui utilisent un VPS pour leurs robots ou qui se connectent depuis l’étranger.',
        ],
      },
      {
        heading: 'Liste sourcée : quelles prop firms limitent les VPN et VPS ?',
        paragraphs: [
          '**Un VPN masque ou modifie la connexion, un VPS exécute à distance : ce ne sont pas les mêmes outils.** Voici **onze firmes dont nous avons identifié une règle explicite**, incluant plusieurs partenaires d’affiliation PropRadar. Attention : « conditionnel » ne signifie pas « interdit partout », et une restriction de plateforme ne s’applique pas automatiquement à toutes les formules.',
        ],
        compare: {
          columns: ['VPN', 'VPS / exécution distante'],
          rows: [
            { label: 'GOAT Funded Trader', values: ['**Interdit** pour trader (depuis le 6 oct. 2026)', '**Interdit** ; exception pour un outil interne'], sourceUrl: 'https://help.goatfundedtrader.com/en/articles/17362726-can-i-use-a-vpn-vps-proxy-or-any-other-hosting-service-while-trading' },
            { label: 'FundingPips', values: ['**Interdit** pour accéder au compte de trading', '**Interdit** pour accéder au compte de trading'], sourceUrl: 'https://help.fundingpips.com/hc/en-us/articles/34505029138449-Trading-Conduct-and-Security-Standards' },
            { label: 'Topstep / TopstepX', values: ['**Interdit** (y compris proxy, TOR)', '**Transmission d’ordres à distance interdite** ; recherche en lecture seule permise'], sourceUrl: 'https://help.topstep.com/en/articles/11187768-topstepx-api-access' },
            { label: 'FundedNext CFD', values: ['**Autorisé**, sauf IP de pays exclu', '**Interdit dès 50 k$** ; en dessous, option payante + EA de prise de trades, pas de manuel'], sourceUrl: 'https://help.fundednext.com/en/articles/8223809-can-i-use-a-vpn-or-vps' },
            { label: 'Alpha Capital Group', values: ['**Conditionnel** : IP fixe dédiée + notification préalable', '**Conditionnel** : IP fixe dédiée + notification préalable'], sourceUrl: 'https://help.alphacapitalgroup.uk/en/articles/8420522-what-is-the-ip-rule-are-vpns-and-vpss-allowed' },
            { label: 'Tradeify Futures', values: ['**Interdit à la connexion**', 'Permis **après connexion normale**, aux risques du trader'], sourceUrl: 'https://help.tradeify.co/en/articles/12268494-common-faqs' },
            { label: 'FTMO CFD', values: ['**Généralement autorisé** ; géolocalisation US à éviter sur certaines plateformes', '**Généralement autorisé** ; même exception liée aux plateformes US'], sourceUrl: 'https://ftmo.com/en/faq/can-i-travel-or-use-vpn-vps/' },
            { label: 'Blue Guardian CFD 1-Step Standard', values: ['**Autorisé** sans contournement des règles de copie/groupe', '**Autorisé** sous la même réserve'], sourceUrl: 'https://help.blueguardian.com/en/articles/18426782-1-step-standard-rules' },
            { label: 'Apex Trader Funding', values: ['Interdit **pour masquer l’identité/le lieu ou contourner les règles**', 'Même condition anti-contournement ; pas d’interdiction générale démontrée'], sourceUrl: 'https://apextraderfunding.com/help-center/uncategorized/prohibited-activities/' },
            { label: 'The5ers', values: ['**Contournement géographique interdit** ; aucune interdiction générale établie', 'Pas d’interdiction générale établie dans les CGU citées'], sourceUrl: 'https://the5ers.com/terms-and-conditions/' },
            { label: 'HyroTrader (crypto)', values: ['**Contournement des pays exclus interdit** sur les plateformes tierces', 'Dépend des conditions Bybit/BloFin/Hyro ; interdiction universelle non vérifiée'], sourceUrl: 'https://www.hyrotrader.com/faq/platform/which-countries-are-allowed-to-join-hyrotrader-can-i-join-from-the-usuk/' },
          ],
          note: 'Registre des sources contrôlées le 16 novembre 2026, pas preuve d’un refus de paiement. Cliquez sur ↗ pour consulter la règle de la firme. Les autres sociétés restent non auditées sur ce point.',
        },
        callout: { kind: 'warning', text: 'Une firme qui autorise les **Expert Advisors** n’autorise pas forcément un **robot exécuté sur VPS**. Vérifiez séparément l’IP, la taille du compte et la transmission d’ordres.' },
      },
      {
        heading: '3. Scalping et risque : des seuils parfois méconnus',
        paragraphs: [
          '**Blue Guardian Futures** indique que moins de 50 % du profit total peut venir de trades détenus **moins de 10 secondes**. Pour ses comptes CFD, l’utilisation de plus de **80 % de la marge** est qualifiée de pratique « all or nothing » et peut avoir des conséquences sur le compte ou les retraits.',
          '« Scalping autorisé » ne suffit donc pas : vérifiez le temps minimum, la taille des positions, les stratégies automatiques et les règles de copie.',
        ],
      },
      {
        heading: '4. Consistance : une règle différente au challenge et au payout',
        visual: 'consistency-example',
        paragraphs: [
          'Une règle de consistance compare souvent la meilleure journée au profit total. Chez **Topstep**, les seuils et leur effet dépendent de l’étape : Trading Combine et parcours de payout ne sont pas identiques.',
          'Exemple avec une limite fictive de 50 % : si votre meilleure journée est de 1 200 $, il faut au moins **2 400 $ de profit total** pour respecter le ratio. Une firme annoncée « sans consistency rule » peut tout de même imposer un drawdown plus exigeant ou des plafonds de retrait.',
        ],
      },
      {
        heading: '5. Pays interdits : le piège découvert au moment du KYC',
        paragraphs: [
          'La FAQ de **GOAT Funded Trader** classe explicitement **Singapour** parmi les pays exclus. **Apex Trader Funding** exclut notamment **la Chine** des nouveaux comptes. C’est important pour PropRadar : ces pays font partie de notre audience.',
          'Même lorsque la firme accepte le pays, certaines plateformes ou certains programmes peuvent rester inaccessibles. Le filtre pays de PropRadar présente les **conditions publiées par les entreprises**, pas une autorisation légale ni une garantie de paiement.',
        ],
        compare: {
          columns: ['Inde', 'Chine continentale', 'Singapour'],
          rows: [
            { label: 'FTMO CFD', values: ['Admis selon la politique', 'Admis selon la politique', 'Admis selon la politique'], sourceUrl: 'https://ftmo.com/en/faq/who-can-join-ftmo/' },
            { label: 'Topstep Futures', values: ['Admis', '**Vérification individuelle nécessaire**', 'Admis'], sourceUrl: 'https://help.topstep.com/en/articles/8284116-am-i-eligible-to-trade-with-topstep' },
            { label: 'My Funded Futures', values: ['Admis', '**Exclu**', 'Admis'], sourceUrl: 'https://help.myfundedfutures.com/en/articles/8229993-restricted-countries-policy' },
            { label: 'Apex Trader Funding', values: ['Admis', '**Exclu**', 'Admis'], sourceUrl: 'https://apextraderfunding.com/help-center/getting-started/restricted-countries/' },
            { label: 'GOAT Funded Trader', values: ['Admis', 'Admis', '**Exclu**'], sourceUrl: 'https://help.goatfundedtrader.com/en/articles/10742187-which-countries-are-restricted-at-goat-funded-trader' },
            { label: 'FundedNext CFD', values: ['Admis', 'Admis', 'Admis'], sourceUrl: 'https://help.fundednext.com/en/articles/8020080-are-any-countries-restricted-on-fundednext-cfds' },
            { label: 'Fintokei', values: ['**Exclu**', '**Temporairement exclu**', 'Admis'], sourceUrl: 'https://support.fintokei.com/en/articles/6538820-who-can-join-fintokei' },
            { label: 'Alpha Futures', values: ['Admis', '**Exclu**', 'Admis'], sourceUrl: 'https://help.alpha-futures.com/en/articles/9523389-countries-with-limitations' },
            { label: 'Alpha Capital Group', values: ['Admis', 'Admis', 'Admis'], sourceUrl: 'https://help.alphacapitalgroup.uk/en/articles/8775575-countries-with-limitations' },
            { label: 'Lucid Trading', values: ['Admis', 'Admis', 'Admis'], sourceUrl: 'https://support.lucidtrading.com/en/articles/11404636-restricted-countries' },
            { label: 'PipFarm', values: ['Admis', 'Admis', 'Admis'], sourceUrl: 'https://help.pipfarm.com/en/articles/4318163-prohibited-country-list' },
            { label: 'HyroTrader (plateforme Hyro)', values: ['Admis', 'Admis', 'Admis'], sourceUrl: 'https://www.hyrotrader.com/faq/platform/which-countries-are-allowed-to-join-hyrotrader-can-i-join-from-the-usuk/' },
            { label: 'BrightFunded CFD', values: ['Admis', 'Admis', 'Admis'], sourceUrl: 'https://help.brightfunded.com/en/articles/9286630-what-countries-are-restricted-at-brightfunded' },
            { label: 'Upcomers', values: ['Admis', 'Admis', 'Admis'], sourceUrl: 'https://help.upcomers.com/en/articles/8703655-are-there-any-prohibited-countries' },
          ],
          note: 'Conditions générales officielles consultées le 16 novembre 2026. « Admis » signifie hors des exclusions explicitement publiées, pas compte ouvert ou retrait garanti. Nationalité, résidence, plateforme utilisée, KYC et prestataire de paiement peuvent modifier la réponse.',
        },
      },
      {
        heading: '6. Voyager : un simple accès depuis le mauvais pays peut compter',
        paragraphs: [
          '**Take Profit Trader** indique qu’une seule connexion de trading ou aux données de marché depuis un pays interdit peut entraîner des restrictions. La politique mentionne aussi les VPN et connexions à distance.',
          'À l’inverse, **Tradeify** précise que sa liste géographique générale est fondée sur la **résidence permanente**, pas sur un déplacement touristique. Une même situation peut donc produire des résultats différents selon la firme.',
        ],
      },
      {
        heading: '7. Retrait : une clause de décision discrétionnaire',
        paragraphs: [
          'Dans son propre **Risk Disclosure**, **Apex Trader Funding** indique que l’attribution des récompenses sur les Performance Accounts relève de sa **discrétion** et que ses décisions sont finales. Cette clause mérite d’être lue avec les conditions de payout et les possibilités de contestation.',
          'Cela ne prouve pas que les payouts légitimes sont systématiquement refusés. En revanche, c’est un élément de **risque contractuel** à connaître avant de payer.',
        ],
      },
      {
        heading: '8. « Funded » ne veut pas toujours dire « live »',
        paragraphs: [
          '**Tradeify** précise qu’un trader refusé pour un compte Live ne peut pas simplement retourner au stade simulé. **FTMO Futures** distingue également l’accès au compte Sim-Funded d’une éventuelle progression vers un compte Live, elle-même restreinte dans certains pays.',
          'Identifiez ce qui est réellement promis : **évaluation simulée, compte simulé avec récompenses ou compte live**. Les conséquences juridiques et opérationnelles ne sont pas les mêmes.',
        ],
      },
      {
        heading: '9. Notre méthode pour éviter les mauvaises surprises',
        paragraphs: [
          'Aucun comparateur sérieux ne peut garantir qu’une prop firm n’a **aucune règle cachée** : les contrats changent et le KYC est individuel. En revanche, vous pouvez limiter le risque d’acheter un programme inadapté.',
        ],
        steps: [
          { title: 'Identifier le programme', text: 'Noter **marque, nom du programme, taille du compte et étape** (évaluation, funded, live).' },
          { title: 'Conserver les sources', text: 'Lire et enregistrer les **conditions, FAQ, règles de payout et pays exclus** avec la date.' },
          { title: 'Vérifier son style réel', text: 'Contrôler **news, overnight, VPN, EA, scalping, drawdown, consistance et inactivité**.' },
          { title: 'Simuler le premier payout', text: 'Compter les **jours obligatoires, plafonds, frais, KYC et moyens de retrait**.' },
          { title: 'Demander une confirmation écrite', text: 'En cas de doute, obtenir la réponse du support sur le **programme et la version précise**.' },
        ],
        callout: { kind: 'tip', text: 'Une condition absente de nos fiches ? Transmettez à PropRadar la source officielle et sa date. **Une affiliation ne change jamais nos notes ni nos constats.**' },
      },
    ],
    sources: [
      { label: 'E8 Markets : news trading et différences entre programmes', url: 'https://help.e8markets.com/en/articles/9185497-can-i-trade-news' },
      { label: 'FundingPips : règles de news et de week-end', url: 'https://help.fundingpips.com/hc/en-us/articles/34504137479441-News-Trading-Weekend-Holding' },
      { label: 'GOAT Funded Trader : VPN/VPS et environnements hébergés', url: 'https://help.goatfundedtrader.com/en/articles/17362726-can-i-use-a-vpn-vps-proxy-or-any-other-hosting-service-while-trading' },
      { label: 'Blue Guardian : pratiques de trading interdites', url: 'https://help.blueguardian.com/en/articles/18426719-prohibited-trading-strategies' },
      { label: 'Topstep : règle de consistance', url: 'https://help.topstep.com/en/articles/8284208-consistency-at-topstep' },
      { label: 'GOAT Funded Trader : pays exclus', url: 'https://help.goatfundedtrader.com/en/articles/10742187-which-countries-are-restricted-at-goat-funded-trader' },
      { label: 'Apex Trader Funding : pays exclus', url: 'https://apextraderfunding.com/help-center/getting-started/restricted-countries/' },
      { label: 'Take Profit Trader : accès depuis les pays exclus', url: 'https://takeprofittraderhelp.zendesk.com/hc/en-us/articles/22447557656477-Restricted-Countries' },
      { label: 'Tradeify : politique géographique', url: 'https://help.tradeify.co/en/articles/10495888-rules-restricted-countries' },
      { label: 'Apex Trader Funding : Risk Disclosure', url: 'https://apextraderfunding.com/risk-disclosure/' },
      { label: 'FTMO Futures : accès aux comptes Live', url: 'https://ftmo.com/en/futures/faq/who-is-eligible-for-a-live-funded-account/' },
      { label: 'FundingPips : interdiction VPN/VPS et règles IP', url: 'https://help.fundingpips.com/hc/en-us/articles/34505029138449-Trading-Conduct-and-Security-Standards' },
      { label: 'Topstep : VPN, VPS et exécution d’ordres', url: 'https://help.topstep.com/en/articles/11187768-topstepx-api-access' },
      { label: 'FundedNext CFD : VPN/VPS selon taille de compte', url: 'https://help.fundednext.com/en/articles/8223809-can-i-use-a-vpn-or-vps' },
      { label: 'Alpha Capital Group : IP dédiée et déclaration VPN/VPS', url: 'https://help.alphacapitalgroup.uk/en/articles/8420522-what-is-the-ip-rule-are-vpns-and-vpss-allowed' },
      { label: 'FTMO CFD : VPN/VPS et géolocalisation US', url: 'https://ftmo.com/en/faq/can-i-travel-or-use-vpn-vps/' },
      { label: 'Blue Guardian : règles CFD 1-Step Standard', url: 'https://help.blueguardian.com/en/articles/18426782-1-step-standard-rules' },
      { label: 'Apex : usage interdit pour contourner les pays', url: 'https://apextraderfunding.com/help-center/uncategorized/prohibited-activities/' },
      { label: 'Tradeify : VPN/VPS et news', url: 'https://help.tradeify.co/en/articles/12268494-common-faqs' },
      { label: 'The5ers : conditions générales VPN et pays', url: 'https://the5ers.com/terms-and-conditions/' },
      { label: 'HyroTrader : restriction des plateformes tierces', url: 'https://www.hyrotrader.com/faq/platform/which-countries-are-allowed-to-join-hyrotrader-can-i-join-from-the-usuk/' },
      { label: 'Alpha Futures : news selon le compte qualifié', url: 'https://help.alpha-futures.com/en/articles/9492063-news-trading-policy' },
      { label: 'Alpha Capital Group : news sur comptes qualifiés', url: 'https://help.alphacapitalgroup.uk/en/articles/9293522-can-i-trade-news' },
      { label: 'Fintokei : éligibilité, pays exclus et achats suspendus', url: 'https://support.fintokei.com/en/articles/6538820-who-can-join-fintokei' },
      { label: 'Alpha Futures : pays exclus', url: 'https://help.alpha-futures.com/en/articles/9523389-countries-with-limitations' },
      { label: 'Lucid Trading : pays interdits', url: 'https://support.lucidtrading.com/en/articles/11404636-restricted-countries' },
      { label: 'FundedNext : pays exclus des CFD', url: 'https://help.fundednext.com/en/articles/8020080-are-any-countries-restricted-on-fundednext-cfds' },
      { label: 'BrightFunded : news sur comptes CFD financés', url: 'https://help.brightfunded.com/en/articles/9241694-can-i-trade-news' },
      { label: 'Upcomers : pays exclus en règle générale', url: 'https://help.upcomers.com/en/articles/8703655-are-there-any-prohibited-countries' },
    ],
    faq: [
      { question: 'Existe-t-il une prop firm sans règles cachées ?', answer: 'Aucun site ne peut garantir zéro condition méconnue. Cherchez un contrat complet, daté, des règles identiques entre marketing et compte financé, et des conditions de payout vérifiables.' },
      { question: 'Une règle publiée est-elle vraiment cachée ?', answer: 'Pas nécessairement. Nous utilisons ce terme recherché par les traders pour parler de conditions faciles à manquer, notamment lorsqu’elles diffèrent d’un programme à l’autre.' },
      { question: 'Quelles prop firms interdisent les VPN ou VPS en 2026 ?', answer: 'GOAT Funded Trader et FundingPips interdisent explicitement l’accès au trading via VPN et VPS. Topstep interdit le VPN et l’envoi d’ordres depuis un serveur distant. Chez FundedNext, Alpha Capital Group et Tradeify, les règles sont conditionnelles ; FTMO CFD et Blue Guardian CFD 1-Step Standard les autorisent généralement avec des réserves. Chaque politique est liée dans notre tableau.' },
      { question: 'Une prop firm peut-elle autoriser les news en challenge puis les limiter ensuite ?', answer: 'Oui. E8 Classic, BrightFunded CFD, Blue Guardian CFD 1-Step Standard et plusieurs programmes FundingPips appliquent des règles de news différentes après l’évaluation. Vérifiez aussi l’impact sur le payout, pas seulement l’autorisation technique de passer un ordre.' },
      { question: 'PropRadar critique-t-il ses sociétés affiliées ?', answer: 'Oui. Les relations d’affiliation sont distinctes du classement et n’effacent aucune condition publiée ou incident sourcé.' },
    ],
    firmSlugs: ['goat-funded-trader', 'e8-markets', 'funding-pips', 'apex-trader-funding', 'blue-guardian', 'topstep', 'tradeify', 'take-profit-trader', 'ftmo'],
    related: ['prop-firm-sans-consistency-rule', 'prop-firm-payout-proof', 'prop-firm-legal-check'],
  },
  {
    slug: 'meilleures-prop-firms-2026',
    enPath: '/best-prop-firms',
    title: 'Meilleures prop firms 2026 : classement par fiabilité',
    metaDescription:
      'Quelles sont les meilleures prop firms en 2026 ? Classement indépendant par fiabilité des payouts, clarté des règles, transparence juridique et avis vérifiés.',
    eyebrow: 'Classement 2026',
    h1: 'Meilleures prop firms 2026 : le classement par fiabilité',
    answer:
      'Il n\'existe pas de meilleure prop firm universelle, mais certaines sont nettement plus sûres que d\'autres. En octobre 2026, les scores PropRadar les plus élevés reviennent à FTMO (91/100), The5ers (85/100) et Topstep (84/100) : les historiques publics les plus longs, les règles les plus lisibles et le moins de signaux de payout non résolus.',
    keywords: ['meilleure prop firm', 'meilleures prop firms 2026', 'classement prop firm', 'prop firm fiable'],
    updated: '2026-11-12',
    intro:
      'Choisir une prop firm, c\'est d\'abord choisir **un opérateur à qui vous confiez de l\'argent** : des frais de challenge, et plus tard des payouts. Avant de comparer les pourcentages de partage ou les codes promo, ce classement vérifie la question qui compte le plus : **cette société sera-t-elle encore là, et paiera-t-elle**, le jour où vous aurez gagné ?',
    keyPoints: [
      'Il n\'y a pas de meilleure firme universelle : il y a la meilleure **pour votre marché et votre style**.',
      'Filtrez dans cet ordre : **marché → règles → coût réel → codes promo**.',
      'Le score lit **règles, preuves de payout, transparence juridique, avis publics et ancienneté**.',
      'Un lien d\'affiliation **ne change jamais un score**.',
    ],
    sections: [
      {
        heading: 'Comment ce classement est construit',
        paragraphs: [
          'Chaque prop firm suivie par PropRadar reçoit un **score sur 100**, calculé à partir de la clarté des règles, des preuves de payout, de la transparence juridique (entité, juridiction, conditions générales), des signaux d\'avis publics et de l\'ancienneté.',
          'Les liens d\'affiliation sont signalés sur chaque fiche et **ne modifient jamais un score** : une firme partenaire garde ses points faibles affichés, et une firme sans partenariat peut être en tête.',
        ],
        callout: { kind: 'warning', text: 'Le score **n\'est pas une promesse de paiement**. C\'est un résumé des preuves disponibles à une date donnée ; chaque changement est daté dans l\'historique de la fiche.' },
      },
      {
        heading: 'Le trio de tête en octobre 2026',
        paragraphs: [
          'Les trois scores les plus élevés reviennent à des opérateurs anciens. Ce ne sont pas les moins chers : ce sont les historiques publics les plus longs et les règles les plus lisibles.',
        ],
        compare: {
          columns: ['FTMO', 'The5ers', 'Topstep'],
          rows: [
            { label: 'Score PropRadar', values: ['**91/100**', '**85/100**', '**84/100**'] },
            { label: 'Fondée', values: ['2015, République tchèque', '2016, Israël et Royaume-Uni', '2012, Chicago'] },
            { label: 'Marché', values: ['Forex / CFD', 'Forex / CFD', 'Futures'] },
            { label: 'Prix d\'entrée', values: ['environ 155 $', 'environ 39 $', 'abonnement mensuel'] },
            { label: 'Trustpilot', values: ['4,8 (près de 55 000 avis)', '4,7 (plus de 40 000 avis)', '3,7'] },
          ],
          note: 'Relevé en octobre 2026. PropRadar a une relation d\'affiliation avec FTMO et The5ers, pas avec Topstep : sans effet sur les scores.',
        },
        bulletStyle: 'check',
        bullets: [
          '**FTMO** : la référence du forex/CFD, règles détaillées, historique long.',
          '**The5ers** : limites de perte souvent **statiques**, programmes variés, entrée bon marché.',
          '**Topstep** : la plus ancienne prop firm futures ; positions fermées chaque soir, règles souvent modifiées depuis fin 2025.',
        ],
      },
      {
        heading: 'Étape 1 : choisir son marché',
        paragraphs: [
          'Un trader forex/CFD et un trader futures ne cherchent pas au même endroit. **La meilleure firme futures ne sert à rien à un trader forex** : filtrez d\'abord par marché.',
        ],
        compare: {
          columns: ['Forex / CFD', 'Futures'],
          rows: [
            { label: 'Plateformes', values: ['MT5, cTrader', 'Plateformes futures'] },
            { label: 'Limites', values: ['**En % du compte**', '**En dollars**'] },
            { label: 'Drawdown', values: ['Souvent statique sur les challenges en deux étapes', 'Souvent **suiveur**'] },
            { label: 'Exemples', values: ['FTMO, The5ers', 'Topstep, Apex'] },
          ],
        },
      },
      {
        heading: 'Étape 2 : faire correspondre les règles à votre style',
        paragraphs: [
          'Ce ne sont **pas les objectifs de profit** qui font perdre la plupart des comptes, mais le type de drawdown, la perte journalière maximale, la règle de consistance, les annonces économiques et la détention overnight. Lisez toujours les règles du **compte financé**, souvent plus strictes que celles du challenge.',
        ],
        bulletStyle: 'check',
        bullets: [
          '**Drawdown** : une limite statique laisse beaucoup plus de marge qu\'un drawdown suiveur.',
          '**Consistance** : vérifiez si elle s\'applique au challenge, aux payouts, ou aux deux.',
          '**News et overnight** : indispensables pour les traders d\'annonces et les swing traders.',
          '**Payouts** : fréquence, montant minimum, plafond des premiers retraits et frais.',
        ],
      },
      {
        heading: 'Étape 3 : comparer le coût réel',
        visual: 'real-cost-stack',
        paragraphs: [
          'Le coût réel d\'une prop firm, c\'est **tout ce que vous dépensez avant votre premier payout** : challenges, resets, frais d\'activation et comptes de remplacement, moins un éventuel remboursement.',
        ],
        callout: { kind: 'example', text: 'Un challenge bon marché avec un drawdown sévère peut coûter **plus cher** qu\'un challenge plus onéreux que vous avez de bonnes chances de réussir.' },
      },
    ],
    faq: [
      {
        question: 'Quelle est la prop firm la plus fiable en 2026 ?',
        answer:
          'Selon les preuves recensées par PropRadar en octobre 2026, FTMO obtient le score le plus élevé (91/100), suivie de The5ers (85/100) et Topstep (84/100). La meilleure firme dépend toutefois de votre marché et de votre style.',
      },
      {
        question: 'Les prop firms sont-elles réglementées ?',
        answer:
          'En général non : la plupart présentent leur offre comme du trading simulé et des services éducatifs, pas comme un service d\'investissement. C\'est pourquoi l\'entité juridique, la juridiction et l\'historique de paiement comptent autant.',
      },
      {
        question: 'Un lien d\'affiliation influence-t-il le classement ?',
        answer: 'Non. Les relations commerciales sont affichées sur chaque fiche et n\'entrent pas dans le calcul du score.',
      },
    ],
    firmSlugs: ['ftmo', 'the5ers', 'topstep', 'funderpro', 'apex-trader-funding'],
    related: ['ftmo-vs-the5ers', 'drawdown-prop-firm', 'regle-de-consistance-prop-firm'],
  },

  {
    "slug": "prop-firm-sans-challenge",
    "enPath": "/guides/prop-firm-no-challenge",
    "title": "Comment démarrer avec une prop firm sans challenge ?",
    "metaDescription": "Démarrer avec une prop firm sans challenge : choisir son programme, vérifier les règles et frais, tester le drawdown et comprendre les conditions du premier payout.",
    "eyebrow": "Sans challenge",
    "h1": "Comment démarrer avec une prop firm sans challenge",
    "answer": "Choisissez le marché et le programme précis, vérifiez votre éligibilité, lisez les règles du compte financé, calculez les frais et testez votre stratégie contre les limites de perte. Sauter l’évaluation ne supprime pas les conditions de retrait.",
    "keywords": [
      "prop firm sans challenge",
      "financement instantané prop firm",
      "instant funding",
      "compte financé direct"
    ],
    "updated": "2026-11-15",
    "intro": "Choisissez le marché et le programme précis, vérifiez votre éligibilité, lisez les règles du compte financé, calculez les frais et testez votre stratégie contre les limites de perte. Sauter l’évaluation ne supprime pas les conditions de retrait.",
    "keyPoints": [
      "**Sans challenge signifie sans évaluation préalable.** Un objectif de profit peut néanmoins conditionner le payout.",
      "Un compte direct coûte souvent **plusieurs fois** un challenge de même taille.",
      "Comparez le **coût total jusqu'au premier payout**, pas le prix affiché.",
      "Adapté à une stratégie **stable et peu risquée**, pas à une stratégie encore en test."
    ],
    "sections": [
      {
        "heading": "Les six étapes pour démarrer sans challenge",
        "visual": "challenge-vs-direct",
        "paragraphs": [
          "Le financement direct supprime l’évaluation préalable. Le compte peut rester simulé et les retraits dépendent de règles spécifiques : jours qualifiants, objectif de profit, consistance ou plafond. Voici les vérifications à faire avant et après l’achat."
        ],
        "steps": [
          {
            "title": "Choisir le marché et vérifier son éligibilité",
            "text": "Confirmez les instruments, la plateforme, les horaires, les pays acceptés, le contrôle d’identité et la société contractante."
          },
          {
            "title": "Lire les règles du programme exact",
            "text": "Conservez le nom du produit et la version des conditions. Notez les seuils journaliers et totaux, leur mode de calcul et l’heure de réinitialisation."
          },
          {
            "title": "Écrire le chemin jusqu’au premier retrait",
            "text": "Listez les jours requis, l’objectif éventuel, la consistance, le minimum de demande, les plafonds et le partage des profits."
          },
          {
            "title": "Calculer tous les frais",
            "text": "Vérifiez achat, activation, abonnement, plateforme et données selon le programme, puis les conditions de remboursement et de remplacement."
          },
          {
            "title": "Tester sa stratégie avec ces limites",
            "text": "Rejouez votre journal ou utilisez un essai avec les pertes flottantes, les commissions et les séries de pertes. Le montant nominal du compte n’est pas votre budget de perte."
          },
          {
            "title": "Configurer le compte et surveiller les seuils",
            "text": "Après les vérifications requises, confirmez que le tableau de bord correspond au contrat. Contrôlez les deux seuils de perte et les conditions de payout à chaque séance."
          }
        ]
      },
      {
        "heading": "Pourquoi le financement instantané coûte plus cher",
        "visual": "no-challenge-cost",
        "paragraphs": [
          "Le challenge sert de **filtre** : une grande partie des acheteurs n'atteint jamais de payout, et leurs frais financent ceux qui y arrivent. Quand vous sautez ce filtre, la firme intègre ce risque dans le prix du compte : comptes **plusieurs fois plus chers**, tailles **plus petites**, drawdown **plus serré**.",
          "Exemple en chiffres ronds : un challenge à 100 $ avec une chance sur trois de réussite coûte **environ 300 $ en moyenne** pour être financé. Un compte instantané à 350 $ coûte davantage dès que vous en perdez un seul avant le premier retrait."
        ]
      },
      {
        "heading": "Les règles qui décident si un compte direct est rentable",
        "paragraphs": [
          "Lisez les conditions du compte financé, pas la page marketing. Six points changent tout :"
        ],
        "bulletStyle": "check",
        "bullets": [
          "**Type de drawdown** : un drawdown qui suit votre plus haut est bien plus contraignant qu'une limite fixe.",
          "**Règle de consistance** : beaucoup de programmes instantanés limitent la part du profit faite sur votre meilleure journée.",
          "**Premier payout** : jours minimum, profit minimum, plafond des premiers retraits.",
          "**Partage de départ** : il commence parfois plus bas que sur les challenges.",
          "**Coût de remplacement** après une violation de règle.",
          "**Stratégies interdites** : fenêtres d'annonces, durée minimale des trades, copy trading."
        ]
      },
      {
        "heading": "Pour qui le financement direct a du sens",
        "paragraphs": [
          "Le financement direct **échange de l'argent contre du temps**. La pression de l'objectif de profit est remplacée par celle d'un drawdown en direct, sur un compte plus cher."
        ],
        "fit": {
          "yes": [
            "Une stratégie **stable, à faible drawdown**",
            "Un historique de **respect des limites journalières**",
            "Vous préférez **gagner du temps** plutôt que de l'argent"
          ],
          "no": [
            "Une stratégie **encore en test**",
            "Un style **volatil** qui a besoin de marge",
            "L'envie de **fuir l'objectif de profit**"
          ]
        },
        "callout": {
          "kind": "tip",
          "text": "En cas de doute, un **challenge en une étape bon marché** reste souvent le meilleur test avant d'acheter un compte direct."
        }
      },
      {
        "heading": "Signaux d'alerte propres au financement instantané",
        "paragraphs": [
          "Les programmes instantanés attirent beaucoup de firmes récentes et très marketing. Méfiez-vous de :"
        ],
        "bulletStyle": "flag",
        "bullets": [
          "**Très gros comptes à très bas prix.**",
          "Promesses de payout **sans politique de paiement publiée**.",
          "Règles **différentes entre la page d'accueil et les conditions générales**.",
          "Clauses qui permettent de refuser un payout **« à la seule discrétion »** de la firme."
        ],
        "callout": {
          "kind": "tip",
          "text": "Avant d'acheter, ouvrez la fiche PropRadar de la firme : **entité, signaux de payout, alertes de domaine et de régulateur** sur une seule page."
        }
      },
      {
        "heading": "Deux exemples : accès immédiat et retrait sont distincts",
        "paragraphs": [
          "Les règles officielles consultées le 15 novembre 2026 indiquent que Hyro Instant demande trois jours qualifiants et au moins 25 $ de profit après partage pour le premier payout. Le profit comptabilisé par retrait est plafonné.",
          "Chez Tradeify Lightning 50 000 $, le premier objectif publié est de 3 000 $ mais la demande est plafonnée à 2 000 $ avant partage à 90 %. La consistance s’applique aussi : l’objectif de profit n’est pas la somme retirable.",
          "Ces conditions publiées ne constituent pas une authentification indépendante de paiements clients. Vérifiez le contrat correspondant à la date d’achat."
        ]
      }
    ],
    "faq": [
      {
        "question": "Comment démarrer avec une prop firm sans challenge ?",
        "answer": "Choisissez le marché et le programme précis, vérifiez votre éligibilité, lisez les règles du compte financé, calculez les frais et testez votre stratégie contre les limites de perte. Sauter l’évaluation ne supprime pas les conditions de retrait."
      },
      {
        "question": "Une prop firm sans challenge est-elle une arnaque ?",
        "answer": "Pas forcément : c'est un modèle commercial légitime. Mais il est utilisé par de nombreuses firmes récentes. Vérifiez l'entité juridique, la politique de payout et les signaux publics avant d'acheter."
      },
      {
        "question": "Le financement instantané est-il moins cher qu'un challenge ?",
        "answer": "Rarement. Le compte coûte plus cher à l'achat et les règles du compte financé sont souvent plus serrées. Comparez le coût total jusqu'au premier payout."
      }
    ],
    "firmSlugs": [
      "the5ers",
      "ftmo",
      "goat-funded-trader",
      "fundednext"
    ],
    "related": [
      "drawdown-prop-firm",
      "regle-de-consistance-prop-firm",
      "meilleures-prop-firms-2026",
      "hyrotrader-vs-tradeify"
    ],
    "sources": [
      {
        "label": "HyroTrader : Hyro Instant",
        "url": "https://www.hyrotrader.com/faq/getting-started/what-is-hyro-instant/"
      },
      {
        "label": "HyroTrader : premier payout Instant",
        "url": "https://www.hyrotrader.com/faq/hyrotrader-account/how-does-the-first-payout-work-on-hyro-instant/"
      },
      {
        "label": "Tradeify : Lightning Funded",
        "url": "https://help.tradeify.co/en/articles/10495938-lightning-funded-accounts"
      },
      {
        "label": "Tradeify : objectifs et plafonds de payout",
        "url": "https://help.tradeify.co/en/articles/10495932-lightning-funded-account-payout-policy"
      }
    ]
  },

  {
    slug: 'regle-de-consistance-prop-firm',
    enPath: '/guides/prop-firm-no-consistency-rule',
    title: 'Règle de consistance prop firm : calcul et exemples',
    metaDescription:
      'Règle de consistance en prop firm : formule de calcul, exemples chiffrés, différence entre challenge et payout, et règles actuelles de Topstep et FTMO.',
    eyebrow: 'Règles expliquées',
    h1: 'Règle de consistance en prop firm : comment elle se calcule',
    answer:
      'La règle de consistance limite la part de votre profit total qui peut venir d\'une seule journée. Calcul : profit de la meilleure journée divisé par le profit total, multiplié par 100. Au-dessus de la limite (souvent 40 à 55 %), vous devez simplement gagner davantage avant de valider le challenge ou de demander un payout.',
    keywords: ['règle de consistance prop firm', 'consistency rule', 'prop firm sans règle de consistance', 'best day rule'],
    updated: '2026-11-12',
    intro:
      'La règle de consistance limite **la part de votre profit total qui peut venir d\'une seule journée**. Elle existe parce qu\'une journée chanceuse, une position surdimensionnée ou un pic sur une annonce peuvent produire un payout qui ne dit rien de votre capacité à trader dans la durée. Comprendre la formule est plus utile que chercher à tout prix une firme qui n\'en a pas.',
    keyPoints: [
      'La formule : **meilleure journée ÷ profit total × 100**, comparée à la limite (souvent 40 à 55 %).',
      'Au-dessus de la limite, vous **ne perdez rien** : vous continuez à trader jusqu\'à un profit total suffisant.',
      '**L\'étape compte** : sur le challenge elle retarde la validation, sur les payouts elle peut bloquer un retrait.',
      'Pas de règle de consistance ne veut **pas** dire plus facile : le risque est contrôlé autrement.',
    ],
    sections: [
      {
        heading: 'La formule de calcul',
        visual: 'consistency-example',
        paragraphs: [
          'La plupart des firmes utilisent la même formule : **profit de la meilleure journée divisé par le profit total**, en pourcentage. Si le résultat dépasse la limite, vous n\'êtes pas encore éligible, au passage du challenge ou au payout selon l\'endroit où la règle s\'applique.',
          'Exemple avec une limite de 50 % : 1 200 $ lundi, 300 $ mardi, 500 $ mercredi, soit 2 000 $. Votre meilleure journée pèse **60 % du total** : vous êtes au-dessus. Inutile de perdre quoi que ce soit : il faut **au moins 2 400 $** de profit total pour que 1 200 $ représente 50 % ou moins.',
        ],
        callout: { kind: 'tip', text: 'Calcul express : **profit total nécessaire = meilleure journée ÷ limite**. Ici : 1 200 $ ÷ 0,50 = **2 400 $**.' },
      },
      {
        heading: 'Challenge, payout ou les deux',
        visual: 'rule-stages',
        paragraphs: [
          'Le même pourcentage n\'a pas les mêmes conséquences selon l\'étape. Sur le challenge, la règle **retarde seulement votre validation**. Sur les payouts, elle peut **bloquer un retrait** alors que vous avez déjà gagné de l\'argent sur le compte financé.',
          'Exemples vérifiés en octobre 2026 : **Topstep** applique **55 %** sur son Trading Combine et, si vous dépassez, relève l\'objectif au lieu de vous éliminer ; son compte Express Funded en parcours « Consistency » exige **40 % ou moins** pour un payout. Depuis le **12 octobre 2026**, les nouveaux challenges **FTMO 1-Step** comparent votre meilleure journée à votre profit total, **journées perdantes comprises** ; les commandes antérieures gardent l\'ancienne « Best Day Rule », calculée sur les seules journées positives. PropRadar n\'a pas relevé de règle de ce type sur le programme High Stakes de The5ers.',
        ],
        callout: { kind: 'warning', text: 'Vérifiez toujours **l\'étape, le produit et la date de commande** : une même firme peut appliquer deux versions de la règle.' },
      },
      {
        heading: 'Une firme sans règle de consistance est-elle meilleure ?',
        paragraphs: [
          'Pas automatiquement. Les firmes qui suppriment cette règle contrôlent le risque autrement. Un titre « sans consistency rule » peut cacher un compte financé **plus difficile à garder**. Regardez ce qui la remplace :',
        ],
        bulletStyle: 'check',
        bullets: [
          '**Perte journalière plus faible**',
          '**Drawdown suiveur**',
          '**Premiers payouts plafonnés**',
          '**Nombre minimum de jours**',
          '**Taille de position limitée**',
        ],
        callout: {
          kind: 'example',
          text: 'La règle pénalise surtout les **résultats irréguliers** : traders d\'annonces, swing traders qui ferment une grosse position, ou ceux qui augmentent la taille après une série perdante. Si vos journées sont régulières, une limite de 40 à 50 % vous gênera rarement.',
        },
      },
      {
        heading: 'Trader sereinement avec une règle de consistance',
        paragraphs: ['Quatre habitudes suffisent pour que la règle ne vous gêne pas :'],
        steps: [
          { title: 'Suivre le ratio', text: 'Mettez à jour **meilleure journée ÷ profit total** après chaque séance.' },
          { title: 'Connaître le plafond du jour', text: 'Avant de trader, sachez **combien vous pouvez gagner** sans dépasser la limite.' },
          { title: 'Étaler après une grosse journée', text: 'Visez **plusieurs petites journées positives** plutôt que de chercher à la répéter.' },
          { title: 'Ne pas augmenter la taille en fin de parcours', text: 'Une seule journée trop gagnante peut **retarder la validation** autant qu\'une perte.' },
        ],
      },
    ],
    sources: [
      { label: 'Centre d\'aide Topstep : consistance', url: 'https://help.topstep.com/en/articles/8284208-consistency-at-topstep' },
      { label: 'FTMO : objectifs de trading', url: 'https://ftmo.com/en/trading-objectives/' },
      { label: 'FTMO : mise à jour du 8 octobre 2026', url: 'https://ftmo.com/au/blog/trading-updates/trading-update-8-oct-2026/' },
    ],
    faq: [
      {
        question: 'Comment calculer la règle de consistance ?',
        answer: 'Divisez le profit de votre meilleure journée par votre profit total et multipliez par 100. Comparez le résultat à la limite de votre programme.',
      },
      {
        question: 'Que se passe-t-il si je dépasse la limite ?',
        answer:
          'Le plus souvent, rien n\'est perdu : vous devez continuer à trader jusqu\'à ce que votre profit total soit assez élevé. Chez Topstep, l\'objectif de profit du Combine est relevé automatiquement.',
      },
    ],
    firmSlugs: ['topstep', 'ftmo', 'the5ers', 'apex-trader-funding'],
    related: ['drawdown-prop-firm', 'avis-topstep', 'prop-firm-sans-challenge'],
  },

  {
    slug: 'drawdown-prop-firm',
    enPath: '/guides/prop-firm-drawdown',
    title: 'Drawdown prop firm : trailing, statique et EOD expliqués',
    metaDescription:
      'Qu\'est-ce que le drawdown en prop firm ? Drawdown statique, suiveur (trailing) et de fin de journée expliqués avec des exemples chiffrés, et comment choisir.',
    eyebrow: 'Règles expliquées',
    h1: 'Drawdown en prop firm : statique, suiveur et fin de journée',
    answer:
      'Le drawdown est la perte maximale autorisée par rapport à un point de référence. Statique : fixé sous le capital de départ, il ne bouge jamais. Suiveur intraday : il suit votre plus haut en temps réel, profits latents compris. Fin de journée (EOD) : il ne bouge qu\'à la clôture. Le statique est le plus souple, le suiveur intraday le plus strict.',
    keywords: ['drawdown prop firm', 'trailing drawdown', 'drawdown statique', 'drawdown EOD', 'perte journalière maximale'],
    updated: '2026-11-12',
    intro:
      'Le drawdown est **la règle qui fait perdre le plus de comptes**. Deux firmes peuvent afficher un « drawdown de 3 000 $ » sur un compte de 50 000 $ et vous laisser une **marge totalement différente**, parce que le point de référence ne se déplace pas de la même façon.',
    keyPoints: [
      'Deux limites à la fois : la **perte journalière** (repart chaque jour) et le **drawdown maximum** (tout le compte).',
      '**Statique** = le plus souple, **suiveur intraday** = le plus strict, **fin de journée** entre les deux.',
      'La plupart des drawdowns suiveurs se **verrouillent** au capital de départ : les premiers jours sont les plus risqués.',
      'Calculez la taille de position depuis **la marge restante**, pas depuis la taille du compte.',
    ],
    sections: [
      {
        heading: 'Perte journalière et drawdown maximum',
        visual: 'daily-vs-max',
        paragraphs: [
          'La plupart des firmes combinent **deux limites**. La **perte journalière maximale** plafonne ce que vous pouvez perdre en une journée, depuis le solde ou l\'equity du début de journée. Le **drawdown maximum** plafonne la perte totale sur la vie du compte. Dépasser l\'une ou l\'autre fait généralement perdre le compte, même si certaines firmes futures se contentent d\'arrêter la séance.',
        ],
      },
      {
        heading: 'Le drawdown statique',
        visual: 'static-floor',
        paragraphs: [
          'Il est **fixé sous le capital de départ et ne bouge jamais**. Sur un compte de 100 000 $ avec 10 % de drawdown statique, le plancher reste à 90 000 $. Si le compte monte à 108 000 $, vous disposez de **18 000 $ de marge**. C\'est le modèle le plus souple, fréquent sur les challenges forex en deux étapes.',
        ],
      },
      {
        heading: 'Le drawdown suiveur intraday (trailing)',
        visual: 'trailing-vs-static',
        paragraphs: [
          'Il **suit votre equity la plus haute en temps réel, profits latents compris**. Exemple sur 50 000 $ avec 2 500 $ de trailing : le plancher démarre à 47 500 $. Un trade monte à +1 500 $ latents, le plancher passe à 49 000 $, **même si vous clôturez ensuite à zéro**. Il ne vous reste que 1 000 $ de marge au lieu de 2 500 $, sans avoir encaissé un centime.',
        ],
        callout: { kind: 'warning', text: 'C\'est le modèle **le plus strict**, courant sur les futures et les comptes instantanés.' },
      },
      {
        heading: 'Le drawdown de fin de journée (EOD)',
        visual: 'eod-vs-intraday',
        paragraphs: [
          'Il **ne se déplace qu\'à la clôture**, à partir du solde de clôture. Les variations de profit latent pendant la séance ne relèvent pas le plancher, ce qui le rend bien plus gérable.',
        ],
        callout: {
          kind: 'warning',
          text: 'Le plancher ne bouge qu\'à la clôture, mais **la violation est souvent contrôlée en temps réel**. Topstep, par exemple, fait suivre sa Maximum Loss Limit au solde de fin de journée tout en la surveillant en direct, pertes latentes comprises.',
        },
      },
      {
        heading: 'Le verrouillage : quand le trailing s\'arrête',
        visual: 'trailing-lock',
        paragraphs: [
          'La plupart des drawdowns suiveurs **cessent de monter** à un certain niveau, souvent quand le plancher atteint le capital de départ. Ensuite, la limite se comporte comme une limite statique.',
        ],
        callout: { kind: 'tip', text: 'Les premiers jours d\'un compte en trailing sont les plus dangereux : **constituez la marge jusqu\'au verrouillage** avant de prendre des positions plus grosses.' },
      },
      {
        heading: 'Comment choisir',
        paragraphs: ['Choisissez le modèle selon **le comportement de vos trades** :'],
        compare: {
          columns: ['À privilégier'],
          rows: [
            { label: 'Trades qui partent loin en profit avant de revenir', values: ['**Statique** ou **fin de journée** ; évitez le trailing intraday'] },
            { label: 'Petits scalps fréquents, stops serrés', values: ['Le **trailing** reste gérable si le verrouillage arrive vite'] },
            { label: 'Swing trading, stops larges', values: ['**Statique**, avec une marge supérieure à votre perte latente habituelle'] },
          ],
        },
        callout: { kind: 'tip', text: 'Calculez toujours la taille de position à partir de **la marge restante**, pas de la taille du compte.' },
      },
    ],
    sources: [{ label: 'Centre d\'aide Topstep : Maximum Loss Limit', url: 'https://intercom.help/topstep-llc/en/articles/8284204' }],
    faq: [
      {
        question: 'Quelle est la différence entre drawdown statique et trailing ?',
        answer:
          'Le drawdown statique reste fixé sous le capital de départ. Le trailing monte avec chaque nouveau plus haut du compte, donc votre marge diminue après chaque gain, jusqu\'au verrouillage.',
      },
      {
        question: 'Le drawdown EOD est-il plus facile ?',
        answer:
          'En général oui : il ignore les variations intraday du profit latent et ne bouge qu\'à la clôture. Vérifiez toutefois si la violation est contrôlée en temps réel.',
      },
    ],
    firmSlugs: ['the5ers', 'ftmo', 'topstep', 'apex-trader-funding'],
    related: ['regle-de-consistance-prop-firm', 'avis-topstep', 'prop-firm-sans-challenge'],
  },

  {
    slug: 'avis-topstep',
    enPath: '/guides/topstep-review',
    title: 'Avis Topstep 2026 : fiable ? Règles, payouts et limites',
    metaDescription:
      'Avis Topstep 2026 : la prop firm futures est-elle fiable ? Règles du Trading Combine, consistance à 55 %, Maximum Loss Limit, partage 90 % et avis Trustpilot.',
    eyebrow: 'Avis prop firm',
    h1: 'Avis Topstep 2026 : une prop firm futures fiable ?',
    answer:
      'Oui, Topstep est une prop firm futures sérieuse et ancienne (fondée en 2012 à Chicago). Son Trading Combine n\'a pas de limite de temps, une règle de consistance à 55 % et une Maximum Loss Limit qui suit le solde de fin de journée. Les nouveaux traders gardent 90 % des payouts. Limites : futures uniquement, pas de position overnight, règles souvent modifiées depuis fin 2025.',
    keywords: ['avis topstep', 'topstep fiable', 'topstep avis 2026', 'règles topstep'],
    updated: '2026-11-12',
    intro:
      'Topstep est **le nom le plus ancien du prop trading sur futures**. Cet historique est sa principale force. Ses faiblesses : une offre **limitée aux futures**, des règles **plusieurs fois modifiées** depuis fin 2025 et une limite de perte **suiveuse** qui exige de la discipline.',
    keyPoints: [
      'Opérateur américain depuis **2012**, futures uniquement, aucune alerte de régulateur relevée.',
      'Le Combine n\'a **pas de limite de temps**, et toutes les positions sont **fermées en fin de séance**.',
      'Les nouveaux traders gardent **90 %** des payouts ; payout minimum **125 $**.',
      'Après le premier payout, la limite de perte passe à **0 $** : plus aucun coussin.',
    ],
    sections: [
      {
        heading: 'Topstep est-il fiable ?',
        paragraphs: [
          'Topstep est un **opérateur américain établi**, avec un long historique public, un centre d\'aide détaillé et un courtier affilié, Topstep Brokerage, lancé début 2026. PropRadar n\'a relevé **aucune alerte de régulateur**. Comme partout, le Combine et le compte Express Funded sont **simulés** : les payouts sont des récompenses versées par Topstep.',
          'Sur Trustpilot, le profil affiche **3,7 sur 14 955 avis**, avec la mention de Trustpilot selon laquelle la société « peut être associée à des investissements à haut risque » (vérifié le 23 octobre 2026). Fin 2025, les plaintes portaient surtout sur des **pannes de TopstepX** et des ordres stop non exécutés.',
        ],
        stats: [
          { value: '2012', label: 'fondée à Chicago' },
          { value: '84/100', label: 'score PropRadar' },
          { value: '3,7', label: 'Trustpilot, 14 955 avis (23 oct. 2026)' },
        ],
      },
      {
        heading: 'Les règles du Trading Combine',
        visual: 'topstep-path',
        paragraphs: [
          '**Pas de limite de temps ni de nombre minimum de jours.** Toutes les positions doivent être fermées en fin de séance : pas d\'overnight ni de week-end.',
          'La **Maximum Loss Limit** monte avec le solde de fin de journée et ne redescend jamais, mais elle est **surveillée en temps réel**, pertes latentes comprises, et se verrouille une fois le capital de départ atteint (centre d\'aide, 18 septembre 2026).',
          'Règle de consistance : **55 %**. Votre meilleure journée ne peut pas dépasser 55 % de l\'objectif ; sinon, **l\'objectif est relevé** à meilleure journée ÷ 0,55 (centre d\'aide, 17 septembre 2026). Une perte journalière optionnelle de 1 000 $, 2 000 $ ou 3 000 $ arrête la séance sans clôturer le compte.',
        ],
        compare: {
          columns: ['50K', '100K', '150K'],
          rows: [
            { label: 'Objectif de profit', values: ['3 000 $', '6 000 $', '9 000 $'] },
            { label: 'Maximum Loss Limit', values: ['2 000 $', '3 000 $', '4 500 $'] },
          ],
          note: 'Centre d\'aide Topstep, septembre 2026.',
        },
        callout: { kind: 'example', text: 'Combine 50K, meilleure journée **2 000 $** : c\'est plus que 55 % de 3 000 $ (1 650 $), donc l\'objectif passe à 2 000 $ ÷ 0,55 ≈ **3 636 $**.' },
      },
      {
        heading: 'Compte Express Funded et payouts',
        paragraphs: [
          'Après validation, vous tradez un compte **Express Funded (XFA)**, toujours simulé, où commencent les payouts. Depuis février 2026, deux parcours au choix, et **le choix est définitif**.',
          'Les traders inscrits depuis le 12 janvier 2026 touchent **90 %** des payouts validés ; les plus anciens gardent 100 % de leurs 10 000 premiers dollars, puis 90 %. Payout minimum : **125 $**.',
        ],
        compare: {
          columns: ['Parcours Standard', 'Parcours Consistency'],
          rows: [
            { label: 'Avant chaque payout', values: ['**5 journées gagnantes** d\'au moins 150 $', '**3 jours de trading**, meilleure journée **≤ 40 %** du profit net'] },
          ],
          note: 'Le choix entre les deux parcours est définitif.',
        },
        callout: { kind: 'warning', text: 'Après le premier payout, la limite de perte passe à **0 $** : **une mauvaise journée après un retrait peut suffire à perdre le compte.**' },
      },
      {
        heading: 'Points forts et points faibles',
        paragraphs: ['Ce qui ressort des règles actuelles :'],
        prosCons: {
          pros: [
            'L\'**historique le plus long** du prop trading futures et un centre d\'aide très documenté.',
            '**Pas de limite de temps** ; la consistance relève l\'objectif au lieu d\'éliminer.',
            '**90 %** de partage dès le premier dollar et un payout minimum bas (**125 $**).',
          ],
          cons: [
            '**Futures uniquement**, positions obligatoirement fermées en fin de séance.',
            'La limite de perte tombe à **0 $ après le premier payout**.',
            'Règles **modifiées plusieurs fois** entre novembre 2025 et avril 2026.',
          ],
        },
      },
      {
        heading: 'Pour qui ?',
        paragraphs: [
          'L\'abonnement mensuel rend une **évaluation lente** plus coûteuse qu\'un challenge à frais unique.',
        ],
        fit: {
          yes: ['**Day traders futures**', 'Envie d\'un **opérateur établi**', 'À l\'aise avec une **limite suiveuse surveillée en direct**'],
          no: ['Traders **forex ou CFD**', '**Swing traders** qui gardent la nuit', 'Choix **surtout sur le prix**'],
        },
      },
    ],
    sources: [
      { label: 'Centre d\'aide Topstep : Maximum Loss Limit', url: 'https://intercom.help/topstep-llc/en/articles/8284204' },
      { label: 'Centre d\'aide Topstep : consistance', url: 'https://help.topstep.com/en/articles/8284208-consistency-at-topstep' },
      { label: 'Centre d\'aide Topstep : payouts', url: 'https://intercom.help/topstep-llc/en/articles/8284234-payout-faqs' },
      { label: 'Topstep sur Trustpilot', url: 'https://www.trustpilot.com/review/topstep.com' },
    ],
    faq: [
      {
        question: 'Topstep est-il une arnaque ?',
        answer:
          'Non. Topstep existe depuis 2012, publie ses règles en détail et n\'a pas d\'alerte de régulateur recensée par PropRadar. Ses comptes d\'évaluation et Express Funded sont simulés, comme chez toutes les prop firms.',
      },
      {
        question: 'Quel partage des profits chez Topstep ?',
        answer: '90 % pour les traders inscrits depuis le 12 janvier 2026 ; 100 % des 10 000 premiers dollars puis 90 % pour les plus anciens.',
      },
      {
        question: 'Peut-on garder une position overnight chez Topstep ?',
        answer: 'Non, toutes les positions doivent être fermées avant la fin de séance.',
      },
    ],
    firmSlugs: ['topstep', 'apex-trader-funding', 'alpha-futures'],
    related: ['drawdown-prop-firm', 'regle-de-consistance-prop-firm', 'meilleures-prop-firms-2026'],
  },

  {
    slug: 'ftmo-vs-the5ers',
    enPath: '/guides/ftmo-vs-the5ers',
    title: 'FTMO vs The5ers : quelle prop firm choisir en 2026 ?',
    metaDescription:
      'FTMO ou The5ers ? Comparatif 2026 : prix, objectifs, drawdown, règles de consistance, payouts, avis Trustpilot et profil de trader adapté à chacune.',
    eyebrow: 'Comparatif',
    h1: 'FTMO vs The5ers : deux profils solides, pas le même usage',
    answer:
      'FTMO et The5ers font partie des prop firms forex les plus fiables (91/100 et 85/100 chez PropRadar). FTMO est la référence la plus documentée mais plus chère ; The5ers est moins chère à l\'entrée et utilise souvent des limites statiques. Le choix dépend surtout de votre budget et de votre façon de gérer le drawdown.',
    keywords: ['ftmo vs the5ers', 'ftmo ou the5ers', 'the5ers avis', 'ftmo avis'],
    updated: '2026-11-12',
    intro:
      'FTMO et The5ers reviennent dans presque tous les classements sérieux. Les deux sont **anciennes, transparentes et bien notées** sur Trustpilot. Elles ne s\'adressent pourtant **pas exactement au même trader**.',
    keyPoints: [
      'Deux profils solides : **91/100** pour FTMO, **85/100** pour The5ers.',
      'FTMO : **la plus documentée**, mais plus chère (environ 155 $).',
      'The5ers : **entrée moins chère** (environ 39 $) et limites souvent **statiques**.',
      'Les règles évoluent : **vérifiez la page officielle** avant d\'acheter.',
    ],
    sections: [
      {
        heading: 'Les deux firmes en bref',
        paragraphs: [
          'Transparence : PropRadar a une **relation d\'affiliation avec les deux firmes**. Elle n\'a aucun effet sur leurs scores.',
        ],
        compare: {
          columns: ['FTMO', 'The5ers'],
          rows: [
            { label: 'Score PropRadar', values: ['**91/100**', '**85/100**'] },
            { label: 'Fondée', values: ['2015, République tchèque', '2016, Israël et Royaume-Uni'] },
            { label: 'Prix d\'entrée', values: ['environ 155 $', 'environ 39 $'] },
            { label: 'Trustpilot (23 oct. 2026)', values: ['4,8 sur 54 942 avis', '4,7 sur 40 309 avis'] },
          ],
        },
      },
      {
        heading: 'Règles des programmes phares (relevées en juillet 2026)',
        paragraphs: [
          'Depuis le **12 octobre 2026**, le challenge FTMO 1-Step utilise une **règle de consistance** (meilleure journée comparée au profit total) à la place de l\'ancienne « Best Day Rule », qui reste valable pour les commandes antérieures. PropRadar n\'a pas relevé de règle de meilleure journée en pourcentage sur le programme High Stakes de The5ers.',
        ],
        compare: {
          columns: ['FTMO 2 étapes', 'The5ers High Stakes'],
          rows: [
            { label: 'Objectif phase 1', values: ['**10 %**', '**8 %**'] },
            { label: 'Objectif phase 2', values: ['5 %', '5 %'] },
            { label: 'Perte journalière max', values: ['5 %', '5 %'] },
            { label: 'Perte totale max', values: ['10 %', '10 %'] },
          ],
          note: 'Relevé en juillet 2026 : vérifiez la page officielle du programme avant d\'acheter.',
        },
      },
      {
        heading: 'Payouts et annonces économiques',
        paragraphs: [
          '**FTMO** traite généralement les payouts en **1 à 3 jours ouvrés**. Le trading des annonces est autorisé en évaluation et sur les comptes Swing, mais certaines annonces sont **restreintes sur les comptes financés Standard**.',
          '**The5ers** verse en général ses payouts en **quelques jours ouvrés** ; certains programmes sont moins souples pour les profils news ou scalping, à vérifier selon le programme choisi.',
        ],
      },
      {
        heading: 'Laquelle choisir ?',
        paragraphs: ['Les deux sont des choix sérieux. Le bon choix dépend de vous :'],
        compare: {
          columns: ['Plutôt'],
          rows: [
            { label: 'Budget serré pour un premier essai', values: ['**The5ers**'] },
            { label: 'Documentation et historique public maximum', values: ['**FTMO**'] },
            { label: 'Envie d\'une limite fixe', values: ['**The5ers** et ses limites souvent statiques'] },
            { label: 'Annonces sur compte financé', values: ['Comparez **FTMO Swing** et le programme The5ers visé'] },
          ],
        },
      },
    ],
    sources: [
      { label: 'FTMO : objectifs de trading', url: 'https://ftmo.com/en/trading-objectives/' },
      { label: 'FTMO : mise à jour du 8 octobre 2026', url: 'https://ftmo.com/au/blog/trading-updates/trading-update-8-oct-2026/' },
      { label: 'The5ers : programmes', url: 'https://the5ers.com/programs/' },
      { label: 'FTMO sur Trustpilot', url: 'https://www.trustpilot.com/review/ftmo.com' },
      { label: 'The5ers sur Trustpilot', url: 'https://www.trustpilot.com/review/the5ers.com' },
    ],
    faq: [
      {
        question: 'FTMO ou The5ers, laquelle est la plus fiable ?',
        answer:
          'Les deux sont parmi les plus fiables du marché. FTMO obtient 91/100 et The5ers 85/100 chez PropRadar en octobre 2026, avec des notes Trustpilot de 4,8 et 4,7.',
      },
      {
        question: 'Laquelle est la moins chère ?',
        answer: 'The5ers, avec des programmes à partir d\'environ 39 $ contre environ 155 $ pour FTMO, selon les prix relevés par PropRadar.',
      },
    ],
    firmSlugs: ['ftmo', 'the5ers', 'funderpro'],
    related: ['meilleures-prop-firms-2026', 'regle-de-consistance-prop-firm', 'drawdown-prop-firm'],
  },
];

export function getFrArticle(slug: string) {
  return frArticles.find((article) => article.slug === slug);
}

export function getFrArticleByEnPath(path: string) {
  return frArticles.find((article) => article.enPath === path);
}
