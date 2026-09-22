# A07 – Verteilungssicht

Diese Datei beschreibt, wie Food-Mood als Web-App bereitgestellt wird: das Frontend liegt statisch bei All-Inkl, während Backend und PostgreSQL bei einem separaten Anbieter laufen. Die Inbetriebnahme ist in [S3 – Inbetriebnahme](../specs/S3-Inbetriebnahme.md) beschrieben.

## A07.0 Überblick

| Abschnitt | Thema | Verknüpfung |
|---|---|---|
| [§ 7.1](#71-hosting) | Hosting und Laufzeitumgebung | [A04 – Lösungsstrategie](A04-Loesungsstrategie.md), [A05 – Bausteinsicht](A05-Bausteinsicht.md) |
| [§ 7.2](#72-domain-und-zugriff) | Domain und öffentliche Erreichbarkeit | [A02 – Randbedingungen](A02-Randbedingungen.md), [A03 – Kontextabgrenzung](A03-Kontextabgrenzung.md) |
| [§ 7.3](#73-entwicklungsumgebung) | lokale Entwicklung | [S3 – Inbetriebnahme](../specs/S3-Inbetriebnahme.md) |
| [§ 7.4](#74-produktivumgebung) | produktive Bereitstellung | [A09 – Architekturentscheidungen](A09-Architekturentscheidungen.md), [A02 – Randbedingungen](A02-Randbedingungen.md) |
| [§ 7.5](#75-diagramm-verteilungssicht) | Gesamtbild der Verteilung | [A06 – Laufzeitsicht](A06-Laufzeitsicht.md) |

<a id="71-hosting"></a>
## § 7.1 Hosting

Food-Mood wird für die Projektlaufzeit als Web-App betrieben, nicht als native Mobile-App (vgl. ADR-03 und ADR-07 in [A09 – Architekturentscheidungen](A09-Architekturentscheidungen.md)). Die Domain `foodmood-thm.de` und der statische Frontend-Build liegen bei All-Inkl. Das Node.js-/Express-Backend und PostgreSQL laufen bei einem separaten Anbieter.

<a id="72-domain-und-zugriff"></a>
## § 7.2 Domain

Das Frontend ist über `foodmood-thm.de` erreichbar. Die Domain zeigt per DNS-Eintrag auf die von All-Inkl bereitgestellte Webhosting-Umgebung. Die Backend-URL ist separat und wird nur im Frontend-Produktionsbuild konfiguriert. Diese öffentliche Erreichbarkeit ist eine fachliche Randbedingung aus [A02 – Randbedingungen](A02-Randbedingungen.md) und bildet zugleich den Zugriffspfad aus [A03 – Kontextabgrenzung](A03-Kontextabgrenzung.md).

<a id="73-entwicklungsumgebung"></a>
## § 7.3 Entwicklungsumgebung

In der Entwicklungsumgebung laufen Frontend und Backend lokal auf dem Rechner der Entwickler:innen (z. B. über einen lokalen Entwicklungsserver), zusammen mit einer lokalen oder containerisierten Test-Datenbank. Der Zugriff erfolgt über `localhost`, es wird keine öffentliche Domain benötigt. Die dazugehörigen Betriebs- und Startbedingungen sind in [S3 – Inbetriebnahme](../specs/S3-Inbetriebnahme.md) beschrieben.

<a id="74-produktivumgebung"></a>
## § 7.4 Produktivumgebung

In der Produktivumgebung liefert All-Inkl die gebauten Frontend-Dateien unter `foodmood-thm.de` aus. Das Frontend sendet `/api/v1/...` an die separat konfigurierte Backend-URL. Das Backend verbindet sich mit der produktiven PostgreSQL-Datenbank, die nicht direkt aus dem Browser erreichbar ist. Der Produktivbetrieb ist bis zur Projektabgabe vorgesehen; die Datenbank wird täglich gesichert und Sicherungen werden sieben Tage aufbewahrt.

### Zusätzlich beschrieben

- **Wo läuft das Frontend?** Als statisch gebaute Anwendung, ausgeliefert über den Webserver.
- **Wo läuft das Backend?** Als eigenständiger Node.js-/Express-Dienst bei einem separaten Anbieter.
- **Wo liegt die Datenbank?** Als PostgreSQL-Instanz beim Backend-/Datenbankanbieter, ausschließlich vom Backend aus erreichbar.
- **Wie erfolgt der Zugriff?** Der Browser ruft das All-Inkl-Frontend auf; der Frontend-Build verwendet für API-Aufrufe die separat konfigurierte HTTPS-Backend-URL.

<a id="75-diagramm-verteilungssicht"></a>
## § 7.5 Diagramm: Verteilungssicht

![Verteilungssicht](diagrams-png/deployment.png)

Quelldatei: [diagrams/deployment.mmd](diagrams/deployment.mmd)

Das Diagramm zeigt den Weg einer Anfrage vom Browser über DNS und den Reverse Proxy mit TLS-Terminierung zum Frontend beziehungsweise zur versionierten API. Es ergänzt die Laufzeitlogik aus [A06 – Laufzeitsicht](A06-Laufzeitsicht.md) um die Datenbank und die externe OSM-Anbindung.