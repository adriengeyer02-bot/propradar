import type { Locale } from './locales';

export type ScoreV4Copy = {
  title: string;
  subtitle: string;
  blocks: [string, string, string, string, string];
  confidence: string;
  method: string;
  restriction: string;
  caution: string;
};

const en: ScoreV4Copy = {
  title: 'Five pillars of the score',
  subtitle: 'Editorial assessment out of 100 · updated 20 November 2026',
  blocks: ['Payout conditions & record', 'Contract & transparency', 'Company identity & legal', 'Offer quality', 'History & user reviews'],
  confidence: 'Audit confidence: moderate',
  method: 'Points are awarded on the evidence available. Missing third-party verification is disclosed, not automatically penalised.',
  restriction: 'Unclear contract clauses are already reflected in the editorial score; they are not deducted twice.',
  caution: 'A contractual risk is not evidence of an actual payout denial. Affiliate links never change these points.',
};

const fr: ScoreV4Copy = {
  title: 'Les cinq piliers de la note',
  subtitle: 'Évaluation éditoriale sur 100 · mise à jour le 20 novembre 2026',
  blocks: ['Fiabilité des payouts', 'Contrat et transparence', 'Identité et légal', 'Qualité de l’offre', 'Historique et avis'],
  confidence: 'Confiance dans l’audit : moyenne',
  method: 'Les points reposent sur les éléments disponibles. Un manque de preuve indépendante est signalé, sans malus automatique.',
  restriction: 'Les clauses contractuelles ambiguës sont déjà prises en compte dans la note éditoriale : aucun second malus.',
  caution: 'Une clause risquée ne prouve pas un refus de payout. L’affiliation ne modifie jamais ces points.',
};

const translated: Partial<Record<Locale, ScoreV4Copy>> = {
  en, fr,
  de: { title: 'Die fünf Säulen der Bewertung', subtitle: 'Redaktionelle Bewertung von 100 · 20. November 2026', blocks: ['Auszahlungen', 'Vertrag & Transparenz', 'Identität & Recht', 'Angebotsqualität', 'Historie & Bewertungen'], confidence: 'Prüfsicherheit: mittel', method: 'Fehlende unabhängige Belege werden gekennzeichnet, nicht automatisch bestraft.', restriction: 'Unklare Vertragsklauseln sind in der redaktionellen Bewertung bereits berücksichtigt; kein zweiter Abzug.', caution: 'Vertragliche Risiken beweisen keine verweigerte Auszahlung. Affiliate-Links ändern die Wertung nicht.' },
  it: { title: 'I cinque pilastri del punteggio', subtitle: 'Valutazione editoriale su 100 · 20 novembre 2026', blocks: ['Affidabilità dei pagamenti', 'Contratto e trasparenza', 'Identità e norme', 'Qualità dell’offerta', 'Storia e recensioni'], confidence: 'Affidabilità dell’audit: media', method: 'L’assenza di prove indipendenti viene segnalata, non penalizzata automaticamente.', restriction: 'Le clausole contrattuali ambigue sono già incluse nel punteggio editoriale: nessuna seconda detrazione.', caution: 'Il rischio contrattuale non prova un mancato pagamento. L’affiliazione non influenza il punteggio.' },
  es: { title: 'Los cinco pilares de la puntuación', subtitle: 'Evaluación editorial sobre 100 · 20 de noviembre de 2026', blocks: ['Fiabilidad de los pagos', 'Contrato y transparencia', 'Identidad y marco legal', 'Calidad de la oferta', 'Historial y opiniones'], confidence: 'Confianza en la auditoría: media', method: 'Las pruebas independientes ausentes se indican sin penalización automática.', restriction: 'Las cláusulas contractuales ambiguas ya cuentan en la nota editorial; no se descuentan dos veces.', caution: 'Un riesgo contractual no prueba un pago rechazado. La afiliación no afecta a la puntuación.' },
  pt: { title: 'Os cinco pilares da pontuação', subtitle: 'Avaliação editorial de 100 · 20 de novembro de 2026', blocks: ['Confiabilidade dos pagamentos', 'Contrato e transparência', 'Identidade e questões legais', 'Qualidade da oferta', 'Histórico e avaliações'], confidence: 'Confiança na auditoria: média', method: 'A falta de prova independente é indicada sem penalização automática.', restriction: 'Cláusulas contratuais ambíguas já estão refletidas na nota editorial; não há segunda dedução.', caution: 'Risco contratual não comprova recusa de pagamento. Afiliados não alteram a nota.' },
  zh: { title: '评分的五大支柱', subtitle: '满分100的编辑评估 · 2026年11月20日', blocks: ['出金可靠性', '合同与透明度', '公司身份与法律', '产品质量', '历史与用户评价'], confidence: '审计可信度：中等', method: '缺少独立证据会被注明，不会自动扣分。', restriction: '模糊的合同条款已计入编辑评分，不会再次扣分。', caution: '合同风险不等于实际拒付证据。联盟合作不影响评分。' },
  ja: { title: '評価の5つの柱', subtitle: '100点満点の編集評価 · 2026年11月20日', blocks: ['出金の信頼性', '契約と透明性', '企業情報と法務', 'プランの品質', '実績と口コミ'], confidence: '監査の確度：中程度', method: '独立した証拠が不足する場合は明示し、自動的に減点しません。', restriction: '曖昧な契約条項は編集評価に反映済みで、二重に減点しません。', caution: '契約リスクは出金拒否の実証ではありません。提携は得点に影響しません。' },
  hi: { title: 'स्कोर के पाँच आधार', subtitle: '100 अंकों का संपादकीय मूल्यांकन · 20 नवंबर 2026', blocks: ['भुगतान की विश्वसनीयता', 'अनुबंध व पारदर्शिता', 'कंपनी और कानून', 'ऑफ़र की गुणवत्ता', 'इतिहास व समीक्षाएँ'], confidence: 'ऑडिट भरोसा: मध्यम', method: 'स्वतंत्र प्रमाण की कमी बताई जाती है, स्वतः अंक नहीं काटे जाते।', restriction: 'अस्पष्ट अनुबंध शर्तें संपादकीय स्कोर में पहले से शामिल हैं; दोबारा अंक नहीं कटते।', caution: 'अनुबंध जोखिम वास्तविक भुगतान अस्वीकृति का प्रमाण नहीं है। संबद्धता स्कोर नहीं बदलती।' },
  tr: { title: 'Puanın beş temeli', subtitle: '100 üzerinden editoryal değerlendirme · 20 Kasım 2026', blocks: ['Ödeme güvenilirliği', 'Sözleşme ve şeffaflık', 'Şirket ve hukuk', 'Teklif kalitesi', 'Geçmiş ve yorumlar'], confidence: 'Denetim güveni: orta', method: 'Bağımsız kanıt eksikliği belirtilir, otomatik ceza uygulanmaz.', restriction: 'Belirsiz sözleşme maddeleri editoryal puana zaten yansıtılmıştır; ikinci kez düşülmez.', caution: 'Sözleşme riski gerçek bir ödeme reddinin kanıtı değildir. İş ortaklığı puanı değiştirmez.' },
  ar: { title: 'ركائز التقييم الخمس', subtitle: 'تقييم تحريري من 100 · 20 نوفمبر 2026', blocks: ['موثوقية السحب', 'العقد والشفافية', 'هوية الشركة والقانون', 'جودة العرض', 'التاريخ والمراجعات'], confidence: 'الثقة في التدقيق: متوسطة', method: 'يُذكر نقص الأدلة المستقلة دون خصم تلقائي.', restriction: 'البنود التعاقدية الغامضة محسوبة بالفعل في التقييم التحريري، ولا تُخصم مرة ثانية.', caution: 'الخطر التعاقدي ليس دليلاً على رفض سحب فعلي. الشراكة لا تؤثر في النقاط.' },
  ko: { title: '점수의 다섯 기준', subtitle: '100점 기준 편집 평가 · 2026년 11월 20일', blocks: ['지급 신뢰성', '계약과 투명성', '회사 정보와 법률', '상품 품질', '이력과 리뷰'], confidence: '감사 신뢰도: 보통', method: '독립 증거의 부재를 표시하며 자동 감점하지 않습니다.', restriction: '불명확한 계약 조항은 이미 편집 점수에 반영되어 있으며, 중복 감점하지 않습니다.', caution: '계약상 위험이 실제 지급 거절의 증거는 아닙니다. 제휴는 점수에 영향을 주지 않습니다.' },
  sw: { title: 'Nguzo tano za alama', subtitle: 'Tathmini ya uhariri kati ya 100 · 20 Novemba 2026', blocks: ['Uhakika wa malipo', 'Mkataba na uwazi', 'Utambulisho na sheria', 'Ubora wa ofa', 'Historia na maoni'], confidence: 'Uhakika wa ukaguzi: wastani', method: 'Ukosefu wa ushahidi huru unaonyeshwa bila adhabu ya moja kwa moja.', restriction: 'Vifungu vya mkataba visivyo wazi tayari vimezingatiwa katika alama ya uhariri; hakuna makato ya pili.', caution: 'Hatari ya mkataba si ushahidi wa kukataliwa kwa malipo. Ushirika hauathiri alama.' },
  ha: { title: 'Ginshikan maki guda biyar', subtitle: 'Ƙimar edita cikin 100 · 20 Nuwamba 2026', blocks: ['Amincin biyan kuɗi', 'Yarjejeniyar da bayyanawa', 'Kamfani da doka', 'Ingancin tayi', 'Tarihi da ra’ayoyi'], confidence: 'Amincin bincike: matsakaici', method: 'Ana nuna rashin shaida mai zaman kanta ba tare da rage maki kai tsaye ba.', restriction: 'An riga an yi la’akari da sharuɗɗan kwangila marasa bayani a makin edita; ba a sake cire maki.', caution: 'Hadarin yarjejeniya ba shaidar hana biyan kuɗi ba ne. Haɗin kasuwanci ba ya canza maki.' },
  am: { title: 'የነጥብ አምስት መሠረቶች', subtitle: 'ከ100 የአርታኢ ግምገማ · 20 ኖቬምበር 2026', blocks: ['የክፍያ አስተማማኝነት', 'ውልና ግልጽነት', 'የኩባንያ መረጃና ሕግ', 'የአቅርቦት ጥራት', 'ታሪክና ግምገማዎች'], confidence: 'የኦዲት እምነት፦ መካከለኛ', method: 'ገለልተኛ ማስረጃ ካልተገኘ ይገለጻል፤ በቀጥታ ነጥብ አይቀነስም።', restriction: 'ግልጽ ያልሆኑ የውል አንቀጾች በአርታኢያዊ ነጥብ ውስጥ አስቀድሞ ታስበዋል፤ ዳግም ነጥብ አይቀነስም።', caution: 'የውል ስጋት ክፍያ ተከልክሏል ማለት አይደለም። አጋርነት ነጥብን አይቀይርም።' },
};

export function scoreV4Copy(locale: Locale): ScoreV4Copy {
  return translated[locale] || en;
}
