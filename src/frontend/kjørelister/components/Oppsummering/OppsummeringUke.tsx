import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import { OppsummeringDag } from './OppsummeringDag';
import { finnDagerMellomFomOgTomInklusiv } from '../../../utils/datoUtils';
import { useKjøreliste } from '../../KjørelisteContext';
import { harRegistertDataForUke } from '../../kjørelisteUtils';
import { RammevedtakUke } from '../../types/Rammevedtak';

export const OppsummeringUke: React.FC<{ uke: RammevedtakUke }> = ({ uke }) => {
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
