import React from 'react';

import { ApmErrorBoundary } from '@nais/apm/react';
import { createRoot } from 'react-dom/client';
import '@navikt/ds-css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Theme } from '@navikt/ds-react';

import { initApm } from './api/apm';
import { FeilProvider } from './components/FeilProvider';
import { Feilside } from './components/Feilside';
import { NotFound } from './components/NotFound';
import { ScrollToTop } from './components/ScrollToTop';
import { SpråkProvider } from './context/SpråkContext';
import { KanBrukeOffentligTransportAvsjekk } from './dagligReise/KanBrukeOffentligTransportAvsjekk';
import { SkalBrukeTaxiAvsjekk } from './dagligReise/SkalBrukeTaxiAvsjekk';
import { KjørelisterApp } from './kjørelister/KjørelisterApp';
import { LæremidlerApp } from './læremidler/LæremidlerApp';
import { læremidlerPath } from './læremidler/routing/routesLæremidler';
import { PassAvBarnApp } from './passAvBarn/PassAvBarnApp';
import { passAvBarnPath } from './passAvBarn/routing/routesPassAvBarn';
import { ReiseOppstartAvslutningHjemreiseApp } from './reiseOppstartAvslutningHjemreise/ReiseOppstartAvslutningHjemreiseApp';
import { reiseOppstartAvslutningHjemreisePath } from './reiseOppstartAvslutningHjemreise/routing/routesReiseOppstartAvslutningHjemreise';
import { ReiseTilSamlingApp } from './reiseTilSamling/ReiseTilSamlingApp';
import { reiseTilSamlingPath } from './reiseTilSamling/routing/routesReiseTilSamling';
import { appConfig } from './utils/appConfig';
import { erProd } from './utils/miljø';

initApm();

const rootElement = document.getElementById('app');
const root = createRoot(rootElement!);

const AppRoutes = () => {
    const kanBrukeReiseTilSamling = !erProd();
    // TODO: skjelett under bygging - skru på for alle miljø når flyten er ferdig
    const kanBrukeReiseOppstartAvslutningHjemreise = !erProd();
    return (
        <BrowserRouter basename={appConfig.publicUrl}>
            <ScrollToTop />
            <Routes>
                <Route path={`${passAvBarnPath}/*`} element={<PassAvBarnApp />} />
                {/* Fallback for gamle lenker */}
                <Route path={'/barnetilsyn/*'} element={<Navigate to={passAvBarnPath} replace />} />
                <Route path={`/${læremidlerPath}/*`} element={<LæremidlerApp />} />
                {kanBrukeReiseTilSamling && (
                    <Route path={`${reiseTilSamlingPath}/*`} element={<ReiseTilSamlingApp />} />
                )}
                {kanBrukeReiseOppstartAvslutningHjemreise && (
                    <Route
                        path={`${reiseOppstartAvslutningHjemreisePath}/*`}
                        element={<ReiseOppstartAvslutningHjemreiseApp />}
                    />
                )}
                <Route
                    path="/daglig-reise/skjema-offentlig-transport"
                    element={<KanBrukeOffentligTransportAvsjekk />}
                />
                <Route path="/daglig-reise/skjema-taxi" element={<SkalBrukeTaxiAvsjekk />} />
                <Route path={`/kjoreliste/*`} element={<KjørelisterApp />} />
                <Route path={'*'} element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};
root.render(
    <main id={'maincontent'} tabIndex={-1}>
        <SpråkProvider>
            <Theme theme="light">
                <ApmErrorBoundary fallback={<Feilside />}>
                    <FeilProvider>
                        <AppRoutes />
                    </FeilProvider>
                </ApmErrorBoundary>
            </Theme>
        </SpråkProvider>
    </main>
);
