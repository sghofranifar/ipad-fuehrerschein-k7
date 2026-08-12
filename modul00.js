(function () {
  "use strict";

  var L = function (o) { return window.I18N ? window.I18N.L(o) : o.de; };

  /* ---------- Navigation & Progress ---------- */

  var screens = {
    start: document.getElementById("screen-start"),
    s00: document.getElementById("screen-0-0"),
    s01: document.getElementById("screen-0-1"),
    s02: document.getElementById("screen-0-2"),
    s03: document.getElementById("screen-0-3"),
    complete: document.getElementById("screen-complete"),
  };

  var nav = window.makeNavigator({ screens: screens, total: 4 });
  function showScreen(name, station) { nav.go(name, station); }

  var completed = false;
  var mistakes = [];

  document.getElementById("btnStart").addEventListener("click", function () { showScreen("s00", 1); });
  document.getElementById("btnNext00").addEventListener("click", function () { showScreen("s01", 2); });
  document.getElementById("btnNext01").addEventListener("click", function () { showScreen("s02", 3); });
  document.getElementById("btnNext02").addEventListener("click", function () { showScreen("s03", 4); });
  document.getElementById("btnNext03").addEventListener("click", function () {
    completed = true;
    renderSummary();
    localStorage.setItem("ipadfs-modul00-complete", "1");
    window.storeMistakes("modul00", mistakes);
    showScreen("complete", null);
  });
  document.getElementById("btnRestart").addEventListener("click", function () {
    completed = false;
    initAll();
    showScreen("start", 0);
  });

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

  /* ---------- Station 0.0: iPad-Regeln (Grafik, Formular, Fallbeispiele) ---------- */

  var posterRules = [
    { icon: "🔋", title: { de: "KOMM VORBEREITET", en: "COME PREPARED" }, text: { de: "Jede Nacht auf 100 % laden, Schutzhülle nutzen, Arbeit in Google Drive sichern.", en: "Charge to 100% every night, use a case, back up to Google Drive." } },
    { icon: "🙋", title: { de: "GESCHLOSSEN STARTEN, FRAGEN", en: "START CLOSED, ASK FIRST" }, text: { de: "Zu Beginn jeder Stunde geschlossen auf dem Tisch – nur mit Erlaubnis nutzen.", en: "Closed on the desk at the start of every lesson – only with permission." } },
    { icon: "🔇", title: { de: "TON AUS, CASE RUNTER", en: "SOUND OFF, CASE DOWN" }, text: { de: "Immer stummschalten; wenn die Lehrperson spricht, Case auf 45° oder zu.", en: "Always mute; when a teacher speaks, case at 45° or closed." } },
    { icon: "🎯", title: { de: "KONZENTRIER DICH AUFS LERNEN", en: "FOCUS ON LEARNING" }, text: { de: "Keine Games, kein Essen oder Trinken in der Nähe des Geräts.", en: "No gaming, no food or drinks near your device." } },
    { icon: "🔑", title: { de: "SCHÜTZE DEIN PASSWORT", en: "PROTECT YOUR PASSWORD" }, text: { de: "Halte es geheim – teile es nie, auch nicht mit Freunden.", en: "Keep it private – never share it, not even with friends." } },
    { icon: "🖼️", title: { de: "HALTE ES ANGEMESSEN", en: "KEEP IT APPROPRIATE" }, text: { de: "Bildschirmschoner, Hintergründe und Sticker müssen schulgeeignet sein.", en: "Screensavers, backgrounds and stickers must be school-appropriate." } },
    { icon: "📵", title: { de: "PRIVATSPHÄRE & URHEBERRECHT", en: "RESPECT PRIVACY & COPYRIGHT" }, text: { de: "Keine Fotos, Videos oder Tonaufnahmen von anderen ohne deren Einverständnis.", en: "No photos, videos or audio of others without their consent." } },
    { icon: "😊", title: { de: "SEI NETT – AUCH ONLINE", en: "BE KIND, ONLINE TOO" }, text: { de: "Bleib überall respektvoll – Lehrpersonen dürfen Geräte jederzeit prüfen.", en: "Stay respectful everywhere – teachers may check devices at any time." } },
    { icon: "📶", title: { de: "SICHER & VERBUNDEN", en: "KEEP IT SAFE & CONNECTED" }, text: { de: "Nie unbeaufsichtigt lassen; nur Schul-WLAN und nur in den Lernbereichen nutzen.", en: "Never leave it unattended; only school Wi-Fi and only in study areas." } },
    { icon: "🤝", title: { de: "KONFLIKTE OFFLINE LÖSEN", en: "HANDLE CONFLICTS OFFLINE" }, text: { de: "Klärt Streit persönlich – nicht über Nachrichten oder Posts.", en: "Sort out disagreements in person – not through messages or posts." } },
  ];

  var masteryQuestions = [
    {
      q: { de: "Fallbeispiel: Dein iPad ist morgens nur zu 30 % geladen. Was hast du falsch gemacht?", en: "Case: Your iPad is only 30% charged in the morning. What did you do wrong?" },
      options: [
        { de: "Ich habe es nicht über Nacht zu Hause auf 100 % geladen", en: "I didn't charge it to 100% at home overnight" },
        { de: "Nichts – das ist normal", en: "Nothing – that's normal" },
        { de: "Ich hätte es in der Schule laden sollen", en: "I should have charged it at school" },
        { de: "Der Akku ist kaputt", en: "The battery is broken" },
      ],
      correct: 0,
      explanation: { de: "Das Gerät muss jede Nacht zu Hause vollständig geladen werden – auf das Laden in der Schule kannst du dich nicht verlassen.", en: "The device must be fully charged at home every night – you can't rely on charging it at school." },
    },
    {
      q: { de: "Fallbeispiel: In der Pause willst du im Flur schnell ein Video schauen. Ist das erlaubt?", en: "Case: During break you want to quickly watch a video in the corridor. Is that allowed?" },
      options: [
        { de: "Nein – in Pausen nur in den ausgewiesenen Lernbereichen, nicht in den Gängen", en: "No – during breaks only in the designated study areas, not in the corridors" },
        { de: "Ja, in der Pause ist alles erlaubt", en: "Yes, during break anything is allowed" },
        { de: "Nur wenn es leise ist", en: "Only if it's quiet" },
        { de: "Nur mit Kopfhörern", en: "Only with headphones" },
      ],
      correct: 0,
      explanation: { de: "In den Pausen darfst du das Gerät nicht in den Gängen nutzen, nur in den ausgewiesenen Lernbereichen.", en: "During breaks you may not use the device in the corridors, only in the designated study areas." },
    },
    {
      q: { de: "Fallbeispiel: Ein Freund fragt dich nach deinem Passwort, um dir bei den Hausaufgaben zu helfen. Was tust du?", en: "Case: A friend asks for your password to help with homework. What do you do?" },
      options: [
        { de: "Ich teile mein Passwort nicht – auch nicht mit Freunden", en: "I don't share my password – not even with friends" },
        { de: "Ich gebe es ihm kurz", en: "I give it to them briefly" },
        { de: "Nur wenn er es niemandem sagt", en: "Only if they promise to keep it secret" },
        { de: "Ich schreibe es ihm auf", en: "I write it down for them" },
      ],
      correct: 0,
      explanation: { de: "Dein Passwort ist privat und bleibt geheim – teile es niemals, auch nicht mit deinem besten Freund.", en: "Your password is private and stays secret – never share it, not even with your best friend." },
    },
    {
      q: { de: "Fallbeispiel: Die Lehrperson spricht zur Klasse. In welchem Zustand ist dein iPad?", en: "Case: The teacher is speaking to the class. What state is your iPad in?" },
      options: [
        { de: "Ton aus und Case auf 45° oder ganz geschlossen", en: "Sound off and case at 45° or fully closed" },
        { de: "Ton an, damit ich mitmachen kann", en: "Sound on so I can join in" },
        { de: "Offen, ich tippe nebenbei mit", en: "Open, I type along on the side" },
        { de: "Egal, Hauptsache es liegt auf dem Tisch", en: "Doesn't matter, as long as it's on the desk" },
      ],
      correct: 0,
      explanation: { de: "Der Ton ist immer stumm; wenn die Lehrperson spricht, ist der Case auf 45° oder ganz geschlossen.", en: "The sound is always muted; when a teacher speaks, the case is at 45° or fully closed." },
    },
    {
      q: { de: "Fallbeispiel: Du möchtest ein lustiges Foto von einer Mitschülerin posten. Erlaubt?", en: "Case: You want to post a funny photo of a classmate. Allowed?" },
      options: [
        { de: "Nein – keine Fotos/Videos von anderen ohne deren Einverständnis", en: "No – no photos/videos of others without their consent" },
        { de: "Ja, wenn es lustig ist", en: "Yes, if it's funny" },
        { de: "Nur in der Klassengruppe", en: "Only in the class group" },
        { de: "Nur ohne Namen", en: "Only without a name" },
      ],
      correct: 0,
      explanation: { de: "Fotos, Videos oder Tonaufnahmen von anderen sind nur mit deren Einverständnis erlaubt.", en: "Photos, videos or audio of others are only allowed with their consent." },
    },
    {
      q: { de: "Fallbeispiel: Du hast Streit mit jemandem über Nachrichten. Was ist laut Regeln richtig?", en: "Case: You're arguing with someone over messages. What's correct according to the rules?" },
      options: [
        { de: "Den Konflikt persönlich/offline klären, nicht über Nachrichten oder Posts", en: "Resolve the conflict in person/offline, not through messages or posts" },
        { de: "Zurückschreiben, bis er aufhört", en: "Message back until they stop" },
        { de: "Einen Post darüber schreiben", en: "Write a post about it" },
        { de: "Screenshots an alle schicken", en: "Send screenshots to everyone" },
      ],
      correct: 0,
      explanation: { de: "Meinungsverschiedenheiten klärst du persönlich – nicht über Nachrichten oder Posts.", en: "Sort out disagreements in person – not through messages or posts." },
    },
    {
      q: { de: "Wie oft und wie stark musst du dein iPad aufladen?", en: "How often and how much must you charge your iPad?" },
      options: [
        { de: "Jede Nacht zu Hause auf 100 %", en: "To 100% at home every night" },
        { de: "Einmal pro Woche", en: "Once a week" },
        { de: "Nur wenn es fast leer ist", en: "Only when it's almost empty" },
        { de: "In der Schule reicht", en: "Charging at school is enough" },
      ],
      correct: 0,
      explanation: { de: "Dein Gerät muss jede Nacht zu Hause auf 100 % geladen werden.", en: "Your device must be charged to 100% at home every night." },
    },
    {
      q: { de: "Was passiert auf Stufe 2 der Konsequenzen?", en: "What happens at Level 2 of the consequences?" },
      options: [
        { de: "Das Gerät wird eingesammelt und am Ende des Schultages zurückgegeben", en: "The device is collected and returned at the end of the school day" },
        { de: "Nichts, nur eine Ermahnung", en: "Nothing, just a warning" },
        { de: "Die Eltern werden sofort angerufen", en: "Parents are called immediately" },
        { de: "Das iPad wird gelöscht", en: "The iPad is wiped" },
      ],
      correct: 0,
      explanation: { de: "Auf Stufe 2 wird das Gerät eingesammelt und am Ende des Schultages zurückgegeben.", en: "At Level 2 the device is collected and returned at the end of the school day." },
    },
  ];

  var rmDone = false;

  function renderPoster() {
    var grid = document.getElementById("rulesPosterGrid");
    grid.innerHTML = "";
    posterRules.forEach(function (rule, i) {
      var el = document.createElement("div");
      el.className = "poster-rule";
      el.innerHTML =
        '<div class="pr-num">' + (i + 1) + "</div>" +
        '<div class="pr-body"><span class="pr-title"><span class="pr-icon">' + rule.icon + "</span>" + L(rule.title) + "</span>" +
        '<span class="pr-text">' + L(rule.text) + "</span></div>";
      grid.appendChild(el);
    });
  }

  function setupRulesImage() {
    var img = document.getElementById("rulesImg");
    var poster = document.getElementById("rulesPoster");
    function useImg() { img.hidden = false; poster.hidden = true; }
    function usePoster() { img.hidden = true; poster.hidden = false; }
    img.onload = useImg;
    img.onerror = usePoster;
    if (img.complete) { if (img.naturalWidth > 0) useImg(); else usePoster(); }
  }

  function renderSignature() {
    var input = document.getElementById("signName");
    input.value = localStorage.getItem("ipadfs-name") || "";
    input.oninput = function () {
      localStorage.setItem("ipadfs-name", input.value.trim());
      updateNext00();
    };
    document.getElementById("signDate").textContent = new Date().toLocaleDateString(
      (window.I18N && window.I18N.lang === "en") ? "en-GB" : "de-DE"
    );
  }

  function initStation00() {
    renderPoster();
    setupRulesImage();

    var signCheck = document.getElementById("signCheck");
    signCheck.checked = false;
    signCheck.onchange = updateNext00;
    renderSignature();

    rmDone = false;
    window.runQuiz(document.getElementById("rulesMasteryQuiz"), masteryQuestions, function (score, total, passed, roundMistakes) {
      rmDone = passed;
      if (passed) mistakes.push.apply(mistakes, roundMistakes);
      updateNext00();
    });
    updateNext00();
  }

  function updateNext00() {
    var signed = document.getElementById("signCheck").checked;
    var hasName = document.getElementById("signName").value.trim().length > 0;
    document.getElementById("btnNext00").disabled = !(signed && hasName && rmDone);
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
    {
      q: { de: "Darfst du auf dem Schul-iPad selbst Apps aus dem App Store installieren?", en: "May you install apps from the App Store yourself on the school iPad?" },
      options: [
        { de: "Nein – Apps installiert nur die Schule (MDM)", en: "No – only the school installs apps (MDM)" },
        { de: "Ja, jederzeit", en: "Yes, any time" },
        { de: "Ja, aber nur Spiele", en: "Yes, but only games" },
        { de: "Nur am Wochenende", en: "Only at weekends" },
      ],
      correct: 0,
      explanation: { de: "Auf dem Schul-iPad kannst du dich nicht im App Store anmelden – alle Apps kommen von der Schule.", en: "On the school iPad you can't sign in to the App Store – all apps come from the school." },
    },
    {
      q: { de: "Welchen Browser benutzt du auf dem Schul-iPad?", en: "Which browser do you use on the school iPad?" },
      options: [
        { de: "Nur Google Chrome – Safari ist gesperrt", en: "Only Google Chrome – Safari is blocked" },
        { de: "Safari", en: "Safari" },
        { de: "Irgendeinen", en: "Any browser" },
        { de: "Gar keinen", en: "None at all" },
      ],
      correct: 0,
      explanation: { de: "Safari ist gesperrt. Du surfst immer mit Google Chrome, damit der Schulfilter greift.", en: "Safari is blocked. You always browse with Google Chrome so the school filter works." },
    },
    {
      q: { de: "Kannst du das Kontrollzentrum am Schul-iPad selbst umgestalten?", en: "Can you customise Control Centre on the school iPad?" },
      options: [
        { de: "Nein, es ist von der Schule fest eingestellt", en: "No, it is fixed by the school" },
        { de: "Ja, in den Einstellungen", en: "Yes, in Settings" },
        { de: "Ja, über den App Store", en: "Yes, via the App Store" },
        { de: "Nur die Lehrkraft für mich", en: "Only the teacher can, for me" },
      ],
      correct: 0,
      explanation: { de: "Das Kontrollzentrum ist fest konfiguriert – du kannst es nutzen, aber nicht verändern.", en: "Control Centre is fixed – you can use it but not change it." },
    },
    {
      q: { de: "Darfst du dein iPad über einen eigenen Hotspot (Handy) oder ein VPN ins Internet bringen?", en: "May you connect your iPad to the internet via your own hotspot (phone) or a VPN?" },
      options: [
        { de: "Nein – nur über das Schul-WLAN, damit der Filter wirkt", en: "No – only via the school Wi-Fi so the filter works" },
        { de: "Ja, das ist schneller", en: "Yes, it's faster" },
        { de: "Ja, in der Pause", en: "Yes, during break" },
        { de: "Nur mit VPN", en: "Only with a VPN" },
      ],
      correct: 0,
      explanation: { de: "Ein eigener Hotspot oder VPN umgeht den Jugendschutz- und Sicherheitsfilter der Schule und ist nicht erlaubt.", en: "Your own hotspot or VPN bypasses the school's safety filter and is not allowed." },
    },
  ];

  var rqDone = false;

  function initRulesQuiz() {
    rqDone = false;
    window.runQuiz(document.getElementById("rulesQuiz"), rulesQuestions, function (score, total, passed, roundMistakes) {
      rqDone = passed;
      if (passed) mistakes.push.apply(mistakes, roundMistakes);
      updateNext01();
    });
    updateNext01();
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

  var quizScore = 0;

  function initPwQuiz() {
    quizScore = 0;
    document.getElementById("btnNext02").disabled = true;
    window.runQuiz(document.getElementById("quiz"), questions, function (score, total, passed, roundMistakes) {
      quizScore = score;
      if (passed) mistakes.push.apply(mistakes, roundMistakes);
      document.getElementById("btnNext02").disabled = !passed;
    });
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
  var HIT_TOLERANCE = 46;

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

  function findNearestDropZone(x, y) {
    var best = null;
    var bestDist = Infinity;
    document.querySelectorAll(".drop-zone").forEach(function (zone) {
      if (zone.classList.contains("filled")) return;
      var r = zone.getBoundingClientRect();
      var cx = r.left + r.width / 2;
      var cy = r.top + r.height / 2;
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
      "<div>" + L({ de: "✓ Station 0.0 – iPad-Regeln gelesen &amp; unterschrieben", en: "✓ Station 0.0 – iPad rules read &amp; signed" }) + "</div>" +
      "<div>" + L({ de: "✓ Station 0.1 – Nutzungsordnung abgeschlossen", en: "✓ Station 0.1 – Acceptable-use policy completed" }) + "</div>" +
      "<div>" + L({ de: "✓ Station 0.2 – Passwort-Quiz: " + quizScore + " von " + questions.length + " Punkten", en: "✓ Station 0.2 – Password quiz: " + quizScore + " of " + questions.length + " points" }) + "</div>" +
      "<div>" + L({ de: "✓ Station 0.3 – Aufbau des Geräts abgeschlossen", en: "✓ Station 0.3 – Parts of the device completed" }) + "</div>" +
      window.mistakesHTML(mistakes);
  }

  /* ---------- Init & Sprachwechsel ---------- */

  function initAll() {
    mistakes = [];
    initStation00();
    initMatchGame();
    initRulesQuiz();
    initPwQuiz();
    initLabeling();
  }

  document.addEventListener("langchange", function () {
    if (completed) renderSummary();
    else initAll();
  });

  initAll();
  showScreen("start", 0);
})();
