import React from 'react';

import { createRoot } from 'react-dom/client';
import '@navikt/ds-css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';

const rootElement = document.getElementById('app');
const root = createRoot(rootElement!);

root.render(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
            <Route path={'/*'} element={<App />} />
        </Routes>
    </BrowserRouter>
);
