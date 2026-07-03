import Link from 'next/link';
import FirmLogo from './components/FirmLogo';
import { activeFirms, partiallyVerifiedFirms, propFirms, riskyFirms, topFirms, verifiedFirms } from './lib/propFirms';
import { seoGuides, selectGuideFirms } from './lib/seoGuides';

export default function HomePage() {
  const payoutAlerts = [...propFirms]
    .filter((firm) => firm.reviewSignals.payoutRisk !== 'Faible')
    .sort((a, b) => b.reviewSignals.payoutRiskScore - a.reviewSignals.payoutRiskScore)
    .slice(0, 3);
  const reviewAlerts = [...propFirms]
    .filter((firm) => (firm.reviewSignals.manipulationRiskScore ?? 0) >= 70)
    .sort((a, b) => (b.reviewSignals.manipulationRiskScore ?? 0) - (a.reviewSignals.manipulationRiskScore ?? 0))
    .slice(0, 3);
  const noConflictFirms = propFirms.filter((firm) => firm.commercialRelationship === 'Aucune').length;
  const affiliateFirms = propFirms.length - noConflictFirms;
  const officialSourceCount = propFirms.reduce((sum, firm) => sum + firm.sources.length, 0);
  const payoutTrackedCount = propFirms.filter((firm) => firm.reviewSignals.payoutRisk !== 'Faible').length;
  const trustpilotWatchCount = propFirms.filter((firm) => (firm.reviewSignals.trustpilotFlaggedReviewCount ?? 0) > 0).length;
  const sourcedFirms = verifiedFirms.length + partiallyVerifiedFirms.length;
  const homepageGuides = seoGuides.slice(0, 6);
  const archivedFirmsCount = propFirms.length - activeFirms.length - riskyFirms.length;
  const archivedSignal = propFirms.find((firm) => !activeFirms.includes(firm) && !riskyFirms.includes(firm));
  const radarSignals = [
    { firm: topFirms[0], label: 'Fiable', className: 'radar-dot-good' },
    { firm: payoutAlerts[0], label: 'Payout watch', className: 'radar-dot-watch' },
    { firm: reviewAlerts[0], label: 'Avis a ponderer', className: 'radar-dot-caution' },
    { firm: archivedSignal, label: 'Archive risque', className: 'radar-dot-risk' },
  ];

  return (
    <main>
      <section className="container hero home-hero">
        <div className="hero-copy">
          <div className="eyebrow">Radar indépendant des prop firms</div>
          <h1>PropRadar, comparateur indépendant de prop firms.</h1>
          <p className="lead">
            Le marché des prop firms adore les promesses. PropRadar met les règles, les payouts, les avis Reddit, la fiabilité Trustpilot et les conflits d'intérêt sur la même table.
          </p>
          <div className="actions">
            <Link href="/comparateur" className="btn btn-primary">Comparer les firms</Link>
            <Link href="#methodologie" className="hero-link-secondary">Comprendre le score</Link>
          </div>
        </div>

        <div className="hero-board">
          <div className="board-topline">
            <span>Pas de conflit d'intérêt caché</span>
            <strong>Radar live</strong>
          </div>
          <div className="radar-orbit" aria-label="Exemples de signaux PropRadar">
            <span className="radar-ring radar-ring-outer" />
            <span className="radar-ring radar-ring-mid" />
            <span className="radar-ring radar-ring-inner" />
            <span className="radar-sweep" />
            {radarSignals.map((signal) => {
              const firm = signal.firm;
              if (!firm) return null;

              return (
                <Link
                  href={`/firm/${firm.slug}`}
                  className={`radar-dot ${signal.className}`}
                  title={`${signal.label}: ${firm.name} (${firm.score}/100)`}
                  key={`${signal.label}-${firm.slug}`}
                >
                  <span className="sr-only">{signal.label}: {firm.name}, score {firm.score}/100</span>
                </Link>
              );
            })}
          </div>
          <div className="radar-legend">
            {radarSignals.map((signal) => {
              const firm = signal.firm;
              if (!firm) return null;

              return (
                <Link href={`/firm/${firm.slug}`} key={`legend-${signal.label}-${firm.slug}`}>
                  <span className={`legend-dot ${signal.className}`} />
                  <strong>{signal.label}</strong>
                  <small>{firm.name} - {firm.score}/100</small>
                </Link>
              );
            })}
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
            <div className="metric">
              <strong>{archivedFirmsCount}</strong>
              <span>fermees / archives</span>
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
            <div className="eyebrow">Guides decision</div>
            <h2>Quatre portes d entree pour choisir plus vite.</h2>
          </div>
          <p className="section-note">
            Le comparateur est dense. Ces guides isolent les questions les plus importantes avant achat.
          </p>
        </div>
        <div className="guide-entry-grid">
          <Link href="/meilleures-prop-firms" className="guide-entry-card guide-entry-primary">
            <span>Classement</span>
            <strong>Meilleures prop firms fiables</strong>
            <small>Score, prix, payout, Trustpilot filtre et conflit commercial visibles ensemble.</small>
          </Link>
          <Link href="/risques-payout" className="guide-entry-card">
            <span>Payout Watch</span>
            <strong>Risques de retrait a verifier</strong>
            <small>Retards, refus, incidents et signaux operationnels avant de payer un challenge.</small>
          </Link>
          <Link href="/trustpilot-prop-firms" className="guide-entry-card">
            <span>Avis publics</span>
            <strong>Lire Trustpilot sans se faire pieger</strong>
            <small>La note brute est separee du niveau de fiabilite estime par PropRadar.</small>
          </Link>
          <Link href="/guides" className="guide-entry-card">
            <span>Bibliotheque</span>
            <strong>Guides par recherche trader</strong>
            <small>Prop firm futures, news trading, SMC, payout rapide, consistency rule et comparatifs.</small>
          </Link>
        </div>
      </section>

      <section className="container section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Recherches populaires</div>
            <h2>Guides essentiels avant de payer un challenge.</h2>
          </div>
          <Link href="/guides" className="btn">Voir tous les guides</Link>
        </div>
        <div className="guide-entry-grid seo-guide-grid">
          {homepageGuides.map((guide) => (
            <Link href={`/guides/${guide.slug}`} className="guide-entry-card" key={guide.slug}>
              <span>{guide.eyebrow}</span>
              <strong>{guide.title}</strong>
              <small>{guide.primaryKeywords.join(' / ')}</small>
              <small>{selectGuideFirms(guide, 12).length} firm(s) reliee(s)</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section strength-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Atouts PropRadar</div>
            <h2>Comparateur indépendant, preuves visibles.</h2>
          </div>
          <p className="section-note">
            Les meilleurs comparateurs ne poussent pas seulement une promo. Ils rendent les risques visibles avant le paiement.
          </p>
        </div>
        <div className="strength-proof-grid">
          <Link href="/comparateur" className="strength-proof-card strength-proof-primary">
            <span>Couverture large</span>
            <strong>{propFirms.length}</strong>
            <small>prop firms suivies, y compris petites firms et archives de risque.</small>
          </Link>
          <Link href="/audit" className="strength-proof-card">
            <span>Sources & audit</span>
            <strong>{sourcedFirms}</strong>
            <small>dossiers déjà vérifiés ou partiellement sourcés, avec liens conservés.</small>
          </Link>
          <Link href="/comparateur" className="strength-proof-card">
            <span>Conflits d'intérêt</span>
            <strong>{noConflictFirms}</strong>
            <small>firms sans lien commercial contre {affiliateFirms} affiliation(s) affichée(s).</small>
          </Link>
          <Link href="/regles" className="strength-proof-card">
            <span>Sources officielles</span>
            <strong>{officialSourceCount}</strong>
            <small>liens de référence reliés aux fiches pour relire les conditions.</small>
          </Link>
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
        <div className="section-heading">
          <div>
            <div className="eyebrow">Parcours consommateur</div>
            <h2>Une visite doit aider à décider, pas seulement à cliquer.</h2>
          </div>
        </div>
        <div className="decision-path">
          <Link href="/comparateur" className="decision-step">
            <span>01</span>
            <strong>Comparer sans angle mort</strong>
            <small>Prix, score, drawdown, Reddit, Trustpilot, payout et conflit commercial restent côte à côte.</small>
          </Link>
          <Link href="/regles" className="decision-step">
            <span>02</span>
            <strong>Lire les clauses dangereuses</strong>
            <small>News, rollover, trailing drawdown, EA, consistency et payout caps sortent des petites lignes.</small>
          </Link>
          <Link href="/promos" className="decision-step">
            <span>03</span>
            <strong>Utiliser les promos prudemment</strong>
            <small>Une réduction n'est utile que si les règles restent bonnes pour le trader.</small>
          </Link>
          <Link href="/audit" className="decision-step">
            <span>04</span>
            <strong>Contrôler le niveau de preuve</strong>
            <small>Chaque fiche assume ce qui est vérifié, partiel ou encore à sourcer.</small>
          </Link>
        </div>
      </section>

      <section className="container section">
        <div className="grid-2">
          <div className="panel signal-panel signal-panel-payout">
            <div className="eyebrow">Alertes payout</div>
            <h2>Firms à lire deux fois</h2>
            <p className="muted">Le radar suit {payoutTrackedCount} firm(s) avec un risque payout supérieur à faible.</p>
            <ul className="compact-signal-list large">
              {payoutAlerts.map((firm) => (
                <li key={firm.slug}>
                  <Link href={`/firm/${firm.slug}`}>{firm.name}</Link>
                  <span className={`badge ${firm.reviewSignals.payoutRiskScore >= 65 ? 'badge-red' : 'badge-amber'}`}>{firm.reviewSignals.payoutIncidentStatus}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="panel signal-panel signal-panel-reviews">
            <div className="eyebrow">Avis filtrés</div>
            <h2>Trustpilot à pondérer</h2>
            <p className="muted">{trustpilotWatchCount} firm(s) ont au moins une alerte d'avis ou de signal marketing.</p>
            <ul className="compact-signal-list large">
              {reviewAlerts.map((firm) => (
                <li key={firm.slug}>
                  <Link href={`/firm/${firm.slug}`}>{firm.name}</Link>
                  <span className={`badge ${(firm.reviewSignals.manipulationRiskScore ?? 0) >= 80 ? 'badge-red' : 'badge-amber'}`}>{firm.reviewSignals.manipulationRisk ?? 'Moyen'}</span>
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
              <li>X/Twitter Watch : plaintes virales, retours récents et signaux rapides à recouper.</li>
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
