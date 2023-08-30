import { JaNei } from '../../typer/søknad';
import { Radiogruppe, TekstElement } from '../../typer/tekst';

interface AktivitetInnhold {
    steg_tittel: TekstElement<string>;
    radio_utdanning: Radiogruppe<JaNei>;
}

export const aktivitetTekster: AktivitetInnhold = {
    steg_tittel: {
        nb: 'Aktivitet',
    },
    radio_utdanning: {
        header: {
            nb: 'Skal du søke om støtte til pass av barn i forbindelse med utdanning?',
        },
        alternativer: [
            {
                value: 'ja',
                label: {
                    nb: 'Ja',
                },
            },
            {
                value: 'nei',
                label: {
                    nb: 'Nei',
                },
            },
        ],
    },
};
