import en, { type PayoutRiskMessages } from './en';

const am: PayoutRiskMessages = {
  ...en,
  metaTitle: 'የprop firm የክፍያ አደጋዎች፦ መዘግየትና ክፍያ መከልከል',
  metaDescription: 'ለchallenge ከመክፈልዎ በፊት የክፍያ መዘግየቶችን፣ ክፍያ መከልከሎችን፣ ህጋዊ ማረጋገጫዎችንና ምንጮችን ይመርምሩ።',
  schemaName: 'የprop firm የክፍያ አደጋ ክትትል', schemaItem: 'የክፍያ አደጋ፦ {level}።',
  breadcrumb: 'የክፍያ አደጋዎች', eyebrow: 'የክፍያ ክትትል',
  h1: 'ከመግዛትዎ በፊት ማረጋገጥ ያለብዎት የprop firm የክፍያ አደጋዎች',
  lead: 'የገንዘብ ማውጣት ችግኞች ከቅናሽ በላይ ከባድ ወጪ ሊያስከትሉ ይችላሉ። እዚህ የክፍያ አደጋ፣ የተመዘገቡ ጉዳዮች፣ ህጋዊ ሁኔታ ወይም የማውጣት ውሎች የበለጠ ምርመራ የሚፈልጉባቸው ኩባንያዎች ተለይተዋል።',
  ctaCompare: 'ሁሉንም ምልክቶች አነፃፅር', ctaClauses: 'አስፈላጊ ውሎችን ያንብቡ', ctaSources: 'ምንጮችን ይፈትሹ',
  statAbove: 'ከዝቅተኛ በላይ የክፍያ አደጋ ያላቸው ኩባንያዎች',
  statCritical: 'ከእነዚህ እጅግ ከፍተኛ', statHigh: 'ከእነዚህ ከፍተኛ',
  statShown: 'ከታች የታዩት (ከፍተኛ አደጋ)', summaryAria: 'የክፍያ አደጋ ማጠቃለያ',
  statLegal: 'ከታች በህጋዊ ክትትል ላይ ያሉ', statDeep: '5 ወይም ከዚያ በላይ ምንጮች ያላቸው',
  statPress: 'የተመዘገቡ የሚዲያ ግምገማዎች',
  methodEyebrow: 'የክፍያ ምርመራ መንገድ', methodTitle: 'የክፍያ አደጋ ማስረጃ ይፈልጋል፣ ወሬ አይደለም።',
  notes: [
    { title: 'የችግኞች ብዛት', text: 'በአሁኑ የክፍያ ክትትል ዝርዝር የተመዘገቡ ጉዳዮች ብዛት፣ ከውጤትና ከህዝብ ምልክቶች ጋር ተያይዞ።' },
    { title: 'ከህጋዊ አደጋ ጋር ግንኙነት', text: 'ከፍተኛ ጥንቃቄ የሚፈለገው የክፍያ ችግኝ ከያልተረጋገጠ ህጋዊ ተቋም፣ ከተቆጣጣሪ ማስጠንቀቂያ ወይም ከትንሽ ምንጮች ጋር ሲገናኝ ነው።' },
    { title: 'የምንጮች ጥልቀት', text: 'ብዙ ምንጮች ያላቸው ፋይሎች ከአንድ ስክሪንሾት ወይም ምንጭ ከሌለው የማህበራዊ ሚዲያ ቅሬታ የበለጠ ጠቃሚ ናቸው።' },
    { title: 'የግምገማ ማጣሪያ', text: 'የTrustpilotና የማህበረሰብ ውጤቶች ምልክቶች ብቻ ናቸው፤ የክፍያ ቅሬታ ትክክል መሆኑን አያረጋግጡም።' },
  ],
  alertsEyebrow: 'ቅድሚያ ያላቸው ማስጠንቀቂያዎች', alertsTitle: 'በጥንቃቄ ማንበብ ያለባቸው ፋይሎች',
  tableAria: 'ከዝቅተኛ በላይ የክፍያ አደጋ ያላቸው prop firm',
  badMixEyebrow: 'የአደጋ ጥምረት', badMixTitle: 'የክፍያ ጫናና የህግ ግልጽነት እጥረት',
  beforeEyebrow: 'ከመክፈልዎ በፊት', beforeTitle: 'እነዚህን ውሎች መጀመሪያ ያንብቡ',
  clauses: [
    'ከመጀመሪያው ክፍያ በፊት የreward ግምገማ፣ KYCና የተከለከሉ ግብይቶች ውሎች።',
    'የመድረክ መግቢያ ከተሰጠ በኋላ የተመላሽ ገንዘብና chargeback ውሎች።',
    'የconsistency፣ የምርጥ ቀን፣ max-lot፣ የግብይት ቅጂና የመለያ ማገናኘት ገደቦች።',
    'ህጋዊ ተቋም፣ አገር፣ የክርክር መፍቻ ቦታና መለያው ማስመሰል ወይም ከbroker ጋር የተገናኘ መሆኑ።',
  ],
};

export default am;
