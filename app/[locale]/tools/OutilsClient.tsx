'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import FirmLogo from '../../components/FirmLogo';
import CompareTable from '../../components/ui/CompareTable';
import ReliabilityRadar from '../../components/ui/ReliabilityRadar';
import type { PropFirm } from '../../lib/propFirms';
import {
  priceLabel,
  payoutRiskClass,
  propFirms,
  relationshipClass,
  reviewReliabilityClass,
  scoreClass,
  statusClass,
  isProvisional,
  topFirms,
} from '../../lib/propFirms';
import { toEnglishText } from '../../lib/i18n';
import { localePath, type Locale } from '../../lib/locales';
import type { ToolsMessages } from '../../lib/messages/pages/tools';
import type { Messages } from '../../lib/messages';

type RadarLabels = Messages['firm']['relradar'] & { values: Record<string, string> };

function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}

// A watchlist default is not a known drawdown: it never earns fit points.
function knownDrawdown(firm: PropFirm): PropFirm['drawdownType'] | undefined {
  return isProvisional(firm, 'drawdownType') ? undefined : firm.drawdownType;
}

type MarketChoice = 'Forex/CFD' | 'Futures' | 'Crypto' | 'Actions' | 'Tous';
type StyleChoice =
  | 'SMC / ICT'
  | 'Swing trading'
  | 'Day trading'
  | 'Scalping'
  | 'News trading'
  | 'EA / Algo'
  | 'Breakout'
  | 'Débutant prudent';
type PriorityChoice = 'Payout' | 'Règles' | 'Prix' | 'Score global';
type DrawdownChoice = 'Static/EOD' | 'Trailing accepté' | 'Peu importe';
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
  'Débutant prudent',
];
const priorityChoices: PriorityChoice[] = ['Payout', 'Règles', 'Prix', 'Score global'];
const drawdownChoices: DrawdownChoice[] = ['Static/EOD', 'Trailing accepté', 'Peu importe'];
const budgetChoices: BudgetChoice[] = ['75', '150', '300', '1000', 'Tous'];

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
  return labelIncludes(firm.newsTrading, /autoris|allowed/);
}

function isNewsBlocked(firm: PropFirm) {
  return labelIncludes(firm.newsTrading, /restreint|restricted|non recommand|not recommended/);
}

function marketMatch(firm: PropFirm, market: MarketChoice) {
  if (market === 'Tous') return true;
  const text = `${firm.styles.join(' ')} ${firm.bestFor} ${firm.products.map((product) => product.tradableAssets.join(' ')).join(' ')}`.toLowerCase();

  if (market === 'Forex/CFD') return /forex|cfd|indices|metaux|mati/i.test(text) && !/futures/.test(text);
  return text.includes(market.toLowerCase());
}

function styleFit(firm: PropFirm, style: StyleChoice) {
  const text = `${firm.styles.join(' ')} ${firm.bestFor} ${firm.products.map((product) => product.description).join(' ')}`.toLowerCase();

  if (style === 'Débutant prudent') {
    return firm.reviewSignals.payoutRisk === 'Faible' && knownDrawdown(firm) !== undefined && knownDrawdown(firm) !== 'Trailing' ? 22 : firm.status === 'Active' ? 8 : -10;
  }

  if (style === 'SMC / ICT') {
    let fit = 0;
    if (/forex|indices|cfd/.test(text)) fit += 10;
    if (knownDrawdown(firm) === 'Static' || knownDrawdown(firm) === 'EOD') fit += 14;
    if (knownDrawdown(firm) === 'Hybride') fit += 6;
    if (firm.reviewSignals.payoutRisk === 'Faible') fit += 10;
    if (firm.newsTrading === 'Variable') fit += 3;
    if (firm.eaAllowed === 'Non' || firm.eaAllowed === 'No') fit += 4;
    if (knownDrawdown(firm) === 'Trailing') fit -= 10;
    return fit;
  }

  if (style === 'Swing trading') {
    let fit = knownDrawdown(firm) === 'Static' || knownDrawdown(firm) === 'EOD' ? 22 : knownDrawdown(firm) === 'Hybride' ? 8 : -12;
    if (firm.reviewSignals.payoutRisk === 'Faible') fit += 8;
    if (isNewsBlocked(firm)) fit -= 4;
    return fit;
  }

  if (style === 'Day trading') {
    let fit = firm.status === 'Active' ? 12 : -6;
    if (knownDrawdown(firm) === 'Static' || knownDrawdown(firm) === 'EOD' || knownDrawdown(firm) === 'Hybride') fit += 8;
    if (firm.priceFrom > 0 && firm.priceFrom <= 150) fit += 6;
    if (firm.reviewSignals.payoutRisk !== 'Critique') fit += 8;
    return fit;
  }

  if (style === 'Scalping') {
    let fit = text.includes('scalping') ? 16 : 6;
    if (isNewsBlocked(firm)) fit -= 7;
    if (firm.eaAllowed === 'Non' || firm.eaAllowed === 'No') fit -= 4;
    if (firm.reviewSignals.payoutRisk === 'Faible') fit += 4;
    return fit;
  }

  if (style === 'News trading') {
    if (isNewsAllowed(firm)) return 18;
    if (isNewsBlocked(firm)) return -18;
    return 4;
  }

  if (style === 'EA / Algo') {
    if (firm.eaAllowed === 'Oui' || firm.eaAllowed === 'Yes') return 18;
    if (firm.eaAllowed === 'Sur demande' || firm.eaAllowed === 'On request') return 8;
    if (firm.eaAllowed === 'Non' || firm.eaAllowed === 'No') return -18;
    return 2;
  }

  if (style === 'Breakout') {
    let fit = firm.status === 'Active' ? 8 : -8;
    if (knownDrawdown(firm) === 'Static' || knownDrawdown(firm) === 'EOD') fit += 10;
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

  if (priority === 'Règles') {
    if (knownDrawdown(firm) === 'Static' || knownDrawdown(firm) === 'EOD') score += 12;
    if (firm.newsTrading === 'Variable' || firm.eaAllowed === 'Variable') score -= 8;
  }

  if (priority === 'Score global') score += Math.round(firm.score * 0.18);

  if (drawdown === 'Static/EOD') {
    score += knownDrawdown(firm) === 'Static' || knownDrawdown(firm) === 'EOD' ? 14 : -10;
  }

  if (drawdown === 'Trailing accepté' && knownDrawdown(firm) === 'Trailing') score += 6;

  return score;
}

function bestReason(firm: PropFirm, style: StyleChoice, priority: PriorityChoice, m: ToolsMessages, v: (value: string) => string) {
  if (priority === 'Payout' && firm.reviewSignals.payoutRisk === 'Faible') return m.reasonPayout;
  if (style === 'SMC / ICT' && (knownDrawdown(firm) === 'Static' || knownDrawdown(firm) === 'EOD')) return m.reasonSmc;
  if (style === 'Swing trading' && (knownDrawdown(firm) === 'Static' || knownDrawdown(firm) === 'EOD')) return m.reasonSwing;
  if (style === 'Day trading' && firm.status === 'Active') return m.reasonDay;
  if (style === 'Scalping') return m.reasonScalping;
  if (style === 'EA / Algo' && (firm.eaAllowed === 'Oui' || firm.eaAllowed === 'Yes')) return m.reasonEa;
  if (style === 'News trading' && isNewsAllowed(firm)) return m.reasonNews;
  if (style === 'Breakout') return m.reasonBreakout;
  if (priority === 'Prix' && firm.priceFrom > 0) return fill(m.reasonPrice, { price: v(priceLabel(firm)) });
  return toEnglishText(firm.bestFor);
}

type OutilsClientProps = {
  m: ToolsMessages;
  values: Record<string, string>;
  radarLabels: RadarLabels;
  locale: Locale;
};

export default function OutilsClient({ m, values, radarLabels, locale }: OutilsClientProps) {
  const v = (value: string) => values[value] ?? value;
  const L = (path: string) => localePath(locale, path);
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
          <div className="eyebrow">{m.eyebrow}</div>
          <h1>{m.h1}</h1>
          <p className="lead">{m.lead}</p>
          <div className="actions">
            <a href="#comparatif" className="btn btn-primary">{m.ctaCompare}</a>
            <a href="#style-finder" className="btn">{m.ctaFinder}</a>
          </div>
        </div>
        <div className="tools-hero-panel">
          <div><strong>{propFirms.length}</strong><span>{m.heroFirms}</span></div>
          <div><strong>2</strong><span>{m.heroTools}</span></div>
          <div><strong>0</strong><span>{m.heroAffiliation}</span></div>
        </div>
      </section>

      <section className="section" id="comparatif">
        <div className="section-heading">
          <div>
            <div className="eyebrow">{m.compareEyebrow}</div>
            <h2>{m.compareTitle}</h2>
          </div>
          <Link href={L('/prop-firm-comparison')} className="btn">{m.openComparator}</Link>
        </div>

        <div className="compare-select-grid">
          {compareSlugs.map((slug, index) => (
            <label className="tool-field" key={`${slug}-${index}`}>
              <span>{fill(m.firmN, { n: index + 1 })}</span>
              <select value={slug} onChange={(event) => updateCompare(index, event.target.value)}>
                {allOptions.map((firm) => (
                  <option value={firm.slug} key={firm.slug}>{firm.name}</option>
                ))}
              </select>
            </label>
          ))}
        </div>

        {selectedFirms.length ? (
          <div className="pr-compare-layout">
            <ReliabilityRadar firms={selectedFirms} size={300} labels={radarLabels} />
            <CompareTable firms={selectedFirms} labels={m.compare} values={values} locale={locale} />
          </div>
        ) : null}
      </section>

      <section className="section" id="style-finder">
        <div className="section-heading">
          <div>
            <div className="eyebrow">{m.finderEyebrow}</div>
            <h2>{m.finderTitle}</h2>
          </div>
          <p className="section-note">{m.finderNote}</p>
        </div>

        <div className="style-tool">
          <div className="style-controls">
            <div className="style-note">
              <span>{m.selectedStyle}</span>
              <strong>{m.styles[style]}</strong>
              <p>{m.styleNotes[style]}</p>
            </div>
            <label className="tool-field">
              <span>{m.market}</span>
              <select value={market} onChange={(event) => setMarket(event.target.value as MarketChoice)}>
                {marketChoices.map((item) => <option value={item} key={item}>{m.markets[item]}</option>)}
              </select>
            </label>
            <label className="tool-field">
              <span>{m.style}</span>
              <select value={style} onChange={(event) => setStyle(event.target.value as StyleChoice)}>
                {styleChoices.map((item) => <option value={item} key={item}>{m.styles[item]}</option>)}
              </select>
            </label>
            <label className="tool-field">
              <span>{m.maxBudget}</span>
              <select value={budget} onChange={(event) => setBudget(event.target.value as BudgetChoice)}>
                {budgetChoices.map((item) => <option value={item} key={item}>{item === 'Tous' ? m.allBudgets : fill(m.budget, { amount: item })}</option>)}
              </select>
            </label>
            <label className="tool-field">
              <span>{m.priority}</span>
              <select value={priority} onChange={(event) => setPriority(event.target.value as PriorityChoice)}>
                {priorityChoices.map((item) => <option value={item} key={item}>{m.priorities[item]}</option>)}
              </select>
            </label>
            <label className="tool-field">
              <span>{m.drawdown}</span>
              <select value={drawdown} onChange={(event) => setDrawdown(event.target.value as DrawdownChoice)}>
                {drawdownChoices.map((item) => <option value={item} key={item}>{m.drawdowns[item]}</option>)}
              </select>
            </label>
          </div>

          <div className="recommendation-list">
            {recommendations.map(({ firm, fitScore }, index) => (
              <Link href={L(`/firm/${firm.slug}`)} className="recommendation-row" key={firm.slug}>
                <span className="guide-rank">{index + 1}</span>
                <div className="firm-result-main">
                  <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                  <div>
                    <strong>{firm.name}</strong>
                    <span>{bestReason(firm, style, priority, m, v)}</span>
                  </div>
                </div>
                <div><span>{m.fit}</span><strong>{Math.min(100, Math.max(0, Math.round(fitScore)))}/100</strong></div>
                <div><span>{m.price}</span><strong>{v(priceLabel(firm))}</strong></div>
                <div><span>{m.payout}</span><strong className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{v(toEnglishText(firm.reviewSignals.payoutRisk))}</strong></div>
                <div className={`score-tile score-tile-row ${scoreClass(firm.score)}`} aria-label={fill(m.scoreAria, { score: firm.score })}>
                  <span>{m.score}</span>
                  <strong>{firm.score}</strong>
                  <small>/100</small>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
