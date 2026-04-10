# Copilot Instructions – tilleggsstonader-soknad

Søknadsfrontend for tilleggsstønader i NAV. React 19 + TypeScript SPA med Express-backend (BFF).

## Kommandoer

```bash
yarn start:dev                  # Lokal dev-server på http://localhost:8080
yarn lint                       # ESLint (alle filer under src/)
yarn lint:fix                   # ESLint med autofix

# Playwright (E2E)
npx playwright install chromium                    # Første gang
PLAYWRIGHT_PARALLEL=false yarn playwright test      # Kjør alle tester
yarn playwright test -g "testnavn"                  # Kjør én enkelt test
yarn playwright test --debug                        # Debug-modus
```

Backend har eget prosjekt under `src/backend/` med egen `package.json`. Installer med `yarn --cwd src/backend ci`.

## Arkitektur

### Frontend (`src/frontend/`)

Appen støtter flere stønadstyper, hver med sin egen app-komponent og mappestruktur:

- **`barnetilsyn/`** – Pass av barn (`/pass-av-barn`) – 8 steg
- **`læremidler/`** – Læremidler (`/laremidler`) – 6 steg
- **`kjørelister/`** – Kjørelister (`/kjoreliste`) – kun i dev

Hver stønadstype følger samme mønster:
- `routing/` – enum-baserte routes (`ERouteBarnetilsyn`, `ERouteLæremidler`) med `RouteTilPath`-mapping
- `steg/` – én komponent per side/steg i søknaden
- `tekster/` – alle brukervendte tekster som TypeScript-objekter

Delte komponenter ligger i `components/`, typer i `typer/`, og hjelpefunksjoner i `utils/`.

### Backend (`src/backend/`)

Express 5 BFF (backend-for-frontend) som:
- Proxyer API-kall til NAV-tjenester med TokenX-vedlegg
- Håndterer autentisering via OpenID Connect / Wonderwall
- Serverer statiske filer og injiserer NAV-dekoratøren

### Routing

React Router 7 med `BrowserRouter`. Basename: `/tilleggsstonader/soknad`.

Routes defineres som enums med tilhørende path-mapping:
```typescript
export enum ERouteBarnetilsyn {
    FORSIDE, HOVEDYTELSE, AKTIVITET, DINE_BARN, BARNEPASS, VEDLEGG, OPPSUMMERING, KVITTERING
}
export const RouteTilPath: Record<ERouteBarnetilsyn, string> = { ... }
```

Navigasjon mellom steg håndteres av `Side`-komponenten via `hentNesteRoute`/`hentForrigeRoute`.

## Konvensjoner

### Tekster

Alle brukervendte tekster defineres som TypeScript-objekter med `TekstElement<T>`-typen – ikke i18n-bibliotek eller JSON-filer:
```typescript
export type TekstElement<T> = Record<Locale, T>;
// Bruk: { nb: 'Norsk tekst' }
```

Tekster rendres med `LocaleTekst`-komponenten og relaterte Locale-komponenter (`LocaleRadioGroup`, `LocaleCheckboxGroup`, `LocaleReadMore`, etc.) fra `components/Teksthåndtering/`.

Felles tekster ligger i `src/frontend/tekster/`, stønadstype-spesifikke i f.eks. `barnetilsyn/tekster/`.

### State management

State håndteres med **constate** – ett context per stønadstype:
- `PassAvBarnSøknadContext` – all skjemadata for pass av barn
- `LæremiddelSøknadContext` – all skjemadata for læremidler
- `ValideringsfeilContext` – valideringsfeil på tvers av steg
- `PersonContext` – brukerdata fra API
- `SpråkContext` – locale (per nå kun `nb`)

React Query (`@tanstack/react-query`) brukes kun i kjørelister-appen.

### Skjema og validering

Hvert steg har en `validering.ts`-fil med valideringsfunksjon og feil-IDer:
```typescript
export const validerHovedytelse = (
    ytelse: EnumFlereValgFelt<Ytelse> | undefined,
    opphold: ArbeidOgOpphold,
    locale: Locale
): Valideringsfeil => { ... }
```

Skjemafelt bruker generiske typer som `EnumFelt<T>`, `EnumFlereValgFelt<T>`, og `SelectFelt`. `Side`-komponenten orkestrerer validering, state-oppdatering og navigasjon.

### Styling

1. **Aksel Design System** (`@navikt/ds-react`) – alle UI-komponenter (Button, RadioGroup, Alert, etc.)
2. **styled-components** – layout-containere og tilpasset spacing
3. **Design tokens** fra `@navikt/ds-tokens/js` – farger, breakpoints, spacing

Responsivt design med `BreakpointMd` fra tokens. Hovedcontaineren (`Side`) har `max-width: 35rem` på desktop.

### API-mønster

API-kall gjøres med **axios** via `src/frontend/api/api.ts`. Alle kall inkluderer:
- `x-request-id` header (UUID)
- `withCredentials: true`
- Automatisk redirect til login ved 401 (Wonderwall-interceptor)

### Playwright-tester

Testene ligger i `tests/søknader/` med støttefiler:
- `tests/mocks/` – API-mocking via `page.route()` (person, aktivitet, søknad)
- `tests/utils/` – hjelpefunksjoner (`klikkPåKnapp`, `lastOppFil`, `forventIngenWcagViolations`)

Alle tester kjører WCAG-validering med `@axe-core/playwright`. Mocking-mønsteret:
```typescript
await page.route('api/person/med-barn', async (route) => {
    await route.fulfill({ json: mockData });
});
```

### Import-rekkefølge

ESLint håndhever sortert import-rekkefølge:
1. Builtin/external (React først)
2. Internal (`@navikt/**` først)
3. Parent/sibling
4. Index

Med blanke linjer mellom gruppene.

### Ny stønadstype

For å legge til en ny stønadstype, følg mønsteret fra `barnetilsyn/` eller `læremidler/`:
1. Opprett mappe med `routing/`, `steg/`, `tekster/`
2. Definer route-enum og path-mapping
3. Lag context med constate for skjemadata
4. Legg til route i `index.tsx`
5. Legg til stønadstype i `Stønadstype`-enum
