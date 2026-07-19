/* ================================================================
   step2.js — Paso 2: Vídeo — Licencias en Sanidad
   ================================================================ */

function initVideo() {
  var html = '<div class="step-intro-screen">' +
    '<img src="img/logo.png" alt="Logo" class="step-intro-logo">' +
    '<h3>V&iacute;deo: Licencias en Sanidad</h3>' +
    '<p>Visualiza este v&iacute;deo introductorio sobre las licencias digitales en el &aacute;mbito sanitario. Aprender&aacute;s los conceptos b&aacute;sicos de Copyright, Creative Commons y Dominio P&uacute;blico aplicados a la documentaci&oacute;n sanitaria.</p>' +
    '<ul class="step-intro-list"><li>Duraci&oacute;n: ~3 minutos</li><li>Presta atenci&oacute;n a los ejemplos pr&aacute;cticos</li><li>Puedes pausar y rebobinar cuando lo necesites</li></ul>' +
    '<div class="prac-nav"><button class="btn btn-primary" onclick="startVideo()">Ver v&iacute;deo &#9654;</button></div></div>';

  document.getElementById("step2-content").innerHTML = html;
}

function startVideo() {
  var html = '<div class="video-container">' +
    '<video id="video-sanidad" controls preload="metadata">' +
    '<source src="Licencias_en_Sanidad.mp4" type="video/mp4">' +
    'Tu navegador no soporta la reproducci&oacute;n de v&iacute;deo.</video></div>';

  document.getElementById("step2-content").innerHTML = html;
  document.getElementById("video-sanidad").play();
}
