import type { RulesMessages } from './en';

const rules: RulesMessages = {
  metaTitle: 'Regras das prop firms: drawdown, pagamentos e riscos de trading',
  metaDescription:
    'Compare as regras sensíveis das prop firms: drawdown, trading de notícias, pagamentos, consistência, EA, copy trading e estratégias proibidas.',
  schemaName: 'Auditorias de regras de prop firms',
  breadcrumb: 'Regras de trading',
  eyebrow: 'Auditoria aprofundada das regras',
  h1: 'As cláusulas que podem custar uma conta ou um pagamento.',
  lead: 'A PropRadar lê páginas de regras, centrais de ajuda e as condições dos produtos principais para isolar as cláusulas perigosas: drawdown, rollover, notícias, EA, copy trading, consistência, limites de pagamento e sanções.',
  reviewed: 'Página revisada em {date}. Cada auditoria mantém a sua própria data de verificação da fonte, visível.',
  statDeep: 'Auditorias aprofundadas',
  statClauses: 'Cláusulas extraídas ({critical} críticas)',
  statCompact: 'Empresas médias e pequenas ({critical} críticas)',
  statTracked: 'Empresas acompanhadas',
  coverageAria: 'Cobertura das auditorias de regras',
  statRuleFiles: 'Dossiês de regras',
  statPayoutSensitive: 'Dossiês sensíveis a pagamentos',
  statLegalWatch: 'Vigilância jurídica',
  statDeepSources: '5+ fontes',
  related: 'Guias relacionados:',
  relatedConsistency: 'Regra de consistência',
  relatedNews: 'Trading de notícias',
  statsAria: 'Estatísticas das regras',
  families: [
    { label: 'Conta encerrada', title: 'Drawdown e equity', text: 'O perigo real costuma ser a equity aberta, o rollover, os swaps e o reset do servidor.' },
    { label: 'Lucro removido', title: 'Notícias e rollover', text: 'Algumas plataformas permitem tecnicamente a operação, mas removem os ganhos ou a classificam como violação.' },
    { label: 'Conta bloqueada', title: 'EA, HFT, copy trading', text: 'Um EA permitido para gestão de risco pode continuar proibido se operar sozinho, copiar contas ou sobrecarregar o servidor.' },
    { label: 'Saque atrasado', title: 'Pagamentos e consistência', text: 'Regras do melhor dia, limites de pagamento, dias vencedores e ciclos de saque podem pesar mais do que a divisão de lucros anunciada.' },
  ],
  alertsEyebrow: 'Alertas para traders',
  alertsTitle: 'O que as páginas de marketing não dizem com clareza suficiente.',
  viewAudit: 'Ver a auditoria das fontes',
  proofAria: 'Provas da auditoria de regras de {name}',
  payoutChip: 'Pagamento {level}',
  legalChip: 'Jurídico {level}',
  sourceDeep: 'Fontes sólidas',
  sourceUsable: 'Fontes utilizáveis',
  sourceThin: 'Fontes escassas',
  sourceNone: 'Sem fontes',
  severity: { Faible: 'Baixo', Moyen: 'Médio', 'Élevé': 'Alto', Critique: 'Crítico' },
  proof: {
    'Source officielle lue': 'Fonte oficial lida',
    'Source officielle partielle': 'Fonte oficial parcial',
    'Source commerciale repérée': 'Página comercial identificada',
  },
  sourceChecked: 'Fonte verificada em {date}',
  compactEyebrow: 'Empresas médias e pequenas',
  compactTitle: 'A cauda longa está sendo lida empresa por empresa.',
  compactNote: 'Estes alertas curtos vêm de fontes oficiais ou de páginas de produto identificadas. Os dossiês parciais continuam marcados como tal de propósito.',
  fullEyebrow: 'Cobertura completa',
  fullTitle: 'Todas as outras prop firms continuam na fila de auditoria.',
  fullNote: 'A PropRadar mantém as empresas menores visíveis para evitar pontos cegos: fonte identificada, arquivo de risco ou dossiê ainda por documentar.',
  showQueue: 'Mostrar as {count} empresas que continuam na fila de auditoria',
  productToIdentify: 'Produto a identificar',
  mainProductToIdentify: 'Produto principal a identificar',
  coverageArchive: 'Arquivo de risco',
  coverageMulti: 'Dossiê multifonte',
  coverageSpotted: 'Fonte identificada',
  coverageToSource: 'A documentar',
  nextEyebrow: 'Próxima análise',
  nextTitle: 'Os próximos produtos principais a detalhar.',
  colDrawdown: 'Drawdown',
  colNews: 'Notícias',
  colEa: 'EA',
  colPayout: 'Pagamento',
  colScore: 'Pontuação',
  scoreAria: 'Pontuação PropRadar {score} de 100',
  matrixEyebrow: 'Matriz rápida',
  matrixTitle: 'Empresas ativas ordenadas por risco de pagamento.',
  showMatrix: 'Mostrar as {count} empresas ativas por risco de pagamento',
  scoreLine: 'pontuação {score}/100',
  audits: {
    ftmo: {
      headline: 'O principal risco vem dos cálculos de equity e das práticas proibidas.',
      verdict:
        'A FTMO é clara, mas as suas regras são rígidas: perda diária calculada sobre a equity, drawdown móvel de fim de dia no 1-Step, uma Best Day Rule e amplas restrições a gap trading, HFT, contas ligadas e contornos.',
      clauses: [
        {
          title: 'A perda diária inclui a equity aberta',
          finding: 'A perda diária inclui o saldo, as posições abertas, os swaps e as comissões. Uma posição flutuante pode violar a regra antes de ser fechada.',
          impact: 'Nunca acompanhe só o saldo. Um pavio, um alargamento do spread ou um swap podem bastar para perder a conta.',
        },
        {
          title: 'Best Day / regra de consistência no 1-Step e na FTMO Account',
          finding:
            'Nas contas de pedidos feitos antes de 12 de outubro de 2026, o melhor dia não pode passar de 50% dos lucros positivos. Os novos pedidos 1-Step usam uma regra de consistência que compara o melhor dia com o lucro total, incluindo os dias de perda. Nenhuma das duas é uma violação, mas ambas podem bloquear o avanço ou uma recompensa até a proporção ser corrigida.',
          impact: 'Uma única grande operação vencedora pode obrigar você a continuar operando para desbloquear a conta, ou seja, a assumir mais risco.',
        },
        {
          title: 'Cláusulas amplas de práticas proibidas',
          finding:
            'Gap trading, latência, velocidade ultra-alta, contas coordenadas, rotação de contas, apostas num só sentido e EA hiperativos podem levar a desclassificação, operações removidas, recompensas perdidas ou rescisão.',
          impact: 'Estratégias para "burlar" o desafio e montagens multicontas copiadas são o verdadeiro perigo, mesmo quando a pontuação pública é excelente.',
        },
      ],
    },
    the5ers: {
      headline: 'O drawdown diário é mais enganoso do que parece.',
      verdict:
        'O The5ers High Stakes parece limpo no papel, mas o drawdown diário usa o maior valor entre o saldo e a equity do dia anterior. Uma operação mantida durante o rollover pode reduzir muito a margem disponível.',
      clauses: [
        {
          title: 'O drawdown diário usa o maior valor entre saldo e equity',
          finding: 'O drawdown diário de 5% é definido à meia-noite do servidor a partir da equity ou do saldo de fechamento do dia anterior, o que for maior.',
          impact: 'Terminar o dia com equity alta eleva o limite do dia seguinte. Uma posição mantida pode encerrar a conta antes do esperado.',
        },
        {
          title: 'Regra de inatividade de 30 dias',
          finding: 'As contas expiram após mais de 30 dias seguidos sem atividade de trading, contados a partir do cadastro.',
          impact: 'Um desafio comprado para depois pode virar uma perda total se ficar sem uso.',
        },
        {
          title: 'Pagamento a cada duas semanas',
          finding: 'Depois de atingir o status financiado, os saques ficam disponíveis no painel a cada duas semanas.',
          impact: 'O fluxo de caixa não é imediato: não compare apenas a divisão e o preço do desafio.',
        },
      ],
    },
    fundednext: {
      headline: 'Várias regras antiabuso podem remover lucros antes do encerramento da conta.',
      verdict:
        'A FundedNext é bem documentada, mas os seus limites antiabuso são extensos: teto de risco, teto de margem, quick strike, hiperatividade, trading de liquidação, copy trading e hedge entre contas.',
      clauses: [
        {
          title: 'Risco máximo de 3% e margem limitada a 70%',
          finding:
            'A FundedNext limita o risco a 3% a todo momento e a margem acumulada a 70%. Uma primeira violação pode gerar um aviso e a remoção dos lucros ligados à operação.',
          impact: 'Os lucros podem ser removidos quando o tamanho da posição sai do quadro, mesmo sem encerramento imediato da conta.',
        },
        {
          title: 'Quick Strike e operações com menos de 30 segundos',
          finding:
            'As operações fechadas em menos de 30 segundos são monitoradas. A partir de 30% de lucro em Quick Strike, a conta financiada pode ser encerrada e os lucros afetados removidos.',
          impact: 'Um scalping ultracurto pode transformar um bom desempenho num pagamento recusado.',
        },
        {
          title: 'Hiperatividade acumulada entre contas',
          finding:
            'Duzentas operações ou 2.000 mensagens ao servidor por dia geram avisos; 15.000 mensagens podem desativar a conta. Os avisos podem se acumular entre contas.',
          impact: 'Um EA ou uma gestão de ordens ativa demais pode custar a conta, mesmo sem má intenção.',
        },
      ],
    },
    topstep: {
      headline: 'As principais armadilhas são a consistência, os limites de pagamento e os cinco dias vencedores.',
      verdict: 'A Topstep é consolidada e clara, mas o avanço e os saques dependem de mais do que o lucro bruto.',
      clauses: [
        {
          title: 'Meta de consistência de 50%',
          finding: 'O melhor dia precisa ficar abaixo de 50% da meta de lucro. Se passar, a meta aumenta, e as perdas não zeram o melhor dia.',
          impact: 'Um único grande dia vencedor pode atrasar o status financiado mesmo depois de atingir o valor da meta.',
        },
        {
          title: 'Limites de pagamento da XFA',
          finding:
            'Os saques da Express Funded Account são limitados por pedido e por tamanho de conta. O limite pode depender do caminho padrão ou de consistência e da opção DLL.',
          impact: 'Um lucro grande não garante um saque imediato do mesmo valor.',
        },
        {
          title: 'Política de perfil único',
          finding: 'Todas as contas devem ficar sob um único perfil Topstep. Vários perfis podem levar ao encerramento ou à suspensão.',
          impact: 'Uma conta duplicada ou um erro de cadastro pode se tornar um risco operacional real.',
        },
      ],
    },
    'apex-trader-funding': {
      headline: 'A Apex mudou muito a sua oferta: separe as contas antigas das novas.',
      verdict:
        'A nova oferta da Apex destaca drawdown de fim de dia, nenhuma recusa de pagamento, consistência de 50% e nenhuma cobrança recorrente nos novos produtos. As contas antigas continuam sendo um sistema à parte.',
      clauses: [
        {
          title: 'Novos produtos e contas antigas',
          finding: 'A Apex informa que as contas antigas não são mais vendidas, não são alteradas retroativamente e podem continuar com cobrança recorrente até o cancelamento.',
          impact: 'Antes de comparar avaliações ou descontos da Apex, veja se a fonte trata de um produto antigo ou atual.',
        },
        {
          title: '5 dias de trading entre recompensas',
          finding: 'A página oficial destaca cinco dias de trading para pagamentos e recompensas no caminho atual.',
          impact: 'Mesmo avançando rápido, a velocidade de saque depende do ciclo de dias de trading.',
        },
        {
          title: 'Consistência de 50%',
          finding: 'A nova oferta mostra uma regra de consistência de 50%.',
          impact: 'Um único dia grande pode limitar o saque ou o avanço, conforme a conta usada.',
        },
      ],
    },
    'e8-markets': {
      headline: 'A E8 é muito detalhada, mas algumas regras removem lucros sem encerrar a conta.',
      verdict:
        'A E8 Markets documenta drawdown diário, tetos de lucro, notícias, HFT, EA e regras do melhor dia. O principal risco para o trader é o lucro removido no rollover ou no pagamento.',
      clauses: [
        {
          title: 'Drawdown diário com encerramento definitivo',
          finding:
            'O drawdown diário é um valor fixo baseado no saldo inicial. Se a equity ou o saldo tocarem o nível de perda, a conta é encerrada definitivamente, mesmo que o fechamento técnico termine acima.',
          impact: 'O fechamento final pode parecer acima do limite enquanto a conta já está perdida, porque prevalece a violação registrada no servidor.',
        },
        {
          title: 'Teto de lucro diário de 2%',
          finding:
            'Na E8 Pro, os lucros acima do teto diário não contam e são removidos depois do rollover. Tentativas de contornar isso com hedge ou fechamentos parciais podem ser agrupadas.',
          impact: 'Um dia excepcional pode ser parcialmente retirado do resultado válido.',
        },
        {
          title: 'Trading de notícias nas contas Performance da E8 One',
          finding:
            'Nas contas performance da E8 One, abrir, fechar ou alterar SL/TP até cinco minutos de uma notícia de alto impacto é proibido, e os lucros podem ser removidos.',
          impact: 'A plataforma pode permitir a ação tecnicamente, enquanto o lucro é removido depois, no pagamento.',
        },
      ],
    },
    'funding-pips': {
      headline: 'As violações costumam vir da equity, do rollover e do alargamento do spread.',
      verdict:
        'A FundingPips deixa claro que os limites são monitorados no servidor em tempo real. Os erros mais caros envolvem stops apertados, o rollover das 17h de Nova York e posições abertas durante notícias.',
      clauses: [
        {
          title: 'Monitoramento da equity em tempo real',
          finding: 'As perdas diária e máxima monitoram a equity ao vivo. Vale o registro do servidor, mesmo quando o terminal ou o painel estão atrasados.',
          impact: 'Uma posição flutuante pode encerrar a conta antes que a tela local mostre a violação.',
        },
        {
          title: 'Rollover às 17h de Nova York',
          finding: 'A FundingPips avisa que os spreads podem se alargar muito às 17h de Nova York, acionando stops e violações.',
          impact: 'Um stop que parece seguro num gráfico Bid pode ser atingido pelo Ask durante o rollover.',
        },
        {
          title: 'O pedido de recompensa exige operações fechadas',
          finding: 'O ciclo de recompensa exige fechar as posições, esperar 15 minutos e depois pedir a divisão.',
          impact: 'Posições abertas e taxas de pernoite podem reduzir a margem de segurança no pior momento.',
        },
      ],
    },
    'alpha-capital-group': {
      headline: 'O principal perigo: restrições a notícias, EA não aprovados e regras contra jogo.',
      verdict:
        'A Alpha Capital permite alguns usos, mas as regras após a qualificação são sensíveis quanto a janelas de notícias, IPs, EA pré-aprovados e comportamentos classificados como jogo.',
      clauses: [
        {
          title: 'Notícias: abertura e fechamento restritos conforme o plano',
          finding:
            'Após a qualificação, alguns planos proíbem abrir ou fechar dois ou cinco minutos em torno de notícias de alto impacto. Até um TP ou SL acionado na janela pode ser uma violação leve.',
          impact: 'Uma posição pode ser mantida de forma legítima enquanto um take profit atingido na hora errada torna o lucro inválido.',
        },
        {
          title: 'EA limitados à gestão de risco',
          finding: 'EA autônomos, bots de terceiros, HFT, arbitragem de latência ou EA compartilhados que geram operações idênticas podem encerrar a conta.',
          impact: 'Um EA permitido não significa trading automatizado sem limites. Confirme o uso, a plataforma e as exigências de pré-aprovação.',
        },
        {
          title: 'Restrições de IP e de domicílio',
          finding: 'O mesmo domicílio, vários IPs, uso não declarado de VPN/VPS ou mudanças de localização incoerentes podem gerar uma violação ou uma revisão de segurança.',
          impact: 'Uma viagem, uma moradia compartilhada, outro trader na família ou um VPS mal declarado podem virar um problema de conformidade.',
        },
      ],
    },
  },
  compact: {
    'funding-traders': {
      riskFamily: 'Pagamento + consistência',
      signal:
        'As tabelas mostram perdas diárias, perdas máximas, risco por operação, consistência e calendários de pagamento diferentes para Instant Funded, 1-Step e 2-Step.',
      impact:
        'Antes de comprar, compare mais do que o preço: confirme o produto exato, o ciclo de pagamento de 14 ou 21 dias e a pontuação de consistência que pode bloquear um saque.',
    },
    'maven-trading': {
      riskFamily: 'Drawdown + reembolso',
      signal:
        'A página oficial separa perda diária, perda máxima, metas de lucro e frequência de pagamento, e informa que algumas taxas são reembolsáveis no terceiro saque.',
      impact: 'O custo real depende de quantos pagamentos forem obtidos. Um preço de entrada baixo pode valer pouco quando o programa escolhido deixa pouca margem de drawdown.',
    },
    fxify: {
      riskFamily: 'Drawdown diário',
      signal: 'O drawdown diário pode se basear no saldo de fim de dia anterior. O primeiro pagamento é apresentado como sob demanda, seguido de saques quinzenais.',
      impact: 'Uma posição mantida durante o reset pode reduzir a margem do dia seguinte. Verifique também os complementos que mudam a divisão, o pagamento e a alavancagem.',
    },
    'instant-funding': {
      riskFamily: 'Smart drawdown + prazo de pagamento',
      signal: 'No Instant Funding, o smart drawdown trava depois de um lucro. No IF1, a conta dura 24 horas e a melhor operação não pode representar uma parte grande demais do lucro total.',
      impact: 'Instantâneo nem sempre significa pagamento imediato: alguns produtos exigem 14 dias, um limite de lucro ou uma regra de consistência.',
    },
    'trade-the-pool': {
      riskFamily: 'Ações + lucro válido',
      signal:
        'As regras incluem volume máximo por minuto num instrumento, proporções de lucro por posição, número mínimo de posições, mínimos de pagamento e revisões de risco/KYC.',
      impact: 'Em ações, o drawdown não é o único perigo: uma operação grande demais numa small cap ou um lucro concentrado podem ser invalidados.',
    },
    'funded-trading-plus': {
      riskFamily: 'High-water mark',
      signal: 'O drawdown diário pode usar o maior valor entre saldo e equity no reset. Em alguns cálculos, os saques não reduzem o high-water mark.',
      impact: 'Um saque pode parecer proteger a conta enquanto o limite de drawdown continua ancorado mais alto.',
    },
    'goat-funded-trader': {
      riskFamily: 'Notícias + tetos de recompensa',
      signal: 'Operações abertas ou fechadas até cinco minutos de notícias de alto impacto podem ter o lucro limitado. As contas financiadas também têm limites de saque iniciais.',
      impact: 'O trading de notícias pode ser permitido enquanto os ganhos são limitados. Leia a cláusula de remoção de lucros, não só a indicação "notícias permitidas".',
    },
    'audacity-capital': {
      riskFamily: 'Regras permissivas a confirmar',
      signal:
        'A página anuncia período de trading ilimitado, perda diária máxima, perda máxima, pagamento no mesmo dia e permissão para notícias, fim de semana, EA e copy trading.',
      impact: 'Quando uma página parece muito permissiva, verifique no painel e nas condições as definições exatas de EA, copy trading e pagamento no mesmo dia.',
    },
    fintokei: {
      riskFamily: 'Risco aberto + limite de pagamento',
      signal: 'O SwiftTrader indica a perda diária, a perda máxima, o risco máximo permitido em operações abertas e o lucro mínimo por pagamento.',
      impact: 'Mesmo com pagamentos rápidos, a regra de risco aberto máximo pode bloquear estratégias com várias posições ou martingales disfarçados.',
    },
    'hantec-trader': {
      riskFamily: 'Drawdown estático sobre o saldo',
      signal:
        'A tabela oficial indica, para cada fase, drawdown estático sobre o saldo, perda diária, perda total máxima, frequência de recompensas e dias mínimos de trading.',
      impact: 'A palavra estático não basta: verifique se o limite usa o saldo, a equity ou ambos no momento da violação.',
    },
    'oneup-trader': {
      riskFamily: 'Drawdown móvel + consistência',
      signal:
        'Não há perda diária indicada, mas valem um drawdown móvel, pelo menos 10 dias de trading e uma consistência: os outros três melhores dias devem somar pelo menos 80% do maior dia.',
      impact: 'Sem perda diária, as principais armadilhas passam a ser o drawdown móvel e concentrar o lucro numa única sessão.',
    },
    earn2trade: {
      riskFamily: 'Futuros + taxa de aprovação',
      signal:
        'A Earn2Trade publica métricas pouco comuns: taxa de aprovação, proporção de contas live e live-sim, saques semanais a partir de US$ 100 e mercados só de futuros.',
      impact: 'É mais transparente do que muitos concorrentes, mas a taxa de aprovação mostra que o produto é uma avaliação difícil, não uma renda comprada.',
    },
    'take-profit-trader': {
      riskFamily: 'Pagamento PRO + taxa da conta',
      signal:
        'O site destaca saques PRO desde o primeiro dia, divisão de 80/20 e depois 90/10 no PRO+, uma taxa PRO única e uma passagem para o real no PRO+ com as mesmas regras de risco.',
      impact: 'Pagamentos rápidos são atraentes, mas verifique o caminho de Test para PRO e para PRO+, a taxa e o drawdown exato no real.',
    },
    brightfunded: {
      riskFamily: 'Marketing de pagamentos',
      signal: 'A página anuncia pagamentos a partir de sete dias após a primeira operação financiada e divisão de até 100%, sujeita a condições.',
      impact: 'Leia as condições com cuidado: "até" muitas vezes depende do plano, dos complementos, do ciclo e das regras de consistência.',
    },
    'aqua-funded': {
      riskFamily: 'Financiamento instantâneo',
      signal: 'A fonte oficial destaca o financiamento instantâneo e uma divisão alta, mas cada página de produto precisa ser revisada plano a plano.',
      impact: 'Trate a promessa de instantâneo como uma afirmação a verificar: ciclos de pagamento, drawdown, reembolsos e regras de notícias podem mudar conforme a conta.',
    },
    'blue-guardian': {
      riskFamily: 'Processo estruturado',
      signal: 'O site destaca avaliações com regras transparentes, disciplina, gestão de risco e pagamentos rápidos.',
      impact: 'Antes de comprar, verifique a página de regras exata sobre drawdown, notícias, mínimos de pagamento e condições do financiamento instantâneo.',
    },
    'breakout-prop': {
      riskFamily: 'Liquidez cripto',
      signal: 'A Breakout é voltada para cripto: releia a fonte oficial sobre spread, liquidez, regras das corretoras, liquidação e horários próprios do mercado.',
      impact: 'Uma prop firm de cripto não deve ser julgada como uma de forex: pavios, slippage e risco de liquidação precisam estar visíveis antes do pagamento.',
    },
    'the-trading-pit': {
      riskFamily: 'Multiativos',
      signal: 'A cobertura oficial é multiativos. Separe as regras por classe de ativo, porque os desafios de futuros e de CFD não têm os mesmos riscos.',
      impact: 'Não transfira uma regra de um produto para outro: drawdown, plataformas, taxas e horários de trading podem variar muito.',
    },
    'finotive-funding': {
      riskFamily: 'Instantâneo + desafio',
      signal:
        'A fonte oficial está identificada, mas a página do produto precisa confirmar as cláusulas detalhadas de perda diária, perda máxima, reembolsos, pagamentos e restrições de trading.',
      impact: 'Nada de compra sem leitura final enquanto as condições específicas do produto não estiverem registradas no dossiê da PropRadar.',
    },
    myfundedfutures: {
      riskFamily: 'Pagamento de futuros',
      signal:
        'A fonte oficial está identificada, mas os parâmetros detalhados de pagamento, ativação, drawdown e consistência precisam ser confirmados na central de ajuda ou no checkout.',
      impact: 'Não compre só pelo preço mensal: as taxas da conta financiada, o calendário de pagamentos e o drawdown móvel determinam o custo real.',
    },
    bulenox: {
      riskFamily: 'Drawdown móvel em futuros',
      signal: 'A fonte oficial está identificada, mas o dossiê ainda precisa das taxas de ativação exatas, do drawdown móvel, dos mínimos de pagamento e das regras de contratos.',
      impact: 'Continua na fila de auditoria de futuros: os custos e limites depois do status financiado importam mais do que o preço da avaliação.',
    },
  },
};

export default rules;
