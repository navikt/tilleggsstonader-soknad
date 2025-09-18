import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import OppsummeringDag from './OppsummeringDag';
import { finnDagerMellomFomOgTomInklusiv } from '../../../utils/datoUtils';
import { useKjøreliste } from '../../KjørelisteContext';
import { Kjøreliste } from '../../types/Kjøreliste';
import { RammevedtakUke } from '../../types/Rammevedtak';

const OppsummeringUke: React.FC<{ uke: RammevedtakUke }> = ({ uke }) => {
    const { kjøreliste } = useKjøreliste();
    const dagerIUke = finnDagerMellomFomOgTomInklusiv(uke.fom, uke.tom);

    if (!harRegistertDataForUke(dagerIUke, kjøreliste)) {
        return null;
    }

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level={'3'}>{`Uke ${uke.ukeNummer}`}</FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                {finnDagerMellomFomOgTomInklusiv(uke.fom, uke.tom).map((dag) => (
                    <OppsummeringDag dag={dag} />
                ))}
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default OppsummeringUke;

const harRegistertDataForUke = (dagerIUka: Date[], kjøreliste: Kjøreliste): boolean =>
    dagerIUka.some((dag) => kjøreliste.reisedager[dag.toISOString()].harReist);
