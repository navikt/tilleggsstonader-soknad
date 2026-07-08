import React from 'react';

import { PersonRouting } from './PersonRouting';
import { RegisterAktiviteterProvider } from '../context/RegisterAktiviteterContext';
import { ValideringsfeilProvider } from '../context/ValideringsfeilContext';
import { Skjematype } from '../typer/skjematyper';

interface Props {
    skjematype: Skjematype;
    children: React.ReactNode;
}

export const SøknadAppShell: React.FC<Props> = ({ skjematype, children }) => {
    return (
        <PersonRouting skjematype={skjematype}>
            <ValideringsfeilProvider>
                <RegisterAktiviteterProvider skjematype={skjematype}>
                    {children}
                </RegisterAktiviteterProvider>
            </ValideringsfeilProvider>
        </PersonRouting>
    );
};
