import React from 'react';

import { createRoot } from 'react-dom/client';
import '@navikt/ds-css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import { BarnetilsynApp } from './barnetilsyn/BarnetilsynApp';
import { SpråkProvider } from './context/SpråkContext';

const rootElement = document.getElementById('app');
const root = createRoot(rootElement!);

root.render(
    <SpråkProvider>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path={'*'} element={<App />} />
                <Route path={'/barnetilsyn/*'} element={<BarnetilsynApp />} />
            </Routes>
        </BrowserRouter>
    </SpråkProvider>
);
