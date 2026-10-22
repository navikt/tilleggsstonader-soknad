import { JaNeiTilTekst } from '../../tekster/felles';
import { Adresse, JaNei } from '../../typer/søknad';
import { InputFelt, RadiogruppePåkrevd, TekstElement } from '../../typer/tekst';
import { EgenutgiftFelt, Flytteårsak, Flyttemåte } from '../typer/flyttingDetaljer';

interface FlyttingDetaljerInnhold {
    tittel: TekstElement<string>;
    radio_årsak: RadiogruppePåkrevd<Flytteårsak>;
    dato_flytting: InputFelt;
    adresse_tittel: TekstElement<string>;
    adresse_spørsmål: Record<keyof Adresse, InputFelt>;
    radio_flyttemåte: RadiogruppePåkrevd<Flyttemåte>;
    radio_annen_dekning: RadiogruppePåkrevd<JaNei>;
    varsel_dokumentasjon: {
        tittel: TekstElement<string>;
        innhold: TekstElement<string>;
    };
    egenutgifter_tittel: TekstElement<string>;
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
    varsel_annen_dekning: TekstElement<string>;
}

const beløpFeilmelding: TekstElement<string> = {
    nb: 'Oppgi et beløp som er 0 eller større, med inntil to desimaler.',
};

export const flyttingDetaljerTekster: FlyttingDetaljerInnhold = {
    tittel: { nb: 'Detaljer om flytting' },
    radio_årsak: {
        header: { nb: 'Hvorfor flytter du?' },
        alternativer: {
            NY_JOBB: { nb: 'Jeg flytter fordi jeg har fått ny jobb' },
            AKTIVITET: { nb: 'Jeg flytter i forbindelse med at jeg skal gjennomføre en aktivitet' },
        },
        feilmelding: { nb: 'Du må oppgi hvorfor du flytter.' },
    },
    dato_flytting: {
        label: { nb: 'Flyttedato' },
        description: { nb: 'Format: dd.mm.åååå' },
        feilmelding: { nb: 'Oppgi en gyldig flyttedato på formatet dd.mm.åååå.' },
    },
    adresse_tittel: { nb: 'Adressen du flytter til' },
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
    varsel_dokumentasjon: {
        tittel: { nb: 'Dokumentasjon av utgifter' },
        innhold: {
            nb: 'Du må dokumentere alle utgiftene du søker om. Hvis du ikke har dokumentasjonen nå, kan du ettersende den senere.',
        },
    },
    radio_annen_dekning: {
        header: {
            nb: 'Får du dekket utgiftene dine til flytting på annen måte enn med stønad fra Nav?',
        },
        alternativer: JaNeiTilTekst,
        feilmelding: { nb: 'Du må svare på om du får dekket flytteutgiftene på annen måte.' },
    },
    varsel_annen_dekning: {
        nb: 'Hvis du får flytteutgiftene dekket på annen måte, kan du mangle rett til støtte fra Nav.',
    },
    egenutgifter_tittel: { nb: 'Utgifter til flytting' },
    antall_km: {
        label: { nb: 'Hvor lang reisevei har du?' },
        description: { nb: 'Angi antall kilometer mellom bostedet ditt og der du skal flytte' },
        feilmelding: { nb: 'Oppgi en avstand som er større enn 0, med inntil to desimaler.' },
    },
    egenutgifter_beløp: {
        hengerleie: {
            label: { nb: 'Hengerleie' },
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
