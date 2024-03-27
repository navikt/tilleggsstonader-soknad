import { TekstElement } from '../typer/tekst';

export interface MellomlagringInnhold {
    informasjon: TekstElement<string>;
    knapp_fortsett: TekstElement<string>;
    knapp_start_på_nytt: TekstElement<string>;
}

export const mellomlagringTekster: MellomlagringInnhold = {
    informasjon: {
        nb: 'Du har en påbegynt søknad. Vil du fortsette på denne eller starte en ny?',
    },
    knapp_fortsett: {
        nb: 'Fortsett på søknaden',
    },
    knapp_start_på_nytt: {
        nb: 'Start på nytt',
    },
};
