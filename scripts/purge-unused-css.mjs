/**
 * Removes CSS rules whose class selectors no longer exist anywhere in app/.
 *
 * Conservative by design:
 * - a selector is dropped only if one of its classes (outside :is/:where/
 *   :not/:has) appears nowhere in app/**\/*.{ts,tsx} as a word;
 * - classes built at runtime from a template literal prefix (e.g.
 *   `badge-${tone}`) are kept for every class starting with that prefix;
 * - selectors without classes, @keyframes, @font-face and custom properties
 *   are never touched.
 *
 * Check the result with before/after screenshots: this script cannot see
 * classes injected by third-party code.
 *
 * Usage: node scripts/purge-unused-css.mjs [--write] app/globals.css app/design-system.css ...
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import postcss from 'postcss';

const args = process.argv.slice(2);
const write = args.includes('--write');
const files = args.filter((arg) => !arg.startsWith('--'));

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return walk(path);
    return /\.(tsx?|mjs)$/.test(name) ? [path] : [];
  });
}

const source = walk('app').map((path) => readFileSync(path, 'utf8')).join('\n');
const words = new Set(source.match(/[A-Za-z0-9_-]+/g) ?? []);
const prefixes = [...new Set([...source.matchAll(/([a-z][a-z0-9-]*-)\$\{/g)].map((match) => match[1]))];

const isUsed = (name) => words.has(name) || prefixes.some((prefix) => name.startsWith(prefix));

function outsideFunctionalPseudos(selector) {
  let depth = 0;
  let out = '';
  for (let i = 0; i < selector.length; i += 1) {
    const char = selector[i];
    if (char === '(') depth += 1;
    if (depth === 0) out += char;
    if (char === ')') depth -= 1;
  }
  return out;
}

function keepSelector(selector) {
  const outer = outsideFunctionalPseudos(selector);
  const classes = [...outer.matchAll(/\.(-?[_a-zA-Z][_a-zA-Z0-9-]*)/g)].map((match) => match[1]);
  return classes.every(isUsed);
}

let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const css = readFileSync(file, 'utf8');
  const root = postcss.parse(css, { from: file });
  let droppedRules = 0;
  let droppedSelectors = 0;

  root.walkRules((rule) => {
    if (rule.parent && rule.parent.type === 'atrule' && /keyframes$/i.test(rule.parent.name)) return;
    const selectors = rule.selectors;
    const kept = selectors.filter(keepSelector);
    if (kept.length === selectors.length) return;
    droppedSelectors += selectors.length - kept.length;
    if (kept.length === 0) {
      rule.remove();
      droppedRules += 1;
    } else {
      rule.selectors = kept;
    }
  });

  // Remove at-rules left empty (e.g. @media blocks whose rules were all dropped).
  let removedEmpty = true;
  while (removedEmpty) {
    removedEmpty = false;
    root.walkAtRules((atRule) => {
      if (atRule.nodes && atRule.nodes.length === 0) {
        atRule.remove();
        removedEmpty = true;
      }
    });
  }

  const out = root.toString();
  totalBefore += css.length;
  totalAfter += out.length;
  console.log(`${file}: ${css.length} -> ${out.length} bytes (${droppedRules} rules, ${droppedSelectors} selectors dropped)`);
  if (write) writeFileSync(file, out);
}

console.log(`total: ${totalBefore} -> ${totalAfter} bytes (${Math.round((1 - totalAfter / totalBefore) * 100)}% smaller)`);
console.log(`dynamic prefixes kept: ${prefixes.join(' ')}`);
