import React from 'react';

import styled from 'styled-components';

import { BodyShort, Button, HStack, VStack } from '@navikt/ds-react';
import { BgSunken } from '@navikt/ds-tokens/js';

import { useSpråk } from '../../../context/SpråkContext';
import { Samling } from '../../../typer/søknad';
import { formaterNullableIsoDato } from '../../../utils/formateringUtils';
import { samlingerTekster } from '../../tekster/samlinger';

const LagretSamlingBoks = styled(VStack)`
    background: ${BgSunken};
    padding: 1.5rem;
    border-radius: 4px;
`;

export const LagredeSamlinger: React.FC<{
    lagredeSamlinger: Samling[];
    slettSamling: (id: number) => void;
}> = ({ lagredeSamlinger, slettSamling }) => {
    const { locale } = useSpråk();

    return (
        <>
            {lagredeSamlinger.map((samling) => (
                <LagretSamlingBoks key={samling._id} gap="space-4">
                    <BodyShort>
                        {samlingerTekster.startdato_label[locale]}:{' '}
                        {formaterNullableIsoDato(samling.fom?.verdi)}
                    </BodyShort>
                    <BodyShort>
                        {samlingerTekster.sluttdato_label[locale]}:{' '}
                        {formaterNullableIsoDato(samling.tom?.verdi)}
                    </BodyShort>
                    <HStack>
                        <Button variant="tertiary" onClick={() => slettSamling(samling._id)}>
                            {samlingerTekster.knapp_slett[locale]}
                        </Button>
                    </HStack>
                </LagretSamlingBoks>
            ))}
        </>
    );
};
