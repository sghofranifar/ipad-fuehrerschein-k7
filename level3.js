(function () {
  "use strict";

  /* ---------- Navigation & Progress ---------- */

  const TOTAL_STATIONS = 3;

  const screens = {
    start: document.getElementById("screen-start"),
    s1: document.getElementById("screen-3-1"),
    s2: document.getElementById("screen-3-2"),
    s3: document.getElementById("screen-3-3"),
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
  document.getElementById("btnNext31").addEventListener("click", () => showScreen("s2", 2));
  document.getElementById("btnNext32").addEventListener("click", () => showScreen("s3", 3));
  document.getElementById("btnNext33").addEventListener("click", () => {
    renderSummary();
    localStorage.setItem("ipadfs-level3-complete", "1");
    showScreen("complete", null);
  });
  document.getElementById("btnRestart").addEventListener("click", () => {
    initStation31();
    initStation32();
    initStation33();
    showScreen("start", null);
  });

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

  /* Combines several independent "all done" flags: calls update() with
     true only once every flag reports true. */
  function combineGates(update) {
    const state = {};
    return function makeGate(key) {
      state[key] = false;
      return function setGate(value) {
        state[key] = value;
        update(Object.values(state).every(Boolean));
      };
    };
  }

  /* ---------- Station 3.1: Slides/Vivi + Pecha-Kucha-Timer ---------- */

  let timerSeconds = 60;
  let timerInterval = null;
  let timerRunning = false;

  function updateTimerDisplay() {
    const display = document.getElementById("timerDisplay");
    display.textContent = timerSeconds;
    display.classList.toggle("timer-display--low", timerSeconds <= 10 && timerSeconds > 0);
  }

  function startTimer() {
    if (timerSeconds <= 0) timerSeconds = 60;
    timerRunning = true;
    document.getElementById("timerStart").textContent = "Pause";
    document.getElementById("timerFeedback").textContent = "";
    timerInterval = setInterval(() => {
      timerSeconds--;
      updateTimerDisplay();
      if (timerSeconds <= 0) {
        clearInterval(timerInterval);
        timerRunning = false;
        document.getElementById("timerStart").textContent = "Start";
        document.getElementById("timerFeedback").textContent = "Zeit abgelaufen! ⏰";
      }
    }, 1000);
  }

  function pauseTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    document.getElementById("timerStart").textContent = "Start";
  }

  function resetTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    timerSeconds = 60;
    updateTimerDisplay();
    document.getElementById("timerStart").textContent = "Start";
    document.getElementById("timerFeedback").textContent = "";
  }

  function initStation31() {
    resetTimer();
    document.getElementById("btnNext31").disabled = true;

    const gate = combineGates((allDone) => {
      document.getElementById("btnNext31").disabled = !allDone;
    });
    const setChecklist31 = gate("checklist31");
    const setChecklist31b = gate("checklist31b");

    wireChecklist("checklist31", setChecklist31);
    wireChecklist("checklist31b", setChecklist31b);
  }

  document.getElementById("timerStart").addEventListener("click", () => {
    if (timerRunning) pauseTimer();
    else startTimer();
  });
  document.getElementById("timerReset").addEventListener("click", resetTimer);

  /* ---------- Station 3.2: Kollaboration + Kommentare bewerten ---------- */

  const comments = [
    {
      text: "„Ich finde deinen Satz super, aber vielleicht könntest du hier noch ein Beispiel ergänzen?“",
      constructive: true,
      explanation: "Lob plus ein konkreter Verbesserungsvorschlag – so sieht hilfreiches Feedback aus.",
    },
    {
      text: "„Das ist doof geschrieben.“",
      constructive: false,
      explanation: "Unfreundlich formuliert und ohne Hinweis, was besser gemacht werden könnte.",
    },
    {
      text: "„Cooler Anfang! Der zweite Satz ist aber etwas lang – vielleicht in zwei Sätze teilen?“",
      constructive: true,
      explanation: "Konkret, freundlich und mit einem direkt umsetzbaren Vorschlag.",
    },
    {
      text: "„Warum hast du das so gemacht? Mach das nochmal richtig.“",
      constructive: false,
      explanation: "Vorwurfsvoll formuliert und unklar, was genau geändert werden soll.",
    },
  ];

  let checklist32Done = false;
  let commentsAnswered = 0;

  function initStation32() {
    checklist32Done = false;
    commentsAnswered = 0;
    document.getElementById("btnNext32").disabled = true;

    wireChecklist("checklist32", (allChecked) => {
      checklist32Done = allChecked;
      updateNext32();
    });

    const container = document.getElementById("commentExercise");
    container.innerHTML = "";

    comments.forEach((comment) => {
      const card = document.createElement("div");
      card.className = "classify-card";
      card.innerHTML =
        `<p class="classify-text">${comment.text}</p>` +
        `<div class="classify-buttons">` +
        `<button class="classify-btn" data-answer="true">👍 Konstruktiv</button>` +
        `<button class="classify-btn" data-answer="false">👎 Nicht konstruktiv</button>` +
        `</div>`;

      const buttons = card.querySelectorAll(".classify-btn");
      buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          buttons.forEach((b) => (b.disabled = true));
          const answeredTrue = btn.dataset.answer === "true";
          const isCorrect = answeredTrue === comment.constructive;
          btn.classList.add(isCorrect ? "correct" : "incorrect");
          if (!isCorrect) {
            const correctBtn = card.querySelector(`[data-answer="${comment.constructive}"]`);
            correctBtn.classList.add("correct");
          }

          const explanation = document.createElement("p");
          explanation.className = "classify-explanation";
          explanation.textContent = comment.explanation;
          card.appendChild(explanation);

          commentsAnswered++;
          updateNext32();
        });
      });

      container.appendChild(card);
    });
  }

  function updateNext32() {
    document.getElementById("btnNext32").disabled = !(checklist32Done && commentsAnswered === comments.length);
  }

  /* ---------- Station 3.3: Krankmeldung + Phishing erkennen ---------- */

  const phishingEmails = [
    {
      subject: "Dringend: Dein Schulkonto wird gesperrt!",
      from: "IT-Support <it-support@schule-sicherheit.info>",
      parts: [
        { text: "Hallo, wir haben ungewöhnliche Aktivitäten auf deinem Konto festgestellt.", flag: false },
        { text: " Klicke JETZT auf diesen Link, um dein Konto zu bestätigen", flag: true, note: "Künstlicher Zeitdruck und eine dringende Handlungsaufforderung sind typische Phishing-Signale." },
        { text: ", sonst wird es in 24 Stunden gelöscht.", flag: true, note: "Drohungen mit knapper Frist sollen dich zu unüberlegtem Handeln verleiten." },
        { text: " Bitte gib dort dein Passwort ein.", flag: true, note: "Seriöse Stellen fragen niemals per Link oder E-Mail nach deinem Passwort." },
        { text: " Vielen Dank, Dein IT-Team", flag: false },
      ],
      senderFlag: { text: "Absender: it-support@schule-sicherheit.info", note: "Das ist keine echte Schuladresse – ein falscher Absendername soll Vertrauen erwecken." },
    },
    {
      subject: "Erinnerung: Hausaufgabe bis Freitag",
      from: "Frau Meier <m.meier@gsis-schule.de>",
      parts: [
        { text: "Hallo zusammen, bitte denkt daran, die Aufgabe aus Classroom bis Freitag abzugeben.", flag: false },
        { text: " Bei Fragen könnt ihr mich gerne in der nächsten Stunde ansprechen.", flag: false },
        { text: " Viele Grüße, Frau Meier", flag: false },
      ],
      senderFlag: null,
    },
  ];

  let checklist33Done = false;
  let phishingClicked = 0;
  let phishingTotal = 0;

  function initStation33() {
    checklist33Done = false;
    phishingClicked = 0;
    phishingTotal = 0;
    document.getElementById("btnNext33").disabled = true;

    wireChecklist("checklist33", (allChecked) => {
      checklist33Done = allChecked;
      updateNext33();
    });

    const container = document.getElementById("phishingExercise");
    container.innerHTML = "";

    phishingEmails.forEach((email) => {
      const card = document.createElement("div");
      card.className = "email-card";

      let bodyHtml = "";
      email.parts.forEach((part, i) => {
        phishingTotal++;
        bodyHtml += `<span class="email-part" data-flag="${part.flag}" data-note="${part.note ? encodeURIComponent(part.note) : ""}" data-key="body-${i}">${part.text}</span>`;
      });

      const fromHtml = email.senderFlag
        ? (() => {
            phishingTotal++;
            return `<span class="email-part email-from" data-flag="true" data-note="${encodeURIComponent(email.senderFlag.note)}" data-key="from">${email.senderFlag.text}</span>`;
          })()
        : `<span class="email-from">Von: ${email.from}</span>`;

      card.innerHTML =
        `<div class="email-subject">Betreff: ${email.subject}</div>` +
        `<div class="email-meta">${fromHtml}</div>` +
        `<p class="email-body">${bodyHtml}</p>`;

      card.querySelectorAll(".email-part").forEach((span) => {
        span.addEventListener("click", () => {
          if (span.classList.contains("clicked")) return;
          span.classList.add("clicked");
          const isFlag = span.dataset.flag === "true";
          span.classList.add(isFlag ? "flag-hit" : "flag-miss");

          const note = document.createElement("span");
          note.className = "email-part-note";
          note.textContent = isFlag
            ? "(🚩 " + decodeURIComponent(span.dataset.note) + ")"
            : "(unauffällig – kein Warnsignal)";
          span.appendChild(note);

          phishingClicked++;
          updateNext33();
        });
      });

      container.appendChild(card);
    });
  }

  function updateNext33() {
    document.getElementById("btnNext33").disabled = !(checklist33Done && phishingClicked === phishingTotal);
  }

  /* ---------- Abschluss ---------- */

  function renderSummary() {
    const summary = document.getElementById("completeSummary");
    summary.innerHTML =
      "<div>✓ Station 3.1 – Pecha-Kucha-Pitch mit Slides &amp; Vivi vorbereitet</div>" +
      "<div>✓ Station 3.2 – Kollaboration &amp; Feedback-Kommentare bewertet</div>" +
      "<div>✓ Station 3.3 – Krankmeldung &amp; Phishing-Erkennung abgeschlossen</div>";
  }

  /* ---------- Init ---------- */

  initStation31();
  initStation32();
  initStation33();
})();
