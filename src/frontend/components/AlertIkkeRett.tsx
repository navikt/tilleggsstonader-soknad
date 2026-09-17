import React from 'react';

import { InfoCard } from '@navikt/ds-react';

import { useSpråk } from '../context/SpråkContext';
import { TekstElement } from '../typer/tekst';

export const AlertIkkeRett: React.FC<{ beskrivelse: TekstElement<string> }> = ({ beskrivelse }) => {
    const { locale } = useSpråk();
    return (
        <InfoCard data-color="info">
            <InfoCard.Header>
                <InfoCard.Title>{headerTekst[locale]}</InfoCard.Title>
            </InfoCard.Header>
            <InfoCard.Content>{beskrivelse[locale]}</InfoCard.Content>
        </InfoCard>
    );
};

const headerTekst: TekstElement<string> = {
    nb: 'Ut fra svarene dine ser det ut til at du ikke har rett til denne pengestøtten',
};
