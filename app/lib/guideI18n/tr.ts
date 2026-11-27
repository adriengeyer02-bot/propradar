import type { GuideTranslations } from './types';

/** Turkish guide summaries (translated from the English guides). */
const tr: GuideTranslations = {
  'hyrotrader-vs-tradeify': {
    title: 'HyroTrader ve Tradeify: drawdown kuralları ve risk yönetimi',
    metaDescription: 'HyroTrader ve Tradeify karşılaştırması: kripto ve vadeli işlem piyasaları, günlük kayıp limitleri, gün sonu (EOD) drawdown, tutarlılık ve anında hesaplarda ilk ödeme kuralları.',
    eyebrow: 'Kripto ve vadeli işlemler',
    h1: 'HyroTrader ve Tradeify: drawdown kuralları ve risk yönetimi karşılaştırması',
    answer: 'HyroTrader kripto yatırımcılarına, Tradeify ise borsada işlem gören vadeli işlem (futures) yatırımcılarına hizmet verir. HyroTrader, başlangıç özsermayesine ve ilk bakiyeye dayanan günlük kayıp limitleri yayımlar. Tradeify, gün içinde uygulanan gün sonu takip eden (EOD trailing) drawdown kullanır. Ücretleri veya ilan edilen hesap büyüklüğünü karşılaştırmadan önce tam programı ve ödeme politikasını karşılaştırın.',
    checks: [
      'Önce piyasayı seçin: kripto perpetual sözleşmeler ile borsada işlem gören vadeli işlemler farklı enstrümanlardır.',
      'Günlük kayıp tabanını toplam drawdown tabanından ayırın.',
      'Değerlendirme aşamasındaki tutarlılık kuralını, fonlanmış aşamadaki ödeme tutarlılığından ayırt edin.',
      'Anında hesabın ödeme hedefini, üst sınırını ve kâr payını tam olarak okuyun.',
      'Kuralları hesap sürümünüzle ve satın alma tarihinizle eşleştirin.',
    ],
    faq: [
      {
        question: 'HyroTrader mı daha iyi, Tradeify mı?',
        answer: 'Önce ilgili piyasa gelir. HyroTrader bir kripto prop firmasıdır; Tradeify ise vadeli işlem prop firmasıdır. Tam program için kayıp tabanlarını, işlem saatlerini ve ödeme koşullarını karşılaştırın. Bu rehber genel bir kazanan belirlemez ve iki firmanın müşteri ödemelerini doğrulamaz.',
      },
      {
        question: 'Tradeify\'ın EOD drawdown\'ı gün içinde ihlale izin verir mi?',
        answer: 'Hayır. Takip eden taban gün sonunda yeniden hesaplanır, ancak Tradeify mevcut tabanı net tasfiye değerine karşı sürekli uygular. Tabana değmek, seans bitmeden hesabın başarısız olmasına yol açabilir.',
      },
      {
        question: 'Bu iki firmadan birinde challenge olmadan başlayabilir miyim?',
        answer: '15 Kasım 2026\'da incelenen resmi sayfalar Hyro Instant ve Tradeify Lightning Funded programlarını anlatıyor. İkisi de değerlendirmeyi atlar; günlük limitleri, ödemeye hak kazanma kuralları ve üst sınırları farklıdır.',
      },
      {
        question: 'Değerlendirme olmaması, ödeme için kâr hedefi olmadığı anlamına mı gelir?',
        answer: 'Hayır. Tradeify Lightning Funded, bir talebin kilidini açmak için gereken kârı, çekilebilecek tutardan ayırır. Hyro Instant ise ilk ödeme için gerekli işlem günlerini, paylaşımdan sonraki asgari kârı ve ödeme başına sayılan kârın üst sınırını belirtir.',
      },
      {
        question: 'HyroTrader ve Tradeify aynı türde kripto fonlaması mı sunuyor?',
        answer: 'Hayır. HyroTrader\'ın hizmeti piyasa verileri üzerinde simüle edilmiş kripto işlemi kullanır. Tradeify\'ın programları ise borsada işlem gören vadeli işlemler üzerine kuruludur. Her vadeli işlem sözleşmesinin bir kripto perpetual olduğunu varsaymak yerine gerçek enstrüman listesini kontrol edin.',
      },
    ],
  },
  'prop-firm-hidden-rules': {
    title: '2026\'da prop firmalarının gizli kuralları: satın almadan önce kontrol edilecek 9 madde',
    metaDescription: 'Hangi prop firmaları VPN veya VPS kullanımını kısıtlıyor? GFT, FundingPips, Topstep ve 8 firmadaki kaynaklı yasakları, challenge ve ülkeye göre haber kurallarını karşılaştırın; 2026 güncellemesi.',
    eyebrow: 'Bağımsız kural incelemeleri',
    h1: 'Prop firmalarının gizli kuralları: satış sayfasının açıklamadıkları',
    answer: 'Bulunması zor olan bir kural her zaman gizli değildir. Satın almadan önce fonlanmış aşamanın tüm koşullarını, ödül uygunluğunu, haber pencerelerini, tutarlılık kuralını, coğrafi kısıtlamaları ve yasaklı işlem araçlarını karşılaştırın. PropRadar, kendi iş ortakları da dahil olmak üzere firmaların yayımladığı koşullara doğrudan bağlantı verir.',
    checks: [
      'Ödemeden önce tam kural kitabını, hesap modelini ve tarihi kaydedin; pazarlama özetleri sözleşme değildir.',
      'Değerlendirme ve fonlanmış aşama kurallarını karşılaştırın; özellikle haber, pozisyon taşıma, tutarlılık ve ödeme limitlerini.',
      'İkamet, vatandaşlık, işlem platformu, KYC ve ödeme sağlayıcısının erişilebilirliğini doğrulayın.',
      'Takdire bağlı ödül reddi, hesap feshi, hareketsizlik ve yasaklı stratejilerle ilgili maddeleri bulun.',
    ],
    faq: [
      {
        question: 'Bu kurallar gerçekten gizli mi?',
        answer: 'Örnekler genellikle resmi SSS\'lerde veya sözleşmelerde yayımlanmıştır. Sorun, satış sayfasının bunları atlayabilmesi ya da farklı planların farklı kurallara sahip olmasıdır. PropRadar bunlara kasıtlı gizlemenin kanıtı değil, gözden kaçması kolay koşullar der.',
      },
      {
        question: 'Hiç gizli kuralı olmayan bir prop firması var mı?',
        answer: 'Hiçbir kamuya açık karşılaştırma bunu garanti edemez. Eksiksiz, tarihli ve aranabilir bir sözleşmesi, destek ekibinden tutarlı yanıtları ve açık ödeme aşaması kriterleri olan firmaları tercih edin.',
      },
      {
        question: 'Hangi prop firmaları VPN veya VPS ile işlemi yasaklıyor?',
        answer: '16 Kasım 2026 itibarıyla GOAT Funded Trader ve FundingPips, işlem erişimi için ikisini de açıkça yasaklıyor. Topstep, VPN\'leri ve VPS üzerinden emir iletimini yasaklıyor. FundedNext, Alpha Capital Group ve Tradeify\'ın koşullu kuralları var; FTMO CFD ve Blue Guardian 1-Step Standard ise belirtilen istisnalar dışında genel olarak izin veriyor. Her politika tabloda bağlantılıdır.',
      },
      {
        question: 'Haber işlemi değerlendirmede serbest olup fonlandıktan sonra kısıtlanabilir mi?',
        answer: 'Evet. E8 Classic, BrightFunded CFD, Blue Guardian 1-Step Standard ve bazı FundingPips programları, fonlandıktan sonra haber penceresindeki kârların nasıl değerlendirileceğini değiştirir. Marka sloganını değil, her zaman adı geçen programı ve aşamayı kontrol edin.',
      },
      {
        question: 'PropRadar iş ortaklarını eleştirir mi?',
        answer: 'Evet. Ticari ilişkiler hiçbir zaman bir PropRadar puanını değiştirmez ve belgelenmiş sözleşme kısıtlamalarını ortadan kaldırmaz.',
      },
    ],
  },
  'meilleure-prop-firm-2026': {
    title: '2026\'nın en iyi prop firması: risk öncelikli sıralama',
    metaDescription: 'En iyi prop firmalarını puan, ödeme güvenilirliği, fiyat, filtrelenmiş Trustpilot sinyali, Reddit geri bildirimleri, kurallar, platformlar ve satın alma öncesi risk noktalarına göre karşılaştırın.',
    eyebrow: 'Ana rehber',
    h1: 'En iyi prop firması: sıralama pazarlamayla değil, riskle başlar',
    answer: 'En iyi prop firması her zaman en büyük kâr payını veya indirimi gösteren firma değildir. Faydalı bir seçim; okunabilir kuralları, güvenilir ödemeleri, makul toplam maliyeti, doğru platformu ve yeterli faaliyet geçmişini bir araya getirir.',
    checks: [
      'Fiyata bakmadan önce PropRadar puanını ve ödeme riskini kontrol edin.',
      'Drawdown\'ı, kâr hedeflerini ve asgari işlem günlerini karşılaştırın.',
      'Her firma profilinde kayıtlı resmi kaynakları okuyun.',
      'Trustpilot yorumlarını Reddit geri bildirimlerinden ve ödeme olaylarından ayırın.',
    ],
    faq: [
      {
        question: 'Başlamak için en iyi prop firması hangisi?',
        answer: 'Okunabilir kuralları, makul fiyatı, daha düşük ödeme riski ve istikrarlı bir kamuya açık geçmişi olan bir firmayla başlayın. Doğru seçim ayrıca piyasanıza ve işlem tarzınıza bağlıdır.',
      },
      {
        question: 'Büyük indirim yapan bir prop firması daha mı iyidir?',
        answer: 'Hayır. İndirim giriş maliyetini düşürür, ancak tehlikeli çekim kurallarını, belirsiz drawdown\'ı veya yüksek ödeme riskini telafi etmez.',
      },
    ],
  },
  'meilleure-prop-firm-futures': {
    title: 'En iyi vadeli işlem prop firmaları: Topstep, Apex, TPT ve alternatifleri',
    metaDescription: 'Vadeli işlem prop firmalarını ödeme kuralları, takip eden drawdown, ücretler, platformlar ve Topstep, Apex, TPT ile alternatiflerindeki son risk sinyallerine göre karşılaştırın.',
    eyebrow: 'Vadeli işlem fonlaması',
    h1: 'En iyi vadeli işlem prop firması: ödemeyi, drawdown\'ı ve gizli ücretleri karşılaştırın',
    answer: 'Vadeli işlemlerde en iyi seçim esas olarak drawdown\'a, fonlanmış hesap ücretlerine, ödeme üst sınırlarına ve platform istikrarına bağlıdır.',
    checks: [
      'Gün sonu (EOD) drawdown, takip eden drawdown veya tampon kurallarını belirleyin.',
      'Fonlanmış hesap ücretlerini ve tekrarlayan ücretleri karşılaştırın.',
      'Ödeme üst sınırlarını ve çekimler arasında gereken gün sayısını kontrol edin.',
      'Kurallar sürekli değişirken çok güçlü indirimlere karşı dikkatli olun.',
    ],
    faq: [
      {
        question: 'Topstep mi Apex mi: önce hangisini incelemeli?',
        answer: 'Topstep birçok yatırımcı için okunması daha kolay olabilirken Apex kampanya dönemlerinde cazip olabilir. Seçim yalnızca fiyata değil, güncel kurallara dayanmalıdır.',
      },
      {
        question: 'Vadeli işlem prop firmaları scalping için uygun mu?',
        answer: 'Bazı profiller için evet, ancak platformları, veri akışlarını, gün içi drawdown\'ı ve ödeme koşullarını kontrol etmeniz gerekir.',
      },
    ],
  },
  'prop-firm-sans-consistency-rule': {
    title: 'Tutarlılık kuralı olmayan prop firması: neleri doğrulamalı',
    metaDescription: 'Tutarlılık kuralı olmayan veya esnek kurallara sahip bir prop firması bulun: ödeme, drawdown, hedefler, haber ve gizli koşullar.',
    eyebrow: 'Kural araması',
    h1: 'Tutarlılık kuralı olmayan prop firması: asıl risk çoğu zaman başka yerdedir',
    answer: 'Tutarlılık kuralının olmaması bir avantaj olabilir, ancak drawdown, asgari ödeme, haber kısıtlamaları ve fonlanmış aşama ücretleriyle birlikte karşılaştırılmalıdır.',
    checks: [
      'Yalnızca pazarlama sayfasını değil, her ürünü ayrı ayrı kontrol edin.',
      'Asgari ödemeyi ve gerekli işlem günlerini doğrulayın.',
      'Drawdown kurallarını karşılaştırın: takip eden drawdown, tutarlılık kuralından daha zor olabilir.',
      'Haber, rollover, kopya işlem ve EA kısıtlamalarını yeniden okuyun.',
    ],
    faq: [
      {
        question: 'Tutarlılık kuralı olmayan bir prop firması her zaman daha mı iyidir?',
        answer: 'Her zaman değil. Bazı firmalar bunu daha sıkı drawdown, daha yüksek ücretler veya daha zor çekim koşullarıyla telafi eder.',
      },
      {
        question: 'PropRadar tutarlılık kurallarını nasıl belirler?',
        answer: 'Yalnızca pazarlama sayfası değil, tam program okunmalıdır. Bazı firmalar kuralları hesap türüne, challenge/fonlanmış aşamaya veya hesap büyüklüğüne göre değiştirir.',
      },
    ],
  },
  'prop-firm-news-trading': {
    title: 'Haber işlemine izin veren prop firmaları: liste ve riskler',
    metaDescription: 'Hangi prop firmaları haber işlemine izin veriyor? Kısıtlamalar, spread, kayma (slippage), ödeme ve yeniden okunması gereken kurallar üzerine PropRadar rehberi.',
    eyebrow: 'Haber işlemi',
    h1: 'Prop firmalarında haber işlemi: izin verilmesi risksiz olduğu anlamına gelmez',
    answer: 'Bir prop firmasıyla haber işlemi yapmak için açık izni, kaymayı, platformları, günlük drawdown\'ı ve ödeme dışlamalarını kontrol edin.',
    checks: [
      'Haber işleminin hem challenge hem de fonlanmış aşamada serbest olup olmadığını doğrulayın.',
      'Yüksek etkili (kırmızı) ekonomik olaylar etrafındaki kısıtlamaları kontrol edin.',
      'Ani bir fiyat sıçramasında işlem yapmadan önce günlük drawdown\'ı değerlendirin.',
      'Haber dönemindeki işlemlere bağlı ödeme koşullarını okuyun.',
    ],
    faq: [
      {
        question: 'Bir prop firmasıyla NFP döneminde işlem yapılabilir mi?',
        answer: 'Bazen evet, bazen hayır. Bazı firmalar haber işlemine izin verirken diğerleri bunu fonlanmış hesaplarda veya büyük veri açıklamaları sırasında kısıtlar.',
      },
      {
        question: 'Prop firmasında haber işleminin ana riski nedir?',
        answer: 'Ana risk, işlem kârlı olsa bile bir zamanlama, drawdown veya ödeme kuralını ihlal etmektir.',
      },
    ],
  },
  'prop-firm-payout-rapide': {
    title: 'Hızlı ödeme yapan prop firması: çekimler, kanıtlar ve tuzaklar',
    metaDescription: 'Hızlı ödeme yapan prop firmaları rehberi: süre, çekim kanıtı, ödeme riski, üst sınırlar ve bir challenge için ödeme yapmadan önceki koşullar.',
    eyebrow: 'Ödeme araması',
    h1: 'Hızlı ödeme yapan prop firması: yalnızca vaadi değil, kanıtı kontrol edin',
    answer: 'Hızlı ödeme ancak koşullar açık olduğunda önemlidir: asgari tutar, işlem günleri, üst sınırlar, kâr payı, yorumlar ve olay geçmişi.',
    checks: [
      'İlan edilen süreyi topluluk sinyalleriyle karşılaştırın.',
      'Asgari çekim tutarını ve ödeme üst sınırlarını kontrol edin.',
      'Ödeme olaylarını ve tekrarlayan şikâyetleri okuyun.',
      'Bir pazarlama sertifikasını bağımsız bir kanıtla karıştırmayın.',
    ],
    faq: [
      {
        question: '24 saatte ödeme güvenilir mi?',
        answer: 'Olabilir, ancak koşullar ve geçmiş doğrulanmalıdır. İlan edilen süre riski ölçmek için yeterli değildir.',
      },
      {
        question: 'Ödeme riski neden bu kadar önemli?',
        answer: 'Çünkü kâğıt üzerinde kârlı görünen bir prop firması, çekimler zor, gecikmeli veya tartışmalı olduğunda işe yaramaz hâle gelir.',
      },
    ],
  },
  'prop-firm-pas-cher': {
    title: 'Ucuz prop firması: indirim kodları ve gerçek maliyet',
    metaDescription: 'Ucuz prop firmalarını giriş fiyatı, indirim kodu, drawdown, ödeme kuralları ve fonlanmış aşama ücretlerine göre karşılaştırın; düşük maliyetli bir challenge daha yüksek bir riski gizlemesin.',
    eyebrow: 'Bütçe ve fırsatlar',
    h1: 'Ucuz prop firması: challenge ücreti toplam maliyet değildir',
    answer: 'Ucuz bir prop firması, ödeme güvenilir kaldığında ve fonlanmış ücretler, sıfırlamalar, drawdown ve kısıtlamalar hesabı fazla kırılgan hâle getirmediğinde ilginç olabilir.',
    checks: [
      'Giriş fiyatını fonlanmış aşama ücretleriyle karşılaştırın.',
      'Kampanyanın koşulları değiştirip değiştirmediğini kontrol edin.',
      'Yalnızca bir indirim yüzünden daha büyük bir hesap seçmeyin.',
      'Satın almadan önce bütçeyi, ödemeyi ve puanı birlikte değerlendirin.',
    ],
    faq: [
      {
        question: 'En ucuz prop firması hangisi?',
        answer: 'En ucuz firma kampanyalarla sık sık değişir. Giriş ücretini fonlanmış aşama ücretleri, sıfırlamalar, drawdown ve ödeme riskiyle karşılaştırın.',
      },
      {
        question: 'Bir PropRadar indirim kodu sıralamayı değiştirir mi?',
        answer: 'Hayır. İş ortaklığı bağlantıları ve kampanyalar puanlamadan ayrı tutulur.',
      },
    ],
  },
  'prop-firm-smc-ict': {
    title: 'SMC / ICT yatırımcıları için en iyi prop firması',
    metaDescription: 'SMC ve ICT yatırımcıları için PropRadar rehberi: drawdown, seanslar, haberler, ödeme, forex, vadeli işlemler ve kaçınılması gereken kurallar.',
    eyebrow: 'SMC / ICT tarzı',
    h1: 'SMC / ICT için prop firması: risk kontrolünü kaybetmeden esneklik arayın',
    answer: 'SMC/ICT için doğru firma, belirsiz haber, drawdown veya ödeme kuralları olmadan gün içi kurulumlara nefes alma alanı bırakmalıdır.',
    checks: [
      'Londra/New York seansları ve haberler etrafındaki kısıtlamaları kontrol edin.',
      'Birden fazla giriş için aşırı sıkı takip eden drawdown\'dan kaçının.',
      'Spread\'i, platformu ve emir gerçekleşmesini karşılaştırın.',
      'Strateji birkaç küçük kazanç hedefliyorsa asgari ödemeyi kontrol edin.',
    ],
    faq: [
      {
        question: 'SMC forex mi yoksa vadeli işlem prop firmalarıyla mı daha iyi çalışır?',
        answer: 'İkisi de işe yarayabilir. Forex daha fazla parite sunar, vadeli işlemler daha standart bir yapı sunar. Kurallar etiketten daha önemlidir.',
      },
      {
        question: 'Bir prop firmasında ICT yatırımcısı için ana tehlike nedir?',
        answer: 'Makro veri açıklamaları, günlük drawdown ve haber işlemi etrafındaki kısıtlamalar.',
      },
    ],
  },
  'prop-firm-swing-trading': {
    title: 'Swing trading için prop firması: gece, hafta sonu ve ödeme',
    metaDescription: 'Prop firmalarını swing trading açısından karşılaştırın: gece ve hafta sonu pozisyon taşıma, haber kısıtlamaları, drawdown, ödeme zamanlaması ve hesaba özgü kurallar.',
    eyebrow: 'Swing trading',
    h1: 'Swing trading için prop firması: fiyattan önce geceyi, hafta sonunu ve drawdown\'ı doğrulayın',
    answer: 'Swing trading için daha uzun süreli pozisyonlara, hafta sonlarına ya da en azından açık rollover ve haber kurallarına izin veren bir firmaya ihtiyacınız var.',
    checks: [
      'Challenge ve fonlanmış aşamada gece ve hafta sonu pozisyon taşımayı doğrulayın.',
      'Drawdown\'ın sabit, gün sonu (EOD) veya takip eden olup olmadığını anlayın.',
      'Fiyat boşlukları (gap) ve haberlerle ilgili kısıtlamaları okuyun.',
      'Ödeme süresini ortalama işlem süresiyle karşılaştırın.',
    ],
    faq: [
      {
        question: 'Tüm prop firmaları swing trading\'e izin verir mi?',
        answer: 'Hayır. Bazıları gece, hafta sonu veya haber işlemlerini sınırlar. Tam program yeniden okunmalıdır.',
      },
      {
        question: 'Swing trading için hangi drawdown daha iyidir?',
        answer: 'Sabit veya gün sonu (EOD) drawdown, katı gün içi takip eden drawdown\'a göre çoğu zaman daha kolay okunur.',
      },
    ],
  },
  'prop-firm-ea-algo': {
    title: 'EA\'ya izin veren prop firması: botlar, algoritmik işlem ve kopya işlem',
    metaDescription: 'EA, bot ve algoritmik işleme izin veren prop firmalarını bulun; ardından satın almadan önce VPS, kopya işlem, arbitraj, haber ve ödeme kısıtlamalarını karşılaştırın.',
    eyebrow: 'EA / Algo',
    h1: 'EA\'ya izin veren prop firması: izin, kısıtlamalar ve ödeme riski',
    answer: 'EA uyumlu bir firma botlara açıkça izin vermeli ve kopya işlem, arbitraj, gecikme (latency), haber ve çekim koşullarını netleştirmelidir.',
    checks: [
      'Challenge ve fonlanmış aşamada EA iznini doğrulayın.',
      'Arbitraj, gecikme, grid, martingale ve kopya işlemle ilgili kısıtlamaları okuyun.',
      'Büyük bir hesap almadan önce platformu test edin.',
      'Stratejiye bağlı ödeme maddelerine dikkat edin.',
    ],
    faq: [
      {
        question: 'Bir prop firmasında bot kullanılabilir mi?',
        answer: 'Bazı firmalarda evet, ancak kısıtlamalarla. İzin resmi kurallarda teyit edilmelidir.',
      },
      {
        question: 'Kopya işleme her zaman izin verilir mi?',
        answer: 'Hayır. Birçok firma bunu, özellikle farklı kişilere ait hesaplar arasında, ciddi şekilde kısıtlar.',
      },
    ],
  },
  'prop-firm-fiable-trustpilot': {
    title: 'Güvenilir prop firması: Trustpilot, Reddit ve kanıtlar',
    metaDescription: 'Güvenilir bir prop firması nasıl belirlenir: Trustpilot, Reddit, ödeme kanıtı, resmi kaynaklar ve çıkar çatışmaları.',
    eyebrow: 'Güven',
    h1: 'Güvenilir prop firması: iyi bir puanı sağlam bir kanıtla karıştırmayın',
    answer: 'Güvenilir bir prop firması şeffaf kuralları, resmi kaynakları, ödeme geçmişini, tutarlı topluluk geri bildirimlerini ve açıklanmış ticari çıkar çatışmalarını bir araya getirir.',
    checks: [
      'Trustpilot\'u Reddit ve ödeme olaylarıyla karşılaştırın.',
      'Resmi kaynakların erişilebilir olduğunu doğrulayın.',
      'Yorum hacmine ve bağlamına bakın.',
      'İş ortaklığı bağlantılarını ve ticari çıkar çatışmalarını belirleyin.',
    ],
    faq: [
      {
        question: 'Bir prop firmasını değerlendirmek için Trustpilot yeterli mi?',
        answer: 'Hayır. Trustpilot faydalıdır, ancak kurallar, Reddit, resmi kaynaklar ve ödemelerle çapraz kontrol edilmelidir.',
      },
      {
        question: 'Riskli her firma göz ardı edilmeli mi?',
        answer: 'Hayır, ancak izleme listesindeki dosyalar olarak okunmalıdır. Riskli bir firma faaliyette olabilir, ama bariz bir satın alma gibi görülmemelidir.',
      },
    ],
  },
  'ftmo-vs-the5ers': {
    title: 'FTMO ve The5ers: kurallar, fiyat ve ödeme',
    metaDescription: 'FTMO ve The5ers: seçim yapmadan önce güncel programları, fiyatları, drawdown\'ı, ödeme kurallarını, platformları, Trustpilot sinyallerini ve resmi koşulları karşılaştırın.',
    eyebrow: 'Marka karşılaştırması',
    h1: 'FTMO ve The5ers: iki sağlam profil, aynı kullanım amacı değil',
    answer: 'FTMO ve The5ers iki sağlam profildir, ancak aynı ihtiyaca hizmet etmezler. FTMO geçmişi, dokümantasyonu ve referans konumuyla öne çıkar. The5ers ise çoğu zaman program bazında daha net limitler isteyen temkinli yatırımcılara hitap eder. Doğru seçim işlem tarzına, bütçeye, kabul edilen drawdown\'a, haber/EA kısıtlamalarına ve ödeme kurallarıyla ne kadar rahat olduğunuza bağlıdır.',
    checks: [
      'Asgari fiyatı ve hedeflenen hesap büyüklüğünü karşılaştırın.',
      'Haber, EA, drawdown ve kâr hedefi kurallarını okuyun.',
      'İş ortaklığı bağlantılarını, kuponları ve gösterilen ticari çıkarları belirleyin.',
      'Yalnızca popülerliğe göre değil, işlem tarzına göre seçin.',
    ],
    faq: [
      {
        question: 'FTMO, The5ers\'tan daha mı iyi?',
        answer: 'Evrensel olarak değil. FTMO çok iyi tanınır, The5ers ise bazı profillere daha iyi uyabilir. Tam program, isimden daha önemlidir.',
      },
      {
        question: 'İş ortaklığı bağlantısı bu karşılaştırmayı değiştirir mi?',
        answer: 'Hayır. PropRadar puanı, riskleri ve ticari ilişkileri birbirinden ayırır.',
      },
    ],
  },
  'topstep-vs-apex': {
    title: 'Topstep ve Apex: vadeli işlem karşılaştırması',
    metaDescription: 'Topstep ve Apex Trader Funding: vadeli işlemleri, drawdown\'ı, ödemeyi, kampanyaları, platformları ve risk sinyallerini karşılaştırın.',
    eyebrow: 'Vadeli işlem karşılaştırması',
    h1: 'Topstep ve Apex: vadeli işlem karşılaşması kurallar ve ödeme üzerinedir',
    answer: 'Apex, agresif kampanyaları ve geniş hesap büyüklüğü seçeneğiyle yatırımcıları çeker. Topstep ise yerleşik vadeli işlem profiline ve birçok yatırımcının daha kolay tanımladığı bir çerçeveye dayanır. Karşılaşma yalnızca fiyatla ilgili değildir: drawdown\'ı, tekrarlayan ücretleri, ödeme üst sınırlarını, platformları ve son topluluk geri bildirimlerini karşılaştırın.',
    checks: [
      'Kampanyaları ve fonlanma sonrası toplam maliyeti karşılaştırın.',
      'EOD/takip eden drawdown ve tutarlılık kurallarını kontrol edin.',
      'Topluluk sinyallerini ve son olayları okuyun.',
      'Platforma ve gün içi tarzınıza göre seçin.',
    ],
    faq: [
      {
        question: 'Apex, Topstep\'ten daha mı ucuz?',
        answer: 'Apex sık sık büyük kampanyalar gösterir, ancak fiyat tüm kurallar ve ücretlerle birlikte karşılaştırılmalıdır.',
      },
      {
        question: 'Topstep daha mı güvenilir?',
        answer: 'Güçlü bir geçmişe sahiptir, ancak her yatırımcı satın almadan önce güncel koşulları doğrulamalıdır.',
      },
    ],
  },
  'topstep-review': {
    title: 'Topstep incelemesi 2026: Topstep güvenilir mi? Kurallar ve ödemeler',
    metaDescription: 'Topstep incelemesi 2026: Topstep güvenilir mi? Trading Combine kuralları, %55 tutarlılık hedefi, takip eden Maximum Loss Limit, %90 kâr payı, ödeme yolları ve Trustpilot sinyalleri.',
    eyebrow: 'Firma incelemesi',
    h1: 'Topstep incelemesi 2026: Topstep güvenilir mi?',
    answer: 'Topstep, 2012\'de kurulmuş, uzun süredir faaliyet gösteren ve meşru bir ABD vadeli işlem prop firmasıdır. Trading Combine\'ın süre sınırı yoktur, %55 tutarlılık hedefi vardır ve Maximum Loss Limit gün sonu bakiyesini takip eder ancak canlı olarak izlenir. Yeni yatırımcılar ödemelerin %90\'ını alır. Başlıca dezavantajlar yalnızca vadeli işlem sunulması, gece pozisyon taşımaya izin verilmemesi ve 2025 sonundan bu yana sık kural değişiklikleridir.',
    checks: [
      'Güncel Combine fiyatını ve planın bir aktivasyon ücreti içerip içermediğini teyit edin.',
      'Pozisyonları gün sonu bakiyesini takip eden Maximum Loss Limit\'e göre boyutlandırın.',
      'Express Funded Account ödeme yolunu dikkatle seçin: seçim kalıcıdır.',
      'İlk ödemeden sonra MLL\'nin $0\'a sıfırlandığını unutmayın.',
    ],
    faq: [
      {
        question: 'Topstep güvenilir mi?',
        answer: 'Evet. Topstep 2012\'den beri Chicago\'dan faaliyet gösteriyor, yardım merkezinde ayrıntılı kurallar yayımlıyor ve 2026\'da bağlı bir aracı kurum (introducing broker) başlattı. PropRadar ona 84/100 puan veriyor ve kayıtlı bir düzenleyici uyarısı bulunmuyor. Tüm prop firmalarında olduğu gibi değerlendirme ve fonlanmış aşamalar simüledir.',
      },
      {
        question: 'Topstep tutarlılık kuralı nedir?',
        answer: 'Trading Combine\'da en iyi gününüz kâr hedefinin %55\'ini aşamaz; aşarsa hedef, en iyi gün bölü 0,55\'e yükselir. Express Funded Account\'un Consistency yolunda ise ödeme talep edebilmek için en büyük gününüz net kârın %40\'ı veya daha azı olmalıdır.',
      },
      {
        question: 'Topstep hangi kâr payını öder?',
        answer: '12 Ocak 2026 veya sonrasında katılan yatırımcılar onaylanan ödemelerin %90\'ını alır. Daha önce katılanlar ilk $10,000\'ın %100\'ünü, ardından %90\'ını alır. Asgari ödeme talebi $125\'tır.',
      },
      {
        question: 'Topstep\'te pozisyonları gece taşıyabilir miyim?',
        answer: 'Hayır. Tüm pozisyonlar seans sonuna kadar kapatılmalıdır; gece ve hafta sonu pozisyon taşımaya izin verilmez.',
      },
    ],
  },
  'prop-firm-drawdown': {
    title: 'Prop firmasında drawdown: takip eden, sabit ve gün sonu (EOD)',
    metaDescription: 'Prop firmasında drawdown nedir? Sabit, takip eden ve gün sonu drawdown\'ın çözümlü örneklerle açıklaması; günlük kayıp limitleri, kilit seviyeleri ve nasıl seçileceği.',
    eyebrow: 'Kurallar açıklanıyor',
    h1: 'Prop firmasında drawdown: takip eden, sabit ve gün sonu',
    answer: 'Drawdown, hesabınızın bir referans noktasından kaybedebileceği azami tutardır. Sabit drawdown başlangıç bakiyesinin altında sabitlenir ve hiç hareket etmez. Gün içi takip eden drawdown, açık kâr dahil en yüksek özsermayenizi gerçek zamanlı izler. Gün sonu takip eden drawdown yalnızca günlük kapanışta hareket eder. Sabit olan en affedici, gün içi takip eden ise en katı modeldir.',
    checks: [
      'Referans noktasını belirleyin: başlangıç bakiyesi, en yüksek özsermaye veya gün sonu bakiyesi.',
      'İhlallerin bakiyeye mi yoksa özsermayeye mi göre ölçüldüğünü kontrol edin.',
      'Takip eden limitin hareket etmeyi bıraktığı kilit seviyesini bulun.',
      'Pozisyonları hesap büyüklüğüne göre değil, kalan alana göre boyutlandırın.',
    ],
    faq: [
      {
        question: 'Takip eden ve sabit drawdown arasındaki fark nedir?',
        answer: 'Sabit drawdown başlangıç bakiyenizin altında sabit bir seviyede kalır. Takip eden drawdown hesabınız yeni zirveler yaptıkça yukarı hareket eder; bu yüzden alanınız her kazançtan sonra kilitlenene kadar daralır.',
      },
      {
        question: 'Gün sonu drawdown, takip edenden daha mı iyi?',
        answer: 'Genellikle evet. Gün sonu takip eden limit, açık kârdaki gün içi dalgalanmaları yok sayar ve yalnızca kapanışta hareket eder; gün içi takip eden limit ise daha sonra başabaş kapattığınız bir işlem sırasında yükselebilir.',
      },
      {
        question: 'Günlük kayıp limiti hesabımı kapatır mı?',
        answer: 'Firmaya bağlıdır. Çoğu forex/CFD firması hesabı ihlal sayar; bazı vadeli işlem firmaları yalnızca seansın geri kalanında işlemi durdurur. Tam programınızın koşullarını okuyun.',
      },
    ],
  },
  'funderpro-vs-the5ers': {
    title: 'FunderPro ve The5ers: haber, EA, swing ve ödeme',
    metaDescription: 'FunderPro ve The5ers karşılaştırması: güncel fiyatlar, doğrulanacak ödeme kodları, haber işlemi, EA, swing seçenekleri, puan, hukuki profil ve ödeme kuralları.',
    eyebrow: 'CFD karşılaştırması',
    h1: 'FunderPro ve The5ers: esneklik ve daha uzun geçmiş',
    answer: 'FunderPro, haber/EA/swing esnekliği isteyen yatırımcıların ilgisini çekebilir. The5ers ise programa bağlı olarak daha yerleşik ve temkinli bir profili korur.',
    checks: [
      'İndirim kodunu ödeme sayfasında, gereğinden büyük hesap almadan test edin.',
      'Hedef programda haber, EA ve gece pozisyon kurallarını doğrulayın.',
      'Ödeme süresini ve çekim koşullarını karşılaştırın.',
      'Seçmeden önce tam programın resmi kurallarını okuyun.',
    ],
    faq: [
      {
        question: 'FunderPro haber işlemi için uygun mu?',
        answer: 'Resmi sayfa haber işlemine izin verildiğini öne çıkarıyor, ancak programın ayrıntılı koşulları doğrulanmalıdır.',
      },
      {
        question: 'The5ers daha mı temkinli?',
        answer: 'The5ers\'ın daha uzun bir geçmişi var. Bu, her programın kuralını okuma gerekliliğini ortadan kaldırmaz.',
      },
    ],
  },
  'leveraged-prop-firm-avis': {
    title: 'Leveraged prop firması incelemesi: kurallar, ödeme ve Trustpilot',
    metaDescription: 'Leveraged / Get Leveraged incelemesi: programlar, %80 kâr payı, 5k ile 1M arası hesaplar, gece pozisyonu, ödeme, kullanılamayan Trustpilot puanı ve satın alma öncesi kontroller.',
    eyebrow: 'Marka incelemesi',
    h1: 'Leveraged prop firması incelemesi: görünür bir marka, ama satın almadan önce doğrulayın',
    answer: 'Leveraged, portföy programları, 5k ile 1M arası hesapları ve ilan edilen %80 kâr payı olan aktif bir prop firmasıdır. Satın almadan önce program kurallarını, ödeme koşullarını ve kamuya açık puanı kullanılamaz kılan Trustpilot uyarısını doğrulayın.',
    checks: [
      'Seçilen teklifin Jr, Sr, Executive mi yoksa Turbo/Crypto/Sprint/Classic ürünü mü olduğunu doğrulayın.',
      'Kâr hedefini, günlük drawdown\'ı, azami drawdown\'ı, gece/hafta sonu kurallarını ve ödeme sıklığını yeniden okuyun.',
      'Trustpilot uyarısını hesaba katın: kullanılamayan puan ve kaldırıldığı bildirilen yorumlar.',
      'Ödeme yapmadan önce gösterilen ödemeleri Discord, X, Reddit ve resmi koşullarla çapraz kontrol edin.',
    ],
    faq: [
      {
        question: 'Leveraged aktif bir prop firması mı?',
        answer: 'Evet, resmi site aktif programlar, bir topluluk, ürün sayfaları ve portföy hesapları sunuyor. Bu, çapraz kontrol olmadan ödeme güvenilirliğini doğrulamaz.',
      },
      {
        question: 'Get Leveraged konusunda neden temkinli olunmalı?',
        answer: 'Trustpilot, bir kural ihlali nedeniyle kullanılamayan bir puan gösteriyor ve yorumların kaldırıldığını belirtiyor. Bu, satın almadan önce dikkate alınması gereken bir sinyaldir.',
      },
    ],
  },
  'goat-funded-trader-avis': {
    title: 'GOAT Funded Trader incelemesi: FIRSTGFT, BOGO40 ve ödemeler',
    metaDescription: 'GOAT Funded Trader incelemesi: FIRSTGFT ve BOGO40\'ı, 1-step, 2-step, 3-step ve Instant kurallarını, ödeme koşullarını, haber işlemini ve başlıca riskleri karşılaştırın.',
    eyebrow: 'Marka incelemesi',
    h1: 'Goat Funded Trader incelemesi: güçlü teklif, ama satın almadan önce kuralları yeniden okuyun',
    answer: 'GOAT Funded Trader, 1-step, 2-step, 3-step ve Instant Funding modellerini iki güncel resmi teklifle birleştiriyor: FIRSTGFT yeni müşterilere uygun planlarda %50\'ye varan indirim sağlarken BOGO40, %40 indirim ve yalnızca ilk başarılı ödemeden sonra aynı büyüklükte koşullu bir hesap veriyor. Kodu seçmeden önce tam modeli karşılaştırın.',
    checks: [
      'FIRSTGFT ve BOGO40\'ı ödeme sayfasında, gereğinden büyük bir hesap seçmeden karşılaştırın.',
      '1 step, 2 step, 3 step ve Instant modellerini karşılaştırın; kurallar aynı değildir.',
      'Haber işlemini, hafta sonu pozisyon taşımayı, lot büyüklüğünü, günlük kaybı, azami kaybı ve ödeme süresini doğrulayın.',
      'Reddit, Discord ve X\'teki son 30 ila 60 günün geri bildirimlerini okuyun.',
      'İstediğiniz tam programda ödeme reddi örneklerini ve en yaygın ret nedenlerini arayın.',
    ],
    faq: [
      {
        question: 'GOAT Funded Trader\'da FIRSTGFT mi yoksa BOGO40 mı kullanmalıyım?',
        answer: 'FIRSTGFT daha basit bir yeni müşteri teklifidir ve uygun planlarda %50\'ye ulaşabilir. BOGO40 %40 indirim verir, ancak aynı büyüklükteki bonus hesap yalnızca ilk başarılı ödemeden sonra ve destek ekibiyle iletişime geçilerek talep edilebilir. Seçmeden önce ödeme sayfasındaki anlık toplamları karşılaştırın.',
      },
      {
        question: 'Hangi GFT modelini seçmeliyim?',
        answer: 'Instant ve 1-step modelleri daha hızlıdır ama daha katı olabilir. Fonlanmış aşama kuralları devreye girmeden önce daha fazla doğrulama ve daha az baskı istiyorsanız 2-step veya 3-step modelleri daha kolay okunabilir.',
      },
    ],
  },
  'prop-firm-instant-funding': {
    title: 'Anında fonlama sunan prop firması: hızlı erişim, kurallar ve tuzaklar',
    metaDescription: 'Anında fonlama (instant funding) sunan prop firmalarını karşılaştırın: fiyat, drawdown, ödeme, kâr payı, haber işlemi, gizli kural riski ve challenge alternatifleri.',
    eyebrow: 'Anında fonlama',
    h1: 'Anında fonlama sunan prop firması: daha hızlı, daha basit anlamına gelmez',
    answer: 'Hesaba hızlı erişim istiyorsanız anında fonlama faydalı olabilir, ancak ödeme yapmadan önce toplam maliyeti, drawdown\'ı, asgari ödemeyi, lot limitlerini, haber kısıtlamalarını ve çekim maddelerini karşılaştırın.',
    checks: [
      'Anında fonlama fiyatını eşdeğer klasik bir challenge ile karşılaştırın.',
      'Hesabın gerçekten fonlanmış mı yoksa özel kurallara sahip simüle bir hesap mı olduğunu doğrulayın.',
      'Günlük kaybı, azami kaybı, asgari ödemeyi, lot büyüklüğünü ve strateji kısıtlamalarını okuyun.',
      'Sisteminiz normal bir challenge\'ı kaldırabiliyorsa yalnızca bir adımı atlamak için daha fazla ödemekten kaçının.',
    ],
    faq: [
      {
        question: 'Anında fonlama, challenge\'dan daha mı iyi?',
        answer: 'Her zaman değil. Zaman kazandırır, ancak daha pahalı olabilir ve daha katı kurallar getirebilir. Seçim sermayenize, tarzınıza ve disiplininize bağlıdır.',
      },
      {
        question: 'Önce hangi anında fonlama prop firmasını incelemeli?',
        answer: 'Çekim kuralları, drawdown\'ı ve ücretleri okunabilir olan firmalarla başlayın. Yalnızca fiyat yeterli değildir.',
      },
    ],
  },
  'prop-firm-sans-challenge': {
    title: 'Challenge\'sız prop firmalarıyla nasıl başlanır (2026)',
    metaDescription: 'Challenge\'sız bir prop firmasıyla nasıl başlanır: program seçin, uygunluğu doğrulayın, ücretleri ve drawdown\'ı karşılaştırın, kuralları test edin ve ilk ödemenizi anlayın.',
    eyebrow: 'Challenge\'sız',
    h1: 'Challenge\'sız bir prop firmasıyla nasıl başlanır',
    answer: 'Challenge\'sız bir prop firması esas olarak zaman satar. Doğrudan erişim istikrarlı bir yatırımcıya uygun olabilir, ancak fonlanmış aşama kuralları beklenenden sıkıysa daha pahalıya mal olabilir.',
    checks: [
      'Giriş ücretleri ve olası yenilemeler dahil, birkaç aylık gerçek maliyeti karşılaştırın.',
      'Fonlanmış aşama kurallarını doğrulayın: drawdown, haber kısıtlamaları, ölçeklendirme, lot büyüklüğü ve ödeme maddeleri.',
      'Teklifi ucuz bulmadan önce asgari ödemeyi ve çekim sıklığını kontrol edin.',
      'Drawdown türünü teyit edin: sabit, takip eden, gün sonu (EOD) veya akıllı drawdown.',
      'Tutarlılık kurallarını, günlük kayıp limitlerini ve fonlanmış aşamadaki gizli koşulları arayın.',
      'Birkaç ay boyunca test edilmiş istikrarlı bir stratejiniz yoksa bu formattan kaçının.',
    ],
    faq: [
      {
        question: 'Challenge\'sız bir prop firmasıyla nasıl başlarım?',
        answer: 'Piyasayı ve tam programı seçin, uygunluğu ve sözleşmeyi yapan şirketi kontrol edin, fonlanmış hesap kurallarını kaydedin, tüm ücretleri hesaplayın, kayıp limitlerini test edin ve kurulumu tamamlayın. Satın almadan önce ilk ödeme koşullarını anlayın.',
      },
      {
        question: 'Challenge olmadan prop firması hesabı alınabilir mi?',
        answer: 'Evet. Bazı anında veya doğrudan fonlanmış teklifler var, ancak riski ortadan kaldırmazlar. Zorluğu çoğu zaman fonlanmış aşama kurallarına, ücretlere, drawdown\'a veya ödeme koşullarına kaydırırlar.',
      },
      {
        question: 'Challenge\'sız fonlama kimler için uygundur?',
        answer: 'Genellikle istikrarlı bir süreci olan ve ortalama drawdown\'ını bilen yatırımcılara uyar. Yeni başlayanlar için küçük bir klasik challenge daha ucuz ve daha öğretici olabilir.',
      },
      {
        question: 'Hangi prop firmaları challenge\'sız fonlanmış hesap sunuyor?',
        answer: 'Bu sayfadaki tablo, PropRadar dosyalarındaki tüm anında veya doğrudan fonlama programlarını PropRadar puanına göre sıralı olarak; giriş fiyatı, hesap büyüklükleri, drawdown, kâr payı ve Trustpilot durumuyla listeler. Her firma sayfası, her değerin kaynağını ve okunduğu tarihi gösterir.',
      },
      {
        question: 'Challenge\'sız forex, vadeli işlem veya hisse prop firmaları var mı?',
        answer: 'Kayıtlı challenge\'sız programların çoğu forex ve CFD anında hesaplarıdır. Bazı vadeli işlem firmaları değerlendirme yerine doğrudan hesap satar (kayıtlı olanlardan biri Alpha Futures Direct). Bugün kayıtlı yalnızca hisseye yönelik anında bir program yok; hisse CFD\'lerini listeleyen tek kayıtlı anında program FXIFY Instant Funding. Satın almadan önce her programın işlem yapılabilir varlıklarını kontrol edin.',
      },
    ],
  },
  'prop-firm-pour-debutant': {
    title: 'Yeni başlayanlar için prop firması: hesap büyüklüğünden önce açık kuralları seçin',
    metaDescription: 'Yeni başlayanlar için en iyi prop firması: küçük hesapları, açık kuralları, basit drawdown\'ı, ödeme güvenilirliğini, sıfırlama maliyetini ve ilk challenge\'daki yaygın hataları karşılaştırın.',
    eyebrow: 'Yeni başlayan rehberi',
    h1: 'Yeni başlayanlar için prop firması: en büyük hesabı değil, en açık kuralı seçin',
    answer: 'Yeni başlayan biri için en iyi ilk seçim nadiren en büyük hesaptır. Daha küçük bir hesap, okunabilir drawdown, makul fiyat ve uyabileceğiniz kurallar, öğrenmek ve özgüveni korumak için genellikle daha iyidir.',
    checks: [
      'Kuralları ciddi şekilde test etmenize izin veren en küçük hesapla başlayın.',
      'Drawdown\'ın gerçekçi ve koruyucu olduğunu doğrulayın: ne çok sıkı ne de pervasız riski teşvik edecek kadar gevşek.',
      'Sizi mevcut beceri seviyenize uymayan bir hesap büyüklüğüne iten indirimlerden kaçının.',
      'Giriş ücreti, sıfırlamalar ve tekrarlanan denemeler dahil 2 ila 3 aylık gerçek maliyeti karşılaştırın.',
      'Satın almadan önce kuralların tamamını okuyun; yeni başlayanların kayıplarının çoğu atlanan ayrıntılardan gelir.',
      'Kuralları açık, tarihli ve resmi sitede kolayca bulunabilen bir program seçin.',
    ],
    faq: [
      {
        question: 'Yeni başlayan biri önce hangi hesap büyüklüğünü seçmeli?',
        answer: 'İlk deneme için küçük veya orta büyüklükte bir hesap genellikle yeterlidir. Amaç gösterilen bakiyeyi en üst düzeye çıkarmak değil, sürecinizi kurallar altında doğrulamaktır.',
      },
      {
        question: 'Ucuz bir prop firması yeni başlayanlar için her zaman en iyisi mi?',
        answer: 'Her zaman değil. Düşük fiyat ancak kurallar açık kalıyorsa, drawdown gerçekçiyse ve ödeme koşulları beklenenden zor değilse faydalıdır.',
      },
    ],
  },
  'meilleure-prop-firm-forex': {
    title: 'En iyi forex prop firması: MT5, cTrader, ödeme ve kurallar',
    metaDescription: 'Forex prop firmalarını karşılaştırın: FTMO, The5ers, FundingPips, FunderPro, GOAT Funded Trader; spread, haber, EA, ödeme ve platformlar.',
    eyebrow: 'Forex',
    h1: 'En iyi forex prop firması: indirimlerden önce platform, spread ve ödeme',
    answer: 'Forex\'te en iyi prop firması çoğunlukla platforma, spread\'lere, haber/EA kurallarına, drawdown\'a ve ödemeye bağlıdır. Güçlü bir indirim, kötü emir gerçekleşmesini veya tarzınıza uymayan bir kuralı telafi etmez.',
    checks: [
      'MT4, MT5, cTrader veya firmanın kendi platformunu karşılaştırın.',
      'Spread\'leri, komisyonları, kaymayı ve haber kısıtlamalarını doğrulayın.',
      'Asgari ödemeyi ve çekim süresini okuyun.',
      'Yalnızca kâr payına göre değil, pariteye ve seansa göre seçin.',
    ],
    faq: [
      {
        question: 'Önce hangi forex prop firmasını incelemeli?',
        answer: 'Okunabilir kuralları, tarzınıza uyan bir platformu, düşük veya orta ödeme riski ve açık resmi kaynakları olan firmalarla başlayın.',
      },
      {
        question: 'Bir prop firması seçmek için MT5 yeterli mi?',
        answer: 'Hayır. MT5 pratiktir, ancak spread\'leri, haberleri, EA\'yı, drawdown\'ı ve çekim koşullarını da doğrulamanız gerekir.',
      },
    ],
  },
  'alternatives-ftmo': {
    title: 'FTMO alternatifleri: daha ucuz, daha esnek ya da sadece size daha uygun mu?',
    metaDescription: 'FTMO alternatiflerini karşılaştırın: The5ers, Funding Pips, FunderPro ve E8 Markets; fiyat, kurallar, haber işlemi, EA, ödeme, platformlar ve ölçeklendirme.',
    eyebrow: 'FTMO alternatifleri',
    h1: 'FTMO alternatifleri: daha ucuz, daha esnek ya da sadece size daha uygun mu?',
    answer: 'FTMO\'dan ayrılmak için prop firması değiştirmek, ancak alternatif gerçek bir kısıtı çözüyorsa anlamlıdır: daha düşük giriş maliyeti, daha esnek kurallar, daha iyi bir platform, daha hızlı ödeme veya işlem tarzınıza daha uygun bir program.',
    checks: [
      'Neden bir FTMO alternatifi istediğinizi netleştirin: fiyat, kural esnekliği, platform, ödeme zamanlaması veya ölçeklendirme.',
      'Drawdown, haber işlemi, EA ve hafta sonu pozisyon taşımayla ilgili gerçek kuralları doğrulayın.',
      'Yalnızca kampanyaları değil, resmi kaynakları ve son topluluk sinyallerini okuyun.',
      'Başka bir ödeme sayfası indirim gösteriyor diye güvenilir bir firmadan ayrılmayın.',
      'Sıfırlamalar veya tekrarlanan denemeler dahil 3 ila 6 aylık gerçek maliyeti karşılaştırın.',
    ],
    faq: [
      {
        question: 'En iyi FTMO alternatifi hangisi?',
        answer: 'Kısıta bağlıdır. The5ers temkinli ölçeklendirme için, Funding Pips modern challenge seçenekleri için, FunderPro fiyatlandırma ve büyük hesaplar için, E8 Markets ise başka bir modern referans olarak faydalı olabilir. Her zaman güncel kuralları doğrulayın.',
      },
      {
        question: 'FTMO hâlâ kullanmaya değer mi?',
        answer: 'Açık kurallara, güçlü bir kamuya açık geçmişe ve iyi bilinen iki aşamalı bir çerçeveye değer veren birçok yatırımcı için evet. Alternatifler ancak sizin için belirli bir sorunu çözüyorsa ilginçtir.',
      },
    ],
  },
  'prop-firm-avis-reddit-trustpilot': {
    title: 'Prop firmalarına dair Reddit ve Trustpilot yorumları: iyi bir puan yeterli değil',
    metaDescription: 'Prop firması yorumlarını Trustpilot, Reddit, Discord ve X\'te nasıl okuyacağınızı öğrenin: sahte yorum riski, ödeme şikâyetleri, zamanlama, kanıt kalitesi ve indirim kampanyası yanlılığı.',
    eyebrow: 'Yorum sinyalleri',
    h1: 'Prop firmalarına dair Reddit ve Trustpilot yorumları: iyi bir puan yeterli değil',
    answer: 'Trustpilot, Reddit, Discord ve X ancak çapraz kontrol edildiğinde faydalıdır. Yüksek bir kamuya açık puan bile ödeme sorunlarını, belirsiz kuralları veya olumlu yorumları şişiren indirim kampanyalarını gizleyebilir.',
    checks: [
      'Ham puanı filtrelenmiş güvenilirlikten ayırın: tarih, kaldırılan yorumlar ve kampanya bağlamı önemlidir.',
      'Genel puan yüksek olsa bile tekrarlanan ödeme şikâyetlerini arayın.',
      'Olumlu yorumların zamanlamasını büyük indirim kampanyalarıyla karşılaştırın.',
      'Discord, Reddit ve X\'in Trustpilot ile aynı hikâyeyi anlatıp anlatmadığını kontrol edin.',
      'Genel referanslar yerine yakın tarihli ve tarihli ödeme kanıtları arayın.',
    ],
    faq: [
      {
        question: 'Bir prop firması seçmek için Trustpilot yeterli mi?',
        answer: 'Hayır. Trustpilot yorum hacmi için faydalıdır, ancak Reddit, Discord, X, resmi kurallar ve yakın tarihli ödeme kanıtlarıyla çapraz kontrol edilmelidir.',
      },
      {
        question: 'Reddit neden çoğu zaman daha olumsuz görünüyor?',
        answer: 'Memnun yatırımcılar genellikle engellenen veya öfkeli yatırımcılardan daha az paylaşım yapar. Reddit, kaliteyi tek başına ölçmek için değil, sorunları ve örüntüleri bulmak için faydalıdır.',
      },
      {
        question: 'Bir prop firması yorumunu daha güvenilir kılan nedir?',
        answer: 'Somut ayrıntılar: tam program, tarih, ödeme tutarı, ilgili kural, ekran görüntüsünün bağlamı ve aynı sorunun başka platformlarda da görülüp görülmediği.',
      },
    ],
  },
  'prop-firm-payout-proof': {
    title: 'Prop firması ödeme kanıtı: gerçek çekim kanıtını tanıyın',
    metaDescription: 'Prop firması ödeme kanıtı: çekim kanıtını nasıl doğrulayacağınız, pazarlama sertifikalarından nasıl kaçınacağınız ve süreyi, üst sınırları ve olayları nasıl karşılaştıracağınız.',
    eyebrow: 'Ödeme kanıtı',
    h1: 'Prop firması ödeme kanıtı: kanıt tarihli, izlenebilir ve tutarlı olmalı',
    answer: 'Gerçek bir ödeme kanıtının bir tarihi, bağlamı, inandırıcı bir tutarı, izlenebilir bir kaynağı olmalı ve resmi kurallarla tutarlı olmalıdır. Tek başına bir sertifika veya kırpılmış bir ekran görüntüsü yeterli değildir.',
    checks: [
      'Tarihi, tutarı, çekim yöntemini ve kaynağı doğrulayın.',
      'Gösterilen ödemeyi resmi program kurallarıyla karşılaştırın.',
      'Ödeme retlerini ve tekrarlanan gerekçeleri arayın.',
      'Kullanıcı bağlamı olmayan aşırı kusursuz kanıtlara karşı dikkatli olun.',
    ],
    faq: [
      {
        question: 'Bir ödeme ekran görüntüsü yeterli mi?',
        answer: 'Hayır. Ancak tarihli olduğunda, inandırıcı bir hesaba veya tanıklığa bağlandığında ve firma kurallarıyla tutarlı olduğunda faydalı hâle gelir.',
      },
      {
        question: 'Bir firma neden ödemeyi reddedebilir?',
        answer: 'Yaygın nedenler arasında kural ihlalleri, yasaklı haber işlemi, izinsiz kopya işlem, aşırı lot büyüklüğü, arbitraj veya strateji tutarsızlığı bulunur.',
      },
    ],
  },
  'prop-firm-legal-check': {
    title: 'Prop firması hukuki kontrolü: tüzel kişilikler, düzenleyiciler ve kırmızı bayraklar',
    metaDescription: 'Prop firması hukuki kontrolü: sözleşmeyi yapan şirketi, simüle hesap koşullarını, düzenleyici durumunu, ödeme maddelerini ve ödeme anlaşmazlığı risklerini doğrulayın.',
    eyebrow: 'Hukuki inceleme',
    h1: 'Prop firması hukuki kontrolü: tekliften önce tüzel kişiliği doğrulayın',
    answer: 'Bir prop firması araştırılmaya değecek kadar meşru olup yine de düzenlenmiş bir aracı kurum veya yatırım şirketi olmayabilir. Faydalı bir hukuki kontrol; sözleşmeyi yapan şirket, yargı bölgesi, simülasyon uyarısı, düzenleyici durumu, ödeme koşulları ve ödeme anlaşmazlığı maddeleriyle başlar.',
    checks: [
      'Ödeme yapmadan önce tam şirket adını, sicil numarasını, adresi ve yargı bölgesini belirleyin.',
      'Aracı kurum düzenlemesini prop firması challenge hizmetlerinden, simüle hesaplardan ve sanal fonlardan ayırın.',
      'Firmanın aracı kurum, yatırım danışmanı veya mevduat kabul eden bir kurum olmadığını belirtip belirtmediğini okuyun.',
      'Tahkim, toplu davadan feragat, iade, ters ibraz (chargeback) ve ödemenin kaybedilmesi maddelerini kontrol edin.',
      'Kısıtlı ülkeleri ve seçtiğiniz ürünün yargı bölgenizde sunulup sunulmadığını doğrulayın.',
      'Tam marka adını bağımsız finans basınında arayın ve güvenilir bir haber bulunmadığında bunu not edin.',
      'Düzenleyici uyarılarını ve kamuya açık sicilleri pazarlama iddiaları olarak değil, risk sinyalleri olarak kullanın.',
    ],
    faq: [
      {
        question: 'Tescilli bir şirket, prop firmasını güvenli kılar mı?',
        answer: 'Hayır. Tescilli bir şirket izlenebilirliği artırır, ancak prop firması ürününün bir aracı kurum, yatırım danışmanı veya vadeli işlem komisyoncusu (futures commission merchant) gibi otomatik olarak düzenlendiği anlamına gelmez.',
      },
      {
        question: 'En önemli hukuki kırmızı bayrak nedir?',
        answer: 'En büyük kırmızı bayrak, sözleşmeyi yapan şirkete dair belirsiz bilgilerdir; bunu düzenleyici uyarıları, belirsiz ödeme hakları, agresif hak kaybı maddeleri ve koşullar simüle hesaplardan söz ederken gerçek sermaye izlenimi veren pazarlama izler.',
      },
      {
        question: 'Simüle işlem neden hukuken önemlidir?',
        answer: 'Simüle işlem genellikle yatırımcının normal bir aracı kurum hesabı veya müşteri fonu koruması almadığı anlamına gelir. Ödüller, olağan çekim haklarına değil, sözleşme kurallarına, incelemelere ve uygunluğa bağlıdır.',
      },
    ],
  },
};

export default tr;
