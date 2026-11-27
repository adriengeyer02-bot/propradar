"""Owner policy, 2026-11-27: RBI authorization/alert-list warnings are
informational, not Scale C score deductions. Other regulatory warnings and
documented payout misconduct remain subject to the existing criteria.
"""
import re

RBI = re.compile(r'reserve bank of india|rbi\.org\.in|banque centrale indienne', re.I)
CONTRACT = {'B1', 'B2', 'B2A', 'B3', 'B4', 'B5', 'B6', 'B7'}
DATE = '2026-11-27'

def is_rbi_warning(p):
    return p.get('code') == 'REGWARN' and bool(RBI.search(' '.join(str(p.get(k, '')) for k in ('text', 'source', 'locator'))))

def apply_rbi_exemption(firms):
    """Apply after historical overlays so the archived evidence stays immutable."""
    for e in firms.values():
        removed = [p for p in e['penalties'] if is_rbi_warning(p)]
        if not removed:
            continue
        old_score, old_raw = e['score'], e['raw']
        lost = ', '.join(f"{p['code']} −{p['points']}" for p in e['penalties']) or 'no penalty'
        source = e.get('revisionSource') or next((p['source'] for p in e['penalties'] if p['source'].startswith('https://')), 'https://www.propradar.tech/audit')
        if e['previous'] != old_score:
            if e.get('revisionSource'):
                summary = f"Targeted counter-audit under unchanged Scale C: {e['previous']} → {old_score}. Ceiling {e['ceiling']}; points lost: {lost}. Previously recorded full-read status retained; newly sourced clauses checked on {e['checkedOn']}."
            else:
                reading = 'Contract read in full.' if e['reading'] == 'full' else 'Flagged clauses re-read by hand; a rise waits for a full reading' + (' and the displayed score is capped at 60 until then' if old_score > 60 else '') + '.'
                summary = f"Score recalculated with scale C (approved 2026-11-25): {e['previous']} → {old_score}. Ceiling {e['ceiling']}; points lost: {lost}. {reading}"
            e.setdefault('priorRevisions', []).append({'date': e['checkedOn'], 'summary': summary, 'source': source, 'fields': ['score']})
        e.setdefault('priorRevisions', [])
        e['penalties'] = [p for p in e['penalties'] if not is_rbi_warning(p)]
        b = sum(p['points'] for p in e['penalties'] if p['code'] in CONTRACT)
        other = sum(p['points'] for p in e['penalties'] if p['code'] not in CONTRACT)
        e['raw'] = max(5, e['ceiling'] - min(30, b) - other)
        # Do not release an independent historic/partial-reading publication gate.
        if e['reading'] == 'full' and old_score == old_raw:
            e['score'] = e['raw']
        elif e['reading'] == 'excerpts':
            e['score'] = min(e['previous'], max(e['previous'] - 10, e['raw']))
        e['previous'] = old_score
        e['revisionSource'] = removed[0]['source']
        e['revisionReason'] = 'rbi-exemption'
        e['revisionOn'] = DATE
    return firms
