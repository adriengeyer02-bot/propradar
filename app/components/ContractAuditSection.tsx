import type { Locale } from '../lib/locales';
import { fmt, formatDateLong, numberLocale } from '../lib/messages';
import { getContractAudit, type ContractFinding, type ContractFindingGroup, type PayoutEvidence } from '../lib/contractAudits';
import { contractAuditCopy } from '../lib/contractAuditI18n';
import { localizeContractAuditText, contractEvidenceStat } from '../lib/dataI18n/contractAuditTexts';

/**
 * Contract audit dossier for one firm. Documentary only: it never reads or
 * writes the score. Every dossier is shown as partial.
 */
export default function ContractAuditSection({ slug, firmName, locale }: { slug: string; firmName: string; locale: Locale }) {
  const audit = getContractAudit(slug);
  if (!audit) return null;
  const c = contractAuditCopy(locale);
  const nf = new Intl.NumberFormat(numberLocale(locale));
  const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const by = (group: ContractFindingGroup) => audit.findings.filter((finding) => finding.group === group);

  const rules = by('rule');
  const ruleGroups = new Map<string, ContractFinding[]>();
  for (const rule of rules) {
    const key = rule.scope?.trim() || '';
    ruleGroups.set(key, [...(ruleGroups.get(key) ?? []), rule]);
  }

  const tp = audit.trustpilot;
  const tpWithheld = Boolean(tp?.status && /WITHHELD/.test(tp.status));
  const missing = [...audit.openItems, ...by('gap').map((finding) => finding.text)];
  const discretion = by('discretion');
  const contradictions = by('contradiction');

  const blocks: Array<{ key: ContractFindingGroup; title: string; hint?: string; items: ContractFinding[]; tone?: string }> = [
    { key: 'discretion', title: c.discretion, hint: c.discretionHint, items: discretion, tone: 'watch' },
    { key: 'contradiction', title: c.contradiction, hint: c.contradictionHint, items: contradictions, tone: 'watch' },
    { key: 'payout', title: c.payout, items: by('payout') },
    { key: 'version', title: c.version, items: by('version') },
    { key: 'safeguard', title: c.safeguard, items: by('safeguard'), tone: 'good' },
    { key: 'legal', title: c.legal, items: by('legal') },
    { key: 'history', title: c.history, items: by('history') },
  ];

  return (
    <section className="container pr-section pr-contract-audit" id="contract-audit" aria-labelledby={`contract-audit-${slug}`}>
      <header className="pr-section-head">
        <div>
          <div className="eyebrow">
            {c.eyebrow}
            {audit.checkedOn ? <> · {c.checked} <time dateTime={audit.checkedOn}>{formatDateLong(locale, audit.checkedOn)}</time></> : null}
          </div>
          <h2 id={`contract-audit-${slug}`}>{c.title}</h2>
        </div>
        <div className="pr-section-meta">
          <span>{c.discretion} <b>{discretion.length}</b></span>
          <span>{c.contradiction} <b>{contradictions.length}</b></span>
          <span>{c.evidence} <b>{audit.payoutEvidence.length}</b></span>
        </div>
      </header>
      <p className="pr-section-lead">{fmt(c.lead, { name: firmName })}</p>
      <p className="ca-badges">
        <span className="pr-tag">{audit.level === 'counter-audit' ? c.levelCounter : c.levelFirst}</span>
        <span className="pr-tag">{c.notScore}</span>
      </p>

      <div className="pr-rules-menus">
        {rules.length ? (
          <details className="pr-rules-menu">
            <summary>
              <span className="pr-rules-menu-name">{c.rule}</span>
              <span className="pr-rules-menu-counts"><b>{rules.length}</b></span>
            </summary>
            <div className="pr-rules-menu-body">
              {[...ruleGroups.entries()].map(([scope, list]) => (
                <div className="pr-rules-block" key={scope}>
                  <h3>{scope ? localizeContractAuditText(locale, scope) : c.allPrograms}</h3>
                  <FindingList items={list} c={c} locale={locale} hideScope />
                </div>
              ))}
            </div>
          </details>
        ) : null}

        {blocks.map((block) => block.items.length ? (
          <details className={`pr-rules-menu ca-menu-${block.key}`} key={block.key}>
            <summary>
              <span className="pr-rules-menu-name">{block.title}</span>
              <span className={`pr-rules-menu-counts${block.tone === 'watch' ? ' pr-rules-menu-risk' : ''}`}><b>{block.items.length}</b></span>
            </summary>
            <div className="pr-rules-menu-body">
              <div className={`pr-rules-block ${block.tone === 'watch' ? 'pr-rules-block-risk' : 'pr-rules-block-restriction'}`}>
                {block.hint ? <p className="pr-rules-block-hint ca-hint">{block.hint}</p> : null}
                <FindingList items={block.items} c={c} locale={locale} />
              </div>
            </div>
          </details>
        ) : null)}

        <details className="pr-rules-menu ca-menu-evidence">
          <summary>
            <span className="pr-rules-menu-name">{c.evidence}</span>
            <span className="pr-rules-menu-counts"><b>{audit.payoutEvidence.length}</b></span>
          </summary>
          <div className="pr-rules-menu-body">
            <div className="pr-rules-block pr-rules-block-restriction">
              <p className="pr-rules-block-hint ca-hint">{c.evidenceHint}</p>
              {audit.payoutEvidence.length ? (
                <ul className="pr-rules-list">
                  {audit.payoutEvidence.map((evidence, index) => (
                    <li key={`${evidence.url}-${index}`}>
                      <span className="pr-rules-stage">{reliabilityLabel(evidence, c)}</span>
                      <p>{evidenceLine(evidence, c, nf, usd, locale)}</p>
                      {evidence.note ? <p className="pr-rules-impact">{localizeContractAuditText(locale, evidence.note)}</p> : null}
                      <a href={evidence.url} target="_blank" rel="noopener noreferrer">
                        {c.source} ↗ <span>{domain(evidence.url)}</span>
                        {evidence.checkedOn ? <span className="ca-date"> · {formatDateLong(locale, evidence.checkedOn)}</span> : null}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : <p className="ca-note">{c.noEvidence}</p>}
            </div>
          </div>
        </details>

        {missing.length ? (
          <details className="pr-rules-menu ca-menu-missing">
            <summary>
              <span className="pr-rules-menu-name">{c.missing}</span>
              <span className="pr-rules-menu-counts"><b>{missing.length}</b></span>
            </summary>
            <div className="pr-rules-menu-body">
              <div className="pr-rules-block pr-rules-block-restriction">
                <p className="pr-rules-block-hint ca-hint">{c.missingHint}</p>
                <ul className="ca-missing">
                  {missing.map((item) => <li key={item}>{localizeContractAuditText(locale, item)}</li>)}
                  {audit.registry && /NOT/.test(audit.registry) ? <li>{c.registryNot}</li> : null}
                </ul>
              </div>
            </div>
          </details>
        ) : null}
      </div>

      {tp?.url && tp.checkedOn && tp.publish !== false ? (
        <p className="ca-trustpilot">
          <a href={tp.url} target="_blank" rel="noopener noreferrer">{fmt(c.trustpilot, { date: formatDateLong(locale, tp.checkedOn) })} ↗</a>
          {': '}
          {tpWithheld
            ? c.tpWithheld
            : typeof tp.rating === 'number' && typeof tp.count === 'number'
              ? fmt(c.tpReviews, { rating: tp.rating.toFixed(1), count: nf.format(tp.count) })
              : null}
        </p>
      ) : null}
    </section>
  );
}

function FindingList({ items, c, locale, hideScope }: { items: ContractFinding[]; c: ReturnType<typeof contractAuditCopy>; locale: Locale; hideScope?: boolean }) {
  return (
    <ul className="pr-rules-list">
      {items.map((finding, index) => (
        <li key={`${finding.source}-${index}`}>
          {!hideScope && finding.scope ? <span className="pr-rules-stage">{localizeContractAuditText(locale, finding.scope)}</span> : null}
          <p>
            {finding.hidden ? <span className="pr-tag pr-tone-watch ca-inline-tag">{c.hidden}</span> : null}
            {localizeContractAuditText(locale, finding.text)}
          </p>
          {finding.sourceType ? <p className="pr-rules-impact"><span className="pr-tag pr-tone-watch">{c.thirdParty}</span></p> : null}
          <a href={finding.source} target="_blank" rel="noopener noreferrer">
            {c.source} ↗ <span>{domain(finding.source)}</span>
            {finding.locator ? <span className="ca-locator"> · {finding.locator}</span> : null}
            {finding.checkedOn ? <span className="ca-date"> · {formatDateLong(locale, finding.checkedOn)}</span> : null}
          </a>
        </li>
      ))}
    </ul>
  );
}

function reliabilityLabel(evidence: PayoutEvidence, c: ReturnType<typeof contractAuditCopy>) {
  if (evidence.reliability === 'tracker') return c.tracker;
  if (evidence.reliability === 'firm') return c.firm;
  return c.other;
}

function evidenceLine(evidence: PayoutEvidence, c: ReturnType<typeof contractAuditCopy>, nf: Intl.NumberFormat, usd: Intl.NumberFormat, locale: Locale) {
  const parts: string[] = [];
  if (evidence.trackerLabel) parts.push(localizeContractAuditText(locale, evidence.trackerLabel));
  if (typeof evidence.amountUSD === 'number' && typeof evidence.count === 'number') {
    parts.push(fmt(c.payouts, { amount: usd.format(evidence.amountUSD), count: nf.format(evidence.count) }));
  } else if (typeof evidence.amountUSD === 'number') {
    parts.push(usd.format(evidence.amountUSD));
  } else if (typeof evidence.amountUSDLowerBound === 'number') {
    parts.push(`> ${usd.format(evidence.amountUSDLowerBound)}`);
  }
  if (typeof evidence.fundedParticipantsPaidPct === 'number') parts.push(contractEvidenceStat(locale, evidence.fundedParticipantsPaidPct, 'paid'));
  if (typeof evidence.xfaParticipantsLivePct === 'number') parts.push(contractEvidenceStat(locale, evidence.xfaParticipantsLivePct, 'live'));
  if (evidence.method) parts.push(localizeContractAuditText(locale, evidence.method));
  if (evidence.period) parts.push(localizeContractAuditText(locale, evidence.period));
  return parts.join(' · ');
}

function domain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}
