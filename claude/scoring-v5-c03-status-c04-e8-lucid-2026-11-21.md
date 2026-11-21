# PropRadar — C03 statut et C04 audit V5, 21 novembre 2026

**STATUT : PROPOSITIONS NON PUBLIÉES.** 2 firmes actives chiffrées selon 13 critères V5 chacune, 7 anciennes fiches C03 examinées sans note concurrentielle. Ce lot documente **26 sous-notes** et des sources par critère, aucune approbation implicite.

Le barème est [SCORING_V5.md](../SCORING_V5.md) et le fichier structuré est [scoring-v5-proposals-c03-status-c04-e8-lucid.json](../app/data/scoring-v5-proposals-c03-status-c04-e8-lucid.json).

## Synthèse V5

| Firme | Ancien score | A/25 | B/25 | C/20 | D/20 | E/10 | Éditorial avant B2 | Règles B2 | Trustpilot | Proposition V5 | Confiance |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| e8-futures | 52 | 18 | 15 | 11 | 14 | 6 | 64 | −0 | 0 | **64** | faible |
| lucid-trading | 53 | 17 | 13 | 17 | 16 | 6 | 71 | −2 | 0 | **69** | moyenne |

> **Important :** les cinq piliers incluent déjà le B2 réduit. La colonne « Règles B2 » est la décomposition visuelle demandée « Editorial Score » / « Restrictive Rules », et non un deuxième retrait. Trustpilot = 0 en l'absence de suspension institutionnelle active. La confiance faible interdit de recommander automatiquement.

## 1. E8 Futures — bilan et distinction entre produits

- Le suivi [Payout Junction](https://payoutjunction.com/firms/e8markets) vérifie des sorties Rise **à l'échelle d'E8Markets**, depuis novembre 2023. [Les statistiques hebdomadaires](https://payoutjunction.com/weekly/2026-w46) montrent l'activité encore récente, mais **ne ventilent pas par E8 Futures vs Forex et Crypto**. Le barème interdit de transposer automatiquement deux années de preuves à la sous-gamme futures. D'où A2=8 neutre et A3=2 limité, non A2=10 et A3=5. Rechercher des transactions attribuées explicitement aux contrats futures.
- Les [CGU E8 Funding LLC §5.1–5.3](https://e8futures.com/e8-markets-terms-and-conditions) permettent, sur décision unilatérale de conformité, de retirer des rewards potentiellement acquises : **B1=5**. Sans accusation de refus abusif réellement constaté.
- Les [règles Signature Futures](https://helpfutures.e8markets.com/en/articles/11864618-e8-signature-futures) (achats **à partir du 14 juillet 2026**) prévoient **maximum cinq retraits**, profits inutilisés des cycles précédents **non reportés**, caps par taille, buffer non retirable et best-day à 35 %. Ce sont des **restrictions économiques annoncées**, **B2=10, aucun malus d'ambiguïté**. Attention à ne pas leur appliquer les conditions de [Zero Futures](https://help.e8markets.com/en/articles/13106558-all-product-overviews-e8-one-vs-e8-zero-vs-e8-pro-vs-e8-signature), différent.
- Les mêmes CGU §6.5 permettent de réviser rétroactivement des fonctionnalités, sans garantie de conditions anciennes. **D2 perd deux points**, mais faute de **changement adverse effectivement prouvé** sur un compte ancien précis, aucune retenue rétroactivité B2. Le contrat spécifique ESPA doit encore être rapproché.
- **Structure juridique** : E8 Funding LLC Texas, E8 Markets Ltd Sainte-Lucie #2025-00347 pour MT5, Digital Renaissance LLC Porto Rico déclarée pour la gestion du site. L'extrait de registre courant de l'entité débitrice Futures et le dernier checkout ne sont pas recoupés : **C1=4, C2=3**, confiance faible. Le rôle d'un courtier autre que le fournisseur de simulation n'est pas implicitement transféré.
- **Contrôle Trustpilot :** [fiche E8Markets](https://www.trustpilot.com/review/e8markets.com) affiche des avis et un score ; pas d'avis institutionnel de suppression de note constaté, donc **0 malus**. Pas de garantie d'absence de plaintes.

## 2. Lucid Trading — une société identifiée, des clauses de risque ouvertes

- Le [contrat actuel du 13 novembre 2026](https://lucidtrading.com/terms-of-use/) §Prohibited Uses prévoit la modification des trades, l'ajustement de soldes et la suspension ou rétention de payouts à la discrétion de l'entreprise. §Identity Verification ajoute la retenue pendant l'enquête. Le **recours humain via support chat** est expressément prévu, mais n'efface pas la faculté de réévaluation large des sommes : **B1=5**.
- **B2=8** sur un fait **différent** : stratégies « not representative of responsible trading in live markets » et « microscalping » sans seuil universel, pouvant entraîner clôture d'accès. Une seule ligne `ruleDeductions` à −2, reliée à sa propre `negativeFactId`, sans recompter la retenue B1.
- La [FAQ LucidFlex](https://support.lucidtrading.com/en/articles/12945796-lucidflex-payouts) donne **90/10**, cinq jours rentables, **500 USD minimum**, limite de **50 % des profits** et caps selon taille, cinq retraits au maximum, sans buffer. La [FAQ LucidPro](https://support.lucidtrading.com/en/articles/12890092-lucidpro-payouts) impose **40 % best day** et buffer, ce qui est **un autre programme** et n'est pas imputé à LucidFlex.
- La [fiche officielle Florida Sunbiz M26000016198](https://search.sunbiz.org/Inquiry/CorporationSearch/SearchResultDetail?aggregateId=forl-m26000016198-cba252eb-40ff-4e36-9949-8d4ae29cc6a6&directionType=ForwardList&inquirytype=EntityName&listNameOrder=LUCIDTITLEGROUP+L230001998710&searchNameOrder=LUCIDTRADINGGROUP+M260000161980) indique **LUCID TRADING GROUP LLC, ACTIVE**, enregistrée comme société étrangère Delaware **12 octobre 2026**. Elle n'a **pas** de déclaration annuelle floridienne due aussi tôt : **C1=7, C2=6**. Le contrat individuel funded et les conditions d'un partenaire de compte live demeurent distincts.
- L'[historique public du lancement](https://bestprops.com/what-is-lucid-trading/) situe l'ouverture en **avril 2025** : **E1=4**, pas les années d'un autre produit appelé Lucid. [Trustpilot](https://www.trustpilot.com/review/lucidtrading.com) affiche un score, pas de retrait institutionnel ; plaintes et témoignages ne valident pas des transferts individuels : **A2=8, A3=1**.
- Le dossier doit encore obtenir une **preuve externe datée de payouts réellement attribuables à Lucid**, le contrat funded en vigueur, la grille de frais et un éventuel exemple utile de résolution hors payout, plutôt que de sur-noter les témoignages.

## Détail des 26 sous-notes, motivation et source

### e8-futures (audit 2026-11-21)

| Critère | Note | Motivation documentée | Source |
| --- | ---: | --- | --- |
| A1 | 8/10 | Pour Signature Futures, les CGU donnent le traitement sous sept jours et la FAQ précise l'éligibilité au premier cycle (+2), le split et seuil net minimum 100 USD mais pas tous frais de rail (+0), le 35 % best-day et cinq jours profitables entre payouts (+2), caps … | [1](https://helpfutures.e8markets.com/en/articles/11864618-e8-signature-futures), [2](https://e8futures.com/e8-markets-terms-and-conditions) |
| A2 | 8/10 | Le tracker indépendant Payout Junction retrace des paiements Rise E8Markets depuis 2023, mais agrège FOREX/CRYPTO/FUTURES : aucun historique de 12 ou 24 mois n'est isolé pour la sous-gamme E8 Futures. Il ne suffit donc pas pour A2=9/10 sur la division précise ; auc… | [1](https://payoutjunction.com/firms/e8markets), [2](https://payoutjunction.com/weekly/2026-w46) |
| A3 | 2/5 | Payout Junction offre une preuve transactionnelle indépendante à l'échelle de la MARQUE E8Markets depuis novembre 2023, cependant pas un sous-registre identifié Futures. Attribution positive de paiements à la marque crédible mais séparation du programme non achevée… | [1](https://payoutjunction.com/firms/e8markets), [2](https://help.e8markets.com/en/articles/13106558-all-product-overviews-e8-one-vs-e8-zero-vs-e8-pro-vs-e8-signature) |
| B1 | 5/15 | CGU E8 Funding LLC §5.1–5.3 : en cas de non-conformité déterminée à sa seule appréciation, E8 peut retenir ou retirer des récompenses ; ESPA et accord E8 Trader définissant des protections supplémentaires ne sont pas rapprochés dans une version individuelle. Droit … | [1](https://e8futures.com/e8-markets-terms-and-conditions) |
| B2 | 10/10 | Payout caps, cinq retraits maximum, 35 % best-day et exclusion des profits de cycles antérieurs sont annoncés distinctement pour Signature après le 14 juillet 2026. §5.1 et ses pouvoirs de refus sont déjà dans B1. Le §6.5 permet de modifier des fonctionnalités rétr… | [1](https://helpfutures.e8markets.com/en/articles/11864618-e8-signature-futures), [2](https://e8futures.com/e8-markets-terms-and-conditions) |
| C1 | 4/10 | L'accord contractuel nomme E8 Funding LLC au Texas, le footer distingue E8 Markets Ltd Sainte-Lucie #2025-00347 sur MT5 et Digital Renaissance LLC Porto Rico pour le site. L'identité nommée est plausible mais le registre officiel texan et l'entité figurant sur fact… | [1](https://e8futures.com/e8-markets-terms-and-conditions), [2](https://e8futures.com/) |
| C2 | 3/6 | La LLC texane contractante est déclarée dans les CGU mais aucun extrait de situation officiel daté novembre 2026 n'a été rapproché du checkout E8 Futures, donc statut non vérifiable au niveau C2=6. Aucune dissolution attribuable n'a été établie. | [1](https://e8futures.com/e8-markets-terms-and-conditions), [2](https://e8futures.com/) |
| C3 | 4/4 | Recherche datée d'avertissements institutionnels sur E8 Funding LLC et E8 Markets sans sanction officielle directement applicable au programme Futures simulé identifiée dans le corpus. L'absence d'un agrément de courtage n'est pas, à elle seule, une sanction pour u… | [1](https://e8futures.com/e8-markets-terms-and-conditions), [2](https://www.fca.org.uk/consumers/warning-list-unauthorised-firms) |
| D1 | 8/8 | Les prix d'entrée, tailles de compte, profit targets, plafonds EOD, pauses et limites journalières, plages news/overnight, KYC et exclusions géographiques sont accessibles via les comparatifs Futures et CGU. Différenciation explicite Zero Futures et Signature Futur… | [1](https://e8futures.com/), [2](https://helpfutures.e8markets.com/en/articles/11864618-e8-signature-futures) |
| D2 | 4/6 | CGU juridiquement accessibles (+2) et datées du 3 novembre 2025 (+2). §§1.4 et 6.5 autorisent des changements immédiats, y compris rétroactifs de fonctionnalités, sans garantie claire de préservation de la structure de payout existante (+0). | [1](https://e8futures.com/e8-markets-terms-and-conditions) |
| D3 | 2/6 | Les textes expliquent les comptes simulés et distinguent opérateur de simulation, marque et prestataire MT5 (+2). L'incorporation ESPA, les anciens chiffres payout de plusieurs produits et le checkout final Futures ne sont pas tous conciliés (0+0), et une page Sign… | [1](https://e8futures.com/e8-markets-terms-and-conditions), [2](https://help.e8markets.com/en/articles/13106558-all-product-overviews-e8-one-vs-e8-zero-vs-e8-pro-vs-e8-signature) |
| E1 | 4/6 | Le lancement E8 Futures est documenté fin 2024 ; cela ne démontre pas 36 mois d'activité du programme Futures au 21 novembre 2026, même si E8Markets est plus ancien. Palier 18–35 mois. | [1](https://help.e8markets.com/en/articles/13106558-all-product-overviews-e8-one-vs-e8-zero-vs-e8-pro-vs-e8-signature), [2](https://bestprops.com/what-is-e8-markets/) |
| E2 | 2/4 | Help center Futures et contact support publiés (+1) ; réponses de l'équipe accessibles via le service client et Trustpilot (+1). Pas de procédure de recours indépendante efficace démontrée ni résolution vérifiable d'une contestation non-payout (+0+0). | [1](https://e8futures.com/), [2](https://www.trustpilot.com/review/e8markets.com) |

### lucid-trading (audit 2026-11-21)

| Critère | Note | Motivation documentée | Source |
| --- | ---: | --- | --- |
| A1 | 8/10 | LucidFlex : délai on-demand annoncé et paiement sous 2 jours ouvrés (+2) ; split 90 % et minimum 500 USD mais frais de tous canaux non documentés (+0) ; cinq jours positifs minimum et profit net sur cycle (+2) ; retrait jusqu'à 50 % des profits dans caps par taille… | [1](https://support.lucidtrading.com/en/articles/12945796-lucidflex-payouts), [2](https://support.lucidtrading.com/en/articles/12890092-lucidpro-payouts) |
| A2 | 8/10 | Les nombreux avis clients datés rapportent paiements et litiges, mais aucune série sur 12 mois de transactions attribuées indépendamment au débiteur de la société ne permet le palier 9/10 et les cas individuels négatifs ne suffisent pas à prouver deux refus injusti… | [1](https://www.trustpilot.com/review/lucidtrading.com), [2](https://lucidtrading.com/general-faq/) |
| A3 | 1/5 | Montants auto-annoncés, confirmations d'utilisateurs et avis Trustpilot vérifiés comme auteurs, mais pas de relevés de transfert indépendants et attribuables Lucid Trading Group LLC, vérifiables par bénéficiaire et période. Le terme Trustpilot « Verified » ne signi… | [1](https://www.trustpilot.com/review/lucidtrading.com), [2](https://lucidtrading.com/) |
| B1 | 5/15 | CGU datées 13 novembre 2026, §Prohibited Uses : l'opérateur peut recalculer le solde, retenir ou refuser le paiement et fermer le compte sans remboursement, après appréciation de violation, et §Identity Verification permet de retenir des rewards pendant l'enquête. … | [1](https://lucidtrading.com/terms-of-use/) |
| B2 | 8/10 | Une ambiguïté DISTINCTE du paiement : les CGU classent parmi les stratégies prohibées celles qui ne seraient pas « representative of responsible trading in live markets » et le « microscalping », sans seuil temporel complet. Cela peut mener à résiliation de compte … | [1](https://lucidtrading.com/terms-of-use/), [2](https://support.lucidtrading.com/en/articles/12945796-lucidflex-payouts) |
| C1 | 7/10 | Lucid Trading Group LLC Delaware est citée dans les CGU comme contrepartie. La fiche officielle Florida Sunbiz pour son enregistrement étranger M26000016198 active confirme le même nom et l'État Delaware. Concordance facture du dernier achat et compte Live tiers no… | [1](https://lucidtrading.com/terms-of-use/), [2](https://search.sunbiz.org/Inquiry/CorporationSearch/SearchResultDetail?aggregateId=forl-m26000016198-cba252eb-40ff-4e36-9949-8d4ae29cc6a6&directionType=ForwardList&inquirytype=EntityName&listNameOrder=LUCIDTITLEGROUP+L230001998710&searchNameOrder=LUCIDTRADINGGROUP+M260000161980) |
| C2 | 6/6 | Florida Sunbiz enregistre Lucid Trading Group LLC au statut ACTIVE depuis le 12 octobre 2026 en tant que LLC étrangère du Delaware. Aucun rapport annuel Floride n'est encore exigible immédiatement après cette inscription ; absence de rapport ici n'est pas un retard… | [1](https://search.sunbiz.org/Inquiry/CorporationSearch/SearchResultDetail?aggregateId=forl-m26000016198-cba252eb-40ff-4e36-9949-8d4ae29cc6a6&directionType=ForwardList&inquirytype=EntityName&listNameOrder=LUCIDTITLEGROUP+L230001998710&searchNameOrder=LUCIDTRADINGGROUP+M260000161980) |
| C3 | 4/4 | Recherche ciblée d'avertissements réglementaires précis au nom Lucid Trading Group LLC dans le corpus officiel, aucun constat actuel matériel concernant la simulation n'a été identifié ; ne pas considérer une société de simulation comme broker enregistré par défaut. | [1](https://lucidtrading.com/terms-of-use/), [2](https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/index.htm) |
| D1 | 8/8 | Pages produits et FAQ détaillent frais de challenge, tailles, pertes, caps, LucidFlex/Pro/Daily/Direct, KYC, restrictions générales et règles de trading par produit/phase. Les comptes live partenaires sont explicitement distingués des comptes de simulation. | [1](https://lucidtrading.com/general-faq/), [2](https://support.lucidtrading.com/en/articles/12945796-lucidflex-payouts) |
| D2 | 4/6 | CGU complètes consultables (+2), dernière version 13 novembre 2026 (+2), mais les changements prennent effet lors de la mise en ligne et sont applicables à l'usage continu sans droit clairement réservé aux anciens comptes (+0), même si certaines FAQ protègent expli… | [1](https://lucidtrading.com/terms-of-use/), [2](https://support.lucidtrading.com/en/articles/12890092-lucidpro-payouts) |
| D3 | 4/6 | FAQ et conditions sont cohérentes sur les programmes LucidFlex/Pro et sur la nature simulée et le passage vers des accords Live distincts (+2+2). Le checkout, les frais de paiement et l'accord individuel de compte funded ne sont pas rapprochés (+0). | [1](https://lucidtrading.com/general-faq/), [2](https://lucidtrading.com/risk-disclosure-statement/) |
| E1 | 4/6 | Lancement Lucid Trading identifié en avril 2025 par presse et archives sociales, soit environ 19 mois à date de novembre 2026 : palier 18–35 mois. Ne pas compter l'âge du domaine comme antériorité du service. | [1](https://bestprops.com/what-is-lucid-trading/), [2](https://bestprops.com/prop-firms/lucid-trading/) |
| E2 | 2/4 | Canaux d'assistance et de revue humaine via support chat publiés (+1), nombreux retours clients sur la joignabilité et réponses du support (+1). La possibilité de demander une revue ne démontre pas qu'une contestation technique hors payout a été utilement résolue ;… | [1](https://lucidtrading.com/terms-of-use/), [2](https://www.trustpilot.com/review/lucidtrading.com) |

## 3. Sept dossiers C03 examinés, **aucune note numérique concurrentielle**

*Important :* l'impossibilité de vérifier une offre actuelle ou le détournement d'un domaine historique par une autre activité ne signifie pas à lui seul condamnation, fraude imputable à l'ancien opérateur ou faillite judiciaire. Réclamer une confirmation de la société et l'URL du checkout avant remise en avant.

| Firme | Ancien score public | État de contrôle | Source prioritaire |
| --- | ---: | --- | --- |
| nova-funding | 56 | domains redirect unrelated no current offer | [Contrôle](https://novafunding.com/) |
| aurafunded | 56 | former domain redirects to unrelated site help center still visible | [Contrôle](https://aurafunded.com/) |
| leveled-up-society | 56 | historical firm reported closed domain reused regulator warning scope review | [Contrôle](https://www.tradingview.com/news/financemagnates%3A099925cdd094b%3A0-exclusive-closed-prop-trading-firm-leveled-up-society-leaves-traders-in-limbo/) |
| the-forex-funder | 56 | offer and current operator unverified acquisition 2024 | [Contrôle](https://theforexfunder.com/) |
| nations-trading | 56 | no current offer or contract verified | [Contrôle](https://nationstrading.com/) |
| alphaproptraders | 56 | landing page legacy portal and current terms unverified | [Contrôle](https://alphaproptraders.com/) |
| fxrk | 58 | new framer offer historical domain warned by cnmv scope unresolved | [Contrôle](https://www.cnmv.es/portal/resultadobusqueda?lang=en&nombre=fxrk.com&tipo=1) |

### nova-funding

Le domaine historique novafunding.com redirige vers fundmylawsuitnow.com, société de financement de litiges sans rapport prouvé. L'autre ancien domaine nova-funding.com redirige vers un site de jeux sans rapport ; la marque Nova Funded sur novafunded.com est DISTINCTE. La fermeture juridique, les dettes envers clients et une éventuelle nouvelle société prop ne sont pas établies ; l'offre de Nova Funding ne peut plus être recommandée comme active sans nouveau contrat vérifiable.

Sources : [1](https://novafunding.com/) · [2](https://nova-funding.com/) · [3](https://novafunded.com/) · [4](https://vettedpropfirms.com/nova-funding-appears-to-shut-down-amid-scam-allegations/). **Statut à valider individuellement ; score null ; aucune mise à jour du site.**

### aurafunded

Le domaine historique aurafunded.com redirige vers aurapips.com qui publie maintenant un contenu de jeux/commerce sans rapport avec une offre de challenge. Pourtant help.aurafunded.com est encore lisible avec des règles de lot size et payout. Impossible de prouver une offre achetable actuelle, et la présence du help center n'est pas confirmation d'exploitation. Ne pas déplacer l'utilisateur vers le domaine redirigé, ni attribuer les nouvelles pages à l'ancien opérateur.

Sources : [1](https://aurafunded.com/) · [2](https://help.aurafunded.com/en/articles/10174531-consistency-rule) · [3](https://propfirmtier.com/en/firms). **Statut à valider individuellement ; score null ; aucune mise à jour du site.**

### leveled-up-society

Finance Magnates a documenté la fermeture de Leveled Up Society en 2023. Le domaine leveledupsociety.com redirige vers leveleduptraders.com, signalé réutilisé pour une activité sans lien, selon contrôles tiers d'octobre 2026. Une page FSMA mentionne le nom historique mais sa portée sur l'activité d'évaluation simulée n'est pas suffisamment établie. Ne pas affirmer qu'une nouvelle société portant une marque proche est identique ni router les traders vers le domaine historique.

Sources : [1](https://www.tradingview.com/news/financemagnates%3A099925cdd094b%3A0-exclusive-closed-prop-trading-firm-leveled-up-society-leaves-traders-in-limbo/) · [2](https://www.fsma.be/fr/leveled-society-httpsleveledupsocietycom) · [3](https://leveledupsociety.com/) · [4](https://mypropgenius.com/closed-firms/). **Statut à valider individuellement ; score null ; aucune mise à jour du site.**

### the-forex-funder

Le site theforexfunder.com renvoie une réponse 403 lors de la recherche et une inspection externe d'octobre 2026 le décrit comme non opérationnel. La société annonçait son acquisition par AXE Securities le 26 août 2024 ; cela ne prouve pas que l'acheteur a repris les dettes anciennes ni qu'une offre actuelle peut être achetée. Les règles accessibles au centre d'aide datent principalement de 2024, donc pas de score concurrentiel actuel.

Sources : [1](https://theforexfunder.com/) · [2](https://mypropgenius.com/closed-firms/theforexfunder/) · [3](https://support.theforexfunder.com/en/collections/10321339-the-forex-funder-rules) · [4](https://www.financemagnates.com/forex/offshore-cfds-broker-axe-enters-prop-trading-acquires-the-forex-funder/). **Statut à valider individuellement ; score null ; aucune mise à jour du site.**

### nations-trading

Le domaine nationstrading.com ne restitue aucun catalogue ou contrat de challenge actuel utilisable dans la consultation 21 novembre 2026. Les règles de min. 10 jours et frais crypto ne sont évoquées que par des comparateurs et une page Trustpilot conservant des conditions historiques. Ces copies ne valent pas une vente active, ni une preuve de fermeture juridique ; vérifier propriétaire du checkout et CGU 2026 avant toute note V5.

Sources : [1](https://nationstrading.com/) · [2](https://www.trustpilot.com/review/nationstrading.com) · [3](https://propfirm201.com/firms/nations-trading). **Statut à valider individuellement ; score null ; aucune mise à jour du site.**

### alphaproptraders

Le site alphaproptraders.com affiche toujours une roadmap 2024–2025 et des promesses de tokenisation de participations numériques, avec lien vers un portail platform.alphaproptraders.com indisponible à la consultation. Aucune convention funded datée 2026 ni dernier achat, ni identité du payeur actuel n'ont été vérifiés. Cette page existante ne prouve ni que de nouveaux challenges sont achetables ni la fermeture de la société.

Sources : [1](https://alphaproptraders.com/) · [2](https://platform.alphaproptraders.com/) · [3](https://propfirmmatch.com/unlisted-prop-firms/alphaproptraders). **Statut à valider individuellement ; score null ; aucune mise à jour du site.**

### fxrk

FXRK dispose d'un site de règles Framer datées mars 2026 annonçant les Instant et les deux étapes, avec changement des conditions dès le 17 mars. L'ancien domaine fxrk.com renvoie 404 ; la CNMV espagnole publie un avertissement du 17 février 2025 visant exactement FXRK / fxrk.com pour absence d'autorisation de services d'investissement. Les nouveaux textes Framer mentionnent Challenge Technologies FZCO UAE et FXRK Markets Ltd Sainte-Lucie #2025-00737, mais continuité juridique, contrat du checkout et portée de l'alerte pour la simulation NE sont PAS encore reliés. Ce signal n'est pas une sanction prouvée du programme simulé. Pas de score V5 chiffré tant que l'identité du vendeur ne peut être recoupée.

Sources : [1](https://www.cnmv.es/portal/resultadobusqueda?lang=en&nombre=fxrk.com&tipo=1) · [2](https://fxrk.framer.website/help-center/help-center-articles/new-trading-conditions) · [3](https://fxrk.framer.website/) · [4](https://fxrk.com/). **Statut à valider individuellement ; score null ; aucune mise à jour du site.**

## Avancement et validation

- **File principale de 122** : 11 notes V5 approuvées dans `main`, 7 propositions PR #240, 4 propositions PR #241, 5 propositions PR #243, 4 propositions PR #244, **2 dans ce lot** = **33 scorecards V5 /122**. Les **89 autres** ne sont pas toutes « à chiffrer » : parmi elles **7 statuts C03 examinés dans ce lot**, le dossier Bespoke (#244), et 4 dossiers de statut dans #241. Ils exigent une décision distincte avant de disparaître d'un classement actif.
- **C03 prioritaire (17 firmes)** : 9 notes proposées dans les PR #243/#244 + Bespoke statut #244 + 7 statuts ici = **17/17 dossiers instruits**, mais seulement **9/17 scorecards chiffrées**. Aucun score null n'est compté comme une note V5 terminée.
- Les **6 dossiers bonus de PR #242** sont hors de la file canonique ; ils ne diminuent pas les 89.
- Source de vérité : `scripts/check-v5-progress.mjs` ; les chiffres ci-dessus intègrent les **PR ouvertes non fusionnées**, pas seulement ce qu'un script lancé sur `main` peut constater.
- `node scripts/test-scoring-v5-c03-status-c04-e8-lucid.mjs` est ajouté mais le test Node doit être exécuté sur la branche/CI. Contrôle des totaux et valeurs permis réalisé séparément lors de la création. **Ne pas prétendre CI verte avant vérification.**
- **Aucune modification** de `app/data/scoring-v5-published.json`, du manifeste des scores, du comparateur public, des statuts live ou des affiliations. Aucun score 64 ou 69 n'est publié ; tous nécessitent validation du propriétaire. Pas de classification « fermé » publiée sans vérification de l'opérateur actuel.
