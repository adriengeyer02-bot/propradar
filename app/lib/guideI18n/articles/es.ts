import type { GuideArticleTranslations } from '../types';

/** Spanish translations of the long guide articles (same section order as the English ones). */
const es: GuideArticleTranslations = {
  'prop-firm-sans-challenge': {
    intro: 'Una prop firm sin challenge vende una cuenta financiada directamente, sin la fase de evaluación clásica. Parece un atajo. En la práctica pagas más por adelantado por saltarte la prueba, y las reglas que habrías encontrado en el challenge pasan a la cuenta financiada, donde un error cuesta la cuenta en lugar de un nuevo intento.',
    sections: [
      {
        heading: 'Qué significa realmente "sin challenge"',
        paragraphs: [
          'En el modelo clásico pagas una cuota, alcanzas un objetivo de beneficio bajo un límite de pérdida diaria y un drawdown máximo, a veces en dos fases, y solo entonces operas una cuenta financiada que puede pagar. Un programa sin challenge, a menudo llamado financiación instantánea o directa, elimina ese primer paso: compras la cuenta financiada y puedes pedir pagos cuando se cumplen sus propias condiciones.',
          'Lo que desaparece es el objetivo de beneficio antes de la financiación. Lo que no desaparece es el control del riesgo. Las cuentas instantáneas casi siempre mantienen un drawdown máximo, a menudo móvil, y muchas añaden una regla de consistencia, un mínimo de días de trading o un tope menor en el primer pago. La firma sigue necesitando filtrar a los traders; simplemente lo hace después de que hayas pagado.',
        ],
      },
      {
        heading: 'Por qué la financiación instantánea suele costar más',
        paragraphs: [
          'Las firmas ponen precio a la evaluación como un filtro: una gran parte de quienes compran un challenge nunca llega a un pago, y sus cuotas financian a los traders que sí llegan. Si te saltas el filtro, la firma incluye ese riesgo en el precio de la cuenta. Por eso una cuenta directa suele costar varias veces un challenge del mismo tamaño, las cuentas son más pequeñas y el drawdown suele ser más estrecho.',
          'Compara el coste total hasta el primer pago, no el precio de lista. Un ejemplo con cifras redondas: un challenge de 100 $ con una probabilidad de aprobar de una entre tres cuesta de media unos 300 $ hasta conseguir la financiación. Una cuenta instantánea de 350 $ con un trailing drawdown estrecho puede costar más si pierdes una o dos cuentas antes del primer pago. La opción más barata depende de cuántas veces tu estrategia superaría las reglas de la cuenta financiada.',
        ],
      },
      {
        heading: 'Las reglas que deciden si una cuenta directa compensa',
        paragraphs: ['Lee los términos de la cuenta financiada, no la página comercial. Estos son los puntos que más a menudo cambian las cuentas:'],
        bullets: [
          'Tipo de drawdown: un trailing drawdown que sigue tu máximo de equity es mucho más difícil de llevar que un límite estático fijado en el saldo inicial.',
          'Regla de consistencia: muchos programas instantáneos limitan cuánto de tu beneficio puede venir de tu mejor día antes de permitir un pago.',
          'Condiciones del primer pago: días mínimos de trading, beneficio mínimo y topes en los primeros uno o dos retiros.',
          'Reparto inicial: algunos programas empiezan por debajo de sus modelos con challenge y solo suben más tarde.',
          'Coste de reposición: cuánto cuesta una cuenta nueva tras un incumplimiento y si se aplica algún descuento.',
          'Estrategias restringidas: ventanas de noticias, tiempos de mantenimiento, copy trading y duración mínima de las operaciones.',
        ],
      },
      {
        heading: 'Quién debería plantearse una prop firm sin challenge',
        paragraphs: [
          'La financiación directa tiene más sentido para un trader con una estrategia estable y de bajo drawdown, acostumbrado a respetar los límites diarios, que valora más el tiempo que el coste. Tiene menos sentido para quien aún está probando una estrategia, para un estilo muy volátil que necesita margen o para quien compra sobre todo para evitar la presión de un objetivo de beneficio: esa presión se sustituye por la de un drawdown activo en una cuenta que costó más.',
          'Si dudas, un challenge 1-Step barato suele ser la mejor prueba de si tu estrategia encaja con las reglas de una firma antes de comprometerte con una cuenta directa más cara.',
        ],
      },
      {
        heading: 'Señales de alerta propias de la financiación instantánea',
        paragraphs: [
          'Los programas instantáneos atraen a firmas nuevas y muy centradas en el marketing porque son fáciles de vender. Tómalas como señales de alerta: cuentas muy grandes a precios muy bajos, promesas de pago sin una política de pagos publicada, reglas que difieren entre la página principal y los términos, y términos que permiten a la firma denegar pagos a su entera discreción sin motivo. Revisa en el perfil de PropRadar la entidad legal, las señales de pago y cualquier alerta de dominio o de regulador antes de comprar.',
        ],
      },
    ],
  },
  'prop-firm-sans-consistency-rule': {
    intro: 'Una regla de consistencia limita cuánto de tu beneficio total puede venir de un solo día. Existe porque un día con suerte, una posición sobredimensionada o un pico de noticias puede producir un pago que no dice nada sobre si puedes operar la cuenta a lo largo del tiempo. Entender la fórmula exacta importa más que encontrar una firma que diga no tenerla.',
    sections: [
      {
        heading: 'Cómo se calcula la regla',
        paragraphs: [
          'La mayoría de las firmas usa la misma fórmula básica: beneficio del mejor día dividido entre el beneficio total, en porcentaje. Si el resultado supera el límite de la firma, todavía no cumples los requisitos, ya sea para aprobar la evaluación o para pedir un pago, según dónde se aplique la regla.',
          'Ejemplo con un límite del 50 %: ganas 1.200 $ el lunes, 300 $ el martes y 500 $ el miércoles, 2.000 $ en total. Tu mejor día son 1.200 $, el 60 % del total. Estás por encima del límite. Para corregirlo no necesitas perder nada: necesitas más beneficio total, aquí al menos 2.400 $, para que 1.200 $ representen el 50 % o menos.',
          'Algunas firmas aplican la regla de otra forma. Topstep, por ejemplo, sube el objetivo de beneficio en el Trading Combine en lugar de suspenderte: si tu mejor día supera el 55 % del objetivo, el objetivo pasa a ser mejor día dividido entre 0,55 (centro de ayuda de Topstep, página del 17 de septiembre de 2026).',
        ],
      },
      {
        heading: 'Dónde se aplica: evaluación, pago o ambos',
        paragraphs: [
          'El mismo porcentaje puede significar cosas muy distintas. Una regla de consistencia en la evaluación solo retrasa el aprobado. Una regla de consistencia en los pagos puede bloquear un retiro después de que ya hayas ganado dinero en una cuenta financiada, lo que resulta mucho más frustrante. Algunas firmas usan además límites distintos por fase: Topstep usa el 55 % en el Combine y el 40 % en la vía de pago Consistency de su Express Funded Account.',
          'FTMO cambió su regla el 12 de octubre de 2026: los nuevos pedidos del 1-Step Challenge usan una regla de consistencia que compara tu mejor día con el beneficio total, días con pérdidas incluidos, mientras que las cuentas de pedidos anteriores mantienen la antigua Best Day Rule, que solo contaba los días positivos. Según FTMO, si no cumples el requisito simplemente sigues operando hasta cumplirlo (actualización de trading de FTMO del 8 de octubre de 2026). PropRadar no ha registrado una regla porcentual de mejor día en el programa High Stakes de The5ers. Confirma siempre la fase, el producto y la fecha del pedido.',
        ],
      },
      {
        heading: '¿Es mejor una firma sin regla de consistencia?',
        paragraphs: [
          'No automáticamente. Las firmas que eliminan la regla de consistencia suelen controlar el riesgo de otra forma: límites de pérdida diaria más estrictos, trailing drawdowns, topes en los primeros pagos, días mínimos de trading o límites al tamaño de posición. Un titular de "sin regla de consistencia" puede esconder una cuenta financiada más difícil de conservar.',
          'La regla perjudica sobre todo a los traders cuyos resultados llegan a rachas: traders de noticias, swing traders que cierran una gran posición o quien sube el tamaño tras una racha de pérdidas. Si tus resultados diarios son bastante regulares, un límite del 40 al 50 % rara vez molesta. Si sueles hacer la mayor parte de tu semana en una sesión, busca programas sin la regla y compara lo que la sustituye.',
        ],
      },
      {
        heading: 'Cómo operar con tranquilidad bajo una regla de consistencia',
        paragraphs: [
          'Lleva un cálculo continuo de mejor día dividido entre beneficio total y conoce, antes de cada sesión, cuánto puedes ganar sin pasar el límite. Si tienes un gran día al principio, planifica varios días positivos más pequeños en lugar de intentar repetirlo. Y evita subir el tamaño al final de una evaluación: un solo día ganador sobredimensionado puede retrasar el aprobado igual que un día de pérdidas.',
        ],
      },
    ],
  },
  'meilleure-prop-firm-2026': {
    intro: 'No existe una única mejor prop firm. Existe la mejor firma para tu mercado, tu estilo de trading y el riesgo que aceptas del propio operador. Este ranking empieza por ese último punto: antes de comparar repartos y descuentos, comprueba si es probable que una firma siga ahí, y pague, cuando la necesites.',
    sections: [
      {
        heading: 'Cómo se construye este ranking',
        paragraphs: [
          'Cada firma en PropRadar recibe una puntuación sobre 100 basada en la claridad de las reglas, las pruebas de pago, la transparencia legal, las señales públicas de reseñas y la trayectoria. Los enlaces de afiliado se declaran en cada perfil y nunca cambian una puntuación. Una firma afiliada mantiene visibles sus puntos débiles, y una firma sin afiliación puede quedar arriba.',
          'En esta actualización las puntuaciones más altas son de operadores veteranos: FTMO (91/100), The5ers (85/100) y Topstep (84/100). No son los más baratos. Son los perfiles con la trayectoria pública más larga, los términos más legibles y menos señales de pago sin resolver en los archivos de PropRadar.',
        ],
      },
      {
        heading: 'Empieza por tu mercado',
        paragraphs: [
          'Los traders de forex y CFD y los de futuros no compran en el mismo mercado. Las firmas de forex/CFD como FTMO y The5ers funcionan en plataformas como MT5 o cTrader con límites en porcentaje. Las firmas de futuros como Topstep funcionan en plataformas de futuros con límites en dólares y, a menudo, drawdowns móviles. Una gran firma de futuros no sirve a un trader de forex, así que filtra primero por mercado.',
        ],
      },
      {
        heading: 'Después adapta las reglas a tu estilo',
        paragraphs: [
          'Las reglas que terminan con la mayoría de las cuentas no son los objetivos de beneficio, sino el tipo de drawdown, el límite de pérdida diaria, las reglas de consistencia, las restricciones de noticias y las reglas de mantenimiento. Un scalper necesita ejecución rápida y ninguna duración mínima de operación. Un swing trader necesita mantener de noche y en fin de semana. Un trader de noticias necesita una firma que permita operar los datos de alto impacto en la cuenta financiada, no solo en la evaluación.',
        ],
        bullets: [
          'Drawdown: los límites estáticos son más fáciles de gestionar que los móviles.',
          'Consistencia: comprueba si se aplica a la evaluación, a los pagos o a ambos.',
          'Noticias y mantenimiento: confirma las reglas de la cuenta financiada, que suelen ser más estrictas.',
          'Pagos: frecuencia, importe mínimo, topes del primer pago y comisiones.',
        ],
      },
      {
        heading: 'Por último, compara el coste real',
        paragraphs: [
          'El coste real de una prop firm es el dinero que gastas antes de tu primer pago: cuotas de challenge, resets, cuotas de activación y cuentas de reposición, menos cualquier reembolso. Un challenge barato con un drawdown duro puede costar más que uno caro que probablemente aprobarás. Los códigos de descuento cuentan al final, cuando una firma ha pasado todos los demás filtros.',
        ],
      },
      {
        heading: 'Qué haría bajar a una firma en este ranking',
        paragraphs: [
          'Las puntuaciones se mueven cuando se mueven las pruebas: una alerta de un regulador, retrasos repetidos en los pagos, un cambio de reglas aplicado a cuentas existentes, un dominio que deja de servir a la firma o menos transparencia sobre la entidad legal. Cada cambio está fechado en el historial de la firma, así que puedes ver por qué y cuándo cambió una puntuación.',
        ],
      },
    ],
  },
  'goat-funded-trader-avis': {
    intro: 'GOAT Funded Trader es una de las prop firms más visibles de los dos últimos años: descuentos agresivos, muchos modelos y presencia constante en redes sociales. Visibilidad no es lo mismo que fiabilidad. Este análisis separa lo documentado del marketing y pone primero las reglas de la cuenta financiada, porque ahí es donde los traders pierden sus pagos.',
    sections: [
      {
        heading: 'Quién está detrás de GOAT Funded Trader',
        paragraphs: [
          'GOAT Funded Trader se lanzó en mayo de 2023. Es un nombre comercial de Wishes Tower International Limited, una sociedad de Hong Kong, y el trading simulado lo presta Goat Funded LTD en Santa Lucía. Ningún regulador financiero supervisa el servicio. Sus términos describen cuentas simuladas, compras no reembolsables y amplia discreción sobre los pagos, algo habitual en el sector pero que conviene saber antes de comprar.',
          'PropRadar le da 68/100 y la mantiene en vigilancia: la marca es real y paga a los traders, pero su trayectoria es corta y sus condiciones de pago dejan mucho margen de interpretación. PropRadar tiene una relación de afiliación con GOAT Funded Trader; no cambia esta puntuación ni este análisis.',
        ],
      },
      {
        heading: 'La situación en Trustpilot',
        paragraphs: [
          'El 23 de octubre de 2026 Trustpilot no mostraba ningún TrustScore para la empresa. Su perfil indica que la nota no está disponible por un incumplimiento de sus directrices y que Trustpilot eliminó varias reseñas falsas. El perfil sigue mostrando 4.352 reseñas, muy divididas: un 46 % de cinco estrellas y un 40 % de una estrella.',
          'Toma con cautela las afirmaciones de la página principal sobre una nota casi perfecta mientras ese aviso siga ahí. Un perfil de reseñas polarizado suele significar dos experiencias muy distintas: traders que cobraron rápido y traders a los que se les denegó el pago por reglas que no habían leído con atención.',
        ],
      },
      {
        heading: 'Las reglas de la cuenta financiada que más importan',
        paragraphs: [
          'Los modelos de challenge son convencionales. El modelo 2-Step GOAT pide 8 % y luego 6 % con un 4 % de pérdida diaria y un 10 % de pérdida máxima estática; el 2-Step Standard pide 10 % y luego 5 % con 5 % diario y 10 % máximo; el 1-Step pide 10 % con un 3 % de pérdida diaria y un 6 % de pérdida máxima estática. El modelo 3-Step se retiró en agosto de 2026. Estas cifras proceden de un análisis de terceros revisado el 5 de octubre de 2026: confírmalas al pagar.',
          'Las reglas que deciden los pagos empiezan después de aprobar:',
        ],
        bullets: [
          'Goat Guard: en las cuentas financiadas 1-Step y 2-Step, una pérdida flotante del 2 % del saldo inicial reduce tu reparto al 50 %; una segunda activación incumple la cuenta.',
          'Regla de 2 minutos: el beneficio de las operaciones mantenidas menos de dos minutos se elimina al pagar, mientras que las pérdidas de esas operaciones se quedan en la cuenta.',
          'Ventana de noticias: el beneficio obtenido en torno a noticias de alto impacto está limitado al 1 % del saldo inicial.',
          'Tope de beneficio diario: una cuenta financiada puede registrar como máximo 3.000 $ de beneficio al día.',
          'Los modelos instantáneos usan trailing drawdowns y cierran la cuenta con una pérdida flotante del 1 % o 2 % según el modelo.',
        ],
      },
      {
        heading: 'Pagos',
        paragraphs: [
          'El reparto por defecto es del 80 %, con una mejora de pago al 100 % al comprar y un plan de escalado que puede subirlo al 90-95 %. La mayoría de modelos paga cada 14 días, con un mínimo de 100 $ y una comisión de gestión del 3 %. Los dos primeros pagos tienen un tope del menor entre el 6 % del saldo inicial y 10.000 $. Los métodos de pago incluyen Rise, transferencia bancaria, Skrill y cripto, cada uno con su propio límite.',
          'Varias afirmaciones públicas contradicen el centro de ayuda, por ejemplo sobre la rapidez de pago (24 horas frente a 2 días hábiles) y el tamaño máximo de cuenta. Cuando el marketing y los términos no coinciden, a tu pago se le aplican los términos.',
        ],
      },
      {
        heading: 'Para quién encaja GOAT Funded Trader',
        paragraphs: [
          'Puede funcionar para un trader disciplinado, con pérdidas flotantes pequeñas y controladas, operaciones mantenidas bastante más de dos minutos y sin depender de picos de noticias, que busca una entrada barata. Encaja mal con scalpers, traders de noticias y quien deja respirar sus operaciones con grandes drawdowns intradía, porque las reglas de la cuenta financiada apuntan justo a esos comportamientos. Si la claridad de las reglas te importa más que el precio, compárala primero con las firmas mejor puntuadas de nuestro ranking.',
        ],
      },
    ],
  },
  'topstep-review': {
    intro: 'Topstep es el nombre más antiguo del prop trading de futuros: fundada en 2012 en Chicago por Michael Patak, ya ofrecía su Trading Combine años antes de la ola actual de prop firms. Esa trayectoria es su principal fortaleza. Sus debilidades son una oferta solo de futuros, cambios frecuentes de reglas desde finales de 2025 y un límite de pérdida móvil que exige disciplina.',
    sections: [
      {
        heading: '¿Es fiable Topstep?',
        paragraphs: [
          'Topstep es un operador estadounidense consolidado, con una larga trayectoria pública, un centro de ayuda publicado y un introducing broker afiliado, Topstep Brokerage, lanzado a principios de 2026. PropRadar le da 84/100 y no ha registrado ninguna alerta de regulador en su contra. Como en toda prop firm, la evaluación y la Express Funded Account son simuladas: los pagos son recompensas que paga Topstep, no beneficios de trading de una cuenta de corretaje.',
          'En Trustpilot el perfil muestra un TrustScore de 3,7 sobre 14.955 reseñas, con el aviso de Trustpilot de que la empresa puede estar asociada a inversiones de alto riesgo (comprobado el 23 de octubre de 2026). La nota está en la media de la categoría. Las quejas de finales de 2025 se centraron en caídas de la plataforma TopstepX y órdenes stop no ejecutadas.',
        ],
      },
      {
        heading: 'Cómo funciona el Trading Combine',
        paragraphs: [
          'El Trading Combine es la evaluación de Topstep. Existe en tamaños de 50K, 100K y 150K, con objetivos de beneficio de 3.000 $, 6.000 $ y 9.000 $. No hay límite de tiempo ni un mínimo de días de trading. Las posiciones deben cerrarse al final de la sesión: Topstep no permite mantenerlas de noche ni el fin de semana.',
          'El Maximum Loss Limit (MLL) está 2.000 $, 3.000 $ o 4.500 $ por debajo del saldo inicial según el tamaño. Sube a medida que crece tu saldo de cierre diario y nunca baja, pero los incumplimientos se vigilan en tiempo real, pérdidas no realizadas incluidas. En el Combine deja de subir cuando alcanza el saldo inicial (centro de ayuda de Topstep, actualizado el 18 de septiembre de 2026).',
          'El objetivo de consistencia es del 55 %: tu mejor día no puede superar el 55 % del objetivo de beneficio. Si lo supera no suspendes; el objetivo sube a mejor día dividido entre 0,55 (centro de ayuda, 17 de septiembre de 2026). Un límite de pérdida diaria opcional de 1.000 $, 2.000 $ o 3.000 $ detiene el trading durante la sesión sin cerrar la cuenta.',
        ],
      },
      {
        heading: 'Express Funded Account y pagos',
        paragraphs: [
          'Tras aprobar, operas una Express Funded Account (XFA), también simulada, donde empiezan los pagos. La XFA empieza con un saldo de 0 $ y el mismo colchón de MLL por debajo. Desde febrero de 2026 eliges entre dos vías de pago, y la elección es definitiva: la vía Standard exige cinco días ganadores de al menos 150 $ antes de cada pago, mientras que la vía Consistency exige tres días de trading con tu mayor día como máximo en el 40 % del beneficio neto.',
          'Los traders que se unieron a partir del 12 de enero de 2026 reciben el 90 % de los pagos aprobados; los anteriores conservan el 100 % de sus primeros 10.000 $ y después el 90 %. La solicitud mínima de pago es de 125 $. Tras el primer pago el MLL pasa a 0 $, lo que elimina el colchón: un mal día después de retirar puede acabar con la cuenta. Los mejores traders pueden ser invitados a una Live Funded Account con capital real, límites de pérdida diaria obligatorios y una reserva que se libera por etapas.',
        ],
      },
      {
        heading: 'Pros y contras',
        paragraphs: ['Lo que destaca tras leer las reglas actuales:'],
        bullets: [
          'Pro: la trayectoria más larga del prop trading de futuros y un centro de ayuda amplio y documentado.',
          'Pro: sin límite de tiempo ni días mínimos en el Combine; la regla de consistencia sube el objetivo en lugar de suspenderte.',
          'Pro: reparto del 90 % desde el primer dólar para nuevos traders y un pago mínimo bajo de 125 $.',
          'Contra: solo futuros, y toda posición debe estar cerrada al final de la sesión.',
          'Contra: el MLL pasa a 0 $ tras el primer pago, así que retirar pronto elimina tu margen de seguridad.',
          'Contra: las reglas cambiaron varias veces entre noviembre de 2025 y abril de 2026; reléelas antes de cada compra.',
        ],
      },
      {
        heading: 'Para quién encaja Topstep',
        paragraphs: [
          'Topstep encaja con traders intradía de futuros que quieren un operador consolidado y aceptan un límite móvil vigilado en tiempo real. No encaja con traders de forex o CFD, swing traders que mantienen de noche ni con quien elige sobre todo por precio: con la suscripción mensual, una evaluación lenta sale más cara que en competidores de cuota única. Si la comparas con Apex, lee nuestra guía Topstep vs Apex, que compara cada versión de cuenta regla por regla.',
        ],
      },
    ],
  },
  'prop-firm-drawdown': {
    intro: 'El drawdown es la regla que termina con la mayoría de las cuentas de prop firms. Es la cantidad máxima que tu cuenta puede perder, medida desde un punto de referencia. Dos firmas pueden anunciar un "drawdown de 3.000 $" en una cuenta de 50.000 $ y darte un margen completamente distinto, porque el punto de referencia se mueve de forma diferente.',
    sections: [
      {
        heading: 'Límite de pérdida diaria frente a drawdown máximo',
        paragraphs: [
          'La mayoría de las firmas usa dos límites a la vez. El límite de pérdida diaria fija cuánto puedes perder en un día de trading, normalmente medido desde el saldo o el equity de inicio del día. El drawdown máximo fija tu pérdida total durante toda la vida de la cuenta. Romper cualquiera de los dos suele incumplir la cuenta, aunque algunas firmas de futuros solo te detienen el resto de la sesión al tocar el límite diario.',
        ],
      },
      {
        heading: 'Drawdown estático',
        paragraphs: [
          'Un drawdown estático está fijo por debajo de tu saldo inicial y nunca se mueve. En una cuenta de 100.000 $ con un límite estático del 10 %, el suelo es 90.000 $ para siempre. Si llevas la cuenta a 108.000 $, tienes 18.000 $ de margen. Es el modelo más tolerante y es habitual en los challenges de forex/CFD en dos fases.',
        ],
      },
      {
        heading: 'Trailing drawdown (intradía)',
        paragraphs: [
          'Un trailing drawdown intradía sigue tu equity más alto en tiempo real, beneficio no realizado incluido. Ejemplo en una cuenta de 50.000 $ con un límite trailing de 2.500 $: el suelo empieza en 47.500 $. Una operación llega a +1.500 $ no realizados, así que el suelo sube a 49.000 $, aunque después cierres la operación en breakeven. Ahora tienes 1.000 $ de margen en lugar de 2.500 $, sin haber cobrado un céntimo. Es el modelo más estricto y es habitual en cuentas de futuros y de financiación instantánea.',
        ],
      },
      {
        heading: 'Trailing drawdown de fin de día (EOD)',
        paragraphs: [
          'Un trailing drawdown de fin de día solo se mueve al cerrar la jornada, según tu saldo de cierre. Las oscilaciones intradía del beneficio abierto no suben el suelo, lo que lo hace mucho más fácil de gestionar que el trailing intradía. Un detalle que muchos pasan por alto: el suelo solo se mueve al cierre, pero el incumplimiento a menudo se sigue comprobando en tiempo real. Topstep, por ejemplo, ajusta su Maximum Loss Limit con el saldo de cierre diario pero lo vigila en directo, pérdidas no realizadas incluidas.',
        ],
      },
      {
        heading: 'Cuándo deja de moverse: el bloqueo',
        paragraphs: [
          'La mayoría de los modelos trailing dejan de moverse en algún momento, normalmente cuando el suelo alcanza el saldo inicial (o el saldo inicial más un pequeño margen). A partir de ahí el límite se comporta como uno estático. Por eso los primeros días de una cuenta trailing son los más peligrosos: construye el margen hasta el nivel de bloqueo antes de abrir posiciones más grandes.',
        ],
      },
      {
        heading: 'Límites sobre el saldo o sobre el equity',
        paragraphs: [
          'Un límite sobre el saldo solo cuenta las operaciones cerradas. Un límite sobre el equity cuenta también las posiciones abiertas, así que una pérdida flotante puede incumplir la cuenta aunque después hubieras cerrado la operación en beneficio. La mayoría de las firmas modernas mide los incumplimientos sobre el equity. Lee la definición en los términos, no en la tabla resumen.',
        ],
      },
      {
        heading: 'Cómo elegir',
        paragraphs: ['Adapta el modelo de drawdown al comportamiento de tus operaciones:'],
        bullets: [
          'Operaciones que a menudo van muy en beneficio antes de volver: evita el trailing intradía, prefiere estático o EOD.',
          'Scalps pequeños y frecuentes con stops ajustados: un límite trailing es manejable si el nivel de bloqueo se alcanza rápido.',
          'Swing trades con stops amplios: necesitas un límite estático y más margen que tu pérdida abierta típica.',
          'Dimensiona siempre las posiciones según el margen restante hasta el suelo, no según el tamaño de cuenta anunciado.',
        ],
      },
    ],
  },
};

export default es;
