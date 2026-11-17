import type { Locale } from './locales';

export const DISCORD_URL = 'https://discord.gg/v4hQ6ZyPK';

type CommunityCopy = { eyebrow: string; title: string; body: string; action: string; bannerText: string };

const COPY: Record<Locale, CommunityCopy> = {
  en: { eyebrow: 'PropRadar community', title: 'Join the independent research network.', body: 'Discuss firms, report hidden rules and share payout evidence. Community reports are checked before they inform our audits; they never change a score automatically.', action: 'Join our Discord', bannerText: 'Share payout evidence, reviews and hidden rules with other traders.' },
  fr: { eyebrow: 'Communauté PropRadar', title: 'Rejoignez notre réseau de recherche indépendant.', body: 'Échangez sur les prop firms, signalez les règles cachées et partagez vos preuves de paiement. Chaque signalement est vérifié avant de nourrir nos audits : aucune note ne change automatiquement.', action: 'Rejoindre le Discord', bannerText: 'Échangez sur les prop firms, les payouts et les règles cachées.' },
  de: { eyebrow: 'PropRadar-Community', title: 'Werde Teil unseres unabhängigen Recherche-Netzwerks.', body: 'Diskutiere Anbieter, melde versteckte Regeln und teile Auszahlungsnachweise. Berichte werden vor einer Verwendung geprüft; Bewertungen ändern sich nie automatisch.', action: 'Discord beitreten', bannerText: 'Teile Erfahrungen zu Prop Firms, Auszahlungen und versteckten Regeln.' },
  it: { eyebrow: 'Community PropRadar', title: 'Entra nella nostra rete di ricerca indipendente.', body: 'Discuti le prop firm, segnala regole nascoste e condividi prove dei pagamenti. Le segnalazioni vengono verificate prima di influire sulle analisi, mai automaticamente sui punteggi.', action: 'Entra su Discord', bannerText: 'Condividi esperienze, prove di pagamento e regole nascoste.' },
  es: { eyebrow: 'Comunidad PropRadar', title: 'Únete a nuestra red de investigación independiente.', body: 'Debate sobre las prop firms, señala reglas ocultas y comparte pruebas de pago. Verificamos los informes antes de usarlos en nuestros análisis; no modifican automáticamente las puntuaciones.', action: 'Únete a Discord', bannerText: 'Comparte experiencias, pruebas de pago y reglas ocultas.' },
  pt: { eyebrow: 'Comunidade PropRadar', title: 'Junte-se à nossa rede de pesquisa independente.', body: 'Discuta prop firms, denuncie regras ocultas e compartilhe comprovantes de pagamento. Verificamos os relatos antes de utilizá-los nas análises; as notas nunca mudam automaticamente.', action: 'Entrar no Discord', bannerText: 'Compartilhe experiências, pagamentos e regras ocultas.' },
  zh: { eyebrow: 'PropRadar 社区', title: '加入我们的独立研究社区。', body: '讨论交易资金公司、报告隐藏规则并分享出金证据。社区反馈须经核实才能用于分析，绝不会自动改变评分。', action: '加入 Discord', bannerText: '交流交易资金公司经验、出金证据和隐藏规则。' },
  ja: { eyebrow: 'PropRadar コミュニティ', title: '独立した調査コミュニティに参加しませんか。', body: 'プロップファームの情報交換、隠れたルールの報告、出金証拠の共有ができます。投稿は検証後に調査へ反映され、スコアが自動変更されることはありません。', action: 'Discord に参加', bannerText: '出金証拠、体験談、見落としやすい規約を共有しましょう。' },
  ko: { eyebrow: 'PropRadar 커뮤니티', title: '독립적인 조사 커뮤니티에 참여하세요.', body: '프롭펌 경험을 나누고 숨겨진 규정을 신고하거나 지급 증거를 공유하세요. 제보는 검증 후 분석에 활용하며 점수는 자동으로 변경되지 않습니다.', action: 'Discord 참여하기', bannerText: '프롭펌 경험과 지급 증거, 숨겨진 규정을 공유하세요.' },
  hi: { eyebrow: 'PropRadar समुदाय', title: 'स्वतंत्र शोध समुदाय से जुड़ें।', body: 'प्रॉप फर्मों पर चर्चा करें, छिपे नियम बताएं और भुगतान के प्रमाण साझा करें। रिपोर्टों की जाँच के बाद ही उनका उपयोग किया जाता है; स्कोर कभी अपने आप नहीं बदलते।', action: 'Discord से जुड़ें', bannerText: 'प्रॉप फर्म अनुभव, पेआउट प्रमाण और छिपे नियम साझा करें।' },
  tr: { eyebrow: 'PropRadar topluluğu', title: 'Bağımsız araştırma topluluğumuza katılın.', body: 'Prop firmaları tartışın, gizli kuralları bildirin ve ödeme kanıtı paylaşın. Bildirimler analizde kullanılmadan önce doğrulanır; puanlar otomatik değişmez.', action: 'Discord’a katıl', bannerText: 'Prop firm deneyimlerini, ödeme kanıtlarını ve gizli kuralları paylaşın.' },
  ar: { eyebrow: 'مجتمع PropRadar', title: 'انضم إلى مجتمع الأبحاث المستقلة.', body: 'ناقش شركات التداول الممول وأبلغ عن القواعد المخفية وشارك أدلة السحب. نتحقق من البلاغات قبل الاستفادة منها في التقييم؛ ولا تتغير الدرجات تلقائياً.', action: 'انضم إلى Discord', bannerText: 'شارك تجاربك وأدلة السحب والقواعد المخفية مع المتداولين.' },
};

export function communityCopy(locale: Locale) {
  return COPY[locale];
}
