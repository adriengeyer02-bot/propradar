import { milTraders as f } from './milTraders';
import { toEnglishText } from './i18n';
import type { Locale } from './locales';

const copy: Partial<Record<Locale, string[]>> = {
  fr: [
    'Dubaï, Émirats arabes unis',
    'Day traders sur futures comparant une évaluation en une phase et un financement instantané simulé',
    '58/100 : Zero, Pro et Instant publient des règles détaillées, des frais uniques et le nom de l’opérateur à Dubaï. La confiance reste limitée par le petit nombre d’avis Trustpilot, les paiements déclarés par la firme et ses pouvoirs contractuels. Les plafonds de retrait, les changements de règles rétroactifs et le passage obligatoire en compte réel méritent une lecture attentive.',
    'Demandes possibles chaque jour après éligibilité. Zero et Pro exigent 5 journées gagnantes qualifiées par cycle ; Instant impose des objectifs de gains. La firme annonce un traitement sous 48 heures via Rise ; des vérifications supplémentaires prolongent ce délai.',
    'Trustpilot affiche 3,9/5 sur 13 avis au 16 novembre 2026. Les retours visibles comprennent des expériences positives sur la plateforme et des plaintes sur les retraits ou la vérification d’identité. La firme attribue un litige KYC à Rise. Ces récits n’ont pas été authentifiés indépendamment et l’échantillon est réduit.'
  ],
  de: [
    'Dubai, Vereinigte Arabische Emirate',
    'Futures-Daytrader, die einstufige Evaluierungen und simuliertes Instant Funding vergleichen',
    '58/100: Zero, Pro und Instant veröffentlichen detaillierte Regeln, einmalige Gebühren und einen benannten Betreiber in Dubai. Die kleine Trustpilot-Stichprobe, firmeneigene Auszahlungsangaben und vertragliche Ermessensrechte begrenzen das Vertrauen. Auszahlungslimits, rückwirkende Regeländerungen und der verpflichtende Wechsel auf ein Live-Konto sollten vor dem Kauf geprüft werden.',
    'Anträge sind nach Erfüllung der Bedingungen täglich möglich. Zero und Pro verlangen je Zyklus 5 qualifizierte Gewinntage; Instant hat Gewinnziele. Die Firma nennt 48 Stunden Bearbeitung über Rise; zusätzliche Prüfungen verlängern die Frist.',
    'Trustpilot zeigt am 16. November 2026 3,9/5 bei 13 Bewertungen. Sichtbar sind positive Plattformberichte sowie Beschwerden über Auszahlungen oder Identitätsprüfungen. Einen KYC-Streit führt die Firma auf Rise zurück. Die Berichte wurden nicht unabhängig bestätigt; die Stichprobe ist klein.'
  ],
  es: [
    'Dubái, Emiratos Árabes Unidos',
    'Day traders de futuros que comparan evaluaciones de una fase y financiación instantánea simulada',
    '58/100: Zero, Pro e Instant publican reglas detalladas, pagos únicos y el nombre del operador en Dubái. La pequeña muestra de Trustpilot, los pagos declarados por la empresa y la discrecionalidad contractual limitan la confianza. Conviene revisar los límites de retiro, los cambios retroactivos y la transición obligatoria a una cuenta real.',
    'Solicitudes cualquier día tras cumplir los requisitos. Zero y Pro exigen 5 días ganadores válidos por ciclo; Instant exige objetivos de ganancias. La empresa anuncia 48 horas de procesamiento mediante Rise; las verificaciones adicionales amplían el plazo.',
    'Trustpilot muestra 3,9/5 en 13 reseñas al 16 de noviembre de 2026. Hay experiencias positivas con la plataforma y quejas sobre retiros o identidad. La empresa atribuye un conflicto KYC a Rise. Los relatos no se han autenticado de forma independiente y la muestra es pequeña.'
  ],
  it: [
    'Dubai, Emirati Arabi Uniti',
    'Day trader di futures che confrontano valutazioni in una fase e finanziamento istantaneo simulato',
    '58/100: Zero, Pro e Instant pubblicano regole dettagliate, costi una tantum e il nome dell’operatore a Dubai. Il piccolo campione Trustpilot, i pagamenti dichiarati dalla società e la discrezionalità contrattuale limitano la fiducia. Prima dell’acquisto vanno letti limiti di prelievo, modifiche retroattive e passaggio obbligatorio al conto reale.',
    'Richieste possibili ogni giorno dopo aver soddisfatto i requisiti. Zero e Pro richiedono 5 giornate vincenti valide per ciclo; Instant prevede obiettivi di profitto. La società indica 48 ore tramite Rise; verifiche aggiuntive prolungano il termine.',
    'Trustpilot mostra 3,9/5 su 13 recensioni al 16 novembre 2026. I commenti visibili includono esperienze positive con la piattaforma e reclami su prelievi o identità. La società attribuisce una controversia KYC a Rise. I racconti non sono stati autenticati indipendentemente e il campione è piccolo.'
  ],
  pt: [
    'Dubai, Emirados Árabes Unidos',
    'Day traders de futuros que comparam avaliações de uma fase e financiamento instantâneo simulado',
    '58/100: Zero, Pro e Instant publicam regras detalhadas, taxas únicas e o nome do operador em Dubai. A pequena amostra na Trustpilot, os pagamentos declarados pela empresa e a discricionariedade contratual limitam a confiança. Convém ler os tetos de saque, as alterações retroativas e a transição obrigatória para uma conta real.',
    'Pedidos em qualquer dia após cumprir os requisitos. Zero e Pro exigem 5 dias vencedores válidos por ciclo; Instant exige metas de lucro. A empresa anuncia processamento em 48 horas via Rise; verificações adicionais prolongam o prazo.',
    'A Trustpilot mostra 3,9/5 em 13 avaliações em 16 de novembro de 2026. Há relatos positivos sobre a plataforma e queixas de saques ou identidade. A empresa atribui uma disputa de KYC à Rise. Os relatos não foram autenticados de forma independente e a amostra é pequena.'
  ],
  zh: [
    '迪拜，阿拉伯联合酋长国',
    '比较单阶段考核与模拟即时资金账户的期货日内交易者',
    '58/100：Zero、Pro 和 Instant 公开了详细规则、一次性费用及迪拜运营主体名称。但 Trustpilot 样本较少、支付数据由公司自行公布，且合同保留裁量权，因此信心有限。购买前应细读提款上限、追溯适用的规则变更及强制转入实盘账户的条件。',
    '满足资格后每天均可申请。Zero 和 Pro 每周期要求 5 个合格盈利日；Instant 要求达到利润目标。公司表示通过 Rise 在 48 小时内处理，额外核验会延长时限。',
    '截至 2026 年 11 月 16 日，Trustpilot 为 3.9/5，共 13 条评价。可见内容包括平台好评，以及提款或身份核验投诉。公司将一宗 KYC 争议归因于 Rise。这些陈述未经独立认证，样本也较小。'
  ],
  ja: [
    'ドバイ、アラブ首長国連邦',
    '1段階評価とシミュレーション型の即時資金口座を比較する先物デイトレーダー',
    '58/100：Zero・Pro・Instantは詳細なルール、買い切り料金、ドバイの運営会社名を公開しています。ただしTrustpilotの少数のレビュー、会社公表の支払額、契約上の裁量により確信度は限定的です。出金上限、遡及するルール変更、実口座への強制移行条件を購入前に確認する必要があります。',
    '条件達成後は毎日申請可能です。ZeroとProは各サイクルで条件を満たす利益日が5日必要で、Instantには利益目標があります。同社はRiseで48時間以内に処理するとしていますが、追加確認で延長されます。',
    '2026年11月16日時点のTrustpilotは13件で3.9/5です。プラットフォームへの好評と、出金・本人確認に関する苦情の両方が見られます。同社はKYCの争いをRiseによるものと説明しています。個々の内容は独立して認証されておらず、標本も少数です。'
  ],
  hi: [
    'दुबई, संयुक्त अरब अमीरात',
    'एक-चरण मूल्यांकन और सिम्युलेटेड इंस्टेंट फंडिंग की तुलना करने वाले फ्यूचर्स डे ट्रेडर',
    '58/100: Zero, Pro और Instant के विस्तृत नियम, एकमुश्त शुल्क और दुबई के संचालक का नाम सार्वजनिक हैं। लेकिन Trustpilot पर छोटा नमूना, कंपनी द्वारा घोषित भुगतान और अनुबंध में विवेकाधिकार के कारण भरोसा सीमित है। खरीदने से पहले निकासी सीमा, पुराने खातों पर लागू नियम बदलाव और वास्तविक खाते में अनिवार्य स्थानांतरण पढ़ना ज़रूरी है।',
    'पात्रता पूरी होने पर किसी भी दिन अनुरोध कर सकते हैं। Zero और Pro में प्रति चक्र 5 योग्य लाभदायक दिन चाहिए; Instant में लाभ लक्ष्य हैं। कंपनी Rise द्वारा 48 घंटे में प्रक्रिया बताती है; अतिरिक्त जाँच से समय बढ़ता है।',
    '16 नवंबर 2026 को Trustpilot पर 13 समीक्षाओं में 3.9/5 है। दिखने वाले अनुभवों में प्लेटफ़ॉर्म की प्रशंसा और निकासी या पहचान जाँच की शिकायतें हैं। कंपनी एक KYC विवाद को Rise से जोड़ती है। व्यक्तिगत विवरण स्वतंत्र रूप से प्रमाणित नहीं हैं और नमूना छोटा है।'
  ]
};

const fields = [f.headquarters, f.bestFor, f.verdict, f.payoutDelay, f.communitySignal];
export const milTradersTranslations: Partial<Record<Locale, Record<string, string>>> = Object.fromEntries(
  Object.entries(copy).map(([locale, values]) => [locale, Object.fromEntries(fields.map((key, i) => [key, values[i]]))])
);

Object.assign(milTradersTranslations.fr!, {
  [f.products[0].description]: 'Évaluation simulée en une phase : tarifs uniques hors code MIL50 de 250 / 378 / 658 $ pour 50K / 100K / 150K. Aucun frais d’activation ; plateformes et données dxFeed incluses. Limites d’évaluation : 4 / 6 / 8 minis. Les comptes financés démarrent à 2 / 3 / 4 minis puis progressent.',
  [f.products[1].description]: 'Évaluation simulée en une phase : tarifs uniques hors code MIL50 de 189,98 / 319,98 / 439,98 $ pour 50K / 100K / 150K. Aucun frais d’activation ; plateformes et dxFeed inclus. Limites de 4 / 8 / 12 minis en évaluation comme en financé ; un buffer conditionne les retraits.',
  [f.products[2].description]: 'Accès simulé direct : tarifs uniques hors code MIL30 de 500 / 643 / 800 $ pour 50K / 100K / 150K. Aucun frais d’activation ni reset. Limites de 4 / 8 / 10 minis. Chaque cycle de retrait exige de nouveaux gains ; les gains restants d’un cycle précédent ne remplissent pas l’objectif suivant.',
  [f.products[0].profitTarget]: '3 000 / 6 000 / 9 000 $ pour les évaluations 50K / 100K / 150K',
  [f.products[2].profitTarget]: 'Pas d’évaluation. Gains requis au premier retrait : 3 000 / 6 000 / 9 000 $ ; cycles suivants : 2 000 / 3 500 / 4 500 $.',
  [f.products[0].maxDailyLoss]: 'Aucune limite journalière dans les règles Zero publiées, en évaluation et en financé',
  [f.products[1].maxDailyLoss]: 'Aucune limite journalière dans les règles Pro publiées, en évaluation et en financé',
  [f.products[2].maxDailyLoss]: '1 200 / 2 250 / 3 300 $ pour 50K / 100K / 150K ; un soft breach clôture les positions et le trading reprend à la session suivante',
  [f.products[0].maxDrawdown]: 'Suiveur en fin de journée : 2 000 / 3 000 / 4 500 $ ; le plancher financé se verrouille au solde initial + 100 $ lorsque le seuil est atteint',
  [f.products[1].maxDrawdown]: 'Suiveur en fin de journée : 2 000 / 3 000 / 4 500 $ ; seuils du buffer financé : 52 100 / 103 100 / 154 600 $',
  [f.products[2].maxDrawdown]: 'Suiveur en fin de journée : 2 000 / 3 000 / 4 500 $ pour 50K / 100K / 150K',
  [f.products[0].profitSplit]: '90 % sur les retraits financés simulés. Zero limite chaque demande à 50 % des gains au-dessus du plancher verrouillé, avec des plafonds de 2 000 / 2 500 / 3 000 $ et un minimum de 500 $.',
  [f.products[1].profitSplit]: '90 % sur les retraits financés simulés. Les gains au-dessus du buffer sont retirables dans la limite des plafonds : 1 500 / 2 000 / 2 500 $ au départ, puis jusqu’à 3 000 / 3 500 / 4 000 $ dès le sixième retrait ; minimum 500 $.',
  [f.products[2].profitSplit]: '90 % sur les retraits financés simulés. Plafonds progressifs : 1 500 / 2 000 / 2 500 $ au départ, puis jusqu’à 3 000 / 3 500 / 4 000 $ dès le sixième retrait ; minimum 500 $.',
  [f.products[0].minTradingDays!]: 'Évaluation : 2 jours découlant de la règle de cohérence publiée. Financé : 5 journées gagnantes par cycle, chacune d’au moins 100 / 200 / 300 $ selon la taille, plus le verrouillage du drawdown.',
  [f.products[1].minTradingDays!]: 'Évaluation : 2 jours découlant de la règle de cohérence publiée. Financé : 5 journées gagnantes par cycle, chacune d’au moins 100 / 200 / 300 $ selon la taille, plus le buffer.',
  [f.products[2].minTradingDays!]: 'Aucun minimum formel de jours ; la cohérence du meilleur jour à 20 % et l’objectif du cycle conditionnent toujours le retrait.',
  [f.products[0].consistencyRule!]: 'Évaluation : meilleur jour limité à 50 % des gains, avec la tolérance annoncée de 1 %. Zero financé : aucune règle de cohérence en pourcentage ; plafonds de retrait et contrôle distinct des pratiques toujours applicables. Aucune position dans les 60 secondes avant ou après une annonce USD majeure concernée, ni à la clôture quotidienne.',
  [f.products[1].consistencyRule!]: 'Évaluation : meilleur jour limité à 50 %, avec la tolérance annoncée de 1 %. Financé : meilleur jour limité à 30 % des gains du cycle. Trading des annonces permis dans une stratégie cohérente ; restrictions de conduite et liquidation à la clôture quotidienne toujours applicables.',
  [f.products[2].consistencyRule!]: 'Meilleur jour limité à 20 % des gains du cycle. Chaque retrait exige un nouvel objectif de gains. Annonces permises dans une stratégie cohérente ; règles de conduite, liquidation à la clôture quotidienne et clôture après 30 jours d’inactivité financée applicables.',
  [f.strengths[0]]: 'Trois programmes futures distincts avec tailles de comptes, drawdowns, limites de contrats et plafonds de retrait publics.',
  [f.strengths[1]]: 'Achats uniques, aucun frais d’activation, accès aux plateformes et données dxFeed inclus.',
  [f.strengths[2]]: 'Aucune cohérence en pourcentage sur Zero financé ; Pro et Instant publient leurs limites respectives.',
  [f.strengths[3]]: 'Le contrat actuel nomme l’opérateur, explique la simulation et prévoit un réexamen interne.',
  [f.weaknesses[0]]: 'Seulement 13 avis Trustpilot ; année de création, immatriculation et totaux de paiement non authentifiés indépendamment.',
  [f.weaknesses[1]]: 'Les articles 2 et 19 appliquent les changements de règles aux comptes déjà achetés.',
  [f.weaknesses[2]]: 'La FAQ du site promet le paiement d’un retrait en attente après un constat de gambling behavior ; l’article 12.5 du contrat et le centre d’aide autorisent son acceptation ou son refus à l’appréciation de la firme.',
  [f.weaknesses[3]]: 'Le passage en compte réel ne peut pas être refusé selon l’article 10 : les comptes simulés sont bloqués et seuls les retraits éligibles déjà demandés restent dus. Le partage réel est de 80 % pour les trois premiers retraits, puis 90 %.',
  [f.weaknesses[4]]: 'L’article 9.6 suspend les obligations de payout en cas d’insolvabilité ; le délai annoncé de 48 heures est aussi prolongé pour les vérifications supplémentaires.',
  [f.weaknesses[5]]: 'Seuils propres à chaque programme, minimum de 500 $ et plafonds conditionnent les retraits ; le partage de 90 % ne suffit pas à déterminer le montant retirable.',
  [f.weaknesses[6]]: 'Bots et copie de tiers interdits ; seule la copie de ses propres trades manuels avec les outils fournis est autorisée.',
  [f.auditSummary]: 'Première revue éditoriale du 16 novembre 2026. La note de 58/100 tient compte de programmes détaillés, de frais uniques et d’un opérateur nommé, avec une confiance limitée par le faible échantillon d’avis, les totaux de paiement non authentifiés et les restrictions contractuelles. Zero, Pro et Instant ont été confrontés aux tarifs, au contrat, à la FAQ et aux articles d’aide officiels. Revue partielle : année de création, registre des sociétés, justificatifs clients et couverture judiciaire/réglementaire exhaustive restent à vérifier.',
  [f.regulatoryAudit.summary]: 'Le contrat nomme un opérateur en zone franche de Dubaï, décrit des évaluations et comptes financés simulés, et précise que MilTraders n’est pas un intermédiaire financier réglementé. Les numéros de formation et de licence sont des déclarations de la société, sans validation indépendante du registre ni agrément de courtier établi. La vigilance contractuelle concerne les changements de règles, l’examen des retraits et la sélection obligatoire en réel.',
  [f.regulatoryAudit.entities[0].role!]: 'Cocontractant désigné à l’article 1. Son immatriculation n’a pas été authentifiée indépendamment.',
  [f.regulatoryAudit.regulatoryStatus[0]]: 'Évaluations et comptes financés Zero, Pro et Instant simulés ; comptes réels sélectionnés décrits séparément.',
  [f.regulatoryAudit.regulatoryStatus[1]]: 'L’article 5.3 précise que MilTraders n’est ni courtier, ni dealer, ni futures commission merchant, ni conseiller en investissement, ni intermédiaire financier réglementé.',
  [f.regulatoryAudit.regulatoryStatus[2]]: 'L’article 21 prévoit le droit d’Angleterre et du pays de Galles et un arbitrage LCIA siégeant à Dubaï, en anglais ou en français, avec exception pour les petites créances.',
  [f.regulatoryAudit.regulatoryStatus[3]]: 'Cette première revue n’établit ni validation réglementaire exhaustive ni absence de procédure judiciaire.',
  [f.regulatoryAudit.complaintsAndDisputes[0]]: 'Les avis Trustpilot visibles comprennent une allégation de refus de retrait et une plainte KYC, avec des retours positifs sur la plateforme. Ces récits sont non vérifiés et ne constituent pas des décisions de justice.',
  [f.regulatoryAudit.complaintsAndDisputes[1]]: 'La société attribue la vérification d’identité à Rise dans sa réponse à la plainte KYC ; PropRadar n’a pas examiné le dossier individuel.',
  [f.regulatoryAudit.complaintsAndDisputes[2]]: 'La FAQ du site et les conditions/le centre d’aide actuels divergent sur la garantie de paiement d’un retrait après un constat de gambling behavior.',
  [f.regulatoryAudit.redFlags[0]]: 'Les règles publiées permettent l’application de changements aux comptes précédemment achetés.',
  [f.regulatoryAudit.redFlags[1]]: 'La firme conserve l’appréciation finale des pratiques interdites et du retrait en attente dans le cas de contrôle décrit.',
  [f.regulatoryAudit.redFlags[2]]: 'La sélection obligatoire en réel bloque les comptes simulés et modifie les droits à retrait et le partage initial.',
  [f.regulatoryAudit.redFlags[3]]: 'Une licence commerciale déclarée et un prestataire de paiement n’authentifient ni les paiements clients ni une protection réglementaire.',
  [f.reviewSignals.redditMentions]: 'Aucun échantillon représentatif Reddit audité pour cette première revue.',
  [f.reviewSignals.xMentions]: 'Aucun échantillon représentatif X audité pour cette première revue.',
  [f.reviewSignals.trustpilotNote]: 'Trustpilot affiche 3,9/5 sur 13 avis pour le bon domaine, au 16 novembre 2026. L’échantillon est petit ; les récits clients visibles et la réponse de la firme ne sont pas des preuves de paiement authentifiées.',
  [f.reviewSignals.trustpilotFlaggedReviewNote!]: 'Aucune alerte de manipulation d’avis comptée manuellement ; l’avertissement général sur les investissements à risque n’est pas assimilé à un manquement aux règles ou à une note masquée.',
  [f.reviewSignals.confidenceDrivers![0]]: 'Tableaux de programmes publics, cocontractant nommé et règles de retrait détaillées.',
  [f.reviewSignals.confidenceDrivers![1]]: 'Petit échantillon d’avis, totaux de paiement déclarés par la firme et formulations contractuelles divergentes limitent la confiance.',
  [f.reviewSignals.radarVerdict!]: '58/100 est une première appréciation éditoriale indépendante de toute affiliation. La transparence des programmes est utile ; des paiements mieux vérifiés, davantage de recul et des formulations contractuelles cohérentes renforceraient la confiance.'
});

for (const translations of Object.values(milTradersTranslations)) {
  for (const [key, value] of Object.entries(translations)) translations[toEnglishText(key).trim()] = value;
}
