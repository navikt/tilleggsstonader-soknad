import { Radiogruppe, TekstElement } from '../../typer/tekst';
import { Ytelse } from '../steg/2-hovedytelse/typer';

interface HovedytelseInnhold {
    steg_tittel: TekstElement<string>;
    innhold_tittel: TekstElement<string>;
    guide_innhold: TekstElement<string>;
    checkbox_hovedytelse: Radiogruppe<Ytelse>;
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
    steg_tittel: {
        nb: 'Ytelse',
    },
    innhold_tittel: { nb: 'Din situasjon' },
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
        alternativer: [
            {
                value: 'AAP',
                label: YtelseTilTekst.AAP,
            },
            {
                value: 'OVERGANGSSTØNAD',
                label: YtelseTilTekst.OVERGANGSSTØNAD,
            },
            {
                value: 'GJENLEVENDEPENSJON',
                label: YtelseTilTekst.GJENLEVENDEPENSJON,
            },
            {
                value: 'UFØRETRYGD',
                label: YtelseTilTekst.UFØRETRYGD,
            },
            {
                value: 'TILTAKSPENGER',
                label: YtelseTilTekst.TILTAKSPENGER,
            },
            {
                value: 'DAGPENGER',
                label: YtelseTilTekst.DAGPENGER,
            },
            {
                value: 'SYKEPENGER',
                label: YtelseTilTekst.SYKEPENGER,
            },
            {
                value: 'KVALIFISERINGSSTØNAD',
                label: YtelseTilTekst.KVALIFISERINGSSTØNAD,
            },
            {
                value: 'INGEN_PENGESTØTTE',
                label: YtelseTilTekst.INGEN_PENGESTØTTE,
            },
            {
                value: 'INGEN_PASSENDE_ALTERNATIVER',
                label: YtelseTilTekst.INGEN_PASSENDE_ALTERNATIVER,
            },
        ],
    },
};
