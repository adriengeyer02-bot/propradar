import type { GuideArticleSection } from '../../guideArticles';

/**
 * Korean translations of the long guide articles: same section order as the English
 * ones, including callouts, comparison tables, stats and fit lists (rendered by
 * LocalizedGuide through mergeArticle, which keeps the English diagrams and sources).
 */
const ko: Record<string, { intro?: string; sections: Omit<GuideArticleSection, 'visual'>[] }> = {
  'hyrotrader-vs-tradeify': {
    intro: 'HyroTrader와 Tradeify 중 무엇을 고를지는 먼저 **암호화폐냐 선물이냐의 결정**입니다. 유용한 비교는 각 프로그램이 손실을 어떻게 측정하고, 수익을 어떻게 인정하며, 출금을 어떻게 열어 주는지입니다. 이 리뷰는 2026년 11월 15일에 확인 가능한 공식 규칙 페이지를 바탕으로 하며, 마케팅용 출금 주장을 독립적으로 검증된 송금으로 취급하지 않습니다.',
    sections: [
      {
        heading: '어떤 시장을 거래하려고 하나요?',
        paragraphs: [
          'HyroTrader는 지원되는 암호화폐 플랫폼을 통한 접속을 포함해 모의 암호화폐 계정을 제공한다고 설명합니다. 평가 경로와 Hyro Instant는 증권사 예치금도 아니고 실제 자본에 대한 약속도 아닙니다. Tradeify의 Growth, SELECT, Lightning 프로그램은 선물 거래를 중심으로 설계되어 있으며, Lightning은 모의 자금으로 시작합니다.',
          '계정은 본인 전략이 실제로 사용하는 상품과 거래 세션을 기준으로 비교해야 합니다. 암호화폐 무기한 계약 전략이 선물 계약에 그대로 옮겨지는 것은 아닙니다. 명목상 $50,000 잔고나 할인을 비교하기 전에 플랫폼, 상품 목록, 세션 규칙을 확인하세요.',
        ],
      },
      {
        heading: 'HyroTrader 일일 드로다운: 리셋 시점의 자산이 중요합니다',
        paragraphs: [
          'HyroTrader의 일일 하한선은 00:00 UTC 시점의 자산(에쿼티)에서 시작해 원래 계정 잔고의 고정 비율을 뺀 값입니다. FAQ에는 **Hyro Core와 Hyro Instant 3%, One-Step 4%, Two-Step 5%**로 나와 있습니다. 미실현 손익과 수수료도 자산에 포함됩니다.',
          '예시: $10,000 Hyro Instant 계정이 UTC 기준 하루를 자산 $10,300으로 시작합니다. 일일 허용 손실은 $300이므로 일일 하한선은 $10,000입니다. 그날 자산이 $10,800까지 올라도 일일 하한선은 그 새 고점을 따라가지 않습니다. 다음 UTC 일자에 새로운 일일 기준점이 정해집니다.',
          '전체 손실 한도는 별도로 점검됩니다. Hyro Instant는 최대 손실 5%와 함께 거래별 손실 규칙을 공개합니다. 완전히 청산된 거래 하나에서 수수료를 포함해 초기 잔고의 2%를 넘는 손실이 나면 경고가 주어지고, 그런 거래가 두 번째로 나오면 계정이 종료됩니다. 일일 허용 손실이 이 두 조건보다 우선하지는 않습니다.',
        ],
      },
      {
        heading: 'Tradeify EOD 드로다운: 마감 때 갱신되고 지금 적용됩니다',
        paragraphs: [
          'Tradeify의 규칙 페이지에 따르면 Growth, SELECT, Lightning은 **장 마감 기준 트레일링 드로다운**을 사용합니다. 새로운 최고 마감 잔고가 나오면 하한선이 올라갈 수 있습니다. 이후 손실로 마감해도 하한선은 내려가지 않습니다. 그럼에도 현재 하한선은 잔고와 미실현 손익을 합친 값에 대해 실시간으로 적용됩니다.',
          '드로다운 허용치가 $2,000인 $50,000 계정의 예시: 초기 하한선은 $48,000입니다. 최고 마감 잔고가 $51,000이 되면 하한선은 $49,000으로 올라갑니다. 다음 날 순청산가치가 $49,000에 닿으면 계정이 즉시 실격될 수 있습니다. 마감 전에 회복해도 위반은 취소되지 않습니다.',
          '모의 펀딩 계정의 경우, 공개된 잠금 장치는 기준에 도달하거나 출금을 요청하면 하한선을 초기 잔고보다 $100 높은 수준에 고정할 수 있습니다. 평가 계정에는 이 잠금 규칙이 적용되지 않습니다. 본인의 정확한 상품에 해당하는 금액을 항상 읽으세요.',
        ],
      },
      {
        heading: '일관성 규칙은 단계와 계산 기준이 서로 다릅니다',
        paragraphs: [
          'HyroTrader의 Core, One-Step, Two-Step 평가는 하루에 인정되는 기여분을 **수익 목표의 40%**로 제한합니다. 초과 수익은 계정에 남지만 목표에는 반영되지 않으며, 손실은 그대로 반영됩니다. FAQ에 따르면 이 평가 단계 분배 규칙은 Hyro Instant에는 적용되지 않습니다.',
          'Tradeify SELECT는 **평가 중 총수익 대비 최고 수익일 비중 40%**를 적용하고, Growth에는 평가 단계 일관성 비율이 없습니다. 두 계산은 서로 다릅니다. 목표 대비 비중은 누적 수익 대비 비중과 같지 않습니다.',
          '펀딩 단계에는 별도의 규칙이 있습니다. Tradeify는 Growth 모의 펀딩 출금에 35%, SELECT 펀딩 계정에는 일관성 비율 없음, 신규 Lightning 계정에는 **20%, 25%, 30%**로 이어지는 단계를 제시합니다. 기존(레거시) Lightning 구매자는 모든 출금에서 20%를 유지할 수 있습니다. 구매 날짜와 계정 단계를 함께 확인하세요.',
        ],
      },
      {
        heading: 'Hyro Instant vs Lightning Funded: 첫 출금을 비교하세요',
        paragraphs: [
          'Hyro Instant에는 평가 목표가 없습니다. 첫 요청에는 **UTC 기준 적격 거래일 3일**과 배분 후 최소 $25의 수익이 필요합니다. 적격 거래일은 거래 규모와 가격 변동에 대한 구체적인 정의가 있어서, 아주 작은 거래를 아무렇게나 여는 것만으로는 충족되지 않습니다. FAQ는 출금 1회당 인정되는 수익을 초기 잔고의 5%로 제한하며, 그 한도를 넘는 수익은 지급되지 않습니다. 시작 수익 배분은 80%이고, 재량에 따라 인상될 수 있습니다.',
          'Tradeify Lightning도 평가를 건너뛰지만 출금 수익 목표와 일관성 규칙이 필요합니다. 공개된 $50,000 예시에서 첫 목표는 **$3,000**인 반면, 첫 요청 한도는 **$2,000**입니다. Tradeify는 트레이더가 요청 금액의 90%를 받는다고 밝힙니다. 목표, 요청 한도, 실수령액은 서로 다른 세 숫자입니다.',
          'Lightning의 다음 수익 목표는 새로운 거래 수익을 요구하며, 이전 주기에서 남은 수익으로는 충족되지 않습니다. 또한 Tradeify의 펀딩 계정 규칙에 따라 출금 요청은 드로다운 하한선을 잠그므로, 출금 후 남은 손실 여유를 확인하세요. 자격이 있다고 해서 요청이 승인된다는 보장은 없습니다.',
        ],
        callout: {
          kind: 'example',
          text: '가상의 Lightning 첫 요청: $3,000 목표에 도달했다고 $3,000을 출금할 수 있는 것은 아닙니다. 90% 배분에서 $2,000을 요청하면 다른 모든 조건을 충족한다는 전제하에 트레이더는 $1,800을 받습니다.',
        },
      },
      {
        heading: '결제 전 실전 리스크 관리 체크리스트',
        paragraphs: [
          '평소의 거래 과정을 정확한 계정 규칙에 대입해 다시 돌려 보세요. 수수료와 미실현 손실을 반영한 순결과와 실제 리셋 시간을 사용하세요. 모든 거래에서 손절을 지키더라도 여러 포지션이 겹치면 계정 전체 하한선을 위반할 수 있습니다.',
        ],
        bullets: [
          '**두 하한선을 모두 기록하세요:** 일일 손실과 최대 드로다운, 그리고 경계선에 닿는 것만으로 위반인지 넘어야 위반인지.',
          '**단계를 추적하세요:** 평가, 모의 펀딩, 이후의 실계좌 전환은 조건이 서로 다를 수 있습니다.',
          '**출금을 모델링하세요:** 수익 목표, 최고 수익일 계산, 요청 한도, 수익 배분, 출금 후 남는 손실 여유.',
          '**접근성과 비용을 확인하세요:** 허용 국가, 지원 플랫폼, 세션 마감 규칙, 진입 수수료, 활성화, 갱신, 해당되는 경우 데이터 비용.',
          '**버전을 보관하세요:** 구매 날짜에 적용되는 계약서와 공식 규칙을 저장하세요. 신규 계정 규칙은 기존 계정과 다를 수 있습니다.',
        ],
      },
      {
        heading: '두 모델 중 어떻게 고를까요',
        paragraphs: [
          '전략이 HyroTrader가 지원하는 암호화폐 상품을 필요로 한다면 HyroTrader의 규칙부터 보세요. 전략이 Tradeify의 선물 시장을 중심으로 짜여 있다면 Tradeify의 규칙부터 보세요. 그다음 프로그램의 손실 허용치와 첫 출금까지의 전체 경로를 비교하세요.',
          '이 비교는 어느 회사의 지급 능력도, 트레이더가 출금을 받을 확률도 입증하지 않습니다. 특정 날짜에 공개된 조건을 설명할 뿐입니다. 문서화된 배경은 링크된 회사 파일에서 확인하고, 구매 전에 현재 약관을 확인하세요.',
        ],
      },
    ],
  },
  'prop-firm-hidden-rules': {
    intro: '프랍펌은 후한 수익 배분과 쉬운 챌린지를 광고하면서도, 구속력 있는 약관에는 출금 가능 시점을 실질적으로 바꾸는 조건을 넣어 둘 수 있습니다. 이는 **놓치기 쉬운 규칙**이지, 회사가 반드시 의도적으로 숨긴 규칙은 아닙니다. 아래 예시는 각 회사가 직접 공개한 문서에서 가져왔습니다. **PropRadar 제휴 파트너도 포함합니다.** 어떤 순위나 제휴 수수료로도 검토 면제를 살 수 없습니다.',
    sections: [
      {
        heading: '1. 평가 단계에서는 뉴스 트레이딩이 허용되지만 펀딩 후에는 수익이 차감됨',
        paragraphs: [
          'E8 Markets는 **E8 Classic 평가** 중에는 뉴스 트레이딩에 제한이 없다고 밝힙니다. 그러나 Classic SimFi Performance 계정에서는 **뉴스 시간대에 낸 수익의 40%만 적격 수익으로 인정됩니다**. 별도 상품인 E8 One은 퍼포먼스 계정에서 뉴스 시간대의 특정 행위를 금지하고, E8 Pro는 뉴스 트레이딩을 허용합니다. 한 브랜드 안에 서로 다른 세 가지 규칙이 있는 셈입니다.',
          'FundingPips도 평가 단계와 Master 단계를 구분합니다. 여러 Master 모델에서는 지정된 고영향 뉴스 시간대 안에 진입하거나 청산해 낸 수익이 **차감될 수 있으며**, 이벤트 최소 5시간 전에 연 포지션에는 명시된 예외가 있습니다. FundingPips Zero는 더 엄격한 제한을 둡니다. 평가 단계의 문구만 보고 펀딩 단계에서도 허용된다고 추론하지 마세요.',
        ],
        callout: {
          kind: 'warning',
          text: '거래 플랫폼에서 매수나 매도 버튼을 누를 수 있다고 해서 **계약이 그 거래를 허용한다는 뜻은 아닙니다**. 거래 전에 정확한 계정 모델, 경제 캘린더, 시간을 확인하세요.',
        },
      },
      {
        heading: '뉴스 트레이딩 규칙 목록: 평가 vs 펀딩 (공식 출처)',
        paragraphs: [
          '이는 **우리가 확인한 10개 프로그램 그룹**이지, 보편적인 블랙리스트가 아닙니다. 발표 시점을 넘겨 포지션을 보유하는 것이 허용된다고 해서 뉴스 급등락을 노린 신규 진입이 허용되는 것은 아닙니다. 아래 규칙은 회사가 판매하는 모든 상품에 자동으로 적용되는 것이 아니라 **명시된 특정 프로그램과 단계**에 적용됩니다.',
        ],
        compare: {
          columns: [
            '평가 단계',
            '적격 / 펀딩 단계',
          ],
          rows: [
            {
              label: 'E8 Classic',
              values: [
                '뉴스 제한 없음',
                '**뉴스 시간대 수익의 40%만 적격**',
              ],
              sourceUrl: 'https://help.e8markets.com/en/articles/9185497-can-i-trade-news',
            },
            {
              label: 'E8 One',
              values: [
                '뉴스 제한 없음',
                '**고영향 뉴스 ±5분 내 거래 금지**; 수익이 삭제될 수 있음',
              ],
              sourceUrl: 'https://help.e8markets.com/en/articles/9185497-can-i-trade-news',
            },
            {
              label: 'E8 Pro',
              values: [
                '제한 없음',
                '제한 없음, 일반 리스크 규칙 적용',
              ],
              sourceUrl: 'https://help.e8markets.com/en/articles/9185497-can-i-trade-news',
            },
            {
              label: 'FundingPips Flex / Standard / Pro',
              values: [
                '보유 허용; 의도적인 뉴스 급등락 거래 금지',
                '**해당 Master 수익 차감**; 5시간 스윙 예외',
              ],
              sourceUrl: 'https://help.fundingpips.com/hc/en-us/articles/34504137479441-News-Trading-Weekend-Holding',
            },
            {
              label: 'FundingPips Zero',
              values: [
                '정확한 계약 확인 필요',
                '**제한 뉴스 동안 진입·청산·보유 금지**; Master에서 10분 구간',
              ],
              sourceUrl: 'https://help.fundingpips.com/hc/en-us/articles/34504137479441-News-Trading-Weekend-Holding',
            },
            {
              label: 'Blue Guardian CFD 1-Step Standard',
              values: [
                '뉴스 허용',
                '고영향 뉴스 전후 **±5분 진입·청산 금지**',
              ],
              sourceUrl: 'https://help.blueguardian.com/en/articles/18426782-1-step-standard-rules',
            },
            {
              label: 'BrightFunded CFD Phase 1 / 2',
              values: [
                '뉴스 트레이딩 제한 없음',
                '**±5분 내 체결 수익 차감**; Instant는 첫날부터 제한',
              ],
              sourceUrl: 'https://help.brightfunded.com/en/articles/9241694-can-i-trade-news',
            },
            {
              label: 'Alpha Futures Standard / Zero / Direct',
              values: [
                'Standard / Zero 평가: 제한 없음; Direct는 평가 없음',
                '지정된 Qualified 플랜에서 **±2분 주문 금지**; Advanced Qualified는 다름',
              ],
              sourceUrl: 'https://help.alpha-futures.com/en/articles/9492063-news-trading-policy',
            },
            {
              label: 'Alpha Capital Pro / One / Three / Direct',
              values: [
                '평가: 제한 없음; Direct는 평가 없음',
                '대상 뉴스 **±5분 체결 금지**; 익절 주문 체결만으로도 수익이 무효화될 수 있음',
              ],
              sourceUrl: 'https://help.alphacapitalgroup.uk/en/articles/9293522-can-i-trade-news',
            },
            {
              label: 'Tradeify Futures',
              values: [
                '뉴스 허용',
                '일반 FAQ에 따라 뉴스 허용',
              ],
              sourceUrl: 'https://help.tradeify.co/en/articles/12268494-common-faqs',
            },
          ],
          note: '2026년 11월 16일 검토. 회사 옆의 ↗를 클릭하면 원래 규칙을 읽을 수 있습니다. 이는 회사 정책이며, 모든 트레이더 분쟁이 어떻게 결정되는지에 대한 독립적 증거가 아닙니다.',
        },
      },
      {
        heading: '2. VPN이나 VPS 때문에 수익 난 거래가 무효가 될 수 있음',
        paragraphs: [
          'GOAT Funded Trader는 **2026년 10월 6일**부터 VPN, VPS, 프록시, 호스팅 환경을 통한 거래를 금지한다고 밝힙니다. 고객센터에 따르면 그렇게 체결된 거래는 즉시 계정 위반을 일으킬 수 있고, 관련 보상은 지급 대상이 되지 않습니다. 최초 서버 로그인에 대한 매우 제한된 예외와, 자사 대시보드 복사 도구에 대한 별도 예외가 설명되어 있습니다.',
          '이는 공개된 계약상 제한이지, **회사가 정당한 출금을 부당하게 거부한다는 증거가 아닙니다**. 그래도 알고리즘 트레이더와, 평소 우회 접속 서비스를 통해 인터넷을 쓰는 방문자에게는 매우 중요합니다.',
        ],
      },
      {
        heading: 'VPN / VPS 관찰 목록: 어떤 회사가 제한하나요?',
        paragraphs: [
          '**VPN(접속 위치 가리기)과 VPS(원격 거래 서버)는 서로 다른 도구입니다.** 둘 다 금지하는 회사도 있고, VPN은 허용하되 호스팅된 주문 실행은 금지하는 회사도 있으며, 거주지를 숨기는 것만 금지하는 회사도 있습니다. 제휴 파트너를 포함해 **표본 중 정책이 명확하고 출처가 있는 11개 회사**를 정리했습니다. "조건부"는 "어디서나 금지"가 아닙니다.',
        ],
        compare: {
          columns: [
            'VPN',
            'VPS / 원격 실행',
          ],
          rows: [
            {
              label: 'GOAT Funded Trader',
              values: [
                '거래 시 **금지** (2026년 10월 6일부터)',
                '**금지**; 자사 도구에 대한 제한적 예외',
              ],
              sourceUrl: 'https://help.goatfundedtrader.com/en/articles/17362726-can-i-use-a-vpn-vps-proxy-or-any-other-hosting-service-while-trading',
            },
            {
              label: 'FundingPips',
              values: [
                '거래 계정 접속 시 **금지**',
                '거래 계정 접속 시 **금지**',
              ],
              sourceUrl: 'https://help.fundingpips.com/hc/en-us/articles/34505029138449-Trading-Conduct-and-Security-Standards',
            },
            {
              label: 'Topstep / TopstepX',
              values: [
                '**금지** (프록시와 TOR도 포함)',
                '원격 서버나 API를 통한 **주문 전송 금지**; 읽기 전용 분석은 허용',
              ],
              sourceUrl: 'https://help.topstep.com/en/articles/11187768-topstepx-api-access',
            },
            {
              label: 'FundedNext CFD',
              values: [
                '제외 국가 IP를 제외하고 **허용**',
                '**$50k 이상 금지**; $50k 미만은 유료 추가 옵션, 적격 거래 EA만; 수동 주문 불가',
              ],
              sourceUrl: 'https://help.fundednext.com/en/articles/8223809-can-i-use-a-vpn-or-vps',
            },
            {
              label: 'Alpha Capital Group',
              values: [
                '**조건부**: 전용 고정 IP + 사전 통지',
                '**조건부**: 전용 고정 IP + 사전 통지',
              ],
              sourceUrl: 'https://help.alphacapitalgroup.uk/en/articles/8420522-what-is-the-ip-rule-are-vpns-and-vpss-allowed',
            },
            {
              label: 'Tradeify Futures',
              values: [
                '**로그인 시 VPN 금지**',
                '**정상 로그인 후** 허용, 트레이더 책임',
              ],
              sourceUrl: 'https://help.tradeify.co/en/articles/12268494-common-faqs',
            },
            {
              label: 'FTMO CFD',
              values: [
                '**대체로 허용**; 명시된 플랫폼에서는 미국 위치 정보 피하기',
                '**대체로 허용**; 미국 플랫폼/위치 예외',
              ],
              sourceUrl: 'https://ftmo.com/en/faq/can-i-travel-or-use-vpn-vps/',
            },
            {
              label: 'Blue Guardian CFD 1-Step Standard',
              values: [
                '**허용**; 카피/그룹 트레이딩 규칙 우회 금지',
                '같은 조건으로 **허용**',
              ],
              sourceUrl: 'https://help.blueguardian.com/en/articles/18426782-1-step-standard-rules',
            },
            {
              label: 'Apex Trader Funding',
              values: [
                '**신원/위치를 숨기거나 규칙을 회피하는 데 쓸 때** 금지',
                '같은 우회 금지 조건; 공개된 전면 금지는 아님',
              ],
              sourceUrl: 'https://apextraderfunding.com/help-center/uncategorized/prohibited-activities/',
            },
            {
              label: 'The5ers',
              values: [
                '**국가 제한 우회 금지**; 전면 금지는 확인되지 않음',
                '인용된 약관에서 전면적인 VPS 규칙은 확인되지 않음',
              ],
              sourceUrl: 'https://the5ers.com/terms-and-conditions/',
            },
            {
              label: 'HyroTrader (암호화폐)',
              values: [
                '거래소/플랫폼의 지역 제한 **우회 금지**',
                '플랫폼과 해당 약관에 따름; 보편적 금지는 확인되지 않음',
              ],
              sourceUrl: 'https://www.hyrotrader.com/faq/platform/which-countries-are-allowed-to-join-hyrotrader-can-i-join-from-the-usuk/',
            },
          ],
          note: '출처가 연결된 목록이며, 미지급 출금에 대한 주장이 아닙니다. 2026년 11월 16일 업데이트. 규칙은 상품, 계정 규모, 플랫폼, 국가에 따라 다를 수 있습니다. 다른 회사들은 이 특정 문제에 대해 아직 검토되지 않았습니다.',
        },
        callout: {
          kind: 'warning',
          text: 'VPS에서 트레이딩 로봇을 돌리는 것은 **EA가 허용된다고 자동으로 허용되는 것이 아닙니다**. 서버, IP, 계정 규모, 주문 전송 규칙을 따로 확인하세요.',
        },
      },
      {
        heading: '3. "스캘핑 허용"에도 시간과 증거금 한도가 붙을 수 있음',
        paragraphs: [
          'Blue Guardian은 선물 프로그램에서 스캘핑을 허용하지만, **총수익의 절반 미만만 10초 미만 보유한 거래에서 나올 수 있다**고 밝힙니다. 또한 CFD 계정에서 **증거금 사용률 80% 기준**을 "전부 아니면 전무"식 도박 규칙으로 별도 설명하며, 그 결과로 수익 삭제나 출금 거부가 있을 수 있습니다.',
          '따라서 "스캘핑 허용"이나 "EA 허용" 같은 표시는 구매 결정을 내리기에는 너무 포괄적입니다. 거래 보유 시간 기준, 자동화 제한, 복수 계정 처리 방식을 찾아보세요.',
        ],
      },
      {
        heading: '4. 일관성 규칙 때문에 챌린지 통과 후에도 출금이 늦어질 수 있음',
        paragraphs: [
          '일관성 규칙은 전체 수익 중 최고 수익일에서 나온 비중을 측정합니다. Topstep에서는 규칙과 비율이 **Trading Combine에 있는지, 펀딩 출금 경로에 있는지에 따라 다릅니다**. 두 단계를 혼동해서는 안 됩니다.',
          '예시: 최고 수익일 한도가 50%라면, $1,200 수익일이 있을 때 비율이 50%로 내려가려면 **총수익이 최소 $2,400**이어야 합니다. 한도를 넘은 비율을 바로잡는 올바른 방법은 일반적으로 고의로 손실을 내는 것이 아니라 적격 수익을 더 쌓는 것입니다.',
        ],
        callout: {
          kind: 'tip',
          text: '별도 가이드인 **일관성 규칙 없는 프랍펌**을 읽어 보세요. "일관성 없음"은 가능한 제한 하나를 없앨 뿐이며, 드로다운, 뉴스, 출금 조건을 없애지는 않습니다.',
        },
      },
      {
        heading: '5. 거주 국가는 출금 자격과 같지 않음',
        paragraphs: [
          'GOAT Funded Trader는 받지 않는 국가 목록에 **싱가포르**를 명시합니다. Apex Trader Funding은 신규 또는 추가 계정에서 제외되는 국가 목록에 **중국**을 올립니다. 두 나라 모두 PropRadar의 해외 방문자에 기여하므로 특히 중요한 예시입니다.',
          '한 회사의 상품마다 서로 다른 지역 목록을 쓸 수 있습니다. FTMO CFD와 FTMO Futures가 그렇고, E8 Classic과 E8 Futures도 마찬가지입니다. 결제를 통과하거나, 해외로 여행하거나, 본인 국가에서 회사가 보인다고 해서 본인 확인(KYC), 국적 확인, 지원 플랫폼 접근, 이용 가능한 출금 수단을 **대신할 수는 없습니다**.',
        ],
        compare: {
          columns: [
            '인도',
            '중국 본토',
            '싱가포르',
          ],
          rows: [
            {
              label: 'FTMO CFD',
              values: [
                '적격으로 공개',
                '적격으로 공개',
                '적격으로 공개',
              ],
              sourceUrl: 'https://ftmo.com/en/faq/who-can-join-ftmo/',
            },
            {
              label: 'Topstep Futures',
              values: [
                '적격으로 공개',
                '**개별 확인 필요**',
                '적격으로 공개',
              ],
              sourceUrl: 'https://help.topstep.com/en/articles/8284116-am-i-eligible-to-trade-with-topstep',
            },
            {
              label: 'My Funded Futures',
              values: [
                '적격으로 공개',
                '**제외**',
                '적격으로 공개',
              ],
              sourceUrl: 'https://help.myfundedfutures.com/en/articles/8229993-restricted-countries-policy',
            },
            {
              label: 'Apex Trader Funding',
              values: [
                '적격으로 공개',
                '**제외**',
                '적격으로 공개',
              ],
              sourceUrl: 'https://apextraderfunding.com/help-center/getting-started/restricted-countries/',
            },
            {
              label: 'GOAT Funded Trader',
              values: [
                '적격으로 공개',
                '적격으로 공개',
                '**제외**',
              ],
              sourceUrl: 'https://help.goatfundedtrader.com/en/articles/10742187-which-countries-are-restricted-at-goat-funded-trader',
            },
            {
              label: 'FundedNext CFD',
              values: [
                '적격으로 공개',
                '적격으로 공개',
                '적격으로 공개',
              ],
              sourceUrl: 'https://help.fundednext.com/en/articles/8020080-are-any-countries-restricted-on-fundednext-cfds',
            },
            {
              label: 'Fintokei',
              values: [
                '**제외**',
                '**일시 제외**',
                '적격으로 공개',
              ],
              sourceUrl: 'https://support.fintokei.com/en/articles/6538820-who-can-join-fintokei',
            },
            {
              label: 'Alpha Futures',
              values: [
                '적격으로 공개',
                '**제외**',
                '적격으로 공개',
              ],
              sourceUrl: 'https://help.alpha-futures.com/en/articles/9523389-countries-with-limitations',
            },
            {
              label: 'Alpha Capital Group',
              values: [
                '적격으로 공개',
                '적격으로 공개',
                '적격으로 공개',
              ],
              sourceUrl: 'https://help.alphacapitalgroup.uk/en/articles/8775575-countries-with-limitations',
            },
            {
              label: 'Lucid Trading',
              values: [
                '적격으로 공개',
                '적격으로 공개',
                '적격으로 공개',
              ],
              sourceUrl: 'https://support.lucidtrading.com/en/articles/11404636-restricted-countries',
            },
            {
              label: 'PipFarm',
              values: [
                '적격으로 공개',
                '적격으로 공개',
                '적격으로 공개',
              ],
              sourceUrl: 'https://help.pipfarm.com/en/articles/4318163-prohibited-country-list',
            },
            {
              label: 'HyroTrader (Hyro 플랫폼)',
              values: [
                '적격으로 공개',
                '적격으로 공개',
                '적격으로 공개',
              ],
              sourceUrl: 'https://www.hyrotrader.com/faq/platform/which-countries-are-allowed-to-join-hyrotrader-can-i-join-from-the-usuk/',
            },
            {
              label: 'BrightFunded CFD',
              values: [
                '적격으로 공개',
                '적격으로 공개',
                '적격으로 공개',
              ],
              sourceUrl: 'https://help.brightfunded.com/en/articles/9286630-what-countries-are-restricted-at-brightfunded',
            },
            {
              label: 'Upcomers',
              values: [
                '적격으로 공개',
                '적격으로 공개',
                '적격으로 공개',
              ],
              sourceUrl: 'https://help.upcomers.com/en/articles/8703655-are-there-any-prohibited-countries',
            },
          ],
          note: '인용된 공개 일반 정책에 따른 가입 허용 여부이며, 2026년 11월 16일 확인. 법적 면허, KYC 승인, 출금 약속이 아닙니다. 녹색 항목은 실제 시험 구매가 아니라 회사가 명시한 \'제외 국가를 뺀 전 세계\' 정책을 근거로 합니다. 다른 챌린지나 제3자 플랫폼에서는 답이 달라질 수 있습니다.',
        },
        callout: {
          kind: 'warning',
          text: 'PropRadar의 국가 필터는 회사가 **공개한 가입 조건**을 반영할 뿐, 법적 허가, 규제 면허, 출금 보장이 아닙니다. 상품을 확인할 수 없을 때는 추측하지 않고 **확인되지 않음**이라고 표시합니다.',
        },
      },
      {
        heading: '6. 다른 곳에 살더라도 제한 국가를 방문하면 위반이 될 수 있음',
        paragraphs: [
          'Take Profit Trader는 금지된 위치에서 거래하거나 시장 데이터에 접속한 단 한 번의 기록만으로도 계정이 제한될 수 있다고 밝힙니다. 그런 국가를 경유해 접속하는 VPN과 원격 연결도 명시적으로 언급합니다. 따라서 허용 관할권의 거주자라도 노트북을 들고 해외에 가기 전에 **여행 및 IP 규칙**을 확인해야 합니다.',
          '모든 회사가 이 규칙을 쓰는 것은 아닙니다. Tradeify는 일반적인 지역 제한이 **단기 여행이 아니라 영구 거주지**를 기준으로 한다고 밝힙니다. 따라서 같은 여행도 두 회사가 다르게 다룰 수 있습니다.',
        ],
      },
      {
        heading: '7. 출금이 계약상 재량 승인에 달려 있을 수 있음',
        paragraphs: [
          'Apex Trader Funding의 자체 리스크 고지(Risk Disclosure)에는 Performance Account 보상이 회사의 **재량**에 따라 지급되며, 보상 지급 또는 거부 결정은 최종적이라고 적혀 있습니다. User Agreement와 공개된 출금 기준과 함께 읽어야 할 중요한 조항입니다.',
          '재량 조항이 **회사가 정당한 지급을 체계적으로 거부한다는 증거는 아닙니다**. 다만 트레이더는 돈을 쓰기 전에 규칙 준수를 기록해 두고 분쟁 및 이의 제기 경로를 이해해야 한다는 뜻입니다.',
        ],
      },
      {
        heading: '8. 펀딩 단계와 실계좌 단계는 서로 바꿀 수 없을 수 있음',
        paragraphs: [
          'Tradeify는 Live Account 진입을 거부당한 트레이더가 모의 단계로 그냥 돌아갈 수는 없다고 밝힙니다. FTMO Futures도 Sim-Funded 경험과 Live Funded Account로 넘어갈 자격을 구분하며, Live Funded Account는 추가 국가에서 제한됩니다.',
          '회사가 약속하는 것이 펀딩 단계인지, 실제 증권 계좌인지, 아니면 모의 보상 프로그램뿐인지 물어보세요. 광고 문구의 **"펀딩"이 어디서나 같은 계약 구조를 뜻하지는 않습니다**.',
        ],
      },
      {
        heading: '9. 예상치 못한 조건이 없는 프랍펌을 찾는 방법',
        paragraphs: [
          '어떤 독립 사이트도 회사에 숨은 규칙이 *전혀* 없다고 인증할 수 없습니다. 약관은 바뀔 수 있고, KYC는 개인별로 진행되며, 고객지원 결정은 때때로 재량에 따릅니다. 그래도 맞지 않는 프로그램을 살 가능성은 줄일 수 있습니다.',
        ],
        steps: [
          {
            title: '정확한 상품을 특정하세요',
            text: '**회사, 계정 이름, 계정 규모, 평가/펀딩 단계**를 적어 두세요. 브랜드 단위의 요약으로는 충분하지 않습니다.',
          },
          {
            title: '계약서와 날짜를 저장하세요',
            text: '**약관, 고객센터 문서, 출금 정책, 제한 국가 목록** 전체를 읽고, 날짜가 표시된 페이지 사본을 보관하세요.',
          },
          {
            title: '실제 트레이딩 스타일을 테스트하세요',
            text: '실제로 쓰는 전략에 맞춰 **뉴스 시간대, 카피 트레이딩, VPN/VPS, 보유, 최대 계약 수, 일관성, 비활동** 규칙을 확인하세요.',
          },
          {
            title: '현실적인 첫 출금을 계산하세요',
            text: '**수익 목표, 최소 거래일, 첫 출금 한도, 활성화 수수료, 출금 수수료, 결제 대행사 요건**을 포함하세요.',
          },
          {
            title: '결제 전에 서면으로 문의하세요',
            text: '모호한 부분은 고객지원에 **정확한 규칙과 버전**을 명시한 답변을 요청하고, 그 답변을 저장하세요.',
          },
        ],
        callout: {
          kind: 'tip',
          text: '비교표에 없는 규칙을 발견했다면 **출처 제보** 연락처로 공식 링크와 스크린샷을 PropRadar에 보내 주세요. 제휴사와 비제휴사 모두 같은 편집 기준으로 검토합니다.',
        },
      },
    ],
  },
  'meilleure-prop-firm-2026': {
    intro: '단 하나의 최고 프랍펌은 없습니다. **본인의 시장, 트레이딩 스타일**, 그리고 운영사 자체에 대해 감수할 수 있는 리스크 수준에 맞는 최고의 회사가 있을 뿐입니다. 이 순위는 마지막 기준에서 출발합니다. 수익 배분과 할인을 비교하기 전에, 필요할 때 그 회사가 **여전히 존재하고 실제로 지급할** 가능성이 있는지부터 확인합니다.',
    sections: [
      {
        heading: '이 순위를 만드는 방법',
        paragraphs: [
          'PropRadar의 각 회사는 규칙의 명확성, 출금 증거, 법적 투명성, 공개 리뷰 신호, 운영 이력을 바탕으로 **100점 만점 점수**를 받습니다. 제휴 링크는 모든 프로필에 공개되며 **점수를 절대 바꾸지 않습니다**. 제휴 관계가 있는 회사도 약점이 그대로 표시되고, 제휴 관계가 없는 회사도 최상위에 오를 수 있습니다.',
          '이번 업데이트 기준 최고 점수는 오래 운영된 회사들이 차지합니다: **FTMO(91/100), The5ers(85/100), Topstep(84/100)**. 가장 저렴한 곳은 아닙니다. PropRadar 파일에서 공개 이력이 가장 길고, 약관이 가장 읽기 쉬우며, 해결되지 않은 출금 신호가 가장 적은 프로필입니다.',
        ],
      },
      {
        heading: '먼저 시장부터 정하세요',
        paragraphs: [
          '외환/CFD 트레이더와 선물 트레이더는 같은 시장에서 쇼핑하지 않습니다. **훌륭한 선물 회사도 외환 트레이더에게는 쓸모가 없으므로**, 먼저 시장으로 걸러내세요.',
        ],
        compare: {
          columns: [
            '외환 / CFD',
            '선물',
          ],
          rows: [
            {
              label: '플랫폼',
              values: [
                'MT5, cTrader',
                '선물 플랫폼',
              ],
            },
            {
              label: '한도',
              values: [
                '**계정 대비 %**',
                '**달러 금액**',
              ],
            },
            {
              label: '드로다운',
              values: [
                '2단계 챌린지에서는 대개 고정',
                '대개 **트레일링**',
              ],
            },
            {
              label: '예시',
              values: [
                'FTMO, The5ers',
                'Topstep',
              ],
            },
          ],
        },
      },
      {
        heading: '그다음 규칙을 본인 스타일에 맞추세요',
        paragraphs: [
          '대부분의 계정을 끝내는 규칙은 **수익 목표가 아닙니다**. 드로다운 유형, 일일 손실 한도, 일관성 규칙, 뉴스 제한, 보유 규칙입니다. 스캘퍼에게는 빠른 체결과 최소 거래 시간 제한이 없는 환경이 필요합니다. 스윙 트레이더에게는 오버나이트와 주말 보유가 필요합니다. 뉴스 트레이더에게는 평가 단계뿐 아니라 **펀딩 계정에서도** 뉴스 트레이딩을 허용하는 회사가 필요합니다.',
        ],
        bulletStyle: 'check',
        bullets: [
          '**드로다운:** 고정 한도가 트레일링 한도보다 관리하기 쉽습니다.',
          '**일관성:** 평가에 적용되는지, 출금에 적용되는지, 둘 다인지 확인하세요.',
          '**뉴스와 보유:** 대개 더 엄격한 펀딩 계정 규칙을 확인하세요.',
          '**출금:** 빈도, 최소 금액, 첫 출금 한도, 처리 수수료.',
        ],
      },
      {
        heading: '마지막으로 실제 비용을 비교하세요',
        paragraphs: [
          '프랍펌의 실제 비용은 **첫 출금 전에 쓰는 돈**입니다. 챌린지 수수료, 리셋, 활성화 수수료, 교체 계정 비용에서 환불액을 뺀 금액입니다. 드로다운이 가혹한 저렴한 챌린지가 통과할 가능성이 높은 비싼 챌린지보다 더 많은 비용이 들 수 있습니다.',
        ],
      },
      {
        heading: '이 순위에서 회사가 떨어지는 경우',
        paragraphs: [
          '증거가 바뀌면 점수도 바뀝니다. 모든 변경은 **회사의 업데이트 기록에 날짜와 함께 남으므로**, 왜 그리고 언제 바뀌었는지 볼 수 있습니다. 점수를 낮추는 요인:',
        ],
        bulletStyle: 'flag',
        bullets: [
          '**규제 당국 경고**',
          '**반복되는 출금 지연**',
          '**기존 계정에 소급 적용된 규칙 변경**',
          '**더 이상 해당 회사를 서비스하지 않는** 도메인',
          '**법인**에 대한 투명성 저하',
        ],
      },
    ],
  },
  'prop-firm-sans-consistency-rule': {
    intro: '일관성 규칙은 **총수익 중 하루에서 나올 수 있는 비중**을 제한합니다. 운 좋은 하루, 과도한 포지션 하나, 뉴스 급등 한 번으로 계정을 꾸준히 운용할 수 있는지와 무관한 출금이 나올 수 있기 때문에 존재하는 규칙입니다. 규칙이 없다고 주장하는 회사를 찾는 것보다 정확한 공식을 이해하는 것이 더 중요합니다.',
    sections: [
      {
        heading: '규칙은 어떻게 계산되나요',
        paragraphs: [
          '대부분의 회사는 같은 핵심 공식을 사용합니다: **최고 수익일 수익 ÷ 총수익**을 백분율로 나타낸 값입니다. 결과가 회사의 한도를 넘으면, 규칙이 적용되는 단계에 따라 평가 통과나 출금 요청 자격이 아직 없는 것입니다.',
          '한도 50%의 계산 예시: 월요일 $1,200, 화요일 $300, 수요일 $500을 벌어 총 $2,000이 되었습니다. 최고 수익일은 **총수익의 60%**로 한도를 넘습니다. 손실을 낼 필요는 없습니다. $1,200이 50% 이하가 되도록 총수익을 늘리면 되며, 여기서는 **최소 $2,400**이 필요합니다.',
          '일부 회사는 규칙을 다르게 적용합니다. **Topstep은 Trading Combine에서 실격시키는 대신 수익 목표를 올립니다**. 최고 수익일이 목표의 55%를 넘으면 목표가 \'최고 수익일 ÷ 0.55\'로 늘어납니다(Topstep 고객센터, 2026년 9월 17일자 페이지).',
        ],
        callout: {
          kind: 'tip',
          text: '빠른 확인: **필요한 총수익 = 최고 수익일 ÷ 한도**. 여기서는 $1,200 ÷ 0.50 = **$2,400**입니다.',
        },
      },
      {
        heading: '규칙이 적용되는 곳: 평가, 출금, 또는 둘 다',
        paragraphs: [
          '같은 비율이라도 의미가 크게 다를 수 있습니다. 평가 단계의 일관성 규칙은 **통과를 늦출 뿐입니다**. 출금 단계의 일관성 규칙은 펀딩 계정에서 이미 돈을 번 뒤에도 **출금을 막을 수 있습니다**. 단계마다 다른 한도를 쓰는 회사도 있습니다. Topstep은 **Combine에서 55%**, Express Funded Account의 **Consistency 출금 경로에서 40%**를 적용합니다.',
          'FTMO는 **2026년 10월 12일**에 규칙을 바꿨습니다. 새 1-Step Challenge 주문에는 **손실일을 포함한** 총수익과 최고 수익일을 비교하는 Consistency 규칙이 적용되고, 이전 주문의 계정은 수익일만 계산하던 기존 Best Day Rule을 유지합니다. FTMO는 요건을 충족하지 못하면 충족할 때까지 거래를 계속하면 된다고 밝힙니다(FTMO 트레이딩 업데이트, 2026년 10월 8일). PropRadar는 The5ers High Stakes 프로그램에서 비율 기반 최고 수익일 규칙을 확인하지 못했습니다.',
        ],
        callout: {
          kind: 'warning',
          text: '항상 **단계, 상품, 주문 날짜**를 확인하세요. 같은 회사가 두 가지 버전의 규칙을 운영할 수 있습니다.',
        },
      },
      {
        heading: '일관성 규칙이 없는 회사가 더 좋은가요?',
        paragraphs: [
          '자동으로 그렇지는 않습니다. 일관성 규칙을 없앤 회사는 대개 다른 방법으로 리스크를 통제합니다. "일관성 규칙 없음"이라는 문구 뒤에 **유지하기 더 어려운** 펀딩 계정이 숨어 있을 수 있습니다. 무엇이 그 자리를 대신하는지 찾아보세요:',
        ],
        bulletStyle: 'check',
        bullets: [
          '**더 빡빡한 일일 손실 한도**',
          '**트레일링 드로다운**',
          '**첫 출금 한도**',
          '**최소 거래일**',
          '**포지션 규모 제한**',
        ],
        callout: {
          kind: 'example',
          text: '이 규칙은 주로 **수익이 몰리는 결과**에 불리합니다. 뉴스 트레이더, 큰 포지션 하나를 청산하는 스윙 트레이더, 연패 뒤 규모를 키우는 사람 등입니다. 하루하루 결과가 비교적 고르다면 40~50% 한도에 걸리는 경우는 드뭅니다.',
        },
      },
      {
        heading: '일관성 규칙 아래에서 편하게 거래하는 법',
        paragraphs: [
          '네 가지 습관이 규칙에 걸리지 않게 해 줍니다:',
        ],
        steps: [
          {
            title: '비율을 추적하세요',
            text: '세션이 끝날 때마다 **최고 수익일 ÷ 총수익**을 계속 기록하세요.',
          },
          {
            title: '오늘의 상한을 알아 두세요',
            text: '거래 전에 비율을 한도 위로 올리지 않고 **벌 수 있는 금액**을 알아 두세요.',
          },
          {
            title: '큰 하루 뒤에는 분산하세요',
            text: '그 하루를 반복하려 하기보다 **작은 수익일 여러 번**을 계획하세요.',
          },
          {
            title: '막판에 규모를 키우지 마세요',
            text: '지나치게 큰 수익일 하루도 손실일만큼 확실하게 **통과를 늦출 수 있습니다**.',
          },
        ],
      },
    ],
  },
  'topstep-review': {
    intro: 'Topstep은 선물 프랍 트레이딩에서 가장 오래된 이름입니다. Michael Patak이 **2012년 시카고**에서 설립했으며, 현재의 프랍펌 붐이 오기 몇 년 전부터 Trading Combine을 운영했습니다. 그 이력이 가장 큰 강점입니다. 약점은 **선물 전용** 상품, 2025년 말 이후의 **잦은 규칙 변경**, 그리고 규율을 요구하는 **트레일링 손실 한도**입니다.',
    sections: [
      {
        heading: 'Topstep은 믿을 만한가요?',
        paragraphs: [
          'Topstep은 긴 공개 이력, 공개된 고객센터, 2026년 초에 출범한 계열 소개 브로커 Topstep Brokerage를 갖춘 **자리 잡은 미국 운영사**입니다. PropRadar는 **84/100**점을 매겼으며 이 회사에 대한 규제 당국 경고는 기록하지 않았습니다. 다른 모든 프랍펌과 마찬가지로 평가와 Express Funded Account는 **모의 거래**입니다. 출금은 증권 계좌의 거래 수익이 아니라 Topstep이 지급하는 보상입니다.',
          'Trustpilot에서 이 프로필은 **14,955개 리뷰**를 바탕으로 **3.7**의 TrustScore를 보이며, 이 회사가 "고위험 투자와 관련될 수 있다"는 Trustpilot의 안내가 붙어 있습니다(2026년 10월 23일 확인). 2025년 말의 불만은 **TopstepX 플랫폼 장애**와 실행되지 않은 스톱 주문에 집중되었습니다.',
        ],
        stats: [
          {
            value: '2012',
            label: '설립, 시카고',
          },
          {
            value: '84/100',
            label: 'PropRadar 점수',
          },
          {
            value: '3.7',
            label: 'Trustpilot, 리뷰 14,955개 (2026년 10월 23일)',
          },
        ],
      },
      {
        heading: 'Trading Combine은 어떻게 작동하나요',
        paragraphs: [
          'Trading Combine은 Topstep의 평가 단계입니다. **기간 제한도 최소 거래일도 없습니다.** 포지션은 세션 종료 전에 청산해야 하며, Topstep은 오버나이트나 주말 보유를 허용하지 않습니다.',
          '**Maximum Loss Limit(MLL)**은 장 마감 잔고가 늘어날수록 위로 따라 올라가고 절대 내려가지 않지만, 위반 여부는 미실현 손실을 포함해 **실시간으로 감시됩니다**. Combine에서는 시작 잔고에 도달하면 더 이상 따라 올라가지 않습니다(Topstep 고객센터, 2026년 9월 18일 업데이트).',
          '일관성 목표는 **55%**입니다. 최고 수익일이 수익 목표의 55%를 넘을 수 없습니다. 넘더라도 실격되지 않고 **목표가 \'최고 수익일 ÷ 0.55\'로 올라갑니다**(고객센터, 2026년 9월 17일). 선택 사항인 $1,000, $2,000, $3,000의 일일 손실 한도는 계정을 닫지 않고 해당 세션의 거래만 중지합니다.',
        ],
        compare: {
          columns: [
            '50K',
            '100K',
            '150K',
          ],
          rows: [
            {
              label: '수익 목표',
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
          note: 'Topstep 고객센터, 2026년 9월.',
        },
        callout: {
          kind: 'example',
          text: '50K Combine에서 최고 수익일이 **$2,000**인 경우: $3,000의 55%($1,650)를 넘으므로 목표는 $2,000 ÷ 0.55 ≈ **$3,636**이 됩니다.',
        },
      },
      {
        heading: 'Express Funded Account와 출금',
        paragraphs: [
          '통과하면 여전히 모의 거래인 **Express Funded Account(XFA)**에서 거래하며, 여기서부터 출금이 시작됩니다. XFA는 잔고 $0에서 시작하고 그 아래에 같은 MLL 여유분이 있습니다. 2026년 2월부터는 두 가지 출금 경로 중 하나를 고르며, **이 선택은 영구적입니다**.',
          '2026년 1월 12일 이후 가입한 트레이더는 승인된 출금액의 **90%**를 받고, 그 이전 가입자는 첫 $10,000의 100%를 받은 뒤 90%를 받습니다. 최소 출금 요청액은 **$125**입니다. 우수한 트레이더는 실제 자본, 의무 일일 손실 한도, 단계적으로 풀리는 적립금이 있는 **Live Funded Account**에 초대될 수 있습니다.',
        ],
        compare: {
          columns: [
            'Standard 경로',
            'Consistency 경로',
          ],
          rows: [
            {
              label: '매 출금 전',
              values: [
                '최소 $150의 **수익일 5일**',
                '**거래일 3일**, 가장 큰 수익일이 순수익의 **40% 이하**',
              ],
            },
          ],
          note: '두 경로 중 선택은 영구적입니다.',
        },
        callout: {
          kind: 'warning',
          text: '첫 출금 후에는 MLL이 **$0**으로 설정됩니다. 여유분이 사라지므로 **출금 후 나쁜 하루 한 번으로 계정이 끝날 수 있습니다.**',
        },
      },
      {
        heading: '장점과 단점',
        paragraphs: [
          '현재 규칙을 읽고 나서 눈에 띄는 점:',
        ],
        prosCons: {
          pros: [
            '선물 프랍 트레이딩에서 **가장 긴 이력**과 방대하고 문서화된 고객센터.',
            '**기간 제한**이나 최소 거래일이 없으며, 일관성 규칙은 실격 대신 목표를 올립니다.',
            '신규 트레이더에게 첫 달러부터 **90% 수익 배분**, 낮은 **$125** 최소 출금액.',
          ],
          cons: [
            '**선물 전용**이며 모든 포지션은 세션 마감 전에 정리해야 합니다.',
            '**첫 출금 후 MLL이 $0으로** 재설정됩니다.',
            '2025년 11월부터 2026년 4월 사이 규칙이 **여러 번 바뀌었습니다**: 구매할 때마다 다시 읽으세요.',
          ],
        },
      },
      {
        heading: 'Topstep이 맞는 사람',
        paragraphs: [
          '월 구독형 가격 때문에 **평가가 오래 걸리면** 일회성 수수료를 받는 경쟁사보다 비용이 더 듭니다. Apex와 비교하고 있다면 각 계정 버전을 규칙별로 맞춰 본 Topstep vs Apex 가이드를 읽어 보세요.',
        ],
        fit: {
          yes: [
            '**장중 선물** 트레이더',
            '**자리 잡은 운영사**를 원하는 트레이더',
            '**실시간 감시되는 트레일링 한도**에 익숙한 트레이더',
          ],
          no: [
            '**외환 또는 CFD** 트레이더',
            '오버나이트로 보유하는 **스윙 트레이더**',
            '**주로 가격**으로 고르는 사람',
          ],
        },
      },
    ],
  },
  'prop-firm-drawdown': {
    intro: '드로다운은 **프랍펌 계정 대부분을 끝내는 규칙**입니다. 기준점에서 측정했을 때 계정이 잃어도 되는 최대 금액입니다. 두 회사가 모두 $50,000 계정에 "$3,000 드로다운"을 광고하더라도 기준점이 움직이는 방식이 다르기 때문에 **거래할 수 있는 여유는 전혀 다를 수 있습니다**.',
    sections: [
      {
        heading: '일일 손실 한도 vs 최대 드로다운',
        paragraphs: [
          '대부분의 회사는 **두 가지 한도를 동시에** 사용합니다. **일일 손실 한도**는 하루 거래에서 잃을 수 있는 금액을 제한하며, 대개 그날의 시작 잔고나 자산을 기준으로 측정합니다. **최대 드로다운**은 계정 전체 기간의 총손실을 제한합니다. 둘 중 하나라도 어기면 대개 계정 위반이 되지만, 일부 선물 회사는 일일 한도에 닿으면 해당 세션의 남은 시간 동안 거래만 중지시킵니다.',
        ],
      },
      {
        heading: '고정(Static) 드로다운',
        paragraphs: [
          '고정 드로다운은 **시작 잔고 아래에 고정되어 절대 움직이지 않습니다**. 10% 고정 한도가 있는 $100,000 계정이라면 하한선은 영원히 $90,000입니다. 계정을 $108,000까지 키우면 **$18,000의 여유**가 생깁니다. 가장 관대한 모델이며, 외환/CFD 2단계 챌린지에서 흔합니다.',
        ],
      },
      {
        heading: '트레일링 드로다운(장중)',
        paragraphs: [
          '장중 트레일링 드로다운은 **미실현 수익을 포함한 최고 자산을 실시간으로 따라갑니다**. $2,500 트레일링 한도가 있는 $50,000 계정 예시: 하한선은 $47,500에서 시작합니다. 한 거래가 미실현 +$1,500까지 가면 하한선은 $49,000으로 올라가며, **그 뒤 그 거래를 본전에 청산하더라도** 그대로입니다. 한 푼도 확정하지 않았는데 여유가 $2,500에서 $1,000으로 줄어든 것입니다. 가장 엄격한 모델이며, 선물과 즉시 펀딩 계정에서 흔합니다.',
        ],
      },
      {
        heading: '장 마감(EOD) 트레일링 드로다운',
        paragraphs: [
          '장 마감 트레일링 드로다운은 **거래일이 마감될 때만** 마감 잔고를 기준으로 움직입니다. 미실현 수익의 장중 변동은 하한선을 올리지 않으므로 장중 트레일링보다 훨씬 관리하기 쉽습니다.',
        ],
        callout: {
          kind: 'warning',
          text: '하한선은 마감 때만 움직이지만 **위반 여부는 실시간으로 확인되는 경우가 많습니다**. 예를 들어 Topstep은 Maximum Loss Limit을 장 마감 잔고를 기준으로 올리면서도 미실현 손실을 포함해 실시간으로 감시합니다.',
        },
      },
      {
        heading: '트레일링이 멈추는 시점: 잠금',
        paragraphs: [
          '대부분의 트레일링 모델은 어느 시점에 **따라 올라가기를 멈춥니다**. 대개 하한선이 시작 잔고(또는 시작 잔고에 작은 버퍼를 더한 값)에 도달할 때입니다. 그 이후로는 한도가 고정 한도처럼 작동합니다.',
        ],
        callout: {
          kind: 'tip',
          text: '트레일링 계정의 첫 며칠이 가장 위험합니다. 더 큰 포지션을 잡기 전에 **잠금 수준까지 버퍼를 쌓으세요**.',
        },
      },
      {
        heading: '잔고 기준 vs 자산(에쿼티) 기준 한도',
        paragraphs: [
          '**잔고 기준** 한도는 청산된 거래만 계산합니다. **자산 기준** 한도는 열린 포지션도 계산하므로, 나중에 수익으로 청산했을 거래라도 평가 손실 때문에 계정 위반이 될 수 있습니다. 최근의 회사 대부분은 자산 기준으로 위반을 측정합니다. 요약 표가 아니라 **약관의 정의를 읽으세요**.',
        ],
      },
      {
        heading: '고르는 방법',
        paragraphs: [
          '드로다운 모델을 **본인 거래의 움직임**에 맞추세요:',
        ],
        compare: {
          columns: [
            '추천',
          ],
          rows: [
            {
              label: '수익이 크게 났다가 되돌아오는 거래',
              values: [
                '**고정** 또는 **장 마감 기준**; 장중 트레일링은 피하세요',
              ],
            },
            {
              label: '손절이 촘촘한 작고 잦은 스캘핑',
              values: [
                '잠금 수준에 빨리 도달한다면 **트레일링**도 가능합니다',
              ],
            },
            {
              label: '손절 폭이 넓은 스윙 거래',
              values: [
                '평소 평가 손실보다 여유가 큰 **고정** 방식',
              ],
            },
          ],
        },
        callout: {
          kind: 'tip',
          text: '포지션 규모는 광고된 계정 규모가 아니라 항상 **하한선까지 남은 여유**를 기준으로 정하세요.',
        },
      },
    ],
  },
  'goat-funded-trader-avis': {
    intro: 'GOAT Funded Trader는 지난 2년간 가장 눈에 띈 프랍펌 중 하나입니다. 공격적인 할인, 다양한 모델, 끊임없는 소셜 미디어 노출이 특징입니다. **눈에 띈다고 신뢰할 수 있는 것은 아닙니다.** 이 리뷰는 문서로 확인된 것과 마케팅을 구분하고, 트레이더가 출금을 잃는 지점인 **펀딩 계정 규칙**을 가장 먼저 다룹니다.',
    sections: [
      {
        heading: 'GOAT Funded Trader의 운영 주체',
        paragraphs: [
          'GOAT Funded Trader는 **2023년 5월**에 출범했습니다. 홍콩 회사인 **Wishes Tower International Limited**의 상호이며, 모의 거래는 **세인트루시아의 Goat Funded LTD**가 제공합니다. 이 서비스를 감독하는 **금융 규제 당국은 없습니다**. 약관에는 모의 계정, 환불 불가 구매, 출금에 대한 폭넓은 재량이 명시되어 있습니다. 업계에서 흔한 내용이지만 구매 전에 알아 둘 가치가 있습니다.',
          'PropRadar는 이 회사에 **58/100**점을 매겼습니다. 이는 Trustpilot이 평점을 보류하는 동안 허용되는 최대 64점보다 낮으며, 회사는 관찰 대상 목록에 올라 있습니다. 운영사는 활동 중이며 트레이더에게 지급하고 있다고 밝히지만, 현재의 출금 한도, 차감, 리스크 팀의 결정은 상당한 제약을 만듭니다. PropRadar는 GOAT Funded Trader와 제휴 관계가 있으며, 이는 이 점수나 리뷰를 바꾸지 않습니다.',
        ],
      },
      {
        heading: 'Trustpilot 상황',
        paragraphs: [
          '2026년 10월 23일 Trustpilot에는 이 회사의 **TrustScore가 표시되지 않았습니다**. 프로필에는 "가이드라인 위반으로 이 회사의 평점을 이용할 수 없다"는 안내와 Trustpilot이 "다수의 가짜 리뷰를 삭제했다"는 안내가 있습니다. 프로필에는 여전히 4,352개의 리뷰가 있으며, 평가는 크게 갈립니다:',
          '양극화된 프로필은 대개 **두 가지 매우 다른 경험**을 뜻합니다. 빠르게 지급받은 트레이더와, 꼼꼼히 읽지 않은 규칙 때문에 출금을 거부당한 트레이더입니다.',
        ],
        stats: [
          {
            value: '4,352',
            label: '표시된 리뷰 수',
          },
          {
            value: '46%',
            label: '별 5개',
          },
          {
            value: '40%',
            label: '별 1개',
          },
        ],
        callout: {
          kind: 'warning',
          text: 'Trustpilot 안내가 유지되는 동안 거의 완벽한 평점이라는 홈페이지 주장은 **주의해서 받아들이세요**.',
        },
      },
      {
        heading: '가장 중요한 펀딩 계정 규칙',
        paragraphs: [
          '챌린지 모델 자체는 일반적입니다. **3-Step 모델은 2026년 8월에 종료되었습니다.** 아래 수치는 2026년 10월 5일에 확인한 제3자 리뷰에서 가져온 것이므로 결제 시 확인하세요.',
          '출금을 좌우하는 규칙은 **통과한 뒤에** 시작됩니다:',
        ],
        bulletStyle: 'flag',
        bullets: [
          '**Goat Guard:** 펀딩된 1-Step 및 2-Step 계정에서 초기 잔고의 2%에 해당하는 평가 손실이 나면 수익 배분이 50%로 줄고, 두 번째로 발동하면 계정이 위반 처리됩니다.',
          '**2분 규칙:** 2분 미만 보유한 거래의 수익은 출금 시 제외되지만, 그런 거래의 손실은 계정에 그대로 남습니다.',
          '**뉴스 시간대:** 고영향 뉴스 전후에 낸 수익은 시작 잔고의 1%로 제한됩니다.',
          '**일일 수익 한도:** 펀딩 계정은 하루에 최대 $3,000의 수익만 확정할 수 있습니다.',
          '**Instant 모델:** 트레일링 드로다운이며, 모델에 따라 1% 또는 2%의 평가 손실이 나면 계정이 종료됩니다.',
        ],
        compare: {
          columns: [
            '수익 목표',
            '일일 손실',
            '최대 손실',
          ],
          rows: [
            {
              label: '2-Step GOAT',
              values: [
                '8% 후 6%',
                '4%',
                '10% 고정',
              ],
            },
            {
              label: '2-Step Standard',
              values: [
                '10% 후 5%',
                '5%',
                '10%',
              ],
            },
            {
              label: '1-Step',
              values: [
                '10%',
                '3%',
                '6% 고정',
              ],
            },
          ],
        },
      },
      {
        heading: '출금',
        paragraphs: [
          '기본 수익 배분은 **80%**이며, 결제 시 유료로 100%까지 올릴 수 있고 스케일링 플랜으로 90~95%까지 높일 수 있습니다. 대부분의 모델은 **14일마다** 지급하며, **최소 $100**, **처리 수수료 3%**가 있습니다. 첫 두 번의 출금은 시작 잔고의 6%와 $10,000 중 낮은 금액으로 제한됩니다. 결제 수단에는 Rise, 은행 송금, Skrill, 암호화폐가 있으며 각각 한도가 있습니다.',
          '출금 속도(24시간 대 영업일 2일)나 최대 계정 규모처럼 여러 공개 주장이 고객센터 내용과 충돌합니다.',
        ],
        stats: [
          {
            value: '80%',
            label: '기본 수익 배분',
          },
          {
            value: '14일',
            label: '대부분 모델의 출금 주기',
          },
          {
            value: '$100',
            label: '최소 출금액',
          },
          {
            value: '3%',
            label: '처리 수수료',
          },
        ],
        callout: {
          kind: 'warning',
          text: '마케팅과 약관이 다를 때 출금에 **적용되는 것은 약관입니다**.',
        },
      },
      {
        heading: 'GOAT Funded Trader가 맞는 사람',
        paragraphs: [
          '펀딩 규칙은 특정 행동을 겨냥합니다. 가격보다 규칙의 명확성이 더 중요하다면 먼저 순위에서 **더 높은 점수를 받은 회사**와 비교해 보세요.',
        ],
        fit: {
          yes: [
            '평가 손실이 **작고 통제된** 경우',
            '거래를 **2분보다 훨씬 오래** 보유하는 경우',
            '**뉴스 급등락**에 의존하지 않는 경우',
            '**저렴한 진입**을 원하는 경우',
          ],
          no: [
            '**스캘퍼**',
            '**뉴스 트레이더**',
            '**큰 장중 드로다운**이 필요한 거래',
          ],
        },
      },
    ],
  },
  'prop-firm-sans-challenge': {
    intro: '챌린지 없는 프랍펌으로 시작하려면 시장과 정확한 프로그램을 고르고, 자격 요건을 확인하고, 펀딩 규칙을 읽고, 전체 수수료 부담을 계산하고, 손실 한도에 맞춰 전략을 테스트하세요. **평가를 건너뛴다고 출금 조건이 사라지지는 않습니다.** 계정은 모의 거래일 수 있으며, 첫 출금에는 여전히 적격 거래일, 수익 목표, 일관성 규칙이 필요할 수 있습니다.',
    sections: [
      {
        heading: '챌린지 없는 프랍펌으로 시작하는 방법',
        paragraphs: [
          '먼저 시장과 정확한 즉시 펀딩 프로그램을 고르세요. 챌린지 없는 계정은 펀딩 단계 전의 평가를 건너뜁니다. 그래도 모의 계정일 수 있고, 출금에는 수익 목표, 적격 거래일, 일관성, 심사가 필요할 수 있습니다. 계정을 사는 것과 출금 자격을 얻는 것은 별개의 단계입니다.',
          '구매 전에 이 체크리스트를 활용하세요. 광고된 계정 잔고가 크다고 그만큼 잃어도 되는 돈이 생기는 것은 아닙니다. 실제로 쓸 수 있는 여유는 일일 및 전체 손실 한도가 정합니다.',
        ],
        steps: [
          {
            title: '시장을 고르고 자격을 확인하세요',
            text: '허용된 상품, 플랫폼, 거래 시간을 본인 전략과 맞춰 보세요. 국가 제한, 본인 확인, 계약 법인명을 확인하세요.',
          },
          {
            title: '정확한 펀딩 계정 규칙을 읽으세요',
            text: '프로그램 이름, 계정 규모, 구매 날짜, 공식 규칙 페이지를 저장하세요. 일일 리셋 시간, 최대 손실 하한선, 드로다운 계산 방식, 금지 전략을 확인하세요.',
          },
          {
            title: '첫 출금까지의 경로를 적어 두세요',
            text: '적격 거래일, 수익 목표, 일관성, 최소 요청액, 출금 한도, 수익 배분을 기록하세요. 평가 없는 계정도 출금 전에 상당한 수익을 요구할 수 있습니다.',
          },
          {
            title: '전체 수수료 부담을 계산하세요',
            text: '해당되는 경우 진입, 활성화, 정기, 플랫폼, 데이터 수수료를 포함하세요. 환불 및 교체 조건을 읽고, 잃어도 감당할 수 있는 최대 총수수료를 정하세요.',
          },
          {
            title: '평소 거래를 그 한도에 대입해 테스트하세요',
            text: '체험 계정이나 거래 일지로 평가 손실, 수수료, 연패, 오버나이트 포지션을 점검하세요. 테스트는 명목 계정 잔고가 아니라 실제 프로그램 한도로 해야 합니다.',
          },
          {
            title: '설정을 마치고 두 손실 하한선을 모두 감시하세요',
            text: '결제와 필요한 본인 확인을 마친 뒤 대시보드가 계약 내용과 일치하는지 확인하세요. 매 세션 전에 현재 일일 하한선, 전체 하한선, 출금 자격을 기록해 두세요.',
          },
        ],
      },
      {
        heading: '즉시 펀딩이 대개 더 비싼 이유',
        paragraphs: [
          '회사는 평가를 필터로 보고 가격을 매깁니다. 챌린지 구매자의 상당수는 출금에 이르지 못하고, 그들의 수수료가 출금에 이르는 트레이더의 비용을 충당합니다. 필터를 건너뛰면 회사는 그 리스크를 계정 가격 자체에 반영합니다. 그래서 직접 계정은 대개 같은 규모 챌린지의 **몇 배 가격**이고, **규모는 더 작으며**, 드로다운도 **더 빡빡한** 경우가 많습니다.',
          '**첫 출금까지 드는 전체 비용**을 비교하세요. 단순한 숫자로 예를 들면, 통과 확률이 3분의 1인 $100 챌린지는 펀딩을 받기까지 **평균 약 $300**이 듭니다. 트레일링 드로다운이 빡빡한 $350 즉시 펀딩 계정은 첫 출금 전에 계정 하나만 잃어도 그보다 비용이 더 듭니다.',
        ],
      },
      {
        heading: '직접 계정이 가치 있는지를 정하는 규칙',
        paragraphs: [
          '마케팅 페이지가 아니라 펀딩 계정 약관을 읽으세요. 다음 여섯 가지가 수익 구조를 가장 자주 바꿉니다:',
        ],
        bulletStyle: 'check',
        bullets: [
          '**드로다운 유형:** 자산 고점을 따라가는 트레일링 드로다운은 시작 잔고에 고정된 고정 한도보다 훨씬 견디기 어렵습니다.',
          '**일관성 규칙:** 많은 즉시 펀딩 프로그램은 출금을 허용하기 전에 최고 수익일에서 나올 수 있는 수익 비중을 제한합니다.',
          '**첫 출금 조건:** 최소 거래일, 최소 수익, 첫 한두 번 출금의 한도.',
          '**시작 수익 배분:** 일부 프로그램은 챌린지 모델보다 낮게 시작해 나중에야 올라갑니다.',
          '**교체 비용:** 위반 후 새 계정의 비용과 할인 적용 여부.',
          '**제한된 전략:** 뉴스 시간대, 보유 기간, 카피 트레이딩, 최소 거래 시간.',
        ],
      },
      {
        heading: '챌린지 없는 프랍펌을 고려할 만한 사람',
        paragraphs: [
          '직접 펀딩은 **돈과 시간을 맞바꾸는 것**입니다. 수익 목표의 압박이 더 비싼 계정에서의 실시간 드로다운 압박으로 바뀝니다.',
        ],
        fit: {
          yes: [
            '**안정적이고 드로다운이 낮은** 전략',
            '**일일 한도를 지켜 온** 기록',
            '**비용보다 시간**을 중시하는 경우',
          ],
          no: [
            '**아직 테스트 중인** 전략',
            '여유가 필요한 **변동성 큰 스타일**',
            '주로 **수익 목표를 피하려고** 사는 경우',
          ],
        },
        callout: {
          kind: 'tip',
          text: '확신이 없나요? 직접 계정을 사기 전에 **저렴한 1단계 챌린지**가 본인 전략이 회사 규칙에 맞는지 시험하기에 더 나은 경우가 많습니다.',
        },
      },
      {
        heading: '즉시 펀딩 특유의 위험 신호',
        paragraphs: [
          '즉시 펀딩 프로그램은 팔기 쉬워서 신생 회사와 마케팅 중심 회사를 끌어들입니다. 다음을 경고 신호로 여기세요:',
        ],
        bulletStyle: 'flag',
        bullets: [
          '**매우 낮은 가격의 매우 큰 계정.**',
          '**공개된 출금 정책 없이** 하는 출금 약속.',
          '**홈페이지와 약관이 서로 다른** 규칙.',
          '회사가 이유를 밝히지 않고 **단독 재량으로** 출금을 거부할 수 있게 한 약관.',
        ],
        callout: {
          kind: 'tip',
          text: '구매 전에 해당 회사의 PropRadar 프로필을 열어 보세요. **법인, 출금 신호, 도메인, 규제 당국 경고**가 한 페이지에 있습니다.',
        },
      },
      {
        heading: '최근 두 가지 예시: 즉시 접근이 즉시 출금은 아닙니다',
        paragraphs: [
          '2026년 11월 15일에 확인한 공식 페이지는 정확한 플랜이 왜 중요한지 보여 줍니다. **Hyro Instant**는 평가를 건너뛰지만, 첫 출금에는 적격 거래일 3일, 배분 후 최소 $25의 수익, 출금 1회당 인정되는 수익 한도가 필요합니다.',
          '**Tradeify Lightning Funded**도 평가를 건너뜁니다. 공개된 $50,000 플랜은 첫 요청을 열기 위해 $3,000의 수익이 필요하며, 첫 요청은 트레이더의 90% 배분 전 기준으로 $2,000으로 제한됩니다. 일관성 규칙도 적용됩니다. 수익 목표는 출금 가능한 금액이 아닙니다.',
          '이 예시는 독립적으로 인증된 고객 지급이 아니라 공개된 규칙을 설명합니다. 새로 구매할 때 적용되는 조건은 현재 약관과 아래 출처 링크로 확인하세요.',
        ],
      },
    ],
  },
};

export default ko;
