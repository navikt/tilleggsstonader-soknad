import { AvsjekkTekster } from '../components/Avsjekk/Avsjekk';
import { avsjekkTeksterFelles } from '../components/Avsjekk/AvsjekkTekster';

export const reiseOppstartAvslutningHjemreiseAvsjekkTekster: AvsjekkTekster = {
    ...avsjekkTeksterFelles,
    banner: {
        nb: 'Søknad om støtte til reise til oppstart, avslutning eller hjemreise',
    },
};
