/* ================================================================
   scorm.js — Integración SCORM 1.2 / 2004
   ================================================================ */

var scormAPI = null;

function scormFind() {
  if (typeof API_1484_11 !== "undefined" && API_1484_11) return { api: API_1484_11, v: "2004" };
  if (typeof API !== "undefined" && API) return { api: API, v: "1.2" };
  if (window.API) return { api: window.API, v: "1.2" };
  if (parent && parent.API) return { api: parent.API, v: "1.2" };
  return null;
}

function scormInit() {
  scormAPI = scormFind();
  if (!scormAPI) return;
  try {
    if (scormAPI.v === "2004") { scormAPI.api.SetValue("cmi.completion_status", "incomplete"); scormAPI.api.Commit(""); }
    else { scormAPI.api.LMSSetValue("cmi.core.lesson_status", "incomplete"); scormAPI.api.LMSCommit(""); }
  } catch(e) {}
}

function scormScore(score, total) {
  if (!scormAPI) return;
  var pct = Math.round((score / total) * 100);
  try {
    if (scormAPI.v === "2004") {
      scormAPI.api.SetValue("cmi.score.raw", String(score));
      scormAPI.api.SetValue("cmi.score.min", "0");
      scormAPI.api.SetValue("cmi.score.max", String(total));
      scormAPI.api.SetValue("cmi.score.scaled", String(pct / 100));
      scormAPI.api.SetValue("cmi.success_status", pct >= 50 ? "passed" : "failed");
      scormAPI.api.SetValue("cmi.completion_status", "completed");
      scormAPI.api.Commit("");
    } else {
      scormAPI.api.LMSSetValue("cmi.core.score.raw", String(score));
      scormAPI.api.LMSSetValue("cmi.core.score.min", "0");
      scormAPI.api.LMSSetValue("cmi.core.score.max", String(total));
      scormAPI.api.LMSSetValue("cmi.core.score.scaled", String(pct / 100));
      scormAPI.api.LMSSetValue("cmi.core.lesson_status", pct >= 50 ? "passed" : "failed");
      scormAPI.api.LMSCommit("");
    }
  } catch(e) {}
}
