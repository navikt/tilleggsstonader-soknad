import { TekstElement } from '../typer/tekst';

export const tekstArbeidsrettedeAktiviteter: {
    checkboks_annet_tekst: TekstElement<string>;
    lesMer: {
        header: TekstElement<string>;
        header_ingen_registrerte_aktiviteter: TekstElement<string>;
    };
} = {
    checkboks_annet_tekst: { nb: 'Annet' },
    lesMer: {
        header: {
            nb: 'Hva gjør jeg hvis noe mangler eller er feil?',
        },
        header_ingen_registrerte_aktiviteter: {
            nb: 'Hva gjør jeg hvis noe mangler?',
        },
    },
};
