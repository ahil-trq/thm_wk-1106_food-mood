# D2 – Datentypenverzeichnis

## D2.1 Zweck und Namenskonvention

Dieses Verzeichnis definiert die fachlichen Datentypen von Food-Mood. Die Namen in der Spalte „Typ“ sind verbindliche Bezeichner für Datenmodell, Architektur und späteren Code. Fachlich unterschiedliche Werte werden nicht als beliebige Zeichenkette modelliert, wenn ein engerer Typ oder eine Aufzählung möglich ist.

Optionale Werte werden mit `| null` gekennzeichnet. `null` bedeutet „nicht vorhanden oder von der externen Quelle nicht geliefert“ und darf nicht automatisch als `false`, `0` oder „geschlossen“ interpretiert werden.

## D2.2 Identifikatoren

| Typ | Grundtyp / Struktur | Regeln und Bedeutung |
|---|---|---|
| `UserId` | Zeichenkette | zufällig erzeugte, genau zwölf Zeichen lange Kennung aus Buchstaben und Ziffern; wird dem Nutzer angezeigt und nicht im Klartext gespeichert |
| `UserIdHash` | Zeichenkette | serverseitig erzeugter kryptografischer Hash der `UserId`; wird dauerhaft gespeichert und intern zur Zuordnung des Nutzerprofils verwendet |
| `FavoriteId` | UUID | eindeutige Kennung eines Favoriten |
| `VisitId` | UUID | eindeutige Kennung eines Besuchs |
| `ReviewId` | UUID | eindeutige Kennung einer eigenen Bewertung |
| `ExternalRestaurantKey` | `{ osmType: OsmType, osmId: OsmId }` | eindeutiger OpenStreetMap-Schlüssel eines Restaurants; beide Bestandteile sind erforderlich |
| `OsmId` | positive Ganzzahl | ID eines OpenStreetMap-Objekts; wird gemeinsam mit `OsmType` verwendet |

## D2.3 Aufzählungstypen

### `Mood`

Eine Stimmung kann pro Suche gewählt werden. Alternativ kann der Benutzer nur einen Anlass wählen. Für die erste Version gelten genau die folgenden fünf Werte:

| Wert | Fachliche Bedeutung |
|---|---|
| `GEMUETLICH` | ruhiges Essen ohne Zeitdruck |
| `ROMANTISCH` | Restaurant für ein Date oder einen besonderen Moment |
| `SCHNELL` | kurze Essenspause, Fast Food oder Mitnahme |
| `GESELLIG` | gemeinsames Essen mit Freunden oder Familie |
| `NEU` | ein bisher nicht besuchtes Restaurant oder eine neue Küche ausprobieren |

Die Werte beschreiben die Food-Mood-Regeln, nicht objektiv garantierte Eigenschaften eines Restaurants.

### `Occasion`

| Wert | Bedeutung |
|---|---|
| `DATE` | Essen zu zweit / Date |
| `FAMILIE` | gemeinsames Essen mit Familie |
| `FREUNDE` | gemeinsames Essen mit Freunden |
| `MITTAGSPAUSE` | zeitlich begrenzte Pause |
| `UNI` | Essen im Zusammenhang mit dem Hochschulalltag |

`Occasion` ist optional. Ein Benutzer darf Empfehlungen allein anhand von Mood oder allein anhand eines Anlasses anfordern. `Mood` und `Occasion` dürfen jedoch nicht gleichzeitig fehlen.

### Weitere Aufzählungen

| Typ | Zulässige Werte | Bedeutung |
|---|---|---|
| `LocationSource` | `BROWSER`, `MANUAL` | Herkunft der Koordinaten |
| `OsmType` | `NODE`, `WAY`, `RELATION` | Art des OpenStreetMap-Objekts; bildet gemeinsam mit `OsmId` den externen Restaurantschlüssel |
| `AmenityType` | `RESTAURANT`, `FAST_FOOD`, `CAFE` | unterstützte gastronomische OSM-Kategorie |
| `OpenState` | `OPEN`, `CLOSED`, `UNKNOWN` | aktueller Öffnungsstatus; `UNKNOWN`, wenn keine zuverlässige Auswertung möglich ist |
| `DietFilter` | `ANY`, `REQUIRED` | keine Einschränkung oder ausdrücklich benötigte Ernährungsoption in einer Suchanfrage |
| `TriState` | `YES`, `NO`, `UNKNOWN` | dreiwertige Angabe für optionale externe Eigenschaften, z. B. vegan oder Abholung |

## D2.4 Werteobjekte

| Typ | Grundtyp / Struktur | Beschreibung | Validierung / Beispiel |
|---|---|---|---|
| `UserName` | Zeichenkette | sichtbarer Name des Nutzerprofils | nach dem Trimmen 1–80 Zeichen; Beispiel: `Musti` |
| `Latitude` | Dezimalzahl | geografischer Breitengrad | −90 bis +90; Beispiel: `50.3356` |
| `Longitude` | Dezimalzahl | geografischer Längengrad | −180 bis +180; Beispiel: `8.7558` |
| `Coordinates` | `{ latitude: Latitude, longitude: Longitude }` | geografische Position eines Standorts oder Restaurants | beide Werte erforderlich |
| `AccuracyMeters` | Dezimalzahl | vom Browser gemeldete Genauigkeit des Standorts in Metern | größer oder gleich 0; nur bei Browser-Geolocation |
| `LocationLabel` | Zeichenkette | für den Nutzer lesbarer Name des Suchorts | 1–200 Zeichen; optional |
| `Location` | `{ coordinates, source, label?, accuracyMeters? }` | temporärer Standort einer Suchanfrage | `coordinates` und `source` erforderlich; nicht dauerhaft speichern |
| `SearchRadiusMeters` | Ganzzahl | maximaler Radius der Restaurantsuche in Metern | genau `1000`, `3000`, `5000` oder `10000` |
| `DistanceMeters` | Dezimalzahl | berechnete Entfernung zwischen Suchstandort und Restaurant | größer oder gleich 0 |
| `RestaurantName` | Zeichenkette | sichtbarer Name eines Restaurants | nach dem Trimmen 1–200 Zeichen |
| `AddressText` | Zeichenkette | aus vorhandenen OSM-Daten gebildete Anschrift | 1–300 Zeichen oder `null` |
| `CuisineTag` | normalisierte Zeichenkette | vorhandener Wert des OSM-Tags `cuisine` | 1–60 Zeichen, Kleinschreibung; Beispiel: `italian` oder `pizza` |
| `CuisineList` | Liste von `CuisineTag` | Küchenarten eines Restaurants | keine Duplikate; leere Liste erlaubt |
| `OpeningHoursText` | Zeichenkette | vorhandener Wert des OSM-Tags `opening_hours` | Zeichenkette oder `null`; nicht ungeprüft als geöffnet oder geschlossen ausgeben |
| `Rating` | Ganzzahl | einzelne Food-Mood-Sternebewertung | 1 bis 5 |
| `AverageRating` | Dezimalzahl | aus eigenen Food-Mood-Bewertungen berechneter Mittelwert | 1,0 bis 5,0 oder `null`; Anzeige auf eine Nachkommastelle gerundet |
| `RatingCount` | Ganzzahl | Anzahl der berücksichtigten eigenen Bewertungen | größer oder gleich 0 |
| `ReviewComment` | Zeichenkette | optionaler Kommentar zu einer eigenen Bewertung | nach dem Trimmen 1–280 Zeichen oder `null` |
| `Score` | Ganzzahl | regelbasierter Passungswert einer Empfehlung | 0 bis 100; ein höherer Wert bedeutet eine bessere Passung |
| `MatchReason` | Zeichenkette | verständliche Begründung für eine Empfehlung | 1–120 Zeichen; Beispiel: `passt zur Stimmung SCHNELL` |
| `MatchReasonList` | Liste von `MatchReason` | Hauptgründe für die berechnete Empfehlung | mindestens ein Eintrag pro angezeigter Empfehlung |
| `DateTime` | ISO-8601-Zeitpunkt mit Zeitzone | fachlicher Zeitpunkt eines gespeicherten Ereignisses | serverseitig erzeugt oder validiert |

## D2.5 Strukturtypen

### `User`

| Feld | Typ | Pflicht | Bedeutung |
|---|---|---|---|
| `userIdHash` | `UserIdHash` | ja | gespeicherter Hash der zwölfstelligen UserID; identifiziert das Nutzerprofil intern |
| `name` | `UserName` | ja | bei der Initialisierung eingegebener Name |
| `createdAt` | `DateTime` | ja | Erzeugungszeitpunkt |

### `SearchFilters`

| Feld | Typ | Pflicht | Bedeutung |
|---|---|---|---|
| `radius` | `SearchRadiusMeters` | ja | maximaler Suchradius; Standardwert 5 km |
| `cuisines` | `CuisineList` | ja | leere Liste bedeutet keine Einschränkung |
| `vegetarian` | `DietFilter` | ja | vegetarische Eignung erforderlich oder keine Einschränkung |
| `vegan` | `DietFilter` | ja | vegane Eignung erforderlich oder keine Einschränkung |
| `onlyOpen` | Boolean | ja | nur sicher als geöffnet erkannte Restaurants berücksichtigen |
| `minimumRating` | `Rating` oder `null` | ja | Mindestwert eigener Food-Mood-Bewertungen; `null` bedeutet keine Einschränkung |

Bei `onlyOpen=true` werden Restaurants mit `OpenState.UNKNOWN` nicht als geöffnet behauptet und aus diesem Filterergebnis ausgeschlossen.

### `SearchRequest`

| Feld | Typ | Pflicht | Bedeutung |
|---|---|---|---|
| `location` | `Location` | ja | Mittelpunkt der Suche |
| `mood` | `Mood` oder `null` | ja | optionale ausgewählte Stimmung |
| `occasion` | `Occasion` oder `null` | ja | optionaler Anlass |
| `filters` | `SearchFilters` | ja | aktive Suchfilter |

Mindestens eines der Felder `mood` oder `occasion` muss einen Wert enthalten.

### `Restaurant`

| Feld | Typ | Pflicht | Bedeutung |
|---|---|---|---|
| `externalKey` | `ExternalRestaurantKey` | ja | eindeutige Referenz zur externen Quelle |
| `name` | `RestaurantName` | ja | sichtbarer Restaurantname |
| `coordinates` | `Coordinates` | ja | Standort des Restaurants |
| `address` | `AddressText` oder `null` | ja | formatierte Anschrift, falls vorhanden |
| `amenity` | `AmenityType` | ja | gastronomische OSM-Kategorie |
| `cuisines` | `CuisineList` | ja | normalisierte Küchen-Tags |
| `openingHours` | `OpeningHoursText` oder `null` | ja | externe Öffnungsinformation |
| `openState` | `OpenState` | ja | abgeleiteter aktueller Status |
| `vegetarian` | `TriState` | ja | vorhandene vegetarische Angabe |
| `vegan` | `TriState` | ja | vorhandene vegane Angabe |
| `takeaway` | `TriState` | ja | vorhandene Abholangabe |
| `delivery` | `TriState` | ja | vorhandene Lieferangabe |
| `outdoorSeating` | `TriState` | ja | vorhandene Außensitzplatzangabe |
| `website` | URL-Zeichenkette oder `null` | ja | optionale, validierte Website |
| `phone` | Zeichenkette oder `null` | ja | optionale Telefonnummer |
| `averageRating` | `AverageRating` | ja | aus eigenen Food-Mood-Bewertungen berechnet |
| `ratingCount` | `RatingCount` | ja | Anzahl eigener Bewertungen |

### `Recommendation`

| Feld | Typ | Pflicht | Bedeutung |
|---|---|---|---|
| `restaurant` | `Restaurant` | ja | vorgeschlagenes Restaurant |
| `score` | `Score` | ja | regelbasierte Gesamtpassung |
| `reasons` | `MatchReasonList` | ja | nachvollziehbare Hauptgründe |
| `distance` | `DistanceMeters` | ja | Entfernung zum Suchstandort |

### `Favorite`

| Feld | Typ | Pflicht | Bedeutung |
|---|---|---|---|
| `id` | `FavoriteId` | ja | Favoritenkennung |
| `userIdHash` | `UserIdHash` | ja | zugehöriges Nutzerprofil |
| `restaurantKey` | `ExternalRestaurantKey` | ja | favorisiertes Restaurant |
| `createdAt` | `DateTime` | ja | Zeitpunkt der Favorisierung |

Die Kombination `userIdHash + restaurantKey` ist eindeutig.

### `Visit`

| Feld | Typ | Pflicht | Bedeutung |
|---|---|---|---|
| `id` | `VisitId` | ja | Besuchskennung |
| `userIdHash` | `UserIdHash` | ja | zugehöriges Nutzerprofil |
| `restaurantKey` | `ExternalRestaurantKey` | ja | besuchtes Restaurant |
| `visitedAt` | `DateTime` | ja | Besuchszeitpunkt; darf nicht in der Zukunft liegen |
| `createdAt` | `DateTime` | ja | Speicherzeitpunkt |

### `Review`

| Feld | Typ | Pflicht | Bedeutung |
|---|---|---|---|
| `id` | `ReviewId` | ja | Bewertungskennung |
| `userIdHash` | `UserIdHash` | ja | bewertendes Nutzerprofil |
| `restaurantKey` | `ExternalRestaurantKey` | ja | bewertetes Restaurant |
| `rating` | `Rating` | ja | Sternebewertung von 1 bis 5 |
| `comment` | `ReviewComment` oder `null` | ja | optionaler Kurzkommentar |
| `createdAt` | `DateTime` | ja | Erzeugungszeitpunkt |
| `updatedAt` | `DateTime` | ja | Zeitpunkt der letzten Änderung |

Die Kombination `userIdHash + restaurantKey` ist eindeutig. Vor dem Erstellen der Bewertung muss mindestens ein `Visit` mit derselben Kombination vorhanden sein.

## D2.6 Abdeckung der Anwendungsfälle

| Anwendungsfall | Verwendete Datentypen |
|---|---|
| [UC-00 – Nutzer initialisieren](F2-Anwendungsfaelle.md#uc-00) | `User`, `UserName`, `UserId`, `UserIdHash` |
| [UC-01 – Bestehenden Nutzer laden](F2-Anwendungsfaelle.md#uc-01) | `UserId`, `UserIdHash`, `User` |
| [UC-02 – Nutzer wechseln](F2-Anwendungsfaelle.md#uc-02) | `UserId`, `UserIdHash`, `User` |
| [UC-03 – Standort bestimmen](F2-Anwendungsfaelle.md#uc-03) | `Location`, `Coordinates`, `LocationSource`, `LocationLabel`, `AccuracyMeters` |
| [UC-04 – Stimmung und/oder Anlass auswählen](F2-Anwendungsfaelle.md#uc-04) | `Mood`, `Occasion`, `SearchRequest` |
| [UC-05 – Filter setzen](F2-Anwendungsfaelle.md#uc-05) | `SearchFilters`, `SearchRadiusMeters`, `CuisineList`, `DietFilter`, `OpenState` |
| [UC-06 – Empfehlungen erhalten](F2-Anwendungsfaelle.md#uc-06) | `SearchRequest`, `Restaurant`, `Recommendation`, `Score`, `MatchReasonList`, `DistanceMeters` |
| [UC-07 – Ergebnisse anzeigen](F2-Anwendungsfaelle.md#uc-07) | `Recommendation`, `Restaurant`, `AverageRating`, `RatingCount` |
| [UC-08 – Restaurantdetails ansehen](F2-Anwendungsfaelle.md#uc-08) | `Restaurant`, `ExternalRestaurantKey`, `AmenityType`, `CuisineList`, `OpeningHoursText` |
| [UC-09 – Restaurant favorisieren](F2-Anwendungsfaelle.md#uc-09) | `Favorite`, `FavoriteId`, `UserIdHash`, `ExternalRestaurantKey` |
| [UC-10 – Restaurant als besucht markieren](F2-Anwendungsfaelle.md#uc-10) | `Visit`, `VisitId`, `UserIdHash`, `ExternalRestaurantKey`, `DateTime` |
| [UC-11 – Eigene Bewertung abgeben](F2-Anwendungsfaelle.md#uc-11) | `Review`, `ReviewId`, `Rating`, `ReviewComment`, `UserIdHash`, `ExternalRestaurantKey` |
| [UC-12 – Favoriten anzeigen](F2-Anwendungsfaelle.md#uc-12) | `Favorite`, `Restaurant`, `UserIdHash` |
| [UC-13 – Besuchte Restaurants anzeigen](F2-Anwendungsfaelle.md#uc-13) | `Visit`, `Restaurant`, `UserIdHash` |
| [UC-14 – API-Fehler behandeln](F2-Anwendungsfaelle.md#uc-14) | keine dauerhafte Fachdatenänderung; vorhandene externe Werte bleiben optional |

## D2.7 Regeln für externe Daten

1. Alle Texte aus externen APIs werden als nicht vertrauenswürdig behandelt und vor der HTML-Ausgabe escaped.
2. Fehlende Tags werden als `null`, leere Liste, `UNKNOWN` oder `TriState.UNKNOWN` abgebildet – abhängig vom definierten Typ.
3. Ein Restaurant ohne Namen oder nutzbare Koordinaten wird nicht in das interne `Restaurant`-Format übernommen.
4. Vorhandene OpenStreetMap-Tags werden in die definierten Food-Mood-Typen überführt; Listenwerte werden normalisiert und dedupliziert.
5. Ein Restaurant wird durch die Kombination aus `OsmType` und `OsmId` eindeutig referenziert.
6. Eine Nominatim-`place_id` wird nicht als Restaurantschlüssel verwendet.

## D2.8 Konsistenz- und Akzeptanzkriterien

- Alle in D1 modellierten Objekte besitzen hier einen gleich geschriebenen Typnamen.
- Für IDs, Bewertungen, Koordinaten, Distanzen und Zeitpunkte existieren eindeutige Wertebereiche.
- Optionale externe Werte sind erkennbar und werden nicht mit negativen Aussagen verwechselt.
- Die sichtbare `UserId` besitzt genau zwölf Zeichen und wird nicht im Klartext gespeichert.
- `UserIdHash` wird für alle internen Beziehungen zu Favoriten, Besuchen und Bewertungen verwendet.
- `ExternalRestaurantKey` verhindert Kollisionen zwischen OSM-Knoten, -Wegen und -Relationen.
- Eine `Review` ist nur zulässig, wenn für denselben Nutzer und dasselbe Restaurant mindestens ein `Visit` vorhanden ist.
- Im späteren TypeScript-Code werden diese Typnamen beibehalten oder Abweichungen in einer Architekturentscheidung begründet.
