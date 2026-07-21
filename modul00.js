(function () {
  "use strict";

  var L = function (o) { return window.I18N ? window.I18N.L(o) : o.de; };

  /* ---------- Navigation & Progress ---------- */

  var screens = {
    start: document.getElementById("screen-start"),
    s01: document.getElementById("screen-0-1"),
    s02: document.getElementById("screen-0-2"),
    s03: document.getElementById("screen-0-3"),
    complete: document.getElementById("screen-complete"),
  };

  var progressWrap = document.getElementById("progressWrap");
  var progressLabel = document.getElementById("progressLabel");
  var progressFill = document.getElementById("progressFill");
  var currentStation = null;

  function updateProgressLabel() {
    if (currentStation) {
      progressLabel.textContent = L({
        de: "Station " + currentStation + " von 3",
        en: "Station " + currentStation + " of 3",
      });
    }
  }

  function showScreen(name, stationNumber) {
    Object.keys(screens).forEach(function (k) { screens[k].classList.remove("active"); });
    screens[name].classList.add("active");
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });

    currentStation = stationNumber || null;
    if (stationNumber) {
      progressWrap.hidden = false;
      updateProgressLabel();
      progressFill.style.width = (stationNumber / 3) * 100 + "%";
    } else {
      progressWrap.hidden = true;
    }
  }

  document.getElementById("btnStart").addEventListener("click", function () { showScreen("s01", 1); });
  document.getElementById("btnNext01").addEventListener("click", function () { showScreen("s02", 2); });
  document.getElementById("btnNext02").addEventListener("click", function () { showScreen("s03", 3); });
  document.getElementById("btnNext03").addEventListener("click", function () {
    renderSummary();
    localStorage.setItem("ipadfs-modul00-complete", "1");
    showScreen("complete", null);
  });
  document.getElementById("btnRestart").addEventListener("click", function () {
    initMatchGame();
    initRulesQuiz();
    initPwQuiz();
    initLabeling();
    showScreen("start", null);
  });

  // Nutzungsordnung link is a placeholder until the teacher adds the real URL.
  document.getElementById("driveLink").addEventListener("click", function (e) {
    if (this.getAttribute("href") === "#") e.preventDefault();
  });

  function shuffle(arr) {
    var copy = arr.slice();
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = copy[i]; copy[i] = copy[j]; copy[j] = tmp;
    }
    return copy;
  }

  /* ---------- Station 0.1: Zuordnungsspiel ---------- */

  var rules = [
    { id: "clean", icon: "🧼", text: { de: "Nur mit sauberen Händen und ohne Essen oder Trinken am iPad arbeiten", en: "Only work with clean hands, no food or drinks near the iPad" } },
    { id: "carry", icon: "🤲", text: { de: "Das iPad immer vorsichtig mit beiden Händen tragen", en: "Always carry the iPad carefully with both hands" } },
    { id: "photos", icon: "📵", text: { de: "Keine Fotos oder Videos von anderen ohne deren Erlaubnis aufnehmen", en: "Never take photos or videos of others without their permission" } },
    { id: "charge", icon: "🔋", text: { de: "Das iPad jeden Abend zu Hause vollständig aufladen", en: "Fully charge the iPad at home every evening" } },
    { id: "install", icon: "🚫", text: { de: "Keine Apps ohne Erlaubnis der Lehrkraft installieren", en: "Do not install apps without the teacher's permission" } },
    { id: "focus", icon: "🎯", text: { de: "Im Unterricht nur die Apps nutzen, die die Lehrkraft erlaubt", en: "In class, only use the apps the teacher allows" } },
  ];

  var fb = {
    right: { de: "Richtig! ✓", en: "Correct! ✓" },
    allRules: { de: "Super, alle Regeln richtig zugeordnet! ✓", en: "Great, all rules matched correctly! ✓" },
    wrongMatch: { de: "Das passt noch nicht zusammen. Versuch's nochmal!", en: "That doesn't match yet. Try again!" },
  };

  var matchSelected = null;
  var matchedCount = 0;

  function initMatchGame() {
    matchSelected = null;
    matchedCount = 0;
    document.getElementById("feedback01").textContent = "";
    updateNext01();

    var rulesColumn = document.getElementById("rulesColumn");
    var iconsColumn = document.getElementById("iconsColumn");
    rulesColumn.innerHTML = "";
    iconsColumn.innerHTML = "";

    shuffle(rules).forEach(function (rule) {
      var btn = document.createElement("button");
      btn.className = "match-item";
      btn.textContent = L(rule.text);
      btn.dataset.id = rule.id;
      btn.dataset.type = "rule";
      btn.addEventListener("click", function () { onMatchItemClick(btn); });
      rulesColumn.appendChild(btn);
    });

    shuffle(rules).forEach(function (rule) {
      var btn = document.createElement("button");
      btn.className = "match-item icon-item";
      btn.textContent = rule.icon;
      btn.dataset.id = rule.id;
      btn.dataset.type = "icon";
      btn.addEventListener("click", function () { onMatchItemClick(btn); });
      iconsColumn.appendChild(btn);
    });
  }

  function onMatchItemClick(el) {
    if (el.classList.contains("matched")) return;
    var feedback = document.getElementById("feedback01");

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
      feedback.textContent = L(fb.right);
      feedback.classList.remove("error");
      if (matchedCount === rules.length) {
        feedback.textContent = L(fb.allRules);
        updateNext01();
      }
    } else {
      var wrongPair = [matchSelected, el];
      wrongPair.forEach(function (item) { item.classList.add("wrong"); });
      feedback.textContent = L(fb.wrongMatch);
      feedback.classList.add("error");
      setTimeout(function () {
        wrongPair.forEach(function (item) { item.classList.remove("wrong", "selected"); });
      }, 500);
      matchSelected = null;
    }
  }

  /* ---------- Station 0.1: Regel-Quiz ---------- */

  var rulesQuestions = [
    {
      q: { de: "Du spielst im Unterricht ohne Erlaubnis. Was passiert?", en: "You play games in class without permission. What happens?" },
      options: [
        { de: "Das iPad wird eingesammelt und am Ende des Schultages zurückgegeben", en: "The iPad is collected and returned at the end of the school day" },
        { de: "Nichts", en: "Nothing" },
        { de: "Das iPad wird sofort komplett gelöscht", en: "The iPad is wiped immediately" },
        { de: "Du bekommst ein neues iPad", en: "You get a new iPad" },
      ],
      correct: 0,
      explanation: { de: "Bei unerlaubtem Spielen wird das iPad eingesammelt und erst am Ende des Schultages zurückgegeben.", en: "For unauthorised gaming the iPad is collected and only returned at the end of the school day." },
    },
    {
      q: { de: "Was passiert, wenn dein iPad zum dritten Mal eingesammelt wird?", en: "What happens when your iPad is collected for the third time?" },
      options: [
        { de: "Deine Eltern werden zu einem Gespräch in die Schule eingeladen", en: "Your parents are invited to a meeting at school" },
        { de: "Nichts weiter", en: "Nothing further" },
        { de: "Du darfst das iPad ab sofort behalten", en: "You get to keep the iPad from now on" },
        { de: "Die Schule kauft dir ein neues", en: "The school buys you a new one" },
      ],
      correct: 0,
      explanation: { de: "Beim dritten Mal werden deine Eltern zu einem Gespräch in die Schule eingeladen.", en: "On the third time your parents are invited to a meeting at school." },
    },
    {
      q: { de: "Darfst du ein Foto von einer Mitschülerin machen und teilen?", en: "May you take a photo of a classmate and share it?" },
      options: [
        { de: "Nein, nicht ohne ihre ausdrückliche Erlaubnis", en: "No, not without their explicit permission" },
        { de: "Ja, immer", en: "Yes, always" },
        { de: "Nur in der Pause", en: "Only during break" },
        { de: "Nur wenn es lustig ist", en: "Only if it's funny" },
      ],
      correct: 0,
      explanation: { de: "Fotos oder Videos von anderen sind nur mit deren ausdrücklicher Erlaubnis erlaubt.", en: "Photos or videos of others are only allowed with their explicit permission." },
    },
    {
      q: { de: "Wann solltest du dein iPad aufladen?", en: "When should you charge your iPad?" },
      options: [
        { de: "Jeden Abend zu Hause, damit es morgens voll geladen ist", en: "Every evening at home so it's fully charged in the morning" },
        { de: "Nie, das ist egal", en: "Never, it doesn't matter" },
        { de: "Nur in der Schule während des Unterrichts", en: "Only at school during lessons" },
        { de: "Einmal im Monat", en: "Once a month" },
      ],
      correct: 0,
      explanation: { de: "Lade dein iPad jeden Abend zu Hause auf, damit es im Unterricht einsatzbereit ist.", en: "Charge your iPad every evening at home so it's ready for lessons." },
    },
  ];

  var rqIndex = 0;
  var rqScore = 0;
  var rqDone = false;

  function initRulesQuiz() {
    rqIndex = 0;
    rqScore = 0;
    rqDone = false;
    renderRulesQuestion();
    updateNext01();
  }

  function renderRulesQuestion() {
    var container = document.getElementById("rulesQuiz");
    container.innerHTML = "";

    if (rqIndex >= rulesQuestions.length) {
      rqDone = true;
      var result = document.createElement("div");
      result.className = "quiz-result";
      result.textContent = L({
        de: "Regel-Quiz: " + rqScore + " von " + rulesQuestions.length + " richtig.",
        en: "Rules quiz: " + rqScore + " of " + rulesQuestions.length + " correct.",
      });
      container.appendChild(result);
      updateNext01();
      return;
    }

    var question = rulesQuestions[rqIndex];
    var wrap = document.createElement("div");
    wrap.className = "quiz-question";

    var progress = document.createElement("div");
    progress.className = "quiz-progress";
    progress.textContent = L({ de: "Frage " + (rqIndex + 1) + " von " + rulesQuestions.length, en: "Question " + (rqIndex + 1) + " of " + rulesQuestions.length });
    wrap.appendChild(progress);

    var h3 = document.createElement("h3");
    h3.textContent = L(question.q);
    wrap.appendChild(h3);

    var optionsWrap = document.createElement("div");
    optionsWrap.className = "quiz-options";

    question.options.forEach(function (option, i) {
      var btn = document.createElement("button");
      btn.className = "quiz-option";
      btn.textContent = L(option);
      btn.addEventListener("click", function () {
        var allOptions = optionsWrap.querySelectorAll(".quiz-option");
        allOptions.forEach(function (o) { o.disabled = true; });
        if (i === question.correct) {
          btn.classList.add("correct");
          rqScore++;
        } else {
          btn.classList.add("incorrect");
          allOptions[question.correct].classList.add("correct");
        }
        var explanation = document.createElement("p");
        explanation.className = "quiz-explanation";
        explanation.textContent = L(question.explanation);
        wrap.appendChild(explanation);

        var nextBtn = document.createElement("button");
        nextBtn.className = "quiz-next";
        nextBtn.textContent = L(rqIndex + 1 < rulesQuestions.length ? { de: "Nächste Frage", en: "Next question" } : { de: "Ergebnis anzeigen", en: "Show result" });
        nextBtn.addEventListener("click", function () { rqIndex++; renderRulesQuestion(); });
        wrap.appendChild(nextBtn);
      });
      optionsWrap.appendChild(btn);
    });

    wrap.appendChild(optionsWrap);
    container.appendChild(wrap);
  }

  function updateNext01() {
    document.getElementById("btnNext01").disabled = !(matchedCount === rules.length && rqDone);
  }

  /* ---------- Station 0.2: Passwort-Quiz ---------- */

  var questions = [
    {
      q: { de: "Welches Passwort ist am sichersten?", en: "Which password is the most secure?" },
      options: [
        { de: "MaxMuster2010", en: "MaxMuster2010" },
        { de: "Passwort123", en: "Password123" },
        { de: "gB7!kQ2xTz", en: "gB7!kQ2xTz" },
        { de: "Anna2011", en: "Anna2011" },
      ],
      correct: 2,
      explanation: { de: "Ein sicheres Passwort ergibt keinen erkennbaren Sinn und mischt Buchstaben, Zahlen und Sonderzeichen.", en: "A secure password makes no obvious sense and mixes letters, numbers and special characters." },
    },
    {
      q: { de: "Was gehört NICHT in ein sicheres Passwort?", en: "What does NOT belong in a secure password?" },
      options: [
        { de: "Dein Geburtsdatum", en: "Your date of birth" },
        { de: "Groß- und Kleinbuchstaben", en: "Upper- and lowercase letters" },
        { de: "Sonderzeichen", en: "Special characters" },
        { de: "Mindestens 8 Zeichen", en: "At least 8 characters" },
      ],
      correct: 0,
      explanation: { de: "Geburtsdaten, Namen und andere persönliche Infos lassen sich leicht erraten.", en: "Dates of birth, names and other personal info are easy to guess." },
    },
    {
      q: { de: "Darfst du dein Passwort mit Freunden teilen, damit sie dir bei Hausaufgaben helfen können?", en: "May you share your password with friends so they can help with homework?" },
      options: [
        { de: "Ja, kein Problem", en: "Yes, no problem" },
        { de: "Nein, das Passwort ist immer geheim", en: "No, your password is always secret" },
        { de: "Nur mit dem besten Freund", en: "Only with your best friend" },
        { de: "Nur wenn eine Lehrkraft dabei ist", en: "Only if a teacher is present" },
      ],
      correct: 1,
      explanation: { de: "Ein Passwort bleibt immer geheim – auch gegenüber Freunden.", en: "A password always stays secret – even from friends." },
    },
    {
      q: { de: "Mit welchem Konto meldest du dich in der Google Classroom App an?", en: "Which account do you use to log in to the Google Classroom app?" },
      options: [
        { de: "Mit einem neuen, privaten Konto", en: "With a new, private account" },
        { de: "Mit deinem schulischen Google-Konto", en: "With your school Google account" },
        { de: "Mit dem Konto deiner Eltern", en: "With your parents' account" },
        { de: "Classroom braucht kein Konto", en: "Classroom needs no account" },
      ],
      correct: 1,
      explanation: { de: "Du nutzt dein bekanntes schulisches Google-Konto, das dir die Schule eingerichtet hat.", en: "You use your familiar school Google account, set up for you by the school." },
    },
    {
      q: { de: "Was machst du, wenn du dein Passwort vergessen hast?", en: "What do you do if you've forgotten your password?" },
      options: [
        { de: "Den ganzen Tag weiter raten", en: "Keep guessing all day" },
        { de: "Eine Lehrkraft oder IT-Ansprechperson fragen", en: "Ask a teacher or IT contact" },
        { de: "Das Passwort eines Mitschülers benutzen", en: "Use a classmate's password" },
        { de: "Eine neue App installieren", en: "Install a new app" },
      ],
      correct: 1,
      explanation: { de: "Bei Problemen mit dem Login hilft dir immer eine Lehrkraft oder die IT-Ansprechperson weiter.", en: "For login problems a teacher or the IT contact will always help you." },
    },
  ];

  var quizIndex = 0;
  var quizScore = 0;

  function initPwQuiz() {
    quizIndex = 0;
    quizScore = 0;
    document.getElementById("quizResult").hidden = true;
    document.getElementById("btnNext02").disabled = true;
    renderQuestion();
  }

  function renderQuestion() {
    var container = document.getElementById("quiz");
    container.innerHTML = "";

    if (quizIndex >= questions.length) {
      showQuizResult();
      return;
    }

    var question = questions[quizIndex];
    var wrap = document.createElement("div");
    wrap.className = "quiz-question";

    var progress = document.createElement("div");
    progress.className = "quiz-progress";
    progress.textContent = L({ de: "Frage " + (quizIndex + 1) + " von " + questions.length, en: "Question " + (quizIndex + 1) + " of " + questions.length });
    wrap.appendChild(progress);

    var h3 = document.createElement("h3");
    h3.textContent = L(question.q);
    wrap.appendChild(h3);

    var optionsWrap = document.createElement("div");
    optionsWrap.className = "quiz-options";

    question.options.forEach(function (option, i) {
      var btn = document.createElement("button");
      btn.className = "quiz-option";
      btn.textContent = L(option);
      btn.addEventListener("click", function () { onAnswerSelected(btn, i, question, optionsWrap, wrap); });
      optionsWrap.appendChild(btn);
    });

    wrap.appendChild(optionsWrap);
    container.appendChild(wrap);
  }

  function onAnswerSelected(btn, index, question, optionsWrap, wrap) {
    var allOptions = optionsWrap.querySelectorAll(".quiz-option");
    allOptions.forEach(function (o) { o.disabled = true; });

    if (index === question.correct) {
      btn.classList.add("correct");
      quizScore++;
    } else {
      btn.classList.add("incorrect");
      allOptions[question.correct].classList.add("correct");
    }

    var explanation = document.createElement("p");
    explanation.className = "quiz-explanation";
    explanation.textContent = L(question.explanation);
    wrap.appendChild(explanation);

    var nextBtn = document.createElement("button");
    nextBtn.className = "quiz-next";
    nextBtn.textContent = L(quizIndex + 1 < questions.length ? { de: "Nächste Frage", en: "Next question" } : { de: "Ergebnis anzeigen", en: "Show result" });
    nextBtn.addEventListener("click", function () { quizIndex++; renderQuestion(); });
    wrap.appendChild(nextBtn);
  }

  function showQuizResult() {
    var result = document.getElementById("quizResult");
    result.hidden = false;
    result.textContent = L({
      de: "Du hast " + quizScore + " von " + questions.length + " Fragen richtig beantwortet.",
      en: "You answered " + quizScore + " of " + questions.length + " questions correctly.",
    });
    document.getElementById("btnNext02").disabled = false;
  }

  /* ---------- Station 0.3: Bauteile zuordnen (Drag & Drop) ---------- */

  var parts = [
    { id: "camera", label: { de: "Frontkamera", en: "Front camera" } },
    { id: "home", label: { de: "Home-Button", en: "Home button" } },
    { id: "volume", label: { de: "Lautstärketasten", en: "Volume buttons" } },
    { id: "charging", label: { de: "Ladeanschluss", en: "Charging port" } },
  ];

  var labelFb = {
    right: { de: "Richtig! ✓", en: "Correct! ✓" },
    all: { de: "Super, alle Bauteile richtig benannt! ✓", en: "Great, all parts named correctly! ✓" },
    wrong: { de: "Das ist nicht die richtige Stelle. Versuch's nochmal!", en: "That's not the right spot. Try again!" },
    occupied: { de: "Diese Stelle ist schon belegt.", en: "That spot is already taken." },
    noZone: { de: "Ziehe das Etikett direkt auf eine markierte Stelle.", en: "Drag the label directly onto a marked spot." },
  };

  var placedCount = 0;
  var activeChip = null;
  var dragState = null;
  var TAP_THRESHOLD = 6;
  var HIT_TOLERANCE = 46; // px – forgiving drop radius so thin zones (volume) are easy to hit

  function initLabeling() {
    placedCount = 0;
    activeChip = null;
    if (dragState && dragState.chip) resetChipStyle(dragState.chip);
    dragState = null;
    document.getElementById("feedback03").textContent = "";
    document.getElementById("feedback03").classList.remove("error");
    document.getElementById("btnNext03").disabled = true;

    document.querySelectorAll(".drop-zone").forEach(function (zone) {
      zone.classList.remove("filled");
      zone.textContent = "";
      zone.removeAttribute("title");
    });

    var tray = document.getElementById("labelsTray");
    tray.innerHTML = "";

    shuffle(parts).forEach(function (part) {
      var chip = document.createElement("button");
      chip.className = "draggable";
      chip.textContent = L(part.label);
      chip.dataset.id = part.id;
      chip.addEventListener("pointerdown", onChipPointerDown);
      tray.appendChild(chip);
    });
  }

  function resetChipStyle(chip) {
    chip.classList.remove("dragging");
    chip.style.position = "";
    chip.style.left = "";
    chip.style.top = "";
    chip.style.width = "";
  }

  function onChipPointerDown(e) {
    var chip = e.currentTarget;
    if (chip.classList.contains("placed")) return;
    e.preventDefault();

    var rect = chip.getBoundingClientRect();
    dragState = {
      chip: chip,
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
    chip.addEventListener("pointercancel", onChipPointerCancel);
  }

  function onChipPointerMove(e) {
    if (!dragState || dragState.chip !== e.currentTarget) return;
    var dx = e.clientX - dragState.startX;
    var dy = e.clientY - dragState.startY;

    if (!dragState.moved && Math.sqrt(dx * dx + dy * dy) > TAP_THRESHOLD) {
      dragState.moved = true;
      dragState.chip.classList.add("dragging");
      dragState.chip.style.width = dragState.originRect.width + "px";
    }
    if (dragState.moved) {
      dragState.chip.style.left = e.clientX - dragState.offsetX + "px";
      dragState.chip.style.top = e.clientY - dragState.offsetY + "px";
    }
  }

  function cleanupChipListeners(chip) {
    chip.removeEventListener("pointermove", onChipPointerMove);
    chip.removeEventListener("pointerup", onChipPointerUp);
    chip.removeEventListener("pointercancel", onChipPointerCancel);
  }

  function onChipPointerCancel(e) {
    var chip = e.currentTarget;
    cleanupChipListeners(chip);
    resetChipStyle(chip);
    dragState = null;
  }

  function onChipPointerUp(e) {
    var chip = e.currentTarget;
    cleanupChipListeners(chip);
    if (!dragState || dragState.chip !== chip) return;

    if (!dragState.moved) {
      selectChip(chip);
      dragState = null;
      return;
    }

    var dropZone = findNearestDropZone(e.clientX, e.clientY);
    resetChipStyle(chip);
    attemptPlacement(chip, dropZone);
    dragState = null;
  }

  // Returns the unfilled drop-zone whose centre is nearest to (x, y) within
  // HIT_TOLERANCE. Far more forgiving than elementFromPoint, so thin zones
  // like the volume buttons are easy to hit.
  function findNearestDropZone(x, y) {
    var best = null;
    var bestDist = Infinity;
    document.querySelectorAll(".drop-zone").forEach(function (zone) {
      if (zone.classList.contains("filled")) return;
      var r = zone.getBoundingClientRect();
      var cx = r.left + r.width / 2;
      var cy = r.top + r.height / 2;
      // distance to the zone's rectangle (0 if inside), plus a tolerance margin
      var ddx = Math.max(r.left - x, 0, x - r.right);
      var ddy = Math.max(r.top - y, 0, y - r.bottom);
      var edgeDist = Math.sqrt(ddx * ddx + ddy * ddy);
      var centreDist = Math.sqrt((cx - x) * (cx - x) + (cy - y) * (cy - y));
      if (edgeDist <= HIT_TOLERANCE && centreDist < bestDist) {
        bestDist = centreDist;
        best = zone;
      }
    });
    return best;
  }

  function selectChip(chip) {
    if (activeChip) activeChip.classList.remove("selected");
    if (activeChip === chip) { activeChip = null; return; }
    activeChip = chip;
    chip.classList.add("selected");
  }

  document.getElementById("ipadWrap").addEventListener("click", function (e) {
    var zone = e.target.closest(".drop-zone");
    if (!zone || !activeChip) return;
    var chip = activeChip;
    activeChip = null;
    chip.classList.remove("selected");
    attemptPlacement(chip, zone);
  });

  document.getElementById("btnResetLabeling").addEventListener("click", initLabeling);

  function attemptPlacement(chip, zone) {
    var feedback = document.getElementById("feedback03");

    if (!zone || zone.classList.contains("filled")) {
      feedback.textContent = L(zone ? labelFb.occupied : labelFb.noZone);
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
      feedback.textContent = L(labelFb.right);
      feedback.classList.remove("error");
      if (placedCount === parts.length) {
        feedback.textContent = L(labelFb.all);
        document.getElementById("btnNext03").disabled = false;
      }
    } else {
      feedback.textContent = L(labelFb.wrong);
      feedback.classList.add("error");
    }
  }

  /* ---------- Abschluss ---------- */

  function renderSummary() {
    var summary = document.getElementById("completeSummary");
    summary.innerHTML =
      "<div>" + L({ de: "✓ Station 0.1 – Nutzungsordnung abgeschlossen", en: "✓ Station 0.1 – Acceptable-use policy completed" }) + "</div>" +
      "<div>" + L({ de: "✓ Station 0.2 – Passwort-Quiz: " + quizScore + " von " + questions.length + " Punkten", en: "✓ Station 0.2 – Password quiz: " + quizScore + " of " + questions.length + " points" }) + "</div>" +
      "<div>" + L({ de: "✓ Station 0.3 – Aufbau des Geräts abgeschlossen", en: "✓ Station 0.3 – Parts of the device completed" }) + "</div>";
  }

  /* ---------- Sprachwechsel ---------- */

  document.addEventListener("langchange", function () {
    updateProgressLabel();
    initMatchGame();
    initRulesQuiz();
    initPwQuiz();
    initLabeling();
  });

  /* ---------- Init ---------- */

  initMatchGame();
  initRulesQuiz();
  initPwQuiz();
  initLabeling();
})();
