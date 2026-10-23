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
import { basePropFirms } from '../app/lib/propFirms';
import type { FirmUpdate } from '../app/lib/firmUpdates';

const FILE = 'app/data/firm-updates.json';
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const STATUSES = new Set(['Active', 'À surveiller', 'Fermée']);
const SET_KEYS = new Set([
  'status', 'score', 'priceFrom', 'profitSplit', 'payoutDelay',
  'trustpilotRating', 'trustpilotReviewCount', 'trustpilotSourceUrl', 'listedDomainWarning',
]);
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

if (current.version !== 1) errors.push('version must be 1');

for (const [slug, update] of Object.entries(current.firms ?? {})) {
  const firm = bySlug.get(slug);
  const where = `firms.${slug}`;
  if (!firm) {
    errors.push(`${where}: unknown slug`);
    continue;
  }
  if (!DATE.test(update.reviewedAt ?? '') || update.reviewedAt > today) errors.push(`${where}.reviewedAt: YYYY-MM-DD, not in the future`);
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
  const newIncidents = (update.addIncidents ?? []).filter((item) => !(before?.addIncidents ?? []).includes(item));
  if (newIncidents.length) sensitive.push(`${slug}: ${newIncidents.length} new incident(s)`);
  if (JSON.stringify(before) !== JSON.stringify(update)) summary.push(`${slug}: updated (${update.reviewedAt})`);
}

if (errors.length) {
  console.error(`firm-updates.json is invalid:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}

const isSensitive = sensitive.length > 0;
console.log(`Valid. ${Object.keys(current.firms).length} firm update(s) in file.`);
if (summary.length) console.log(`Changes:\n- ${summary.join('\n- ')}`);
console.log(isSensitive ? `SENSITIVE - human approval required:\n- ${sensitive.join('\n- ')}` : 'Not sensitive: safe to merge automatically.');
if (process.env.GITHUB_OUTPUT) writeFileSync(process.env.GITHUB_OUTPUT, `sensitive=${isSensitive}\n`, { flag: 'a' });
