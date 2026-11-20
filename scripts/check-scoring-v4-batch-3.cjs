#!/usr/bin/env node
/*
 * Read-only quality gate: ranks 24–43, V4 editorial PREVIEWS ONLY.
 * Existing Claude audits, live scores and programme-specific rules stay intact.
 * A blocked audit is not assigned a V4 number; its historic score is unchanged.
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');

require.extensions['.ts'] = (module, filename) => {
  const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  });
  module._compile(compiled.outputText, filename);
};

const { computeV4Scorecard, V4_CRITERIA, V4_BLOCKS } = require('../app/lib/scoringV4.ts');
const { topFirms, getFirmBySlug } = require('../app/lib/propFirms.ts');
const currentUpdates = require('../app/data/firm-updates.json').firms;
const batch = require('../app/data/scoring-v4-batch-3.json');
const criteriaIds = Object.keys(V4_CRITERIA);
const BLOCKED = new Set(['tickticktrader', 'tradefundrr', 'traders-central', 'rocket21-challenge']);

assert.equal(batch.version, 4);
assert.equal(batch.checkedOn, '2026-11-20');
assert.equal(batch.status, 'editorial-draft-not-live');
assert.equal(batch.rankStart, 24);
assert.equal(batch.rankEnd, 43);
assert.equal(batch.firms.length, 20);
assert.equal(criteriaIds.length, 16);
assert.deepEqual(batch.firms.map(({ slug }) => slug), topFirms.slice(23, 43).map(({ slug }) => slug), 'actual ranks changed; recheck the batch');

function https(url) {
  assert.match(url || '', /^https:\/\/[^\s]+\.[^\s]+$/, `Invalid or absent evidence URL: ${url}`);
  return url;
}

function expandScore(raw) {
  assert.ok(!BLOCKED.has(raw.slug), `${raw.slug}: blocked dossier must not get a V4 score`);
  assert.equal(raw.confidence, 'moyenne', `${raw.slug}: no score is described as high-confidence`);
  assert.ok(raw.scores && typeof raw.scores === 'object', `${raw.slug}: missing criterion allocation`);
  for (const field of ['b1', 'b2', 'b3', 'hold']) {
    assert.ok(raw[field]?.length > 45, `${raw.slug}: missing contractual assessment ${field}`);
  }
  for (const field of ['payout', 'contract', 'program', 'entity', 'offer']) https(raw.sources?.[field]);

  const firm = getFirmBySlug(raw.slug);
  const dossier = currentUpdates[raw.slug];
  const proof = (firm.payoutProofs || []).find((item) => item.firmReported === false) || firm.payoutProofs?.[0];
  const trustpilot = firm.reviewSignals.trustpilotSourceUrl || firm.regulatoryAudit.sources?.find((s) => /trustpilot/i.test(s.url))?.url || firm.website || raw.sources.entity;
  const entity = firm.regulatoryAudit.entities?.[0]?.name || 'entité à recouper';
  const programNames = (dossier?.auditedPrograms || []).map((p) => p.name).join(', ') || firm.products.map((p) => p.name).join(', ');
  const restrictionCount = dossier?.restrictiveRules?.length || 0;
  const mappings = {
    A1: [raw.sources.payout, `Méthode et fréquence de versement selon la formule : ${firm.payoutDelay}. ${raw.hold}`],
    A2: [trustpilot, `Aucun refus injustifié établi par les seuls commentaires/clauses du dossier. Incidents réels vérifiés séparément ; couverture incomplète. ${raw.hold}`],
    A3: [proof?.url || raw.sources.payout, proof
      ? `${proof.firmReported ? 'Source déclarative de la firme' : 'Signal de transaction externe'} : ${(proof.quote || '').slice(0, 140)}. Ceci ne démontre pas le taux général de versement.`
      : `Aucune preuve positive indépendante recensée dans la fiche : points provisoires, sans présumer une défaillance de payout.`],
    B1: [raw.sources.contract, `Droits aux rémunérations acquises, clauses interprétables et pouvoir de refus : ${raw.b1}`],
    B2: [raw.sources.program, `Cohérence CGU/FAQ/programme et bonne version du contrat : ${raw.b2}`],
    B3: [raw.sources.contract, `Droits des comptes existants et modifications rétroactives : ${raw.b3}`],
    B4: [raw.sources.program, `${restrictionCount} règles consignées par Claude pour ${programNames}. La consistance, la limite de risque et le news trading clairement annoncés ne sont pas des fautes en soi.`],
    C1: [raw.sources.entity, `Signataire mentionné ${entity}. Registre et qualité juridique à recouper par contrat, sans supposer une garantie groupe.`],
    C2: [raw.sources.entity, `Adresse, juridiction et recours : l'information figure dans l'environnement contractuel, validité pour le programme particulier encore partielle.`],
    C3: ['https://www.fca.org.uk/scamsmart/warning-list', `Recherche régulateur non exhaustive. On ne peut inférer aucune absence totale d'alerte d'une liste unique.`],
    D1: [raw.sources.offer, `Prix de référence annoncé ${firm.priceFrom || 'à vérifier'} USD, promotions exclues ; marché et compte comparable à revalider.`],
    D2: [raw.sources.offer, `Profit split ${firm.profitSplit}% indicatif selon contrat et type de compte.`],
    D3: [raw.sources.program, `Drawdown indiqué ${firm.drawdownType}, vérifier la formule retenue. Une limite de trading explicite n'est pas sanctionnée pour sa simple existence.`],
    E1: [raw.sources.entity, `Continuité du service et historique de ${entity}, source officielle seule non suffisante pour certifier la continuité.`],
    E2: [trustpilot, `Avis et notice contextualisés, ne constituent pas une preuve de refus de payout. Si masquage actif, −6 uniquement en dehors des blocs.`],
    E3: [raw.sources.program, `Plateformes et fournisseurs du programme ${programNames} : source déclarative, stabilité effective non vérifiée en permanence.`],
  };

  const criteria = {};
  for (const [block, ids] of Object.entries(V4_BLOCKS)) {
    assert.equal(raw.scores[block]?.length, ids.length, `${raw.slug}: ${block} allocation mismatch`);
    ids.forEach((id, index) => {
      const [url, reason] = mappings[id];
      criteria[id] = {
        points: raw.scores[block][index],
        verification: ['B1', 'B4', 'D3'].includes(id) || (id === 'B2' && raw.slug === 'funderpro') ? 'verifie' : 'partiel',
        reason,
        sources: [https(url)],
      };
    });
  }
  if (['funding-pips', 'ftuk', 'hantec-trader', 'leeloo-trading', 'hola-prime', 'bulenox'].includes(raw.slug)) {
    criteria.B1.negativeFactIds = [`${raw.slug}:subjective-reward-forfeiture-clause`];
  }
  // Different documented facts only. Product/edition differences are explicitly
  // not treated as a B2 contradiction without a same-version signed conflict.
  if (raw.slug === 'funderpro') criteria.B2.negativeFactIds = ['funderpro:instant-drawdown-example-mismatch'];

  return {
    slug: raw.slug, checkedOn: batch.checkedOn, status: 'proposition', confidence: raw.confidence,
    previousDisplayedScore: raw.before,
    trustpilotActiveNotice: Boolean(firm.reviewSignals.trustpilotRatingWithheld),
    closed: firm.status === 'Fermée', criteria,
  };
}

const rows = [];
let proposed = 0;
let blocked = 0;
let sourceCells = 0;
let approval = 0;
console.log('rank | firme | actuelle | blocs A/B/C/D/E | TP | proposition | écart | résultat');
for (let i = 0; i < batch.firms.length; i++) {
  const raw = batch.firms[i];
  const firm = getFirmBySlug(raw.slug);
  assert.ok(firm, `${raw.slug}: unknown firm`);
  assert.equal(currentUpdates[raw.slug]?.score ?? firm.score, raw.before, `${raw.slug}: old score changed, regenerate audit`);
  assert.ok(['moyenne', 'limitee'].includes(raw.confidence));
  if (BLOCKED.has(raw.slug)) {
    assert.equal(raw.scores, null, `${raw.slug}: HOLD requires scores:null`);
    assert.equal(raw.confidence, 'limitee');
    assert.ok(raw.blocker?.length > 90);
    assert.equal(raw.evidence, https(raw.evidence));
    for (const field of ['payout', 'contract', 'program', 'entity', 'offer']) https(raw.sources?.[field]);
    blocked++;
    rows.push({ rank: i + 24, slug: raw.slug, before: raw.before, after: null, hold: raw.blocker });
    console.log(`${i + 24} | ${raw.slug} | ${raw.before} | — | — | — | — | AUDIT BLOQUÉ`);
    continue;
  }

  const card = expandScore(raw);
  const result = computeV4Scorecard(card);
  const delta = result.operationalScore - raw.before;
  assert.ok(!card.closed, `${raw.slug}: surprise closure requires separate evidence`);
  assert.equal(result.trustpilotPenalty, firm.reviewSignals.trustpilotRatingWithheld ? 6 : 0);
  assert.ok(result.operationalScore >= 0 && result.operationalScore <= 100);
  proposed++;
  sourceCells += Object.keys(card.criteria).length;
  if (Math.abs(delta) >= 5) approval++;
  rows.push({ rank: i + 24, slug: raw.slug, before: raw.before, after: result.operationalScore, delta, blocks: result.blocks, trustpilotPenalty: result.trustpilotPenalty });
  console.log(`${i + 24} | ${raw.slug} | ${raw.before} | ${Object.values(result.blocks).join('/')} | −${result.trustpilotPenalty} | ${result.operationalScore} | ${delta >= 0 ? '+' : ''}${delta} | à valider`);
}

assert.equal(proposed, 16);
assert.equal(blocked, 4);
assert.equal(sourceCells, 16 * 16);
const incorrect = expandScore(batch.firms[0]);
incorrect.criteria.A1.points = 11;
assert.throws(() => computeV4Scorecard(incorrect), /A1: points/);
incorrect.criteria.A1.points = 8;
incorrect.criteria.A2.negativeFactIds = ['same-incident'];
incorrect.criteria.B1.negativeFactIds = ['same-incident'];
assert.throws(() => computeV4Scorecard(incorrect), /double-counted fact/);
console.log(`\n✓ 20 dossiers / 16 notes V4 provisoires / 4 audits bloqués / ${sourceCells} critères documentés / ${approval} variations ≥5 à valider.`);
console.log('Aucune note publique ni audit de Claude modifié. La référence de preuve n’équivaut pas à une vérification indépendante.');
