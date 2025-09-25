import React from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { ArrowLeftIcon, ArrowRightIcon, PaperplaneIcon } from '@navikt/aksel-icons';
import { Alert, Button, HStack, VStack } from '@navikt/ds-react';


import { finnPath, KjørelisteRoutes } from '../kjørelisteRoutes';

interface KjørelisteNavigasonsKnapperProps {
    nesteSide: KjørelisteRoutes;
    forrigeSide: KjørelisteRoutes;
    laster?: boolean;
    sendInnKjøreliste?: () => void;
    innsendingFeilet?: boolean;
}

export const KjørelisteNavigasjonsKnapper = ({
    nesteSide,
    forrigeSide,
    laster,
    sendInnKjøreliste,
    innsendingFeilet,
}: KjørelisteNavigasonsKnapperProps) => {
    const navigate = useNavigate();
    const kjørelisteId = useParams<{ kjorelisteId: string }>().kjorelisteId as string;
    return (
        <VStack gap={'2'}>
            <HStack gap={'2'}>
                <Button
                    variant={'secondary'}
                    icon={<ArrowLeftIcon />}
                    onClick={() => navigate(finnPath(kjørelisteId, forrigeSide))}
                >
                    Forrige steg
                </Button>
                {sendInnKjøreliste ? (
                    <Button
                        variant={'primary'}
                        icon={<PaperplaneIcon />}
                        iconPosition={'right'}
                        onClick={() => {
                            sendInnKjøreliste();
                        }}
                        loading={laster}
                    >
                        Send inn
                    </Button>
                ) : (
                    <Button
                        variant={'primary'}
                        icon={<ArrowRightIcon />}
                        iconPosition={'right'}
                        onClick={() => navigate(finnPath(kjørelisteId, nesteSide))}
                    >
                        Neste steg
                    </Button>
                )}
            </HStack>
            <HStack>
                <Button variant={'tertiary'} onClick={() => navigate('/kjoreliste')}>
                    Avbryt utfylling
                </Button>
            </HStack>
            {innsendingFeilet && (
                <Alert variant={'error'}>Innsending feilet. Prøv igjen senere.</Alert>
            )}
        </VStack>
    );
};
