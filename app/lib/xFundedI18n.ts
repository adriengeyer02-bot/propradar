import { xFunded as f } from './xFunded';
import type { Locale } from './locales';

/** Main conclusions are available in every locale; French also covers the detailed initial review. */
const core: Partial<Record<Locale, string[]>> = {
  fr: [
    'Émirats arabes unis / Sainte-Lucie (mentions du site)',
    'Évaluations Forex / CFD et financement instantané simulé',
    '52/100 : les trois programmes principaux publient leurs règles et leurs tarifs en euros, mais Trustpilot masque la note et le contrat mérite une lecture attentive. Les comptes apportés par un affilié sont plafonnés à 50 % de partage de base après le premier retrait accepté. Les totaux annoncés par la firme ne sont pas des virements clients authentifiés indépendamment.',
    'Éligibilité : le contrat exige plus de 5 jours de trading et plus de 14 jours actifs. Demandes toutes les deux semaines ; contrôle jusqu’à 7 jours, puis traitement sous 3 à 5 jours ouvrés et réception sous 1 à 2 jours supplémentaires. L’accueil annonce des demandes hebdomadaires.',
    'La fiche Trustpilot liée au domaine compte 583 avis, dont des témoignages de paiements et des plaintes concernant les retraits. Sa note est masquée. Les récits individuels et les justificatifs de paiement n’ont pas été authentifiés indépendamment.'
  ],
  de: [
    'Vereinigte Arabische Emirate / St. Lucia (Angaben der Website)',
    'Forex-/CFD-Evaluierungen und simuliertes Instant Funding',
    '52/100: Die drei Hauptprogramme veröffentlichen Regeln und Europreise, doch Trustpilot zeigt keine Bewertung an und der Vertrag verdient genaue Prüfung. Bei über Affiliates vermittelten Konten gilt nach der ersten genehmigten Auszahlung eine Basis-Gewinnbeteiligung von höchstens 50 %. Die von der Firma gemeldeten Auszahlungssummen sind keine unabhängig bestätigten Kundentransfers.',
    'Voraussetzung laut Vertrag: mehr als 5 Handelstage und mehr als 14 aktive Tage. Anträge alle zwei Wochen; Prüfung bis zu 7 Tage, danach 3–5 Werktage Bearbeitung und 1–2 weitere bis zum Eingang. Die Startseite wirbt mit wöchentlichen Anträgen.',
    'Das zum Domainnamen gehörende Trustpilot-Profil enthält 583 Bewertungen mit positiven Auszahlungsberichten und Beschwerden. Der TrustScore wird nicht angezeigt. Einzelne Kundenberichte und Zahlungsbelege wurden nicht unabhängig bestätigt.'
  ],
  es: [
    'Emiratos Árabes Unidos / Santa Lucía (información del sitio)',
    'Evaluaciones de Forex / CFD y financiación instantánea simulada',
    '52/100: los tres programas principales publican reglas y precios en euros, pero Trustpilot oculta la puntuación y el contrato exige atención. Las cuentas captadas por afiliados tienen un reparto base máximo del 50 % después del primer retiro aprobado. Los totales anunciados por la empresa no son transferencias a clientes autenticadas de forma independiente.',
    'Requisitos contractuales: más de 5 días de trading y más de 14 días activos. Solicitudes cada dos semanas; revisión de hasta 7 días, seguida de 3–5 días laborables de procesamiento y 1–2 adicionales para recibir los fondos. La portada anuncia solicitudes semanales.',
    'El perfil de Trustpilot vinculado al dominio tiene 583 reseñas, con testimonios de pagos y quejas sobre retiros. Su puntuación está oculta. Los relatos individuales y los comprobantes de pago no se han autenticado de forma independiente.'
  ],
  it: [
    'Emirati Arabi Uniti / Saint Lucia (dichiarazioni del sito)',
    'Valutazioni Forex / CFD e finanziamento istantaneo simulato',
    '52/100: i tre programmi principali pubblicano regole e prezzi in euro, ma Trustpilot non mostra il punteggio e il contratto richiede attenzione. Per i conti acquisiti tramite affiliati, dopo il primo prelievo approvato la quota base è limitata al 50 %. I totali dichiarati dalla società non sono trasferimenti ai clienti autenticati in modo indipendente.',
    'Requisiti contrattuali: più di 5 giorni di trading e più di 14 giorni attivi. Richieste ogni due settimane; verifica fino a 7 giorni, poi 3–5 giorni lavorativi per elaborazione e altri 1–2 per ricezione. La homepage pubblicizza richieste settimanali.',
    'Il profilo Trustpilot del dominio contiene 583 recensioni, tra testimonianze di pagamenti e reclami sui prelievi. Il punteggio è nascosto. I racconti individuali e le ricevute non sono stati autenticati in modo indipendente.'
  ],
  pt: [
    'Emirados Árabes Unidos / Santa Lúcia (informações do site)',
    'Avaliações Forex / CFD e financiamento instantâneo simulado',
    '52/100: os três programas principais publicam regras e preços em euros, mas a Trustpilot oculta a nota e o contrato exige atenção. Nas contas indicadas por afiliados, a participação base fica limitada a 50% após o primeiro saque aprovado. Os totais anunciados pela empresa não são transferências a clientes autenticadas de forma independente.',
    'Requisitos contratuais: mais de 5 dias de negociação e mais de 14 dias ativos. Solicitações a cada duas semanas; análise de até 7 dias, depois 3–5 dias úteis de processamento e mais 1–2 para recebimento. A página inicial anuncia solicitações semanais.',
    'O perfil Trustpilot do domínio tem 583 avaliações, com relatos de pagamentos e reclamações sobre saques. A nota está oculta. Os relatos individuais e comprovantes de pagamento não foram autenticados de forma independente.'
  ],
  zh: [
    '阿拉伯联合酋长国 / 圣卢西亚（网站披露）',
    '外汇 / CFD 考核及模拟即时资金账户',
    '52/100：三个主要项目公开了规则及欧元费用，但 Trustpilot 隐藏了评分，合同条款需仔细审阅。通过联盟伙伴推荐的用户，在首笔获批提款后，基础分成最高为 50%。公司公布的支付总额不等于经过独立核实的客户转账。',
    '合同要求超过 5 个交易日且超过 14 个活跃日。每两周可申请提款；审核最多 7 天，之后处理需 3–5 个工作日，到账另需 1–2 个工作日。首页则宣传每周可申请。',
    '该域名的 Trustpilot 页面有 583 条评价，既有付款好评，也有提款投诉。评分已被隐藏。本次审查未独立核实个别客户陈述或支付凭证。'
  ],
  ja: [
    'アラブ首長国連邦 / セントルシア（サイトの開示情報）',
    'FX・CFD評価とシミュレーション型の即時資金口座',
    '52/100：主要3プログラムのルールとユーロ建て料金は公開されていますが、Trustpilotは評価を非表示にしており、契約の精読が必要です。アフィリエイト経由の利用者は、初回の承認済み出金後、基本利益配分が最大50%になります。同社公表の支払総額は、独立して認証された顧客送金ではありません。',
    '契約上の条件は取引日が5日超、アクティブ日が14日超です。申請は隔週で、審査は最長7日、その後の処理に3～5営業日、着金にさらに1～2営業日。同社トップページは毎週申請可能と宣伝しています。',
    '対象ドメインのTrustpilotページには583件のレビューがあり、支払いへの好評と出金に関する苦情の両方が見られます。総合評価は非表示です。個々の体験談や支払証明は独立して認証されていません。'
  ],
  hi: [
    'संयुक्त अरब अमीरात / सेंट लूसिया (वेबसाइट की जानकारी)',
    'Forex / CFD मूल्यांकन और सिम्युलेटेड इंस्टेंट फंडिंग',
    '52/100: तीन मुख्य कार्यक्रमों के नियम और यूरो में शुल्क सार्वजनिक हैं, लेकिन Trustpilot ने रेटिंग छिपा रखी है और अनुबंध ध्यान से पढ़ना ज़रूरी है। एफिलिएट से आए खातों में पहली स्वीकृत निकासी के बाद मूल लाभ हिस्सा अधिकतम 50% है। कंपनी द्वारा बताए गए कुल भुगतान स्वतंत्र रूप से प्रमाणित ग्राहक ट्रांसफ़र नहीं हैं।',
    'अनुबंध के अनुसार 5 से अधिक ट्रेडिंग दिन और 14 से अधिक सक्रिय दिन चाहिए। निकासी अनुरोध हर दो सप्ताह; समीक्षा में 7 दिन तक, फिर प्रक्रिया में 3–5 कार्यदिवस और प्राप्ति में 1–2 अतिरिक्त कार्यदिवस लग सकते हैं। होमपेज साप्ताहिक अनुरोध का प्रचार करता है।',
    'डोमेन से जुड़े Trustpilot पृष्ठ पर 583 समीक्षाएँ हैं, जिनमें भुगतान की प्रशंसा और निकासी की शिकायतें दोनों हैं। रेटिंग छिपी हुई है। व्यक्तिगत ग्राहक विवरण और भुगतान रसीदों को स्वतंत्र रूप से प्रमाणित नहीं किया गया है।'
  ]
};

const keys = [f.headquarters, f.bestFor, f.verdict, f.payoutDelay, f.communitySignal];
export const xFundedTranslations: Partial<Record<Locale, Record<string, string>>> = Object.fromEntries(
  Object.entries(core).map(([locale, values]) => [locale, Object.fromEntries(keys.map((key, i) => [key, values[i]]))])
);

Object.assign(xFundedTranslations.fr!, {
  [f.incidentsDetails[0]]: '16/11/2026 : Trustpilot masque la note de x-funded.com pour manquement à ses règles et indique avoir retiré de faux avis. Il s’agit d’un élément sur la fiabilité des avis, pas d’une preuve de retraits impayés.',
  [f.products[0].name]: 'Challenge en 1 phase — standard',
  [f.products[1].name]: 'Challenge en 2 phases — standard',
  [f.products[0].description]: 'Évaluation simulée avec des frais publiés de 115 € (10K) à 1 749 € (300K), avant options. Les frais sont en euros et les tailles de compte en dollars. Les comptes financés standard exigent 1 % de gains pour demander un retrait, un stop-loss sur chaque position et aucune conservation le week-end.',
  [f.products[1].description]: 'Deux phases d’évaluation simulée, de 89 € (10K) à 1 349 € (300K), avant options. Les EA sont interdits sur le challenge en 2 phases. Le trading des annonces est autorisé en évaluation et restreint sur les comptes financés standard ; aucune conservation le week-end.',
  [f.products[2].description]: 'Accès simulé direct, avec des frais publiés de 249 € (2K) à 2 899 € (200K). La page décrit une offre anniversaire d’un mois sans date d’expiration : disponibilité à revérifier. L’absence d’évaluation ne supprime pas le seuil de gains de 1 % pour retirer.',
  [f.products[0].profitTarget]: '10 % en évaluation ; 1 % de gains requis pour demander un retrait financé',
  [f.products[1].profitTarget]: '8 %, puis 5 % ; 1 % de gains requis pour demander un retrait financé',
  [f.products[2].profitTarget]: 'Pas d’évaluation ; 1 % de gains requis pour retirer',
  [f.products[0].maxDailyLoss]: '4 % de l’equity relevée ; remise à zéro à 02:00 UTC',
  [f.products[1].maxDailyLoss]: '5 % de l’equity relevée ; remise à zéro à 02:00 UTC',
  [f.products[0].maxDrawdown]: '6 % statique, sur le solde initial du compte',
  [f.products[1].maxDrawdown]: '10 % statique, sur le solde initial du compte',
  [f.products[2].maxDrawdown]: '6 % suiveur, sur l’equity relevée',
  [f.products[0].profitSplit]: '80 % au départ ; jusqu’à 90 % ensuite ; option 100 %. Utilisateurs apportés par un affilié : partage de base de 50 % après le premier retrait accepté, tous comptes confondus.',
  [f.products[2].profitSplit]: '80 % dans les avantages ; jusqu’à 100 % dans le tableau. Utilisateurs apportés par un affilié : partage de base de 50 % après le premier retrait accepté.',
  [f.products[0].minTradingDays!]: '5 jours d’évaluation ; le contrat exige plus de 5 jours de trading et plus de 14 jours actifs pour retirer',
  [f.products[1].minTradingDays!]: '5 jours par phase d’évaluation ; le contrat exige plus de 5 jours de trading et plus de 14 jours actifs pour retirer',
  [f.products[2].minTradingDays!]: 'Retrait selon le contrat : plus de 5 jours de trading, plus de 14 jours actifs et plus de 10 trades éligibles',
  [f.products[0].consistencyRule!]: 'Compte financé standard : une idée de trading ne doit pas dépasser 45 % des gains ; risque maximal de 1 % par idée. Stop-loss obligatoire sur chaque trade ; plus de 5 minutes sans stop entraînent une violation, mais une absence plus courte peut aussi faire refuser un retrait. Les règles d’évaluation diffèrent.',
  [f.products[1].consistencyRule!]: 'Compte financé standard : cohérence de 45 % par idée de trading, risque maximal de 1 % par idée et stop-loss obligatoire. Des positions ouvertes à un moment proche, dans la même direction ou sur le même instrument peuvent être regroupées. Ce n’est pas une règle du meilleur jour.',
  [f.products[2].consistencyRule!]: 'Cohérence de 20 % par idée de trading et risque maximal de 1 % par idée. Stop-loss obligatoire ; plus de 2 minutes sans stop entraînent une violation, mais une absence plus courte peut aussi faire refuser un retrait. Aucune conservation le week-end ni position sur une devise concernée dans les 10 minutes avant ou après une annonce majeure.',
  [f.strengths[0]]: 'Les règles des trois programmes principaux et les tarifs dans leur devise d’origine sont accessibles publiquement.',
  [f.strengths[1]]: 'Les évaluations standard ont une perte totale statique ; Instant Funding utilise un drawdown suiveur.',
  [f.strengths[2]]: 'Le centre d’aide publie les conditions de contrôle des comptes, de traitement des paiements et de partage après apport par un affilié.',
  [f.weaknesses[0]]: 'Trustpilot masque la note et indique avoir retiré de faux avis.',
  [f.weaknesses[1]]: 'Après le premier retrait accepté, les utilisateurs apportés par un affilié ont un partage de base plafonné à 50 %, y compris sur les comptes futurs ; la politique prévoit une application rétroactive.',
  [f.weaknesses[2]]: 'L’accueil nomme XFunded LTD à Sainte-Lucie ; le contrat désigne OTHERSIDE LLC aux Émirats. Leur lien et leurs immatriculations n’ont pas été vérifiés indépendamment.',
  [f.weaknesses[3]]: 'L’accueil annonce des retraits hebdomadaires contre toutes les deux semaines dans les conditions. Les tableaux affichent 5 jours de trading et 14 jours actifs ; le contrat exige de dépasser ces seuils.',
  [f.weaknesses[4]]: 'Après un retrait accepté, le centre d’aide prévoit la remise à zéro du solde restant et la perte de toute somme non retirée.',
  [f.weaknesses[5]]: 'Aucun historique de paiements clients authentifié indépendamment lors de cet examen.',
  [f.auditSummary]: 'Premier examen éditorial du 16 novembre 2026. La note de 52/100 tient compte de règles et tarifs documentés, d’une note Trustpilot masquée, de totaux de paiements non authentifiés et de restrictions contractuelles importantes. La fiche couvre les programmes standard en 1 phase, en 2 phases et Instant Funding. Les variantes Zero et Bybit figurent dans le centre d’aide, mais leurs barèmes complets actuels n’ont pas été relevés. Année de création, immatriculations, agréments et virements clients restent à confirmer.',
  [f.regulatoryAudit.summary]: 'Vigilance contractuelle élevée : l’accueil et les conditions nomment des entités différentes ; aucun extrait de registre ni agrément réglementaire n’a été authentifié indépendamment. Le contrat décrit des comptes simulés, des réductions de partage liées aux affiliés et un règlement des litiges aux Émirats. Cela ne constitue pas un constat d’illégalité.',
  [f.regulatoryAudit.entities[0].role!]: 'Cocontractant désigné dans les conditions. Numéro d’immatriculation et adresse du siège non confirmés.',
  [f.regulatoryAudit.entities[1].role!]: 'Entité nommée par l’accueil avec une affirmation de licence de trading. Son lien avec OTHERSIDE LLC et l’agrément annoncé n’ont pas été vérifiés indépendamment.',
  [f.regulatoryAudit.regulatoryStatus[0]]: 'Le contrat définit les comptes financés comme des comptes simulés, sans trading réel, avec capital virtuel.',
  [f.regulatoryAudit.regulatoryStatus[1]]: 'La licence de trading annoncée sur l’accueil est une déclaration de la firme, pas un agrément authentifié par PropRadar.',
  [f.regulatoryAudit.regulatoryStatus[2]]: 'Les clauses de litige mentionnent à la fois un arbitrage obligatoire en anglais aux Émirats et la compétence exclusive des tribunaux émiratis ; une clarification est nécessaire avant achat.',
  [f.regulatoryAudit.complaintsAndDisputes[0]]: 'Trustpilot contient des témoignages de paiements et des plaintes sur les retraits. Ce sont des récits clients, pas des défauts de paiement établis par une juridiction.',
  [f.regulatoryAudit.complaintsAndDisputes[1]]: 'Cet examen n’établit ni jugement ni validation réglementaire exhaustive ; l’absence d’une procédure dans cette fiche ne prouve pas son inexistence.',
  [f.regulatoryAudit.redFlags[0]]: 'Note Trustpilot masquée et avis de retrait d’évaluations par Trustpilot.',
  [f.regulatoryAudit.redFlags[1]]: 'Réduction du partage liée aux affiliés sur les comptes actuels et futurs, avec ajustements rétroactifs possibles.',
  [f.regulatoryAudit.redFlags[2]]: 'Entités juridiques différentes et divergences entre communication commerciale, tableaux et contrat.',
  [f.reviewSignals.redditMentions]: 'Aucun échantillon représentatif Reddit audité pour ce premier examen.',
  [f.reviewSignals.xMentions]: 'Aucun échantillon représentatif X audité pour ce premier examen.',
  [f.reviewSignals.trustpilotNote]: 'Trustpilot n’affiche aucune note pour x-funded.com pour manquement à ses règles et indique avoir retiré de faux avis. La page compte 583 avis au 16 novembre 2026. Aucune ancienne note ni quantité d’avis supprimés n’est déduite.',
  [f.reviewSignals.trustpilotFlaggedReviewNote!]: 'Trustpilot ne donne pas le nombre d’avis supprimés ; aucun nombre n’est inventé.',
  [f.reviewSignals.confidenceDrivers![0]]: 'Règles et tarifs documentés, cocontractant nommé.',
  [f.reviewSignals.confidenceDrivers![1]]: 'Différences non résolues sur les entités et les retraits ; aucun historique de paiements clients authentifié indépendamment.',
  [f.reviewSignals.radarVerdict!]: '52/100 est une première appréciation éditoriale indépendante de toute affiliation. Lire la politique de partage à 50 % liée aux affiliés et les conditions de retrait avant de choisir un programme.'
});
