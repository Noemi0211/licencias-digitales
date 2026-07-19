/* ================================================================
   teacher.js — Panel del Profesor (acceso con botón + contraseña)
   ================================================================ */

var TEACHER_KEY = "licencias_digitales_results";
var TEACHER_PASS = "admin";

function teacherSaveResult(section, correct, total) {
  try {
    var data = teacherGetData();
    data.results[section] = { correct: correct, total: total, date: new Date().toISOString() };
    localStorage.setItem(TEACHER_KEY, JSON.stringify(data));
  } catch (e) { }
}

function teacherGetData() {
  try {
    var raw = localStorage.getItem(TEACHER_KEY);
    return raw ? JSON.parse(raw) : { results: {} };
  } catch (e) { return { results: {} }; }
}

function teacherClearData() {
  try { localStorage.removeItem(TEACHER_KEY); } catch (e) { }
}

function teacherOpen() {
  var pw = prompt("Introduce la contraseña del profesor:");
  if (pw === null) return;
  if (pw !== TEACHER_PASS) {
    alert("Contraseña incorrecta.");
    return;
  }
  teacherRender();
  showScreen("screen-teacher");
}

function teacherRender() {
  var data = teacherGetData();
  var html = "";

  var sections = [
    { key: "ei", name: "Evaluación Inicial" },
    { key: "practice", name: "Práctica: Identificar Licencia" },
    { key: "game", name: "Detective de Licencias" },
    { key: "ef", name: "Evaluación Final" }
  ];

  var hasAny = false;

  for (var s = 0; s < sections.length; s++) {
    var sec = sections[s];
    var r = data.results[sec.key];
    if (!r) continue;
    hasAny = true;

    var pct = Math.round((r.correct / r.total) * 100);
    var passed = pct >= 50;
    var date = r.date ? new Date(r.date).toLocaleString("es-ES") : "N/A";

    html += '<div class="teacher-section">';
    html += '<h3>' + sec.name + '</h3>';
    html += '<div class="teacher-stats">';
    html += '<div class="teacher-stat"><span class="ts-label">Correctas</span><span class="ts-num">' + r.correct + '</span></div>';
    html += '<div class="teacher-stat"><span class="ts-label">Total</span><span class="ts-num">' + r.total + '</span></div>';
    html += '<div class="teacher-stat"><span class="ts-label">Porcentaje</span><span class="ts-num">' + pct + '%</span></div>';
    html += '<div class="teacher-stat"><span class="ts-label">Aprobado</span><span class="ts-num">' + (passed ? "Sí" : "No") + '</span></div>';
    html += '<div class="teacher-stat"><span class="ts-label">Fecha</span><span class="ts-num">' + date + '</span></div>';
    html += '</div>';

    html += '<div class="teacher-chart">';
    html += '<div class="chart-bar-wrap"><div class="chart-bar" style="height:' + pct + '%;background:' + (passed ? "#48bb78" : "#f56565") + '"></div><div class="chart-label">' + sec.name.split(":")[0] + '</div><div class="chart-value">' + pct + '%</div></div>';
    html += '</div>';
    html += '</div>';
  }

  if (!hasAny) {
    html = '<div class="teacher-empty"><p>No hay datos de resultados guardados.</p><p>Los resultados se almacenan automáticamente cuando un estudiante completa cada sección.</p></div>';
  }

  html += '<div class="prac-nav">';
  html += '<button class="btn btn-secondary" onclick="teacherClearAndRefresh()">Borrar datos</button>';
  html += '<button class="btn btn-primary" onclick="teacherExport()">Exportar datos</button>';
  html += '</div>';

  document.getElementById("teacher-content").innerHTML = html;
}

function teacherClearAndRefresh() {
  if (confirm("¿Estás seguro de que quieres borrar todos los datos de resultados?")) {
    teacherClearData();
    teacherRender();
  }
}

function teacherExport() {
  var data = teacherGetData();
  var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = "resultados_licencias_" + new Date().toISOString().slice(0, 10) + ".json";
  a.click();
  URL.revokeObjectURL(url);
}
