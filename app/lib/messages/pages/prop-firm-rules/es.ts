import type { RulesMessages } from './en';

const rules: RulesMessages = {
  metaTitle: 'Reglas de las prop firms: drawdown, pagos y riesgos de trading',
  metaDescription:
    'Compara las reglas sensibles de las prop firms: drawdown, trading de noticias, pagos, consistencia, EA, copy trading y estrategias prohibidas.',
  schemaName: 'Auditorías de reglas de prop firms',
  breadcrumb: 'Reglas de trading',
  eyebrow: 'Auditoría profunda de reglas',
  h1: 'Las cláusulas que pueden costar una cuenta o un pago.',
  lead: 'PropRadar lee las páginas de reglas, los centros de ayuda y las condiciones de los productos estrella para aislar las cláusulas peligrosas: drawdown, rollover, noticias, EA, copy trading, consistencia, límites de pago y sanciones.',
  reviewed: 'Página revisada el {date}. Cada auditoría conserva su propia fecha de verificación de la fuente, visible.',
  statDeep: 'Auditorías profundas',
  statClauses: 'Cláusulas extraídas ({critical} críticas)',
  statCompact: 'Firmas medianas y pequeñas ({critical} críticas)',
  statTracked: 'Firmas seguidas',
  coverageAria: 'Cobertura de las auditorías de reglas',
  statRuleFiles: 'Expedientes de reglas',
  statPayoutSensitive: 'Expedientes sensibles a los pagos',
  statLegalWatch: 'Vigilancia legal',
  statDeepSources: '5+ fuentes',
  related: 'Guías relacionadas:',
  relatedConsistency: 'Regla de consistencia',
  relatedNews: 'Trading de noticias',
  statsAria: 'Estadísticas de reglas',
  families: [
    { label: 'Cuenta cerrada', title: 'Drawdown y equity', text: 'El verdadero peligro suele ser la equity abierta, el rollover, los swaps y el reinicio del servidor.' },
    { label: 'Beneficio retirado', title: 'Noticias y rollover', text: 'Algunas plataformas permiten técnicamente la operación pero retiran las ganancias o la clasifican como infracción.' },
    { label: 'Cuenta bloqueada', title: 'EA, HFT, copy trading', text: 'Un EA permitido para gestionar el riesgo puede seguir prohibido si opera de forma autónoma, copia cuentas o sobrecarga el servidor.' },
    { label: 'Retiro retrasado', title: 'Pagos y consistencia', text: 'Las reglas del mejor día, los límites de pago, los días ganadores y los ciclos de retiro pueden importar más que el reparto de beneficios anunciado.' },
  ],
  alertsEyebrow: 'Alertas para traders',
  alertsTitle: 'Lo que las páginas comerciales no dicen con suficiente claridad.',
  viewAudit: 'Ver la auditoría de fuentes',
  proofAria: 'Pruebas de la auditoría de reglas de {name}',
  payoutChip: 'Pago {level}',
  legalChip: 'Legal {level}',
  sourceDeep: 'Fuentes sólidas',
  sourceUsable: 'Fuentes utilizables',
  sourceThin: 'Fuentes escasas',
  sourceNone: 'Sin fuentes',
  severity: { Faible: 'Bajo', Moyen: 'Medio', 'Élevé': 'Alto', Critique: 'Crítico' },
  proof: {
    'Source officielle lue': 'Fuente oficial leída',
    'Source officielle partielle': 'Fuente oficial parcial',
    'Source commerciale repérée': 'Página comercial localizada',
  },
  sourceChecked: 'Fuente verificada el {date}',
  compactEyebrow: 'Firmas medianas y pequeñas',
  compactTitle: 'La cola larga se lee firma por firma.',
  compactNote: 'Estas alertas breves proceden de fuentes oficiales o de páginas de producto localizadas. Los expedientes parciales siguen marcados como tales a propósito.',
  fullEyebrow: 'Cobertura completa',
  fullTitle: 'Todas las demás prop firms siguen en la cola de auditoría.',
  fullNote: 'PropRadar mantiene visibles las firmas más pequeñas para evitar puntos ciegos: fuente localizada, archivo de riesgos o expediente aún por documentar.',
  showQueue: 'Mostrar las {count} firmas que siguen en la cola de auditoría',
  productToIdentify: 'Producto por identificar',
  mainProductToIdentify: 'Producto principal por identificar',
  coverageArchive: 'Archivo de riesgos',
  coverageMulti: 'Expediente multifuente',
  coverageSpotted: 'Fuente localizada',
  coverageToSource: 'Por documentar',
  nextEyebrow: 'Próximo análisis',
  nextTitle: 'Los próximos productos estrella que se desglosarán.',
  colDrawdown: 'Drawdown',
  colNews: 'Noticias',
  colEa: 'EA',
  colPayout: 'Pago',
  colScore: 'Puntuación',
  scoreAria: 'Puntuación PropRadar {score} sobre 100',
  matrixEyebrow: 'Matriz rápida',
  matrixTitle: 'Firmas activas ordenadas por riesgo de pago.',
  showMatrix: 'Mostrar las {count} firmas activas por riesgo de pago',
  scoreLine: 'puntuación {score}/100',
  audits: {
    ftmo: {
      headline: 'El riesgo principal viene de los cálculos de equity y de las prácticas prohibidas.',
      verdict:
        'FTMO es clara, pero sus reglas son estrictas: pérdida diaria calculada sobre la equity, drawdown dinámico de fin de día en el 1-Step, una Best Day Rule y amplias restricciones sobre gap trading, HFT, cuentas vinculadas y elusión.',
      clauses: [
        {
          title: 'La pérdida diaria incluye la equity abierta',
          finding: 'La pérdida diaria incluye el saldo, las posiciones abiertas, los swaps y las comisiones. Una posición flotante puede infringir la regla antes de cerrarse.',
          impact: 'Nunca vigiles solo el saldo. Una mecha, una ampliación del spread o un swap pueden bastar para perder la cuenta.',
        },
        {
          title: 'Best Day / regla de consistencia en el 1-Step y la FTMO Account',
          finding:
            'En las cuentas de pedidos anteriores al 12 de octubre de 2026, el mejor día no debe superar el 50 % de los beneficios positivos. Los nuevos pedidos 1-Step usan una regla de consistencia que compara el mejor día con el beneficio total, días perdedores incluidos. Ninguna es una infracción, pero ambas pueden bloquear el avance o una recompensa hasta que se corrija la proporción.',
          impact: 'Una sola gran operación ganadora puede obligarte a seguir operando para desbloquear la cuenta, es decir, a asumir más riesgo.',
        },
        {
          title: 'Cláusulas amplias de prácticas prohibidas',
          finding:
            'El gap trading, la latencia, la velocidad ultra alta, las cuentas coordinadas, la rotación de cuentas, las apuestas en un solo sentido y los EA hiperactivos pueden llevar a descalificación, operaciones eliminadas, recompensas perdidas o rescisión.',
          impact: 'Las estrategias para "burlar" el challenge y los montajes multicuenta copiados son el verdadero peligro, aunque la puntuación pública sea excelente.',
        },
      ],
    },
    the5ers: {
      headline: 'El drawdown diario es más engañoso de lo que parece.',
      verdict:
        'The5ers High Stakes parece limpio sobre el papel, pero el drawdown diario usa el valor más alto entre el saldo y la equity del día anterior. Una operación mantenida durante el rollover puede reducir mucho el margen disponible.',
      clauses: [
        {
          title: 'El drawdown diario toma el valor más alto entre saldo y equity',
          finding: 'El drawdown diario del 5 % se fija a medianoche del servidor a partir de la equity o el saldo de cierre del día anterior, el que sea mayor.',
          impact: 'Terminar el día con una equity alta eleva el umbral del día siguiente. Una posición mantenida puede cerrar la cuenta antes de lo previsto.',
        },
        {
          title: 'Regla de inactividad de 30 días',
          finding: 'Las cuentas caducan tras más de 30 días seguidos sin actividad de trading, contados desde el registro.',
          impact: 'Un challenge comprado para más adelante puede convertirse en una pérdida total si no se usa.',
        },
        {
          title: 'Pago cada dos semanas',
          finding: 'Tras alcanzar el estado financiado, los retiros están disponibles desde el panel cada dos semanas.',
          impact: 'La liquidez no es inmediata: no compares solo el reparto y el precio del challenge.',
        },
      ],
    },
    fundednext: {
      headline: 'Numerosas reglas antiabuso pueden retirar beneficios antes del cierre de la cuenta.',
      verdict:
        'FundedNext está bien documentada, pero sus límites antiabuso son amplios: tope de riesgo, tope de margen, quick strike, hiperactividad, trading de liquidación, copy trading y cobertura entre cuentas.',
      clauses: [
        {
          title: 'Riesgo máximo del 3 % y margen limitado al 70 %',
          finding:
            'FundedNext limita el riesgo al 3 % en todo momento y el margen acumulado al 70 %. Una primera infracción puede provocar un aviso y la retirada de los beneficios ligados a la operación.',
          impact: 'Se pueden retirar beneficios cuando el tamaño de la posición sale del marco, incluso sin cierre inmediato de la cuenta.',
        },
        {
          title: 'Quick Strike y operaciones de menos de 30 segundos',
          finding:
            'Las operaciones cerradas en menos de 30 segundos se vigilan. A partir del 30 % de beneficio en Quick Strike, la cuenta financiada puede cancelarse y los beneficios afectados retirarse.',
          impact: 'Un scalping ultracorto puede convertir un buen rendimiento en un pago denegado.',
        },
        {
          title: 'Hiperactividad acumulada entre cuentas',
          finding:
            'Doscientas operaciones o 2.000 mensajes al servidor por día generan avisos; 15.000 mensajes pueden desactivar la cuenta. Los avisos pueden acumularse entre cuentas.',
          impact: 'Un EA o una gestión de órdenes demasiado activa puede costar la cuenta incluso sin mala intención.',
        },
      ],
    },
    topstep: {
      headline: 'Las principales trampas son la consistencia, los límites de pago y los cinco días ganadores.',
      verdict: 'Topstep es consolidada y clara, pero el avance y los retiros dependen de algo más que el beneficio bruto.',
      clauses: [
        {
          title: 'Objetivo de consistencia del 50 %',
          finding: 'El mejor día debe quedar por debajo del 50 % del objetivo de beneficio. Si se supera, el objetivo aumenta, y las pérdidas no reinician el mejor día.',
          impact: 'Un solo gran día ganador puede retrasar el estado financiado incluso después de alcanzar el importe objetivo.',
        },
        {
          title: 'Límites de pago XFA',
          finding:
            'Los retiros de la Express Funded Account están limitados por solicitud y por tamaño de cuenta. El límite puede depender de la vía estándar o de consistencia y de la opción DLL.',
          impact: 'Un gran beneficio no garantiza un retiro inmediato por el mismo importe.',
        },
        {
          title: 'Política de perfil único',
          finding: 'Todas las cuentas deben estar bajo un único perfil de Topstep. Tener varios perfiles puede provocar el cierre o la suspensión.',
          impact: 'Una cuenta duplicada o un error de registro puede convertirse en un riesgo operativo real.',
        },
      ],
    },
    'apex-trader-funding': {
      headline: 'Apex cambió mucho su oferta: hay que separar las cuentas antiguas de las nuevas.',
      verdict:
        'La nueva oferta de Apex destaca drawdown de fin de día, sin denegación de pagos, consistencia del 50 % y sin cobro recurrente en los nuevos productos. Las cuentas antiguas siguen siendo un sistema aparte.',
      clauses: [
        {
          title: 'Nuevos productos y cuentas antiguas',
          finding: 'Apex indica que las cuentas antiguas ya no se venden, no se modifican de forma retroactiva y pueden seguir con cobro recurrente hasta su cancelación.',
          impact: 'Antes de comparar opiniones o descuentos de Apex, comprueba si la fuente trata de un producto antiguo o actual.',
        },
        {
          title: '5 días de trading entre recompensas',
          finding: 'La página oficial destaca cinco días de trading para pagos y recompensas en la vía actual.',
          impact: 'Incluso avanzando rápido, la velocidad de retiro depende del ciclo de días de trading.',
        },
        {
          title: 'Consistencia del 50 %',
          finding: 'La nueva oferta muestra una regla de consistencia del 50 %.',
          impact: 'Un solo gran día puede limitar el retiro o el avance según la cuenta utilizada.',
        },
      ],
    },
    'e8-markets': {
      headline: 'E8 es muy detallada, pero algunas reglas retiran beneficios sin cerrar la cuenta.',
      verdict:
        'E8 Markets documenta el drawdown diario, los topes de beneficio, las noticias, el HFT, los EA y las reglas del mejor día. El principal riesgo para el trader es un beneficio retirado en el rollover o en el pago.',
      clauses: [
        {
          title: 'Drawdown diario con cierre definitivo',
          finding:
            'El drawdown diario es un importe fijo basado en el saldo inicial. Si la equity o el saldo tocan el nivel de pérdida, la cuenta se cierra definitivamente aunque el cierre técnico termine por encima.',
          impact: 'El cierre final puede parecer por encima del umbral mientras la cuenta está perdida, porque prevalece la infracción registrada en el servidor.',
        },
        {
          title: 'Tope de beneficio diario del 2 %',
          finding:
            'En E8 Pro, los beneficios por encima del tope diario no cuentan y se retiran tras el rollover. Los intentos de eludirlo con coberturas o cierres parciales pueden agruparse.',
          impact: 'Un día excepcional puede quedar parcialmente fuera del resultado válido.',
        },
        {
          title: 'Trading de noticias en las cuentas Performance de E8 One',
          finding:
            'En las cuentas performance de E8 One está prohibido abrir, cerrar o modificar SL/TP dentro de los cinco minutos de una noticia de alto impacto, y los beneficios pueden retirarse.',
          impact: 'La plataforma puede permitir técnicamente la acción mientras el beneficio se retira después, en el pago.',
        },
      ],
    },
    'funding-pips': {
      headline: 'Las infracciones suelen venir de la equity, el rollover y la ampliación del spread.',
      verdict:
        'FundingPips indica claramente que los límites se vigilan en el servidor en tiempo real. Los errores más caros tienen que ver con stops ajustados, el rollover de las 17:00 de Nueva York y posiciones abiertas durante noticias.',
      clauses: [
        {
          title: 'Vigilancia de la equity en tiempo real',
          finding: 'Las pérdidas diaria y máxima vigilan la equity en directo. Manda el registro del servidor, aunque el terminal o el panel vayan con retraso.',
          impact: 'Una posición flotante puede cerrar la cuenta antes de que la pantalla local muestre la infracción.',
        },
        {
          title: 'Rollover a las 17:00 de Nueva York',
          finding: 'FundingPips advierte que los spreads pueden ampliarse mucho a las 17:00 de Nueva York, activando stops e infracciones.',
          impact: 'Un stop que parece seguro en un gráfico Bid puede ser alcanzado por el Ask durante el rollover.',
        },
        {
          title: 'La solicitud de recompensa exige operaciones cerradas',
          finding: 'El ciclo de recompensa exige cerrar las posiciones, esperar 15 minutos y luego solicitar el reparto.',
          impact: 'Las posiciones abiertas y los costes nocturnos pueden reducir el margen de seguridad en el peor momento.',
        },
      ],
    },
    'alpha-capital-group': {
      headline: 'El principal peligro: restricciones a las noticias, EA no aprobados y reglas contra el juego.',
      verdict:
        'Alpha Capital permite algunos usos, pero las reglas tras la calificación son delicadas en cuanto a ventanas de noticias, IP, EA preaprobados y conductas clasificadas como juego.',
      clauses: [
        {
          title: 'Noticias: apertura y cierre restringidos según el plan',
          finding:
            'Tras la calificación, algunos planes prohíben abrir o cerrar dos o cinco minutos alrededor de noticias de alto impacto. Incluso un TP o SL activado en la ventana puede ser una infracción leve.',
          impact: 'Una posición puede mantenerse de forma legítima mientras un take profit alcanzado en mal momento hace que el beneficio no sea válido.',
        },
        {
          title: 'EA limitados a la gestión del riesgo',
          finding: 'Los EA autónomos, los bots de terceros, el HFT, el arbitraje de latencia o los EA compartidos que generan operaciones idénticas pueden cerrar la cuenta.',
          impact: 'Un EA permitido no significa trading automatizado sin límites. Confirma el uso, la plataforma y los requisitos de preaprobación.',
        },
        {
          title: 'Restricciones de IP y de hogar',
          finding: 'Un mismo hogar, varias IP, el uso no declarado de VPN/VPS o cambios de ubicación incoherentes pueden provocar una infracción o una revisión de seguridad.',
          impact: 'Un viaje, un piso compartido, otro trader en la familia o un VPS mal declarado pueden convertirse en un problema de cumplimiento.',
        },
      ],
    },
  },
  compact: {
    'funding-traders': {
      riskFamily: 'Pago + consistencia',
      signal:
        'Las tablas muestran pérdidas diarias, pérdidas máximas, riesgo por operación, consistencia y calendarios de pago distintos para Instant Funded, 1-Step y 2-Step.',
      impact:
        'Antes de comprar, compara algo más que el precio: confirma el producto exacto, el ciclo de pago de 14 o 21 días y la puntuación de consistencia que puede bloquear un retiro.',
    },
    'maven-trading': {
      riskFamily: 'Drawdown + reembolso',
      signal:
        'La página oficial separa pérdida diaria, pérdida máxima, objetivos de beneficio y frecuencia de pago, e indica que algunas tarifas se reembolsan en el tercer retiro.',
      impact: 'El coste real depende de cuántos pagos se obtengan. Un precio de entrada bajo puede salir caro si el programa elegido deja poco margen de drawdown.',
    },
    fxify: {
      riskFamily: 'Drawdown diario',
      signal: 'El drawdown diario puede basarse en el saldo de fin de día anterior. El primer pago se presenta como bajo demanda, seguido de retiros quincenales.',
      impact: 'Una posición mantenida durante el reinicio puede reducir el margen del día siguiente. Revisa también los complementos que cambian el reparto, el pago y el apalancamiento.',
    },
    'instant-funding': {
      riskFamily: 'Smart drawdown + plazo de pago',
      signal: 'En Instant Funding, el smart drawdown se bloquea tras un beneficio. En IF1, la cuenta dura 24 horas y la mejor operación no puede representar una parte demasiado grande del beneficio total.',
      impact: 'Instantáneo no siempre significa pago inmediato: algunos productos exigen 14 días, un umbral de beneficio o una regla de consistencia.',
    },
    'trade-the-pool': {
      riskFamily: 'Acciones + beneficio válido',
      signal:
        'Las reglas incluyen un volumen máximo por minuto en un instrumento, ratios de beneficio por posición, un número mínimo de posiciones, mínimos de pago y revisiones de riesgo/KYC.',
      impact: 'En acciones, el drawdown no es el único peligro: una operación sobredimensionada en una small cap o un beneficio concentrado pueden invalidarse.',
    },
    'funded-trading-plus': {
      riskFamily: 'High-water mark',
      signal: 'El drawdown diario puede usar el valor más alto entre saldo y equity en el reinicio. En algunos cálculos, los retiros no bajan el high-water mark.',
      impact: 'Un retiro puede parecer que asegura la cuenta mientras el umbral de drawdown sigue anclado más arriba.',
    },
    'goat-funded-trader': {
      riskFamily: 'Noticias + topes de recompensa',
      signal: 'Las operaciones abiertas o cerradas dentro de los cinco minutos de noticias de alto impacto pueden tener el beneficio limitado. Las cuentas financiadas también tienen límites de retiro iniciales.',
      impact: 'El trading de noticias puede estar permitido mientras las ganancias se limitan. Lee la cláusula de retirada de beneficios, no solo la mención "noticias permitidas".',
    },
    'audacity-capital': {
      riskFamily: 'Reglas permisivas por confirmar',
      signal:
        'La página anuncia un periodo de trading ilimitado, pérdida diaria máxima, pérdida máxima, pago en el mismo día y permiso para noticias, fin de semana, EA y copy trading.',
      impact: 'Cuando una página parece muy permisiva, verifica en el panel y en las condiciones las definiciones exactas de EA, copy trading y pago en el mismo día.',
    },
    fintokei: {
      riskFamily: 'Riesgo abierto + umbral de pago',
      signal: 'SwiftTrader indica la pérdida diaria, la pérdida máxima, el riesgo máximo permitido en operaciones abiertas y el beneficio mínimo por pago.',
      impact: 'Incluso con pagos rápidos, la regla de riesgo abierto máximo puede bloquear estrategias multiposición o martingalas encubiertas.',
    },
    'hantec-trader': {
      riskFamily: 'Drawdown estático sobre el saldo',
      signal:
        'La tabla oficial indica para cada fase un drawdown estático sobre el saldo, la pérdida diaria, la pérdida total máxima, la frecuencia de recompensas y los días mínimos de trading.',
      impact: 'La palabra estático no basta: comprueba si el umbral usa el saldo, la equity o ambos en el momento de la infracción.',
    },
    'oneup-trader': {
      riskFamily: 'Drawdown dinámico + consistencia',
      signal:
        'No se muestra pérdida diaria, pero se aplican un drawdown dinámico, al menos 10 días de trading y una consistencia: los otros tres mejores días deben sumar al menos el 80 % del día más grande.',
      impact: 'Sin pérdida diaria, las principales trampas pasan a ser el drawdown dinámico y concentrar el beneficio en una sola sesión.',
    },
    earn2trade: {
      riskFamily: 'Futuros + tasa de aprobación',
      signal:
        'Earn2Trade publica métricas poco habituales: tasa de aprobación, proporción de cuentas live y live-sim, retiros semanales desde 100 $ y mercados solo de futuros.',
      impact: 'Es más transparente que muchos competidores, pero la tasa de aprobación muestra que el producto es una evaluación difícil, no un ingreso comprado.',
    },
    'take-profit-trader': {
      riskFamily: 'Pago PRO + tarifa de cuenta',
      signal:
        'El sitio destaca retiros PRO desde el primer día, un reparto 80/20 y luego 90/10 en PRO+, una tarifa PRO única y un paso a real en PRO+ con las mismas reglas de riesgo.',
      impact: 'Los pagos rápidos son atractivos, pero revisa el recorrido de Test a PRO y a PRO+, la tarifa y el drawdown exacto en real.',
    },
    brightfunded: {
      riskFamily: 'Marketing de pagos',
      signal: 'La página anuncia pagos a partir de siete días después de la primera operación financiada y un reparto de hasta el 100 %, sujeto a condiciones.',
      impact: 'Lee bien las condiciones: "hasta" suele depender del plan, los complementos, el ciclo y las reglas de consistencia.',
    },
    'aqua-funded': {
      riskFamily: 'Financiación instantánea',
      signal: 'La fuente oficial destaca la financiación instantánea y un reparto alto, pero cada página de producto necesita una revisión plan por plan.',
      impact: 'Trata la promesa de lo instantáneo como una afirmación por verificar: los ciclos de pago, el drawdown, los reembolsos y las reglas de noticias pueden cambiar según la cuenta.',
    },
    'blue-guardian': {
      riskFamily: 'Proceso estructurado',
      signal: 'El sitio destaca evaluaciones con reglas transparentes, disciplina, gestión del riesgo y pagos rápidos.',
      impact: 'Antes de comprar, revisa la página de reglas exacta sobre drawdown, noticias, mínimos de pago y condiciones de la financiación instantánea.',
    },
    'breakout-prop': {
      riskFamily: 'Liquidez cripto',
      signal: 'Breakout es ante todo cripto: vuelve a leer la fuente oficial sobre spread, liquidez, reglas de los exchanges, liquidación y horarios propios del mercado.',
      impact: 'Una prop firm cripto no se juzga como una de forex: mechas, slippage y riesgo de liquidación deben verse antes de pagar.',
    },
    'the-trading-pit': {
      riskFamily: 'Multiactivo',
      signal: 'La cobertura oficial es multiactivo. Separa las reglas por clase de activo, porque los challenges de futuros y de CFD no tienen los mismos riesgos.',
      impact: 'No traslades una regla de un producto a otro: drawdown, plataformas, tarifas y horarios de trading pueden variar mucho.',
    },
    'finotive-funding': {
      riskFamily: 'Instantánea + challenge',
      signal:
        'La fuente oficial está identificada, pero la página del producto debe confirmar las cláusulas detalladas de pérdida diaria, pérdida máxima, reembolsos, pagos y restricciones de trading.',
      impact: 'Sin compra hasta una lectura final, mientras las condiciones propias del producto no figuren en el expediente de PropRadar.',
    },
    myfundedfutures: {
      riskFamily: 'Pago de futuros',
      signal:
        'La fuente oficial está identificada, pero los parámetros detallados de pago, activación, drawdown y consistencia deben confirmarse en el centro de ayuda o en el pago.',
      impact: 'No compres solo por el precio mensual: las tarifas de la cuenta financiada, el calendario de pagos y el drawdown dinámico determinan el coste real.',
    },
    bulenox: {
      riskFamily: 'Drawdown dinámico en futuros',
      signal: 'La fuente oficial está identificada, pero al expediente aún le faltan las tarifas de activación exactas, el drawdown dinámico, los mínimos de pago y las reglas de contratos.',
      impact: 'Se mantiene en la cola de auditoría de futuros: los costes y límites tras el estado financiado importan más que el precio de la evaluación.',
    },
  },
};

export default rules;
