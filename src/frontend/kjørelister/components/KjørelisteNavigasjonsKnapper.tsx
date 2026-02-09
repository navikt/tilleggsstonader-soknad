import React, { useRef } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { ArrowLeftIcon, ArrowRightIcon, PaperplaneIcon } from '@navikt/aksel-icons';
import { Alert, Button, ErrorSummary, HStack, VStack } from '@navikt/ds-react';

import { useValideringsfeil } from '../../context/ValideringsfeilContext';
import { inneholderFeil } from '../../typer/validering';
import { finnPath, KjørelisteRoutes } from '../kjørelisteRoutes';

interface KjørelisteNavigasonsKnapperProps {
    nesteSide: KjørelisteRoutes;
    forrigeSide: KjørelisteRoutes;
    laster?: boolean;
    sendInnKjøreliste?: () => void;
    innsendingFeilet?: boolean;
    validerKanGåVidere?: () => boolean;
}

export const KjørelisteNavigasjonsKnapper = ({
    nesteSide,
    forrigeSide,
    laster,
    sendInnKjøreliste,
    innsendingFeilet,
    validerKanGåVidere,
}: KjørelisteNavigasonsKnapperProps) => {
    const navigate = useNavigate();
    const { valideringsfeil } = useValideringsfeil();
    const reiseId = useParams<{ reiseId: string }>().reiseId as string;
    const errorRef = useRef<HTMLDivElement>(null);

    const harValideringsfeil = inneholderFeil(valideringsfeil);

    const navigerTilNesteSide = () => {
        if (validerKanGåVidere && !validerKanGåVidere()) {
            return;
        }

        navigate(finnPath(reiseId, nesteSide));
    };

    return (
        <VStack gap={'2'}>
            {harValideringsfeil && (
                <ErrorSummary heading={'For å gå videre må du rette opp følgende:'} ref={errorRef}>
                    {Object.entries(valideringsfeil).map(
                        ([id, error]) =>
                            error && (
                                <ErrorSummary.Item key={`${id}`} href={`#${error.id}`}>
                                    {error.melding}
                                </ErrorSummary.Item>
                            )
                    )}
                </ErrorSummary>
            )}
            <HStack gap={'2'}>
                <Button
                    variant={'secondary'}
                    icon={<ArrowLeftIcon />}
                    onClick={() => navigate(finnPath(reiseId, forrigeSide))}
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
                        onClick={navigerTilNesteSide}
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
