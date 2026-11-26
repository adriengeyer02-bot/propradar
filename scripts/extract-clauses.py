#!/usr/bin/env python3
"""Flag every paragraph of a firm's archived legal texts that touches a checklist item.

Usage: python3 -I scripts/extract-clauses.py <terms-archive/slug> [--out file.json] [--md file.md]

Deterministic and exhaustive: each paragraph of each archived page is tested
against the same lexicon, so two audits of the same text review the same
paragraphs. Section headings are carried with each paragraph so a sentence is
never read outside its section (lesson of Topstep §29, 25 Nov 2026).
"""
import json, os, re, sys, hashlib

CHECKLIST = {
    'discretion': r"sole discretion|absolute discretion|own discretion|its discretion|our discretion|at any time for any reason|for any reason|without (?:any )?reason|in (?:its|our) (?:sole |reasonable )?(?:opinion|judg(?:e)?ment|determination)|deem(?:s|ed)? (?:to be )?(?:necessary|appropriate|abusive|prohibited)|reserves? the right|final and binding|decision(?:s)? (?:is|are) final|discrétion|discretion|seule appréciation|à tout moment|pour quelque raison|décision (?:est )?(?:finale|définitive)|se réserve le droit|reserve le droit",
    'forfeiture': r"forfeit|confiscat|void|nullif|cancel(?:l)?(?:ation|ed|s)? (?:of )?(?:the |any |all )?(?:profit|reward|payout|withdraw|gain|balance)|withh[oe]ld|den(?:y|ial) (?:of )?(?:the |any )?(?:payout|reward|withdraw)|refuse (?:to pay|the payout|a payout|payment)|claw ?back|recover (?:any )?(?:amount|reward|payout)|reverse|deduct|remov(?:e|al) (?:of )?(?:the )?(?:profit|gain|trade)|annul|confisqu|retenir|retenue|refus(?:er)? (?:le |tout )?(?:paiement|récompense|retrait)|déduir|déduction|perte des (?:gains|profits|récompenses)|récupér",
    'prohibited': r"prohibited|forbidden|not (?:allowed|permitted)|banned|abus(?:e|ive)|gambl|toxic|exploit|arbitrage|latency|hedg|copy ?trad|martingale|grid|tick scalp|high[- ]frequency|hft|news (?:trading|event)|reckless|replicab|unrealistic|gaming|manipulat|interdit|prohib|abus|gamble|jeu de hasard|arbitrage de latence|copie de trades|couverture",
    'changes': r"amend|modif(?:y|ication)|change (?:these|the|our|any)|update (?:these|the)|without (?:prior )?notice|with or without notice|retroactiv|existing accounts?|effective (?:upon|immediately|on publication)|continued use|modifi|sans préavis|sans preavis|rétroacti|retroacti|mise(?:s)? à jour|entrée en vigueur",
    'reputation': r"reputation|disparag|defam|negative (?:review|comment)|publicly|social media|confidential|non-disclosure|gag|réputation|reputation|dénigr|denigr|diffam|confidential|publiquement|réseaux sociaux",
    'consistency': r"consisten|best (?:trading )?day|single (?:trading )?day|largest (?:winning )?(?:day|trade)|\d{1,2}\s?% (?:of (?:the )?(?:total )?(?:net )?profit)|profit (?:cap|share rule)|cohérence|coherence|consistance|meilleur jour|meilleure journée",
    'payout': r"payout|withdraw|reward|profit split|performance fee|scholarship|buffer|minimum (?:trading )?days|bi-?weekly|on demand|cap(?:ped)? (?:at|per)",
    'recourse': r"appeal|review (?:request|the decision|procedure)|dispute|arbitrat|complain|right to (?:explain|respond|be heard)|representations|ombudsman|mediat|jurisdiction|governing law|recours|réclamation|arbitrag|médiat|juridiction|droit applicable",
    'entity': r"\b(?:ltd|limited|llc|l\.l\.c\.|inc\.?|gmbh|s\.r\.o\.|fz-?llc|fzco|fze|pte|pty|s\.a\.|b\.v\.|a\.s\.)\b|incorporated|registered (?:in|under|office|number)|company (?:number|no\.?|registration)|registration (?:number|no\.?)",
    'funded_agreement': r"(?:funded|trader|account|contractor|participation|live|xfa|pro) (?:trader )?agreement|separate (?:written )?agreement|supplemental (?:written )?agreement|contract (?:we send|will be sent|provided)|sign(?:ed|ing)? (?:the |a )?(?:contract|agreement)|contrat (?:distinct|séparé|de trader|funded)|accord (?:distinct|séparé)",
    'kyc_vpn': r"\bkyc\b|identity verification|\bvpn\b|\bvps\b|proxy|ip address|location|restricted (?:countr|jurisdiction)",
    'inactivity': r"inactiv|dormant|at least one (?:trade|trading day)|days? without (?:a )?trad",
    'refund_chargeback': r"refund|chargeback|charge-back|payment dispute|bank dispute|rembourse|rétrofactur|contestation bancaire|litige bancaire",
}
RX = {k: re.compile(v, re.I) for k, v in CHECKLIST.items()}
HEAD = re.compile(r"^\s*(?:(?:section|article|clause|§)\s*)?(?:\d+(?:\.\d+)*\.?|[A-Z]\.|[IVX]+\.)\s+\S.{0,90}$|^[A-Z0-9][A-Z0-9 ,&/()'’-]{3,80}$")


def paragraphs(text):
    lines = text.split('\n')
    heading, buf, out = '', [], []
    def flush():
        if buf:
            p = ' '.join(x.strip() for x in buf).strip()
            if len(p) > 40:
                out.append((heading, p))
            buf.clear()
    for ln in lines:
        s = ln.strip()
        if not s:
            flush(); continue
        if len(s) < 100 and HEAD.match(s) and not s.endswith(('.', ';', ',')) or (len(s) < 100 and re.match(r"^\s*(?:\d+(?:\.\d+)*\.?)\s+[A-Z]", s) and len(s.split()) <= 12):
            flush(); heading = s; continue
        buf.append(s)
        if len(' '.join(buf)) > 1500:
            flush()
    flush()
    return out


def main():
    d = sys.argv[1]
    args = sys.argv[2:]
    out = args[args.index('--out') + 1] if '--out' in args else None
    md = args[args.index('--md') + 1] if '--md' in args else None
    index = json.load(open(os.path.join(d, 'index.json')))
    seen_hash, flagged, stats = set(), [], []
    # Boilerplate (cookie banners, menus, footers) repeats across pages: drop
    # any paragraph whose opening appears on two or more pages.
    from collections import Counter
    openings, bodies = Counter(), set()
    for item in index:
        f = item.get('file')
        if f and os.path.exists(os.path.join(d, f)):
            raw = open(os.path.join(d, f), encoding='utf-8', errors='replace').read()
            body = raw.split('\n\n', 1)[1] if '\n\n' in raw else raw
            bh = hashlib.sha256(body.encode()).hexdigest()
            if bh in bodies:
                continue
            bodies.add(bh)
            for k in {p[:120] for _, p in paragraphs(body)}:
                openings[k] += 1
    for item in index:
        f = item.get('file')
        if not f or not os.path.exists(os.path.join(d, f)):
            continue
        raw = open(os.path.join(d, f), encoding='utf-8', errors='replace').read()
        body = raw.split('\n\n', 1)[1] if '\n\n' in raw else raw
        h = hashlib.sha256(body.encode()).hexdigest()
        dup = h in seen_hash
        seen_hash.add(h)
        blocked = bool(re.search(r"just a moment|performing security verification|attention required", body[:600], re.I))
        redirected = item.get('finalUrl') and item['finalUrl'].rstrip('/') != item['url'].rstrip('/')
        paras = [] if dup or blocked else paragraphs(body)
        n = 0
        for heading, p in paras:
            if openings[p[:120]] >= 2 and len(index) > 2 and len(p) < 400:
                continue
            cats = [k for k, rx in RX.items() if rx.search(p) or (heading and rx.search(heading))]
            if cats:
                n += 1
                flagged.append({'url': item['url'], 'finalUrl': item.get('finalUrl'), 'heading': heading, 'cats': cats, 'text': p})
        stats.append({'url': item['url'], 'finalUrl': item.get('finalUrl'), 'chars': item.get('chars'), 'paragraphs': len(paras), 'flagged': n,
                      'duplicate': dup, 'blocked': blocked, 'redirected': bool(redirected)})
    res = {'firm': os.path.basename(d.rstrip('/')), 'pages': stats, 'flagged': flagged,
           'lexiconSha': hashlib.sha256(json.dumps(CHECKLIST, sort_keys=True).encode()).hexdigest()[:12]}
    if out:
        json.dump(res, open(out, 'w'), ensure_ascii=False, indent=1)
    if md:
        with open(md, 'w') as fh:
            for p in stats:
                fh.write(f"# PAGE {p['url']} chars={p['chars']} paras={p['paragraphs']} flagged={p['flagged']}{' DUP' if p['duplicate'] else ''}{' BLOCKED' if p['blocked'] else ''}{' REDIRECT->'+str(p['finalUrl']) if p['redirected'] else ''}\n")
            cur = None
            CORE = {'discretion', 'forfeiture', 'changes', 'reputation', 'consistency', 'funded_agreement', 'refund_chargeback', 'recourse', 'prohibited'}
            for i, x in enumerate(flagged):
                if not CORE.intersection(x['cats']):
                    continue
                if x['url'] != cur:
                    cur = x['url']; fh.write(f"\n## {cur}\n")
                fh.write(f"[{i}] ({x['heading'][:70]}) {{{','.join(x['cats'])}}} {x['text']}\n")
    print(json.dumps({'pages': len(stats), 'flagged': len(flagged), 'blocked': sum(p['blocked'] for p in stats), 'redirected': sum(p['redirected'] for p in stats)}))


main()
