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
      href: null,
    },
    {
      title: "🔴 Level 3: Advanced",
      desc: "Slides &amp; Vivi, Kollaboration, Kommunikation &amp; Medienkompetenz.",
      href: null,
    },
    {
      title: "🏆 Abschlussprüfung",
      desc: "Der iPad-Führerschein-Test in vier Schritten.",
      href: null,
    },
  ];

  const list = document.getElementById("hubList");
  let doneCount = 0;
  let unlockedCount = 0;

  items.forEach((item) => {
    const locked = !item.href;
    const done = !locked && localStorage.getItem(item.doneKey) === "1";
    if (!locked) {
      unlockedCount++;
      if (done) doneCount++;
    }

    const el = document.createElement(locked ? "div" : "a");
    el.className = "hub-card" + (locked ? " hub-card--locked" : "");
    if (!locked) el.href = item.href;

    const badgeClass = locked ? "hub-badge--locked" : done ? "hub-badge--done" : "hub-badge--start";
    const badgeText = locked ? "Bald verfügbar 🔒" : done ? "✓ Abgeschlossen" : "Jetzt starten";

    el.innerHTML =
      `<div class="hub-card-text"><h3>${item.title}</h3><p>${item.desc}</p></div>` +
      `<div class="hub-badge ${badgeClass}">${badgeText}</div>`;

    list.appendChild(el);
  });

  document.getElementById("hubProgressLabel").textContent =
    doneCount + " von " + unlockedCount + " Bausteinen abgeschlossen";
  document.getElementById("hubProgressFill").style.width = (doneCount / unlockedCount) * 100 + "%";
})();
