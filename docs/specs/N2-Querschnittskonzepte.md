# N2 - Querschnittskonzepte
Diese Datei beschreibt kurz die wiederkehrenden Konzepte, die mehrere Ansichten und Funktionen von Food-Mood einheitlich betreffen.
## 1. Anonyme Nutzeridentifikation

Da es keine Benutzerkonten im Frontend gibt, erhält jede App-Installation im Backend automatisch eine rein technische, anonyme ID (kein Login, kein Name, keine E-Mail). Über diese ID werden Favoriten sowie Besuche/Bewertungen der jeweiligen Installation zugeordnet.
-> Abhängigkeit: D1 (Datenmodell), Objekt "Nutzer/Nutzerprofil".

## 2. Standortverarbeitung

Der Standort wird entweder automatisch (Geräte/Browser Standort) oder manuell eingegeben ermittelt und ausschließlich zur Berechnung der aktuellen Empfehlungen verwendet.
-> Abhängigkeit: D1 (Datenmodell), Objekt "Standort". F2 (Anwendungsfälle), UC-01 "Standort festlegen".

## 3. Datenschutz

Es werden keine personenbezogenen Daten (Name, E-Mail, Adresse der Person) erhoben. Standortdaten liegen nur temporär im Speicher der aktuellen Sitzung vor und werden nicht dauerhaft gespeichert. Favoriten und Bewertungen sind ausschließlich über die anonyme technische ID (siehe Punkt 1) zugeordnet, nicht über persönliche Daten.

## 4. Eingabevalidierung

Bewertungen sind ausschließlich über eine Sterne Auswahl (1–5, ganzzahlig) möglich. Filterwerte werden ausschließlich aus vordefinierten Optionen gewählt. Bei manueller Standorteingabe darf das Feld nicht leer bleiben und muss auf einen gültigen Ort auflösbar sein.

## 5. Fehlerbehandlung

App weit einheitliches Muster: verständliche, allgemeinsprachliche Fehlermeldung statt technischer Fehlercodes, wo sinnvoll ergänzt um einen "Erneut versuchen" Button.
-> Abhängigkeit: F2 (Anwendungsfälle), UC-08 "Fehler bei externer API behandeln".

## 6. Ladezustände

Einheitlicher Ladeindikator (Spinner mit kurzem Hinweistext) für alle asynchronen Vorgänge (Standort ermitteln, Empfehlungen berechnen, Details nachladen), sichtbar ab einer Wartezeit von ca. 300 ms.

## 7. Empfehlungslogik

Fachliches Grundprinzip: passende Küche + passende Preisklasse + geringe Entfernung + geöffnet + passend zur gewählten Stimmung ergeben zusammen eine hohe Empfehlungsbewertung. Die genaue Gewichtung wird erst in der Architekturphase (M2) festgelegt.
-> Abhängigkeit: D1 (Datenmodell), Objekt "Empfehlung", F2 (Anwendungsfälle), UC-04 "Restaurantempfehlungen erzeugen".

## 8. Speicherung von Favoriten

Favoriten werden dauerhaft (verknüpft mit der anonymen ID) im Backend gespeichert und bleiben nach einem Neustart der App erhalten. Ein Restaurant kann jederzeit favorisiert oder die Favorisierung wieder entfernt werden.
-> Abhängigkeit: D1 (Datenmodell), Objekt "Favorit", F2 (Anwendungsfälle), UC-07 "Restaurant als Favorit speichern".

## 9. Speicherung von Besuchen und Bewertungen

Ein Restaurant kann erst bewertet werden, nachdem es zuvor als "besucht" markiert wurde. Besuchsmarkierung und Bewertung (1–5 Sterne) werden gemeinsam dauerhaft gespeichert.

## Akzeptanzkriterien

- Wiederkehrende Konzepte sind zentral an einer Stelle beschrieben.
- Die Konzepte gelten einheitlich für alle Ansichten der App.
- Abhängigkeiten zu Datenmodell (D1) und Use Cases (F2) sind bei jedem Konzept genannt, wo zutreffend.