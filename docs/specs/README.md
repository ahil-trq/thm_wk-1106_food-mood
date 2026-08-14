# Food-Mood — Spezifikation

Dieses Dokument ist der Orchestrator der Spezifikation für Food-Mood. Es folgt dem Bausteinmodell von Johannes Siedersleben und gibt einen Überblick darüber, welche Bausteine existieren, welche bereits geschrieben sind und welche bewusst nicht anwendbar sind.

---

## E1 — Leseanleitung

### Zielgruppen
- Der Anwender / Endnutzer — um zu verstehen, was Food-Mood macht und warum.
- Zukünftige Maintainer (menschlich oder KI) — um das Projekt anhand einer stabilen konzeptionellen Landkarte zu erschließen.
- Gutachter und Prüfer — um Umfang, Rahmenbedingungen und Entscheidungen unabhängig vom Quellcode beurteilen zu können.

### Wie lesen

1. Beginne mit **P1** — Ziele, Scope, Randbedingungen und Erfolgskriterien.
2. Fahre mit **P2** fort — das strukturelle Grundgerüst, das alles weitere einrahmt.
3. Lies **F1–F3** für die funktionale Perspektive (Prozesse, Use Cases, Funktionen).
4. Nutze **D1–D2** als Datenreferenz beim Lesen der anderen Bausteine.
5. Konsultiere **B1** für die Benutzeroberfläche, **S3** für Inbetriebnahme/Rollout und **N1/N2** für Qualitäts- und Querschnittsthemen.
6. **E2** ist das Glossar — Begriffe hier bei Bedarf nachschlagen.

### Konventionen
- Die Bausteine sind durch die Siedersleben-Codes gekennzeichnet (`P1`, `F2`, …).
- Ein Baustein entspricht einer Datei: `<code>-<topic>.md`.
- Die Spezifikation beschreibt **was** das System ist und **warum**, nicht die technische Umsetzung.
- Sprache: Deutsch. Die deutschen Bausteinnamen bleiben für die Nachvollziehbarkeit erhalten.

### Statuslegende für die Index-Tabelle

| Symbol | Bedeutung |
|--------|----------|
| ✅ | Baustein existiert in diesem Verzeichnis. |
| 🛠 | Baustein ist geplant, aber noch nicht geschrieben. |
| ⛔ | Baustein ist für Food-Mood nicht anwendbar (Rationale weiter unten). |

---

## Bausteinindex

### 1. Projektfundamente

| Baustein | Titel | Status | Datei |
|---------|-------|--------|------|
| P1 | Ziele und Rahmenbedingungen | ✅ | [`P1-Ziele-und-Rahmenbedingungen.md`](P1-Ziele-und-Rahmenbedingungen.md) |
| P2 | Architekturüberblick | ✅ | [`P2-architekturueberblick.md`](P2-architekturueberblick.md) |

### 2. Prozesse und Funktionen

| Baustein | Titel | Status | Datei |
|---------|-------|--------|------|
| F1 | Geschäftsprozesse | ✅ | [`F1-Geschaeftsprozesse.md`](F1-Geschaeftsprozesse.md) |
| F2 | Anwendungsfälle | ✅ | [`F2-Anwendungsfaelle.md`](F2-Anwendungsfaelle.md) |
| F3 | Anwendungsfunktionen | ✅ | [`F3-Anwendungsfunktionen.md`](F3-Anwendungsfunktionen.md) |

### 3. Daten

| Baustein | Titel | Status | Datei |
|---------|-------|--------|------|
| D1 | Datenmodell | ✅ | [`D1-Datenmodell.md`](D1-Datenmodell.md) |
| D2 | Datentypenkatalog | ✅ | [`D2-Datentypen.md`](D2-Datentypen.md) |

### 4. Benutzeroberfläche

| Baustein | Titel | Status | Datei |
|---------|-------|--------|------|
| B1 | Dialogspezifikation | ✅ | [`B1-Dialogspezifikation.md`](B1-Dialogspezifikation.md) |
| B2 | Batch | ⛔ | — |
| B3 | Druckausgabe | ⛔ | — |

### 5. Schnittstellen zu Nachbar- und Altsystemen

| Baustein | Titel | Status | Datei |
|---------|-------|--------|------|
| S1 | Nachbarsysteme | ✅ | [`S1-Nachbarsysteme-und-APIs.md`](S1-Nachbarsysteme-und-APIs.md) |
| S2 | Datenmigration | ⛔ | — |
| S3 | Inbetriebnahme / Rollout | ✅ | [`S3-Inbetriebnahme.md`](S3-Inbetriebnahme.md) |

### 6. Querschnittsthemen

| Baustein | Titel | Status | Datei |
|---------|-------|--------|------|
| N1 | Nichtfunktionale Anforderungen | ✅ | [`N1-Nichtfunktionale-Anforderungen.md`](N1-Nichtfunktionale-Anforderungen.md) |
| N2 | Querschnittskonzepte | ✅ | [`N2-Querschnittskonzepte.md`](N2-Querschnittskonzepte.md) |

### 7. Ergänzende Bausteine

| Baustein | Titel | Status | Datei |
|---------|-------|--------|------|
| E1 | Leseanleitung | ✅ | dieses Dokument |
| E2 | Glossar | ✅ | [`E2-Glossar.md`](E2-Glossar.md) |

---

## Nicht anwendbare Bausteine

Die folgenden Bausteine des Siedersleben-Modells werden für Food-Mood bewusst nicht erstellt. Die Gründe sind hier dokumentiert.

### B2 — Batch
Food-Mood hat keine Batchverarbeitung. Das MVP ist eine interaktive Webanwendung ohne geplante Hintergrundjobs, Scheduler oder Worker.

### B3 — Druckausgabe
Food-Mood erzeugt keine gedruckten Berichte, PDFs oder sonstige Print-Artefakte. Die Ausgabe erfolgt ausschließlich über die Bildschirmoberfläche.

### S2 — Datenmigration
Food-Mood ist ein Greenfield-Projekt ohne Vorgängersystem und ohne vorhandene Altdaten. Die Erstinbetriebnahme beginnt mit einem leeren Datenspeicher.

---

## Anmerkungen
- `S1` ist jetzt als separates Spezifikationsdokument vorhanden und beschreibt die externen Dienste sowie deren fachliche Erwartungen. Nachbarsysteme sind damit konsistent dokumentiert.
