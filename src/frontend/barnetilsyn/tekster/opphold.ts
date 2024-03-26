import { jaNeiAlternativer } from '../../tekster/felles';
import { JaNei, MottarPengestøtteTyper, ÅrsakOppholdUtenforNorge } from '../../typer/søknad';
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

export interface OppholdUtenforNorgeInnhold {
    dineOpphold: TekstElement<string>;
    radioSiste12mnd: Radiogruppe<JaNei>;
    feilmelding_radioSiste12mnd: TekstElement<string>;
    siste12mnd: OppholdInnhold;

    radioNeste12mnd: Radiogruppe<JaNei>;
    feilmelding_radioNeste12mnd: TekstElement<string>;
    neste12mnd: OppholdInnhold;

    knapp_legg_til: TekstElement<string>;
    label_flere_utenlandsopphold: TekstElement<string>;
    knapp_angre_legg_til: TekstElement<string>;
    knapp_slett: TekstElement<string>;
}

export interface OppholdInnhold {
    select_hvilket_land: TekstElement<string>;
    feilmelding_hvilket_land: TekstElement<string>;

    checkbox_årsak: CheckboxGruppe<ÅrsakOppholdUtenforNorge>;
    feilmelding_årsak: TekstElement<string>;
    dato: {
        label: TekstElement<string>;
        fom: TekstElement<string>;
        tom: TekstElement<string>;
        feilmelding_fom: TekstElement<string>;
        feilmelding_tom: TekstElement<string>;
        feilmelding_tom_før_fom: TekstElement<string>;
    };
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

const årsakAlternativer: Record<ÅrsakOppholdUtenforNorge, TekstElement<string>> = {
    JOBB: {
        nb: 'Jobbet',
    },
    STUDIER: {
        nb: 'Studerte',
    },
    MEDISINSK_BEHANDLING: {
        nb: 'Fikk medisinsk behandling',
    },
    FERIE: {
        nb: 'Var på ferie',
    },
    FAMILIE_BESØK: {
        nb: 'Besøkte familie',
    },
    ANNET: {
        nb: 'Annet',
    },
};
const siste12mndInnhold: OppholdInnhold = {
    select_hvilket_land: {
        nb: 'Hvilket land har du oppholdt deg i?',
    },
    feilmelding_hvilket_land: {
        nb: 'Du må velge hvilket land du har oppholdt deg i.',
    },

    checkbox_årsak: {
        header: {
            nb: 'Hva gjorde du i dette landet?',
        },
        alternativer: årsakAlternativer,
    },
    feilmelding_årsak: {
        nb: 'Du må velge hva du gjorde i landet du oppholdt deg i.',
    },
    dato: {
        label: {
            nb: 'Når var du i dette landet?',
        },
        fom: {
            nb: 'Fra',
        },
        tom: {
            nb: 'Til',
        },
        feilmelding_fom: {
            nb: 'Du må velge fra-dato.',
        },
        feilmelding_tom: {
            nb: 'Du må velge til-dato.',
        },
        feilmelding_tom_før_fom: {
            nb: 'Til-dato må være eller etter fra-dato.',
        },
    },
};
const neste12mndInnhold: OppholdInnhold = {
    select_hvilket_land: {
        nb: 'Hvilket land skal du oppholde deg i?',
    },
    feilmelding_hvilket_land: {
        nb: 'Du må velge hvilket land du skal oppholde deg i.',
    },

    checkbox_årsak: {
        header: {
            nb: 'Hva skal du gjøre i dette landet?',
        },
        alternativer: årsakAlternativer,
    },
    feilmelding_årsak: {
        nb: 'Du må velge hva du skal gjøre i landet du skal oppholde deg i.',
    },
    dato: {
        label: {
            nb: 'Når skal du være i dette landet?',
        },
        fom: {
            nb: 'Fra',
        },
        tom: {
            nb: 'Til',
        },
        feilmelding_fom: {
            nb: 'Du må velge fra-dato.',
        },
        feilmelding_tom: {
            nb: 'Du må velge til-dato.',
        },
        feilmelding_tom_før_fom: {
            nb: 'Til-dato må være eller etter fra-dato.',
        },
    },
};
export const oppholdUtenforNorgeInnhold: OppholdUtenforNorgeInnhold = {
    dineOpphold: {
        nb: 'Dine opphold utenfor Norge siste 12 mnd:',
    },
    radioSiste12mnd: {
        header: {
            nb: 'Har du oppholdt deg utenfor Norge i løpet av de siste 12 månedene?',
        },
        beskrivelse: {
            nb: 'Opphold under 5 uker trenger du ikke opplyse om.',
        },
        alternativer: jaNeiAlternativer,
    },
    feilmelding_radioSiste12mnd: {
        nb: 'Du må svare på om du oppholdt deg utenfor Norge.',
    },

    siste12mnd: siste12mndInnhold,
    radioNeste12mnd: {
        header: {
            nb: 'Planlegger du å oppholde deg utenfor Norge de neste 12 månedene?',
        },
        beskrivelse: {
            nb: 'Opphold under 5 uker trenger du ikke opplyse om.',
        },
        alternativer: jaNeiAlternativer,
    },
    feilmelding_radioNeste12mnd: {
        nb: 'Du må ta stilling til om du planlegger opphold utenfor Norge de neste 12 månadene.',
    },
    neste12mnd: neste12mndInnhold,
    knapp_legg_til: {
        nb: 'Legg til flere land',
    },
    label_flere_utenlandsopphold: {
        nb: 'Flere utenlandsopphold',
    },
    knapp_angre_legg_til: {
        nb: 'Angre legg til flere',
    },
    knapp_slett: {
        nb: 'Slett',
    },
};
