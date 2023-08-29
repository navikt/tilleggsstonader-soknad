import { TekstElement } from '../../typer/tekst';

interface KvitteringInnhold {
    steg_tittel: TekstElement<string>;
}

export const kvitteringTekster: KvitteringInnhold = {
    steg_tittel: {
        nb: 'Kvittering',
    },
};
