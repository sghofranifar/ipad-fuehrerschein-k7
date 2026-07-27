(function () {
  "use strict";

  var L = function (o) { return window.I18N ? window.I18N.L(o) : o.de; };
  var TOTAL_STATIONS = 3;

  var screens = {
    start: document.getElementById("screen-start"),
    s1: document.getElementById("screen-2-1"),
    s2: document.getElementById("screen-2-2"),
    s3: document.getElementById("screen-2-3"),
    complete: document.getElementById("screen-complete"),
  };

  var nav = window.makeNavigator({ screens: screens, total: TOTAL_STATIONS });
  function showScreen(name, station) { nav.go(name, station); }

  var completed = false;
  var mistakes = [];

  document.getElementById("btnStart").addEventListener("click", function () { showScreen("s1", 1); });
  document.getElementById("btnNext21").addEventListener("click", function () { showScreen("s2", 2); });
  document.getElementById("btnNext22").addEventListener("click", function () { showScreen("s3", 3); });
  document.getElementById("btnNext23").addEventListener("click", function () {
    completed = true;
    renderSummary();
    localStorage.setItem("ipadfs-level2-complete", "1");
    window.storeMistakes("level2", mistakes);
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

  function renderSingleQuestion(containerId, question, onAnswered) {
    var container = document.getElementById(containerId);
    container.innerHTML = "";
    var wrap = document.createElement("div");
    wrap.className = "quiz-question";

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
        onAnswered();
      });
      optionsWrap.appendChild(btn);
    });
    wrap.appendChild(optionsWrap);
    container.appendChild(wrap);
  }

  /* ---------- Station 2.1 ---------- */

  var checklist21Done = false;
  var question21Answered = false;

  var question21 = {
    q: { de: "Warum solltest du immer eine Kopie statt des Originals bearbeiten?", en: "Why should you always edit a copy instead of the original?" },
    options: [
      { de: "Damit die Vorlage für andere Mitschüler und zukünftige Aufgaben unverändert erhalten bleibt", en: "So the template stays unchanged for other students and future tasks" },
      { de: "Weil Kopien schneller speichern", en: "Because copies save faster" },
      { de: "Weil das Original sonst automatisch gelöscht wird", en: "Because the original would otherwise be deleted automatically" },
      { de: "Das spielt keine Rolle", en: "It doesn't matter" },
    ],
    correct: 0,
    explanation: { de: "Die Vorlage gehört der Lehrkraft und wird von der ganzen Klasse genutzt – nur an einer Kopie darfst du Änderungen vornehmen.", en: "The template belongs to the teacher and is used by the whole class – you may only make changes to a copy." },
  };

  var checklist21bDone = false;

  function initStation21() {
    checklist21Done = false;
    checklist21bDone = false;
    question21Answered = false;
    document.getElementById("btnNext21").disabled = true;
    window.shuffleOptions(question21);
    wireChecklist("checklist21", function (allChecked) { checklist21Done = allChecked; updateNext21(); });
    wireChecklist("checklist21b", function (allChecked) { checklist21bDone = allChecked; updateNext21(); });
    renderSingleQuestion("quiz21", question21, function () { question21Answered = true; updateNext21(); });
  }

  function updateNext21() {
    document.getElementById("btnNext21").disabled = !(checklist21Done && checklist21bDone && question21Answered);
  }

  /* ---------- Station 2.2 ---------- */

  var tools = [
    { id: "pen", icon: "✏️", text: { de: "Handschriftlich schreiben und zeichnen", en: "Write and draw by hand" } },
    { id: "text", icon: "🔤", text: { de: "Getippten Text einfügen", en: "Insert typed text" } },
    { id: "marker", icon: "🖍️", text: { de: "Wichtige Stellen farbig hervorheben", en: "Highlight important parts in colour" } },
    { id: "lasso", icon: "⭕", text: { de: "Elemente auswählen und verschieben", en: "Select and move elements" } },
  ];

  var fb22 = {
    right: { de: "Richtig! ✓", en: "Correct! ✓" },
    all: { de: "Super, alle Werkzeuge richtig zugeordnet! ✓", en: "Great, all tools matched correctly! ✓" },
    wrong: { de: "Das passt noch nicht zusammen. Versuch's nochmal!", en: "That doesn't match yet. Try again!" },
  };

  var checklist22Done = false;
  var matchedCount22 = 0;
  var matchSelected22 = null;

  function initStation22() {
    checklist22Done = false;
    matchedCount22 = 0;
    matchSelected22 = null;
    document.getElementById("feedback22").textContent = "";
    document.getElementById("feedback22").classList.remove("error");
    document.getElementById("btnNext22").disabled = true;
    wireChecklist("checklist22", function (allChecked) { checklist22Done = allChecked; updateNext22(); });

    var toolsColumn = document.getElementById("toolsColumn");
    var functionsColumn = document.getElementById("functionsColumn");
    toolsColumn.innerHTML = "";
    functionsColumn.innerHTML = "";

    shuffle(tools).forEach(function (tool) {
      var btn = document.createElement("button");
      btn.className = "match-item icon-item";
      btn.textContent = tool.icon;
      btn.dataset.id = tool.id;
      btn.dataset.type = "icon";
      btn.addEventListener("click", function () { onMatchItemClick22(btn); });
      toolsColumn.appendChild(btn);
    });

    shuffle(tools).forEach(function (tool) {
      var btn = document.createElement("button");
      btn.className = "match-item";
      btn.textContent = L(tool.text);
      btn.dataset.id = tool.id;
      btn.dataset.type = "text";
      btn.addEventListener("click", function () { onMatchItemClick22(btn); });
      functionsColumn.appendChild(btn);
    });
  }

  function onMatchItemClick22(el) {
    if (el.classList.contains("matched")) return;
    var feedback = document.getElementById("feedback22");

    if (!matchSelected22) {
      matchSelected22 = el;
      el.classList.add("selected");
      feedback.textContent = "";
      feedback.classList.remove("error");
      return;
    }
    if (matchSelected22 === el) {
      el.classList.remove("selected");
      matchSelected22 = null;
      return;
    }
    if (matchSelected22.dataset.type === el.dataset.type) {
      matchSelected22.classList.remove("selected");
      matchSelected22 = el;
      el.classList.add("selected");
      return;
    }
    if (matchSelected22.dataset.id === el.dataset.id) {
      matchSelected22.classList.remove("selected");
      matchSelected22.classList.add("matched");
      el.classList.add("matched");
      matchSelected22 = null;
      matchedCount22++;
      feedback.textContent = L(fb22.right);
      feedback.classList.remove("error");
      if (matchedCount22 === tools.length) {
        feedback.textContent = L(fb22.all);
        updateNext22();
      }
    } else {
      var wrongPair = [matchSelected22, el];
      wrongPair.forEach(function (item) { item.classList.add("wrong"); });
      feedback.textContent = L(fb22.wrong);
      feedback.classList.add("error");
      setTimeout(function () {
        wrongPair.forEach(function (item) { item.classList.remove("wrong", "selected"); });
      }, 500);
      matchSelected22 = null;
    }
  }

  function updateNext22() {
    document.getElementById("btnNext22").disabled = !(checklist22Done && matchedCount22 === tools.length);
  }

  /* ---------- Station 2.3 ---------- */

  var orderSteps = [
    { id: "research", text: { de: "Recherchieren (Splitscreen in Chrome)", en: "Research (split screen in Chrome)" } },
    { id: "table", text: { de: "Tabelle mit Vor-/Nachteilen einfügen", en: "Insert a pros/cons table" } },
    { id: "dictate", text: { de: "Fazit (eigene Meinung) diktieren", en: "Dictate a conclusion (your opinion)" } },
    { id: "format", text: { de: "Text formatieren (Überschriften, Fett)", en: "Format the text (headings, bold)" } },
  ];

  var fb23 = {
    right: { de: "Richtige Reihenfolge! ✓", en: "Correct order! ✓" },
    wrong: { de: "Die Reihenfolge stimmt noch nicht. Versuch's nochmal!", en: "The order isn't right yet. Try again!" },
  };

  var aiSortItems = [
    { text: { de: "Autokorrektur schlägt beim Tippen automatisch Wörter vor.", en: "Autocorrect automatically suggests words as you type." }, isAi: true, explanation: { de: "Autokorrektur erkennt Muster in deiner Sprache und sagt voraus, welches Wort passen könnte – das ist KI.", en: "Autocorrect recognises patterns in your language and predicts which word might fit – that's AI." } },
    { text: { de: "Ein Taschenrechner löst 24 × 17.", en: "A calculator solves 24 × 17." }, isAi: false, explanation: { de: "Ein Taschenrechner folgt festen mathematischen Regeln – er lernt nichts aus Daten.", en: "A calculator follows fixed mathematical rules – it doesn't learn from data." } },
    { text: { de: "Spotify empfiehlt dir neue Musik basierend auf dem, was du oft hörst.", en: "Spotify recommends new music based on what you often listen to." }, isAi: true, explanation: { de: "Empfehlungssysteme sind KI: Sie erkennen Muster in deinem Hörverhalten.", en: "Recommendation systems are AI: they recognise patterns in your listening habits." } },
    { text: { de: "Eine Analoguhr zeigt die Uhrzeit an.", en: "An analogue clock shows the time." }, isAi: false, explanation: { de: "Eine Uhr misst einfach die Zeit – ohne Muster zu erkennen oder etwas vorherzusagen.", en: "A clock simply measures time – it doesn't recognise patterns or predict anything." } },
    { text: { de: "Die Fotos-App erkennt automatisch Gesichter und sortiert Bilder nach Personen.", en: "The Photos app automatically recognises faces and sorts pictures by person." }, isAi: true, explanation: { de: "Gesichtserkennung ist ein klassisches Beispiel für Mustererkennung durch KI.", en: "Facial recognition is a classic example of AI pattern recognition." } },
    { text: { de: "Die Diktierfunktion wandelt deine gesprochenen Wörter in Text um.", en: "The dictation function turns your spoken words into text." }, isAi: true, explanation: { de: "Spracherkennung nutzt KI, um Laute in Text umzuwandeln.", en: "Speech recognition uses AI to turn sounds into text." } },
  ];

  var aiSortLbl = {
    yes: { de: "🤖 KI", en: "🤖 AI" },
    no: { de: "🚫 Keine KI", en: "🚫 Not AI" },
  };

  var aiSortAnswered = 0;

  function initAiSort() {
    aiSortAnswered = 0;
    var container = document.getElementById("aiSortExercise");
    container.innerHTML = "";

    shuffle(aiSortItems).forEach(function (item) {
      var card = document.createElement("div");
      card.className = "classify-card";
      card.innerHTML =
        '<p class="classify-text">' + L(item.text) + "</p>" +
        '<div class="classify-buttons">' +
        '<button class="classify-btn" data-answer="true">' + L(aiSortLbl.yes) + "</button>" +
        '<button class="classify-btn" data-answer="false">' + L(aiSortLbl.no) + "</button>" +
        "</div>";

      var buttons = card.querySelectorAll(".classify-btn");
      buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          buttons.forEach(function (b) { b.disabled = true; });
          var answeredYes = btn.dataset.answer === "true";
          var isCorrect = answeredYes === item.isAi;
          btn.classList.add(isCorrect ? "correct" : "incorrect");
          if (!isCorrect) {
            card.querySelector('[data-answer="' + item.isAi + '"]').classList.add("correct");
            mistakes.push({ q: item.text, your: answeredYes ? aiSortLbl.yes : aiSortLbl.no, correct: item.isAi ? aiSortLbl.yes : aiSortLbl.no });
          }
          var explanation = document.createElement("p");
          explanation.className = "classify-explanation";
          explanation.textContent = L(item.explanation);
          card.appendChild(explanation);
          aiSortAnswered++;
          updateNext23();
        });
      });
      container.appendChild(card);
    });
  }

  var checklist23Done = false;
  var checklist23aiDone = false;
  var orderCorrect = false;
  var currentOrder = [];

  function initStation23() {
    checklist23Done = false;
    checklist23aiDone = false;
    orderCorrect = false;
    document.getElementById("feedback23").textContent = "";
    document.getElementById("feedback23").classList.remove("error");
    document.getElementById("btnNext23").disabled = true;
    wireChecklist("checklist23", function (allChecked) { checklist23Done = allChecked; updateNext23(); });
    wireChecklist("checklist23ai", function (allChecked) { checklist23aiDone = allChecked; updateNext23(); });
    initAiSort();
    currentOrder = shuffle(orderSteps).map(function (s) { return s.id; });
    renderOrderList();
  }

  function renderOrderList() {
    var list = document.getElementById("orderList");
    list.innerHTML = "";
    currentOrder.forEach(function (id, index) {
      var step = orderSteps.filter(function (s) { return s.id === id; })[0];
      var item = document.createElement("div");
      item.className = "order-item";
      item.innerHTML =
        '<div class="order-text">' + (index + 1) + ". " + L(step.text) + "</div>" +
        '<div class="order-controls">' +
        '<button class="order-btn" data-dir="up"' + (index === 0 ? " disabled" : "") + ">▲</button>" +
        '<button class="order-btn" data-dir="down"' + (index === currentOrder.length - 1 ? " disabled" : "") + ">▼</button>" +
        "</div>";
      item.querySelector('[data-dir="up"]').addEventListener("click", function () { moveOrderItem(index, -1); });
      item.querySelector('[data-dir="down"]').addEventListener("click", function () { moveOrderItem(index, 1); });
      list.appendChild(item);
    });
  }

  function moveOrderItem(index, direction) {
    var target = index + direction;
    if (target < 0 || target >= currentOrder.length) return;
    var t = currentOrder[index]; currentOrder[index] = currentOrder[target]; currentOrder[target] = t;
    renderOrderList();
  }

  document.getElementById("btnCheckOrder").addEventListener("click", function () {
    var feedback = document.getElementById("feedback23");
    var correctIds = orderSteps.map(function (s) { return s.id; });
    var isCorrect = currentOrder.every(function (id, i) { return id === correctIds[i]; });
    if (isCorrect) {
      orderCorrect = true;
      feedback.textContent = L(fb23.right);
      feedback.classList.remove("error");
    } else {
      feedback.textContent = L(fb23.wrong);
      feedback.classList.add("error");
    }
    updateNext23();
  });

  function updateNext23() {
    document.getElementById("btnNext23").disabled = !(
      aiSortAnswered === aiSortItems.length &&
      checklist23Done &&
      checklist23aiDone &&
      orderCorrect
    );
  }

  /* ---------- Abschluss ---------- */

  function renderSummary() {
    var summary = document.getElementById("completeSummary");
    summary.innerHTML =
      "<div>" + L({ de: "✓ Station 2.1 – Dateimanagement &amp; Classroom-Workflow abgeschlossen", en: "✓ Station 2.1 – File management &amp; Classroom workflow completed" }) + "</div>" +
      "<div>" + L({ de: "✓ Station 2.2 – GoodNotes-Werkzeuge zugeordnet", en: "✓ Station 2.2 – GoodNotes tools matched" }) + "</div>" +
      "<div>" + L({ de: "✓ Station 2.3 – KI-Dokument-Reihenfolge gelöst", en: "✓ Station 2.3 – AI-document order solved" }) + "</div>" +
      window.mistakesHTML(mistakes);
  }

  /* ---------- Init & Sprachwechsel ---------- */

  function initAll() {
    mistakes = [];
    initStation21();
    initStation22();
    initStation23();
  }

  document.addEventListener("langchange", function () {
    if (completed) renderSummary();
    else initAll();
  });

  initAll();
  showScreen("start", 0);
})();
