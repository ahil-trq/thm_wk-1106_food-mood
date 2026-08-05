
# B1 - Dialogspezifikation
Diese Datei beschreibt die Zentralen Ansichten der Foof-Mood App: Zweck, sichtbare Informationen, Eingabefelder, Aktionen, Navigation sowie Lade- Fehler- und Leerzustände. Die Skizzen sind bewusst einfach gehalten.
## 1. Startseite

**Zweck:** Hier beginnt der Einstiegspunkt der App. Der Benutzer kann mit der Emfehlungssuche beginnen.

**Sichtbare Informationen:** App-Name "Food-Mood", Slogan "Dein Mood, dein Biss", Button, um die Suche zu starten.

**Eingabefelder:** keine.

**Schaltflächen/Aktionen:** "Los geht's" / "Restaurant finden" -> startet den Ablauf und führt zur Standortfreigabe.

**Navigation:** Standortfreigabe.

**Ladezustand:** keine.

**Fehlerzustand:** keine.

**Leere Ergebnisse:** Nicht zutreffend.

```Text
-----------------------------------------------------
|                    Food-Mood                      |
|               Dein Mood, dein Biss                |
|                                                   |
|         [ Los geht's / Restaurant finden]         |
-----------------------------------------------------
```

## 2. Standortfreigabe

**Zweck:** Standort des Nutzers wird ermittelt, um passende Restaurants in der Nähe zu finden.

**Sichtbare Informationen:** Hinweistext, warum der Standort gebraucht wird z.B. "Wir brauchen deinen Standort, um Restaurants in deiner Nähe zu finden". Button für automatische Freigabe. Alternative für manuelle Eingabe.

**Eingabefelder:** Textfeld "Ort oder Adresse eingeben". Nutzbar, wenn der Nutzer die automatische Freigabe ablehnt oder lieber manuell eingeben möchte.

**Schaltflächen/Aktionen:** "Standort freigeben" (Standort des Geräts wird gefragt), "Ort manuell eingeben" (öffnet das Textfeld), "Weiter" (bestätigt die manuelle Eingabe).

**Navigation:** Stimmung und Anlass (sobald ein Standort, automatisch oder manuell, feststeht)

**Ladezustand:** Ladehinweis "Standort wird ermittelt".

**Fehlerzustand:** Standortfreigabe abgelehnt. Hinweistext ("Standort konnte nicht ermittelt werden"). Automatische Weiterleitung zur manuellen Eingabe.

**Leere Ergebnisse:** nicht zutreffend

```text
----------------------------------
|       Wo bist du gerade?       |
|                                |
|     [ Standort freigeben ]     |
|                                |
|   oder Ort manuell eingeben:   |
|   [ z.B. Frankfurt, Zeil 1 ]   |
|                                |
|            [ Weiter ]          |
----------------------------------
```