import React from 'react';

import { useNavigate } from 'react-router-dom';

import { BodyLong, Button, VStack } from '@navikt/ds-react';

import { Container } from '../../../components/Side';
import { LocaleHeading } from '../../../components/Teksthåndtering/LocaleHeading';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { fellesTekster } from '../../../tekster/felles';
import { RouteTilPath } from '../../routing/routesReiseTilSamling';
import { nesteStegTekster } from '../../tekster/nesteSteg';

export const NesteStegReiseTilSamling = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <VStack gap="space-16">
                <LocaleHeading tekst={nesteStegTekster.tittel} size="large" level="2" />
                <BodyLong>
                    <LocaleTekst tekst={nesteStegTekster.innhold} />
                </BodyLong>
                <Button variant="secondary" onClick={() => navigate(RouteTilPath.HOVEDYTELSE)}>
                    <LocaleTekst tekst={fellesTekster.forrige} />
                </Button>
            </VStack>
        </Container>
    );
};
