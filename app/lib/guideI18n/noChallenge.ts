import type { Locale } from '../locales';
import type { GuideTranslation } from './types';

type GettingStarted = {
  title: string;
  description: string;
  answer: string;
  heading: string;
  steps: { title: string; text: string }[];
  exampleHeading: string;
  examples: string[];
};

/** Updates to the existing translated articles; English and French have their own bodies. */
const translations: Partial<Record<Locale, GettingStarted>> = {
  de: {
    title: 'Wie startet man bei einer Prop Firm ohne Challenge?',
    description: 'Ohne Challenge starten: Markt und Programm wählen, Teilnahmebedingungen, Gebühren und Drawdown prüfen und die erste Auszahlung verstehen.',
    answer: 'Wählen Sie den Markt und das genaue Programm, prüfen Sie Ihre Teilnahmeberechtigung, lesen Sie die Regeln des finanzierten Kontos und berechnen Sie alle Gebühren. Testen Sie Ihre Strategie an den Verlustlimits, bevor Sie das Konto einrichten. Ohne Evaluation können weiterhin Gewinnziele, Handelstage und Auszahlungslimits gelten.',
    heading: 'In sechs Schritten ohne Challenge starten',
    steps: [
      { title: 'Markt und Teilnahmeberechtigung prüfen', text: 'Bestätigen Sie Instrumente, Plattform, Handelszeiten, zugelassene Länder, Identitätsprüfung und Vertragspartner.' },
      { title: 'Die Regeln des genauen Programms lesen', text: 'Speichern Sie Produktname und Vertragsversion. Notieren Sie Tagesverlust, maximalen Verlust, Berechnung und Reset-Zeit.' },
      { title: 'Den Weg zur ersten Auszahlung festhalten', text: 'Prüfen Sie qualifizierende Handelstage, Gewinnziel, Konsistenz, Mindestantrag, Obergrenzen und Gewinnbeteiligung.' },
      { title: 'Alle Gebühren berechnen', text: 'Berücksichtigen Sie Kauf, Aktivierung, Abonnement, Plattform und Daten, soweit zutreffend. Lesen Sie Erstattungs- und Ersatzbedingungen.' },
      { title: 'Die Strategie an diesen Limits testen', text: 'Verwenden Sie ein Testkonto oder Ihr Journal einschließlich offener Verluste, Gebühren und Verlustserien. Der Nennbetrag ist kein Verlustbudget.' },
      { title: 'Konto einrichten und beide Verlustgrenzen überwachen', text: 'Bestätigen Sie nach den erforderlichen Prüfungen, dass das Dashboard dem Vertrag entspricht. Prüfen Sie vor jeder Session beide Verlustgrenzen und die Auszahlungsbedingungen.' },
    ],
    exampleHeading: 'Zwei Beispiele: Sofortzugang ist keine sofortige Auszahlung',
    examples: [
      'Die am 15. November 2026 geprüften offiziellen Regeln zeigen den Unterschied. Hyro Instant verlangt für die erste Auszahlung drei qualifizierende Handelstage und mindestens $25 Gewinn nach der Gewinnteilung. Der je Auszahlung berücksichtigte Gewinn ist begrenzt.',
      'Tradeify Lightning Funded nennt beim $50,000-Konto ein erstes Gewinnziel von $3,000, aber eine Obergrenze des Antrags von $2,000 vor der 90%-Gewinnbeteiligung. Konsistenz gilt ebenfalls. Das Gewinnziel ist nicht der auszahlbare Betrag; veröffentlichte Regeln bestätigen keine einzelnen Kundenzahlungen.',
    ],
  },
  it: {
    title: 'Come iniziare con una prop firm senza challenge?',
    description: 'Iniziare senza challenge: scegliere mercato e programma, verificare requisiti, costi e drawdown e capire le condizioni del primo payout.',
    answer: 'Scegli mercato e programma preciso, verifica l’idoneità, leggi le regole del conto finanziato e calcola tutti i costi. Prova la strategia rispetto ai limiti di perdita prima di configurare il conto. Saltare la valutazione non elimina obiettivi di payout, giorni richiesti o limiti di prelievo.',
    heading: 'Sei passaggi per iniziare senza challenge',
    steps: [
      { title: 'Scegliere mercato e verificare l’idoneità', text: 'Controlla strumenti, piattaforma, orari, paesi ammessi, verifica dell’identità e società contraente.' },
      { title: 'Leggere le regole del programma esatto', text: 'Salva nome del prodotto e versione del contratto. Annota perdita giornaliera, perdita massima, metodo di calcolo e orario di reset.' },
      { title: 'Scrivere il percorso fino al primo payout', text: 'Verifica giorni qualificanti, obiettivo, costanza, richiesta minima, tetti e ripartizione dei profitti.' },
      { title: 'Calcolare tutti i costi', text: 'Considera acquisto, attivazione, abbonamento, piattaforma e dati se previsti. Leggi le condizioni di rimborso e sostituzione.' },
      { title: 'Provare la strategia con questi limiti', text: 'Usa una prova o il diario includendo perdite aperte, commissioni e serie di perdite. Il saldo nominale non è il budget di perdita.' },
      { title: 'Configurare il conto e monitorare entrambe le soglie', text: 'Dopo le verifiche richieste, controlla che il dashboard corrisponda al contratto. Verifica limiti di perdita e requisiti di payout prima di ogni sessione.' },
    ],
    exampleHeading: 'Due esempi: accesso immediato e prelievo sono distinti',
    examples: [
      'Le regole ufficiali controllate il 15 novembre 2026 mostrano la differenza. Hyro Instant richiede tre giorni qualificanti e almeno $25 di profitto dopo la ripartizione per il primo payout. Il profitto conteggiato per ogni payout è limitato.',
      'Tradeify Lightning Funded da $50,000 indica un primo obiettivo di $3,000, ma una richiesta massima di $2,000 prima della ripartizione al 90%. Si applica anche la costanza. L’obiettivo non è l’importo prelevabile; le regole pubblicate non autenticano i singoli pagamenti ai clienti.',
    ],
  },
  es: {
    title: '¿Cómo empezar con una prop firm sin challenge?',
    description: 'Empezar sin challenge: elegir mercado y programa, comprobar requisitos, costes y drawdown y entender el primer retiro.',
    answer: 'Elige el mercado y el programa exacto, comprueba tu elegibilidad, lee las reglas de la cuenta financiada y calcula todos los costes. Prueba tu estrategia con los límites de pérdida antes de configurar la cuenta. Saltarse la evaluación no elimina objetivos de pago, días requeridos ni topes de retiro.',
    heading: 'Seis pasos para empezar sin challenge',
    steps: [
      { title: 'Elegir mercado y comprobar elegibilidad', text: 'Confirma instrumentos, plataforma, horarios, países admitidos, verificación de identidad y empresa contratante.' },
      { title: 'Leer las reglas del programa exacto', text: 'Guarda el nombre del producto y la versión del contrato. Anota pérdida diaria, pérdida máxima, cálculo y hora de reinicio.' },
      { title: 'Escribir el camino hasta el primer retiro', text: 'Comprueba días válidos, objetivo de beneficio, consistencia, solicitud mínima, topes y reparto de ganancias.' },
      { title: 'Calcular todos los costes', text: 'Incluye compra, activación, suscripción, plataforma y datos cuando correspondan. Lee las condiciones de reembolso y sustitución.' },
      { title: 'Probar la estrategia con esos límites', text: 'Usa una prueba o tu diario con pérdidas abiertas, comisiones y rachas de pérdidas. El saldo nominal no es tu presupuesto de pérdida.' },
      { title: 'Configurar la cuenta y vigilar ambos umbrales', text: 'Tras las comprobaciones exigidas, confirma que el panel coincide con el contrato. Revisa límites y condiciones de retiro antes de cada sesión.' },
    ],
    exampleHeading: 'Dos ejemplos: acceso inmediato no es retiro inmediato',
    examples: [
      'Las reglas oficiales comprobadas el 15 de noviembre de 2026 muestran la diferencia. Hyro Instant exige tres días válidos y al menos $25 de beneficio tras el reparto para el primer pago. El beneficio contabilizado por retiro está limitado.',
      'Tradeify Lightning Funded de $50,000 publica un primer objetivo de $3,000, pero limita la solicitud a $2,000 antes del reparto del 90%. También aplica consistencia. El objetivo no es la cantidad retirable; las reglas publicadas no autentican pagos individuales a clientes.',
    ],
  },
  pt: {
    title: 'Como começar numa prop firm sem desafio?',
    description: 'Começar sem desafio: escolher mercado e programa, verificar requisitos, custos e drawdown e compreender o primeiro pagamento.',
    answer: 'Escolha o mercado e o programa exato, confirme a elegibilidade, leia as regras da conta financiada e calcule todos os custos. Teste a estratégia face aos limites de perda antes de configurar a conta. Saltar a avaliação não elimina objetivos de pagamento, dias exigidos ou limites de levantamento.',
    heading: 'Seis passos para começar sem desafio',
    steps: [
      { title: 'Escolher mercado e confirmar elegibilidade', text: 'Verifique instrumentos, plataforma, horários, países aceites, identificação e empresa contratante.' },
      { title: 'Ler as regras do programa exato', text: 'Guarde o nome do produto e a versão do contrato. Anote perda diária, perda máxima, cálculo e hora de reinício.' },
      { title: 'Definir o percurso até ao primeiro levantamento', text: 'Confirme dias qualificantes, objetivo de lucro, consistência, pedido mínimo, limites e divisão dos lucros.' },
      { title: 'Calcular todos os custos', text: 'Inclua compra, ativação, subscrição, plataforma e dados quando aplicável. Leia as condições de reembolso e substituição.' },
      { title: 'Testar a estratégia com esses limites', text: 'Use uma conta de teste ou o diário com perdas abertas, comissões e séries de perdas. O saldo nominal não é o orçamento de perda.' },
      { title: 'Configurar a conta e acompanhar ambos os limites', text: 'Após as verificações necessárias, confirme que o painel corresponde ao contrato. Reveja limites e elegibilidade para pagamento antes de cada sessão.' },
    ],
    exampleHeading: 'Dois exemplos: acesso imediato não significa levantamento imediato',
    examples: [
      'As regras oficiais verificadas em 15 de novembro de 2026 mostram a diferença. A Hyro Instant exige três dias qualificantes e pelo menos $25 de lucro após a divisão para o primeiro pagamento. O lucro contabilizado por levantamento tem um limite.',
      'A Tradeify Lightning Funded de $50,000 publica um primeiro objetivo de $3,000, mas limita o pedido a $2,000 antes da divisão de 90%. A consistência também se aplica. O objetivo não é o montante levantável; as regras publicadas não autenticam pagamentos individuais a clientes.',
    ],
  },
  zh: {
    title: '如何开始使用免考核自营交易公司？',
    description: '免考核账户入门：选择市场和项目，核对资格、费用与回撤，并了解首次出金条件。',
    answer: '先选择市场和具体项目，核对参与资格，阅读资助阶段规则并计算全部费用。开户前，用实际亏损限制检验策略。跳过考核不代表取消出金利润目标、合格交易日或提现上限。',
    heading: '免考核账户入门的六个步骤',
    steps: [
      { title: '选择市场并核对资格', text: '确认交易品种、平台、交易时段、允许的国家、身份核验和签约公司。' },
      { title: '阅读具体项目的规则', text: '保存项目名称和合同版本，记录每日亏损、最大亏损、计算方式和重置时间。' },
      { title: '列出首次出金的全部条件', text: '核对合格交易日、利润目标、一致性、最低申请金额、上限和利润分成。' },
      { title: '计算全部费用', text: '按项目核对购买、激活、订阅、平台和行情费用，并阅读退款及账户替换条件。' },
      { title: '按这些限制测试策略', text: '使用试用账户或交易日志，计入浮动亏损、手续费和连续亏损。名义账户余额不是可亏损预算。' },
      { title: '完成设置并监测两条亏损底线', text: '完成所需核验后，确认仪表盘与合同一致。每次交易前检查每日与总亏损底线以及出金资格。' },
    ],
    exampleHeading: '两个实例：即时开户与即时出金不同',
    examples: [
      '2026年11月15日核对的官方规则显示：Hyro Instant 首次出金需要三个合格交易日，以及分成后至少 $25 的利润。每次出金所计入的利润有上限。',
      'Tradeify Lightning Funded 的 $50,000 账户首次利润目标为 $3,000，但申请金额上限为 $2,000，再按90%分成；同时还有一致性要求。利润目标不等于可提现金额，公开规则也不能独立核实单笔客户付款。',
    ],
  },
  ja: {
    title: 'チャレンジなしのプロップファームを始めるには？',
    description: 'チャレンジなし口座の始め方。市場とプログラムを選び、参加条件、費用、ドローダウン、初回出金の条件を確認します。',
    answer: '市場と具体的なプログラムを選び、参加資格、資金提供段階のルール、すべての費用を確認してください。口座設定前に、実際の損失制限で戦略を検証します。評価を省略しても、出金利益目標、必要取引日数、出金上限がなくなるとは限りません。',
    heading: 'チャレンジなしで始める六つの手順',
    steps: [
      { title: '市場と参加資格を確認する', text: '取引商品、プラットフォーム、取引時間、対象国、本人確認、契約会社を確認します。' },
      { title: '対象プログラムのルールを読む', text: '商品名と契約の版を保存し、日次損失、最大損失、計算方法、リセット時刻を記録します。' },
      { title: '初回出金までの条件を書き出す', text: '有効取引日、利益目標、一貫性、最低申請額、上限、利益分配を確認します。' },
      { title: 'すべての費用を計算する', text: '該当する購入、アクティベーション、定期料金、プラットフォーム、データの費用と、返金・口座再購入条件を読みます。' },
      { title: 'その制限で戦略を試す', text: '試用口座や取引記録で含み損、手数料、連敗を検証します。表示残高は許容損失額ではありません。' },
      { title: '口座を設定し二つの損失下限を監視する', text: '必要な確認後、ダッシュボードと契約の一致を確認します。各セッション前に日次・総損失の下限と出金資格を確認してください。' },
    ],
    exampleHeading: '二つの例：即時アクセスと即時出金は別',
    examples: [
      '2026年11月15日に確認した公式ルールでは、Hyro Instant の初回出金には三つの有効取引日と分配後で少なくとも $25 の利益が必要です。各出金で計上される利益には上限があります。',
      'Tradeify Lightning Funded の $50,000 口座は初回利益目標が $3,000 ですが、申請上限は90%の分配前で $2,000 です。一貫性条件も適用されます。利益目標は出金可能額ではなく、公開ルールは個別の顧客への支払いを認証するものではありません。',
    ],
  },
  hi: {
    title: 'बिना चैलेंज वाली प्रॉप फर्म के साथ शुरुआत कैसे करें?',
    description: 'बिना चैलेंज शुरुआत: बाज़ार और कार्यक्रम चुनें, पात्रता, शुल्क और ड्रॉडाउन जाँचें तथा पहले भुगतान की शर्तें समझें।',
    answer: 'बाज़ार और सटीक कार्यक्रम चुनें, पात्रता जाँचें, फंडेड खाते के नियम पढ़ें और सभी शुल्क जोड़ें। खाता सेट करने से पहले वास्तविक हानि सीमाओं के अनुसार रणनीति जाँचें। मूल्यांकन छोड़ने पर भी भुगतान के लाभ लक्ष्य, आवश्यक ट्रेडिंग दिन और निकासी सीमाएँ लागू हो सकती हैं।',
    heading: 'बिना चैलेंज शुरुआत के छह चरण',
    steps: [
      { title: 'बाज़ार चुनें और पात्रता जाँचें', text: 'इंस्ट्रूमेंट, प्लेटफ़ॉर्म, समय, अनुमत देश, पहचान सत्यापन और अनुबंध करने वाली कंपनी की पुष्टि करें।' },
      { title: 'सटीक कार्यक्रम के नियम पढ़ें', text: 'उत्पाद का नाम और अनुबंध का संस्करण रखें। दैनिक हानि, अधिकतम हानि, गणना और रीसेट का समय लिखें।' },
      { title: 'पहले भुगतान तक की शर्तें लिखें', text: 'योग्य ट्रेडिंग दिन, लाभ लक्ष्य, कंसिस्टेंसी, न्यूनतम अनुरोध, सीमाएँ और लाभ हिस्सेदारी जाँचें।' },
      { title: 'सभी शुल्क जोड़ें', text: 'लागू होने पर खरीद, एक्टिवेशन, सदस्यता, प्लेटफ़ॉर्म और डेटा शुल्क जोड़ें। रिफंड और खाते के प्रतिस्थापन की शर्तें पढ़ें।' },
      { title: 'इन्हीं सीमाओं पर रणनीति जाँचें', text: 'ट्रायल या ट्रेडिंग जर्नल में खुली हानि, कमीशन और लगातार नुकसान शामिल करें। खाते का नाममात्र बैलेंस हानि का बजट नहीं है।' },
      { title: 'खाता सेट करें और दोनों हानि सीमाएँ देखें', text: 'आवश्यक सत्यापन के बाद जाँचें कि डैशबोर्ड अनुबंध से मेल खाता है। हर सत्र से पहले दैनिक और कुल हानि सीमा तथा भुगतान पात्रता देखें।' },
    ],
    exampleHeading: 'दो उदाहरण: तुरंत प्रवेश और तुरंत निकासी अलग हैं',
    examples: [
      '15 नवंबर 2026 को जाँचे गए आधिकारिक नियमों में Hyro Instant के पहले भुगतान के लिए तीन योग्य ट्रेडिंग दिन और लाभ हिस्सेदारी के बाद कम से कम $25 लाभ आवश्यक है। हर निकासी में गिने जाने वाले लाभ पर सीमा है।',
      'Tradeify Lightning Funded के $50,000 खाते का पहला लाभ लक्ष्य $3,000 है, लेकिन 90% हिस्सेदारी से पहले अनुरोध की सीमा $2,000 है। कंसिस्टेंसी भी लागू है। लाभ लक्ष्य निकासी योग्य रकम नहीं है; प्रकाशित नियम व्यक्तिगत ग्राहक भुगतान का स्वतंत्र प्रमाणीकरण नहीं हैं।',
    ],
  },
};

export function updateNoChallengeTranslation(locale: Locale, translation: GuideTranslation): GuideTranslation {
  const update = translations[locale];
  if (!update || !translation.article) return translation;
  return {
    ...translation,
    title: update.title,
    h1: update.title,
    metaDescription: update.description,
    answer: update.answer,
    checks: update.steps.map((step) => step.title),
    faq: [{ question: update.title, answer: update.answer }, ...translation.faq],
    article: {
      ...translation.article,
      intro: update.answer,
      sections: [
        { heading: update.heading, paragraphs: [update.answer], steps: update.steps },
        ...translation.article.sections.slice(1),
        { heading: update.exampleHeading, paragraphs: update.examples },
      ],
    },
  };
}
