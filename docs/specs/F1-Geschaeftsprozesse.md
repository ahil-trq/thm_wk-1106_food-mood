## F1 – Geschäftsprozesse

## Zweck

Dieses Dokument beschreibt die übergeordneten Geschäftsprozesse der Anwendung **Food-Mood**.

Geschäftsprozesse beschreiben zusammenhängende fachliche Abläufe und nicht einzelne Benutzeraktionen. Einzelne Nutzeraktionen wie die Auswahl einer Stimmung, das Setzen eines Filters oder das Speichern eines Favoriten werden daher nicht als eigene Geschäftsprozesse behandelt. Diese werden in **F2 – Anwendungsfälle** und **F3 – Anwendungsfunktionen** beschrieben.

---

## 1. GP-01 – Bereitstellung von Restaurantempfehlungen

### Ziel

Food-Mood stellt dem Benutzer auf Grundlage eines Suchstandorts, seiner gewünschten Stimmung, eines möglichen Anlasses und weiterer Suchkriterien passende Restaurantempfehlungen bereit.

### Beteiligte

- Benutzer
- Food-Mood-Anwendung
- externer Restaurant-/Places-Dienst

### Voraussetzungen

- Die Anwendung ist verfügbar.
- Für die Restaurantsuche steht ein gültiger Standort zur Verfügung.
- Der externe Restaurant-/Places-Dienst ist grundsätzlich erreichbar.

### Fachlicher Ablauf

1. Ein Benutzer startet eine Restaurantsuche.
2. Food-Mood ermittelt oder übernimmt den gewünschten Suchstandort.
3. Food-Mood übernimmt die vom Benutzer angegebenen Suchkriterien.
4. Food-Mood beschafft passende Restaurantdaten über den angebundenen externen Dienst.
5. Die verfügbaren Restaurantdaten werden verarbeitet.
6. Die Restaurants werden anhand der festgelegten Kriterien bewertet und eingeordnet.
7. Food-Mood stellt dem Benutzer die resultierenden Restaurantempfehlungen bereit.
8. Der Benutzer kann auf Grundlage der Empfehlungen ein Restaurant auswählen und weitere Informationen abrufen.

### Ergebnis

Dem Benutzer steht eine auf seine Suchkriterien abgestimmte Liste von Restaurantempfehlungen zur Verfügung.

### Alternativen und Ausnahmen

- Wenn kein automatischer Standort ermittelt werden kann, kann ein alternativer Suchstandort verwendet werden.
- Wenn keine passenden Restaurants gefunden werden, wird dem Benutzer ein entsprechender Hinweis angezeigt.
- Wenn der externe Restaurant-/Places-Dienst nicht erreichbar ist, wird der Prozess kontrolliert abgebrochen und dem Benutzer eine Fehlermeldung angezeigt.

---

## 2. GP-02 – Betrieb der Food-Mood-Plattform

### Ziel

Die Anwendung stellt ihre grundlegenden Funktionen für die Suche und Bereitstellung von Restaurantempfehlungen zuverlässig zur Verfügung.

### Beteiligte

- Food-Mood-Anwendung
- externe Dienste

### Fachlicher Ablauf

1. Die Anwendung wird bereitgestellt und gestartet.
2. Die benötigten Funktionen und Dienste werden verfügbar gemacht.
3. Eingehende Suchanfragen werden verarbeitet.
4. Externe Dienste werden bei Bedarf angesprochen.
5. Ergebnisse werden verarbeitet und an die Anwendung zurückgegeben.
6. Fehler und nicht verfügbare Dienste werden erkannt und behandelt.

### Ergebnis

Die grundlegenden Funktionen von Food-Mood stehen für die Nutzung zur Verfügung.

### Alternativen und Ausnahmen

- Bei einem Ausfall eines externen Dienstes wird eine geeignete Fehlermeldung ausgegeben.
- Bei ungültigen oder unvollständigen Daten wird die Verarbeitung entsprechend abgebrochen oder eine erneute Eingabe ermöglicht.

---

## 3. GP-03 – Beschaffung und Verarbeitung von Restaurantdaten

### Ziel

Food-Mood beschafft die für die Restaurantempfehlungen benötigten Daten und bereitet diese für die weitere Verarbeitung auf.

### Beteiligte

- Food-Mood-Anwendung
- externer Restaurant-/Places-Dienst

### Fachlicher Ablauf

1. Food-Mood erstellt auf Grundlage der Suchparameter eine Anfrage.
2. Die Anfrage wird an den externen Dienst übermittelt.
3. Der externe Dienst liefert verfügbare Restaurantdaten zurück.
4. Food-Mood verarbeitet die erhaltenen Daten.
5. Nicht benötigte oder ungültige Daten werden bei Bedarf ausgeschlossen.
6. Die aufbereiteten Daten werden für die Empfehlungsermittlung bereitgestellt.

### Ergebnis

Für die Empfehlungsermittlung stehen aufbereitete Restaurantdaten zur Verfügung.

### Alternativen und Ausnahmen

- Werden keine Daten geliefert, kann keine entsprechende Empfehlung erstellt werden.
- Bei ungültigen oder unvollständigen Daten werden diese nicht für die Empfehlung verwendet.
- Bei einem Fehler des externen Dienstes wird der Fehler an den übergeordneten Prozess zur Behandlung weitergegeben.

---

## 4. GP-04 – Pflege nutzerbezogener Restaurantinformationen

### Ziel

Food-Mood ermöglicht die Verwaltung von nutzerbezogenen Informationen zu Restaurants, beispielsweise gespeicherten Favoriten, besuchten Restaurants und eigenen Bewertungen.

### Beteiligte

- Benutzer
- Food-Mood-Anwendung

### Fachlicher Ablauf

1. Der Benutzer entscheidet sich, Informationen zu einem Restaurant zu speichern oder zu verändern.
2. Food-Mood verarbeitet die entsprechende Eingabe.
3. Die Information wird gespeichert beziehungsweise aktualisiert.
4. Die gespeicherten Informationen können später wieder bereitgestellt werden.

### Ergebnis

Nutzerbezogene Restaurantinformationen stehen für eine spätere Verwendung zur Verfügung.

### Fachliche Einschränkung

Eine eigene Bewertung kann nur für ein Restaurant abgegeben werden, das zuvor als besucht markiert wurde.

---

## Nicht als Geschäftsprozesse behandelte Einzelaktionen

Die folgenden Punkte sind keine eigenständigen Geschäftsprozesse, sondern einzelne Nutzeraktionen beziehungsweise Funktionen:

- Stimmung auswählen
- Anlass auswählen
- Filter setzen
- Restaurant auswählen
- Restaurantdetails anzeigen
- Restaurant favorisieren
- Restaurant als besucht markieren
- Eigene Bewertung abgeben
- Favoriten anzeigen
- Besuchte Restaurants anzeigen
- Standort automatisch bestimmen
- Standort manuell eingeben

Diese Inhalte werden in **F2 – Anwendungsfälle** und **F3 – Anwendungsfunktionen** detailliert beschrieben.

---

## Abgrenzung des Geschäftsprozesses

Für die aktuelle Version von Food-Mood sind folgende Geschäftsprozesse nicht Bestandteil der Anwendung:

- Restaurantreservierungen
- Bezahlung von Restaurantleistungen
- Benutzeranmeldung und Kontoverwaltung
- Bestellabwicklung
- Lieferabwicklung

Diese Funktionen gehören nicht zum definierten Funktionsumfang der aktuellen Version von Food-Mood.

---

## Aktivitätsdiagramm des zentralen Geschäftsprozesses

```mermaid
flowchart TD
    A([Start]) --> B[Restaurantsuche wird gestartet]
    B --> C[Suchstandort bereitstellen]
    C --> D[Suchkriterien übernehmen]
    D --> E[Restaurantdaten beschaffen]
    E --> F{Restaurantdaten verfügbar?}

    F -->|Ja| G[Restaurantdaten verarbeiten]
    G --> H[Empfehlungen ermitteln]
    H --> I[Empfehlungen bereitstellen]
    I --> J([Ende])

    F -->|Nein| K[Fehler oder keine Ergebnisse behandeln]
    K --> J