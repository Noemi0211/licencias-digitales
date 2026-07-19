/* ================================================================
   results.js — Screen Final Results (step 7)
   Aggregates errors from all 4 assessment steps with feedback
   ================================================================ */

function showFinalResults() {
  var data = teacherGetData();

  var sections = [
    { key: "ei", name: "Evaluación Inicial", icon: "📝" },
    { key: "practice", name: "Práctica: Identificar Licencia", icon: "🎯" },
    { key: "game", name: "Detective de Licencias", icon: "🔍" },
    { key: "ef", name: "Evaluación Final", icon: "📋" }
  ];

  var totalQuestions = 0;
  var totalCorrect = 0;
  var sectionsHtml = "";

  for (var s = 0; s < sections.length; s++) {
    var sec = sections[s];
    var r = data.results[sec.key];
    if (!r) continue;

    totalQuestions += r.total;
    totalCorrect += r.correct;

    var pct = Math.round((r.correct / r.total) * 100);
    var cls = pct >= 80 ? "excellent" : (pct >= 60 ? "good" : "poor");

    sectionsHtml += '<div class="final-section ' + cls + '">';
    sectionsHtml += '<div class="final-section-header">';
    sectionsHtml += '<span class="final-section-icon">' + sec.icon + '</span>';
    sectionsHtml += '<span class="final-section-name">' + sec.name + '</span>';
    sectionsHtml += '</div>';
    sectionsHtml += '<div class="final-section-stats">';
    sectionsHtml += '<span class="final-stat correct">' + r.correct + ' aciertos</span>';
    sectionsHtml += '<span class="final-stat incorrect">' + (r.total - r.correct) + ' fallos</span>';
    sectionsHtml += '<span class="final-stat pct">' + pct + '%</span>';
    sectionsHtml += '</div>';
    sectionsHtml += '</div>';
  }

  var totalPct = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  var overallCls = totalPct >= 80 ? "excellent" : (totalPct >= 60 ? "good" : "poor");
  var passed = totalPct >= 50;
  var grade = totalQuestions > 0 ? ((totalCorrect / totalQuestions) * 10).toFixed(1) : "0.0";

  var html = '<div class="final-results-screen">';
  html += '<div class="final-logo"><img src="img/logo.png" alt="Logo"></div>';
  html += '<h2>Resultados Finales</h2>';

  html += '<div class="final-overall ' + overallCls + '">';
  html += '<div class="final-overall-circle"><span>' + totalPct + '%</span></div>';
  html += '<div class="final-overall-info">';
  html += '<p class="final-grade">Nota: <span class="' + (passed ? 'pass' : 'fail') + '">' + grade + '</span> / 10</p>';
  html += '<p>' + totalCorrect + ' de ' + totalQuestions + ' respuestas correctas</p>';
  html += '<p class="final-status">' + (passed ? '&#10004; Aprobado' : '&#10008; Necesita mejorar') + '</p>';
  html += '</div></div>';

  html += '<h3 class="final-sections-title">Resumen por secciones</h3>';
  html += sectionsHtml;

  html += '<h3 class="final-sections-title">Retroalimentación Didáctica</h3>';
  html += '<div class="final-tips">';
  html += '<div class="final-tip"><span class="final-tip-icon">💡</span><div><strong>Sigue practicando:</strong> Repasa la infografía y el vídeo si tienes dudas sobre alguna licencia.</div></div>';
  html += '<div class="final-tip"><span class="final-tip-icon">📚</span><div><strong>Creativa Comparte:</strong> Visita <a href="https://creativecommons.org" target="_blank">creativecommons.org</a> para más información oficial.</div></div>';
  html += '<div class="final-tip"><span class="final-tip-icon">🔄</span><div><strong>Vuelve a intentarlo:</strong> Puedes repetir cualquier sección para mejorar tu puntuación.</div></div>';
  html += '</div>';

  html += '<div class="prac-nav"><button class="btn btn-primary" onclick="goToIntro()">Volver al Inicio</button></div>';
  html += '</div>';

  document.getElementById("final-results-content").innerHTML = html;
  document.querySelector(".btn-home-fixed").style.display = "flex";
  showScreen("screen-final-results");
  if (passed) launchConfetti();
}
