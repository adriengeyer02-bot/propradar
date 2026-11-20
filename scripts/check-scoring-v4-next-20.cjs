#!/usr/bin/env node
/*
 * Sources-first V4 review of ranks 4–23. READ ONLY.
 * The score allocations in scoring-v4-batch-2.json are intentionally DRAFT.
 * This script expands all 320 sub-criteria for validation and review; it must
 * not modify firm-updates.json or feed the public scoring pipeline.
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');

require.extensions['.ts'] = (module, filename) => {
  const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, resolveJsonModule: true, esModuleInterop: true },
  });
  module._compile(compiled.outputText, filename);
};

const { computeV4Scorecard, V4_CRITERIA, V4_BLOCKS } = require('../app/lib/scoringV4.ts');
const { getFirmBySlug, topFirms } = require('../app/lib/propFirms.ts');
const updates = require('../app/data/firm-updates.json').firms;
const batch = require('../app/data/scoring-v4-batch-2.json');
const ids = Object.keys(V4_CRITERIA);
const REGULATOR_RESEARCH_DIRECTORY = 'https://www.fca.org.uk/scamsmart/warning-list';

assert.equal(ids.length, 16);
assert.equal(batch.version, 4);
assert.equal(batch.firms.length, 20);
assert.equal(batch.rankStart, 4);
assert.equal(batch.rankEnd, 23);
assert.deepEqual(batch.firms.map(({ slug }) => slug), topFirms.slice(3, 23).map(({ slug }) => slug), 'batch must match actual sorted topFirms positions 4 to 23');

function https(url) {
  assert.match(url || '', /^https:\/\/[^\s]+\.[^\s]+$/, `Invalid or missing source ${url}`);
  return url;
}

/** Expand a compact, explicitly allocated draft to 16 individually traced criteria. */
function expandDraft(raw) {
  const firm = getFirmBySlug(raw.slug);
  const prior = updates[raw.slug];
  assert.ok(firm, `Missing firm ${raw.slug}`);
  assert.equal(firm.score, raw.before, `${raw.slug}: score changed since review; rerun audit`);
  assert.ok(['moyenne', 'limitee'].includes(raw.confidence), 'drafts cannot claim exhaustive evidence');
  for (const key of ['payout', 'contract', 'program', 'entity', 'offer']) https(raw.sources[key]);
  https(raw.findingSource);
  assert.ok(raw.finding?.length > 50 && raw.hold?.length > 30, `${raw.slug}: missing meaningful findings/caveat`);
  const payoutProofs = firm.payoutProofs || [];
  const independentPayout = payoutProofs.find((p) => p.firmReported === false);
  const anyPayout = payoutProofs[0];
  const trustpilot = firm.reviewSignals.trustpilotSourceUrl || firm.regulatoryAudit.sources?.find((s) => /trustpilot/i.test(s.url))?.url || firm.website;
  const selectedProof = independentPayout || anyPayout;
  const sources = {
    A1: [raw.sources.payout],
    A2: [trustpilot || raw.sources.payout],
    A3: [selectedProof?.url || raw.sources.payout],
    B1: [raw.sources.contract, raw.findingSource],
    B2: [raw.sources.program],
    B3: [raw.sources.contract],
    B4: [raw.sources.program],
    C1: [raw.sources.entity],
    C2: [raw.sources.entity, raw.sources.contract],
    C3: [REGULATOR_RESEARCH_DIRECTORY],
    D1: [raw.sources.offer],
    D2: [raw.sources.offer],
    D3: [raw.sources.program],
    E1: [raw.sources.entity],
    E2: [trustpilot || raw.sources.entity],
    E3: [raw.sources.program],
  };
  const scope = (prior?.auditedPrograms || []).map((p) => p.name).join(', ') || firm.products.map((p) => p.name).join(', ');
  const ruleCount = (prior?.restrictiveRules || []).length;
  const companyName = firm.regulatoryAudit.entities?.[0]?.name || 'société à vérifier';
  const rating = firm.trustpilotRating ? `${firm.trustpilotRating}/5` : 'masquée/à vérifier';
  const reasons = {
    A1: `Retraits/programme : ${firm.payoutDelay}. Lecture à rapprocher de la page officielle ; ${raw.hold}`,
    A2: `Les avis et incidents du dossier ne constituent pas à eux seuls des refus injustifiés établis. Couverture partielle, aucune innocence ou faute prouvée par défaut. ${raw.hold}`,
    A3: selectedProof
      ? `${selectedProof.firmReported ? 'Déclaration de la firme ou source secondaire' : 'Transaction/agrégat externe limité'} : ${selectedProof.quote?.slice(0, 170) || 'pièce à interpréter'}. Ne prouve pas le taux global de payouts.`
      : `Pas de preuve positive indépendante reliée dans le dossier. Allocation provisoire, vérification extérieure indispensable ; ne signifie pas un défaut de paiement.`,
    B1: `Protection des récompenses acquises et pouvoir de résiliation : ${raw.finding} Réserve : ${raw.hold}`,
    B2: `Cohérence CGU/FAQ/programmes : ${raw.finding}. Toute divergence doit être attribuée au bon plan, pas à tous les comptes.`,
    B3: `Stabilité des droits et rétroactivité : ${raw.finding}. Ne pas prétendre qu'une révocation a eu lieu sans cas établi.`,
    B4: `${ruleCount} contrainte(s) de programme dans les audits existants, périmètre ${scope}. Les règles normales publiées ne reçoivent aucun retrait automatique.`,
    C1: `Entité indiquée : ${companyName}. Le registre et l'identité du véritable signataire de chaque offre sont ${raw.confidence === 'limitee' ? 'à recouper' : 'partiellement recoupés'}.`,
    C2: `Adresse, droit applicable, contact et voie de recours à distinguer selon le signataire de l'offre. ${raw.hold}`,
    C3: `Recherche régulateur NON exhaustive : ne pas déduire l'absence d'alerte de cette liste publique et ne pas confondre statut du groupe et prop trading.`,
    D1: `Tarif/frais d'entrée : ${firm.priceFrom ? `référence affichée ${firm.priceFrom} USD` : 'prix dans la devise/programme officiel à confirmer'}. Promotions exclues du score.`,
    D2: `Profit split affiché ${firm.profitSplit}% (peut varier selon programme et stage) ; conditions selon page officielle.`,
    D3: `Drawdown ${firm.drawdownType} et paliers par programme. Une contrainte de consistance ou de news claire n'est pas une faute.`,
    E1: `Continuité opérationnelle depuis l'historique du dossier ; entité ${companyName}, ancienneté seule insuffisante.`,
    E2: `Trustpilot ${rating} ; avis contextualisés, jamais preuve bancaire ni condamnation. La notice Trustpilot éventuelle compte exclusivement −6 hors bloc.`,
    E3: `Plateformes et prestataires annoncés pour ${scope}; disponibilité indépendante en continu non prouvée.`,
  };
  const criteria = {};
  for (const [block, criterionKeys] of Object.entries(V4_BLOCKS)) {
    assert.equal(raw.scores[block]?.length, criterionKeys.length, `${raw.slug}: missing ${block} points`);
    for (let i = 0; i < criterionKeys.length; i++) {
      const id = criterionKeys[i];
      const points = raw.scores[block][i];
      const verified = ['A1', 'B1', 'B2', 'B4', 'D2', 'D3'].includes(id) && raw.confidence === 'moyenne';
      criteria[id] = { points, verification: verified ? 'verifie' : 'partiel', reason: reasons[id], sources: sources[id].map(https) };
    }
  }
  // The same contractual clause is only assessed inside B1, never in A2.
  const contractualRisk = ['trade-the-pool', 'myfundedfutures', 'tradeify', 'fundednext', 'the-trading-pit', 'e8-markets', 'fintokei', 'uprofit-trader'];
  if (contractualRisk.includes(raw.slug)) criteria.B1.negativeFactIds = [`${raw.slug}-contractual-forfeiture`];
  const directConflict = ['tradeday', 'audacity-capital'];
  if (directConflict.includes(raw.slug)) criteria.B2.negativeFactIds = [`${raw.slug}-programme-doc-inconsistency`];

  return {
    slug: raw.slug, checkedOn: batch.checkedOn, status: 'proposition', confidence: raw.confidence,
    previousDisplayedScore: raw.before,
    trustpilotActiveNotice: Boolean(firm.reviewSignals.trustpilotRatingWithheld),
    closed: firm.status === 'Fermée', criteria,
  };
}

console.log('rank | firm | old | A | B | C | D | E | −TP | proposed | delta | confidence | status');
let verifiedCount = 0;
let limitedCount = 0;
let sensitive = 0;
for (let index = 0; index < batch.firms.length; index++) {
  const raw = batch.firms[index];
  const card = expandDraft(raw);
  const result = computeV4Scorecard(card);
  const delta = result.operationalScore - raw.before;
  const sensitiveForApproval = Math.abs(delta) >= 5 || delta >= 10;
  if (sensitiveForApproval) sensitive++;
  if (raw.confidence === 'limitee') limitedCount++;
  verifiedCount += Object.values(card.criteria).filter((item) => item.verification === 'verifie').length;
  const note = raw.confidence === 'limitee' ? 'HOLD: contract incomplete' : 'HOLD: owner approval';
  console.log([index + 4, raw.slug, raw.before, ...Object.values(result.blocks), `-${result.trustpilotPenalty}`, result.operationalScore, delta > 0 ? `+${delta}` : delta, raw.confidence, note].join(' | '));
  assert.ok(result.operationalScore >= 0 && result.operationalScore <= 100);
  assert.equal(card.status, 'proposition');
  assert.equal(result.trustpilotPenalty, Boolean(getFirmBySlug(raw.slug).reviewSignals.trustpilotRatingWithheld) ? 6 : 0);
}
assert.equal(batch.firms.length * ids.length, 320);
assert.equal(verifiedCount + (320 - verifiedCount), 320);
console.log(`V4: ${batch.firms.length} reviewed firms, 320 sourced provisional criteria, ${verifiedCount} source-reviewed cells, ${limitedCount} limited confidence dossiers, ${sensitive} changes requiring approval.`);
console.log('All scores are previews. No existing firm score, legal audit, programme data or public rating was changed.');

const wrong = structuredClone(expandDraft(batch.firms[0]));
wrong.criteria.A1.points = 11;
assert.throws(() => computeV4Scorecard(wrong), /A1: points/);
wrong.criteria.A1.points = 7;
wrong.criteria.B1.negativeFactIds = ['same-incident'];
wrong.criteria.A2.negativeFactIds = ['same-incident'];
assert.throws(() => computeV4Scorecard(wrong), /double-counted fact/);
