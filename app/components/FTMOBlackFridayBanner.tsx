import Link from 'next/link';
import FirmLogo from './FirmLogo';
import { localePath, type Locale } from '../lib/locales';

// Creative and referral URL supplied directly by the PropRadar owner on 2026-11-23.
// This is affiliate marketing, never a basis for the firm's editorial score.
// The official creative only claims "UP TO 30% OFF", not 30% on every account.
export const FTMO_BLACK_FRIDAY_LINK = 'https://join.ftmo.com/ILTDLLkYLwdMlzGLBwkq';
export const FTMO_BLACK_FRIDAY_CREATIVE = 'https://cdn.ftmo.com/06087f2803df4f8da8c3b4312517ce30';

// Our own conservative homepage display cutoff, NOT a claimed FTMO promo end date.
// Revalidated at most hourly by the homepage ISR setting.
export const FTMO_BLACK_FRIDAY_DISPLAY_UNTIL = '2026-12-01T00:00:00Z';

type Copy = {
  label: string;
  offer: string;
  text: string;
  cta: string;
  audit: string;
  disclosure: string;
};

const copy: Record<Locale, Copy> = {
  en: {
    label: 'Black Friday · Partner offer',
    offer: 'Up to 30% off FTMO Challenges',
    text: 'Official FTMO partner creative. Eligible plans and the actual discount must be checked at checkout.',
    cta: 'See FTMO offer',
    audit: 'Read our independent FTMO review',
    disclosure: 'Affiliate link · No impact on PropRadar rankings · Simulated trading accounts',
  },
  fr: {
    label: 'Black Friday · Offre partenaire',
    offer: "Jusqu'à −30 % sur les challenges FTMO",
    text: "Visuel partenaire FTMO. Programmes éligibles et réduction réelle à vérifier au paiement.",
    cta: "Voir l'offre FTMO",
    audit: "Lire notre audit indépendant de FTMO",
    disclosure: 'Lien affilié · Aucun impact sur le classement PropRadar · Comptes de trading simulés',
  },
  de: {
    label: 'Black Friday · Partnerangebot',
    offer: 'Bis zu 30 % Rabatt auf FTMO Challenges',
    text: 'Offizielles FTMO-Partnerbanner. Teilnahmeberechtigte Pläne und tatsächlichen Rabatt an der Kasse prüfen.',
    cta: 'FTMO-Angebot ansehen',
    audit: 'Unabhängigen FTMO-Test lesen',
    disclosure: 'Affiliate-Link · Kein Einfluss auf das PropRadar-Ranking · Simulierte Handelskonten',
  },
  it: {
    label: 'Black Friday · Offerta partner',
    offer: 'Fino al 30% di sconto sulle sfide FTMO',
    text: "Creatività ufficiale del partner FTMO. Verifica programmi idonei e sconto effettivo al checkout.",
    cta: "Vedi l'offerta FTMO",
    audit: "Leggi la nostra recensione indipendente",
    disclosure: 'Link affiliato · Nessuna influenza sulla classifica PropRadar · Conti simulati',
  },
  es: {
    label: 'Black Friday · Oferta de socio',
    offer: 'Hasta un 30 % de descuento en retos FTMO',
    text: 'Creatividad oficial de FTMO para socios. Comprueba los planes elegibles y el descuento final antes de pagar.',
    cta: 'Ver oferta FTMO',
    audit: 'Leer nuestro análisis independiente',
    disclosure: 'Enlace afiliado · No afecta a la clasificación PropRadar · Cuentas simuladas',
  },
  pt: {
    label: 'Black Friday · Oferta parceira',
    offer: 'Até 30% de desconto nos desafios FTMO',
    text: 'Material oficial de parceiro FTMO. Confirme os planos elegíveis e o desconto final no checkout.',
    cta: 'Ver oferta FTMO',
    audit: 'Ler análise independente',
    disclosure: 'Link de afiliado · Sem impacto no ranking PropRadar · Contas simuladas',
  },
  zh: {
    label: '黑色星期五 · 合作伙伴优惠',
    offer: 'FTMO 挑战最高优惠 30%',
    text: 'FTMO 官方合作伙伴宣传素材。适用方案及实际折扣以结账页面为准。',
    cta: '查看 FTMO 优惠',
    audit: '阅读独立 FTMO 评测',
    disclosure: '联盟链接 · 不影响 PropRadar 排名 · 模拟交易账户',
  },
  ja: {
    label: 'ブラックフライデー · 提携オファー',
    offer: 'FTMOチャレンジが最大30%オフ',
    text: 'FTMO公式パートナー用素材。対象プランと実際の割引額は決済画面で確認してください。',
    cta: 'FTMOのオファーを見る',
    audit: '独立したFTMO評価を読む',
    disclosure: 'アフィリエイトリンク · PropRadarの順位には影響しません · 模擬取引口座',
  },
  hi: {
    label: 'ब्लैक फ्राइडे · पार्टनर ऑफ़र',
    offer: 'FTMO चैलेंज पर 30% तक की छूट',
    text: 'FTMO की आधिकारिक पार्टनर सामग्री। पात्र प्लान और अंतिम छूट भुगतान से पहले जाँचें।',
    cta: 'FTMO ऑफ़र देखें',
    audit: 'स्वतंत्र FTMO समीक्षा पढ़ें',
    disclosure: 'अफ़िलिएट लिंक · PropRadar रैंकिंग पर कोई प्रभाव नहीं · सिम्युलेटेड ट्रेडिंग खाते',
  },
  tr: {
    label: 'Black Friday · İş ortağı teklifi',
    offer: 'FTMO challenge paketlerinde %30’a varan indirim',
    text: 'FTMO resmi iş ortağı görseli. Uygun paketleri ve gerçek indirimi ödeme sırasında doğrulayın.',
    cta: 'FTMO teklifini gör',
    audit: 'Bağımsız FTMO incelememiz',
    disclosure: 'Satış ortaklığı bağlantısı · PropRadar sıralamasını etkilemez · Simüle hesaplar',
  },
  ar: {
    label: 'الجمعة السوداء · عرض شريك',
    offer: 'خصم يصل إلى 30% على تحديات FTMO',
    text: 'إعلان رسمي لشركاء FTMO. تحقق من الخطط المؤهلة والخصم الفعلي قبل الدفع.',
    cta: 'اطّلع على عرض FTMO',
    audit: 'اقرأ تقييم FTMO المستقل',
    disclosure: 'رابط تسويق بالعمولة · لا يؤثر في ترتيب PropRadar · حسابات تداول تجريبية',
  },
  ko: {
    label: '블랙프라이데이 · 파트너 혜택',
    offer: 'FTMO 챌린지 최대 30% 할인',
    text: 'FTMO 공식 파트너 배너입니다. 적용 상품과 실제 할인율은 결제 시 확인하세요.',
    cta: 'FTMO 혜택 보기',
    audit: '독립적인 FTMO 리뷰 읽기',
    disclosure: '제휴 링크 · PropRadar 순위에 영향 없음 · 모의 거래 계정',
  },
  sw: {
    label: 'Black Friday · Ofa ya mshirika',
    offer: 'Punguzo la hadi 30% kwa changamoto za FTMO',
    text: 'Tangazo rasmi la mshirika wa FTMO. Hakiki mipango inayostahili na punguzo halisi kabla ya kulipa.',
    cta: 'Angalia ofa ya FTMO',
    audit: 'Soma tathmini yetu huru',
    disclosure: 'Kiungo cha ushirika · Hakiathiri nafasi za PropRadar · Akaunti za biashara ya majaribio',
  },
  ha: {
    label: 'Black Friday · Tayin abokin hulɗa',
    offer: 'Rangwamen har zuwa 30% kan ƙalubalen FTMO',
    text: 'Tallan hukuma ga abokan hulɗar FTMO. Duba tsare-tsaren da suka cancanta da rangwamen ƙarshe kafin biyan kuɗi.',
    cta: 'Duba tayin FTMO',
    audit: 'Karanta nazarinmu mai zaman kansa',
    disclosure: 'Haɗin abokin hulɗa · Ba ya tasiri matsayin PropRadar · Asusun ciniki na gwaji',
  },
  am: {
    label: 'ብላክ ፍራይዴይ · የአጋር ቅናሽ',
    offer: 'በFTMO ፈተናዎች ላይ እስከ 30% ቅናሽ',
    text: 'የFTMO ኦፊሴላዊ የአጋር ማስታወቂያ። ብቁ የሆኑ እቅዶችን እና ትክክለኛውን ቅናሽ ከክፍያ በፊት ያረጋግጡ።',
    cta: 'የFTMO ቅናሽን ይመልከቱ',
    audit: 'ነፃ የFTMO ግምገማችንን ያንብቡ',
    disclosure: 'የአጋር አገናኝ · በPropRadar ደረጃ ላይ ተጽዕኖ የለውም · የማስመሰል ንግድ መለያዎች',
  },
};

/**
 * A time-boxed, clearly disclosed affiliate placement. It does NOT enter any
 * rankings, scoring function, sponsored search prioritization or firm data.
 */
export default function FTMOBlackFridayBanner({ locale }: { locale: Locale }) {
  if (Date.now() >= Date.parse(FTMO_BLACK_FRIDAY_DISPLAY_UNTIL)) return null;

  const c = copy[locale];
  return (
    <section className="container pr-ftmo-bf" aria-labelledby="pr-ftmo-bf-title">
      <a
        href={FTMO_BLACK_FRIDAY_LINK}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="pr-ftmo-bf-art"
        aria-label={c.cta}
      >
        {/* Official landscape affiliate creative supplied by the site owner; uncropped. */}
        <img
          src={FTMO_BLACK_FRIDAY_CREATIVE}
          alt=""
          width={350}
          height={250}
          loading="lazy"
          decoding="async"
        />
      </a>
      <div className="pr-ftmo-bf-main">
        <div className="pr-ftmo-bf-eyebrow">
          <FirmLogo name="FTMO" logoDomain="ftmo.com" size="sm" />
          <span>{c.label}</span>
        </div>
        <h2 id="pr-ftmo-bf-title">{c.offer}</h2>
        <p className="pr-ftmo-bf-detail">{c.text}</p>
        <div className="pr-ftmo-bf-actions">
          <a
            href={FTMO_BLACK_FRIDAY_LINK}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="pr-ftmo-bf-cta"
          >{c.cta} <span aria-hidden="true">↗</span></a>
          <Link href={localePath(locale, '/firm/ftmo')} className="pr-ftmo-bf-review">{c.audit} <span aria-hidden="true">→</span></Link>
        </div>
        <p className="pr-ftmo-bf-disclosure">{c.disclosure}</p>
      </div>
    </section>
  );
}
