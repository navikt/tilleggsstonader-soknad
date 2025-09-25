import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { Routes } from 'react-router';
import { Route, useParams } from 'react-router-dom';

import { Alert, Loader, VStack } from '@navikt/ds-react';

import { hentRammevedtak } from '../api/api';
import { KjørelisteSkjema } from './components/Skjemaside/KjørelisteSkjema';
import { KjørelisteProvider } from './KjørelisteContext';
import { Kvitteringsside } from './components/Kvitteringsside/Kvitteringsside';
import { Vedleggside } from './components/Vedleggside/Vedleggside';
import { Oppsummeringsside } from './components/Oppsummering/Oppsummeringsside';

export const KjørelisteInnhold = () => {
    const kjørelisteId = useParams<{ kjorelisteId: string }>().kjorelisteId as string;

    const { isPending, error, data } = useQuery({
        queryKey: [`rammevedtakDetaljer:${kjørelisteId}`],
        queryFn: () => hentRammevedtak(kjørelisteId),
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
        <KjørelisteProvider rammevedtak={data}>
            <Routes>
                <Route path={'/skjema'} element={<KjørelisteSkjema />} />
                <Route path={'/vedlegg'} element={<Vedleggside />} />
                <Route path={'/oppsummering'} element={<Oppsummeringsside />} />
                <Route path={'/kvittering'} element={<Kvitteringsside />} />
                <Route path={'/*'} element={<KjørelisteSkjema />} />
            </Routes>
        </KjørelisteProvider>
    );
};
