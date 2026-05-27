import { JaNeiTilTekst } from '../../tekster/felles';
import { JaNei } from '../../typer/søknad';
import { Radiogruppe, TekstElement } from '../../typer/tekst';

interface ReisemåteInnhold {
    tittel: TekstElement<string>;
    radio_kan_reise_kollektivt: Radiogruppe<JaNei>;
    totalutgifter_kollektivt_label: TekstElement<string>;
    totalutgifter_kollektivt_beskrivelse: TekstElement<string>;
    radio_kan_benytte_egen_bil: Radiogruppe<JaNei>;
    radio_kan_benytte_drosje: Radiogruppe<JaNei>;
    advarsel_ingen_reisemåte: TekstElement<string>;
    feilmelding_kollektivt_mangler: TekstElement<string>;
    feilmelding_totalutgifter_mangler: TekstElement<string>;
    feilmelding_totalutgifter_ugyldig: TekstElement<string>;
    feilmelding_bil_mangler: TekstElement<string>;
    feilmelding_drosje_mangler: TekstElement<string>;
}

export const reisemåteTekster: ReisemåteInnhold = {
    tittel: {
        nb: 'Reisemåte',
    },
    radio_kan_reise_kollektivt: {
        header: {
            nb: 'Kan du reise kollektivt?',
        },
        alternativer: JaNeiTilTekst,
    },
    totalutgifter_kollektivt_label: {
        nb: 'Hva er totalutgiftene til kollektivtransport til og fra samlingene?',
    },
    totalutgifter_kollektivt_beskrivelse: {
        nb: 'Oppgi totalbeløpet i kroner for alle samlingene du søker for.',
    },
    radio_kan_benytte_egen_bil: {
        header: {
            nb: 'Kan du benytte egen bil?',
        },
        alternativer: JaNeiTilTekst,
    },
    radio_kan_benytte_drosje: {
        header: {
            nb: 'Kan du benytte drosje?',
        },
        alternativer: JaNeiTilTekst,
    },
    advarsel_ingen_reisemåte: {
        nb: 'Du har oppgitt at du ikke kan reise kollektivt, benytte egen bil eller drosje. Du vil derfor sannsynligvis få avslag på søknaden om stønad til reiser.',
    },
    feilmelding_kollektivt_mangler: {
        nb: 'Du må svare på om du kan reise kollektivt.',
    },
    feilmelding_totalutgifter_mangler: {
        nb: 'Du må fylle inn totalutgiftene.',
    },
    feilmelding_totalutgifter_ugyldig: {
        nb: 'Totalutgiftene må være et positivt tall.',
    },
    feilmelding_bil_mangler: {
        nb: 'Du må svare på om du kan benytte egen bil.',
    },
    feilmelding_drosje_mangler: {
        nb: 'Du må svare på om du kan benytte drosje.',
    },
};
