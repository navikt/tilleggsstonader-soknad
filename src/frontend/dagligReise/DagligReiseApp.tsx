import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { KanBrukeOffentligTransportAvsjekk } from './KanBrukeOffentligTransportAvsjekk';
import { SkjemaRouting } from '../components/SkjemaRouting/SkjemaRouting';
import { SkjematypeFyllUt } from '../typer/stønadstyper';

/**
 * Redirekter enten brukeren til gammel Fyll Ut-søknad, eller til en spørsmålsside om offentlig transport.
 */
export const DagligReiseApp = () => {
    return (
        <Routes>
            <Route
                index
                element={
                    <SkjemaRouting
                        skjematypeFyllUt={SkjematypeFyllUt.SØKNAD_DAGLIG_REISE}
                        internRouteHvisNyLøsning="daglig-reise/skjema"
                    />
                }
            />
            <Route path="skjema" element={<KanBrukeOffentligTransportAvsjekk />} />
        </Routes>
    );
};
