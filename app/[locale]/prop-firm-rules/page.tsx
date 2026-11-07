import Link from 'next/link';
import type { Metadata } from 'next';
import FirmLogo from '../../components/FirmLogo';
import PageStructuredData from '../../components/PageStructuredData';
import { createPageMetadata } from '../../lib/pageMetadata';
import {
  auditStatusClass,
  priceLabel,
  getFirmBySlug,
  payoutRiskClass,
  propFirms,
  regulatoryRiskClass,
  scoreClass,
  statusClass,
  drawdownLabel,
  hasPayoutRiskSignal,
} from '../../lib/propFirms';
import { toEnglishText } from '../../lib/i18n';
import { HTML_LANG, OG_LOCALE, isLocale, localeAlternates, localePath, type Locale } from '../../lib/locales';
import { fmt, formatDateLong, getMessages, tv } from '../../lib/messages';
import { getRulesMessages, type RulesMessages } from '../../lib/messages/pages/prop-firm-rules';
import { localizedGuidePath } from '../../lib/guideI18n';
import { SITE_URL } from '../../lib/site';

const PATH = '/prop-firm-rules';
const PAGE_REVIEWED = '2026-07-15';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const m = getRulesMessages(locale);
  const base = createPageMetadata({
    title: m.metaTitle,
    description: m.metaDescription,
    path: PATH,
    keywords: locale === 'en' ? ['prop firm rules', 'prop firm drawdown', 'prop firm consistency rule', 'prop firm news trading'] : [],
    category: 'Prop firm rules',
  });
  return {
    ...base,
    alternates: localeAlternates(locale, PATH),
    openGraph: { ...base.openGraph, url: `${SITE_URL}${localePath(locale, PATH)}`, locale: OG_LOCALE[locale] },
  };
}

type RuleSeverity = 'Faible' | 'Moyen' | 'Élevé' | 'Critique';
type ProofLevel = 'Source officielle lue' | 'Source officielle partielle' | 'Source commerciale repérée';

/** Structure of each audit; the PropRadar-written text lives in the page messages (one file per language). */
type OfficialRuleAudit = {
  slug: keyof RulesMessages['audits'];
  product: string;
  sourceLabel: string;
  sourceUrl: string;
  sourceDate: string;
  severities: RuleSeverity[];
};

type CompactRuleAudit = {
  slug: keyof RulesMessages['compact'];
  product: string;
  sourceLabel: string;
  sourceUrl: string;
  sourceDate: string;
  proofLevel: ProofLevel;
  severity: RuleSeverity;
};

const officialRuleAudits: OfficialRuleAudit[] = [
  { slug: 'ftmo', product: 'FTMO Challenge 1-Step / 2-Step', sourceLabel: 'Trading Objectives + Forbidden Trading Practices FTMO', sourceUrl: 'https://ftmo.com/en/trading-objectives/', sourceDate: '2026-07-01', severities: ['Critique', 'Élevé', 'Critique'] },
  { slug: 'the5ers', product: 'High Stakes', sourceLabel: 'High Stakes Rules The5ers', sourceUrl: 'https://help.the5ers.com/what-are-the-general-rules-for-the-high-stakes-program/', sourceDate: '2026-07-01', severities: ['Critique', 'Moyen', 'Moyen'] },
  { slug: 'fundednext', product: 'Stellar 2-Step / FundedNext Accounts', sourceLabel: 'FundedNext Help Center - Rules & Payouts', sourceUrl: 'https://help.fundednext.com/en/articles/8020351-what-are-the-restricted-prohibited-trading-strategies', sourceDate: '2026-07-01', severities: ['Critique', 'Élevé', 'Critique'] },
  { slug: 'topstep', product: 'Trading Combine / Express Funded Account', sourceLabel: 'Topstep Trading Combine + Payout Policy + Consistency', sourceUrl: 'https://help.topstep.com/en/articles/8284197-trading-combine-parameters', sourceDate: '2026-07-01', severities: ['Élevé', 'Élevé', 'Critique'] },
  { slug: 'apex-trader-funding', product: 'New Apex Products', sourceLabel: 'Apex official homepage + new/legacy account notice', sourceUrl: 'https://apextraderfunding.com/', sourceDate: '2026-07-01', severities: ['Critique', 'Élevé', 'Élevé'] },
  { slug: 'e8-markets', product: 'E8 Signature / E8 One / E8 Pro', sourceLabel: 'E8 Markets Help Center - Products, Guardrails, Payouts', sourceUrl: 'https://help.e8markets.com/en/collections/10983534-products-rules', sourceDate: '2026-07-01', severities: ['Critique', 'Élevé', 'Élevé'] },
  { slug: 'funding-pips', product: 'Evaluation / Master Account', sourceLabel: 'FundingPips Help Center - Trading Mechanics', sourceUrl: 'https://help.fundingpips.com/hc/en-us/articles/44559256768529-Understanding-Trading-Mechanics', sourceDate: '2026-07-01', severities: ['Critique', 'Élevé', 'Moyen'] },
  { slug: 'alpha-capital-group', product: 'Alpha Pro / Qualified Trader', sourceLabel: 'Alpha Capital Help Center - News, EA, IP, Gambling', sourceUrl: 'https://help.alphacapitalgroup.uk/en/articles/9293522-can-i-trade-news', sourceDate: '2026-07-01', severities: ['Critique', 'Critique', 'Élevé'] },
];

const mediumSmallRuleAudits: CompactRuleAudit[] = [
  { slug: 'funding-traders', product: 'Instant Funded / 1-Step / 2-Step', sourceLabel: 'FundingTraders - Rules and challenge table', sourceUrl: 'https://fundingtraders.com/', sourceDate: '2026-07-01', proofLevel: 'Source officielle lue', severity: 'Élevé' },
  { slug: 'maven-trading', product: '1-Step / 2-Step / 3-Step / Instant / OMO', sourceLabel: 'Maven Trading - pricing and challenge table', sourceUrl: 'https://maventrading.com/', sourceDate: '2026-07-01', proofLevel: 'Source officielle lue', severity: 'Moyen' },
  { slug: 'fxify', product: 'One Phase / Two Phase / Instant Funding', sourceLabel: 'FXIFY - How it works', sourceUrl: 'https://fxify.com/how-it-works/', sourceDate: '2026-07-01', proofLevel: 'Source officielle lue', severity: 'Critique' },
  { slug: 'instant-funding', product: 'Instant Funding / IF1 / One-Phase / Two-Phase', sourceLabel: 'Instant Funding - product rules', sourceUrl: 'https://instantfunding.com/', sourceDate: '2026-07-01', proofLevel: 'Source officielle lue', severity: 'Critique' },
  { slug: 'trade-the-pool', product: 'MAX / FLEX stock programs', sourceLabel: 'Trade The Pool - Program Terms', sourceUrl: 'https://tradethepool.com/program-terms/', sourceDate: '2026-07-01', proofLevel: 'Source officielle lue', severity: 'Critique' },
  { slug: 'funded-trading-plus', product: 'Instant Funding / 1-Step / 2-Step', sourceLabel: 'Funded Trading Plus - Help Center', sourceUrl: 'https://help.fundedtradingplus.com/drawdown-information/', sourceDate: '2026-07-01', proofLevel: 'Source officielle lue', severity: 'Critique' },
  { slug: 'goat-funded-trader', product: '1-Step / 2-Step Pro / Blitz', sourceLabel: 'GOAT Funded Trader - Rules and rewards', sourceUrl: 'https://help.goatfundedtrader.com/en/collections/11969353-rules', sourceDate: '2026-07-01', proofLevel: 'Source officielle lue', severity: 'Critique' },
  { slug: 'audacity-capital', product: 'Ability Challenge', sourceLabel: 'Audacity Capital - challenge table', sourceUrl: 'https://audacity.capital/', sourceDate: '2026-07-01', proofLevel: 'Source officielle lue', severity: 'Moyen' },
  { slug: 'fintokei', product: 'SwiftTrader / ProTrader', sourceLabel: 'Fintokei - program table', sourceUrl: 'https://www.fintokei.com/', sourceDate: '2026-07-01', proofLevel: 'Source officielle lue', severity: 'Élevé' },
  { slug: 'hantec-trader', product: 'RZR Funded (formerly Hantec Trader) programs', sourceLabel: 'RZR Funded - official site', sourceUrl: 'https://rzrfunded.com/', sourceDate: '2026-07-01', proofLevel: 'Source officielle lue', severity: 'Moyen' },
  { slug: 'oneup-trader', product: '1-Step futures evaluation', sourceLabel: 'OneUp Trader - funded account rules', sourceUrl: 'https://www.oneuptrader.com/', sourceDate: '2026-07-01', proofLevel: 'Source officielle lue', severity: 'Critique' },
  { slug: 'earn2trade', product: 'Trader Career Path / Gauntlet Mini', sourceLabel: 'Earn2Trade - official homepage and disclaimer', sourceUrl: 'https://www.earn2trade.com/', sourceDate: '2026-07-01', proofLevel: 'Source officielle lue', severity: 'Élevé' },
  { slug: 'take-profit-trader', product: 'Test / PRO / PRO+', sourceLabel: 'Take Profit Trader - payout and PRO rules', sourceUrl: 'https://takeprofittrader.com/', sourceDate: '2026-07-01', proofLevel: 'Source officielle lue', severity: 'Élevé' },
  { slug: 'brightfunded', product: 'Evaluation / Funded Account', sourceLabel: 'BrightFunded - official homepage', sourceUrl: 'https://brightfunded.com/', sourceDate: '2026-07-01', proofLevel: 'Source commerciale repérée', severity: 'Moyen' },
  { slug: 'aqua-funded', product: 'Evaluation / Instant Funding', sourceLabel: 'AquaFunded - official homepage', sourceUrl: 'https://www.aquafunded.com/', sourceDate: '2026-07-01', proofLevel: 'Source commerciale repérée', severity: 'Moyen' },
  { slug: 'blue-guardian', product: 'Evaluation / Instant Funding', sourceLabel: 'Blue Guardian - official homepage', sourceUrl: 'https://www.blueguardian.com/', sourceDate: '2026-07-01', proofLevel: 'Source commerciale repérée', severity: 'Moyen' },
  { slug: 'breakout-prop', product: 'Crypto prop trading', sourceLabel: 'Breakout Prop - official homepage', sourceUrl: 'https://www.breakoutprop.com/', sourceDate: '2026-07-01', proofLevel: 'Source commerciale repérée', severity: 'Élevé' },
  { slug: 'the-trading-pit', product: 'Futures / Forex / CFD challenges', sourceLabel: 'The Trading Pit - official homepage', sourceUrl: 'https://www.thetradingpit.com/', sourceDate: '2026-07-01', proofLevel: 'Source officielle partielle', severity: 'Moyen' },
  { slug: 'finotive-funding', product: 'Challenge / Instant Funding', sourceLabel: 'Finotive Funding - official homepage', sourceUrl: 'https://finotivefunding.com/', sourceDate: '2026-07-01', proofLevel: 'Source officielle partielle', severity: 'Moyen' },
  { slug: 'myfundedfutures', product: 'Futures evaluations', sourceLabel: 'MyFundedFutures - official homepage', sourceUrl: 'https://myfundedfutures.com/', sourceDate: '2026-07-01', proofLevel: 'Source commerciale repérée', severity: 'Moyen' },
  { slug: 'bulenox', product: 'Futures funded trader program', sourceLabel: 'Bulenox - official homepage', sourceUrl: 'https://bulenox.com/', sourceDate: '2026-07-01', proofLevel: 'Source commerciale repérée', severity: 'Moyen' },
];

function severityClass(severity: RuleSeverity) {
  if (severity === 'Critique') return 'badge-red';
  if (severity === 'Élevé') return 'badge-red';
  if (severity === 'Moyen') return 'badge-amber';
  return 'badge-green';
}

function proofLevelClass(level: ProofLevel) {
  if (level === 'Source officielle lue') return 'badge-green';
  if (level === 'Source officielle partielle') return 'badge-amber';
  return 'badge-blue';
}

type Firm = (typeof propFirms)[number];
type CoverageKey = 'archive' | 'multi' | 'spotted' | 'toSource';

function coverageStatus(firm: Firm): CoverageKey {
  if (firm.status === 'Fermée') return 'archive';
  if (firm.auditStatus === 'Vérifié multi-source') return 'multi';
  if (firm.auditStatus === 'Partiellement vérifié') return 'spotted';
  return 'toSource';
}

function coverageStatusClass(key: CoverageKey) {
  if (key === 'multi') return 'badge-green';
  if (key === 'spotted') return 'badge-blue';
  if (key === 'archive') return 'badge-red';
  return 'badge-neutral';
}

function coverageLabel(key: CoverageKey, m: RulesMessages) {
  return { archive: m.coverageArchive, multi: m.coverageMulti, spotted: m.coverageSpotted, toSource: m.coverageToSource }[key];
}

function legalSourceCount(firm: Firm) {
  return firm.regulatoryAudit.sources.length || firm.sources.length;
}

function isLegalWatchFirm(firm: Firm) {
  const risk = firm.regulatoryAudit.riskLevel;
  return !firm.legalVerified || risk === 'High' || risk === 'Critical' || risk === 'To audit';
}

function sourceDepthLabel(firm: Firm, m: RulesMessages) {
  const count = legalSourceCount(firm);
  if (count >= 5) return m.sourceDeep;
  if (count >= 3) return m.sourceUsable;
  if (count >= 1) return m.sourceThin;
  return m.sourceNone;
}

function sourceDepthClass(firm: Firm) {
  const count = legalSourceCount(firm);
  if (count >= 5) return 'badge-green';
  if (count >= 2) return 'badge-amber';
  return 'badge-red';
}

export default async function RulesPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const t = getMessages(locale);
  const m = getRulesMessages(locale);
  const L = (path: string) => localePath(locale, path);
  const G = (slug: string) => localizedGuidePath(locale, slug);
  const v = (value: string) => tv(t, toEnglishText(value));
  const sourceChecked = (date: string) => fmt(m.sourceChecked, { date: formatDateLong(locale, date) });
  const productName = (firm: Firm, fallback: string) => (firm.products[0]?.name ? toEnglishText(firm.products[0].name) : fallback);

  const deepAuditedSlugs = new Set<string>(officialRuleAudits.map((audit) => audit.slug));
  const compactAuditedSlugs = new Set<string>(mediumSmallRuleAudits.map((audit) => audit.slug));
  const coveredSlugs = new Set([...deepAuditedSlugs, ...compactAuditedSlugs]);
  const clauseCount = officialRuleAudits.reduce((sum, audit) => sum + audit.severities.length, 0);
  const criticalCount = officialRuleAudits.reduce((sum, audit) => sum + audit.severities.filter((severity) => severity === 'Critique').length, 0);
  const compactCriticalCount = mediumSmallRuleAudits.filter((audit) => audit.severity === 'Critique').length;
  const longTailRows = propFirms
    .filter((firm) => !coveredSlugs.has(firm.slug))
    .sort((a, b) => {
      if (a.status === 'Fermée' && b.status !== 'Fermée') return 1;
      if (a.status !== 'Fermée' && b.status === 'Fermée') return -1;
      return b.reviewSignals.payoutRiskScore - a.reviewSignals.payoutRiskScore;
    });
  const activeRuleRows = propFirms
    .filter((firm) => firm.status !== 'Fermée')
    .sort((a, b) => b.reviewSignals.payoutRiskScore - a.reviewSignals.payoutRiskScore)
    .slice(0, 16);
  const nextAuditQueue = propFirms
    .filter((firm) => !coveredSlugs.has(firm.slug) && firm.status !== 'Fermée')
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);
  const coveredFirmCount = propFirms.filter((firm) => coveredSlugs.has(firm.slug)).length;
  const legalWatchCoveredCount = propFirms.filter((firm) => coveredSlugs.has(firm.slug) && isLegalWatchFirm(firm)).length;
  const deepSourceCoveredCount = propFirms.filter((firm) => coveredSlugs.has(firm.slug) && legalSourceCount(firm) >= 5).length;
  const payoutSensitiveCount = propFirms.filter((firm) => coveredSlugs.has(firm.slug) && hasPayoutRiskSignal(firm)).length;

  return (
    <main className="container rules-page">
      <PageStructuredData
        name={m.schemaName}
        description={m.metaDescription}
        path={L(PATH)}
        breadcrumbLabel={m.breadcrumb}
        dateModified="2026-07-13"
        inLanguage={HTML_LANG[locale]}
        home={{ label: t.guide.breadcrumbHome, url: `${SITE_URL}${L('/')}` }}
        items={officialRuleAudits.map((audit) => ({
          name: getFirmBySlug(audit.slug)?.name ?? audit.slug,
          path: L(`/firm/${audit.slug}`),
          description: m.audits[audit.slug].verdict,
        }))}
      />
      <section className="rules-hero">
        <div>
          <div className="eyebrow">{m.eyebrow}</div>
          <h1>{m.h1}</h1>
          <p className="lead">{m.lead}</p>
          <p className="muted">{fmt(m.reviewed, { date: formatDateLong(locale, PAGE_REVIEWED) })}</p>
        </div>
        <dl className="pr-hero-stats">
          <div><dt>{m.statDeep}</dt><dd>{officialRuleAudits.length}</dd></div>
          <div><dt>{fmt(m.statClauses, { critical: criticalCount })}</dt><dd>{clauseCount}</dd></div>
          <div><dt>{fmt(m.statCompact, { critical: compactCriticalCount })}</dt><dd>{mediumSmallRuleAudits.length}</dd></div>
          <div><dt>{m.statTracked}</dt><dd>{propFirms.length}</dd></div>
        </dl>
      </section>

      <section className="pr-stat-line" aria-label={m.coverageAria}>
        <dl>
          <div><dt>{m.statRuleFiles}</dt><dd>{coveredFirmCount}</dd></div>
          <div><dt>{m.statPayoutSensitive}</dt><dd>{payoutSensitiveCount}</dd></div>
          <div><dt>{m.statLegalWatch}</dt><dd>{legalWatchCoveredCount}</dd></div>
          <div><dt>{m.statDeepSources}</dt><dd>{deepSourceCoveredCount}</dd></div>
        </dl>
        <p className="pr-related">
          {m.related} <Link href={G('prop-firm-sans-consistency-rule')}>{m.relatedConsistency}</Link> · <Link href={G('prop-firm-news-trading')}>{m.relatedNews}</Link>
        </p>
      </section>

      <section className="rules-stat-strip" aria-label={m.statsAria}>
        {m.families.map((family) => (
          <div className="rule-stat" key={family.title}>
            <span>{family.label}</span>
            <strong>{family.title}</strong>
            <small>{family.text}</small>
          </div>
        ))}
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">{m.alertsEyebrow}</div>
            <h2>{m.alertsTitle}</h2>
          </div>
          <Link href={L('/audit')} className="btn">{m.viewAudit}</Link>
        </div>

        <div className="rule-audit-grid">
          {officialRuleAudits.map((audit) => {
            const firm = getFirmBySlug(audit.slug);
            const text = m.audits[audit.slug];

            return (
              <article className="rule-audit-card" key={audit.slug}>
                <div className="rule-audit-top">
                  <div className="firm-result-main">
                    <FirmLogo name={firm?.name ?? audit.slug} logoDomain={firm?.logoDomain} />
                    <div>
                      <Link href={L(`/firm/${audit.slug}`)} className="firm-result-name">{firm?.name ?? audit.slug}</Link>
                      <div className="firm-subline">{audit.product}</div>
                      {firm ? (
                        <div className="ranking-proof-chips" aria-label={fmt(m.proofAria, { name: firm.name })}>
                          <span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>
                            {fmt(m.payoutChip, { level: v(firm.reviewSignals.payoutRisk) })}
                          </span>
                          <span className={`badge ${regulatoryRiskClass(firm.regulatoryAudit.riskLevel)}`}>
                            {fmt(m.legalChip, { level: v(firm.regulatoryAudit.riskLevel) })}
                          </span>
                          <span className={`badge ${sourceDepthClass(firm)}`}>{sourceDepthLabel(firm, m)}</span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {firm ? <span className={`badge ${statusClass(firm.status)}`}>{v(firm.status)}</span> : null}
                </div>

                <div>
                  <h3>{text.headline}</h3>
                  <p className="muted">{text.verdict}</p>
                </div>

                <div className="clause-list">
                  {text.clauses.map((clause, index) => {
                    const severity = audit.severities[index] ?? 'Moyen';
                    return (
                      <div className="clause-item" key={clause.title}>
                        <div className="clause-head">
                          <strong>{clause.title}</strong>
                          <span className={`badge ${severityClass(severity)}`}>{m.severity[severity]}</span>
                        </div>
                        <p>{clause.finding}</p>
                        <div className="impact-box">{clause.impact}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="rule-audit-source">
                  <span>{sourceChecked(audit.sourceDate)}</span>
                  <a href={audit.sourceUrl} target="_blank" rel="noreferrer">{audit.sourceLabel}</a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">{m.compactEyebrow}</div>
            <h2>{m.compactTitle}</h2>
          </div>
          <p className="section-note">{m.compactNote}</p>
        </div>

        <div className="compact-rule-grid">
          {mediumSmallRuleAudits.map((audit) => {
            const firm = getFirmBySlug(audit.slug);
            const text = m.compact[audit.slug];

            return (
              <article className="compact-rule-card" key={audit.slug}>
                <div className="compact-rule-top">
                  <div className="firm-result-main">
                    <FirmLogo name={firm?.name ?? audit.slug} logoDomain={firm?.logoDomain} size="sm" />
                    <div>
                      <Link href={L(`/firm/${audit.slug}`)} className="firm-result-name">{firm?.name ?? audit.slug}</Link>
                      <div className="firm-subline">{audit.product}</div>
                    </div>
                  </div>
                  <span className={`badge ${severityClass(audit.severity)}`}>{m.severity[audit.severity]}</span>
                </div>

                <div className="compact-rule-tags">
                  <span className={`badge ${proofLevelClass(audit.proofLevel)}`}>{m.proof[audit.proofLevel]}</span>
                  <span>{text.riskFamily}</span>
                  {firm ? <span className={`badge ${auditStatusClass(firm.auditStatus)}`}>{v(firm.auditStatus)}</span> : null}
                </div>

                <p>{text.signal}</p>
                <div className="compact-rule-impact">{text.impact}</div>

                <div className="rule-audit-source">
                  <span>{sourceChecked(audit.sourceDate)}</span>
                  <a href={audit.sourceUrl} target="_blank" rel="noreferrer">{audit.sourceLabel}</a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section" data-nosnippet="">
        <div className="section-heading">
          <div>
            <div className="eyebrow">{m.fullEyebrow}</div>
            <h2>{m.fullTitle}</h2>
          </div>
          <p className="section-note">{m.fullNote}</p>
        </div>
        <details className="pr-disclosure">
          <summary>{fmt(m.showQueue, { count: longTailRows.length })}</summary>
          <div className="longtail-rule-board">
            {longTailRows.map((firm) => {
              const coverage = coverageStatus(firm);

              return (
                <Link href={L(`/firm/${firm.slug}`)} className="longtail-rule-row" key={firm.slug}>
                  <div className="firm-result-main">
                    <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                    <div>
                      <strong>{firm.name}</strong>
                      <span>{productName(firm, m.productToIdentify)}</span>
                    </div>
                  </div>
                  <span>{v(drawdownLabel(firm, toEnglishText))}</span>
                  <span>{v(firm.newsTrading)}</span>
                  <span>{v(firm.eaAllowed)}</span>
                  <span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{v(firm.reviewSignals.payoutRisk)}</span>
                  <span className={`badge ${coverageStatusClass(coverage)}`}>{coverageLabel(coverage, m)}</span>
                </Link>
              );
            })}
          </div>
        </details>
      </section>

      <section className="section" data-nosnippet="">
        <div className="section-heading">
          <div>
            <div className="eyebrow">{m.nextEyebrow}</div>
            <h2>{m.nextTitle}</h2>
          </div>
        </div>
        <div className="rule-queue-grid">
          {nextAuditQueue.map((firm) => (
            <Link href={L(`/firm/${firm.slug}`)} className="rules-matrix-row" key={firm.slug}>
              <div className="firm-result-main">
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                <div>
                  <strong>{firm.name}</strong>
                  <span>{productName(firm, m.mainProductToIdentify)} - {v(priceLabel(firm))}</span>
                </div>
              </div>
              <div><span>{m.colDrawdown}</span><strong>{v(drawdownLabel(firm, toEnglishText))}</strong></div>
              <div><span>{m.colNews}</span><strong>{v(firm.newsTrading)}</strong></div>
              <div><span>{m.colEa}</span><strong>{v(firm.eaAllowed)}</strong></div>
              <div><span>{m.colPayout}</span><strong>{v(firm.reviewSignals.payoutRisk)}</strong></div>
              <div className={`score-tile score-tile-row ${scoreClass(firm.score)}`} aria-label={fmt(m.scoreAria, { score: firm.score })}>
                <span>{m.colScore}</span>
                <strong>{firm.score}</strong>
                <small>/100</small>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section" data-nosnippet="">
        <div className="section-heading">
          <div>
            <div className="eyebrow">{m.matrixEyebrow}</div>
            <h2>{m.matrixTitle}</h2>
          </div>
        </div>
        <details className="pr-disclosure">
          <summary>{fmt(m.showMatrix, { count: activeRuleRows.length })}</summary>
          <div className="rules-matrix">
            {activeRuleRows.map((firm) => (
              <Link href={L(`/firm/${firm.slug}`)} className="rules-matrix-row" key={firm.slug}>
                <div className="firm-result-main">
                  <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                  <div>
                    <strong>{firm.name}</strong>
                    <span>{v(priceLabel(firm))} - {fmt(m.scoreLine, { score: firm.score })}</span>
                  </div>
                </div>
                <div><span>{m.colDrawdown}</span><strong>{v(drawdownLabel(firm, toEnglishText))}</strong></div>
                <div><span>{m.colNews}</span><strong>{v(firm.newsTrading)}</strong></div>
                <div><span>{m.colEa}</span><strong>{v(firm.eaAllowed)}</strong></div>
                <div><span>{m.colPayout}</span><strong>{v(firm.reviewSignals.payoutRisk)}</strong></div>
                <span className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{v(firm.reviewSignals.payoutRisk)}</span>
              </Link>
            ))}
          </div>
        </details>
      </section>
    </main>
  );
}
