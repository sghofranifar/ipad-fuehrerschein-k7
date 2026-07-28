(function () {
  "use strict";

  var L = function (o) { return window.I18N ? window.I18N.L(o) : o.de; };

  var items = [
    {
      title: { de: "🚦 Modul 00: Der Startschuss", en: "🚦 Module 00: Getting Started" },
      desc: {
        de: "Nutzungsordnung, Passwörter &amp; Classroom-Login, Aufbau des Geräts.",
        en: "Acceptable-use policy, passwords &amp; Classroom login, parts of the device.",
      },
      href: "modul00.html",
      doneKey: "ipadfs-modul00-complete",
    },
    {
      title: { de: "🟢 Level 1: Basic Skills", en: "🟢 Level 1: Basic Skills" },
      desc: {
        de: "Navigation, Kontrollzentrum, Alltagshelfer, erste Schritte mit Chrome.",
        en: "Navigation, Control Centre, everyday tools, first steps with Chrome.",
      },
      href: "level1.html",
      doneKey: "ipadfs-level1-complete",
    },
    {
      title: { de: "🟡 Level 2: Intermediate", en: "🟡 Level 2: Intermediate" },
      desc: {
        de: "Drive &amp; Classroom-Workflow, GoodNotes, Google Docs.",
        en: "Drive &amp; Classroom workflow, GoodNotes, Google Docs.",
      },
      href: "level2.html",
      doneKey: "ipadfs-level2-complete",
      requires: "ipadfs-level1-complete",
    },
    {
      title: { de: "🔴 Level 3: Advanced", en: "🔴 Level 3: Advanced" },
      desc: {
        de: "Slides &amp; Vivi, Kollaboration, Kommunikation &amp; Medienkompetenz.",
        en: "Slides &amp; Vivi, collaboration, communication &amp; media literacy.",
      },
      href: "level3.html",
      doneKey: "ipadfs-level3-complete",
      requires: "ipadfs-level2-complete",
    },
    {
      title: { de: "🏆 Abschlussprüfung", en: "🏆 Final Exam" },
      desc: {
        de: "Der iPad-Führerschein-Test in vier Schritten.",
        en: "The iPad Licence test in four steps.",
      },
      href: "exam.html",
      doneKey: "ipadfs-exam-complete",
      requires: "ipadfs-level3-complete",
    },
  ];

  var badges = {
    start: { de: "Jetzt starten", en: "Start now" },
    done: { de: "✓ Abgeschlossen", en: "✓ Completed" },
    locked: { de: "Gesperrt 🔒", en: "Locked 🔒" },
    soon: { de: "Bald verfügbar 🔒", en: "Coming soon 🔒" },
  };

  function renderHub() {
    var list = document.getElementById("hubList");
    list.innerHTML = "";
    var doneCount = 0;

    items.forEach(function (item) {
      var prereqMet = !item.requires || localStorage.getItem(item.requires) === "1";
      var locked = !item.href || !prereqMet;
      var done = !!item.href && localStorage.getItem(item.doneKey) === "1";
      if (done) doneCount++;

      var el = document.createElement(locked ? "div" : "a");
      el.className = "hub-card" + (locked ? " hub-card--locked" : "");
      if (!locked) el.href = item.href;

      var badgeClass, badgeObj;
      if (locked) {
        badgeClass = "hub-badge--locked";
        badgeObj = item.href ? badges.locked : badges.soon;
      } else if (done) {
        badgeClass = "hub-badge--done";
        badgeObj = badges.done;
      } else {
        badgeClass = "hub-badge--start";
        badgeObj = badges.start;
      }

      el.innerHTML =
        '<div class="hub-card-text"><h3>' + L(item.title) + "</h3><p>" + L(item.desc) + "</p></div>" +
        '<div class="hub-badge ' + badgeClass + '">' + L(badgeObj) + "</div>";

      list.appendChild(el);
    });

    var total = items.length;
    document.getElementById("hubProgressLabel").textContent = L({
      de: doneCount + " von " + total + " Bausteinen abgeschlossen",
      en: doneCount + " of " + total + " modules completed",
    });
    document.getElementById("hubProgressFill").style.width = (doneCount / total) * 100 + "%";
  }

  /* ---------- Name & Klasse ---------- */

  function initIdentity() {
    var nameInput = document.getElementById("identName");
    var classInput = document.getElementById("identClass");
    nameInput.value = localStorage.getItem("ipadfs-name") || "";
    classInput.value = localStorage.getItem("ipadfs-class") || "";
    nameInput.addEventListener("input", function () {
      localStorage.setItem("ipadfs-name", nameInput.value.trim());
    });
    classInput.addEventListener("input", function () {
      localStorage.setItem("ipadfs-class", classInput.value.trim());
    });
  }

  /* ---------- Datenschutz-Pop-up (einmalig) ---------- */

  function initPrivacyPopup() {
    var overlay = document.getElementById("privacyOverlay");
    if (!overlay) return;
    if (localStorage.getItem("ipadfs-privacy-ack") !== "1") {
      overlay.hidden = false;
    }
    document.getElementById("privacyAckBtn").addEventListener("click", function () {
      localStorage.setItem("ipadfs-privacy-ack", "1");
      overlay.hidden = true;
    });
  }

  initIdentity();
  renderHub();
  initPrivacyPopup();
  document.addEventListener("langchange", renderHub);
})();
