/**
 * Validates app/data/firm-updates.json and classifies the change set.
 *
 *   npx tsx scripts/validate-firm-updates.ts [--base <path-to-previous-json>]
 *
 * Exit code 1 when the file is invalid. Prints whether the update is
 * "sensitive" (needs a human approval) and why. In GitHub Actions it also
 * writes `sensitive=true|false` to $GITHUB_OUTPUT.
 *
 * Sensitive = anything that can hurt a firm or mislead a buyer if wrong:
 * status changes, score drops of 5+ points or moves of 10+, domain warnings,
 * new incidents, and accusation-type wording (scam, fraud...).
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { basePropFirms, propFirms } from '../app/lib/propFirms';
import { RESTRICTIVE_RULE_CATEGORIES, type FirmUpdate } from '../app/lib/firmUpdates';
import { computeRulesPenalty, RULES_PENALTY_ENABLED } from '../app/lib/restrictiveRules';

const FILE = 'app/data/firm-updates.json';
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const STATUSES = new Set(['Active', 'À surveiller', 'Fermée']);
const SET_KEYS = new Set([
  'status', 'verdict', 'auditSummary', 'score', 'priceFrom', 'nativePriceFrom', 'profitSplit', 'payoutDelay',
  'trustpilotRating', 'trustpilotReviewCount', 'trustpilotSourceUrl', 'listedDomainWarning', 'officialWebsite', 'historicLogoDomain',
  'drawdownType', 'newsTrading', 'eaAllowed', 'noEntryFee', 'trustpilotNoticeLifted',
]);
const DRAWDOWN_TYPES = new Set(['EOD', 'Trailing', 'Static', 'Hybride']);
const PRODUCT_TYPES = new Set(['Challenge', 'Instant funding', 'Futures evaluation', 'Scaling']);
const BANNED_WORDS = /\b(scam|fraud|fraudulent|criminal|thie(f|ves)|steal|stole|arnaque|escroc)\w*/i;

type File = { version: number; firms: Record<string, FirmUpdate> };

function load(path: string): File {
  return JSON.parse(readFileSync(path, 'utf8')) as File;
}

function isHttpsUrl(value: unknown) {
  if (typeof value !== 'string') return false;
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

const baseArg = process.argv.indexOf('--base');
const basePath = baseArg > -1 ? process.argv[baseArg + 1] : undefined;
const current = load(FILE);
const previous: File = basePath && existsSync(basePath) ? load(basePath) : { version: 1, firms: {} };
const bySlug = new Map(basePropFirms.map((firm) => [firm.slug, firm]));
const today = new Date().toISOString().slice(0, 10);

const errors: string[] = [];
const sensitive: string[] = [];
const summary: string[] = [];
const penaltyChanges: string[] = [];

if (current.version !== 1) errors.push('version must be 1');

for (const [slug, update] of Object.entries(current.firms ?? {})) {
  const firm = bySlug.get(slug);
  const where = `firms.${slug}`;
  if (!firm) {
    errors.push(`${where}: unknown slug`);
    continue;
  }
  if (!DATE.test(update.reviewedAt ?? '') || update.reviewedAt > today) errors.push(`${where}.reviewedAt: YYYY-MM-DD, not in the future`);
  if (update.restrictiveRules !== undefined) {
    if (!Array.isArray(update.restrictiveRules) || !update.restrictiveRules.length) errors.push(`${where}.restrictiveRules: non-empty array required`);
    for (const [index, rule] of (update.restrictiveRules ?? []).entries()) {
      const at = `${where}.restrictiveRules[${index}]`;
      if (!rule.program?.trim() || !rule.rule?.trim() || !rule.impact?.trim()) errors.push(`${at}: program, rule and impact are required`);
      if (!isHttpsUrl(rule.source)) errors.push(`${at}.source: public https source required`);
      if (rule.status && rule.status !== 'conflicting') errors.push(`${at}.status: only 'conflicting' is supported`);
      if (BANNED_WORDS.test(`${rule.rule} ${rule.impact}`)) sensitive.push(`${slug}: restrictive-rule wording needs a legal read`);
      // Scoring fields (SCORING.md 2): all four or none (legacy rules are shown, not counted).
      const scoring = [rule.category, rule.severity, rule.clarity, rule.appliesTo];
      if (scoring.some((value) => value !== undefined) && scoring.some((value) => value === undefined)) errors.push(`${at}: category, severity, clarity and appliesTo go together`);
      if (rule.category !== undefined && !(RESTRICTIVE_RULE_CATEGORIES as readonly string[]).includes(rule.category)) errors.push(`${at}.category: unknown "${rule.category}"`);
      if (rule.severity !== undefined && !['minor', 'major', 'blocking'].includes(rule.severity)) errors.push(`${at}.severity: minor | major | blocking`);
      if (rule.clarity !== undefined && !['clear', 'buried', 'vague'].includes(rule.clarity)) errors.push(`${at}.clarity: clear | buried | vague`);
      if (rule.appliesTo !== undefined) {
        const keys = new Set((update.auditedPrograms ?? []).map((program) => program.key));
        if (!Array.isArray(rule.appliesTo) || !rule.appliesTo.length) errors.push(`${at}.appliesTo: non-empty array`);
        else if (keys.size && rule.appliesTo.some((key) => key !== '*' && !keys.has(key))) errors.push(`${at}.appliesTo: unknown programme key (declare it in auditedPrograms)`);
      }
    }
    if (!(update.changelog ?? []).some((entry) => (update.restrictiveRules ?? []).some((rule) => rule.source === entry.source))) {
      errors.push(`${where}.restrictiveRules: at least one rule source must appear in the dated changelog`);
    }
  }
  if (update.auditedPrograms !== undefined) {
    const keys = (update.auditedPrograms ?? []).map((program) => program.key);
    if (!Array.isArray(update.auditedPrograms) || !keys.length || keys.some((key) => !key?.trim() || key === '*')) errors.push(`${where}.auditedPrograms: non-empty list of { key, name }`);
    if (new Set(keys).size !== keys.length) errors.push(`${where}.auditedPrograms: duplicate key`);
  }
  {
    // Restrictive-rules penalty impact (SCORING.md 2), reported even while the switch is off.
    const after = computeRulesPenalty(update)?.penalty ?? 0;
    const before = computeRulesPenalty(previous.firms?.[slug])?.penalty ?? 0;
    if (after !== before) {
      penaltyChanges.push(`${slug}: rules penalty ${before} -> ${after}`);
      if (RULES_PENALTY_ENABLED && (before - after <= -5 || Math.abs(after - before) >= 10)) sensitive.push(`${slug}: displayed score moves by ${before - after} (restrictive-rules penalty)`);
    }
  }
  if (update.setLegalReview !== undefined) {
    const legal = update.setLegalReview;
    if (!legal.summary || legal.summary.length < 40) errors.push(`${where}.setLegalReview.summary: substantive text required`);
    for (const key of ['complaintsAndDisputes', 'redFlags'] as const) {
      if (!Array.isArray(legal[key]) || legal[key].some((item) => typeof item !== 'string' || !item.trim())) errors.push(`${where}.setLegalReview.${key}: array of non-empty strings required`);
    }
    if (legal.regulatoryStatus !== undefined && (!Array.isArray(legal.regulatoryStatus) || legal.regulatoryStatus.some((item) => typeof item !== 'string' || !item.trim()))) {
      errors.push(`${where}.setLegalReview.regulatoryStatus: array of non-empty strings required`);
    }
    if (!Array.isArray(legal.sources) || !legal.sources.length || legal.sources.some((source) => !source.label || !isHttpsUrl(source.url))) errors.push(`${where}.setLegalReview.sources: public sources required`);
    for (const key of Object.keys(legal)) {
      if (!['summary', 'regulatoryStatus', 'complaintsAndDisputes', 'redFlags', 'sources'].includes(key)) errors.push(`${where}.setLegalReview.${key}: field not allowed`);
    }
    if (!(update.changelog ?? []).some((entry) => entry.fields?.includes('legalReview') && legal.sources?.some((source) => source.url === entry.source))) errors.push(`${where}.setLegalReview: matching sourced legalReview changelog required`);
    const oldSources = new Set([...firm.sources, ...firm.regulatoryAudit.sources, ...(previous.firms?.[slug]?.addSources ?? []), ...(previous.firms?.[slug]?.setLegalReview?.sources ?? [])].map((source) => source.url));
    const newLegalSources = (legal.sources ?? []).filter((source) => !oldSources.has(source.url));
    if (newLegalSources.length) sensitive.push(`${slug}: legal review introduces ${newLegalSources.length} new source(s); check for new incidents before merge`);
    if (BANNED_WORDS.test(JSON.stringify(legal))) sensitive.push(`${slug}: legal-review wording needs a legal read`);
  }
  if (update.setEntities !== undefined) {
    if (!Array.isArray(update.setEntities) || !update.setEntities.length) errors.push(`${where}.setEntities: non-empty array required`);
    for (const [index, entity] of (update.setEntities ?? []).entries()) {
      if (!entity?.name || !entity?.jurisdiction) errors.push(`${where}.setEntities[${index}]: name and jurisdiction required`);
    }
    if (!(update.changelog ?? []).some((entry) => entry.fields?.includes('entities') && isHttpsUrl(entry.source))) {
      errors.push(`${where}.setEntities: a changelog entry with fields ["entities"] and an https source is required`);
    }
  }
  for (const [index, proof] of (update.addPayoutProofs ?? []).entries()) {
    const at = `${where}.addPayoutProofs[${index}]`;
    if (!DATE.test(proof?.date ?? '') || proof.date > today) errors.push(`${at}.date: YYYY-MM-DD, not in the future`);
    if (!['official', 'press', 'onchain'].includes(proof?.kind)) errors.push(`${at}.kind must be official, press or onchain`);
    if (!isHttpsUrl(proof?.url)) errors.push(`${at}.url must be an https URL`);
    if (!proof?.publisher || !proof?.quote || proof.quote.length < 8) errors.push(`${at}: publisher and an exact quote are required`);
    if (typeof proof?.firmReported !== 'boolean') errors.push(`${at}.firmReported must be true or false`);
  }
  if (update.addPayoutProofs?.length && !(update.changelog ?? []).some((entry) => entry.fields?.includes('payoutProofs') && isHttpsUrl(entry.source))) {
    errors.push(`${where}.addPayoutProofs: a changelog entry with fields ["payoutProofs"] and an https source is required`);
  }
  if (update.set?.drawdownType !== undefined && !DRAWDOWN_TYPES.has(update.set.drawdownType)) errors.push(`${where}.set.drawdownType must be EOD, Trailing, Static or Hybride`);
  if (update.set?.nativePriceFrom !== undefined && (!(update.set.nativePriceFrom.amount > 0) || !['EUR', 'GBP'].includes(update.set.nativePriceFrom.currency))) errors.push(`${where}.set.nativePriceFrom needs a positive amount and EUR or GBP currency`);
  if (update.setProducts !== undefined) {
    if (!Array.isArray(update.setProducts) || !update.setProducts.length) errors.push(`${where}.setProducts: non-empty array required`);
    for (const [index, product] of (update.setProducts ?? []).entries()) {
      const at = `${where}.setProducts[${index}]`;
      if (!product?.id || !product?.name || !PRODUCT_TYPES.has(product?.type)) errors.push(`${at}: id, name and a valid type are required`);
      if (!(product?.accountSizeMin > 0) || !(product?.accountSizeMax >= product?.accountSizeMin)) errors.push(`${at}: account sizes read on the source are required`);
      for (const key of ['profitTarget', 'maxDailyLoss', 'maxDrawdown', 'profitSplit', 'description']) {
        const value = (product as unknown as Record<string, unknown>)?.[key];
        if (typeof value !== 'string' || !value) errors.push(`${at}.${key} required (write "not stated" if the source does not say)`);
      }
      if (!Array.isArray(product?.platforms) || !Array.isArray(product?.tradableAssets)) errors.push(`${at}: platforms and tradableAssets arrays required`);
      if (product?.drawdownType !== undefined && !DRAWDOWN_TYPES.has(product.drawdownType)) errors.push(`${at}.drawdownType must be EOD, Trailing, Static or Hybride`);
      if (product?.drawdownType !== undefined && !isHttpsUrl(product.drawdownSource)) errors.push(`${at}.drawdownSource required for a verified programme drawdown type`);
      if (product?.drawdownSource !== undefined && !isHttpsUrl(product.drawdownSource)) errors.push(`${at}.drawdownSource must be an https URL`);
      if (product?.drawdownDetails !== undefined && (typeof product.drawdownDetails !== 'string' || product.drawdownDetails.length < 12)) errors.push(`${at}.drawdownDetails must describe the calculation or lock mechanics`);
      if (typeof product?.hasConsistencyRule !== 'boolean') errors.push(`${at}.hasConsistencyRule must be true or false`);
      if ('linkToStart' in (product ?? {})) errors.push(`${at}.linkToStart: start links are never set by an update`);
    }
    if (!(update.changelog ?? []).some((entry) => entry.fields?.includes('products') && isHttpsUrl(entry.source))) {
      errors.push(`${where}.setProducts: a changelog entry with fields ["products"] and an https source is required`);
    }
  }
  if (!Array.isArray(update.changelog) || update.changelog.length === 0) errors.push(`${where}.changelog: at least one entry required`);
  for (const [index, entry] of (update.changelog ?? []).entries()) {
    if (!DATE.test(entry.date ?? '') || entry.date > today) errors.push(`${where}.changelog[${index}].date invalid`);
    if (!entry.summary || entry.summary.length < 20) errors.push(`${where}.changelog[${index}].summary too short`);
    if (!isHttpsUrl(entry.source)) errors.push(`${where}.changelog[${index}].source must be an https URL`);
    if (BANNED_WORDS.test(entry.summary ?? '')) sensitive.push(`${slug}: changelog wording "${entry.summary.match(BANNED_WORDS)?.[0]}" needs a legal read`);
  }
  for (const key of Object.keys(update.set ?? {})) {
    if (!SET_KEYS.has(key)) errors.push(`${where}.set.${key}: field not allowed`);
  }
  const set = update.set ?? {};
  if (set.verdict !== undefined) {
    if (typeof set.verdict !== 'string' || set.verdict.trim().length < 40) errors.push(`${where}.set.verdict: a substantive introduction is required`);
    if (!(update.changelog ?? []).some((entry) => entry.fields?.includes('verdict') && isHttpsUrl(entry.source))) {
      errors.push(`${where}.set.verdict: a changelog entry with fields ["verdict"] and an https source is required`);
    }
    if (BANNED_WORDS.test(set.verdict)) sensitive.push(`${slug}: introduction wording needs a legal read`);
  }
  if (set.auditSummary !== undefined) {
    if (typeof set.auditSummary !== 'string' || set.auditSummary.trim().length < 100) errors.push(`${where}.set.auditSummary: a substantive, sourced audit narrative (100+ characters) is required`);
    if (!(update.changelog ?? []).some((entry) => entry.fields?.includes('auditSummary') && isHttpsUrl(entry.source))) {
      errors.push(`${where}.set.auditSummary: a changelog entry with fields ["auditSummary"] and an https source is required`);
    }
    if (BANNED_WORDS.test(set.auditSummary)) sensitive.push(`${slug}: audit summary wording needs a legal read`);
  }
  if (set.status !== undefined && !STATUSES.has(set.status)) errors.push(`${where}.set.status invalid`);
  if (set.score !== undefined && (!Number.isInteger(set.score) || set.score < 0 || set.score > 100)) errors.push(`${where}.set.score must be 0-100`);
  if (set.trustpilotRating !== undefined && (set.trustpilotRating < 1 || set.trustpilotRating > 5)) errors.push(`${where}.set.trustpilotRating must be 1-5`);
  if (set.profitSplit !== undefined && (set.profitSplit < 0 || set.profitSplit > 100)) errors.push(`${where}.set.profitSplit must be 0-100`);
  if (set.trustpilotSourceUrl !== undefined && !isHttpsUrl(set.trustpilotSourceUrl)) errors.push(`${where}.set.trustpilotSourceUrl must be https`);
  for (const source of update.addSources ?? []) {
    if (!source.label || !isHttpsUrl(source.url)) errors.push(`${where}.addSources: label + https url required`);
  }
  if (BANNED_WORDS.test(JSON.stringify(update.addIncidents ?? []) + (set.listedDomainWarning ?? ''))) {
    sensitive.push(`${slug}: accusation-type wording in incidents or warning needs a legal read`);
  }

  // Sensitivity is judged on what changed versus the previous file.
  const before = previous.firms?.[slug];
  const beforeSet = before?.set ?? {};
  const beforeScore = beforeSet.score ?? firm.score;
  const beforeStatus = beforeSet.status ?? firm.status;
  if (set.status !== undefined && set.status !== beforeStatus) sensitive.push(`${slug}: status ${beforeStatus} -> ${set.status}`);
  if (set.score !== undefined && set.score !== beforeScore) {
    const delta = set.score - beforeScore;
    if (delta <= -5 || Math.abs(delta) >= 10) sensitive.push(`${slug}: score ${beforeScore} -> ${set.score}`);
    else summary.push(`${slug}: score ${beforeScore} -> ${set.score}`);
  }
  if (set.listedDomainWarning && set.listedDomainWarning !== beforeSet.listedDomainWarning) sensitive.push(`${slug}: domain warning`);
  if (set.trustpilotNoticeLifted !== undefined) {
    if (!DATE.test(set.trustpilotNoticeLifted)) errors.push(`${where}.set.trustpilotNoticeLifted must be YYYY-MM-DD`);
    if (typeof set.trustpilotRating !== 'number') errors.push(`${where}.set.trustpilotNoticeLifted needs set.trustpilotRating`);
    if (set.trustpilotNoticeLifted !== beforeSet.trustpilotNoticeLifted) sensitive.push(`${slug}: Trustpilot notice lifted`);
  }
  if (set.officialWebsite !== undefined) {
    if (!isHttpsUrl(set.officialWebsite)) errors.push(`${where}.set.officialWebsite must be an https URL`);
    else if (set.officialWebsite !== beforeSet.officialWebsite) sensitive.push(`${slug}: official website -> ${set.officialWebsite}`);
  }
  if (set.historicLogoDomain !== undefined) {
    if (typeof set.historicLogoDomain !== 'string' || !/^[a-z\d.-]+\.[a-z]{2,}$/i.test(set.historicLogoDomain)) {
      errors.push(`${where}.set.historicLogoDomain: valid domain required`);
    }
    if (!(update.changelog ?? []).some((entry) => entry.fields?.includes('historicLogoDomain') && isHttpsUrl(entry.source))) {
      errors.push(`${where}.set.historicLogoDomain: sourced logo provenance changelog required`);
    }
    if (set.historicLogoDomain !== beforeSet.historicLogoDomain) sensitive.push(`${slug}: historic logo domain -> ${set.historicLogoDomain}`);
  }
  const newIncidents = (update.addIncidents ?? []).filter((item) => !(before?.addIncidents ?? []).includes(item));
  if (newIncidents.length) sensitive.push(`${slug}: ${newIncidents.length} new incident(s)`);
  if (JSON.stringify(before) !== JSON.stringify(update)) summary.push(`${slug}: updated (${update.reviewedAt})`);
}

// A completed multi-source label cannot coexist with the watchlist fallback.
// Check effective profiles, including product updates that rewrite introductions.
for (const firm of propFirms) {
  if (firm.status !== 'Fermée' && firm.auditStatus === 'Vérifié multi-source' && /(?:has not been|have not been) audited in depth/i.test(firm.verdict)) {
    errors.push(`${firm.slug}: multi-source audit status contradicts the introduction; add a sourced verdict correction`);
  }
}

if (errors.length) {
  console.error(`firm-updates.json is invalid:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}

const isSensitive = sensitive.length > 0;
console.log(`Valid. ${Object.keys(current.firms).length} firm update(s) in file.`);
if (summary.length) console.log(`Changes:\n- ${summary.join('\n- ')}`);
if (penaltyChanges.length) console.log(`Restrictive-rules penalty (${RULES_PENALTY_ENABLED ? 'APPLIED to displayed scores' : 'computed, not applied: RULES_PENALTY_ENABLED is off'}), ${penaltyChanges.length} firm(s):\n- ${penaltyChanges.join('\n- ')}`);
console.log(isSensitive ? `SENSITIVE - human approval required:\n- ${sensitive.join('\n- ')}` : 'Not sensitive: safe to merge automatically.');
if (process.env.GITHUB_OUTPUT) writeFileSync(process.env.GITHUB_OUTPUT, `sensitive=${isSensitive}\n`, { flag: 'a' });
