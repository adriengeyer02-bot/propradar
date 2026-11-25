#!/usr/bin/env python3
"""Merge ChatGPT's 2026-11-25 partial document registers into contract-audits.json.

Documentary layer only (never read by the score). Idempotent: findings with
verification "chatgpt-partial-2026-11-25" are removed before re-adding.
Deduplicates against every finding already in the dossier (word-set overlap
>= 0.55 or same source + locator + first words). Partial registers are never
marked complete; indexed snippets and search excerpts are kept unpublished.

  python3 -I scripts/merge-gpt-registers.py \
      audits/contract-clauses-reopen-ftuk-breakout-bespoke-leveled-2026-11-25.json \
      audits/exhaustive-document-register-blue-guardian-apex-2026-11-25.json
"""
import json, re, sys

DATA = 'app/data/contract-audits.json'
TAG = 'chatgpt-partial-2026-11-25'
CAT = {'discretionary': 'discretion', 'payout_terms': 'rule', 'rules_by_programme': 'rule', 'legal_entity': 'legal',
       'contradiction': 'contradiction', 'version': 'version', 'safeguard': 'safeguard'}
READ = {'full_public_text_reviewed', 'partial_read', 'body_read', 'selected_sections_reviewed',
        'complete_visible_article_read', 'selected_rules_reviewed', 'partial_read_legacy_snapshot'}
NAMES = {'bespoke-funding-program': 'Bespoke Funding Program', 'leveled-up-society': 'Leveled Up Society'}


def words(t):
    return set(w for w in re.findall(r'[a-z0-9%$§.]+', t.lower()) if len(w) > 2)


def secs(t):
    return set(re.findall(r'§\s?(\d+(?:\.\d+)*)', t))


def dup(f, existing, threshold=0.55):
    w = words(f['text'])
    refs = secs(f['text']) | secs(f.get('locator', ''))
    for x in existing:
        if refs and x.get('source') == f['source'] and refs <= (secs(x.get('locator', '')) | secs(x['text'])):
            return True
        if x.get('source') == f['source'] and x.get('locator') == f['locator'] and x['text'][:60] == f['text'][:60]:
            return True
        v = words(x['text'])
        if w and v and len(w & v) / len(w | v) >= threshold:
            return True
    return False


def group_for(text):
    t = text.lower()
    if re.search(r'contradict|differs? from|versus|inconsisten', t): return 'contradiction'
    if re.search(r'discretion|deny|denial|forfeit|revok|withh[oe]ld|reject funding', t): return 'discretion'
    if re.search(r'arbitration|courts?\b|governing law|entity|limited \(|fzco|registered|dissolved', t): return 'legal'
    if re.search(r'snapshot|legacy|version|cohort|purchases? (?:after|from)', t): return 'version'
    return 'rule'


def main():
    data = json.load(open(DATA))
    firms = {f['slug']: f for f in data['firms']}
    for f in data['firms']:
        f['findings'] = [x for x in f['findings'] if x.get('verification') != TAG]
        f['openItems'] = [x for x in f.get('openItems', []) if not x.startswith('ChatGPT register 2026-11-25: ')]
    added = skipped = created = 0
    for path in sys.argv[1:]:
        reg = json.load(open(path))
        for rf in reg['firms']:
            slug = rf['slug']
            new = []
            for o in rf.get('observations', []):
                pub = o.get('evidence') not in ('secondary_excerpt_only', 'search_excerpt_only')
                new.append({'group': CAT.get(o.get('category'), group_for(o['finding'])), 'scope': o.get('scope', ''),
                            'text': o['finding'], 'source': o['source'], 'locator': o.get('locator', ''),
                            'checkedOn': o.get('checkedOn', reg['date']), 'verification': TAG, 'publish': pub})
            for doc in rf.get('documents', []):
                if doc.get('status') not in READ:
                    continue
                # Register summaries pack several clauses per line: split them so each
                # item is deduplicated on its own section reference.
                items = [i.strip(' .') + '.' for t in doc.get('findings', []) for i in re.split(r';\s+(?=§)|\.\s+(?=§)', t) if i.strip()]
                for t in items:
                    # Extraction artefacts and the firm's affiliate terms are not trader-facing findings.
                    if re.search(r'appears incomplete in extracted|^Affiliate terms', t):
                        continue
                    loc = ', '.join('§' + r for r in sorted(secs(t), key=lambda r: [int(x) for x in r.split('.')])) or doc.get('locators', '') or ''
                    new.append({'group': group_for(t), 'scope': doc.get('type', '') or doc.get('version', '')[:80],
                                'text': t, 'source': doc['url'], 'locator': loc,
                                'checkedOn': reg['date'], 'verification': TAG,
                                'publish': doc['status'] != 'partial_read_legacy_snapshot'})
            todo = rf.get('outstanding') or ([rf['remainingCriticalDocument']] if rf.get('remainingCriticalDocument') else [])
            if not new and not todo:
                continue
            if slug not in firms:
                firms[slug] = {'slug': slug, 'name': rf.get('name') or NAMES.get(slug, slug), 'level': 'first-file',
                               'checkedOn': reg['date'], 'programs': [], 'findings': [], 'payoutEvidence': [],
                               'payoutNote': None, 'trustpilot': None, 'registry': None, 'openItems': [],
                               'sourceFiles': [], 'status': 'partial'}
                data['firms'].append(firms[slug]); created += 1
            f = firms[slug]
            for x in new:
                if not x['source'].startswith('https://') or dup(x, f['findings'], 0.4):
                    skipped += 1
                    continue
                f['findings'].append(x); added += 1
            f['openItems'] += [f'ChatGPT register 2026-11-25: {t}' for t in todo]
            if path not in f.setdefault('sourceFiles', []):
                f['sourceFiles'].append(path)
            f['checkedOn'] = max(f.get('checkedOn') or '', reg['date'])
    for f in data['firms']:
        f['counts'] = {g: sum(1 for x in f['findings'] if x['group'] == g and x.get('publish', True))
                       for g in ('rule', 'discretion', 'contradiction', 'version', 'payout', 'safeguard', 'legal', 'history', 'gap')}
        f['status'] = 'partial'
    data['firms'].sort(key=lambda f: f['slug'])
    json.dump(data, open(DATA, 'w'), ensure_ascii=False, indent=1)
    open(DATA, 'a').write('\n')
    print(f'{added} findings added, {skipped} duplicates or unsourced skipped, {created} new dossiers')


main()
