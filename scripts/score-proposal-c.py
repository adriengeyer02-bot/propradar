#!/usr/bin/env python3
"""Barème C (final draft): compute a PROPOSED score for every open firm.

Nothing here is read by the site. Inputs:
  --base   firms-base.json   (slug, score, founded, Trustpilot, tracker, incidents)
  --clauses dir with extract-clauses.py JSON per firm (full-text archive)
  --verified dir(s) of hand-verified audit sheets (codes override automatic ones)
Output: proposal JSON + CSV.

Principle: the ceiling is earned with evidence (age, large-scale payout
evidence); points are lost only for established facts. Unknown costs nothing.
Automatic codes are CANDIDATES found by fixed regexes on the full text, each
with its paragraph; hand-verified sheets override them.
"""
import json, re, os, sys, glob, csv

A = {k: v for k, v in zip(sys.argv[1::2], sys.argv[2::2])}
BASE = json.load(open(A['--base']))
CLAUSES = A['--clauses']
VERIFIED = A['--verified'].split(',')
REVIEWED = A.get('--reviewed', '').split(',') if A.get('--reviewed') else []
OUT = A['--out']
YEAR = 2026

W = {  # weights, barème C final draft
    'B1': 15, 'B2': 8, 'B2A': 4, 'B3': 5, 'B4': 3, 'B4max': 6, 'B5': 3, 'B6': 5, 'B7': 5, 'Bcap': 30,
    'TPW': 6, 'TPMID': 3, 'REGWARN': 5, 'A1': 40, 'A1_OLD_UNCLEAR': 15, 'A2ISO': 5, 'E_HARSH': 2,
}
CONS = [(40, 0), (30, 2), (20, 5), (0, 8)]

# Incidents read from the firm files (sourced there), coded by hand on 2026-11-25.
INCIDENTS = {
    'fundednext': ['REGWARN'], 'bespoke-funding-program': ['REGWARN'], 'fxrk': ['REGWARN'], 'alpine-funded': ['REGWARN'],
    'true-forex-funds': ['REGWARN'], 'levels': ['REGWARN'], 'the-funded-trader': ['A1_OLD_UNCLEAR'],
    'apex-trader-funding': ['A2ISO'],
}

PROMO = re.compile(r"promo|referral|affiliate|giveaway|prize|contest|competition|incentive|discount|coupon|loyalty|hub.credit|leaderboard|raffle", re.I)
REWARD = re.compile(r"reward|payout|profit|withdraw|gain|performance fee|profit split|récompense|gains|retrait|bénéfice", re.I)
REMOVE = re.compile(r"forfeit|cancel|void|withh[oe]ld|den(?:y|ial)|refuse|revers|claw|confiscat|remov|deduct|annul|retenir|refuser|confisqu|invers", re.I)
DISCR = re.compile(r"sole (?:and absolute )?discretion|absolute discretion|own discretion|(?:its|our) discretion|sole determination|in (?:its|our) (?:sole |reasonable )?(?:opinion|judg)|as determined by|seule discrétion|à sa discrétion", re.I)
ANYREASON = re.compile(r"for any reason|any or no reason|without (?:giving )?(?:any )?reason|with or without cause|pour quelque raison|not (?:an? )?(?:acquired|vested|guaranteed) right|no (?:acquired |vested )?right to|not (?:an? )?enforceable entitlement|pas (?:un )?droit acquis", re.I)
QUAL = re.compile(r"uncommercial|not (?:a )?viable|gam(?:e|ing) the|unethical|abus|not (?:reasonably )?replicab|unrealistic|toxic|gambl|reckless|irresponsible|misaligned|spirit of|incompatible|unfair advantage|exploit", re.I)
APPEAL = re.compile(r"appeal|representations|review (?:the|its|our) (?:decision|conclusion)|request a review|right to (?:explain|respond|be heard)|reply with your explanation|recours|contester", re.I)
GAG = re.compile(r"disparag|negative (?:comment|review|statement|propaganda)|harmful statement|damage (?:our|its|the company's) reputation|reputational (?:damage|harm|attack)|dénigr|propagande|discrédit", re.I)
GAG_SANCTION = re.compile(r"terminat|forfeit|cancel|withh|refuse|close|résili|annul|retenir|bar(?:red)? from|prohibit .* from participating", re.I)
CHG = re.compile(r"without (?:prior )?notice|with or without notice|effective immediately|immediately upon posting|sans préavis|at any time and from time to time", re.I)
CHG_OBJ = re.compile(r"\b(?:rules|terms|conditions|agreement|parameters|règles|conditions)\b", re.I)
CHG_VERB = re.compile(r"modif|amend|change|update|revis", re.I)
NONRETRO = re.compile(r"not (?:be )?(?:applied )?retroactiv|shall not (?:apply|alter) .{0,40}(?:existing|already)|do(?:es)? not alter|other changes do not alter|non.?rétroacti|keep (?:their|the) (?:original|rules)", re.I)
FUNDED_SEP = re.compile(r"separate (?:or supplemental )?(?:written )?(?:funded|trader|account|contractor)?\s*agreement|(?:funded trader|trader|pro|account|participation) agreement .{0,60}(?:provided|sent|signed|executed|offered)|contract (?:we send|will be sent)|(?:sign|execute)(?:d)? (?:a|the) (?:funded|trader|pro) (?:agreement|contract)", re.I)
# Revised 2026-11-25: a generic "we may amend these Terms" clause is in almost every
# contract and no longer costs points (B3gen, shown for information). B3 needs the
# change to reach accounts already bought or running, or to be retroactive.
EXISTING = re.compile(r"(?:existing|current|open|active|ongoing|already (?:purchased|bought|opened)|in progress|en cours|déjà ouverts?) (?:\w+ ){0,3}(?:accounts?|challenges?|evaluations?|comptes?|positions)|retroactiv|rétroacti|apply to all (?:accounts|traders|participants)", re.I)
EVAL_ONLY = re.compile(r"evaluation (?:phase|stage) only|during the evaluation(?: phase)? only|applies? (?:only )?(?:to|during) the (?:evaluation|challenge)|challenge phase only", re.I)
CONS_RX = re.compile(r"consisten|best (?:trading )?day|single (?:trading )?day|largest (?:winning )?day|cohérence|meilleur jour", re.I)
PCT = re.compile(r"(\d{1,2})\s?%\s*(?:consistency|of (?:the |your )?(?:total |overall |net |cycle )?(?:net )?profit)|consisten\w*(?: rule| requirement| ratio)?(?: of| at| is| set at|:)?\s*(\d{1,2})\s?%|best (?:trading )?day[^.%]{0,60}?(\d{1,2})\s?%", re.I)
FORFEIT_CONS = re.compile(r"breach|fail|violat|forfeit|terminat|close the account|hard breach", re.I)
ASYM = re.compile(r"(?:profit|gain)s? .{0,60}(?:removed|deducted|not (?:be )?counted|forfeited).{0,120}loss(?:es)? .{0,40}(?:count|remain|kept|retained)|only \d{1,2}\s?% of (?:the )?profit", re.I)


def auto_codes(slug):
    p = os.path.join(CLAUSES, f'{slug}.json')
    if not os.path.exists(p):
        return None, {}
    d = json.load(open(p))
    paras = [x for x in d['flagged'] if not PROMO.search(x['heading'] or '') and not PROMO.search(x['text'][:200])]
    alltext = ' '.join(x['text'] for x in paras)
    has_appeal = any(APPEAL.search(x['text']) and re.search(r"decision|enforcement|payout|reward|breach|disqualif", x['text'], re.I) for x in paras)
    has_nonretro = bool(NONRETRO.search(alltext))
    ev = {}
    cons = []
    def hit(code, x, rx=None):
        t = x['text']
        m = rx.search(t) if rx else None
        a = max(0, (m.start() if m else 0) - 260)
        ev.setdefault(code, {'url': x['url'], 'heading': x['heading'][:90], 'text': t[a:a + 600]})
    for x in paras:
        t = x['text']
        if REWARD.search(t) and REMOVE.search(t) and ANYREASON.search(t) and DISCR.search(t):
            hit('B1', x, ANYREASON)
        if REWARD.search(t) and REMOVE.search(t) and DISCR.search(t) and QUAL.search(t):
            hit('B2', x, QUAL)
        elif DISCR.search(t) and QUAL.search(t) and re.search(r"prohibit|forbidden|not permitted|interdit", t, re.I) and REMOVE.search(t):
            hit('B2', x, QUAL)
        if GAG.search(t) and GAG_SANCTION.search(t) and not re.search(r"user content|you (?:post|submit|upload)|content (?:that|which) (?:is|contains)", t, re.I):
            hit('B6', x, GAG)
        if CHG_VERB.search(t) and EXISTING.search(t) and CHG_OBJ.search(t) and not has_nonretro:
            hit('B3', x, EXISTING)
        elif CHG.search(t) and CHG_OBJ.search(t) and CHG_VERB.search(t):
            hit('B3gen', x, CHG)
        if FUNDED_SEP.search(t):
            hit('B7', x, FUNDED_SEP)
        if ASYM.search(t):
            hit('B5', x, ASYM)
        if CONS_RX.search(t):
            for g in PCT.findall(t):
                m = next((x for x in g if x), None)
                if not m:
                    continue
                v = float(m)
                if re.search(r"consistency(?: rule)?\s*(?:n/?a|none|no\b)", t, re.I) and v < 15:
                    continue
                if 10 <= v < 100:
                    i = t.find(m + '%') if (m + '%') in t else t.find(m)
                    cons.append({'url': x['url'], 'heading': x['heading'][:90], 'text': t[max(0, i - 260):i + 340], 'pct': v,
                                 'forfeit': bool(FORFEIT_CONS.search(t)), 'evalOnly': bool(EVAL_ONLY.search(t))})
    # Several programmes, several thresholds: an automatic reading keeps the most
    # lenient one found (the firm is not penalised on a side product).
    if cons:
        best = max(cons, key=lambda c: c['pct'])
        if best['pct'] < 40:
            ev['CONS'] = best
    if 'B2' in ev and has_appeal:
        ev['B2A'] = ev.pop('B2')
    if 'B1' in ev and 'B2' in ev:
        ev.pop('B2')  # same family: the stronger clause only
    return d, ev


def verified_codes(slug, dirs=None):
    codes = {}
    for vd in (dirs or VERIFIED):
        for p in glob.glob(os.path.join(vd, f'{slug}.json')):
            s = json.load(open(p))
            for f in s.get('facts', []):
                c = f['code'].rstrip('?')
                if c.startswith('CONS_'):
                    m = re.match(r'CONS_(\d+)(?:_\d+)?_(DELAY|FORFEIT|EVAL)', c)
                    if m:
                        codes['CONS'] = {'pct': float(m.group(1)), 'forfeit': m.group(2) == 'FORFEIT', 'evalOnly': m.group(2) == 'EVAL',
                                         'text': f['text'], 'url': f['source']}
                    continue
                if c in ('SAFE', 'NOTE'):
                    continue
                codes[c] = {'text': f['text'], 'url': f['source'], 'heading': f.get('locator', '')}
            for corr in s.get('corrections', []):
                pass
    return codes


def ceiling(f, withheld):
    age = YEAR - (f['founded'] or YEAR)
    ev = []
    if f['tracker'] >= 10e6: ev.append('suivi on-chain ≥ 10 M$')
    if not withheld and (f['tp'] or 0) >= 4.0 and (f['tpCount'] or 0) >= 5000: ev.append('Trustpilot ≥ 4,0 / ≥ 5 000 avis')
    if f['slug'] == 'topstep': ev.append('statistiques publiées')
    very = f['tracker'] >= 100e6 or (not withheld and (f['tp'] or 0) >= 4.5 and (f['tpCount'] or 0) >= 20000)
    if not f['founded']: return 75, 'date de création inconnue', ev
    if age < 1: return 55, '< 1 an', ev
    if age < 2: return 65, '1-2 ans', ev
    if age >= 8 and very: return 98, f'{age} ans + preuve très large', ev
    if age >= 5 and ev: return 95, f'{age} ans + preuve', ev
    if age >= 3 and ev: return 85, f'{age} ans + preuve', ev
    return 75, f'{age} ans' + ('' if ev else ', pas de preuve à grande échelle'), ev


GENERIC_INC = re.compile(r"must be rechecked before buying|Not audited in depth yet|rating is unavailable due to a breach|withheld score|Trustpilot check on", re.I)


def real_incidents(f):
    # Firm-file incidents other than the generic "recheck before buying" notes and the
    # Trustpilot-withheld notice (already scored as TPW).
    return [i for i in f['incidents'] if not GENERIC_INC.search(i)]


# D: payout conditions (approved by Geyer 2026-11-25, with consistency capped at 15 in total).
# Read from the sourced restrictive rules in firm-updates.json (major or blocking only), on
# the most lenient main programme, like consistency.
D_W = {'payout-cap': 4, 'payout-conditions': 3, 'account-ends-after-payouts': 3, 'funded-trailing-drawdown': 2, 'split-reduction': 2}
D_CAP = 15
_UPD = json.load(open('app/data/firm-updates.json'))
_UPD = _UPD.get('firms', _UPD)


def payout_conditions(slug):
    e = _UPD.get(slug) or {}
    rules = [r for r in e.get('restrictiveRules', []) if r.get('category') in D_W and r.get('severity') in ('major', 'blocking')]
    progs = [p['key'] for p in e.get('auditedPrograms', [])] or sorted({k for r in e.get('restrictiveRules', []) for k in r.get('appliesTo', []) if k != '*'}) or ['*']
    best = None
    for prog in progs:
        hits = {}
        for r in rules:
            ap = r.get('appliesTo', [])
            if '*' in ap or prog in ap:
                hits.setdefault(r['category'], r)
        pts = sum(D_W[c] for c in hits)
        if best is None or pts < best[0]:
            best = (pts, prog, hits)
    return best or (0, None, {})


cov = {}
if '--coverage' in A:
    cov = {r['slug']: r['status'] for r in json.load(open(A['--coverage']))}

rows = []
for f in BASE:
    if f['status'] == 'Fermée':
        continue
    slug = f['slug']
    _, auto = auto_codes(slug)
    ver = verified_codes(slug)
    reviewed = bool(REVIEWED) and any(os.path.exists(os.path.join(d, f'{slug}.json')) for d in REVIEWED)
    rev = verified_codes(slug, REVIEWED) if reviewed else {}
    scored_auto = {k: v for k, v in (auto or {}).items() if k != 'B3gen'}
    if ver:
        source, codes = 'contrat lu en entier', ver
    elif reviewed:
        source, codes = 'extraits relus à la main', rev
    elif auto is not None and not scored_auto and cov.get(slug) in ('OK', 'NO_TERMS'):
        source, codes = 'extraction sans clause retenue', {}
    else:
        source, codes = 'non lu', {}
    # Only a hand reading can move a score; an empty robot extraction proves nothing.
    read = source in ('contrat lu en entier', 'extraits relus à la main')
    paused = any(re.search(r"paus|suspend|halt|went dark|cease|shut ?down|closed", i, re.I) for i in f['incidents'])
    if paused and not ver:
        read = False
    if 'B1' in codes and 'B2' in codes:
        # B1 (any reward removable at discretion) already covers B2 (removal for
        # unquantified conduct): one penalty for the family, as for automatic codes.
        codes = {k: v for k, v in codes.items() if k != 'B2'}
    c, why, evid = ceiling(f, f['withheld'])
    age = YEAR - f['founded'] if f['founded'] else None
    ceil_evidence = []
    if f['tracker'] >= 10e6: ceil_evidence.append({'kind': 'tracker', 'amountUSD': f['tracker']})
    if not f['withheld'] and (f['tp'] or 0) >= 4.0 and (f['tpCount'] or 0) >= 5000:
        ceil_evidence.append({'kind': 'trustpilot', 'rating': f['tp'], 'count': f['tpCount']})
    if slug == 'topstep': ceil_evidence.append({'kind': 'stats'})
    items = []

    def item(code, points, ev=None):
        ev = ev or {}
        items.append({'code': code, 'points': points, 'text': ' '.join(str(ev.get('text', '')).split()),
                      'source': ev.get('url') or ev.get('source') or '', 'locator': ev.get('heading') or ev.get('locator') or ''})
    lines = []
    b = 0
    for k in ('B1', 'B2', 'B2A', 'B3', 'B5', 'B6', 'B7'):
        if k in codes:
            lines.append((k, W[k])); b += W[k]; item(k, W[k], codes[k])
    if 'B4' in codes:
        lines.append(('B4', W['B4'])); b += W['B4']; item('B4', W['B4'], codes['B4'])
    b = min(b, W['Bcap'])
    other = 0
    if 'CONS' in codes:
        pct = codes['CONS']['pct']
        pen = next(p for lim, p in CONS if pct >= lim) * (2 if codes['CONS'].get('forfeit') else 1)
        if codes['CONS'].get('evalOnly'):
            pen = pen // 2
        if pen:
            lines.append((f"consistency {pct:g}%", pen)); other += pen
            item('CONS', pen, {**codes['CONS'], 'locator': f"{pct:g}%"})
    dpts, dprog, dhits = payout_conditions(slug)
    cons_pen = next((p for k, p in lines if k.startswith('consistency')), 0)
    room = max(0, D_CAP - cons_pen)
    for cat, r in sorted(dhits.items(), key=lambda kv: -D_W[kv[0]]):
        pts = min(D_W[cat], room)
        if pts <= 0:
            break
        room -= pts
        lines.append((f'D:{cat}', pts)); other += pts
        item('D_' + cat.replace('-', '_').upper(), pts, {'text': f"{r.get('program', '')}: {r.get('rule', '')}", 'url': r.get('source', ''), 'locator': f"main programme scored: {dprog}"})
    if f['withheld']:
        lines.append(('Trustpilot retiré', W['TPW'])); other += W['TPW']; item('TPW', W['TPW'])
    elif (f['tp'] or 5) < 4.0 and (f['tpCount'] or 0) >= 1000:
        lines.append(('Trustpilot < 4,0', W['TPMID'])); other += W['TPMID']
        item('TPMID', W['TPMID'], {'locator': f"{f['tp']} / {f['tpCount']}"})
    for k in INCIDENTS.get(slug, []):
        lines.append((k, W[k])); other += W[k]
        inc = next((i for i in f['incidents'] if re.search(r'Alert List|warning|unauthori|regulator|payout', i, re.I)), '')
        url = re.search(r'https://[^\s),]+', inc)
        item(k, W[k], {'text': inc, 'url': url.group(0) if url else ''})
    if 'E_HARSH' in codes:
        lines.append(('E_HARSH', W['E_HARSH'])); other += W['E_HARSH']; item('E_HARSH', W['E_HARSH'], codes['E_HARSH'])
    raw = max(5, c - b - other)
    proposed = raw
    flag = ''
    if source == 'extraits relus à la main':
        # Excerpts only: confirmed clauses can lower a score (by 10 points at most);
        # nothing can raise it, because the rest of the contract has not been read
        # and the absence of other clauses is not established.
        if raw > f['score']:
            proposed, flag = f['score'], 'hausse en attente de lecture complète'
        elif raw < f['score'] - 10:
            proposed, flag = f['score'] - 10, 'baisse plafonnée à 10 (lecture partielle)'
    if proposed > f['score'] and real_incidents(f) and slug not in INCIDENTS and source != 'contrat lu en entier':
        proposed = f['score']
        flag = 'hausse bloquée : incidents du dossier à recoder'
    publish = read
    rows.append({'slug': slug, 'name': f['name'], 'current': f['score'], 'proposed': proposed if publish else f['score'],
                 'raw': raw, 'flag': flag, 'delta': (proposed - f['score']) if publish else 0, 'ceiling': c, 'ceilingWhy': why,
                 'penalties': ' · '.join(f"{k} −{p}" for k, p in lines) or 'aucune', 'confidence': source if publish else (source if source != 'non lu' else 'audit en cours (CGU non lues)'),
                 'evidence': {k: v for k, v in codes.items()}, 'items': items, 'age': age, 'ceilingEvidence': ceil_evidence,
                 'founded': f['founded']})

rows.sort(key=lambda r: -r['proposed'])
json.dump({'weights': W, 'consistency': CONS, 'rows': rows}, open(OUT + '.json', 'w'), ensure_ascii=False, indent=1)
with open(OUT + '.csv', 'w', newline='') as fh:
    w = csv.writer(fh)
    w.writerow(['firm', 'current', 'proposed', 'delta', 'raw_scale_c', 'ceiling', 'ceiling_why', 'penalties', 'confidence', 'flag'])
    for r in rows:
        w.writerow([r['name'], r['current'], r['proposed'], r['delta'], r['raw'], r['ceiling'], r['ceilingWhy'], r['penalties'], r['confidence'], r['flag']])
print(len(rows), 'firms')
