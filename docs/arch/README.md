# Architektur-Dokumentation Food-Mood

Diese Dokumentation beschreibt die Architektur von Food-Mood nach dem arc42-Template.

## Zweck

Die Architektur-Dokumentation dient als Einstiegspunkt für alle relevanten Entwurfs- und Architekturinformationen des Projekts. Sie erklärt die Ziele, Randbedingungen, Systemgrenzen, Bausteine, Laufzeitabläufe und die wichtigsten Architekturentscheidungen der Food-Mood-Web-App.

## Kapitelübersicht

| Nr. | ID | Titel | Status | Datei |
| --- | --- | --- | --- | --- |
| 1 | A01 | Einführung und Ziele | 🟡 | [A01-Einfuehrung-und-Ziele.md](A01-Einfuehrung-und-Ziele.md) |
| 2 | A02 | Randbedingungen | 🟡 | [A02-Randbedingungen.md](A02-Randbedingungen.md) |
| 3 | A03 | Kontextabgrenzung | 🟡 | [A03-Kontextabgrenzung.md](A03-Kontextabgrenzung.md) |
| 4 | A04 | Lösungsstrategie | 🟡 | [A04-Loesungsstrategie.md](A04-Loesungsstrategie.md) |
| 5 | A05 | Bausteinsicht | 🟡 | [A05-Bausteinsicht.md](A05-Bausteinsicht.md) |
| 6 | A06 | Laufzeitsicht | 🟡 | [A06-Laufzeitsicht.md](A06-Laufzeitsicht.md) |
| 7 | A07 | Verteilungssicht | 🟡 | [A07-Verteilungssicht.md](A07-Verteilungssicht.md) |
| 8 | A08 | Querschnittskonzepte | 🟡 | [A08-Querschnittskonzepte.md](A08-Querschnittskonzepte.md) |
| 9 | A09 | Architekturentscheidungen | 🟡 | [A09-Architekturentscheidungen.md](A09-Architekturentscheidungen.md) |
| 12 | A12 | Glossar | 🟡 | [A12-Glossar.md](A12-Glossar.md) |

> A10 und A11 werden in diesem Projekt bewusst nicht verwendet.

## Status Legende

| Symbol | Bedeutung |
| --- | --- |
| 🛠 | Gerüst – nur Überschriften, noch kein Inhalt vorhanden |
| 🟡 | In Bearbeitung – Inhalt wird ergänzt oder überarbeitet |
| ✅ | Entwurf fertig |

## Architekturprinzipien

- Web-App Architektur
- UserID statt Login
- OpenStreetMap als Nachbarsystem
- Hosting über Webserver und Domain
- Trennung von Frontend, Backend und Datenhaltung

## Diagramme

Alle Architekturdiagramme werden unter `/diagrams` gespeichert. Exportierte PNG-Versionen befinden sich unter `/diagrams-png`.

Diese Ordner dienen dazu, Entwurfsmodelle, Kontextdiagramme, Laufzeitdiagramme und andere visuelle Architekturartefakte strukturiert und nachvollziehbar zu verwalten.

## Überblick der Architektur-Dokumentation

Die Architektur von Food-Mood fokussiert sich auf eine leicht verständliche, modulare Webanwendung mit klarer Trennung von:

- Nutzeroberfläche und Interaktion,
- fachlicher Logik und Empfehlungsvorgängen,
- externen Datenquellen wie OpenStreetMap,
- persönlicher Datenspeicherung für Favoriten, Besuche und Bewertungen.

Die Dokumentation ist bewusst so aufgebaut, dass sie als Einstiegspunkt für Entwickler, Reviewer und Projektbeteiligte dient und den Gesamtkontext der Anwendung schnell verständlich macht.

## Hinweis zur Weiterarbeit

Die einzelnen arc42-Kapitel sind als eigene Dokumente strukturiert und können separat bearbeitet werden. Diese README bildet die zentrale Startseite für die gesamte Architektur-Dokumentation.
