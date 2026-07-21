(function () {
  "use strict";

  var L = function (o) { return window.I18N ? window.I18N.L(o) : o.de; };
  var TOTAL_STEPS = 4;

  var screens = {
    start: document.getElementById("screen-start"),
    steps: document.getElementById("screen-steps"),
    certForm: document.getElementById("screen-cert-form"),
    certificate: document.getElementById("screen-certificate"),
  };

  var progressWrap = document.getElementById("progressWrap");
  var progressLabel = document.getElementById("progressLabel");
  var progressFill = document.getElementById("progressFill");
  var navBack = document.getElementById("navBack");

  var navStack = [];
  var currentScreen = null;

  var checkboxes = Array.prototype.slice.call(document.querySelectorAll("#examChecklist [data-check]"));
  function checkedCount() {
    return checkboxes.filter(function (b) { return b.checked; }).length;
  }

  function updateProgress() {
    progressWrap.hidden = false;
    var label, pct;
    if (currentScreen === "certificate") {
      label = L({ de: "Abgeschlossen", en: "Completed" });
      pct = 100;
    } else {
      var c = checkedCount();
      label = L({ de: "Schritt " + c + " von " + TOTAL_STEPS, en: "Step " + c + " of " + TOTAL_STEPS });
      pct = (c / TOTAL_STEPS) * 100;
    }
    progressLabel.textContent = label;
    progressFill.style.width = pct + "%";
  }

  function activate(name) {
    Object.keys(screens).forEach(function (k) { screens[k].classList.remove("active"); });
    screens[name].classList.add("active");
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  function showScreen(name, isBack) {
    if (name === "start") { navStack = []; currentScreen = null; }
    if (currentScreen && !isBack && name !== "start") navStack.push(currentScreen);
    currentScreen = name;
    activate(name);
    updateProgress();
    navBack.hidden = navStack.length === 0;
  }

  navBack.addEventListener("click", function () {
    if (!navStack.length) return;
    var prev = navStack.pop();
    showScreen(prev, true);
  });

  document.getElementById("btnStart").addEventListener("click", function () { showScreen("steps"); });

  checkboxes.forEach(function (box) {
    box.addEventListener("change", function () {
      updateProgress();
      document.getElementById("btnToCertForm").disabled = checkedCount() !== TOTAL_STEPS;
    });
  });

  var certName = document.getElementById("certName");
  var certClass = document.getElementById("certClass");
  var certDate = document.getElementById("certDate");
  var btnCreateCert = document.getElementById("btnCreateCert");

  certName.value = localStorage.getItem("ipadfs-name") || "";
  certClass.value = localStorage.getItem("ipadfs-class") || "";

  document.getElementById("btnToCertForm").addEventListener("click", function () {
    if (!certDate.value) {
      certDate.value = new Date().toISOString().slice(0, 10);
    }
    updateCertButton();
    showScreen("certForm");
  });

  function updateCertButton() {
    btnCreateCert.disabled = !(certName.value.trim() && certClass.value.trim() && certDate.value);
  }
  certName.addEventListener("input", function () {
    localStorage.setItem("ipadfs-name", certName.value.trim());
    updateCertButton();
  });
  certClass.addEventListener("input", function () {
    localStorage.setItem("ipadfs-class", certClass.value.trim());
    updateCertButton();
  });
  certDate.addEventListener("input", updateCertButton);

  function formatGermanDate(isoDate) {
    var parts = isoDate.split("-");
    if (parts.length !== 3) return isoDate;
    return parts[2] + "." + parts[1] + "." + parts[0];
  }

  var certData = null;

  function renderCertificate() {
    if (!certData) return;
    document.getElementById("certNameOut").textContent = certData.name;
    document.getElementById("certClassOut").textContent = certData.klass
      ? L({ de: "Klasse", en: "Class" }) + " " + certData.klass
      : "";
    document.getElementById("certDateOut").textContent = formatGermanDate(certData.date);
  }

  btnCreateCert.addEventListener("click", function () {
    certData = { name: certName.value.trim(), klass: certClass.value.trim(), date: certDate.value };
    renderCertificate();
    localStorage.setItem("ipadfs-exam-complete", "1");
    showScreen("certificate");
  });

  document.getElementById("btnPrint").addEventListener("click", function () {
    window.print();
  });

  document.addEventListener("langchange", function () {
    updateProgress();
    renderCertificate();
    if (navBack) navBack.setAttribute("aria-label", L({ de: "Zurück", en: "Back" }));
  });

  showScreen("start");
})();
