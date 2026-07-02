'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import FirmLogo from '../components/FirmLogo';
import type { PropFirm } from '../lib/propFirms';
import {
  formatUsd,
  payoutRiskClass,
  propFirms,
  relationshipClass,
  reviewReliabilityClass,
  scoreClass,
  statusClass,
  topFirms,
} from '../lib/propFirms';

type MarketChoice = 'Forex/CFD' | 'Futures' | 'Crypto' | 'Actions' | 'Tous';
type StyleChoice =
  | 'SMC / ICT'
  | 'Swing trading'
  | 'Day trading'
  | 'Scalping'
  | 'News trading'
  | 'EA / Algo'
  | 'Breakout'
  | 'Debutant prudent';
type PriorityChoice = 'Payout' | 'Regles' | 'Prix' | 'Score global';
type DrawdownChoice = 'Static/EOD' | 'Trailing accepte' | 'Peu importe';
type BudgetChoice = '75' | '150' | '300' | '1000' | 'Tous';

const defaultCompare = ['ftmo', 'the5ers', 'topstep'];

const marketChoices: MarketChoice[] = ['Forex/CFD', 'Futures', 'Crypto', 'Actions', 'Tous'];
const styleChoices: StyleChoice[] = [
  'SMC / ICT',
  'Day trading',
  'Swing trading',
  'Scalping',
  'News trading',
  'EA / Algo',
  'Breakout',
  'Debutant prudent',
];
const priorityChoices: PriorityChoice[] = ['Payout', 'Regles', 'Prix', 'Score global'];
const drawdownChoices: DrawdownChoice[] = ['Static/EOD', 'Trailing accepte', 'Peu importe'];
const budgetChoices: BudgetChoice[] = ['75', '150', '300', '1000', 'Tous'];

const styleNotes: Record<StyleChoice, string> = {
  'SMC / ICT':
    'Priorite aux firms lisibles pour trading manuel : drawdown clair, indices/forex, payout solide et peu de clauses floues.',
  'Swing trading':
    'Recherche des firms plus tolerantes aux positions gardees, avec drawdown Static/EOD et risque payout faible.',
  'Day trading':
    'Profil intraday classique : execution quotidienne, budget raisonnable, regles claires et score global solide.',
  Scalping:
    'Profil court terme : eviter les firms qui limitent trop les trades rapides, news, EA ou pratiques jugees abusives.',
  'News trading':
    'Profil tres sensible : l outil favorise les firms ou la news est autorisee ou moins restrictive.',
  'EA / Algo':
    'Profil automatisation : l outil favorise les firms qui acceptent les EA ou les autorisent sur demande.',
  Breakout:
    'Profil cassure de range / momentum : l outil favorise les firms intraday avec drawdown lisible et payout propre.',
  'Debutant prudent':
    'Profil securite : score fort, payout faible risque, drawdown non trailing et regles simples avant tout.',
};

function labelIncludes(value: string, pattern: RegExp) {
  return pattern.test(value.toLowerCase());
}

function isClosed(firm: PropFirm) {
  return labelIncludes(firm.status, /ferm/);
}

function isWatchlist(firm: PropFirm) {
  return labelIncludes(firm.status, /surveiller/);
}

function isNewsAllowed(firm: PropFirm) {
  return labelIncludes(firm.newsTrading, /autoris/);
}

function isNewsBlocked(firm: PropFirm) {
  return labelIncludes(firm.newsTrading, /restreint|non recommand/);
}

function marketMatch(firm: PropFirm, market: MarketChoice) {
  if (market === 'Tous') return true;
  const text = `${firm.styles.join(' ')} ${firm.bestFor} ${firm.products.map((product) => product.tradableAssets.join(' ')).join(' ')}`.toLowerCase();

  if (market === 'Forex/CFD') return /forex|cfd|indices|metaux|mati/i.test(text) && !/futures/.test(text);
  return text.includes(market.toLowerCase());
}

function styleFit(firm: PropFirm, style: StyleChoice) {
  const text = `${firm.styles.join(' ')} ${firm.bestFor} ${firm.products.map((product) => product.description).join(' ')}`.toLowerCase();

  if (style === 'Debutant prudent') {
    return firm.reviewSignals.payoutRisk === 'Faible' && firm.drawdownType !== 'Trailing' ? 22 : firm.status === 'Active' ? 8 : -10;
  }

  if (style === 'SMC / ICT') {
    let fit = 0;
    if (/forex|indices|cfd/.test(text)) fit += 10;
    if (firm.drawdownType === 'Static' || firm.drawdownType === 'EOD') fit += 14;
    if (firm.drawdownType === 'Hybride') fit += 6;
    if (firm.reviewSignals.payoutRisk === 'Faible') fit += 10;
    if (firm.newsTrading === 'Variable') fit += 3;
    if (firm.eaAllowed === 'Non') fit += 4;
    if (firm.drawdownType === 'Trailing') fit -= 10;
    return fit;
  }

  if (style === 'Swing trading') {
    let fit = firm.drawdownType === 'Static' || firm.drawdownType === 'EOD' ? 22 : firm.drawdownType === 'Hybride' ? 8 : -12;
    if (firm.reviewSignals.payoutRisk === 'Faible') fit += 8;
    if (isNewsBlocked(firm)) fit -= 4;
    return fit;
  }

  if (style === 'Day trading') {
    let fit = firm.status === 'Active' ? 12 : -6;
    if (firm.drawdownType === 'Static' || firm.drawdownType === 'EOD' || firm.drawdownType === 'Hybride') fit += 8;
    if (firm.priceFrom > 0 && firm.priceFrom <= 150) fit += 6;
    if (firm.reviewSignals.payoutRisk !== 'Critique') fit += 8;
    return fit;
  }

  if (style === 'Scalping') {
    let fit = text.includes('scalping') ? 16 : 6;
    if (isNewsBlocked(firm)) fit -= 7;
    if (firm.eaAllowed === 'Non') fit -= 4;
    if (firm.reviewSignals.payoutRisk === 'Faible') fit += 4;
    return fit;
  }

  if (style === 'News trading') {
    if (isNewsAllowed(firm)) return 18;
    if (isNewsBlocked(firm)) return -18;
    return 4;
  }

  if (style === 'EA / Algo') {
    if (firm.eaAllowed === 'Oui') return 18;
    if (firm.eaAllowed === 'Sur demande') return 8;
    if (firm.eaAllowed === 'Non') return -18;
    return 2;
  }

  if (style === 'Breakout') {
    let fit = firm.status === 'Active' ? 8 : -8;
    if (firm.drawdownType === 'Static' || firm.drawdownType === 'EOD') fit += 10;
    if (firm.newsTrading === 'Variable' || isNewsAllowed(firm)) fit += 5;
    if (firm.reviewSignals.payoutRisk === 'Faible') fit += 8;
    return fit;
  }

  return firm.status === 'Active' ? 7 : -4;
}

function recommendationScore(
  firm: PropFirm,
  market: MarketChoice,
  style: StyleChoice,
  budget: BudgetChoice,
  priority: PriorityChoice,
  drawdown: DrawdownChoice
) {
  let score = firm.score;

  if (firm.status === 'Active') score += 10;
  if (isWatchlist(firm)) score -= 12;
  if (isClosed(firm)) score -= 100;

  score += marketMatch(firm, market) ? 18 : -24;
  score += styleFit(firm, style);

  if (budget !== 'Tous') {
    const maxBudget = Number(budget);
    if (firm.priceFrom <= 0) score -= 4;
    else if (firm.priceFrom <= maxBudget) score += priority === 'Prix' ? 22 : 10;
    else score -= Math.min(32, Math.round((firm.priceFrom - maxBudget) / 8));
  }

  if (priority === 'Payout') score -= Math.round(firm.reviewSignals.payoutRiskScore * 0.45);
  else score -= Math.round(firm.reviewSignals.payoutRiskScore * 0.25);

  if (priority === 'Regles') {
    if (firm.drawdownType === 'Static' || firm.drawdownType === 'EOD') score += 12;
    if (firm.newsTrading === 'Variable' || firm.eaAllowed === 'Variable') score -= 8;
  }

  if (priority === 'Score global') score += Math.round(firm.score * 0.18);

  if (drawdown === 'Static/EOD') {
    score += firm.drawdownType === 'Static' || firm.drawdownType === 'EOD' ? 14 : -10;
  }

  if (drawdown === 'Trailing accepte' && firm.drawdownType === 'Trailing') score += 6;

  return score;
}

function bestReason(firm: PropFirm, style: StyleChoice, priority: PriorityChoice) {
  if (priority === 'Payout' && firm.reviewSignals.payoutRisk === 'Faible') return 'Risque payout faible et score global solide.';
  if (style === 'SMC / ICT' && (firm.drawdownType === 'Static' || firm.drawdownType === 'EOD')) return 'Bon fit SMC manuel : drawdown lisible et regles a relire avant execution.';
  if (style === 'Swing trading' && (firm.drawdownType === 'Static' || firm.drawdownType === 'EOD')) return 'Drawdown plus lisible pour garder des positions.';
  if (style === 'Day trading' && firm.status === 'Active') return 'Bon profil intraday : firm active, score exploitable et signaux comparables.';
  if (style === 'Scalping') return 'A verifier sur les clauses de trades rapides, news et strategies interdites.';
  if (style === 'EA / Algo' && firm.eaAllowed === 'Oui') return 'EA autorises, avec regles a relire avant usage.';
  if (style === 'News trading' && isNewsAllowed(firm)) return 'News trading plus permissif que la moyenne.';
  if (style === 'Breakout') return 'Profil momentum : surveiller drawdown, spread et regles de consistency.';
  if (priority === 'Prix' && firm.priceFrom > 0) return `Ticket d'entree autour de ${formatUsd(firm.priceFrom)}.`;
  return firm.bestFor;
}

export default function OutilsClient() {
  const allOptions = useMemo(() => [...topFirms].slice(0, 90), []);
  const [compareSlugs, setCompareSlugs] = useState(defaultCompare);
  const [market, setMarket] = useState<MarketChoice>('Forex/CFD');
  const [style, setStyle] = useState<StyleChoice>('SMC / ICT');
  const [budget, setBudget] = useState<BudgetChoice>('150');
  const [priority, setPriority] = useState<PriorityChoice>('Payout');
  const [drawdown, setDrawdown] = useState<DrawdownChoice>('Static/EOD');

  const selectedFirms = compareSlugs
    .map((slug) => propFirms.find((firm) => firm.slug === slug))
    .filter((firm): firm is PropFirm => Boolean(firm));

  const recommendations = useMemo(() => {
    return [...propFirms]
      .filter((firm) => !isClosed(firm))
      .map((firm) => ({
        firm,
        fitScore: recommendationScore(firm, market, style, budget, priority, drawdown),
      }))
      .sort((a, b) => b.fitScore - a.fitScore)
      .slice(0, 6);
  }, [budget, drawdown, market, priority, style]);

  function updateCompare(index: number, slug: string) {
    setCompareSlugs((current) => current.map((item, itemIndex) => (itemIndex === index ? slug : item)));
  }

  return (
    <main className="container tools-page">
      <section className="tools-hero">
        <div>
          <div className="eyebrow">Outils PropRadar</div>
          <h1>Compare les prop firms et trouve celle qui colle a ton style.</h1>
          <p className="lead">
            Mets plusieurs firms cote a cote, puis utilise le selecteur pour trouver une prop adaptee au SMC / ICT,
            swing trading, day trading, scalping, news trading, EA ou breakout.
          </p>
          <div className="actions">
            <a href="#comparatif" className="btn btn-primary">Comparer des firms</a>
            <a href="#style-finder" className="btn">Trouver ma prop firm</a>
          </div>
        </div>
        <div className="tools-hero-panel">
          <div><strong>{propFirms.length}</strong><span>firms dans le radar</span></div>
          <div><strong>2</strong><span>outils interactifs</span></div>
          <div><strong>0</strong><span>score influence par affiliation</span></div>
        </div>
      </section>

      <section className="section" id="comparatif">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Comparatif cote a cote</div>
            <h2>Choisis jusqu'a 3 prop firms.</h2>
          </div>
          <Link href="/comparateur" className="btn">Voir le comparateur complet</Link>
        </div>

        <div className="compare-select-grid">
          {compareSlugs.map((slug, index) => (
            <label className="tool-field" key={`${slug}-${index}`}>
              <span>Firm {index + 1}</span>
              <select value={slug} onChange={(event) => updateCompare(index, event.target.value)}>
                {allOptions.map((firm) => (
                  <option value={firm.slug} key={firm.slug}>{firm.name}</option>
                ))}
              </select>
            </label>
          ))}
        </div>

        <div className="compare-board">
          {selectedFirms.map((firm) => (
            <article className="compare-card" key={firm.slug}>
              <div className="compare-card-head">
                <div className="firm-result-main">
                  <FirmLogo name={firm.name} logoDomain={firm.logoDomain} />
                  <div>
                    <Link href={`/firm/${firm.slug}`} className="firm-result-name">{firm.name}</Link>
                    <span>{firm.bestFor}</span>
                  </div>
                </div>
                <span className={`badge ${scoreClass(firm.score)}`}>{firm.score}/100</span>
              </div>
              <div className="compare-metric-grid">
                <div><span>Prix min.</span><strong>{formatUsd(firm.priceFrom)}</strong></div>
                <div><span>Statut</span><strong className={`badge ${statusClass(firm.status)}`}>{firm.status}</strong></div>
                <div><span>Drawdown</span><strong>{firm.drawdownType}</strong></div>
                <div><span>News</span><strong>{firm.newsTrading}</strong></div>
                <div><span>EA</span><strong>{firm.eaAllowed}</strong></div>
                <div><span>Payout</span><strong className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{firm.reviewSignals.payoutRisk}</strong></div>
                <div><span>Trustpilot</span><strong className={`badge ${reviewReliabilityClass(firm.reviewSignals.trustpilotReliability)}`}>{firm.reviewSignals.trustpilotReliability}</strong></div>
                <div><span>Affiliation</span><strong className={`badge ${relationshipClass(firm.commercialRelationship)}`}>{firm.commercialRelationship === 'Affiliation transparente' ? 'Affilie' : 'Aucun conflit'}</strong></div>
              </div>
              <p>{firm.reviewSignals.radarVerdict ?? firm.verdict}</p>
              <Link href={`/firm/${firm.slug}`} className="btn btn-primary">Lire la fiche</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="style-finder">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Selecteur par style</div>
            <h2>Trouve une prop firm adaptee a ton profil.</h2>
          </div>
          <p className="section-note">Ce score de fit ne remplace pas la fiche : il sert a prioriser ta shortlist.</p>
        </div>

        <div className="style-tool">
          <div className="style-controls">
            <div className="style-note">
              <span>Style selectionne</span>
              <strong>{style}</strong>
              <p>{styleNotes[style]}</p>
            </div>
            <label className="tool-field">
              <span>Marche</span>
              <select value={market} onChange={(event) => setMarket(event.target.value as MarketChoice)}>
                {marketChoices.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label className="tool-field">
              <span>Style</span>
              <select value={style} onChange={(event) => setStyle(event.target.value as StyleChoice)}>
                {styleChoices.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label className="tool-field">
              <span>Budget max</span>
              <select value={budget} onChange={(event) => setBudget(event.target.value as BudgetChoice)}>
                {budgetChoices.map((item) => <option value={item} key={item}>{item === 'Tous' ? 'Tous budgets' : `${item}$`}</option>)}
              </select>
            </label>
            <label className="tool-field">
              <span>Priorite</span>
              <select value={priority} onChange={(event) => setPriority(event.target.value as PriorityChoice)}>
                {priorityChoices.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label className="tool-field">
              <span>Drawdown</span>
              <select value={drawdown} onChange={(event) => setDrawdown(event.target.value as DrawdownChoice)}>
                {drawdownChoices.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
          </div>

          <div className="recommendation-list">
            {recommendations.map(({ firm, fitScore }, index) => (
              <Link href={`/firm/${firm.slug}`} className="recommendation-row" key={firm.slug}>
                <span className="guide-rank">{index + 1}</span>
                <div className="firm-result-main">
                  <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                  <div>
                    <strong>{firm.name}</strong>
                    <span>{bestReason(firm, style, priority)}</span>
                  </div>
                </div>
                <div><span>Fit</span><strong>{Math.min(100, Math.max(0, Math.round(fitScore)))}/100</strong></div>
                <div><span>Prix</span><strong>{formatUsd(firm.priceFrom)}</strong></div>
                <div><span>Payout</span><strong className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{firm.reviewSignals.payoutRisk}</strong></div>
                <span className={`badge ${scoreClass(firm.score)}`}>{firm.score}/100</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
