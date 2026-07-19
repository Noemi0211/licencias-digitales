/* ================================================================
   step1.js — Paso 1: Evaluación Inicial (8 preguntas)
   ================================================================ */

var eiState = { preguntas: [], idx: 0, respuestas: [], seleccion: null };

function initEvalInicial() {
  eiState.preguntas = shuffle(EI_PREGUNTAS);
  eiState.idx = 0;
  eiState.respuestas = [];
  eiState.seleccion = null;

  var html = '<div class="ei-inicio">' +
    '<img src="img/logo.png" alt="Logo">' +
    '<h3>Evaluaci&oacute;n Inicial</h3>' +
    '<p>Este cuestionario eval&uacute;a tus conocimientos previos sobre las diferentes licencias digitales: Copyright, Creative Commons, Copyleft, Copyfarleft y Dominio P&uacute;blico.</p>' +
    '<p><strong>Instrucciones:</strong> Responde cada pregunta seleccionando una opci&oacute;n. Al finalizar obtendr&aacute;s tu puntuaci&oacute;n y un resumen detallado.</p>' +
    '<div class="prac-nav"><button class="btn btn-primary" onclick="eiStart()">Comenzar</button></div></div>';

  document.getElementById("step1-content").innerHTML = html;
}

function eiStart() {
  eiState.idx = 0;
  eiState.respuestas = [];
  eiRenderQuestion();
}

function eiRenderQuestion() {
  var total = eiState.preguntas.length;
  var idx = eiState.idx;
  var q = eiState.preguntas[idx];
  var pct = Math.round(((idx + 1) / total) * 100);

  var html = '<div class="ei-progreso">' +
    '<div class="ei-progreso-header"><span>Pregunta ' + (idx + 1) + ' de ' + total + '</span><span>' + pct + '%</span></div>' +
    '<div class="ei-barra"><div class="ei-barra-fill" style="width:' + pct + '%"></div></div></div>';

  if (q.imagen) html += '<img src="' + q.imagen + '" class="ei-pregunta-img" alt="">';
  html += '<h3 class="ei-pregunta-text">' + q.pregunta + '</h3>';
  html += '<div class="ei-opciones">';
  for (var i = 0; i < q.opciones.length; i++) {
    html += '<div class="ei-opcion" onclick="eiSelect(' + i + ')" id="ei-opt-' + i + '">' +
      '<input type="radio" name="ei-q" value="' + i + '"><label>' + q.opciones[i] + '</label></div>';
  }
  html += '</div>';
  html += '<div class="prac-nav"><button class="btn btn-primary" id="ei-continue-btn" onclick="eiNext()" disabled>Continuar</button></div>';

  document.getElementById("step1-content").innerHTML = html;
}

function eiSelect(i) {
  eiState.seleccion = i;
  for (var j = 0; j < eiState.preguntas[eiState.idx].opciones.length; j++) {
    var el = document.getElementById("ei-opt-" + j);
    if (el) el.classList.toggle("seleccionada", j === i);
  }
  document.getElementById("ei-continue-btn").disabled = false;
}

function eiNext() {
  eiState.respuestas.push(eiState.seleccion);
  eiState.seleccion = null;
  eiState.idx++;
  if (eiState.idx < eiState.preguntas.length) {
    eiRenderQuestion();
  } else {
    eiShowResults();
  }
}

function eiShowResults() {
  var total = eiState.preguntas.length;
  var aciertos = 0;
  for (var i = 0; i < total; i++) {
    if (eiState.respuestas[i] === eiState.preguntas[i].correcta) aciertos++;
  }
  var pct = Math.round((aciertos / total) * 100);

  var html = '<div class="ei-resultado-header"><h3>Resultados</h3>' +
    '<div class="ei-porcentaje">' + pct + '%</div>' +
    '<p class="ei-acertadas">' + aciertos + ' de ' + total + ' respuestas correctas</p></div>';

  html += '<div class="ei-resumen">';
  for (var j = 0; j < total; j++) {
    var q = eiState.preguntas[j];
    var resp = eiState.respuestas[j];
    var esAcierto = (resp === q.correcta);
    var cls = esAcierto ? "acierto" : "fallo";
    html += '<div class="ei-resumen-item ' + cls + '">';
    html += '<p class="ri-pregunta">' + (j + 1) + '. ' + q.pregunta + '</p>';
    html += '<p class="ri-respuesta">Tu respuesta: ' + q.opciones[resp] + '</p>';
    if (!esAcierto) html += '<p class="ri-correcta">Correcta: ' + q.opciones[q.correcta] + '</p>';
    html += '<span class="ri-estado ' + cls + '">' + (esAcierto ? '✓ Acierto' : '✗ Fallo') + '</span>';
    html += '<p class="ri-explicacion">' + q.explicacion + '</p>';
    html += '</div>';
  }
  html += '</div>';
  html += '<div class="prac-nav"><button class="btn btn-primary" onclick="eiStart()">Reiniciar</button></div>';

  document.getElementById("step1-content").innerHTML = html;
  if (pct >= 80) launchConfetti();
  scormScore(aciertos, total);
  teacherSaveResult("ei", aciertos, total);
}
