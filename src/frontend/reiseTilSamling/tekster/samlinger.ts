import { JaNeiTilTekst } from '../../tekster/felles';
import { JaNei } from '../../typer/søknad';
import { Radiogruppe, TekstElement } from '../../typer/tekst';

interface SamlingerInnhold {
    tittel: TekstElement<string>;
    guide_tekst: TekstElement<string>;
    startdato_label: TekstElement<string>;
    sluttdato_label: TekstElement<string>;
    vedlegg_alert_innhold: TekstElement<string>;
    knapp_legg_til: TekstElement<string>;
    knapp_slett: TekstElement<string>;
    feilmelding_startdato: TekstElement<string>;
    feilmelding_sluttdato: TekstElement<string>;
    feilmelding_sluttdato_før_startdato: TekstElement<string>;
    radio_samling_obligatorisk: Radiogruppe<JaNei>;
    feilmelding_radio_samling_obligatorisk: TekstElement<string>;
}

export const samlingerTekster: SamlingerInnhold = {
    tittel: {
        nb: 'Start- og sluttdato for samling',
    },
    guide_tekst: {
        nb: 'Velg «Legg til samling» nedenfor hvis du har deltatt eller skal delta på flere samlinger.',
    },
    startdato_label: {
        nb: 'Startdato (dd.mm.åååå)',
    },
    sluttdato_label: {
        nb: 'Sluttdato (dd.mm.åååå)',
    },
    vedlegg_alert_innhold: {
        nb: 'Du må legge ved bekreftelse på samlingen. Du får instruksjoner om innsending av vedlegg senere i søknaden.',
    },
    knapp_legg_til: {
        nb: 'Legg til samling',
    },
    knapp_slett: {
        nb: 'Fjern samling',
    },
    feilmelding_startdato: {
        nb: 'Du må fylle inn startdato.',
    },
    feilmelding_sluttdato: {
        nb: 'Du må fylle inn sluttdato.',
    },
    feilmelding_sluttdato_før_startdato: {
        nb: 'Sluttdato kan ikke være før startdato.',
    },
    radio_samling_obligatorisk: {
        header: {
            nb: 'Er samlingen obligatorisk?',
        },
        alternativer: JaNeiTilTekst,
        beskrivelse: {
            nb: 'Dersom samlingen ikke er obligatorisk er det usannsynlig at du får utbetalt stønad.',
        },
    },
    feilmelding_radio_samling_obligatorisk: {
        nb: 'Du må velge om samlingen er obligatorisk eller ikke.',
    },
};
