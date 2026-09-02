# F3 – Anwendungsfunktionen

## F3.1 Zweck

Anwendungsfunktionen beschreiben wiederverwendbare fachliche Berechnungen von Food-Mood. Sie sind keine vollständigen Benutzerabläufe und enthalten keine Dialogbeschreibung. Die aufrufenden Anwendungsfälle werden in F2 dokumentiert.

## F3.2 Übersicht

| ID | Anwendungsfunktion | Zweck | Eingabe | Ausgabe | UserID-Logik |
|---|---|---|---|---|---|
| [AF-01](#af-01--durchschnittsbewertung-berechnen) | Durchschnittsbewertung berechnen | ermittelt den Bewertungsdurchschnitt und die Bewertungsanzahl eines Restaurants | Restaurant und gespeicherte Bewertungen | `averageRating` und `ratingCount` | nicht erforderlich; die Bewertung wird restaurantübergreifend aggregiert |
| [AF-02](#af-02--personalisierte-empfehlungen-ermitteln) | Personalisierte Empfehlungen ermitteln | erstellt eine nach den Suchkriterien und dem Nutzerprofil gewichtete Empfehlungsliste | `UserId` und `SearchRequest` | Liste von `Recommendation` | `UserId` lädt Favoriten, Besuche und Bewertungen des Nutzers |

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

## AF-02 – Personalisierte Empfehlungen ermitteln

### Fachlicher Zweck

AF-02 ermittelt passende Restaurants anhand der aktuellen Suchanfrage und personalisiert die Reihenfolge mit den über `UserId` zugeordneten Favoriten, Besuchen und Bewertungen. Die Funktion verwendet nur die Daten des aktiven Nutzers und gibt nachvollziehbare Gründe für die Gewichtung aus.

### Schnittstelle

| Bestandteil | Beschreibung |
|---|---|
| Eingabe | `userId: UserId` und `searchRequest: SearchRequest` mit Standort, Stimmung und/oder Anlass sowie Filtern |
| Ausgabe | sortierte `Recommendation[]` mit Restaurant, Score, Entfernung und Begründungen |
| Aufrufer | UC-06 „Empfehlungen erhalten“ |
| Fehlerfall | unbekannte oder ungültige `UserId` führt zu einer verständlichen Fehlermeldung; ohne nutzerbezogene Historie wird eine nicht personalisierte Empfehlung anhand der Suchkriterien erstellt |

### Berechnungsregeln

1. Die Funktion validiert die `UserId` und lädt ausschließlich das zugehörige Nutzerprofil.
2. Standort, Stimmung, Anlass und Filter der `SearchRequest` bestimmen die grundlegende fachliche Passung.
3. Favoriten, frühere Besuche und Bewertungen desselben Nutzers werden als zusätzliche Personalisierung berücksichtigt.
4. Bereits bewertete oder häufig besuchte Restaurants dürfen nicht ungeprüft ausgeschlossen werden; die Historie beeinflusst den Score und die Begründung nachvollziehbar.
5. Die Ergebnisse werden absteigend nach `Score` sortiert. Bei gleichem Score entscheidet die Entfernung.
6. Die verwendete `UserId` wird nicht in der sichtbaren Empfehlung ausgegeben und nicht an externe Restaurantdienste übertragen.

### Beispiele

| Nutzerprofil | Ergebnis |
|---|---|
| Keine Favoriten, Besuche oder Bewertungen | Empfehlungen basieren auf Standort, Stimmung, Anlass und Filtern. |
| Restaurant ist als Favorit gespeichert und erfüllt die Suchkriterien | Das Restaurant erhält einen Personalisierungsanteil im Score und den Grund „passt zu deinen Favoriten“. |
| Nutzer hat ein Restaurant bereits besucht und positiv bewertet | Das Restaurant kann bevorzugt werden und erhält einen entsprechenden nachvollziehbaren Match-Grund. |

### Verknüpfte Dokumente

- [D1 – Fachliches Datenmodell](D1-Datenmodell.md)
- [D2 – Datentypenverzeichnis](D2-Datentypen.md)
- [N2 – Querschnittskonzepte](N2-Querschnittskonzepte.md)
- F2 – UC-06 „Empfehlungen erhalten“

## F3.3 Akzeptanzkriterien

- Die Funktion ist unabhängig von einer bestimmten Bildschirmmaske beschrieben.
- Eingaben, Ausgaben und Berechnungsregeln sind eindeutig.
- Bei einem Restaurant ohne Bewertungen wird kein künstlicher Durchschnitt von `0` erzeugt.
- Für die Berechnung werden ausschließlich eigene Food-Mood-Bewertungen verwendet.
- Die Rundung erfolgt nur für die Anzeige.
- Jede Anwendungsfunktion besitzt eine eindeutige ID und ist in der Übersichtstabelle dokumentiert.
- `AF-02` nimmt eine gültige `UserId` als Eingabe entgegen und verwendet sie zum Laden der nutzerbezogenen Daten.
- Favoriten, Besuche und Bewertungen der `UserId` beeinflussen die personalisierte Empfehlung.
- Ohne nutzerbezogene Historie bleibt die Empfehlung anhand der aktuellen Suchkriterien funktionsfähig.
