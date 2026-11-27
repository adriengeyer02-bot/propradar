"""Scale C proportional-constraints revision (owner, 2026-11-27).
Historical score inputs stay immutable; apply reviewed evidence decisions after
the previous audit and RBI overlays. Unknown facts cannot create a new penalty.
"""
import json
from pathlib import Path

PATH = Path(__file__).resolve().parent.parent / 'audits' / 'scale-c-refinement-2026-11-27.json'
CONTRACT = {'B1', 'B2', 'B2A', 'B3', 'B4', 'B5', 'B6', 'B7'}
REVIEW_CODES = {'B4', 'B6', 'B7', 'D_PAYOUT_CAP', 'D_PAYOUT_CONDITIONS',
                'D_FUNDED_TRAILING_DRAWDOWN', 'D_ACCOUNT_ENDS_AFTER_PAYOUTS', 'D_SPLIT_REDUCTION'}
DATE = '2026-11-27'

def cap_points(cap, loss, days=None, percent=None, permanent=False):
    if permanent:
        return 4
    if cap is None or loss is None or cap < 0 or loss <= 0:
        raise ValueError('same-programme funded loss budget and cap required')
    if cap == 0:
        return 4
    ratio = cap / loss
    points = 1 if ratio >= 1 else 2 if ratio >= .5 else 3 if ratio > .2 else 4
    if percent is not None and percent <= 50:
        points = max(2, points)
    return min(4, points + int(days is not None and days > 14))

def trailing_points(mode, stage):
    if stage == 'evaluation' or mode == 'static':
        return 0
    if stage != 'funded' or mode not in ('eod', 'intraday'):
        raise ValueError('exact funded trailing mode required')
    return 1 if mode == 'eod' else 2

def decision_points(d):
    a = d.get('assessment') or {}
    if a.get('kind') == 'cap':
        return cap_points(a['cap'], a['loss'], a['days'], a['percent'], a['permanent'])
    if a.get('kind') == 'trailing':
        return trailing_points(a['mode'], a['stage'])
    return d['points']

def _history(e):
    lost = ', '.join(f"{p['code']} −{p['points']}" for p in e['penalties']) or 'no penalty'
    source = e.get('revisionSource') or next((p['source'] for p in e['penalties'] if p['source'].startswith('https://')), 'https://www.propradar.tech/audit')
    if e.get('revisionReason') == 'rbi-exemption':
        summary = f"Scale C policy update (2026-11-27): {e['previous']} → {e['score']}. Reserve Bank of India alert-list warnings are informational and no longer deduct points; other penalties and ceiling unchanged."
    elif e.get('revisionSource'):
        summary = f"Targeted counter-audit under unchanged Scale C: {e['previous']} → {e['score']}. Ceiling {e['ceiling']}; points lost: {lost}. Previously recorded full-read status retained; newly sourced clauses checked on {e['checkedOn']}."
    else:
        reading = 'Contract read in full.' if e['reading'] == 'full' else 'Flagged clauses re-read by hand; a rise waits for a full reading' + (' and the displayed score is capped at 60 until then' if e['score'] > 60 else '') + '.'
        summary = f"Score recalculated with scale C (approved 2026-11-25): {e['previous']} → {e['score']}. Ceiling {e['ceiling']}; points lost: {lost}. {reading}"
    return {'date': e.get('revisionOn') or e['checkedOn'], 'summary': summary, 'source': source, 'fields': ['score']}

def _raw(e):
    ps = e['penalties']
    b = sum(p['points'] for p in ps if p['code'] in CONTRACT)
    d = sum(p['points'] for p in ps if p['code'] == 'CONS' or p['code'].startswith('D_'))
    other = sum(p['points'] for p in ps if p['code'] not in CONTRACT and p['code'] != 'CONS' and not p['code'].startswith('D_'))
    return max(5, e['ceiling'] - min(30, b) - min(15, d) - other), b

def apply_refinement(firms):
    report = json.loads(PATH.read_text(encoding='utf-8'))
    grouped = {}
    for d in report['decisions']:
        if decision_points(d) != d['points']:
            raise ValueError(f"{d['slug']} {d['code']}: inconsistent assessment")
        grouped.setdefault(d['slug'], []).append(d)
    for slug, ds in grouped.items():
        e = firms[slug]
        for d in ds:
            p = next((p for p in e['penalties'] if p['code'] == d['code']), None)
            if p is None or (p['points'], p['text'], p['source'], p['locator']) != (d['expectedPoints'], d['expectedText'], d['expectedSource'], d['expectedLocator']):
                raise ValueError(f"{slug} {d['code']}: historical evidence changed; consolidate revision explicitly")
        ds = [d for d in ds if d['points'] != d['expectedPoints']]
        if not ds:
            continue
        old_score, old_raw = e['score'], e['raw']
        e.setdefault('priorRevisions', [])
        if e['previous'] != old_score:
            e['priorRevisions'].append(_history(e))
        by_code = {d['code']: d['points'] for d in ds}
        e['penalties'] = [dict(p, points=by_code.get(p['code'], p['points'])) for p in e['penalties']]
        e['penalties'] = [p for p in e['penalties'] if p['points'] > 0]
        e['raw'], b = _raw(e)
        if e['reading'] == 'full' and old_score == old_raw:
            e['score'] = e['raw']
        # Any independent excerpt or history gate remains held.
        if b > 30:
            e['contractCap'] = 30
        else:
            e.pop('contractCap', None)
        e['previous'] = old_score
        e['revisionSource'] = next((s for s in ds[0]['sources'] if s.startswith('https://')), 'https://www.propradar.tech/audit')
        e['revisionReason'] = 'proportional-constraints'
        e['revisionOn'] = DATE
    # A reproducible check catches accidental differences against the dated result.
    for r in report['changes']:
        if firms[r['slug']]['score'] != r['after'] or firms[r['slug']]['raw'] != r['rawAfter']:
            raise ValueError(f"{r['slug']}: recalculation differs from reviewed result")
    return firms

def proposal_review_pending(items):
    """The proposal extractor is research-only until a new full, per-programme
    policy review is supplied. Its old weights cannot be used for publication.
    """
    return sorted({p['code'] for p in items if p['code'] in REVIEW_CODES})
