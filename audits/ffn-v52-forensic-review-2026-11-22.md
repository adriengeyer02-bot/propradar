# Funded Futures Network — contrôle de cohérence V5.2 (22 novembre 2026)

**Statut : projet de révision, validation éditoriale requise. Pas de mise en production.**

## Pourquoi +32 était une alerte d'audit

Le premier jet de la fiche native annonçait **61** comparé à un `legacyScore:29` de la file de couverture. Or **29 n'est pas un score V5 à 13 critères rejouable**. Le profil source `app/lib/propFirms.ts` de `main` a même `score:33` (audit **partiellement vérifié**, dernière vérification 08/07/2026 ; la page primaire/les documents légaux n'étaient pas lisibles au moment de cette ancienne enquête). **29 et 33 ne sont donc pas deux dénominateurs probatoires égaux à la V5.2.** L'ancienne notation et le 61 n'ont jamais été recalculés sur un corpus constant.

L'erreur du premier jet n'était pas qu'un barème plus dur ne puisse jamais produire une note plus haute qu'une ancienne note **incomplète** : il était surtout que les contrats fondamentaux étaient déclarés « introuvables » et que B2=10 n'avait pas été confronté au document funded.

## Documents primaires retrouvés

- [Trader Agreement FFN Cap LLC](https://storage.googleapis.com/ffn-files/FFN_TRADER_AGREEMENT.pdf), clauses **5**, **9** et **16.12** : confiscation de profits en cas de violation, modification des règles après notification et qualification du gambling par la firme à sa seule discrétion.
- [Registre officiel Florida — Funded Futures Network LLC L22000267808](https://search.sunbiz.org/Inquiry/corporationsearch/SearchResultDetail?aggregateId=flal-l22000267808-ef268e24-6504-4505-a9de-a2ecfd86df50&directionType=Initial&inquirytype=EntityName&listNameOrder=FUNDECONUSA+L190002146180&searchNameOrder=FUNDEDFUTURESNETWORK+L220002678080&searchTerm=FUNDECON+USA%2C+LLC) : statut **ACTIVE**, dépôt rapport annuel **26/02/2026**.
- [Registre officiel Florida — FFN CAP LLC L22000325983](https://search.sunbiz.org/Inquiry/CorporationSearch/SearchResultDetail?aggregateId=flal-l22000325983-8d56024d-c38a-4937-9ba3-0a3f28b85df7&directionType=ForwardList&inquirytype=OfficerRegisteredAgentName&listNameOrder=TYILLIANGREGORYJ+L170001473950&searchNameOrder=TYJCAPITALLLC+L220003259833&searchTerm=Tyg+Media+Llc) : **ACTIVE**, rapport annuel **26/02/2026**.
- [Conditions générales hébergées sur Termly](https://app.termly.io/policy-viewer/policy.html?policyUUID=fb76d3c3-5faa-4e01-99e0-ba7b7033df92), dont la clause §27 de clôture « for any reason » est citée dans un [contrôle documentaire tiers daté 20/08/2026](https://rulesofprop.com/firms/funded-futures-network/). La page Termly est dynamique et n'a pas pu être lue directement dans notre navigateur ; la clause §5 du funded agreement est, elle, lisible dans le PDF primaire.
- [Page officielle FAQ](https://blog.fundedfuturesnetwork.com/faq), [produits](https://fundedfuturesnetwork.com/accounts), [ledger de versements auto-publié](https://blog.fundedfuturesnetwork.com/payouts) et [Trustpilot](https://www.trustpilot.com/review/fundedfuturesnetwork.com). Plusieurs plaintes datées et réponses de l'entreprise évoquent des règlements Rise bloqués ; **cela appelle investigation A2, pas imputation automatique A2=2/4** sans dates et exécution bancaire attestées.

## Révision des treize critères

| Critère | Jet initial 61 | Après lecture des pièces | Pourquoi |
|---|---:|---:|---|
| A1 Retraits | 8 | 8 | Conditions publiées mais frais par rail non réconciliés |
| A2 Incidents | 6 | 6 provisoire | Litiges distincts en revue, pas encore deux retards pleinement authentifiés |
| A3 Paiements positifs | 1 | 1 | Ledger tenu par la firme, pas certifié indépendamment |
| **B1 Protection des gains** | **6** | **0** | §5: tout profit du compte peut être perdu après violation; §16.12 discrétion; pas de recours opposable corroboré |
| **B2 Clarté règles trading** | **10** | **7** | §16.12 : qualification subjective de gambling (une seule ambiguïté −3) |
| C1 Partie contractante | 4 | 7 | Deux entités FL enregistrées mais contrat de vente/funded distinct |
| C2 Statut entités | 3 | 6 | Les deux sociétés actives, dépôts 2026 |
| C3 Avertissements | 2 | 2 | Recherche officielle exhaustive incomplète |
| D1 Transparence programmes | 8 | 6 | Information prix/activation non cohérente sur tous supports |
| D2 Versions | 2 | 4 | Documents accessibles et datés, sans protection des cohortes |
| D3 Cohérence | 2 | 2 | Marketing same-day, rôle des deux sociétés et délais à clarifier |
| E1 Antériorité opérationnelle | 6 | 4 | Immatriculation 2022 ≠ preuve automatique de ventes 36 mois |
| E2 Support | 3 | 2 | Joignabilité, mais recours/résolution indépendants non attestés |
| **TOTAL** | **61** | **55 proposé** | **Confiance faible ; validation nécessaire** |

**Attention à l'absence de double peine :** B1 porte sur la *conséquence contractuelle* (récompenses perdues) ; B2 porte sur l'*indétermination d'un comportement de trading* (gambler à la seule appréciation de FFN). Aucun −3 B2 supplémentaire ne s'applique aux seuils HFT/news chiffrés, ni −4 sans rétroactivité effectivement documentée.

### Comparaison méthodologique à corpus constant (illustration seulement)

Si les mêmes autres 10 sous-critères sont conservés, la V5 ancienne attribuerait ici A2 **8** (neutre), B1 **2** (résiliation sans recours, au lieu de 0 V5.2), B2 **8** (un défaut de règle vague −2 au lieu de −3). On obtient donc **V5 = 60** et **V5.2 = 55** sur ce *même corpus*, ce qui confirme bien le durcissement effectif. Ce **60 V5 reconstruit** n'a jamais été publié et ne remplace pas l'ancien **29 de la file**, qui n'était pas un score V5 comparable.

## Décision avant publication

- Maintenir **55** comme **proposition révisée** et non comme note validée ; ne pas réactiver de classement.
- Contre-vérifier la clause de clôture générale dans la version exacte de la cohorte vendue et les droits des rewards déjà approuvées ; si cette clause ne s'applique pas au contrat funded, remonter B1 à 3 selon grille (ne pas changer B2 automatiquement).
- Faire un examen individuel des dossiers de paiement de **2/10/2026** et **28/10/2026** (date due, statut Rise compensé, réponse de la firme) ; A2 neutre ne certifie pas de régularité.
- Contrôler les variantes STEADY / MAX / OG avant de généraliser chaque règle.
- Auditer le delta du score historique et les migrations importantes de toutes les petites firmes avec **l'ancien dossier réellement à 13 critères**, et non un score historique de couverture par défaut.
