import { InlineLenke, TekstElement } from '../../typer/tekst';

interface FolkeregistrertAdresseInnhold {
    folkereg_adresse: TekstElement<string>;
    info_tekst: TekstElement<InlineLenke>;
    info_adresse_mangler: TekstElement<InlineLenke>;
}

export const folkeregistrertAdresseTekster: FolkeregistrertAdresseInnhold = {
    folkereg_adresse: {
        nb: 'Din folkeregistrerte adresse er [0].',
    },
    info_tekst: {
        nb: [
            'Adressen er hentet fra Folkeregisteret. Det er viktig at denne adressen er korrekt. Du kan ',
            {
                tekst: 'endre adressen på Skatteetatens nettsider (åpnes i ny fane)',
                url: 'https://www.skatteetaten.no/person/folkeregister/endre/',
            },
        ],
    },
    info_adresse_mangler: {
        nb: [
            'Vi fant ingen folkeregistrert adresse. Det er viktig at folkeregistrerte opplysninger er korrekte. Du kan ',
            {
                tekst: 'endre adressen på Skatteetatens nettsider (åpnes i ny fane)',
                url: 'https://www.skatteetaten.no/person/folkeregister/endre/',
            },
        ],
    },
};
