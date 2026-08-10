# D2 – Datentypenverzeichnis

## D2.1 Zweck und Namenskonvention

Dieses Verzeichnis definiert die fachlichen Datentypen von Food-Mood. Die Namen in der Spalte „Typ“ sind verbindliche Bezeichner für Datenmodell, Architektur und späteren Code. Fachlich unterschiedliche Werte werden nicht als beliebige Zeichenkette modelliert, wenn ein engerer Typ oder eine Aufzählung möglich ist.

Optionale Werte werden mit `| null` gekennzeichnet. `null` bedeutet „nicht vorhanden oder von der externen Quelle nicht geliefert“ und darf nicht automatisch als `false`, `0` oder „geschlossen“ interpretiert werden.

## D2.2 Identifikatoren

| Typ | Grundtyp / Struktur | Regeln und Bedeutung |
|---|---|---|
| `AnonymousUserId` | UUID | intern erzeugte, zufällige Kennung einer App-Installation; enthält keine personenbezogenen Angaben |
| `FavoriteId` | UUID | eindeutige Kennung eines Favoriten |
| `VisitId` | UUID | eindeutige Kennung eines Besuchs |
| `ReviewId` | UUID | eindeutige Kennung einer eigenen Bewertung |
| `ExternalRestaurantKey` | `{ provider: RestaurantProvider, providerPlaceId: ProviderPlaceId }` | zusammengesetzter, externer Restaurantschlüssel; beide Bestandteile sind erforderlich |
| `ProviderPlaceId` | Zeichenkette | stabile anbieterbezogene Place-ID; 1–255 Zeichen |

## D2.3 Aufzählungstypen

### `Mood`

Eine Stimmung kann pro Suche gewählt werden. Alternativ kann der Benutzer nur einen Anlass wählen. Für die erste Version gelten genau die folgenden sechs Werte:

| Wert | Fachliche Bedeutung |
|---|---|
| `GEMUETLICH` | ruhiges Essen ohne Zeitdruck |
| `ROMANTISCH` | Restaurant für ein Date oder einen besonderen Moment |
| `SCHNELL` | kurze Essenspause, Fast Food oder Mitnahme |
| `GESELLIG` | gemeinsames Essen mit Freunden oder Familie |
| `NEU` | ein bisher nicht besuchtes Restaurant oder eine neue Küche ausprobieren |
| `GUENSTIG` | Restaurant mit niedriger externer Preisstufe |

Die Werte beschreiben die Food-Mood-Regeln, nicht objektiv garantierte Eigenschaften eines Restaurants. `GUENSTIG` kann nur sicher zugeordnet werden, wenn die externe Quelle eine bekannte niedrige Preisstufe liefert.

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
| `RestaurantProvider` | `GOOGLE_PLACES` | Datenanbieter der ersten Version; Typ bleibt für spätere Anbieter erweiterbar |
| `PlaceType` | normalisierte Google-Places-Typen, z. B. `RESTAURANT`, `CAFE`, `FAST_FOOD_RESTAURANT` | gastronomische Hauptkategorie |
| `OpenState` | `OPEN`, `CLOSED`, `UNKNOWN` | aktueller Öffnungsstatus; `UNKNOWN`, wenn keine zuverlässige Auswertung möglich ist |
| `PriceLevel` | `FREE`, `INEXPENSIVE`, `MODERATE`, `EXPENSIVE`, `VERY_EXPENSIVE`, `UNKNOWN` | externe Preisstufe; `UNKNOWN`, wenn keine Angabe vorliegt |
| `DietFilter` | `ANY`, `REQUIRED` | keine Einschränkung oder ausdrücklich benötigte Ernährungsoption in einer Suchanfrage |
| `TriState` | `YES`, `NO`, `UNKNOWN` | dreiwertige Angabe für optionale externe Eigenschaften, z. B. vegan oder Abholung |

## D2.4 Werteobjekte

| Typ | Grundtyp / Struktur | Validierung |
|---|---|---|
| `Latitude` | Dezimalzahl | −90 bis +90 |
| `Longitude` | Dezimalzahl | −180 bis +180 |
| `Coordinates` | `{ latitude: Latitude, longitude: Longitude }` | beide Werte erforderlich |
| `AccuracyMeters` | Dezimalzahl | größer oder gleich 0; nur bei Browser-Geolocation |
| `LocationLabel` | Zeichenkette | 1–200 Zeichen; optionaler Anzeigename des Ortes |
| `Location` | `{ coordinates, source, label?, accuracyMeters? }` | `coordinates` und `source` erforderlich; nicht dauerhaft speichern |
| `SearchRadiusMeters` | Ganzzahl | genau einer der Werte `1000`, `3000`, `5000`, `10000` |
| `DistanceMeters` | Dezimalzahl | größer oder gleich 0; wird aus zwei Koordinaten berechnet |
| `RestaurantName` | Zeichenkette | nach Trimmen 1–200 Zeichen |
| `AddressText` | Zeichenkette | 1–300 Zeichen oder `null` |
| `CuisineTag` | normalisierte Zeichenkette | 1–60 Zeichen, Kleinschreibung, z. B. `italian_restaurant` oder `pizza_restaurant` |
| `CuisineList` | Liste von `CuisineTag` | keine Duplikate; leere Liste erlaubt |
| `PriceLevelList` | Liste von `PriceLevel` | keine Duplikate; `UNKNOWN` darf nicht als Suchauswahl verwendet werden |
| `OpeningHoursText` | Zeichenkette | normalisierte externe Öffnungsinformation oder `null`; nicht ungeprüft als geöffnet/geschlossen ausgeben |
| `Rating` | Ganzzahl | 1 bis 5 |
| `AverageRating` | Dezimalzahl | 1,0 bis 5,0 oder `null`, auf eine Nachkommastelle für die Anzeige gerundet |
| `RatingCount` | Ganzzahl | größer oder gleich 0 |
| `ReviewComment` | Zeichenkette | nach Trimmen 1–280 Zeichen oder `null` |
| `Score` | Ganzzahl | 0 bis 100; höher bedeutet bessere Regelpassung |
| `MatchReason` | Zeichenkette | 1–120 Zeichen; verständliche Begründung statt interner Formel |
| `MatchReasonList` | Liste von `MatchReason` | mindestens ein Eintrag pro angezeigter Empfehlung |
| `DateTime` | ISO-8601-Zeitpunkt mit Zeitzone | serverseitig erzeugt bzw. validiert |

## D2.5 Strukturtypen

### `AnonymousUser`

| Feld | Typ | Pflicht | Bedeutung |
|---|---|---|---|
| `id` | `AnonymousUserId` | ja | anonyme Installationskennung |
| `createdAt` | `DateTime` | ja | Erzeugungszeitpunkt |

### `SearchFilters`

| Feld | Typ | Pflicht | Bedeutung |
|---|---|---|---|
| `radius` | `SearchRadiusMeters` | ja | maximaler Suchradius; Standardwert 5 km |
| `priceLevels` | `PriceLevelList` | ja | leere Liste bedeutet keine Preiseinschränkung |
| `cuisines` | `CuisineList` | ja | leere Liste bedeutet keine Einschränkung |
| `vegetarian` | `DietFilter` | ja | vegetarische Eignung erforderlich oder keine Einschränkung |
| `vegan` | `DietFilter` | ja | vegane Eignung erforderlich oder keine Einschränkung |
| `onlyOpen` | Boolean | ja | nur sicher als geöffnet erkannte Restaurants berücksichtigen |
| `minimumRating` | `Rating` oder `null` | ja | Mindestwert eigener Food-Mood-Bewertungen; `null` bedeutet keine Einschränkung |

Bei einem aktiven Preisfilter werden Restaurants mit `PriceLevel.UNKNOWN` nicht als passend ausgegeben. Bei `onlyOpen=true` werden Restaurants mit `OpenState.UNKNOWN` nicht als geöffnet behauptet und aus diesem Filterergebnis ausgeschlossen.

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
| `placeType` | `PlaceType` | ja | gastronomische Hauptkategorie |
| `cuisines` | `CuisineList` | ja | normalisierte Küchen-Tags |
| `priceLevel` | `PriceLevel` | ja | externe Preisstufe oder `UNKNOWN` |
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
| `userId` | `AnonymousUserId` | ja | zugehörige Installation |
| `restaurantKey` | `ExternalRestaurantKey` | ja | favorisiertes Restaurant |
| `createdAt` | `DateTime` | ja | Zeitpunkt der Favorisierung |

Die Kombination `userId + restaurantKey` ist eindeutig.

### `Visit`

| Feld | Typ | Pflicht | Bedeutung |
|---|---|---|---|
| `id` | `VisitId` | ja | Besuchskennung |
| `userId` | `AnonymousUserId` | ja | zugehörige Installation |
| `restaurantKey` | `ExternalRestaurantKey` | ja | besuchtes Restaurant |
| `visitedAt` | `DateTime` | ja | Besuchszeitpunkt; darf nicht in der Zukunft liegen |
| `createdAt` | `DateTime` | ja | Speicherzeitpunkt |

### `Review`

| Feld | Typ | Pflicht | Bedeutung |
|---|---|---|---|
| `id` | `ReviewId` | ja | Bewertungskennung |
| `userId` | `AnonymousUserId` | ja | bewertende anonyme Installation |
| `restaurantKey` | `ExternalRestaurantKey` | ja | bewertetes Restaurant |
| `rating` | `Rating` | ja | Sternebewertung von 1 bis 5 |
| `comment` | `ReviewComment` oder `null` | ja | optionaler Kurzkommentar |
| `createdAt` | `DateTime` | ja | Erzeugungszeitpunkt |
| `updatedAt` | `DateTime` | ja | Zeitpunkt der letzten Änderung |

Die Kombination `userId + restaurantKey` ist eindeutig. Vor dem Erstellen der Bewertung muss mindestens ein `Visit` mit derselben Kombination vorhanden sein.

## D2.6 Regeln für externe Daten

1. Alle Texte aus externen APIs werden als nicht vertrauenswürdig behandelt und vor der HTML-Ausgabe escaped.
2. Fehlende Tags werden als `null`, leere Liste, `UNKNOWN` oder `TriState.UNKNOWN` abgebildet – abhängig vom definierten Typ.
3. Ein Restaurant ohne Namen oder nutzbare Koordinaten wird nicht in das interne `Restaurant`-Format übernommen.
4. Google-Places-Typen werden in die Food-Mood-Typen und Küchenwerte normalisiert und dedupliziert.
5. Nicht bekannte externe Preiswerte werden auf `PriceLevel.UNKNOWN` abgebildet.
6. Eine Nominatim-`place_id` wird nicht als Restaurantschlüssel verwendet.

## D2.7 Konsistenz- und Akzeptanzkriterien

- Alle in D1 modellierten Objekte besitzen hier einen gleich geschriebenen Typnamen.
- Für IDs, Bewertungen, Koordinaten, Distanzen und Zeitpunkte existieren eindeutige Wertebereiche.
- Optionale externe Werte sind erkennbar und werden nicht mit negativen Aussagen verwechselt.
- `ExternalRestaurantKey` verhindert Kollisionen zwischen IDs verschiedener Restaurantanbieter.
- Eine `Review` ist nur zulässig, wenn für denselben Nutzer und dasselbe Restaurant mindestens ein `Visit` vorhanden ist.
- Im späteren TypeScript-Code werden diese Typnamen beibehalten oder Abweichungen in einer Architekturentscheidung begründet.
