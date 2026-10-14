import { Skjematype } from './skjematyper';
import { TekstElement } from './tekst';

interface Skjemainfo {
    skjemaId: string;
    skjemanavn: string;
    papirskjemaId: string;
    apiPath: string;
    dokumentTittel: TekstElement<string>;
}

export const skjematypeTilSkjemainfo: Record<Skjematype, Skjemainfo> = {
    [Skjematype.SØKNAD_PASS_AV_BARN]: {
        skjemaId: 'NAV 11-12.15',
        skjemanavn: 'Pass av barn',
        papirskjemaId: 'nav111215b',
        apiPath: 'pass-av-barn',
        dokumentTittel: { nb: 'Søknad om støtte til pass av barn' },
    },
    [Skjematype.SØKNAD_LÆREMIDLER]: {
        skjemaId: 'NAV 11-12.16',
        skjemanavn: 'Læremidler',
        papirskjemaId: 'nav111216b',
        apiPath: 'laremidler',
        dokumentTittel: { nb: 'Søknad om støtte til læremidler' },
    },
    [Skjematype.SØKNAD_REISE_TIL_SAMLING]: {
        skjemaId: 'NAV 11-12.17',
        skjemanavn: 'Reise til samling',
        papirskjemaId: 'nav111217b',
        apiPath: 'reise-til-samling',
        dokumentTittel: { nb: 'Søknad om støtte til reise til samling' },
    },
    [Skjematype.SØKNAD_REISE_OPPSTART_AVSLUTNING_HJEMREISE]: {
        skjemaId: 'NAV 11-12.18',
        // TODO: placeholder-navn, avklar endelig visningsnavn
        skjemanavn: 'Reise ved oppstart, avslutning og hjemreise',
        papirskjemaId: 'nav111218b',
        apiPath: 'reise-oppstart-avslutning-hjemreise',
        // TODO: placeholder-tittel, avklar endelig tekst
        dokumentTittel: {
            nb: 'Søknad om støtte til reise ved oppstart, avslutning og hjemreise',
        },
    },
    [Skjematype.SØKNAD_FLYTTING]: {
        skjemaId: 'NAV 11-12.23',
        skjemanavn: 'Flytting',
        papirskjemaId: 'nav111223b',
        apiPath: 'flytting',
        dokumentTittel: { nb: 'Søknad om støtte ved flytting' },
    },
};
