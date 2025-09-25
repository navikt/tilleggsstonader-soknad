import { useState } from 'react';

import createUseContext from 'constate';

import { Rammevedtak } from './types/Rammevedtak';
import { finnDagerMellomFomOgTomInklusiv } from '../utils/datoUtils';
import { Kjøreliste, Reisedag } from './types/Kjøreliste';
import { Dokument } from '../typer/skjema';

interface Props {
    rammevedtak: Rammevedtak;
}

const [KjørelisteProvider, useKjøreliste] = createUseContext(({ rammevedtak }: Props) => {
    KjørelisteProvider.displayName = 'KJØRELISTE_PROVIDER';

    const [kjøreliste, setKjøreliste] = useState(initialiserKjøreliste(rammevedtak));
    const [dokumentasjon, setDokumentasjon] = useState<Dokument[]>([]);

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
        dokumentasjon,
        setDokumentasjon,
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
