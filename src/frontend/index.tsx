import React from 'react';

import { createRoot } from 'react-dom/client';
import '@navikt/ds-css/darkside';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Theme } from '@navikt/ds-react';

import { autentiseringsInterceptor } from './api/autentisering';
import { initSentry } from './api/Sentry';
import BarnetilsynApp from './barnetilsyn/BarnetilsynApp';
import { barnetilsynPath } from './barnetilsyn/routing/routesBarnetilsyn';
import ScrollToTop from './components/ScrollToTop';
import { SpråkProvider } from './context/SpråkContext';
import { KanBrukeOffentligTransportAvsjekk } from './dagligReise/KanBrukeOffentligTransportAvsjekk';
import { KjørelisterApp } from './kjørelister/KjørelisterApp';
import LæremidlerApp from './læremidler/LæremidlerApp';
import { læremidlerPath } from './læremidler/routing/routesLæremidler';
import { erProd } from './utils/miljø';

initSentry();
autentiseringsInterceptor();

const rootElement = document.getElementById('app');
const root = createRoot(rootElement!);

const AppRoutes = () => {
    const kanBrukeKjøreliste = !erProd();
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <ScrollToTop />
            <Routes>
                <Route path={`${barnetilsynPath}/*`} element={<BarnetilsynApp />} />
                {/* Fallback for gamle lenker */}
                <Route
                    path={'/barnetilsyn/*'}
                    element={<Navigate to={barnetilsynPath} replace />}
                />
                <Route path={`/${læremidlerPath}/*`} element={<LæremidlerApp />} />
                <Route
                    path="/daglig-reise/skjema"
                    element={<KanBrukeOffentligTransportAvsjekk />}
                />
                {kanBrukeKjøreliste && (
                    <Route path={`/kjoreliste/*`} element={<KjørelisterApp />} />
                )}
                <Route path={'*'} element={<Navigate to={barnetilsynPath} replace />} />
            </Routes>
        </BrowserRouter>
    );
};
root.render(
    <main id={'maincontent'} tabIndex={-1}>
        <SpråkProvider>
            <Theme theme="light">
                <AppRoutes />
            </Theme>
        </SpråkProvider>
    </main>
);
