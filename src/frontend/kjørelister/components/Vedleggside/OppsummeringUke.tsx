import React from 'react';

import { BodyShort, List, VStack } from '@navikt/ds-react';

import OppsummeringDag from './OppsummeringDag';
import { finnDagerMellomFomOgTomInklusiv } from '../../../utils/datoUtils';
import { useKjøreliste } from '../../KjørelisteContext';
import { Kjøreliste } from '../../types/Kjøreliste';
import { RammevedtakUke } from '../../types/Rammevedtak';

const OppsummeringUke: React.FC<{ uke: RammevedtakUke }> = ({ uke }) => {
    const { kjøreliste } = useKjøreliste();

    const dagerIUka = finnDagerMellomFomOgTomInklusiv(uke.fom, uke.tom);

    if (!harRegistertDataForUke(dagerIUka, kjøreliste)) {
        return null;
    }

    return (
        <VStack>
            <BodyShort>{`Uke ${uke.ukeNummer}:`}</BodyShort>
            <List as={'ul'}>
                {dagerIUka.map((dag) => (
                    <OppsummeringDag key={dag.toISOString()} dag={dag} />
                ))}
            </List>
        </VStack>
    );
};

export default OppsummeringUke;

const harRegistertDataForUke = (dagerIUka: Date[], kjøreliste: Kjøreliste): boolean =>
    dagerIUka.some((dag) => kjøreliste.reisedager[dag.toISOString()].harReist);
