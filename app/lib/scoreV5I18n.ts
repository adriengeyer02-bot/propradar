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

/** Labels for the clause-by-clause V5 display; descriptions remain verbatim audit evidence. */
export function scoreV5EvidenceCopy(locale: Locale) {
  return locale === 'fr' ? {
    contract: 'Protection des récompenses acquises (B1)',
    consequence: 'Conséquence possible',
    source: 'Lire la clause officielle',
    evidence: 'Clauses responsables du retrait',
    limited: 'Preuves indépendantes de paiement limitées : pas de validation implicite des payouts.',
    rulesClarification: 'Une règle ordinaire, claire et annoncée (drawdown, news, consistance…) ne retire aucun point. Ces retraits sont déjà intégrés dans le pilier Contrat et règles : aucun double malus.',
  } : {
    contract: 'Protection of earned rewards (B1)',
    consequence: 'Possible consequence',
    source: 'Read official clause',
    evidence: 'Clauses behind this deduction',
    limited: 'Independent payout evidence is limited: payout reliability is not verified by this score.',
    rulesClarification: 'Clearly announced standard limits (drawdown, news, consistency…) cause no deduction. These B2 items already count within the Contract & rules pillar; they are not charged twice.',
  };
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

/** V5.2 preserves the Apex modal layout and adds an explicit evidence ceiling. */
export function scoreV52Copy(locale: Locale): ScoreV4Copy {
  const previous = scoreV5Copy(locale);
  return {
    ...previous,
    subtitle: 'PropRadar V5.2 · 25 / 25 / 20 / 20 / 10',
    method: locale === 'fr'
      ? 'La note V5.2 part de 100 points selon 13 critères. Les retraits B2 figurent une seule fois dans Règles contraignantes ; un plafond de preuve des paiements peut ensuite limiter la note.'
      : 'The V5.2 score uses 13 evidence-based criteria. B2 rules are deducted only once; a payout-evidence ceiling can then limit the final score.',
    restriction: locale === 'fr'
      ? 'Seules les clauses de trading matériellement ambiguës, contradictoires, rétroactives ou exceptionnellement asymétriques font baisser B2. Une règle classique clairement annoncée ne coûte rien.'
      : 'Only materially vague, contradictory, retroactive or exceptionally asymmetric trading clauses reduce B2. Standard clearly disclosed restrictions cost no points.'
  };
}

const payoutCapLabels: Record<Locale, [string,string]> = {
 en:['Payout evidence ceiling','Independent proof is insufficient for a higher score. Maximum allowed by A3: {cap}/100. Not evidence of unpaid rewards.'],
 fr:['Plafond des preuves de paiement','Les versements ne sont pas assez vérifiés indépendamment pour autoriser une note plus élevée : plafond A3 de {cap}/100. Ce n’est pas une preuve de non-paiement.'],
 de:['Obergrenze für Auszahlungsnachweise','Unabhängige Auszahlungsnachweise reichen für eine höhere Bewertung nicht aus: A3-Obergrenze {cap}/100.'],
 it:['Limite delle prove di pagamento','Le prove indipendenti dei pagamenti non consentono un punteggio più alto: limite A3 {cap}/100.'],
 es:['Límite por pruebas de pago','No hay pruebas independientes suficientes para una nota superior: límite A3 {cap}/100.'],
 pt:['Limite das provas de pagamento','Não há provas independentes suficientes para uma nota superior: limite A3 {cap}/100.'],
 zh:['付款证据评分上限','独立付款证据不足以支持更高评分：A3 上限 {cap}/100。'],
 ja:['支払い証拠による上限','独立した支払い証拠が十分でないため、A3 による上限は {cap}/100 です。'],
 hi:['भुगतान प्रमाण की अधिकतम सीमा','स्वतंत्र भुगतान प्रमाण पर्याप्त नहीं हैं: A3 सीमा {cap}/100।'],
 tr:['Ödeme kanıtı tavanı','Bağımsız ödeme kanıtı daha yüksek puanı desteklemiyor: A3 üst sınırı {cap}/100.'],
 ar:['حد أدلة المدفوعات','الأدلة المستقلة على الدفع غير كافية لدرجة أعلى: سقف A3 هو {cap}/100.'],
 ko:['지급 증빙 상한','독립적으로 검증된 지급 증빙이 충분하지 않아 A3 점수 상한은 {cap}/100입니다.'],
 sw:['Kikomo cha ushahidi wa malipo','Ushahidi huru wa malipo hautoshi kwa alama za juu zaidi: kikomo A3 {cap}/100.'],
 ha:['Iyakar shaidar biyan kudi','Shaidar biyan kudi mai zaman kanta bai isa ba: iyakar A3 {cap}/100.'],
 am:['የክፍያ ማስረጃ ጣሪያ','በገለልተኛ ሁኔታ የተረጋገጠ ማስረጃ አይበቃም፤ የA3 ጣሪያ {cap}/100 ነው።']
};
export function scoreV52EvidenceCapCopy(locale: Locale, cap: number) {
  const [label, description] = payoutCapLabels[locale] ?? payoutCapLabels.en;
  return { label, detail: description.replace('{cap}',String(cap)) };
}
