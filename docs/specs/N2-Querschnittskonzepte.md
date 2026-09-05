# N2 - Querschnittskonzepte

Diese Datei beschreibt kurz die wiederkehrenden Konzepte, die mehrere Ansichten und Funktionen von Food-Mood einheitlich betreffen.

## 1. UserID-basierte Identifikation

Da es keine klassischen Benutzerkonten gibt, identifiziert sich jeder Nutzer über eine leichtgewichtige UserID. Beim ersten Start kann eine neue UserID erstellt werden (dabei wird zusätzlich ein Name für die persönliche Begrüßung erfasst), oder es wird eine bestehende UserID eingegeben, um ein vorhandenes Profil zu laden. Über diese UserID werden Favoriten, Besuche und Bewertungen systemweit zugeordnet.
-> Abhängigkeit: D1 (Datenmodell), Objekt "Nutzer/Nutzerprofil". F2 (Anwendungsfälle), UC-00, UC-01, UC-02.

## 2. Sessionverwaltung

Nach dem Erstellen oder Laden einer UserID (M-00 Einstieg) wird diese für die aktuelle Nutzung lokal gespeichert (Session), sodass sie nicht bei jeder weiteren Aktion erneut eingegeben werden muss. Alle nachfolgenden Aktionen (Favorisieren, Besuch markieren, Bewerten) verwenden automatisch die UserID der aktiven Session. Die Session bleibt bestehen, bis der Nutzer explizit die UserID wechselt oder die App-Daten gelöscht werden.

Systemweite Kette:

```text
UserID
  → Session
    → Favoriten
    → Besuche
    → Bewertungen
```

-> Abhängigkeit: D1 (Datenmodell). F2 (Anwendungsfälle), UC-00 bis UC-02.

## 3. Standortverarbeitung

Der Standort wird entweder automatisch (Geräte-/Browser-Standort) oder manuell eingegeben ermittelt und ausschließlich zur Berechnung der aktuellen Empfehlungen verwendet.
-> Abhängigkeit: D1 (Datenmodell), Objekt "Standort". F2 (Anwendungsfälle), UC-03 "Standort bestimmen".

## 4. Datenschutz

Es werden keine sensiblen personenbezogenen Daten (E-Mail, Adresse, Telefonnummer) erhoben. Der bei der UserID-Erstellung eingegebene Name dient ausschließlich der persönlichen Begrüßung innerhalb der App und wird nicht an Dritte weitergegeben. Standortdaten liegen nur temporär im Speicher der aktuellen Sitzung vor und werden nicht dauerhaft gespeichert. Favoriten, Besuche und Bewertungen sind ausschließlich über die UserID zugeordnet.

## 5. Eingabevalidierung

App-weit gelten einheitliche Validierungsregeln:
- **Name (bei neuer UserID):** darf nicht leer sein.
- **UserID (bei bestehendem Profil):** muss einem gültigen Format entsprechen und im System vorhanden sein, sonst erscheint eine Fehlermeldung.
- **Standort (manuelle Eingabe):** darf nicht leer bleiben und muss auf einen gültigen Ort auflösbar sein.
- **Filterwerte:** werden ausschließlich aus vordefinierten Optionen gewählt, keine Freitexteingabe.
- **Bewertung:** ausschließlich über eine Sterne-Auswahl (1–5, ganzzahlig) möglich, ungültige Werte werden bereits in der Eingabemaske verhindert.
- **Kommentar zur Bewertung:** optional, es gibt keine Pflicht zur Eingabe.

## 6. Fehlerbehandlung

App-weit einheitliches Muster: verständliche, allgemeinsprachliche Fehlermeldung statt technischer Fehlercodes, ergänzt um einen "Erneut versuchen"-Button, wo sinnvoll. Konkrete Fehlerfälle:
- **Externe API nicht erreichbar** (z. B. bei Empfehlungsberechnung): Hinweistext mit "Erneut versuchen".
- **UserID nicht gefunden/ungültig:** Hinweistext "UserID nicht gefunden. Bitte prüfen oder neues Profil erstellen".
- **Standort nicht ermittelbar:** Hinweistext, automatische Weiterleitung zur manuellen Eingabe.
- **Speicherfehler** (z. B. Favorit oder Bewertung kann nicht gespeichert werden): Hinweistext mit Möglichkeit zum erneuten Versuch.
-> Abhängigkeit: F2 (Anwendungsfälle), UC-14 "API-Fehler behandeln".

## 7. Logging

Technische Fehler und wichtige Ereignisse (z. B. fehlgeschlagene API-Anfragen, fehlgeschlagene Speichervorgänge) werden serverseitig protokolliert, um Probleme im Betrieb nachvollziehen zu können. Es werden dabei keine personenbezogenen Daten (Name, Standort) geloggt, ausschließlich technische Informationen (Zeitstempel, Fehlerart).

## 8. Einheitliche Datenbehandlung

Alle nutzerbezogenen Daten (Favoriten, Besuche, Bewertungen) werden nach demselben Muster behandelt: dauerhaft gespeichert, verknüpft mit der UserID der aktiven Session, und bleiben nach einem Neustart der App erhalten. Ein Restaurant kann jederzeit favorisiert oder die Favorisierung entfernt werden. Eine Bewertung ist erst möglich, nachdem ein Restaurant zuvor als "besucht" markiert wurde.
-> Abhängigkeit: D1 (Datenmodell), Objekte "Favorit", "Besuch", "Bewertung". F2 (Anwendungsfälle), UC-09, UC-10, UC-11.