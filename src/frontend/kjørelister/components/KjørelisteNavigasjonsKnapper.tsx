import React from 'react';

import { ArrowLeftIcon, ArrowRightIcon } from '@navikt/aksel-icons';
import { Button, HStack, VStack } from '@navikt/ds-react';

const KjørelisteNavigasjonsKnapper = () => {
    return (
        <VStack gap={'2'}>
            <HStack gap={'2'}>
                <Button variant={'secondary'} icon={<ArrowLeftIcon />}>
                    Forrige steg
                </Button>
                <Button variant={'primary'} icon={<ArrowRightIcon />} iconPosition={'right'}>
                    Neste steg
                </Button>
            </HStack>
            <HStack>
                <Button variant={'tertiary'}>Avbryt utfylling</Button>
            </HStack>
        </VStack>
    );
};

export default KjørelisteNavigasjonsKnapper;
