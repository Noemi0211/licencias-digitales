/* ================================================================
   data.js — Datos de licencias y preguntas
   ================================================================ */

var LICENCIAS = [
  { id:"dp", nombre:"Dominio público", img:"img/Dominio-publico.png", desc:"Obras cuyos derechos han expirado o fueron renunciados. Cualquiera puede usarlas libremente." },
  { id:"co", nombre:"Copyright", img:"img/Copyright.png", desc:"Todos los derechos reservados; requiere permiso del autor para cualquier uso." },
  { id:"cl", nombre:"Copyleft", img:"img/Copyleft.png", desc:"Permite libre uso y modificación, siempre que las derivadas mantengan la misma licencia." },
  { id:"cf", nombre:"Copyfarleft", img:"img/Copyfarleft.png", desc:"Copyleft que impide la apropiación privativa del beneficio económico." },
  { id:"by", nombre:"BY", img:"img/BY.png", desc:"Requiere citar al autor original en cualquier uso o distribución." },
  { id:"sa", nombre:"SA", img:"img/SA.png", desc:"Exige que las obras derivadas se distribuyan con la misma licencia." },
  { id:"nc", nombre:"NC", img:"img/NC.png", desc:"Prohíbe el uso comercial; solo permite uso educativo o personal." },
  { id:"nd", nombre:"ND", img:"img/ND.png", desc:"No permite crear obras derivadas; la obra solo puede copiarse tal cual." },
  { id:"cc-by", nombre:"CC BY", img:"img/CC_BY.png", desc:"Reconocimiento. Obliga a citar al autor. La más permisiva de CC." },
  { id:"cc-sa", nombre:"CC BY-SA", img:"img/CC_BY_SA.png", desc:"Reconocimiento + Compartir Igual." },
  { id:"cc-nc", nombre:"CC BY-NC", img:"img/CC_BY_NC.png", desc:"Reconocimiento + No Comercial." },
  { id:"cc-nc-sa", nombre:"CC BY-NC-SA", img:"img/CC_BY_NC_SA.png", desc:"Reconocimiento + No Comercial + Compartir Igual." },
  { id:"cc-nc-nd", nombre:"CC BY-NC-ND", img:"img/CC_BY_NC_ND.png", desc:"La más restrictiva de CC." },
  { id:"cc-nd", nombre:"CC BY-ND", img:"img/CC_BY_ND.png", desc:"Reconocimiento + Sin Derivadas." }
];

function getLicenciaByNombre(nombre) {
  for (var i = 0; i < LICENCIAS.length; i++) {
    if (LICENCIAS[i].nombre === nombre) return LICENCIAS[i];
  }
  return null;
}

/* --- Paso 1: Evaluación Inicial (8 preguntas) --- */

var EI_PREGUNTAS = [
  { id:1, tipo:"multi", pregunta:"¿Qué es el Copyright?", imagen:"img/Copyright.png",
    opciones:["Un sistema que permite copiar libremente cualquier obra","Un conjunto de derechos que otorgan al autor el control exclusivo sobre su obra","Una licencia que prohíbe cualquier uso de la obra","Un tipo de patente tecnológica"],
    correcta:1, explicacion:"El Copyright otorga al creador derechos exclusivos sobre su obra, incluyendo reproducción, distribución y uso público." },
  { id:2, tipo:"vf", pregunta:"El Copyleft permite que cualquier persona copie, modifique y distribuya una obra, siempre que las modificaciones se distribuyan bajo los mismos términos.", imagen:"img/Copyleft.png",
    opciones:["Verdadero","Falso"], correcta:0, explicacion:"El Copyleft utiliza los derechos de autor para garantizar la libertad de copia, distribución y modificación." },
  { id:3, tipo:"multi", pregunta:"¿Cuáles son las siglas CC en el contexto de licencias digitales?", imagen:"img/CC.png",
    opciones:["Creative Control","Creative Commons","Copy Control","Content Copyright"],
    correcta:1, explicacion:"CC significa Creative Commons, una organización que ofrece licencias gratuitas para compartir obras." },
  { id:4, tipo:"multi", pregunta:"¿Qué es el Dominio Público?", imagen:"img/Dominio-publico.png",
    opciones:["Obras protegidas por Copyright","Obras cuyos derechos de autor han expirado o fueron renunciados","Obras solo accesibles por internet","Obras gubernamentales exclusivamente"],
    correcta:1, explicacion:"Las obras en Dominio Público tienen derechos vencidos o cedidos y pueden usarse libremente." },
  { id:5, tipo:"vf", pregunta:"Una obra en Dominio Público puede ser usada por cualquier persona sin necesidad de permiso ni atribución.", imagen:"img/Dominio-publico.png",
    opciones:["Verdadero","Falso"], correcta:0, explicacion:"Las obras en Dominio Público no tienen restricciones de derechos de autor." },
  { id:6, tipo:"multi", pregunta:"¿Qué es el Copyfarleft?", imagen:"img/Copyfarleft.png",
    opciones:["Una licencia que solo permite copias de izquierda a derecha","Una variante del Copyleft que restringe la distribución a empresas","Un sistema de patentes gratuitas","Una forma de Copyright tradicional"],
    correcta:1, explicacion:"El Copyfarleft permite la libre distribución pero restringe que grandes empresas obtengan beneficios sin contribuir." },
  { id:7, tipo:"vf", pregunta:"El Copyright impide que los herederos del autor hereden los derechos sobre una obra.", imagen:"img/Copyright.png",
    opciones:["Verdadero","Falso"], correcta:1, explicacion:"El Copyright es heredable; los derechos pasan a los herederos durante un período legal." },
  { id:8, tipo:"vf", pregunta:"Creative Commons es una organización sin fines de lucro que ofrece licencias gratuitas para compartir creatividad.", imagen:"img/CC.png",
    opciones:["Verdadero","Falso"], correcta:0, explicacion:"Creative Commons es una organización internacional sin ánimo de lucro que facilita el uso y compartición de obras." }
];

/* --- Paso 4: Práctica — Identificar licencia (5 preguntas) --- */

var PRAC_PREGUNTAS = [
  { nombre:"CC BY", img:"img/CC_BY.png" },
  { nombre:"CC BY-NC-SA", img:"img/CC_BY_NC_SA.png" },
  { nombre:"Copyright", img:"img/Copyright.png" },
  { nombre:"Dominio público", img:"img/Dominio-publico.png" },
  { nombre:"CC BY-ND", img:"img/CC_BY_ND.png" }
];

var PRAC_OPCIONES = [
  "Dominio público","Copyright","Copyleft","Copyfarleft",
  "BY","SA","NC","ND",
  "CC BY","CC BY-SA","CC BY-NC","CC BY-NC-SA","CC BY-NC-ND","CC BY-ND"
];

/* --- Paso 5: Juego — Detective de Licencias (10 escenarios) --- */

var GAME_SCENARIOS = [
  { scenario:"Soy enfermera y quiero usar una imagen de un libro de texto en mi presentación del hospital, dando crédito al autor. ¿Qué licencia necesito?", correcta:"CC BY",
    wrong:["Copyright","CC BY-NC-ND"], explicacion:"CC BY permite usar la obra dando crédito al autor, incluso en contextos profesionales." },
  { scenario:"Soy estudiante y he creado un manual de cuidados. Quiero que cualquiera pueda copiarlo y mejorarlo, pero que siempre se mantenga libre. ¿Qué licencia debo poner?", correcta:"CC BY-SA",
    wrong:["CC BY-NC","Copyright"], explicacion:"CC BY-SA (Compartir Igual) exige que las derivadas se distribuyan con la misma licencia." },
  { scenario:"Soy profesora y quiero compartir mis apuntes en internet. No quiero que nadie los venda, pero sí que los copien y modifiquen. ¿Qué licencia elijo?", correcta:"CC BY-NC",
    wrong:["CC BY","ND"], explicacion:"CC BY-NC permite copiar y modificar, pero prohíbe el uso comercial." },
  { scenario:"Soy fotógrafo y quiero vender mis fotos. No quiero que nadie las use sin mi permiso. ¿Qué tipo de protección necesito?", correcta:"Copyright",
    wrong:["Dominio público","CC BY"], explicacion:"El Copyright reserva todos los derechos; nadie puede usar la obra sin permiso." },
  { scenario:"Quiero usar una obra antigua de un autor fallecido hace 150 años en mi proyecto escolar. ¿Necesito pedir permiso a alguien?", correcta:"Dominio público",
    wrong:["Copyright","Copyleft"], explicacion:"Tras décadas, los derechos expiran y la obra pasa a Dominio Público." },
  { scenario:"He creado un curso online y quiero que otros profesores puedan adaptarlo para sus clases, pero no quiero que lo vendan. ¿Qué licencia me conviene?", correcta:"CC BY-NC-SA",
    wrong:["CC BY","SA"], explicacion:"CC BY-NC-SA permite adaptar la obra solo para usos no comerciales, y exige que las derivadas lleven la misma licencia." },
  { scenario:"Soy médico y quiero compartir un artículo científico. Cualquiera puede leerlo y citarlo, pero no quiero que lo modifiquen. ¿Qué licencia elijo?", correcta:"CC BY-ND",
    wrong:["CC BY","ND"], explicacion:"CC BY-ND permite compartir y citar, pero no permite crear versiones modificadas." },
  { scenario:"Quiero publicar una obra y que cualquiera pueda usarla para cualquier fin, sin restricciones y sin necesidad de attribution. ¿Qué debo hacer?", correcta:"Dominio público",
    wrong:["CC BY","Copyleft"], explicacion:"CC0 o Dominio Público permiten el uso sin restricciones. CC BY sí requiere atribución." },
  { scenario:"Soy programadora y quiero que mi software sea libre: que cualquiera pueda ejecutarlo, estudiarlo, modificarlo y redistribuir versiones mejoradas. ¿Qué tipo de licencia necesito?", correcta:"Copyleft",
    wrong:["Copyright","ND"], explicacion:"El Copyleft garantiza que las obras derivadas mantengan la misma libertad de uso." },
  { scenario:"He creado un recurso educativo. No quiero que grandes empresas lo usen para ganar dinero sin contribuir. ¿Qué licencia protege mi obra de eso?", correcta:"Copyfarleft",
    wrong:["CC BY","NC"], explicacion:"El Copyfarleft va más allá del NC: prohíbe explícitamente la apropiación privativa del beneficio económico." }
];

/* --- Paso 6: Evaluación Final (15 preguntas) --- */

var EF_PREGUNTAS = [
  { id:"q1", image:"img/Copyright.png", question:"¿Qué representa el símbolo de Copyright (©) y qué derechos otorga automáticamente a su autor?",
    options:[{l:"a",t:"Permite la distribución libre de la obra siempre que se cite al autor."},{l:"b",t:"Es un registro obligatorio para proteger obras digitales en internet."},{l:"c",t:"Solo protege las obras publicadas en papel de forma impresa."},{l:"d",t:"Reserva todos los derechos de explotación de la obra al autor, prohibiendo su uso sin autorización."}],
    correct:"d", explanation:"El Copyright reserva todos los derechos de explotación al autor." },
  { id:"q2", image:"img/Copyleft.png", question:"¿En qué se diferencia el Copyleft del Copyright?",
    options:[{l:"a",t:"El Copyleft es un sistema de patentes para software de código abierto."},{l:"b",t:"El Copyleft permite libre distribución y modificación, exigiendo que las derivadas mantengan la misma licencia."},{l:"c",t:"El Copyleft prohíbe cualquier redistribución de la obra original."},{l:"d",t:"El Copyleft solo funciona para obras musicales y audiovisuales."}],
    correct:"b", explanation:"El Copyleft permite la libre distribución con la condición de que las derivadas mantengan la misma licencia." },
  { id:"q3", image:"img/Copyfarleft.png", question:"¿Qué característica principal define al Copyfarleft?",
    options:[{l:"a",t:"Permite cualquier uso incluido el comercial, sin restricciones."},{l:"b",t:"Es una licencia que solo admite copia privada sin redistribución."},{l:"c",t:"Prohíbe su uso por entidades con fines de lucro, aunque permite la distribución."},{l:"d",t:"Es idéntica al Copyleft estándar sin ninguna variación."}],
    correct:"c", explanation:"El Copyfarleft prohíbe la apropiación privativa del beneficio económico." },
  { id:"q4", image:"img/Dominio-publico.png", question:"¿Qué significa que una obra se encuentre en Dominio Público?",
    options:[{l:"a",t:"La obra está custodiada por el Estado y no puede usarse sin permiso gubernamental."},{l:"b",t:"Los derechos de explotación han expirado, han sido cedidos o el autor nunca los reivindicó."},{l:"c",t:"La obra solo puede consultarse en bibliotecas públicas de forma presencial."},{l:"d",t:"Es una obra que nunca ha tenido protección legal en ningún país."}],
    correct:"b", explanation:"Las obras en Dominio Público pueden usarse libremente." },
  { id:"q5", image:"img/CC.png", question:"¿Cuál es el objetivo principal de las licencias Creative Commons?",
    options:[{l:"a",t:"Sustituir completamente al Copyright en todos los ámbitos."},{l:"b",t:"Regular exclusivamente el uso comercial de obras digitales."},{l:"c",t:"Facilitar la distribución y reutilización legal de obras creativas mediante licencias estándar."},{l:"d",t:"Crear un registro internacional obligatorio para autores digitales."}],
    correct:"c", explanation:"Creative Commons facilita la distribución y reutilización legal de obras." },
  { id:"q6", image:"img/CC_BY.png", question:"¿Qué significa la licencia Creative Commons BY (Reconocimiento)?",
    options:[{l:"a",t:"Solo permite el uso no comercial de la obra."},{l:"b",t:"Prohíbe la modificación y la creación de obras derivadas."},{l:"c",t:"Permite distribuir, modificar y usar la obra incluso con fines comerciales, siempre que se dé crédito al autor."},{l:"d",t:"Obliga a compartir la obra derivada bajo la misma licencia CC BY."}],
    correct:"c", explanation:"CC BY es la más permisiva: permite todo siempre que se dé crédito." },
  { id:"q7", image:"img/CC_BY_SA.png", question:"¿Qué condición adicional introduce CC BY-SA respecto a CC BY?",
    options:[{l:"a",t:"No permite el uso comercial de la obra."},{l:"b",t:"Prohíbe la redistribución en medios digitales."},{l:"c",t:"Solo permite el uso en entornos educativos y sin ánimo de lucro."},{l:"d",t:"Obliga a que cualquier obra derivada se distribuya bajo la misma licencia o una compatible."}],
    correct:"d", explanation:"CC BY-SA añade la condición de Compartir Igual." },
  { id:"q8", image:"img/CC_BY_NC.png", question:"¿Qué restricción añade el atributo NC (NoComercial) en CC BY-NC?",
    options:[{l:"a",t:"Obliga a compartir la obra derivada bajo la misma licencia."},{l:"b",t:"Prohíbe la redistribución completa de la obra original."},{l:"c",t:"Permite la redistribución y modificación, pero exclusivamente para fines no comerciales."},{l:"d",t:"Solo la pueden usar organismos gubernamentales y sin fines de lucro."}],
    correct:"c", explanation:"El atributo NC permite solo usos no comerciales." },
  { id:"q9", image:"img/CC_BY_ND.png", question:"¿Qué implica el atributo ND (SinObraDerivada) en CC BY-ND?",
    options:[{l:"a",t:"Solo permite el uso no comercial de la obra."},{l:"b",t:"Prohíbe cualquier redistribución de la obra, incluso sin modificaciones."},{l:"c",t:"No permite la creación de obras derivadas; la obra debe compartirse sin modificaciones."},{l:"d",t:"Obliga a citar al autor en cada copia realizada."}],
    correct:"c", explanation:"ND prohíbe la creación de obras derivadas." },
  { id:"q10", image:"img/CC_BY_NC_SA.png", question:"Si encuentras una imagen con licencia CC BY-NC-SA, ¿qué puedes hacer con ella?",
    options:[{l:"a",t:"Usarla en un proyecto comercial y venderla libremente."},{l:"b",t:"Compartirla y modificarla para fines no comerciales, dando crédito y distribuyendo bajo la misma licencia."},{l:"c",t:"Modificarla y venderla como producto propio sin restricciones."},{l:"d",t:"Usarla libremente sin mencionar al autor ni dar ningún crédito."}],
    correct:"b", explanation:"CC BY-NC-SA permite usar no comercialmente con atribución y misma licencia." },
  { id:"q11", image:"img/CC_BY_NC_ND.png", question:"¿Por qué CC BY-NC-ND se considera la más restrictiva de Creative Commons?",
    options:[{l:"a",t:"Permite cualquier uso siempre que se dé crédito al autor."},{l:"b",t:"Solo permite descargar para uso personal y privado, sin compartirla ni modificarla."},{l:"c",t:"Obliga a compartir bajo la misma licencia con uso comercial permitido."},{l:"d",t:"Permite redistribución libre sin ninguna condición."}],
    correct:"b", explanation:"CC BY-NC-ND solo permite descarga para uso personal." },
  { id:"q12", image:"img/CC.png", question:"¿Cuáles son las cuatro libertades esenciales del Software Libre (FSF)?",
    options:[{l:"a",t:"Usar, copiar, distribuir y vender sin respetar ninguna licencia."},{l:"b",t:"Eliminar el código fuente, compilar en formatos propietarios y redistribuir."},{l:"c",t:"Ejecutar con cualquier propósito, estudiar y modificar, redistribuir copias, y distribuir versiones modificadas."},{l:"d",t:"Usar sin límites y compartir solo con amigos cercanos."}],
    correct:"c", explanation:"Las 4 libertades: ejecutar, estudiar/modificar, redistribuir, distribuir versiones modificadas." },
  { id:"q13", image:"img/Copyleft.png", question:"¿Qué es la herramienta CC0 (Creative Commons Zero)?",
    options:[{l:"a",t:"Una licencia que solo permite uso no comercial y con atribución."},{l:"b",t:"No es una licencia, sino una herramienta jurídica mediante la cual el autor renuncia a todos sus derechos."},{l:"c",t:"Un Copyright renovable cada 50 años que protege al autor."},{l:"d",t:"Una licencia que obliga a dar crédito y compartir bajo la misma licencia."}],
    correct:"b", explanation:"CC0 es una renuncia de derechos, no una licencia." },
  { id:"q14", image:"img/Copyright.png", question:"¿Qué son los derechos morales en la propiedad intelectual?",
    options:[{l:"a",t:"Son derechos irrenunciables que protegen la integridad de la obra y la conexión personal del autor."},{l:"b",t:"Son los mismos derechos de explotación pero aplicados exclusivamente en línea."},{l:"c",t:"Son derechos que permiten al autor vender su obra al mejor postor."},{l:"d",t:"Son derechos que se pierden automáticamente al licenciar con Creative Commons."}],
    correct:"a", explanation:"Los derechos morales son irrenunciables e inalienables." },
  { id:"q15", image:"img/Dominio-publico.png", question:"¿Cuál es la relación entre Creative Commons y el Copyright?",
    options:[{l:"a",t:"Creative Commons sustituye al Copyright en todos los casos."},{l:"b",t:"Son sistemas completamente incompatibles entre sí."},{l:"c",t:"Creative Commons solo funciona si el autor renuncia a todos sus derechos."},{l:"d",t:"Creative Commons se basa en el Copyright: el autor decide qué usos permite de forma anticipada."}],
    correct:"d", explanation:"Creative Commons se fundamenta en el Copyright." }
];
