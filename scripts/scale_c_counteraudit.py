"""Replay the source-verified 27 November counter-audit over the historical C baseline.
An incompatible later proposal must be consolidated explicitly; never silently revert these changes.
"""
import json
from pathlib import Path

CONTRACT_CODES = {'B1', 'B2', 'B2A', 'B3', 'B4', 'B5', 'B6', 'B7'}
PATCH_PATH = Path(__file__).resolve().parent.parent / 'audits' / 'scale-c-counteraudit-approved-2026-11-27.json'

def apply_counteraudit(firms):
    overlay = json.loads(PATCH_PATH.read_text(encoding='utf-8'))
    date = overlay['date']
    for slug, patch in overlay['patches'].items():
        e = firms[slug]
        actual = [[p['code'], p['points']] for p in e['penalties']]
        if (e['score'] != patch['expectedScore'] or e['raw'] != patch['expectedRaw']
                or actual != patch['expectedCodes'] or e['reading'] != 'full'
                or e['score'] != e['raw']):
            raise ValueError(f"{slug}: incompatible counter-audit baseline; consolidate rather than overwrite")
        prior = []
        if e['previous'] != e['score']:
            lost = ', '.join(f"{p['code']} −{p['points']}" for p in e['penalties']) or 'no penalty'
            source = next((p['source'] for p in e['penalties'] if p['source'].startswith('https://')), 'https://www.propradar.tech/audit')
            prior.append({'date': e['checkedOn'], 'summary': f"Score recalculated with scale C (approved 2026-11-25): {e['previous']} → {e['score']}. Ceiling {e['ceiling']}; points lost: {lost}. Contract read in full.", 'source': source, 'fields': ['score']})
        penalties = [p for p in e['penalties'] if p['code'] not in patch['remove']] + patch['add']
        codes = [p['code'] for p in penalties]
        if len(set(codes)) != len(codes) or len(set(codes) & {'B1', 'B2', 'B2A'}) > 1:
            raise ValueError(f"{slug}: duplicate or stacked discretion penalty")
        if sum(p['points'] for p in penalties if p['code'] == 'CONS' or p['code'].startswith('D_')) > 15:
            raise ValueError(f"{slug}: D/consistency cap exceeded")
        if any(not p['source'].startswith('https://') or not p['text'] or len(p['text']) > 480 for p in patch['add']):
            raise ValueError(f"{slug}: missing or oversized evidence")
        contract = sum(p['points'] for p in penalties if p['code'] in CONTRACT_CODES)
        raw = max(5, e['ceiling'] - min(30, contract) - sum(p['points'] for p in penalties if p['code'] not in CONTRACT_CODES))
        if raw >= e['score']:
            raise ValueError(f"{slug}: this approved overlay only applies documented decreases")
        e.update(score=raw, previous=e['score'], raw=raw, penalties=penalties,
                 checkedOn=date, priorRevisions=prior, revisionSource=patch['add'][0]['source'])
        if contract > 30:
            e['contractCap'] = 30
        else:
            e.pop('contractCap', None)
    for fix in overlay['sourceFixes']:
        p = next((p for p in firms[fix['slug']]['penalties'] if p['code'] == fix['code']), None)
        # A new proposal may already omit the exempt RBI warning.
        if p is None and fix['code'] == 'REGWARN' and 'rbi.org.in' in fix['source']:
            continue
        if p['source'] != fix['expectedSource']:
            raise ValueError(f"{fix['slug']}: incompatible source baseline")
        p['source'], p['locator'] = fix['source'], fix['locator']
    return firms
