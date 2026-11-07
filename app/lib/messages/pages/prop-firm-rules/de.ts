import type { RulesMessages } from './en';

const rules: RulesMessages = {
  metaTitle: 'Prop-Firm-Regeln: Drawdown, Auszahlungen und Handelsrisiken',
  metaDescription:
    'Vergleichen Sie heikle Prop-Firm-Regeln zu Drawdown, News-Trading, Auszahlungen, Konsistenz, EAs, Copy-Trading und verbotenen Strategien.',
  schemaName: 'Regelprüfungen von Prop Firms',
  breadcrumb: 'Handelsregeln',
  eyebrow: 'Tiefe Regelprüfung',
  h1: 'Klauseln, die ein Konto oder eine Auszahlung kosten können.',
  lead: 'PropRadar liest Regelseiten, Hilfecenter und die Bedingungen der Hauptprodukte, um gefährliche Klauseln herauszufiltern: Drawdown, Rollover, News, EA, Copy-Trading, Konsistenz, Auszahlungsobergrenzen und Sanktionen.',
  reviewed: 'Seite geprüft am {date}. Jede Prüfung behält ihr eigenes, sichtbares Datum der Quellenprüfung.',
  statDeep: 'Tiefe Prüfungen',
  statClauses: 'Extrahierte Klauseln ({critical} kritisch)',
  statCompact: 'Mittlere und kleine Firmen ({critical} kritisch)',
  statTracked: 'Erfasste Firmen',
  coverageAria: 'Abdeckung der Regelprüfung',
  statRuleFiles: 'Regelakten',
  statPayoutSensitive: 'Auszahlungsrelevante Akten',
  statLegalWatch: 'Rechtliche Beobachtung',
  statDeepSources: '5+ Quellen',
  related: 'Passende Ratgeber:',
  relatedConsistency: 'Konsistenzregel',
  relatedNews: 'News-Trading',
  statsAria: 'Regelstatistik',
  families: [
    { label: 'Konto geschlossen', title: 'Drawdown & Equity', text: 'Die eigentliche Gefahr sind meist offene Equity, Rollover, Swaps und der Server-Reset.' },
    { label: 'Gewinn gestrichen', title: 'News & Rollover', text: 'Manche Plattformen lassen den Trade technisch zu, streichen aber die Gewinne oder werten ihn als Verstoß.' },
    { label: 'Konto gesperrt', title: 'EA, HFT, Copy-Trading', text: 'Ein für das Risikomanagement erlaubter EA kann trotzdem verboten sein, wenn er selbstständig handelt, Konten kopiert oder den Server überlastet.' },
    { label: 'Auszahlung verzögert', title: 'Auszahlung & Konsistenz', text: 'Regeln zum besten Tag, Auszahlungsobergrenzen, Gewinntage und Auszahlungszyklen können wichtiger sein als die beworbene Gewinnbeteiligung.' },
  ],
  alertsEyebrow: 'Hinweise für Trader',
  alertsTitle: 'Was Marketingseiten nicht laut genug sagen.',
  viewAudit: 'Quellenprüfung ansehen',
  proofAria: 'Belege der Regelprüfung von {name}',
  payoutChip: 'Auszahlung {level}',
  legalChip: 'Rechtlich {level}',
  sourceDeep: 'Viele Quellen',
  sourceUsable: 'Brauchbare Quellen',
  sourceThin: 'Wenige Quellen',
  sourceNone: 'Keine Quellen',
  severity: { Faible: 'Niedrig', Moyen: 'Mittel', 'Élevé': 'Hoch', Critique: 'Kritisch' },
  proof: {
    'Source officielle lue': 'Offizielle Quelle gelesen',
    'Source officielle partielle': 'Offizielle Quelle, teilweise',
    'Source commerciale repérée': 'Werbeseite gefunden',
  },
  sourceChecked: 'Quelle geprüft am {date}',
  compactEyebrow: 'Mittlere & kleine Firmen',
  compactTitle: 'Der lange Schwanz wird Firma für Firma gelesen.',
  compactNote: 'Diese kurzen Hinweise stammen aus offiziellen Quellen oder gefundenen Produktseiten. Unvollständige Akten bleiben bewusst als solche markiert.',
  fullEyebrow: 'Vollständige Abdeckung',
  fullTitle: 'Alle anderen Prop Firms bleiben in der Prüfwarteschlange.',
  fullNote: 'PropRadar hält kleinere Firmen sichtbar, um blinde Flecken zu vermeiden: gefundene Quelle, Risikoarchiv oder Akte, die noch belegt werden muss.',
  showQueue: 'Die {count} Firmen in der Prüfwarteschlange anzeigen',
  productToIdentify: 'Produkt noch zu bestimmen',
  mainProductToIdentify: 'Hauptprodukt noch zu bestimmen',
  coverageArchive: 'Risikoarchiv',
  coverageMulti: 'Akte mit mehreren Quellen',
  coverageSpotted: 'Quelle gefunden',
  coverageToSource: 'Noch zu belegen',
  nextEyebrow: 'Nächste Tiefenprüfung',
  nextTitle: 'Die nächsten Hauptprodukte, die zerlegt werden.',
  colDrawdown: 'Drawdown',
  colNews: 'News',
  colEa: 'EA',
  colPayout: 'Auszahlung',
  colScore: 'Score',
  scoreAria: 'PropRadar-Score {score} von 100',
  matrixEyebrow: 'Schnellübersicht',
  matrixTitle: 'Aktive Firmen nach Auszahlungsrisiko geordnet.',
  showMatrix: 'Die {count} aktiven Firmen nach Auszahlungsrisiko anzeigen',
  scoreLine: 'Score {score}/100',
  audits: {
    ftmo: {
      headline: 'Das Hauptrisiko kommt aus Equity-Berechnungen und verbotenen Praktiken.',
      verdict:
        'FTMO ist gut lesbar, aber streng: Tagesverlust auf Equity-Basis, nachlaufender Tagesend-Drawdown beim 1-Step, eine Best Day Rule und weitreichende Einschränkungen bei Gap-Trading, HFT, verbundenen Konten und Umgehung.',
      clauses: [
        {
          title: 'Der Tagesverlust schließt offene Equity ein',
          finding: 'Der Tagesverlust umfasst Kontostand, offene Positionen, Swaps und Provisionen. Eine offene Position kann die Regel verletzen, bevor sie geschlossen ist.',
          impact: 'Beobachten Sie nie nur den Kontostand. Ein Docht, ein ausgeweiteter Spread oder ein Swap kann das Konto bereits kosten.',
        },
        {
          title: 'Best Day / Konsistenzregel beim 1-Step und FTMO Account',
          finding:
            'Bei Konten aus Bestellungen vor dem 12. Oktober 2026 darf der beste Tag 50 % der positiven Gewinne nicht überschreiten. Neue 1-Step-Bestellungen nutzen eine Konsistenzregel, die den besten Tag mit dem Gesamtgewinn vergleicht, Verlusttage eingeschlossen. Beides ist kein Verstoß, kann aber den Fortschritt oder eine Belohnung blockieren, bis das Verhältnis korrigiert ist.',
          impact: 'Ein einziger großer Gewinntrade kann Sie zwingen, weiterzuhandeln, um das Konto freizuschalten, also mehr Risiko einzugehen.',
        },
        {
          title: 'Weit gefasste Klauseln zu verbotenen Praktiken',
          finding:
            'Gap-Trading, Latenz, sehr hohe Geschwindigkeit, koordinierte Konten, Kontorotation, einseitige Wetten und hyperaktive EAs können zu Disqualifikation, gelöschten Trades, verlorenen Belohnungen oder Kündigung führen.',
          impact: 'Strategien zum „Austricksen“ der Challenge und kopierte Multi-Konto-Setups sind die eigentliche Gefahr, selbst wenn der öffentliche Score hervorragend ist.',
        },
      ],
    },
    the5ers: {
      headline: 'Der tägliche Drawdown ist tückischer, als er aussieht.',
      verdict:
        'The5ers High Stakes wirkt auf dem Papier sauber, aber der tägliche Drawdown richtet sich nach dem höheren Wert aus Vortages-Kontostand und Equity. Ein über den Rollover gehaltener Trade kann die verfügbare Marge stark verringern.',
      clauses: [
        {
          title: 'Der tägliche Drawdown nimmt den höheren Wert aus Kontostand und Equity',
          finding: 'Der tägliche Drawdown von 5 % wird um Mitternacht Serverzeit aus Schluss-Equity oder Kontostand des Vortags festgelegt, je nachdem, welcher Wert höher ist.',
          impact: 'Wer den Tag mit hoher Equity beendet, hebt die Schwelle für den nächsten Tag an. Eine gehaltene Position kann das Konto früher schließen als erwartet.',
        },
        {
          title: '30-Tage-Inaktivitätsregel',
          finding: 'Konten verfallen nach mehr als 30 aufeinanderfolgenden Tagen ohne Handelsaktivität, gezählt ab der Registrierung.',
          impact: 'Eine für später gekaufte Challenge kann zum Totalverlust werden, wenn sie ungenutzt bleibt.',
        },
        {
          title: 'Auszahlung alle zwei Wochen',
          finding: 'Nach Erreichen des finanzierten Status sind Auszahlungen alle zwei Wochen über das Dashboard möglich.',
          impact: 'Der Geldfluss ist nicht sofort da. Vergleichen Sie also nicht nur Gewinnbeteiligung und Challenge-Preis.',
        },
      ],
    },
    fundednext: {
      headline: 'Zahlreiche Anti-Missbrauchsregeln können Gewinne streichen, bevor das Konto geschlossen wird.',
      verdict:
        'FundedNext ist gut dokumentiert, aber die Anti-Missbrauchsgrenzen sind umfangreich: Risikoobergrenze, Margin-Obergrenze, Quick Strike, Hyperaktivität, Settlement-Trading, Copy-Trading und kontoübergreifendes Hedging.',
      clauses: [
        {
          title: 'Maximal 3 % Risiko und 70 % Margin',
          finding:
            'FundedNext begrenzt das Risiko jederzeit auf 3 % und die kumulierte Margin auf 70 %. Ein erster Verstoß kann eine Verwarnung und die Streichung der mit dem Trade verbundenen Gewinne auslösen.',
          impact: 'Gewinne können gestrichen werden, wenn die Positionsgröße den Rahmen verlässt, auch ohne sofortige Kontoschließung.',
        },
        {
          title: 'Quick Strike und Trades unter 30 Sekunden',
          finding:
            'Trades, die in weniger als 30 Sekunden geschlossen werden, werden überwacht. Ab 30 % Quick-Strike-Gewinn kann das finanzierte Konto gekündigt und die betroffenen Gewinne gestrichen werden.',
          impact: 'Extrem kurzes Scalping kann eine starke Leistung in eine verweigerte Auszahlung verwandeln.',
        },
        {
          title: 'Kumulierte Hyperaktivität über mehrere Konten',
          finding:
            'Zweihundert Trades oder 2.000 Servernachrichten pro Tag lösen Verwarnungen aus; 15.000 Nachrichten können das Konto deaktivieren. Verwarnungen können sich über Konten hinweg summieren.',
          impact: 'Ein EA oder ein zu aktives Ordermanagement kann das Konto kosten, auch ohne böse Absicht.',
        },
      ],
    },
    topstep: {
      headline: 'Die Hauptfallen sind Konsistenz, Auszahlungsobergrenzen und fünf Gewinntage.',
      verdict: 'Topstep ist etabliert und gut lesbar, aber Fortschritt und Auszahlungen hängen von mehr als dem Bruttogewinn ab.',
      clauses: [
        {
          title: 'Konsistenzziel 50 %',
          finding: 'Der beste Tag muss unter 50 % des Gewinnziels bleiben. Wird das überschritten, steigt das Gewinnziel, und Verluste setzen den besten Tag nicht zurück.',
          impact: 'Ein einziger großer Gewinntag kann den finanzierten Status verzögern, selbst nachdem der Zielbetrag erreicht ist.',
        },
        {
          title: 'XFA-Auszahlungsobergrenzen',
          finding:
            'Auszahlungen aus dem Express Funded Account sind pro Antrag und nach Kontogröße begrenzt. Die Obergrenze kann vom Standard- oder Konsistenzweg und der DLL-Option abhängen.',
          impact: 'Ein großer Gewinn garantiert keine sofortige Auszahlung in gleicher Höhe.',
        },
        {
          title: 'Ein-Profil-Regel',
          finding: 'Alle Konten müssen unter einem einzigen Topstep-Profil bleiben. Mehrere Profile können zur Schließung oder Sperrung führen.',
          impact: 'Ein doppeltes Konto oder ein Fehler bei der Registrierung kann zu einem echten operativen Risiko werden.',
        },
      ],
    },
    'apex-trader-funding': {
      headline: 'Apex hat sein Angebot stark verändert: Altkonten und neue Konten getrennt betrachten.',
      verdict:
        'Das neuere Apex-Angebot betont Tagesend-Drawdown, keine verweigerten Auszahlungen, 50 % Konsistenz und keine wiederkehrende Abrechnung bei neuen Produkten. Altkonten bleiben ein eigenes System.',
      clauses: [
        {
          title: 'Neue Produkte und Altkonten',
          finding: 'Apex gibt an, dass Altkonten nicht mehr verkauft, nicht rückwirkend geändert werden und bis zur Kündigung wiederkehrend abgerechnet werden können.',
          impact: 'Prüfen Sie vor dem Vergleich von Apex-Bewertungen oder Rabatten, ob die Quelle ein Alt- oder ein aktuelles Produkt behandelt.',
        },
        {
          title: '5 Handelstage zwischen Belohnungen',
          finding: 'Die offizielle Seite nennt fünf Handelstage für Auszahlungen und Belohnungen im aktuellen Weg.',
          impact: 'Auch nach schnellem Fortschritt hängt das Auszahlungstempo vom Handelstage-Zyklus ab.',
        },
        {
          title: '50 % Konsistenz',
          finding: 'Das neuere Angebot zeigt eine Konsistenzregel von 50 %.',
          impact: 'Ein einziger großer Tag kann je nach Konto die Auszahlung oder den Fortschritt begrenzen.',
        },
      ],
    },
    'e8-markets': {
      headline: 'E8 ist sehr detailliert, aber manche Regeln streichen Gewinne, ohne das Konto zu schließen.',
      verdict:
        'E8 Markets dokumentiert täglichen Drawdown, Gewinnobergrenzen, News, HFT, EAs und Best-Day-Regeln. Das Hauptrisiko für Trader sind Gewinne, die beim Rollover oder bei der Auszahlung gestrichen werden.',
      clauses: [
        {
          title: 'Täglicher Drawdown mit endgültiger Schließung',
          finding:
            'Der tägliche Drawdown ist ein fester Betrag auf Basis des Anfangskontostands. Berührt Equity oder Kontostand die Verlustgrenze, wird das Konto endgültig geschlossen, auch wenn die technische Schließung darüber endet.',
          impact: 'Die Schlussposition kann über der Schwelle liegen, während das Konto trotzdem verloren ist, weil der serverseitig erfasste Verstoß Vorrang hat.',
        },
        {
          title: 'Tägliche Gewinnobergrenze 2 %',
          finding:
            'Bei E8 Pro zählen Gewinne über der Tagesobergrenze nicht und werden nach dem Rollover gestrichen. Umgehungsversuche über Hedging oder Teilschließungen können zusammengefasst werden.',
          impact: 'Ein außergewöhnlicher Tag kann teilweise aus dem anrechenbaren Ergebnis entfernt werden.',
        },
        {
          title: 'News-Trading auf Performance-Konten von E8 One',
          finding:
            'Auf Performance-Konten von E8 One ist das Öffnen, Schließen oder Ändern von SL/TP innerhalb von fünf Minuten um wichtige Nachrichten verboten, und Gewinne können gestrichen werden.',
          impact: 'Die Plattform kann die Aktion technisch zulassen, während der Gewinn später bei der Auszahlung gestrichen wird.',
        },
      ],
    },
    'funding-pips': {
      headline: 'Verstöße entstehen oft durch Equity, Rollover und ausgeweitete Spreads.',
      verdict:
        'FundingPips erklärt klar, dass die Grenzen serverseitig in Echtzeit überwacht werden. Die teuersten Fehler betreffen enge Stops, den Rollover um 17 Uhr New Yorker Zeit und offene Positionen während Nachrichten.',
      clauses: [
        {
          title: 'Equity-Überwachung in Echtzeit',
          finding: 'Tages- und Maximalverlust überwachen die Live-Equity. Maßgeblich ist der Servereintrag, auch wenn Terminal oder Dashboard verzögert sind.',
          impact: 'Eine offene Position kann das Konto schließen, bevor die lokale Anzeige den Verstoß erkennen lässt.',
        },
        {
          title: 'Rollover um 17 Uhr New Yorker Zeit',
          finding: 'FundingPips warnt, dass sich die Spreads um 17 Uhr New Yorker Zeit stark ausweiten können, was Stops und Verstöße auslöst.',
          impact: 'Ein Stop, der im Bid-Chart sicher aussieht, kann während des Rollovers vom Ask getroffen werden.',
        },
        {
          title: 'Belohnungsantrag nur mit geschlossenen Trades',
          finding: 'Der Belohnungszyklus verlangt, Positionen zu schließen, 15 Minuten zu warten und dann die Gewinnbeteiligung zu beantragen.',
          impact: 'Offene Positionen und Übernachtgebühren können den Sicherheitsabstand zum falschen Zeitpunkt verringern.',
        },
      ],
    },
    'alpha-capital-group': {
      headline: 'Die Hauptgefahr: News-Beschränkungen, nicht genehmigte EAs und Anti-Glücksspiel-Regeln.',
      verdict:
        'Alpha Capital erlaubt manche Nutzungen, aber die Regeln nach der Qualifikation sind heikel bei News-Fenstern, IP-Adressen, vorab genehmigten EAs und als Glücksspiel eingestuftem Verhalten.',
      clauses: [
        {
          title: 'News: Öffnen und Schließen je nach Plan eingeschränkt',
          finding:
            'Nach der Qualifikation verbieten manche Pläne das Öffnen oder Schließen zwei oder fünf Minuten um wichtige Nachrichten. Selbst ein im Fenster ausgelöster TP oder SL kann ein leichter Verstoß sein.',
          impact: 'Eine Position kann rechtmäßig gehalten werden, während ein zur falschen Zeit erreichter Take-Profit den Gewinn unzulässig macht.',
        },
        {
          title: 'EAs nur für das Risikomanagement',
          finding: 'Autonome EAs, Bots von Dritten, HFT, Latenzarbitrage oder geteilte EAs mit identischen Trades können zur Kontoschließung führen.',
          impact: 'Ein erlaubter EA bedeutet keinen unbegrenzten automatisierten Handel. Klären Sie Einsatzzweck, Plattform und Genehmigungspflicht.',
        },
        {
          title: 'IP- und Haushaltsbeschränkungen',
          finding: 'Derselbe Haushalt, mehrere IPs, nicht angegebene VPN/VPS-Nutzung oder widersprüchliche Ortswechsel können einen Verstoß oder eine Sicherheitsprüfung auslösen.',
          impact: 'Reisen, eine Wohngemeinschaft, ein weiterer Trader in der Familie oder ein schlecht angegebener VPS können zum Compliance-Problem werden.',
        },
      ],
    },
  },
  compact: {
    'funding-traders': {
      riskFamily: 'Auszahlung + Konsistenz',
      signal:
        'Die Tabellen zeigen unterschiedliche Tagesverluste, Maximalverluste, Risiken pro Trade, Konsistenzregeln und Auszahlungspläne für Instant Funded, 1-Step und 2-Step.',
      impact:
        'Vergleichen Sie vor dem Kauf mehr als den Preis: Prüfen Sie das genaue Produkt, den Auszahlungszyklus von 14 oder 21 Tagen und den Konsistenzwert, der eine Auszahlung blockieren kann.',
    },
    'maven-trading': {
      riskFamily: 'Drawdown + Erstattung',
      signal:
        'Die offizielle Seite trennt Tagesverlust, Maximalverlust, Gewinnziele und Auszahlungshäufigkeit und gibt an, dass manche Gebühren bei der dritten Auszahlung erstattet werden.',
      impact: 'Die tatsächlichen Kosten hängen davon ab, wie viele Auszahlungen erreicht werden. Ein niedriger Einstiegspreis kann wenig wert sein, wenn das gewählte Programm wenig Drawdown-Spielraum lässt.',
    },
    fxify: {
      riskFamily: 'Täglicher Drawdown',
      signal: 'Der tägliche Drawdown kann auf dem Tagesend-Kontostand des Vortags beruhen. Die erste Auszahlung wird als auf Anfrage dargestellt, danach alle zwei Wochen.',
      impact: 'Eine über den Reset gehaltene Position kann den Spielraum des nächsten Tages verringern. Prüfen Sie auch Zusatzoptionen, die Gewinnbeteiligung, Auszahlung und Hebel ändern.',
    },
    'instant-funding': {
      riskFamily: 'Smart Drawdown + Auszahlungszeitpunkt',
      signal: 'Bei Instant Funding wird der Smart Drawdown nach einem Gewinn fixiert. Bei IF1 läuft das Konto 24 Stunden, und der beste Trade darf keinen zu großen Anteil am Gesamtgewinn haben.',
      impact: 'Sofort heißt nicht immer sofortige Auszahlung: Manche Produkte verlangen 14 Tage, eine Gewinnschwelle oder eine Konsistenzregel.',
    },
    'trade-the-pool': {
      riskFamily: 'Aktien + gültiger Gewinn',
      signal:
        'Die Regeln umfassen ein maximales Volumen pro Minute je Instrument, Gewinnquoten pro Position, eine Mindestzahl an Positionen, Mindestauszahlungen und Risiko-/KYC-Prüfungen.',
      impact: 'Bei Aktien ist der Drawdown nicht die einzige Gefahr: Ein zu großer Small-Cap-Trade oder ein konzentrierter Gewinn kann für ungültig erklärt werden.',
    },
    'funded-trading-plus': {
      riskFamily: 'High-Water-Mark',
      signal: 'Der tägliche Drawdown kann beim Reset den höheren Wert aus Kontostand und Equity verwenden. Auszahlungen senken die High-Water-Mark in manchen Berechnungen nicht.',
      impact: 'Eine Auszahlung kann so wirken, als sichere sie das Konto ab, während die Drawdown-Schwelle höher verankert bleibt.',
    },
    'goat-funded-trader': {
      riskFamily: 'News + Belohnungsobergrenzen',
      signal: 'Bei Trades, die innerhalb von fünf Minuten um wichtige Nachrichten eröffnet oder geschlossen werden, kann der Gewinn begrenzt werden. Finanzierte Konten haben zudem anfängliche Auszahlungsgrenzen.',
      impact: 'News-Trading kann erlaubt sein, während die Gewinne gedeckelt werden. Lesen Sie die Klausel zur Gewinnstreichung, nicht nur den Hinweis „News erlaubt“.',
    },
    'audacity-capital': {
      riskFamily: 'Großzügige Regeln, zu bestätigen',
      signal:
        'Die Seite wirbt mit unbegrenzter Handelsdauer, maximalem Tagesverlust, Maximalverlust, Auszahlung am selben Tag und der Erlaubnis für News, Wochenende, EA und Copy-Trading.',
      impact: 'Wenn eine Seite sehr großzügig wirkt, prüfen Sie im Dashboard und in den Bedingungen die genauen Definitionen von EA, Copy-Trading und Auszahlung am selben Tag.',
    },
    fintokei: {
      riskFamily: 'Offenes Risiko + Auszahlungsschwelle',
      signal: 'SwiftTrader nennt Tagesverlust, Maximalverlust, das maximal erlaubte Risiko offener Trades und den Mindestgewinn pro Auszahlung.',
      impact: 'Auch bei schnellen Auszahlungen kann die Regel zum maximalen offenen Risiko Strategien mit mehreren Positionen oder verdeckte Martingale-Setups blockieren.',
    },
    'hantec-trader': {
      riskFamily: 'Statischer Drawdown auf den Kontostand',
      signal:
        'Die offizielle Tabelle nennt für jede Stufe einen statischen Drawdown auf den Kontostand, den Tagesverlust, den maximalen Gesamtverlust, die Belohnungshäufigkeit und die Mindesthandelstage.',
      impact: 'Das Wort statisch reicht nicht: Prüfen Sie, ob die Schwelle im Moment des Verstoßes Kontostand, Equity oder beides nutzt.',
    },
    'oneup-trader': {
      riskFamily: 'Nachlaufender Drawdown + Konsistenz',
      signal:
        'Es wird kein Tagesverlust angezeigt, aber ein nachlaufender Drawdown, mindestens 10 Handelstage und eine Konsistenzregel gelten: Die drei anderen besten Tage müssen zusammen mindestens 80 % des größten Tages ergeben.',
      impact: 'Ohne Tagesverlust werden der nachlaufende Drawdown und die Konzentration des Gewinns auf eine Sitzung zu den Hauptfallen.',
    },
    earn2trade: {
      riskFamily: 'Futures + Bestehensquote',
      signal:
        'Earn2Trade veröffentlicht ungewöhnliche Kennzahlen: Bestehensquote, Anteil von Live- und Live-Sim-Konten, wöchentliche Auszahlungen ab 100 $ und ausschließlich Futures-Märkte.',
      impact: 'Das ist transparenter als bei vielen Wettbewerbern, aber die Bestehensquote zeigt, dass das Produkt eine schwierige Prüfung ist und kein gekauftes Einkommen.',
    },
    'take-profit-trader': {
      riskFamily: 'PRO-Auszahlung + Kontogebühr',
      signal:
        'Die Seite betont PRO-Auszahlungen ab dem ersten Tag, eine Aufteilung von 80/20 und dann 90/10 bei PRO+, eine einmalige PRO-Gebühr und einen Live-Übergang bei PRO+ mit denselben Risikoregeln.',
      impact: 'Schnelle Auszahlungen sind attraktiv, aber prüfen Sie den Weg von Test über PRO zu PRO+, die Gebühr und den genauen Live-Drawdown.',
    },
    brightfunded: {
      riskFamily: 'Auszahlungs-Marketing',
      signal: 'Die Seite wirbt mit Auszahlungen ab sieben Tagen nach dem ersten finanzierten Trade und einer Gewinnbeteiligung von bis zu 100 %, unter Bedingungen.',
      impact: 'Lesen Sie die Bedingungen genau: „bis zu“ hängt oft von Plan, Zusatzoptionen, Zyklus und Konsistenzregeln ab.',
    },
    'aqua-funded': {
      riskFamily: 'Sofortfinanzierung',
      signal: 'Die offizielle Quelle betont Sofortfinanzierung und eine hohe Gewinnbeteiligung, aber jede Produktseite muss Plan für Plan geprüft werden.',
      impact: 'Behandeln Sie das Sofort-Versprechen als zu prüfende Aussage: Auszahlungszyklen, Drawdown, Erstattungen und News-Regeln können je nach Konto abweichen.',
    },
    'blue-guardian': {
      riskFamily: 'Strukturierter Ablauf',
      signal: 'Die Seite betont Prüfungen mit transparenten Regeln, Disziplin, Risikomanagement und schnellen Auszahlungen.',
      impact: 'Prüfen Sie vor dem Kauf die genaue Regelseite zu Drawdown, News, Mindestauszahlungen und den Bedingungen der Sofortfinanzierung.',
    },
    'breakout-prop': {
      riskFamily: 'Krypto-Liquidität',
      signal: 'Breakout ist auf Krypto ausgerichtet: Lesen Sie die offizielle Quelle zu Spread, Liquidität, Börsenregeln, Liquidation und marktspezifischen Zeiten erneut.',
      impact: 'Eine Krypto-Prop-Firm ist nicht wie eine Forex-Prop-Firm zu beurteilen: Docht-, Slippage- und Liquidationsrisiko müssen vor der Zahlung sichtbar sein.',
    },
    'the-trading-pit': {
      riskFamily: 'Mehrere Anlageklassen',
      signal: 'Die offizielle Abdeckung umfasst mehrere Anlageklassen. Trennen Sie die Regeln nach Anlageklasse, denn Futures- und CFD-Challenges bergen nicht dieselben Risiken.',
      impact: 'Übertragen Sie keine Regel von einem Produkt auf ein anderes: Drawdown, Plattformen, Gebühren und Handelszeiten können stark abweichen.',
    },
    'finotive-funding': {
      riskFamily: 'Sofort + Challenge',
      signal:
        'Die offizielle Quelle ist bekannt, aber die Produktseite muss die genauen Klauseln zu Tagesverlust, Maximalverlust, Erstattungen, Auszahlungen und Handelsbeschränkungen bestätigen.',
      impact: 'Ohne abschließende Lektüre kein Kauf, bis die produktspezifischen Bedingungen in der PropRadar-Akte erfasst sind.',
    },
    myfundedfutures: {
      riskFamily: 'Futures-Auszahlung',
      signal:
        'Die offizielle Quelle ist bekannt, aber die genauen Parameter zu Auszahlung, Aktivierung, Drawdown und Konsistenz müssen im Hilfecenter oder beim Checkout bestätigt werden.',
      impact: 'Kaufen Sie nicht allein nach dem Monatspreis: Gebühren des finanzierten Kontos, Auszahlungspläne und nachlaufender Drawdown bestimmen die tatsächlichen Kosten.',
    },
    bulenox: {
      riskFamily: 'Nachlaufender Futures-Drawdown',
      signal: 'Die offizielle Quelle ist bekannt, aber der Akte fehlen noch die genauen Aktivierungsgebühren, der nachlaufende Drawdown, Mindestauszahlungen und Kontraktregeln.',
      impact: 'Bleibt in der Futures-Prüfwarteschlange: Kosten und Grenzen nach dem finanzierten Status zählen mehr als der Prüfungspreis.',
    },
  },
};

export default rules;
