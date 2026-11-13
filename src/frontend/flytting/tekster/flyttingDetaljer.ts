import { drivstoffTypeTekster } from '../../components/DrivstoffTypeVelger';
import { JaNeiTilTekst } from '../../tekster/felles';
import { DrivstoffType } from '../../typer/reisemåte';
import { Adresse, JaNei } from '../../typer/søknad';
import {
    InputFelt,
    RadiogruppePåkrevd,
    SelectGruppePåkrevd,
    TekstElement,
} from '../../typer/tekst';
import {
    EgenutgiftFelt,
    Flytteårsak,
    Flyttemåte,
    UtgifterDekketPåAnnenMåte,
} from '../typer/flyttingDetaljer';

interface FlyttingDetaljerInnhold {
    tittel: TekstElement<string>;
    guide_tekst: TekstElement<string>;
    radio_årsak: RadiogruppePåkrevd<Flytteårsak>;
    dato_flytting: InputFelt;
    radio_skalFlytteFraFolkeregistrertAdresse: RadiogruppePåkrevd<JaNei>;
    folkereg_adresse: TekstElement<string>;
    adresse_fra_tittel: TekstElement<string>;
    adresse_fra_spørsmål: Record<keyof Adresse, InputFelt>;
    adresse_tittel: TekstElement<string>;
    adresse_spørsmål: Record<keyof Adresse, InputFelt>;
    radio_flyttemåte: RadiogruppePåkrevd<Flyttemåte>;
    radio_annen_dekning: RadiogruppePåkrevd<UtgifterDekketPåAnnenMåte>;
    varsel_dokumentasjon_flytter_selv: TekstElement<string>;
    varsel_dokumentasjon_flyttebyrå: TekstElement<string>;
    varsel_arbeidskontrakt: TekstElement<string>;
    egenutgifter_tittel: TekstElement<string>;
    drivstoffType: SelectGruppePåkrevd<DrivstoffType>;
    antall_km: InputFelt;
    egenutgifter_beløp: Record<EgenutgiftFelt, InputFelt>;
    tilbud_tittel: TekstElement<string>;
    info_tilbud: TekstElement<string>;
    tilbud_spørsmål: [
        {
            navn: InputFelt;
            beløp: InputFelt;
        },
        {
            navn: InputFelt;
            beløp: InputFelt;
        },
    ];
    varsel_annen_dekning_hele: TekstElement<string>;
    varsel_annen_dekning_deler: TekstElement<string>;
}

const beløpFeilmelding: TekstElement<string> = {
    nb: 'Oppgi et beløp som er 0 eller større, med inntil to desimaler.',
};

export const flyttingDetaljerTekster: FlyttingDetaljerInnhold = {
    tittel: { nb: 'Detaljer om flytting' },
    guide_tekst: {
        nb: 'For å få denne støtten må du delta på arbeidsrettet tiltak, gjennomføre en utdanning godkjent av Nav, eller fått jobb et annet sted',
    },
    radio_årsak: {
        header: { nb: 'Hvorfor flytter du?' },
        alternativer: {
            AKTIVITET: { nb: 'Jeg flytter fra/til hjemsted på grunn av tiltak eller utdanning' },
            NY_JOBB: { nb: 'Jeg flytter fordi jeg har fått ny jobb' },
        },
        feilmelding: { nb: 'Du må oppgi hvorfor du flytter.' },
    },
    dato_flytting: {
        label: { nb: 'Flyttedato' },
        description: { nb: 'Format: dd.mm.åååå' },
        feilmelding: { nb: 'Oppgi en gyldig flyttedato på formatet dd.mm.åååå.' },
    },
    radio_skalFlytteFraFolkeregistrertAdresse: {
        header: { nb: 'Flytter du fra din folkeregistrerte adresse?' },
        alternativer: JaNeiTilTekst,
        feilmelding: { nb: 'Du må svare på om du flytter fra din folkeregistrerte adresse.' },
    },
    folkereg_adresse: { nb: 'Din folkeregistrerte adresse er [0].' },
    adresse_fra_tittel: { nb: 'Oppgi adressen du flytter fra' },
    adresse_fra_spørsmål: {
        land: { label: { nb: 'Velg land' }, feilmelding: { nb: 'Du må velge land.' } },
        gateadresse: {
            label: { nb: 'Gateadresse' },
            feilmelding: { nb: 'Du må oppgi gateadresse.' },
        },
        postnummer: { label: { nb: 'Postnummer' }, feilmelding: { nb: 'Du må oppgi postnummer.' } },
        poststed: { label: { nb: 'Poststed' }, feilmelding: { nb: 'Du må oppgi poststed.' } },
    },
    adresse_tittel: { nb: 'Oppgi adressen du flytter til' },
    adresse_spørsmål: {
        land: { label: { nb: 'Velg land' }, feilmelding: { nb: 'Du må velge land.' } },
        gateadresse: {
            label: { nb: 'Gateadresse' },
            feilmelding: { nb: 'Du må oppgi gateadresse.' },
        },
        postnummer: { label: { nb: 'Postnummer' }, feilmelding: { nb: 'Du må oppgi postnummer.' } },
        poststed: { label: { nb: 'Poststed' }, feilmelding: { nb: 'Du må oppgi poststed.' } },
    },
    radio_flyttemåte: {
        header: { nb: 'Flytter du selv eller kommer du til å bruke flyttebyrå?' },
        alternativer: {
            FLYTTER_SELV: { nb: 'Jeg flytter selv' },
            FLYTTEBYRÅ: { nb: 'Jeg vil bruke flyttebyrå' },
        },
        feilmelding: { nb: 'Du må velge hvordan du skal flytte.' },
    },
    varsel_dokumentasjon_flytter_selv: {
        nb: 'Du må dokumentere alle utgiftene du søker om. Skal du leie bil og flytte selv, må du først innhente skriftlige tilbud fra minst to flyttebyråer. Utgiftene kan dekkes opptil beløpet i det laveste tilbudet. Hvis du ikke har dokumentasjonen nå, kan du ettersende den senere.',
    },
    varsel_dokumentasjon_flyttebyrå: {
        nb: 'Du må dokumentere alle utgiftene du søker om. Ved bruk av flyttebyrå så må du innhente skriftlige tilbud fra minst to flyttebyråer. Hvis du ikke har dokumentasjonen nå, kan du ettersende den senere.',
    },
    varsel_arbeidskontrakt: {
        nb: 'Du må legge ved arbeidskontrakten din. Har du ikke den nå, kan du ettersende den senere.',
    },
    radio_annen_dekning: {
        header: {
            nb: 'Får du dekket utgiftene dine til flytting på annen måte enn med stønad fra Nav?',
        },
        beskrivelse: {
            nb: 'Oppgi om arbeidsgiver eller andre dekker hele eller deler av flytteutgiftene dine. Nav kan ikke dekke utgifter som allerede dekkes av andre.',
        },
        alternativer: {
            JA_HELE: { nb: 'Ja, hele utgiften blir dekket' },
            JA_DELER: { nb: 'Ja, deler av utgiften blir dekket' },
            NEI: { nb: 'Nei' },
        },
        feilmelding: { nb: 'Du må svare på om du får dekket flytteutgiftene på annen måte.' },
    },
    varsel_annen_dekning_hele: {
        nb: 'Hvis du får dekket hele utgiften til flytting av arbeidsgiver eller andre, vil du sannsynlig få avslag, men du kan fortsatt søke. ',
    },
    varsel_annen_dekning_deler: {
        nb: 'Hvis du får dekket deler av utgiftene til flytting, kan du få pengestøtte for den delen av utgiftene som ikke er dekket. Du må sende oss dokumentasjon som viser hvilke utgifter som er dekket og hvilke utgifter som ikke er dekket.',
    },
    egenutgifter_tittel: { nb: 'Utgifter til flytting' },
    drivstoffType: {
        ...drivstoffTypeTekster,
        header: { nb: 'Hva slags drivstoff bruker bilen du flytter med?' },
    },
    antall_km: {
        label: { nb: 'Hvor lang reisevei har du?' },
        description: { nb: 'Oppgi antall kilometer én vei' },
        feilmelding: { nb: 'Oppgi en avstand som er større enn 0, med inntil to desimaler.' },
    },
    egenutgifter_beløp: {
        hengerleie: {
            label: { nb: 'Leie av tilhenger' },
            feilmelding: beløpFeilmelding,
        },
        leiebil: {
            label: { nb: 'Leie av bil' },
            feilmelding: beløpFeilmelding,
        },
        bom: {
            label: { nb: 'Bom' },
            feilmelding: beløpFeilmelding,
        },
        parkering: {
            label: { nb: 'Parkering' },
            feilmelding: beløpFeilmelding,
        },
        ferje: {
            label: { nb: 'Ferje' },
            feilmelding: beløpFeilmelding,
        },
        annet: {
            label: { nb: 'Annet' },
            feilmelding: beløpFeilmelding,
        },
    },
    tilbud_tittel: { nb: 'Tilbud fra to flyttebyrå' },
    info_tilbud: {
        nb: 'Hvis du bruker flyttebyrå, må du hente inn to tilbud fra ulike flyttebyråer. Nav dekker utgiftene etter det laveste tilbudet.',
    },
    tilbud_spørsmål: [
        {
            navn: {
                label: { nb: 'Navn på flyttebyrå 1' },
                feilmelding: { nb: 'Du må oppgi navn på flyttebyrå 1.' },
            },
            beløp: {
                label: { nb: 'Beløp for flyttebyrå 1' },
                feilmelding: beløpFeilmelding,
            },
        },
        {
            navn: {
                label: { nb: 'Navn på flyttebyrå 2' },
                feilmelding: { nb: 'Du må oppgi navn på flyttebyrå 2.' },
            },
            beløp: {
                label: { nb: 'Beløp for flyttebyrå 2' },
                feilmelding: beløpFeilmelding,
            },
        },
    ],
};
