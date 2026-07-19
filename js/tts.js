/* ================================================================
   tts.js — Text-to-Speech (lectura por voz)
   ================================================================ */

var speaking = false;
var currentUtterance = null;

function toggleTTS() {
  if (speaking) { stopSpeech(); return; }
  var text = "";
  if (currentStep === 0) text = "Licencias Digitales. Ruta de aprendizaje.";
  else if (currentStep === 7) {
    var el = document.getElementById("screen-final-results");
    if (el) text = el.innerText;
  }
  else if (currentStep === 8) {
    var el = document.getElementById("screen-teacher");
    if (el) text = el.innerText;
  }
  else {
    var el = document.getElementById("screen-step" + currentStep);
    if (el) text = el.innerText;
  }
  if (!text) return;
  text = text.replace(/[\u2713\u2717\u26A0]/g, "").replace(/\n+/g, ". ");

  currentUtterance = new SpeechSynthesisUtterance(text);
  currentUtterance.lang = "es-ES";
  currentUtterance.rate = 0.95;

  var btn = document.getElementById("btn-tts");
  btn.classList.add("speaking");
  btn.innerHTML = "&#128266; Leyendo...";

  currentUtterance.onend = function() { speaking = false; resetTTSBtn(); };
  currentUtterance.onerror = function() { speaking = false; resetTTSBtn(); };

  speaking = true;
  speechSynthesis.speak(currentUtterance);
}

function stopSpeech() {
  speechSynthesis.cancel();
  speaking = false;
  resetTTSBtn();
}

function resetTTSBtn() {
  var btn = document.getElementById("btn-tts");
  btn.classList.remove("speaking");
  btn.innerHTML = "&#128266; Escuchar";
}
