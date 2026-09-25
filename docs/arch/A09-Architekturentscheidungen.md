# A09 – Architekturentscheidungen

## A09.0 Überblick

| Abschnitt | Entscheidung | Verknüpfung |
|---|---|---|
| [ADR-01](#adr-01-userid-statt-login) | UserID statt klassischem Login | [A02 – Randbedingungen](A02-Randbedingungen.md), [A08 – Querschnittskonzepte](A08-Querschnittskonzepte.md), [D1 – Datenmodell](../specs/D1-Datenmodell.md) |
| [ADR-02](#adr-02-openstreetmap-als-datenquelle) | Geoapify Places mit Overpass-Fallback statt direkter Overpass-Primärnutzung | [S1 – Nachbarsysteme und externe APIs](../specs/S1-Nachbarsysteme-und-APIs.md), [A03 – Kontextabgrenzung](A03-Kontextabgrenzung.md) |
| [ADR-03](#adr-03-web-app-statt-native-app) | Web-App statt native Mobile-App | [A07 – Verteilungssicht](A07-Verteilungssicht.md), [S3 – Inbetriebnahme](../specs/S3-Inbetriebnahme.md) |
| [ADR-04](#adr-04-matching-score-statt-lernendem-system) | serverseitiger Matching-Score statt lernendem Empfehlungsmodell | [F3 – Anwendungsfunktionen](../specs/F3-Anwendungsfunktionen.md), [A06 – Laufzeitsicht](A06-Laufzeitsicht.md) |
| [ADR-05](#adr-05-versionierte-rest-api-und-score-regeln) | versionierte REST-API und deterministisches Ranking | [A05 – Bausteinsicht](A05-Bausteinsicht.md), [F3 – Anwendungsfunktionen](../specs/F3-Anwendungsfunktionen.md) |
| [ADR-06](#adr-06-pg-und-sql-migrationen) | `pg` und versionierte SQL-Migrationen | [A04 – Lösungsstrategie](A04-Loesungsstrategie.md), [A05 – Bausteinsicht](A05-Bausteinsicht.md) |
| [ADR-07](#adr-07-all-inkl-und-konfigurierbare-osm-endpunkte) | All-Inkl, Domain und konfigurierbare externe API-Endpunkte | [A07 – Verteilungssicht](A07-Verteilungssicht.md), [S3 – Inbetriebnahme](../specs/S3-Inbetriebnahme.md) |
| [ADR-08](#adr-08-optionale-bildanreicherung-ueber-wikimedia) | optionale Bildanreicherung über Wikimedia Commons/Wikidata | [A03 – Kontextabgrenzung](A03-Kontextabgrenzung.md), [A05 – Bausteinsicht](A05-Bausteinsicht.md) |

Diese Entscheidungen definieren den Kern der Food-Mood-Architektur. Sie sind bewusst auf den MVP-Fokus aus [P1 – Ziele und Rahmenbedingungen](../specs/P1-Ziele-und-Rahmenbedingungen.md) zugeschnitten und legen feste Grundsätze fest, ohne die spätere Erweiterung auszuschließen.

<a id="adr-01-userid-statt-login"></a>
## ADR-01: UserID statt Login

**Status:** Entschieden

**Kontext:** Food-Mood soll ohne aufwendige Registrierung direkt nutzbar sein. Gleichzeitig müssen Favoriten, Besuche und Bewertungen einem Nutzerprofil zugeordnet werden, ohne ein klassisches Benutzerkonto mit E-Mail, Passwort und Session-Management aufzubauen.

**Alternativen:**

| Option | Beschreibung | Vorteile | Nachteile |
|---|---|---|---|
| A – klassisches Login | Benutzername/E-Mail + Passwort + Konto | Standard-Muster, Wiederherstellung möglich | hoher Aufwand, mehr Datenschutzpflichten, zu viel für MVP |
| B – Passwortloses Profil mit UserID | eindeutige anonyme ID, keine klassische Authentifizierung | einfach, schnell, datensparsam | Nutzer muss ID selbst sichern |
| C – Social Login | Google/Facebook/Apple Login | bekannte UX | zusätzliche Provider, Datenschutz, stärkerer Abhängigkeitsgrad |

**Entscheidung:** Option B – eine anonyme UserID statt eines klassischen Logins.

**Begründung:** Für Food-Mood ist die niedrigere Einstiegshürde wichtiger als ein vollwertiges Authentifizierungssystem. Die Anwendung benötigt keine sensiblen Kontodaten, sondern nur eine stabile Identifikation für das eigene Profil. Das passt zu [A02 – Randbedingungen](A02-Randbedingungen.md), [A08 – Querschnittskonzepte](A08-Querschnittskonzepte.md) und [D1 – Datenmodell](../specs/D1-Datenmodell.md).

**Konsequenzen:**
- keine E-Mail-Adresse, kein Passwort und keine klassische Kontoverwaltung,
- ein Nutzer muss seine UserID selbst aufbewahren,
- Favoriten, Besuche und Bewertungen werden über den `UserIdHash` zugeordnet,
- das System bleibt einfacher, datensparsam und für den MVP gut handhabbar.

<a id="adr-02-openstreetmap-als-datenquelle"></a>
## ADR-02: Geoapify Places als primäre Restaurantquelle

**Status:** Entschieden

**Kontext:** Food-Mood braucht Restaurantdaten für Standort, Name, Verfügbarkeit und Merkmale. Eine freie, unkomplizierte Datenquelle ist erforderlich, damit das Projekt ohne hohe Betriebskosten und Lizenzen nutzbar bleibt.

**Alternativen:**

| Option | Beschreibung | Vorteile | Nachteile |
|---|---|---|---|
| A – Google Places API | kommerzielle Restaurantdatenquelle | hohe Datenqualität, gute Abdeckung | kostenpflichtig, mehr Abhängigkeit, weniger geeignet für MVP |
| B – Geoapify Places | gehostete Places-API mit gastronomischen Kategorien und Ortsdaten | stabile räumliche Suche, einfache Backend-Integration | API-Schlüssel und Kontingent erforderlich |
| C – OpenStreetMap/Overpass | freie Geodatenquelle mit Restaurantinformationen | offen, als Fallback nutzbar | öffentliche Endpunkte können überlastet oder blockiert sein |
| D – eigene Restaurantdatenbank | komplett selbst gepflegte Datenbasis | volle Kontrolle | zu aufwändig, nicht im Umfang des MVP |

**Entscheidung:** Primäre Nutzung von Geoapify Places; OpenStreetMap/Overpass bleibt als Fallback für Restaurantabfragen erhalten. Nominatim wird für manuelle Ortsauflösung verwendet.

**Begründung:** Die öffentliche Overpass-Nutzung war für den gehosteten Backend-Betrieb nicht zuverlässig genug. Geoapify liefert eine stabile Places-Schnittstelle für die Kernsuche; die eigentliche Bewertungs- und Nutzerlogik verbleibt in Food-Mood. Der Fallback hält die Adaptergrenze technisch robust.

**Konsequenzen:**
- Preise und bestimmte Stammdaten fehlen teilweise oder sind unzuverlässig,
- ein API-Schlüssel muss ausschließlich in der Serverumgebung verwaltet werden,
- unbekannte Werte müssen als unbekannt behandelt werden,
- ein Preisfilter entfällt im MVP,
- Food-Mood bleibt fachlich auf freie, gut nachvollziehbare Datenquellen angewiesen.

<a id="adr-03-web-app-statt-native-app"></a>
## ADR-03: Web-App statt native App

**Status:** Entschieden

**Kontext:** Die Anwendung soll schnell nutzbar, plattformunabhängig und ohne Store-Prozess bereitstellbar sein. Gleichzeitig ist die Produktidee ein persönlicher Restaurantassistent, kein Mobil- oder App-Ökosystem.

**Alternativen:**

| Option | Beschreibung | Vorteile | Nachteile |
|---|---|---|---|
| A – native Mobile-App | separate Apps für iOS/Android | beste mobile UX, Push-Benachrichtigungen | hoher Aufwand, App-Review, separate Builds |
| B – Web-App | browserbasierte Anwendung mit Domain | einfach, plattformunabhängig, schnell bereitstellbar | keine nativen Mobilfunktionen |
| C – hybride App | Web-Container mit nativen Wrappers | halb native UX | mehr Komplexität ohne klaren Nutzen |

**Entscheidung:** Option B – Food-Mood wird als Web-App bereitgestellt.

**Begründung:** Die Kernfunktionalität ist ein browserbasierter Dialog mit Standort, Filter, Empfehlungen und Bewertungen. Für den MVP steht damit die schnellste und niedrigste Bereitstellung im Vordergrund. Die Verteilung und Bereitstellung werden in [A07 – Verteilungssicht](A07-Verteilungssicht.md) beschrieben; die fachlichen Rahmenbedingungen finden sich in [A02 – Randbedingungen](A02-Randbedingungen.md) und [S3 – Inbetriebnahme](../specs/S3-Inbetriebnahme.md).

**Konsequenzen:**
- keine nativen App-Store-Prozesse,
- keine Push-Benachrichtigungen oder native Offline-Features im MVP,
- einfache Bereitstellung über Domain und Webserver,
- Plattformunabhängigkeit für jeden Browser mit Standortfreigabe.

<a id="adr-04-matching-score-statt-lernendem-system"></a>
## ADR-04: Matching-Score statt lernendem System

**Status:** Entschieden

**Kontext:** Food-Mood soll dem Nutzer nachvollziehbare Restaurantempfehlungen liefern – schnell, verständlich und ohne komplexe lernende Modelle. Das Projekt ist auf den MVP-Fokus aus [P1 – Ziele und Rahmenbedingungen](../specs/P1-Ziele-und-Rahmenbedingungen.md) ausgerichtet.

**Alternativen:**

| Option | Beschreibung | Vorteile | Nachteile |
|---|---|---|---|
| A – expliziter Matching-Score | Bewertung von Kandidaten anhand von Mood, Anlass, Standort und Filtern | nachvollziehbar, einfach, transparent | keine echte Lernfähigkeit |
| B – lernendes Empfehlungssystem | modellbasiertes oder KI-gestütztes Ranking | potenziell besseres Personal- und Präferenzlernen | deutlich komplexer, schwerer zu verstehen, nicht MVP-geeignet |
| C – reine Listenlogik | sortierte Ausgabe ohne Score | sehr einfach | wenig erklärbar und insgesamt weniger sinnvoll |

**Entscheidung:** Option A – ein serverseitig berechnetes, deterministisches Ranking. Die aktuelle Implementierung nutzt nach den Filtern die Ergebnisposition (`100 - Index`) als Score; eine gewichtete Faktorberechnung ist eine mögliche spätere Erweiterung.

**Begründung:** Eine einfache, nachvollziehbare Berechnung ist für den aktuellen MVP ausreichend. Ein lernendes System wäre zwar interessant, würde aber die Architektur, die Validierung und die Transparenz deutlich erhöhen.

**Konsequenzen:**
- Empfehlungsergebnisse sind deterministisch und nachvollziehbar,
- die Berechnung bleibt unkompliziert und gut testbar,
- eine spätere Erweiterung um ein lernendes Modell ist technisch möglich, aber kein Teil der aktuellen Architektur.

<a id="adr-05-versionierte-rest-api-und-score-regeln"></a>
## ADR-05: Versionierte REST-API und feste Score-Regeln

**Status:** Entschieden

**Kontext:** Frontend, Backend und Dokumentation benötigen einen stabilen Vertrag für die Kernabläufe. Das Ranking muss reproduzierbar und testbar sein.

**Entscheidung:** Die API verwendet versionierte Pfade unter `/api/v1`, JSON für Anfragen und Antworten sowie ein einheitliches Fehlerobjekt mit `errorCode` und verständlicher `message`. Harte Suchfilter werden vor dem Ranking angewendet. Die aktuelle Implementierung vergibt nach der Filterung den Score `max(0, 100 - Ergebnisindex)` und gibt einen kurzen, aus Stimmung oder Anlass abgeleiteten Grund zurück.

**Konsequenzen:**
- API-Pfade bleiben erweiterbar, ohne bestehende Clients unbemerkt zu brechen.
- Empfehlungen sind mit festen Testdaten reproduzierbar.
- Eine spätere gewichtete Score-Regel muss gemeinsam mit F3 und den Akzeptanztests eingeführt werden.
- Eine Kartenansicht ist kein Bestandteil des MVP und wird frühestens in Version 2 entschieden.

<a id="adr-06-pg-und-sql-migrationen"></a>
## ADR-06: `pg` und versionierte SQL-Migrationen

**Status:** Entschieden

**Kontext:** Das Backend benötigt einen einfachen und transparenten Zugriff auf PostgreSQL. Das Projekt benötigt außerdem eine nachvollziehbare Einrichtung und Änderung des Datenbankschemas.

**Entscheidung:** Das Backend verwendet das Node.js-Paket `pg` für PostgreSQL-Zugriffe. Datenbankschemaänderungen werden als versionierte SQL-Migrationsdateien im Repository gepflegt und beim Deployment in definierter Reihenfolge ausgeführt. Ein ORM wird nicht eingesetzt.

**Konsequenzen:**
- SQL und Datenbankabfragen bleiben direkt nachvollziehbar.
- Das Schema kann lokal und produktiv reproduzierbar eingerichtet werden.
- Die Migration von Altdaten ist nicht erforderlich; SQL-Migrationen betreffen nur das Datenbankschema.

<a id="adr-07-all-inkl-und-konfigurierbare-osm-endpunkte"></a>
## ADR-07: All-Inkl und konfigurierbare externe API-Endpunkte

**Status:** Entschieden

**Kontext:** Die Web-App soll für die Projektlaufzeit öffentlich erreichbar sein. Die externen Restaurant- und Geodienste müssen bei Ausfällen oder Anbieterwechseln ohne Änderung der Fachlogik austauschbar bleiben.

**Entscheidung:** Das statische Frontend wird bis zur Projektabgabe bei All-Inkl unter `foodmood-thm.de` betrieben. Das Backend läuft bei einem separaten Node.js-Anbieter und PostgreSQL bei einem Backend-/Datenbankanbieter. Geoapify wird über `GEOAPIFY_API_KEY`, Overpass über `OVERPASS_API_URL` und Nominatim über `NOMINATIM_API_URL` konfiguriert. Die Datenbank wird täglich gesichert; Sicherungen werden sieben Tage aufbewahrt.

**Konsequenzen:**
- Die Backend- und Datenbankanbieter müssen Node.js/Express, PostgreSQL und HTTPS unterstützen.
- PostgreSQL bleibt von außen nicht direkt erreichbar.
- Externe API-Endpunkte können ohne Änderung der Empfehlungslogik ausgetauscht werden.
- Der Produktivbetrieb ist zeitlich auf die Projektlaufzeit begrenzt.

<a id="adr-08-optionale-bildanreicherung-ueber-wikimedia"></a>
## ADR-08: Optionale Bildanreicherung über Wikimedia Commons/Wikidata

**Status:** Entschieden

**Kontext:** Restaurantkarten zeigten bisher nur einen Buchstaben-Platzhalter. OSM-Objekte enthalten vereinzelt Bildverweise (`image`, `wikimedia_commons`, `wikidata`), aus denen sich ein echtes Foto ableiten lässt. Ein zusätzlicher externer Dienst darf jedoch weder die Antwortzeit der Empfehlungslogik (vgl. [N1 – Nichtfunktionale Anforderungen](../specs/N1-Nichtfunktionale-Anforderungen.md)) noch die Zuverlässigkeit der Restaurantsuche gefährden.

**Alternativen:**

| Option | Beschreibung | Vorteile | Nachteile |
|---|---|---|---|
| A – nur direktes `image`-Tag | Bild ausschließlich übernehmen, wenn OSM eine gültige HTTP(S)-URL liefert | keine zusätzliche Abhängigkeit | `image`-Tag ist auf Restaurants selten gepflegt, kaum Nutzen |
| B – zusätzlicher Wikimedia-Commons/Wikidata-Lookup | bei fehlendem `image` wird `wikimedia_commons` bzw. `wikidata` gegen die Wikimedia-APIs aufgelöst | mehr Restaurants mit echtem Bild | zusätzliches Nachbarsystem, zusätzliche Latenz und Fehlerquelle |
| C – fest hinterlegte Demo-/Stockbilder | generische Bilder pro Kategorie anzeigen | immer ein Bild vorhanden | keine echten, restaurantspezifischen Informationen, irreführend |

**Entscheidung:** Option B – ein optionaler, serverseitiger Lookup gegen Wikimedia Commons/Wikidata, ausschließlich als Ergänzung zu Option A und niemals als erfundener Ersatz (Option C wird ausgeschlossen).

**Begründung:** Der Lookup liefert echte, restaurantbezogene Bilder, wo OSM entsprechende Verweise pflegt, ohne die bestehende Restaurantsuche zu verändern. Robustheit hat Vorrang vor Vollständigkeit: Anfragen laufen mit kurzem Timeout (2,5 s), begrenzter Parallelität (5) und einem Limit von 12 Lookups pro Anfrage, damit die Gesamtantwortzeit nicht signifikant steigt. Ergebnisse werden 24 Stunden gecacht, getrennt vom 10-Minuten-Cache der Restaurantsuche. Fehler, Timeouts oder fehlende Treffer führen ausschließlich zu `image: null` und nie zu einem Fehlschlag der Suche.

**Konsequenzen:**
- Wikimedia Commons/Wikidata wird ein zweites, aber rein optionales Nachbarsystem (`NB-02` in [A03 – Kontextabgrenzung](A03-Kontextabgrenzung.md)).
- Die Bildanreicherung ist unidirektional und lesend; es werden keine Nutzerdaten an Wikimedia übertragen.
- Restaurants ohne passenden Bildverweis oder mit nicht auswertbarem Verweis zeigen weiterhin den bestehenden Buchstaben-Platzhalter.
- Bei vielen Kandidaten pro Suche werden nicht alle, sondern nur die ersten 12 angereichert; das ist ein bewusster Kompromiss zwischen Bildabdeckung und Antwortzeit.

## Ergebnis in einem Satz

Food-Mood entscheidet sich für ein leichtgewichtiges, datensparsames und transparentes System: anonyme UserID, freie Restaurantdaten aus OpenStreetMap, browserbasierte Bereitstellung und nachvollziehbarer Matching-Score statt komplexer, lernender Logik.