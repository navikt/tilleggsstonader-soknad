import { TekstElement } from '../../typer/tekst';

interface SamlingerInnhold {
    tittel: TekstElement<string>;
    guide_tekst: TekstElement<string>;
    startdato_label: TekstElement<string>;
    sluttdato_label: TekstElement<string>;
    vedlegg_alert_tittel: TekstElement<string>;
    vedlegg_alert_innhold: TekstElement<string>;
    knapp_legg_til: TekstElement<string>;
    knapp_slett: TekstElement<string>;
    feilmelding_startdato: TekstElement<string>;
    feilmelding_sluttdato: TekstElement<string>;
    feilmelding_sluttdato_før_startdato: TekstElement<string>;
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
    vedlegg_alert_tittel: {
        nb: 'Du må legge ved bekreftelse på samlingen.',
    },
    vedlegg_alert_innhold: {
        nb: 'Du får instruksjoner om innsending av vedlegg senere i søknaden.',
    },
    knapp_legg_til: {
        nb: 'Legg til samling',
    },
    knapp_slett: {
        nb: 'Slett',
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
};
