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
      value: /^variable$/i.test(product.maxDrawdown) ? 'Limits vary by plan' : /^not stated/i.test(product.maxDrawdown) ? 'Limits not stated' : `Max ${toEnglishText(product.maxDrawdown)}`,
      note: /^(variable|not stated)/i.test(product.maxDailyLoss) ? undefined : `Daily ${toEnglishText(product.maxDailyLoss)}`,
    },
    {
      title: 'Get paid',
      value: /^to verify/i.test(product.profitSplit) ? 'Split to verify' : `${toEnglishText(product.profitSplit)} split`,
      // The default for unaudited programs is "true": only claim a rule when its wording was read.
      note: product.hasConsistencyRule
        ? product.consistencyRule && !/not yet audited|to verify|check the official/i.test(product.consistencyRule)
          ? 'Consistency rule applies'
          : 'Consistency rule: to verify'
        : undefined,
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
