import type { GuideArticleTranslations } from '../types';

/** German translations of the long guide articles (same section order as the English ones). */
const de: GuideArticleTranslations = {
  'prop-firm-sans-challenge': {
    intro: 'Eine Prop Firm ohne Challenge verkauft ein finanziertes Konto direkt, ohne die klassische Evaluationsphase. Das klingt nach einer Abkürzung. In der Praxis zahlen Sie vorab mehr, um den Test zu überspringen, und die Regeln, die Sie in der Challenge getroffen hätten, wandern ins finanzierte Konto, wo ein Fehler das Konto kostet statt eines neuen Versuchs.',
    sections: [
      {
        heading: 'Was „ohne Challenge“ tatsächlich bedeutet',
        paragraphs: [
          'Im klassischen Modell zahlen Sie eine Gebühr, erreichen ein Gewinnziel unter einem Tagesverlustlimit und einem maximalen Drawdown, manchmal in zwei Phasen, und handeln erst dann ein finanziertes Konto, das auszahlen kann. Ein Programm ohne Challenge, oft Sofort- oder Direktfinanzierung genannt, streicht diesen ersten Schritt: Sie kaufen das finanzierte Konto und können Auszahlungen beantragen, sobald dessen eigene Bedingungen erfüllt sind.',
          'Was wegfällt, ist das Gewinnziel vor der Finanzierung. Was nicht wegfällt, ist die Risikokontrolle. Sofortkonten behalten fast immer einen maximalen Drawdown, oft einen nachlaufenden, und viele ergänzen eine Konsistenzregel, eine Mindestzahl an Handelstagen oder eine niedrigere Obergrenze für die erste Auszahlung. Die Firma muss Trader weiterhin filtern; sie tut es nur, nachdem Sie bezahlt haben.',
        ],
      },
      {
        heading: 'Warum Sofortfinanzierung meist mehr kostet',
        paragraphs: [
          'Firmen kalkulieren die Evaluation als Filter: Ein großer Teil der Challenge-Käufer erreicht nie eine Auszahlung, und ihre Gebühren finanzieren die Trader, die es schaffen. Wer den Filter überspringt, bekommt dieses Risiko in den Kontopreis eingerechnet. Deshalb kostet ein Direktkonto meist ein Mehrfaches einer gleich großen Challenge, die Konten sind kleiner und der Drawdown oft enger.',
          'Vergleichen Sie die Gesamtkosten bis zur ersten Auszahlung, nicht den Listenpreis. Ein Beispiel mit runden Zahlen: Eine Challenge für 100 $ mit einer Bestehenschance von eins zu drei kostet im Schnitt etwa 300 $ bis zur Finanzierung. Ein Sofortkonto für 350 $ mit engem Trailing-Drawdown kann mehr kosten, wenn Sie vor der ersten Auszahlung ein oder zwei Konten verlieren. Welche Option günstiger ist, hängt davon ab, wie oft Ihre Strategie die Regeln des finanzierten Kontos überstehen würde.',
        ],
      },
      {
        heading: 'Die Regeln, die über den Wert eines Direktkontos entscheiden',
        paragraphs: ['Lesen Sie die Bedingungen des finanzierten Kontos, nicht die Werbeseite. Diese Punkte verändern die Rechnung am häufigsten:'],
        bullets: [
          'Drawdown-Art: Ein Trailing-Drawdown, der Ihrem Equity-Hoch folgt, ist viel schwerer zu handhaben als ein statisches Limit am Startsaldo.',
          'Konsistenzregel: Viele Sofortprogramme begrenzen, wie viel Ihres Gewinns vom besten Tag stammen darf, bevor eine Auszahlung möglich ist.',
          'Bedingungen der ersten Auszahlung: Mindesthandelstage, Mindestgewinn und Obergrenzen für die ersten ein oder zwei Auszahlungen.',
          'Anfängliche Gewinnbeteiligung: Manche Programme starten niedriger als ihre Challenge-Modelle und steigen erst später.',
          'Ersatzkosten: Was ein neues Konto nach einem Verstoß kostet und ob ein Rabatt gilt.',
          'Eingeschränkte Strategien: News-Fenster, Haltedauern, Copy-Trading und Mindestdauer pro Trade.',
        ],
      },
      {
        heading: 'Für wen eine Prop Firm ohne Challenge infrage kommt',
        paragraphs: [
          'Direktfinanzierung ist am sinnvollsten für Trader mit einer stabilen Strategie mit geringem Drawdown, die Tageslimits nachweislich einhalten und Zeit höher gewichten als Kosten. Am wenigsten sinnvoll ist sie für Trader, die noch eine Strategie testen, für volatile Stile, die Spielraum brauchen, oder für alle, die vor allem den Druck eines Gewinnziels vermeiden wollen: Dieser Druck wird durch den eines laufenden Drawdowns auf einem teureren Konto ersetzt.',
          'Im Zweifel ist eine günstige 1-Step-Challenge oft der bessere Test, ob Ihre Strategie zu den Regeln einer Firma passt, bevor Sie sich auf ein teureres Direktkonto festlegen.',
        ],
      },
      {
        heading: 'Warnsignale speziell bei Sofortfinanzierung',
        paragraphs: [
          'Sofortprogramme ziehen neue und marketinglastige Firmen an, weil sie sich leicht verkaufen lassen. Werten Sie diese Punkte als Warnsignale: sehr große Konten zu sehr niedrigen Preisen, Auszahlungsversprechen ohne veröffentlichte Auszahlungsrichtlinie, Regeln, die sich zwischen Startseite und Bedingungen unterscheiden, und Bedingungen, die der Firma erlauben, Auszahlungen nach eigenem Ermessen ohne Begründung abzulehnen. Prüfen Sie vor dem Kauf im PropRadar-Profil die juristische Person, Auszahlungssignale und eventuelle Domain- oder Aufsichtswarnungen.',
        ],
      },
    ],
  },
  'prop-firm-sans-consistency-rule': {
    intro: 'Eine Konsistenzregel begrenzt, wie viel Ihres Gesamtgewinns von einem einzigen Tag stammen darf. Es gibt sie, weil ein Glückstag, eine überdimensionierte Position oder eine News-Spitze eine Auszahlung erzeugen kann, die nichts darüber aussagt, ob Sie das Konto auf Dauer handeln können. Die genaue Formel zu verstehen ist wichtiger, als eine Firma zu finden, die behauptet, keine zu haben.',
    sections: [
      {
        heading: 'Wie die Regel berechnet wird',
        paragraphs: [
          'Die meisten Firmen nutzen dieselbe Grundformel: Gewinn des besten Tages geteilt durch den Gesamtgewinn, in Prozent. Liegt das Ergebnis über dem Limit der Firma, sind Sie noch nicht berechtigt, je nach Geltungsbereich der Regel also noch nicht bestanden oder noch nicht auszahlungsberechtigt.',
          'Rechenbeispiel mit 50-%-Limit: Sie verdienen 1.200 $ am Montag, 300 $ am Dienstag und 500 $ am Mittwoch, insgesamt 2.000 $. Ihr bester Tag sind 1.200 $, also 60 % des Gesamtgewinns. Sie liegen über dem Limit. Um das zu beheben, müssen Sie nichts verlieren: Sie brauchen mehr Gesamtgewinn, hier mindestens 2.400 $, damit 1.200 $ höchstens 50 % ausmachen.',
          'Manche Firmen wenden die Regel anders an. Topstep zum Beispiel erhöht im Trading Combine das Gewinnziel, statt Sie scheitern zu lassen: Übersteigt Ihr bester Tag 55 % des Ziels, steigt das Ziel auf bester Tag geteilt durch 0,55 (Topstep-Hilfecenter, Seite vom 17. September 2026).',
        ],
      },
      {
        heading: 'Wo die Regel gilt: Evaluation, Auszahlung oder beides',
        paragraphs: [
          'Derselbe Prozentsatz kann sehr Unterschiedliches bedeuten. Eine Konsistenzregel in der Evaluation verzögert nur das Bestehen. Eine Konsistenzregel bei Auszahlungen kann eine Auszahlung blockieren, nachdem Sie auf einem finanzierten Konto bereits Geld verdient haben, was weit frustrierender ist. Manche Firmen nutzen zudem je Phase unterschiedliche Limits: Topstep verwendet 55 % im Combine und 40 % auf dem Konsistenz-Auszahlungsweg seines Express Funded Account.',
          'FTMO hat seine Regel am 12. Oktober 2026 geändert: Neue Bestellungen der 1-Step Challenge nutzen eine Konsistenzregel, die Ihren besten Tag mit dem Gesamtgewinn vergleicht, Verlusttage eingeschlossen, während Konten aus älteren Bestellungen die bisherige Best Day Rule behalten, die nur positive Tage zählte. Laut FTMO handeln Sie, wenn Sie die Anforderung nicht erfüllen, einfach weiter, bis Sie sie erfüllen (FTMO-Trading-Update vom 8. Oktober 2026). Für das High-Stakes-Programm von The5ers hat PropRadar keine prozentuale Best-Day-Regel erfasst. Bestätigen Sie immer Phase, Produkt und Bestelldatum.',
        ],
      },
      {
        heading: 'Ist eine Firma ohne Konsistenzregel besser?',
        paragraphs: [
          'Nicht automatisch. Firmen, die auf die Konsistenzregel verzichten, steuern das Risiko meist anders: engere Tagesverlustlimits, Trailing-Drawdowns, Obergrenzen für die ersten Auszahlungen, Mindesthandelstage oder Limits für die Positionsgröße. Eine Schlagzeile „keine Konsistenzregel“ kann ein finanziertes Konto verbergen, das schwerer zu halten ist.',
          'Die Regel trifft vor allem Trader, deren Ergebnisse schubweise kommen: News-Trader, Swing-Trader, die eine große Position schließen, oder alle, die nach einer Verlustserie die Größe erhöhen. Sind Ihre Tagesergebnisse recht gleichmäßig, greift ein Limit von 40 bis 50 % selten. Machen Sie regelmäßig den Großteil Ihrer Woche in einer Session, suchen Sie Programme ohne die Regel und vergleichen Sie, was sie ersetzt.',
        ],
      },
      {
        heading: 'So handeln Sie entspannt unter einer Konsistenzregel',
        paragraphs: [
          'Rechnen Sie laufend bester Tag geteilt durch Gesamtgewinn mit und wissen Sie vor jeder Session, wie viel Sie verdienen können, ohne die Quote über das Limit zu treiben. Hatten Sie früh einen großen Tag, planen Sie mehrere kleinere positive Tage, statt ihn wiederholen zu wollen. Und erhöhen Sie die Größe nicht kurz vor Ende einer Evaluation: Ein einziger überdimensionierter Gewinntag kann das Bestehen genauso verzögern wie ein Verlusttag.',
        ],
      },
    ],
  },
  'meilleure-prop-firm-2026': {
    intro: 'Die eine beste Prop Firm gibt es nicht. Es gibt die beste Firma für Ihren Markt, Ihren Trading-Stil und das Risiko, das Sie beim Betreiber selbst akzeptieren. Dieses Ranking beginnt beim letzten Punkt: Bevor Gewinnbeteiligungen und Rabatte verglichen werden, prüft es, ob eine Firma voraussichtlich noch da ist und zahlt, wenn Sie sie brauchen.',
    sections: [
      {
        heading: 'Wie dieses Ranking entsteht',
        paragraphs: [
          'Jede Firma bei PropRadar erhält einen Score von 100 aus Klarheit der Regeln, Auszahlungsnachweisen, rechtlicher Transparenz, öffentlichen Bewertungssignalen und Betriebsdauer. Affiliate-Links werden auf jedem Profil offengelegt und ändern nie einen Score. Eine Firma mit Partnerschaft behält ihre Schwächen sichtbar, und eine Firma ohne kann ganz oben stehen.',
          'Bei dieser Aktualisierung haben langjährige Betreiber die höchsten Scores: FTMO (91/100), The5ers (85/100) und Topstep (84/100). Sie sind nicht die günstigsten. Es sind die Profile mit der längsten öffentlichen Historie, den verständlichsten Bedingungen und den wenigsten offenen Auszahlungssignalen in den PropRadar-Akten.',
        ],
      },
      {
        heading: 'Beginnen Sie mit Ihrem Markt',
        paragraphs: [
          'Forex- und CFD-Trader und Futures-Trader kaufen nicht im selben Markt ein. Forex/CFD-Firmen wie FTMO und The5ers laufen auf Plattformen wie MT5 oder cTrader mit prozentualen Limits. Futures-Firmen wie Topstep laufen auf Futures-Plattformen mit Dollar-Limits und oft nachlaufenden Drawdowns. Eine hervorragende Futures-Firma nützt einem Forex-Trader nichts, also filtern Sie zuerst nach Markt.',
        ],
      },
      {
        heading: 'Dann die Regeln an Ihren Stil anpassen',
        paragraphs: [
          'Die meisten Konten scheitern nicht an den Gewinnzielen, sondern an Drawdown-Art, Tagesverlustlimit, Konsistenzregeln, News-Einschränkungen und Halteregeln. Ein Scalper braucht schnelle Ausführung und keine Mindesthaltedauer. Ein Swing-Trader braucht Halten über Nacht und am Wochenende. Ein News-Trader braucht eine Firma, die Trading rund um wichtige Veröffentlichungen auch im finanzierten Konto erlaubt, nicht nur in der Evaluation.',
        ],
        bullets: [
          'Drawdown: Statische Limits sind leichter zu handhaben als nachlaufende.',
          'Konsistenz: Prüfen Sie, ob sie für die Evaluation, die Auszahlungen oder beides gilt.',
          'News und Haltedauer: Bestätigen Sie die Regeln des finanzierten Kontos, die oft strenger sind.',
          'Auszahlungen: Häufigkeit, Mindestbetrag, Obergrenzen der ersten Auszahlung und Bearbeitungsgebühren.',
        ],
      },
      {
        heading: 'Zum Schluss die echten Kosten vergleichen',
        paragraphs: [
          'Die echten Kosten einer Prop Firm sind das Geld, das Sie vor Ihrer ersten Auszahlung ausgeben: Challenge-Gebühren, Resets, Aktivierungsgebühren und Ersatzkonten, abzüglich etwaiger Erstattungen. Eine billige Challenge mit hartem Drawdown kann mehr kosten als eine teure, die Sie wahrscheinlich bestehen. Rabattcodes zählen zuletzt, wenn eine Firma alle anderen Filter bestanden hat.',
        ],
      },
      {
        heading: 'Was eine Firma in diesem Ranking fallen ließe',
        paragraphs: [
          'Scores bewegen sich, wenn sich die Nachweise bewegen: eine Warnung einer Aufsichtsbehörde, wiederholte Auszahlungsverzögerungen, eine Regeländerung für bestehende Konten, eine Domain, die die Firma nicht mehr ausliefert, oder weniger Transparenz über die juristische Person. Jede Änderung ist im Änderungsverlauf der Firma datiert, sodass Sie sehen, warum und wann sich ein Score geändert hat.',
        ],
      },
    ],
  },
  'goat-funded-trader-avis': {
    intro: 'GOAT Funded Trader ist eine der sichtbarsten Prop Firms der letzten zwei Jahre: aggressive Rabatte, viele Modelle und ständige Präsenz in sozialen Medien. Sichtbarkeit ist nicht dasselbe wie Zuverlässigkeit. Dieser Test trennt Belegtes von Marketing und stellt die Regeln des finanzierten Kontos an den Anfang, denn dort verlieren Trader ihre Auszahlungen.',
    sections: [
      {
        heading: 'Wer GOAT Funded Trader betreibt',
        paragraphs: [
          'GOAT Funded Trader startete im Mai 2023. Es ist ein Handelsname der Wishes Tower International Limited, einer Gesellschaft in Hongkong, und das simulierte Trading stellt Goat Funded LTD in St. Lucia bereit. Keine Finanzaufsicht überwacht den Dienst. Die Bedingungen beschreiben simulierte Konten, nicht erstattungsfähige Käufe und weiten Ermessensspielraum bei Auszahlungen, was in der Branche üblich ist, aber vor dem Kauf bekannt sein sollte.',
          'PropRadar bewertet die Firma mit 68/100 und führt sie auf der Beobachtungsliste: Die Marke ist real und zahlt Trader aus, aber ihre Historie ist kurz und ihre Auszahlungsbedingungen lassen viel Interpretationsspielraum. PropRadar hat eine Affiliate-Beziehung zu GOAT Funded Trader; sie ändert weder diesen Score noch diesen Test.',
        ],
      },
      {
        heading: 'Die Lage bei Trustpilot',
        paragraphs: [
          'Am 23. Oktober 2026 zeigte Trustpilot keinen TrustScore für das Unternehmen. Laut Profil ist die Bewertung wegen eines Verstoßes gegen die Richtlinien nicht verfügbar, und Trustpilot hat eine Reihe gefälschter Bewertungen entfernt. Das Profil listet weiterhin 4.352 Bewertungen, stark gespalten: 46 % fünf Sterne und 40 % ein Stern.',
          'Behandeln Sie Angaben auf der Startseite zu einer nahezu perfekten Bewertung vorsichtig, solange dieser Hinweis besteht. Ein polarisiertes Bewertungsprofil bedeutet meist zwei sehr unterschiedliche Erfahrungen: Trader, die schnell ausgezahlt wurden, und Trader, deren Auszahlungen nach Regeln abgelehnt wurden, die sie nicht genau gelesen hatten.',
        ],
      },
      {
        heading: 'Die wichtigsten Regeln des finanzierten Kontos',
        paragraphs: [
          'Die Challenge-Modelle sind konventionell. Das 2-Step-GOAT-Modell verlangt 8 % und dann 6 % bei 4 % Tagesverlust und 10 % statischem Maximalverlust; das 2-Step Standard verlangt 10 % und dann 5 % bei 5 % Tages- und 10 % Maximalverlust; das 1-Step verlangt 10 % bei 3 % Tagesverlust und 6 % statischem Maximalverlust. Das 3-Step-Modell wurde im August 2026 eingestellt. Diese Zahlen stammen aus einem am 5. Oktober 2026 geprüften Drittanbieter-Test: Bestätigen Sie sie an der Kasse.',
          'Die Regeln, die über Auszahlungen entscheiden, beginnen nach dem Bestehen:',
        ],
        bullets: [
          'Goat Guard: Auf finanzierten 1-Step- und 2-Step-Konten senkt ein schwebender Verlust von 2 % des Anfangssaldos Ihre Gewinnbeteiligung auf 50 %; eine zweite Auslösung verletzt das Konto.',
          '2-Minuten-Regel: Gewinne aus Trades, die kürzer als zwei Minuten gehalten wurden, werden bei der Auszahlung gestrichen, Verluste aus solchen Trades bleiben auf dem Konto.',
          'News-Fenster: Gewinne rund um wichtige Nachrichten sind auf 1 % des Startsaldos begrenzt.',
          'Tagesgewinnlimit: Ein finanziertes Konto kann höchstens 3.000 $ Gewinn pro Tag verbuchen.',
          'Sofortmodelle nutzen Trailing-Drawdowns und schließen das Konto je nach Modell bei 1 % oder 2 % schwebendem Verlust.',
        ],
      },
      {
        heading: 'Auszahlungen',
        paragraphs: [
          'Die Standard-Gewinnbeteiligung beträgt 80 %, mit einem kostenpflichtigen Upgrade auf 100 % an der Kasse und einem Skalierungsplan, der sie auf 90-95 % anheben kann. Die meisten Modelle zahlen alle 14 Tage aus, mit 100 $ Minimum und 3 % Bearbeitungsgebühr. Die ersten beiden Auszahlungen sind auf den niedrigeren Wert von 6 % des Startsaldos oder 10.000 $ begrenzt. Zu den Zahlungsmethoden gehören Rise, Banküberweisung, Skrill und Krypto, jeweils mit eigenem Limit.',
          'Mehrere öffentliche Angaben widersprechen dem Hilfecenter, etwa zur Auszahlungsdauer (24 Stunden gegenüber 2 Werktagen) und zur maximalen Kontogröße. Wenn Marketing und Bedingungen sich widersprechen, gelten für Ihre Auszahlung die Bedingungen.',
        ],
      },
      {
        heading: 'Für wen GOAT Funded Trader passt',
        paragraphs: [
          'Die Firma kann für disziplinierte Trader mit kleinen, kontrollierten schwebenden Verlusten, Haltedauern deutlich über zwei Minuten und ohne Abhängigkeit von News-Spitzen funktionieren, die einen günstigen Einstieg wollen. Schlecht passt sie zu Scalpern, News-Tradern und allen, die Trades durch große Intraday-Drawdowns laufen lassen, denn genau diese Verhaltensweisen zielen die Regeln des finanzierten Kontos an. Ist Ihnen Regelklarheit wichtiger als der Preis, vergleichen Sie zuerst mit den höher bewerteten Firmen in unserem Ranking.',
        ],
      },
    ],
  },
  'topstep-review': {
    intro: 'Topstep ist der älteste Name im Futures-Prop-Trading: 2012 in Chicago von Michael Patak gegründet, betrieb es seinen Trading Combine Jahre vor der aktuellen Welle von Prop Firms. Diese Geschichte ist seine größte Stärke. Seine Schwächen sind ein reines Futures-Angebot, häufige Regeländerungen seit Ende 2025 und ein nachlaufendes Verlustlimit, das Disziplin verlangt.',
    sections: [
      {
        heading: 'Ist Topstep seriös?',
        paragraphs: [
          'Topstep ist ein etablierter US-Betreiber mit langer öffentlicher Historie, einem veröffentlichten Hilfecenter und einem verbundenen Introducing Broker, Topstep Brokerage, gestartet Anfang 2026. PropRadar bewertet die Firma mit 84/100 und hat keine Warnung einer Aufsichtsbehörde gegen sie erfasst. Wie bei jeder Prop Firm sind Evaluation und Express Funded Account simuliert: Auszahlungen sind Prämien, die Topstep zahlt, keine Handelsgewinne aus einem Brokerkonto.',
          'Bei Trustpilot zeigt das Profil einen TrustScore von 3,7 bei 14.955 Bewertungen, mit dem Trustpilot-Hinweis, dass das Unternehmen mit Hochrisiko-Investments in Verbindung stehen kann (geprüft am 23. Oktober 2026). Die Bewertung ist für die Kategorie durchschnittlich. Beschwerden Ende 2025 drehten sich um Ausfälle der Plattform TopstepX und nicht ausgeführte Stop-Orders.',
        ],
      },
      {
        heading: 'Wie der Trading Combine funktioniert',
        paragraphs: [
          'Der Trading Combine ist die Evaluation von Topstep. Es gibt ihn in den Größen 50K, 100K und 150K mit Gewinnzielen von 3.000 $, 6.000 $ und 9.000 $. Es gibt kein Zeitlimit und keine Mindestzahl an Handelstagen. Positionen müssen zum Sessionende geschlossen sein: Topstep erlaubt kein Halten über Nacht oder am Wochenende.',
          'Das Maximum Loss Limit (MLL) liegt je nach Größe 2.000 $, 3.000 $ oder 4.500 $ unter dem Startsaldo. Es steigt mit dem Tagesendsaldo mit und sinkt nie, Verstöße werden aber in Echtzeit überwacht, nicht realisierte Verluste eingeschlossen. Im Combine hört es auf zu steigen, sobald es den Startsaldo erreicht (Topstep-Hilfecenter, aktualisiert am 18. September 2026).',
          'Das Konsistenzziel liegt bei 55 %: Ihr bester Tag darf 55 % des Gewinnziels nicht überschreiten. Tut er es, sind Sie nicht durchgefallen; das Ziel steigt auf bester Tag geteilt durch 0,55 (Hilfecenter, 17. September 2026). Ein optionales Tagesverlustlimit von 1.000 $, 2.000 $ oder 3.000 $ stoppt das Trading für die Session, ohne das Konto zu schließen.',
        ],
      },
      {
        heading: 'Express Funded Account und Auszahlungen',
        paragraphs: [
          'Nach dem Bestehen handeln Sie ein Express Funded Account (XFA), weiterhin simuliert, auf dem Auszahlungen beginnen. Das XFA startet mit einem Saldo von 0 $ und demselben MLL-Puffer darunter. Seit Februar 2026 wählen Sie zwischen zwei Auszahlungswegen, und die Wahl ist endgültig: Der Standard-Weg verlangt vor jeder Auszahlung fünf Gewinntage von mindestens 150 $, der Konsistenz-Weg drei Handelstage, wobei Ihr größter Tag höchstens 40 % des Nettogewinns ausmacht.',
          'Trader, die am oder nach dem 12. Januar 2026 beigetreten sind, erhalten 90 % der genehmigten Auszahlungen; frühere Trader behalten 100 % ihrer ersten 10.000 $, danach 90 %. Der Mindestauszahlungsantrag beträgt 125 $. Nach der ersten Auszahlung wird das MLL auf 0 $ gesetzt, was den Puffer entfernt: Ein schlechter Tag nach einer Auszahlung kann das Konto beenden. Die besten Trader können zu einem Live Funded Account mit echtem Kapital eingeladen werden, mit verpflichtenden Tagesverlustlimits und einer Reserve, die stufenweise freigegeben wird.',
        ],
      },
      {
        heading: 'Vor- und Nachteile',
        paragraphs: ['Was nach dem Lesen der aktuellen Regeln auffällt:'],
        bullets: [
          'Pro: die längste Historie im Futures-Prop-Trading und ein großes, dokumentiertes Hilfecenter.',
          'Pro: kein Zeitlimit und keine Mindesttage im Combine; die Konsistenzregel erhöht das Ziel, statt Sie scheitern zu lassen.',
          'Pro: 90 % Gewinnbeteiligung ab dem ersten Dollar für neue Trader und ein niedriges Auszahlungsminimum von 125 $.',
          'Contra: nur Futures, und jede Position muss zum Sessionende glattgestellt sein.',
          'Contra: Das MLL wird nach der ersten Auszahlung auf 0 $ gesetzt, eine frühe Auszahlung entfernt also Ihre Sicherheitsmarge.',
          'Contra: Die Regeln haben sich zwischen November 2025 und April 2026 mehrfach geändert; lesen Sie sie vor jedem Kauf neu.',
        ],
      },
      {
        heading: 'Für wen Topstep passt',
        paragraphs: [
          'Topstep passt zu Intraday-Futures-Tradern, die einen etablierten Betreiber wollen und mit einem intraday überwachten nachlaufenden Limit leben können. Nicht passend ist es für Forex- oder CFD-Trader, Swing-Trader, die über Nacht halten, oder alle, die vor allem nach Preis wählen: Mit monatlichen Abos wird eine langsame Evaluation teurer als bei Konkurrenten mit Einmalgebühr. Wenn Sie es mit Apex vergleichen, lesen Sie unseren Ratgeber Topstep vs Apex, der jede Kontoversion Regel für Regel gegenüberstellt.',
        ],
      },
    ],
  },
  'prop-firm-drawdown': {
    intro: 'Der Drawdown ist die Regel, an der die meisten Prop-Firm-Konten enden. Er ist der Höchstbetrag, den Ihr Konto verlieren darf, gemessen von einem Bezugspunkt. Zwei Firmen können beide einen „Drawdown von 3.000 $“ auf einem 50.000-$-Konto bewerben und Ihnen völlig unterschiedlichen Spielraum geben, weil sich der Bezugspunkt anders bewegt.',
    sections: [
      {
        heading: 'Tagesverlustlimit vs maximaler Drawdown',
        paragraphs: [
          'Die meisten Firmen nutzen zwei Limits gleichzeitig. Das Tagesverlustlimit begrenzt, wie viel Sie an einem Handelstag verlieren dürfen, meist gemessen vom Saldo oder Equity zu Tagesbeginn. Der maximale Drawdown begrenzt Ihren Gesamtverlust über die Lebensdauer des Kontos. Ein Verstoß gegen eines davon verletzt meist das Konto, auch wenn manche Futures-Firmen Sie beim Tageslimit nur für den Rest der Session stoppen.',
        ],
      },
      {
        heading: 'Statischer Drawdown',
        paragraphs: [
          'Ein statischer Drawdown liegt fest unter Ihrem Startsaldo und bewegt sich nie. Bei einem 100.000-$-Konto mit 10 % statischem Limit liegt die Untergrenze dauerhaft bei 90.000 $. Wächst das Konto auf 108.000 $, haben Sie 18.000 $ Spielraum. Das ist das nachsichtigste Modell und bei zweistufigen Forex/CFD-Challenges verbreitet.',
        ],
      },
      {
        heading: 'Trailing-Drawdown (intraday)',
        paragraphs: [
          'Ein Intraday-Trailing-Drawdown folgt Ihrem höchsten Equity in Echtzeit, nicht realisierte Gewinne eingeschlossen. Beispiel auf einem 50.000-$-Konto mit 2.500 $ Trailing-Limit: Die Untergrenze startet bei 47.500 $. Ein Trade läuft auf +1.500 $ unrealisiert, also steigt die Untergrenze auf 49.000 $, selbst wenn Sie den Trade danach bei Break-even schließen. Sie haben jetzt 1.000 $ Spielraum statt 2.500 $, ohne einen Cent verbucht zu haben. Das ist das strengste Modell und bei Futures- und Sofortfinanzierungskonten verbreitet.',
        ],
      },
      {
        heading: 'Tagesend-Trailing-Drawdown (EOD)',
        paragraphs: [
          'Ein Tagesend-Trailing-Drawdown bewegt sich nur zum Handelsschluss, auf Basis Ihres Schlusssaldos. Intraday-Schwankungen offener Gewinne heben die Untergrenze nicht an, was ihn viel leichter handhabbar macht als Intraday-Trailing. Ein Detail, das viele übersehen: Die Untergrenze bewegt sich nur zum Schluss, ein Verstoß wird aber oft trotzdem in Echtzeit geprüft. Topstep zum Beispiel führt sein Maximum Loss Limit am Tagesendsaldo nach, überwacht es aber live, nicht realisierte Verluste eingeschlossen.',
        ],
      },
      {
        heading: 'Wann das Nachlaufen endet: der Lock',
        paragraphs: [
          'Die meisten Trailing-Modelle hören irgendwann auf nachzulaufen, meist wenn die Untergrenze den Startsaldo erreicht (oder Startsaldo plus einen kleinen Puffer). Ab dann verhält sich das Limit wie ein statisches. Deshalb sind die ersten Tage eines Trailing-Kontos die gefährlichsten: Bauen Sie den Puffer bis zum Lock-Level auf, bevor Sie größere Positionen eingehen.',
        ],
      },
      {
        heading: 'Saldo- vs Equity-basierte Limits',
        paragraphs: [
          'Ein saldobasiertes Limit zählt nur geschlossene Trades. Ein equitybasiertes Limit zählt auch offene Positionen, sodass ein schwebender Verlust das Konto verletzen kann, selbst wenn Sie den Trade später im Gewinn geschlossen hätten. Die meisten modernen Firmen messen Verstöße am Equity. Lesen Sie die Definition in den Bedingungen, nicht die Übersichtstabelle.',
        ],
      },
      {
        heading: 'Wie Sie wählen',
        paragraphs: ['Wählen Sie das Drawdown-Modell passend zum Verhalten Ihrer Trades:'],
        bullets: [
          'Trades, die oft weit ins Plus laufen und dann zurückkommen: Intraday-Trailing meiden, statisch oder EOD bevorzugen.',
          'Kleine, häufige Scalps mit engen Stops: Ein Trailing-Limit ist handhabbar, wenn das Lock-Level schnell erreichbar ist.',
          'Swing-Trades mit weiten Stops: Sie brauchen ein statisches Limit und mehr Spielraum als Ihr typischer offener Verlust.',
          'Bemessen Sie Positionen immer am verbleibenden Abstand zur Untergrenze, nicht an der beworbenen Kontogröße.',
        ],
      },
    ],
  },
};

export default de;
