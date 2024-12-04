import { JaNei } from '../typer/søknad';
import { InlineLenke, TekstElement } from '../typer/tekst';

export interface FellesInnhold {
    vi_stoler_tittel: TekstElement<string>;
    vi_stoler_innhold: TekstElement<string>;
    vi_stoler_feilmelding: TekstElement<string>;
    send_inn_søknad: TekstElement<string>;
    send_inn_søknad_feil: TekstElement<string>;
    tittel_error_summary: TekstElement<string>;
    neste: TekstElement<string>;
    forrige: TekstElement<string>;
    banner_bt: TekstElement<string>;
    banner_læremidler: TekstElement<string>;
    velg_land: TekstElement<string>;
    land: TekstElement<string>;
    årsak: TekstElement<string>;
    periode: TekstElement<string>;
    flere_vedlegg: TekstElement<string>;
    vedlegg_med_feil: TekstElement<string>;
    viktig_med_rett_opplysninger: TekstElement<InlineLenke>;
    avsluttOgLoggUt: TekstElement<string>;
    startNySøknad: TekstElement<string>;
}

export const fellesTekster: FellesInnhold = {
    vi_stoler_tittel: { nb: 'Vi stoler på deg' },
    vi_stoler_innhold: {
        nb: 'Jeg bekrefter at jeg vil svare så riktig som jeg kan.',
    },
    vi_stoler_feilmelding: {
        nb: 'Du må bekrefte at du vil gi så riktige opplysninger som mulig.',
    },
    send_inn_søknad: {
        nb: 'Send søknad',
    },
    send_inn_søknad_feil: {
        nb: 'Innsending feilet, prøv på nytt.',
    },
    tittel_error_summary: {
        nb: 'For å gå videre må du rette opp følgende:',
    },
    neste: {
        nb: 'Neste',
    },
    forrige: {
        nb: 'Forrige',
    },
    banner_bt: {
        nb: 'Søknad om støtte til pass av barn',
    },
    banner_læremidler: {
        nb: 'Søknad om støtte til læremidler',
    },
    velg_land: {
        nb: 'Velg land',
    },
    land: {
        nb: 'Land',
    },
    årsak: {
        nb: 'Årsak',
    },
    periode: {
        nb: 'Periode',
    },
    flere_vedlegg: {
        nb: 'Vedlegg ([0])',
    },
    vedlegg_med_feil: {
        nb: 'Vedlegg med feil',
    },
    viktig_med_rett_opplysninger: {
        nb: [
            'Det er viktig at du gir oss riktige opplysninger slik at vi kan behandle saken din. ',
            {
                tekst: 'Les mer om viktigheten av å gi riktige opplysninger',
                url: 'https://www.nav.no/endringer',
                variant: 'neutral',
            },
            '.',
        ],
    },
    avsluttOgLoggUt: {
        nb: 'Avslutt og logg ut',
    },
    startNySøknad: {
        nb: 'Start ny søknad',
    },
};

export const JaNeiTilTekst: Record<JaNei, TekstElement<string>> = {
    JA: {
        nb: 'Ja',
    },
    NEI: {
        nb: 'Nei',
    },
};
