#!/usr/bin/env node
/**
 * Compare the score actually rendered by each localized comparator against
 * English. The same firm must have the same score in every language.
 *
 * Usage:
 *   node scripts/check-locale-score-parity.cjs
 *   SCORE_PARITY_BASE_URL=https://preview.example.com node scripts/check-locale-score-parity.cjs
 *
 * Run against a fully deployed version: indexing services may still retain
 * copies of older deployments, which this cannot invalidate.
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const localeSource = fs.readFileSync(path.join(__dirname, '../app/lib/locales.ts'), 'utf8');
const list = localeSource.match(/export const LOCALES\s*=\s*\[([^\]]+)\]/);
assert.ok(list, 'Could not locate LOCALES in app/lib/locales.ts');
const locales = [...list[1].matchAll(/'([^']+)'/g)].map((match) => match[1]);
assert.ok(locales.includes('en') && locales.length > 1);

const baseUrl = (process.env.SCORE_PARITY_BASE_URL || 'https://www.propradar.tech').replace(/\/$/, '');
const attr = (tag, key) => tag.match(new RegExp(`${key}="([^"]+)"`))?.[1];

function readScores(html, locale) {
  const scores = new Map();
  for (const match of html.matchAll(/<a\b[^>]*>/g)) {
    const tag = match[0];
    const slug = attr(tag, 'data-propradar-slug');
    if (!slug) continue;
    const score = Number(attr(tag, 'data-propradar-score'));
    assert.ok(Number.isInteger(score) && score >= 0 && score <= 100, `${locale}/${slug}: invalid score`);
    if (scores.has(slug)) assert.equal(scores.get(slug), score, `${locale}/${slug}: conflicting scores on same page`);
    scores.set(slug, score);
  }
  assert.ok(scores.size >= 15, `${locale}: expected at least 15 server-rendered comparator rows, got ${scores.size}`);
  return scores;
}

async function main() {
  const snapshot = new Map();
  // Keep this low enough for a regular CI smoke run, without hammering the site.
  for (let index = 0; index < locales.length; index += 3) {
    const batch = locales.slice(index, index + 3);
    await Promise.all(batch.map(async (locale) => {
      const route = `${locale === 'en' ? '' : `/${locale}`}/prop-firm-comparison`;
      const response = await fetch(`${baseUrl}${route}`, {
        headers: { 'cache-control': 'no-cache', 'accept-language': `${locale},en;q=0.5` },
        signal: AbortSignal.timeout(30000),
      });
      assert.equal(response.status, 200, `${locale}: HTTP ${response.status} from ${route}`);
      snapshot.set(locale, readScores(await response.text(), locale));
    }));
  }
  const reference = snapshot.get('en');
  for (const locale of locales) {
    const actual = snapshot.get(locale);
    assert.deepEqual([...actual.entries()].sort(), [...reference.entries()].sort(),
      `${locale}: different firm scores or firms than English; check deployments and stale language pages`);
  }
  console.log(`✓ Score parity: ${reference.size} displayed firms × ${locales.length} languages are identical (${baseUrl}).`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
