import { Ytelse } from '../../components/Hovedytelse/typer';
import { CheckboxGruppe, TekstElement } from '../../typer/tekst';

interface HovedytelseInnhold {
    tittel: TekstElement<string>;
    guide_innhold: TekstElement<string>;
    checkbox_hovedytelse: CheckboxGruppe<Ytelse>;
    hovedytelse_feilmelding: TekstElement<string>;
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
        legend: {
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
};
