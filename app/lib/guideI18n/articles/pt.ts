import type { GuideArticleTranslations } from '../types';

/** Portuguese (Brazil) translations of the long guide articles (same section order as the English ones). */
const pt: GuideArticleTranslations = {
  'prop-firm-sans-challenge': {
    intro: 'Uma prop firm sem challenge vende uma conta financiada diretamente, sem a fase de avaliação clássica. Parece um atalho. Na prática você paga mais adiantado para pular o teste, e as regras que você encontraria no challenge passam para a conta financiada, onde um erro custa a conta em vez de uma nova tentativa.',
    sections: [
      {
        heading: 'O que "sem challenge" realmente significa',
        paragraphs: [
          'No modelo clássico você paga uma taxa, bate uma meta de lucro dentro de um limite de perda diária e de um drawdown máximo, às vezes em duas fases, e só então opera uma conta financiada que pode pagar. Um programa sem challenge, muitas vezes chamado de financiamento instantâneo ou direto, elimina esse primeiro passo: você compra a conta financiada e pode pedir pagamentos quando as condições dela forem cumpridas.',
          'O que desaparece é a meta de lucro antes do financiamento. O que não desaparece é o controle de risco. Contas instantâneas quase sempre mantêm um drawdown máximo, muitas vezes móvel, e muitas acrescentam uma regra de consistência, um mínimo de dias de operação ou um teto menor no primeiro pagamento. A empresa ainda precisa filtrar os traders; ela só faz isso depois que você pagou.',
        ],
      },
      {
        heading: 'Por que o financiamento instantâneo costuma custar mais',
        paragraphs: [
          'As empresas precificam a avaliação como um filtro: boa parte de quem compra um challenge nunca chega a um pagamento, e essas taxas financiam os traders que chegam. Se você pula o filtro, a empresa embute esse risco no preço da conta. Por isso uma conta direta costuma custar várias vezes um challenge do mesmo tamanho, as contas são menores e o drawdown costuma ser mais apertado.',
          'Compare o custo total até o primeiro pagamento, não o preço de vitrine. Um exemplo com números redondos: um challenge de US$ 100 com uma chance em três de passar custa em média cerca de US$ 300 até o financiamento. Uma conta instantânea de US$ 350 com trailing drawdown apertado pode custar mais se você perder uma ou duas contas antes do primeiro pagamento. A opção mais barata depende de quantas vezes sua estratégia sobreviveria às regras da conta financiada.',
        ],
      },
      {
        heading: 'As regras que decidem se uma conta direta vale a pena',
        paragraphs: ['Leia os termos da conta financiada, não a página de marketing. Estes são os pontos que mais mudam a conta:'],
        bullets: [
          'Tipo de drawdown: um trailing drawdown que acompanha seu pico de equity é muito mais difícil de administrar do que um limite estático fixado no saldo inicial.',
          'Regra de consistência: muitos programas instantâneos limitam quanto do lucro pode vir do melhor dia antes de liberar um pagamento.',
          'Condições do primeiro pagamento: dias mínimos de operação, lucro mínimo e tetos nos primeiros um ou dois saques.',
          'Divisão inicial: alguns programas começam abaixo dos modelos com challenge e só sobem depois.',
          'Custo de reposição: quanto custa uma nova conta após uma violação e se há desconto.',
          'Estratégias restritas: janelas de notícias, tempo de permanência, copy trading e duração mínima das operações.',
        ],
      },
      {
        heading: 'Quem deveria considerar uma prop firm sem challenge',
        paragraphs: [
          'O financiamento direto faz mais sentido para um trader com estratégia estável e de baixo drawdown, que respeita limites diários com consistência e valoriza mais o tempo do que o custo. Faz menos sentido para quem ainda está testando uma estratégia, para um estilo muito volátil que precisa de espaço, ou para quem compra principalmente para fugir da pressão de uma meta de lucro: essa pressão é substituída pela de um drawdown ao vivo numa conta que custou mais.',
          'Na dúvida, um challenge 1-Step barato costuma ser o melhor teste para saber se sua estratégia combina com as regras de uma empresa antes de se comprometer com uma conta direta mais cara.',
        ],
      },
      {
        heading: 'Sinais de alerta típicos do financiamento instantâneo',
        paragraphs: [
          'Programas instantâneos atraem empresas novas e muito voltadas ao marketing, porque são fáceis de vender. Trate como sinais de alerta: contas muito grandes a preços muito baixos, promessas de pagamento sem política de pagamento publicada, regras que mudam entre a página inicial e os termos, e termos que permitem à empresa negar pagamentos a seu exclusivo critério sem motivo declarado. Antes de comprar, confira no perfil do PropRadar a entidade jurídica, os sinais de pagamento e qualquer alerta de domínio ou de regulador.',
        ],
      },
    ],
  },
  'prop-firm-sans-consistency-rule': {
    intro: 'Uma regra de consistência limita quanto do seu lucro total pode vir de um único dia. Ela existe porque um dia de sorte, uma posição grande demais ou um pico de notícia pode gerar um pagamento que não diz nada sobre sua capacidade de operar a conta ao longo do tempo. Entender a fórmula exata importa mais do que encontrar uma empresa que diz não ter a regra.',
    sections: [
      {
        heading: 'Como a regra é calculada',
        paragraphs: [
          'A maioria das empresas usa a mesma fórmula básica: lucro do melhor dia dividido pelo lucro total, em porcentagem. Se o resultado passar do limite da empresa, você ainda não está elegível, seja para passar na avaliação ou para pedir um pagamento, dependendo de onde a regra se aplica.',
          'Exemplo com limite de 50%: você ganha US$ 1.200 na segunda, US$ 300 na terça e US$ 500 na quarta, US$ 2.000 no total. Seu melhor dia é US$ 1.200, ou 60% do total. Você está acima do limite. Para resolver, não precisa perder nada: precisa de mais lucro total, aqui pelo menos US$ 2.400, para que US$ 1.200 represente 50% ou menos.',
          'Algumas empresas aplicam a regra de outro jeito. A Topstep, por exemplo, aumenta a meta de lucro no Trading Combine em vez de reprovar você: se o melhor dia passar de 55% da meta, a meta sobe para melhor dia dividido por 0,55 (central de ajuda da Topstep, página de 17 de setembro de 2026).',
        ],
      },
      {
        heading: 'Onde a regra se aplica: avaliação, pagamento ou ambos',
        paragraphs: [
          'A mesma porcentagem pode significar coisas muito diferentes. Uma regra de consistência na avaliação só atrasa a aprovação. Uma regra de consistência nos pagamentos pode bloquear um saque depois que você já ganhou dinheiro numa conta financiada, o que é bem mais frustrante. Algumas empresas também usam limites diferentes por fase: a Topstep usa 55% no Combine e 40% no caminho de pagamento Consistency da sua Express Funded Account.',
          'A FTMO mudou sua regra em 12 de outubro de 2026: novos pedidos do 1-Step Challenge usam uma regra de consistência que compara o melhor dia com o lucro total, incluindo dias negativos, enquanto contas de pedidos anteriores mantêm a antiga Best Day Rule, que só contava dias positivos. Segundo a FTMO, se você não cumprir o requisito, simplesmente continua operando até cumprir (atualização de trading da FTMO de 8 de outubro de 2026). O PropRadar não registrou uma regra percentual de melhor dia no programa High Stakes da The5ers. Confirme sempre a fase, o produto e a data do pedido.',
        ],
      },
      {
        heading: 'Uma empresa sem regra de consistência é melhor?',
        paragraphs: [
          'Não automaticamente. Empresas que eliminam a regra de consistência costumam controlar o risco de outro jeito: limites de perda diária mais apertados, trailing drawdowns, tetos nos primeiros pagamentos, dias mínimos de operação ou limites de tamanho de posição. Uma chamada "sem regra de consistência" pode esconder uma conta financiada mais difícil de manter.',
          'A regra prejudica principalmente traders cujos resultados vêm em rajadas: traders de notícias, swing traders que fecham uma grande posição ou quem aumenta a mão depois de uma sequência de perdas. Se seus resultados diários são bem regulares, um limite de 40 a 50% raramente pesa. Se você costuma fazer a maior parte da semana em uma sessão, procure programas sem a regra e compare o que a substitui.',
        ],
      },
      {
        heading: 'Como operar tranquilo com uma regra de consistência',
        paragraphs: [
          'Acompanhe o cálculo de melhor dia dividido pelo lucro total e saiba, antes de cada sessão, quanto pode ganhar sem passar do limite. Se tiver um dia muito bom no começo, planeje vários dias positivos menores em vez de tentar repeti-lo. E evite aumentar a mão perto do fim de uma avaliação: um único dia vencedor grande demais pode atrasar a aprovação tanto quanto um dia de perda.',
        ],
      },
    ],
  },
  'meilleure-prop-firm-2026': {
    intro: 'Não existe uma única melhor prop firm. Existe a melhor empresa para o seu mercado, o seu estilo de trading e o risco que você aceita do próprio operador. Este ranking começa por esse último ponto: antes de comparar divisões de lucro e descontos, verifica se a empresa provavelmente ainda vai existir, e pagar, quando você precisar.',
    sections: [
      {
        heading: 'Como este ranking é montado',
        paragraphs: [
          'Cada empresa no PropRadar recebe uma pontuação de 0 a 100 baseada em clareza das regras, provas de pagamento, transparência jurídica, sinais públicos de avaliações e histórico de operação. Links de afiliado são informados em todos os perfis e nunca mudam uma pontuação. Uma empresa afiliada continua com seus pontos fracos à mostra, e uma empresa sem afiliação pode ficar no topo.',
          'Nesta atualização as maiores pontuações são de operadores antigos: FTMO (91/100), The5ers (85/100) e Topstep (84/100). Não são os mais baratos. São os perfis com o histórico público mais longo, os termos mais legíveis e menos sinais de pagamento pendentes nos arquivos do PropRadar.',
        ],
      },
      {
        heading: 'Comece pelo seu mercado',
        paragraphs: [
          'Traders de forex e CFD e traders de futuros não compram no mesmo mercado. Empresas de forex/CFD como FTMO e The5ers usam plataformas como MT5 ou cTrader com limites em porcentagem. Empresas de futuros como a Topstep usam plataformas de futuros com limites em dólar e, muitas vezes, drawdowns móveis. Uma ótima empresa de futuros não serve para um trader de forex, então filtre primeiro pelo mercado.',
        ],
      },
      {
        heading: 'Depois ajuste as regras ao seu estilo',
        paragraphs: [
          'As regras que encerram a maioria das contas não são as metas de lucro, e sim o tipo de drawdown, o limite de perda diária, as regras de consistência, as restrições de notícias e as regras de permanência. Um scalper precisa de execução rápida e nenhuma duração mínima de operação. Um swing trader precisa manter posições overnight e no fim de semana. Um trader de notícias precisa de uma empresa que permita operar dados de alto impacto na conta financiada, não só na avaliação.',
        ],
        bullets: [
          'Drawdown: limites estáticos são mais fáceis de administrar do que os móveis.',
          'Consistência: veja se vale para a avaliação, para os pagamentos ou para ambos.',
          'Notícias e permanência: confirme as regras da conta financiada, que costumam ser mais rígidas.',
          'Pagamentos: frequência, valor mínimo, tetos do primeiro pagamento e taxas.',
        ],
      },
      {
        heading: 'Por fim, compare o custo real',
        paragraphs: [
          'O custo real de uma prop firm é o dinheiro gasto antes do primeiro pagamento: taxas de challenge, resets, taxas de ativação e contas de reposição, menos eventuais reembolsos. Um challenge barato com drawdown duro pode custar mais do que um caro que você provavelmente vai passar. Cupons de desconto contam por último, quando a empresa já passou por todos os outros filtros.',
        ],
      },
      {
        heading: 'O que faria uma empresa cair neste ranking',
        paragraphs: [
          'As pontuações mudam quando as provas mudam: um alerta de regulador, atrasos repetidos de pagamento, uma mudança de regra aplicada a contas existentes, um domínio que deixa de servir a empresa ou menos transparência sobre a entidade jurídica. Cada mudança é datada no histórico da empresa, para você ver por que e quando uma pontuação mudou.',
        ],
      },
    ],
  },
  'goat-funded-trader-avis': {
    intro: 'A GOAT Funded Trader é uma das prop firms mais visíveis dos últimos dois anos: descontos agressivos, muitos modelos e presença constante nas redes sociais. Visibilidade não é o mesmo que confiabilidade. Esta análise separa o que está documentado do que é marketing e coloca primeiro as regras da conta financiada, porque é ali que os traders perdem pagamentos.',
    sections: [
      {
        heading: 'Quem está por trás da GOAT Funded Trader',
        paragraphs: [
          'A GOAT Funded Trader foi lançada em maio de 2023. É um nome comercial da Wishes Tower International Limited, empresa de Hong Kong, e o trading simulado é fornecido pela Goat Funded LTD em Santa Lúcia. Nenhum regulador financeiro supervisiona o serviço. Os termos descrevem contas simuladas, compras não reembolsáveis e ampla margem de decisão sobre pagamentos, algo comum no setor, mas que vale saber antes de comprar.',
          'O PropRadar lhe dá 68/100 e a mantém em vigilância: a marca é real e paga traders, mas o histórico é curto e as condições de pagamento deixam muito espaço para interpretação. O PropRadar tem uma relação de afiliado com a GOAT Funded Trader; isso não muda esta pontuação nem esta análise.',
        ],
      },
      {
        heading: 'A situação no Trustpilot',
        paragraphs: [
          'Em 23 de outubro de 2026, o Trustpilot não exibia nenhum TrustScore para a empresa. O perfil informa que a nota está indisponível por violação das diretrizes e que o Trustpilot removeu várias avaliações falsas. O perfil ainda lista 4.352 avaliações, bem divididas: 46% com cinco estrelas e 40% com uma estrela.',
          'Trate com cautela as afirmações da página inicial sobre uma nota quase perfeita enquanto esse aviso estiver lá. Um perfil de avaliações polarizado costuma indicar duas experiências muito diferentes: traders que receberam rápido e traders que tiveram pagamentos negados por regras que não tinham lido com atenção.',
        ],
      },
      {
        heading: 'As regras da conta financiada que mais importam',
        paragraphs: [
          'Os modelos de challenge são convencionais. O modelo 2-Step GOAT pede 8% e depois 6% com perda diária de 4% e perda máxima estática de 10%; o 2-Step Standard pede 10% e depois 5% com 5% diário e 10% máximo; o 1-Step pede 10% com perda diária de 3% e perda máxima estática de 6%. O modelo 3-Step foi descontinuado em agosto de 2026. Esses números vêm de uma análise de terceiros verificada em 5 de outubro de 2026: confirme no checkout.',
          'As regras que decidem os pagamentos começam depois da aprovação:',
        ],
        bullets: [
          'Goat Guard: nas contas financiadas 1-Step e 2-Step, uma perda flutuante de 2% do saldo inicial reduz sua divisão para 50%; um segundo acionamento viola a conta.',
          'Regra dos 2 minutos: o lucro de operações mantidas por menos de dois minutos é removido no pagamento, enquanto as perdas dessas operações ficam na conta.',
          'Janela de notícias: o lucro obtido em torno de notícias de alto impacto é limitado a 1% do saldo inicial.',
          'Teto de lucro diário: uma conta financiada pode registrar no máximo US$ 3.000 de lucro por dia.',
          'Os modelos instantâneos usam trailing drawdowns e encerram a conta com perda flutuante de 1% ou 2%, conforme o modelo.',
        ],
      },
      {
        heading: 'Pagamentos',
        paragraphs: [
          'A divisão padrão é de 80%, com upgrade pago para 100% no checkout e um plano de escala que pode elevá-la a 90-95%. A maioria dos modelos paga a cada 14 dias, com mínimo de US$ 100 e taxa de processamento de 3%. Os dois primeiros pagamentos têm teto no menor valor entre 6% do saldo inicial e US$ 10.000. Os métodos de pagamento incluem Rise, transferência bancária, Skrill e cripto, cada um com seu limite.',
          'Várias afirmações públicas contradizem a central de ajuda, como a velocidade de pagamento (24 horas contra 2 dias úteis) e o tamanho máximo de conta. Quando marketing e termos divergem, são os termos que valem para o seu pagamento.',
        ],
      },
      {
        heading: 'Para quem a GOAT Funded Trader serve',
        paragraphs: [
          'Pode funcionar para um trader disciplinado, com perdas flutuantes pequenas e controladas, operações mantidas bem acima de dois minutos e sem depender de picos de notícias, que quer uma entrada barata. Serve mal a scalpers, traders de notícias e quem deixa as operações respirarem com grandes drawdowns intraday, porque as regras da conta financiada miram exatamente esses comportamentos. Se clareza de regras importa mais do que preço, compare antes com as empresas mais bem pontuadas do nosso ranking.',
        ],
      },
    ],
  },
  'topstep-review': {
    intro: 'A Topstep é o nome mais antigo do prop trading de futuros: fundada em 2012 em Chicago por Michael Patak, já operava seu Trading Combine anos antes da onda atual de prop firms. Esse histórico é sua principal força. Suas fraquezas são uma oferta só de futuros, mudanças frequentes de regras desde o fim de 2025 e um limite de perda móvel que exige disciplina.',
    sections: [
      {
        heading: 'A Topstep é confiável?',
        paragraphs: [
          'A Topstep é um operador americano consolidado, com longo histórico público, central de ajuda publicada e uma introducing broker afiliada, a Topstep Brokerage, lançada no início de 2026. O PropRadar lhe dá 84/100 e não registrou alerta de regulador contra ela. Como em toda prop firm, a avaliação e a Express Funded Account são simuladas: os pagamentos são recompensas pagas pela Topstep, não lucros de uma conta de corretagem.',
          'No Trustpilot o perfil mostra TrustScore de 3,7 em 14.955 avaliações, com o aviso do Trustpilot de que a empresa pode estar associada a investimentos de alto risco (verificado em 23 de outubro de 2026). A nota está na média da categoria. As reclamações do fim de 2025 se concentraram em quedas da plataforma TopstepX e ordens stop não executadas.',
        ],
      },
      {
        heading: 'Como funciona o Trading Combine',
        paragraphs: [
          'O Trading Combine é a avaliação da Topstep. Existe nos tamanhos 50K, 100K e 150K, com metas de lucro de US$ 3.000, US$ 6.000 e US$ 9.000. Não há prazo nem mínimo de dias de operação. As posições precisam ser fechadas até o fim da sessão: a Topstep não permite manter posições overnight nem no fim de semana.',
          'O Maximum Loss Limit (MLL) fica US$ 2.000, US$ 3.000 ou US$ 4.500 abaixo do saldo inicial, conforme o tamanho. Ele sobe conforme o saldo de fim de dia cresce e nunca desce, mas as violações são monitoradas em tempo real, incluindo perdas não realizadas. No Combine ele para de subir quando chega ao saldo inicial (central de ajuda da Topstep, atualizada em 18 de setembro de 2026).',
          'A meta de consistência é de 55%: seu melhor dia não pode passar de 55% da meta de lucro. Se passar, você não é reprovado; a meta sobe para melhor dia dividido por 0,55 (central de ajuda, 17 de setembro de 2026). Um limite de perda diária opcional de US$ 1.000, US$ 2.000 ou US$ 3.000 interrompe as operações na sessão sem encerrar a conta.',
        ],
      },
      {
        heading: 'Express Funded Account e pagamentos',
        paragraphs: [
          'Depois da aprovação você opera uma Express Funded Account (XFA), ainda simulada, onde começam os pagamentos. A XFA começa com saldo de US$ 0 e o mesmo colchão de MLL abaixo. Desde fevereiro de 2026 você escolhe entre dois caminhos de pagamento, e a escolha é definitiva: o caminho Standard exige cinco dias vencedores de pelo menos US$ 150 antes de cada pagamento, enquanto o caminho Consistency exige três dias de operação com o maior dia em no máximo 40% do lucro líquido.',
          'Traders que entraram a partir de 12 de janeiro de 2026 recebem 90% dos pagamentos aprovados; os anteriores ficam com 100% dos primeiros US$ 10.000 e depois 90%. O pedido mínimo de pagamento é de US$ 125. Após o primeiro pagamento o MLL passa a US$ 0, eliminando o colchão: um dia ruim depois do saque pode encerrar a conta. Os melhores traders podem ser convidados para uma Live Funded Account com capital real, limites de perda diária obrigatórios e uma reserva liberada em etapas.',
        ],
      },
      {
        heading: 'Prós e contras',
        paragraphs: ['O que se destaca depois de ler as regras atuais:'],
        bullets: [
          'Pró: o histórico mais longo do prop trading de futuros e uma central de ajuda grande e documentada.',
          'Pró: sem prazo nem dias mínimos no Combine; a regra de consistência aumenta a meta em vez de reprovar você.',
          'Pró: divisão de 90% desde o primeiro dólar para novos traders e um pagamento mínimo baixo, de US$ 125.',
          'Contra: só futuros, e toda posição precisa estar zerada no fim da sessão.',
          'Contra: o MLL vai a US$ 0 após o primeiro pagamento, então sacar cedo elimina sua margem de segurança.',
          'Contra: as regras mudaram várias vezes entre novembro de 2025 e abril de 2026; releia antes de cada compra.',
        ],
      },
      {
        heading: 'Para quem a Topstep serve',
        paragraphs: [
          'A Topstep serve a traders intraday de futuros que querem um operador consolidado e aceitam um limite móvel monitorado em tempo real. Não serve a traders de forex ou CFD, a swing traders que mantêm posições overnight nem a quem escolhe principalmente pelo preço: com a assinatura mensal, uma avaliação lenta sai mais cara do que em concorrentes de taxa única. Se você estiver comparando com a Apex, leia nosso guia Topstep vs Apex, que compara cada versão de conta regra por regra.',
        ],
      },
    ],
  },
  'prop-firm-drawdown': {
    intro: 'O drawdown é a regra que encerra a maioria das contas de prop firm. É o valor máximo que sua conta pode perder, medido a partir de um ponto de referência. Duas empresas podem anunciar um "drawdown de US$ 3.000" numa conta de US$ 50.000 e dar a você uma margem completamente diferente, porque o ponto de referência se move de forma diferente.',
    sections: [
      {
        heading: 'Limite de perda diária vs drawdown máximo',
        paragraphs: [
          'A maioria das empresas usa dois limites ao mesmo tempo. O limite de perda diária define quanto você pode perder em um dia de operação, geralmente medido a partir do saldo ou equity do início do dia. O drawdown máximo define sua perda total ao longo da vida da conta. Quebrar qualquer um deles geralmente viola a conta, embora algumas empresas de futuros só interrompam você pelo resto da sessão ao atingir o limite diário.',
        ],
      },
      {
        heading: 'Drawdown estático',
        paragraphs: [
          'Um drawdown estático fica fixo abaixo do saldo inicial e nunca se move. Numa conta de US$ 100.000 com limite estático de 10%, o piso é US$ 90.000 para sempre. Se você levar a conta a US$ 108.000, terá US$ 18.000 de margem. É o modelo mais tolerante e é comum em challenges de forex/CFD de duas fases.',
        ],
      },
      {
        heading: 'Trailing drawdown (intraday)',
        paragraphs: [
          'Um trailing drawdown intraday acompanha seu maior equity em tempo real, incluindo lucro não realizado. Exemplo numa conta de US$ 50.000 com limite trailing de US$ 2.500: o piso começa em US$ 47.500. Uma operação chega a +US$ 1.500 não realizados, então o piso sobe para US$ 49.000, mesmo que você depois feche a operação no zero a zero. Agora você tem US$ 1.000 de margem em vez de US$ 2.500, sem ter embolsado um centavo. É o modelo mais rígido e é comum em contas de futuros e de financiamento instantâneo.',
        ],
      },
      {
        heading: 'Trailing drawdown de fim de dia (EOD)',
        paragraphs: [
          'Um trailing drawdown de fim de dia só se move no fechamento do dia de operação, com base no saldo de fechamento. As oscilações intraday do lucro aberto não sobem o piso, o que o torna muito mais fácil de administrar do que o trailing intraday. Um detalhe que muitos ignoram: o piso só se move no fechamento, mas a violação muitas vezes ainda é verificada em tempo real. A Topstep, por exemplo, ajusta seu Maximum Loss Limit pelo saldo de fim de dia, mas o monitora ao vivo, incluindo perdas não realizadas.',
        ],
      },
      {
        heading: 'Quando o trailing para: o travamento',
        paragraphs: [
          'A maioria dos modelos trailing para de subir em algum momento, geralmente quando o piso chega ao saldo inicial (ou ao saldo inicial mais uma pequena folga). A partir daí o limite se comporta como um estático. Por isso os primeiros dias de uma conta trailing são os mais perigosos: construa a folga até o nível de travamento antes de abrir posições maiores.',
        ],
      },
      {
        heading: 'Limites por saldo ou por equity',
        paragraphs: [
          'Um limite por saldo só conta operações fechadas. Um limite por equity conta também as posições abertas, então uma perda flutuante pode violar a conta mesmo que você fosse fechar a operação no lucro depois. A maioria das empresas modernas mede as violações pelo equity. Leia a definição nos termos, não na tabela resumida.',
        ],
      },
      {
        heading: 'Como escolher',
        paragraphs: ['Escolha o modelo de drawdown de acordo com o comportamento das suas operações:'],
        bullets: [
          'Operações que muitas vezes vão bem no lucro antes de voltar: evite o trailing intraday, prefira estático ou EOD.',
          'Scalps pequenos e frequentes com stops curtos: um limite trailing é administrável se o nível de travamento for alcançado rápido.',
          'Swing trades com stops largos: você precisa de um limite estático e de mais margem do que sua perda aberta típica.',
          'Dimensione sempre as posições pela margem restante até o piso, não pelo tamanho anunciado da conta.',
        ],
      },
    ],
  },
};

export default pt;
