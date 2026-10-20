import React from 'react';

import { FlyttingSøknadProvider, useFlyttingSøknad } from './context/FlyttingSøknadContext';
import { Søknadsdialog } from './Søknadsdialog';
import { SøknadAppShell } from '../components/SøknadAppShell';
import { SøknadProvider } from '../context/SøknadContext';
import { useValideringsfeil } from '../context/ValideringsfeilContext';
import { Skjematype } from '../typer/skjematyper';
import { appConfig } from '../utils/appConfig';
import { useDokumentTittel } from '../utils/useDokumentTittel';

const FlyttingInnhold = () => {
    const { resetValideringsfeil } = useValideringsfeil();
    const { resetSøknad, hovedytelse, dokumentasjon, flyttingDetaljer } = useFlyttingSøknad();

    return (
        <SøknadProvider
            skjematype={Skjematype.SØKNAD_FLYTTING}
            søknad={{
                hovedytelse,
                // TODO: Vurder å utelate skjulte grensvar og inaktive vedlegg fra payloaden.
                flyttingDetaljer,
                dokumentasjon,
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

export const FlyttingApp = () => {
    useDokumentTittel(Skjematype.SØKNAD_FLYTTING);

    return (
        <SøknadAppShell skjematype={Skjematype.SØKNAD_FLYTTING}>
            <FlyttingSøknadProvider>
                <FlyttingInnhold />
            </FlyttingSøknadProvider>
        </SøknadAppShell>
    );
};
