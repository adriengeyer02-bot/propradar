import Link from 'next/link';
import FirmLogo from './components/FirmLogo';
import { activeFirms, propFirms, riskyFirms, topFirms } from './lib/propFirms';

export default function HomePage() {
  const payoutAlerts = [...propFirms]
    .filter((firm) => firm.reviewSignals.payoutRisk !== 'Faible')
    .sort((a, b) => b.reviewSignals.payoutRiskScore - a.reviewSignals.payoutRiskScore)
    .slice(0, 3);
  const reviewAlerts = [...propFirms]
    .filter((firm) => (firm.reviewSignals.manipulationRiskScore ?? 0) >= 70)
    .sort((a, b) => (b.reviewSignals.manipulationRiskScore ?? 0) - (a.reviewSignals.manipulationRiskScore ?? 0))
    .slice(0, 3);

  return (
    <main>
      <section className="container hero home-hero">
        <div className="hero-copy">
          <div className="eyebrow">Radar indépendant des prop firms</div>
          <h1>PropRadar, un comparateur qui ne ment pas.</h1>
          <p className="lead">
            Le marché des prop firms adore les promesses. PropRadar met les règles, les payouts, les avis Reddit, la fiabilité Trustpilot et les conflits d'intérêt sur la même table.
          </p>
          <div className="actions">
            <Link href="/comparateur" className="btn btn-primary">Explorer les firms</Link>
            <Link href="#methodologie" className="btn">Comprendre le score</Link>
          </div>
        </div>

        <div className="hero-board">
          <div className="board-topline">
            <span>Pas de conflit d'intérêt caché</span>
          </div>
          <div className="metric-grid">
            <div className="metric">
              <strong>{propFirms.length}</strong>
              <span>firms suivies</span>
            </div>
            <div className="metric">
              <strong>{activeFirms.length}</strong>
              <span>actives</span>
            </div>
            <div className="metric">
              <strong>{riskyFirms.length}</strong>
              <span>à surveiller</span>
            </div>
          </div>
          <ul className="trust-stack">
            <li><span>01</span> Scores indépendants des liens affiliés.</li>
            <li><span>02</span> Firms fermées gardées visibles comme alertes.</li>
            <li><span>03</span> Payout risk et avis publics séparés du marketing.</li>
            <li><span>04</span> Sources officielles conservées sur chaque fiche.</li>
          </ul>
        </div>
      </section>

      <section className="container section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Plus-value PropRadar</div>
            <h2>Les signaux que les comparateurs affiliés évitent souvent.</h2>
          </div>
        </div>
        <div className="grid-3 radar-value-grid">
          <div className="card">
            <div className="eyebrow">Reddit Score</div>
            <h3>Le bruit communautaire est filtré</h3>
            <p className="muted">
              Le score ne récompense pas seulement les avis positifs. Il repère les plaintes récurrentes, les retours contradictoires et les sujets qui reviennent trop souvent.
            </p>
            <span className="quality-tag">Forums · Reddit · Discord</span>
          </div>
          <div className="card">
            <div className="eyebrow">Trustpilot fiable ?</div>
            <h3>La note brute ne suffit pas</h3>
            <p className="muted">
              Une note élevée peut cacher des avis invités, du marketing ou un historique trop récent. PropRadar pondère Trustpilot avec les incidents, Reddit et les preuves de payout.
            </p>
            <span className="quality-tag">Avis pondérés</span>
          </div>
          <div className="card">
            <div className="eyebrow">Payout Watch</div>
            <h3>Les retraits pèsent lourd</h3>
            <p className="muted">
              Retards, refus, règles de cohérence, seuils de retrait et fermetures sont traités comme des signaux majeurs, pas comme des détails en bas de page.
            </p>
            <span className="quality-tag">Alertes opérationnelles</span>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="grid-2">
          <div className="panel">
            <div className="eyebrow">Alertes payout</div>
            <h2>Firms à lire deux fois</h2>
            <ul className="compact-signal-list large">
              {payoutAlerts.map((firm) => (
                <li key={firm.slug}>
                  <Link href={`/firm/${firm.slug}`}>{firm.name}</Link>
                  <span className="muted">{firm.reviewSignals.payoutIncidentStatus}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="panel">
            <div className="eyebrow">Avis suspects</div>
            <h2>Trustpilot à pondérer</h2>
            <ul className="compact-signal-list large">
              {reviewAlerts.map((firm) => (
                <li key={firm.slug}>
                  <Link href={`/firm/${firm.slug}`}>{firm.name}</Link>
                  <span className="muted">{firm.reviewSignals.manipulationRisk ?? 'Moyen'}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Top confiance</div>
            <h2>Les profils les plus solides du moment</h2>
          </div>
          <Link href="/comparateur" className="btn">Voir les {propFirms.length} firms</Link>
        </div>
        <div className="grid-3">
          {topFirms.slice(0, 3).map((firm) => (
            <Link href={`/firm/${firm.slug}`} className="card" key={firm.slug}>
              <div className="firm-cell">
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} />
                <div>
                  <h3 style={{ marginBottom: 3 }}>{firm.name}</h3>
                  <span className="muted">{firm.bestFor}</span>
                </div>
              </div>
              <div className="stat-strip" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
                <div className="stat"><span>Score</span><strong>{firm.score}/100</strong></div>
                <div className="stat"><span>Split</span><strong>{firm.profitSplit}%</strong></div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="grid-3 feature-row">
          <div className="card">
            <div className="eyebrow">Indépendance</div>
            <h3>Le score ne s’achète pas</h3>
            <p className="muted" style={{ marginBottom: 0 }}>
              Une prop firm affiliée peut perdre des points, une prop firm non affiliée peut être mieux classée, et les firms fermées restent visibles.
            </p>
          </div>
          <div className="card">
            <div className="eyebrow">Affiliation</div>
            <h3>Liens signalés</h3>
            <p className="muted" style={{ marginBottom: 0 }}>
              Quand PropRadar peut toucher une commission, c’est affiché sur la fiche. Le visiteur sait ce qui est commercial.
            </p>
          </div>
          <div className="card">
            <div className="eyebrow">Confiance</div>
            <h3>Les risques comptent</h3>
            <p className="muted" style={{ marginBottom: 0 }}>
              Le radar valorise la stabilité, les sources, les payouts crédibles et la clarté des règles, pas seulement le split annoncé.
            </p>
          </div>
        </div>
      </section>

      <section className="container section" id="methodologie">
        <div className="grid-2">
          <div>
            <div className="eyebrow">Méthodologie</div>
            <h2>Un score pensé pour la confiance, pas pour vendre le challenge le plus rentable.</h2>
          </div>
          <div className="panel">
            <ul className="risk-list">
              <li>Ancienneté, stabilité des règles et clarté juridique.</li>
              <li>Preuves de payouts, délai moyen annoncé, historique d'incidents.</li>
              <li>Qualité des produits : drawdown, objectifs, plateformes, restrictions et cohérence.</li>
              <li>Signaux communautaires et liens vers les sources officielles quand disponibles.</li>
              <li>Reddit score : bruit communautaire, plaintes récurrentes et cohérence des retours.</li>
              <li>Fiabilité Trustpilot : note pondérée par volume, contexte, incidents et preuves externes.</li>
              <li>Risque payout : retards, refus, règles de retrait, fermetures et alertes opérationnelles.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container section" id="risques">
        <div className="panel">
          <div className="eyebrow">Important</div>
          <h2>Le secteur bouge vite.</h2>
          <p className="lead">
            Les offres, frais, règles de news trading, plateformes et conditions de payout peuvent changer sans préavis. PropRadar doit être utilisé comme un filtre de recherche, pas comme une promesse de résultat ou un conseil financier.
          </p>
        </div>
      </section>
    </main>
  );
}
