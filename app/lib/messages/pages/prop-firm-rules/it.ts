import type { RulesMessages } from './en';

const rules: RulesMessages = {
  metaTitle: 'Regole delle prop firm: drawdown, pagamenti e rischi di trading',
  metaDescription:
    'Confronta le regole sensibili delle prop firm: drawdown, trading sulle notizie, pagamenti, consistenza, EA, copy trading e strategie vietate.',
  schemaName: 'Analisi delle regole delle prop firm',
  breadcrumb: 'Regole di trading',
  eyebrow: 'Analisi approfondita delle regole',
  h1: 'Le clausole che possono costare un conto o un pagamento.',
  lead: 'PropRadar legge le pagine delle regole, i centri assistenza e le condizioni dei prodotti principali per isolare le clausole pericolose: drawdown, rollover, notizie, EA, copy trading, consistenza, limiti di pagamento e sanzioni.',
  reviewed: 'Pagina rivista il {date}. Ogni analisi mantiene una propria data di verifica della fonte, visibile.',
  statDeep: 'Analisi approfondite',
  statClauses: 'Clausole estratte ({critical} critiche)',
  statCompact: 'Società medie e piccole ({critical} critiche)',
  statTracked: 'Società seguite',
  coverageAria: 'Copertura delle analisi delle regole',
  statRuleFiles: 'Schede delle regole',
  statPayoutSensitive: 'Schede sensibili ai pagamenti',
  statLegalWatch: 'Monitoraggio legale',
  statDeepSources: '5+ fonti',
  related: 'Guide correlate:',
  relatedConsistency: 'Regola di consistenza',
  relatedNews: 'Trading sulle notizie',
  statsAria: 'Statistiche delle regole',
  families: [
    { label: 'Conto chiuso', title: 'Drawdown ed equity', text: "Il vero pericolo di solito è l'equity aperta, il rollover, gli swap e il reset del server." },
    { label: 'Profitto rimosso', title: 'Notizie e rollover', text: 'Alcune piattaforme consentono tecnicamente il trade ma rimuovono i guadagni o lo classificano come violazione.' },
    { label: 'Conto bloccato', title: 'EA, HFT, copy trading', text: 'Un EA consentito per la gestione del rischio può comunque essere vietato se opera in autonomia, copia conti o sovraccarica il server.' },
    { label: 'Prelievo ritardato', title: 'Pagamenti e consistenza', text: 'Regole sul giorno migliore, limiti di pagamento, giorni vincenti e cicli di prelievo possono contare più della ripartizione dei profitti pubblicizzata.' },
  ],
  alertsEyebrow: 'Avvisi per i trader',
  alertsTitle: 'Quello che le pagine di marketing non dicono abbastanza forte.',
  viewAudit: "Vedi l'analisi delle fonti",
  proofAria: "Prove dell'analisi delle regole di {name}",
  payoutChip: 'Pagamento {level}',
  legalChip: 'Legale {level}',
  sourceDeep: 'Fonti solide',
  sourceUsable: 'Fonti utilizzabili',
  sourceThin: 'Fonti scarse',
  sourceNone: 'Nessuna fonte',
  severity: { Faible: 'Basso', Moyen: 'Medio', 'Élevé': 'Alto', Critique: 'Critico' },
  proof: {
    'Source officielle lue': 'Fonte ufficiale letta',
    'Source officielle partielle': 'Fonte ufficiale parziale',
    'Source commerciale repérée': 'Pagina commerciale individuata',
  },
  sourceChecked: 'Fonte verificata il {date}',
  compactEyebrow: 'Società medie e piccole',
  compactTitle: 'La coda lunga viene letta società per società.',
  compactNote: 'Questi avvisi sintetici provengono da fonti ufficiali o da pagine prodotto individuate. Le schede parziali restano volutamente segnalate come tali.',
  fullEyebrow: 'Copertura completa',
  fullTitle: "Tutte le altre prop firm restano nella coda d'analisi.",
  fullNote: 'PropRadar mantiene visibili le società più piccole per evitare zone cieche: fonte individuata, archivio dei rischi o scheda ancora da documentare.',
  showQueue: "Mostra le {count} società ancora nella coda d'analisi",
  productToIdentify: 'Prodotto da identificare',
  mainProductToIdentify: 'Prodotto principale da identificare',
  coverageArchive: 'Archivio dei rischi',
  coverageMulti: 'Scheda multi-fonte',
  coverageSpotted: 'Fonte individuata',
  coverageToSource: 'Da documentare',
  nextEyebrow: 'Prossimo approfondimento',
  nextTitle: 'I prossimi prodotti principali da analizzare.',
  colDrawdown: 'Drawdown',
  colNews: 'Notizie',
  colEa: 'EA',
  colPayout: 'Pagamento',
  colScore: 'Punteggio',
  scoreAria: 'Punteggio PropRadar {score} su 100',
  matrixEyebrow: 'Matrice rapida',
  matrixTitle: 'Società attive ordinate per rischio di pagamento.',
  showMatrix: 'Mostra le {count} società attive per rischio di pagamento',
  scoreLine: 'punteggio {score}/100',
  audits: {
    ftmo: {
      headline: "Il rischio principale viene dai calcoli dell'equity e dalle pratiche vietate.",
      verdict:
        "FTMO è chiara, ma le sue regole sono rigide: perdita giornaliera calcolata sull'equity, drawdown trailing di fine giornata sull'1-Step, una Best Day Rule e ampie restrizioni su gap trading, HFT, conti collegati e aggiramento.",
      clauses: [
        {
          title: "La perdita giornaliera include l'equity aperta",
          finding: 'La perdita giornaliera include saldo, posizioni aperte, swap e commissioni. Una posizione aperta può violare la regola prima di essere chiusa.',
          impact: 'Non controllare mai solo il saldo. Uno spike, un allargamento dello spread o uno swap possono bastare a perdere il conto.',
        },
        {
          title: "Best Day / regola di consistenza sull'1-Step e sull'FTMO Account",
          finding:
            "Sui conti nati da ordini precedenti al 12 ottobre 2026, il giorno migliore non deve superare il 50% dei profitti positivi. I nuovi ordini 1-Step usano una regola di consistenza che confronta il giorno migliore con il profitto totale, giorni in perdita inclusi. Nessuna delle due è una violazione, ma entrambe possono bloccare l'avanzamento o una ricompensa finché il rapporto non viene corretto.",
          impact: 'Un solo grande trade vincente può costringerti a continuare a fare trading per sbloccare il conto, quindi ad assumere più rischio.',
        },
        {
          title: 'Clausole ampie sulle pratiche vietate',
          finding:
            'Gap trading, latenza, altissima velocità, conti coordinati, rotazione dei conti, scommesse a senso unico ed EA iperattivi possono portare a squalifica, trade rimossi, ricompense perse o risoluzione.',
          impact: 'Le strategie per "aggirare" la challenge e i setup multi-conto copiati sono il vero pericolo, anche quando il punteggio pubblico è eccellente.',
        },
      ],
    },
    the5ers: {
      headline: 'Il drawdown giornaliero è più ingannevole di quanto sembri.',
      verdict:
        "The5ers High Stakes sembra pulito sulla carta, ma il drawdown giornaliero usa il valore più alto tra saldo ed equity del giorno precedente. Un trade mantenuto durante il rollover può ridurre molto il margine disponibile.",
      clauses: [
        {
          title: "Il drawdown giornaliero usa il valore più alto tra saldo ed equity",
          finding: "Il drawdown giornaliero del 5% viene fissato a mezzanotte del server sulla base dell'equity o del saldo di chiusura del giorno prima, a seconda di quale sia più alto.",
          impact: "Chiudere la giornata con un'equity alta alza la soglia del giorno dopo. Una posizione mantenuta può chiudere il conto prima del previsto.",
        },
        {
          title: 'Regola di inattività di 30 giorni',
          finding: "I conti scadono dopo più di 30 giorni consecutivi senza attività di trading, contati dalla registrazione.",
          impact: 'Una challenge comprata per dopo può diventare una perdita totale se resta inutilizzata.',
        },
        {
          title: 'Pagamento ogni due settimane',
          finding: 'Dopo aver raggiunto lo stato finanziato, i prelievi sono disponibili dalla dashboard ogni due settimane.',
          impact: 'La liquidità non è immediata: non confrontare solo la ripartizione e il prezzo della challenge.',
        },
      ],
    },
    fundednext: {
      headline: 'Numerose regole anti-abuso possono rimuovere profitti prima della chiusura del conto.',
      verdict:
        'FundedNext è ben documentata, ma i suoi limiti anti-abuso sono estesi: tetto al rischio, tetto al margine, quick strike, iperattività, trading sul regolamento, copy trading e copertura tra più conti.',
      clauses: [
        {
          title: 'Rischio massimo del 3% e margine limitato al 70%',
          finding:
            'FundedNext limita il rischio al 3% in ogni momento e il margine cumulato al 70%. Una prima violazione può comportare un avvertimento e la rimozione dei profitti legati al trade.',
          impact: 'I profitti possono essere rimossi quando la dimensione della posizione esce dal quadro, anche senza chiusura immediata del conto.',
        },
        {
          title: 'Quick Strike e trade sotto i 30 secondi',
          finding:
            'I trade chiusi in meno di 30 secondi sono monitorati. Dal 30% di profitto in Quick Strike, il conto finanziato può essere chiuso e i profitti interessati rimossi.',
          impact: 'Uno scalping ultra-breve può trasformare una buona performance in un pagamento negato.',
        },
        {
          title: 'Iperattività cumulata tra conti',
          finding:
            'Duecento trade o 2.000 messaggi al server al giorno fanno scattare avvertimenti; 15.000 messaggi possono disattivare il conto. Gli avvertimenti possono sommarsi tra conti.',
          impact: 'Un EA o una gestione degli ordini troppo attiva può costare il conto anche senza intenzioni malevole.',
        },
      ],
    },
    topstep: {
      headline: 'Le trappole principali sono la consistenza, i limiti di pagamento e i cinque giorni vincenti.',
      verdict: "Topstep è affermata e chiara, ma l'avanzamento e i prelievi dipendono da più del profitto lordo.",
      clauses: [
        {
          title: 'Obiettivo di consistenza del 50%',
          finding: "Il giorno migliore deve restare sotto il 50% dell'obiettivo di profitto. Se viene superato, l'obiettivo aumenta, e le perdite non azzerano il giorno migliore.",
          impact: "Un solo grande giorno vincente può ritardare lo stato finanziato anche dopo aver raggiunto l'importo previsto.",
        },
        {
          title: 'Limiti di pagamento XFA',
          finding:
            "I prelievi dell'Express Funded Account sono limitati per richiesta e per dimensione del conto. Il limite può dipendere dal percorso standard o di consistenza e dall'opzione DLL.",
          impact: 'Un grande profitto non garantisce un prelievo immediato dello stesso importo.',
        },
        {
          title: 'Politica del profilo unico',
          finding: 'Tutti i conti devono restare sotto un unico profilo Topstep. Più profili possono portare a chiusura o sospensione.',
          impact: "Un conto doppio o un errore di registrazione può diventare un vero rischio operativo.",
        },
      ],
    },
    'apex-trader-funding': {
      headline: "Apex ha cambiato molto la sua offerta: conti storici e nuovi conti vanno separati.",
      verdict:
        "La nuova offerta di Apex mette in evidenza drawdown di fine giornata, nessun pagamento negato, consistenza del 50% e nessuna fatturazione ricorrente sui nuovi prodotti. I conti storici restano un sistema a parte.",
      clauses: [
        {
          title: 'Nuovi prodotti e conti storici',
          finding: "Apex dichiara che i conti storici non sono più venduti, non vengono modificati retroattivamente e possono restare in fatturazione ricorrente fino alla disdetta.",
          impact: 'Prima di confrontare recensioni o sconti di Apex, verifica se la fonte parla di un prodotto storico o attuale.',
        },
        {
          title: '5 giorni di trading tra le ricompense',
          finding: 'La pagina ufficiale indica cinque giorni di trading per pagamenti e ricompense nel percorso attuale.',
          impact: 'Anche avanzando in fretta, la velocità di prelievo dipende dal ciclo dei giorni di trading.',
        },
        {
          title: 'Consistenza del 50%',
          finding: 'La nuova offerta mostra una regola di consistenza del 50%.',
          impact: 'Un solo grande giorno può limitare il prelievo o l’avanzamento a seconda del conto usato.',
        },
      ],
    },
    'e8-markets': {
      headline: 'E8 è molto dettagliata, ma alcune regole rimuovono profitti senza chiudere il conto.',
      verdict:
        "E8 Markets documenta drawdown giornaliero, limiti di profitto, notizie, HFT, EA e regole sul giorno migliore. Il rischio principale per il trader è un profitto rimosso al rollover o al pagamento.",
      clauses: [
        {
          title: 'Drawdown giornaliero con chiusura definitiva',
          finding:
            "Il drawdown giornaliero è un importo fisso basato sul saldo iniziale. Se l'equity o il saldo toccano il livello di perdita, il conto viene chiuso definitivamente anche se la chiusura tecnica termina sopra.",
          impact: 'La chiusura finale può sembrare sopra la soglia mentre il conto è perso, perché prevale la violazione registrata dal server.',
        },
        {
          title: 'Limite di profitto giornaliero del 2%',
          finding:
            'Su E8 Pro, i profitti oltre il limite giornaliero non contano e vengono rimossi dopo il rollover. I tentativi di aggirarlo con coperture o chiusure parziali possono essere raggruppati.',
          impact: 'Una giornata eccezionale può essere in parte esclusa dal risultato valido.',
        },
        {
          title: 'Trading sulle notizie sui conti Performance E8 One',
          finding:
            'Sui conti performance E8 One è vietato aprire, chiudere o modificare SL/TP entro cinque minuti da notizie ad alto impatto, e i profitti possono essere rimossi.',
          impact: "La piattaforma può consentire tecnicamente l'azione mentre il profitto viene rimosso dopo, al pagamento.",
        },
      ],
    },
    'funding-pips': {
      headline: "Le violazioni nascono spesso da equity, rollover e allargamento degli spread.",
      verdict:
        'FundingPips dichiara chiaramente che i limiti sono monitorati lato server in tempo reale. Gli errori più costosi riguardano stop stretti, il rollover delle 17:00 di New York e posizioni aperte durante le notizie.',
      clauses: [
        {
          title: "Monitoraggio dell'equity in tempo reale",
          finding: "Le perdite giornaliera e massima monitorano l'equity in tempo reale. Fa fede il dato del server, anche quando il terminale o la dashboard sono in ritardo.",
          impact: 'Una posizione aperta può chiudere il conto prima che il display locale renda evidente la violazione.',
        },
        {
          title: 'Rollover alle 17:00 di New York',
          finding: 'FundingPips avverte che gli spread possono allargarsi molto alle 17:00 di New York, facendo scattare stop e violazioni.',
          impact: "Uno stop che sembra sicuro su un grafico Bid può essere colpito dall'Ask durante il rollover.",
        },
        {
          title: 'La richiesta di ricompensa richiede trade chiusi',
          finding: 'Il ciclo di ricompensa richiede di chiudere le posizioni, attendere 15 minuti e poi chiedere la ripartizione.',
          impact: 'Posizioni aperte e costi overnight possono ridurre il margine di sicurezza nel momento sbagliato.',
        },
      ],
    },
    'alpha-capital-group': {
      headline: 'Il pericolo principale: restrizioni sulle notizie, EA non approvati e regole anti-gioco.',
      verdict:
        "Alpha Capital consente alcuni usi, ma le regole dopo la qualifica sono delicate per finestre di notizie, IP, EA pre-approvati e comportamenti classificati come gioco d'azzardo.",
      clauses: [
        {
          title: 'Notizie: apertura e chiusura limitate a seconda del piano',
          finding:
            'Dopo la qualifica, alcuni piani vietano di aprire o chiudere due o cinque minuti attorno a notizie ad alto impatto. Anche un TP o uno SL scattato nella finestra può essere una violazione lieve.',
          impact: 'Una posizione può essere mantenuta legittimamente mentre un take profit raggiunto nel momento sbagliato rende il profitto non valido.',
        },
        {
          title: 'EA limitati alla gestione del rischio',
          finding: "EA autonomi, bot di terzi, HFT, arbitraggio di latenza o EA condivisi che generano trade identici possono portare alla chiusura del conto.",
          impact: "Un EA consentito non significa trading automatico senza limiti. Verifica l'uso, la piattaforma e l'eventuale pre-approvazione.",
        },
        {
          title: 'Restrizioni su IP e nucleo domestico',
          finding: 'Lo stesso nucleo domestico, più IP, uso di VPN/VPS non dichiarato o cambi di località incoerenti possono causare una violazione o un controllo di sicurezza.',
          impact: 'Viaggi, una casa condivisa, un altro trader in famiglia o un VPS dichiarato male possono diventare un problema di conformità.',
        },
      ],
    },
  },
  compact: {
    'funding-traders': {
      riskFamily: 'Pagamento + consistenza',
      signal:
        'Le tabelle mostrano perdite giornaliere, perdite massime, rischio per trade, consistenza e calendari di pagamento diversi per Instant Funded, 1-Step e 2-Step.',
      impact:
        "Prima di comprare, confronta più del prezzo: verifica il prodotto esatto, il ciclo di pagamento di 14 o 21 giorni e il punteggio di consistenza che può bloccare un prelievo.",
    },
    'maven-trading': {
      riskFamily: 'Drawdown + rimborso',
      signal:
        'La pagina ufficiale separa perdita giornaliera, perdita massima, obiettivi di profitto e frequenza dei pagamenti, e indica che alcune quote sono rimborsabili al terzo prelievo.',
      impact: "Il costo reale dipende da quanti pagamenti si ottengono. Un prezzo d'ingresso basso può valere poco se il programma scelto lascia poco margine di drawdown.",
    },
    fxify: {
      riskFamily: 'Drawdown giornaliero',
      signal: 'Il drawdown giornaliero può basarsi sul saldo di fine giornata precedente. Il primo pagamento è presentato come su richiesta, seguito da prelievi ogni due settimane.',
      impact: 'Una posizione mantenuta durante il reset può ridurre il margine del giorno dopo. Verifica anche le opzioni che cambiano ripartizione, pagamento e leva.',
    },
    'instant-funding': {
      riskFamily: 'Smart drawdown + tempi di pagamento',
      signal: "Su Instant Funding lo smart drawdown si blocca dopo un profitto. Su IF1 il conto dura 24 ore e il trade migliore non può rappresentare una parte troppo grande del profitto totale.",
      impact: 'Istantaneo non significa sempre pagamento immediato: alcuni prodotti richiedono 14 giorni, una soglia di profitto o una regola di consistenza.',
    },
    'trade-the-pool': {
      riskFamily: 'Azioni + profitto valido',
      signal:
        'Le regole includono un volume massimo al minuto per strumento, rapporti di profitto per posizione, un numero minimo di posizioni, minimi di pagamento e controlli di rischio/KYC.',
      impact: 'Sulle azioni il drawdown non è l’unico pericolo: un trade troppo grande su una small cap o un profitto concentrato possono essere invalidati.',
    },
    'funded-trading-plus': {
      riskFamily: 'High-water mark',
      signal: "Il drawdown giornaliero può usare il valore più alto tra saldo ed equity al reset. In alcuni calcoli i prelievi non abbassano l'high-water mark.",
      impact: 'Un prelievo può sembrare mettere al sicuro il conto mentre la soglia di drawdown resta ancorata più in alto.',
    },
    'goat-funded-trader': {
      riskFamily: 'Notizie + limiti alle ricompense',
      signal: "I trade aperti o chiusi entro cinque minuti da notizie ad alto impatto possono avere il profitto limitato. I conti finanziati hanno anche limiti di prelievo iniziali.",
      impact: 'Il trading sulle notizie può essere consentito mentre i guadagni vengono limitati. Leggi la clausola sulla rimozione dei profitti, non solo la dicitura "notizie consentite".',
    },
    'audacity-capital': {
      riskFamily: 'Regole permissive da confermare',
      signal:
        'La pagina pubblicizza un periodo di trading illimitato, perdita giornaliera massima, perdita massima, pagamento in giornata e il permesso per notizie, weekend, EA e copy trading.',
      impact: 'Quando una pagina sembra molto permissiva, verifica nella dashboard e nelle condizioni le definizioni esatte di EA, copy trading e pagamento in giornata.',
    },
    fintokei: {
      riskFamily: 'Rischio aperto + soglia di pagamento',
      signal: 'SwiftTrader indica perdita giornaliera, perdita massima, rischio massimo consentito sui trade aperti e profitto minimo per pagamento.',
      impact: 'Anche con pagamenti rapidi, la regola sul rischio aperto massimo può bloccare strategie multi-posizione o martingale mascherate.',
    },
    'hantec-trader': {
      riskFamily: 'Drawdown statico sul saldo',
      signal:
        'La tabella ufficiale indica per ogni fase un drawdown statico sul saldo, la perdita giornaliera, la perdita totale massima, la frequenza delle ricompense e i giorni minimi di trading.',
      impact: "La parola statico non basta: verifica se la soglia usa il saldo, l'equity o entrambi al momento della violazione.",
    },
    'oneup-trader': {
      riskFamily: 'Drawdown trailing + consistenza',
      signal:
        'Non è indicata una perdita giornaliera, ma valgono un drawdown trailing, almeno 10 giorni di trading e una consistenza: gli altri tre giorni migliori devono sommare almeno l’80% del giorno più grande.',
      impact: 'Senza perdita giornaliera, le trappole principali diventano il drawdown trailing e la concentrazione del profitto in una sola sessione.',
    },
    earn2trade: {
      riskFamily: 'Futures + tasso di superamento',
      signal:
        'Earn2Trade pubblica metriche poco comuni: tasso di superamento, quota di conti live e live-sim, prelievi settimanali da 100 $ e soli mercati futures.',
      impact: "È più trasparente di molti concorrenti, ma il tasso di superamento mostra che il prodotto è una valutazione difficile, non un reddito acquistato.",
    },
    'take-profit-trader': {
      riskFamily: 'Pagamento PRO + costo del conto',
      signal:
        'Il sito mette in evidenza prelievi PRO dal primo giorno, una ripartizione 80/20 poi 90/10 su PRO+, un costo PRO una tantum e un passaggio live PRO+ con le stesse regole di rischio.',
      impact: 'I pagamenti rapidi sono attraenti, ma verifica il percorso da Test a PRO a PRO+, il costo e il drawdown esatto in live.',
    },
    brightfunded: {
      riskFamily: 'Marketing dei pagamenti',
      signal: 'La pagina pubblicizza pagamenti da sette giorni dopo il primo trade finanziato e una ripartizione fino al 100%, a determinate condizioni.',
      impact: 'Leggi bene le condizioni: "fino a" spesso dipende da piano, opzioni, ciclo e regole di consistenza.',
    },
    'aqua-funded': {
      riskFamily: 'Finanziamento istantaneo',
      signal: 'La fonte ufficiale mette in evidenza il finanziamento istantaneo e una ripartizione alta, ma ogni pagina prodotto va verificata piano per piano.',
      impact: "Considera la promessa di istantaneità un'affermazione da verificare: cicli di pagamento, drawdown, rimborsi e regole sulle notizie possono cambiare da conto a conto.",
    },
    'blue-guardian': {
      riskFamily: 'Processo strutturato',
      signal: 'Il sito mette in evidenza valutazioni con regole trasparenti, disciplina, gestione del rischio e pagamenti rapidi.',
      impact: "Prima di comprare, verifica la pagina delle regole esatta per drawdown, notizie, minimi di pagamento e condizioni del finanziamento istantaneo.",
    },
    'breakout-prop': {
      riskFamily: 'Liquidità crypto',
      signal: "Breakout è orientata alle crypto: rileggi la fonte ufficiale per spread, liquidità, regole degli exchange, liquidazione e orari specifici del mercato.",
      impact: 'Una prop firm crypto non va giudicata come una forex: spike, slippage e rischio di liquidazione devono essere chiari prima del pagamento.',
    },
    'the-trading-pit': {
      riskFamily: 'Multi-asset',
      signal: 'La copertura ufficiale è multi-asset. Separa le regole per classe di attivi, perché le challenge su futures e CFD non comportano gli stessi rischi.',
      impact: "Non trasferire una regola da un prodotto all'altro: drawdown, piattaforme, costi e orari di trading possono differire molto.",
    },
    'finotive-funding': {
      riskFamily: 'Istantaneo + challenge',
      signal:
        'La fonte ufficiale è individuata, ma la pagina prodotto deve confermare le clausole dettagliate su perdita giornaliera, perdita massima, rimborsi, pagamenti e restrizioni di trading.',
      impact: 'Nessun acquisto senza una lettura finale finché le condizioni specifiche del prodotto non sono registrate nella scheda PropRadar.',
    },
    myfundedfutures: {
      riskFamily: 'Pagamento futures',
      signal:
        "La fonte ufficiale è individuata, ma i parametri dettagliati di pagamento, attivazione, drawdown e consistenza vanno confermati nel centro assistenza o al checkout.",
      impact: 'Non comprare solo in base al prezzo mensile: costi del conto finanziato, calendario dei pagamenti e drawdown trailing determinano il costo reale.',
    },
    bulenox: {
      riskFamily: 'Drawdown trailing futures',
      signal: "La fonte ufficiale è individuata, ma la scheda deve ancora indicare costi di attivazione, drawdown trailing, minimi di pagamento e regole sui contratti.",
      impact: "Da tenere nella coda d'analisi futures: costi e limiti dopo lo stato finanziato contano più del prezzo della valutazione.",
    },
  },
};

export default rules;
