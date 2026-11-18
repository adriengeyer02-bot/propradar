import type { Locale } from './locales';

type OptionsCopy = {
  nav: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  introTitle: string;
  intro: string;
  evaluation: string;
  professional: string;
  noScore: string;
  noScoreNotice: string;
  instruments: string;
  programme: string;
  rules: string;
  officialSource: string;
  caution: string;
  updated: string;
  dossier: string;
  officialSite: string;
  returnHub: string;
  compareLink: string;
  radarLink: string;
  methodTitle: string;
  method: string;
};

const translations: Record<Locale, OptionsCopy> = {
  en: {
    nav: 'Options', title: 'Options prop firms: independent research', subtitle: 'Listed calls, puts and spreads are a different market from futures and CFDs. Explore verified programme descriptions before judging risk.', eyebrow: 'New market · research watchlist',
    introTitle: 'A separate market, a separate audit', intro: 'An options prop firm may offer simulated evaluations on listed US stock, ETF or index options. Professional trading desks are a different business model. A firm offering futures does not necessarily allow options on futures.',
    evaluation: 'Retail evaluation programmes', professional: 'Professional trading desks', noScore: 'Not rated', noScoreNotice: 'These firms are listed for discovery only. No PropRadar score, payout endorsement or recommendation has been issued. Each dossier needs a full legal, payout and programme-rule audit.',
    instruments: 'Instruments', programme: 'Programme', rules: 'Documented programme rules', officialSource: 'Official source', caution: 'What remains unverified', updated: 'Source check', dossier: 'Read dossier', officialSite: 'Official website', returnHub: 'All options firms', compareLink: 'Main comparator', radarLink: 'See the globe', methodTitle: 'Why no numeric ratings yet?', method: 'Our independent 100-point framework requires evidence on legal entities, payout terms and independent payout verification, customer feedback, products and restrictive clauses. Until that work is complete, a score would mislead visitors.',
  },
  fr: {
    nav: 'Options', title: 'Prop firms d’options : enquête indépendante', subtitle: 'Les CALL, PUT et spreads cotés sont différents des Futures et des CFD. Explorez les programmes documentés avant d’évaluer les risques.', eyebrow: 'Nouveau marché · liste de surveillance',
    introTitle: 'Un marché différent, un audit distinct', intro: 'Certaines prop firms proposent des évaluations simulées sur des options américaines cotées (actions, ETF, indices). Les desks professionnels fonctionnent autrement. Une firme Futures n’autorise pas nécessairement les options sur Futures.',
    evaluation: 'Challenges et évaluations pour particuliers', professional: 'Desks de trading professionnels', noScore: 'Non notée', noScoreNotice: 'Ces entreprises sont présentées à titre documentaire. PropRadar ne leur attribue encore aucune note, ne certifie aucun paiement et ne les recommande pas. Un audit juridique, financier et contractuel approfondi reste nécessaire.',
    instruments: 'Instruments', programme: 'Programme', rules: 'Règles documentées du programme', officialSource: 'Source officielle', caution: 'Points restant à vérifier', updated: 'Sources vérifiées le', dossier: 'Voir la fiche', officialSite: 'Site officiel', returnHub: 'Toutes les firmes d’options', compareLink: 'Comparateur principal', radarLink: 'Voir le globe', methodTitle: 'Pourquoi pas encore de notes ?', method: 'Notre barème indépendant sur 100 exige des preuves sur les entités juridiques, les conditions et la réalité des paiements, les avis, les produits et les clauses contraignantes. Une note sans cet audit pourrait induire les visiteurs en erreur.',
  },
  de: {
    nav: 'Optionen', title: 'Options-Prop-Firmen: unabhängige Recherche', subtitle: 'Börsengehandelte Calls, Puts und Spreads unterscheiden sich von Futures und CFDs. Hier finden Sie dokumentierte Programme.', eyebrow: 'Neuer Markt · Beobachtungsliste',
    introTitle: 'Ein anderer Markt, eine eigene Prüfung', intro: 'Einige Firmen bieten simulierte Bewertungen für US-Aktien-, ETF- und Indexoptionen an. Professionelle Trading-Desks arbeiten anders. Futures-Angebote schließen Optionen nicht automatisch ein.',
    evaluation: 'Evaluierungsprogramme', professional: 'Professionelle Trading-Desks', noScore: 'Noch nicht bewertet', noScoreNotice: 'Diese Firmen werden nur zur Recherche aufgeführt. Es gibt noch keine PropRadar-Bewertung, Auszahlungsbestätigung oder Empfehlung.', instruments: 'Instrumente', programme: 'Programm', rules: 'Dokumentierte Regeln', officialSource: 'Offizielle Quelle', caution: 'Noch zu prüfen', updated: 'Quellenprüfung', dossier: 'Profil ansehen', officialSite: 'Offizielle Website', returnHub: 'Alle Options-Firmen', compareLink: 'Hauptvergleich', radarLink: 'Globus ansehen', methodTitle: 'Warum noch keine Bewertung?', method: 'Unser 100-Punkte-System benötigt geprüfte Informationen zu Rechtsträgern, Auszahlungen, Kundenfeedback und Vertragsbedingungen.',
  },
  it: {
    nav: 'Opzioni', title: 'Prop firm di opzioni: ricerca indipendente', subtitle: 'Call, put e spread quotati sono diversi da futures e CFD. Esplora i programmi documentati.', eyebrow: 'Nuovo mercato · osservatorio',
    introTitle: 'Un mercato diverso, un audit dedicato', intro: 'Alcune società offrono valutazioni simulate su opzioni USA relative ad azioni, ETF e indici. I desk professionali adottano un modello differente.',
    evaluation: 'Programmi di valutazione', professional: 'Desk professionali', noScore: 'Non valutata', noScoreNotice: 'Queste società sono elencate solo a scopo informativo. Nessun punteggio, verifica dei pagamenti o raccomandazione PropRadar è stata emessa.', instruments: 'Strumenti', programme: 'Programma', rules: 'Regole documentate', officialSource: 'Fonte ufficiale', caution: 'Da verificare', updated: 'Fonti verificate', dossier: 'Apri scheda', officialSite: 'Sito ufficiale', returnHub: 'Tutte le società di opzioni', compareLink: 'Comparatore', radarLink: 'Apri il globo', methodTitle: 'Perché nessun punteggio?', method: 'Il nostro metodo a 100 punti richiede verifiche su entità legali, pagamenti, opinioni dei trader e regole contrattuali.',
  },
  es: {
    nav: 'Opciones', title: 'Prop firms de opciones: investigación independiente', subtitle: 'Las calls, puts y spreads cotizados son distintos de los futuros y CFD. Explora los programas documentados.', eyebrow: 'Nuevo mercado · seguimiento',
    introTitle: 'Otro mercado, otra auditoría', intro: 'Algunas firmas ofrecen evaluaciones simuladas de opciones estadounidenses sobre acciones, ETF e índices. Las mesas profesionales utilizan otro modelo.',
    evaluation: 'Programas de evaluación', professional: 'Mesas profesionales', noScore: 'Sin calificar', noScoreNotice: 'Estas firmas figuran solo con fines informativos. PropRadar todavía no les asigna nota ni verifica pagos y no las recomienda.', instruments: 'Instrumentos', programme: 'Programa', rules: 'Reglas documentadas', officialSource: 'Fuente oficial', caution: 'Pendiente de verificar', updated: 'Fuentes revisadas', dossier: 'Ver ficha', officialSite: 'Sitio oficial', returnHub: 'Todas las firmas de opciones', compareLink: 'Comparador general', radarLink: 'Ver globo', methodTitle: '¿Por qué no hay notas?', method: 'Nuestro sistema de 100 puntos exige pruebas sobre entidades legales, pagos, reseñas y restricciones de cada programa.',
  },
  pt: {
    nav: 'Opções', title: 'Prop firms de opções: pesquisa independente', subtitle: 'Calls, puts e spreads negociados em bolsa diferem de futuros e CFDs. Conheça os programas documentados.', eyebrow: 'Novo mercado · observação',
    introTitle: 'Outro mercado, outra auditoria', intro: 'Algumas empresas oferecem avaliações simuladas de opções de ações, ETFs e índices dos EUA. Mesas profissionais seguem um modelo diferente.',
    evaluation: 'Programas de avaliação', professional: 'Mesas profissionais', noScore: 'Sem classificação', noScoreNotice: 'Estas empresas são listadas apenas para pesquisa. A PropRadar ainda não atribuiu pontuação, validou pagamentos ou recomendou nenhuma delas.', instruments: 'Instrumentos', programme: 'Programa', rules: 'Regras documentadas', officialSource: 'Fonte oficial', caution: 'Ainda por verificar', updated: 'Fontes verificadas', dossier: 'Ver perfil', officialSite: 'Site oficial', returnHub: 'Todas as empresas de opções', compareLink: 'Comparador principal', radarLink: 'Ver globo', methodTitle: 'Por que ainda não há notas?', method: 'A nossa avaliação de 100 pontos exige provas sobre entidades legais, pagamentos, opiniões e restrições dos programas.',
  },
  zh: {
    nav: '期权', title: '期权自营交易公司：独立研究', subtitle: '交易所上市的看涨期权、看跌期权及价差策略与期货和差价合约不同。请先了解有来源的计划规则。', eyebrow: '新市场 · 观察名单',
    introTitle: '不同市场，独立审核', intro: '一些公司提供美国股票、ETF及指数期权的模拟考核。专业交易台采用不同的业务模式。期货计划不一定允许期货期权。',
    evaluation: '零售考核计划', professional: '专业交易台', noScore: '尚未评分', noScoreNotice: '以下公司仅供研究。PropRadar 尚未发布评分、独立验证出金或作出推荐。', instruments: '交易品种', programme: '计划', rules: '已记录的规则', officialSource: '官方来源', caution: '仍待核实', updated: '来源核查', dossier: '查看档案', officialSite: '官方网站', returnHub: '全部期权公司', compareLink: '主比较器', radarLink: '查看地球仪', methodTitle: '为什么尚未评分？', method: '我们的百分制要求核实法律实体、付款规则、出金证据、用户反馈及限制性条款。',
  },
  ja: {
    nav: 'オプション', title: 'オプション系プロップファーム：独立調査', subtitle: '上場コール、プット、スプレッドは先物やCFDとは異なります。公式情報を確認しましょう。', eyebrow: '新市場 · 監視リスト',
    introTitle: '異なる市場には別の監査が必要', intro: '米国株・ETF・指数オプションの模擬審査を提供する会社があります。プロ向けデスクとは仕組みが異なります。',
    evaluation: '個人向け評価プログラム', professional: 'プロ向け取引デスク', noScore: '未評価', noScoreNotice: '掲載は調査目的です。PropRadarによる採点、出金確認、推奨はまだ行っていません。', instruments: '取引商品', programme: 'プログラム', rules: '確認したルール', officialSource: '公式情報', caution: '未検証事項', updated: '情報確認日', dossier: '詳細を見る', officialSite: '公式サイト', returnHub: 'オプション会社一覧', compareLink: '比較表', radarLink: '地球儀を見る', methodTitle: 'なぜ点数がないのか？', method: '100点評価には法人、出金、利用者の声、契約制限について独立した検証が必要です。',
  },
  hi: {
    nav: 'ऑप्शंस', title: 'ऑप्शंस प्रॉप फर्म: स्वतंत्र शोध', subtitle: 'लिस्टेड कॉल, पुट और स्प्रेड फ्यूचर्स व CFD से अलग हैं। स्रोतों सहित कार्यक्रम देखें।', eyebrow: 'नया बाज़ार · निगरानी सूची',
    introTitle: 'अलग बाज़ार, अलग ऑडिट', intro: 'कुछ फर्म अमेरिकी शेयर, ETF और इंडेक्स ऑप्शंस के लिए सिम्युलेटेड मूल्यांकन देती हैं। पेशेवर ट्रेडिंग डेस्क का मॉडल अलग है।',
    evaluation: 'रिटेल मूल्यांकन कार्यक्रम', professional: 'पेशेवर ट्रेडिंग डेस्क', noScore: 'अभी रेटिंग नहीं', noScoreNotice: 'ये फर्म केवल जानकारी के लिए सूचीबद्ध हैं। PropRadar ने अभी स्कोर, भुगतान सत्यापन या सिफारिश जारी नहीं की है।', instruments: 'इंस्ट्रूमेंट', programme: 'कार्यक्रम', rules: 'दर्ज नियम', officialSource: 'आधिकारिक स्रोत', caution: 'सत्यापन बाकी', updated: 'स्रोत जाँच', dossier: 'विवरण देखें', officialSite: 'आधिकारिक साइट', returnHub: 'सभी ऑप्शंस फर्म', compareLink: 'मुख्य तुलना', radarLink: 'ग्लोब देखें', methodTitle: 'अभी स्कोर क्यों नहीं?', method: 'हमारे 100-अंकीय मानक में कानूनी इकाइयों, भुगतान, समीक्षाओं और प्रतिबंधों का सत्यापन ज़रूरी है।',
  },
  tr: {
    nav: 'Opsiyonlar', title: 'Opsiyon prop firmaları: bağımsız araştırma', subtitle: 'Borsada işlem gören alım ve satım opsiyonları, vadeli işlemlerden ve CFD’lerden farklıdır.', eyebrow: 'Yeni piyasa · izleme listesi',
    introTitle: 'Farklı piyasa, ayrı denetim', intro: 'Bazı firmalar ABD hisse, ETF ve endeks opsiyonları için simülasyon değerlendirmeleri sunar. Profesyonel masaların modeli farklıdır.',
    evaluation: 'Bireysel değerlendirme programları', professional: 'Profesyonel işlem masaları', noScore: 'Henüz puanlanmadı', noScoreNotice: 'Bu firmalar yalnızca araştırma amacıyla listelenmiştir. PropRadar henüz puan, bağımsız ödeme teyidi veya tavsiye sunmamıştır.', instruments: 'Ürünler', programme: 'Program', rules: 'Belgelenen kurallar', officialSource: 'Resmî kaynak', caution: 'Doğrulanması gerekenler', updated: 'Kaynak kontrolü', dossier: 'Dosyayı aç', officialSite: 'Resmî site', returnHub: 'Tüm opsiyon firmaları', compareLink: 'Ana karşılaştırma', radarLink: 'Küreyi görüntüle', methodTitle: 'Neden puan yok?', method: '100 puanlık yöntemimiz tüzel kişiler, ödemeler, yorumlar ve kısıtlamalar hakkında doğrulanmış kanıt gerektirir.',
  },
  ar: {
    nav: 'الخيارات', title: 'شركات التمويل لتداول الخيارات: بحث مستقل', subtitle: 'تختلف عقود الشراء والبيع المدرجة واستراتيجيات الفروق عن العقود المستقبلية وCFD.', eyebrow: 'سوق جديد · قائمة متابعة',
    introTitle: 'سوق مختلف وتدقيق مستقل', intro: 'تقدم بعض الشركات تقييمات محاكاة لخيارات الأسهم وصناديق ETF والمؤشرات الأمريكية. وتختلف عنها مكاتب التداول المهنية.',
    evaluation: 'برامج التقييم للأفراد', professional: 'مكاتب التداول المهنية', noScore: 'لم تُقيَّم بعد', noScoreNotice: 'هذه الشركات مدرجة لأغراض البحث فقط. لم تصدر PropRadar أي درجة أو تأكيد مستقل للمدفوعات أو توصية.', instruments: 'الأدوات', programme: 'البرنامج', rules: 'القواعد الموثقة', officialSource: 'المصدر الرسمي', caution: 'ما لم يُتحقق منه', updated: 'مراجعة المصادر', dossier: 'عرض الملف', officialSite: 'الموقع الرسمي', returnHub: 'جميع شركات الخيارات', compareLink: 'المقارنة الرئيسية', radarLink: 'عرض الكرة الأرضية', methodTitle: 'لماذا لا توجد درجات؟', method: 'يتطلب معيارنا من 100 نقطة أدلة عن الكيانات القانونية والمدفوعات والمراجعات والقيود التعاقدية.',
  },
  ko: {
    nav: '옵션', title: '옵션 프랍펌: 독립 조사', subtitle: '상장 콜·풋옵션 및 스프레드는 선물·CFD와 다릅니다. 출처가 확인된 프로그램을 살펴보세요.', eyebrow: '새 시장 · 관찰 목록',
    introTitle: '다른 시장, 별도 감사', intro: '일부 업체는 미국 주식·ETF·지수 옵션의 모의 평가를 제공합니다. 전문 트레이딩 데스크는 운영 방식이 다릅니다.',
    evaluation: '개인 평가 프로그램', professional: '전문 트레이딩 데스크', noScore: '평가 전', noScoreNotice: '이 목록은 정보 제공 목적입니다. PropRadar는 아직 점수, 독립적인 지급 검증 또는 추천을 제공하지 않았습니다.', instruments: '거래 상품', programme: '프로그램', rules: '확인된 규칙', officialSource: '공식 출처', caution: '추가 검증 필요', updated: '출처 확인일', dossier: '상세 보기', officialSite: '공식 사이트', returnHub: '모든 옵션 업체', compareLink: '기본 비교', radarLink: '글로브 보기', methodTitle: '왜 점수가 없나요?', method: '100점 기준에는 법인, 지급 조건, 독립 지급 증거, 이용자 의견 및 제한 규칙의 검증이 필요합니다.',
  },
  sw: {
    nav: 'Options', title: 'Prop firm za options: utafiti huru', subtitle: 'Call, put na spread za soko la hisa hutofautiana na futures na CFD. Soma masharti yenye vyanzo.', eyebrow: 'Soko jipya · orodha ya ufuatiliaji',
    introTitle: 'Soko tofauti, ukaguzi tofauti', intro: 'Baadhi ya kampuni zina tathmini za majaribio kwa options za hisa, ETF na fahirisi za Marekani. Madawati ya kitaalamu yana mfumo tofauti.',
    evaluation: 'Programu za tathmini', professional: 'Madawati ya kitaalamu', noScore: 'Bado haijapimwa', noScoreNotice: 'Kampuni hizi zimeorodheshwa kwa utafiti tu. PropRadar bado haijatoa alama, uthibitisho wa malipo au pendekezo.', instruments: 'Bidhaa', programme: 'Programu', rules: 'Sheria zilizorekodiwa', officialSource: 'Chanzo rasmi', caution: 'Bado kuthibitishwa', updated: 'Ukaguzi wa vyanzo', dossier: 'Fungua taarifa', officialSite: 'Tovuti rasmi', returnHub: 'Kampuni zote za options', compareLink: 'Ulinganisho mkuu', radarLink: 'Angalia globe', methodTitle: 'Kwa nini hakuna alama?', method: 'Mfumo wetu wa alama 100 unahitaji ushahidi kuhusu kampuni, malipo, maoni na masharti ya programu.',
  },
  ha: {
    nav: 'Options', title: 'Kamfanonin prop na options: bincike mai zaman kansa', subtitle: 'Call, put da spread sun bambanta da futures da CFD. Duba shirye-shiryen da aka samu tushe.', eyebrow: 'Sabuwar kasuwa · jerin sa ido',
    introTitle: 'Kasuwa daban, tantancewa daban', intro: 'Wasu kamfanoni suna ba da gwajin kwaikwayo kan options na hannun jari, ETF da indices na Amurka. Hanyar ofisoshin kwararru ta bambanta.',
    evaluation: 'Shirye-shiryen gwaji', professional: 'Ofisoshin ciniki na kwararru', noScore: 'Ba a ba da maki ba', noScoreNotice: 'An jera su don bincike kawai. PropRadar bai ba da maki, tabbatar da biyan kudi ko shawarar amfani da su ba.', instruments: 'Kayayyaki', programme: 'Shiri', rules: 'Dokokin da aka rubuta', officialSource: 'Tushe na hukuma', caution: 'Abin da bai tabbata ba', updated: 'An duba tushe', dossier: 'Duba bayanai', officialSite: 'Shafin hukuma', returnHub: 'Duk kamfanonin options', compareLink: 'Babban kwatanci', radarLink: 'Duba globe', methodTitle: 'Me ya sa babu maki?', method: 'Tsarinmu na maki 100 yana bukatar hujja kan kamfani, biyan kudi, ra’ayoyin masu ciniki da dokoki.',
  },
  am: {
    nav: 'ኦፕሽኖች', title: 'የኦፕሽን ፕሮፕ ፈርሞች፦ ገለልተኛ ጥናት', subtitle: 'የጥሪና የሽያጭ ኦፕሽኖች ከፊውቸርስና CFD ይለያሉ። በምንጭ የተደገፉ ፕሮግራሞችን ይመልከቱ።', eyebrow: 'አዲስ ገበያ · የክትትል ዝርዝር',
    introTitle: 'የተለየ ገበያ፣ የተለየ ግምገማ', intro: 'አንዳንድ ድርጅቶች ለአሜሪካ አክሲዮን፣ ETF እና ኢንዴክስ ኦፕሽኖች የሙከራ ግምገማ ያቀርባሉ። የሙያ ትሬዲንግ ዴስኮች ሌላ አሰራር አላቸው።',
    evaluation: 'የግለሰብ ግምገማ ፕሮግራሞች', professional: 'የሙያ ትሬዲንግ ዴስኮች', noScore: 'ገና አልተመዘነም', noScoreNotice: 'እነዚህ ድርጅቶች ለመረጃ ብቻ ተዘርዝረዋል። PropRadar ገና ውጤት፣ የክፍያ ማረጋገጫ ወይም ምክር አልሰጠም።', instruments: 'መሳሪያዎች', programme: 'ፕሮግራም', rules: 'የተመዘገቡ ደንቦች', officialSource: 'ይፋዊ ምንጭ', caution: 'ገና ያልተረጋገጠ', updated: 'የምንጭ ማጣሪያ', dossier: 'መገለጫ ይመልከቱ', officialSite: 'ይፋዊ ድረገጽ', returnHub: 'ሁሉም የኦፕሽን ድርጅቶች', compareLink: 'ዋና ማነጻጸሪያ', radarLink: 'ግሎብ ይመልከቱ', methodTitle: 'ለምን ውጤት የለም?', method: 'የ100 ነጥብ ስርዓታችን የህግ ማንነት፣ ክፍያ፣ ግምገማ እና ገደቦች ማስረጃ ይፈልጋል።',
  },
};

export function optionsCopy(locale: Locale): OptionsCopy {
  return translations[locale];
}
