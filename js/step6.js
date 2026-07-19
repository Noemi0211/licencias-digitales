/* ================================================================
   step6.js — Paso 6: Evaluación Final (15 preguntas)
   ================================================================ */

var efState = { preguntas: [], idx: 0, respuestas: {} };

function initEvalFinal() {
  efState.preguntas = shuffle(EF_PREGUNTAS);
  efState.idx = 0;
  efState.respuestas = {};

  var html = '<div class="ef-intro">' +
    '<h3>Evaluaci&oacute;n Final</h3>' +
    '<div class="ef-info"><p><strong>Ciclo:</strong> Documentaci&oacute;n y Administraci&oacute;n Sanitarias</p><p><strong>M&oacute;dulo:</strong> Ofim&aacute;tica</p></div>' +
    '<div class="ef-instrucciones"><h4>Instrucciones</h4><ul>' +
    '<li>Cuestionario de <strong>15 preguntas</strong> con opciones m&uacute;ltiples.</li>' +
    '<li>El orden es <strong>aleatorio</strong>.</li>' +
    '<li>Selecciona <strong>una sola respuesta</strong> por pregunta.</li>' +
    '<li>Al finalizar obtendr&aacute;s tu <strong>calificaci&oacute;n</strong> y <strong>feedback</strong>.</li>' +
    '<li>Tienes <strong>un solo intento</strong>. &iexcl;Buena suerte!</li></ul></div>' +
    '<div class="prac-nav"><button class="btn btn-primary" onclick="efStart()">Comenzar Evaluaci&oacute;n</button></div></div>';

  document.getElementById("step6-content").innerHTML = html;
}

function efStart() {
  efState.idx = 0;
  efRenderQuestion();
}

function efRenderQuestion() {
  var total = efState.preguntas.length;
  var idx = efState.idx;
  var q = efState.preguntas[idx];
  var pct = ((idx + 1) / total) * 100;

  var html = '<div class="ei-progreso"><div class="ei-progreso-header"><span>Pregunta ' + (idx + 1) + ' de ' + total + '</span><span>' + Math.round(pct) + '%</span></div>' +
    '<div class="ei-barra"><div class="ei-barra-fill" style="width:' + pct + '%"></div></div></div>';

  html += '<div class="ef-question">';
  if (q.image) html += '<img src="' + q.image + '" class="quiz-question-img" alt="">';
  html += '<h3 class="quiz-question-text">' + q.question + '</h3></div>';

  html += '<div class="ef-options" id="ef-options">';
  for (var i = 0; i < q.options.length; i++) {
    var checked = (efState.respuestas[q.id] === q.options[i].l) ? " checked" : "";
    var selectedStyle = (efState.respuestas[q.id] === q.options[i].l) ? ' style="border-color:#2b6cb0;background:#ebf8ff"' : '';
    html += '<label class="ef-option" id="ef-opt-' + i + '"' + selectedStyle + '>' +
      '<input type="radio" name="ef-q" value="' + q.options[i].l + '"' + checked + ' onclick="efSelect(\'' + q.id + '\',\'' + q.options[i].l + '\')">' +
      '<span>' + q.options[i].t + '</span></label>';
  }
  html += '</div>';

  var esPrimero = (idx === 0);
  var esUltimo = (idx === total - 1);
  html += '<div class="ef-nav">';
  html += '<button class="btn btn-secondary" onclick="efNav(' + (idx - 1) + ')"' + (esPrimero ? ' disabled' : '') + '>&#8592; Anterior</button>';
  if (esUltimo) html += '<button class="btn btn-primary" onclick="efFinish()">Finalizar &#8594;</button>';
  else html += '<button class="btn btn-primary" onclick="efNav(' + (idx + 1) + ')">Siguiente &#8594;</button>';
  html += '</div>';

  document.getElementById("step6-content").innerHTML = html;
}

function efSelect(qId, value) {
  efState.respuestas[qId] = value;
  var q = null;
  for (var i = 0; i < efState.preguntas.length; i++) {
    if (efState.preguntas[i].id === qId) { q = efState.preguntas[i]; break; }
  }
  if (!q) return;
  for (var j = 0; j < q.options.length; j++) {
    var el = document.getElementById("ef-opt-" + j);
    if (el) {
      if (q.options[j].l === value) { el.style.borderColor = "#2b6cb0"; el.style.background = "#ebf8ff"; }
      else { el.style.borderColor = "#e2e8f0"; el.style.background = ""; }
    }
  }
}

function efNav(idx) {
  if (idx >= 0 && idx < efState.preguntas.length) {
    efState.idx = idx;
    efRenderQuestion();
    window.scrollTo(0, 0);
  }
}

function efFinish() {
  var total = efState.preguntas.length;
  var score = 0;
  var unanswered = 0;
  var results = [];

  for (var i = 0; i < total; i++) {
    var q = efState.preguntas[i];
    var userAns = efState.respuestas[q.id] || null;
    var isCorrect = userAns === q.correct;

    if (!userAns) unanswered++;
    else if (isCorrect) score++;

    results.push({ q: q, userAnswer: userAns, isCorrect: isCorrect, unanswered: !userAns });
  }

  efShowResults(score, total, results, unanswered);
  scormScore(score, total);
}

function efShowResults(score, total, results, unanswered) {
  var pct = Math.round((score / total) * 100);
  var cls = pct >= 90 ? "excellent" : (pct >= 70 ? "good" : (pct >= 50 ? "average" : "poor"));
  var msg = pct >= 90 ? "¡Excelente! Dominas las licencias." : pct >= 70 ? "¡Bien hecho!" : pct >= 50 ? "Aceptable. Revisa los temas." : "Necesitas repasar.";

  var grade = ((score / total) * 10).toFixed(1);
  var passed = pct >= 50;

  var html = '<div class="ef-results-circle ' + cls + '"><span>' + score + '/' + total + '</span><span class="pct">' + pct + '%</span></div>';
  html += '<p class="ef-grade">Nota: <span class="' + (passed ? 'pass' : 'fail') + '">' + grade + '</span> / 10</p>';
  html += '<p class="results-message">' + msg + '</p>';

  var correctCount = score;
  var incorrectCount = total - score - unanswered;
  html += '<div class="results-breakdown">' +
    '<div class="breakdown-item correct"><span class="num">' + correctCount + '</span><span class="label">Aciertos</span></div>' +
    '<div class="breakdown-item incorrect"><span class="num">' + incorrectCount + '</span><span class="label">Fallos</span></div>' +
    '<div class="breakdown-item" style="border-color:#fefcbf;background:#fffff0"><span class="num" style="color:#d69e2e">' + unanswered + '</span><span class="label">Sin responder</span></div></div>';

  html += '<h4 style="color:#2d3748;margin-bottom:10px;">Detalle de respuestas</h4>';
  for (var i = 0; i < results.length; i++) {
    var r = results[i];
    var icon = r.unanswered ? "⚠" : (r.isCorrect ? "✓" : "✗");
    var detailCls = r.unanswered ? "" : (r.isCorrect ? "was-correct" : "was-incorrect");

    var correctOpt = null;
    for (var k = 0; k < r.q.options.length; k++) { if (r.q.options[k].l === r.q.correct) correctOpt = r.q.options[k]; }
    var userOpt = null;
    if (r.userAnswer) { for (var k2 = 0; k2 < r.q.options.length; k2++) { if (r.q.options[k2].l === r.userAnswer) userOpt = r.q.options[k2]; } }

    html += '<div class="answer-detail ' + detailCls + '">';
    html += '<p class="ad-title">' + icon + ' Pregunta ' + (i + 1) + ': ' + r.q.question + '</p>';
    if (r.unanswered) html += '<p class="ad-yours">No respondiste.</p>';
    else if (!r.isCorrect) html += '<p class="ad-yours">Tu respuesta (' + r.userAnswer.toUpperCase() + '): ' + (userOpt ? userOpt.t : '') + '</p>';
    html += '<p class="ad-correct">Correcta (' + r.q.correct.toUpperCase() + '): ' + (correctOpt ? correctOpt.t : '') + '</p>';
    html += '<p class="ad-explain">' + r.q.explanation + '</p>';
    html += '</div>';
  }

  html += '<div class="prac-nav">' +
    '<button class="btn btn-primary" onclick="initEvalFinal()">Volver a intentar</button>' +
    '<button class="btn btn-accent" onclick="showFinalResults()">Ver Resultados Finales</button></div>';

  document.getElementById("step6-content").innerHTML = html;
  if (passed) launchConfetti();
  teacherSaveResult("ef", score, total);
}
