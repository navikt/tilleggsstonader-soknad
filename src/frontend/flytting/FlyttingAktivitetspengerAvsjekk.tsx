import React from 'react';

import { flyttingPath } from './FlyttingApp';
import { flyttingAvsjekkTekster } from './flyttingAvsjekkTekster';
import { MottarAktivitetspengerAvsjekk } from '../components/Avsjekk/MottarAktivitetspengerAvsjekk';
import { SkjematypeFyllUt } from '../typer/skjematype';

export const FlyttingAktivitetspengerAvsjekk: React.FC = () => (
    <MottarAktivitetspengerAvsjekk
        skjematype={SkjematypeFyllUt.SØKNAD_FLYTTING}
        tekster={flyttingAvsjekkTekster}
        nySøknadPath={flyttingPath}
    />
);
