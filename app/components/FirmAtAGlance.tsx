import type { Locale } from '../lib/locales';
import { getScaleC, SCALE_C_CONTRACT_CODES, isFullyRead, type ScaleCCode } from '../lib/scaleC';
import { scaleCCopy } from '../lib/scaleCI18n';
import firmMarkets from '../data/firm-markets.json';

/**
 * Short "at a glance" card under the firm
 * header, replacing the dense key-facts grid. Four lines a reader can take in
 * at once: what you can trade, four numbers, the worst sourced contract point,
 * and how much of the contract PropRadar read. Markets are shown only when
 * they were read on a source; generic watchlist defaults are never shown.
 * All 15 locales; official excerpts stay in their source language.
 */
type Copy = {
  title: string;
  markets: string;
  marketsUnread: string;
  watch: string;
  others: string;
  other1: string;
  cfdPending: string;
  source: string;
  readFull: string;
  readExcerpts: string;
  readNone: string;
  reviewed: string;
  readMore: string;
  assets: Record<AssetKey, string>;
};

type AssetKey = 'forex' | 'indices' | 'commodities' | 'stocks' | 'crypto' | 'futures' | 'options';

export const GLANCE_COPY: Record<string, Copy> = {
  en: {
    title: 'At a glance',
    markets: 'What you can trade',
    marketsUnread: 'Markets not read on an official source yet',
    watch: 'Main point to watch:',
    others: '+{n} more',
    other1: '+1 more',
    cfdPending: '+ CFDs (markets not listed yet)',
    source: 'source',
    readFull: 'Terms read in full by PropRadar',
    readExcerpts: 'Terms read in excerpts only',
    readNone: 'Terms not read yet: score capped at 60',
    reviewed: 'checked {date}',
    readMore: 'Read more',
    assets: { forex: 'Forex', indices: 'Indices', commodities: 'Commodities', stocks: 'Stocks', crypto: 'Crypto', futures: 'Futures', options: 'Options' },
  },
  fr: {
    title: 'En bref',
    markets: 'Ce qu’on peut y trader',
    marketsUnread: 'Marchés pas encore lus sur une source officielle',
    watch: 'Principal point d’attention :',
    others: '+{n} autres',
    other1: '+1 autre',
    cfdPending: '+ CFD (détail des marchés pas encore relevé)',
    source: 'source',
    readFull: 'Conditions lues en entier par PropRadar',
    readExcerpts: 'Conditions lues par extraits seulement',
    readNone: 'Conditions pas encore lues : note plafonnée à 60',
    reviewed: 'vérifié le {date}',
    readMore: 'Lire la suite',
    assets: { forex: 'Forex', indices: 'Indices', commodities: 'Matières premières', stocks: 'Actions', crypto: 'Crypto', futures: 'Futures', options: 'Options' },
  },
  de: {
    title: 'Auf einen Blick',
    markets: 'Was Sie handeln können',
    marketsUnread: 'Märkte noch nicht auf einer offiziellen Quelle gelesen',
    watch: 'Wichtigster Warnpunkt:',
    others: '+{n} weitere',
    other1: '+1 weiterer',
    cfdPending: '+ CFDs (Märkte noch nicht erfasst)',
    source: 'Quelle',
    readFull: 'Bedingungen von PropRadar vollständig gelesen',
    readExcerpts: 'Bedingungen nur auszugsweise gelesen',
    readNone: 'Bedingungen noch nicht gelesen: Bewertung auf 60 begrenzt',
    reviewed: 'geprüft am {date}',
    readMore: 'Weiterlesen',
    assets: { forex: 'Forex', indices: 'Indizes', commodities: 'Rohstoffe', stocks: 'Aktien', crypto: 'Krypto', futures: 'Futures', options: 'Optionen' },
  },
  it: {
    title: 'In breve',
    markets: 'Cosa puoi negoziare',
    marketsUnread: 'Mercati non ancora letti su una fonte ufficiale',
    watch: 'Principale punto da controllare:',
    others: '+{n} altri',
    other1: '+1 altro',
    cfdPending: '+ CFD (mercati non ancora rilevati)',
    source: 'fonte',
    readFull: 'Termini letti integralmente da PropRadar',
    readExcerpts: 'Termini letti solo per estratti',
    readNone: 'Termini non ancora letti: punteggio limitato a 60',
    reviewed: 'verificato il {date}',
    readMore: 'Leggi tutto',
    assets: { forex: 'Forex', indices: 'Indici', commodities: 'Materie prime', stocks: 'Azioni', crypto: 'Cripto', futures: 'Futures', options: 'Opzioni' },
  },
  es: {
    title: 'En resumen',
    markets: 'Qué puedes operar',
    marketsUnread: 'Mercados aún no leídos en una fuente oficial',
    watch: 'Principal punto a vigilar:',
    others: '+{n} más',
    other1: '+1 más',
    cfdPending: '+ CFD (mercados aún no detallados)',
    source: 'fuente',
    readFull: 'Términos leídos íntegramente por PropRadar',
    readExcerpts: 'Términos leídos solo en extractos',
    readNone: 'Términos aún no leídos: puntuación limitada a 60',
    reviewed: 'verificado el {date}',
    readMore: 'Leer más',
    assets: { forex: 'Forex', indices: 'Índices', commodities: 'Materias primas', stocks: 'Acciones', crypto: 'Cripto', futures: 'Futuros', options: 'Opciones' },
  },
  pt: {
    title: 'Em resumo',
    markets: 'O que pode negociar',
    marketsUnread: 'Mercados ainda não lidos numa fonte oficial',
    watch: 'Principal ponto de atenção:',
    others: '+{n} outros',
    other1: '+1 outro',
    cfdPending: '+ CFD (mercados ainda não detalhados)',
    source: 'fonte',
    readFull: 'Termos lidos na íntegra pelo PropRadar',
    readExcerpts: 'Termos lidos apenas em excertos',
    readNone: 'Termos ainda não lidos: nota limitada a 60',
    reviewed: 'verificado em {date}',
    readMore: 'Ler mais',
    assets: { forex: 'Forex', indices: 'Índices', commodities: 'Matérias-primas', stocks: 'Ações', crypto: 'Cripto', futures: 'Futuros', options: 'Opções' },
  },
  zh: {
    title: '概览',
    markets: '可交易市场',
    marketsUnread: '尚未在官方来源上读取市场',
    watch: '主要注意事项：',
    others: '另外 {n} 项',
    other1: '另外 1 项',
    cfdPending: '+ 差价合约（市场明细尚未记录）',
    source: '来源',
    readFull: 'PropRadar 已完整阅读条款',
    readExcerpts: '条款仅部分阅读',
    readNone: '条款尚未阅读：评分上限为 60',
    reviewed: '核实于 {date}',
    readMore: '阅读全文',
    assets: { forex: '外汇', indices: '指数', commodities: '大宗商品', stocks: '股票', crypto: '加密货币', futures: '期货', options: '期权' },
  },
  ja: {
    title: '概要',
    markets: '取引できる市場',
    marketsUnread: '公式ソースで市場をまだ確認していません',
    watch: '主な注意点：',
    others: '他 {n} 件',
    other1: '他 1 件',
    cfdPending: '+ CFD（市場の詳細は未確認）',
    source: '出典',
    readFull: 'PropRadar が規約を全文確認',
    readExcerpts: '規約は抜粋のみ確認',
    readNone: '規約は未確認：スコア上限 60',
    reviewed: '{date} 確認',
    readMore: '続きを読む',
    assets: { forex: 'FX', indices: '指数', commodities: 'コモディティ', stocks: '株式', crypto: '暗号資産', futures: '先物', options: 'オプション' },
  },
  hi: {
    title: 'एक नज़र में',
    markets: 'आप क्या ट्रेड कर सकते हैं',
    marketsUnread: 'बाज़ार अभी किसी आधिकारिक स्रोत पर नहीं पढ़े गए',
    watch: 'मुख्य ध्यान देने योग्य बिंदु:',
    others: '+{n} और',
    other1: '+1 और',
    cfdPending: '+ CFD (बाज़ारों का विवरण अभी दर्ज नहीं)',
    source: 'स्रोत',
    readFull: 'PropRadar ने शर्तें पूरी पढ़ीं',
    readExcerpts: 'शर्तें केवल अंशों में पढ़ी गईं',
    readNone: 'शर्तें अभी नहीं पढ़ी गईं: स्कोर की सीमा 60',
    reviewed: '{date} को जाँचा गया',
    readMore: 'और पढ़ें',
    assets: { forex: 'फ़ॉरेक्स', indices: 'सूचकांक', commodities: 'कमोडिटी', stocks: 'शेयर', crypto: 'क्रिप्टो', futures: 'फ़्यूचर्स', options: 'ऑप्शंस' },
  },
  tr: {
    title: 'Kısaca',
    markets: 'Neleri işlem yapabilirsiniz',
    marketsUnread: 'Piyasalar henüz resmi bir kaynakta okunmadı',
    watch: 'Başlıca dikkat noktası:',
    others: '+{n} tane daha',
    other1: '+1 tane daha',
    cfdPending: '+ CFD (piyasalar henüz ayrıntılandırılmadı)',
    source: 'kaynak',
    readFull: 'Koşullar PropRadar tarafından tamamen okundu',
    readExcerpts: 'Koşullar yalnızca kısmen okundu',
    readNone: 'Koşullar henüz okunmadı: puan 60 ile sınırlı',
    reviewed: '{date} tarihinde kontrol edildi',
    readMore: 'Devamını oku',
    assets: { forex: 'Forex', indices: 'Endeksler', commodities: 'Emtialar', stocks: 'Hisseler', crypto: 'Kripto', futures: 'Vadeli işlemler', options: 'Opsiyonlar' },
  },
  ar: {
    title: 'باختصار',
    markets: 'ما يمكنك تداوله',
    marketsUnread: 'لم تُقرأ الأسواق بعد في مصدر رسمي',
    watch: 'أهم نقطة يجب الانتباه إليها:',
    others: '+{n} أخرى',
    other1: '+1 أخرى',
    cfdPending: '+ عقود الفروقات (لم تُحدد الأسواق بعد)',
    source: 'المصدر',
    readFull: 'قرأ PropRadar الشروط كاملة',
    readExcerpts: 'قُرئت الشروط في مقتطفات فقط',
    readNone: 'لم تُقرأ الشروط بعد: التقييم محدود بـ 60',
    reviewed: 'تم التحقق في {date}',
    readMore: 'اقرأ المزيد',
    assets: { forex: 'الفوركس', indices: 'المؤشرات', commodities: 'السلع', stocks: 'الأسهم', crypto: 'العملات المشفرة', futures: 'العقود الآجلة', options: 'الخيارات' },
  },
  ko: {
    title: '한눈에 보기',
    markets: '거래 가능한 시장',
    marketsUnread: '공식 출처에서 아직 시장을 확인하지 않음',
    watch: '주요 주의 사항:',
    others: '+{n}개 더',
    other1: '+1개 더',
    cfdPending: '+ CFD (시장 세부 정보 미확인)',
    source: '출처',
    readFull: 'PropRadar가 약관 전문을 읽음',
    readExcerpts: '약관 일부만 읽음',
    readNone: '약관 미확인: 점수 상한 60',
    reviewed: '{date} 확인',
    readMore: '더 보기',
    assets: { forex: '외환', indices: '지수', commodities: '원자재', stocks: '주식', crypto: '암호화폐', futures: '선물', options: '옵션' },
  },
  sw: {
    title: 'Kwa ufupi',
    markets: 'Unachoweza kufanyia biashara',
    marketsUnread: 'Masoko bado hayajasomwa kwenye chanzo rasmi',
    watch: 'Jambo kuu la kuzingatia:',
    others: '+{n} zaidi',
    other1: '+1 zaidi',
    cfdPending: '+ CFD (masoko bado hayajaorodheshwa)',
    source: 'chanzo',
    readFull: 'Masharti yamesomwa yote na PropRadar',
    readExcerpts: 'Masharti yamesomwa kwa sehemu tu',
    readNone: 'Masharti bado hayajasomwa: alama imewekewa kikomo cha 60',
    reviewed: 'imethibitishwa {date}',
    readMore: 'Soma zaidi',
    assets: { forex: 'Forex', indices: 'Fahirisi', commodities: 'Bidhaa', stocks: 'Hisa', crypto: 'Crypto', futures: 'Futures', options: 'Options' },
  },
  ha: {
    title: 'A taƙaice',
    markets: 'Abin da za ka iya ciniki',
    marketsUnread: 'Ba a karanta kasuwanni a tushe na hukuma ba tukuna',
    watch: 'Babban abin lura:',
    others: '+{n} ƙari',
    other1: '+1 ƙari',
    cfdPending: '+ CFD (ba a jera kasuwanni ba tukuna)',
    source: 'tushe',
    readFull: 'PropRadar ya karanta sharuɗɗa gaba ɗaya',
    readExcerpts: 'An karanta sharuɗɗa a taƙaice kawai',
    readNone: 'Ba a karanta sharuɗɗa ba tukuna: maki ya tsaya a 60',
    reviewed: 'an tabbatar {date}',
    readMore: 'Ƙara karantawa',
    assets: { forex: 'Forex', indices: 'Fihirisa', commodities: 'Kayayyaki', stocks: 'Hannun jari', crypto: 'Crypto', futures: 'Futures', options: 'Options' },
  },
  am: {
    title: 'በአጭሩ',
    markets: 'ሊገበያዩባቸው የሚችሉ ገበያዎች',
    marketsUnread: 'ገበያዎቹ ገና በይፋዊ ምንጭ ላይ አልተነበቡም',
    watch: 'ዋናው ልብ ሊባል የሚገባው ነጥብ፦',
    others: '+{n} ተጨማሪ',
    other1: '+1 ተጨማሪ',
    cfdPending: '+ CFD (ገበያዎቹ ገና አልተዘረዘሩም)',
    source: 'ምንጭ',
    readFull: 'ውሉ በPropRadar ሙሉ በሙሉ ተነቧል',
    readExcerpts: 'ውሉ በከፊል ብቻ ተነቧል',
    readNone: 'ውሉ ገና አልተነበበም፦ ነጥቡ በ60 ተገድቧል',
    reviewed: '{date} ተረጋግጧል',
    readMore: 'ተጨማሪ ያንብቡ',
    assets: { forex: 'ፎሬክስ', indices: 'ኢንዴክሶች', commodities: 'ሸቀጦች', stocks: 'አክሲዮኖች', crypto: 'ክሪፕቶ', futures: 'ፊውቸርስ', options: 'ኦፕሽንስ' },
  },
};

const ORDER: AssetKey[] = ['forex', 'indices', 'commodities', 'stocks', 'crypto', 'futures', 'options'];

function assetKey(raw: string): AssetKey | null {
  const s = raw.toLowerCase();
  if (/forex|fx|currenc/.test(s)) return 'forex';
  if (/futur/.test(s)) return 'futures';
  if (/option/.test(s)) return 'options';
  if (/indic|index/.test(s)) return 'indices';
  if (/metal|commod|energ|oil|gold|silver/.test(s)) return 'commodities';
  if (/stock|equit|share|action/.test(s)) return 'stocks';
  if (/crypto|bitcoin/.test(s)) return 'crypto';
  return null;
}

type ProductLike = { platforms?: string[]; tradableAssets?: string[]; description?: string };

/** Asset classes read on a source, or null when only generic defaults exist. */
export function readMarkets(products: ProductLike[]): AssetKey[] | null {
  const read = products.filter(
    (p) =>
      p.tradableAssets?.length &&
      !p.tradableAssets.some((a) => /to verify/i.test(a)) &&
      !(p.platforms ?? []).some((a) => /to verify/i.test(a)) &&
      !/not yet audited/i.test(p.description ?? ''),
  );
  if (!read.length) return null;
  const keys = new Set<AssetKey>();
  for (const p of read) for (const a of p.tradableAssets ?? []) {
    const k = assetKey(a);
    if (k) keys.add(k);
  }
  return keys.size ? ORDER.filter((k) => keys.has(k)) : null;
}

const RED: ScaleCCode[] = [...SCALE_C_CONTRACT_CODES, 'E_HARSH', 'CONS'];

export default function FirmAtAGlance({
  slug,
  locale,
  products,
  facts,
}: {
  slug: string;
  locale: Locale;
  products: ProductLike[];
  facts: { label: string; value: string }[];
}) {
  const copy = GLANCE_COPY[locale] ?? GLANCE_COPY.en;
  const cc = scaleCCopy(locale);
  const sourced = (firmMarkets as Record<string, { markets?: string[]; detail?: string; source?: string; locator?: string }>)[slug];
  const markets = sourced?.markets?.length ? ORDER.filter((k) => sourced.markets!.includes(k)) : readMarkets(products);
  const cfdOnly = !sourced && products.some((p) => (p.tradableAssets ?? []).some((a) => /^cfds?$/i.test(a.trim())));
  const entry = getScaleC(slug);
  const flags = (entry?.penalties ?? []).filter((p) => RED.includes(p.code)).sort((a, b) => b.points - a.points);
  const top = flags[0];
  const reading = entry ? (isFullyRead(slug) ? 'full' : 'excerpts') : 'none';
  const readingText = reading === 'full' ? copy.readFull : reading === 'excerpts' ? copy.readExcerpts : copy.readNone;

  return (
    <section className="pr-glance" aria-labelledby={`glance-${slug}`}>
      <h2 id={`glance-${slug}`} className="pr-glance-title">{copy.title}</h2>

      <div className="pr-glance-row">
        <span className="pr-glance-label">{copy.markets}</span>
        {markets ? (
          <ul className="pr-glance-chips">
            {markets.map((m) => <li key={m} className={`pr-glance-chip pr-glance-${m}`}>{copy.assets[m]}</li>)}
          </ul>
        ) : null}
        {markets && sourced?.source ? (
          <a className="pr-glance-muted" href={sourced.source} target="_blank" rel="noreferrer" title={sourced.detail}>{copy.source}</a>
        ) : markets && cfdOnly ? (
          <span className="pr-glance-muted">{copy.cfdPending}</span>
        ) : null}
        {markets ? null : (
          <span className="pr-glance-muted">{copy.marketsUnread}</span>
        )}
      </div>

      <dl className="pr-glance-facts">
        {facts.map((x) => (
          <div key={x.label}><dt>{x.label}</dt><dd>{x.value}</dd></div>
        ))}
      </dl>

      {top ? (
        <p className="pr-glance-watch">
          <span className="pr-glance-icon" aria-hidden="true">!</span>
          <span><strong>{copy.watch}</strong> {cc.codes[top.code]} <span className="pr-glance-pts">−{top.points}</span></span>
          <a href="#contract-audit" className="pr-link">{flags.length === 2 ? copy.other1 : flags.length > 2 ? copy.others.replace('{n}', String(flags.length - 1)) : '→'}</a>
        </p>
      ) : null}

      <p className={`pr-glance-reading pr-glance-reading-${reading}`}>
        <span aria-hidden="true">{reading === 'full' ? '✓' : '◐'}</span> {readingText}
        {entry?.checkedOn ? <span className="pr-glance-muted"> · {copy.reviewed.replace('{date}', entry.checkedOn)}</span> : null}
      </p>
    </section>
  );
}
