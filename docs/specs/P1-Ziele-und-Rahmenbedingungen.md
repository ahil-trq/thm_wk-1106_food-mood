# P1 - Ziele und Rahmenbedingungen

## P1.1 Mission
Food-Mood ist eine persönliche, sprachgesteuerte Restaurant- und Mood-Discovery-App. Die Anwendung hilft einem einzelnen Nutzer, in Sekunden ein Restaurant zu finden, das zur aktuellen Stimmung, zum Anlass und zu den Rahmenbedingungen passt. Die App verbindet Nutzerpräferenzen, Standortdaten, Favoriten, frühere Besuche und Bewertungen, um eine eng fokussierte Empfehlung und einen klaren Suchfilter zu liefern.

## P1.2 Zielgruppe
- Einzelpersonen, die beim Essen entscheiden wollen, ohne lange Recherche.
- Studierende und Berufstätige mit wenig Zeit, die spontan ein passendes Lokal suchen.
- Nutzer, die ihre Stimmung und den Anlass in die Restaurantwahl einfließen lassen möchten.
- Menschen, die bereits Favoriten gespeichert haben und frühere Besuche berücksichtigen wollen.

## P1.3 Problemstellung
Viele Restaurantfinder liefern zu viele irrelevante Treffer oder erfordern, dass Nutzer viele Filter manuell setzen. Nutzer wollen nicht zwischen Bewertungen, Entfernung, Atmosphäre und persönlichen Vorlieben abwägen müssen. Die App muss schnelle, zuverlässige Entscheidungen liefern, dabei implizit den aktuellen Standort und vorherige Erfahrungen berücksichtigen.

## P1.4 Ziele des MVP
- Ein klarer Auswahlprozess, der aus Stimmung, Anlass, Verfügbarkeit und Standort ein Restaurant empfiehlt.
- Integration von Standortzugriff, um lokale Ergebnisse zu liefern.
- Unterstützung von Favoriten und Besuchshistorie zur Personalisierung.
- Bewertungseinbindung für Qualität und passende Vorschläge.
- Einfache, responsive Weboberfläche für mobile Nutzung.
- Klare, überprüfbare Ziele und Erfolgskriterien für den MVP.

## P1.5 Enthaltene Funktionen

| ID | Funktion | Beschreibung |
|----|----------|-------------|
| FN-01 | Stimmung, Anlass und Rahmenbedingungen erfassen | Der Nutzer gibt die aktuellen Kriterien über ein Formular ein. |
| FN-02 | Standort verwenden | Der aktuelle Standort schränkt die Suche auf nahe Restaurants ein. |
| FN-03 | Restaurantvorschläge anzeigen | Restaurantvorschläge werden mit Name, Bewertung, Entfernung und Kurzinformationen dargestellt. |
| FN-04 | Favoriten verwalten | Lieblingsrestaurants können gespeichert, angezeigt und entfernt werden. |
| FN-05 | Besuchshistorie führen | Vergangene Besuche werden protokolliert und bei Empfehlungen berücksichtigt. |
| FN-06 | Bewertungen anzeigen | Eigene Bewertungen und durchschnittliche Ratings werden angezeigt. |
| FN-07 | Restaurants filtern | Ergebnisse können nach Preisniveau, Distanz und Öffnungsstatus gefiltert werden. |
| FN-08 | Responsive Oberfläche bereitstellen | Die Weboberfläche ist für Smartphones und Desktopgeräte geeignet. |

## P1.6 Ausgeschlossene Funktionen
- Keine Mehrbenutzerkonten, keine Nutzerverwaltung, kein gemeinschaftliches Teilen von Listen.
- Keine vollständigen Restaurants-Reviews oder lange Textbewertungen schreiben.
- Kein Offline-Modus oder lokale Datenhaltung außerhalb der app-eigenen Favoriten.
- Keine eigenständigen Apps für iOS/Android, nur Web-App.
- Keine Berichte, Statistiken oder Exportfunktionen für externe Anwendungen.
- Keine automatische Buchung, Reservierung oder direkte Bestellfunktion.
- Keine komplexe KI-gestützte Konversation über Essensplanung hinaus.

## P1.7 Annahmen
- Der Nutzer verwendet die App als Einzelperson ohne Account-Sharing.
- Eine externe Places-API liefert Standort-basierte Restaurantdaten und Bewertungen.
- Der Zugriff auf den Standort wird vom Browser erlaubt.
- Favoriten und Besuche werden lokal bzw. im App-Backend gespeichert.
- Kurzfristige Empfehlungen sind für den Nutzer wichtiger als vollständige Langzeitplanung.
- Die Webanwendung läuft in einer modernen Browserumgebung mit JavaScript.

## P1.8 Rahmenbedingungen
- Die App muss mit geringem Entwicklungsaufwand als MVP realisierbar sein.
- Nur eine einzelne Benutzerinstanz wird unterstützt.
- Keine aufwendige Serverinfrastruktur: bevorzugt statische Web-App mit leichtem Backend.
- Stellenbewertungen und Standortdaten müssen DSGVO-konform verarbeitet werden.
- Die Lösung soll ohne eigene mobile App funktionieren.
- Externe API-Zugriffe dürfen innerhalb des nutzbaren Projektbudgets bleiben.

## P1.9 Risiken
| ID | Risiko | Gegenmaßnahme |
|----|--------|---------------|
| R-01 | Standortzugriff wird verweigert. | Fallback auf manuelle Standortauswahl oder PLZ-Eingabe. |
| R-02 | Externe Places-API liefert unvollständige oder inkonsistente Bewertungen. | Kombination mit eigenen Favoriten- und Besuchsdaten zur Stabilisierung. |
| R-03 | Favoriten und Besuche werden nicht ausreichend gepflegt. | Grundfunktionalität bleibt nutzbar, Empfehlung wird primär über Stimmung und Standort erstellt. |
| R-04 | Zu viele Treffer ohne konkrete Priorisierung. | Filter und Gewichtung auf Stimmung, Entfernung, Bewertung und Vorlieben festlegen. |
| R-05 | Responsive Oberfläche ist auf Smartphones schlecht bedienbar. | Mobile-first-Design und einfache Benutzerführung priorisieren. |

## P1.10 Messbare Erfolgskriterien
| ID | Erfolgskriterium |
|----|------------------|
| SC-01 | Der Nutzer kann eine Stimmung, einen Anlass und Standort eingeben und erhält mindestens drei relevante Restaurantvorschläge. |
| SC-02 | Favoriten lassen sich in maximal zwei Klicks speichern, anzeigen und entfernen. |
| SC-03 | Die App berücksichtigt mindestens zwei Besuchseinträge bei der nächsten Empfehlung. |
| SC-04 | Die Restaurantliste zeigt Bewertung und Entfernung für jeden Vorschlag. |
| SC-05 | Der MVP ist ohne zusätzliche Installation als Webanwendung nutzbar und lädt in unter 3 Sekunden auf mobilem Netz. |
| SC-06 | Nicht enthaltene Funktionen sind dokumentiert und die App bleibt auf die definierten MVP-Funktionen beschränkt. |
| SC-07 | Die Anwendung arbeitet mit Standort, Favoriten, Besuchen und Bewertungen als Kernkomponenten. |

