// biome-ignore lint/correctness/noUnusedImports: React er nødvendig for webpack JSX-transform
import React from 'react';
import { SøknadAppShell } from '../components/SøknadAppShell';
import { SøknadProvider } from '../context/SøknadContext';
import { useValideringsfeil } from '../context/ValideringsfeilContext';
import { Skjematype } from '../typer/skjematyper';
import { appConfig } from '../utils/appConfig';
import { useDokumentTittel } from '../utils/useDokumentTittel';
import { LæremidlerSøknadProvider, useLæremidlerSøknad } from './context/LæremidlerSøknadContext';
import { Søknadsdialog } from './Søknadsdialog';

const LæremidlerInnhold = () => {
    const { resetValideringsfeil } = useValideringsfeil();
    const { resetSøknad, hovedytelse, utdanning, dokumentasjon } = useLæremidlerSøknad();

    return (
        <SøknadProvider
            skjematype={Skjematype.SØKNAD_LÆREMIDLER}
            søknad={{
                hovedytelse: hovedytelse,
                utdanning: utdanning,
                dokumentasjon: dokumentasjon,
                søknadMetadata: {
                    søknadFrontendGitHash: appConfig.commitHash
                }
            }}
            resetValideringsfeil={resetValideringsfeil}
            resetSøknad={resetSøknad}
        >
            <Søknadsdialog />
        </SøknadProvider>
    );
};

export const LæremidlerApp = () => {
    useDokumentTittel(Skjematype.SØKNAD_LÆREMIDLER);

    return (
        <SøknadAppShell skjematype={Skjematype.SØKNAD_LÆREMIDLER}>
            <LæremidlerSøknadProvider>
                <LæremidlerInnhold />
            </LæremidlerSøknadProvider>
        </SøknadAppShell>
    );
};
