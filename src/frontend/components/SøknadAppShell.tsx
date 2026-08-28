import type React from 'react';
import { RegisterAktiviteterProvider } from '../context/RegisterAktiviteterContext';
import { ValideringsfeilProvider } from '../context/ValideringsfeilContext';
import type { Skjematype } from '../typer/skjematyper';
import { PersonRouting } from './PersonRouting';

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
