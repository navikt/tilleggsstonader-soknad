import { jaNeiAlternativer } from '../../tekster/felles';
import { JaNei } from '../../typer/søknad';
import { InlineLenke, Radiogruppe, TekstElement } from '../../typer/tekst';

export interface ArbeidOgOppholdInnhold {
    tittel: TekstElement<string>;
    guide_innhold: TekstElement<InlineLenke>;
}

export interface JobberIAnnetLandInnhold {
    radio_jobber_annet_land: Radiogruppe<JaNei>;
    feilmnelding_jobber_annet_land: TekstElement<string>;
    select_hvilket_land: TekstElement<string>;
    feilmelding_select_hvilket_land: TekstElement<string>;
}

export const arbeidOgOppholdInnhold: ArbeidOgOppholdInnhold = {
    tittel: {
        nb: 'Arbeid og opphold utenfor Norge',
    },
    guide_innhold: {
        nb: [
            'For å finne ut om du oppfyller kravene til ',
            {
                tekst: 'medlemskap i folketrygden',
                url: 'https://www.nav.no/no/person/flere-tema/arbeid-og-opphold-i-norge/relatert-informasjon/medlemskap-i-folketrygden',
                variant: 'neutral',
            },
            ' (åpnes i ny fane), trenger vi å vite om du har bodd eller jobbet i utlandet.',
        ],
    },
};

export const jobberIAnnetLandInnhold: JobberIAnnetLandInnhold = {
    radio_jobber_annet_land: {
        header: {
            nb: 'Jobber du i et annet land enn Norge?',
        },
        alternativer: jaNeiAlternativer,
    },
    feilmnelding_jobber_annet_land: {
        nb: 'Du må svare på om du jobber i et annet land enn Norge.',
    },
    select_hvilket_land: {
        nb: 'Hvilket land jobber du i?',
    },
    feilmelding_select_hvilket_land: {
        nb: 'Du må velge hvilket land du jobber i.',
    },
};
