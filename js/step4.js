/* ================================================================
   step4.js — Paso 4: Práctica — Identificar Licencia (5 preguntas)
   ================================================================ */

var pracState = { preguntas: [], idx: 0, aciertos: 0, historial: [] };

function initPractice() {
  pracState.preguntas = shuffle(PRAC_PREGUNTAS);
  pracState.idx = 0;
  pracState.aciertos = 0;
  pracState.historial = [];

  var html = '<div class="step-intro-screen">' +
    '<img src="img/logo.png" alt="Logo" class="step-intro-logo">' +
    '<h3>Identifica la Licencia</h3>' +
    '<p>En este ejercicio practicar&aacute;s a reconocer visualmente las diferentes licencias Creative Commons. Se te mostrar&aacute; una imagen del s&iacute;mbolo de licencia y deber&aacute;s indicar a qu&eacute; tipo corresponde.</p>' +
    '<ul class="step-intro-list"><li>' + pracState.preguntas.length + ' preguntas aleatorias</li><li>Selecciona la licencia correcta en cada caso</li><li>Recibir&aacute;s feedback inmediato con la explicaci&oacute;n</li></ul>' +
    '<div class="prac-nav"><button class="btn btn-primary" onclick="pracStart()">Comenzar &#9654;</button></div></div>';

  document.getElementById("step4-content").innerHTML = html;
}

function pracStart() {
  pracState.idx = 0;
  pracState.aciertos = 0;
  pracState.historial = [];
  pracRenderQuestion();
}

function pracRenderQuestion() {
  var total = pracState.preguntas.length;
  var idx = pracState.idx;
  var q = pracState.preguntas[idx];
  var pct = (idx / total) * 100;

  var html = '<div class="prac-progress">' +
    '<span class="prac-progress-label">Pregunta ' + (idx + 1) + ' de ' + total + '</span>' +
    '<div class="prac-barra"><div class="prac-barra-fill" style="width:' + pct + '%"></div></div></div>';

  html += '<div class="prac-question"><img src="' + q.img + '" alt="Licencia">' +
    '<h3>&iquest;Qu&eacute; licencia representa esta imagen?</h3></div>';

  html += '<select id="prac-select" class="prac-select"><option value="">&mdash; Selecciona una opci&oacute;n &mdash;</option>';
  for (var i = 0; i < PRAC_OPCIONES.length; i++) {
    html += '<option value="' + PRAC_OPCIONES[i] + '">' + PRAC_OPCIONES[i] + '</option>';
  }
  html += '</select>';

  html += '<div id="prac-feedback" style="display:none"></div>';
  html += '<div class="prac-nav"><button class="btn btn-primary" id="prac-check-btn" onclick="pracCheck()">Comprobar</button></div>';
  html += '<div id="prac-next" class="prac-nav" style="display:none"><button class="btn btn-primary" onclick="pracNext()">Siguiente &#8594;</button></div>';

  document.getElementById("step4-content").innerHTML = html;
}

function pracCheck() {
  var val = document.getElementById("prac-select").value;
  if (!val) { alert("Selecciona una opci&oacute;n antes de comprobar."); return; }

  var q = pracState.preguntas[pracState.idx];
  var ok = (val === q.nombre);
  if (ok) pracState.aciertos++;

  pracState.historial.push({ nombre: q.nombre, respuesta: val, correcta: ok });

  document.getElementById("prac-select").disabled = true;
  document.getElementById("prac-check-btn").style.display = "none";

  var fb = document.getElementById("prac-feedback");
  fb.style.display = "block";
  if (ok) {
    fb.className = "prac-feedback correct";
    fb.innerHTML = "<strong>&#10004; ¡Correcto!</strong> La licencia es <strong>" + q.nombre + "</strong>.";
  } else {
    var licCorrecta = getLicenciaByNombre(q.nombre);
    var licElegida = getLicenciaByNombre(val);
    fb.className = "prac-feedback incorrect";
    var fbHtml = "<strong>&#10008; Lo siento, has seleccionado " + val + " y la respuesta correcta es " + q.nombre + ".</strong>";
    fbHtml += '<div class="prac-compare">';
    fbHtml += '<div class="prac-compare-item correct">';
    fbHtml += '<span class="prac-compare-tag">Correcta</span>';
    fbHtml += '<img src="' + (licCorrecta ? licCorrecta.img : "") + '" alt="' + q.nombre + '">';
    fbHtml += '<h4>' + q.nombre + '</h4>';
    fbHtml += '<p>' + (licCorrecta ? licCorrecta.desc : "") + '</p>';
    fbHtml += '</div>';
    fbHtml += '<div class="prac-compare-item wrong">';
    fbHtml += '<span class="prac-compare-tag">Tu respuesta</span>';
    fbHtml += '<img src="' + (licElegida ? licElegida.img : "") + '" alt="' + val + '">';
    fbHtml += '<h4>' + val + '</h4>';
    fbHtml += '<p>' + (licElegida ? licElegida.desc : "") + '</p>';
    fbHtml += '</div>';
    fbHtml += '</div>';
    fb.innerHTML = fbHtml;
  }

  document.getElementById("prac-next").style.display = "flex";

  var esUltima = (pracState.idx >= pracState.preguntas.length - 1);
  var navBtn = document.querySelector("#prac-next .btn-primary");
  if (esUltima) { navBtn.textContent = "Ver resultado"; navBtn.onclick = pracShowResults; }
  else { navBtn.textContent = "Siguiente →"; navBtn.onclick = pracNext; }
}

function pracNext() {
  pracState.idx++;
  pracRenderQuestion();
}

function pracShowResults() {
  var total = pracState.preguntas.length;
  var pct = Math.round((pracState.aciertos / total) * 100);
  var cls = pct >= 80 ? "excellent" : (pct >= 50 ? "good" : "poor");
  var msg = pct === 100 ? "¡Perfecto! Has identificado todas las licencias." :
    pct >= 80 ? "¡Muy bien! Identificas la mayoría." :
    pct >= 50 ? "Aprobado, pero revisa las que fallaste." : "Repasa la infografía y vuelve a intentarlo.";

  var html = '<div class="results-circle ' + cls + '"><span>' + pct + '%</span><span class="pct">' + pracState.aciertos + '/' + total + '</span></div>';
  html += '<p class="results-message">' + msg + '</p>';
  html += '<div class="results-breakdown">' +
    '<div class="breakdown-item correct"><span class="num">' + pracState.aciertos + '</span><span class="label">Aciertos</span></div>' +
    '<div class="breakdown-item incorrect"><span class="num">' + (total - pracState.aciertos) + '</span><span class="label">Fallos</span></div></div>';

  html += '<h4 style="color:#2d3748;margin-bottom:10px;">Detalle</h4>';
  for (var i = 0; i < pracState.historial.length; i++) {
    var h = pracState.historial[i];
    html += '<div class="answer-detail ' + (h.correcta ? "was-correct" : "was-incorrect") + '">';
    html += '<p class="ad-title">' + (h.correcta ? "✓" : "✗") + ' Pregunta ' + (i + 1) + '</p>';
    html += '<p class="ad-correct">Correcta: ' + h.nombre + '</p>';
    if (!h.correcta) html += '<p class="ad-yours">Tu respuesta: ' + h.respuesta + '</p>';
    html += '</div>';
  }

  html += '<div class="prac-nav"><button class="btn btn-primary" onclick="initPractice()">Volver a intentar</button></div>';

  document.getElementById("step4-content").innerHTML = html;
  if (pct >= 80) launchConfetti();
  teacherSaveResult("practice", pracState.aciertos, total);
}
