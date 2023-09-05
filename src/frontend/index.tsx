import React from 'react';

import { createRoot } from 'react-dom/client';
import '@navikt/ds-css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { autentiseringsInterceptor } from './api/autentisering';
import { initSentry } from './api/Sentry';
import App from './App';
import BarnetilsynApp from './barnetilsyn/BarnetilsynApp';
import { PersonProvider } from './context/PersonContext';
import { SpråkProvider } from './context/SpråkContext';
import { SøknadProvider } from './context/SøknadContext';

initSentry();
autentiseringsInterceptor();

const rootElement = document.getElementById('app');
const root = createRoot(rootElement!);

root.render(
    <SpråkProvider>
        <SøknadProvider>
            <PersonProvider>
                <BrowserRouter basename={process.env.PUBLIC_URL}>
                    <Routes>
                        <Route path={'*'} element={<App />} />
                        <Route path={'/barnetilsyn/*'} element={<BarnetilsynApp />} />
                    </Routes>
                </BrowserRouter>
            </PersonProvider>
        </SøknadProvider>
    </SpråkProvider>
);
