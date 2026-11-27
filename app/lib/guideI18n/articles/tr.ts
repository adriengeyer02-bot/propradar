import type { GuideArticleSection } from '../../guideArticles';

/**
 * Turkish translations of the long guide articles: same section order as the English
 * ones, including callouts, comparison tables, stats and fit lists (rendered by
 * LocalizedGuide through mergeArticle, which keeps the English diagrams and sources).
 */
const tr: Record<string, { intro?: string; sections: Omit<GuideArticleSection, 'visual'>[] }> = {
  'hyrotrader-vs-tradeify': {
    intro: 'HyroTrader ile Tradeify arasındaki seçim öncelikle bir **kripto ile vadeli işlem kararıdır**. Faydalı karşılaştırma, her programın kayıpları nasıl ölçtüğü, kârları nasıl hesaba kattığı ve bir ödemenin kilidini nasıl açtığıdır. Bu inceleme 15 Kasım 2026\'da erişilebilen resmi kural sayfalarını kullanır; pazarlamadaki ödeme iddialarını bağımsız olarak doğrulanmış transferler olarak kabul etmez.',
    sections: [
      {
        heading: 'Hangi piyasada işlem yapmak istiyorsunuz?',
        paragraphs: [
          'HyroTrader, desteklenen kripto platformları üzerinden erişim de dahil olmak üzere simüle edilmiş kripto hesapları tanımlar. Değerlendirme yolları ve Hyro Instant, bir aracı kurum mevduatı veya canlı sermaye vaadi değildir. Tradeify\'ın Growth, SELECT ve Lightning programları ise vadeli işlemler etrafında tasarlanmıştır; Lightning simüle fonlarla başlar.',
          'Bir hesap, stratejinizin gerçekten kullandığı enstrümanlar ve işlem seansıyla karşılaştırılmalıdır. Kripto perpetual stratejisi bir vadeli işlem sözleşmesine otomatik olarak aktarılamaz. Nominal $50,000 bakiyeyi veya bir indirimi karşılaştırmadan önce platformu, ürün listesini ve seans kurallarını doğrulayın.',
        ],
      },
      {
        heading: 'HyroTrader günlük drawdown\'ı: sıfırlama anındaki özsermaye önemlidir',
        paragraphs: [
          'HyroTrader\'ın günlük tabanı 00:00 UTC\'deki özsermayeden başlar, ardından ilk hesap bakiyesinin sabit bir yüzdesini düşer. SSS\'si **Hyro Core ve Hyro Instant için %3, One-Step için %4 ve Two-Step için %5** oranlarını listeler. Açık kâr ve zarar ile ücretler özsermayeye dahildir.',
          'Örnek: $10,000\'lık bir Hyro Instant hesabı bir UTC gününe $10,300 özsermayeyle başlıyor. Günlük payı $300 olduğundan günlük taban $10,000\'dır. Özsermaye o gün içinde $10,800\'e yükselirse günlük taban bu yeni zirveyi takip etmez. Bir sonraki UTC günü yeni bir günlük başlangıç noktası belirler.',
          'Toplam kayıp limiti ayrı bir kontroldür. Hyro Instant %5 azami kayıp yayımlar, buna ek olarak işleme özgü bir kayıp kuralı vardır: ücretler dahil, tamamen kapanmış tek bir işlemde ilk bakiyenin %2\'sini aşmak bir uyarıya yol açar; böyle ikinci bir işlem hesabı sonlandırır. Günlük pay bu koşulların hiçbirini geçersiz kılmaz.',
        ],
      },
      {
        heading: 'Tradeify EOD drawdown\'ı: kapanışta güncellenir, anında uygulanır',
        paragraphs: [
          'Tradeify\'ın kural sayfası, Growth, SELECT ve Lightning programlarının **gün sonu takip eden drawdown** kullandığını belirtir. Yeni bir en yüksek kapanış bakiyesi tabanı yükseltebilir. Sonraki zararlı bir kapanış tabanı düşürmez. Yine de mevcut taban, bakiye artı açık kâr ve zarara karşı sürekli uygulanır.',
          '$2,000 drawdown payı olan $50,000\'lık bir hesapla örnek: ilk taban $48,000\'dır. $51,000\'lık en yüksek kapanış bakiyesi tabanı $49,000\'e çıkarır. Ertesi gün net tasfiye değerinde $49,000\'e değmek hesabı anında başarısız kılabilir. Kapanıştan önceki bir toparlanma ihlali geri almaz.',
          'Simüle fonlanmış hesaplarda yayımlanan kilit mekanizması, eşiğine ulaşıldığında veya bir ödeme talep edildiğinde tabanı ilk bakiyenin $100 üzerinde sabitleyebilir. Değerlendirme hesapları bu kilit kuralını paylaşmaz. Tam ürününüzün tutarını her zaman okuyun.',
        ],
      },
      {
        heading: 'Tutarlılık kuralları farklı aşamalara ve paydalara uygulanır',
        paragraphs: [
          'HyroTrader\'ın Core, One-Step ve Two-Step değerlendirmeleri, bir günün hesaba katılan katkısını **kâr hedefinin %40\'ı** ile sınırlar. Fazla kâr hesapta kalır ama hedefe sayılmaz; kayıplar ise sayılmaya devam eder. SSS\'si bu değerlendirme dağılım kuralının Hyro Instant\'a uygulanmadığını söyler.',
          'Tradeify SELECT, **değerlendirme sırasında toplam kârın %40\'ı** olan bir en iyi gün payı kullanırken Growth\'ta değerlendirme tutarlılık yüzdesi yoktur. Bunlar farklı hesaplamalardır: hedefin bir payı, birikmiş kârın bir payı değildir.',
          'Fonlanmış aşamanın kendi kuralları vardır. Tradeify, Growth simüle fonlanmış ödemeleri için %35, SELECT fonlanmış hesaplar için tutarlılık yüzdesi olmadığını ve daha yeni Lightning hesapları için **%20, ardından %25, ardından %30** şeklinde bir ilerleme listeler. Eski Lightning satın alımları her ödeme için %20\'yi koruyabilir. Satın alma tarihini ve hesap aşamasını birlikte kontrol edin.',
        ],
      },
      {
        heading: 'Hyro Instant ve Lightning Funded: ilk ödemeyi karşılaştırın',
        paragraphs: [
          'Hyro Instant değerlendirme hedefi listelemez. İlk talep için **üç geçerli UTC işlem günü** ve paylaşımdan sonra en az $25 kâr gerekir. Geçerli bir günün işlem büyüklüğü ve fiyat hareketine dair özel bir tanımı vardır; bu yüzden herhangi bir küçük işlem açmak yeterli değildir. SSS, ödeme başına sayılan kârı ilk bakiyenin %5\'iyle sınırlar; bu sınırın üzerindeki kâr ödenmez. Başlangıç kâr payı %80\'dir ve takdire bağlı artışlar mümkündür.',
          'Tradeify Lightning de değerlendirmeyi atlar, ancak bir ödeme kâr hedefi ve tutarlılık gerektirir. Yayımlanan $50,000 örneğinde ilk hedef **$3,000** iken ilk talep **$2,000** ile sınırlıdır. Tradeify, yatırımcıların talep edilen tutarın %90\'ını aldığını söyler. Hedef, talep üst sınırı ve alınan tutar üç farklı rakamdır.',
          'Lightning\'in bir sonraki kâr hedefi yeni işlem kârları gerektirir; önceki döngüden kalan kâr bunu karşılamaz. Tradeify\'ın fonlanmış hesap kuralına göre bir talep ayrıca drawdown tabanını kilitler; bu yüzden bir ödemeden sonra kalan kayıp alanını kontrol edin. Uygunluk, bir talebin onaylanacağının garantisi değildir.',
        ],
        callout: {
          kind: 'example',
          text: 'Varsayımsal Lightning ilk talebi: $3,000 hedefine ulaşmak $3,000\'ı çekilebilir kılmaz. %90 kâr payıyla $2,000\'lık bir talep, diğer tüm koşullara tabi olarak yatırımcıya $1,800 kazandırır.',
        },
      },
      {
        heading: 'Ödeme sayfasından önce pratik bir risk yönetimi kontrol listesi',
        paragraphs: [
          'Normal işlem sürecinizi tam hesap kurallarına karşı yeniden oynatın. Ücretlerden, açık kayıplardan sonraki net sonuçları ve gerçek sıfırlama saatini kullanın. Bir strateji her işlemde zarar durdurmaya uyup yine de birkaç pozisyon boyunca toplam hesap tabanını ihlal edebilir.',
        ],
        bullets: [
          '**Her iki tabanı da kaydedin:** günlük kayıp ve azami drawdown; sınıra değmenin mi yoksa onu geçmenin mi ihlale yol açtığı dahil.',
          '**Aşamayı takip edin:** değerlendirme, simüle fonlanmış aşama ve sonraki herhangi bir canlı geçişin farklı koşulları olabilir.',
          '**Çekimi modelleyin:** kâr hedefi, en iyi gün hesaplaması, talep üst sınırı, kâr payı ve ödemeden sonra kalan kayıp alanı.',
          '**Erişimi ve maliyetleri kontrol edin:** izin verilen ülke, desteklenen platform, seans kapanış kuralları, giriş ücreti ve geçerliyse aktivasyon, yenileme ve veri maliyetleri.',
          '**Sürümü saklayın:** satın alma tarihine uygulanan sözleşmeyi ve resmi kuralları kaydedin. Yeni hesap kuralları eski bir hesaptakilerden farklı olabilir.',
        ],
      },
      {
        heading: 'Bu iki model arasında nasıl seçim yapılır',
        paragraphs: [
          'Strateji HyroTrader\'ın desteklediği kripto enstrümanlarını gerektiriyorsa HyroTrader\'ın kurallarıyla başlayın. Strateji Tradeify\'ın vadeli işlem piyasası etrafında kuruluysa Tradeify\'ın kurallarıyla başlayın. Ardından programın kayıp payını ve ilk çekime giden yolun tamamını karşılaştırın.',
          'Bu karşılaştırma ne iki firmanın ödeme gücünü ne de bir yatırımcının ödeme alma olasılığını ortaya koyar. Belirtilen bir tarihteki yayımlanmış koşullarını anlatır. Belgelenmiş arka plan için bağlantılı firma dosyalarını kullanın ve satın almadan önce güncel sözleşmeyi kontrol edin.',
        ],
      },
    ],
  },
  'prop-firm-hidden-rules': {
    intro: 'Bir prop firması cömert bir kâr payı ve kolay bir challenge ilan ederken bağlayıcı sözleşme, ne zaman çekim yapabileceğinizi önemli ölçüde değiştiren koşullar içerebilir. Bunlar şirketin kasıtlı olarak gizlediği kurallar olmak zorunda değil, **gözden kaçması kolay kurallardır**: aşağıdaki örnekler firmaların kendi kamuya açık belgelerinden alınmıştır. **PropRadar\'ın iş ortaklarını da dahil ediyoruz.** Hiçbir sıralama veya ortaklık komisyonu incelemeden muafiyet satın alamaz.',
    sections: [
      {
        heading: '1. Değerlendirmede serbest olan haber işlemi, fonlandıktan sonra kâr kesintisine yol açabilir',
        paragraphs: [
          'E8 Markets, **E8 Classic değerlendirmesi** sırasında haber işleminin kısıtlamasız olduğunu söylüyor. Ancak bir Classic SimFi Performance hesabında **haber penceresinde elde edilen kârların yalnızca %40\'ı uygun kâr olarak sayılır**. Ayrı E8 One ürünü performans hesaplarında haber penceresindeki bazı işlemleri yasaklarken E8 Pro haber işlemine izin verir. Bunlar tek bir marka içinde üç ayrı kuraldır.',
          'FundingPips de benzer şekilde değerlendirme ve Master aşamalarını ayırır. Birkaç Master modelinde, belirtilen yüksek etkili haber pencerelerinde açılan veya kapanan işlemlerden elde edilen kârlar **kesilebilir**; olaydan en az beş saat önce açılan pozisyonlar için belirtilmiş bir istisna vardır. FundingPips Zero\'nun daha katı kısıtlamaları var. Fonlanmış aşama iznini değerlendirme aşaması başlığından çıkarmayın.',
        ],
        callout: {
          kind: 'warning',
          text: 'Bir işlem platformunun Al veya Sat\'a tıklamanıza izin vermesi, **sözleşmenin o işleme izin verdiği anlamına gelmez**. İşlem yapmadan önce tam hesap modelini, ekonomik takvimi ve saati kontrol edin.',
        },
      },
      {
        heading: 'Haber işlemi kural kaydı: değerlendirme ve fonlanmış aşama (resmi kaynaklar)',
        paragraphs: [
          'Bunlar evrensel bir kara liste değil, **incelediğimiz on program grubudur**. Bir duyuru sırasında pozisyon tutmaya izin verilmesi, haber sıçramasında işlem açma izniyle aynı şey değildir. Aşağıdaki kurallar şirketin sattığı her ürüne otomatik olarak değil, **adı geçen belirli programlara ve aşamalara** uygulanır.',
        ],
        compare: {
          columns: [
            'Değerlendirme aşaması',
            'Kalifiye / fonlanmış aşama',
          ],
          rows: [
            {
              label: 'E8 Classic',
              values: [
                'Haber kısıtlamasız',
                '**Haber penceresi kârlarının %40\'ı uygun sayılır**',
              ],
              sourceUrl: 'https://help.e8markets.com/en/articles/9185497-can-i-trade-news',
            },
            {
              label: 'E8 One',
              values: [
                'Haber kısıtlamasız',
                '**Yüksek etkili haberin ±5 dakikası içinde işlem yok**; kârlar silinebilir',
              ],
              sourceUrl: 'https://help.e8markets.com/en/articles/9185497-can-i-trade-news',
            },
            {
              label: 'E8 Pro',
              values: [
                'Kısıtlamasız',
                'Genel risk kurallarına tabi olarak kısıtlamasız',
              ],
              sourceUrl: 'https://help.e8markets.com/en/articles/9185497-can-i-trade-news',
            },
            {
              label: 'FundingPips Flex / Standard / Pro',
              values: [
                'Pozisyon tutmaya izin var; kasıtlı haber sıçraması işlemi yasak',
                '**Etkilenen Master kârları kesilir**; 5 saatlik swing istisnası',
              ],
              sourceUrl: 'https://help.fundingpips.com/hc/en-us/articles/34504137479441-News-Trading-Weekend-Holding',
            },
            {
              label: 'FundingPips Zero',
              values: [
                'Tam sözleşmeyi kontrol edin',
                '**Kısıtlı haberlerde açma, kapama veya pozisyon tutma yok**; Master\'da 10 dakikalık pencereler',
              ],
              sourceUrl: 'https://help.fundingpips.com/hc/en-us/articles/34504137479441-News-Trading-Weekend-Holding',
            },
            {
              label: 'Blue Guardian CFD 1-Step Standard',
              values: [
                'Habere izin var',
                'Yüksek etkili haberler etrafında **±5 dakika açma veya kapama yok**',
              ],
              sourceUrl: 'https://help.blueguardian.com/en/articles/18426782-1-step-standard-rules',
            },
            {
              label: 'BrightFunded CFD Phase 1 / 2',
              values: [
                'Haber işlemi kısıtlamasız',
                '**±5 dakikadaki işlemlerin kârları kesilir**; Instant ilk günden kısıtlı',
              ],
              sourceUrl: 'https://help.brightfunded.com/en/articles/9241694-can-i-trade-news',
            },
            {
              label: 'Alpha Futures Standard / Zero / Direct',
              values: [
                'Standard / Zero değerlendirmesi: kısıtlamasız; Direct değerlendirmeyi atlar',
                'Belirtilen Qualified planlarda **±2 dakika emir yok**; Advanced Qualified farklıdır',
              ],
              sourceUrl: 'https://help.alpha-futures.com/en/articles/9492063-news-trading-policy',
            },
            {
              label: 'Alpha Capital Pro / One / Three / Direct',
              values: [
                'Değerlendirme: kısıtlamasız; Direct\'te değerlendirme yok',
                'Hedeflenen haberlerde **±5 dakika işlem yok**; bir TP dolumu bile kârı geçersiz kılabilir',
              ],
              sourceUrl: 'https://help.alphacapitalgroup.uk/en/articles/9293522-can-i-trade-news',
            },
            {
              label: 'Tradeify Futures',
              values: [
                'Habere izin var',
                'Genel SSS\'sine göre habere izin var',
              ],
              sourceUrl: 'https://help.tradeify.co/en/articles/12268494-common-faqs',
            },
          ],
          note: '16 Kasım 2026\'da incelendi. Orijinal kuralı okumak için bir firmanın yanındaki ↗ simgesine tıklayın. Bunlar şirket politikalarıdır; her yatırımcı anlaşmazlığının nasıl karara bağlandığının bağımsız kanıtı değildir.',
        },
      },
      {
        heading: '2. VPN veya VPS, aksi hâlde kârlı işlemleri geçersiz kılabilir',
        paragraphs: [
          'GOAT Funded Trader, **6 Ekim 2026**\'dan itibaren VPN, VPS, proxy veya barındırılan bir ortam üzerinden işlem yapmanın yasak olduğunu belirtiyor. Yardım merkezi, bu şekilde gerçekleştirilen işlemlerin hesabın anında ihlaline yol açabileceğini ve ilgili ödüllerin ödemeye uygun olmayacağını söylüyor. İlk sunucu girişi için dar kapsamlı bir istisna ve kendi panel kopyalayıcısı için ayrı bir istisna tanımlıyor.',
          'Bu yayımlanmış bir sözleşme kısıtlamasıdır, **şirketin meşru ödemeleri usulsüz şekilde reddettiğinin kanıtı değildir**. Yine de algoritmik yatırımcılar ve internet erişimi yaygın olarak yönlendirme hizmetleri kullanan ziyaretçiler için kritiktir.',
        ],
      },
      {
        heading: 'VPN / VPS izleme listesi: hangi firmalar bunları kısıtlıyor?',
        paragraphs: [
          '**VPN (bağlantı maskeleme) ve VPS (uzak işlem sunucusu) farklı araçlardır.** Bazı firmalar ikisini de yasaklar, bazıları VPN\'e izin verip barındırılan emir gerçekleştirmeyi yasaklar, diğerleri ise yalnızca ikametinizi gizlemeyi yasaklar. İşte iş ortakları da dahil olmak üzere **örneklemimizde tanımlanabilir ve kaynaklı politikası olan 11 şirket**. "Koşullu", "her yerde yasak" demek değildir.',
        ],
        compare: {
          columns: [
            'VPN',
            'VPS / uzaktan emir gerçekleştirme',
          ],
          rows: [
            {
              label: 'GOAT Funded Trader',
              values: [
                'İşlem için **yasak** (6 Ekim 2026\'dan beri)',
                '**Yasak**; sınırlı şirket aracı istisnası',
              ],
              sourceUrl: 'https://help.goatfundedtrader.com/en/articles/17362726-can-i-use-a-vpn-vps-proxy-or-any-other-hosting-service-while-trading',
            },
            {
              label: 'FundingPips',
              values: [
                'Bir işlem hesabına erişirken **yasak**',
                'Bir işlem hesabına erişirken **yasak**',
              ],
              sourceUrl: 'https://help.fundingpips.com/hc/en-us/articles/34505029138449-Trading-Conduct-and-Security-Standards',
            },
            {
              label: 'Topstep / TopstepX',
              values: [
                '**Yasak** (proxy ve TOR da)',
                'Uzak sunucu veya API üzerinden **emir iletimi yok**; salt okunur analize izin var',
              ],
              sourceUrl: 'https://help.topstep.com/en/articles/11187768-topstepx-api-access',
            },
            {
              label: 'FundedNext CFD',
              values: [
                'Dışlanan ülke IP\'leri hariç **izinli**',
                '**$50k ve üzeri yasak**; $50k altında ücretli eklenti, yalnızca uygun işlem EA\'sı; manuel emir yok',
              ],
              sourceUrl: 'https://help.fundednext.com/en/articles/8223809-can-i-use-a-vpn-or-vps',
            },
            {
              label: 'Alpha Capital Group',
              values: [
                '**Koşullu**: özel statik IP + önceden bildirim',
                '**Koşullu**: özel statik IP + önceden bildirim',
              ],
              sourceUrl: 'https://help.alphacapitalgroup.uk/en/articles/8420522-what-is-the-ip-rule-are-vpns-and-vpss-allowed',
            },
            {
              label: 'Tradeify Futures',
              values: [
                '**Girişte VPN yok**',
                '**Normal girişten sonra** izinli, risk yatırımcıya ait',
              ],
              sourceUrl: 'https://help.tradeify.co/en/articles/12268494-common-faqs',
            },
            {
              label: 'FTMO CFD',
              values: [
                '**Genel olarak izinli**; adı geçen platformlarda ABD konumundan kaçının',
                '**Genel olarak izinli**; ABD platform/konum istisnası',
              ],
              sourceUrl: 'https://ftmo.com/en/faq/can-i-travel-or-use-vpn-vps/',
            },
            {
              label: 'Blue Guardian CFD 1-Step Standard',
              values: [
                '**İzinli**; kopya/grup işlem kurallarını aşmak yok',
                'Aynı koşulla **izinli**',
              ],
              sourceUrl: 'https://help.blueguardian.com/en/articles/18426782-1-step-standard-rules',
            },
            {
              label: 'Apex Trader Funding',
              values: [
                '**Kimliği/konumu gizlemek veya kuralları aşmak için kullanıldığında** yasak',
                'Aynı kural aşma karşıtı koşul; yayımlanmış genel bir yasak değil',
              ],
              sourceUrl: 'https://apextraderfunding.com/help-center/uncategorized/prohibited-activities/',
            },
            {
              label: 'The5ers',
              values: [
                '**Ülke kısıtlamalarını aşmak yok**; genel yasak tespit edilmedi',
                'Atıf yapılan koşullarda genel bir VPS kuralı tespit edilmedi',
              ],
              sourceUrl: 'https://the5ers.com/terms-and-conditions/',
            },
            {
              label: 'HyroTrader (kripto)',
              values: [
                'Borsa/platform bölge kısıtlamalarını **aşmak yok**',
                'Platforma ve kendi koşullarına bağlı; doğrulanmış evrensel bir yasak yok',
              ],
              sourceUrl: 'https://www.hyrotrader.com/faq/platform/which-countries-are-allowed-to-join-hyrotrader-can-i-join-from-the-usuk/',
            },
          ],
          note: 'Kaynak bağlantılı kayıt; ödenmemiş ödeme iddiası değildir. 16 Kasım 2026\'da güncellendi. Kurallar ürüne, hesap büyüklüğüne, platforma ve ülkeye göre değişebilir. Diğer firmalar bu konu için henüz incelenmedi.',
        },
        callout: {
          kind: 'warning',
          text: 'Bir işlem robotunu VPS üzerinde çalıştırmak, **EA\'lara izin verildi diye otomatik olarak serbest değildir**. Sunucu, IP, hesap büyüklüğü ve emir yönlendirme kurallarını ayrı ayrı kontrol edin.',
        },
      },
      {
        heading: '3. "Scalping serbest" yine de süre ve marjin limitleriyle gelebilir',
        paragraphs: [
          'Blue Guardian Futures programında scalping\'e izin veriyor, ancak **toplam kârın yarısından azının 10 saniyeden kısa tutulan işlemlerden gelebileceğini** söylüyor. Ayrıca CFD hesaplarında **%80 marjin kullanım eşiğini** "hep ya da hiç" kumar kuralı olarak tanımlıyor; sonuçlar arasında kârların silinmesi veya bir ödemenin reddedilmesi olabilir.',
          'Dolayısıyla "scalping serbest" veya "EA serbest" gibi bir etiket, satın alma kararı vermek için fazla geniştir. İşlem süresi eşiklerine, otomasyon kısıtlamalarına ve birden fazla hesabın nasıl ele alındığına bakın.',
        ],
      },
      {
        heading: '4. Tutarlılık, challenge geçildikten sonra bir ödemeyi geciktirebilir',
        paragraphs: [
          'Tutarlılık kuralı, toplam kârınızın ne kadarının en iyi işlem gününüzden geldiğini ölçer. Topstep\'te kural ve yüzdesi, **Trading Combine\'da mı yoksa fonlanmış bir ödeme yolunda mı olduğunuza bağlıdır**. İki aşama birbirine karıştırılmamalıdır.',
          'Örnek: %50\'lik en iyi gün limitiyle $1,200\'lık kazançlı bir gün, oranın %50\'ye düşmesi için en az **$2,400 toplam kâr** gerektirir. Üst sınırın üzerindeki bir oranı düzeltmenin doğru yolu genellikle kasıtlı olarak para kaybetmek değil, ek uygun kâr elde etmektir.',
        ],
        callout: {
          kind: 'tip',
          text: '**Tutarlılık kuralı olmayan prop firmaları** hakkındaki ayrı rehberimizi okuyun. "Tutarlılık yok" yalnızca olası bir kısıtlamayı kaldırır; drawdown, haber veya ödeme koşullarını kaldırmaz.',
        },
      },
      {
        heading: '5. İkamet ülkesi, çekim yapma uygunluğuyla aynı şey değildir',
        paragraphs: [
          'GOAT Funded Trader kabul etmediği ülkeler arasında **Singapur**\'u açıkça listeliyor. Apex Trader Funding, yeni veya ek hesaplardan dışlanan ülkeler arasında **Çin**\'i listeliyor. Her iki ülke de uluslararası kitlemize katkıda bulunduğu için bunlar PropRadar ziyaretçileri açısından özellikle önemli örneklerdir.',
          'Bir firmanın farklı ürünleri farklı coğrafi listeler kullanabilir. FTMO CFD ve FTMO Futures öyle; E8 Classic ve E8 Futures da öyle. Ödeme sayfasından geçmek, yurt dışına seyahat etmek veya ülkenizde bir firmayı görmek; KYC\'nin, vatandaşlık kontrollerinin, desteklenen platform erişiminin ve mevcut ödeme yöntemlerinin **yerini tutmaz**.',
        ],
        compare: {
          columns: [
            'Hindistan',
            'Çin anakarası',
            'Singapur',
          ],
          rows: [
            {
              label: 'FTMO CFD',
              values: [
                'Uygun olarak yayımlandı',
                'Uygun olarak yayımlandı',
                'Uygun olarak yayımlandı',
              ],
              sourceUrl: 'https://ftmo.com/en/faq/who-can-join-ftmo/',
            },
            {
              label: 'Topstep Futures',
              values: [
                'Uygun olarak yayımlandı',
                '**Bireysel doğrulama gerekli**',
                'Uygun olarak yayımlandı',
              ],
              sourceUrl: 'https://help.topstep.com/en/articles/8284116-am-i-eligible-to-trade-with-topstep',
            },
            {
              label: 'My Funded Futures',
              values: [
                'Uygun olarak yayımlandı',
                '**Dışlandı**',
                'Uygun olarak yayımlandı',
              ],
              sourceUrl: 'https://help.myfundedfutures.com/en/articles/8229993-restricted-countries-policy',
            },
            {
              label: 'Apex Trader Funding',
              values: [
                'Uygun olarak yayımlandı',
                '**Dışlandı**',
                'Uygun olarak yayımlandı',
              ],
              sourceUrl: 'https://apextraderfunding.com/help-center/getting-started/restricted-countries/',
            },
            {
              label: 'GOAT Funded Trader',
              values: [
                'Uygun olarak yayımlandı',
                'Uygun olarak yayımlandı',
                '**Dışlandı**',
              ],
              sourceUrl: 'https://help.goatfundedtrader.com/en/articles/10742187-which-countries-are-restricted-at-goat-funded-trader',
            },
            {
              label: 'FundedNext CFD',
              values: [
                'Uygun olarak yayımlandı',
                'Uygun olarak yayımlandı',
                'Uygun olarak yayımlandı',
              ],
              sourceUrl: 'https://help.fundednext.com/en/articles/8020080-are-any-countries-restricted-on-fundednext-cfds',
            },
            {
              label: 'Fintokei',
              values: [
                '**Dışlandı**',
                '**Geçici olarak dışlandı**',
                'Uygun olarak yayımlandı',
              ],
              sourceUrl: 'https://support.fintokei.com/en/articles/6538820-who-can-join-fintokei',
            },
            {
              label: 'Alpha Futures',
              values: [
                'Uygun olarak yayımlandı',
                '**Dışlandı**',
                'Uygun olarak yayımlandı',
              ],
              sourceUrl: 'https://help.alpha-futures.com/en/articles/9523389-countries-with-limitations',
            },
            {
              label: 'Alpha Capital Group',
              values: [
                'Uygun olarak yayımlandı',
                'Uygun olarak yayımlandı',
                'Uygun olarak yayımlandı',
              ],
              sourceUrl: 'https://help.alphacapitalgroup.uk/en/articles/8775575-countries-with-limitations',
            },
            {
              label: 'Lucid Trading',
              values: [
                'Uygun olarak yayımlandı',
                'Uygun olarak yayımlandı',
                'Uygun olarak yayımlandı',
              ],
              sourceUrl: 'https://support.lucidtrading.com/en/articles/11404636-restricted-countries',
            },
            {
              label: 'PipFarm',
              values: [
                'Uygun olarak yayımlandı',
                'Uygun olarak yayımlandı',
                'Uygun olarak yayımlandı',
              ],
              sourceUrl: 'https://help.pipfarm.com/en/articles/4318163-prohibited-country-list',
            },
            {
              label: 'HyroTrader (Hyro platformu)',
              values: [
                'Uygun olarak yayımlandı',
                'Uygun olarak yayımlandı',
                'Uygun olarak yayımlandı',
              ],
              sourceUrl: 'https://www.hyrotrader.com/faq/platform/which-countries-are-allowed-to-join-hyrotrader-can-i-join-from-the-usuk/',
            },
            {
              label: 'BrightFunded CFD',
              values: [
                'Uygun olarak yayımlandı',
                'Uygun olarak yayımlandı',
                'Uygun olarak yayımlandı',
              ],
              sourceUrl: 'https://help.brightfunded.com/en/articles/9286630-what-countries-are-restricted-at-brightfunded',
            },
            {
              label: 'Upcomers',
              values: [
                'Uygun olarak yayımlandı',
                'Uygun olarak yayımlandı',
                'Uygun olarak yayımlandı',
              ],
              sourceUrl: 'https://help.upcomers.com/en/articles/8703655-are-there-any-prohibited-countries',
            },
          ],
          note: 'Atıf yapılan yayımlanmış genel politikaya göre kabul, 16 Kasım 2026\'da kontrol edildi; yasal lisans, KYC onayı veya ödeme vaadi değildir. Yeşil durumlar, firmaların açıkça "istisnalar dışında dünya geneli" politikalarına dayanır, gerçek test alımlarına değil. Farklı bir challenge veya üçüncü taraf bir platform yanıtı değiştirebilir.',
        },
        callout: {
          kind: 'warning',
          text: 'PropRadar\'ın ülke filtresi, yasal izni, düzenleyici lisansı veya garantili bir ödemeyi değil, firmaların **yayımlanmış kabul koşullarını** yansıtır. Bir ürün doğrulanamadığında tahmin etmek yerine **Doğrulanmadı** deriz.',
        },
      },
      {
        heading: '6. Kısıtlı bir ülkeyi ziyaret etmek, başka bir yerde yaşasanız bile ihlal sayılabilir',
        paragraphs: [
          'Take Profit Trader, yasaklı bir konumdan gerçekleşen tek bir işlem veya piyasa verisi erişim olayının bile hesap kısıtlamasını tetikleyebileceğini söylüyor. Erişimi böyle bir ülke üzerinden yönlendiren VPN\'leri ve uzak bağlantıları açıkça anıyor. İzin verilen bir yargı bölgesinde yaşayan biri bu nedenle dizüstü bilgisayarını yurt dışına götürmeden önce **seyahat ve IP kurallarını** kontrol etmelidir.',
          'Her firma bu kuralı kullanmıyor: Tradeify, genel coğrafi kısıtlamasının **kısa süreli seyahate değil, daimi ikamete** dayandığını söylüyor. Bu yüzden iki firma aynı yolculuğu farklı şekilde ele alabilir.',
        ],
      },
      {
        heading: '7. Bir ödeme, takdire bağlı sözleşmesel onaya dayanabilir',
        paragraphs: [
          'Apex Trader Funding\'in kendi Risk Disclosure belgesi, Performance Account ödüllerinin şirketin **takdirine** bağlı olarak verildiğini ve bir ödülü ödeme veya reddetme kararlarının kesin olduğunu söylüyor. Bu, User Agreement ve yayımlanmış ödeme kriterleriyle birlikte okunması gereken önemli bir maddedir.',
          'Takdire bağlı bir madde, **bir şirketin geçerli ödemeleri sistematik olarak reddettiğinin kanıtı değildir**. Ancak bir yatırımcının para harcamadan önce kurallara uyduğunu belgelemesi ve anlaşmazlık ve itiraz yollarını anlaması gerektiği anlamına gelir.',
        ],
      },
      {
        heading: '8. Fonlanmış ve canlı aşamalar birbirinin yerine geçmeyebilir',
        paragraphs: [
          'Tradeify, Live Account\'a girişi reddedilen yatırımcıların simüle aşamaya kolayca geri dönemeyeceğini söylüyor. FTMO Futures da Sim-Funded deneyimini, ek ülkelerde kısıtlı olan Live Funded Account\'a geçiş uygunluğundan ayırıyor.',
          'Firmanın fonlanmış bir aşama mı, canlı bir aracı kurum hesabı mı yoksa yalnızca simüle bir ödül programı mı vaat ettiğini sorun. Reklamdaki **"fonlanmış" kelimesi her yerde aynı sözleşme düzenlemesini tanımlamaz**.',
        ],
      },
      {
        heading: '9. Sürpriz koşulları olmayan bir prop firması nasıl bulunur',
        paragraphs: [
          'Hiçbir bağımsız site, bir şirketin *hiç* gizli kuralı olmadığını onaylayamaz: koşullar değişebilir, KYC bireyseldir ve destek kararları bazen takdire bağlıdır. Yine de uygun olmayan bir program satın alma olasılığını azaltabilirsiniz.',
        ],
        steps: [
          {
            title: 'Tam ürünü belirleyin',
            text: '**Firmayı, hesap adını, hesap büyüklüğünü ve değerlendirme/fonlanmış aşamayı** yazın. Marka düzeyindeki özetler yeterli değildir.',
          },
          {
            title: 'Sözleşmeyi ve tarihi kaydedin',
            text: '**Koşulların, yardım merkezi makalesinin, ödeme politikasının ve kısıtlı ülkeler listesinin** tamamını okuyun; sayfaların tarihli bir kopyasını saklayın.',
          },
          {
            title: 'Gerçek işlem tarzınızı test edin',
            text: '**Haber pencerelerini, kopya işlemi, VPN/VPS\'i, pozisyon tutmayı, azami kontrat sayısını, tutarlılığı ve hareketsizliği** gerçekten kullandığınız stratejiye karşı kontrol edin.',
          },
          {
            title: 'Gerçekçi bir ilk ödeme hesaplayın',
            text: '**Kâr hedeflerini, asgari günleri, ilk çekim üst sınırlarını, aktivasyon ücretlerini, ödeme ücretlerini ve ödeme aracısının şartlarını** dahil edin.',
          },
          {
            title: 'Ödemeden önce yazılı olarak sorun',
            text: 'Belirsiz olan her şey için **tam kuralı ve sürümü** belirten bir destek yanıtı isteyin ve yanıtı saklayın.',
          },
        ],
        callout: {
          kind: 'tip',
          text: 'Karşılaştırmamızda eksik bir kural bulursanız, resmi bağlantıyı ve bir ekran görüntüsünü **kaynak gönderme** iletişim kanalımızdan PropRadar\'a gönderin. İş ortağı olan ve olmayan firmaları aynı editoryal standartla inceliyoruz.',
        },
      },
    ],
  },
  'meilleure-prop-firm-2026': {
    intro: 'Tek bir en iyi prop firması yoktur. **Piyasanız, işlem tarzınız** ve operatörün kendisinden kabul ettiğiniz risk miktarı için en iyi firma vardır. Bu sıralama o son noktadan başlar: kâr paylarını ve indirimleri karşılaştırmadan önce, bir firmanın ihtiyaç duyduğunuzda **hâlâ var olup olmayacağını ve ödeme yapıp yapmayacağını** kontrol eder.',
    sections: [
      {
        heading: 'Bu sıralama nasıl oluşturuluyor',
        paragraphs: [
          'PropRadar\'daki her firma; kural netliği, ödeme kanıtı, hukuki şeffaflık, kamuya açık yorum sinyalleri ve faaliyet geçmişinden oluşan **100 üzerinden bir puan** alır. İş ortaklığı bağlantıları her profilde açıklanır ve **hiçbir zaman bir puanı değiştirmez**. İş ortaklığı ilişkisi olan bir firma zayıf yönlerini göstermeye devam eder; ortaklığı olmayan bir firma ise zirvede yer alabilir.',
          'Bu güncellemede en yüksek puanlar uzun süredir faaliyet gösteren operatörlere ait: **FTMO (91/100), The5ers (85/100) ve Topstep (84/100)**. En ucuzları değiller. PropRadar dosyalarında en uzun kamuya açık geçmişe, en okunabilir koşullara ve en az çözülmemiş ödeme sinyaline sahip profiller onlar.',
        ],
      },
      {
        heading: 'Piyasanızla başlayın',
        paragraphs: [
          'Forex/CFD yatırımcıları ile vadeli işlem yatırımcıları aynı pazarda alışveriş yapmaz. **Mükemmel bir vadeli işlem firması bir forex yatırımcısı için işe yaramaz**; bu yüzden önce piyasaya göre filtreleyin.',
        ],
        compare: {
          columns: [
            'Forex / CFD',
            'Vadeli işlemler',
          ],
          rows: [
            {
              label: 'Platformlar',
              values: [
                'MT5, cTrader',
                'Vadeli işlem platformları',
              ],
            },
            {
              label: 'Limitler',
              values: [
                '**Hesabın yüzdesi**',
                '**Dolar tutarları**',
              ],
            },
            {
              label: 'Drawdown',
              values: [
                'İki aşamalı challenge\'larda çoğunlukla sabit',
                'Çoğunlukla **takip eden**',
              ],
            },
            {
              label: 'Örnekler',
              values: [
                'FTMO, The5ers',
                'Topstep',
              ],
            },
          ],
        },
      },
      {
        heading: 'Ardından kuralları tarzınızla eşleştirin',
        paragraphs: [
          'Hesapların çoğunu sonlandıran kurallar **kâr hedefleri değildir**. Drawdown türü, günlük kayıp limiti, tutarlılık kuralları, haber kısıtlamaları ve pozisyon taşıma kurallarıdır. Bir scalper\'ın hızlı emir gerçekleşmesine ve asgari işlem süresi olmamasına ihtiyacı vardır. Bir swing yatırımcısının gece ve hafta sonu pozisyon taşımaya ihtiyacı vardır. Bir haber yatırımcısının yalnızca değerlendirmede değil, **fonlanmış hesapta** da haber işlemine izin veren bir firmaya ihtiyacı vardır.',
        ],
        bulletStyle: 'check',
        bullets: [
          '**Drawdown:** sabit limitleri yönetmek takip edenlerden daha kolaydır.',
          '**Tutarlılık:** değerlendirmeye mi, ödemelere mi yoksa her ikisine mi uygulandığını kontrol edin.',
          '**Haber ve pozisyon taşıma:** çoğu zaman daha katı olan fonlanmış hesap kurallarını teyit edin.',
          '**Ödemeler:** sıklık, asgari tutar, ilk ödeme üst sınırları ve işlem ücretleri.',
        ],
      },
      {
        heading: 'Son olarak gerçek maliyeti karşılaştırın',
        paragraphs: [
          'Bir prop firmasının gerçek maliyeti, **ilk ödemenizden önce harcadığınız paradır**: challenge ücretleri, sıfırlamalar, aktivasyon ücretleri ve yedek hesaplar, varsa iadeler düşülerek. Sert bir drawdown\'a sahip ucuz bir challenge, geçme olasılığınızın yüksek olduğu pahalı bir challenge\'dan daha pahalıya gelebilir.',
        ],
      },
      {
        heading: 'Bir firmanın bu sıralamada düşmesine ne yol açar',
        paragraphs: [
          'Puanlar kanıtlar değiştikçe değişir. Her değişiklik **firmanın güncelleme geçmişinde tarihlenir**; böylece nedenini ve zamanını görebilirsiniz. Bir puanı aşağı çekenler:',
        ],
        bulletStyle: 'flag',
        bullets: [
          'Bir **düzenleyici uyarısı**',
          '**Tekrarlanan ödeme gecikmeleri**',
          '**Mevcut hesaplara uygulanan bir kural değişikliği**',
          '**Firmaya hizmet vermeyi bırakan** bir alan adı',
          '**Tüzel kişilik** hakkında daha az şeffaflık',
        ],
      },
    ],
  },
  'prop-firm-sans-consistency-rule': {
    intro: 'Tutarlılık kuralı, **toplam kârınızın ne kadarının tek bir günden gelebileceğini** sınırlar. Bu kural vardır çünkü tek bir şanslı gün, tek bir aşırı büyük pozisyon veya tek bir haber sıçraması, hesabı zaman içinde yönetebilip yönetemeyeceğiniz hakkında hiçbir şey söylemeyen bir ödeme üretebilir. Tam formülü anlamak, hiç tutarlılık kuralı olmadığını iddia eden bir firma bulmaktan daha önemlidir.',
    sections: [
      {
        heading: 'Kural nasıl hesaplanır',
        paragraphs: [
          'Çoğu firma aynı temel formülü kullanır: **en iyi günün kârı bölü toplam kâr**, yüzde olarak. Sonuç firmanın limitinin üzerindeyse, kuralın nerede uygulandığına bağlı olarak henüz değerlendirmeyi geçmeye veya ödeme talep etmeye uygun değilsinizdir.',
          '%50 limitli çözümlü örnek: pazartesi $1,200, salı $300 ve çarşamba $500 kazanıyorsunuz; toplam $2,000. En iyi gününüz **toplamın %60\'ı**: limitin üzerinde. Hiçbir şey kaybetmenize gerek yok: daha fazla toplam kâra ihtiyacınız var, burada **en az $2,400**, böylece $1,200 toplamın %50\'si veya daha azı olur.',
          'Bazı firmalar kuralı farklı uygular. **Topstep, Trading Combine\'da sizi başarısız saymak yerine kâr hedefini yükseltir**: en iyi gününüz hedefin %55\'ini aşarsa hedef, en iyi gün bölü 0,55\'e yükselir (Topstep yardım merkezi, 17 Eylül 2026 tarihli sayfa).',
        ],
        callout: {
          kind: 'tip',
          text: 'Hızlı kontrol: **gereken toplam kâr = en iyi gün ÷ limit**. Burada: $1,200 ÷ 0,50 = **$2,400**.',
        },
      },
      {
        heading: 'Kuralın uygulandığı yer: değerlendirme, ödeme veya her ikisi',
        paragraphs: [
          'Aynı yüzde çok farklı anlamlara gelebilir. Değerlendirmedeki bir tutarlılık kuralı **yalnızca geçişinizi geciktirir**. Ödemelerdeki bir tutarlılık kuralı ise fonlanmış bir hesapta para kazandıktan sonra **bir çekimi engelleyebilir**. Bazı firmalar aşamaya göre farklı limitler de kullanır: Topstep, **Combine\'da %55** ve Express Funded Account\'unun **Consistency ödeme yolunda %40** kullanır.',
          'FTMO kuralını **12 Ekim 2026**\'da değiştirdi: yeni 1-Step Challenge siparişleri, en iyi gününüzü **zararlı günler dahil** toplam kârınızla karşılaştıran bir Consistency kuralı kullanırken, eski siparişlerden gelen hesaplar yalnızca kârlı günleri sayan önceki Best Day Rule\'u korur. FTMO, şartı karşılamazsanız karşılayana kadar işlem yapmaya devam ettiğinizi söylüyor (FTMO işlem güncellemesi, 8 Ekim 2026). PropRadar, The5ers High Stakes programında yüzdeye dayalı bir en iyi gün kuralı kaydetmemiştir.',
        ],
        callout: {
          kind: 'warning',
          text: 'Her zaman **aşamayı, ürünü ve sipariş tarihinizi** teyit edin: aynı firma kuralın iki sürümünü birden uygulayabilir.',
        },
      },
      {
        heading: 'Tutarlılık kuralı olmayan bir firma daha mı iyi?',
        paragraphs: [
          'Otomatik olarak değil. Tutarlılık kuralını kaldıran firmalar riski genellikle başka bir yolla kontrol eder. "Tutarlılık kuralı yok" başlığı, **korunması daha zor** bir fonlanmış hesabı gizleyebilir. Yerine neyin geldiğine bakın:',
        ],
        bulletStyle: 'check',
        bullets: [
          '**Daha sıkı günlük kayıp limitleri**',
          '**Takip eden drawdown\'lar**',
          '**İlk ödemelerde üst sınırlar**',
          '**Asgari işlem günleri**',
          '**Pozisyon büyüklüğü limitleri**',
        ],
        callout: {
          kind: 'example',
          text: 'Kural esas olarak **dalgalı sonuçlara** zarar verir: haber yatırımcıları, tek bir büyük pozisyonu kapatan swing yatırımcıları veya bir kayıp serisinden sonra pozisyonu büyüten herkes. Günleriniz oldukça dengeliyse %40 ila %50\'lik bir limit nadiren bağlayıcı olur.',
        },
      },
      {
        heading: 'Tutarlılık kuralı altında rahat işlem yapmak',
        paragraphs: [
          'Dört alışkanlık kuralı yolunuzdan uzak tutar:',
        ],
        steps: [
          {
            title: 'Oranı takip edin',
            text: 'Her seanstan sonra güncel bir **en iyi gün ÷ toplam kâr** oranı tutun.',
          },
          {
            title: 'Bugünün tavanını bilin',
            text: 'İşlem yapmadan önce oranı limitin üzerine çıkarmadan **ne kadar kazanabileceğinizi** bilin.',
          },
          {
            title: 'Büyük bir günden sonra dağıtın',
            text: 'Onu tekrarlamaya çalışmak yerine **birkaç küçük kârlı gün** planlayın.',
          },
          {
            title: 'Sona doğru pozisyonu büyütmeyin',
            text: 'Tek bir aşırı büyük kazançlı gün, zararlı bir gün kadar kesin şekilde **geçişi geciktirebilir**.',
          },
        ],
      },
    ],
  },
  'topstep-review': {
    intro: 'Topstep, vadeli işlem prop trading\'in en eski adıdır: **2012\'de Chicago\'da** Michael Patak tarafından kurulmuş, Trading Combine\'ını mevcut prop firması dalgasından yıllar önce yürütmüştür. Bu geçmiş en büyük gücüdür. Zayıf yönleri ise **yalnızca vadeli işlem** sunması, 2025 sonundan bu yana **sık kural değişiklikleri** ve disiplin gerektiren **takip eden bir kayıp limitidir**.',
    sections: [
      {
        heading: 'Topstep güvenilir mi?',
        paragraphs: [
          'Topstep, uzun bir kamuya açık geçmişe, yayımlanmış bir yardım merkezine ve 2026 başında başlatılan bağlı bir aracı kuruma (Topstep Brokerage) sahip **yerleşik, ABD merkezli bir operatördür**. PropRadar ona **84/100** puan veriyor ve aleyhine kayıtlı bir düzenleyici uyarısı bulunmuyor. Her prop firmasında olduğu gibi değerlendirme ve Express Funded Account **simüledir**: ödemeler, bir aracı kurum hesabındaki işlem kârları değil, Topstep\'in ödediği ödüllerdir.',
          'Trustpilot\'ta profil **14,955 yorumda 3.7** TrustScore gösteriyor; Trustpilot\'un şirketin "yüksek riskli yatırımlarla ilişkili olabileceği" uyarısıyla birlikte (23 Ekim 2026\'da kontrol edildi). 2025 sonundaki şikâyetler **TopstepX platform kesintileri** ve gerçekleşmeyen stop emirleri üzerinde yoğunlaştı.',
        ],
        stats: [
          {
            value: '2012',
            label: 'kuruluş, Chicago',
          },
          {
            value: '84/100',
            label: 'PropRadar puanı',
          },
          {
            value: '3.7',
            label: 'Trustpilot, 14,955 yorum (23 Ekim 2026)',
          },
        ],
      },
      {
        heading: 'Trading Combine nasıl işler',
        paragraphs: [
          'Trading Combine, Topstep\'in değerlendirmesidir. **Süre sınırı ve asgari işlem günü sayısı yoktur.** Pozisyonlar seans sonuna kadar kapatılmalıdır: Topstep gece veya hafta sonu pozisyon taşımaya izin vermez.',
          '**Maximum Loss Limit (MLL)**, gün sonu bakiyeniz büyüdükçe yukarı doğru takip eder ve asla aşağı inmez, ancak ihlaller gerçekleşmemiş kayıplar dahil **gerçek zamanlı olarak izlenir**. Combine\'da başlangıç bakiyesine ulaştığında takip etmeyi bırakır (Topstep yardım merkezi, 18 Eylül 2026\'da güncellendi).',
          'Tutarlılık hedefi **%55**\'tir: en iyi gününüz kâr hedefinin %55\'ini aşamaz. Aşarsa başarısız sayılmazsınız; **hedef**, en iyi gün bölü 0,55\'e **yükselir** (yardım merkezi, 17 Eylül 2026). $1,000, $2,000 veya $3,000\'lık isteğe bağlı bir günlük kayıp limiti, hesabı kapatmadan seans için işlemi durdurur.',
        ],
        compare: {
          columns: [
            '50K',
            '100K',
            '150K',
          ],
          rows: [
            {
              label: 'Kâr hedefi',
              values: [
                '$3,000',
                '$6,000',
                '$9,000',
              ],
            },
            {
              label: 'Maximum Loss Limit',
              values: [
                '$2,000',
                '$3,000',
                '$4,500',
              ],
            },
          ],
          note: 'Topstep yardım merkezi, Eylül 2026.',
        },
        callout: {
          kind: 'example',
          text: '50K Combine, en iyi gün **$2,000**: bu, $3,000\'ın %55\'inin ($1,650) üzerindedir; dolayısıyla hedef $2,000 ÷ 0,55 ≈ **$3,636** olur.',
        },
      },
      {
        heading: 'Express Funded Account ve ödemeler',
        paragraphs: [
          'Geçtikten sonra, ödemelerin başladığı ve hâlâ simüle olan bir **Express Funded Account (XFA)** ile işlem yaparsınız. XFA, altında aynı MLL tamponuyla $0 bakiyeyle başlar. Şubat 2026\'dan bu yana iki ödeme yolu arasında seçim yaparsınız ve **seçim kalıcıdır**.',
          '12 Ocak 2026 veya sonrasında katılan yatırımcılar onaylanan ödemelerin **%90**\'ını alır; daha önce katılanlar ilk $10,000\'ın %100\'ünü, ardından %90\'ını korur. Asgari ödeme talebi **$125**\'tır. En başarılı yatırımcılar zorunlu günlük kayıp limitleri ve aşamalı olarak serbest bırakılan bir rezervle gerçek sermayeli bir **Live Funded Account**\'a davet edilebilir.',
        ],
        compare: {
          columns: [
            'Standart yol',
            'Consistency yolu',
          ],
          rows: [
            {
              label: 'Her ödemeden önce',
              values: [
                'En az $150\'lık **5 kazançlı gün**',
                '**3 işlem günü**, en büyük gün net kârın **%40\'ı veya altında**',
              ],
            },
          ],
          note: 'İki yol arasındaki seçim kalıcıdır.',
        },
        callout: {
          kind: 'warning',
          text: 'İlk ödemeden sonra MLL **$0** olarak ayarlanır. Bu tamponu ortadan kaldırır: **çekimden sonraki tek bir kötü gün hesabı sonlandırabilir.**',
        },
      },
      {
        heading: 'Artılar ve eksiler',
        paragraphs: [
          'Güncel kurallar okunduktan sonra öne çıkanlar:',
        ],
        prosCons: {
          pros: [
            'Vadeli işlem prop trading\'de **en uzun geçmiş** ve geniş, belgelenmiş bir yardım merkezi.',
            '**Süre sınırı** veya asgari gün yok; tutarlılık kuralı sizi başarısız saymak yerine hedefi yükseltir.',
            'Yeni yatırımcılar için ilk dolardan itibaren **%90 kâr payı** ve düşük **$125** asgari ödeme.',
          ],
          cons: [
            '**Yalnızca vadeli işlem** ve her pozisyon seans kapanışında kapalı olmalı.',
            'MLL **ilk ödemeden sonra $0\'a** sıfırlanır.',
            'Kurallar Kasım 2025 ile Nisan 2026 arasında **birkaç kez değişti**: her satın almadan önce yeniden okuyun.',
          ],
        },
      },
      {
        heading: 'Topstep kimlere uygun',
        paragraphs: [
          'Aylık abonelik fiyatlandırması, **yavaş bir değerlendirmeyi** tek seferlik ücret alan rakiplere göre daha pahalı hâle getirir. Apex ile karşılaştırıyorsanız, her hesap sürümünü kural kural eşleştiren Topstep ve Apex rehberimizi okuyun.',
        ],
        fit: {
          yes: [
            '**Gün içi vadeli işlem** yatırımcıları',
            '**Yerleşik bir operatör** isteyen yatırımcılar',
            '**Canlı izlenen takip eden bir limitle** rahat olanlar',
          ],
          no: [
            '**Forex veya CFD** yatırımcıları',
            'Gece pozisyon taşıyan **swing yatırımcıları**',
            '**Esas olarak fiyata göre** seçenler',
          ],
        },
      },
    ],
  },
  'prop-firm-drawdown': {
    intro: 'Drawdown, **prop firması hesaplarının çoğunu sonlandıran kuraldır**. Hesabınızın bir referans noktasından itibaren kaybetmesine izin verilen azami tutardır. İki firma da $50,000\'lık bir hesapta "$3,000 drawdown" ilan edebilir ve size **tamamen farklı bir işlem alanı** verebilir; çünkü referans noktası farklı şekilde hareket eder.',
    sections: [
      {
        heading: 'Günlük kayıp limiti ve azami drawdown',
        paragraphs: [
          'Çoğu firma **aynı anda iki limit** kullanır. **Günlük kayıp limiti**, bir işlem gününde ne kadar kaybedebileceğinizi sınırlar ve genellikle günün başlangıç bakiyesinden veya özsermayesinden ölçülür. **Azami drawdown** ise hesabın ömrü boyunca toplam kaybınızı sınırlar. Birini ihlal etmek genellikle hesabı ihlal eder; ancak bazı vadeli işlem firmaları günlük limite ulaştığınızda yalnızca seansın geri kalanında işlemi durdurur.',
        ],
      },
      {
        heading: 'Sabit drawdown',
        paragraphs: [
          'Sabit drawdown **başlangıç bakiyenizin altında sabitlenir ve asla hareket etmez**. %10 sabit limitli $100,000\'lık bir hesapta taban sonsuza kadar $90,000\'dır. Hesabı $108,000\'e büyütürseniz **$18,000\'lık alanınız** olur. Bu en affedici modeldir ve forex/CFD iki aşamalı challenge\'larında yaygındır.',
        ],
      },
      {
        heading: 'Takip eden drawdown (gün içi)',
        paragraphs: [
          'Gün içi takip eden drawdown, **gerçekleşmemiş kâr dahil en yüksek özsermayenizi gerçek zamanlı izler**. $2,500 takip eden limitli $50,000\'lık bir hesapta örnek: taban $47,500\'den başlar. Bir işlem +$1,500 gerçekleşmemiş kâra ulaşır ve taban $49,000\'e çıkar, **işlemi daha sonra başabaş kapatsanız bile**. Tek kuruş kâr realize etmeden artık $2,500 yerine $1,000\'lık alanınız vardır. Bu en katı modeldir ve vadeli işlem ile anında fonlama hesaplarında yaygındır.',
        ],
      },
      {
        heading: 'Gün sonu (EOD) takip eden drawdown',
        paragraphs: [
          'Gün sonu takip eden drawdown, kapanış bakiyenize göre **yalnızca işlem günü kapandığında hareket eder**. Açık kârdaki gün içi dalgalanmalar tabanı yükseltmez; bu da onu gün içi takip edene göre çok daha kolay yönetilebilir kılar.',
        ],
        callout: {
          kind: 'warning',
          text: 'Taban yalnızca kapanışta hareket eder, ancak **ihlal çoğu zaman gerçek zamanlı kontrol edilir**. Örneğin Topstep, Maximum Loss Limit\'ini gün sonu bakiyesinden takip ederken gerçekleşmemiş kayıplar dahil canlı olarak izler.',
        },
      },
      {
        heading: 'Takip ne zaman durur: kilit',
        paragraphs: [
          'Takip eden modellerin çoğu bir noktada **takip etmeyi bırakır**; genellikle taban başlangıç bakiyesine (veya başlangıç bakiyesi artı küçük bir tampona) ulaştığında. O andan itibaren limit sabit bir limit gibi davranır.',
        ],
        callout: {
          kind: 'tip',
          text: 'Takip eden bir hesabın ilk günleri en tehlikeli olanlardır: daha büyük pozisyonlar almadan önce **kilit seviyesine kadar tampon oluşturun**.',
        },
      },
      {
        heading: 'Bakiyeye dayalı ve özsermayeye dayalı limitler',
        paragraphs: [
          '**Bakiyeye dayalı** bir limit yalnızca kapanmış işlemleri sayar. **Özsermayeye dayalı** bir limit açık pozisyonları da sayar; bu yüzden işlemi daha sonra kârla kapatacak olsanız bile yüzen bir zarar hesabı ihlal edebilir. Modern firmaların çoğu ihlalleri özsermaye üzerinden ölçer. Özet tabloyu değil, **koşullardaki tanımı okuyun**.',
        ],
      },
      {
        heading: 'Nasıl seçilir',
        paragraphs: [
          'Drawdown modelini **işlemlerinizin nasıl davrandığıyla** eşleştirin:',
        ],
        compare: {
          columns: [
            'Tercih edin',
          ],
          rows: [
            {
              label: 'Kârda uzağa gidip sonra geri dönen işlemler',
              values: [
                '**Sabit** veya **gün sonu**; gün içi takip edenden kaçının',
              ],
            },
            {
              label: 'Dar stoplu, küçük ve sık scalp işlemleri',
              values: [
                'Kilit seviyesi hızlı geliyorsa **takip eden** işe yarayabilir',
              ],
            },
            {
              label: 'Geniş stoplu swing işlemleri',
              values: [
                'Alışılmış açık zararınızdan daha geniş alanla **sabit**',
              ],
            },
          ],
        },
        callout: {
          kind: 'tip',
          text: 'Pozisyonları her zaman ilan edilen hesap büyüklüğüne göre değil, **tabana kalan alana göre** boyutlandırın.',
        },
      },
    ],
  },
  'goat-funded-trader-avis': {
    intro: 'GOAT Funded Trader son iki yılın en görünür prop firmalarından biridir: agresif indirimler, geniş bir model yelpazesi ve sosyal medyada sürekli varlık. **Görünürlük güvenilirlikle aynı şey değildir.** Bu inceleme belgelenmiş olanı pazarlamadan ayırır ve **fonlanmış hesap kurallarını** öne koyar; çünkü yatırımcılar ödemeleri orada kaybeder.',
    sections: [
      {
        heading: 'GOAT Funded Trader\'ı kim yönetiyor',
        paragraphs: [
          'GOAT Funded Trader **Mayıs 2023**\'te başladı. Hong Kong şirketi **Wishes Tower International Limited**\'in ticari adıdır ve simüle işlem **Saint Lucia\'daki Goat Funded LTD** tarafından sağlanır. Hizmeti **hiçbir finansal düzenleyici** denetlemiyor. Koşulları simüle hesapları, iade edilmeyen satın alımları ve ödemeler üzerinde geniş takdir yetkisini tanımlar; bu sektörde yaygındır ama satın almadan önce bilinmeye değer.',
          'PropRadar ona **58/100** puan veriyor; bu, Trustpilot puanını gösterilmez tuttuğu sürece izin verilen 64 puanlık azaminin altında ve firma izleme listesinde. Operatör aktif ve yatırımcılara ödeme yaptığını bildiriyor, ancak mevcut ödeme üst sınırları, kesintiler ve risk ekibi kararları anlamlı kısıtlamalar yaratıyor. PropRadar\'ın GOAT Funded Trader ile bir iş ortaklığı ilişkisi var; bu, puanı veya incelemeyi değiştirmez.',
        ],
      },
      {
        heading: 'Trustpilot durumu',
        paragraphs: [
          '23 Ekim 2026\'da Trustpilot şirket için **hiçbir TrustScore** göstermiyordu. Profili "bu şirketin puanının yönergelerimizin ihlali nedeniyle kullanılamadığını" ve Trustpilot\'un "bir dizi sahte yorumu kaldırdığını" belirtiyor. Profil hâlâ keskin biçimde bölünmüş 4,352 yorum listeliyor:',
          'Kutuplaşmış bir profil genellikle **çok farklı iki deneyim** anlamına gelir: hızlı ödeme alan yatırımcılar ve dikkatle okumadıkları kurallar nedeniyle ödemeleri reddedilen yatırımcılar.',
        ],
        stats: [
          {
            value: '4,352',
            label: 'listelenen yorum',
          },
          {
            value: '46%',
            label: 'beş yıldız',
          },
          {
            value: '40%',
            label: 'bir yıldız',
          },
        ],
        callout: {
          kind: 'warning',
          text: 'Trustpilot uyarısı sürdükçe ana sayfadaki neredeyse kusursuz puan iddialarına **temkinle** yaklaşın.',
        },
      },
      {
        heading: 'En önemli fonlanmış hesap kuralları',
        paragraphs: [
          'Challenge modelleri alışılmıştır. **3-Step modeli Ağustos 2026\'da kaldırıldı.** Aşağıdaki rakamlar 5 Ekim 2026\'da kontrol edilen üçüncü taraf bir incelemeden geliyor: ödeme sayfasında teyit edin.',
          'Ödemeleri belirleyen kurallar **geçtikten sonra** başlar:',
        ],
        bulletStyle: 'flag',
        bullets: [
          '**Goat Guard:** fonlanmış 1-Step ve 2-Step hesaplarda ilk bakiyenin %2\'si kadar yüzen zarar kâr payınızı %50\'ye düşürür; ikinci tetikleme hesabı ihlal eder.',
          '**2 dakika kuralı:** iki dakikadan kısa tutulan işlemlerin kârı ödemede silinirken bu işlemlerin zararları hesapta kalır.',
          '**Haber penceresi:** yüksek etkili haberler etrafında elde edilen kâr başlangıç bakiyesinin %1\'iyle sınırlıdır.',
          '**Günlük kâr üst sınırı:** fonlanmış bir hesap günde en fazla $3,000 kâr kaydedebilir.',
          '**Instant modeller:** takip eden drawdown\'lar; hesap, modele göre %1 veya %2\'lik yüzen zararda kapanır.',
        ],
        compare: {
          columns: [
            'Kâr hedefleri',
            'Günlük kayıp',
            'Azami kayıp',
          ],
          rows: [
            {
              label: '2-Step GOAT',
              values: [
                '%8, ardından %6',
                '%4',
                '%10 sabit',
              ],
            },
            {
              label: '2-Step Standard',
              values: [
                '%10, ardından %5',
                '%5',
                '%10',
              ],
            },
            {
              label: '1-Step',
              values: [
                '%10',
                '%3',
                '%6 sabit',
              ],
            },
          ],
        },
      },
      {
        heading: 'Ödemeler',
        paragraphs: [
          'Varsayılan kâr payı **%80**\'dir; ödeme sayfasında %100\'e ücretli yükseltme ve bunu %90-95\'e çıkarabilen bir ölçeklendirme planı vardır. Çoğu model **her 14 günde** bir ödeme yapar; **$100 asgari** tutar ve **%3 işlem ücreti** vardır. İlk iki ödeme, başlangıç bakiyesinin %6\'sı veya $10,000\'dan düşük olanıyla sınırlıdır. Ödeme yöntemleri arasında Rise, banka havalesi, Skrill ve kripto bulunur; her birinin kendi limiti vardır.',
          'Ödeme hızı (24 saat ve 2 iş günü) ve azami hesap büyüklüğü gibi bazı kamuya açık iddialar yardım merkeziyle çelişiyor.',
        ],
        stats: [
          {
            value: '80%',
            label: 'varsayılan kâr payı',
          },
          {
            value: '14 gün',
            label: 'çoğu modelde ödeme döngüsü',
          },
          {
            value: '$100',
            label: 'asgari ödeme',
          },
          {
            value: '3%',
            label: 'işlem ücreti',
          },
        ],
        callout: {
          kind: 'warning',
          text: 'Pazarlama ve koşullar çeliştiğinde **ödemenize uygulanacak olan koşullardır**.',
        },
      },
      {
        heading: 'GOAT Funded Trader kimlere uygun',
        paragraphs: [
          'Fonlanmış hesap kuralları belirli davranışları hedefler. Kural netliği sizin için fiyattan daha önemliyse önce sıralamamızdaki **daha yüksek puanlı firmalarla** karşılaştırın.',
        ],
        fit: {
          yes: [
            '**Küçük ve kontrollü** yüzen zararlar',
            '**İki dakikanın çok üzerinde** tutulan işlemler',
            '**Haber sıçramalarına** dayanmayan işlem',
            '**Ucuz bir giriş** isteyenler',
          ],
          no: [
            '**Scalper\'lar**',
            '**Haber yatırımcıları**',
            '**Büyük gün içi drawdown** gerektiren işlemler',
          ],
        },
      },
    ],
  },
  'prop-firm-sans-challenge': {
    intro: 'Challenge\'sız bir prop firmasıyla başlamak için piyasayı ve tam programı seçin, uygunluğu kontrol edin, fonlanmış hesap kurallarını okuyun, toplam ücret yükünü hesaplayın ve stratejinizi kayıp limitlerine karşı test edin. **Değerlendirmeyi atlamak ödeme koşullarını ortadan kaldırmaz.** Erişim simüle olabilir ve ilk çekim yine de geçerli işlem günleri, bir kâr hedefi veya tutarlılık gerektirebilir.',
    sections: [
      {
        heading: 'Challenge\'sız bir prop firmasıyla nasıl başlanır',
        paragraphs: [
          'Piyasanızı ve tam anında fonlama programını seçerek başlayın. Challenge\'sız bir hesap, fonlanmış aşamadan önceki değerlendirmeyi atlar. Yine de simüle olabilir ve bir ödeme; bir kâr hedefi, geçerli işlem günleri, tutarlılık ve bir inceleme gerektirebilir. Hesabı satın almak ile bir çekime hak kazanmak ayrı adımlardır.',
          'Satın almadan önce bu kontrol listesini kullanın. İlan edilen daha büyük bir hesap bakiyesi size kaybedebileceğiniz aynı miktarda parayı vermez: kullanılabilir alanı günlük ve toplam kayıp limitleri belirler.',
        ],
        steps: [
          {
            title: 'Piyasayı seçin ve uygunluğu kontrol edin',
            text: 'İzin verilen enstrümanları, platformları ve işlem saatlerini stratejinizle eşleştirin. Ülke kısıtlamalarını, kimlik doğrulamayı ve adı geçen sözleşme şirketini kontrol edin.',
          },
          {
            title: 'Tam fonlanmış hesap kurallarını okuyun',
            text: 'Program adını, hesap büyüklüğünü, satın alma tarihini ve resmi kural sayfalarını kaydedin. Günlük sıfırlama saatini, azami kayıp tabanını, drawdown hesaplamasını ve yasaklı stratejileri teyit edin.',
          },
          {
            title: 'İlk ödemeye giden yolu yazın',
            text: 'Geçerli işlem günlerini, kâr hedeflerini, tutarlılığı, asgari talebi, ödeme üst sınırlarını ve kâr payını kaydedin. Değerlendirmesiz bir hesap, bir çekimden önce yine de önemli kârlar gerektirebilir.',
          },
          {
            title: 'Toplam ücret yükünü hesaplayın',
            text: 'Geçerliyse giriş, aktivasyon, tekrarlayan, platform ve veri ücretlerini dahil edin. İade ve yedek hesap koşullarını okuyun ve kaybetmeye hazır olduğunuz azami toplam ücrete karar verin.',
          },
          {
            title: 'Normal işleminizi bu limitlere karşı test edin',
            text: 'Yüzen zararları, komisyonları, bir kayıp serisini ve gece pozisyonlarını kontrol etmek için bir deneme hesabı veya işlem günlüğünüzü kullanın. Test, nominal hesap bakiyesini değil, programın gerçek limitlerini kullanmalıdır.',
          },
          {
            title: 'Kurulumu tamamlayın ve her iki kayıp tabanını izleyin',
            text: 'Ödeme ve gerekli doğrulamalardan sonra panelin sözleşmeyle eşleştiğini teyit edin. Her seanstan önce güncel günlük tabanınızın, toplam tabanınızın ve ödeme uygunluğunuzun kaydını tutun.',
          },
        ],
      },
      {
        heading: 'Anında fonlama neden genellikle daha pahalıdır',
        paragraphs: [
          'Firmalar değerlendirmeyi bir filtre olarak fiyatlandırır: challenge alıcılarının büyük bir kısmı hiçbir zaman ödemeye ulaşmaz ve onların ücretleri ulaşan yatırımcıları finanse eder. Filtreyi atladığınızda firma bu riski hesabın kendisine fiyatlar. Bu yüzden doğrudan bir hesap genellikle aynı büyüklükteki bir challenge\'ın **birkaç katı fiyattadır**, **daha küçük büyüklüklerdedir** ve çoğu zaman **daha sıkı bir drawdown**\'a sahiptir.',
          '**İlk ödemeye ulaşmanın toplam maliyetini** karşılaştırın. Yuvarlak rakamlarla bir örnek: geçme olasılığı üçte bir olan $100\'lık bir challenge, fonlanmak için ortalama **yaklaşık $300**\'a mal olur. Sıkı takip eden drawdown\'lı $350\'lık anında bir hesap, ilk ödemeden önce bir hesap kaybettiğiniz anda bundan daha pahalıya gelir.',
        ],
      },
      {
        heading: 'Doğrudan bir hesabın değip değmeyeceğini belirleyen kurallar',
        paragraphs: [
          'Pazarlama sayfasını değil, fonlanmış hesap koşullarını okuyun. Ekonomiyi en sık bu altı nokta değiştirir:',
        ],
        bulletStyle: 'check',
        bullets: [
          '**Drawdown türü:** özsermaye zirvenizi takip eden bir drawdown ile yaşamak, başlangıç bakiyesinde sabitlenmiş bir limitten çok daha zordur.',
          '**Tutarlılık kuralı:** birçok anında program, bir ödemeye izin verilmeden önce kârınızın ne kadarının en iyi gününüzden gelebileceğini sınırlar.',
          '**İlk ödeme koşulları:** asgari işlem günleri, asgari kâr ve ilk bir veya iki çekimdeki üst sınırlar.',
          '**Başlangıç kâr payı:** bazı programlar challenge modellerinden daha düşük başlar ve ancak sonra yükselir.',
          '**Yenileme maliyeti:** bir ihlalden sonra yeni bir hesabın maliyeti ve herhangi bir indirimin geçerli olup olmadığı.',
          '**Kısıtlı stratejiler:** haber pencereleri, pozisyon tutma süreleri, kopya işlem ve asgari işlem süreleri.',
        ],
      },
      {
        heading: 'Challenge\'sız bir prop firmasını kimler düşünmeli',
        paragraphs: [
          'Doğrudan fonlama **parayı zamanla takas eder**. Bir kâr hedefinin baskısı, daha pahalıya mal olan bir hesapta canlı bir drawdown\'ın baskısıyla yer değiştirir.',
        ],
        fit: {
          yes: [
            '**İstikrarlı, düşük drawdown\'lı** bir strateji',
            '**Günlük limitlere uyma** geçmişi',
            '**Zamanı maliyetten** daha değerli buluyorsunuz',
          ],
          no: [
            '**Hâlâ test ettiğiniz** bir strateji',
            'Alan gerektiren **dalgalı bir tarz**',
            'Esas olarak **kâr hedefinden kaçmak** için satın almak',
          ],
        },
        callout: {
          kind: 'tip',
          text: 'Emin değil misiniz? Doğrudan bir hesap almadan önce stratejinizin bir firmanın kurallarına uyup uymadığını görmek için **ucuz, tek aşamalı bir challenge** çoğu zaman daha iyi bir testtir.',
        },
      },
      {
        heading: 'Anında fonlamaya özgü kırmızı bayraklar',
        paragraphs: [
          'Anında programlar, satması kolay olduğu için yeni ve pazarlamaya ağırlık veren firmaları çeker. Bunları uyarı işaretleri olarak görün:',
        ],
        bulletStyle: 'flag',
        bullets: [
          '**Çok düşük fiyatlarla çok büyük hesaplar.**',
          '**Yayımlanmış bir ödeme politikası olmadan** ödeme vaatleri.',
          '**Ana sayfa ile koşullar arasında farklılık gösteren** kurallar.',
          'Firmanın belirtilmiş bir gerekçe olmadan **tamamen kendi takdirine bağlı olarak** ödemeleri reddetmesine izin veren koşullar.',
        ],
        callout: {
          kind: 'tip',
          text: 'Satın almadan önce firmanın PropRadar profilini açın: **tüzel kişilik, ödeme sinyalleri, alan adı ve düzenleyici uyarıları** tek bir sayfadadır.',
        },
      },
      {
        heading: 'Güncel iki örnek: anında erişim, anında çekim değildir',
        paragraphs: [
          '15 Kasım 2026\'da kontrol edilen resmi sayfalar tam planın neden önemli olduğunu gösteriyor. **Hyro Instant** değerlendirmeyi atlar, ancak ilk ödeme için üç geçerli işlem günü, paylaşımdan sonra en az $25 kâr ve ödeme başına sayılan kârda bir üst sınır gerektirir.',
          '**Tradeify Lightning Funded** da değerlendirmeyi atlar. Yayımlanan $50,000\'lık planı, ilk talebin kilidini açmak için $3,000 kâr gerektirir; talep ise yatırımcının %90 kâr payından önce $2,000 ile sınırlıdır. Tutarlılık da geçerlidir. Kâr hedefi, çekilebilecek tutar değildir.',
          'Bu örnekler bağımsız olarak doğrulanmış müşteri ödemelerini değil, yayımlanmış kuralları anlatır. Yeni bir satın alıma uygulanan koşulları doğrulamak için güncel sözleşmeyi ve aşağıdaki kaynak bağlantılarını kullanın.',
        ],
      },
    ],
  },
};

export default tr;
