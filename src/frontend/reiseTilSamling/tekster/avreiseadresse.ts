import { FregAdresseEllerManuellAdresseInnhold } from '../../components/FolkeregistrertAdresseInformasjon/tekster';
import { JaNeiTilTekst } from '../../tekster/felles';
import { TekstElement } from '../../typer/tekst';

interface AvreiseadresseInnhold extends FregAdresseEllerManuellAdresseInnhold {
    tittel: TekstElement<string>;
}

export const avreiseadresseTekster: AvreiseadresseInnhold = {
    tittel: {
        nb: 'Avreiseadresse',
    },
    bruk_folkeregistrert_adresse: {
        header: {
            nb: 'Skal du reise fra din folkeregistrerte adresse?',
        },
        alternativer: JaNeiTilTekst,
        feilmelding: {
            nb: 'Du må svare på om du skal reise fra din folkeregistrerte adresse.',
        },
    },
    manuell_adresse_tittel: { nb: 'Oppgi adressen du skal reise fra' },
    manuell_adresse: {
        land: {
            label: { nb: 'Velg land' },
            feilmelding: { nb: 'Du må velge land.' },
        },
        gateadresse: {
            label: { nb: 'Gateadresse' },
            feilmelding: { nb: 'Du må fylle inn gateadresse.' },
        },
        postnummer: {
            label: { nb: 'Postnummer' },
            feilmelding: { nb: 'Du må fylle inn postnummer.' },
        },
        poststed: {
            label: { nb: 'Poststed' },
            feilmelding: { nb: 'Du må fylle inn poststed.' },
        },
    },
};
