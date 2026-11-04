import { ForsideTekster } from '../../components/Forside/ForsideTekster';

export const forsideTekster: ForsideTekster = {
    banner_tittel: {
        nb: 'Søknad om støtte ved reise til samling',
    },
    veileder_innhold: {
        nb: [
            'Her kan du søke om å få dekket nødvendige reiseutgifter til og fra en samling i forbindelse med et arbeidsrettet tiltak eller utdanning/opplæring godkjent av Nav.',
        ],
    },
    dette_ma_du_vite_innhold: {
        nb: [
            'Pengestøtten kan gis til deg som gjennomfører en arbeidsrettet aktivitet og er enslig mor/far, gjenlevende, mottar arbeidsavklaringspenger (AAP), uføretrygd, har nedsatt arbeidsevne, tiltakspenger, dagpenger, kvalifiseringsstønad eller sitter i fengsel og ellers ville hatt rett til tiltakspenger.',
            'Samlingen må være obligatorisk.',
            'Reiseavstanden må være minst 30 km èn vei.',
            'Vi dekker som hovedregel den billigste reisemåten med offentlig transport. Hvis det ikke er praktisk mulig å bruke offentlig transport, kan du få dekket nødvendige utgifter til annen reisemåte. Vi kommer til å gjøre en konkret vurdering av om du oppfyller vilkårene til annen reisemåte basert på den informasjonen og dokumentasjonen du oppgir.',
            'Du må vite adressen til samlingen. Du skal oppgi hvor du reiser til i søknaden.',
            'Du må dokumentere at samlingen er obligatorisk.',
            'Du må legge ved dokumentasjon på reisen, for eksempel tog- eller flybilletter og andre kvitteringer. Bruker du egen bil, kan du dokumentere utgifter til bom og ferge.',
            'Du får støtten utbetalt i etterkant, basert på kvitteringene du sender inn.',
        ],
    },
    var_klar_over_innhold: {
        nb: [
            'Du må gi oss beskjed hvis situasjonen din endrer seg, for eksempel hvis du avbryter tiltaket eller utdanningen.',
            'Hvis du får penger du ikke har rett på, kan vi kreve dem tilbake.',
            'Hvis tiltaket varer i flere år, må du sende en ny søknad for hvert år.',
            'De fleste feltene i skjemaet må du fylle ut. Felt som ikke er påkrevde, er merket med (valgfritt).',
            'Bruker du en offentlig PC, for eksempel på biblioteket, må du lukke nettleseren når du er ferdig. Da hindrer du at andre får tilgang til opplysningene du har skrevet inn.',
        ],
    },
    kan_ikke_soke_innhold: {
        nb: [
            'Du er under 18 år',
            'Du søker på vegne av andre',
            [
                'Du mottar arbeidsavklaringspenger (AAP), uføretrygd, aktivitetspenger for unge eller er enslig mor/far, gjenlevende, eller har nedsatt arbeidsevne. Og aktiviteten du søker støtte for, ble avsluttet for mer enn 6 måneder siden. Da må du fylle ut ',
                {
                    tekst: 'dette skjemaet i stedet',
                    url: 'https://www.nav.no/fyllut/nav111217b?sub=paper',
                },
                ' (åpnes i ny fane).',
            ],
        ],
    },
};
