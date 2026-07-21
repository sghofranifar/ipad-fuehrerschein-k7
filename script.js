(function () {
  "use strict";

  /* ---------- Navigation & Progress ---------- */

  const screens = {
    start: document.getElementById("screen-start"),
    s01: document.getElementById("screen-0-1"),
    s02: document.getElementById("screen-0-2"),
    s03: document.getElementById("screen-0-3"),
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
      progressLabel.textContent = "Station " + stationNumber + " von 3";
      progressFill.style.width = (stationNumber / 3) * 100 + "%";
    } else {
      progressWrap.hidden = true;
    }
  }

  document.getElementById("btnStart").addEventListener("click", () => showScreen("s01", 1));
  document.getElementById("btnNext01").addEventListener("click", () => showScreen("s02", 2));
  document.getElementById("btnNext02").addEventListener("click", () => showScreen("s03", 3));
  document.getElementById("btnNext03").addEventListener("click", () => {
    renderSummary();
    showScreen("complete", null);
  });
  document.getElementById("btnRestart").addEventListener("click", () => {
    initMatchGame();
    initQuiz();
    initLabeling();
    showScreen("start", null);
  });

  /* ---------- Station 0.1: Zuordnungsspiel ---------- */

  const rules = [
    { id: "clean", text: "Nur mit sauberen Händen arbeiten", icon: "🧼" },
    { id: "carry", text: "Das Tablet mit beiden Händen tragen", icon: "🤲" },
    { id: "watch", text: "Das iPad nicht unbeaufsichtigt liegen lassen", icon: "👀" },
    { id: "noapps", text: "Keine Apps ohne Erlaubnis installieren", icon: "🚫" },
  ];

  function shuffle(arr) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  let matchSelected = null;
  let matchedCount = 0;

  function initMatchGame() {
    matchSelected = null;
    matchedCount = 0;
    document.getElementById("feedback01").textContent = "";
    document.getElementById("btnNext01").disabled = true;

    const rulesColumn = document.getElementById("rulesColumn");
    const iconsColumn = document.getElementById("iconsColumn");
    rulesColumn.innerHTML = "";
    iconsColumn.innerHTML = "";

    shuffle(rules).forEach((rule) => {
      const btn = document.createElement("button");
      btn.className = "match-item";
      btn.textContent = rule.text;
      btn.dataset.id = rule.id;
      btn.dataset.type = "rule";
      btn.addEventListener("click", () => onMatchItemClick(btn));
      rulesColumn.appendChild(btn);
    });

    shuffle(rules).forEach((rule) => {
      const btn = document.createElement("button");
      btn.className = "match-item icon-item";
      btn.textContent = rule.icon;
      btn.dataset.id = rule.id;
      btn.dataset.type = "icon";
      btn.addEventListener("click", () => onMatchItemClick(btn));
      iconsColumn.appendChild(btn);
    });
  }

  function onMatchItemClick(el) {
    if (el.classList.contains("matched")) return;
    const feedback = document.getElementById("feedback01");

    if (!matchSelected) {
      matchSelected = el;
      el.classList.add("selected");
      feedback.textContent = "";
      feedback.classList.remove("error");
      return;
    }

    if (matchSelected === el) {
      el.classList.remove("selected");
      matchSelected = null;
      return;
    }

    if (matchSelected.dataset.type === el.dataset.type) {
      matchSelected.classList.remove("selected");
      matchSelected = el;
      el.classList.add("selected");
      return;
    }

    if (matchSelected.dataset.id === el.dataset.id) {
      matchSelected.classList.remove("selected");
      matchSelected.classList.add("matched");
      el.classList.add("matched");
      matchSelected = null;
      matchedCount++;
      feedback.textContent = "Richtig! ✓";
      feedback.classList.remove("error");
      if (matchedCount === rules.length) {
        feedback.textContent = "Super, alle Regeln richtig zugeordnet! ✓";
        document.getElementById("btnNext01").disabled = false;
      }
    } else {
      const wrongPair = [matchSelected, el];
      wrongPair.forEach((item) => item.classList.add("wrong"));
      feedback.textContent = "Das passt noch nicht zusammen. Versuch's nochmal!";
      feedback.classList.add("error");
      setTimeout(() => {
        wrongPair.forEach((item) => item.classList.remove("wrong", "selected"));
      }, 500);
      matchSelected = null;
    }
  }

  /* ---------- Station 0.2: Passwort-Quiz ---------- */

  const questions = [
    {
      q: "Welches Passwort ist am sichersten?",
      options: ["MaxMuster2010", "Passwort123", "gB7!kQ2xTz", "Anna2011"],
      correct: 2,
      explanation: "Ein sicheres Passwort ergibt keinen erkennbaren Sinn und mischt Buchstaben, Zahlen und Sonderzeichen.",
    },
    {
      q: "Was gehört NICHT in ein sicheres Passwort?",
      options: ["Dein Geburtsdatum", "Groß- und Kleinbuchstaben", "Sonderzeichen", "Mindestens 8 Zeichen"],
      correct: 0,
      explanation: "Geburtsdaten, Namen und andere persönliche Infos lassen sich leicht erraten.",
    },
    {
      q: "Darfst du dein Passwort mit Freunden teilen, damit sie dir bei Hausaufgaben helfen können?",
      options: ["Ja, kein Problem", "Nein, das Passwort ist immer geheim", "Nur mit dem besten Freund", "Nur wenn eine Lehrkraft dabei ist"],
      correct: 1,
      explanation: "Ein Passwort bleibt immer geheim – auch gegenüber Freunden.",
    },
    {
      q: "Mit welchem Konto meldest du dich in der Google Classroom App an?",
      options: ["Mit einem neuen, privaten Konto", "Mit deinem schulischen Google-Konto", "Mit dem Konto deiner Eltern", "Classroom braucht kein Konto"],
      correct: 1,
      explanation: "Du nutzt dein bekanntes schulisches Google-Konto, das dir die Schule eingerichtet hat.",
    },
    {
      q: "Was machst du, wenn du dein Passwort vergessen hast?",
      options: ["Den ganzen Tag weiter raten", "Eine Lehrkraft oder IT-Ansprechperson fragen", "Das Passwort eines Mitschülers benutzen", "Eine neue App installieren"],
      correct: 1,
      explanation: "Bei Problemen mit dem Login hilft dir immer eine Lehrkraft oder die IT-Ansprechperson weiter.",
    },
  ];

  let quizIndex = 0;
  let quizScore = 0;

  function initQuiz() {
    quizIndex = 0;
    quizScore = 0;
    document.getElementById("quizResult").hidden = true;
    document.getElementById("btnNext02").disabled = true;
    renderQuestion();
  }

  function renderQuestion() {
    const container = document.getElementById("quiz");
    container.innerHTML = "";

    if (quizIndex >= questions.length) {
      showQuizResult();
      return;
    }

    const question = questions[quizIndex];
    const wrap = document.createElement("div");
    wrap.className = "quiz-question";

    const progress = document.createElement("div");
    progress.className = "quiz-progress";
    progress.textContent = "Frage " + (quizIndex + 1) + " von " + questions.length;
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
      btn.addEventListener("click", () => onAnswerSelected(btn, i, question, optionsWrap, wrap));
      optionsWrap.appendChild(btn);
    });

    wrap.appendChild(optionsWrap);
    container.appendChild(wrap);
  }

  function onAnswerSelected(btn, index, question, optionsWrap, wrap) {
    const allOptions = optionsWrap.querySelectorAll(".quiz-option");
    allOptions.forEach((o) => (o.disabled = true));

    if (index === question.correct) {
      btn.classList.add("correct");
      quizScore++;
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
    nextBtn.textContent = quizIndex + 1 < questions.length ? "Nächste Frage" : "Ergebnis anzeigen";
    nextBtn.addEventListener("click", () => {
      quizIndex++;
      renderQuestion();
    });
    wrap.appendChild(nextBtn);
  }

  function showQuizResult() {
    const result = document.getElementById("quizResult");
    result.hidden = false;
    result.textContent = "Du hast " + quizScore + " von " + questions.length + " Fragen richtig beantwortet.";
    document.getElementById("btnNext02").disabled = false;
  }

  /* ---------- Station 0.3: Bauteile zuordnen (Drag & Drop) ---------- */

  const parts = [
    { id: "camera", label: "Frontkamera" },
    { id: "home", label: "Home-Button" },
    { id: "volume", label: "Lautstärketasten" },
    { id: "charging", label: "Ladeanschluss" },
  ];

  let placedCount = 0;
  let activeChip = null;
  let dragState = null;
  const TAP_THRESHOLD = 6;

  function initLabeling() {
    placedCount = 0;
    activeChip = null;
    dragState = null;
    document.getElementById("feedback03").textContent = "";
    document.getElementById("btnNext03").disabled = true;

    document.querySelectorAll(".drop-zone").forEach((zone) => {
      zone.classList.remove("filled");
      zone.textContent = "";
    });

    const tray = document.getElementById("labelsTray");
    tray.innerHTML = "";

    shuffle(parts).forEach((part) => {
      const chip = document.createElement("button");
      chip.className = "draggable";
      chip.textContent = part.label;
      chip.dataset.id = part.id;
      chip.addEventListener("pointerdown", onChipPointerDown);
      tray.appendChild(chip);
    });
  }

  function onChipPointerDown(e) {
    const chip = e.currentTarget;
    if (chip.classList.contains("placed")) return;
    e.preventDefault();

    const rect = chip.getBoundingClientRect();
    dragState = {
      chip,
      startX: e.clientX,
      startY: e.clientY,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
      originRect: rect,
      moved: false,
    };

    chip.setPointerCapture(e.pointerId);
    chip.addEventListener("pointermove", onChipPointerMove);
    chip.addEventListener("pointerup", onChipPointerUp);
  }

  function onChipPointerMove(e) {
    if (!dragState || dragState.chip !== e.currentTarget) return;
    const dx = e.clientX - dragState.startX;
    const dy = e.clientY - dragState.startY;

    if (!dragState.moved && Math.hypot(dx, dy) > TAP_THRESHOLD) {
      dragState.moved = true;
      dragState.chip.classList.add("dragging");
      dragState.chip.style.width = dragState.originRect.width + "px";
    }

    if (dragState.moved) {
      dragState.chip.style.left = e.clientX - dragState.offsetX + "px";
      dragState.chip.style.top = e.clientY - dragState.offsetY + "px";
    }
  }

  function onChipPointerUp(e) {
    const chip = e.currentTarget;
    chip.removeEventListener("pointermove", onChipPointerMove);
    chip.removeEventListener("pointerup", onChipPointerUp);
    if (!dragState || dragState.chip !== chip) return;

    if (!dragState.moved) {
      selectChip(chip);
      dragState = null;
      return;
    }

    const dropZone = findDropZoneAt(e.clientX, e.clientY);
    chip.classList.remove("dragging");
    chip.style.position = "";
    chip.style.left = "";
    chip.style.top = "";
    chip.style.width = "";

    attemptPlacement(chip, dropZone);
    dragState = null;
  }

  function findDropZoneAt(x, y) {
    const el = document.elementFromPoint(x, y);
    return el ? el.closest(".drop-zone") : null;
  }

  function selectChip(chip) {
    if (activeChip) activeChip.classList.remove("selected");
    if (activeChip === chip) {
      activeChip = null;
      return;
    }
    activeChip = chip;
    chip.classList.add("selected");
  }

  document.getElementById("ipadWrap").addEventListener("click", (e) => {
    const zone = e.target.closest(".drop-zone");
    if (!zone || !activeChip) return;
    const chip = activeChip;
    activeChip = null;
    chip.classList.remove("selected");
    attemptPlacement(chip, zone);
  });

  function attemptPlacement(chip, zone) {
    const feedback = document.getElementById("feedback03");

    if (!zone || zone.classList.contains("filled")) {
      feedback.textContent = zone ? "Diese Stelle ist schon belegt." : "Ziehe das Etikett direkt auf eine markierte Stelle.";
      feedback.classList.add("error");
      return;
    }

    if (zone.dataset.target === chip.dataset.id) {
      zone.classList.add("filled");
      zone.textContent = "✓";
      zone.title = chip.textContent;
      chip.classList.add("placed");
      chip.disabled = true;
      placedCount++;
      feedback.textContent = "Richtig! ✓";
      feedback.classList.remove("error");
      if (placedCount === parts.length) {
        feedback.textContent = "Super, alle Bauteile richtig benannt! ✓";
        document.getElementById("btnNext03").disabled = false;
      }
    } else {
      feedback.textContent = "Das ist nicht die richtige Stelle. Versuch's nochmal!";
      feedback.classList.add("error");
    }
  }

  /* ---------- Abschluss ---------- */

  function renderSummary() {
    const summary = document.getElementById("completeSummary");
    summary.innerHTML =
      "<div>✓ Station 0.1 – Nutzungsordnung abgeschlossen</div>" +
      "<div>✓ Station 0.2 – Passwort-Quiz: " + quizScore + " von " + questions.length + " Punkten</div>" +
      "<div>✓ Station 0.3 – Aufbau des Geräts abgeschlossen</div>";
  }

  /* ---------- Init ---------- */

  initMatchGame();
  initQuiz();
  initLabeling();
})();
