import { ForsideTekster } from '../../components/Forside/ForsideTekster';
import { skjematypeTilSkjemainfo } from '../../typer/skjemanavn';
export const forsideTekster: ForsideTekster = {
    banner_tittel: {
        nb: 'Søknad om støtte til reise ved oppstart, avslutning og hjemreise',
    },
    veileder_innhold: {
        nb: [
            'Her kan du søke om pengestøtte til reise på grunn av oppstart, avslutning og hjemreise.',
            'Pengestøtten gis til deg som gjennomfører en arbeidsrettet aktivitet og er enslig mor/far, gjenlevende, mottar arbeidsavklaringspenger, aktivitetspenger, dagpenger, kvalifiseringsstønad eller sitter i fengsel og ellers ville hatt rett til tiltakspenger.',
        ],
    },
    dette_ma_du_vite_innhold: {
        nb: [
            'Nav kan dekke reiseutgifter mellom hjemstedet ditt og aktivitetsstedet når du midlertidig må bo borte for å delta på arbeidsrettet tiltak eller utdanning/opplæring godkjent av Nav.',
            'Du får som hovedregel dekket den billigste reisemåten med offentlig transport. Hvis det ikke er praktisk mulig å bruke offentlig transport, kan du få dekket nødvendige utgifter til annen reisemåte.',
            'Du kan få dekket reiseutgifter til oppstart, avslutning og hjemreiser, og får vanligvis dekket inntil 4 hjemreiser tur/retur per år.',
            'Du kan få dekket utgifter til flere hjemreiser hvis du har barn som ennå ikke har fullført 4. skoleår og blir igjen på hjemstedet.',
            'Du kan også få dekket utgifter til hjemreise ved særlige grunner som for eksempel helsemessige årsaker.',
            'Hvis tiltaket varer i flere år, må du sende ny søknad for hvert år.',
            'Du kan få dekket reiseutgifter for barn under 18 år som flytter sammen med deg.',
            'Du får støtten utbetalt i etterkant, basert på innsendt dokumentasjon som for eksempel kvitteringer på reiseutgifter.',
        ],
    },
    var_klar_over_innhold: {
        nb: [
            'Du må gi oss beskjed hvis situasjonen din endrer seg, for eksempel hvis du avbryter tiltaket eller utdanningen.',
            'Hvis du får penger du ikke har rett på, kan vi kreve dem tilbake.',
        ],
    },
    kan_ikke_soke_innhold: {
        nb: [
            'Du er under 18 år',
            'Du søker på vegne av andre',
            [
                'Du søker støtte for en aktivitet som ble avsluttet for mer enn 6 måneder siden. Da må du fylle ut ',
                {
                    tekst: 'dette skjemaet i stedet',
                    url: `https://www.nav.no/fyllut/${skjematypeTilSkjemainfo.SØKNAD_REISE_OPPSTART_AVSLUTNING_HJEMREISE.papirskjemaId}?sub=paper`,
                },
                ' (åpnes i ny fane).',
            ],
        ],
    },
};
