# Deployment

All-Inkl stellt das React-Frontend als statische Dateien bereit. Das Express-Backend und PostgreSQL laufen auf einem separaten Node.js-/Datenbankanbieter.

## Frontend bei All-Inkl

1. `frontend/.env.production.example` nach `frontend/.env.production` kopieren.
2. `VITE_API_BASE_URL` auf die öffentliche Backend-Adresse setzen, zum Beispiel `https://api.example.com/api/v1`.
3. Im Repository-Root ausführen:

   ```bash
   npm run build
   ```

4. Den Inhalt von `frontend/dist/` per FTP in das Webverzeichnis der Domain `foodmood-thm.de` hochladen.
5. Im All-Inkl-KAS HTTPS für die Domain aktivieren und HTTP auf HTTPS umleiten.

Die Datei `frontend/.env.production` wird nicht hochgeladen. Die Backend-URL ist beim Build bereits in die statischen Dateien geschrieben.

## Backend beim externen Anbieter

1. Repository oder den Ordner `backend/` auf dem Node.js-Host bereitstellen.
2. Im Backend-Verzeichnis `npm ci --omit=dev` ausführen.
3. Produktive Umgebungsvariablen setzen:

   ```text
   PORT=3000
   DATABASE_URL=postgres://...
   OVERPASS_API_URL=https://overpass-api.de/api/interpreter
   NOMINATIM_API_URL=https://nominatim.openstreetmap.org
   CORS_ORIGIN=https://foodmood-thm.de
   ```

4. Datenbankschema einmalig anwenden:

   ```bash
   npm run migrate
   ```

5. Backend mit `npm start` oder der Prozessverwaltung des Anbieters starten.
6. `https://<backend-domain>/health` aufrufen. Erwartet wird `{ "status": "ok" }`.

## Smoke-Test

- `https://foodmood-thm.de` lädt ohne gemischte HTTP-Inhalte.
- Profil kann erstellt werden.
- Empfehlungssuche erreicht die externe Backend-URL.
- Favorit, Besuch und Bewertung funktionieren.
- Der Browser meldet keine CORS-Fehler.
- Die PostgreSQL-Sicherung wurde einmal testweise wiederhergestellt.

## Wichtige Grenze

Die konkrete Backend-Domain, der externe PostgreSQL-Anbieter und die Prozessverwaltung sind noch nicht in diesem Repository festgelegt. Diese Werte müssen vor dem Produktions-Build eingetragen werden; Zugangsdaten gehören ausschließlich in die Serverumgebung.