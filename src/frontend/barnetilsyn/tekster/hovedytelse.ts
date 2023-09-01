import { LesMer, Radiogruppe, TekstElement } from '../../typer/tekst';
import { AnnenYtelse, Ytelse } from '../steg/2-hovedytelse/typer';

interface HovedytelseInnhold {
    steg_tittel: TekstElement<string>;
    innhold_tittel: TekstElement<string>;
    guide_innhold: TekstElement<string>;
    radio_hovedytelse: Radiogruppe<Ytelse>;
    flere_alternativer_lesmer: TekstElement<LesMer>;
    radio_annen_ytelse: Radiogruppe<AnnenYtelse>;
}

export const hovedytelseInnhold: HovedytelseInnhold = {
    steg_tittel: {
        nb: 'Ytelse',
    },
    innhold_tittel: { nb: 'Din situasjon' },
    guide_innhold: {
        nb: 'Vi spør om dette for å vite hvilke rettigheter du har og hvilke spørsmål vi må stille deg i skjemaet.',
    },
    radio_hovedytelse: {
        header: {
            nb: 'Mottar du eller har du nylig søkt om noe av dette?',
        },
        alternativer: [
            {
                value: 'aap',
                label: {
                    nb: 'Arbeidsavklaringspenger (AAP)',
                },
            },
            {
                value: 'overgangsstønad',
                label: {
                    nb: 'Overgangsstønad til enslig mor eller far',
                },
            },
            {
                value: 'gjenlevendepensjon',
                label: {
                    nb: 'Gjenlevendepensjon/etterlattepensjon',
                },
            },
            {
                value: 'annet',
                label: {
                    nb: 'Nei, jeg har annen eller ingen ytelse/pengestøtte',
                },
            },
        ],
    },
    flere_alternativer_lesmer: {
        nb: {
            header: 'Hva gjør jeg hvis flere alternativer passer for meg?',
            innhold:
                'Har du rett på eller mottar flere av ytelsene/pengestøttene nevnt her trenger du bare å velge en. Er en av ytelsene du mottar AAP, velg AAP.',
        },
    },
    radio_annen_ytelse: {
        header: {
            nb: 'Hvilken annen ytelse/pengestøtte mottar du eller har du søkt om?',
        },
        beskrivelse: {
            nb: 'Vi spør om dette fordi vi trenger å vite hvilke rettigheter du har. ',
        },
        alternativer: [
            {
                value: 'dagpenger',
                label: {
                    nb: 'Dagpenger',
                },
            },
            {
                value: 'tiltakspenger',
                label: {
                    nb: 'Tiltakspenger',
                },
            },
            {
                value: 'kvalifikasjonsprogrammet',
                label: {
                    nb: 'Kvalifikasjonsprogrammet',
                },
            },
            {
                value: 'introduksjonsprogrammet',
                label: {
                    nb: 'Introduksjonsprogrammet',
                },
            },
            {
                value: 'sykepenger',
                label: {
                    nb: 'Sykepenger',
                },
            },
            {
                value: 'uføretrygd',
                label: {
                    nb: 'Uføretrygd',
                },
            },
            {
                value: 'ingen_pengestøtte',
                label: {
                    nb: 'Mottar ingen pengestøtte, men har nedsatt arbeidsevne',
                },
            },
        ],
    },
};
