import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { Routes } from 'react-router';
import { Route, useParams } from 'react-router-dom';

import { Alert, Loader, VStack } from '@navikt/ds-react';

import { hentRammevedtak, hentTidligereInnsendt } from '../api/api';
import { ValideringsfeilProvider } from '../context/ValideringsfeilContext';
import { Kvitteringsside } from './components/Kvitteringsside/Kvitteringsside';
import { Oppsummeringsside } from './components/Oppsummering/Oppsummeringsside';
import { KjørelisteSkjema } from './components/Skjemaside/KjørelisteSkjema';
import { Vedleggside } from './components/Vedleggside/Vedleggside';
import { KjørelisteProvider } from './KjørelisteContext';

export const KjørelisteInnhold = () => {
    const reiseId = useParams<{ reiseId: string }>().reiseId as string;

    const {
        isPending: rammevedtakPending,
        error: rammevedtakError,
        data: rammevedtak,
    } = useQuery({
        queryKey: [`rammevedtakDetaljer:${reiseId}`],
        queryFn: () => hentRammevedtak(reiseId),
    });

    const {
        isPending: tidligereInnsendtPending,
        error: tidligereInnsendtError,
        data: tidligereInnsendt,
    } = useQuery({
        queryKey: [`tidligereInnsendt:${reiseId}`],
        queryFn: () => hentTidligereInnsendt(reiseId),
    });

    if (rammevedtakPending || tidligereInnsendtPending) {
        return (
            <VStack align={'center'}>
                <Loader size={'3xlarge'} title={'Laster inn siden'} />
            </VStack>
        );
    }

    if (rammevedtakError || tidligereInnsendtError) {
        return <Alert variant={'error'}>Kunne ikke hente kjøreliste. Prøv igjen senere.</Alert>;
    }

    return (
        <KjørelisteProvider rammevedtak={rammevedtak} tidligereInnsendt={tidligereInnsendt ?? null}>
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
