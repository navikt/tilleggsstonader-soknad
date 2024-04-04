import { jaNeiAlternativer } from '../../tekster/felles';
import { JaNei, MottarPengestøtteTyper } from '../../typer/søknad';
import { CheckboxGruppe, InlineLenke, Radiogruppe, TekstElement } from '../../typer/tekst';

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

export interface MottarDuPengestøtteInnhold {
    checkbox_mottar_du_pengestøtte: CheckboxGruppe<MottarPengestøtteTyper>;
    feilmnelding_mottar_du_pengestøtte: TekstElement<string>;
    feilmnelding_mottar_ikke_pengestøtte_med_andre_valg: TekstElement<string>;
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

export const mottarPengestøtteInnhold: MottarDuPengestøtteInnhold = {
    checkbox_mottar_du_pengestøtte: {
        header: {
            nb: 'Mottar du pengestøttene fra et annet land enn Norge?',
        },
        alternativer: {
            SYKEPENGER: {
                nb: 'Sykepenger',
            },
            PENSJON: {
                nb: 'Pensjon',
            },
            ANNEN_PENGESTØTTE: {
                nb: 'Annen pengestøtte',
            },
            MOTTAR_IKKE: {
                nb: 'Mottar ikke pengestøtte fra ennet land',
            },
        },
    },
    feilmnelding_mottar_du_pengestøtte: {
        nb: 'Du må svare på om du mottar pengestøtte fra ennet land enn Norge.',
    },
    feilmnelding_mottar_ikke_pengestøtte_med_andre_valg: {
        nb: '“Ingen pengestøtte” kan ikke kombineres med andre valg',
    },
    select_hvilket_land: {
        nb: 'Hvilket land mottar du pengestøtte fra?',
    },
    feilmelding_select_hvilket_land: {
        nb: 'Du må velge hvilket land du mottar pengestøtte fra.',
    },
};
