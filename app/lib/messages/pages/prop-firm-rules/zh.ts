import type { RulesMessages } from './en';

const rules: RulesMessages = {
  metaTitle: '自营交易公司规则：回撤、出金与交易风险',
  metaDescription: '比较自营交易公司的敏感规则：回撤、新闻交易、出金、一致性、EA、跟单交易和禁止策略。',
  schemaName: '自营交易公司规则审查',
  breadcrumb: '交易规则',
  eyebrow: '规则深度审查',
  h1: '可能让你失去账户或出金的条款。',
  lead: 'PropRadar 阅读规则页面、帮助中心和主力产品的条件，找出危险条款：回撤、隔夜结算、新闻、EA、跟单交易、一致性、出金上限和处罚。',
  reviewed: '本页审阅于 {date}。每项审查都保留各自可见的来源核实日期。',
  statDeep: '深度审查',
  statClauses: '提取的条款（{critical} 条为严重）',
  statCompact: '中小型公司（{critical} 家为严重）',
  statTracked: '跟踪的公司',
  coverageAria: '规则审查覆盖范围',
  statRuleFiles: '规则档案',
  statPayoutSensitive: '与出金相关的档案',
  statLegalWatch: '法律关注',
  statDeepSources: '5 个以上来源',
  related: '相关指南：',
  relatedConsistency: '一致性规则',
  relatedNews: '新闻交易',
  statsAria: '规则统计',
  families: [
    { label: '账户被关闭', title: '回撤与净值', text: '真正的危险通常来自未平仓净值、隔夜结算、隔夜利息和服务器重置。' },
    { label: '利润被扣除', title: '新闻与隔夜结算', text: '有些平台在技术上允许交易，但会扣除收益或将其认定为违规。' },
    { label: '账户被封禁', title: 'EA、高频交易、跟单交易', text: '用于风险管理而被允许的 EA，如果自主交易、复制账户或使服务器过载，仍可能被禁止。' },
    { label: '出金被延迟', title: '出金与一致性', text: '最佳交易日规则、出金上限、盈利天数和出金周期，可能比宣传的利润分成更重要。' },
  ],
  alertsEyebrow: '交易者提醒',
  alertsTitle: '营销页面没有说清楚的内容。',
  viewAudit: '查看来源审查',
  proofAria: '{name} 规则审查依据',
  payoutChip: '出金 {level}',
  legalChip: '法律 {level}',
  sourceDeep: '来源充分',
  sourceUsable: '来源可用',
  sourceThin: '来源薄弱',
  sourceNone: '无来源',
  severity: { Faible: '低', Moyen: '中', 'Élevé': '高', Critique: '严重' },
  proof: {
    'Source officielle lue': '已读官方来源',
    'Source officielle partielle': '官方来源（部分）',
    'Source commerciale repérée': '已发现营销页面',
  },
  sourceChecked: '来源核实于 {date}',
  compactEyebrow: '中小型公司',
  compactTitle: '长尾公司正在逐家阅读。',
  compactNote: '这些简短提醒来自官方来源或已发现的产品页面。不完整的档案会被刻意标注为不完整。',
  fullEyebrow: '完整覆盖',
  fullTitle: '其他所有自营交易公司仍在审查队列中。',
  fullNote: 'PropRadar 让较小的公司保持可见，以避免盲点：已发现来源、风险档案，或仍需补充来源的档案。',
  showQueue: '显示仍在审查队列中的 {count} 家公司',
  productToIdentify: '产品待确认',
  mainProductToIdentify: '主力产品待确认',
  coverageArchive: '风险档案',
  coverageMulti: '多来源档案',
  coverageSpotted: '已发现来源',
  coverageToSource: '待补充来源',
  nextEyebrow: '下一项深度分析',
  nextTitle: '接下来要拆解的主力产品。',
  colDrawdown: '回撤',
  colNews: '新闻',
  colEa: 'EA',
  colPayout: '出金',
  colScore: '评分',
  scoreAria: 'PropRadar 评分 {score}/100',
  matrixEyebrow: '快速矩阵',
  matrixTitle: '按出金风险排序的在营公司。',
  showMatrix: '按出金风险显示 {count} 家在营公司',
  scoreLine: '评分 {score}/100',
  audits: {
    ftmo: {
      headline: '主要风险来自净值计算和禁止行为。',
      verdict: 'FTMO 的规则清晰但严格：按净值计算的每日亏损、1-Step 的日终跟踪回撤、最佳交易日规则，以及对跳空交易、高频交易、关联账户和规避行为的广泛限制。',
      clauses: [
        {
          title: '每日亏损包含未平仓净值',
          finding: '每日亏损包括余额、未平仓头寸、隔夜利息和佣金。浮动头寸在平仓前就可能触犯规则。',
          impact: '不要只看余额。一根影线、点差扩大或一次隔夜利息就可能让账户违规。',
        },
        {
          title: '1-Step 和 FTMO Account 的最佳交易日 / 一致性规则',
          finding:
            '对于 2026 年 10 月 12 日之前下单的账户，最佳交易日不得超过正收益的 50%。新的 1-Step 订单使用一致性规则，将最佳交易日与总利润（含亏损日）比较。两者都不算违规，但在比例修正之前都可能阻止晋级或奖励。',
          impact: '一笔大额盈利交易可能迫使你继续交易才能解锁账户，也就是承担更多风险。',
        },
        {
          title: '范围宽泛的禁止行为条款',
          finding: '跳空交易、延迟套利、超高速交易、协同账户、账户轮换、单边押注和过度活跃的 EA，可能导致取消资格、交易被删除、奖励被取消或账户被终止。',
          impact: '“破解”考核的策略和复制粘贴的多账户操作才是真正的危险，即使公开评分很高。',
        },
      ],
    },
    the5ers: {
      headline: '每日回撤比看起来更具迷惑性。',
      verdict: 'The5ers High Stakes 纸面上看很干净，但每日回撤取前一日余额与净值中较高者。持仓过夜可能大幅减少可用空间。',
      clauses: [
        {
          title: '每日回撤取余额与净值中较高者',
          finding: '5% 的每日回撤在服务器午夜根据前一日收盘净值或余额中较高者设定。',
          impact: '以较高净值结束一天会抬高第二天的阈值。持有的头寸可能比预期更早导致账户关闭。',
        },
        {
          title: '30 天不活跃规则',
          finding: '自注册起连续超过 30 天没有交易活动，账户即失效。',
          impact: '买来留着以后用的考核，如果一直不用，可能全部损失。',
        },
        {
          title: '每两周出金一次',
          finding: '达到资助状态后，每两周可在控制面板中申请出金。',
          impact: '资金不是即时到账，因此不要只比较分成比例和考核价格。',
        },
      ],
    },
    fundednext: {
      headline: '众多反滥用规则可能在账户关闭前就扣除利润。',
      verdict: 'FundedNext 文档完善，但反滥用限制范围很广：风险上限、保证金上限、Quick Strike、过度活跃、结算交易、跟单交易和跨账户对冲。',
      clauses: [
        {
          title: '最大风险 3%，保证金上限 70%',
          finding: 'FundedNext 将风险始终限制在 3%，累计保证金限制在 70%。首次违规可能收到警告，并扣除与该交易相关的利润。',
          impact: '即使账户没有立即关闭，仓位超出框架时利润也可能被扣除。',
        },
        {
          title: 'Quick Strike 与 30 秒内的交易',
          finding: '30 秒内平仓的交易会受到监控。Quick Strike 利润达到 30% 或以上时，资助账户可能被终止，相关利润被扣除。',
          impact: '超短线剥头皮可能让出色的业绩变成被拒绝的出金。',
        },
        {
          title: '跨账户累计的过度活跃',
          finding: '每天 200 笔交易或 2,000 条服务器消息会触发警告；15,000 条消息可能导致账户被停用。警告可能在多个账户间累计。',
          impact: '即使没有恶意，EA 或过于频繁的订单管理也可能让你失去账户。',
        },
      ],
    },
    topstep: {
      headline: '主要陷阱是一致性、出金上限和五个盈利日。',
      verdict: 'Topstep 成熟且规则清晰，但晋级和出金不只取决于毛利润。',
      clauses: [
        {
          title: '50% 一致性目标',
          finding: '最佳交易日必须低于盈利目标的 50%。超过后盈利目标会提高，亏损也不会重置最佳交易日。',
          impact: '即使已达到目标金额，一个大额盈利日也可能推迟获得资助状态。',
        },
        {
          title: 'XFA 出金上限',
          finding: 'Express Funded Account 的出金按每次申请和账户规模设有上限。上限可能取决于标准路径或一致性路径以及 DLL 选项。',
          impact: '大额利润并不保证能立即提取同等金额。',
        },
        {
          title: '单一档案政策',
          finding: '所有账户必须归属于同一个 Topstep 档案。多个档案可能导致关闭或暂停。',
          impact: '重复账户或注册错误可能成为真正的运营风险。',
        },
      ],
    },
    'apex-trader-funding': {
      headline: 'Apex 大幅调整了产品：旧账户和新账户要分开看。',
      verdict: 'Apex 的新产品强调日终回撤、不拒绝出金、50% 一致性，且新产品不再循环扣费。旧账户仍是独立的体系。',
      clauses: [
        {
          title: '新产品与旧账户',
          finding: 'Apex 表示旧账户已停止销售，不会被追溯修改，并可能在取消前继续循环扣费。',
          impact: '在比较 Apex 的评价或折扣之前，先确认来源讨论的是旧产品还是现行产品。',
        },
        {
          title: '两次奖励之间需 5 个交易日',
          finding: '官方页面强调现行路径下出金和奖励需要五个交易日。',
          impact: '即使晋级很快，出金速度仍取决于交易日周期。',
        },
        {
          title: '50% 一致性',
          finding: '新产品显示 50% 的一致性规则。',
          impact: '视所用账户而定，一个大额交易日可能限制出金或晋级。',
        },
      ],
    },
    'e8-markets': {
      headline: 'E8 的规则非常详细，但有些规则会在不关闭账户的情况下扣除利润。',
      verdict: 'E8 Markets 公布了每日回撤、利润上限、新闻、高频交易、EA 和最佳交易日规则。对交易者的主要风险是利润在隔夜结算或出金时被扣除。',
      clauses: [
        {
          title: '每日回撤触及即永久关闭',
          finding: '每日回撤是基于初始余额的固定金额。净值或余额一旦触及亏损线，账户即被永久关闭，即使技术上的平仓结果高于该线。',
          impact: '最终平仓可能看起来高于阈值，但账户已经失去，因为服务器记录的违规优先。',
        },
        {
          title: '每日利润上限 2%',
          finding: '在 E8 Pro 上，超过每日上限的利润不计入，并在隔夜结算后被扣除。通过对冲或部分平仓规避的行为可能被合并计算。',
          impact: '表现特别好的一天，其部分结果可能不被计入有效业绩。',
        },
        {
          title: 'E8 One Performance 账户的新闻交易',
          finding: '在 E8 One performance 账户上，禁止在重大新闻前后五分钟内开仓、平仓或修改止损/止盈，相关利润可能被扣除。',
          impact: '平台在技术上可能允许该操作，但利润会在之后出金时被扣除。',
        },
      ],
    },
    'funding-pips': {
      headline: '违规往往来自净值、隔夜结算和点差扩大。',
      verdict: 'FundingPips 明确说明限制由服务器实时监控。代价最高的错误涉及过紧的止损、纽约时间下午 5 点的隔夜结算以及新闻期间的持仓。',
      clauses: [
        {
          title: '实时监控净值',
          finding: '每日亏损和最大亏损都监控实时净值。即使终端或控制面板延迟，也以服务器记录为准。',
          impact: '浮动头寸可能在本地显示出违规之前就导致账户关闭。',
        },
        {
          title: '纽约时间下午 5 点的隔夜结算',
          finding: 'FundingPips 提醒，纽约时间下午 5 点点差可能大幅扩大，触发止损和违规。',
          impact: '在买价图上看似安全的止损，在隔夜结算时可能被卖价触发。',
        },
        {
          title: '申请奖励前须平仓',
          finding: '奖励周期要求先平掉所有头寸，等待 15 分钟，然后再申请分成。',
          impact: '未平仓头寸和隔夜费用可能在关键时刻缩小安全空间。',
        },
      ],
    },
    'alpha-capital-group': {
      headline: '主要危险是新闻限制、未获批准的 EA 和反赌博规则。',
      verdict: 'Alpha Capital 允许部分用途，但通过考核后的规则在新闻时段、IP、预先批准的 EA 以及被认定为赌博的行为方面都很敏感。',
      clauses: [
        {
          title: '新闻：开仓和平仓按计划受到限制',
          finding: '通过考核后，部分计划禁止在重大新闻前后两分钟或五分钟内开仓或平仓。即使是在该时段内触发的止盈或止损，也可能构成轻微违规。',
          impact: '持仓本身可能合规，但在错误时刻触发的止盈会让这笔利润失去资格。',
        },
        {
          title: 'EA 仅限用于风险管理',
          finding: '自主交易的 EA、第三方机器人、高频交易、延迟套利或产生相同交易的共享 EA，可能导致账户关闭。',
          impact: '允许使用 EA 并不等于可以无限制地自动交易。请确认用途、平台和预先批准要求。',
        },
        {
          title: 'IP 与同住家庭限制',
          finding: '同一住户、多个 IP、未申报的 VPN/VPS 使用或不一致的位置变更，可能触发违规或安全审查。',
          impact: '旅行、合租、家中另有交易者，或申报不当的 VPS，都可能成为合规问题。',
        },
      ],
    },
  },
  compact: {
    'funding-traders': {
      riskFamily: '出金 + 一致性',
      signal: '表格显示 Instant Funded、1-Step 和 2-Step 的每日亏损、最大亏损、单笔风险、一致性和出金安排各不相同。',
      impact: '购买前不要只比较价格：确认具体产品、14 天或 21 天的出金周期，以及可能阻止出金的一致性分数。',
    },
    'maven-trading': {
      riskFamily: '回撤 + 退款',
      signal: '官方页面分别列出每日亏损、最大亏损、盈利目标和出金频率，并说明部分费用在第三次出金时可退还。',
      impact: '实际成本取决于能拿到多少次出金。如果所选计划的回撤空间很小，低入场价未必划算。',
    },
    fxify: {
      riskFamily: '每日回撤',
      signal: '每日回撤可能以前一日日终余额为基准。首次出金被描述为按需申请，之后每两周出金一次。',
      impact: '跨重置时点持有的头寸可能减少第二天的空间。还要核实会改变分成、出金和杠杆的附加选项。',
    },
    'instant-funding': {
      riskFamily: '智能回撤 + 出金时间',
      signal: '在 Instant Funding 上，智能回撤在盈利后锁定。在 IF1 上，账户有效期为 24 小时，且最佳交易不能占总利润过大比例。',
      impact: '“即时”并不总是意味着立即出金：有些产品要求 14 天、利润门槛或一致性规则。',
    },
    'trade-the-pool': {
      riskFamily: '股票 + 有效利润',
      signal: '规则包括单一品种每分钟最大成交量、每个头寸的利润比例、最少持仓数量、最低出金额以及风险/KYC 审查。',
      impact: '对于股票，回撤不是唯一的危险：小盘股上仓位过大或利润过于集中，都可能被判定无效。',
    },
    'funded-trading-plus': {
      riskFamily: '高水位线',
      signal: '每日回撤在重置时可能取余额和净值中较高者。在某些计算中，出金不会降低高水位线。',
      impact: '出金看似让账户更安全，但回撤阈值仍锚定在更高的位置。',
    },
    'goat-funded-trader': {
      riskFamily: '新闻 + 奖励上限',
      signal: '在重大新闻前后五分钟内开仓或平仓的交易，利润可能被设上限。资助账户还有初始出金限额。',
      impact: '新闻交易可能被允许，但收益会被封顶。要阅读利润扣除条款，而不只是“允许新闻交易”的标签。',
    },
    'audacity-capital': {
      riskFamily: '宽松规则待确认',
      signal: '页面宣传无限交易期、最大每日亏损、最大亏损、当日出金，以及允许新闻交易、周末持仓、EA 和跟单交易。',
      impact: '当页面看起来非常宽松时，请在控制面板和条款中核实 EA、跟单交易和当日出金的确切定义。',
    },
    fintokei: {
      riskFamily: '未平仓风险 + 出金门槛',
      signal: 'SwiftTrader 列出了每日亏损、最大亏损、未平仓交易的最大允许风险以及每次出金的最低利润。',
      impact: '即使出金很快，最大未平仓风险规则也可能阻止多头寸策略或变相的马丁格尔策略。',
    },
    'hantec-trader': {
      riskFamily: '基于余额的静态回撤',
      signal: '官方表格列出了每个阶段的基于余额的静态回撤、每日亏损、最大总亏损、奖励频率和最少交易天数。',
      impact: '“静态”一词还不够：要核实违规时阈值使用的是余额、净值还是两者。',
    },
    'oneup-trader': {
      riskFamily: '跟踪回撤 + 一致性',
      signal: '页面未显示每日亏损，但适用跟踪回撤、至少 10 个交易日和一致性规则：其他三个最佳交易日的合计须至少达到最大交易日的 80%。',
      impact: '没有每日亏损限制时，主要陷阱变成跟踪回撤和把利润集中在单个交易时段。',
    },
    earn2trade: {
      riskFamily: '期货 + 通过率',
      signal: 'Earn2Trade 公布了少见的指标：通过率、实盘和实盘模拟账户的比例、每周 100 美元起的出金，以及仅限期货市场。',
      impact: '这比许多竞争对手更透明，但通过率表明该产品是一项困难的考核，而不是买来的收入。',
    },
    'take-profit-trader': {
      riskFamily: 'PRO 出金 + 账户费用',
      signal: '网站强调 PRO 账户首日即可出金、先 80/20 后 PRO+ 90/10 的分成、一次性 PRO 费用，以及沿用相同风险规则的 PRO+ 实盘转换。',
      impact: '快速出金很有吸引力，但要核实从 Test 到 PRO 再到 PRO+ 的路径、费用和实盘的确切回撤。',
    },
    brightfunded: {
      riskFamily: '出金营销',
      signal: '页面宣传首笔资助交易七天后即可出金，并在满足条件时最高可获得 100% 的利润分成。',
      impact: '请仔细阅读条款：“最高”往往取决于计划、附加选项、周期和一致性规则。',
    },
    'aqua-funded': {
      riskFamily: '即时资助',
      signal: '官方来源强调即时资助和较高的利润分成，但每个产品页面都需要逐个计划审查。',
      impact: '把“即时”承诺当作待核实的说法：出金周期、回撤、退款和新闻规则可能因账户而异。',
    },
    'blue-guardian': {
      riskFamily: '结构化流程',
      signal: '网站强调规则透明的考核、纪律、风险管理和快速出金。',
      impact: '购买前，请核实关于回撤、新闻、最低出金额和即时资助条件的具体规则页面。',
    },
    'breakout-prop': {
      riskFamily: '加密货币流动性',
      signal: 'Breakout 以加密货币为主：请重新阅读官方来源中关于点差、流动性、交易所规则、强平和市场特定时间的内容。',
      impact: '加密货币自营公司不应按外汇自营公司的标准来评判：影线、滑点和强平风险必须在付款前清楚可见。',
    },
    'the-trading-pit': {
      riskFamily: '多资产',
      signal: '官方覆盖多类资产。请按资产类别区分规则，因为期货和差价合约考核的风险并不相同。',
      impact: '不要把一个产品的规则套用到另一个产品上：回撤、平台、费用和交易时间可能差异很大。',
    },
    'finotive-funding': {
      riskFamily: '即时 + 考核',
      signal: '官方来源已确认，但产品页面仍需确认每日亏损、最大亏损、退款、出金和交易限制等详细条款。',
      impact: '在产品专属条款录入 PropRadar 档案之前，未经最终阅读不建议购买。',
    },
    myfundedfutures: {
      riskFamily: '期货出金',
      signal: '官方来源已确认，但出金、激活、回撤和一致性的详细参数需要在帮助中心或结账时确认。',
      impact: '不要只看月费就购买：资助账户费用、出金安排和跟踪回撤决定了实际成本。',
    },
    bulenox: {
      riskFamily: '期货跟踪回撤',
      signal: '官方来源已确认，但档案仍需补充确切的激活费用、跟踪回撤、最低出金额和合约规则。',
      impact: '保留在期货审查队列中：获得资助后的费用和限制比考核价格更重要。',
    },
  },
};

export default rules;
