(function () {
  "use strict";

  var LANG_KEY = "ipadfs-lang";

  var dict = {
    /* ---------- Page titles ---------- */
    "title.hub": { de: "iPad-Führerschein – Hauptmenü", en: "iPad Licence – Main Menu" },
    "title.modul00": { de: "iPad-Führerschein – Modul 00: Der Startschuss", en: "iPad Licence – Module 00: Getting Started" },
    "title.level1": { de: "iPad-Führerschein – Level 1: Basic Skills", en: "iPad Licence – Level 1: Basic Skills" },
    "title.level2": { de: "iPad-Führerschein – Level 2: Intermediate", en: "iPad Licence – Level 2: Intermediate" },
    "title.level3": { de: "iPad-Führerschein – Level 3: Advanced", en: "iPad Licence – Level 3: Advanced" },
    "title.exam": { de: "iPad-Führerschein – Abschlussprüfung", en: "iPad Licence – Final Exam" },
    "title.impressum": { de: "iPad-Führerschein – Impressum & Datenschutz", en: "iPad Licence – Imprint & Privacy" },

    /* ---------- Common ---------- */
    "app.title": { de: "iPad-Führerschein", en: "iPad Licence" },
    "common.start": { de: "Los geht's", en: "Let's go" },
    "common.reset": { de: "Zurücksetzen", en: "Reset" },
    "nav.backHome": { de: "Zurück zum Hauptmenü", en: "Back to main menu" },
    "nav.overview": { de: "Übersicht", en: "Overview" },
    "nav.doneLabel": { de: "Abgeschlossen", en: "Completed" },
    "nav.back": { de: "Zurück", en: "Back" },
    "nav.home": { de: "Hauptmenü", en: "Main menu" },
    "footer.text": {
      de: "© " + new Date().getFullYear() + " iPad-Führerschein · German Swiss International School",
      en: "© " + new Date().getFullYear() + " iPad Licence · German Swiss International School",
    },
    "footer.impressumLink": { de: "Impressum & Datenschutz", en: "Imprint & Privacy" },
    "err.title": { de: "📝 Deine Fehler zum Nachschauen", en: "📝 Your mistakes to review" },
    "err.none": { de: "Keine Fehler – perfekt! 🎉", en: "No mistakes – perfect! 🎉" },
    "err.your": { de: "Deine Antwort:", en: "Your answer:" },
    "err.correct": { de: "Richtig:", en: "Correct:" },

    /* ---------- Hub (index.html) ---------- */
    "hub.intro": {
      de: "Willkommen! Arbeite dich Station für Station durch die Module. Dein Fortschritt wird auf diesem iPad/Browser gespeichert.",
      en: "Welcome! Work through the modules station by station. Your progress is saved on this iPad/browser.",
    },
    "hub.aiFrameworkNote": {
      de: "Einzelne Stationen greifen zusätzlich Kompetenzen aus dem OECD/EU-Rahmenwerk „AI Literacy“ (2026) auf.",
      en: "Selected stations also draw on competences from the OECD/EU „AI Literacy“ framework (2026).",
    },
    "hub.nameLabel": { de: "Dein Name", en: "Your name" },
    "hub.namePh": { de: "Vor- und Nachname", en: "First and last name" },
    "hub.classLabel": { de: "Deine Klasse", en: "Your class" },
    "hub.classPh": { de: "z. B. 7A", en: "e.g. 7A" },
    "hub.identNote": {
      de: "Name und Klasse erscheinen später auf deinem Zertifikat der Abschlussprüfung.",
      en: "Your name and class will later appear on your final-exam certificate.",
    },

    /* ---------- Modul 00 ---------- */
    "m0.start.h1": { de: "Modul 00: Der Startschuss", en: "Module 00: Getting Started" },
    "m0.start.intro": {
      de: "Willkommen! Du hast heute zum ersten Mal dein eigenes, von der Schule eingerichtetes iPad bekommen. Bevor es mit spannenden Apps weitergeht, klären wir gemeinsam die wichtigsten Grundlagen.",
      en: "Welcome! Today you received your own school-configured iPad for the first time. Before we move on to exciting apps, let's sort out the most important basics together.",
    },
    "m0.ov.0": { de: "Die iPad-Regeln", en: "The iPad Rules" },
    "m0.ov.1": { de: "Die Nutzungsordnung", en: "The acceptable-use policy" },

    "m0.s0.h2": { de: "Station 0.0 – Die iPad-Regeln", en: "Station 0.0 – The iPad Rules" },
    "m0.s0.goal": {
      de: "🎯 Lernziel: Du kennst die offiziellen GSIS iPad-Regeln, unterschreibst sie und kannst sie im Alltag anwenden.",
      en: "🎯 Objective: You know the official GSIS iPad rules, sign them and can apply them in everyday situations.",
    },
    "m0.s0.posterTitle": { de: "📋 Die offizielle GSIS iPad-Regeln-Grafik", en: "📋 The official GSIS iPad Rules graphic" },
    "m0.s0.formTitle": { de: "📜 Die iPad-Regeln zum Unterschreiben", en: "📜 The iPad rules to sign" },
    "m0.s0.formIntro": {
      de: "Diese Regeln erhältst du zu Beginn und unterschreibst sie. Lies sie aufmerksam durch.",
      en: "You receive these rules at the start and sign them. Read them carefully.",
    },
    "m0.s0.formHtml": {
      de: "<h4>📦 Bevor du zur Schule kommst</h4><ul>" +
        "<li><strong>Lade es auf:</strong> Dein Gerät muss jede Nacht zu Hause auf 100 % geladen werden.</li>" +
        "<li><strong>Schütze es:</strong> Trage dein Gerät immer in einer Schutzhülle.</li>" +
        "<li><strong>Sichere deine Daten:</strong> Speichere wichtige Arbeiten an zwei Orten, z. B. in Google Drive.</li></ul>" +
        "<h4>🧑‍🏫 Im Klassenzimmer</h4><ul>" +
        "<li>Zu Beginn jeder Stunde liegt dein Gerät wie ein Schulbuch geschlossen auf dem Tisch.</li>" +
        "<li>Benutze dein iPad nur mit der Erlaubnis deiner Lehrperson.</li>" +
        "<li><strong>Ton aus, Case runter:</strong> Ton immer stumm; wenn die Lehrperson spricht, Case auf 45° oder ganz geschlossen.</li>" +
        "<li><strong>Konzentriere dich aufs Lernen:</strong> Spielen von Games ist während der Schulzeit niemals erlaubt.</li>" +
        "<li><strong>Kein Essen oder Trinken</strong> in der Nähe des Geräts.</li></ul>" +
        "<h4>🧑‍💻 Deine Verantwortung als Digital Citizen</h4><ul>" +
        "<li><strong>Schütze dein Passwort:</strong> Teile es niemals – auch nicht mit deinem besten Freund.</li>" +
        "<li><strong>Halte es angemessen:</strong> Bildschirmschoner, Hintergründe und Sticker müssen schulgeeignet sein.</li>" +
        "<li>Deine Lehrperson darf dein iPad jederzeit überprüfen.</li>" +
        "<li><strong>Lass es nie allein</strong> an unbeaufsichtigten Orten liegen.</li>" +
        "<li><strong>Am richtigen Ort:</strong> In den Pausen nicht in den Gängen, nur in den Lernbereichen.</li>" +
        "<li><strong>Sei nett und respektvoll:</strong> Keine Fotos/Videos von anderen ohne Erlaubnis; poste oder teile nichts Gemeines.</li></ul>" +
        "<h4>⚠️ Konsequenzen bei Regelverstößen</h4><ul>" +
        "<li><strong>Stufe 1:</strong> Mündliche Verwarnung (Ermahnung). Die Lehrperson kann das Gerät je nach Vergehen auch ohne Warnung einsammeln.</li>" +
        "<li><strong>Stufe 2:</strong> Das Gerät wird eingesammelt und am Ende des Schultages zurückgegeben.</li>" +
        "<li><strong>Stufe 3:</strong> Bei 2–3 Wiederholungen werden deine Eltern zu einem Gespräch eingeladen.</li></ul>",
      en: "<h4>📦 Before you come to school</h4><ul>" +
        "<li><strong>Charge it up:</strong> Your device must be 100% charged every night at home.</li>" +
        "<li><strong>Keep it safe:</strong> Always carry your device in a protective case.</li>" +
        "<li><strong>Back it up:</strong> Save important work in two places, e.g. in Google Drive.</li></ul>" +
        "<h4>🧑‍🏫 In the classroom</h4><ul>" +
        "<li>At the start of every lesson your device stays closed on your desk, like a textbook.</li>" +
        "<li>Only use your iPad with your teacher's permission.</li>" +
        "<li><strong>Sound off, case down:</strong> Always mute the sound; when a teacher is speaking, set the case to 45° or fully closed.</li>" +
        "<li><strong>Focus on learning:</strong> Playing games is never allowed during school time.</li>" +
        "<li><strong>No food or drinks</strong> near your device.</li></ul>" +
        "<h4>🧑‍💻 Your responsibility as a digital citizen</h4><ul>" +
        "<li><strong>Protect your password:</strong> Never share it – not even with your best friend.</li>" +
        "<li><strong>Keep it appropriate:</strong> Screensavers, backgrounds and stickers must be school-appropriate.</li>" +
        "<li>Your teacher may check your iPad at any time.</li>" +
        "<li><strong>Never leave it alone</strong> in unsupervised places.</li>" +
        "<li><strong>Use it in the right place:</strong> During breaks not in the corridors, only in the study areas.</li>" +
        "<li><strong>Be kind and respectful:</strong> No photos/videos of others without permission; don't post or share anything mean.</li></ul>" +
        "<h4>⚠️ Consequences for breaking the rules</h4><ul>" +
        "<li><strong>Level 1:</strong> A verbal warning. Depending on the incident, the teacher may also collect the device without a warning.</li>" +
        "<li><strong>Level 2:</strong> The device is collected and returned at the end of the school day.</li>" +
        "<li><strong>Level 3:</strong> If this happens 2–3 times, your parents are invited to a meeting.</li></ul>",
    },
    "m0.s0.signLabel": { de: "Ich habe die iPad-Regeln gelesen und verstanden und halte mich daran.", en: "I have read and understood the iPad rules and will follow them." },
    "m0.s0.signNameLabel": { de: "Unterschrift (dein Name):", en: "Signature (your name):" },
    "m0.s0.signPh": { de: "Tippe hier deinen vollen Namen", en: "Type your full name here" },
    "m0.s0.signHint": { de: "Noch kein Name? Trage ihn auf der Startseite ein.", en: "No name yet? Enter it on the start page." },
    "m0.s0.quizTitle": { de: "🧠 Fragen & Fallbeispiele", en: "🧠 Questions & case examples" },
    "m0.s0.quizIntro": { de: "Zeig, dass du die Regeln beherrschst – auch an Fallbeispielen:", en: "Show that you've mastered the rules – including case examples:" },
    "btn.next.0_1": { de: "Weiter zu Station 0.1", en: "Continue to Station 0.1" },
    "m0.ov.2": { de: "Passwörter & Google Classroom Login", en: "Passwords & Google Classroom login" },
    "m0.ov.3": { de: "Aufbau des Geräts", en: "Parts of the device" },

    "m0.s1.h2": { de: "Station 0.1 – Die Nutzungsordnung", en: "Station 0.1 – The acceptable-use policy" },
    "m0.s1.goal": {
      de: "🎯 Lernziel: Du kennst die schulinternen Regeln für den Umgang mit dem iPad.",
      en: "🎯 Objective: You know the school's rules for using the iPad.",
    },
    "m0.s1.driveTitle": { de: "📄 Die vollständige Nutzungsordnung", en: "📄 The full acceptable-use policy" },
    "m0.s1.driveDesc": {
      de: "Die komplette Nutzungsordnung liegt in Google Drive – auf Deutsch und Englisch. Öffne sie und lies sie aufmerksam – die Aufgaben und Fragen beziehen sich darauf.",
      en: "The complete policy is stored in Google Drive – in German and English. Open it and read it carefully – the tasks and questions are based on it.",
    },
    "m0.s1.driveBtn": { de: "Nutzungsordnung in Drive öffnen", en: "Open policy in Drive" },
    "m0.s1.matchTask": {
      de: "Ordne jede Regel dem passenden Symbol zu. Tippe zuerst auf eine Regel, dann auf das dazu passende Symbol.",
      en: "Match each rule to the right symbol. First tap a rule, then the matching symbol.",
    },
    "m0.s1.mdmTitle": { de: "🔒 So ist dein Schul-iPad eingestellt", en: "🔒 How your school iPad is set up" },
    "m0.s1.mdmBody": {
      de: "Dein iPad wird von der Schule verwaltet (MDM). Deshalb gilt:<ul>" +
        "<li>Apps kommen nur von der Schule – du kannst <strong>keine Apps im App Store installieren</strong> oder löschen.</li>" +
        "<li>Du kannst dich <strong>nicht im App Store anmelden</strong>.</li>" +
        "<li>Das <strong>Kontrollzentrum kannst du nicht umgestalten</strong> – es ist fest eingestellt.</li>" +
        "<li>Als Browser ist nur <strong>Google Chrome</strong> erlaubt, Safari ist gesperrt.</li>" +
        "<li>Der <strong>Verlauf in Chrome kann nicht gelöscht</strong> werden.</li>" +
        "<li>iMessage, FaceTime und Game Center sind ausgeschaltet.</li>" +
        "<li>Den <strong>Gerätenamen darfst du nicht ändern</strong>.</li></ul>",
      en: "Your iPad is managed by the school (MDM). That means:<ul>" +
        "<li>Apps only come from the school – you <strong>cannot install apps from the App Store</strong> or delete them.</li>" +
        "<li>You <strong>cannot sign in to the App Store</strong>.</li>" +
        "<li>You <strong>cannot customise Control Centre</strong> – it is fixed.</li>" +
        "<li>The only allowed browser is <strong>Google Chrome</strong>; Safari is blocked.</li>" +
        "<li>Your <strong>Chrome history cannot be deleted</strong>.</li>" +
        "<li>iMessage, FaceTime and Game Center are turned off.</li>" +
        "<li>You <strong>may not change the device name</strong>.</li></ul>",
    },
    "m0.s1.consTitle": { de: "⚠️ Was passiert bei Regelverstößen?", en: "⚠️ What happens if you break the rules?" },
    "m0.s1.consBody": {
      de: "Wer im Unterricht ohne Erlaubnis spielt oder verbotene Apps nutzt, muss das iPad abgeben. Du bekommst es am Ende des Schultages zurück. Passiert das <strong>dreimal</strong>, werden deine Eltern zu einem Gespräch in die Schule eingeladen.",
      en: "If you play games or use forbidden apps in class without permission, you must hand in the iPad. You get it back at the end of the school day. If this happens <strong>three times</strong>, your parents are invited to a meeting at school.",
    },
    "m0.s1.quizIntro": { de: "Beantworte zum Abschluss diese Fragen zur Nutzungsordnung:", en: "To finish, answer these questions about the acceptable-use policy:" },

    "m0.s2.h2": { de: "Station 0.2 – Passwörter & Classroom-Login", en: "Station 0.2 – Passwords & Classroom login" },
    "m0.s2.goal": {
      de: "🎯 Lernziel: Du weißt, wie ein sicheres Passwort aussieht, und kennst den Login für die Google Classroom App.",
      en: "🎯 Objective: You know what a secure password looks like and how to log in to the Google Classroom app.",
    },

    "m0.s3.h2": { de: "Station 0.3 – Aufbau des Geräts", en: "Station 0.3 – Parts of the device" },
    "m0.s3.goal": {
      de: "🎯 Lernziel: Du kannst Home-Button, Frontkamera, Lautstärketasten und Ladeanschluss benennen.",
      en: "🎯 Objective: You can name the home button, front camera, volume buttons and charging port.",
    },
    "m0.s3.task": {
      de: "Ziehe jedes Bauteil-Etikett an die passende markierte Stelle auf dem iPad. Du kannst ein Etikett auch antippen und dann die Stelle antippen.",
      en: "Drag each part label onto the matching marked spot on the iPad. You can also tap a label and then tap the spot.",
    },

    "m0.done.h1": { de: "Modul 00 abgeschlossen!", en: "Module 00 completed!" },
    "m0.done.text": {
      de: "Klasse gemacht! Du kennst jetzt die Regeln, den sicheren Login und den Aufbau deines iPads.",
      en: "Well done! You now know the rules, the secure login and the parts of your iPad.",
    },
    "m0.next": { de: "Weiter zu Level 1 🟢", en: "Continue to Level 1 🟢" },
    "m0.restart": { de: "Modul 00 erneut starten", en: "Restart Module 00" },
    "m0.finish": { de: "Modul 00 abschließen", en: "Finish Module 00" },
    "btn.next.0_2": { de: "Weiter zu Station 0.2", en: "Continue to Station 0.2" },
    "btn.next.0_3": { de: "Weiter zu Station 0.3", en: "Continue to Station 0.3" },

    /* ---------- Level 1 ---------- */
    "l1.start.h1": { de: "🟢 Level 1: Basic Skills", en: "🟢 Level 1: Basic Skills" },
    "l1.start.intro": {
      de: "Grundlagen & Orientierung: In diesem Level lernst du die iPad-spezifische Navigation und die wichtigsten Alltagshelfer kennen.",
      en: "Basics & orientation: In this level you get to know iPad-specific navigation and the most important everyday tools.",
    },
    "l1.ov.1": { de: "Navigation & Personalisierung", en: "Navigation & personalisation" },
    "l1.ov.2": { de: "Das Kontrollzentrum & Fokus", en: "Control Centre & Focus" },
    "l1.ov.3": { de: "Erste Werkzeuge & Alltagshelfer", en: "First tools & everyday helpers" },
    "l1.ov.4": { de: "Erste Schritte mit Google Chrome", en: "First steps with Google Chrome" },

    "l1.s1.h2": { de: "Station 1.1 – Navigation und Personalisierung", en: "Station 1.1 – Navigation and personalisation" },
    "l1.s1.goal": {
      de: "🎯 Lernziel: Apps thematisch in Ordnern sortieren, den App-Umschalter nutzen und Dateien über die Suche finden.",
      en: "🎯 Objective: Sort apps into themed folders, use the app switcher and find files with search.",
    },
    "l1.s1.folder.h": { de: "Ordner erstellen", en: "Create folders" },
    "l1.s1.folder.p": {
      de: "Tippe und halte eine App, bis die Symbole leicht wackeln. Ziehe sie auf eine andere App, um einen Ordner zu erstellen – so sortierst du deine Apps nach Themen (z. B. „Schule“, „Kreativ“, „Spiele“).",
      en: "Tap and hold an app until the icons wiggle. Drag it onto another app to create a folder – this is how you sort apps by theme (e.g. „School“, „Creative“, „Games“).",
    },
    "l1.s1.switch.h": { de: "App-Umschalter (Task-Manager)", en: "App switcher (task manager)" },
    "l1.s1.switch.p": {
      de: "Wische mit einem Finger von der unteren Bildschirmkante nach oben und halte kurz inne. So siehst du alle geöffneten Apps, kannst wechseln oder eine App nach oben wegwischen, um sie zu schließen.",
      en: "Swipe up with one finger from the bottom edge of the screen and pause briefly. You'll see all open apps, can switch between them, or swipe an app up to close it.",
    },
    "l1.s1.search.h": { de: "Suche", en: "Search" },
    "l1.s1.search.p": {
      de: "Wische auf dem Homebildschirm mittig nach unten, um die Suche zu öffnen. Tippe den Namen einer App oder Datei ein, um sie sofort zu finden.",
      en: "Swipe down in the middle of the home screen to open search. Type the name of an app or file to find it instantly.",
    },
    "l1.s1.checkIntro": {
      de: "Selbstkontrolle nach dem Partner-Check: Hake ab, was du schon geschafft hast.",
      en: "Self-check after the partner review: tick off what you've already done.",
    },
    "l1.s1.chk1": { de: "Ich habe meine Apps in mindestens 3 thematische Ordner sortiert.", en: "I sorted my apps into at least 3 themed folders." },
    "l1.s1.chk2": { de: "Ich habe den App-Umschalter ausprobiert und weiß, wie ich eine App darüber schließe.", en: "I tried the app switcher and know how to close an app with it." },
    "l1.s1.chk3": { de: "Ich habe die Suche genutzt, um eine App oder Datei zu finden.", en: "I used search to find an app or file." },
    "l1.s1.chk4": { de: "Meine Ordnerstruktur wurde von einer Partnerin / einem Partner kontrolliert.", en: "A partner checked my folder structure." },
    "btn.next.1_2": { de: "Weiter zu Station 1.2", en: "Continue to Station 1.2" },

    "l1.s2.h2": { de: "Station 1.2 – Das Kontrollzentrum & Fokus", en: "Station 1.2 – Control Centre & Focus" },
    "l1.s2.goal": {
      de: "🎯 Lernziel: Das Kontrollzentrum öffnen und die wichtigsten Funktionen (z. B. „Nicht stören“, Ausrichtungssperre) nutzen. Wichtig: Am Schul-iPad ist das Kontrollzentrum fest eingestellt und kann nicht umgestaltet werden.",
      en: "🎯 Objective: Open Control Centre and use its key functions (e.g. „Do Not Disturb“, rotation lock). Note: on the school iPad, Control Centre is fixed and cannot be customised.",
    },
    "btn.next.1_3": { de: "Weiter zu Station 1.3", en: "Continue to Station 1.3" },

    "l1.s3.h2": { de: "Station 1.3 – Erste Werkzeuge und Alltagshelfer", en: "Station 1.3 – First tools and everyday helpers" },
    "l1.s3.goal": {
      de: "🎯 Lernziel: Screenshots anfertigen, lesbare Fotos für Classroom erstellen und QR-Codes scannen.",
      en: "🎯 Objective: Take screenshots, create readable photos for Classroom and scan QR codes.",
    },
    "l1.s3.shot.h": { de: "Screenshot & Foto für Classroom", en: "Screenshot & photo for Classroom" },
    "l1.s3.shot.p": {
      de: "Drücke gleichzeitig die Ein/Aus-Taste und die Lauter-Taste, um einen Screenshot zu machen. Er landet automatisch in deiner Fotomediathek und kann direkt als Datei in Classroom hochgeladen werden.",
      en: "Press the power button and the volume-up button at the same time to take a screenshot. It's saved automatically in your photo library and can be uploaded directly to Classroom.",
    },
    "l1.s3.chk1": { de: "Ich habe schon einmal einen Screenshot gemacht.", en: "I have taken a screenshot before." },
    "l1.s3.chk2": { de: "Ich weiß, wie ich ein Foto in Google Classroom abgebe.", en: "I know how to submit a photo in Google Classroom." },
    "l1.s3.qrTitle": { de: "📷 QR-Code-Schnitzeljagd", en: "📷 QR-code scavenger hunt" },
    "l1.s3.qrTask": {
      de: "Deine Lehrkraft hat im Klassenraum QR-Codes verteilt. Scanne sie mit der Kamera-App, beantworte jede Frage und nimm den angegebenen Buchstaben deiner (englischen) Antwort. Setze die Buchstaben zum Lösungswort zusammen. (Zum Üben: tippe hier nacheinander auf die Codes.)",
      en: "Your teacher has placed QR codes around the classroom. Scan them with the Camera app, answer each question and take the given letter of your (English) answer. Put the letters together to form the solution word. (For practice: tap the codes here one by one.)",
    },
    "btn.next.1_4": { de: "Weiter zu Station 1.4", en: "Continue to Station 1.4" },

    "l1.s4.h2": { de: "Station 1.4 – Erste Schritte mit Google Chrome", en: "Station 1.4 – First steps with Google Chrome" },
    "l1.s4.goal": {
      de: "🎯 Lernziel: In Google Chrome URLs eingeben, Lesezeichen speichern und eine Webseite als „Web-App“ auf dem Homebildschirm ablegen. Am Schul-iPad nutzt du immer Chrome – Safari ist gesperrt.",
      en: "🎯 Objective: In Google Chrome, enter URLs, save bookmarks and place a website as a „web app“ on the home screen. On the school iPad you always use Chrome – Safari is blocked.",
    },
    "l1.s4.rulesTitle": { de: "🔒 Wichtig für das Internet am Schul-iPad", en: "🔒 Important for the internet on your school iPad" },
    "l1.s4.rulesBody": {
      de: "<ul>" +
        "<li>Als Browser ist nur <strong>Google Chrome</strong> erlaubt – Safari ist gesperrt.</li>" +
        "<li>Der <strong>Chrome-Verlauf darf nicht gelöscht</strong> werden.</li>" +
        "<li>Verbinde dich <strong>nur mit dem Schul-WLAN</strong>. Ein eigener <strong>Hotspot (Handy) oder VPN ist nicht erlaubt</strong> – dann wirken der Jugendschutz- und Sicherheitsfilter der Schule nicht mehr.</li></ul>",
      en: "<ul>" +
        "<li>The only allowed browser is <strong>Google Chrome</strong> – Safari is blocked.</li>" +
        "<li>Your <strong>Chrome history may not be deleted</strong>.</li>" +
        "<li>Only connect to the <strong>school Wi-Fi</strong>. Your own <strong>hotspot (phone) or VPN is not allowed</strong> – it would switch off the school's safety and content filter.</li></ul>",
    },
    "l1.s4.chk4": { de: "Ich weiß: Ich nutze nur Google Chrome und verbinde mich nur mit dem Schul-WLAN.", en: "I know: I only use Google Chrome and only connect to the school Wi-Fi." },
    "l1.s4.addr.h": { de: "1. Adresse eingeben", en: "1. Enter an address" },
    "l1.s4.addr.p": {
      de: "Tippe oben in die Adressleiste und gib die Internetadresse (URL) ein, z. B. schule.de – dann Enter drücken.",
      en: "Tap the address bar at the top and enter the web address (URL), e.g. schule.de – then press Enter.",
    },
    "l1.s4.book.h": { de: "2. Lesezeichen speichern", en: "2. Save a bookmark" },
    "l1.s4.book.p": {
      de: "Tippe auf das Teilen-Symbol und dann auf „Lesezeichen hinzufügen“, um eine Seite zu merken.",
      en: "Tap the share icon and then „Add bookmark“ to remember a page.",
    },
    "l1.s4.web.h": { de: "3. Als Web-App zum Homebildschirm", en: "3. Add to home screen as a web app" },
    "l1.s4.web.p": {
      de: "Tippe auf das Teilen-Symbol und dann auf „Zum Home-Bildschirm“. Die Webseite erscheint jetzt wie eine App auf deinem Homebildschirm.",
      en: "Tap the share icon and then „Add to Home Screen“. The website now appears like an app on your home screen.",
    },
    "l1.s4.aiTitle": { de: "💡 Kleines KI-Wissen", en: "💡 A little AI knowledge" },
    "l1.s4.aiBody": {
      de: "Wenn du bei Google etwas suchst, sortiert eine KI die Ergebnisse und schlägt dir passende Suchbegriffe vor. Prüfe Ergebnisse deshalb kritisch, statt dem ersten Treffer blind zu vertrauen.",
      en: "When you search on Google, an AI sorts the results and suggests matching search terms. So check results critically instead of blindly trusting the first hit.",
    },
    "l1.s4.chk1": { de: "Ich habe eine Internetadresse eingegeben.", en: "I entered a web address." },
    "l1.s4.chk2": { de: "Ich habe ein Lesezeichen gespeichert.", en: "I saved a bookmark." },
    "l1.s4.chk3": { de: "Ich habe eine Webseite als Symbol auf dem Home-Bildschirm abgelegt.", en: "I placed a website as an icon on the home screen." },
    "l1.finish": { de: "Level 1 abschließen", en: "Finish Level 1" },
    "l1.done.h1": { de: "Level 1 abgeschlossen!", en: "Level 1 completed!" },
    "l1.done.text": {
      de: "Stark! Du kennst jetzt die wichtigsten Navigations- und Alltagswerkzeuge deines iPads.",
      en: "Great! You now know the most important navigation and everyday tools of your iPad.",
    },
    "l1.next": { de: "Weiter zu Level 2 🟡", en: "Continue to Level 2 🟡" },
    "l1.restart": { de: "Level 1 erneut starten", en: "Restart Level 1" },

    /* ---------- Level 2 ---------- */
    "l2.start.h1": { de: "🟡 Level 2: Intermediate", en: "🟡 Level 2: Intermediate" },
    "l2.start.intro": {
      de: "Produktivität & Organisation: Dein iPad wird zum digitalen Schulranzen. In diesem Level arbeitest du mit echten Workflows in Google Drive, GoodNotes und Google Docs – parallel auf deinem Gerät.",
      en: "Productivity & organisation: Your iPad becomes your digital school bag. In this level you work with real workflows in Google Drive, GoodNotes and Google Docs – live on your device.",
    },
    "l2.ov.1": { de: "Dateimanagement in Drive & Classroom-Workflow", en: "File management in Drive & Classroom workflow" },
    "l2.ov.2": { de: "Digitale Hefterführung mit GoodNotes", en: "Digital note-keeping with GoodNotes" },
    "l2.ov.3": { de: "Textverarbeitung mit Google Docs", en: "Word processing with Google Docs" },
    "l2.start.hint": {
      de: "Halte für dieses Level dein iPad bereit – du wirst die Schritte direkt in den echten Apps ausprobieren.",
      en: "Keep your iPad ready for this level – you'll try the steps directly in the real apps.",
    },
    "common.stepsIntro": { de: "So gehst du vor:", en: "Here's how:" },
    "common.selfCheck": { de: "Selbstkontrolle: Hake ab, was du geschafft hast.", en: "Self-check: tick off what you've done." },

    "l2.s1.h2": { de: "Station 2.1 – Dateimanagement & Classroom-Workflow", en: "Station 2.1 – File management & Classroom workflow" },
    "l2.s1.goal": {
      de: "🎯 Lernziel: Eine sinnvolle Ordnerstruktur in Drive anlegen und den Workflow „Vorlage → Kopie → richtiger Ordner → Umbenennen“ sicher beherrschen.",
      en: "🎯 Objective: Build a sensible folder structure in Drive and master the workflow „template → copy → right folder → rename“.",
    },
    "l2.s1.step1": { de: "Öffne die Vorlage aus der Classroom-Aufgabe.", en: "Open the template from the Classroom assignment." },
    "l2.s1.step2": { de: "Erstelle über „Datei → Kopie erstellen“ deine eigene Kopie der Vorlage.", en: "Use „File → Make a copy“ to create your own copy of the template." },
    "l2.s1.step3": { de: "Öffne Google Drive und lege – falls noch nicht vorhanden – in deinem Schuljahres-Ordner einen Ordner mit dem genauen Namen „iPad-Führerschein“ an.", en: "Open Google Drive and, if you don't have one yet, create a folder named exactly „iPad-Führerschein“ inside your school-year folder." },
    "l2.s1.step4": { de: "Verschiebe deine Kopie in den Ordner „iPad-Führerschein“.", en: "Move your copy into the „iPad-Führerschein“ folder." },
    "l2.s1.step5": { de: "Benenne die Datei genau nach diesem Schema um: „Nachname_Vorname_Station2.1“.", en: "Rename the file exactly using this scheme: „Surname_Firstname_Station2.1“." },
    "l2.s1.chk1": { de: "Ich habe die Vorlage aus Classroom geöffnet und eine Kopie erstellt.", en: "I opened the template from Classroom and made a copy." },
    "l2.s1.chk2": { de: "Ich habe im Schuljahres-Ordner einen Ordner „iPad-Führerschein“ angelegt oder gefunden.", en: "I created or found an „iPad-Führerschein“ folder in my school-year folder." },
    "l2.s1.chk3": { de: "Ich habe meine Kopie in den Ordner „iPad-Führerschein“ verschoben.", en: "I moved my copy into the „iPad-Führerschein“ folder." },
    "l2.s1.chk4": { de: "Ich habe die Datei genau nach dem Schema „Nachname_Vorname_Station2.1“ umbenannt.", en: "I renamed the file exactly using the „Surname_Firstname_Station2.1“ scheme." },
    "l2.video.title": { de: "🎬 Erklärvideo", en: "🎬 Explainer video" },
    "l2.video.note": { de: "Tippe auf das Video, um es in Google Drive anzusehen.", en: "Tap the video to watch it in Google Drive." },
    "l2.s1.docTitle": { de: "📄 Google Doc aus Classroom kopieren & abgeben", en: "📄 Copy a Google Doc from Classroom & submit it" },
    "l2.s1.docIntro": { de: "Oft ist es knifflig, ein Google Doc aus Classroom zu kopieren, um selbst hineinzutippen. So geht's:", en: "Copying a Google Doc from Classroom so you can type in it is often tricky. Here's how:" },
    "l2.s1.docStep1": { de: "Öffne das Google Doc in der Classroom-Aufgabe.", en: "Open the Google Doc in the Classroom assignment." },
    "l2.s1.docStep2": { de: "Lade es herunter bzw. erstelle über „Datei → Kopie erstellen“ deine eigene Kopie.", en: "Download it, or use „File → Make a copy“ to create your own copy." },
    "l2.s1.docStep3": { de: "Tippe in deiner Kopie den vorgegebenen Text mit der Tastatur ein.", en: "Type the given text into your copy using the keyboard." },
    "l2.s1.docStep4": { de: "Lade deine Kopie in Classroom hoch und gib die Aufgabe ab.", en: "Upload your copy to Classroom and turn in the assignment." },
    "l2.s1.docGivenLabel": { de: "Diesen Text sollst du eintippen:", en: "Type in this text:" },
    "l2.s1.docGiven": { de: "„Ich lerne mit dem iPad, wie ich ein Dokument aus Google Classroom kopiere, bearbeite und wieder abgebe.“", en: "„With the iPad I'm learning how to copy a document from Google Classroom, edit it and turn it back in.“" },
    "l2.s1.docChk1": { de: "Ich habe das Doc geöffnet und eine eigene Kopie erstellt.", en: "I opened the Doc and made my own copy." },
    "l2.s1.docChk2": { de: "Ich habe den vorgegebenen Text mit der Tastatur eingetippt.", en: "I typed the given text with the keyboard." },
    "l2.s1.docChk3": { de: "Ich habe meine Kopie in Classroom hochgeladen und abgegeben.", en: "I uploaded my copy to Classroom and turned it in." },
    "btn.next.2_2": { de: "Weiter zu Station 2.2", en: "Continue to Station 2.2" },

    "l2.s2.h2": { de: "Station 2.2 – Digitale Hefterführung mit GoodNotes", en: "Station 2.2 – Digital note-keeping with GoodNotes" },
    "l2.s2.goal": {
      de: "🎯 Lernziel: Ordner und Notizbücher anlegen, die wichtigsten Werkzeuge sicher nutzen, PDFs importieren und exportieren.",
      en: "🎯 Objective: Create folders and notebooks, use the key tools confidently, import and export PDFs.",
    },
    "l2.s2.pdfTitle": { de: "📄 GoodNotes-Tutorial (PDF)", en: "📄 GoodNotes tutorial (PDF)" },
    "l2.s2.pdfDesc": {
      de: "Schau dir das Tutorial an, bevor du loslegst – es zeigt dir die wichtigsten Grundfunktionen von GoodNotes.",
      en: "Look through the tutorial before you start – it shows you the key basic functions of GoodNotes.",
    },
    "l2.s2.pdfBtn": { de: "Tutorial-PDF öffnen", en: "Open tutorial PDF" },
    "l2.s2.homeVideosTitle": { de: "🎬 Zusätzliche Erklärvideos (freiwillig, für zuhause)", en: "🎬 Extra tutorial videos (optional, for home)" },
    "l2.s2.homeVideosDesc": {
      de: "Brauchst du noch mehr Hilfe? Diese beiden Videos erklären GoodNotes Schritt für Schritt – du musst sie dir nicht in der Schule ansehen.",
      en: "Need more help? These two videos explain GoodNotes step by step – you don't have to watch them at school.",
    },
    "l2.s2.videoEn": { de: "🇬🇧 Beginner's Guide to GoodNotes (Englisch)", en: "🇬🇧 Beginner's Guide to GoodNotes (English)" },
    "l2.s2.videoDe": { de: "🇩🇪 GoodNotes-Grundfunktionen im Überblick (Deutsch)", en: "🇩🇪 GoodNotes basics overview (German)" },
    "l2.s2.step1": { de: "Lege in GoodNotes einen neuen Ordner für dein Fach an.", en: "Create a new folder for your subject in GoodNotes." },
    "l2.s2.step2": { de: "Erstelle darin ein neues Notizbuch und gib ihm einen eindeutigen Namen.", en: "Create a new notebook inside it and give it a clear name." },
    "l2.s2.step3": { de: "Importiere das PDF-Arbeitsblatt aus Classroom in dein Notizbuch.", en: "Import the PDF worksheet from Classroom into your notebook." },
    "l2.s2.step4": { de: "Bearbeite es mit Stift, Textwerkzeug, Textmarker und dem Lasso-Werkzeug zum Verschieben.", en: "Work on it with the pen, text tool, highlighter and the lasso tool for moving things." },
    "l2.s2.step5": { de: "Exportiere die fertige Seite als PDF und gib sie in Classroom ab.", en: "Export the finished page as a PDF and submit it in Classroom." },
    "l2.s2.chk1": { de: "Ich habe einen Ordner und ein Notizbuch angelegt und benannt.", en: "I created and named a folder and a notebook." },
    "l2.s2.chk2": { de: "Ich habe ein PDF importiert.", en: "I imported a PDF." },
    "l2.s2.chk3": { de: "Ich habe Stift, Textwerkzeug, Textmarker und Lasso ausprobiert.", en: "I tried the pen, text tool, highlighter and lasso." },
    "l2.s2.chk4": { de: "Ich habe meine Seite als PDF exportiert und abgegeben.", en: "I exported my page as a PDF and submitted it." },
    "l2.s2.tasksTitle": { de: "✅ Deine Aufgaben", en: "✅ Your tasks" },
    "l2.level.basic": { de: "Basis", en: "Basic" },
    "l2.level.adv": { de: "Fortgeschritten", en: "Advanced" },
    "l2.level.pro": { de: "PROFI · Bonus", en: "PRO · Bonus" },
    "l2.s2.taskBasic1": { de: "Lade das PDF-Arbeitsblatt aus Google Classroom herunter und importiere es in dein GoodNotes-Notizbuch.", en: "Download the PDF worksheet from Google Classroom and import it into your GoodNotes notebook." },
    "l2.s2.taskBasic2": { de: "Füge am Ende des Notizbuchs eine eigene neue Seite hinzu.", en: "Add your own new page at the end of the notebook." },
    "l2.s2.taskAdv1": { de: "Schreibe auf deiner neuen Seite einen kurzen Text (Textwerkzeug oder Handschrift).", en: "Write a short text on your new page (text tool or handwriting)." },
    "l2.s2.taskAdv2": { de: "Bearbeite den Text farblich – hebe wichtige Wörter mit dem Marker hervor.", en: "Colour your text – highlight important words with the marker." },
    "l2.s2.taskPro": { de: "Gestalte eine übersichtliche Zusammenfassungs-Seite mit Überschrift, einer kleinen Skizze und drei farbig markierten Kernbegriffen – und exportiere sie als PDF nach Classroom.", en: "Design a clear summary page with a heading, a small sketch and three colour-highlighted key terms – and export it as a PDF to Classroom." },
    "l2.s2.uploadNote": {
      de: "📤 Nicht vergessen: Exportiere dein bearbeitetes GoodNotes-Dokument als PDF und lade es wieder in die passende Aufgabe in Google Classroom hoch.",
      en: "📤 Don't forget: export your edited GoodNotes document as a PDF and upload it back to the matching assignment in Google Classroom.",
    },
    "l2.s2.matchTitle": { de: "✏️ Werkzeuge zuordnen", en: "✏️ Match the tools" },
    "l2.s2.matchTask": {
      de: "Ordne jedes Werkzeug-Symbol seiner Funktion zu. Tippe zuerst auf ein Symbol, dann auf die passende Funktion.",
      en: "Match each tool symbol to its function. First tap a symbol, then the matching function.",
    },
    "btn.next.2_3": { de: "Weiter zu Station 2.3", en: "Continue to Station 2.3" },

    "l2.s3.h2": { de: "Station 2.3 – Textverarbeitung mit Google Docs", en: "Station 2.3 – Word processing with Google Docs" },
    "l2.s3.goal": {
      de: "🎯 Lernziel: Texte formatieren, Bilder und Tabellen einfügen, die Diktierfunktion nutzen und im Splitscreen recherchieren.",
      en: "🎯 Objective: Format text, insert images and tables, use dictation and research in split screen.",
    },
    "l2.s3.aiSortTitle": { de: "🤖 KI oder keine KI?", en: "🤖 AI or not?" },
    "l2.s3.aiSortTask": {
      de: "Ordne jedes Beispiel ein: Steckt hier Künstliche Intelligenz dahinter oder nicht?",
      en: "Sort each example: is there artificial intelligence behind it or not?",
    },
    "l2.s3.aiInfoTitle": { de: "💡 Wusstest du?", en: "💡 Did you know?" },
    "l2.s3.aiInfoBody": {
      de: "Prüfe KI-Ergebnisse immer kritisch – vergleiche sie mit einer zweiten Quelle. Und denk dran: KI-Systeme verbrauchen für ihre Berechnungen Strom und manchmal auch Wasser in Rechenzentren.",
      en: "Always check AI results critically – compare them with a second source. And remember: AI systems use electricity, and sometimes water, in data centres to do their calculations.",
    },
    "l2.s3.transitionTitle": { de: "↩️ Weiter geht's in Google Docs", en: "↩️ Back to Google Docs" },
    "l2.s3.transitionBody": {
      de: "Das Thema KI wird jetzt zu deiner Recherche-Aufgabe: Du schreibst in deinem Doc über eine echte KI-Anwendung.",
      en: "AI now becomes your research topic: you'll write about a real AI application in your Doc.",
    },
    "l2.s3.rallyTitle": { de: "📝 Recherche-Aufgabe: KI im Alltag", en: "📝 Research task: AI in everyday life" },
    "l2.s3.rallyIntro": { de: "Formatierungsrallye – durchlaufe diese vier Stationen in deinem Doc:", en: "Formatting rally – work through these four stations in your Doc:" },
    "l2.s3.chk1": { de: "🔍 Ich habe im Splitscreen mit Chrome eine echte KI-Anwendung recherchiert (z. B. Übersetzer, Sprachassistent, Bild-KI).", en: "🔍 I researched a real AI application in split screen with Chrome (e.g. translator, voice assistant, image AI)." },
    "l2.s3.chk2": { de: "📊 Ich habe eine Tabelle mit Vorteilen und Nachteilen der KI eingefügt.", en: "📊 I inserted a table with the pros and cons of the AI." },
    "l2.s3.chk3": { de: "🖼️ Ich habe ein passendes Bild eingefügt.", en: "🖼️ I inserted a suitable image." },
    "l2.s3.chk4": { de: "🎙️ Ich habe ein Fazit mit meiner eigenen Meinung diktiert und den Text formatiert (Überschriften, Fett).", en: "🎙️ I dictated a conclusion with my own opinion and formatted the text (headings, bold)." },
    "l2.s3.uploadNote": {
      de: "📤 Nicht vergessen: Lade dein bearbeitetes Doc jetzt wieder in die passende Aufgabe in Google Classroom hoch.",
      en: "📤 Don't forget: upload your edited Doc back to the matching assignment in Google Classroom now.",
    },
    "l2.s3.aiReflectTitle": { de: "🧠 KI-Reflexion", en: "🧠 AI reflection" },
    "l2.s3.aiChk1": {
      de: "Ich habe überlegt, wofür KI bei meiner Aufgabe sinnvoll sein könnte (z. B. Ideen sammeln) und wofür nicht (z. B. den ganzen Text schreiben lassen).",
      en: "I considered what AI could be useful for in my task (e.g. gathering ideas) and what it shouldn't be used for (e.g. writing the whole text).",
    },
    "l2.s3.aiChk2": {
      de: "Ich habe meinen Text mit eigenen Worten geschrieben und würde kennzeichnen, falls ich KI-Hilfe genutzt hätte.",
      en: "I wrote my text in my own words and would mark it clearly if I had used AI help.",
    },
    "l2.s3.orderTitle": { de: "🔢 Richtige Reihenfolge", en: "🔢 Correct order" },
    "l2.s3.orderTask": {
      de: "Bring die Arbeitsschritte für dein KI-Dokument mit den Pfeilen in die richtige Reihenfolge und prüfe dein Ergebnis.",
      en: "Use the arrows to put the steps for your AI document in the right order, then check your result.",
    },
    "l2.s3.checkOrder": { de: "Reihenfolge prüfen", en: "Check order" },
    "l2.finish": { de: "Level 2 abschließen", en: "Finish Level 2" },
    "l2.done.h1": { de: "Level 2 abgeschlossen!", en: "Level 2 completed!" },
    "l2.done.text": {
      de: "Super gemacht! Dein iPad ist jetzt dein digitaler Schulranzen – du beherrschst Drive, GoodNotes und Docs.",
      en: "Great job! Your iPad is now your digital school bag – you've mastered Drive, GoodNotes and Docs.",
    },
    "l2.next": { de: "Weiter zu Level 3 🔴", en: "Continue to Level 3 🔴" },
    "l2.restart": { de: "Level 2 erneut starten", en: "Restart Level 2" },

    /* ---------- Level 3 ---------- */
    "l3.start.h1": { de: "🔴 Level 3: Advanced", en: "🔴 Level 3: Advanced" },
    "l3.start.intro": {
      de: "Präsentation, Kollaboration & Medienkompetenz: Du verbindest die Bedienung von Google Workspace mit Präsentations- und Reflexionsfähigkeiten.",
      en: "Presentation, collaboration & media literacy: You combine using Google Workspace with presentation and reflection skills.",
    },
    "l3.ov.1": { de: "Präsentationen mit Google Slides & Vivi", en: "Presentations with Google Slides & Vivi" },
    "l3.ov.2": { de: "Kollaboration in Google Workspace", en: "Collaboration in Google Workspace" },
    "l3.ov.3": { de: "Kommunikation & Medienkompetenz", en: "Communication & media literacy" },

    "l3.s1.h2": { de: "Station 3.1 – Präsentationen mit Google Slides & Vivi", en: "Station 3.1 – Presentations with Google Slides & Vivi" },
    "l3.s1.goal": {
      de: "🎯 Lernziel: Eine Präsentation anlegen, Folienlayouts anpassen, Medien einbauen und den Bildschirm sicher über Vivi projizieren.",
      en: "🎯 Objective: Create a presentation, adjust slide layouts, add media and project your screen confidently via Vivi.",
    },
    "l3.s1.step1": { de: "Lege in Google Slides eine neue Präsentation an und gib ihr einen Titel.", en: "Create a new presentation in Google Slides and give it a title." },
    "l3.s1.step2": { de: "Wähle für jede Folie ein passendes Layout aus.", en: "Choose a suitable layout for each slide." },
    "l3.s1.step3": { de: "Füge Bilder oder andere Medien ein, die zu deinem Thema passen.", en: "Add images or other media that fit your topic." },
    "l3.s1.step4": { de: "Öffne die Vivi-App und verbinde dich mit dem Beamer im Klassenraum.", en: "Open the Vivi app and connect to the projector in the classroom." },
    "l3.s1.step5": { de: "Projiziere deine Präsentation und übe deinen Vortrag.", en: "Project your presentation and rehearse your talk." },
    "l3.s1.viviInfoTitle": { de: "🔐 So funktioniert der Vivi-Login", en: "🔐 How the Vivi login works" },
    "l3.s1.viviInfoBody": {
      de: "Melde dich bei Vivi zuerst mit deiner Google-Schul-ID an. Eine Lehrkraft muss dich danach im Klassenraum freischalten – erst dann kannst du dich mit dem Beamer verbinden.",
      en: "First sign in to Vivi with your Google school ID. A teacher then has to unlock you in the classroom – only after that can you connect to the projector.",
    },
    "l3.s1.chk1": { de: "Ich habe eine Präsentation mit passenden Folienlayouts angelegt.", en: "I created a presentation with suitable slide layouts." },
    "l3.s1.chk2": { de: "Ich habe Medien (Bilder o. Ä.) eingebaut.", en: "I added media (images etc.)." },
    "l3.s1.chk3": { de: "Ich habe meinen Bildschirm über Vivi erfolgreich verbunden.", en: "I connected my screen via Vivi successfully." },
    "l3.s1.pechaTitle": { de: "🎤 Pecha-Kucha-Mini-Pitch", en: "🎤 Pecha Kucha mini pitch" },
    "l3.s1.pechaTask": {
      de: "Erstelle eine Präsentation über ein Hobby mit <strong>genau 3 Folien</strong>. Du hast dafür <strong>60 Sekunden</strong> Zeit. Übe deinen Vortrag mit dem Timer, bevor du ihn vor der Klasse hältst.",
      en: "Create a presentation about a hobby with <strong>exactly 3 slides</strong>. You have <strong>60 seconds</strong>. Rehearse your talk with the timer before presenting to the class.",
    },
    "l3.s1.timerStart": { de: "Start", en: "Start" },
    "l3.s1.chkTimer": { de: "Ich habe meinen 60-Sekunden-Vortrag mit dem Timer geübt.", en: "I rehearsed my 60-second talk with the timer." },
    "btn.next.3_2": { de: "Weiter zu Station 3.2", en: "Continue to Station 3.2" },

    "l3.s2.h2": { de: "Station 3.2 – Kollaboration in Google Workspace", en: "Station 3.2 – Collaboration in Google Workspace" },
    "l3.s2.goal": {
      de: "🎯 Lernziel: Dokumente teilen, zeitgleich bearbeiten und die Kommentar-/Vorschlagsfunktion konstruktiv nutzen.",
      en: "🎯 Objective: Share documents, edit at the same time and use comments/suggestions constructively.",
    },
    "l3.s2.findPartners": {
      de: "👥 Suche dir 1–2 Mitschüler:innen, mit denen du die Kollaboration in dieser Station gemeinsam ausprobierst.",
      en: "👥 Find 1–2 classmates to try out the collaboration features in this station together.",
    },
    "l3.s2.step1": { de: "Öffne dein Dokument in Google Drive und tippe rechts oben auf „Teilen“.", en: "Open your document in Google Drive and tap „Share“ in the top-right corner." },
    "l3.s2.step2": { de: "Lade deine Gruppenmitglieder per E-Mail oder Link ein und vergib Bearbeitungsrechte.", en: "Invite your group members by email or link and give them edit access." },
    "l3.s2.step3": { de: "Arbeitet gleichzeitig im selben Dokument – die Änderungen erscheinen live.", en: "Work in the same document at the same time – changes appear live." },
    "l3.s2.step4": { de: "Nutzt die Kommentarfunktion, um euch gegenseitig konstruktives Feedback zu geben.", en: "Use comments to give each other constructive feedback." },
    "l3.s2.chk1": { de: "Ich habe ein Dokument geteilt oder wurde in eines eingeladen.", en: "I shared a document or was invited to one." },
    "l3.s2.chk2": { de: "Ich habe zeitgleich mit anderen im selben Dokument gearbeitet.", en: "I worked in the same document at the same time as others." },
    "l3.s2.chk3": { de: "Ich habe die Kommentarfunktion genutzt.", en: "I used the comment function." },
    "l3.s2.puzzleTitle": { de: "📖 Gruppenpuzzle", en: "📖 Group jigsaw" },
    "l3.s2.puzzleTask": {
      de: "Schreibt zu viert gemeinsam eine Geschichte in einem geteilten Dokument – jede Person in einer eigenen Textfarbe. Lest die Abschnitte der anderen und hinterlasst euch gegenseitig hilfreiche Kommentare.",
      en: "In groups of four, write a story together in a shared document – each person in their own text colour. Read each other's sections and leave helpful comments.",
    },
    "l3.s2.classifyTitle": { de: "💬 Konstruktiv oder nicht?", en: "💬 Constructive or not?" },
    "l3.s2.classifyTask": {
      de: "Lies die folgenden Beispiel-Kommentare. Entscheide jeweils, ob sie konstruktiv sind.",
      en: "Read the example comments below. Decide whether each one is constructive.",
    },
    "l3.s2.aiNote": {
      de: "🤖 Einer der Kommentare stammt von einem KI-Schreibassistenten. Findest du heraus, welcher – und ob er trotzdem hilfreich ist?",
      en: "🤖 One of the comments comes from an AI writing assistant. Can you spot which one – and whether it's still helpful?",
    },
    "btn.next.3_3": { de: "Weiter zu Station 3.3", en: "Continue to Station 3.3" },

    "l3.s3.h2": { de: "Station 3.3 – Kommunikation & Medienkompetenz", en: "Station 3.3 – Communication & media literacy" },
    "l3.s3.goal": {
      de: "🎯 Lernziel: E-Mail-Etikette in Gmail beherrschen, Fake News erkennen und Phishing verstehen.",
      en: "🎯 Objective: Master email etiquette in Gmail, spot fake news and understand phishing.",
    },
    "l3.s3.mailIntro": { de: "Anleitung: Formelle Krankmeldung in Gmail verfassen. Eine formelle E-Mail braucht:", en: "Guide: Write a formal sick note in Gmail. A formal email needs:" },
    "l3.s3.chk1": { de: "Eine aussagekräftige Betreffzeile", en: "A meaningful subject line" },
    "l3.s3.chk2": { de: "Eine höfliche Anrede (z. B. „Sehr geehrte Frau …“)", en: "A polite salutation (e.g. „Dear Ms …“)" },
    "l3.s3.chk3": { de: "Den Grund kurz und sachlich genannt", en: "The reason stated briefly and factually" },
    "l3.s3.chk4": { de: "Eine passende Grußformel und deinen vollen Namen", en: "A suitable sign-off and your full name" },
    "l3.s3.mailTask": {
      de: "Verfasse jetzt in Gmail eine formell korrekte, fiktive Krankmeldung an eine Lehrkraft und hake danach ab, was du berücksichtigt hast.",
      en: "Now write a formally correct, fictional sick note to a teacher in Gmail, then tick off what you included.",
    },
    "l3.s3.phishTitle": { de: "🎣 Phishing erkennen", en: "🎣 Spot the phishing" },
    "l3.s3.phishTask": {
      de: "Tippe in den folgenden Beispiel-E-Mails auf die Textstellen, die dir verdächtig vorkommen.",
      en: "In the example emails below, tap the parts that look suspicious to you.",
    },
    "l3.s3.aiScamTitle": { de: "🤖 KI kann auch für Betrug genutzt werden", en: "🤖 AI can be used for scams too" },
    "l3.s3.aiScamBody": {
      de: "Mit KI lassen sich täuschend echte gefälschte Fotos, Videos oder sogar Stimmen erzeugen („Deepfakes“). Betrüger nutzen das, um sich z. B. als Familienmitglieder oder Vorgesetzte auszugeben. Sei besonders misstrauisch bei dringenden Geldforderungen oder ungewöhnlichen Bitten – auch wenn Stimme oder Bild vertraut wirken.",
      en: "AI can create deceptively realistic fake photos, videos or even voices („deepfakes“). Scammers use this to pretend to be, for example, family members or supervisors. Be especially suspicious of urgent money requests or unusual asks – even if the voice or image seems familiar.",
    },
    "l3.finish": { de: "Level 3 abschließen", en: "Finish Level 3" },
    "l3.done.h1": { de: "Level 3 abgeschlossen!", en: "Level 3 completed!" },
    "l3.done.text": {
      de: "Stark! Du kannst jetzt präsentieren, zusammenarbeiten und dich sicher und kritisch im Netz bewegen.",
      en: "Great! You can now present, collaborate and move around the internet safely and critically.",
    },
    "l3.next": { de: "Weiter zur Abschlussprüfung 🏆", en: "Continue to the final exam 🏆" },
    "l3.restart": { de: "Level 3 erneut starten", en: "Restart Level 3" },

    /* ---------- Exam ---------- */
    "ex.start.h1": { de: "🏆 Der iPad-Führerschein-Test", en: "🏆 The iPad Licence Test" },
    "ex.start.intro": {
      de: "Jetzt zeigst du, dass du die einzelnen Arbeitsschritte zu einem echten schulischen Workflow verbinden kannst. Diese Prüfung führst du direkt auf deinem iPad durch – diese Seite begleitet dich als Leitfaden mit einer Fortschritts-Checkliste für die vier Schritte.",
      en: "Now you show that you can combine the individual steps into a real school workflow. You take this exam directly on your iPad – this page guides you with a progress checklist for the four steps.",
    },
    "ex.ov.1": { de: "Workflow & GoodNotes", en: "Workflow & GoodNotes" },
    "ex.ov.2": { de: "Bearbeitung & Multitasking", en: "Editing & multitasking" },
    "ex.ov.3": { de: "Export & Abgabe", en: "Export & submission" },
    "ex.ov.4": { de: "Abschluss-Mail", en: "Closing email" },
    "ex.start.btn": { de: "Prüfung starten", en: "Start exam" },
    "ex.steps.h2": { de: "Prüfungsschritte", en: "Exam steps" },
    "ex.steps.intro": { de: "Hake jeden Schritt ab, sobald du ihn auf deinem iPad erledigt hast.", en: "Tick off each step once you've done it on your iPad." },
    "ex.steps.driveTitle": { de: "📄 Die Vorlage für die Prüfung", en: "📄 The exam template" },
    "ex.steps.driveDesc": {
      de: "Öffne die Vorlage in Google Drive, speichere sie in deinem richtigen Ordner und importiere sie in dein GoodNotes-Notizbuch „Prüfung“.",
      en: "Open the template in Google Drive, save it in your correct folder and import it into your GoodNotes notebook „Exam“.",
    },
    "ex.steps.driveBtn": { de: "Vorlage in Drive öffnen", en: "Open template in Drive" },
    "ex.step1": {
      de: "<strong>1. Workflow &amp; GoodNotes:</strong> Öffne die Vorlage aus der Classroom-Prüfungsaufgabe, speichere sie im richtigen Drive-Ordner und importiere sie in dein GoodNotes-Notizbuch „Prüfung“.",
      en: "<strong>1. Workflow &amp; GoodNotes:</strong> Open the template from the Classroom exam assignment, save it in the right Drive folder and import it into your GoodNotes notebook „Exam“.",
    },
    "ex.step2": {
      de: "<strong>2. Bearbeitung &amp; Multitasking:</strong> Fülle das Arbeitsblatt in GoodNotes aus. Recherchiere dafür im Splitscreen in Chrome und füge ein Lösungsbild in GoodNotes ein.",
      en: "<strong>2. Editing &amp; multitasking:</strong> Fill in the worksheet in GoodNotes. Research in split screen with Chrome and insert a solution image into GoodNotes.",
    },
    "ex.step3": {
      de: "<strong>3. Export &amp; Abgabe:</strong> Exportiere das fertige Blatt aus GoodNotes als PDF und gib es in der Classroom-Prüfungsaufgabe ab.",
      en: "<strong>3. Export &amp; submission:</strong> Export the finished sheet from GoodNotes as a PDF and submit it in the Classroom exam assignment.",
    },
    "ex.step4": {
      de: "<strong>4. Abschluss-Mail:</strong> Verfasse eine formell korrekte E-Mail an deine Prüfungslehrkraft, die über den Abschluss der Prüfung und den Upload informiert.",
      en: "<strong>4. Closing email:</strong> Write a formally correct email to your examining teacher informing them that the exam is finished and uploaded.",
    },
    "ex.toCert": { de: "Weiter zum Zertifikat", en: "Continue to certificate" },
    "ex.form.h2": { de: "🎓 Dein Zertifikat", en: "🎓 Your certificate" },
    "ex.form.intro": {
      de: "Du hast alle vier Prüfungsschritte erledigt. Prüfe deinen Namen und deine Klasse, um dein Zertifikat zu erstellen.",
      en: "You've completed all four exam steps. Check your name and class to create your certificate.",
    },
    "ex.form.nameLabel": { de: "Dein Name", en: "Your name" },
    "ex.form.namePh": { de: "Vor- und Nachname", en: "First and last name" },
    "ex.form.classLabel": { de: "Deine Klasse", en: "Your class" },
    "ex.form.classPh": { de: "z. B. 7A", en: "e.g. 7A" },
    "ex.form.dateLabel": { de: "Datum", en: "Date" },
    "ex.form.create": { de: "Zertifikat erstellen", en: "Create certificate" },
    "ex.cert.h1": { de: "🎉 Du hast den iPad-Führerschein bestanden!", en: "🎉 You passed the iPad Licence!" },
    "ex.cert.text": {
      de: "Herzlichen Glückwunsch! Dein Zertifikat ist fertig. Du kannst es jetzt ausdrucken oder als PDF speichern.",
      en: "Congratulations! Your certificate is ready. You can now print it or save it as a PDF.",
    },
    "ex.cert.uploadNote": {
      de: "📤 Wichtig: Speichere das Zertifikat als PDF (über „Drucken“ → „In Dateien / PDF sichern“) und lade es anschließend in die passende Aufgabe in Google Classroom hoch, damit deine Lehrkraft deinen bestandenen iPad-Führerschein sieht.",
      en: "📤 Important: Save the certificate as a PDF (via „Print“ → „Save to Files / PDF“) and then upload it to the matching assignment in Google Classroom so your teacher can see your passed iPad Licence.",
    },
    "ex.cert.title": { de: "iPad-Führerschein", en: "iPad Licence" },
    "ex.cert.body1": { de: "Hiermit wird bestätigt, dass", en: "This certifies that" },
    "ex.cert.body2": { de: "den iPad-Führerschein erfolgreich bestanden hat.", en: "has successfully passed the iPad Licence." },
    "ex.cert.classPrefix": { de: "Klasse", en: "Class" },
    "ex.cert.sign": { de: "Klassenleitung", en: "Class teacher" },
    "ex.print": { de: "🖨️ Drucken / Als PDF speichern", en: "🖨️ Print / Save as PDF" },

    /* ---------- Impressum & Datenschutz (impressum.html) ---------- */
    "imp.h1": { de: "Impressum & Datenschutzerklärung", en: "Imprint & Privacy Policy" },
    "imp.publisherTitle": { de: "Herausgeber", en: "Publisher" },
    "imp.publisherBody": {
      de: "Sebastian Ghofranifar<br>E-Mail: <a href=\"mailto:sghofranifar@gsis.edu.hk\">sghofranifar@gsis.edu.hk</a><br>German Swiss International School (GSIS)",
      en: "Sebastian Ghofranifar<br>Email: <a href=\"mailto:sghofranifar@gsis.edu.hk\">sghofranifar@gsis.edu.hk</a><br>German Swiss International School (GSIS)",
    },
    "imp.licenseTitle": { de: "Lizenz", en: "License" },
    "imp.licenseBody": {
      de: "Die Inhalte dieser Website stehen, sofern nicht anders gekennzeichnet, unter der Lizenz <a href=\"https://creativecommons.org/licenses/by-nc/4.0/deed.de\" target=\"_blank\" rel=\"noopener\">Creative Commons Namensnennung – Nicht-kommerziell 4.0 International (CC BY-NC 4.0)</a>. Das bedeutet: Teilen und Anpassen ist unter Namensnennung und zu nicht-kommerziellen Zwecken erlaubt.",
      en: "Unless otherwise noted, the content of this site is licensed under <a href=\"https://creativecommons.org/licenses/by-nc/4.0/\" target=\"_blank\" rel=\"noopener\">Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)</a>. This means: sharing and adapting is allowed with attribution and for non-commercial purposes only.",
    },
    "imp.privacyTitle": { de: "Datenschutzerklärung", en: "Data Privacy Policy" },
    "imp.privacyIntro": {
      de: "Diese Web-App läuft vollständig lokal in deinem Browser. Es gibt keinen Server, an den Daten übertragen werden – nichts von dem, was du hier eingibst, verlässt dein Gerät.",
      en: "This web app runs entirely in your browser. There is no server that any data is sent to – nothing you enter here ever leaves your device.",
    },
    "imp.privacyPoint1": {
      de: "<strong>Name und Klasse:</strong> Werden ausschließlich lokal im Browser deines iPads gespeichert (sogenannter „localStorage“), damit sie auf dem Abschlusszertifikat erscheinen können. Sie werden nicht an einen Server, die Schule oder Dritte übertragen oder dort gespeichert.",
      en: "<strong>Name and class:</strong> Stored only locally in your iPad's browser (so-called „localStorage“) so they can appear on the final certificate. They are never transmitted to or stored on a server, by the school, or by any third party.",
    },
    "imp.privacyPoint2": {
      de: "<strong>Fortschritt & Antworten:</strong> Ebenfalls nur lokal im Browser gespeichert, damit du dort weitermachen kannst, wo du aufgehört hast. Diese Daten werden nicht erhoben, ausgewertet oder an Lehrkräfte übermittelt.",
      en: "<strong>Progress & answers:</strong> Also stored only locally in your browser, so you can pick up where you left off. This data is not collected, analysed, or transmitted to teachers.",
    },
    "imp.privacyPoint3": {
      de: "<strong>Löschen:</strong> Du kannst alle gespeicherten Daten jederzeit selbst löschen, indem du die Website-Daten/den Browserverlauf für diese Seite in den Safari-/Chrome-Einstellungen löschst.",
      en: "<strong>Deletion:</strong> You can delete all stored data yourself at any time by clearing the site data/browsing history for this page in your Safari/Chrome settings.",
    },
    "imp.privacyPoint4": {
      de: "<strong>Keine Cookies, kein Tracking:</strong> Es werden keine Analyse- oder Werbe-Cookies gesetzt und kein Nutzungsverhalten an Dritte übermittelt.",
      en: "<strong>No cookies, no tracking:</strong> No analytics or advertising cookies are set, and no usage behaviour is transmitted to third parties.",
    },
    "imp.privacyPoint5": {
      de: "<strong>Zertifikat-PDF:</strong> Wird lokal auf deinem Gerät erzeugt. Das Hochladen in Google Classroom erfolgt bewusst durch dich selbst, nicht automatisch.",
      en: "<strong>Certificate PDF:</strong> Generated locally on your device. Uploading it to Google Classroom is something you do deliberately yourself, not automatically.",
    },
    "imp.backToHub": { de: "← Zurück zum Hauptmenü", en: "← Back to main menu" },

    /* ---------- Datenschutz-Pop-up (index.html, einmalig) ---------- */
    "popup.privacyTitle": { de: "🔒 Kurz zum Datenschutz", en: "🔒 A quick word on privacy" },
    "popup.privacyBody": {
      de: "Diese App speichert Name, Klasse und deinen Fortschritt nur lokal auf diesem iPad/Browser – nichts wird an einen Server, die Schule oder Dritte übertragen oder dort gespeichert.",
      en: "This app stores your name, class and progress only locally on this iPad/browser – nothing is transmitted to or stored on a server, by the school, or by any third party.",
    },
    "popup.privacyLinkText": { de: "Ausführliche Datenschutzerklärung", en: "Full privacy policy" },
    "popup.privacyAck": { de: "Verstanden", en: "Got it" },
  };

  var I18N = {
    lang: localStorage.getItem(LANG_KEY) === "en" ? "en" : "de",
    dict: dict,

    L: function (obj) {
      if (obj == null) return "";
      if (typeof obj === "string") return obj;
      return obj[this.lang] != null ? obj[this.lang] : obj.de || "";
    },

    t: function (key, vars) {
      var e = this.dict[key];
      var s = e ? this.L(e) : key;
      if (vars) {
        for (var k in vars) {
          s = s.split("{" + k + "}").join(vars[k]);
        }
      }
      return s;
    },

    applyStatic: function (root) {
      root = root || document;
      root.querySelectorAll("[data-i18n]").forEach(function (el) {
        var e = dict[el.getAttribute("data-i18n")];
        if (e) el.textContent = I18N.L(e);
      });
      root.querySelectorAll("[data-i18n-html]").forEach(function (el) {
        var e = dict[el.getAttribute("data-i18n-html")];
        if (e) el.innerHTML = I18N.L(e);
      });
      root.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
        var e = dict[el.getAttribute("data-i18n-ph")];
        if (e) el.setAttribute("placeholder", I18N.L(e));
      });
    },

    updateToggle: function () {
      var b = document.getElementById("langToggle");
      if (b) {
        b.textContent = this.lang === "de" ? "EN" : "DE";
        b.setAttribute("aria-label", this.lang === "de" ? "Switch to English" : "Auf Deutsch umschalten");
      }
    },

    setLang: function (lang) {
      this.lang = lang === "en" ? "en" : "de";
      localStorage.setItem(LANG_KEY, this.lang);
      document.documentElement.lang = this.lang;
      this.applyStatic();
      this.updateToggle();
      document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: this.lang } }));
    },

    toggle: function () {
      this.setLang(this.lang === "de" ? "en" : "de");
    },
  };

  window.I18N = I18N;

  document.addEventListener("DOMContentLoaded", function () {
    document.documentElement.lang = I18N.lang;
    I18N.applyStatic();
    I18N.updateToggle();
    var b = document.getElementById("langToggle");
    if (b) b.addEventListener("click", function () { I18N.toggle(); });
  });
})();
