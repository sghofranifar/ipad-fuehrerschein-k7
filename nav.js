(function () {
  "use strict";

  function L(o) { return window.I18N ? window.I18N.L(o) : o.de; }

  /* Shared navigator: always-visible progress scale + Back-history.
     Home is a plain <a href="index.html"> in the header (works without JS). */
  window.makeNavigator = function (opts) {
    var progressWrap = document.getElementById("progressWrap");
    var progressLabel = document.getElementById("progressLabel");
    var progressFill = document.getElementById("progressFill");
    var navBack = document.getElementById("navBack");
    var navHome = document.getElementById("navHome");

    var screens = opts.screens;
    var total = opts.total;
    var stack = [];
    var current = null;

    function setProgress(name, station) {
      progressWrap.hidden = false;
      var label, pct;
      if (name === "start") {
        label = L({ de: "Übersicht", en: "Overview" });
        pct = 0;
      } else if (name === "complete") {
        label = L({ de: "Abgeschlossen", en: "Completed" });
        pct = 100;
      } else {
        label = L({ de: "Station " + station + " von " + total, en: "Station " + station + " of " + total });
        pct = (station / total) * 100;
      }
      progressLabel.textContent = label;
      progressFill.style.width = pct + "%";
    }

    function activate(name) {
      Object.keys(screens).forEach(function (k) { screens[k].classList.remove("active"); });
      screens[name].classList.add("active");
      window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    }

    function updateButtons() {
      if (navBack) navBack.hidden = stack.length === 0;
    }

    function go(name, station, isBack) {
      if (name === "start") { stack = []; current = null; }
      if (current && !isBack && name !== "start") stack.push(current);
      current = { name: name, station: station || 0 };
      activate(name);
      setProgress(name, station || 0);
      updateButtons();
    }

    if (navBack) {
      navBack.addEventListener("click", function () {
        if (!stack.length) return;
        var p = stack.pop();
        go(p.name, p.station, true);
      });
    }

    function updateAria() {
      if (navBack) navBack.setAttribute("aria-label", L({ de: "Zurück", en: "Back" }));
      if (navHome) navHome.setAttribute("aria-label", L({ de: "Hauptmenü", en: "Main menu" }));
    }

    document.addEventListener("langchange", function () {
      if (current) setProgress(current.name, current.station);
      updateAria();
    });
    updateAria();

    return { go: go };
  };

  /* Shared "Fehlerspeicher" renderer. mistakes: array of {q, chosen}
     where q has {q, options[], correct}. Returns HTML. */
  window.mistakesHTML = function (mistakes) {
    var t = function (k) { return window.I18N ? window.I18N.t(k) : k; };
    if (!mistakes.length) {
      return '<div class="mistakes mistakes--none"><p class="mistakes-title">' + t("err.title") +
        '</p><div class="mistakes-none">' + t("err.none") + "</div></div>";
    }
    var items = mistakes.map(function (m) {
      return '<div class="mistakes-item"><span class="mq">' + L(m.q.q) + "</span>" +
        '<span class="ma">' + t("err.your") + " " + L(m.q.options[m.chosen]) + "</span>" +
        '<span class="mc">' + t("err.correct") + " " + L(m.q.options[m.q.correct]) + "</span></div>";
    }).join("");
    return '<div class="mistakes"><p class="mistakes-title">' + t("err.title") + "</p>" + items + "</div>";
  };

  /* Persist the current run's mistakes so they are genuinely stored. */
  window.storeMistakes = function (pageId, mistakes) {
    try {
      var data = mistakes.map(function (m) {
        return { q: m.q.q.de, your: m.q.options[m.chosen].de, correct: m.q.options[m.q.correct].de };
      });
      localStorage.setItem("ipadfs-errors-" + pageId, JSON.stringify(data));
    } catch (e) { /* ignore storage errors */ }
  };
})();
