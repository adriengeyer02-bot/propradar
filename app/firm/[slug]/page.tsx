import Link from 'next/link';
import { notFound } from 'next/navigation';
import FirmLogo from '../../components/FirmLogo';
import {
  FTMO_AFFILIATE_URL,
  auditStatusClass,
  formatUsd,
  getFirmBySlug,
  manipulationRiskClass,
  payoutRiskClass,
  propFirms,
  relationshipClass,
  reviewReliabilityClass,
  scoreClass,
  type PropFirm,
} from '../../lib/propFirms';
import { SITE_NAME, SITE_URL } from '../../lib/site';
import { getFirmRelatedGuides } from '../../lib/seoGuides';

type Props = {
  params: Promise<{ slug: string }>;
};

const FTMO_BANNER_URL = 'https://cdn.ftmo.com/aff-banner.160x600';
export const revalidate = 86400;

export function generateStaticParams() {
  return propFirms.map((firm) => ({ slug: firm.slug }));
}

function jsonLd(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, '\\u003c'),
  };
}

function relationshipLabel(relationship: PropFirm['commercialRelationship']) {
  return relationship === 'Aucune' ? 'Sans affiliation' : relationship;
}

function operationalStatusLabel(firm: PropFirm) {
  return firm.status === 'Fermée' ? 'Fermée' : 'Active';
}

function operationalStatusClass(firm: PropFirm) {
  return firm.status === 'Fermée' ? 'badge-red' : 'badge-green';
}

function firmRiskLabel(firm: PropFirm) {
  if (firm.status === 'Fermée' || firm.score < 40 || firm.reviewSignals.payoutRisk === 'Critique') return 'Critique';
  if (firm.status === 'À surveiller' || firm.score < 70 || firm.reviewSignals.payoutRiskScore >= 40) return 'À surveiller';
  return 'Fiable';
}

function firmRiskClass(firm: PropFirm) {
  const risk = firmRiskLabel(firm);
  if (risk === 'Fiable') return 'badge-green';
  if (risk === 'À surveiller') return 'badge-amber';
  return 'badge-red';
}

type ScoreProofRow = {
  label: string;
  value: string;
  href?: string;
};

function sourceUrl(firm: PropFirm, match: RegExp) {
  return firm.sources.find((source) => match.test(`${source.label} ${source.url}`))?.url;
}

function hasConcretePayoutIssues(firm: PropFirm) {
  const placeholderPattern = /rev.rifier|conditions commerciales|statuts/i;
  return firm.reviewSignals.payoutIssues.some((issue) => !placeholderPattern.test(issue));
}

function proofValue(row: ScoreProofRow) {
  if (row.href) {
    return (
      <a href={row.href} target="_blank" rel="noreferrer">
        {row.value}
      </a>
    );
  }

  return <strong>{row.value}</strong>;
}

function scoreProofRows(firm: PropFirm, kind: 'reddit' | 'trustpilot' | 'payout' | 'manipulation'): ScoreProofRow[] {
  if (kind === 'reddit') {
    return [
      { label: 'Source', value: firm.reviewSignals.redditSource === 'Estimation PropRadar' ? 'Estimation PropRadar, thread public non relie' : firm.reviewSignals.redditSource ?? 'A documenter' },
      { label: 'Echantillon', value: `${firm.reviewSignals.redditSampleSize ?? 0} mention(s) classee(s)` },
      { label: 'Confiance', value: firm.reviewSignals.redditConfidence ?? 'Faible' },
    ];
  }

  if (kind === 'trustpilot') {
    const trustpilotUrl = firm.reviewSignals.trustpilotSourceUrl ?? sourceUrl(firm, /trustpilot/i);

    return [
      { label: 'Note brute', value: firm.trustpilotRating ? `${firm.trustpilotRating}/5` : 'Non renseignee dans PropRadar' },
      { label: 'Source', value: trustpilotUrl ? 'Page Trustpilot listee' : 'Lien ou revue a completer', href: trustpilotUrl },
      { label: 'Statut', value: firm.trustpilotRating ? 'Score pondere' : 'Score provisoire' },
    ];
  }

  if (kind === 'payout') {
    const payoutUrl = sourceUrl(firm, /payout|fast/i);

    return [
      { label: 'Preuve visible', value: firm.payoutProof && payoutUrl ? 'Page payout officielle listee' : firm.payoutProof ? 'Signal suivi, preuve independante a publier' : 'Insuffisante', href: firm.payoutProof ? payoutUrl : undefined },
      { label: 'Incidents', value: hasConcretePayoutIssues(firm) ? `${firm.reviewSignals.payoutIncidentCount ?? firm.incidents} signal(s) documente(s)` : 'Aucun incident detaille dans PropRadar' },
      { label: 'Dernier check', value: firm.reviewSignals.lastSignalCheck },
    ];
  }

  return [
    { label: 'Base', value: 'Trustpilot + incidents + signaux marketing' },
    { label: 'Alerte avis', value: `${firm.reviewSignals.trustpilotFlaggedReviewCount ?? 0} alerte(s) suivie(s)` },
    { label: 'Statut', value: firm.reviewSignals.trustpilotReliability },
  ];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const firm = getFirmBySlug(slug);

  if (!firm) {
    return { title: 'Firm introuvable - PropRadar' };
  }

  return {
    title: `${firm.name} - analyse PropRadar`,
    description: `${firm.name} sur PropRadar : score ${firm.score}/100, risque payout ${firm.reviewSignals.payoutRisk}, fiabilite Trustpilot ${firm.reviewSignals.trustpilotReliability}. ${firm.verdict}`,
    alternates: {
      canonical: `/firm/${firm.slug}`,
    },
    openGraph: {
      title: `${firm.name} - analyse PropRadar`,
      description: firm.verdict,
      url: `${SITE_URL}/firm/${firm.slug}`,
      type: 'article',
    },
  };
}

export default async function FirmPage({ params }: Props) {
  const { slug } = await params;
  const firm = getFirmBySlug(slug);

  if (!firm) {
    notFound();
  }

  const isFtmo = firm.slug === 'ftmo';
  const relatedGuides = getFirmRelatedGuides(firm, 4);
  const pageUrl = `${SITE_URL}/firm/${firm.slug}`;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${firm.name} avis PropRadar`,
    description: firm.verdict,
    dateModified: firm.lastReviewed,
    datePublished: firm.lastReviewed,
    mainEntityOfPage: pageUrl,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      '@type': 'Organization',
      name: firm.name,
      url: firm.sources[0]?.url ?? pageUrl,
    },
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Comparateur',
        item: `${SITE_URL}/comparateur`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: firm.name,
        item: pageUrl,
      },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema)} />

      <section className="container detail-header">
        <Link href="/comparateur" className="btn" style={{ marginBottom: 18 }}>
          Retour au comparateur
        </Link>

        <div className="panel firm-hero">
          <div>
            <div className="firm-cell" style={{ marginBottom: 18 }}>
              <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="lg" />
              <div>
                <div className="eyebrow">{firm.headquarters} · fondée en {firm.founded}</div>
                <h1 style={{ marginBottom: 6 }}>{firm.name}</h1>
                <div className="firm-hero-badges">
                  <span className={`badge ${operationalStatusClass(firm)}`}>Statut - {operationalStatusLabel(firm)}</span>
                  <span className={`badge ${firmRiskClass(firm)}`}>Risque - {firmRiskLabel(firm)}</span>
                </div>
              </div>
            </div>
            <p className="lead">{firm.verdict}</p>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div className="muted">Score PropRadar</div>
            <div className="score" style={{ fontSize: 64 }}>{firm.score}</div>
            <span className={`badge ${scoreClass(firm.score)}`}>/100</span>
            <div style={{ marginTop: 12 }}>
              <span className={`badge ${relationshipClass(firm.commercialRelationship)}`}>{relationshipLabel(firm.commercialRelationship)}</span>
            </div>
          </div>
        </div>

        <div className="stat-strip">
          <div className="stat"><span>Prix minimum</span><strong>{formatUsd(firm.priceFrom)}</strong></div>
          <div className="stat"><span>Profit split</span><strong>{firm.profitSplit > 0 ? `${firm.profitSplit}%` : 'N/A'}</strong></div>
          <div className="stat"><span>Drawdown</span><strong>{firm.drawdownType}</strong></div>
          <div className="stat"><span>News trading</span><strong>{firm.newsTrading}</strong></div>
          <div className="stat"><span>Payout</span><strong>{firm.payoutDelay}</strong></div>
        </div>
        {firm.commercialNote ? (
          <div className="panel" style={{ marginTop: 18 }}>
            <div className="eyebrow">Transparence commerciale</div>
            <p className="muted" style={{ marginBottom: 0 }}>{firm.commercialNote}</p>
          </div>
        ) : null}

        {isFtmo ? (
          <div className="panel ftmo-affiliate-panel">
            <div>
              <div className="eyebrow">Partenaire FTMO</div>
              <h2>Accéder au challenge via le lien PropRadar</h2>
              <p className="muted">
                Ce lien est affilié et n'influence pas le score PropRadar. FTMO reste classée selon les mêmes critères que les autres firms : règles, payouts, signaux publics et risque opérationnel.
              </p>
              <a href={FTMO_AFFILIATE_URL} target="_blank" rel="noreferrer sponsored" className="btn btn-primary">
                Ouvrir FTMO
              </a>
            </div>
            <a href={FTMO_AFFILIATE_URL} target="_blank" rel="noreferrer sponsored" className="ftmo-banner-link">
              <img src={FTMO_BANNER_URL} alt="FTMO.com - For serious traders" />
            </a>
          </div>
        ) : null}

        <nav className="firm-tabs" aria-label="Navigation de la fiche">
          <a href="#lecture">Lecture rapide</a>
          <a href="#audit">Audit avis & payouts</a>
          <a href="#produits">Produits</a>
          <a href="#guides">Guides lies</a>
          <a href="#sources">Sources & preuve</a>
        </nav>
      </section>

      <section className="container section quick-read-section" id="lecture">
        <div className="grid-2">
          <div className="panel quick-read-card quick-read-strong">
            <div className="eyebrow">Lecture rapide</div>
            <h2>Forces</h2>
            <ul className="risk-list">
              {firm.strengths.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="panel quick-read-card quick-read-watch">
            <div className="eyebrow">Points de vigilance</div>
            <h2>Faiblesses</h2>
            <ul className="risk-list">
              {firm.weaknesses.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="container section" id="audit">
        <div className="eyebrow">Avis, Reddit et payouts</div>
        <h2>Signal communautaire filtré</h2>
        <div className="grid-3">
          <div className="card">
            <div className="muted">Reddit score</div>
            <div className="score">{firm.reviewSignals.redditScore}/100</div>
            <span className={`badge ${scoreClass(firm.reviewSignals.redditScore)}`}>{firm.reviewSignals.redditSignal}</span>
            {firm.reviewSignals.redditSource === 'Estimation PropRadar' ? <span className="badge badge-amber">Score estime</span> : null}
            <div className="sentiment-breakdown">
              <span><strong>{firm.reviewSignals.redditPositiveMentions ?? 0}</strong> positifs</span>
              <span><strong>{firm.reviewSignals.redditNegativeMentions ?? 0}</strong> négatifs</span>
              <span><strong>{firm.reviewSignals.redditNeutralMentions ?? 0}</strong> neutres</span>
            </div>
            <p className="muted" style={{ marginTop: 12, marginBottom: 0 }}>{firm.reviewSignals.redditMentions}</p>
            <div className="score-proof">
              {scoreProofRows(firm, 'reddit').map((row) => (
                <div key={row.label}><span>{row.label}</span>{proofValue(row)}</div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="muted">Fiabilité des avis Trustpilot</div>
            <div className="score">{firm.reviewSignals.trustpilotReliabilityScore}/100</div>
            <span className={`badge ${reviewReliabilityClass(firm.reviewSignals.trustpilotReliability)}`}>{firm.reviewSignals.trustpilotReliability}</span>
            {!firm.trustpilotRating ? <span className="badge badge-amber">Score provisoire</span> : null}
            <div className="sentiment-breakdown">
              {firm.trustpilotRating ? <span><strong>{firm.trustpilotRating}/5</strong> note brute</span> : null}
              {firm.reviewSignals.trustpilotReviewCount ? <span><strong>{firm.reviewSignals.trustpilotReviewCount.toLocaleString('fr-FR')}</strong> avis</span> : null}
              <span><strong>{firm.reviewSignals.trustpilotFlaggedReviewCount ?? 0}</strong> alerte(s) avis suivie(s)</span>
            </div>
            <p className="muted" style={{ marginTop: 12, marginBottom: 0 }}>{firm.reviewSignals.trustpilotNote}</p>
            {firm.reviewSignals.trustpilotSourceUrl ? (
              <a href={firm.reviewSignals.trustpilotSourceUrl} target="_blank" rel="noreferrer" className="quality-tag">
                Voir la page Trustpilot
              </a>
            ) : null}
            <div className="score-proof">
              {scoreProofRows(firm, 'trustpilot').map((row) => (
                <div key={row.label}><span>{row.label}</span>{proofValue(row)}</div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="muted">Risque payout</div>
            <div className="score">{firm.reviewSignals.payoutRiskScore}/100</div>
            <span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{firm.reviewSignals.payoutRisk}</span>
            <p className="muted" style={{ marginTop: 12, marginBottom: 0 }}>
              {firm.reviewSignals.payoutIncidentStatus} · {firm.reviewSignals.payoutIncidentCount ?? firm.incidents} signal(s) suivi(s)
            </p>
            <div className="score-proof">
              {scoreProofRows(firm, 'payout').map((row) => (
                <div key={row.label}><span>{row.label}</span>{proofValue(row)}</div>
              ))}
            </div>
          </div>
        </div>
        <div className="signal-explain-grid">
          <div className="signal-explain-card">
            <div className="eyebrow">Reddit flags</div>
            <ul className="risk-list">
              {(firm.reviewSignals.redditFlags ?? []).map((flag) => <li key={flag}>{flag}</li>)}
            </ul>
          </div>
          <div className="signal-explain-card">
            <div className="eyebrow">Trustpilot filtré</div>
            <p className="muted">
              {firm.reviewSignals.trustpilotFlaggedReviewNote}
            </p>
            <ul className="risk-list">
              {(firm.reviewSignals.trustpilotFlags ?? []).map((flag) => <li key={flag}>{flag}</li>)}
            </ul>
          </div>
          <div className="signal-explain-card">
            <div className="eyebrow">Avis manipulables</div>
            <div className="score">{firm.reviewSignals.manipulationRiskScore ?? 50}/100</div>
            <span className={`badge ${manipulationRiskClass(firm.reviewSignals.manipulationRisk ?? 'Moyen')}`}>
              {firm.reviewSignals.manipulationRisk ?? 'Moyen'}
            </span>
            <div className="score-proof">
              {scoreProofRows(firm, 'manipulation').map((row) => (
                <div key={row.label}><span>{row.label}</span>{proofValue(row)}</div>
              ))}
            </div>
          </div>
        </div>
        <div className="panel radar-verdict">
          <div>
            <div className="eyebrow">Verdict radar</div>
            <p className="lead">{firm.reviewSignals.radarVerdict}</p>
          </div>
          <ul className="mini-list">
            {(firm.reviewSignals.confidenceDrivers ?? []).map((driver) => <li key={driver}>{driver}</li>)}
          </ul>
        </div>
      </section>

      <section className="container section" id="produits">
        <div className="eyebrow">Produits</div>
        <h2>Offres suivies</h2>
        {firm.products.length > 0 ? (
          <div className="grid-2">
            {firm.products.map((product) => (
              <article className="card product-card" key={product.id}>
                <div>
                  <span className="badge badge-green">{product.type}</span>
                  {product.isPopular ? <span className="badge badge-amber" style={{ marginLeft: 8 }}>Populaire</span> : null}
                </div>
                <h3>{product.name}</h3>
                <p className="muted">{product.description}</p>
                <div className="stat-strip" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
                  <div className="stat"><span>Compte</span><strong>{formatUsd(product.accountSizeMin)} - {formatUsd(product.accountSizeMax)}</strong></div>
                  <div className="stat"><span>Frais</span><strong>{product.entryFeeMin ? `${formatUsd(product.entryFeeMin)}+` : 'Selon taille / checkout'}</strong></div>
                  <div className="stat"><span>Objectif</span><strong>{product.profitTarget}</strong></div>
                  <div className="stat"><span>Drawdown max</span><strong>{product.maxDrawdown}</strong></div>
                  <div className="stat"><span>Perte jour</span><strong>{product.maxDailyLoss}</strong></div>
                  <div className="stat"><span>Split</span><strong>{product.profitSplit}</strong></div>
                </div>
                <div>
                  <strong>Plateformes</strong>
                  <ul className="mini-list" style={{ marginTop: 8 }}>
                    {product.platforms.map((platform) => <li key={platform}>{platform}</li>)}
                  </ul>
                </div>
                <div>
                  <strong>Actifs</strong>
                  <ul className="mini-list" style={{ marginTop: 8 }}>
                    {product.tradableAssets.map((asset) => <li key={asset}>{asset}</li>)}
                  </ul>
                </div>
                <div className={`badge ${product.hasConsistencyRule ? 'badge-amber' : 'badge-green'}`}>
                  {product.hasConsistencyRule ? product.consistencyRule ?? 'Règle de cohérence à vérifier' : 'Pas de règle de cohérence majeure signalée'}
                </div>
                {product.linkToStart ? (
                  <a
                    href={product.linkToStart}
                    target="_blank"
                    rel={firm.commercialRelationship === 'Affiliation transparente' ? 'noreferrer sponsored' : 'noreferrer'}
                    className="btn btn-primary"
                  >
                    {firm.commercialRelationship === 'Affiliation transparente' ? 'Voir via le lien affilié' : 'Voir l’offre officielle'}
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        ) : (
          <div className="panel">
            <h3>Aucun produit actif recommandé</h3>
            <p className="muted" style={{ marginBottom: 0 }}>
              Cette firm reste dans le radar comme signal de risque historique, mais elle ne doit pas être considérée comme une option d’achat.
            </p>
          </div>
        )}
      </section>

      <section className="container section" id="guides">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Maillage SEO</div>
            <h2>Guides PropRadar lies a {firm.name}</h2>
          </div>
          <p className="section-note">
            Ces liens relient la fiche aux recherches que les traders tapent vraiment avant de choisir.
          </p>
        </div>
        <div className="guide-entry-grid firm-guide-grid">
          {relatedGuides.map((guide) => (
            <Link href={`/guides/${guide.slug}`} className="guide-entry-card" key={guide.slug}>
              <span>{guide.eyebrow}</span>
              <strong>{guide.title}</strong>
              <small>{guide.answer}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section" id="sources">
        <div className="grid-2">
          <div className="panel">
            <div className="eyebrow">Risque opérationnel</div>
            <h2>Incidents et signaux</h2>
            {hasConcretePayoutIssues(firm) ? (
              <ul className="risk-list">
                {firm.reviewSignals.payoutIssues.map((incident) => <li key={incident}>{incident}</li>)}
              </ul>
            ) : (
              <div className="evidence-empty">
                <strong>Aucun incident indépendant détaillé dans PropRadar.</strong>
                <span>La fiche reste prudente tant que les règles, payouts et avis récents ne sont pas sourcés plus finement.</span>
              </div>
            )}
            <p className="muted" style={{ marginTop: 18, marginBottom: 0 }}>{firm.communitySignal}</p>
          </div>
          <div className="panel">
            <div className="eyebrow">Sources</div>
            <h2>Niveau de preuve</h2>
            <div className="audit-source-summary">
              <span className={`badge ${auditStatusClass(firm.auditStatus)}`}>{firm.auditStatus}</span>
              <p className="muted">{firm.auditSummary}</p>
              <div className="audit-source-chips">
                {firm.auditSourcesChecked.map((source) => <span key={source}>{source}</span>)}
              </div>
            </div>
            <h3>Sources à consulter</h3>
            <ul className="source-list">
              {firm.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noreferrer">{source.label}</a>
                </li>
              ))}
            </ul>
            <p className="muted" style={{ marginTop: 18, marginBottom: 0 }}>
              Dernière revue : {firm.lastReviewed}. Les prix et règles doivent être revérifiés sur les sources officielles avant toute décision.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
