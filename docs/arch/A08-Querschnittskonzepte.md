# A08 – Querschnittskonzepte

## 8.1 UserID-Konzept (statt Login)

Bei der Initialisierung eines neuen Profils (UC-00) erzeugt Food-Mood eine zufällige, genau zwölf Zeichen lange UserID und zeigt sie dem Nutzer an. Diese UserID wird nicht im Klartext gespeichert. Vor der dauerhaften Speicherung wird sie gehasht, und nur der `UserIdHash` wird persistiert (vgl. D1, DR-14).

Möchte ein Nutzer ein bestehendes Profil laden oder wechseln (UC-01, UC-02), gibt er seine UserID erneut ein. Food-Mood wendet dasselbe Hash-Verfahren auf die Eingabe an und vergleicht den berechneten Wert mit dem gespeicherten `UserIdHash`. Stimmen beide überein, wird das zugehörige Profil geladen.

Favoriten, Besuche und Bewertungen werden nicht direkt mit der UserID, sondern jeweils über ein Fremdschlüssel-Feld `userIdHash` mit dem Nutzerprofil verknüpft (vgl. D1.3, Objekte `Favorite`, `Visit`, `Review`). Dadurch ist die Zuordnung systemweit konsistent, ohne dass die eigentliche UserID an mehreren Stellen im Klartext verarbeitet werden muss.

## 8.2 Datenschutz

Food-Mood erhebt bewusst nur die minimal notwendigen Daten. Es gibt keine E-Mail Adresse, kein Passwort und keine Registrierung (vgl. D1.8). Die einzigen dauerhaft gespeicherten personenbezogenen Daten sind der Nutzername und der `UserIdHash` (D1.4). Die eigentliche UserID selbst wird nie im Klartext gespeichert (DR-14), wodurch ein zusätzlicher Schutz besteht, falls die Datenbank kompromittiert wird.

Standortdaten (`Location`) und die komplette Suchanfrage (`SearchRequest`) werden ausschließlich für die aktuelle Suche verarbeitet und nicht dauerhaft gespeichert (D1.4). Nach DR-12 dürfen Standort- und Suchtextdaten auch nicht nachträglich in Favorit, Besuch oder Bewertung kopiert werden. So bleibt die dauerhafte Datenbasis auf das Nötigste beschränkt.

## 8.3 Fehlerbehandlung

Fehler bei der Kommunikation mit dem externen Kartendienst (OpenStreetMap/Overpass) werden zentral erkannt und klassifiziert (UC-14, siehe auch AF-12 in F3). Die Anwendung unterscheidet dabei technisch zwischen: Dienst nicht erreichbar/Zeitüberschreitung, ungültige oder unvollständige Antwortdaten, sowie serverseitigen Fehlern. In jedem Fall wird die fehlerhafte Anfrage kontrolliert beendet, ohne dass bestehende Fachdaten beschädigt werden. Laut D1.7 führt UC-14 explizit zu keiner dauerhaften Fachdatenänderung.

Ergänzend gilt nach DR-11: Trifft eine neue externe Antwort ein, dürfen dadurch nur veraltete Anzeigedaten eines Restaurants aktualisiert werden. Bestehende Favoriten, Besuche oder Bewertungen dürfen dabei nie gelöscht oder überschrieben werden. Das schützt Nutzerdaten selbst dann, wenn die externe Datenquelle inkonsistente Antworten liefert.

## 8.4 Validierung

Eingaben werden anhand der in D1 definierten fachlichen Regeln geprüft:

| Regel | Validierung |
|---|---|
| UserName (DR-15) | darf bei der Initialisierung nicht leer sein |
| UserId (DR-13) | wird intern zufällig und eindeutig erzeugt, keine manuelle Eingabe bei Neuanlage nötig |
| SearchRequest (DR-01) | erfordert genau einen gültigen `Location` und genau einen `Mood` |
| Occasion / Filter (DR-02) | optional, dürfen leer bleiben |
| Suchradius (DR-03) | nur die Werte 1 km, 3 km, 5 km oder 10 km sind zulässig |
| Rating (DR-09) | ganzzahliger Wert zwischen 1 und 5 |
| Review (DR-08) | nur zulässig, wenn mindestens ein passender `Visit` für denselben Nutzer und dasselbe Restaurant vorhanden ist |

## 8.5 Sessionverwaltung

Food-Mood verwendet keine klassische serverseitige Session mit Cookie oder Token. Stattdessen ist die lokal beim Nutzer verbleibende UserID der einzige Schlüssel, um ein Profil zu "aktivieren". Nach erfolgreichem Hash-Abgleich (siehe 8.1) gilt der Nutzer für die Dauer der App-Nutzung als aktiv, und alle Aktionen (Favorisieren, Besuch markieren, Bewerten) werden über seinen `UserIdHash` zugeordnet.

Eine laufende Suche (`SearchRequest`) ist ebenfalls nur sitzungsgebunden. Sie wird laut D1.4 nicht dauerhaft gespeichert und dient laut D1.3 ausschließlich der Verarbeitung der aktuell laufenden Sitzung. Ein Nutzerwechsel (UC-02) ersetzt lediglich die aktive UserID durch eine andere. Es gibt keinen klassischen Logout-Mechanismus.

## Diagramm: UserID-Konzept

![UserID-Konzept](diagrams-png/user-id-concept.png)

Quelldatei: `diagrams/user-id-concept.mmd`

Das Diagramm zeigt den technischen Kern des Konzepts. Die vom Nutzer gehaltene UserID wird beim Speichern/Abgleich gehasht und ausschließlich der `UserIdHash` wird dauerhaft gespeichert und dient als Fremdschlüssel, über den `Favorite`, `Visit` und `Review` dem Nutzerprofil zugeordnet werden.