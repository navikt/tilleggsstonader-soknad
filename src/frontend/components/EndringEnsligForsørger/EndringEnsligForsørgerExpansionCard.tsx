import React from 'react';

import { BodyLong, ExpansionCard } from '@navikt/ds-react';

import { endringEnsligForsørgerTekster } from './EndringEnsligForsørgerTekster';
import { useSpråk } from '../../context/SpråkContext';
import { LocaleTekst } from '../Teksthåndtering/LocaleTekst';

export const EndringEnsligForsørgerExpansionCard: React.FC = () => {
    const { locale } = useSpråk();

    return (
        <ExpansionCard aria-label={endringEnsligForsørgerTekster.tittel[locale]} data-color="info">
            <ExpansionCard.Header>
                <ExpansionCard.Title as="h2" size="small">
                    <LocaleTekst tekst={endringEnsligForsørgerTekster.tittel} />
                </ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <BodyLong spacing>
                    <LocaleTekst tekst={endringEnsligForsørgerTekster.innhold} />
                </BodyLong>
                <BodyLong weight="semibold">
                    <LocaleTekst tekst={endringEnsligForsørgerTekster.sporsmal_tittel} />
                </BodyLong>
                <BodyLong>
                    <LocaleTekst tekst={endringEnsligForsørgerTekster.sporsmal_innhold} />
                </BodyLong>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};
