# PropRadar — Revue de fraîcheur des articles et guides, 23 novembre 2026

**Objet :** Revoir les articles publiés, rafraîchir les informations contractuelles changeantes, supprimer les affirmations dépassées, garder les traductions alignées, distinguer le contenu éditorial du classement V5.2 et du marketing affilié. **Aucune modification de score, de source de classement ou de promotion commerciale** n'est incluse.

## Inventaire structurel

- **25 fiches de guides en anglais** repérées dans `app/lib/seoGuides.ts` : titres SEO, descriptions, réponses rapides, FAQ, listes et pages de comparaison.
- **7 articles rédactionnels manuels en français** repérés dans `app/lib/frArticles.ts`. Les pages en français utilisent parfois une route propre, pas nécessairement la traduction `/fr/guides/...`.
- **7 articles longs anglais** dans `app/lib/guideArticles.ts` (avec contenus complémentaires dans `searchIntentGuides.ts` et `instrumentComparisonArticle.ts`).
- **8 traductions du guide GOAT** en fr/de/es/it/pt/hi/ja/zh alignées sur les corrections contractuelles de cette revue. Les autres guides localisés et les 15 langues du site ne sont **pas tous réaudit és** juridiquement sur leurs sources externes à cette date.
- Cet inventaire est une **revue de cohérence et priorité**, pas un examen juridique exhaustif de l'intégralité des 25 articles, des partenaires ni de toutes leurs sources.

## Corrections appliquées

| Article / fichier | Défaut identifié | Correction contrôlée |
|---|---|---|
| **GOAT Funded Trader**, EN + 8 langues | **58/100** écrit en dur alors que la fiche publique affiche **59/100** ; ancien plafond Trustpilot à 64 attribué à tort à la sanction | Redirection vers le **score en direct de la fiche**, explication V5.2 : Trustpilot **−6** pour retenue de score motivée, **pas** de plafond automatique 64 ; plafonds A3 séparés |
| **GOAT payout** | 3 % de frais, 14 jours présentés comme universels, exceptions par cohorte absentes | **2 %** de frais selon FAQ officielle, minimum courant **100 USD** sauf produit distinct (GOAT 1$ = 35 USD), 2 premiers payouts limités à **6 % ou 10 000 USD**, **4 % pour $5K Two-Step achetés depuis 25/07/2026**, traitement annoncé sous **2 jours ouvrés** sous KYC / contrat signé. **Aucun délai de réception certifié** |
| **GOAT minimum holding time** | « 2 minutes » énoncé pour tous les comptes | **Avant le 06/10/2026** : **2 minutes** ; challenge acheté **dès 06/10/2026** : **1 minute**. **Funded uniquement** ; gains non admissibles sur trades plus courts, pertes maintenues, reset sans changement de cohorte |
| **GOAT modèles historiques** | 3-Step annoncé retiré sans nuancer la page d'aide encore active ; 2-Step Standard évoqué comme nouveau produit | La FAQ **3-Step existe encore** mais sa page ne garantit pas la vente ; **2-Step Standard explicitement plus disponible aux nouveaux achats**. Les conditions de reset dépendent du modèle et de la date d'achat |
| **GOAT promos** | Code et bonus présentés comme invariants | FIRSTGFT **jusqu'à 50 % pour nouveaux clients éligibles** ; BOGO40 **40 % sur comptes éligibles et bonus de même plan uniquement après premier payout reçu et demande au support**. Durée, produits et panier à contrôler ; pas de bonus immédiat |
| **Topstep**, EN + FR | Absence des plafonds Standard vs Consistency et pays exclus au 17/11 | XFA Standard plafonds de base **$2K/$3K/$5K** vs Consistency **$3K/$4K/$6K** pour 50K/100K/150K, sous limite **50 % du solde**. Option DLL payante à l'achat d'un nouveau Combine pouvant augmenter le cap durant la campagne. Restrictions d'achats pour **13 pays dès 17/11/2026** et transition annoncée pour comptes concernés jusqu'au **31/12/2026**. Les comptes Live suivent règles distinctes |
| **FTMO vs The5ers**, FR + SEO EN | Ancien état juillet, pas de mention 1-Step octobre ni Black Friday | Règle de consistance FTMO **1-Step pour nouvelles commandes du 12/10/2026**, à ne pas appliquer au 2-Step ; **Black Friday jusqu'à −30 %** sur comptes éligibles **selon visuel partenaire**, prix final non vérifié dans le panier ; affiliation sans impact éditorial |
| **The5ers High Stakes**, FR | « quelques jours » sans fréquence précise | FAQ officielle **retraits tous les 14 jours** à partir du compte Pro ; confirmation à refaire au checkout selon phase |
| **Guide meilleur prop firm 2026**, EN + FR | Anciennes notes 91/85/84 d'octobre présentées comme classement en temps réel | **Capture historique explicitement datée**, renvoi aux scores en direct, aux étapes de migration V5.2 et à la différence de marchés/contrats. En FR, résumé des 5 piliers V5.2 **25/25/20/20/10** |

## Liens primaires de référence utilisés (sous réserve de changements futurs)

- **GOAT — frais, éligibilité, limites et KYC :** https://help.goatfundedtrader.com/en/articles/10742264-how-payouts-work-eligibility-request-processing-and-arrival
- **GOAT — durée minimum selon date d'achat :** https://help.goatfundedtrader.com/en/articles/12849041-what-is-the-minimum-holding-time-for-trades
- **GOAT — Goat Guard :** https://help.goatfundedtrader.com/en/articles/10742107-what-is-goat-guard
- **GOAT — FAQ modèles :** https://help.goatfundedtrader.com/en/collections/11811982-models
- **GOAT — reset selon cohorte :** https://help.goatfundedtrader.com/en/articles/15948316-how-do-resets-work
- **GOAT — promo BOGO40 officielle :** https://help.goatfundedtrader.com/en/articles/13928979-bogo40-promotion
- **GOAT — blog coupons FIRSTGFT :** https://www.goatfundedtrader.com/blog/prop-firm-deals-and-discount-codes
- **Topstep — plafond et split des retraits :** https://help.topstep.com/en/articles/8284233-topstep-payout-policy
- **Topstep — éligibilité régionale au 17 novembre :** https://help.topstep.com/en/articles/8284116-am-i-eligible-to-trade-with-topstep
- **FTMO — modification de règle d'octobre :** https://ftmo.com/en/blog/trading-updates/trading-update-8-oct-2026/
- **FTMO — page officielle :** https://ftmo.com/en/
- **The5ers — High Stakes FAQ :** https://the5ers.com/faqs/what-are-the-general-rules-for-the-high-stakes-program/
- **Trustpilot sanction GOAT — domaine exact :** https://www.trustpilot.com/review/goatfundedtrader.com

## Conditions de publication / limites

- Les chiffres de Trustpilot datés au 23 octobre ne sont conservés que comme **captures historiques** ; ils ne valent pas instantanément pour le 23 novembre et ne doivent pas être répétés comme « aujourd'hui ». Une sanction Trustpilot −6 ne se transfère pas entre domaines ou marques.
- Les scores des audits en **PR #263** et les scores actuellement publiés ne sont **pas** recalculés. Seule une approbation propriétaire permet la publication des 13 sous-critères V5.2. Pas de fusion de PR #263 par une revue d'articles.
- La réduction **FTMO Black Friday** vient du support partenaire transmis par le propriétaire ; ce n'est pas une réduction confirmée par une facture réelle. L'encart de la home a sa propre date de retrait interne.
- Les articles pédagogiques sur **drawdown, futures, CFD, options, consistency** gardent leurs exemples théoriques ; cette revue n'a pas révélé de raison probante de les réécrire tous. Certains contenus plus anciens restent à recontrôler **par firmes et programmes** à la prochaine mise à jour réglementaire.
- Les règles GOAT peuvent encore changer d'une cohorte à une autre. **Conserver un lien direct à l'article original et une date vérifiée**, ne pas inventer une règle universelle.
- Ajouter des dates de mise à jour uniquement aux pages dont le texte a réellement changé. Ne pas avancer artificiellement la date de publication des autres guides.

**PR dédiée à la revue éditoriale**, sans modifications de note ou d'algorithme. Les articles gardent leurs liens et canoniques. Contrôles compilation + routes FR/EN à effectuer sur la preview et production.
