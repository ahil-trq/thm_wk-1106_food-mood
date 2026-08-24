# F3 – Anwendungsfunktionen

## F3.1 Zweck

Anwendungsfunktionen beschreiben wiederverwendbare fachliche Berechnungen von Food-Mood. Sie sind keine vollständigen Benutzerabläufe und enthalten keine Dialogbeschreibung. Die aufrufenden Anwendungsfälle werden in F2 dokumentiert.

## F3.2 Übersicht

| ID | Anwendungsfunktion | Zweck | Verwendete Daten |
|---|---|---|---|
| [AF-01](#af-01--durchschnittsbewertung-berechnen) | Durchschnittsbewertung berechnen | ermittelt den Bewertungsdurchschnitt und die Bewertungsanzahl eines Restaurants | [`Restaurant`, `Review`, `Rating`, `AverageRating`, `RatingCount`](D1-Datenmodell.md) |

## AF-01 – Durchschnittsbewertung berechnen

### Fachlicher Zweck

AF-01 berechnet aus den eigenen Food-Mood-Bewertungen eines Restaurants den Durchschnitt und die Anzahl der Bewertungen. Externe Bewertungen von OpenStreetMap werden nicht verwendet.

### Schnittstelle

| Bestandteil | Beschreibung |
|---|---|
| Eingabe | Liste aller gespeicherten `Review.rating`-Werte für ein Restaurant |
| Ausgabe | `averageRating: AverageRating` und `ratingCount: RatingCount` |
| Aufrufer | Anwendungsfälle, die eine Ergebnisliste oder Restaurantdetails mit eigener Bewertung anzeigen |
| Fehlerfall | ungültige Bewertungswerte werden bereits beim Speichern abgewiesen und dürfen die Berechnung nicht erreichen |

### Berechnungsregeln

1. Es werden nur eigene, gültige Food-Mood-Bewertungen des ausgewählten Restaurants berücksichtigt.
2. `ratingCount` entspricht der Anzahl der berücksichtigten Bewertungen.
3. Bei `ratingCount = 0` ist `averageRating = null`. Die Oberfläche zeigt „Noch keine Bewertungen“ an.
4. Bei mindestens einer Bewertung wird das arithmetische Mittel berechnet:

   `averageRating = Summe aller Rating-Werte / ratingCount`

5. Intern bleibt der berechnete Wert unverändert. Erst für die Anzeige wird er auf eine Nachkommastelle gerundet.

### Beispiele

| Bewertungen | Ergebnis `averageRating` | Ergebnis `ratingCount` | Anzeige |
|---|---:|---:|---|
| keine | `null` | 0 | Noch keine Bewertungen |
| 5 | 5,0 | 1 | 5,0 (1 Bewertung) |
| 3, 4, 5 | 4,0 | 3 | 4,0 (3 Bewertungen) |
| 4, 4, 5 | 4,333… | 3 | 4,3 (3 Bewertungen) |

### Verknüpfte Dokumente

- [D1 – Fachliches Datenmodell](D1-Datenmodell.md)
- [D2 – Datentypenverzeichnis](D2-Datentypen.md)
- F2 – Anwendungsfälle

## F3.3 Akzeptanzkriterien

- Die Funktion ist unabhängig von einer bestimmten Bildschirmmaske beschrieben.
- Eingaben, Ausgaben und Berechnungsregeln sind eindeutig.
- Bei einem Restaurant ohne Bewertungen wird kein künstlicher Durchschnitt von `0` erzeugt.
- Für die Berechnung werden ausschließlich eigene Food-Mood-Bewertungen verwendet.
- Die Rundung erfolgt nur für die Anzeige.
