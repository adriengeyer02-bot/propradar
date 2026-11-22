# Contrôle de cohérence — dix fiches V5.2, cohorte D (22 novembre 2026)

## Décision et comparabilité

Notes du dernier lot établies avec les treize critères canoniques V5.2. Le **score de départ** est la **note réellement affichée sur le site public avant cette édition**, consultée individuellement le 22 novembre via `https://www.propradar.tech/firm/<slug>` ; il ne faut **pas** utiliser sans vérification le `legacyScore` du backlog, ni confondre ce delta avec un backtest V5 → V5.2 à preuves constantes.

| Slug | Note affichée précédente | Nouvelle V5.2 | Écart | A3 | B1 | B2 | TP | Constat sensible |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| fidelcrest | 52 | **54** | +2 | 1 | 0 | 7 | 0 | Contrat funded avec tiers non identifié dans les CGU |
| now-trade-funded | 50 | **47** | −3 | 0 | 6 | 10 | 0 | CGU principales et débiteur du payout non recoupés ; C1=0, preuve nulle |
| fundings4u | 50 | **41** | −9 | 1 | 6 | 10 | 0 | Pas de vendeur juridiquement identifié, chiffres promotionnels non prouvés ; C1=0 |
| ultimate-traders | 48 | **55** | +7 | 1 | 0 | 7 | 0 | Trading Rules Speedy sans délai fixe vs CGU §10.6 limitant à 30 jours |
| bullwaves-prime | 54 | **53** | −1 | 1 | 3 | 7 | −6 | Retrait de profit à discrétion, Trustpilot officiel |
| dna-funded | 41 | **51** | +10 | 1 | 0 | 7 | 0 | Confiscation de rewards possibles §16/§24, société non vérifiée sur registre C1=4 |
| foxx-funded | 44 | **44** | 0 | 1 | 0 | 7 | −6 | CGU §5.1 nomment Bespoke Funding, footer Foxx/Semizu ; risque contrepartie |
| sfx-funded | 38 | **42** | +4 | 1 | 0 | 7 | −6 | CGU §3.3 discretionary payouts, §9.11 terminaison, cadences contraires |
| superfunded | 44 | **45** | +1 | 1 | 0 | 7 | −6 | Modèles de forfeiture et conditions de rewards sévères, identité C1=4 |
| funding-frontier | 42 | **49** | +7 | 1 | 0 | 7 | 0 | CGU §7.3/§16 réservant split et retrait discrétionnaires ; tentative waiver de recours |

Les hausses de +7 et +10 ne prouvent **aucune amélioration opérationnelle**. Ces révisions s'appuient sur de nouveaux éléments contractuels et des scores historiques d'origines différentes ; la comparaison **V5 et V5.2 à preuves constantes n'a pas été rejouée** pour ces firmes. A3≤1 sur les dix dossiers, y compris entreprises affichant des montants de payouts.

### Sources principales à garder dans le suivi

- Fidelcrest : [General Terms](https://fidelcrest.com/general-terms-and-conditions) ; [Profit Splits](https://fidelcrest.com/profit-splits)
- Now Trade Funded : [Schedule of Assessment 2024](https://nowtradefunded.com/wp-content/uploads/2024/06/Now-Trade-SOA-18-03-2024-1.docx-1.pdf), et [CGU PDF annoncées](https://nowtradefunded.com/wp-content/uploads/2024/03/Proptradetech-terms-and-conditions-NowTrade-1.pdf), ces dernières non corroborées en version actuelle
- Fundings4u : [site officiel](https://fundings4u.com/), identité du vendeur à authentifier
- Ultimate Traders : [Terms](https://www.ultimatetraders.com/terms-and-conditions/) §10.6, [Trading Rules](https://www.ultimatetraders.com/trading-rules/), [Companies House 14665391](https://find-and-update.company-information.service.gov.uk/company/14665391). Avertissement NZ FMA sur domaine **ultimatetraders.pro** : ne pas attribuer à **ultimatetraders.com** sans preuve de lien
- Bullwaves Prime : [Trading Rules](https://prime.bullwaves.com/trading-rules), [legal](https://prime.bullwaves.com/legal), [Trustpilot](https://www.trustpilot.com/review/prime.bullwaves.com)
- DNA Funded : [General Terms](https://dnafunded.com/wp-content/uploads/2025/11/DNA-Funded-Ltd-General-Terms-and-Conditions.pdf), [Rules v2](https://dnafunded.com/wp-content/uploads/2026/03/DNA-Funded-Ltd-Rules-and-Conditions-V.2.pdf)
- FOXX Funded : [Terms PDF](https://www.foxx-funded.com/assets/Terms-Cyo23LFp.pdf), [FAQ](https://www.foxx-funded.com/faqs/), [Trustpilot](https://www.trustpilot.com/review/foxx-funded.com)
- SFX Funded : [Terms](https://sfxfunded.com/docs/terms-of-service), [Prohibited Trading Styles](https://intercom.help/sfx-15a6836318fd/en/articles/9287375-prohibited-trading-styles-strategy) et ancienne revue V4 complète `app/data/scoring-v4-batch-8-published.json`
- SuperFunded : [General Terms](https://superfunded.com/wp-content/uploads/2025/06/General-Terms-and-Conditions-SuperFunded-new-new.pdf), [Rules 2026](https://superfunded.com/wp-content/uploads/2026/10/SuperFunded-Rules-and-Conditions-V2-22.10.26.pdf)
- Funding Frontier : [Legal Terms](https://fundingfrontier.com/legal-terms/), les renonciations sont des **clauses proposées** et non des dispositions confirmées valides par un juge

### Invariants et publication

Aucun malus autonome pour limites chiffrées ordinaires. B2=10 moins exactement les faits vagues/contradictoires sourcés ; B1 traite le droit aux récompenses, **pas une seconde déduction B2**. Trustpilot −6 uniquement quand l'avis officiel de suspension de note est courant. Les témoignages commerciaux ne donnent jamais une preuve de règlement final indépendamment compensé. Les limites C1/A3 ne sont pas annulées par notoriété.

**Publication autorisée selon le workflow continu validé par le propriétaire :** 11 migrations V5 déjà validées, 28 audits natifs antérieurs et les dix dossiers D — **49 notes publiées**. Les 24 migrations automatiques n'accèdent pas au gate. Couverture : **73/122** scorecards complètes ; **35** à terminer, **14** contrôles de statut à réaliser. Les revues de migration/rebranding comme FXCI→OneFunded et My Flash Funding→Sway Funded restent à traiter dans la file de statuts et non comme des sociétés indépendantes attestées.
