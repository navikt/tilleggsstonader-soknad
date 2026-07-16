# tilleggsstonader-soknad

Frontend - søknad for tilleggsstønader

### Kjøre app lokalt

##### Lokal-dev
`yarn start:dev` 
Gå inn på http://localhost:8080/tilleggsstonader/soknad/pass-av-barn

Med api må du sette cookie første gang:
http://localhost:8001/test/cookie?redirect=http://localhost:8080/tilleggsstonader/soknad/pass-av-barn
Kan sende med annet fnr med `&subject=<fnr>`

##### Playwright-tester
* Installer chromium-browser `npx playwright install chromium`
* Kjør tester `PLAYWRIGHT_PARALLEL=false yarn playwright test`
  * Debug, legg til `--debug`
  * Kjør en enkel test, legg til `-g "Har ingen aktiviteter"`
  * Manglende-vedlegg modalen er litt flaky, så den feiler når man kjør parallelle tester
  * For mer info https://playwright.dev/docs/running-tests

## Universell utforming

### Huskeliste ✨

1. Sjekk at ny kode fungerer bra på både desktop og mobil.
2. Legg til alternavtiv tekst på bilder, ikoner og alle ikke-tekstlige elementer på siden.
2. Bruk heading levels for å vise strukturen på siden. 
    - `<H1>` skal beskrive hovedinnholdet.
3. Bruk [landmarks](https://www.w3schools.com/accessibility/accessibility_landmarks.php) for grov inndeling av innholdet som tilsvarer sidens layout. 
4. Sjekk at det fungerer å navigere med tastatur.

## Endre tekster i søknaden ✍️

For å kunne redigere tekstene i søknaden må du ha en github-konto og være med i `navikt` organisasjonen. Se hvordan [her](https://confluence.adeo.no/pages/viewpage.action?pageId=566074242)

### Fremgangsmåte
#### 1. Finn riktig mappe.
   
Det finnes en mappe per stønad. Direktelenke til hver mappe finner du under: 
- Rediger tekster for søknad om pass av barn [HER](https://github.com/navikt/tilleggsstonader-soknad/tree/main/src/frontend/passAvBarn/tekster)

#### 2. Finn filen du ønsker å redigere
I hver mappe er det en fil per side eller steg i søknaden. Dersom man ønsker å redigere innholdet på forsiden finner man dette i `forside.ts`

#### 3. Begynn å redigere
Når du har navigert til riktig fil er du klar for å redigere teksten. Dette gjør du ved å trykke på blyant-ikonet i høyre hjørne:

<img width="864" alt="Screenshot 2023-09-13 at 12 48 56" src="https://github.com/navikt/tilleggsstonader-soknad/assets/46678893/b4c5eeb3-dad1-4199-b672-eddc1a251967">

#### 4. Gjør nødvendige endringer i filen
Les mer om hva som er mulig og ikke nedenfor. 

### 5. Send endringer til review
Når du er fornøyd med endringene dine trykker du på den store grønne knappen `Commit changes...` i høyre hjørne: 
<img width="864" alt="Screenshot 2023-09-13 at 12 58 37" src="https://github.com/navikt/tilleggsstonader-soknad/assets/46678893/141bb880-d930-4b1b-89d8-833a7398ccb4">

Da får du opp denne boksen: 

<img width="504" alt="image" src="https://github.com/navikt/tilleggsstonader-soknad/assets/46678893/1ac96cce-8488-44d5-96b7-cc0a6ecdacae">

Her må du fylle inn litt informasjon slik at historikken for oss utviklere blir pen til senere: 
- _Commit message_: Endre denne til noe som beskriver det du ønsker å gjøre og begynn med _skal_. F.eks. "Skal fikse skrivefeil i tittel".

Trykk på **Propose changes** for å begynne på en Pull Request (PR).

### 6. Lag en Pull Request (PR): 
Det er ikke mulig å legge ut endringer direkte, du må derfor opprette en PR som må godkjennes av en annen før den kan legges ut. 

Du er nå inne på en side som ser slik ut: 

<img width="1713" alt="image" src="https://github.com/navikt/tilleggsstonader-soknad/assets/46678893/3a6958d3-d07d-4b9c-a25b-53c4a3ec80e2">

**6.1 Endre tittel**
Dersom den automatiske tittelen ikke passer så kan denne endres. 

**6.2 Legg til beskrivelse**

Her fyller du ut all nødvendig informasjon som vi utviklere trenger ved gjennomgang. Skriv om 
- Endringene kan legges ut direkte eller om du ønsker å se endringene i preprod/dev selv først.
- Endringer du ikke klarte å gjøre selv pga. begrensninger. Da kan nærsmeste utvikler hjelpe deg med dette.

**6.3 Legg til en utvikler som reviewer**

Til høyre finner du et felt som heter _Reviewers_:

<img width="327" alt="image" src="https://github.com/navikt/tilleggsstonader-soknad/assets/46678893/99798bec-2e61-4bd0-840d-2545e126463b">

Trykk på tannhjulet og søk på utvikleren du ønsker at skal se på endringen din, trykk på navnet på personen og lukk vinduet ved å klikke utenfor dropdown-listen. 

**6.4 Lag PR**
Nå ser det ca. slik ut: 

<img width="1303" alt="image" src="https://github.com/navikt/tilleggsstonader-soknad/assets/46678893/abda8f4b-c987-436b-9376-03a70a4ba169">

For å lage pr-en trykker du på _Create pull request_

### 7. Gi deg selv en klapp på skulderen 👏
Du er nå ferdig og resten av prosessen avhenger av hva du valgte å skrive i beskrivelsen. Hvis endringen kan legges ut med en gang vil en utvikler gjøre dette, og hvis ikke vil noen ta kontakt med deg og si hva som skjer videre. 

---
### Hva kan jeg redigere selv og når skal jeg be om hjelp? 🤔
Det er noen begrensninger for hva som kan redigeres direkte. Generelt er det kun mulig å gjøre rene tekstendringer med denne guiden og ikke formattering. Her er noen retningslinjer for hva som er mulig: 
- Fikse skrivefeil
- Bytte ut hele setninger med annet
- Fjerne eller legge til kulepunkter (se lenger ned for hvordan)

Ta kontakt med nærmeste utvikler 👩‍💻 dersom du ønsker å:
- Formatere teksten annerledes. Eksempler
    - Endre tekst uten avsnitt (mellomrom) til tekst med flere avsnitt (mellomrom)
    - Legge inn lenke i teksten
    - Fjerne alternativer fra spørsmål (ta vekk radio-button alternativ)

#### Legge til eller fjerne kulepunkter
Eksempel på liste med kulepunkter

<img width="913" alt="image" src="https://github.com/navikt/tilleggsstonader-soknad/assets/46678893/12ab4d04-21f0-48ff-8c1d-a8d3b0d2b233">

Hvis jeg vil gjerne et punkt må hele linjen fjernes (se hva som er markert): 

<img width="913" alt="image" src="https://github.com/navikt/tilleggsstonader-soknad/assets/46678893/de11a6f9-6f65-457b-94b9-9a5203786749">

Hvis man vil legge til et nytt punkt må det være inni fnutter (`''`) og det må være komma (`,`) mellom hver tekststreng. 

## Kode generert av GitHub Copilot

Dette repoet bruker GitHub Copilot til å generere kode.