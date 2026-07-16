/* =============================================
   Script para actividad de licencias digitales
   ============================================= */

// --- Configuración de la sesión ---
var NUM_PREGUNTAS = 5; // Número de preguntas por sesión

// --- Base de datos de licencias ---
var licencias = [
  {
    id: "dominio-publico",
    nombre: "Dominio público",
    img: "Dominio_p%C3%BAblico.png",
    descripcion: "Obras no protegidas por derechos de autor, ya sea porque han expirado o porque el autor ha renunciado a ellos. Cualquiera puede copiar, modificar, distribuir y usar la obra libremente, sin necesidad de atribución."
  },
  {
    id: "copyright",
    nombre: "Copyright",
    img: "Copyright.png",
    descripcion: "Todos los derechos reservados. Nadie puede usar, copiar ni modificar la obra sin el permiso explícito del titular de los derechos."
  },
  {
    id: "copyleft",
    nombre: "Copyleft",
    img: "Copyleft.png",
    descripcion: "Permite libre uso y modificación de la obra, siempre que las obras derivadas mantengan la misma licencia. Es la base filosófica de las licencias Creative Commons Compartir Igual."
  },
  {
    id: "copyfarleft",
    nombre: "Copyfarleft",
    img: "Copyfarleft.png",
    descripcion: "Variante del copyleft que impide la apropiación privativa del beneficio económico: las obras derivadas solo pueden distribuirse bajo condiciones que impidan el lucro privado."
  },
  {
    id: "by",
    nombre: "BY",
    img: "BY.png",
    descripcion: "Elemento de atribución: obliga a citar al autor original de la obra en cualquier uso o distribución. Es el elemento común a todas las licencias Creative Commons."
  },
  {
    id: "sa",
    nombre: "SA",
    img: "SA.png",
    descripcion: "Elemento Compartir Igual (ShareAlike): exige que las obras derivadas se distribuyan con la misma licencia que la obra original."
  },
  {
    id: "nc",
    nombre: "NC",
    img: "NC.png",
    descripcion: "Elemento No Comercial (NonCommercial): prohíbe el uso comercial de la obra. Solo permite uso educativo, investigador o personal."
  },
  {
    id: "nd",
    nombre: "ND",
    img: "ND.png",
    descripcion: "Elemento Sin Derivadas (NoDerivatives): no permite crear obras derivadas. La obra solo puede copiarse y distribuirse tal cual."
  },
  {
    id: "cc-by",
    nombre: "CC BY",
    img: "CC_BY.png",
    descripcion: "Reconocimiento (Attribution): obliga a citar al autor original de la obra en cualquier uso o distribución. Permite compartir, copiar, distribuir y adaptar la obra, incluso con fines comerciales."
  },
  {
    id: "cc-by-sa",
    nombre: "CC BY-SA",
    img: "CC_BY_SA.png",
    descripcion: "Reconocimiento + Compartir Igual: se puede adaptar y usar la obra incluso comercialmente, pero la obra derivada debe llevar la misma licencia."
  },
  {
    id: "cc-by-nc",
    nombre: "CC BY-NC",
    img: "CC_BY_NC.png",
    descripcion: "Reconocimiento + No Comercial: solo permite adaptar la obra para usos no comerciales. Las obras derivadas no necesitan mantener la misma licencia."
  },
  {
    id: "cc-by-nc-sa",
    nombre: "CC BY-NC-SA",
    img: "CC_BY_NC_SA.png",
    descripcion: "Reconocimiento + No Comercial + Compartir Igual: solo uso no comercial, y la obra derivada debe llevar la misma licencia."
  },
  {
    id: "cc-by-nc-nd",
    nombre: "CC BY-NC-ND",
    img: "CC_BY_NC_ND.png",
    descripcion: "Reconocimiento + No Comercial + Sin Derivadas: la licencia más restrictiva de Creative Commons. Permite copiar y compartir la obra, pero no permite modificarla ni usarla con fines comerciales."
  },
  {
    id: "cc-by-nd",
    nombre: "CC BY-ND",
    img: "CC_BY_ND.png",
    descripcion: "Reconocimiento + Sin Derivadas: permite usar y distribuir la obra, pero no permite modificarla ni crear obras derivadas."
  }
];

// --- Estado de la sesión actual ---
var actual = null;             // Licencia actual mostrada
var respuestaAlumno = null;    // Respuesta seleccionada
var preguntas = [];            // Pool de índices de licencias seleccionadas para esta sesión
var indicePregunta = 0;        // Índice actual en el pool (0-based)
var aciertos = 0;              // Contador de aciertos
var historial = [];            // Array de { licencia, respuesta, correcta } para cada pregunta respondida
var CLAVE_INFOGRAFIA = "infografiaVista";

/* =============================================
   Utilidades
   ============================================= */

/**
 * Mezcla un array aleatoriamente (Fisher-Yates).
 * @param {Array} arr - Array a mezclar (se modifica in situ)
 */
function mezclarArray(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

/**
 * Busca una licencia en el array por su nombre.
 * @param {string} nombre
 * @returns {Object|null}
 */
function buscarLicencia(nombre) {
  for (var i = 0; i < licencias.length; i++) {
    if (licencias[i].nombre === nombre) {
      return licencias[i];
    }
  }
  return null;
}

/* =============================================
   Gestión de pantallas
   ============================================= */

/**
 * Oculta todas las pantallas y muestra la indicada.
 * Si es pantalla 3, carga la pregunta actual del pool.
 * @param {number} num - Número de pantalla (1-5)
 */
function siguiente(num) {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    lecturaEnCurso = false;
  }

  var pantallas = document.querySelectorAll(".pantalla");
  for (var i = 0; i < pantallas.length; i++) {
    pantallas[i].classList.add("oculto");
  }

  var pantalla = document.getElementById("pantalla" + num);
  pantalla.classList.remove("oculto");

  if (num === 3) {
    cargarPreguntaActual();
  }

  window.scrollTo(0, 0);
}

/* =============================================
   Lógica de sesión: inicio, preguntas, resultado
   ============================================= */

/**
 * Inicia una nueva sesión: mezcla las licencias, selecciona NUM_PREGUNTAS
 * y resetea contadores.
 */
function iniciarSesion() {
  // Crear array de índices [0, 1, 2, ..., N-1]
  var indices = [];
  for (var i = 0; i < licencias.length; i++) {
    indices.push(i);
  }
  mezclarArray(indices);

  // Limitar a NUM_PREGUNTAS (o al total si hay menos licencias)
  var numPreguntas = Math.min(NUM_PREGUNTAS, indices.length);
  preguntas = indices.slice(0, numPreguntas);

  indicePregunta = 0;
  aciertos = 0;
  historial = [];
  actual = null;
  respuestaAlumno = null;
}

/**
 * Carga la pregunta actual del pool en la pantalla de actividad.
 * Actualiza la barra de progreso.
 */
function cargarPreguntaActual() {
  var total = preguntas.length;
  var actualNum = indicePregunta + 1;

  // Seleccionar licencia del pool
  var indiceLicencia = preguntas[indicePregunta];
  actual = licencias[indiceLicencia];

  // Cargar imagen
  var img = document.getElementById("imagenLicencia");
  img.src = "img/" + actual.img;
  img.alt = "Imagen representativa de la licencia " + actual.nombre;

  // Resetear select y panel de ayuda
  document.getElementById("respuesta").value = "";
  document.getElementById("panelAyuda").classList.add("oculto");

  // Actualizar barra de progreso
  document.getElementById("textoProgreso").innerText = "Pregunta " + actualNum + " de " + total;
  var porcentaje = (indicePregunta / total) * 100;
  document.getElementById("progresoFill").style.width = porcentaje + "%";
}

/**
 * Comprueba la respuesta del alumno, registra el resultado,
 * y muestra la pantalla de feedback con el botón adecuado.
 */
function comprobar() {
  respuestaAlumno = document.getElementById("respuesta").value;

  if (respuestaAlumno === "") {
    alert("Por favor, selecciona una opción antes de comprobar.");
    return;
  }

  var esCorrecta = (respuestaAlumno === actual.nombre);

  // Registrar en historial
  historial.push({
    licencia: actual.nombre,
    respuesta: respuestaAlumno,
    correcta: esCorrecta,
    imgCorrecta: actual.img,
    imgElegida: esCorrecta ? null : (buscarLicencia(respuestaAlumno) ? buscarLicencia(respuestaAlumno).img : null)
  });

  if (esCorrecta) {
    aciertos++;
  }

  // Ir a pantalla 4
  siguiente(4);

  // Mostrar imagen correcta
  var imgCorrecta = document.getElementById("imagenResultado");
  imgCorrecta.src = "img/" + actual.img;
  imgCorrecta.alt = "Imagen de la licencia correcta: " + actual.nombre;

  // Mostrar imagen elegida si falló
  var contenedorElegida = document.getElementById("contenedorImgElegida");
  if (!esCorrecta) {
    contenedorElegida.classList.remove("oculto");
    var imgElegida = document.getElementById("imagenElegida");
    var licenciaElegida = buscarLicencia(respuestaAlumno);
    if (licenciaElegida) {
      imgElegida.src = "img/" + licenciaElegida.img;
      imgElegida.alt = "Imagen de la licencia elegida: " + respuestaAlumno;
    } else {
      imgElegida.src = "";
      imgElegida.alt = "No se encontró imagen para " + respuestaAlumno;
    }
  } else {
    contenedorElegida.classList.add("oculto");
  }

  // Texto de resultado
  var textoResultado = document.getElementById("textoResultado");
  var explicacion = document.getElementById("explicacionLicencia");

  if (esCorrecta) {
    textoResultado.className = "texto-resultado correcto";
    textoResultado.innerHTML = "✅ Correcto. La licencia de la imagen es <strong>" + actual.nombre + "</strong>.";
  } else {
    textoResultado.className = "texto-resultado incorrecto";
    textoResultado.innerHTML = "❌ Incorrecto. La licencia correcta es <strong>" + actual.nombre + "</strong>.";
  }

  explicacion.innerHTML = "<strong>¿Qué significa " + actual.nombre + "?</strong> " + actual.descripcion;

  // Mostrar el botón adecuado: "Siguiente pregunta" o "Ver resultado"
  var esUltimaPregunta = (indicePregunta >= preguntas.length - 1);
  document.getElementById("btnSiguientePregunta").classList.toggle("oculto", esUltimaPregunta);
  document.getElementById("btnVerResultado").classList.toggle("oculto", !esUltimaPregunta);
}

/**
 * Avanza a la siguiente pregunta o muestra el resultado final.
 */
function siguientePregunta() {
  indicePregunta++;
  if (indicePregunta < preguntas.length) {
    siguiente(3);
  } else {
    mostrarResultado();
  }
}

/**
 * Muestra la pantalla 5 con el resumen de puntuación
 * y envía la nota al LMS si SCORM está disponible.
 */
function mostrarResultado() {
  siguiente(5);

  var total = preguntas.length;
  var porcentaje = Math.round((aciertos / total) * 100);

  // Círculo de resultado con color según nota
  var circulo = document.getElementById("circuloResultado");
  if (porcentaje >= 80) {
    circulo.className = "resultado-circulo verde";
  } else if (porcentaje >= 50) {
    circulo.className = "resultado-circulo naranja";
  } else {
    circulo.className = "resultado-circulo rojo";
  }

  document.getElementById("porcentajeResultado").innerText = porcentaje + "%";

  // Texto descriptivo
  var textoDetalle = document.getElementById("textoDetalle");
  if (porcentaje === 100) {
    textoDetalle.innerText = "¡Excelente! Has acertado todas las preguntas.";
  } else if (porcentaje >= 80) {
    textoDetalle.innerText = "¡Muy bien! Has superado la actividad con nota.";
  } else if (porcentaje >= 50) {
    textoDetalle.innerText = "Has aprobado, pero revisa las licencias que fallaste.";
  } else {
    textoDetalle.innerText = "No has superado la actividad. Repasa la infografía y vuelve a intentarlo.";
  }

  // Desglose detallado
  var desglose = document.getElementById("desgloseResultados");
  var html = '<table class="tabla-desglose"><thead><tr><th>Pregunta</th><th>Tu respuesta</th><th>Resultado</th></tr></thead><tbody>';
  for (var i = 0; i < historial.length; i++) {
    var h = historial[i];
    var icono = h.correcta ? "✅" : "❌";
    var claseFila = h.correcta ? "fila-correcta" : "fila-incorrecta";
    html += '<tr class="' + claseFila + '">';
    html += '<td>' + h.licencia + '</td>';
    html += '<td>' + (h.respuesta === h.licencia ? "—" : h.respuesta) + '</td>';
    html += '<td>' + icono + '</td>';
    html += '</tr>';
  }
  html += '</tbody></table>';
  desglose.innerHTML = html;

  // Enviar puntuación a SCORM
  enviarPuntuacionSCORM(aciertos, total);
}

/**
 * Envía la puntuación al LMS a través de la API SCORM 1.2.
 * @param {number} aciertos - Número de respuestas correctas
 * @param {number} total - Total de preguntas
 */
function enviarPuntuacionSCORM(aciertos, total) {
  if (scormAPI) {
    var score = Math.round((aciertos / total) * 100);
    scormAPI.LMSSetValue("cmi.core.score.min", "0");
    scormAPI.LMSSetValue("cmi.core.score.max", "100");
    scormAPI.LMSSetValue("cmi.core.score.raw", String(score));
    scormAPI.LMSCommit("");
  }
}

/**
 * Reinicia la actividad: recarga la página.
 */
function reiniciar() {
  location.reload();
}

/* =============================================
   Pantalla 1 y 2: infografía diaria
   ============================================= */

function infografiaVistaHoy() {
  var fechaGuardada = localStorage.getItem(CLAVE_INFOGRAFIA);
  var hoy = new Date().toISOString().slice(0, 10);
  return fechaGuardada === hoy;
}

function marcarInfografiaVista() {
  var hoy = new Date().toISOString().slice(0, 10);
  localStorage.setItem(CLAVE_INFOGRAFIA, hoy);
}

/**
 * Botón "Empezar": decide si mostrar infografía o saltarla.
 * Al pasar a pantalla 3, inicia la sesión de preguntas.
 */
function empezar() {
  iniciarSesion();
  if (infografiaVistaHoy()) {
    siguiente(3);
  } else {
    siguiente(2);
  }
}

function continuarDesdeInfografia() {
  marcarInfografiaVista();
  iniciarSesion();
  siguiente(3);
}

/* =============================================
   Panel de ayuda
   ============================================= */

function toggleAyuda() {
  var panel = document.getElementById("panelAyuda");
  panel.classList.toggle("oculto");
}

/* =============================================
   Accesibilidad: síntesis de voz
   ============================================= */

var lecturaEnCurso = false;

function escucharContenido() {
  if (!("speechSynthesis" in window)) {
    alert("Tu navegador no soporta la función de lectura en voz alta.");
    return;
  }

  if (lecturaEnCurso) {
    window.speechSynthesis.cancel();
    lecturaEnCurso = false;
    return;
  }

  // Detectar pantalla activa
  var pantallaActiva = null;
  for (var i = 1; i <= 5; i++) {
    var p = document.getElementById("pantalla" + i);
    if (p && !p.classList.contains("oculto")) {
      pantallaActiva = i;
      break;
    }
  }

  if (!pantallaActiva) return;

  var texto = "";

  if (pantallaActiva === 1) {
    texto += "Uso legal de contenidos digitales. ";
    texto += "En esta actividad aprenderás a identificar distintos tipos de licencias de uso ";
    texto += "de contenidos digitales: Creative Commons, dominio público, copyright y más. ";
    texto += "Se te mostrará una imagen con un tipo de licencia y deberás indicar cuál es ";
    texto += "seleccionando la opción correcta.";

  } else if (pantallaActiva === 2) {
    texto += "Repaso de contenidos. ";
    texto += "Antes de comenzar, revisa la infografía con el resumen de las licencias más habituales. ";

  } else if (pantallaActiva === 3) {
    texto += "Pregunta " + (indicePregunta + 1) + " de " + preguntas.length + ". ";
    texto += "Identifica la licencia. ";
    texto += "Mira la imagen que se muestra y selecciona la licencia que corresponde. ";
    if (actual) {
      texto += "Esta imagen representa la licencia " + actual.nombre + ". ";
      texto += actual.descripcion + " ";
    }
    texto += "Las opciones disponibles son: ";
    var select = document.getElementById("respuesta");
    for (var j = 1; j < select.options.length; j++) {
      texto += select.options[j].value + ". ";
    }

  } else if (pantallaActiva === 4) {
    texto += "Resultado. ";
    if (respuestaAlumno === actual.nombre) {
      texto += "Correcto. La licencia de la imagen es " + actual.nombre + ". ";
    } else {
      texto += "Incorrecto. La licencia correcta es " + actual.nombre + ". ";
    }
    texto += "¿Qué significa " + actual.nombre + "? " + actual.descripcion;

  } else if (pantallaActiva === 5) {
    texto += "Resultado final. ";
    var total = preguntas.length;
    var porcentaje = Math.round((aciertos / total) * 100);
    texto += "Has acertado " + aciertos + " de " + total + " preguntas. ";
    texto += "Tu puntuación es " + porcentaje + " por ciento. ";
    if (porcentaje >= 80) {
      texto += "¡Muy bien! Has superado la actividad con nota.";
    } else if (porcentaje >= 50) {
      texto += "Has aprobado, pero revisa las licencias que fallaste.";
    } else {
      texto += "No has superado la actividad. Repasa la infografía y vuelve a intentarlo.";
    }
  }

  var utterance = new SpeechSynthesisUtterance(texto);
  utterance.lang = "es-ES";
  utterance.rate = 0.9;

  utterance.onstart = function () { lecturaEnCurso = true; };
  utterance.onend = function () { lecturaEnCurso = false; };
  utterance.onerror = function () { lecturaEnCurso = false; };

  window.speechSynthesis.speak(utterance);
}
