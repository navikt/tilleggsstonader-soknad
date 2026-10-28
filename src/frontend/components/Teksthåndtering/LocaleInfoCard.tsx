import React from 'react';

import { InfoCard } from '@navikt/ds-react';

import { LocaleTekstAvsnitt } from './LocaleTekstAvsnitt';
import { useSpråk } from '../../context/SpråkContext';
import { InfoAlert } from '../../typer/tekst';

export const LocaleInfoCard: React.FC<{ tekst: InfoAlert }> = ({ tekst }) => {
    const { locale } = useSpråk();

    return (
        <InfoCard data-color="info">
            <InfoCard.Header>
                <InfoCard.Title>{tekst.header[locale]}</InfoCard.Title>
            </InfoCard.Header>
            <InfoCard.Content>
                <LocaleTekstAvsnitt tekst={tekst.innhold} />
            </InfoCard.Content>
        </InfoCard>
    );
};
