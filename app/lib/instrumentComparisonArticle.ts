import type { GuideArticle } from './guideArticles';

/** Source-led evergreen explainer. Examples are hypothetical, not live quotations or leverage promises. */
const published = '2026-11-20';

const sources = [
  { label: 'AMF — Les futures', url: 'https://www.amf-france.org/fr/espace-epargnants/comprendre-les-produits-financiers/produits-complexes/futures' },
  { label: 'AMF — Les CFD', url: 'https://www.amf-france.org/fr/espace-epargnants/comprendre-les-produits-financiers/produits-complexes/cfd' },
  { label: 'CME Group — Definition of a futures contract', url: 'https://www.cmegroup.com/education/courses/introduction-to-futures/definition-of-a-futures-contract' },
  { label: 'CME Group — Mark-to-market and daily settlement', url: 'https://www.cmegroup.com/education/courses/introduction-to-futures/mark-to-market' },
  { label: 'CME Group — Futures expiration and settlement', url: 'https://www.cmegroup.com/education/courses/introduction-to-futures/get-to-know-futures-expiration-and-settlement' },
  { label: 'Options Industry Council — Options basics', url: 'https://www.optionseducation.org/optionsoverview/options-basics' },
  { label: 'Options Industry Council — Benefits and risks', url: 'https://www.optionseducation.org/optionsoverview/what-are-the-benefits-risks' },
  { label: 'CME Group — Options on futures', url: 'https://www.cmegroup.com/education/courses/introduction-to-options/introduction-to-options' },
  { label: 'ESMA — CFD product intervention, retail protections', url: 'https://www.esma.europa.eu/press-news/esma-news/esma-reminds-firms-their-obligations-under-cfd-product-intervention-measures' },
];

export const instrumentComparisonEn: GuideArticle = {
  published,
  updated: published,
  intro: 'The same Nasdaq, gold or currency-market view can be expressed through **futures, CFDs or options**, but these are **three different contracts**. What matters is not the chart: it is who your counterparty is, how your profit and loss are calculated, what can expire, and what can happen to your money.',
  keyPoints: [
    '**Futures:** standardized exchange-traded obligations with a fixed contract size, margin and expiry; profits and losses are linear.',
    '**CFDs:** bilateral contracts with a provider on the price difference of an underlying; costs and protections depend on the provider and jurisdiction.',
    '**Vanilla options:** a buyer pays a premium for a right, not an obligation; the seller assumes the matching obligation. Time and volatility affect the price.',
    '**Prop firms:** an advertised “futures account” may still be simulated. Always read the programme, contract and payout rules.',
  ],
  sections: [
    {
      heading: 'Futures vs CFDs vs options: the comparison at a glance',
      paragraphs: [
        'A futures contract, a CFD and a listed option can reference **the same market** while giving you very different legal rights and exposures. The table describes typical arrangements, not every possible product: options can also trade over the counter, and some CFDs have their own expiry.',
      ],
      compare: {
        columns: ['Futures', 'CFDs', 'Vanilla options'],
        rows: [
          { label: 'What you trade', values: ['**Standardized forward obligation**', '**Price-difference agreement** with provider', '**Right** for buyer; **obligation** for seller'] },
          { label: 'Where', values: ['**Exchange**, centrally cleared', '**OTC** with CFD provider', 'Often **listed**; OTC contracts also exist'] },
          { label: 'Exposure', values: ['Fixed contract multiplier', 'Provider-defined position size', 'Strike, expiry, multiplier, premium'] },
          { label: 'Capital required', values: ['Initial/maintenance **margin**', 'Margin set by contract and applicable retail rules', 'Buyer pays **premium**; writer may need margin'] },
          { label: 'Profit and loss', values: ['**Linear** in underlying movement', 'Usually **linear** before costs', '**Nonlinear**; affected by time and volatility'] },
          { label: 'Expiry', values: ['Dated contract; roll or settle', 'Often no fixed expiry, but check terms', '**Always** an expiry date'] },
          { label: 'Main costs', values: ['Commission, exchange/data fees, spread, roll', 'Spread, possible commission and overnight financing', 'Premium, bid/ask spread, fees'] },
          { label: 'Main danger', values: ['Leverage, margin calls, liquidation', 'Leverage, provider/quote risk, financing costs', 'Premium can expire worthless; **short-option assignment**'] },
        ],
        note: 'Typical contract structures, verified against AMF, CME, ESMA and OIC sources listed below. Exchange membership, clearing, access and protections depend on the specific instrument and jurisdiction.',
      },
    },
    {
      heading: '1. Futures: an exchange-traded commitment',
      paragraphs: [
        'A future is a standardized agreement traded on an exchange, with a stated **contract size, tick value and expiry**. The exchange clearing system interposes itself between buyer and seller. You do not generally pay the full notional value up front; you post margin to maintain the position. The resulting leverage can magnify both gains and losses.',
        'Futures positions are **marked to market**: gains and losses are settled through the clearing system, typically daily. If equity falls below required margin, extra funds or liquidation may be necessary. The initial deposit is not the maximum possible loss.',
        'A dated futures contract eventually expires. Depending on its specifications, final settlement may be **cash-settled or physically delivered**. Many active traders close or roll before expiry; never assume the broker will do it in the way you expect.',
      ],
      callout: { kind: 'warning', text: 'A $1,000 futures margin requirement does **not** mean the contract is worth $1,000 or that losses stop there. Contract multiplier and actual account risk determine the exposure.' },
    },
    {
      heading: '2. CFDs: a price-difference contract with a provider',
      paragraphs: [
        'A **contract for difference** tracks the price movement of an index, currency pair, commodity or other underlying without transferring ownership of it. It is normally an **over-the-counter agreement between the trader and the CFD provider**, rather than a standardized exchange contract. A broker may hedge the exposure elsewhere, but that does not turn your CFD into a futures position.',
        'CFDs can allow more flexible position sizing and often have no fixed expiry. In return, check **bid/ask spread, commission, overnight financing, possible roll adjustments, slippage and the provider’s pricing policy**. A CFD labeled “US100” is not automatically the exchange-listed Nasdaq future: quotes, trading hours and costs may differ.',
        'For **EU retail CFD clients** under applicable intervention rules, leverage caps, margin close-out and negative-balance protection apply; this is not a worldwide guarantee and may differ by client classification. Those rules limit certain risks, but they do not make leveraged CFDs safe.',
      ],
    },
    {
      heading: '3. Options: a right bought for a premium',
      paragraphs: [
        'A **call** gives its buyer the right to buy the underlying at a specified **strike**; a **put** gives the right to sell. The right lasts until the stated expiry, subject to the option’s exercise style. An option may be written on shares, an index or a **futures contract**: the underlying and settlement mechanism must be checked.',
        'A buyer of a plain vanilla call or put who pays the entire premium can normally lose **at most that premium plus transaction costs**, provided there is no further position created by exercise. However, an option can lose value even if the underlying moves in the expected direction: **time decay and implied volatility** matter, as do the strike and price paid.',
        'The **seller** receives the premium but is contractually obliged if assigned. A naked short call can have **theoretically unlimited loss**. Never describe “options” as universally limited-risk: the limited-loss statement applies to buying an option, not writing one.',
      ],
      callout: { kind: 'tip', text: 'Options on futures may exercise into a futures position, not a stock holding. Read the exercise, assignment and settlement specifications before expiration.' },
    },
    {
      heading: '4. Worked example: the same market moves 20 points',
      paragraphs: [
        'Consider a **fictional index at 5,000**, with an exposure of **$5 per index point**. Ignore spreads, fees, funding and taxes. A long future and a long CFD sized at $5/point each earn **$100 if the index rises 20 points**, or lose **$100 if it falls 20 points**. The required cash or margin can nevertheless be very different.',
        'Now consider a **hypothetical call option** with strike 5,000, a $5/point multiplier and an upfront premium of **20 points = $100**. Its profit **at expiry** is max(index − 5,000, 0) × $5 − $100. It must exceed **5,020 at expiry** to make a positive net profit before costs. Before expiry, the option’s market value is also affected by time remaining and volatility.',
      ],
      compare: {
        columns: ['Long future / equivalent CFD', 'Call bought for $100'],
        rows: [
          { label: 'Index at 4,980', values: ['−$100', '**−$100** (premium lost)'] },
          { label: 'Index at 5,000', values: ['$0', '**−$100** (premium lost)'] },
          { label: 'Index at 5,020', values: ['+$100', '**$0** (break-even)'] },
          { label: 'Index at 5,040', values: ['+$200', '**+$100**'] },
        ],
        note: 'Purely hypothetical, same $5/point convention. All option outcomes are at expiration and assume no exercise fees or additional futures position. These are not live product prices or a risk-equivalent strategy comparison.',
      },
      callout: { kind: 'example', text: 'The same bullish forecast can be correct on direction but **not profitable on a purchased call** if the move is too small, too late or the premium was too high.' },
    },
    {
      heading: '5. Which costs deserve attention?',
      bullets: [
        '**Futures:** exchange and broker commissions, bid/ask spread, market-data subscription, contract roll and liquidity at the chosen maturity.',
        '**CFDs:** spread and commission, overnight financing on leveraged exposure, broker quote methodology and any contract-specific adjustment.',
        '**Options:** premium paid, bid/ask spread, commissions, liquidity at the selected strike/expiry and the effect of implied volatility.',
      ],
      paragraphs: [
        'Compare **cost for equivalent market exposure and holding time**, not the advertised “minimum account size” or the smallest visible fee. A future with a narrow spread may have an exchange-data fee; a CFD held overnight may incur financing; an option with a cheap-looking premium may be far out of the money.',
      ],
    },
    {
      heading: '6. What changes when you use a prop firm?',
      paragraphs: [
        'On a prop-firm evaluation or simulated funded account, the word “futures” or “CFD” describes the **instruments and rulebook being simulated or routed**, not a promise that the firm has deposited the advertised $50,000 or $100,000 into an account you own. Some firms may offer access to live trading later; this must be verified programme by programme.',
        'For PropRadar, the key question is always **whether eligible profits can actually be withdrawn**. An attractive instrument is not enough if the funded-stage contract can cancel gains through unclear news rules, consistency caps, position limits or broad discretionary clauses.',
      ],
      steps: [
        { title: 'Identify the exact instrument', text: 'Exchange and symbol for futures; provider and contract specification for CFDs; underlying, strike, expiry and exercise style for options.' },
        { title: 'Read the account stage', text: 'Separate evaluation rules from funded/live rules, daily drawdown and trading-hour restrictions.' },
        { title: 'Check payout eligibility', text: 'Minimum trading days, consistency, eligible profits, withdrawal caps, identity checks and sanctions for breaches.' },
        { title: 'Check the legal contract', text: 'Who owes the reward? Which entity signs, how can terms change, and what happens in a payout dispute?' },
      ],
      callout: { kind: 'warning', text: '“Options prop firm” does not automatically mean a broker giving direct access to exchange-listed options. Verify **the precise product, simulated or live status, and reward contract**.' },
    },
    {
      heading: '7. The practical takeaway',
      paragraphs: [
        '**Futures** offer standardized, cleared market access and straightforward directional P/L, but demand strict margin and expiry management. **CFDs** offer flexible OTC exposure, with the provider, financing and jurisdiction playing a larger role. **Buying options** can define the upfront premium at risk but adds expiry, time decay and volatility; **selling options** can create much larger obligations.',
        'None is inherently “the best”. For a prop-firm customer, compare the **same market, position size, holding period and payout conditions** before comparing price tags. This guide is educational, not a recommendation to trade any of these leveraged products.',
      ],
    },
  ],
  sources,
};

export const instrumentComparisonFr: GuideArticle = {
  published,
  updated: published,
  intro: 'Sur le Nasdaq, l’or ou l’EUR/USD, on peut exprimer une même idée de marché avec un **future, un CFD ou une option**. Pourtant, ce sont **trois contrats très différents**. Ce qui compte, ce n’est pas seulement le graphique : c’est la contrepartie, le calcul des gains, l’échéance et les risques pour votre capital.',
  keyPoints: [
    '**Futures :** contrats standardisés négociés en Bourse, avec échéance, taille fixe et dépôt de marge ; gains et pertes évoluent de façon linéaire.',
    '**CFD :** contrat de différence de prix conclu avec un prestataire, généralement de gré à gré ; conditions et coûts dépendent de lui.',
    '**Options classiques :** l’acheteur paie une prime pour un droit, pas une obligation ; le vendeur supporte l’obligation correspondante.',
    '**Prop firms :** un compte annoncé à 100 000 $ peut être simulé, quel que soit l’instrument. Il faut vérifier les vrais critères de payout.',
  ],
  sections: [
    {
      heading: 'Futures, CFD et options : le tableau comparatif',
      paragraphs: [
        'Les trois produits permettent de s’exposer à **un même sous-jacent** sans pour autant offrir les mêmes droits. Ce tableau décrit les contrats les plus courants : certaines options sont de gré à gré et quelques CFD ont une échéance particulière.',
      ],
      compare: {
        columns: ['Futures', 'CFD', 'Options classiques'],
        rows: [
          { label: 'Ce que vous négociez', values: ['**Engagement ferme** standardisé', '**Différence de prix** avec le prestataire', '**Droit** pour l’acheteur, **obligation** pour le vendeur'] },
          { label: 'Marché', values: ['**Bourse organisée**, compensation centrale', '**Gré à gré** avec le prestataire', 'Souvent **cotées** ; parfois de gré à gré'] },
          { label: 'Taille', values: ['Multiplicateur fixé par contrat', 'Volume défini par l’offre CFD', 'Strike, échéance, multiplicateur et prime'] },
          { label: 'Capital initial', values: ['**Marge** initiale / de maintien', 'Marge selon le contrat et les règles applicables', '**Prime** pour l’acheteur ; marge possible pour le vendeur'] },
          { label: 'Gains / pertes', values: ['**Linéaires** avec le cours', 'Généralement **linéaires** hors frais', '**Non linéaires** : temps et volatilité comptent'] },
          { label: 'Échéance', values: ['Oui : clôture, roulement ou règlement', 'Souvent aucune échéance fixe', '**Toujours** une échéance'] },
          { label: 'Coûts', values: ['Commissions, spread, données, roulement', 'Spread, commission éventuelle, financement overnight', 'Prime, spread et commissions'] },
          { label: 'Risque à surveiller', values: ['Levier, appel de marge, liquidation', 'Levier, prix du prestataire, frais de financement', 'Prime perdue ; **assignation** des options vendues'] },
        ],
        note: 'Caractéristiques usuelles, recoupées auprès de l’AMF, du CME, de l’ESMA et de l’OIC. Les modalités précises varient selon le contrat, le pays et la classification du client.',
      },
    },
    {
      heading: '1. Futures : un véritable contrat à terme en Bourse',
      paragraphs: [
        'Un **future** est un engagement standardisé négocié sur un marché organisé. Le contrat fixe notamment **la valeur du point, la taille du contrat et son échéance**. Une chambre de compensation s’interpose entre acheteur et vendeur pour les opérations compensées. Vous n’immobilisez généralement qu’une **marge**, pas toute la valeur notionnelle : c’est l’origine de l’effet de levier.',
        'Les gains et pertes sont **réglés au marché** (*mark-to-market*), en général chaque jour. Si les fonds disponibles ne suffisent plus à maintenir la marge exigée, le courtier peut demander des fonds ou liquider la position. **La marge déposée n’est pas une perte maximale garantie.**',
        'Le contrat expire. Son règlement final peut se faire **en espèces ou par livraison**, selon le sous-jacent et ses spécifications. Les traders spéculatifs ferment ou reconduisent souvent leur exposition avant cette date ; ce n’est pas automatique dans toutes les situations.',
      ],
      callout: { kind: 'warning', text: 'Un future accessible avec 1 000 $ de marge ne représente pas un investissement limité à 1 000 $. La valeur du point et l’exposition réelle déterminent le risque.' },
    },
    {
      heading: '2. CFD : une différence de prix négociée avec le broker',
      paragraphs: [
        'Un **Contract for Difference (CFD)** reproduit la variation d’un indice, d’une paire de devises ou d’un autre actif **sans en devenir propriétaire**. C’est normalement un contrat **de gré à gré entre vous et le prestataire**, pas un contrat standardisé passé directement sur le marché des futures. Le prestataire peut couvrir ses positions, sans que cela transforme votre CFD en future.',
        'Les CFD permettent souvent d’ajuster finement le volume et n’ont pas systématiquement d’échéance. En contrepartie, il faut regarder **le spread, la commission, le financement overnight, le rollover, le slippage et la méthode de cotation du broker**. Un CFD « US100 » et un future Nasdaq ne sont pas juridiquement ni tarifairement le même produit.',
        'Dans l’**Union européenne**, les CFD proposés aux **clients de détail** soumis aux mesures applicables bénéficient de plafonds de levier, d’une clôture sur marge et d’une protection contre le solde négatif. **Ces protections ne sont ni universelles ni une assurance contre les pertes** : elles dépendent notamment du pays et du statut du client.',
      ],
    },
    {
      heading: '3. Options : une prime payée pour acquérir un droit',
      paragraphs: [
        'Un **call** acheté donne le droit d’acheter le sous-jacent au **prix d’exercice** (*strike*) ; un **put** acheté donne celui de le vendre. Le droit existe jusqu’à une **échéance**, selon le style d’exercice du contrat. L’option peut porter sur des actions, un indice ou même sur **un contrat futures** : le règlement n’est pas toujours identique.',
        'Pour l’**acheteur d’une option classique**, ayant payé la totalité de la prime, la perte est normalement limitée à **la prime et aux frais**, à condition qu’aucune position supplémentaire ne résulte de l’exercice. Mais vous pouvez perdre sur le call même si le marché monte : le **temps restant, la volatilité implicite et le prix payé** influencent aussi sa valeur.',
        'Le **vendeur d’option** encaisse la prime mais prend une obligation en cas d’assignation. Vendre un call sans couverture peut entraîner une **perte théoriquement illimitée**. Dire « les options limitent les pertes » sans distinguer acheteur et vendeur serait donc trompeur.',
      ],
      callout: { kind: 'tip', text: 'Une **option sur future** peut déboucher sur une véritable position futures si elle est exercée. Vérifie le sous-jacent, le mode d’exercice, l’assignation et le règlement avant l’échéance.' },
    },
    {
      heading: '4. Exemple : le même marché bouge de 20 points',
      paragraphs: [
        'Imaginons un **indice fictif à 5 000 points**, avec une exposition de **5 $ par point**. Sans frais ni spread, un future acheté et un CFD acheté de taille équivalente rapportent chacun **100 $ si l’indice gagne 20 points**, et perdent **100 $ s’il baisse de 20 points**. La marge immobilisée peut pourtant être très différente.',
        'Supposons maintenant un **call fictif** de strike 5 000, multiplicateur de 5 $/point, acheté **20 points de prime, soit 100 $**. Son résultat **à l’échéance** est : max(indice − 5 000, 0) × 5 $ − 100 $. Il doit finir **au-dessus de 5 020** pour dégager un gain net avant frais. Avant l’échéance, sa valeur varie aussi avec le temps et la volatilité.',
      ],
      compare: {
        columns: ['Future / CFD achetés', 'Call acheté 100 $'],
        rows: [
          { label: 'Indice à 4 980', values: ['−100 $', '**−100 $** (prime perdue)'] },
          { label: 'Indice à 5 000', values: ['0 $', '**−100 $** (prime perdue)'] },
          { label: 'Indice à 5 020', values: ['+100 $', '**0 $** (point mort)'] },
          { label: 'Indice à 5 040', values: ['+200 $', '**+100 $**'] },
        ],
        note: 'Exemple entièrement fictif, sur la base de 5 $/point. Résultats de l’option calculés à l’échéance, hors frais et sans position supplémentaire issue de l’exercice. Les positions ne sont pas équivalentes en risque.',
      },
      callout: { kind: 'example', text: 'Vous pouvez avoir **raison sur la hausse du Nasdaq** et perdre de l’argent sur un call si la hausse est trop lente, trop faible ou si la prime était trop chère.' },
    },
    {
      heading: '5. Quels frais comparer réellement ?',
      paragraphs: [
        'Ne compare pas uniquement « 0 $ de commission » ou la marge minimale : compare le **coût total pour une exposition et une durée identiques**. Un future peut imposer des données de marché payantes ; un CFD peut coûter plus cher s’il reste ouvert la nuit ; une option peu chère peut être très loin du strike.',
      ],
      bullets: [
        '**Futures :** spread, commission courtier/bourse, abonnement aux flux, liquidité du contrat et coût d’un éventuel roulement.',
        '**CFD :** spread, commission éventuelle, swaps ou financement overnight, ajustements et politique de cotation.',
        '**Options :** prime, spread parfois important sur les strikes peu liquides, commissions, volatilité implicite et échéance.',
      ],
    },
    {
      heading: '6. Et dans une prop firm, qu’est-ce qui change ?',
      paragraphs: [
        'Sur un **challenge** ou un **compte financé simulé**, l’étiquette « futures » ou « CFD » décrit d’abord **le marché et les règles utilisés**. Elle ne prouve pas que la société vous a confié 50 000 ou 100 000 $ d’argent réel. Certains programmes peuvent prévoir un accès live ensuite : cela se vérifie dans les conditions du **programme exact**.',
        'Pour PropRadar, l’essentiel reste le **payout réellement accessible**. Un instrument attractif ne compense pas une clause obscure qui permet de supprimer des gains, une limite de consistance mal expliquée, un plafond de retrait ou un pouvoir discrétionnaire trop large.',
      ],
      steps: [
        { title: 'Identifier le produit', text: 'Future : Bourse, symbole et multiplicateur ; CFD : prestataire et spécifications ; option : sous-jacent, strike, échéance et exercice.' },
        { title: 'Séparer les phases du compte', text: 'Lire distinctement les règles de challenge, de compte financé, le drawdown et les horaires autorisés.' },
        { title: 'Vérifier le vrai payout', text: 'Jours minimum, consistance, profits éligibles, plafonds, KYC et sanctions pour non-respect des règles.' },
        { title: 'Contrôler le contrat', text: 'Quelle entité doit payer ? Peut-elle modifier les droits acquis ? Comment se déroule une contestation ?' },
      ],
      callout: { kind: 'warning', text: 'L’expression **« prop firm options »** ne garantit pas que vous négociez des options cotées sur un vrai compte de courtage. Vérifiez simulation, exécution, produit proposé et promesse de retrait.' },
    },
    {
      heading: '7. Ce qu’il faut retenir',
      paragraphs: [
        '**Futures :** exposition standardisée, prix formé en Bourse et P&L directionnel simple, mais levier, appels de marge et échéance à gérer. **CFD :** plus de souplesse sur les tailles, mais relation directe avec le prestataire et frais de financement. **Options achetées :** risque initial lié à la prime, mais échéance et volatilité déterminantes ; **options vendues :** obligations parfois beaucoup plus dangereuses.',
        'Aucun produit n’est « le meilleur » par principe. Avant de choisir une prop firm, comparez **le même marché, le même risque, la durée de détention et les conditions de retrait**. Article pédagogique : il ne constitue pas une recommandation d’investissement.',
      ],
    },
  ],
  sources,
};

export const instrumentComparisonFaq = {
  en: [
    { question: 'Is a Nasdaq CFD the same as a Nasdaq future?', answer: 'No. They may follow the same index, but a CFD is a bilateral contract with its provider while a future is a standardized, exchange-traded and centrally cleared contract. Prices, hours, margin and fees can differ.' },
    { question: 'Are options always less risky than futures?', answer: 'No. Buying a fully paid vanilla option generally limits loss to the premium and fees, but its entire value can expire worthless. Selling uncovered options can create losses far greater than the premium received.' },
    { question: 'Can futures losses exceed the initial margin?', answer: 'Yes. Margin is collateral, not the maximum loss. Futures losses can exceed the initial margin, depending on leverage and market conditions.' },
    { question: 'Why can a call option lose money when the market rises?', answer: 'The market may rise too little relative to the premium paid, and the option can lose time value or implied volatility. The strike and time until expiry matter as well as direction.' },
    { question: 'Does a futures or options prop firm necessarily provide a live account?', answer: 'No. Prop-firm evaluations and funded stages may be simulated. Check the specific programme contract, whether live execution occurs and what makes rewards eligible for payout.' },
  ],
  fr: [
    { question: 'Un CFD Nasdaq est-il la même chose qu’un future Nasdaq ?', answer: 'Non. Ils peuvent suivre le même indice, mais le CFD est un contrat avec un prestataire, tandis que le future est standardisé, coté sur un marché organisé et compensé. Horaires, cotations, marges et frais peuvent différer.' },
    { question: 'Les options sont-elles moins risquées que les futures ?', answer: 'Pas toujours. Acheter une option classique entièrement payée limite généralement la perte à la prime et aux frais, mais elle peut expirer sans valeur. Vendre une option non couverte expose à des pertes bien plus importantes.' },
    { question: 'Peut-on perdre plus que la marge déposée sur des futures ?', answer: 'Oui. La marge est une garantie, pas une perte maximale. Avec l’effet de levier et certains mouvements de marché, la perte peut dépasser la marge initiale.' },
    { question: 'Pourquoi un call peut-il perdre de la valeur quand le marché monte ?', answer: 'Parce que la hausse peut être insuffisante face à la prime payée et que la valeur temps ou la volatilité implicite diminuent. La direction seule ne suffit pas.' },
    { question: 'Une prop firm futures ou options propose-t-elle forcément un compte réel ?', answer: 'Non. Challenge et compte financé peuvent fonctionner en simulation. Il faut contrôler le programme exact, les conditions d’exécution live éventuelle et les critères d’éligibilité des payouts.' },
  ],
};
