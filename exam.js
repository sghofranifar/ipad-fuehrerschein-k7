(function () {
  "use strict";

  const TOTAL_STEPS = 4;

  const screens = {
    start: document.getElementById("screen-start"),
    steps: document.getElementById("screen-steps"),
    certForm: document.getElementById("screen-cert-form"),
    certificate: document.getElementById("screen-certificate"),
  };

  const progressWrap = document.getElementById("progressWrap");
  const progressLabel = document.getElementById("progressLabel");
  const progressFill = document.getElementById("progressFill");

  function showScreen(name, checkedCount) {
    Object.values(screens).forEach((el) => el.classList.remove("active"));
    screens[name].classList.add("active");
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });

    if (typeof checkedCount === "number") {
      progressWrap.hidden = false;
      progressLabel.textContent = "Schritt " + checkedCount + " von " + TOTAL_STEPS;
      progressFill.style.width = (checkedCount / TOTAL_STEPS) * 100 + "%";
    } else {
      progressWrap.hidden = true;
    }
  }

  document.getElementById("btnStart").addEventListener("click", () => showScreen("steps", 0));

  const checkboxes = Array.from(document.querySelectorAll("#examChecklist [data-check]"));
  checkboxes.forEach((box) => {
    box.addEventListener("change", () => {
      const checkedCount = checkboxes.filter((b) => b.checked).length;
      progressLabel.textContent = "Schritt " + checkedCount + " von " + TOTAL_STEPS;
      progressFill.style.width = (checkedCount / TOTAL_STEPS) * 100 + "%";
      document.getElementById("btnToCertForm").disabled = checkedCount !== TOTAL_STEPS;
    });
  });

  document.getElementById("btnToCertForm").addEventListener("click", () => {
    const dateInput = document.getElementById("certDate");
    if (!dateInput.value) {
      const today = new Date();
      dateInput.value = today.toISOString().slice(0, 10);
    }
    showScreen("certForm", null);
  });

  /* ---------- Zertifikat ---------- */

  const certName = document.getElementById("certName");
  const certDate = document.getElementById("certDate");
  const btnCreateCert = document.getElementById("btnCreateCert");

  function updateCertButton() {
    btnCreateCert.disabled = !(certName.value.trim() && certDate.value);
  }
  certName.addEventListener("input", updateCertButton);
  certDate.addEventListener("input", updateCertButton);

  function formatGermanDate(isoDate) {
    const parts = isoDate.split("-");
    if (parts.length !== 3) return isoDate;
    return parts[2] + "." + parts[1] + "." + parts[0];
  }

  btnCreateCert.addEventListener("click", () => {
    document.getElementById("certNameOut").textContent = certName.value.trim();
    document.getElementById("certDateOut").textContent = formatGermanDate(certDate.value);
    localStorage.setItem("ipadfs-exam-complete", "1");
    showScreen("certificate", null);
  });

  document.getElementById("btnPrint").addEventListener("click", () => {
    window.print();
  });
})();
