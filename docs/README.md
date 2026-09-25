# Food-Mood – Dokumentation

Dieses Verzeichnis enthält die Projektdokumentation für **Food-Mood**, eine Web-App zur Suche nach passenden Restaurants anhand von Standort, Stimmung, Anlass und ausgewählten Filtern.

Die Dokumentation ist in zwei Ebenen gegliedert:

| Verzeichnis | Ebene | Inhalt |
|---|---|---|
| [`specs/`](specs/) | Spezifikation – *Was und Warum* | Ziele, Anforderungen, Geschäftsprozesse, Anwendungsfälle, Datenmodell, Dialoge, Nachbarsysteme und Querschnittskonzepte |
| [`arch/`](arch/) | Architektur – *Wie* | Lösungsstrategie, Bausteinsicht, Laufzeitsicht, Verteilungssicht, Querschnittskonzepte und Architekturentscheidungen |

Die Trennung ist bewusst gewählt: Die Spezifikation beschreibt fachliche Anforderungen und Verträge möglichst unabhängig von der konkreten Implementierung. Technische Details wie Dateipfade, Express-Routen, PostgreSQL-Abfragen, Umgebungsvariablen und externe API-Adapter gehören in die Architektur-Dokumentation oder in den Quellcode.

## Dokumentationsstruktur

### Spezifikation

Die fachliche Dokumentation liegt unter [`specs/`](specs/). Der dortige Überblick ist in [`specs/README.md`](specs/README.md) zusammengefasst. Wichtige Bausteine sind:

- Ziele und Rahmenbedingungen
- Geschäftsprozesse und Anwendungsfälle
- Anwendungsfunktionen
- Dialog- und Mockup-Spezifikation
- fachliches Datenmodell und Datentypen
- Nachbarsysteme und externe APIs
- nichtfunktionale Anforderungen
- Querschnittskonzepte
- Inbetriebnahme

### Architektur

Die Architektur-Dokumentation folgt dem Aufbau von arc42 und wird durch ADRs ergänzt. Der Einstieg befindet sich unter [`arch/`](arch/); die Architekturentscheidungen sind in [`arch/A09-Architekturentscheidungen.md`](arch/A09-Architekturentscheidungen.md) gesammelt.

Die aktuelle Architektur besteht aus:

- React-Frontend mit Vite als statischem Web-Build,
- Node.js-/Express-Backend mit der versionierten REST-API unter `/api/v1`,
- PostgreSQL für Nutzerprofile, Restaurantreferenzen, Favoriten, Besuche und Bewertungen,
- Geoapify Places als primärer Restaurantquelle,
- OpenStreetMap/Overpass als Restaurant-Fallback,
- Nominatim für die optionale Auflösung manueller Ortsangaben,
- Wikimedia Commons/Wikidata als optionale Bildanreicherung.

## Nachvollziehbarkeit

Die Dokumente werden gemeinsam mit dem Quellcode weiterentwickelt. Anwendungsfälle aus `specs/F2-Anwendungsfaelle.md` werden in der Architektur als Abläufe zwischen Frontend, Backend, externer Datenquelle und Datenbank beschrieben. Die fachlichen Datentypen aus `specs/D2-Datentypen.md` sollen dabei mit den API-Antworten, der Datenbank und der Implementierung übereinstimmen.

Die Zuordnung der wichtigsten Ebenen lautet:

```text
Spezifikation  ->  Architektur  ->  Implementierung
Was/Warum          Wie               konkreter Quellcode
```

Bei Änderungen an der Restaurantquelle, dem UserID-System, den API-Verträgen, dem Datenmodell oder dem Deployment müssen die betroffenen Spezifikations- und Architekturkapitel gemeinsam geprüft und aktualisiert werden.

## Diagramme

Die Diagramme werden als versionierte Mermaid-Quelldateien unter [`arch/diagrams/`](arch/diagrams/) gepflegt. Die gerenderten PNG-Dateien liegen unter [`arch/diagrams-png/`](arch/diagrams-png/). Die Quelldatei ist maßgeblich; PNG-Dateien dienen der lesbaren Darstellung in der Dokumentation.

## Aktueller Stand

Food-Mood ist ein MVP. Die Restaurantdaten werden extern bezogen und nicht als vollständige, selbst gepflegte Restaurantdatenbank geführt. Die UserID ersetzt ein klassisches Login. Favoriten, Besuche und Bewertungen werden dem gehashten `UserIdHash` zugeordnet; das Frontend hält zusätzlich eine lokale Spiegelung für die direkte Anzeige.

Die Dokumentation beschreibt den aktuellen Implementierungsstand und wird bei fachlichen oder technischen Änderungen fortgeschrieben. Offene oder bewusst vereinfachte Funktionen, beispielsweise ein komplex gewichteter Empfehlungs-Score, dürfen nicht als bereits umgesetzt dargestellt werden.