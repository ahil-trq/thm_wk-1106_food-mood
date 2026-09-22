# A02 - Randbedingungen

## 2.1 Einleitung

Die Randbedingungen legen die nicht verhandelbaren Grenzen für die Architektur von Food-Mood fest. Sie ergeben sich aus fachlichen Anforderungen, technischen Voraussetzungen und den Projektkonventionen. Diese Einschränkungen definieren den Designraum, in dem die Architektur entwickelt werden muss.

Food-Mood ist als Web-App konzipiert und darf daher nicht in einem völlig frei wählbaren, technisch offenen Rahmen entstehen. Die wesentlichen Vorgaben betreffen die Benutzeridentifikation, die Deployment-Umgebung, die Datenhaltung sowie die Nutzung externer Restaurantdaten.

## 2.2 Fachliche Randbedingungen

Die fachlichen Randbedingungen beschreiben, was das System nicht leisten soll und welche Grundprinzipien für die Nutzung gelten. Sie sind eng mit den fachlichen Zielen und den Anwendungsfällen verknüpft, insbesondere mit [P1 – Ziele und Rahmenbedingungen](../specs/P1-Ziele-und-Rahmenbedingungen.md), [F2 – Anwendungsfälle](../specs/F2-Anwendungsfaelle.md) und [F3 – Anwendungsfunktionen](../specs/F3-Anwendungsfunktionen.md).

| ID | Randbedingung | Beschreibung / Quelle |
| --- | --- | --- |
| FAC-01 | Kein Login-System | Food-Mood verwendet kein klassisches Login mit Benutzername, E-Mail und Passwort. Stattdessen wird ein einfaches UserID-Konzept verwendet, damit der Nutzer ohne aufwendige Registrierung identifizierbar bleibt. Siehe auch [A08 – Querschnittskonzepte](A08-Querschnittskonzepte.md) zum UserID-Konzept. |
| FAC-02 | UserID als Identifikationsmodell | Jeder Nutzer erhält eine eindeutige UserID, mit der Favoriten, Besuche und Bewertungen gespeichert und wieder geladen werden können. Die UserID darf nicht als klassischer Account interpretiert werden. |
| FAC-03 | Keine Reservierung | Die App unterstützt keine Tisch- oder Restaurantreservierung. Sie dient ausschließlich der Auswahl und Empfehlung eines passenden Lokals. |
| FAC-04 | Keine Bezahlung | Food-Mood bietet keine Bezahlfunktion, kein Bestellsystem und keine Buchungsfunktion an. Die App ist kein Service für Transaktionen, sondern ein Empfehlungssystem. |
| FAC-05 | Keine Mehrbenutzer-Accounts | Das System ist bewusst auf Einzelpersonen ausgelegt. Es gibt keine Rollen, keine Gruppen, keine gemeinsamen Profile und keine Mehrbenutzerverwaltung. |
| FAC-06 | Fokus auf Restaurantempfehlung | Der Kernnutzen besteht in der Berechnung passender Restaurantvorschläge auf Basis von Standort, Stimmung, Anlass, Vorlieben und Filterkriterien. |
| FAC-07 | Persönliche Daten nur in begrenzter Form | Favoriten, Besuche und Bewertungen sind relevant, aber die Anwendung soll keine umfangreiche Profilverwaltung oder komplexe personenbezogene Analyse bieten. |

## 2.3 Technische Randbedingungen

Die technischen Randbedingungen beschreiben die grundlegenden Architekturentscheidungen und die notwendigen Betriebsumgebungen. Sie sind direkt mit der technischen Umsetzung und der Bereitstellung verknüpft, etwa mit [A04 – Lösungsstrategie](A04-Loesungsstrategie.md), [A05 – Bausteinsicht](A05-Bausteinsicht.md), [A07 – Verteilungssicht](A07-Verteilungssicht.md) und [S1 – Nachbarsysteme und externe APIs](../specs/S1-Nachbarsysteme-und-APIs.md).

| ID | Randbedingung | Beschreibung / Quelle |
| --- | --- | --- |
| TEC-01 | Web-App statt native App | Food-Mood wird als Webanwendung bereitgestellt und läuft im Browser. Eine native iOS- oder Android-App ist nicht Bestandteil des Projekts. Siehe auch [P1 – Ziele und Rahmenbedingungen](../specs/P1-Ziele-und-Rahmenbedingungen.md). |
| TEC-02 | Webserver als Bereitstellungsrolle | Die Anwendung wird über einen Webserver mit öffentlich erreichbarer Domain bereitgestellt. Der Betrieb erfolgt in einer einfachen Hosting-Umgebung ohne komplexe Container- oder Microservice-Architektur. |
| TEC-03 | Domain und öffentliche Verfügbarkeit | Die App wird über eine Domain erreichbar sein. Das Deployment muss deshalb mit einer stabilen, im Internet nutzbaren URL funktionieren. Weitere Details folgen in [A07 – Verteilungssicht](A07-Verteilungssicht.md). |
| TEC-04 | Datenbank im Backend | Für die persistenten Nutzerdaten werden Favoriten, Besuche und Bewertungen in einer Datenbank gespeichert. Die Speicherung muss zuverlässig und leicht wartbar erfolgen. Siehe auch [D1 – Datenmodell](../specs/D1-Datenmodell.md). |
| TEC-05 | OpenStreetMap als Datenquelle | Restaurant- und Geodaten werden aus OpenStreetMap bezogen. Dabei werden nur relevante gastronomische Einträge verarbeitet und in interne Datenstrukturen überführt. Detaillierte fachliche Grenzen sind in [S1 – Nachbarsysteme und externe APIs](../specs/S1-Nachbarsysteme-und-APIs.md) beschrieben. |
| TEC-06 | Externe Daten müssen validiert werden | Die Daten aus OpenStreetMap sind nicht immer vollständig oder konsistent. Die App muss fehlerhafte, unvollständige oder unzuverlässige Einträge tolerieren und verarbeitbar machen. |
| TEC-07 | Browser-Standortzugriff | Die Standortbestimmung kann über den Browser erfolgen. Falls der Zugriff verweigert wird, muss ein manueller Standorteintrag als Fallback möglich sein. |
| TEC-08 | Trennung von Frontend, Backend und Datenspeicherung | Die Architektur soll eine klare Trennung zwischen Benutzeroberfläche, fachlicher Logik und persistenter Datenhaltung unterstützen. Siehe auch [A05 – Bausteinsicht](A05-Bausteinsicht.md). |
| TEC-09 | einfache, skalierbare Betriebsumgebung | Die App soll ohne aufwendige Infrastruktur oder komplexe Betriebskonfiguration realisierbar sein. Eine kleine, verständliche Infrastruktur ist bevorzugt. |

## 2.4 Projektorganisatorische Randbedingungen

| ID | Randbedingung | Beschreibung / Quelle |
| --- | --- | --- |
| ORG-01 | Einzelprojekt | Food-Mood wird als kleines, überschaubares Projekt entwickelt. Die Architektur muss deshalb klar, verständlich und leicht erweiterbar bleiben. |
| ORG-02 | Fokus auf MVP | Die Anwendung verfolgt ein realistisches Mindestprodukt mit relevanter Kernfunktionalität; Erweiterungen, die nicht direkt zur Kernfunktion beitragen, sind nachrangig. |
| ORG-03 | Wartbare Architektur statt komplexe Technik | Die Architektur soll nicht durch künstlich komplexe Technologien überladen werden. Der Schwerpunkt liegt auf Verständlichkeit und langfristiger Wartbarkeit. |
| ORG-04 | Dokumentation als Teil der Architektur | Die fachlichen und technischen Rahmenbedingungen werden dokumentiert, damit spätere Erweiterungen und Entscheidungen nachvollziehbar bleiben. |

## 2.5 Konventionen und Regeln

Die Projektkonventionen werden hier als verbindliche Regeln im Architekturkontext festgehalten. Sie ergänzen die fachlichen und technischen Randbedingungen und sind zugleich mit den Spezifikationen verknüpft, insbesondere mit [P1 – Ziele und Rahmenbedingungen](../specs/P1-Ziele-und-Rahmenbedingungen.md), [P2 – Fachlicher Architekturüberblick](../specs/P2-architekturueberblick.md), [N1 – Nichtfunktionale Anforderungen](../specs/N1-Nichtfunktionale-Anforderungen.md) und [S1 – Nachbarsysteme und externe APIs](../specs/S1-Nachbarsysteme-und-APIs.md).

| ID | Regel | Beschreibung |
| --- | --- | --- |
| CONV-01 | Keine klassischen Benutzerkonten | Die App verwendet keine E-Mail-, Passwort- oder Rollenverwaltung. Die Nutzeridentifikation erfolgt über eine UserID. Siehe auch [A08 – Querschnittskonzepte](A08-Querschnittskonzepte.md). |
| CONV-02 | Kein vollständiger Geschäftsbetrieb | Food-Mood ist kein Restaurantmanagementsystem, kein Booking-Service und keine Zahlungslösung. Das ist ebenfalls durch die fachlichen Ziele in [P1 – Ziele und Rahmenbedingungen](../specs/P1-Ziele-und-Rahmenbedingungen.md) begrenzt. |
| CONV-03 | Nutzung eines öffentlichen Datenproviders | OpenStreetMap ist die zentrale externe Informationsquelle für Restaurantdaten. Der Systemaufbau muss diese Abhängigkeit berücksichtigen. Die fachlichen Grenzen dazu sind in [S1 – Nachbarsysteme und externe APIs](../specs/S1-Nachbarsysteme-und-APIs.md) beschrieben. |
| CONV-04 | Fokus auf Empfehlung statt on-demand Transactions | Die App soll Empfehlungen in kurzer Zeit liefern, nicht für längere Checkout- oder Bestellprozesse eingesetzt werden. |
| CONV-05 | Verzicht auf überflüssige Komplexität | Die Architektur soll möglichst schlank bleiben und nur diejenigen Komponenten enthalten, die für die Empfehlung und das Nutzerprofil erforderlich sind. |

## 2.6 Zusammenfassung

Food-Mood ist durch mehrere wichtige Randbedingungen gekennzeichnet: Es ist eine Web-App ohne klassisches Login, arbeitet mit einer UserID statt mit Accounts und basiert auf klaren fachlichen Grenzen. Technisch ist die Anwendung an einen Webserver, eine öffentliche Domain, eine Datenbank und OpenStreetMap als externe Datenquelle gebunden. Diese Grenzen definieren den Entwurfsraum der Architektur und sollen in den folgenden Kapiteln weiter konkretisiert werden.

---

Diese Randbedingungen bilden die Grundlage für die architektonische Gestaltung von Food-Mood und legen die wesentlichen fachlichen und technischen Grenzen fest.
