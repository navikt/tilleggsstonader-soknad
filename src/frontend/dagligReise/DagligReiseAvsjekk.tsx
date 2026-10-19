import React from 'react';

import { omdirigerTilFyllut } from '../api/api';
import { Avsjekk, AvsjekkTekster } from '../components/Avsjekk/Avsjekk';
import { SkjematypeFyllUt } from '../typer/skjematype';

interface DagligReiseAvsjekkProps {
    tekster: AvsjekkTekster;
    legend: string;
    description?: string;
    jaBetyrNyLøsning: boolean;
}

export const DagligReiseAvsjekk: React.FC<DagligReiseAvsjekkProps> = ({
    tekster,
    legend,
    description,
    jaBetyrNyLøsning,
}) => (
    <Avsjekk
        tekster={tekster}
        legend={legend}
        description={description}
        onJa={() =>
            omdirigerTilFyllut(
                SkjematypeFyllUt.SØKNAD_DAGLIG_REISE,
                jaBetyrNyLøsning ? 'NY' : 'GAMMEL'
            )
        }
        onNei={() =>
            omdirigerTilFyllut(
                SkjematypeFyllUt.SØKNAD_DAGLIG_REISE,
                jaBetyrNyLøsning ? 'GAMMEL' : 'NY'
            )
        }
    />
);
