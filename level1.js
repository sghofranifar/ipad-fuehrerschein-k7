(function () {
  "use strict";

  /* ---------- Navigation & Progress ---------- */

  const TOTAL_STATIONS = 4;

  const screens = {
    start: document.getElementById("screen-start"),
    s1: document.getElementById("screen-1-1"),
    s2: document.getElementById("screen-1-2"),
    s3: document.getElementById("screen-1-3"),
    s4: document.getElementById("screen-1-4"),
    complete: document.getElementById("screen-complete"),
  };

  const progressWrap = document.getElementById("progressWrap");
  const progressLabel = document.getElementById("progressLabel");
  const progressFill = document.getElementById("progressFill");

  function showScreen(name, stationNumber) {
    Object.values(screens).forEach((el) => el.classList.remove("active"));
    screens[name].classList.add("active");
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });

    if (stationNumber) {
      progressWrap.hidden = false;
      progressLabel.textContent = "Station " + stationNumber + " von " + TOTAL_STATIONS;
      progressFill.style.width = (stationNumber / TOTAL_STATIONS) * 100 + "%";
    } else {
      progressWrap.hidden = true;
    }
  }

  document.getElementById("btnStart").addEventListener("click", () => showScreen("s1", 1));
  document.getElementById("btnNext11").addEventListener("click", () => showScreen("s2", 2));
  document.getElementById("btnNext12").addEventListener("click", () => showScreen("s3", 3));
  document.getElementById("btnNext13").addEventListener("click", () => showScreen("s4", 4));
  document.getElementById("btnNext14").addEventListener("click", () => {
    renderSummary();
    localStorage.setItem("ipadfs-level1-complete", "1");
    showScreen("complete", null);
  });
  document.getElementById("btnRestart").addEventListener("click", () => {
    initChecklist11();
    initQuiz12();
    initStation13();
    initStation14();
    showScreen("start", null);
  });

  function shuffle(arr) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  /* Wires a checklist container's checkboxes to a callback fired whenever
     the "all checked" state changes. */
  function wireChecklist(containerId, onAllChecked) {
    const container = document.getElementById(containerId);
    const boxes = Array.from(container.querySelectorAll("[data-check]"));
    boxes.forEach((box) => {
      box.checked = false;
      box.addEventListener("change", () => {
        onAllChecked(boxes.every((b) => b.checked));
      });
    });
    return boxes;
  }

  /* ---------- Station 1.1: Checkliste ---------- */

  function initChecklist11() {
    const btn = document.getElementById("btnNext11");
    btn.disabled = true;
    wireChecklist("checklist11", (allChecked) => {
      btn.disabled = !allChecked;
    });
  }

  /* ---------- Station 1.2: Kontrollzentrum-Quiz ---------- */

  const questions12 = [
    {
      q: "Wie öffnest du das Kontrollzentrum auf dem iPad?",
      options: [
        "Wischen von der rechten oberen Ecke nach unten",
        "Doppelklick auf den Home-Button",
        "Wischen von unten nach oben in der Mitte",
        "Zweimal auf den Bildschirm tippen",
      ],
      correct: 0,
      explanation: "Das Kontrollzentrum öffnest du mit einem Wisch von der rechten oberen Ecke nach unten.",
    },
    {
      q: "Welches Symbol steht für den „Nicht stören“-Modus?",
      options: ["🌙 Mond", "✈️ Flugzeug", "🔆 Sonne", "🔒 Schloss mit Pfeil"],
      correct: 0,
      explanation: "Das Mond-Symbol 🌙 aktiviert den „Nicht stören“-Modus – Benachrichtigungen bleiben stumm.",
    },
    {
      q: "Was bewirkt der Flugzeug-Modus (✈️) im Kontrollzentrum?",
      options: [
        "Er schaltet WLAN, Mobilfunk und Bluetooth aus",
        "Er startet eine Flugzeug-App",
        "Er sperrt den Bildschirm",
        "Er macht ein Foto",
      ],
      correct: 0,
      explanation: "Der Flugzeug-Modus schaltet alle Funkverbindungen auf einmal aus.",
    },
    {
      q: "Wie fügst du dem Kontrollzentrum weitere Module hinzu oder entfernst sie?",
      options: [
        "Über die Einstellungen unter „Kontrollzentrum“",
        "Das geht nicht",
        "Nur eine Lehrkraft kann das",
        "Über den App Store",
      ],
      correct: 0,
      explanation: "In den Einstellungen unter „Kontrollzentrum“ lassen sich Module hinzufügen, entfernen und sortieren.",
    },
    {
      q: "Wofür steht das Symbol 🔒 mit dem gebogenen Pfeil im Kontrollzentrum?",
      options: [
        "Bildschirmausrichtung sperren",
        "Ton stumm schalten",
        "Bildschirm sperren",
        "WLAN aktivieren",
      ],
      correct: 0,
      explanation: "Dieses Symbol sperrt die Bildschirmausrichtung, sodass sich die Anzeige beim Drehen nicht mitdreht.",
    },
  ];

  let quizIndex12 = 0;
  let quizScore12 = 0;

  function initQuiz12() {
    quizIndex12 = 0;
    quizScore12 = 0;
    document.getElementById("quizResult12").hidden = true;
    document.getElementById("btnNext12").disabled = true;
    renderQuestion12();
  }

  function renderQuestion12() {
    const container = document.getElementById("quiz12");
    container.innerHTML = "";

    if (quizIndex12 >= questions12.length) {
      const result = document.getElementById("quizResult12");
      result.hidden = false;
      result.textContent = "Du hast " + quizScore12 + " von " + questions12.length + " Fragen richtig beantwortet.";
      document.getElementById("btnNext12").disabled = false;
      return;
    }

    const question = questions12[quizIndex12];
    const wrap = document.createElement("div");
    wrap.className = "quiz-question";

    const progress = document.createElement("div");
    progress.className = "quiz-progress";
    progress.textContent = "Frage " + (quizIndex12 + 1) + " von " + questions12.length;
    wrap.appendChild(progress);

    const h3 = document.createElement("h3");
    h3.textContent = question.q;
    wrap.appendChild(h3);

    const optionsWrap = document.createElement("div");
    optionsWrap.className = "quiz-options";

    question.options.forEach((option, i) => {
      const btn = document.createElement("button");
      btn.className = "quiz-option";
      btn.textContent = option;
      btn.addEventListener("click", () => {
        const allOptions = optionsWrap.querySelectorAll(".quiz-option");
        allOptions.forEach((o) => (o.disabled = true));

        if (i === question.correct) {
          btn.classList.add("correct");
          quizScore12++;
        } else {
          btn.classList.add("incorrect");
          allOptions[question.correct].classList.add("correct");
        }

        const explanation = document.createElement("p");
        explanation.className = "quiz-explanation";
        explanation.textContent = question.explanation;
        wrap.appendChild(explanation);

        const nextBtn = document.createElement("button");
        nextBtn.className = "quiz-next";
        nextBtn.textContent = quizIndex12 + 1 < questions12.length ? "Nächste Frage" : "Ergebnis anzeigen";
        nextBtn.addEventListener("click", () => {
          quizIndex12++;
          renderQuestion12();
        });
        wrap.appendChild(nextBtn);
      });
      optionsWrap.appendChild(btn);
    });

    wrap.appendChild(optionsWrap);
    container.appendChild(wrap);
  }

  /* ---------- Station 1.3: Screenshot-Checkliste + QR-Schnitzeljagd ---------- */

  const qrWords = ["GUT", "GEMACHT", "IPAD", "PROFI"];
  let qrScanned = 0;
  let checklist13Done = false;
  let qrSolved = false;

  function mulberry32(seed) {
    return function () {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function buildQrSvg(seed) {
    const n = 11;
    const cell = 10;
    const size = n * cell;
    const rand = mulberry32(seed);

    function inFinderZone(x, y) {
      const inTL = x < 5 && y < 5;
      const inTR = x >= n - 5 && y < 5;
      const inBL = x < 5 && y >= n - 5;
      return inTL || inTR || inBL;
    }

    let darkCells = "";
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        if (inFinderZone(x, y)) continue;
        if (rand() < 0.48) {
          darkCells += `<rect x="${x * cell}" y="${y * cell}" width="${cell}" height="${cell}"/>`;
        }
      }
    }

    function finder(ox, oy) {
      return (
        `<rect x="${ox}" y="${oy}" width="${5 * cell}" height="${5 * cell}" fill="#1b1b1b"/>` +
        `<rect x="${ox + cell}" y="${oy + cell}" width="${3 * cell}" height="${3 * cell}" fill="#ffffff"/>` +
        `<rect x="${ox + 2 * cell}" y="${oy + 2 * cell}" width="${cell}" height="${cell}" fill="#1b1b1b"/>`
      );
    }

    return (
      `<svg viewBox="0 0 ${size} ${size}" class="qr-svg" xmlns="http://www.w3.org/2000/svg">` +
      `<rect width="${size}" height="${size}" fill="#ffffff"/>` +
      `<g fill="#1b1b1b">${darkCells}</g>` +
      finder(0, 0) +
      finder((n - 5) * cell, 0) +
      finder(0, (n - 5) * cell) +
      `</svg>`
    );
  }

  function initStation13() {
    qrScanned = 0;
    checklist13Done = false;
    qrSolved = false;
    document.getElementById("feedback13").textContent = "";
    document.getElementById("feedback13").classList.remove("error");
    document.getElementById("btnNext13").disabled = true;

    wireChecklist("checklist13pre", (allChecked) => {
      checklist13Done = allChecked;
      updateNext13();
    });

    renderQrHunt();
  }

  function updateNext13() {
    document.getElementById("btnNext13").disabled = !(checklist13Done && qrSolved);
  }

  function renderQrHunt() {
    const hunt = document.getElementById("qrHunt");
    hunt.innerHTML = "";

    const cardsWrap = document.createElement("div");
    cardsWrap.className = "qr-cards";

    qrWords.forEach((word, i) => {
      const card = document.createElement("div");
      card.className = "qr-card";
      card.dataset.index = i;

      if (i < qrScanned) {
        card.classList.add("qr-card--scanned");
        card.innerHTML = `<div class="qr-word">${word}</div><div class="qr-check">✓ gescannt</div>`;
      } else if (i === qrScanned) {
        card.classList.add("qr-card--active");
        card.innerHTML = `${buildQrSvg(i + 1)}<button class="btn-secondary qr-scan-btn">QR-Code scannen</button>`;
        card.querySelector(".qr-scan-btn").addEventListener("click", () => {
          qrScanned++;
          renderQrHunt();
        });
      } else {
        card.classList.add("qr-card--locked");
        card.innerHTML = `<div class="qr-lock">🔒</div><div class="qr-word qr-word--locked">Code ${i + 1}</div>`;
      }

      cardsWrap.appendChild(card);
    });

    hunt.appendChild(cardsWrap);

    if (qrScanned === qrWords.length && !qrSolved) {
      const solveWrap = document.createElement("div");
      solveWrap.className = "qr-solve";
      solveWrap.innerHTML =
        `<p class="task-desc">Gefundene Wörter: <strong>${qrWords.join(" · ")}</strong></p>` +
        `<p class="task-desc">Setze die Wörter in der richtigen Reihenfolge zu einem Satz zusammen und gib ihn hier ein:</p>` +
        `<input type="text" class="qr-input" id="qrInput" placeholder="Lösungssatz eingeben...">` +
        `<button class="btn-primary" id="qrCheckBtn">Prüfen</button>`;
      hunt.appendChild(solveWrap);

      document.getElementById("qrCheckBtn").addEventListener("click", () => {
        const input = document.getElementById("qrInput").value.trim().toUpperCase().replace(/\s+/g, " ");
        const feedback = document.getElementById("feedback13");
        if (input === qrWords.join(" ")) {
          qrSolved = true;
          feedback.textContent = "Richtig gelöst! ✓ " + qrWords.join(" ");
          feedback.classList.remove("error");
          document.getElementById("qrInput").disabled = true;
          document.getElementById("qrCheckBtn").disabled = true;
          updateNext13();
        } else {
          feedback.textContent = "Das passt noch nicht ganz. Prüfe die Reihenfolge der Wörter!";
          feedback.classList.add("error");
        }
      });
    }
  }

  /* ---------- Station 1.4: Chrome-Schritte + Verständnisfrage ---------- */

  let checklist14Done = false;
  let question14Answered = false;

  function initStation14() {
    checklist14Done = false;
    question14Answered = false;
    document.getElementById("btnNext14").disabled = true;

    wireChecklist("checklist14", (allChecked) => {
      checklist14Done = allChecked;
      updateNext14();
    });

    renderQuestion14();
  }

  function updateNext14() {
    document.getElementById("btnNext14").disabled = !(checklist14Done && question14Answered);
  }

  function renderQuestion14() {
    const container = document.getElementById("quiz14");
    container.innerHTML = "";

    const question = {
      q: "Warum ist ein Lesezeichen nützlich?",
      options: [
        "Damit man eine Webseite wiederfindet, ohne die Adresse neu einzutippen",
        "Damit die Webseite schneller lädt",
        "Damit niemand anders die Webseite sehen kann",
        "Damit das iPad automatisch Updates installiert",
      ],
      correct: 0,
      explanation: "Ein Lesezeichen speichert den Link, sodass du die Seite jederzeit mit einem Tipp wiederfindest.",
    };

    const wrap = document.createElement("div");
    wrap.className = "quiz-question";

    const h3 = document.createElement("h3");
    h3.textContent = question.q;
    wrap.appendChild(h3);

    const optionsWrap = document.createElement("div");
    optionsWrap.className = "quiz-options";

    question.options.forEach((option, i) => {
      const btn = document.createElement("button");
      btn.className = "quiz-option";
      btn.textContent = option;
      btn.addEventListener("click", () => {
        const allOptions = optionsWrap.querySelectorAll(".quiz-option");
        allOptions.forEach((o) => (o.disabled = true));

        if (i === question.correct) {
          btn.classList.add("correct");
        } else {
          btn.classList.add("incorrect");
          allOptions[question.correct].classList.add("correct");
        }

        const explanation = document.createElement("p");
        explanation.className = "quiz-explanation";
        explanation.textContent = question.explanation;
        wrap.appendChild(explanation);

        question14Answered = true;
        updateNext14();
      });
      optionsWrap.appendChild(btn);
    });

    wrap.appendChild(optionsWrap);
    container.appendChild(wrap);
  }

  /* ---------- Abschluss ---------- */

  function renderSummary() {
    const summary = document.getElementById("completeSummary");
    summary.innerHTML =
      "<div>✓ Station 1.1 – Navigation &amp; Personalisierung abgeschlossen</div>" +
      "<div>✓ Station 1.2 – Kontrollzentrum-Quiz: " + quizScore12 + " von " + questions12.length + " Punkten</div>" +
      "<div>✓ Station 1.3 – QR-Code-Schnitzeljagd gelöst</div>" +
      "<div>✓ Station 1.4 – Chrome-Grundlagen abgeschlossen</div>";
  }

  /* ---------- Init ---------- */

  initChecklist11();
  initQuiz12();
  initStation13();
  initStation14();
})();
