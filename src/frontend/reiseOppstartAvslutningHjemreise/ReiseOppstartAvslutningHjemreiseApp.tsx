import React from 'react';

import {
    ReiseOppstartAvslutningHjemreiseSøknadProvider,
    useReiseOppstartAvslutningHjemreiseSøknad,
} from './context/ReiseOppstartAvslutningHjemreiseSøknadContext';
import { Søknadsdialog } from './Søknadsdialog';
import { SøknadAppShell } from '../components/SøknadAppShell';
import { SøknadProvider } from '../context/SøknadContext';
import { useValideringsfeil } from '../context/ValideringsfeilContext';
import { Skjematype } from '../typer/skjematyper';
import { appConfig } from '../utils/appConfig';
import { useDokumentTittel } from '../utils/useDokumentTittel';

const ReiseOppstartAvslutningHjemreiseInnhold = () => {
    const { resetValideringsfeil } = useValideringsfeil();
    const { resetSøknad, hovedytelse, aktivitet, dokumentasjon } =
        useReiseOppstartAvslutningHjemreiseSøknad();

    return (
        <SøknadProvider
            skjematype={Skjematype.SØKNAD_STØTTE_TIL_REISE_OPPSTART_AVSLUTNING_HJEMREISE}
            søknad={{
                hovedytelse: hovedytelse,
                aktivitet: aktivitet,
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

export const ReiseOppstartAvslutningHjemreiseApp = () => {
    useDokumentTittel(Skjematype.SØKNAD_STØTTE_TIL_REISE_OPPSTART_AVSLUTNING_HJEMREISE);

    return (
        <SøknadAppShell
            skjematype={Skjematype.SØKNAD_STØTTE_TIL_REISE_OPPSTART_AVSLUTNING_HJEMREISE}
        >
            <ReiseOppstartAvslutningHjemreiseSøknadProvider>
                <ReiseOppstartAvslutningHjemreiseInnhold />
            </ReiseOppstartAvslutningHjemreiseSøknadProvider>
        </SøknadAppShell>
    );
};
