#!/usr/bin/env node
'use strict';

/**
 * Generate 15-criterion V3 evidence worksheets for ALL main PropRadar firms.
 * This is an audit queue: no source URLs are implicitly treated as verified.
 * No scores or firm data are modified by this script.
 *
 * Usage: node scripts/build-v3-scorecard-queue.cjs --write
 *        node scripts/build-v3-scorecard-queue.cjs --write --combined
 */

const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');

require.extensions['.ts'] = (mod, filename) => {
  const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true, resolveJsonModule: true },
  });
  mod._compile(compiled.outputText, filename);
};

const { propFirms } = require(path.join(root, 'app/lib/propFirms.ts'));
const { getFirmUpdate } = require(path.join(root, 'app/lib/firmUpdates.ts'));
const { ruleKind } = require(path.join(root, 'app/lib/restrictiveRules.ts'));
const { V3_CRITERIA } = require(path.join(root, 'app/lib/scoringV3.ts'));

const uniq = (values) => [...new Set(values.filter((x) => typeof x === 'string' && /^https:\/\//.test(x)))];
const candidate = (urls, expression) => uniq(urls.filter((url) => expression.test(url)));
const short = (value) => String(value ?? '').replace(/[\r\n]+/g, ' ').trim();
const formatCsv = (value) => {
  const valueText = String(value ?? '');
  return /[",\n\r]/.test(valueText) ? `"${valueText.replace(/"/g, '""')}"` : valueText;
};

const rows = [];
const summary = [];
for (const firm of propFirms) {
  const update = getFirmUpdate(firm.slug);
  const rules = update?.restrictiveRules ?? [];
  const risk = rules.filter((item) => ruleKind(item) === 'risk');
  const terms = uniq(rules.map((item) => item.source));
  const allUrls = uniq([
    ...firm.sources.map((source) => source.url),
    ...firm.regulatoryAudit.sources.map((source) => source.url),
    ...(update?.addSources ?? []).map((source) => source.url),
  ]);
  const payoutProofs = firm.payoutProofs ?? [];
  const payoutPolicy = candidate([...allUrls, ...terms], /payout|withdraw|reward|payment|terms|agreement/i);
  const offerLinks = candidate(allUrls, /pricing|program|challenge|plans|fees|packages|costs|accounts/i);
  const registryLinks = candidate(allUrls, /gov\.|registry|companieshouse|companies-house|opencorporates|business-register|company-register/i);
  const regulatorLinks = candidate(allUrls, /fca\.org|amf-france|cftc\.gov|nfa\.futures|asic\.gov|consob\.it|cnmv\.es|warning-list|regulator/i);
  const retroactive = rules.filter((rule) => /retroactiv|without notice|change.{0,35}(rules|terms)|modify.{0,35}(terms|rules)|immediately upon posting/i.test(`${rule.rule} ${rule.impact}`));
  const payoutReports = payoutProofs.filter((proof) => proof.firmReported);
  const independentReports = payoutProofs.filter((proof) => !proof.firmReported);
  const legalEntity = firm.regulatoryAudit.entities ?? [];
  const platforms = [...new Set(firm.products.flatMap((product) => product.platforms ?? []))];
  const reviewUrl = firm.reviewSignals.trustpilotSourceUrl;
  const profile = {
    payoutEvidence: [uniq(payoutProofs.map((proof) => proof.url)), `Payout pieces indexed: ${independentReports.length} labelled independent, ${payoutReports.length} firm-reported. Labels are NOT external validation.`],
    payoutTerms: [payoutPolicy, `Payout delay in profile: ${short(firm.payoutDelay)}. Candidate URL presence is NOT proof of policy coherence.`],
    payoutIncidentReview: [candidate(allUrls, /lawsuit|court|complain|disput|regulator|payout|press|news/i), `Existing signal: ${firm.reviewSignals.payoutRisk}; complaints in data: ${firm.reviewSignals.payoutIssues.length}. Allegations are NOT proven unjustified denials.`],
    officialTermsConsistency: [terms, `Audited programs: ${update?.auditedPrograms?.length ?? 0}; source-linked rules: ${rules.length}; possible contradictions: ${rules.filter((rule) => rule.status === 'conflicting').length}.`],
    earnedRewardProtection: [uniq(risk.map((rule) => rule.source)), `Candidate contractual-risk clauses: ${risk.length}; blocking: ${risk.filter((rule) => rule.severity === 'blocking').length}. Must read each clause and deduplicate same contractual power.`],
    retroactiveRights: [uniq(retroactive.map((rule) => rule.source)), `Potential change-without-notice clauses: ${retroactive.length}; distinguish prospective updates from changes affecting existing rights.`],
    contractingEntity: [registryLinks, `Named entities: ${legalEntity.length}; registration numbers: ${legalEntity.filter((entity) => entity.registrationNumber).length}. An entity listed only on the firm site is NOT independently verified.`],
    addressAndRemedies: [firm.regulatoryAudit.sources.map((source) => source.url), `Addresses recorded: ${legalEntity.filter((entity) => entity.registeredAddress).length}; verify governing law and trader remedies.`],
    regulatorRecord: [regulatorLinks, `Legal risk assessment: ${firm.regulatoryAudit.riskLevel}; a generic lack of broker licence is not automatically a violation.`],
    ordinaryPricing: [offerLinks, `List price from: ${firm.priceFrom}; provisional: ${(firm.provisional ?? []).join('|') || 'none'}. Requires same-size account market benchmark, not affiliate discounts.`],
    splitAndPayoutFrequency: [payoutPolicy, `Profit split: ${firm.profitSplit}; payout terms: ${short(firm.payoutDelay)}. Check source and programme scope.`],
    drawdownTransparency: [candidate([...allUrls, ...terms], /drawdown|rules|risk|program|terms|conditions/i), `Drawdown type: ${firm.drawdownType}; products: ${firm.products.length}; provisional: ${(firm.provisional ?? []).includes('drawdownType')}.`],
    operationalContinuity: [allUrls.slice(0, 4), `Founded according to dossier: ${firm.founded || 'unknown'}; last reviewed: ${firm.lastReviewed}. No age bonus by itself.`],
    reviewSourceQuality: [reviewUrl ? [reviewUrl] : [], `Trustpilot rating: ${firm.trustpilotRating ?? 'not stated'}; review count: ${firm.reviewSignals.trustpilotReviewCount ?? 'not stated'}; current notice: ${Boolean(firm.reviewSignals.trustpilotRatingWithheld)}. Notice penalty is SEPARATE -6, never duplicated.`],
    platformStability: [offerLinks, `Platforms in program data: ${platforms.join(', ') || 'none'}; must verify provider continuity.`],
  };

  let gaps = 0;
  for (const [key, { axis, max }] of Object.entries(V3_CRITERIA)) {
    const [urls, signal] = profile[key];
    if (!urls.length) gaps += 1;
    rows.push({
      slug: firm.slug,
      firm: firm.name,
      firmStatus: firm.status,
      criterion: key,
      axis,
      maximum: max,
      neutralIfUnverified: max / 2,
      sourceCandidates: urls.join(' | '),
      existingDataSignal: signal,
      evidenceVerified: 'NO - manual review required',
      confirmedPoints: '',
      adverseFactId: '',
      note: 'Candidate URL/data is not confirmed primary evidence; not a final score.',
    });
  }
  summary.push({ slug: firm.slug, name: firm.name, status: firm.status, evidenceGaps: gaps,
    riskClauses: risk.length, independentProofLabels: independentReports.length,
    auditStatus: firm.auditStatus, lastReviewed: firm.lastReviewed });
}

if (rows.length !== propFirms.length * Object.keys(V3_CRITERIA).length) throw new Error('Missing V3 criteria');

const columns = Object.keys(rows[0]);
const csv = [columns.join(','), ...rows.map((row) => columns.map((key) => formatCsv(row[key])).join(','))].join('\n') + '\n';
const priority = summary.filter((item) => item.status !== 'Fermée').sort((a, b) =>
  b.riskClauses - a.riskClauses || b.evidenceGaps - a.evidenceGaps || a.name.localeCompare(b.name));
const markdown = [
  '# PropRadar — matrice de contrôle V3 des firmes',
  '',
  `**${propFirms.length} firmes × ${Object.keys(V3_CRITERIA).length} critères = ${rows.length} lignes à vérifier.**`,
  '',
  '**Ce document ne propose aucune note finale.** Le demi-crédit indiqué est uniquement la règle V3',
  'pour un critère réellement non vérifié. Une URL dans le dépôt est une piste documentaire,',
  'pas une confirmation que les 15 critères ont été revus. Ne pas publier des scores bâtis',
  'sur des déductions automatiques ni présumer qu’une société n’a pas payé faute de pièces.',
  '',
  `- Firmes non fermées : **${summary.filter((item) => item.status !== 'Fermée').length}**.`,
  `- Firmes fermées, hors classement : **${summary.filter((item) => item.status === 'Fermée').length}**.`,
  `- Firmes ouvertes sans preuve indépendante **étiquetée** dans le dossier : **${summary.filter((item) => item.status !== 'Fermée' && item.independentProofLabels === 0).length}**.`,
  `- Firmes ouvertes avec une clause candidate de risque contractuel : **${summary.filter((item) => item.status !== 'Fermée' && item.riskClauses > 0).length}**.`,
  '- Fichiers : `scoring-v3-criteria-matrix-2026-11-20-part-1.csv` à `part-5.csv`, 40 firmes par lot (37 dans le dernier).',
  '',
  '## Vérification prioritaire des sources contractuelles',
  '',
  '| Firme | Risques candidats | Critères sans URL candidate | Audit existant |',
  '| --- | ---: | ---: | --- |',
  ...priority.slice(0, 25).map((item) => `| ${item.name} | ${item.riskClauses} | ${item.evidenceGaps} | ${item.auditStatus} |`),
  '',
  '## Passage au calcul final',
  '',
  '1. Lire la source officielle **pour chaque critère**, vérifier l’effet réel par programme et dater le contrôle.',
  '2. Ajouter le point confirmé justifié et l’identifiant du fait, ou laisser le demi-crédit **non vérifié**.',
  '3. Contrôler les preuves indépendantes de payout (un article qui relaie la déclaration de la firme n’en est pas une).',
  '4. Calculer avec `app/lib/scoringV3.ts` : le -6 Trustpilot s’applique séparément, la fermeture plafonne 29.',
  '5. Produire l’avant/après, faire revoir les mouvements sensibles, puis uniquement publier les fiches vérifiées.',
  '',
].join('\n');

if (process.argv.includes('--write')) {
  const batchSize = 40;
  for (let index = 0; index < summary.length; index += batchSize) {
    const slugs = new Set(summary.slice(index, index + batchSize).map((firm) => firm.slug));
    const batchRows = rows.filter((row) => slugs.has(row.slug));
    const batchCsv = [columns.join(','), ...batchRows.map((row) => columns.map((key) => formatCsv(row[key])).join(','))].join('\n') + '\n';
    fs.writeFileSync(path.join(root, `claude/scoring-v3-criteria-matrix-2026-11-20-part-${Math.floor(index / batchSize) + 1}.csv`), batchCsv);
  }
  if (process.argv.includes('--combined')) {
    fs.writeFileSync(path.join(root, 'claude/scoring-v3-criteria-source-matrix-2026-11-20.csv'), csv);
  }
  fs.writeFileSync(path.join(root, 'claude/scoring-v3-criteria-source-matrix-2026-11-20.md'), markdown);
}
console.log(JSON.stringify({ firms: summary.length, criteria: Object.keys(V3_CRITERIA).length,
  rows: rows.length, active: summary.filter((item) => item.status !== 'Fermée').length,
  activeMissingIndependentProofLabel: summary.filter((item) => item.status !== 'Fermée' && item.independentProofLabels === 0).length }, null, 2));
