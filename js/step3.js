/* ================================================================
   step3.js — Paso 3: Infografía de Licencias
   ================================================================ */

function initInfografia() {
  var html = '<div class="step-intro-screen">' +
    '<img src="img/logo.png" alt="Logo" class="step-intro-logo">' +
    '<h3>Infograf&iacute;a de Licencias</h3>' +
    '<p>Consulta este cartel con el resumen visual de las licencias digitales m&aacute;s habituales: Copyright, Creative Commons (BY, BY-SA, BY-NC, BY-ND, BY-NC-SA, BY-NC-ND), Copyleft, Copyfarleft y Dominio P&uacute;blico.</p>' +
    '<ul class="step-intro-list"><li>Estudia las diferencias entre cada licencia</li><li>F&iacute;jate en los s&iacute;mbolos y sus significados</li><li>Te ser&aacute; &uacute;til para los ejercicios siguientes</li></ul>' +
    '<div class="prac-nav"><button class="btn btn-primary" onclick="showInfografia()">Ver infograf&iacute;a &#9654;</button></div></div>';

  document.getElementById("step3-content").innerHTML = html;
}

function showInfografia() {
  var html = '<div class="infografia-wrapper">' +
    '<img src="img/Cartel_licencias.png" alt="Infograf&iacute;a de licencias digitales" class="infografia-img"></div>';

  document.getElementById("step3-content").innerHTML = html;
}
