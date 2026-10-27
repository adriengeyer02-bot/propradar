import Link from 'next/link';
import FirmRow, { FirmTableHead } from '../components/ui/FirmRow';
import { latestReviewDate } from '../lib/riskTone';
import FirmLogo from '../components/FirmLogo';
import PageStructuredData from '../components/PageStructuredData';
import { createPageMetadata } from '../lib/pageMetadata';
import {
  auditStatusClass,
  firmsToAudit,
  formatUsd,
  partiallyVerifiedFirms,
  payoutRiskClass,
  propFirms,
  regulatoryRiskClass,
  reviewReliabilityClass,
  scoreClass,
  statusClass,
  verifiedFirms,
} from '../lib/propFirms';
import { toEnglishText } from '../lib/i18n';
import { auditCaseFiles } from '../lib/auditCaseFiles';
import { getEditorialBriefPath, latestEditorialBrief } from '../lib/editorialBriefs';

const AUDIT_DESCRIPTION =
  'Audit PropRadar sources, legal entities, regulator checks and proof depth across verified, partial and watchlist prop-firm profiles.';

export const metadata = createPageMetadata({
  title: 'Prop Firm Source Audit: Evidence and Legal Checks',
  description: AUDIT_DESCRIPTION,
  path: '/audit',
  keywords: ['prop firm audit', 'prop firm legal entity', 'prop firm regulation', 'prop firm sources'],
  category: 'Prop firm due diligence',
});

const priorityAudit = [...propFirms]
  .sort((a, b) => {
    const riskA =
      (a.auditStatus === 'À auditer' ? 90 : a.auditStatus === 'Partiellement vérifié' ? 40 : 0) +
      a.reviewSignals.payoutRiskScore +
      (100 - a.reviewSignals.trustpilotReliabilityScore) +
      (a.status === 'À surveiller' ? 20 : 0) +
      (a.status === 'Fermée' ? 30 : 0);
    const riskB =
      (b.auditStatus === 'À auditer' ? 90 : b.auditStatus === 'Partiellement vérifié' ? 40 : 0) +
      b.reviewSignals.payoutRiskScore +
      (100 - b.reviewSignals.trustpilotReliabilityScore) +
      (b.status === 'À surveiller' ? 20 : 0) +
      (b.status === 'Fermée' ? 30 : 0);

    return riskB - riskA;
  })
  .slice(0, 10);

const trustpilotCovered = propFirms.filter(
  (firm) => firm.trustpilotRating || firm.sources.some((source) => /trustpilot/i.test(`${source.label} ${source.url}`))
);

const officialCovered = propFirms.filter((firm) => firm.sources.some((source) => /site officiel|official|help|faq|programmes/i.test(source.label)));

function legalSourceCount(firm: (typeof propFirms)[number]) {
  return firm.regulatoryAudit.sources.length || firm.sources.length;
}

function isLegalWatchFirm(firm: (typeof propFirms)[number]) {
  const risk = firm.regulatoryAudit.riskLevel;
  return !firm.legalVerified || risk === 'High' || risk === 'Critical' || risk === 'To audit';
}

function legalRiskWeight(firm: (typeof propFirms)[number]) {
  const risk = firm.regulatoryAudit.riskLevel;
  const riskScore =
    risk === 'Critical' ? 100 :
    risk === 'High' ? 86 :
    risk === 'To audit' ? 74 :
    risk === 'Medium to high' ? 64 :
    risk === 'Medium' ? 48 :
    24;

  return riskScore + (firm.legalVerified ? 0 : 18) + (legalSourceCount(firm) < 2 ? 10 : 0);
}

function sourceDepthLabel(firm: (typeof propFirms)[number]) {
  const count = legalSourceCount(firm);
  if (count >= 5) return 'Deep sources';
  if (count >= 3) return 'Usable sources';
  if (count >= 1) return 'Thin sources';
  return 'No sources';
}

const legalVerifiedFirms = propFirms.filter((firm) => firm.legalVerified);
const legalWatchFirms = [...propFirms].filter(isLegalWatchFirm).sort((a, b) => legalRiskWeight(b) - legalRiskWeight(a));
const deepSourceFirms = propFirms.filter((firm) => legalSourceCount(firm) >= 5);
const regulatorCheckedFirms = propFirms.filter((firm) =>
  [...firm.auditSourcesChecked, ...firm.regulatoryAudit.regulatoryStatus, ...firm.regulatoryAudit.sources.map((source) => `${source.label} ${source.url}`)].some((item) =>
    /regulator|regulatory|fca|cftc|nfa|cysec|asic|sec|fsa|companies house|warning/i.test(item)
  )
);
const articleNewsCheckedFirms = propFirms.filter((firm) => firm.auditSourcesChecked.some((source) => (
  /article|news|press|finance magnates|fx news|bloomberg/i.test(source)
)));
const operationalCaseFiles = auditCaseFiles.flatMap((caseFile) => {
  const firm = propFirms.find((candidate) => candidate.slug === caseFile.firmSlug);
  return firm ? [{ caseFile, firm }] : [];
});

export default function AuditPage() {
  return (
    <main className="container audit-page">
      <PageStructuredData
        name="Prop firm source audit"
        description={AUDIT_DESCRIPTION}
        path="/audit"
        breadcrumbLabel="Source audit"
        dateModified="2026-07-19"
        items={priorityAudit.map((firm) => ({
          name: firm.name,
          path: `/firm/${firm.slug}`,
          description: toEnglishText(firm.verdict),
        }))}
      />
      <section className="audit-hero">
        <div>
          <div className="eyebrow">Public Audit</div>
          <h1>Sources, limits and reliability</h1>
          <p className="lead">
            PropRadar does not mix a fully verified profile with an entry added for monitoring. Each firm keeps a visible audit level, consulted sources and signals still needing reinforcement.
          </p>
          <div className="actions">
            <Link href="/comparateur" className="btn btn-primary">Compare firms</Link>
            <Link href="/regles" className="btn">View rules</Link>
          </div>
        </div>
        <div className="panel audit-method-panel">
          <div className="eyebrow">PropRadar Method</div>
          <ol>
            <li>Official sources for prices, rules and products.</li>
            <li>Trustpilot separated from commercial scoring, with caution on unverified facts.</li>
            <li>Payout incidents and complaints counted only when a dated public source is linked.</li>
            <li>Legal entity, regulator status and press searches tracked separately from marketing claims.</li>
            <li>Unchecked entries remain visible, but are not recommended by default.</li>
          </ol>
        </div>
      </section>

      <section className="pr-stat-line" aria-label="Audit coverage">
        <dl>
          <div><dt>Firms tracked</dt><dd>{propFirms.length}</dd></div>
          <div><dt>Multi-source files</dt><dd>{verifiedFirms.length}</dd></div>
          <div><dt>Partial files</dt><dd>{partiallyVerifiedFirms.length}</dd></div>
          <div><dt>To audit</dt><dd>{firmsToAudit.length}</dd></div>
          <div><dt>Entity mapped</dt><dd>{legalVerifiedFirms.length}</dd></div>
          <div><dt>Legal watch</dt><dd>{legalWatchFirms.length}</dd></div>
          <div><dt>5+ sources</dt><dd>{deepSourceFirms.length}</dd></div>
          <div><dt>Regulator checks</dt><dd>{regulatorCheckedFirms.length}</dd></div>
          <div><dt>Press searches</dt><dd>{articleNewsCheckedFirms.length}</dd></div>
        </dl>
        <Link href="/guides/prop-firm-legal-check" className="pr-link">How a legal file is checked <span aria-hidden="true">→</span></Link>
      </section>

      <section className="section audit-case-index" aria-labelledby="audit-case-index-title">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Dated case files</div>
            <h2 id="audit-case-index-title">Operational failures need a timeline, not a star rating.</h2>
          </div>
          <p className="section-note">
            Six files reconstruct what changed, which source supports it and what remains unproven before an old brand is treated as active again.
          </p>
        </div>

        <div className="audit-case-index-grid">
          {operationalCaseFiles.map(({ caseFile, firm }) => (
            <Link href={`/firm/${firm.slug}#case-timeline`} className="audit-case-index-card" key={firm.slug}>
              <div className="audit-case-index-card-top">
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                <span>{caseFile.status}</span>
              </div>
              <strong>{firm.name}</strong>
              <h3>{caseFile.question}</h3>
              <p>{caseFile.answer}</p>
              <div>
                <span><b>{caseFile.events.length}</b> dated events</span>
                <span><b>{caseFile.sources.length}</b> sources</span>
                <time dateTime={caseFile.lastChecked}>Checked {caseFile.lastChecked}</time>
              </div>
            </Link>
          ))}
        </div>

        <div className="audit-case-brief-link">
          <div>
            <span>Latest editorial synthesis</span>
            <strong>{latestEditorialBrief.shortTitle}</strong>
            <p>{latestEditorialBrief.dek}</p>
          </div>
          <Link href={getEditorialBriefPath(latestEditorialBrief)} className="btn btn-primary">Read the sourced brief</Link>
        </div>
      </section>

      <section className="section audit-grid">
        <article className="panel">
          <div className="eyebrow">Coverage</div>
          <h2>What is already sourced</h2>
          <ul className="pr-coverage">
            {[
              { label: 'Official website or primary source', value: officialCovered.length },
              { label: 'Trustpilot page identified', value: trustpilotCovered.length },
              { label: 'Legal entity mapped', value: legalVerifiedFirms.length },
              { label: 'Exact-name press / news search logged', value: articleNewsCheckedFirms.length },
              { label: 'Tracked payout incidents', value: propFirms.filter((firm) => firm.incidents > 0).length },
            ].map((item) => (
              <li key={item.label}>
                <span className="pr-coverage-label">{item.label}</span>
                <span className="pr-coverage-track" aria-hidden="true"><span style={{ width: `${Math.round((item.value / propFirms.length) * 100)}%` }} /></span>
                <strong>{item.value}<small>/{propFirms.length}</small></strong>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <div className="eyebrow">Priority</div>
          <h2>Next profiles to investigate</h2>
          <ul className="audit-priority-list">
            {priorityAudit.map((firm) => (
              <li key={firm.slug}>
                <Link href={`/firm/${firm.slug}`} className="signal-firm-link">
                  <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                  <span>{firm.name}</span>
                </Link>
                <span className={`badge ${auditStatusClass(firm.auditStatus)}`}>{toEnglishText(firm.auditStatus)}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="section audit-grid audit-legal-grid">
        <article className="panel">
          <div className="eyebrow">Legal Priority</div>
          <h2>Highest legal files to read first</h2>
          <ul className="audit-priority-list">
            {legalWatchFirms.slice(0, 10).map((firm) => (
              <li key={firm.slug}>
                <Link href={`/firm/${firm.slug}#regulatory`} className="signal-firm-link">
                  <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
                  <span>{firm.name}</span>
                </Link>
                <span className={`badge ${regulatoryRiskClass(firm.regulatoryAudit.riskLevel)}`}>{firm.regulatoryAudit.riskLevel}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel audit-legal-method-panel">
          <div className="eyebrow">Legal Reading Order</div>
          <h2>How PropRadar reads a firm file</h2>
          <div className="legal-method-grid">
            <div>
              <span>01</span>
              <strong>Entity</strong>
              <small>Brand name, operating company, address, jurisdiction and registration number.</small>
            </div>
            <div>
              <span>02</span>
              <strong>Regulator</strong>
              <small>Broker status, simulated-trading disclaimer, warning lists and company registers.</small>
            </div>
            <div>
              <span>03</span>
              <strong>Terms</strong>
              <small>Refunds, chargebacks, payout forfeiture, arbitration, restricted countries and KYC.</small>
            </div>
            <div>
              <span>04</span>
              <strong>External checks</strong>
              <small>Independent press, regulator pages, closure notices, lawsuits and exact-name searches.</small>
            </div>
          </div>
        </article>
      </section>

      <section className="section">
        <div className="panel audit-list-panel">
          <div className="panel-title-row">
            <div>
              <div className="eyebrow">Full Base</div>
              <h2>{propFirms.length} profiles, visible proof level</h2>
            </div>
            <span>Latest review <time dateTime={latestReviewDate(propFirms)}>{latestReviewDate(propFirms)}</time></span>
          </div>

          <div className="pr-firm-table" role="table" aria-label={`${propFirms.length} prop firm profiles with their proof level`}>
            <FirmTableHead />
            {propFirms.slice(0, 40).map((firm) => (
              <FirmRow
                key={firm.slug}
                firm={firm}
                subline={`${toEnglishText(firm.auditStatus)} · ${firm.legalVerified ? 'Entity mapped' : 'Entity missing'} · ${legalSourceCount(firm)} legal/source link(s)`}
              />
            ))}
          </div>
          {propFirms.length > 40 ? (
            <details className="pr-disclosure">
              <summary>Show the other {propFirms.length - 40} profiles</summary>
              <div className="pr-firm-table" role="table" aria-label="Other prop firm profiles">
                {propFirms.slice(40).map((firm) => (
                  <FirmRow
                    key={firm.slug}
                    firm={firm}
                    subline={`${toEnglishText(firm.auditStatus)} · ${firm.legalVerified ? 'Entity mapped' : 'Entity missing'} · ${legalSourceCount(firm)} legal/source link(s)`}
                  />
                ))}
              </div>
            </details>
          ) : null}
        </div>
      </section>
    </main>
  );
}
