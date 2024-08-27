import React from 'react';

import { createRoot } from 'react-dom/client';
import '@navikt/ds-css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { initAmplitude } from './api/amplitude';
import { autentiseringsInterceptor } from './api/autentisering';
import { initSentry } from './api/Sentry';
import BarnetilsynApp from './barnetilsyn/BarnetilsynApp';
import { barnetilsynPath } from './barnetilsyn/routing/routesBarnetilsyn';
import ScrollToTop from './components/ScrollToTop';
import { PersonProvider, usePerson } from './context/PersonContext';
import { SpråkProvider } from './context/SpråkContext';
import LæremidlerApp from './læremidler/LæremidlerApp';
import { læremidlerPath } from './læremidler/routing/routesLæremidler';
import { erProd } from './utils/miljø';

initSentry();
autentiseringsInterceptor();

const rootElement = document.getElementById('app');
const root = createRoot(rootElement!);

initAmplitude();

const AppRoutes = () => {
    const { harLastetPerson, feilmelding } = usePerson();

    if (feilmelding) {
        return (
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Routes>
                    <Route path={'*'} element={<div>{feilmelding}</div>} />
                </Routes>
            </BrowserRouter>
        );
    }
    if (!harLastetPerson) {
        return null;
    }

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <ScrollToTop />
            <Routes>
                <Route path={`/${barnetilsynPath}/*`} element={<BarnetilsynApp />} />
                {/* Fallback for gamle lenker */}
                <Route path={'/barnetilsyn/*'} element={<Navigate to="/pass-av-barn" replace />} />
                {!erProd() && <Route path={`/${læremidlerPath}/*`} element={<LæremidlerApp />} />}
                <Route path={'*'} element={<Navigate to="/pass-av-barn" replace />} />
            </Routes>
        </BrowserRouter>
    );
};
root.render(
    <main id={'maincontent'} tabIndex={-1}>
        <SpråkProvider>
            <PersonProvider>
                <AppRoutes />
            </PersonProvider>
        </SpråkProvider>
    </main>
);
