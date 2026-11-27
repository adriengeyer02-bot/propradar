/** Educational scenario calculations. Never infer a programme rule from a firm score. */
export function consistency(total: number, best: number, percent: number) {
  if (![total,best,percent].every(Number.isFinite) || best < 0 || percent <= 0 || percent > 100) return null;
  const required = best / (percent / 100);
  return { ratio: total > 0 ? best / total * 100 : null, required, extra: Math.max(0, required-total), eligible: total > 0 && best <= total * percent / 100 + 1e-8 };
}
export type DrawdownMode = 'static' | 'eod' | 'intraday';
export function drawdown(initial: number, budget: number, current: number, peak: number, eod: number, mode: DrawdownMode, lock?: number) {
  if (![initial,budget,current,peak,eod].every(Number.isFinite) || initial <= 0 || budget <= 0 || budget > initial || peak < Math.max(initial,current,eod) || (lock !== undefined && (!Number.isFinite(lock) || lock < initial-budget))) return null;
  const high = mode === 'static' ? initial : Math.max(initial, mode === 'eod' ? eod : peak);
  const raw = high-budget;
  const floor = mode !== 'static' && lock !== undefined ? Math.min(raw,lock) : raw;
  return {floor, remaining: Math.max(0,current-floor), breached: current <= floor};
}
export function payout(profit: number, buffer: number, share: number, cap?: number, maxShare=100) {
  if (![profit,buffer,share,maxShare].every(Number.isFinite) || profit < 0 || buffer < 0 || share < 0 || share > 100 || maxShare < 0 || maxShare > 100 || (cap !== undefined && (!Number.isFinite(cap) || cap < 0))) return null;
  // Explicit assumption: buffer, fraction and cap apply to gross profits before the trader split.
  const gross = Math.min(Math.max(0,profit-buffer),profit*maxShare/100,cap ?? Infinity);
  return {gross, net:gross*share/100, retained:profit-gross};
}
export function realCost(fee: number, monthly: number, months: number, activation: number, budget: number) {
  if (![fee,monthly,months,activation,budget].every(Number.isFinite) || fee < 0 || monthly < 0 || !Number.isInteger(months) || months < 0 || activation < 0 || budget <= 0) return null;
  const total = fee + monthly*months + activation;
  return {total, perThousand:total/budget*1000};
}
