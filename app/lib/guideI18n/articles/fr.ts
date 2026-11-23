import type { GuideArticleTranslations } from '../types';

/**
 * French long articles. Only GOAT Funded Trader: the other long guides already
 * have a hand-written French article (/fr/<slug>) that the French guide URL redirects to.
 */
const fr: GuideArticleTranslations = {
  'goat-funded-trader-avis': {
    intro: "GOAT Funded Trader est l'une des prop firms les plus visibles des deux dernières années : réductions agressives, nombreux modèles et présence constante sur les réseaux sociaux. La visibilité n'est pas la fiabilité. Cet avis sépare ce qui est documenté de ce qui relève du marketing, et place en premier les règles du compte financé, parce que c'est là que les traders perdent leurs paiements.",
    sections: [
      {
        heading: 'Qui gère GOAT Funded Trader',
        paragraphs: [
          "GOAT Funded Trader a été lancé en mai 2023. C'est un nom commercial de Wishes Tower International Limited, une société de Hong Kong, et le trading simulé est fourni par Goat Funded LTD à Sainte-Lucie. Aucun régulateur financier ne supervise le service. Les conditions décrivent des comptes simulés, des achats non remboursables et une large marge d'appréciation sur les paiements : c'est courant dans le secteur, mais il faut le savoir avant d'acheter.",
          "Consultez la fiche GOAT pour connaître la **note éditoriale actuelle** : l'ancienne valeur de cet article n'était plus alignée sur le site. En V5.2, une sanction officielle de Trustpilot entraîne une **déduction de 6 points**, sans imposer à elle seule un plafond à 64/100 ; les plafonds liés aux preuves de payout sont distincts. Les règles de retrait restent contraignantes, et l'affiliation de PropRadar n'influence pas le score.",
        ],
      },
      {
        heading: 'La situation sur Trustpilot',
        paragraphs: [
          "Le 23 novembre 2026, Trustpilot n'affichait toujours aucun TrustScore pour la société. Sa page indique que la note est indisponible en raison d'un manquement à ses règles et que Trustpilot a supprimé un certain nombre de faux avis. Le profil affiche toujours 4 352 avis, très partagés : 46 % à cinq étoiles et 40 % à une étoile.",
          "Tant que cet avertissement reste affiché, prenez avec prudence les affirmations de la page d'accueil sur une note quasi parfaite. Un profil d'avis polarisé traduit en général deux expériences très différentes : des traders payés rapidement, et des traders dont les paiements ont été refusés en vertu de règles qu'ils n'avaient pas lues attentivement.",
        ],
      },
      {
        heading: 'Les règles du compte financé qui comptent le plus',
        paragraphs: [
          "Les modèles de challenge sont classiques. Le modèle 2-Step GOAT demande 8 % puis 6 % avec une perte journalière de 4 % et une perte maximale statique de 10 % ; le 2-Step Standard demande 10 % puis 5 % avec 5 % par jour et 10 % au maximum ; le 1-Step demande 10 % avec une perte journalière de 3 % et une perte maximale statique de 6 %. Le modèle 3-Step a été retiré en août 2026. Ces chiffres viennent d'une analyse tierce vérifiée le 5 octobre 2026 : confirmez-les au paiement.",
          'Les règles qui décident des paiements commencent après la réussite :',
        ],
        bullets: [
          'Goat Guard : sur les comptes financés concernés (hors Instant), une perte latente de 2 % du solde du compte peut fermer les trades ouverts ; un premier déclenchement réduit le partage à 50 % et le second entraîne une violation. Vérifiez les exceptions du programme.',
          'Règle des 2 minutes : le profit des trades tenus moins de deux minutes est retiré au paiement, tandis que les pertes de ces trades restent sur le compte.',
          'Fenêtre news : le profit réalisé autour des annonces à fort impact est plafonné à 1 % du solde initial.',
          'Plafond de profit journalier : un compte financé peut enregistrer au maximum 3 000 $ de profit par jour.',
          'Les modèles instantanés utilisent un drawdown suiveur et ferment le compte à 1 % ou 2 % de perte latente selon le modèle.',
        ],
      },
      {
        heading: 'Paiements',
        paragraphs: [
          "Le partage généralement annoncé est de 80 %, mais les options, cycles de retrait et contrats varient. La FAQ officielle consultée le 23 novembre 2026 mentionne un minimum de 100 $ par demande et **2 % de frais de traitement**. Les deux premières récompenses peuvent être plafonnées au plus faible entre **6 % du solde initial et 10 000 $** ; pour les comptes **2-Step de 5 000 $ achetés à partir du 25 juillet 2026**, le plafond est de **4 %**. Rise, virement, Skrill et crypto présentent des plafonds distincts.",
          "Le centre d'aide indique désormais un traitement sous **2 jours ouvrés**, sous réserve du KYC au premier retrait, de la signature d'un Trader Agreement et d'un éventuel contrôle par la Risk Team. Cette annonce de traitement n'est pas une preuve indépendante de réception bancaire définitive. Lisez le contrat et la politique du produit exact avant de payer.",
        ],
      },
      {
        heading: 'À qui GOAT Funded Trader convient',
        paragraphs: [
          "Elle peut convenir à un trader discipliné, avec des pertes latentes faibles et maîtrisées, des positions tenues bien au-delà de deux minutes et aucune dépendance aux pics de news, qui cherche une entrée peu chère. Elle convient mal aux scalpeurs, aux traders de news et à ceux qui laissent respirer leurs trades à travers de forts drawdowns intraday, car les règles du compte financé visent précisément ces comportements. Si la clarté des règles compte plus que le prix pour vous, comparez-la d'abord avec les firmes les mieux notées de notre classement.",
        ],
      },
    ],
  },
};

export default fr;
