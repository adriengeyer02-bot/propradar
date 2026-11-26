"""Scale C Trustpilot penalty, approved 2026-11-26.

No rating is not a sanction. Only a documented withheld-rating notice is TPW.
Retain existing review-volume safeguard (no rating penalty below 30 reviews,
half rounded up from 30 to 99). This does not change ceiling evidence.
"""
TP_WITHHELD = 10

def rating_penalty(rating, count):
    if rating is None or not 1 <= rating <= 5 or (count or 0) < 30:
        return 0
    points = 0 if rating >= 4 else 3 if rating >= 3.5 else 6 if rating >= 3 else 10
    return (points + 1) // 2 if count < 100 else points

def recalibrate_published_row(row, contract_cap):
    """Apply the new policy to a previously approved historical proposal row.
    Preserve the existing reading/incident gates; no new publication decisions.
    """
    r = dict(row)
    items = []
    for original in row['items']:
        item = dict(original)
        if item['code'] == 'TPW':
            item['points'] = TP_WITHHELD
        elif item['code'] in ('TPR', 'TPMID'):
            rating, count = item['locator'].split('/')
            item['points'] = rating_penalty(float(rating.strip()), int(count.strip()))
        if item['points'] or item['code'] not in ('TPR', 'TPMID', 'TPW'):
            items.append(item)
    r['items'] = items
    contract_codes = {'B1', 'B2', 'B2A', 'B3', 'B4', 'B5', 'B6', 'B7'}
    contract = min(contract_cap, sum(i['points'] for i in items if i['code'] in contract_codes))
    other = sum(i['points'] for i in items if i['code'] not in contract_codes)
    raw = max(5, row['ceiling'] - contract - other)
    proposed = raw
    if row['confidence'] == 'extraits relus à la main':
        proposed = min(row['current'], max(row['current'] - 10, proposed))
    if row['flag'].startswith('hausse bloquée'):
        proposed = min(row['current'], proposed)
    # Do not change any score that was held for some other reason.
    if row['raw'] != row['proposed'] and row['confidence'] != 'extraits relus à la main' and not row['flag'].startswith('hausse bloquée'):
        raise ValueError(f"Unknown score gate: {row['slug']}")
    r.update(raw=raw, proposed=proposed, delta=proposed - row['current'])
    return r
