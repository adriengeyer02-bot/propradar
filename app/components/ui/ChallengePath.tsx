import type { Product } from '../../lib/propFirms';
import { formatUsd } from '../../lib/propFirms';
import { toEnglishText } from '../../lib/i18n';

type Step = { title: string; value: string; note?: string };

function compactUsd(value: number) {
  if (value >= 1000) return `$${Math.round(value / 1000)}k`;
  return formatUsd(value);
}

function stepsFor(product: Product): Step[] {
  const hasEvaluation = product.type !== 'Instant funding';
  const account =
    product.accountSizeMin && product.accountSizeMax
      ? `${compactUsd(product.accountSizeMin)} – ${compactUsd(product.accountSizeMax)} account`
      : undefined;

  return [
    {
      title: 'Pay',
      value: product.entryFeeMin ? `${formatUsd(product.entryFeeMin)}+` : 'By account size',
      note: account,
    },
    hasEvaluation
      ? { title: 'Pass', value: toEnglishText(product.profitTarget), note: product.minTradingDays ? toEnglishText(product.minTradingDays) : undefined }
      : { title: 'Skip evaluation', value: 'Direct funded account', note: toEnglishText(product.profitTarget) },
    {
      title: 'Stay within',
      value: `Max ${toEnglishText(product.maxDrawdown)}`,
      note: `Daily ${toEnglishText(product.maxDailyLoss)}`,
    },
    {
      title: 'Get paid',
      value: `${toEnglishText(product.profitSplit)} split`,
      note: product.hasConsistencyRule ? 'Consistency rule applies' : undefined,
    },
  ];
}

/** The four stages a trader goes through with a program: pay, pass, hold the limits, withdraw. */
export default function ChallengePath({ product }: { product: Product }) {
  const steps = stepsFor(product);

  return (
    <ol className="pr-path" aria-label={`${toEnglishText(product.name)}: path to a payout`}>
      {steps.map((step, index) => (
        <li key={step.title} className={index === steps.length - 1 ? 'pr-path-final' : undefined}>
          <span className="pr-path-node" aria-hidden="true">{index + 1}</span>
          <span className="pr-path-title">{step.title}</span>
          <strong className="pr-path-value">{step.value}</strong>
          {step.note ? <small className="pr-path-note">{step.note}</small> : null}
        </li>
      ))}
    </ol>
  );
}
