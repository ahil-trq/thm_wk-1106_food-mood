
# B1 - Dialogspezifikation
Diese Datei beschreibt die Zentralen Ansichten der Foof-Mood App: Zweck, sichtbare Informationen, Eingabefelder, Aktionen, Navigation sowie Lade- Fehler- und Leerzustände. Die Skizzen sind bewusst einfach gehalten.

| ID | Maske | Zweck | Use Cases |
|---|---|---|---|
| M-00 | Einstieg | Nutzer erstellen oder laden | UC-00, UC-01 |
| M-01 | Start | Einstieg in Restaurantempfehlung | UC-03 |
| M-02 | Stimmung/Anlass | Präferenzen auswählen | UC-04 |
| M-03 | Filter | Suche eingrenzen | UC-05 |
| M-04 | Ergebnisse | Empfehlungen anzeigen | UC-06, UC-07 |
| M-05 | Restaurantdetails | Restaurant betrachten | UC-08 |
| M-06 | Favoriten | Favoriten anzeigen | UC-12 |
| M-07 | Besucht | Besuche und Bewertungen | UC-10, UC-11 |

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

**Leere Ergebnisse:** Nicht zutreffend

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

## 3. Stimmung und Anlass

**Zweck:** Der Nutzer wählt seine Stimmung oder seinen Anlass aus, welche später in die Filterung der Empfehlungen einfließt.

**Sichtbare Informationen:** Auswahlmöglichkeiten für Stimmung (gemütlich, romantisch, schnell, gesellig, neu, günstig). Anlass (Date, Familie, Freunde, Mittagspause, Uni).

**Eingabefelder:** Reine Auswahl per Klick (Eine Stimmung und einen Anlass).

**Schaltflächen/Aktionen:** Stimmungskacheln (auswählbar), Anlasskacheln (auswählbar). "Weiter" nur auswählbar, wenn beide Kacheln aktiv sind. 

**Navigation:** Filterauswahl.

**Ladezustand:** Kein Ladezustand, nur die Auswahl erfolgt.

**Fehlerzustand:** Klick auf "Weiter" ohne vollständige Auswahl. Hinweistext (Bitte wähle Stimmung und Anlass aus).

**Leere Ergebnisse:** Nicht zutreffend.

```text
----------------------------------
|    Wie ist deine Stimmung?     |
|                                |
|  ( gemütlich ) ( romantisch )  |
|  (  schnell  ) (  gesellig  )  |
|                                |
|   Für welchen Anlass?          |
|  (   Date  ) (    Familie   )  |
|  ( Freunde ) ( Mittagspause )  |
|                                |
|          [ Weiter ]            |
----------------------------------
```

## 4. Filterauswahl

**Zweck:** Nutzer grenzt die Restaurantsuche durch Filterkriterien ein, bevor die Empfehlungen berechnet werden.

**Sichtbare Informationen:** Filterkategorien: Preis (€ / €€ / €€€), Entfernung (z.B. bis 1 km / 3 km / 5 km / 10 km), Küche (Mehrfachauswahl, z.B. Italienisch, Asiatisch, Deutsch, …), Ernährung (Mehrfachauswahl, z.B. vegetarisch, vegan, glutenfrei), Mindestbewertung (z.B. ab 3 Sternen), Schalter "nur aktuell geöffnete Restaurants".

**Eingabefelder:** Auswahlfeld/Slider für Entfernung, Mehrfachauswahl Chips für Küche und Ernährung, Sterne-Auswahl für Mindestbewertung, Ein/Aus-Schalter für "nur geöffnet". Alle Filter sind optional (Standardwert: keine Einschränkung).

**Schaltflächen/Aktionen:** "Filter zurücksetzen" (alle Filter auf Standard), "Empfehlungen anzeigen" (bestätigt Auswahl und startet Berechnung).

**Navigation:** Empfehlungsliste

**Ladezustand:** Keine Ladevorgänge auf dieser Seite selbst. Der Ladezustand tritt erst nach Klick auf "Empfehlungen anzeigen" ein, sichtbar auf der nächsten Ansicht.

**Fehlerzustand:** Nicht zutreffend, da alle Filter optional sind.

**Leere Ergebnisse:** Nicht zutreffend.

```text
------------------------------------
|            Filter                |
|                                  |
| Preis:      ( € )( €€ )( €€€ )   |
| Entfernung: [ bis 5 km v ]       |
| Küche:      ( Italienisch )      |
|             ( Asiatisch )        |
| Ernährung:  ( vegetarisch )      |
| Bewertung:  [ ab ★★★ v ]        |
| [ ] nur geöffnete Restaurants    |
|                                  |
| [ Zurücksetzen ]   [ Anzeigen ]  |
------------------------------------
```

## 5. Empfehlungsliste

**Zweck:** Zeigt die anhand von Stimmung, Anlass und Filtern berechneten Restaurant Empfehlungen an. Ausgangspunkt, um ein Restaurant genauer anzusehen oder direkt zu favorisieren.

**Sichtbare Informationen:** Liste von Restaurants, je Eintrag: Name, Küche, Entfernung, Preisklasse, Bewertung (Sterne), Öffnungsstatus (geöffnet/geschlossen), Favoriten-Symbol falls zutreffend ein kleines "Schon besucht" Badge.

**Eingabefelder:** Keine. Optional eine Sortier Auswahl (z.B. nach Entfernung, Bewertung oder Empfehlungsgrad).

**Schaltflächen/Aktionen:** Restaurant antippen (öffnet Details), Favoriten Symbol direkt in der Liste antippen (Favorit setzen/entfernen, ohne Detailseite zu öffnen), "Filter anpassen" (zurück zur Filterauswahl).

**Navigation:** Restaurantdetails (bei Auswahl eines Eintrags); <- zurück zur Filterauswahl möglich.

**Ladezustand:** Ladeanzeige "Empfehlungen werden berechnet …", während die Restaurantdaten von der externen API geholt und nach Stimmung/Filtern bewertet werden.

**Fehlerzustand:** Externe API nicht erreichbar oder Zeitüberschreitung -> Hinweistext "Empfehlungen konnten nicht geladen werden" mit Button "Erneut versuchen".

**Leere Ergebnisse:** keine passenden Restaurants gefunden (z.B. Filter zu eng) -> Hinweistext "Keine passenden Restaurants gefunden. Passe deine Filter an." mit Button "Filter anpassen".

```text
--------------------------------------
|  Empfehlungen für dich             |
|                                    |
|  Trattoria Bella      ★★★★  ♥    |
|  Italienisch · 800 m · €€          |
|  geöffnet                          |
|  -----------------------------     |
|  Sushi Zen            ★★★★★ ♡   |
|  Asiatisch · 1,2 km · €€€          |
|  geöffnet                          |
|  -----------------------------     |
|  ...                               |
|                                    |
|         [ Filter anpassen ]        |
--------------------------------------
```

## 6. Restaurantsdetails

**Zweck:**  Zeigt alle Details zu einem ausgewählten Restaurant und ermöglicht es, es zu favorisieren oder als besucht zu markieren und zu bewerten.

**Sichtbare Informationen:** Name, Adresse, Küche, Preisklasse, Entfernung, Öffnungszeiten/status, Durchschnittsbewertung (Sterne), Standort auf einer kleinen Karte, Hinweise zu Ernährungsoptionen (z.B. vegetarisch verfügbar).

**Eingabefelder:** Sterne Bewertung (1–5), die erst sichtbar/aktiv wird, nachdem "Als besucht markieren" angetippt wurde, optionales kurzes Kommentarfeld zur Bewertung (kann übersprungen werden).

**Schaltflächen/Aktionen:** "Favorit hinzufügen/entfernen" (Herz-Symbol), "Als besucht markieren" (öffnet die Bewertungs-Eingabe), "Bewertung speichern", "Zurück zur Liste".

**Navigation:** <- zurück zur Empfehlungsliste bzw. Favoritenliste, je nachdem von wo aus die Ansicht geöffnet wurde.

**Ladezustand:** kurzer Ladehinweis, falls zusätzliche Detaildaten (z.B. genaue Öffnungszeiten) separat nachgeladen werden müssen.

**Fehlerzustand:** Detaildaten konnten nicht geladen werden -> Hinweistext mit "Erneut versuchen, Bewertung konnte nicht gespeichert werden (z.B. kein Netz) -> Hinweistext "Bewertung konnte nicht gespeichert werden, bitte erneut versuchen".

**Leere Ergebnisse:** Nicht zutreffend

```text
---------------------------------------
|  Beispiel Restaurant                |
|  Italienisch  €€  800m              |
|  ★★★★  (124 Bewertungen)          |
|  Babastraße 12, Frankfurt           |
|  geöffnet bis 22:00                 |
|  [ kleine Karte / Standort-Pin ]    |
|                                     |
|  [ Als besucht markieren ]          |
|   -> Bewertung: ★ ★ ★ ★ ★        |
|      Kommentar (optional): [....] m |
|      [ Bewertung speichern ]        |
|                                     |
|          [ Zurück zur Liste ]       |
---------------------------------------
```

## 7. Favoriten

**Zweck:** Übersicht aller vom Nutzer favorisierten Restaurants. Ermöglicht schnellen Zugriff auf gemerkte Orte sowie deren Verwaltung (entfernen, als besucht markieren/bewerten).

**Sichtbare Informationen:** Liste favorisierter Restaurants mit Name, Küche, Entfernung, Preisklasse, Bewertung, Öffnungsstatus. Falls bereits besucht, zusätzlich ein "Schon besucht" Badge mit der eigenen abgegebenen Bewertung.

**Eingabefelder:** Keine.

**Schaltflächen/Aktionen:** Eintrag antippen (öffnet Restaurantdetails), Favoriten Symbol antippen (entfernt direkt aus der Liste, ohne Detailseite zu öffnen), "Als besucht markieren" als Kurzweg direkt aus der Liste.

**Navigation:** -> Restaurantdetails (bei Auswahl eines Eintrags). Die Favoritenliste ist über ein permanentes Element (z.B. Symbol/Tab) von mehreren Ansichten aus erreichbar, nicht nur Teil des linearen Hauptablaufs.

**Ladezustand:** Kurzer Ladehinweis beim Öffnen.

**Fehlerzustand:** Favoriten konnten nicht geladen werden (z.B. lokaler Speicherfehler) -> Hinweistext "Favoriten konnten nicht geladen werden".

**Leere Ergebnisse:** Keine Favoriten vorhanden -> Hinweistext "Du hast noch keine Favoriten gespeichert." mit Link/Button "Zur Empfehlungssuche".

```text
----------------------------------------
|  Deine Favoriten                     |
|                                      |
|  Beispiel Restaurant      ★★★★     |
|  Italienisch · 800 m · besucht ★★★★|
|  -----------------------------       |
|  Beispiel Restaurant 2    ★★★★★   |
|  Asiatisch · 1,2 km · noch nicht     |
|     besucht                          |
----------------------------------------
```