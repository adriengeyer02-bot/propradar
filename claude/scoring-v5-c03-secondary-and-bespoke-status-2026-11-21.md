# PropRadar V5 — C03 secondaire (21 novembre 2026)

**Quatre réaudits numériques complets, soit 52 critères documentés, et une revue de statut sans note.** Aucun score live, lien affilié ou produit n'est modifié. Barème et garde-fous : [SCORING_V5.md](../SCORING_V5.md). Données exhaustives : [scoring-v5-proposals-c03-secondary.json](../app/data/scoring-v5-proposals-c03-secondary.json). Test : `node scripts/test-scoring-v5-proposals-c03-secondary.mjs`.

## Tableau de décision (propositions, non publiées)

| Firme | Ancienne note | Paiements A/25 | Contrat B/25 | Juridique C/20 | Transparence D/20 | Historique E/10 | Editorial Score (avant B2) | Restrictive Rules | Trustpilot | Note V5 proposée | Confiance |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Lux Trading Firm | 58 | 15 | 14 | 15 | 16 | 8 | 72 | −4 | 0 | **68** | Moyenne |
| TenTrade | 58 | 15 | 13 | 17 | 14 | 6 | 67 | −2 | 0 | **65** | Moyenne |
| Sway Funded | 56 | 15 | 16 | 11 | 10 | 6 | 60 | −2 | 0 | **58** | Faible |
| Forex Funds Flow | 57 | 15 | 13 | 11 | 10 | 6 | 57 | −2 | 0 | **55** | Faible |

**Attention :** B contient B2 réduit. La différence `10−B2` constitue la section graphique « Restrictive Rules ». **Elle n'est pas retranchée une seconde fois** des cinq piliers. A3=1 partout : aucune preuve de paiement indépendante de niveau acceptable n'a été obtenue. Ne pas confondre note V5 et garantie d'encaissement.

## Lux Trading Firm — 58 → 68

### Sources et portée
- [CGU actuelles](https://luxtradingfirm.com/t_c-2/) §§9.3–9.4 : **comptes achetés avant le 22 septembre 2025** régis par leurs règles historiques, alors que les nouveaux comptes relèvent du [Rulebook actuel](https://luxtradingfirm.com/rules-of-engagement-3/). Ni sanction rétrospective ni défaut de clarté pour cette simple séparation. D2=4 ; D3=4. Les [anciens Trading Rules](https://luxtradingfirm.com/trading-rules/) ne s'appliquent pas automatiquement aux nouveaux clients.
- **Risque B2 −4 :** CGU **§10.1** autorisent à ne pas prendre en compte certains trades de l'évaluation suivant le seul jugement de Lux (−2) ; **§15.2–15.4** prévoient des consignes additionnelles individuelles du Risk Desk pour les stages supérieurs avec exclusion possible (−2). Ce sont **deux mécanismes distincts** dans des phases différentes ; la règle explicite de drawdown statique 6 % et les limites de taille n'ont aucun malus.
- **B1=8 provisoire :** CGU §9.5 et §7.2 prévoient que la résiliation n'engendre pas de remboursement, mais le texte vise surtout la **fee** du challenge. Ce passage seul **ne prouve pas** la confiscation de récompenses déjà acquises. Convention funded/contrat avec le Risk Desk non retrouvé dans sa version signée.
- **Identité / C1=7, C2=4 :** [Companies House #13160991](https://find-and-update.company-information.service.gov.uk/company/13160991) = *Active* ; dernière [confirmation janvier 2026](https://find-and-update.company-information.service.gov.uk/company/13160991/filing-history). Les comptes arrêtés au **31/01/2026**, dus **31/10/2026**, ne figurent pas dans l'historique consulté, d'où **statut actif avec retard administratif apparent**, pas dissolution. Le site nomme aussi une société à Dubaï, dont le rôle au paiement final reste à confronter.
- **Payouts :** la société annonce le retrait sur demande, le partage de gains et une progression, mais les frais/caps ne sont pas exhaustifs, **A1=6**, et aucune série de virements attribués indépendamment n'a été obtenue (**A2=8 neutre, A3=1**). [Trustpilot](https://www.trustpilot.com/review/luxtradingfirm.com) présente un TrustScore et des plaintes isolées, pas de rétention officielle de note : **0 Trustpilot**.
- **À obtenir :** contrat de gains actuels pour comptes activés après septembre 2025, accord de l'opérateur Dubai/UK, registre UAE, version contrat et traçabilité des payout rails.

## TenTrade — 58 → 65

- **Entité et licence / C1=7, C2=6 :** le registre officiel de la [Seychelles FSA, Capital Markets](https://fsaseychelles.sc/regulated-entities/capital-markets) mentionne **Evalanch Ltd**, avec marque **TENTRADE / 10Trade**. Le [footer TenTrade](https://tentrade.com/en/) fournit le numéro société **8429760-1** et la licence déclarée **SD082**. **Ce fait est pertinent pour l'identité du broker**, pas une garantie de règlements ni de protection du programme prop. La société chypriote SKAI Consultancy agit en tant que représentant, non en tant que broker agréé.
- **Contrat / B1=5 :** le document [Funded Trader Terms](https://tentrade.com/wp-content/uploads/2026/04/Funded-Terms-2026.pdf) accessible depuis les [Legal Documents officiels](https://tentrade.com/en/company/legal-documentations/) décrit, au chapitre de disqualification, une **possibilité de perdre ou voir refuser les payouts sur suspicion raisonnable de stratégies interdites**, décision annoncée comme définitive. Les mêmes termes précisent qu'aucun payout ne sera refusé à un trader respectant les règles. Cela justifie une protection réduite, **sans conclure que l'entreprise a effectivement refusé à tort une rémunération**.
- **Règles / B2=8 :** la liste distincte des stratégies interdites emploie les catégories **« ultra-fast scalping » / « tick scalping »** sans seuil temporel, tandis que la fermeture du compte est prévue : une ambiguïté −2. Application exacte aux nouvelles offres TenEdge/TenExpress à confirmer : les PDF continuent de présenter des modèles Ten Freedom/Legacy.
- **Produits / A1=6 et D3=2 :** [comparatif 2026](https://tentrade.com/en/trade/funded-accounts/funded-trader/) : programmes TenEdge/TenExpress, retrait normal **15 jours**, split **70/30**, 5–10 jours selon catégorie, caps chiffrés. L'ancien PDF évoque parfois **2 payouts hebdomadaires** sur **Ten Freedom**, ce qui n'est **pas une preuve de contradiction actuelle sur un même programme**. Frais complets du retrait et parcours final non vérifiés.
- **Historique E1=4 :** activité du programme funded attestée par les avis [Trustpilot](https://www.trustpilot.com/review/tentrade.com) au moins depuis 2024, pas de preuve complète de trois ans d'exploitation de cette **offre prop**. A2=8, A3=1 faute de virements indépendants reliés au programme. Aucun malus réputationnel Trustpilot automatique.
- **Limite PDF :** la lecture de la page de retrait 2026 a été confirmée par capture, mais la capture de la partie « Funded Trader Terms » renvoie une erreur de cache du fournisseur. Les clauses sont disponibles en texte indexé, mais l'examen final devrait récupérer la version originale signée et l'exécuter sur les nouveaux produits avant approbation.

## Sway Funded — 56 → 58

- **Contrat courant :** le [footer officiel 2026](https://www.swayfunded.com/) attribue la vente à **SF FUNDED LTD Sainte-Lucie #2026-00408** et les encaissements/décaissements à **Corvexia Holding LTD Chypre #HE489845, agent de paiement**. Le [portail /p/terms](https://my.swayfunded.com/p/terms) contient des clauses plus anciennes nommant **Sway Funded FZCO** ; la [page /terms](https://www.swayfunded.com/terms) charge un sélecteur et affiche par défaut les conditions **affiliés**, pas le contrat acheteur complet. **Ne pas présenter l'ancien FZCO comme vendeur courant sans novation démontrée.** C1=4, C2=3, D2=2, D3=2, confiance faible.
- **B1=8 provisoire :** ancienne version §14.2 ne garantit pas les futures rémunérations, mais la protection de **gains déjà acquis auprès de SF FUNDED LTD** n'est pas vérifiée. Ni B1=15 fictif, ni B1=0 arbitraire.
- **B2=8 / −2 :** ancienne clause §7.5 permet de décider discrétionnairement ce qui est Prohibited Trading, avec possibilité de clôturer un compte. Le suivi du risque est documenté, **applicabilité contractuelle 2026 encore ouverte**. Le site indique ne pas appliquer de consistency rule aux offres qui ne le prévoient pas : ne jamais pénaliser une absence de règle.
- **A1=6 ; A2=8 ; A3=1 :** récompenses à la demande/24 h annoncées sur le [site](https://www.swayfunded.com/) ; les montants « Live Profit » sont des **éléments commerciaux internes**, pas des TXIDs et bénéficiaires bancaires vérifiés. [Trustpilot](https://www.trustpilot.com/review/swayfunded.com) présente un score 4.1/5, aucune suspension institutionnelle active de la note, donc **0 malus**.
- **Historique :** marque attestée depuis mars 2024 (E1=4), mais ne vaut pas ancienneté juridique de la société créée en 2026. Demander CGU client en vigueur et preuve de novation de tous anciens comptes.

## Forex Funds Flow — 57 → 55

- **Source courante :** le [catalogue FFF Boost](https://forexfundsflow.com/challenge) présente retrait chaque **3 jours**, minimum **50 USD**, split **65 % croissant à 80 %**, trois jours nécessaires, et le [guide dashboard](https://www.forexfundsflow.com/blogs/fff-dashboard-tutorial-for-payout-requests0405202602) décrit la demande. A1=6, A2=8 neutre, A3=1 : des [avis utilisateurs](https://www.trustpilot.com/review/forexfundsflow.com) de juillet 2026 signalent des retards, mais pas au seuil V5 de 14 jours supplémentaires avec deux cas indépendants vérifiés.
- **B1=5 :** la [section Schedule A / §5.3 des CGU](https://forexfundsflow.com/terms-conditions) prévoit suspension, perte de récompenses en cas d'infractions avec critères partiellement ouverts. Pas de double retrait : le B2 −2 vise **une AUTRE clause**, « gambling / random lot spikes » sans test quantifié, §5.2.17 ; règles 80 % de marge et minimum deux minutes annoncées ne sont pas intrinsèquement pénalisées.
- **Incohérences réelles / C1=4, D3=0 :** [CGU anglaises](https://forexfundsflow.com/terms-conditions) présentent **Fx Funds Flow Ltd Sainte-Lucie #2025-00415** et **FF Flow Ltd #78177928 Hong Kong**, mais le [footer /about](https://www.forexfundsflow.com/about) situe AUSSI la deuxième société à Sainte-Lucie. Par ailleurs le Schedule A décrit un capital « réel » alors que les sections 2–3 et le footer insistent sur une simulation uniquement. Ce défaut de cohérence non-trading n'est pas un second malus B2.
- **D2=4 :** les CGU §6 prévoient un préavis d'au moins **7 jours** et un refus pouvant conduire à la résiliation pour les contrats existants, mais aucune version d'application date/numéro actuel n'est vérifiée. E1=4 sur un historique de la marque depuis mai 2025, sans preuve d'une histoire avant 2023.
- **Disponibilité :** des observateurs ont constaté des **erreurs 503 du 13 au 16 novembre 2026** ([journal](https://mypropgenius.com/closed-firms/forex-funds-flow/)), mais **au 21 novembre les offres et les CGU sont à nouveau consultables**, donc le site n'est **PAS déclaré fermé** ; l'indisponibilité historique reste un incident technique à surveiller. Il ne justifie pas seul A2=6 ou C2=0.

## Bespoke Funding Program — vérification de statut, **sans nouvelle note**

**[Companies House #14377446](https://find-and-update.company-information.service.gov.uk/company/14377446)** : société **BESPOKE FUNDING PROGRAM LTD dissoute le 4 août 2026**. **[Prop Firm Match](https://propfirmmatch.com/unlisted-prop-firms/bespoke-funding-program)** l'a déréférencée après une controverse sur les paiements rapportée par [FX News Group](https://fxnewsgroup.com/forex-news/retail-forex/prop-firm-bespoke-funding-delisted-from-propfirmmatch-following-payout-delay-reports/) en 2024. Domaine principal ne donne pas de parcours d'achat indépendant vérifiable à la date de ce rapport.

**Ce qui N'EST PAS établi :** le sort juridique de tous les comptes historiques, l'identité d'un éventuel repreneur, l'existence d'une société homonyme qui exploiterait légitimement un nouveau challenge. Pas de score concurrentiel `null`, pas de popup « fermeture définitive de la marque » ni d'archivage silencieux avant décision éditoriale.

## Avancement — file prioritaire canonique 122

- 11 scores publiés V5.
- 7 propositions PR #240 ; 4 propositions PR #241 ; 5 propositions PR #243 ; **4 proposées ici = 20 propositions**.
- **31/122** dossiers de la file ont désormais une scorecard V5 complète. **91 à réauditer**, auxquels s'ajoutent les statuts non chiffrés (notamment Bespoke et quatre dossiers de PR #241).
- Les six fiches bonus de PR #242 sont **hors file canonique 122** et ne doivent pas être comptées dans les 31.

**Périmètre publication :** tous les changements sont dans des fichiers de propositions. `scoring-v5-published.json`, classements live, promotions et liens affiliés sont inchangés. Exiger revue du propriétaire et, si nécessaire, réponses des firmes avant activation.
