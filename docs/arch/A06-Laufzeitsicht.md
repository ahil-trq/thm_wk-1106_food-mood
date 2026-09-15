# A06 – Laufzeitsicht

Diese Datei zeigt architektonisch wichtige Abläufe von Food-Mood zur Laufzeit – also wie die Bausteine aus A05 (Frontend, Backend, externe Restaurantquelle OpenStreetMap/Overpass, Datenbank) bei zentralen Vorgängen zusammenspielen. Es werden bewusst keine einzelnen UI-Klicks/Use-Cases im Detail gezeigt, sondern die Kommunikation zwischen den Architektur-Komponenten.

## Szenario 1: Empfehlung berechnen (UC-06)

![Laufzeitsicht: Empfehlung berechnen](diagrams-png/runtime-recommendation.png)

Quelldatei: `diagrams/runtime-recommendation.mmd`

Das Frontend sendet die aktuelle Suchanfrage (Standort, Stimmung, Anlass, Filter) an das Backend. Das Backend fragt passende Restaurants im Suchradius bei OpenStreetMap/Overpass ab, berechnet anschließend für jedes Restaurant einen Matching-Score (vgl. F3, AF-01 bis AF-06) und reichert die Liste bei Bedarf mit nutzerbezogenen Daten (z. B. bereits gesetzte Favoriten) aus der Datenbank an. Das Ergebnis ist eine sortierte Empfehlungsliste, die an das Frontend zurückgegeben und dem Nutzer angezeigt wird.

## Szenario 2: Favorit speichern (UC-09)

![Laufzeitsicht: Favorit speichern](diagrams-png/runtime-favorite.png)

Quelldatei: `diagrams/runtime-favorite.mmd`

Beim Antippen des Favoriten-Symbols sendet das Frontend die UserIdHash und den Restaurant-Schlüssel an das Backend. Das Backend prüft zunächst, ob für diese Kombination bereits ein Favorit existiert (Regel DR-06: höchstens ein aktiver Favorit pro Nutzer und Restaurant), speichert bzw. entfernt den Favorit in der Datenbank und meldet den neuen Status an das Frontend zurück.

## Szenario 3: Bewertung speichern (UC-11)

![Laufzeitsicht: Bewertung speichern](diagrams-png/runtime-rating.png)

Quelldatei: `diagrams/runtime-rating.mmd`

Vor dem Speichern einer Bewertung prüft das Backend in der Datenbank, ob für die Kombination aus Nutzer und Restaurant bereits ein Besuch (`Visit`) vorliegt (Regel DR-08: eine Bewertung ist nur nach einem Besuch zulässig). Ist das der Fall, wird die Bewertung gespeichert oder eine bestehende aktualisiert; andernfalls erhält das Frontend eine Fehlermeldung, die dem Nutzer verständlich angezeigt wird.

## Verwendete Komponenten (aus A05)

Alle drei Szenarien verwenden dieselben Architektur-Bausteine: **Frontend** (Benutzeroberfläche), **Backend** (Geschäftslogik, Matching, Validierung), **OpenStreetMap/Overpass** (externe Restaurantquelle, nur für Empfehlungen relevant) und **Datenbank** (persistente Speicherung von Favoriten, Besuchen und Bewertungen). Die Szenarien zeigen damit unterschiedliche, aber konsistente Kommunikationswege durch dieselbe Architektur.

