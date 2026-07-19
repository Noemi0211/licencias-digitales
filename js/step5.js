/* ================================================================
   step5.js — Paso 5: Juego — Detective de Licencias (10 casos)
   ================================================================ */

var gameState = { scenarios: [], idx: 0, aciertos: 0, historial: [], answered: false };

function initGame() {
  gameState.scenarios = shuffle(GAME_SCENARIOS);
  gameState.idx = 0;
  gameState.aciertos = 0;
  gameState.historial = [];

  var html = '<div class="step-intro-screen">' +
    '<img src="img/logo.png" alt="Logo" class="step-intro-logo">' +
    '<h3>Detective de Licencias</h3>' +
    '<p>&iquest;Puedes averiguar qu&eacute; licencia se necesita en cada caso? Lee atentamente cada escenario y selecciona la licencia m&aacute;s adecuada.</p>' +
    '<ul class="step-intro-list"><li>' + gameState.scenarios.length + ' casos pr&aacute;cticos aleatorios</li><li>Lee bien el escenario antes de elegir</li><li>Al finalizar ver&aacute;s cu&aacute;ntos has resuelto correctamente</li></ul>' +
    '<div class="prac-nav"><button class="btn btn-primary" onclick="gameStart()">Jugar &#9654;</button></div></div>';

  document.getElementById("step5-content").innerHTML = html;
}

function gameStart() {
  gameState.scenarios = shuffle(GAME_SCENARIOS);
  gameState.idx = 0;
  gameState.aciertos = 0;
  gameState.historial = [];
  gameRender();
}

function gameRender() {
  var total = gameState.scenarios.length;
  var idx = gameState.idx;
  var s = gameState.scenarios[idx];
  gameState.answered = false;

  var opciones = [s.correcta].concat(s.wrong);
  opciones = shuffle(opciones);

  var dots = '<div class="game-progress">';
  for (var i = 0; i < total; i++) {
    var dotCls = "game-dot";
    if (i < idx) dotCls += gameState.historial[i].correcta ? " correct" : " incorrect";
    else if (i === idx) dotCls += " current";
    dots += '<div class="' + dotCls + '"></div>';
  }
  dots += '</div>';

  var scoreBar = '<div class="game-score-bar"><span>Ronda ' + (idx + 1) + ' de ' + total + '</span><span>Aciertos: ' + gameState.aciertos + '</span></div>';

  var html = dots + scoreBar;
  html += '<div class="game-scenario"><div class="gs-label">Caso del detective</div><div class="gs-text">' + s.scenario + '</div></div>';

  html += '<div class="game-license-grid" id="game-grid">';
  for (var j = 0; j < opciones.length; j++) {
    var lic = getLicenciaByNombre(opciones[j]);
    if (!lic) continue;
    html += '<div class="game-license-btn" id="game-btn-' + j + '" onclick="gameAnswer(' + j + ')" data-nombre="' + lic.nombre + '">' +
      '<img src="' + lic.img + '" alt="' + lic.nombre + '">' +
      '<div class="glb-name">' + lic.nombre + '</div></div>';
  }
  html += '</div>';

  html += '<div id="game-feedback" style="display:none"></div>';
  html += '<div id="game-next" class="prac-nav" style="display:none"><button class="btn btn-primary" onclick="gameNext()">Siguiente &#8594;</button></div>';

  document.getElementById("step5-content").innerHTML = html;
}

function gameAnswer(btnIdx) {
  if (gameState.answered) return;
  gameState.answered = true;

  var s = gameState.scenarios[gameState.idx];
  var btn = document.getElementById("game-btn-" + btnIdx);
  var nombreElegido = btn.getAttribute("data-nombre");
  var ok = (nombreElegido === s.correcta);

  if (ok) gameState.aciertos++;
  gameState.historial.push({ scenario: s.scenario, correcta: s.correcta, elegida: nombreElegido, correcta_bool: ok, explicacion: s.explicacion });

  var grid = document.getElementById("game-grid");
  var btns = grid.querySelectorAll(".game-license-btn");
  for (var i = 0; i < btns.length; i++) {
    var n = btns[i].getAttribute("data-nombre");
    if (n === s.correcta) btns[i].classList.add("correct");
    else if (i === btnIdx && !ok) btns[i].classList.add("incorrect");
    btns[i].classList.add("disabled");
  }

  var fb = document.getElementById("game-feedback");
  fb.style.display = "block";
  if (ok) {
    fb.className = "game-feedback correct";
    fb.innerHTML = "<strong>&#10004; ¡Correcto!</strong> " + s.explicacion;
  } else {
    fb.className = "game-feedback incorrect";
    fb.innerHTML = "<strong>&#10008; Incorrecto.</strong> La respuesta era <strong>" + s.correcta + "</strong>.<br>" + s.explicacion;
  }

  document.getElementById("game-next").style.display = "flex";
  var navBtn = document.querySelector("#game-next .btn-primary");
  var esUltima = (gameState.idx >= gameState.scenarios.length - 1);
  if (esUltima) { navBtn.textContent = "Ver resultado"; navBtn.onclick = gameShowResults; }
  else { navBtn.textContent = "Siguiente →"; navBtn.onclick = gameNext; }
}

function gameNext() {
  gameState.idx++;
  gameRender();
}

function gameShowResults() {
  var total = gameState.scenarios.length;
  var pct = Math.round((gameState.aciertos / total) * 100);
  var cls = pct >= 80 ? "excellent" : (pct >= 50 ? "good" : "poor");
  var msg = pct === 100 ? "¡Eres un auténtico detective de licencias!" :
    pct >= 80 ? "¡Excelente trabajo, detective!" :
    pct >= 50 ? "Buen intento. ¡Sigue investigando!" : "Necesitas repasar las licencias. ¡No te rindas!";

  var html = '<div class="results-circle ' + cls + '"><span>' + pct + '%</span><span class="pct">' + gameState.aciertos + '/' + total + '</span></div>';
  html += '<p class="results-message">' + msg + '</p>';
  html += '<div class="results-breakdown">' +
    '<div class="breakdown-item correct"><span class="num">' + gameState.aciertos + '</span><span class="label">Aciertos</span></div>' +
    '<div class="breakdown-item incorrect"><span class="num">' + (total - gameState.aciertos) + '</span><span class="label">Fallos</span></div></div>';

  html += '<h4 style="color:#2d3748;margin-bottom:10px;">Detalle de casos</h4>';
  for (var i = 0; i < gameState.historial.length; i++) {
    var h = gameState.historial[i];
    html += '<div class="answer-detail ' + (h.correcta_bool ? "was-correct" : "was-incorrect") + '">';
    html += '<p class="ad-title">' + (h.correcta_bool ? "✓" : "✗") + ' Caso ' + (i + 1) + '</p>';
    html += '<p class="ad-correct">Licencia correcta: ' + h.correcta + '</p>';
    if (!h.correcta_bool) html += '<p class="ad-yours">Tu respuesta: ' + h.elegida + '</p>';
    html += '<p class="ad-explain">' + h.explicacion + '</p>';
    html += '</div>';
  }

  html += '<div class="prac-nav"><button class="btn btn-primary" onclick="initGame()">Jugar de nuevo</button></div>';

  document.getElementById("step5-content").innerHTML = html;
  if (pct >= 80) launchConfetti();
  teacherSaveResult("game", gameState.aciertos, total);
}
