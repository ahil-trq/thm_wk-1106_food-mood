# A07 – Verteilungssicht

Diese Datei beschreibt, wie Food-Mood als Web-App bereitgestellt wird – also auf welcher Infrastruktur Frontend, Backend und Datenbank laufen und wie der Zugriff über die Domain erfolgt (bewusst technologieoffen gehalten, vgl. S3 – Inbetriebnahme).

## Hosting

Food-Mood wird als Web-App gehostet, nicht als native Mobile-App (vgl. ADR-03 in A09). Ein Webserver liefert das Frontend aus und leitet API-Anfragen an das Backend weiter.

## Domain

Die Anwendung ist über eine eigene Domain erreichbar. Die Domain zeigt per DNS-Eintrag auf die IP-Adresse des Webservers.

## Entwicklungsumgebung

In der Entwicklungsumgebung laufen Frontend und Backend lokal auf dem Rechner der Entwickler:innen (z. B. über einen lokalen Entwicklungsserver), zusammen mit einer lokalen oder containerisierten Test-Datenbank. Der Zugriff erfolgt über `localhost`, es wird keine öffentliche Domain benötigt.

## Produktivumgebung

In der Produktivumgebung ist die Domain öffentlich erreichbar und zeigt auf den Webserver. Der Webserver liefert die gebauten Frontend-Dateien aus und leitet Backend-Anfragen (z. B. `/api/...`) als Reverse Proxy an das Backend weiter. Das Backend verbindet sich mit der produktiven PostgreSQL-Datenbank, die nicht direkt aus dem Internet erreichbar ist.

## Zusätzlich beschrieben

- **Wo läuft das Frontend?** Als statisch gebaute Anwendung, ausgeliefert über den Webserver.
- **Wo läuft das Backend?** Als eigenständiger Dienst, erreichbar über den Webserver (Reverse Proxy).
- **Wo liegt die Datenbank?** Als PostgreSQL-Instanz, ausschließlich vom Backend aus erreichbar.
- **Wie erfolgt der Zugriff über die Domain?** Der Browser ruft die Domain auf; der DNS-Eintrag löst sie zur IP des Webservers auf; der Webserver terminiert die Verbindung (inkl. HTTPS) und leitet Anfragen an Frontend-Dateien bzw. an das Backend weiter.

## Diagramm: Verteilungssicht

![Verteilungssicht](diagrams-png/deployment.png)

Quelldatei: `diagrams/deployment.mmd`

Das Diagramm zeigt den Weg einer Anfrage vom Browser über die Domain und den Webserver bis zum Backend und der Datenbank.