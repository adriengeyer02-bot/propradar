#!/usr/bin/env python3
"""Normalise the audit-branch dossiers into app/data/contract-audits.json.

Usage: python3 -I build_contract_audits.py <audits_dir> <names.json> <fr2en.json> <out.json> [extra wave files...]

No score, point or simulated figure is carried over: only findings, sources,
locators, dates, Trustpilot checks, payout evidence and open items.
"""
import json, re, sys, glob, os

AUD, NAMES, FR2EN, OUT = sys.argv[1:5]
EXTRA = sys.argv[5:]
names = {s: n for s, n, _ in json.load(open(NAMES))}
fr2en = json.load(open(FR2EN)) if os.path.exists(FR2EN) else {}
missing_tr = set()

def L(path):
    return json.load(open(os.path.join(AUD, path)))

FR_WORDS = re.compile(r"\b(le|la|les|des|une|est|pour|dans|sans|avec|peut|selon|aux|du|et|ou|sur|pas|que|qui|par|ne|au|ces|cette|son|sa|ses)\b", re.I)
def is_fr(t):
    return bool(re.search(r"[éèêàùçôîû]", t)) or len(FR_WORDS.findall(t)) >= 3
FR_HINT = re.compile(r"[éèêàùçôî]|\b(le|la|les|des|une|est|pour|dans|sans|avec|peut|selon|aux|du)\b", re.I)

def en(text):
    text = (text or '').strip()
    if not text:
        return text
    if is_fr(text):
        if text in fr2en:
            return fr2en[text]
        missing_tr.add(text)
        return None
    return text

# ---------------------------------------------------------------- classify
DISCRETION_KINDS = {'discretion', 'forfeiture', 'sanction', 'termination', 'clawback', 'change', 'fees_and_change',
                    'recourse/change', 'downgrade', 'conduct', 'confidentiality', 'privacy/reputation', 'chargeback',
                    'discretion_and_safeguard', 'forfeiture_and_safeguard', 'termination_and_safeguard', 'transition',
                    'audit', 'hard_breach', 'reward_discretion', 'subjective-reward', 'existing-contract-change',
                    'live-transition'}
CONTRA_KINDS = {'conflict', 'potential_conflict', 'asymmetry', 'hierarchy'}
VERSION_KINDS = {'version', 'cohort'}
PAYOUT_KINDS = {'payout', 'hold', 'payment', 'refund', 'withdrawal-limit'}
SAFE_KINDS = {'safeguard', 'recourse'}
LEGAL_KINDS = {'identity', 'incorporation', 'holding', 'contract_scope', 'legal_supplier'}
HISTORY_KINDS = {'complaints', 'historical', 'reputation', 'lead'}

RX_CONTRA = re.compile(r"contradict|inconsisten|discrepan|disagree|alternates|differs?\b|conflicting with|\bvs\.?\b|while (the )?(current )?FAQ|FAQ (says|states)[^.]*(terms|schedule|agreement)|(terms|schedule|agreement)[^.]*FAQ says|current snippet says|shows USD|reports? .*current vs old", re.I)
RX_PRECEDENCE = re.compile(r"prevail|precedence|takes priority|priority to|overrides|controls over|deemed more specific|decide which provision|hierarchy", re.I)
RX_NOT_CONTRA = re.compile(r"not necessarily contradict|NOT found|no verified contradiction", re.I)
RX_HIDDEN = re.compile(r"only in (the )?(terms|agreement|contract|annex|schedule)|not (stated|shown|mentioned|disclosed|listed) (in|on) (the )?(FAQ|rules|help|programme page|program page|checkout)|buried|absent from (the )?(FAQ|rules)|not visible (in|on)|hidden", re.I)
RX_DISCRETION = re.compile(r"discretion|subjective|at (its|their) (sole|absolute|exclusive)|may (deny|refuse|withhold|cancel|void|forfeit|terminate|close|reduce|change|amend)|forfeit|confiscat|void|claw ?back|without (prior )?notice|retroactiv|qualitative|not guaranteed|deem|reserves? the right|appréciation|seule discrétion|discrétion|refus|confiscation|annul|résili|sans préavis|rétroactiv", re.I)
RX_SAFE = re.compile(r"safeguard|non-?retroactiv|no retroactiv|appeal|right to (explain|respond)|recourse|must identify|sauvegarde|recours|non rétroactiv", re.I)
RX_PAYOUT = re.compile(r"payout|withdraw|reward|profit split|\bsplit\b|buffer|retrait|récompense", re.I)
RX_LEGAL = re.compile(r"registr|incorporat|company no|n°|entity|ltd\b|limited\b|llc\b|fzco|counterparty|contrepartie|société", re.I)
RX_HISTORY = re.compile(r"complaint|bbb|lawsuit|regulator|warning list|historical incident|plainte|incident", re.I)
RX_GAP = re.compile(r"not (obtained|captured|retrieved|verified|fully)|unresolved|blocked|inaccessible|404|need(s)? (signed|reconcil)|non obtenu|introuvable|à vérifier|à réconcilier", re.I)


def classify(kind, text, family=''):
    k = (kind or '').strip().lower()
    t = f"{family} {text}"
    if RX_PRECEDENCE.search(t) or RX_NOT_CONTRA.search(t):
        group = 'version'
    elif (k in CONTRA_KINDS or RX_CONTRA.search(t)) and not (RX_LEGAL.search(t) and not re.search(r"FAQ|split|%|days?\b|cap\b", t)):
        group = 'contradiction'
    elif k in VERSION_KINDS:
        group = 'version'
    elif k in SAFE_KINDS or (k == '' and RX_SAFE.search(t) and not RX_DISCRETION.search(t)):
        group = 'safeguard'
    elif k in DISCRETION_KINDS or (k in ('', 'documentary', 'missing', 'objective') and RX_DISCRETION.search(t)) or (k not in PAYOUT_KINDS | LEGAL_KINDS | HISTORY_KINDS and RX_DISCRETION.search(t)):
        group = 'discretion'
    elif k in PAYOUT_KINDS or (k in ('', 'documentary') and RX_PAYOUT.search(t)):
        group = 'payout'
    elif k in LEGAL_KINDS or (k in ('', 'documentary') and RX_LEGAL.search(t)):
        group = 'legal'
    elif k in HISTORY_KINDS or (k in ('', 'documentary') and RX_HISTORY.search(t)):
        group = 'history'
    elif k in ('documentary', 'missing', 'scope') and RX_GAP.search(t):
        group = 'gap'
    else:
        group = 'rule'
    return group


def mirror(source, scope):
    s = f"{source} {scope}".lower()
    if 'mirror' in s or 'third-party' in s or 'propfirm007' in s:
        return 'third-party copy'
    return None

# ---------------------------------------------------------------- records
firms = {}

def firm(slug):
    if slug not in firms:
        firms[slug] = {'slug': slug, 'name': names.get(slug, slug), 'level': 'first-file', 'checkedOn': None,
                       'programs': [], 'findings': [], 'payoutEvidence': [], 'payoutNote': None,
                       'trustpilot': None, 'registry': None, 'openItems': [], 'sourceFiles': []}
    return firms[slug]

seen = set()
# Manual review of the automatic grouping (Claude, 2026-11-25).
OVERRIDES = {
    ('alpha-capital-group', 'Return to normal leverage'): 'version',
    ('equity-edge', 'A payout can be rejected'): 'discretion',
    ('funded-trading-plus', 'FAQ says an agreement'): 'payout',
    ('funded7', 'Gains from sanctioned'): 'rule',
    ('fundedhive', 'The site claims rewards'): 'payout',
    ('fundednext', '40% of gains in applicable'): 'rule',
    ('rebelsfunding', 'Reward/commission conditions'): 'legal',
    ('sfx-funded', 'The FAQ says inconsistent'): 'discretion',
    ('the5ers', 'Orders executed'): 'rule',
    ('tradeify', '35% consistency'): 'version',
    ('alpha-capital-group', 'Firm determines breach of reputation'): 'discretion',
    ('fundednext', 'Broad reputational restrictions'): 'discretion',
    ('instant-funding', 'Variation effective on publication'): 'version',
    ('wegetfunded', 'Right to amend, adapt or close'): 'discretion',
}
# Held back from the public page until Geyer approves (CLAUDE.md rule 6:
# incident-type facts, or a source that is not the firm's own current document).
HOLD = {
    ('fundyourfx', 'Trustpilot no longer accepts'),
    ('funded-bull', 'Secondary report of tracker closed'),
    ('take-profit-trader', 'Company responses describe'),
}

def add(slug, *, text, source, locator='', scope='', kind='', family='', checked='2026-11-24', verification=None, file=''):
    text_en = en(text)
    if text_en is None:
        return
    key = (slug, re.sub(r'\W+', '', text_en.lower())[:120])
    if key in seen:
        return
    seen.add(key)
    f = firm(slug)
    group = classify(kind, text_en, family)
    if group == 'safeguard' and re.search(r"no conclusion|not read|not obtained|not established|alone do not", text_en, re.I):
        group = 'gap'
    for (o_slug, o_prefix), o_group in OVERRIDES.items():
        if slug == o_slug and text_en.startswith(o_prefix):
            group = o_group
    item = {
        'group': group,
        'scope': en(scope) or '' if scope else '',
        'text': text_en,
        'source': source,
        'locator': en(locator) or locator if locator else '',
        'checkedOn': checked,
    }
    if RX_HIDDEN.search(text_en):
        item['hidden'] = True
    m = mirror(source, scope)
    if m:
        item['sourceType'] = m
    if verification:
        item['verification'] = verification
    if m or any(slug == h_slug and text_en.startswith(h_prefix) for h_slug, h_prefix in HOLD):
        item['publish'] = False
    f['findings'].append(item)
    if file and file not in f['sourceFiles']:
        f['sourceFiles'].append(file)

def opens(slug, items):
    f = firm(slug)
    for it in items if isinstance(items, list) else [items]:
        if not it:
            continue
        e = en(it)
        if e and e not in f['openItems']:
            f['openItems'].append(e)

def tp(slug, t):
    if not t:
        return
    f = firm(slug)
    cur = f['trustpilot']
    if cur is None or (t.get('checkedOn') or '') >= (cur.get('checkedOn') or ''):
        f['trustpilot'] = {k: t.get(k) for k in ('url', 'checkedOn', 'status', 'rating', 'count') if t.get(k) is not None}

# --- historical 121 dossiers (first documentary files)
def old_file(path, fields):
    w = L(path)
    fl = w['firms']
    for x in fl:
        slug = x['slug']
        f = firm(slug)
        checked = x.get('checkedOn') or x.get('reviewedOn') or w.get('date') or '2026-11-24'
        f['checkedOn'] = max(f['checkedOn'] or '', checked)
        for g in x.get('findings') or x.get('clauses') or x.get('observations') or []:
            text = g.get('effect') or g.get('documentedEffect') or g.get('contractualMeaning') or g.get('finding')
            src = g.get('sourceUrl') or g.get('source') or x.get('primarySource') or (x.get('sources') or [None])[0]
            loc = g.get('section') or g.get('clause') or g.get('locator') or ''
            fam = g.get('riskFamily') or g.get('subject') or ''
            add(slug, text=text, source=src, locator=loc, kind=g.get('type', ''), family=fam, checked=checked, file=path)
        opens(slug, x.get('missingAgreementOrVerification') or x.get('remainingWork') or x.get('missing') or x.get('remainingCriticalDocument') or x.get('remaining'))
        if x.get('sourceProblem'):
            opens(slug, x['sourceProblem'])

for p in sorted(glob.glob(os.path.join(AUD, 'contract-clauses-*.json'))):
    old_file(os.path.basename(p), None)

# --- reopened counter-audits
waves = sorted(os.path.basename(p) for p in glob.glob(os.path.join(AUD, 'full-audit-reopen-wave*.json'))) + EXTRA
for path in waves:
    w = L(path)
    for x in w['firms']:
        slug = x['slug']
        f = firm(slug)
        f['level'] = 'counter-audit'
        checked = x.get('auditDate') or w.get('date')
        f['checkedOn'] = max(f['checkedOn'] or '', checked)
        for p in x.get('programs') or []:
            if p not in f['programs']:
                f['programs'].append(p)
        for g in x.get('findings', []):
            add(slug, text=g['finding'], source=g['source'], locator=g.get('locator', ''), scope=g.get('scope', ''),
                kind=g.get('kind', ''), checked=g.get('checkedOn') or g.get('date') or checked,
                verification=g.get('verification'), file=path)
        tp(slug, x.get('trustpilot'))
        for pe in x.get('payoutEvidence') or []:
            f['payoutEvidence'].append({**pe, 'checkedOn': pe.get('checkedOn') or pe.get('asOf', '')[:10] or checked})
        if x.get('payoutSearchResult'):
            f['payoutNote'] = x['payoutSearchResult']
        if x.get('registryStatus'):
            f['registry'] = x['registryStatus']
        opens(slug, x.get('missing'))
        if path not in f['sourceFiles']:
            f['sourceFiles'].append(path)

# --- v6.3 counter-audits: findings only, never the simulated points or scores
v63 = 'v63-counteraudit-bulenox-goat-fundingpips-2026-11-24.json'
w = L(v63)
for x in w['firms']:
    slug = x['slug']
    f = firm(slug)
    f['level'] = 'counter-audit'
    f['checkedOn'] = max(f['checkedOn'] or '', w['date'])
    for g in x.get('common', []):
        add(slug, text=g['finding'], source=g['source'], locator=g.get('locator', ''), scope='all programmes', kind=g.get('family', ''), checked=w['date'], file=v63)
    for prog in x.get('programs', []):
        if prog['name'] not in f['programs']:
            f['programs'].append(prog['name'])
        for g in prog.get('rules', []):
            add(slug, text=g['finding'], source=g['source'], locator=g.get('locator', ''), scope=prog['name'], kind=g.get('family', ''), checked=w['date'], file=v63)
    opens(slug, x.get('missing'))
    if x.get('tpSource'):
        f.setdefault('trustpilotUrlOnly', x['tpSource'])

# --- independent on-chain tracker, read by Claude on 2026-11-25
TRACKER_URL = 'https://payoutjunction.com/alltime'
TRACKER = [
    ('tradeify', 'Tradeify Futures', 468894858, 245639, 'Rise'), ('tradeify', 'Tradeify FX', 1025125, 426, 'Rise'),
    ('fundednext', 'FundedNext', 353872270, 252299, 'Rise, Direct Crypto'),
    ('myfundedfutures', 'MyFundedFutures', 274473466, 180233, 'Rise'),
    ('funding-pips', 'FundingPips', 159940179, 71944, 'Rise'),
    ('the5ers', 'The5ers', 101654178, 48537, 'Rise'),
    ('breakout-prop', 'Breakout', 83931731, 55157, 'Direct Crypto'),
    ('alpha-capital-group', 'AlphaCapitalGroup', 74793046, 39223, 'Rise'),
    ('e8-markets', 'E8Markets', 47582149, 15901, 'Rise'),
    ('blue-guardian', 'BlueGuardian', 40898683, 26548, 'Rise, Direct Crypto'),
    ('fxify', 'FXIFY', 36079782, 14960, 'Rise'),
    ('alpha-futures', 'AlphaFutures', 33415099, 16205, 'Rise'),
    ('top-one-futures', 'TopOneFutures', 30407332, 13696, 'Rise'),
    ('goat-funded-trader', 'GoatFundedTrader', 27799318, 46446, 'Rise, Direct Crypto'),
    ('tradeday', 'TradeDay', 16323563, 14734, 'Rise'),
    ('aqua-funded', 'AquaFunded', 13335576, 9427, 'Rise, Direct Crypto'),
    ('blusky-trading', 'BluSky.Pro', 12898022, 11991, 'Rise'),
    ('funded-trader-markets', 'FundedTraderMarkets', 12282417, 8273, 'Rise, Direct Crypto'),
    ('brightfunded', 'BrightFunded', 11933014, 7135, 'Direct Crypto'),
    ('hola-prime', 'HolaPrime', 10642909, 6483, 'Rise, Direct Crypto'),
    ('elite-trader-funding', 'Elite Trader Funding', 10015655, 6282, 'Rise'),
    ('instant-funding', 'Instantfunding', 9664728, 10661, 'Rise'),
    ('tx3-funding', 'TX3 Funding', 7879638, 1583, 'Rise'),
    ('top-one-trader', 'TopOneTrader', 6886693, 3881, 'Rise'),
    ('orion-funded', 'OrionFunded', 4592615, 3462, 'Rise'),
    ('fundedhive', 'FundedHive', 2605977, 6265, 'Direct Crypto (On-chain)'),
    ('hyrotrader', 'HyroTrader', 1737266, 2253, 'Direct Crypto'),
]
for slug, label, amount, count, method in TRACKER:
    if slug not in names:
        continue
    f = firm(slug)
    # Replace older readings of the same tracker page/label with today's reading.
    f['payoutEvidence'] = [p for p in f['payoutEvidence'] if not (p.get('url') == TRACKER_URL)]
    f['payoutEvidence'].append({'url': TRACKER_URL, 'trackerLabel': label, 'grade': 'EXTERNAL_TRACKER_ATTRIBUTION_NOT_INDIVIDUALLY_VERIFIED',
                                'method': method, 'amountUSD': amount, 'count': count, 'period': 'all time, as shown on 2026-11-25',
                                'checkedOn': '2026-11-25'})

# ---------------------------------------------------------------- finalize
RELIABILITY = {
    'EXTERNAL_TRACKER_ATTRIBUTION_NOT_INDIVIDUALLY_VERIFIED': 'tracker',
    'EXTERNAL_ANALYSIS_OF_RISE_SETTLEMENT': 'tracker',
    'FIRM_REPORTED_AGGREGATE': 'firm',
    'FIRM_REPORTED_STATISTICS': 'firm',
}
# Trustpilot status differs from the firm page panel: held for owner review.
TP_HOLD = {'crypto-fund-trader'}
out = []
for slug, f in sorted(firms.items()):
    if slug in TP_HOLD and f['trustpilot']:
        f['trustpilot']['publish'] = False
    if slug not in names:
        print('skip unknown slug', slug, file=sys.stderr)
        continue
    for p in f['payoutEvidence']:
        p['reliability'] = RELIABILITY.get(p.get('grade'), 'unclassified')
    f.pop('trustpilotUrlOnly', None) if f['trustpilot'] else None
    f['counts'] = {g: sum(1 for x in f['findings'] if x['group'] == g and x.get('publish', True)) for g in ('rule', 'discretion', 'contradiction', 'version', 'payout', 'safeguard', 'legal', 'history', 'gap')}
    f['status'] = 'partial'
    out.append(f)

json.dump({'generatedOn': '2026-11-25', 'source': 'audit/legal-cgu-deep-sweep-20261124 + Claude checks of 2026-11-25',
           'policy': 'Documentary evidence only. Not a score input. Every dossier is partial until the register marks it validated.',
           'firms': out}, open(OUT, 'w'), ensure_ascii=False, indent=1)
json.dump(sorted(missing_tr), open(OUT + '.missing-fr.json', 'w'), ensure_ascii=False, indent=0)
print(len(out), 'firms;', sum(len(f['findings']) for f in out), 'findings;', len(missing_tr), 'FR strings to translate', file=sys.stderr)
