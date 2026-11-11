// Prüflogik aller Aufgabentypen – reine Funktionen, im Browser und in node (check.js) nutzbar.
var Pruefen = (function () {
  function norm(s) { return String(s).trim().toLowerCase().replace(/\s+/g, ' '); }
  function gleich(a, b) { return a.length === b.length && a.every(function (x, i) { return x === b[i]; }); }
  return {
    norm: norm,
    // gewaehlt: Indizes der angekreuzten Optionen
    quiz: function (a, gewaehlt) { return gleich(gewaehlt.slice().sort(), a.richtig.slice().sort()); },
    // reihe: Schritte in der Reihenfolge des Nutzers
    reihenfolge: function (a, reihe) { return gleich(reihe, a.schritte); },
    // wahl[i]: gewählte rechte Seite zu paare[i][0]
    zuordnen: function (a, wahl) { return a.paare.every(function (p, i) { return wahl[i] === p[1]; }); },
    luecke: function (a, text) { return a.antworten.some(function (x) { return norm(x) === norm(text); }); },
    // ein einzelner Terminal-Schritt
    terminal: function (schritt, eingabe) { return new RegExp(schritt.erwartet, 'i').test(eingabe.trim()); },
    // praxis + prompt: alle Haken gesetzt (prompt zusätzlich mit eigenem Text)
    checkliste: function (a, haken, text) {
      var alle = a.checkliste.every(function (_, i) { return !!haken[i]; });
      return a.typ === 'prompt' ? alle && String(text || '').trim().length >= 20 : alle;
    }
  };
})();
if (typeof module !== 'undefined') module.exports = Pruefen;
