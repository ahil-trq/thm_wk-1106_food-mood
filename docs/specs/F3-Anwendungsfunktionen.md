# F3 – Anwendungsfunktionen

## Zweck

Dieses Dokument beschreibt die fachlichen Funktionen der Anwendung **Food-Mood**. Die Funktionen bilden die konkrete Umsetzung der in F2 beschriebenen Anwendungsfälle. F3 enthält ausschließlich wiederverwendbare fachliche Berechnungen und Verarbeitungsschritte, keine UI-Aktionen.

Jede Funktion besitzt eine eindeutige ID und beschreibt Eingabe, Verarbeitung und Ergebnis.

---

## AF-01 – Stimmung auf Restaurantmerkmale abbilden

**Zugehöriger Use Case:** UC-04

**Beschreibung:**
Ordnet einer ausgewählten Stimmung passende, gewichtete Restaurantmerkmale zu (z. B. "gemütlich" → höhere Gewichtung für ruhige Atmosphäre).

**Eingabe:**
- Stimmung

**Verarbeitung:**
- Die Stimmung wird anhand einer festen Zuordnungstabelle auf Restaurantmerkmale mit Gewichtung übersetzt.

**Ergebnis:**
- Gewichtete Restaurantmerkmale.

---

## AF-02 – Anlass auf Restaurantmerkmale abbilden

**Zugehöriger Use Case:** UC-04

**Beschreibung:**
Ordnet einem ausgewählten Anlass passende, gewichtete Restaurantmerkmale zu (z. B. "Date" → höhere Gewichtung für romantische Atmosphäre).

**Eingabe:**
- Anlass

**Verarbeitung:**
- Der Anlass wird anhand einer festen Zuordnungstabelle auf Restaurantmerkmale mit Gewichtung übersetzt.

**Ergebnis:**
- Gewichtete Restaurantmerkmale.

---

## AF-03 – Stimmung und Anlass kombinieren

**Zugehöriger Use Case:** UC-04

**Beschreibung:**
Führt die gewichteten Merkmale aus Stimmung und Anlass zu einem einheitlichen Präferenzprofil zusammen.

**Eingabe:**
- Gewichtete Merkmale aus Stimmung
- Gewichtete Merkmale aus Anlass

**Verarbeitung:**
- Die beiden Merkmalslisten werden zusammengeführt und die Gewichtungen kombiniert.

**Ergebnis:**
- Kombiniertes Präferenzprofil.

---

## AF-04 – Restaurant-Matching-Score berechnen

**Zugehöriger Use Case:** UC-06

**Beschreibung:**
Berechnet für ein Restaurant, wie gut es zum Präferenzprofil des Nutzers passt.

**Eingabe:**
- Präferenzprofil
- Restaurantmerkmale

**Verarbeitung:**
- Die Restaurantmerkmale werden mit dem Präferenzprofil verglichen und ein numerischer Matching-Score berechnet.

**Ergebnis:**
- Matching-Score.

---

## AF-05 – Restaurantfilter anwenden

**Zugehöriger Use Case:** UC-05

**Beschreibung:**
Schränkt eine Menge von Restaurants anhand der vom Nutzer gesetzten Filterkriterien ein.

**Eingabe:**
- Restaurantmenge
- Filter (Preis, Entfernung, Küche, Ernährung, Bewertung, Öffnungsstatus)

**Verarbeitung:**
- Restaurants, die nicht allen aktiven Filterkriterien entsprechen, werden aus der Menge entfernt.

**Ergebnis:**
- Gefilterte Restaurantmenge.

---

## AF-06 – Empfehlungen sortieren

**Zugehöriger Use Case:** UC-06

**Beschreibung:**
Bringt die gefilterten Restaurants anhand ihres Matching-Scores in eine Rangfolge.

**Eingabe:**
- Restaurants mit Matching-Score

**Verarbeitung:**
- Die Restaurants werden absteigend nach Matching-Score sortiert.

**Ergebnis:**
- Sortierte Empfehlungsliste.

---

## AF-07 – Nutzerzustand laden

**Zugehöriger Use Case:** UC-00, UC-01

**Beschreibung:**
Lädt zu einer UserID die gespeicherten persönlichen Daten des Nutzers.

**Eingabe:**
- UserID

**Verarbeitung:**
- Die zur UserID gespeicherten Daten werden aus dem Datenspeicher gelesen.

**Ergebnis:**
- Favoriten
- Besuche
- Bewertungen
- ggf. Präferenzen

---

## AF-08 – Restaurants von externem Dienst abrufen

**Zugehöriger Use Case:** UC-06

**Beschreibung:**
Ruft anhand des Standorts Restaurantdaten von einem externen Places-Dienst ab.

**Eingabe:**
- Standort

**Verarbeitung:**
- Eine Anfrage wird an den konfigurierten externen Dienst gesendet, die Antwort wird in das interne Restaurant-Datenformat übersetzt.

**Ergebnis:**
- Rohliste verfügbarer Restaurants.

---

## AF-09 – Favorit speichern oder entfernen

**Zugehöriger Use Case:** UC-09

**Beschreibung:**
Speichert oder entfernt die Favoriten-Markierung eines Restaurants für eine UserID.

**Eingabe:**
- UserID
- Restaurant
- Aktion (hinzufügen/entfernen)

**Verarbeitung:**
- Der Favoritenstatus wird im Datenspeicher aktualisiert.

**Ergebnis:**
- Aktualisierter Favoritenstatus.

---

## AF-10 – Besuch speichern

**Zugehöriger Use Case:** UC-10

**Beschreibung:**
Speichert einen Restaurantbesuch für eine UserID.

**Eingabe:**
- UserID
- Restaurant

**Verarbeitung:**
- Der Besuch wird im Datenspeicher gespeichert bzw. aktualisiert.

**Ergebnis:**
- Gespeicherter Besuch.

---

## AF-11 – Eigene Bewertung speichern und ändern

**Zugehöriger Use Case:** UC-11

**Beschreibung:**
Speichert oder aktualisiert die persönliche Bewertung eines besuchten Restaurants.

**Eingabe:**
- Besuchsstatus
- Bewertung
- Optionaler Kommentar

**Verarbeitung:**
- Es wird geprüft, ob das Restaurant als besucht markiert ist; anschließend wird die Bewertung gespeichert oder aktualisiert.

**Ergebnis:**
- Gespeicherte Bewertung.

**Regel:**
- Eine eigene Bewertung ist nur möglich, wenn das Restaurant zuvor als besucht markiert wurde.

---

## AF-12 – API-Fehler erkennen und klassifizieren

**Zugehöriger Use Case:** UC-14

**Beschreibung:**
Erkennt Fehler bei der Kommunikation mit einem externen Dienst und ordnet sie einer verständlichen Fehlerkategorie zu.

**Eingabe:**
- Fehlerzustand (z. B. Zeitüberschreitung, ungültige Antwort, Dienst nicht erreichbar)

**Verarbeitung:**
- Der technische Fehler wird erkannt und einer fachlichen Fehlerkategorie zugeordnet.

**Ergebnis:**
- Klassifizierter Fehler zur weiteren Verarbeitung (z. B. für die Anzeige einer Fehlermeldung).

---

# Zuordnung Funktionen zu Use Cases

| Funktion | Use Case |
|---|---|
| AF-01 Stimmung auf Restaurantmerkmale abbilden | UC-04 |
| AF-02 Anlass auf Restaurantmerkmale abbilden | UC-04 |
| AF-03 Stimmung und Anlass kombinieren | UC-04 |
| AF-04 Restaurant-Matching-Score berechnen | UC-06 |
| AF-05 Restaurantfilter anwenden | UC-05 |
| AF-06 Empfehlungen sortieren | UC-06 |
| AF-07 Nutzerzustand laden | UC-00, UC-01 |
| AF-08 Restaurants von externem Dienst abrufen | UC-06 |
| AF-09 Favorit speichern oder entfernen | UC-09 |
| AF-10 Besuch speichern | UC-10 |
| AF-11 Eigene Bewertung speichern und ändern | UC-11 |
| AF-12 API-Fehler erkennen und klassifizieren | UC-14 |

---

# Akzeptanzkriterien

- Jede Funktion besitzt eine eindeutige ID.
- Für jede Funktion sind Eingabe, Verarbeitung und Ergebnis beschrieben.
- Jede Funktion ist mindestens einem Use Case aus F2 zugeordnet.
- Alle in F2 beschriebenen Use Cases werden durch mindestens eine Funktion unterstützt.
- Die Funktionen liegen innerhalb des definierten MVP-Umfangs.
- Funktionen für Reservierung, Bezahlung oder Benutzeranmeldung sind nicht enthalten.
- Eine eigene Bewertung kann nur für ein zuvor als besucht markiertes Restaurant gespeichert werden.
- UI-Aktionen wurden entfernt.