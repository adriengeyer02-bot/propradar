import type { Locale } from '../lib/locales';
import { getScaleC, SCALE_C_CONTRACT_CODES, type ScaleCCode } from '../lib/scaleC';
import { scaleCCopy } from '../lib/scaleCI18n';
import { getContractAudit } from '../lib/contractAudits';
import { localizeScaleCEvidence } from '../lib/dataI18n/scaleCEvidence';
import { localizeContractAuditText } from '../lib/dataI18n/contractAuditTexts';

/**
 * "Contractual points to watch" box near the top of a firm page (Geyer,
 * 2026-11-25): the clauses read in the firm's own terms that can cost a payout
 * or change an account, each with its locator and source. Facts only; the
 * excerpts use reviewed translations where available; source links remain intact.
 */
const COPY: Record<string, { title: string; lead: string; more: string }> = {
  en: { title: 'Contractual points to watch', lead: 'Clauses in the firm’s own terms that can cost you a payout or change your account, with their source.', more: 'Full contract file' },
  fr: { title: 'Points d’attention contractuels', lead: 'Clauses des propres conditions de la firme qui peuvent vous coûter un paiement ou modifier votre compte, avec leur source.', more: 'Dossier contractuel complet' },
  de: { title: 'Vertragliche Warnpunkte', lead: 'Klauseln aus den eigenen Bedingungen der Firma, die Sie eine Auszahlung kosten oder Ihr Konto ändern können, mit Quelle.', more: 'Vollständige Vertragsprüfung' },
  it: { title: 'Punti contrattuali da controllare', lead: 'Clausole dei termini della società che possono costarti un pagamento o cambiare il tuo conto, con la fonte.', more: 'Dossier contrattuale completo' },
  es: { title: 'Puntos contractuales a vigilar', lead: 'Cláusulas de los propios términos de la empresa que pueden costarte un pago o cambiar tu cuenta, con su fuente.', more: 'Expediente contractual completo' },
  pt: { title: 'Pontos contratuais de atenção', lead: 'Cláusulas dos próprios termos da empresa que podem custar um pagamento ou mudar a sua conta, com a fonte.', more: 'Dossiê contratual completo' },
  zh: { title: '合同要点提示', lead: '公司自身条款中可能让你失去出金或改变账户的条款，并附来源。', more: '完整合同档案' },
  ja: { title: '契約上の注意点', lead: '出金を失ったり口座が変わったりする可能性がある、会社自身の規約の条項（出典付き）。', more: '契約の詳細' },
  hi: { title: 'अनुबंध के ध्यान देने योग्य बिंदु', lead: 'फर्म की अपनी शर्तों के वे खंड जो आपका भुगतान रोक सकते हैं या खाता बदल सकते हैं, स्रोत सहित।', more: 'पूरी अनुबंध फ़ाइल' },
  tr: { title: 'Dikkat edilecek sözleşme maddeleri', lead: 'Firmanın kendi koşullarında size bir ödemeye mal olabilecek veya hesabınızı değiştirebilecek maddeler, kaynaklarıyla.', more: 'Tam sözleşme dosyası' },
  ar: { title: 'نقاط تعاقدية يجب الانتباه إليها', lead: 'بنود من شروط الشركة نفسها قد تكلفك دفعة أو تغيّر حسابك، مع مصدرها.', more: 'الملف التعاقدي الكامل' },
  ko: { title: '계약상 주의할 점', lead: '지급을 잃거나 계정이 바뀔 수 있는 회사 자체 약관의 조항(출처 포함).', more: '전체 계약 파일' },
  sw: { title: 'Mambo ya kimkataba ya kuzingatia', lead: 'Vifungu kutoka masharti ya kampuni yenyewe vinavyoweza kukugharimu malipo au kubadilisha akaunti yako, pamoja na chanzo.', more: 'Faili kamili la mkataba' },
  ha: { title: 'Abubuwan kwangila da za a lura da su', lead: 'Sassan sharuɗɗan kamfanin da ka iya hana ka biya ko canza asusunka, tare da tushensu.', more: 'Cikakken fayil na kwangila' },
  am: { title: 'ልብ ሊባሉ የሚገባቸው የውል ነጥቦች', lead: 'ክፍያ ሊያሳጡዎት ወይም አካውንትዎን ሊቀይሩ የሚችሉ የድርጅቱ የራሱ ውል አንቀጾች፣ ከምንጫቸው ጋር።', more: 'ሙሉ የውል ፋይል' },
};

const RED: ScaleCCode[] = [...SCALE_C_CONTRACT_CODES, 'E_HARSH', 'CONS'];

function clip(text: string, n = 240): string {
  const t = text.replace(/\s+/g, ' ').trim();
  return t.length > n ? `${t.slice(0, n - 1).replace(/\s+\S*$/, '')}…` : t;
}

export default function ContractRedFlags({ slug, locale }: { slug: string; locale: Locale }) {
  const copy = COPY[locale] ?? COPY.en;
  const cc = scaleCCopy(locale);
  const entry = getScaleC(slug);
  type Item = { label?: string; points?: number; text: string; locator: string; source: string };
  let items: Item[] = [];
  if (entry) {
    items = entry.penalties
      .filter((p) => RED.includes(p.code) && p.text)
      .sort((a, b) => b.points - a.points)
      .map((p) => ({ label: cc.codes[p.code], points: p.points, text: clip(localizeScaleCEvidence(locale, slug, p)), locator: p.locator, source: p.source }));
  }
  if (!items.length) {
    const audit = getContractAudit(slug);
    items = (audit?.findings ?? [])
      .filter((x) => (x.group === 'discretion' || x.group === 'contradiction') && x.publish !== false && !x.hidden && x.source.startsWith('https://'))
      .slice(0, 4)
      .map((x) => ({ text: clip(localizeContractAuditText(locale, x.text)), locator: x.locator, source: x.source }));
  }
  if (!items.length) return null;
  return (
    <section className="container pr-section pr-red-flags" aria-labelledby={`red-flags-${slug}`}>
      <div className="pr-red-flags-box">
        <h2 id={`red-flags-${slug}`}>{copy.title}</h2>
        <p className="pr-red-flags-lead">{copy.lead}</p>
        <ul>
          {items.slice(0, 5).map((item, index) => (
            <li key={index}>
              {item.label ? (
                <strong>
                  {item.label}
                  {item.points ? <span className="pr-red-flags-pts"> −{item.points}</span> : null}
                </strong>
              ) : null}
              <span className="pr-red-flags-text">{item.text}</span>
              <span className="pr-red-flags-meta">
                {item.locator ? <span>{item.locator}</span> : null}
                <a href={item.source} target="_blank" rel="noopener noreferrer">{cc.source} ↗</a>
              </span>
            </li>
          ))}
        </ul>
        <a className="pr-red-flags-more" href="#contract-audit">{copy.more} →</a>
      </div>
    </section>
  );
}
