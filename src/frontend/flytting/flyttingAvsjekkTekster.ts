import { AvsjekkTekster } from '../components/Avsjekk/Avsjekk';
import { avsjekkTeksterFelles } from '../components/Avsjekk/AvsjekkTekster';

export const flyttingAvsjekkTekster: AvsjekkTekster = {
    ...avsjekkTeksterFelles,
    banner: {
        nb: 'Søknad om støtte til flytting',
    },
};
