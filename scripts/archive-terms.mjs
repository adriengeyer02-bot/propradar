// Downloads the full text of every legal page of every open firm (terms,
// funded agreements, rules, FAQ, payout policy) and stores it with its date
// and SHA-256, so audits read complete documents and re-audits are diffs.
// Runs in GitHub Actions (see .github/workflows/terms-archive.yml). Nothing
// here touches the site or the scores.
import { chromium } from 'playwright';
import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const OUT = process.env.OUT_DIR || 'terms-archive';
const ONLY = (process.env.ONLY || (existsSync('audits/terms-archive/only.txt') ? readFileSync('audits/terms-archive/only.txt', 'utf8') : '')).split(/[\s,]+/).filter(Boolean);
const CONCURRENCY = Number(process.env.CONCURRENCY || 4);
const sources = JSON.parse(readFileSync('audits/terms-archive/sources.json', 'utf8'));
const LINK = /(terms|conditions|t&c|tos|agreement|contract|legal|rules|trading-?rules|faq|help|support|payout|withdraw|refund|policy|disclosure|risk)/i;
const SKIP = /(privacy|cookie|blog\/|news\/|login|signup|register|checkout|cart|affiliate)/i;
const sha = (s) => createHash('sha256').update(s).digest('hex');
const slugOf = (u) => sha(u).slice(0, 12);

const browser = await chromium.launch();
const ctx = await browser.newContext({ userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36', locale: 'en-US' });
const summary = {};

async function grab(url) {
  if (/\.pdf($|\?)/i.test(url) || /cdn\.ftmo\.com\/docs/i.test(url)) {
    const res = await ctx.request.get(url, { timeout: 60000 });
    const buf = await res.body();
    const ct = res.headers()['content-type'] || '';
    if (ct.includes('pdf') || buf.subarray(0, 4).toString() === '%PDF') {
      const tmp = `/tmp/doc-${sha(url).slice(0, 8)}.pdf`; writeFileSync(tmp, buf);
      const text = execFileSync('pdftotext', ['-layout', tmp, '-'], { maxBuffer: 64 * 1024 * 1024 }).toString();
      return { status: res.status(), finalUrl: res.url(), title: 'PDF', text, links: [], kind: 'pdf' };
    }
  }
  const page = await ctx.newPage();
  try {
    const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(4000);
    // Cloudflare "Just a moment..." challenge: give it time to clear on its own.
    for (let i = 0; i < 6 && /just a moment|attention required/i.test(await page.title()); i++) await page.waitForTimeout(5000);
    try { await page.waitForLoadState('networkidle', { timeout: 15000 }); } catch {}
    // Open collapsed FAQ/accordion sections so their text is captured.
    await page.evaluate(() => { document.querySelectorAll('details').forEach((d) => d.setAttribute('open', '')); });
    for (const b of await page.$$('[aria-expanded="false"]')) { try { await b.click({ timeout: 500 }); } catch {} }
    await page.waitForTimeout(1000);
    // innerText skips collapsed tabs/accordions; textContent keeps them. Keep the longer one.
    const text = await page.evaluate(() => {
      const inner = document.body?.innerText || '';
      const clone = document.body?.cloneNode(true);
      clone?.querySelectorAll('script,style,noscript,svg').forEach((n) => n.remove());
      const all = (clone?.textContent || '').replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n\n');
      return all.length > inner.length * 1.3 ? all : inner;
    });
    const links = await page.evaluate(() => [...document.querySelectorAll('a[href]')].map((a) => ({ href: a.href, label: (a.textContent || '').trim().slice(0, 80) })));
    const frames = [];
    for (const f of page.frames().slice(1)) { try { const t = await f.evaluate(() => document.body?.innerText || ''); if (t.length > 500) frames.push(t); } catch {} }
    return { status: resp?.status() ?? 0, finalUrl: page.url(), title: await page.title(), text: [text, ...frames].join('\n\n--- iframe ---\n\n'), links, kind: 'html' };
  } finally { await page.close(); }
}

async function archiveFirm(slug, info) {
  const dir = join(OUT, slug); mkdirSync(dir, { recursive: true });
  const index = []; const queue = [...info.urls]; const seen = new Set();
  // Discover legal links from the official home page as well.
  if (info.site) queue.unshift(info.site);
  let budget = 12;
  while (queue.length && budget-- > 0) {
    const url = queue.shift(); if (seen.has(url)) continue; seen.add(url);
    try {
      const r = await grab(url);
      const isHome = url === info.site;
      for (const l of r.links || []) {
        try {
          const u = new URL(l.href); const home = new URL(info.site || url);
          const same = u.hostname.replace(/^www\./, '').endsWith(home.hostname.replace(/^www\./, '').split('.').slice(-2).join('.')) || /zendesk|intercom|gitbook|helpscout|freshdesk|jotform|\.pdf/i.test(u.href);
          if (same && (LINK.test(u.pathname + ' ' + l.label)) && !SKIP.test(u.pathname) && !seen.has(u.href.split('#')[0])) queue.push(u.href.split('#')[0]);
        } catch {}
      }
      if (isHome && r.text.length < 200) continue;
      const file = `${slugOf(url)}.txt`;
      if (!isHome) writeFileSync(join(dir, file), `URL: ${url}\nFINAL: ${r.finalUrl}\nTITLE: ${r.title}\nFETCHED: ${new Date().toISOString()}\n\n${r.text}`);
      index.push({ url, finalUrl: r.finalUrl, title: r.title, status: r.status, kind: r.kind, chars: r.text.length, sha256: sha(r.text), file: isHome ? null : file, fetchedAt: new Date().toISOString(), home: isHome || undefined });
    } catch (e) {
      index.push({ url, error: String(e).slice(0, 300), fetchedAt: new Date().toISOString() });
    }
  }
  writeFileSync(join(dir, 'index.json'), JSON.stringify(index, null, 1));
  summary[slug] = { pages: index.filter((x) => x.file).length, errors: index.filter((x) => x.error).length, chars: index.reduce((s, x) => s + (x.chars || 0), 0) };
  console.log(slug, JSON.stringify(summary[slug]));
}

const SHARD = Number(process.env.SHARD || 0), SHARDS = Number(process.env.SHARDS || 1);
const todo = Object.entries(sources).filter(([slug]) => !ONLY.length || ONLY.includes(slug)).filter((_, i) => i % SHARDS === SHARD);
let next = 0;
await Promise.all(Array.from({ length: CONCURRENCY }, async () => { while (next < todo.length) { const [slug, info] = todo[next++]; try { await archiveFirm(slug, info); } catch (e) { console.log(slug, 'FAILED', String(e).slice(0, 200)); } } }));
writeFileSync(join(OUT, 'summary.json'), JSON.stringify({ fetchedAt: new Date().toISOString(), firms: summary }, null, 1));
await browser.close();
