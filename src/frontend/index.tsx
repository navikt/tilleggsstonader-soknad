import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const rootElement = document.getElementById('app');
const root = createRoot(rootElement!);

root.render(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
            <Route path={'/*'} element={<App />} />
        </Routes>
    </BrowserRouter>
);
