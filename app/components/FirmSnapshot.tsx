import type { ReactNode } from 'react';
import type { Locale } from '../lib/locales';
import styles from './FirmSnapshot.module.css';

const COPY = {
  "en": [
    "At a glance",
    "Market",
    "Programmes",
    "Positive point",
    "Watch out",
    "Fixed maximum loss limit",
    "Discretionary rules",
    "Unclear contractual rule",
    "Independent PropRadar analysis",
    "Full analysis",
    "Commodities",
    "Options",
    "Scaling",
    "Varies by programme",
    "Verified legal entity"
  ],
  "fr": [
    "L’essentiel",
    "Marché",
    "Programmes",
    "Point positif",
    "Point de vigilance",
    "Limite de perte maximale fixe",
    "Règles discrétionnaires",
    "Clause contractuelle ambiguë",
    "Analyse indépendante PropRadar",
    "Analyse complète",
    "Matières premières",
    "Options",
    "Scaling",
    "Selon le programme",
    "Entité juridique identifiée"
  ],
  "de": [
    "Auf einen Blick",
    "Markt",
    "Programme",
    "Pluspunkt",
    "Wichtiger Hinweis",
    "Feste maximale Verlustgrenze",
    "Regeln nach Ermessen",
    "Unklare Vertragsregel",
    "Unabhängige PropRadar-Analyse",
    "Vollständige Analyse",
    "Rohstoffe",
    "Optionen",
    "Skalierung",
    "Je nach Programm",
    "Rechtsträger verifiziert"
  ],
  "it": [
    "In breve",
    "Mercato",
    "Programmi",
    "Punto positivo",
    "Attenzione",
    "Limite massimo di perdita fisso",
    "Regole discrezionali",
    "Clausola contrattuale ambigua",
    "Analisi indipendente PropRadar",
    "Analisi completa",
    "Materie prime",
    "Opzioni",
    "Scaling",
    "Varia per programma",
    "Entità giuridica verificata"
  ],
  "es": [
    "Lo esencial",
    "Mercado",
    "Programas",
    "Punto positivo",
    "Punto de atención",
    "Límite máximo de pérdida fijo",
    "Reglas discrecionales",
    "Cláusula contractual ambigua",
    "Análisis independiente de PropRadar",
    "Análisis completo",
    "Materias primas",
    "Opciones",
    "Escalado",
    "Varía según el programa",
    "Entidad jurídica verificada"
  ],
  "pt": [
    "Essencial",
    "Mercado",
    "Programas",
    "Ponto positivo",
    "Ponto de atenção",
    "Limite máximo de perda fixo",
    "Regras discricionárias",
    "Cláusula contratual ambígua",
    "Análise independente PropRadar",
    "Análise completa",
    "Matérias-primas",
    "Opções",
    "Escalonamento",
    "Varia por programa",
    "Entidade jurídica verificada"
  ],
  "zh": [
    "核心信息",
    "市场",
    "计划",
    "优势",
    "注意事项",
    "固定最大亏损限额",
    "自由裁量规则",
    "合同条款含糊",
    "PropRadar 独立分析",
    "完整分析",
    "大宗商品",
    "期权",
    "资金扩展",
    "因计划而异",
    "法律实体已核实"
  ],
  "ja": [
    "基本情報",
    "市場",
    "プログラム",
    "長所",
    "注意点",
    "固定最大損失限度",
    "裁量的なルール",
    "曖昧な契約条項",
    "PropRadar 独立分析",
    "詳細分析",
    "商品",
    "オプション",
    "スケーリング",
    "プログラムにより異なる",
    "法人情報確認済み"
  ],
  "hi": [
    "एक नज़र में",
    "बाज़ार",
    "कार्यक्रम",
    "सकारात्मक बिंदु",
    "ध्यान दें",
    "निश्चित अधिकतम हानि सीमा",
    "विवेकाधीन नियम",
    "अस्पष्ट संविदात्मक नियम",
    "स्वतंत्र PropRadar विश्लेषण",
    "पूरा विश्लेषण",
    "कमोडिटी",
    "ऑप्शंस",
    "स्केलिंग",
    "कार्यक्रम के अनुसार",
    "सत्यापित कानूनी इकाई"
  ],
  "tr": [
    "Kısaca",
    "Piyasa",
    "Programlar",
    "Olumlu nokta",
    "Dikkat edilmesi gereken",
    "Sabit azami zarar limiti",
    "Takdire bağlı kurallar",
    "Belirsiz sözleşme maddesi",
    "Bağımsız PropRadar analizi",
    "Tam analiz",
    "Emtialar",
    "Opsiyonlar",
    "Ölçekleme",
    "Programa göre değişir",
    "Doğrulanmış tüzel kişilik"
  ],
  "ar": [
    "باختصار",
    "السوق",
    "البرامج",
    "نقطة إيجابية",
    "نقطة تستحق الانتباه",
    "حد أقصى ثابت للخسارة",
    "قواعد تقديرية",
    "بند تعاقدي غامض",
    "تحليل PropRadar المستقل",
    "التحليل الكامل",
    "السلع",
    "الخيارات",
    "التوسع",
    "يختلف حسب البرنامج",
    "كيان قانوني تم التحقق منه"
  ],
  "ko": [
    "핵심 정보",
    "시장",
    "프로그램",
    "장점",
    "주의 사항",
    "고정 최대 손실 한도",
    "재량적 규칙",
    "모호한 계약 조항",
    "PropRadar 독립 분석",
    "전체 분석",
    "원자재",
    "옵션",
    "자금 확대",
    "프로그램마다 다름",
    "법인 확인 완료"
  ],
  "sw": [
    "Kwa ufupi",
    "Soko",
    "Programu",
    "Jambo zuri",
    "Tahadhari",
    "Kikomo thabiti cha juu cha hasara",
    "Sheria kwa uamuzi wa kampuni",
    "Kifungu cha mkataba kisicho wazi",
    "Uchambuzi huru wa PropRadar",
    "Uchambuzi kamili",
    "Bidhaa",
    "Options",
    "Kuongeza mgao",
    "Hutegemea programu",
    "Taasisi ya kisheria imethibitishwa"
  ],
  "ha": [
    "A taƙaice",
    "Kasuwa",
    "Shirye-shirye",
    "Abu mai kyau",
    "Abin lura",
    "Tabbatacciyar iyakar asara",
    "Dokoki bisa hukuncin kamfani",
    "Ƙa'idar kwangila marar haske",
    "Bincike mai zaman kansa na PropRadar",
    "Cikakken bincike",
    "Kayayyaki",
    "Options",
    "Ƙara kuɗin da aka ware",
    "Ya danganta da shiri",
    "An tabbatar da kamfanin doka"
  ],
  "am": [
    "በአጭሩ",
    "ገበያ",
    "ፕሮግራሞች",
    "ጥሩ ነጥብ",
    "ልብ ሊባል የሚገባው",
    "ቋሚ ከፍተኛ ኪሳራ ገደብ",
    "በኩባንያው ውሳኔ የሚወሰኑ ደንቦች",
    "ግልጽ ያልሆነ የውል ደንብ",
    "የPropRadar ገለልተኛ ትንታኔ",
    "ሙሉ ትንታኔ",
    "ሸቀጦች",
    "ኦፕሽንስ",
    "የገንዘብ መጠን ማሳደግ",
    "በፕሮግራሙ ይለያያል",
    "የሕጋዊ አካል ማረጋገጫ"
  ]
} as const;
export function snapshotCopy(locale: Locale) {
  const [title,market,programmes,positive,watch,staticLoss,discretion,ambiguous,independent,full,commodities,options,scaling,variable,entity] = COPY[locale];
  return {title,market,programmes,positive,watch,staticLoss,discretion,ambiguous,independent,full,commodities,options,scaling,variable,entity};
}
type Cell = { icon: string; label: string; value: ReactNode };
export default function FirmSnapshot({locale,cells,positive,watch,watchHref='#rules',date}:{
  locale: Locale; cells: Cell[]; positive?: string; watch?: string; watchHref?: string; date?: ReactNode;
}) {
  const c = snapshotCopy(locale);
  return <section className={styles.snapshot} aria-labelledby="firm-snapshot-title">
    <h2 id="firm-snapshot-title"><span aria-hidden="true" className={styles.radar}>◎</span> {c.title}</h2>
    <dl className={styles.grid}>
      {cells.map(cell => <div className={styles.tile} key={cell.label}>
        <span className={styles.icon} aria-hidden="true">{cell.icon}</span>
        <dt>{cell.label}</dt><dd>{cell.value}</dd>
      </div>)}
    </dl>
    {(positive || watch) && <div className={styles.signals}>
      {positive && <div className={styles.signal}><span aria-hidden="true" className={styles.good}>✓</span><div><strong className={styles.good}>{c.positive}</strong><p>{positive}</p></div></div>}
      {watch && <div className={styles.signal}><span aria-hidden="true" className={styles.warn}>!</span><div><strong className={styles.warn}>{c.watch}</strong><p>{watch}</p></div></div>}
    </div>}
    <footer className={styles.footer}><span>{c.independent}{date && <> · {date}</>}</span><a href={watch ? watchHref : '#decision'}>{c.full} ↓</a></footer>
  </section>;
}
