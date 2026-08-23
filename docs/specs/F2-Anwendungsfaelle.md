# F2 – Anwendungsfälle

## 1. Übersicht der Use Cases

| ID | Use Case |
|---|---|
| [UC-00](#uc-00--nutzer-initialisieren) | Nutzer initialisieren |
| [UC-01](#uc-01--bestehenden-nutzer-über-userid-laden) | Bestehenden Nutzer über UserID laden |
| [UC-02](#uc-02--nutzer-wechseln) | Nutzer wechseln |
| [UC-03](#uc-03--standort-bestimmen) | Standort bestimmen |
| [UC-04](#uc-04--stimmung-undoder-anlass-auswählen) | Stimmung und/oder Anlass auswählen |
| [UC-05](#uc-05--filter-setzen) | Filter setzen |
| [UC-06](#uc-06--empfehlungen-erhalten) | Empfehlungen erhalten |
| [UC-07](#uc-07--ergebnisse-anzeigen) | Ergebnisse anzeigen |
| [UC-08](#uc-08--restaurantdetails-ansehen) | Restaurantdetails ansehen |
| [UC-09](#uc-09--restaurant-favorisieren) | Restaurant favorisieren |
| [UC-10](#uc-10--restaurant-als-besucht-markieren) | Restaurant als besucht markieren |
| [UC-11](#uc-11--eigene-bewertung-abgeben) | Eigene Bewertung abgeben |
| [UC-12](#uc-12--favoriten-anzeigen) | Favoriten anzeigen |
| [UC-13](#uc-13--besuchte-restaurants-anzeigen) | Besuchte Restaurants anzeigen |
| [UC-14](#uc-14--api-fehler-behandeln) | API-Fehler behandeln |

---

# 2. Ausführliche Use Cases

## UC-00 – Nutzer initialisieren

| Feld | Inhalt |
|---|---|
| **ID** | UC-00 |
| **Name** | Nutzer initialisieren |
| **Akteur** | Nutzer |
| **Ziel** | Einen neuen Nutzer für die Nutzung von Food-Mood initialisieren. |
| **Vorbedingungen** | Die Food-Mood-Anwendung ist gestartet. Es existiert noch kein aktiver Nutzer. |
| **Auslöser** | Der Nutzer startet die Anwendung zum ersten Mal. |
| **Hauptszenario** | 1. Der Nutzer gibt einen Namen ein.<br>2. Food-Mood erstellt einen Nutzer.<br>3. Food-Mood erzeugt eine eindeutige UserID.<br>4. Die UserID wird dem Nutzer angezeigt.<br>5. Food-Mood startet eine Sitzung für den Nutzer. |
| **Alternativen** | Der Nutzer kann die Initialisierung abbrechen und die Anwendung verlassen. |
| **Fehlerfälle** | Der Nutzer gibt keinen gültigen Namen ein. Die Initialisierung wird abgebrochen und eine Fehlermeldung angezeigt. |
| **Ergebnis** | Ein Nutzer wurde erstellt und besitzt eine eindeutige UserID. |
| **Akzeptanzkriterien** | Eine UserID wird eindeutig erzeugt und dem Nutzer angezeigt. Eine Sitzung wird gestartet. |
| **Datenmodell** | Siehe D1/D2 |
| **Dialog** | Siehe B1 |

---

## UC-01 – Bestehenden Nutzer über UserID laden

| Feld | Inhalt |
|---|---|
| **ID** | UC-01 |
| **Name** | Bestehenden Nutzer über UserID laden |
| **Akteur** | Nutzer |
| **Ziel** | Einen bereits vorhandenen Nutzer anhand seiner UserID laden. |
| **Vorbedingungen** | Der Nutzer besitzt eine gültige UserID. |
| **Auslöser** | Der Nutzer gibt seine UserID ein. |
| **Hauptszenario** | 1. Der Nutzer gibt die UserID ein.<br>2. Food-Mood sucht den Nutzer.<br>3. Der vorhandene Nutzer wird geladen.<br>4. Vorhandene Favoriten, Besuche und Bewertungen werden geladen. |
| **Alternativen** | Der Nutzer kann zur Nutzerinitialisierung zurückkehren. |
| **Fehlerfälle** | Die UserID existiert nicht oder ist ungültig. Food-Mood zeigt eine verständliche Fehlermeldung an. |
| **Ergebnis** | Der vorhandene Nutzer und seine gespeicherten Daten sind geladen. |
| **Akzeptanzkriterien** | Eine gültige UserID lädt den zugehörigen Nutzer. Favoriten, Besuche und Bewertungen werden geladen. |
| **Datenmodell** | Siehe D1/D2 |
| **Dialog** | Siehe B1 |

---

## UC-02 – Nutzer wechseln

| Feld | Inhalt |
|---|---|
| **ID** | UC-02 |
| **Name** | Nutzer wechseln |
| **Akteur** | Nutzer |
| **Ziel** | Den aktuell aktiven Nutzer wechseln. |
| **Vorbedingungen** | Food-Mood läuft und ein Nutzer ist aktiv. |
| **Auslöser** | Der Nutzer wählt die Funktion zum Wechseln des Nutzers. |
| **Hauptszenario** | 1. Der Nutzer wählt „Nutzer wechseln“.<br>2. Die aktuelle Sitzung wird beendet.<br>3. Der Nutzer gibt eine UserID ein oder initialisiert einen neuen Nutzer.<br>4. Food-Mood lädt oder erstellt den entsprechenden Nutzer.<br>5. Eine neue Sitzung wird gestartet. |
| **Alternativen** | Der Nutzer kann den Vorgang abbrechen und mit dem aktuellen Nutzer fortfahren. |
| **Fehlerfälle** | Die eingegebene UserID ist ungültig oder nicht vorhanden. |
| **Ergebnis** | Der gewünschte Nutzer ist aktiv. |
| **Akzeptanzkriterien** | Der Nutzer kann die aktive Sitzung wechseln. Die Daten des vorherigen Nutzers werden nicht mit den Daten des neuen Nutzers vermischt. |
| **Datenmodell** | Siehe D1/D2 |
| **Dialog** | Siehe B1 |

---

## UC-03 – Standort bestimmen

| Feld | Inhalt |
|---|---|
| **ID** | UC-03 |
| **Name** | Standort bestimmen |
| **Akteur** | Nutzer |
| **Ziel** | Einen Standort für die Restaurantempfehlung festlegen. |
| **Vorbedingungen** | Die Anwendung ist gestartet. |
| **Auslöser** | Der Nutzer startet eine Restaurantsuche. |
| **Hauptszenario** | 1. Food-Mood fragt nach der Standortfreigabe.<br>2. Der Nutzer erteilt die Freigabe.<br>3. Food-Mood bestimmt den aktuellen Standort.<br>4. Der Standort wird für die Suche verwendet. |
| **Alternativen** | Der Nutzer verweigert die Standortfreigabe und gibt einen Standort manuell ein. |
| **Fehlerfälle** | Der Standort kann nicht bestimmt werden. Food-Mood fordert eine manuelle Eingabe an. |
| **Ergebnis** | Ein gültiger Standort steht für die Restaurantsuche zur Verfügung. |
| **Akzeptanzkriterien** | Die Suche funktioniert mit automatisch bestimmtem Standort. Die Suche funktioniert auch ohne Standortfreigabe über eine manuelle Eingabe. |
| **Datenmodell** | Siehe D1/D2 |
| **Dialog** | Siehe B1 |

---

## UC-04 – Stimmung und/oder Anlass auswählen

| Feld | Inhalt |
|---|---|
| **ID** | UC-04 |
| **Name** | Stimmung und/oder Anlass auswählen |
| **Akteur** | Nutzer |
| **Ziel** | Die persönlichen Wünsche für die Restaurantempfehlung festlegen. |
| **Vorbedingungen** | Ein Standort wurde bestimmt. |
| **Auslöser** | Der Nutzer öffnet die Auswahl für Stimmung und Anlass. |
| **Hauptszenario** | 1. Der Nutzer wählt eine Stimmung aus.<br>2. Der Nutzer wählt optional einen Anlass aus.<br>3. Food-Mood übernimmt die Auswahl für die Empfehlung. |
| **Alternativen** | Der Nutzer wählt nur eine Stimmung oder nur einen Anlass aus. |
| **Fehlerfälle** | Es wurde keine gültige Auswahl getroffen. Food-Mood fordert eine gültige Auswahl an. |
| **Ergebnis** | Stimmung und/oder Anlass stehen für die Empfehlung zur Verfügung. |
| **Akzeptanzkriterien** | Eine gültige Stimmung kann ausgewählt werden. Ein Anlass kann ausgewählt werden. Die Auswahl wird für die Empfehlung verwendet. |
| **Datenmodell** | Siehe D1/D2 |
| **Dialog** | Siehe B1 |

---

## UC-05 – Filter setzen

| Feld | Inhalt |
|---|---|
| **ID** | UC-05 |
| **Name** | Filter setzen |
| **Akteur** | Nutzer |
| **Ziel** | Die Restaurantauswahl anhand zusätzlicher Kriterien einschränken. |
| **Vorbedingungen** | Ein Standort wurde bestimmt. |
| **Auslöser** | Der Nutzer öffnet die Filterauswahl. |
| **Hauptszenario** | 1. Der Nutzer öffnet die Filter.<br>2. Der Nutzer wählt gewünschte Kriterien aus.<br>3. Food-Mood übernimmt die Filter.<br>4. Die Filter werden bei der Empfehlung berücksichtigt. |
| **Alternativen** | Der Nutzer setzt keine zusätzlichen Filter. |
| **Fehlerfälle** | Eine Filterkombination liefert keine Ergebnisse. Food-Mood zeigt eine entsprechende Meldung an. |
| **Ergebnis** | Die gewünschten Filter sind für die Restaurantsuche gesetzt. |
| **Akzeptanzkriterien** | Filter können ausgewählt und entfernt werden. Die gesetzten Filter beeinflussen die Ergebnisse. |
| **Datenmodell** | Siehe D1/D2 |
| **Dialog** | Siehe B1 |

---

## UC-06 – Empfehlungen erhalten

| Feld | Inhalt |
|---|---|
| **ID** | UC-06 |
| **Name** | Empfehlungen erhalten |
| **Akteur** | Nutzer |
| **Ziel** | Passende Restaurants anhand der angegebenen Kriterien erhalten. |
| **Vorbedingungen** | Standort sowie gegebenenfalls Stimmung, Anlass und Filter sind vorhanden. |
| **Auslöser** | Der Nutzer startet die Suche nach Empfehlungen. |
| **Hauptszenario** | 1. Food-Mood sammelt die Suchkriterien.<br>2. Food-Mood ruft verfügbare Restaurantdaten ab.<br>3. Die Restaurants werden anhand der Kriterien bewertet.<br>4. Die Ergebnisse werden sortiert.<br>5. Food-Mood stellt die Empfehlungen bereit. |
| **Alternativen** | Wenn keine zusätzlichen Kriterien angegeben wurden, erfolgt die Empfehlung anhand des Standorts. |
| **Fehlerfälle** | Die externe API ist nicht erreichbar oder liefert keine gültigen Daten. Siehe UC-14. |
| **Ergebnis** | Eine Liste geeigneter Restaurantempfehlungen wurde erstellt. |
| **Akzeptanzkriterien** | Die Empfehlungen berücksichtigen Standort und gesetzte Kriterien. Die Ergebnisse werden nachvollziehbar sortiert. |
| **Datenmodell** | Siehe D1/D2 |
| **Dialog** | Siehe B1 |

---

## UC-07 – Ergebnisse anzeigen

| Feld | Inhalt |
|---|---|
| **ID** | UC-07 |
| **Name** | Ergebnisse anzeigen |
| **Akteur** | Nutzer |
| **Ziel** | Die berechneten Restaurantempfehlungen übersichtlich anzeigen. |
| **Vorbedingungen** | Empfehlungen wurden erfolgreich berechnet. |
| **Auslöser** | Food-Mood stellt die Ergebnisse bereit. |
| **Hauptszenario** | 1. Food-Mood zeigt die Restaurantliste an.<br>2. Der Nutzer sieht relevante Informationen zu den Restaurants.<br>3. Der Nutzer kann ein Restaurant auswählen. |
| **Alternativen** | Der Nutzer kann die Suche mit anderen Kriterien wiederholen. |
| **Fehlerfälle** | Es wurden keine passenden Restaurants gefunden. Food-Mood zeigt eine entsprechende Meldung an. |
| **Ergebnis** | Der Nutzer erhält eine übersichtliche Liste von Restaurants. |
| **Akzeptanzkriterien** | Die Ergebnisse werden übersichtlich angezeigt. Der Nutzer kann ein Restaurant auswählen. |
| **Datenmodell** | Siehe D1/D2 |
| **Dialog** | Siehe B1 |

---

## UC-08 – Restaurantdetails ansehen

| Feld | Inhalt |
|---|---|
| **ID** | UC-08 |
| **Name** | Restaurantdetails ansehen |
| **Akteur** | Nutzer |
| **Ziel** | Detaillierte Informationen zu einem Restaurant anzeigen. |
| **Vorbedingungen** | Ein Restaurant wurde aus den Ergebnissen ausgewählt. |
| **Auslöser** | Der Nutzer wählt ein Restaurant aus. |
| **Hauptszenario** | 1. Der Nutzer wählt ein Restaurant.<br>2. Food-Mood lädt die verfügbaren Detailinformationen.<br>3. Food-Mood zeigt die Restaurantdetails an. |
| **Alternativen** | Der Nutzer kehrt zur Ergebnisliste zurück. |
| **Fehlerfälle** | Detailinformationen sind nicht verfügbar. Food-Mood zeigt die verfügbaren Informationen und weist auf fehlende Daten hin. |
| **Ergebnis** | Der Nutzer kann die verfügbaren Restaurantdetails ansehen. |
| **Akzeptanzkriterien** | Die Detailansicht zeigt die verfügbaren Informationen zum ausgewählten Restaurant. |
| **Datenmodell** | Siehe D1/D2 |
| **Dialog** | Siehe B1 |

---

## UC-09 – Restaurant favorisieren

| Feld | Inhalt |
|---|---|
| **ID** | UC-09 |
| **Name** | Restaurant favorisieren |
| **Akteur** | Nutzer |
| **Ziel** | Ein Restaurant als Favorit speichern. |
| **Vorbedingungen** | Ein Nutzer ist aktiv und ein Restaurant wurde ausgewählt. |
| **Auslöser** | Der Nutzer markiert ein Restaurant als Favorit. |
| **Hauptszenario** | 1. Der Nutzer wählt die Favoritenfunktion.<br>2. Food-Mood speichert das Restaurant als Favorit.<br>3. Food-Mood bestätigt die Speicherung. |
| **Alternativen** | Ein bereits gespeichertes Restaurant kann wieder aus den Favoriten entfernt werden. |
| **Fehlerfälle** | Der Favorit kann nicht gespeichert werden. Food-Mood zeigt eine Fehlermeldung an. |
| **Ergebnis** | Das Restaurant ist im Nutzerprofil als Favorit gespeichert. |
| **Akzeptanzkriterien** | Ein Restaurant kann gespeichert und wieder entfernt werden. Der Favorit ist dem richtigen Nutzer zugeordnet. |
| **Datenmodell** | Siehe D1/D2 |
| **Dialog** | Siehe B1 |

---

## UC-10 – Restaurant als besucht markieren

| Feld | Inhalt |
|---|---|
| **ID** | UC-10 |
| **Name** | Restaurant als besucht markieren |
| **Akteur** | Nutzer |
| **Ziel** | Einen Restaurantbesuch im Nutzerprofil speichern. |
| **Vorbedingungen** | Ein Nutzer ist aktiv und ein Restaurant ist ausgewählt. |
| **Auslöser** | Der Nutzer markiert das Restaurant als besucht. |
| **Hauptszenario** | 1. Der Nutzer wählt „Als besucht markieren“.<br>2. Food-Mood speichert den Besuch.<br>3. Der Besuch wird dem Nutzer zugeordnet. |
| **Alternativen** | Ein bereits besuchtes Restaurant bleibt als besucht gespeichert. |
| **Fehlerfälle** | Der Besuch kann nicht gespeichert werden. Food-Mood zeigt eine Fehlermeldung an. |
| **Ergebnis** | Das Restaurant ist als besucht gespeichert. |
| **Akzeptanzkriterien** | Ein Restaurant kann als besucht markiert werden. Der Besuch ist dem richtigen Nutzer zugeordnet. |
| **Datenmodell** | Siehe D1/D2 |
| **Dialog** | Siehe B1 |

---

## UC-11 – Eigene Bewertung abgeben

| Feld | Inhalt |
|---|---|
| **ID** | UC-11 |
| **Name** | Eigene Bewertung abgeben |
| **Akteur** | Nutzer |
| **Ziel** | Ein besuchtes Restaurant persönlich bewerten. |
| **Vorbedingungen** | Der Nutzer ist aktiv und das Restaurant wurde zuvor als besucht markiert. |
| **Auslöser** | Der Nutzer möchte eine eigene Bewertung abgeben. |
| **Hauptszenario** | 1. Der Nutzer öffnet ein besuchtes Restaurant.<br>2. Der Nutzer gibt eine Bewertung ab.<br>3. Food-Mood prüft die Eingabe.<br>4. Food-Mood speichert die Bewertung. |
| **Alternativen** | Der Nutzer kann die Eingabe abbrechen oder eine bereits vorhandene eigene Bewertung ändern. |
| **Fehlerfälle** | Die Bewertung ist ungültig oder kann nicht gespeichert werden. Food-Mood zeigt eine Fehlermeldung an. |
| **Ergebnis** | Die eigene Bewertung wurde gespeichert. |
| **Akzeptanzkriterien** | Eine Bewertung ist erst möglich, wenn das Restaurant als besucht markiert wurde. Die Bewertung wird dem richtigen Nutzer und Restaurant zugeordnet. |
| **Datenmodell** | Siehe D1/D2 |
| **Dialog** | Siehe B1 |

---

## UC-12 – Favoriten anzeigen

| Feld | Inhalt |
|---|---|
| **ID** | UC-12 |
| **Name** | Favoriten anzeigen |
| **Akteur** | Nutzer |
| **Ziel** | Die bisher gespeicherten Lieblingsrestaurants anzeigen. |
| **Vorbedingungen** | Ein Nutzer ist aktiv. |
| **Auslöser** | Der Nutzer öffnet seine Favoriten. |
| **Hauptszenario** | 1. Der Nutzer öffnet die Favoritenübersicht.<br>2. Food-Mood lädt die gespeicherten Favoriten.<br>3. Food-Mood zeigt die Favoriten an. |
| **Alternativen** | Es sind keine Favoriten vorhanden. |
| **Fehlerfälle** | Die Favoriten können nicht geladen werden. |
| **Ergebnis** | Die gespeicherten Favoriten werden angezeigt. |
| **Akzeptanzkriterien** | Nur die Favoriten des aktuell aktiven Nutzers werden angezeigt. |
| **Datenmodell** | Siehe D1/D2 |
| **Dialog** | Siehe B1 |

---

## UC-13 – Besuchte Restaurants anzeigen

| Feld | Inhalt |
|---|---|
| **ID** | UC-13 |
| **Name** | Besuchte Restaurants anzeigen |
| **Akteur** | Nutzer |
| **Ziel** | Die bisher besuchten Restaurants anzeigen. |
| **Vorbedingungen** | Ein Nutzer ist aktiv. |
| **Auslöser** | Der Nutzer öffnet die Übersicht der besuchten Restaurants. |
| **Hauptszenario** | 1. Der Nutzer öffnet die Besuchsübersicht.<br>2. Food-Mood lädt die gespeicherten Besuche.<br>3. Food-Mood zeigt die besuchten Restaurants an. |
| **Alternativen** | Es wurden noch keine Restaurants besucht. |
| **Fehlerfälle** | Die Besuchsdaten können nicht geladen werden. |
| **Ergebnis** | Die besuchten Restaurants werden angezeigt. |
| **Akzeptanzkriterien** | Nur Besuche des aktuell aktiven Nutzers werden angezeigt. |
| **Datenmodell** | Siehe D1/D2 |
| **Dialog** | Siehe B1 |

---

## UC-14 – API-Fehler behandeln

| Feld | Inhalt |
|---|---|
| **ID** | UC-14 |
| **Name** | API-Fehler behandeln |
| **Akteur** | Nutzer / externe Restaurant-API |
| **Ziel** | Fehler bei der Kommunikation mit einer externen API kontrolliert behandeln. |
| **Vorbedingungen** | Food-Mood benötigt Daten einer externen API. |
| **Auslöser** | Die API antwortet nicht, liefert einen Fehler oder stellt keine gültigen Daten bereit. |
| **Hauptszenario** | 1. Food-Mood stellt eine Anfrage an die externe API.<br>2. Die API liefert einen Fehler oder keine gültige Antwort.<br>3. Food-Mood erkennt den Fehler.<br>4. Food-Mood zeigt dem Nutzer eine verständliche Fehlermeldung an. |
| **Alternativen** | Der Nutzer kann die Anfrage erneut versuchen. |
| **Fehlerfälle** | Die API bleibt dauerhaft nicht erreichbar. Food-Mood informiert den Nutzer darüber, dass momentan keine Ergebnisse geladen werden können. |
| **Ergebnis** | Der Fehler wird kontrolliert behandelt und die Anwendung bleibt bedienbar. |
| **Akzeptanzkriterien** | API-Fehler führen nicht zum Absturz der Anwendung. Der Nutzer erhält eine verständliche Fehlermeldung. Ein erneuter Versuch ist möglich. |
| **Datenmodell** | Siehe D1/D2 |
| **Dialog** | Siehe B1 |

---

# 3. Besondere UserID-Flows

## Nutzer initialisieren

```text
Name eingeben
→ User erzeugen
→ UserID erzeugen
→ UserID anzeigen
→ Session starten