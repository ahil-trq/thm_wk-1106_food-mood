# A09 – Architekturentscheidungen

## A09.0 Überblick

| Abschnitt | Entscheidung | Verknüpfung |
|---|---|---|
| [ADR-01](#adr-01-userid-statt-login) | UserID statt klassischem Login | [A02 – Randbedingungen](A02-Randbedingungen.md), [A08 – Querschnittskonzepte](A08-Querschnittskonzepte.md), [D1 – Datenmodell](../specs/D1-Datenmodell.md) |
| [ADR-02](#adr-02-openstreetmap-als-datenquelle) | OpenStreetMap/Overpass statt kostenpflichtiger Anbieter | [S1 – Nachbarsysteme und externe APIs](../specs/S1-Nachbarsysteme-und-APIs.md), [A03 – Kontextabgrenzung](A03-Kontextabgrenzung.md) |
| [ADR-03](#adr-03-web-app-statt-native-app) | Web-App statt native Mobile-App | [A07 – Verteilungssicht](A07-Verteilungssicht.md), [S3 – Inbetriebnahme](../specs/S3-Inbetriebnahme.md) |
| [ADR-04](#adr-04-matching-score-statt-lernendem-system) | serverseitiger Matching-Score statt lernendem Empfehlungsmodell | [F3 – Anwendungsfunktionen](../specs/F3-Anwendungsfunktionen.md), [A06 – Laufzeitsicht](A06-Laufzeitsicht.md) |

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
## ADR-02: OpenStreetMap als Datenquelle

**Status:** Entschieden

**Kontext:** Food-Mood braucht Restaurantdaten für Standort, Name, Verfügbarkeit und Merkmale. Eine freie, unkomplizierte Datenquelle ist erforderlich, damit das Projekt ohne hohe Betriebskosten und Lizenzen nutzbar bleibt.

**Alternativen:**

| Option | Beschreibung | Vorteile | Nachteile |
|---|---|---|---|
| A – Google Places API | kommerzielle Restaurantdatenquelle | hohe Datenqualität, gute Abdeckung | kostenpflichtig, mehr Abhängigkeit, weniger geeignet für MVP |
| B – OpenStreetMap/Overpass | freie Geodatenquelle mit Restaurantinformationen | kostenlos, offen, gut für MVP | Datenqualität variiert, keine verlässlichen Preisstufen |
| C – eigene Restaurantdatenbank | komplett selbst gepflegte Datenbasis | volle Kontrolle | zu aufwändig, nicht im Umfang des MVP |

**Entscheidung:** Option B – Nutzung von OpenStreetMap/Overpass als primäre externe Datenquelle.

**Begründung:** OpenStreetMap ist für ein akademisches MVP-Prinzip geeignet: kostenlos, offen und fachlich passend. Die Restaurantdaten liefern ausreichend Informationen für die Kernfunktionalität, während die eigentliche Bewertungs- und Nutzerlogik in Food-Mood selbst verbleibt. Dies entspricht dem fachlichen Nachbarsystem aus [S1 – Nachbarsysteme und externe APIs](../specs/S1-Nachbarsysteme-und-APIs.md) und der Kontextabgrenzung in [A03 – Kontextabgrenzung](A03-Kontextabgrenzung.md).

**Konsequenzen:**
- Preise und bestimmte Stammdaten fehlen teilweise oder sind unzuverlässig,
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

**Entscheidung:** Option A – ein serverseitig berechneter Matching-Score.

**Begründung:** Eine einfache, nachvollziehbare Berechnung ist für den MVP ausreichend und sauber in [F3 – Anwendungsfunktionen](../specs/F3-Anwendungsfunktionen.md) modelliert. Die Benutzer sollen verstehen, warum ein Restaurant empfohlen wird. Ein lernendes System wäre zwar interessant, würde aber die Architektur, die Validierung und die Transparenz deutlich erhöhen.

**Konsequenzen:**
- Empfehlungsergebnisse sind deterministisch und nachvollziehbar,
- die Berechnung bleibt unkompliziert und gut testbar,
- eine spätere Erweiterung um ein lernendes Modell ist technisch möglich, aber kein Teil der aktuellen Architektur.

## Ergebnis in einem Satz

Food-Mood entscheidet sich für ein leichtgewichtiges, datensparsames und transparentes System: anonyme UserID, freie Restaurantdaten aus OpenStreetMap, browserbasierte Bereitstellung und nachvollziehbarer Matching-Score statt komplexer, lernender Logik.