import { TekstElement } from '../../typer/tekst';

interface OppsummeringInnhold {
    tittel: TekstElement<string>;
    aktivitet_tittel: TekstElement<string>;
    avreiseadresse_tittel: TekstElement<string>;
    adressen_du_skal_reise_fra: TekstElement<string>;
    adressen_du_skal_reise_til: TekstElement<string>;
    reiseavstand_label: TekstElement<string>;
    samlinger_tittel: TekstElement<string>;
    reisemåte_tittel: TekstElement<string>;
}

export const oppsummeringTekster: OppsummeringInnhold = {
    tittel: { nb: 'Oppsummering' },
    aktivitet_tittel: { nb: 'Aktivitet' },
    avreiseadresse_tittel: { nb: 'Avreiseadresse' },
    adressen_du_skal_reise_fra: { nb: 'Adressen du skal reise fra' },
    adressen_du_skal_reise_til: { nb: 'Adressen du skal reise til' },
    reiseavstand_label: { nb: 'Reiseavstand' },
    samlinger_tittel: { nb: 'Samlinger' },
    reisemåte_tittel: { nb: 'Reisemåte' },
};
