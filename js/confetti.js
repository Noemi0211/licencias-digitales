/* ================================================================
   confetti.js — Efecto confetti para puntuaciones altas
   ================================================================ */

function launchConfetti() {
  var c = document.createElement("div");
  c.className = "confetti-container";
  document.body.appendChild(c);
  var colors = ["#2b6cb0","#553c9a","#38a169","#dd6b20","#e53e3e","#ecc94b","#4fd1c5","#f687b3"];
  for (var i = 0; i < 80; i++) {
    (function(idx) {
      setTimeout(function() {
        var p = document.createElement("div");
        p.className = "confetti-piece";
        p.style.left = (Math.random() * 100) + "vw";
        var sz = Math.random() * 8 + 6;
        p.style.width = sz + "px"; p.style.height = sz + "px";
        p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        p.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
        p.style.animationDuration = (Math.random() * 2 + 2) + "s";
        p.style.animationDelay = (Math.random() * 0.3) + "s";
        c.appendChild(p);
        setTimeout(function() { if (p.parentNode) p.parentNode.removeChild(p); }, 4500);
      }, idx * 25);
    })(i);
  }
  setTimeout(function() { if (c.parentNode) c.parentNode.removeChild(c); }, 5000);
}
