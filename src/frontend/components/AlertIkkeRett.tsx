import React from 'react';

import { InfoCard } from '@navikt/ds-react';

import { useSpråk } from '../context/SpråkContext';
import { fellesTekster } from '../tekster/felles';
import { TekstElement } from '../typer/tekst';

export const AlertIkkeRett: React.FC<{ beskrivelse: TekstElement<string> }> = ({ beskrivelse }) => {
    const { locale } = useSpråk();
    return (
        <InfoCard data-color="info">
            <InfoCard.Header>
                <InfoCard.Title>{fellesTekster.alert_ikke_rett_tittel[locale]}</InfoCard.Title>
            </InfoCard.Header>
            <InfoCard.Content>{beskrivelse[locale]}</InfoCard.Content>
        </InfoCard>
    );
};
