import type { Product } from '../../lib/propFirms';
import { formatUsd } from '../../lib/propFirms';
import { toEnglishText } from '../../lib/i18n';
import en, { type Messages } from '../../lib/messages/en';

type PathLabels = Messages['firm']['path'];
const fill = (template: string, values: Record<string, string>) => template.replace(/\{(\w+)\}/g, (m, k: string) => values[k] ?? m);

type Step = { title: string; value: string; note?: string };

function compactUsd(value: number) {
  if (value >= 1000) return `$${Math.round(value / 1000)}k`;
  return formatUsd(value);
}

function stepsFor(product: Product, t: PathLabels): Step[] {
  const hasEvaluation = product.type !== 'Instant funding';
  const account =
    product.accountSizeMin && product.accountSizeMax
      ? fill(t.account, { min: compactUsd(product.accountSizeMin), max: compactUsd(product.accountSizeMax) })
      : undefined;

  return [
    {
      title: t.pay,
      value: product.entryFeeMin ? `${formatUsd(product.entryFeeMin)}+` : t.byAccount,
      note: account,
    },
    hasEvaluation
      ? { title: t.pass, value: toEnglishText(product.profitTarget), note: product.minTradingDays ? toEnglishText(product.minTradingDays) : undefined }
      : { title: t.skip, value: t.direct, note: toEnglishText(product.profitTarget) },
    {
      title: t.stay,
      value: /^variable$/i.test(product.maxDrawdown) ? t.vary : /^not stated/i.test(product.maxDrawdown) ? t.notStated : fill(t.max, { value: toEnglishText(product.maxDrawdown) }),
      note: /^(variable|not stated)/i.test(product.maxDailyLoss) ? undefined : fill(t.daily, { value: toEnglishText(product.maxDailyLoss) }),
    },
    {
      title: t.paid,
      value: /^to verify/i.test(product.profitSplit) ? t.splitVerify : fill(t.split, { value: toEnglishText(product.profitSplit) }),
      // The default for unaudited programs is "true": only claim a rule when its wording was read.
      note: product.hasConsistencyRule
        ? product.consistencyRule && !/not yet audited|to verify|check the official/i.test(product.consistencyRule)
          ? t.consistency
          : t.consistencyVerify
        : undefined,
    },
  ];
}

/** The four stages a trader goes through with a program: pay, pass, hold the limits, withdraw. */
export default function ChallengePath({ product, labels = en.firm.path }: { product: Product; labels?: PathLabels }) {
  const steps = stepsFor(product, labels);

  return (
    <ol className="pr-path" aria-label={fill(labels.aria, { name: toEnglishText(product.name) })}>
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
