// biome-ignore lint/correctness/noUnusedImports: React er nødvendig for webpack JSX-transform
import React from 'react';
import { SøknadAppShell } from '../components/SøknadAppShell';
import { SøknadProvider } from '../context/SøknadContext';
import { useValideringsfeil } from '../context/ValideringsfeilContext';
import { Skjematype } from '../typer/skjematyper';
import { appConfig } from '../utils/appConfig';
import { useDokumentTittel } from '../utils/useDokumentTittel';
import { PassAvBarnSøknadProvider, usePassAvBarnSøknad } from './context/PassAvBarnSøknadContext';
import { Søknadsdialog } from './Søknadsdialog';

const PassAvBarnInnhold = () => {
    const { resetValideringsfeil } = useValideringsfeil();
    const { resetSøknad, hovedytelse, aktivitet, barnMedBarnepass, dokumentasjon } =
        usePassAvBarnSøknad();

    return (
        <SøknadProvider
            skjematype={Skjematype.SØKNAD_PASS_AV_BARN}
            søknad={{
                hovedytelse: hovedytelse,
                aktivitet: aktivitet,
                barnMedBarnepass: barnMedBarnepass,
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

export const PassAvBarnApp = () => {
    useDokumentTittel(Skjematype.SØKNAD_PASS_AV_BARN);

    return (
        <SøknadAppShell skjematype={Skjematype.SØKNAD_PASS_AV_BARN}>
            <PassAvBarnSøknadProvider>
                <PassAvBarnInnhold />
            </PassAvBarnSøknadProvider>
        </SøknadAppShell>
    );
};
