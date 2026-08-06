# N1 - Nichtfunktionale Anforderungen
Diese Datei beschreibt die nichtfunktionalen Anforderungen an Food-Mood. Alle Anforderungen sind Messbar formuliert. Unklare Aussagen wie "schnell" oder "Benutzerfreundlich" werden vermieden.
## Performance

(NFA = "Nicht Funktionale Anforderung")

**NFA-1:** Empfehlungen werden unter normalen Bedingungen (stabile Internetverbindung) innerhalb von 5 Sekunden nach Bestätigung der Filter angezeigt.
**NFA-2:** Die Empfehlungsliste zeigt bei bis zu 50 Ergebnissen innerhalb von 1 Sekunde nach Erhalt der Daten alle Einträge an.

## Bedienbarkeit

**NFA-3:** Die Benutzeroberfläche ist ab einer Bildschirmbreite von 360 Pixeln vollständig nutzbar. Keine abgeschnittenen Inhalte, keine horizontalen Scrollbalken.
**NFA-4:** Wird die Standortfreigabe abgelehnt oder ist sie nicht verfügbar, kann der Nutzer den Standort manuell eingeben, ohne dass der weitere Ablauf blockiert wird.
**NFA-5:** Bei einem Fehler der externen API wird eine verständliche, allgemeinsprachliche Fehlermeldung angezeigt (kein technischer Fehlercode wie "Error 500" oder Stacktrace).

## Datenschutz

**NFA-6:** Standortdaten werden ausschließlich zur Berechnung der aktuellen Empfehlungen verarbeitet und nicht dauerhaft gespeichert.
**NFA-7:** Es werden keine personenbezogenen Kontodaten erhoben oder abgefragt, da die App ohne Benutzerkonten im Frontend auskommt.

## Zuverlässigkeit

**NFA-8:** Abgegebene Bewertungen liegen ausschließlich im Bereich von 1 bis 5 Sternen (ganzzahlig). Ungültige Werte werden bereits in der Eingabemaske verhindert.
**NFA-9:** Eine Bewertung kann ausschließlich abgegeben werden, nachdem ein Restaurant zuvor als "besucht" markiert wurde.
**NFA-10:** Favoriten und Besucht Markierungen bleiben nach einem Neustart der App erhalten.

## Akzeptanzkriterien

- Alle Anforderungen sind messbar formuliert (konkrete Zahl, Zustand oder Bedingung statt vager Aussagen).
- Die Kategorien Performance, Bedienbarkeit, Datenschutz und Zuverlässigkeit sind abgedeckt.
- Unklare, nicht prüfbare Formulierungen wie "schnell" oder "benutzerfreundlich" wurden vermieden.