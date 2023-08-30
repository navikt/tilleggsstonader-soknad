# tilleggsstonader-soknad

Frontend - søknad for tilleggsstønader

### Kjøre app lokalt
`yarn start:dev`

Med api må du sette cookie første gang:
http://localhost:8001/test/cookie?redirect=http://localhost:8080/tilleggsstonader/soknad/
Kan sende med annet fnr med `&subject=<fnr>`

## Universell utforming

### Huskeliste ✨

1. Sjekk at ny kode fungerer bra på både desktop og mobil.
2. Legg til alternavtiv tekst på bilder, ikoner og alle ikke-tekstlige elementer på siden.
2. Bruk heading levels for å vise strukturen på siden. 
    - `<H1>` skal beskrive hovedinnholdet.
3. Bruk [landmarks](https://www.w3schools.com/accessibility/accessibility_landmarks.php) for grov inndeling av innholdet som tilsvarer sidens layout. 
4. Sjekk at det fungerer å navigere med tastatur.
