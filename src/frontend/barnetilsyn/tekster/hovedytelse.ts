import { jaNeiAlternativer } from '../../tekster/felles';
import { JaNei, MottarPengestøtteTyper } from '../../typer/søknad';
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
            nb: 'Du må svare på om du jobber i et annet land enn Norge',
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
                    nb: 'Mottar ikke oengestøtte fra ennet land',
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
    },
};
