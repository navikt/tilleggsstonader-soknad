import { JaNei } from '../typer/søknad';
import { TekstElement } from '../typer/tekst';

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
};

export const JaNeiTilTekst: Record<JaNei, TekstElement<string>> = {
    JA: {
        nb: 'Ja',
    },
    NEI: {
        nb: 'Nei',
    },
};
