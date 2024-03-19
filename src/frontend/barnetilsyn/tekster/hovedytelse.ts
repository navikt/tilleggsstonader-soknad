import { jaNeiAlternativer } from '../../tekster/felles';
import { JaNei } from '../../typer/søknad';
import { CheckboxGruppe, InlineLenke, LesMer, Radiogruppe, TekstElement } from '../../typer/tekst';
import { Ytelse } from '../steg/2-hovedytelse/typer';

interface HovedytelseInnhold {
    tittel: TekstElement<string>;
    guide_innhold: TekstElement<string>;
    checkbox_hovedytelse: CheckboxGruppe<Ytelse>;
    oppholdINorge: {
        tittel: TekstElement<string>;
        guide_innhold: TekstElement<InlineLenke>;
        radio_boddSammenhengende: Radiogruppe<JaNei>;
        lesMer_boddSammenhengende: LesMer<string[]>;
        radio_planleggerBoINorgeNeste12mnd: Radiogruppe<JaNei>;
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
    oppholdINorge: {
        tittel: {
            nb: 'Opphold i Norge',
        },
        guide_innhold: {
            nb: [
                'Vi spør om dette fordi vi må vite om du du oppfyller ',
                {
                    tekst: 'kravene til medlemskap i folketrygden',
                    url: 'https://www.nav.no/no/person/flere-tema/arbeid-og-opphold-i-norge/relatert-informasjon/medlemskap-i-folketrygden',
                    variant: 'neutral',
                },
                ' (åpnes i ny fane).',
            ],
        },
        radio_boddSammenhengende: {
            header: {
                nb: 'Har du bodd sammenhengende i Norge de siste 12 månedene?',
            },
            alternativer: jaNeiAlternativer,
        },
        lesMer_boddSammenhengende: {
            header: {
                nb: 'Hva menes med å bo sammenhengende?',
            },
            innhold: {
                nb: [
                    'Med dette mener vi at du ikke har bodd i andre land enn Norge.',
                    'Ferier utenfor Norge i under 4 uker regnes ikke som å ha bodd i andre land.',
                ],
            },
        },
        radio_planleggerBoINorgeNeste12mnd: {
            header: {
                nb: 'Planlegger du å bo i Norge i de neste 12 månedene?',
            },
            alternativer: jaNeiAlternativer,
        },
    },
};
