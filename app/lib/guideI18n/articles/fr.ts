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
          "PropRadar lui attribue 68/100 et la garde en surveillance : la marque est réelle et paie des traders, mais son historique est court et ses conditions de paiement laissent beaucoup de place à l'interprétation. PropRadar a une relation d'affiliation avec GOAT Funded Trader ; elle ne change ni ce score ni cet avis.",
        ],
      },
      {
        heading: 'La situation sur Trustpilot',
        paragraphs: [
          "Le 23 octobre 2026, Trustpilot n'affichait aucun TrustScore pour la société. Sa page indique que la note est indisponible en raison d'un manquement à ses règles et que Trustpilot a supprimé un certain nombre de faux avis. Le profil affiche toujours 4 352 avis, très partagés : 46 % à cinq étoiles et 40 % à une étoile.",
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
          'Goat Guard : sur les comptes financés 1-Step et 2-Step, une perte latente de 2 % du solde initial réduit votre partage à 50 % ; un second déclenchement fait perdre le compte.',
          'Règle des 2 minutes : le profit des trades tenus moins de deux minutes est retiré au paiement, tandis que les pertes de ces trades restent sur le compte.',
          'Fenêtre news : le profit réalisé autour des annonces à fort impact est plafonné à 1 % du solde initial.',
          'Plafond de profit journalier : un compte financé peut enregistrer au maximum 3 000 $ de profit par jour.',
          'Les modèles instantanés utilisent un drawdown suiveur et ferment le compte à 1 % ou 2 % de perte latente selon le modèle.',
        ],
      },
      {
        heading: 'Paiements',
        paragraphs: [
          "Le partage par défaut est de 80 %, avec une option payante à 100 % au paiement et un plan de croissance qui peut le porter à 90-95 %. La plupart des modèles paient tous les 14 jours, avec un minimum de 100 $ et des frais de traitement de 3 %. Les deux premiers paiements sont plafonnés au plus bas entre 6 % du solde initial et 10 000 $. Les moyens de paiement incluent Rise, le virement bancaire, Skrill et la crypto, chacun avec sa propre limite.",
          "Plusieurs affirmations publiques contredisent le centre d'aide, par exemple sur la rapidité des paiements (24 heures contre 2 jours ouvrés) et la taille maximale de compte. Quand le marketing et les conditions divergent, ce sont les conditions qui s'appliquent à votre paiement.",
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
