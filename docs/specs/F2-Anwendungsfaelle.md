# F2 – Anwendungsfälle

## Übersicht der Use Cases

Die folgende Tabelle gibt einen Überblick über alle für Food-Mood definierten Anwendungsfälle. Jeder Use Case besitzt eine eindeutige ID und ist mit seiner ausführlichen Beschreibung verknüpft.

| ID | Use Case |
|---|---|
| [UC-01](#uc-01--standort-automatisch-bestimmen) | Standort automatisch bestimmen |
| [UC-02](#uc-02--standort-manuell-eingeben) | Standort manuell eingeben |
| [UC-03](#uc-03--stimmung-auswählen) | Stimmung auswählen |
| [UC-04](#uc-04--anlass-auswählen) | Anlass auswählen |
| [UC-05](#uc-05--filter-setzen) | Filter setzen |
| [UC-06](#uc-06--empfehlungen-berechnen) | Empfehlungen berechnen |
| [UC-07](#uc-07--ergebnisse-anzeigen) | Ergebnisse anzeigen |
| [UC-08](#uc-08--restaurantdetails-anzeigen) | Restaurantdetails anzeigen |
| [UC-09](#uc-09--restaurant-favorisieren) | Restaurant favorisieren |
| [UC-10](#uc-10--restaurant-als-besucht-markieren) | Restaurant als besucht markieren |
| [UC-11](#uc-11--eigene-bewertung-abgeben) | Eigene Bewertung abgeben |
| [UC-12](#uc-12--favoriten-anzeigen) | Favoriten anzeigen |
| [UC-13](#uc-13--besuchte-restaurants-anzeigen) | Besuchte Restaurants anzeigen |
| [UC-14](#uc-14--api-fehler-behandeln) | API-Fehler behandeln |

---

---

## Use-Case-Diagramm – Gesamtübersicht

Das folgende Diagramm zeigt die wichtigsten Anwendungsfälle des Food-Mood-MVPs und deren Beziehungen zum Nutzer.

```mermaid
flowchart LR

    Nutzer["Nutzer"]

    subgraph FoodMood["Food-Mood"]
        
        UC00(["UC-00 Nutzer initialisieren"])
        
        UC01(["UC-01 Standort automatisch bestimmen"])
        UC02(["UC-02 Standort manuell eingeben"])
        
        UC03(["UC-03 Stimmung auswählen"])
        UC04(["UC-04 Anlass auswählen"])
        UC05(["UC-05 Filter setzen"])
        
        UC06(["UC-06 Empfehlungen berechnen"])
        UC07(["UC-07 Ergebnisse anzeigen"])
        UC08(["UC-08 Restaurantdetails anzeigen"])
        
        UC09(["UC-09 Restaurant favorisieren"])
        UC10(["UC-10 Restaurant als besucht markieren"])
        UC11(["UC-11 Eigene Bewertung abgeben"])
        
        UC12(["UC-12 Favoriten anzeigen"])
        UC13(["UC-13 Besuchte Restaurants anzeigen"])
        
        UC14(["UC-14 API-Fehler behandeln"])
    end

    Nutzer --> UC00
    Nutzer --> UC01
    Nutzer --> UC02
    Nutzer --> UC03
    Nutzer --> UC04
    Nutzer --> UC05
    Nutzer --> UC07
    Nutzer --> UC08
    Nutzer --> UC09
    Nutzer --> UC10
    Nutzer --> UC11
    Nutzer --> UC12
    Nutzer --> UC13

    UC01 -. Standort .-> UC06
    UC02 -. Standort .-> UC06
    UC03 -. Suchkriterium .-> UC06
    UC04 -. Suchkriterium .-> UC06
    UC05 -. Suchkriterium .-> UC06

    UC06 --> UC07
    UC07 --> UC08

    UC08 --> UC09
    UC08 --> UC10
    UC10 --> UC11

    UC12 --> UC08
    UC13 --> UC08
 
    
    UC06 -.-> UC14
    ```

# Ausführliche Use Cases

## UC-01 – Standort automatisch bestimmen

**Ziel:**  
Den aktuellen Standort des Benutzers automatisch ermitteln, um ihn für die Restaurantsuche zu verwenden.

**Akteur:**  
Benutzer

**Auslöser:**  
Der Benutzer startet eine Restaurantsuche und erlaubt die Standortbestimmung.

**Vorbedingungen:**

- Die Anwendung ist geöffnet.
- Das Gerät unterstützt die Standortbestimmung.
- Der Benutzer erteilt die erforderliche Standortfreigabe.

**Hauptablauf:**

1. Der Benutzer startet die Restaurantsuche.
2. Food-Mood fragt nach der Standortfreigabe.
3. Der Benutzer erteilt die Freigabe.
4. Food-Mood ermittelt den aktuellen Standort.
5. Der Standort wird für die weitere Restaurantsuche verwendet.

**Alternativablauf:**

- Der Benutzer verweigert die Standortfreigabe.
- Food-Mood bietet die manuelle Eingabe eines Standorts an.

**Fehlerfälle:**

- Der Standort kann technisch nicht ermittelt werden.
- Die Standortdaten sind nicht verfügbar.

**Ergebnis:**  
Ein gültiger Standort steht für die Restaurantsuche zur Verfügung.

**Akzeptanzkriterien:**

- Der Benutzer kann die Standortfreigabe erteilen.
- Bei erfolgreicher Freigabe wird der aktuelle Standort ermittelt.
- Bei fehlender Standortfreigabe kann ein Standort manuell eingegeben werden.

---

## UC-02 – Standort manuell eingeben

**Ziel:**  
Einen Standort manuell festlegen, wenn keine automatische Standortbestimmung verwendet werden kann.

**Akteur:**  
Benutzer

**Auslöser:**  
Der Benutzer entscheidet sich für die manuelle Standortangabe.

**Vorbedingungen:**

- Die Anwendung ist geöffnet.
- Die manuelle Standorteingabe ist verfügbar.

**Hauptablauf:**

1. Der Benutzer öffnet die manuelle Standorteingabe.
2. Der Benutzer gibt einen Ort oder eine Adresse ein.
3. Food-Mood prüft die Eingabe.
4. Der Standort wird übernommen.
5. Der Standort wird für die Restaurantsuche verwendet.

**Alternativablauf:**

- Der Benutzer ändert seine Eingabe und gibt einen anderen Standort ein.

**Fehlerfälle:**

- Der eingegebene Standort kann nicht erkannt werden.
- Die Eingabe ist leer oder ungültig.

**Ergebnis:**  
Ein gültiger manueller Standort steht für die Restaurantsuche zur Verfügung.

**Akzeptanzkriterien:**

- Ein Standort kann manuell eingegeben werden.
- Ungültige Eingaben werden erkannt.
- Ein gültiger Standort kann für die Suche verwendet werden.

---

## UC-03 – Stimmung auswählen

**Ziel:**  
Die gewünschte Stimmung für die Restaurantempfehlung festlegen.

**Akteur:**  
Benutzer

**Auslöser:**  
Der Benutzer möchte seine gewünschte Stimmung angeben.

**Vorbedingungen:**

- Die Restaurantsuche wurde gestartet.
- Die Stimmungsauswahl ist verfügbar.

**Hauptablauf:**

1. Food-Mood zeigt verfügbare Stimmungen an.
2. Der Benutzer wählt eine Stimmung aus.
3. Food-Mood übernimmt die Auswahl.
4. Die ausgewählte Stimmung wird für die Empfehlung berücksichtigt.

**Alternativablauf:**

- Der Benutzer ändert die ausgewählte Stimmung.

**Fehlerfälle:**

- Es kann keine gültige Stimmung ausgewählt werden.

**Ergebnis:**  
Eine Stimmung wurde für die Restaurantsuche festgelegt.

**Akzeptanzkriterien:**

- Verfügbare Stimmungen werden angezeigt.
- Der Benutzer kann eine Stimmung auswählen.
- Die Auswahl wird für die Empfehlung berücksichtigt.

---

## UC-04 – Anlass auswählen

**Ziel:**  
Den Anlass für den Restaurantbesuch festlegen.

**Akteur:**  
Benutzer

**Auslöser:**  
Der Benutzer möchte einen Anlass angeben.

**Vorbedingungen:**

- Die Restaurantsuche wurde gestartet.
- Die Anlassauswahl ist verfügbar.

**Hauptablauf:**

1. Food-Mood zeigt verfügbare Anlässe an.
2. Der Benutzer wählt einen Anlass aus.
3. Food-Mood übernimmt die Auswahl.
4. Der Anlass wird für die Empfehlung berücksichtigt.

**Alternativablauf:**

- Der Benutzer ändert den ausgewählten Anlass.
- Der Benutzer verwendet keinen bestimmten Anlass.

**Fehlerfälle:**

- Es kann kein gültiger Anlass ausgewählt werden.

**Ergebnis:**  
Der gewünschte Anlass steht für die Empfehlungsermittlung zur Verfügung.

**Akzeptanzkriterien:**

- Verfügbare Anlässe werden angezeigt.
- Ein Anlass kann ausgewählt werden.
- Die Auswahl wird für die Empfehlung berücksichtigt.

---

## UC-05 – Filter setzen

**Ziel:**  
Die Restaurantsuche durch zusätzliche Kriterien einschränken.

**Akteur:**  
Benutzer

**Auslöser:**  
Der Benutzer möchte die Suchergebnisse einschränken.

**Vorbedingungen:**

- Ein gültiger Standort ist vorhanden.
- Die Filterschnittstelle ist verfügbar.

**Hauptablauf:**

1. Food-Mood zeigt verfügbare Filter an.
2. Der Benutzer wählt gewünschte Filter aus.
3. Food-Mood übernimmt die Filter.
4. Die Filter werden bei der Empfehlungsermittlung berücksichtigt.

**Alternativablauf:**

- Der Benutzer entfernt einen gesetzten Filter.
- Der Benutzer verwendet keine zusätzlichen Filter.

**Fehlerfälle:**

- Eine Filterkombination ist ungültig oder liefert keine Ergebnisse.

**Ergebnis:**  
Die gewünschten Suchfilter sind für die Restaurantsuche festgelegt.

**Akzeptanzkriterien:**

- Verfügbare Filter werden angezeigt.
- Filter können gesetzt und entfernt werden.
- Die gesetzten Filter beeinflussen die Ergebnisse.

---

## UC-06 – Empfehlungen berechnen

**Ziel:**  
Auf Grundlage der verfügbaren Standort-, Stimmungs-, Anlass- und Filterdaten passende Restaurants ermitteln.

**Akteur:**  
Food-Mood-Anwendung

**Auslöser:**  
Der Benutzer startet die Suche nach Restaurantempfehlungen.

**Vorbedingungen:**

- Ein gültiger Standort ist vorhanden.
- Die gewünschten Suchkriterien wurden übernommen.

**Hauptablauf:**

1. Food-Mood sammelt die vorhandenen Suchkriterien.
2. Food-Mood fordert passende Restaurantdaten an.
3. Die erhaltenen Restaurants werden geprüft.
4. Die Restaurants werden anhand der Suchkriterien bewertet.
5. Die Ergebnisse werden sortiert.
6. Die Empfehlungsliste wird erstellt.

**Alternativablauf:**

- Wenn keine zusätzlichen Filter gesetzt wurden, erfolgt die Berechnung nur anhand der verfügbaren Kriterien.

**Fehlerfälle:**

- Der externe Dienst liefert keine Daten.
- Es können keine passenden Restaurants ermittelt werden.

**Ergebnis:**  
Eine sortierte Liste von Restaurantempfehlungen wurde erstellt.

**Akzeptanzkriterien:**

- Die vorhandenen Suchkriterien werden berücksichtigt.
- Restaurantdaten werden verarbeitet.
- Die Ergebnisse werden bewertet und sortiert.
- Eine Empfehlungsliste wird erstellt.

---

## UC-07 – Ergebnisse anzeigen

**Ziel:**  
Die ermittelten Restaurantempfehlungen übersichtlich anzeigen.

**Akteur:**  
Benutzer

**Auslöser:**  
Eine Empfehlungsliste wurde erfolgreich erstellt.

**Vorbedingungen:**

- Empfehlungen wurden berechnet.

**Hauptablauf:**

1. Food-Mood erhält die berechnete Empfehlungsliste.
2. Die Restaurants werden in einer Liste angezeigt.
3. Relevante Informationen werden dargestellt.
4. Der Benutzer kann ein Restaurant auswählen.

**Alternativablauf:**

- Der Benutzer startet eine neue Suche mit anderen Kriterien.

**Fehlerfälle:**

- Es wurden keine Restaurants gefunden.
- Die Ergebnisse können nicht geladen werden.

**Ergebnis:**  
Der Benutzer kann die verfügbaren Empfehlungen ansehen.

**Akzeptanzkriterien:**

- Die Ergebnisse werden übersichtlich angezeigt.
- Relevante Restaurantinformationen sind sichtbar.
- Ein Restaurant kann ausgewählt werden.

---

## UC-08 – Restaurantdetails anzeigen

**Ziel:**  
Weitere Informationen zu einem ausgewählten Restaurant anzeigen.

**Akteur:**  
Benutzer

**Auslöser:**  
Der Benutzer wählt ein Restaurant aus der Empfehlungsliste aus.

**Vorbedingungen:**

- Eine Restaurantempfehlung ist vorhanden.

**Hauptablauf:**

1. Der Benutzer wählt ein Restaurant aus.
2. Food-Mood öffnet die Detailansicht.
3. Die verfügbaren Restaurantinformationen werden angezeigt.

**Alternativablauf:**

- Der Benutzer kehrt zur Empfehlungsliste zurück.

**Fehlerfälle:**

- Restaurantdaten sind nicht vollständig verfügbar.

**Ergebnis:**  
Der Benutzer kann die verfügbaren Details des Restaurants einsehen.

**Akzeptanzkriterien:**

- Eine Detailansicht ist verfügbar.
- Die verfügbaren Restaurantinformationen werden angezeigt.
- Der Benutzer kann zur Empfehlungsliste zurückkehren.

---

## UC-09 – Restaurant favorisieren

**Ziel:**  
Ein Restaurant als Favorit speichern.

**Akteur:**  
Benutzer

**Auslöser:**  
Der Benutzer möchte ein Restaurant später wiederfinden.

**Vorbedingungen:**

- Ein Restaurant wurde ausgewählt.

**Hauptablauf:**

1. Der Benutzer öffnet die Restaurantdetails.
2. Der Benutzer wählt die Favoritenfunktion.
3. Food-Mood speichert das Restaurant als Favorit.

**Alternativablauf:**

- Ein bereits gespeichertes Restaurant wird wieder aus den Favoriten entfernt.

**Fehlerfälle:**

- Das Restaurant kann nicht gespeichert werden.

**Ergebnis:**  
Das Restaurant ist als Favorit gespeichert.

**Akzeptanzkriterien:**

- Ein Restaurant kann als Favorit gespeichert werden.
- Ein Favorit kann wieder entfernt werden.
- Gespeicherte Favoriten sind über UC-12 erreichbar.

---

## UC-10 – Restaurant als besucht markieren

**Ziel:**  
Ein Restaurant als bereits besucht kennzeichnen.

**Akteur:**  
Benutzer

**Auslöser:**  
Der Benutzer möchte einen Restaurantbesuch speichern.

**Vorbedingungen:**

- Ein Restaurant ist ausgewählt.

**Hauptablauf:**

1. Der Benutzer öffnet die Restaurantdetails.
2. Der Benutzer wählt „Als besucht markieren“.
3. Food-Mood speichert den Besuch.
4. Das Restaurant wird als besucht gekennzeichnet.

**Alternativablauf:**

- Ein bereits besuchtes Restaurant wird erneut besucht und entsprechend aktualisiert.

**Fehlerfälle:**

- Der Besuch kann nicht gespeichert werden.

**Ergebnis:**  
Das Restaurant ist als besucht gespeichert.

**Akzeptanzkriterien:**

- Ein Restaurant kann als besucht markiert werden.
- Der gespeicherte Besuch kann in der Besuchsliste angezeigt werden.
- Ein als besucht markiertes Restaurant kann bewertet werden.

---

## UC-11 – Eigene Bewertung abgeben

**Ziel:**  
Eine persönliche Bewertung für ein bereits besuchtes Restaurant speichern.

**Akteur:**  
Benutzer

**Auslöser:**  
Der Benutzer möchte ein bereits besuchtes Restaurant bewerten.

**Vorbedingungen:**

- Das Restaurant wurde zuvor als besucht markiert.

**Hauptablauf:**

1. Der Benutzer öffnet ein bereits besuchtes Restaurant.
2. Food-Mood prüft, ob ein gespeicherter Besuch vorhanden ist.
3. Der Benutzer gibt eine Bewertung ab.
4. Food-Mood prüft die Bewertung.
5. Die Bewertung wird gespeichert.

**Alternativablauf:**

- Der Benutzer ändert eine bereits abgegebene Bewertung.

**Fehlerfälle:**

- Das Restaurant wurde noch nicht als besucht markiert.
- Die Bewertung liegt außerhalb des erlaubten Wertebereichs.

**Ergebnis:**  
Die persönliche Bewertung wurde gespeichert.

**Akzeptanzkriterien:**

- Eine Bewertung kann nur für ein besuchtes Restaurant abgegeben werden.
- Ungültige Bewertungen werden abgelehnt.
- Eine bestehende eigene Bewertung kann geändert werden.

---

## UC-12 – Favoriten anzeigen

**Ziel:**  
Die vom Benutzer gespeicherten Lieblingsrestaurants anzeigen.

**Akteur:**  
Benutzer

**Auslöser:**  
Der Benutzer öffnet seine Favoriten.

**Vorbedingungen:**

- Die Favoritenfunktion ist verfügbar.

**Hauptablauf:**

1. Der Benutzer öffnet die Favoritenübersicht.
2. Food-Mood lädt die gespeicherten Favoriten.
3. Die Favoriten werden angezeigt.
4. Der Benutzer kann ein Restaurant auswählen.

**Alternativablauf:**

- Es sind keine Favoriten vorhanden.

**Fehlerfälle:**

- Die Favoriten können nicht geladen werden.

**Ergebnis:**  
Der Benutzer sieht seine gespeicherten Favoriten.

**Akzeptanzkriterien:**

- Gespeicherte Favoriten werden angezeigt.
- Ein Favorit kann ausgewählt werden.
- Eine leere Favoritenliste wird verständlich dargestellt.

---

## UC-13 – Besuchte Restaurants anzeigen

**Ziel:**  
Eine Übersicht der bisher als besucht markierten Restaurants anzeigen.

**Akteur:**  
Benutzer

**Auslöser:**  
Der Benutzer öffnet die Übersicht der besuchten Restaurants.

**Vorbedingungen:**

- Die Funktion zum Speichern von Besuchen ist verfügbar.

**Hauptablauf:**

1. Der Benutzer öffnet die Übersicht der besuchten Restaurants.
2. Food-Mood lädt die gespeicherten Besuche.
3. Die besuchten Restaurants werden angezeigt.
4. Der Benutzer kann ein Restaurant auswählen.

**Alternativablauf:**

- Es wurden noch keine Restaurants als besucht gespeichert.

**Fehlerfälle:**

- Die Besuchsdaten können nicht geladen werden.

**Ergebnis:**  
Der Benutzer erhält eine Übersicht seiner besuchten Restaurants.

**Akzeptanzkriterien:**

- Besuchte Restaurants werden angezeigt.
- Ein Restaurant kann aus der Übersicht ausgewählt werden.
- Eine leere Liste wird verständlich dargestellt.

---

## UC-14 – API-Fehler behandeln

**Ziel:**  
Fehler bei der Kommunikation mit einem externen Restaurant-/Places-Dienst erkennen und dem Benutzer verständlich mitteilen.

**Akteur:**  
Food-Mood-Anwendung

**Auslöser:**  
Ein externer Dienst liefert einen Fehler oder ist nicht erreichbar.

**Vorbedingungen:**

- Food-Mood versucht, Daten von einem externen Dienst abzurufen.

**Hauptablauf:**

1. Food-Mood sendet eine Anfrage an den externen Dienst.
2. Der externe Dienst liefert einen Fehler oder antwortet nicht.
3. Food-Mood erkennt den Fehler.
4. Food-Mood beendet die fehlerhafte Anfrage kontrolliert.
5. Eine verständliche Fehlermeldung wird angezeigt.

**Alternativablauf:**

- Die Anfrage kann nach einer angemessenen Wartezeit erneut durchgeführt werden.

**Fehlerfälle:**

- Der externe Dienst ist dauerhaft nicht erreichbar.
- Die Antwort enthält ungültige Daten.
- Die Anfrage überschreitet das Zeitlimit.

**Ergebnis:**  
Der Benutzer wird über das Problem informiert, ohne dass die Anwendung unerwartet beendet wird.

**Akzeptanzkriterien:**

- API-Fehler werden erkannt.
- Der Benutzer erhält eine verständliche Fehlermeldung.
- Die Anwendung bleibt trotz des API-Fehlers bedienbar.
- Ein erneuter Versuch ist möglich.

---

## Gesamte Akzeptanzkriterien

- Alle wichtigen Nutzeraktionen von Food-Mood sind durch Use Cases abgedeckt.
- Jeder Use Case besitzt eine eindeutige ID.
- Jeder Use Case enthält:
  - Ziel
  - Akteur
  - Auslöser
  - Vorbedingungen
  - Hauptablauf
  - Alternativablauf
  - Fehlerfälle
  - Ergebnis
  - Akzeptanzkriterien
- Die Use Cases sind untereinander konsistent.
- Eine eigene Bewertung ist erst möglich, nachdem ein Restaurant als besucht markiert wurde.
- Die Use Cases enthalten keine Funktionen für:
  - Restaurantreservierung
  - Bezahlung
  - Benutzeranmeldung
- Jeder Use Case ist aus der Übersicht am Anfang direkt erreichbar.
- Die IDs der Use Cases sind eindeutig und fortlaufend.