import type { Locale } from '../locales';
import type { GuideTranslation } from './types';

/** Targeted translated research additions, checked 25 Nov 2026.
 * Existing long article text remains in its original language and order.
 * This does not claim every earlier section was retranslated/reverified. */
const keys = ['prop-firm-payout-proof', 'ftmo-vs-the5ers', 'prop-firm-sans-consistency-rule', 'prop-firm-fiable-trustpilot'] as const;
const research: Partial<Record<Locale, [string, string][]>> = {
  "fr": [
    [
      "Quatre niveaux de preuve de payout",
      "Une capture ou un total déclaré par la firme ne constitue pas une vérification indépendante. La presse peut relayer le même chiffre. Un tracker blockchain permet de vérifier un événement de règlement attribué à la société, mais pas nécessairement l'identité du bénéficiaire ni son encaissement bancaire. Pour un paiement individuel, rapprochez le hash, la date, le montant et un justificatif anonymisé avec le consentement du trader. Le nombre de transactions n'est pas le nombre de traders. L'absence de trace ne prouve pas un impayé."
    ],
    [
      "FTMO et The5ers : comparez les programmes",
      "FTMO 1-Step applique 50 % de consistance et Instant 30 % ; le 2-Step n'a pas de seuil en pourcentage. Depuis le 12 octobre, le calcul du nouveau 1-Step porte sur le profit net. Le Bootcamp The5ers comporte trois phases et son cycle de retrait de 14 jours repart à chaque scaling. High Stakes retire les gains des exécutions interdites aux news mais conserve les pertes. Les Futures ont des règles distinctes : la FAQ The5ers indique 40 % par trade. ProGrowth et les actions nécessitent leurs propres vérifications."
    ],
    [
      "Consistance : seuil et mode de calcul",
      "Pour une meilleure journée de 1 000 $, le profit total requis est de 2 000 $ à 50 %, 2 500 $ à 40 %, 5 000 $ à 20 % et environ 6 667 $ à 15 %. Une condition d'éligibilité transparente n'est pas une confiscation. FundedNext Futures Direct conserve la meilleure journée historique pour ses cycles suivants (20 %). FundingPips Zero exige 15 % maximum. Vérifiez la phase, le dénominateur et les sanctions."
    ],
    [
      "Trustpilot : note visible, suspendue ou inaccessible",
      "Ces trois statuts sont distincts. La suspension d'une note est un signal propre à la plateforme, pas une preuve d'impayé ou de fraude. Le profil exact de GOAT affichait encore un avis de suspension le 25 novembre 2026. Notez le domaine, la date, le motif affiché et les éventuelles réponses. Recoupez avec les contrats, les incidents documentés et les preuves de paiement ; n'appliquez aucun malus chiffré dans le texte d'un guide."
    ]
  ],
  "de": [
    [
      "Vier Stufen von Auszahlungsnachweisen",
      "Ein Screenshot oder eine vom Unternehmen gemeldete Summe ist keine unabhängige Prüfung. Auch Presseberichte können dieselbe Unternehmensangabe wiederholen. Ein Blockchain-Tracker dokumentiert zugeordnete Abwicklungsvorgänge, aber nicht zwingend die Identität des Empfängers oder den Eingang auf seinem Bankkonto. Gleichen Sie Hash, Datum und Betrag mit einem anonymisierten Beleg ab, wenn der Trader zustimmt. Transaktionszahlen sind keine Zahl einzelner Trader; fehlende Daten beweisen keine Nichtzahlung."
    ],
    [
      "FTMO und The5ers: Programme vergleichen",
      "FTMO 1-Step verlangt 50 % Konsistenz, Instant 30 %; beim 2-Step gibt es keine prozentuale Konsistenzregel. Bei neuen 1-Step-Bestellungen ab 12. Oktober zählt der Nettogewinn. The5ers Bootcamp hat drei Phasen; der 14-Tage-Auszahlungszyklus beginnt nach jedem Scaling neu. High Stakes streicht Gewinne aus verbotenen News-Ausführungen, Verluste bleiben. Für Futures gelten eigene Regeln: The5ers nennt in der FAQ 40 % pro Trade. ProGrowth und Aktienhandel gesondert prüfen."
    ],
    [
      "Konsistenz: Schwelle und Berechnungsbasis",
      "Bei einem besten Tag von 1.000 $ benötigt man 2.000 $ Gesamtgewinn bei 50 %, 2.500 $ bei 40 %, 5.000 $ bei 20 % und rund 6.667 $ bei 15 %. Eine transparente Auszahlungsbedingung ist keine Gewinnstreichung. FundedNext Futures Direct verwendet auch nach Auszahlungen den historisch besten Tag (20 %). FundingPips Zero verlangt höchstens 15 %. Prüfen Sie Phase, Nenner und Sanktionen."
    ],
    [
      "Trustpilot: sichtbar, ausgesetzt oder nicht erreichbar",
      "Diese Zustände sind verschieden. Eine ausgesetzte Bewertung ist ein Plattformhinweis, kein Beweis für Betrug oder Nichtzahlung. Am 25. November 2026 zeigte das GOAT-Profil weiterhin einen solchen Hinweis. Erfassen Sie Domain, Datum, angezeigten Grund und Unternehmensantworten. Prüfen Sie Vertragsregeln, dokumentierte Vorfälle und Zahlungsbelege gesondert; keine feste Punktstrafe im Ratgeber."
    ]
  ],
  "it": [
    [
      "Quattro livelli di prova dei pagamenti",
      "Uno screenshot o un totale dichiarato dalla società non è una verifica indipendente. Anche la stampa può riprendere la stessa dichiarazione. Un tracker blockchain documenta un regolamento attribuito alla società, ma non necessariamente l'identità del destinatario o l'accredito bancario. Con il consenso del trader, confronta hash, data e importo con una ricevuta anonimizzata. Il numero di transazioni non equivale al numero di trader; l'assenza di una traccia non dimostra il mancato pagamento."
    ],
    [
      "FTMO e The5ers: confrontare i programmi",
      "FTMO 1-Step richiede il 50% di consistenza, Instant il 30%; il 2-Step non ha una soglia percentuale. Per i nuovi 1-Step dal 12 ottobre conta il profitto netto. Bootcamp di The5ers ha tre fasi e il ciclo di prelievo di 14 giorni riparte a ogni scaling. High Stakes elimina i profitti delle esecuzioni vietate durante le notizie, mantenendo le perdite. Futures ha regole separate: la FAQ The5ers indica il 40% per operazione. Verifica separatamente ProGrowth e azioni."
    ],
    [
      "Consistenza: soglia e base di calcolo",
      "Con una giornata migliore di 1.000 $, il profitto totale necessario è 2.000 $ al 50%, 2.500 $ al 40%, 5.000 $ al 20% e circa 6.667 $ al 15%. Un requisito trasparente di idoneità non è una confisca. FundedNext Futures Direct mantiene la migliore giornata storica nei cicli successivi (20%). FundingPips Zero richiede al massimo il 15%. Verifica fase, denominatore e sanzioni."
    ],
    [
      "Trustpilot: voto visibile, sospeso o non accessibile",
      "Sono stati distinti. La sospensione è un segnale della piattaforma, non prova di frode o mancato pagamento. Il profilo GOAT mostrava ancora tale avviso il 25 novembre 2026. Registra dominio, data, motivo e risposte della società. Incrocia contratti, incidenti documentati e prove di pagamento; non applicare penalità numeriche fisse nel testo."
    ]
  ],
  "es": [
    [
      "Cuatro niveles de prueba de pagos",
      "Una captura o un total declarado por la empresa no es una verificación independiente. La prensa puede repetir esa misma cifra. Un rastreador blockchain documenta un evento de liquidación atribuido a la empresa, pero no necesariamente la identidad del beneficiario ni el abono bancario. Con consentimiento, contrasta hash, fecha e importe con un justificante anonimizado. El número de transacciones no equivale al número de traders; la ausencia de rastro no demuestra impago."
    ],
    [
      "FTMO y The5ers: comparar programas",
      "FTMO 1-Step exige consistencia del 50%, Instant del 30%; 2-Step no tiene un límite porcentual. Las nuevas compras 1-Step desde el 12 de octubre usan el beneficio neto. Bootcamp de The5ers tiene tres fases y reinicia el ciclo de retirada de 14 días con cada escalado. High Stakes elimina las ganancias de ejecuciones prohibidas durante noticias, pero mantiene las pérdidas. Futuros tiene reglas propias: la FAQ de The5ers indica 40% por operación. Comprueba ProGrowth y acciones por separado."
    ],
    [
      "Consistencia: límite y fórmula",
      "Con un mejor día de 1.000 $, el beneficio total necesario es 2.000 $ al 50%, 2.500 $ al 40%, 5.000 $ al 20% y unos 6.667 $ al 15%. Una condición transparente de elegibilidad no es una confiscación. FundedNext Futures Direct conserva el mejor día histórico en los ciclos posteriores (20%). FundingPips Zero exige como máximo 15%. Comprueba la fase, el denominador y las sanciones."
    ],
    [
      "Trustpilot: nota visible, suspendida o inaccesible",
      "Son estados distintos. Una nota suspendida es una señal de la plataforma, no prueba de fraude o impago. El perfil de GOAT seguía mostrando ese aviso el 25 de noviembre de 2026. Registra dominio, fecha, motivo y respuestas. Contrasta contratos, incidencias documentadas y pruebas de pago; no fijes penalizaciones numéricas en el texto."
    ]
  ],
  "pt": [
    [
      "Quatro níveis de prova de pagamentos",
      "Uma captura de ecrã ou um total declarado pela empresa não é uma verificação independente. A imprensa pode repetir o mesmo valor. Um rastreador blockchain documenta um evento de liquidação atribuído à empresa, mas não necessariamente a identidade do beneficiário ou o crédito bancário. Com consentimento, compare hash, data e montante com um comprovativo anonimizado. O número de transações não é o número de traders; a ausência de registo não prova falta de pagamento."
    ],
    [
      "FTMO e The5ers: comparar programas",
      "FTMO 1-Step exige consistência de 50%, Instant de 30%; 2-Step não tem limite percentual. Novas compras 1-Step a partir de 12 de outubro usam lucro líquido. Bootcamp da The5ers tem três fases e reinicia o ciclo de levantamento de 14 dias a cada scaling. High Stakes elimina lucros de execuções proibidas durante notícias, mantendo as perdas. Futuros tem regras próprias: a FAQ da The5ers indica 40% por operação. Verifique ProGrowth e ações separadamente."
    ],
    [
      "Consistência: limite e cálculo",
      "Com um melhor dia de 1.000 $, o lucro total necessário é 2.000 $ a 50%, 2.500 $ a 40%, 5.000 $ a 20% e cerca de 6.667 $ a 15%. Uma condição transparente de elegibilidade não é uma perda de lucro. FundedNext Futures Direct conserva o melhor dia histórico nos ciclos posteriores (20%). FundingPips Zero exige no máximo 15%. Verifique fase, denominador e sanções."
    ],
    [
      "Trustpilot: nota visível, suspensa ou inacessível",
      "São estados distintos. Uma nota suspensa é um sinal da plataforma, não prova de fraude ou falta de pagamento. O perfil da GOAT continuava a mostrar esse aviso em 25 de novembro de 2026. Registe domínio, data, motivo e respostas. Cruze contratos, incidentes documentados e provas de pagamento; não fixe penalizações numéricas no texto."
    ]
  ],
  "zh": [
    [
      "四个出金证据层级",
      "截图或公司自行公布的总额并不等同于独立核验，媒体也可能只是转述同一数字。区块链追踪器可以记录归属于公司的结算事件，却未必能确认收款人身份或银行到账。经交易者同意，可将交易哈希、日期和金额与脱敏收款凭证核对。交易笔数不等于交易者人数；缺少链上记录不能证明未付款。"
    ],
    [
      "FTMO 与 The5ers：按具体计划比较",
      "FTMO 1-Step 的一致性门槛为 50%，Instant 为 30%，2-Step 无百分比一致性门槛。10 月 12 日起的新 1-Step 订单按净利润计算。The5ers Bootcamp 有三个阶段，每次扩容后重新开始 14 天出金周期；High Stakes 在禁止的新闻窗口执行订单时扣除盈利但保留亏损。期货适用独立规则：The5ers 专门 FAQ 为单笔交易 40%。ProGrowth 和股票计划需另行核查。"
    ],
    [
      "一致性：比例和计算口径",
      "最佳单日盈利为 1,000 美元时，50% 门槛需要总盈利 2,000 美元，40% 需要 2,500 美元，20% 需要 5,000 美元，15% 需要约 6,667 美元。透明的资格门槛不等于没收盈利。FundedNext Futures Direct 在后续出金周期仍使用历史最佳单日（20%）；FundingPips Zero 要求不超过 15%。核对阶段、分母和处罚。"
    ],
    [
      "Trustpilot：评分可见、暂停或无法访问",
      "这三种状态应分别记录。评分暂停是平台信号，并非欺诈或未付款的证明。2026 年 11 月 25 日，GOAT 的对应域名仍显示暂停评分提示。记录域名、日期、显示原因及公司回复；另行核对合同、已记录事件和出金证据。指南不写死扣分数值。"
    ]
  ],
  "ja": [
    [
      "出金証拠の4段階",
      "スクリーンショットや会社が公表した総額は独立した検証ではありません。報道も同じ発表を転載している場合があります。ブロックチェーンの追跡サービスは会社に帰属する決済イベントを記録しますが、受取人の身元や銀行着金まで証明するとは限りません。同意を得てハッシュ、日付、金額を匿名化した受取記録と照合します。取引件数は人数ではなく、記録がないことは未払いの証明ではありません。"
    ],
    [
      "FTMOとThe5ers：プログラム別の比較",
      "FTMOの1-Stepは50%、Instantは30%の一貫性基準、2-Stepには割合基準がありません。10月12日以降の新規1-Stepは純利益で計算します。The5ersのBootcampは3段階で、スケーリングのたびに14日間の出金周期が再開します。High Stakesは制限ニュース時の約定益を除外し、損失は残します。先物は別ルールで、The5ersの専用FAQは1取引40%と記載。ProGrowthと株式も個別確認が必要です。"
    ],
    [
      "一貫性：基準と計算方法",
      "最高利益日が1,000ドルなら、50%では総利益2,000ドル、40%では2,500ドル、20%では5,000ドル、15%では約6,667ドルが必要です。透明な資格条件と利益没収は別です。FundedNext Futures Directは出金後も過去最高利益日を使います（20%）。FundingPips Zeroは15%以下。段階、分母、制裁を確認してください。"
    ],
    [
      "Trustpilot：表示、評価停止、閲覧不能",
      "これらは異なる状態です。評価停止はプラットフォームの情報であり、詐欺や未払いの証明ではありません。2026年11月25日、GOATの該当ドメインには停止表示が残っていました。ドメイン、日付、表示理由、会社の回答を記録し、契約、文書化された事案、支払証拠と照合します。ガイド本文に固定の減点数は記載しません。"
    ]
  ],
  "hi": [
    [
      "भुगतान प्रमाण के चार स्तर",
      "स्क्रीनशॉट या कंपनी द्वारा बताया गया कुल भुगतान स्वतंत्र सत्यापन नहीं है। मीडिया भी वही आंकड़ा दोहरा सकता है। ब्लॉकचेन ट्रैकर कंपनी से जुड़े निपटान को दर्ज करता है, लेकिन प्राप्तकर्ता की पहचान या बैंक में रकम पहुंचने को हमेशा सिद्ध नहीं करता। ट्रेडर की सहमति से हैश, तारीख और राशि का मिलान पहचान हटाए गए प्रमाण से करें। लेनदेन की संख्या ट्रेडरों की संख्या नहीं है; रिकॉर्ड न मिलना भुगतान न होने का प्रमाण नहीं है।"
    ],
    [
      "FTMO और The5ers: प्रोग्राम की तुलना",
      "FTMO 1-Step में 50% और Instant में 30% कंसिस्टेंसी है; 2-Step में प्रतिशत सीमा नहीं है। 12 अक्टूबर से नए 1-Step ऑर्डर में शुद्ध लाभ गिना जाता है। The5ers Bootcamp की तीन अवस्थाएं हैं और हर स्केलिंग पर 14 दिन का निकासी चक्र फिर शुरू होता है। High Stakes में प्रतिबंधित न्यूज़ विंडो के निष्पादन का लाभ हटता है, नुकसान रहता है। फ्यूचर्स के अलग नियम हैं: The5ers FAQ में प्रति ट्रेड 40% है। ProGrowth और शेयरों के नियम अलग जांचें।"
    ],
    [
      "कंसिस्टेंसी: सीमा और गणना",
      "यदि सबसे अच्छा दिन 1,000 डॉलर का है, तो 50% पर कुल लाभ 2,000 डॉलर, 40% पर 2,500 डॉलर, 20% पर 5,000 डॉलर और 15% पर लगभग 6,667 डॉलर चाहिए। पात्रता की पारदर्शी शर्त लाभ जब्त करने के समान नहीं है। FundedNext Futures Direct में 20% के लिए अगले चक्रों में भी ऐतिहासिक सर्वोत्तम दिन गिना जाता है। FundingPips Zero में अधिकतम 15% है। चरण, गणना और दंड जांचें।"
    ],
    [
      "Trustpilot: दिखने वाली, निलंबित या अनुपलब्ध रेटिंग",
      "ये अलग स्थितियां हैं। निलंबित रेटिंग प्लेटफॉर्म का संकेत है, धोखाधड़ी या भुगतान न होने का प्रमाण नहीं। 25 नवंबर 2026 को GOAT के सही डोमेन पर यह सूचना मौजूद थी। डोमेन, तारीख, कारण और कंपनी के जवाब दर्ज करें। अनुबंध, दर्ज घटनाओं और भुगतान प्रमाण से मिलान करें; गाइड में निश्चित अंक कटौती न लिखें।"
    ]
  ]
};

export function refreshNovemberGuide(locale: Locale, slug: string, translation: GuideTranslation): GuideTranslation {
  const index = (keys as readonly string[]).indexOf(slug);
  const row = index < 0 ? undefined : research[locale]?.[index];
  if (!row) return translation;
  const [heading, paragraph] = row;
  const previous = translation.article;
  return {
    ...translation,
    checks: [...translation.checks, heading + ': ' + paragraph],
    article: {
      ...previous,
      sections: [...(previous?.sections ?? []), { heading, paragraphs: [paragraph] }],
    },
  };
}
