import React from 'react';

import styled from 'styled-components';

import { BodyShort, Button, HStack, VStack } from '@navikt/ds-react';
import { BorderAccent } from '@navikt/ds-tokens/js';

import { useSpråk } from '../../../context/SpråkContext';
import { Samling } from '../../../typer/søknad';
import { formaterPeriode } from '../../../utils/formateringUtils';
import { samlingerTekster } from '../../tekster/samlinger';

const SamlingVisning = styled(VStack)`
    border: 2px solid ${BorderAccent};
    border-radius: 4px;
    padding: 1rem 1rem 0 1rem;
`;

const LagredeSamlinger: React.FC<{
    lagedeSamlinger: Samling[];
    slettSamling: (id: number) => void;
}> = ({ lagedeSamlinger, slettSamling }) => {
    const { locale } = useSpråk();

    if (lagedeSamlinger.length === 0) {
        return null;
    }

    return (
        <>
            {lagedeSamlinger.map((samling) => (
                <SamlingVisning key={samling._id} gap="space-4">
                    <BodyShort>{formaterPeriode(samling.fom?.verdi, samling.tom?.verdi)}</BodyShort>
                    <HStack>
                        <Button variant="tertiary" onClick={() => slettSamling(samling._id)}>
                            {samlingerTekster.knapp_slett[locale]}
                        </Button>
                    </HStack>
                </SamlingVisning>
            ))}
        </>
    );
};

export default LagredeSamlinger;
