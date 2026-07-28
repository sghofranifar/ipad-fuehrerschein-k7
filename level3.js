(function () {
  "use strict";

  var L = function (o) { return window.I18N ? window.I18N.L(o) : o.de; };
  var TOTAL_STATIONS = 3;

  var screens = {
    start: document.getElementById("screen-start"),
    s1: document.getElementById("screen-3-1"),
    s2: document.getElementById("screen-3-2"),
    s3: document.getElementById("screen-3-3"),
    complete: document.getElementById("screen-complete"),
  };

  var nav = window.makeNavigator({ screens: screens, total: TOTAL_STATIONS });
  function showScreen(name, station) { nav.go(name, station); }

  var completed = false;
  var mistakes = [];

  document.getElementById("btnStart").addEventListener("click", function () { showScreen("s1", 1); });
  document.getElementById("btnNext31").addEventListener("click", function () { showScreen("s2", 2); });
  document.getElementById("btnNext32").addEventListener("click", function () { showScreen("s3", 3); });
  document.getElementById("btnNext33").addEventListener("click", function () {
    completed = true;
    renderSummary();
    localStorage.setItem("ipadfs-level3-complete", "1");
    window.storeMistakes("level3", mistakes);
    showScreen("complete", null);
  });
  document.getElementById("btnRestart").addEventListener("click", function () {
    completed = false;
    initAll();
    showScreen("start", 0);
  });

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

  function combineGates(update) {
    var state = {};
    return function makeGate(key) {
      state[key] = false;
      return function setGate(value) {
        state[key] = value;
        update(Object.keys(state).every(function (k) { return state[k]; }));
      };
    };
  }

  /* ---------- Station 3.1: Slides/Vivi + Timer ---------- */

  var timerSeconds = 60;
  var timerInterval = null;
  var timerRunning = false;

  var timerLbl = {
    start: { de: "Start", en: "Start" },
    pause: { de: "Pause", en: "Pause" },
    done: { de: "Zeit abgelaufen! ⏰", en: "Time's up! ⏰" },
  };

  function updateTimerDisplay() {
    var display = document.getElementById("timerDisplay");
    display.textContent = timerSeconds;
    display.classList.toggle("timer-display--low", timerSeconds <= 10 && timerSeconds > 0);
  }

  function startTimer() {
    if (timerSeconds <= 0) timerSeconds = 60;
    timerRunning = true;
    document.getElementById("timerStart").textContent = L(timerLbl.pause);
    document.getElementById("timerFeedback").textContent = "";
    timerInterval = setInterval(function () {
      timerSeconds--;
      updateTimerDisplay();
      if (timerSeconds <= 0) {
        clearInterval(timerInterval);
        timerRunning = false;
        document.getElementById("timerStart").textContent = L(timerLbl.start);
        document.getElementById("timerFeedback").textContent = L(timerLbl.done);
      }
    }, 1000);
  }

  function pauseTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    document.getElementById("timerStart").textContent = L(timerLbl.start);
  }

  function resetTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    timerSeconds = 60;
    updateTimerDisplay();
    document.getElementById("timerStart").textContent = L(timerLbl.start);
    document.getElementById("timerFeedback").textContent = "";
  }

  function initStation31() {
    resetTimer();
    document.getElementById("btnNext31").disabled = true;
    var gate = combineGates(function (allDone) { document.getElementById("btnNext31").disabled = !allDone; });
    wireChecklist("checklist31", gate("checklist31"));
    wireChecklist("checklist31b", gate("checklist31b"));
  }

  document.getElementById("timerStart").addEventListener("click", function () {
    if (timerRunning) pauseTimer(); else startTimer();
  });
  document.getElementById("timerReset").addEventListener("click", resetTimer);

  /* ---------- Station 3.2: Kommentare bewerten ---------- */

  var comments = [
    {
      text: { de: "„Ich finde deinen Satz super, aber vielleicht könntest du hier noch ein Beispiel ergänzen?“", en: "„I really like your sentence, but maybe you could add an example here?“" },
      constructive: true,
      explanation: { de: "Lob plus ein konkreter Verbesserungsvorschlag – so sieht hilfreiches Feedback aus.", en: "Praise plus a concrete suggestion – that's what helpful feedback looks like." },
    },
    {
      text: { de: "„Das ist doof geschrieben.“", en: "„This is badly written.“" },
      constructive: false,
      explanation: { de: "Unfreundlich formuliert und ohne Hinweis, was besser gemacht werden könnte.", en: "Unkind and gives no hint about what could be improved." },
    },
    {
      text: { de: "„Cooler Anfang! Der zweite Satz ist aber etwas lang – vielleicht in zwei Sätze teilen?“", en: "„Cool start! The second sentence is a bit long though – maybe split it into two?“" },
      constructive: true,
      explanation: { de: "Konkret, freundlich und mit einem direkt umsetzbaren Vorschlag.", en: "Specific, friendly and with a suggestion you can act on right away." },
    },
    {
      text: { de: "„Warum hast du das so gemacht? Mach das nochmal richtig.“", en: "„Why did you do it like that? Just do it properly.“" },
      constructive: false,
      explanation: { de: "Vorwurfsvoll formuliert und unklar, was genau geändert werden soll.", en: "Sounds accusing and it's unclear what exactly should change." },
    },
    {
      text: { de: "„Dein Text ist klar strukturiert, aber der zweite Absatz könnte noch ein konkretes Beispiel vertragen.“ (Diese Rückmeldung stammt von einem KI-Schreibassistenten.)", en: "„Your text is clearly structured, but the second paragraph could use a concrete example.“ (This feedback came from an AI writing assistant.)" },
      constructive: true,
      explanation: { de: "Auch KI kann konstruktives Feedback geben – aber prüfe es trotzdem kritisch und überlege selbst, ob der Vorschlag wirklich passt.", en: "AI can give constructive feedback too – but check it critically and decide for yourself whether the suggestion really fits." },
    },
  ];

  var classifyLbl = {
    yes: { de: "👍 Konstruktiv", en: "👍 Constructive" },
    no: { de: "👎 Nicht konstruktiv", en: "👎 Not constructive" },
  };

  var checklist32Done = false;
  var commentsPassed = false;

  function initStation32() {
    checklist32Done = false;
    commentsPassed = false;
    document.getElementById("btnNext32").disabled = true;
    wireChecklist("checklist32", function (allChecked) { checklist32Done = allChecked; updateNext32(); });

    window.runClassifyRound(document.getElementById("commentExercise"), comments, {
      textOf: function (comment) { return comment.text; },
      isYesCorrect: function (comment) { return comment.constructive; },
      explanationOf: function (comment) { return comment.explanation; },
      labels: classifyLbl,
      onDone: function (correct, total, passed, roundMistakes) {
        commentsPassed = passed;
        if (passed) mistakes.push.apply(mistakes, roundMistakes);
        updateNext32();
      },
    });
  }

  function updateNext32() {
    document.getElementById("btnNext32").disabled = !(checklist32Done && commentsPassed);
  }

  /* ---------- Station 3.3: Krankmeldung + Phishing ---------- */

  var phishingEmails = [
    {
      subject: { de: "Dringend: Dein Schulkonto wird gesperrt!", en: "Urgent: Your school account will be blocked!" },
      from: "IT-Support <it-support@schule-sicherheit.info>",
      parts: [
        { text: { de: "Hallo, wir haben ungewöhnliche Aktivitäten auf deinem Konto festgestellt.", en: "Hello, we have detected unusual activity on your account." }, flag: false },
        { text: { de: " Klicke JETZT auf diesen Link, um dein Konto zu bestätigen", en: " Click this link NOW to confirm your account" }, flag: true, note: { de: "Künstlicher Zeitdruck und eine dringende Handlungsaufforderung sind typische Phishing-Signale.", en: "Artificial time pressure and an urgent call to action are classic phishing signals." } },
        { text: { de: ", sonst wird es in 24 Stunden gelöscht.", en: ", otherwise it will be deleted in 24 hours." }, flag: true, note: { de: "Drohungen mit knapper Frist sollen dich zu unüberlegtem Handeln verleiten.", en: "Threats with a tight deadline are meant to make you act without thinking." } },
        { text: { de: " Bitte gib dort dein Passwort ein.", en: " Please enter your password there." }, flag: true, note: { de: "Seriöse Stellen fragen niemals per Link oder E-Mail nach deinem Passwort.", en: "Legitimate organisations never ask for your password by link or email." } },
        { text: { de: " Vielen Dank, Dein IT-Team", en: " Thank you, your IT team" }, flag: false },
      ],
      senderFlag: {
        text: { de: "Absender: it-support@schule-sicherheit.info", en: "Sender: it-support@schule-sicherheit.info" },
        note: { de: "Das ist keine echte Schuladresse – ein falscher Absendername soll Vertrauen erwecken.", en: "This is not a real school address – a fake sender name is meant to create trust." },
      },
    },
    {
      subject: { de: "Erinnerung: Hausaufgabe bis Freitag", en: "Reminder: Homework due Friday" },
      from: "Frau Meier <m.meier@gsis-schule.de>",
      parts: [
        { text: { de: "Hallo zusammen, bitte denkt daran, die Aufgabe aus Classroom bis Freitag abzugeben.", en: "Hello everyone, please remember to submit the Classroom assignment by Friday." }, flag: false },
        { text: { de: " Bei Fragen könnt ihr mich gerne in der nächsten Stunde ansprechen.", en: " If you have questions, feel free to ask me in the next lesson." }, flag: false },
        { text: { de: " Viele Grüße, Frau Meier", en: " Best regards, Ms Meier" }, flag: false },
      ],
      senderFlag: null,
    },
  ];

  var phishLbl = {
    flag: { de: "🚩 ", en: "🚩 " },
    ok: { de: "(unauffällig – kein Warnsignal)", en: "(harmless – no warning sign)" },
    fromPrefix: { de: "Von: ", en: "From: " },
    subjectPrefix: { de: "Betreff: ", en: "Subject: " },
  };

  var checklist33Done = false;
  var phishingClicked = 0;
  var phishingTotal = 0;

  function initStation33() {
    checklist33Done = false;
    phishingClicked = 0;
    phishingTotal = 0;
    document.getElementById("btnNext33").disabled = true;
    wireChecklist("checklist33", function (allChecked) { checklist33Done = allChecked; updateNext33(); });

    var container = document.getElementById("phishingExercise");
    container.innerHTML = "";

    phishingEmails.forEach(function (email) {
      var card = document.createElement("div");
      card.className = "email-card";

      var bodyHtml = "";
      email.parts.forEach(function (part, i) {
        phishingTotal++;
        var noteAttr = part.note ? encodeURIComponent(L(part.note)) : "";
        bodyHtml += '<span class="email-part" data-flag="' + part.flag + '" data-note="' + noteAttr + '">' + L(part.text) + "</span>";
      });

      var fromHtml;
      if (email.senderFlag) {
        phishingTotal++;
        fromHtml = '<span class="email-part email-from" data-flag="true" data-note="' + encodeURIComponent(L(email.senderFlag.note)) + '">' + L(email.senderFlag.text) + "</span>";
      } else {
        fromHtml = '<span class="email-from">' + L(phishLbl.fromPrefix) + email.from + "</span>";
      }

      card.innerHTML =
        '<div class="email-subject">' + L(phishLbl.subjectPrefix) + L(email.subject) + "</div>" +
        '<div class="email-meta">' + fromHtml + "</div>" +
        '<p class="email-body">' + bodyHtml + "</p>";

      card.querySelectorAll(".email-part").forEach(function (span) {
        span.addEventListener("click", function () {
          if (span.classList.contains("clicked")) return;
          span.classList.add("clicked");
          var isFlag = span.dataset.flag === "true";
          span.classList.add(isFlag ? "flag-hit" : "flag-miss");
          var note = document.createElement("span");
          note.className = "email-part-note";
          note.textContent = isFlag ? "(" + L(phishLbl.flag) + decodeURIComponent(span.dataset.note) + ")" : L(phishLbl.ok);
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
    var summary = document.getElementById("completeSummary");
    summary.innerHTML =
      "<div>" + L({ de: "✓ Station 3.1 – Pecha-Kucha-Pitch mit Slides &amp; Vivi vorbereitet", en: "✓ Station 3.1 – Pecha Kucha pitch with Slides &amp; Vivi prepared" }) + "</div>" +
      "<div>" + L({ de: "✓ Station 3.2 – Kollaboration &amp; Feedback-Kommentare bewertet", en: "✓ Station 3.2 – Collaboration &amp; feedback comments judged" }) + "</div>" +
      "<div>" + L({ de: "✓ Station 3.3 – Krankmeldung &amp; Phishing-Erkennung abgeschlossen", en: "✓ Station 3.3 – Sick note &amp; phishing detection completed" }) + "</div>" +
      window.mistakesHTML(mistakes);
  }

  /* ---------- Init & Sprachwechsel ---------- */

  function initAll() {
    mistakes = [];
    initStation31();
    initStation32();
    initStation33();
  }

  document.addEventListener("langchange", function () {
    if (completed) renderSummary();
    else initAll();
  });

  initAll();
  showScreen("start", 0);
})();
