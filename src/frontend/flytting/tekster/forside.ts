import { ForsideTekster } from '../../components/Forside/ForsideTekster';
import { skjematypeTilSkjemainfo } from '../../typer/skjemanavn';

export const forsideTekster: ForsideTekster = {
    banner_tittel: {
        nb: 'Søknad om støtte ved flytting',
    },
    veileder_innhold: {
        nb: [
            'Her kan du søke om pengestøtte dersom du flytter i forbindelse med utdanning, arbeidsrettet tiltak eller overgang til arbeid. Det gjelder også enslig mor eller far og gjenlevende som flytter fra hjemstedet for å begynne i arbeid.',
        ],
    },
    dette_ma_du_vite_innhold: {
        nb: [
            'Nav kan dekke flytteutgifter mellom hjemstedet ditt og aktivitetsstedet når du midlertidig må bo borte for å delta på arbeidsrettet tiltak eller utdanning/opplæring godkjent av Nav.',
            'Du kan velge å flytte selv eller bruke et flyttebyrå. Hvis du bruker flyttebyrå, må du innhente to skriftlige tilbud. Nav dekker kostnadene basert på det billigste tilbudet.',
            'Når vi vurderer om du kan få støtte til flytting, ser vi blant annet på om tiltaksstedet, utdanningsstedet eller arbeidsstedet ligger utenfor naturlig pendleravstand.',
            'Hvis du flytter for å begynne i arbeid, vurderer vi også hvor lenge arbeidsforholdet varer, om du har arbeidskontrakt, om du har søkt arbeid på hjemstedet og om stillingen er meldt til Nav eller er offentlig utlyst.',
            'Du kan ikke få støtte til utgifter som arbeidsgiveren din eller andre allerede dekker.',
            'Du får støtten utbetalt i etterkant, basert på innsendt dokumentasjon som for eksempel kvitteringer eller betalt faktura.',
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
                    url: `https://www.nav.no/fyllut/${skjematypeTilSkjemainfo.SØKNAD_FLYTTING.papirskjemaId}?sub=paper`,
                },
                ' (åpnes i ny fane).',
            ],
        ],
    },
};
