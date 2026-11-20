import type { Locale } from './locales';
import { scoreV4Copy, type ScoreV4Copy } from './scoreV4I18n';

const blocks: Record<Locale, ScoreV4Copy['blocks']> = {
  en: ['Payouts & evidence', 'Contract protection & rules', 'Legal identity & status', 'Documentation & transparency', 'History & support'],
  fr: ['Paiements et preuves', 'Contrat et règles', 'Identité et statut juridique', 'Documentation et transparence', 'Historique et assistance'],
  de: ['Auszahlungen & Belege', 'Vertrag & Regeln', 'Identität & Rechtslage', 'Dokumentation & Transparenz', 'Historie & Support'],
  it: ['Pagamenti e prove', 'Contratto e regole', 'Identità e stato legale', 'Documenti e trasparenza', 'Storico e assistenza'],
  es: ['Pagos y pruebas', 'Contrato y reglas', 'Identidad y situación legal', 'Documentación y transparencia', 'Historial y atención'],
  pt: ['Pagamentos e provas', 'Contrato e regras', 'Identidade e situação jurídica', 'Documentação e transparência', 'Histórico e apoio'],
  zh: ['付款与证据', '合同与规则', '法律主体与状态', '文件与透明度', '经营历史与支持'],
  ja: ['支払いと証拠', '契約とルール', '法人と法的状態', '資料と透明性', '実績とサポート'],
  hi: ['भुगतान व साक्ष्य', 'अनुबंध व नियम', 'कानूनी पहचान व स्थिति', 'दस्तावेज़ व पारदर्शिता', 'इतिहास व सहायता'],
  tr: ['Ödemeler ve kanıtlar', 'Sözleşme ve kurallar', 'Tüzel kişilik ve durum', 'Belgeler ve şeffaflık', 'Geçmiş ve destek'],
  ar: ['المدفوعات والأدلة', 'العقد والقواعد', 'الكيان والوضع القانوني', 'الوثائق والشفافية', 'السجل والدعم'],
  ko: ['지급과 증거', '계약과 규칙', '법인과 법적 상태', '문서와 투명성', '운영 이력과 지원'],
  sw: ['Malipo na ushahidi', 'Mkataba na kanuni', 'Utambulisho wa kisheria', 'Nyaraka na uwazi', 'Historia na msaada'],
  ha: ['Biyan kuɗi da hujjoji', 'Yarjejeniyar da dokoki', 'Shaidar kamfani da doka', 'Takardu da bayyanawa', 'Tarihi da tallafi'],
  am: ['ክፍያዎችና ማስረጃዎች', 'ውልና ደንቦች', 'የሕግ ማንነትና ሁኔታ', 'ሰነዶችና ግልጽነት', 'ታሪክና ድጋፍ'],
};

const legalCapLabels: Record<Locale, string> = {
  en: 'Legal safety cap', fr: 'Plafond de sécurité juridique',
  de: 'Rechtliche Sicherheitsgrenze', it: 'Limite di sicurezza legale',
  es: 'Límite de seguridad jurídica', pt: 'Limite de segurança jurídica',
  zh: '法律风险上限', ja: '法的リスク上限', hi: 'कानूनी सुरक्षा सीमा',
  tr: 'Hukuki güvenlik sınırı', ar: 'حد الأمان القانوني', ko: '법적 안전 상한',
  sw: 'Kikomo cha tahadhari ya kisheria', ha: 'Iyakar kariyar doka',
  am: 'የሕግ ደህንነት ገደብ',
};

export function scoreV5LegalCapCopy(locale: Locale, cap: number) {
  const label = legalCapLabels[locale] ?? legalCapLabels.en;
  return { label, detail: locale === 'fr'
    ? `Entité contractante non identifiable ou radiation active non suspendue : note plafonnée à ${cap}.`
    : `Unverified contracting entity or active, unsuspended strike-off: score capped at ${cap}.` };
}

export function scoreV5Copy(locale: Locale): ScoreV4Copy {
  const v4 = scoreV4Copy(locale);
  return {
    ...v4,
    blocks: blocks[locale] ?? blocks.en,
    subtitle: `PropRadar V5 · 25 / 25 / 20 / 20 / 10`,
    method: locale === 'fr'
      ? 'Le score brut inclut les 10 points disponibles pour B2. Seules les déductions B2 prouvées apparaissent à la ligne « Règles contraignantes » ; elles ne sont jamais prélevées deux fois.'
      : 'The gross score includes the full B2 budget. The sourced B2 deductions appear once under restrictive rules, never twice.',
    restriction: locale === 'fr'
      ? 'Les retraits B2 figurent séparément entre la note éditoriale brute et la note finale ; les clauses de B1 restent déjà comprises dans le score.'
      : 'B2 deductions are shown separately between the gross editorial score and the final score. B1 contract risks are already included.',
    caution: locale === 'fr'
      ? 'Une clause risquée ne prouve pas un refus réel de paiement. L’affiliation n’influence aucune note.'
      : 'A risky clause is not proof of a payout denial. Affiliate status never changes a score.',
  };
}
