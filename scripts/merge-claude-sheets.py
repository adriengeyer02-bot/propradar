#!/usr/bin/env python3
"""Merge Claude's 2026-11-25 contract readings into app/data/contract-audits.json.

Documentary layer only: nothing here is read by the score. Idempotent: findings
previously added by this script (verification starting with "claude-") are
removed before the new ones are written.

  python3 -I scripts/merge-claude-sheets.py \
      --full audits/lot1-2026-11-25,audits/fulltext-2026-11-25 \
      --excerpts audits/clause-review-2026-11-25 \
      --names /path/to/firms-base.json

--full      sheets where the whole contract was read (verification "claude-full-read")
--excerpts  sheets where flagged clauses were re-read by hand (verification
            "claude-excerpt-read"); their "toVerify" items become open items.
"""
import json, os, sys, glob

A = {k: v for k, v in zip(sys.argv[1::2], sys.argv[2::2])}
DATA = 'app/data/contract-audits.json'
SOURCES = json.load(open('audits/terms-archive/sources.json'))
NAMES = {f['slug']: f['name'] for f in json.load(open(A['--names']))} if '--names' in A else {}

GROUP = {
    'B1': 'discretion', 'B2': 'discretion', 'B2A': 'discretion', 'B6': 'discretion',
    'B3': 'version', 'B4': 'contradiction', 'B5': 'rule', 'B7': 'gap',
    'E_HARSH': 'rule', 'SAFE': 'safeguard', 'NOTE': 'rule',
}
LABEL = {
    'B1': 'Earned rewards removable at the firm\'s discretion',
    'B2': 'Payout can be refused for conduct the contract does not quantify',
    'B2A': 'Discretionary payout refusal, with a review or explanation route',
    'B3': 'Rules can change on accounts already bought',
    'B4': 'Help-centre wording differs from the contract',
    'B5': 'Profits removed while losses stay counted',
    'B6': 'Public criticism of the firm is a ground for sanction',
    'B7': 'Funded-stage contract not published before purchase',
    'E_HARSH': 'Severe sanction attached to a rule breach',
}


def official_url(slug, source):
    """Uploads (PDFs saved by Geyer) are cited through the firm's public terms URL."""
    if source.startswith('https://'):
        return source, ''
    urls = SOURCES.get(slug, {}).get('urls', [])
    terms = [u for u in urls if any(k in u.lower() for k in ('terms', 'conditions', 'legal', 'tos'))]
    url = (terms or urls or [SOURCES.get(slug, {}).get('site', '')])[0]
    return url, 'PDF copy of the published terms read on 2026-11-25'


def finding(slug, fact, verification):
    code = fact['code'].rstrip('?')
    if code.startswith('CONS_'):
        group, label = 'rule', 'Consistency rule'
    else:
        group, label = GROUP.get(code, 'rule'), LABEL.get(code, '')
    url, note = official_url(slug, fact.get('source', ''))
    if not url.startswith('https://'):
        return None
    text = fact['text'].strip()
    if label and not text.lower().startswith(label.lower()):
        text = f'{label}. {text}'
    loc = ' · '.join(x for x in (fact.get('locator') or fact.get('heading') or '', note) if x)
    return {'group': group, 'scope': '', 'text': text, 'source': url, 'locator': loc,
            'checkedOn': fact.get('checkedOn', '2026-11-25'), 'verification': verification}


def main():
    data = json.load(open(DATA))
    firms = {f['slug']: f for f in data['firms']}
    for f in data['firms']:
        f['findings'] = [x for x in f['findings'] if not str(x.get('verification', '')).startswith('claude-')]
        f['openItems'] = [x for x in f.get('openItems', []) if not x.startswith('Clause to verify (2026-11-25): ')]
    # Topstep §29: the earlier dossier line already says it is NOT payout evidence; file it as a safeguard.
    for x in firms.get('topstep', {}).get('findings', []):
        if 'Terms §29' in x.get('locator', '') and 'NOT evidence' in x['text']:
            x['group'] = 'safeguard'
    added = created = 0
    for kind, verification in (('--excerpts', 'claude-excerpt-read'), ('--full', 'claude-full-read')):
        for d in filter(None, A.get(kind, '').split(',')):
            for p in sorted(glob.glob(os.path.join(d, '*.json'))):
                s = json.load(open(p))
                slug = s['slug']
                facts = list(s.get('facts', []))
                for t in s.get('safeguards', []):
                    facts.append({'code': 'SAFE', 'text': t, 'source': next((x['source'] for x in facts if x.get('source', '').startswith('https://')), ''),
                                  'checkedOn': s.get('reviewedOn', '2026-11-25')})
                new = [x for x in (finding(slug, fct, verification) for fct in facts) if x]
                todo = [f'Clause to verify (2026-11-25): {k} — {v}' for k, v in s.get('toVerify', {}).items()]
                if not new and not todo:
                    continue
                if slug not in firms:
                    firms[slug] = {'slug': slug, 'name': NAMES.get(slug, slug), 'level': 'first-file', 'checkedOn': '2026-11-25',
                                   'programs': [], 'findings': [], 'payoutEvidence': [], 'payoutNote': None, 'trustpilot': None,
                                   'registry': None, 'openItems': [], 'sourceFiles': [], 'status': 'partial'}
                    data['firms'].append(firms[slug]); created += 1
                f = firms[slug]
                f['findings'].extend(new); added += len(new)
                f['openItems'] = f.get('openItems', []) + todo
                f['checkedOn'] = max(f.get('checkedOn') or '', '2026-11-25')
                src = os.path.relpath(p)
                if src not in f.setdefault('sourceFiles', []):
                    f['sourceFiles'].append(src)
    for f in data['firms']:
        f['counts'] = {g: sum(1 for x in f['findings'] if x['group'] == g and x.get('publish', True))
                       for g in ('rule', 'discretion', 'contradiction', 'version', 'payout', 'safeguard', 'legal', 'history', 'gap')}
        f['status'] = 'partial'
    data['firms'].sort(key=lambda f: f['slug'])
    json.dump(data, open(DATA, 'w'), ensure_ascii=False, indent=1)
    open(DATA, 'a').write('\n')
    print(f'{added} findings merged, {created} new dossiers, {len(data["firms"])} dossiers')


main()
