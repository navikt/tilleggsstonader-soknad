import { useState } from 'react';

import createUseContext from 'constate';

import { Rammevedtak, RammevedtakMock } from './types/Rammevedtak';
import { finnDagerMellomFomOgTomInklusiv } from '../utils/datoUtils';
import { Kjøreliste, Reisedag } from './types/Kjøreliste';

const [KjørelisteProvider, useKjøreliste] = createUseContext(() => {
    KjørelisteProvider.displayName = 'KJØRELISTE_PROVIDER';

    const rammevedtak = RammevedtakMock;
    const [kjøreliste, setKjøreliste] = useState(initialiserKjøreliste(rammevedtak));

    const oppdaterHarReist = (dag: Date, harReist: boolean) => {
        const dagIsoString = dag.toISOString();
        setKjøreliste((prev) => ({
            reisedager: {
                ...prev.reisedager,
                [dagIsoString]: {
                    ...prev.reisedager[dagIsoString],
                    harReist,
                },
            },
        }));
    };

    const oppdaterParkeringsutgift = (dag: Date, parkeringsutgift: number) => {
        const dagIsoString = dag.toISOString();
        setKjøreliste((prev) => ({
            reisedager: {
                ...prev.reisedager,
                [dagIsoString]: {
                    ...prev.reisedager[dagIsoString],
                    parkeringsutgift,
                },
            },
        }));
    };

    return {
        rammevedtak,
        kjøreliste,
        oppdaterHarReist,
        oppdaterParkeringsutgift,
    };
});

export { KjørelisteProvider, useKjøreliste };

const initialiserKjøreliste = (rammevedtak: Rammevedtak): Kjøreliste => {
    const dager = finnDagerMellomFomOgTomInklusiv(rammevedtak.fom, rammevedtak.tom);
    const reisedager = {} as { [dato: string]: Reisedag };
    dager.forEach((dag) => {
        reisedager[dag.toISOString()] = {
            harReist: false,
            parkeringsutgift: undefined,
        };
    });
    return { reisedager: reisedager };
};
