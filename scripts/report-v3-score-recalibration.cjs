#!/usr/bin/env node
'use strict';

/**
 * Read-only, repository-wide scoring migration inventory.
 *
 * This does NOT claim to have completed the V3 evidence audit. It reconstructs
 * the score effect of retiring the independent restrictive-rules deduction,
 * while retaining the historical editorial score, Trustpilot adjustments,
 * closure handling, sources and every rule from Claude's deep audit.
 *
 * Usage:
 *   node scripts/report-v3-score-recalibration.cjs
 *   node scripts/report-v3-score-recalibration.cjs --write
 */

const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
require.extensions['.ts'] = (mod, filename) => {
  const original = fs.readFileSync(filename, 'utf8');
  const compiled = ts.transpileModule(original, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
      resolveJsonModule: true,
    },
  }).outputText;
  mod._compile(compiled, filename);
};

const { propFirms } = require(path.join(root, 'app/lib/propFirms.ts'));
const { getFirmUpdate } = require(path.join(root, 'app/lib/firmUpdates.ts'));
const { ruleKind } = require(path.join(root, 'app/lib/restrictiveRules.ts'));

const rows = propFirms.map((firm) => {
  const update = getFirmUpdate(firm.slug);
  const rules = update?.restrictiveRules ?? [];
  const riskRules = rules.filter((rule) => ruleKind(rule) === 'risk');
  const independentProofs = (firm.payoutProofs ?? []).filter((proof) => !proof.firmReported);
  const firmReportedProofs = (firm.payoutProofs ?? []).filter((proof) => proof.firmReported);
  const legacyPenalty = firm.rulesPenalty?.penalty ?? 0;
  const editorial = firm.rulesPenalty?.before ?? firm.trustpilotPenalty?.before ?? firm.closedCap?.before ?? firm.score;
  const withoutLegacyPenalty = Math.min(100, firm.score + legacyPenalty);
  const payoutRisk = firm.reviewSignals.payoutRisk;
  const regulatorRisk = firm.regulatoryAudit.riskLevel;
  const conflicts = rules.filter((rule) => rule.status === 'conflicting').length;
  const unanswered = payoutRisk === 'Non évalué' || payoutRisk === 'Non évalue' || payoutRisk === 'Not assessed';
  const isClosed = firm.status === 'Fermée';
  const reasonList = [
    /^(?:High|Critical|Élevé|Critique)$/.test(payoutRisk) ? 'payout risk signal (not necessarily a proven refusal)' : null,
    /^(?:High|Critical)$/.test(regulatorRisk) ? 'high legal/regulatory risk signal' : null,
    firm.reviewSignals.trustpilotRatingWithheld ? 'current Trustpilot integrity notice' : null,
  ].filter(Boolean);
  const highConcern = reasonList.length > 0;
  const priority = isClosed
    ? 'ARCHIVE'
    : highConcern ? 'P1 - risque à vérifier'
      : conflicts || legacyPenalty >= 8 || riskRules.length >= 3 || unanswered
        ? 'P2 - contrôle prioritaire'
        : 'P3 - contrôle normal';

  return {
    slug: firm.slug,
    firm: firm.name,
    status: firm.status,
    legacyScore: firm.score,
    editorial,
    legacyRulesPenalty: legacyPenalty,
    withoutLegacyPenalty,
    delta: withoutLegacyPenalty - firm.score,
    trustpilotPenalty: firm.trustpilotPenalty?.penalty ?? 0,
    payoutRisk,
    regulatorRisk,
    trustpilotNotice: Boolean(firm.reviewSignals.trustpilotRatingWithheld),
    independentProofs: independentProofs.length,
    firmReportedProofs: firmReportedProofs.length,
    payoutProofSourceUrls: (firm.payoutProofs ?? []).map((proof) => proof.url).join(' | '),
    riskClauseSourceUrls: [...new Set(riskRules.map((rule) => rule.source))].join(' | '),
    auditSources: firm.sources.length + firm.regulatoryAudit.sources.length + (update?.addSources?.length ?? 0),
    lastReviewed: firm.lastReviewed,
    auditStatus: firm.auditStatus,
    programmeCount: update?.auditedPrograms?.length ?? 0,
    ruleCount: rules.length,
    riskClausesForReview: riskRules.length,
    sourceConflictsForReview: conflicts,
    priority,
    priorityReason: reasonList.join(' | ') || (conflicts ? 'possible conflicting official documents' : unanswered ? 'payout risk not assessed' : 'standard evidence review'),
    verification: 'A/B/C/D/E review required — NOT a final V3 score',
  };
});

const csvColumns = [
  'slug', 'firm', 'status', 'legacyScore', 'editorial', 'legacyRulesPenalty',
  'withoutLegacyPenalty', 'delta', 'trustpilotPenalty', 'payoutRisk',
  'regulatorRisk', 'trustpilotNotice', 'independentProofs', 'firmReportedProofs',
  'payoutProofSourceUrls', 'riskClauseSourceUrls', 'auditSources', 'lastReviewed', 'auditStatus',
  'programmeCount', 'ruleCount', 'riskClausesForReview',
  'sourceConflictsForReview', 'priority', 'priorityReason', 'verification',
];
const quoteCsv = (value) => {
  const text = String(value ?? '');
  return /[,"\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};
const csv = [csvColumns.join(','), ...rows.map((row) => csvColumns.map((name) => quoteCsv(row[name])).join(','))].join('\n') + '\n';

const open = rows.filter((row) => row.status !== 'Fermée');
const impacted = open.filter((row) => row.delta > 0);
const focus = ['ftmo', 'the5ers', 'topstep', 'alpha-futures', 'audacity-capital',
  'apex-trader-funding', 'blue-guardian', 'funderpro', 'fundednext', 'ftuk',
  'sfx-funded', 'clarity-traders'];
const chosen = focus.map((slug) => rows.find((row) => row.slug === slug)).filter(Boolean);
const md = [
  '# PropRadar — tour complet des 197 fiches, préparation V3',
  '',
  '**Instantané du 20 novembre 2026. Il ne s’agit PAS de notes V3 finales.**',
  'Ce rapport inventorie toutes les firmes de `propFirms`, conserve les audits de Claude',
  'et montre seulement le résultat mécanique si l’ancienne pénalité automatique',
  '« règles contraignantes » disparaît. Les notes éditoriales actuelles, sanctions',
  'Trustpilot et plafonds de fermeture restent inchangés.',
  '',
  `- Fiches examinées : **${rows.length}** (${open.length} non fermées, ${rows.length - open.length} fermées).`,
  `- Notes qui bougeraient : **${impacted.length}**.`,
  `- Hausses d’au moins cinq points : **${impacted.filter((row) => row.delta >= 5).length}**.`,
  `- Hausses d’au moins dix points : **${impacted.filter((row) => row.delta >= 10).length}**.`,
  `- Fiches non fermées exigeant un examen de priorité P1 : **${open.filter((row) => row.priority.startsWith('P1')).length}**.`,
  `- Fiches avec au moins une clause candidate au risque contractuel : **${open.filter((row) => row.riskClausesForReview > 0).length}**.`,
  `- Fiches sans preuve indépendante étiquetée dans les données : **${open.filter((row) => row.independentProofs === 0).length}** (absence de pièce dans le fichier ≠ absence de payout).`,
  `- Avertissements Trustpilot en cours sur des firmes ouvertes : **${open.filter((row) => row.trustpilotNotice).length}** (sanction séparée de -6 inchangée).`,
  '',
  '## Exemples à contrôler avant tout changement de classement',
  '',
  '| Firme | Note publiée | Sans retrait automatique | Écart | Clauses à revoir |',
  '| --- | ---: | ---: | ---: | ---: |',
  ...chosen.map((row) => `| ${row.firm} | ${row.legacyScore} | ${row.withoutLegacyPenalty} | +${row.delta} | ${row.riskClausesForReview} |`),
  '',
  '## Ce qui reste à faire pour parler réellement de V3',
  '',
  '1. Appliquer à chaque firme les cinq sous-notes sourcées : **payouts 40, contrat 25, identité 15, offre 15, historique 5**.',
  '2. Distinguer **une clause qui peut permettre un refus** d’un refus de payout **effectivement établi** ; ne pas punir une consistance chiffrée ni une restriction news clairement annoncée.',
  '3. Corriger les incohérences d’attribution programme/phase/variante ; les candidats `conflicting` ne constituent pas automatiquement des contradictions réelles.',
  '4. Faire valider les fortes variations de notes et les firmes au risque P1 **avant tout déploiement** ; les multiples PR d’audit ouvertes ne doivent pas être écrasées.',
  '5. Conserver les sources et l’intégralité du travail d’audit en profondeur de Claude, même si la présentation destinée au lecteur devient plus concise.',
  '',
  '**Le CSV associé contient une ligne pour chaque firme et les colonnes de contrôle.**',
  'La colonne `withoutLegacyPenalty` est une **simulation**, pas une recommandation ferme.',
  '',
].join('\n');

if (process.argv.includes('--write')) {
  const reportDir = path.join(root, 'claude');
  fs.writeFileSync(path.join(reportDir, 'scoring-v3-all-firms-preview-2026-11-20.csv'), csv);
  fs.writeFileSync(path.join(reportDir, 'scoring-v3-all-firms-preview-2026-11-20.md'), md);
}
console.log(JSON.stringify({
  firms: rows.length,
  open: open.length,
  impacted: impacted.length,
  plusFive: impacted.filter((row) => row.delta >= 5).length,
  plusTen: impacted.filter((row) => row.delta >= 10).length,
  p1: open.filter((row) => row.priority.startsWith('P1')).length,
  withRiskClauses: open.filter((row) => row.riskClausesForReview > 0).length,
  noIndependentPayoutProofInData: open.filter((row) => row.independentProofs === 0).length,
}, null, 2));
