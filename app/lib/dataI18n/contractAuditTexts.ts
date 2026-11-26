import type { Locale } from '../locales';
import raw from './contractAuditTexts.json';

const TEXTS: Partial<Record<Locale, Record<string, string>>> = raw;

/** Translate exact audited source strings only. An amended source never
 * silently inherits an old translation. Original citations stay untouched. */
export function localizeContractAuditText(locale: Locale, text: string): string {
  const dict = TEXTS[locale];
  return dict && Object.prototype.hasOwnProperty.call(dict, text) ? dict[text] : text;
}

const STATS: Record<Locale, [string, string]> = {
  en: ['% of Funded Level participants received a payout', '% of Express Funded participants moved to Live'],
  fr: [' % des participants en phase financée ont reçu un paiement', ' % des participants Express Funded sont passés en compte réel'],
  de: [' % der Teilnehmer auf der Funded-Stufe erhielten eine Auszahlung', ' % der Express-Funded-Teilnehmer wechselten in ein Live-Konto'],
  it: ['% dei partecipanti alla fase finanziata ha ricevuto un pagamento', '% dei partecipanti Express Funded è passato al conto reale'],
  es: [' % de los participantes en la fase financiada recibieron un pago', ' % de los participantes Express Funded pasaron a una cuenta real'],
  pt: ['% dos participantes da fase financiada receberam um pagamento', '% dos participantes Express Funded passaram para uma conta real'],
  zh: ['% 的资助阶段参与者获得了出金', '% 的 Express Funded 参与者转入实盘账户'],
  ja: ['% の資金提供段階の参加者が出金を受けた', '% の Express Funded 参加者がライブ口座へ移行した'],
  hi: ['% फंडेड स्तर के प्रतिभागियों को भुगतान मिला', '% Express Funded प्रतिभागी लाइव खाते में पहुँचे'],
  tr: ['% oranındaki fonlanmış aşama katılımcısı ödeme aldı', '% oranındaki Express Funded katılımcısı canlı hesaba geçti'],
  ar: ['% من المشاركين في المرحلة الممولة تلقوا دفعة', '% من المشاركين في Express Funded انتقلوا إلى حساب حقيقي'],
  ko: ['%의 펀딩 단계 참가자가 지급을 받음', '%의 Express Funded 참가자가 실거래 계좌로 전환됨'],
  sw: ['% ya washiriki katika hatua ya ufadhili walipokea malipo', '% ya washiriki wa Express Funded walihamia akaunti halisi'],
  ha: ['% na mahalarta matakin asusun da aka ba kuɗi sun karɓi biya', '% na mahalarta Express Funded sun koma asusun ciniki na gaske'],
  am: ['% የተደገፈ ሂሳብ ደረጃ ተሳታፊዎች ክፍያ አግኝተዋል', '% የ Express Funded ተሳታፊዎች ወደ ቀጥታ ንግድ ሂሳብ ተሸጋግረዋል'],
};
export function contractEvidenceStat(locale: Locale, value: number, kind: 'paid' | 'live'): string {
  return `${value}${STATS[locale][kind === 'paid' ? 0 : 1]}`;
}
