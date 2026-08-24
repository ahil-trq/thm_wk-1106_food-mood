# S3 - Inbetriebnahme

Diese Datei beschreibt fachlich, was nötig ist, um Food-Mood lokal zu starten und produktiv in Betrieb zu nehmen. Genaue Befehle und Anbieter können sich noch ändern, sobald die Architektur in M2 final feststeht.

## 1. Voraussetzungen

- Node.js (aktuelle LTS-Version) sowie ein Paketmanager (z.B. npm) müssen installiert sein.
- Eine lokale PostgreSQL-Instanz (z.B. über Docker) für die Speicherung von Favoriten und Besuchen/Bewertungen.
- Eine bestehende Internetverbindung, da Restaurantdaten über die externe OpenStreetMap/Overpass-API abgerufen werden.
- Ein moderner Webbrowser. Für den Test der automatischen Standortermittlung sollten die Standortdienste des Browsers/Geräts aktiviert sein.

## 2. Repository beziehen

- Repository klonen bzw. aktuellen Stand holen (`git clone` bzw. `git pull`).
- In den Projektordner wechseln.

## 3. Abhängigkeiten installieren

- Abhängigkeiten installieren (voraussichtlich `npm install`).

## 4. Umgebungsvariablen konfigurieren

Die Konfiguration erfolgt über Umgebungsvariablen in einer lokalen env-Datei, die nicht Teil des Repositorys ist (in .gitignore eingetragen). Voraussichtlich benötigt:

- `OVERPASS_API_URL` Basis-URL des Overpass-Servers.
- `DATABASE_URL` Verbindungsangabe zur Datenbank (siehe Datenbankkonfiguration).
- `PORT` Port, unter dem die Anwendung lokal erreichbar ist (optional, mit Standardwert).

Eine Beispieldatei `env.example` mit Platzhalterwerten liegt im Repository, damit neue Teammitglieder wissen, welche Variablen gesetzt werden müssen, ohne echte Werte einzusehen.

## 5. Datenbank konfigurieren

- Die Persistenz erfolgt voraussichtlich über PostgreSQL (siehe TEAMINFO.md).
- Für die lokale Entwicklung reicht eine leere, lokale PostgreSQL-Datenbank. Das Schema wird beim ersten Start automatisch angelegt bzw. über Migrationsskripte eingerichtet (genaue Umsetzung folgt in der Architekturphase, M2).
- Gespeichert werden ausschließlich die UserID sowie die zugehörigen Favoriten und Besuche/Bewertungen. Keine sensiblen personenbezogenen Daten.

## 6. OpenStreetMap-Anbindung konfigurieren

- Food-Mood nutzt OpenStreetMap/Overpass als Datenquelle für Restaurants sowie voraussichtlich Nominatim zur Umwandlung einer manuell eingegebenen Ortsangabe in Koordinaten.
- Beide Dienste sind öffentlich und kostenlos nutzbar. Die jeweilige Basis-URL wird über eine Umgebungsvariable konfiguriert, damit sie bei Bedarf ausgetauscht werden kann, ohne den Code zu ändern.
- Für die aktuell vorgesehene Datenquelle werden keine geheimen API-Schlüssel benötigt. Sollte im weiteren Verlauf dennoch ein Dienst mit Schlüsselpflicht eingesetzt werden, gilt als Grundsatz: Schlüssel werden nicht im Quellcode oder Repository hinterlegt, sondern ausschließlich über die lokale, nicht versionierte env-Datei bereitgestellt.

## 7. Anwendung lokal starten

1. `npm run dev` startet die Anwendung im Entwicklungsmodus (voraussichtlich über Vite) mit automatischem Neuladen bei Codeänderungen.
2. Die App ist anschließend lokal unter einer Adresse wie `http://localhost:5173` erreichbar.

## 8. Anwendung bauen

1. `npm run build` erstellt eine optimierte, produktionsreife Version der Anwendung (statische Dateien).
2. Im Produktivbetrieb werden andere Umgebungsvariablen verwendet als in der lokalen Entwicklung, z.B. eine produktive statt einer lokalen Datenbank-URL.

## 9. Webserver vorbereiten

- Für den Produktivbetrieb wird ein Webserver benötigt, der die gebauten Frontend-Dateien ausliefert und das Backend erreichbar macht.
- Der genaue Anbieter (z.B. eigener Server, Cloud-Hosting-Dienst) steht noch nicht fest und wird erst in der Architekturphase (M2) entschieden.
- Der Server benötigt Node.js zur Ausführung des Backends sowie Netzwerkzugriff auf die PostgreSQL-Datenbank und die externen OpenStreetMap-Dienste.

## 10. Deployment durchführen

- Die gebauten Dateien (siehe Punkt 8) werden auf den Webserver übertragen.
- Die produktiven Umgebungsvariablen (siehe Punkt 4) werden auf dem Server hinterlegt, nicht im Repository.
- Das Backend wird auf dem Server gestartet, das Frontend wird darüber ausgeliefert.
- Genaue Schritte (z.B. manuell, per Skript oder automatisiert über CI/CD) werden erst in der Architekturphase (M2) final festgelegt.

## 11. Domain konfigurieren

- Damit Food-Mood öffentlich erreichbar ist, wird eine Domain benötigt, die per DNS-Eintrag auf den Webserver zeigt.
- Der genaue Domain-Anbieter steht noch nicht fest, da die technische Entscheidung dazu noch offen ist.

Domain und Hosting im Überblick:

```mermaid
flowchart TD
    INTERNET[Internet]
    DOMAIN[Domain]
    WEB[Webserver]
    APP[Food-Mood]
    BACKEND["Backend / Datenbank / OpenStreetMap"]

    INTERNET --> DOMAIN
    DOMAIN --> WEB
    WEB --> APP
    APP --> BACKEND
```

## 12. Produktivbetrieb prüfen

- Nach dem Deployment wird geprüft, ob die App über die Domain erreichbar ist.
- Es wird geprüft, ob die Kernfunktionen (Standortbestimmung, Empfehlungen abrufen, Favoriten/Besuche speichern) im Produktivbetrieb wie im lokalen Betrieb funktionieren.
- Es wird geprüft, ob keine unerwarteten Fehler auftreten (z.B. in den Server-Logs, siehe N2 "Logging").

## Akzeptanzkriterien

- S3 ist bei M1 vorhanden.
- Eine neue Person versteht anhand dieser Datei, welche Voraussetzungen benötigt werden.
- Lokaler Start ist beschrieben.
- Produktivdeployment ist berücksichtigt.
- Webserver und Domain sind enthalten.
- Geheimnisse (z.B. Datenbank-Zugangsdaten) werden nirgendwo im Repository gespeichert, sondern ausschließlich über nicht versionierte Umgebungsvariablen bereitgestellt.
- Entwicklungs- und Produktivbetrieb werden klar unterschieden.
- Struktur kann später zu einer vollständigen Schritt-für-Schritt-Anleitung erweitert werden.