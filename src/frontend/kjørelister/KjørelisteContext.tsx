import { useState } from 'react';

import createUseContext from 'constate';

import { Rammevedtak, RammevedtakMock } from './types/Rammevedtak';
import { finnDagerMellomFomOgTomInklusiv } from '../utils/datoUtils';
import { Kjøreliste, Reisedag } from './types/Kjøreliste';

const [KjørelisteProvider, useKjøreliste] = createUseContext(() => {
    KjørelisteProvider.displayName = 'KJØRELISTE_PROVIDER';

    const rammevedtak = RammevedtakMock;
    const [kjøreliste, setKjøreliste] = useState(rammevedtakTilKjøreliste(rammevedtak));

    const oppdaterSkalReise = (dag: Date, skalReise: boolean) => {
        setKjøreliste((prevState) => {
            prevState.reisedager[dag.toISOString()] = {
                skalReise: skalReise,
                parkeringsutgift: prevState.reisedager[dag.toISOString()].parkeringsutgift,
            };
            return prevState;
        });
    };

    const oppdaterParkeringsutgift = (dag: Date, parkeringsutgift: number) => {
        setKjøreliste((prevState) => {
            prevState.reisedager[dag.toISOString()] = {
                skalReise: prevState.reisedager[dag.toISOString()].skalReise,
                parkeringsutgift: parkeringsutgift,
            };
            return prevState;
        });
    };

    return {
        rammevedtak,
        kjøreliste,
        oppdaterSkalReise,
        oppdaterParkeringsutgift,
    };
});

export { KjørelisteProvider, useKjøreliste };

const rammevedtakTilKjøreliste = (rammevedtak: Rammevedtak): Kjøreliste => {
    const dager = finnDagerMellomFomOgTomInklusiv(rammevedtak.fom, rammevedtak.tom);
    const reisedager = {} as { [dato: string]: Reisedag };
    dager.forEach((dag) => {
        reisedager[dag.toISOString()] = {
            skalReise: false,
            parkeringsutgift: undefined,
        };
    });
    return { reisedager: reisedager };
};
