/* ================================================================
   navigation.js — Navegación entre pantallas
   ================================================================ */

var currentStep = 0;
var stepInitialized = {};
var lastStep = 0;

function showScreen(id) {
  var screens = document.querySelectorAll(".screen");
  var direction = "forward";
  var targetNum = 0;
  var match = id.match(/screen-step(\d+)/);
  if (match) targetNum = parseInt(match[1]);
  if (id === "screen-intro") targetNum = 0;
  if (id === "screen-final-results") targetNum = 7;
  if (id === "screen-teacher") targetNum = 8;
  if (targetNum < lastStep) direction = "backward";

  for (var i = 0; i < screens.length; i++) {
    screens[i].classList.remove("active", "slide-in-left", "slide-in-right", "slide-out-left", "slide-out-right");
  }

  var target = document.getElementById(id);
  if (direction === "forward") target.classList.add("slide-in-right");
  else target.classList.add("slide-in-left");

  target.classList.add("active");
  lastStep = targetNum;
  window.scrollTo(0, 0);
}

function goToIntro() {
  currentStep = 0;
  showScreen("screen-intro");
  document.getElementById("intro-select").value = "";
  stopSpeech();
}

function goToStep(step) {
  currentStep = step;
  stopSpeech();
  showScreen("screen-step" + step);
  if (!stepInitialized[step]) {
    initStep(step);
    stepInitialized[step] = true;
  }
}

function startSequence() {
  goToStep(1);
}

function initStep(step) {
  if (step === 1) initEvalInicial();
  else if (step === 2) initVideo();
  else if (step === 3) initInfografia();
  else if (step === 4) initPractice();
  else if (step === 5) initGame();
  else if (step === 6) initEvalFinal();
}
