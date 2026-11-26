import type { Locale } from './locales';

/**
 * Interface strings of the contract-audit section on firm pages. Reviewed
 * translations of findings are kept separately in dataI18n/contractAuditTexts.
 * Translation agent: refine freely, keep the meaning
 * of `partial`, `notScore` and `noEvidence` intact (legal caution).
 */
export type ContractAuditCopy = {
  nav: string; eyebrow: string; title: string; lead: string; notScore: string;
  levelCounter: string; levelFirst: string; checked: string;
  rule: string; discretion: string; contradiction: string; version: string; payout: string; safeguard: string; legal: string; history: string; evidence: string; missing: string;
  discretionHint: string; contradictionHint: string; evidenceHint: string; missingHint: string;
  allPrograms: string; source: string; thirdParty: string; hidden: string;
  tracker: string; firm: string; other: string; noEvidence: string; payouts: string;
  trustpilot: string; tpWithheld: string; tpReviews: string; registryNot: string;
};

const en: ContractAuditCopy = {
  nav: 'Contract audit',
  eyebrow: 'Contract audit · partial',
  title: 'What the contracts and terms say',
  lead: 'Clause-by-clause reading of the terms, FAQ and agreements published by {name}. This file is partial: some documents (often the funded or live agreement) could not be read.',
  notScore: 'Does not change the score',
  levelCounter: 'Counter-audit in progress',
  levelFirst: 'First documentary file, not yet counter-checked',
  checked: 'Checked',
  rule: 'Rules by programme',
  discretion: 'Discretionary clauses',
  contradiction: 'Contradictions between documents',
  version: 'Versions and which document prevails',
  payout: 'Payout terms',
  safeguard: 'Trader protections',
  legal: 'Legal entity',
  history: 'History',
  evidence: 'Payout evidence',
  missing: 'Still to verify',
  discretionHint: 'Clauses that let the firm decide alone: refuse, cancel, change or interpret. Having them is common and does not mean they are used in bad faith.',
  contradictionHint: 'The FAQ, terms or pages do not say the same thing. Ask support which version applies to your account before buying.',
  evidenceHint: 'Public evidence that payouts are made, ranked by how far it can be checked.',
  missingHint: 'Unknown means unknown: missing items are neither a good nor a bad sign.',
  allPrograms: 'All programmes or not specified',
  source: 'Source',
  thirdParty: 'Third-party copy, not confirmed as current',
  hidden: 'Only in the legal terms',
  tracker: 'Independent on-chain tracker (totals not matched to individual traders)',
  firm: 'Reported by the firm (not independently checked)',
  other: 'Other source',
  noEvidence: 'No independent payout evidence recorded in this file yet. That does not mean the firm does not pay.',
  payouts: '{amount} across {count} payouts',
  trustpilot: 'Trustpilot, checked {date}',
  tpWithheld: 'rating withheld by Trustpilot for a guideline breach',
  tpReviews: '{rating}/5 from {count} reviews',
  registryNot: 'Company registry not yet checked against a primary register.',
};

const fr: ContractAuditCopy = {
  nav: 'Audit contractuel',
  eyebrow: 'Audit contractuel · partiel',
  title: 'Ce que disent les contrats et les CGU',
  lead: 'Lecture clause par clause des CGU, FAQ et contrats publiés par {name}. Ce dossier est partiel : certains documents (souvent le contrat funded ou live) n’ont pas pu être lus.',
  notScore: 'Ne modifie pas la note',
  levelCounter: 'Contre-audit en cours',
  levelFirst: 'Premier dossier documentaire, pas encore contre-vérifié',
  checked: 'Vérifié le',
  rule: 'Règles par programme',
  discretion: 'Clauses discrétionnaires',
  contradiction: 'Contradictions entre documents',
  version: 'Versions et document qui prévaut',
  payout: 'Conditions de payout',
  safeguard: 'Protections du trader',
  legal: 'Entité juridique',
  history: 'Historique',
  evidence: 'Preuves de payout',
  missing: 'Reste à vérifier',
  discretionHint: 'Clauses qui laissent la firme décider seule : refuser, annuler, modifier ou interpréter. Elles sont courantes et ne signifient pas qu’elles sont utilisées de mauvaise foi.',
  contradictionHint: 'La FAQ, les CGU ou les pages ne disent pas la même chose. Demandez au support quelle version s’applique à votre compte avant d’acheter.',
  evidenceHint: 'Éléments publics montrant que des payouts sont versés, classés selon leur vérifiabilité.',
  missingHint: 'Inconnu veut dire inconnu : un point manquant n’est ni un bon ni un mauvais signe.',
  allPrograms: 'Tous programmes ou non précisé',
  source: 'Source',
  thirdParty: 'Copie tierce, non confirmée comme actuelle',
  hidden: 'Uniquement dans les CGU',
  tracker: 'Suivi on-chain indépendant (totaux non rapprochés de traders individuels)',
  firm: 'Déclaré par la firme (non vérifié de façon indépendante)',
  other: 'Autre source',
  noEvidence: 'Aucune preuve de payout indépendante enregistrée dans ce dossier pour l’instant. Cela ne veut pas dire que la firme ne paie pas.',
  payouts: '{amount} sur {count} payouts',
  trustpilot: 'Trustpilot, vérifié le {date}',
  tpWithheld: 'note retirée par Trustpilot pour non-respect de ses règles',
  tpReviews: '{rating}/5 sur {count} avis',
  registryNot: 'Registre des sociétés pas encore vérifié dans un registre primaire.',
};

const de: ContractAuditCopy = {
  nav: 'Vertragsprüfung', eyebrow: 'Vertragsprüfung · unvollständig', title: 'Was Verträge und AGB sagen',
  lead: 'Klausel für Klausel gelesen: AGB, FAQ und Verträge von {name}. Diese Akte ist unvollständig: Einige Dokumente (oft der Funded- oder Live-Vertrag) konnten nicht gelesen werden.',
  notScore: 'Ändert die Bewertung nicht', levelCounter: 'Gegenprüfung läuft', levelFirst: 'Erste Dokumentenakte, noch nicht gegengeprüft', checked: 'Geprüft',
  rule: 'Regeln je Programm', discretion: 'Ermessensklauseln', contradiction: 'Widersprüche zwischen Dokumenten', version: 'Versionen und welches Dokument gilt', payout: 'Auszahlungsbedingungen', safeguard: 'Schutz für Trader', legal: 'Rechtsträger', history: 'Historie', evidence: 'Auszahlungsnachweise', missing: 'Noch zu prüfen',
  discretionHint: 'Klauseln, die der Firma allein die Entscheidung lassen: ablehnen, stornieren, ändern oder auslegen. Sie sind verbreitet und bedeuten keine Böswilligkeit.',
  contradictionHint: 'FAQ, AGB oder Seiten sagen nicht dasselbe. Fragen Sie vor dem Kauf beim Support, welche Version für Ihr Konto gilt.',
  evidenceHint: 'Öffentliche Belege für Auszahlungen, nach Überprüfbarkeit geordnet.', missingHint: 'Unbekannt heißt unbekannt: Fehlendes ist weder ein gutes noch ein schlechtes Zeichen.',
  allPrograms: 'Alle Programme oder nicht angegeben', source: 'Quelle', thirdParty: 'Kopie eines Dritten, Aktualität nicht bestätigt', hidden: 'Nur in den AGB',
  tracker: 'Unabhängiger On-Chain-Tracker (Summen nicht einzelnen Tradern zugeordnet)', firm: 'Von der Firma angegeben (nicht unabhängig geprüft)', other: 'Andere Quelle',
  noEvidence: 'In dieser Akte ist noch kein unabhängiger Auszahlungsnachweis erfasst. Das heißt nicht, dass die Firma nicht zahlt.', payouts: '{amount} in {count} Auszahlungen',
  trustpilot: 'Trustpilot, geprüft am {date}', tpWithheld: 'Bewertung von Trustpilot wegen Richtlinienverstoß zurückgehalten', tpReviews: '{rating}/5 aus {count} Bewertungen', registryNot: 'Handelsregister noch nicht in einem Primärregister geprüft.',
};

const it: ContractAuditCopy = {
  nav: 'Audit contrattuale', eyebrow: 'Audit contrattuale · parziale', title: 'Cosa dicono contratti e termini',
  lead: 'Lettura clausola per clausola di termini, FAQ e contratti pubblicati da {name}. Il dossier è parziale: alcuni documenti (spesso il contratto funded o live) non sono stati letti.',
  notScore: 'Non modifica il punteggio', levelCounter: 'Contro-audit in corso', levelFirst: 'Primo dossier documentale, non ancora verificato', checked: 'Verificato',
  rule: 'Regole per programma', discretion: 'Clausole discrezionali', contradiction: 'Contraddizioni tra documenti', version: 'Versioni e documento prevalente', payout: 'Condizioni di payout', safeguard: 'Tutele del trader', legal: 'Entità legale', history: 'Storico', evidence: 'Prove di payout', missing: 'Da verificare',
  discretionHint: 'Clausole che lasciano decidere solo la società: rifiutare, annullare, modificare o interpretare. Sono comuni e non indicano malafede.',
  contradictionHint: 'FAQ, termini o pagine non dicono la stessa cosa. Chiedete al supporto quale versione vale per il vostro conto prima di acquistare.',
  evidenceHint: 'Prove pubbliche dei payout, ordinate per verificabilità.', missingHint: 'Sconosciuto vuol dire sconosciuto: un elemento mancante non è né un buono né un cattivo segnale.',
  allPrograms: 'Tutti i programmi o non specificato', source: 'Fonte', thirdParty: 'Copia di terzi, non confermata come attuale', hidden: 'Solo nei termini legali',
  tracker: 'Tracker on-chain indipendente (totali non abbinati ai singoli trader)', firm: 'Dichiarato dalla società (non verificato in modo indipendente)', other: 'Altra fonte',
  noEvidence: 'Nessuna prova di payout indipendente registrata finora in questo dossier. Non significa che la società non paghi.', payouts: '{amount} in {count} payout',
  trustpilot: 'Trustpilot, verificato il {date}', tpWithheld: 'valutazione sospesa da Trustpilot per violazione delle linee guida', tpReviews: '{rating}/5 su {count} recensioni', registryNot: 'Registro delle imprese non ancora verificato su un registro primario.',
};

const es: ContractAuditCopy = {
  nav: 'Auditoría contractual', eyebrow: 'Auditoría contractual · parcial', title: 'Lo que dicen los contratos y términos',
  lead: 'Lectura cláusula por cláusula de los términos, FAQ y contratos publicados por {name}. Este expediente es parcial: algunos documentos (a menudo el contrato funded o live) no se pudieron leer.',
  notScore: 'No cambia la puntuación', levelCounter: 'Contraauditoría en curso', levelFirst: 'Primer expediente documental, aún sin contraverificar', checked: 'Verificado',
  rule: 'Reglas por programa', discretion: 'Cláusulas discrecionales', contradiction: 'Contradicciones entre documentos', version: 'Versiones y documento que prevalece', payout: 'Condiciones de pago', safeguard: 'Protecciones del trader', legal: 'Entidad legal', history: 'Historial', evidence: 'Pruebas de pago', missing: 'Pendiente de verificar',
  discretionHint: 'Cláusulas que dejan decidir solo a la empresa: rechazar, cancelar, cambiar o interpretar. Son comunes y no implican mala fe.',
  contradictionHint: 'La FAQ, los términos o las páginas no dicen lo mismo. Pregunte al soporte qué versión aplica a su cuenta antes de comprar.',
  evidenceHint: 'Pruebas públicas de pagos, ordenadas según su verificabilidad.', missingHint: 'Desconocido significa desconocido: un dato que falta no es ni buena ni mala señal.',
  allPrograms: 'Todos los programas o no especificado', source: 'Fuente', thirdParty: 'Copia de terceros, no confirmada como vigente', hidden: 'Solo en los términos legales',
  tracker: 'Rastreador on-chain independiente (totales no asociados a traders concretos)', firm: 'Declarado por la empresa (sin verificación independiente)', other: 'Otra fuente',
  noEvidence: 'Aún no hay pruebas de pago independientes en este expediente. Eso no significa que la empresa no pague.', payouts: '{amount} en {count} pagos',
  trustpilot: 'Trustpilot, verificado el {date}', tpWithheld: 'puntuación retirada por Trustpilot por incumplir sus normas', tpReviews: '{rating}/5 de {count} reseñas', registryNot: 'Registro mercantil aún no verificado en un registro primario.',
};

const pt: ContractAuditCopy = {
  nav: 'Auditoria contratual', eyebrow: 'Auditoria contratual · parcial', title: 'O que dizem os contratos e os termos',
  lead: 'Leitura cláusula a cláusula dos termos, FAQ e contratos publicados por {name}. Este dossiê é parcial: alguns documentos (muitas vezes o contrato funded ou live) não puderam ser lidos.',
  notScore: 'Não altera a nota', levelCounter: 'Contra-auditoria em andamento', levelFirst: 'Primeiro dossiê documental, ainda não verificado', checked: 'Verificado',
  rule: 'Regras por programa', discretion: 'Cláusulas discricionárias', contradiction: 'Contradições entre documentos', version: 'Versões e documento que prevalece', payout: 'Condições de pagamento', safeguard: 'Proteções do trader', legal: 'Entidade jurídica', history: 'Histórico', evidence: 'Provas de pagamento', missing: 'Ainda a verificar',
  discretionHint: 'Cláusulas que deixam a empresa decidir sozinha: recusar, cancelar, alterar ou interpretar. São comuns e não indicam má-fé.',
  contradictionHint: 'A FAQ, os termos ou as páginas não dizem o mesmo. Pergunte ao suporte qual versão vale para a sua conta antes de comprar.',
  evidenceHint: 'Provas públicas de pagamentos, ordenadas pela possibilidade de verificação.', missingHint: 'Desconhecido é desconhecido: um item em falta não é sinal bom nem mau.',
  allPrograms: 'Todos os programas ou não especificado', source: 'Fonte', thirdParty: 'Cópia de terceiros, não confirmada como atual', hidden: 'Só nos termos legais',
  tracker: 'Rastreador on-chain independente (totais não associados a traders individuais)', firm: 'Declarado pela empresa (sem verificação independente)', other: 'Outra fonte',
  noEvidence: 'Ainda não há prova de pagamento independente neste dossiê. Isso não significa que a empresa não pague.', payouts: '{amount} em {count} pagamentos',
  trustpilot: 'Trustpilot, verificado em {date}', tpWithheld: 'nota retida pela Trustpilot por violação das diretrizes', tpReviews: '{rating}/5 em {count} avaliações', registryNot: 'Registro empresarial ainda não verificado num registro primário.',
};

const zh: ContractAuditCopy = {
  nav: '合同审核', eyebrow: '合同审核 · 部分完成', title: '合同与条款的内容',
  lead: '逐条阅读 {name} 发布的条款、常见问题和协议。本档案尚不完整：部分文件（通常是资金账户或实盘协议）未能读取。',
  notScore: '不影响评分', levelCounter: '复核进行中', levelFirst: '首份文件档案，尚未复核', checked: '核查于',
  rule: '各计划规则', discretion: '自由裁量条款', contradiction: '文件之间的矛盾', version: '版本及优先适用的文件', payout: '出金条件', safeguard: '交易者保护', legal: '法律实体', history: '历史记录', evidence: '出金证据', missing: '待核实',
  discretionHint: '允许公司单方决定的条款：拒绝、取消、修改或解释。这类条款很常见，并不代表恶意使用。',
  contradictionHint: '常见问题、条款或页面说法不一致。购买前请向客服确认适用于您账户的版本。',
  evidenceHint: '公开的出金证据，按可核查程度排列。', missingHint: '未知即未知：缺失的信息既非好信号也非坏信号。',
  allPrograms: '所有计划或未注明', source: '来源', thirdParty: '第三方副本，未确认为现行版本', hidden: '仅见于法律条款',
  tracker: '独立链上追踪（总额未与具体交易者对应）', firm: '公司自行公布（未经独立核实）', other: '其他来源',
  noEvidence: '本档案尚未记录独立的出金证据。这并不意味着该公司不付款。', payouts: '{count} 笔出金，共 {amount}',
  trustpilot: 'Trustpilot，核查于 {date}', tpWithheld: 'Trustpilot 因违反准则暂停显示评分', tpReviews: '{count} 条评价，{rating}/5', registryNot: '公司登记尚未在官方登记册中核实。',
};

const ja: ContractAuditCopy = {
  nav: '契約監査', eyebrow: '契約監査 · 一部', title: '契約と規約の内容',
  lead: '{name} が公開する規約・FAQ・契約を条項ごとに確認しました。この資料は一部のみです。一部の文書（多くはファンデッドまたはライブ契約）は読めませんでした。',
  notScore: 'スコアには影響しません', levelCounter: '再監査中', levelFirst: '初回の文書調査、未再確認', checked: '確認日',
  rule: 'プログラム別ルール', discretion: '裁量条項', contradiction: '文書間の矛盾', version: '版と優先される文書', payout: '出金条件', safeguard: 'トレーダー保護', legal: '法人', history: '経緯', evidence: '出金の証拠', missing: '未確認事項',
  discretionHint: '会社が単独で拒否・取消・変更・解釈できる条項です。一般的なもので、悪意ある運用を意味しません。',
  contradictionHint: 'FAQ、規約、各ページの記載が一致していません。購入前に、ご自身の口座に適用される版をサポートに確認してください。',
  evidenceHint: '出金が行われていることを示す公開情報（検証可能性順）。', missingHint: '不明は不明です。欠けている項目は良い兆候でも悪い兆候でもありません。',
  allPrograms: '全プログラムまたは指定なし', source: '出典', thirdParty: '第三者による写し（最新版か未確認）', hidden: '法的規約にのみ記載',
  tracker: '独立したオンチェーン追跡（合計額は個々のトレーダーと照合されていません）', firm: '会社の自己申告（独立検証なし）', other: 'その他の出典',
  noEvidence: 'この資料には独立した出金の証拠がまだ記録されていません。会社が支払っていないという意味ではありません。', payouts: '{count} 件の出金、合計 {amount}',
  trustpilot: 'Trustpilot（{date} 確認）', tpWithheld: 'ガイドライン違反により Trustpilot が評価を非表示', tpReviews: '{count} 件のレビューで {rating}/5', registryNot: '会社登記は一次登記簿でまだ確認していません。',
};

const hi: ContractAuditCopy = {
  nav: 'अनुबंध ऑडिट', eyebrow: 'अनुबंध ऑडिट · आंशिक', title: 'अनुबंध और शर्तें क्या कहती हैं',
  lead: '{name} द्वारा प्रकाशित शर्तों, FAQ और अनुबंधों को धारा-दर-धारा पढ़ा गया। यह फ़ाइल आंशिक है: कुछ दस्तावेज़ (अक्सर funded या live अनुबंध) पढ़े नहीं जा सके।',
  notScore: 'स्कोर नहीं बदलता', levelCounter: 'प्रति-ऑडिट जारी', levelFirst: 'पहली दस्तावेज़ी फ़ाइल, अभी जाँची नहीं गई', checked: 'जाँचा गया',
  rule: 'प्रोग्राम के अनुसार नियम', discretion: 'विवेकाधीन धाराएँ', contradiction: 'दस्तावेज़ों के बीच विरोधाभास', version: 'संस्करण और कौन-सा दस्तावेज़ लागू होता है', payout: 'पेआउट की शर्तें', safeguard: 'ट्रेडर की सुरक्षा', legal: 'कानूनी इकाई', history: 'इतिहास', evidence: 'पेआउट के प्रमाण', missing: 'अभी जाँचना बाकी',
  discretionHint: 'ऐसी धाराएँ जिनमें फर्म अकेले फ़ैसला करती है: मना करना, रद्द करना, बदलना या व्याख्या करना। ये आम हैं और इनका मतलब बुरी नीयत नहीं है।',
  contradictionHint: 'FAQ, शर्तें या पेज एक जैसी बात नहीं कहते। खरीदने से पहले सपोर्ट से पूछें कि आपके खाते पर कौन-सा संस्करण लागू है।',
  evidenceHint: 'पेआउट होने के सार्वजनिक प्रमाण, जाँच की संभावना के क्रम में।', missingHint: 'अज्ञात का अर्थ अज्ञात है: कमी न अच्छा संकेत है न बुरा।',
  allPrograms: 'सभी प्रोग्राम या निर्दिष्ट नहीं', source: 'स्रोत', thirdParty: 'तीसरे पक्ष की प्रति, वर्तमान होने की पुष्टि नहीं', hidden: 'केवल कानूनी शर्तों में',
  tracker: 'स्वतंत्र ऑन-चेन ट्रैकर (कुल राशि व्यक्तिगत ट्रेडरों से मिलाई नहीं गई)', firm: 'फर्म द्वारा बताया गया (स्वतंत्र रूप से जाँचा नहीं गया)', other: 'अन्य स्रोत',
  noEvidence: 'इस फ़ाइल में अभी कोई स्वतंत्र पेआउट प्रमाण दर्ज नहीं है। इसका मतलब यह नहीं कि फर्म भुगतान नहीं करती।', payouts: '{count} पेआउट में {amount}',
  trustpilot: 'Trustpilot, {date} को जाँचा गया', tpWithheld: 'दिशानिर्देश उल्लंघन के कारण Trustpilot ने रेटिंग रोकी', tpReviews: '{count} समीक्षाओं से {rating}/5', registryNot: 'कंपनी रजिस्ट्री अभी प्राथमिक रजिस्टर में नहीं जाँची गई।',
};

const tr: ContractAuditCopy = {
  nav: 'Sözleşme denetimi', eyebrow: 'Sözleşme denetimi · kısmi', title: 'Sözleşmeler ve şartlar ne diyor',
  lead: '{name} tarafından yayımlanan şartlar, SSS ve sözleşmeler madde madde okundu. Bu dosya kısmidir: bazı belgeler (çoğu zaman funded veya live sözleşmesi) okunamadı.',
  notScore: 'Puanı değiştirmez', levelCounter: 'Karşı denetim sürüyor', levelFirst: 'İlk belge dosyası, henüz karşı kontrol yapılmadı', checked: 'Kontrol',
  rule: 'Programa göre kurallar', discretion: 'Takdire bağlı maddeler', contradiction: 'Belgeler arasındaki çelişkiler', version: 'Sürümler ve geçerli belge', payout: 'Ödeme koşulları', safeguard: 'Trader korumaları', legal: 'Tüzel kişilik', history: 'Geçmiş', evidence: 'Ödeme kanıtları', missing: 'Doğrulanacaklar',
  discretionHint: 'Firmaya tek başına karar verme yetkisi tanıyan maddeler: reddetme, iptal, değiştirme veya yorumlama. Yaygındır ve kötü niyet anlamına gelmez.',
  contradictionHint: 'SSS, şartlar veya sayfalar aynı şeyi söylemiyor. Satın almadan önce hesabınıza hangi sürümün uygulandığını destek ekibine sorun.',
  evidenceHint: 'Ödemelerin yapıldığına dair kamuya açık kanıtlar, doğrulanabilirliğe göre.', missingHint: 'Bilinmeyen bilinmeyendir: eksik bilgi ne iyi ne kötü bir işarettir.',
  allPrograms: 'Tüm programlar veya belirtilmemiş', source: 'Kaynak', thirdParty: 'Üçüncü taraf kopyası, güncelliği teyit edilmedi', hidden: 'Yalnızca hukuki şartlarda',
  tracker: 'Bağımsız zincir üstü takip (toplamlar tek tek trader’larla eşleştirilmedi)', firm: 'Firma beyanı (bağımsız doğrulanmadı)', other: 'Diğer kaynak',
  noEvidence: 'Bu dosyada henüz bağımsız ödeme kanıtı kayıtlı değil. Bu, firmanın ödeme yapmadığı anlamına gelmez.', payouts: '{count} ödemede {amount}',
  trustpilot: 'Trustpilot, {date} kontrolü', tpWithheld: 'Trustpilot kural ihlali nedeniyle puanı gizledi', tpReviews: '{count} yorumdan {rating}/5', registryNot: 'Şirket sicili henüz birincil bir sicilde doğrulanmadı.',
};

const ar: ContractAuditCopy = {
  nav: 'تدقيق العقود', eyebrow: 'تدقيق العقود · جزئي', title: 'ما تقوله العقود والشروط',
  lead: 'قراءة بندًا ببند للشروط والأسئلة الشائعة والعقود التي تنشرها {name}. هذا الملف جزئي: تعذّر قراءة بعض الوثائق (غالبًا عقد الحساب الممول أو الحقيقي).',
  notScore: 'لا يغيّر التقييم', levelCounter: 'تدقيق مضاد جارٍ', levelFirst: 'ملف وثائقي أول، لم يُراجع بعد', checked: 'تم التحقق',
  rule: 'القواعد حسب البرنامج', discretion: 'بنود تقديرية', contradiction: 'تناقضات بين الوثائق', version: 'الإصدارات والوثيقة المرجّحة', payout: 'شروط السحب', safeguard: 'حماية المتداول', legal: 'الكيان القانوني', history: 'السجل', evidence: 'أدلة السحب', missing: 'ما زال قيد التحقق',
  discretionHint: 'بنود تتيح للشركة أن تقرر وحدها: الرفض أو الإلغاء أو التعديل أو التفسير. وهي شائعة ولا تعني سوء نية.',
  contradictionHint: 'الأسئلة الشائعة أو الشروط أو الصفحات لا تقول الشيء نفسه. اسأل الدعم عن الإصدار المطبّق على حسابك قبل الشراء.',
  evidenceHint: 'أدلة علنية على صرف المدفوعات، مرتبة حسب قابلية التحقق.', missingHint: 'المجهول يبقى مجهولًا: النقص ليس علامة جيدة ولا سيئة.',
  allPrograms: 'كل البرامج أو غير محدد', source: 'المصدر', thirdParty: 'نسخة طرف ثالث، غير مؤكدة كنسخة حالية', hidden: 'في الشروط القانونية فقط',
  tracker: 'متتبّع مستقل على السلسلة (المجاميع غير مطابقة لمتداولين أفراد)', firm: 'معلن من الشركة (غير متحقق منه بشكل مستقل)', other: 'مصدر آخر',
  noEvidence: 'لا يوجد بعد في هذا الملف دليل مستقل على السحب. هذا لا يعني أن الشركة لا تدفع.', payouts: '{amount} عبر {count} عملية سحب',
  trustpilot: 'Trustpilot، تم التحقق في {date}', tpWithheld: 'حجبت Trustpilot التقييم بسبب مخالفة إرشاداتها', tpReviews: '{rating}/5 من {count} مراجعة', registryNot: 'لم يُتحقق بعد من سجل الشركات في سجل أساسي.',
};

const ko: ContractAuditCopy = {
  nav: '계약 감사', eyebrow: '계약 감사 · 부분', title: '계약과 약관의 내용',
  lead: '{name}이(가) 공개한 약관, FAQ, 계약을 조항별로 읽었습니다. 이 자료는 부분적입니다. 일부 문서(주로 펀디드 또는 라이브 계약)는 읽지 못했습니다.',
  notScore: '점수에 영향 없음', levelCounter: '교차 감사 진행 중', levelFirst: '첫 문서 자료, 아직 교차 확인 전', checked: '확인일',
  rule: '프로그램별 규칙', discretion: '재량 조항', contradiction: '문서 간 모순', version: '버전과 우선 적용 문서', payout: '출금 조건', safeguard: '트레이더 보호', legal: '법인', history: '이력', evidence: '출금 증거', missing: '추가 확인 필요',
  discretionHint: '회사가 단독으로 거절·취소·변경·해석할 수 있는 조항입니다. 흔한 조항이며 악의적 사용을 뜻하지 않습니다.',
  contradictionHint: 'FAQ, 약관, 페이지 내용이 서로 다릅니다. 구매 전에 내 계좌에 적용되는 버전을 고객지원에 확인하세요.',
  evidenceHint: '출금이 이뤄졌다는 공개 증거(검증 가능성 순).', missingHint: '모르는 것은 모르는 것입니다. 누락은 좋은 신호도 나쁜 신호도 아닙니다.',
  allPrograms: '모든 프로그램 또는 미지정', source: '출처', thirdParty: '제3자 사본, 최신본 여부 미확인', hidden: '법적 약관에만 있음',
  tracker: '독립 온체인 추적(합계는 개별 트레이더와 대조되지 않음)', firm: '회사 자체 발표(독립 검증 없음)', other: '기타 출처',
  noEvidence: '이 자료에는 아직 독립적인 출금 증거가 없습니다. 회사가 지급하지 않는다는 뜻은 아닙니다.', payouts: '{count}건 출금, 총 {amount}',
  trustpilot: 'Trustpilot, {date} 확인', tpWithheld: '가이드라인 위반으로 Trustpilot이 평점 비공개', tpReviews: '리뷰 {count}개 기준 {rating}/5', registryNot: '회사 등기는 아직 1차 등기부에서 확인하지 않았습니다.',
};

const sw: ContractAuditCopy = {
  nav: 'Ukaguzi wa mikataba', eyebrow: 'Ukaguzi wa mikataba · sehemu', title: 'Mikataba na masharti yanasema nini',
  lead: 'Usomaji wa kifungu kwa kifungu wa masharti, maswali na mikataba iliyochapishwa na {name}. Faili hili si kamili: baadhi ya hati (mara nyingi mkataba wa funded au live) hazikusomeka.',
  notScore: 'Haibadilishi alama', levelCounter: 'Ukaguzi wa pili unaendelea', levelFirst: 'Faili la kwanza la nyaraka, bado halijakaguliwa tena', checked: 'Imekaguliwa',
  rule: 'Sheria kwa kila programu', discretion: 'Vifungu vya hiari ya kampuni', contradiction: 'Mikanganyiko kati ya hati', version: 'Matoleo na hati inayotangulia', payout: 'Masharti ya malipo', safeguard: 'Ulinzi wa mfanyabiashara', legal: 'Taasisi ya kisheria', history: 'Historia', evidence: 'Ushahidi wa malipo', missing: 'Bado kuthibitishwa',
  discretionHint: 'Vifungu vinavyoruhusu kampuni kuamua peke yake: kukataa, kufuta, kubadilisha au kutafsiri. Ni vya kawaida na havimaanishi nia mbaya.',
  contradictionHint: 'Maswali, masharti au kurasa hazisemi kitu kimoja. Uliza huduma kwa wateja ni toleo lipi linatumika kwa akaunti yako kabla ya kununua.',
  evidenceHint: 'Ushahidi wa umma wa malipo, kwa mpangilio wa uwezekano wa kuthibitisha.', missingHint: 'Kisichojulikana hakijulikani: kinachokosekana si ishara nzuri wala mbaya.',
  allPrograms: 'Programu zote au haijabainishwa', source: 'Chanzo', thirdParty: 'Nakala ya mtu wa tatu, haijathibitishwa kuwa ya sasa', hidden: 'Katika masharti ya kisheria pekee',
  tracker: 'Kifuatiliaji huru cha on-chain (jumla hazijalinganishwa na wafanyabiashara mmoja mmoja)', firm: 'Imeripotiwa na kampuni (haijathibitishwa kwa uhuru)', other: 'Chanzo kingine',
  noEvidence: 'Bado hakuna ushahidi huru wa malipo katika faili hili. Hii haimaanishi kuwa kampuni hailipi.', payouts: '{amount} katika malipo {count}',
  trustpilot: 'Trustpilot, imekaguliwa {date}', tpWithheld: 'Trustpilot imezuia ukadiriaji kwa ukiukaji wa miongozo', tpReviews: '{rating}/5 kutoka maoni {count}', registryNot: 'Daftari la kampuni bado halijakaguliwa katika daftari la msingi.',
};

const ha: ContractAuditCopy = {
  nav: 'Binciken kwangiloli', eyebrow: 'Binciken kwangiloli · ɓangare', title: 'Abin da kwangiloli da sharuɗɗa suka faɗa',
  lead: 'Karatun sharuɗɗa, tambayoyi da kwangilolin da {name} ta wallafa, sashe bayan sashe. Wannan fayil ba cikakke ba ne: ba a iya karanta wasu takardu ba (galibi kwangilar funded ko live).',
  notScore: 'Ba ya canza maki', levelCounter: 'Ana sake bincike', levelFirst: 'Fayil na farko, ba a sake dubawa ba tukuna', checked: 'An duba',
  rule: 'Dokoki bisa shiri', discretion: 'Sashe na ra’ayin kamfani', contradiction: 'Saɓani tsakanin takardu', version: 'Siffofi da takardar da ke da rinjaye', payout: 'Sharuɗɗan biyan kuɗi', safeguard: 'Kariyar ɗan kasuwa', legal: 'Kamfanin doka', history: 'Tarihi', evidence: 'Shaidar biyan kuɗi', missing: 'Har yanzu a tabbatar',
  discretionHint: 'Sashe da ke bai wa kamfani damar yanke shawara shi kaɗai: ƙi, soke, canza ko fassara. Sun zama ruwan dare kuma ba sa nufin mugun nufi.',
  contradictionHint: 'Tambayoyi, sharuɗɗa ko shafuka ba sa faɗin abu ɗaya. Ka tambayi tallafi wace siffa ce ta shafi asusunka kafin ka saya.',
  evidenceHint: 'Shaidun jama’a na biyan kuɗi, bisa yadda za a iya tabbatar da su.', missingHint: 'Abin da ba a sani ba, ba a sani ba: rashinsa ba alama ce mai kyau ko marar kyau ba.',
  allPrograms: 'Duk shirye-shirye ko ba a bayyana ba', source: 'Tushe', thirdParty: 'Kwafin wani ɓangare na uku, ba a tabbatar yana aiki yanzu ba', hidden: 'A cikin sharuɗɗan doka kaɗai',
  tracker: 'Mai bin diddigi mai zaman kansa a on-chain (ba a haɗa jimilla da kowane ɗan kasuwa ba)', firm: 'Kamfani ne ya bayyana (ba a tabbatar da kansa ba)', other: 'Wani tushe',
  noEvidence: 'Har yanzu babu shaidar biyan kuɗi mai zaman kanta a wannan fayil. Wannan ba ya nufin kamfanin ba ya biya.', payouts: '{amount} a biyan kuɗi {count}',
  trustpilot: 'Trustpilot, an duba {date}', tpWithheld: 'Trustpilot ta hana nuna maki saboda karya ƙa’idoji', tpReviews: '{rating}/5 daga sharhi {count}', registryNot: 'Ba a duba rajistar kamfani a cikin rajista ta farko ba tukuna.',
};

const am: ContractAuditCopy = {
  nav: 'የውል ኦዲት', eyebrow: 'የውል ኦዲት · ከፊል', title: 'ውሎቹና ደንቦቹ ምን ይላሉ',
  lead: '{name} ያወጣቸውን ደንቦች፣ ተደጋጋሚ ጥያቄዎችና ውሎች አንቀጽ በአንቀጽ ተነበዋል። ይህ ፋይል ከፊል ነው፤ አንዳንድ ሰነዶች (ብዙ ጊዜ የfunded ወይም live ውል) ሊነበቡ አልቻሉም።',
  notScore: 'ውጤቱን አይቀይርም', levelCounter: 'ተቃራኒ ኦዲት በሂደት ላይ', levelFirst: 'የመጀመሪያ የሰነድ ፋይል፣ ገና አልተረጋገጠም', checked: 'የተረጋገጠበት',
  rule: 'ደንቦች በፕሮግራም', discretion: 'በኩባንያው ፍላጎት የሚወሰኑ አንቀጾች', contradiction: 'በሰነዶች መካከል ያሉ ተቃርኖዎች', version: 'ስሪቶችና የሚገዛው ሰነድ', payout: 'የክፍያ ሁኔታዎች', safeguard: 'የነጋዴ ጥበቃዎች', legal: 'ሕጋዊ አካል', history: 'ታሪክ', evidence: 'የክፍያ ማስረጃ', missing: 'ገና የሚረጋገጥ',
  discretionHint: 'ኩባንያው ብቻውን እንዲወስን የሚፈቅዱ አንቀጾች፦ መከልከል፣ መሰረዝ፣ መቀየር ወይም መተርጎም። የተለመዱ ናቸው፤ መጥፎ ዓላማ ማለት አይደለም።',
  contradictionHint: 'ተደጋጋሚ ጥያቄዎቹ፣ ደንቦቹ ወይም ገጾቹ አንድ ነገር አይሉም። ከመግዛትዎ በፊት ለመለያዎ የሚመለከተውን ስሪት ድጋፍ ሰጪውን ይጠይቁ።',
  evidenceHint: 'ክፍያ መፈጸሙን የሚያሳዩ ይፋ ማስረጃዎች፣ በሚረጋገጡበት መጠን።', missingHint: 'ያልታወቀ ያልታወቀ ነው፤ የጎደለ ነገር ጥሩም መጥፎም ምልክት አይደለም።',
  allPrograms: 'ሁሉም ፕሮግራሞች ወይም ያልተገለጸ', source: 'ምንጭ', thirdParty: 'የሶስተኛ ወገን ቅጂ፣ የአሁኑ መሆኑ አልተረጋገጠም', hidden: 'በሕጋዊ ደንቦች ውስጥ ብቻ',
  tracker: 'ገለልተኛ የon-chain መከታተያ (ድምሮቹ ከእያንዳንዱ ነጋዴ ጋር አልተዛመዱም)', firm: 'በኩባንያው የተገለጸ (በገለልተኛ ወገን ያልተረጋገጠ)', other: 'ሌላ ምንጭ',
  noEvidence: 'በዚህ ፋይል ውስጥ ገና ገለልተኛ የክፍያ ማስረጃ አልተመዘገበም። ይህ ኩባንያው አይከፍልም ማለት አይደለም።', payouts: 'በ{count} ክፍያዎች {amount}',
  trustpilot: 'Trustpilot፣ {date} የተረጋገጠ', tpWithheld: 'Trustpilot መመሪያ በመጣሱ ደረጃውን ከልክሏል', tpReviews: 'ከ{count} ግምገማዎች {rating}/5', registryNot: 'የኩባንያ መዝገቡ ገና በዋና መዝገብ አልተረጋገጠም።',
};

const COPY: Record<Locale, ContractAuditCopy> = { en, fr, de, it, es, pt, zh, ja, hi, tr, ar, ko, sw, ha, am };

export function contractAuditCopy(locale: Locale): ContractAuditCopy {
  return COPY[locale] ?? en;
}
