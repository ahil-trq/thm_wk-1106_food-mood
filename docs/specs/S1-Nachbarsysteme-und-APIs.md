# S1 – Nachbarsysteme und externe APIs

## S1.1 Zweck

Food-Mood benötigt externe Dienste, um einen Standort zu bestimmen, eine manuelle Ortseingabe aufzulösen und Restaurants im gewählten Umkreis zu finden. Dieses Dokument legt die fachlichen Erwartungen an diese Nachbarsysteme fest. Die eigene Food-Mood-Datenbank bleibt für anonyme Nutzerkennungen, Favoriten, Besuche und eigene Bewertungen verantwortlich.

## S1.2 Entscheidung für die erste Version

Die erste Version enthält einen Preisfilter und die Stimmung `GUENSTIG`. Deshalb wird die **Google Places API** als Restaurantdatenquelle verwendet. Sie kann vorhandene Preisstufen liefern und bei einer Textsuche nach Preisstufen filtern. Die Restaurantabfrage wird ausschließlich über das Backend ausgeführt.

Externe Daten können trotzdem unvollständig sein. Fehlende Preisstufen, Öffnungsinformationen oder Ernährungsangaben werden als unbekannt behandelt und nicht erfunden. Restaurants mit unbekannter Preisstufe werden bei einem aktiven Preisfilter nicht als passend ausgegeben.

Bewertungen, die Benutzer nach einem Besuch in Food-Mood abgeben, werden in der eigenen Datenbank gespeichert. Der Bewertungsfilter der ersten Version bezieht sich auf diese eigenen Food-Mood-Bewertungen. Externe Rezensionstexte werden nicht übernommen.

## S1.3 Übersicht der Nachbarsysteme

| System | Aufgabe in Food-Mood | Ein-/Ausgaben | Verpflichtend in Version 1 |
|---|---|---|---|
| Browser-Geolocation | aktuellen Standort nach Zustimmung ermitteln | Ausgabe: Breiten- und Längengrad sowie Genauigkeit | ja, mit manueller Alternative |
| Nominatim Search API | manuell eingegebenen Ort oder Adresse in Koordinaten umwandeln | Eingabe: Suchtext; Ausgabe: mögliche Orte mit Koordinaten und Anzeigename | ja |
| Google Places API – Text Search (New) | gastronomische Orte im Umkreis suchen und vorhandene Preisstufen liefern | Eingabe: Koordinaten, Radius, Restauranttyp und Filter; Ausgabe: Place-Datensätze | ja |

Eine Kartenanzeige ist nicht Teil der festgelegten ersten Version. Sie kann später ergänzt werden, ohne die Kernsuche zu verändern.

## S1.4 Browser-Geolocation

### Fachlicher Vertrag

1. Die Anwendung erklärt zuerst, warum der Standort benötigt wird.
2. Nach einer Benutzeraktion fordert der Browser die Standortfreigabe an.
3. Bei Zustimmung übernimmt Food-Mood Koordinaten und Genauigkeit in ein temporäres `Location`-Objekt.
4. Bei Ablehnung, Zeitüberschreitung oder fehlender Browserunterstützung wird eine manuelle Ortseingabe angeboten.
5. Die Position wird nicht dauerhaft gespeichert.

### Fehlerfälle

- Berechtigung verweigert
- Position nicht verfügbar
- Zeitüberschreitung
- unzureichend genaue Position

Keiner dieser Fälle darf die App dauerhaft blockieren. Der Benutzer kann stattdessen einen Ort manuell eingeben.

## S1.5 Nominatim Search API

### Zweck

Nominatim löst einen manuell eingegebenen Ort, eine Postleitzahl oder eine Adresse in geografische Koordinaten auf. Der Dienst wird nicht für die Restaurantabfrage verwendet.

### Benötigte Anfrageinformationen

- freier Suchtext des Benutzers
- Ausgabeformat JSON
- höchstens fünf Ergebnisse
- optionale Einschränkung auf Deutschland

### Benötigte Ergebnisinformationen

- Anzeigename
- Breiten- und Längengrad

Die öffentliche Nominatim-Instanz wird mit höchstens einer Anfrage pro Sekunde verwendet. Food-Mood sendet einen identifizierenden `User-Agent` oder HTTP-Referer, zeigt die vorgeschriebene OpenStreetMap-Attribution und speichert identische Suchergebnisse vorübergehend im Cache. Es gibt kein Autocomplete bei jedem Tastendruck; die Anfrage startet erst nach dem Absenden.

### Fehler- und Leerfälle

- keine Treffer: Eingabe korrigieren oder anderen Ort suchen
- Dienst nicht erreichbar: verständliche Meldung und „Erneut versuchen“ anzeigen
- mehrere plausible Treffer: höchstens fünf Ergebnisse zur Auswahl anzeigen
- Rate-Limit erreicht: keine sofortige Wiederholungsschleife starten

## S1.6 Google Places API

### Zweck und Endpunkt

Die Restaurantsuche verwendet **Text Search (New)** über den Backend-Endpunkt:

`POST https://places.googleapis.com/v1/places:searchText`

Der Suchtext beschreibt gastronomische Orte. Koordinaten und Radius begrenzen den Suchbereich. Der API-Schlüssel wird ausschließlich im Backend aus einer Umgebungsvariable gelesen und niemals in das Repository oder an den Browser ausgeliefert.

### Anfrageinformationen

- `textQuery`, beispielsweise „restaurants“
- Standort und Suchradius als räumliche Begrenzung
- gastronomischer `includedType`, soweit für die Anfrage geeignet
- ausgewählte `priceLevels`, falls der Preisfilter aktiv ist
- `openNow`, falls nur geöffnete Restaurants gesucht werden
- Sprache und Region für eine passende deutsche Darstellung
- eine ausdrücklich festgelegte Field Mask

Die Field Mask fordert nur tatsächlich benötigte Felder an. Ein Platzhalter `*` wird in der produktiven Anfrage nicht verwendet, weil unnötige Felder Kosten und Datenmenge erhöhen.

### Benötigte Ergebnisfelder

| Google-Places-Feld | Verwendung in Food-Mood | Umgang mit fehlendem Wert |
|---|---|---|
| `id` | `ProviderPlaceId` im externen Restaurantschlüssel | Ergebnis ohne ID verwerfen |
| `displayName` | Restaurantname | Ergebnis ohne Namen verwerfen |
| `location` | Entfernung zum Suchstandort | Ergebnis ohne Koordinaten verwerfen |
| `formattedAddress` | Anschrift anzeigen | Feld ausblenden |
| `primaryType`, `types` | Restaurantart, Küche und Mood-Regeln | nur vorhandene Typen verwenden |
| `priceLevel` | Preisfilter und Stimmung `GUENSTIG` | `PriceLevel.UNKNOWN` |
| `currentOpeningHours` | Filter „geöffnet“ und Anzeige | `OpenState.UNKNOWN` |
| `servesVegetarianFood` | Ernährungsfilter, soweit vorhanden | `TriState.UNKNOWN` |
| `websiteUri`, `nationalPhoneNumber` | optionale Restaurantdetails | Feld ausblenden |

Die anbieterbezogene Place-ID wird zusammen mit `RestaurantProvider.GOOGLE_PLACES` als `ExternalRestaurantKey` verwendet. Food-Mood arbeitet außerhalb des API-Adapters nur mit den in D2 definierten Datentypen.

### Filterregeln

- **Preis:** Gewählte Preisstufen werden an die API übergeben und zusätzlich nach der Normalisierung geprüft. `UNKNOWN` erfüllt keinen aktiven Preisfilter.
- **Entfernung:** Die Distanz wird aus Suchstandort und Restaurantkoordinaten berechnet; Ergebnisse außerhalb des Radius werden entfernt.
- **Küche:** Google-Places-Typen werden in normalisierte `CuisineTag`-Werte übersetzt.
- **Ernährung:** Nur vorhandene Angaben werden als erfüllt behandelt. Ein unbekannter Wert wird nicht als vegetarisch oder vegan ausgegeben.
- **Geöffnet:** Nur sicher als geöffnet erkannte Restaurants erfüllen den aktiven Filter.
- **Bewertung:** Der Mindestwert wird auf den Durchschnitt der eigenen Food-Mood-Bewertungen angewendet. Ohne eigene Bewertung ist dieser Wert unbekannt.

### Mood- und Anlass-Matching

Google Places liefert keine fertige Food-Mood-Stimmung. Die Empfehlungslogik bildet die Daten regelbasiert ab:

- `SCHNELL`: beispielsweise Fast-Food- oder Take-away-Typen
- `GESELLIG`: Restauranttypen, die für gemeinsames Essen geeignet sind
- `NEU`: Restaurants oder Küchen, die in der eigenen Besuchshistorie noch nicht vorkommen
- `GUENSTIG`: `PriceLevel.FREE` oder `PriceLevel.INEXPENSIVE`
- `GEMUETLICH` und `ROMANTISCH`: schwächere regelbasierte Vorschläge; keine objektiv garantierte Eigenschaft

Anlässe wie `DATE`, `FAMILIE`, `FREUNDE`, `MITTAGSPAUSE` und `UNI` beeinflussen dieselbe Bewertung. Der Benutzer kann eine Stimmung, einen Anlass oder beides wählen.

### Fehlerfälle

- ungültiger oder fehlender API-Schlüssel: Konfigurationsfehler protokollieren und verständliche Meldung anzeigen
- Abrechnung oder Kontingent nicht verfügbar: keine Endlosschleife; Suche kontrolliert abbrechen
- Zeitüberschreitung oder HTTP-Fehler: begrenzten erneuten Versuch anbieten
- ungültige oder unvollständige Antwort: betroffene Datensätze überspringen
- keine Treffer: Filter lockern oder Radius ändern lassen

## S1.7 Speicherung externer Restaurantdaten

Food-Mood baut keine eigene vollständige Restaurantdatenbank auf. Für Favoriten, Besuche und Bewertungen wird mindestens der `ExternalRestaurantKey` gespeichert. Benötigte Restaurantdetails werden erneut über den Anbieter geladen oder nur soweit gespeichert, wie es dessen Nutzungsbedingungen erlauben. Eigene Favoriten, Besuche und Bewertungen bleiben davon getrennt und dürfen durch eine externe Aktualisierung nicht gelöscht werden.

## S1.8 Betrachtete Alternativen

| Alternative | Vorteil | Nachteil im Projekt | Entscheidung für Version 1 |
|---|---|---|---|
| Google Places API | vorhandene Preisstufen, Restauranttypen und Öffnungsinformationen; unterstützt den festgelegten Preisfilter | API-Schlüssel und aktivierte Abrechnung erforderlich; Field Masks und Kontingente müssen kontrolliert werden | gewählt |
| OpenStreetMap + Overpass | offene Restaurantdaten ohne API-Schlüssel | keine verlässlichen allgemeinen Preisstufen; `GUENSTIG` und Preisfilter wären kaum umsetzbar | nicht gewählt |
| Foursquare Places API | strukturierte POI-Daten und Kategorien | zusätzlicher Schlüssel und weitere Vertrags- bzw. Kostenprüfung erforderlich | nicht gewählt |

Die Auswahl wird in der Architekturphase als ADR festgehalten. Falls die Gruppe keine Google-Cloud-Abrechnung einrichten kann, müssen Preisfilter und Mood `GUENSTIG` gemeinsam neu entschieden werden; sie dürfen nicht nur scheinbar implementiert werden.

## S1.9 Datenschutz, Sicherheit und Kostenkontrolle

- Standort und manueller Suchtext werden nur für die jeweilige Suche verarbeitet.
- Der Google-Places-Schlüssel liegt nur im Backend und wird durch API- und Servereinschränkungen geschützt.
- Geheimnisse stehen in einer lokalen Umgebungsdatei, die durch `.gitignore` vom Repository ausgeschlossen wird.
- Das Backend begrenzt Anfragen und verwendet nur benötigte Felder in der Field Mask.
- Für das Cloud-Projekt werden geeignete Kontingent- und Budgetwarnungen eingerichtet.
- Werte externer APIs gelten als nicht vertrauenswürdig und werden vor Speicherung oder HTML-Ausgabe validiert beziehungsweise escaped.
- Für Nominatim wird die vorgeschriebene OpenStreetMap-Attribution angezeigt.

## S1.10 Akzeptanzkriterien

- Automatischer und manueller Standort führen zu einem gültigen `Location`-Objekt.
- Der Benutzer kann Mood, Anlass oder beides auswählen; mindestens eines davon ist erforderlich.
- Die Suche unterstützt Preis, Entfernung, Küche, Ernährung, Öffnungsstatus und eigene Food-Mood-Bewertung als Filter.
- Google-Places-Ergebnisse werden in das interne `Restaurant`-Format normalisiert.
- Die Stimmung `GUENSTIG` wird nur bei einer passenden bekannten Preisstufe vergeben.
- Fehlende optionale Felder führen nicht zum Abbruch der gesamten Ergebnisliste.
- API-Schlüssel werden nicht im Frontend oder Repository veröffentlicht.
- Bei Ausfall eines Nachbarsystems erhält der Benutzer eine verständliche Meldung und kann die Aktion erneut versuchen oder anpassen.

## S1.11 Quellen

- [Google Places API – Text Search (New)](https://developers.google.com/maps/documentation/places/web-service/text-search)
- [Google Places API – Place Data Fields](https://developers.google.com/maps/documentation/places/web-service/data-fields)
- [Google Maps Platform – API Security Best Practices](https://developers.google.com/maps/api-security-best-practices)
- [Google Maps Platform – Usage and Billing](https://developers.google.com/maps/documentation/places/web-service/usage-and-billing)
- [Nominatim Search API](https://nominatim.org/release-docs/latest/api/Search/)
- [Nominatim Usage Policy](https://operations.osmfoundation.org/policies/nominatim/)

Stand der Prüfung: 7. August 2026.
