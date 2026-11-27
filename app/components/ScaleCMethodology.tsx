import type { Locale } from '../lib/locales';
import { fmt } from '../lib/messages';
import { scaleCCopy } from '../lib/scaleCI18n';
import type { ScaleCCode, ScaleCTier } from '../lib/scaleC';

const COPY: Record<Locale, [string,string,string,string,string,string]> = {
  "en": [
    "Scale C — current scoring method",
    "Published Scale C files: {count}/{total}. Full contract reading: {full}/{total}. Remaining profiles retain the earlier score with applicable audit and historical safeguards.",
    "B1 replaces B2/B2A. Contract deductions are capped at 30; consistency and D together at 15. Consistency: double if a payout is lost, halve if evaluation-only. Routine verification, reasonable minima, static or evaluation-only drawdown, and genuine live transitions preserving earned and pending gains: 0.",
    "Temporary payout caps: ratio of cap to initial funded loss budget (same programme and cohort). If 50% or less of profit is withdrawable: minimum 2 points; fixed interval over 14 calendar days adds 1, up to 4, without double counting. Permanent loss of excess or hard lifetime cap: 4.",
    "Trustpilot: no rating without a documented notice = 0. For rating penalties: <30 reviews = 0; 30–99 = half, rounded up. No stacking with withheld-rating notice. Evidence for ceiling: ≥$10M tracked payouts, published statistics with method or ≥4.0/5 from ≥5,000 reviews; very large evidence: ≥$100M tracked or ≥4.5/5 from ≥20,000 reviews. Reviews are a reputation proxy, not verified transfers.",
    "Unverified facts cost no points. Excerpt-only revisions cannot increase a score and can lower it by at most 10. Until full reading, open firms are capped at 60. Historical holds remain; affiliation does not influence scores."
  ],
  "fr": [
    "Barème C — méthode de notation actuelle",
    "Dossiers publiés selon C : {count}/{total}. Contrats lus intégralement : {full}/{total}. Les autres fiches conservent leur ancienne note avec les garde-fous d’audit et d’historique applicables.",
    "B1 remplace B2/B2A. Malus contractuels plafonnés à 30 ; consistency et D ensemble à 15. Consistency : doublement si le retrait est perdu, moitié si évaluation seule. Vérification ordinaire, minimum raisonnable, drawdown statique ou limité à l’évaluation et passage réel en live préservant les gains acquis et en attente : 0.",
    "Plafond temporaire : rapport plafond / budget de perte initial en phase financée (même programme et cohorte). Si 50 % ou moins du bénéfice est retirable : minimum 2 points ; intervalle fixe supérieur à 14 jours calendaires : +1, maximum 4, sans doublon. Perte définitive de l’excédent ou plafond cumulatif dur : 4.",
    "Trustpilot : absence de note sans avertissement documenté = 0. Pour les malus de note : moins de 30 avis = 0 ; 30–99 = moitié arrondie au supérieur. Aucun cumul avec la note retirée. Plafond éditorial : ≥10 M$ suivis, statistiques publiées avec méthode ou ≥4/5 sur ≥5 000 avis ; preuve très large : ≥100 M$ suivis ou ≥4,5/5 sur ≥20 000 avis. Les avis sont un indicateur de réputation, pas des transferts vérifiés.",
    "Les faits non vérifiés ne coûtent rien. Une lecture partielle ne permet pas de hausse et limite la baisse à 10 points. Avant lecture complète, les firmes ouvertes sont plafonnées à 60. Les garde-fous historiques restent en vigueur ; l’affiliation ne change pas les notes."
  ],
  "de": [
    "Skala C — aktuelle Bewertungsmethode",
    "C-Dossiers: {count}/{total}. Vollständig gelesene Verträge: {full}/{total}. Übrige Profile behalten die bisherige Bewertung mit geltenden Prüf- und Historien-Schutzregeln.",
    "B1 ersetzt B2/B2A. Vertragsabzüge maximal 30; Konsistenz und D zusammen maximal 15. Konsistenz: doppelt bei Auszahlungsverlust, halbiert nur in der Evaluation. Normale Prüfungen, angemessene Mindestbeträge, statischer oder reiner Evaluations-Drawdown und echter Live-Wechsel mit Erhalt erworbener Ansprüche: 0.",
    "Temporäres Limit: Verhältnis zum anfänglichen Funded-Verlustbudget im gleichen Programm und Jahrgang. Maximal 50 % des Gewinns auszahlbar: mindestens 2 Punkte; festes Intervall über 14 Kalendertage +1 bis maximal 4, ohne Doppelzählung. Dauerhafter Verlust oder kumulatives Limit: 4.",
    "Trustpilot: fehlende Bewertung ohne dokumentierten Hinweis = 0. Unter 30 Bewertungen = 0; 30–99: halber Abzug, aufgerundet. Keine Addition mit ausgeblendeter Bewertung. Nachweise: ≥10 Mio. USD verfolgt, veröffentlichte Statistik mit Methode oder ≥4,0 bei ≥5.000 Bewertungen; sehr groß: ≥100 Mio. USD oder ≥4,5 bei ≥20.000. Bewertungen sind Reputationssignale, keine bestätigten Überweisungen.",
    "Ungeprüfte Fakten kosten nichts. Auszüge erlauben keine Erhöhung, Absenkung höchstens 10. Offene Firmen ohne vollständige Lektüre maximal 60. Historische Schutzregeln bleiben; Affiliate-Links beeinflussen keine Bewertung."
  ],
  "it": [
    "Scala C — metodo di valutazione attuale",
    "Schede C: {count}/{total}. Contratti letti integralmente: {full}/{total}. Le altre schede mantengono il punteggio precedente con le salvaguardie applicabili.",
    "B1 sostituisce B2/B2A. Penalità contrattuali massimo 30; consistenza e D insieme massimo 15. Consistenza: doppia se si perde il pagamento, metà solo in valutazione. Verifiche normali, minimi ragionevoli, drawdown statico o solo in valutazione e passaggio live reale con diritti maturati preservati: 0.",
    "Tetto temporaneo: rapporto con il budget di perdita iniziale funded, stesso programma e coorte. Prelevabile al massimo il 50% del profitto: almeno 2 punti; intervallo fisso oltre 14 giorni +1 fino a 4, senza doppio conteggio. Perdita permanente o tetto cumulativo rigido: 4.",
    "Trustpilot: nessuna valutazione senza avviso documentato = 0. Meno di 30 recensioni = 0; 30–99 metà arrotondata per eccesso. Nessun cumulo con voto sospeso. Prove: ≥10 M$ tracciati, statistiche con metodo o ≥4,0 su ≥5.000 recensioni; molto ampie: ≥100 M$ o ≥4,5 su ≥20.000. Le recensioni indicano reputazione, non trasferimenti verificati.",
    "Fatti non verificati: 0. Estratti: nessun aumento, riduzione massima 10. Imprese aperte senza lettura completa: massimo 60. Restano le salvaguardie storiche; affiliazioni senza effetto."
  ],
  "es": [
    "Escala C — método de puntuación actual",
    "Fichas C: {count}/{total}. Contratos leídos íntegramente: {full}/{total}. Las restantes conservan la nota anterior con las salvaguardas aplicables.",
    "B1 sustituye B2/B2A. Penalizaciones contractuales máximo 30; consistencia y D juntas máximo 15. Consistencia: doble si se pierde el pago, mitad solo en evaluación. Verificaciones normales, mínimos razonables, drawdown estático o solo de evaluación y paso real a live conservando derechos adquiridos: 0.",
    "Límite temporal: proporción respecto al presupuesto inicial de pérdida financiada del mismo programa y cohorte. Si se retira como máximo el 50% del beneficio: mínimo 2 puntos; intervalo fijo superior a 14 días +1 hasta 4, sin duplicar. Pérdida definitiva o límite acumulado rígido: 4.",
    "Trustpilot: sin nota ni aviso documentado = 0. Menos de 30 reseñas = 0; 30–99 mitad redondeada hacia arriba. No se acumula con nota retirada. Prueba: ≥10 M$ rastreados, estadísticas con método o ≥4,0 con ≥5.000 reseñas; muy amplia: ≥100 M$ o ≥4,5 con ≥20.000. Las reseñas indican reputación, no transferencias verificadas.",
    "Hechos no verificados: 0. Lectura parcial: sin aumento y reducción máxima 10. Firmas abiertas sin lectura completa: máximo 60. Se conservan salvaguardas históricas; la afiliación no altera notas."
  ],
  "pt": [
    "Escala C — método de avaliação atual",
    "Fichas C: {count}/{total}. Contratos lidos integralmente: {full}/{total}. As restantes mantêm a nota anterior com as salvaguardas aplicáveis.",
    "B1 substitui B2/B2A. Penalidades contratuais até 30; consistência e D juntas até 15. Consistência: dobro se perder o saque, metade apenas na avaliação. Verificação normal, mínimos razoáveis, drawdown estático ou só na avaliação e transição real para live preservando direitos adquiridos: 0.",
    "Teto temporário: razão face ao orçamento inicial de perda financiada, mesmo programa e coorte. Até 50% do lucro disponível: mínimo 2 pontos; intervalo fixo superior a 14 dias +1 até 4, sem duplicação. Perda permanente ou limite cumulativo rígido: 4.",
    "Trustpilot: sem nota nem aviso documentado = 0. Menos de 30 avaliações = 0; 30–99 metade arredondada para cima. Sem acumular com nota retirada. Evidência: ≥10 M$ rastreados, estatísticas com método ou ≥4,0 em ≥5.000 avaliações; muito ampla: ≥100 M$ ou ≥4,5 em ≥20.000. Avaliações indicam reputação, não transferências verificadas.",
    "Factos não verificados: 0. Leitura parcial: sem aumento, redução máxima 10. Firmas abertas sem leitura completa: máximo 60. Salvaguardas históricas mantidas; afiliação não altera notas."
  ],
  "zh": [
    "C评分标准 — 当前方法",
    "已发布C档案：{count}/{total}。完整阅读合同：{full}/{total}。其他档案仍使用旧评分及适用审核和历史保障措施。",
    "B1取代B2/B2A。合同扣分上限30；一致性与D合计上限15。一致性：导致提款丧失则加倍，仅考核阶段减半。常规审核、合理最低提款、静态或仅考核回撤、保留已取得及待付收益的真实实盘过渡：0。",
    "临时提款上限：与同一项目和批次初始资助损失预算之比。最多提取50%收益则至少扣2分；固定间隔超过14天加1分，最多4分且不重复计分。永久丧失超额收益或硬性累计上限扣4分。",
    "Trustpilot：无评分且无记录的警告为0；少于30条评论为0，30–99条减半向上取整。与隐藏评分不叠加。证据：追踪≥1000万美元、公开带方法的统计或≥5000条评论且≥4.0；超大规模：追踪≥1亿美元或≥20000条且≥4.5。评论是声誉指标，不是已验证转账。",
    "未经验证的事实不扣分。部分阅读不加分，最多降10分。营业中且未完整阅读的公司最高60分。历史保障仍适用；联盟关系不影响评分。"
  ],
  "ja": [
    "スケールC — 現行評価方法",
    "C公開済み：{count}/{total}。契約全文確認済み：{full}/{total}。残りは従来の評価と適用される監査・履歴上の保護措置を維持。",
    "B1はB2/B2Aに代わる。契約減点上限30、一貫性とD合計15。一貫性：出金失効時は2倍、評価のみは半分。通常の確認、合理的最低額、固定または評価のみのドローダウン、獲得済み・未払い利益を保護する実口座移行は0。",
    "一時上限：同じプログラム・契約世代の初期資金提供時損失予算との比率。利益の50%以下のみ出金可能なら最低2点。固定間隔14日超は+1、最大4、二重計上なし。利益の永久喪失または厳格な累積上限は4。",
    "Trustpilot：文書化された警告なしで評価なしは0。30件未満0、30–99件は半分切り上げ。評価非表示との重複なし。証拠：追跡1000万ドル以上、方法付き公開統計、または5000件以上で4.0以上。非常に大規模：1億ドル以上または20000件以上で4.5以上。レビューは評判の指標で送金確認ではない。",
    "未確認の事実は減点なし。抜粋確認は増点不可、減点最大10。全文未確認の営業中企業は60点上限。履歴保護維持。提携は評価に影響しない。"
  ],
  "hi": [
    "स्केल C — वर्तमान स्कोरिंग विधि",
    "प्रकाशित C फ़ाइलें: {count}/{total}। पूरे अनुबंध पढ़े गए: {full}/{total}। शेष पर पुराने स्कोर और लागू ऑडिट/ऐतिहासिक सुरक्षा कायम हैं।",
    "B1, B2/B2A की जगह लेता है। अनुबंध कटौती अधिकतम 30; कंसिस्टेंसी और D मिलाकर 15। कंसिस्टेंसी: भुगतान खोने पर दोगुनी, केवल मूल्यांकन में आधी। सामान्य सत्यापन, उचित न्यूनतम, स्थिर या केवल मूल्यांकन ड्रॉडाउन और अर्जित/लंबित लाभ सुरक्षित रखते हुए वास्तविक लाइव बदलाव: 0।",
    "अस्थायी निकासी सीमा: समान प्रोग्राम/खाता समूह के प्रारंभिक फंडेड नुकसान बजट से अनुपात। लाभ का अधिकतम 50% निकासी हो तो कम से कम 2 अंक; 14 दिनों से लंबा निश्चित अंतराल +1, अधिकतम 4, दोहरी गणना नहीं। स्थायी हानि या कठोर कुल सीमा: 4।",
    "Trustpilot: दर्ज चेतावनी के बिना रेटिंग नहीं = 0; 30 से कम समीक्षाएँ 0; 30–99 आधी कटौती ऊपर की ओर पूर्णांक। रोकी गई रेटिंग से नहीं जुड़ती। प्रमाण: ≥$10M ट्रैक, विधि सहित प्रकाशित आँकड़े या ≥5,000 समीक्षाओं पर ≥4.0; बहुत बड़ा: ≥$100M या ≥20,000 पर ≥4.5। समीक्षाएँ प्रतिष्ठा का संकेत हैं, सत्यापित हस्तांतरण नहीं।",
    "असत्यापित तथ्यों पर 0। आंशिक पढ़ाई में बढ़ोतरी नहीं, गिरावट अधिकतम 10। खुले अपूर्ण अनुबंध वाली फर्म अधिकतम 60। ऐतिहासिक सुरक्षा कायम; संबद्धता स्कोर नहीं बदलती।"
  ],
  "tr": [
    "C ölçeği — güncel puanlama yöntemi",
    "Yayımlanan C dosyaları: {count}/{total}. Tam okunan sözleşmeler: {full}/{total}. Kalan profiller eski puanı ve geçerli denetim/tarihsel güvenceleri korur.",
    "B1, B2/B2A yerine geçer. Sözleşme kesintileri en çok 30; tutarlılık ve D toplamı 15. Tutarlılık: ödeme kaybında iki kat, yalnız değerlendirmede yarısı. Normal doğrulama, makul asgari tutar, sabit/değerlendirmeye özgü düşüş ve kazanılmış hakları koruyan gerçek canlı geçiş: 0.",
    "Geçici çekim sınırı: aynı program ve hesap grubunun başlangıç fonlu kayıp bütçesine oran. Kârın en fazla %50’si çekilebiliyorsa en az 2; 14 günü aşan sabit aralık +1, en çok 4, çift sayım yok. Kalıcı kayıp veya katı toplam sınır: 4.",
    "Trustpilot: belgeli uyarı yoksa puan yok = 0. 30’dan az yorum 0; 30–99 yarısı yukarı yuvarlanır. Gizli puanla birleşmez. Kanıt: ≥10 milyon $ izlenen, yöntemi açıklanan istatistik veya ≥5.000 yorumda ≥4,0; çok büyük: ≥100 milyon $ veya ≥20.000 yorumda ≥4,5. Yorumlar itibar göstergesi, doğrulanmış transfer değildir.",
    "Doğrulanmamış olgu 0. Kısmi okuma artışa izin vermez, düşüş en çok 10. Tam okunmamış açık firmalar en çok 60. Tarihsel korumalar devam eder; ortaklık puanı değiştirmez."
  ],
  "ar": [
    "المقياس C — طريقة التقييم الحالية",
    "ملفات C المنشورة: {count}/{total}. العقود المقروءة بالكامل: {full}/{total}. تحتفظ الملفات الأخرى بالتقييم السابق وضوابط التدقيق والسجل المطبقة.",
    "تحل B1 محل B2/B2A. سقف خصومات العقد 30؛ الاتساق وD معًا 15. الاتساق يضاعف عند فقدان السحب ويخفض للنصف في التقييم فقط. التحقق العادي والحد الأدنى المعقول وحد الخسارة الثابت أو في التقييم فقط والانتقال الحقيقي إلى حساب حي مع حفظ الأرباح المكتسبة والمعلقة: 0.",
    "السقف المؤقت: نسبته إلى ميزانية الخسارة الممولة الأولية لنفس البرنامج والدفعة. سحب 50% من الربح أو أقل: نقطتان على الأقل؛ فترة ثابتة تتجاوز 14 يومًا +1 حتى 4 دون ازدواج. خسارة الفائض نهائيًا أو سقف تراكمي صارم: 4.",
    "Trustpilot: غياب التقييم دون إشعار موثق = 0. أقل من 30 مراجعة = 0؛ 30–99 نصف الخصم مقربًا للأعلى. لا جمع مع حجب التقييم. الأدلة: ≥10 ملايين دولار متتبعة أو إحصاءات بمنهجية أو ≥4.0 من ≥5000 مراجعة؛ واسعة جدًا: ≥100 مليون أو ≥4.5 من ≥20000. المراجعات مؤشر سمعة وليست تحويلات مؤكدة.",
    "الوقائع غير المتحققة لا تخصم نقاطًا. القراءة الجزئية لا ترفع التقييم وتخفضه بحد أقصى 10. الشركات المفتوحة دون قراءة كاملة سقفها 60. تبقى الضوابط التاريخية؛ الشراكة لا تغير التقييم."
  ],
  "ko": [
    "C 척도 — 현재 평가 방식",
    "공개된 C 파일: {count}/{total}. 계약 전문 확인: {full}/{total}. 나머지는 기존 점수와 적용되는 감사·과거 기록 보호 조치를 유지한다.",
    "B1은 B2/B2A를 대체한다. 계약 감점 최대 30, 일관성 및 D 합계 15. 일관성: 출금 상실 시 두 배, 평가 단계만 적용 시 절반. 일반 확인, 합리적 최소액, 고정 또는 평가 단계만의 드로다운, 획득·대기 수익을 보존한 실제 라이브 전환: 0.",
    "임시 한도: 동일 프로그램과 계정 집단의 최초 펀딩 손실 예산 대비 비율. 수익의 50% 이하 출금 가능 시 최소 2점, 고정 간격 14일 초과 시 +1, 최대 4, 중복 없음. 초과 수익 영구 상실 또는 엄격한 누적 한도: 4.",
    "Trustpilot: 기록된 경고 없이 평점 없음 = 0. 리뷰 30개 미만 0, 30–99개 절반 올림. 평점 보류와 중복 없음. 증거: 추적 ≥1천만 달러, 방법 공개 통계 또는 ≥5천 리뷰에 ≥4.0; 매우 큰 규모: ≥1억 달러 또는 ≥2만 리뷰에 ≥4.5. 리뷰는 평판 지표이지 검증된 송금이 아니다.",
    "미확인 사실 감점 없음. 부분 검토는 상승 불가, 하락 최대 10. 전문 미확인 운영 업체 상한 60. 과거 보호 조치 유지, 제휴는 점수에 영향 없음."
  ],
  "sw": [
    "Kipimo C — mbinu ya sasa",
    "Faili za C zilizochapishwa: {count}/{total}. Mikataba iliyosomwa yote: {full}/{total}. Zilizobaki zina alama za awali na kinga zinazotumika.",
    "B1 inachukua nafasi ya B2/B2A. Makato ya mkataba hadi 30; uthabiti na D pamoja hadi 15. Uthabiti: mara mbili ikiwa malipo yanapotea, nusu ikiwa tathmini pekee. Uthibitishaji wa kawaida, kiwango cha chini kinachofaa, drawdown isiyobadilika au ya tathmini pekee na mpito halisi wa live unaohifadhi haki zilizopatikana: 0.",
    "Kikomo cha muda: uwiano na bajeti ya hasara ya awali ya ufadhili katika programu na kundi lilelile. Ikiwa faida inayoweza kutolewa ni 50% au chini: angalau pointi 2; muda maalum zaidi ya siku 14 +1 hadi 4 bila kuhesabu mara mbili. Kupoteza ziada kabisa au kikomo kigumu cha jumla: 4.",
    "Trustpilot: bila alama wala onyo lililorekodiwa = 0. Maoni chini ya 30 = 0; 30–99 nusu ikizungushwa juu. Haijumlishwi na alama iliyofichwa. Ushahidi: ≥$10M iliyofuatiliwa, takwimu zenye mbinu au ≥4.0 kutoka maoni ≥5,000; mkubwa sana: ≥$100M au ≥4.5 kutoka ≥20,000. Maoni yanaonyesha sifa, si uhamisho uliothibitishwa.",
    "Mambo yasiyothibitishwa hayapunguzi pointi. Usomaji sehemu hauongezi alama, hupunguza hadi 10. Kampuni zilizo wazi bila usomaji kamili zina kikomo cha 60. Kinga za historia zinabaki; ushirika haubadili alama."
  ],
  "ha": [
    "Ma'aunin C — hanyar lissafi ta yanzu",
    "Fayilolin C da aka wallafa: {count}/{total}. Kwangilolin da aka karanta gaba ɗaya: {full}/{total}. Sauran suna riƙe tsoffin maki da dokokin kariya.",
    "B1 ya maye gurbin B2/B2A. Ragin kwangila bai wuce 30 ba; daidaito da D tare 15. Daidaito: ninki biyu idan an rasa biya, rabi idan tantancewa kaɗai. Tabbatarwa ta yau da kullum, mafi ƙarancin cirewa mai ma'ana, drawdown tsayayye ko na tantancewa kaɗai da canjin live na gaske da kare haƙƙin da aka samu: 0.",
    "Iyaka ta wucin gadi: rabo da kasafin asarar farko na funded a shiri da rukuni ɗaya. Idan ana cire 50% na riba ko ƙasa: aƙalla maki 2; tazarar da ta wuce kwanaki 14 +1 zuwa 4, ba sau biyu ba. Rasa rarar dindindin ko tsayayyen iyakar jimilla: 4.",
    "Trustpilot: babu maki ba tare da gargadin da aka rubuta ba = 0. Ra'ayoyi ƙasa da 30 = 0; 30–99 rabin ragi a zagaye sama. Ba a haɗa da ɓoyayyen maki. Shaida: ≥$10M da aka bi diddigi, ƙididdiga da hanya ko ≥4.0 daga ra'ayoyi ≥5,000; mai girma sosai: ≥$100M ko ≥4.5 daga ≥20,000. Ra'ayoyi alamar suna ne, ba tabbataccen canja kuɗi ba.",
    "Abubuwan da ba a tabbatar ba ba sa rage maki. Karatun sashe ba ya ƙara maki, ragewa iyaka 10. Kamfanoni masu aiki ba tare da cikakken karatu ba iyaka 60. Kariyar tarihi tana nan; alaƙar kasuwanci ba ta sauya maki."
  ],
  "am": [
    "የC መለኪያ — የአሁኑ የነጥብ ዘዴ",
    "የታተሙ የC ፋይሎች፦ {count}/{total}። ሙሉ በሙሉ የተነበቡ ውሎች፦ {full}/{total}። ቀሪዎቹ የቀድሞ ውጤትና የኦዲት/ታሪክ ጥበቃን ይይዛሉ።",
    "B1 B2/B2Aን ይተካል። የውል ቅናሽ እስከ 30፤ consistency እና D በድምሩ 15። ክፍያ ሲጠፋ consistency እጥፍ፣ በግምገማ ብቻ ግማሽ። መደበኛ ማረጋገጫ፣ ተመጣጣኝ ዝቅተኛ ክፍያ፣ ቋሚ ወይም የግምገማ ብቻ የኪሳራ ወሰን፣ የተገኘ መብትን የሚጠብቅ እውነተኛ live ሽግግር፦ 0።",
    "ጊዜያዊ የክፍያ ወሰን፦ ከተመሳሳይ ፕሮግራምና ቡድን የመነሻ ኪሳራ በጀት ጋር ሬሾ። 50% ወይም ከዚያ በታች ትርፍ ክፍያ፦ ቢያንስ 2፤ ከ14 ቀናት በላይ ቋሚ ክፍተት +1 እስከ 4፣ ሁለት ጊዜ አይቆጠርም። ዘላቂ የትርፍ መጥፋት ወይም ጥብቅ ጠቅላላ ወሰን፦ 4።",
    "Trustpilot፦ የተመዘገበ ማስጠንቀቂያ የሌለው የጠፋ ደረጃ = 0። ከ30 ግምገማ በታች 0፤ 30–99 ግማሽ ወደ ላይ ተጠጋግቶ። ከተደበቀ ደረጃ ጋር አይደመርም። ማስረጃ፦ ≥$10M የተከታተለ፣ ዘዴው የታተመ ስታቲስቲክስ ወይም ≥4.0 ከ≥5,000 ግምገማ፤ እጅግ ሰፊ፦ ≥$100M ወይም ≥4.5 ከ≥20,000። ግምገማ የዝና ምልክት እንጂ የተረጋገጠ ዝውውር አይደለም።",
    "ያልተረጋገጠ ነገር ነጥብ አይቀንስም። ከፊል ንባብ ጭማሪ አያስፈቅድም፣ ቅናሽ እስከ 10። ሙሉ ውል ያልተነበበ ክፍት ድርጅት ወሰን 60። የታሪክ ጥበቃ ይቀጥላል፤ ሽርክና ውጤት አይለውጥም።"
  ]
};

const TIERS: [ScaleCTier, number, number][] = [
  ['lt1', 0, 55], ['y1to2', 1, 65], ['y2plus', 2, 75],
  ['y3evidence', 3, 85], ['y5evidence', 5, 95], ['y8veryLarge', 8, 98],
];
const PENALTIES: [ScaleCCode, string][] = [
  ['A1','−40'], ['A1_OLD_UNCLEAR','−15'], ['A2ISO','−5'],
  ['B1','−15'], ['B2','−8'], ['B2A','−4'], ['B3','−5'], ['B4','−3'],
  ['B5','−3'], ['B6','−5'], ['B7','−5'],
  ['CONS','≥40%: 0 · 30–39%: −2 · 20–29%: −5 · <20%: −8'],
  ['D_PAYOUT_CAP','≥1: −1 · 0.5–<1: −2 · >0.2–<0.5: −3 · ≤0.2: −4'],
  ['D_PAYOUT_CONDITIONS','−3'], ['D_FUNDED_TRAILING_DRAWDOWN','EOD −1 · Intraday −2'],
  ['D_ACCOUNT_ENDS_AFTER_PAYOUTS','−3'], ['D_SPLIT_REDUCTION','−2'],
  ['E_HARSH','−2'], ['TPW','−10'],
  ['TPMID','4.0–5.0: 0 · 3.5–<4.0: −3 · 3.0–<3.5: −6'],
  ['TPR','<3.0: −10'], ['REGWARN','−5 · RBI 0'],
];

/** Public explanation of the current SCORING.md policy, not the legacy score pipeline. */
export default function ScaleCMethodology({ locale, count, full, total }: {locale: Locale; count: number; full: number; total: number}) {
  const cc = scaleCCopy(locale);
  const [title, coverage, contract, cap, trustpilot, gates] = COPY[locale] ?? COPY.en;
  return (
    <section className="section" id="scale-c" aria-labelledby="scale-c-title">
      <article className="panel audit-method-panel">
        <h2 id="scale-c-title">{title}</h2>
        <p><time dateTime="2026-11-27">2026-11-27</time> · {fmt(coverage,{count,full,total})}</p>
        <ol>{cc.method.map(line => <li key={line}>{line}</li>)}</ol>
        <h3>{cc.ceiling}</h3>
        <ul>{TIERS.map(([tier,age,value]) => <li key={tier}>{fmt(cc.tiers[tier], {age: age >= 2 ? '≥' + age : age})} — <strong>{value}/100</strong></li>)}</ul>
        <h3>{cc.lost}</h3>
        <dl>{PENALTIES.map(([code,weight]) => <div key={code} style={{display:'flex',justifyContent:'space-between',gap:'1rem',padding:'.5rem 0',borderBottom:'1px solid var(--border, #555)'}}><dt>{cc.codes[code]}</dt><dd style={{margin:0,textAlign:'end',fontVariantNumeric:'tabular-nums'}}>{weight}</dd></div>)}</dl>
        {[contract,cap,trustpilot,gates].map(line => <p key={line}>{line}</p>)}
      </article>
    </section>
  );
}
