# N1 - Nichtfunktionale Anforderungen

Diese Datei beschreibt die nichtfunktionalen Anforderungen an Food-Mood. Alle Anforderungen sind messbar formuliert. Unklare Aussagen wie "schnell" oder "benutzerfreundlich" werden vermieden.

(NFA = "Nicht Funktionale Anforderung")

| ID | Kategorie | Anforderung | Messkriterium |
|---|---|---|---|
| NFA-01 | Performance | Empfehlungen erscheinen nach Bestätigung der Filter | ≤ 5 Sekunden (bei stabiler Internetverbindung) |
| NFA-02 | Performance | Die Empfehlungsliste zeigt die Ergebnisse nach Erhalt der Daten an | ≤ 1 Sekunde bei bis zu 50 Einträgen |
| NFA-03 | Bedienbarkeit | Die Benutzeroberfläche ist vollständig nutzbar, ohne abgeschnittene Inhalte oder horizontales Scrollen | ab 360 px Bildschirmbreite |
| NFA-04 | Bedienbarkeit | Bei abgelehnter oder nicht verfügbarer Standortfreigabe kann der Standort manuell eingegeben werden | Ablauf wird dabei nicht blockiert |
| NFA-05 | Bedienbarkeit | Bei einem Fehler der externen API wird eine verständliche Fehlermeldung angezeigt | keine technischen Fehlercodes oder Stacktraces sichtbar |
| NFA-06 | Datenschutz | Standortdaten werden ausschließlich zur Berechnung der aktuellen Empfehlungen verarbeitet | keine dauerhafte Speicherung der Standortdaten |
| NFA-07 | Datenschutz | Es werden keine personenbezogenen Kontodaten erhoben oder abgefragt | 0 gespeicherte Kontodaten, kein Benutzerkonto im Frontend |
| NFA-08 | Zuverlässigkeit | Abgegebene Bewertungen liegen im gültigen Wertebereich | 1–5 Sterne, ganzzahlig, ungültige Werte werden bereits in der Eingabemaske verhindert |
| NFA-09 | Zuverlässigkeit | Eine Bewertung ist nur nach vorheriger Besuchs-Markierung möglich | Bewertung gesperrt, solange Restaurant nicht als "besucht" markiert ist |
| NFA-10 | Zuverlässigkeit | Favoriten- und Besucht-Markierungen bleiben erhalten | Persistenz über einen App-Neustart hinweg |

## Akzeptanzkriterien

- Alle Anforderungen sind messbar formuliert (konkrete Zahl, Zustand oder Bedingung statt vager Aussagen).
- Die Kategorien Performance, Bedienbarkeit, Datenschutz und Zuverlässigkeit sind abgedeckt.
- Unklare, nicht prüfbare Formulierungen wie "schnell" oder "benutzerfreundlich" wurden vermieden.
- Durchgängige IDs (NFA-01 bis NFA-10).