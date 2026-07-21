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
  var stepsVisible = false;

  function setProgress(checkedCount) {
    progressLabel.textContent = L({
      de: "Schritt " + checkedCount + " von " + TOTAL_STEPS,
      en: "Step " + checkedCount + " of " + TOTAL_STEPS,
    });
    progressFill.style.width = (checkedCount / TOTAL_STEPS) * 100 + "%";
  }

  function showScreen(name, showProgress) {
    Object.keys(screens).forEach(function (k) { screens[k].classList.remove("active"); });
    screens[name].classList.add("active");
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    stepsVisible = !!showProgress;
    progressWrap.hidden = !showProgress;
  }

  var checkboxes = Array.prototype.slice.call(document.querySelectorAll("#examChecklist [data-check]"));

  function checkedCount() {
    return checkboxes.filter(function (b) { return b.checked; }).length;
  }

  document.getElementById("btnStart").addEventListener("click", function () {
    showScreen("steps", true);
    setProgress(checkedCount());
  });

  checkboxes.forEach(function (box) {
    box.addEventListener("change", function () {
      var c = checkedCount();
      setProgress(c);
      document.getElementById("btnToCertForm").disabled = c !== TOTAL_STEPS;
    });
  });

  var certName = document.getElementById("certName");
  var certClass = document.getElementById("certClass");
  var certDate = document.getElementById("certDate");
  var btnCreateCert = document.getElementById("btnCreateCert");

  // Prefill from the name/class entered on the hub.
  certName.value = localStorage.getItem("ipadfs-name") || "";
  certClass.value = localStorage.getItem("ipadfs-class") || "";

  document.getElementById("btnToCertForm").addEventListener("click", function () {
    if (!certDate.value) {
      certDate.value = new Date().toISOString().slice(0, 10);
    }
    updateCertButton();
    showScreen("certForm", false);
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
    showScreen("certificate", false);
  });

  document.getElementById("btnPrint").addEventListener("click", function () {
    window.print();
  });

  document.addEventListener("langchange", function () {
    if (stepsVisible) setProgress(checkedCount());
    renderCertificate();
  });
})();
