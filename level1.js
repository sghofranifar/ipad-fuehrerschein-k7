(function () {
  "use strict";

  var L = function (o) { return window.I18N ? window.I18N.L(o) : o.de; };
  var TOTAL_STATIONS = 4;

  var screens = {
    start: document.getElementById("screen-start"),
    s1: document.getElementById("screen-1-1"),
    s2: document.getElementById("screen-1-2"),
    s3: document.getElementById("screen-1-3"),
    s4: document.getElementById("screen-1-4"),
    complete: document.getElementById("screen-complete"),
  };

  var nav = window.makeNavigator({ screens: screens, total: TOTAL_STATIONS });
  function showScreen(name, station) { nav.go(name, station); }

  var completed = false;
  var mistakes = [];

  document.getElementById("btnStart").addEventListener("click", function () { showScreen("s1", 1); });
  document.getElementById("btnNext11").addEventListener("click", function () { showScreen("s2", 2); });
  document.getElementById("btnNext12").addEventListener("click", function () { showScreen("s3", 3); });
  document.getElementById("btnNext13").addEventListener("click", function () { showScreen("s4", 4); });
  document.getElementById("btnNext14").addEventListener("click", function () {
    completed = true;
    renderSummary();
    localStorage.setItem("ipadfs-level1-complete", "1");
    window.storeMistakes("level1", mistakes);
    showScreen("complete", null);
  });
  document.getElementById("btnRestart").addEventListener("click", function () {
    completed = false;
    initAll();
    showScreen("start", 0);
  });

  function shuffle(arr) {
    var copy = arr.slice();
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = copy[i]; copy[i] = copy[j]; copy[j] = t;
    }
    return copy;
  }

  function wireChecklist(containerId, onAllChecked) {
    var container = document.getElementById(containerId);
    var boxes = Array.prototype.slice.call(container.querySelectorAll("[data-check]"));
    boxes.forEach(function (box) {
      box.checked = false;
      box.addEventListener("change", function () {
        onAllChecked(boxes.every(function (b) { return b.checked; }));
      });
    });
    return boxes;
  }

  var nextQ = { de: "Nächste Frage", en: "Next question" };
  var showResult = { de: "Ergebnis anzeigen", en: "Show result" };

  /* ---------- Station 1.1: Checkliste ---------- */

  function initChecklist11() {
    var btn = document.getElementById("btnNext11");
    btn.disabled = true;
    wireChecklist("checklist11", function (allChecked) { btn.disabled = !allChecked; });
  }

  /* ---------- Station 1.2: Kontrollzentrum-Quiz ---------- */

  var questions12 = [
    {
      q: { de: "Wie öffnest du das Kontrollzentrum auf dem iPad?", en: "How do you open Control Centre on the iPad?" },
      options: [
        { de: "Wischen von der rechten oberen Ecke nach unten", en: "Swipe down from the top-right corner" },
        { de: "Doppelklick auf den Home-Button", en: "Double-tap the home button" },
        { de: "Wischen von unten nach oben in der Mitte", en: "Swipe up from the bottom in the middle" },
        { de: "Zweimal auf den Bildschirm tippen", en: "Tap the screen twice" },
      ],
      correct: 0,
      explanation: { de: "Das Kontrollzentrum öffnest du mit einem Wisch von der rechten oberen Ecke nach unten.", en: "You open Control Centre by swiping down from the top-right corner." },
    },
    {
      q: { de: "Welches Symbol steht für den „Nicht stören“-Modus?", en: "Which symbol stands for „Do Not Disturb“?" },
      options: [
        { de: "🌙 Mond", en: "🌙 Moon" },
        { de: "✈️ Flugzeug", en: "✈️ Aeroplane" },
        { de: "🔆 Sonne", en: "🔆 Sun" },
        { de: "🔒 Schloss mit Pfeil", en: "🔒 Lock with arrow" },
      ],
      correct: 0,
      explanation: { de: "Das Mond-Symbol 🌙 aktiviert den „Nicht stören“-Modus – Benachrichtigungen bleiben stumm.", en: "The moon symbol 🌙 turns on „Do Not Disturb“ – notifications stay silent." },
    },
    {
      q: { de: "Was bewirkt der Flugzeug-Modus (✈️) im Kontrollzentrum?", en: "What does aeroplane mode (✈️) do in Control Centre?" },
      options: [
        { de: "Er schaltet WLAN, Mobilfunk und Bluetooth aus", en: "It turns off Wi-Fi, mobile data and Bluetooth" },
        { de: "Er startet eine Flugzeug-App", en: "It starts an aeroplane app" },
        { de: "Er sperrt den Bildschirm", en: "It locks the screen" },
        { de: "Er macht ein Foto", en: "It takes a photo" },
      ],
      correct: 0,
      explanation: { de: "Der Flugzeug-Modus schaltet alle Funkverbindungen auf einmal aus.", en: "Aeroplane mode turns off all wireless connections at once." },
    },
    {
      q: { de: "Kannst du am Schul-iPad das Kontrollzentrum selbst umgestalten (Module hinzufügen/entfernen)?", en: "Can you customise Control Centre on the school iPad (add/remove modules)?" },
      options: [
        { de: "Nein – es ist von der Schule (MDM) fest eingestellt", en: "No – it is fixed by the school (MDM)" },
        { de: "Ja, in den Einstellungen", en: "Yes, in Settings" },
        { de: "Ja, über den App Store", en: "Yes, via the App Store" },
        { de: "Nur am Wochenende", en: "Only at weekends" },
      ],
      correct: 0,
      explanation: { de: "Am Schul-iPad ist das Kontrollzentrum fest konfiguriert. Du kannst es öffnen und nutzen, aber nicht verändern.", en: "On the school iPad, Control Centre is fixed. You can open and use it but not change it." },
    },
    {
      q: { de: "Wofür steht das Symbol 🔒 mit dem gebogenen Pfeil im Kontrollzentrum?", en: "What does the 🔒 symbol with the curved arrow mean in Control Centre?" },
      options: [
        { de: "Bildschirmausrichtung sperren", en: "Lock screen rotation" },
        { de: "Ton stumm schalten", en: "Mute the sound" },
        { de: "Bildschirm sperren", en: "Lock the screen" },
        { de: "WLAN aktivieren", en: "Turn on Wi-Fi" },
      ],
      correct: 0,
      explanation: { de: "Dieses Symbol sperrt die Bildschirmausrichtung, sodass sich die Anzeige beim Drehen nicht mitdreht.", en: "This symbol locks screen rotation so the display doesn't turn when you rotate the iPad." },
    },
  ];

  var quizIndex12 = 0;
  var quizScore12 = 0;

  function initQuiz12() {
    quizIndex12 = 0;
    quizScore12 = 0;
    questions12.forEach(window.shuffleOptions);
    document.getElementById("quizResult12").hidden = true;
    document.getElementById("btnNext12").disabled = true;
    renderQuestion12();
  }

  function renderQuestion12() {
    var container = document.getElementById("quiz12");
    container.innerHTML = "";

    if (quizIndex12 >= questions12.length) {
      var result = document.getElementById("quizResult12");
      result.hidden = false;
      result.textContent = L({
        de: "Du hast " + quizScore12 + " von " + questions12.length + " Fragen richtig beantwortet.",
        en: "You answered " + quizScore12 + " of " + questions12.length + " questions correctly.",
      });
      document.getElementById("btnNext12").disabled = false;
      return;
    }

    var question = questions12[quizIndex12];
    var wrap = document.createElement("div");
    wrap.className = "quiz-question";

    var progress = document.createElement("div");
    progress.className = "quiz-progress";
    progress.textContent = L({ de: "Frage " + (quizIndex12 + 1) + " von " + questions12.length, en: "Question " + (quizIndex12 + 1) + " of " + questions12.length });
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
        if (i === question.correct) { btn.classList.add("correct"); quizScore12++; }
        else { btn.classList.add("incorrect"); allOptions[question.correct].classList.add("correct"); mistakes.push({ q: question.q, your: question.options[i], correct: question.options[question.correct] }); }

        var explanation = document.createElement("p");
        explanation.className = "quiz-explanation";
        explanation.textContent = L(question.explanation);
        wrap.appendChild(explanation);

        var nextBtn = document.createElement("button");
        nextBtn.className = "quiz-next";
        nextBtn.textContent = L(quizIndex12 + 1 < questions12.length ? nextQ : showResult);
        nextBtn.addEventListener("click", function () { quizIndex12++; renderQuestion12(); });
        wrap.appendChild(nextBtn);
      });
      optionsWrap.appendChild(btn);
    });

    wrap.appendChild(optionsWrap);
    container.appendChild(wrap);
  }

  /* ---------- Station 1.3: Screenshot-Checkliste + QR-Schnitzeljagd ---------- */

  var qrItems = [
    { q: { de: "Welcher ist der einzige Planet in unserem Sonnensystem, auf dem bekanntlich Leben existiert?", en: "What is the only planet in our solar system known to harbor life?" }, letter: 5 },
    { q: { de: "Wer hat die Mona Lisa gemalt?", en: "Who painted the Mona Lisa?" }, letter: 5 },
    { q: { de: "Was ist der höchste Berg der Erde?", en: "What is the tallest mountain on Earth?" }, letter: 3 },
    { q: { de: "In welcher Stadt steht der Eiffelturm?", en: "In what city would you find the Eiffel Tower?" }, letter: 5 },
  ];
  var qrSolution = "HAUS";

  var qrLabels = {
    scanned: { de: "✓ gescannt", en: "✓ scanned" },
    scan: { de: "QR-Code scannen", en: "Scan QR code" },
    code: { de: "Code", en: "Code" },
    question: { de: "Frage", en: "Question" },
    letterHint: { de: "🔤 Nimm Buchstabe {n} deiner (englischen) Antwort.", en: "🔤 Take letter {n} of your (English) answer." },
    assemble: { de: "Setze die 4 Buchstaben zum Lösungswort zusammen und gib es hier ein:", en: "Put the 4 letters together to form the solution word and type it here:" },
    placeholder: { de: "Lösungswort eingeben...", en: "Enter the solution word..." },
    check: { de: "Prüfen", en: "Check" },
    solved: { de: "Richtig gelöst! ✓ Lösungswort: ", en: "Solved correctly! ✓ Solution word: " },
    wrong: { de: "Das Lösungswort stimmt noch nicht. Prüfe deine Buchstaben!", en: "The solution word isn't right yet. Check your letters!" },
  };

  var qrScanned = 0;
  var checklist13Done = false;
  var qrSolved = false;

  function mulberry32(seed) {
    return function () {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function buildQrSvg(seed) {
    var n = 11, cell = 10, size = n * cell, rand = mulberry32(seed);
    function inFinderZone(x, y) {
      return (x < 5 && y < 5) || (x >= n - 5 && y < 5) || (x < 5 && y >= n - 5);
    }
    var darkCells = "";
    for (var y = 0; y < n; y++) {
      for (var x = 0; x < n; x++) {
        if (inFinderZone(x, y)) continue;
        if (rand() < 0.48) darkCells += '<rect x="' + x * cell + '" y="' + y * cell + '" width="' + cell + '" height="' + cell + '"/>';
      }
    }
    function finder(ox, oy) {
      return '<rect x="' + ox + '" y="' + oy + '" width="' + 5 * cell + '" height="' + 5 * cell + '" fill="#1b1b1b"/>' +
        '<rect x="' + (ox + cell) + '" y="' + (oy + cell) + '" width="' + 3 * cell + '" height="' + 3 * cell + '" fill="#ffffff"/>' +
        '<rect x="' + (ox + 2 * cell) + '" y="' + (oy + 2 * cell) + '" width="' + cell + '" height="' + cell + '" fill="#1b1b1b"/>';
    }
    return '<svg viewBox="0 0 ' + size + ' ' + size + '" class="qr-svg" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="' + size + '" height="' + size + '" fill="#ffffff"/>' +
      '<g fill="#1b1b1b">' + darkCells + "</g>" +
      finder(0, 0) + finder((n - 5) * cell, 0) + finder(0, (n - 5) * cell) + "</svg>";
  }

  function initStation13() {
    qrScanned = 0;
    checklist13Done = false;
    qrSolved = false;
    document.getElementById("feedback13").textContent = "";
    document.getElementById("feedback13").classList.remove("error");
    document.getElementById("btnNext13").disabled = true;
    wireChecklist("checklist13pre", function (allChecked) { checklist13Done = allChecked; updateNext13(); });
    renderQrHunt();
  }

  function updateNext13() {
    document.getElementById("btnNext13").disabled = !(checklist13Done && qrSolved);
  }

  function renderQrHunt() {
    var hunt = document.getElementById("qrHunt");
    hunt.innerHTML = "";

    var cardsWrap = document.createElement("div");
    cardsWrap.className = "qr-cards";

    qrItems.forEach(function (item, i) {
      var card = document.createElement("div");
      card.className = "qr-card";
      card.dataset.index = i;
      if (i < qrScanned) {
        card.classList.add("qr-card--scanned");
        var hint = L(qrLabels.letterHint).split("{n}").join(item.letter);
        card.innerHTML =
          '<div class="qr-check">' + L(qrLabels.scanned) + "</div>" +
          '<div class="qr-q"><strong>' + L(qrLabels.question) + " " + (i + 1) + ":</strong> " + L(item.q) + "</div>" +
          '<div class="qr-letter">' + hint + "</div>";
      } else if (i === qrScanned) {
        card.classList.add("qr-card--active");
        card.innerHTML = buildQrSvg(i + 1) + '<button class="btn-secondary qr-scan-btn">' + L(qrLabels.scan) + "</button>";
        card.querySelector(".qr-scan-btn").addEventListener("click", function () { qrScanned++; renderQrHunt(); });
      } else {
        card.classList.add("qr-card--locked");
        card.innerHTML = '<div class="qr-lock">🔒</div><div class="qr-word qr-word--locked">' + L(qrLabels.code) + " " + (i + 1) + "</div>";
      }
      cardsWrap.appendChild(card);
    });
    hunt.appendChild(cardsWrap);

    if (qrScanned === qrItems.length && !qrSolved) {
      var solveWrap = document.createElement("div");
      solveWrap.className = "qr-solve";
      solveWrap.innerHTML =
        '<p class="task-desc">' + L(qrLabels.assemble) + "</p>" +
        '<input type="text" class="qr-input" id="qrInput" placeholder="' + L(qrLabels.placeholder) + '">' +
        '<button class="btn-primary" id="qrCheckBtn">' + L(qrLabels.check) + "</button>";
      hunt.appendChild(solveWrap);

      document.getElementById("qrCheckBtn").addEventListener("click", function () {
        var input = document.getElementById("qrInput").value.trim().toUpperCase().replace(/\s+/g, "");
        var feedback = document.getElementById("feedback13");
        if (input === qrSolution) {
          qrSolved = true;
          feedback.textContent = L(qrLabels.solved) + qrSolution;
          feedback.classList.remove("error");
          document.getElementById("qrInput").disabled = true;
          document.getElementById("qrCheckBtn").disabled = true;
          updateNext13();
        } else {
          feedback.textContent = L(qrLabels.wrong);
          feedback.classList.add("error");
        }
      });
    }
  }

  /* ---------- Station 1.4: Chrome-Schritte + Verständnisfragen ---------- */

  var checklist14Done = false;
  var q14Index = 0;

  var questions14 = [
    {
      q: { de: "Warum ist ein Lesezeichen nützlich?", en: "Why is a bookmark useful?" },
      options: [
        { de: "Damit man eine Webseite wiederfindet, ohne die Adresse neu einzutippen", en: "So you can find a website again without retyping the address" },
        { de: "Damit die Webseite schneller lädt", en: "So the website loads faster" },
        { de: "Damit niemand anders die Webseite sehen kann", en: "So no one else can see the website" },
        { de: "Damit das iPad automatisch Updates installiert", en: "So the iPad installs updates automatically" },
      ],
      correct: 0,
      explanation: { de: "Ein Lesezeichen speichert den Link, sodass du die Seite jederzeit mit einem Tipp wiederfindest.", en: "A bookmark saves the link so you can return to the page any time with one tap." },
    },
    {
      q: { de: "Warum darfst du am Schul-iPad keinen eigenen Hotspot oder ein VPN nutzen?", en: "Why may you not use your own hotspot or a VPN on the school iPad?" },
      options: [
        { de: "Weil dann der Jugendschutz- und Sicherheitsfilter der Schule nicht mehr wirkt", en: "Because the school's safety and content filter would stop working" },
        { de: "Weil der Akku dadurch leer wird", en: "Because it drains the battery" },
        { de: "Weil das Internet dann zu langsam ist", en: "Because the internet would be too slow" },
        { de: "Das darf man doch problemlos", en: "Actually you are allowed to" },
      ],
      correct: 0,
      explanation: { de: "Nur im Schul-WLAN greift der Schutzfilter. Ein eigener Hotspot oder VPN umgeht ihn und ist deshalb nicht erlaubt.", en: "The filter only works on the school Wi-Fi. Your own hotspot or VPN bypasses it and is therefore not allowed." },
    },
  ];

  function initStation14() {
    checklist14Done = false;
    q14Index = 0;
    questions14.forEach(window.shuffleOptions);
    document.getElementById("btnNext14").disabled = true;
    wireChecklist("checklist14", function (allChecked) { checklist14Done = allChecked; updateNext14(); });
    renderQuiz14();
  }

  function updateNext14() {
    document.getElementById("btnNext14").disabled = !(checklist14Done && q14Index >= questions14.length);
  }

  function renderQuiz14() {
    var container = document.getElementById("quiz14");
    container.innerHTML = "";

    if (q14Index >= questions14.length) {
      var done = document.createElement("div");
      done.className = "quiz-result";
      done.textContent = L({ de: "Verständnisfragen abgeschlossen ✓", en: "Comprehension questions completed ✓" });
      container.appendChild(done);
      updateNext14();
      return;
    }

    var question = questions14[q14Index];
    var wrap = document.createElement("div");
    wrap.className = "quiz-question";

    var progress = document.createElement("div");
    progress.className = "quiz-progress";
    progress.textContent = L({ de: "Frage " + (q14Index + 1) + " von " + questions14.length, en: "Question " + (q14Index + 1) + " of " + questions14.length });
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
        if (i === question.correct) { btn.classList.add("correct"); }
        else { btn.classList.add("incorrect"); allOptions[question.correct].classList.add("correct"); mistakes.push({ q: question.q, your: question.options[i], correct: question.options[question.correct] }); }
        var explanation = document.createElement("p");
        explanation.className = "quiz-explanation";
        explanation.textContent = L(question.explanation);
        wrap.appendChild(explanation);

        var nextBtn = document.createElement("button");
        nextBtn.className = "quiz-next";
        nextBtn.textContent = L(q14Index + 1 < questions14.length ? nextQ : showResult);
        nextBtn.addEventListener("click", function () { q14Index++; renderQuiz14(); });
        wrap.appendChild(nextBtn);
      });
      optionsWrap.appendChild(btn);
    });
    wrap.appendChild(optionsWrap);
    container.appendChild(wrap);
  }

  /* ---------- Abschluss ---------- */

  function renderSummary() {
    var summary = document.getElementById("completeSummary");
    summary.innerHTML =
      "<div>" + L({ de: "✓ Station 1.1 – Navigation &amp; Personalisierung abgeschlossen", en: "✓ Station 1.1 – Navigation &amp; personalisation completed" }) + "</div>" +
      "<div>" + L({ de: "✓ Station 1.2 – Kontrollzentrum-Quiz: " + quizScore12 + " von " + questions12.length + " Punkten", en: "✓ Station 1.2 – Control Centre quiz: " + quizScore12 + " of " + questions12.length + " points" }) + "</div>" +
      "<div>" + L({ de: "✓ Station 1.3 – QR-Code-Schnitzeljagd gelöst", en: "✓ Station 1.3 – QR-code scavenger hunt solved" }) + "</div>" +
      "<div>" + L({ de: "✓ Station 1.4 – Chrome-Grundlagen abgeschlossen", en: "✓ Station 1.4 – Chrome basics completed" }) + "</div>" +
      window.mistakesHTML(mistakes);
  }

  /* ---------- Init & Sprachwechsel ---------- */

  function initAll() {
    mistakes = [];
    initChecklist11();
    initQuiz12();
    initStation13();
    initStation14();
  }

  document.addEventListener("langchange", function () {
    if (completed) renderSummary();
    else initAll();
  });

  initAll();
  showScreen("start", 0);
})();
