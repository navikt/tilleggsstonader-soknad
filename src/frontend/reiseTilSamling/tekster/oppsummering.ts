import { TekstElement } from '../../typer/tekst';

interface OppsummeringInnhold {
    tittel: TekstElement<string>;
    reiseavstand_tittel: TekstElement<string>;
    adressen_du_skal_reise_fra: TekstElement<string>;
    adressen_du_skal_reise_til: TekstElement<string>;
    samlinger_tittel: TekstElement<string>;
    reisemåte_tittel: TekstElement<string>;
}

export const oppsummeringTekster: OppsummeringInnhold = {
    tittel: { nb: 'Oppsummering' },
    reiseavstand_tittel: { nb: 'Reiseavstand' },
    adressen_du_skal_reise_fra: { nb: 'Adressen du skal reise fra' },
    adressen_du_skal_reise_til: { nb: 'Adressen du skal reise til' },
    samlinger_tittel: { nb: 'Samlinger' },
    reisemåte_tittel: { nb: 'Reisemåte' },
};
