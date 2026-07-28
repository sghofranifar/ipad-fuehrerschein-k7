(function () {
  "use strict";

  function L(o) { return window.I18N ? window.I18N.L(o) : o.de; }

  /* Shared navigator: always-visible progress scale + Back-history.
     Home is a plain <a href="index.html"> in the header (works without JS). */
  window.makeNavigator = function (opts) {
    var progressWrap = document.getElementById("progressWrap");
    var progressLabel = document.getElementById("progressLabel");
    var progressFill = document.getElementById("progressFill");
    var navBack = document.getElementById("navBack");
    var navHome = document.getElementById("navHome");

    var screens = opts.screens;
    var total = opts.total;
    var stack = [];
    var current = null;

    function setProgress(name, station) {
      progressWrap.hidden = false;
      var label, pct;
      if (name === "start") {
        label = L({ de: "Übersicht", en: "Overview" });
        pct = 0;
      } else if (name === "complete") {
        label = L({ de: "Abgeschlossen", en: "Completed" });
        pct = 100;
      } else {
        label = L({ de: "Station " + station + " von " + total, en: "Station " + station + " of " + total });
        pct = (station / total) * 100;
      }
      progressLabel.textContent = label;
      progressFill.style.width = pct + "%";
    }

    function activate(name) {
      Object.keys(screens).forEach(function (k) { screens[k].classList.remove("active"); });
      screens[name].classList.add("active");
      window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    }

    function updateButtons() {
      if (navBack) navBack.hidden = stack.length === 0;
    }

    function go(name, station, isBack) {
      if (name === "start") { stack = []; current = null; }
      if (current && !isBack && name !== "start") stack.push(current);
      current = { name: name, station: station || 0 };
      activate(name);
      setProgress(name, station || 0);
      updateButtons();
    }

    if (navBack) {
      navBack.addEventListener("click", function () {
        if (!stack.length) return;
        var p = stack.pop();
        go(p.name, p.station, true);
      });
    }

    function updateAria() {
      if (navBack) navBack.setAttribute("aria-label", L({ de: "Zurück", en: "Back" }));
      if (navHome) navHome.setAttribute("aria-label", L({ de: "Hauptmenü", en: "Main menu" }));
    }

    document.addEventListener("langchange", function () {
      if (current) setProgress(current.name, current.station);
      updateAria();
    });
    updateAria();

    return { go: go };
  };

  /* Shared "Fehlerspeicher" renderer. mistakes: array of
     {q, your, correct} where each value is a {de,en} object. Storing the
     resolved option objects (not indices) keeps it correct even when the
     answer options get reshuffled. Returns HTML. */
  window.mistakesHTML = function (mistakes) {
    var t = function (k) { return window.I18N ? window.I18N.t(k) : k; };
    if (!mistakes.length) {
      return '<div class="mistakes mistakes--none"><p class="mistakes-title">' + t("err.title") +
        '</p><div class="mistakes-none">' + t("err.none") + "</div></div>";
    }
    var items = mistakes.map(function (m) {
      return '<div class="mistakes-item"><span class="mq">' + L(m.q) + "</span>" +
        '<span class="ma">' + t("err.your") + " " + L(m.your) + "</span>" +
        '<span class="mc">' + t("err.correct") + " " + L(m.correct) + "</span></div>";
    }).join("");
    return '<div class="mistakes"><p class="mistakes-title">' + t("err.title") + "</p>" + items + "</div>";
  };

  /* Persist the current run's mistakes so they are genuinely stored. */
  window.storeMistakes = function (pageId, mistakes) {
    try {
      var data = mistakes.map(function (m) {
        return { q: m.q.de, your: m.your.de, correct: m.correct.de };
      });
      localStorage.setItem("ipadfs-errors-" + pageId, JSON.stringify(data));
    } catch (e) { /* ignore storage errors */ }
  };

  /* Shuffle a multiple-choice question's options in place and update its
     `correct` index, so the right answer is not always first. */
  window.shuffleOptions = function (q) {
    var correctOpt = q.options[q.correct];
    for (var i = q.options.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = q.options[i]; q.options[i] = q.options[j]; q.options[j] = tmp;
    }
    q.correct = q.options.indexOf(correctOpt);
  };

  function shuffleArr(arr) {
    var copy = arr.slice();
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = copy[i]; copy[i] = copy[j]; copy[j] = t;
    }
    return copy;
  }

  /* Minimum share of correct answers required to pass any question round
     and move on. Below this, the learner must redo the round. */
  window.QUIZ_PASS_RATIO = 0.75;

  function passLine(score, total) {
    var pct = total > 0 ? Math.round((score / total) * 100) : 100;
    var passed = total > 0 && (score / total) >= window.QUIZ_PASS_RATIO;
    var box = document.createElement("div");
    box.className = "quiz-result" + (passed ? "" : " quiz-result--fail");

    var scoreLine = document.createElement("p");
    scoreLine.className = "quiz-result-score";
    scoreLine.textContent = L({
      de: score + " von " + total + " richtig beantwortet (" + pct + " %).",
      en: score + " of " + total + " answered correctly (" + pct + "%).",
    });
    box.appendChild(scoreLine);

    var msg = document.createElement("p");
    msg.className = "quiz-result-msg";
    msg.textContent = passed
      ? L({ de: "✓ Bestanden – weiter geht's!", en: "✓ Passed – onward!" })
      : L({ de: "Das reicht noch nicht – du brauchst mindestens 75 % richtige Antworten. Versuch's noch einmal!", en: "Not quite there yet – you need at least 75% correct. Give it another try!" });
    box.appendChild(msg);

    return { box: box, passed: passed };
  }

  function retryButton(onClick) {
    var btn = document.createElement("button");
    btn.className = "quiz-next";
    btn.textContent = L({ de: "🔄 Nochmal versuchen", en: "🔄 Try again" });
    btn.addEventListener("click", onClick);
    return btn;
  }

  /* Runs a standard one-question-at-a-time multiple-choice quiz inside
     `container`. `questions` is [{q, options, correct, explanation}] with
     {de,en} text objects (see shuffleOptions). Every full pass through the
     questions is scored; below QUIZ_PASS_RATIO the learner gets a retry
     button and the whole round restarts (reshuffled) instead of unlocking
     the next step. `onDone(score, total, passed, roundMistakes)` fires each
     time a full pass completes, whether it passed or not; `roundMistakes`
     (only meaningful when passed) is an array of {q, your, correct} ready
     to merge into a page's `mistakes` list. */
  window.runQuiz = function (container, questions, onDone) {
    var idx, score, roundMistakes;

    function start() {
      idx = 0;
      score = 0;
      roundMistakes = [];
      questions.forEach(window.shuffleOptions);
      renderQuestion();
    }

    function renderQuestion() {
      container.innerHTML = "";
      if (idx >= questions.length) { finish(); return; }

      var question = questions[idx];
      var wrap = document.createElement("div");
      wrap.className = "quiz-question";

      var progress = document.createElement("div");
      progress.className = "quiz-progress";
      progress.textContent = L({ de: "Frage " + (idx + 1) + " von " + questions.length, en: "Question " + (idx + 1) + " of " + questions.length });
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
            score++;
          } else {
            btn.classList.add("incorrect");
            allOptions[question.correct].classList.add("correct");
            roundMistakes.push({ q: question.q, your: question.options[i], correct: question.options[question.correct] });
          }

          var explanation = document.createElement("p");
          explanation.className = "quiz-explanation";
          explanation.textContent = L(question.explanation);
          wrap.appendChild(explanation);

          var nextBtn = document.createElement("button");
          nextBtn.className = "quiz-next";
          nextBtn.textContent = L(idx + 1 < questions.length ? { de: "Nächste Frage", en: "Next question" } : { de: "Ergebnis anzeigen", en: "Show result" });
          nextBtn.addEventListener("click", function () { idx++; renderQuestion(); });
          wrap.appendChild(nextBtn);
        });
        optionsWrap.appendChild(btn);
      });

      wrap.appendChild(optionsWrap);
      container.appendChild(wrap);
    }

    function finish() {
      var result = passLine(score, questions.length);
      if (!result.passed) result.box.appendChild(retryButton(start));
      container.appendChild(result.box);
      onDone(score, questions.length, result.passed, roundMistakes);
    }

    start();
    return { restart: start };
  };

  /* Runs a "classify all these items at once" round (each item gets a
     yes/no button pair, e.g. classify-cards) inside `container`. `items` is
     any array; `opts.textOf`, `opts.isYesCorrect`, `opts.explanationOf` are
     accessor functions, `opts.labels` is {yes, no} {de,en} text. Same
     pass/retry semantics and `onDone` signature as runQuiz. */
  window.runClassifyRound = function (container, items, opts) {
    var answered, correct, roundMistakes;

    function start() {
      answered = 0;
      correct = 0;
      roundMistakes = [];
      container.innerHTML = "";

      shuffleArr(items).forEach(function (item) {
        var card = document.createElement("div");
        card.className = "classify-card";
        card.innerHTML =
          '<p class="classify-text">' + L(opts.textOf(item)) + "</p>" +
          '<div class="classify-buttons">' +
          '<button class="classify-btn" data-answer="true">' + L(opts.labels.yes) + "</button>" +
          '<button class="classify-btn" data-answer="false">' + L(opts.labels.no) + "</button>" +
          "</div>";

        var buttons = card.querySelectorAll(".classify-btn");
        buttons.forEach(function (btn) {
          btn.addEventListener("click", function () {
            buttons.forEach(function (b) { b.disabled = true; });
            var answeredYes = btn.dataset.answer === "true";
            var correctYes = !!opts.isYesCorrect(item);
            var isCorrect = answeredYes === correctYes;
            btn.classList.add(isCorrect ? "correct" : "incorrect");
            if (isCorrect) {
              correct++;
            } else {
              card.querySelector('[data-answer="' + correctYes + '"]').classList.add("correct");
              roundMistakes.push({
                q: opts.textOf(item),
                your: answeredYes ? opts.labels.yes : opts.labels.no,
                correct: correctYes ? opts.labels.yes : opts.labels.no,
              });
            }
            var explanation = document.createElement("p");
            explanation.className = "classify-explanation";
            explanation.textContent = L(opts.explanationOf(item));
            card.appendChild(explanation);
            answered++;
            if (answered === items.length) finish();
          });
        });
        container.appendChild(card);
      });
    }

    function finish() {
      var result = passLine(correct, items.length);
      if (!result.passed) result.box.appendChild(retryButton(start));
      container.appendChild(result.box);
      opts.onDone(correct, items.length, result.passed, roundMistakes);
    }

    start();
    return { restart: start };
  };
})();
