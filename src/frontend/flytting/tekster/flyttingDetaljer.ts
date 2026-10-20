import { JaNeiTilTekst } from '../../tekster/felles';
import { Adresse, JaNei } from '../../typer/søknad';
import { InputFelt, RadiogruppePåkrevd, TekstElement } from '../../typer/tekst';
import { EgenutgiftFelt, Flytteårsak, Flyttemåte, ValgtTilbud } from '../typer/flyttingDetaljer';

interface FlyttingDetaljerInnhold {
    tittel: TekstElement<string>;
    radio_årsak: RadiogruppePåkrevd<Flytteårsak>;
    dato_flytting: InputFelt;
    dato_første_arbeidsdag: InputFelt;
    adresse_tittel: TekstElement<string>;
    adresse_spørsmål: Record<keyof Adresse, InputFelt>;
    radio_flyttemåte: RadiogruppePåkrevd<Flyttemåte>;
    radio_annen_dekning: RadiogruppePåkrevd<JaNei>;
    egenutgifter_tittel: TekstElement<string>;
    antall_km: InputFelt;
    egenutgifter_beløp: Record<EgenutgiftFelt, InputFelt>;
    tilbud_tittel: TekstElement<string>;
    info_tilbud: TekstElement<string>;
    tilbud1_spørsmål: {
        navn: InputFelt;
        beløp: InputFelt;
    };
    tilbud2_spørsmål: {
        navn: InputFelt;
        beløp: InputFelt;
    };
    radio_valgt_tilbud: RadiogruppePåkrevd<ValgtTilbud>;
    varsel_annen_dekning: TekstElement<string>;
    varsel_dyrere_tilbud: {
        tittel: TekstElement<string>;
        innhold: TekstElement<string>;
    };
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
        label: { nb: 'Når flytter du?' },
        description: { nb: 'Format: dd.mm.åååå' },
        feilmelding: { nb: 'Oppgi en gyldig flyttedato på formatet dd.mm.åååå.' },
    },
    dato_første_arbeidsdag: {
        label: { nb: 'Oppgi første dag i ny jobb' },
        description: { nb: 'Format: dd.mm.åååå' },
        feilmelding: { nb: 'Oppgi en gyldig første arbeidsdag på formatet dd.mm.åååå.' },
    },
    adresse_tittel: { nb: 'Hvor flytter du?' },
    adresse_spørsmål: {
        land: { label: { nb: 'Land' }, feilmelding: { nb: 'Du må velge land.' } },
        gateadresse: {
            label: { nb: 'Gateadresse' },
            feilmelding: { nb: 'Du må oppgi gateadresse.' },
        },
        postnummer: { label: { nb: 'Postnummer' }, feilmelding: { nb: 'Du må oppgi postnummer.' } },
        poststed: { label: { nb: 'Poststed' }, feilmelding: { nb: 'Du må oppgi poststed.' } },
    },
    radio_flyttemåte: {
        header: { nb: 'Ordner du flyttingen selv eller kommer du til å bruke flyttebyrå?' },
        alternativer: {
            FLYTTER_SELV: { nb: 'Jeg flytter selv' },
            FLYTTEBYRÅ: { nb: 'Jeg vil bruke flyttebyrå' },
        },
        feilmelding: { nb: 'Du må velge hvordan du skal flytte.' },
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
        label: { nb: 'Hvor langt skal du flytte (km)?' },
        description: { nb: 'Oppgi avstand i kilometer.' },
        feilmelding: { nb: 'Oppgi en avstand som er større enn 0, med inntil to desimaler.' },
    },
    egenutgifter_beløp: {
        hengerleie: {
            label: { nb: 'Hengerleie (valgfritt)' },
            description: { nb: 'Beløp i kroner.' },
            feilmelding: beløpFeilmelding,
        },
        bom: {
            label: { nb: 'Bom (valgfritt)' },
            description: { nb: 'Beløp i kroner.' },
            feilmelding: beløpFeilmelding,
        },
        parkering: {
            label: { nb: 'Parkering (valgfritt)' },
            description: { nb: 'Beløp i kroner.' },
            feilmelding: beløpFeilmelding,
        },
        ferje: {
            label: { nb: 'Ferje (valgfritt)' },
            description: { nb: 'Beløp i kroner.' },
            feilmelding: beløpFeilmelding,
        },
        annet: {
            label: { nb: 'Annet (valgfritt)' },
            description: { nb: 'Beløp i kroner.' },
            feilmelding: beløpFeilmelding,
        },
    },
    tilbud_tittel: { nb: 'Tilbud fra to flyttebyrå' },
    info_tilbud: {
        nb: 'Dersom du bruker flyttebyrå, må du innhente minst to tilbud fra ulike flyttebyråer. Du må legge ved dokumentasjon av at du har innhentet tilbud, og opplyse Nav om hvilket tilbud du velger. Du vil få dekket det laveste tilbudet.',
    },
    tilbud1_spørsmål: {
        navn: {
            label: { nb: 'Navn på flyttebyrå 1' },
            feilmelding: { nb: 'Du må oppgi navn på flyttebyrå 1.' },
        },
        beløp: {
            label: { nb: 'Beløp for flyttebyrå 1' },
            description: { nb: 'Beløp i kroner.' },
            feilmelding: beløpFeilmelding,
        },
    },
    tilbud2_spørsmål: {
        navn: {
            label: { nb: 'Navn på flyttebyrå 2' },
            feilmelding: { nb: 'Du må oppgi navn på flyttebyrå 2.' },
        },
        beløp: {
            label: { nb: 'Beløp for flyttebyrå 2' },
            description: { nb: 'Beløp i kroner.' },
            feilmelding: beløpFeilmelding,
        },
    },
    radio_valgt_tilbud: {
        header: { nb: 'Jeg velger å bruke' },
        alternativer: {
            TILBUD_1: { nb: 'Flyttebyrå 1' },
            TILBUD_2: { nb: 'Flyttebyrå 2' },
        },
        feilmelding: { nb: 'Du må velge hvilket flyttebyrå du vil bruke.' },
    },
    varsel_dyrere_tilbud: {
        tittel: { nb: 'Du har valgt det dyreste tilbudet' },
        innhold: {
            nb: 'Du kan fortsatt få støtte, men Nav dekker maksimalt beløpet i tilbudet med lavest pris. Du må betale mellomlegget selv.',
        },
    },
};
