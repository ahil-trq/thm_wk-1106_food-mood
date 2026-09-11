# A09 – Architekturentscheidungen

## ADR-01

**Status:** Entschieden

**Entscheidung:** Food-Mood verwendet ein leichtgewichtiges UserID Konzept statt eines klassischen Logins mit E-Mail Adresse und Passwort.

**Begründung:** Die Anwendung benötigt keine sensiblen Kontodaten und soll eine möglichst niedrige Einstiegshürde bieten (kein Registrierungsprozess, keine Passwortverwaltung). Für den MVP-Umfang ist keine vollwertige Benutzerverwaltung mit Rollen, Passwortwiederherstellung oder E-Mail Verifizierung notwendig (vgl. D1.8).

**Konsequenzen:** Es gibt keine Möglichkeit, ein verlorenes Profil wiederherzustellen, da die UserID der einzige Zugang ist. Der Nutzer muss sie selbst sicher aufbewahren. Im Gegenzug entfällt die Notwendigkeit eines Authentifizierungsservers, von Session Tokens und Passwort Hashing Infrastruktur, was die Architektur deutlich vereinfacht (siehe A08, 8.1 und 8.5).

---

## ADR-02

**Status:** Entschieden

**Entscheidung:** Food-Mood bezieht Restaurantdaten über die OpenStreetMap/Overpass-API statt über die Google Places API.

**Begründung:** OpenStreetMap ist kostenlos nutzbar und erfordert keinen kostenpflichtigen API-Key mit Nutzungslimits, was für ein studentisches MVP-Projekt entscheidend ist. Die Daten sind offen lizenziert (ODbL) und ausreichend für die Grundfunktionen (Standort, Name, Küche, Öffnungszeiten).

**Konsequenzen:** Die Datenqualität ist uneinheitlicher als bei Google, z. B. fehlen verlässliche Preisangaben, weshalb ein Preisfilter im MVP entfällt (vgl. D1). Unbekannte Werte müssen explizit als "unbekannt" behandelt werden, statt sie durch erfundene Standardwerte zu ersetzen (DR-05). Dafür entstehen keine Lizenzkosten.

---

## ADR-03

**Status:** Entschieden

**Entscheidung:** Food-Mood wird als Web-App bereitgestellt (Domain + Webserver), nicht als native Mobile-App über App Stores.

**Begründung:** Eine Web-App ist plattformunabhängig, ohne separaten AppStore Freigabeprozess sofort nutzbar und passt zum MVP-Zeitrahmen des Projekts (vgl. S3, Domain und Hosting).

**Konsequenzen:** Es entfallen native Funktionen wie Push Benachrichtigungen oder echte Offline Nutzung. Dafür ist die Bereitstellung neuer Versionen einfacher (kein Store-Review-Prozess), und die Anwendung ist über jeden Browser mit Standortfreigabe erreichbar.

---

## ADR-04

**Status:** Entschieden

**Entscheidung:** Empfehlungen werden über einen serverseitig berechneten Matching Score ermittelt, der Stimmung, Anlass und Filterkriterien kombiniert (vgl. F3, AF-01 bis AF-06).

**Begründung:** Eine einfache, nachvollziehbare Score Berechnung reicht für den MVP aus, um kurze, verständliche Begründungen liefern zu können (z. B. "passt zur Stimmung SCHNELL"), ohne die Komplexität eines lernenden bzw. KI-basierten Empfehlungssystems.

**Konsequenzen:** Der Algorithmus ist deterministisch und nachvollziehbar, aber nicht personalisiert oder lernend. Er berücksichtigt keine Nutzungshistorie über die aktuelle Suche hinaus. Eine spätere Erweiterung um ein lernendes Modell ist architektonisch möglich, aber nicht Teil des aktuellen Scores.

---


| Entscheidung | Grund | Konsequenz |
|---|---|---|
| UserID statt Login | Keine sensiblen Kontodaten nötig, niedrige Einstiegshürde | Kein Passwort-Reset möglich, Nutzer muss UserID selbst aufbewahren |
| OpenStreetMap statt Google | Kostenlos, offen lizenziert, ausreichend für MVP | Uneinheitlichere Datenqualität, kein verlässlicher Preisfilter |
| Web-App Hosting | Plattformunabhängig, kein App-Store-Prozess | Keine nativen Funktionen wie Push-Benachrichtigungen |
| Matching-Algorithmus | Einfacher, nachvollziehbarer Score ausreichend für MVP | Nicht personalisiert/lernend |