'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import FirmLogo from '../FirmLogo';
import type { ChallengeDrawdown, ChallengeMarket, ChallengeOffer } from '../../lib/challengeCatalog';
import { BUDGETS, CAPITALS, DRAWDOWNS, EMPTY, MARKETS, PAGE, PRIORITIES, STEPS, byReliability, fill, matches, money, priority, shownPrice, size, sortOffers, toggle, type Filters, type Priority, type Sort } from '../../lib/challengeFilters';
import type { ChallengeExplorerCopy } from '../../lib/challengeExplorerI18n';
import { localePath, type Locale } from '../../lib/locales';
import styles from './ChallengeExplorer.module.css';

/**
 * Challenge explorer (Geyer, 2026-11-28): quick filters, programme cards,
 * a three-way comparison and the "Find my challenge" path. Ordering uses only
 * documented values (firm reliability score, programme flexibility stars,
 * verified price, capital); affiliation is shown as a disclosure and never
 * used to rank or filter.
 */

function Stars({ value, label }: { value: number; label: string }) {
  return (
    <span className={styles.stars} role="img" aria-label={label}>
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} className={styles.star} aria-hidden="true">
          <span>☆</span>
          <span className={styles.starFill} style={{ width: `${Math.max(0, Math.min(1, value - i)) * 100}%` }}>★</span>
        </span>
      ))}
    </span>
  );
}

function toneOf(score: number) {
  return score >= 75 ? styles.good : score >= 60 ? styles.watch : styles.risk;
}

export default function ChallengeExplorer({
  locale,
  copy: c,
  offers,
  typeLabels,
}: {
  locale: Locale;
  copy: ChallengeExplorerCopy;
  offers: ChallengeOffer[];
  typeLabels: Record<string, string>;
}) {
  const [filters, setFilters] = useState<Filters>(EMPTY);
  const [sort, setSort] = useState<Sort>('reliability');
  const [visible, setVisible] = useState(PAGE);
  const [compare, setCompare] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [finderOpen, setFinderOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const L = (path: string) => localePath(locale, path);
  const number = (n: number) => new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(n);
  const date = (iso: string) => {
    try {
      return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${iso}T12:00:00Z`));
    } catch {
      return iso;
    }
  };

  // Promotions can expire between two deployments: hide them in the browser too.
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => setNow(Date.now()), []);
  const livePromos = (offer: ChallengeOffer) =>
    now === null ? offer.promos : offer.promos.filter((p) => (p.expiresAt ? now < Date.parse(p.expiresAt) : !p.endsOn || now < Date.parse(`${p.endsOn}T23:59:59Z`)));

  const filtered = useMemo(() => sortOffers(offers.filter((o) => matches(o, filters)), sort, filters.capital), [offers, filters, sort]);
  const shown = filtered.slice(0, visible);
  const activeCount =
    (filters.budget ? 1 : 0) + (filters.capital ? 1 : 0) + filters.markets.length + filters.steps.length + filters.drawdown.length + (filters.noCons ? 1 : 0) + (filters.payout ? 1 : 0) + (filters.flex ? 1 : 0);

  useEffect(() => setVisible(PAGE), [filters, sort]);

  // Deep links: ?compare=slug:id,slug:id and #find-my-challenge
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const keys = (params.get('compare') ?? '').split(',').filter((key) => offers.some((o) => o.key === key)).slice(0, 3);
      if (keys.length) setCompare(keys);
    } catch {
      /* no URL support: keep defaults */
    }
  }, [offers]);

  // "#find-my-challenge" (hero button, shared links) opens the finder and brings it into view.
  useEffect(() => {
    const open = () => {
      if (window.location.hash !== '#find-my-challenge') return;
      setFinderOpen(true);
      window.setTimeout(() => document.getElementById('find-my-challenge')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
    };
    open();
    window.addEventListener('hashchange', open);
    return () => window.removeEventListener('hashchange', open);
  }, []);

  function set<K extends keyof Filters>(key: K, value: Filters[K]) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  function toggleCompare(key: string) {
    setCompare((current) => {
      if (current.includes(key)) return current.filter((k) => k !== key);
      if (current.length >= 3) {
        setNotice(c.compareMax);
        window.setTimeout(() => setNotice(''), 3500);
        return current;
      }
      return [...current, key];
    });
  }

  const compared = compare.map((key) => offers.find((o) => o.key === key)).filter((o): o is ChallengeOffer => Boolean(o));

  function payoutLabel(offer: ChallengeOffer) {
    if (offer.payoutDays === null) return c.notDocumented;
    const base = offer.payoutDays === 1 ? c.payoutDaily : fill(c.payoutEvery, { n: offer.payoutDays });
    return offer.payoutScope === 'firm' ? `${base} (${c.firmLevel})` : base;
  }
  function stepsLabel(offer: ChallengeOffer) {
    return offer.steps === null ? typeLabels[offer.type] ?? offer.type : [c.s0, c.s1, c.s2, c.s3][offer.steps];
  }
  function drawdownLabel(offer: ChallengeOffer) {
    if (!offer.drawdown) return c.notDocumented;
    const label = { Static: c.ddStatic, EOD: c.ddEod, Trailing: c.ddTrailing, Hybride: c.ddHybrid }[offer.drawdown];
    return offer.drawdownVerified ? label : `${label} (${c.fromText})`;
  }
  function splitLabel(offer: ChallengeOffer) {
    if (offer.split === null) return c.notDocumented;
    return offer.splitUpTo ? fill(c.upToSplit, { n: offer.split }) : `${offer.split}%`;
  }
  function capitalLabel(offer: ChallengeOffer) {
    if (offer.sizeMin === null) return c.notDocumented;
    return offer.sizeMin === offer.sizeMax ? size(offer.sizeMin) : `${size(offer.sizeMin)}–${size(offer.sizeMax ?? offer.sizeMin)}`;
  }

  function priceBlock(offer: ChallengeOffer, compact = false, capital: number | null = filters.capital) {
    const price = shownPrice(offer, capital);
    if (price) {
      return (
        <div className={styles.price}>
          <span className={styles.priceLabel}>{capital ? fill(c.priceAt, { size: size(price.size) }) : c.priceFrom}</span>
          <strong>
            {money(price.price, price.currency)}
            {price.billing === 'monthly' ? <small>{c.perMonth}</small> : null}
          </strong>
          {!capital ? <span className={styles.priceSize}>{size(price.size)}</span> : null}
          {price.upfront != null && price.completion != null ? (
            <small className={styles.priceNote}>{fill(c.priceSplit, { upfront: money(price.upfront, price.currency), fee: money(price.completion, price.currency) })}</small>
          ) : null}
          {!compact && offer.priceCheckedOn ? (
            <small className={styles.verified}>
              ✓ {offer.priceSource ? <a href={offer.priceSource} target="_blank" rel="noopener noreferrer">{fill(c.priceVerified, { date: date(offer.priceCheckedOn) })}</a> : fill(c.priceVerified, { date: date(offer.priceCheckedOn) })}
            </small>
          ) : null}
        </div>
      );
    }
    if (offer.listedFrom !== null && !capital) {
      return (
        <div className={styles.price}>
          <span className={styles.priceLabel}>{c.priceFrom}</span>
          <strong className={styles.priceListed}>${offer.listedFrom.toLocaleString('en-US')}</strong>
          <small className={styles.unverified}>{c.priceListed}</small>
        </div>
      );
    }
    return (
      <div className={styles.price}>
        <strong className={styles.priceUnknown}>{c.priceUnknown}</strong>
      </div>
    );
  }

  function ratings(offer: ChallengeOffer) {
    return (
      <div className={styles.ratings}>
        <div className={styles.rating}>
          <span>{c.flexLabel}</span>
          {offer.stars !== null ? (
            <span className={styles.ratingValue}>
              <Stars value={offer.stars} label={`${number(offer.stars)}/5`} />
              <strong>{number(offer.stars)}/5</strong>
            </span>
          ) : (
            <span className={styles.ratingMuted}>{c.flexUnrated}{offer.starsVerified ? ` · ${fill(c.flexAxes, { n: offer.starsVerified })}` : ''}</span>
          )}
        </div>
        <div className={styles.rating}>
          <span>{c.reliabilityLabel}</span>
          <strong className={`${styles.score} ${toneOf(offer.reliability)}`}>{offer.reliability}<small>/100</small></strong>
        </div>
      </div>
    );
  }

  function alerts(offer: ChallengeOffer) {
    if (offer.domainWarning) return <p className={`${styles.alert} ${styles.alertRisk}`} role="note">⚠ {c.domainWarning}</p>;
    if (!offer.alertCount) return null;
    return (
      <div className={styles.alert} role="note">
        <strong>⚠ {offer.alertCount === 1 ? c.alertsOne : fill(c.alertsMany, { n: offer.alertCount })}</strong>
        {offer.alerts.length ? <span>{offer.alerts.join(' · ')}</span> : null}
        <Link href={`${L(`/firm/${offer.slug}`)}#red-flags-${offer.slug}`}>{c.alertsLink} →</Link>
      </div>
    );
  }

  function promos(offer: ChallengeOffer) {
    const list = livePromos(offer);
    if (!list.length) return null;
    return (
      <div className={styles.promos}>
        {list.slice(0, 2).map((promo) => {
          const pair = promo.examples[0];
          return (
            <div className={styles.promo} key={promo.id}>
              <div className={styles.promoLine}>
                <span className={styles.promoBadge}>{c.promo}</span>
                {pair ? (
                  <span className={styles.promoPrice}>
                    {size(pair.size)} <s>{money(pair.regular, pair.currency)}</s> <strong>{money(pair.sale, pair.currency)}</strong>
                  </span>
                ) : (
                  <span className={styles.promoText} lang="en">{promo.offer}</span>
                )}
                {promo.code ? <span className={styles.promoCode}>{c.promoCode} <code>{promo.code}</code></span> : null}
              </div>
              <details className={styles.promoTerms}>
                <summary>{c.promoTerms}</summary>
                <p lang="en">{promo.terms}</p>
                <small>
                  {fill(c.promoChecked, { date: date(promo.checkedOn) })}
                  {promo.endsOn ? ` · ${fill(c.promoEnds, { date: date(promo.endsOn) })}` : ''} ·{' '}
                  <a href={promo.sourceUrl} target="_blank" rel="noopener noreferrer">{c.promoSource} ↗</a>
                </small>
              </details>
            </div>
          );
        })}
      </div>
    );
  }

  function offerButton(offer: ChallengeOffer) {
    if (!offer.offerUrl) return null;
    return (
      <a className={styles.cta} href={offer.offerUrl} target="_blank" rel={offer.affiliate ? 'noopener noreferrer sponsored' : 'noopener noreferrer'}>
        {c.offer} <span aria-hidden="true">↗</span>
        {offer.affiliate ? <small>{c.affiliate}</small> : null}
      </a>
    );
  }

  function card(offer: ChallengeOffer, capital: number | null = filters.capital) {
    const inCompare = compare.includes(offer.key);
    return (
      <article className={styles.card} aria-labelledby={`ch-${offer.key}`}>
        <header className={styles.cardHead}>
          <FirmLogo name={offer.firm} logoDomain={offer.logoDomain} size="sm" />
          <div>
            <h3 id={`ch-${offer.key}`}>
              <span>{offer.firm}</span> {offer.name}
            </h3>
            <div className={styles.tags}>
              <span className={styles.tag}>{stepsLabel(offer)}</span>
              {offer.markets.map((m) => (
                <span key={m} className={styles.tagSoft}>{{ forex: c.mForex, futures: c.mFutures, crypto: c.mCrypto, stocks: c.mStocks }[m]}</span>
              ))}
              {offer.status === 'À surveiller' ? <span className={`${styles.tag} ${styles.tagWatch}`}>{c.watch}</span> : null}
            </div>
          </div>
        </header>

        {ratings(offer)}
        {priceBlock(offer, false, capital)}
        {promos(offer)}

        <dl className={styles.facts}>
          <div><dt>{c.fCapital}</dt><dd>{capitalLabel(offer)}</dd></div>
          <div><dt>{c.fTarget}</dt><dd>{offer.target || c.notDocumented}</dd></div>
          <div><dt>{c.fMax}</dt><dd>{offer.maxLoss || c.notDocumented}</dd></div>
          <div><dt>{c.fDrawdown}</dt><dd>{drawdownLabel(offer)}</dd></div>
          <div><dt>{c.fConsistency}</dt><dd className={offer.consistency ? styles.ruleOn : undefined}>{offer.consistency ? c.yesRule : c.noRule}</dd></div>
          <div><dt>{c.fPayout}</dt><dd>{payoutLabel(offer)}</dd></div>
          <div><dt>{c.fSplit}</dt><dd>{splitLabel(offer)}</dd></div>
        </dl>

        {alerts(offer)}

        <div className={styles.actions}>
          {offerButton(offer)}
          <div className={styles.secondary}>
            <Link href={`${L(`/firm/${offer.slug}`)}#produits`}>{c.fullFile} →</Link>
            <label className={`${styles.compareToggle}${inCompare ? ` ${styles.isOn}` : ''}`}>
              <input type="checkbox" checked={inCompare} onChange={() => toggleCompare(offer.key)} />
              <span>{inCompare ? c.compared : c.compare}</span>
            </label>
          </div>
        </div>
      </article>
    );
  }

  function chip(key: string | number, on: boolean, onClick: () => void, children: React.ReactNode) {
    return (
      <button key={key} type="button" className={`${styles.chip}${on ? ` ${styles.chipOn}` : ''}`} aria-pressed={on} onClick={onClick}>
        {children}
      </button>
    );
  }

  const groups = (
    <>
      <fieldset className={styles.group}>
        <legend>{c.gBudget}</legend>
        <div className={styles.chips}>
          {BUDGETS.map((n) => chip(n, filters.budget === n, () => set('budget', filters.budget === n ? null : n), fill(c.upTo, { amount: n.toLocaleString('en-US') })))}
        </div>
        {filters.budget ? <small className={styles.groupNote}>{c.budgetNote}</small> : null}
      </fieldset>
      <fieldset className={styles.group}>
        <legend>{c.gCapital}</legend>
        <div className={styles.chips}>
          {CAPITALS.map((n) => chip(n, filters.capital === n, () => set('capital', filters.capital === n ? null : n), size(n)))}
        </div>
      </fieldset>
      <fieldset className={styles.group}>
        <legend>{c.gMarket}</legend>
        <div className={styles.chips}>
          {MARKETS.map((m) => chip(m, filters.markets.includes(m), () => set('markets', toggle(filters.markets, m)), { forex: c.mForex, futures: c.mFutures, crypto: c.mCrypto, stocks: c.mStocks }[m]))}
        </div>
      </fieldset>
      <fieldset className={styles.group}>
        <legend>{c.gSteps}</legend>
        <div className={styles.chips}>
          {STEPS.map((s) => chip(s, filters.steps.includes(s), () => set('steps', toggle(filters.steps, s)), [c.s0, c.s1, c.s2, c.s3][s]))}
        </div>
      </fieldset>
      <fieldset className={styles.group}>
        <legend>{c.gDrawdown}</legend>
        <div className={styles.chips}>
          {DRAWDOWNS.map((d) => chip(d, filters.drawdown.includes(d), () => set('drawdown', toggle(filters.drawdown, d)), { Static: c.ddStatic, EOD: c.ddEod, Trailing: c.ddTrailing, Hybride: c.ddHybrid }[d]))}
        </div>
      </fieldset>
      <fieldset className={styles.group}>
        <legend>{c.gConsistency}</legend>
        <div className={styles.chips}>
          {chip('one', filters.noCons, () => set('noCons', !filters.noCons), c.noConsistency)}
        </div>
      </fieldset>
      <fieldset className={styles.group}>
        <legend>{c.gPayout}</legend>
        <div className={styles.chips}>
          {([1, 7, 14] as const).map((p) => chip(p, filters.payout === p, () => set('payout', filters.payout === p ? null : p), p === 1 ? c.pDaily : p === 7 ? c.pWeekly : c.pBiweekly))}
        </div>
      </fieldset>
      <fieldset className={styles.group}>
        <legend>{c.gFlex}</legend>
        <div className={styles.chips}>
          {(['3', '4', 'rated'] as const).map((v) => chip(v, filters.flex === v, () => set('flex', filters.flex === v ? null : v), v === '3' ? c.flex3 : v === '4' ? c.flex4 : c.flexRated))}
        </div>
      </fieldset>
    </>
  );

  return (
    <div className={styles.explorer}>
      <div className={styles.topActions}>
        <button type="button" className={styles.finderButton} onClick={() => setFinderOpen((open) => !open)} aria-expanded={finderOpen} aria-controls="find-my-challenge">
          <span aria-hidden="true">◎</span> {c.finderCta}
        </button>
        <p className={styles.ratingNote}>{c.ratingNote}</p>
      </div>

      {finderOpen ? (
        <Finder
          copy={c}
          offers={offers}
          onClose={() => setFinderOpen(false)}
          onApply={(next, nextSort) => {
            setFilters(next);
            setSort(nextSort);
            setFinderOpen(false);
            window.setTimeout(() => listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
          }}
          renderCard={(offer, capital) => card(offer, capital)}
        />
      ) : null}

      <div className={styles.toolbar}>
        <button type="button" className={styles.filtersToggle} onClick={() => setFiltersOpen((open) => !open)} aria-expanded={filtersOpen} aria-controls="challenge-filters">
          {c.filters}{activeCount ? <b>{activeCount}</b> : null}
        </button>
        <div className={`${styles.groups}${filtersOpen ? ` ${styles.groupsOpen}` : ''}`} id="challenge-filters">{groups}</div>
      </div>

      <div className={styles.meta} ref={listRef} aria-live="polite">
        <strong>{filtered.length === 1 ? c.resultOne : fill(c.results, { n: filtered.length })}</strong>
        {activeCount ? <button type="button" className={styles.linkButton} onClick={() => setFilters(EMPTY)}>{c.reset}</button> : null}
        <label className={styles.sort}>
          <span>{c.sortLabel}</span>
          <select value={sort} onChange={(event) => setSort(event.target.value as Sort)}>
            <option value="reliability">{c.sortReliability}</option>
            <option value="flex">{c.sortFlex}</option>
            <option value="price">{c.sortPrice}</option>
            <option value="capital">{c.sortCapital}</option>
          </select>
        </label>
      </div>

      {filtered.length ? (
        <div className={styles.grid}>
          {shown.map((offer) => <div key={offer.key} className={styles.cell}>{card(offer)}</div>)}
        </div>
      ) : (
        <div className={styles.empty}>
          <strong>{c.empty}</strong>
          <span>{c.emptyHint}</span>
          <button type="button" className={styles.linkButton} onClick={() => setFilters(EMPTY)}>{c.reset}</button>
        </div>
      )}
      {filtered.length > visible ? (
        <div className={styles.more}>
          <button type="button" onClick={() => setVisible((n) => n + PAGE)}>{fill(c.showMore, { n: Math.min(PAGE, filtered.length - visible) })}</button>
        </div>
      ) : null}
      <p className={styles.method}>{c.method} {c.affiliateNote}</p>

      {notice ? <div className={styles.toast} role="status">{notice}</div> : null}

      {compared.length ? (
        <div className={styles.tray} role="region" aria-label={c.trayTitle}>
          <div className={styles.trayItems}>
            {compared.map((offer) => (
              <span key={offer.key} className={styles.trayItem}>
                <FirmLogo name={offer.firm} logoDomain={offer.logoDomain} size="sm" />
                <span className={styles.trayName}>{offer.firm}</span>
                <button type="button" onClick={() => toggleCompare(offer.key)} aria-label={fill(c.remove, { name: `${offer.firm} ${offer.name}` })}>×</button>
              </span>
            ))}
          </div>
          <div className={styles.trayActions}>
            <button type="button" className={styles.linkButton} onClick={() => setCompare([])}>{c.trayClear}</button>
            <button type="button" className={styles.trayOpen} onClick={() => setCompareOpen(true)} disabled={compared.length < 2}>{fill(c.trayOpen, { n: compared.length })}</button>
          </div>
        </div>
      ) : null}

      {compareOpen && compared.length ? (
        <CompareDialog
          copy={c}
          offers={compared}
          onClose={() => setCompareOpen(false)}
          onRemove={(key) => toggleCompare(key)}
          rows={[
            { label: `${c.flexLabel} · ${c.reliabilityLabel}`, value: (o) => ratings(o) },
            { label: c.fType, value: (o) => stepsLabel(o) },
            { label: c.fCapital, value: (o) => capitalLabel(o) },
            { label: c.lowest, value: (o) => priceBlock(o, true) },
            { label: c.rowPromo, value: (o) => (livePromos(o).length ? promos(o) : c.none) },
            { label: c.fTarget, value: (o) => o.target || c.notDocumented },
            { label: c.fDaily, value: (o) => o.dailyLoss || c.notDocumented },
            { label: c.fMax, value: (o) => o.maxLoss || c.notDocumented },
            { label: c.fDrawdown, value: (o) => drawdownLabel(o) },
            { label: c.fConsistency, value: (o) => (o.consistency ? `${c.yesRule}${o.consistencyText ? ` — ${o.consistencyText}` : ''}` : c.noRule) },
            { label: c.fPayout, value: (o) => payoutLabel(o) },
            { label: c.fSplit, value: (o) => splitLabel(o) },
            { label: c.fPlatforms, value: (o) => (o.platforms.length ? o.platforms.join(' · ') : c.notDocumented) },
            { label: c.rowAlerts, value: (o) => (o.domainWarning || o.alertCount ? alerts(o) : c.none) },
            { label: c.lastReviewed, value: (o) => date(o.lastReviewed) },
            { label: '', value: (o) => <div className={styles.compareCta}>{offerButton(o)}<Link href={`${L(`/firm/${o.slug}`)}#produits`}>{c.fullFile} →</Link></div> },
          ]}
        />
      ) : null}
    </div>
  );
}

function CompareDialog({
  copy: c,
  offers,
  rows,
  onClose,
  onRemove,
}: {
  copy: ChallengeExplorerCopy;
  offers: ChallengeOffer[];
  rows: { label: string; value: (offer: ChallengeOffer) => React.ReactNode }[];
  onClose: () => void;
  onRemove: (key: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const opener = document.activeElement as HTMLElement | null;
    ref.current?.querySelector<HTMLElement>('button')?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
      opener?.focus();
    };
  }, [onClose]);
  return (
    <div className={styles.dialogBackdrop} onClick={onClose}>
      <div className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="challenge-compare-title" ref={ref} onClick={(event) => event.stopPropagation()}>
        <div className={styles.dialogHead}>
          <h2 id="challenge-compare-title">{c.compareTitle}</h2>
          <button type="button" className={styles.close} onClick={onClose} aria-label={c.close}>×</button>
        </div>
        <p className={styles.ratingNote}>{c.ratingNote}</p>
        <div className={styles.compareScroll}>
          <table className={styles.compareTable}>
            <thead>
              <tr>
                <th scope="col"><span className="sr-only">{c.trayTitle}</span></th>
                {offers.map((offer) => (
                  <th scope="col" key={offer.key}>
                    <div className={styles.compareHead}>
                      <FirmLogo name={offer.firm} logoDomain={offer.logoDomain} size="sm" />
                      <span className={styles.compareName}><strong>{offer.firm}</strong><small>{offer.name}</small></span>
                      <button type="button" onClick={() => onRemove(offer.key)} aria-label={fill(c.remove, { name: `${offer.firm} ${offer.name}` })}>×</button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.label || index}>
                  <th scope="row">{row.label}</th>
                  {offers.map((offer) => <td key={offer.key}>{row.value(offer)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Finder({
  copy: c,
  offers,
  onClose,
  onApply,
  renderCard,
}: {
  copy: ChallengeExplorerCopy;
  offers: ChallengeOffer[];
  onClose: () => void;
  onApply: (filters: Filters, sort: Sort) => void;
  renderCard: (offer: ChallengeOffer, capital: number | null) => React.ReactNode;
}) {
  const [step, setStep] = useState(0);
  const [market, setMarket] = useState<ChallengeMarket | null>(null);
  const [capital, setCapital] = useState<number | null>(null);
  const [budget, setBudget] = useState<number | null>(null);
  const [steps, setSteps] = useState<number | null>(null);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const total = 5;
  const done = step >= total;
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => headingRef.current?.focus(), [step]);

  const base: Filters = { ...EMPTY, markets: market ? [market] : [], capital, budget, steps: steps === null ? [] : [steps] };
  const results = useMemo(() => {
    if (!done) return [];
    return offers
      .filter((offer) => matches(offer, base))
      .map((offer) => {
        const checks = priorities.map((p) => priority(offer, p));
        return { offer, met: checks.filter((x) => x === true).length, unknown: checks.filter((x) => x === null).length, checks };
      })
      .sort((a, b) => b.met - a.met || a.unknown - b.unknown || byReliability(a.offer, b.offer));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, offers, market, capital, budget, steps, priorities]);

  const prLabel: Record<Priority, string> = { drawdown: c.prDrawdown, noCons: c.prNoCons, payout: c.prPayout, flex: c.prFlex, reliable: c.prReliable };
  const question = [c.q1, c.q2, c.q3, c.q4, c.q5][Math.min(step, 4)];

  function option(key: string | number, on: boolean, pick: () => void, label: React.ReactNode) {
    return (
      <button key={key} type="button" className={`${styles.option}${on ? ` ${styles.optionOn}` : ''}`} aria-pressed={on} onClick={() => { pick(); setStep((s) => s + 1); }}>
        {label}
      </button>
    );
  }

  function apply() {
    const next: Filters = { ...base };
    if (priorities.includes('drawdown')) next.drawdown = ['Static', 'EOD'];
    if (priorities.includes('noCons')) next.noCons = true;
    if (priorities.includes('payout')) next.payout = 14;
    if (priorities.includes('flex')) next.flex = '3';
    onApply(next, 'reliability');
  }

  return (
    <section className={styles.finder} id="find-my-challenge" aria-labelledby="finder-title">
      <div className={styles.finderHead}>
        <div>
          <h2 id="finder-title">{c.fTitle}</h2>
          <p>{c.fLead}</p>
        </div>
        <button type="button" className={styles.close} onClick={onClose} aria-label={c.close}>×</button>
      </div>
      {!done ? (
        <div className={styles.finderStep}>
          <div className={styles.progress} aria-hidden="true"><span style={{ width: `${(step / total) * 100}%` }} /></div>
          <small>{fill(c.fStep, { n: step + 1, total })}</small>
          <h3 tabIndex={-1} ref={headingRef}>{question}</h3>
          <div className={styles.options}>
            {step === 0 ? (
              <>
                {MARKETS.map((m) => option(m, market === m, () => setMarket(m), { forex: c.mForex, futures: c.mFutures, crypto: c.mCrypto, stocks: c.mStocks }[m]))}
                {option('skip', false, () => setMarket(null), c.fSkip)}
              </>
            ) : step === 1 ? (
              <>
                {CAPITALS.map((n) => option(n, capital === n, () => setCapital(n), size(n)))}
                {option('skip', false, () => setCapital(null), c.fSkip)}
              </>
            ) : step === 2 ? (
              <>
                {BUDGETS.map((n) => option(n, budget === n, () => setBudget(n), fill(c.upTo, { amount: n.toLocaleString('en-US') })))}
                {option('skip', false, () => setBudget(null), c.anyAmount)}
              </>
            ) : step === 3 ? (
              <>
                {STEPS.map((n) => option(n, steps === n, () => setSteps(n), [c.s0, c.s1, c.s2, c.s3][n]))}
                {option('skip', false, () => setSteps(null), c.fSkip)}
              </>
            ) : (
              <div className={styles.multi}>
                {PRIORITIES.map((p) => (
                  <label key={p} className={`${styles.option}${priorities.includes(p) ? ` ${styles.optionOn}` : ''}`}>
                    <input type="checkbox" checked={priorities.includes(p)} onChange={() => setPriorities((list) => toggle(list, p))} />
                    <span>{prLabel[p]}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          {step === 2 && budget ? <small className={styles.groupNote}>{c.budgetNote}</small> : null}
          <div className={styles.finderNav}>
            {step > 0 ? <button type="button" className={styles.linkButton} onClick={() => setStep((s) => s - 1)}>← {c.fBack}</button> : <span />}
            {step === 4 ? <button type="button" className={styles.trayOpen} onClick={() => setStep(total)}>{c.fSee}</button> : <button type="button" className={styles.linkButton} onClick={() => setStep((s) => s + 1)}>{c.fNext} →</button>}
          </div>
        </div>
      ) : (
        <div className={styles.finderResults}>
          <h3 tabIndex={-1} ref={headingRef}>{c.rTitle} · {results.length === 1 ? c.resultOne : fill(c.results, { n: results.length })}</h3>
          {results.length ? (
            <>
              <div className={styles.grid}>
                {results.slice(0, 6).map(({ offer, met, unknown, checks }) => (
                  <div key={offer.key} className={styles.match}>
                    {priorities.length ? (
                      <div className={styles.why}>
                        <strong>{fill(c.rMatch, { n: met, total: priorities.length })}</strong>
                        {unknown ? <span> · {fill(c.rUnknown, { n: unknown })}</span> : null}
                        <ul>
                          {priorities.map((p, i) => (
                            <li key={p} className={checks[i] === true ? styles.yes : checks[i] === false ? styles.no : styles.unknown}>
                              <span aria-hidden="true">{checks[i] === true ? '✓' : checks[i] === false ? '✕' : '?'}</span> {prLabel[p]}
                              {checks[i] === null ? ` — ${c.notDocumented}` : ''}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    {renderCard(offer, capital)}
                  </div>
                ))}
              </div>
              <div className={styles.finderNav}>
                <button type="button" className={styles.linkButton} onClick={() => { setStep(0); setPriorities([]); }}>↺ {c.rRestart}</button>
                <button type="button" className={styles.trayOpen} onClick={apply}>{c.rApply}</button>
              </div>
            </>
          ) : (
            <div className={styles.empty}>
              <strong>{c.rNone}</strong>
              <button type="button" className={styles.linkButton} onClick={() => setStep(2)}>← {c.fBack}</button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
