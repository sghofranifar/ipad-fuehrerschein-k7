(function () {
  "use strict";

  /* ---------- Navigation & Progress ---------- */

  const TOTAL_STATIONS = 3;

  const screens = {
    start: document.getElementById("screen-start"),
    s1: document.getElementById("screen-2-1"),
    s2: document.getElementById("screen-2-2"),
    s3: document.getElementById("screen-2-3"),
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
  document.getElementById("btnNext21").addEventListener("click", () => showScreen("s2", 2));
  document.getElementById("btnNext22").addEventListener("click", () => showScreen("s3", 3));
  document.getElementById("btnNext23").addEventListener("click", () => {
    renderSummary();
    localStorage.setItem("ipadfs-level2-complete", "1");
    showScreen("complete", null);
  });
  document.getElementById("btnRestart").addEventListener("click", () => {
    initStation21();
    initStation22();
    initStation23();
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

  /* Renders a single-question multiple-choice quiz into containerId and
     calls onAnswered() once the student has picked an option. */
  function renderSingleQuestion(containerId, question, onAnswered) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

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

        onAnswered();
      });
      optionsWrap.appendChild(btn);
    });

    wrap.appendChild(optionsWrap);
    container.appendChild(wrap);
  }

  /* ---------- Station 2.1: Checkliste + Verständnisfrage ---------- */

  let checklist21Done = false;
  let question21Answered = false;

  function initStation21() {
    checklist21Done = false;
    question21Answered = false;
    document.getElementById("btnNext21").disabled = true;

    wireChecklist("checklist21", (allChecked) => {
      checklist21Done = allChecked;
      updateNext21();
    });

    renderSingleQuestion(
      "quiz21",
      {
        q: "Warum solltest du immer eine Kopie statt des Originals bearbeiten?",
        options: [
          "Damit die Vorlage für andere Mitschüler und zukünftige Aufgaben unverändert erhalten bleibt",
          "Weil Kopien schneller speichern",
          "Weil das Original sonst automatisch gelöscht wird",
          "Das spielt keine Rolle",
        ],
        correct: 0,
        explanation: "Die Vorlage gehört der Lehrkraft und wird von der ganzen Klasse genutzt – nur an einer Kopie darfst du Änderungen vornehmen.",
      },
      () => {
        question21Answered = true;
        updateNext21();
      }
    );
  }

  function updateNext21() {
    document.getElementById("btnNext21").disabled = !(checklist21Done && question21Answered);
  }

  /* ---------- Station 2.2: Checkliste + Werkzeug-Zuordnung ---------- */

  const tools = [
    { id: "pen", icon: "✏️", text: "Handschriftlich schreiben und zeichnen" },
    { id: "text", icon: "🔤", text: "Getippten Text einfügen" },
    { id: "marker", icon: "🖍️", text: "Wichtige Stellen farbig hervorheben" },
    { id: "lasso", icon: "⭕", text: "Elemente auswählen und verschieben" },
  ];

  let checklist22Done = false;
  let matchedCount22 = 0;
  let matchSelected22 = null;

  function initStation22() {
    checklist22Done = false;
    matchedCount22 = 0;
    matchSelected22 = null;
    document.getElementById("feedback22").textContent = "";
    document.getElementById("feedback22").classList.remove("error");
    document.getElementById("btnNext22").disabled = true;

    wireChecklist("checklist22", (allChecked) => {
      checklist22Done = allChecked;
      updateNext22();
    });

    const toolsColumn = document.getElementById("toolsColumn");
    const functionsColumn = document.getElementById("functionsColumn");
    toolsColumn.innerHTML = "";
    functionsColumn.innerHTML = "";

    shuffle(tools).forEach((tool) => {
      const btn = document.createElement("button");
      btn.className = "match-item icon-item";
      btn.textContent = tool.icon;
      btn.dataset.id = tool.id;
      btn.dataset.type = "icon";
      btn.addEventListener("click", () => onMatchItemClick22(btn));
      toolsColumn.appendChild(btn);
    });

    shuffle(tools).forEach((tool) => {
      const btn = document.createElement("button");
      btn.className = "match-item";
      btn.textContent = tool.text;
      btn.dataset.id = tool.id;
      btn.dataset.type = "text";
      btn.addEventListener("click", () => onMatchItemClick22(btn));
      functionsColumn.appendChild(btn);
    });
  }

  function onMatchItemClick22(el) {
    if (el.classList.contains("matched")) return;
    const feedback = document.getElementById("feedback22");

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
      feedback.textContent = "Richtig! ✓";
      feedback.classList.remove("error");
      if (matchedCount22 === tools.length) {
        feedback.textContent = "Super, alle Werkzeuge richtig zugeordnet! ✓";
        updateNext22();
      }
    } else {
      const wrongPair = [matchSelected22, el];
      wrongPair.forEach((item) => item.classList.add("wrong"));
      feedback.textContent = "Das passt noch nicht zusammen. Versuch's nochmal!";
      feedback.classList.add("error");
      setTimeout(() => {
        wrongPair.forEach((item) => item.classList.remove("wrong", "selected"));
      }, 500);
      matchSelected22 = null;
    }
  }

  function updateNext22() {
    document.getElementById("btnNext22").disabled = !(checklist22Done && matchedCount22 === tools.length);
  }

  /* ---------- Station 2.3: Checkliste + Reihenfolge-Aufgabe ---------- */

  const orderSteps = [
    { id: "research", text: "Recherchieren (Splitscreen in Chrome)" },
    { id: "table", text: "Tabelle mit Fakten einfügen" },
    { id: "dictate", text: "Fazit diktieren" },
    { id: "format", text: "Text formatieren (Überschriften, Fett)" },
  ];

  let checklist23Done = false;
  let orderCorrect = false;
  let currentOrder = [];

  function initStation23() {
    checklist23Done = false;
    orderCorrect = false;
    document.getElementById("feedback23").textContent = "";
    document.getElementById("feedback23").classList.remove("error");
    document.getElementById("btnNext23").disabled = true;

    wireChecklist("checklist23", (allChecked) => {
      checklist23Done = allChecked;
      updateNext23();
    });

    currentOrder = shuffle(orderSteps).map((s) => s.id);
    renderOrderList();
  }

  function renderOrderList() {
    const list = document.getElementById("orderList");
    list.innerHTML = "";

    currentOrder.forEach((id, index) => {
      const step = orderSteps.find((s) => s.id === id);
      const item = document.createElement("div");
      item.className = "order-item";
      item.innerHTML =
        `<div class="order-text">${index + 1}. ${step.text}</div>` +
        `<div class="order-controls">` +
        `<button class="order-btn" data-dir="up" ${index === 0 ? "disabled" : ""}>▲</button>` +
        `<button class="order-btn" data-dir="down" ${index === currentOrder.length - 1 ? "disabled" : ""}>▼</button>` +
        `</div>`;

      item.querySelector('[data-dir="up"]').addEventListener("click", () => moveOrderItem(index, -1));
      item.querySelector('[data-dir="down"]').addEventListener("click", () => moveOrderItem(index, 1));

      list.appendChild(item);
    });
  }

  function moveOrderItem(index, direction) {
    const target = index + direction;
    if (target < 0 || target >= currentOrder.length) return;
    [currentOrder[index], currentOrder[target]] = [currentOrder[target], currentOrder[index]];
    renderOrderList();
  }

  document.getElementById("btnCheckOrder").addEventListener("click", () => {
    const feedback = document.getElementById("feedback23");
    const correctIds = orderSteps.map((s) => s.id);
    const isCorrect = currentOrder.every((id, i) => id === correctIds[i]);

    if (isCorrect) {
      orderCorrect = true;
      feedback.textContent = "Richtige Reihenfolge! ✓";
      feedback.classList.remove("error");
    } else {
      feedback.textContent = "Die Reihenfolge stimmt noch nicht. Versuch's nochmal!";
      feedback.classList.add("error");
    }
    updateNext23();
  });

  function updateNext23() {
    document.getElementById("btnNext23").disabled = !(checklist23Done && orderCorrect);
  }

  /* ---------- Abschluss ---------- */

  function renderSummary() {
    const summary = document.getElementById("completeSummary");
    summary.innerHTML =
      "<div>✓ Station 2.1 – Dateimanagement &amp; Classroom-Workflow abgeschlossen</div>" +
      "<div>✓ Station 2.2 – GoodNotes-Werkzeuge zugeordnet</div>" +
      "<div>✓ Station 2.3 – Tier-Steckbrief-Reihenfolge gelöst</div>";
  }

  /* ---------- Init ---------- */

  initStation21();
  initStation22();
  initStation23();
})();
