# S3 - Inbetriebnahme
Diese Datei beschreibt fachlich, was nötig ist, um Food-Mood lokal zu starten. Genaue Befehle können sich noch ändern, sobald die Architektur in M2 final feststeht.
## Vorraussetzungen

- Node.js (aktuelle LTS-Version) sowie ein Paketmanager (z.B. npm) müssen installiert sein.
- Eine lokale PostgreSQL-Instanz (z.B. über Docker) für die Speicherung von Favoriten und Besuchen/Bewertungen.
- Eine bestehende Internetverbindung, da Restaurantdaten über die externe OpenStreetMap/Overpass-API abgerufen werden.
- Ein moderner Webbrowser. Für den Test der automatischen Standortermittlung sollten die Standortdienste des Browsers/Geräts aktiviert sein.

## Installation

1. Repository klonen bzw. aktuellen Stand holen (git clone bzw. git pull).
2. In den Projektordner wechseln.
3. Abhängigkeiten installieren (voraussichtlich npm install).

## Umgebungsvariablen

Die Konfiguration erfolgt über Umgebungsvariablen in einer lokalen env-Datei, die nicht Teil des Repositorys ist (in gitignor eingetragen). Voraussichtlich benötigt:

- `OVERPASS_API_URL` – Basis URL des Overpass-Servers.
- `DATABASE_URL` – Verbindungsangabe zur Datenbank (siehe Datenbankkonfiguration).
- `PORT` – Port, unter dem die Anwendung lokal erreichbar ist (optional, mit Standardwert)

Eine Beispieldatei `env.example` mit Platzhalterwerten sollte im Repository angelegt werden, damit neue Teammitglieder wissen, welche Variablen gesetzt werden müssen, ohne echte Werte einzusehen. Falls die Datei nicht bereitgestellt wird, sollte dieser Hinweis entfernt oder angepasst werden.

## Datenbankkonfiguration

- Die Persistenz erfolgt voraussichtlich über PostgreSQL (siehe TEAMINFO.md).
- Für die lokale Entwicklung reicht eine leere, lokale PostgreSQL-Datenbank. Das Schema wird beim ersten Start automatisch angelegt bzw. über Migrationsskripte eingerichtet (genaue Umsetzung folgt in der Architekturphase, M2).
- Gespeichert werden ausschließlich die anonyme technische Nutzer-ID sowie die zugehörigen Favoriten und Besuche/Bewertungen. Keine personenbezogenen Daten.

## API-Konfiguration

- Food-Mood nutzt OpenStreetMap/Overpass als Datenquelle für Restaurants sowie voraussichtlich Nominatim zur Umwandlung einer manuell eingegebenen Ortsangabe in Koordinaten.
- Beide Dienste sind öffentlich und kostenlos nutzbar. Die jeweilige Basis URL wird über eine Umgebungsvariable konfiguriert, damit sie bei Bedarf ausgetauscht werden kann, ohne den Code zu ändern.

## Schutz von API-Schlüsseln

- Für die aktuell vorgesehene Datenquelle (OpenStreetMap/Overpass) werden keine geheimen API-Schlüssel benötigt.
- Sollte im weiteren Verlauf dennoch ein Dienst mit Schlüsselpflicht eingesetzt werden, gilt als Grundsatz: Schlüssel werden nicht im Quellcode oder Repository hinterlegt, sondern ausschließlich über die lokale, nicht versionierte env-Datei bereitgestellt.

## Start der Anwendung

**Entwicklungsbetrieb:**
1. `npm run dev` startet die Anwendung im Entwicklungsmodus (voraussichtlich über Vite) mit automatischem Neuladen bei Codeänderungen.
2. Die App ist anschließend lokal unter einer Adresse wie `http://localhost:5173` erreichbar.

**Produktivbetrieb:**
1. `npm run build` erstellt eine optimierte, produktionsreife Version der Anwendung.
2. Die gebauten Dateien werden über einen Produktionsserver bereitgestellt (genaues Hosting wird erst in der Architekturphase, M2, festgelegt).
3. Im Produktivbetrieb werden andere Umgebungsvariablen verwendet als in der lokalen Entwicklung, z.B. eine produktive statt einer lokalen Datenbank-URL.

## Akzeptanzkriterien

- Eine neue Person versteht anhand dieser Datei, welche Voraussetzungen benötigt werden.
- Geheimnisse (z.B. Datenbank-Zugangsdaten) werden nirgendwo im Repository gespeichert, sondern ausschließlich über nicht versionierte Umgebungsvariablen bereitgestellt.
- Entwicklungs- und Produktivbetrieb werden klar unterschieden.