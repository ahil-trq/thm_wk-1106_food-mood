# Food-Mood

Food-Mood ist eine Web-App, die passende Restaurants für den aktuellen Moment findet. Standort, Stimmung, Anlass und persönliche Filter werden zu einer übersichtlichen Empfehlungsliste verbunden.

## Studienkontext

Dieses Projekt ist ein Studienprojekt im Modul **Wirtschaftsinformatik-Projekt I (Softwaretechnik), WK_1106**, an der Technischen Hochschule Mittelhessen (THM).

| Angabe | Inhalt |
|---|---|
| Studiengang | B.Sc. Wirtschaftsinformatik |
| Semester | Sommersemester 2026 |
| Umfang | 6 CrP |
| Modulverantwortung | Prof. Dr. Carsten Lucke |
| Projektthema | Restaurantempfehlungen anhand von Mood, Anlass und Standort |

### Projektteam

Die Projektleitung wurde im Verlauf des Projekts von Mustafa Jasim Mahmood an Danish Ahil Tariq übergeben. Danish ist damit aktuell Projektleiter; Mustafa verantwortet die technische Implementierungsleitung.

| Name | Studiengang | Rolle | Git-Handle (optional) |
|---|---|---|---|
| Mustafa Jasim Mahmood | WI B.Sc. | Implementation Lead | GitHub: `Feng002` |
| Danish Ahil Tariq | WI B.Sc. | Projektleiter:in | GitHub: `ahil-trq` |
| Abrar Ahmad | WI B.Sc. | Spec/Requirements Lead | GitHub: `sniperwolf-spec` |
| Ali Mahmood | WI B.Sc. | Software Architect | `Armh34432` |

Die Dokumentation ist in [docs/](docs/) organisiert. `docs/specs/` beschreibt fachlich, **was** das System leisten soll und **warum**. `docs/arch/` beschreibt, **wie** die aktuelle Lösung aufgebaut ist.

## Konzept

```text
UserID und Name
				-> Standort
				-> Stimmung und Anlass
				-> Filter
				-> Geoapify Places
				-> Restaurantempfehlungen
				-> Favoriten, Besuche und Bewertungen
```

Food-Mood verwendet kein klassisches Login. Beim Start wird eine zwölfstellige UserID erzeugt. Der Nutzer kann diese UserID später erneut eingeben, um das Profil zu laden. Serverseitig wird die UserID nur als Hash gespeichert.

## Funktionen

- **Anonymes Profil:** Profil mit Name und UserID ohne E-Mail-Adresse oder Passwort
- **Standortsuche:** Browser-Geolocation oder manuelle Ortsauflösung über Nominatim
- **Mood-Auswahl:** Gemütlich, romantisch, schnell, gesellig oder etwas Neues
- **Anlass:** Date, Familie, Freunde, Mittagspause oder Uni
- **Filter:** Suchradius, Küche und optional nur geöffnete Restaurants
- **Restaurantdaten:** Geoapify Places als primäre Quelle; OpenStreetMap/Overpass als Backend-Fallback
- **Empfehlungen:** normalisierte Restaurantdaten mit Entfernung, Kategorie und kurzem Matching-Grund
- **Favoriten:** Restaurants speichern oder entfernen
- **Besuche:** Restaurants als besucht markieren
- **Bewertungen:** ein bis fünf Sterne und optionaler Kommentar; Bewertung erst nach einem Besuch
- **Bildanreicherung:** optionale Bildauflösung über Wikimedia Commons/Wikidata, wenn externe Bildreferenzen vorhanden sind
- **Responsive Oberfläche:** Nutzung im Desktop- und mobilen Browser

Die aktuelle Empfehlungslogik filtert die Ergebnisse und vergibt anschließend einen deterministischen, positionsbasierten Score. Ein komplexes lernendes oder gewichtetes Empfehlungssystem ist nicht Bestandteil des aktuellen MVP.

## Technischer Aufbau

| Bereich | Technologie bzw. Dienst |
|---|---|
| Frontend | React 19 mit Vite |
| Backend | Node.js mit Express 5 |
| Datenbank | PostgreSQL |
| Datenzugriff | `pg` ohne ORM |
| Primäre Restaurantquelle | Geoapify Places API |
| Restaurant-Fallback | OpenStreetMap über Overpass |
| Geocoding | Nominatim |
| Optionale Bilder | Wikimedia Commons/Wikidata |
| Frontend-Hosting | statischer Build bei All-Inkl |
| Backend-Hosting | separater Node.js-Host, aktuell Render |

Die wichtigsten API-Routen liegen unter `/api/v1/`:

| Route | Zweck |
|---|---|
| `POST /profiles` | Profil erstellen |
| `POST /profiles/load` | vorhandenes Profil laden |
| `GET /restaurants` | Restaurants im Suchradius abrufen |
| `POST /recommendations` | Empfehlungen anhand der Suche erzeugen |
| `GET/POST /favorites` | Favoriten lesen und ändern |
| `GET/POST /visits` | Besuche lesen und hinzufügen |
| `POST /reviews` | Bewertung speichern oder aktualisieren |
| `GET /health` | Backend- und Datenbankstatus prüfen |

## Voraussetzungen

- Node.js in einer aktuellen LTS-Version
- npm
- PostgreSQL für die dauerhafte lokale Speicherung
- Geoapify-API-Key für die primäre Restaurantabfrage
- Internetverbindung für Geoapify, Nominatim, Overpass und optionale Wikimedia-Anfragen

Die Datenbank kann lokal oder bei einem PostgreSQL-Anbieter betrieben werden. Zugangsdaten und API-Schlüssel gehören ausschließlich in nicht versionierte Umgebungsdateien.

## Einrichtung

Abhängigkeiten installieren:

```bash
npm install --prefix frontend
npm install --prefix backend
```

Backend-Umgebung einrichten:

```bash
cp backend/.env.example backend/.env
```

In `backend/.env` mindestens `DATABASE_URL`, `DATABASE_SSL` und `GEOAPIFY_API_KEY` passend zur Umgebung setzen. Für die lokale Entwicklung kann zusätzlich `CORS_ORIGIN=http://localhost:5173` verwendet werden.

Frontend-Produktionsumgebung:

```bash
cp frontend/.env.production.example frontend/.env.production
```

Für die lokale Entwicklung genügt die Vite-Proxy-Konfiguration. Der Backend-Server läuft standardmäßig auf Port `3000`, der Vite-Entwicklungsserver auf Port `5173`.

Datenbankschema anwenden:

```bash
npm run migrate
```

Die Migrationen legen unter anderem die Tabelle für Restaurantreferenzen an. Geoapify-`place_id`-Werte werden als externe String-ID gespeichert; numerische OSM-IDs bleiben in `osm_id`.

## Entwicklung

Backend starten:

```bash
npm run dev:backend
```

Frontend in einem zweiten Terminal starten:

```bash
npm run dev:frontend
```

Die Anwendung ist anschließend unter [http://localhost:5173](http://localhost:5173) erreichbar.

Nützliche Prüfungen:

```bash
npm run build
npm run lint
curl "http://localhost:3000/health"
curl "http://localhost:3000/api/v1/restaurants?latitude=50.1109&longitude=8.6821&radius=3000"
```

## Deployment

Das Frontend wird als statischer Vite-Build bereitgestellt:

```bash
npm run build
```

Anschließend wird der Inhalt von `frontend/dist/` auf den Webspace bei All-Inkl hochgeladen. Das Backend läuft getrennt bei Render oder einem vergleichbaren Node.js-Host. Dort müssen die produktiven Umgebungsvariablen, insbesondere `DATABASE_URL`, `GEOAPIFY_API_KEY` und `CORS_ORIGIN`, sicher hinterlegt sein.

Weitere Schritte und Smoke-Tests stehen in [deploy/README.md](deploy/README.md) und [docs/specs/S3-Inbetriebnahme.md](docs/specs/S3-Inbetriebnahme.md).

## Projektstruktur

```text
food-mood/
	backend/
		src/server.js       # Express-Routen und Anwendungsabläufe
		src/osm.js          # Geoapify-, Overpass-, Nominatim- und Bildadapter
		src/migrate.js      # Ausführung der SQL-Migrationen
	database/
		migrations/         # versioniertes PostgreSQL-Schema
	frontend/
		src/App.jsx         # React-Oberfläche und Suchablauf
		src/App.css         # UI-Stile
		vite.config.js      # Vite-Entwicklungskonfiguration
	docs/
		specs/              # fachliche Spezifikation
		arch/               # arc42-Architektur, ADRs und Diagramme
	deploy/
		README.md           # Bereitstellungsanleitung
```

## Dokumentation und Nachvollziehbarkeit

Die fachlichen Spezifikationen, die Architektur und der Quellcode werden gemeinsam gepflegt. Anwendungsfälle aus `docs/specs/F2-Anwendungsfaelle.md` werden in der Architektur als Abläufe zwischen Frontend, Backend, externen Diensten und Datenbank dargestellt. Datentypen und API-Verträge sollen mit der tatsächlichen Implementierung übereinstimmen.

Die Diagramme werden als Mermaid-Quelldateien unter `docs/arch/diagrams/` versioniert. Gerenderte PNG-Dateien liegen unter `docs/arch/diagrams-png/`.

## Lizenz und Projektstatus

Food-Mood ist ein öffentliches Studienprojekt. Der aktuelle Funktionsumfang ist auf ein nachvollziehbares MVP für die Projektabgabe begrenzt. Produktionszugangsdaten, API-Schlüssel und Datenbankpasswörter werden nicht im Repository veröffentlicht.


