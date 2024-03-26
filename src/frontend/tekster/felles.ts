import { JaNei } from '../typer/søknad';
import { TekstElement } from '../typer/tekst';

export interface FellesInnhold {
    vi_stoler_tittel: TekstElement<string>;
    vi_stoler_innhold: TekstElement<string>;
    vi_stoler_feilmelding: TekstElement<string>;
    send_inn_søknad: TekstElement<string>;
    send_inn_søknad_feil: TekstElement<string>;
    neste: TekstElement<string>;
    forrige: TekstElement<string>;
    banner_bt: TekstElement<string>;
}

export const fellesTekster: FellesInnhold = {
    vi_stoler_tittel: { nb: 'Vi stoler på deg' },
    vi_stoler_innhold: {
        nb: 'Jeg bekrefter at jeg vil svare så godt jeg kan på spørsmålene i søknaden.',
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
    neste: {
        nb: 'Neste',
    },
    forrige: {
        nb: 'Forrige',
    },
    banner_bt: {
        nb: 'Søknad om støtte til pass av barn',
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

export const jaNeiAlternativer: { value: JaNei; label: TekstElement<string> }[] = [
    {
        value: 'JA',
        label: JaNeiTilTekst.JA,
    },
    {
        value: 'NEI',
        label: JaNeiTilTekst.NEI,
    },
];
