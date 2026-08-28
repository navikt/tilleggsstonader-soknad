// biome-ignore lint/correctness/noUnusedImports: React er nødvendig for webpack JSX-transform
import React from 'react';
import { SøknadAppShell } from '../components/SøknadAppShell';
import { SøknadProvider } from '../context/SøknadContext';
import { useValideringsfeil } from '../context/ValideringsfeilContext';
import { Skjematype } from '../typer/skjematyper';
import { appConfig } from '../utils/appConfig';
import { useDokumentTittel } from '../utils/useDokumentTittel';
import {
    ReiseTilSamlingSøknadProvider,
    useReiseTilSamlingSøknad
} from './context/ReiseTilSamlingSøknadContext';
import { Søknadsdialog } from './Søknadsdialog';

const ReiseTilSamlingInnhold = () => {
    const { resetValideringsfeil } = useValideringsfeil();
    const {
        resetSøknad,
        hovedytelse,
        aktivitet,
        samlinger,
        avreiseadresse,
        reisemåte,
        dokumentasjon
    } = useReiseTilSamlingSøknad();

    return (
        <SøknadProvider
            skjematype={Skjematype.SØKNAD_REISE_TIL_SAMLING}
            søknad={{
                hovedytelse: hovedytelse,
                aktivitet: aktivitet,
                samlinger: samlinger,
                avreiseadresse: avreiseadresse,
                reisemåte: reisemåte,
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

export const ReiseTilSamlingApp = () => {
    useDokumentTittel(Skjematype.SØKNAD_REISE_TIL_SAMLING);

    return (
        <SøknadAppShell skjematype={Skjematype.SØKNAD_REISE_TIL_SAMLING}>
            <ReiseTilSamlingSøknadProvider>
                <ReiseTilSamlingInnhold />
            </ReiseTilSamlingSøknadProvider>
        </SøknadAppShell>
    );
};
