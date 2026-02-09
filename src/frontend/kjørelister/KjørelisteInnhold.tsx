import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { Routes } from 'react-router';
import { Route, useParams } from 'react-router-dom';

import { Alert, Loader, VStack } from '@navikt/ds-react';

import { hentRammevedtak } from '../api/api';
import { Kvitteringsside } from './components/Kvitteringsside/Kvitteringsside';
import { Oppsummeringsside } from './components/Oppsummering/Oppsummeringsside';
import { KjørelisteSkjema } from './components/Skjemaside/KjørelisteSkjema';
import { Vedleggside } from './components/Vedleggside/Vedleggside';
import { KjørelisteProvider } from './KjørelisteContext';
import { ValideringsfeilProvider } from '../context/ValideringsfeilContext';

export const KjørelisteInnhold = () => {
    const reiseId = useParams<{ reiseId: string }>().reiseId as string;

    const {
        isPending,
        error,
        data: rammevedtak,
    } = useQuery({
        queryKey: [`rammevedtakDetaljer:${reiseId}`],
        queryFn: () => hentRammevedtak(reiseId),
    });

    if (isPending) {
        return (
            <VStack align={'center'}>
                <Loader size={'3xlarge'} title={'Laster inn siden'} />
            </VStack>
        );
    }

    if (error) {
        return <Alert variant={'error'}>Kunne ikke hente kjøreliste. Prøv igjen senere.</Alert>;
    }

    return (
        <KjørelisteProvider rammevedtak={rammevedtak}>
            <ValideringsfeilProvider>
                <Routes>
                    <Route path={'/skjema'} element={<KjørelisteSkjema />} />
                    <Route path={'/vedlegg'} element={<Vedleggside />} />
                    <Route path={'/oppsummering'} element={<Oppsummeringsside />} />
                    <Route path={'/kvittering'} element={<Kvitteringsside />} />
                    <Route path={'/*'} element={<KjørelisteSkjema />} />
                </Routes>
            </ValideringsfeilProvider>
        </KjørelisteProvider>
    );
};
