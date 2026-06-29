import Link from 'next/link';
import { activeFirms, propFirms, riskyFirms, topFirms } from './lib/propFirms';

export default function HomePage() {
  return (
    <main>
      <section className="container hero">
        <div>
          <div className="eyebrow">Radar indépendant des prop firms</div>
          <h1>Choisis une prop firm sans te faire aveugler par le marketing.</h1>
          <p className="lead">
            PropRadar compare les produits, règles de drawdown, frais d'entrée, délais de payout, incidents publics et signaux de confiance. Le site peut monétiser certaines firms fiables par affiliation, mais le score reste séparé du business.
          </p>
          <div className="actions">
            <Link href="/comparateur" className="btn btn-primary">Ouvrir le comparateur</Link>
            <Link href="#methodologie" className="btn">Voir la méthode</Link>
          </div>
        </div>
        <div className="panel">
          <h3>État du radar</h3>
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
          <p className="muted" style={{ marginTop: 18, marginBottom: 0 }}>
            Dernière structure de données préparée pour une vérification continue des règles et des offres.
          </p>
        </div>
      </section>

      <section className="container section">
        <div className="eyebrow">Top confiance</div>
        <h2>Les profils les plus solides du moment</h2>
        <div className="grid-3">
          {topFirms.slice(0, 3).map((firm) => (
            <Link href={`/firm/${firm.slug}`} className="card" key={firm.slug}>
              <div className="firm-cell">
                {firm.logoDomain ? (
                  <img className="logo" src={`https://logo.clearbit.com/${firm.logoDomain}`} alt="" />
                ) : (
                  <span className="logo fallback-logo">{firm.name.slice(0, 2)}</span>
                )}
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
        <div className="grid-3">
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
            <h2>Un score pensé pour la confiance, pas seulement pour le prix.</h2>
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
