/* ================================================================
   app.js — Inicialización global
   ================================================================ */

function initApp() {
  document.getElementById("app-version").textContent = "v2.2.0";
  initEvalInicial();
  initVideo();
  initInfografia();
  initPractice();
  initGame();
  initEvalFinal();

  document.getElementById("final-results-content").innerHTML =
    '<div class="loading"><p>Cargando resultados...</p></div>';
}

document.addEventListener("DOMContentLoaded", function () {
  initApp();
});
