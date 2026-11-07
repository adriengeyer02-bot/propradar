import Link from 'next/link';
import FirmLogo from './FirmLogo';
import { formatUsd, isProvisional, propFirms, type Product, type PropFirm } from '../lib/propFirms';

/**
 * A live data block for an English guide: programs (or payout terms) read from
 * the PropRadar firm files, so the guide shows the same sourced numbers as the
 * firm pages and updates with every review. Nothing here is estimated:
 * - program rows need a split and account sizes read on a source and a listed
 *   entry fee (the same rule as /prop-firm-challenge);
 * - payout rows need a stated payout timing (not "variable" / "to verify").
 * Closed firms and firms with a domain warning are left out.
 */

export type GuideDataKind = 'futures' | 'instant' | 'payout';

const MAX_ROWS = 25;

type ProgramRow = { firm: PropFirm; product: Product };

const openFirms = propFirms.filter((firm) => firm.status !== 'Fermée' && !firm.listedDomainWarning);

function programRows(type: Product['type']): ProgramRow[] {
  return openFirms
    .filter((firm) => !isProvisional(firm, 'profitSplit') && !isProvisional(firm, 'accountSize'))
    .flatMap((firm) => firm.products.map((product) => ({ firm, product })))
    .filter(({ product }) => product.type === type && (product.entryFeeMin ?? 0) > 0)
    .sort((a, b) => b.firm.score - a.firm.score || (a.product.entryFeeMin as number) - (b.product.entryFeeMin as number));
}

const UNSTATED = /^(?:|-|n\/a|unknown|to verify|not stated.*|variable.*|varies.*|path-.*|depends.*)$/i;

function payoutRows(): PropFirm[] {
  return openFirms
    .filter((firm) => !UNSTATED.test((firm.payoutDelay ?? '').trim()))
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
}

function size(n: number) {
  return n >= 1_000_000 ? `$${+(n / 1_000_000).toFixed(1)}M` : n >= 1000 ? `$${Math.round(n / 1000)}K` : `$${n}`;
}

function accounts(product: Product) {
  if (!product.accountSizeMin && !product.accountSizeMax) return 'not stated';
  return product.accountSizeMin === product.accountSizeMax ? size(product.accountSizeMin) : `${size(product.accountSizeMin)}–${size(product.accountSizeMax)}`;
}

function programName(firm: PropFirm, product: Product) {
  const name = product.name.startsWith(`${firm.name} `) ? product.name.slice(firm.name.length + 1) : product.name;
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function cell(value?: string) {
  const text = (value ?? '').trim();
  return text && !/^(variable|varies|program-specific|account-specific|depends on the selected plan|specific futures rules|futures-specific)/i.test(text) ? text : <span className="pr-muted">See the firm page</span>;
}

function FirmCell({ firm, sub }: { firm: PropFirm; sub?: string }) {
  return (
    <Link href={`/firm/${firm.slug}`} className="pr-challenge-firm">
      <FirmLogo name={firm.name} logoDomain={firm.logoDomain} size="sm" />
      <span>
        <strong>{firm.name}</strong>
        <small>
          {sub}
          {firm.status === 'À surveiller' ? <em className="pr-challenge-watch">watchlist</em> : null}
        </small>
      </span>
    </Link>
  );
}

const COPY: Record<GuideDataKind, { eyebrow: string; title: string; note: string }> = {
  futures: {
    eyebrow: 'From the PropRadar firm files',
    title: 'Futures evaluations compared: fees, accounts and loss limits',
    note: 'Programs whose split and account sizes were read on an official page. Fees are list prices before temporary codes; most futures evaluations are billed monthly.',
  },
  instant: {
    eyebrow: 'From the PropRadar firm files',
    title: 'Instant funding programs compared: fees, accounts and loss limits',
    note: 'Programs with no evaluation phase whose split and account sizes were read on an official page. Fees are list prices before temporary codes.',
  },
  payout: {
    eyebrow: 'From the PropRadar firm files',
    title: 'Stated payout timing, firm by firm',
    note: 'What each firm states about payout frequency and processing, as recorded in its file. A stated timing is a promise, not a measured result: check payout evidence on the firm page.',
  },
};

export default function GuideDataTable({ kind }: { kind: GuideDataKind }) {
  const copy = COPY[kind];
  const programs = kind === 'payout' ? [] : programRows(kind === 'futures' ? 'Futures evaluation' : 'Instant funding');
  const payouts = kind === 'payout' ? payoutRows() : [];
  const total = kind === 'payout' ? payouts.length : programs.length;
  if (!total) return null;

  const fees = programs.map((row) => row.product.entryFeeMin as number).sort((a, b) => a - b);
  const median = fees.length ? fees[Math.floor(fees.length / 2)] : 0;
  const firmCount = kind === 'payout' ? payouts.length : new Set(programs.map((row) => row.firm.slug)).size;
  const checked = (kind === 'payout' ? payouts : programs.map((row) => row.firm)).reduce((latest, firm) => (firm.lastReviewed > latest ? firm.lastReviewed : latest), '');
  const shownPrograms = programs.slice(0, MAX_ROWS);
  const shownPayouts = payouts.slice(0, MAX_ROWS);
  const shown = kind === 'payout' ? shownPayouts.length : shownPrograms.length;

  return (
    <section className="section guide-query-evidence" id="data" aria-labelledby="guide-data-title">
      <div className="section-heading">
        <div>
          <div className="eyebrow">{copy.eyebrow}</div>
          <h2 id="guide-data-title">{copy.title}</h2>
        </div>
        <p className="section-note">{copy.note}</p>
      </div>

      <dl className="pr-challenge-facts">
        {kind === 'payout' ? (
          <>
            <div><dt>Firms with a stated timing</dt><dd>{payouts.length}</dd></div>
            <div><dt>Latest firm review</dt><dd>{checked || '—'}</dd></div>
          </>
        ) : (
          <>
            <div><dt>Programs</dt><dd>{programs.length}</dd></div>
            <div><dt>Firms</dt><dd>{firmCount}</dd></div>
            <div><dt>Lowest listed fee</dt><dd>{fees.length ? formatUsd(fees[0]) : '—'}</dd></div>
            <div><dt>Median listed fee</dt><dd>{median ? formatUsd(median) : '—'}</dd></div>
          </>
        )}
      </dl>

      <div className="guide-rule-table-wrap">
        {kind === 'payout' ? (
          <table className="guide-rule-table pr-challenge-table">
            <caption className="sr-only">{copy.title}</caption>
            <thead>
              <tr>
                <th scope="col">Firm</th>
                <th scope="col">Stated payout timing</th>
                <th scope="col">Split</th>
                <th scope="col">PropRadar score</th>
                <th scope="col">Checked</th>
              </tr>
            </thead>
            <tbody>
              {shownPayouts.map((firm) => (
                <tr key={firm.slug}>
                  <th scope="row"><FirmCell firm={firm} /></th>
                  <td>{firm.payoutDelay}</td>
                  <td className="pr-num">{isProvisional(firm, 'profitSplit') || !firm.profitSplit ? <span className="pr-muted">To verify</span> : `${firm.profitSplit}%`}</td>
                  <td className="pr-num">{firm.score}</td>
                  <td><time dateTime={firm.lastReviewed}>{firm.lastReviewed}</time></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="guide-rule-table pr-challenge-table">
            <caption className="sr-only">{copy.title}</caption>
            <thead>
              <tr>
                <th scope="col">Firm / program</th>
                <th scope="col">Fee from</th>
                <th scope="col">Accounts</th>
                <th scope="col">Target</th>
                <th scope="col">Daily loss</th>
                <th scope="col">Max loss</th>
                <th scope="col">Checked</th>
              </tr>
            </thead>
            <tbody>
              {shownPrograms.map(({ firm, product }) => (
                <tr key={`${firm.slug}-${product.id}`}>
                  <th scope="row"><FirmCell firm={firm} sub={programName(firm, product)} /></th>
                  <td className="pr-num">{formatUsd(product.entryFeeMin as number)}</td>
                  <td className="pr-nowrap">{accounts(product)}</td>
                  <td>{cell(product.profitTarget)}</td>
                  <td>{cell(product.maxDailyLoss)}</td>
                  <td>{cell(product.maxDrawdown)}</td>
                  <td><time dateTime={firm.lastReviewed}>{firm.lastReviewed}</time></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <p className="pr-table-more">
        {shown < total ? `Showing the ${shown} highest-scored of ${total}. ` : null}
        {kind === 'payout' ? (
          <Link className="pr-link" href="/prop-firm-payout-risk">Payout evidence and risk levels <span aria-hidden="true">→</span></Link>
        ) : (
          <Link className="pr-link" href="/prop-firm-challenge">All {kind === 'futures' ? 'futures' : 'instant funding'} programs on the challenge page <span aria-hidden="true">→</span></Link>
        )}
      </p>
    </section>
  );
}
