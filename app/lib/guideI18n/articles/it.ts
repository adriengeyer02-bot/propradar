import type { GuideArticleTranslations } from '../types';

/** Italian translations of the long guide articles (same section order as the English ones). */
const it: GuideArticleTranslations = {
  'prop-firm-sans-challenge': {
    intro: "Una prop firm senza challenge vende direttamente un conto finanziato, senza la classica fase di valutazione. Sembra una scorciatoia. In pratica paghi di più in anticipo per saltare il test, e le regole che avresti incontrato nella challenge si spostano nel conto finanziato, dove un errore costa il conto invece di un nuovo tentativo.",
    sections: [
      {
        heading: 'Cosa significa davvero "senza challenge"',
        paragraphs: [
          "Nel modello classico paghi una quota, raggiungi un obiettivo di profitto entro un limite di perdita giornaliera e un drawdown massimo, a volte in due fasi, e solo dopo operi su un conto finanziato che può pagare. Un programma senza challenge, spesso chiamato finanziamento immediato o diretto, elimina questo primo passaggio: compri il conto finanziato e puoi chiedere pagamenti quando le sue condizioni sono soddisfatte.",
          "Sparisce l'obiettivo di profitto prima del finanziamento. Non sparisce il controllo del rischio. I conti immediati mantengono quasi sempre un drawdown massimo, spesso mobile, e molti aggiungono una regola di consistenza, un numero minimo di giorni di trading o un tetto più basso sul primo pagamento. La società deve comunque filtrare i trader; lo fa solo dopo che hai pagato.",
        ],
      },
      {
        heading: 'Perché il finanziamento immediato costa di solito di più',
        paragraphs: [
          "Le società prezzano la valutazione come un filtro: gran parte di chi compra una challenge non arriva mai a un pagamento, e le sue quote finanziano i trader che ci arrivano. Se salti il filtro, la società inserisce quel rischio nel prezzo del conto. Per questo un conto diretto costa in genere diverse volte una challenge della stessa dimensione, i conti sono più piccoli e il drawdown spesso più stretto.",
          "Confronta il costo totale per arrivare al primo pagamento, non il prezzo di listino. Un esempio con numeri tondi: una challenge da 100 $ con una possibilità su tre di superarla costa in media circa 300 $ per arrivare al finanziamento. Un conto immediato da 350 $ con un trailing drawdown stretto può costare di più se perdi uno o due conti prima del primo pagamento. L'opzione più economica dipende da quanto spesso la tua strategia reggerebbe le regole del conto finanziato.",
        ],
      },
      {
        heading: 'Le regole che decidono se un conto diretto conviene',
        paragraphs: ['Leggi i termini del conto finanziato, non la pagina pubblicitaria. Questi sono i punti che cambiano più spesso i conti:'],
        bullets: [
          'Tipo di drawdown: un trailing drawdown che segue il massimo dell’equity è molto più difficile da gestire di un limite statico fissato sul saldo iniziale.',
          'Regola di consistenza: molti programmi immediati limitano quanto del profitto può venire dal giorno migliore prima di consentire un pagamento.',
          'Condizioni del primo pagamento: giorni minimi di trading, profitto minimo e tetti sui primi uno o due prelievi.',
          'Ripartizione iniziale: alcuni programmi partono più bassi dei modelli con challenge e salgono solo in seguito.',
          'Costo di sostituzione: quanto costa un nuovo conto dopo una violazione e se si applica uno sconto.',
          'Strategie limitate: finestre news, durata delle posizioni, copy trading e durata minima dei trade.',
        ],
      },
      {
        heading: 'A chi conviene una prop firm senza challenge',
        paragraphs: [
          "Il finanziamento diretto ha più senso per un trader con una strategia stabile e a basso drawdown, abituato a rispettare i limiti giornalieri, che dà più valore al tempo che al costo. Ha meno senso per chi sta ancora testando una strategia, per uno stile molto volatile che ha bisogno di spazio, o per chi compra soprattutto per evitare la pressione di un obiettivo di profitto: quella pressione viene sostituita da quella di un drawdown attivo su un conto pagato di più.",
          "Nel dubbio, una challenge 1-Step economica è spesso il test migliore per capire se la tua strategia si adatta alle regole di una società, prima di impegnarti in un conto diretto più caro.",
        ],
      },
      {
        heading: 'Segnali di allarme tipici del finanziamento immediato',
        paragraphs: [
          "I programmi immediati attirano società nuove e molto orientate al marketing, perché sono facili da vendere. Considera segnali di allarme: conti molto grandi a prezzi molto bassi, promesse di pagamento senza una politica di pagamento pubblicata, regole diverse tra homepage e termini, e termini che permettono alla società di negare i pagamenti a sua esclusiva discrezione senza motivo dichiarato. Prima di acquistare, controlla nel profilo PropRadar la società legale, i segnali sui pagamenti ed eventuali allerte su dominio o autorità.",
        ],
      },
    ],
  },
  'prop-firm-sans-consistency-rule': {
    intro: "Una regola di consistenza limita quanto del profitto totale può venire da un solo giorno. Esiste perché un giorno fortunato, una posizione sovradimensionata o un picco sulle news può produrre un pagamento che non dice nulla sulla tua capacità di gestire il conto nel tempo. Capire la formula esatta conta più che trovare una società che dichiara di non averla.",
    sections: [
      {
        heading: 'Come si calcola la regola',
        paragraphs: [
          "La maggior parte delle società usa la stessa formula di base: profitto del giorno migliore diviso profitto totale, in percentuale. Se il risultato supera il limite della società, non sei ancora idoneo, a superare la valutazione o a chiedere un pagamento, a seconda di dove si applica la regola.",
          "Esempio con limite del 50%: guadagni 1.200 $ lunedì, 300 $ martedì e 500 $ mercoledì, quindi 2.000 $ in totale. Il giorno migliore è 1.200 $, cioè il 60% del totale. Sei sopra il limite. Per rimediare non devi perdere nulla: ti serve più profitto totale, qui almeno 2.400 $, così che 1.200 $ rappresentino il 50% o meno.",
          "Alcune società applicano la regola in modo diverso. Topstep, per esempio, nel Trading Combine alza l'obiettivo di profitto invece di farti fallire: se il giorno migliore supera il 55% dell'obiettivo, l'obiettivo diventa giorno migliore diviso 0,55 (centro assistenza Topstep, pagina del 17 settembre 2026).",
        ],
      },
      {
        heading: 'Dove si applica la regola: valutazione, pagamento o entrambi',
        paragraphs: [
          "La stessa percentuale può significare cose molto diverse. Una regola di consistenza in valutazione ritarda solo il superamento. Una regola di consistenza sui pagamenti può bloccare un prelievo dopo che hai già guadagnato su un conto finanziato, il che è molto più frustrante. Alcune società usano anche limiti diversi per fase: Topstep usa il 55% nel Combine e il 40% nel percorso di pagamento Consistency del suo Express Funded Account.",
          "FTMO ha cambiato la sua regola il 12 ottobre 2026: i nuovi ordini della 1-Step Challenge usano una regola di consistenza che confronta il giorno migliore con il profitto totale, giorni in perdita inclusi, mentre i conti da ordini precedenti mantengono la vecchia Best Day Rule, che contava solo i giorni positivi. Secondo FTMO, se non rispetti il requisito continui semplicemente a operare finché non lo rispetti (aggiornamento di trading FTMO dell'8 ottobre 2026). PropRadar non ha rilevato una regola percentuale sul giorno migliore nel programma High Stakes di The5ers. Conferma sempre fase, prodotto e data dell'ordine.",
        ],
      },
      {
        heading: 'Una società senza regola di consistenza è migliore?',
        paragraphs: [
          'Non automaticamente. Le società che eliminano la regola di consistenza di solito controllano il rischio in altro modo: limiti di perdita giornaliera più stretti, trailing drawdown, tetti sui primi pagamenti, giorni minimi di trading o limiti sulla dimensione delle posizioni. Un titolo "nessuna regola di consistenza" può nascondere un conto finanziato più difficile da mantenere.',
          "La regola penalizza soprattutto i trader con risultati a ondate: chi opera sulle news, gli swing trader che chiudono una grande posizione, o chi aumenta la size dopo una serie di perdite. Se i tuoi risultati giornalieri sono abbastanza regolari, un limite del 40-50% raramente pesa. Se fai spesso gran parte della settimana in una sola sessione, cerca programmi senza la regola e confronta cosa la sostituisce.",
        ],
      },
      {
        heading: 'Come operare serenamente con una regola di consistenza',
        paragraphs: [
          "Tieni un calcolo aggiornato di giorno migliore diviso profitto totale e sappi, prima di ogni sessione, quanto puoi guadagnare senza superare il limite. Se hai una grande giornata all'inizio, pianifica diversi giorni positivi più piccoli invece di cercare di ripeterla. Ed evita di aumentare la size verso la fine di una valutazione: un solo giorno vincente sovradimensionato può ritardare il superamento quanto un giorno in perdita.",
        ],
      },
    ],
  },
  'meilleure-prop-firm-2026': {
    intro: "Non esiste una sola migliore prop firm. Esiste la migliore società per il tuo mercato, il tuo stile e il rischio che accetti dall'operatore stesso. Questa classifica parte da quest'ultimo punto: prima di confrontare ripartizioni e sconti, verifica se una società probabilmente ci sarà ancora, e pagherà, quando ne avrai bisogno.",
    sections: [
      {
        heading: 'Come è costruita questa classifica',
        paragraphs: [
          "Ogni società su PropRadar riceve un punteggio su 100 basato su chiarezza delle regole, prove di pagamento, trasparenza legale, segnali pubblici delle recensioni e storia operativa. I link di affiliazione sono dichiarati in ogni profilo e non cambiano mai un punteggio. Una società affiliata mantiene in vista i suoi punti deboli, e una società non affiliata può essere in cima.",
          "A questo aggiornamento i punteggi più alti appartengono a operatori di lunga data: FTMO (91/100), The5ers (85/100) e Topstep (84/100). Non sono i più economici. Sono i profili con la storia pubblica più lunga, i termini più leggibili e meno segnali di pagamento irrisolti negli archivi di PropRadar.",
        ],
      },
      {
        heading: 'Parti dal tuo mercato',
        paragraphs: [
          "Chi opera su forex e CFD e chi opera sui futures non compra nello stesso mercato. Le società forex/CFD come FTMO e The5ers funzionano su piattaforme come MT5 o cTrader con limiti in percentuale. Le società futures come Topstep funzionano su piattaforme futures con limiti in dollari e spesso trailing drawdown. Un'ottima società futures è inutile per un trader forex, quindi filtra prima per mercato.",
        ],
      },
      {
        heading: 'Poi adatta le regole al tuo stile',
        paragraphs: [
          "Le regole che chiudono la maggior parte dei conti non sono gli obiettivi di profitto, ma il tipo di drawdown, il limite di perdita giornaliera, le regole di consistenza, le restrizioni sulle news e le regole di mantenimento. Uno scalper ha bisogno di esecuzione rapida e nessuna durata minima dei trade. Uno swing trader ha bisogno di poter tenere posizioni overnight e nel weekend. Chi opera sulle news ha bisogno di una società che permetta di operare sui dati ad alto impatto anche sul conto finanziato, non solo in valutazione.",
        ],
        bullets: [
          'Drawdown: i limiti statici sono più facili da gestire di quelli mobili.',
          'Consistenza: verifica se si applica alla valutazione, ai pagamenti o a entrambi.',
          'News e mantenimento: conferma le regole del conto finanziato, spesso più severe.',
          'Pagamenti: frequenza, importo minimo, tetti sul primo pagamento e commissioni.',
        ],
      },
      {
        heading: 'Infine confronta il costo reale',
        paragraphs: [
          "Il costo reale di una prop firm è il denaro speso prima del primo pagamento: quote delle challenge, reset, costi di attivazione e conti sostitutivi, meno eventuali rimborsi. Una challenge economica con un drawdown severo può costare più di una costosa che probabilmente supererai. I codici sconto contano per ultimi, quando una società ha superato tutti gli altri filtri.",
        ],
      },
      {
        heading: 'Cosa farebbe scendere una società in questa classifica',
        paragraphs: [
          "I punteggi si muovono quando si muovono le prove: un'allerta di un'autorità, ritardi ripetuti nei pagamenti, un cambio di regole applicato ai conti esistenti, un dominio che smette di servire la società o meno trasparenza sulla società legale. Ogni modifica è datata nello storico della società, così puoi vedere perché e quando è cambiato un punteggio.",
        ],
      },
    ],
  },
  'goat-funded-trader-avis': {
    intro: "GOAT Funded Trader è una delle prop firm più visibili degli ultimi due anni: sconti aggressivi, molti modelli e presenza costante sui social. Visibilità non vuol dire affidabilità. Questa recensione separa ciò che è documentato dal marketing e mette per prime le regole del conto finanziato, perché è lì che i trader perdono i pagamenti.",
    sections: [
      {
        heading: 'Chi gestisce GOAT Funded Trader',
        paragraphs: [
          "GOAT Funded Trader è stata lanciata a maggio 2023. È un nome commerciale di Wishes Tower International Limited, società di Hong Kong, e il trading simulato è fornito da Goat Funded LTD a Saint Lucia. Nessuna autorità finanziaria vigila sul servizio. I termini descrivono conti simulati, acquisti non rimborsabili e ampia discrezionalità sui pagamenti: è comune nel settore, ma va saputo prima di comprare.",
          "PropRadar le assegna 68/100 e la tiene sotto osservazione: il marchio è reale e paga i trader, ma la sua storia è breve e i termini di pagamento lasciano molto spazio all'interpretazione. PropRadar ha un rapporto di affiliazione con GOAT Funded Trader; non cambia questo punteggio né questa recensione.",
        ],
      },
      {
        heading: 'La situazione su Trustpilot',
        paragraphs: [
          "Il 23 ottobre 2026 Trustpilot non mostrava alcun TrustScore per l'azienda. Il profilo indica che il voto non è disponibile per una violazione delle linee guida e che Trustpilot ha rimosso diverse recensioni false. Il profilo elenca ancora 4.352 recensioni, nettamente divise: 46% a cinque stelle e 40% a una stella.",
          "Tratta con prudenza le affermazioni in homepage su un voto quasi perfetto finché quell'avviso resta. Un profilo di recensioni polarizzato di solito indica due esperienze molto diverse: trader pagati rapidamente e trader a cui i pagamenti sono stati negati in base a regole che non avevano letto con attenzione.",
        ],
      },
      {
        heading: 'Le regole del conto finanziato che contano di più',
        paragraphs: [
          "I modelli di challenge sono classici. Il modello 2-Step GOAT chiede 8% poi 6% con perdita giornaliera del 4% e perdita massima statica del 10%; il 2-Step Standard chiede 10% poi 5% con 5% giornaliero e 10% massimo; l'1-Step chiede 10% con perdita giornaliera del 3% e perdita massima statica del 6%. Il modello 3-Step è stato ritirato ad agosto 2026. Questi dati vengono da una recensione di terzi verificata il 5 ottobre 2026: confermali al checkout.",
          'Le regole che decidono i pagamenti iniziano dopo il superamento:',
        ],
        bullets: [
          'Goat Guard: sui conti finanziati 1-Step e 2-Step, una perdita fluttuante del 2% del saldo iniziale riduce la ripartizione al 50%; una seconda attivazione viola il conto.',
          'Regola dei 2 minuti: i profitti dei trade tenuti meno di due minuti vengono tolti al pagamento, mentre le perdite di quei trade restano sul conto.',
          'Finestra news: il profitto realizzato intorno a notizie ad alto impatto è limitato all’1% del saldo iniziale.',
          'Tetto di profitto giornaliero: un conto finanziato può registrare al massimo 3.000 $ di profitto al giorno.',
          'I modelli immediati usano trailing drawdown e chiudono il conto con una perdita fluttuante dell’1% o del 2% a seconda del modello.',
        ],
      },
      {
        heading: 'Pagamenti',
        paragraphs: [
          "La ripartizione standard è dell'80%, con un upgrade a pagamento al 100% al checkout e un piano di scaling che può portarla al 90-95%. La maggior parte dei modelli paga ogni 14 giorni, con un minimo di 100 $ e una commissione del 3%. I primi due pagamenti sono limitati al minore tra il 6% del saldo iniziale e 10.000 $. I metodi di pagamento includono Rise, bonifico, Skrill e cripto, ognuno con il proprio limite.",
          "Diverse affermazioni pubbliche contraddicono il centro assistenza, per esempio sulla velocità di pagamento (24 ore contro 2 giorni lavorativi) e sulla dimensione massima del conto. Quando marketing e termini non coincidono, al tuo pagamento si applicano i termini.",
        ],
      },
      {
        heading: 'Per chi è adatta GOAT Funded Trader',
        paragraphs: [
          "Può funzionare per un trader disciplinato con perdite fluttuanti piccole e controllate, posizioni tenute ben oltre due minuti e nessuna dipendenza dai picchi sulle news, che vuole un ingresso economico. È poco adatta a scalper, trader sulle news e a chi lascia respirare i trade attraverso ampi drawdown intraday, perché le regole del conto finanziato colpiscono proprio questi comportamenti. Se la chiarezza delle regole conta più del prezzo, confrontala prima con le società con punteggio più alto nella nostra classifica.",
        ],
      },
    ],
  },
  'topstep-review': {
    intro: "Topstep è il nome più antico del prop trading sui futures: fondata nel 2012 a Chicago da Michael Patak, gestiva il suo Trading Combine anni prima dell'attuale ondata di prop firm. Questa storia è il suo punto di forza principale. I punti deboli sono un'offerta solo futures, frequenti cambi di regole da fine 2025 e un limite di perdita mobile che richiede disciplina.",
    sections: [
      {
        heading: 'Topstep è affidabile?',
        paragraphs: [
          "Topstep è un operatore statunitense consolidato, con una lunga storia pubblica, un centro assistenza pubblicato e un introducing broker affiliato, Topstep Brokerage, lanciato all'inizio del 2026. PropRadar le assegna 84/100 e non ha registrato avvisi di autorità contro di essa. Come per ogni prop firm, la valutazione e l'Express Funded Account sono simulati: i pagamenti sono premi pagati da Topstep, non profitti di trading da un conto di intermediazione.",
          "Su Trustpilot il profilo mostra un TrustScore di 3,7 su 14.955 recensioni, con l'avviso di Trustpilot che l'azienda potrebbe essere associata a investimenti ad alto rischio (verificato il 23 ottobre 2026). Il voto è nella media della categoria. Le lamentele di fine 2025 riguardavano interruzioni della piattaforma TopstepX e ordini stop non eseguiti.",
        ],
      },
      {
        heading: 'Come funziona il Trading Combine',
        paragraphs: [
          "Il Trading Combine è la valutazione di Topstep. È disponibile nelle dimensioni 50K, 100K e 150K, con obiettivi di profitto di 3.000 $, 6.000 $ e 9.000 $. Non ci sono limiti di tempo né un numero minimo di giorni di trading. Le posizioni devono essere chiuse entro fine sessione: Topstep non consente posizioni overnight o nel weekend.",
          "Il Maximum Loss Limit (MLL) è di 2.000 $, 3.000 $ o 4.500 $ sotto il saldo iniziale a seconda della dimensione. Sale con il saldo di fine giornata e non scende mai, ma le violazioni sono monitorate in tempo reale, perdite non realizzate comprese. Nel Combine smette di salire quando raggiunge il saldo iniziale (centro assistenza Topstep, aggiornato il 18 settembre 2026).",
          "L'obiettivo di consistenza è del 55%: il giorno migliore non può superare il 55% dell'obiettivo di profitto. Se lo supera non fallisci; l'obiettivo sale a giorno migliore diviso 0,55 (centro assistenza, 17 settembre 2026). Un limite di perdita giornaliera opzionale di 1.000 $, 2.000 $ o 3.000 $ ferma il trading per la sessione senza chiudere il conto.",
        ],
      },
      {
        heading: 'Express Funded Account e pagamenti',
        paragraphs: [
          "Dopo il superamento operi su un Express Funded Account (XFA), sempre simulato, dove iniziano i pagamenti. L'XFA parte da un saldo di 0 $ con lo stesso margine MLL sotto. Da febbraio 2026 scegli tra due percorsi di pagamento, e la scelta è definitiva: il percorso Standard richiede cinque giorni vincenti di almeno 150 $ prima di ogni pagamento, mentre il percorso Consistency richiede tre giorni di trading con il giorno più grande al massimo al 40% del profitto netto.",
          "I trader iscritti dal 12 gennaio 2026 ricevono il 90% dei pagamenti approvati; quelli iscritti prima tengono il 100% dei primi 10.000 $, poi il 90%. La richiesta minima di pagamento è di 125 $. Dopo il primo pagamento il MLL viene portato a 0 $, eliminando il margine: una sola giornata negativa dopo il prelievo può chiudere il conto. I migliori trader possono essere invitati a un Live Funded Account con capitale reale, limiti di perdita giornaliera obbligatori e una riserva rilasciata a tappe.",
        ],
      },
      {
        heading: 'Pro e contro',
        paragraphs: ['Cosa emerge dalla lettura delle regole attuali:'],
        bullets: [
          'Pro: la storia più lunga nel prop trading sui futures e un centro assistenza ampio e documentato.',
          'Pro: nessun limite di tempo né giorni minimi nel Combine; la regola di consistenza alza l’obiettivo invece di farti fallire.',
          'Pro: ripartizione del 90% dal primo dollaro per i nuovi trader e un minimo di pagamento basso di 125 $.',
          'Contro: solo futures, e ogni posizione deve essere chiusa entro fine sessione.',
          'Contro: il MLL torna a 0 $ dopo il primo pagamento, quindi prelevare presto elimina il margine di sicurezza.',
          'Contro: le regole sono cambiate più volte tra novembre 2025 e aprile 2026; rileggile prima di ogni acquisto.',
        ],
      },
      {
        heading: 'Per chi è adatta Topstep',
        paragraphs: [
          "Topstep è adatta ai trader intraday sui futures che vogliono un operatore consolidato e accettano un limite mobile monitorato in tempo reale. Non è adatta a chi opera su forex o CFD, agli swing trader che tengono posizioni overnight o a chi sceglie soprattutto in base al prezzo: con l'abbonamento mensile una valutazione lenta costa più che dai concorrenti con quota unica. Se la confronti con Apex, leggi la nostra guida Topstep vs Apex, che confronta ogni versione di conto regola per regola.",
        ],
      },
    ],
  },
  'prop-firm-drawdown': {
    intro: 'Il drawdown è la regola che chiude la maggior parte dei conti delle prop firm. È la perdita massima consentita al conto, misurata da un punto di riferimento. Due società possono pubblicizzare entrambe un "drawdown di 3.000 $" su un conto da 50.000 $ e darti margini completamente diversi, perché il punto di riferimento si muove in modo diverso.',
    sections: [
      {
        heading: 'Limite di perdita giornaliera e drawdown massimo',
        paragraphs: [
          "La maggior parte delle società usa due limiti insieme. Il limite di perdita giornaliera limita quanto puoi perdere in un giorno di trading, di solito misurato dal saldo o dall'equity di inizio giornata. Il drawdown massimo limita la perdita totale per tutta la vita del conto. Superare uno dei due di solito viola il conto, anche se alcune società futures ti fermano solo per il resto della sessione quando tocchi il limite giornaliero.",
        ],
      },
      {
        heading: 'Drawdown statico',
        paragraphs: [
          "Un drawdown statico è fissato a un livello sotto il saldo iniziale e non si muove mai. Su un conto da 100.000 $ con limite statico del 10%, la soglia è 90.000 $ per sempre. Se porti il conto a 108.000 $, hai 18.000 $ di margine. È il modello più tollerante ed è comune nelle challenge forex/CFD in due fasi.",
        ],
      },
      {
        heading: 'Trailing drawdown (intraday)',
        paragraphs: [
          "Un trailing drawdown intraday segue in tempo reale il tuo equity più alto, profitti non realizzati compresi. Esempio su un conto da 50.000 $ con limite trailing di 2.500 $: la soglia parte da 47.500 $. Un trade arriva a +1.500 $ non realizzati, quindi la soglia sale a 49.000 $, anche se poi chiudi il trade in pareggio. Ora hai 1.000 $ di margine invece di 2.500 $, senza aver incassato un centesimo. È il modello più severo ed è comune su futures e conti a finanziamento immediato.",
        ],
      },
      {
        heading: 'Trailing drawdown di fine giornata (EOD)',
        paragraphs: [
          "Un trailing drawdown di fine giornata si muove solo alla chiusura della giornata di trading, in base al saldo di chiusura. Le oscillazioni intraday dei profitti aperti non alzano la soglia, il che lo rende molto più gestibile del trailing intraday. Un dettaglio che molti trascurano: la soglia si muove solo alla chiusura, ma la violazione è spesso controllata comunque in tempo reale. Topstep, per esempio, fa salire il suo Maximum Loss Limit dal saldo di fine giornata ma lo monitora in tempo reale, perdite non realizzate comprese.",
        ],
      },
      {
        heading: 'Quando il trailing si ferma: il blocco',
        paragraphs: [
          "La maggior parte dei modelli trailing smette di salire a un certo punto, di solito quando la soglia raggiunge il saldo iniziale (o il saldo iniziale più un piccolo margine). Da quel momento il limite si comporta come uno statico. Per questo i primi giorni di un conto trailing sono i più pericolosi: costruisci il margine fino al livello di blocco prima di aprire posizioni più grandi.",
        ],
      },
      {
        heading: "Limiti sul saldo o sull'equity",
        paragraphs: [
          "Un limite sul saldo conta solo i trade chiusi. Un limite sull'equity conta anche le posizioni aperte, quindi una perdita fluttuante può violare il conto anche se più tardi avresti chiuso il trade in profitto. La maggior parte delle società moderne misura le violazioni sull'equity. Leggi la definizione nei termini, non nella tabella riassuntiva.",
        ],
      },
      {
        heading: 'Come scegliere',
        paragraphs: ['Adatta il modello di drawdown al comportamento dei tuoi trade:'],
        bullets: [
          'Trade che spesso vanno molto in profitto prima di tornare indietro: evita il trailing intraday, preferisci statico o EOD.',
          'Scalp piccoli e frequenti con stop stretti: un limite trailing è gestibile se il livello di blocco si raggiunge in fretta.',
          'Swing trade con stop ampi: ti serve un limite statico e un margine più grande della tua perdita aperta tipica.',
          'Dimensiona sempre le posizioni sul margine residuo fino alla soglia, non sulla dimensione pubblicizzata del conto.',
        ],
      },
    ],
  },
};

export default it;
