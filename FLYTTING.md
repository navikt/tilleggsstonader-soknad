# Flytting

Flytting er et frontend-skjelett under utvikling. Appen er bare tilgjengelig utenfor produksjon. Den inneholder generiske steg for hovedytelse, vedlegg og oppsummering. Den har ingen flyttespesifikke spørsmål eller vedleggskrav.

## API og payload

Frontend forventer å sende søknaden til `POST /api/soknad/flytting`. API-proxyen legger til `/api`; backend-endepunktet må bekrefte path og kontrakt før produksjonssetting.

`SøknadFlytting` følger eksisterende søknadsformat:

```ts
interface SøknadFlytting {
    hovedytelse: Hovedytelse | undefined;
    dokumentasjon: DokumentasjonFelt[];
    søknadMetadata: SøknadMetadata;
}
```

Payloaden inneholder ingen aktivitet, flytteadresse eller andre flyttespesifikke data. Vedleggssiden viser en melding om at dokumentasjonskravene ikke er avklart. Mock for hovedytelse og forhåndsbekreftelse brukes bare lokalt.

## Forslag til Kotlin-modell

Hvis API-et bruker de delte modellene som tilsvarer de øvrige søknadene, kan request-modellen se slik ut:

```kotlin
data class SøknadFlytting(
    val hovedytelse: Hovedytelse?,
    val dokumentasjon: List<DokumentasjonFelt>,
    val søknadMetadata: SøknadMetadata,
)
```

`SøknadMetadata` bør kunne ta imot `søknadFrontendGitHash` som en nullable streng. Bruk eksisterende backend-modeller for `Hovedytelse`, `DokumentasjonFelt` og metadata hvis de passer. Avklar navn, nullbarhet og serialisering med backend-repoet.

## Uavklarte verdier

- Skjema-ID i frontend-headeren er markert `TODO` i `src/frontend/typer/skjemanavn.ts`.
- Papirsøknad-ID er markert `TODO_FLYTTING` i `src/frontend/api/Environment.ts`.
- Endelig API-path og request-modell må avklares med backend før produksjonssetting.
- Backend må støtte `SØKNAD_FLYTTING` i søknads-, behandlingsstatus- og eventuelle aktivitetsoppslag.
- Søknadens dokumentasjonskrav og tekst for eksisterende behandling må avklares før flyten tas i bruk.

## Gjenbruk og mønstre

Flytting bruker felles søknadsshell, dialog, hovedytelsesside og oppsummeringskomponenter uten å endre dem. Flere søknader har også like, tynne wrappers rundt hovedytelsessiden og tilsvarende oppsett av søknadskontekst. Disse er beholdt lokalt i Flytting; eventuell fellesgjøring bør avklares før det endres på tvers av søknadene.
