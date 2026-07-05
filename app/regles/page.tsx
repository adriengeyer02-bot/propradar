import type { Metadata } from 'next';
import Link from 'next/link';
import FirmLogo from '../components/FirmLogo';
import {
  formatUsd,
  getFirmBySlug,
  payoutRiskClass,
  propFirms,
  scoreClass,
  statusClass,
} from '../lib/propFirms';
import { toEnglishText } from '../lib/i18n';

export const metadata: Metadata = {
  title: 'Sensitive prop firm rules',
  description:
    'PropRadar audit of sensitive clauses in official prop firm rules: drawdown, news, payout, consistency, EA, copy trading and prohibited practices.',
};

type RuleSeverity = 'Faible' | 'Moyen' | 'Élevé' | 'Critique';

type RuleClause = {
  title: string;
  severity: RuleSeverity;
  finding: string;
  consumerImpact: string;
};

type OfficialRuleAudit = {
  slug: string;
  product: string;
  sourceLabel: string;
  sourceUrl: string;
  sourceDate: string;
  headline: string;
  verdict: string;
  clauses: RuleClause[];
};

type CompactRuleAudit = {
  slug: string;
  product: string;
  sourceLabel: string;
  sourceUrl: string;
  sourceDate: string;
  proofLevel: 'Source officielle lue' | 'Source officielle partielle' | 'Source commerciale repérée';
  riskFamily: string;
  severity: RuleSeverity;
  signal: string;
  consumerImpact: string;
};

const officialRuleAudits: OfficialRuleAudit[] = [
  {
    slug: 'ftmo',
    product: 'FTMO Challenge 1-Step / 2-Step',
    sourceLabel: 'Trading Objectives + Forbidden Trading Practices FTMO',
    sourceUrl: 'https://ftmo.com/en/trading-objectives/',
    sourceDate: 'Source consultée le 2026-07-01',
    headline: 'Le risque vient surtout du calcul equity et des pratiques interdites.',
    verdict:
      'FTMO est lisible, mais les règles sont strictes : daily loss basé sur equity, trailing EOD sur le 1-Step, Best Day Rule et interdictions larges sur gap trading, HFT, comptes connectés et contournement.',
    clauses: [
      {
        title: 'Daily loss calculé avec equity ouverte',
        severity: 'Critique',
        finding:
          'La perte journalière se calcule avec balance + positions ouvertes, swaps et commissions. Une position flottante peut donc violer la règle sans être clôturée.',
        consumerImpact:
          'Ne regarde jamais seulement la balance. Une mèche, un spread ou un swap peut suffire à sortir le compte.',
      },
      {
        title: 'Best Day Rule sur 1-Step et FTMO Account',
        severity: 'Élevé',
        finding:
          'Le meilleur jour ne doit pas dépasser 50% des profits positifs. Ce n’est pas toujours une breach, mais cela bloque le passage ou la reward tant que le ratio n’est pas corrigé.',
        consumerImpact:
          'Un gros trade gagnant peut t’obliger à continuer à trader pour débloquer le compte, donc à reprendre du risque.',
      },
      {
        title: 'Pratiques interdites très larges',
        severity: 'Critique',
        finding:
          'Gap trading, latence, ultra-haute vitesse, comptes coordonnés, account rolling, one-sided bets et EAs hyperactifs peuvent entraîner disqualification, retrait de trades, perte de rewards ou terminaison.',
        consumerImpact:
          'Les stratégies “astuce de challenge” ou copier-coller multi-comptes sont le vrai danger, même si le score public est excellent.',
      },
    ],
  },
  {
    slug: 'the5ers',
    product: 'High Stakes',
    sourceLabel: 'High Stakes Rules The5ers',
    sourceUrl: 'https://help.the5ers.com/what-are-the-general-rules-for-the-high-stakes-program/',
    sourceDate: 'Source consultée le 2026-07-01',
    headline: 'Le daily drawdown est plus piégeux qu’il n’en a l’air.',
    verdict:
      'The5ers High Stakes est propre sur le papier, mais la règle de daily drawdown prend le plus haut entre balance et equity de la veille. Un trade gardé après rollover peut réduire brutalement la marge.',
    clauses: [
      {
        title: 'Daily drawdown basé sur le plus haut balance/equity',
        severity: 'Critique',
        finding:
          'Le 5% daily drawdown est pris à 00:00 serveur depuis la closing equity ou la balance de la veille, selon le chiffre le plus haut.',
        consumerImpact:
          'Si tu finis la journée avec une equity élevée, le seuil du lendemain monte. Une position gardée peut fermer le compte plus vite que prévu.',
      },
      {
        title: 'Inactivité 30 jours',
        severity: 'Moyen',
        finding:
          'Les comptes sans activité de trading pendant plus de 30 jours consécutifs expirent, compteur depuis le jour d’inscription.',
        consumerImpact:
          'Un challenge acheté “pour plus tard” peut devenir une perte sèche si tu le laisses dormir.',
      },
      {
        title: 'Payout toutes les 2 semaines',
        severity: 'Moyen',
        finding:
          'Après passage funded, les retraits sont disponibles depuis le dashboard toutes les 2 semaines.',
        consumerImpact:
          'Le cash-flow n’est pas instantané : évite de comparer seulement le split et le prix du challenge.',
      },
    ],
  },
  {
    slug: 'fundednext',
    product: 'Stellar 2-Step / FundedNext Accounts',
    sourceLabel: 'FundedNext Help Center - Rules & Payouts',
    sourceUrl: 'https://help.fundednext.com/en/articles/8020351-what-are-the-restricted-prohibited-trading-strategies',
    sourceDate: 'Source consultée le 2026-07-01',
    headline: 'Beaucoup de règles anti-abus, avec sanctions financières avant même la fermeture.',
    verdict:
      'FundedNext est très documenté, mais les limites anti-abus sont nombreuses : risk cap, margin cap, quick strike, hyperactivity, settlement trading, copy trading et hedging multi-comptes.',
    clauses: [
      {
        title: 'Risque max 3% et margin cap 70%',
        severity: 'Critique',
        finding:
          'FundedNext limite le risque à 3% à tout moment et la marge cumulée à 70%. Première violation : warning et déduction des profits liés au trade.',
        consumerImpact:
          'Même sans fermeture immédiate, tes profits peuvent être retirés si le sizing est jugé hors cadre.',
      },
      {
        title: 'Quick Strike et trades sous 30 secondes',
        severity: 'Élevé',
        finding:
          'Les trades fermés en moins de 30 secondes sont suivis. À 30% ou plus de profit Quick Strike, le funded account peut être terminé et les profits concernés supprimés.',
        consumerImpact:
          'Le scalping ultra-court peut transformer une bonne performance en payout refusé.',
      },
      {
        title: 'Hyperactivity cumulative entre comptes',
        severity: 'Critique',
        finding:
          '200 trades ou 2 000 messages serveur par jour déclenchent des warnings ; 15 000 messages peuvent désactiver le compte. Les warnings peuvent être cumulatifs entre comptes.',
        consumerImpact:
          'Un EA ou une gestion trop active des ordres peut te faire perdre le compte même sans mauvaise intention.',
      },
    ],
  },
  {
    slug: 'topstep',
    product: 'Trading Combine / Express Funded Account',
    sourceLabel: 'Topstep Trading Combine + Payout Policy + Consistency',
    sourceUrl: 'https://help.topstep.com/en/articles/8284197-trading-combine-parameters',
    sourceDate: 'Source consultée le 2026-07-01',
    headline: 'Le piège principal : consistency, payout caps et 5 jours gagnants.',
    verdict:
      'Topstep est ancien et clair, mais un trader futures doit comprendre que le passage et les retraits ne dépendent pas seulement du profit brut.',
    clauses: [
      {
        title: 'Consistency Target 50%',
        severity: 'Élevé',
        finding:
          'Le meilleur jour doit rester sous 50% du profit target. Si ce seuil est dépassé, le profit target augmente. Les pertes ne réinitialisent pas le meilleur jour.',
        consumerImpact:
          'Un gros jour gagnant peut repousser ton passage au funded même si tu as atteint le montant visé.',
      },
      {
        title: 'XFA payout caps',
        severity: 'Élevé',
        finding:
          'Les retraits Express Funded Account sont plafonnés par requête et par taille de compte. Le cap peut dépendre du chemin standard/consistency et de l’option DLL.',
        consumerImpact:
          'Un profit élevé ne veut pas dire retrait immédiat du même montant.',
      },
      {
        title: 'Single Profile Policy',
        severity: 'Critique',
        finding:
          'Tous les comptes doivent être sous un seul profil Topstep. Les profils multiples peuvent entraîner fermeture ou suspension.',
        consumerImpact:
          'Un doublon de compte ou une erreur d’inscription peut devenir un vrai risque opérationnel.',
      },
    ],
  },
  {
    slug: 'apex-trader-funding',
    product: 'New Apex Products',
    sourceLabel: 'Apex official homepage + new/legacy account notice',
    sourceUrl: 'https://apextraderfunding.com/',
    sourceDate: 'Source consultée le 2026-07-01',
    headline: 'Apex a changé fortement son offre : ne mélange pas legacy et nouveaux comptes.',
    verdict:
      'La nouvelle promesse Apex met en avant EOD drawdown, no payout denials, 50% consistency et pas de recurring billing sur les nouveaux produits. Les legacy accounts restent un univers séparé.',
    clauses: [
      {
        title: 'New products vs legacy accounts',
        severity: 'Critique',
        finding:
          'Apex indique que les comptes legacy ne sont plus disponibles à l’achat, ne sont pas modifiés rétroactivement et peuvent rester sur recurring billing jusqu’à annulation.',
        consumerImpact:
          'Avant de comparer des avis ou promos Apex, identifie si la personne parle d’un ancien ou d’un nouveau produit.',
      },
      {
        title: '5 trading days between rewards',
        severity: 'Élevé',
        finding:
          'La page officielle met en avant 5 trading days for payouts/rewards sur le parcours actuel.',
        consumerImpact:
          'Même si tu passes vite, la vitesse de retrait dépend du cycle de trading days.',
      },
      {
        title: '50% consistency',
        severity: 'Élevé',
        finding:
          'Le nouveau positionnement affiche une règle de consistency à 50%.',
        consumerImpact:
          'Un seul gros jour peut limiter la capacité à retirer ou progresser, selon le compte utilisé.',
      },
    ],
  },
  {
    slug: 'e8-markets',
    product: 'E8 Signature / E8 One / E8 Pro',
    sourceLabel: 'E8 Markets Help Center - Products, Guardrails, Payouts',
    sourceUrl: 'https://help.e8markets.com/en/collections/10983534-products-rules',
    sourceDate: 'Source consultée le 2026-07-01',
    headline: 'E8 est très détaillé, mais certaines règles retirent les profits sans fermer le compte.',
    verdict:
      'E8 Markets documente daily drawdown, profit cap, news, HFT, EA et best day rules. Le risque consommateur vient surtout des profits retirés au rollover ou au payout.',
    clauses: [
      {
        title: 'Daily drawdown avec fermeture permanente',
        severity: 'Critique',
        finding:
          'Le daily drawdown est un montant fixe basé sur l’initial balance. Si equity ou balance touche le loss level, le compte est fermé définitivement, même si la clôture technique finit au-dessus.',
        consumerImpact:
          'Tu peux voir une clôture finale “au-dessus” du seuil et perdre quand même le compte, car le breach serveur prime.',
      },
      {
        title: 'Daily profit cap 2%',
        severity: 'Élevé',
        finding:
          'Sur E8 Pro, les profits au-dessus du cap journalier ne comptent pas et sont retirés après rollover. Les tentatives de contournement par hedge/partial close peuvent être regroupées.',
        consumerImpact:
          'Une journée exceptionnelle peut être partiellement effacée du résultat utile.',
      },
      {
        title: 'News en Performance E8 One',
        severity: 'Élevé',
        finding:
          'En performance E8 One, ouvrir, fermer ou modifier SL/TP dans la fenêtre 5 minutes avant/après news high impact est interdit et les profits peuvent être retirés.',
        consumerImpact:
          'La plateforme peut techniquement laisser agir, mais le profit peut disparaître au payout.',
      },
    ],
  },
  {
    slug: 'funding-pips',
    product: 'Evaluation / Master Account',
    sourceLabel: 'FundingPips Help Center - Trading Mechanics',
    sourceUrl: 'https://help.fundingpips.com/hc/en-us/articles/44559256768529-Understanding-Trading-Mechanics',
    sourceDate: 'Source consultée le 2026-07-01',
    headline: 'Les breaches viennent souvent de l’equity, du rollover et du spread.',
    verdict:
      'FundingPips explique clairement que les limites sont suivies côté serveur en temps réel. Les erreurs les plus coûteuses viennent des stops serrés, du rollover 5 PM ET et des positions ouvertes pendant news.',
    clauses: [
      {
        title: 'Monitoring equity en temps réel',
        severity: 'Critique',
        finding:
          'Daily loss et max loss surveillent l’equity en live. Le serveur fait foi, même si ton terminal ou dashboard affiche un retard.',
        consumerImpact:
          'Une position flottante peut fermer le compte avant que tu comprennes ce qui s’est affiché localement.',
      },
      {
        title: 'Rollover 5 PM ET',
        severity: 'Élevé',
        finding:
          'FundingPips alerte sur l’élargissement massif possible du spread à 5 PM ET, pouvant déclencher stops et breaches.',
        consumerImpact:
          'Un stop “correct” sur graphique Bid peut être touché par l’Ask pendant le rollover.',
      },
      {
        title: 'Reward loop avec trades clôturés',
        severity: 'Moyen',
        finding:
          'Le cycle reward demande de clôturer les positions, attendre 15 minutes puis demander le split.',
        consumerImpact:
          'Les positions ouvertes et les frais overnight peuvent réduire la marge de sécurité au mauvais moment.',
      },
    ],
  },
  {
    slug: 'alpha-capital-group',
    product: 'Alpha Pro / Qualified Trader',
    sourceLabel: 'Alpha Capital Help Center - News, EA, IP, Gambling',
    sourceUrl: 'https://help.alphacapitalgroup.uk/en/articles/9293522-can-i-trade-news',
    sourceDate: 'Source consultée le 2026-07-01',
    headline: 'Le danger vient des restrictions news, des EAs non approuvés et des règles anti-gambling.',
    verdict:
      'Alpha Capital autorise certains usages, mais après qualification les règles deviennent sensibles : fenêtres news, IP, EA pré-approuvés et comportements jugés gambling.',
    clauses: [
      {
        title: 'News : open/close interdit selon plan',
        severity: 'Critique',
        finding:
          'Après qualification, certains plans interdisent ouverture et fermeture 2 ou 5 minutes avant/après news high impact. Même un TP/SL déclenché dans la fenêtre peut être une violation soft.',
        consumerImpact:
          'Tu peux tenir une position légalement, mais un take profit touché au mauvais moment peut rendre le profit non éligible.',
      },
      {
        title: 'EA limité au risk management',
        severity: 'Critique',
        finding:
          'Les EAs autonomes, bots tiers, HFT, latency arbitrage ou EAs partagés qui génèrent les mêmes trades peuvent fermer le compte.',
        consumerImpact:
          'Un EA “autorisé” ne veut pas dire trading automatique libre. Il faut comprendre usage, plateforme et pré-approval.',
      },
      {
        title: 'IP et household restrictions',
        severity: 'Élevé',
        finding:
          'Même foyer, IP multiples, VPN/VPS non annoncé ou changements géographiques incohérents peuvent déclencher violation ou revue sécurité.',
        consumerImpact:
          'Voyage, colocation, famille trader ou VPS mal déclaré peuvent devenir un problème de conformité.',
      },
    ],
  },
];

const mediumSmallRuleAudits: CompactRuleAudit[] = [
  {
    slug: 'funding-traders',
    product: 'Instant Funded / 1-Step / 2-Step',
    sourceLabel: 'FundingTraders - Rules and challenge table',
    sourceUrl: 'https://fundingtraders.com/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source officielle lue',
    riskFamily: 'Payout + consistency',
    severity: 'Élevé',
    signal:
      'Les tableaux affichent daily loss, max loss, risk per trade, consistency score et payout schedule différents selon Instant Funded, 1-Step et 2-Step.',
    consumerImpact:
      'Avant achat, ne compare pas seulement le prix : vérifie le produit exact, le 14/21 jours payout et le consistency score qui peut bloquer un retrait.',
  },
  {
    slug: 'maven-trading',
    product: '1-Step / 2-Step / 3-Step / Instant / OMO',
    sourceLabel: 'Maven Trading - pricing and challenge table',
    sourceUrl: 'https://maventrading.com/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source officielle lue',
    riskFamily: 'Drawdown + refund',
    severity: 'Moyen',
    signal:
      'La page officielle différencie daily loss, max loss, profit targets, payout frequency et indique que certains frais sont remboursables au troisième retrait.',
    consumerImpact:
      'Le coût réel dépend du nombre de payouts atteints. Un prix bas peut être moins intéressant si le programme choisi a peu de marge de drawdown.',
  },
  {
    slug: 'fxify',
    product: 'One Phase / Two Phase / Instant Funding',
    sourceLabel: 'FXIFY - How it works',
    sourceUrl: 'https://fxify.com/how-it-works/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source officielle lue',
    riskFamily: 'Daily drawdown',
    severity: 'Critique',
    signal:
      'Le daily drawdown peut être basé sur la balance de fin de journée précédente. Le premier payout est présenté comme on-demand, puis les retraits deviennent bi-hebdomadaires.',
    consumerImpact:
      'Une position gardée après le reset peut réduire la marge disponible le lendemain. Vérifie aussi les add-ons qui changent split, payout et leverage.',
  },
  {
    slug: 'instant-funding',
    product: 'Instant Funding / IF1 / One-Phase / Two-Phase',
    sourceLabel: 'Instant Funding - product rules',
    sourceUrl: 'https://instantfunding.com/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source officielle lue',
    riskFamily: 'Smart drawdown + payout timing',
    severity: 'Critique',
    signal:
      'Sur Instant Funding, le smart drawdown se verrouille après profit. Sur IF1, le compte dure 24h et le meilleur trade ne doit pas dépasser une part forte du profit total.',
    consumerImpact:
      'Le mot instant ne veut pas dire payout immédiat dans tous les cas : certains produits imposent 14 jours, un seuil de profit ou une règle de consistency.',
  },
  {
    slug: 'trade-the-pool',
    product: 'MAX / FLEX stock programs',
    sourceLabel: 'Trade The Pool - Program Terms',
    sourceUrl: 'https://tradethepool.com/program-terms/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source officielle lue',
    riskFamily: 'Actions + valid profit',
    severity: 'Critique',
    signal:
      'Les règles incluent volume max par minute sur un instrument, ratios de profit par position, minimum de positions, payout minimum et revues risque/KYC.',
    consumerImpact:
      'Pour les actions, le danger n’est pas seulement le drawdown : un trade trop gros sur une small cap ou un profit trop concentré peut être invalidé.',
  },
  {
    slug: 'funded-trading-plus',
    product: 'Instant Funding / 1-Step / 2-Step',
    sourceLabel: 'Funded Trading Plus - Help Center',
    sourceUrl: 'https://help.fundedtradingplus.com/drawdown-information/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source officielle lue',
    riskFamily: 'High-water mark',
    severity: 'Critique',
    signal:
      'Le daily drawdown peut utiliser le plus haut entre balance et equity au reset. Les retraits ne baissent pas le high-water mark sur certains calculs.',
    consumerImpact:
      'Un retrait peut donner l’impression de sécuriser le compte, alors que le seuil de drawdown peut rester accroché plus haut.',
  },
  {
    slug: 'goat-funded-trader',
    product: '1-Step / 2-Step Pro / Blitz',
    sourceLabel: 'GOAT Funded Trader - Rules and rewards',
    sourceUrl: 'https://help.goatfundedtrader.com/en/collections/11969353-rules',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source officielle lue',
    riskFamily: 'News + reward caps',
    severity: 'Critique',
    signal:
      'Les trades ouverts ou fermés dans les 5 minutes autour d’une news high impact peuvent voir le profit limité. Les funded accounts ont aussi des limites initiales de retrait.',
    consumerImpact:
      'La news peut être autorisée tout en plafonnant les gains. Il faut donc lire la règle de profit retiré, pas seulement “news allowed”.',
  },
  {
    slug: 'audacity-capital',
    product: 'Ability Challenge',
    sourceLabel: 'Audacity Capital - challenge table',
    sourceUrl: 'https://audacity.capital/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source officielle lue',
    riskFamily: 'Règles permissives à confirmer',
    severity: 'Moyen',
    signal:
      'La page affiche trading period illimité, max daily loss, max loss, payout same day et news/weekend/EA/copy trading autorisés.',
    consumerImpact:
      'Quand une page est très permissive, vérifie dans le dashboard et les terms la définition exacte de EA, copy trading et “same day payout”.',
  },
  {
    slug: 'fintokei',
    product: 'SwiftTrader / ProTrader',
    sourceLabel: 'Fintokei - program table',
    sourceUrl: 'https://www.fintokei.com/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source officielle lue',
    riskFamily: 'Open risk + payout threshold',
    severity: 'Élevé',
    signal:
      'SwiftTrader affiche daily loss, max loss, maximum allowed risk on open trades et minimum profit per payout.',
    consumerImpact:
      'Même si le payout est rapide, le risque ouvert maximum peut bloquer les stratégies multi-positions ou martingale déguisée.',
  },
  {
    slug: 'hantec-trader',
    product: 'Hantec Trader programs',
    sourceLabel: 'Hantec Trader - official program table',
    sourceUrl: 'https://hantectrader.com/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source officielle lue',
    riskFamily: 'Static balance drawdown',
    severity: 'Moyen',
    signal:
      'Le tableau officiel mentionne drawdown balance-static, daily loss, maximum total loss, reward frequency et minimum trading days par étape.',
    consumerImpact:
      'Le terme “static” ne suffit pas : il faut vérifier si le seuil est basé sur balance, equity ou les deux au moment de la violation.',
  },
  {
    slug: 'oneup-trader',
    product: '1-Step futures evaluation',
    sourceLabel: 'OneUp Trader - funded account rules',
    sourceUrl: 'https://www.oneuptrader.com/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source officielle lue',
    riskFamily: 'Trailing drawdown + consistency',
    severity: 'Critique',
    signal:
      'Pas de daily loss affiché, mais trailing drawdown, minimum 10 trading days et consistency : les trois autres meilleurs jours doivent représenter au moins 80% du plus gros jour.',
    consumerImpact:
      'Sans daily loss, le vrai piège devient le trailing drawdown et la concentration des profits sur une seule séance.',
  },
  {
    slug: 'earn2trade',
    product: 'Trader Career Path / Gauntlet Mini',
    sourceLabel: 'Earn2Trade - official homepage and disclaimer',
    sourceUrl: 'https://www.earn2trade.com/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source officielle lue',
    riskFamily: 'Futures + pass rate',
    severity: 'Élevé',
    signal:
      'Earn2Trade publie des éléments rares : pass rate, part de comptes live/live sim, retraits hebdomadaires dès 100 dollars et marchés futures uniquement.',
    consumerImpact:
      'C’est plus transparent que beaucoup, mais le taux de passage rappelle que le produit doit être vu comme une évaluation difficile, pas un achat de revenu.',
  },
  {
    slug: 'take-profit-trader',
    product: 'Test / PRO / PRO+',
    sourceLabel: 'Take Profit Trader - payout and PRO rules',
    sourceUrl: 'https://takeprofittrader.com/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source officielle lue',
    riskFamily: 'PRO payout + account fee',
    severity: 'Élevé',
    signal:
      'Le site met en avant PRO day-one withdrawals, 80/20 puis PRO+ 90/10, un fee PRO unique et un passage live PRO+ avec règles de risque identiques.',
    consumerImpact:
      'Le payout rapide est attractif, mais il faut vérifier le passage Test -> PRO -> PRO+, le fee et le drawdown exact en live.',
  },
  {
    slug: 'brightfunded',
    product: 'Evaluation / Funded Account',
    sourceLabel: 'BrightFunded - official homepage',
    sourceUrl: 'https://brightfunded.com/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source commerciale repérée',
    riskFamily: 'Payout marketing',
    severity: 'Moyen',
    signal:
      'La page indique des payouts possibles dès 7 jours après le premier trade funded et jusqu’à 100% de profit split selon conditions.',
    consumerImpact:
      'À contrôler dans les conditions : le “jusqu’à” dépend souvent du plan, des add-ons, du cycle et des règles de consistance.',
  },
  {
    slug: 'aqua-funded',
    product: 'Evaluation / Instant Funding',
    sourceLabel: 'AquaFunded - official homepage',
    sourceUrl: 'https://www.aquafunded.com/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source commerciale repérée',
    riskFamily: 'Instant funding',
    severity: 'Moyen',
    signal:
      'La source officielle met en avant instant funding et profit split élevé, mais la page produit doit être vérifiée plan par plan.',
    consumerImpact:
      'Traiter la promesse instant comme un signal à vérifier : payout cycle, drawdown, refund et règles de news peuvent changer selon le compte.',
  },
  {
    slug: 'blue-guardian',
    product: 'Evaluation / Instant Funding',
    sourceLabel: 'Blue Guardian - official homepage',
    sourceUrl: 'https://www.blueguardian.com/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source commerciale repérée',
    riskFamily: 'Processus structuré',
    severity: 'Moyen',
    signal:
      'Le site met en avant des évaluations avec règles transparentes, discipline, risk management et fast payouts.',
    consumerImpact:
      'Avant achat, la vérification doit porter sur la page rules exacte : drawdown, news, payout minimum et conditions d’instant funding.',
  },
  {
    slug: 'breakout-prop',
    product: 'Crypto prop trading',
    sourceLabel: 'Breakout Prop - official homepage',
    sourceUrl: 'https://www.breakoutprop.com/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source commerciale repérée',
    riskFamily: 'Crypto liquidity',
    severity: 'Élevé',
    signal:
      'Breakout est crypto-first : la source officielle doit être relue sous l’angle spread, liquidité, exchange rules, liquidation et horaires spécifiques.',
    consumerImpact:
      'Une prop firm crypto ne se juge pas comme une prop Forex : le risque de mèche, slippage et liquidation doit être visible avant paiement.',
  },
  {
    slug: 'the-trading-pit',
    product: 'Futures / Forex / CFD challenges',
    sourceLabel: 'The Trading Pit - official homepage',
    sourceUrl: 'https://www.thetradingpit.com/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source officielle partielle',
    riskFamily: 'Multi-asset',
    severity: 'Moyen',
    signal:
      'La couverture officielle est multi-asset. Les règles doivent être séparées par classe d’actif, car un challenge futures et un challenge CFD ne portent pas les mêmes risques.',
    consumerImpact:
      'Ne pas transférer une règle vue sur un produit vers un autre : drawdown, plateformes, frais et horaires peuvent différer fortement.',
  },
  {
    slug: 'finotive-funding',
    product: 'Challenge / Instant Funding',
    sourceLabel: 'Finotive Funding - official homepage',
    sourceUrl: 'https://finotivefunding.com/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source officielle partielle',
    riskFamily: 'Instant + challenge',
    severity: 'Moyen',
    signal:
      'La source officielle est repérée, mais les clauses fines doivent être validées dans la page produit : daily loss, max loss, refund, payout et restrictions de trading.',
    consumerImpact:
      'À classer en “pas d’achat sans lecture finale” tant que les termes par produit ne sont pas copiés dans le dossier PropRadar.',
  },
  {
    slug: 'myfundedfutures',
    product: 'Futures evaluations',
    sourceLabel: 'MyFundedFutures - official homepage',
    sourceUrl: 'https://myfundedfutures.com/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source commerciale repérée',
    riskFamily: 'Futures payout',
    severity: 'Moyen',
    signal:
      'La source officielle est identifiée, mais les paramètres fins de payout, activation, drawdown et consistency doivent être confirmés dans le help center ou le checkout.',
    consumerImpact:
      'Ne pas acheter seulement sur la base du prix mensuel : les frais de funded account, payout schedule et trailing drawdown font le vrai coût.',
  },
  {
    slug: 'bulenox',
    product: 'Futures funded trader program',
    sourceLabel: 'Bulenox - official homepage',
    sourceUrl: 'https://bulenox.com/',
    sourceDate: 'Source consultée le 2026-07-01',
    proofLevel: 'Source commerciale repérée',
    riskFamily: 'Futures trailing drawdown',
    severity: 'Moyen',
    signal:
      'La source officielle est repérée, mais le dossier doit encore isoler activation fee, trailing drawdown, payout minimum et rules de contrats.',
    consumerImpact:
      'À mettre dans la file d’audit futures : les coûts et limites après passage funded comptent plus que le prix du test.',
  },
];

const ruleFamilies = [
  {
    title: 'Drawdown & equity',
    label: 'Compte fermé',
    text: 'Le danger réel est presque toujours l’equity ouverte, le rollover, les swaps et le reset serveur.',
  },
  {
    title: 'News & rollover',
    label: 'Profit retiré',
    text: 'Certaines plateformes laissent techniquement trader, mais retirent les gains ou classent le trade en violation.',
  },
  {
    title: 'EA, HFT, copy trading',
    label: 'Compte bloqué',
    text: 'Un EA autorisé pour gérer le risque peut être interdit s’il trade seul, copie d’autres comptes ou surcharge le serveur.',
  },
  {
    title: 'Payout & consistency',
    label: 'Retrait retardé',
    text: 'Best day, payout caps, jours gagnants et cycles de retrait comptent parfois plus que le profit split affiché.',
  },
];

function severityClass(severity: RuleSeverity) {
  if (severity === 'Critique') return 'badge-red';
  if (severity === 'Élevé') return 'badge-red';
  if (severity === 'Moyen') return 'badge-amber';
  return 'badge-green';
}

function proofLevelClass(level: CompactRuleAudit['proofLevel']) {
  if (level === 'Source officielle lue') return 'badge-green';
  if (level === 'Source officielle partielle') return 'badge-amber';
  return 'badge-blue';
}

function coverageStatusLabel(firm: (typeof propFirms)[number]) {
  if (firm.status === 'Fermée') return 'Risk archive';
  if (firm.auditStatus === 'Vérifié multi-source') return 'Multi-source file';
  if (firm.auditStatus === 'Partiellement vérifié') return 'Source spotted';
  return 'To source';
}

function coverageStatusClass(label: string) {
  if (label === 'Multi-source file') return 'badge-green';
  if (label === 'Source spotted') return 'badge-blue';
  if (label === 'Risk archive') return 'badge-red';
  return 'badge-neutral';
}

export default function RulesPage() {
  const deepAuditedSlugs = new Set(officialRuleAudits.map((audit) => audit.slug));
  const compactAuditedSlugs = new Set(mediumSmallRuleAudits.map((audit) => audit.slug));
  const coveredSlugs = new Set([...deepAuditedSlugs, ...compactAuditedSlugs]);
  const clauseCount = officialRuleAudits.reduce((sum, audit) => sum + audit.clauses.length, 0);
  const criticalCount = officialRuleAudits.reduce(
    (sum, audit) => sum + audit.clauses.filter((clause) => clause.severity === 'Critique').length,
    0
  );
  const compactCriticalCount = mediumSmallRuleAudits.filter((audit) => audit.severity === 'Critique').length;
  const longTailRows = propFirms
    .filter((firm) => !coveredSlugs.has(firm.slug))
    .sort((a, b) => {
      if (a.status === 'Fermée' && b.status !== 'Fermée') return 1;
      if (a.status !== 'Fermée' && b.status === 'Fermée') return -1;
      return b.reviewSignals.payoutRiskScore - a.reviewSignals.payoutRiskScore;
    });
  const activeRuleRows = propFirms
    .filter((firm) => firm.status !== 'Fermée')
    .sort((a, b) => b.reviewSignals.payoutRiskScore - a.reviewSignals.payoutRiskScore)
    .slice(0, 16);
  const nextAuditQueue = propFirms
    .filter((firm) => !coveredSlugs.has(firm.slug) && firm.status !== 'Fermée')
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);

  return (
    <main className="container rules-page">
      <section className="rules-hero">
        <div>
          <div className="eyebrow">Deep Rule Audit</div>
          <h1>Clauses that can cost an account or a payout.</h1>
          <p className="lead">
            PropRadar reads rule pages, help centers and flagship-product conditions to isolate dangerous clauses:
            drawdown, rollover, news, EA, copy trading, consistency, payout caps and sanctions.
          </p>
        </div>
        <div className="rules-hero-panel">
          <div className="summary-stat">
            <span>Deep audits</span>
            <strong>{officialRuleAudits.length}</strong>
            <small>primary sources opened</small>
          </div>
          <div className="summary-stat">
            <span>Clauses extracted</span>
            <strong>{clauseCount}</strong>
            <small>{criticalCount} critical</small>
          </div>
          <div className="summary-stat">
            <span>Mid/small firms</span>
            <strong>{mediumSmallRuleAudits.length}</strong>
            <small>{compactCriticalCount} critical alerts</small>
          </div>
          <div className="summary-stat">
            <span>Coverage</span>
            <strong>{propFirms.length}</strong>
            <small>total firms tracked</small>
          </div>
        </div>
      </section>

      <section className="rules-stat-strip" aria-label="Rule statistics">
        {ruleFamilies.map((family) => (
          <div className="rule-stat" key={family.title}>
            <span>{toEnglishText(family.label)}</span>
            <strong>{toEnglishText(family.title)}</strong>
            <small>{toEnglishText(family.text)}</small>
          </div>
        ))}
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Consumer Alerts</div>
            <h2>What marketing pages do not say loudly enough.</h2>
          </div>
          <Link href="/audit" className="btn">View source audit</Link>
        </div>

        <div className="rule-audit-grid">
          {officialRuleAudits.map((audit) => {
            const firm = getFirmBySlug(audit.slug);

            return (
              <article className="rule-audit-card" key={audit.slug}>
                <div className="rule-audit-top">
                  <div className="firm-result-main">
                    <FirmLogo name={firm?.name ?? audit.slug} logoDomain={firm?.logoDomain} />
                    <div>
                      <Link href={`/firm/${audit.slug}`} className="firm-result-name">{firm?.name ?? audit.slug}</Link>
                      <div className="firm-subline">{toEnglishText(audit.product)}</div>
                    </div>
                  </div>
                  {firm ? <span className={`badge ${statusClass(firm.status)}`}>{toEnglishText(firm.status)}</span> : null}
                </div>

                <div>
                  <h3>{toEnglishText(audit.headline)}</h3>
                  <p className="muted">{toEnglishText(audit.verdict)}</p>
                </div>

                <div className="clause-list">
                  {audit.clauses.map((clause) => (
                    <div className="clause-item" key={clause.title}>
                      <div className="clause-head">
                        <strong>{toEnglishText(clause.title)}</strong>
                        <span className={`badge ${severityClass(clause.severity)}`}>{toEnglishText(clause.severity)}</span>
                      </div>
                      <p>{toEnglishText(clause.finding)}</p>
                      <div className="impact-box">{toEnglishText(clause.consumerImpact)}</div>
                    </div>
                  ))}
                </div>

                <div className="rule-audit-source">
                  <span>{toEnglishText(audit.sourceDate)}</span>
                  <a href={audit.sourceUrl} target="_blank" rel="noreferrer">{audit.sourceLabel}</a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Mid & Small Firms</div>
            <h2>The long tail is being read firm by firm.</h2>
          </div>
          <p className="section-note">
            These compact alerts come from official sources or spotted product pages. Partial files remain deliberately marked as such.
          </p>
        </div>

        <div className="compact-rule-grid">
          {mediumSmallRuleAudits.map((audit) => {
            const firm = getFirmBySlug(audit.slug);

            return (
              <article className="compact-rule-card" key={audit.slug}>
                <div className="compact-rule-top">
                  <div className="firm-result-main">
                    <FirmLogo name={firm?.name ?? audit.slug} logoDomain={firm?.logoDomain} size="sm" />
                    <div>
                      <Link href={`/firm/${audit.slug}`} className="firm-result-name">{firm?.name ?? audit.slug}</Link>
                      <div className="firm-subline">{toEnglishText(audit.product)}</div>
                    </div>
                  </div>
                  <span className={`badge ${severityClass(audit.severity)}`}>{toEnglishText(audit.severity)}</span>
                </div>

                <div className="compact-rule-tags">
                  <span className={`badge ${proofLevelClass(audit.proofLevel)}`}>{toEnglishText(audit.proofLevel)}</span>
                  <span>{toEnglishText(audit.riskFamily)}</span>
                </div>

                <p>{toEnglishText(audit.signal)}</p>
                <div className="compact-rule-impact">{toEnglishText(audit.consumerImpact)}</div>

                <div className="rule-audit-source">
                  <span>{toEnglishText(audit.sourceDate)}</span>
                  <a href={audit.sourceUrl} target="_blank" rel="noreferrer">{audit.sourceLabel}</a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Full Coverage</div>
            <h2>All other prop firms remain in the audit queue.</h2>
          </div>
          <p className="section-note">
            PropRadar keeps smaller firms visible to avoid blind spots: spotted source, risk archive or file still needing sourcing.
          </p>
        </div>
        <div className="longtail-rule-board">
          {longTailRows.map((firm) => {
            const coverageLabel = coverageStatusLabel(firm);

            return (
              <Link href={`/firm/${firm.slug}`} className="longtail-rule-row" key={firm.slug}>
                <div className="firm-result-main">
                  <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                  <div>
                    <strong>{firm.name}</strong>
                    <span>{toEnglishText(firm.products[0]?.name ?? 'Produit à identifier')}</span>
                  </div>
                </div>
                <span>{toEnglishText(firm.drawdownType)}</span>
                <span>{toEnglishText(firm.newsTrading)}</span>
                <span>{toEnglishText(firm.eaAllowed)}</span>
                <span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{toEnglishText(firm.reviewSignals.payoutRisk)}</span>
                <span className={`badge ${coverageStatusClass(coverageLabel)}`}>{coverageLabel}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Next Deep-Dive</div>
            <h2>Next flagship products to break down.</h2>
          </div>
        </div>
        <div className="rule-queue-grid">
          {nextAuditQueue.map((firm) => (
            <Link href={`/firm/${firm.slug}`} className="rules-matrix-row" key={firm.slug}>
              <div className="firm-result-main">
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                <div>
                  <strong>{firm.name}</strong>
                  <span>{toEnglishText(firm.products[0]?.name ?? 'Produit phare à identifier')} · {formatUsd(firm.priceFrom)}</span>
                </div>
              </div>
              <div><span>Drawdown</span><strong>{toEnglishText(firm.drawdownType)}</strong></div>
              <div><span>News</span><strong>{toEnglishText(firm.newsTrading)}</strong></div>
              <div><span>EA</span><strong>{toEnglishText(firm.eaAllowed)}</strong></div>
              <div><span>Payout</span><strong>{toEnglishText(firm.reviewSignals.payoutRisk)}</strong></div>
              <span className={`badge ${scoreClass(firm.score)}`}>{firm.score}/100</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Quick Matrix</div>
            <h2>Active firms ranked by payout risk.</h2>
          </div>
        </div>
        <div className="rules-matrix">
          {activeRuleRows.map((firm) => (
            <Link href={`/firm/${firm.slug}`} className="rules-matrix-row" key={firm.slug}>
              <div className="firm-result-main">
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                <div>
                  <strong>{firm.name}</strong>
                  <span>{formatUsd(firm.priceFrom)} · score {firm.score}/100</span>
                </div>
              </div>
              <div><span>Drawdown</span><strong>{toEnglishText(firm.drawdownType)}</strong></div>
              <div><span>News</span><strong>{toEnglishText(firm.newsTrading)}</strong></div>
              <div><span>EA</span><strong>{toEnglishText(firm.eaAllowed)}</strong></div>
              <div><span>Payout</span><strong>{toEnglishText(firm.reviewSignals.payoutRisk)}</strong></div>
              <span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{toEnglishText(firm.reviewSignals.payoutRisk)}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
