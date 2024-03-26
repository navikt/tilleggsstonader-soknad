import { jaNeiAlternativer } from '../../tekster/felles';
import { JaNei, MottarPengestøtteTyper, ÅrsakOppholdUtenforNorge } from '../../typer/søknad';
import { CheckboxGruppe, InlineLenke, Radiogruppe, TekstElement } from '../../typer/tekst';
import { Ytelse } from '../steg/2-hovedytelse/typer';

interface HovedytelseInnhold {
    tittel: TekstElement<string>;
    guide_innhold: TekstElement<string>;
    checkbox_hovedytelse: CheckboxGruppe<Ytelse>;
    hovedytelse_feilmelding: TekstElement<string>;
    arbeidOgOpphold: {
        tittel: TekstElement<string>;
        guide_innhold: TekstElement<InlineLenke>;
        radio_jobber_annet_land_enn_norge: Radiogruppe<JaNei>;
        feilmnelding_jobber_annet_land_enn_norge: TekstElement<string>;
        select_hvilket_land_jobber_i_annet_land_label: TekstElement<string>;
        feilmelding_select_hvilket_land_jobber_i_annet_land_label: TekstElement<string>;

        checkbox_mottar_du_pengestøtte: CheckboxGruppe<MottarPengestøtteTyper>;
        feilmnelding_mottar_du_pengestøtte: TekstElement<string>;
        select_hvilket_land_pengestøtte: TekstElement<string>;
        feilmelding_select_hvilket_land_pengestøtte: TekstElement<string>;

        oppholdUtenforNorge: {
            dineOpphold: TekstElement<string>;
            radioSiste12mnd: Radiogruppe<JaNei>;
            feilmelding_radioSiste12mnd: TekstElement<string>;
            siste12mnd: OppholdUtenforNorgeInnhold;

            radioNeste12mnd: Radiogruppe<JaNei>;
            feilmelding_radioNeste12mnd: TekstElement<string>;
            neste12mnd: OppholdUtenforNorgeInnhold;

            knapp_legg_til: TekstElement<string>;
            label_flere_utenlandsopphold: TekstElement<string>;
            knapp_angre_legg_til: TekstElement<string>;
            knapp_slett: TekstElement<string>;
        };
    };
}

export interface OppholdUtenforNorgeInnhold {
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

export const YtelseTilTekst: Record<Ytelse, TekstElement<string>> = {
    AAP: { nb: 'Arbeidsavklaringspenger (AAP)' },
    OVERGANGSSTØNAD: { nb: 'Overgangsstønad til enslig mor eller far' },
    GJENLEVENDEPENSJON: { nb: 'Gjenlevendepensjon / etterlattepensjon / omstillingsstønad' },
    UFØRETRYGD: { nb: 'Uføretrygd' },
    TILTAKSPENGER: { nb: 'Tiltakspenger' },
    DAGPENGER: { nb: 'Dagpenger' },
    SYKEPENGER: { nb: 'Sykepenger' },
    KVALIFISERINGSSTØNAD: { nb: 'Kvalifiseringsstønad ' },
    INGEN_PENGESTØTTE: { nb: 'Mottar ingen pengestøtte, men har nedsatt arbeidsevne' },
    INGEN_PASSENDE_ALTERNATIVER: { nb: 'Ingen av alternativene passer for meg' },
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
export const hovedytelseInnhold: HovedytelseInnhold = {
    tittel: { nb: 'Din situasjon' },
    guide_innhold: {
        nb: 'Vi spør om dette for å vite hvilke rettigheter du har og hvilke spørsmål vi må stille deg i søknadsskjemaet.',
    },
    checkbox_hovedytelse: {
        header: {
            nb: 'Mottar du eller har du nylig søkt om noe av dette?',
        },
        beskrivelse: {
            nb: 'Du kan velge flere.',
        },
        alternativer: YtelseTilTekst,
    },
    hovedytelse_feilmelding: {
        nb: 'Du må huke av for minst én ytelse eller situasjon som passer for deg',
    },
    arbeidOgOpphold: {
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
        radio_jobber_annet_land_enn_norge: {
            header: {
                nb: 'Jobber du i et annet land enn Norge?',
            },
            alternativer: jaNeiAlternativer,
        },
        feilmnelding_jobber_annet_land_enn_norge: {
            nb: 'Du må svare på om du jobber i et annet land enn Norge.',
        },
        select_hvilket_land_jobber_i_annet_land_label: {
            nb: 'Hvilket land jobber du i?',
        },
        feilmelding_select_hvilket_land_jobber_i_annet_land_label: {
            nb: 'Du må velge hvilket land du jobber i.',
        },

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
        select_hvilket_land_pengestøtte: {
            nb: 'Hvilket land mottar du pengestøtte fra?',
        },
        feilmelding_select_hvilket_land_pengestøtte: {
            nb: 'Du må velge hvilket land du mottar pengestøtte fra.',
        },
        oppholdUtenforNorge: {
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

            siste12mnd: {
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
            },
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
            neste12mnd: {
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
            },
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
        },
    },
};
