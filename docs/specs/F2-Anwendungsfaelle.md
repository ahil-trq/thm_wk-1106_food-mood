# F2 – Anwendungsfälle

## Übersicht der Use Cases

| ID | Use Case |
|---|---|
| [UC-00](#uc-00) | Nutzer initialisieren |
| [UC-01](#uc-01) | Bestehenden Nutzer über UserID laden |
| [UC-02](#uc-02) | Nutzer wechseln |
| [UC-03](#uc-03) | Standort bestimmen |
| [UC-04](#uc-04) | Stimmung und/oder Anlass auswählen |
| [UC-05](#uc-05) | Filter setzen |
| [UC-06](#uc-06) | Empfehlungen erhalten |
| [UC-07](#uc-07) | Ergebnisse anzeigen |
| [UC-08](#uc-08) | Restaurantdetails ansehen |
| [UC-09](#uc-09) | Restaurant favorisieren |
| [UC-10](#uc-10) | Restaurant als besucht markieren |
| [UC-11](#uc-11) | Eigene Bewertung abgeben |
| [UC-12](#uc-12) | Favoriten anzeigen |
| [UC-13](#uc-13) | Besuchte Restaurants anzeigen |
| [UC-14](#uc-14) | API-Fehler behandeln (Zusatz) |

---
## Use-Case-Diagramm – Gesamtübersicht

```mermaid
flowchart LR
    Nutzer[Nutzer]
    UC00[UC-00 Nutzer initialisieren]
    UC01[UC-01 Bestehenden Nutzer laden]
    UC02[UC-02 Nutzer wechseln]
    UC03[UC-03 Standort bestimmen]
    UC04[UC-04 Stimmung/Anlass auswählen]
    UC05[UC-05 Filter setzen]
    UC06[UC-06 Empfehlungen erhalten]
    UC07[UC-07 Ergebnisse anzeigen]
    UC08[UC-08 Restaurantdetails ansehen]
    UC09[UC-09 Restaurant favorisieren]
    UC10[UC-10 Restaurant als besucht markieren]
    UC11[UC-11 Eigene Bewertung abgeben]
    UC12[UC-12 Favoriten anzeigen]
    UC13[UC-13 Besuchte Restaurants anzeigen]
    UC14[UC-14 API-Fehler behandeln]
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
    UC00 --> UC03
    UC01 --> UC03
    UC02 -.-> UC00
    UC03 --> UC06
    UC04 --> UC06
    UC05 --> UC06
    UC06 --> UC07
    UC07 --> UC08
    UC08 --> UC09
    UC08 --> UC10
    UC10 --> UC11
    UC12 --> UC08
    UC13 --> UC08
    UC06 -.-> UC14
```

---

# Ausführliche Use Cases (Einheitliches Template)

## UC-00

| Feld | Inhalt |
|---|---|
| ID | UC-00 |
| Name | Nutzer initialisieren |
| Akteur | Nutzer |
| Ziel | Eine neue UserID erzeugen, damit der Nutzer ohne klassisches Login eindeutig identifizierbar ist und Favoriten, Besuche und Bewertungen später zugeordnet werden können. |
| Vorbedingungen | Die App wird geöffnet und es liegt noch keine UserID vor. |
| Auslöser | Der Nutzer öffnet Food-Mood zum ersten Mal und möchte eine neue UserID anlegen. |
| Hauptszenario | 1. Der Nutzer öffnet die Einstiegsmaske.<br>2. Der Nutzer gibt seinen Namen ein.<br>3. Der Nutzer wählt "Neue UserID erstellen".<br>4. Food-Mood generiert eine neue, eindeutige UserID.<br>5. Die UserID wird angezeigt und lokal gespeichert.<br>6. Der Nutzer gelangt zur Startseite. |
| Alternativen | Der Nutzer gibt stattdessen eine bestehende UserID ein (siehe UC-01). |
| Fehlerfälle | Der Name wird nicht eingegeben. Die UserID kann nicht erzeugt oder gespeichert werden. |
| Ergebnis | Eine neue UserID wurde erzeugt und dem Nutzer zugeordnet. |
| Akzeptanzkriterien | Eine neue UserID kann erstellt werden. Die UserID wird dem Nutzer angezeigt. Der Nutzer gelangt danach zur Startseite. |
| Datenmodell | Link D1/D2 |
| Dialog | UC-00: | Dialog | [M-00 Einstieg](B1-Dialogspezifikation.md#m-00--einstieg) |
 

---

## UC-01

| Feld | Inhalt |
|---|---|
| ID | UC-01 |
| Name | Bestehenden Nutzer über UserID laden |
| Akteur | Nutzer |
| Ziel | Mit einer bereits vorhandenen UserID das eigene Profil (Favoriten, Besuche, Bewertungen) wieder laden. |
| Vorbedingungen | Der Nutzer besitzt bereits eine gültige UserID. |
| Auslöser | Der Nutzer wählt auf der Einstiegsmaske "UserID eingeben". |
| Hauptszenario | 1. Der Nutzer öffnet die Einstiegsmaske.<br>2. Der Nutzer gibt seine bestehende UserID ein.<br>3. Food-Mood prüft die UserID.<br>4. Das zugehörige Profil wird geladen.<br>5. Der Nutzer gelangt zur Startseite. |
| Alternativen | Der Nutzer entscheidet sich stattdessen für eine neue UserID (siehe UC-00). |
| Fehlerfälle | Die eingegebene UserID ist ungültig oder unbekannt. |
| Ergebnis | Das bestehende Nutzerprofil wurde geladen. |
| Akzeptanzkriterien | Eine bestehende UserID kann eingegeben werden. Bei gültiger UserID wird das Profil geladen. Bei ungültiger UserID erscheint eine Fehlermeldung. |
| Datenmodell | Link D1/D2 |
| Dialog |  UC-01: | Dialog | [M-00 Einstieg](B1-Dialogspezifikation.md#m-00--einstieg) |

---

## UC-02

| Feld | Inhalt |
|---|---|
| ID | UC-02 |
| Name | Nutzer wechseln |
| Akteur | Nutzer |
| Ziel | Von der aktuellen UserID zu einer anderen wechseln, z. B. wenn eine andere Person dasselbe Gerät nutzt. |
| Vorbedingungen | Der Nutzer ist bereits mit einer UserID angemeldet. |
| Auslöser | Der Nutzer möchte die App mit einer anderen Identität nutzen. |
| Hauptszenario | 1. Der Nutzer kehrt zur Einstiegsmaske zurück.<br>2. Der Nutzer gibt eine andere UserID ein oder erstellt eine neue.<br>3. Food-Mood wechselt zum entsprechenden Profil. |
| Alternativen | – |
| Fehlerfälle | Die neue UserID ist ungültig. |
| Ergebnis | Die App ist mit der neuen UserID verknüpft. |
| Akzeptanzkriterien | Der Nutzer kann jederzeit zur Einstiegsmaske zurückkehren und die UserID wechseln. |
| Datenmodell | Link D1/D2 |
| Dialog | UC-02: | Dialog | [M-00 Einstieg](B1-Dialogspezifikation.md#m-00--einstieg) |

---

## UC-03

| Feld | Inhalt |
|---|---|
| ID | UC-03 |
| Name | Standort bestimmen |
| Akteur | Nutzer |
| Ziel | Einen Standort automatisch oder manuell festlegen, um passende Restaurants in der Nähe zu finden. |
| Vorbedingungen | Die App ist geöffnet, eine UserID liegt vor. |
| Auslöser | Der Nutzer startet die Restaurantsuche. |
| Hauptszenario | 1. Food-Mood fragt nach Standortfreigabe.<br>2. Der Nutzer erteilt die Freigabe.<br>3. Food-Mood ermittelt den aktuellen Standort automatisch.<br>4. Der Standort wird für die Suche verwendet. |
| Alternativen | Der Nutzer verweigert die automatische Freigabe → er gibt stattdessen Ort/Adresse manuell ein; Food-Mood prüft und übernimmt die Eingabe. |
| Fehlerfälle | Der Standort kann technisch nicht ermittelt werden. Die manuelle Eingabe ist leer oder ungültig. |
| Ergebnis | Ein gültiger Standort (automatisch oder manuell) steht für die Suche zur Verfügung. |
| Akzeptanzkriterien | Automatische und manuelle Standortbestimmung sind möglich. Am Ende steht ein gültiger Standort zur Verfügung. |
| Datenmodell | Link D1/D2 |
| Dialog | UC-03: | Dialog | [M-02 Standortfreigabe](B1-Dialogspezifikation.md#m-02--standortfreigabe)|

---

## UC-04

| Feld | Inhalt |
|---|---|
| ID | UC-04 |
| Name | Stimmung und/oder Anlass auswählen |
| Akteur | Nutzer |
| Ziel | Die gewünschte Stimmung und/oder den Anlass für die Restaurantempfehlung festlegen. |
| Vorbedingungen | Die Restaurantsuche wurde gestartet. |
| Auslöser | Der Nutzer möchte Stimmung und/oder Anlass angeben. |
| Hauptszenario | 1. Food-Mood zeigt verfügbare Stimmungen und Anlässe an.<br>2. Der Nutzer wählt eine oder mehrere Stimmungen und/oder einen Anlass aus.<br>3. Food-Mood übernimmt die Auswahl.<br>4. Die Auswahl wird für die Empfehlung berücksichtigt. |
| Alternativen | Der Nutzer ändert seine Auswahl. Der Nutzer wählt nur eine Stimmung oder nur einen Anlass. |
| Fehlerfälle | Es kann keine gültige Auswahl getroffen werden. |
| Ergebnis | Stimmung und/oder Anlass wurden für die Restaurantsuche festgelegt. |
| Akzeptanzkriterien | Verfügbare Stimmungen/Anlässe werden angezeigt. Eine Auswahl ist möglich. Die Auswahl wird für die Empfehlung berücksichtigt. |
| Datenmodell | Link D1/D2 |
| Dialog | UC-04: | Dialog | [M-03 Stimmung & Anlass](B1-Dialogspezifikation.md#m-03--stimmung--anlass) |

---

## UC-05

| Feld | Inhalt |
|---|---|
| ID | UC-05 |
| Name | Filter setzen |
| Akteur | Nutzer |
| Ziel | Die Restaurantsuche durch zusätzliche Kriterien einschränken. |
| Vorbedingungen | Ein gültiger Standort ist vorhanden. Die Filterschnittstelle ist verfügbar. |
| Auslöser | Der Benutzer möchte die Suchergebnisse einschränken. |
| Hauptszenario | 1. Food-Mood zeigt verfügbare Filter an.<br>2. Der Benutzer wählt gewünschte Filter aus.<br>3. Food-Mood übernimmt die Filter.<br>4. Die Filter werden bei der Empfehlungsermittlung berücksichtigt. |
| Alternativen | Der Benutzer entfernt einen gesetzten Filter. Der Benutzer verwendet keine zusätzlichen Filter. |
| Fehlerfälle | Eine Filterkombination ist ungültig oder liefert keine Ergebnisse. |
| Ergebnis | Die gewünschten Suchfilter sind für die Restaurantsuche festgelegt. |
| Akzeptanzkriterien | Verfügbare Filter werden angezeigt. Filter können gesetzt und entfernt werden. Die gesetzten Filter beeinflussen die Ergebnisse. |
| Datenmodell | Link D1/D2 |
| Dialog | UC-05: | Dialog | [M-04 Filterauswahl](B1-Dialogspezifikation.md#m-04--filterauswahl)|

---

## UC-06

| Feld | Inhalt |
|---|---|
| ID | UC-06 |
| Name | Empfehlungen erhalten |
| Akteur | Food-Mood-Anwendung |
| Ziel | Auf Grundlage der verfügbaren Standort-, Stimmungs-, Anlass- und Filterdaten passende Restaurants ermitteln. |
| Vorbedingungen | Ein gültiger Standort ist vorhanden. Die gewünschten Suchkriterien wurden übernommen. |
| Auslöser | Der Benutzer startet die Suche nach Restaurantempfehlungen. |
| Hauptszenario | 1. Food-Mood sammelt die vorhandenen Suchkriterien.<br>2. Food-Mood fordert passende Restaurantdaten an.<br>3. Die erhaltenen Restaurants werden geprüft.<br>4. Die Restaurants werden anhand der Suchkriterien bewertet.<br>5. Die Ergebnisse werden sortiert.<br>6. Die Empfehlungsliste wird erstellt. |
| Alternativen | Wenn keine zusätzlichen Filter gesetzt wurden, erfolgt die Berechnung nur anhand der verfügbaren Kriterien. |
| Fehlerfälle | Der externe Dienst liefert keine Daten. Es können keine passenden Restaurants ermittelt werden. → siehe UC-14. |
| Ergebnis | Eine sortierte Liste von Restaurantempfehlungen wurde erstellt. |
| Akzeptanzkriterien | Die vorhandenen Suchkriterien werden berücksichtigt. Restaurantdaten werden verarbeitet. Die Ergebnisse werden bewertet und sortiert. Eine Empfehlungsliste wird erstellt. |
| Datenmodell | Link D1/D2 |
| Dialog |  UC-06: | Dialog | [M-05 Empfehlungsliste](B1-Dialogspezifikation.md#m-05--empfehlungsliste)|

---

## UC-07

| Feld | Inhalt |
|---|---|
| ID | UC-07 |
| Name | Ergebnisse anzeigen |
| Akteur | Nutzer |
| Ziel | Die ermittelten Restaurantempfehlungen übersichtlich anzeigen. |
| Vorbedingungen | Empfehlungen wurden berechnet. |
| Auslöser | Eine Empfehlungsliste wurde erfolgreich erstellt. |
| Hauptszenario | 1. Food-Mood erhält die berechnete Empfehlungsliste.<br>2. Die Restaurants werden in einer Liste angezeigt.<br>3. Relevante Informationen werden dargestellt.<br>4. Der Benutzer kann ein Restaurant auswählen. |
| Alternativen | Der Benutzer startet eine neue Suche mit anderen Kriterien. |
| Fehlerfälle | Es wurden keine Restaurants gefunden. Die Ergebnisse können nicht geladen werden. |
| Ergebnis | Der Benutzer kann die verfügbaren Empfehlungen ansehen. |
| Akzeptanzkriterien | Die Ergebnisse werden übersichtlich angezeigt. Relevante Restaurantinformationen sind sichtbar. Ein Restaurant kann ausgewählt werden. |
| Datenmodell | Link D1/D2 |
| Dialog | UC-07: | Dialog | [M-05 Empfehlungsliste](B1-Dialogspezifikation.md#m-05--empfehlungsliste) |

---

## UC-08

| Feld | Inhalt |
|---|---|
| ID | UC-08 |
| Name | Restaurantdetails ansehen |
| Akteur | Nutzer |
| Ziel | Weitere Informationen zu einem ausgewählten Restaurant anzeigen. |
| Vorbedingungen | Eine Restaurantempfehlung ist vorhanden. |
| Auslöser | Der Benutzer wählt ein Restaurant aus der Empfehlungsliste aus. |
| Hauptszenario | 1. Der Benutzer wählt ein Restaurant aus.<br>2. Food-Mood öffnet die Detailansicht.<br>3. Die verfügbaren Restaurantinformationen werden angezeigt. |
| Alternativen | Der Benutzer kehrt zur Empfehlungsliste zurück. |
| Fehlerfälle | Restaurantdaten sind nicht vollständig verfügbar. |
| Ergebnis | Der Benutzer kann die verfügbaren Details des Restaurants einsehen. |
| Akzeptanzkriterien | Eine Detailansicht ist verfügbar. Die verfügbaren Restaurantinformationen werden angezeigt. Der Benutzer kann zur Empfehlungsliste zurückkehren. |
| Datenmodell | Link D1/D2 |
| Dialog |  UC-08: | Dialog | [M-06 Restaurantdetails](B1-Dialogspezifikation.md#m-06--restaurantdetails)|

---

## UC-09

| Feld | Inhalt |
|---|---|
| ID | UC-09 |
| Name | Restaurant favorisieren |
| Akteur | Nutzer |
| Ziel | Ein Restaurant als Favorit speichern. |
| Vorbedingungen | Ein Restaurant wurde ausgewählt. |
| Auslöser | Der Benutzer möchte ein Restaurant später wiederfinden. |
| Hauptszenario | 1. Der Benutzer öffnet die Restaurantdetails.<br>2. Der Benutzer wählt die Favoritenfunktion.<br>3. Food-Mood speichert das Restaurant als Favorit (unter der aktuellen UserID). |
| Alternativen | Ein bereits gespeichertes Restaurant wird wieder aus den Favoriten entfernt. |
| Fehlerfälle | Das Restaurant kann nicht gespeichert werden. |
| Ergebnis | Das Restaurant ist als Favorit gespeichert. |
| Akzeptanzkriterien | Ein Restaurant kann als Favorit gespeichert werden. Ein Favorit kann wieder entfernt werden. Gespeicherte Favoriten sind über UC-12 erreichbar. |
| Datenmodell | Link D1/D2 |
| Dialog |UC-09: | Dialog | [M-06 Restaurantdetails](B1-Dialogspezifikation.md#m-06--restaurantdetails) |

---

## UC-10

| Feld | Inhalt |
|---|---|
| ID | UC-10 |
| Name | Restaurant als besucht markieren |
| Akteur | Nutzer |
| Ziel | Ein Restaurant als bereits besucht kennzeichnen. |
| Vorbedingungen | Ein Restaurant ist ausgewählt. |
| Auslöser | Der Benutzer möchte einen Restaurantbesuch speichern. |
| Hauptszenario | 1. Der Benutzer öffnet die Restaurantdetails.<br>2. Der Benutzer wählt „Als besucht markieren".<br>3. Food-Mood speichert den Besuch (unter der aktuellen UserID).<br>4. Das Restaurant wird als besucht gekennzeichnet. |
| Alternativen | Ein bereits besuchtes Restaurant wird erneut besucht und entsprechend aktualisiert. |
| Fehlerfälle | Der Besuch kann nicht gespeichert werden. |
| Ergebnis | Das Restaurant ist als besucht gespeichert. |
| Akzeptanzkriterien | Ein Restaurant kann als besucht markiert werden. Der gespeicherte Besuch kann in der Besuchsliste angezeigt werden (siehe UC-13). Ein als besucht markiertes Restaurant kann bewertet werden (siehe UC-11). |
| Datenmodell | Link D1/D2 |
| Dialog | UC-10: | Dialog | [M-06 Restaurantdetails](B1-Dialogspezifikation.md#m-06--restaurantdetails) |

---

## UC-11

| Feld | Inhalt |
|---|---|
| ID | UC-11 |
| Name | Eigene Bewertung abgeben |
| Akteur | Nutzer |
| Ziel | Eine persönliche Bewertung für ein bereits besuchtes Restaurant speichern. |
| Vorbedingungen | Das Restaurant wurde zuvor als besucht markiert (siehe UC-10). |
| Auslöser | Der Benutzer möchte ein bereits besuchtes Restaurant bewerten. |
| Hauptszenario | 1. Der Benutzer öffnet ein bereits besuchtes Restaurant.<br>2. Food-Mood prüft, ob ein gespeicherter Besuch vorhanden ist.<br>3. Der Benutzer gibt eine Bewertung ab.<br>4. Food-Mood prüft die Bewertung.<br>5. Die Bewertung wird gespeichert. |
| Alternativen | Der Benutzer ändert eine bereits abgegebene Bewertung. |
| Fehlerfälle | Das Restaurant wurde noch nicht als besucht markiert. Die Bewertung liegt außerhalb des erlaubten Wertebereichs. |
| Ergebnis | Die persönliche Bewertung wurde gespeichert. |
| Akzeptanzkriterien | Eine Bewertung kann nur für ein besuchtes Restaurant abgegeben werden. Ungültige Bewertungen werden abgelehnt. Eine bestehende eigene Bewertung kann geändert werden. |
| Datenmodell | Link D1/D2 |
| Dialog | UC-11: | Dialog | [M-06 Restaurantdetails](B1-Dialogspezifikation.md#m-06--restaurantdetails) |

---

## UC-12

| Feld | Inhalt |
|---|---|
| ID | UC-12 |
| Name | Favoriten anzeigen |
| Akteur | Nutzer |
| Ziel | Die vom Benutzer gespeicherten Lieblingsrestaurants anzeigen. |
| Vorbedingungen | Die Favoritenfunktion ist verfügbar. |
| Auslöser | Der Benutzer öffnet seine Favoriten. |
| Hauptszenario | 1. Der Benutzer öffnet die Favoritenübersicht.<br>2. Food-Mood lädt die gespeicherten Favoriten (der aktuellen UserID).<br>3. Die Favoriten werden angezeigt.<br>4. Der Benutzer kann ein Restaurant auswählen. |
| Alternativen | Es sind keine Favoriten vorhanden. |
| Fehlerfälle | Die Favoriten können nicht geladen werden. |
| Ergebnis | Der Benutzer sieht seine gespeicherten Favoriten. |
| Akzeptanzkriterien | Gespeicherte Favoriten werden angezeigt. Ein Favorit kann ausgewählt werden. Eine leere Favoritenliste wird verständlich dargestellt. |
| Datenmodell | Link D1/D2 |
| Dialog |UC-12: | Dialog | [M-07 Favoriten](B1-Dialogspezifikation.md#m-07--favoriten) |

---

## UC-13

| Feld | Inhalt |
|---|---|
| ID | UC-13 |
| Name | Besuchte Restaurants anzeigen |
| Akteur | Nutzer |
| Ziel | Eine Übersicht der bisher als besucht markierten Restaurants anzeigen. |
| Vorbedingungen | Die Funktion zum Speichern von Besuchen ist verfügbar. |
| Auslöser | Der Benutzer öffnet die Übersicht der besuchten Restaurants. |
| Hauptszenario | 1. Der Benutzer öffnet die Übersicht der besuchten Restaurants.<br>2. Food-Mood lädt die gespeicherten Besuche (der aktuellen UserID).<br>3. Die besuchten Restaurants werden angezeigt.<br>4. Der Benutzer kann ein Restaurant auswählen. |
| Alternativen | Es wurden noch keine Restaurants als besucht gespeichert. |
| Fehlerfälle | Die Besuchsdaten können nicht geladen werden. |
| Ergebnis | Der Benutzer erhält eine Übersicht seiner besuchten Restaurants. |
| Akzeptanzkriterien | Besuchte Restaurants werden angezeigt. Ein Restaurant kann aus der Übersicht ausgewählt werden. Eine leere Liste wird verständlich dargestellt. |
| Datenmodell | Link D1/D2 |
| Dialog | UC-13: | Dialog | [M-07 Favoriten](B1-Dialogspezifikation.md#m-07--favoriten) |

---

## UC-14

| Feld | Inhalt |
|---|---|
| ID | UC-14 |
| Name | API-Fehler behandeln |
| Akteur | Food-Mood-Anwendung |
| Ziel | Fehler bei der Kommunikation mit einem externen Restaurant-/Places-Dienst erkennen und dem Benutzer verständlich mitteilen. |
| Vorbedingungen | Food-Mood versucht, Daten von einem externen Dienst abzurufen. |
| Auslöser | Ein externer Dienst liefert einen Fehler oder ist nicht erreichbar. |
| Hauptszenario | 1. Food-Mood sendet eine Anfrage an den externen Dienst.<br>2. Der externe Dienst liefert einen Fehler oder antwortet nicht.<br>3. Food-Mood erkennt den Fehler.<br>4. Food-Mood beendet die fehlerhafte Anfrage kontrolliert.<br>5. Eine verständliche Fehlermeldung wird angezeigt. |
| Alternativen | Die Anfrage kann nach einer angemessenen Wartezeit erneut durchgeführt werden. |
| Fehlerfälle | Der externe Dienst ist dauerhaft nicht erreichbar. Die Antwort enthält ungültige Daten. Die Anfrage überschreitet das Zeitlimit. |
| Ergebnis | Der Benutzer wird über das Problem informiert, ohne dass die Anwendung unerwartet beendet wird. |
| Akzeptanzkriterien | API-Fehler werden erkannt. Der Benutzer erhält eine verständliche Fehlermeldung. Die Anwendung bleibt trotz des API-Fehlers bedienbar. Ein erneuter Versuch ist möglich. |
| Datenmodell | Link D1/D2 |
| Dialog |  UC-14: | Dialog | [M-05 Empfehlungsliste](B1-Dialogspezifikation.md#m-05--empfehlungsliste)|

---

## Besonders berücksichtigen

Da Food-Mood laut Vorgabe *keine Benutzeranmeldung* enthält, wird eine leichtgewichtige UserID verwendet, um Favoriten, Besuche und Bewertungen (UC-09 bis UC-13) einer Person zuordnen zu können, ohne einen echten Login-Prozess einzuführen. Die Initialisierung und Verwaltung der UserID selbst ist in UC-00 bis UC-02 beschrieben.