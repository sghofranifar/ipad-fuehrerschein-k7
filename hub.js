(function () {
  "use strict";

  const items = [
    {
      title: "🚦 Modul 00: Der Startschuss",
      desc: "Nutzungsordnung, Passwörter &amp; Classroom-Login, Aufbau des Geräts.",
      href: "modul00.html",
      doneKey: "ipadfs-modul00-complete",
    },
    {
      title: "🟢 Level 1: Basic Skills",
      desc: "Navigation, Kontrollzentrum, Alltagshelfer, erste Schritte mit Chrome.",
      href: "level1.html",
      doneKey: "ipadfs-level1-complete",
    },
    {
      title: "🟡 Level 2: Intermediate",
      desc: "Drive &amp; Classroom-Workflow, GoodNotes, Google Docs.",
      href: "level2.html",
      doneKey: "ipadfs-level2-complete",
      requires: "ipadfs-level1-complete",
    },
    {
      title: "🔴 Level 3: Advanced",
      desc: "Slides &amp; Vivi, Kollaboration, Kommunikation &amp; Medienkompetenz.",
      href: "level3.html",
      doneKey: "ipadfs-level3-complete",
      requires: "ipadfs-level2-complete",
    },
    {
      title: "🏆 Abschlussprüfung",
      desc: "Der iPad-Führerschein-Test in vier Schritten.",
      href: "exam.html",
      doneKey: "ipadfs-exam-complete",
      requires: "ipadfs-level3-complete",
    },
  ];

  const list = document.getElementById("hubList");
  let doneCount = 0;

  items.forEach((item) => {
    const prereqMet = !item.requires || localStorage.getItem(item.requires) === "1";
    const locked = !item.href || !prereqMet;
    const done = !!item.href && localStorage.getItem(item.doneKey) === "1";
    if (done) doneCount++;

    const el = document.createElement(locked ? "div" : "a");
    el.className = "hub-card" + (locked ? " hub-card--locked" : "");
    if (!locked) el.href = item.href;

    const badgeClass = locked ? "hub-badge--locked" : done ? "hub-badge--done" : "hub-badge--start";
    const badgeText = locked
      ? item.href
        ? "Gesperrt 🔒"
        : "Bald verfügbar 🔒"
      : done
      ? "✓ Abgeschlossen"
      : "Jetzt starten";

    el.innerHTML =
      `<div class="hub-card-text"><h3>${item.title}</h3><p>${item.desc}</p></div>` +
      `<div class="hub-badge ${badgeClass}">${badgeText}</div>`;

    list.appendChild(el);
  });

  document.getElementById("hubProgressLabel").textContent =
    doneCount + " von " + items.length + " Bausteinen abgeschlossen";
  document.getElementById("hubProgressFill").style.width = (doneCount / items.length) * 100 + "%";
})();
