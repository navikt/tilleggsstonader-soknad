import React from 'react';

import { PassAvBarnSøknadProvider, usePassAvBarnSøknad } from './context/PassAvBarnSøknadContext';
import { Søknadsdialog } from './Søknadsdialog';
import { SøknadAppShell } from '../components/SøknadAppShell';
import { SøknadProvider } from '../context/SøknadContext';
import { useValideringsfeil } from '../context/ValideringsfeilContext';
import { Skjematype } from '../typer/skjematyper';
import { appConfig } from '../utils/appConfig';
import { useDokumentTittel } from '../utils/useDokumentTittel';

const BarnetilsynInnhold = () => {
    const { resetValideringsfeil } = useValideringsfeil();
    const { resetSøknad, hovedytelse, aktivitet, barnMedBarnepass, dokumentasjon } =
        usePassAvBarnSøknad();

    return (
        <SøknadProvider
            skjematype={Skjematype.SØKNAD_BARNETILSYN}
            søknad={{
                hovedytelse: hovedytelse,
                aktivitet: aktivitet,
                barnMedBarnepass: barnMedBarnepass,
                dokumentasjon: dokumentasjon,
                søknadMetadata: {
                    søknadFrontendGitHash: appConfig.commitHash,
                },
            }}
            resetValideringsfeil={resetValideringsfeil}
            resetSøknad={resetSøknad}
        >
            <Søknadsdialog />
        </SøknadProvider>
    );
};

export const BarnetilsynApp = () => {
    useDokumentTittel(Skjematype.SØKNAD_BARNETILSYN);

    return (
        <SøknadAppShell skjematype={Skjematype.SØKNAD_BARNETILSYN}>
            <PassAvBarnSøknadProvider>
                <BarnetilsynInnhold />
            </PassAvBarnSøknadProvider>
        </SøknadAppShell>
    );
};
