## F2 – Anwendungsfälle

## Einleitung

Dieses Dokument beschreibt die fachlichen Anwendungsfälle (Use Cases) der Anwendung **Food-Mood**. Jeder Use Case beschreibt eine einzelne Funktion aus Sicht des Benutzers.

---

## UC-01 Standort automatisch bestimmen

## Ziel
Den aktuellen Standort des Benutzers automatisch ermitteln.

## Akteur
Benutzer

## Auslöser
Die App wird gestartet.

## Vorbedingungen
- Standortfreigabe wurde erteilt.
- GPS ist verfügbar.

## Hauptablauf
1. Benutzer startet die App.
2. Die App fordert die Standortfreigabe an.
3. Der Benutzer erlaubt den Zugriff.
4. Die App bestimmt den Standort.
5. Der Standort wird für die Restaurantsuche verwendet.

## Alternativablauf
Der Standort kann nicht genau bestimmt werden. Die App versucht die Standortermittlung erneut.

## Fehlerfälle
Standortdienst nicht verfügbar.

## Ergebnis
Der aktuelle Standort wurde erfolgreich übernommen.

## Akzeptanzkriterien
- Standort wird automatisch übernommen.
- Der Benutzer muss keine Adresse eingeben.

---

## UC-02 Standort manuell eingeben

## Ziel
Eine Restaurantsuche ohne Standortfreigabe ermöglichen.

## Akteur
Benutzer

## Auslöser
Standortfreigabe wurde verweigert.

## Vorbedingungen
Keine.

## Hauptablauf
1. Die App zeigt ein Eingabefeld.
2. Benutzer gibt Ort oder Adresse ein.
3. Die App übernimmt den Standort.

## Alternativablauf
Der Benutzer wählt einen vorgeschlagenen Ort.

## Fehlerfälle
Adresse wird nicht gefunden.

## Ergebnis
Der manuelle Standort wird verwendet.

## Akzeptanzkriterien
- Eine Restaurantsuche ist ohne GPS möglich.

---

## UC-03 Stimmung auswählen

## Ziel
Die gewünschte Stimmung festlegen.

## Akteur
Benutzer

## Auslöser
Standort wurde festgelegt.

## Vorbedingungen
Standort vorhanden.

## Hauptablauf
1. Die App zeigt verfügbare Stimmungen.
2. Benutzer wählt eine Stimmung.
3. Die Auswahl wird gespeichert.

## Alternativablauf
Der Benutzer ändert seine Auswahl.

## Fehlerfälle
Keine Stimmung ausgewählt.

## Ergebnis
Die Stimmung ist gespeichert.

## Akzeptanzkriterien
- Genau eine Stimmung ist ausgewählt.

---

## UC-04 Anlass auswählen

## Ziel
Den Anlass der Restaurantsuche festlegen.

## Akteur
Benutzer

## Auslöser
Nach der Stimmungsauswahl.

## Vorbedingungen
Stimmung wurde ausgewählt.

## Hauptablauf
1. Die App zeigt mögliche Anlässe.
2. Benutzer wählt einen Anlass.

## Alternativablauf
Benutzer überspringt diesen Schritt.

## Fehlerfälle
Keine.

## Ergebnis
Der Anlass wird gespeichert oder ausgelassen.

## Akzeptanzkriterien
- Anlass kann optional gewählt werden.

---

## UC-05 Filter setzen

## Ziel
Die Restaurantsuche eingrenzen.

## Akteur
Benutzer

## Auslöser
Vor der Suche.

## Vorbedingungen
Standort vorhanden.

## Hauptablauf
1. Benutzer öffnet Filter.
2. Preis, Entfernung oder Küche werden ausgewählt.
3. Filter werden gespeichert.

## Alternativablauf
Keine Filter auswählen.

## Fehlerfälle
Ungültige Filterkombination.

## Ergebnis
Filter werden übernommen.

## Akzeptanzkriterien
- Filter beeinflussen die Suche.

---

## UC-06 Empfehlungen berechnen

## Ziel
Passende Restaurants finden.

## Akteur
System

## Auslöser
Benutzer startet die Suche.

## Vorbedingungen
Standort vorhanden.

## Hauptablauf
1. Suchanfrage wird erstellt.
2. API wird aufgerufen.
3. Restaurants werden empfangen.
4. Ergebnisse werden bewertet.
5. Ergebnisse werden sortiert.

## Alternativablauf
Keine passenden Restaurants gefunden.

## Fehlerfälle
API nicht erreichbar.

## Ergebnis
Empfehlungsliste wurde erstellt.

## Akzeptanzkriterien
- Ergebnisse basieren auf Standort, Stimmung und Filtern.

---

## UC-07 Ergebnisse anzeigen

## Ziel
Gefundene Restaurants anzeigen.

## Akteur
Benutzer

## Auslöser
Empfehlungen wurden berechnet.

## Vorbedingungen
Mindestens ein Restaurant vorhanden.

## Hauptablauf
1. Liste wird angezeigt.
2. Benutzer kann scrollen.
3. Benutzer wählt ein Restaurant.

## Alternativablauf
Keine Ergebnisse vorhanden.

## Fehlerfälle
Darstellungsfehler.

## Ergebnis
Restaurantliste ist sichtbar.

## Akzeptanzkriterien
- Alle gefundenen Restaurants werden angezeigt.

---

## UC-08 Restaurantdetails anzeigen

## Ziel
Informationen zu einem Restaurant anzeigen.

## Akteur
Benutzer

## Auslöser
Restaurant ausgewählt.

## Vorbedingungen
Restaurant vorhanden.

## Hauptablauf
1. Detailseite öffnen.
2. Informationen anzeigen.

## Alternativablauf
Restaurantdaten werden aktualisiert.

## Fehlerfälle
Details konnten nicht geladen werden.

## Ergebnis
Restaurantinformationen werden angezeigt.

## Akzeptanzkriterien
- Name, Adresse und Bewertung werden angezeigt.

---

## UC-09 Restaurant favorisieren

## Ziel
Restaurant speichern.

## Akteur
Benutzer

## Auslöser
Button „Favorit" auswählen.

## Vorbedingungen
Restaurantdetails geöffnet.

## Hauptablauf
1. Favoritenbutton drücken.
2. Restaurant speichern.

## Alternativablauf
Favorit wieder entfernen.

## Fehlerfälle
Speichern fehlgeschlagen.

## Ergebnis
Restaurant erscheint in Favoriten.

## Akzeptanzkriterien
- Favoritenliste wird aktualisiert.

---

## UC-10 Restaurant als besucht markieren

## Ziel
Besuchten Restaurantbesuch speichern.

## Akteur
Benutzer

## Auslöser
Restaurantdetails geöffnet.

## Vorbedingungen
Restaurant vorhanden.

## Hauptablauf
1. Benutzer markiert Restaurant als besucht.
2. Status wird gespeichert.

## Alternativablauf
Markierung wieder entfernen.

## Fehlerfälle
Speichern fehlgeschlagen.

## Ergebnis
Restaurant gilt als besucht.

## Akzeptanzkriterien
- Restaurant erscheint unter „Besucht".

---

## UC-11 Eigene Bewertung abgeben

## Ziel
Ein besuchtes Restaurant bewerten.

## Akteur
Benutzer

## Auslöser
Restaurant wurde besucht.

## Vorbedingungen
Restaurant ist als besucht markiert.

## Hauptablauf
1. Sterne auswählen.
2. Optional Kommentar schreiben.
3. Bewertung speichern.

## Alternativablauf
Nur Sterne vergeben.

## Fehlerfälle
Bewertung konnte nicht gespeichert werden.

## Ergebnis
Bewertung wurde gespeichert.

## Akzeptanzkriterien
- Bewertung ist nur nach einem Besuch möglich.
- Sternebewertung wird gespeichert.

---

## UC-12 Favoriten anzeigen

## Ziel
Alle gespeicherten Restaurants anzeigen.

## Akteur
Benutzer

## Auslöser
Favoriten öffnen.

## Vorbedingungen
Mindestens ein Favorit vorhanden.

## Hauptablauf
1. Favoritenliste öffnen.
2. Restaurants anzeigen.

## Alternativablauf
Keine Favoriten vorhanden.

## Fehlerfälle
Favoriten konnten nicht geladen werden.

## Ergebnis
Favoriten werden angezeigt.

## Akzeptanzkriterien
- Alle gespeicherten Favoriten werden angezeigt.

---

## UC-13 Besuchte Restaurants anzeigen

## Ziel
Alle besuchten Restaurants anzeigen.

## Akteur
Benutzer

## Auslöser
Bereich „Besucht" öffnen.

## Vorbedingungen
Mindestens ein Restaurant besucht.

## Hauptablauf
1. Liste öffnen.
2. Besuchte Restaurants anzeigen.

## Alternativablauf
Keine Einträge vorhanden.

## Fehlerfälle
Daten konnten nicht geladen werden.

## Ergebnis
Liste besuchter Restaurants wird angezeigt.

## Akzeptanzkriterien
- Alle besuchten Restaurants werden angezeigt.

---

## UC-14 API-Fehler behandeln

## Ziel
Den Benutzer über Fehler informieren.

## Akteur
System

## Auslöser
API antwortet nicht oder liefert einen Fehler.

## Vorbedingungen
Suchanfrage wurde gestartet.

## Hauptablauf
1. Fehler erkennen.
2. Fehlermeldung anzeigen.
3. Benutzer kann erneut suchen.

## Alternativablauf
Automatischer neuer Versuch.

## Fehlerfälle
API dauerhaft nicht erreichbar.

## Ergebnis
Der Benutzer wird informiert.

## Akzeptanzkriterien
- Eine verständliche Fehlermeldung wird angezeigt.
- Der Benutzer kann die Suche erneut starten.