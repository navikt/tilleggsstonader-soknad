import { LesMer, Radiogruppe, TekstElement } from '../../typer/tekst';
import { AnnenYtelse, YtelseOgAnnet } from '../steg/2-hovedytelse/typer';

interface HovedytelseInnhold {
    steg_tittel: TekstElement<string>;
    innhold_tittel: TekstElement<string>;
    guide_innhold: TekstElement<string>;
    radio_hovedytelse: Radiogruppe<YtelseOgAnnet>;
    flere_alternativer_lesmer: LesMer<string>;
    radio_annen_ytelse: Radiogruppe<AnnenYtelse>;
}

export const YtelseTilTekst: Record<YtelseOgAnnet | AnnenYtelse, TekstElement<string>> = {
    AAP: { nb: 'Arbeidsavklaringspenger (AAP)' },
    DAGPENGER: { nb: 'Dagpenger' },
    GJENLEVENDEPENSJON: { nb: 'Gjenlevendepensjon/etterlattepensjon' },
    INGEN_PENGESTØTTE: { nb: 'Mottar ingen pengestøtte, men har nedsatt arbeidsevne' },
    INTRODUKSJONSPROGRAMMET: { nb: 'Introduksjonsprogrammet' },
    KVALIFIKASJONSPROGRAMMET: { nb: 'Kvalifikasjonsprogrammet' },
    OVERGANGSSTØNAD: { nb: 'Overgangsstønad til enslig mor eller far' },
    SYKEPENGER: { nb: 'Sykepenger' },
    TILTAKSPENGER: { nb: 'Tiltakspenger' },
    UFØRETRYGD: { nb: 'Uføretrygd' },
    ANNET: { nb: 'Nei, jeg har annen eller ingen ytelse/pengestøtte' },
};

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
                value: 'ANNET',
                label: YtelseTilTekst.ANNET,
            },
        ],
    },
    flere_alternativer_lesmer: {
        header: { nb: 'Hva gjør jeg hvis flere alternativer passer for meg?' },
        innhold: {
            nb: 'Har du rett på eller mottar flere av ytelsene/pengestøttene nevnt her trenger du bare å velge en. Er en av ytelsene du mottar AAP, velg AAP.',
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
                value: 'DAGPENGER',
                label: YtelseTilTekst.DAGPENGER,
            },
            {
                value: 'TILTAKSPENGER',
                label: YtelseTilTekst.TILTAKSPENGER,
            },
            {
                value: 'KVALIFIKASJONSPROGRAMMET',
                label: YtelseTilTekst.KVALIFIKASJONSPROGRAMMET,
            },
            {
                value: 'INTRODUKSJONSPROGRAMMET',
                label: YtelseTilTekst.INTRODUKSJONSPROGRAMMET,
            },
            {
                value: 'SYKEPENGER',
                label: YtelseTilTekst.SYKEPENGER,
            },
            {
                value: 'UFØRETRYGD',
                label: YtelseTilTekst.UFØRETRYGD,
            },
            {
                value: 'INGEN_PENGESTØTTE',
                label: YtelseTilTekst.INGEN_PENGESTØTTE,
            },
        ],
    },
};
